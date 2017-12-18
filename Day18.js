fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let directions = data.split('\n');
	let index = 0;
	let nonzero = false;

	while(!nonzero) {
		let match = directions[i].match(/^(\w+)\s(\w)(\s(.+))?$/)
		index++;
	}

	switch(match[1]) {
		case 'set':

			break;
		case 'add':

			break;
		case 'mul':

			break;
		case 'mod':

			break;
		case 'snd':

			break;
		case 'rcv':

			break;
		case 'jgz':

			break;
	}

});
