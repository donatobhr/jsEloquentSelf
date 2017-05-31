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


var lastX; //Track the last observed mouse X position
var rect = document.querySelector("div");
rect.addEventListener("mousedown",function(event){
	if(event.which == 1){
		lastX = event.pageX;
		console.log(event.pageY);
		addEventListener("mousemove", moved);
		event.preventDefault(); //Prevent selection
	}
});

function buttonPressed(event){
	if(event.buttons == null)
		return event.which != 0;
	else
		return event.buttons != 0;
}

function moved(event){
	if(!buttonPressed(event)){
		removeEventListener("mousemove",moved);
	}else{
		var dist = event.pageX - lastX;
		var newWidth = Math.max(10, rect.offsetWidth + dist);
		rect.style.width = newWidth + "px";
		lastX = event.pageX;
	}
}