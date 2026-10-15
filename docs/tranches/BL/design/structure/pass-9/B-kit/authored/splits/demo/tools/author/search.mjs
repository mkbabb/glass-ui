#!/usr/bin/env node
// author/search.mjs — AUTHOR-SIDE (B-S11, zone demo): split demo/stories/data/search.vue
// (632 lines). The 200-row catalogue the route ranks (its row type, the curated seeds and
// the procedural extension) moves, verbatim, to `search/catalogue.ts`; the route keeps the
// engine wiring, the combobox and the result cards.
//
//   node author/search.mjs --root <tree>
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/data/search.vue";
const src = open(root, REL);
const { L, at, next, range } = src;

const dataA = at('type SearchStatus = "wired" | "proof" | "consumer" | "triage";');
const dataB = next(");", at("const searchItems: StorySearchItem[] = Array.from("));
if (L[dataB] !== "") throw new Error("search.vue: no blank line after the catalogue");
const EXPORTED = ["interface StorySearchItem extends SearchableItem {", "const searchItems: StorySearchItem[] = Array.from("];
const dataText = range(dataA, dataB).map((r) => (EXPORTED.includes(r) ? `export ${r}` : r)).join("\n");

const DIR = "demo/stories/data/search";
mkdirSync(join(root, DIR), { recursive: true });
writeFileSync(
    join(root, DIR, "catalogue.ts"),
    [
        "// The catalogue the fuzzy-search route ranks: forty-odd curated rows, extended to 200",
        "// by derived variants so a query exercises ranking at scale.",
        ...importsFor(src, dataText, DIR),
        "",
        dataText,
        "",
    ].join("\n"),
);
writeFileSync(
    join(root, REL),
    rebuild(src, {
        cuts: [[dataA, dataB + 1]],
        addImports: ['import { searchItems, type StorySearchItem } from "./search/catalogue";'],
        moved: dataText,
    }),
);
console.log("search split");
