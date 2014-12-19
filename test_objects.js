// test_objects.js

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

//console.log(library);

// library.forEach(function(bookdata) {
// 	if (input === bookdata.title) {
// 		console.log(bookdata);
// 	}
// });