# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start Expo development server
- `pnpm start` - Start with dev client
- `pnpm ios` - Run on iOS device
- `pnpm android` - Run on Android
- `pnpm prebuild` - Generate native directories (run after changing native config)
- `pnpm tsc:check` - TypeScript type checking
- `pnpm format` - Format with Prettier
- `pnpm vitest:run` - Run tests with Vitest

## Architecture

**App**: "Arcane Lens" — MTG/Pokemon/YuGiOh card scanner. Expo SDK 55, React Native 0.83, New Architecture enabled, React 19 with React Compiler.

**Routing**: Expo Router file-based. Tab layout at `src/app/(tabs)/` with 5 tabs: Collection (index), Decks, Scan (center, has camera), Shop, Settings.

**Styling**: Uniwind (NativeWind/Tailwind CSS for RN). Global styles in `src/global.css`. CSS variables for theming (dark-first). Font-weight utilities disabled for Android compat.

**State**:

- Zustand + MMKV persistence for local state (`src/stores/`)
- TanStack Query + MMKV cache persistence for server state (`src/api/`)
- Query cache persisted to MMKV under key `rq-cache`, staleTime=4h, gcTime=Infinity

**API**: Scryfall API (`api.scryfall.com`) for card search. Uses `react-native-nitro-fetch` (not standard fetch). Infinite query pagination pattern.

**Key libs**: Vision Camera (card scanning), Reanimated v4 + Worklets (animations), Gesture Handler, @gorhom/bottom-sheet, @legendapp/list, Skia, pressto (pressables).

**Path alias**: `@/*` → `./src/*`

## Instructions

- Use `React.useEffect`, `React.useCallback`, `React.useMemo` etc — always prefix hooks with `React.`
- Never typecast. Never use `as`.
- JS/TS only — no other languages unless explicitly asked.
- Ask before adding/modifying packages.
- React 19+ so no forwardRef
- Snake_case for variables names
