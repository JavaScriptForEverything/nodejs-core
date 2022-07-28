const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()

app.use(express.static('/public'))


app.get('/', (req, res) => {

	res.status(200).json({
		status: 'success',
		message: 'Hello'
	})

})

const server = http.createServer(app)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))


const io = socketIo(server)

io.on('connection', (socket) => {
	socket.emit('message', 'Hello Client')

	socket.on('chat', (message) => {
		socket.broadcast.emit('message', message)
	})
})





/*
	in ServerSide: We need 'socket.io' 				package and
	in ClientSide: We need 'socket.io-client' package

		We can 'socket.io-client' into client.js file many way

			. download socket.io-client.min.js

					<script src='socket.io-client.min.js'></script>
					<script src='client.js'></script>

					// client.js
						console.log( io() ) 					// just call 'io()''

						const socket = io('http://localhost:3000') 		// express app running on this port


			. Nodejs / React App 		: $ yarn add socket.io-client

			  	const { io } = require('socket.io-client')
			  	import { io } from 'socket.io-client'

*/
