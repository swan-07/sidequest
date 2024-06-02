const QUESTS = [

  {
    "name": "Touch some grass",
    "file": "/games/touch-grass/index.html",
    "difficulty": 5
  },
  {
    "name": "chess",
    "file": "/games/chess/index.html",
    "difficulty": 2
  },
  {
    "name": "Get silly",
    "file": "get-silly.html",
    "difficulty": 1
  },
  
  {
    "name": "Connect Four",
    "file": "/games/connect-4/index.html",
    "difficulty": 3
  },
  
  {
    "name": "Amazing quest 2",
    "file": "quest-2.html",
    "difficulty": 2
  },

  {
    "name": "wow",
    "file": "very wow",
    "difficulty": 1
  }
];

let ourId = null;

chrome.runtime.onMessage.addListener(function(message) {
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

    await sleep(800*((t*0.9)+0.1));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }
  
  questEl.setAttribute("shine", "");
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
  console.log("hi");
}

function showStars(randomQuest){
  if(randomQuest.difficulty == 1){
    document.getElementById("star1").src = "star.png";
    document.getElementById("star2").src = "nostar.png";
    document.getElementById("star3").src = "nostar.png";
    document.getElementById("star4").src = "nostar.png";
    document.getElementById("star5").src = "nostar.png";
  }
  if(randomQuest.difficulty == 2){
    document.getElementById("star1").src = "star.png";
    document.getElementById("star2").src = "star.png";
    document.getElementById("star3").src = "nostar.png";
    document.getElementById("star4").src = "nostar.png";
    document.getElementById("star5").src = "nostar.png";
  }
  if(randomQuest.difficulty == 3){
    document.getElementById("star1").src = "star.png";
    document.getElementById("star2").src = "star.png";
    document.getElementById("star3").src = "star.png";
    document.getElementById("star4").src = "nostar.png";
    document.getElementById("star5").src = "nostar.png";
  }
  if(randomQuest.difficulty == 4){
    document.getElementById("star1").src = "star.png";
    document.getElementById("star2").src = "star.png";
    document.getElementById("star3").src = "star.png";
    document.getElementById("star4").src = "star.png";
    document.getElementById("star5").src = "nostar.png";
  }
  if(randomQuest.difficulty == 5){
    document.getElementById("star1").src = "star.png";
    document.getElementById("star2").src = "star.png";
    document.getElementById("star3").src = "star.png";
    document.getElementById("star4").src = "star.png";
    document.getElementById("star5").src = "star.png";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  questRoll();
});

