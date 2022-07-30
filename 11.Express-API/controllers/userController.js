const User = require('../models/userModel')
const { appError, catchAsync } = require('../util')


exports.getUsers = async (req, res) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		count: users.length,
		users
	})
}

exports.addUser = catchAsync( async (req, res, next) => {
	const user = await User.create(req.body)
	if(!user) return next(appError('User.create() operation failed'))

	res.status(201).json({
		status: 'success',
		user
	})
})

exports.getUserById = (req, res) => {
	res.status(200).json({
		status: 'success',
		user: {
			name: 'riajul'
		}
	})
}

exports.updateUserById = (req, res) => {
	res.status(201).json({
		status: 'success',
		user: {
			name: 'riajul'
		}
	})
}

exports.removeUserById = (req, res) => {
	// res.status(204).json({
	// 	status: 'success',
	// 	user: {
	// 		name: 'riajul'
	// 	}
	// })
	res.sendStatus(204)
}
