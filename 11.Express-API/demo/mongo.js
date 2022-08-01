use node-api


// db.users.find().pretty()
// db.users.find({ _id: ObjectId('62e621291ab2c85f774c656a') }).pretty()
// db.users.find({ email: 'abc@gmail.com' }).pretty()

// db.users.updateOne({ email: 'abc@gmail.com' }, { $set: {
// 	role: 'user'
// }})


// db.products.find().pretty()
// db.products.find().limit(1).pretty()
// db.products.find({ _id: ObjectId('62e52d14d149e9fbf3574b84')}).pretty()
// db.products.find({ user: ObjectId('62e50bf1fac8728124097e21')}).limit(2).pretty()

// db.products.updateOne({ user: ObjectId('62e50bf1fac8728124097e21') }, {
// 	$set: {
// 		 user: ObjectId('62e621291ab2c85f774c656a')
// 	}
// })
db.products.find({ user: ObjectId('62e621291ab2c85f774c656a')}).limit(2).pretty()
