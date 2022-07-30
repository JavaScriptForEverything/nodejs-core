require('dotenv').config()
const database = require('./models/database')
const app = require('./app')

const PORT = process.env.PORT || 5000
app.listen(PORT, async() => {
	const conn = await database()
	console.log(`http://localhost:${PORT} on database: [${conn.connection.host}]`)
})
