const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')

const errorController = require('./controllers/errorController')

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

// handle unhandled routes
app.all('*', errorController.unhandledRouteHandler )
app.use('*', errorController.globalErrorHandler )

module.exports = app

