# Rust / Cargo

## Scaffold

```bash
cargo new <name> --bin    # binary crate (most common for bug repros)
# or:
cargo new <name> --lib    # if the bug is in lib code without main
cd <name>
```

## Add broken dep

Edit `Cargo.toml` directly — match version + features verbatim from source:

```toml
[dependencies]
broken-crate = { version = "1.2.3", features = ["foo", "bar"] }
```

Or via CLI:

```bash
cargo add broken-crate@1.2.3 --features foo,bar
```

## Required peer / anchor things

- **Rust toolchain version** — pin via `rust-toolchain.toml`:
  ```toml
  [toolchain]
  channel = "1.78.0"
  ```
- **Edition** — keep the same edition as source (`2021` vs `2024`).

## Single-file repro

```rust
// src/main.rs
use broken_crate::thing;

fn main() {
    thing(); // triggers bug
}
```

## Run

```bash
cargo run                   # debug build
cargo run --release         # release build (some bugs only show with optimizations)
RUST_BACKTRACE=1 cargo run  # full backtrace
```

## Common gotchas

- **Debug vs release behavior differs.** Test both if the bug is performance / overflow / UB-related.
- **Feature flags matter.** A dep behaves differently depending on which features are enabled. Always include the same feature set as the source.
- **Workspace members.** If the source is a workspace, the repro should be a single crate — workspace inheritance can mask version issues.
