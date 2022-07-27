const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Hello world'
	})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
