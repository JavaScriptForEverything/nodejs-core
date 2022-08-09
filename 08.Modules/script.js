console.log(hello world)



/*
+---------------------------------------------[ npm Scripts ]---------------------------------------+
|																																																		|
| Understanding npm scripts: 																																				|
|																																																		|
|																																																		|
|----------[ Basic ]---------- 																																			|
|																																																		|
| /package.json 																																										|
| { 																																																|
| 	"scripts" : { 																																									|
| 		"test" : "ls -l", 																																						|
| 		"file" : "mkdir demo && cd demo && echo 'hello file' > file.txt && cat file.txt"  						|
| 	} 																																															|
| } 																																																|
|  																																																	|
| NB: if you familier with linux bash script, then you can run any bash script by npm scripts field.|
|  																																																	|
|  																																																	|
| Run scripts: 																																											|
|  																																																	|
| 	$ npm run test 											: run in terminal it will run 'test' script: <= $ ls -l 		|
| 	$ npm run test 											: Run test script 																					|
| 	$ npm test 													: " 	" 		" 																							|
| 	$ npm t 														: " 	" 		" 																							|
|  																																																	|
|  																																																	|
|----------[ use package inside script ]---------- 																									|
|  																																																	|
| It's important to notice that NPM makes all your dependencies' binaries available in the scripts. |
| So you can access them directly as if they were referenced in your PATH. 													|
|  																																																	|
|  																																																	|
| $ npm install eslint 																																							|
|  																																																	|
| /package.json 																																										|
| 	{ 																																															|
| 		"scripts" : { 																																								|
| 			"lint" : "modules/.bin/eslint script.js" 	: all installed modules have binary file in .bin 	|
|  																																																	|
| 			"lint" : "eslint script.js" 							: installed modules have directly available in scripts
| 		} 																																														|
| 	} 																																															|
|  																																																	|
| /script.js 																																												|
| 	console.log( hello world ) 			: => Throw Error 																								|
|  																																																	|
| $ npm run lint 										: run eslint on script.js file to find error. 									|
|  																																																	|
|  																																																	|
|  																																																	|
|----------[ Run scripts silently or loudly ]---------- 																						|
|  																																																	|
| 	- logLevels: "silent", "error", "warn", "notice", "http", "timing", "info", "verbose", "silly". |
|  																																																	|
| 	$ npm run test 											: run test script ($ ls -l) 																|
| 	$ npm run test --loglevel silent 		: only output shows, don't show script run in terminal 			|
| 	$ npm run test --silent 						: same as --silent 																					|
| 	$ npm run test -s      							: -s === --silent 																					|
|  																																																	|
|  																																																	|
|  																																																	|
|----------[ Run scripts from a file ]---------- 																										|
|  																																																	|
| Referencing scripts from files: 																																	|
| 	- is script is very long or complex, then it will be nice to use script file, instead of writing|
| 		script on the scripts section directly. 																											|
|  																																																	|
| /package.json 																																										|
| 	{ 																																															|
| 	    "scripts": { 																																								|
| 	        "hello:js": "node scripts/helloworld.js", 																							|
| 	        "hello:bash": "bash scripts/helloworld.sh", 																						|
| 	        "hello:cmd": "cd scripts && helloworld.cmd" 																						|
| 	    } 																																													|
| 	} 																																															|
|  																																																	|
|  																																																	|
|  																																																	|
|----------[ pre & Post prefix ]---------- 																													|
|  																																																	|
| - npm has 2 prefix which added with script's name, then when we run our main script, 							|
| 	then pre and post script also run, and run in order. 																						|
|  																																																	|
| 				"hello" 				: our main script 																												|
| 				"prehello" 			: prefix script run before our main script, no matter which order it placed
| 				"posthello" 		: postfix " 		 "  after 	" 	" 		"  		" 	" 		" 		" 	"  " 		" |
|  																																																	|
|  																																																	|
| 	{ 																																															|
|     "scripts": { 																																									|
| 	    "hello": "echo hello world", 																																|
| 	    "prehello" : "echo ---[ run before hello script ]---", 																			|
| 	    "posthello" : "echo ---[ run after hello script ]---", 																			|
|     } 																																														|
| 	} 																																															|
|  																																																	|
|  																																																	|
|  																																																	|
|----------[ Environment Variables ]---------- 																											|
|  																																																	|
| - It is not the best option to set and access environment variable, for that we will do other way,|
| 	but We can set and get environment variables directly inside package.json file. 								|
|  																																																	|
| 		"config": {...} 										: To set environment variables 														|
| 		$npm_package_config_<configName> 		: start with '$npm_package_config_' + config name 				|
|  																																																	|
|  																																																	|
| /package.json 																																										|
|  																																																	|
| 	{ 																																															|
| 		"config" : { 																																									|
| 			"host" : "http://localhost", 												: set host: host=http://localhost 			|
| 			"port" : "3000" 																		: set port: port=3000 									|
| 		}, 																																														|
|     "scripts": { 																																									|
| 	    "host": "echo host: $npm_package_config_host", 			: use host: $npm_script_config_host 		|
| 	    "port": "echo port: $npm_package_config_port"				: use port: $npm_script_config_port 		|
|     } 																																														|
| 	} 																																															|
|  																																																	|
| $ npm run host 																																										|
| $ npm run port 																																										|
|  																																																	|
|  																																																	|
|  																																																	|
|  																																																	|
|----------[ Passing arguments ]---------- 																													|
|  																																																	|
| - we can pass arguments to our script. 	after -- 	--argument=value 																|
|  																																																	|
| 		like so: npm run <script> -- --argument="value" 																							|
|  																																																	|
| 			$ npm run test --  																: Double dash indicate end of script 			|
| 			$ npm run test --  --argument='value' 						: Now pass the arguments 									|
|  																																																	|
|  																																																	|
| 		Real world Example: 																																					|
|  																																																	|
| 	    "scripts": { 																																								|
| 		    "babel-node": "babel-node --presets='@babel/preset-env' --ignore='foo|bar|baz'", 					|
| 		    "dev" 			: "nodemon --exec yarn babel-node -- index.js", 															|
| 	    } 									(1)			(2)		(3)						(4) 	(5) 																	|
|  																																																	|
|  																																																	|
| 	    (1) : We run nodemon package 																																|
| 	    (2) : By nodemon we can execute other npm script like the first one 'babel-node' 						|
| 	    (4) : We said 'dev' script --exec command will be end where it found double dashed '--' 		|
| 	    (5) : Finarry we pass main file to nodemon after all the options ended. 										|
|  																																																	|
|  																																																	|
|----------[ Naming Convension ]---------- 																													|
|  																																																	|
| . It is recommended to follow naming convension while we write any script. 												|
| . It is not mandatory neighther it will have any effect on script, just easy for human nature. 		|
|  																																																	|
|  																																																	|
| 				{ 																																												|
| 			    "scripts": { 																																						|
| 		        "lint:check" 	: "eslint .", 																													|
| 		        "lint:fix" 		: "eslint . --fix", 																										|
|  																																																	|
| 		        "build:dev" 	: "...", 																																|
| 		        "build:prod" 	: "..." 																																|
| 			    } 																																											|
| 				} 																																												|
|																																																		|
+---------------------------------------------------------------------------------------------------+



*/

