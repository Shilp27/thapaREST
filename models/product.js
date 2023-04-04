const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum: {
    //   value: ['apple', 'samsung', 'dell', 'mi'], // here we don't want company other than these (but code not working)
    //   message: `{VALUE} is not supported`,
    // },
  },
})

module.exports = mongoose.model('Product', productSchema) // first parameter always write in Singular as in mongodb s is added
