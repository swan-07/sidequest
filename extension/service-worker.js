const WINDOW_HEIGHT = 340;
const WINDOW_WIDTH = 220;
let activeWindowId = undefined;

async function showQuest() {
  const displayInfo = (await chrome.system.display.getInfo())[0];

  const top = Math.round((displayInfo.bounds.height / 2) - (WINDOW_HEIGHT / 2));
  const left = Math.round((displayInfo.bounds.width / 2) - (WINDOW_WIDTH / 2));

  const baseUrl = chrome.runtime.getURL("quest/quest.html");

  const window = await chrome.windows.create({
    type: "popup",
    focused: true,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    top: top,
    left: left,
    url: baseUrl
  })
  const windowId = window.id;
  activeWindowId = windowId;
}

chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (!activeWindowId) return;
  console.log("Focus changed to", windowId);

  if (activeWindowId !== windowId) {
    // refocus it!
    // chrome.windows.update(activeWindowId, {
    //   focused: true,
    // });
  }
}, {
  // windowTypes: ["popup"]
})


/*
await chrome.alarms.create("quest-alarm", {
  delayInMinutes: 0,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener((alarm) => {
  showQuest();
});
*/