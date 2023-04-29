const {validationResult} = require("express-validator");


const getRequestFlashedError = (req) => {
  let errorMessage = req.flash('error')
  if (errorMessage.length && errorMessage.length > 1) {
    errorMessage = errorMessage[0]
  }
  return errorMessage
}


const getValidationErrorsMapped = (req) => {
  const errors = validationResult(req).formatWith((e => e.msg)).mapped()
  const isEmpty = !Object.keys(errors).length
  return {errors, isEmpty }
}


module.exports = {
  getRequestFlashedError,
  getValidationErrorsMapped
}
