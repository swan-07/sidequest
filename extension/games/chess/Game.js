/* global Dom, sq, board, whiteToPlay, selectedSquare */
/* eslint-disable no-unused-vars, no-global-assign */
class Game {
  static addPiece(side, piece, column) {
    const columnLetter = 'ABCDEFGH'[column - 1];
    const newPiece = new piece(columnLetter + side.pieceRow, side.colour);
    side.array.push(newPiece);
    return newPiece;
  }

  static isMyTurn(piece) {
    return piece.colour === (whiteToPlay ? 'white' : 'black');
  }

  static currentTurnColour() {
    return whiteToPlay ? 'white' : 'black';
  }

  static opponentColour() {
    return whiteToPlay ? 'black' : 'white';
  }

  static move(piece, square) {
    const moved = piece.attemptMoveTo(square);
    selectedSquare = null;
    if (moved) {
      this.finishMove();
    }
  }

 static async finishMove() {
    Dom.togglePlayer();
    const whiteCheckmate = Game.isCheckmate('white');
    const blackCheckmate = Game.isCheckmate('black');
    if (whiteCheckmate || blackCheckmate) {
      Dom.message('Checkmate ' + (whiteCheckmate ? 'black' : 'white') + ' wins.');
      chrome.runtime.sendMessage({ type: "done" });
      const dialog = document.querySelector("dialog");
      const p = dialog.querySelector("p")

      if (blackCheckmate) {
        p.textContent = "You won the game!";
        confetti({
          particleCount: 100,
          spread: 180,
          origin: { y: 0.8 },
        });
      } else {
        p.textContent = "You lost the game :(\nBetter luck next time!";
      }
  
      dialog.showModal();

      const button = dialog.querySelector("button");
      button.addEventListener("click", function() {
        window.close();
      })
    }
    else if (Game.captures && Game.captures > 2) {
      Game.captures = 0;

      chrome.runtime.sendMessage({ type: "done" });
      const dialog = document.querySelector("dialog");
      const p = dialog.querySelector("p")

      p.textContent = "Good job! You captured some pieces!";
      confetti({
        particleCount: 100,
        spread: 180,
        origin: { y: 0.8 },
      });

      const close = dialog.querySelector("#close");
      close.addEventListener("click", function() {
        window.close();
      })
      const cancel = dialog.querySelector("#continue");
      cancel.addEventListener("click", function() {
        dialog.close();
      })
      cancel.style.visibility = "visible";

      dialog.showModal();
    }

    if (!whiteToPlay) {
      var values = {"pawn": 1, "knight": 3, "bishop": 3, "rook": 5, "queen": 9, "king": 1000}
      var max = -1000;
      var bestMove = null;

      var choices = board.squaresByColour('black')
      for (var i = 0; i < choices.length; i++) {
        var choice = choices[i]
        var piece = choice.piece
        var moves = piece.availableSquares()
        for (var j = 0; j < moves.length; j++) {
          console.log('hi')
          var move = moves[j]
          var value = this.simulateMove(piece, move, () => this.score())
          console.log(value);
          if (value >= max) {
            console.log("hioahsd")
            max = value
            bestMove = [choice, move]
          }
        }
      }

      bestMove[0].domElement.click()
      bestMove[1].domElement.click()
    }
      /*var choices = board.squaresByColour('black')
      var choice = choices[Math.floor(Math.random() * choices.length)]
      var move = choice.piece.availableSquares()[Math.floor(Math.random() * choice.piece.availableSquares().length)]

      if (choice && move) {
        choice.domElement.click()
        move.domElement.click()
      }
    }*/
  }

  static score() {
    let white = 0;
    let black = 0;
    for (var i = 0; i < board.piecesByColour('white').length; i++) {
      var piece = board.piecesByColour('white')[i];
      white += piece.value;
    }
    for (var i = 0; i < board.piecesByColour('black').length; i++) {
      var piece = board.piecesByColour('black')[i]
      black += piece.value;
    }
    
    return black - white;
  }

  static isInCheck(colour) {
    const king = board
      .piecesByColour(colour)
      .find(piece => piece instanceof King);
    return !!king.square.isThreatenedBy(king.opponentColour).length;
  }

  static isCheckmate(colour) {
    if (!Game.isInCheck('white') && !Game.isInCheck('black')) {
      Dom.showHint(false);
      return false;
    }
    Dom.showHint(true);
    Dom.message('Check');
    return !Game.movesPreventingCheck(colour).length;
  }

  static movesPreventingCheck(colour) {
    return board.piecesByColour(colour)
      .map(piece => {
        return {
          piece,
          preventCheck: Game.pieceMovesPreventingCheck(piece)
        };
      })
      .filter(pieceMoves => pieceMoves.preventCheck.length);
  }

  static pieceMovesPreventingCheck(piece) {
    return piece.availableSquares()
      .filter(square => {
        return Game.simulateMove(piece, square, () => !Game.isInCheck(piece.colour));
      });
  }

  static giveHint() {
    Game.movesPreventingCheck(Game.currentTurnColour()).forEach(hint => {
      hint.piece.square.highlight(2);
      hint.preventCheck.forEach(square => square.highlight());
    });
  }

  static simulateMove(piece, square, outcomeFunction) {
    const currentSquare = piece.square;
    const pieceAtMoveSquare = square.piece;
    piece.moveTo(square);
    const outcome = outcomeFunction();
    piece.moveTo(currentSquare);
    if (pieceAtMoveSquare) {
      square.setPiece(pieceAtMoveSquare);
    }
    return outcome;
  }

  static moveByNotation(notation) {
    // Be5
    const square = sq(notation.slice(-2));
    const pieceName = notation.length === 2 ? 'p' : notation[0];
    const piece = board
      .piecesByColour(Game.currentTurnColour())
      .filter(piece => piece.name.toLowerCase() === pieceName.toLowerCase())
      .find(piece => piece.availableSquares().includes(square));
    if (piece) {
      Game.move(piece, square);
    }
  }

  static handleNotation(event) {
    event.preventDefault();
    const $input = this.querySelector('input');
    const notation = $input.value;
    Game.moveByNotation(notation);
    $input.value = '';
  }
}
