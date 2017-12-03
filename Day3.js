//this solution happens to work because my number is along the bottom row of the square
//definitely does not work for all solutions
let goal = 312051;
let cornerRoot = Math.ceil(Math.sqrt(goal));
let corner = Math.pow(cornerRoot, 2);
let xval = Math.ceil(cornerRoot/2);
let difference = corner - goal;

console.log(`Answer 1: ${difference}`);
