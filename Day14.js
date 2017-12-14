var hexToBinary = require('hex-to-binary');
function getHash(stringLengths) {
	let ascii = [];
	for(var i = 0; i < stringLengths.length; i++) {
		ascii.push(stringLengths.charCodeAt(i));
	}
	let toAdd = [17, 31, 73, 47, 23];
	ascii = ascii.concat(toAdd);

	list = [];
	for (var i = 0; i < 256; i++) {
		list.push(i);
	}

	let count = 0;
	position = 0;
	skipSize = 0;

	while(count < 64) {
		ascii.forEach(function(length) {
			let tempList = [];
			for (var i = position; i < position + length; i++) {
				tempList.push(list[i%256]);
			}
			tempList = tempList.reverse();
			let index = 0;

			for (var i = position; i < position + length; i++) {
				list[i%256] = tempList[index];
				index++;
			}
			position =(position + length + skipSize)%256;
			skipSize++;
		});
		count++;
	}

	count = 0;
	let denseArr = [];

	while(count < 16) {
		let denseHash = '';
		for(var i = count*16; i < (count+1)*16; i++) {
			denseHash = denseHash + list[i].toString();
			if (i !== (count+1)*16-1) denseHash = denseHash + '^';
		}
		denseArr.push(eval(denseHash));
		count++;
	}

	let finalString = '';

	denseArr.forEach(function(num) {
		let numString = num.toString(16);
		if(numString.length < 2) numString = '0' + numString;
		finalString = finalString + numString;
	});
	return finalString;
}

let input = 'oundnydw';

let used = 0;
let grid = [];
let checked = new Set();
let groups = 0;

for(var i = 0; i < 128; i++) {
	let row = input + '-' + i;
	let hash = getHash(row);
	let binary = hexToBinary(hash);
	let gridRow = '';
	grid.push(new Array(128));
	for(var j = 0; j < 128; j++) {
		if(binary.charAt(j) === '1') {
			used++;
			gridRow += "#";
			grid[i][j] = "#";
		}
		else {
			gridRow += ".";
			grid[i][j] = ".";
		}
	}
}

for(var i = 0; i < 128; i++) {
	for(var j = 0; j < 128; j++) {
		let str = 'x' + j + 'y' + i;
		if(!checked.has(str)) {
			checked.add(str);
			if(grid[j][i] === '#') {
				groups++;
				checkAdjacent(j, i);
			}
		}
	}
}

function checkAdjacent(x, y) {
	if(x+1 < 128) {
		let str = 'x' + (x+1) + 'y' + y;
		if(!checked.has(str)) {
			checked.add(str);
			if(grid[x+1][y] === '#') {
				checkAdjacent((x+1), y);
			}
		}
	}
	if(x-1 > -1) {
		let str = 'x' + (x-1) + 'y' + y;
		if(!checked.has(str)) {
			checked.add(str);
			if(grid[x-1][y] === '#') {
				checkAdjacent((x-1), y);
			}
		}
	}
	if(y+1 < 128) {
		let str = 'x' + x + 'y' + (y+1);
		if(!checked.has(str)) {
			checked.add(str);
			if(grid[x][y+1] === '#') {
				checkAdjacent(x, (y+1));
			}
		}
	}
	if(y-1 > -1) {
		let str = 'x' + x + 'y' + (y-1);
		if(!checked.has(str)) {
			checked.add(str);
			if(grid[x][y-1] === '#') {
				checkAdjacent(x, (y-1));
			}
		}
	}
}

console.log(used);
console.log(groups);
