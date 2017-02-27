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


function rowHeights(rows){
	return rows.map(function(row){
		return row.reduce(function(max,cell){
			return Math.max(max, cell.minHeight());
		}, 0)
	})
}

function colWidth(rows){
	return rows[0].map(function(_,i){
		return rows.reduce(function(max, row){
			return Math.max(max, row[i].minWidth());
		},0);
	});
}

function drawTable(rows){
	var heights = rowHeights(rows);
	console.log(heights);
	var widths = colWidth(rows);
	console.log(widths);
	
	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo];
		}).join(" ");
	}


	function drawRow(row, rowNum){
		var blocks = row.map(function(cell, colNum){
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0].map(function(_, lineNo){
			return drawLine(blocks, lineNo);
		}).join("\n");
	}

	return rows.map(drawRow).join("\n");
}

function repeat(string, times){
	var result = "";
	for(var i = 0; i < times; i++){
		result += string;
	}
	return result;
}

function TextCell(text){
	this.text = text.split("\n");
}

TextCell.prototype.minWidth = function(){
	return this.text.reduce(function(width, line){
		return Math.max(width, line.length);
	}, 0);
};

TextCell.prototype.minHeight = function(){
	return this.text.length;
};

TextCell.prototype.draw = function(width, height){
	var result = [];
	for(var i = 0; i < height; i++){
		var line = this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	return result;
};

var rows = [];
for(var i = 0; i < 5; i++){
	var row = [];
	for(var j = 0; j < 5; j++){
		if((j + i) % 2 === 0){
			row.push(new TextCell("##"));
		}else{
			row.push(new TextCell("  "));
		}
	}
	rows.push(row);
}

console.log(rows);
console.log(drawTable(rows));