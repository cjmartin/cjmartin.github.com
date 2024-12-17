---
layout: post
title: Serverless Auth&#58; OpenAuth on AWS with SST
place: Truckee, CA
time: 11:34 AM PDT
---

I've been playing with a bunch of "serverless" solutions lately. I used [Amplify](https://aws-amplify.github.io/) to configure and bootstrap various AWS services (cognito/s3/react spa hosting) for [Scenery](https://scenery.video) and the projects that preceeded it, and I'd say it provided equal parts convenience and frustration, but enough utility to bring me back to try out the new version. As a learning exercise, I built an OIDC auth wrapper around the Flickr API as a next.js app and deployed it with Amplify. It worked, and served it's purpose of refreshing my memory on how OAuth2 and OIDC work while giving me an excuse to play with next.js, but I wouldn't seriously use the final product for a production application. It also convinced me that it's time to try out [SST](https://serverless-stack.com/) as a replacement for Amplify, let's see if we can find a bit more convienience and less frustration.

Time for something more serious. Let's give SST's [OpenAuth](https://openauth.js.org/) a try. Here I'll document the process of setting it up on AWS using SST.