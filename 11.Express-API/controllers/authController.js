const User = require('../models/userModel')
const { appError, catchAsync } = require('../util')


exports.login = catchAsync(async (req, res, next) => {

	// if mobile then
	if(process.env.API === 'mobile') return res.status(204).json({
		status: 'success',
		token: 'long token used in mobile app'
	})

	//
	res.sendStatus(204)
})

