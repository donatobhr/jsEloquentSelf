// function canYouSpotTheProblem(){
// 	"use strict"
// 	for(var counter = 0; counter < 10; counter++){
// 		console.log("Happy happy");
// 	}
// }

// canYouSpotTheProblem();


// "use strict"
// function Person(name){this.name = name}

// var ferdinand = new Person("Ferdinand");
// console.log(name);

// function numberToString(n, base){
// 	var result = "", sign = "";

// 	if(n < 0){
// 		sign = "-";
// 		n = -n;
// 	}

// 	do{
// 		result = String(n % base) + result;
// 		n = Math.floor(n / base);
// 	}while(n > 0);
// 	return sign + result;
// }

// console.log(numberToString(13, 10));

// function promptNumber(question){
// 	var result = Number(prompt(question,""));
// 	if(isNaN(result)) return null;
// 	else return result;
// }

// console.log(promptNumber("How many trees do you see?"));

function promptDirection(question){
	var result = prompt(question, "");
	if(result.toLowerCase() == "left") return "L";
	if(result.toLocaleString() == "right") return "R";
	throw new InputError("Invalid direction: " + result);
}

// function look(){
// 	if(promptDirection("Which way?") == "L")
// 		return "a house";
// 	else
// 		return "two angry bears";
// }

// try{
// 	console.log("You see", look());
// }catch(error){
// 	console.log("Something went wrong -> " + error);
// }


// var context = null;

// function withContext(newContext, body){
// 	var oldContext = context;
// 	context = newContext;
// 	try{
// 		return body();
// 	}finally{
// 		context = oldContext;
// 	}
// 	// var result = body();
// 	// context = oldContext;
// 	// return result;
// }

// try{
// 	withContext(5, function(){
// 		if(context < 10)
// 			throw new Error("Not enought context!");
// 	});
// }catch(e){
// 	console.log("Ignoring: " + e);
// }

// console.log(context);

// for(;;){
// 	try{
// 		var dir = promptDirection("Where?");
// 		console.log("You chose ", dir);
// 		break;
// 	}catch(e){
// 		if(e instanceof InputError){
// 			console.log("Not a valid direction. Try again");
// 		}else{
// 			throw e;
// 		}
// 		// console.log("Not a valid direction try again");
// 	}
// }

// function InputError(message){
// 	this.message = message;
// 	this.stack = (new Error()).stack;
// }

// InputError.prototype = Object.create(Error.prototype);
// InputError.prototype.name = "InputError";


// ejercicio 1

// function MultiplicatorUnitFailure(message){
// 	this.message = message;
// }

// MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
// MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

// function primitiveMultiply(a,b){
// 	if(Math.random() < 0.5){
// 		return a * b
// 	}else{
// 		throw new MultiplicatorUnitFailure();
// 	}
// }

// function reliableMultiply(a,b){
// 	for(;;){
// 		try{
// 			return primitiveMultiply(a,b);
// 		}catch(e){
// 			if(!(e instanceof MultiplicatorUnitFailure)){
// 				throw e;
// 			}
// 		}		
// 	}
// }

// console.log(reliableMultiply(8,8));


// ejercicio 2
var box = {
	locked: true,
	unlock: function(){this.locked = false;},
	lock: function(){this.locked = true;},
	_content: [],
	get content(){
		if(this.locked) throw new Error("Locked!");
		return this._content
	}
};

function withBoxUnlocked(body){
	var locked = box.locked;
	if(!locked)
		return body();

	box.unlock();

	try{
		return body();
	}finally{
		box.lock();
	}
}

withBoxUnlocked(function(){
	box.content.push("Gold Piece");
})

try{
	withBoxUnlocked(function(){
		throw new Error("Pirates on the horizon! Abort!");
	});
}catch(e){
	console.log("Error raised: ", e);
}
console.log(box.locked);