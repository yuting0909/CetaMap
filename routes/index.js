const mapController = require('../controllers/mapController')
const dataController = require('../controllers/dataController')
const visualController = require('../controllers/visualController')
const userController = require('../controllers/userController')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }

  app.get('/', authenticated, (req, res) => res.redirect('/map'))
  app.get('/map', authenticated, mapController.getSightingRecords)
  app.get('/map/:species', authenticated, mapController.filterSightingRecords)
  app.get('/data', authenticated, (req, res) => res.redirect('/data/sighting-records'))
  app.get('/data/sighting-records', authenticated, dataController.getSightingRecords)
  app.get('/data/sighting-records/search', authenticated, dataController.getSightingRecords)
  app.get('/data/sighting-records/:tbnId', authenticated, dataController.getSightingRecord)
  app.get('/visualization/species-composition', authenticated, visualController.getSpeciesComposition)
  app.get('/visualization/temporal-distribution', authenticated, visualController.getTemporalDistribution)

  app.get('/signup', userController.signupPage)
  app.post('/signup', userController.signup)
  app.get('/login', userController.loginPage)
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
  app.get('/logout', userController.logout)
}
