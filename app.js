//Ejecicio Phi

// var journal = [];

// function addEntry(events, didITurnIntoASquirrel){
// 	journal.push({
// 		events: events,
// 		squirrel: didITurnIntoASquirrel
// 	})
// }

// var journal = [
//   {"events":["carrot","exercise","weekend"],"squirrel":false},
//   {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
//   {"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
//   {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
//   {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false},
//   {"events":["brussel sprouts","pudding","brushed teeth","running","weekend"],"squirrel":false},
//   {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false},
//   {"events":["bread","beer","brushed teeth","cycling","work"],"squirrel":false},
//   {"events":["cauliflower","brushed teeth","work"],"squirrel":false},
//   {"events":["pizza","brushed teeth","cycling","work"],"squirrel":false},
//   {"events":["lasagna","nachos","brushed teeth","work"],"squirrel":false},
//   {"events":["brushed teeth","weekend","touched tree"],"squirrel":false},
//   {"events":["lettuce","brushed teeth","television","weekend"],"squirrel":false},
//   {"events":["spaghetti","brushed teeth","work"],"squirrel":false},
//   {"events":["brushed teeth","computer","work"],"squirrel":false},
//   {"events":["lettuce","nachos","brushed teeth","work"],"squirrel":false},
//   {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
//   {"events":["brushed teeth","work"],"squirrel":false},
//   {"events":["cauliflower","reading","weekend"],"squirrel":false},
//   {"events":["bread","brushed teeth","weekend"],"squirrel":false},
//   {"events":["lasagna","brushed teeth","exercise","work"],"squirrel":false},
//   {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
//   {"events":["carrot","ice cream","brushed teeth","television","work"],"squirrel":false},
//   {"events":["spaghetti","nachos","work"],"squirrel":false},
//   {"events":["cauliflower","ice cream","brushed teeth","cycling","work"],"squirrel":false},
//   {"events":["spaghetti","peanuts","computer","weekend"],"squirrel":true},
//   {"events":["potatoes","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
//   {"events":["potatoes","ice cream","brushed teeth","work"],"squirrel":false},
//   {"events":["peanuts","brushed teeth","running","work"],"squirrel":false},
//   {"events":["potatoes","exercise","work"],"squirrel":false},
//   {"events":["pizza","ice cream","computer","work"],"squirrel":false},
//   {"events":["lasagna","ice cream","work"],"squirrel":false},
//   {"events":["cauliflower","candy","reading","weekend"],"squirrel":false},
//   {"events":["lasagna","nachos","brushed teeth","running","weekend"],"squirrel":false},
//   {"events":["potatoes","brushed teeth","work"],"squirrel":false},
//   {"events":["carrot","work"],"squirrel":false},
//   {"events":["pizza","beer","work","dentist"],"squirrel":false},
//   {"events":["lasagna","pudding","cycling","work"],"squirrel":false},
//   {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
//   {"events":["spaghetti","pudding","television","weekend"],"squirrel":false},
//   {"events":["bread","brushed teeth","exercise","weekend"],"squirrel":false},
//   {"events":["lasagna","peanuts","work"],"squirrel":true},
//   {"events":["pizza","work"],"squirrel":false},
//   {"events":["potatoes","exercise","work"],"squirrel":false},
//   {"events":["brushed teeth","exercise","work"],"squirrel":false},
//   {"events":["spaghetti","brushed teeth","television","work"],"squirrel":false},
//   {"events":["pizza","cycling","weekend"],"squirrel":false},
//   {"events":["carrot","brushed teeth","weekend"],"squirrel":false},
//   {"events":["carrot","beer","brushed teeth","work"],"squirrel":false},
//   {"events":["pizza","peanuts","candy","work"],"squirrel":true},
//   {"events":["carrot","peanuts","brushed teeth","reading","work"],"squirrel":false},
//   {"events":["potatoes","peanuts","brushed teeth","work"],"squirrel":false},
//   {"events":["carrot","nachos","brushed teeth","exercise","work"],"squirrel":false},
//   {"events":["pizza","peanuts","brushed teeth","television","weekend"],"squirrel":false},
//   {"events":["lasagna","brushed teeth","cycling","weekend"],"squirrel":false},
//   {"events":["cauliflower","peanuts","brushed teeth","computer","work","touched tree"],"squirrel":false},
//   {"events":["lettuce","brushed teeth","television","work"],"squirrel":false},
//   {"events":["potatoes","brushed teeth","computer","work"],"squirrel":false},
//   {"events":["bread","candy","work"],"squirrel":false},
//   {"events":["potatoes","nachos","work"],"squirrel":false},
//   {"events":["carrot","pudding","brushed teeth","weekend"],"squirrel":false},
//   {"events":["carrot","brushed teeth","exercise","weekend","touched tree"],"squirrel":false},
//   {"events":["brussel sprouts","running","work"],"squirrel":false},
//   {"events":["brushed teeth","work"],"squirrel":false},
//   {"events":["lettuce","brushed teeth","running","work"],"squirrel":false},
//   {"events":["candy","brushed teeth","work"],"squirrel":false},
//   {"events":["brussel sprouts","brushed teeth","computer","work"],"squirrel":false},
//   {"events":["bread","brushed teeth","weekend"],"squirrel":false},
//   {"events":["cauliflower","brushed teeth","weekend"],"squirrel":false},
//   {"events":["spaghetti","candy","television","work","touched tree"],"squirrel":false},
//   {"events":["carrot","pudding","brushed teeth","work"],"squirrel":false},
//   {"events":["lettuce","brushed teeth","work"],"squirrel":false},
//   {"events":["carrot","ice cream","brushed teeth","cycling","work"],"squirrel":false},
//   {"events":["pizza","brushed teeth","work"],"squirrel":false},
//   {"events":["spaghetti","peanuts","exercise","weekend"],"squirrel":true},
//   {"events":["bread","beer","computer","weekend","touched tree"],"squirrel":false},
//   {"events":["brushed teeth","running","work"],"squirrel":false},
//   {"events":["lettuce","peanuts","brushed teeth","work","touched tree"],"squirrel":false},
//   {"events":["lasagna","brushed teeth","television","work"],"squirrel":false},
//   {"events":["cauliflower","brushed teeth","running","work"],"squirrel":false},
//   {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
//   {"events":["carrot","reading","weekend"],"squirrel":false},
//   {"events":["carrot","peanuts","reading","weekend"],"squirrel":true},
//   {"events":["potatoes","brushed teeth","running","work"],"squirrel":false},
//   {"events":["lasagna","ice cream","work","touched tree"],"squirrel":false},
//   {"events":["cauliflower","peanuts","brushed teeth","cycling","work"],"squirrel":false},
//   {"events":["pizza","brushed teeth","running","work"],"squirrel":false},
//   {"events":["lettuce","brushed teeth","work"],"squirrel":false},
//   {"events":["bread","brushed teeth","television","weekend"],"squirrel":false},
//   {"events":["cauliflower","peanuts","brushed teeth","weekend"],"squirrel":false}
// ];


// function hasEvent(event, entry){
// 	return entry.events.indexOf(event) != -1;
// }

// function tableFor(event, journal){
// 	var table = [0,0,0,0];
// 	for(var i = 0; i < journal.length; i++){
// 		var entry = journal[i], index = 0;
// 		if(hasEvent(event, entry)) index += 1;
// 		if(entry.squirrel) index += 2;
// 		table[index] += 1;
// 	}

// 	return table;
// }


// function phi(table){
// 	return(table[3] * table[0] - table[2] * table[1]) / 
// 			Math.sqrt((table[3] + table[2]) *
// 					   (table[0] + table[1]) *
// 					   (table[3] + table[1]) *
// 					   (table[0] + table[2])
// 					 )
// }

// function gatherCorrelations(journal){
// 	var phis = {};
// 	for(var entry = 0; entry < journal.length; entry++){
// 		var events = journal[entry].events;
// 		for(var i = 0; i < events.length; i++){
// 			var event = events[i];
// 			if(!(event in phis)){
// 				phis[event] = phi(tableFor(event,journal));
// 			}
// 		}
// 	}
// 	return phis;
// }

// var correlations = gatherCorrelations(journal);
// for(var event in correlations){
// 	var correlation = correlations[event];
// 	if(correlation > 0.1 || correlation < -0.1){
// 		console.log(event + ": " + correlation);
// 	}
// }

// for(var i = 0; i < journal.length; i++){
// 	var entry = journal[i];
// 	if(hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry)){
// 		entry.events.push("peanuts teeth");
// 	}
// }

// console.log(phi(tableFor("peanuts teeth", journal)));



//Ejecicio 1

// function range(start, end, step){
// 	var arr = [];
// 	if(step == null || step == 1){
// 		if(end > start){
// 			for( ; start <= end; start++){
// 			arr.push(start);
// 			}
// 		}else{
// 			for( ; start >= end; start--){
// 				arr.push(start);
// 			}
// 		}
// 	}else{
// 		if(step < 0) step = -(step);
// 		if(end > start){
// 			for(; start <= end; start += step){
// 				arr.push(start);
// 			}
// 		}else{
// 			for(; start >= end; start -= step){
// 				arr.push(start);
// 			}
// 		}
// 	}
	
	
// 	return arr;
// }

// function sum(arr){
// 	var total = 0;
// 	for(var i = 0; i < arr.length; i++){
// 		total += arr[i]; 
// 	}
// 	return total;
// }

// console.log(range(10, 1, -2));


//Ejercicio 2

function reverseArray(arr){
	var arrRev = [];
	for(var i = arr.length - 1; i >= 0; i--){
		arrRev.push(arr[i]);
	}
	return arrRev;
}


// console.log(reverseArray(['A', 'B', 'C', 'D', 'E']));

function reverseArrayInPlace(arr){
	for(var i = 0; i < Math.floor(arr.length / 2); i++){
		var old = arr[i];
		arr[i] = arr[arr.length - 1 - i];
		arr[arr.length - 1 - i] = old
	}

	return arr;
}

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);