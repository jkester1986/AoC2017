fs = require('fs');
fs.readFile('Day19.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	//data = data.trim();
	let lines = data.split('\n');
	let lengthy = lines.length;
	let lengthx = lines[1].length;
	let grid = [];

	for (let y = 0; y < lengthy; y++) {
		let line = lines[y];
		//console.log(line);
		let arr = new Array(lengthx);
		//console.log(arr.length);
		for(let x = 0; x < lengthx; x++) {
			//console.log(line.charAt(x));
			arr[x] = line.charAt(x);
		}
		grid.push(arr);
	}

	//console.log(grid);
/*
	for (let x = 0; x < lengthy; x++) {
		let string = '';
		for(let y = 0; y < lengthx; y++) {
			string += grid[x][y];
		}
		console.log(string);
	}
	*/

});
