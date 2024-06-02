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
  const response = await fetch(chrome.runtime.getURL("quests.json"))
  const quests = await response.json();

  const iterations = 10;
  const questEl = document.querySelector(".quest");
  let randomQuest;

  for (let i = 0; i < iterations; i++) {
    let t = (i+1)/iterations;

    randomQuest = quests[Math.floor(Math.random() * quests.length)];
    showStars(randomQuest);

    questEl.setAttribute("pop", "a");
    questEl.textContent = randomQuest.name;

    await sleep(500*((t*0.9)+0.1));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }
  
  questEl.setAttribute("shine", "");
  const targetURL = chrome.runtime.getURL(`/games/${randomQuest.id}/index.html`)
  chrome.runtime.sendMessage({
    type: "location-indication",
    file: targetURL
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

  document.location = targetURL;
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



