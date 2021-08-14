import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'leaflet/dist/leaflet.css'
import '../css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import * as d3 from 'd3'
import { speciesCounts } from './data-processing'

function speciesComposition () {
  const width = document.querySelector('#species-composition-donut-chart').offsetWidth
  const height = Math.min(width, 650)
  const colors = d3.schemePaired.concat(d3.schemeDark2)
  const svg = d3
    .select(document.querySelector('#species-composition-donut-chart'))
    .append('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .append('g')
  const radius = Math.min(width, height) / 2
  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius - 2)
  const pie = d3.pie().value(d => d.percentage)
  svg
    .selectAll('path')
    .data(pie(speciesCounts))
    .enter()
    .append('g')
    .on('mouseover', function (e, d) {
      const g = d3
        .select(this)
        .append('g')
        .attr('class', 'text-group')
      g.append('text')
        .attr('class', 'date')
        .text(`${d.data.name}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1.2em')
      g.append('text')
        .attr('class', 'value-text')
        .text(`${d.data.counts}次`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.6em')
    })
    .on('mouseout', function (e, d) {
      d3.select('.text-group').remove()
    })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => colors[i])
    .attr('fill-opacity', 0.8)
    .attr('stroke', 'white')
    .on('mouseover', function (e, d) {
      d3.select(this).attr('fill-opacity', 1)
    })
    .on('mouseout', function (e, d) {
      d3.select(this).attr('fill-opacity', 0.8)
    })
  const legend = d3
    .select(document.querySelector('#species-composition-legend'))
    .append('svg')
    .attr('height', 500)
    .append('g')
    .attr('transform', 'translate(20, 50)')
    .selectAll('rect')
    .data(speciesCounts)
    .enter()
  legend.append('rect')
    .attr('width', 17)
    .attr('height', 17)
    .attr('fill', (d, i) => colors[i])
    .attr('fill-opacity', 0.8)
    .attr('y', (d, i) => i * 26)
  legend.append('text')
    .attr('fill', 'black')
    .attr('font-size', '15px')
    .text(d => `${d.name} (${d.percentage}%)`)
    .attr('y', (d, i) => i * 26 + 13)
    .attr('x', '22')
}

speciesComposition()
