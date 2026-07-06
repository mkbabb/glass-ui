# BG.W-BLOB-AFFECT-INTERACT — dual-engine PAINT JUDGE DELTA

**Wave:** BG.W-BLOB-AFFECT-INTERACT (F9.R8) · route `/substrates/blob` (the Blob Studio — `demo/stories/substrates/blob.vue`)
**Judge:** non-authoring paint judge (did NOT build it — verifies the PAINTED truth, never the builder's claim)
**Date:** 2026-07-06 (re-judge on BUILT bytes after the ≥4-preset fix landed `e0320565`)
**Verdict: PASS — dual-engine (Chrome/ANGLE-Metal + WebKit/Apple-GPU) both modes. The AFFECT half's ≥4-preset MISS is CLOSED (studio now ships 5 named MODES, all 4 spec-named present, empirically distinct in MOTION CHARACTER); the POINTER-TRUTH half PASSES end-to-end (SDF fall-through decisive, painted lean, click deform-then-settle, PRM static seat). Q7 mobile-full-presence holds; GAP-4 perf unregressed. Every capture PNG RESOLVES ON DISK.**

---

## Re-judge context

A prior judge pass FAILED this wave (2026-07-06) because the studio shipped only **3** preset MODES (calm · excited · shy) against the spec's ≥4 named (calm · serene · excited · playful). The build-fix agent landed `e0320565` (`demo/stories/substrates/blob.vue`), expanding the preset row to **5** named MODES. This re-judge captures the CURRENT BUILT bytes.

---

## Pipeline provenance (all captures over BUILT bytes)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit **0** BEFORE and AFTER.
- `npm run demo:dist:build` GREEN (`✓ built in 1.02s`, `GooBlob-Ev5UG-3y.js` 93.91 kB / gzip 34.68).
- Served the BUILT bytes via `vite preview` on `:5200` (`npm run demo:dist:serve`).
- **Chrome leg:** real **Chrome 149 / ANGLE Metal (Apple M5 Max)** over `?capture=/substrates/blob&mode=<m>` via `connectOverCDP` (port 9333), polled `data-capture-ready` (light `ready=true` @3857ms · dark @3854ms), `page.screenshot`. `GL_RENDERER` off a throwaway WebGL2 ctx = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`. In-pixel badge decoded → `ENGINE CHROME · ANGLE Metal M5 Max · 1440×900 @1x · <MODE>`.
- **Safari leg:** in-repo `docs/tranches/BG/audit/.wkshot-bin` (re-compiled this session, `clang -framework Cocoa -framework WebKit`), off-screen WKWebView, 2880×1800 @2×, polled `data-capture-ready` @4500ms → `takeSnapshotWithConfiguration`. Badge decoded → `ENGINE WEBKIT · Apple GPU · 1440×900 @2x (2880×1800px) · <MODE>`.
- `node validate.mjs` (single decoder leaf `scripts/reflect-capture-verify.mjs`: `isRealPng`/`pngDimensions`/`pngRegionStats`) → **ALL_PASS: true**.
- `npm run proof:blob-affect-interact` → **GREEN** (I1 hit-test · I2 SDF-gated engage · I3 sibling-fall-through · I4 click-gate · I5 wake+PRM-seat · A1 affect axes · **A2 ≥4 named preset MODES — count 5 ✓ named [calm, serene, excited, playful, shy] ✓**).

### Capture set (all RESOLVE ON DISK, under `BG.W-BLOB-AFFECT-INTERACT-paint/`)

| file | engine | mode | dim | real | content-real (blob↔bg ΔL) | provenance badge |
|---|---|---|---|---|---|---|
| `blob-chrome-light-desktop-full.png` | Chrome | light | 1440×900 | ✓ | 0.672 | ANGLE Metal M5 Max · LIGHT |
| `blob-chrome-dark-desktop-full.png` | Chrome | dark | 1440×900 | ✓ | 0.245 | ANGLE Metal M5 Max · DARK |
| `blob-safari-light-desktop-full.png` | WebKit | light | 2880×1800 | ✓ | 0.667 | Apple GPU · LIGHT |
| `blob-safari-dark-desktop-full.png` | WebKit | dark | 2880×1800 | ✓ | 0.236 | Apple GPU · DARK |

### Live-gesture frame series (Chrome, real Metal, light — the studio hero bead, canvas-clipped)

| file | state |
|---|---|
| `rest.png` | at rest — lit warm-cream metaball, satellite lobes merged to ONE coherent body, glass sheen (reads as a living creature) |
| `lean.png` | pointer→centre — silhouette visibly redistributes/reaches toward the cursor (Δ 1.66 ≈ 4× ambient) |
| `preclick.png` | pre-click steady lean |
| `click_40/110/220/380/600.png` | click at centre → body swells (caption `clicks 1`, Δ up to 4.8 ≈ 12× ambient) → settles to ONE coherent body by 600ms, no jitter, no wrecked slab |
| `prm-rest.png` | reduced-motion → static seated bead (rest deltas 0 / 0.018 — deterministic seat) |
| `preset_{Calm,Serene,Excited,Playful,Shy}_{rest,lean,click}.png` | the 5-mode A/B — distinct hue + distinct motion character per preset |

---

## What PASSES

### (a) AFFECT REGISTERS

- **Named affect AXES present (A1 GREEN).** `constants.ts` ships `interface AffectPoint {valence, arousal}`, `MOOD_AVA` (named moods as circumplex points), and `paramsFor` (arousal→orbit-energy/deform-amplitude, valence→palette-warmth) — the atoms-door affect model.
- **The studio ships 5 named preset MODES (A2 GREEN — the FIX confirmed).** DOM (both engines): `presetButtons: 5`, preset-row text = `"Calm cream · curious | Serene cool · gently sways | Excited warm · leans in | Playful warm · bouncy | Shy cool · shies away"`. **All 4 spec-named modes present** (calm · serene · excited · playful) + shy as a 5th in-family cool mode. Calm stays the byte-identical default (`initialPreset: "calm"`).
- **The ≥4 presets read DISTINCT in MOTION CHARACTER, not just hue (the paint bar — the D10 scalar-stand-in fence honored with a live-gesture A/B, not a param dump).** Empirical per-preset pointer response (pointer-into-SDF lean Δ · click-impulse Δ, canvas-clipped MAD vs rest):

  | preset | attraction | clickImpulse | responsiveness | mood | leanΔ (×ambient) | clickΔ | character in paint |
  |---|---|---|---|---|---|---|---|
  | Calm | 0.35 | 0.5 | 0 | curious | 2.46 (5.8×) | 1.47 | warm cream, moderate curious lean |
  | Serene | 0.08 | 0.3 | 0.1 | idle | 4.21 (6.0×) | 1.64 | cool teal, gentle elevated sway, barely leans |
  | Excited | 0.80 | 0.9 | 0.7 | excited | **7.43 (17.6×)** | 1.24 | warm rose/coral, **leans HARDEST** |
  | Playful | 0.40 | 1.2 | 0.9 | happy | 6.37 (10.8×) | **3.36** | warm gold-coral, **bounciest click** |
  | Shy | −0.80 | 0.3 | 0.2 | sleepy | 5.05 (5.6×) | 0.95 | cool teal, sleepy, **quietest click / recoils** (negative attraction) |

  Lean magnitude spans 2.46→7.43 (**3× spread**); click impulse spans 0.95→3.36 (**3.5× spread**). Excited leans hardest, Playful bounces most on click, Shy recoils with the quietest click — the affect axes (arousal → energy, valence → palette + sign) paint DISTINCT motion signatures. Confirmed visually: `preset_Excited_lean.png` (rose, fuller leaning-in body), `preset_Shy_rest.png` (cool teal, sleepy, attraction slider at the low end). **A non-authoring INTERACTION READ: the presets read as distinct temperaments — a curious cream, a drowsy teal, an eager rose, a bouncy gold — liquid and alive.**
- **Bounded saturated-but-non-neon.** Static blob-region chroma 0.022–0.026 (cream default); the coral/teal/gold preset seeds are chroma-ceiling capped (the source `// capped to non-neon by the warm-register chroma ceiling` seam) — soft/muted saturated, no electric neon. The cool moods (serene/shy) are the valence→palette-warmth axis working (low valence → cool wash), still ceiling-capped.

### (b) POINTER TRUTH — the user's PRIMARY complaint ("on-click and on-hover is AWFUL") is FIXED

- **SDF-shaped hit-test / sibling fall-through (I3/I4) — DECISIVE.** `elementFromPoint` at the studio bead (scrolled into a 1440×1200 viewport):
  - centre `(586,614)` → `goo-blob-hit` (`centerIsHit: true`) — the SDF interior receives the pointer.
  - box corner `(349,377)` → `relative aspect-square w-full max-h-[78%] max-w-[min(78%,30rem)]` (the parent CONTAINER, NOT the hit layer) — `cornerIsHit: false`. A corner `mouse.click` resolved the container (`cornerClickHitEl` = the container). **The root square does NOT intercept a sibling-card click; outside the SDF the event falls through.** The literal L5 ask satisfied.
  - Computed styles: `.goo-blob-wrapper { pointer-events: none }`, `.goo-blob-canvas { pointer-events: none }`, `.goo-blob-hit { pointer-events: auto; clip-path: circle(22.88%); cursor: pointer }`.
  - Corroboration: the corner click's pixel deform (max Δ 2.18) is far below the centre click (max Δ 4.8) — no full click impulse was delivered outside the SDF.
- **Pointer lean (hover response) — painted + alive, ≤ ~3 frames.** Ambient frame-to-frame Δ (mouse parked far) ≈ 0.40 mean / 0.44 max. Pointer into the SDF centre → Δ **1.66** (~4× ambient) within ~50ms; per-preset the lean reaches 7.43 (17.6× ambient) on Excited. `lean.png` vs `rest.png` shows a clear silhouette redistribution toward the cursor.
- **Click bounce — bounded volume-preserving deform-then-settle, no jitter.** A centre `mouse.click` incremented the visible counter (`clicks 0 → 1`), the body swelled (`click_40/110`, one coherent rounder mass), then settled to ONE coherent lit body by 600ms (`click_600`). No jitter, no wrecked slab, no fracture.
- **Wake wire (I5).** Gate-verified (`pointer.active` → `renderer.wake()`, the W-GOO-REDRESS precedent doubled); first hover-into-SDF produced an immediate painted response (no parked-loop lurch).
- **PRM deterministic seat (I5).** Under `reducedMotion: reduce` the loop parks — rest deltas **0 / 0.018** across 500ms; `prm-rest.png` is a clean seated bead (the gesture still commits, the physics off).

### Q7 mobile-full-presence — holds

At 390×844 (iPhone-class): **2** goo-blob canvases present + visible (studio 300×300 + stage 240×240), `anyVisible: true`, and the **5** preset buttons render. The blob is present at the mobile viewport.

### GAP-4 perf — unregressed

Exactly **2** live GooBlob GL contexts on the page (studio hero 768×768 + STAGE-1 plain bead 563×563) + 1 shell-aurora background canvas — within the page's "at most TWO live GooBlob contexts" budget.

### Static gestalt — both engines, both modes

The `GooBlob` masthead + violet `Blob Studio` title (`--motion-accent`) + recessive warm-paper background (no conic banding, no oversaturation, grain calm) render correctly on Chrome (Metal) and WebKit (Apple GPU), light + dark. Dark reads as a luminous warm-dark register (warm-brown gradient), not a dead charcoal void. Cross-engine parity confirmed (identical layout, warm-cream light / luminous-dark). The preset chips (Calm · Serene · Excited …) render on BOTH engines in BOTH modes.

---

## Verdict

**PASS.** Both halves of the doubled bar are met on the BUILT bytes, dual-engine, both modes:
- (a) AFFECT: 5 named MODES (≥4, all 4 spec-named), empirically distinct in motion character (3× lean spread, 3.5× click spread), bounded non-neon.
- (b) POINTER TRUTH: SDF fall-through decisive, painted hover-lean, click deform-then-settle no jitter, PRM static seat, same-frame wake.
- Q7 mobile-full-presence holds; GAP-4 = 2 GL contexts (unregressed).
- All 4 static PNGs + the gesture/A/B frame-series resolve on disk, real, dimension-correct, content-real, correct provenance.

No mustFix owed.
