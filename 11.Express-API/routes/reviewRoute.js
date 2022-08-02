const { Router } = require('express')

const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')

/*
merte params of '/api/products  and 	/api/reviews'
Because we try to get /api/reviews 	over products like:

	router.use('/:productId/reviews', reviewRouter)  	=> /api/products/productId/reviews
*/
const router = Router({ mergeParams: true })


/*
router
	.get('/', reviewController.getReviews)
	.post('/', reviewController.addReview)
	.get('/:reviewId', reviewController.getReviewById)
	.patch('/:reviewId', reviewController.updateReviewById)
	.delete('/:reviewId', reviewController.removeReviewById)
*/

router
	.get('/my-reviews', authController.protect, reviewController.getReviewsByField('user') )
	.get('/reviews-on-product', reviewController.getReviewsByField('product'))



router.route('/')
	.get(reviewController.getReviews)
	.post( authController.protect, reviewController.addReview)

router
	.route('/:reviewId')
	.get(reviewController.getReviewById)
	.patch(reviewController.updateReviewById)
	.delete(reviewController.removeReviewById)

// router
// 	.use(authController.protect)
// 	.get('/:reviewId', authController.restrictToUser('reviews'), reviewController.getReviewById)
// 	.patch('/:reviewId', authController.restrictToUser('reviews'), reviewController.updateReviewById)
// 	.delete('/:reviewId', authController.restrictToUser('reviews'), reviewController.removeReviewById)



module.exports = router
