const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



/*
router
	.get('/', userController.getUsers)
	.post('/', userController.addUser)
	.get('/:userId', userController.getUserById)
	.patch('/:userId', userController.updateUserById)
	.delete('/:userId', userController.removeUserById)
*/

router.route('/')
	.get(userController.getUsers)
	.post(userController.addUser)

router.route('/:userId')
	.get(userController.getUserById)
	.patch(userController.updateUserById)
	.delete(userController.removeUserById)



module.exports = router
