let banks = [4,10,4,1,8,4,9,14,5,1,14,15,0,15,3,5];
let match = false;
let bankOrderings = new Array();
let steps = 0;

bankOrderings.push(banks.toString());

while (!match) {
  let max = Math.max(...banks);
  let index = banks.indexOf(max);
  banks[index] = 0;
  index++;
  while (max > 0) {
    banks[index%16]++;
    index++;
    max--;
  }
  steps++;

  if(bankOrderings.includes(banks.toString())) match = true;
  else bankOrderings.push(banks.toString());
}

let banksMatch = banks.toString();

let matchIndex = bankOrderings.indexOf(banksMatch);

console.log(`Part 1 Answer: ${steps}`);
console.log(`Part 2 Answer: ${steps-matchIndex}`);
