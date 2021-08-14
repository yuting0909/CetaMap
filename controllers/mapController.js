const { sightingRecord, species } = require('../service/data')

const mapController = {
  getSightingRecords (req, res) {
    res.render('index', { sightingRecord, species })
  },
  filterSightingRecords (req, res) {
    const selectSpecies = req.params.species
    const sortedData = sightingRecord.filter(
      (item) => item.物種中文名 === selectSpecies
    )
    res.render('index', { sightingRecord: sortedData, species, selectSpecies })
  }
}

module.exports = mapController
