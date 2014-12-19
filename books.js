//books.js

var library = {Alice_in_Wonderland:"alice.txt" , Peter_Pan:"peter.txt" , Aesops_Fables:"aesop.txt" ,
Jungle_Book:"jungle.txt" , Andersens_Fairy_Tales:"andersen.txt"};
var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){

var requrl = req.url;
var urlArr = requrl.split("/");

if (urlArr[2] === "style.css"){
  fs.readFile("style.css" , function(err,data){
    var style = data.toString();
    res.end(style);
  })
}else if(library[urlArr[1]]){

  fs.readFile("index.html" , function(err,data1){

    fs.readFile( library[urlArr[1]] , function(err,data2){
      var paginatedFile = paginate(data2.toString() , urlArr[2]);
      var result = data1.toString().replace("REPLACE", paginatedFile);
      result = result.replace("pBack", "http://localhost:2000/" + urlArr[1] + "/" + (parseInt(urlArr[2]) - 1)+" ");

      var book = data2.toString();
      var lines = book.split("\n");
      var totalPages = Math.floor(lines.length / 22) + 1;
      if (urlArr[2] < totalPages) {
        result = result.toString().replace("pNext", "http://localhost:2000/" + urlArr[1] + "/" + (parseInt(urlArr[2]) + 1));
      } else {
        result = result.toString().replace("pNext","");
      }

      // result = result.replace("pNext", "http://localhost:2000/" + urlArr[1] + "/" + (parseInt(urlArr[2]) + 1)+" ");
      result = result.toString().replace("ii", urlArr[2]);
      title = urlArr[1].replace(/_/g, " ");
      result = result.replace("TITLE", title);
      res.end(result);
    });
  });
}
else if (urlArr[1] === "favicon.ico") {
  fs.readFile("favicon.ico", function(err, data) {
    var icon = data.toString();
    res.end(data);
  });
} else if (urlArr[1] === "splash.html") {
  fs.readFile("splash.html", function(err, data) {
    var splash = data.toString();
    res.end(splash);
  });
} else if (urlArr[1] === "splash.css") {
  fs.readFile("splash.css", function(err, data) {
    var splashStyle = data.toString();
    res.end(splashStyle);
  });
}

});
server.listen(2000);


var paginate = function(book , pg){
  var pages = [];
  var lines = book.split("\n");
  var startLine = (pg-1) * 22;
  for (i=startLine ; i < startLine +22; i++){
    pages.push(lines[i]);
  }
  return pages.join("</br>");
}