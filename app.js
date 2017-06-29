//Chap_21
/*
The ecstatic module exports a function 
that can be called with a configuration 
object to produce a request handler function. 
We use the root option to tell the server 
where it should look for files.
*/

var http = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");

var fileServer = ecstatic({root: "./public"});
var router = new Router();

http.createServer(function(request,response){
	if(!router.resolve(request,response))
		fileServer(request,response);
}).listen(8000);


/*
The respond and respondJSON helper functions 
are used throughout the server code to send 
off responses with a single function call.
*/
function respond(response,status,data,type){
	response.writeHead(status,{
		"Content-Type": type || "text/plain"
	});
	response.end(data);
}

function respondJSON(response,status,data){
	respond(response,status,JSON.stringify(data),"application/json");
}

/*
The server keeps the talks that have been 
proposed in an object called talks,
These will be exposed as HTTP resources 
under /talks/[title]
*/

var talks = Object.create(null);


/*
The handler for requests that GET a single talk 
must look up the talk and respond either with 
the talk’s JSON data or with a 404 error response.
*/
router.add("GET",/^\/talks\/([^\/]+)$/,function(request, response, title){
	if(title in talks)
		respondJSON(response,200,talks[title]);
	else
		respond(respond, 404, "No talk '" + title + "' found");
});


//Deleting a talk is done by removing it from the talks object.
router.add("DELETE",/^\/talks\/([^\/]+)$/,function(request,response,title){
	if(title in talks){
		delete talks[title];
		registerChange(title);
	}
	respond(response,204,null);
});


/*
To retrieve the content of JSON-encoded request bodies, 
we define a function called readStreamAsJSON, which reads 
all content from a stream, parses it as JSON, and then calls 
a callback function.
*/
function readStreamAsJson(stream, callback){
	var data = "";
	stream.on("data",function(chunck){
		data += chunck;
	});

	stream.on("end",function(){
		var result, error;
		try{result = JSON.parse(data);}
		catch(e){error = e};
		callback(error,result);
	});

	stream.on("error",function(error){
		callback(error);
	})
}


router.add("PUT",/^\/talks\/([^\/]+)$/,function(request,response,title){
	readStreamAsJson(request,function(error,talk){
		if(error){
			respond(response, 400, error.toString());
		}else if(!talk || typeof talk.presenter != "string" ||
				typeof talk.summary != "string"){
			respond(response, 400 , "Bad talk data");
		}else{
			talks[title] = {
				title: title,
				presenter: talk.presenter,
				summary: talk.summary,
				comments: []
			};
			registerChange(title);
			respond(response,204,null);
		}
	});
});


router.add("POST", /^\/talks\/([^\/]+)\/comments$/, function(request,response,title){
	readStreamAsJson(request, function(error,comment){
		if(error){
			respond(response, 400, error.toString());
		}else if(!comment || typeof comment.author != "string" ||
				typeof comment.message != "string"){
			respond(response, 400, "Bad comment data");
		}else if(title in talks){
			talks[title].comments.push(comment);
			registerChange(title);
			respond(response, 204, null);
		}else{
			respond(response, 404, "No talk '" + title + "' found");
		}
	});
});


function sendTalks(talks, response){
	respondJSON(response, 200, {
		serverTime: Date.now(),
		talks: talks
	});
}


router.add("GET", /^\/talks$/,function(request, response){
	var query = require("url").parse(request.url, true).query;
	if(query.changesSince == null){
		var list = [];
		for(var title in talks)
			list.push(talks[title]);
		sendTalks(list, response);
	}else{
		var since = Number(query.changesSince);
		if(isNaN(since)){
			respond(response, 400, "Invalid parameter");
		}else{
			var changed = getChangedTalks(since);
			if(changed.length > 0)
				sendTalks(changed, response);
			else
				waitForChanges(since,response);
		}
	}
});


var waiting = [];

function waitForChanges(since, response){
	var waiter = {since: since, response: response};
	waiting.push(waiter);
	setTimeout(function(){
		var found = waiting.indexOf(waiter);
		if(found > -1){
			waiting.splice(found,1);
			sendTalks([], response);
		}
	}, 90 * 1000);
}

var changes = [];

function registerChange(title){
	changes.push({title: title, time: Date.now()});
	waiting.forEach(function(waiter){
		sendTalks(getChangedTalks(waiter.since), waiter.response);
	});
	waiting = [];
}

function getChangedTalks(since){
	var found = [];

	function alreadySeen(title){
		return found.some(function(f){return f.title == title;});
	}

	for(var i = changes.length - 1; i >= 0; i--){
		var change = changes[i];
		if(change.time <= since)
			break;
		else if(alreadySeen(change.title))
			continue;
		else if(change.title in talks)
			found.push(talks[change.title]);
		else
			found.push({title: change.title, delete: true});
	}
	return found;
}