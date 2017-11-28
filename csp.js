function Square( variable, ind, row, col, neighbors, constraints) {
  //Define each square
  this.variable = variable;
  this.ind = ind;
  this.constraints = constraints || [];
  this.col = col;
  this.row = row;
  this.flicts = 0;
  this.domain = [0,1];
  this.neighbors = neighbors;
}

let MAX = 3;
let arr = [];
let c = 0;
let width = MAX;
let wm = MAX-1;
let wa = MAX+1;

for(let i = 0; i < MAX; i++){
  for(let x = 0; x < MAX; x++){
    arr.push(new Square(0, c, i, x, null, null));
    c++
  }
}

for(let i = 0; i < MAX; i++){ //for each col
  let col = i;
  let comps = arr.filter(sqx => sqx.col === col ); //get current col to iterate
  for(let x = 0; x < arr.length; x++){ //for each sq
    let sq = arr[x]; //get Square
    // console.log(comps);
    var cons = [];
    for(let y = 0; y < comps.length; y++){ //for each sq in col
      cons = comps.filter(sqy => ((sqy.row === sq.row || sqy.col === sq.col) || ((sqy.ind === sq.ind+(wm*y) || sqy.ind === sq.ind +(wa*y)) || (sqy.ind === sq.ind - (wa*y) || sqy.ind === sq.ind -(wm*y))) ) )
      if(cons.length > 0) cons.forEach(s=>{if(sq.constraints.indexOf(s) < 0 && sq.ind !== s.ind) sq.constraints.push(s)})
    }
    sq.constraints.sort();
  }
}
for (var ix = 0; ix < 10; ix++) {

for(x =0; x < MAX; x++){
  let col = x;
  let comps = arr.filter(sqx => sqx.col === col ); //get current col to iterate
  // comps[x].variable = 1;
  //get sq with least conf
  comps.forEach(s => {s.flicts = updateCon(s);}) //update squares conflicts

  let n = comps[Math.floor(Math.random() * comps.length)]; //random square without variable set
  var old = comps.find(s => s.variable === 1); //last sq with variable
  if(old) old.variable = 0;
  n.variable = 1;
  comps.forEach(s => {s.flicts = updateCon(s);}) //update squares conflicts

  var smallest = comps[0];
  for(var i=1; i<comps.length; i++){
    if(comps[i].flicts < smallest.flicts){
        smallest = comps[i];
    }
  }

  console.log(old , 'asd', smallest.ind);
  if( old !== smallest) {
    if(old) old.variable = 0;
    comps[comps.indexOf(smallest)].variable = 1;
  }
  // less.variable = 1;
}
}

arr.forEach(s => {s.flicts = updateCon(s); console.log(s.ind, s.flicts)})


function updateCon(square){
  // cons = comps.filter(sqy => ((sqy.row === sq.row || sqy.col === sq.col) || ((sqy.ind === sq.ind+(wm*y) || sqy.ind === sq.ind +(wa*y)) || (sqy.ind === sq.ind - (wa*y) || sqy.ind === sq.ind -(wm*y))) ) )
  return square.constraints.filter( con => {
    return con.variable === 1;
  }).length;
}

console.dir(arr);
