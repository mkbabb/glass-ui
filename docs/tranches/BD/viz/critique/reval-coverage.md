# Pass-D D4-CLOSE RE-VALIDATION — spec coverage + gate-realness

**Verdict: PASS (coverage) · PASS (gate-realness) · 1 RESIDUAL (G8a/`rides W-REFLECT3` ambiguity, MINOR).**

Validated against `prototype/liquid-dock` HEAD, 2026-06-22. The PLAN is converged at the SUBSTANCE bar: every named canonical wave has a real spec, the spot-checked gates are genuinely real (numeric-harness-composing / runtime-call-site / measured-with-provenance / source-token-RED), every cited starting-state verifies TRUE on disk, every gate is born-RED on a real code-located defect, and the one ROSTER-named-without-union-file class resolves cleanly to predecessor-tranche specs (not vapor). One MINOR residual: a G8a regex ambiguity the convergence narrative under-states.

---

## AXIS 1 — Spec coverage (every UNIFIED-ROSTER wave has a real spec) — **PASS**

84 spec files in `union/waves/` (83 `BD.W-*` + `W-FOLD-LEDGER`). Cross-check of the 88 bold roster-cell names vs disk:

**Resolved gaps (NOT vapor):**
- **`W-LAVA-FIELD` — RETIRE clean ✓.** No `union/waves/` file (correct). Roster Band-12 row marked `**RETIRED**` with the Pass-D HARD-KILL rationale (no separable lava primitive; goo-dot splices the whole goo-blob field, not a lava sim). The `W-BLOB-LAVA` dep re-point is clean: `BD.W-BLOB-LAVA.md` absorbs the register blob-LOCAL, depends on `W-BLOB-RENAME` (not LAVA-FIELD), and its gate **L4 asserts no hoisted `useLavaField`**. Verified on disk: `useLavaField.ts` absent; `src/composables/motion/` carries no hoist. The retire is the disposition flip the framework wave needed — clean break, gate-locked.
- **`W-ARIA-ORIENTATION-GUARD` · `W-CROSSREPO-ADOPT-SWEEP` · `W-VIZ-PARITY-METAL` · `W-CUT`** — roster-named without a `union/waves/` file, BUT each has a real, substantive canonical-source spec in the predecessor tranche dir its roster row names: `BD/waves/BD.W-ARIA-ORIENTATION-GUARD.md` (129L), `BD/waves/BD.W-CROSSREPO-ADOPT-SWEEP.md` (49L), `BD/waves/BD.W-VIZ-PARITY-METAL.md` (83L), `BF/waves/BF.W-CUT.md`. These are close/discharge/parity waves Pass-D did NOT re-author into the union dir (they were already specced). NOT spec-vapor — a reader of `union/waves/` alone would miss them, but the roster's CANONICAL-SOURCE column points correctly.
- **`W-GATE-TRUTH-AUDIT`** — on disk, in the roster prose/DAG (the #1 prerequisite node), absent only from my bold-cell grep. Real.

**Conclusion:** the P8 "5/6 spec-vapor" gap is CLOSED. The ~49-spec authoring effort landed; the only non-union-dir specs are the 4 close/parity waves that were already authored upstream and pointed-to by canonical-source. No phantom roster row stands over an absent spec.

---

## AXIS 2 — Gate-realness (spot-check of 12 newly-authored specs) — **PASS**

Each spot-checked gate is a REAL gate (numeric / runtime-call / measured / source-RED), cites real file:line starting-state, and is born-RED on a real defect. Every cited starting-state was re-verified against HEAD:

| Spec | Gate kind | Starting-state verified on disk | Born-RED real? |
|---|---|---|---|
| **GATE-TRUTH-AUDIT** | numeric oracle↔shader harness (`shader-eval-harness.mjs`, GATE-WRITTEN ΔE, splice-following, coeff-flip bites) | ✓ `proof-gpu-substrate-single.mjs:~260` reads `row.deltaE`; `gpu-parity-table.md:45,61,77…` carry authored `{0,0}` w/ self-incriminating "DEVICE-FREE STRUCTURAL PROXY … rides W-REFLECT3" notes; `proof-aur-kuwahara.mjs:210` = `!/mediumKuwahara/.test(wgsl)` over the LITERAL file; `aurora.wgsl.ts:39` splices `AURORA_MEDIUMS_WGSL` which DEFINES `mediumKuwahara` (the false-green CONFIRMED) | ✓ 7 clauses born-RED |
| **WAVE-FIELD-HARNESS** | composes the harness; numeric JS↔WGSL↔GLSL round-trip + coeff-flip bites, per-viz bar | ✓ `ringField.ts:66 RING_GRAVITY=9.81`, `flowField.ts:64 FLOW_GRAVITY=9.81` (exact lines); `waveFieldMath.ts`/`proof-wave-field-single.mjs`/`shader-eval-harness.mjs` all ABSENT; **D2 PoC RUNS** — RMS ΔE 1.283e-1 wrong-g / 7.514e-1 sign-flip / 7.268e-3 sub-2% MISSED-at-0.02, identical 0.0 (numbers match RESULTS.md exactly) | ✓ |
| **AUR-METAL** | composes harness, M2 numeric ΔE + 2-frame temporal sample (boil-vs-twinkle), splice-following, coeff-flip bites a-k, no deletion bite | ✓ `mediums.glsl.ts:52-53` Sobel `Gx,Gy` computed, `:89 return vec3(dir,A)` DISCARDS N; `presets.ts:75 AuroraMedium` ends at `"kuwahara"` (satin/prism/metal absent — dep correctly flagged) | ✓ |
| **BLOB-EMOTION** | `import()`s + EVALUATES `paramsFor`, param-DISTANCE MATRIX (≥3-axis sep/pair), `.test(/valence/)` FORBIDDEN | ✓ `goo-blob/constants.ts:64-70` `paramsFor` drives orbitSpeed/wobble/pulse/noise ALL off `arousal`; valence→hue/sat/brightness only; MOOD_AVA points match; HEAD CALM↔MELANCHOLY motion-dist 0.166 baseline real | ✓ E1+E2 |
| **DOCK-INTEGRATE** | RUNTIME-CALL-SITE (`useDockFission(` w/ `(`, guarded), C7 compositor-only cross-check, NEVER a type-literal | ✓ `GlassDock.vue` constructs only `useDockState`+`dockMorphContext` (2/5); `useDockContextSilhouette` 0 runtime call-sites (def+doc only); `useDockLink.ts` absent; `proof-dock-context.mjs` is `release`-tagged regex over the dead source (the false-green CONFIRMED) | ✓ |
| **FLIP-SPINE** | numeric rAF-driver COUNT (comment-stripped, 1-driver/4-zero), presence-regex explicitly barred | ✓ all 4 bloom impls carry 2 live `requestAnimationFrame(` each; `useElementBloom.ts` absent; honestly accounted NET-NEW | ✓ S1 |
| **DESHADCN-GATE** | extends `proof:no-shadcn-default` IN-PLACE; W4 drive-off-REDS (non-empty-at-HEAD anti-vacuous); pairs source-regex + oklab paint-π | ✓ `text-popover-foreground ×9` exact; `ToastClose.vue:24` raw `text-red-300/-50`; FORBIDDEN list has no `text-*` axis | ✓ W1-W3 |
| **GOO-SPLIT-PERF** | MEASURED p50 (`local`-only real-Safari-Metal); G2 source-cross-check captured-features-match-shipped (stale-source bite); explicitly names authored-0.0 anti-pattern | ✓ gate/baseline absent; correctly `local`-tagged (un-automatable real device) | ✓ |
| **DOT-UNIFY** | B1 no runtime god-branch, B3 single-leaf, B4 HARDENS dotflow parity via harness + corrects `gpu-parity-table` `verified 0.0`→`degraded` for divergent render | ✓ honest scope (RE-WRITE 3 mechanisms, not 1 rasterizer); FIELD round-trip admitted genuinely-0.0, RENDER pair `degraded` (the nuance that separates real from theater) | ✓ B1-B5 |
| **REFLECT** | CONFIRM-not-first-flip; drives existing `proof:ba-gestalt`; G8 context-aware deferral scan (no new gate) | ✓ `proof-ba-gestalt.mjs` G8a + freshnessVerdict exist; correctly carries NO own born-RED (it never first-flips) | ✓ ("What is RED before this wave") |
| **GLASS-IOS27** | drives residue off WIDENED `proof:no-shadcn-default` REDS (not hand-list); button-LOCAL rim re-point | ✓ `proof-no-shadcn-default.mjs:72-143` RAN green over 8 narrow tokens; rim at `surfaces.css:200-202`/`glass-fx.css:70,88-89`; `:root` byte-untouched | ✓ |
| **CORNER-AA** (12th, the smallest at 40L) | canonical-row POINTER → SOURCE `W-CORNER-AA-WIDEN.md` (84-file set incl. it); binds iOS-27 "flatter" as C7 | ✓ `grep -c clip-path glass/ladder.css` = 0 at HEAD (cited defect real); the b538dec7 lost-fix + AX.W56 corner-shape fence cited | ✓ |

**No presence-regex sneaked back in as a PRIMARY parity proof.** A suite-wide scan found ZERO parity-claiming spec relying on `.test(/fn name/)` as its gate — every numeric-parity spec composes `shader-eval-harness`; every "parity" mention in BLOB-RENAME/LENS-SAFARI/SAFARI-*/VIZ-CONFIGURATOR is engine-capture or byte-identical-render parity, not numeric ΔE (no harness owed). VIZ-PERF-BUDGET (the "number-free" risk) names the F2 placeholder defect explicitly and requires a measured p50 + eval-count→cap derivation grounded in the D2 10.21ms spike.

**No stub specs.** Smallest is 40L (CORNER-AA, a deliberate row-pointer). Every spec carries a born-RED/What-reds clause except W-REFLECT (correct — it is the CONFIRM-not-first-flip terminal sweep with no own first-flip).

---

## AXIS 3 — Residuals / stubs / hand-waved-gates / uncomputable-number-claims

**1 MINOR residual (G8a / `rides W-REFLECT3` ambiguity):**

The REFLECT + GESTALT-WIRE narrative claims the BD corpus carries ZERO forward-deferral and uses only "W-REFLECT re-confirms" (no `rides` verb, no digit). TRUE for 58 specs. BUT **9 union specs say "rides W-REFLECT3"** in plain prose (AUR-METAL/-SATIN/-PRISM/-INTERACT, GATE-TRUTH-AUDIT, FLIP-SPINE, PI-AUTHOR, VH-COMPOSE, VIZ-TAILS). The live G8a regex `/\brides?\s+(?:the\s+)?W-REFLECT\d/i` **MATCHES "rides W-REFLECT3"** (verified by node), and these occurrences are NOT inside a backtick/quote span (so G8a-exempt-1 does not save them) nor a RETIRE-context line (G8a-exempt-2 N/A).

WHY it is MINOR, not load-bearing:
- The shipped `proof-ba-gestalt.mjs` is hard-coded to scan `docs/tranches/BC/waves` (`:72`), NOT `BD/union/waves` — so today these lines are INVISIBLE to G8a. They become G8a-relevant only AFTER `W-GESTALT-WIRE` re-points `WAVES_DIR` to `BD/union/waves` (its specced edit, byte-untouching the G8a machinery).
- Semantically these are the BC-historical "LOCAL-only real-GPU π" tag (the local-π RUNS at the wave's OWN close; the wave's gestalt VERDICT is self-owned — "the proof:ba-gestalt aurora verdict gains a satin row"), NOT a forward-deferral of the verdict. The intent is honest; the PHRASING collides with the regex.

The RESIDUAL: after the re-point, either (a) these 9 lines RED G8a on the re-pointed scan (a self-inflicted false-positive the convergence under-states), or (b) `W-GESTALT-WIRE`/the build must scrub "rides W-REFLECT3" → a non-matching phrasing (e.g. "the LOCAL real-GPU π at this wave's close") OR narrow the regex to `W-REFLECT\b`(no-digit, BD's terminal) / add a "W-REFLECT3"-historical exemption. The convergence docs assert "the BD corpus carries zero such deferral" — which over-states; the 9 `W-REFLECT3` lines are a real regex hit the re-point will surface. **Recommendation:** name this in `W-GESTALT-WIRE` (the re-point owner) as a scrub-or-narrow build step, or correct the REFLECT G8 claim to acknowledge the `W-REFLECT3`-historical-tag carve.

**No other residuals found.** No stub, no hand-waved gate, no number a gate cannot compute (the D2 PoC proves the numeric half runs <1s; the shader arm is named mechanical-not-research with a headless-gl fallback; the perf/goo budgets are honestly `local`-only measured-device).

---

## What HOLDS at the substance bar (the convergence's real value)

- The #1 finding (numeric-axis theater) is code-VERIFIED: the authored `{0,0}` keystone, the aur-kuwahara splice false-green, the concentric name-presence round-trip all reproduce on disk EXACTLY as specced.
- The dock charter-over-dead-code is VERIFIED: GlassDock composes 2/5 engines, silhouette has 0 call-sites, `proof:dock-context` is release-tagged over the corpse.
- The numeric harness is DE-RISKED by a RUNNING PoC, not doc-reasoning.
- Every gate names a number it can compute (or a measured-device capture it honestly tags `local`), bans deletion-bites in favor of coefficient-flips, requires per-viz bar calibration, and explicitly names the anti-pattern it must not become.

The PLAN is converged at the substance bar. The implementation is a gated, de-risked, truthfully-gated build — not a leap over authored zeros.
