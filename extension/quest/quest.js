// https://codepen.io/jcjms/pen/JjmajpW

const QUESTS = [
  {
    "name": "Touch some grass",
    "file": "/games/touch-grass/index.html",
    "difficulty": 5
  },

  {
    "name": "Be kind to yourself",
    "file": "/games/kindness/index.html",
    "difficulty": 3
  },
  
  {
    "name": "Amazing quest 1",
    "file": "quest-1.html",
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
    "name": "Chess",
    "file": "/games/chess/index.html",
    "difficulty": 2
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

    randomQuest = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

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

function createSymbolElement(symbol) {
  const div = document.createElement('div');
  div.classList.add('symbol');
  div.textContent = symbol;
  return div;
}

let spun = false;

function spin() {
  if (spun) {
    reset();
  }
  
  const slot = document.querySelector('.slot');
  const symbols = slot.querySelector('.symbols');
  symbols.appendChild(createSymbolElement('???'));

  const symbolHeight = symbols.querySelector('.symbol').clientHeight;
  const symbolCount = QUESTS.length;
  symbols.innerHTML = '';


  QUESTS.forEach(quest => {
    symbols.appendChild(createSymbolElement(quest.name));
  });
  
  const randomIndex = Math.floor(Math.random() * (symbolCount - 1) + 1);
  const randomOffset = -randomIndex * symbolHeight;
  
  symbols.style.top = `${randomOffset}px`;
  const symbolIndex = Math.floor(Math.abs(randomOffset) / slot.clientHight) % QUESTS.length;
  const displayedSymbol = QUESTS[symbolIndex].name;

  alert("Displayed symbol:", displayedSymbol);

    
  symbols.style.transition = 'top 0.5s';
  console.log("hi");

  spun = true;
}

function checkTransform(symbols, index, callback) {
  transform = Number(window.getComputedStyle(symbols).getPropertyValue("transform").replace("matrix(", "").replace(")", "").split(',')[5]);
  console.log(transform);
  if (!isNaN(transform) && (transform <= -1 * index * symbols.children[0].clientHeight + 5 && transform >= -1 * index * symbols.children[0].clientHeight - 5)){
    symbols.removeEventListener('animationend', callback);
    symbols.style.animationPlayState = 'paused';
  }

  else {
    setTimeout(() => checkTransform(symbols, index, callback), 100);
  }
}

async function spin2() {
  reset();

  const slot = document.querySelector('.slot');
  const symbols = slot.querySelector('.symbols');
  var duration = 0.1;
  var change = 0.005;
  var changeChange = 1;
  var notSelected = true;
  symbols.style.animation = `spin ${duration}s linear`;

  symbols.addEventListener('animationend', async function x() {
    if (duration > 2 && notSelected) {

      /*symbols.style.animation = 'none';
      symbols.offsetHeight;  // Trigger reflow
      symbols.style.transition = '2s ease-in-out';*/
      let index = Math.floor(Math.random() * QUESTS.length);
      notSelected = false;
      /*symbols.style.transform = `translateY(${-1 * index * symbols.children[0].clientHeight}px)`;
      console.log(symbols.style.transform);*/
      
      // await sleep(2000);
      // document.location = QUESTS[index].fil;
      checkTransform(this, index, x)
    }
    duration += change;
    change += 0.1 * Math.pow(5, changeChange);
    changeChange += 0.1;
    symbols.style.transform = 'none';
    symbols.style.animation = "none";
    symbols.offsetHeight;  // Trigger reflow
    symbols.style.animation = `spin ${duration}s linear`;
    console.log(duration);
  });
}

function reset() {
    const symbols = document.querySelector('.symbols');
    symbols.children = [];
    console.log("asdofjsa");
    
    QUESTS.forEach(quest => {
      symbols.appendChild(createSymbolElement(quest.name));
      console.log("hi");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  spin2();
  console.log("hi");

  document.querySelector('.spin').addEventListener('click', spin2);
  document.querySelector('.reset').addEventListener('click', reset);
});
