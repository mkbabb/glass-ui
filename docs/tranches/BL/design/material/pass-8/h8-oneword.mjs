#!/usr/bin/env node
// h8-oneword.mjs · D3 pass 8, H8 §1.3: the value arm's "a word" reading against its "every word" reading, on one tree.
// Uses deleted-mechanisms.mjs's own scope, patch parse and prose lines; only the word test differs.
//   node h8-oneword.mjs <tree> <file.patch>
import fs from "node:fs";
import { textFiles, patchPaths, changedValues, proseLines, words } from "../harness/deleted-mechanisms.mjs";
const [T, P] = process.argv.slice(2), pt = fs.readFileSync(P, "utf8"), files = textFiles(T, patchPaths(pt));
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let one = 0, every = 0;
for (const ch of changedValues(pt)) {
  const lit = new RegExp(`(?<![\\w.])${esc(ch.from)}(?![\\w%]|\\.\\d)`), ws = words(ch.token).map((w) => new RegExp(`(?<![A-Za-z0-9])${esc(w)}`, "i"));
  for (const [rel, text] of files) proseLines(rel, text).forEach((p, i) => {
    if (!p || !lit.test(p)) return;
    const n = ws.filter((r) => r.test(p)).length;
    if (!n) return;
    one++; if (n === ws.length) every++;
    console.log(`${n === ws.length ? "EVERY" : "ONE  "} ${ch.token} ${ch.from} · ${rel}:${i + 1} · ${text.split("\n")[i].trim().slice(0, 140)}`);
  });
}
console.log(`ONEWORD lines=${one} every-word=${every} one-word-only=${one - every}`);
