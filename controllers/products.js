const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const myData = await Product.find({}) // finds all data
  res.status(200).json({ myData })
}

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find({ name: 'iphone' }) // finds all data with name iphone
  res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting }
