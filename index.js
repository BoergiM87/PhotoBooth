process.env.TZ = 'Europe/Berlin';

var express = require('express'),
	exphbs = require('express-handlebars'),
	fs    = require("fs"),
	path = require('path'),
	bodyParser = require('body-parser'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	readImageDir = require('./modules/readImageDir'),
	exec = require('./modules/exec'),	
	formatdate = require('date-format'),
	mv = require('mv'),
	hbs;
var config = JSON.parse(fs.readFileSync("./config.json")),
	frontend = config.frontend;

hbs = exphbs.create({
	defaultLayout: 'main',
	helpers: {
		ifCond: function(v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return (v1 == v2) ? options.fn(this) : options.inverse(this);
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this);
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this);
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this);
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this);
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this);
				default:
					return options.inverse(this);
			}
		}
	}
});
	
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.render('home', {
		title: 'PhotoBooth',
		takePhotoButton: frontend.takePhotoButton,
		showNavigation: frontend.showNavigation,
		showThumbnailBar: frontend.showThumbnailBar
	});
});

app.post('/takephoto/', function(req, res) {
	var timestamp = formatdate('yyyyMMddhhmmss', new Date()),
		newPhoto = 'IMG_' + timestamp + '.JPG';
	//Take a photo:
	io.emit('data', {
		takePhoto: true
	});
	exec( 'gphoto2 --capture-image-and-download --filename=' + newPhoto, newPhoto, io , frontend.showThumbnailBar ).then(function(result) { console.log(result); });
	res.json({ success: true });
});

app.post('/getphotos/', function(req, res) {
	var photos = new readImageDir(frontend.showThumbnailBar);
	res.json({ success: true, data: photos });
});

io.on('connection', function (socket) {
	//new pushDataModule(io, socket, sqlconnection);
});

server.listen(3000);
console.log("Server is Started!")