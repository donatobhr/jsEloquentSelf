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



// Ejercicio 1

// var arrays = [[1,2,3], [4,5], [6]];
// var array = [];
// debugger;
// console.log(arrays.reduce(function(a, b){
// 	newArray = a.concat(b);
// 	return array.concat(newArray);
// }));



//Ejercicio 2

// function average(array) {
//   function plus(a, b) { return a + b; }
//   return array.reduce(plus) / array.length;
// }

// var byName = {};
// ancestry.forEach(function(person) {
//   byName[person.name] = person;

// });

// var difference = ancestry.filter(function(person){
// 		return byName[person.mother] != null;
// 	}).map(function(person){
// 		return person.born - byName[person.mother].born;
// 	})

// var difference = ancestry.map(function(person){
// 	if(byName[person.mother] != null){
// 		return person.born - byName[person.mother].born;
// 	}else{
// 		return null;
// 	}
// }).filter(function(person){
// 	return person != null;
// })

// console.log(average(difference));


//Ejercicio 3

// function groupBy(array, groupOf){
// 	var groups = {};
// 	array.forEach(function(element){
// 		var groupName = groupOf(element);
// 		if(groupName in groups){
// 			groups[groupName].push(element);
// 		}else{
// 			groups[groupName] = [element];
// 		}
// 	});
// 	return groups;
// }

// var byCentury = groupBy(ancestry, function(person){
// 	return Math.ceil(person.died / 100);
// })

// for(var century in byCentury){
// 	var ages = byCentury[century].map(function(person){
// 		return person.died - person.born;
// 	})
// 	console.log(century + ": " + Math.ceil(average(ages)));
// }


// Ejercicio 4

function every(array, predicate){
	for(var i = 0; i < array.length; i++){
		if(!predicate(array[i])){
			return false;
			continue;
		}
	}
	return true;
}

function some(array, predicate){
	for(var i = 0; i < array.length; i++){
		if(predicate(array[i])){
			return true;
			continue;
		}
	}
	return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));