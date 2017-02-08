# PhotoBooth

A small Photobooth app to control a reflex camera with a Respberry Pi.

## Install

Installation on Linux
* apt-get install gphoto2 imagemagick
* npm install

Installation on Mac
* brew install gphoto2
+ brew install imagemagick
* npm install

Run:
* node index.js
* open the http://localhost:3000

Control:
* Press "B" to take a Photo
* Press "right arrow key" or "left arrow key" to navigate the gallery

Frontend Config:

```
{
	"frontend": {
		"takePhotoButton": true, //Show a Button to take the photo
		"showNavigation": true, //Shows a navigation for the main gallery
		"showThumbnailBar": true //Shows a small preview bar at the bottom
	}
}
```