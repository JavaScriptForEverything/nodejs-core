# Understaning Node Process

Process Allow to create cli application:

	process
		.env 			: To read environment variable into our code
		.argv 			: To pass argument to node application from the terminal
		.exit() 		: To terminate node command
		.on('events', callback) : to handle errors

	.stdin 					:
		.on('data', (chunk) => {})
	.stdout 				:
		.write('')
		.pipe( writeStream )

		.stderr 			:


###### Common Topics

	. `process`
	. `process.env`
	. `process.argv`
	. `process.stdin`
	. `process.stdout`


###### Node Error Handing

	. `process.on`

