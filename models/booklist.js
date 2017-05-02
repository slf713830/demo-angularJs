var mongoose = require("mongoose");
var booklistSchema = require("../schemas/booklist");

var book = mongoose.model('booklist',booklistSchema);

module.exports = book;