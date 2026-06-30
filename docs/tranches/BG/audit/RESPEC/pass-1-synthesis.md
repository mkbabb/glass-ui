# BG+BH 5.0.0 Re-Spec — PASS 1 SYNTHESIS (agglomerated)

**Date:** 2026-06-30 · **HEAD:** `6369ad6e` (docs-only above the spec baseline `b716b5be`) · **pkg:** 4.2.0 → cut 5.0.0 · **branch:** tranche/BG
**Inputs synthesized:** 8 research lenses · the synth re-spec (`pass-1-spec.md`, 70%) · **6 prototype+critique pairs** (P-CSAFARI · P-CLOSE · P-SWEEP · P-GESTALT · P-CLAUDE-DELETE · P-FIELD-AA) — the re-run/renamed prototype set at the FRESH HEAD (supersedes the prior P1–P6 set captured against `9dfe285c`).
**Fence:** READ-MOSTLY. Re-ran the 3 crux claims on disk (below); wrote ONLY under `RESPEC/`. `verify-siblings-intact --quiet` exit 0 before + after; tree clean.
**Aggregate convergence this pass: 72%** (WHAT-is-built triage ~93% · HOW-the-bulk-converges ~60%).

> **What this agglomeration adds over `pass-1-spec.md` (70%):** it reconciles the 6 proto+critique pairs into per-cluster verdicts, re-verifies the 3 load-bearing critique refutations on disk, and re-prices convergence honestly — net **+2** (two clusters de-risked to ~80 by the implement-spikes G4/G5, offset by the **C-SAFARI fence-number setback** the spike's optimism masked, the **P-FIELD-AA regression** 68→53, and the **P-GESTALT joinery holes** in the newly-prototyped keystone).

---

## 0. THREE CRUX CLAIMS RE-VERIFIED ON DISK (the critiques' load-bearing refutations — confirmed, not propagated on faith)

| # | Claim (from a critique) | Re-verified live | Consequence |
|---|---|---|---|
| **G4 — FULL RETIREMENT is SAFE** | The dock still paints blur after the `--glass-blur-dock` delete | `shell.css:29` `--dock-surface-blur: var(--glass-blur-resting)` + `:159` `backdrop-filter: var(--dock-surface-blur)`; **0** `var(--glass-blur-dock)` readers in src/demo | `--glass-blur-dock` is a genuine orphan of the intentional BD.W-DOCK-CORE 8px unification — full retirement changes ZERO paint. **P-CLOSE's N+2 = FULL RETIREMENT decision HOLDS.** |
| **G1 — the C-SAFARI fence number is on the WRONG uniform** | The ship shader splits R/B by `uChromatic` absolute rim-offset, NOT the spike's invented `uDispersion` UV-fraction | `docs/tranches/BG/audit/glass-field-shaders.json` ships `uChromatic` (`ca = inward·rim·uChromatic·0.0045`); all 3 spike fixtures swept `uDispersion 0.025`, a uniform the ship shader cannot express | **The spike's "transcribed verbatim" claim is FALSE.** The 0.025 fence value + the recommended `dispΔC p99 ≤ 0.005` gate clause are keyed to a uniform that does not ship. **The dominant cut-risk did NOT advance; the binding question got HARDER.** |
| **G2 — the wave→surface map should be DERIVED, not hand-authored** | `surface-closure.mjs` already exports the join | `collectPaintClosure`@136, `routeSeeds`@201, `surfaceClosure`@235 — the SAME route/ship-attestation authority the gate already trusts | **P-GESTALT's "decisive miss" HOLDS.** A hand-authored `wave-surface-map.md` re-mints the stale-PASS lie one level up; the map must be `collectPaintClosure(routeSeeds(s)) ∩ wave.Files` + a completeness clause. |

These three confirmations are why the agglomerated number does NOT simply inherit the spec's 70% optimism on G1, and why G4/G2 are firmly anchored.

---

## 1. WHAT-IS-BUILT TRIAGE — converged ~93% (UNCHANGED; two prototype passes concur)

Zero restart candidates. The cursor is honest at the row level (35 cited SHAs resolve, no fabrication, no DONE-without-code), no wave clobbered an earlier deliverable, no gate was weakened to pass. The landed bands are keep-verified with on-disk dual-engine paint and no inflation:

- **keep-verified (27 DONE + 3 live-fixes):** WS7 Stage-0 (0.1–0.6) · BH [C] (1.1–1.12) · WS1 (2.1–2.6) · WS3 3.7 IDIOM-FACTOR(core) · WS4 10.25 CATEGORY-CARD-WARM · LX.1 D-1 CONSTELLATION-PARALLAX-OFF · LX.2 D-2 PAPER-GRAIN-WARM · LX.3 D-3 DOCK-COLLAPSE-DIR. (Full evidence: `pass-1-spec.md §1` + `DEFECT-LEDGER.md`.)
- **half-baked (paint genuinely owed):** WS3 **3.1 CARTOON-INK-GAMUT** (source landed, PAINT-PENDING, hostage of every WS4 gestalt verdict) · WS3 **3.6 GLASS-BLUR-PEER** (radius collapse correct, PAINT-PENDING, the source of close-reds R1/R2 + a ±2% brightness phantom no device-free gate sees).
- **The permanent cardinal-lesson proof:** 2.2 FIELD-AURORA shipped device-free-GREEN at **1.04:1 muted** over the composited dark field (caught only by re-paint luck → 13.87:1). This is the live indictment of the 2 paint-owed waves and the entire rationale for the WS7 live-render gates + the gestalt oracle being the binding net.

The 4 confirmed close reds (R1 `no-god-module` ladder.css 527/shell.css 510 · R2 `no-dead-token` `--glass-blur-dock` orphan · R3 `gen-ci-fresh` missing `glass-idiom-factor` · R4 `tag-parity` `category-card-warm` local-only) all re-ran RED live and are the SAME "green own gate / leave shared close gate RED" disease that re-mints with new artifacts each batch (12→4 proves a fixed sweep is brittle).

---

## 2. THE 6 PROTO+CRITIQUE PAIRS SYNTHESIZED (per-cluster verdict)

Critique convergence this pass: **P-CLOSE 80 · P-CLAUDE-DELETE 80 · P-SWEEP 62 · P-GESTALT 60 · P-CSAFARI 58 · P-FIELD-AA 53** (mean 65.5 vs prior 64.5 — flat mean, shifted composition: the two implement-spikes firmed, the dominant risk did not, one cluster regressed).

### G4 · P-CLOSE — the 6-gate atomic close-fix + N+2 depth → **~80% (near-closed; execution-verify owed)**
**CONVERGED (verified on disk this pass):** the 6-gate atomic sweep (R1–R4 + glass-cal B3 + glass-depth D3) flips ALL GREEN in one diff; the 350-static-gate CLEAN-base differential surfaced **no 7th logic red**; **N+2 = FULL RETIREMENT** is DECIDED and SAFE (the dock still paints blur via `--glass-blur-resting`; `no-dead-token` re-reports 0 after the atomic full-chain delete → no N+3 hidden level). The cascade is **6 gates but 5 multi-site assertions** (glass-cal PRE_WAVE_RADII:64 + B3:306-314 dark-dock + glass-depth FROZEN:79). The two carves (ladder.css 527→470 grain-tail → `glass/grain-overlay.css`; shell.css 510→444 placement-tail → `dock/shell-regions.css`) are reader-gate-transparent (gates use `readMonolith`/`readDockCss` concatenation → FOLLOW the carve).
**OPEN (must-resolve PASS 2 — all execution-verification, no open design):**
1. **Run `npm run build` and prove dist CSS byte-identity** for both carves — the W-CARVE3/4/5 hard invariant the spike NEVER executed (an `@layer`/`@import`-order shift silently moves dist bytes).
2. **Capture the binding paint π for the grain-tail carve** (`tests-visual/liquid-hover.spec.ts` + the `proof:ba-gestalt` dock/CTA verdict) — the moved `.glass-*::after` IS BB.W-LIQUIDHOVER's disco-grain-pop-kill; device-free `proof:glass-cohesion` GREEN is insufficient per §0.F.
3. **Pin the `proof:precept-current` W2 interaction** — the 2 new carve leaves must be glass/*-glob-covered OR home-mapped in design-idioms §3 OR non-self-tagged (the "ZERO reader-gate edits" claim never enumerated this src/styles census gate).
4. **Run `gates.mjs --run full` in a FRESH `/tmp` worktree AFTER committing** — the deferred step that alone proves no 7th red across the deps-bearing arms (typecheck/test/build/motion-suite version-stamp); the build arm is where the carve-byte risk surfaces.
5. **Re-locate the 5 edit sites + 2 carve seams against LIVE HEAD `6369ad6e`** (the spike worked from stale `b716b5be`); decide R4's tag set (spec said `ci`; spike applied `["local","ci","release"]` matching the `field-accent-reconcile` precedent — close the discrepancy).

### G5 · P-CLAUDE-DELETE — the BH CLAUDE.md-delete safety → **~78% (scoped; census + 2 undefined funcs owed)**
**CONVERGED (re-verified):** the headline — the GENERATED `structure.md` is FLAT BULLETS (`- name/`) while the 4 §Structure readers parse a box-drawing ASCII tree (`│ │ ├── name/`) whose regexes match ZERO lines → a path-swap-only re-point is a SILENT VACUOUS PASS = a PARSER REWRITE; the **2 ENOENT-crashers** (structure-sync:74, doc-consistency:197 — raw `readFileSync`, THROW → can abort the whole `--run full` battery) are PRECISE (the other readers existsSync-guard); `auditCanonHomes` is existence-only + UNWIRED (0 importers) + RED at HEAD; `useBloomUp` is **KEEP-IN-PLACE** (18 files / 15 consumers / published via motion/index.ts:61 — the "single-consumer relocate" premise was backwards); the B4f born-RED-LAST-act gate `proof:claude-deletable` shape is right; the /tmp throwaway dry-run respects the fence.
**OPEN (must-resolve PASS 2):**
1. **Produce the FULL 12-site reader census with per-gate fate** — the proto specifies only 4 (§Structure); the **8 non-§Structure doc-presence readers** (dock-rail-realize:258 R5, handmark:249 W6, dock-unify:656, dropdown-fix:419, easing-primitive:365, phase-palette:335, spa-view:299, surface-axis:520) each carry a POSITIVE "CLAUDE.md documents …" assert that goes RED/vacuous after delete and needs a `gate → canon-home-key → CANON_TOKENS-anchor` mapping. Reconcile the proto's mutually-inconsistent counts (12 RED-ers / 16 content-reads / 2 crashers).
2. **Define `canonTokensSound()`** — invoked in C1 (§5a) as part of the GREEN condition but DANGLING (no code anywhere).
3. **Close or explicitly BOUND the deepest accumulation hole** — `canonAccumulationSound` scans only BG/BH tags; CANON_TOKENS is a hand-picked ~15-anchor minimum, NOT an enumeration; a legacy (BA/BB/BC/AX) contract with no anchor AND no home is silently lost at delete with the gate green. Add a coverage gate (every `### …(XX.W-…)` heading maps to a home body) OR record an explicit accepted-residual + a named human-review step.
4. **Decide the verbatim-tag-preservation contract** — `homeBodies.includes(tag)` requires the exact `BG.W-X` string to survive re-home prose, else a homed-but-tag-dropped contract false-REDs.
5. **Resolve the README scope mismatch** — auditCanonHomes gates 15 manifest homes (5 component READMEs) but spec G5 names ~28 owed and `proof:colocation` does NOT force the other 23; state 15→0 ≠ all-28-done + assign the 23 an owner.
6. **DROP the vacuous structureEnumerates smoke-check** (§1c) — a clause that cannot RED is the pattern BH kills; clean-break says drop, not keep-as-self-documenting.

### G3 · P-SWEEP — the standing `closeDisease`-manifest completeness clause → **~62% (mechanism solid; completeness floor relocated + runner contradiction)**
**CONVERGED:** the manifest-flag deliverable shape (a `closeDisease:true` flag on all class gates + `SWEEP_SET = GATES.filter(g=>g.closeDisease)` DERIVED, not hand-listed); the `["local"]` tag (a ci tag RE-SEEDS R3); the dual-signal `sweepVerdict` (execSync-throw catches `gen-ci-fresh` which writes NO JSON; the JSON-status leg catches a future exit-0-on-fail — BOTH empirically necessary); the 8-gate class (adds gate-script-parity + storybook-complete vs the prior 6); `gate-manifest-sound` is `realDefect=FALSE` at HEAD (112s; stale .cache + dirty-tree) → routed T2/close-only.
**OPEN (must-resolve PASS 2):**
1. **The completeness floor is RELOCATED, not eliminated** — C2's inverse-bite compares against `auditedClassGates`, itself a HAND-MAINTAINED registry; a forgotten `closeDisease:true` will equally forget the registry entry → C2 passes vacuously. Either derive `auditedClassGates` from a recorded STRUCTURAL heuristic (device-free ∧ ∈ `--run full` ∧ reads one of {gates.mjs, ci.yml, package tags, CSS line-budget, token graph}) with the false-include tail as a self-test bite, OR drop the "never a hand-list" headline and state honestly it is a hand-audited registry made VISIBLE by the inverse-bite.
2. **Option A (engine env-export 2nd automated consumer) is INFEASIBLE** — `bg-bh-execute.wf.js` is "pure control-flow, NO filesystem/git access" (grep `spawnSync|execSync|child_process` → 0); there is no flip-step to add LOC to. Accept Option B: ONE OS-automated guard (the commit-msg git-hook, auto-exercised by the engine's commit-per-wave cadence, gated on the currently-UNSET `GLASS_UI_ACTIVE_TRANCHE`) + recorded disciplines + the armed self-test — no "two automated" overstatement.
3. **The runner contradiction** — `--run sweep` CANNOT delegate to `runMode` (which is FAIL-FAST: `process.exit(1)` on the first red, naming only `no-god-module`, never returning to read JSON). It must be a NEW dispatch branch that spawns every gate, captures each exit, reads each JSON, then exits once on `sweepVerdict`. Rewrite §1.2 ("faithful by construction" is false) and §5 ("RED naming R1–R4" is not producible by `runMode`).
4. **Cost honesty** — the "~1.8s" is summed node-direct; the npm-run-per-gate mechanism adds ~7 nested npm spinups (~3.5–5s/hot-commit). Invoke proof scripts node-DIRECTLY in the FAST bite (the ledger-bite idiom).
5. **Orphan runner + born-RED enrollment** — after T0==T1==SWEEP_SET_FAST and gate-manifest-sound→proof:full, nothing runs the full `gates:sweep`; collapse or give it a real consumer. Make the **P-CLOSE-before-P-SWEEP edge HARD** (landing P-SWEEP first seeds a new `--run full` red since close-sweep is `["local"]` ∈ full) + enroll `proof:close-sweep` in the born-RED-by-design register beside ba-gestalt/ship-attestation.

### G2 · P-GESTALT — the ba-gestalt roster reconciliation → **~58% (newly prototyped; diagnosis LOCKED, joinery WRONG)**
**CONVERGED (verified-live):** the keystone is 0/10 (4 stale = shell·dark-register·page-band·cross-repo); `proof:ba-gestalt` is `[local,ci,release]` so the 5.0.0 tag CANNOT fire as wired; the §4 reconciliation (re-point capture paths + re-stamp + flip verdict) was NEVER executed; the cursor↔roster split is real (`bg-paint.wf.js` flips the cursor, NEVER touches the roster); G1 dimension asymmetry is RESOLVED on disk (≥1280 floor, no ceiling, no per-row equality → Chrome @1x 1440×900 and Safari @2x 2880×1800 both clear); reflect-stamp over the single exported `surfaceHash` is the right single-source move; Model-B late-sweep is the correct schedule.
**OPEN (must-resolve PASS 2):**
1. **DERIVE the wave→surface map** from `collectPaintClosure(routeSeeds(s)) ∩ wave.Files` (it ALREADY exists — §0 G2) — do NOT hand-author `wave-surface-map.md` — and add a **PARITY-C completeness clause** (every paint-source a wave's diff touches lands in some mapped surface's closure, else a wave under-declares + re-mints the stale-PASS lie).
2. **Reformulate or DELETE PARITY-B** — as written ("roster-PASS ⇒ every painting wave DONE") it is UNSAT mid-tranche for every multi-painter surface (page-band has ≥5 painters) and vacuous at the cut. Weaken to "no roster-PASS while any painting wave is PENDING/BUILDING" OR drop it; RETRACT the false §3.3 "flips GREEN surface-by-surface per band" claim.
3. **Widen the `bg-paint.wf.js` FENCE (line 22)** allowed-edit set to include `docs/tranches/BG/audit/reflect/` — the §4 reconciliation cannot land while the fence prohibits the judge from touching `reflect/`.
4. **Specify the route→surface CANONICAL-CAPTURE selection rule** — a surface owns ONE capture-light/dark file but the judge captures N per-route PNGs; define which route's capture becomes canonical AND confirm its layout aligns the surface's fractional probe box (a mis-selected route → false band read).
5. **Cost/schedule the wire on the C-SAFARI dependency** — the dual-engine 16×4-PNG model assumes the unproven (G1) Safari capture pipeline; state the Chrome-only 2-PNG fallback if Safari is blocked; bound the late-sweep strictly AFTER the last src/ paint mutation.
6. **Own the Safari-pixel decision HERE, not deferred** — the operative band is Chrome-ONLY; the FIELD-AURORA Safari-collapse (1.91 vs 1.04) is gate-invisible. Decide: roster gains a Safari pixel column OR operative verdict is explicitly Chrome-only with Safari carried by `proof:safari-parity`.
7. **Flag the CLAUDE.md↔code drift** — `proof-ba-gestalt.mjs` at HEAD has ZERO mobile-twin code (no "mobile" string), but the BB.W-GESTALT-GATE2 note claims "G2 16 mobile twins READ + viewport-faithful." Confirm whether WS7/W-REFLECT3 expects mobile-twin gating (if so the gate re-point dropped an arm + the close cost rises).

### G1 · P-CSAFARI — the in-situ two-pass refraction within the chroma fence → **~50% (GPU floor REAL; fence number / ship-pass / perf / dark-AA all owed — the likeliest 4th-time miss)**
**CONVERGED (the genuine de-risk):** the field→FBO→`texture(uv+disp)` HANDOFF renders FRAMEBUFFER_COMPLETE on real M5 Max Metal (ANGLE Metal, the SAME backend WebKit drives) with zero compile/sRGB/LOD drift — the seam the prior `glassShader-tier2.wgsl` never exercised (it took `background_texture` as an input uniform). The Tier-1 WebGL2/GLSL floor I rendered IS the universal Safari path (Safari 15+) → build it FIRST as the chronic-closing C17 artifact.
**OPEN — the headline numbers DO NOT TRANSFER to the ship artifact (verified §0 G1):**
1. **Re-point the fence onto the SHIP operator** — delete the invented `uDispersion` fraction; the ship splits R/B by `ca = inward·rim·uChromatic·0.0045` (`glass-field-shaders.json`); re-sweep the fence on `uChromatic`; key the gate clause `dispΔC p99 ≤ ε` to `uChromatic` with the lived bake stated as a uChromatic number + the `--glass-edge-dispersion` token mapped explicitly.
2. **Render the FULL source-of-truth pass** (anisotropic metal drapery + uMetalStrength composite + the K12 plate VALVE `smoothstep(uValveKnee,1,structLuma)`) — all 3 fixtures stop at `lensed=mix(lensed,soft,0.35)`; the chroma fence is measured over a synthetic 4-cycle band-grid whose edge-spectrum is nothing like the drapery the fence governs.
3. **Re-run R3 watchdog on the FULL shader** (drapery + valve + 2nd curlFBM) at 2880×1800 / N≤8 / sustained, and re-measure real shader-compile time against the WebKit ~2s ceiling — the cheap-shader p50 2.8ms (~3× lighter, one fewer fbm-curl) does not bound the ship cost.
4. **Fold C12/R6 dark-AA-over-bright-ridge INTO this spike** — it is NOT orthogonal; it is resolved by the SAME valve in the SAME fragment shader the spike omitted, unexercisable on a fixture with no bright ridge.
5. **Calibrate the chroma fence over the WS1 aurora+drapery field**, not the synthetic band-grid (per-pixel fringe is field-content-dependent).
6. **Name the residual ★★★ chronic the build still owes** — Safari.app `navigator.gpu` (C16) + the WGSL Tier-2 FBO-first-pass capture harness (C18); the spike de-risked Tier-1 (already treated as proven), NOT the leg that missed 3×.

### G6 · P-FIELD-AA — the field-composited-AA gate's 2nd consumer + anchor + Safari arm → **~53% (REGRESSED 68→53; anchor FIXED, consumer UNSOUND, gate NOT green)**
**CONVERGED:** D2 — the born-RED anchor `cb8ecdfc` IS 2 commits AFTER the fix `b3d65eec`; correct anchor = `b3d65eec~1` = `ebf6e45b` (re-verified live via merge-base). D3 — the per-engine GL divergence is real + on-disk-proven (Chrome L0.70/1.04 vs Safari L0.55/1.91); the DROP-WITH-TRIGGER/never-Playwright-webkit/never-CI-red shape matches `proof:safari-parity`. The fractional-region sampler handles the @1x/@2x asymmetry.
**OPEN (must-resolve PASS 2 — the core D1 fix is unsound):**
1. **Replace consumer #2** — `/display/card` is UNSOUND: `card.vue` self-stages TWO contained `DEFAULT_AURORA_CONFIG` auroras explicitly authored "high-frequency/busy/bright" (card.vue:23,147,299,323) → its CardDescriptions composite over the VIVID contained field (the case §6 EXCLUDES); the smoothness-validity gate (stddev<9) would false-RED them. Pick + ON-DISK-VERIFY a real Topology-B route: a calm glass Card with a genuine CardDescription over the RECESSIVE shell field and NO contained GL (a content route — forms/data/feedback). The `/foundations/colors` fallback is INVALID (same route+field as consumer #1 → fails ≥2-DISTINCT-topology).
2. **Reconcile gate-not-green-at-HEAD** — the fixed-state light·chrome hero eyebrow `.section-label` is **4.15:1** (DELTA.md:101 — the exact register enrolled as consumer #1) → dual-engine F-AA-LIVE REDS over fixed HEAD light/desktop (4.15<4.5). Either couple gate-green to a scheduled light-eyebrow polish fix OR honestly re-class/threshold the eyebrow; "over fixed HEAD both GREEN" is false.
3. **Re-ground the self-test fixtures honestly** — the invented RGB triples compute 1.108/1.446/10.492 (value.js 1.2.0), NOT the claimed "recorded" 1.04/1.91/6.7; derive fixtures from the actual recorded composite/ink samples. AND add a device-free test of the risk-bearing `sampleCompositeBehindText` (synthetic smooth-vs-vivid PNG) — today the only test of the within-plate clamp is the `["local"]` live arm.
4. **Make the device-free Safari coverage real OR drop "armed"** — the self-test's "Safari pair" is just a second sub-4.5 value testing no Safari behavior; ALL real Safari coverage sits in the `["local"]` DROP-WITH-TRIGGER leg.
5. **Sequence the value.js `^1.2.0` peer-floor bump BEFORE/WITH the gate** — F-AA-SELFTEST hard-imports `wcagContrastRatio` at ci/release while the floor is `^1.0.0`; a fresh install <1.2.0 module-throws → can ABORT `--run full`. Add a try-guard/skip if the export is absent.
6. **Resolve the Safari anchor/live sequencing conflation** (§3 routes the Safari leg through the Mac-only `--run ship` M9 ceremony, but §7 says "pull EARLY M4/M8") + **state the PRM/temporal-determinism contract** (the shell aurora drifts per W-STAGE BA-VJS-2 → freeze to ONE deterministic static frame so a border-case ratio is reproducible).

### G7 · the viz-subpath cross-ownership seam → **~40% (un-prototyped; a confirm-step)**
Confirm BG-WS5 carries the SLIDES `/constellation`+`/fourier-field` consumer migration when it drops/renames a key, else a break falls between BH-B7 and BG-WS5. The post-WS12 re-baseline needs a HUMAN PUBLISH-vs-INTERNAL classification for any novel WS5/WS6 dir the fail-closed regen surfaces. Resolve at the post-WS12 re-baseline or fold into B7.

---

## 3. THE AMENDED WAVE PLAN (KEEP the DAG; the 5 amendments, re-confirmed + sharpened)

**Build order (KEEP — DAG acyclic, every edge load-bearing-correct against live code):**
`WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7(core)` → `WS8 → WS9 → WS10 → WS11` → `WS12(capstone)` → `BH[WS12] restructure tail`.

**Non-negotiable fence:** the cut MUST NOT precede WS7 phase-12 (the 5 live-render gates: route-navigates / field-aurora / previews-render / uniform-blur / safari-parity) + the W-REFLECT3 gestalt-flip — the ONLY automated net for the field-composited-AA class.

| # | Sequencing amendment | Status after this pass |
|---|---|---|
| 1 | **Clear the 4 close reds FIRST in ONE atomic 6-gate sweep** | **NEAR-CLOSED (G4 ~80)** — N+2 = FULL RETIREMENT verified-safe on disk; owed: build byte-identity + grain-tail paint π + precept-current pin + `--run full` /tmp + line-drift re-locate. |
| 2 | **Standing `closeDisease`-manifest per-band sweep** | **CONVERGED-MECHANISM (G3 ~62)** — owed: completeness-floor honesty (auditedClassGates is a hand-list), drop Option A, the runMode-vs-spawn-all rewrite, cost honesty, born-RED enrollment + the HARD P-CLOSE-first edge. |
| 3 | **Front-load the C-SAFARI spike** | **PARTIAL (G1 ~50)** — GPU floor REAL but the fence number is on the WRONG uniform + the ship pass never ran + perf under-probed + C12 not folded. The dominant cut-risk; PASS 2 must re-point onto `uChromatic` + render the FULL pass. |
| 4 | **WS3 Safari-ceiling (3.3/3.4) + a glass-cascade carve BEFORE WS8** | **FOLDED into G4** — the R1 carve seams are the P-CLOSE carves (byte-isomorphic, reader-gate-transparent); the WS3 3.3/3.4 BLOCKING Safari rows stay correctly ordered before WS8. |
| 5 | **Incrementalize the BH CLAUDE-delete tail** | **SCOPED (G5 ~78)** — owed: the full 12-site reader census + per-gate re-home, `canonTokensSound()` definition, the legacy-contract accumulation coverage, the README scope, drop the vacuous smoke-check. |

**Mechanical CONSUMEs (fire at the cut):** kf 5.1.0 `DragOptions.snap`/`Oscillator`; value.js peer floor `^1.0.0`→`^1.2.0` (the WCAG hard-import + now coupled to the G6 gate); DROP the dead `perfect-freehand ^1.2.3` at WS9; DO NOT re-list the BorderProgress `oklchSpectrum` CONSUME (already discharged — `spectrum-walk.ts:22`); W-TAILWIND4-IDIOM = "evaluated, not applicable."

**Identity/SOTA fences to HOLD:** WebGL2+WGSL dual-stack (CSS-SVG `feDisplacementMap` dead on Safari/Firefox 2026); the deliberate calm-blur divergence from iOS-27 (keep the at-rest STATIC brighter specular); `contrast-color()` flips the SURFACE via `contrast-color(var(--card))`, NEVER the warm-amber ink; **the K2 chroma fence (refraction = DEPTH not hue) is BINDING — and it is keyed on `uChromatic`, not the spike's `uDispersion`.**

---

## 4. OPEN CLUSTERS (PASS 2 convergence targets — by cut-risk × residual-uncertainty)

1. **C-SAFARI in-situ (G1 ~50) — the dominant cut-risk.** Re-point the fence onto the ship `uChromatic` operator; render the FULL pass (drapery + uMetalStrength + K12 valve); fold C12 dark-AA-over-bright-ridge IN; re-watchdog the full shader; calibrate over WS1's real field; name the Safari.app navigator.gpu + WGSL Tier-2 capture-harness leg (C16/C18) as the residual ★★★ the build still owes. Land as committed C17 evidence.
2. **field-aurora gate (G6 ~53) — REGRESSED, the weakest.** Replace `/display/card` with a sound calm-Card-over-recessive-field route; reconcile the 4.15 eyebrow gate-not-green; re-ground the self-test fixtures + add a device-free `sampleCompositeBehindText` test; sequence the value.js `^1.2.0` floor; state PRM determinism; resolve the Safari anchor/live conflation.
3. **ba-gestalt reconciliation (G2 ~58) — the keystone, newly prototyped.** DERIVE the wave→surface map from `collectPaintClosure`; reformulate/delete PARITY-B; widen the wf.js fence; specify the route→capture rule; own the Safari-pixel decision; flag the mobile-twin code↔doc drift.
4. **closeDisease completeness (G3 ~62).** Make the completeness floor honest (structural heuristic OR named hand-list); drop Option A; the runMode-vs-spawn-all rewrite; cost-honest node-direct invocation; the HARD P-CLOSE-first edge + born-RED enrollment.
5. **Atomic close-fix execution-verify (G4 ~80).** `npm run build` byte-identity for both carves; the grain-tail paint π; precept-current W2 pin; `--run full` /tmp siblings-absent; re-locate against HEAD `6369ad6e`; settle R4's tag set.
6. **CLAUDE-delete safety (G5 ~78).** The full 12-site census + per-gate re-home; `canonTokensSound()`; the legacy-accumulation coverage gate; README scope; drop the vacuous smoke-check; concrete deliverables (regen-structure main-guard, detectDeps refactor, the vitest fixture rewrite).
7. **viz-subpath cross-ownership seam (G7 ~40, un-prototyped).** Confirm BG-WS5 owns the SLIDES `/constellation`+`/fourier-field` migration; the post-WS12 human PUBLISH-vs-INTERNAL call.

---

## 5. CONVERGENCE ACCOUNTING

| Axis | Synth re-spec (70%) | This agglomeration | Driver |
|---|---|---|---|
| WHAT-is-built triage | ~93% | **~93%** | Two prototype passes concur; the 3 crux refutations re-verified on disk firm (not weaken) the baseline. |
| HOW-the-bulk-converges | ~62% | **~60%** | The prototype scrutiny REVEALED more holes than it closed on the high-risk clusters: G1 fence-number invalidated (the spike measured the wrong uniform), G6 regressed 68→53 (consumer unsound + gate not green), G2 joinery wrong — offset by G4/G5 firming to ~80. Per-cluster: G4 80 · G5 78 · G3 62 · G2 58 · G6 53 · G1 50 · G7 40 → mean ~60. |
| **Blended** | **70%** | **72%** | +2 honest: every cluster now has a named owner + a precise must-resolve set (no vague open questions), and the cheapest-unblock (G4) + the CLAUDE-delete (G5) are near-closed — but the dominant cut-risk did NOT advance and one cluster regressed. |

**readyToDevelop: FALSE.** The dominant C-SAFARI cut-risk had its GPU floor proven but its binding fence number invalidated (wrong uniform) + its ship-pass/perf/dark-AA unrendered; the field-aurora gate regressed (unsound consumer + gate not green at HEAD); the ba-gestalt keystone's wiring (as-is, the 5.0.0 tag cannot fire) is diagnosed but its joinery is unbuilt. 7 bounded gaps with named owners remain.

**PASS 2 focus:** re-spike C-SAFARI onto the ship `uChromatic` operator with the FULL pass + C12 folded in (the dominant cut-risk); re-sound the field-aurora 2nd consumer + reconcile the gate-not-green; derive the ba-gestalt wave→surface map + fix PARITY-B + widen the wf.js fence; finalize the close-fix execution-verify (build byte-identity + grain-tail π + `--run full` /tmp); make the closeDisease completeness floor honest + rewrite the spawn-all runner; complete the CLAUDE-delete 12-site census + define `canonTokensSound`.
