---
layout: post
title: Virtualenv with Virtualenvwrapper on Ubuntu
place: San Francisco, CA
time: 1:20pm
---

I'm a big fan of using virtualenv to create isolated environments for Python projects. Here's how I set everything up on Ubuntu 12.10.

**Install pip**

	sudo apt-get install python-pip

**Install virtualenv**

	sudo pip install virtualenv

**Create a dir to store your virtualenvs** (I use ~/.virtualenvs)

	mkdir ~/.virtualenvs

At this point you are all set to use virtualenv with the standard commands. However, I prefer to use the extra commands included in [virtualenvwrapper](http://virtualenvwrapper.readthedocs.org/en/latest/). Lets set that up.

**Install virtualenvwrapper**

	sudo pip install virtualenvwrapper

**Set WORKON_HOME to your virtualenv dir**

	export WORKON_HOME=~/.virtualenvs

**Add virtualenvwrapper.sh to .bashrc**

Add this line to the end of `~/.bashrc` so that the virtualenvwrapper commands are loaded.

	. /usr/local/bin/virtualenvwrapper.sh

Exit and re-open your shell, or reload .bashrc with the command `. .bashrc` and you're ready to go.

**Create a new virtualenv**

	mkvirtualenv myawesomeproject

to exit your new virtualenv, use `deactivate`.

**Switch between enviornments with workon**

To load or switch between virtualenvs, use the `workon` command:

	workon myawesomeproject

You can read more about virtualenv  [here](http://www.virtualenv.org/en/latest/) and virtualenvwrapper [here](http://virtualenvwrapper.readthedocs.org/en/latest/). You might also want to look at this very similar (and probably better) [python guide post](https://python-guide.readthedocs.org/en/latest/dev/virtualenvs/).

Questions?