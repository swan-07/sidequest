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
  document.location = randomQuest.file;
}

document.addEventListener("DOMContentLoaded", () => {
  questRoll();
});