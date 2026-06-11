# AZ.W-ADAPTIVE-AUTO — the dock self-engage no-op fix + the sampled-luminance observer + the all-glass-views readability sweep · DELTA

<!-- surface-paths: src/styles/dock/morph.css, src/styles/dock/shell.css, src/styles/glass/ladder.css, src/styles/tokens/glass.css, src/composables/glass/useGlassBackdropLuminance.ts, src/components/custom/dock/GlassDock.vue, src/styles/animations.css -->
<!-- surface-hash: e4a31cedc6b91b0fe4a9a4ccf06527520e15c784588646f369d091689fac1a5e -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the seven surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface re-capture against the current AZ-tree bytes — the live dock /
     glass-material / modal scrim were shot on :5199 with the wave's source edits in
     place. -->

The G2 defect the user reported live (R3-7, "Glass dock over VERY LIGHT materials is
unreadable — darken DYNAMICALLY like iOS 27 so we can actually see these elements") is
closed: the dock + the plain content-glass tiers self-darken over light backdrops with
ZERO consumer opt-in, and a sampled-luminance observer DERIVES the bright signal for the
animated-backdrop case. The π in-situ readback (G1) clears 4.5:1 body + the ΔL silhouette
over the worst-case-light backdrop on every enrolled route.

## The root cause — the self-engage NO-OP (C5-2 / C5-3)

AY.W-A11Y-PERF O-1 set `--glass-backdrop: light` on the dock's OWN root intending a
self-darken, but **CSS style queries NEVER self-match** — the only re-point was the
ancestor-querying `@container style(--glass-backdrop: light)` block, which can never fire
when the dock IS the element that declares the bucket. LIVE-PROVEN at HEAD: the dock plate
L=0.88 over page L=0.89 (ΔL≈0.01 — the plate vanishes). The misleading `shell.css:67-73`
comment claimed a "SELF-engage rule in dock/morph.css" that did not exist.

## The fix (three arms)

### Arm 1 — the unconditional self-engage + the AA-floor recalibration (CSS only, no JS)

- **`:where(.glass-dock)` self-engage** (dock/morph.css) — the genuine UNCONDITIONAL
  self-darken, mirroring the overlay band's `ladder.css:169`. Re-points the inheriting
  `--glass-tint-source`/`--glass-tint-strength` + the `--dock-fg-on-aurora` twin directly
  on the dock root. The ancestor-querying `@container` block is KEPT (it still reaches the
  descendant nested-glass when a consumer marks the bucket on an ancestor).
- **The substitution-vs-inheritance trap, defeated (§3a — pre-empted, then live-found on
  TWO surfaces the trap warning named).** The self-engage re-points the tint tokens, but
  the surfaces that read the PRE-SUBSTITUTED `--glass-bg-dock` token (baked at the `:root`
  0% strength) do not darken. Two such surfaces were live-found and fixed to compose the
  oklab tint AT THE ELEMENT: (a) the morph-root COLLAPSED endpoint (`morph.css` — the
  collapsed dock painted the un-tinted `--glass-bg-wash`, ΔL≈0.01 re-surfaced); (b) the
  vertical RAIL (`shell.css:265` — `.variant-rail` read `var(--glass-bg-dock)` raw). Both
  now wrap the element-level `color-mix(in oklab, …, var(--glass-tint-source)
  var(--glass-tint-strength))`. The rail bg moved from `oklab(0.986 … / 0.42)` (L=0.99,
  un-darkened) to `oklab(0.699 … / 0.536)` (L=0.70 — a clear silhouette).
- **Content tiers** (`ladder.css`) — the self-engage EXTENDS to
  `.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash` (the W54 glass-first MAXIMAL
  default made content-on-glass-over-light the common case; C5-7 asymmetry closed).
- **The muted-ink geometry — the §11 deferral condition met + reconciled.** The math
  proves `--muted-foreground` (L40) CANNOT clear 4.5:1 on a translucent darkened plate:
  darkening moves the plate TOWARD muted's own luminance (contrast bottoms at ~1.1:1 near
  60% strength). So the self-engage LIFTS the muted body register to the full warm-ink
  `--foreground` (clears ~10:1) — a token re-point on the same inheriting axis as the tint
  (the low-contrast muted register is inappropriate over a busy translucent glass plate).
- **AA floor recalibrated 18% → 20%** (`tokens/glass.css`) — strengthens the silhouette
  ΔL (≈0.40 over white) while bounded ≤24% (the iOS clamp, translucent floor preserved).
  The §X overlay-band re-ratify holds: `--foreground` reads ~10.6:1 at 20% (within the
  ~11:1 ratified register — a silhouette strengthening, not a silent re-tint below AA).
- **The shell.css comment** corrected to describe the real `:where(.glass-dock)` rule.

### Arm 2 — the sampled-luminance observer (the iOS-27 dynamic refinement)

`useGlassBackdropLuminance(targetEl)` (src/composables/glass/) — composes the EXISTING
substrates (`useRAFLoop` / `useIntersectionPause` / `useResizeObserver` + the
`resolveTokenColor` leaf, NO hand-rolled rAF). It samples the painted backdrop
(`elementsFromPoint` stack-walk for static pages; downsampled-canvas `drawImage +
getImageData` for the animated WebGL case), computes WCAG luminance, and writes
`--glass-backdrop-luma` (0..1, its FIRST real consumer — the B3-1/E3G-4 delta) + the
discrete `--glass-backdrop: light|dark` bucket on the target. rAF-throttled ≤4Hz (≥250ms),
IntersectionObserver-gated, parks on `document.hidden`/offscreen, and COLLAPSES the live
loop to a single mount sample under `prefers-reduced-motion: reduce` (the substrate-PRM
mirror). **H3 arm (a): wired ON by default for the dock** (the surface the user reported,
most often over a live/bright backdrop); opt out via `:auto-luminance="false"` or
`--glass-tint-strength: 0%`. **Path B (demo-private)**: OFF the public glass barrel — the
dock is the binary consumer #1, the demo mount on `/substrates/glass-material`
(`data-glass-sample="live"`) is the exerciser (NOT binary, W-PRUNE2 E4-3), and
`docs/consumer-evidence/use-glass-backdrop-luminance.md` names the booked 2nd-binary
promotion trigger. The live readout reads `LUMA 0.385 · DARK` over the page's aurora
substrate (the dynamic signal is live).

### Arm 3 — the all-glass-views readability sweep (the binding π gate G1)

`proof:adaptive-glass-live` (born-RED → GREEN) walks the 9 enrolled routes IN-SITU (NO
injected ancestor bucket — the C5-4 blind spot closed) and asserts every body-bearing
glass surface clears its floor (4.5:1 content / 3:1 large dock glyph) + the ΔL silhouette
(≥0.08) over the synthetic-white worst-case plate, staying translucent. **36 passed, 0
failed** (both projects). The text-walker discounts decorative control affordances (a
Switch track composes `.glass-wash` but paints its checked saturated-pill register — not a
body surface).

### A5-1 — the modal-scrim double-wrap (the readability-sweep token-discipline defect)

`dialog.glass-top-layer::backdrop`'s three dim arms read `hsl(var(--background) / α)`, but
`--background` is a COMPLETE `hsl()` color (`hsl(48 12% 98%)`), so `hsl(hsl(…)/α)` is the
invalid double-wrap — the modal dim silently did not paint. Fixed to the house
`color-mix(in srgb, var(--background) Npct, transparent)` at all three arms
(`animations.css`); the `scale-paper.css` mislabeled "legitimate single-token alpha case"
note corrected. The capture shows the scrim dim now PAINTS (the page behind is dimmed).

## Artefacts

| file | what it shows |
|---|---|
| `W-ADAPTIVE-AUTO-dock-over-light-{light,dark}.png` | the dock self-engage darken over a synthetic-white plate — the legible silhouette (vs the prior ΔL≈0.01 vanish) |
| `W-ADAPTIVE-AUTO-observer-readout-{light,dark}.png` | the live observer writing `LUMA 0.385 · DARK` on a glass-card over the page aurora (the dynamic refinement) |
| `W-ADAPTIVE-AUTO-modal-scrim-dim-painted.png` | the A5-1 fix — the `::backdrop` dim PAINTS (the page behind dimmed) |

## Gates

- `proof:adaptive-glass-live` (G1, born-RED → GREEN) — 36 passed / 0 failed in-situ π.
- `proof:adaptive-observer` (G2) — 14/14 (the write + the throttle/gate + the PRM mirror +
  the path-B no-overfitting bar).
- `proof:adaptive-glass` (structure, re-pointed) — 28/28 (the self-engage rules + the A5-1
  source bite).
- `proof:glass-cohesion` GREEN; `vue-tsc --noEmit` GREEN; `npm run build` GREEN.
