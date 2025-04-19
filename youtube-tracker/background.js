let startTime = null;
let isTracking = false;

function startTracking() {
  if (!isTracking) {
    startTime = Date.now();
    isTracking = true;
    console.log("▶️ [TRACKING STARTED] at", new Date(startTime).toLocaleTimeString());
  } else {
    console.log("⚠️ Already tracking. Ignoring duplicate start.");
  }
}

function stopTracking() {
  if (isTracking && startTime) {
    const elapsedMs = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600); 
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const today = new Date().toISOString().split('T')[0];

    console.log(`⏱️ [TRACKING STOPPED] Elapsed: ${hours}h ${minutes}m ${seconds}s`);

    chrome.storage.local.get([today], data => {
      const previousSeconds = data[today] || 0;
      const newTotal = previousSeconds + totalSeconds;

      chrome.storage.local.set({ [today]: newTotal }, () => {
        const h = Math.floor(newTotal / 3600);
        const m = Math.floor((newTotal % 3600) / 60);
        const s = newTotal % 60;

        console.log(`📅 [UPDATED STORAGE] ${today}: ${h}h ${m}m ${s}s (${newTotal} seconds total)`);
      });
    });
  } else {
    console.log("⛔ stopTracking() called, but no active session.");
  }

  startTime = null;
  isTracking = false;
}

// Handle play/pause messages from content.js
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("📩 [MESSAGE RECEIVED]", message);
  if (message.type === 'play') {
    startTracking();
  } else if (message.type === 'pause') {
    stopTracking();
  }
});

chrome.tabs.onRemoved.addListener(() => {
  console.log("❌ Tab closed — stopping tracking.");
  stopTracking();
});
