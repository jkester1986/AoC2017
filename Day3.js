let corner = 0;
let count = 1;
let goal = 312051;
while(corner <= goal) {
	corner = count*8 + corner;
	count++;
}

let difference = corner - goal;

let x = difference - count + 1;
console.log(`Answer: ${x + count}`);
