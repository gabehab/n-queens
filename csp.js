function Square(variable, ind, row, col, neighbors, constraints) {
  //Define each square
  this.variable = variable;
  this.ind = ind;
  this.constraints = constraints || [];
  this.col = col;
  this.row = row;
  this.flicts = 0;
  this.domain = [0, 1];
  this.neighbors = neighbors;
}

let MAX = 5;
let arr = [];
let c = 0;
let width = MAX;
let wm = MAX - 1;
let wa = MAX + 1;

for (let i = 0; i < MAX; i++) {
  for (let x = 0; x < MAX; x++) {
    arr.push(new Square(0, c, i, x, null, null));
    c++
  }
}

    arr.forEach(o => {
      var init = o;
      arr.forEach(s => {
       if(o.col-s.col === o.row - s.row) {
         o.constraints.push(s);
       }
      })
    });
    // arr.forEach(sq =>  {if(sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1)} )
    arr.forEach(o => {
      var init = o;
    	var ma = (Math.max(o.row, o.col) +1);
    	for( i = (o.row - ma), j = (o.col + ma) ; (i <= MAX && j >= 0); i++, j--){
    		var x = arr.find(q => (q.col === j && q.row === i));
    		if(x) o.constraints.push(x);
      }
    });
    arr.forEach(sq =>  {if(sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1)} )

    arr.forEach(o => {
      var init = o;
      // var mi = (Math.min(o.row, o.col) -1);
      arr.forEach(s => {
        if( o.col === s.col || o.row === s.row)  o.constraints.push(s) ;
      })
    })

    arr.forEach(sq =>  {
      sq.constraints.forEach( x => {if (x.constraints.indexOf(x) >= 0) x.constraints.splice(x.constraints.indexOf(x), 1);} );
      // if(sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1);
    });


let conx = true;
let itt = 0;
var ts ;
//int
for (var ix = 0; ix < MAX; ix++) {
  let column = arr.filter(sqx => sqx.col === ix); //get current col to iterate
  // let sq = column[Math.floor(Math.random() * column.length)];
  let q  = findBest(column);
  q = q[0] || q;
  q.variable = 1;
}
let xo;
while(conx == true){
  let old =0; let nold = 0; let list; let badSq; let newSq; let column;

  itt++;
  if(itt === 52) conx = false;

  // list = arr.filter(sz=> (sz.variable === 1 ));
  // badSq = list[Math.floor(Math.random() * list.length)];
  // if(!badSq) { break; }
  badSq = findQueens(arr); //find all queens
  let w = findWorst(badSq); //find the highest conflict queens
  if(w.length >= 1)  {console.log("asd", badSq); badSq = w[Math.floor(Math.random() * w.length)];} else {badSq = w; }
  if(xo){
    if(badSq.col === xo.col) {
      badSq = findQueens(arr);
      let r = Math.floor(Math.random() * badSq.length);
      badSq = badSq[r];
      console.log(r);
    }
  }
  xo = badSq;
  let colind = badSq.col;
  column = arr.filter(sqx => (sqx.col === colind && sqx.ind !== badSq.ind)); //find all sq in bad queen col
  arr.forEach(s => {
    s.flicts = updateCon(s);
    old += s.flicts;
  });
  w = findBest(column);
  // newSq = findBest(column); // get sq with lowest conflicts
  if(w.length > 1)  {console.log("asd", badSq); newSq = w[Math.floor(Math.random() * w.length)];} else {newSq = w; }


  newSq.variable = 1;
  badSq.variable = 0;
  console.log(newSq.variable, badSq.variable);

  // if(newSq.ind === badSq.ind) continue;
  // let t = arr.find(s=> s.ind === newSq.ind);
  // let bs = arr.find(s=> s.ind === badSq.ind);
  // t.variable = 1; bs.variable = 0;
  arr.forEach(s => {
    s.flicts = updateCon(s);
    nold += s.flicts;
  });
  // console.log('newSq', newSq.ind, 'badSq', badSq.ind, 'cons ', newSq.flicts, ' - ', badSq.flicts);

  if(old === nold) {
    var r = Math.floor(Math.random() * 2);
    if(r === 1) {
      newSq.variable = 0;
      badSq.variable =1;
    }
  }
  else if(old < nold){
    newSq.variable = 0;
    badSq.variable =1;
    // arr.forEach(s => {
    //   s.flicts = updateCon(s);
    // });
  }
  console.log("test" , old, nold);
  arr.forEach(s => {
    s.flicts = updateCon(s);
    old += s.flicts;
  });
  // t.variable = 1;

  // less.variable = 1;

}
arr.forEach(s => {
  s.flicts = updateCon(s);
  // nold += s.flicts;
});
printBoard();
// }
function printBoard() {

  let asd = document.querySelector("#d");
  asd.innerHTML = "";
  arr.forEach(s => {
    if ( (s.ind % MAX === 0)) asd.innerHTML  += '<br>';
    if(s.variable === 1) {
      // asd.innerHTML += '<span class="x"> <span class="y">' + ' &#9813;' + ' </span> </span>';
      asd.innerHTML += '<span class="x"> <span class="y">' + s.flicts + ' </span> </span>';
    } else {
      asd.innerHTML += '<span class="x"> '+ s.flicts + ' </span>';
    }
  })
}

function findWorst(arrx) {
  var smallest = arrx[0];
  var temp = [];
  for (let i = 1; i < arrx.length; i++) {
    if (arrx[i].flicts > smallest.flicts) {
      smallest = arrx[i];
    } else if (arrx[i].flicts === smallest.flicts) {
      temp.push(arrx[i]);
    }
  }
  if(temp.length > 1){
    if(smallest.flicts <= temp[0].flicts) return temp;
  }  return smallest;
}
function findBest(arrx) {
  var smallest = arrx[0];
  var temp = [];
  for (let i = 1; i < arrx.length; i++) {
    if (arrx[i].flicts < smallest.flicts) {
      smallest = arrx[i];
    } else if (arrx[i].flicts === smallest.flicts) {
      temp.push(arrx[i]);
    }
  }
  if(temp.length > 1){
    if(smallest.flicts >= temp[0].flicts) return temp;
  }
  return smallest;
}
function updateCon(square) {
  // cons = comps.filter(sqy => ((sqy.row === sq.row || sqy.col === sq.col) || ((sqy.ind === sq.ind+(wm*y) || sqy.ind === sq.ind +(wa*y)) || (sqy.ind === sq.ind - (wa*y) || sqy.ind === sq.ind -(wm*y))) ) )
  return square.constraints.filter(con => {
    return con.variable === 1 && con.col !== square.col;
  }).length;
  // return square.constraints.filter(con => {
  //   return con.variable === 1;
  // }).length;
}

function findQueens(arr) {
  return arr.filter( s => s.variable === 1 );
}

console.dir(arr);
