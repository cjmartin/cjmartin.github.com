---
layout: post
title: Getting Started with Kitty
place: Incine Village, NV
time: 9:39 AM PDT
---

Hello Kitty!

I'm cheating a bit and writing/posting this a day late, but Kitty is set up! The process was super easy, although I now understand that what Dan has shared on GitHub is a very simple example of what Kitty or an AI PA can do, and not the full extent of what he is doing... which makes complete sense, as people are different, this is a personal project, and it would take a massive product team to try and make it work for everyone. (and then it would also probably suck for everyone)

My first three morning questions from Kitty:

```
"What emotions are setting the tone for your morning, and can you identify their sources?"

"In consideration of your physical and emotional state, what's the key thing you would like to achieve today?"

"As you envision your day, is there any particular activity or short break you could incorporate to recharge?"
```

All three are clearly inspired by but not directly pulled from the default question set, and having been run through GPT they feel much more natural than the defaults. Weird, but huge thanks to Dan for being miles ahead of me in his thoughtfulness towards what to ask to help one write useful answers.

Tomorrow I'll write more about how these initial questions immediately impacted my day, and some other thoughts about how I want to use Kitty in my day-to-day life.

Here are my notes on setting up Kitty, in case someone happens to be here wanting to set up their own. Dan's readme is thorough, but there were a few things that were slightly more involved for me because I hadn't already set up an OpenAI Platform account.

### Setup Steps

1. Install [kitty](https://sw.kovidgoyal.net/kitty/) terminal. _This is not required, you can run the AI PA in any terminal._

While it's not mandatory to install the kitty terminal app, I'm doing it because I've never used kitty, and I want to see how it compares to the iTerm2 quake-style dropdown terminal I've been using for the last n years.

[kitty binary installation instructions](https://sw.kovidgoyal.net/kitty/binary/)

Stopping myself from going down a rabbit hole of exploring kitty, I'm going to use it as-is after install and drop [this thread](https://github.com/kovidgoyal/kitty/issues/45) here to explore customizing as a replacement for iTerm later.

2. Fork and clone Dan's [Basic Kitty Journaling](https://github.com/revdancatt/basic-kitty-journaling) repo to your local machine.

3. Set up an [OpenAI Platform](https://platform.openai.com/welcome?step=create) account *and* add some credits. I initially just created an API key, but it didn't work for GPT-4 without credits, and I had to create a new API key after adding credits, the existing key didn't automatically start working.

4. Follow the rest of the instructions in the [installation section of the readme](https://github.com/revdancatt/basic-kitty-journaling?tab=readme-ov-file#installation).