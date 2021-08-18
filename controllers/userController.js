const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signupPage (req, res) {
    return res.render('signup')
  },
  signup (req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(() => res.redirect('/login'))
  },
  loginPage (red, res) {
    return res.render('login')
  }
}

module.exports = userController
