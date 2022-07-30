const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const { hash } = require('bcryptjs')

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		maxLength: 50,
		minLength: 3,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		maxLength: 50,
		validate: isEmail, 	// (email) => isEmail(email)
	},
	password: {
		type: String,
		required: true,
		maxLength: 50,
		minLength: 4,
	},
	confirmPassword: {
		type: String,
		required: true,
		validate: function(confirmPassword) {
			return confirmPassword === this.password
		}
	},
	role: {
		type: String,
		lowercase: true,
		trim: true,
		default: 'user',
		enum: ['user', 'admin', 'guest']
	},

}, {
	timestamps: true
})

// hash password before save
userSchema.pre('save', async function() {
	if( !this.isModified('password') ) return 		// if password already have then don't hash again.

	const hashedPassword = await hash(this.password, 12)
	this.password = hashedPassword

	// remove confirmPassword field before save
	this.confirmPassword = undefined
})

module.exports = model('User', userSchema)


/*
{
	"name" : "riajul islam'",
	"email": "abc@gmail.com",
	"password" : "asdfasdf",
	"confirmPassword" : "asdfasdf",
	"role" : "admin"
}

*/
