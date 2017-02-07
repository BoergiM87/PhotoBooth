var path = require('path'),
	easyimg = require('easyimage'),
	q = require('q');

module.exports = function(photo, io) {
	var thumbShow = false,
		thumbPre = false;
	
	var genThumb = function () {
		easyimg.rescrop({
			src: "./public/photos/" + photo,
			dst: "./public/photos/show_thumb/" + photo,
			width: 1200
		}).then(
			function(image) {
				console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
				thumbShow = true;
				io.emit('data', {
					reloadGallery: true
				});
			},
			function (err) {
				console.log(err);
			});
		/*easyimg.rescrop({
			src: "./public/photos/" + photo,
			dst: "./public/photos/pre_thumb/" + photo,
			width: 200
		}).then(
			function(image) {
				console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
				thumbPre = true;
			},
			function (err) {
				console.log(err);
			});*/
	}
	genThumb();

};