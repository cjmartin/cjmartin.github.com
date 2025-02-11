--- 
layout: post
title: Changing your Darwin / Quicktime Streaming Server Password
place: Athens, GA
wordpress_id: 54
wordpress_url: http://nmi.roundhere.net/2005/12/11/changing-your-darwin-quicktime-streaming-server-password/
---

Many people may not realize that if you install Apple's "public source" [Darwin Streaming Server](http://developer.apple.com/darwin/projects/streaming/) onto a Mac running a normal version of OSX (not server), it really seems to install the exact same [QuickTime Streaming Server](http://www.apple.com/quicktime/streamingserver/) software that comes with OSX Server (minus some UI tools). Well, I found this out earlier this year when I installed DSS on my PowerBook to play with streaming content to a Nokia 6620.

I subsequently forgot that it was installed on my PowerBook until tonight when I wanted to run phpMyAdmin and I was getting errors because... QTSS has been running this whole time (oops).

Of course, I didn't remember what my username or password was for the QTSS, and I found that it was quite a pain to hunt down how to change it (doesn't seem to be in the docs from Apple), so I will post the method here for anyone else with this problem.

Open a terminal and enter:

```sh
sudo cat /Library/QuickTimeStreaming/Config/qtgroups
```

You will see something like:

```sh
admin: yourQTSSuser
```

Now to change the password, enter:

```sh
sudo qtpasswd yourQTSSuser
```

You may now go to [http://localhost:1220](http://localhost:1220) with your new password and carry on.