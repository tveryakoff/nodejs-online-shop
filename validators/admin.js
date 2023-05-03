const {body} = require('express-validator')

const validateCreateEditProduct = [
  body('title').isString().isLength({min: 3}),
  body('price').isFloat(),
  body('description').isLength({max: 500})
]

module.exports = {
  validateCreateEditProduct
}
