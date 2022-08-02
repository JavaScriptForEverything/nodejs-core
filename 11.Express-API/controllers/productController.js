const slugify = require('slugify')
const Product = require('../models/productModel')
const { catchAsync, appError, deleteFile, apiFeatures } = require('../util')



// GET 	/api/products 			=> 	/routes/productRoute.js
exports.getProducts = catchAsync( async (req, res, next) => {
	const products = await apiFeatures( Product.find(), req )

	res.status(200).json({
		status: 'success',
		count: products.length,
		products
	})
})


// GET 	/api/products/my-products 			=> 	/routes/productRoute.js
exports.getMyProducts = catchAsync( async (req, res, next) => {
	const products = await Product.find({ user: req.user.id })

	res.status(200).json({
		status: 'success',
		count: products.length,
		products
	})
})




// POST 	/api/products
exports.addProduct = async (req, res, next) => {
	try {
		req.body.user = req.user.id

		const product = await Product.create(req.body)
		if(!product) return next(appError('Product.create() method failed'))

		res.status(201).json({
			status: 'success',
			product
		})

	} catch (err) {

		deleteFile(next, req.body.coverImage.secure_url)
		req.body.images.forEach(image => deleteFile(next, image.secure_url ))

		next(appError(err.message))
	}
}

// GET 	/api/products/:productId
exports.getProductById = catchAsync( async (req, res, next) => {
	const product = await Product.findById(req.params.productId)
	if(!product) return next(appError('No product found', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})


// GET 	/api/products/my-product/:productId
exports.getMyProductById = catchAsync( async (req, res, next) => {

	const product = await Product.findOne({
		_id: req.params.productId,
		user: req.user.id
	})
	if(!product) return next(appError('No product found [or belongs to other User]', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})



// PATCH 	/api/products/:productId
exports.updateProduct = catchAsync( async (req, res, next) => {
	const { productId } = req.params

	const findProduct = await Product.findById(productId)


	// add all the properties to findProduct then save
	Object.keys(req.body).forEach(key => findProduct[key] = req.body[key] )
	if( req.body.name ) findProduct.slug = slugify(req.body.name, { lower: true })

	const product = await findProduct.save({ validateBeforeSave: false })
	if(!product) return next(appError('Update product is failed'))


	// delete images if images updated
	if(req.body.coverImage?.secure_url) deleteFile(next, findProduct.coverImage.secure_url)
	if( req.body.images?.length ) findProduct.images.forEach(image => deleteFile(next, image.secure_url ))


	res.status(201).json({
		status: 'success',
		product
	})
})

// DELETE 	/api/products/:productId
exports.removeProduct = catchAsync( async(req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.productId)
	if(!product) return next(appError('product deletation operation is failed'))

	// console.log(product)

	// delete images if images updated
	deleteFile(next, product.coverImage.secure_url)
	product.images.forEach(image => deleteFile(next, image.secure_url ))

	res.sendStatus(204)
})
