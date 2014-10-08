var users = require('./users');


var configTwitter = require('../config/twitter.json');
var Twit = require('twit');
var T = new Twit({
	consumer_key	   : configTwitter.ConsumerKey
  , consumer_secret	   : configTwitter.ConsumerSecret
  , access_token  	   : configTwitter.AccessToken
  , access_token_secret: configTwitter.AccessTokenSecret
});

var stream;
var twitter = {
	refreshStream : function (tags) {
		if (stream) {
			stream.stop();
			stream = null;
		}
		var stream = T.stream('statuses/filter', { track: tags });

		var fonctionDeclencheeParLEcouteur = function (tweet) {
			console.log("COUCOU !! fonctionDeclencheeParLEcouteur", tweet);
			users.broadcast(tweet);
		};

		stream.on('tweet', fonctionDeclencheeParLEcouteur);
	}
}
module.exports = twitter;