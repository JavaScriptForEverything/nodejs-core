const timeoutTime = 3000
const intervalTime = 500

let time = 0


// process.stdout.clearLine()
// process.stdout.cursorTo(0)


const interval = setInterval(() => {
	time += intervalTime
	console.log( `Time: ${time / 1000}` )
}, [intervalTime])

setTimeout(() => {
	clearInterval(interval)
	console.log('done')
}, [timeoutTime])
