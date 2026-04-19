# References

**This is a cache of hard-won gotchas, not a registry of every framework.**

Each file documents non-obvious traps for one framework — version anchors, peer modules that aren't auto-installed, build-system quirks. Only read the file matching the framework you're scaffolding.

If you scaffold a framework not listed here and hit a non-obvious trap during the repro, **add a new file** following the same shape so the next run benefits. If you scaffold a listed framework and the existing notes turn out to be wrong or incomplete, **edit them**.

## Existing notes

| File | Framework |
|---|---|
| [`expo.md`](./expo.md) | Expo / React Native |
| [`nextjs.md`](./nextjs.md) | Next.js |
| [`vite.md`](./vite.md) | Vite |
| [`node.md`](./node.md) | Plain Node.js |
| [`python.md`](./python.md) | Python |
| [`rust.md`](./rust.md) | Rust |

## What goes in a reference file

Only things that are non-obvious AND have bitten us at least once. Skip generic info that's already in the framework's official docs (anyone could find that).

Good content:
- Required peer / anchor packages that aren't auto-installed by the scaffolder
- Version-pinning rules (e.g. "Expo SDK X requires RN Y.Z")
- Common error messages → root cause mapping
- Build / run quirks (multiple Metro instances, dev vs release differences, etc.)
- Native config files that need editing (`app.json`, `Info.plist`, `AndroidManifest.xml`)

Skip:
- The basic "what is this framework"
- Tutorial-style content
- Anything you'd find by reading the official getting-started docs
