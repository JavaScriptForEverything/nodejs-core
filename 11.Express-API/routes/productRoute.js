const express = require('express')
const router = express.Router()
const productController = require('../controllsers/productController')



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



module.exports = router
