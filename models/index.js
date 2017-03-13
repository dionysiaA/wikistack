var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	content: {
		type: Sequelize.TEXT, allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'closed')
	},
	date: {
		type: Sequelize.DATE, defaultValue: Sequelize.NOW
	},
	route: {
		type: Sequelize.VIRTUAL,
		get: function () {
			return '/wiki/' + this.getDataValue('urlTitle');
		}
	}

});

// ...
// Page.findOne({where: {title: 'Large Sheep'}})
// .then(function (page) {
// 	console.log(page.route); // '/wiki/Large_Sheep'
// });
// ...

var Person = db.define('person', {
	first_name: {
		type: Sequelize.STRING
	},
	last_name: {
		type: Sequelize.STRING
	},
	full_name: {
		type: Sequelize.VIRTUAL,
		get: function () {
			return this.first_name + ' ' + this.last_name;
		},
		set: function (incomingName) {
			var arr = incomingName.split(' ');
			var first_name = arr[0];
			var last_name = arr[1];
			this.first_name = first_name;
			this.last_name = last_name;
		}
	}
});

// Getters and Setters example
// Person.findOne({where: {last_name: 'Smith'}})
// .then(function (person) {
// 	console.log(person.full_name);
// 	person.full_name = 'Omri Bernstein';
// 	return person.save();
// })
// .then(function (changedPerson) {
// 	console.log(changedPerson); //
// });

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
});

module.exports = {
  Page: Page,
  User: User
};
