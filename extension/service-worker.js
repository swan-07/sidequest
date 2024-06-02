const WINDOW_HEIGHT = 340;
const WINDOW_WIDTH = 220;

async function showQuest() {
  const displayInfo = (await chrome.system.display.getInfo())[0];

  const top = Math.round((displayInfo.bounds.height / 2) - (WINDOW_HEIGHT / 2));
  const left = Math.round((displayInfo.bounds.width / 2) - (WINDOW_WIDTH / 2));
'
'
  chrome.windows.create({
    type: "popup",
    focused: true,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    top: top,
    left: left,
    url: chrome.runtime.getURL("quest/quest.html")
  })
}


/*
await chrome.alarms.create("quest-alarm", {
  delayInMinutes: 0,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener((alarm) => {
  showQuest();
});
*/