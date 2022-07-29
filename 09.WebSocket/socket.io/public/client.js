// io() is available by <script src='socket.io.min.js' ></script>

// eslint-disable-next-line
const client = io('http://localhost:3000') 		// 'server started on http://localhost:3000'


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




