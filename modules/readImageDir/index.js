var path = require('path'),
	fs    = require("fs");

module.exports = function() {
	var files = fs.readdirSync("./public/photos/show_thumb/"),
		photos = new Array();

	for(var i in files) {
	   if(path.extname(files[i]) === ".JPG") {
			photos.push( {
				image : "./photos/show_thumb/" + files[i]
				//thumb : "./photos/pre_thumb/" + files[i]
			})
		}
	}
	return photos
};