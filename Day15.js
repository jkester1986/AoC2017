let converter = require('binary-machine');

let multA = 16807;
let multB = 48271;
let divisor = 2147483647;

let valA = 703;
let valB = 516;

let match = 0;
let match2 = 0;
let multipleA = false;
let multipleB = false;

//console.log((16807*1092455)%2147483647);

for (var i = 0; i < 40000000; i++) {
  valA = (valA*multA)%divisor;
  valB = (valB*multB)%divisor;
  if((valA&0xFFFF) === (valB&0xFFFF)) match++;
}

console.log("Answer 1: " + match);


let count = 0;
let foundA = false;
let foundB = false;
valA = 703;
valB = 516;
let matchA = null;
let matchB = null;

while(count < 5000000) {
  if(foundA && foundB) {
    if((valA&0xFFFF) === (valB&0xFFFF)) match2++;
    foundA = false;
    foundB = false;
    count++;
  }
  if(!foundA) {
    valA = (valA*multA)%divisor;
    if(valA%4 === 0) {
      matchA = valA;
      foundA = true;
    }
  }
  if(!foundB) {
    valB = (valB*multB)%divisor;
    if(valB%8 === 0) {
      matchB = valB;
      foundB = true;
    }
  }
}

console.log(match2);
