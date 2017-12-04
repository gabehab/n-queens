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


let clone;
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

// arr.forEach(sq => { //remove the square if its constraints contain itself
//   if (sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1)
// })

arr.forEach(sq => { //remove dups in constraints
  sq.constraints.forEach(x => {
    if (x.constraints.indexOf(x) >= 0) x.constraints.splice(x.constraints.indexOf(x), 1);
  });
});

let gdata = [];
let conx = true;
let itt = 0;
// var ts;
let initialsq = [];
//int MIN-CONFLICTS
function init() {
  for (var ix = 0; ix < MAX; ix++) {
    //set up initial board
    let column = arr.filter(sqx => sqx.col === ix); //get current col to iterate
    // let sq = column[Math.floor(Math.random() * column.length)];
    let q = findBest(column); //fidn the best init spot for queen
    // let q = column[Math.floor(Math.random() * column.length)];
    // console.log("INIT", q.ind);
    q.variable = 1;
    initialsq.push(q.ind);
    arr.forEach(s => { //update boards conflicts each time
      s.flicts = updateCon(s);
    });
  }
}
let qd = [];
let s1 = [];

function main() {
  while (conx) {
    let old = 0;
    let nold = 0;
    let list;
    let badSq;
    let newSq;
    let column;
    let q = 0;

    if (fin() === MAX) break; //if solved, break loop

    badSq = findQueens(arr); //find all queens
    badSq = findWorst(badSq); //find the highest conflict queens
    column = arr.filter(sqx => (sqx.col === badSq.col && sqx.ind !== badSq.ind)); //find all sq in bad queen col
    arr.forEach(s => { //update all squares conflicts
      s.flicts = updateCon(s);
      if (s.ind !== badSq.ind) old += parseInt(s.flicts); //don't incldue self when comparing values
    });
    //stats only (not appart of algo)
    column.forEach(s => q += s.flicts);
    qd.push(q);
    gdata.push(old);
    ///

    newSq = findBest(column);

    newSq.variable = 1;
    badSq.variable = 0;
    // console.log(newSq.variable, badSq.variable);

    arr.forEach(s => { //update with new variable for new square
      s.flicts = updateCon(s);
      if (s.ind !== newSq.ind) nold += parseInt(s.flicts);
    });

    if (newSq.flicts > badSq.flicts) { //check if new is better than old sq
      newSq.variable = 0;
      badSq.variable = 1;
      s1.push(badSq.flicts); //stats only (not appart of algo)
    } else if (newSq.flicts === badSq.flicts) { //theyre the same
      if (Math.floor(Math.random() * 2) === 0) { //50/50 coin flip to change back or not if same flicts
        s1.push(badSq.flicts);
        newSq.variable = 0;
        badSq.variable = 1;
      } else {
        s1.push(newSq.flicts); //stats only (not appart of algo)
      }
    } else {
      s1.push(newSq.flicts); //stats only (not appart of algo)
    }

    itt++; //max iterations
    if (itt === 100) conx = false;
    // printBoard();
  }

  arr.forEach(s => { //update conflicts
    s.flicts = updateCon(s);
  });

  console.log("MIN-CONFLICTS completed");
  console.log("Steps: ", itt, "algo found solutioned : ", fin() === MAX);
}

console.time("Time taken");
init();
main();
console.timeEnd("Time taken");




function fin() { //check if squares are all solved
  return arr.filter(s => s.variable === 1 && s.flicts === 0)
    .length;
}

function printBoard() { //print html board

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

function findWorst(arrx) { //finds square with highest conflict
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
    if (smallest.flicts <= temp[0].flicts) { //if multiple tied squares
      temp.push(smallest);
      return temp[Math.floor(Math.random() * temp.length)]; //return a random one
    }
  }
  return smallest;
}

function findBest(arrx) { //find square with least conflicts
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



// END OF ALGORITHM

let lb = Array(gdata.length)
  .fill()
  .map((e, i) => i + 1);

var data = {
  // A labels array that can contain any sort of values
  labels: lb,
  // Our series array that contains series objects or in this case series data arrays
  series: [
    gdata
  ]
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
var options = {
  width: 500,
  height: 500,
  showPoint: false,
  axisY: {
    onlyInteger: true,
    //  offset: 20
  },
  axisX: {
    onlyInteger: true,
  }
};
new Chartist.Line('#graph', data, options);
new Chartist.Line('#qcon', {
  // A labels array that can contain any sort of values
  labels: lb,
  // Our series array that contains series objects or in this case series data arrays
  series: [
    qd
  ]
}, options);
new Chartist.Line('#qs', {
  // A labels array that can contain any sort of values
  labels: lb,
  // Our series array that contains series objects or in this case series data arrays
  series: [
    s1
  ]
}, options);

// console.dir(arr);
// printBoard();
function download() {
  let rowArray;
  let csvContent = "data:text/csv;charset=utf-8,";
  // arr.forEach(function(rowArray){
  for (let x = 0; x < MAX; x++) {
    rowArray = arr.filter(s => s.col === x)
      .map(s => {
        if (s.variable === 1) return "Q";
        return s.flicts
      });
    //  let row = ;
    csvContent += rowArray.join(",") + "\r\n"; // add carriage return
  }


  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", MAX + "-queens.csv");
  document.body.appendChild(link); // Required for FF

  link.click();
}
