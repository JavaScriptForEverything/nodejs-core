const fs = require('fs')
const https = require('https')


// |----------[ Read html page ]----------																															|

// const personName = 'george_washington'

// const options = {
// 	hostname: 'en.wikipedia.org',
// 	port: 443,
// 	path: `/wiki/${personName}`,
// 	method: 'GET'
// }

// const req = https.request(options, (res) => {
// 	console.log('Requested is started', { status: res.statusCode })

// 	console.log({ headers: res.headers })

// 	let responseBody = ''

// 	// Because GET https://en.wikipedia.org/wiki/George_washington 	is .html text file
// 	res.setEncoding('utf-8')

// 	res.once('data', (chunk) => console.log({ chunk: chunk.length }))

// 	res.on('data', (chunk) => {
// 		responseBody += chunk
// 		console.log({ chunk: chunk.length })
// 	})

// 	res.on('end', () => {
// 		fs.writeFile(`./_${personName}.html`, responseBody, 'utf-8', console.log)
// 		console.log('----------[ File is downloaded ]--------')
// 	})

// })

// req.on('error', console.log)
// req.end()



// |----------[ Read github api ]----------																															|

// const fs = require('fs')
// const https = require('https')


// const options = {
// 	hostname: 'api.github.com',
// 	port: 443,
// 	path: '/users',
// 	method: 'GET',
// 	headers: { 'user-agent' : 'nodejs' }
// }

// const req = https.request(options, (res) => {
// 	let responseBody = ''

// 	res.once('data', (chunk) => console.log({ status: res.statusCode }) )
// 	res.on('data', (chunk) => responseBody += chunk )

// 	res.on('end', () => {
// 		fs.writeFile('./_user-0.json', responseBody, console.log )
// 	})
// })


// req.on('error', console.log)
// req.end()



// |----------[ Download image ]----------																															|

const options = {
	hostname: 'avatars.githubusercontent.com',
	port: 443,
	path: '/u/36861098?v=4',
	method: 'GET',
	headers: { 'user-agent': 'nodejs' }
}

const imageStream = fs.createWriteStream('./_avatar.png')

const req = https.request(options, (res) => {
	res.pipe(imageStream)

	res.on('end', () => console.log('avatar is downloaded.'))
})

req.on('error', console.log)
req.end()

