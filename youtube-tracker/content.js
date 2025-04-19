let lastState = null;

function initVideoTracking() {
  const video = document.querySelector('video');

  if (video) {
    console.log("🎬 [CONTENT] Video element found.");

    lastState = video.paused ? 'pause' : 'play';
    console.log(`📤 [CONTENT] Initial state: ${lastState}`);
    chrome.runtime.sendMessage({ type: lastState });

    video.addEventListener('play', () => {
      if (lastState !== 'play') {
        console.log("▶️ [CONTENT] Video started playing");
        chrome.runtime.sendMessage({ type: 'play' });
        lastState = 'play';
      }
    });

    video.addEventListener('pause', () => {
      if (lastState !== 'pause') {
        console.log("⏸️ [CONTENT] Video paused");
        chrome.runtime.sendMessage({ type: 'pause' });
        lastState = 'pause';
      }
    });

    // Done observing once we found the video
    clearInterval(observer);
  } else {
    console.log("⏳ [CONTENT] Waiting for video element...");
  }
}

// Check every 500ms until video appears
const observer = setInterval(initVideoTracking, 100);

  

