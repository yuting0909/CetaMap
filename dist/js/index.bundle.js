/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"../node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-icons/font/bootstrap-icons.css */ \"../node_modules/bootstrap-icons/font/bootstrap-icons.css\");\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ \"../node_modules/leaflet/dist/leaflet.css\");\n/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/main.css */ \"./css/main.css\");\n/* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.bundle */ \"../node_modules/bootstrap/dist/js/bootstrap.bundle.js\");\n/* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"../node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! leaflet */ \"../node_modules/leaflet/dist/leaflet-src.js\");\n/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvar pointRadio = document.querySelector('#sighting-records');\nvar gridRadio = document.querySelector('#grid-distribution');\nvar speciesFilter = document.querySelector('#species-filter');\nvar osmMap = leaflet__WEBPACK_IMPORTED_MODULE_6___default().map('map', {\n  center: [23.7, 120.9],\n  zoom: 7.5,\n  // 0 - 18\n  attributionControl: true,\n  zoomControl: true\n});\nvar markerLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().layerGroup();\nvar gridLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().geoJSON();\nvar myIcon = leaflet__WEBPACK_IMPORTED_MODULE_6___default().icon({\n  iconUrl: 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Marker-512.png',\n  iconSize: [25, 25]\n});\nvar mapType = {\n  sightingRecords: 'sightingRecords',\n  gridDistribution: 'gridDistribution'\n};\nvar model = {\n  sightingRecords: [],\n  gridDistribution: [],\n  selectedSpecies: speciesFilter.innerText === '請選擇類群' ? 'all' : speciesFilter.innerText\n};\nvar view = {\n  displayMap: function displayMap() {\n    var baseLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {\n      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community <br> Copyright © 2021 鯨視 All rights reserved. 資訊來源：台灣生物多樣性網絡'\n    });\n    osmMap.addLayer(baseLayer);\n  },\n  displayMarker: function displayMarker(data) {\n    markerLayer.clearLayers();\n    osmMap.removeLayer(gridLayer);\n\n    for (var i = 0; i < data.length; i++) {\n      var marker = leaflet__WEBPACK_IMPORTED_MODULE_6___default().marker([data[i].緯度, data[i].經度], {\n        icon: myIcon\n      }).bindPopup(\"\\n          <h3>\".concat(data[i].物種中文名, \"</h3>\\n          <div>\\u5B78\\u540D\\uFF1A<span class=\\\"fst-italic\\\">\").concat(data[i].物種學名, \"</span></div>\\n          <div>\\u89C0\\u6E2C\\u65E5\\u671F\\uFF1A\").concat(data[i].觀測日期 || '無觀測日期', \"</div>\\n          <div>\\u89C0\\u6E2C\\u65B9\\u5F0F\\uFF1A\").concat(data[i].觀測方式, \"</div>\\n          <div>\\u654F\\u611F\\u8CC7\\u6599\\u5EA7\\u6A19\\u7CBE\\u78BA\\u5EA6\\uFF1A\").concat(data[i].敏感資料座標精確度, \"</div>\\n          <div><a href=\\\"/data/sighting-records/\").concat(data[i].tbnId, \"\\\" target=\\\"_blank\\\">\\u8A73\\u7D30\\u89C0\\u6E2C\\u7D00\\u9304</a></div>\\n          \"));\n      marker.addTo(markerLayer);\n    }\n\n    osmMap.addLayer(markerLayer);\n    console.log(controller.currentMapType);\n  },\n  displayGrid: function displayGrid(data) {\n    markerLayer.clearLayers();\n    osmMap.removeLayer(gridLayer);\n    gridLayer = leaflet__WEBPACK_IMPORTED_MODULE_6___default().geoJSON(data, {\n      style: this.gridStyle,\n      onEachFeature: function onEachFeature(feature, layer) {\n        if (feature.properties && feature.properties[model.selectedSpecies]) {\n          layer.bindTooltip(\"\\n            <span class=\\\"fs-5\\\">\\u89C0\\u6E2C\\u7D00\\u9304\\uFF1A\".concat(feature.properties[model.selectedSpecies], \"\\u7B46</span>\\n          \"));\n        }\n      }\n    }).addTo(osmMap);\n    console.log(controller.currentMapType);\n  },\n  gridStyle: function gridStyle(feature) {\n    if (feature.properties[model.selectedSpecies] === 0) {\n      return {\n        weight: 0,\n        fillOpacity: 0\n      };\n    } else if (feature.properties[model.selectedSpecies] < 2) {\n      return {\n        weight: 0,\n        fillColor: '#ff0000',\n        fillOpacity: 0.2\n      };\n    } else if (feature.properties[model.selectedSpecies] < 5) {\n      return {\n        weight: 0,\n        fillColor: '#ff0000',\n        fillOpacity: 0.4\n      };\n    } else if (feature.properties[model.selectedSpecies] < 10) {\n      return {\n        weight: 0,\n        fillColor: '#ff0000',\n        fillOpacity: 0.5\n      };\n    } else {\n      return {\n        weight: 0,\n        fillColor: '#ff0000',\n        fillOpacity: 0.6\n      };\n    }\n  },\n  panTo: function panTo(record) {\n    osmMap.panTo([record.緯度, record.經度]);\n    leaflet__WEBPACK_IMPORTED_MODULE_6___default().marker([record.緯度, record.經度], {\n      icon: myIcon\n    }).addTo(markerLayer).bindPopup(\"\\n          <h3>\".concat(record.物種中文名, \"</h3>\\n          <div>\\u5B78\\u540D\\uFF1A<span class=\\\"fst-italic\\\">\").concat(record.物種學名, \"</span></div>\\n          <div>\\u89C0\\u6E2C\\u65E5\\u671F\\uFF1A\").concat(record.觀測日期 || '無觀測日期', \"</div>\\n          <div>\\u89C0\\u6E2C\\u65B9\\u5F0F\\uFF1A\").concat(record.觀測方式, \"</div>\\n          <div>\\u654F\\u611F\\u8CC7\\u6599\\u5EA7\\u6A19\\u7CBE\\u78BA\\u5EA6\\uFF1A\").concat(record.敏感資料座標精確度, \"</div>\\n          <div><a href=\\\"/data/sighting-records/\").concat(record.tbnId, \"\\\" target=\\\"_blank\\\">\\u8A73\\u7D30\\u89C0\\u6E2C\\u7D00\\u9304</a></div>\\n          \")).openPopup();\n  }\n};\nvar controller = {\n  currentMapType: localStorage.getItem('currentMapType') || mapType.sightingRecords,\n  getRecords: function getRecords() {\n    var request = axios__WEBPACK_IMPORTED_MODULE_5___default().get('/Taiwan_Cetacean_occurrence.json');\n    return request;\n  },\n  getGrids: function getGrids() {\n    var request = axios__WEBPACK_IMPORTED_MODULE_5___default().get('/tbn_cetacean_count.geojson');\n    return request;\n  },\n  renderMap: function renderMap() {\n    var _this = this;\n\n    this.getRecords().then(function (res) {\n      console.log(res.data);\n\n      if (model.selectedSpecies === 'all') {\n        model.sightingRecords = res.data;\n      } else {\n        model.sightingRecords = res.data.filter(function (data) {\n          return data.物種中文名 === model.selectedSpecies;\n        });\n      }\n\n      return _this.getGrids();\n    }).then(function (res) {\n      model.gridDistribution = res.data.features;\n      console.log(model);\n    }).then(function () {\n      view.displayMap();\n      localStorage.setItem('currentMapType', _this.currentMapType);\n\n      if (_this.currentMapType === mapType.sightingRecords) {\n        pointRadio.checked = 'on';\n        view.displayMarker(model.sightingRecords);\n      } else {\n        gridRadio.checked = 'on';\n        view.displayGrid(model.gridDistribution);\n      }\n\n      console.log(_this.currentMapType);\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  },\n  updateMap: function updateMap() {\n    if (pointRadio.checked) {\n      controller.currentMapType = mapType.sightingRecords;\n      view.displayMarker(model.sightingRecords);\n    }\n\n    if (gridRadio.checked) {\n      controller.currentMapType = mapType.gridDistribution;\n      view.displayGrid(model.gridDistribution);\n    }\n\n    localStorage.setItem('currentMapType', controller.currentMapType);\n  },\n  getRecord: function getRecord(element) {\n    var id = element.dataset.id;\n    var record = model.sightingRecords.find(function (record) {\n      return record.OccurrenceUUID === id;\n    });\n\n    if (!record.緯度 || !record.經度) {\n      return view.displayMarker(model.sightingRecords);\n    }\n\n    view.panTo(record);\n  }\n};\ncontroller.renderMap();\npointRadio.addEventListener('change', controller.updateMap);\ngridRadio.addEventListener('change', controller.updateMap);\ndocument.querySelectorAll('.sighting-record').forEach(function (element) {\n  element.addEventListener('click', function (event) {\n    if (controller.currentMapType === mapType.gridDistribution) return;\n    controller.getRecord(element);\n  });\n});\nconsole.log('hot reload success');\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors","main"], () => (__webpack_require__("./js/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;