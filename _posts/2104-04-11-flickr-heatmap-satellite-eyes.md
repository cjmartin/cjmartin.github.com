---
layout: post
title: Flickr Heatmap Tiles in Satellite Eyes
place: San Francisco, CA
time: 10:40pm
---

I love [Satellite Eyes](http://satelliteeyes.tomtaylor.co.uk/). I've been using it for the last few years(?) to beautify my desktop with local [Stamen Watercolor Maps](http://maps.stamen.com/#watercolor/).

When I saw [these Flickr heatmap tiles](http://trafficways.org/darkbase.html#12/37.7675/-122.4558/flickr-apr10/nobase/12/0.0066/1.0119/0.5/twos/antialias/nogps/mercator/-cFFFF00) by [Eric Fischer](https://www.flickr.com/photos/walkingsf), I immediately wanted them as my desktop. Here's how to do it.

1.	If you haven't already, [install Satellite Eyes](http://satelliteeyes.tomtaylor.co.uk/).
2.	Head to the Satellite Eyes preferences.
	
	![Sattelite Eyes Menu](/images/seyes_menu.png "Sattelite Eyes Menu")
	
3.	Click "Manage Map Styles..."
	
	![Sattelite Eyes Preferences](/images/seyes_prefs.png "Sattelite Eyes Preferences")
	
4.	Add a new map style, set the source to:
	
	`http://trafficways.org/cgi-bin/tile.cgi?map=flickr-apr10&opt=-cFFFF00%20-M%2037%20-B12:0.0066:1.0119%20-G0.5&z={z}&x={x}&y={y}`
	
	![Sattelite Eyes Map Styles](/images/seyes_add_map.png "Sattelite Eyes Map Styles")
	
5.	Set Satellite Eyes to use the new map.
	
	![Sattelite Eyes Select Map](/images/seyes_select_map.png "Sattelite Eyes Select Map")
	
6.	Enjoy!