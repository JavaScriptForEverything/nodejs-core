const { verify } = require('jsonwebtoken')
const { parse } = require('cookie')

const User = require('../models/userModel')
const Product = require('../models/productModel')

const { appError, catchAsync, generateToken, setCookie } = require('../util')


// .get(authController.protect, userController.getUsers)
exports.protect = catchAsync( async (req, res, next) => {
	const { token } = parse(req.headers.cookie || '')
	if(!token) return next(appError('Please login first', 403))

	const { id } = verify(token, process.env.TOKEN_SECRET)

	const user = await User.findById(id)
	req.user = user
	req.user.userId = user.id

	next()
})


exports.protectedByAdmin = (req, res, next) => {
	if(req.user.role !== 'admin') return next(appError(`this route only accessable via admin user`, 403))

	next()
}


/* 	router.use(authController.protect) 						// req.user = user
		PATCH / DELETE 	/api/products/:productId 			// req.params.productId */
exports.restrictToUser = async (req, res, next) => {
	const { userId } = req.user

	const product = await Product.findById(req.params.productId)
	if(!product) return next(appError('No product found', 404))

	if( product.user.toHexString() !== userId ) {
		next(appError(`this route is protected by user: ${userId}`, 403))
	}

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
	const token = generateToken(user.id)
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


/* router
		.use(authController.protect) 									// add user in req.user
		.get( '/me',
			authController.me, 													// req.params.userId = req.user._id
			userController.getUserById 									// User.findById(userId)
		)*/
exports.me = (req, res, next) => {
	req.params.userId = req.user.id

	next()
}

exports.updateMe = (req, res, next) => {
	req.params.userId = req.user.id

	next()
}


/* router
		.use(authController.protect) 									// add user in req.user
		.delete('/delete-me',
			authController.deleteMe,  									// req.params.userId = req.user._id
			userController.removeUserById 							// User.findByIdAndDelete(userId,...)
		) */
exports.deleteMe = (req, res, next) => {
	req.params.userId = req.user.id

	next()
}



