const { Schema, model, models } = require('mongoose')
const { isEmail } = require('validator')
const { hash, compare } = require('bcryptjs')

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
		unique: true,
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

		/* hide password on User.find() 	= need: User.find().select('password')
		 		if we hide password then we have to do extra request 2 or 3 place, so instead of hiding password
				we can remove password filed when we send user to client */
		// select: false
	},
	confirmPassword: { 				// just need to re-validate password is correct that's all
		type: String,
		required: true,
		select: false,
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
	avatar: { 				// used in Home Page & view product list
		public_id: String,
		secure_url: {
			type: String,
			default: '/images/users/avatar.jpg'
		}
	},

}, {
	timestamps: true
})


userSchema.post(/^find/, function() {
	this.password = undefined
	console.log('hello find')

})


// hash password before save
userSchema.pre('save', async function() {
	if( !this.isModified('password') ) return 		// if password already have then don't hash again.

	const hashedPassword = await hash(this.password, 12)
	this.password = hashedPassword

	// remove confirmPassword field before save
	this.confirmPassword = undefined
})


/* 	user.authenticateUser(req.body.password)
		const user = User.find({ email: req.body.email })
		const isAuthenticated = await user.authenticateUser(password) 	// instance of User. not User model */
userSchema.methods.authenticateUser = async function(password) {
	return await compare(password, this.password)
}






module.exports = models.User || model('User', userSchema)


/*
{
	"name" : "riajul islam'",
	"email": "abc@gmail.com",
	"password" : "asdfasdf",
	"confirmPassword" : "asdfasdf",
	"role" : "admin",
	"avatar" : {
		"public_id" : "alskfaksdjf",
		"secure_url" : "data:image/jpg;base64,${base64}"
	}
}

*/
