const path = require('path')

module.exports = {
  entry: './src/ActiveLayers.js',
  output: {
    filename: 'leaflet.active-layers.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
};
