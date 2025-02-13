document.addEventListener("DOMContentLoaded", function () {
  function onYouTubeIframeAPIReady() {
      document.querySelectorAll("[id^='youtubePlayer-']").forEach(playerDiv => {
          const videoId = playerDiv.getAttribute("data-video-id");
          initializeYouTubePlayer(videoId);
      });
  }

  function initializeYouTubePlayer(videoId) {
      new YT.Player(`youtubePlayer-${videoId}`, {
          videoId: videoId,
          events: {
              "onError": function () {
                  document.getElementById(`fallback-${videoId}`).style.display = "block";
                  document.getElementById(`videoContainer-${videoId}`).style.display = "none";
              }
          }
      });
  }

  function loadYouTubeAPI() {
      if (window.YT && typeof YT.Player === "function") {
          console.log("YouTube IFrame API already loaded.");
          onYouTubeIframeAPIReady();
          return;
      }

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
          let script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          script.onload = onYouTubeIframeAPIReady; // Ensure it's initialized after loading
          document.body.appendChild(script);
      } else {
          let checkYTReady = setInterval(() => {
              if (window.YT && typeof YT.Player === "function") {
                  clearInterval(checkYTReady);
                  onYouTubeIframeAPIReady();
              }
          }, 500);
      }
  }

  loadYouTubeAPI();
});
