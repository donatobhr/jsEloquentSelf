module.exports = function(string){
	return string.split("").map(function(ch){
		return String.fromCharCode(ch.charCodeAt(0) + 5);
	}).join("");
}