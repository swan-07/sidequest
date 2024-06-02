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
     "name": "captcha",
     "file": "/games/captcha/index.html",
     "difficulty": 2
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
   },
  {
    "name": "small sidequest",
    "file": "/games/text/index.html",
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
   alert("Our ID is " + ourId);
  
  chrome.windows.update(ourId, {
    width: windowWidth,
    height: windowHeight,
    top: top,
    left: left
  })

  document.location = randomQuest.file;
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



document.addEventListener('DOMContentLoaded', () => {
  const pointsDisplay = document.getElementById('pointsDisplay');
  questRoll();
  getPoints();
  updatePoints()
});

function getPoints() {
  chrome.storage.local.get(['points'], (result) => {
      const points = result.points || 0;
      pointsDisplay.textContent = 'Points: ' + points;

  });
}

function savePoints(points) {
  chrome.storage.local.set({ points }, () => {
  });
}

function updatePoints() {
chrome.storage.local.get(['points'], (result) => {
    let points = result.points || 0;
    points += 1; 
    savePoints(points); 
});
}


