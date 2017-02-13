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
// console.log(ancestry.filter(function(person){
// 	return person.born > 1900 && person.born < 1935;
// }))

// var byName = {};
// ancestry.forEach(function(person){
// 	byName[person.name] = person;
// })

// console.log(byName["Philibert Haverbeke"]);

// function reduceAncestors(person,f,defaultValue){
// 	function valueFor(person){
// 		if(person == null)
// 			return defaultValue;
// 		else
// 			return f(person,valueFor(byName[person.mother]), valueFor(byName[person.father]));
// 	}
// 	return valueFor(person);
// }

// function sharedDNA(person, fromMother, fromFather){
// 	if(person.name == "Pauwels van Haverbeke")
// 		return 1;
// 	else
// 		return (fromMother + fromFather) / 2;
// }

// var ph = byName["Philibert Haverbeke"];
// console.log(reduceAncestors(ph, sharedDNA, 0) / 4);


// var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

// function isInSet(set, person){
// 	return set.indexOf(person.name) > -1;
// }

// console.log(ancestry.filter(isInSet.bind(null, theSet)));



// Ejecicio 1

var arrays = [[1,2,3], [4,5], [6]];
var array = [];
debugger;
console.log(arrays.reduce(function(a, b){
	newArray = a.concat(b);
	return array.concat(newArray);
}));