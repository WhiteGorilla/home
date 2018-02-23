var http = require('http');
var fs = require('fs');
var port = 3000;

http.createServer(function(req, res) {
  if(req.url == '/'){
    res.end('Index page');
  }else if(req.url == '/server.js'){
    
	fs.stat(__filename, function(err, stat) {
	  if(err || !stat.isFile()) {
	    res.statusCode = 404;
		res.end('File not found');
		return;
	  }
	  
	  console.log('File size: ' + stat.size);
	})
	
    fs.readFile(__filename, function(err, data){
	
	  if(err) {
	    res.statusCode = 500;
		res.end('Server error');
		return;
	  }
	  
	  var mime = require('mime').getType(__filename);
	  res.writeHead(200, {'Content-Type' : mime} );
	  res.end(data);
	  
	});
  }else if(req.url == '/some.txt') {
  
    var stream = new fs.ReadStream('./some.txt', {encoding : 'utf-8'});
	
	stream.on('error', function(err) {
	  console.error(err);
	  res.end('Server error');
	  return;
	})
	
	stream.pipe(res);
	
  }else {
    res.statusCode = 404;
    res.end('Page not found');
  }
 
}).listen(port, function(){
   console.log('Server start');
});