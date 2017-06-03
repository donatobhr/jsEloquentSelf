//chap_14
var button = document.querySelector("button");
// function once(){
// 	console.log("Done");
// 	button.removeEventListener("click", once);
// }

// button.addEventListener("click", once);


// button.addEventListener("mousedown", function(event){
// 	if(event.which == 1)
// 		console.log("Left button");
// 	else if(event.which == 2)
// 		console.log("Middle button");
// 	else if(event.which == 3)
// 		console.log("Right button");
// })

// var para = document.querySelector("p");
// para.addEventListener("mousedown",function(){
// 	console.log("Handler for paragraph");
// })

// button.addEventListener("mousedown", function(event){
// 	console.log("Handler for button");
// 	if(event.which == 3)
// 		event.stopPropagation();
// })


// document.body.addEventListener("click",function(event){
// 	console.log("Clicked", event.target.textContent);
// })


// var link = document.querySelector("a");
// link.addEventListener("click",function(event){
// 	console.log("NOPE");
// 	event.preventDefault();
// })

// addEventListener("keydown",function(event){
// 	if(event.keyCode == 71)
// 		document.body.style.backgroundColor = "green";
// });

// addEventListener("keyup",function(event){
// 	if(event.keyCode == 71)
// 		document.body.style.backgroundColor = "";
// });

// addEventListener("keydown",function(event){
// 	event.preventDefault();
// 	if(event.keyCode == 71 && event.ctrlKey){
// 		console.log("Continuing!");
// 	}
// });


// addEventListener("keypress",function(event){
// 	console.log(String.fromCharCode(event.charCode));
// })


// addEventListener("click",function(event){
// 	var dot = document.createElement("div");
// 	dot.className = "dot";
// 	dot.style.left = (event.pageX - 4) + "px";
// 	dot.style.top = (event.pageY - 4) + "px";
// 	document.body.appendChild(dot);
// })


// var lastX; //Track the last observed mouse X position
// var rect = document.querySelector("div");
// rect.addEventListener("mousedown",function(event){
// 	if(event.which == 1){
// 		lastX = event.pageX;
// 		console.log(event.pageY);
// 		addEventListener("mousemove", moved);
// 		event.preventDefault(); //Prevent selection
// 	}
// });

// function buttonPressed(event){
// 	if(event.buttons == null)
// 		return event.which != 0;
// 	else
// 		return event.buttons != 0;
// }

// function moved(event){
// 	if(!buttonPressed(event)){
// 		removeEventListener("mousemove",moved);
// 	}else{
// 		var dist = event.pageX - lastX;
// 		var newWidth = Math.max(10, rect.offsetWidth + dist);
// 		rect.style.width = newWidth + "px";
// 		lastX = event.pageX;
// 	}
// }


// var para = document.querySelector("p");

// function isInside(node,target){
// 	for(; node != null; node = node.parentNode)
// 		if(node == target) return true;
// };

// para.addEventListener("mouseover",function(event){
// 	if(!isInside(event.relatedTarget, para))
// 		para.style.color = "red";
// });

// para.addEventListener("mouseout",function(event){
// 	if(!isInside(event.relatedTarget, para))
// 		para.style.color = "";
// });


// var bar = document.querySelector(".progress div");
// addEventListener("scroll",function(){

// 	var max = document.body.scrollHeight - innerHeight;
// 	var percent = (pageYOffset / max) * 100;
// 	console.log(percent);
// 	bar.style.width = percent + "%";
// });


// var help = document.querySelector("#help");
// var fields = document.querySelectorAll("input");

// for(var i = 0; i < fields.length; i++){
// 	fields[i].addEventListener("focus",function(event){
// 		var text = event.target.getAttribute("data-help");
// 		help.textContent = text;
// 	});

// 	fields[i].addEventListener("blur",function(event){
// 		help.textContent = "";
// 	});
// }

// var squareWorker = new Worker("squareworker.js");
// squareWorker.addEventListener("message", function(event) {
//   console.log("The worker responded:", event.data);
// });
// squareWorker.postMessage(10);
// squareWorker.postMessage(24);

// function displayCoords(event){
// 	document.body.textContent = "Mouse at " + event.pageX + ", " 
// 	+ event.pageY;
// }

// var scheduled = false, lastEvent;
// addEventListener("mousemove",function(event){
// 	lastEvent = event;
// 	if(!scheduled){
// 		scheduled = true;
// 		setTimeout(function(){
// 			scheduled = false;
// 			displayCoords(lastEvent);
// 		}, 250);
// 	}
// })


//Ejercicio 1
// var field = document.querySelector("input");
// field.addEventListener("keydown",function(event){
// 	if(event.keyCode == 81 || event.keyCode == 87 || event.keyCode == 88){
// 		event.preventDefault();
// 	}
// });


//Ejercicio 2
// var dots = [];
// for(var i = 0; i < 12; i++){
// 	var node = document.createElement("div");
// 	node.className = "trail";
// 	document.body.appendChild(node);
// 	dots.push(node);
// }
// var currentDot = 0;
// addEventListener("mousemove",function(event){
// 	var dot = dots[currentDot];
// 	dot.style.left = (event.pageX - 3) + "px";
// 	dot.style.top = (event.pageY - 3) + "px";
// 	currentDot = (currentDot + 1) % dots.length;
// });


//Ejercicio 3
function asTabs(node){
	var tabs = [];
	for(var i = 0; i < node.childNodes.length; i++){
		var child = node.childNodes[i];
		if(child.nodeType == document.ELEMENT_NODE)
			tabs.push(child);
	}

	var tabList = document.createElement("div");
	tabs.forEach(function(tab,i){
		var button = document.createElement("button");
		button.textContent = tab.getAttribute("data-tabname");
		button.addEventListener("click", function(){ selectTab(i)});
		tabList.appendChild(button);
	});
	node.insertBefore(tabList, node.firstChild);

	function selectTab(n){
		tabs.forEach(function(tab, i){
			if(i == n)
				tab.style.display = "";
			else
				tab.style.display = "none";
		});

		for(var i = 0; i < tabList.childNodes.length; i++){
			if(i == n)
				tabList.childNodes[i].style.background = "violet";
			else
				tabList.childNodes[i].style.background = "";
		}
	}

	selectTab(1);
}

asTabs(document.querySelector("#wrapper"));

