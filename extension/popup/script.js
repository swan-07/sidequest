document.addEventListener("DOMContentLoaded", () => {
  const statPointsEl = document.querySelector(".stat-points");
  const statQuestsEl = document.querySelector(".stat-quests");
  const intervalEl = document.querySelector(".interval-input")
  const rollButton = document.getElementById("roll-button");
  const gachaResultEl = document.getElementById("gacha-result");
  const collectionEl = document.getElementById("collection");
  const images = ["https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000001_017.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2e3a477454eafa38f73e6ed30c52dc1fc839d12ea7729ced26000cf882100869a73eeec85bae407b73ca18296e09765caa8ea196fe5ed425abd9a69b6d329e1adfe4445450f4660c5ba43b9d23119e32189fe3e0fbc05092686166c7edcf1c8f42ab69829b6ae10a5847cee437e39d78ba41329aeb6785bfbaca457404d2f5f3b9189d5526b6778dd4ef66d075d3c546b893b0d2d43a1473f86d26d0aa57df3822710d0e0d9b845eda6040d402898966fe5371f5c6bf36c3059d2eb6a3a4ea77a28864c8ce5cfd25915a8241d396affecb46e24cfa76d10d28690409f2853232e792d6f537d722e0d4e6a745a980559fe78f4a46ed622674523735dc93f812d9", 
  "https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000001_017.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2e3a477454eafa38f73e6ed30c52dc1fc839d12ea7729ced26000cf882100869a73eeec85bae407b73ca18296e09765caa8ea196fe5ed425abd9a69b6d329e1adfe4445450f4660c5ba43b9d23119e32189fe3e0fbc05092686166c7edcf1c8f42ab69829b6ae10a5847cee437e39d78ba41329aeb6785bfbaca457404d2f5f3b9189d5526b6778dd4ef66d075d3c546b893b0d2d43a1473f86d26d0aa57df3822710d0e0d9b845eda6040d402898966fe5371f5c6bf36c3059d2eb6a3a4ea77a28864c8ce5cfd25915a8241d396affecb46e24cfa76d10d28690409f2853232e792d6f537d722e0d4e6a745a980559fe78f4a46ed622674523735dc93f812d9", 
  "https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000001_020.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=9c771be32fe77b5b0587e149b7c357f419963bd2e62f446bfb5aeff012c000f941fdf368d586df8ec3cbe5eef7ac396a2db5d2c378dac7be99eb787e4b44bd6662fae45cea345b7bac5a3a82c21e8c48e03b9546841deb1218c5dc7f1658317ee8e8177608d1599de51b511461c99bc4d77a3e5b27fde0dfe3d4ccac104d17c23dcfad9340466b763d0fd971c87a7e090bf77b50fa515d3478803d43218a1d70120b9e6eef17b23ba5093afbdc186a99e45fc13b2486eded06137d49cc99b00b47e701e89d47ed830560d1a021a03e5387c59f6ccffbc91fae3be48fbb8ee333a86da3c2e07bfced8126668e7b48d5c8873e88720129eb0d4e5ab893f8cd3297",
"https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000001_027.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=956b192a8c6eeabf4b5ff1ee1e79d52c0b5fffbe2384c9a10ec0a5e49d16f0939f5764118cf8c7146e032f849c14c85879bd1cd23e058fb4d3b4c5bd33dba608baea875b6e934f980e351ddda7fdf81cd7246c2075aba24ad30953e407fc3216d9e00b779223995badedb4aa11320058717dcd52cbfcdd08aacfae63125b49d902ebab75e92e2a29f6f8f62d3bc855327d8d2ed1c85d3fb720a6450936c1c11c97a30a34b4b749210c3f5d61690903e6039025d149c2cc76548395b8fea9fa2aa3e4965f7129c25c64aa6ec448909867ab6b500c1e26fcc4c441f8abb0ee8450663571cc3b1d13ec8ab95bd3dcf827147e428d1444f71ef1ff16e1c2de8baa75",
"https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000001_029.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=80b8f8c93ea77fba6ec9513fee121e8d61b279fe54166882da53ac8305a082b6f530225f4ade20ca0f35b5a4563021ae7b7496463ad7ae5e307d7aae9370c6655cda30eb3026b3f80e4bbd47882ac35ddcf124c317a11e74e420dba97816a57d946616c25507670248176b6c732e90eda0fe60f348dd03e351859cc9224cbb4adc4e1b0c61d3ebcfc7e0f444fd6913795b8662b3ead73d8e72f41aeabe99943a42d0b6277cb8a72f699cda54c8715165d3db2d532cd2a04310e667dfd925ed05c12d670ecbb01e8baf9ef98fb61f06d7cadd29cff80f9c8b0cb4af1acec68cfc30c4ab464d109cf4fc66a4b3da585af7fe84adf98c85d261da68391839b7d14d",
"https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000002_001.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=ae2171f3c45dc165a1988473ac88df082d62f5cb8d19522fd47543a4f61abeba1db09ad2f758c996e559f7b9e11c21e2ec399e32c6598dcd248f90940f755887ddcc175734eab9d242ae052195bf790954646f766c754df4dcaed0b6a8f6fe8d032a2bdd0c654a5960eb5222bedcd2b51dd9b948a4ae6cc1413f07b13b7ef1b5cf996e7165b4650e4c0d34430099569dcc2b0757ebd3e79583694accdec5b13b9b034de8f9009f473d126511750afa916ca35371c76a728e2bb544a094dd7822d7351ab959e684fc95cf73a23bf138c7e79e19fc29967e504e556738e354e267e81e6f363657a1c81a43e2fd3653d24d05cfedf839031900bb4393a26b9d58b2",
"https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000002_003.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=2e5fcd7e9bb8b30060bd01d39c7d991c87900e71c284beacf10794bee1a3a6c6b966bed493110533dca76e1b005c98f97910a1dbe4c07e99b7b7d32312c0dd32d82708b1b19881262a69a111287db16cbd77eaa50ee33f4ffd996fc0bb30357dda3e4e94a03114247206e134e0ae3be8211b0e75a78bc68873b4f3e02b050a6f26d90edacea703669dd3d6b2b1148eda839d014e56708e6ce40cb4dc227e6da74c36e18df0d509250d2d33a5602adc14221748d05292c9a45c2d8c100a01794048ed2b998957d22a1b3ef30f70d9df7749cb0f87d985db755010f691613da5865fc30011f798060bbdedfd7d1322b9dd2025443fd1fd76112e9d69e4356fccb1",
"https://storage.googleapis.com/kagglesdsdata/datasets/13371/18106/CAT_00/00000002_026.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20240602%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240602T063946Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=6f20123e2a60e28500d5beaa94a6a0e3dc4791bf53d35c60c96438641c2c051ea91687269b3eef2857f88829363b1991ee53b2c6f886643ac1d1ec46290c82060ae0e452a3969314bd9dccf43ee63d8998c93d22242b0b03a1ad7d482a85c53c294b78039328eeb58172b9522a2e91a8af6307bb3431eedf4081860e9b7e1df7cecd1351dbac02efec0b15f75c4bc62bd244baa18c08af59dd166589a136fd5cc47ea8b5fc7d9435c5d77f4358873c9d725c190d4ac16aa3f105044475bc7f12489dc9589675c47a613882d4879b48e533a324a429993e67c439f6de61eeea238eb86d9d658118d57b34bd0b9a2f7af9377c66d2cf66c529ba421b0fd74dca30"
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
