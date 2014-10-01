var configTv = require('../config/tv');
var users = require('../lib/users');
var twitter = require('../lib/twitter');
exports.getIndex = function (req, res) {
	var userId;
	if (req.session.userId) {
		userId = req.session.userId;
	}else{
		userId = req.session.userId = users.addUser();
	}
	console.log(req.session);
	// render la page home / inder.html
	res.render('home/index', {
		tv : configTv,
		userId: userId
	});
};

exports.postEmission = function (req, res) {
	users.addEmission(req.session.userId, req.body.hashtag);
	var tags = users.getTags();
	twitter.refreshStream(tags);
	// redirige vers la home
	res.redirect('/');
}