# Next.js

## Scaffold

```bash
npx create-next-app@latest <name> --typescript --no-git --no-eslint --no-tailwind --no-src-dir --no-import-alias --app
cd <name>
```

Flags strip everything optional (eslint, tailwind, src dir, import alias). Use `--app` for App Router (default) or `--no-app` for Pages Router — match what the bug needs.

## Required peer / anchor packages (must match!)

Copy from source `package.json` verbatim:

- `next`
- `react`
- `react-dom`

`next` ships with a pinned React version. Mismatching them causes opaque hydration / runtime errors.

## Common gotchas

- **Server vs client component matters.** If the bug only fires in a Server Component, place the code at `app/page.tsx` without `"use client"`. If client-only, add `"use client"` at top.
- **Runtime: `nodejs` vs `edge`.** Some bugs only happen in one. Pin via `export const runtime = 'edge'` if relevant.
- **Turbopack vs Webpack.** Default is Turbopack in dev (Next 15+). If the bug is bundler-specific, run `npm run dev -- --turbopack` or `--webpack` explicitly.

## Build & run

```bash
npm run dev    # dev server
npm run build && npm run start   # prod build (some bugs only show in prod)
```
