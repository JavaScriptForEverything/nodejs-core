const { Router } = require('express')
const productController = require('../controllers/productController')
const reviewRouter = require('./reviewRoute')

const router = Router()



/*
router
	.get('/', productController.getProducts)
	.post('/', productController.addUser)
	.get('/:productId', productController.getUserById)
	.patch('/:productId', productController.updateUserById)
	.delete('/:productId', productController.removeUserById)
*/

router.route('/')
	.get(productController.getProducts)
	.post(productController.addProduct)

router.route('/:productId')
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.removeProduct)


// /api/products/productId/reviews
router.use('/:productId/reviews', reviewRouter)

module.exports = router
