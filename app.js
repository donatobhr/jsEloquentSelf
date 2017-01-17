//primer ejercicio
function min(n,e){
	var min = "";
	if(n < e){
		min = n;
	}else{
		min = e;
	}

	return min;
}

// console.log(min(10, 11))

//segundo ejercicio

function isEven(number){
	if(number == 0){
		return true;
	}else if(number == 1){
		return false;
	}else if(number < 0){
		return isEven(number + 2);
	}else{
		return isEven(number - 2);
	}
}

// console.log(isEven(50));
// console.log(isEven(75));
// console.log(isEven(-2));

//tercer ejercicio
function countBs(string){
	var count = 0;
	for(var i = 0; i < string.length; i++){
		if(string.charAt(i) === "B"){
			count += 1;
		}
	}
	return count;
}

function countChar(str, char){
	var count = 0;
	for(var i = 0; i < str.length; i++){
		if(str.charAt(i) === char){
			count += 1;
		}
	}

	return count;
}

// console.log(countBs("BBC"));
// console.log(countChar("kakkerlak", "k"));