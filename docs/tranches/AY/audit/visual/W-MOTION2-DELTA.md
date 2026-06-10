# AY.W-MOTION2 — DELTA (curve-gallery own-surface live capture)

**Wave:** AY.W-MOTION2 — the FULL keyframes.js suite + the complete curve library, first-class in `/motion`.
**Route audited:** `/motion/curve-gallery` (the net-new story this wave ships).
**Viewports:** desktop 1280×800 + mobile 390×844, each × {light, dark} (the cardinal ≥2-viewport × {light,dark} floor).
**Verdict:** PASS — the CSS↔JS curve table renders live; the JS twins drive the dots WITH their declared overshoot; the value.js edge stays OFF `/motion`.

## MOVE 0 — the keyframes.js dev pin bump (W-MOTION2-FINISH, the owed BLOCKING remainder)

The honest-partial remainder closed: `package.json` devDependency `@mkbabb/keyframes.js` bumped
`^2.2.0` → `^4.1.0` (the PEER range `^2.2.0 || ^3.0.0 || ^4.0.0` already admitted 4.x — unchanged
per the scope fence; `proof:peer-conformance` + `proof:package` both check the peer matrix, not the
dev pin, so the bump is transparent to them — re-run GREEN). `npm install` re-locked (package-lock
now records the `^4.1.0` spec resolving 4.1.0; value.js stays 0.10.0). The three constructed classes
(`SpringProgress` ·9 sites incl. `useSpring`/`useBlobPointer`/`dockMorphContext`/`useLayerTransition`,
`SmoothProgress` ·`useAnimatedNumber`, `NumericAnimation` ·`useNumericTransition`/`useCountup`/
`GlassUnderline`) and every callable-`timingFunction` site survive the bump unchanged — `vue-tsc`
src arm exit 0, the 25 motion unit tests GREEN. (The lone `tsconfig.test.json` failure is in
`tests/components/custom/underline/GlassUnderline.test.ts:157` — a `.get(...).exists()` `@vue/test-utils`
DOMWrapper-API misuse in the ADJACENT W-UNDERLINE lane's test, zero keyframes surface, pre-existing,
out of this lane.)

## Own-surface screenshots

- `W-MOTION2-curve-gallery-desktop-light.png`
- `W-MOTION2-curve-gallery-desktop-dark.png`
- `W-MOTION2-curve-gallery-mobile-light.png`
- `W-MOTION2-curve-gallery-mobile-dark.png`

Each renders the `MOTION_CURVES` canonical rows: the CSS token name (`--spring-snappy`),
the JS twin name (`springTimingFunction(0.35, 0.65)`), the kind badge (SPRING / BEZIER),
the register note, the curve plot (from the JS twin), and the driven dot. Dark re-resolves
the warm-cream → dark substrate through the token cascade (no `.dark` re-declaration); mobile
collapses the small-multiples grid to one column at 390-width.

## The JS-half is the source of the motion (the wave's headline)

The dots are driven by the `MOTION_CURVES[token].js` callable per rAF (spring rows sample the
keyframes.js `Easing.fn`; bezier rows the value.js `TimingFunction`) — NOT a CSS easing string.
The foundations/motion page is the CSS-half tour; this gallery is the JS-half witness.

## rAF-sampled timing frames (the `--spring-snappy` driven dot, live)

The snappy dot travels a 280px track driven by its JS twin. 9 rAF frames captured on the
desktop-light pass:

| t (ms) | translateX (px) | of 280px track |
|--------|-----------------|----------------|
| 20  | 25.25  | 9.0%  |
| 87  | 209.01 | 74.6% |
| 194 | **298.10** | **106.5% (overshoot past the track)** |
| 304 | 280.68 | 100.2% |
| 420 | 279.31 | 99.8% |
| 520 | 280.07 | 100.0% |
| 587 | 280.00 | 100.0% (settled) |
| 637 | 280.00 | 100.0% |
| 670 | 280.00 | 100.0% |

The dot overshoots the track to **106.5%** at 194ms then settles to exactly 280px — the +6.8%
snappy overshoot the curve DECLARES, RENDERED by the JS twin (not a flat 100% glide).

## Paired-π — the analytic JS-twin readback (from the POST-BUMP `dist/motion-curves.js`)

The MOTION_CURVES twins, sampled directly off the freshly-built dist (keyframes.js 4.1.0) — the
numbers the live dot tracks. 100-step sweep peak + the settle value:

| token | twin | sampled (post-bump) |
|-------|------|---------|
| `--spring-snappy` | `springTimingFunction(0.35, 0.65)` | **peak +6.69%** @ t=0.17, settles 1.0000 (declared +6.8%) |
| `--spring-bouncy` | `springTimingFunction(0.5, 0.45)` | **peak +20.47%** @ t=0.14, settles 1.0000 (declared +20.5%) |
| `--spring-dock` | `springTimingFunction(0.32, 0.7)` | **peak +4.51%** @ t=0.17, settles 1.0000 (declared +4.6%) |
| `--motion-ease-standard` | `CSSCubicBezier(.4,0,.2,1)` | fn(0.5)=0.7756, fn(1)=1.0000 |

**Row count:** 22 MOTION_CURVES rows (10 canonical + 12 alias — full CURVE-TABLE-BOUND coverage).
**Alias resolve-through verified (identity, not a duplicate twin):**
- `MOTION_CURVES["--ease-spring"].js === MOTION_CURVES["--spring-snappy"].js` → `true`
- `MOTION_CURVES["--ease-spring-smooth"].js === MOTION_CURVES["--spring-smooth"].js` → `true` (the theme.css @theme quartet alias resolves through too).

The live rendered overshoot (106.5% of track at 194ms) matches the analytic snappy peak (+6.7%) —
the JS half and the CSS half (the `--spring-snappy` `linear()` token, also solved from the SAME
(0.35, 0.65) pair via `springLinearStops`) are ONE curve.

## §2.2 value.js static-edge — the MEASUREMENT (recorded, decided)

Re-exporting the value.js `ease*` family from `/motion` adds a static value.js edge to
`dist/motion.js`'s eager graph. Both arms measured (`npm run profile:bundle`):

| arm | dist/motion.js | value.js edge | dist/motion-curves.js |
|-----|----------------|---------------|-----------------------|
| baseline (pre-wave) | 3789 raw / 1540 gzip | NONE | — |
| (a) curves ON /motion | 8554 raw / 3025 gzip | **YES** (1 static `@mkbabb/value.js` import) | — |
| **(b) CHOSEN — curves on the /motion-curves sibling** | **4815 raw / 1966 gzip** | **NONE (value.js-free)** | 3880 raw / 1317 gzip |

**Chosen: arm (b) — carve the curve library to the flat value.js-bearing sibling `@mkbabb/glass-ui/motion-curves`** (the `/color`-leaf pattern). Decisive: value.js is a ~124 KB peer with NO granular `/easing` sub-entry, and `/motion`'s composables are value.js-FREE — arm (a) would drag value.js onto every `/motion` import's eager graph (the AP.W3 "a cheap import must not drag a heavy peer" carve). **Gate-enforced:** the EXISTING `proof:motion-value-free` gate stays GREEN under arm (b) (it would have RED'd arm (a)); the net-new `proof:motion-suite` VALUE-FREE-MOTION arm re-asserts `dist/motion.js` has zero static value.js import. `/motion` grew only +429 gzip (the keyframes suite re-export, value.js-free).

## Gates green (post-bump re-verification — W-MOTION2-FINISH)

All gates re-run against the BUMPED install (keyframes.js 4.1.0) + the freshly-rebuilt dist:

- `proof:motion-suite` PASS — STATIC 24/24 present on `/motion`; DYNAMIC 16/16 reachable through `loadAnimationEngine()` + 0 leaked-static; `/motion` value.js-free; 22 `--ease-*`/`--spring-*` tokens swept = 22 MOTION_CURVES rows (full CURVE-TABLE-BOUND coverage); NO-FORK (references `springTimingFunction` + `CSSCubicBezier`, no inline stops); VERSION STAMP keyframes.js 4.1.0 / value.js 0.10.0.
- `proof:spring-tokens-synced` PASS — dock spring const/preset both (0.32, 0.7), derived overshoot 0.046, 0 stale comments (re-pointed to the single-source `springPresets.ts`).
- `proof:motion-value-free` PASS — 4 files checked, 0 value.js/HEAVY-edge imports.
- `proof:animation-coherence` PASS — 0 hand-rolled easing forks across 249 surfaces, 22 MOTION_CURVES tokens recognized, one motion source.
- `proof:peer-conformance` PASS — peer range admits keyframes 4.1.0 + value 0.11.2; dual-instance safe.
- `proof:package` PASS — keyframes peer-matrix [2.2.0, 3.0.0] ⊆ range.
- `verify-export-types` PASS — resolves `/motion-curves` + all subpath dts.
- `npm run build` exit 0 (660ms vite arm + dts arm; flatten 60 subpath dts).
- `vue-tsc --noEmit` (src arm) exit 0. The one `tsconfig.test.json` error is the adjacent W-UNDERLINE lane's `GlassUnderline.test.ts:157` `.get().exists()` test-API misuse (zero keyframes surface, out of this lane).
- 25 motion unit tests GREEN (incl. `curves.test.ts` + `suite.test.ts`).
- Live recapture: curve-gallery captured both modes × both viewports off the rebuilt dist; 10 glass-cards (the 10 canonical rows) render in each; mobile collapses `sm:grid-cols-2` → one column; dots driven by the JS twin per rAF.
