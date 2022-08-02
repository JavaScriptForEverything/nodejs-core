const { verify, sign } = require('jsonwebtoken')
const { parse } = require('cookie')
const { isEmail } = require('validator')

const User = require('../models/userModel')
const Product = require('../models/productModel')
// const Review = require('../models/reviewModel')

const { appError, catchAsync, generateToken, setCookie, sendMail } = require('../util')


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



// exports.restrictToUser = (field) => async (req, res, next) => {
// 	const { userId } = req.user
// 	let doc = ''

// 	if(field === 'users') doc = await Review.findById(req.params.reviewId)
// 	if(field === 'products') doc = await Product.findById(req.params.productId)

// 	if(!doc) return next(appError('No document found', 404))

// 	if( doc.user.toHexString() !== userId ) {
// 		next(appError(`this route is protected by user: ${userId}`, 403))
// 	}

// 	next()
// }






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




/*
router
	.use(authController.protect)
	.patch('/update-my-password', authController.updateMyPassword) */
exports.updateMyPassword = catchAsync( async (req, res, next) => {
	const { password, confirmPassword, currentPassword } = req.body || {}

	const requireFields = ['currentPassword', 'password', 'confirmPassword']

	// check required fields supplied or not
	requireFields.forEach(field => {
		if(!req.body[field]) next(appError(`'${field}' field is required`))
	})

	// check confirmPassword here because we will disable schema validation.
	if(password !== confirmPassword) return next(appError('confirmPassword is mismatched'))
	if(password === currentPassword) return next(appError('please use new password to update'))


	const user = req.user  			// comes from 	.use(authController.protect) middleware

	// check is new password or old one
	const isAuthenticated	= await user.authenticateUser(currentPassword)
	if(!isAuthenticated) return next(appError('currentPassword is incorrect'))

	user.password = password
	user.confirmPassword = undefined 					// very importent: it save password as plain text

	const updatedUser = await user.save({ validateBeforeSave: false })
	updatedUser.password = undefined


	// reset token and logout user
	generateToken(user.id, 0) 	// Force user to relogin by expire token
	setCookie(res, '', 0) 			// logout current User

	res.status(201).json({
		status: 'success',
		message: 'password is changed please re-login with new credientials'
	})
})



// router.post('/password-reset-token', authController.generatePasswordResetToken)
exports.generatePasswordResetToken = async (req, res, next) => {
	const { email } = req.body || {}

	if(!email) return next(appError('email field is required'))
	if(!isEmail(email)) return next(appError(`invalid email address: ${email}`))

	const resetToken = await sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '20m' })

	await sendMail(next)({
		from: 'javascriptForEverything@gmail.com',
		to: email,
		subject: 'PasswordResetToken',
		text: resetToken
	})

	res.status(201).json({
		status: 'success',
		message: `token is send to your mail at: '${email}' (token expires in 10 min)`
	})
}


// this route comes after 'password-reset-token'
// router.patch('/reset-password', authController.resetPassword)
exports.resetPassword = catchAsync( async (req, res, next) => {
	const { password, confirmPassword, token } = req.body || {}

	const requireFields = ['token', 'password', 'confirmPassword']

	// check required fields supplied or not
	requireFields.forEach(field => {
		if(!req.body[field]) next(appError(`'${field}' field is required`))
	})

	// check confirmPassword here because we will disable schema validation.
	if(password !== confirmPassword) return next(appError('confirmPassword is mismatched'))

	const { email } = await verify(token, process.env.TOKEN_SECRET)
	if( !email ) return next(appError('resetToken Error'))

	const user = await User.findOne({ email })
	if( !user ) return next(appError(`No user found by ${email}`))


	// // check is new password or old one
	// const isAuthenticated	= await user.authenticateUser(currentPassword)
	// if(isAuthenticated) return next(appError('current password is your original password'))

	user.password = password
	user.confirmPassword = undefined 					// very importent: it save password as plain text

	const updatedUser = await user.save({ validateBeforeSave: false })
	updatedUser.password = undefined


	// reset token and logout user
	generateToken(user.id, 0) 	// Force user to relogin by expire token
	setCookie(res, '', 0) 			// logout current User


	res.status(201).json({
		status: 'success',
		message: 'password is reseted please re-login with new credientials'
	})
})
