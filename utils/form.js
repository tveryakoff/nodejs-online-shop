const formidable = require('formidable')
const path = require('path')
const rootDir = require('../constants/rootDir')

const parseMultiPartForm = (req,  options = {}, acceptedFormats) => {
  const form = formidable({
    multiples: false,
    uploadDir: path.resolve(rootDir, 'public', 'uploads'),
    filename:(name, ext) => `${name}-${Date.now()}${ext}`,
    keepExtensions: true,
    filter: ({name, originalFileName, mimetype}) => {
      if (!acceptedFormats) {
        return true
      }
      if (acceptedFormats.indexOf(mimetype) === -1) {
        throw new Error(`${mimetype} is not supported`)
      }
      else return true
    },
    ...options
  })

  return new Promise((resolve, reject) => (
    form.parse(req, (err, body, files) => {
      console.log('files', body)
      if (err) {
        reject(err)
      }
      console.log('fields', body, 'files', files)
      resolve({body, files})
    })
  ))
}

module.exports = {
  parseMultiPartForm
}
