require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')

const ProductJson = require('./products.json') // no need of export in json files. This is our temp data file

// also to run this file for testing, we use node productDB.js

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL)
    await Product.create(ProductJson)
    console.log('success')
  } catch (error) {
    console.log(error)
  }
}

start()
