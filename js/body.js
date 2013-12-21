// Flickr Web Embed
(function() {
	var frames = Array.prototype.slice.call(document.querySelectorAll("iframe[src*='//www.flickr.com/photos/']"));
	var divisor;
	var height;

	function resizeFrames(event){
		frames.forEach(function(frame, index, array){
			//console.log(frame.offsetWidth + " | " + frame.width);
			if (frame.offsetWidth <= frame.width) {
				divisor = frame.width/frame.offsetWidth;
				height = frame.offsetHeight/divisor;
				console.log(divisor + " | " + height);
				frame.style.height = height + "px";
			}
		});
	}

	if (frames) {
		resizeFrames();
		window.addEventListener('resize', resizeFrames, false);
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