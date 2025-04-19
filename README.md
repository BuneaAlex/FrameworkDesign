---

# YouTube Watch Time Tracker Extension

A Chrome extension that tracks how much time you spend watching YouTube videos each day. It monitors when a video is playing and records the total time for each day.

---

## Features

- Tracks the amount of time spent watching YouTube videos each day.
- Displays the tracked time on a calendar, allowing you to see your total watch time for any specific date.
- Tracks time in hours, minutes, and seconds (e.g., "2h 34m 10s").
- The calendar allows you to select a date and see the recorded watch time for that date.
- Shows the total time spent watching videos for **today** by default.

---

## Installation

### 1. Download the Extension Files

Clone or download the project files to your local machine.

```bash
git clone https://github.com/your-repo/yt-watch-time-tracker.git](https://github.com/BuneaAlex/FrameworkDesign.git
```

### 2. Load the Extension in Chrome

1. Go to `chrome://extensions/` in your browser.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the folder where you downloaded the extension.
4. Once the extension is installed, you'll see the extension icon in the Chrome toolbar.

---

## How It Works

### 1. Tracking Watch Time
The extension will track time whenever a YouTube video is playing. It continuously monitors the **current tab** for active video playback and updates the watch time accordingly.

### 2. Viewing Your Watch Time
Click the extension icon to open the popup:
- **Today’s Watch Time**: Displays the total time you've spent watching YouTube today.
- **Calendar View**: Select any date on the calendar to view your total watch time for that day.

### 3. Calendar
- The calendar allows you to pick a date and see how much time you spent watching YouTube on that specific day.
- You can click on any date to view the recorded watch time for that day.

---

## Permissions

- **storage**: To store watch time data locally.
- **tabs**: To track if a YouTube video is playing in the active tab.
- **webNavigation**: To monitor the page load for YouTube videos.
- **scripting**: To inject and manipulate JavaScript content inside the YouTube page.

---

## Files Structure

```
youtube-tracker/
├── popup.html         # The popup UI for the extension.
├── popup.js           # Script for managing the calendar and watch time tracking.
├── popup.css          # Styles for the popup UI.
├── pikaday.css        # Pikaday CSS for calendar styling.
├── pikaday.js         # Pikaday date picker library.
├── background.js      # Script for monitoring YouTube video playback.
├── content.js         # Script injected into YouTube pages to track video playback.
├── manifest.json      # Chrome extension configuration file.
└── README.md          # This file.
```

---

## How to Use

1. **Install the Extension** using the instructions above.
2. **Navigate to YouTube**: The extension will start tracking time automatically when you play a video.
3. **Open the Extension Popup** by clicking the extension icon.
4. **View the Calendar**: Select a date on the calendar to view how much time you spent watching videos on that day.
5. **Check the Today’s Time**: The extension shows the total watch time for today when you open the popup.

---

## Development

### Setup for Development

If you'd like to make changes to the extension, follow these steps:

1. Clone or download the repository.
2. Open the extension folder in your favorite code editor.
3. Make changes to `popup.js`, `popup.html`, `content.js`, or any other files.
4. Reload the extension on `chrome://extensions/` after making changes to see them reflected.

---
