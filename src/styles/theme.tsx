// src/shared-components/providers/ThemeProviders.tsx
import { makeImageFromView } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import React, { createContext } from 'react';
import { View } from 'react-native';

const DEFAULT_THEME: Exclude<
  ReturnType<typeof useColorScheme>['colorScheme'],
  undefined
> = 'dark';

export const themeRuntimeValues = {
  light: {
    foreground: {
      DEFAULT: 'hsl(43, 96%, 56%)',
      lighter: 'hsl(45, 93%, 47%)',
      darker: 'hsl(38, 92%, 50%)',
    },
    gray: 'hsl(215, 20%, 65%)',
    background: {
      primary: {
        DEFAULT: 'hsl(217, 33%, 17%)',
        lighter: 'hsl(215, 25%, 27%)',
        darker: 'hsl(222, 47%, 11%)',
      },
      secondary: {
        DEFAULT: 'hsl(221, 83%, 53%)',
        lighter: 'hsl(217, 91%, 60%)',
        darker: 'hsl(192, 91%, 36%)',
      },
    },
  },
  dark: {
    foreground: {
      DEFAULT: 'hsl(43, 96%, 56%)',
      lighter: 'hsl(45, 93%, 47%)',
      darker: 'hsl(38, 92%, 50%)',
    },
    gray: 'hsl(215, 20%, 65%)',
    background: {
      primary: {
        DEFAULT: 'hsl(217, 33%, 17%)',
        lighter: 'hsl(215, 25%, 27%)',
        darker: 'hsl(77, 81.82%, 43.14%)',
        // darker: 'hsl(222, 47%, 11%)',
      },
      secondary: {
        DEFAULT: 'hsl(221, 83%, 53%)',
        lighter: 'hsl(217, 91%, 60%)',
        darker: 'hsl(192, 91%, 36%)',
      },
    },
  },
} as const;

const themeCSSVariables = {
  light: vars({
    '--color-foreground': themeRuntimeValues.light.foreground.DEFAULT,
    '--color-foreground-lighter': themeRuntimeValues.light.foreground.lighter,
    '--color-foreground-darker': themeRuntimeValues.light.foreground.darker,
    '--color-gray': themeRuntimeValues.light.gray,
    '--color-background-primary':
      themeRuntimeValues.light.background.primary.DEFAULT,
    '--color-background-primary-lighter':
      themeRuntimeValues.light.background.primary.lighter,
    '--color-background-primary-darker':
      themeRuntimeValues.light.background.primary.darker,
    '--color-background-secondary':
      themeRuntimeValues.light.background.secondary.DEFAULT,
    '--color-background-secondary-lighter':
      themeRuntimeValues.light.background.secondary.lighter,
    '--color-background-secondary-darker':
      themeRuntimeValues.light.background.secondary.darker,
  }),
  dark: vars({
    '--color-foreground': themeRuntimeValues.dark.foreground.DEFAULT,
    '--color-foreground-lighter': themeRuntimeValues.dark.foreground.lighter,
    '--color-foreground-darker': themeRuntimeValues.dark.foreground.darker,
    '--color-gray': themeRuntimeValues.dark.gray,
    '--color-background-primary':
      themeRuntimeValues.dark.background.primary.DEFAULT,
    '--color-background-primary-lighter':
      themeRuntimeValues.dark.background.primary.lighter,
    '--color-background-primary-darker':
      themeRuntimeValues.dark.background.primary.darker,
    '--color-background-secondary':
      themeRuntimeValues.dark.background.secondary.DEFAULT,
    '--color-background-secondary-lighter':
      themeRuntimeValues.dark.background.secondary.lighter,
    '--color-background-secondary-darker':
      themeRuntimeValues.dark.background.secondary.darker,
  }),
} as const;

export const ThemeContext = createContext<{
  theme: Exclude<ReturnType<typeof useColorScheme>['colorScheme'], undefined>;
  toggleTheme: (x?: number, y?: number) => Promise<void>;
}>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const screenshotRef = React.useRef<View>(null!);
  const { colorScheme = DEFAULT_THEME } = useColorScheme();
  const [colorSchemeReactive, setColorSchemeReactive] =
    React.useState(colorScheme);

  const toggleTheme = async (x?: number, y?: number) => {
    const overlay1 = await makeImageFromView(screenshotRef);
    console.log(x,y)
    setColorSchemeReactive(colorSchemeReactive === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{ theme: colorSchemeReactive, toggleTheme: toggleTheme }}
    >
      <StatusBar style={colorSchemeReactive === 'light' ? 'light' : 'dark'} />
      <View
        ref={screenshotRef}
        style={themeCSSVariables[colorSchemeReactive]}
        className="flex-1"
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
