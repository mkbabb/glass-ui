# BG+BH 5.0.0 RE-SPEC — PASS 1 (baseline truth)

**Date:** 2026-06-30 · **HEAD:** `b716b5be` (re-verified live) · **pkg:** 4.2.0 → cut 5.0.0 · **branch:** tranche/BG
**Synthesis of:** 8 research lenses (cursor-truth · gate-reality · code-vs-spec · paint-integrity · clobber-regression · BH-restructure · web-sota-dep · arch-buildorder) at the FRESH HEAD (incorporating live-fixes LX.1–LX.3), reconciled against the prior-HEAD synthesis (`9dfe285c`).
**Fence:** READ-MOSTLY. Verified findings on disk + ran the close gates live; wrote ONLY under `RESPEC/`. `verify-siblings-intact --quiet` exit 0 before + after; tree clean (only untracked `RESPEC/`).
**passConvergencePct (this pass): 70** — WHAT-is-built triage ~93% · HOW-the-bulk-converges ~62%.

---

## 0. THE LOAD-BEARING TRUTH (re-verified live at `b716b5be`, not on report faith)

The 8 lenses CONVERGE with near-zero disagreement; every contested fact I re-ran on disk. The headline: **the cursor is honest, no wave fabricated, no gate was weakened to pass, no later wave clobbered an earlier deliverable — but the integrated `--run full` close battery is RED on 4 genuine ci/release gates, the binding paint oracle `proof:ba-gestalt` is 0/10 (4 stale), and 2 device-free-GREEN waves are paint-owed.** The user's low confidence is explained by these three live facts, NOT by bad specs.

### A. State table (re-checked on disk)

| Fact | Verified live |
|---|---|
| `verify-siblings-intact --quiet` | exit 0 (no parked siblings, before + after) |
| typecheck / build / tree | exit 0 / exit 0 / clean (only untracked `RESPEC/`) |
| cursor authoritative row status (lens-parsed) | **27 DONE / 2 PAINT-PENDING / 119 PENDING / +2 deferred** = the real frontier. The raw grep (`42 DONE / 6 PP / 126 PENDING`) over-counts prose-cell mentions of the words; the footer `DONE: 2` is a stale cron boot snapshot. **Both off-figures are doc-display artifacts, not fabrication.** |
| **close battery `--run full`** | **NOT green — 4 live ci/release reds (R1–R4)** + 2 born-RED-by-design tag/paint blockers (excluded, see C) |
| `proof:ba-gestalt` (re-ran live) | **0 PASS / 10 FAIL** — 4 surfaces `freshness:stale` (shell · dark-register · page-band · cross-repo), 6 `fresh` but FAIL. The keystone oracle is fully un-flipped. |
| SYNTH fix-wave `ea4682c0` | landed after VALIDATION-REPORT (`ff0933a3`); cured the prior 12 stale reds (`storybook-complete` = pass at HEAD) |

### B. The 4 confirmed close reds (R1–R4) — re-run live, ALL FAIL

| # | Gate | Live evidence (re-ran at `b716b5be`) | Root commit |
|---|---|---|---|
| R1 | `proof:no-god-module` | **FAIL** — `ladder.css`=**527L**, `shell.css`=**510L**, both >500; 16 files GRANDFATHERED by the ratchet, these two are NEW violations (not baselined) | `6ec81de` (3.7) + `cd9ce46` (3.6) |
| R2 | `proof:no-dead-token` | **FAIL** — `--glass-blur-dock` = **ZERO `var()` readers** (re-grepped: 0). Tip of a 3-deep dead chain (composite → `--glass-saturate-dock` → `--glass-blur-dock-radius` + `--blur-dock` @theme bridge) | `cd9ce46` (3.6) |
| R3 | `proof:gen-ci-fresh` (`--verify-ci`) | **FAIL** — `MISSING from ci.yml: proof:glass-idiom-factor` (registered ci-tagged in gates.mjs, `gates:emit-ci` never re-run) | `6ec81de` (3.7) |
| R4 | `proof:tag-parity` | **FAIL** — `proof:category-card-warm` registered `tags:["local"]` (a static src-scan gate not promoted to ci, not in JUSTIFIED_LOCAL_ONLY) | `9e13965d` (10.25) |

### C. The 2 born-RED-by-design blockers (NOT defects — do NOT "fix")

- `proof:ba-gestalt` — the intended paint oracle, 0/10 by design until W-REFLECT3 flips verdicts. Stage-0 deliverable: born-RED with HARD-RED teeth; the BC→BG re-point is GENUINE (consts read `docs/tranches/BG/`, surface-closure derives route seeds, 10 roster `.md` on disk — not vacuous).
- `proof:ship-attestation` — the intended tag-blocker, born-RED until a real Metal `release.sh --run ship` ceremony writes the attestation (depends on EXEC M9 C-SAFARI Metal capture).

### D. The cascade-reveal (the R2 fix is 6 gates, not 1) — re-verified on disk

`proof:glass-cal` line 173 POSITIVELY asserts the dark dock composite string reads `saturate(...) brightness(1.02)`/`1.12` and lines 169/64 read `--glass-blur-dock-radius`; `proof:glass-depth` line 79 reads `glass-blur-dock-radius:9`. **Deleting the `--glass-blur-dock` chain atomically REDS `glass-cal B3` → cascades to `glass-depth D3`.** A one-token delete is wrong: it cascade-reveals the next dead level AND reds two more gates. **The close-red sweep is R1–R4 + glass-cal B3 + glass-depth D3 = 6 gates, retired in ONE atomic diff.**

### E. The recurring disease (the structural root of low confidence)

The same class — *a wave greens its OWN gate while leaving a SHARED close gate RED* — re-mints with DIFFERENT artifacts each batch: **12 reds at `ff0933a3` → SYNTH `ea4682c0` cured all 12 → WS3/WS4 re-seeded 4 NEW (R1–R4) → 4 subsequent live-fix/run-log commits landed WITHOUT re-checking the close.** A hand-picked SWEEP_SET is therefore STRUCTURALLY BRITTLE. The fix is a STANDING `closeDisease:true`-manifest per-wave sweep enrolling the whole CLASS, not the current instances.

### F. The cardinal-lesson proof (device-free GREEN ≠ visually correct)

**2.2 FIELD-AURORA** shipped device-free-GREEN (no-gray/dark-material passed) at **1.04:1 muted / 2.14:1 hero-h1** over the composited dark aurora field — a CATASTROPHIC AA failure caught ONLY by re-paint luck (now 13.87:1, JSON-corroborated by `pixel-analysis.json`). This is the permanent, live proof that **device-free GREEN is insufficient for any glass-over-field surface** — the entire rationale for the live-render gates (WS7 phase-12) + the gestalt oracle being the binding net. It directly indicts the 2 paint-owed waves (3.1/3.6): their dual-engine paint is OWED and must NOT be assumed correct before the cut.

---

## 1. THE VERIFIED TRIAGE TABLE (every landed wave; ZERO restart — 8 lenses concur)

### keep-verified (27 DONE waves + the 3 live-fixes)

| Item | Disposition | Evidence (verified) |
|---|---|---|
| WS7 Stage-0 ground-freeze (0.1–0.6) | **keep-verified** | All SHAs resolve; device-free gates GREEN or born-RED-by-design; the BC→BG ba-gestalt re-point is GENUINE (not vacuous); 18 ground PNGs (12 Chrome-Metal + 6 WKWebView) on disk; `ship-attestation`/`ba-gestalt` are the intended blockers with teeth-bearing self-tests. `0.1` DONE is a legit orchestrator override (the paint FAIL it carries IS the born-RED anchor). |
| BH concurrent-safe [C] band (1.1–1.12) | **keep-verified** | All 12 device-free gates GREEN; typecheck exit 0; `@glass` codemod sound (278 imports resolve, 0 src leakage, 0 deep-relative survivors); `proof:subpath-classify` RAN PASS (C1 EXACT_REPRODUCTION=true, C2/C3 fail-closed teeth bite); value.js `^1.0.0` single-leg, kf `^5.0.0`, vaul-vue/lucide-vue-next absent. No clobber. |
| WS1 2.1 ROUTE-TRANSITION | **keep-verified** | Bare keyed atomic swap; 4 confounders + `.scroll-build` retired; surviving `startViewTransition` is the dock-morph VT (spec KEEP). 20 PNGs, dual-engine, real Metal provenance. |
| WS1 2.2 FIELD-AURORA (re-paint) | **keep-verified** (cautionary) | `shellAuroraConfigDark` wired via `useGlobalDark`; catastrophic dark-AA closed (13.87:1); `[data-glass-field-canvas]` exposed (AppShell:328) → WS8 BACKDROP-SAMPLE precondition IN PLACE. 16 PNGs @2880×1800, AA numbers JSON-corroborated. Light-eyebrow 4.15:1 (Chrome) / 4.80 (Safari) residual recorded HONESTLY as polish, non-blocking. |
| WS1 2.3 SCROLL-PROGRESS-RAIL | **keep-verified** | `scaleX(0)` hoisted unconditional; invalid `scroll(var())` fragments absent; 30 PNGs, computed-criteria π, both engines/modes; has the one standalone WebKit-probe JSON. |
| WS1 2.4 FIELD-ACCENT-RECONCILE | **keep-verified** | `warm-field.ts` collapsed to a thin adapter; single-source exports; hue-parity 0.0° measured; gate GREEN. |
| WS1 2.5 PAPER-GRAIN-OPTIN | **keep-verified** | Universal grain plane removed; tokens intact; 16 PNGs both engines/modes. |
| WS1 2.6 HERO-FIT | **keep-verified** | Chassis title path single-source (`displayTitle` glass-ui/Real); `:hero-title=false` fork retired; `proof:hero-fit` PASS; 34 PNGs across 4 widths × 2 modes × 2 engines (fullest matrix). |
| WS3 3.7 GLASS-IDIOM-FACTOR (core) | **keep-verified** | `--glass-plate-tinted` declared once, read 5–7 sites, DRY; gate GREEN. (AMEND tail only: grew `ladder.css`→527 = R1 leg + skipped `gates:emit-ci` = R3.) |
| WS4 10.25 CATEGORY-CARD-WARM (source+paint) | **keep-verified** | `proof:category-card-warm` GREEN on the source arm; 12 PNGs @2880×1800; user-reported metallic-wash defect closed (warm hue 47–80°, C 0.019–0.029 above gray floor), both engines/modes. (AMEND only: gate tags `["local"]` = R4.) |
| LX.1 D-1 CONSTELLATION-PARALLAX-OFF | **keep-verified** (amend gate-lock) | `DEFAULT_PARALLAX=0` + `parallaxNodePos` early-return; whole-lattice cursor-tracking structurally killed; PNGs on disk. The user-named HIGH defect fixed at root. |
| LX.2 D-2 PAPER-GRAIN-WARM-SUBSTRATE | **keep-verified** (amend Safari leg) | Demo-local ONLY (library `paper.css` byte-untouched, grain fence held); gates PASS; out-of-scope residual recorded honestly. |
| LX.3 D-3 DOCK-COLLAPSE-DIR | **keep-verified** | `--dock-live`/`--dock-expand-t` directional blend kills the collapse-balloon; `proof:dock-engine` E4 (line 465) TIGHTENED to red-on-revert (the GOOD gate-lock + paint-backed pattern); dual-engine DELTA. Residual 15px first-collapse end-snap recorded-not-fixed. |
| PHASE 0/1 class-H DONE bulk (~18 rows) | **keep-verified** | Almost entirely class H (no paint owed); spot-checked BH gates (external-payload/peer-conformance/drag-morph) all PASS non-vacuously. |

### half-baked (deliverable kept; visual close genuinely owed)

| Item | Disposition | What's owed (PASS-2 owner) |
|---|---|---|
| WS3 3.1 CARTOON-INK-GAMUT | **half-baked** | Source landed (warm-brown oklch-from-foreground hue in [45,85], maroon killed, `proof:no-gray` GREEN with new witness), but **PAINT-PENDING** — NO capture dir, NO DELTA. Box-shadow paint OWED + (per §0.F) cannot be assumed correct. It is the HOSTAGE of every WS4 ba-gestalt verdict (order-coupling — paint it before WS4 fires its gestalt verdicts). |
| WS3 3.6 GLASS-BLUR-PEER | **half-baked** | Radius token-collapse complete + correct (8px peer-lock `proof:glass-cal` GREEN), but: (a) **PAINT-PENDING** (no DELTA); (b) the source of close-reds R1 (`shell.css` 510) + R2 (`--glass-blur-dock` orphan); (c) a SILENT material shift no device-free gate catches — `proof:glass-cal` is deliberately RADIUS-ONLY (lines 98–99 exclude saturate/brightness). **The clobber lens RESOLVED the contradiction:** saturate is byte-identical both modes (NOT identity-loss); the real deltas are **−1px blur (intended/gated) + ±2% brightness (un-gated phantom: light 1.02→1.0, dark 1.12→1.14)**. Owed: the 6-gate atomic R2 delete + a ±2% DUAL-engine dock-plate sign-off at W-REFLECT3. The spec'd iridescence→neutral-frosted paint is deferred-by-design to WS3 Phase-3 (3.9). |

### amend (registry/hygiene/process — library-logic-free)

| Item | Disposition | Fix |
|---|---|---|
| R4 `proof:category-card-warm` tag | **amend** | Promote tags `["local"]`→`["local","ci","release"]` (or record JUSTIFIED_LOCAL_ONLY). One-line. |
| R1/R3 WS3 3.7 close tail | **amend** | Carve `ladder.css`(527) + re-run `gates:emit-ci` (R3). |
| R2 `--glass-blur-dock` orphan chain | **amend** | Delete the WHOLE 3-deep chain (token + `--glass-saturate-dock` + `--glass-blur-dock-radius` + `--blur-dock` bridge) ATOMICALLY and retire `glass-cal B3` + `glass-depth D3` in the SAME diff (6-gate cascade). A one-token delete cascade-reveals + reds two more gates. |
| LX.1 D-1 device-free gate guard | **amend** | NO device-free gate asserts the parallax default — `proof:viz-constellation/-field/-tokens` pass identically at 0 or 0.08; the user-named HIGH defect rests on a LOCAL paint arm no CI runs. ADD a `proof:viz-constellation` clause asserting parallax-default-OFF/sub-perceptual + a self-test bite. (Source fix itself is sound — this machine-locks it against a silent revert.) |
| LX.1 D-1 "dual-engine verified" label | **amend** | ZERO Safari pixel capture (WKWebView cannot snapshot a live WebGL2/WebGPU canvas — honestly noted in the DELTA but the LEDGER label overstates). Record as Chrome-pixel + WebKit-JS-engine. (DELTA prose nit: cites non-existent `proof:constellation-field 41/41`; real gates `proof:viz-*` all PASS.) |
| LX.2 D-2 Safari leg | **amend** | Safari light-only (no safari-dark PNG); narrower than the dual-engine-both-modes floor (acceptable for a discrete demo-local regression repair, recorded). |
| `proof:ba-gestalt` roster reconciliation (UNEXECUTED) | **amend** (largest) | The real-paint-protocol §4 step — re-point capture paths off the ground anchor + re-stamp freshness + flip per-wave verdict — was NEVER run for any passed surface. The good WS1/WS4 paint lives in `visual/route-transition-pipeline/` + `visual/BG.W-FIELD-AURORA-paint/` (paths the gate cannot see; the roster declares `reflect/<surface>-…` which only resolve for the 3 ground anchors). **As wired, `--run ship` cannot pass and the 5.0.0 tag cannot fire.** The two-verdict split (PAINT-PASS-LOG prose drives the cursor; the roster pixel drives the gate) is a latent BB-class lie — wire the cursor flip TO the roster flip. |
| Row 2.7 VT-ROUTE-ENHANCE status | **amend** | Marked DONE but is DEFERRED-NOT-BUILT (a "DONE-to-skip-the-frontier" overload — a status-integrity precedent risk). Re-label DEFERRED. Defer reasoning is sound (VT-snapshot GOTCHA needs live paint). **PROMOTE** to a real additive PRM-gated wave at W-REFLECT3 — same-doc View Transitions reached Baseline incl. Firefox 144 (was Chromium+Safari when specced). |
| no-god-module ratchet doc-drift | **amend** | CLAUDE.md asserts `RATCHET_BASELINES == {}`; the LIVE count is **16** (BD.W-CUT re-populated). The doctrine is ACCEPTED-residual, NOT "drained to ∅". The BH CLAUDE-delete/canon migration (B4) MUST read the LIVE 16, never copy `=={}` forward. (`proof:no-god-module` keys on `violations.length` — `ratchetDrained:false` is reported metadata, not enforced; the 16 ship GREEN at 4.2.0.) |
| The 4-red close-fix (process) | **amend** | The deeper amend is PROCESS: re-run `gates.mjs --run full` siblings-absent in a FRESH `/tmp` worktree (NEVER `~/Programming`) AFTER EVERY BATCH. Standalone `proof-*.mjs` print `status:FAIL` but exit 0 (the harness reads the JSON, not `$?`) — trust ONLY `--run full` JSON. The CI runner is FAIL-FAST (bails at the first sibling red) — a green `--run ci` is a false read. |

### keep-as-spec'd (the 119 PENDING bulk — genuinely UNBUILT)

| Item | Disposition | Evidence |
|---|---|---|
| WS3 Phase-2/3 (3.2–3.5, 3.8–3.11) | **keep-as-spec'd** | Genuinely unbuilt (grep-clean, 0 orphan code); WS1-field gate landed → buildable. 3.3 GLASS-CLIP + 3.4 SAFARI-BLUR carry the Safari Job-B convergence CEILING (BLOCKING). |
| WS2 dock (4.1–4.11) | **keep-as-spec'd** | Build state matches PENDING exactly: 5 SpringProgress sites (= the 5→1 target), no `useDockSpring.ts`, `#shell-dock-morph-goo` present. 4.1 produces `useDockSpring` gating WS6. |
| WS5/6/4/7-bands/8/9/10/11/12 + BH[WS12] + CUT | **keep-as-spec'd** | Critical-path chain internally consistent; DAG acyclic; every "spec CONVERGED" commit touches 0 non-docs files (docs-only tranche-DEV records). Not per-wave source-audited (PASS-1 broad-triage scope). |

**RESTART candidates: NONE** — 8 lenses concur. The architecture is sound; the user's lost confidence is the live 4-red battery + the 80%-unflipped gestalt oracle + the FIELD-AURORA proof, not bad design.

---

## 2. THE AMENDED WAVE PLAN (the 119-row PENDING bulk)

**Build order — KEEP (DAG acyclic, every edge load-bearing-correct against live code):**
`WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7(core)` → `WS8 → WS9 → WS10 → WS11` → `WS12(capstone)` → `BH[WS12] restructure tail`.

Validated edges (live): WS8's `[data-glass-field-canvas]` marker already laid (AppShell:328 + useGlassBackdropLuminance:231); WS2's 5→1 SpringProgress target = EXACTLY 5 dock sites; `useDockSpring` correctly ABSENT (WS6 born-RED); the glass-deep tier SURVIVES 3.6 (only the bare default Button demoted — button/index.ts:101 primary-audacious KEEPS glass-deep) → the WS8 forward edge is a SIGN-OFF, not a re-open.

**Non-negotiable fence:** the cut MUST NOT precede WS7 phase-12 (the 5 live-render gates: `proof:route-navigates / field-aurora / previews-render / uniform-blur / safari-parity`, all ABSENT today) + W-REFLECT3 gestalt-flip — the ONLY automated net for the field-composited-AA class (FIELD-AURORA shipped device-free-green at 1.04:1).

### Keep-as-spec'd (low uncertainty)

- **WS2 dock convergence** (produces `useDockSpring`, the 5→1 spring unify). KEEP.
- **WS5 viz refinement** (de-migrate + WGSL-substrate-delete; keep aurora+dot-flow WebGL2 fallback — *strengthened* since WebGPU is critical-mass NOT clean Baseline: Firefox-stable default-off + Linux gap). **AMEND:** confirm WS5 OWNS the viz-subpath/slides `/constellation`+`/fourier-field` consumer migration (the BH-B7 cross-ownership seam — a break otherwise falls between BH-B7 and BG-WS5).
- **WS6 Siri band** (island + waveform + dock-search pill, useDockSpring-gated). KEEP. Minor: ride iOS-27's BRIGHTER STATIC specular at rest (Apple dropped gyroscopic motion-specular).
- **WS9 paper-deep / WS10 de-shadcn / WS11 storybook / WS12 capstone.** KEEP-as-spec'd. WS10 R2 grouped-Select WebKit-dark separation is the load-bearing real-Safari residual. WS11/WS12 are a genuine serial tail (cannot be pulled early — the integration branch IS tranche/BG accreting). WS9 mechanism was user-rejected once → the raster-fallback escape is the named hedge.

### Re-think the SCHEDULE (not the spec) — 5 sequencing amendments, prototype-validated PASS 1

1. **Clear the 4 close reds FIRST in ONE atomic 6-gate sweep** (R1–R4 + glass-cal B3 + glass-depth D3); whole dock-blur chain deleted atomically; decide the N+2 dead-chain depth (full retirement vs ACCEPTED-exempt + schedule-with-WS4-carve); ±2% dock brightness DUAL-engine sign-off; run `--run full` siblings-absent in a FRESH `/tmp` worktree to confirm no 7th red.
2. **Mint a STANDING `closeDisease:true`-manifest per-band sweep** — completeness via a manifest flag enrolling the whole CLASS (the 12→4 re-mint proves a fixed list is brittle); `["local"]` tag (a ci tag RE-SEEDS R3); dual-signal `sweepVerdict` (execSync-throw catches exit-nonzero AND gen-ci-fresh which writes NO JSON; the JSON-status leg catches a future exit-0-on-fail); born-RED anchored to the 4-at-HEAD set; honest ≥2-consumer accounting (BUILD the engine env-export OR drop the "automated" label).
3. **Front-load the C-SAFARI feasibility SPIKE** using the two WS8 waves the spec ALREADY marks field/build-independent (W-GLASS-REFRACT-WEBGL `Precond:independent` + W-GLASS-SUFFUSE `field-independent`), BEFORE the ~50-wave WS5/WS6/WS4 investment. Floor renderability is ESCAPED (Tier-1 WebGL2 squircle-rim refraction proven on real M5 Max Metal); the HARD legs unproven: the actual two-pass `field→FBO→textureSampleLevel(uv+disp)` path (texture filtering/sRGB-sampling/LOD drift), the Δ5 0.02–0.03 chroma fence (the spike's 0.5 rainbow is ~16–25× over — a fixture artifact, NOT the ship target), a NON-author gestalt verdict over WS1's real field, the R3 GPU watchdog, and dark-AA-over-bright-ridge (C12). **The K2 chroma fence (refraction = DEPTH not hue; dispersion 0.02–0.03) is BINDING.**
4. **Complete the WS3 BLOCKING Safari-ceiling rows (3.3/3.4) + move a glass-cascade carve BEFORE WS8** — the carve-order is INVERTED (ladder.css 527 + shell.css 510 over-bound NOW; WS8/WS9/WS10/WS12 grow them further before the WS4 carve discipline runs → no-god-module COMPOUNDS). The carve seams are byte-isomorphic (ladder grain-tail → `glass/grain-overlay.css`; shell placement-tail → `dock/shell-regions.css`; reader gates concatenate so they FOLLOW the carve, zero gate edits). The WS3 spine landed the EASY HALF FIRST (3.1/3.6/3.7 field-independent) — WS8/WS12 read the unbought blocking spine; build it before declaring the spine done.
5. **Incrementalize the BH CLAUDE-delete tail** — author canon homes as each WS lands (the HEAD-snapshot-vs-110-wave accumulation hole: a contract minted by WS5/6/8/9 that appends to CLAUDE.md is SILENTLY LOST at delete). PRIORITIZE re-homing/guarding the **2 ENOENT-crashers** (`proof-claude-structure-sync.mjs:74`, `proof-doc-consistency.mjs:197` — raw `readFileSync`, THROW on a deleted file; a throw in `--run full` can ABORT the whole battery — worse than a red). Make `auditCanonHomes()` content-real (it is existence-only AND RED at HEAD — instrument-chassis README absent). Gate B4f on rg=0 readFileSync sites AND token-present.

### Mechanical CONSUMEs (fire at the cut — the dep tree is leading-edge; the work is the INVERSE of upgrading)

- **FIRE** kf 5.1.0 `DragOptions.snap` (@1129) + `Oscillator` (@2189) — both verified shipped in dist; drop the interim hand-rolled snap-projection in `useDragMorph`, compose Oscillator at the EasingPicker loop + viz idle seams.
- **BUMP** value.js peer floor `^1.0.0`→`^1.2.0` (installed 1.2.0; a ci/release hard-import of `wcagContrastRatio` module-throws on a fresh install resolving <1.2.0).
- **DROP** the dead `perfect-freehand ^1.2.3` peer at WS9 (confirmed absent on disk).
- **DO NOT re-list** the BorderProgress `oklchSpectrum` CONSUME — it is ALREADY DISCHARGED on disk (`spectrum-walk.ts:22` imports `sampleColorRamp`; no live 0.13.0 marker). (Corrects a prior-pass action item.)
- **W-TAILWIND4-IDIOM** = record "evaluated, not applicable" (v4.1 `mask-*` can't DRY the mask-composite border-band; `text-shadow-*` already token-first) so it isn't re-flagged as un-done modernization.

### Identity/SOTA fences to HOLD

WebGL2+WGSL dual-stack (CSS-SVG `feDisplacementMap` is Chromium-only, re-confirmed DEAD on Safari/Firefox 2026); the deliberate calm-blur divergence from iOS-27 (the user's "a hair too much" — but keep the at-rest STATIC specular the brighter iOS-27 register); `contrast-color()` (now Baseline incl FF 146, returns BLACK/WHITE ONLY) flips the SURFACE via `contrast-color(var(--card))` NEVER the warm-amber ink — machine-gate-guard it against the "self-correcting color" auto-ink narrative; the K2 chroma fence is binding.

---

## 3. CONVERGENCE GAPS (what the next steps MUST resolve)

| # | Gap | Why open | Next-step owner |
|---|---|---|---|
| G1 | **C-SAFARI in-situ two-pass refraction within the chroma fence** | The ★★★ 3-wave chronic miss (BE/BE/BF). Floor renderability escaped on Metal, but the actual `field→FBO→textureSampleLevel(uv+disp)` path was NEVER rendered (texture-filter/sRGB-sample/LOD drift unproven); the spike's 0.5 rainbow is 16–25× over the binding Δ5 0.02–0.03 fence; the gestalt was author-graded (forbidden); the R3 GPU watchdog (2880×1800 two-pass N-glass over the WebKit ~2s ceiling) is unprobed; dark-AA-over-bright-ridge (C12) shows content failing 4.5:1. **The single likeliest 4th-time miss at the cut.** | PROTOTYPE P-CSAFARI (implement) |
| G2 | **The ba-gestalt roster reconciliation + close cost** | The keystone is 0/10 (4 stale); the §4 reconciliation (re-point capture paths off the ground anchor + re-stamp + flip verdict) was NEVER executed; as wired, the tag CANNOT fire. The cut is owed ~16 surface-flips × 2 engines × 2 modes — un-prototyped. Confirm G1 `pngDimensions` tolerates Chrome-desktop @1x (1440×900) vs Safari @2x (2880×1800) asymmetry or a strict dimension assert trips at the close. Freshness auto-revoke re-stales surfaces as bands land (4 stale from 3 live-fixes alone) — the §4 re-capture is PER-BAND work, not batched. | PROTOTYPE P-GESTALT (spec) |
| G3 | **The standing closeDisease completeness clause** | SWEEP_SET completeness IS the deliverable (not an OQ) — derive from the class definition ("every device-free meta-gate a wave-diff can clobber while greening its own deliverable") via a `closeDisease:true` manifest flag applied to ALL such gates NOW + a clause asserting `every closeDisease gate ∈ SWEEP_SET`. Reconcile to the 4-at-HEAD born-RED anchor. Re-cost T0/T1 against the COMPLETE set (storybook-complete + ledger-JSON gates push it toward `--run full` cost). `gate-manifest-sound` HEAD-red is `realDefect=FALSE` (π runs overwrite PNGs) — scope it to T2/close, not the per-flip gate. | PROTOTYPE P-SWEEP (spec) |
| G4 | **The 6-gate atomic close-fix recipe + N+2 dead-chain depth** | The cascade-reveal is REAL (verified: glass-cal:173 + glass-depth:79). Decide the clean-break depth: full atomic dock-blur-tier retirement (delete radius+bridge, update dock-shrink-blur S3 / theme blur-dock list / glass-depth FROZEN_BASE_RADII same wave) vs ACCEPTED-exempt + schedule the drain with the WS4 carve. Confirm `--run full` /tmp siblings-absent surfaces no 7th red. | PROTOTYPE P-CLOSE (implement) |
| G5 | **The BH CLAUDE-delete safety + canon migration** | The structure.md PARSER REWRITE (4 §Structure readers parse the CLAUDE.md ASCII box-drawing tree with regexes that match NOTHING in the GENERATED flat-bullet `structure.md` — the single biggest unscoped item). The HEAD-snapshot-vs-110-wave accumulation hole (CANON_TOKENS is a FROZEN HEAD manifest; a contract minted by a later wave is silently lost at delete). The 2 ENOENT-crashers re-homed/guarded FIRST. `auditCanonHomes()` made content-real (existence-only + RED at HEAD). ~28 missing component READMEs + ~85%-owed canon prose. **CORRECTION:** `useBloomUp` is a 15-consumer published primitive → KEEP-IN-PLACE (the B2.4a "single-consumer relocate" premise is backwards). | PROTOTYPE P-CLAUDE-DELETE (spec) |
| G6 | **The field-composited-AA gate (proof:field-aurora) 2nd consumer + born-RED anchor** | Consumer #2 (dock-overview) is UNSOUND: `.dock-label` is FICTIONAL (DockIconButton renders a bare SVG glyph — a graphical-object at 3:1, not text at 4.5:1); the +24px adjacent-patch sampler leaves the small dock plate onto the raw field (confident WRONG ratio). The born-RED LIVE anchor `cb8ecdfc` is POST-fix (re-shooting captures GREEN) — correct to `b3d65eec~1`. Safari field-AA NOT covered (the Chrome-only capture can't see the WebKit composite which collapsed DIFFERENTLY: Safari 1.91/L0.55 vs Chrome 1.04/L0.70). | PROTOTYPE P-FIELD-AA (spec) — if budget |
| G7 | **The viz-subpath cross-ownership seam** | Confirm BG-WS5 carries the SLIDES `/constellation`+`/fourier-field` consumer migration when it drops/renames a key, or a break falls between BH-B7 and BG-WS5. The post-WS12 re-baseline needs a HUMAN PUBLISH-vs-INTERNAL classification call for any novel WS5/WS6 dir the fail-closed regen surfaces. Un-prototyped. | resolve at post-WS12 re-baseline / fold into B7 |

---

## 4. THE PROTOTYPE TASKS (≤6 — chosen to most reduce uncertainty)

The ranking is by *cut-risk × residual-uncertainty*. G1 (C-SAFARI) is the dominant cut-risk → *implement* (needs a real-Metal proof, not prose). G4 (close-fix) is the cheapest, highest-confidence unblock → *implement* (a `/tmp` worktree dry-run proves the 6-gate cascade clears with no 7th red). G2/G3/G5 are design-heavy → *spec* prototypes that converge the contested wiring. G6 is *spec* if budget remains. (The 6 chosen are returned in the structured output.)

---

## 5. CONVERGENCE ACCOUNTING

| Axis | Prior pass | This pass | Driver |
|---|---|---|---|
| WHAT-is-built triage | 92% | **~93%** | 8 lenses concur at the fresh HEAD; all 4 reds + cascade + ba-gestalt 0/10 + cursor counts re-verified live; the dock-saturate "regression" RESOLVED to a ±2% brightness phantom; the oklchSpectrum already-discharged correction; the useBloomUp keep-in-place correction. |
| HOW-the-bulk-converges | 62% | **~62%** | The DAG + 5 amendments are validated; G1/G2/G3/G5 remain design-heavy; the prototypes are scoped but unbuilt this pass. |
| **Blended** | 68% | **70%** | Baseline truth now solid at the FRESH HEAD with the live-fixes incorporated; the 7 gaps are bounded must-resolves with named prototype owners, not open questions. |

**readyToDevelop: FALSE.** The dominant C-SAFARI cut-risk has its floor de-risked but its hard legs (two-pass texture-sample, chroma fence, dark-AA, watchdog) unproven; the ba-gestalt roster reconciliation (as wired, the tag cannot fire) + the close cost are un-finalized; the 4 close reds are confirmed-live and owed an atomic 6-gate fix + a standing per-band sweep.
