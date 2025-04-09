---
layout: post
title: 'Listening: Paul Frazee on Bluesky and the AT Protocol'
place: Truckee, CA
time: 4:32 PM

tags: ['podcast', 'atprotocol', 'bluesky', 'development']
categories: ['links', 'titag']
link_category: links

description: >-
  My notes on the Software Engineering Radio Podcast with Paul Frazee.

link: https://se-radio.net/2025/01/se-radio-651-paul-frazee-on-bluesky-and-the-at-protocol/
redirect_from:
- /journal/se-radio-paul-frazee/
---

{% include link.html link="https://se-radio.net/2025/01/se-radio-651-paul-frazee-on-bluesky-and-the-at-protocol/" link_text="SE Radio 651: Paul Frazee on Bluesky and the AT Protocol" %}

[This Software Engineering Radio episode](https://se-radio.net/2025/01/se-radio-651-paul-frazee-on-bluesky-and-the-at-protocol/) is one of the best overviews I’ve come across so far for how the AT Protocol (Authenticated Transfer Protocol) that Bluesky is built on actually works. It's from January 2025 and features an in-depth conversation with [Paul Frazee](https://www.pfrazee.com) ([@pfrazee.com](https://bsky.app/profile/pfrazee.com)), CTO of Bluesky.

I’d recommend it to anyone curious about decentralized social networks, especially if you're wondering how Bluesky differs from protocols like ActivityPub (used by Mastodon).

One thing I really appreciate about this podcast is the format — it’s structured and well-moderated, with thoughtful, prepared questions that keep the conversation focused. It's much more focused and clear than the more meandering tech talk formats out there.

Here are the notes I collected while listening to the podcast. I do this mainly to educate myself, so if I got anything wrong, [yell at me on Bluesky](https://bsky.app/profile/cjmart.in).

## Bluesky/AT Protocol Origin

Paul describes the origin of Bluesky  as a Twitter-funded project to explore alternative architectures for social media. He describes three main categories of decentralized networking tech at the time:

- **Peer-to-peer** (think BitTorrent or Secure Scuttlebutt),
- **Federation** (Mastodon and ActivityPub), and
- **Blockchain-based** systems.

Although blockchain is mentioned, it’s not a big part of the conversation. Paul’s experience comes primarily from the peer-to-peer world, including nearly a decade working on Secure Scuttlebutt. He gives a summary of what worked and what didn’t in that space — namely, the limitations around device syncing, key management, and especially scale. Nice quote: ["It can't be rocket science to do a comment section"](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=6m16s).

## What Is the AT Protocol?

“AT” stands for **Authenticated Transfer**. It’s built around a few core ideas:

- **DIDs (Decentralized Identifiers)**, based on a W3C spec — these allow users to have portable identities not tied to any single server.
- **PDS (Personal Data Servers)**, where each user’s data lives.
- A **relay-and-aggregation system** that pulls in updates from across the network to power app-level features like timelines, threads, and search.

This setup enables a decentralized (although still server based), yet scalable, architecture.

Frazee draws a comparison between ATProto and traditional web infrastructure: think of PDSs as websites, relays as search engine crawlers, and app views as search interfaces or timelines. They get into the architecture discussion around [11 minutes in](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=11m).

## Portability and DIDs

One of the big differentiators is account portability using DIDs ([decentralized identifiers](https://www.w3.org/TR/did-1.0/)). DIDs provide stable, cryptographic identifiers — and they’re key to enabling server migration without breaking your social graph.

Paul explains this well around [31-minutes in](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=31m): in Mastodon, if you move to a new server, your identity and history are fragmented. In ATProto, your DID doesn’t change — it just points to a new server. This eliminates the cascading breakage that happens with federated identifiers.

## Domains, Handles, and Identity

At [36 minutes](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=36m), Frazee talks about how handles work in ATProto. Your handle can be your own domain name, which adds an element of identity ownership. A fun example: [Senator Ron Wyden](https://bsky.app/profile/wyden.senate.gov) uses `@wyden.senate.gov` as his handle — no blue check needed. It’s a trust signal in DNS itself.

## Custom Feeds and Community Innovation

Around [39–41 minutes](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=39m) Paul describes how community members have been building tools to create **custom feeds**. The official Bluesky app doesn’t offer a built-in feed editor yet, but others have already made composable UIs for combining hashtags, user lists, and post types into curated feeds. He mentions the “[Quiet Posters](https://bsky.app/profile/did:plc:vpkhqolt662uhesyj6nxm7ys/feed/infreq)” feed, which surfaces posts from people who don’t post often — a simple but clever way to surface quieter voices.

## Moderation: Labels

Another significant topic is moderation — both **content moderation** and **safety/legal compliance**. Around [42 minutes](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=42m), Paul explains how **labels** serve as a metadata layer that anyone (including independent moderation services) can publish and subscribe to. This allows client apps to let users choose their own filters — a more flexible model than top-down moderation?

## Building on ATProto

Towards the end of the episode (around [46 minutes](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=46m)), Paul lists a few projects already using the protocol:

- [FrontPage](https://frontpage.fyi) – a Hacker News clone,
- [Smoke Signal](https://docs.smokesignal.events) – an events app,
- [Bluecast](https://www.bluecast.app/) – a live audio chat app.

He also describes how building apps works in practice. You authenticate users via OAuth, then write to their PDS and listen to the relay’s event stream to update your UI. It’s a little different from a traditional app stack but not dramatically so — and in some ways, it simplifies the developer experience (says Paul, I haven't built anything on ATProto yet).

## Scale and Opensource

Paul mentions that Bluesky has scaled to over 11 million users (at that time, I believe they're at 30M+ now) and 1.5–2 million daily actives — with no major architecture bottlenecks ([1:05](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=1h5m)). That’s huge, especially for a new + decentralized protocol, but it sounds like they also have massive infrastructure and funding. I'm curious how much bootstrapping an app on ATProto would realistically cost, especially if it took off. I'm working my way through the talks from the recent [ATmosphereConf](https://www.youtube.com/playlist?list=PLyIg0j_mbb2tVegEMBg5ke2Z-1ALksU-I) now, and I hope there's more insight from independent developers in there.

I was also surprised to learn that **all the source code for BlueSky is open source** and [available on GitHub](https://github.com/bluesky-social) ([1:07](https://www.youtube.com/watch?v=0sCaHN-pl2M&t=1h5m)).

## Final Thoughts

Paul is a clear communicator. He has extensive experience and I'm impressed with his ability to communicate an overview of both the AT protocol and Blue Sky in just over an hour.

After listening, I am significantly more interested in learning about the AT protocol. It's great to feel excited about a _protocol_ again, and feels similar to the bygone days of REST APIs and RSS being novel new things to play with.

One idea that I might throw some "vibe coding" at: an RSS reader backed by ATProto, where you can follow what your Bluesky contacts are reading or listening to, as well as aggregate links shared by friends (and find new feeds) — kind of like the Breaker podcast app (RIP). Absolutely not something the world is crying out for, but it would be fun.
