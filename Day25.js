let state = 'A';
let index = 0;
let tape = [0];
let count = 0;

function incTape() {
	index++;
	if(index === tape.length) tape.push(0);
}

function decTape() {
	index--;
	if(index < 0) {
		tape.unshift(0);
		index = 0;
	}
}


while(count < 12399302) {
	switch(state) {
		case 'A':
			if(tape[index] === 0) {
				tape[index] = 1;
				state = "B";
			}
			else {
				tape[index] = 0;
				state = "C";
			}
			incTape();
			break;

		case 'B':
			if(tape[index] === 0) {
				tape[index] = 0;
				state = "A";
				decTape();
			}
			else {
				tape[index] = 0;
				state = "D";
				incTape();
			}
			break;

		case 'C':
			if(tape[index] === 0) state = 'D';
			else state = 'A';
			tape[index] = 1;
			incTape();
			break;

		case 'D':
			if(tape[index] === 0) {
				tape[index] = 1;
				state = 'E';
			}
			else {
				tape[index] = 0;
				state = 'D';
			}
			decTape();
			break;

		case 'E':
			if(tape[index] === 0) {
				tape[index] = 1;
				state = 'F';
				incTape();
			}
			else {
				tape[index] = 1;
				state = 'B';
				decTape();
			}
			break;

		case 'F':
			if(tape[index] === 0) state = 'A';
			else state = 'E';
			tape[index] = 1;
			incTape();
			break;
	}

	count++;
}

let ones = 0;

tape.forEach(function(val) {
	if(val === 1) ones++;
});

console.log("Answer 1: " + ones);
