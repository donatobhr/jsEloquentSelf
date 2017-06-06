// chap_16

// var circle = document.querySelector("circle");
// circle.setAttribute("fill","cyan");




var cx = document.querySelector("canvas").getContext("2d");
// cx.fillStyle = "red";
// cx.fillRect(10,10,100,50);
// cx.stroke = "blue";



// cx.strokeStyle = "blue";
// cx.strokeRect(5,5,50,50);
// cx.lineWidth = 5;
// cx.strokeRect(135,5,50,50);



// cx.beginPath();
// for(var y = 10; y < 100; y += 10){
// 	cx.moveTo(10, y);
// 	cx.lineTo(90, y);
// }

// cx.stroke();


// cx.beginPath();
// cx.moveTo(50,10);
// cx.lineTo(10,70);
// cx.lineTo(90,70);
// cx.fill();



// cx.beginPath();
// cx.moveTo(10,90);
// cx.quadraticCurveTo(60,10,90,90);
// cx.lineTo(60,10);
// cx.closePath();
// cx.stroke();


// cx.beginPath();
// cx.moveTo(10,90);
// cx.bezierCurveTo(10,10,90,10,50,90);
// cx.lineTo(90,10);
// cx.lineTo(10,10);
// cx.closePath();
// cx.stroke();


// cx.beginPath();
// cx.moveTo(10,10);
// cx.arcTo(90,10,90,90,20);
// cx.moveTo(10,10);
// cx.arcTo(90,10,90,90,80);
// cx.stroke();


// cx.beginPath();
// cx.arc(50,50,40,0,7);
// cx.arc(150,50,40,0,0.5 * Math.PI);
// cx.stroke();



// var results = [
//   {name: "Satisfied", count: 1043, color: "lightblue"},
//   {name: "Neutral", count: 563, color: "lightgreen"},
//   {name: "Unsatisfied", count: 510, color: "pink"},
//   {name: "No comment", count: 175, color: "silver"}
// ];

// var total = results.reduce(function(sum, choice){
// 	return sum + choice.count;
// },0);

// var currentAngle = -0.5 * Math.PI;
// results.forEach(function(result){
// 	var sliceAngle = (result.count / total) * 2 * Math.PI;
// 	cx.beginPath();
// 	cx.arc(100,100,100, currentAngle, currentAngle + sliceAngle);
// 	currentAngle += sliceAngle;
// 	cx.lineTo(100,100);
// 	cx.fillStyle = result.color;
// 	cx.fill();
// });



// cx.font = "28px Georgia";
// cx.fillStyle = "fuchsia";
// cx.fillText("I can draw text, too!",10,50);



// var img = document.createElement("img");
// img.src = "http://eloquentjavascript.net/img/hat.png";
// img.addEventListener("load",function(){
// 	for(var x = 10; x < 200; x += 30)
// 		cx.drawImage(img,x,10);
// })



// var img = document.createElement("img");
// img.src = "http://eloquentjavascript.net/img/player.png";
// var spriteW = 24, spriteH = 30;
// img.addEventListener("load",function(){
// 	var cycle = 0;
// 	setInterval(function(){
// 		cx.clearRect(0,0,spriteW,spriteH);
// 		cx.drawImage(img,cycle * spriteW, 0, spriteW,spriteH,0,0,spriteW,spriteH);
// 		cycle = (cycle + 1) % 8;
// 	},120);
// 	flipHorizontally(cx,100 + spriteW / 2);
// 	cx.drawImage(img, 0,0,spriteW,spriteH,
// 				100,0,spriteW, spriteH);
// });

// function flipHorizontally(context,around){
// 	context.translate(around,0);
// 	context.scale(-1,1);
// 	context.translate(-around,0);
// }




// cx.scale(3, .5);
// cx.beginPath();
// cx.arc(50,50,40,0,7);
// cx.lineWidth = 3;
// cx.stroke();



function branch(length,angle, scale){
	cx.fillRect(0,0,1,length);
	if(length < 8) return;
	cx.save();
	cx.translate(0,length);
	cx.rotate(-angle);
	branch(length * scale, angle, scale);
	cx.rotate(2 * angle);
	branch(length * scale, angle, scale);
	cx.restore();
}
cx.translate(300,0);
branch(60,0.5,0.8);