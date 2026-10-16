#!/usr/bin/env node
// gen-style-fold-split.mjs — AUTHOR-SIDE (pass 6, P5-R4): write authored/p6-style-fold-split.mjs,
// the exact-text edits that split vite.style-fold.ts (588 lines at HEAD, over R-5's 500) into
// two named modules beside it, from the tree as it stands after S60:
//   vite.style-closure.ts  the style closure: every source a published style reaches
//                          (collectStyleClosure and the readers it is built from);
//   vite.style-fold.ts     the fold of that closure into dist (copy, SFC fold, @source,
//                          font inline, backdrop prefix pairs, minify).
// The cut is by anchors in the text, each required to occur once; the moved span is copied
// byte for byte, and every reader of a moved name re-points at the module that now owns it
// (no re-export: one name, one module).
//   node authored/p6/gen-style-fold-split.mjs --root <wt>
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[process.argv.indexOf("--root") + 1]);
const read = (p) => readFileSync(join(root, p), "utf8");
const once = (text, s, what) => { const n = text.split(s).length - 1; if (n !== 1) throw new Error(`${what}: ${n} matches for ${JSON.stringify(s.slice(0, 60))}`); return text.indexOf(s); };

const fold = read("vite.style-fold.ts");
const start = once(fold, "export type StyleClosure = {", "closure start");
const end = once(fold, "export function copyStyleAssets(", "closure end");
const span = fold.slice(start, end);
if (!span.includes("export function collectStyleClosure(")) throw new Error("the span does not hold collectStyleClosure");
const closureBody = span.replace("function filesUnder(root: string): string[] {", "export function filesUnder(root: string): string[] {");
if (closureBody === span) throw new Error("filesUnder not found in the span");

const closure = `/**
 * vite.style-closure — the STYLE CLOSURE of the publish: every source a published style
 * reaches from the entry record (each JS entry's SFC styles and CSS imports, each declared
 * CSS root, the fonts their url()s name), with the guards that keep a code-bearing file or a
 * dangling reference out of it. The orchestrator (\`vite.style-assets.ts\`) computes it once
 * per build; the fold (\`vite.style-fold.ts\`) copies it into \`dist/\`, and the utility emit
 * (\`vite.utility-emit.ts\`) scans it.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";

import postcss from "postcss";

// @ts-ignore — the entry record reader is an untyped ESM leaf.
import { recordCssTargets, recordEntries } from "./scripts/structure/index.mjs";

${closureBody.trimEnd()}
`;

const foldNow = fold.slice(0, start) + fold.slice(end);
const edits = [
    { file: "vite.style-closure.ts", why: "P5-R4: the style closure becomes its own module beside the fold (collectStyleClosure and the source readers it is built from, moved byte for byte; filesUnder exported for the fold's CSS walk)", create: closure },
    {
        file: "vite.style-fold.ts",
        why: "P5-R4: the closure leaves for vite.style-closure.ts; the fold keeps the copy, SFC fold, @source, font inline, backdrop pairs and minify",
        from: span,
        to: "",
    },
    {
        file: "vite.style-fold.ts",
        why: "the fold's imports: the closure's readers (readdirSync, recordCssTargets, recordEntries) leave with it; filesUnder and StyleClosure come from the closure module",
        from: `import {
    cpSync,
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

import postcss, { type Container } from "postcss";

import { minifyCss } from "./scripts/minify";
// @ts-ignore — the entry record reader is an untyped ESM leaf.
import { recordCssTargets, recordEntries, recordTerminal } from "./scripts/structure/index.mjs";
`,
        to: `import {
    cpSync,
    existsSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

import postcss, { type Container } from "postcss";

import { minifyCss } from "./scripts/minify";
// @ts-ignore — the entry record reader is an untyped ESM leaf.
import { recordTerminal } from "./scripts/structure/index.mjs";
import { filesUnder, type StyleClosure } from "./vite.style-closure";
`,
    },
    {
        file: "vite.style-assets.ts",
        why: "the orchestrator reads the closure from its module",
        from: `    minifyStyleAssets,
    collectStyleClosure,
    type StyleClosure,
} from "./vite.style-fold";`,
        to: `    minifyStyleAssets,
} from "./vite.style-fold";
import { collectStyleClosure, type StyleClosure } from "./vite.style-closure";`,
    },
    {
        file: "vite.utility-emit.ts",
        why: "the utility emit reads the closure from its module and the terminal anchor from the fold",
        from: `import { collectStyleClosure, terminalImportIndex, type StyleClosure } from "./vite.style-fold";`,
        to: `import { collectStyleClosure, type StyleClosure } from "./vite.style-closure";
import { terminalImportIndex } from "./vite.style-fold";`,
    },
    {
        file: "tests/public-surface/built.spec.ts",
        why: "the built-surface suite reads the closure from its module",
        from: `import { collectStyleClosure } from "../../vite.style-fold";`,
        to: `import { collectStyleClosure } from "../../vite.style-closure";`,
    },
    {
        file: "scripts/structure/lib/entries.mjs",
        why: "the record's readers, named as they now are",
        from: `// style-fold's entry walk and the graph's self-name resolution all read it.`,
        to: `// style closure's entry walk and the graph's self-name resolution all read it.`,
    },
];
for (const e of edits) if (e.from !== undefined && !e.file.startsWith("vite.style-fold")) once(read(e.file), e.from, e.file);
once(foldNow, edits[2].from, "fold imports");
const lines = (t) => t.split("\n").length - (t.endsWith("\n") ? 1 : 0);
const out = `// authored/p6-style-fold-split.mjs — AUTHORED input to derive/edits.mjs (step S61; P5-R4),
// written by authored/p6/gen-style-fold-split.mjs from the tree after S60. vite.style-fold.ts
// ${lines(fold)} lines → ${lines(foldNow) - 1} (the fold) + vite.style-closure.ts ${lines(closure)} (the closure).
export const why = ${JSON.stringify(`P5-R4 (R-5's bound on a hand-written root config): vite.style-fold.ts ${lines(fold)} lines splits into two named modules beside it, vite.style-closure.ts (the style closure, ${lines(closure)} lines) and vite.style-fold.ts (the fold into dist); every reader of a moved name re-points at its module, with no re-export`)};
export const edits = ${JSON.stringify(edits, null, 1)};
`;
writeFileSync(join(HERE, "../p6-style-fold-split.mjs"), out);
console.log(`vite.style-fold.ts ${lines(fold)} → fold ~${lines(foldNow) - 1}, closure ${lines(closure)}`);
