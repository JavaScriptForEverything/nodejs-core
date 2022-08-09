const { Schema, model, models } = require('mongoose')
const slug = require('slugify')
// used common Module system so that we can use in 	/server/models/seeder.js file

/*
{
	"user" : "userId",
	"name" : "product name 1",
	"category" : "shirt",  				// enum: ['shirt', 'pant']
	"brand" : "adidas", 					// enum: ['niki', 'adidas', 'ramond', 'oliver', 'zara', 'casely']
	"size" : "xs", 								//	enum: ['xs', 'sm', 'lg', 'xxl']
	"price" : 32,
	"summary" : "aslkdjfaskdjf",
	"description" : "aslkdjfaskdjf"
}
*/

const productSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		// minLength: 5,
		lowercase: true,
		unique: true
	},
	category: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: ['shirt', 'pant']
	},
	brand: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: ['niki', 'adidas', 'ramond', 'oliver', 'zara', 'casely']
	},
	size: {
		type: String,
		required: true,
		default: 'xs',
		enum: ['xs', 'sm', 'lg', 'xxl']
	},
	quantity: { 						// (it no need in this model, stock entogh) add this quantity in stock on create time
		type: Number,
		min: 1,
	},
	price: {
		type: Number,
		required: true,
		min: 1,
		// set: val => val.toFixed(2)
		// type: String,
		// set: val => val.toLocaleString('en-US', {
		// 	style: 'currency',
		// 	currency: 'usd',
		// 	currencyDisplay: 'symbol',
		// 	minimumFractionDigits: 2
		// })
	},
	summary: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 300,
		trim: true
	},
	description: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 1000,
		trim: true
	},
	// images: [{
	// 	public_id: {
	// 		type: String,
	// 		required: true
	// 	},
	// 	secure_url: {
	// 		type: String,
	// 		required: true
	// 	}
	// }],
	coverImage: { 				// used in Home Page & view product list
		public_id: String,
		secure_url: {
			type: String,
			default: '/images/coverImage.jpg'
		}
	},
	images: [{ 						// used in product details page, with carousel
		public_id: String,
		secure_url: String,
	}],


// bellow fields will be calculated, not inserted from front-end
	slug: String, 					// must be present to save from .pre('save')
	stock: { 								// increase stock on every Product.create() & reduce on Product.findAndDelete()
		type: Number,
		min: 0,
		default: 0,
	},
	sold: { 								// will be calculated from 'payments' collection
		type: Number,
		min: 0,
		default: 0,
	},
	revenue: { 							// will be calculated from 'payments' collection
		type: Number,
		min: 0,
		default: 0,
	},
	numReviews: [{ 					// calculated from reviews collection
		type: String,
	}],
	ratings: { 							// will be calculated from 'reviews' collection
		type: Number,
		default: 4
	},

}, {
	timestamps: true,
	toJSON: { virtuals: true } 			// Step-1: Enable virtual fields on self Schema
})


productSchema.pre('save', function(next) {
	this.slug = slug(this.name, { lower: true })

	this.price = +this.price
	this.quantity = +this.quantity
	next()
})


// Step-2: Generate virtual field: 'reviews' from Review model where Review.product === product._id
productSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id'
})


// Step-3: GET or visiable reviews fieild 			: globally or on perticular review
productSchema.pre(/find*/, async function( next ) {
	// this.populate('reviews')
	this.populate('reviews', '-createdAt -updatedAt -__v')

	next()
})

module.exports = models.Product || model('Product', productSchema)

