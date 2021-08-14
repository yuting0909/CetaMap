import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'leaflet/dist/leaflet.css'
import '../css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import * as d3 from 'd3'
import { species, observedYears, annualCounts, monthCountsAll, getSpeciesMonthCounts } from './data-processing'

const selectedSpecies = ['all']
species.unshift('all')
const colors = d3.scaleOrdinal()
  .domain(species.map(d => d))
  .range(d3.schemeCategory10.concat(d3.schemePaired).concat(d3.schemeDark2).slice(0, species.length))

function annualChange () {
  const dataset = annualCounts.map(item => ({
    ...item,
    visible: item.name === 'all'
  }))
  const years = observedYears
  const width = document.querySelector('#annual-distribution-chart').offsetWidth
  const height = 300
  const svg = d3.select(document.querySelector('#annual-distribution-chart'))
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
  const margin = { top: 20, right: 20, bottom: 30, left: 45 }
  const findMaxY = function (data) {
    const maxValues = data.map(item => {
      if (item.visible) return d3.max(item.values)
      return 0
    })
    return d3.max(maxValues)
  }
  const xScale = d3.scaleLinear()
    .domain(d3.extent(years))
    .range([margin.left, width - margin.right])
  const yScale = d3.scaleLinear()
    .domain([0, findMaxY(dataset)])
    .range([height - margin.bottom, margin.top])
  const axisX = d3.axisBottom().scale(xScale).ticks(10).tickFormat(d3.format('d')).tickSize(4)
  const axisY = d3.axisLeft().scale(yScale).ticks(5).tickSize(4)
  svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisX)
  svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisY)
  svg.select('.axisY')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -20)
    .attr('y', -30)
    .attr('fill', '#5D6971')
    .attr('text-anchor', 'end')
    .text('觀測紀錄數')
  const line = d3.line()
    .x((d, i) => xScale(years[i]))
    .y(d => yScale(d))
    .curve(d3.curveBumpX)
  const species = svg.selectAll('.species')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'species')
  species.append('path')
    .attr('class', 'line')
    .attr('id', d => d.name)
    .attr('d', d => d.visible ? line(d.values) : null)
    .attr('stroke', d => colors(d.name))
    .attr('stroke-width', 2)
    .attr('fill', 'none')
  const legend = d3
    .select(document.querySelector('#temporal-distribution-legend'))
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class', 'legend')
    .attr('id', d => d.name)
  legend.append('div')
    .attr('class', 'legend-box')
    .style('background-color', d => d.visible ? colors(d.name) : '#F1F1F2')
    .on('click', (e, d) => {
      d.visible = !d.visible
      yScale.domain([0, findMaxY(dataset)])
      svg.select('.axisY')
        .transition()
        .call(axisY)
      species.select('path')
        .transition()
        .attr('d', d => d.visible ? line(d.values) : null)
        .attr('stroke', d => colors(d.name))
      legend.select('.legend-box')
        .transition()
        .style('background-color', d => d.visible ? colors(d.name) : '#F1F1F2')
      // change month-distribution chart
      if (d.visible) {
        selectedSpecies.push(d.name)
      } else {
        selectedSpecies.splice(selectedSpecies.indexOf(d.name), 1)
      }
      const selectedSpeciesMonthCounts = selectedSpecies.length === 1 && selectedSpecies.includes('all') ? monthCountsAll : getSpeciesMonthCounts(selectedSpecies)
      monthChange(selectedSpeciesMonthCounts)
    })
    .on('mouseover', e => {
      d3.select(e.target)
        .transition()
        .style('background-color', d => colors(d.name))
    })
    .on('mouseout', e => {
      d3.select(e.target)
        .transition()
        .style('background-color', d => d.visible ? colors(d.name) : '#F1F1F2')
    })
  legend.append('span')
    .text(d => {
      if (d.name === 'all') {
        return '全部'
      } else {
        return d.name
      }
    })
  const tooltip = d3.select('#annual-distribution-tooltip')
  const tooltipLine = svg.append('line')
  const tipBox = svg.append('rect')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('opacity', 0)
    .on('mousemove', (e) => {
      const year = Math.floor(xScale.invert(d3.pointer(e, tipBox.node())[0]) + 3)
      const visibleData = dataset.filter(data => data.visible).map(item => ({
        ...item,
        values: item.values.map((value, i) => ({
          year: years[i],
          value: value
        }))
      }))
      visibleData.sort((a, b) => b.values.find(v => v.year === year).value - a.values.find(v => v.year === year).value)
      tooltipLine
        .attr('x1', xScale(year))
        .attr('x2', xScale(year))
        .attr('y1', margin.top)
        .attr('y2', height - margin.bottom)
      tooltip.html(year)
        .style('left', `${e.pageX + 20}px`)
        .style('top', `${e.pageY - 20}px`)
        .selectAll('div')
        .data(visibleData)
        .enter()
        .append('div')
        .style('color', d => colors(d.name))
        .html(d => d.name === 'all' ? `全部：${d.values.find(value => value.year === year).value}` : `${d.name}：${d.values.find(value => value.year === year).value}`)
    })
    .on('mouseover', () => {
      tooltip.style('display', 'block')
      tooltipLine.attr('stroke', '#696969').attr('stroke-dasharray', '3,3')
    })
    .on('mouseout', () => {
      tooltip.style('display', 'none')
      tooltipLine.attr('stroke', 'none')
    })
}

function monthChange (data) {
  d3.select(document.querySelector('#month-distribution-chart svg')).remove()
  const dataset = d3.stack().keys(data.columns.slice(1))(data)
  const months = Array.from({ length: 12 }, (v, k) => k + 1)
  const width = document.querySelector('#month-distribution-chart').offsetWidth
  const height = 300
  const svg = d3.select(document.querySelector('#month-distribution-chart'))
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
  const margin = { top: 20, right: 20, bottom: 30, left: 45 }
  const xScale = d3.scaleBand()
    .domain(months)
    .range([margin.left, width - margin.right])
    .padding(0.2)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))])
    .range([height - margin.bottom, margin.top])
  const axisX = d3.axisBottom().scale(xScale).ticks(10).tickFormat(d3.format('d')).tickSize(4)
  const axisY = d3.axisLeft().scale(yScale).ticks(5).tickSize(4)
  svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisX)
  svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisY)
  svg.select('.axisY')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -20)
    .attr('y', -30)
    .attr('fill', '#5D6971')
    .attr('text-anchor', 'end')
    .text('觀測紀錄數')
  const tooltip = d3.select('#month-distribution-tooltip')
  svg.append('g')
    .selectAll('g')
    .data(dataset)
    .join('g')
    .attr('fill', d => colors(d.key))
    .selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', (d, i) => xScale(d.data.month))
    .attr('y', d => yScale(d[1]))
    .attr('height', d => yScale(d[0]) - yScale(d[1]))
    .attr('width', xScale.bandwidth())
    .on('mouseover', (e, d) => {
      const subgroupName = d3.select(e.target.parentNode).datum().key
      const subgroupValue = d.data[subgroupName]
      tooltip
        .html(subgroupName === 'all' ? `全部：${subgroupValue}` : `${subgroupName}：${subgroupValue}`)
        .style('display', 'block')
    })
    .on('mousemove', e => {
      tooltip
        .style('left', `${e.pageX + 20}px`)
        .style('top', `${e.pageY - 20}px`)
    })
    .on('mouseout', () => {
      tooltip.style('display', 'none')
    })
}
annualChange()
monthChange(monthCountsAll)
