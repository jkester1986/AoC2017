fs = require('fs');
fs.readFile('Day7.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	let text = data;
	let lines = text.split('\n');
	lines = lines.splice(0, lines.length-1);
	let bases = new Array();
	let leaves = new Set();
	let programs = {};

	lines.forEach(function(line) {
		let match = line.match(/^(\w+)\s.*->\s(.*)$/);
		let match2 = line.match(/^(\w+)\s\((\d+)\).*$/);

		programs[`${match2[1]}`] = {
			weight: parseInt(match2[2]),
			branches: match ? match[2].split(', ') : ''
		}
		if(match) {
			if(!leaves.has(match[1])) bases.push(match[1]);
			let isSupporting = match[2].split(', ');
			isSupporting.forEach(function(leaf) {
				leaves.add(leaf);
			})
		}
	});

	let base = '';

	bases.forEach(function(currentBase) {
		if(!leaves.has(currentBase)) {
			base = currentBase;
			console.log("Answer 1: " + base);
			console.log(programs[`${base}`]);
			return;
		}
	});


	function getWeight(branch, weight) {

		if(programs[`${branch}`].branches !== '') {
			programs[`${branch}`].branches.forEach(function(newBranch) {
				weight += programs[`${newBranch}`].weight;
				return getWeight(newBranch, weight);
			});
		}
		return weight;
	}

	let weights = new Set();

	programs[`${base}`].branches.forEach(function(branch) {
		weight = programs[`${branch}`].weight;
		weights.add(getWeight(branch, weight));
	});

	console.log(weights);
	weights = Array.from(weights);
	console.log("Answer 2: " + (weights[0]-weights[1]));

});
