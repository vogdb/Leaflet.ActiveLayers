/**
 * Created: vogdb Date: 5/4/13 Time: 12:13 PM
 */

var control

module("white box", {
    setup: function () {
        var map = L.map('map', {
            center: new L.LatLng(39.73, -104.99),
            zoom: 10,
            layers: testLayers.map
        })

        control = L.control.activeLayers(testLayers.base, testLayers.overlay)
        control.addTo(map)
    }
})

test("after construction", 1, function () {
    equal(control.getActiveBaseLayer().name, testLayers.mapnik.name)
})

asyncTest("after click", 1, function () {
    var blackAndWhiteId = L.stamp(testLayers.blackAndWhite.layer)
    var inputList = document.getElementsByTagName('input')

    for (var i = 0; i < inputList.length; i++) {
        var input = inputList[i]
        if (input.layerId == blackAndWhiteId) {
            happen.once(input.parentNode, {type: 'click'})
            setTimeout(function () {
                equal(control.getActiveBaseLayer().name, testLayers.blackAndWhite.name)
                start()
            }, 1000)
            break
        }
    }
})