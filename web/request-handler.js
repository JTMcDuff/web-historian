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
  } else if ( req.method === 'POST') {
     var storage = [];
     req.on('data', function(data){
       storage.push(data)
     });
     req.on('end', function(data){
       var buffer = Buffer.concat(storage).toString().slice(5);
       //buffer is
       console.log('buffer',buffer);
     });
     //console.log('req',req);
     res.writeHead(200,httpHelpers.headers);
     res.end('You sent a POST.');
  } else{
    res.writeHead(404);
    res.end('404');
  }
  // res.end(archive.paths.list); // ./archives/sites.txt
};


//When URL is POSTED,
// Check if it is archived.  isURLArchived
// If archived, serve.  If yes, do redirect.
// If not, add to list of sites and direct to "Site will be archiced soon."
// Check if it is in list. isURLInLsist (callback to addURLToList)
// If not, add it.   See callback above.
