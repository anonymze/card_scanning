// src/shared-components/providers/ThemeProviders.tsx
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import React, { createContext } from 'react';
import { View } from 'react-native';

const DEFAULT_THEME: ReturnType<typeof useColorScheme>['colorScheme'] = 'dark';

const themes = {
  light: vars({
    '--color-foreground': '#fbbf24',
    '--color-foreground-lighter': '#eab308',
    '--color-foreground-darker': '#f59e0b',
    '--color-gray': '#94a3b8',
    '--color-bg-primary': '#1e293b',
    '--color-bg-primary-lighter': '#334155',
    '--color-bg-primary-darker': '#0f172a',
    '--color-bg-secondary': '#2563eb',
    '--color-bg-secondary-lighter': '#3b82f6',
    '--color-bg-secondary-darker': '#0891b2',
  }),
  dark: vars({
    '--color-foreground': '#fbbf24',
    '--color-foreground-lighter': '#eab308',
    '--color-foreground-darker': '#f59e0b',
    '--color-gray': '#94a3b8',
    '--color-bg-primary': '#1e293b',
    '--color-bg-primary-lighter': '#334155',
    '--color-bg-primary-darker': '#0f172a',
    '--color-bg-secondary': '#2563eb',
    '--color-bg-secondary-lighter': '#3b82f6',
    '--color-bg-secondary-darker': '#0891b2',
  }),
};

export const ThemeContext = createContext<{
  theme: ReturnType<typeof useColorScheme>['colorScheme'];
  toggleTheme: () => void;
}>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme = DEFAULT_THEME } = useColorScheme();
  const [colorSchemeReactive, setColorSchemeReactive] =
    React.useState(colorScheme);

  const toggleTheme = () => {
    setColorSchemeReactive(colorSchemeReactive === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{ theme: colorSchemeReactive, toggleTheme: toggleTheme }}
    >
      <StatusBar style={colorSchemeReactive === 'light' ? 'light' : 'dark'} />
      <View
        style={themes[colorSchemeReactive]}
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
