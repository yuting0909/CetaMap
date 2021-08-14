
const pointRadio = document.querySelector('#sighting-records')
const gridRadio = document.querySelector('#grid-distribution')
const speciesFilter = document.querySelector('#species-filter')

const osmMap = L.map('map', {
  center: [23.7, 120.9],
  zoom: 7.5, // 0 - 18
  attributionControl: true,
  zoomControl: true
})

const markerLayer = L.layerGroup()
let gridLayer = L.geoJSON()

const myIcon = L.icon({
  iconUrl:
    'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Marker-512.png',
  iconSize: [25, 25]
})

const mapType = {
  sightingRecords: 'sightingRecords',
  gridDistribution: 'gridDistribution'
}

const model = {
  sightingRecords: [],
  gridDistribution: [],
  selectedSpecies:
    speciesFilter.innerText === '請選擇類群' ? 'all' : speciesFilter.innerText
}

const view = {
  displayMap () {
    const baseLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community <br> Copyright © 2021 鯨視 All rights reserved. 資訊來源：台灣生物多樣性網絡'
      }
    )
    osmMap.addLayer(baseLayer)
  },
  displayMarker (data) {
    markerLayer.clearLayers()
    osmMap.removeLayer(gridLayer)
    for (let i = 0; i < data.length; i++) {
      const marker = L.marker([data[i].緯度, data[i].經度], { icon: myIcon })
        .bindPopup(`
          <h3>${data[i].物種中文名}</h3>
          <div>學名：${data[i].物種學名}</div>
          <div>觀測日期：${data[i].觀測日期}</div>
          <div>觀測方式：${data[i].觀測方式}</div>
          <div>敏感資料座標精確度：${data[i].敏感資料座標精確度}</div>
          <div><a href="https://www.tbn.org.tw/occurrence/${data[i].tbnId}" target="_blank">詳細觀測紀錄</a></div>
          `)
      marker.addTo(markerLayer)
    }
    osmMap.addLayer(markerLayer)
    console.log(controller.currentMapType)
  },
  displayGrid (data) {
    markerLayer.clearLayers()
    osmMap.removeLayer(gridLayer)
    gridLayer = L.geoJSON(data, {
      style: this.gridStyle,
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties[model.selectedSpecies]) {
          layer.bindTooltip(`
            <span class="fs-5">觀測紀錄：${
              feature.properties[model.selectedSpecies]
            }筆</span>
          `)
        }
      }
    }).addTo(osmMap)
    console.log(controller.currentMapType)
  },
  gridStyle (feature) {
    if (feature.properties[model.selectedSpecies] === 0) {
      return { weight: 0, fillOpacity: 0 }
    } else if (feature.properties[model.selectedSpecies] < 2) {
      return { weight: 0, fillColor: '#ff0000', fillOpacity: 0.2 }
    } else if (feature.properties[model.selectedSpecies] < 5) {
      return { weight: 0, fillColor: '#ff0000', fillOpacity: 0.4 }
    } else if (feature.properties[model.selectedSpecies] < 10) {
      return { weight: 0, fillColor: '#ff0000', fillOpacity: 0.5 }
    } else {
      return { weight: 0, fillColor: '#ff0000', fillOpacity: 0.6 }
    }
  },
  panTo (record) {
    osmMap.panTo([record.緯度, record.經度])
    L.marker([record.緯度, record.經度], { icon: myIcon })
      .addTo(markerLayer)
      .bindPopup(
        `
          <h3>${record.物種中文名}</h3>
          <div>學名：${record.物種學名}</div>
          <div>觀測日期：${record.觀測日期}</div>
          <div>觀測方式：${record.觀測方式}</div>
          <div>敏感資料座標精確度：${record.敏感資料座標精確度}</div>
          <div><a href="https://www.tbn.org.tw/occurrence/${record.tbnId}" target="_blank">詳細觀測紀錄</a></div>
          `
      )
      .openPopup()
  }
}

const controller = {
  currentMapType:
    localStorage.getItem('currentMapType') || mapType.sightingRecords,
  getRecords () {
    const request = axios.get('Taiwan_Cetacean_occurrence.json')
    return request
  },
  getGrids () {
    const request = axios.get('tbn_cetacean_count.geojson')
    return request
  },
  renderMap () {
    this.getRecords().then(res => {
      if (model.selectedSpecies === 'all') {
        model.sightingRecords = res.data
      } else {
        model.sightingRecords = res.data.filter(
          (data) => data.物種中文名 === model.selectedSpecies
        )
      }
      return this.getGrids()
    }).then(res => {
      model.gridDistribution = res.data.features
      console.log(model)
    }).then(() => {
      view.displayMap()
      localStorage.setItem('currentMapType', this.currentMapType)
      if (this.currentMapType === mapType.sightingRecords) {
        pointRadio.checked = 'on'
        view.displayMarker(model.sightingRecords)
      } else {
        gridRadio.checked = 'on'
        view.displayGrid(model.gridDistribution)
      }
      console.log(this.currentMapType)
    }).catch(error => {
      console.log(error)
    })
  },
  updateMap () {
    if (pointRadio.checked) {
      controller.currentMapType = mapType.sightingRecords
      view.displayMarker(model.sightingRecords)
    }
    if (gridRadio.checked) {
      controller.currentMapType = mapType.gridDistribution
      view.displayGrid(model.gridDistribution)
    }
    localStorage.setItem('currentMapType', controller.currentMapType)
  },
  getRecord (element) {
    const id = element.dataset.id
    const record = model.sightingRecords.find(
      (record) => record.OccurrenceUUID === id
    )
    if (!record.緯度 || !record.經度) { return view.displayMarker(model.sightingRecords) }
    view.panTo(record)
  }
}

controller.renderMap()
pointRadio.addEventListener('change', controller.updateMap)
gridRadio.addEventListener('change', controller.updateMap)
document.querySelectorAll('.sighting-record').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (controller.currentMapType === mapType.gridDistribution) return
    controller.getRecord(element)
  })
})
