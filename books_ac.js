//books_ac.js

var http = require("http");
var fs = require("fs");

var input = process.argv[2];

var Book = function(path,filename,title,author) {
  this.path = path;
  this.filename = filename;
  this.title = title;
  this.author = author
};

var alice = new Book("alice_s_adventures_in_wonderland","aliceInWonderland.txt","Alice's Adventures in Wonderland","Lewis Carroll");
var aesop = new Book("fables","aesop.txt","Fables","Aesop");
var jungle_book = new Book("jungle_book","jungle.txt","The Jungle Book","Rudyard Kipling");
var andersen = new Book("fairy_tales","andersen.txt","Fairy Tales","Hans Christian Andersen");
var peter = new Book("peter_pan","peter.txt","Peter Pan","J. M. Barrie");

var library = [alice,aesop,jungle_book,andersen,peter];
var openBook;

var server = http.createServer(function(req,res){
  var requrl = req.url;
  var urlArr = requrl.split("/");
  console.log(urlArr);
  inputPath = urlArr[2];
  if (inputPath === "style.css"){
    fs.readFile("style.css", function(err,data){
      var style = data.toString();
      res.end(style);
    });
  } else {
    fs.readFile("index.html" , function(err,data1){

      library.forEach(function(bookdata) {
       if (inputPath === bookdata.title) {
         openBook = bookdata;
       }
      });

      fs.readFile(openBook.filename , function(err,data2){
        var paginatedFile = paginate(data2.toString() , inputPath);
        var result = data1.toString().replace("REPLACE", paginatedFile);
        if (inputPath > 1){
          result = result.toString().replace("pBack", "http://localhost:2000/stuff/" + (parseInt(inputPath) - 1));
        } else {
          result = result.toString().replace("pBack", "");
        }
        var book = data2.toString();
        var lines = book.split("\n");
        var totalPages = Math.floor(lines.length / 22) + 1;
        if (inputPath < totalPages) {
          result = result.toString().replace("pNext", "http://localhost:2000/stuff/" + (parseInt(inputPath) + 1));
        } else {
          result = result.toString().replace("pNext","");
        }
        result = result.toString().replace("ii", inputPath);
        res.end(result);
      });
    });
  }
});

var paginate = function(book,pg){
  var pages = [];
  var lines = book.split("\n");
  var startLine = (pg-1) * 22;
  for (i = startLine ; i < startLine + 22; i++){
    pages.push(lines[i]);
  }
  return pages.join("</br> ");
};

server.listen(2000);