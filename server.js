
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String
})
mongoose.model('Quotes', QuoteSchema); 
var Quotes = mongoose.model('Quotes') 





app.get('/', function(req, res) {


    res.render('index');
})

app.post('/process', function(req, res) {
    console.log("POST DATA", req.body);

    var quoteInstance = new Quotes()
    quoteInstance.name = req.body.name
    quoteInstance.quote = req.body.quote
    quoteInstance.save(function(err){

    })

    res.redirect('home');
})

app.get('/home', function(req, res) {

Quotes.find({}, function(err, quotes) {
	console.log(quotes)
res.render("home", {quote: quotes});
})


})

app.listen(8000, function() {
    console.log("listening on port 8000");
})












