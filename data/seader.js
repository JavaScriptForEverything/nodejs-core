const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')


const filename = path.join(__dirname, '_bigRandomFile.txt')
const largeFileGenerator = `tr -dc "A-Za-z 0-9" < /dev/urandom | fold -w100|head -n 100000 > ${filename}`


const [,, arg ] = process.argv

	// Delete file large generated file
if(arg === '--delete') return fs.unlink(filename, (err) => {
	if(err) return console.log(err)
	console.log(`file deleted successfully`)
})


// Generate BigFile around 10 mb
if(arg === '--generate') return exec(largeFileGenerator, (err) => {
	if(err) return console.log(err)
	console.log(`file generated successfully`)
})


const isExists = fs.existsSync(filename)
if(isExists) {
	const file = fs.readFileSync(filename, 'utf-8')
	console.log(file)

	return
}

console.log('No file to read')

