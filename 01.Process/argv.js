// console.log(process.argv)
// // $ node argv.js 	--delete 				// run this command and get the bellow output

/* output:
	[
	  '/usr/bin/node',
	  '/home/riajul/Desktop/nodejs-core/01.Process/argv.js',
	  '--delete'
	]
*/





// ----------[ Arguments Variable ]----------

/* What is Arguments Variable ? And Why we need it ?
		- When we want to run any node command as regular unix command. Like:

			. Reading File,
			. Save data into database from our demo file,
			. ...

			In short: we can use node as a tool not just our web application handler.
*/


// ----------[ Use node as unix tool ]----------

// It is a demo example. Our realworld example will be shown when we complete the 'fs' module.

const [,, arg ] = process.argv

// [1]
if(arg === '--delete') {
	console.log('handle delete operation here')
	process.exit()
}

// [2]
if(arg === '--import') {
	console.log('handle import operation here')
	process.exit()
}

// [3]
console.log('Read the file here or do something else ')



/*
		$ node argv.js 							=> show the [3] message
		$ node argv.js --delete			=> show the [1] message
		$ node argv.js --import			=> show the [2] message

*/

