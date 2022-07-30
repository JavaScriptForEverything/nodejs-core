const Review = require('../models/reviewModel')
const { catchAsync, appError } = require('../util')

// GET 	/api/reviews 		=> /reoutes/reviewRoute.js
exports.getReviews = catchAsync( async (req, res, next) => {

	const reviews = await Review.find()

	res.status(200).json({
		status: 'success',
		count: reviews.length,
		reviews
	})
})





// POST 	/api/reviews 		: this route must be protected
exports.addReview = catchAsync( async (req, res, next) => {

	// if 	/api/products/:productId/reviews 	: We will get productId
	req.body.product 	= req.params.productId 	|| req.body.product

	// // if 	this route is protected, then we will get userId
	// req.body.user 		= req.user.userId 			|| req.body.user


	const review = await Review.create(req.body)
	if(!review) return next(appError('review create failed'))

	res.status(201).json({
		status: 'success',
		review,
		// review: req.body
	})
})

// GET 	/api/reviews/:reviewId
exports.getReviewById = catchAsync(async (req, res, next) => {
	const review = await Review.findById(req.params.reviewId)
	if(!review) return next(appError('review not found'))

	res.status(200).json({
		status: 'success',
		review
	})
})

// PATCH 	/api/reviews/:reviewId
exports.updateReviewById = catchAsync( async (req, res, next) => {
	const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
		new: true,
		runValidators: true
	})
	if(!review) return next(appError('review update is failed'))

	res.status(201).json({
		status: 'success',
		review
	})
})

// DELETE 	/api/reviews/:reviewId
exports.removeReviewById = catchAsync( async (req, res, next) => {
	const review = await Review.findByIdAndDelete(req.params.reviewId)
	if(!review) return next(appError('review deletion is failed'))

	res.sendStatus(204)
})
