
## Socket.io with express

###### server.js

	`
	const path = require('path')
	const http = require('http')
	const express = require('express')
	const socketIo = require('socket.io')

	const app = express()
	app.use(express.static(path.join(__dirname, 'public')))

	const server = http.createServer(app)

	const PORT = process.env.PORT || 3000
	server.listen(PORT, () => console.log(`http://localhost:${PORT}`))


	const io = socketIo(server)

	io.on('connection', (socket) => {
		socket.emit('message', 'Hello Client')

		socket.on('chat', (message) => {
			// console.log(message)
			process.stdout.write(`> ${message}\n`)
			// socket.broadcast.emit('message', message)
		})
	})
	`


###### public/index.html

	`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Socket.IO</title>
	</head>
	<body>

		<input type='text' id='input' value='' /> <br />
		<button id='btn'>Send</button>

		<!-- Download or use direct CDN of socket.io-client -->
		<script src='socket.io-client.min.js'></script>
		<script src="./client.js"></script>
	</body>
	</html>
	`


###### public/index.html

	`
	// io() is available by <script src='socket.io.min.js' ></script>

	// eslint-disable-next-line
	const client = io('http://localhost:3000') 	// 'server started on http://localhost:3000'


	const $ = (selector) => document.querySelector(selector)

	$('#btn').addEventListener('click', () => {
		const input = $('#input').value
		console.log(input)

		client.emit('chat', input?.toString())
	})


	client.on('disconnect', console.log)

	client.on('connect', () => {
		console.log('Connected')
	})

	client.on('message', (message) => {
		console.log(message)
	})
	`





in ServerSide: We need 'socket.io' 		package $ yarn add socket.io
in ClientSide: We need 'socket.io-client' 	package $ yarn add socket.io-client or use CND client

We can 'socket.io-client' into client.js file many way

	. download socket.io-client.min.js

		<script src='socket.io-client.min.js'></script>
		<script src='client.js'></script>

		// client.js
			console.log( io() ) 				// just call 'io()''
			const socket = io('http://localhost:3000') 	// express app running on this port


	. Nodejs / React App 		: $ yarn add socket.io-client

	  	const { io } = require('socket.io-client')
	  	import { io } from 'socket.io-client'

