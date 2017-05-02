var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var mongoose = require("mongoose");

var book = require("./models/booklist");

//链接数据库
mongoose.connect('mongodb://localhost:27017/book');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("链接数据成功！")
});

//生成app对象
var app = express();
//处理模板
app.set('views','./views');
app.engine(".html",ejs.__express);
app.set("view engine","html")

//处理post请求的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}))

//设置静态资源访问路径
app.use(express.static("static")) //使用中间件

app.get('/booktest',function(req,res){
	res.render('booktest')
})

app.post('/booktest',function(req,res){
	var body = req.body;
	book.find({},function (err, booklist) {
	   if (err) return 
	   res.json({booklist:booklist});
	})
})

app.post('/addBook',function(req,res){
	var body = req.body;
	var boo = new book({
		id : body.id,
		book : body.book,
		author : body.author,
		price : body.price
	})
	boo.save(function(err,doc) {
		if(err) return;
		res.json({'status':1})
	})
})

app.post('/deleteBook',function(req,res){
	var body = req.body;
	var data = {'id':body.id}
	res.json({'status':1});
	book.remove(data,function(err,doc) {

	})
})
app.post('/save',function(req,res) {
	var body = req.body;
	var data = {'id':body.tem}
	book.remove(data,function(err,doc) {

	})
	var boo = new book({
		id : body.id,
		book : body.book,
		author : body.author,
		price : body.price 
	})
	boo.save(function(err,doc){
		if(err) return
		res.json({"status":1})
	})
})
//起服务
app.listen(8090,function(){
	console.log("启动成功")
})
