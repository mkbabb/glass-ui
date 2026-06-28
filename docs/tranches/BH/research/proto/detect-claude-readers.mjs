#!/usr/bin/env node
// P2 prototype — classify every scripts/proof-*.mjs by how it touches CLAUDE.md.
// Buckets: HARD_ASSERT (reads content into a violation), WARN_DEGRADE (reads but
// soft/non-fatal), FENCE (CLAUDE.md only in a write-allowlist), MENTION (comment only).
// Also flags ENOENT_UNGUARDED (a readFileSync on the CLAUDE path with no existsSync guard).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto/claude-reader-classification.json";

const files = readdirSync(resolve(REPO, "scripts"))
  .filter((f) => f.startsWith("proof-") && f.endsWith(".mjs"));

const rows = [];
for (const f of files) {
  const src = readFileSync(resolve(REPO, "scripts", f), "utf8");
  if (!/CLAUDE\.md/.test(src)) continue;

  const lines = src.split("\n");
  // strip line-comments + block-comments crudely to find CODE-level CLAUDE refs
  const codeOnly = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((l) => l.replace(/\/\/.*$/, ""))
    .join("\n");

  const codeHasClaude = /CLAUDE\.md/.test(codeOnly);
  // does a CLAUDE.md path flow into a read?  pattern: a *_MD/_PATH var resolved to CLAUDE.md
  const definesClaudeVar = /(\w*CLAUDE\w*)\s*[:=]\s*(?:resolve\([^)]*)?["'`]CLAUDE\.md/.test(codeOnly);
  // does claudeMd get tested in a regex / .test()/.includes() and pushed into violations?
  const claudeVarTested = /claudeMd\b/.test(codeOnly) &&
    /\.test\(claudeMd|claudeMd\)|claudeMd\)|\(claudeMd/.test(codeOnly);
  const pushesOnClaude =
    /violations?\.push\([^)]*CLAUDE\.md/.test(codeOnly) ||
    (/claudeMd/.test(codeOnly) && /violations?\.push/.test(codeOnly));
  // unguarded direct read?  readFileSync(CLAUDE_MD ...) with no existsSync(CLAUDE) nearby
  const directRead = /readFileSync\(\s*CLAUDE_MD/.test(codeOnly) ||
    /readFileSync\([^)]*"CLAUDE\.md"/.test(codeOnly);
  const hasExistsGuard = /existsSync\([^)]*CLAUDE/.test(codeOnly) ||
    /safeRead|function read\(|const read =/.test(codeOnly);

  // FENCE: CLAUDE.md only inside an array of allowed-touch paths
  const fenceOnly = definesClaudeVar === false && codeHasClaude &&
    /["']CLAUDE\.md["']/.test(codeOnly) && !/claudeMd/.test(codeOnly);

  let bucket;
  if (!codeHasClaude) bucket = "MENTION";        // comment only
  else if (fenceOnly) bucket = "FENCE";
  else if (definesClaudeVar && !/claudeMd/.test(codeOnly) && !/safeRead\(P\.CLAUDE|safeRead\([^)]*CLAUDE/.test(codeOnly)) bucket = "DEAD_VAR";
  else if (claudeVarTested || pushesOnClaude) {
    // soft if the push is explicitly NOT a hard violation (WARN-fact)
    const softNote = /recorded.*NOT a hard violation|WARN-fact|degrades to|PENDING/.test(src);
    bucket = softNote ? "WARN_DEGRADE" : "HARD_ASSERT";
  } else if (definesClaudeVar) bucket = "WARN_DEGRADE";
  else bucket = "MENTION";

  const enoent = directRead && !hasExistsGuard;
  rows.push({
    gate: f.replace(/^proof-/, "proof:").replace(/\.mjs$/, ""),
    file: `scripts/${f}`,
    bucket,
    enoentUnguarded: enoent,
    claudeRefLines: lines
      .map((l, i) => (/CLAUDE\.md/.test(l) ? i + 1 : null))
      .filter(Boolean).length,
  });
}

rows.sort((a, b) =>
  a.bucket.localeCompare(b.bucket) || a.gate.localeCompare(b.gate));

const summary = rows.reduce((m, r) => ((m[r.bucket] = (m[r.bucket] || 0) + 1), m), {});
writeFileSync(OUT, JSON.stringify({ summary, rows }, null, 2));
console.log("SUMMARY:", JSON.stringify(summary));
console.log("TOTAL proof scripts referencing CLAUDE.md:", rows.length);
console.log();
for (const r of rows) {
  console.log(
    `${r.bucket.padEnd(13)} ${r.enoentUnguarded ? "ENOENT!" : "       "} ${r.gate}`
  );
}
