---
layout: post
title: SF2000 Updates and Improvements
place: Truckee, CA
time: 11:47 PM PDT
tags: ['notetoself', 'howto', 'sf2000']
---

Today was a snow day, that means my kids got much more video game time than usual, and in our house video game time means "retro" games powered by the amazing [~$20 SF2000](https://www.aliexpress.us/w/wholesale-sf2000.html) (Super Mario Brothers 3 is still the pinnicle of game design, and I will die on this hill).

The SF2000 is a marvel, and being able to hook it up to the TV and play multiplayer NES and SNES games with my kids makes me *so* happy. But the screen tearing and other miscellaneous issues that it comes with out of the box motivated me to do some research and updating today.

I'm sharing what I did here, because there is *a lot* of information to be found about the SF2000, enough that it can be overwhelming if you're just looking to make it better without watching a bunch of youtube videos and reading way more than you need to get the job done. I've now done both of those for you, and can share the basics.

Goals:
- ✅ Update/fix the bootloader.
- ✅ Install Multicore firmware, as it has the fixes and improvements we're looking for and it's based on the official firmware.
- ✅ Fix screen tearing (seems that multicore has software fixes).
- ☐ [Change default games for each system](https://vonmillhausen.github.io/sf2000/#how-do-i-change-the-four-shortcutsgames-listed-on-each-systems-main-menu-page), make all the good Marios the defaults, maybe Sonic, Zelda, try to remember the best games for each system.
  I didn't get this one done, but multicore has slightly better defaults than the stock firmware, so it's not urgent anymore.

This guy has written many, many more words about the SF2000 than I ever will. If you want to get deep, go check it out: [https://vonmillhausen.github.io/sf2000/](https://vonmillhausen.github.io/sf2000/)

## Update the Bootloader

Apparently it is critical to do this before doing anything else, or you risk bricking the device, so do it. [More information here](https://vonmillhausen.github.io/sf2000/#bootloader-bug).

The process is quick and easy if you're starting from a working SF2000. Here are the steps, copied from [here](https://vonmillhausen.github.io/sf2000/#if-your-sf2000-is-currently-able-to-boot-normally):

1. Ensure your SF2000 is in a state where it boots normally when turned on (displays a boot logo, proceeds to the stock firmware main menu)
2. Ensure your SF2000's battery is fully charged (having the device power off during the patching process will likely "brick" it, rendering it inoperable)
3. Power off the SF2000, and remove the microSD card
4. Connect the microSD card to your computer
5. Download this zip file: [SF2000_bootloader_bugfix.zip](https://vonmillhausen.github.io/sf2000/bootFix/SF2000_bootloader_bugfix.zip)
6. Extract the zip file; inside is a folder called `UpdateFirmware`, containing a single file called `Firmware.upk`
7. Copy the `UpdateFirmware` folder to the root of the microSD card, so that the `UpdateFirmware` folder is in the same place as the `bios` and `roms` folders (i.e., you'll have an `sd:/UpdateFirmware/Firmware.upk` file)
8. Eject the microSD card from your computer, and put it back in the SF2000
9. Turn the SF2000 on; you should see a message in the lower-left corner of the screen indicating that patching is taking place. The process will only last a few seconds. If you do not see this message, and instead just go to the main menu as normal, then either this means your SF2000 has previously had the fix applied already, or you should double-check you've placed the patch file in the right place
10. When the patching is complete, you will be taken to the main menu as usual
11. Power off the SF2000, and remove the microSD card
12. Connect the microSD card to your computer
13. Delete the `UpdateFirmware` folder (it's no longer needed)

## Install Multicore Firmware

It's tough to track down the best sources of information about this. Apparently the real activity happens on Discord and Telegram, but I'm not committed enough to go there. There is some good information [here](https://vonmillhausen.github.io/sf2000/#multicore-modified-stock), and it looks like the most "official" builds [live here](https://github.com/madcock/sf2000_multicore_cores/releases), but this fairly recent [youtube guide/review](https://www.youtube.com/watch?v=Y2AI1q1Zp4s 'Unlock Your SF2000's Potential with Multicore! (Install Guide & review)') points to a more recent "Purple Neo" build, which I'm going to use.

Firmware installation steps:

1. Make sure you've fixed the bootloader, above.
2. Download the 10GB zip file, found [here](https://archive.org/details/purple-neo-multicore-0.10-23365b-6-2024-07-11-b).
3. Either use a new Fat32 formatted microSD card, or back up and format the stock microSD card as Fat32.
4. Insert the microSD card and determine it's name. Mine is called 'NO NAME'.
	```sh
	% ls /Volumes
	Macintosh HD	NO NAME
	```
5. (Optional) Create a zip of the original contents, I'll store it on the desktop for now.
  ```sh
	% zip -r ~/Desktop/SF2000_backup.zip /Volumes/NO\ NAME/
	```
6. Use Disk Utility to erase (format) the microSD card, and choose MS-DOS (FAT) as the format.
7. Extract the contents of the 10GB zip you downloaded earlier to the microSD card.
	```sh
	% unzip ~/Downloads/PurpleNeo_Multicore_0.10_23365b6_2024-07-11_b.zip -d /Volumes/NO\ NAME/
	```
8. Do the screen tearing fix below.
9. Eject the microSD card, put it back in the SF2000, and boot.

## Improve Screen Tearing

Some games that we really enjoy like Super Mario Brothers have pretty bad screen tearing with the default firmware. Once multicore is installed we can set a config value to enable some software improvements.

This is a one-line config change fix, but if you want to see more, [here's a youtube video about it](https://www.youtube.com/watch?v=oN8kQqc9Dp0 'SF2000 Screen Tearing Fix - Welcome to Smoother Gameplay! (Guide)').

1. Install multicore following the steps above.
2. With the microSD card still inserted in your computer, open the file `cores/config/multicore.opt`.
	```
	nano /Volumes/NO\ NAME/cores/config/multicore.opt
	```
3. Set the value `sf2000_tearing_fix` on line 9 to `fast` and save the file (`^X` if using nano).
4. Eject the microSD card, put it back in the SF2000, and boot.

That's it, enjoy your improved SF2000!