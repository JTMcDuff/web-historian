var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');

// require more modules/folders here!

//Holds logic to serve requests and points to helpers.
exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {

    fs.readFile(path.join(__dirname +'/public/index.html'), function(err, content){
      if(err){
        res.writeHead(500);
        res.end('500');
      }
      else{
        (console.log("success on handleRequest. Sending index:"))
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(content, 'utf-8');
      }
    });

  //   res.writeHeader(200, httpHelpers.headers)
  //   res.end(fs.readFile(path.join(__dirname +'/public/index.html')));
  } else{
    res.writeHead(404);
    res.end('404');
  }
  // res.end(archive.paths.list); // ./archives/sites.txt
};