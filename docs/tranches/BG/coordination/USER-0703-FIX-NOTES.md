# USER-0703 fix notes — F2.4 W-CORNER-ALIAS-KILL + 16.1 W-DOCK-SCROLL-PROGRESS

Fable design-author worktree notes (2026-07-03). Both waves diagnosed on LIVE paint
(real Chrome.app CDP :9456, Metal M5 Max, over the built demo :5200, `?capture=` C18
settled frames) BEFORE any edit.

---

## F2.4 — BG.W-CORNER-ALIAS-KILL (the white corner wedge)

### The paint-proven mechanism (NOT the guessed one)

The user's screenshot (a core StoryPage/landing card over the warm-pink field, white
wedges at the rounded top corners) reproduces on `/forms` (the category landing; the
forms field hue is the warm pink). Pixel forensics (elementsFromPoint + scanline +
layer-isolation toggles) found the offending layer is NOT a pseudo backplate and NOT a
corner-shape mismatch:

1. **`.story-hero-bg--bleed` is a TRAPPED fixed layer.** The full-bleed static wash
   (`position: fixed; inset: 0; z-index: -5`) mounts INSIDE the route article. The
   route entrance `.route-enter { animation: gl-route-enter … both }` holds a FILLED
   transform FOREVER (`fill-mode: both` keeps applying the `to` keyframe; Chrome
   reports `matrix(1,0,0,1,0,0)` — a computed transform ≠ `none`), so the article is a
   PERMANENT fixed-position containing block (CSS Transforms §containing-block). The
   "viewport" wash silently sizes to the ARTICLE box — an opaque near-white plate
   (`.grid-bg { background-color: var(--background) }`) with SQUARE corners exactly
   behind the un-clipped (`[data-full-bleed]` → `overflow: visible; border-radius: 0`)
   rounded translucent card → the white wedges at every corner, and the warm field
   occluded behind the whole card.
2. **The two-background collision.** The full-bleed grid/paper wash predates the
   BG.W-FIELD-AURORA shell field. Un-trapped, the opaque `var(--background)` base
   would white-out the shell field on every static-wash route — the trap bug was
   HIDING a design collision. The field owns the page; the wash must be a TEXTURE.
3. The BOXED `.story-hero-bg` arm is clipped correctly today (`.story-hero` carries
   `overflow: hidden + border-radius: var(--radius-card)`), but the layer itself
   carried no radius — one un-clip away from the same wedge.

### The class-level fixes (each one discipline, no per-site patches)

- **`src/styles/transitions.css`** — `.route-enter` fill `both → backwards`. The
  route root is the universal ancestor; a permanently-filled transform silently
  re-parents every `position: fixed` descendant. `to` ≡ base (opacity 1 / transform
  none), so `backwards` is paint-identical at rest and RELEASES the transform at
  settle. (PRM arm too.)
- **`demo/stories/StoryHero.vue`** — the bleed background arms mount via
  `<Teleport to="body">`: a viewport-fixed field layer NEVER rides inside the
  (transiently transformed) route subtree — correct from frame 0, immune to any
  future ancestor promotion (the containing-block class killed by construction, not
  by chasing ancestors).
- **`demo/stories/story-hero.css`** — `.grid-bg` drops its opaque
  `background-color: var(--background)`: the crisp grid is a translucent TEXTURE over
  the ONE shell warm field (the two-backgrounds collision resolved; `proof:suffuse`'s
  grid-visible read survives — the line inks stay). `.story-bg-paper` keeps its
  deliberately translucent `--story-paper-wash` (the grain multiply base).
- **The corner-backplate discipline** — `.story-hero-bg { border-radius: inherit }`
  (the boxed arm follows the host's rendered corner even if a future variant
  un-clips) + the bleed arm resets `border-radius: 0`.

### Gate

`proof:glass` gains the `corner-backplate` arm (BG.W-CORNER-ALIAS-KILL): CB1 the
route root's entrance fill is `backwards` (never `both`/`forwards` — the
fixed-containing-block trap), CB2 the bleed arms teleport to body, CB3 `.grid-bg`
carries no opaque background-color, CB4 the boxed backplate radius-inherit + host
clip discipline. Born-RED at HEAD on CB1/CB2/CB3 → GREEN at the fix + self-test
bites (a `both`-fill mutant, an opaque-base re-add, a radius-strip each must flag).

---

## 16.1 — BG.W-DOCK-SCROLL-PROGRESS (the scroll progress IS the dock's border)

### Found while diagnosing: the BorderProgress fill NEVER swept

At HEAD the ring paints the FULL spectrum at every value (live-verified at
`/feedback/progress`, value 42% → full perimeter painted). Mechanism: the conic is
`conic-gradient(var(--spectrum), transparent var(--fill), transparent 100%)` where
the spectrum stop list carries explicit `0..100%` positions — CSS clamps a
non-decreasing stop list, so `transparent var(--fill)` (fill < 100%) clamps UP to
100% and the "unfilled" region never exists. Fixed at the source: `spectrumStopList`
emits `calc(var(--border-progress-fill) * f_i)` positions (the spectrum spans the
FILLED arc — the documented design intent), so the registered `<percentage>` fill
interpolates the whole gradient smoothly.

### The design (compose, don't mint)

- **Library (additive):**
  - `coverage="inline-end-edge"` — the vertical leading-edge band: the SAME
    border-band mask cut-out + a third band-scope mask layer (the `bottom-edge`
    twin, `to left`), with the paint swapped to a LINEAR `to bottom` gradient so the
    fill maps the value LINEARLY along the block axis (the scrollbar metaphor; a
    conic maps an edge nonlinearly). ONE mechanism, coverage-scoped masks.
  - Props defer to the cascade when unset: `radius`/`width` write their inline
    custom property ONLY when provided, so a consumer themes the ring off
    `--border-progress-radius`/`-width` tokens (the dock ring follows
    `--radius-pill` with zero measurement).
- **Demo shell (the reference adoption):**
  - AppShell owns the route scroller → computes the scroll FRACTION
    (`scrollTop / (scrollHeight − clientHeight)`, rAF-coalesced passive listener +
    route-settle recompute) and `provide()`s it. (`useScrollProgress` is the
    viewport-ENTRY mapper — the wrong tool for a container scroll fraction; the
    directive's intent — the scroll position drives the value — is kept, recorded
    here as the deliberate divergence.)
  - SidebarDock wraps its `<GlassDock>` in `.demo-dock-progress-host` and mounts
    `<BorderProgress>` as an `inset: 0` sibling overlay (`aria-hidden` — decorative;
    the scroll position stays reachable via the scroller). Coverage is STATE-DRIVEN:
    vertical expanded → `inline-end-edge` (the content-facing edge fills top→bottom
    with scroll); the V↔H morph settled horizontal top-bar → `bottom-edge`;
    a collapsed pill → `full-ring` (wired off the dock's exposed `expanded` — the
    shell dock is always-expanded, so this arm is dormant-but-correct here and live
    for any collapsing consumer).
  - Continuity: the ring dissolves in lockstep with the dock under the
    `[data-dock-morphing]` goo window (the same opacity clock) — no pop across the
    topology flip; radius rides `--radius-pill` in both orientations (stadium →
    stadium).
  - Ink: the warm-ink two-stop ramp (`color-mix(in srgb, var(--foreground) 45%,
    transparent) → var(--foreground)`) — the dock is CHROME; the 13-stop brand
    rainbow on a nav border is a second color event (the one-color-event rule), and
    the warm ink flips modes for free. Thickness 11px (the 10-14 envelope, tuned
    against the 67px pill on captures).
  - The standalone `.demo-scroll-progress` bar RETIRES (clean break): the AppShell
    div + the dock-nav.css block deleted. The `.scroll-progress` LIBRARY recipe
    stays (its consumer is the `/motion/scroll-vt` story).

### Gate

`proof:border-progress` gains W7 (the dock-consumer arm): W7a the fill actually
sweeps (calc-scaled spectrum positions), W7b `inline-end-edge` shipped (union +
coverage-scoped mask), W7c the shell dock carries the scroll-progress border with
the three coverage states wired, W7d `demo-scroll-progress` DEFINITION-ABSENT,
W7e props-defer-to-cascade. Born-RED at HEAD on W7a-W7e → GREEN + self-test bites.
