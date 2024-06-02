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

const slotSymbols = [QUESTS];

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
  const slots = document.querySelectorAll('.slot');
  let completedSlots = 0;

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight || 50; // Default height if symbols are empty
    const symbolCount = slotSymbols[index].length;

    symbols.innerHTML = '';

    symbols.appendChild(createSymbolElement('???'));

    for (let i = 0; i < 3; i++) {
      slotSymbols[index].forEach(quest => {
        symbols.appendChild(createSymbolElement(quest.name));
      });
    }

    const randomOffset = -Math.floor(Math.random() * symbolCount) * symbolHeight;
    symbols.style.transition = 'top 0.5s ease-in-out';
    symbols.style.top = `${randomOffset}px`;

    symbols.addEventListener('transitionend', () => {
      completedSlots++;
      if (completedSlots === slots.length) {
        logDisplayedSymbols();
      }
    }, { once: true });
  });

  spun = true;
}

function reset() {
  const slots = document.querySelectorAll('.slot');

  slots.forEach(slot => {
    const symbols = slot.querySelector('.symbols');
    symbols.style.transition = 'none';
    symbols.style.top = '0';
    symbols.offsetHeight;  // Trigger reflow
    symbols.style.transition = 'top 0.5s ease-in-out';
  });
}

function logDisplayedSymbols() {
  const slots = document.querySelectorAll('.slot');
  const displayedSymbols = [];

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols');
    const symbolHeight = symbols.querySelector('.symbol').clientHeight; // Ensure height is fetched correctly
    const symbolIndex = Math.floor(Math.abs(parseInt(symbols.style.top, 10)) / symbolHeight) % slotSymbols[index].length;
    const displayedSymbol = slotSymbols[index][symbolIndex].name;
    displayedSymbols.push(displayedSymbol);
  });

  console.log(displayedSymbols);
}

document.addEventListener("DOMContentLoaded", () => {
  spin();
});
