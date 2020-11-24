import Board from "./Board.js";
const game = new Board(6, document.querySelector(".board"), document);
game.makeBoard();
console.log("game", game);
