# W-L.6 · the P-6 census: every published symbol has a reader, or it leaves the surface · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b3d7fa28` in a scratch worktree; `src` identical to v10.1.0. `dist/` and `dist-demo/` built there. Sibling repos read only (`rg` and file reads; nothing built or run in them) |
| ships in | 11.0.0 |
| families | F-66 whole (`audit/REGISTRY.md:1416-1427`): L05a-18, L06-10, L10-06, L10-07, L10-15, L10-21, L13-14, R2-01-12, R2-06-11 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| engines | none for the census; the one demo check (§5 G-L6-5) ran in Chromium |

## 1 · What it closes

| id | defect |
|---|---|
| L06-10, L10-06, L05a-18, L10-07, L10-15, L10-21, L13-14 | exports, subpaths and artefacts with no reader outside tests. L10-06 counted 94 of 321 value exports unused; L06-10 367 of 603 runtime exports unimported |
| R2-01-12 | `.glass-top-layer` has no mounting site; its one arm is Chromium-only `@supports (overlay: auto)` |
| R2-06-11 | `useLiquidReveal` ("doesn't seem to work at all") is exported with 0 call sites; aurora `source: "image"` ships with 0 demo uses |
| E-7 (census `census-carries-recap.md:57`) | the overfitting law's letter holds only because `overfit-structure.test.ts` EXPORT-REACH treats "published" as reached (`tests/gates/overfit-structure.test.ts:220-237`, `leaks()` keeps `!r.published`) |
| P-6 (census `CENSUS.md:189`) | the P-6 audit did not run at the 10.0.0 close; this wave produces its artefact for W-L.8 |
| #21's `./blob-config` item, #41 RT-41A, #53's and #58's F-66 items (`CENSUS.md:138`) | each measured in §2 |
| L06-11 (its roster clause) | the consumer roster of record omits chicago, scaena and bbnf-buddy |

## 2 · The defect at HEAD

**The census** (appendix A: `surface.mjs` imports every JS entry of `package.json` `exports` from `dist/`; `p6-census.mjs` collects every named import from `@mkbabb/glass-ui…` in 13 sibling repos and every `@glass/…` import in `demo/`, excluding tests, `node_modules`, `dist`, worktrees and `.claude`):

| reading | value |
|---|---|
| entries imported | 63, 0 failures |
| entry × name rows | 603 |
| distinct runtime names | 468 |
| read by a consumer | 203 (183 by a consumer on the 10.x line; 20 only by consumers on older majors: muster, words, bbnf-lang, sci-report, scaena) |
| read by the demo only | 38 |
| **read by nobody** | **227** |
| of those, by entry (top) | `./motion-core` 40 · `./constellation` 30 · `.` 24 · `./motion` 20 · `./typewriter` 17 · `./deck` 15 · `./aurora` 14 · `./sheet` 10 · `./axes` 8 · `./carousel` 8 · `./blob` 7 · `./color` 6 · `./handmark` 5 · `./blob-config` 4 |
| entries no consumer reads | `./fourier-math` (8 names, 6 read by the demo), `./pager-dots` (5 names, 1 read by the demo) |

The consumer roster: value.js, keyframes.js, fourier-analysis, atlas, chicago, slides, speedtest, bbnf-buddy, sci-report, scaena, muster, words, bbnf-lang (every sibling with a `@mkbabb/glass-ui` dependency; pins read at their `package.json` lines, W-L.7 §2). The roster of record, `docs/audits/overfitting-audit.md`'s `{CONSUMER_PATHS}`, names neither chicago, scaena nor bbnf-buddy (`grep -c "\.\./chicago"` → 0, same for the other two).

**The named artefacts** (`rg` over `glass-ui/demo` and the consumer trees, excluding docs):

| artefact | readers | source |
|---|---|---|
| `.glass-top-layer` | 0 in the demo, 0 in consumers, 0 `.vue`/`.ts` sites in `src` | 10 lines in `src/styles/animations.css:203-255` |
| `useLiquidReveal` | 0 code readers; `src` names it only in comments (`useElementMorph.ts:19`, `useDockCtaReceive.ts:6`, `dock/styles/morph.css:75`) | `src/composables/motion/reveal/useLiquidReveal.ts`, exported from `./motion` |
| aurora `source: "image"` | 0 in the demo, 0 in consumers | `aurora/constants/presets.ts:28` `AuroraSource = "palette" \| "image"`, the image programs `aurora/constants/shaders/aurora-image.{wgsl,frag}.ts`, `composables/auroraImageSource.ts`, `textureUpload.ts`, `uniformBridgeWGPUImage.ts` |

**Census rows re-measured** (their F-66 items):

- #21 says `./blob-config` "has 0 consumers across the siblings" (`census-register-a.md:34`). **Refuted at HEAD**: value.js reads it in two files, `demo/scenes/blob/BlobPane.vue:12-13` and `demo/color-picker/composables/boot/useAtmosphere.ts:36` (`BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`, `BlobConfig`). `dist/blob-config.js` is 245 B against `dist/blob.js`'s 102,999 B: it is the light door for the config. Its names are also on `./blob` (20 names on both, `waves/W-D.1.md:49`); the second door is W-D.1's.
- #53 says "No sibling imports FourierField … slides pins 3.13.0". **Refuted at HEAD**: slides pins 10.1.0 (`slides/package.json:30`) and imports it at `src/decks/feedback-coder/slides/Slide01.vue:10` and `Slide05.vue:23`.
- #58 says unreached story SFCs belong here (`/forms/select` renders "Page not found"). **Measured**: 10 of 90 story SFCs have no route (data/avatar, display/dark-mode-toggle, display/separator, display/status-dot, feedback/toaster, forms/label, forms/select, foundations/paper-texture, motion/countup, motion/typewriter; `/forms/select`, `/motion/typewriter` and `/display/separator` read "Page not found" in the built demo). Each is imported as a section by a routed page (`display/atoms.vue`, `feedback/toast.vue`, `forms/inputs.vue`, `foundations/paper-glass.vue`, `motion/text-motion.vue`), so none is dead. The defect is placement (a section file shaped like a routed story), which is W-D.1's colocation; this wave holds no row for it.
- #41 RT-41A: `useSortable`'s returned `dropIndex` (`sortable-list/useSortable.ts:160`) has no reader in `src` or `demo` (`rg dropIndex src demo` → the definition and `drag.ts`'s own writes only). `useSortable` is not a published name, so this is an internal field with no reader.

## 3 · The cure

### 3.1 One census, one roster, run at the close

- `scripts/audit/consumer-census.mjs` (the two appendix scripts joined): the published runtime surface from the packed artefact × named imports in each roster consumer × `@glass/…` imports in `demo/`. It writes a TSV, one row per published name: entries, reading consumers, demo files, verdict.
- The roster lives in one file, `scripts/audit/consumer-roster.json` (repo, root, glass-edge paths). The canned prompt `docs/audits/overfitting-audit.md` and `tests/docs/consumer-paths-exist.test.ts` read it; the prose list in the prompt is deleted. It carries all 13 consumers above.
- The census reads sibling trees, so it runs where the siblings are: at the close, on the owner's machine, as W-L.8's P-6 item. CI does not run it (siblings are absent there, and a missing root would read as zero readers). CI keeps the in-repo half (§3.3).

### 3.2 The verdict rule, by kind

A published name with no reader in the roster and none in the demo takes exactly one of these, decided by its kind:

| kind | verdict |
|---|---|
| a Vue component a consumer would mount | WIRE: a demo story mounts it (the story is the published specimen, F-34) |
| a composable or function | UNEXPORT if `src` still calls it; DELETE if nothing does |
| a constant, tunable, table or type-only helper | UNEXPORT (module-private) |
| an entry left with no published name | the entry leaves `exports` |

A name read only by a consumer on an older major (20 names at HEAD) keeps its place only if a demo story also reads it; otherwise the rule above applies and the consumer's packet (W-L.7) names it. A name read only in tests has no reader.

### 3.3 The in-repo invariant

EXPORT-REACH stops treating "published" as reached: `leaks()` becomes `externalSites.length === 0 && demoSites.length === 0`, so a published export with no demo reader and no in-`src` reader fails in CI. The consumer half cannot run in CI; the close-time census covers it (§3.1), and W-L.8 fails without the census artefact.

### 3.4 The named rows

| artefact | terminal | rationale |
|---|---|---|
| `.glass-top-layer` and its `@supports (overlay: auto)` arm | DELETE | no mounting site anywhere; a Chromium-only arm with no reader is a dual path for nothing |
| `useLiquidReveal` | DELETE (file, barrel line, the three comments that name it) | 0 code readers; the owner's words "doesn't seem to work at all" (R2-06-11) |
| aurora `source: "image"` | RETIRE, executed by W-G.4 | 0 readers. W-G.4 (the aurora greenfield) builds without the image program, so W-G.1 does not port it; `AuroraSource` becomes the palette program only, and the prop goes. This wave's gate checks the absence |
| `./blob-config` | KEEP | value.js reads it (§2); the doubled names on `./blob` are W-D.1's |
| `FourierField` | KEEP | slides reads it (§2) |
| `useSortable().dropIndex` | DELETE the returned field | no reader; the controller's own ref stays internal |
| `./fourier-math`, `./pager-dots` | per §3.2 | each name ruled by kind; the entry leaves `exports` if nothing remains |

## 4 · Files it touches

New: `scripts/audit/consumer-census.mjs`, `scripts/audit/consumer-roster.json`. Edited: `tests/gates/overfit-structure.test.ts` (EXPORT-REACH), `tests/docs/consumer-paths-exist.test.ts` (reads the roster file), `docs/audits/overfitting-audit.md` (the roster paragraph points to the file); `src/styles/animations.css`; `src/composables/motion/index.ts`, `src/composables/motion/reveal/useLiquidReveal.ts` (deleted); `src/components/sortable-list/useSortable.ts`; every barrel and `index.ts` the census rows touch; `package.json` `exports` for any entry that empties; demo stories for WIRE rows; `MIGRATION.md`, `CHANGELOG.md`. The aurora image files are W-G.4's.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L6-1 · the census is empty | `node scripts/audit/consumer-census.mjs --out <evidence>/P6-CENSUS.tsv` (appendix A at this seat) | exit 0: 0 names with no reader | **exit 1**: `{"distinct":468,"consumer":203,"demoOnly":38,"none":227}` |
| G-L6-2 · EXPORT-REACH has no escape | `npx vitest run tests/gates/overfit-structure.test.ts -t EXPORT-REACH` with `leaks()` reduced to `r.externalSites.length === 0` (the `!r.published` escape gone) | pass | **fail** (edit applied in the scratch worktree only, then reverted): "35 runtime export(s) are referenced nowhere outside their own module", 2 tests failed. Unedited, the arm passes at HEAD (5 passed, 10 skipped) because of the escape at `overfit-structure.test.ts:223`. Its external-site test is a word match over `src` and `demo`, so a comment counts as a reader; §3.3 replaces the word match with import reads, the census's rule, and the count can only rise |
| G-L6-3 · the named rows | `! rg -q 'glass-top-layer' src && ! test -e src/composables/motion/reveal/useLiquidReveal.ts && ! rg -q '"image"' src/components/aurora/constants/presets.ts && ! rg -q 'dropIndex:' src/components/sortable-list/useSortable.ts` | exit 0 | **exit 1**: all four present |
| G-L6-4 · the roster | `for c in value.js keyframes.js fourier-analysis atlas chicago slides speedtest bbnf-buddy sci-report scaena muster words bbnf-lang; do node -e "process.exit(require('./scripts/audit/consumer-roster.json').some(r=>r.repo==='$c')?0:1)" \|\| exit 1; done` | exit 0 | **exit 1**: no roster file; the prompt's list lacks chicago, scaena, bbnf-buddy |
| G-L6-5 · the demo reaches every story file (a hold line) | every `demo/stories/*/*.vue` is routed by the manifest or imported by a routed story | holds | holds at HEAD: the 10 unrouted files are each imported by a routed page (§2). It guards the WIRE rows: a story added for a WIRE verdict must be reachable |

G-L6-5 is a hold line and is not counted as born RED.

## 6 · π and DELTA obligations

The wave's visual claims are the WIRE rows: each new or extended story is captured once, light and dark, Chromium, with Playwright WebKit labelled and real Safari UNMEASURED (OW-3), under `.cache/evidence/W-L.6/`. The deletions make no visual claim; the one surface that could change paint is `.glass-top-layer`, and it has no mounting site (§2), so there is nothing to pair.

## 7 · MIGRATION rows (11.0.0)

One row per removed or unexported name, generated from the census TSV's DELETE and UNEXPORT rows (name, door, "no successor" or the module that now owns it), written into `## 11.0.0` in one table. Fixed rows:

| removed | successor |
|---|---|
| `useLiquidReveal` (`./motion`) | none |
| `.glass-top-layer` | none; a native top-layer surface is the overlay contract's (W-E.4) |
| aurora `source="image"` and `AuroraSource`'s `"image"` | none (W-G.4) |
| any entry the census empties | none, or the entry that now holds its names |

W-L.7's closure check (G-L7-3) runs over these rows.

## 8 · Ledger rows

Closes F-66 (all nine members), E-7 (its spirit, through §3.3), P-6's census half (the artefact W-L.8 cites), L06-11's roster clause, #21's `./blob-config` item (KEEP, the census's "0 consumers" corrected), #41 RT-41A, and #53's and #58's F-66 items (both refuted at HEAD, with the #58 placement routed to W-D.1). VREVEAL-HOOK (the exported `vReveal` directive's `data-reveal` hook, 0 sibling consumers) closes on G-L6-1: the per-symbol census rules it with every published symbol.

## Appendix A · the census as run here

`tests/_bandL/surface.mjs` (in the scratch worktree): for each `exports` key whose target ends in `.js`, `await import(dist file)` and list `Object.keys`. Output: `entries-ok=63 rows=603 distinct=468 fails=0`.

`tests/_bandL/p6-census.mjs`: `rg -l` over each consumer root (globs exclude `node_modules`, `dist`, `.worktrees`, `.claude`, `tests`, `*.spec.*`, `*.test.*`); for each file, every `import|export … from "@mkbabb/glass-ui…"` statement (type-only imports skipped), names split on `,` and `as`; the same over `demo/` for `@glass/…` specifiers. Verdict: `consumer` if any roster repo imports the name, else `demoOnly` if the demo does, else `none`. Output: `{"distinct":468,"consumer":203,"demoOnly":38,"none":227}`, exit 1. The TSV is `<scratch>/formation/band-L/out/p6-census-head.tsv`.
