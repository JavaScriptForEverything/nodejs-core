

// // ----------[ Read Webpage as Text ]----------
// const https = require('https')

// const options = {
// 	hostname: 'en.wikipedia.org',
// 	port: 443,
// 	path: '/wiki/George_Washington',
// 	method: 'GET'
// }

// const req = https.request(options, (res) => {
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

// const https = require('https')
// const fs = require('fs')

// const options = {
// 	hostname: 'en.wikipedia.org',
// 	port: 443,
// 	path: '/wiki/George_Washington',
// 	method: 'GET'
// }

// const req = https.request(options, (res) => {
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




// // ----------[ Download API as .json ]----------

// const https = require('https')
// const fs = require('fs')

// const options = {
// 	hostname: 'api.github.com',
// 	port: 443,
// 	path: '/users/JavaScriptForEverything',
// 	method: 'GET',
// 	headers: { 'user-agent': 'nodejs' } 				// for Github API need this extra headers
// }


// const req = https.request(options, (res) => {
// 	const imageStream = fs.createWriteStream('./_me.json')
// 	res.pipe(imageStream)

// 	res.once('data', () => console.log(`---[ requeste started ]---`))
// 	res.on('end', () => console.log(`---[ requeste finished ]---`))
// })
// req.on('error', console.log)
// req.end()





// ----------[ Download Image ]----------

const https = require('https')
const fs = require('fs')

const options = {
	hostname: 'raw.githubusercontent.com',
	port: 443,
	path: '/JavaScriptForEverything/javascriptforeverything/main/BannerForGithub.png',
	method: 'GET',
	headers: { 'user-agent': 'nodejs' } 				// for Github API need this extra headers
}


const req = https.request(options, (res) => {
	const imageStream = fs.createWriteStream('./_image.jpg')
	res.pipe(imageStream)

	res.once('data', () => console.log(`---[ requeste started ]---`))
	res.on('end', () => console.log(`---[ requeste finished ]---`))
})
req.on('error', console.log)
req.end()





