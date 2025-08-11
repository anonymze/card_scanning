// src/shared-components/providers/ThemeProviders.tsx
import { sleepUntilNextFrame } from '@/utils/helper';
import {
  Canvas,
  Circle,
  dist,
  Image,
  ImageShader,
  makeImageFromView,
  mix,
  SkImage,
  vec,
} from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import React, { createContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const { width, height } = Dimensions.get('window');
const cornersScreen = [
  vec(0, 0),
  vec(width, 0),
  vec(width, height),
  vec(0, height),
];

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
  const [active, setActive] = React.useState(false);
  const [snapshotOldTheme, setSnapshotOldTheme] =
    React.useState<SkImage | null>(null);
  const [snapshotNewTheme, setSnapshotNewTheme] =
    React.useState<SkImage | null>(null);
  const transition = useSharedValue(0);
  const circle = useSharedValue({
    x: 0,
    y: 0,
    radius: 0,
  });
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.radius);
  });
  const [colorSchemeReactive, setColorSchemeReactive] =
    React.useState(colorScheme);

  const toggleTheme = async (x?: number, y?: number) => {
    if (active) return;
    if (!x || !y) {
      return setColorSchemeReactive(
        colorSchemeReactive === 'light' ? 'dark' : 'light',
      );
    }

    setActive(true);

    const r = Math.max(
      ...cornersScreen.map((corner) => dist(corner, { x, y })),
    );
    circle.value = { x, y, radius: r };

    setSnapshotOldTheme(await makeImageFromView(screenshotRef));
    await sleepUntilNextFrame();
    await sleepUntilNextFrame();
    setColorSchemeReactive(colorSchemeReactive === 'light' ? 'dark' : 'light');
    await sleepUntilNextFrame();
    setSnapshotNewTheme(await makeImageFromView(screenshotRef));

    transition.value = 0;
    transition.value = withTiming(1, { duration: 550 }, (finished) => {
      if (finished) {
        runOnJS(setSnapshotOldTheme)(null);
        runOnJS(setSnapshotNewTheme)(null);
        runOnJS(setActive)(false);
      }
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme: colorSchemeReactive, toggleTheme: toggleTheme }}
    >
      <StatusBar style={colorSchemeReactive === 'light' ? 'light' : 'dark'} />
      <View
        collapsable={false}
        ref={screenshotRef}
        style={themeCSSVariables[colorSchemeReactive]}
        className="flex-1"
      >
        {children}
      </View>

      <Canvas
        style={StyleSheet.absoluteFill}
        pointerEvents={active ? 'auto' : 'none'}
      >
        <Image
          image={snapshotOldTheme}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {snapshotNewTheme && (
          <Circle c={circle} r={r}>
            <ImageShader
              image={snapshotNewTheme}
              x={0}
              y={0}
              width={width}
              height={height}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
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
