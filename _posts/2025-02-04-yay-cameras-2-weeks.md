---
layout: post
title: Yay Cameras Update&#58; Two Weeks In
place: Alpine Meadows, CA
time: 2:36 PM PDT
---

# Yay Cameras Update: Two Weeks In

It's been two weeks since started my "Yay Cameras" project, and while the site might still look a bit rough, I'm happy with the progress I've made. If you haven't already, you can check out my initial plans for the site [here](https://roundhere.net/journal/yay-cameras-intro/).

## Backend Focus

Over the past couple weeks, I've been following my preferred path and spending quite a bit of time playing around in backend/ops land. This has involved a lot of learning and experimentation with various technologies:

- **Next.js**: Yes, the frontend, but... focusing on server-side components to ensure pages are cacheable. I'm excited about the server side features, I'm aiming to build a completely cached site that can be enhanced later with frontend interactivity, and I've been working almost exclusively on a 99% client side React app for the last 5 years, so I want to stay in React for that stuff, for now.
- **Serverless Stack (SST) + OpenNext**: [SST](https://sst.dev/) for deploying the Next.js app on AWS using [OpenNext](https://opennext.js.org/). [SST](https://sst.dev/) seems good, but I decided to manage other services with...
- **Terraform**: To deploy DynamoDB and S3, because it's so easy and the standard for managing this stuff. 

While the frontend might still be a work in progress, the backend is up and running smoothly. I've been exploring the pros and cons of these various tools over the last few months (recovering from Amplify), and I'm generally happy with this setup.

## Just Ship It

One of the key takeaways from this project is the importance of shipping imperfect things. It's easy to get stuck in perfectionism, but putting something imperfect out there, and then iterating on it is something I've been pushing myself to do. Learning in public (even though I don't really think anyone is looking). I'm also trying to develop a habit of writing something every week, and this gives me something to talk about.

## Current Features

Here’s a rundown of what we have so far:

- **Backend**: A script that I run manually once a day to fetch new cameras and images from Flickr, along with product information from Amazon. All this data is stored in DynamoDB/S3.
- **Frontend**: A Next.js app with an index page that picks a random manufacturer and displays a list of cameras we’ve found. Each camera has its own page displaying an image (if available) and photos taken with that camera.

All these pages are Next.js server components, so they're cacheable and are just served directly from S3 (I think, I haven't dug into exactly how OpenNext works). The index page is already cached, and I'll cache the individual camera pages too, eventually.

## Camera Pages + Flickr Photo Embeds

Flickr photos are marked up to display Flickr photo embeds. Each image includes metadata such as the photographer, license, title, etc., and links back to Flickr even if the embed doesn't load. I'm particularly fond of these since I wrote the embed functionality for Flickr and I really like how I did it with progressively enhanced img tag -> sourceless iframe. Flickr went down at one point while I was working and the embeds kept chugging 🥰

Here’s an example page that showcases a nice collection of photos taken with the Sony ILCE-7: [Yay Cameras - Sony ILCE-7](https://www.yaycameras.com/camera/sony-ilce-7).

## What's Next?

There’s still plenty of work to be done, especially on the design/features front. I'm taking a bit of a break for now to dig into another project, but I'll be working on adding more camera and manufacturer information to fill in some empty spaces when I get back into it.

Overall, this project is more an exercise in getting stuff out and learning along the way. I'm not exactly _embarassed_ by what's there, but I want to put stuff I'm not 100% comfortable with out there rather than just keeping it in a git repo to die. More to come, I'm sure I'll be embarassed by a lot of it.