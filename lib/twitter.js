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
		stream.on('tweet', function (tweet) {
			console.log(tweet);
			users.broadcast(tweet);
		});
	}
}
module.exports = twitter;