const User = require('../models/userModel')

exports.getUsers = async (req, res) => {
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		count: users.length,
		users
	})
}

exports.addUser = async (req, res) => {
	const user = await User.create(req.body)
	if(!user) return console.log('User.create() failed')

	res.status(201).json({
		status: 'success',
		user
	})
}

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
