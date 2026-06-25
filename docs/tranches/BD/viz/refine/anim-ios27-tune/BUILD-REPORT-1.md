# BUILD-REPORT-1 — W-ANIM-IOS27-TUNE: the GLOBAL iOS-27 motion re-calibration

**Wave:** BD.W-ANIM-IOS27-TUNE
**Date:** 2026-06-23
**Directive:** "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy. Smooth, FLOWING, GOOEY. MORPH MORE on move." A GLOBAL re-tune of the ONE motion register — the `SPRING_PRESETS` table + the `--spring-*` clocks + the squish caps + the `.glass-reveal` entrance — toward the iOS-27 weighty-gooey-inertial pole.

---

## 1. WHAT BUILT (the SHARED re-tune through the ONE pipeline — no fork, no second engine)

### A. The spring table (the headline edit) — `src/composables/motion/springPresets.ts`
All SIX `(response, ζ)` rows re-tuned in lockstep + the header doc-block + per-row comments rewritten (the BC "crisp/quick" pole retired; the byte-frozen KEEP fence retired):

| preset | HEAD (resp/ζ) | **NEW (resp/ζ)** | live overshoot | live clock |
|---|---|---|---|---|
| smooth | 0.50 / 0.86 | **0.58 / 0.80** | **+1.51%** | 0.45s |
| snappy | 0.42 / 0.78 | **0.48 / 0.74** | **+3.15%** | 0.40s |
| bouncy | 0.50 / 0.55 | **0.60 / 0.60** | **+9.34%** | 0.62s |
| gentle | 0.70 / 1.00 | **0.82 / 1.00** | **0.00%** | 0.51s |
| dock | 0.56 / 0.58 | **0.68 / 0.64** | **+7.30%** | 0.66s |
| press | 0.15 / 0.86 | **0.20 / 0.80** | **+1.51%** | 0.16s |

Every overshoot ∈ [0%, 10%] (the un-pointed "touch of overshoot" band); every non-gentle settle lengthens vs HEAD (the inertia floor); gentle ζ stays 1.0.

### B. The regen (required emit, never hand-set) — `scripts/regen-spring-tokens.mjs` → `src/styles/tokens/scheme-motion.css`
Ran `node scripts/regen-spring-tokens.mjs`. Re-emitted the 6 `--spring-*` `linear()` curves + the 6 `--spring-*-duration` 2%-band clocks from the table. `MOTION_CURVES` (curves.ts) JS twin re-derives at import (no separate edit). Idempotent (a re-run produces byte-identical output).

### C. The squish caps (MORPH MORE on move — the deformation)
| knob | file | HEAD | NEW |
|---|---|---|---|
| `useLiquidFlex` default `maxStretch` | `src/composables/motion/useLiquidFlex.ts:142` | `?? 1.08` | **`?? 1.14`** |
| tabs `DEFAULT_INDICATOR_MAX_STRETCH` | `src/components/custom/tabs/constants.ts:19` (+ JSDoc + README mirror) | `1.15` | **`1.18`** |
| `--tab-indicator-max-stretch` | `src/styles/tokens/scale-paper.css:57` | `1.15` | **`1.18`** |
| `--dock-morph-max-stretch` | `src/styles/dock/density.css:68` (+ `dock/shape.css:102` comment) | `1.08` | **`1.14`** |

`squishK` (1.6), `useLiquidPress` (1.04), `useLiquidMorph` (1.08/1.1) KEPT (the cap is the lever, not the curve — the ONE engine, volume-preserving, no second `1+tanh()` write).

### D. The `.glass-reveal` entrance — `src/styles/glass/reveal.css`
- Declared `--glass-reveal-enter-scale: 0.88` at the `.glass-reveal` block (the explicit authority).
- The closed/exit-leg fallback `0.95 → 0.88` (the materialize squish-grow now READS — the Control-Center round-toggle bloom).
- SPATIAL legs KEEP `--spring-snappy` (the re-tuned snappy IS the new graceful weighty bloom — no register switch, no fork onto bouncy). EXIT stays `--ease-out` no-overshoot. PRM carve unchanged.

### E. The drawer snap — `src/components/ui/drawer/constants.ts:25`
`DRAWER_SNAP {0.4, 0.82} → {0.50, 0.74}` (its OWN clock, NOT a `SPRING_PRESETS` row): +25% settle (inertial mass, the Maps-card reference) + a small ~3.2% liquid overshoot, ζ ≥ 0.72 so it lands cleanly without over-flinging past the viewport. `DRAWER_FLING_VELOCITY` separate + unchanged.

### F. The gate re-baseline (born-RED → GREEN in place, no new gate/KEY)
- **`scripts/proof-spring-ease.mjs`** — S2 `OVERSHOOT_MAX` re-baselined (`snappy 0.05 / press 0.03 / smooth 0.03 / dock 0.10`) + a NEW universal `OVERSHOOT_CEILING = 0.10` loop over ALL presets in `detectOvershoot`; `BOUNCY_OVERSHOOT_BAND [0.12,0.18]→[0.07,0.10]`; `BOUNCY_ZETA_FLOOR 0.55→0.58`; S1 `SNAPPY_90_TRAVEL_BAND [0.55,0.70]→[0.45,0.62]`; S4 `KEEP_PAIRS` re-anchored to the new canon (smooth/dock/gentle) + the self-test fixture + S4 drift-seed re-pointed to the NEW smooth ({0.58,0.80}→{0.58,0.65}); S3 `PRESS_PAIR {0.15,0.86}→{0.20,0.80}` + the press-clock literal `0.11s→0.16s`; the header doc-block rewritten to the new pole.
- **`scripts/proof-spring-tokens-synced.mjs`** — the dock band re-anchored to `{0.68,0.64}`: `DOCK_RESPONSE/DOCK_DAMPING`, the response/ζ bands (`[0.62,0.74]`/`[0.58,0.68]`), the overshoot band (`[0.05,0.10]`), the STALE_PATTERNS (added `(0.56,0.58)` as new-stale), the positive-confirmation (`0.68`/`0.64` present in the dock row).
- **`scripts/proof-dock-engine.mjs`** — E2 analytic-envelope `DOCK_RESPONSE/DOCK_DAMPING` updated to the REAL `{0.68,0.64}`; E4 rewritten to assert DOCK_SPRING DERIVES from `springPreset("dock")` (the single-source fence — the const is no longer a literal) AND the resolved pair is `{0.68,0.64}`; the E4 self-test bite updated to bite a forked-literal regression.

---

## 2. FILE-TOUCH MANIFEST (my edits ONLY)

| file | edit |
|---|---|
| `src/composables/motion/springPresets.ts` | the 6-row table → new pole + comments + header doc-block |
| `src/styles/tokens/scheme-motion.css` | REGEN OUTPUT (6 curves + 6 clocks) |
| `src/composables/motion/useLiquidFlex.ts` | `?? 1.08` → `?? 1.14` |
| `src/components/custom/tabs/constants.ts` | `1.15` → `1.18` + JSDoc |
| `src/components/custom/tabs/README.md` | the stretch mirror `1.15` → `1.18` |
| `src/styles/tokens/scale-paper.css` | `--tab-indicator-max-stretch: 1.15` → `1.18` |
| `src/styles/dock/density.css` | `--dock-morph-max-stretch: 1.08` → `1.14` |
| `src/styles/dock/shape.css` | the `~1.08` comment → `~1.14` |
| `src/styles/glass/reveal.css` | declare `--glass-reveal-enter-scale: 0.88` + fallback `0.95`→`0.88` |
| `src/components/ui/drawer/constants.ts` | `DRAWER_SNAP {0.4,0.82}` → `{0.50,0.74}` |
| `scripts/proof-spring-ease.mjs` | the §4 gate re-baseline |
| `scripts/proof-spring-tokens-synced.mjs` | the dock band re-anchor to `{0.68,0.64}` |
| `scripts/proof-dock-engine.mjs` | E2 envelope pair + E4 single-source/pair re-anchor |

NO new primitive, NO second spring family, NO second squish engine, NO new `--spring-*` alias, NO legacy/dual.

---

## 3. LIVE VERIFICATION (chrome-devtools-mcp, http://localhost:5173, both modes)

### Tokens (live `getComputedStyle` on the running app — the painted truth)
```
--spring-smooth = linear(...) 0.45s   peak 1.0151 (+1.51%)
--spring-snappy = linear(...) 0.40s   peak 1.0315 (+3.15%)
--spring-bouncy = linear(...) 0.62s   peak 1.0934 (+9.34%)
--spring-gentle = linear(...) 0.51s   peak 1.0000 (0.00%)
--spring-dock   = linear(...) 0.66s   peak 1.0730 (+7.30%)
--spring-press  = linear(...) 0.16s   peak 1.0151 (+1.51%)
--tab-indicator-max-stretch = 1.18
--dock-morph-max-stretch    = 1.14
--glass-reveal-enter-scale  = 0.88 (resolved on a .glass-reveal[data-state=closed]; closed scale = 0.88)
--spring-deck (deck alias)  = the re-tuned --spring-smooth (0.45s) ✓
```
Every overshoot ≤ 10%, every clock lengthened, gentle 0% — the new pole, on the live page.

### Gestures / feel (real interaction, frame-series)
- **/motion/springs — spring playback:** the travelling-dot specimen overshoots its target X (360→**364.65 peak**→settles to 360) then settles — a clear gooey overshoot-and-settle, weighty arrival ~200ms, settle ~400ms. NOT a tight snap. The page comments show the new "weighty / inertial / gooey" prose.
- **/display/buttons — the press (`--glass-btn-press-t` on a glass `<Button>`):** rises 0.10→0.53→0.84→0.95→**1.008** (the +1.5% overshoot peak ~120ms), release decays 0.70→0.30→0.12→0.01→**-0.015** (the tiny alive inertial undershoot/rebound), settles to 0 by ~390ms. The new weighty 0.20/0.80 register reads.
- **Interruptible press (mid-release re-press):** press 0.95 → release decay 0.70→0.39→**0.13** → RE-PRESS mid-decay → re-targets from the live 0.13→0.31→0.61→0.87 (velocity-continuous, NO restart-from-zero jump) → release → -0.013. The iOS interruptible contract holds on the new register.
- **/motion/deck — goo-morph + slide settle:** the deck loads (1/6 "Welcome"); `--spring-deck` resolves to the re-tuned smooth (0.45s). The `--pager-worm-flow` goo-morph worm token is INDEPENDENT of `--spring-*` (its own `linear()`), so the spring re-tune does NOT regress the worm.
- **/dock/overview + /dock/morph-showcase:** the collapsible dock + the V↔H morph stage render warm glass over the live field; the morph clock is the re-tuned `--spring-dock` (0.66s, +7.3%). E2 analytic envelope (live-equivalent) midpoint travel 1.015 over the 0.662s clock — fills the clock, no dead plateau.
- **/navigation/tabs:** the SegmentedTabs + the V↔H morph dialog bloom in via `.glass-reveal` (the 0.88 deeper materialize-squish); `--tab-indicator-max-stretch` = 1.18 live.

### Screenshots captured (docs/tranches/BD/viz/refine/anim-ios27-tune/)
- `after-springs-light.png` — the spring showcase, new "weighty/inertial" prose visible
- `after-dock-overview-light.png` — collapsible dock + warm glass over the field
- `after-deck-light.png` — the deck (deck transition on re-tuned smooth)
- `after-tabs-light.png` — tabs + the `.glass-reveal` V↔H morph dialog (0.88 bloom)
- `after-buttons-light.png` — the glass CTA press register, warm lit glass
- `after-buttons-dark.png` — dark luminous-transmissive material (motion mode-invariant — no color change)
- `after-morph-showcase-light.png` — the V↔H liquid-glass dock morph stage

### Modes / Safari
- **Dark mode:** springs/stretch tokens are mode-invariant (`--spring-dock-duration` 0.66s, `--tab-indicator-max-stretch` 1.18 identical under `.dark`) — motion is not a color; the warm-glass material is untouched.
- **Safari/WebKit:** the re-tune emits only standard `linear()` easing (Baseline 17.2+) + compositor-only `transform`/`opacity`/`filter` (the blur-settle rides `filter`, NOT per-frame `backdrop-filter`) — paints on WebKit. No WebKit-specific code path changed.
- **PRM:** the loaded stylesheets carry the `prefers-reduced-motion: reduce` `.glass-reveal` scale→none carve + the universal `transition-property` carve; the squish PRM-snap is at the JS spring level (`respectReducedMotion` → `--stretch` 1). `proof:no-layout-animation` GREEN (the universal-PRM-carve assertion). My edits changed values only — the PRM structure is byte-unchanged.

---

## 4. GATES

| gate | result |
|---|---|
| `proof:spring-ease` | **PASS** — S1 snappy 90%-travel 0.5275 ∈ [0.45,0.62]; S2 overshoots {smooth 0.0152, snappy 0.0315, bouncy 0.0948, gentle 0, dock 0.073, press 0.0152} all ≤0.10; S3 press [0.2,0.8] + reads row; S5 clocks exact; S6 0 abrupt legs |
| `proof:spring-tokens-synced` | **PASS** — dock (const/preset) (0.68,0.64), derived overshoot 0.073, 0 stale comments |
| `proof:dock-engine` | **PASS** — E2 midpoint 1.0153 (≥0.40), plateau 0.19 (<0.35), clock 0.662s; E4 single-source + (0.68,0.64) |
| `proof:liquid-reveal` | **PASS** — R1-R5 (the .glass-reveal recipe + exit no-overshoot + PRM) |
| `proof:liquid-morph` | **PASS** — M4 layout-legs=0, clip-path morph; M5 delta/perf |
| `proof:liquid-tab` | **PASS** — all self-test bites fire |
| `proof:no-layout-animation` | **PASS** — 0 layout-property animations off the allowlist; compositor-only + universal PRM carve |
| `proof:no-gray` | **PASS** — the warm-chroma floor holds (motion-only wave; material untouched) |

---

## 5. TYPECHECK + SIBLINGS + A11Y

- **`npx vue-tsc --noEmit -p tsconfig.json`** — CLEAN, no new `error TS` (empty grep).
- **`node scripts/verify-siblings-intact.mjs --quiet`** — OK (no parked/missing siblings).
- **A11Y:** AA text contrast unchanged (motion-only — zero `--card`/`--neutral-*`/`--foreground`/saturate edit; `proof:no-gray` GREEN). PRM-carved (the reveal scale→none + the universal transition-property carve + the JS spring `respectReducedMotion` snap). Compositor-only (transform/opacity/filter — no layout-property animation; `proof:no-layout-animation` GREEN).

---

## 6. PRE-EXISTING WORKING-TREE NOTE (out of scope — NOT this wave)

`proof:animation-coherence` reports `src/components/custom/pager-dots/PagerDots.vue:321` — a `--pager-worm-flow: linear(...)` goo-morph worm literal. This is a **separate BD wave's (BD.W-PAGER-GOO-MORPH) uncommitted working-tree change** (NOT in HEAD, NOT in my diff — my diff added ZERO `linear()` literals). It is the goo-morph worm path token, independent of `--spring-*`, and is that wave's concern to allowlist in `proof:animation-coherence`. My motion re-tune does not introduce, touch, or regress it. The spec's §8 expectation that `proof:animation-coherence` stays GREEN "re-tune in place, no duplicate alias" holds for MY changes — the failure is attributable to the in-flight sibling wave, not the spring re-calibration.

---

## 7. ACCEPTANCE (per BUILD-SPEC §9)

1. **Table re-baked** — ✓ live overshoots ∈ [0%,10%], every non-gentle settle ≥ HEAD, t90 mid-clock; `proof:spring-ease` + `proof:spring-tokens-synced` GREEN.
2. **Squish caps lifted** — ✓ useLiquidFlex 1.14, tabs 1.18, dock-morph 1.14, entrance 0.88; volume-preserving; `proof:no-layout-animation` GREEN.
3. **NO REGRESSION** — ✓ dock morph clock fills (E2 1.015); tab indicator stretch 1.18 live; goo-morph worm independent of springs; press interruptible (mid-release re-press re-targets velocity-continuous); reveal blooms from 0.88.
4. **Smoother across the board** — ✓ the live frame-series read weighty/gooey/un-pointed (the press overshoot+rebound arc, the spring-specimen overshoot-and-settle); the new prose names the pole.
5. **Safari-compatible** — ✓ standard `linear()` (Baseline 17.2+) + compositor-only `filter` blur; no WebKit path changed.
6. **PRM-carved** — ✓ reveal scale→none + universal transition-property carve + JS spring snap; `proof:no-layout-animation` GREEN.

**The user directive is decisively met:** the ONE motion register is re-calibrated to the iOS-27 weighty-gooey-inertial pole — longer settle (inertia/weight), an un-pointed touch of overshoot (the gooey settle, ≤10%), more squish on move (1.14/1.18 caps, 0.88 reveal), the kept audacious arrival (t90 mid-clock). A single table edit, re-derived in lockstep through the drift-proof pipeline. No fork, no legacy, compositor-only, PRM-carved, Safari-safe.
