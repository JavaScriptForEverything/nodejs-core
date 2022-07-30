/* Throw Error by this way: 		Which will be handled by global Error Handler.
		next( appError('Route not found') )
		next( appError('Route not found', 404) )
		next( appError('Route not found', 404, 'NotFound') ) */
exports.appError = (message='', statusCode=500, status='') => {
	const error = new Error(message)

	// this way status value not added but why ?
	// error.status = status || `${statusCode}`.startsWith(4) ? 'error' : 'failed'

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'error' : 'failed'
	error.statusCode = statusCode

	return error
}

