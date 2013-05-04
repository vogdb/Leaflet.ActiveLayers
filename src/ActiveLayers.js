/**
 * Created: vogdb Date: 5/4/13 Time: 1:54 PM
 */

L.Control.ActiveLayers = L.Control.Layers.extend({

    getActiveBaseLayer: function () {
        return this._activeBaseLayer
    },

    getActiveOverlayLayers: function () {
        return this._activeOverlayLayers
    },

    onAdd: function (map) {
        var container = L.Control.Layers.prototype.onAdd.call(this, map)

        this._activeBaseLayer = this._findActiveBaseLayer()
        this._activeOverlayLayers = this._findActiveOverlayLayers()
        return container
    },

    _findActiveBaseLayer: function () {
        var layers = this._layers
        for (var layerId in layers) {
            if (this._layers.hasOwnProperty(layerId)) {
                var layer = layers[layerId]
                if (!layer.overlay && this._map.hasLayer(layer.layer)) {
                    return layer
                }
            }
        }
        throw new Error('Control doesn\'t have any active base layer!')
    },

    _findActiveOverlayLayers: function () {
        var result = {}
        var layers = this._layers
        for (var layerId in layers) {
            if (this._layers.hasOwnProperty(layerId)) {
                var layer = layers[layerId]
                if (layer.overlay && this._map.hasLayer(layer.layer)) {
                    result[layerId] = layer
                }
            }
        }
        return result
    },

    _onInputClick: function () {
        var i, input, obj,
            inputs = this._form.getElementsByTagName('input'),
            inputsLen = inputs.length,
            baseLayer

        this._handlingClick = true

        for (i = 0; i < inputsLen; i++) {
            input = inputs[i]
            obj = this._layers[input.layerId]

            if (input.checked && !this._map.hasLayer(obj.layer)) {
                this._map.addLayer(obj.layer)
                if (!obj.overlay) {
                    baseLayer = obj.layer
                    this._activeBaseLayer = obj
                } else {
                    this._activeOverlayLayers[input.layerId] = obj
                }
            } else if (!input.checked && this._map.hasLayer(obj.layer)) {
                this._map.removeLayer(obj.layer)
                if (obj.overlay) {
                    delete this._activeOverlayLayers[input.layerId]
                }
            }
        }

        if (baseLayer) {
            this._map.setZoom(this._map.getZoom())
            this._map.fire('baselayerchange', {layer: baseLayer})
        }

        this._handlingClick = false
    }

})

L.control.activeLayers = function (baseLayers, overlays, options) {
    return new L.Control.ActiveLayers(baseLayers, overlays, options)
}
