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
          DEFAULT: 'var(--color-foreground)',
          lighter: 'var(--color-foreground-lighter)',
          darker: 'var(--color-foreground-darker)',
        },
        gray: 'var(--color-gray)',
        background: {
          primary: {
            DEFAULT: 'var(--color-background-primary)',
            lighter: 'var(--color-background-primary-lighter)',
            darker: 'var(--color-background-primary-darker)',
          },
          secondary: {
            DEFAULT: 'var(--color-background-secondary)',
            lighter: 'var(--color-background-secondary-lighter)',
            darker: 'var(--color-background-secondary-darker)',
          },
        },
      },
    },
  },
} satisfies Config;

export default config;
