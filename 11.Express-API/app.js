const express = require('express')
const cors = require('cors')
const { appError } = require('./util')

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')


const app = express()


//----------[ Middleware Section ]----------

app.use(cors()) 												// make this API publicly available
app.use(express.static('./public')) 		// set ststic directory to save image and files
app.use(express.json()) 								// set json data can be received in req.body from client


//----------[ Routing Section ]----------

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)



//----------[ Error Handling Section ]----------
/*
const appError = (message='', statusCode=500, status='') => {
	const error = new Error(message)

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'error' : 'failed'
	error.statusCode = statusCode

	return error
} */

// handle unhandled routes
app.all('*', (req, res, next) => {
	// res.status(404).json({
	// 	status: 'failed',
	// 	message: `${req.originalUrl} route not exits`
	// })

	// next(new Error('Error By me'))
	next( appError(`'${req.originalUrl}' route not exits`, 404, 'NotFound') )
})


/* 	HANDLE GLOBAL ERRORS: comes from
			. throw by any where in express app or
			. user thrown by 	`next( appError('error message') )` */
// eslint-disable-next-line
app.use('*', (err, req, res, next) => {

	// res.status(404).json({
	// 	status: 'failed',
	// 	message: `${req.originalUrl} route not exits`
	// })

	res.status(err.statusCode || 500).json({
		status: err.status,
		message: err.message,
		error: {
			...err,
			stack: err.stack
		}
	})

})





module.exports = app

