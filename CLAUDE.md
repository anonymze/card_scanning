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

This is a modern Expo app template with React Native New Architecture enabled and React Compiler support.

### Tech Stack

- **Framework**: Expo SDK 53 with React Native 0.79
- **Router**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State**: React 19 with React Compiler
- **Testing**: Vitest with React Native support
- **Storage**: MMKV for fast key-value storage
- **Animations**: React Native Reanimated v4 + Worklets
- **Gestures**: React Native Gesture Handler
- **UI Libraries**: @gorhom/bottom-sheet, @legendapp/list

### Project Structure

- `src/app/` - Expo Router pages (file-based routing)
- `src/components/ui/` - Reusable UI components
- `src/styles/global.css` - Global Tailwind CSS styles
- `src/assets/` - App icons, splash screens, images
- `src/lib/` - Utility functions and configurations

### Key Configuration

- **Metro**: Configured with NativeWind integration
- **Tailwind**: Custom color palette, disabled font-weight for Android compatibility
- **Expo Plugins**: dev-launcher, router, localization, font, web-browser, edge-to-edge
- **Experiments**: React Canary, React Compiler, typed routes, build cache, tsconfig paths
- **New Architecture**: Enabled for both iOS and Android


### Testing

Uses Vitest with `vitest-react-native` for React Native testing support.

### Package Manager

Uses pnpm as the package manager (specified in packageManager field).

# Instructions

- Use React. something when calling a a hook like useEffect or callback or memo etc... ex: React.useEffect
