const QUESTS = [
  {
    "name": "Touch some grass",
    "file": "/games/touch-grass/index.html"
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
  },
  {
    "name": "Chess",
    "file": "/games/chess/index.html"
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
  // questRoll();
  spin()
});



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
  const slot = document.querySelectorAll('.slot');
  const symbols = slot.querySelector('.symbols');
  const symbolHeight = symbols.querySelector('.symbol')?.clientHeight || 50; // Default height if symbols are empty
  const symbolCount = QUESTS.length;

  symbols.innerHTML = '';

  symbols.appendChild(createSymbolElement('???'));

  for (let i = 0; i < 3; i++) {
    QUESTS.forEach(quest => {
      symbols.appendChild(createSymbolElement(quest.name));
    });
  }

  const totalDistance = symbolCount * symbolHeight * 3;
  const randomOffset = -Math.floor(Math.random() * symbolCount) * symbolHeight;
  symbols.style.transition = 'top 0.5s ease-in-out';
  symbols.style.top = `${randomOffset}px`;

  symbols.addEventListener('transitionend', () => {
    logDisplayedSymbols();
  }, { once: true });

  spun = true;
}

function reset() {
  const slot = document.querySelectorAll('.slot');
  const symbols = slot.querySelector('.symbols');
  symbols.style.transition = 'none';
  symbols.style.top = '0';
  symbols.offsetHeight;  // Trigger reflow
  symbols.style.transition = 'top 0.5s ease-in-out';
}

function logDisplayedSymbols() {
  const slot = document.querySelector('.slot');
  const symbols = slot.querySelector('.symbols');
  const symbolIndex = Math.floor(Math.abs(parseInt(symbols.style.top, 10)) / slot.clientHeight) % QUESTS.length;
  const displayedSymbol = QUESTS[symbolIndex].name; // Access the name part of the quest

  console.log("Displayed symbol:", displayedSymbol);
}

spin();