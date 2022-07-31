const url = require('url')
const https = require('https')
const fs = require('fs')
const { join } = require('path')


/*
	Method-1: 	$ node util/downloadImage.js --avatar --banner --nofile

	method-2:
		const avatarUrl = 'https://avatars.githubusercontent.com/u/36861098?v=4'
		const avatarImage = join(__dirname, '..', 'public', 'images', 'users', 'avatar.jpg')
		downloadImage(avatarUrl, avatarImage)

		const bannerUrl = 'https://raw.githubusercontent.com/robitops10/robitops10/main/BannerForGithub.png'
		const bannerImage = join(__dirname, '..', 'public', 'images', 'banner.jpg')
		downloadImage(bannerUrl, bannerImage)

	method-3:

*/
let downloadImage = ''

module.exports = downloadImage = (link, filename) => {

	const { hostname, path } = url.parse(link)

	const options = {
		hostname,
		port: 443,
		path,
		method: 'GET',
		headers: { 'user-agent': 'nodejs' }
	}

	// 1. Open Stream
	const imageStream = fs.createWriteStream(filename)

	const req = https.request(options, (res) => {
		res.once('data', () => console.log('----------[ Requested Started ]----------') )
		res.on('end', () => console.log('----------[ Requested Finished ]----------') )

		// 2. Write Stream: ReadStream => WriteStream
		res.pipe(imageStream)
	})

	// 3. Close Stream
	req.on('end', imageStream.end)

	req.on('error', console.log)
	req.end()
}


// //----------[ Method-2: Download ]----------

// const avatarUrl = 'https://avatars.githubusercontent.com/u/36861098?v=4'
// const avatarImage = join(__dirname, '..', 'public', 'images', 'users', 'avatar.jpg')

// const bannerUrl = 'https://raw.githubusercontent.com/robitops10/robitops10/main/BannerForGithub.png'
// const bannerImage = join(__dirname, '..', 'public', 'images', 'banner.jpg')

// process.argv.map( (arg) => {
// 	if( arg === '--avatar') downloadImage(avatarUrl, avatarImage)
// 	if( arg === '--banner') downloadImage(bannerUrl, bannerImage)
// })


//----------[ Method-3: Download ]----------

/* 	Dynamically download all the files given as arguments and that file must be placed inside 'images' arrayObject

	Command:
		$ node util/downloadImage.js --avatar --banner --nofile
			         											(1) 		(2) 			(3)
		$ yarn download:avatar 																		: download Avatar
		$ yarn download:banner 																		: download Banner
		$ yarn download:avatar-banner 														: download Avatar and banner

		1: download 	avatar 	image which is 	also  available in `images` which is an array object
		2: 		" 			banner 		" 		" 	" 	" 		" 			" 		" 		" 		"  " 	" 			"

		3:  Now Download 'nofile' because that is not available in array Object.
*/


const images = [
	{
		arg: '--avatar',
		url: 'https://avatars.githubusercontent.com/u/36861098?v=4',
		file: join(__dirname, '..', 'public', 'images', 'users', 'avatar.jpg')
	},

	{
		arg: '--banner',
		url: 'https://raw.githubusercontent.com/robitops10/robitops10/main/BannerForGithub.png',
		file: join(__dirname, '..', 'public', 'images', 'banner.jpg')
	},

]

images.forEach(({ arg, url, file}) => {
	if( process.argv.includes(arg) ) {
		downloadImage(url, file)
	}
})
