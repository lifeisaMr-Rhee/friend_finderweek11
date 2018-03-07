var path = require('path');

var friends = require('../data/friends.js');

module.exports = function(app) {
	console.log('___ENTER apiRoutes.js___');

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {

		var userInput = req.body;
		var userResponses = userInput.scores;
		var matchName = '';
		var matchImage = '';
		var totalDifference = 9000;

		for (var i = 0; i < friends.length; i++) {

			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// If lowest difference, record the friend match
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};