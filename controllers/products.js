const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort } = req.query
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

  let apiData = Product.find(queryObject)

  if (sort) {
    let sortFix = sort.replace(',', ' ')
    apiData = apiData.sort(sortFix)
  }
  /* 
    when user uses sort in URL, the req is with ,
    eg. /products?sort=name,price

    so we have to remove ,

    also
    const myData = await Product.find(queryObject).sort(sort)
    this will apply sort everytime even if user does not request so we use apiData
  */
  const myData = await apiData
  res.status(200).json({ myData })
}

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query).sort('-name')
  /* 
    mongoose sort three ways
    query.sort({field:'asc', otherField:-1}) // default asc, can use desc or -1
    query.sort('field -otherField) // - means desc
    query.sort([['field','asc']]) // array way of key value pairs
  */
  res.status(200).json({ myData })
}

module.exports = { getAllProducts, getAllProductsTesting }
