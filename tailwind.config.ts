import type { Config } from 'tailwindcss';

const config = {
  corePlugins: {
    // we remove the font weight because we use the font family instead for each font, and font weight can interfere with the font family on Android
    // when you set font-bold for example, it sets the font weight and the font family so the font family will still be applied
    // fontWeight: false,
    // default base style tailwind on elements (does not remove utilities ex: text-white)
    preflight: true,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // light: ["PlusJakartaSans-Light"],
      // regular: ["PlusJakartaSans-Regular"],
      // medium: ["PlusJakartaSans-Medium"],
      // semibold: ["PlusJakartaSans-SemiBold"],
      // bold: ["PlusJakartaSans-Bold"],
      // italic: ["PlusJakartaSans-Italic"],
    },
    extend: {
      colors: {
        foreground: {
          DEFAULT: '#fbbf24',
          light: '#eab308',
          dark: '#f59e0b',
        },
        gray: '#94a3b8',
        background: {
          primary: '#1e293b',
          primaryLight: '#334155',
          primaryDark: '#0f172a',
          secondary: '#2563eb',
          secondaryLight: '#3b82f6',
          secondaryDark: '#0891b2',
        },
      },
    },
  },
} satisfies Config;

export default config;
