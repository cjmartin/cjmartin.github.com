---
layout: post
title: "SSH via Cloudflare tunnel using iSH on iPad"
place: Truckee CA
time: 11:30AM
tags:
  - SSH
  - Cloudflare
  - iPad
  - iSH
categories:
  - field-notes

description: "How to SSH from an iPad using iSH and a Cloudflare tunnel."
image: 
---

Quick post today, with relevance to virtually no one, but I googled it and came up empty so might as well write it down.

The onset of summer has meant much less regular time in front of the computer. Instead I've been carrying my iPad, and giving it the 20th try as a lightweight productivity device. I'm running the iPadOS 26 Developer Beta, which seems to be moving more in the MacOS direction, so maybe we'll get there.

I have a Raspberry Pi that I plan to set up with [VS Code Server](https://code.visualstudio.com/docs/remote/vscode-server) for remote code editing, and it's set up with a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) for remote SSH access, which requires proxying through the `cloudflared` client.
This assumes you already have a CF tunnel set up for SSH. If not you should probably look into [Tailscale](https://tailscale.com/) instead; I would if I wasn't already set up with Cloudflare.
Here's how I went about setting up [https://ish.app/](iSH) on my iPad to make everything work.
1. Install iSH, which is a piece of wizardry that gives you an x86 Alpine Linux shell on your iPad.
2. Install required packages:
  `apk add openssh-client curl nano`
At this point `ssh user@your.cloudflare.tunnel` will fail with a timeout error.
Since we're in a full Linux shell, we can use the x86 cloudflared binary to proxy the connection, just as we would on any other Linus system.
3. `mkdir ~/bin && cd ~/bin` - create a user `bin` directory to hold the cloudflared binary.
4. Grab the latest x86 (32 bit) binary from [GitHub](https://github.com/cloudflare/cloudflared/releases). The current release is 2025.7.0, you'll want to update the curl command below to the latest `linux-386` version.
  `curl -LO https://github.com/cloudflare/cloudflared/releases/download/2025.7.0/cloudflared-linux-386`
5. Tell SSH to proxy connections to `your.cloudflare.tunnel` through the cloudflared client.
  `nano ~/.ssh/config`
  Add the following:
  ```
  Host your.cloudflare.tunnel
  ProxyCommand /root/bin/cloudflared-linux-386 access ssh --hostname %h
  ```
6. `ssh your.cloudflare.tunnel` should now work!

iSH is not the most practical way to work on a remote machine, but this is sufficient for logging in for the occasional need. Now I can connect from the iPad to set up VS Code Server on the remote host.