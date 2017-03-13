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
		Page.findAll()
		.then(function (allPages) {
			res.render('index', {pages: allPages})
		});
		// res.redirect('/');
	})
	.post(function(req, res, next) {
		var page = Page.build({
			title: req.body['title'],
			content: req.body['page content'],
			status: req.body['page status'],
		})
		.save()
		.then(function(pageInstance){
			res.redirect(pageInstance.route);
		});

		var user = User.build({
			name: req.body['author name'],
			email: req.body['author email']
		})
		.save()
		.then(function(o){
			// console.log(o);
			// res.json(o);
		});
	});

router.get('/add', function(req, res, next) {
	console.log('got to GET /wiki/add');
	res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
	console.log(req.params.urlTitle, 'im url title');
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function (foundPage) {
		// console.log(foundPage.dataValues);
		res.render('wikipage', {page: foundPage})
	})
	.catch(next);

	// res.send('dynamic route' + url);
});

// {
// route: "/wiki/ajsa_cat_dog_love",
// id: 1,
// title: "ajsa cat dog love",
// urlTitle: "ajsa_cat_dog_love",
// content: "stuff",
// status: "open",
// date: "2017-03-13T19:59:56.000Z",
// createdAt: "2017-03-13T19:59:56.865Z",
// updatedAt: "2017-03-13T19:59:56.865Z"
// }
