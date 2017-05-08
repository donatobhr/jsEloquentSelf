// console.log(/abc/.test("abcde"));
// console.log(/abc/.test("abxde"));

// console.log(/[0123456789]/.test("in 1992"));
// console.log(/\w/.test("111"));

// 30-01-2003 15:20
// var dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/
// console.log(dateTime.test("30-01-2003 15:20"));

// var notBinary = /[^01]/;
// console.log(notBinary.test("12313123"));
// console.log(notBinary.test("01011010101010101"));

// console.log(/'\d+'/.test("'123'"));
// console.log(/'\d+'/.test("123"));
// console.log(/'\d*'/.test("'123'"));
// console.log(/'\d*'/.test("''"));

// var neighbor = /neighbou?r/;
// console.log(neighbor.test("neighbour"));
// console.log(neighbor.test("neighbor"));

// var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// console.log(dateTime.test("30-1-2003 8:45"));

// var cartoonCrying = /boo+(hoo+)+/i;
// console.log(cartoonCrying.test("Boohoooohoohooo"));

// var match = /\d+/.exec("one two 100");
// console.log(match);

// function findDate(string){
// 	var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
// 	var match = dateTime.exec(string);
// 	return new Date(Number(match[3]),Number(match[2])-1,Number(match[1]));
// }

// console.log(findDate("30-1-2003"));

// console.log(/\bcat\b/.test("concat"));

// var animalCount = /\b\d+ (pig|cow|chicken)s?\b/
// console.log(animalCount.test("15 pigsss"));

// console.log("Borobudur".replace(/[ou]/,"a"));
// console.log("Borobudur".replace(/[ou]/g,"a"));


console.log("Bencosme, Donato\nLopez, Patricia\nChavez, Dionisio".replace(/([\w ]+), ([\w ]+)/g,"$2 $1"));

