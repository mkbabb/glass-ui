# BG.W-MOTION-SPINE — paint DELTA (dual-engine, dual-mode, NON-AUTHORING judge)

**Wave:** BG.W-MOTION-SPINE (F5.1) — the ONE compositor FLIP/morph runner
(`useElementMorph`) the three bloom leaves collapse onto + the press-tower collapse
(`useLiquidPress` `squish?:boolean` over `useSpringPress`, Button KEEPS direct
`useSpringPress` + byte-identical `--glass-btn-press-t` drive).

**Verdict: PASS** — reveal / cta-receive / springs read as continuous liquid morphs;
the spine surface (useElementMorph) drives the FLIP-inversion bloom and the FORWARD
CTA-into-dock play correctly in BOTH engines, BOTH modes. Gate `proof:motion` GREEN
(0 violations). Every capture PNG resolves on disk.

**Judge:** non-authoring paint judge (did NOT build). Verified the PAINTED truth +
COMPUTED DOM morph frame-series, never the builder's claim.

---

## Method (the proven C18 pipeline)

- BUILT bytes: `npm run demo:dist:build` → `npm run demo:dist:serve` (vite preview `:5200`).
- **Chrome** (real Chrome.app + CDP → real Metal GPU): `chromium.connectOverCDP`,
  `?capture=<route>&mode=<m>`, poll `data-capture-ready`, `deviceScaleFactor:2`.
  Scripts: `BG.W-MOTION-SPINE-assets/chrome-capture.mjs` (baseline + frame-series +
  probe), `chrome-bloom-reframe.mjs` (bloom scrolled in-frame — the surface sits below
  the 900px fold), `chrome-cta-reframe.mjs` (dock scrolled to center for the CTA flight).
- **Safari/WebKit** (off-screen WKWebView, system WebKit.framework/Metal): `wkshot-live`
  compiled from `docs/tranches/BG/audit/wkshot-live.m`, `takeSnapshotWithConfiguration`
  after `data-capture-ready`, 2880×1800.
- **Provenance:** decoded from the in-pixel engine badge (top-left) on every PNG.

### Decoded provenance (from the in-pixel badges)

| Engine | Badge | GPU | Viewport |
|---|---|---|---|
| Chrome | `ENGINE CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, NOT SwiftShader | 1440×900 @2x (2880×1800px) |
| Safari | `ENGINE WEBKIT` | `Apple GPU` | 1440×900 @2x (2880×1800px) |

---

## Surface 1 — `/motion/reveal` (v-reveal stagger + useLiquidReveal bloom-from-source)

**v-reveal stagger** — the 6 rows (Discover/Compose/Refine/Ship/Measure/Iterate) render
as warm glass-cards with the violet `--motion-accent` stagger dots + ink labels, both
engines, both modes (dark = luminous transmissive glass, not a dead void).

**useLiquidReveal bloom** — the FLIP inversion (direction `"in"`, 1→0). Chrome CDP
computed frame-series on the `.glass-reveal` surface (`chrome-probe.json`), IDENTICAL
light+dark:

| t (ms) | transform (scale) | transform-origin | opacity | filter | transitionProperty |
|---|---|---|---|---|---|
| 140 | `matrix(0.708, .., 0.715 ..)` | `0px -56px` (anchored at trigger) | 0.6119 | `blur(1.55px)` | `none` (driver-lock engaged) |
| 340 | `matrix(1 .. 1)` | `0px -56px` | 1 | `blur(0px)` | `none` |
| 620 | `matrix(0.9994 ..)` (sub-pixel) | `0px -56px` | 0.9992 | `blur(0px)` | `none` |
| 1500 | settled `1/1/0` | — | 1 | 0 | — |

→ scale 0.71→1, opacity 0.61→1, blur 1.55→0, ALL coupled on the ONE snappy spring,
anchored at the trigger's rect (origin `0px -56px` = the primary-audacious button above),
`transition-property: none` proves the `lockSpatialTransition` driver-lock seam engaged
(the F5.2 liquid-weight `transition` default is beaten). Snappy arrives ~340ms (the
QUICK-IS-ARRIVAL note). Pixel-confirmed IN-FRAME (`reveal-bloom-chrome-{light,dark}-*`):
the trigger flips to "Conceal" (open=true) and the "Materialized" glass-floating surface
blooms in below it.

PNGs: `reveal-{chrome-light,chrome-dark,safari-light,safari-dark}-*`,
`reveal-bloom-chrome-{light,dark}-{rest,120ms,300ms,560ms,settled}.png`.

## Surface 2 — `/motion/springs` (the motion card set)

The full "motion card set" renders both engines/modes: "Spring Orchestrator" hero, the
"Springs" display title in the violet `--motion-accent` (ONE color event), NAMED
REGISTERS, the Register select + Play/Reset, the violet animated demo card, and the
TRANSLATEX (0→360) / ROTATE (0→18) / LIGHTNESS (0→60) metric cards + SPRING PLAYGROUND.
Driving the demo (useNumericTransition, `springTimingFunction` single-source):
demoX 315→**360.02** (spring overshoot) → 360 → 360 (settles at target). `glContextCount:0`
(the one-GL-per-route fence — springs spends no GL). 41 glass cards, bodyText ~1869.

PNGs: `springs-{chrome-light,chrome-dark}-{baseline,cards}.png`, `springs-safari-{light,dark}.png`.

## Surface 3 — `/dock/cta-receive` (useDockCtaReceive external-CTA-into-dock)

Seat armed from mount (`seatPending:true`, the `[data-cta-pending]` ghost; "(SEAT ARMED)"
caption). The FORWARD play (direction `"out"`, 0→1) — Chrome CDP frame-series on
`.cta-receive-vehicle`, IDENTICAL light+dark:

| t (ms) | ctaTransform (scale/translate) | opacity | filter | received | targetLit |
|---|---|---|---|---|---|
| 130 | `matrix(0.586 .., 69.4, 87.7)` | 0.4285 | `blur(2.29px)` | false | false |
| 350 | `matrix(0.276 .., 121.4, 153.4)` | 0.0003 | `blur(4px)` | false | false |
| 650 | `matrix(0.276 .., 121.5, 153.5)` | 0 | `blur(4px)` | false | false |
| 1500 | CTA ABSENT | — | — | **true** | **true** |

→ the CTA flies (translate toward the dock) + reshapes (scale 0.59→0.28) + fades OUT
(opacity 0.43→0) + congests (blur 0→4px), then HANDS OFF: CTA removed, `received=true`,
the star seat `--lit` + revealed. Pixel-confirmed (`cta-flight-chrome-{light,dark}-*`):
mid-flight the "+ Add to dock" ghost shrinks + fades toward the star seat; the received
frame shows the CTA gone (→ "Replay"), the star seat lit with the `--dock-selected-accent`
ring. Compositor-only (transform/opacity/filter). Recessive aurora field over the
DockStage — soft warm peach (light) / warm copper (dark), NO conic banding, NO
oversaturation, in BOTH engines (Chrome real-Metal GL + Safari). `canvasCount:1`
(one shared offscreen-paused aurora — one-GL-per-route).

PNGs: `cta-receive-{chrome-light,chrome-dark}-{baseline,cta-rest,cta-130ms,cta-350ms,cta-650ms,cta-1500ms}.png`,
`cta-flight-chrome-{light,dark}-{t90,t220,t420,received}.png`, `cta-receive-safari-{light,dark}.png`.

---

## Computed criteria

- `animationTimeline: true` (scroll-driven support present, all routes).
- Compositor-only: the spine writes only `transform`/`opacity`/`filter` inline;
  `transition-property:none` during the morph = the `lockSpatialTransition` seam.
- Gate `proof:motion` GREEN — 0 violations. S1 single-runner (`useElementMorph.ts` the
  SOLE rAF/`ElementMorph` runner + `lockSpatialTransition`/`asElement` exports;
  `useLiquidReveal`/`useDockCtaReceive` COMPOSE it, no second runner). S2 press-tower
  (`useLiquidPress` `squish?` toggle over `useSpringPress`; Button KEEPS direct
  `useSpringPress` + byte-identical `--glass-btn-press-t` drive). 2nd self-test bite
  flags a re-forked runner.

## Fences honored

- Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; siblings untouched
  (`verify-siblings-intact --quiet` exits 0). No src/demo/styles/scripts edited.
  Compiled capture binary removed post-run (no Mach-O committed).
