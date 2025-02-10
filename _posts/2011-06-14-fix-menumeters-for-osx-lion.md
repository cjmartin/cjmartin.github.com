--- 
layout: post
title: Fix MenuMeters for OSX Lion
place: San Francisco, CA
time: 6:46pm
---

Update: The current version of [MenuMeters (1.5)](http://www.ragingmenace.com/software/menumeters/) supports Lion. Get it [here](http://www.ragingmenace.com/software/menumeters/).

[MenuMeters](http://www.ragingmenace.com/software/menumeters/) is one of those little things that I must install immediately after any fresh install of OSX. Unfortunately, the current build doesn't run out of the box on OSX 10.7 "Lion," but it's easily fixed.

The problem lies with the hack MenuMeters uses to insert menus into the OSX menu bar, [MenuCracker](http://sourceforge.net/projects/menucracker/). We need to update the version included with MenuMeters to the latest version.

1. Go ahead and install [MenuMeters](http://www.ragingmenace.com/software/menumeters/) if you haven't already; make note of where you install it (/Library or ~/Library).
2. Download the latest version (currently 2.2) of [MenuCracker from SourceForge](http://sourceforge.net/projects/menucracker/).
3. Replace `MenuCracker.menu` in `(~)/Library/PreferencePanes/MenuMeters.prefPane/Contents/Resources/` with the version you just downloaded. If you're lazy, you can paste this into your terminal:

```sh
sudo cp -R /Volumes/MenuCracker\ 2.2/MenuCracker.menu /Library/PreferencePanes/MenuMeters.prefPane/Contents/Resources/
```

4. Close/(re)Launch System Preferences, and enable MenuMeters. Boom.