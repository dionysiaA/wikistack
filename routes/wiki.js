'use strict';

var dbObjects = require('../models');
var express = require('express');
var router = express.Router();
module.exports = router;

var page = dbObjects.Page;
var users = dbObjects.User;
// retrieve all our wiki pages
router.route('/')
	.get(function(req, res, next) {
		console.log('got to GET /wiki/');
		res.send('got to GET /wiki/');
	})
	.post(function(req, res, next) {
		console.log('got to POST /wiki/');
		res.send('got to POST /wiki/');
	});

router.get('/add', function(req, res, next) {
	console.log('got to GET /wiki/add');
	res.render('addpage');
})