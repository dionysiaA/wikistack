var models = require('./models');
var express = require('express')
var app = express()


// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })


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