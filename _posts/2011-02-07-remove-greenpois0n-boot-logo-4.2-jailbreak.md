---
layout: post
title: Remove greenpois0n Boot Logo After 4.2 Jailbreak
place: San Francisco, CA
time: 11:33am
redirect_from:
- /journal/remove-greenpois0n-boot-logo-4.2-jailbreak/
---

I greatly appreciate the work of the iOS hacking community; I really do. I've never used a non-jailbroken iPhone (for long), and I can't imagine upgrading to a new iOS version without a jailbreak and all the goodies I've come to rely on in my iPhone world.

However, I expect a jailbreak to do its thing and then disappear. Installing a utility like Cydia is acceptable (and expected), but I want my iPhone to look and operate from the UI/UX side just as it did before. This means I don't want any themes installed, I don't want the apple on boot to switch to a pineapple, and I certainly don't want an animated skull logo every time I reboot my phone.

Anyway, enough bitching; the beauty of having a jailbroken phone means you can get in there and change it.

1. Install OpenSSH from Cydia.
2. SSH into your iPhone using the default account "mobile," password "alpine."
3. Switch to root with:

    ```sh
    $su
    ```

    The password is also "alpine."
4. Run the following command:

    ```sh
    $rm /usr/bin/animate
    ```

That's it! On the next reboot, you'll only see the standard apple logo, yay! If you want to keep SSH installed on your phone, you should change the default password using `passwd`, right now.