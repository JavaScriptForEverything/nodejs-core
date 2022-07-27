const questions = [
	'What is your name ?',
	'What is your hobby ?',
	'Which programming Language you prefere to learn ?'
]

const answers = [] 			// to save answers into it, after every question, by user feedback



// Step-1: Ask first Question
process.stdout.write(questions[0])
process.stdout.write(' > ')

// Step-2: Get the anser of the 1st question
process.stdin.on('data', (chunk) => {
	// Step-3: Save answer to answers array
	answers.push( chunk )

	// Step-4: Check is any more answers left or not, if have then ask next question
	if( answers.length < questions.length ) {
		const nextQuestion = questions[ answers.length ]
		const mustBeString = `${nextQuestion}` 							// else throw Error

		process.stdout.write(mustBeString)
		process.stdout.write(' > ')

	} else {
		// Step-5: If no questions left then close the program.
		process.exit()

	}
})


// Step-last: When try to exit, do something
process.on('exit', () => {
	process.stdout.write( answers.toString() )
})

