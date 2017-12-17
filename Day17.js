let steps = 371;
let count = 1;
let buffer = [0];
let position = 0;

while(count < 2018) {

	let length = buffer.length;
	position = (steps + position)%length +1;
	if(position === length) buffer.push(count);
	else {
		let firstSection = buffer.slice(0, position);
		let secondSection = buffer.slice(position, length);
		firstSection.push(count);
		buffer = firstSection.concat(secondSection);
	}
	count++;
}

console.log("Answer 1: " + buffer[buffer.indexOf(2017)+1]);

count = 1;
position = 0;
buffer = [0];

let val = null;

while(count < 50000000) {
	position = (steps + position)%count + 1;
	if(position === 1) val = count;
	count++;
}

console.log("Answer 2: " + val);
