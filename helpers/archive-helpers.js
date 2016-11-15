var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  //possible images and scripts?
  archivedSites: path.join(__dirname, '../archives/sites'),
  //cached site data
  list: path.join(__dirname, '../archives/sites.txt')
  //names of sites that have been cached
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
  //this is exported to request-handler
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//Function reads list of URLs and calls callback on the list.
//Reads sites.txt and translates it into an array of site names.
//Passes that array of site names to the callback.
exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, function(err,sites) {
    if (err) { console.log('Unable to retrieve URL list', err); }
    //Convert content to array of file names
      var siteList = sites.toString().split('\n');
       //console.log("about to run callback on list of urls:", siteList, callback)

       if(callback){

         callback(siteList);
       }
  });
}
//check to see if the given url is in List
//Accepts a callback and a URL.
//If the URL is in the list, run callback with true.
//If the URL is not in the list, run callback with false.
exports.isUrlInList = function(url, callback) {
   exports.readListOfUrls(function (data){
     if (data.indexOf(url) >= 0)
     {
        callback(true);
     }  else {
       callback(false);
     }
   })
}



//add the url into the archives.sites.txt
//Passes test.  Might need to refactor.
exports.addUrlToList = function(url, callback) {
  fs.appendFile( exports.paths.list, url+'\n', function(){
  //console.log("writeFile complete")
  exports.isUrlInList(url, function() {
    if(true){
    //console.log("the url has been added");
      if(callback){
        callback(true)
      }
     }
    // else{
    //   //fs.appendFile( exports.paths.list, url+'\n', function(){
    //     //if (callback) { callback(true); }
    //      exports.isUrlInList(url, function() {
    //        if(true){
    // //console.log("the url has been added");
    //           if(callback){
    //             callback(true)
    //           }
    //         };
    //       })
    //   })
    // }
  })
})
};


//
exports.isUrlArchived = function(url, callback) {
  var address = exports.paths.archivedSites;
  //console.log('address', address);
  fs.readdir(exports.paths.archivedSites, function(err,list) {
    //console.log("list", list);
    if (list.indexOf(url) >= 0) { callback(true); }
    else { callback(false); }
  })
};


// cache all non cached urls in the list
// Check for all urls that are in sites.txt, but aren't archived.
// create files for each of those urls.
// GET the data for each site and append to the files.
exports.downloadUrls = function(urlArr) {
  var counter = 0

  for(var url of urlArr) {
    counter ++
    console.log("counter", counter)
    exports.isUrlInList(url, function(isInList) {
      if(!isInList) {
        exports.addUrlToList(url);
      }
    });
    console.log("about to check isUrlArchived")
    exports.isUrlArchived(url, (isArchived) => {
      //console.log('URL ITEM: ', url)
      //console.log('isArchived: ', isArchived)
      if(!isArchived) {

        console.log("nope. Not archived", isArchived)
        http.get('http://' + url, (res) => {
          //console.log("res",res)
          // const statusCode = res.statusCode;
          // const contentType = res.headers['content-type'];
          res.setEncoding('utf8');
          var rawData = '';
          res.on('data', (chunk) => rawData += chunk);
          res.on('end', () => {
          console.log('IS THIS HAPPENING')
            //console.log("rawData: ", rawData)
            // var stringifyData = JSON.stringify(rawData);
            // console.log("parsedData: ", parsedData)
            console.log('writeTo:',exports.paths.archivedSites+'/'+url);
            fs.writeFile(exports.paths.archivedSites + '/'+url, rawData);
          });
        });
      }
    })
  }


};



