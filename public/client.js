const socket = io('http://localhost:3000') 		// io() is available by <script src='socket.io.min.js' ></script>

// const message = document.getElementById('message')

// const ws = new WebSocket()

socket.on('disconnect', (socket) => {
	console.log('connection disconnected.')

})

socket.on('connection', (socket) => {
	console.log('connection stablished.')
})


