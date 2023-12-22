fs = require('fs');
fs.readFile('Day21.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let lines = data.split('\n'),
		directions = { 2: {}, 3: {}},
		grid = [['.','#','.'], ['.','.','#'], ['#','#','#']];

	// put directions in a dictionary
	lines.forEach(dir => {
		let match = dir.match(/^(.+)\s\=>\s(.+)$/);
		let input = match[1],
			output = match[2];

		if(input.match(/\//g)?.length === 2) {
			directions[2][`${input}`] = output;
		}
		else {
			directions[3][`${input}`] = output;
		}
	});

	// iterate
	let limit = 0;
	while(limit > 0) {
		if(grid.length % 2 === 0) {
			//TODO:
		}
	}

	console.log(directions);
});


function flipX(input) {
	let split = input.split("/");
	if(split.length == 2) {
		let bottom = split[1];
		split[1] = split[0];
		split[0] = bottom;
		return `${split[0]}/${split[1]}`;
	}
	else {
		let bottom = split[2];
		split[2] = split[0];
		split[0] = bottom;
		return `${split[0]}/${split[1]}/${split[2]}`;
	}
}

function flipY(input) {
	let split = input.split("/");
	let reversals = [];
	split.forEach(string => {
		reversals.push(reverse(string));
	});

	return reversals.join("/");
}

function rotate(input) {
	let rows = input.split('/');
	if(rows.length === 2) {
		rows[0] = rows[0].charAt(1) + rows[1].charAt(1);
		rows[1] = rows[1].charAt(0) + rows[0].charAt(0);
	}
	else {
		rows[0] = rows[0].charAt(1) + rows[0].charAt(2) + rows[1].charAt(2);
		rows[1] = rows[0].charAt(0) + rows[1].charAt(1) + rows[2].charAt(2);
		rows[2] = rows[1].charAt(0) + rows[2].charAt(0) + rows[2].charAt(1);
	}

	return rows.join("/");
}

//keeping it simple, since our length is only ever 2 or 3
function reverse(string) {
	let chars = string.split("");
	let lengthIndex = chars.length-1;

	let swap = chars[0];
	chars[0] = chars[lengthIndex];
	chars[lengthIndex] = swap;
	let joined = chars.join('');

	return joined;
}
