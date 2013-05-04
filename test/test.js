/**
 * Created: vogdb Date: 5/4/13 Time: 12:13 PM
 */

var control
var map
var mapnikLayer

module("white box", {
    setup: function () {
        var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

        mapnikLayer = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {attribution: attribution}
        )
        var blackAndWhite = L.tileLayer(
            'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
            {attribution: attribution}
        )
        var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
            opacity: 0.5
        })

        map = L.map('map', {
            center: new L.LatLng(39.73, -104.99),
            zoom: 10,
            layers: [mapnikLayer, clouds]
        })

        var baseLayers = {
            'Mapnik': mapnikLayer,
            'Black and Whilte': blackAndWhite
        }

        var overlayLayers = {
            'Clouds': clouds
        }

        control = L.control.activeLayers(baseLayers, overlayLayers)
        control.addTo(map)
    }
})

test("after construction", 1, function () {
    equal(control.getActiveBaseLayer().name, 'Mapnik')
})
