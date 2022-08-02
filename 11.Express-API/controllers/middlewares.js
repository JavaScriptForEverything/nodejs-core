const path  = require('path')
const uuid = require('uuid').v4
const sharp = require('sharp')


const uploadImage = async (next, dataUrl, saveToDir, size=[400, 200]) => {
	try {
		const base64 = dataUrl.split('base64,').pop()
		const buffer = Buffer.from(base64, 'base64')

		const uniqueId = uuid()
		const file = path.join(saveToDir, `${uniqueId}.jpg`)
		const secure_url = file.split('public/').pop()

		await sharp(buffer)
			.resize(size)
			.toFormat('jpg')
			.toFile(file)

		return { public_id: uniqueId, secure_url }

	} catch (err) {
		next(err.message)
	}
}

/*
exports.uploadAvatar = async (req, res, next) => {
	try {
		if(req.body.avatar) {
			const dataUrl = req.body.avatar.secure_url
			const saveToDir = path.join(__dirname, '..', 'public', 'images', 'users')

			const image = await uploadImage(next, dataUrl, saveToDir)

			req.body.avatar = image
		}
		next()

	} catch (err) {
		next( err.message )
	}
}

exports.uploadCoverImage = async (req, res, next) => {
	try {
		if(req.body.coverImage) {
			const dataUrl = req.body.coverImage.secure_url
			const saveToDir = path.join(__dirname, '..', 'public', 'images', 'products')

			const image = await uploadImage(next, dataUrl, saveToDir)

			req.body.coverImage = image
		}
		next()

	} catch (err) {
		next( err.message )
	}
}

exports.uploadImages = async (req, res, next) => {
	const { images=[] } = req.body || {}
	try {

		const saveToDir = path.join(__dirname, '..', 'public', 'images', 'products')

		const promiseImages = images.map( async (image) => {
			const dataUrl = image.secure_url

			return await uploadImage(next, dataUrl, saveToDir)
		})

		req.body.images = await Promise.all(promiseImages).catch(next)

		next()

	} catch (err) {
		next( err.message )
	}
}
*/

// imageUploader('avatar', 'users') 					// save to /public/images/users/
// imageUploader('coverImage', 'products') 		// save to /public/images/products/
// imageUploader('images', 'products') 				// save to /public/images/products/
exports.imageUploader = (field, saveTo='users') => async (req, res, next) => {
	try {
		if( Array.isArray(req.body[field]) ) {
			const promiseImages = req.body[field].map( async (image) => {

				const dataUrl = image.secure_url
				const destination = path.join(__dirname, '..', 'public', 'images', saveTo)

				return await uploadImage(next, dataUrl, destination)
			})

			const images = await Promise.all(promiseImages).catch(next)
			req.body[field] = images

		} else if(req.body[field]) {
			const dataUrl = req.body[field].secure_url
			const destination = path.join(__dirname, '..', 'public', 'images', saveTo)

			const image = await uploadImage(next, dataUrl, destination)

			req.body[field] = image
		}


		next()

	} catch (err) {
		next( err.message )
	}
}

