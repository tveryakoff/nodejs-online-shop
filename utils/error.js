const getRequestFlashedError = (req) => {
  let errorMessage = req.flash('error')
  if (errorMessage.length && errorMessage.length > 1) {
    errorMessage = errorMessage[0]
  }
  return errorMessage
}

module.exports = {
  getRequestFlashedError
}
