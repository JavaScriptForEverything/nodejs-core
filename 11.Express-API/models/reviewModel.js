const { Schema, models, model } = require('mongoose')


const reviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	review: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
		maxLength: 200,
		minLength: 5
	},
	
	likes: {
		type: Number,
		min: 0,
	},
	dislikes: {
		type: Number,
		min: 0,
	}

}, {
	timestamps: true
})

module.exports = models.Review || model('Review', reviewSchema)
