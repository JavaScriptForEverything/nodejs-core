const { appError } = require('../util')


/*
const appError = (message='', statusCode=500, status='') => {
	const error = new Error(message)

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'error' : 'failed'
	error.statusCode = statusCode

	return error
}

// handle unhandled routes
app.all('*', (req, res, next) => {
	// res.status(404).json({
	// 	status: 'failed',
	// 	message: `${req.originalUrl} route not exits`
	// })

	// next(new Error('Error By me'))
	next( appError(`'${req.originalUrl}' route not exits`, 404, 'NotFound') )
})
*/


// /app.js 	=> 	app.all('*', errorController.unhandledRouteHandler )
exports.unhandledRouteHandler = (req, res, next) => {
	next( appError(`'${req.originalUrl}' route not exits`, 404, 'NotFound') )
}

/* 	HANDLE GLOBAL ERRORS: comes from
			. throw by any where in express app or
			. user thrown by 	`next( appError('error message') )` */
// eslint-disable-next-line
exports.globalErrorHandler = (err, req, res, next) => {

	res.status(err.statusCode || 500).json({
		status: err.status,
		message: err.message,
		error: {
			...err,
			stack: err.stack
		}
	})

}




