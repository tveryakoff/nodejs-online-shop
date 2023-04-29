const {body} = require('express-validator')
const {User} = require("../models/user");


const signInValidator = [
  body('email', 'Please enter a valid email address').notEmpty().withMessage('This field is required').isEmail(),
  body('email').custom(async (value, {req}) => {
    const user = await User.findOne({email: value})
    if (!user) {
      throw new Error(`User with email '${value}' doesn't exists`)
    }
    return true
  }),
]

const signUpValidator = [
  body('email', 'Please enter a valid email address').notEmpty().withMessage('This field is required').isEmail(),
  body('email').custom(async (value, {req}) => {
    const user = await User.findOne({email: value})
    if (user) {
      throw new Error(`User with email '${value}' already exists`)
    }
    return true
  }),
  body('password', 'Password must contain at least 2 characters').notEmpty().withMessage('This field is required').isLength({min:2}),
  body('confirmPassword').notEmpty().withMessage('This.field is required').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords have to match')
    }

    return true
  })
]

module.exports = {
  signInValidator,
  signUpValidator
}
