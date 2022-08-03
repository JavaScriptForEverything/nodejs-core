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

	// Step-1: Mongoose Error
	// name always have, though it not shows as property, but used into error message
	if( err.name === 'CastError' ) err = appError('Invalid ObjectId', 400, 'CastError')
	if( err.message.startsWith('E11000') ) err = appError(err.message, 400, 'DuplicateError')
	if( err.message.match(/validation/i) ) err = appError(err.message, 403, 'ValidationError')

	// Step-2: JsonWebToken Error
	if( err.name === 'JsonWebTokenError' ) err = appError(err.message, 400, 'JsonWebTokenError')
	if( err.name === 'TokenExpiredError' ) err = appError(err.message, 403, 'TokenExpiredError')


	// If in production then send clean message
	if(process.env.NODE_ENV === 'production') return res.status(err.statusCode || 500).json({
			status: err.status,
			message: err.message,
		})


	// If in development then send error stock too to make debuging process lot more easier.
	res.status(err.statusCode || 500).json({
		status: err.status,
		message: err.message,
		error: {
			...err,
			stack: err.stack
		}
	})

}




