import originData from '../../Taiwan_Cetacean_occurrence.json'

const data = {
  sightingRecords: [],
  species: [],
  observedDates: [],
  observedYears: [],
  observedMonths: []
}

const processData = {
  getSightingRecords () {
    return originData.sort((a, b) => a.觀測日期 < b.觀測日期 ? 1 : -1)
  },
  getSpeciesList () {
    return originData.map((item) => item.物種中文名).filter((el, i, arr) => arr.indexOf(el) === i)
  },
  getSpeciesCounts () {
    const speciesCountsObj = data.sightingRecords.map(obj => obj.物種中文名).reduce((obj, item) => {
      if (item in obj) {
        obj[item]++
      } else {
        obj[item] = 1
      }
      return obj
    }, {})
    const totalCounts = data.sightingRecords.length
    const speciesCounts = data.species.map((species) => ({
      name: species,
      counts: speciesCountsObj[species],
      percentage: Math.round(speciesCountsObj[species] / totalCounts * 1000) / 10
    }))
    const otherSpeciesCounts = speciesCounts.filter(species => species.counts <= 1)
    const otherTotalCounts = otherSpeciesCounts.reduce((a, b) => { return a + b.counts }, 0)
    const others = [{
      name: '其他',
      counts: otherTotalCounts,
      percentage: Math.round(otherTotalCounts / totalCounts * 1000) / 10
    }]
    const mainSpeciesCounts = speciesCounts.filter(species => species.counts > 1).concat(others).sort((a, b) => b.counts - a.counts)
    return mainSpeciesCounts
  },
  getObservedDate () {
    return data.species.map(species => ({
      species: species,
      date: data.sightingRecords.filter(record => record.物種中文名 === species).map(record => record.觀測日期)
    }))
  },
  getObservedYear () {
    const observedYear = data.sightingRecords.map(record => Number(record.觀測日期.substring(0, 4))).filter(item => item)
    const minYear = Math.min(...observedYear)
    const maxYear = Math.max(...observedYear)
    const observedYears = []
    for (let i = minYear; i <= maxYear; i++) { observedYears.push(i) }
    return observedYears
  },
  getObservedMonth () {
    return data.observedDates.map(item => ({
      name: item.species,
      month: item.date.map(date => new Date(date).getMonth() + 1).filter(month => month)
    }))
  },
  getAnnualCounts () {
    const annualCounts = data.observedDates.map(item => ({
      name: item.species,
      values: {}
    }))
    for (let i = 0; i < annualCounts.length; i++) {
      const yearObj = data.observedYears.reduce((acc, cur) => {
        acc[cur] = 0
        return acc
      }, {})
      annualCounts[i].values = data.observedDates[i].date.map(date => date.substring(0, 4)).reduce((obj, item) => {
        if (item in obj) { obj[item]++ }
        return obj
      }, yearObj)
      annualCounts[i].values = Object.values(annualCounts[i].values)
    }
    annualCounts.unshift({
      name: 'all',
      values: annualCounts.map(item => item.values).reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    })
    return annualCounts
  },
  getAllMonthCounts () {
    const monthArr = Array.from({ length: 12 }, (v, k) => k + 1).reduce((acc, cur, i) => {
      acc[i] = { month: cur, all: 0 }
      return acc
    }, [])
    const monthCountsAll = data.observedMonths.reduce((acc, cur) => {
      cur.month.forEach(month => {
        acc.find(item => item.month === month).all++
      })
      return acc
    }, monthArr)
    monthCountsAll.columns = ['month', 'all']
    return monthCountsAll
  }
}

data.sightingRecords = processData.getSightingRecords()
data.species = processData.getSpeciesList()
data.observedDates = processData.getObservedDate()
data.observedYears = processData.getObservedYear()
data.observedMonths = processData.getObservedMonth()

export const species = processData.getSpeciesList()
export const speciesCounts = processData.getSpeciesCounts()
export const observedDates = processData.getObservedDate()
export const observedYears = processData.getObservedYear()
export const annualCounts = processData.getAnnualCounts()
export const observedMonths = processData.getObservedMonth()
export const monthCountsAll = processData.getAllMonthCounts()
export function getSpeciesMonthCounts (selectedSpecies) {
  const speciesObj = selectedSpecies.reduce((acc, cur) => {
    acc[cur] = 0
    return acc
  }, {})
  const monthSpeciesArr = Array.from({ length: 12 }, (v, k) => k + 1).reduce((acc, cur, i) => {
    acc[i] = { month: cur }
    acc[i] = { ...acc[i], ...speciesObj }
    return acc
  }, [])
  const monthSpeciesCounts = data.observedMonths.filter(item => item.name in speciesObj).reduce((acc, cur) => {
    cur.month.forEach(month => {
      acc.find(item => item.month === month)[cur.name]++
    })
    return acc
  }, monthSpeciesArr)
  monthSpeciesCounts.columns = ['month', ...selectedSpecies]
  return monthSpeciesCounts
}
