// console.log(/abc/.test("abcde"));
// console.log(/abc/.test("abxdec"));

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


// console.log("Bencosme, Donato\nLopez, Patricia\nChavez, Dionisio".replace(/([\w ]+), ([\w ]+)/g,"$2 $1"));

// var quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));

// console.log(/bad(ly)?/.exec("bad"));

// console.log(/\bcat\b/.test("cat"));

// var stock = "1 lemon, 2 cabbages, and 101 eggs";
// function minusOne(match, amount, unit) {
//   amount = Number(amount) - 1;
//   if (amount == 1) // only one left, remove the 's'
//     unit = unit.slice(0, unit.length - 1);
//   else if (amount == 0)
//     amount = "no";
//   return amount + " " + unit;
// }
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs


// Ejercicio 2

// var text = "'I'm the cook,' he said, 'it's my job.'";
// console.log(text.replace(/(^|\w)'|'(\w|$)/g,"$1'$2"));
// console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));


//Ejercicio 3
// var number = /^(\+|-)?(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;

// console.log(number.test("32.2E+2"));