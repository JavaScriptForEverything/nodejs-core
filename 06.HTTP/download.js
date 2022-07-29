

// // ----------[ Read Webpage as Text ]----------
// const http = require('http')

// const options = {
// 	hostname: 'info.cern.ch',
// 	port: 80,
// 	path: '/hypertext/WWW/TheProject.html',
// 	method: 'GET'
// }

// const req = http.request(options, (res) => {
// 	res.setEncoding('utf-8') 					// encode Buffer to text

// 	res.once('data', (chunk) => console.log(`---[ requeste started ]---`) )

// 	res.on('data', (chunk) => {
// 		console.log(chunk)
// 	})

// 	res.on('end', () => console.log(`---[ requeste finished ]---`) )

// })

// req.on('error', console.log)
// req.end() 		// 1. request must be ended else just timeout and failed



// // ----------[ Download Webpage as .html ]----------

// const http = require('http')
// const fs = require('fs')

// const options = {
// 	hostname: 'info.cern.ch',
// 	port: 80,
// 	path: '/hypertext/WWW/TheProject.html',
// 	method: 'GET'
// }

// const req = http.request(options, (res) => {
// 	let requestBody = ''

// 	res.setEncoding('utf-8') 					// encode Buffer to text

// 	res.once('data', () => console.log(`---[ requeste started ]---`) )

// 	res.on('data', (chunk) => {
// 		console.log({ chunk: chunk.length })
// 		requestBody += chunk
// 	})

// 	res.on('end', () => {
// 		fs.writeFile('_home.html', requestBody, 'utf-8', console.log)
// 		console.log(`---[ requeste finished ]---`)
// 	})

// })

// req.on('error', console.log)
// req.end() 		// 1. request must be ended else just timeout and failed






// ----------[ Download Image ]----------
// 	Downloading image is not like downloading file. We can but, that way image not woring
//	I don't know why, but if I try to download image as stream then it works fine.

const http = require('http')
const fs = require('fs')

// Here I am using my ISP's local Server which is definately HTTP protocol
const options = {
	hostname: '10.1.1.1',
	port: 80,
	path: '/Admin/main/images/tt6932874/poster/5dExO5G2iaaTxYnLIFKLWofDzyI.jpg',
	method: 'GET',
}

const req = http.request(options, (res) => {
	const imageStream = fs.createWriteStream('./_image.jpg')
	res.pipe(imageStream)

	res.once('data', () => console.log(`---[ requeste started ]---`))
	res.on('end', () => console.log(`---[ requeste finished ]---`))
})
req.on('error', console.log)
req.end()





