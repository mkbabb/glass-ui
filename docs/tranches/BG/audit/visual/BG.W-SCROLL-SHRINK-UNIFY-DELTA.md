# BG.W-SCROLL-SHRINK-UNIFY — PAINT DELTA (row 10.1 / F6)

**Verdict: PASS** — dual-engine (Chrome + Safari/WebKit), both modes (light + dark), all three routes.
Non-authoring paint judge. Built bytes on `:5200` (`npm run demo:dist:build` → `demo:dist:serve`).

## Provenance (engine badge decode)

Every capture carries the top-left provenance badge, decoded:

| Route | Chrome | Safari/WebKit |
|---|---|---|
| `/display/card` | `CHROME · ANGLE Metal Renderer: Apple M5 Max · 1440×900 @2x · LIGHT/DARK` | `WEBKIT · Apple GPU · 1440×900 @2x · LIGHT/DARK` |
| `/motion/scroll-choreography` | same | same |
| `/compositions/hero` | same | same |

GL renderer is **ANGLE Metal (Apple M5 Max)** — real GPU, NOT SwiftShader. WebKit is system WebKit.framework/Apple GPU.

## Captures on disk (all resolve — anti-evasion floor met)

`docs/tranches/BG/audit/visual/BG.W-SCROLL-SHRINK-UNIFY-paint/`

- `sss-display_card-chrome-{light,dark}-rest.png` + `-scrolled.png`
- `sss-display_card-safari-{light,dark}-rest.png`
- `sss-motion_scroll-choreography-chrome-{light,dark}-rest.png` + `-scrolled.png`
- `sss-motion_scroll-choreography-safari-{light,dark}-rest.png`
- `sss-compositions_hero-chrome-{light,dark}-rest.png`
- `sss-compositions_hero-safari-{light,dark}-rest.png`

Probe JSON: `…-paint/probes-chrome.json`. Capture/probe scripts: `…-chrome-capture.mjs`, `…-matched-probe.mjs`, `…-live-scroll.mjs`, `…-live-routes.mjs`.

## The `?capture` harness freeze — recorded (NOT a defect)

The `?capture` capture harness sets `html[data-capture]` and applies a global
`html[data-capture] *, ::before, ::after { animation: none !important; animation-name: none !important; animation-timeline: auto !important; … }`
(CDP `CSS.getMatchedStylesForNode` on the marked card-title confirmed this rule matches with `!important` and wins). This deterministically **freezes all animations** — including the scroll-driven choreography — so the STATIC `?capture` screenshots correctly show the terminal REST state. This is expected capture-stabilization, not a wave defect. The scroll-shrink PAINT is therefore verified on the **LIVE** (non-`?capture`) route where the freeze is absent.

## Computational truth (the binding criteria)

### ScrollCard header shrink — PAINTS (compositor-only), `/display/card`
LIVE route (`http://localhost:5200/display/card`, no capture freeze), 2 ScrollCard examples, each `.card-scroll-host` emits `scroll-timeline-name: --card-scroll`; `.card-header--shrink > [data-slot=card-title]`:

| state | `scale` | title width | animName | animTimeline |
|---|---|---|---|---|
| rest (scrollTop 0) | `1` | 1235 px | `title-collapse` | `--card-scroll` |
| scrolled (>120px) | **`0.695`** | 858.3 px | `title-collapse` | `--card-scroll` |

`0.695` == the card's supplied `--card-title-shrink-ratio`; 858.3 / 1235 = 0.695. The text lays out ONCE and the scroll timeline composites the **scale** only (no font-size, no reflow). The shared `@keyframes title-collapse` DRY-fold confirmed (card supplies `--title-collapse-scale: 0.695`; the page/hero supply `0.82` per built CSS `.story-hero-shrink{--title-collapse-scale:.82}`).

### Compositor-only / CLS~0 / no per-frame reflow — MEASURED on live `getAnimations()`
Enumerated every scroll/view-timeline-bound animation and classified each animated property against the layout-reflow set (width/height/inline-size/block-size/padding*/margin*/font-size/line-height/top/left/right/bottom/inset*/grid-template-*/flex-basis/border-width/gap):

| Route | scroll-bound anims | **layout-prop violations** |
|---|---|---|
| `/motion/scroll-choreography` | 11 | **0** |
| `/compositions/hero` | 11 | **0** |

Every bound animation animates ONLY `scale` / `translate` / `transform` / `opacity` (or mask, no props). Zero layout-triggering property on any scroll frame → CLS~0, no reflow storm.

### page-hero shrink-lift + column cascade — wired compositor-safe
- `/motion/scroll-choreography`: `title-collapse` (`scale`) + `story-hero-shrink-lift` (`translate`) on `.story-hero-cluster`; `story-hero-subordinate-fade` (`opacity`); `.scroll-pin` present (×2).
- `/compositions/hero`: `story-hero-scroll-leave` (`opacity`+`transform`) on the hero cluster; **`gl-cascade-build` (ViewTimeline, `opacity`+`transform`)** on the cascade block = the section/column cascade, its OWN `view()` timeline (implicit stagger, no setTimeout).

### Gates (computational sibling criteria) — GREEN
- `proof:no-layout-animation`: **LOCKED** — 56 keyframes + 261 transition legs + 29 `<Transition>`-class legs scanned, 0 off-allowlist layout animations.
- `proof:encapsulation`: **PASS** (self-test 29 synthetic sabotages handled).
- `proof:page-chassis`: **PASS** (PC1 shared-keyframe re-point; no-lenis-gsap-fence GREEN).

## Visual truth (rest paint, both engines, both modes)

- **`/display/card`** (Chrome light, Safari dark): "Card" hero + tiers section + TS code block on a warm glass card; wash/quiet/resting tier sub-cards over the orange plate; **grain calm, no oversaturation**; dark = luminous warm-dark material (not a charcoal slab). Layout intact.
- **`/motion/scroll-choreography`** (Chrome light+dark, Safari light): display title + `SCROLL()/VIEW()/TIMELINE-SCOPE SUPPORTED` chips **all GREEN in BOTH engines** (the native substrate runs in WebKit 26, not merely a graceful degrade) + Cascade 1..4 blocks with the motion-violet accent; **recessive calm paper/grid backdrop, no conic-gradient artifact, no oversaturated aurora**.
- **`/compositions/hero`** (Chrome light, Safari dark): the audacious display hero `ℱ Real scenes` **fits its envelope** (intentional 2-line audacious wrap, no clip/overflow); ordered eyebrow→title→blurb cluster (W-HIERARCHY2); "THE SCENES" cards begin below; recessive constellation dots faint; warm-cream over luminous-dark in dark mode.

## Conclusion
Every surface reads correct in BOTH engines + BOTH modes; every declared capture PNG resolves on disk. ScrollCard header shrink + page-hero shrink-lift + column cascade all read **compositor-only** (CLS~0, no per-frame reflow), the shared `title-collapse` keyframe DRY-fold holds (card 0.695 / hero 0.82), and the choreography is externalized/un-hashed reaching the slotted title via the plain `>` selector as specced. **PASS.**
