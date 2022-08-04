/*

Greater than and less than symbol in regular expressions ?

*/




// const message = 'ok hello hi Hello world'
// const result = message.match(/hello/ig)
// console.log(result)

// let str = "Price: $5–$10"
// const result = str.match(/\$\d+/) 		// =>
// console.log(result)






let str = 'I like yellow color palette!';

let re = /(?<color>yellow) color/
let result = str.match(re);

console.log(result);


