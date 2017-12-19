fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let directions = data.split('\n');
	let length = directions.length;
	let index1 = 0;
	let index2 = 0;
	let deadlock = false;
	let toggle = true;
	let register1 = new Set();
	let register2 = new Set();
	let queue1 = [];
	let queue2 = [];
	let sound = null;
	let sent = 0;
	let count = 0;

	function getVal(match) {
		let matchInt = parseInt(match);
		if(isNaN(matchInt)) {
			if(toggle) {
				if (register1[`${match}`])
					return register1[`${match}`];
				else
					return 0;
			}
			else {
				if (register2[`${match}`])
					return register2[`${match}`];
				else
					return 1;
			}
		}
		else return matchInt;
	}

	while(!deadlock) {
		let pattern = /^(\w+)\s(\w)(\s(.+))?$/;
		let match = toggle ? directions[index1].match(pattern) : directions[index2].match(pattern);

		switch(match[1]) {
			case 'set':
				if(toggle) {
					register1[`${match[2]}`] = getVal(match[4]);
					index1++;
				}
				else {
					register2[`${match[2]}`] = getVal(match[4]);
					index2++;
				}
				break;
			case 'add':
				if(toggle) {
					register1[`${match[2]}`] = getVal(match[2]) + getVal(match[4]);
					index1++;
				}
				else {
					register2[`${match[2]}`] = getVal(match[2]) + getVal(match[4]);
					index2++;
				}
				break;
			case 'mul':
				if(toggle) {
					register1[`${match[2]}`] = getVal(match[2]) * getVal(match[4]);
					index1++;
				}
				else {
					register2[`${match[2]}`] = getVal(match[2]) * getVal(match[4]);
					index2++;
				}
				break;
			case 'mod':
				if(toggle) {
					register1[`${match[2]}`] = getVal(match[2]) % getVal(match[4]);
					index1++;
				}
				else {
					register2[`${match[2]}`] = getVal(match[2]) % getVal(match[4]);
					index2++;
				}
				break;
			case 'snd':
				if(toggle) {
					queue2.push(getVal(match[2]));
					sent++;
					index1++;
				}
				else {
					queue1.push(getVal(match[2]));
					index2++;
				}
				break;
			case 'rcv':
				if(toggle) {
					if(queue1[0] !== undefined ) {
						register1[`${match[2]}`] = queue1[0];
						queue1.length > 1 ? queue1.shift() : queue1 = [];
						index1++;
					}
					else {
						if(queue1[0] === undefined && queue2[0] === undefined) deadlock = true;
						toggle = false;
					}
				}
				else {
					if(queue2[0] !== undefined) {
						register2[`${match[2]}`] = queue2[0];
						queue2.length > 1 ? queue2.shift() : queue2 = [];
						index2++;
					}
					else {
						if(queue1[0] === undefined && queue2[0] === undefined) deadlock = true;
						toggle = true;
					}
				}
				break;
			case 'jgz':
				if(toggle) {
					if(getVal(match[2]) > 0) {
						index1 += getVal(match[4]);
					}
					else index1++;
				}
				else {
					if(getVal(match[2]) > 0) {
						index2 += getVal(match[4]);
					}
					else index2++;
				}
				break;
		}

		index1 %= length;
		index2 %= length;
		count++;
	}
	//console.log(sound);
	console.log(sent);

});
