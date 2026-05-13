---
name: aemeath-codex-pet-installer
description: Use when installing the Aemeath custom pet into Codex Desktop from this repository. Follow this for GitHub-link based installs, local checkout installs, and verification. Do not use it for Codex CLI hook experiments unless explicitly requested.
---

# Aemeath Codex Pet Installer

Install the prebuilt Codex Desktop pet package only.

## Normal Install

From the repository root:

```bash
node install.mjs
```

This copies:

```text
dist/aemeath/pet.json
dist/aemeath/spritesheet.webp
```

to:

```text
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/
```

## Manual Fallback

If `node install.mjs` cannot run, create the target directory and copy those two files manually.

## Verify

Confirm both files exist:

```text
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/pet.json
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/spritesheet.webp
```

## Tell The User

After installation, tell the user:

```text
Open Codex Desktop, go to Settings > Appearance > Pets, click Refresh, select Aemeath, then use /pet or Wake Pet if needed.
```

## Guardrails

- Do not regenerate assets during normal installation.
- Do not replace the original pet artwork.
- Do not run `npm install` for normal installation.
- Do not enable hooks for normal Desktop installation.
- Do not edit `~/.codex/config.toml` unless the user explicitly asks for hook-based CLI experiments.
