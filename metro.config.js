const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, {
  // Disable CSS support.
  // isCSSEnabled: false,
});

module.exports = withNativeWind(config, { input: './src/styles/global.css' });
