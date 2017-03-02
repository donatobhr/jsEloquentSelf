// var rabby = {};
// rabby.speak = function(line){
// 	console.log("The rabby says '" + line + "'");
// }

// rabby.speak('Hola mundo');


// function speak(line){
// 	console.log("The " + this.type + " rabbit says '" + line + "'");
// }

// var whiteRabbit = {type: "white", speak: speak};
// var fatRabbit = {type: "fat", speak: speak};

// whiteRabbit.speak("Oh my ears and whiskers, how late is's getting!");
// fatRabbit.speak("I could sure use a carrot right now");

// speak.apply(fatRabbit, ["Burp!"]);
// speak.call({type : "Old"}, "Oh my.");

// var empty = {};
// console.log(empty.toString());

// var protoRabbit = {
// 	speak: function(line){
// 		console.log("The " + this.type + " rabbit says '" + line + "'");
// 	}
// }

// var KillerRabbit = Object.create(protoRabbit);
// KillerRabbit.type = "Killer Rabbit";
// KillerRabbit.speak("Skeeer!!");


// function Rabbit(type){
// 	this.type = type;
// }

// Rabbit.prototype.speak = function(line){
// 	console.log("The " + this.type + " rabbit says '" + line + "'");
// }

// Rabbit.prototype.teeth = "small"

// Rabbit.prototype.dance = function(){
// 	console.log("The " + this.type + " rabbit dances a jig");
// }


// var KillerRabbit = new Rabbit("Killer");
// var blackRabbit = new Rabbit("Black");
// blackRabbit.speak("...DOOM!!");
// blackRabbit.teeth = "Black";
// blackRabbit.dance();
// console.log(Rabbit.prototype);
// console.log(Object.getPrototypeOf(Rabbit.prototype));


// var map = Object.create(null);
// function storePhi(event, phi) {
//   map[event] = phi;
// }

// storePhi("pizza", 0.069);
// storePhi("touched tree", -0.081);

// for (var name in map){
//     console.log(name);
// }

// console.log(map.toString());





////////////////////////////////////////////////////////////////////////////

// function rowHeights(rows){
// 	return rows.map(function(row){
// 		return row.reduce(function(max,cell){
// 			return Math.max(max, cell.minHeight());
// 		}, 0)
// 	})
// }

// function colWidth(rows){
// 	return rows[0].map(function(_,i){
// 		return rows.reduce(function(max, row){
// 			return Math.max(max, row[i].minWidth());
// 		},0);
// 	});
// }

// function drawTable(rows){
// 	var heights = rowHeights(rows);
// 	var widths = colWidth(rows);

// 	function drawLine(blocks, lineNo){
// 		return blocks.map(function(block){
// 			return block[lineNo];
// 		}).join(" ");
// 	}


// 	function drawRow(row, rowNum){
// 		var blocks = row.map(function(cell, colNum){
// 			return cell.draw(widths[colNum], heights[rowNum]);
// 		});
// 		return blocks[0].map(function(_, lineNo){
// 			return drawLine(blocks, lineNo);
// 		}).join("\n");
// 	}

// 	return rows.map(drawRow).join("\n");
// }

// function repeat(string, times){
// 	var result = "";
// 	for(var i = 0; i < times; i++){
// 		result += string;
// 	}
// 	return result;
// }

// function TextCell(text){
// 	this.text = text.split("\n");
// }

// TextCell.prototype.minWidth = function(){
// 	return this.text.reduce(function(width, line){
// 		return Math.max(width, line.length);
// 	}, 0);
// };

// TextCell.prototype.minHeight = function(){
// 	return this.text.length;
// };

// TextCell.prototype.draw = function(width, height){
// 	var result = [];
// 	for(var i = 0; i < height; i++){
// 		var line = this.text[i] || "";
// 		result.push(line + repeat(" ", width - line.length));
// 	}
// 	return result;
// };

// var rows = [];
// for(var i = 0; i < 2; i++){
// 	var row = [];
// 	for(var j = 0; j < 2; j++){
// 		if((j + i) % 2 === 0){
// 			row.push(new TextCell("##"));
// 		}else{
// 			row.push(new TextCell("  "));
// 		}
// 	}
// 	rows.push(row);
// }


// function UnderlinedCell(inner){
// 	this.inner = inner;
// };

// UnderlinedCell.prototype.minWidth = function(){
// 	return this.inner.minWidth();
// };

// UnderlinedCell.prototype.minHeight = function(){
// 	return this.inner.minHeight() + 1;
// }

// UnderlinedCell.prototype.draw = function(width, height){
// 	return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
// }

// function dataTable(data){
// 	var keys = Object.keys(data[0]);
// 	var headers = keys.map(function(name){
// 		return new UnderlinedCell(new TextCell(name));
// 	});

// 	var body = data.map(function(row){
// 		return keys.map(function(name){
// 			var value = row[name];
// 			if(typeof value == "number")
// 				return new RTextCell(String(row[name]));
// 			else
// 				return new TextCell(String(row[name]));
// 		});
// 	});

// 	return [headers].concat(body);
// }

// function RTextCell(text){
// 	TextCell.call(this,text);
// }

// RTextCell.prototype = Object.create(TextCell.prototype);
// RTextCell.prototype.draw = function(width, height){
// 	var result = [];
// 	for(var i = 0; i < height; i++){
// 		var line = this.text[i] || "";
// 		result.push(repeat(" ", width - line.length) + line);
// 	}

// 	return result;
// }

// console.log(drawTable(dataTable(MOUNTAINS)));

/////////////////////////////////////////////////////////////////////////////////



//Ejercicio 1 Vector Type

// function Vector(x,y){
// 	this.x = x;
// 	this.y = y;
// }

// Vector.prototype.plus = function(vector){
// 	return new Vector(this.x + vector.x, this.y + vector.y);
// }

// Vector.prototype.minus = function(vector){
// 	return new Vector(this.x - vector.x, this.y - vector.y);
// }

// Object.defineProperty(Vector.prototype, "length",{
// 	get: function(){ return Math.sqrt(this.x * this.x + this.y * this.y)}
// });

// console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
// console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
// console.log(new Vector(3, 4).length);
//5


//Ejercicio 2 