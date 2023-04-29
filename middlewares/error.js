const errorMiddleware = (error, req, res, next) => {
  if (!error.status) {
    return res.status(404).render('errors/404', {pageTitle: '404'})
  }
  switch (error.status) {
    case (500):
      return res.status(500).render('errors/500', {pageTitle: '500'})
    case (404):
      return res.status(404).render('errors/404', {pageTitle: '404'})
    default:
      return res.status(500).render('errors/500', {pageTitle: '500'})
  }
}

module.exports = errorMiddleware
