const readline = require('readline')
// console.log(readline)

const rl = readline.createInterface(process.stdin, process.stdout)
// console.log(rl)
const person = {
	name: '',
	says: []
}

rl.question('What is your name: > ', (answer) => {
	person.name = answer

	rl.setPrompt(`What say ${person.name}: > `) 			// 1. createPrompt
	rl.prompt() 																// 2. run that prompt
	// console.log(answer)
	// rl.on('line', (say) => { 										// 'line' is an event thich triger after every line/intput/question.
	// 	console.log(say)
	// })

	rl.on('line', (say) => { 										// this time it is loop with same question again and again.
		person.says.push(say)

		if(say === 'exit') return rl.close()
		rl.setPrompt('what else he says (type exit to exit): > ')
		rl.prompt()
	})
})


rl.on('close', () => {
	console.log(person)
})
