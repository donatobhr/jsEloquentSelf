// chap_17
// var req = new XMLHttpRequest();
// req.open("GET", "http://jsonplaceholder.typicode.com/posts?userId=1",true);
// req.addEventListener("load",function(){
// 	if(req.status == 200){
// 		console.log(req.responseText);
// 	}
// })
// req.send(null);




function get(url){
	return new Promise(function(succeed, fail){
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load",function(){
			if(req.status < 400)
				succeed(req.responseText);
			else
				fail(new Error("Request failed: " + req.statusText));
		});

		req.addEventListener("error",function(){
			fail(new Error("Network error"));
		});
		req.send(null);
	});
}

function getJSON(url){
	return get(url).then(JSON.parse);
}

// get("http://jsonplaceholder.typicode.com/posts?userId=1").then(function(text){
// 	console.log(text);
// }, function(error){
// 	console.log("Failed to fetch: " + error);
// });

// function showMessage(msg){
// 	var elt = document.createElement("div");
// 	elt.textContent = msg;
// 	return document.body.appendChild(elt);
// }

// var loading = showMessage("Loading...");

// getJSON("http://jsonplaceholder.typicode.com/posts/1").then(function(post){
// 	return getJSON("https://jsonplaceholder.typicode.com/posts?userId"+post.userID);
// }).then(function(userId){
// 	showMessage(userId[0].userId);
// }).catch(function(error){
// 	showMessage(String(error));
// }).then(function(){
// 	document.body.removeChild(loading);
// });



//Ejercicio 1

function requestAuthor(type){
	var req = new XMLHttpRequest();
	req.open("GET","http://eloquentjavascript.net/author",true);
	req.setRequestHeader("accept", type);
	req.addEventListener("load",function(){
		console.log(req.responseText);
	});
	
	req.send(null);
}
// requestAuthor("application/rainbows+unicorns");


function all(promises){
	return new Promise(function(succeed, fail){
		var results = [], pending = promises.length;
		promises.forEach(function(promise, i){
			promise.then(function(result){
				results[i] = result;
				pending -= 1;
				if(pending == 0)
					succeed(results);
			},function(error){
				fail(error);
			});
		});
		if(promises.length == 0)
			succeed(results);
	});
}


all([]).then(function(array){
	console.log("This should be []:", array);
});

function soon(val){
	return new Promise(function(success){
		setTimeout(function(){success(val);},
			Math.random() * 500);
	});
}

all([soon(1), soon(2), soon(3)]).then(function(array){
	console.log("This should be [1,2,3]:", array);
});

function fail(){
	return new Promise(function(success,fail){
		fail(new Error("boom"));
	});
}

all([soon(1), fail(2), soon(3)]).then(function(array){
	console.log("We should not get here");
}, function(error){
	if(error.message != "boom")
		console.log("Unexpected failure:", error);
});