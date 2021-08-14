const { speciesCounts } = require('../service/data')

const visualController = {
  getSpeciesComposition (req, res) {
    res.render('speciesComposition', { speciesCounts })
  },
  getTemporalDistribution (req, res) {
    res.render('temporalDistribution')
  }
}
module.exports = visualController
