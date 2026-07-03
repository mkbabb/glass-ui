# BG.W-DOCK-SCROLL-PROGRESS — DELTA (16.1, USER-0703)

**The directive:** the page-scroll progress bar is ugly — kill the standalone bar;
the scroll progress becomes a BORDER ITEM on the LEFTSIDE dock, with proper
collapsed-state handling.

## Found while diagnosing: the BorderProgress fill NEVER swept (fixed)

Live-verified at `/feedback/progress` (value 42% → the FULL perimeter painted): the
spectrum stop list carried fixed `0..100%` positions, so the conic's
`transparent var(--border-progress-fill)` front CLAMPED past the tail (CSS
non-decreasing stop rule) and the fill had NO painted effect at any value. Fixed at
the source: `spectrumStopList` emits `calc(var(--border-progress-fill) * f)`
positions — the spectrum spans the FILLED arc (the documented design intent) and the
registered `<percentage>` fill interpolates the whole gradient. Locked by
`proof:border-progress` W7a + the `inert-fill-fixed-stops` bite.

**Second mechanism fix:** the 3-layer coverage masks composited in the WRONG order
(band LAST → `exclude(padding, intersect(border, band))` = the PADDING BOX joined
the mask and the "edge" painted the whole interior as a slab — live-verified). The
stack is now band-scope (top, `intersect`) over padding (`exclude`) over border
(bottom): `intersect(band, exclude(padding, border))` — band ∩ ring. Applied to the
shipped `bottom-edge` too (same latent bug).

## The design

- **Library (additive):** `coverage="inline-end-edge"` — the vertical content-facing
  band, filled TOP→BOTTOM LINEARLY by the value (the scrollbar metaphor; a conic
  maps a single edge nonlinearly). Same border-band mask cut-out, same fill-scaled
  spectrum source. `radius`/`width` props now DEFER TO THE CASCADE when unset
  (`--border-progress-radius`/`-width` tokens) — the ring follows a pill host with
  zero measurement.
- **Demo shell (the reference adoption):** AppShell computes the route scroller's
  scroll FRACTION (rAF-coalesced passive listener + route-settle recompute) and
  `provide()`s it (`demo/shell/useShellScrollProgress.ts`); SidebarDock wraps its
  `<GlassDock>` in `.demo-dock-progress-host` and wears `<BorderProgress>` as an
  inset-0 aria-hidden overlay. Coverage is STATE-DRIVEN: vertical rail →
  `inline-end-edge` · V↔H-settled horizontal bar → `bottom-edge` · collapsed pill →
  `full-ring` (wired off the dock's exposed `expanded`; the shell dock is
  always-expanded by design — W-NAV-DOCK-FIX — so this arm is dormant-but-correct
  here and live for any collapsing consumer). The ring dissolves in lockstep with
  the dock under the `[data-dock-morphing]` goo window (continuity, no pop).
- **Ink (design call):** the calm warm-ink two-stop ramp
  (`color-mix(in srgb, var(--foreground) 45%, transparent) → var(--foreground)`) —
  the dock is CHROME; the 13-stop brand rainbow on a nav border is a second color
  event (one-color-event rule). The warm ink flips modes for free. Thickness 11px
  (the 10-14 envelope) on `--radius-pill` — tuned against the ~67px vertical pill.
- **The standalone bar RETIRED** (clean break): the AppShell `.demo-scroll-progress`
  div + its dock-nav.css block deleted; `tests-visual/ba-animate.spec.ts` (b)
  re-pointed onto the dock ring. The `.scroll-progress` LIBRARY recipe stays (its
  consumer is `/motion/scroll-vt`).

## Post-fix paint (this dir)

- `dock-ring-chrome-{light,dark}-40pct-dock.png` — the vertical rail at ~40% scroll:
  the warm-ink band fills the content-facing edge to 40% (fill readback `39.8%`),
  hugging the stadium (ring rect ≡ dock rect, `12,16 67×720`). The dark arm reads as
  the light-cream ink over the dark plate (the mode flip for free).
- `dock-ring-chrome-{light,dark}-100pct-dock.png` — scrolled to the bottom: the band
  sweeps the full edge.
- `dock-ring-chrome-{light,dark}-40pct-full.png` — whole-page context.
- `dock-ring-webkit-light-full.png` — the real-WebKit leg at scroll 0 (fill 0% → the
  ring correctly paints NOTHING; no slab, no mask artifact).
- `mask-probe-webkit.png` — the WebKit mask-composite probe (a minimal fixture of
  the exact 3-layer stack at fill 40%): the `inline-end-edge` band paints
  CORRECTLY band-only on WebKit. **Noted:** the probe's full-ring twin (the
  PRE-EXISTING 2-layer XOR conic recipe) shows a WebKit compositing quirk — the
  collapsed-pill full-ring arm (dormant on the shell) should get a WebKit-side
  verify when a collapsing consumer binds it (booked observation, not a regression:
  the recipe is byte-old, my change touched only its gradient stops).

## Gate

`proof:border-progress` W7 (W7a fill-sweeps · W7b edge coverage · W7c the shell dock
wears the ring with the three coverage states + AppShell provides the fraction ·
W7d the standalone bar DEFINITION-ABSENT · W7e props-defer-to-cascade). Born-RED at
HEAD (6 violations, machine-verified) → PASS; 3 new self-test bites. The full gate:
**PASS**.

## Deliberate divergence

`useScrollProgress` (named in the directive) is the viewport-ENTRY mapper — the
wrong tool for a container scroll fraction; the shell computes
`scrollTop / (scrollHeight − clientHeight)` directly (the directive's intent — the
scroll position drives the value — kept; recorded in USER-0703-FIX-NOTES.md).

## Non-authoring judge

Per real-paint-protocol §3 the building agent does NOT flip any gestalt roster row;
this DELTA + captures are the build-side evidence for the fresh-agent pixel-read.
