const QUESTS = [
  {
    "name": "Touch some grass",
    "file": "/games/touch-grass/index.html"
  },

  {
    "name": "Get silly",
    "file": "get-silly.html"
  },
  
  {
    "name": "Amazing quest 1",
    "file": "quest-1.html"
  },
  
  {
    "name": "Amazing quest 2",
    "file": "quest-2.html"
  },

  {
    "name": "wow",
    "file": "very wow"
  }
];


const usWindow = chrome.windows.getCurrent({
  windowTypes: ["popup"]
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function questRoll() {
  const iterations = 10;
  const questEl = document.querySelector(".quest");
  let randomQuest;

  for (let i = 0; i < iterations; i++) {
    let t = (i+1)/iterations;

    randomQuest = QUESTS[Math.floor(Math.random() * QUESTS.length)];

    questEl.setAttribute("pop", "a");
    questEl.textContent = randomQuest.name;

    await sleep(800*((t*0.9)+0.1));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }
  
  questEl.setAttribute("shine", "");
  await sleep(2000);

  const windowHeight = 340;
  const windowWidth = 220;
  const displayInfo = (await chrome.system.display.getInfo())[0];
  const top = Math.round((displayInfo.bounds.height / 2) - (windowHeight / 2));
  const left = Math.round((displayInfo.bounds.width / 2) - (windowWidth / 2));

  chrome.windows.update(usWindow.id, {
    width: windowWidth,
    height: windowHeight,
    top: top,
    left: left
  })
  document.location = randomQuest.file;
}

document.addEventListener("DOMContentLoaded", () => {
  questRoll();
});