
# NodeJS The Core:

###### Modules covers
	. process
		. process.env 			:
		. process.argv 			: create Seeder file
		. process.stdout 		: .write()
		. process.stdin 		: .on('data', (data) => {}), .pipe(writeStream)
	. child_process
	. readline
	. events

	. import/export (ES6 Module)
	. util
	. path
	. fs / fs/promises
	. stream
	. http
	. https 				: No need axios in serverSide.

	. express


###### Managing File and Directory
	. Read | Write | Delete | Rename  	: in 4 different ways
	. Read | Write | Modify 		: Large file as Stream

	. check file exists, fileStatus, ...


###### Generate Large File
	. $ node data/seader 			: To Read File
	. $ node data/seader --generate 	: To Generate Large File
	. $ node data/seader --delete 	 	: To Delete Large Generated File


###### Enable Import statement by babel with nodemon tool

	. $ yarn dev 				: To use `import` statement instead of `require`



##### Reading Page / image / API
	. Read WikiPedia.org webpage as .html
	. Read api.github.com 	as JSON
	. Download image from any WebSite (https or http protocol)



##### HTTPS in Express
	. Generate SSL Certificates by bellow commands: (Nothing more)

		. $ yarn create-ca
		. $ yarn create-cert

	. if want to show secure flug in browser then add `ca.key` into you browser

	Firefox: Add certificate to browser
	Setting > (search) certificates > View Certificaties > Authorities > Import > /ssl/ca.key


