fs = require('fs');
fs.readFile('Day23.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let directions = data.split('\n');
	let length = directions.length;
	let index = 0;
	let register = { 'a' : 1};
	let mul = 0;

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

	while(index < length) {
		let pattern = /^(\w+)\s(.+)\s(.+)$/;
		let match = directions[index].match(pattern);

		switch(match[1]) {
			case 'set':
				register[`${match[2]}`] = getVal(match[3]);
				index++;
				break;
			case 'sub':
				register[`${match[2]}`] = getVal(match[2]) - getVal(match[3]);
				index++;
				break;
			case 'mul':
				register[`${match[2]}`] = getVal(match[2]) * getVal(match[3]);
				mul++;
				index++;
				break;
			case 'jnz':
				if(getVal(match[2]) !== 0) {
					index += getVal(match[3]);
				}
				else index++;
				break;
		}

		//index %= length;
		//console.log(index);
	}
	//console.log(sound);
	console.log(mul);
	console.log(register['h']);

});
