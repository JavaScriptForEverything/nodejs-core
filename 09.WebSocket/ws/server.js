
// ----------[ ws Server ]----------

const WebSocketServer = require('ws').Server

const PORT = 3000

const wss = new WebSocketServer({ port: PORT })
console.log(`Server is running on: ws://localhost:${PORT}`)

wss.on('connection', (ws) => {
		process.stdout.write('------[ connected with client ]-------\n\n')

	ws.on('message', (message) => {
		// console.log(`${message} \n > `)
		process.stdout.write(`> ${message}\n`)
	})

	process.stdin.on('data', (chunk) => {
		chunk = chunk.toString()

		process.stdout.write('> ')
		ws.send(chunk)
	})
})




/*
		Node: as Server, 	Browser: as Client

			/ws
				$ node server.js 								: type something, that will be send into browser's console

				(Browser) public/index.html 		: type message in intput, and send, that will be visible in terminal in node


		Node: as Server, 	Node: as Client

			$ node server.js 									: terminal-1: as server
			$ node client.js 									: terminal-2: as client

			. place both terminal side by side and type in one termianl, then other terminal get respose back.



*/



