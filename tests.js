arr.forEach(o => { //generate constraints for each square of the board
  var init = o;
  arr.forEach(s => {
    if (o.col - s.col === o.row - s.row) {
      o.constraints.push(s);
    }
  })
  for (i = (o.row - ma), j = (o.col + ma);
    (i <= MAX && j >= 0); i++, j--) {
    var x = arr.find(q => (q.col === j && q.row === i));
    if (x) o.constraints.push(x);
  }
});
// arr.forEach(o => {
//   var init = o;
//   var ma = (Math.max(o.row, o.col) + 1);
//   for (i = (o.row - ma), j = (o.col + ma);
//     (i <= MAX && j >= 0); i++, j--) {
//     var x = arr.find(q => (q.col === j && q.row === i));
//     if (x) o.constraints.push(x);
//   }
});
arr.forEach(sq => {
  if (sq.constraints.indexOf(sq) >= 0) sq.constraints.splice(sq.constraints.indexOf(sq), 1)
})

arr.forEach(o => {
  var init = o;
  // var mi = (Math.min(o.row, o.col) -1);
  arr.forEach(s => {
    if (o.col === s.col || o.row === s.row) o.constraints.push(s);
  })
})
