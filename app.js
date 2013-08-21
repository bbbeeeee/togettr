
/**
 * Module dependencies.
 */

var express = require('express'),
   http = require('http'), 
   path = require('path'), 
   mongodb = require('mongodb'), 
   passport = require('passport'), 
   bcrypt = require('bcrypt'), 
   config = require('./config/config').production, 
   validation = require('./modules/validation'), 
   MongoStore = require('connect-mongo')(express), 
   MongoClient = require('mongodb').MongoClient, 
   Server = require('mongodb').Server, 
   mongo = require('./config/mongodb'), 
   stylus = require('stylus');

function compile(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('warn', true)
        .set('compress', true);
    }

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use( express.cookieParser() );
app.use(express.session({
    secret: "lol",
    store: new MongoStore({
      url: config.db,
      maxAge: 900000,
      collection : 'sessions'
    })
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

MongoClient.connect("mongodb://localhost:27017/youtaan", function(err, db){
  if(err) return callback(err);
  //give all controllers access to db
  require('./controllers/index').getDb(db);
  require('./controllers/user').getDb(db);
  require('./controllers/project').getDb(db);
  require('./controllers/discussion').getDb(db);
  require('./controllers/contribution').getDb(db);
  require('./controllers/task').getDb(db);
  require('./controllers/idea').getDb(db);
  //give routes, passport, etc access to db
  require('./config/passport')(passport, config, db);
  require('./config/routes')(app, passport, db);

});









http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
