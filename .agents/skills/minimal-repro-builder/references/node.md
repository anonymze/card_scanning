# Plain Node.js library

For bugs in pure Node libraries (no framework, no browser).

## Scaffold

```bash
mkdir <name> && cd <name>
npm init -y
npm install typescript --save-dev
npx tsc --init --target es2022 --module nodenext --moduleResolution nodenext --strict --esModuleInterop --skipLibCheck --outDir dist
```

## Single-file repro

Put everything in one file. For TypeScript:

```bash
echo 'import { thing } from "broken-package";\nthing(); // triggers bug' > repro.ts
npx tsx repro.ts   # run TS directly without build
```

For JS:

```bash
echo 'const { thing } = require("broken-package"); thing();' > repro.js
node repro.js
```

## Required notes

- **Pin Node version.** Use `.nvmrc` or `engines` in `package.json` matching the source project. Bug behavior often depends on Node version.
- **`type: module` vs CJS.** Set `"type": "module"` in `package.json` only if the source project is ESM. CJS bugs and ESM bugs are different — don't mix.

## Run

```bash
node repro.js
# or for TypeScript:
npx tsx repro.ts
```
