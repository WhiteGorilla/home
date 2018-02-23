'use strict';

var nodemailer = require('nodemailer');
var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');
var path = require('path');
var indexPage = fs.readFileSync('../index.html');
var styles = fs.readFileSync('../css/all.css');
var js = fs.readFileSync('../client_script/script.js')
var pageNotFound = fs.readFileSync('../404Page.html');

http.createServer(function(req, res) {
  if(req.url ==='/about') {
    console.log(req);
  }else if(req.url === '/stop') {
    process.exit();
  }else if(req.url === '/contact') {
    res.write('<h1>Contact Page</h1>');
    res.end();
  }else if(req.url ==='/'){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(indexPage);
    res.end();
  }else if(req.url==='/css/all.css') {
    res.write(styles);
    res.end();
  }else if(req.url =='/client_script/script.js') {
    res.write(js);
    res.end();
  }else if(req.url =='/sendEmail') {
    var d;
    var mailError = '';
    
    req.on('data', function(data) {
      d = JSON.parse(data);
      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'yourmail@gmail.com',
        pass: 'pass'
        }
      });

      var mailOptions = {
        from: 'yourmail@gmail.com',
        to: d.mail,
        subject: 'Sending Email using Node.js',
        html: '<h1>Welcome</h1><p style="color: blue">Your login is successful</p>'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {     
          console.log(error);
          
        } else {
           console.log('Email sent: ' + info.response);
           mailError = 'E-mail is send';
        }
      });
    });

    res.end(mailError);
    
  }else if(req.url == '/getCurrency') {
    var resOut = res;
  
    var currencyFromUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';
    
    var reqToPrivatBank = https.get(currencyFromUrl, function(res) {
      var dataIn = '';
      
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      
      res.on('data', function (chunk) {
        dataIn = chunk;
        console.log(chunk);
        resOut.write(dataIn);
        resOut.end();
      });
    
      res.on('error',function(e) {
        console.log('problem with request: ' + e.message);
      });
      
    });

  }else {
  
    res.writeHead(404, {'Content-Type' : 'text/html'});
    res.write(pageNotFound);
    res.end();
    
  }
}).listen(3000, function() {
  console.log('Server is started');
});