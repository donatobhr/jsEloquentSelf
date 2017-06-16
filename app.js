//Chap_20


// console.log([-1,-2,-3].map(Math.abs));


// console.log(process.argv[2]);


// var garble = require("./garble");
// var argument = process.argv[2];
// console.log(garble(argument));

// var figlet = require("figlet");
// var text = process.argv[2];
// figlet.text(text, 'Graffiti',function(error, data){
// 	if(error)
// 		console.error(error);
// 	else
// 		if(text == undefined)
// 			figlet.text("the argument",function(error,data){
// 				if(error)
// 					console.log(error);
// 				else
// 					console.log(data);
// 			});
// 		else
// 			console.log(data);
// });

// var fs = require("fs");
// fs.readFile("garble.js", "utf8", function(error,text){
// 	if(error)
// 		throw error;
// 	console.log("the file contained:", text);
// });

// fs.readFile("garble.js", function(error,buffer){
// 	if(error)
// 		throw error;
// 	console.log("the file contained", buffer.length, "bytes.", "the first byte is:", buffer[0]);
// });


// fs.writeFile("prueba.txt", "Node was here", function(err){
// 	if(err)
// 		console.log("Failed to write file:", err);
// 	else
// 		console.log("File written.")
// });

// fs.readdir("./",function(err,arr){
// 	if(err)
// 		console.log("Failed to read the dir:", err)
// 	else
// 		console.log(arr);
// });


// var http = require("http");
// var server = http.createServer(function(request, response){
// 	response.writeHead(200,{"Content-Type":"text/html"});
// 	response.write("<h1>Hello</h1><p>you asked for <code>" + request.url + "</code></p>");
// 	response.end();
// });
// server.listen(8000);


// var request = http.request({
// 	hostname: "eloquentjavascript.net",
// 	path: "/20_node.html",
// 	method: "GET",
// 	headers: {Accept: "text/html"}
// }, function(response){
// 	console.log("Server responded with status code", response.statusCode, response.statusMessage);
// });
// request.end();

// var request = http.request({
// 	hostname: "localhost",
// 	port: 8000,
// 	method: "POST"
// }, function(response){
// 	response.on("data",function(chuck){
// 		process.stdout.write(chunk.toString());
// 	});
// });
// request.end("Hello server");


// fs.readFile("index.html", "utf8", function(error,text){
// 	if(error)
// 		throw error;
// 	var request = http.request({
// 	  hostname: "localhost",
// 	  port: 8000,
// 	  method: "POST"
// 	}, function(response) {
// 	  response.on("data", function(chunk) {
// 	    process.stdout.write(chunk.toString());
// 	  });
// 	});
// 	request.end(text);
// });


// var request = http.request({
//   hostname: "localhost",
//   port: 8000,
//   method: "POST"
// }, function(response) {
//   response.on("data", function(chunk) {
//     process.stdout.write(chunk.toString());
//   });
// });
// request.end("Hello world \n");



//FILE SYSTEM
// var http = require("http"), fs = require("fs");

// var methods = Object.create(null);

// http.createServer(function(request,response){
// 	function respond(code,body,type){
// 		if(!type) type = "text/plain";
// 		response.writeHead(code, {"Content-Type": type});
// 		if(body && body.pipe)
// 			body.pipe(response);
// 		else
// 			response.end(body);
// 	}

// 	if(request.method in methods)
// 		methods[request.method](urlToPath(request.url),respond,request)
// 	else
// 		respond(405, "Method " + request.method + " not allowed.");
// }).listen(8000);

// function urlToPath(url){
// 	var path = require("url").parse(url).pathname;
// 	var decoded = decodeURIComponent(path);
// 	return "." + decoded.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
// }

// methods.GET = function(path, respond){
// 	fs.stat(path, function(error,stats){
		
// 		if(error && error.code == "ENOENT")
// 			respond(404,"File not found");
// 		else if(error)
// 			respond(500, error.toString());
// 		else if(stats.isDirectory())
// 			fs.readdir(path, function(error,files){
// 				if(error)
// 					respond(500,error.toString());
// 				else
// 					respond(200, files.join("\n"));
// 			});
// 		else
// 			respond(200, fs.createReadStream(path), require("mime").lookup(path));
// 	});
// }

// methods.DELETE = function(path, respond){
// 	fs.stat(path, function(error,stats){
// 		if(error && error.code == "ENOENT")
// 			respond(204);
// 		else if(error)
// 			respond(500, error.toString());
// 		else if(stats.isDirectory())
// 			fs.rmdir(path, respondErrorOrNothing(respond));
// 		else
// 			fs.unlink(path, respondErrorOrNothing(respond));
// 	});
// }

// function respondErrorOrNothing(respond){
// 	return function(error){
// 		if(error)
// 			respond(500, error.toString());
// 		else
// 			respond(204);
// 	};
// };


// methods.PUT = function(path,respond,request){
// 	var outStream = fs.createWriteStream(path);
// 	outStream.on("error",function(error){
// 		respond(500,error.toString());
// 	});

// 	outStream.on("finish",function(){
// 		respond(204);
// 	});
// 	request.pipe(outStream);
// }



//Ejercicio 1
// var http = require("http");

// function readStreamAsString(stream, callback){
// 	var content = "";
// 	stream.on("data",function(chunk){
// 		content += chunk;
// 	});	

// 	stream.on("end",function(){
// 		callback(null,content);
// 	});

// 	stream.on("error",function(){
// 		callback(error);
// 	});
// }

// ["text/plain","text/html","application/json", "image/png", "application/rainbows+unicorns"].forEach(function(type){
// 	http.request({
// 		hostname: "eloquentjavascript.net",
// 		path: "/author",
// 		headers: {Accept: type}
// 	},function(response){
// 		if(response.statusCode != 200){
// 			console.error("Request for " + type + " failed: " + response.statusMessage);
// 			return;
// 		}

// 		readStreamAsString(response, function(error,content){
// 			if(error) throw error;
// 			console.log("Type " + type + ": " + content);
// 		});
// 	}).end();
// });


//Ejericio 3 para el FILE SYSTEM
// methods.MKCOL = function(path,respond){
// 	fs.stat(path, function(error,stats){
// 		if(error && error.code == "ENOENT")
// 			fs.mkdir(path, respondErrorOrNothing(respond));
// 		else if(error)
// 			respond(500, error.toString());
// 		else if(stats.isDirectory())
// 			respond(204);
// 		else
// 			respond(400, "File exists");
// 	});
// };



