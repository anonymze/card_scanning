# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `pnpm dev` - Start Expo development server
- `pnpm start` - Start with dev client
- `pnpm ios` - Run on iOS device (iPhone 16 Pro)
- `pnpm android` - Run on Android
- `pnpm web` - Run on web

### Building & Prebuild

- `pnpm prebuild` - Generate native directories

### Code Quality

- `pnpm tsc:check` - TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm vitest:run` - Run tests with Vitest

## Architecture Overview

This is a card scanning React Native app built with modern Expo SDK 53 and React Native New Architecture enabled.

### Tech Stack

- **Framework**: Expo SDK 53 with React Native 0.79
- **Router**: Expo Router with file-based routing and typed routes
- **Styling**: NativeWind (Tailwind CSS for React Native) with custom color theme
- **State Management**: Zustand for global state, React 19 with React Compiler
- **Testing**: Vitest with `vitest-react-native` plugin
- **Storage**: MMKV for fast key-value storage
- **Animations**: React Native Reanimated v4 + Worklets
- **Gestures**: React Native Gesture Handler
- **Camera**: React Native Vision Camera for card scanning functionality
- **UI Libraries**: @gorhom/bottom-sheet, @legendapp/list, React Native Linear Gradient

### Project Structure

- `src/app/` - Expo Router pages with tab-based navigation
- `src/app/(tabs)/` - Tab navigation structure (decks, index/scan, settings)
- `src/components/` - Component library including camera components and UI elements
- `src/components/ui/` - Reusable UI components (buttons, etc.)
- `src/lib/` - Utility functions and store configurations
- `src/styles/global.css` - Global Tailwind CSS styles
- `src/assets/` - App icons, splash screens, images

### Key Configuration

- **Metro**: Configured with NativeWind integration via `withNativeWind`
- **Tailwind**: Custom color palette focused on amber/yellow theme, preflight enabled
- **Expo Plugins**: dev-launcher, router, localization, font, edge-to-edge, vision-camera
- **Experiments**: React Canary, React Compiler, typed routes, build cache, tsconfig paths
- **New Architecture**: Enabled for both iOS and Android
- **Vision Camera**: Configured for camera permissions without microphone access

### App Architecture

- **Tab Navigation**: Three main tabs - Decks, Scan (center with custom UI), Settings
- **Global State**: Zustand store for loader state management across the app
- **Camera Integration**: Vision camera with permission handling and fallback UI states
- **Styling System**: NativeWind with custom Tailwind config and linear gradients

### Testing

Uses Vitest with `vitest-react-native` plugin for React Native testing support.

### Package Manager

Uses pnpm as the package manager (version 10.12.4).

## Development Guidelines

- Use `React.` prefix when calling hooks (useEffect, useCallback, memo, etc.)
- App uses French language for UI text
- Custom color scheme based on amber/yellow theme with dark backgrounds
- All components should use NativeWind classes for styling
