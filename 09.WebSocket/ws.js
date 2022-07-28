const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', (ws) => {
	console.log('client connected')

	ws.on('message', (message) => {
		console.log(`comes from client: ${message}`)
	})
})


