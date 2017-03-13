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
		// console.log(req.body);
		// res.json(req.body);

		// STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
/*
{ 'author name': 'asdfj',
  'author email': 'jasdf@stuff.com',
  title: 'asjldf',
  'page content': 'asldf',
  'page status': 'jasf' }
*/
  var page = Page.build({
    title: req.body['title'],
		urlTitle: req.body['title'].split(' ').join('_'),
		// replace(/\s+/g, '_'),
    content: req.body['page content'],
		status: req.body['page status'],
});

	var user = User.build({
		name: req.body['author name'],
		email: req.body['author email']
	});

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
	user.save();
  res.redirect('/');

	});

router.get('/add', function(req, res, next) {
	console.log('got to GET /wiki/add');
	res.render('addpage');
})
