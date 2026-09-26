# W-C.2 · W-DEMETA-II: live artefacts carry no tranche meta, and comments state the present · 11.0.0

| field | value |
|---|---|
| seat | band-C wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `26d193b7` in a scratch worktree, with `dist/` built there (`npm run build`, exit 0). `git diff --stat v10.1.0 HEAD -- src` prints nothing |
| ships in | 11.0.0 |
| families | F-62 whole (`audit/REGISTRY.md:1349-1358`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L05a-04 | tranche meta re-infected `src/` (2 → 288 lines in 123 files across BK), 18 hits shipped in `dist/*.d.ts` |
| L06-14, L09-09, L10-16 | dated brackets, strike-through tombstones and tranche ids in `src/` comments, README and published `.d.ts`; the comment share |
| L01a-17 | #17 W-COMMENT-DIET regressed (38.0 % → 38.9 %, prose hits 268 → 379); the ceiling is a latch |
| L05b-12, R2-07-08 | tranche narration in the published declarations; `DISSOLVE_DIALECTS` ships roster prose as runtime string data from `./motion-core` |
| L09-08 | MIGRATION.md ships at 12 % of the tarball and reads as a tranche record (wrong order, dated brackets, strikes, SHAs, wave ids, dead `docs/tranches` cites) |
| L09-10 | writing style in consumer prose: spaced em dashes, ALL-CAPS emphasis, first-person decree, editorial snark in a public barrel |
| L05a-22 | three demo comments cite the deleted CLAUDE.md |
| L14-14 | provenance re-accreted in the periphery; 169 citations of deleted `proof:*` scripts |
| #64 DECLARATION column | the 27 shadcn provenance lines in `src` (C2-G7; W-B.12's copy struck by fix-3, FB-18) |
| #55 residue | the `BK #55` tags left in the tree (`census-register-b.md:45`) |
| #7 (its F-63 cite) | `dock/styles/controls/icon-button.css:89` cites `proof:no-layout-animation`, which has no executable (`census-register-a.md:28`) |
| `release.yml` header | `release.yml:13` dated bracket; the file's header after W-B.13's edit (`waves/W-B.13.md:35`) |

## 2 · The defect at HEAD

Measured in the scratch worktree at `26d193b7` with the E-10 detector of appendix A (`node no-meta.mjs .`), `scripts/comment-census.mjs`, and `npm pack --dry-run`.

- **The E-10 grammar hits 4,682 times in 527 live files.** By tree: `src` 985, `tests-visual` 1,182, `tests` 664, `MIGRATION.md` 634, `scripts` 225, `demo` 170, `dist` 51 (43 in `.d.ts`, 8 in `.js`, 16 files), other root and docs files 771. By class: wave ids 1,730, strikes (`~~`) 733, dated brackets 543, row refs (`BK #17`) 500, finding and inbound ids 366, `proof:*` names 347, `docs/tranches/` cites 260, backticked SHAs 127, `⊕` 45, `CLAUDE.md` 31. The census's narrower spelling (`BK #n` or a dated bracket) gives 279 lines in 121 `src` files, as `ledger/census-carries-recap.md:60` records; `git grep -n '~~' -- src` → 248 lines, every one a tombstone (no `~~x` integer truncation in code).
- **Examples.** `configurator/ConfiguratorLayer.vue:102` `~~Tailwind~~ [2026-09-22 · BK register wave 10-1 — …`; `dock/GlassDock.vue:55,498` struck paragraphs; `.github/workflows/release.yml:13` `[2026-09-22 · BK register wave N-5]`; `.github/workflows/ci.yml:58,60` dated brackets; `src/composables/motion/morph/eyeglass.ts:30` cites `docs/tranches/BJ/addenda/…`; `rg -ci shadcn src` → 27.
- **Prose shipped as runtime data.** `src/composables/motion/dissolve/dissolveGrammar.ts:52-94`: `DISSOLVE_DIALECTS` is five rows with `owner` fields (`"#34 W-TOAST"`, `"#39 W-DIALOG-DETENT"`) and `comment` strings; `./motion-core` re-exports it (`src/composables/motion/core/index.ts:47` `export * from "../dissolve/dissolveGrammar"`), and `dist/motion-core.js` carries 3,212 bytes of `comment:` strings. Its only reader is the lookup `dissolveDialect` at `:96-100`; its only test is `tests/styles/dissolve.test.ts:649-658`, which pins the prose. A read-only search of every sibling repo under `~/Programming` for `DISSOLVE_DIALECTS|DissolveDialect` returns nothing.
- **The comment corpus.** `node scripts/comment-census.mjs --rev HEAD` → `src @ HEAD: 628 files · … · 32965 comment · 51811 code · 38.9%` and `prose-class hits (tranche/wave/round/rule-obeyed/obituary): 379`; `src/styles/tokens/` reads 70.1 %, `src/components/dock/` 56.9 %. The ceiling is `it.fails` at `tests/gates/comment-ratio.test.ts:209`, which W-A.2 turns into the owed entry G-45 with a growth fence.
- **MIGRATION.md.** 349,217 of 2,919,057 unpacked bytes (12.0 %, `npm pack --dry-run --json`). Its sections are not a version list: `node migration-shape.mjs MIGRATION.md <published versions>` (appendix B) → `33 headings · 26 misses`, starting `heading is not a bare version: "10.0.0 — ~~UNRELEASED~~ [2026-09-22 · LIVE: tag …"`, then `"7.0.0 (2026-07-17)"`, `"2.0.0 (AI.W1 R3) — motion subpath surgery"`, `"At a glance"`, `"Before you migrate"`, `"v3.0.0—\`/motion-core\` engine-free carve (AP.W3 R0G-7)"`. It has an `8.1.0` section for a version the registry never published (`npm view @mkbabb/glass-ui versions` lists 35 versions, no 8.1.0). `MIGRATION.md:3212` and `:4229` still promise v0.9.4 support "indefinitely".
- **Style in consumer prose** (README, MIGRATION, DESIGN, CONTRIBUTING, `docs/canon`, `docs/design`, `src/**/*.md`, outside code): 2,132 hits in 32 files: 1,520 spaced em dashes, 610 ALL-CAPS emphasis words from the appendix-A lexicon, 2 first-person decrees (`DESIGN.md:42` "I promulgate seven glass tiers", `:62`). `src/index.ts:172-174` carries the editorial aside L09-10 quotes.

## 3 · The cure

1. **The E-10 grammar is one detector.** `tests/gates/no-tranche-meta.test.ts` runs the appendix-A detector (its spelling set, stated once, is the defect class) over tracked `src`, `demo`, `tests`, `tests-visual`, `scripts`, `.github`, root config and docs (README, MIGRATION, DESIGN, CHANGELOG, CONTRIBUTING, `.gitignore`, `vite*.ts`, `vitest.config.ts`, `tsconfig*.json`, `package.json`), `docs/{canon,design,instructions,audits}`, and the built `dist/**/*.d.ts` and `dist/**/*.js` when `dist/` exists (CI builds first, `ci.yml`). Excluded by class: `docs/tranches/` and `docs/archive/` (records), and `tests/_support/fixtures/` (the synthetic plants W-A.2 puts there). It fails on any hit and prints each one. It is roster entry G-57 NO-TRANCHE-META, bound in this wave with a bite patch that re-adds one `// [2026-09-22 · BK #17]` line.
2. **The sweep.** Every hit is rewritten or deleted, by one rule: a comment states what the code does not say (a unit, a constraint, a non-obvious reason, the spec a number comes from), in the present tense. History, the tranche or row that made a change, what was struck, and what a past reviewer ruled are deleted, not rewritten; they are in git history and the tranche records. Test titles and assertion messages name the behaviour, not the wave. Code that encodes a record id (`scripts/import-dag.mjs:523`'s `supersedes:` field, if W-C.1 has not removed it) loses the field.
3. **`DISSOLVE_DIALECTS` goes.** `DISSOLVE_DIALECTS`, `DissolveDialect`, `DissolveDialectRow` and `dissolveDialect` are deleted from `dissolveGrammar.ts` and so from `./motion-core`. The four unbuilt dialects are records, not facilities; the built one is the vaporize, whose numbers stay in `VAPORIZE_CONSTANTS` (W-C.5 generates its CSS twin). `tests/styles/dissolve.test.ts:649-658` goes with it. MIGRATION row in §7.
4. **The comment share meets its ceiling.** G-45's owed assertion (the latch's own, `comment-ratio.test.ts:209`: repo-wide share ≤ 20 % and zero prose-class hits) becomes a plain test in `tests/gates/comment-ratio.test.ts`, the fence W-A.2 put beside it is deleted, and G-45 turns `bound`. The share falls by the rule of step 2 applied to every comment, not only to the tagged ones: a comment that restates the next line, narrates a past design, or argues with a retired alternative is deleted. The 20 % figure is #17's own target (`census-register-a.md:31`); it is not re-derived here.
5. **MIGRATION is a consumer break list.** One section per version that has a break, newest first, each headed by the bare version (`## 11.0.0`, `## 10.2.0`, …, `## 1.0.0`). Each section is a table `| before | after | note |` in plain prose, with no SHAs, run ids, wave ids, dates or strikes. Sections for versions never published (8.1.0) are deleted; the v0.9.4 support paragraphs are deleted (nine majors later, the promise is false). Record prose (how a break was decided, what BA or BG folded) is deleted. W-0.5's two 7.0.0 entries keep their words, reformatted to the table; W-0.6's 10.2.0 row likewise. `tests/components/status-dot.contract.test.ts`, which reads MIGRATION, is re-pointed at the new table form. W-C.3's arm M then checks each `after` cell against the export map.
6. **Style in consumer prose.** Em dashes carry no spaces; ALL-CAPS emphasis becomes plain words; the first-person decrees and the editorial aside go. The rule is the owner's (plain register, no over-punctuation), and the seven canon files BH rewrote already read in it (L09-10), so it is reachable.
7. **The shadcn DECLARATION column.** The 27 `shadcn` provenance lines are deleted (W-B.12 §3.2). Where a value's source matters (the `--radius` root's 10 px), W-C.4 renames the token to its role and the provenance goes with the old name.
8. **Periphery.** `.github/workflows/ci.yml:58,60` and `release.yml`'s header lose their brackets; `release.yml`'s paragraph at `:13-20` is W-B.13's to delete with the `env:` pair, and whatever header W-B.13 leaves is swept here. `.gitignore`'s tranche-id comments go (W-C.1 rewrites the file; the detector reads it).

## 4 · Files it touches

- Every file with a hit (527 at HEAD; the wave record lists them): most of `src/`, `demo/`, `tests/`, `tests-visual/`, `scripts/`, `MIGRATION.md`, `README.md`, `DESIGN.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `docs/canon/*.md`, `docs/design/*.md`, `.github/workflows/*.yml`, `.gitignore`, `vitest.config.ts`, `vite.config.ts`.
- `src/composables/motion/dissolve/dissolveGrammar.ts` (the table goes), `tests/styles/dissolve.test.ts`.
- New: `tests/gates/no-tranche-meta.test.ts` (appendix A as a test), `tests/gates/migration-shape.test.ts` (appendix B as a test). Edited: `tests/gates/comment-ratio.test.ts` (the latch becomes a test; the fence goes), `tests/components/status-dot.contract.test.ts`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| C2-G1 · no tranche meta | `npm run build && node <appendix A> .` (in the suite as `tests/gates/no-tranche-meta.test.ts`) | META 0 | **exit 1**: `META 4682 hits in 527 files (src 985, demo 170, tests 664, tests-visual 1182, scripts 225, dist 51, MIGRATION 634, other 771)` |
| C2-G2 · the published declarations are clean | the same detector over `dist/**/*.d.ts` alone | 0 | **exit 1**: 43 hits in the `.d.ts` files (16 dist files with a hit in all) |
| C2-G3 · the comment ceiling (G-45) | `node scripts/comment-census.mjs --rev HEAD \| node -e 'const s=require("fs").readFileSync(0,"utf8");const share=+s.match(/src @ HEAD:.*· ([0-9.]+)%/)[1];const hits=+s.match(/prose-class hits[^:]*: (\d+)/)[1];process.exit(share<=20&&hits===0?0:1)'` | exit 0 | **exit 1**: share 38.9, hits 379 |
| C2-G4 · MIGRATION is a version list | `node <appendix B> MIGRATION.md "$(npm view @mkbabb/glass-ui versions --json \| node -pe 'JSON.parse(require("fs").readFileSync(0)).join(",")')"` (in the suite with the published list as a checked-in fixture refreshed at each cut) | exit 0 | **exit 1**: `33 headings · 26 misses` |
| C2-G5 · no prose as runtime data | `npm run build && ! grep -rq -e DISSOLVE_DIALECTS -e dissolveDialect src dist` (two `-e` patterns and no alternation pipe, so the raw and rendered forms are one command; the build first, because grep exits 2 on an absent `dist` and the `!` would pass it) | exit 0 | **exit 1** (fix-4, `715912fa`, `dist` built): hits in `src/composables/motion/dissolve/dissolveGrammar.ts`, `dist/motion-core.js`, `dist/composables/motion/dissolve/dissolveGrammar.d.ts`. The old `\|` form read exit 0 rendered. A clean fixture reads 0; one planted `DISSOLVE_DIALECTS` line reads 1 |
| C2-G6 · consumer prose style | appendix A's STYLE arm | 0 | **exit 1**: `STYLE 2132 hits in 32 files` (1,520 spaced em dashes, 610 caps-emphasis, 2 first-person) |
| C2-G7 · the shadcn declaration residue | `test "$(git grep -ci shadcn -- src \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 27 |
| C2-G8 · hold line: no byte of paint moves | build at `<C2-base>` and at the wave; `diff <(cd a/dist && find . -name '*.css' -exec shasum {} + \| sort) <(cd b/dist && …)`, and the same over `*.js` excluding the `motion-core` chunk | empty | a hold line, not a born-RED. Its bite: any non-comment edit to a stylesheet (for example `--glass-saturate: 1.5` → `1.51` in `tokens/glass.css:79`) changes a CSS sha |

Can each fail and pass? C2-G1 and C2-G6: appendix A's detector, run on a two-file fixture repo, prints `META 0 … STYLE 0` (exit 0); with one line `// [2026-09-22 · BK #17 W-COMMENT-DIET] ~~old~~` added to its `src/a.ts` and one README line with a spaced em dash, `ALWAYS` and a `docs/tranches/` cite, it prints `META 6 hits in 2 files … STYLE 2 hits` (exit 1), both run here. C2-G4: appendix B on a fixture with `## 2.0.0` and `## 1.0.0` → `0 misses`; with `## 1.5.0 — [2026-01-01 · BK]` added → `1 misses`, run here. C2-G1 alone could pass by deleting comments wholesale; C2-G3 does not stop that, and it need not: a codebase with fewer comments is within the rule, and W-A.2's roster bites still require each gate's explanation to live in its `invariant` field.

## 6 · π and DELTA obligations

No visual claim. The wave edits comments, docs and one published export with no paint. C2-G8 is the evidence that no painted byte moved: every `dist/**/*.css` sha equal between `<C2-base>` and the wave build, and every `dist/**/*.js` sha equal except the `motion-core` chunk, whose diff is the removed table. The wave record carries both sha lists.

## 7 · MIGRATION rows

The 11.0.0 section takes one row:

| before | after | note |
|---|---|---|
| `import { DISSOLVE_DIALECTS, dissolveDialect, type DissolveDialect, type DissolveDialectRow } from "@mkbabb/glass-ui/motion-core"` | removed, no successor | the table described dismissal dialects the library does not build; the built one is the vaporize (`.glass-vaporize`, `VAPORIZE_CONSTANTS`) |

The MIGRATION restructure itself is not a break.

## 8 · Ledger rows

Closes #17 W-COMMENT-DIET (`census-register-a.md:31`), E-10 (`census-carries-recap.md:60`; its enforcement is C2-G1), the F-62 row of `ledger/CENSUS.md:134` including #64's DECLARATION column and #55's residue, E-9's residue (the CLAUDE.md cites; E-9's absence line is W-A.2's G-52), E-3's tombstone residue (`census-carries-recap.md:53`), and #7's F-63 cite. Binds G-45 (W-A.2) and B12-G3 (W-B.12).

## 9 · Gestalt passes (P-1)

Tranche fit (one grammar, one detector, stated once; W-C.3 reads the same docs after), wave (C2-G8's sha lists: no paint moved), feature (a reader of `node_modules/@mkbabb/glass-ui/MIGRATION.md` finds their version's section by its heading and a table per break; an IDE hover on any published declaration shows no tranche text).

## Appendix A · the E-10 detector (prototype run at this seat)

```js
// W-C.2 prototype: the E-10 invariant (no tranche meta in live artefacts) and the prose-style arm.
// META (the E-10 grammar, a spelling set): tranche row refs (`BK #17`), dated brackets (`[2026-09-22`),
//   strike tombstones (`~~`), ⊕ markers, tranche wave ids (`AX.W13`, `BH.B0-W0`, `W-DISSOLVE`), finding and
//   inbound ids (`O-62`, `RT-28D`, `TR#30`, `L09-16`, `R8-02-01`), deleted `proof:*` script names, backticked
//   commit shas, cites of the deleted CLAUDE.md, and cites of tranche records (`docs/tranches/`).
//   Scope: tracked src, demo, tests, tests-visual, scripts, .github, root config and docs (README, MIGRATION,
//   DESIGN, CHANGELOG, CONTRIBUTING, .gitignore, vite*.ts, vitest*.ts, tsconfig*.json, package.json),
//   docs/{canon,design,instructions,audits}, and dist/**/*.d.ts plus dist/**/*.js when dist/ exists.
//   Excluded: docs/tranches and docs/archive (records), tests/_support/fixtures (the detector's synthetic plants).
// STYLE (consumer-facing prose: README, MIGRATION, DESIGN, CONTRIBUTING, docs/canon, docs/design, src/**/*.md):
//   a spaced em dash, a first-person decree, an ALL-CAPS emphasis word from the lexicon below (outside backticks).
// Usage: node no-meta.mjs [root] [--list]. Exit 1 when either arm has a hit.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
const root = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : ".");
const list = process.argv.includes("--list");
const tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" }).split("\n").filter(Boolean);
const TEXT = /\.(ts|tsx|vue|css|mjs|cjs|js|json|md|yml|yaml|sh|html)$|^\.gitignore$/;
const inScope = (f) => TEXT.test(f) && !/^docs\/(tranches|archive|precepts|consumer-evidence)\//.test(f) && !/^tests\/_support\/fixtures\//.test(f) && !/package-lock\.json$/.test(f);
let files = tracked.filter(inScope);
const walk = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const dist = walk(path.join(root, "dist")).filter((f) => /\.(d\.ts|js)$/.test(f)).map((f) => path.relative(root, f));
files = files.concat(dist);
const META = [
  ["row-ref", /\b(?:A[A-Z]|B[A-Z])\s?#\d+/g], ["dated-bracket", /\[20\d\d-\d\d-\d\d\b/g], ["strike", /~~/g], ["oplus", /⊕/g],
  ["wave-id", /\b(?:[A-Z]{1,2}|IOS27-MICRO)\.(?:W|B|P)[0-9][A-Za-z0-9-]*|\bW-[A-Z][A-Z0-9-]{2,}/g],
  ["finding-id", /\bO-\d{2}\b|\bRT-\d+[A-Z]?\b|\bTR#\d+|\bL\d\d[ab]?-(?:F)?\d\d\b|\bR\d{1,2}-\d\d-\d\d\b|\bUIA-[A-Z]+-\d+\b/g],
  ["proof-script", /\bproof:[a-z][a-z0-9-]*/g], ["sha", /`[0-9a-f]{8}`/g], ["claude-md", /CLAUDE\.md/g], ["record-cite", /docs\/tranches\//g],
];
const PROSE = tracked.filter((f) => /^(README|MIGRATION|DESIGN|CONTRIBUTING)\.md$/.test(f) || /^docs\/(canon|design)\/.*\.md$/.test(f) || /^src\/.*\.md$/.test(f));
const LEX = "NEVER|ALWAYS|MUST|ONLY|NOT|NO|EVERY|ALL|NONE|ZERO|ONE|TWO|THE|IS|ARE|WAS|BOTH|EXACTLY|SINGLE|CANONICAL|LIVE|DELETED|RETIRED|STRUCK|OWED|ROUTED|DEAD|HERE|THIS|THAT|OR|AND|BUT|NOW|STILL|ALREADY|OWN|SAME|WHOLE|REAL|TRUE|FALSE|BEFORE|AFTER|ANY|IS|DOES|CANNOT|WITHOUT";
const STYLE = [["spaced-em-dash", / — /g], ["first-person", /\bI (?:promulgate|decree|rule|ratify|declare)\b/g], ["caps-emphasis", new RegExp(`\\b(?:${LEX})\\b`, "g")]];
const hits = { meta: [], style: [] }; const byClass = {};
for (const f of files) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  s.split("\n").forEach((line, i) => { for (const [k, re] of META) for (const m of line.matchAll(re)) { hits.meta.push(`${f}:${i + 1} ${k} ${m[0]}`); byClass[k] = (byClass[k] ?? 0) + 1; } });
}
for (const f of PROSE) {
  const s = fs.readFileSync(path.join(root, f), "utf8").replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, " "));
  s.split("\n").forEach((line, i) => { const bare = line.replace(/`[^`]*`/g, " "); for (const [k, re] of STYLE) for (const m of bare.matchAll(re)) { hits.style.push(`${f}:${i + 1} ${k} ${m[0]}`); byClass[k] = (byClass[k] ?? 0) + 1; } });
}
const fileCount = (a) => new Set(a.map((x) => x.split(":")[0])).size;
const tree = (a, pre) => a.filter((x) => x.startsWith(pre)).length;
console.log(`no-meta: META ${hits.meta.length} hits in ${fileCount(hits.meta)} files (src ${tree(hits.meta, "src/")}, demo ${tree(hits.meta, "demo/")}, tests ${tree(hits.meta, "tests/")}, tests-visual ${tree(hits.meta, "tests-visual/")}, scripts ${tree(hits.meta, "scripts/")}, dist ${tree(hits.meta, "dist/")}, MIGRATION ${tree(hits.meta, "MIGRATION.md")}, other ${hits.meta.length - ["src/", "demo/", "tests/", "tests-visual/", "scripts/", "dist/", "MIGRATION.md"].reduce((n, p) => n + tree(hits.meta, p), 0)}) · STYLE ${hits.style.length} hits in ${fileCount(hits.style)} files`);
console.log(JSON.stringify(byClass));
if (list) console.log([...hits.meta, ...hits.style].join("\n"));
process.exitCode = hits.meta.length + hits.style.length ? 1 : 0;
```

HEAD output (worktree at `26d193b7`, `dist/` built):

```
no-meta: META 4682 hits in 527 files (src 985, demo 170, tests 664, tests-visual 1182, scripts 225, dist 51, MIGRATION 634, other 771) · STYLE 2132 hits in 32 files
{"dated-bracket":543,"record-cite":260,"wave-id":1730,"proof-script":347,"finding-id":366,"sha":127,"claude-md":31,"row-ref":500,"strike":733,"oplus":45,"spaced-em-dash":1520,"caps-emphasis":610,"first-person":2}
```

## Appendix B · the MIGRATION shape check

```js
// W-C.2 prototype: MIGRATION.md is one section per version, newest first. Every `## ` heading is a bare
// semver; headings strictly descend; each is a version the registry published or package.json's version.
// Usage: node migration-shape.mjs [MIGRATION.md] [published versions, comma-separated]. Exit 1 on any miss.
import fs from "node:fs";
const s = fs.readFileSync(process.argv[2] ?? "MIGRATION.md", "utf8");
const published = new Set((process.argv[3] ?? "").split(",").filter(Boolean));
const pkgv = JSON.parse(fs.readFileSync("package.json", "utf8")).version; published.add(pkgv);
const heads = [...s.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const cmp = (a, b) => { const [x, y] = [a, b].map((v) => v.split(".").map(Number)); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
const fails = []; let prev = null;
for (const h of heads) {
  if (!/^\d+\.\d+\.\d+$/.test(h)) { fails.push(`heading is not a bare version: "${h.slice(0, 70)}"`); continue; }
  if (published.size > 1 && !published.has(h)) fails.push(`heading ${h} is not a published version`);
  if (prev && cmp(prev, h) <= 0) fails.push(`heading ${h} does not descend from ${prev}`);
  prev = h;
}
console.log(`migration-shape: ${heads.length} headings · ${fails.length} misses`); if (process.argv.includes("--list")) console.log(fails.join("\n"));
process.exitCode = fails.length ? 1 : 0;
```
