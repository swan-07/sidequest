const QUESTS = [
  //  {
  //    "name": "touch grass",
  //    "file": "/games/touch-grass/index.html",
  //    "difficulty": 5
  //  },
  //  {
  //    "name": "chess",
  //    "file": "/games/chess/index.html",
  //    "difficulty": 2
  //  },
  //  {
  //    "name": "captcha",
  //    "file": "/games/captcha/index.html",
  //    "difficulty": 2
  //  },
  
  //  {
  //    "name": "Connect Four",
  //    "file": "/games/connect-4/index.html",
  //    "difficulty": 3
  //  },
  
  // {
  //   "name": "small sidequest",
  //   "file": "/games/text/index.html",
  //   "difficulty": 1
  // },

  {
    "name": "tic-tac-toe",
    "file": "/games/tic-tac-toe/index.html",
    "difficulty": 1
  }
];

let ourId = null;

chrome.runtime.onMessage.addListener(function(message, sender) {
  if (message.type == "id") {
    ourId = message.id;
  }
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
    showStars(randomQuest);

    questEl.setAttribute("pop", "a");
    questEl.textContent = randomQuest.name;

    await sleep(500*((t*0.9)+0.1));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }
  
  questEl.setAttribute("shine", "");
  chrome.runtime.sendMessage({
    type: "location-indication",
    file: randomQuest.file
  })

  await sleep(2000);

  const windowHeight = 500;
  const windowWidth = 600;
  const displayInfo = (await chrome.system.display.getInfo())[0];
  const top = Math.round((displayInfo.bounds.height / 2) - (windowHeight / 2));
  const left = Math.round((displayInfo.bounds.width / 2) - (windowWidth / 2));

  console.log("We are", ourId);
  
  chrome.windows.update(ourId, {
    width: windowWidth,
    height: windowHeight,
    top: top,
    left: left
  })

  document.location = randomQuest.file;
}

function showStars(randomQuest){
  const starElements = [...new Array(5)].map((_, index) => document.querySelector(`#star${index+1}`))
  
  for (let i = 0; i < starElements.length; i++) {
    let el = starElements[i]
    if (randomQuest.difficulty > i) {
      el.src = "star.png"
    } else {
      el.src = "nostar.png"
    }
  }
}



document.addEventListener('DOMContentLoaded', () => {
  registerQuest();
  questRoll();
});



