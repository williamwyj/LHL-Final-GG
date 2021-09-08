// for (let i=0; i < 40; i++) {
//   console.log(`(3, ${i}),`);
// }

for (let i = 0; i < 40; i++) {
  console.log(`(${i+1}, 115, ${(Math.random() > 0.5).toString().toUpperCase()}, ${(Math.random() > 0.5).toString().toUpperCase()}, ${(Math.random() > 0.5).toString().toUpperCase()}),`)
}

// const letters = 'abcdefghijklmnopqrstuvwxy   ';

// for (let i = 0; i < 25; i++) {
//   let string = '';
//   let b = Math.ceil(Math.random() * 40);
//   let c = Math.ceil(Math.random() * 10);
//   for (let j = 0; j < 300; j++) {
//     let a = Math.floor(Math.random() * 28);
//     string += letters[a];
//   }
//   console.log(`(${b}, 1067, '${string}', ${c}),`);
// }
// for (let i=0; i < 500; i++) {
//   let b = Math.ceil(Math.random() * 158);
//   let a = Math.ceil(Math.random() * 40);
//   let d = Math.floor(Math.random() * 3);
//   let likeTypes = ["like", "haha", "hmm"];
//   console.log(`(${a}, ${b}, '${likeTypes[d]}'),`);
// }