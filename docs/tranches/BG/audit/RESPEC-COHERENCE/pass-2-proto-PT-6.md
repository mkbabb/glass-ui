# PT-6 — Cut-time correctness checklist for the device-free-gate-blind omissions (CORRECTED-APPROACH SPEC)

**Pass:** 1 · **Mode:** spec (corrected-approach; every claim re-verified directly against source + the live npm registry this pass, not transcribed from the synthesis) · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `6c1f5386`
**Targets:** §2.C1 (kf peer `^5.0.0`→`^5.1.0` snap crossover) · §2.C2 (value floor `^1.2.0` vs `^1.1.1`) · §2.G3 (ci.yml `proof:glass-idiom-factor` re-emit) · §2.G4 (3 stale AZ freshness hashes, no re-stamp owner) · §2.L15 (budget net-lift as one number). All MED severity, but the consequence lands at the **irreversible tag** — none is caught by a device-free gate run on the dev/CI loop, and the installed `node_modules` resolves the right versions locally so build/test/π are all green while the SHIPPED `package.json` ranges + emitted artefacts are wrong.
**Feasible:** YES. Every fix is a string/key edit or a single reconciled build-and-rebaseline step; each maps to an existing owner wave; each has a runnable verifying command. The corrections are the project's own already-decided answers (FINAL.md §1.4) that simply have not propagated to the BH side + the cut.

---

## 0 · Ground-truth re-verified directly against source this pass

| # | Fact | Evidence (re-run / re-read this pass) | Verdict |
|---|---|---|---|
| C1 | The shipped `useDragMorph` hands kf the native `snap` array | `src/composables/motion/useDragMorph.ts:325` `snap: targetsOf().map((t) => t.center)`; header `:20` "kf 5.1.0 `DragOptions.snap`" | `snap` first ships kf **5.1.0** |
| C1 | kf PEER is `^5.0.0`, dev pin already `^5.1.0` | `package.json:1078` peer `^5.0.0`; `:1116` devDep `^5.1.0` | a consumer pinned at kf 5.0.0 keeps 5.0.0 (`^5.0.0` satisfied) → `snap` silently no-ops |
| C1 | peer-conformance is BLIND to the floor-vs-API gap | `proof-peer-conformance.mjs:124-131` checks only `semver.satisfies(latest, range)` — `satisfies("5.1.0","^5.0.0")` = **true** → admits | the gate is green on `^5.0.0`; nothing checks floor ≥ the API version the shipped code calls |
| C2 | value.js `latest` dist-tag = **1.1.1** (1.2.0 published but NOT latest) | `npm view @mkbabb/value.js version` → `1.1.1`; `versions` list ends `…1.1.0, 1.1.1, 1.2.0` | a `^1.2.0` peer EXCLUDES the dist-tag latest 1.1.1 |
| C2 | `^1.2.0` reds peer-conformance's admits-latest ONLINE | `satisfies("1.1.1","^1.2.0")` = **false** → `proof-peer-conformance.mjs:129-133` pushes a violation | the floor BH plans REDS the release gate |
| C2 | BH B1-W2 still specs `^1.2.0`; the line/block refs are also stale | `docs/tranches/BH/PLAN.md:62` `…→ ^1.2.0`; SYNTHESIS-PASS2/3 + P3-REPORT all `^1.2.0`; refs "`:1058` (deps) + `:1096` (peerDeps)" | **wrong floor AND wrong location** (see C2-detail) |
| C2 | BG ALREADY corrected to `^1.1.1` (not propagated to BH) | `FINAL.md:509-512` "value.js peer floor `^1.1.1`, NOT `^1.2.0` … `^1.1.1` admits latest AND keyframes' `^1.2.0 ⊆ ^1.1.1`. (Reconcile the 5 stale `^1.2.0` strings in the G6 spike: gate:23,25,50,58 + leaf:346,348.)" | the answer exists; BH + the G6 spike carry the stale literal |
| C2 | the gate's OFFLINE fallback diverges from the dist-tag | `proof-peer-conformance.mjs:39-41` `PINNED_LATEST = { "@mkbabb/value.js": "1.2.0" }` vs live dist-tag 1.1.1 | a network-less CI runner FALSE-GREENS `^1.2.0` (latent offline blind spot) |
| G3 | `proof:glass-idiom-factor` is ci-tagged but ABSENT from ci.yml | `gates.mjs:1503` `tags: ["local","ci","release"]`; `grep -c glass-idiom-factor .github/workflows/ci.yml` → **0** | committed ci.yml is stale vs the manifest |
| G3 | `--emit-ci` adds EXACTLY `proof:glass-idiom-factor` (proven) | ran `gates.mjs --emit-ci` → `git diff ci.yml` = `+ name: proof:glass-idiom-factor / + run: npm run proof:glass-idiom-factor` ONLY (reverted clean after) | the re-emit is a 1-gate delta |
| G3 | gen-ci-fresh reds at the cut, not per-push | `gates.mjs:1599-1602` release-set byte-match meta-step | the drift bites `--run release/full`, invisible to `--run ci` |
| G3 | build-map's R3 claim is HALF-WRONG | `bg-build-map.md:451` "R3 … adds `proof:category-card-warm` AND `proof:glass-idiom-factor`"; but `category-card-warm` `tags:["local"]` (`gates.mjs` reg) → NOT in the ci set → `--emit-ci` does **not** add it (diff confirms) | emit adds only glass-idiom-factor |
| G4 | 3 AZ DELTA surface-hashes recompute STALE | ran `proof:gate-manifest-sound` → `[FRESHNESS-CONTENT-HASH] W-DOCK1/W-DOCK2/W-CON1 …recomputes stale (declared → current) — re-capture` | clause-7 RED on all three |
| G4 | the gate is `["local"]` + exits 1 on FAIL | `gates.mjs:1607` `tags:["local"]`; `node …gate-manifest-sound.mjs >/dev/null; echo $?` → **1** | reds `--run local` AND `--run full` (= the cut battery; full = local∪ci∪release) — no re-stamp owner in the plan |
| L15 | BUDGETS walks only 6 chunks | `profile-bundle.mjs:210-229` `glass-ui.js / styles/index.css / aurora.js / goo-blob.js / constellation.js / fourier-field.js` | a NEW chunk not in BUDGETS ships UN-walked (the documented `:145-156` hole) |
| L15 | WS6 mints a NEW GL chunk + a new subpath | `bg-build-map.md:316-319` SIRI-WAVEFORM `shaders/siri-waveform.glsl.ts` → `dist/siri-waveform.js`; `:312` SIRI-ISLAND `src/subpaths/siri-island.ts` → `dist/siri-island.js` | both absent from BUDGETS |
| L15 | adds (WS8 refract + WS6 siri) vs removes (WS5 viz-demigrate/delete + B1-W1 lucide/vaul) | `bg-build-map.md:272-273,289,621`; `BH/PLAN.md:61` | net never reconciled as one reviewed number |

---

## 1 · The five legs — defect → blind-spot → fix → owner → check

### C1 · kf peer `^5.0.0` → `^5.1.0`

**Defect.** `useDragMorph.ts:325` ships `snap:` to the kf `Draggable`. The `DragOptions.snap` array API first exists in **keyframes.js 5.1.0**. The peer floor is `^5.0.0`, which is satisfied by a consumer's pinned 5.0.0 — so `npm install`/`npm update` will NOT bump that consumer to 5.1.0, and the snap call silently no-ops (the C¹ fling still works via `reset`+`decayRest`+`spring.target`, so there is no error — exactly the binding-silent-no-op class MEMORY `glass_ui_binding_verification` records).

**Why no device-free gate catches it.** `proof:peer-conformance` only asserts the peer RANGE admits npm-latest (`satisfies("5.1.0","^5.0.0")` = true → green). It never asserts the floor ≥ the version whose API the shipped code calls. Locally the dist resolves 5.1.0 (devDep `^5.1.0`), so build/typecheck/test/π are all green — the gap exists only in the SHIPPED `package.json` range, seen only by a consumer with a pre-5.1.0 lock.

**Fix (exact).** In `package.json` `peerDependencies` (currently line 1078, target by KEY `@mkbabb/keyframes.js`): `"^5.0.0"` → `"^5.1.0"`. The devDep (line 1116) is already `^5.1.0`; the peer simply catches up to the dev pin and to the API the shipped code requires. No value-side coupling.

**Owner wave.** **BH.B1-W2** (`value-destraddle`) is the `package.json` `[C]` editor — fold the kf peer bump beside the value floor edit in the same `[C]` commit, with a cross-reference that the bump is REQUIRED BY **B1-W3** (`dragmorph-snap-excise`, the wave that made the 5.1.0 `snap` binding load-bearing). B1-W3 today carries no `package.json` clause; B1-W2 currently edits only value — so the kf peer bump is presently OWNERLESS. Assign it to B1-W2.

**Verifying check.**
- `node -e "const p=require('./package.json');console.log(p.peerDependencies['@mkbabb/keyframes.js'])"` → `^5.1.0`.
- `npm run proof:peer-conformance` GREEN online (`satisfies("5.1.0","^5.1.0")` = true).
- `npm run proof:constellation-spine` GREEN (re-run — `^5.1.0` admits the installed/sibling 5.1.0; lane-zeta recorded "peer `^5.0.0` … OK", so re-confirm after the bump).
- Negative: the floor ≥ first-snap-version assertion — `useDragMorph.ts` references `snap:` AND the kf peer floor ≥ 5.1.0 (a future binding to a kf-5.2+ API would owe the same bump; see §2 checklist item C1).

---

### C2 · value.js peer floor `^1.1.1` (NOT `^1.2.0`) — three stale surfaces

**Defect.** BH B1-W2 (`PLAN.md:62`, all three SYNTHESIS passes, P3-REPORT) sets the value peer → `^1.2.0`, reasoning "keyframes 5.1.0 transitively deps value `^1.2.0`; installed singleton 1.2.0." That conflates the **installed singleton** (1.2.0, pulled TRANSITIVELY via kf's `^1.2.0` dep) with the **`latest` dist-tag** (1.1.1). The peer must admit BOTH the direct-latest a consumer gets from `npm i @mkbabb/value.js` (1.1.1) AND kf's transitive want (`^1.2.0`). `^1.1.1` does both (`1.1.1 ∈ ^1.1.1`; `^1.2.0 ⊆ ^1.1.1`); `^1.2.0` excludes 1.1.1 and REDS peer-conformance's admits-latest clause online. BG already decided `^1.1.1` (FINAL.md §1.4 #1); the BH side + the G6 spike were never reconciled.

**Three stale surfaces to fix (all → `^1.1.1`):**
1. **The package.json peer** — BH B1-W2's target floor `^1.2.0` → `^1.1.1`.
2. **B1-W2's location refs are ALSO stale.** It says "`package.json:1058` (deps) + `:1096` (peerDeps)" and describes a `^0.13.0 || ^1.0.0` straddle. On disk: there is NO `dependencies` block (kf/value are PEER-ONLY — CLAUDE.md "all runtime deps are peer"); the value peer is at line **1080** (not 1096), and already reads `^1.0.0` (the `^0.13.0` straddle is already gone). So B1-W2 must target by KEY `peerDependencies."@mkbabb/value.js"` (and `devDependencies."@mkbabb/value.js"` at line 1118 for dev/peer-floor coherence), re-deriving line numbers at execution. The wave's "deps + peerDeps two-site" framing is a single-site (peer-only) edit.
3. **The G6 spike's 5 stale strings** (FINAL.md §1.4 #1, verbatim): `BG.W-GATE-FIELD-AURORA` carries `^1.2.0` at gate `:23,25,50,58` + leaf `:346,348` → reconcile to `^1.1.1`. (`wcagContrastRatio` first shipped in value.js 1.1.1 = the floor; that is why `^1.1.1` is the genuine minimum, not an arbitrary down-pin.)

**Why the catch is partial.** `proof:peer-conformance` WOULD red `^1.2.0` ONLINE — but its OFFLINE fallback `PINNED_LATEST["@mkbabb/value.js"] = "1.2.0"` (proof-peer-conformance.mjs:41) diverges from the live dist-tag (1.1.1), so a network-less CI runner FALSE-GREENS `^1.2.0`. The online release path catches it; the offline path is blind. **Secondary fix (coupled hygiene):** correct `PINNED_LATEST["@mkbabb/value.js"]` `"1.2.0"` → `"1.1.1"` so the offline fallback mirrors the dist-tag and the offline path enforces the same answer. (`PINNED_KEYFRAMES_VALUE_DEP = "^1.2.0"` at line 46 is CORRECT — that is kf's transitive value dep, not the latest; leave it.)

**Owner waves.** BH.B1-W2 (the package.json peer + dev floor) + BG.W-GATE-FIELD-AURORA (the G6 spike's 5 strings) + optionally proof:peer-conformance (the PINNED offline fallback) — the last is a one-line gate hygiene edit, naturally folded into whichever wave touches peer-conformance (G6 already does).

**Verifying check.**
- `npm run proof:peer-conformance` GREEN online (admits 1.1.1; `^1.2.0 ⊆ ^1.1.1` subset holds; no destraddle violation — `^1.1.1` floors ≥ 1.0.0, does not admit 0.13.0).
- `grep -rn '\^1\.2\.0' package.json scripts/proof-field-aurora*.mjs <G6-leaf>` → no value.js `^1.2.0` literal survives (the G6 spike + package.json).
- offline parity: run peer-conformance with the network blocked (or assert `PINNED_LATEST.value === "1.1.1"`) → still green on `^1.1.1`, red on a synthetic `^1.2.0`.

---

### G3 · ci.yml re-emit (`proof:glass-idiom-factor`)

**Defect.** `proof:glass-idiom-factor` is `["local","ci","release"]` (gates.mjs:1503) but absent from the committed ci.yml. `gates.mjs --emit-ci` adds exactly the two lines `name: proof:glass-idiom-factor / run: npm run proof:glass-idiom-factor` (proven by diff this pass, reverted clean). `proof:gen-ci-fresh` (release-set byte-match, gates.mjs:1599) therefore REDS at `--run release/full`.

**Status: LARGELY already owned — two residual coherence defects.** The build-map already tasks **BG.W-CLOSEFIX-9SITE R3** (`bg-build-map.md:451`) with `gates:emit-ci`. So G3 is mostly closed by the plan. The residuals:
1. **The build-map over-claims.** `:451` says R3's emit "adds `proof:category-card-warm` AND `proof:glass-idiom-factor`." The emit adds ONLY `glass-idiom-factor` — `category-card-warm` is `["local"]`-tagged, so it is NOT in the ci set and `--emit-ci` does not add it (diff confirms). FIX: either (a) re-word `:451` to "adds `proof:glass-idiom-factor` (and `proof:category-card-warm` ONLY IF it is first re-tagged to include `ci`)", or (b) if category-card-warm is intended in CI, add a `ci` tag to it in the SAME wave before the emit. The blind-tag mismatch is the same class as C1/C2 (a registry/emit fact no one re-derived).
2. **The ci.yml is emitted TWICE; the LAST emit governs the cut.** CLOSEFIX-9SITE R3 emits early (WS7 Band 0.5); **BH-B2.1-swap** re-emits late (after WS5∧WS6∧WS12 — it must, to capture WS6's siri subpaths + WS5's viz deletes; `bg-build-map.md:886`). Both must include glass-idiom-factor; `proof:gen-ci-fresh` at `BG.W-CUT` asserts byte-match against the FINAL (BH-B2.1-swap) emit. The checklist item is "the LAST pre-cut emit is fresh," not "CLOSEFIX R3 ran."

**Why no device-free gate catches it on the dev loop.** gen-ci-fresh is RELEASE-tagged → it reds `--run release/full`, never `--run ci`. So the drift is invisible on every per-push CI run and surfaces only at the cut's `--run ship`.

**Owner waves.** BG.W-CLOSEFIX-9SITE R3 (early emit + the `:451` re-word) + BH-B2.1-swap (final pre-cut emit). The category-card-warm tag question is tag-parity-adjacent — flag to that owner, do not silently smuggle a `ci` tag.

**Verifying check.**
- After the FINAL emit: `grep -c glass-idiom-factor .github/workflows/ci.yml` ≥ 1.
- `npm run proof:gen-ci-fresh` GREEN (byte-match) — at the integrated post-BH-B2.1-swap tree.
- `git diff --exit-code .github/workflows/ci.yml` after a fresh `gates:emit-ci` (no drift).

---

### G4 · the 3 stale AZ freshness hashes — assign a re-stamp/retire owner

**Defect.** `proof:gate-manifest-sound` clause 7 (FRESHNESS-CONTENT-HASH) recomputes the `surface-hash` header of three AY/AZ DELTA docs against current bytes and finds all three STALE (verified this pass):
- `W-DOCK1-DELTA.md` declared `25c60d27…` → current `2624ad1d…`
- `W-DOCK2-DELTA.md` declared `05361bf8…` → current `880e4ce6…`
- `W-CON1-DELTA.md` declared `c9338215…` → current `bfd034e8…`

The gate is `["local"]`-tagged and exits 1 on FAIL, so it reds `--run local` AND `--run full` (= the cut battery, since full = local∪ci∪release). The BG plan names no re-capture/re-stamp/retire owner, so it rides red into the cut.

**The two legitimate discharge paths (from the gate code, `proof-gate-manifest-sound.mjs:488-509`):**
- (a) **re-shoot + re-stamp** — re-capture the surface and update the `surface-hash` header to the current bytes (state → `fresh`); OR
- (b) **RETIRED-SUPERSEDED banner** — add the banner (DC-REC-9), which marks the delta freshness-EXEMPT (state → `retired`) because "the captured AY-form surface no longer exists."

**The correct discharge here is (b), decided per-delta AFTER the surfaces settle.** W-DOCK1/W-DOCK2 capture an AY dock surface that BG REDESIGNS (WS2 `BG.W-DOCK-MORPH-UNIFY` + the dock-convergence); W-CON1 captures a constellation surface BG REWRITES (WS5 `BG.W-VIZ-DEMIGRATE`, WGPU→Canvas2D). You cannot re-shoot a surface that has been redesigned away — the AY-form surface is genuinely SUPERSEDED, so the banner is the honest discharge. A re-stamp NOW (before WS2/WS5) would go stale AGAIN the moment the dock/constellation lands — wasted work and a second red.

**Owner wave + ordering.** **BG.W-CLOSE-SWEEP** (G3 close sweep, `proof:close-sweep`, runs AT-OR-AFTER CLOSEFIX clears R1-R4) — add a clause: re-evaluate the 3 AZ DELTA freshness states and, per delta, either add the RETIRED-SUPERSEDED banner (if WS2/WS5 redesigned the surface) or re-shoot+re-stamp (if the surface survives unchanged). **HARD ordering edge: this clause must run AFTER WS2 ∧ WS5** (so the dock + constellation surfaces are settled). The close sweep is the right home — it is the standing per-band close-disease owner and runs late.

**Why "device-free-gate-blind."** The gate is NOT blind — it reds today, correctly. The blindness is ORGANIZATIONAL: no wave is ASSIGNED to act on it, so it rides red into the cut. The fix is an owner, not a gate change.

**Verifying check.**
- After WS2∧WS5 + the close-sweep clause: `npm run proof:gate-manifest-sound` → clause-7 prints `AZ deltas W-DOCK1:<fresh|retired> W-DOCK2:<fresh|retired> W-CON1:<fresh|retired>` (all fresh-or-retired, zero `stale`).
- The close-sweep artefact records the per-delta decision (banner vs re-shoot) with the reason.

---

### L15 · the budget net-lift as ONE reconciled number

**Defect.** Payload moves in both directions across the tranche and the net is never asserted as one reviewed number:
- **ADD:** WS8 `BG.W-GLASS-REFRACT-WEBGL` (a new WebGL refraction shader); WS6 `BG.W-SIRI-WAVEFORM` (`shaders/siri-waveform.glsl.ts` → a NEW GL chunk `dist/siri-waveform.js`) + `BG.W-SIRI-ISLAND` (`src/subpaths/siri-island.ts` → a new subpath chunk `dist/siri-island.js`).
- **REMOVE:** WS5 `BG.W-VIZ-DEMIGRATE` (shrinks `constellation.js`/`fourier-field.js`, which ARE in BUDGETS) + `BG.W-VIZ-SUBSTRATE-DELETE` (deletes `concentric`/`paper-grid` chunks, which are NOT in BUDGETS); B1-W1 (drops `lucide-vue-next`/`vaul-vue` from `glass-ui.js`).

**Two concrete hazards beyond "no single number":**
1. **The un-walked-chunk hole (documented at `profile-bundle.mjs:145-156`).** `BUDGETS` (`:210-229`) walks only 6 entries. A NEW chunk not added to `BUDGETS` ships UN-budgeted — exactly the aurora-shader-growth NO-OP the file's own preamble warns about. `dist/siri-waveform.js` (GL) + `dist/siri-island.js` are NOT in `BUDGETS`; if WS8's refraction lands in a new chunk, same. Each new viz/GL chunk MUST get a `BUDGETS` entry, or "stays inside profile:budget" is a no-op for it.
2. **The critical-path-weight arm (`profile-bundle.mjs:251-347`).** The root barrel `dist/glass-ui.js` eager graph must reach ZERO of {WebGL substrate, GL shader strings, value.js color-math}. WS8 `GLASS-REFRACT-WEBGL` adds a GL shader; if it is reachable from the root barrel (e.g. composed by the root-barrel `Button`), `CRITICAL-PATH DIST` REDs. The refraction GL must be chunk-isolated (like `aurora.js`), off the root-reachable eager graph.

**Why no device-free gate catches it as one number.** `profile:budget` IS a gate, but (a) a new chunk absent from `BUDGETS` is invisible to it, and (b) each wave rebaselines its OWN ceiling, so the AGGREGATE net drift is never asserted as one reviewed number — per-wave ad-hoc lifts drift (the repeatedly-re-grown class, the budget analogue of the no-god-module ratchet).

**Owner wave.** **BG.W-CUT** (or BH-B2.1-swap's existing RE-BASELINE step, the last pre-cut payload reconcile — `bg-build-map.md:887`) — ONE step that: (i) builds the final integrated tree; (ii) adds a `BUDGETS` entry for every NEW dist viz/GL chunk (`siri-waveform.js`, `siri-island.js`, any WS8 refraction chunk); (iii) re-pins all moved ceilings as ONE reviewed net rebaseline with the conscious-lift commentary the file already uses (the house pattern at `:108-209`) — net = (WS8 + WS6 adds) − (WS5 + B1-W1 removes), stated as one number; (iv) asserts the critical-path-weight arm green.

**Verifying check.**
- `npm run build && npm run profile:budget` GREEN at the integrated tree.
- Every dist `*.js` viz/GL chunk has a `BUDGETS` key (no un-walked chunk): `node -e "const b=require('./scripts/...').BUDGETS; ls dist/*.js minus aux"` — i.e. assert `{siri-waveform.js, siri-island.js, <refract chunk>} ⊆ keys(BUDGETS)`.
- `criticalPath.violations == []` in the profile output (no GL/value string in the `glass-ui.js` eager graph).

---

## 2 · The single cut-time checklist (the deliverable)

The five legs share ONE property: the installed `node_modules` + the local dist resolve the right versions/bytes, so the dev/CI loop is green while the SHIPPED ranges + emitted artefacts are wrong — the defect surfaces only at the irreversible tag. The mitigation is a **cut-time correctness checklist** `BG.W-CUT` runs (as a build-map clause + a `proof:*` assertion where one exists) BEFORE `--run ship` fires. Each row = a runnable check + the owner that should already have cleared it.

| # | Cut-time check (runnable) | PASS condition | Owner who clears it | Rides-to-tag if skipped |
|---|---|---|---|---|
| **CT-1** | `package.json` peerDependencies `@mkbabb/keyframes.js` floor ≥ first-`snap`-version (5.1.0) | `^5.1.0` | BH.B1-W2 | consumer snap silent no-op |
| **CT-2** | `npm run proof:peer-conformance` GREEN ONLINE; value peer = `^1.1.1`, kf peer = `^5.1.0` | green; no `^1.2.0` value literal anywhere (`grep -rn '\^1\.2\.0' package.json scripts/`) | BH.B1-W2 + BG.W-GATE-FIELD-AURORA | release gate RED at tag |
| **CT-3** | `proof:peer-conformance` PINNED offline fallback mirrors the dist-tag (value 1.1.1) | `PINNED_LATEST.value === "1.1.1"` | BG.W-GATE-FIELD-AURORA (or G3 owner) | offline CI false-green |
| **CT-4** | `gates:emit-ci` produces NO diff against committed ci.yml; `npm run proof:gen-ci-fresh` GREEN | byte-clean; ci.yml carries glass-idiom-factor | BH-B2.1-swap (final emit) | gen-ci-fresh RED at `--run ship` |
| **CT-5** | `npm run proof:gate-manifest-sound` clause-7 FRESHNESS: AZ deltas all `fresh`-or-`retired` | zero `stale` | BG.W-CLOSE-SWEEP (after WS2∧WS5) | gate-manifest-sound RED in `--run full` |
| **CT-6** | `npm run build && npm run profile:budget` GREEN; every dist viz/GL chunk ∈ BUDGETS; `criticalPath.violations==[]` | green + no un-walked chunk | BG.W-CUT / BH-B2.1-swap RE-BASELINE | un-budgeted payload ships; or budget RED |

A lightweight enforcement option (recommended, low-cost): fold CT-1/CT-2/CT-3 into `proof:peer-conformance` (it already walks the peers — add the "floor ≥ snap-API version" assertion for kf + the PINNED-mirrors-dist-tag self-check), and CT-6's un-walked-chunk assertion into `profile:budget` (assert every `dist/*.js` non-aux chunk has a BUDGETS key — closes the documented `:145-156` hole structurally). CT-4/CT-5 already have gates (gen-ci-fresh / gate-manifest-sound); they only lack OWNERS. So the checklist becomes mostly machine-enforced rather than a human remember-list.

---

## 3 · Exact waves to amend

| Wave | Amendment |
|---|---|
| **BH.B1-W2** (`value-destraddle`) | (a) value peer → `^1.1.1` (NOT `^1.2.0`); (b) fold in the kf peer `^5.0.0`→`^5.1.0` bump (cross-ref B1-W3); (c) correct the stale refs — target by KEY (peer-only; no `dependencies` block; value peer at ~:1080 already `^1.0.0`, not the `^0.13.0` straddle); also bump the value devDep (~:1118) to `^1.1.1` for floor coherence. Gate stays `proof:peer-conformance`/`proof:constellation-spine` non-vacuously GREEN. |
| **BH.B1-W3** (`dragmorph-snap-excise`) | add a one-line note: the snap binding makes kf 5.1.0 LOAD-BEARING → the kf peer floor bump (CT-1) is its package.json consequence, owned by B1-W2. |
| **BG.W-GATE-FIELD-AURORA** (G6 spike) | reconcile the 5 stale `^1.2.0` strings (gate `:23,25,50,58` + leaf `:346,348`) → `^1.1.1`; correct `proof-peer-conformance.mjs` `PINNED_LATEST.value` `1.2.0`→`1.1.1` (the offline-mirror fix). |
| **BG.W-CLOSEFIX-9SITE** (R3) | re-word `bg-build-map.md:451`: the `gates:emit-ci` adds `proof:glass-idiom-factor` (and `category-card-warm` ONLY IF it is first re-tagged to include `ci`); the emit cannot add a `["local"]`-tagged gate. |
| **BH-B2.1-swap** | this is the FINAL pre-cut ci.yml emit (captures siri/viz surface deltas) — it must re-emit and leave ci.yml byte-fresh incl. glass-idiom-factor; it is also the natural home for the L15 net-rebaseline (CT-6). |
| **BG.W-CLOSE-SWEEP** (G3) | add the freshness-discharge clause for the 3 AZ DELTAs (re-shoot+re-stamp vs RETIRED-SUPERSEDED banner, per delta), gated AFTER WS2 ∧ WS5 (CT-5). |
| **BG.W-CUT** | add the cut-time checklist (CT-1..CT-6) as a pre-`--run ship` precondition; own the L15 net-rebaseline reconcile (CT-6) if not done at BH-B2.1-swap. |
| **proof:peer-conformance** (optional gate hardening) | add CT-1 (kf floor ≥ snap-API) + CT-3 (PINNED mirrors dist-tag) so CT-1/CT-2/CT-3 are machine-enforced, not a human checklist. |
| **profile:budget** (optional gate hardening) | add the un-walked-chunk assertion (every `dist/*.js` non-aux chunk ∈ BUDGETS) so CT-6's hole is structural. |

---

## 4 · Ordering

1. **C1 + C2 land together in BH.B1-W2** (one `[C]` package.json edit: kf `^5.1.0`, value `^1.1.1`) — early, EARLY, since B1 is the deps band. The G6-spike string reconcile (BG.W-GATE-FIELD-AURORA) is independent and can land whenever WS7's G6 spike runs.
2. **G3 (ci.yml) is emitted twice** — CLOSEFIX-9SITE R3 (early) then BH-B2.1-swap (final, after WS5∧WS6∧WS12). The cut's gen-ci-fresh checks the FINAL emit.
3. **G4 (freshness discharge) runs AFTER WS2 ∧ WS5** (surfaces settled) — in BG.W-CLOSE-SWEEP, which already gates AT-OR-AFTER CLOSEFIX.
4. **L15 (net rebaseline) runs LAST** — at BH-B2.1-swap / BG.W-CUT, on the final integrated tree (every add + remove landed), so the one number is real, not a per-wave guess.
5. **BG.W-CUT runs CT-1..CT-6** as the last pre-tag gate; all six are PASS by construction if 1-4 landed.

No leg blocks another except the two HARD ordering edges (G4 after WS2∧WS5; L15 on the fully-integrated tree). C1/C2/G3-early can land independently.

---

## 5 · Verifying checks (consolidated, runnable)

The fix HOLDS when all pass on the integrated pre-cut tree:

1. `node -e "const p=require('./package.json').peerDependencies;console.log(p['@mkbabb/keyframes.js'],p['@mkbabb/value.js'])"` → `^5.1.0 ^1.1.1`.
2. `npm run proof:peer-conformance` GREEN ONLINE (admits kf 5.1.0 + value 1.1.1; `^1.2.0 ⊆ ^1.1.1`; no destraddle) AND offline (after `PINNED_LATEST.value` → 1.1.1).
3. `grep -rn '\^1\.2\.0' package.json scripts/proof-field-aurora*.mjs <G6-leaf>` → zero value.js `^1.2.0` literals (the package.json + G6 spike clean).
4. `grep -c proof:glass-idiom-factor .github/workflows/ci.yml` ≥ 1 AND `npm run proof:gen-ci-fresh` GREEN AND `gates:emit-ci` leaves ci.yml byte-clean.
5. `npm run proof:gate-manifest-sound` clause-7 → `W-DOCK1/W-DOCK2/W-CON1` all `fresh` or `retired`, zero `stale` (after WS2∧WS5 + the close-sweep clause).
6. `npm run build && npm run profile:budget` GREEN; `{siri-waveform.js, siri-island.js, <refract chunk>} ⊆ keys(BUDGETS)`; `criticalPath.violations == []`.
7. `node scripts/gates.mjs --run ship` (the cut battery) does not red on any of peer-conformance / gen-ci-fresh / gate-manifest-sound / profile:budget for these five causes.

(Checks 2 and 4-7 are blocked at HEAD by UNRELATED reds outside this scope — `proof:tag-parity`'s `category-card-warm` mis-tag, `proof:consumer-staleness`'s 72 stale imports, R6 server-down false-fail. Those are NOT PT-6's to fix; each PT-6 check must be read AS the per-cause assertion, not "the whole `--run ship` is green." This is the explicit precondition the prior cut-time spec missed — do not promise a green aggregate this fix cannot deliver.)

---

## 6 · Feasibility verdict + residuals

**FEASIBLE — the fixes hold.** Every leg is a string/key edit or a single reconciled build-and-rebaseline, each maps to a named owner wave, each has a runnable verifying command, and the corrections are the project's OWN already-decided answers (FINAL.md §1.4) that simply have not propagated to the BH side + the cut. The central insight stands: these five all ride to the irreversible tag because the local `node_modules`/dist resolve the right versions/bytes while the shipped ranges/artefacts are wrong — a cut-time checklist (CT-1..CT-6), partly machine-enforceable by extending peer-conformance + profile:budget, is the right and cheapest mitigation for the highest-consequence (irreversible) risk.

**Residuals (honest, bounded — not blockers):**
- **The category-card-warm tag question (G3).** Whether `category-card-warm` SHOULD be a CI gate is a tag-parity decision outside PT-6's scope; PT-6 only requires the build-map:451 claim be made truthful (emit adds glass-idiom-factor; category-card-warm needs a `ci` tag first). Flag to the tag-parity owner; do not silently add a `ci` tag.
- **The exact L15 net number is computable only on the integrated tree** — this spec fixes the PROCESS (one reconciled rebaseline + the un-walked-chunk assertion), not the number, which lands at BH-B2.1-swap/BG.W-CUT. The WS8 refraction chunk name is unconfirmed (it may land in `glass-ui.js`/`dock.js` rather than a new chunk); the CT-6 assertion is name-agnostic (every dist viz/GL chunk ∈ BUDGETS), so it holds either way.
- **The kf peer bump interaction with `proof:constellation-spine`** is expected-green (`^5.1.0` admits the installed/sibling 5.1.0) but should be re-run after the bump rather than assumed — listed as check #2's constellation-spine arm.
- **B1-W2's line refs drift** — the spec mandates target-by-KEY, so the stale `:1058`/`:1096` numbers are harmless once the wave is amended; re-derive at execution.
