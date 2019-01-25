$(function () {
	var socket = io.connect('http://localhost:3000')

	var message = $('#message'),
		username = $('#username'),
		send_message = $('#send_message'),
		send_username = $('#send_username'),
		chatroom = $('#chatroom');

	// emit message
	send_message.click(function () {
		socket.emit('new_message', {message: message.val()})
	})

	// listen on new message
	socket.on('new_message', (data) => {
		console.log(data)
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	// emit a username
	send_username.click(function () {
		console.log(username.val())
		socket.emit('change_username', {username: username.val()})
	})
})