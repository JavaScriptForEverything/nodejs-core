
## Node Modules


###### There are 3 type of modules:
	1. Built-in module			: Can directly use
	2. 3rd party module 			: Need to Download first
	3. user defined module 			: Custom module that user creates


###### We can use modules in our project in 2 ways:

	. CommonJS Module 			: require() |  exports / module.exports
	. ES6 Module 				: import 		| 	export



###### User Module 	vs 	built-in and 3rd-party Module
	- When we import built-in or 3rd-party module we just have to use module name in quote but
	  when we import user defined module we must have to add 'Relative Path' even from current directory.

	  Built-in Module import

	  	. const fs = require('fs') 			(CommonJS Style)
	  	. import fs from 'fs' 				(ES6 Module Style)


	  3rd-party Module import
	  	. const mongoose = require('mongoose')
	  	. import mongoose from 'mongoose'


	  User-Defined Module import
	  	. const myFunc = require('./util/myFunc')
	  	. import myFunc from './util/myFunc'



###### CommonJS Module import export styles

	Import Module:

		const path = require('path') 			: Import Entire module
		const { join } = require('path') 		:   " 	 join 	  " 	(Method-1)
		const join  = require('path').join 		:   " 	 join 	  " 	(Method-2)


	Export Module:


		modules.export = () => {...} 			: Export enire module as global/default module
		export.myFunc = () => {...} 			:   " 	 myFunc   as fixed name or name export
		modules.export = {  				:
			myFunc: () => {...}, 			: name export method-2
			...
		}




###### ES6 Module import export styles

	Import Module:

		import path from 'path' 			: Import Entire module
		import { join } from 'path' 			:   " 	 join 	  " 	(Method-1)
	//	import isEmail  from 'validation/isEmail' 	:   " 	 isEmail   " 	(Method-2)


	Export Module:


		export default = () => {...} 			: Export enire module called 'export default'
		export const myFunc = () => {...} 		:   " 	 myFunc   called 'named export'
		export default = {  				:
			myFunc: () => {...}, 			: name export method-2
			...
		}



###### Use ES6 Module style in node too by 2 ways:

	. Just add "type" : "module" 	in package.json file.

		. It automatically support import/export syntax,
		but for user defined import require file extentions too

		import myFunc from './myFunc' 			: => Throw Error
		import myFunc from './myFunc.js'  		: => OK


	. Use babel to support ES6 module in node: 		: This is the best way
		- Babel can be used many ways, here we only use with 'nodemon' tool.


	$ yarn install -D nodemon @bable/core @babel/node @babel/preset-env


	/package.json
		...
		"scripts": {
		  	"babel-node": "babel-node --presets='@babel/preset-env' --ignore='foo|bar|baz'",
		  	"dev:import": "nodemon --exec yarn babel-node -- index.js",
		  	"dev": "nodemon index.js"
		},
		"devDependencies": {
		    	"@babel/core": "^7.18.10",
		    	"@babel/node": "^7.18.10",
		    	"@babel/preset-env": "^7.18.10",
	    		"nodemon": "^2.0.19"
		}
		...


	$ yarn dev:import
