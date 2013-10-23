var express     = require('express');
var http        = require('http');
var path        = require('path');
var fs          = require('fs');
var crypto      = require('crypto');
var colors      = require('colors');

var Db          = require('mongodb').Db;
var Server      = require('mongodb').Server;
var config      = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true});
var db          = new Db('treegre', config, {safe: true});
var mongoStore  = require('connect-mongodb');

var treegre     = express();

var theSecret   = 'Only God Who Know It Secret';
var version     = '0.3.0'

treegre.configure(function() {
  treegre.set('port', process.env.PORT || 8000);
  treegre.set('host', 'http://localhost:' + treegre.get('port').toString());
  treegre.set('views', __dirname + '/views');
  treegre.set('view engine', 'ejs');
  treegre.use(express.favicon());
  treegre.use(express.logger('dev'));
  treegre.use(express.bodyParser());
  treegre.use(express.methodOverride());
  treegre.use(express.cookieParser(theSecret));
  treegre.use(express.session({
    cookie: {
      expires : new Date(Date.now() + 1000 * 60)
    },
    secret: theSecret,
    key: 'express.sid',
    store: new mongoStore({db: db, reapInterval: 1000 * 5})
  }));
  treegre.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });
  treegre.use(treegre.router);
  treegre.use(express.static(path.join(__dirname, 'public')));
  treegre.use(function(req, res, next) {
    if (req.method == 'POST') {
      res.status(200);
      if (req.accepts('json')) res.send({
        body: req.body,
        session: req.session
      }); return;
    } else {
      res.status(200);
      if (req.accepts('html')) res.render('not-found'); return;
    }
  });
});

treegre.configure('development', function() {
  treegre.use(express.errorHandler());
});

require('./routes/index')(treegre);
require('./routes/admin')(treegre);
require('./routes/user')(treegre);
require('./routes/session')(treegre);

// Devel
// require('./routes/development')(treegre);

var server = http.createServer(treegre).listen(treegre.get('port'), function() {
  console.log('');
  console.log("========================================================================".magenta);
  console.log("treegre ".blue + version.blue + " server has been started, just go to " + "http://localhost:".green + treegre.get('port').toString().green);
  console.log("Please read the README.md file before you do anything with this program.".red);
  console.log("========================================================================".magenta);
  console.log('');
});

var io = require('socket.io').listen(server);

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
io.set('authorization', function (handshakeData, accept) {
  if (handshakeData.headers.cookie) {
    handshakeData.cookie = express.cookieParser(handshakeData.headers.cookie);
    handshakeData.sessionID = express.cookieParser(handshakeData.cookie['express.sid'], theSecret);
    if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
      return accept('Cookie is invalid.', false);
    }
  } else {
    return accept('No cookie transmitted.', false);
  }
  accept(null, true);
});

require('./lib/sio/io-controller')(io);
