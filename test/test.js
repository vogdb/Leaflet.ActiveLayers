/**
 * Created: vogdb Date: 5/4/13 Time: 12:13 PM
 */

var control

module("white box", {
  setup: function () {
    var map = L.map('map', {
      center: new L.LatLng(39.73, -104.99), zoom: 10, layers: testLayers.map
    })

    control = L.control.activeLayers(testLayers.base, testLayers.overlay)
    control.addTo(map)
  }
})

test("after construction", 2, function () {
  equal(control.getActiveBaseLayer().name, testLayers.mapnik.name)

  var cloudsId = L.stamp(testLayers.clouds.layer)
  equal(
    control.getActiveOverlayLayers()[cloudsId].name
    , testLayers.clouds.name
  )
})

test("after click", 2, function () {
  stop(2)
  var blackAndWhiteId = L.stamp(testLayers.blackAndWhite.layer)
  var cloudsId = L.stamp(testLayers.clouds.layer)
  var inputList = document.getElementById('map').getElementsByTagName('input')

  for (var i = 0; i < inputList.length; i++) {
    var input = inputList[i]
    if (!input.layerId) {
      continue;
    }
    if (blackAndWhiteId == input.layerId) {
      happen.once(input, {type: 'click'})
      setTimeout(function () {
        equal(control.getActiveBaseLayer().name, testLayers.blackAndWhite.name)
        start()
      }, 1000)
    }
    if (cloudsId == input.layerId) {
      happen.once(input, {type: 'click'})
      setTimeout(function () {
        deepEqual(Object.keys(control.getActiveOverlayLayers()).length, 0)
        start()
      }, 1000)
    }
  }
})