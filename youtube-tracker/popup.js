document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('datepicker');
  
    const picker = new Pikaday({
      field: input,
      bound: false,
      container: document.getElementById('calendar'),
      onSelect: function(date) {
        const selectedDate = date.toLocaleDateString('en-CA');
        chrome.storage.local.get([selectedDate], data => {
          const totalSeconds = data[selectedDate] || 0;
  
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
  
          const formatted = `${hours}h ${minutes}m ${seconds}s`;
          document.getElementById('message').textContent = 
            `Time spent on ${selectedDate}: ${formatted}`;
        });
      }
    });
  
    // Force the calendar to show on load
    picker.show();
  
    // Show today's time
    const today = new Date().toISOString().split('T')[0];
    chrome.storage.local.get([today], data => {
      const totalSeconds = data[today] || 0;
  
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      const formatted = `${hours}h ${minutes}m ${seconds}s`;
      document.getElementById("time").textContent = `Today: ${formatted}`;
    });
  });