---

layout: post
title: "Secure Remote SSH Access with Cloudflare Tunnel"
place: "Truckee"
time: "2:11 PM"
---

Clearly I've been having a lot of fun with my rediscovered Raspberry Pis lately.

This is another field notes post, recording my process setting up cloudflared with a Cloudflare tunnel for SSH access to my home network.

This time I'm trying something different. Instead of googling for how to set things up I went to ChatGPT with this prompt:

<blockquote class="prompt">
I'm going to write a blog post about setting up remote SSH access through a cloudflare tunnel. Please give me a rough draft with your instructions on how I should do this, and I'll revise with my actual experience.
</blockquote>

I generally spend a lot of time on these types of posts:

1. Doing the thing, and learning the right things to do along the way.
2. Boiling the process down to only the _necessary_ steps, and writing them up.

The 2nd step often includes re-doing the whole process following my own instructions, to make sure that they actually work.

For every field notes post I write I do 10 other little projects and don't write them up because it takes too long. Let's see if this works...

Here's what ChatGPT gave me back, interspersed with my experience:

---

## Secure Remote SSH Access with Cloudflare Tunnel

Accessing your home server remotely can be risky if you simply open port 22 to the world. But with [Cloudflare Tunnel (formerly Argo Tunnel)](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/), you can create a secure SSH connection without exposing your IP address to the internet. Here's how I set it up.

## Why Use Cloudflare Tunnel?

Cloudflare Tunnel creates an outbound-only connection from your server to Cloudflare's edge. This avoids the need to open ports in your firewall or router and provides automatic TLS encryption. It's free for personal use and works well even on dynamic IP connections.

## Prerequisites

* A Cloudflare account
* A domain name managed by Cloudflare
* A server you want to access remotely via SSH
* SSH installed and running on the target server
* `cloudflared` installed on the server

## Step 1: Install cloudflared

On the server you want to access:

```bash
# On Debian/Ubuntu:
sudo apt install cloudflared

# Or download from the official site:
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation
```

## Step 2: Authenticate cloudflared with Cloudflare

```bash
cloudflared tunnel login
```

This opens a browser and asks you to authenticate. Once complete, cloudflared gets access to your Cloudflare zones.

## Step 3: Create and configure a tunnel

```bash
cloudflared tunnel create my-ssh-tunnel
```

This generates a tunnel ID and credentials file.

Then, configure the tunnel to route SSH traffic:

```bash
mkdir -p ~/.cloudflared

cat > ~/.cloudflared/config.yml <<EOF
tunnel: <tunnel-uuid>
credentials-file: /home/YOUR_USER/.cloudflared/<tunnel-uuid>.json

ingress:
  - hostname: ssh.yourdomain.com
    service: ssh://localhost:22
  - service: http_status:404
EOF
```

Replace `<tunnel-uuid>` and paths with actual values, and set your desired subdomain.

## Step 4: Create a DNS record for your tunnel

```bash
cloudflared tunnel route dns my-ssh-tunnel ssh.yourdomain.com
```

This creates a CNAME DNS record pointing your subdomain to the Cloudflare Tunnel endpoint.

## Step 5: Run the tunnel

For testing:

```bash
cloudflared tunnel run my-ssh-tunnel
```

To run as a service:

```bash
sudo cloudflared service install
```

## Step 6: Connect via SSH

From any remote machine:

```bash
ssh -o "ProxyCommand cloudflared access ssh --hostname ssh.yourdomain.com" user@ssh.yourdomain.com
```

Or, for convenience, add to your SSH config:

```ssh
Host myserver
  HostName ssh.yourdomain.com
  User your-username
  ProxyCommand cloudflared access ssh --hostname %h
```

Then just type:

```bash
ssh myserver
```

## Troubleshooting Notes

* If you get authentication errors, check your Cloudflare Zero Trust Access policies.
* Ensure the hostname matches the DNS record and config file.
* Make sure the local SSH daemon is running and accessible on port 22.

## Final Thoughts

This setup gave me secure SSH access to my home server without punching holes in my firewall. I’ll update this post with any issues or improvements I encounter over time.
