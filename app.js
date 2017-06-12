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

function flipHorizontally(context,around){
	context.translate(around,0);
	context.scale(-1,1);
	context.translate(-around,0);
}




// cx.scale(3, .5);
// cx.beginPath();
// cx.arc(50,50,40,0,7);
// cx.lineWidth = 3;
// cx.stroke();



// function branch(length,angle, scale){
// 	cx.fillRect(0,0,1,length);
// 	if(length < 8) return;
// 	cx.save();
// 	cx.translate(0,length);
// 	cx.rotate(-angle);
// 	branch(length * scale, angle, scale);
// 	cx.rotate(2 * angle);
// 	branch(length * scale, angle, scale);
// 	cx.restore();
// }
// cx.translate(300,0);
// branch(60,0.5,0.8);




//Previus game

function Level(plan){
	this.width = plan[0].length;
	this.height = plan.length;
	this.grid = [];
	this.actors = [];

	for(var y = 0; y < this.height; y++){
		var line = plan[y], gridLine = [];
		for(var x = 0; x < this.width; x++){
			var ch = line[x], fieldType = null;
			var Actor = actorChars[ch];
			if(Actor)
				this.actors.push(new Actor(new Vector(x,y), ch));
			else if (ch == "x")
				fieldType = "wall";
			else if (ch == "!")
				fieldType = "lava";

			gridLine.push(fieldType);
		}
		this.grid.push(gridLine);
	}

	this.player = this.actors.filter(function(actor){
		return actor.type == "player";
	})[0];
	this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function(){
	return this.status != null && this.finishDelay < 0;
}

Level.prototype.obstacleAt = function(pos,size){
	var xStart = Math.floor(pos.x);
	var xEnd = Math.ceil(pos.x + size.x);
	var yStart = Math.floor(pos.y);
	var yEnd = Math.ceil(pos.y + size.y);

	if(xStart < 0 || xEnd > this.width || yStart < 0)
		return "wall";
	if(yEnd > this.height)
		return "lava";

	for(var y = yStart; y < yEnd; y++){
		for(var x = xStart; x < xEnd; x++){
			var fieldType = this.grid[y][x];
			if(fieldType) return fieldType;
		}
	}
}

Level.prototype.actorAt = function(actor){
	for(var i = 0; i < this.actors.length; i++){
		var other = this.actors[i];
		if(other != actor &&
		   actor.pos.x + actor.size.x > other.pos.x &&
		   actor.pos.x < other.pos.x + other.size.x &&
		   actor.pos.y + other.size.y > other.pos.y &&
		   actor.pos.y < other.pos.y + other.size.y)
		return other;
	};
}

var maxStep = 0.05;

Level.prototype.animate = function(step, keys){
	if(this.status != null)
		this.finishDelay -= step;

	while(step > 0){
		var thisStep = Math.min(step,maxStep);
		this.actors.forEach(function(actor){
			actor.act(thisStep, this, keys);
		},this);
		step -= thisStep;
	}
}

Level.prototype.playerTouched = function(type, actor){
	if(type == "lava" && this.status == null){
		this.status = "lost";
		this.finishDelay = 1;
	}else if(type == "coin"){
		this.actors = this.actors.filter(function(other){
			return other != actor;
		});
		if(!this.actors.some(function(actor){
			return actor.type == "coin";
		})){
			this.status = "won";
			this.finishDelay = 1;
		}
	}
}

var actorChars = {
	"@": Player,
	"o": Coin,
	"=": Lava,
	"|": Lava,
	"v": Lava
};

function Player(pos){
	this.pos = pos.plus(new Vector(0, -0.5));
	this.size = new Vector(0.8, 1.5);
	this.speed = new Vector(0,0);
};

Player.prototype.type = "player";

var playerXSpeed = 7;

Player.prototype.moveX = function(step,level, keys){
	this.speed.x = 0;
	if(keys.left) this.speed.x -= playerXSpeed;
	if(keys.right) this.speed.x += playerXSpeed;

	var motion = new Vector(this.speed.x * step, 0);
	var newPos = this.pos.plus(motion);
	var obstacle = level.obstacleAt(newPos, this.size);
	if(obstacle)
		level.playerTouched(obstacle);
	else
		this.pos = newPos;
};


var gravity = 10;
var jumpSpeed = 17;

Player.prototype.moveY = function(step,level,keys){
	this.speed.y += step * gravity;
	var motion = new Vector(0, this.speed.y * step);
	var newPos = this.pos.plus(motion);
	var obstacle = level.obstacleAt(newPos, this.size);
	if(obstacle){
		level.playerTouched(obstacle);
		if(keys.up && this.speed.y > 0)
			this.speed.y = -jumpSpeed;
		else
			this.speed.y = 0; 
	}else{
		this.pos = newPos;
	}
};


Player.prototype.act = function(step,level,keys){
	this.moveX(step,level,keys);
	this.moveY(step,level,keys);

	var otherActor = level.actorAt(this);
	if(otherActor)
		level.playerTouched(otherActor.type, otherActor);

	if(level.status == "lost"){
		this.pos.y += step;
		this.size.y -= step;
	}
};


function Lava(pos,ch){
	this.pos = pos;
	this.size = new Vector(1,1);
	if(ch == "="){
		this.speed = new Vector(2,0);
	}else if(ch == "|"){
		this.speed = new Vector(0,2);
	}else if(ch == "v"){
		this.speed = new Vector(0,3);
		this.repeatPos =pos;
	}
};

Lava.prototype.type = "lava";

Lava.prototype.act = function(step, level){
	var newPos = this.pos.plus(this.speed.times(step));
	if(!level.obstacleAt(newPos, this.size))
		this.pos = newPos;
	else if(this.repeatPos)
		this.pos = this.repeatPos;
	else
		this.speed = this.speed.times(-1);
}

function Coin(pos){
	this.basePos = this.pos = pos.plus(new Vector(0.2,0.1));
	this.size = new Vector(0.6, 0.6);
	this.wobble = Math.random() * Math.PI * 2;
};

Coin.prototype.type = "coin";

var wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.act = function(step){
	this.wobble += step * wobbleSpeed;
	var wobblePos = Math.sin(this.wobble) * wobbleDist;
	this.pos = this.basePos.plus(new Vector(0, wobblePos));
}

function elt(name, className){
	var elt = document.createElement(name);
	if(className) elt.className = className;
	return elt;
}

function DOMDisplay(parent, level){
	this.wrap = parent.appendChild(elt("div","game"));
	this.level = level;
	this.wrap.appendChild(this.drawBackground());
	this.actorLayer = null;
	this.drawFrame();
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function(){
	var table = elt("table", "background");
	table.style.width = this.level.width * 20 + "px";
	this.level.grid.forEach(function(row){
		var rowElt = table.appendChild(elt("tr"));
		rowElt.style.height = scale + "px";
		row.forEach(function(type){
			rowElt.appendChild(elt("td", type));
		});
	});
	return table;
}

DOMDisplay.prototype.drawActors = function(){
	var wrap = elt("div");
	this.level.actors.forEach(function(actor){
		var rect = wrap.appendChild(elt("div", "actor " + actor.type));
		rect.style.width = actor.size.x * scale + "px";
		rect.style.height = actor.size.y * scale + "px";
		rect.style.left = actor.pos.x * scale + "px";
		rect.style.top = actor.pos.y * scale + "px";
 	});
	return wrap;
}

DOMDisplay.prototype.drawFrame = function(){
	if(this.actorLayer)
		this.wrap.removeChild(this.actorLayer);
	this.actorLayer = this.wrap.appendChild(this.drawActors());
	this.wrap.className = "game " + (this.level.status || "");
	this.scrollPlayerIntoView();
}


DOMDisplay.prototype.scrollPlayerIntoView = function(){
	var width = this.wrap.clientWidth;
	var height = this.wrap.clientHeight;
	var margin = width / 3;

	//The viewport
	var left = this.wrap.scrollLeft, right = left + width;
	var top = this.wrap.scrollTop, bottom = top + height;
	var player = this.level.player;
	var center = player.pos.plus(player.size.times(0,5)).times(scale);

	if(center.x < left + margin)
		this.wrap.scrollLeft = center.x - margin;
	else if(center.x > right - margin)
		this.wrap.scrollLeft = center.x + margin - width;

	if(center.y < top + margin)
		this.wrap.scrollTop = center.y - margin;
	else if(center.y > bottom - margin)
		this.wrap.scrollTop = center.y + margin - height;
}


DOMDisplay.prototype.clear = function(){
	this.wrap.parentNode.removeChild(this.wrap);
}


function Vector(x,y){
	this.x = x; this.y = y;
}

Vector.prototype.plus = function(other){
	return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.times = function(factor){
	return new Vector(this.x * factor, this.y * factor);
};

var arrowCodes = {
	37: "left",
	38: "up",
	39: "right",
	27: "esc"
};

function trackKey(codes){
    var pressed = Object.create(null);
    function handler(event) {
      if (codes.hasOwnProperty(event.keyCode)) {
        var state = event.type == "keydown";
        pressed[codes[event.keyCode]] = state;
        event.preventDefault();
      }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);

    // This is new -- it allows runLevel to clean up its handlers
    pressed.unregister = function() {
      removeEventListener("keydown", handler);
      removeEventListener("keyup", handler);
    };
    // End of new code
    return pressed;
}


function runAnimation(frameFunc){
	var lastTime = null;
	function frame(time){
		var stop = false;
		if(lastTime != null){
			var timeStep = Math.min(time - lastTime, 100) / 1000;
			stop = frameFunc(timeStep) === false;
		}
		lastTime = time;
		if(!stop)
			requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}

var arrows = trackKey(arrowCodes);

function runLevel(level,Display, andThen){
    var display = new Display(document.body, level);
    var running = "yes";
    function handleKey(event) {
      if (event.keyCode == 27) {
        if (running == "no") {
          running = "yes";
          runAnimation(animation);
        } else if (running == "pausing") {
          running = "yes";
        } else if (running == "yes") {
          running = "pausing";
        }
      }
    }
    addEventListener("keydown", handleKey);
    var arrows = trackKey(arrowCodes);

    function animation(step) {
      if (running == "pausing") {
        running = "no";
        return false;
      }

      level.animate(step, arrows);
      display.drawFrame(step);
      if (level.isFinished()) {
        display.clear();
        // Here we remove all our event handlers
        removeEventListener("keydown", handleKey);
        arrows.unregister(); // (see change to trackKeys below)
        if (andThen)
          andThen(level.status);
        return false;
      }
    }
    runAnimation(animation);
}

function runGame(plans, Display){
	function startLevel(n, lives){
		runLevel(new Level(plans[n]), Display, function(status){
			if(status == "lost")
				if(lives > 0){
					startLevel(n, lives - 1);
				}else{
					console.log("game over");
					startLevel(0,2);
				}
			else if(n < plans.length - 1)
				startLevel(n + 1, lives);
			else
				console.log("You win");
		});
	}
	startLevel(0, 2);
}

var GAME_LEVELS = [
  ["                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                  xxx           ",
   "                                                   xx      xx    xx!xx          ",
   "                                    o o      xx                  x!!!x          ",
   "                                                                 xx!xx          ",
   "                                   xxxxx                          xvx           ",
   "                                                                            xx  ",
   "  xx                                      o o                                x  ",
   "  x                     o                                                    x  ",
   "  x                                      xxxxx                             o x  ",
   "  x          xxxx       o                                                    x  ",
   "  x  @       x  x                                                xxxxx       x  ",
   "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ",
   "                              x   x                  x     x                    ",
   "                              x!!!x                  x!!!!!x                    ",
   "                              x!!!x                  x!!!!!x                    ",
   "                              xxxxx                  xxxxxxx                    ",
   "                                                                                ",
   "                                                                                "],
  ["                                      x!!x                        xxxxxxx                                    x!x  ",
   "                                      x!!x                     xxxx     xxxx                                 x!x  ",
   "                                      x!!xxxxxxxxxx           xx           xx                                x!x  ",
   "                                      xx!!!!!!!!!!xx         xx             xx                               x!x  ",
   "                                       xxxxxxxxxx!!x         x                                    o   o   o  x!x  ",
   "                                                xx!x         x     o   o                                    xx!x  ",
   "                                                 x!x         x                                xxxxxxxxxxxxxxx!!x  ",
   "                                                 xvx         x     x   x                        !!!!!!!!!!!!!!xx  ",
   "                                                             xx  |   |   |  xx            xxxxxxxxxxxxxxxxxxxxx   ",
   "                                                              xx!!!!!!!!!!!xx            v                        ",
   "                                                               xxxx!!!!!xxxx                                      ",
   "                                               x     x            xxxxxxx        xxx         xxx                  ",
   "                                               x     x                           x x         x x                  ",
   "                                               x     x                             x         x                    ",
   "                                               x     x                             xx        x                    ",
   "                                               xx    x                             x         x                    ",
   "                                               x     x      o  o     x   x         x         x                    ",
   "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ",
   "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ",
   "             xx       xx        x o x          x    xx               x   x   x               x                    ",
   "     @       x         x        x   x          x     x               x   x   x               x                    ",
   "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ",
   "    x x      x         x       xx o xx         x     x               x     o     x x         x                    ",
   "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!     x     =     x x         x                    ",
   "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!     xxxxxxxxxxxxx xx  o o  xx                    ",
   "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                    xx     xx                     ",
   "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                     xxxxxxx                      ",
   "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                                  ",
   "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                  ",
   "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                  "],
  ["                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                        o                                                                     ",
   "                                                                                                              ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                        x                                                                     ",
   "                                       xxx                                                                    ",
   "                                       x x                 !!!        !!!  xxx                                ",
   "                                       x x                 !x!        !x!                                     ",
   "                                     xxx xxx                x          x                                      ",
   "                                      x   x                 x   oooo   x       xxx                            ",
   "                                      x   x                 x          x      x!!!x                           ",
   "                                      x   x                 xxxxxxxxxxxx       xxx                            ",
   "                                     xx   xx      x   x      x                                                ",
   "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ",
   "                                      x   x           x                    x!!!x                              ",
   "                                      x   x           x                     xxx                               ",
   "                                     xx   xx          x                                                       ",
   "                                      x   x= = = =    x            xxx                                        ",
   "                                      x   x           x           x!!!x                                       ",
   "                                      x   x    = = = =x     o      xxx       xxx                              ",
   "                                     xx   xx          x                     x!!!x                             ",
   "                              o   o   x   x           x     x                xxv        xxx                   ",
   "                                      x   x           x              x                 x!!!x                  ",
   "                             xxx xxx xxx xxx     o o  x!!!!!!!!!!!!!!x                   vx                   ",
   "                             x xxx x x xxx x          x!!!!!!!!!!!!!!x                                        ",
   "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ",
   "                             xx           xx                                         xxx                      ",
   "  xxx                         x     x     x                                         x!!!x                xxx  ",
   "  x x                         x    xxx    x                                          xxx                 x x  ",
   "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ",
   "  x                           x           x                              x   x                             x  ",
   "  x                           xx          x                              x x x                             x  ",
   "  x                                       x       |xxxx|    |xxxx|     xxx xxx                             x  ",
   "  x                xxx             o o    x                              x         xxx                     x  ",
   "  x               xxxxx       xx          x                             xxx       x!!!x          x         x  ",
   "  x               oxxxo       x    xxx    x                             x x        xxx          xxx        x  ",
   "  x                xxx        xxxxxxxxxxxxx  x oo x    x oo x    x oo  xx xx                    xxx        x  ",
   "  x      @          x         x           x!!x    x!!!!x    x!!!!x    xx   xx                    x         x  ",
   "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ",
   "                                                                                                              ",
   "                                                                                                              "],
  ["                                                                                                  xxx x       ",
   "                                                                                                      x       ",
   "                                                                                                  xxxxx       ",
   "                                                                                                  x           ",
   "                                                                                                  x xxx       ",
   "                          o                                                                       x x x       ",
   "                                                                                             o o oxxx x       ",
   "                   xxx                                                                                x       ",
   "       !  o  !                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ",
   "       x     x                                                x   x x   x x   x x   x x   x x   x x           ",
   "       x= o  x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ",
   "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ",
   "       !  o  !            o                                  xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ",
   "                                                                                                              ",
   "          o              xxx                              xx                                                  ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                      xx                                                      ",
   "                   xxx         xxx                                                                            ",
   "                                                                                                              ",
   "                          o                                                     x      x                      ",
   "                                                          xx     xx                                           ",
   "             xxx         xxx         xxx                                 x                  x                 ",
   "                                                                                                              ",
   "                                                                 ||                                           ",
   "  xxxxxxxxxxx                                                                                                 ",
   "  x         x o xxxxxxxxx o xxxxxxxxx o xx                                                x                   ",
   "  x         x   x       x   x       x   x                 ||                  x     x                         ",
   "  x  @      xxxxx   o   xxxxx   o   xxxxx                                                                     ",
   "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ",
   "        x=                  =                =x   x                     xxx                                   ",
   "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   x!!!!!!!!!!!!!!!!!!!!!xxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   "                                                                                                              "]
];


function CanvasDisplay(parent, level) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = Math.min(600, level.width * scale);
  this.canvas.height = Math.min(450, level.height * scale);
  parent.appendChild(this.canvas);
  this.cx = this.canvas.getContext("2d");

  this.level = level;
  this.animationTime = 0;
  this.flipPlayer = false;

  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  };

  this.drawFrame(0);
}

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas);
};


CanvasDisplay.prototype.drawFrame = function(step){
	this.animationTime += step;
	this.updateViewport();
	this.clearDisplay();
	this.drawBackground();
	this.drawActors();
}

CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport, margin = view.width / 3;
  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5));

  if (center.x < view.left + margin)
    view.left = Math.max(center.x - margin, 0);
  else if (center.x > view.left + view.width - margin)
    view.left = Math.min(center.x + margin - view.width,
                         this.level.width - view.width);
  if (center.y < view.top + margin)
    view.top = Math.max(center.y - margin, 0);
  else if (center.y > view.top + view.height - margin)
    view.top = Math.min(center.y + margin - view.height,
                        this.level.height - view.height);
};


CanvasDisplay.prototype.clearDisplay = function() {
  if (this.level.status == "won")
    this.cx.fillStyle = "rgb(68, 191, 255)";
  else if (this.level.status == "lost")
    this.cx.fillStyle = "rgb(44, 136, 214)";
  else
    this.cx.fillStyle = "rgb(52, 166, 251)";
  this.cx.fillRect(0, 0,
                   this.canvas.width, this.canvas.height);
};

var otherSprites = document.createElement("img");
otherSprites.src = "http://eloquentjavascript.net/img/sprites.png";

CanvasDisplay.prototype.drawBackground = function() {
  var view = this.viewport;
  var xStart = Math.floor(view.left);
  var xEnd = Math.ceil(view.left + view.width);
  var yStart = Math.floor(view.top);
  var yEnd = Math.ceil(view.top + view.height);

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var tile = this.level.grid[y][x];
      if (tile == null) continue;
      var screenX = (x - view.left) * scale;
      var screenY = (y - view.top) * scale;
      var tileX = tile == "lava" ? scale : 0;
      this.cx.drawImage(otherSprites,
                        tileX,         0, scale, scale,
                        screenX, screenY, scale, scale);
    }
  }
};

var playerSprites = document.createElement("img");
playerSprites.src = "http://eloquentjavascript.net/img/player.png";
var playerXOverlap = 4;

CanvasDisplay.prototype.drawPlayer = function(x, y, width,
                                              height) {
  var sprite = 8, player = this.level.player;
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x != 0)
    this.flipPlayer = player.speed.x < 0;

  if (player.speed.y != 0)
    sprite = 9;
  else if (player.speed.x != 0)
    sprite = Math.floor(this.animationTime * 12) % 8;

  this.cx.save();
  if (this.flipPlayer)
    flipHorizontally(this.cx, x + width / 2);

  this.cx.drawImage(playerSprites,
                    sprite * width, 0, width, height,
                    x,              y, width, height);

  this.cx.restore();
};

CanvasDisplay.prototype.drawActors = function(){
	this.level.actors.forEach(function(actor){
		var width = actor.size.x * scale;
		var height = actor.size.y * scale;
		var x = (actor.pos.x - this.viewport.left) * scale;
		var y = (actor.pos.y - this.viewport.top) * scale;
		if(actor.type == "player"){
			this.drawPlayer(x,y,width,height);
		}else{
			var tileX = (actor.type == "coin" ? 2 : 1) * scale;
			this.cx.drawImage(otherSprites,
							  tileX, 0, width, height,
							  x,y,width,height);
		}
	}, this);
}
// runGame(GAME_LEVELS, CanvasDisplay);


//Ejercicio 1

function parallelogram(x,y){
	cx.beginPath();
	cx.moveTo(x,y);
	cx.lineTo(x + 50, y);
	cx.lineTo(x + 70, y + 50);
	cx.lineTo(x - 20, y + 50);
	cx.closePath();
	cx.stroke();
}

// parallelogram(30,40);

function diamond(x,y){
	cx.translate(x + 30, y + 30);
	cx.rotate(Math.PI / 4);
	cx.fillStyle = "red";
	cx.fillRect(-30,-30,60,60);
	cx.resetTransform();
}

// diamond(140,40);

function zigzag(x,y){
	cx.beginPath();
	cx.moveTo(x,y);
	for(var i = 0; i < 8; i++){
		cx.lineTo(x + 80, y + i * 8 + 4);
		cx.lineTo(x, y + i * 8 + 8);
	}
	cx.stroke();
}

// zigzag(240,40);

function spiral(x,y){
	var radius = 50, xCenter = x + radius, yCenter = y + radius;
	cx.beginPath();
	cx.moveTo(xCenter, yCenter);
	for(var i = 0; i < 300; i++){
		var angle = i * Math.PI / 30;
		var dist = radius * i / 300;
		cx.lineTo(xCenter + Math.cos(angle) * dist,
				  yCenter + Math.sin(angle) * dist);
	}
	cx.stroke();
}

// spiral(340, 20);


function start(x,y){
	var radius = 50, xCenter = x + radius, yCenter = y + radius;
	cx.beginPath();
	cx.moveTo(xCenter + radius, yCenter);
	for(var i = 1; i <= 8; i++){
		var angle = i * Math.PI / 4;
		cx.quadraticCurveTo(xCenter, yCenter,
							xCenter + Math.cos(angle) * radius,
							yCenter + Math.sin(angle) * radius);
	}
	cx.fillStyle = "gold";
	cx.fill();
}
// start(460, 20);



//Ejercicio 2

var results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

var total = results.reduce(function(sum, choice){
	return sum + choice.count;
},0);

// var currentAngle = -0.5 * Math.PI;
// var centerX = 300, centerY = 150;

// results.forEach(function(result){
// 	var sliceAngle = (result.count / total) * 2 * Math.PI;
// 	cx.beginPath();
// 	cx.arc(centerX,centerY,100, currentAngle, currentAngle + sliceAngle);
// 	var middleAngle = currentAngle + 0.5 * sliceAngle;
// 	var textX = Math.cos(middleAngle) * 120 + centerX;
// 	var textY = Math.sin(middleAngle) * 120 + centerY;
// 	cx.textBaseLine = "middle";

// 	if(Math.cos(middleAngle) > 0)
// 		cx.textAlign = "left";
// 	else
// 		cx.textAlign = "right";

// 	cx.font = "15px sans-serif";
// 	cx.fillStyle = "black";
// 	cx.fillText(result.name, textX, textY);

// 	currentAngle += sliceAngle;
// 	cx.lineTo(centerX, centerY);
// 	cx.fillStyle = result.color;
// 	cx.fill();
// });




//Ejercicio 3

var lastTime = null;

function frame(time){
	if(lastTime != null)
		updateAnimation(Math.min(100, time - lastTime) / 1000);
	lastTime = time;
	requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

var x = 100, y = 300;
var radius = 10;
var speedX = 100, speedY = 60;

function updateAnimation(step){
	cx.clearRect(0,0,400,400);
	cx.strokeStyle = "blue";
	cx.lineWidth = 4;
	cx.strokeRect(25, 25, 350, 350);

	x += step * speedX;
	y += step * speedY;

	if(x < 25 + radius || x > 375 - radius)
		speedX = -speedX;

	if(y < 25 + radius || y > 375 - radius)
		speedY = -speedY;

	cx.fillStyle = "red";
	cx.beginPath();
	cx.arc(x, y, radius, 0, 7);
	cx.fill();
}