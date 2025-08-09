import { vars } from 'nativewind';
import type { Config } from 'tailwindcss';

export const themes = {
  light: vars({
    '--color-foreground': '#fbbf24',
    '--color-foreground-light': '#eab308',
    '--color-foreground-dark': '#f59e0b',
    '--color-gray': '#94a3b8',
    '--color-bg-primary': '#1e293b',
    '--color-bg-primary-light': '#334155',
    '--color-bg-primary-dark': '#0f172a',
    '--color-bg-secondary': '#2563eb',
    '--color-bg-secondary-light': '#3b82f6',
    '--color-bg-secondary-dark': '#0891b2',
  }),
  dark: vars({
    '--color-foreground': '#fde047',
    '--color-foreground-light': '#facc15',
    '--color-foreground-dark': '#eab308',
    '--color-gray': '#64748b',
    '--color-bg-primary': '#0f172a',
    '--color-bg-primary-light': '#1e293b',
    '--color-bg-primary-dark': '#020617',
    '--color-bg-secondary': '#1d4ed8',
    '--color-bg-secondary-light': '#2563eb',
    '--color-bg-secondary-dark': '#1e40af',
  }),
};

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
          primary: {
            DEFAULT: '#1e293b',
            light: '#334155',
            dark: '#0f172a',
          },
          secondary: {
            DEFAULT: '#2563eb',
            light: '#3b82f6',
            dark: '#0891b2',
          },
        },
      },
    },
  },
} satisfies Config;

export default config;
