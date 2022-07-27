const util = require('util')
const events = require('events')

const EventEmitter = new events.EventEmitter()

// EventEmitter.on('openFile', () => {
// 	console.log('openFile event')
// })
// EventEmitter.emit('openFile')


// const { EventEmitter } = require('events')

// const emitter = new EventEmitter()

// emitter.on('openFile', () => {
// 	console.log('openFile event')
// })
// emitter.emit('openFile')




// EventEmitter.on('openFile', (data) => {
// 	console.log(data)
// })
// EventEmitter.emit('openFile', { name: 'riajul', age: 28 })



// EventEmitter.on('openFile', (message, status, data) => {
// 	console.log(`${status}: ${message} ${data}`)
// })
// EventEmitter.emit('openFile', 'message', 200, 'no error')


const Person = function (name) {
	this.name = name
}
util.inherits(Person, events.EventEmitter)

const riaz = new Person('Riajul')
// console.log(riaz.name)

riaz.on('customEvent', (data) => {
	console.log(data)
})

riaz.emit('customEvent', { name: 'riajul', age: 28 })



