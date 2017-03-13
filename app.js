var models = require('./models');
var router = require('./routes/wiki');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();

module.exports = app; // this line is only used to make testing easier.

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({
	extended: true
})); // for HTML form submits
app.use(bodyParser.json());

// static and dynamic routing
app.use('/wiki', router);

// error handling middleware
app.use(function(err, req, res, next) {
	console.error('There was an error and Im sad about it');
	console.error(err.message);
	console.error(err.stack);
	res.status(err.status || 500).send(err);
});

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })


