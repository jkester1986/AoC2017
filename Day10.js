let list = new Array();
let lengths = [230,1,2,221,97,252,168,169,57,99,0,254,181,255,235,167];
let stringLengths = "oundnydw";

let ascii = [];
let toAdd = [17, 31, 73, 47, 23];
//
for(var i = 0; i < stringLengths.length; i++) {
	ascii.push(stringLengths.charCodeAt(i));
}

ascii = ascii.concat(toAdd);
//////////
for (var i = 0; i < 256; i++) {
	list.push(i);
}

let position = 0;
let skipSize = 0;

lengths.forEach(function(length) {
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

console.log("Answer 1: " + list[0] * list[1]);


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

console.log("Answer 2: " + finalString);
