---
layout: post
title: 'Building Something: Yay Cameras!'
place: Olympic Valley, CA
time: 10:28 AM PDT
redirect_from:
- /journal/yay-cameras-intro/
---

I'm working on a new personal project from a very old idea, it's called _Yay Cameras!_, and it will be a site about... Cameras!

I've always loved cameras. I've never been a particularly excellent _photographer_, but I've always been interested in technology, and cameras are the coolest technology that was available to normal people like me, even before computers and video games; cameras were (are) magic.

My first digital camera was a [Toshiba PDR-2](https://www.vintagedigitalcameras.com/toshiba). It was a crazy little thing with a PCMCIA card interface that flipped out of the back to interface with a PC, and I'm shocked that I (read: my mom) even had a computer with a PCMCIA slot to plug it into. I remember taking that camera with me on my first international trip when I was ~15, but I have no idea what happened to any photos that I took. The internet wasn't quite ready for them at the time.

Over the subsequent years I've had dozens of cameras. Before our phones took over, I would wonder the camera section of the electronics store just to see what was new. The idea for _Yay Cameras!_ is a website where cameras get "profile pages" with sample photos and videos, links to photographers who use them, suggested accessories, etc. I imagine it as a place where people interested in ~~photography~~ cameras can go to see what's new, research a new camera, or connect with others for tips and advice.

Will there be interest in this? I'm not sure, but that's not really the point. I want to build it for my own interest.

## "This is my Cam!"

This project has roots in a hack day app I built back in 2012 called _[This is my Cam!](https://roundhere.net/journal/Photo-Hack-Day-SF/)_. The app let Flickr users generate profile pages for their cameras using their uploaded photos. It was fun, simple, and surprisingly popular.

Here are some screenshots of _This is my Cam!_:

<a data-flickr-embed="true" href="https://www.flickr.com/photos/cjmartin/albums/72177720323189490" title="This is my Cam!"><img src="https://live.staticflickr.com/7258/7751325904_9927b3e2a8_z.jpg" width="640" height="443" alt="This is my Cam!"/></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

Unfortunately, it was a victim of its own success. The app was built with Django/Python and ran on a tiny EC2 micro instance. It needed offline jobs to fetch and process Flickr photos, and the server couldn’t handle the load when ~1000 people signed up in the first few days. I wasn’t ready to scale it up (or pay for it), so it fizzled out. I've used the dream of rebuilding it to explore various technologies over the years, but I've never gotten it back out there for public consumption.

## Why build this?

I'm not looking to build a "big thing" at the moment, but I want to put something out publicly that will give me a place to play with new tech. I'm constantly building little projects to scratch itches, but they rarely go further than satisfying my curiocity of the technology to justify a "product" or even a blog post. _This is my Cam!_ is too big, I'm not really interested in having auth, user management, permissions, and everything that comes with an app with users. For whatever reason I do _really_ want _Yay Cameras!_ (and _This is my Cam!_) to exist (I've held on to the domains for over a decade...), so I'm going to build something and see if it's worth maintaining.

### "MVP"

1. **Core Features**:
   - A script to discover and catalog cameras by analyzing photos from Flickr explore. (daily, manual execution)
   - A database of cameras with key details and example photos.

2. **Visual Design**:
   - Borrowing from the playful style of _This is my Cam!_ circa 2012.

3. **Tech Stack**:
   - Built with Next.js, hosted serverlessly on AWS using SST and DynamoDB.

4. **This Week’s Goal**:
   - Get a daily process running to update the camera database.
   - Deploy a basic frontend to [yaycameras.com](http://yaycameras.com) to browse the collection.

## What’s Next

I expect the backend to come together quickly, I've done most of the groundwork in the little projects I mentioned. I imagine the frontend is where I'm most likely to fall into rabbit holes with many new things to explore and learn. I'll probably make it extremely simple and ugly in this pass.

This isn’t a startup or a grand vision. It’s just a site I want to build because cameras are cool, and I think others might think so too. If you’ve got ideas or suggestions, I’d love to hear them.

