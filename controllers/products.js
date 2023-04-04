const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { company } = req.query
  const queryObject = {}

  if (company) {
    queryObject.company = company
  }

  /* 
    better filtering as if multiple queries and random ?company=apple&asdadsad=sadqew
    then result would be empty
  */
  const myData = await Product.find(queryObject)
  res.status(200).json({ myData })
}

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query) // using req.query get /api/testing?company=mi&user=hello
  res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting }
