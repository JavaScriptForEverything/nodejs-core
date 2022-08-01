# Express API


###### Key Features

	. Error handling
	. Image upload (as dataUrl )
	. 3 common routes 	/api/users, /api/users/, /api/reviews
	. Cookie based authentication system.



###### Dynamically download all files given as arguments that be placed inside 'images' arrayObject


	Command: 				(1) 	(2) 	  (3)
		$ node util/downloadImage.js --avatar --banner --nofile

		$ yarn download:avatar 			: download Avatar
		$ yarn download:banner 			: download Banner
		$ yarn download:avatar-banner 		: download Avatar and banner

		1: download 	avatar 	image which is 	also  available in `images` which is an array object
		2:   " 		banner 	  " 	"   " 	 " 	" 	" 	" 	" "  " 	 " 	"
		3:  Now Download 'nofile' because that is not available in array Object.




###### Routes

	. /api/users 					[ GET, POST ]
		. /:userId 				[ GET, PATCH, DELETE ]
		. /signup 				[ POST ]
		. /login  				[ POST ]
		. /logout  				[ POST ]
		. /me  					[ GET  ]
		. /update-me  				[ PATCH  ]
		. /delete-me  				[ DELETE ]


	. /api/products 				[ GET, POST ]
		. /:productId 				[ GET, PATCH, DELETE ]
			. /reviews 			[ GET, POST ]
			. /reviews-on-product 		[ GET ]
			. /reviews/:reviewsId 		[ GET, PATCH, DELETE ]


	. /api/reviews 					[ GET, POST ]
		. /my-reviews 				[ GET ]
		. /reviews-on-product 			[ GET ]
		. /:reviewId 				[ GET, PATCH, DELETE ]



	Protected Routes:
		. /api/users/
			. Create Read Update Delete 	: protected by admin user
			. me update-me and delete-me 	: protected by user self
		. /api/users/logout 			: 	" 	"

		. /api/products/
			. Create Update and Delete 	: protected by user self

		. /api/reviews/
			. Create Update and Delete 	: protected by user self
			. get my-reviews 		: 	" 	"

	Unprotected Routes:
		. /api/users/signup
		. /api/users/login

		. /api/products
			.getProducts
			.getProductById

		. /api/reviews
			.getReviews
			.reviews-on-product
