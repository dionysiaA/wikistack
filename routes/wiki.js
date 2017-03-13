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
			.then(function(allPages) {
				res.render('index', {
					pages: allPages
				})
			});
	})
	.post(function(req, res, next) {

		User.findOrCreate({
				where: {
					name: req.body['author name'],
					email: req.body['author email']
				}
			})
			.then(function(values) {
				console.log(values, values[0], 'what are the values in here?');

				var user = values[0];
				var page = Page.build({
					title: req.body['title'],
					content: req.body['page content'],
					status: req.body['page status'],
				});
				return page.save()
					.then(function(pageInstance) {
						return pageInstance.setAuthor(user);
					});
			})
			.then(function(pageInstance) {
				res.redirect(pageInstance.route);
			})
			.catch(next);

	});

router.get('/add', function(req, res, next) {
	console.log('got to GET /wiki/add');
	res.render('addpage');
})

router.get('/:urlTitle', function(req, res, next) {
	console.log(req.params.urlTitle, 'im url title');
	Page.findOne({
			where: {
				urlTitle: req.params.urlTitle
			},
			include: [{
				model: User,
				as: 'author'
			}]
		})
		// .then(function(foundPage) {
		// 	User.findOne({
		// 		where: {
		// 			id: foundPage.authorId
		// 		}
		// 	})
		.then(function(pageInstance) {
			console.log(pageInstance);
			res.render('wikipage', {
				wiki: pageInstance
			})
		})
		.catch(next);
});