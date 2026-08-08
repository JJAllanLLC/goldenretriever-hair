#!/usr/bin/env node
/**
 * Controlled IndexNow URL submission for goldenretriever.hair.
 *
 * Dry-run by default unless --submit is passed.
 * Reads the public verification key file; does not hardcode the key.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "goldenretriever.hair";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10_000;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");

function usage(exitCode = 1) {
  console.error(`Usage:
  node scripts/submit-indexnow.mjs [--dry-run | --submit] <url-or-path> [...]

Examples:
  node scripts/submit-indexnow.mjs --dry-run /guides/example-page
  node scripts/submit-indexnow.mjs --submit https://goldenretriever.hair/guides/example-page

--submit is required for a live network request. Without it, the script only validates and prints the payload.`);
  process.exit(exitCode);
}

function loadKeyFromPublicFile() {
  const candidates = readdirSync(PUBLIC_DIR).filter((name) =>
    /^[a-f0-9]+\.txt$/i.test(name)
  );

  if (candidates.length === 0) {
    throw new Error(
      `No IndexNow key file found in public/ (expected <key>.txt with hex filename).`
    );
  }

  if (candidates.length > 1) {
    throw new Error(
      `Multiple hex-named .txt files in public/: ${candidates.join(", ")}. Keep a single IndexNow key file.`
    );
  }

  const filename = candidates[0];
  const keyFromFilename = filename.slice(0, -".txt".length);
  const absolutePath = join(PUBLIC_DIR, filename);
  const raw = readFileSync(absolutePath, "utf8");
  const keyFromContent = raw.trim();

  if (!keyFromContent) {
    throw new Error(`IndexNow key file is empty: public/${filename}`);
  }

  if (keyFromFilename !== keyFromContent) {
    throw new Error(
      `IndexNow key mismatch: filename stem "${keyFromFilename}" does not match file content.`
    );
  }

  if (raw !== keyFromContent && raw !== `${keyFromContent}\n` && raw !== `${keyFromContent}\r\n`) {
    throw new Error(
      `IndexNow key file must contain only the key (optional trailing newline). Found extra content in public/${filename}.`
    );
  }

  return {
    key: keyFromContent,
    filename,
    keyLocation: `${ORIGIN}/${filename}`,
  };
}

function normalizeUrl(input) {
  const value = String(input).trim();
  if (!value) {
    throw new Error("Empty URL argument.");
  }

  let url;
  if (value.startsWith("/")) {
    url = new URL(value, ORIGIN);
  } else {
    try {
      url = new URL(value);
    } catch {
      throw new Error(`Invalid URL: ${value}`);
    }
  }

  if (url.protocol !== "https:") {
    throw new Error(`Rejected non-HTTPS URL: ${value}`);
  }

  if (url.hostname !== HOST) {
    throw new Error(
      `Rejected URL host "${url.hostname}" (only ${HOST} is allowed): ${value}`
    );
  }

  // Preserve pathname, search, and hash as supplied; do not invent trailing slashes.
  return url.toString();
}

function describeStatus(status) {
  switch (status) {
    case 200:
    case 202:
      return "accepted";
    case 400:
      return "malformed request";
    case 403:
      return "invalid or inaccessible key";
    case 422:
      return "URL/host mismatch";
    case 429:
      return "rate limited";
    default:
      return "unexpected failure";
  }
}

function parseArgs(argv) {
  const flags = new Set();
  const positional = [];

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      usage(0);
    }
    if (arg === "--submit" || arg === "--dry-run") {
      flags.add(arg);
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown flag: ${arg}`);
    }
    positional.push(arg);
  }

  if (flags.has("--submit") && flags.has("--dry-run")) {
    throw new Error("Pass either --submit or --dry-run, not both.");
  }

  if (positional.length === 0) {
    throw new Error("Provide at least one URL or root-relative path.");
  }

  return {
    submit: flags.has("--submit"),
    urls: positional,
  };
}

async function main() {
  const { submit, urls: rawUrls } = parseArgs(process.argv.slice(2));
  const { key, keyLocation } = loadKeyFromPublicFile();

  const urlList = [...new Set(rawUrls.map(normalizeUrl))];

  if (urlList.length > MAX_URLS) {
    throw new Error(
      `Too many URLs (${urlList.length}). IndexNow allows at most ${MAX_URLS} per request.`
    );
  }

  const payload = {
    host: HOST,
    key,
    keyLocation,
    urlList,
  };

  console.log(submit ? "IndexNow submission (live)" : "IndexNow dry run (no network request)");
  console.log(`host: ${payload.host}`);
  console.log(`keyLocation: ${payload.keyLocation}`);
  console.log(`url count: ${payload.urlList.length}`);
  console.log("urlList:");
  for (const url of payload.urlList) {
    console.log(`  ${url}`);
  }

  if (!submit) {
    console.log("Dry run complete. Re-run with --submit after production is live to send.");
    return;
  }

  console.log(`POST ${ENDPOINT}`);
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const status = response.status;
  const meaning = describeStatus(status);
  const bodyText = (await response.text()).trim();

  console.log(`Response: ${status} (${meaning})`);
  if (bodyText) {
    console.log(bodyText);
  }

  if (status !== 200 && status !== 202) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
