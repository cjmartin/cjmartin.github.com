---
layout: post
title: 'Tools: Voice Memo Manager'
place: Truckee, CA
time: 2:03 PM

tags: ['tools', 'ai', 'code', 'openai', 'development', 'vibe code']
categories: ['tools']

image: /assets/images/vmm.gif
description: >-
  I built a simple voice memo tool with ChatGPT to organize and transcribe thoughts captured with the iOS/MacOS/WatchOS voice memos app. Inspired by Whisper Memos, it helps me turn scattered thoughts into something usable.
---

I spend a lot of time in the car driving my kids to and from school and (many, many) other activities. This means that roughly half of my driving time is occupied with conversation and kid-centric audio, but the other half is great for thinking, listening to podcasts, and turning over thoughts and ideas in my head.

The non-kid car time generally adds up to _at least_ an hour a day. Unfortunately much of the thoughts and ideas I might have during this time are lost or forgotten because I don't have a good system for documenting them in the moment.

[Matt Webb's recent post](https://interconnected.org/home/2025/03/20/diane) about using [Whisper Memos](https://whispermemos.com) to transcribe his verbal outline of a talk (that he recorded while on a run), and then run that transcript through Claude to produce a high-level outline got me thinking about how I could do something similar to capture my thoughts while driving around.

### Process Development

**Problem**

I immediately ran into an issue. Much of the time my thinking in the car is happening while I'm _listening_ to something. Often the thoughts and ideas are directly derived or inspired by content that I'm consuming in an auditory format.

This is not super compatible with Whisper Memos, which seems designed to take a long(er) form recording and transcribe it into legible paragraphs (very cool), then send it in am email. I tried recording a new memo each time I wanted to note something, but that quickly led to a bunch of short clips, each generating a transcript and it's own email. This seems messy, and just not the use case Whisper Memos is designed for.

**Solution** 

iOS already has a voice memos app, which conveniently syncs all of your notes to the corresponding MacOS version. Bonus, I can use Siri to record a new voice memo; this seems like it might have potential!

But, The macOS Voice Memos app is... not great.

It’s nice that it automatically syncs recordings across your iPhone, Apple Watch, and Mac. But as of MacOS 14 (Sonoma), which I’m currently running, it still doesn’t support transcriptions. There’s no way to generate a transcript from a voice memo—let alone export one. You can’t even multi-select memos in the sidebar to drag them into another app. The actual audio files are buried somewhere in the file system.

This felt like a perfect use case for a bit of AI-assisted “vibe coding.”

I asked ChatGPT “Is there a way to access recordings and transcripts from the iOS Voice Memos app on MacOS?” (it was correct that you can, but then incorrect about where the files are stored), then continued with a very long chat that eventually led to a full-on, web-based local application. It lets me access and work with voice memos synced from my mobile devices to my Mac.

The process was surprisingly fun. ChatGPT needed a lot of help along the way, but it is entirely possible to very quickly write useful tools with ChatGPT as an assistant that doesn't mind if you ask it to tedious things over and over again. The result was a genuinely useful (if not particularly beautiful) tool.

![Voice Memos Manager](/assets/images/vmm.gif)

I won't get into the specific details of the app's functionality here, but if you're looking for something like this you can see the <span data-note="Is the code perfect and beautiful? No. But it doesn't need to be. I would have gotten caught up in perfectionism if I sat down and wrote this thing from scratch; it wouldn't exist, much less be up on Github.">code</span> and very detailed (thanks ChatGPT) [Readme on GitHub](https://github.com/cjmartin/Voice-Memo-Manager).

If you're more curious about the process of building with ChatGPT, you can see the [full chat on ChatGPT](https://chatgpt.com/share/67f56359-7de8-8003-b552-00800ee724bc).

### Does it work?

Yes! I had been listening to an [interview with Paul Frazee](https://se-radio.net/2025/01/se-radio-651-paul-frazee-on-bluesky-and-the-at-protocol/) about Bluesky and the AT Protocol, and over the few days of listening I recorded ~20 individual voice memos of my takeaways from the conversation. I was able to quickly organize, transcribe, and export those notes as one big chunk of text; then work with it to create a [cleaned up summary](https://roundhere.net/journal/se-radio-paul-frazee/) of what I learned. I retain things much better if I write them down, and I never would have gotten it done without those transcribed voice memos.

I've started recording all kinds of thoughts that otherwise would have been forgotten in the chaos of my daily life. This little tool that I never would have built without "vibe coding" makes those recordings useful to me.

[*"On the one hand, we have difficult things become easy; on the other hand, we have easy things become absolutely trivial"*](https://roundhere.net/journal/context-window-matt-webb/) - indeed.