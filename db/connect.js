const mongoose = require('mongoose')

// uri =
//   'mongodb+srv://restapi:LFc7wviHdfINBm5M@cluster0.6wjtmda.mongodb.net/?retryWrites=true&w=majority'

const connectDB = (uri) => {
  console.log('connecting to db')
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
