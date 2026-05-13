# AGENTS.md

This repository installs a Codex Desktop custom pet.

When a user gives you this repository link and asks you to install Aemeath, follow this path:

1. Read `INSTALL.md`.
2. Install the prebuilt Desktop pet package only.
3. Prefer `node install.mjs` from the repository root.
4. If the installer cannot run, copy `dist/aemeath/pet.json` and `dist/aemeath/spritesheet.webp` into `${CODEX_HOME:-$HOME/.codex}/pets/aemeath/`.
5. Verify both installed files exist.
6. Tell the user to open Codex Desktop, go to `Settings > Appearance > Pets`, click `Refresh`, select `Aemeath`, then use `/pet` or `Wake Pet`.

Do not regenerate artwork during normal installation.
Do not replace the original pet asset.
Do not run `npm install` for normal installation.
Do not enable Codex hooks for normal Desktop installation.
Do not modify `~/.codex/config.toml` unless the user explicitly asks for hook-based CLI experiments.

If the user only has Codex CLI and not Codex Desktop, explain that Codex CLI does not currently provide the Desktop pet overlay. This package is for Codex Desktop custom pets.
