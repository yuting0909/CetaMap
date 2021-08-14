const { sightingRecord, species } = require('../service/data')

const dataController = {
  getSightingRecords (req, res) {
    let taxonname = ''
    let filteredData = sightingRecord
    if (req.query.taxonname) {
      taxonname = req.query.taxonname
      filteredData = sightingRecord.filter(
        (item) => item.物種中文名.includes(taxonname) || item.物種學名.toLowerCase().includes(taxonname.toLowerCase()) || item.科.toLowerCase().includes(taxonname.toLowerCase())
      )
    }
    let currentPage = parseInt(req.query.page) || 1
    const totalResult = filteredData.length
    const perPage = 20
    const totalPage = Math.ceil(totalResult / perPage)
    if (currentPage > totalPage) {
      currentPage = totalPage
    }
    const pageArray = Array.from(Array(totalPage).keys()).map(item => item + 1)
    const firstItem = (currentPage * perPage) - perPage + 1
    const lastItem = currentPage * perPage
    const tempItem = filteredData.slice(firstItem - 1, lastItem)
    res.render('data', {
      species,
      taxonname,
      sightingRecord: tempItem,
      pagination: {
        currentPage,
        pages: pageArray,
        has_pre: currentPage > 1,
        has_next: currentPage < totalPage
      }
    })
  },
  getSightingRecord (req, res) {
    const id = req.params.tbnId
    const data = sightingRecord.find(item => item.tbnId === id)
    res.render('detail', { sightingRecord: data })
  }
}

module.exports = dataController
