# BH P1 — THE EXPORT-RESHAPE MECHANISM (proven)

Repo: `/Users/mkbabb/Programming/glass-ui` @ `tranche/BG`, v4.2.0 → BH 5.0.0.
Artifacts (this dir): `regen-exports.mjs` (the prototype), `regen-output.json` (emitted exports+typesVersions), `regen-diff.json` (the machine diff).

## HEADLINE
`regen-exports.mjs` reproduces the CURRENT `package.json` exports + typesVersions **EXACTLY — zero unexplained delta** (96/96 export keys, 89/89 typesVersions) from a GLOB over the colocated `src/components/{ui,custom}/*/index.ts` barrels + 3 explicit policy maps. The glob entry set matches the live `libraryEntries()` **90/90 name-for-name**. The 5.0.0 clean break (delete `src/subpaths/`, fold `src/api/`) is therefore mechanically safe: a silent subpath vanish is impossible — any miss shows as an ADD or DROP in the diff, both of which are 0.

---

## 1. EXPORT-COUNT RECONCILIATION (the synthesis flagged ~90-96 vs ~72-76)

The "72-76" figure is **STALE PROSE**, not a live discrepancy. CLAUDE.md itself admits it ("the prose figure here trails the gate"). The gate and package.json AGREE.

| source | count | what |
|---|---|---|
| `package.json` exports keys | **96** | total |
| → root `.` | **1** | `glass-ui.js` |
| → JS subpaths (`./dist/<name>.js`) | **89** | the per-subpath chunk surface |
| → CSS/font | **6** | `./styles`, `./styles/critical`, `./styles/deferred`, `./styles/fonts`, `./styles.css`, `./fonts/*` |
| `typesVersions["*"]` entries | **89** | one per JS subpath (api is the only nested-dts) |
| `proof:subpath-enumeration` `exportSubpathCount` | **89** | RAN — `scripts/proof-subpath-enumeration.mjs:80`, matches |
| `libraryEntries()` keys | **90** | 89 + `index` (RAN — `vite.library.ts:28`) |

**89 JS subpaths = 79 `src/subpaths/*.ts` mirror barrels + 10 curated** (9 flat `src/*.ts` [carousel,dark,forms,infinite-scroll,keyboard,motion,motion-core,sidebar,tokens] + 1 `src/api/` dir).

The 89 decompose under the NEW glob as: **25 published ui/ + 47 published custom/ + 7 composable-subtree + 10 curated (excl. index→root)** = 89. ✓

---

## 2. THE AUTHORITATIVE RENAME / POLICY MAP (the name≠dir + internal cases)

The glob over `src/components/{ui,custom}/*/index.ts` covers 72 of 89 (25 ui + 47 custom). The other 17 + the exclusions need explicit maps. THREE classes:

### A. EXPORT_NAME overrides — name ≠ source-dir leaf (3 true renames)
| export key | source | reason |
|---|---|---|
| `./canvas` | `src/composables/glass/canvas2d/index.ts` | key "canvas" ≠ leaf "canvas2d"; nested under `glass/` |
| `./motion-curves` | `src/composables/motion/curves.ts` | key ≠ leaf "curves"; nested FILE not dir |
| `./fourier-math` | `src/components/custom/fourier-field/math.ts` | key ≠ leaf "math"; nested FILE under `fourier-field/` |

NOTE: the synthesis's `/pager ← pager-dots` is **WRONG**. The live export key is `./pager-dots` (matches its dir `custom/pager-dots`). CLAUDE.md prose says "subpath /pager" but package.json proves `./pager-dots`. Evidence over prose — NOT a rename case.

### B. COMPOSABLE_SUBPATHS — published leaves OUTSIDE components/ (4, name=leaf)
`./color`←`composables/color`, `./dom`←`composables/dom`, `./reactive`←`composables/reactive`, `./virtual`←`composables/virtual`. The component-glob misses them; explicit map needed. (canvas/motion-curves/fourier-math from class A are also composable/nested — 7 total in the map.)

### C. CURATED flat barrels (11) — hand-curation, CANNOT be globbed
`index`(→root `.`), `api`, `tokens`, `forms`, `dark`, `keyboard`, `carousel`, `motion`, `motion-core`, `sidebar`, `infinite-scroll`. These carry SCC-trap curation (vueuse/keyframes-bearing split — `dark`/`keyboard`/`forms`/`motion`/`motion-core`/`sidebar` re-export composable subtrees deliberately OFF the root barrel). STAY explicit; the plan moves them to `src/entries/` but the EXPORT KEY + dist chunk name are unchanged.

### D. INTERNAL exclusions — index.ts present, NOT published (a blind glob would over-publish)
- **ui (18):** `_shared`, `accordion`, `alert`, `avatar`, `carousel`(→curated `/carousel`), `checkbox`, `combobox`, `input`(→`/forms`), `metric-pill`, `multi-select`, `radio-group`, `section`, `skeleton`, `table`, `tabs`(reka substrate; published `./tabs`=custom/tabs), `tags-input`, `textarea`(→`/forms`), `toggle`
- **custom (3):** `goo-filter` (single internal `<filter>` mount), `infinite-scroll` (→curated `/infinite-scroll`), `split-chars` (root barrel + `/motion-core`, no own subpath)

The zero-add/zero-drop diff PROVES this set is exactly correct: a missed internal dir → ADD; a wrongly-excluded published dir → DROP. Both are 0.

### ui/custom name COLLISION
`tabs` exists in BOTH `ui/` (reka substrate, internal) and `custom/` (SegmentedTabs, published). The glob resolves custom/ wins the `./tabs` key; ui/tabs is in INTERNAL_UI. Prototype handles + reports collisions (0 unhandled).

---

## 3. THE INTENTIONAL 5.0.0 DELTAS (NOT bugs — the clean break)
The prototype reproduces HEAD exactly for fidelity. The deliberate 5.0.0 changes layer ON TOP, each LISTED (no silent drop):
- **DROP `./api`** — B2.2 folds `src/api/` (854L, 1 demo consumer). `Surface`/`surfaceClass` re-export from `/card`; the type→subpath migration map is the B7 by-name ask. Its current `typesVersions` nesting (`dist/api/index.d.ts`, the ONLY non-flat dts) disappears with it.
- **Move CURATED flat barrels** `src/*.ts` → `src/entries/` (export keys + chunk names UNCHANGED — source-only move, like the AV.W5 subpaths move).
- **DELETE `src/subpaths/`** (79 files) — the glob replaces them.
Each is a NAMED rename/drop → the B7 consumer-migration map row; `proof:subpath-enumeration` re-baselines to the new entry set (folded, NOT flagged as regression).

---

## 4. sideEffects VERDICT — CORRECT, do NOT change
`package.json` `sideEffects: ["*.css"]` is **correct and complete**. Evidence:
- ZERO JS/TS `.css` imports in `src/` (grep `import .*\.css` = 0) — all CSS is externalized to the `/styles` bundle (incl. compiled SFC `<style scoped>`), so JS subpath chunks carry no CSS side-effect.
- `["*.css"]` marks every `.css` side-effectful (never tree-shaken when imported for styling) AND every JS re-export barrel pure → per-subpath + root-barrel tree-shaking works as intended.
- The pattern has no `/`, so it matches any `.css` basename (incl. nested `dist/styles/*.css`).
η's "wrong/missing sideEffects silently negates subpath tree-shaking" concern is NOT live here. The field is sound. (No `main`/`module` fields — `exports`-only resolution, correct for the modern subpath surface.)

---

## 5. vite.library.ts WIRING (the glob drives libraryEntries identically)
`libraryEntries()` (`vite.library.ts:28-54`) today = 11 curated + batch-resolve of `src/subpaths/*.ts`. The 5.0.0 `regen-exports.mjs` glob produces the SAME 90 keys (verified name-for-name). `vite.library.ts` rewrites to: curated(11) + COMPOSABLE_SUBPATHS(7) + glob`(components/{ui,custom}/*/index.ts` minus INTERNAL). ONE source of truth shared by `libraryEntries()` AND `regen-exports.mjs` (export the maps from a shared module so the build entry map and the package.json generator never drift). `libraryExternal` (`vite.library.ts:60-74`) is a SEPARATE B1a fix (dead `lucide-vue-next`/`vaul-vue` → live `@lucide/vue`).
