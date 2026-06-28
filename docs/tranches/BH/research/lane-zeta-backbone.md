# Lane ζ — Backbone Currency · Build/Export · Script Sprawl · DI/Pipeline (BH research)

READ-ONLY research for the BH repo-cleanup tranche. Scope: dependency currency (reka-ui,
shadcn-vue, tailwind/ts/vite/vitest), the build/export pipeline (vite.library.ts +
vite.config.ts + vite.style-assets.ts), the 384-script sprawl, and the gates.mjs runner as a
pipeline-orchestration / service-boundary problem.

Repo: /Users/mkbabb/Programming/glass-ui · branch tranche/BG · date 2026-06-28.

---

## 0. EXECUTIVE SUMMARY (the concrete moves)

1. **Dependency currency: ALL CURRENT, zero stale, zero bleeding-edge risk.** reka-ui, tailwind
   4.3.1, vite 8, ts 6.0, vitest 4.1.9 are all the live latest. No bump needed. The reka binding
   sweep the memory warns about has a near-zero surface (0 `:pressed`, 0 `v-model:search-term` in
   src). The currency band is "verify + bump dev floors", not "migrate".
2. **CRITICAL BUILD BUG — `@lucide/vue` is BUNDLED into dist.** `libraryExternal`
   (vite.library.ts:60-74) externalizes the DEAD `lucide-vue-next` (renamed to `@lucide/vue` at
   v1.0) and the DEAD `vaul-vue` (abrogated at BB.W-DRAWER-ABROGATE), but does NOT externalize the
   LIVE `@lucide/vue`. Result: lucide is shipped inside `dist/createLucideIcon-*.js` +
   `dist/vendor-*.js` — every consumer double-loads the icon set. **Fix in BH: replace the two dead
   strings with `@lucide/vue`.** This is a 1-line payload fix.
3. **Export reshape (5.0.0) is well-scoped + mechanical.** `src/subpaths/` (79 trivial mirror
   barrels) + `vite.library.ts`'s two-tier entry map are the mirror-dir machinery; both DIE. The
   colocated barrels already exist (each subpath is `export * from "../components/<dir>"`), so the
   identical chunk set can be emitted by globbing the component dirs directly — no mirror dir. See §3.
4. **CLAUDE.md deletion: 17 gates PARSE it, ~15 ASSERT canon-text presence.** The two named gates
   (proof:claude-structure-sync, proof:doc-override-idiom) plus ~15 others read CLAUDE.md as input.
   Most assert "CLAUDE.md records X" (a doc-presence check) → these RE-HOME onto the new modular doc
   set or RETIRE. See §4.
5. **Script sprawl is severe but has a real spine. 361 proof:* keys, 349 manifest rows, 68 scripts
   >500L, and 164 scripts each define their OWN comment-strip function (zero share a helper).** The
   god-runner gates.mjs (2489L) is mostly a 349-entry inline manifest where ~80% of each row is
   prose `note`. The service-boundary fix is a shared detector-kit + a data-file manifest, not a
   rewrite. See §5–§6.

---

## 1. DEPENDENCY CURRENCY (WebSearch-verified, 2026-06-28)

package.json (devDeps unless noted; peer floors in parens):

| dep | our pin | latest (verified) | verdict |
|---|---|---|---|
| reka-ui | `^2.9` (peer `^2.0`) | **2.10.0** (4 days ago) | CURRENT — `^2.9` resolves 2.10. No action. |
| shadcn-vue | (CLI, not a dep) | shadcn/ui v4 CLI Mar 2026 | see §2 |
| tailwindcss | `^4.3.1` (peer `^4.0`) | **4.3.1** (Jun 12 2026) | CURRENT — exact latest. |
| @tailwindcss/vite + /postcss | `^4.3.1` | 4.3.1 | CURRENT. |
| typescript | `^6.0.3` | **6.0** stable (Mar 23 2026) | CURRENT. TS 6.0 is the *final JS-based* release; TS 7.0 (Go-native) is the next horizon — a future tranche, not BH. |
| vite | `^8` (rolldown) | **8.0** stable (Mar 12 2026), Rolldown 1.0 stable (May 7 2026) | CURRENT. `vite.config.ts` already uses `rolldownOptions` + the single-arg `manualChunks`. API is locked under semver. |
| vitest | `^4.1.9` | **4.1.9** (12 days ago) | CURRENT — exact latest. |
| vue | `^3.5.34` (peer `^3.5`) | 3.5.x | CURRENT. |
| vue-tsc | `^3.3.5` | 3.x | CURRENT (drives the out-of-band dts emit). |
| @vueuse/core | `^14.3.0` (peer `^14.0`) | 14.x | CURRENT — the `^14` spine is fully converged (vaul-vue's `^10` dual was killed at BB.W-DRAWER-ABROGATE). |
| @mkbabb/keyframes.js | `^5.1.0` (peer `^5.0.0`) | sibling | OK. |
| @mkbabb/value.js | `^0.13.0 \|\| ^1.0.0` | sibling | **straddle pin** — the `^0.13.0 \|\| ^1.0.0` OR-range is a legacy-compat shim. Per the no-backwards-compat precept BH should pick ONE (value.js 1.x is stabilized per CLAUDE.md) and drop the `^0.13.0` leg. Low-risk, by-name-ask the sibling. |

**Verdict: NO stale deps, NO bleeding-edge risk.** Everything is the live latest. The only
dependency-hygiene moves for BH:
- Drop the `@mkbabb/value.js` `^0.13.0 || ^1.0.0` straddle → `^1.0.0` (no-backwards-compat).
- reka binding sweep: the memory warns stale reka prop/emit bindings silently no-op (`:pressed`,
  `v-model:search-term`, `tag=`). **Surface is near-zero:** `grep` finds 0 `:pressed`, 0
  `search-term/searchTerm` in src/components; 18 SFCs import `from "reka-ui"`. A bump to 2.10 (or
  raising the peer floor) warrants a quick e2e sweep of those 18, but there is no known broken
  binding at HEAD.

Sources: reka-ui releases, tailwindcss releases, vite 8 blog, TS 6.0 announce, vitest 4.1 blog (all
WebSearch 2026-06-28).

---

## 2. SHADCN-VUE: re-pull + re-apply glass diff — RECOMMENDATION

`components.json` is present + valid:
```json
{ "$schema": "https://shadcn-vue.com/schema.json", "style": "default", "typescript": true,
  "tsConfigPath": "./tsconfig.json",
  "tailwind": { "css": "src/styles/index.css", "baseColor": "slate", "cssVariables": true },
  "framework": "vite", "aliases": { "components": "src/components", "utils": "src/utils" } }
```

**2026 update story (WebSearch):** shadcn-vue ships an `update` command + a `diff` command
(`npx shadcn-vue@latest diff button`, `npx shadcn-vue@latest diff` for all). The broader shadcn/ui
v4 CLI (Mar 2026) added `--diff` (check registry updates), `--dry-run` (preview), `--view`
(inspect contents), `--overwrite`. The `update`/`add --overwrite` path **overwrites local
modifications** — the docs explicitly warn to commit first.

**Assessment: our customization is TOO DEEP to track upstream as a clean re-pull, and that is
CORRECT — do not try to make shadcn-vue `update` a maintenance path.** Evidence:
- The 41 `ui/` components are reka-ui wrappers but every one composes the glass token system
  (`--glass-bg-*` ladder, `.input-pill`, `.glass-menu-row`, `--invalid-ring`, the `surface` axis,
  the `.focus-ring` divergence over inline `focus-visible:ring-*`). A `shadcn-vue diff` would report
  ~100% drift on every file — the diff is unreadable as "upstream changed X".
- The backbone we want updatable is **reka-ui** (the headless primitive), NOT the shadcn-vue
  copy-pasted wrapper. reka-ui IS a real semver dep (`^2.9`) and updates via `npm update` — that is
  the live update path and it is healthy.
- `baseColor: "slate"` is stale config (the library is warm-cream `hsl(36 48% 97%)`, BA.W-NO-GRAY)
  but it only seeds NEW `shadcn-vue add` scaffolds, so it is inert until someone adds a component.

**BH recommendation (documented mechanism, NOT a re-pull pipeline):**
1. KEEP `components.json` for the scaffold ergonomics of `shadcn-vue add <new-component>` (it
   generates the reka wrapper skeleton we then glass-ify) — but document that `update`/`diff` are
   NOT a maintenance channel for existing components (too-deep customization).
2. The real upstream-track is reka-ui's own semver; the binding sweep (memory) is the maintenance
   ritual on a reka bump.
3. Correct `baseColor` to a warm value (or document it as scaffold-only) so a future `add` does not
   inject a slate-gray component into the warm system.
4. Record this verdict ONCE in the new docs/canon set (replacing the implicit CLAUDE.md knowledge),
   so a future agent does not "helpfully" run `shadcn-vue update` and blow away the glass diff.

---

## 3. BUILD / EXPORT PIPELINE

### 3.1 The three config files
- `vite.config.ts` (72L) — the single build config. Vite 8 / Rolldown. Library build via
  `build.lib.entry = libraryEntries(__dirname)`, `formats: ["es"]`, `rolldownOptions.external =
  libraryExternal`, + a `manualChunks(id)` that the comment claims is "inert in the library build"
  (FALSE for lucide — see §3.3). Plugins: tailwindcss(), vue(), publishStyleAssets().
- `vite.library.ts` (74L) — the entry map + filename + external list. Two-tier entry map (§3.2).
- `vite.style-assets.ts` (566L) — a GOD MODULE (>500L). The post-build CSS/font publish Plugin:
  `publishStyleAssets()` orchestrates `emitComponentUtilities` (safelist glass-ui's own utility
  RULES via `@source inline(...)` so a bare consumer gets `rounded-panel` &c.), the SFC-CSS fold
  into `dist/glass-ui.css`, the `@source` backstop rewrite, and `emitCriticalDeferredSplit` (the
  BC.W-CSS-CRITICAL `./styles/critical` + `./styles/deferred` partition). **BH: split this into
  cohesive sub-plugins** (style-fold / utility-emit / critical-split) — it is the clearest
  >500-line build god-module.

### 3.2 How per-subpath chunks are emitted (the mirror-dir machinery)
`libraryEntries(rootDir)` returns a `Record<name, absPath>`:
- **Tier 1 — 11 CURATED multi-line barrels** hand-listed at `src/` top level: `index`, `api`,
  `tokens`, `forms`, `dark`, `keyboard`, `carousel`, `motion`, `motion-core`, `sidebar`,
  `infinite-scroll`. These carry real curation (SCC-trap closure, vueuse/keyframes splits).
- **Tier 2 — 79 TRIVIAL mirror barrels** globbed from `src/subpaths/*.ts`. Each is ONE line:
  `export * from "../components/custom/aurora"` / `"../components/ui/badge"` / `"../composables/..."`.
  `readdirSync(subpathsDir)` maps each `<name>.ts` → an entry keyed by NAME.
- `libraryFileName`: `index` → `glass-ui.js`, else `<name>.js`.
- `package.json` `exports` has **96 keys**; `typesVersions["*"]` mirrors the dts. A built
  `dist/<name>.js` is keyed by entry NAME, so the source location is irrelevant to the export map.

**The mirror dir exists purely to give Rolldown 79 named entry points.** It is a pure
indirection: `src/subpaths/aurora.ts` → `src/components/custom/aurora/index.ts`.

### 3.3 BUILD BUG — dead externals + lucide bundling (CRITICAL)
`libraryExternal` (vite.library.ts:60-74):
```js
export const libraryExternal = [
  "vue", "reka-ui", "@vueuse/core", "@mkbabb/keyframes.js", "@mkbabb/value.js",
  "@mkbabb/pencil-boil", "class-variance-authority", "clsx", "embla-carousel-vue",
  "lucide-vue-next",   // ← DEAD: renamed to @lucide/vue at v1.0; src has 0 refs
  "vaul-vue",          // ← DEAD: abrogated at BB.W-DRAWER-ABROGATE; src has 0 runtime imports
];
```
- `@lucide/vue` (the LIVE icon peer, 39 src files) is **NOT in the external list** → it gets
  BUNDLED. Confirmed in dist: `dist/createLucideIcon-DydS2qgk.js` + `dist/vendor-B2qOlYY3.js`
  carry lucide. The `manualChunks` `vendor` catch-all (which the comment calls "inert") sweeps
  lucide into a vendor chunk — so glass-ui SHIPS its own copy of lucide, and a consumer
  double-loads it. **This contradicts the "every peer is external" claim in vite.config.ts:57-60.**
- `lucide-vue-next` + `vaul-vue` are dead strings externalizing packages that no longer exist in
  the graph (no-op but misleading).
- **BH fix (1 line):** delete the two dead strings, add `@lucide/vue`. Add `perfect-freehand`
  (peer, optional — pencil-boil's transitive geometry peer) if it can leak in. Then a build-size
  gate (profile:budget) re-baselines downward.

### 3.4 Emit the IDENTICAL surface with NO mirror dir (design, coordinate w/ lane γ)
Goal: kill `src/subpaths/` while emitting the same `dist/<name>.js` set. Three approaches:

**Option A (RECOMMENDED) — glob the colocated barrels directly.** Replace tier-2 with a glob over
the component/composable dirs that have an `index.ts`:
```js
// pseudo
for (const dir of [...glob("src/components/ui/*/index.ts"),
                   ...glob("src/components/custom/*/index.ts"),
                   ...glob("src/composables/*/index.ts")]) {
  const name = basename(dirname(dir));            // "aurora", "badge", ...
  if (curated[name] || EXCLUDE.has(name)) continue;
  batched[name] = dir;                            // entry → the dir's OWN index.ts
}
```
The subpath NAME == the dir name in 78/79 cases (verify the 1 mismatch: `/pager` ←
`pager-dots`, `/canvas` ← a composable, `/focus-scope`, `/color-swatch` etc. — a small explicit
RENAME_MAP covers the handful where subpath-name ≠ dir-name). The colocated `index.ts` IS the
barrel the mirror just re-exported, so chunk content is byte-identical. **This deletes the entire
`src/subpaths/` dir AND the tier-1/tier-2 split** (tier-1 curated barrels become an explicit
override map; the rest are globbed).

**Option B — keep an explicit entry map, no glob, no mirror.** A single hand-maintained
`src/entries.ts` `Record<name, path>` pointing each subpath at its colocated `index.ts`. Loses the
"new subpath auto-enrolls" ergonomic (the reason subpaths/ was globbed) — re-introduces the hand-add
the mirror avoided. Not recommended given precept DRY.

**Option C — Rolldown `advancedChunks` instead of N entry points.** Vite 8/Rolldown can force chunk
isolation via `output.advancedChunks` (groups). But CLAUDE.md + the Rolldown docs warn:
**`advancedChunks` and `manualChunks` are mutually exclusive — Rolldown IGNORES `manualChunks` if
both are set.** And the published `exports` map needs real entry points (one `dist/<name>.js` per
subpath) for tree-shakable subpath imports, which `advancedChunks` grouping does not give cleanly.
Stay on N entry points (Option A).

**Coordination w/ lane γ:** lane γ owns the src/ colocation moves (components+composables+constants
into dirs). Option A's glob DEPENDS on every published surface having a colocated `index.ts` barrel
in its dir — that is exactly what γ's colocation produces. So **γ's colocation is the prerequisite;
ζ's entry-glob consumes it.** Sequence: γ colocation lands → ζ swaps the entry map to the glob →
delete `src/subpaths/`. The export-surface gate (proof:subpath-enumeration / verify-export-types)
re-baselines to prove the dist `<name>.js` set is unchanged (the 5.0.0 reshape intentionally
CHANGES some names — fold that into the gate's new baseline, not a regression).

### 3.5 src/api fold (5.0.0)
`src/api/index.ts` is **505L (a >500 god-module)** — the types/constants discovery layer (96
exports per CLAUDE.md prose, "72 JS subpath exports"). The 5.0.0 reshape folds it into typed
per-subpath surfaces (each subpath ships its own types). `src/index.ts` is 292L (the curated
vueuse-free root barrel). BH: the `/api` discovery layer dies; each subpath's `index.ts` becomes the
typed surface. proof:subpath-enumeration + the api-publication clauses in many gates re-home.

---

## 4. CLAUDE.md DELETION — gate impact

`grep -l CLAUDE.md scripts/*.mjs` → **29 scripts mention it**; of those **17 READ it as input**
(readFileSync), and ~15 of THOSE assert canon-text presence ("CLAUDE.md records X"). The mention-
only ones cite the path in a `note`/error string and are unaffected.

### Gates that PARSE CLAUDE.md (must RE-HOME or RETIRE):
| gate | what it asserts on CLAUDE.md | BH disposition |
|---|---|---|
| **proof:claude-structure-sync** (192L) | §Structure `custom/` enumeration ≡ `ls src/components/custom/` (set-equality both directions + declared count) | **RE-HOME** onto a generated/checked component-index doc (docs/canon or a per-dir README roll-up). The disk-truth assert is valuable; its DOC HOME moves. |
| **proof:doc-override-idiom** (242L) | the Consumer-wiring CSS example (override the `--glass-blur-resting-radius` PRIMITIVE, not the composite) is byte-identical in CLAUDE.md AND README.md, value matches live glass.css | **RE-HOME** onto README.md alone (the example already lives there); drop the CLAUDE.md copy + the parity clause. The live-glass.css-value clause STAYS (re-pointed to README). |
| proof:doc-consistency | cross-doc canon consistency incl. CLAUDE.md | RE-HOME onto the new doc set or RETIRE. |
| proof:accent-tone, proof:on-glass-fg, proof:surface-axis, proof:spa-view, proof:split-chars, proof:easing-primitive, proof:expandable-part, proof:dropdown-fix, proof:dock-unify, proof:dock-rail-realize, proof:close-battery-parity | each asserts "the canon/contract is RECORDED in CLAUDE.md" (a doc-presence clause, usually 1 clause of a multi-clause gate) | **RE-POINT** the doc-presence clause at the new modular home (per-component README or docs/canon), OR DROP the clause if the contract moves to a README the component-README gate already checks. The SOURCE/π clauses of these gates are unaffected. |

### Net:
- 2 gates are PRIMARILY CLAUDE.md-parsers (structure-sync, doc-override-idiom) → re-home/retire whole.
- ~13 gates have a SINGLE doc-presence clause citing CLAUDE.md → re-point that clause; keep the gate.
- The redistribution (per CLAUDE.md prose, the live contracts go to per-component READMEs + a
  docs/canon set + the precepts submodule) gives those clauses a NEW home to assert against. **No
  live contract is lost IFF the re-home lands before the CLAUDE.md delete** (the user's fail-explicit
  rule). Sequence: redistribute docs → re-point the ~15 gate clauses → delete CLAUDE.md → run the
  manifest-soundness gate to prove no gate still reads the deleted file.
- `proof:gate-manifest-sound` clause-10 + `proof:claude-structure-sync` themselves must be cleared
  from any "must mention CLAUDE.md" assumption.

---

## 5. SCRIPT SPRAWL — the numbers

| metric | value |
|---|---|
| total npm scripts | **384** |
| `proof:*` keys | **361** (357 single-script, 4 composites/runners) |
| GATES manifest rows (gates.mjs) | **349** |
| scripts/ files total | **440** (.mjs: 384) |
| `proof-*.mjs` files | **343** |
| scripts >500 lines (god scripts) | **68** |
| total proof-script LOC | ~121,558 (avg ~354L/script) |
| largest gate scripts | gates.mjs 2489 · proof-animation-coherence 1284 · proof-no-layout-animation 934 · proof-motion-one-clock 879 · proof-dock-animation-live 853 · profile-bundle 806 |
| **scripts that define their OWN comment-strip fn** | **164** (zero import a shared strip helper) |
| scripts importing the shared output harness `gate-output.mjs` | **325** |
| shared lib imports | gate-output.mjs (325) · constellation.mjs (63) · read-css-monoliths.mjs (50) · read-dock-css.mjs (11) · reflect-capture-verify.mjs (3) |

**The good news:** there IS a spine — `scripts/lib/` (critical-path-walk, paint-arm, surface-closure)
+ `gate-output.mjs` (a shared output/artifact harness, 325 consumers) + `constellation.mjs` (ROOT +
sibling resolution) + `read-css-monoliths.mjs` (CSS reader, 50 consumers). So the OUTPUT and some
READERS are factored.

**The bad news (the DRY violation):** the DETECTION logic is not. **164 of 343 proof scripts each
hand-roll their own comment-strip function**, and the dominant house pattern ("the comment-strip +
pure-detector") is copy-pasted ~164×. Each gate re-reads a source file, strips comments its own way,
runs a bespoke regex census, and emits via the shared harness. The "pure-detector with injected-IO"
architecture (cited in the az/ba-final notes) is sound IN PRINCIPLE but UN-FACTORED in practice.

---

## 6. THE GATE SYSTEM AS A PIPELINE / SERVICE-BOUNDARY PROBLEM

### 6.1 Is gates.mjs a god-runner? YES — but a thin one structurally, fat by prose.
gates.mjs is 2489L. Structure:
- Lines 62-~2190: the `GATES` array — **349 inline rows**. The DATA (`{id, cmd, tags, sibling,
  env, note}`) is ~5 lines; the `note` is a 5-30 line prose paragraph (the wave's whole rationale).
  ~80% of the file is `note` strings. This is a 349-row CONFIG TABLE inlined as code.
- Lines 2196-2489: the actual RUNNER — `gatesFor(mode)` (filters by tag; `full` = deduped union of
  local∪ci∪release), `runMode(mode)` (sequential `execSync('npm run <cmd>')`, exit-1 on first
  fail), `runPi()` (the Playwright spec-runner mode), `verifyCi()` (ci.yml ↔ manifest drift check),
  `renderCiYaml()`. The runner is ~300L and clean.

So gates.mjs is NOT a logic god-module; it is a **data-as-code god-module**. The orchestration core
(`gatesFor` + `runMode`) is ~40 lines and correct.

### 6.2 The aggregation is already good — the manifest design is the WIN to keep.
The 3-aggregates-over-one-manifest model (proof:all→`--run local`, release.sh→`--run release`,
ci.yml verified by `--verify-ci`, close→`--run full`) is exactly the right pipeline shape: ONE
source of truth, tag-filtered views, drift-checked. `gatesFor("full")` = deduped union. This is the
correct orchestration and should be PRESERVED. The problem is not the runner; it is (a) the inline
prose, (b) the 357 separate proof scripts, (c) the 164× duplicated detection boilerplate.

### 6.3 Could most collapse to a few entry points?
- **Aggregation is already collapsed** — a human runs 4 entry points (`--run local|ci|release|full`
  + `--run pi`). The 361 `proof:*` package.json keys exist because each gate is its own `node
  scripts/proof-X.mjs` invocation, addressable for the bite-test ("run just this gate").
- The 361 keys are NOT a runner sprawl (the runner is 5 modes); they are a SCRIPT sprawl (357
  separate files). Collapsing them is a SERVICE-BOUNDARY refactor, not a runner change.

### 6.4 Dead/duplicate scripts
- `proof:gate-manifest-sound` clause-10 already enforces "every package.json `proof:*` key resolves
  to a gatesFor() row OR the COMPOSITE_OR_RUNNER allowlist" — so there are NO orphan keys at HEAD
  (361 keys ≈ 349 rows + 4 composites + ~8 allowlisted composites/runners). The system self-polices
  orphans. **Dead-script hunting in BH = retire the gates whose WAVE is closed + whose contract
  moved**, not orphan keys.
- The CLAUDE.md-coupled gates (§4) are the clearest retire/re-home candidates.
- Many gates are single-wave guards (proof:dock-no-scale-pop, proof:dock-tap-integrity, ...) that
  guard a now-stable contract. The user's "excise legacy/workaround" directive + the >=2-consumer
  precept suggest a **gate-census band**: each gate must guard a LIVE contract with a falsifiable
  bite, or retire. 349 gates is itself an overfitting smell (one gate per wave-note).

### 6.5 The cleaner gate-service architecture (concrete)
The system wants three boundaries (DI/pipeline framing):

1. **A shared DETECTOR KIT (`scripts/lib/detect/`)** — factor the 164× comment-strip + the recurring
   census primitives (read-source, strip-comments-by-lang, grep-with-context, css-token-census,
   sfc-class-census, byte-parity) into ONE injectable kit. Each gate becomes
   `defineGate({ id, read, assert })` where `read` is IO (injected, mockable for the bite-test) and
   `assert` is a pure predicate. This is the "pure-detector with injected-IO" the gates CLAIM but do
   not share. Kills the 164 duplications; makes every gate's bite-test a unit test of `assert`.
2. **A DATA manifest (`scripts/gates.manifest.mjs` or `.json`)** — move the 349-row table + its
   prose `note`s OUT of gates.mjs into a data file. gates.mjs shrinks to the ~300L runner. The notes
   (wave rationale) belong in the wave's FINAL.md / the gate's own header, not the runner — extract
   them. A row becomes `{id, cmd, tags, sibling?, env?}` + a `note` reference, not an inline essay.
3. **A thin ORCHESTRATOR (`gates.mjs`)** — keeps `gatesFor`/`runMode`/`runPi`/`verifyCi`. Imports
   the manifest data + the detector kit. This IS a clean pipeline: manifest (config) → tag-filter
   (selection) → sequential-run (execution) → output-harness (reporting). The DI is "inject the IO
   reader into each detector"; the service boundary is detector-kit / manifest / orchestrator.

**Caveat:** this is a LARGE refactor (touches 343 scripts). For BH, the high-ROI subset is:
- (a) extract the 349-row table + notes out of gates.mjs into a data file (mechanical, big LOC win,
  zero behavior change);
- (b) factor the comment-strip + the top-5 census primitives into `scripts/lib/detect/` and migrate
  the 164 duplicators incrementally (each migration is a behavior-preserving swap, gated by the
  gate's own bite-test);
- (c) the gate-census retire band (§6.4) — retire/re-home the CLAUDE.md gates + closed-wave guards.

---

## 7. BG COLLISION AVOIDANCE (this lane's bands are LOW-collision)

BG (docs/tranches/BG/PLAN.md, 154L) write-set is heavily src/ + demo/ + styles/:
- WS1 shell/routing/field · WS2 dock convergence (33→24 files, src/components/custom/dock) · WS3
  glass standardization (src/styles glass/blur/tint) · WS4 components/demo/encapsulation (>500
  splits, colocation, motion-primitive dedup) · WS5 viz · WS6 siri · WS7 quality/close.

**Lane ζ's bands are almost entirely ORTHOGONAL to BG's paint/component work:**
| ζ band | files touched | BG collision |
|---|---|---|
| Dep currency (lucide-external fix, value.js straddle) | package.json, vite.library.ts | **NONE** — BG does not touch build config or deps. Run anytime. |
| Export reshape (kill src/subpaths, entry-glob) | vite.library.ts, src/subpaths/* (delete), package.json exports | **MEDIUM** — depends on lane γ's colocation (which overlaps BG WS4's colocation). Sequence AFTER BG WS4 closes (WS4 IS the colocation work) to avoid double-moving component dirs. |
| CLAUDE.md delete + gate re-home | CLAUDE.md (delete), scripts/proof-*.mjs (re-point clauses), new docs/ | **LOW** — BG WS7 has a `proof:ba-gestalt` born-RED + fold-ledger but does not edit CLAUDE.md or the doc-parsing gates. Coordinate so BG's WS7 close does not assert against CLAUDE.md (check BG's close gates first). Docs/precepts/gate bands run truly concurrent. |
| Script sprawl (extract manifest, detector-kit, gate census) | scripts/gates.mjs, scripts/proof-*.mjs, scripts/lib/ | **LOW-MEDIUM** — BG ADDS gates (WS7 proof:ba-gestalt, scroll gates) + has 2 dirty files at HEAD (scripts/lib/critical-path-walk.mjs, scripts/proof-ba-gestalt.mjs modified; scripts/lib/surface-closure.mjs, scripts/proof-de-shadcn.mjs untracked). The manifest-extract + detector-kit must MERGE with BG's new gate rows — do the extract AFTER BG's gate additions stabilize, or design the manifest data-file so new rows append cleanly. The detector-kit migration is per-script + bite-gated, so it interleaves safely. |

**Protocol:** Dep-currency + the lucide fix run FIRST (zero collision, immediate payload win).
Export-reshape sequences after BG WS4 (colocation). CLAUDE.md-delete + gate-rehome run concurrent
with BG but must verify BG's close gates do not re-read CLAUDE.md. Script-sprawl manifest-extract
waits for BG's gate-row additions to land (or uses an append-safe data-file).

---

## 8. CONCRETE MOVES (BH wave seeds for Lane ζ)

1. **ζ-W-LUCIDE-EXTERNAL** (1-line, run first): vite.library.ts `libraryExternal` — drop dead
   `lucide-vue-next` + `vaul-vue`, add `@lucide/vue` (+ `perfect-freehand` if it leaks). Re-baseline
   profile:budget downward; prove `dist/` no longer carries `createLucideIcon-*`/lucide-in-vendor.
   EVIDENCE: dist-grep + bundle-size delta.
2. **ζ-W-DEP-STRADDLE**: value.js `^0.13.0 || ^1.0.0` → `^1.0.0`; by-name-ask siblings. reka peer
   floor raise (optional) + the 18-SFC binding e2e sweep on bump.
3. **ζ-W-ENTRY-GLOB** (after lane γ colocation / BG WS4): replace `src/subpaths/` + the tier-2 glob
   with a colocated-`index.ts` glob (§3.4 Option A) + a small RENAME_MAP for the ~handful of
   name≠dir cases + a curated-override map. Delete `src/subpaths/` (79 files). EVIDENCE:
   verify-export-types + the dist `<name>.js` set diff (intentional 5.0.0 renames folded into the
   new baseline, not a regression).
4. **ζ-W-API-FOLD** (5.0.0): fold `src/api/index.ts` (505L god) into typed per-subpath surfaces;
   re-home the api-publication gate clauses.
5. **ζ-W-STYLE-ASSETS-SPLIT**: split vite.style-assets.ts (566L god) into style-fold / utility-emit /
   critical-split sub-plugins.
6. **ζ-W-CLAUDEMD-GATE-REHOME** (after doc redistribution): re-home proof:claude-structure-sync +
   proof:doc-override-idiom + re-point the ~13 doc-presence clauses onto the new modular doc homes;
   then the CLAUDE.md delete is safe. EVIDENCE: no scripts/*.mjs readFileSync CLAUDE.md post-delete.
7. **ζ-W-GATE-MANIFEST-EXTRACT** (after BG gate-rows stabilize): move the 349-row table + prose
   notes out of gates.mjs into `scripts/gates.manifest.mjs`; gates.mjs → ~300L runner. Behavior-
   preserving. EVIDENCE: `--list local/ci/release/full` byte-identical pre/post.
8. **ζ-W-DETECTOR-KIT**: factor comment-strip + top-5 census primitives into `scripts/lib/detect/`;
   migrate the 164 duplicators incrementally (each bite-gated). DRY win.
9. **ζ-W-GATE-CENSUS**: retire/re-home gates whose wave is closed + contract moved (the CLAUDE.md
   gates + closed-wave guards); apply the >=2-live-contract bar. 349 gates is an overfitting smell.

---

## 9. RISKS / OPEN QUESTIONS
- The lucide-external fix CHANGES the published payload — a consumer that (incorrectly) relied on
  glass-ui bundling lucide would break, but per peer-dep contract they must install `@lucide/vue`
  themselves; this is a correctness fix, not a break to preserve. Verify the peer is declared
  (it is: peerDeps `@lucide/vue ^1.16.0`).
- Entry-glob (Option A) needs the exact subpath-name↔dir-name mismatch set enumerated before the
  swap (e.g. `/pager`←`pager-dots`, `/forms` is curated, `/motion-core`). Low-risk but must be exact
  or a subpath silently disappears from the export map.
- The 5.0.0 reshape INTENTIONALLY renames exports — the export-enumeration gate must adopt the new
  baseline, not flag it as regression. The migration-map (for slides/speedtest by-name asks) is the
  artifact that records every rename.
- Script-sprawl refactor is large; the detector-kit migration must be bite-gated per script (each
  gate's own bite-test proves the swap preserved detection) or it risks silently de-fanging gates.
- BG has 4 dirty/untracked scripts files at HEAD — the manifest-extract must rebase onto BG's
  finished gate set, not the HEAD snapshot.
