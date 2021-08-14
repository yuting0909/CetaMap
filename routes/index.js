const mapController = require('../controllers/mapController')
const dataController = require('../controllers/dataController')
const visualController = require('../controllers/visualController')

module.exports = (app) => {
  app.get('/', (req, res) => res.redirect('/map'))
  app.get('/map', mapController.getSightingRecords)
  app.get('/map/:species', mapController.filterSightingRecords)
  app.get('/data', (req, res) => res.redirect('/data/sighting-records'))
  app.get('/data/sighting-records', dataController.getSightingRecords)
  app.get('/data/sighting-records/search', dataController.getSightingRecords)
  app.get('/data/sighting-records/:tbnId', dataController.getSightingRecord)
  app.get('/visualization/species-composition', visualController.getSpeciesComposition)
  app.get('/visualization/temporal-distribution', visualController.getTemporalDistribution)
}
