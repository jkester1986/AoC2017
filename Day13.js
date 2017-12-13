fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	lines = data.split('\n');

	let layers = new Array(89);

	lines.forEach(function(line) {
		let match = line.match(/^(\d+):\s(\d+)$/);
		//console.log(match[1]);
		let array = new Array(parseInt(match[2]));
		//console.log(array);
		array[0] = '.';
		//console.log(array);
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

	console.log(severity);


});
