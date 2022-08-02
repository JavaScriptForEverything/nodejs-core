const path = require('path')
const fs = require('fs')

const User = require('../models/userModel')
const { appError, catchAsync, generateToken, setCookie, deleteFile } = require('../util')




// GET 	/api/users/ 			=>  /routes/userRoute.js
exports.getUsers = catchAsync( async (req, res, next) => {
	const users = await User.find().select({ password: false })

	res.status(200).json({
		status: 'success',
		count: users.length,
		users
	})
})


// POST 	/api/users/
exports.addUser = async (req, res, next) => {

	try {
		// prevent user to update: 	user.role = 'admin'
		const body = { ...req.body, role: undefined }

		const user = await User.create(body)
		if(!user) return next(appError('User.create() operation failed'))

		user.password = undefined 			// hide user password

		res.status(201).json({
			status: 'success',
			message: 'signup complete, please login first'
		})

	} catch (err) {

		const image = path.join(__dirname, '..', 'public', req.body.avatar.secure_url)

		const isExists = fs.existsSync(image)
		if(isExists) fs.unlink(image, () => next(appError(err.message)) )
	}
}


// GET 	/api/users/:userId
exports.getUserById = catchAsync( async (req, res, next) => {

	const user = await User.findById(req.params.userId)
	if(!user) return next(appError('No user Found', 404))

	user.password = undefined

	res.status(200).json({
		status: 'success',
		user
	})
})



// PATCH 	/api/users/:userId
exports.updateUserById = catchAsync( async (req, res, next) => {
	const { role } = req.body

	// filter body
	const body = {
		...req.body,
		password: undefined, 												// only update password by save method, to hash password
		role: role === 'admin' ? role : undefined 	// don't allow user to be admin by updating role
	}

	const errorMessage = 'Please use "/users/update-my-password" route to update password.'
	if(req.body.password) return next(appError(errorMessage, 400))


	const user = await User.findByIdAndUpdate(req.params.userId, body, {
		new: true,
		runValidators: true
	})

	if(!user) return next(appError('No user Found', 404))
	user.password = undefined

	// delete old image after added new one
	deleteFile(next, req.user.avatar.secure_url)

	res.status(201).json({
		status: 'success',
		user
	})
})




// DELETE 	/api/users/:userId
exports.removeUserById = catchAsync( async (req, res, next) => {

	const user = await User.findByIdAndDelete(req.params.userId)
	if(!user) return next(appError('You are not loged in user', 404))

	// delete old image after added new one
	deleteFile(next, user.avatar.secure_url)

	generateToken(user.id, 0) 		// Force user to relogin by expire token
	setCookie(res, '', 0)  				// remove cookie

	res.sendStatus(204)
})






