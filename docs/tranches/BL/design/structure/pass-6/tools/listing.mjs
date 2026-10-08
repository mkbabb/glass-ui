#!/usr/bin/env node
// listing.mjs <verify-output.txt> <scopes.json> <out.json> "<reason>" — pass 6 · a cascade
// listing written from the verifier's own output (P5-F3's procedure): every `UNLISTED <entry>
// <rule>` line becomes a `moved` rule of that entry's reorder, and the reviewed `scopes`
// declarations (P6-F1) are carried from <scopes.json> unchanged. The route reviews the rung
// before it writes the listing; this tool only transcribes it.
import { readFileSync, writeFileSync } from "node:fs";

const [out, scopesFile, target, reason] = process.argv.slice(2);
if (!reason) { console.error('usage: listing.mjs <verify-output.txt> <scopes.json> <out.json> "<reason>"'); process.exit(2); }
const by = new Map();
for (const line of readFileSync(out, "utf8").split("\n")) {
    const m = /^UNLISTED (\S+) (.*)$/.exec(line);
    if (m) (by.get(m[1]) ?? by.set(m[1], []).get(m[1])).push(JSON.parse(m[2]));
}
const { scopes } = JSON.parse(readFileSync(scopesFile, "utf8"));
const doc = { scopes, reorders: [...by].map(([entry, moved]) => ({ entry, moved, reason })) };
writeFileSync(target, `${JSON.stringify(doc, null, 1)}\n`);
console.log(`listing: ${scopes.length} scope(s), ${doc.reorders.map((r) => `${r.entry} ${r.moved.length}`).join(", ")} → ${target}`);
