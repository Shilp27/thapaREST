const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { company, name } = req.query
  const queryObject = {}

  if (company) {
    queryObject.company = company
  }

  if (featured) {
    queryObject.featured = featured
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' } // i represents case insensitive
  }

  /* 
    advanced filtering with some tolerance to wrong names using mongodb regex
    iphone only returned iphone before
    but now it returns iphone12 also
  */
  const myData = await Product.find(queryObject)
  res.status(200).json({ myData })
}

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query) // using req.query get /api/testing?company=mi&user=hello
  res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting }
