// ...
// Page.findOne({where: {title: 'Large Sheep'}})
// .then(function (page) {
// 	console.log(page.route); // '/wiki/Large_Sheep'
// });
// ...

// var Person = db.define('person', {
// 	first_name: {
// 		type: Sequelize.STRING
// 	},
// 	last_name: {
// 		type: Sequelize.STRING
// 	},
// 	full_name: {
// 		type: Sequelize.VIRTUAL,
// 		get: function () {
// 			return this.first_name + ' ' + this.last_name;
// 		},
// 		set: function (incomingName) {
// 			var arr = incomingName.split(' ');
// 			var first_name = arr[0];
// 			var last_name = arr[1];
// 			this.first_name = first_name;
// 			this.last_name = last_name;
// 		}
// 	}
// });

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
