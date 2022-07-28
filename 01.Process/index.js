// console.log(process)
// console.log(process.version)

// const { platform, arch } = process || {}
// console.log({ platform, arch })

// console.log(process.cwd())



// ----------[ Basic operations ]----------

/*
		process
			.version 					: $ node -v

			.platform
			.arch
			.cwd()

			.env 							: To read environment variable into our code
				.HOME
				.USER
				.SHELL
				.PWD 						: <== process.cwd()
				.LANGUAGE
				.LOGNAME


			.argv 						: To use node as unix tool, to pass argument to node application from the terminal


			.exit() 										: To terminate node command
			.on('events', callback 			: to handle errors

			.stdin 						:
				.on('data', (chunk) => {})

			.stdout 					:
				.write('')
				.pipe( writeStream )

			.stderr 					:

*/

