
process.stdin.on('data', (chunk) => {

	console.log(chunk) 								// => <Buffer 6f 6b 0a>
	console.log(chunk.toString()) 		// => ok

})

// $ node buffer.js 		// after type ok in terminal


// ----------[ Buffer ]----------


/* What is Buffer ?
		- in the example on top we can see user add 'ok' but node console.log() 	as <Buffer >

		So when we read or write data from or to disk or memory, we actually dealing with binary code,
		that binary code is called 'Buffer'.

		We can't write 'text' file into hard disk or send data over network, for that we must convert that
		data into binary, and binary is nothing but electronic signal or palse, based on that signal,
		other end electronics device convert those signal as binary data.

		That Binary data is nothing but 0s and 1s, which is not suitable for human readable so
		we encode that binary data into multiple format, which make file type.

		like:
			.txt 			: Text File 	(Human Readable Text)
			.png ... 	: image viewer encode that file into color code: RGB, CMYK... what show colors => Image


		Summary:
			. Buffer is nothing but binary data, which can be or can not be encoded. for human readability.
			. if data is encoded then we have to deencoded to binary for process or save into hard disk.
			. if data is deencoded then we have to encoded to make human readability
*/


// ----------[ Examples ]----------

const fs = require('fs')

// // Example-1: Read File as Buffer

// const file = fs.readFileSync('./todo.txt')
// console.log(file) 														// => <Buffer />



// // Example-2: Read File as utf-8 encoding which is plain text.

// // while reading file as buffer, immediately encode into utf-8 so that user can see as text file.
// const file = fs.readFileSync('./todo.txt', 'utf-8')
// console.log(file) 														// => Text File


// Example-3: Read File as Buffer then covert to text

// while reading file as buffer, immediately encode into utf-8 so that user can see as text file.
const file = fs.readFileSync('./todo.txt')
console.log(file.toString('utf-8')) 						// => Text File
console.log(file.toString()) 										// => default is utf-8


				/* Don't Be confusing .toString('utf-8') in javascript,

						str.toString() 							// Seperate method of String instance object
						num.toString() 							// Seperate method of Number instance object
						buffer.toString() 					// Seperate method of Buffer instance object

					They looks like same, but thay not do the same functionality for every methods.

					When I was learning javascript, I thought .toString() is the same method,
					and that makes me confused for a long ime
				*/




