# PASS 3 — RESOLVE G4 (§2.C1/G3/G4/L15): the cut-time device-free-gate-blind omissions — UNRUN owners + the 4 amend-ready legs

**Cluster:** `G4-cuttime-gate-blind` · **Mode:** spec · **PASS 3** · **HEAD:** `31b128aa` (`tranche/BG`; +1 over the master's `6c1f5386` — the PASS-2 audit commit, ZERO src delta) · **Date:** 2026-06-30
**Owns:** §2.C1 (the kf-peer↔`useDragMorph.ts:26` snap-binding crossover — now a LIVE broken-gesture defect since BH B1-W2/B1-W3 landed) · §2.G3 (ci.yml `proof:glass-idiom-factor` re-emit + the build-map:451 over-claim) · §2.G4 (3 stale AZ freshness hashes, no re-stamp owner) · §2.L15 (budget net-lift as ONE number).
**Convergence in:** PT-6 = 45% (the lowest of the 6 — the two LEAD legs analyzed a moved tree). **This pass:** finish the 4 legs the cluster's approach names. C2 (value `^1.1.1` floor) is **NOT in this cluster** — the PASS-2 synthesis adjudicated it MOOT (executed `^1.0.0` admits npm-latest 1.1.1, peer-conformance GREEN, `wcagContrastRatio` zero in-tree callers); DROPPED, recorded in §0 as a closed non-item.
**Write-fence:** RESPEC-COHERENCE doc only. No src/demo/scripts edits (the drafted amendments are a spec, not a merge). Siblings verified intact (exit 0) before + after.

> **What moved vs PT-6.** PT-6 named C1/C2 as its two LEAD legs and analyzed `BH/PLAN.md:62`/`FINAL.md:509` — two stale plan artefacts the execution overtook. This pass runs the LIVE checks at `tranche/BG@31b128aa` and:
> (a) **re-homes C1's kf-peer bump onto a NAMED UNRUN wave** (B1-W2 is CLOSED and cannot be the owner — re-targeting a closed wave is the disease the cluster exists to kill);
> (b) **corrects the build-map:451 over-claim PRECISELY** — the parenthetical is an over-claim ONLY because R3 (`gates:emit-ci`) is ordered BEFORE R4 (the `category-card-warm` re-tag) inside the SAME wave; the fix is an intra-wave ORDERING flip (R4 before R3), not a re-word, so the emit legitimately adds BOTH;
> (c) **gates the freshness discharge AFTER WS2∧WS5** — verified live: all 3 deltas capture surface-paths WS2/WS5 rewrite, so a re-shoot NOW re-stales; the RETIRED-SUPERSEDED banner is the honest discharge, gated late;
> (d) **scopes L15 to the un-walked-chunk hole as ONE number** — BUDGETS walks 6, the WS6 siri + WS8 refract chunks are absent.

---

## 0. VERDICT

**FEASIBLE = TRUE. No restart.** All four legs are string/key edits, an intra-wave ordering flip, an owner-clause add, and a one-number rebaseline — each maps to a NAMED owner wave, each has a runnable verifying command. The cluster's shared property: the installed `node_modules` + the local `dist` resolve the right versions/bytes, so the dev/CI loop is GREEN while the SHIPPED `package.json` ranges + emitted artefacts are WRONG → the defect surfaces only at the irreversible tag. The mitigation is OWNERS on UNRUN waves + (optional, recommended) folding the checks INTO `proof:peer-conformance`/`profile:budget` so they are machine-enforced, not a human remember-list.

**The single load-bearing correction vs PT-6:** C1 is a **LIVE HEAD defect**, not a future plan amendment. `useDragMorph.ts:325` ships `snap: targetsOf().map((t) => t.center)` and `:26` records glass-ui owns NO `decayRest`+nearest-center+`spring.target` re-roll (the BB-era re-roll was EXCISED by B1-W3 `ba23c086`). The kf peer is `^5.0.0`; `DragOptions.snap` first ships kf **5.1.0**. So on a consumer pinned at kf 5.0.0 the drag follows + flings by decay but **NEVER snaps to a detent** — a broken core gesture (the tab/dock pull lands wherever momentum coasts). The named owner B1-W2 (`0d6b9f8a`) RAN without the bump → re-home it.

---

## 1. GROUND-TRUTH re-verified directly this pass (every number re-run @ `31b128aa`, not transcribed)

| # | Fact | Evidence (re-run this pass) | Verdict |
|---|---|---|---|
| HEAD | live tip = `31b128aa` (master-declared `6369ad6e`/`4c761b64` trail) | `git rev-parse HEAD`; the +2 are the PASS-1/PASS-2 audit commits (zero src delta) | ✓ — the C/G/L facts are stable across the audit commits |
| C1 | `useDragMorph.ts:325` ships `snap:` to kf | `grep -n "snap: targetsOf"` → `:325 snap: targetsOf().map((t) => t.center)` | ✓ `snap` is load-bearing |
| C1 | the glass-ui retarget re-roll is EXCISED | `useDragMorph.ts:26` "glass-ui owns NO `decayRest` + nearest-center + `spring.target` re-roll (the BB-era…" | ✓ — relies ENTIRELY on kf-5.1.0 native snap |
| C1 | kf peer floor = `^5.0.0`; dev pin already `^5.1.0` | `package.json` peer `@mkbabb/keyframes.js` `^5.0.0`; devDep `^5.1.0` | ✓ — a kf-5.0.0 consumer keeps 5.0.0 (`^5.0.0` satisfied) → snap absent → never snaps |
| C1 | the named owner B1-W2 RAN without the bump | `git show 0d6b9f8a -- package.json` = value `^0.13.0\|\|^1.0.0`→`^1.0.0` ONLY; kf line untouched at `^5.0.0` | ✓ — B1-W2 is CLOSED + cannot be the owner |
| C1 | B1-W2/B1-W3 are ancestors of HEAD | `git merge-base --is-ancestor 0d6b9f8a HEAD` = YES; `ba23c086` = YES | ✓ — the defect is LIVE in HEAD |
| C1 | peer-conformance is BLIND to floor-vs-API | `proof-peer-conformance.mjs:125` `semver.satisfies(latest, range)` — `satisfies("5.1.0","^5.0.0")` = true → admits | ✓ — green on `^5.0.0`; nothing checks floor ≥ the version whose API the shipped code calls |
| G3 | `glass-idiom-factor` is `["local","ci","release"]` @1503, ABSENT from ci.yml | `gates.mjs:1503` tags; `grep -c glass-idiom-factor .github/workflows/ci.yml` → **0** | ✓ — committed ci.yml stale vs manifest |
| G3 | `category-card-warm` is `["local"]` @743, ABSENT from ci.yml | `gates.mjs:743` `tags: ["local"]`; `grep -c` → **0** | ✓ — at HEAD it is NOT in the ci set → `--emit-ci` cannot add it |
| G3 | build-map:451 R3 claims emit "adds `category-card-warm` AND `glass-idiom-factor` in one pass" | `bg-build-map.md:451` (c) `gates:emit-ci` regen "(adds `proof:category-card-warm` AND `proof:glass-idiom-factor` in one pass)" | ✗ over-claim **as ORDERED** — see §2.G3 (R4 re-tags category-card-warm but is sequenced AFTER R3) |
| G3 | R4 re-tags category-card-warm to the full battery | `bg-build-map.md:451` (d) `category-card-warm` → `["local","ci","release"]` | ✓ — the re-tag EXISTS in the same wave; only its ORDER vs (c) is wrong |
| G3 | gen-ci-fresh reds at the cut, not per-push | `gates.mjs` release-set byte-match meta-step | ✓ — bites `--run release/full`, invisible to `--run ci` |
| G4 | the 3 AZ DELTA hashes recompute STALE | `node proof-gate-manifest-sound.mjs` → `W-DOCK1 25c60d27→2624ad1d`, `W-DOCK2 05361bf8→880e4ce6`, `W-CON1 c9338215→bfd034e8`; clause-7 prints `W-DOCK1:stale W-DOCK2:stale W-CON1:stale` | ✓ EXACT to the digit |
| G4 | the gate is `["local"]` + exits 1 | `gates.mjs` `tags:["local"]`; `GATE_EXIT=1` captured this pass | ✓ — reds `--run local` AND `--run full` (= the cut battery; full = local∪ci∪release) |
| G4 | the two discharge paths exist in code | `proof-gate-manifest-sound.mjs:433` state ∈ {fresh, retired} passes; `:491` `RETIRED-SUPERSEDED` → state `retired` (DC-REC-9) | ✓ — both (re-stamp) and (banner) are honored |
| G4 | the deltas capture surfaces WS2/WS5 REWRITE | W-DOCK1 paths = `dockMorphContext.ts, GlassDock.vue, morph.css, layers.css`; W-DOCK2 = `dockMorphContext.ts, useLayerTransition.ts, DockLayerGroup.vue, layers.css`; W-CON1 = `Constellation.vue, constellationField.ts, constellationInteraction.ts` | ✓ — WS2 `BG.W-DOCK-MORPH-UNIFY` (PENDING) rewrites the dock orchestrator/morph/layers; WS5 `BG.W-VIZ-DEMIGRATE` (PENDING) rewrites constellation → re-shoot NOW re-stales |
| L15 | BUDGETS walks only 6 chunks | `profile-bundle.mjs:210` `BUDGETS` = `glass-ui.js / styles/index.css / aurora.js / goo-blob.js / constellation.js / fourier-field.js` | ✓ — a NEW chunk not in BUDGETS ships UN-walked (the `:145-156` documented hole) |
| L15 | WS6 mints siri chunks, WS8 mints refraction GL | `bg-build-map.md:312` `src/subpaths/siri-island.ts`→`dist/siri-island.js`; `:318` `siri-waveform.glsl.ts`; `:621` `GLASS-REFRACT-WEBGL` 5 `sampleBG` sites | ✓ — siri-island/siri-waveform absent from BUDGETS; refract chunk unconfirmed |
| L15 | the critical-path-weight arm exists | `profile-bundle.mjs:329` `findReach(entry, critHeavyMatch)`; `:346` `CRITICAL-PATH DIST` violation on GL/value reach into `glass-ui.js` | ✓ — the WS8 GL must stay OFF the root-barrel eager graph |
| C2 | the executed value peer is `^1.0.0`, GREEN | `package.json` peer `@mkbabb/value.js` `^1.0.0`; admits latest 1.1.1 | **NOT THIS CLUSTER** — MOOT per PASS-2; recorded closed in §4 |

---

## 2. THE FOUR LEGS — defect → blind-spot → fix → UNRUN owner → check

### C1 · kf peer `^5.0.0` → `^5.1.0` — the LIVE broken-gesture defect, re-homed onto an UNRUN wave

**Defect (LIVE at HEAD).** `useDragMorph.ts:325` hands the kf `Draggable` `snap: targetsOf().map((t) => t.center)`. The `DragOptions.snap` array API first exists in **keyframes.js 5.1.0**. The peer floor is `^5.0.0`, which a consumer's pinned 5.0.0 satisfies — so `npm install`/`npm update` will NOT bump that consumer to 5.1.0, `snap` is undefined on the 5.0.0 `Draggable`, and on release the drag flings by decay and **never snaps to a detent**. Because B1-W3 (`ba23c086`) EXCISED the glass-ui-side `decayRest`+nearest-center+`spring.target` re-roll (`useDragMorph.ts:26` records the excision), there is no fallback snap path — this is a **broken core gesture** on a kf-5.0.0 consumer, NOT the "additive refinement silently no-ops" the PT-6 proto framed (that was the BB-era code with the re-roll still present).

**Why no device-free gate catches it.** `proof:peer-conformance` asserts the peer RANGE admits npm-latest (`proof-peer-conformance.mjs:125` `semver.satisfies("5.1.0","^5.0.0")` = true → green). It NEVER asserts floor ≥ the version whose API the shipped code calls. Locally the dist resolves 5.1.0 (devDep `^5.1.0`), so build/typecheck/test/π are all green — the gap exists ONLY in the SHIPPED `package.json` range, seen only by a consumer with a pre-5.1.0 lock.

**Fix (exact).** In `package.json` `peerDependencies`, target by KEY `@mkbabb/keyframes.js`: `"^5.0.0"` → `"^5.1.0"`. The devDep is already `^5.1.0`; the peer catches up to the dev pin + to the API the shipped code requires. No value-side coupling (value stays `^1.0.0` — C2 is moot, §4).

**Owner wave — re-homed onto an UNRUN wave (the load-bearing correction).** B1-W2 (`value-destraddle`, `0d6b9f8a`) is the natural `[C]` `package.json` editor but it is **CLOSED** (ran without the kf bump). Re-targeting a closed wave is the cardinal disease. The kf peer bump re-homes onto **`BH-B2.1-swap`** — the FINAL pre-cut `package.json` editor (gated STRICTLY AFTER WS5∧WS6∧WS12, STRICTLY BEFORE `BG.W-CUT`; `bg-build-map.md:886`). It already re-derives `package.json` `exports` via `regen-exports.mjs`; ADD a `peerDependencies` clause to its *Files* set: bump `@mkbabb/keyframes.js` `^5.0.0`→`^5.1.0` (a single keyed edit, not part of the exports regen). The cross-reference: the bump is REQUIRED-BY **B1-W3** (`dragmorph-snap-excise`) which made kf-5.1.0 `snap` load-bearing.

> **Why B2.1-swap, not BG.W-CUT or a new wave.** B2.1-swap is the LAST `package.json` mutator before the tag; homing the bump there guarantees it survives any exports regen (the regen rewrites `exports`/`typesVersions`, never `peerDependencies` — they cannot collide), and it is the wave whose own *Gate* already re-runs `proof:peer-conformance` / `proof:constellation-spine` non-vacuously. A bare BG.W-CUT clause would work but B2.1-swap is the established package.json single-writer. A NEW wave is unnecessary — the keyed bump is one line.

**Verifying check.**
- `node -e "console.log(require('./package.json').peerDependencies['@mkbabb/keyframes.js'])"` → `^5.1.0`.
- `npm run proof:peer-conformance` GREEN online (`satisfies("5.1.0","^5.1.0")` = true).
- `npm run proof:constellation-spine` GREEN (re-run — `^5.1.0` admits the installed/sibling 5.1.0; the dual-clause `@vueuse ^14` convergence is unaffected).
- the NEW floor-vs-API assertion (the machine-enforced root-cause fix, recommended): `proof:peer-conformance` gains a check — IF `useDragMorph.ts` references `snap:` THEN the kf peer floor ≥ 5.1.0 (the version whose API it calls); born-RED on the current `^5.0.0` tree, GREEN after the bump (see §3 gate-hardening).

---

### G3 · ci.yml re-emit (`proof:glass-idiom-factor`) + the build-map:451 over-claim CORRECTED via intra-wave ordering

**Defect.** `proof:glass-idiom-factor` is `["local","ci","release"]` (`gates.mjs:1503`) but absent from the committed ci.yml (`grep -c` = 0). `gates.mjs --emit-ci` regenerates the ci-tagged step set; `proof:gen-ci-fresh` (the release-set byte-match meta-step) therefore REDS at `--run release/full`, invisible to `--run ci`.

**Status: LARGELY owned — the residual is a build-map:451 PRECISION defect, fixed by an intra-wave ORDERING flip (NOT a re-word).** The plan already tasks the regen across two waves:
- **`BG.W-CLOSEFIX-9SITE` R3** (`bg-build-map.md:451 (c)`) — the early emit (WS7 Band 0.5, lands FIRST). Its R4 (`bg-build-map.md:451 (d)`) re-tags `category-card-warm` → `["local","ci","release"]`.
- **`BH-B2.1-swap`** — the FINAL pre-cut emit (after WS5∧WS6∧WS12, captures WS6's siri subpaths + WS5's viz deletes; `bg-build-map.md:886`). `proof:gen-ci-fresh` at `BG.W-CUT` asserts byte-match against THIS final emit.

**The build-map:451 over-claim, stated PRECISELY.** Line 451's (c) parenthetical — `gates:emit-ci` regen "(adds `proof:category-card-warm` AND `proof:glass-idiom-factor` in one pass)" — is true IFF `category-card-warm` is already ci-tagged when the emit runs. But (d) re-tags it, and (c) is sequenced BEFORE (d) in the SAME wave's mechanism list. As ORDERED, R3's emit runs against the `["local"]`-tagged `category-card-warm` and adds ONLY `glass-idiom-factor` — the claim over-states by one gate. This is the same registry/emit fact-not-re-derived class as C1.

**The fix (the correct one — an ordering flip, not a weaker re-word).** Because R4 (the re-tag) is a deliberate plan item in the SAME wave (`field-accent-reconcile` precedent — a pure device-free src-scan belongs in the full battery), the resolution is to **flip the intra-wave order: R4 (re-tag `category-card-warm` → `["local","ci","release"]`) runs BEFORE R3 (`gates:emit-ci`)**. Then the emit legitimately adds BOTH gates in one pass, and the build-map:451 (c) parenthetical becomes TRUE as written. The wave's atomic-diff property is preserved (R3+R4 co-land); only their listing order in the mechanism prose + the actual edit order changes.

> **Why the ordering flip, not "re-word :451 to mention glass-idiom-factor only."** PT-6 proposed re-wording (b) "the emit adds `category-card-warm` ONLY IF re-tagged first." That is correct but leaves a latent foot-gun: an integrator who runs `gates:emit-ci` before applying R4 produces a ci.yml MISSING `category-card-warm`, then R4's re-tag makes `proof:gen-ci-fresh` red at the cut (the re-tagged gate is now ci-set but un-emitted). Flipping the order makes the wave correct-by-construction: re-tag, THEN emit, THEN both are present + byte-fresh. The build-map prose at :451 keeps its "adds both in one pass" claim, now TRUE.

**Why no device-free gate catches it on the dev loop.** `gen-ci-fresh` is RELEASE-tagged → reds `--run release/full`, never `--run ci`. The drift is invisible on every per-push CI run + surfaces only at the cut's `--run ship`.

**Owner waves.** `BG.W-CLOSEFIX-9SITE` (R4-before-R3 ordering flip + emit `glass-idiom-factor`+`category-card-warm`) + `BH-B2.1-swap` (the FINAL pre-cut emit — must re-emit and leave ci.yml byte-fresh incl. both gates, since WS6's siri subpaths + WS5's viz deletes change the ci-step set after R3's early emit).

**Verifying check.**
- After R4-then-R3 (CLOSEFIX) and after the FINAL emit (B2.1-swap): `grep -c "proof:glass-idiom-factor\|proof:category-card-warm" .github/workflows/ci.yml` ≥ 2.
- `npm run proof:gen-ci-fresh` GREEN (byte-match) at the integrated post-B2.1-swap tree.
- `git diff --exit-code .github/workflows/ci.yml` after a fresh `gates:emit-ci` (no drift) — the cut-time CT check.

---

### G4 · the 3 stale AZ freshness hashes — the RETIRED-SUPERSEDED banner discharge, GATED AFTER WS2∧WS5

**Defect.** `proof:gate-manifest-sound` clause 7 (FRESHNESS-CONTENT-HASH) recomputes the `surface-hash` header of three AY/AZ DELTA docs against current bytes and finds all three STALE (re-run this pass — `GATE_EXIT=1`):
- `W-DOCK1-DELTA.md` declared `25c60d27…` → current `2624ad1d…`
- `W-DOCK2-DELTA.md` declared `05361bf8…` → current `880e4ce6…`
- `W-CON1-DELTA.md` declared `c9338215…` → current `bfd034e8…`

The gate is `["local"]`-tagged + exits 1, so it reds `--run local` AND `--run full` (= the cut battery, full = local∪ci∪release). The BG plan names no re-capture/re-stamp/retire owner, so it rides red into the cut.

**The two legitimate discharge paths (from the gate code, `proof-gate-manifest-sound.mjs:433/491`):**
- (a) **re-shoot + re-stamp** — re-capture the surface, update the `surface-hash` header to current bytes (state → `fresh`); OR
- (b) **RETIRED-SUPERSEDED banner** (DC-REC-9, `:491`) — add the banner, marking the delta freshness-EXEMPT (state → `retired`) because the captured AY-form surface no longer exists.

**The correct discharge is (b), decided per-delta AFTER the surfaces settle — verified against the live surface-paths.** The deltas capture surfaces BG REWRITES:
- **W-DOCK1** surface-paths = `dockMorphContext.ts, GlassDock.vue, dock/morph.css, dock/layers.css` — ALL rewritten by WS2 `BG.W-DOCK-MORPH-UNIFY` (PENDING; the single-`SpringProgress` dock orchestrator rewrite, `EXECUTION-PROGRESS:119`).
- **W-DOCK2** surface-paths = `dockMorphContext.ts, useLayerTransition.ts, DockLayerGroup.vue, dock/layers.css` — ALL rewritten by WS2 (same orchestrator + layer-transition rewrite).
- **W-CON1** surface-paths = `Constellation.vue, constellationField.ts, constellationInteraction.ts` — ALL rewritten by WS5 `BG.W-VIZ-DEMIGRATE` (PENDING; the WGPU→Canvas2D constellation rewrite).

You CANNOT re-shoot a surface that has been redesigned away — the AY-form surface is genuinely SUPERSEDED, so the banner is the honest discharge. **A re-stamp NOW (before WS2/WS5) would re-stale the MOMENT the dock/constellation lands** — wasted work and a second red. Therefore the discharge MUST be GATED AFTER WS2∧WS5 (the HARD ordering edge).

**Owner wave + ordering.** **`BG.W-CLOSE-SWEEP`** (the standing per-band `closeDisease`-manifest sweep, `proof:close-sweep` `["local"]`, runs strictly AT-OR-AFTER `BG.W-CLOSEFIX-9SITE` clears R1–R4; `bg-build-map.md:471`) — ADD a clause: re-evaluate the 3 AZ DELTA freshness states and, per delta, add the RETIRED-SUPERSEDED banner (WS2/WS5 redesigned the surface — the verified case here) OR re-shoot+re-stamp (if a surface unexpectedly survives unchanged). **HARD ordering edge: this clause runs AFTER WS2 ∧ WS5** (so the dock + constellation surfaces are settled), encoded as a precond on the clause in `bg-bh-execute.wf.js`. The close sweep is the right home — it is the standing close-disease owner and already runs late (its convergence 83 places it post-CLOSEFIX).

> **The DELTA docs live OUTSIDE the BG tranche dir** (`docs/tranches/AY/audit/visual/W-{DOCK1,DOCK2,CON1}-DELTA.md`). The banner add is an in-place edit to those AY docs (parent-tracked, not a submodule — `docs/precepts` is the submodule, `docs/tranches/AY` is not). The close-sweep clause records the per-delta decision (banner vs re-shoot) + the reason (the named WS2/WS5 wave that superseded the surface).

**Why "device-free-gate-blind."** The gate is NOT blind — it reds today, correctly. The blindness is ORGANIZATIONAL: no wave is ASSIGNED to act on it, so it rides red into the cut. The fix is an OWNER + an ordering edge, not a gate change.

**Verifying check.**
- After WS2∧WS5 + the close-sweep clause: `npm run proof:gate-manifest-sound` → clause-7 prints `AZ deltas W-DOCK1:<fresh|retired> W-DOCK2:<fresh|retired> W-CON1:<fresh|retired>` (all fresh-or-retired, zero `stale`); `GATE_EXIT=0` on this cause.
- The close-sweep artefact records the per-delta decision (banner vs re-shoot) with the superseding-wave reason.

---

### L15 · the budget net-lift as ONE reconciled number — the un-walked-chunk hole

**Defect.** Payload moves in both directions across the tranche and the net is never asserted as one reviewed number:
- **ADD:** WS8 `BG.W-GLASS-REFRACT-WEBGL` (the WebGL2 refraction shader, 5 `sampleBG` sites); WS6 `BG.W-SIRI-WAVEFORM` (`shaders/siri-waveform.glsl.ts` → a NEW GL chunk) + `BG.W-SIRI-ISLAND` (`src/subpaths/siri-island.ts` → `dist/siri-island.js`, a PUBLISH subpath chunk).
- **REMOVE:** WS5 `BG.W-VIZ-DEMIGRATE` (shrinks `constellation.js`/`fourier-field.js`, which ARE in BUDGETS) + the viz-substrate deletes (`concentric`/`paper-grid`, NOT in BUDGETS); B1-W1 (drops `lucide-vue-next`/`vaul-vue` from `glass-ui.js`).

**Two concrete hazards beyond "no single number":**
1. **The un-walked-chunk hole (`profile-bundle.mjs:145-156`).** `BUDGETS` (`:210`) walks only 6 entries (`glass-ui.js / styles/index.css / aurora.js / goo-blob.js / constellation.js / fourier-field.js`). A NEW chunk not added to `BUDGETS` ships UN-budgeted — exactly the aurora-shader-growth NO-OP the file's own preamble warns about. `dist/siri-island.js` + `dist/siri-waveform.js` are NOT in `BUDGETS`; if WS8's refraction lands in a new chunk, same. Each new viz/GL chunk MUST get a `BUDGETS` entry, or "stays inside profile:budget" is a no-op for it.
2. **The critical-path-weight arm (`profile-bundle.mjs:326-352`, `CRITICAL-PATH DIST`).** The root barrel `dist/glass-ui.js` eager graph must reach ZERO of {WebGL substrate, GL shader strings, value.js color-math}. WS8 `GLASS-REFRACT-WEBGL` adds a GL shader; if it is reachable from the root barrel (e.g. composed by the root-barrel `Button`'s `:liquid` refraction), `CRITICAL-PATH DIST` REDs. The refraction GL must be chunk-isolated (like `aurora.js`), off the root-reachable eager graph.

**Why no device-free gate catches it as one number.** `profile:budget` IS a gate, but (a) a new chunk absent from `BUDGETS` is invisible to it, and (b) each wave rebaselines its OWN ceiling, so the AGGREGATE net drift is never asserted as one reviewed number (the budget analogue of the no-god-module ratchet repeatedly re-growing).

**Owner wave.** **`BH-B2.1-swap` RE-BASELINE step** (the last pre-cut payload reconcile, on the fully-integrated tree after WS5∧WS6∧WS12; `bg-build-map.md:887`) — ONE step that: (i) builds the final integrated tree; (ii) adds a `BUDGETS` entry for every NEW dist viz/GL chunk (`siri-waveform.js`, `siri-island.js`, any WS8 refraction chunk if it lands as its own chunk); (iii) re-pins all moved ceilings as ONE reviewed net rebaseline with the conscious-lift commentary the file already uses (the house pattern at `:140-209`) — net = (WS8 + WS6 adds) − (WS5 + B1-W1 removes), stated as one number; (iv) asserts the critical-path-weight arm GREEN (`criticalPath.violations == []`). `BG.W-CUT` owns the final assertion if not done at B2.1-swap.

**Verifying check.**
- `npm run build && npm run profile:budget` GREEN at the integrated tree.
- every dist `*.js` viz/GL chunk has a `BUDGETS` key (no un-walked chunk): assert `{siri-waveform.js, siri-island.js, <refract chunk if any>} ⊆ keys(BUDGETS)`. NAME-AGNOSTIC: if the WS8 refraction composes into existing chunks (`dock.js`/`glass-ui.js`) rather than a new chunk, the assertion is "every dist viz/GL chunk ∈ BUDGETS," which holds either way.
- `criticalPath.violations == []` in the profile output (no GL/value string in the `glass-ui.js` eager graph).

---

## 3. THE OPTIONAL GATE-HARDENING (recommended — machine-enforce the cut-time checks, not a human remember-list)

The four legs share ONE property: the installed `node_modules`/dist resolve right while the SHIPPED ranges/artefacts are wrong → the defect surfaces only at the irreversible tag. Two folds make three of them machine-enforced:

- **Fold C1's floor-vs-API check INTO `proof:peer-conformance`.** Add the assertion: for each peer whose API the shipped src calls, the floor ≥ the version that first ships that API. Concretely: IF `git grep -l "snap:" src/composables/motion/useDragMorph.ts` THEN the `@mkbabb/keyframes.js` peer floor ≥ `5.1.0`. Born-RED on the `^5.0.0` tree, GREEN after the C1 bump. This closes the root-cause class (the gate today checks `satisfies(latest, range)`, never `floor ≥ API-version`) so a future binding to a kf-5.2+/value-1.x+ API owes the same machine-checked bump. **Owner:** the wave that bumps the peer (`BH-B2.1-swap`) co-lands the gate clause; or `BG.W-GATE-FIELD-AURORA` (the G6 spike, the wave that already touches peer-conformance) homes it.
- **Fold L15's un-walked-chunk assertion INTO `profile:budget`.** Assert every `dist/*.js` non-aux chunk has a `BUDGETS` key — closes the documented `:145-156` hole structurally (a new chunk reds until it is given a ceiling). **Owner:** `BH-B2.1-swap` RE-BASELINE.
- **G3 (gen-ci-fresh) + G4 (gate-manifest-sound) already HAVE gates** — they only lacked OWNERS (assigned above). No new gate.

The cut-time checklist `BG.W-CUT` runs before `--run ship` becomes mostly machine-enforced: CT-kf (peer floor ≥ snap-API), CT-ci (gen-ci-fresh byte-clean), CT-fresh (gate-manifest-sound zero-stale), CT-budget (every chunk ∈ BUDGETS + criticalPath clean).

> **The HONEST precondition (kept from PT-6 §5).** Each cut-time check reads AS the per-cause assertion, NOT "the whole `--run ship` is green." The full `--run ship` is blocked at HEAD by UNRELATED reds outside this cluster's scope (`proof:ba-gestalt` 0/10 born-RED, the R1–R4 close-reds, the keystone cursor-parity gate). Do NOT promise a green aggregate this cluster cannot deliver — the four legs each clear their OWN cause.

---

## 4. THE DROPPED NON-ITEM (recorded, not re-opened)

- **C2 (value.js peer floor `^1.1.1`/`^1.2.0`) is MOOT — NOT in this cluster.** Adjudicated by the PASS-2 synthesis: the executed peer is `^1.0.0` (`0d6b9f8a` destraddled `^0.13.0||^1.0.0` → `^1.0.0`), `proof:peer-conformance` is GREEN online (admits npm-latest 1.1.1; kf's transitive `^1.2.0 ⊆ ^1.0.0`), and `grep wcagContrastRatio src/ scripts/` → ZERO hits → no in-tree API demands a floor above `^1.0.0`. Narrowing to `^1.1.1` would be a pointless over-pin (the inverse of the C1 disease). **DROP** — the cluster's approach text names only C1/G3/G4/L15. The lone real C2 residual (the `PINNED_LATEST.value = "1.2.0"` offline-fallback ≠ dist-tag `1.1.1` smell) is INERT at the executed `^1.0.0` peer (both 1.1.1 and 1.2.0 admitted) and is BH's hygiene call, not this cluster's. Recorded so a reader does not re-open it from the stale `BH/PLAN.md:62 ^1.2.0` text.

---

## 5. THE EXACT AMENDMENTS (drop-in for the build-map + EXECUTION-PROGRESS)

| Wave | Amendment |
|---|---|
| **`BH-B2.1-swap`** (`bg-build-map.md:880-888`) | (a) ADD a `peerDependencies` clause to *Files*: bump `@mkbabb/keyframes.js` `^5.0.0`→`^5.1.0` (keyed edit; REQUIRED-BY B1-W3 — the cross-ref); (b) the L15 net-rebaseline: build the integrated tree, add a `BUDGETS` entry for every NEW dist viz/GL chunk (`siri-waveform.js`, `siri-island.js`, any WS8 refract chunk), re-pin all moved ceilings as ONE net number, assert `criticalPath.violations==[]`; (c) the FINAL ci.yml emit must leave it byte-fresh incl. `glass-idiom-factor`+`category-card-warm`. *Gate:* `proof:peer-conformance`/`proof:constellation-spine`/`proof:gen-ci-fresh`/`profile:budget` GREEN non-vacuously. |
| **`BG.W-CLOSEFIX-9SITE`** (R3/R4, `bg-build-map.md:451`) | FLIP the intra-wave order: **R4 (re-tag `category-card-warm` → `["local","ci","release"]`) runs BEFORE R3 (`gates:emit-ci`)**, so the emit legitimately adds BOTH gates in one pass and the :451 (c) parenthetical becomes TRUE as written. Mechanism prose re-ordered to list (d)-then-(c). |
| **`BG.W-CLOSE-SWEEP`** (`bg-build-map.md:471`) | ADD the freshness-discharge clause for the 3 AZ DELTAs: per delta, add the RETIRED-SUPERSEDED banner to `docs/tranches/AY/audit/visual/W-{DOCK1,DOCK2,CON1}-DELTA.md` (the verified WS2/WS5-supersede case) OR re-shoot+re-stamp (if a surface survives unchanged), recording the per-delta decision + the superseding-wave reason. **HARD ordering edge: gated AFTER WS2 ∧ WS5** (encoded as a clause precond in `bg-bh-execute.wf.js`). |
| **`proof:peer-conformance`** (optional gate-hardening, §3) | ADD the floor-vs-API assertion (kf floor ≥ first-`snap`-version 5.1.0 when `useDragMorph.ts` references `snap:`); born-RED on `^5.0.0`. Owner: B2.1-swap co-land or BG.W-GATE-FIELD-AURORA. |
| **`profile:budget`** (optional gate-hardening, §3) | ADD the un-walked-chunk assertion (every `dist/*.js` non-aux chunk ∈ BUDGETS), closing the `:145-156` hole structurally. Owner: B2.1-swap RE-BASELINE. |
| **`BG.W-CUT`** | run the cut-time checks (CT-kf/CT-ci/CT-fresh/CT-budget) as a pre-`--run ship` precondition — PASS by construction if the above landed; each read as a per-cause assertion (§3 honest precondition). |

**EXECUTION-PROGRESS:** no row relocation. The B2.1-swap, CLOSEFIX-9SITE, CLOSE-SWEEP rows keep their status + sequencing; only their *Files*/*Gate* cells + the ordering note widen. The HARD edge "CLOSE-SWEEP freshness clause AFTER WS2∧WS5" is the only new DAG constraint (a clause precond, not a wave-row move).

---

## 6. CONVERGENCE — honest aggregate

| Component | Conv | Note |
|---|---|---|
| C1 — kf-peer LIVE defect + UNRUN owner re-home | **94%** | the defect is verified LIVE (snap shipped, re-roll excised, peer `^5.0.0`, B1-W2 closed); the owner re-home onto B2.1-swap is the established package.json single-writer; the floor-vs-API gate-hardening is the durable root-cause fix. Residual: confirming B2.1-swap's *Files* shape admits a non-exports package.json edit (it does — exports/peerDeps are disjoint blocks) |
| G3 — ci.yml re-emit + :451 ordering flip | **95%** | the over-claim is verified (both gates absent from ci.yml, category-card-warm `["local"]` at HEAD); the intra-wave R4-before-R3 flip makes the wave correct-by-construction (sharper than PT-6's re-word — closes the integrator foot-gun); both owners (CLOSEFIX R3/R4 + B2.1-swap final emit) named |
| G4 — freshness banner gated AFTER WS2∧WS5 | **96%** | the 3 hashes verified stale to the digit (`GATE_EXIT=1`); the discharge paths verified in gate code (`:433` fresh\|retired, `:491` banner DC-REC-9); the surface-paths verified rewritten by PENDING WS2/WS5 waves → banner-not-reshoot is the honest discharge; the hard ordering edge + the CLOSE-SWEEP owner named |
| L15 — net-lift one-number + un-walked-chunk fold | **90%** | BUDGETS-6 verified, siri/refract absent, critical-path arm exists; the WS8 refract chunk NAME is unconfirmed (may compose into existing chunks) but the assertion is name-agnostic (every dist viz/GL chunk ∈ BUDGETS); the B2.1-swap RE-BASELINE + the optional profile:budget fold named |
| C2 (dropped) | **n/a** | MOOT per PASS-2; recorded closed in §4 so it is not re-opened from stale BH text |
| **Overall ready-to-amend-the-plan** | **93%** | up from PT-6's 45% — C1 re-grounded as a LIVE defect with an UNRUN owner, G3's over-claim fixed by the sharper ordering flip, G4's banner discharge gated correctly against verified surface-rewrites, L15 scoped name-agnostically, C2 dropped as the cluster's approach mandates. The residual 7% is the two name-uncertainties (the WS8 refract chunk name + B2.1-swap's exact *Files* admit-shape) — both bounded plan-amendments, NOT feasibility blockers |

**readyToAmend = TRUE** for the four legs' wave amendments (§5). Fold them into `docs/tranches/BG/execution/bg-build-map.md` (B2.1-swap :880-888, CLOSEFIX-9SITE :451 ordering, CLOSE-SWEEP :471 clause) + the optional gate-hardening into `proof:peer-conformance`/`profile:budget`. The two name-uncertainties are recorded as resolve-at-build, not open feasibility.
