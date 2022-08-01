const { join } = require('path')
const uuid = require('uuid').v4
const sharp = require('sharp')

const { appError } = require('../util')



const uploadImage = async (next, dataUrl, saveToDir, size=[400, 200]) => {
	try {
		const base64 = dataUrl.split('base64,').pop()
		const buffer = Buffer.from(base64, 'base64')

		const uniqueId = uuid()
		const file = join(saveToDir, `${uniqueId}.jpg`)
		const secure_url = file.split('public/').pop()

		await sharp(buffer)
			.resize(size)
			.toFormat('jpg')
			.toFile(file)

		return { public_id: uniqueId, secure_url }

	} catch (err) {
		next(appError(err.message))
	}
}

exports.uploadAvatar = async (req, res, next) => {
	try {
		if(req.body.avatar) {
			const dataUrl = req.body.avatar.secure_url
			const saveToDir = join(__dirname, '..', 'public', 'images', 'users')

			const image = await uploadImage(next, dataUrl, saveToDir)

			req.body.avatar = image
		}
		next()

	} catch (err) {
		next( appError(err.message) )
	}
}



// exports.uploadImage = (destination) => async (req, res, next) => {
// 	try {

// 		Object.keys(req.body).forEach( async (field) => {
// 			if( field['secure_url'] ) {
// 				const saveToDir = join(__dirname, '..', 'public', destination)
// 				const dataUrl = field['secure_url']

// 				const image = await uploadImage(next, dataUrl, saveToDir)

// 				req.body[field] = image
// 			}
// 			next()
// 		})
// 		next()

// 	} catch (err) {
// 		next( appError(err.message) )
// 	}
// }



