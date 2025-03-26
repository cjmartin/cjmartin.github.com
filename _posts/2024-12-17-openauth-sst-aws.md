---
layout: post
title: 'Serverless Auth: OpenAuth on AWS with SST'
place: Truckee, CA
time: 11:34 AM PDT
---

I've been playing with a bunch of "serverless" solutions lately. I used [Amplify](https://aws-amplify.github.io/) to configure and bootstrap various AWS services for [Scenery](https://scenery.video) and the projects that preceeded it, and I'd say it provided equal parts convenience and frustration.

As a learning exercise, I recently used Amplify gen2 to deploy an OIDC wrapper around the Flickr API as a next.js app. It worked, and served it's purpose of refreshing my memory on how OAuth2 and OIDC work while giving me an excuse to play with next.js, but I wouldn't use the final product for a production application. It also convinced me that it's time to try out [SST](https://sst.dev/) as a replacement for Amplify. Let's see if we can find a bit more convienience and less frustration.

Enter SST's [OpenAuth](https://openauth.js.org/). Let's give it a try as an auth service and explore SST in the process.

I'm going to depoy OpenAuth as it's own standalone service on AWS using SST.

### Setup SST

1. If you haven't used SST before, read through the [workflow](https://sst.dev/docs/workflow) and [configure your IAM credneitals](https://sst.dev/docs/iam-credentials/).
2. Create a new directory for our project: `mkdir openauth && cd openauth`.
3. Initialize SST: `npx sst@latest init` - use the default options: `vanilla` template and `aws`.

### Add the [OpenAuth Component](https://sst.dev/docs/component/aws/auth)

In the `run` function of `sst.config.ts` add:
```typescript
const auth = new sst.aws.Auth("MyAuth", {
  authorizer: "src/authorizer.handler"
});
```

### Authorizer

1. Add OpenAuth npm package: `npm i @openauthjs/openauth`.
2. Create a file at `src/authorizer.ts`: `mkdir src && touch src/authorizer.ts`.

This authorizer is based on the [lambda example](https://github.com/openauthjs/openauth/blob/master/examples/authorizer/lambda/authorizer.ts), with a few changes because we're using the auth component which creates the dynamodb table and links it to the authorizer automatically.

```typescript
import { authorizer } from "@openauthjs/openauth"
import { handle } from "hono/aws-lambda"
import { subjects } from "../../subjects.js"
import { PasswordAdapter } from "@openauthjs/openauth/adapter/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123"
}

const app = authorizer({
  subjects,
  providers: {
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        id: await getUser(value.email),
      })
    }
    throw new Error("Invalid provider")
  },
})

export const handler = handle(app)
```

### Subjects

1. Add the valibot npm package: `npm i validbot`.
2. Create a file at `src/subjects.js`: `touch src/subjects.js`.

```typescript
import { object, string } from "valibot";
import { createSubjects } from "@openauthjs/openauth";

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
});
```

### Run SST dev mode

Run SST dev to configure AWS resources and run the app in dev mode.

`npx sst dev`

Once SST has deployed all of the AWS resources needed for OpenAuth, it will output a URL you can use to test the authorizer. It will look similar to this:

`https://[uuid].lambda-url.us-west-2.on.aws`

Add `/.well-known/oauth-authorization-server` to the url and open in a browser to test that your OpenAuth service is up and running. You should see something like this:

`https://[uuid].lambda-url.us-west-2.on.aws/.well-known/oauth-authorization-server`

```json
{
  "issuer":"https://[uuid].lambda-url.us-west-2.on.aws",
  "authorization_endpoint":"https://[uuid].lambda-url.us-west-2.on.aws/authorize",
  "token_endpoint":"https://[uuid].lambda-url.us-west-2.on.aws/token",
  "jwks_uri":"https://[uuid].lambda-url.us-west-2.on.aws/.well-known/jwks.json",
  "response_types_supported":[
    "code",
    "token"
  ]
}
```

Congratulations, you have successfully set up a basic OpenAuth service! You should now be able to set up an [Auth Client](https://github.com/openauthjs/openauth/tree/master?tab=readme-ov-file#auth-client) to use with your shiny new OpenAuth server.