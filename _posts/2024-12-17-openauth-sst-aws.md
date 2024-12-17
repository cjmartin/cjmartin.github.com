---
layout: post
title: Serverless Auth&#58; OpenAuth on AWS with SST
place: Truckee, CA
time: 11:34 AM PDT
---

I've been playing with a bunch of "serverless" solutions lately. I used [Amplify](https://aws-amplify.github.io/) to configure and bootstrap various AWS services for [Scenery](https://scenery.video) and the projects that preceeded it, and I'd say it provided equal parts convenience and frustration.

As a learning exercise, I recently used Amplify gen2 to deploy an OIDC wrapper around the Flickr API as a next.js app. It worked, and served it's purpose of refreshing my memory on how OAuth2 and OIDC work while giving me an excuse to play with next.js, but I wouldn't use the final product for a production application. It also convinced me that it's time to try out [SST](https://sst.dev/) as a replacement for Amplify. Let's see if we can find a bit more convienience and less frustration.

Enter SST's [OpenAuth](https://openauth.js.org/). Let's give it a try as an auth service and explore SST in the process.

### Setup

I'm going to depoy OpenAuth as it's own standalone service on AWS using SST.

1. If you haven't used SST before, read through the [workflow](https://sst.dev/docs/workflow) and [configure you IAM credneitals](https://sst.dev/docs/iam-credentials/).
2. Create a new directory for our project: `mkdir openauth && cd openauth`.
3. Initialize SST: `npx sst@latest init`, use the default options: `vanilla` template and `aws`.