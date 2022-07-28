
// ----------[ Environment Variable ]----------

/* What is Environment Variable ? And Why we need it ?
		- We can't add sensetive information into code it will show to any body.
			instead we will save those sensetive information into Hosting Server, and only use environment variable
			into code.

		like:
			. Dser credientials 		: username, password...
			. Database credentials 	: serverName, userName, userPassword, ...
			...

*/


// ----------[ How to access environment variable ]----------

// const { USER, HOME, SHELL  } = process.env || {}

// console.log({ USER, HOME, SHELL }) 		// => { USER: 'riajul', HOME: '/home/riajul', SHELL: '/bin/bash' }



// ----------[ How to Set environment variable ]----------

/* We can set environment variable multiple ways:

		Method-1: By Node Command

				$ node env.js 												: Run env.js file as regular way
				$ NODE_ENV=development node env.js 		: Run env file with setting environment variable

				// /env.js
				console.log( process.env.NODE_ENV ) 						// : => development


		Method-2: By package.json script:

			$ npm init -y

					/package.json
						{
						  "name": "01.Process",
						  "version": "1.0.0",
						  "main": "index.js",
						  "license": "MIT",

						  "scripts" : {
						  	"dev" : "NODE_ENV=development node env.js"
						  }
						}

					$ npm run dev 			// <== NODE_ENV=development node env.js


		Method-3: By 3rd party package: 'dotenv' 					// : we will see it in express server section.

*/
