const originData = require('../Taiwan_Cetacean_occurrence.json')

const sightingRecord = originData.sort((a, b) => {
  return a.觀測日期 < b.觀測日期 ? 1 : -1
})

const species = sightingRecord.map((item) => item.物種中文名).filter((el, i, arr) => arr.indexOf(el) === i)

const scientificName = sightingRecord.map((item) => item.物種學名).filter((el, i, arr) => arr.indexOf(el) === i)

const speciesCountsObj = sightingRecord.map(obj => obj.物種中文名).reduce((obj, item) => {
  if (item in obj) {
    obj[item]++
  } else {
    obj[item] = 1
  }
  return obj
}, {})
const totalCounts = sightingRecord.length
const speciesCounts = species.map((species, i) => ({
  name: species,
  scientificName: scientificName[i],
  counts: speciesCountsObj[species],
  percentage: Math.round(speciesCountsObj[species] / totalCounts * 1000) / 10
})).sort((a, b) => b.counts - a.counts)

module.exports = { sightingRecord, species, speciesCounts }
