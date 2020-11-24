export default class Board {
  constructor(size, boardElement, doc) {
    this.size = size ? size : 6;
    this.boardElement = boardElement;
    this.doc = doc;
  }

  makeBoard() {
    for (let column = 0; column < this.size; column++) {
      const rowEle = this.doc.createElement("div");
      rowEle.classList.add("row");
      this.boardElement.appendChild(rowEle);
      for (let row = 0; row < this.size; row++) {
        const square = this.doc.createElement("div");
        square.classList.add("square");
        rowEle.appendChild(square);
      }
    }
  }
}
