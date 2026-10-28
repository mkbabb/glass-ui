#!/usr/bin/env node
// P-E6 JSON cell reader: node cells.mjs <json> [regex] [--all]: one line per cell (status, name, line, load).
import { readFileSync } from "node:fs";
const [f, re = ".", all] = process.argv.slice(2);
const j = JSON.parse(readFileSync(f, "utf8"));
for (const c of j.cells ?? []) if (new RegExp(re).test(c.name)) console.log(`${c.status.padEnd(10)} ${c.name} · ${all ? c.line : String(c.line ?? "").slice(0, 260)} · ${c.load ?? ""}`);
