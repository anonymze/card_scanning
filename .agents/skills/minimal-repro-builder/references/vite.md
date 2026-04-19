# Vite

## Scaffold

```bash
npm create vite@latest <name> -- --template <template>
cd <name>
```

Templates (smallest variants):

| Stack | Template |
|---|---|
| Vanilla JS | `vanilla` |
| Vanilla TS | `vanilla-ts` |
| React JS | `react` |
| React TS | `react-ts` |
| Vue | `vue-ts` |
| Svelte | `svelte-ts` |
| Solid | `solid-ts` |
| Lit | `lit-ts` |
| Preact | `preact-ts` |

## Required peer / anchor packages

- `vite` (always)
- The framework runtime (`react`+`react-dom`, `vue`, `svelte`, etc.)
- `@vitejs/plugin-<framework>` for the chosen framework

Copy versions from source.

## Build & run

```bash
npm run dev      # dev server (port 5173 by default)
npm run build    # production build
npm run preview  # preview production build locally
```

## Common gotchas

- **`type: module` matters.** Vite expects ESM. If the bug is CJS-related, set `"type": "commonjs"` in `package.json` to override.
- **Plugin order matters.** The bug might only show with certain plugin orderings.
- **`vite.config.ts` defaults differ per template.** Check the file for any plugins / aliases that might mask the bug.
