//primer ejercicio

// var hash = '';
// for(var i = 1; i <= 7; i++){
// 	hash += "#";
// 	console.log(hash);
// }


//segundo ejercicio
// for(var i = 1; i <= 100; i++){
// 	var output = "";
// 	if(i % 3 == 0){
// 		output += "Fizz";
// 	}

// 	if(i % 5 == 0){
// 		output += "Buzz";
// 	}

// 	console.log(output || i);
// }

//tercer ejercicio
var size = 8;
var board = "";
for(var i = 0; i < size; i++){
	for(var j = 0; j < size; j++){
		if((i + j) % 2 == 0){
			board += " ";
		}else{
			board += "#";
		}
	}
	board += "\n";
}
console.log(board);