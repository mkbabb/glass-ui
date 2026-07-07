# BG.W-DEMO-IA-REDESIGN — paint-judge DELTA (SHRINK-NOT-FADE, USER 07-05)

> **Role:** NON-AUTHORING paint judge. Did NOT build this wave. Verdict is the PAINTED
> truth measured against the wave's own criteria, not the builder's claim.
> **Date:** 2026-07-07. **Branch:** `tranche/BG` @ HEAD `300a30fb` (the F7 W-DEMO-IA-REDESIGN
> IA collapse + SHRINK-NOT-FADE fix `d49a9189` is committed on the tree AND present in the
> freshly-BUILT bytes; verified directly).
> **Instrument:** the PROVEN dual-engine pipeline over BUILT demo dist on `:5200`
> (`npm run demo:dist:build && demo:dist:serve`, BUILT bytes not the `:5199` dev shell).
> Chrome CDP (real Chrome.app 149, `connectOverCDP :9333`, GL_RENDERER =
> `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`, 1440×900 @1x) + off-screen WKWebView
> (system WebKit.framework / Apple GPU / Metal, 2880×1800 @2x). Engine badges decoded in-pixel
> on every `?capture=` full-page snapshot (CHROME/ANGLE-Metal · WEBKIT/Apple GPU); the retina
> 2880×1800 @2x vs 1440×900 @1x dimension signature is the provenance discriminator on the
> live-scroll frames.

## Verdict: **PASS** (dual-engine, both modes — the SHRINK-NOT-FADE register + E1/E2 clauses all read PAINTED-correct)

Every binding pass-bar criterion is met in **both engines (Chrome ANGLE-Metal + Safari WebKit/Apple GPU) × both modes**, over the freshly-built `:5200` dist. All 62 capture PNGs resolve on disk (0 corrupt).

---

## Method note — WHY the SHRINK read is a LIVE-route measurement (not `?capture=`)

The `?capture=<route>&mode=` settled-frame mode activates the capture stylesheet
(`demo/capture/capture.css`) which sets `animation: none !important` on the whole tree —
so it **neutralizes** the scroll-driven `animation-timeline: scroll()` shrink (correct for
static paint checks like colors/dark/layout, wrong for the shrink). The SHRINK frame-series
is therefore measured on the **LIVE route** where the scroll timeline is active:
`main.demo-main-scroller` is driven through the condense window (`scroll-behavior:auto` first —
the `.smooth-scroll` register otherwise swallows a bare `scrollTop` setter) and the
`.story-hero-shrink` wrapper's computed `scale` + the title's `opacity` are read at each offset.

- **Chrome (on-screen via CDP):** dense 9-step sweep + painted screenshots at scroll 0/80/160.
- **WebKit (off-screen WKWebView):** a colocated live-scroll harness
  (`BG.W-DEMO-IA-REDESIGN-paint/wkshot-scroll.m` → `.wkshot-scroll-bin`) loads the live route,
  polls for the `.story-hero-shrink` mount, **finishes the document-timeline entrance
  animations** (off-screen rAF is suspended, freezing the time-based entrance at opacity 0 — an
  instrument artifact, NOT a real defect; the on-screen Chrome reading confirms the settled title
  opacity is 1.0), then sweeps the scroll offsets reading the scroll-driven `scale`/`opacity`
  (scroll() is driven by scroll POSITION, sampled fine off-screen) + snapshots.

---

## E3 · SHRINK-NOT-FADE — the PRIMARY read (born-RED at HEAD → GREEN)

Scroll frame-series, `.story-hero-shrink` wrapper `scale` (drives the title) + title `opacity`,
9 offsets [0,20,40,60,80,100,120,140,160] over the `--hero-condense-range: 160px` window.

| route | engine | mode | scale (0→160px) | monotonic | shrink frames | title opacity |
|-------|--------|------|-----------------|-----------|---------------|---------------|
| /display/atoms | Chrome | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /display/atoms | Chrome | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /display/atoms | WebKit | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /display/atoms | WebKit | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /data/metrics  | Chrome | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /data/metrics  | Chrome | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /data/metrics  | WebKit | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /data/metrics  | WebKit | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /motion/scroll | Chrome | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /motion/scroll | Chrome | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /motion/scroll | WebKit | light | 1.000→0.820 | ✓ | 9 | 1.00 (held) |
| /motion/scroll | WebKit | dark  | 1.000→0.820 | ✓ | 9 | 1.00 (held) |

Chrome per-frame scale series (identical all 3 routes both modes):
`[1.000, 0.978, 0.955, 0.932, 0.910, 0.887, 0.865, 0.843, 0.820]` (+ 0.820 held at 180) —
the exact linear `title-collapse` sample of `--title-collapse-scale: 0.82`.
WebKit series identical (`1, 0.9775, 0.955, 0.9325, 0.91, 0.8875, 0.865, 0.8425, 0.82`).

- **≥8 painted shrink frames** ✓ (9 distinct scale frames).
- **MONOTONIC title scale 1→0.82** ✓ (both engines, both modes, all 3 routes; hits exactly 0.82 at 160px).
- **title opacity ≥0.85 throughout** ✓ (held at 1.00 the entire shrink window — the title carries NO subordinate fade).
- **Opacity couples to shrink, never leads; the standalone opacity-only cluster-fade leave RETIRED** ✓ —
  the subordinate eyebrow/blurb opacity is `1.0` through the whole shrink window (scroll 0→160) and
  feathers only AFTER the pin (`0.5` at 220px, `0.0` at 280px), i.e. over `160→280px`
  (`--hero-condense-range → +--hero-condense-fade-range`). No opacity-led-from-scroll-0 leave.
- **Compositor-only** ✓ — the register writes the `scale`/`translate` LONGHANDS (`title-collapse`
  scale + `story-hero-shrink-lift` translate), never `font-size`/`width`/`height` (BB.W-CARD-COMPOSITE floor).
- **native `animation-timeline: scroll()`** ✓ — the `.story-hero-shrink` computed
  `animation-timeline: scroll(), scroll()`; no JS scroll lib (the no-Lenis fence holds).
- **PRM → static full-size header, never a half-shrunk freeze** ✓ — under
  `prefers-reduced-motion: reduce` the wrapper reads `scale=1` at BOTH scroll 0 and 160, and
  `getAnimations()` on the wrapper returns **0 animations** (the scroll-driven legs are gated off
  by the `@media (prefers-reduced-motion: no-preference)` bracket — a static full-size header, no freeze).

Captures: `chrome_{display_atoms,data_metrics,motion_scroll}_{light,dark}_s{0,80,160}.png`
(1440×900) · `safari_{display_atoms,data_metrics,motion_scroll}_{light,dark}_s{0,160}.png`
(2880×1800). Raw sweeps: `chrome-shrink-frames.json` · `safari-shrink-frames.json`.

## Route-entrance beats (IOS27-MOTION-TRUTH §2.6/§4.4 — inherits W-ROUTE-ENTER-VISIBLE's π)

Fresh-mount transform sampling on `/display/atoms` + `/data/metrics`: the title cluster rises
with a **real translateY leg** (not a bare opacity fade) — title `translateY 24px → 0`, opacity
`0 → 1`, **18 distinct opacity states** across the entrance (≥8 rise frames), `roseTitle=true`,
`roseEyebrow=true`. The chrome→hero→body eyebrow→title→blurb page-anatomy entrance is painted.

## E1 · demo-earns-page

Live vue-router census (`router.getRoutes()`): **0 duplicate-path collisions** across all
component routes; every judged route renders (no 404 — the "Lost in the lattice" catch-all
never appears on any target route); **h1count = 1** on every family/section page (ONE identity
header over N member bodies — the `STORY_NESTED_KEY` bare-body seam). The exact routed-count
(the `~94` figure) is the device-free `proof:demo` E1 concern; the binding PAINT assertion
(no-collision + one-identity-header) reads correct.

## E2 · field-warm-default (`heroAuroraConfig("cat-dock")`, not cerulean OPENAI_SKY)

DockStage default aurora (`/dock/overview`, `heroAuroraConfig("cat-dock")` = palette index 6 =
tomato/warm-coral), pixel-sampled off the COMPOSITED screenshot (the WebGL non-preserved buffer
reads transparent via `drawImage`, so the screenshot is the honest sample):

| capture | field-L hue/sat | field-R hue/sat | warm? |
|---------|-----------------|-----------------|-------|
| chrome dock/overview light | h13 / s34 (rgb 226,166,150) | h15 / s36 | ✓ warm |
| chrome dock/overview dark  | h13 / s43 (rgb 174,116,100) | h15 / s44 | ✓ warm |

Hue **13–15°** (warm coral/tomato), NOT cerulean (which would be ~200–240°). Visually confirmed
in both engines both modes — the DockStage backdrop is a warm coral/peach field
(`safari_cap_dock_overview_{light,dark}.png` show the same warm coral in WebKit; the WEBKIT/Apple
GPU badge decodes on each).

## IA redesign — render verification (family collapse + FamilyTabs + one identity header)

`?capture=` full-page settled captures, both engines both modes, over the collapsed IA:

- Family landing pages (`display/atoms`, `data/metrics`, `motion/scroll`, `motion/text-motion`):
  render with the dogfooded **`<FamilyTabs>`** paper-ink underline switcher (e.g. Text Motion →
  `Typewriter | Split chars | Animated digit | Countup`), ONE page identity header + the member
  StoryPage body rendered slot-only (the `STORY_NESTED_KEY` seam), the motion family's ONE
  motion-purple color event on the member title. All `ready`, no 404, `h1count=1`, `fam=true`,
  content-page `.story-hero-shrink` register present.
- Section-fold routes (`forms/inputs`, `forms/toggle`, `data/table`, `data/timeline`,
  `feedback/toast`): all render `ready`/no-404/`fam=true`/`h1count=1`/shrink-register.
- `foundations/paper-glass`: renders `ready`/no-404/`h1count=1` on the `.story-hero-scroll-away`
  register (a live-substrate VIZ page — the field owns the viewport, its title is the field's
  label; the pre-existing BD.W-VIZ-BROKEN-FIX D5 register, DISTINCT from the content-page shrink,
  NOT the content-page fade defect this wave closes). See Observations.

Captures: `chrome_cap_<route>_<mode>.png` (11 routes × 2 modes) ·
`safari_cap_<route>_<mode>.png` (5 representative routes × 2 modes).

## Observations (transparency — NOT defects; the binding pass-bar is fully met)

1. **The sticky header CONDENSES-then-scrolls (the pin travel is minimal).** The
   `.story-hero-shrink` is `position: sticky; top: 0` but its containing block is the `<header>`
   box (~180px ≈ the cluster's own height), so the sticky pin has near-zero travel: during the
   shrink window (0→160px) the title scales `1→0.82` AND scrolls up ~1:1 with content, then the
   header scrolls off. The BINDING pass-bar (monotonic scale, opacity held, both engines both
   modes) is fully met and the user's actual complaint — the dominant scroll read was a **FADE**
   (opacity 1→0) — is closed: the read is now a SHRINK with the title opacity held at 1.0. The
   "slim pinned rung PERSISTS" language in the source intent is only partially realized (it
   condenses but does not persist pinned); this is not in the measurable pass-bar and does not
   fail the wave.
2. **Viz/hero pages keep the `.story-hero-scroll-away` register by design** (paper-glass et al.):
   the giant title dissolves off the top as the live field takes the viewport. This is the
   pre-existing deliberate viz-page register, distinct from the content-page shrink; it is not
   the content-page hero-fade the SHRINK-NOT-FADE clause retired.

## Files

- Captures + raw data: `docs/tranches/BG/audit/visual/BG.W-DEMO-IA-REDESIGN-paint/`
  (62 PNGs: 40 Chrome @1440×900, 22 WebKit @2880×1800; `chrome-shrink-frames.json`,
  `safari-shrink-frames.json`; the colocated capture/measure scripts + `wkshot-scroll.m`).
- Instrument binaries (repo-local, ephemeral): `.wkshot-scroll-bin` (live-scroll WebKit),
  `.wkshot-live-bin` (settled-frame WebKit `?capture=`).
