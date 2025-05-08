function scanAndStyleFlickrEmbeds() {
  const flickrFrames = document.querySelectorAll('.flickr-embed-frame');
  flickrFrames.forEach(frame => {
    try {
      const iframeDoc = frame.contentDocument || frame.contentWindow.document;
      const img = iframeDoc && iframeDoc.querySelector('.flickr-embed-photo');
      if (img) {
        img.style.backgroundColor = 'inherit';
      }
    } catch (e) {
      // Cross-origin or not yet loaded
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  scanAndStyleFlickrEmbeds();
  // Observe for dynamically added flickr embeds
  const observer = new MutationObserver(() => {
    scanAndStyleFlickrEmbeds();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});