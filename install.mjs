#!/usr/bin/env node
import fs from "node:fs/promises";
import fssync from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = new Map();

for (let index = 2; index < process.argv.length; index += 1) {
  const item = process.argv[index];
  if (!item.startsWith("--")) continue;
  const key = item.slice(2);
  const next = process.argv[index + 1];
  if (next && !next.startsWith("--")) {
    args.set(key, next);
    index += 1;
  } else {
    args.set(key, "true");
  }
}

const codexHome =
  args.get("codex-home") || process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const assetDir =
  args.get("asset-dir") || path.join(__dirname, "dist", "aemeath");
const remoteBaseUrl = args.get("base-url") || process.env.AEMEATH_ASSET_BASE_URL || "";

const localManifestPath = path.join(assetDir, "pet.json");
const localSpritesheetPath = path.join(assetDir, "spritesheet.webp");

const manifest = await loadTextAsset("pet.json", localManifestPath, remoteBaseUrl);
const spritesheet = await loadBinaryAsset("spritesheet.webp", localSpritesheetPath, remoteBaseUrl);
const pet = JSON.parse(manifest);

assertPetManifest(pet);
assertWebp(spritesheet);

const targetDir = path.join(codexHome, "pets", pet.id);
await fs.mkdir(targetDir, { recursive: true });
await fs.writeFile(path.join(targetDir, "pet.json"), `${JSON.stringify(pet, null, 2)}\n`);
await fs.writeFile(path.join(targetDir, "spritesheet.webp"), spritesheet);

console.log(`Installed ${pet.displayName} to ${targetDir}`);
console.log("Open Codex Desktop > Settings > Appearance > Pets, then click Refresh.");

async function loadTextAsset(filename, localPath, baseUrl) {
  if (fssync.existsSync(localPath)) return fs.readFile(localPath, "utf8");
  const bytes = await fetchRemoteAsset(filename, baseUrl);
  return bytes.toString("utf8");
}

async function loadBinaryAsset(filename, localPath, baseUrl) {
  if (fssync.existsSync(localPath)) return fs.readFile(localPath);
  return fetchRemoteAsset(filename, baseUrl);
}

async function fetchRemoteAsset(filename, baseUrl) {
  if (!baseUrl) {
    throw new Error(
      `Missing ${filename}. Run this installer from the package root, or pass --base-url <raw asset URL>.`
    );
  }
  const url = new URL(filename, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function assertPetManifest(pet) {
  if (!pet || typeof pet !== "object") throw new Error("pet.json must be an object");
  if (pet.id !== "aemeath") throw new Error('pet.json id must be "aemeath"');
  if (pet.displayName !== "Aemeath") throw new Error('pet.json displayName must be "Aemeath"');
  if (pet.spritesheetPath !== "spritesheet.webp") {
    throw new Error('pet.json spritesheetPath must be "spritesheet.webp"');
  }
}

function assertWebp(buffer) {
  if (buffer.length < 16) throw new Error("spritesheet.webp is too small");
  if (buffer.subarray(0, 4).toString("ascii") !== "RIFF") {
    throw new Error("spritesheet.webp must be a RIFF WebP file");
  }
  if (buffer.subarray(8, 12).toString("ascii") !== "WEBP") {
    throw new Error("spritesheet.webp must be a WebP file");
  }
}

