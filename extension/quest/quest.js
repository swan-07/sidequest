let ourId = null;

chrome.runtime.onMessage.addListener(function(message, sender) {
  if (message.type == "id") {
    ourId = message.id;
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSkipsLeft() {
  const result = await chrome.storage.local.get(["skipsLeft"]);
  return result?.skipsLeft || 0;
}

async function setSkipsLeft(skipsLeft) {
  await chrome.storage.local.set({ skipsLeft });
}


async function questRoll() {
  const response = await fetch(chrome.runtime.getURL("quests.json"));
  const quests = await response.json();

  const randomState = await getRandomState();

  if (randomState) {
    await performRandomRoll(quests);
  } else {
    showQuestDropdown(quests);
  }
}

async function performRandomRoll(quests) {
  const iterations = 10;
  const questEl = document.querySelector(".quest");
  let randomQuest;

  for (let i = 0; i < iterations; i++) {
    let t = (i + 1) / iterations;

    randomQuest = quests[Math.floor(Math.random() * quests.length)];
    showStars(randomQuest);

    questEl.setAttribute("pop", "a");
    questEl.textContent = randomQuest.name;

    await sleep(500 * ((t * 0.9) + 0.1));
    questEl.setAttribute("pop", "b");
    await sleep(1);
  }

  questEl.setAttribute("shine", "");
  const targetURL = chrome.runtime.getURL(`/games/${randomQuest.id}/index.html`);
  chrome.runtime.sendMessage({
    type: "location-indication",
    file: targetURL
  });

  await sleep(2000);

  showConfirmation(randomQuest, targetURL);
}


function showStars(randomQuest) {
  const starElements = [...new Array(5)].map((_, index) => document.querySelector(`#star${index + 1}`));

  for (let i = 0; i < starElements.length; i++) {
    let el = starElements[i];
    if (randomQuest.difficulty > i) {
      el.src = "star.png";
    } else {
      el.src = "nostar.png";
    }
  }
}

async function showConfirmation(randomQuest, targetURL) {
  const skipsLeft = await getSkipsLeft();
  const confirmationDiv = document.getElementById("confirmation");
  const skipsLeftSpan = document.getElementById("skips-left");
  skipsLeftSpan.textContent = skipsLeft;

  confirmationDiv.style.display = "block";

  document.getElementById("yes-button").addEventListener("click", async () => {
    if (skipsLeft > 0) {
      await setSkipsLeft(skipsLeft - 1);
      confirmationDiv.style.display = "none";
      await chrome.runtime.sendMessage({ type: "done" });
      window.close();
    } else {
      alert("No skips left!");
      confirmationDiv.style.display = "none";
      document.location = targetURL;
    }
  });

  document.getElementById("no-button").addEventListener("click", () => {
    confirmationDiv.style.display = "none";
    document.location = targetURL;
  });
}

async function getPoints() {
  const result = await chrome.storage.local.get(["points"]);
  return result?.points || 0;
}

async function setPoints(points) {
  await chrome.storage.local.set({ points });
}

async function awardPoints(awardedPoints = 1) {
  await setPoints((await getPoints()) + awardedPoints);
}

async function getQuestCount() {
  const result = await chrome.storage.local.get(["questCount"]);
  return result?.questCount || 0;
}

async function registerQuest() {
  const result = await chrome.storage.local.get(["questCount"]);
  await chrome.storage.local.set({
    questCount: (result?.questCount || 0) + 1
  });
}

async function getInterval() {
  const result = await chrome.storage.local.get(["interval"]);
  return result?.interval || 5;
}

async function setInterval(interval) {
  await chrome.storage.local.set({ interval });
}

document.addEventListener('DOMContentLoaded', async () => {
  await registerQuest();
  await questRoll();
});

async function getRandomState() {
  const result = await chrome.storage.local.get(["random"]);
  return result?.random || true;
}

function showQuestDropdown(quests) {
  const dropdownContainer = document.getElementById("quest-dropdown-container");
  const questDropdown = document.getElementById("quest-dropdown");

  // Clear existing options
  questDropdown.innerHTML = "";

  // Populate dropdown with quests
  quests.forEach(quest => {
    const option = document.createElement("option");
    option.value = quest.id;
    option.text = quest.name;
    questDropdown.appendChild(option);
  });

  dropdownContainer.style.display = "block";

  document.getElementById("select-quest-button").addEventListener("click", () => {
    const selectedQuestId = questDropdown.value;
    const selectedQuest = quests.find(quest => quest.id === selectedQuestId);
    const targetURL = chrome.runtime.getURL(`/games/${selectedQuest.id}/index.html`);

    showStars(selectedQuest);
    showConfirmation(selectedQuest, targetURL);
  });
}
