const express = require('express')
const cors = require('cors')

const helmet = require('helmet') 										// Add some secrirty option in response heading
const rateLimit = require('express-rate-limit') 		// To limit request per hour from a single host.
const compression = require('compression') 					// To compress http response that send to client
const xssClean = require('xss-clean') 							// To Remove <tags> entities, so that .js use as string not script

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')

const errorController = require('./controllers/errorController')

const app = express()

app.use( helmet() )
app.use( compression() )
app.use('/api', rateLimit({
	max: 100,
	windowMs: 1000*60*60, 			// 1 Hour
	message: 'reached max limit of 100 request per hour'
}))
app.use( xssClean() )

//----------[ Middleware Section ]----------

app.use(cors()) 												// make this API publicly available
app.use(express.static('./public')) 		// set ststic directory to save image and files
app.use(express.json({ limit: '4mb' })) // default limit: 1k: allow send json data from client as req.body


//----------[ Routing Section ]----------

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)


//----------[ Error Handling Section ]----------

// handle unhandled routes
app.all('*', errorController.unhandledRouteHandler )
app.use('*', errorController.globalErrorHandler )

module.exports = app

