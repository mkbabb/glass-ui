# BG.W-STORY-PAGE-API — dual-engine PAINT JUDGE DELTA

**Verdict: PASS** (Chrome + Safari/WebKit, BOTH modes, all five demo KINDS conform).

- **Wave**: `BG.W-STORY-PAGE-API` (+ the `Demo{Stage,Specimen,Interaction,Matrix,Composition}` sub-type taxonomy)
- **Route**: `/compositions/chassis` ("Story Chassis")
- **Judge**: NON-AUTHORING fresh dual-engine paint judge (owed at W-REFLECT/17.6)
- **Tree**: `tranche/BG` @ `43c17156` (BUILT bytes)
- **Method**: the proven C18 `?capture=` dual-engine harness on BUILT bytes — `npm run demo:dist:build` → `dist-demo/` → `vite preview --port 5200` (NOT the :5199 dev server). Chrome leg = real Chrome.app over CDP (`connectOverCDP :9334`, poll `data-capture-ready`, `page.screenshot fullPage`); Safari leg = off-screen `WKWebView` (system WebKit.framework/Metal, no TCC, polls `data-capture-ready`). Engine badge decoded top-left for provenance.
- **Sibling fence**: `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

## GPU provenance (real Metal, not SwiftShader)

| Engine | GL_RENDERER / GPU | Badge |
|--------|-------------------|-------|
| Chrome | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | CHROME · 1440×900 @1x |
| Safari/WebKit | `Apple GPU` (system WebKit.framework, Metal) | WEBKIT · 1440×900 @2x |

## Canonical captures (the prescribed single-shot method — top viewport)

The `?capture=` harness renders the route inside the demo shell whose `<main>` is a
**fixed-viewport inner scroller** (`MAIN.demo-main-scroller`, `overflow-y-auto`,
`scrollHeight 2346` / `clientHeight 900`, `docHeight == 900`), so the prescribed
fullPage/window shot captures the **top viewport = the Stage KIND**. All four PASS the
single-decoder pixel validator (`scripts/reflect-capture-verify.mjs`):

| PNG | isRealPng | dims | badge magenta / ink | body stdev | satHiFrac | verdict |
|-----|-----------|------|---------------------|------------|-----------|---------|
| `chassis-chrome-light-desktop-full.png` | true | 1440×900 | 2604 / 133788 | 17.3 | 0 | PASS |
| `chassis-chrome-dark-desktop-full.png`  | true | 1440×900 | 2604 / 134510 | 24.6 | 0 | PASS |
| `chassis-safari-light-desktop-full.png` | true | 2880×1800 | 6432 / 568760 | 16.4 | 0 | PASS |
| `chassis-safari-dark-desktop-full.png`  | true | 2880×1800 | 6432 / 568337 | 23.3 | 0 | PASS |

`satHiFrac 0` on every capture = **no oversaturation / no conic-aurora artifact** — the
`compositions` route resolves `background: "grid"` (a static warm CSS wash, zero live GL),
so the field is recessive and calm by construction. `bodyStdev >> 6` = real content, not a
bare shell. Hero "Story Chassis" fits its envelope (no overflow).

## Full-page verification of all FIVE KINDS (both engines, both modes)

Because the canonical shot is viewport-locked to the Stage, the four below-fold KINDS
(Matrix · Specimen · Interaction · Composition) were captured supplementarily:
- **Chrome**: inner-scroller scroll-and-shoot (`chassis-scroll-{light,dark}-{01,02}.png`).
- **Safari/WebKit**: a tall-window shooter variant (1440×2500 → snapshot 2880×5000,
  `chassis-safari-{light,dark}-tall.png`) revealing the whole flex-fill scroller in ONE
  WebKit composite.

Every KIND reads as **one glassy sub-card over the shared warm field** with the SAME
conformity (a glass tier · a `DEMO · <KIND>` mono-caption eyebrow · an `<h3>` title · a
blurb · a dark-adaptive hairline rule) while its content varies — the "N spec-sheets → one
product with natural variation" gestalt cure:

| KIND | Glass tier | Content painted | Chrome L/D | Safari L/D |
|------|-----------|-----------------|-----------|-----------|
| **Stage** | controls on `glass-floating` over the rounded-panel warm field | Adjust button + Animate switch floating over the radial field | ✓ / ✓ | ✓ / ✓ |
| **Matrix** | 3× `glass-quiet` cells | default / secondary / outline Badges, each a glassy sub-card + rule | ✓ / ✓ | ✓ / ✓ |
| **Specimen** | `glass-resting` | Default + Primary Buttons + `shipped` success Badge | ✓ / ✓ | ✓ / ✓ |
| **Interaction** | `glass-floating` | Run (glass) + Reset (ghost) Buttons + Reduced-motion Switch | ✓ / ✓ | ✓ / ✓ |
| **Composition** | `glass-resting` | Notifications (Switch) + Theme (System Button) settings scene, ≥2 library components | ✓ / ✓ | ✓ / ✓ |

**Dark register**: reads as a luminous **warm-dark transmissive material** (BA.W-DARK-MATERIAL)
in BOTH engines — the sub-cards lift off the near-black page with warm-brown transmission, the
dark-adaptive `--configurator-divider` hairline rules survive the dark plate, and the
chromatic violet dark `--primary` paints the active Switches + the `default` Badge. NOT a dead
charcoal void.

## Computed-DOM structural probe (Chrome, both modes identical)

```
stageEls:1  specimenEls:6  matrixEls:1  interactionEls:1  compositionEls:1   → all five KINDS present
glassTierEls:15   headerRuleEls:6   sectionLabelEls:6                         → glassy-card + header/rule + eyebrow conformity
canvasCount:1  glContextCount:0                                              → zero live GL viz (the 1 canvas is the badge painter) — one-GL-per-route budget respected (grid static-wash route)
runningAnims:0  animatedTimeline:0                                           → at capture-ready: entrances settled, no runaway animation, no unexpected scroll-timeline
docHeight:900 (main.demo-main-scroller scrollHeight 2346)                    → fixed-viewport inner scroller (explains the canonical top-only shot)
```

`specimenEls:6` = 1 base Specimen + 3 Matrix cells (each a `<DemoSpecimen>`) + Interaction
(extends DemoSpecimen) + Composition (extends DemoSpecimen) — the closed five-KIND vocabulary
composing the ONE conformity floor.

## Criteria reconciliation

- **ST1 exists + barrelled** — `demo/chassis/{DemoStage,DemoSpecimen,DemoInteraction,DemoMatrix,DemoComposition}.vue` + `index.ts` barrel + `subtype-context.ts` present; all five paint. ✓
- **ST2 each slot-bearing** — Stage `#stage`/`#controls`/default; Matrix `#cell`/default; Specimen/Interaction/Composition default `<slot/>` — content varies per KIND in the captures. ✓
- **ST3 glassy-card conformity (a glass tier)** — `glassTierEls:15`; each KIND paints a `glass-<tier>` plate + header/rule over the warm field (visually confirmed both engines/modes). ✓
- **ST4 each adopted ≥1 live importer** — the reference page `compositions/chassis` wires all five side by side (the render is the proof). ✓
- **ST5 vocabulary closed** — exactly five KINDS render; no drift. ✓
- **No `src/` paint** — a demo-consumer chassis; the render conforms to the shipped library primitives. ✓
- Recessive aurora / no conic / no oversaturation → `satHiFrac 0`, grid wash. ✓
- Grain calm; hero fits its envelope. ✓

## Artifacts (all resolve on disk)

Under `docs/tranches/BG/audit/visual/story-page-api-validate/`:
- Canonical: `chassis-{chrome,safari}-{light,dark}-desktop-full.png`
- Full-page verification: `chassis-safari-{light,dark}-tall.png`, `chassis-scroll-{light,dark}-{01,02}.png`
- Harness: `chrome-cap.mjs`, `validate.mjs`, `scroll-cap.mjs`

**PASS** — every surface in both engines + both modes reads correct; every declared capture PNG resolves on disk.
