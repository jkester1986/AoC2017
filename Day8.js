fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data;
	let lines = text.split('\n');
	lines = lines.splice(0, lines.length-1);

	let registers = {};
	let highest = 0;

	lines.forEach(function(line) {
		let match = line.match(/^(\w+)\s.*/);
		registers[`${match[1]}`] = 0;
	});

	function changeValue(register, incOrDec, value) {
		switch(incOrDec) {
			case 'inc' :
				registers[`${register}`] += parseInt(value);
				break;
			case 'dec' :
				registers[`${register}`] -= parseInt(value);
				break;
		}
		if(registers[`${register}`] > highest) highest = registers[`${register}`];
	}

	lines.forEach(function(line) {
		//console.log(line);
		let match = line.match(/^(\w+)\s(\w+)\s(-?\d+)\sif\s(\w+)\s([<>!=]=?)\s(-?\d+)$/);

		switch(match[5]) {
			case '<':
				if(registers[`${match[4]}`] < parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
			case '>':
				if(registers[`${match[4]}`] > parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
			case '==':
				if(registers[`${match[4]}`] === parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
			case '<=':
				if(registers[`${match[4]}`] <= parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
			case '>=':
				if(registers[`${match[4]}`] >= parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
			case '!=':
				if(registers[`${match[4]}`] !== parseInt(match[6])) {
					changeValue(match[1], match[2], match[3]);
				}
				break;
		}
	});

	let values = Object.values(registers);
	let max = Math.max(...values);

	console.log("Answer 1: " + max);
	console.log("Answer 2: " + highest);
});
