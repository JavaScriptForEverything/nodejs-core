const { promisify } = require('util')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')


//--------------[ Reading File ]-------------------

// Method-1: Read As Synchronously
// const file = fs.readFileSync('./todo.txt', 'utf-8')
// console.log(file)

// Method-2: Read Asynchronously in callback way
// fs.readFile('./todo.txt', 'utf-8', (err, file) => {
// 	console.log(file)
// })


// Method-3: Read Asynchronously in promise way
// const fn = async () => {
// 	const file = await promisify(fs.readFile)('./todo.txt', 'utf-8')
// 	console.log(file)
// }
// fn()


// Method-4: Read Asynchronously in promise way
// const fn = async () => {
// 	const file = await fsPromises.readFile('./todo.txt', 'utf-8')
// 	console.log(file)
// }
// fn()

//--------------[ Writing to File ]-------------------

// // const data = 'A Quick Brown Fox Jumps over the lazy dog'
// const data = {
// 	user: {
// 		name: 'Riajul Islam',
// 		age: 28,
// 		procession: 'Web Developer'
// 	},
// 	message: 'A Quick Brown Fox Jumps over the lazy dog'
// }


// Method-1: write to a File As Synchronously
// fs.writeFileSync('_file1.txt', data)


// Method-1.1: write to a File As Synchronously, Only String value can be write
// fs.writeFileSync('_file1.txt', JSON.stringify(data, null, 2))


// Method-2: Writing to a File Asynchronously in callback way
// fs.writeFile('./_file1.txt', JSON.stringify(data, null, 2), (err) => {
// 	console.log(err)
// })


// Method-3: Writing to a File Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.writeFile)('./_file2.txt', JSON.stringify(data, null, 2))
// }
// fn()


// Method-4: Writing to a File Asynchronously in promise way
// const fn = async () => {
// 	await fsPromises.writeFile('./_file1.txt', JSON.stringify(data, null, 2))
// }
// fn()


//--------------[ Appending to File ]-------------------

// const data = {
// 	user: {
// 		name: 'Riajul Islam',
// 		age: 28,
// 		procession: 'Web Developer'
// 	},
// 	message: 'A Quick Brown Fox Jumps over the lazy dog'
// }

// Method-1: append to a File As Synchronously
// fs.appendFileSync('./_file1.txt', JSON.stringify(data, null, 2))

// Method-2: append to a File Asynchronously in callback way
// fs.appendFile('./_file1.txt', JSON.stringify(data, null, 2), (err, data) => {
// 	console.log(data)
// })


// Method-3: Writing to a File Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.appendFile)('./_file2.txt', JSON.stringify(data, null, 2))
// }
// fn()


// Method-4: Writing to a File Asynchronously in promise way
// const fn = async () => {
// 	await fsPromises.appendFile('./_file1.txt', JSON.stringify(data, null, 2))
// }
// fn()


//--------------[ Deleting File ]-------------------

// fs.writeFileSync('_file2.txt', 'data')


// Method-1: Removing a File As Synchronously
// fs.unlinkSync('./_file2.txt')

// Method-2: Removing a File Asynchronously in callback way
// fs.unlink('./_file2.txt', console.log)


// Method-3: Removing a File Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.unlink)('./_file2.txt').catch(console.log)
// }
// fn()


// Method-4: Removing a File Asynchronously in promise way
// const fn = async () => {
// 	await fsPromises.unlink('./_file1.txt').catch(console.log)
// }
// fn()



//--------------[ Check File ]-------------------

// const file = './_file2.txt'
// fs.writeFileSync(file, 'data')


// Method-1: check a File As Synchronously
// const isExists = fs.existsSync(file)
// console.log(isExists)

// Method-2: check a File Asynchronously in callback way
// fs.exists(file, (isExist) => console.log(isExist))
// fs.exists(file, console.log)


// Method-3: check a File Asynchronously in promise way
// const fn = async () => {
// 	const isExists = await promisify(fs.exists)(file)
// 	console.log(isExists)
// }
// fn()


// Method-4.1: Delete file only if file exists
// fs.exists(file, (isExist) => {
// 	// fs.unlink(file, console.log)
// 	if(isExist) fs.unlink(file, console.log)
// })


// Method-4.2: Delete file only if file exists
// const fn = async () => {
// 	const isExists = await promisify(fs.exists)(file)

// 	// Method-1:
// 	// if(isExists) fs.unlink(file, console.log)

// 	// Method-2:
// 	// await promisify(fs.unlink)(file).catch(console.log)

// 	// Method-3:
// 	if(isExists) await promisify(fs.unlink)(file)

// }
// fn()



//--------------[ Rename File ]-------------------

// // fs.writeFileSync(oldFile, 'data')
// const oldFile = '_file2.txt'
// const newFile = '_file3.txt'


// Method-1: Rename a File As Synchronously
// fs.renameSync(oldFile, newFile)

// Method-2: Rename a File Asynchronously in callback way
// fs.rename(oldFile, newFile, console.log)


// Method-3: Rename a File Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.rename)(oldFile, newFile).catch(console.log)
// }
// fn()


// Method-4: Rename file only if file exists
// const fn = async () => {
// 	// Method-1:
// 	// await fsPromises.rename(oldFile, newFile).catch(console.log)

// 	// Method-2:
// 	const isExists = await promisify(fs.exists)(oldFile)
// 	if(isExists) await fsPromises.rename(oldFile, newFile)
// }
// fn()



//--------------[ List status of File/Directory ]-------------------

// const isDirectory = fs.lstatSync(__dirname)
// console.log(isDirectory)

// fs.lstat(__dirname, console.log)

// const fn = async () => {
// 	const file = await fsPromises.lstat(__dirname)
// 	console.log(file)

// 	const file = await fsPromises.lstat( path.join(__dirname, 'demo.js') )
// 	console.log(file)
// }
// fn()


// const fn = async () => {
// 	const file = await fsPromises.lstat( path.join(__dirname) )
// 	const isDirectory = file.isDirectory()

// 	console.log({ isDirectory })
// }
// fn()


//--------------[ Read Directories ]-------------------

// Method-1: Read As Synchronously
// const files = fs.readdirSync(__dirname)
// console.log(files)

// Method-2: Read Asynchronously in callback way
// fs.readdir(__dirname, (err, files) => {
// 	console.log(files)
// })


// Method-3: Read Asynchronously in promise way
// const fn = async () => {
// 	const files = await promisify(fs.readdir)(__dirname)
// 	console.log(files)
// }
// fn()


// Method-4: Read Asynchronously in promise way
// const fn = async () => {
// 	const files = await fsPromises.readdir(__dirname)
// 	console.log(files)
// }
// fn()


// Method-4: Read Files and Directory seperately.
// const fn = async () => {
// 	const files = await fsPromises.readdir(__dirname)
// 	files.map(file => {
// 		const isDirectory = fs.lstatSync( path.join(__dirname, file) ).isDirectory()
// 		if(isDirectory) return console.log('Directory: ', file)

// 		console.log('File: ', file)
// 	})
// }
// fn()


// // Method-4: Read Files and Directory seperately.
// const fn = async () => {
// 	const files = await fsPromises.readdir(__dirname)

// 	// Synchronous Way
// 	files.map( async(file) => {
// 		const fileStatus = fs.lstatSync( path.join(__dirname, file) )
// 		const isDirectory = fileStatus.isDirectory()

// 		if(isDirectory) return console.log('Directory: ', file)

// 		console.log('File: ', file)
// 	})


// 	// // Asynchronous Way
// 	// files.map( async(file) => {
// 	// 	const fileStatus = await fsPromises.lstat( path.join(__dirname, file) )
// 	// 	const isDirectory = fileStatus.isDirectory()

// 	// 	if(isDirectory) return console.log('Directory: ', file)

// 	// 	console.log('File: ', file)
// 	// })
// }
// fn()


//--------------[ Create Directories ]-------------------

// Method-1: Create As Synchronously
// fs.mkdirSync('./demo1')


// Method-2: Read Asynchronously in callback way
// fs.mkdir('./demo2', console.log)


// Method-3: Read Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.mkdir)('./demo3').catch(console.log)
// }
// fn()


// Method-4: Read Asynchronously in promise way
// const fn = async () => {
// 	await fsPromises.mkdir('./demo4').catch(console.log)
// }
// fn()



// // Method-1.1: Create As Synchronously, if exists then remove
// const dir = './demo1'
// const isExists = fs.existsSync(dir)
// if(isExists) fs.rmSync(dir, { recursive: true })
// fs.mkdirSync(dir)


// // Method-1.2: Create As Asynchronously, if exists then remove
// const fn = async () => {
// 	const dir = './demo2'
// 	const isExists = fs.existsSync(dir)

// 	if(isExists) await fsPromises.rm(dir, { recursive: true })
// 	await fsPromises.mkdir(dir)
// }
// fn()



//--------------[ Delete Directories ]-------------------

// Method-1: Read As Synchronously
// fs.rmSync('./demo1', { recursive: true })

// Method-2: Read Asynchronously in callback way
// fs.rm('./demo3', { recursive: true }, console.log)


// Method-3: Read Asynchronously in promise way
// const fn = async () => {
// 	await promisify(fs.rm)('./demo3', { recursive: true }).catch(console.log)
// }
// fn()


// Method-4: Read Asynchronously in promise way
// const fn = async () => {
// 	await fsPromises.rm('./demo4', { recursive: true }).catch(console.log)
// }
// fn()





