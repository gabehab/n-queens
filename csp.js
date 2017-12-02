function Square(variable, ind, row, col, neighbors, constraints) {
  //Define each square of the n-queen board
  this.variable = variable;
  this.ind = ind;
  this.constraints = constraints || [];
  this.col = col;
  this.row = row;
  this.flicts = 0;
  this.domain = [0, 1];
  this.neighbors = neighbors;
}

let MAX = 100; //set the width of the square board(the MAX value)
window.arr = []; //arr is the BOARD of squares
let c = 0; //init counter var;

for (let i = 0; i < MAX; i++) { //init the board of squares
  for (let x = 0; x < MAX; x++) {
    arr.push(new Square(0, c, i, x, null, null)); //add square to board
    c++
  }
}

arr.forEach(o => { //generate constraints for each square of the board
  var init = o;
  arr.forEach(s => { //generate all col and row constraints
    if (o.col === s.col || o.row === s.row) o.constraints.push(s); //if the same col or row, its a con
    //loop through board, and check if other sqs have same col or row in the diagonal left to right, downwards
    if (o.col - s.col === o.row - s.row) {
      o.constraints.push(s);
    }
  })

  //find the diagonals of all sqs on the board
  var ma = (Math.max(o.row, o.col) + 1);
  for (i = (o.row - ma), j = (o.col + ma);
    (i <= MAX && j >= 0); i++, j--) { //loop through both col and row indexs from the current sq
    var x = arr.find(q => (q.col === j && q.row === i)); //find all other sqs with the values of i and j as they iterate through board
    if (x) o.constraints.push(x); //push as a constraint
  }
});

arr.forEach(sq => { //remove the square if its constraints contain itself
  if (sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1)
})

arr.forEach(sq => { //remove dups in constraints
  sq.constraints.forEach(x => {
    if (x.constraints.indexOf(x) >= 0) x.constraints.splice(x.constraints.indexOf(x), 1);
  });
});


let conx = true;
let itt = 0;
// var ts;

//int MIN-CONFLICTS
for (var ix = 0; ix < MAX; ix++) {
  //set up initial board
  let column = arr.filter(sqx => sqx.col === ix); //get current col to iterate
  // let sq = column[Math.floor(Math.random() * column.length)];
  let q = findBest(column); //fidn the best init spot for queen
  // let q = column[Math.floor(Math.random() * column.length)];
  // console.log("INIT", q.ind);
  q.variable = 1;
  arr.forEach(s => { //update boards conflicts each time
    s.flicts = updateCon(s);
  });
}

while (conx) {
  let old = 0;
  let nold = 0;
  let list;
  let badSq;
  let newSq;
  let column;

  if (fin() === MAX) break; //if solved, break loop

  badSq = findQueens(arr); //find all queens
  badSq = findWorst(badSq); //find the highest conflict queens
  column = arr.filter(sqx => (sqx.col === badSq.col && sqx.ind !== badSq.ind)); //find all sq in bad queen col
  arr.forEach(s => {
    s.flicts = updateCon(s);
    old += s.flicts;
  });
  newSq = findBest(column);

  newSq.variable = 1;
  badSq.variable = 0;
  // console.log(newSq.variable, badSq.variable);

  arr.forEach(s => {
    s.flicts = updateCon(s);
    nold += s.flicts;
  });

  // console.log("test", old, nold);
  if (old < nold) {
    console.log('old less cur');
    if (badSq.flicts <= newSq.flicts) {
      newSq.variable = 0;
      badSq.variable = 1;
    }
  } else if (old === nold) {
    if (badSq.flicts < newSq.flicts) {
      newSq.variable = 0;
      badSq.variable = 1;
    } else if (badSq.flicts === newSq.flicts) {
      if (Math.floor(Math.random() * 2) === 0) {
        newSq.variable = 0;
        badSq.variable = 1;
      }
    } else if (badSq.flicts > newSq.flicts) {
      newSq.variable = 1;
      badSq.variable = 0;
    }
  }

  arr.forEach(s => {
    s.flicts = updateCon(s);
  });

  itt++;
  if (itt === 50) conx = false;

  // printBoard();
}
arr.forEach(s => {
  s.flicts = updateCon(s);
  // nold += s.flicts;
});



// arr.forEach(s => {
// for(let i = 0; i < MAX; i++){
//   // s.flicts = updateCon(s);
//
//   var column = arr.filter(q=> i === q.col);
//
//   var cur = column.filter(q=> (q.variable === 1));
//   cur = cur[0];
//   console.log(cur, cur.ind);
//   // cur = arr.find(s=> s.ind === cur.ind);
//   var best = findBest(column);
//   console.log("best", best.col, best.row, "current q", cur.ind);
//   if(best.flicts <= cur.flicts){
//     best.variable = 1;
//     cur.variable = 0;
//   }
//
// };



arr.forEach(s => {
  s.flicts = updateCon(s);
  // nold += s.flicts;
});

printBoard();
// }



function fin() {
  return arr.filter(s => s.variable === 1 && s.flicts === 0)
    .length;
}

function printBoard() {

  let asd = document.querySelector("#d");
  asd.innerHTML = "";
  arr.forEach(s => {
    if ((s.ind % MAX === 0)) asd.innerHTML += '<br>';
    if (s.variable === 1) {
      // asd.innerHTML += '<span class="x"> <span class="y">' + ' &#9813;' + ' </span> </span>';
      asd.innerHTML += '<span class="x"> <span class="y">' + s.flicts + ' </span> </span>';
    } else {
      asd.innerHTML += '<span class="x"> ' + s.flicts + ' </span>';
    }
  })
}

function findWorst(arrx) {
  var smallest = arrx[0];
  var temp = [];
  for (let i = 1; i < arrx.length; i++) {
    if (arrx[i].flicts > smallest.flicts) {
      smallest = arrx[i];
      temp = [];
    } else if (arrx[i].flicts === smallest.flicts) {
      temp.push(arrx[i]);
    }
  }
  if (temp.length >= 1) {
    if (smallest.flicts <= temp[0].flicts) {
      temp.push(smallest);
      return temp[Math.floor(Math.random() * temp.length)];
    }
  }
  return smallest;
}

function findBest(arrx) {
  var smallest = arrx[0];
  var temp = [];
  for (let i = 1; i < arrx.length; i++) {
    if (arrx[i].flicts < smallest.flicts) {
      smallest = arrx[i];
      temp = [];

    } else if (arrx[i].flicts === smallest.flicts) {
      temp.push(arrx[i]);
    }
  }
  if (temp.length >= 1) {
    if (smallest.flicts >= temp[0].flicts) {
      temp.push(smallest);
      return temp[Math.floor(Math.random() * temp.length)];
    }
  }
  return smallest;
}

function updateCon(square) {
  return square.constraints.filter(con => {
      return con.variable === 1 && con.col !== square.col;
    })
    .length;
}

function findQueens(arr) {
  return arr.filter(s => s.variable === 1);
}

console.dir(arr);
