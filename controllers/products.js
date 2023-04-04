const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const myData = await Product.find({}) // finds all data
  res.status(200).json({ myData })
}

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query) // using req.query get /api/testing?company=mi&user=hello
  res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting }
