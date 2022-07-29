const ws = new WebSocket('ws://localhost:3000')


const $ = (selector) => document.querySelector(selector)

$('#btn').addEventListener('click', () => {
	const input = $('#input').value
	ws.send(input)
})





ws.onopen = () => {
	console.log('connected')

	// ws.send('hello server') 		// or
}

ws.onclose = () => {
	console.log('connection closed')
}

ws.onerror = (err) => {
	console.log(err)
}


ws.onmessage = (evt) => {
	console.log(evt.data)
}

