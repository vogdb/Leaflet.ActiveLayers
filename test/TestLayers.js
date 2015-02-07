/**
 * Created: vogdb Date: 5/4/13 Time: 9:47 PM
 */

var TestLayers = function () {
  var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

  this.mapnik = {
    name: 'Mapnik',
    layer: L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        , {attribution: attribution}
    )}

  this.blackAndWhite = {
    name: 'BlackAndWhite',
    layer: L.tileLayer(
        'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'
        , {attribution: attribution}
    )}

  this.clouds = {
    name: 'Clouds',
    layer: L.tileLayer(
        'http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          , opacity: 0.5
        }
    )
  }

  this.wind = {
    name:'Wind',
    layer:L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png', {
      attribution:'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>', opacity:0.5
    })
  }

  this.temperature = {
    name:'Temperature',
    layer:L.tileLayer('http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png', {
      attribution:'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>', opacity:0.5
    })
  }

  this.map = [this.mapnik.layer, this.clouds.layer]

  this.base = {}
  this.base[this.mapnik.name] = this.mapnik.layer
  this.base[this.blackAndWhite.name] = this.blackAndWhite.layer

  this.overlay = {}
  this.overlay[this.clouds.name] = this.clouds.layer
  this.overlay[this.wind.name] = this.wind.layer
  this.overlay[this.temperature.name] = this.temperature.layer
}

var testLayers = new TestLayers()