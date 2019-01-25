const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// template
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));


server.listen(3000);

app.get('/', function (req, res) {
	res.render('index');
});

io.on('connection', (socket) => {
	console.log('new user connected')

	// default username
	socket.username = "Anonymous";

	// listen on change username
	socket.on('change_username', (data) => {
		socket.username = data.username;
	})

	// listen on new message
	socket.on('new_message', (data) => {
		io.sockets.emit('new_message', {message : data.message, username : socket.username});
	})
});





