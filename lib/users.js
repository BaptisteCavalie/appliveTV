var ids = 0;

var usersArray = [];

var tagArray = [];

var users = {
	addUser: function(){
		var id = ++ids;
		usersArray[id] = { socket: null, tags: []};

		return id;
	},

	setSocket: function (userId, socket) {
		// console.log(usersArray);
		usersArray[userId].socket = socket;
	},

	addEmission: function (userId, tag) {
		if(usersArray[userId].tags.indexOf(tag.toLowerCase()) == -1){
			usersArray[userId].tags.push(tag.toLowerCase());
		}
		if(tagArray.indexOf(tag.toLowerCase()) == -1){
			tagArray.push(tag.toLowerCase());
		}
	},

	getTags: function() {
		return tagArray;
	},

	broadcast: function(tweet) {
		var tag, client;
		// pour chaque user comparer hashtag du tweet et hashtag de l'user
		for (var i = 0; i < usersArray.length; i++) {
			client = usersArray[i];
			console.log(client);
			if (!client) {
				continue;
			}	
		 	for (var j = 0; j < tweet.entities.hashtags.length; j++) {
		 		tag = tweet.entities.hashtags[j].text;
		// si ça correspond envoyer tweet
		 		if (client.tags.indexOf('#' + tag.toLowerCase()) !== -1) {
		 			console.log('emit');
		 			client.socket.emit('tweet',tweet);
		 			break;
		 		}
		 	}
		 }
		
	}
}

module.exports = users;