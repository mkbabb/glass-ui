#!/usr/bin/env node
// truncate-seq.mjs — author-side: drop every step of frozen/SEQUENCE.json after <id> (a derive step is being redone).
//   node truncate-seq.mjs <id>
import { readSeq, writeSeq } from "./lib/sequence.mjs";
const id = process.argv[2];
const seq = readSeq();
const i = seq.steps.findIndex((s) => s.id === id);
if (i < 0) throw new Error(`no step ${id}`);
const dropped = seq.steps.splice(i + 1).map((s) => s.id);
writeSeq(seq);
console.log(`kept through ${id}; dropped ${dropped.join(", ") || "nothing"}`);
