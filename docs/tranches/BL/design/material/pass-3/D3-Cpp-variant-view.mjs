#!/usr/bin/env node
// D3-Cpp-variant-view.mjs · D3 pass 3, C″ prototype: a read-only view of one capture variant as `base`, so a witness
// that reads only the base variant (M-6) can read a retune cell. Writes <out>/cells.json with the chosen variant's
// cells relabelled `base` and symlinks <out>/png to the source capture's png/ (nothing is copied or re-captured).
// Used for C-4's page-tone plant: M-6 on the `retune-bg` cells of the route and of `pl-stalepage` (D3-Cpp-proto.md §5).
//   node D3-Cpp-variant-view.mjs <capdir> <variant> <out>
import fs from "node:fs";
import path from "node:path";

const [src, variant, out] = process.argv.slice(2);
if (!src || !variant || !out) { console.error("usage: node D3-Cpp-variant-view.mjs <capdir> <variant> <out>"); process.exit(2); }
const doc = JSON.parse(fs.readFileSync(path.join(src, "cells.json"), "utf8"));
const cells = doc.cells.filter((c) => c.variant === variant).map((c) => ({ ...c, variant: "base" }));
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.symlinkSync(path.resolve(src, "png"), path.join(out, "png"));
fs.writeFileSync(path.join(out, "cells.json"), JSON.stringify({ ...doc, cells, live: [], motion: [] }, null, 1));
console.log(`${cells.length} ${variant} cells of ${src} → ${out} as base`);
