const fs = require('fs')
const http = require('http')

// ----------[ Download Image ]----------
// Make sure any local ISP server or localhost api has image, and use that url
// Im useing my local ISP which is http using protocol

// const options = {
// 	hostname: '172.16.50.10',
// 	port: 80,
// 	path: '/SAM-FTP-3/Anime%20%26%20Cartoon%20TV%20Series/Black%20Butler%20%28TV%20Cartoon%202008%E2%80%932014%29%201080p%20%5BDual%20Audio%5D/a11.jpg',
// 	method: 'GET'
// }

// const req = http.request(options, (res) => {
// 	const writeStream = fs.createWriteStream('./_image.jpg')
// 	res.pipe(writeStream)
// 	res.on('end', () => console.log('Image is downloaded') )
// })
// req.on('error', console.log)
// req.end()


// ----------[ Download Image ]----------

const app = http.createServer((req, res) => {
	res.writeHeader(200, { 'Content-Type': 'text/html' })

	res.end('Hello server')
})
app.listen(3000, () => console.log('Server is running on port 3000'))
