const mongoose = require('mongoose')

const connectDB = (uri) => {
  console.log('connecting to db')
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
