/**
 * Created: vogdb Date: 5/4/13 Time: 12:13 PM
 */

var control

QUnit.module("white box", {
  beforeEach: function () {
    var map = L.map('map', {
      center: new L.LatLng(39.73, -104.99), zoom: 10, layers: testLayers.map
    })

    control = L.control.activeLayers(testLayers.base, testLayers.overlay)
    control.addTo(map)
  }
})

QUnit.test("after construction", function(assert) {
  assert.equal(control.getActiveBaseLayer().name, testLayers.mapnik.name)

  var cloudsId = L.stamp(testLayers.clouds.layer)
  assert.equal(
    control.getActiveOverlayLayers()[cloudsId].name
    , testLayers.clouds.name
  )
})

QUnit.test("after click", function(assert) {
  const done = assert.async(2)
  var blackAndWhiteId = L.stamp(testLayers.blackAndWhite.layer)
  var cloudsId = L.stamp(testLayers.clouds.layer)
  var inputList = document.getElementById('map').getElementsByTagName('input')

  for (var i = 0; i < inputList.length; i++) {
    var input = inputList[i]
    if (!input.layerId) {
      continue;
    }
    if (blackAndWhiteId === input.layerId) {
      happen.once(input, {type: 'click'})
      setTimeout(function () {
        assert.equal(control.getActiveBaseLayer().name, testLayers.blackAndWhite.name)
        done()
      }, 1000)
    }
    if (cloudsId === input.layerId) {
      happen.once(input, {type: 'click'})
      setTimeout(function () {
        assert.deepEqual(Object.keys(control.getActiveOverlayLayers()).length, 0)
        done()
      }, 1000)
    }
  }
})
