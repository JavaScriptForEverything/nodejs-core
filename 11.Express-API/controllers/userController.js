const User = require('../models/userModel')
const { appError, catchAsync } = require('../util')



// GET 	/api/users/ 			=>  /routes/userRoute.js
exports.getUsers = catchAsync( async (req, res, next) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		count: users.length,
		users
	})
})


// POST 	/api/users/
exports.addUser = catchAsync( async (req, res, next) => {
	const user = await User.create(req.body)
	if(!user) return next(appError('User.create() operation failed'))

	res.status(201).json({
		status: 'success',
		user
	})
})


// GET 	/api/users/:userId
exports.getUserById = catchAsync( async (req, res, next) => {

	const user = await User.findById(req.params.userId)
	if(!user) return next(appError('No user Found', 404))

	res.status(200).json({
		status: 'success',
		user
	})
})


// PATCH 	/api/users/:userId
exports.updateUserById = catchAsync( async (req, res, next) => {

	// filter body
	const body = {
		...req.body,
		password: undefined, 			// only update password by save method, to hash password
		role: undefined 					// don't allow user to be admin by updating role
	}

	const errorMessage = 'Please use "/users/update-my-password" route to update password.'
	if(req.body.password) return next(appError(errorMessage, 400))


	const user = await User.findByIdAndUpdate(req.params.userId, body, {
		new: true,
		runValidators: true
	})

	if(!user) return next(appError('No user Found', 404))

	res.status(201).json({
		status: 'success',
		user
	})
})




// DELETE 	/api/users/:userId
exports.removeUserById = catchAsync( async (req, res, next) => {

	const user = await User.findByIdAndDelete(req.params.userId)
	if(!user) return next(appError('You are not loged in user', 404))

	// remove cookie
	res.sendStatus(204)
})
