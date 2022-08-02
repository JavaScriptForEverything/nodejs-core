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


###### Password-Reset By mailing
	- Like treditional web application, we reset password



###### Routes

	. /api/users 					[ GET, POST ]
		. /:userId 				[ GET, PATCH, DELETE ]
		. /signup 				[ POST ]
		. /login  				[ POST ]
		. /logout  				[ POST ]
		. /me  					[ GET  ]
		. /update-me  				[ PATCH  ]
		. /update-my-password 			[ PATCH  ]
		. /forgot-password 			[ POST   ]
		. /reset-password 			[ PATCH  ]
		. /delete-me  				[ DELETE ]


	. /api/products 				[ GET, POST ]
		. /my-products 				[ GET ]
			. /:productId			[ GET ]
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
			. /me 				: protected by user self
			. /update-me  			:  	" 	"
			. /update-my-password 		:  	" 	"
			. /logout 			: 	" 	"

		. /api/products/
			. Create Update and Delete 	: protected by user self
			. /my-product 			:  	" 	"
				. /:productId 		:  	" 	"

		. /api/reviews/
			. Create Update and Delete 	: protected by user self
			. get my-reviews 		: 	" 	"

	Unprotected Routes:
		. /api/users
			. /signup
			. /login
			. /forgot-password
			. /reset-password

		. /api/products
			.getProducts
			.getProductById

		. /api/reviews
			.getReviews
			.reviews-on-product


###### Add apiFeatures: on all 3 routes

	. pagination
	. search
	. sort
	. filter documents by it's properties



	. /api/products
		?_page=2&_limit=3&_sort=-price,ratings,price&_search=name 4&_fields=slug,name,price,ratings,summary

			_page=2
			_limit=3
			_sort=-createdAt
			_fields=name,price,rating
			_search=name 4 			: search on 'name' field (which is default field)


	. /api/users
		?_page=1&_limit=2&_sort=-price,ratings&_fields=name,email,role&_search=admin

			_page=1
			_limit=2
			_sort=-price,ratings
			_fields=name,email,role
			_search=admin, name 		: search on 'name' field

	. /api/reviews
		?_page=1&_limit=3&_sort=user&_search=review 3,review&_fields=review,user,product

			_page=1
			_limit=3
			_sort=user 			: user === user.id
			_fields=review,user,product
			_search=review 3, review 	: search on 'review' field


