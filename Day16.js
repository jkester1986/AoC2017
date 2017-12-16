fs = require('fs');
fs.readFile('Day16.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	directions = data.split(',');

	let letters = "abcdefghijklmnop";
	//let letters = "abcde";
	letters = letters.split('');
	let length = letters.length;

	let count = 0;
	let set = [];

	while(count < 1000000000) {
		directions.forEach(function(dir) {
			let spin = dir.match(/^s(\d+)$/);
			let exchange = dir.match(/^x(\d+)\/(\d+)$/);
			let partner = dir.match(/^p(\w)\/(\w)$/);

			if(spin) {
				let rotLength = spin[1];
				letters = letters.slice(length - rotLength).concat(letters.slice(0, length - rotLength));
			}
			if(exchange) {
				let ind1 = parseInt(exchange[1]);
				let ind2 = parseInt(exchange[2]);
				let letter1 = letters[ind1];
				let letter2 = letters[ind2];

				letters[ind1] = letter2;
				letters[ind2] = letter1;
			}
			if(partner) {
				let ind1 = letters.indexOf(partner[1]);
				let ind2 = letters.indexOf(partner[2]);

				letters[ind1] = partner[2];
				letters[ind2] = partner[1];
			}

		});

		count++;
		if(!set.includes(letters.join(""))) set.push(letters.join(""));
		else break;

		if(count === 1) console.log("Answer 1: " + letters.join(""));
	}

	let match = (1000000000-1)%(count-1);
	console.log("Answer 2: " + set[match]);

});
