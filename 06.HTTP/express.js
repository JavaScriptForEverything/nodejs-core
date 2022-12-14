// ----------[ Express Server ]----------
const url = require('url')
const express = require('express')

const app = express()

app.use(express.static('./public')) 			// server static html pages or files
app.use(express.json()) 									// allow to parse json data send to server

// // GET 	/ 				: load /public/index.html
// // GET 	/api 			: get json data

// app.get('/api', (req, res) => {
// 	res.status(200).json({
// 		status: 'success',
// 		message: 'Hello world'
// 	})
// })


const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next)

app.get('/api', catchAsync( async (req, res, next) => {
	// return Promise.reject('Hello')

	console.log(req.query)
	const query = new url.URLSearchParams(req.query).toString()
	console.log(query)

	res.status(200).json({
		status: 'success',
		message: 'Hello world'
	})
}))

// app.use('*', (err, req, res, next) => {
// 	res.status(400).json({
// 		status: 'error',
// 		message: err.message
// 	})
// })




const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

