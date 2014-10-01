var express = require('express');
var routes = require('./routes');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var	bodyParser = require('body-parser');

var app = express();

app.use(session({
	secret: 'ma key'
}));

// configuration du body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// config du public
app.use(express.static(__dirname + '/public'));

// on définit le moteur de template pour les fichiers .html
app.engine('html', require('ejs').__express);
// on dit à express d'utiliser le moteur défini précédement
app.set('view engine', 'html');
app.set('layout','layout');
// on lui indique où se trouve les vues
app.set('views', __dirname + '/views');

app.use(expressLayouts);

routes(app);
// express écoute le port 8080
var server = app.listen(8080);
// socket io écoute le port 8080
var io = require('socket.io').listen(server);
require('./lib/socket')(io);

require('./lib/twitter.js');