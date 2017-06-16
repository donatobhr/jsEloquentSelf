var http = require("http");

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"text/plain"});
	request.on("data",function(chunck){
		response.write(chunck.toString().toUpperCase());
	});
	request.on("end",function(){
		response.end();
	});
});

server.listen(8000);