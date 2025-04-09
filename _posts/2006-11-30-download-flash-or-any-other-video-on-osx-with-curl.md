---
layout: post
title: Download Flash (or any other) Video on OSX with Curl
place: Atlanta, GA
wordpress_id: 78
wordpress_url: http://cjmart.in/2006/11/30/download-flash-or-any-other-video-on-osx-with-curl/

categories: ['fieldnotes']

redirect_from:
- /journal/download-flash-or-any-other-video-on-osx-with-curl/
---

So say you come across a video online that is so great you would really like to save a copy locally to watch over and over again (assuming you are allowed to). For sites such as YouTube and the other majors this might not be a problem... there are numerous tools available to grab content. However, some sites don't work with the commonly available tools, or maybe you would just rather use tools that are already included in OSX, well here's how.

Say you want to grab a wonderful video about "Happy Feet" from Reuters.com...

1. **Using Safari** navigate to the page that contains the video.
   ![Picture1](http://files.cjmart.in/curlVideos/Picture1.png)

2. Open the "Activity" window from the Safari Window menu.
   ![Picture2](http://files.cjmart.in/curlVideos/Picture2.png)

3. In the Activity window, find the page that contains the video, and click on the triangle to show all the elements loaded in the page.
   ![Picture3](http://files.cjmart.in/curlVideos/Picture3.png)

4. Scan the list until you find a video file (in this case a .flv flash video file). It is easy to pick out the video files as they are generally much larger in size than everything else. Also note that a page might contain more than one video file (if the movie first loads with an advertisement etc.) you generally want to pick the biggest one.
   ![Picture4](http://files.cjmart.in/curlVideos/Picture4.png)

   **Edit (Dec 1, 2006)**
   It seems that some sites (I've seen it at YouTube) actually load the video without the extension. In this case, just look for a large file (it's called get_video on YouTube) and add the proper extension to the end (ie. for YouTube, .flv).

5. Double click on the url of the video file and a new Safari window will open. At this point, Safari might start downloading the video. If it does not and a bunch of random text starts displaying in the browser that's ok, continue by selecting the url and copying it.
   ![Picture5](http://files.cjmart.in/curlVideos/Picture5.png)

6. Open up a terminal (Terminal.app is located in the Utilities folder inside your Applications folder). In the terminal, type (leave out the "&lt;&gt;"):
   ```sh
   $ curl <paste> -o <where>/<what>
   ```
   Make sure that whatever you chose to name the video ends with the same extension as the original file, in this case .flv. Here's what it would look like for the "Happy Feet" video:
   ```sh
   $ curl http://int1.fp.sandpiper.net/reuters/t_assets/20061127/a72e...f2943.flv -o ~/Desktop/HappyFeet.flv
   ```
   This would save the video to my desktop and name it HappyFeet.flv.

7. Press enter and you should see something like this as the video downloads:
   ![Picture7](http://files.cjmart.in/curlVideos/Picture7.png)

8. When it's done, you should have a copy of the video file on your local disk. You'll need an application that can play flash video to watch .flv files, I recommend [VLC](http://www.videolan.org/vlc/) or the [Perian plugin for QuickTime](http://perian.org/).
   ![Picture8](http://files.cjmart.in/curlVideos/Picture8.png)

- Enjoy!
