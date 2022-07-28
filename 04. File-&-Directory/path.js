const path = require('path')

let result = ''
		result = __dirname 								// => ~/../project_root
		result = __filename
		result = path.join('a', 'b') 					// => a/b
		result = path.resolve('a', 'b') 			// => ${__dirname}/a/b

		result = path.isAbsolute('a/b') 			// => false
		result = path.isAbsolute(__dirname) 	// => true
		result = path.isAbsolute('/home') 		// => true 		(System User: home, which is definately absolute path)

		result = path.resolve('a', 'b') 			// => ${__dirname}/a/b
		result = path.resolve('a', '/b') 			// => /b


//		NB: path.resolve() little bit weide so always use path.join(__dirname, '..') without any problem.
// console.log({ result })




const getObjectFromPath = path.parse(__dirname)
console.log({ getObjectFromPath })

const getPathFromObject = path.format(getObjectFromPath)
console.log({ getPathFromObject })


