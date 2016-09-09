# Leaflet.ActiveLayers
It is a plugin for the Leaflet library. This plugin adds new L.Control.ActiveLayers with functionality to get currently active layers on the map.

Supports Leaflet 0.7.x and 1.0+.

## Install

### Bower
```
bower install leaflet.activelayers
```


## Example usage

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

    var control = L.control.activeLayers(baseLayers, overlayLayers)
    control.addTo(map)

    // 'Mapnik'
    console.log(control.getActiveBaseLayer().name)

    //Clouds
    var overlayLayers = control.getActiveOverlayLayers()
    for (var overlayId in overlayLayers) {
        console.log(overlayLayers[overlayId].name)
    }

## API
### get active base layer
    control.getActiveBaseLayer()
return object LL:

    {
        name: 'layer name on the control',
        layer: L.TileLayer,
        overlay: is overlay layer
    }

### get active overlay layers
    control.getActiveOverlayLayers()
return object:

    {layerId: LL}
where LL is the object defined in the previous method and layerId is `L.stamp(LL.layer)`
