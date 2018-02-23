var http = require('http');
var fs = require('fs');
var Event = require('events').EventEmitter;
var emt = new Event();
var port = 3000;

emt.on('registration', function() {
  console.log('Registration: ' + new Date());
});

emt.on('login', function() {
  console.log('You logged in: ' + new Date());
});

emt.on('logout', function() {
  console.log('You logged out: ' + new Date());
});

emt.on('buyMembership', function() {
  console.log('You buy Membership: ' + new Date());
});

http.createServer(function(req, res) {
  if(req.url == '/'){
    res.end('Index page');
  }else if(req.url == '/registration'){
    emt.emit('registration');
	res.end("Restration");
  }else if(req.url == '/login') {
    emt.emit('login');
	res.end("Login");
  }else if(req.url == '/logout') {
    emt.emit('logout');  
	res.end("Logout");
  }else if(req.url == '/pay') {
    emt.emit('buyMembership');  
	res.end("Pay Membership");
  }else{
    res.statusCode = 404;
    res.end('Page not found');
  }
}).listen(port, function(){
   console.log('Server start');
});