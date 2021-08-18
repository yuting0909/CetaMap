const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  signupPage (req, res) {
    return res.render('signup')
  },
  signup (req, res) {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', '兩次密碼不相同!')
      return res.redirect('/signup')
    }
    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        req.flash('error_messages', '信箱重複')
        return res.redirect('/signup')
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
      }).then(() => {
        req.flash('success_messages', '成功註冊帳號')
        return res.redirect('/login')
      })
    })
  },
  loginPage (red, res) {
    return res.render('login')
  }
}

module.exports = userController
