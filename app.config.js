module.exports = {
  expo: {
    name: 'Arcane Lens',
    slug: 'arcane-lens',
    version: '1.0.0',
    scheme: 'arcane-lens',
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './resources/android-icon.png',
    },
    owner: 'anonymze',
    experiments: {
      reactCompiler: true,
      buildCacheProvider: 'eas',
      tsconfigPaths: true,
      typedRoutes: true,
    },
    orientation: 'portrait',
    icon: './resources/app-icon.icon',
    backgroundColor: '#08091A',
    userInterfaceStyle: 'dark',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.anonymze.arcanelens',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        CFBundleDisplayName: 'Arcane Lens',
        NSCameraUsageDescription: '$(PRODUCT_NAME) needs access to your camera.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './resources/android-icon.png',
        backgroundImage: './resources/android-icon.png',
        monochromeImage: './resources/android-icon.png',
      },
      package: 'com.anonymze.arcanelens',
      permissions: ['android.permission.CAMERA'],
    },
    plugins: [
      'expo-router',
      'expo-localization',
      [
        'expo-font',
        {
          fonts: [
            './src/assets/fonts/cinzel/Cinzel-Regular.ttf',
            './src/assets/fonts/cinzel/Cinzel-SemiBold.ttf',
            './src/assets/fonts/cinzel/Cinzel-Bold.ttf',
            './src/assets/fonts/space_grotesk/SpaceGrotesk-Light.ttf',
            './src/assets/fonts/space_grotesk/SpaceGrotesk-Regular.ttf',
            './src/assets/fonts/space_grotesk/SpaceGrotesk-SemiBold.ttf',
            './src/assets/fonts/space_grotesk/SpaceGrotesk-Bold.ttf',
          ],
        },
      ],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#08091A',
          resizeMode: 'contain',
          imageWidth: 200,
          image: './resources/splash.png',
        },
      ],
      [
        'react-native-nano-icons',
        {
          iconSets: [{ inputDir: './src/assets/icons/' }],
        },
      ],
      'react-native-edge-to-edge',
    ],
    extra: {
      router: { origin: false },
      eas: { projectId: 'f0458fef-7e20-44b1-a02f-69f3ad67dc75' },
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
    },
  },
};
