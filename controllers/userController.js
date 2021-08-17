const userController = {
  signupPage (req, res) {
    return res.render('signup')
  },
  loginPage (red, res) {
    return res.render('login')
  }
}

module.exports = userController
