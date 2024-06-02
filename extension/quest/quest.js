// https://codepen.io/jcjms/pen/JjmajpW

const QUESTS = [
  {
    "name": "Touch some grass",
    "file": "/games/touch-grass/index.html",
    "difficulty": 5
  },

  {
    "name": "Get silly",
    "file": "get-silly.html",
    "difficulty": 1
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
  const slot = document.querySelectorAll('.slot');
  const symbols = slot.querySelector('.symbols');
  const symbolHeight = symbols.querySelector('.symbol').clientHeight;
  const symbolCount = QUESTS.length;
  symbols.innerHTML = '';

  symbols.appendChild(createSymbolElement('???'));

  QUESTS.forEach(quest => {
    symbols.appendChild(createSymbolElement(quest.name));
  });

  const randomOffset = -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;
    
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


document.addEventListener("DOMContentLoaded", () => {
  spin();
});
