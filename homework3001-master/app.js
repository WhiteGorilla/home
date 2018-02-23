var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var app = express();
var pug = require('pug');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
//var team = require('./data/team.json'); //перенесла все значения из файла json в mongodb
//для ее наполнения выполняю в консоли mongo localhost:27017/company createcollection.js
var link = 'http://api.icndb.com/jokes/random';
var request = require('request');
var rp = require('request-promise');
var teamPages = ['founder', 'director', 'accountant', 'secretary'];
var options = {
  uri: 'http://api.icndb.com/jokes/random',
  headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  };
var joke;
var url = 'mongodb://localhost:27017';
var dbName = 'company';
var team;
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  var db = client.db(dbName);
  db.collection('crew').find({}).toArray(function(err, result) {
    if (err) throw err;
     console.log(result);
     team = result;
    client.close();
  });
});


if (!joke) {
rp(options)
.then(function (response) {
  return response;
}).then(function (response) {
  joke = response;
  return joke;
});
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anniekhrystiuk@gmail.com',
    pass: 'ThatAccountIsFake180117'
  }
});

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  if(!joke) {
    var jokeWaiter = setInterval(function () {
      console.log('wait');
    },100)
  } else {
  clearInterval(jokeWaiter);
  res.render('index', {
    joke: joke['value']['joke']
  });
  };
});

app.get('/about', function (req, res) {
  res.render('about', {
      country: 'Africa',
      foundationDate: new Date(),
      founder: 'Lemur',
      team: team,
    });
  });

app.get('/contact', function (req, res) {
  res.render('contact', {
    team: team
  });
});

app.post('/feedback', function (req, res) {
  res.render('feedback');
  var mailOptions = {
    from: 'anniekhrystiuk@gmail.com',
    to: 'annarainier11@gmail.com',
    subject: 'Sending mail using nodeJS',
    text: req.body.message,
  };
  transporter.sendMail (mailOptions, function (err, info) {
  if (err) {
    console.log('error');
  } else {
    console.log('мейл отправлен ' + info.response);
  }
});
});

app.get('/about/:position', function (req, res) {
  var page = req.params.position;
  if (teamPages.indexOf(page) !== -1) {
    res.render(page);
  } else {
    res.send('that page doesn\'t exist yet!');
  }
});

app.post('/vacancy', function (req, res) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

     var db = client.db(dbName);

     var newCrew = {
       id: Date.now(),
       name: req.body.name,
       position: req.body.position
     };
     var arr = new Array ();
     for (var i = 0; i < team.length; i++) {
      arr.push(team[i].position);
    };
    if (arr.indexOf(newCrew['position']) !== -1) {
      console.log('already exists');
      res.end('that position is busy');
    } else {
     team.push(newCrew);
     db.collection('crew').insert(newCrew, function (err, result) {
       if (err) {
         console.log('error');
       }
     });
     res.render('vacancy');
    }
     client.close();
   });
});

setInterval (function () {
  joke = undefined;
  rp(options)
  .then(function (response) {
    return response;
  }).then(function (response) {
    joke = response;
    return joke;
});
}, 60000);

app.listen(3000, function () {
  console.log('server is up on port 3000');
})
