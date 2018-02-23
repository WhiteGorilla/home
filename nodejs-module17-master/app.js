var express = require('express');
var bodyParser = require('body-parser');
var contents = require('./data/content.json');

var app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {title: 'WebSite', contents: contents});
});

app.get('/about', function(req, res) {
  res.render('about', {title: 'About us', contents: contents});
  console.log(contents);
});

app.get('/contact', function(req, res) {
  res.render('contact', {title: 'Contact us', contents: contents});
});

app.listen(3000, function() {
  console.log('On localhost: 3000');
});
