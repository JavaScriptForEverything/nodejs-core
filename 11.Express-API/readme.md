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
	. /api/users/:userId 				[ GET, PATCH, DELETE ]
	. /api/users/signup 				[ POST ]
	. /api/users/login  				[ POST ]
	. /api/users/logout  				[ POST ]


	. /api/reviews 					[ GET, POST ]
	. /api/reviews/:reviewId 			[ GET, PATCH, DELETE ]

	. /api/products 				[ GET, POST ]
	. /api/products/:productId 			[ GET, PATCH, DELETE ]

	. /api/products/:productId/reviews 		[ GET, POST ]
	. /api/products/:productId/reviews/:reviewsId 	[ GET, PATCH, DELETE ]


