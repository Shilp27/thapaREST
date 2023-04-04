const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query
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
    let sortFix = sort.split(',').join(' ')
    apiData = apiData.sort(sortFix)
    // http://localhost:5000/api/products?sort=name,-price
  }
  /* 
    when user uses sort in URL, the req is with ,
    eg. /products?sort=name,price

    so we have to remove ,

    also
    const myData = await Product.find(queryObject).sort(sort)
    this will apply sort everytime even if user does not request so we use apiData
  */

  if (select) {
    /* 
      let selectFix = select.replace(',', ' ')
      here we cannot pass three like name,price,company because we were using replace
    */
    let selectFix = select.split(',').join(' ')
    apiData = apiData.select(selectFix)
    // http://localhost:5000/api/products?select=name,price
  }

  /*
    http://localhost:5000/api/products?page=2&limit=10
    pagination

  */

  let page = Number(req.query.page) || 1 // comes in string page : '2' , and if no page then by default set page 1
  let limit = Number(req.query.limit) || 3 // in our data total 8 so here 3
  let skip = (page - 1) * limit // pagination formula, first page 3 then second page NEXT 3

  // page = 2
  // limit = 3
  // skip = 1 * 3 = 3 (Limit is 3 and page is second, so it skips first 3) (pagination formula)

  apiData = apiData.skip(skip).limit(limit)

  const myData = await apiData
  res.status(200).json({ myData, nbHits: myData.length }) // nbHits variable shows number of data found
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
