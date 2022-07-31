const { sign } = require('jsonwebtoken')
const { serialize } = require('cookie')


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


/*
exports.addUser = catchAsync( async (req, res, next) => {
	const user = await User.create(req.body)

	if(!user) return next(appError('User.create() operation failed'))

	res.status(201).json({
		status: 'success',
		user
	})
}) */
exports.catchAsync = (fn) => (req, res, next) => fn(req,res, next).catch(next)




// const token = generateToken(user._id)
exports.generateToken = (_id) => {
	return sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
}

// setCookie(res, token)
// setCookie(res, token, 60*60*24*30) 	// Same as default
// setCookie(res, token, 0) 						// expires cookie
exports.setCookie = (res, token, date=60*60*24*30) => {

	res.setHeader('Set-Cookie', serialize('token', token, {
		path: '/',
		maxAge: date,
		// expires: new Date( Date.now() + 1000*60*60*24*30 ), 	// 1 month future

		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'none'	 // allow for CORS, to send cookie for this option 'secure' flag must be set
	}))
}
