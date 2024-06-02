const QUESTS = [
  {
    "name": "Touch grass",
    "file": "touch-grass.html"
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function questRoll() {
  const iterations = 10;
  const questEl = document.querySelector(".quest");
  for (let i = 0; i < iterations; i++) {
    let t = (i+1)/iterations;

    let randomQuest = QUESTS[Math.floor(Math.random() * QUESTS.length)];

    questEl.setAttribute("pop", "a");
    questEl.textContent = randomQuest.name;

    await sleep(1000*(t));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  questRoll();
});