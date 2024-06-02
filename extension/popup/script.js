document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buy-skip-button").addEventListener("click", buySkip);

  const statPointsEl = document.querySelector(".stat-points");
  const statQuestsEl = document.querySelector(".stat-quests");
  const intervalEl = document.querySelector(".interval-input")
  const rollButton = document.getElementById("roll-button");
  const gachaResultEl = document.getElementById("gacha-result");
  const collectionEl = document.getElementById("collection");
  const images = ["img1.jpg", 
  "img2.jpg", 
  "img3.jpg",
"img4.jpg",
"img5.jpg",
"img6.jpg",
"img7.jpg",
"img8.jpg",
"img9.jpg"
];

  getPoints().then(points => {
    updatePointsDisplay(points);
  });

  getQuestCount().then(questCount => {
    statQuestsEl.textContent = "You've been interrupted " + Intl.NumberFormat().format(questCount) + (questCount == 1 ? " time" : " times") + " ⏰"
  })

  getInterval().then(interval => intervalEl.value = interval);
  intervalEl.addEventListener("change", () => {
    setInterval(intervalEl.value);
  })

  loadCollection().then(collection => {
    updateCollectionDisplay(collection);
  });

  rollButton.addEventListener("click", async () => {
    const points = await getPoints();
    if (points >= 5) {
      await setPoints(points - 5);
      updatePointsDisplay(points - 5);
      rollGacha(images, gachaResultEl, collectionEl);
    } else {
      alert("Not enough points!");
    }
  });
});

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

async function loadCollection() {
  const result = await chrome.storage.local.get(["collection"]);
  return result?.collection || [];
}


async function addToCollection(imageData) {
  const collection = await loadCollection();
  if (!collection.includes(imageData)) {
    collection.push(imageData);
    await chrome.storage.local.set({ collection });
  }
  return collection;
}


function updatePointsDisplay(points) {
  const statPointsEl = document.querySelector(".stat-points");
  statPointsEl.textContent = "You have " + Intl.NumberFormat().format(points) + (points == 1 ? " point" : " points") + " ⭐️";
}

function updateCollectionDisplay(collection) {
  const collectionEl = document.getElementById("collection");
  collectionEl.innerHTML = '';
  collection.forEach(image => {
    const imgEl = document.createElement("img");
    imgEl.src = image;
    imgEl.classList.add("collection-image");
    collectionEl.appendChild(imgEl);
  });
}

function rollGacha(images, gachaResultEl, collectionEl) {
  const rollDuration = 2000; // Duration of the rolling animation in ms
  const flashInterval = 100; // Interval between image flashes in ms
  let currentImageIndex = 0;

  const flashImages = setInterval(() => {
    gachaResultEl.innerHTML = `<img src="${images[currentImageIndex]}" alt="Rolling...">`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }, flashInterval);

  setTimeout(async () => {
    clearInterval(flashImages);
    const resultImage = images[Math.floor(Math.random() * images.length)];
    gachaResultEl.innerHTML = `<img src="${resultImage}" alt="You won!">`;
    const updatedCollection = await addToCollection(resultImage);
    updateCollectionDisplay(updatedCollection);
  }, rollDuration);
}
