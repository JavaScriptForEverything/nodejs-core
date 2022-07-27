/*
There are 3 type of modules:
	1. Built-in module				: Can directly use
	2. 3rd party module 			: Need to Download first
	3. user defined module 		: Custom module that user creates


We can use modules in 2 ways:

	. CommonJS Module 	: require() |  exports / module.exports
	. ES5 Module 				: import 		| 	export



import module 1 of 2 ways:

	1. require('module-name') 		or 	import 'module-name'
	2. require('./module-name') 	or 	import './module-name'



----------[ CommonJS module system ]----------

		. export default  			: module.exports = () => {}
		. name export 					: exports.getUserById = () => {}
		. export entire file 		: const obj = {}


	Import module also 3 types:

			export default 				: const anyName = require('./fileName')

			name export:
					const { getUserById } = require('./fileName')
					const getUserById  = require('./fileName').getUserById
					const user  = require('./fileName')
								user.getUserById()

			export entire file 		: require('./fileName')


----------[ ES6 module system ]----------

		. export default  			: export default () => {}
		. name export 					: export const getUserById = () => {}
		. export entire file 		: const obj = {}


	Import module also 3 types:

			export default 				: import anyName from './fileName'

			name export:
					import { getUserById } from './fileName'
					import { * as user }  from './fileName'
								user.getUserById()

			export entire file 		: import './fileName'






*/

