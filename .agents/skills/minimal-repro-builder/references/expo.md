# Expo / React Native

## Scaffold

```bash
npx --yes create-expo-app@latest <name> --template blank-typescript --no-install
cd <name>
```

The `blank-typescript` template gives the smallest viable Expo SDK app. Avoid `tabs` or `default` templates — they pull in `expo-router` + many native modules.

## Required peer / anchor packages (must match!)

Copy these versions from the **source project's** `package.json` verbatim:

- `expo`
- `react`
- `react-native` — **most common cause of native build failure if it diverges from `expo`**

The `create-expo-app` template ships with whatever Expo SDK is current at scaffold time. If the user's project is on a different SDK, override these three packages immediately after scaffolding.

## Frequently-needed extras (only if applicable)

Add only if the bug or transitive deps require them:

| Package | When needed |
|---|---|
| `expo-linking` | Almost always for SDK 55+ — `expo` runtime probes for it via JS. Without it: `[runtime not ready]: Error: Cannot find native module 'ExpoLinking'`. Match user's version (e.g. `~55.0.8`). |
| `expo-dev-client` | If running on a real device with custom native modules (vision-camera, skia, etc.). Skip if Expo Go works. |
| `expo-status-bar` | Already in template — keep. |

## Native config in `app.json`

Most native packages need permissions / config in `app.json`. Common ones:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.repro.<slug>",
      "infoPlist": {
        "NSCameraUsageDescription": "...",
        "NSMicrophoneUsageDescription": "...",
        "NSLocationWhenInUseUsageDescription": "..."
      }
    },
    "android": {
      "package": "com.repro.<slug>",
      "permissions": ["android.permission.CAMERA", "..."]
    }
  }
}
```

Strip everything else from `app.json` (icon, splash, web, orientation if irrelevant).

## Build & run

```bash
pnpm prebuild   # generates ios/ + android/ folders
pnpm ios        # or: pnpm android
```

`prebuild --clean` if the native folders get out of sync.

## Common gotchas

- **Multiple Metro instances colliding.** If the dev client connects to the wrong Metro, you'll see bundle errors mentioning files that don't exist in the repro. Kill all `expo start` / `metro` processes before launching the repro, and force-quit any other dev client app on the device.
- **`expo` SDK ↔ `react-native` version mismatch.** Each Expo SDK pins a specific RN range (e.g. SDK 55 → RN 0.83.x). Using a newer RN causes Swift/Kotlin compile errors like `missing argument for parameter 'bundleConfiguration'`.
- **`pnpm` blocks postinstall scripts.** Native packages with build steps (e.g. `@shopify/react-native-skia`) need to be whitelisted:
  ```json
  "pnpm": { "onlyBuiltDependencies": ["@shopify/react-native-skia"] }
  ```
- **Bundle ID conflicts.** If the user already has an app installed with the same bundle ID, the repro install can collide. Use a unique `com.repro.<slug>`.

## Entry conventions

- Default template uses `index.ts` → `App.tsx` (`registerRootComponent(App)`).
- `expo-router` projects use `"main": "expo-router/entry"`. Don't use this unless the bug actually needs expo-router.
