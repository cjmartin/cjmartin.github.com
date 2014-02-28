(function() {
	// Grab all Flickr hosted images on the page.
	var images = Array.prototype.slice.call(document.querySelectorAll("img[src^='https://farm'][src*='flickr.com'][src$='.jpg'],img[src^='http://farm'][src*='flickr.com'][src$='.jpg']"));
	var photoRe = /(flickr.com|flic.kr)\/(photos|p)\/(\w+)\/?(\d+)?\/?(in)?\/?(\w+-\d+|\w+)?/;
	var photoInfo = null;
	var embedSrc = null;

	function replaceImg(event) {
		// Figure out what we're going to embed.
		if (this.parentNode.nodeName.toLowerCase() === 'a' && this.parentNode.href !== "") {
			photoInfo = this.parentNode.href.match(photoRe);
			console.log(photoInfo);

			embedSrc = "https://www.flickr.com/photos/"+photoInfo[3]+"/"+photoInfo[4];

			if (photoInfo[5]) {
				embedSrc += "/in/"+photoInfo[6];
			}

			embedSrc += "/player";
		}

		if (embedSrc) {
			embed = document.createElement("iframe");
			embed.setAttribute("src", embedSrc);
			embed.setAttribute("frameborder", "0");
			embed.setAttribute("allowfullscreen", '');
			embed.setAttribute("webkitallowfullscreen", '');
			embed.setAttribute("mozallowfullscreen", '');
			embed.setAttribute("oallowfullscreen", '');
			embed.setAttribute("msallowfullscreen", '');
			embed.style.width = this.offsetWidth+"px"; 
			embed.style.height = this.offsetHeight+"px";

			this.parentNode.replaceChild(embed, this);
		}
	}

	// Replace the images with embeds.
	if (images) {
		images.forEach(function(image, index, array) {
			image.addEventListener('load', replaceImg, false);
		});
	}

	// console.log(images);
})();

// Flickr Web Embed
(function() {
	var frames = Array.prototype.slice.call(document.querySelectorAll("iframe[src*='//www.flickr.com/photos/']"));
	var divisor;
	var setHeight;
	var resizeTimer;

	function resizeFrames(event){
		frames.forEach(function(frame, index, array){			
			if (getComputedStyle(frame,null).getPropertyValue("max-width") == "none") {
				frame.style.maxWidth = "100%";
			}

			// Set initial lastWidth if it's not set and offsetWidth is frame.width
			if (!frame.dataset.lastWidth && frame.offsetWidth == frame.width) {
				frame.dataset.lastWidth = frame.offsetWidth;
			}

			if (frame.dataset.lastWidth != frame.offsetWidth && frame.offsetWidth <= frame.width) {
				divisor = frame.width/frame.offsetWidth;
				setHeight = frame.offsetHeight/divisor;

				frame.style.height = setHeight + "px";
				frame.dataset.lastWidth = frame.offsetWidth;
			}
		});
	}

	if (frames) {
		window.addEventListener('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(resizeFrames, 250);
		}, false);

		resizeFrames();
	}
})();

// Disqus comment counts
(function() {
	var links = document.getElementsByTagName('a');
	var query = '?';
	for(var i = 0; i < links.length; i++) {
		if(links[i].href.indexOf('#disqus_thread') >= 0) {
			query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
		}
	}
	document.write('<script charset="utf-8" type="text/javascript" src="http://disqus.com/forums/cjmartin/get_num_replies.js' + query + '"></' + 'script>');
})();
// End comment counts

// Google Analytics
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

try {
	var pageTracker = _gat._getTracker("UA-7710190-4");
	pageTracker._trackPageview();
} catch(err) {}
// End Google Analytics

// Woopra
var woo_settings = {idle_timeout:'300000', domain:'roundhere.net'};
(function(){
	var wsc = document.createElement('script');
	wsc.src = document.location.protocol+'//static.woopra.com/js/woopra.js';
	wsc.type = 'text/javascript';
	wsc.async = true;
	var ssc = document.getElementsByTagName('script')[0];
	ssc.parentNode.insertBefore(wsc, ssc);
})();
// End Woopra