const WINDOW_HEIGHT = 400;
const WINDOW_WIDTH = 400;
const GAME_WINDOW_HEIGHT = 500;
const GAME_WINDOW_WIDTH = 600;

let activeWindowId = undefined;
let gameInProgress = false;
let location = null;
let inProgressTimeout = null;

// BEGIN FROM POINTS.JS
async function getPoints() {
  const result = await chrome.storage.local.get(["points"]);
  return result?.points || 0;
}

async function setPoints(points) {
  await chrome.storage.local.set({ points });
}

async function awardPoints(awardedPoints = 1) {
  await setPoints((await getPoints()) + awardedPoints)
}
// END POINTS.JS

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message, sender);

  if (message.type == "location-indication") {
    location = message.file;
  } else if (message.type == "done") {
    const windowId = sender.tab.windowId;
    if (activeWindowId == windowId) {
      gameInProgress = false;
    }

    // PUT POINTS LOGIC HERE
  }
})

async function makeQuestWindow() {
  if (activeWindowId) {
    console.error("Window already exists...")
    return;
  }

  const baseUrl = chrome.runtime.getURL("quest/quest.html");
  const height = location ? GAME_WINDOW_HEIGHT : WINDOW_HEIGHT
  const width = location ? GAME_WINDOW_WIDTH : WINDOW_WIDTH

  const displayInfo = (await chrome.system.display.getInfo())[0];

  const top = Math.round((displayInfo.bounds.height / 2) - (height / 2));
  const left = Math.round((displayInfo.bounds.width / 2) - (width / 2));

  const window = await chrome.windows.create({
    type: "popup",
    focused: true,
    height: height,
    width: width,
    top: top,
    left: left,
    url: location ? location : baseUrl
  })

  const windowId = window.id;
  activeWindowId = windowId;
  gameInProgress = true;

  if (!location) {
    if (inProgressTimeout) {
      clearTimeout(inProgressTimeout);
      inProgressTimeout = null;
    };

    inProgressTimeout = setTimeout(async () => {
      const windowNow = await chrome.windows.get(windowId, {
        populate: true
      });
      console.log(windowNow);

      const tabId = windowNow.tabs[0]?.id
      if (!tabId) {
        console.warn("tab gone, probably closed :(");
        return;
      }

      await chrome.tabs.sendMessage(tabId, {
        type: "id",
        id: windowId
      })
    }, 500);
  }
}

async function showQuest() {
  location = null;
  await makeQuestWindow();
}

chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (!activeWindowId) return;
  console.log("refocusing");

  if (activeWindowId !== windowId) {
    // refocus it!
    chrome.windows.update(activeWindowId, {
      focused: true,
    });
  }
}, {
  // windowTypes: ["popup"]
})

chrome.windows.onRemoved.addListener(function(windowId) {
  // console.log("removed window", windowId, "active window is", activeWindowId);
  if (windowId == activeWindowId) {
    activeWindowId = null;

    if (gameInProgress) {
      if (inProgressTimeout) {
        clearTimeout(inProgressTimeout);
        inProgressTimeout = null;
      };
  
      console.log("closed!!");
      makeQuestWindow();
      // the window 
    }
  }
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