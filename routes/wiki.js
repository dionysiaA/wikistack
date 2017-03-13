'use strict';

var dbObjects = require('../models');
var express = require('express');
var router = express.Router();
module.exports = router;

var Page = dbObjects.Page;
var User = dbObjects.User;
// retrieve all our wiki pages
router.route('/')
	.get(function(req, res, next) {
		console.log('got to GET /wiki/');
		res.redirect('/');
	})
	.post(function(req, res, next) {
		var page = Page.build({
			title: req.body['title'],
			content: req.body['page content'],
			status: req.body['page status'],
		})
		.save()
		.then(function(pageInstance){
			res.json(pageInstance);
		});

		var user = User.build({
			name: req.body['author name'],
			email: req.body['author email']
		})
		.save()
		.then(function(o){
			console.log(o);
			// res.json(o);
		});
	});

router.get('/add', function(req, res, next) {
	console.log('got to GET /wiki/add');
	res.render('addpage');
})