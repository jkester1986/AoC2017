fs = require('fs');
fs.readFile('Day22.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let nodes = data.split('\n').map(line => line.split(''));
	let nodesLength = nodes.length;

	let count = 0;
	let infected = 0;
	let coord = {
		dir: 'n',
		x: Math.floor(nodesLength/2),
		y: Math.floor(nodesLength/2)
	}

	const turnLeft = {
		n: 'w',
		s: 'e',
		e: 'n',
		w: 's'
	}

	const turnRight = {
		n: 'e',
		w: 'n',
		s: 'w',
		e: 's'
	}

	const flip = {
		n: 's',
		s: 'n',
		e: 'w',
		w: 'e'
	}

	while(count < 10000000) {
		// printNodes(nodes);
		switch(nodes[coord.y][coord.x]) {
			case '#':

				// turn right
				coord.dir = turnRight[coord.dir];

				// flag current node
				nodes[coord.y][coord.x] = 'F';

				// move forward
				move(coord);
				break;
			case '.':
				// turn left
				coord.dir = turnLeft[coord.dir];

				// weaken current node
				nodes[coord.y][coord.x] = 'W';

				// move forward
				move(coord);
				break;
			case 'F':
				// reverse
				coord.dir = flip[coord.dir];

				// clean current node
				nodes[coord.y][coord.x] = '.';

				// move forward
				move(coord);
				break;
			case 'W':
				// don't turn

				// infect current node
				nodes[coord.y][coord.x] = '#';
				infected++;

				// move forward
				move(coord);
				break;
		}
		// TODO: fix grid & coords if necessary (when out of range)
		if (coord.x < 0 || coord.x === nodes[0].length ||
			coord.y < 0 || coord.y === nodes.length) {
				adjustNodesAndCoords(coord, nodes);
			}
		count++;
	}
	// printNodes(nodes)

	console.log("infected:", infected)
});

function adjustNodesAndCoords(coord, nodes) {
	if (coord.x < 0) {
		nodes.forEach(node => {
			node.unshift('.');
		})
		coord.x = 0;
	}
	if (coord.x === nodes[0].length) {
		nodes.forEach(node => {
			node.push('.');
		})
	}
	if (coord.y < 0) {
		nodes.unshift(new Array(nodes[0].length).fill('.'));
		coord.y = 0;
	}
	if (coord.y === nodes.length) {
		nodes.push(new Array(nodes[0].length).fill('.'));
	}
}

function printNodes(nodes) {
	nodes.forEach(node => {
		console.log(node.join(' '));
	})
}

function move(coord) {
	switch(coord.dir) {
		case 'n':
			coord.y--;
			break;
		case 'w':
			coord.x--;
			break;
		case 's':
			coord.y++;
			break;
		case 'e':
			coord.x++;
			break;
	}
}
