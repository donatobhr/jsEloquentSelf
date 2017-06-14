//chap_18

// document.querySelector("input").focus();
// console.log(document.activeElement.tagName);
// document.querySelector("input").blur();
// console.log(document.activeElement.tagName);


// var form = document.querySelector("form");
// console.log(form.elements[1].type);
// console.log(form.elements.password.type);
// console.log(form.elements.name.form == form);

// form.addEventListener("submit",function(){
// 	console.log("Saving value", form.elements.value.value);
// 	event.preventDefault();
// });




// var textarea = document.querySelector("textarea");
// textarea.addEventListener("keydown",function(event){
// 	console.log(event.keyCode);
// 	if(event.keyCode == 123){
// 		replaceSelection(textarea, "Khasekhemwy");
// 		event.preventDefault();
// 	}
// });

// function replaceSelection(field, word){
// 	var from = field.selectionStart, to = field.selectionEnd;
// 	field.value = field.value.slice(0, from) + word + field.value.slice(to);
// 	field.selectionStart = field.selectionEnd = from + word.length;
// }



// var text = document.querySelector("input");
// var output = document.querySelector("#length");
// text.addEventListener("input",function(event){
// 	console.log(event);
// 	output.textContent = text.value.length;
// 	if(text.value.length > 50){
// 		output.style.color = 'red';
// 	}else{
// 		output.style.color = 'black';
// 	}
// });



// var checkbox = document.querySelector("#purple");
// checkbox.addEventListener("change",function(){
// 	document.body.style.background = 
// 	checkbox.checked ? "mediumpurple" : "";

// });




// var buttons = document.getElementsByName("color");
// function setColor(event){
// 	document.body.style.background = event.target.value;
// }

// for(var i = 0; i < buttons.length; i++)
// 	buttons[i].addEventListener("change", setColor);




// var select = document.querySelector("select");
// var output = document.querySelector("#output");

// select.addEventListener("change",function(){
// 	var number = 0;
// 	for(var i = 0; i < select.options.length; i++){
// 		var option = select.options[i];
// 		if(option.selected)
// 			number += Number(option.value);
// 	}
// 	output.textContent = number;
// });



// var input = document.querySelector("input");
// input.addEventListener("change", function(){
// 	if(input.files.length > 0){
// 		console.log(input.files);
// 		var file = input.files[0];
// 		console.log("You chose", file.name);
// 		if(file.type)
// 			console.log("It has type", file.type);
// 	}
// });

// input.addEventListener("change", function(){
// 	Array.prototype.forEach.call(input.files, function(file){
// 		// var reader = new FileReader();
// 		// reader.addEventListener("load", function(){
// 		// 	console.log("File", file.name, "starts with",
// 		// 				reader.result.slice(0,20));
// 		// });
// 		// reader.readAsText(file);
// 		readFile(file).then(function(result){
// 			console.log("starts with", result);
// 		}, function(error){
// 			console.log("Faile to read the data");
// 		});
// 	})
// });

// function readFile(file){
// 	return new Promise(function(succeed,fail){
// 		var reader = new FileReader();
// 		reader.addEventListener("load",function(){
// 			succeed(reader.result.slice(0,20));
// 		});

// 		reader.addEventListener("error",function(){
// 			fail(reader.error);
// 		});
// 		reader.readAsText(file);
// 	});
// }





// localStorage.setItem("username","donato");
// console.log(localStorage.getItem("username"));
// localStorage.removeItem("username");
// console.log(localStorage.getItem("username"));





// var list = document.querySelector("#list");

// function addToList(name){
// 	var option = document.createElement("option");
// 	option.textContent = name;
// 	list.appendChild(option);
// }


// var notes = JSON.parse(localStorage.getItem("notes")) ||
// 			{"shopping list": ""};

// for(var name in notes){
// 	if(notes.hasOwnProperty(name))
// 		addToList(name)
// }

// function saveToStorage(){
// 	localStorage.setItem("notes", JSON.stringify(notes));
// }

// var current = document.querySelector("#currentnote");
// current.value = notes[list.value];

// list.addEventListener("change",function(){
// 	current.value = notes[list.value];
// });

// current.addEventListener("change",function(){
// 	notes[list.value] = current.value;
// 	saveToStorage();
// });

// function addNote(){
// 	var name = prompt("Note name", "");
// 	if(!name) return;
// 	if(!notes.hasOwnProperty(name)){
// 		notes[name] = "";
// 		addToList(name);
// 		saveToStorage();
// 	}
// 	list.value = name;
// 	current.value = notes[name];
// }






//Ejercicio 1
// document.querySelector("#button").addEventListener("click",function(){
// 	var code = document.querySelector("#code").value;
// 	var outputNode = document.querySelector("#output");

// 	try{
// 		var result = new Function(code)();
// 		outputNode.innerText = String(result);
// 	}catch(e){
// 		outputNode.innerText = "Error: " + e;
// 	}
// });



//Ejercicio 2


// names = ['alert','document','scrollTo'];
// var terms = [];
// for(var name in window)
// 	terms.push(name);

// var textfield = document.querySelector("#field");
// var suggestions = document.querySelector("#suggestions");

// textfield.addEventListener("input",function(){
// 	var matching = terms.filter(function(term){
// 		return term.indexOf(textfield.value) == 0;
// 	});
// 	suggestions.textContent = "";

// 	matching.slice(0,20).forEach(function(term){
// 		var node = document.createElement("div");
// 		node.textContent = term;
// 		node.addEventListener("click", function(){
// 			textfield.value = term;
// 			suggestions.textContent = "";
// 		});
// 		suggestions.appendChild(node);
// 	});
// });


//Ejercicio 3

var width = 30, height = 15;

var gridNode = document.querySelector("#grid");
var checkboxes = [];

for(var y = 0; y < height; y++){
	for(var x = 0; x < width; x++){
		var box = document.createElement("input");
		box.type = "checkbox";
		gridNode.appendChild(box);
		checkboxes.push(box);
	}
	gridNode.appendChild(document.createElement("br"));
}

function gridFromCheckboxes(){
	return checkboxes.map(function(box){ return box.checked; });
}

function checkboxesFromGrid(grid){
	return grid.forEach(function(value,i){ checkboxes[i].checked = value; })
}

function randomGrid(){
	var result = [];
	for(var i = 0; i < width * height; i++)
		result.push(Math.random() < 0.3);
	return result;
}

checkboxesFromGrid(randomGrid());

function countNeighbors(grid, x, y){
	var count = 0;
	for(var y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++){
		for(var x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++){
			if((x1 != x || y1 != y) && grid[x1 + y1 * width])
				count += 1;
		}
	}
	return count;
}

function nextGeneration(grid){
	var newGrid = new Array(width * height);
	for(var y = 0; y < height; y++){
		for(var x = 0; x < width; x++){
			var neighbors = countNeighbors(grid, x, y);
			var offset = x + y * width;
			if(neighbors < 2 || neighbors > 3)
				newGrid[offset] = false;
			else if(neighbors == 2)
				newGrid[offset] = grid[offset];
			else
				newGrid[offset] = true;
		}
	}
	return newGrid;
}

function turn(){
	checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

document.querySelector("#next").addEventListener("click", turn);

var running = null;
document.querySelector("#run").addEventListener("click",function(){
	if(running){
		clearInterval(running);
	}else{
		running = setInterval(turn, 400);
	}
})