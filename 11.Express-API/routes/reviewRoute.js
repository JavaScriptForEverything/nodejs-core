const { Router } = require('express')
const reviewController = require('../controllers/reviewController')

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

router.route('/')
	.get(reviewController.getReviews)
	.post(reviewController.addReview)

router.route('/:reviewId')
	.get(reviewController.getReviewById)
	.patch(reviewController.updateReviewById)
	.delete(reviewController.removeReviewById)



module.exports = router
