


// console.log( hello )

/* console.log( hello ) will throw ReferenceError:
		- Because we use hello as variable without defining yet

		This error terminate program immediately, but sometime in our program we need to catch error,
		so that it directly not terminate our application, we handle those error our self and when
		we need we will terminate when it need to.

		Now see the bellow example: How do we can handle error.

			NB: Handling error is little bit complicated topic, so for that we have to do in seperate section on it.
					here just show the use of `process` variables.

*/



// ----------[ Handle 'BLOCKING CODE' error ]----------


// must be before place to top of the file, so that it can handle error of bellow code
process.on('uncaughtException', (err) => {
	console.log(`handle 'BLOCKING CODE' error golbally: ${err.message}`)
})

// console.log( hello ) 		// => Throw uncaughtException type error




// ----------[ Handle 'NON-BLOCKING CODE' error ]----------

/* It dosn't matter where this error handle placed. before and after code.
   Non-Blocking Code always run after 'BLOCKING CODE' so it always catch Non-Blocking Rejection error
*/
process.on('unhandledRejection', (err) => {
	console.log(`handle 'NON-BLOCKING' error golbally: ${err.message}`)
})

Promise.reject( new Error('Hello rejextion Error') )




// ----------[ Summary ]----------

/*
		1. Handle Blocing Code Error by 		: try..catch block
		2. Handle Non-Blocing Code Error by : .catch(console.log)

				or 	in async Function with try..catch block
*/


