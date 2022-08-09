/*
When we install any 3rd party package it has 3 versions:


+---------------------------------------[ Version Number ]------------------------------------------+
|																																																		|
| 		12 	. 	4 	. 	3 																																						|
| 	Major . Minor . patched 																																				|
|																																																		|
|           					: 4.5.6 							=> no updatable === Exact Version 											|
| ~ (Tilde) 					: 4.5.x 							=> patched updatable 																		|
| ^ (Caret) 					: 4.x.x 							=> Minor + patched updatable 														|
|																																																		|
|																																																		|
| . Patched Version 		: Fixed Bugs 				: Code will works without any changes only fixed bug. 	|
| . Minor Version 			: add Features 			: Add new Features but will be backward compatibility 	|
| . Major Version 			: Can break code  	: Big Changes, No Backward compatibility, New Release. 	|
|																																																		|
| 					 12.4.3 												: => Exact Version 																			|
| 					>12.4.3 												: => Gather than Version 																|
| 					^12.4.3 												: => Compatible Version  	(Minor change) 								|
| 					~12.4.3 												: => Minor Change 				(Patched change) 							|
| 					*12.4.3 												: => Update Major + Minor + Patched Version 						|
|																																																		|
| 	package.json 														: => Store all dependencies of your project. 						|
| 	package-lock.json 											: => Store all dependence's of dependencies. 						|
|																																																		|
|																																																		|
| $ npm install nodemon        							: => Install Latest Version. 														|
| $ npm install nodemon@1.15.0 							: => Install specific Version. (Downgrade if higher installed)
| $ npm outdated 														: => Find Outdated Version. 														|
| $ npm uninstall slugify 									: =>  																									|
| $ npm install 														: => Install all packages written on package.json file 	|
|																																																		|



*/


