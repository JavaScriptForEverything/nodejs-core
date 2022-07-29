# Develop Express app on **HTTPS** protocol on localhost

<div style="display: flex; justify-content: center">
<img
	width='45%'
	src='https://github.com/JavaScriptForEverything/https-express-app/blob/master/public/https-express-1.png'
/>
<img
	width='45%'
	src='https://github.com/JavaScriptForEverything/https-express-app/blob/master/public/https-express-2.png'
/>
<div>


###### Key topics

	. https.request
	. https.createServer
	. https-express Server
	. https-express WebSocket Server





### Clone this repository

	$ yarn install 				: install all dependencies & devDependencies
	$ yarn create-ca 			: Generate Certificate Authority files
	$ yarn create-cert 			: Generate Local User Certificate files
	$ yarn dev 				: To Run as development mode

	$ yarn start 				: To Run as production  mode


### Check in Browser

	. https://localhost:8080 		: use **HTTPS**, instead of **HTTP**



###### package.json

	{
	  "name": "https-express",
	  "version": "1.0.0",
	  "main": "server.js",
	  "license": "MIT",
	  "scripts": {
	    "create-ca": "mkcert create-ca",
	    "create-cert": "mkcert create-cert ",

	    "dev": "nodemon .",
	    "start": "NODE_ENV=production node ."
	  },
	  "dependencies": {
	    "dotenv": "^16.0.1",
	    "express": "^4.18.1"
	  },
	  "devDependencies": {
	    "mkcert": "^1.5.0",
	    "nodemon": "^2.0.19"
	  }
	}


###### /app.js

	const express = require('express')

	const app = express()

	app.use(express.json('200k'))

	app.get('/', (req, res, next) => {
		res.status(200).json({ status: 'success', message: 'HTTPS access' })
	})

	module.exports = app


###### /server.js

	require('dotenv').config()
	const https = require('https')
	const fs = require('fs')
	const app = require('./app')


	const PORT = process.env.PORT || 4430  		// 443 => 4430
	const options = {
		key: fs.readFileSync('./ssl/cert.key'),
		cert: fs.readFileSync('./ssl/cert.crt'),
	}

	const server = https.createServer(options, app)

	server.listen(PORT, () => console.log(`Server is running on 'HTTPS' protocol on port: ${PORT}`) )



###### Trust in Browser: (For Firefox):
	. Preferences -> Privacy & Security -> View Certificates
	. choose (Authorities) Tab > import > ca.crt




# Method-2: Here is the steps explain everything.

###### **Step-0:** install `mkcert` library globally

	**$** `npm install mkcert` 		: (windows)
	**$** `sudo npm install mkcert` 	: (Linux or Mac)


###### **Step-1:** Create who will check certificate

	**$** `mkcert create-ca` 		: => ca.key 	ca.crt


###### **Step-2:** create local certificate, which will enable our application on localhost to be 'secure'

	**$** `mkcert create-cert` 		: => cert.key 	cert.crt


###### **Step-3:** move cert.key cert.crt (in step-2) to our project directory

	const https = require('https')
	const fs = require('fs')
	const express = require('express')

	const app = express()
	app.use(express.json('200k'))
	app.get('/', (req, res, next) => res.status(200).json({ status: 'success' }))

	const options = {
	  key: fs.readFileSync('./cert.key'),
	  cert: fs.readFileSync('./cert.crt'),
	}
	const server = https.createServer(options, app)
	server.listen(8080, () => console.log(`HTTPS server started on port 8080`) )
