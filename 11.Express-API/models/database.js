const { connect, connection } = require('mongoose')

const { NODE_ENV, DB_LOCAL_URL, DB_REMOTE_URL } = process.env || {}
// const DATABASE = NODE_ENV === 'production' ? DB_REMOTE_URL : DB_LOCAL_URL
const DATABASE = DB_LOCAL_URL

module.exports = () => {
	if(connection.readyState >= 1) return

	return connect(DATABASE).catch(console.log)
}
