fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	lines = data.split('\n');

	let layers = new Array(7);

	lines.forEach(function(line) {
		let match = line.match(/^(\d+):\s(\d+)$/);
		let array = new Array(parseInt(match[2]));
		array[0] = '.';
		layers[match[1]] = {
			direction: "forward",
			arr: array.slice()
		}
	});

	let severity = 0;

	for(var i = 0; i < 89; i++) {
		if(layers[i] && layers[i].arr[0] === '.') {
			severity += i * layers[i].arr.length;
		}
		layers.forEach(function(layer) {
			let position = layer.arr.indexOf('.');
			layer.arr[position] = null;

			if (layer.direction === "forward") {
				if (position === layer.arr.length - 1) {
					layer.direction = "backward";
					layer.arr[(position-1)] = '.';
				}
				else {
					layer.arr[(position+1)] = '.';
				}
			}
			else {
				if (position === 0) {
					layer.direction = "forward";
					layer.arr[(position+1)] = '.';
				}
				else layer.arr[(position-1)] = '.';
			}
		});
	}

	console.log("Answer 1: " + severity);

	let safe = false;
	let picoseconds = 2;

	while(!safe) {
		safe = true;
		for(var i = 0; i < 89; i++) {
			if(layers[i] && (picoseconds + i)%(layers[i].arr.length*2-2) === 0) {
				safe = false;
				break;
			}
		}
		if (safe) {
			console.log("Answer 2: " + picoseconds);
		}
		picoseconds += 2;
	}
});
