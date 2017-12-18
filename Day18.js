fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let directions = data.split('\n');
	let length = directions.length;
	let index = 0;
	let nonzero = false;
	let register = new Set();
	let sound = null;
	let count = 0;

	function getVal(match) {
		let matchInt = parseInt(match);
		if(isNaN(matchInt)) {
			if (register[`${match}`])
				return register[`${match}`];
			else
				return 0;
		}
		else return matchInt;
	}

	while(!nonzero) {
		let match = directions[index].match(/^(\w+)\s(\w)(\s(.+))?$/);

		switch(match[1]) {
			case 'set':
				register[`${match[2]}`] = getVal(match[4]);
					parseInt(match[4]);
				index++;
				break;
			case 'add':
				register[`${match[2]}`] = getVal(match[2]) + getVal(match[4]);
				index++;
				break;
			case 'mul':
				register[`${match[2]}`] *= getVal(match[2]) + getVal(match[4]);
				index++;
				break;
			case 'mod':
				register[`${match[2]}`] %= getVal(match[2]) + getVal(match[4]);
				index++;
				break;
			case 'snd':
				sound = getVal(match[2]);
				index++;
				break;
			case 'rcv':
				if(sound && getVal(match[2]) !== 0) {
					nonzero = true;
				}
				index++;
				break;
			case 'jgz':
				if(getVal(match[2]) > 0) {
					index += getVal(match[4]);
				}
				index++
				break;
		}

		index %= length;
		count++;
	}
	console.log(sound);
	console.log(count);

});
