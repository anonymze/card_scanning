# Python

## Scaffold (pick the tool the source project uses)

### uv (recommended for new repros)

```bash
uv init <name>
cd <name>
uv add <broken-package>==<version>
```

### Poetry

```bash
poetry new <name>
cd <name>
poetry add <broken-package>@<version>
```

### pip + venv

```bash
mkdir <name> && cd <name>
python -m venv .venv
source .venv/bin/activate
echo "<broken-package>==<version>" > requirements.txt
pip install -r requirements.txt
```

## Required peer / anchor things

- **Python version** — pin via `.python-version`, `pyproject.toml` `requires-python`, or `runtime.txt`. Bug behavior varies between 3.x minor versions.
- **OS-specific deps** — Python wheels differ per OS / arch. Note this in DESCRIPTION.md.

## Single-file repro

```python
# repro.py
from broken_package import thing
thing()  # triggers bug
```

```bash
python repro.py
# or:
uv run python repro.py
```

## Common gotchas

- **`pip install` vs `uv add`** can produce different resolved versions when peer deps are loose.
- **Async vs sync.** If the bug is in `asyncio` code, wrap in `asyncio.run(...)` explicitly — running from a Jupyter cell hides certain bugs.
