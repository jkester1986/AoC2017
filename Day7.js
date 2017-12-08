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
			return;
		}
	});

	function getWeight(branch, weight) {

		if(programs[`${branch}`].branches !== '') {
			programs[`${branch}`].branches.forEach(function(newBranch) {
				let newWeight = programs[`${newBranch}`].weight;
				weight += getWeight(newBranch, newWeight);
			});
			return weight;
		}
		return weight;
	}

	let goal = 0;
	let badProgram = ''
	let weights = new Set();
	let branchWeights = {};
	let weightsArr = null;
	let badIndex = null;

	function findBadProgram(badBranch) {

		programs[`${badBranch}`].branches.forEach(function(branch) {
			weight = programs[`${branch}`].weight;
			let totalWeight = getWeight(branch, weight);
			if(weights.has(totalWeight)) goal = totalWeight;
			else weights.add(totalWeight);
			branchWeights[totalWeight] = `${branch}`;
		});

		if (weights.size === 2) {

			weightsArr = Array.from(weights);
			goodIndex = weightsArr.indexOf(goal);
			badIndex = (weightsArr.indexOf(goal)+1)%2;
			badProgram = branchWeights[weightsArr[badIndex]];
			goal = 0;
			weights = new Set();
			branchWeights = {};

			findBadProgram(badProgram);
		}
	}

	findBadProgram(`${base}`);

	let badProgramWeight = programs[`${badProgram}`].weight;
	let badWeight = weightsArr[badIndex];
	let goodWeight = weightsArr[goodIndex];

	console.log("Answer 2: " + (badProgramWeight + goodWeight - badWeight));
});
