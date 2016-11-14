var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
       console.log("about to run callback on list of urls:", siteList, callback)

       if(callback){
         callback(siteList);
       }
  });
}
//check to see if the given url is in List
//Accepts a URL.
//Returns true if URl is present.
//Returns false it URL is not present.
exports.isUrlInList = function(url, callback) {
   readListOfUrls(function (){
     if (callback) {callback}
     if (siteList.indexOf(url) != -1) {return true;}
     else {return false;}
        })



};


//add the url into the archives.sites.txt
exports.addUrlToList = function(url, callback) {
};


//check to see if the given url is archived
//returns boolean
exports.isUrlArchived = function(url, callback) {
};


// cache all non cached urls in the list
exports.downloadUrls = function(url, callback ) {

};

    // fs.readFile(paths.list, function(err, content){
    //   if(err){
    //     res.writeHead(500);
    //     res.end('500');
    //   }
    //   else{
    //     (console.log("success on _________:"))
    //     res.writeHead(200, {'Content-Type': 'text/html'})
    //     res.end(content, 'utf-8');
    //   }
    // }
