fs = require('fs');
fs.readFile('Day20.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log(err);
	}
	data = data.trim();
	let lines = data.split('\n');
	let length = lines.length;
	let particles = [];
	let partLength = 0;

	for (var i = 0; i < length; i++) {
		let match = lines[i].match(/.*<(-?\d+),(-?\d+),(-?\d+)>.*<(-?\d+),(-?\d+),(-?\d+)>.*<(-?\d+),(-?\d+),(-?\d+)>/);
		particles.push({
			p: {
				x: parseInt(match[1]),
				y: parseInt(match[2]),
				z: parseInt(match[3])
			},
			v: {
				x: parseInt(match[4]),
				y: parseInt(match[5]),
				z: parseInt(match[6])
			},
			a: {
				x: parseInt(match[7]),
				y: parseInt(match[8]),
				z: parseInt(match[9])
			},
			index: i
		});
		partLength++;
	}

	count = 0;
	let collisions = {};
	let collidedParticles = new Set();

	while(count < 1000) {
		collisions = {};
		for(var i = 0; i < partLength; i++) {
			let particle = particles[i];
			particle.v = {
				x: particle.v.x + particle.a.x,
				y: particle.v.y + particle.a.y,
				z: particle.v.z + particle.a.z
			}
			particle.p = {
				x: particle.p.x + particle.v.x,
				y: particle.p.y + particle.v.y,
				z: particle.p.z + particle.v.z
			}
			particle.distance = (Math.abs(particle.p.x) + Math.abs(particle.p.y) + Math.abs(particle.p.z));
			let coord = particle.p.x.toString() + '.' + particle.p.y.toString() + '.' + particle.p.z.toString();
			particle.coord = coord;
			if(collisions[`${coord}`]) collisions[`${coord}`]++;
			else collisions[`${coord}`] = 1;
		}
		for(var i = 0; i < partLength; i++) {
			let particle = particles[i];
			let coord = particle.coord;
			if(collisions[`${coord}`] > 1) collidedParticles.add(i);
		}
		count++;
	}

	let closest = null;

	particles.forEach(function(particle) {
		if(closest === null || particle.distance < closest.distance) closest = particle;
	});

	console.log("Answer 1: " + closest.index);
	console.log("Answer 2: " + (partLength - collidedParticles.size));
});
