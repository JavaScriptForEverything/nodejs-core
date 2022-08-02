const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const nodemailer = require('nodemailer')


/* 	const bannerUrl = 'https://raw.githubusercontent.com/robitops10/robitops10/main/BannerForGithub.png'
		const bannerImage = join(__dirname, '..', 'public', 'images', 'banner.jpg')

		downloadImage(bannerUrl, bannerImage) */
exports.downloadImage = require('./downloadImage')



// deleteFile(next, user.avatar.secure_url)
exports.deleteFile = (next, file) => {
	const filename = path.join(__dirname, '..', 'public', file)
	const isExists = fs.existsSync(filename)
	if(isExists) fs.unlink(filename, (err) => err && next(err))

}





/* Throw Error by this way: 		Which will be handled by global Error Handler.
		next( appError('Route not found') )
		next( appError('Route not found', 404) )
		next( appError('Route not found', 404, 'NotFound') ) */
let appError = ''
exports.appError = appError = (message='', statusCode=500, status='') => {
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
// const token = generateToken(user.id, 0) 			// Force user to relogin by expire token
exports.generateToken = (id, expiresIn=process.env.TOKEN_EXPIRES) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn })
}

// setCookie(res, token)
// setCookie(res, token, 60*60*24*30) 	// Same as default
// setCookie(res, token, 0) 						// expires cookie
exports.setCookie = (res, token, date=60*60*24*30) => {

	res.setHeader('Set-Cookie', cookie.serialize('token', token, {
		path: '/',
		maxAge: date,
		// expires: new Date( Date.now() + 1000*60*60*24*30 ), 	// 1 month future

		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'none'	 // allow for CORS, to send cookie for this option 'secure' flag must be set
	}))
}




/* 	const filename = require('path').join(__dirname, '..', 'public', 'images', 'users', 'avatar.jpg')

		const dataURL = readImageAsDataURL(filename)
		console.log(dataURL) */
exports.readImageAsDataURL = (filename) => {
	const base64 = require('fs').readFileSync(filename, 'base64')
	const dataURL = `data:image/jpg;base64,${base64}`

	return dataURL
}


const transportOptions = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b418aca0749cbe",
    pass: "5511ee3addb968"
  }
}


exports.sendMail = (next) => async ({ from, to, subject, text }) => {

	try {
		const transport = nodemailer.createTransport(transportOptions)
		const info = await transport.sendMail({ from, to, subject, text })

		// console.log(info)

	} catch (err) {
		next(appError(err.message))
	}

}




// const products = await apiFeatures( Product.find(), req )
exports.apiFeatures = (query, req) => {
	let { _page, _limit, _sort, _fields, _search } = req.query || {}

	// set pagination
	_page = +_page || 1
	_limit = +_limit || 3
	const skip = (_page - 1) * _limit

	// ?_page=2&_limit=3&... 		=> { _page: 1, _limit: 3, ... }
	if(_page) query = query.skip(skip).limit(_limit)


	// ?_sort=-price,ratings,price 	=> '-price ratings price'
	if(_sort) query = query.sort(_sort.split(',').join(' '))


	// ?_fields=slug,name,price,ratings,summary 	=> 'slug name price ratings summary'
	if(_fields) query = query.select(_fields.split(',').join(' '))


	/* 	?_search=product name 4
	Method-1: Javascript RegExp:
		if(_search) query = query.find({ name: new RegExp(_search, 'i') })

	Method-2: MongoDB $rexex operator:
		if(_search) query = query.find({ name: { $regex: _search, $options: 'i' } }) */


	// ?_search=product 3 						// just value
	// ?_search=product 3, 						// value,field 	|| 'name' (default)
	// ?_search=review 3,review 			// value,field : search on field 'review'
	const searchValue = _search?.split(',')[0]
	const searchOnField = _search?.split(',')[1].trim() || 'name'

	const searchObject = _search ? { [searchOnField] : { $regex: searchValue, $options: 'i' } } : {}

	if(_search) query = query.find( searchObject )

	return query
}
