exports.getUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		users: [{
			name: 'riajul'
		}]
	})
}

exports.addUser = (req, res) => {
	res.status(201).json({
		status: 'success',
		user: {
			name: 'riajul'
		}
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
