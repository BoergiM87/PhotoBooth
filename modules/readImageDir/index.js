var path = require('path'),
	fs    = require("fs");

module.exports = function(showThumbnailBar) {
	var files = fs.readdirSync("./public/photos/show_thumb/"),
		photos = new Array();

	for(var i in files) {
		if(path.extname(files[i]) === ".JPG") {
			var data;
			if (showThumbnailBar){
				data = {
					image : "./photos/show_thumb/" + files[i],
					thumb : "./photos/pre_thumb/" + files[i]
				};
			} else {
				data = {
					image : "./photos/show_thumb/" + files[i]
				};
			}		   
			photos.push( data );
		}
		if (photos.length < 1) {
			photos.push( {
				image : "./img/No-Photo-Available.jpg"
			});
		}
	}
	return photos
};