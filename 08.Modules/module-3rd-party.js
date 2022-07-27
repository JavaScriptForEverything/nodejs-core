/*

----------[ npm ]----------

$ npm --version 				| 	npm -v
$ npm init  						| 	npm init -y
$ npm list 							| 	npm ls
$ npm install express 	| 	npm i express
$ npm install express 													: install stable version
$ npm install express@latest 										: install latest version
$ npm install express@2.1.3 										: install specific version

$ npm uninstall express | 	npm un express

$ npm start 																		: Run 'start' script
$ npm run dev 																	: Run 'dev' custom script


$ npm update         														: update all packages of current project
$ npm update express 														: update express to latest version
$ sudo npm update --location global         		: update all global packages



Publish 'Your Project' to the NPM Registry:

	$ npm search 'project-name' 									: make sure give a unique name

	- create an account by going to npmjs.com page
	$ npm login
	$ npm whoami
	$ npm publish 																: if already have that name, then it throw error.
	$ npm publish --access=public

	$ npm init --scope=username 									: instead of npm init.
		{
		  "name": "@username/package-name",
		  "version": "1.0.0",
		  "main": "index.js",
		  "license": "MIT"
		}


----------[ yarn ]----------

$ sudo npm install -g yarn
$ yarn --version 				| 	yarn -v
$ yarn init -y
$ yarn list --depth=0
$ yarn add express
$ yarn add express@latest
$ yarn add express@2.1.3
$ yarn remove express

$ yarn start 																		: Run 'start' script
$ yarn dev 																			: Run 'dev' custom script


$ npm upgrade         													: update all packages of current project
$ npm upgrade express 													: update express to latest version

----------[ pnpm ]----------

$ sudo npm install -g pnpm 											: works exactly as npm


*/
