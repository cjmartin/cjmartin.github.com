---
layout: post
title: "Resurrecting launchcalendar.org"
place: Truckee, CA
time: 9:30 AM
categories: ['projects']
tags: ['launchcalendar', 'rockets', 'space', 'jekyll', 'development']

image: /assets/images/launchcalendar/gcal-list.png
description: "Reviving my 2016 side project, launchcalendar.org, to track rocket launches with new tools and workflows"
---

I'm reviving an old side project called [launchcalendar.org](https://launchcalendar.org), which I began in 2016. I started it when I realized I had no idea how many rockets were being launched weekly (way more than I thought!).

I was learning about them after the fact via [images posted to Flickr](https://flickr.com/photos/cjmartin/galleries/72157663755931904/), but I wanted a calendar feed to subscribe to that would let me track the launch times with links to a live stream, payload information, and launch location. Basically calendar invites to watch rockets take off.

At the time, I created a rough prototype using Jekyll + GitHub Pages. Each post would be a launch, and an iCal calendar file, which could be subscribed to in Google Calendar or Apple Calendar, was generated from the posts. However, it didn't solve my problem because I still needed to track and enter all the launches. Launches are often delayed, and those updates needed to be reflected, so I was manually entering all the data.

While the system worked and would have been great for subscribers, it didn't solve my use case. I still had to do all the work to track and enter the launches. I ended up taking on some contract work, and the project fell off my plate.

I still think it's a good idea, and the scope is small enough to be a good project to explore interests without requiring a whole lot of "other stuff." Since it was built with Jekyll and hosted on GitHub Pages (no server logic, no DB), everything was still functional. I re-registered the domain, pointed the DNS at the GitHub Pages repo, and reactivated my Mapbox account because I was using Mapbox maps on the individual launch pages, which I never finished.

With those two things done, the project was up and running just as I left it in 2016: [launchcalendar.org](https://launchcalendar.org).

<img src="/assets/images/launchcalendar/index-2016.png" alt="List of launches from 2016" width="500px" />
"Ugly list of launch schedule!" - Still ugly, but back up and running.

There's a solid foundation for a working system. With newer technologies and workflows, I believe I can make this project better. My immediate plan is to clean up the website and finalize design ideas for each launch page. Finish it to the point I wanted it to be in 2016, which still doesn't solve the issue of data input.

#### Data Entry Plans

To get data into the system, I plan to set up a process where humans (probably me) can enter and update launch data on the website. Updates will generate pull requests, which I can review and approve. Once approved, they'll be merged, and the data will update automatically.

#### AI Agent

There are a number of sites that publish great data about launches and space news in general. I did not and do not want to scrape anything to programmatically pull data. However, I think if an AI agent could search for information and tell me about it, that would solve much of the problem!

I plan to build an AI agent to search for launch data and generate draft entries and updates about launches. The agent will search for upcoming launches, live stream links, photos, updates/delays, etc., and open pull requests like a human would. Then I can review the PRs, ensure all the info is correct, make extra sure everything is attributed correctly with links to sources, and then publish the updates. I wouldn't trust an AI agent to always be correct and automate the whole process, but if it can find relevant information and file pull requests for me to review, I think this thing could work.

#### Other Improvements

I'd like to add Bluesky posts in addition to the iCal calendar feed, so people can follow on Bluesky if they'd prefer. I briefly started thinking about rebuilding this whole thing on AT Protocol (I really want to build something on AT Protocol), but the Jekyll setup is so beautifully simple that I think it's perfect for this project.

#### Follow Along

I'll post as I make progress here, but you can also [subscribe in your calendar app](webcal://launchcalendar.org/calendar.ics), or [Google calendar](https://calendar.google.com/calendar/render?cid=https://launchcalendar.org/calendar.ics) if you want to see new launches as they're added.

And of course you can [follow the whole project on GitHub](https://github.com/cjmartin/launchcalendar.org).

