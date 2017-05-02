var mongoose = require("mongoose");

var booklistSchema = mongoose.Schema({
	id:String,
	book:String,
	author:String,
	price:String
})

module.exports = booklistSchema