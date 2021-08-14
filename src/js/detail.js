import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'leaflet/dist/leaflet.css'
import '../css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import L from 'leaflet'

const detailIcon = L.icon({
  iconUrl:
    'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Marker-512.png',
  iconSize: [25, 25]
})

const detailMap = L.map('sighting-position', {
  center: [23.7, 120.9],
  zoom: 7, // 0 - 18
  attributionControl: true,
  zoomControl: true
})

L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
).addTo(detailMap)

const lat = parseFloat(document.querySelector('.lat').innerText)
const lon = parseFloat(document.querySelector('.lon').innerText)
const position = [lat, lon]
L.marker(position, { icon: detailIcon }).addTo(detailMap)
