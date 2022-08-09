// const url = require('url')
const queryString = require('querystring')



const query = { page: '1', limit: '4', sort: 'createdAt', search: 'hello world' }

// const result = new url.URLSearchParams(query).toString()
const string = queryString.stringify( query )
const result = queryString.parse( string )

console.log(result)





