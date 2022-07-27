const fs = require('fs')
const stream = require('stream')

const writeToFile = '_writeStream.txt'
const readFromFile = './data/bigFile.txt'

const readStream = fs.createReadStream(readFromFile, 'utf-8')
const writeStream = fs.createWriteStream(writeToFile)

const upperCase = new stream.Transform({
	transform: (chunk, encoding, callback) => {
		const modifiedChunk = chunk.toString().toUpperCase()

		// arg1: err, 	arg2:	data 	which will be pass to next writeStream
		callback(null, modifiedChunk)
	}
})

readStream
	.pipe(upperCase)
	.pipe(writeStream)

// stream.pipeline(
// 	readStream,
// 	upperCase,
// 	writeStream,
// 	console.log
// )
