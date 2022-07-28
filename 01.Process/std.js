
// // ----------[ Example-1 ]----------

// process.stdout.write('What you type will be echo back: \n> ')

// process.stdin.on('data', (data) => {
// 	const output = `You typed: ${data}\n`

// 	process.stdout.write(output)
// 	process.stdout.write('> ')
// })


// // 	$ node std.js  			// =>  to close press 'ctrl + C'




// // ----------[ Example-2 ]----------

// process.stdout.write('What you type will be echo back: \n> ')

// process.stdin.on('data', (data) => {

// 	const output = `You typed: ${data}\n`

// 	// data = buffer => buffer.toString 	=> text
// 	if(data.toString().trim() === 'exit') return process.exit()

// 	process.stdout.write(output)
// 	process.stdout.write('> ')
// })





// ----------[ Example-3 ]----------

process.stdout.write('What you type will be echo back: \n> ')

process.stdin.on('data', (data) => {

	// data = buffer => buffer.toString 	=> text
	data = data.toString().trim()

	if(data === 'exit') return process.exit()

	if(data.endsWith('.txt')) {
		process.stdout.write(`handle file: ${data}\n`)

		return process.exit()
	}

	const output = `You typed: ${data}\n`
	process.stdout.write(output)
	process.stdout.write('> ')
})


process.on('exit', () => {
	console.log('Process is closed')
})

