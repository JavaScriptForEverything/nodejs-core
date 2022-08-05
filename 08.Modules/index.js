// const { join } = require('path') 					// CommonJS named import (default)
import { join } from 'path' 									// ES6 Module named import: translated by babel with nodemon tool


const result = join('one', 'two', 'three')

console.log({ result })
