const today = new Date().toISOString().split('T')[0];

chrome.storage.local.get([today], data => {
  const totalSeconds = data[today] || 0;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted = `${hours}h ${minutes}m ${seconds}s`;
  document.getElementById("time").textContent = formatted;
});

