// function forEach(array, action){
// 	console.log(action(array));
// 	for(var i = 0; i < array.length; i++){
// 		action(array[i]);
		
// 	}
// }

// var numbers = [1,2,3,4,5], sum = 0;
// forEach(numbers, function(number){
// 	sum += number;
// })
// console.log(sum);


// var string = JSON.stringify({name: "x", born: 1980});
// console.log(string);
// console.log(JSON.parse(string).name);

var ancestry = JSON.parse(ANCESTRY_FILE);
// console.log(ancestry.length);

// function filter(array, test){
// 	var passed = [];
// 	for(var i = 0; i < array.length; i++){
// 		if(test(array[i])){
// 			passed.push(array[i]);
// 		}
// 	}
// 	return passed;
// }

// console.log(filter(ancestry, function(person){
// 	return person.born > 1900 && person.born < 1925;
// }));
console.log(ancestry.filter(function(person){
	return person.born > 1900 && person.born < 1935;
}))