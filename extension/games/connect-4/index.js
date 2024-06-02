// https://stackoverflow.com/a/33182573
function chkLine(a,b,c,d) {
  // Check first cell non-zero and all cells match
  return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function chkWinner(bd) {
  // Check down
  for (r = 0; r < 3; r++)
      for (c = 0; c < 7; c++)
          if (chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
              return bd[r][c];

  // Check right
  for (r = 0; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
              return bd[r][c];

  // Check down-right
  for (r = 0; r < 3; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
              return bd[r][c];

  // Check down-left
  for (r = 3; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
              return bd[r][c];

  return 0;
}

const COLS = 7;
const ROWS = 6;

let board = []
let boardToEl = [];
let turn = 1;

function init() {
  const boardEl = document.querySelector(".board");
  boardEl.innerHTML = "";

  board = [];
  boardToEl = [];
  turn = 1;

  for (let y = 0; y < ROWS; y++) {
    board.push(Array(COLS).fill(0))
    boardToEl.push(Array(COLS).fill(null))
  }

  for (let x = 0; x < COLS; x++) {
    let columnEl = document.createElement("div");
    columnEl.classList.add("column");
    columnEl.addEventListener("click", function() {
      clickColumn(x);
    })

    for (let y = 0; y < ROWS; y++) {
      let el = document.createElement("div");
      el.setAttribute("x", x);
      el.setAttribute("y", y);
      el.classList.add("cell");
      columnEl.appendChild(el);
      boardToEl[y][x] = el;
    }

    boardEl.appendChild(columnEl);
  }

  console.log(boardToEl);
  update();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  // mdn
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function lowestPossibleSpace(x) {
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y][x] == 0) {
      return y;
    }
  }
  return -1;
}

function drop(x, type) {
  let y = lowestPossibleSpace(x);
  if (y == -1) return false;

  board[y][x] = type;
  update();
  return true;
}

const USE_RANDOM_ALG = true;
async function take2Turn() {
  await sleep(3000);
  
  if (USE_RANDOM_ALG) {
    // literally just pick a random row
    while (true) {
      let x = getRandomInt(0, COLS);
      if (drop(x, 2)) {
        turn = 1;
        update();
        return;
      };
    }
  } else {
    
  }
}

function clickColumn(x) {
  if (turn != 1) return;

  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y][x] == 0) {
      if (drop(x, 1)) {
        turn = 2;
        take2Turn();
        update();
        return;
      }
    }
  }

  console.log("invalid movee");
}

function update() {
  const boardEl = document.querySelector(".board");
  boardEl.setAttribute("turn", turn);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const value = board[y][x]; // 0, 1, 2
      const el = boardToEl[y][x];

      el.setAttribute("value", value);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  init();
})