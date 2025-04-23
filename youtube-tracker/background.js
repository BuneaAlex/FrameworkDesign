// Persistent tracking state
async function getTrackingState() {
  return await chrome.storage.local.get(['startTime', 'isTracking']);
}

async function setTrackingState(startTime, isTracking) {
  await chrome.storage.local.set({ startTime, isTracking });
}

async function clearTrackingState() {
  await chrome.storage.local.remove(['startTime', 'isTracking']);
}

// Start tracking
async function startTracking() {
  const { isTracking } = await getTrackingState();
  if (!isTracking) {
    const now = Date.now();
    await setTrackingState(now, true);
    console.log("▶️ [TRACKING STARTED] at", new Date(now).toLocaleTimeString());
  } else {
    console.log("⚠️ Already tracking. Ignoring duplicate start.");
  }
}

// Stop tracking
async function stopTracking() {
  const { startTime, isTracking } = await getTrackingState();
  if (isTracking && startTime) {
    const elapsedMs = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const today = new Date().toISOString().split('T')[0];

    console.log(`⏱️ [TRACKING STOPPED] Elapsed: ${hours}h ${minutes}m ${seconds}s`);

    const storedData = await chrome.storage.local.get([today]);
    const previousSeconds = storedData[today] || 0;
    const newTotal = previousSeconds + totalSeconds;

    await chrome.storage.local.set({ [today]: newTotal });

    const h = Math.floor(newTotal / 3600);
    const m = Math.floor((newTotal % 3600) / 60);
    const s = newTotal % 60;

    console.log(`📅 [UPDATED STORAGE] ${today}: ${h}h ${m}m ${s}s (${newTotal} seconds total)`);
  } else {
    console.log("⛔ stopTracking() called, but no active session.");
  }

  await clearTrackingState();
}

// Handle messages from content.js
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("📩 [MESSAGE RECEIVED]", message);
  if (message.type === 'play') {
    startTracking();
  } else if (message.type === 'pause') {
    stopTracking();
  }
});

// Stop tracking when tab closes
chrome.tabs.onRemoved.addListener(() => {
  console.log("❌ Tab closed — stopping tracking.");
  stopTracking();
});

// Optional: Handle extension startup (in case it was tracking before)
chrome.runtime.onStartup.addListener(async () => {
  const { isTracking } = await getTrackingState();
  if (isTracking) {
    console.log("🔁 [RELOADED] Service worker restarted, resuming tracking...");
    // You could resume or stop tracking here depending on logic
    stopTracking(); // Just stop for now
  }
});
