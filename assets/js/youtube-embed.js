document.addEventListener("DOMContentLoaded", function () {
    function resizeVideoContainers() {
        document.querySelectorAll("[id^='videoContainer-']").forEach(container => {
            const videoId = container.getAttribute("data-video-id");

            const parent = container.parentElement;
            const originalWidth = parseInt(container.style.width, 10); // Get the original width

            if (parent.clientWidth < originalWidth) {
                const setWidth = parent.clientWidth;
                const setHeight = parent.clientWidth / (originalWidth / parseInt(container.style.height, 10));
                // Resize the container
                container.style.width = setWidth + "px";
                container.style.height = setHeight + "px";

                resizeYoutubePlayer(videoId, setWidth, setHeight);
            }
        });
    }

    async function resizeYoutubePlayer(videoId, width, height) {
        // Resize the youtube iFrame, if loaded
        let playerResized = false;
        let attempts = 0;
        const maxRetries = 5;
        while (attempts < maxRetries && !playerResized) {
            console.log('Attempting to resize youtube player for video', videoId);
            const youtubePlayer = document.getElementById(`youtubePlayer-${videoId}`);
            if (youtubePlayer && youtubePlayer instanceof HTMLIFrameElement) {
                youtubePlayer.style.width = width + "px";
                youtubePlayer.style.height = height + "px";
                playerResized = true;
            }
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
        }
    }

    function onYouTubeIframeAPIReady() {
    window.YT.ready(function() {
        document.querySelectorAll("[id^='videoContainer-']").forEach(container => {
            const videoId = container.getAttribute("data-video-id");
            initializeYouTubePlayer(videoId);
        });
    });
    }

    function initializeYouTubePlayer(videoId) {
        new YT.Player(`youtubePlayer-${videoId}`, {
            videoId: videoId,
            events: {
                "onError": function () {
                    document.getElementById(`fallback-${videoId}`).style.display = "block";
                    document.getElementById(`youtubePlayer-${videoId}`).style.display = "none";
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

    // Run on load
    loadYouTubeAPI();
    resizeVideoContainers();
});
