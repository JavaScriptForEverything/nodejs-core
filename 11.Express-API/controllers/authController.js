const { parse } = require('cookie')

const User = require('../models/userModel')
const { appError, catchAsync, generateToken, setCookie } = require('../util')


// .get(authController.protect, userController.getUsers)
exports.protect = (req, res, next) => {
	const { token } = parse(req.headers.cookie || '')
	if(!token) return next(appError('Please login first', 403))

	next()
}


// POST 	/api/users/login
exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	if(!email || !password) return next(appError('email and password Field is required'))

	const user = await User.findOne({ email }).select('password')
	if(!user) return next(appError('No user Found', 404))

	const isAuthenticated = await user.authenticateUser(password)
	if(!isAuthenticated) return next(appError('email or password is incorrect', 403))

	// Generate token and setCookie
	const token = generateToken(user._id)
	setCookie(res, token)

	res.status(201).json({
		status: 'success',
		message: 'Login success',
		// token need in mobile app'
		token : process.env.API === 'mobile' ? token : undefined
	})

})


// POST 	/api/users/logout
exports.logout = (req, res, next) => {
	// const user = await User.create()

	setCookie(res, '', 0) 	// 0: expires by setting: maxAge: 0

	res.status(201).json({
		status: 'success',
		message: 'logout complete'
	})
}

// POST 	/api/users/signup 	//
exports.signup = (req, res, next) => {
	// const user = await User.create()
	res.status(201).json({
		status: 'success',
		message: 'signup complete, please login first'
	})
}
