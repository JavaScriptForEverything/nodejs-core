const fs = require('fs')
const https = require('https')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Hello world'
	})
})

const options = {
	key: fs.readFileSync('./ssl/cert.key'),
	cert: fs.readFileSync('./ssl/cert.crt')
}
const server = https.createServer(options, app)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server is running on port: https://localhost:${PORT}`))


/*
	$ yarn add -D mkcert 													: install mkcert package
	$ yarn create-ca 	&& 	yarn create-cert				: generate recuire files

	$ node https-express 													: Run express app as https protocol
*/
