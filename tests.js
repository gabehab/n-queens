while(conx == true){
// for (x = 0; x < MAX; x++) {
  // let col = x;
  // let comps = arr.filter(sqx => sqx.col === col); //get current col to iterate
  //get sq with least conf
  // ts = '';

  // ts = arr.find(s => (s.variable === 1 && s.flicts > 0));
  if(itt < MAX) {ts = arr.find(s => (s.col === itt)) } else {
    // console.log('0');
     ts = arr[Math.floor(Math.random() * arr.length)];
  };
  itt++;
  // ts = arr.find(s => (s.variable === 1 && s.flicts > 0));
  // if (itt == 0) {ts = arr[Math.floor(Math.random() * arr.length)];}
  console.log('asd', ts.col);
  if(itt > 100) conx = false;
  // console.log(ts.ind);
  // if (ts.length === 0) conx === false; break;

  let col = ts.col;
  let comps = arr.filter(sqx => sqx.col === col); //get current col to iterate

  var old = comps.find(s => s.variable === 1); //last sq with variable
  // console.log(old.ind);
  comps.forEach(s => {
    s.flicts = updateCon(s);
  }) //update squares conflicts
  // let n = comps[Math.floor(Math.random() * comps.length)];
  var smallest = comps[0];
  for (var i = 1; i < comps.length; i++) {
    if (comps[i].flicts < smallest.flicts) {
      smallest = comps[i];
    }
  }
  let n = smallest;

  // let n = comps[Math.floor(Math.random() * comps.length)]; //random square without variable set
  if (old) old.variable = 0;
  n.variable = 1;
  comps.forEach(s => {
    s.flicts = updateCon(s);
  }) //update squares conflicts

  // var smallest = n;
  // for (var i = 1; i < comps.length; i++) {
  //   if (comps[i].flicts < smallest.flicts) {
  //     smallest = comps[i];
  //   }
  // }

  // console.log(old, 'asd', smallest.ind);
  if (old) {
    if (old.flicts > smallest.flicts) {
      if (old) old.variable = 0;
      // old.variable = 0;
      n.variable = 1;
      // smallest.variable = 1;
    } else{
      n.variable = 0;
      old.variable = 1;
    }
  }
  // less.variable = 1;
}
