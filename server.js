// setting up
require('dotenv').load();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var database = require('./config/database');

mongoose.connect(database.db);
console.log("database name: " , database.db);

require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'andelaandelaandela' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/route/routes')(app, passport);

app.listen(port);
console.log("App listening on port " + port);
