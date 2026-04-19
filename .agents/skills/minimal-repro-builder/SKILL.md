---
name: minimal-reproduction-builder
description: Build a minimal reproduction repo for a bug + draft a markdown bug description to paste into a GitHub issue. Use when the user says things like "make a minimal repro", "reproduce this bug", "I want to file an issue for [package]", or "build a repro repo". Includes frameworks Expo, Next.js or else ONLY if the bug requires it. Does NOT create the GitHub issue itself — only outputs the repo + markdown description in a DESCRIPTION.md inside the repo.
---

# Minimal Repro Builder

Build the smallest possible project that reproduces a bug, plus a markdown description ready to paste into a GitHub issue.

## When to use

User says things like:
- "make a minimal reproduction for this bug"
- "reproduce this in a clean project"
- "build a reproduction repo for [package]"
- "i want to file an issue for [bug]"
- "can you repro the issue"

## Process

### 1. Gather info

Ask the user (concisely, one short list):

1. **Package** — which library is buggy? (e.g. `react-native-vision-camera-skia@5.0.1`)
2. **Error** — paste the exact error/stack trace
3. **Trigger** — what code/action causes it? (e.g. "rendering SkiaCamera with onFrame")
4. **Versions** — main relevant deps (extract from current project's `package.json` if available)
5. **Framework needed?** — judge based on the bug:
   - Bug only manifests inside a specific framework / runtime (could be anything: Expo, Next.js, Nuxt, Remix, Svelte, Rails, Django, Phoenix, .NET, Android, iOS, etc.) → include just that one
   - Bug is reproducible without any framework (plain language runtime, library-only, browser, CLI) → skip the framework
6. **Repo location** — where to put the repo. Default: `~/dev/repros/<package-name>-<short-slug>` (e.g. `~/dev/repros/vision-camera-skia-getcurrentthreadmarker`). If the directory already exists, append a date suffix.

If the user already gave the bug context in the conversation, skip questions you can answer yourself. Confirm assumptions before moving on.

### 2. Scaffold the project

#### 2a. Detect the framework / ecosystem from the source project

Read the source project's manifest + lockfile to identify both the language ecosystem and the dominant framework. Examples of where to look:

- `package.json` → `dependencies` and `devDependencies`. The presence of a package usually identifies the framework: `expo` → Expo, `next` → Next.js, `nuxt` → Nuxt, `vite` + `@vitejs/plugin-*` → Vite, `@remix-run/react` → Remix, `@sveltejs/kit` → SvelteKit, `@angular/core` → Angular, etc.
- `pyproject.toml` / `setup.py` / `requirements.txt` → Python; framework via deps (`django`, `fastapi`, `flask`).
- `Cargo.toml` → Rust; framework via deps (`actix-web`, `axum`, `bevy`).
- `go.mod` → Go; framework via deps (`gin-gonic/gin`, `labstack/echo`).
- `Gemfile` → Ruby; `rails`, `sinatra`, etc.
- `*.csproj` / `*.fsproj` → .NET; framework via SDK reference.
- `Package.swift` / `*.xcodeproj` → Swift; iOS / SwiftUI / SwiftPM.
- `build.gradle` / `build.gradle.kts` → JVM (Android, Spring, Kotlin Multiplatform).
- `mix.exs` → Elixir / Phoenix.
- `composer.json` → PHP / Laravel / Symfony.

If the bug doesn't actually require any of these, scaffold without a framework (single source file).

#### 2b. Find the official scaffolder

For the detected framework, use its official "create" / "init" tool. Common patterns:

- JS/TS: `npm create <framework>@latest <name>` or `npx create-<framework>@latest <name>` (e.g. `create-expo-app`, `create-next-app`, `create-vue`, `create-svelte`).
- Python: `uv init`, `poetry new`, or `python -m venv` + `pip install`.
- Rust: `cargo new <name> --bin`.
- Go: `mkdir <name> && cd <name> && go mod init <module-path>`.
- Ruby: `bundle init`, or framework-specific (`rails new`).
- iOS: `swift package init` or Xcode template.
- Android: `gradle init` or Android Studio template.
- .NET: `dotnet new console`, `dotnet new web`, etc.

When in doubt, search the framework's docs for "getting started" / "quickstart" → it's almost always a one-line command. Always pick the smallest template the scaffolder offers (usually called `blank`, `minimal`, `vanilla`, or `console`).

#### 2c. Check `references/` for hard-won gotchas

After scaffolding, check if `references/<framework>.md` exists in this skill's folder. The references are NOT a registry of every framework — they're a cache of non-obvious traps we've previously hit (version anchors, peer modules that aren't auto-installed, build-system quirks). Read the matching file via the `Read` tool only if it exists; don't load others.

If you scaffolded a framework that doesn't have a reference and you discover something non-obvious during the repro (a missing peer, a build flag, an entry-point convention), **write a new `references/<framework>.md`** at the end so the next run benefits.

#### 2d. Strip the scaffold

Whatever scaffold you pick, immediately remove anything not required to trigger the bug: default README, sample code, lint configs, tests, CI workflows, `.vscode/`, demo assets, etc.

### 3. Install only the relevant packages

NEVER install packages unrelated to the bug. The repro should crash with the SMALLEST dependency tree. For each install, ask: "would the bug still happen without this?"

**Read every version directly from the main project's `package.json` — never guess, never round, never substitute "latest", never trust your memory of what was discussed earlier in the conversation.** For each package the repro will install:

1. Open the main project's `package.json` and copy the version range *verbatim* (e.g. `~0.83.2`, `^4.2.3`, `5.0.1` — preserve the prefix).
2. Also copy the *peer/transitive anchors* that gate native or runtime compatibility for the framework you scaffolded. Examples (not exhaustive): for Expo it's `expo` + `react` + `react-native`; for Next.js it's `next` + `react` + `react-dom`; for a Vue/Nuxt app it's `nuxt` + `vue`; for Rails it's the Ruby version + Rails gem; for an iOS/Android library it's the platform SDK version. A mismatch between framework version and its anchor packages causes opaque build failures (Swift/Kotlin compile errors, peer-dep warnings, runtime crashes) that look like the repro is broken when it's actually just a version skew.
3. After writing `package.json`, diff your version strings against the source `package.json` for every shared dependency. If anything differs, fix it before installing.

Use the same package manager / dependency tool as the main project. Detect it from the lockfile or manifest:

- JS/TS: `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`/`bun.lockb`, `package-lock.json`, or the `packageManager` field in `package.json`
- Python: `uv.lock`, `poetry.lock`, `Pipfile.lock`, `requirements.txt`
- Rust: `Cargo.lock`
- Go: `go.sum`
- Ruby: `Gemfile.lock`
- iOS: `Podfile.lock`, `Package.resolved`
- Android: gradle wrapper version

Resolution / hoisting / peer-dep behavior differs between tools, and using a different one can mask or invent bugs.

### 4. Write minimal repro code

Replace the scaffold's default file with the smallest snippet that triggers the bug. Strip:
- Any styling / layout not required to trigger the bug
- Any state management not required
- Any error boundaries / try-catch that hides the crash
- Any dev tooling (eslint, prettier configs)

Keep:
- The exact API call(s) that fail
- The exact options/props that trigger the bug
- One screen / one component / one entry point

### 5. Verify the repro

If possible, run it locally to confirm the bug fires. Use whatever the ecosystem's standard run command is (`npm run dev`, `npm start`, `pnpm ios`, `cargo run`, `python -m`, `go run`, `bundle exec rails s`, opening `index.html`, etc.). Capture the exact failure output.

If you cannot verify (requires a physical device, signing, paid service, OS-specific tooling, etc.), tell the user honestly which step they need to run themselves and what they should look for.

### 6. Write DESCRIPTION.md

Write the description to `DESCRIPTION.md` at the repo root. Use this template:

```markdown
## Description

<one-paragraph plain-language summary of the bug>

## Versions

| Package | Version |
|---|---|
| <pkg-name> | <version> |
| <other-deps> | <version> |
| Node | <version> |
| OS | <macOS/Linux/Windows + version> |
| Device | <iPhone XX iOS YY> (if mobile) |

## Steps to reproduce

1. Clone <link or path>
2. `<install command>`
3. `<run command>`
4. <action that triggers bug>

## Expected behavior

<what should happen>

## Actual behavior

<what actually happens>

```
<exact stack trace, fenced as code>
```

## Findings (optional)

<if the user investigated, summarize the root cause + workaround they found>

## Repro repo

<local path — user can push to their own GitHub if desired>
```

Fill EVERY section with concrete data — never leave placeholders. If a section truly doesn't apply, omit it instead of writing "N/A".

### 7. Init git + commit (NEVER push)

After scaffolding, repro code, AND `DESCRIPTION.md` are all in place:

```bash
cd <repo-path>
git init -b main
git add -A
git commit -m "minimal reproduction issue: <package> - <bug summary>"
```

Example: `minimal reproduction issue: react-native-vision-camera-skia - getCurrentThreadMarker non-worklet crash`

**NEVER push.** The user decides what to do with the repo (push to their GH, share differently, delete, etc.).

### 8. Hand off

Tell the user:
- Where the repo lives
- That `DESCRIPTION.md` inside the repo contains the issue draft (ready to copy-paste)
- Any verification step they need to run themselves before pushing/sharing

## Hard rules

- **NEVER create the GitHub issue** — only output the markdown for the user to paste manually.
- **NEVER install packages "in case they're needed"** — only install packages directly involved in the bug.
- **NEVER include a framework / runtime layer if it's not required** — e.g. a bug in `lodash.merge` doesn't need a frontend framework, a bug in a CLI parser doesn't need a web server, a pure-Python data transform doesn't need Django.
- **NEVER add code "for completeness"** — every line in the repro must be necessary to trigger the bug.
- **NEVER guess a version number or use "latest" / a major-only range.** Always copy versions verbatim from the source project's `package.json`, including the framework's transitive native anchors. Verify by diffing before installing.
- If you can verify the reproduction locally, do so before declaring done. If you can't, say so explicitly.
