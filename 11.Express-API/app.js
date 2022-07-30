const express = require('express')
const cors = require('cors')

// routers
const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const reviewRouter = require('./routes/reviewRoute')

const app = express()

app.use(cors()) 												// make this API publicly available
app.use(express.static('./public')) 		// set ststic directory to save image and files
app.use(express.json()) 								// set json data can be received in req.body from client


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)


module.exports = app

