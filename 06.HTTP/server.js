

// // ----------[ Web Server ]----------

// const http = require('http')
// const server = http.createServer((req, res) => {

// 	// // -----[ Download as file ]-----
// 	// res.writeHead( 200, { 'Content-Type': 'plain/text' }) 		// .txt file
// 	// res.end('Hello Server')

// 	// // -----[ send .html ]-----
// 	// res.writeHead( 200, { 'Content-Type': 'text/html' }) 		// .html file
// 	// res.end('Hello Server')

// 	// // -----[ send json ]-----
// 	const data = {
// 		name: 'riajul',
// 		age: 28
// 	}
// 	res.writeHeader( 200, { 'Content-Type': 'application/json' }) 	// .json file
// 	res.write( JSON.stringify(data) )
// 	res.end()
// })

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => console.log(`http://localhost:${PORT}`))




// // ----------[ Web Server from file ]----------

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {

// 	res.writeHead( 200, { 'Content-Type': 'text/html' }) 		// .html file
// 	fs.readFile('./_home.html', 'utf-8', (err, data) => res.end(data) )

// })

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => console.log(`http://localhost:${PORT}`))


// // ----------[ Web Server as stream ]----------

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
// 	res.writeHead( 200, { 'Content-Type': 'text/html' }) 		// .html file

// 	const readStream = fs.createReadStream('./data/bigFile.txt', 'utf-8')

// 	readStream.on('data', (chunk) => {
// 		console.log({ chunk: chunk.length })
// 		res.write(chunk)
// 	})

// 	readStream.on('end', () => {
// 		console.log('-----[ finished ]-----')
// 		res.end()
// 	})

// })

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => console.log(`http://localhost:${PORT}`))




// // // ----------[ Web Server as stream ]----------

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
// 	res.writeHead( 200, { 'Content-Type': 'text/html' }) 		// .html file

// 	fs.createReadStream('./data/bigFile.txt', 'utf-8').pipe(res)
// })

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => console.log(`http://localhost:${PORT}`))




// ----------[ Event Driven Web Server ]----------

const http = require('http')

const PORT = process.env.PORT || 3000
const server = http.createServer().listen(PORT, () => console.log(`http://localhost:${PORT}`))

server.on('request', (req, res) => {
	const data = { name: 'riajul' }
	res.writeHead(200, {'Content-Type': 'application/json'})
	res.end( JSON.stringify(data) )
})



