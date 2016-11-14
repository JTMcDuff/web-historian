var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

//Standard CORS headers
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

//look at archives/sites to find if the assest/site being looked up is there
//if so, check and retrieve the sites folder for the cache and give it back


};



// As you progress, keep thinking about what helper functions you can put here!
