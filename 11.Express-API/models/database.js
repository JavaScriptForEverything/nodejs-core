const { connect } = require('mongoose')

module.exports = () => connect(process.env.DB_LOCAL_URL).catch(console.log)
