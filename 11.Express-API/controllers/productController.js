const Product = require('../models/productModel')
const { catchAsync, appError } = require('../util')


// GET 	/api/products 			=> 	/routes/productRoute.js
exports.getProducts = catchAsync( async (req, res, next) => {
	const products = await Product.find()

	res.status(200).json({
		status: 'success',
		count: products.length,
		products
	})
})

// POST 	/api/products
exports.addProduct = catchAsync( async (req, res, next) => {

	// // make add product protected so that it has userId available, which is required field.
	// req.body.user = req.user.userId

	const product = await Product.create(req.body)
	if(!product) return next(appError('Product.create() method failed'))

	res.status(201).json({
		status: 'success',
		product
	})
})

// GET 	/api/products/:productId
exports.getProduct = catchAsync( async (req, res, next) => {
	const product = await Product.findById(req.params.productId)
	if(!product) return next(appError('No product found', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})

// PATCH 	/api/products/:productId
exports.updateProduct = catchAsync( async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
		new: true,
		runValidators: true
	})
	if(!product) return next(appError('Update product is failed'))

	res.status(201).json({
		status: 'success',
		product
	})
})

// DELETE 	/api/products/:productId
exports.removeProduct = catchAsync( async(req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.productId)
	if(!product) return next(appError('product deletation operation is failed'))

	res.sendStatus(204)
})
