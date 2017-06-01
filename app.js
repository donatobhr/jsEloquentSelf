//chap_13

// ejercicio 1
// var MOUNTAINS = [
//   {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
//   {name: "Everest", height: 8848, country: "Nepal"},
//   {name: "Mount Fuji", height: 3776, country: "Japan"},
//   {name: "Mont Blanc", height: 4808, country: "Italy/France"},
//   {name: "Vaalserberg", height: 323, country: "Netherlands"},
//   {name: "Denali", height: 6168, country: "United States"},
//   {name: "Popocatepetl", height: 5465, country: "Mexico"}
// ];


// function buildTable(array){
// 	var titles = Object.keys(array[0]);
// 	var table = document.createElement("table");
// 	var headRow = document.createElement("tr");
// 	titles.forEach(function(field){
// 		var headCell = document.createElement("th");
// 		headCell.textContent = field;
// 		headRow.appendChild(headCell);
// 	})
// 	table.appendChild(headRow);

// 	array.forEach(function(object){
// 		var row = document.createElement("tr");
// 		titles.forEach(function(field){
// 			var cell = document.createElement("td");
// 			cell.textContent = object[field];
// 			if(typeof object[field] == "number")
// 				cell.style.textAlign = "right";
// 			row.appendChild(cell);
// 		});
// 		table.appendChild(row);
// 	});

// 	return table;
// }

// document.body.appendChild(buildTable(MOUNTAINS));


//Ejercicio 2

// function byTagName(node, tagName){
// 	var found = [];
// 	tagName = tagName.toUpperCase();

// 	function explore(node){
// 		for(var i = 0; i < node.childNodes.length; i++){
// 			var child = node.childNodes[i];
// 			if(child.nodeType == document.ELEMENT_NODE){
// 				if(child.nodeName == tagName)
// 					found.push(child);
// 					explore(child);
// 			}
// 		}
// 	}

// 	explore(node);
// 	return found;
// }

// console.log(byTagName(document.body, "table").length);


//Ejercicio 3
var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");

var angle = 0, lastTime = null;
function animate(time){
	if(lastTime != null)
		angle += (time - lastTime) * 0.0015;

	lastTime = time;
	cat.style.top = (Math.sin(angle) * 50 + 80) + "px";
	cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
	var hatAngle = angle + Math.PI;
	hat.style.top = (Math.sin(hatAngle) * 50 + 80) + "px";
	hat.style.left = (Math.cos(hatAngle) * 200 + 230) + "px";

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);