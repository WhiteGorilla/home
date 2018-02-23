var express = require('express');
var app = express();
var hbs = require('hbs');

app.set('view engine', 'hbs');//Запустили систему
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  	res.render('index');
});

app.get('/home', function (req, res) {
	res.render('index');
});
app.get('/list', function (req, res) {
	res.render('list');
});
app.get('/contact', function (req, res) {
	res.render('contacts');
});

app.get('/user/:id', function (req, res) {//Перейдет на страницу user c обязательным продолжением после/
	console.log(req.params.id);
	res.send('your text is ' + req.params.id);
});

app.listen(3000, function () {	
	console.log("Example app listening on port 3000!");
});