function parseInput(){
	var text = document.getElementById("text").value;
	var lines = text.split('\n');

  let length = lines.length;

  let total = 0;
  let total2 = 0;

	for(var i = 0; i < length; i++) {
    window.console.log(lines[i].split('\t'));
    let nums = lines[i].split('\t').map(Number);
    let lowest = 1000000000000000;
    let highest = 0;
    for (var j = 0; j < 16; j++ ) {
      let num = nums[j];
      if (num < lowest) lowest = num;
      if (num > highest) highest = num;
      for (var k = 0; k < 16; k++ ) {
        if (num % nums[k] === 0 && j !== k) total2 += num/nums[k];
      }
    }
    window.console.log(`high: ${highest}`);
    console.log(`low: ${lowest}`);
    total += highest - lowest;
	}

	document.getElementById("answer1").innerHTML = `Answer1: ${total}`;
	document.getElementById("answer2").innerHTML = `Answer2: ${total2}`;
}
