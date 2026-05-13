# Install Aemeath With Codex

This file is written for Codex agents. Follow it when a user gives you this GitHub repository link and asks you to install the Aemeath pet.

## Goal

Install the prebuilt Codex Desktop custom pet into:

```text
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/
  pet.json
  spritesheet.webp
```

## Normal Install

From the repository root, run:

```bash
node install.mjs
```

This installer has no npm dependencies. It only copies:

```text
dist/aemeath/pet.json
dist/aemeath/spritesheet.webp
```

## Manual Install

If the installer cannot run, create:

```text
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/
```

Then copy:

```text
dist/aemeath/pet.json
dist/aemeath/spritesheet.webp
```

into that folder.

## Verify

After installation, verify:

```text
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/pet.json
${CODEX_HOME:-$HOME/.codex}/pets/aemeath/spritesheet.webp
```

The installed `pet.json` should include:

```json
{
  "id": "aemeath",
  "displayName": "Aemeath",
  "spritesheetPath": "spritesheet.webp"
}
```

## Tell The User

After installing, tell the user:

```text
Open Codex Desktop, go to Settings > Appearance > Pets, click Refresh, select Aemeath, then use /pet or Wake Pet if needed.
```

If the pet does not appear, tell the user to click `Refresh` again and confirm the files exist under `${CODEX_HOME:-$HOME/.codex}/pets/aemeath/`.

## Do Not

- Do not regenerate the spritesheet during normal installation.
- Do not replace the original pet artwork.
- Do not run `npm install` for normal installation.
- Do not enable Codex hooks for normal Desktop installation.
- Do not edit `~/.codex/config.toml` unless the user explicitly asks for hook-based CLI experiments.
- Do not install the CLI preview path unless the user explicitly asks for it.

## User Prompt Template

The user can paste this to Codex:

```text
Install the Codex Desktop custom pet from this GitHub repository:
<repo-url>

Read README.md, AGENTS.md, and INSTALL.md first.
If useful, also read skills/aemeath-codex-pet-installer/SKILL.md.
Install the prebuilt Aemeath pet into my local Codex pet folder.
Do not regenerate assets, do not run npm install, and do not enable hooks.
After installing, tell me how to enable it in Codex Desktop settings.
```
