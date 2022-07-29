// ----------[ Express Server ]----------
const express = require('express')

const app = express()

app.use(express.static('./public')) 			// server static html pages or files
app.use(express.json()) 									// allow to parse json data send to server

// GET 	/ 				: load /public/index.html
// GET 	/api 			: get json data

app.get('/api', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Hello world'
	})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

