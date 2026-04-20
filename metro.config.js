const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// Bundle .tflite model files as assets so require('./model.tflite') works (metro parse it by default thinking it's javascript)
config.resolver.assetExts.push('tflite', 'pte', 'bin');

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
});
