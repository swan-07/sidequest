const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

async function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== '' || currentPlayer !== 'X') return;

    makeMove(index, 'X');

    if (checkWinner()) {
        if(currentPlayer == 'X'){
            alert('YOU WON!!! you can go back to your work now :D');
            chrome.runtime.sendMessage({ type: "done" });
        }
        else{
            alert('you lost. play again until you win.');
            resetGame();
        }
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert('It\'s a tie!');
        resetGame();
        return;
    }
    
    currentPlayer = 'O';

    await sleep(300);
    botMove();
}

function botMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, 'O');

    if (checkWinner()) {
        if(currentPlayer == 'X'){
            alert('YOU WON!!! you can go back to your work now :D');
            chrome.runtime.sendMessage({ type: "done" });
        }
        else{
            alert('you lost. play again until you win.');
            resetGame();
        }
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert('you tied. play again until you win.');
            resetGame();
        return;
    }

    currentPlayer = 'X';
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
