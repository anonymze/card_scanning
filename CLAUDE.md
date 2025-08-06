# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern React Native & Expo app template using Expo Router with file-based routing. The app uses:

- **Expo 54 canary** with React Native 0.80.1 and New Architecture
- **Expo Router** for navigation with app directory structure
- **NativeWind** with Tailwind CSS for styling
- **React Compiler** for optimization
- **TypeScript** with strict configuration
- **fbtee** for internationalization
- **ESM modules** (`"type": "module"` in package.json)
- **Vitest** for testing

## Essential Commands

```bash
# Install dependencies and setup
pnpm install && pnpm dev:setup

# Development
pnpm dev                 # Start Expo development server
pnpm prebuild           # Generate native code
pnpm ios                # Run on iOS simulator (iPhone 16 Pro)
pnpm android            # Run on Android
pnpm web                # Run web version

# Testing and Quality
pnpm test               # Run full test suite (tsc, vitest, lint, format check)
pnpm tsc:check          # TypeScript check
pnpm vitest:run         # Run Vitest tests
pnpm lint               # ESLint
pnpm lint:format        # Check Prettier formatting
pnpm format             # Format code with Prettier

# Internationalization
pnpm fbtee:all          # Collect and translate fbtee strings
```

## Architecture

### File-based Routing
- `src/app/_layout.tsx` - Root layout with GestureHandlerRootView
- `src/app/(app)/` - Main app routes (protected/authenticated area)
- `src/app/(app)/(tabs)/` - Tab navigation structure
- Uses Expo Router's `unstable_settings.initialRouteName: '(app)'`

### Styling System
- **NativeWind 4.x** configured with `jsxImportSource: 'nativewind'` in Babel
- Global styles in `src/styles/global.css` (referenced as `global.css` in imports)
- Metro configured with NativeWind integration pointing to global CSS
- Tailwind config at `tailwind.config.ts`
- Path alias `@/*` maps to `./src/*`

### Build Tools
- **Metro** with NativeWind integration and Sentry config
- **Babel** with Expo preset and NativeWind preset
- **Vitest** with React Native plugin and fbtee preset for Babel
- **ESLint** with `@nkzw/eslint-config`
- **TypeScript** extends `expo/tsconfig.base` with strict settings

### Package Management
- Uses **pnpm 10+** as package manager
- ESM-only project configuration
- Patches applied via `patches/` directory

## Development Notes

- Run initial setup with `pnpm dev:setup` after installing dependencies (handles fbtee translations)
- iOS development targets iPhone 16 Pro by default
- React Compiler is enabled for optimization
- TypeScript is configured with strict mode and path mapping