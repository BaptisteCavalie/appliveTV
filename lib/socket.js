var users = require('./users');

module.exports = function (io){
	// connection d'un nouvel utilisateur, socket représente la connexion de cet utilisateur 
	io.sockets.on('connection', function(socket) {
		socket.on('auth', function(userId) {
			// console.log('user auth' + userId);
			users.setSocket(userId, socket);
		});
	});
};