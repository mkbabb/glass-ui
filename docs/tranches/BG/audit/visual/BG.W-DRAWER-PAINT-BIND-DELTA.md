# BG.W-DRAWER-PAINT-BIND — paint DELTA (dual-engine, both modes)

**Wave:** F5.R2 · BG.W-DRAWER-PAINT-BIND (IOS27-MOTION-TRUTH repair — P0 of the drawer chain)
**Route:** `/compositions/drawer-live-behind`
**Judge:** non-authoring paint judge · 2026-07-04
**Verdict:** **PASS** — all three π criteria clear in BOTH engines and BOTH modes; born-RED cleared; NO-MASKING-FALLBACK verified.

---

## Method (the LIVE-GESTURE π series — NEVER a settled capture)

The pass-condition mandates a **live drag/release gesture series**, so both engines were driven with a real/synthetic pointer gesture on the drag handle and the `--glass-drawer-t` scalar + composited `translateY` were read **per frame**, not screenshotted at rest.

- **BUILT bytes:** `npm run demo:dist:build` → `npm run demo:dist:serve` on `:5200`. Siblings tripwire (`scripts/verify-siblings-intact.mjs --quiet`) exit 0 before + after.
- **Chrome / Blink (authoritative frame series):** playwright chromium, real `page.mouse` gesture (genuine PointerEvents + working `setPointerCapture`), a per-`requestAnimationFrame` sampler reading `el.style['--glass-drawer-t']` + `getComputedStyle(el).transform` (DOMMatrix `m42`). GL_RENDERER = `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0)), SwiftShader driver)`. Driver: `drawer-gesture-v2.mjs`.
- **Safari / WebKit (system WebKit.framework, Metal):** off-screen WKWebView **hosted in an on-screen window so the CADisplayLink drives rAF at 60fps** (a window-less WKWebView SUSPENDS rAF, freezing the spring). Opens `#detent-half`, drives a synthetic pointer drag (pointermove writes the scalar SYNCHRONOUSLY — no rAF needed), then a `setInterval` post-release sampler catches the spring settle; reads all state via `evaluateJavaScript`. Harness: `wkshot-drawer-gesture.m` → `.wkshot-drawer-bin` (compiled UNDER the repo).

The `--glass-drawer-t` transform maps `translateY(calc((1 - var(--glass-drawer-t, 0)) * 100%))` (bottom sheet) so scalar `0.5` → `translateY(50%)` of the viewport-filling sheet (`[data-glass-drawer-snap-points=true]` → `height:100%`).

---

## Criteria verdicts

### (1) open-at-half → translateY(50%) ±2% — PASS both engines/modes
| engine·mode | scalar | translateY px / vh | frac of vh |
|---|---|---|---|
| Chrome light | 0.5 | 450 / 900 | **0.500** |
| Chrome dark  | 0.5 | 450 / 900 | **0.500** |
| WebKit light | 0.5 | 450 / 900 | **0.500** |
| WebKit dark  | 0.5 | 450 / 900 | **0.500** |

Exact translateY(50%), 0% error (bar ±2%). Visually: the sheet is seated at ~50% with the page-behind (Verdict — Trattoria No. 4 / Cast vote) **live and visible through the translucent glass** (live-behind: no scrim, no scale-down, no aria-hidden) in all four captures — refuting both the dead-writer state (sheet parked offscreen at translateY(100%)) and the old masking-fallback state (sheet full-open at translateY(0)).

### (2) 1:1 drag ±5% — PASS both engines/modes
Handle dragged up 160px from the half seat:
| engine·mode | ty start→end | Δty | finger Δ | ratio |
|---|---|---|---|---|
| Chrome light | 450→290 | 160.0 | 160 | **1.000** |
| Chrome dark  | 450→290 | 160.0 | 160 | **1.000** |
| WebKit light | 450→290 | 160.0 | 160 | **1.000** (perfect 13.33px steps) |
| WebKit dark  | 450→290 | 160.0 | 160 | **1.000** |

Scalar climbs 0.5→0.678 (Δ0.178 = 160/900) exactly. Visually confirmed: the drag-peak PNG shows the grip handle risen from ~50% to ~32% (`(1-0.678)·100 = 32.2%`).

### (3) ≥6 release-snap frames, no overshoot past viewport — PASS both engines/modes
Slow release (low velocity) → snaps to nearest detent (0.5) on the `DRAWER_SNAP` spring.
| engine·mode | snap frames | distinct scalar frames | first→settled | min scalar | max scalar |
|---|---|---|---|---|---|
| Chrome light | 93 | **40** | 0.678→0.500 | 0.4944 | 0.6778 |
| Chrome dark  | 87 | **36** | 0.678→0.500 | 0.4944 | 0.6778 |
| WebKit light | ~24 samples | **~9** | 0.674→0.500 | 0.4950 | 0.6743 |
| WebKit dark  | ~25 samples | **~10** | 0.674→0.500 | 0.4945 | 0.6743 |

Chrome series (light): `0.6778, 0.6743, 0.6653, 0.6520, 0.6369, 0.6296, 0.6122, 0.5960, 0.5729, … 0.5016, 0.5001, 0.4978, 0.4963, 0.4952, 0.4946, 0.4945` → a smooth, real spring settle (far more than the 6-frame floor).
The `min scalar ≈ 0.4944` is a **0.6%-of-viewport (~5px) undershoot toward the target detent** — this is the **sanctioned ~3% liquid give** of the BD.W-ANIM-IOS27-TUNE re-tune `DRAWER_SNAP {response:0.5, dampingFraction:0.74}` (the spec-cited `{0.4,0.82}` was superseded; the constants file documents `ζ 0.74 → ~3.2% give, keeps overshoot ≤ ~4%, WITHOUT over-shooting past the viewport`). **`max scalar < 1.0` in all four runs → no overshoot past the viewport/full** (the hard failure mode). Criterion met.

### Born-RED discriminator — CLEARED
`--glass-drawer-t` is **WRITTEN across the whole gesture** in both engines (0.5→0.678 on drag, 0.678→0.5 on release). The model↔paint SEVER (`writeScalar` never firing → scalar stuck at fallback → sheet never moves) is repaired: the writer is ALIVE, the sheet MOVES 1:1 and snaps.

### NO-MASKING-FALLBACK — verified (source + paint)
- `@property --glass-drawer-t { initial-value: 0 }` (`src/styles/drawer.css:28-32`) — not `1`.
- Transform reads `var(--glass-drawer-t, 0)` on all axes (`DrawerContent.vue`) — not `,1`.
- A dead writer would park the sheet offscreen at translateY(100%) (fail LOUD); the writer is not dead.

### Visual gestalt — PASS
Warm-cream (light) / luminous-dark warm-brown transmissive (dark) identity; recessive backdrop (no conic banding, no oversaturation); calm grain; the `Drawer Live-Behind` display hero fits its envelope; the translucent sheet transmits the live page in every capture.

---

## OBSERVATION (out of THIS wave's three criteria — routed to sibling waves)

The **open-settle** (clicking Peek/Half/Full to open) and the **external re-snap** (clicking a detent button while open) **POP** instantly to the target detent — **0 intermediate `--stage-t`/scalar frames** at 120fps, no PRM (`prefers-reduced-motion` = false). Only the **manual drag-RELEASE** snap animates. This is a code-path asymmetry, not a headless artifact (it reproduced identically in Chrome + WebKit):
- `onPointerUp` → `ensureSpring().reset(live, 0)` **re-seats the spring timeline** → animates.
- open-watch → `ensureSpring(0); settleTo(0.5)` and the `activeSnapPoint` watch → `ensureSpring().target = …` (no `.play()` re-arm / no `.reset()`) → a settled spring jumps to the new target.

This is **not** among this wave's three π criteria (open-at-half is a SEAT/position check — met; the animation check is the drag-RELEASE snap — met). It is squarely **W-ANIMATION-CONGRUENCE (17.4)** territory ("one gesture derives ALL channels … drawer sheet+scrim+page on the `--glass-drawer-t` single-writer that must PAINT" — explicitly gated ON this wave) and overlaps **W-OVERLAY-ENTER-PAINT (F5.R1)** (the overlay/sheet enter animation). Recorded here so the button/open detent-to-detent glide (a `reset(live,0)` re-seat on the open-watch + `activeSnapPoint` watch) is picked up by those waves.

---

## Captures on disk (all `isRealPng`, 2880×1800)
- `drawer-chrome-light-seated-half.png` · `drawer-chrome-light-drag-peak.png` · `drawer-chrome-light-post-snap.png`
- `drawer-chrome-dark-seated-half.png` · `drawer-chrome-dark-drag-peak.png` · `drawer-chrome-dark-post-snap.png`
- `drawer-safari-light-open.png` · `drawer-safari-dark-open.png`

Instruments (judge tooling, under `docs/tranches/BG/audit/visual/`): `drawer-gesture-v2.mjs`, `drawer-open-dt.mjs`, `drawer-resnap.mjs`, `wkshot-drawer-gesture.m`, `validate-drawer-pngs.mjs`.
