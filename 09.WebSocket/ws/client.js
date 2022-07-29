const ws = require('ws')

const client = new ws('ws://localhost:3000')

client.on('open', () => {
	// console.log('connected with server')
	process.stdout.write('------[ connected with server ]-------\n\n')
})

// client.on('close', () => {
// 	// console.log('disconnected from server')
// 	process.stdout.write('------[ connection disconnected ]-------\n\n')
// })
client.on('error', console.log)

client.on('message', (message) => {
	// console.log(message)
	process.stdout.write(`> ${message}\n`)
})


process.stdin.on('data', (chunk) => {
	chunk = chunk.toString()

	process.stdout.write('> ')
	client.send(chunk)
})
