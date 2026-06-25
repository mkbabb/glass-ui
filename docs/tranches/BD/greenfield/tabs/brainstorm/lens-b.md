# Tabs greenfield — Lens B (cross-engine / perf-first)

The TABS component is the user's designated GLASSY GOLD STANDARD — the reference the
default Button and the dock-buttons greenfields will emulate. This lens designs the
tabs anew through the WebKit-parity + compositor-only + KISS lens, reconciles
`BD.W-TABS-LIQUID` and `BD.W-TAB-IOS-CAPSULE` into one shipping spec, and **extracts the
reusable glassy register** the buttons greenfield consumes.

It is a UNION with the shipped tree, never a re-fork. Every cited token/composable was
source-verified on disk and live-read in the browser (findings below).

---

## §0 — Live interrogation (the painted truth, both modes, `:5173/navigation/tabs`)

I reproduced the real tab-switch gesture in Chrome and read computed style on the live
indicator/track. The grounded findings (these are the bar the greenfield must clear,
NOT claims):

1. **The glide + squish IS real but ONLY a volume-preserving stretch — no blob
   over-inflation.** On a far jump (Grid→Timeline) the indicator opens `--stretch` to
   **1.131** as an anisotropic squish (`scale: 1.13152 0.883769` — X stretch, Y
   compress, area-preserving) and releases to `1`. Measured indicator area held ~1714–1811px²
   across the travel — it never inflated PAST the destination footprint then de-inflated.
   So `useTabIndicator`'s `squishOnTravel` is phases 1+3+4 smeared into one gel-stretch;
   there is **no GROW-from-source, no metaball OVERSHOOT, no SHRINK-to-fit** — exactly the
   gap `W-TABS-LIQUID` names. The glide rides `transition: inset/scale 0.4s` on the
   `--spring-snappy` `linear()` curve (verified the full 47-stop curve is live).
   **VERDICT: the glide is liquid-ish, the squish is real but thin; it is NOT yet the
   5-beat iOS-27 morph.**

2. **The active tab is a GLASS plate but reads WEAK — it does not register as "the gold
   standard" in situ.** Computed indicator fill resolves the shared adaptive seam
   (`--glass-bg-floating-tinted`, `--glass-tint-strength: 20%` engaged over the bright
   field → `oklab(0.793 0.005 0.012 / 0.84)`), backdrop `blur(13px) saturate(1.6)`, and a
   real lift composite (`--glass-rim-top` + `--glass-rim-bottom` + `--glass-shadow-floating`
   = `0 8px 24px / 0.14`). The seam + lift are correctly built. **BUT** in the painted
   pixel (both modes) the lozenge is barely distinguishable from the track — a faint
   brighter rectangle, not an unmistakable LIFTED warm-cream capsule. In dark mode it is
   worse: Timeline's pill is a near-invisible lift over a dark-brown bar.

3. **The track does NOT sink and reads GRAY-over-vibrant.** Track `box-shadow` is
   rim-only (`inset 0 1px 0 / 0.3`, `inset 0 -1px 0 / 0.06`) — **no inset recess leg**.
   So the iOS-27 recessed-channel is unbuilt (`W-TAB-IOS-CAPSULE` C1 confirmed RED).
   Worse: although the track `background-color` token is warm-cream
   (`srgb 0.994 0.96 0.926 / 0.5`), in situ over the pink/blue aurora field the
   `saturate(1.4)` pulls the neutral substrate through and the strip reads **GRAY** (light)
   / **flat warm-brown** (dark). This is the BA.W-NO-GRAY warm-floor violation surviving in
   the *painted* pixel even though the *token* is warm — the classic "device-free gate
   passes, the eye fails" trap.

**The gestalt verdict on HEAD: the tabs are 70% there — the engine, the adaptive seam,
the shared `useLiquidFlex` are all fit. What is broken: (a) the track is a flat gray-reading
plate, not a sunken warm well; (b) the capsule lift is too timid to read as the gold
standard; (c) the morph is a thin stretch, not the 5-beat blob. The greenfield REFINES (a)
and (b) and RE-INVENTS (c) — it does not re-fork the fit engine.**

---

## §1 — The core idea: ONE recessed-well + ONE warm-glass capsule + the 5-beat blob, on ONE clock

The tabs render as the unmistakable iOS-27 segmented control: a **warm-glass channel that
SINKS** (a recessed well with a real inset groove) holding a **raised, lit warm-cream
capsule that LIFTS** and GLIDES between segments with a **5-beat liquid blob morph**
(grow → overshoot → travel-swollen → settle → shrink-to-fit) plus a **one-shot accent
flood** on commit. The whole thing is pure compositor `transform`/`scale` + static box-shadows
+ one registered `@property` scalar — zero `backdrop-filter: url()`, zero WebGL, zero SVG
goo, so it paints byte-identically on Safari.

This unifies the two waves cleanly:
- **`W-TAB-IOS-CAPSULE`** owns the MATERIAL — the recessed track + the raised capsule, minted
  once as a shared register, read by both `SegmentedTabs` and the dock-tab selected arm.
- **`W-TABS-LIQUID`** owns the MOTION — the 5-beat envelope, layered ON that capsule material
  via a second `useLiquidFlex` channel.

They compose on ONE clock (`--tab-indicator-duration` = `--spring-snappy-duration` = 0.4s,
verified live) and ONE position engine (`useTabIndicator`, untouched). No second engine.

### The mechanism, layer by layer (all verified levers)

**(A) The recessed warm well — fix the gray, sink the channel.**
The `.segmented-tabs` track gains a third box-shadow leg: a PLAIN per-mode inset recess
`inset 0 1px 2px var(--tab-track-recess-ink)` (light arm in `tokens/glass.css`, dark arm in
`tokens/dark-arm.css` — NEVER a `light-dark()` fragment; the inset-shadow-trap MEMORY is
binding: an inset fragment inside `light-dark()` computes the whole box-shadow to `none`).
`--tab-track-recess-ink` is a bounded `color-mix(in srgb, var(--foreground) ~8%, transparent)`.
To kill the gray-over-vibrant read, the track's `saturate()` is dropped one notch on the
quiet tier OR the track gains a thin warm under-tint floor — the greenfield's measured fix is
to **raise the track's warm admit-through**: the track composes `--glass-bg-quiet` mixed
toward `--glass-tint-source` (the warm-amber source) at a small floor so it reads warm-cream
even when the aurora desaturates the substrate. This is the BA.W-NO-GRAY register applied to
the painted pixel, not just the token. (Verified: `--glass-tint-source` resolves to
`light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` — warm both modes.)

**(B) The lifted warm capsule — make the gold standard READ.**
Factor the existing `.segmented-indicator` lifted-plate composite (`--glass-bg-floating-tinted`
+ directional rim + `--glass-shadow-floating`) into a SHARED `.glass-tab-capsule` recipe
(`src/styles/glass/tab-capsule.css`, `@layer components`). The capsule is the iOS raised
selected-accent lozenge; `.segmented-indicator` composes it, and the dock-tab selected arm
re-points onto the SAME recipe (the fold). To make it read as the gold standard the lift is
**strengthened over HEAD's timid version**: keep the W55 adaptive `--glass-bg-floating-tinted`
fill (no fork — verified it darkens-over-bright / stays warm-over-calm), but deepen the
under-shadow contrast against the now-SUNKEN well so the capsule-vs-track luminance delta is
unmistakable (`capsule meanL > track meanL > track-recess-edge meanL` — the W-TAB-IOS-CAPSULE
π assertion). The capsule sits in the sunken channel; the sink + lift TOGETHER create the
read that neither does alone (this is why HEAD's lift-without-sink fails the eye).

**(C) The 5-beat liquid blob — RE-INVENT the morph.**
Mint `@property --tab-blob { syntax: "<number>"; inherits: false; initial-value: 1; }` in
`property-regs.css` §18 (the `--stretch`/`--specular-*`/`--glass-accent` registered-scalar
precedent — verified that file registers exactly these). Add a SECOND `useLiquidFlex` channel
in `useTabIndicator.ts` beside the existing travel-squish channel (the file already constructs
ONE `useLiquidFlex` at line 172 — verified): `useLiquidFlex({ from: 1, to: <overshoot-peak>,
axis: "width", squishLaw: "linear", maxStretch: () => blobCap })` where `blobCap` reads a NEW
`--tab-indicator-blob-max` token (default ~1.12, capped ≤1.2 — the anti-taffy bar). The
envelope drives `--tab-blob` as a HUMP across the travel: peaks during the first ~40%
(grow+overshoot), holds swollen mid-travel, de-inflates to 1 at arrival (settle+shrink) —
re-using the EXISTING `clockMs(el)` + `INDICATOR_RELEASE_AT_ARRIVAL` schedule the squish
release already reads (verified lines 190–254). ONE timer, both channels release in lockstep.
The CSS combines both scalars into ONE `scale` write (it is a single property):
```
scale: calc(var(--tab-blob, 1) * var(--stretch)) calc(var(--tab-blob, 1) / var(--stretch));
```
The blob inflates BOTH axes uniformly; the squish stretches one / compresses the other
reciprocally — area-times-squish, volume-preserving-squish ON a uniform inflation,
center-anchored (the BA-VJS-3 center-pin is preserved — verified the indicator is
center-translated, so the scale stays pinned to the label center).

**(D) The accent flood + per-glyph pop (the iOS27 T4 effects leg, EFFECTS trail SPATIAL).**
On commit, a one-shot accent flood: a `--tab-accent-flood-t` 0→1→0 wash over the selected
capsule reading the consumer's `--glass-accent` (verified: `--glass-accent` is
`@property`-registered, transparent default → provable no-op when unset; presets-in-consumers
— the library default is the neutral lift, the consumer sets the crimson). The flood is a
`plus-lighter`/`color-mix` brightness pulse that TRAILS the spatial glide by a beat (the v3
f006→f007 sequencing) then clears — driven on the same release schedule, PRM-static. The
label cross-fades on the existing `transition: color var(--duration-fast)` (verified live).
The per-glyph scale-pop (~1.12×, the §L4 exaggeration) is opt-in for the icon-bearing dock-tab
variant, composing the IconChip reveal — NOT forced on text tabs.

---

## §2 — THE EXTRACTED GLASSY REGISTER (what buttons + dock-buttons consume)

This is the load-bearing deliverable. The "glassy register" the user wants buttons to
emulate is **already 80% extracted in the shipped tree** — the greenfield NAMES it, hardens
it, and points the buttons at it. It is the union of four shipped seams plus the two new
capsule legs:

### The register: `.glass-tab-capsule` + the lifted-control recipe

| Layer | Token / lever (all verified on disk) | Role |
|---|---|---|
| **Adaptive warm fill** | `--glass-bg-floating-tinted` (`surfaces.css:282`, the `:where(.btn-glass, .segmented-indicator)` seam — WIDEN to include `.glass-tab-capsule`) | Warm-cream over calm, darkens-to-legible over bright (W55). NEVER gray, never a `--surface-tint` plate. |
| **Real glass blur** | `--glass-blur-floating` (`blur(13px) saturate(1.6)`) / `--glass-blur-btn` for buttons | The transmissive read. |
| **Directional rim** | `--glass-rim-top` (bright catch-light) + `--glass-rim-bottom` (warm under-shadow) | The lit top edge / grounded bottom — the FORWARD-ness device. |
| **Lift drop** | `--glass-shadow-floating` (`--shadow-xl` family) | Lifts the lozenge off the track ~2–3px. |
| **Recessed well (NEW)** | `--tab-track-recess-ink` (plain per-mode inset, NOT `light-dark()`) | The sunken channel the capsule rides in — the iOS-27 depth half. |
| **Pointer specular** | `v-specular` directive (`createSpecularWriter`, verified) | The moving catch-light hover gleam. |
| **Press squish** | `useSpringPress` + `useLiquidFlex` (`maxStretch: 1.04`, verified Button already wires this) | The coupled press deform. |
| **Hover lift** | `--glass-specular-intensity-hover` bump + deeper `--glass-btn-under-shadow-hover` | The "lifts a notch on hover" register. |

**The buttons greenfield consumes this by:** (1) pointing the default Button variant's
selected/active/glass fill at `--glass-bg-floating-tinted` (it already does for `.btn-glass`
— verified — so the move is making it the DEFAULT register, not opt-in); (2) adding the
`.glass-tab-capsule` lift composite to the resting button so a default button reads as a
lifted warm-glass lozenge; (3) keeping the `v-specular` + `useSpringPress`/`useLiquidFlex`
wiring Button ALREADY has (verified Button.vue lines 90–141); (4) deepening the hover gleam +
under-shadow so the hover state matches the tab's lifted-capsule read. **The dock-buttons fold
their selected arm onto `.glass-tab-capsule` directly** (re-point `--dock-control-active-bg`
→ the capsule, one selected-accent language across content tabs and dock tabs).

Net: the register is a CSS recipe (`.glass-tab-capsule`) + a token cohort + three composables
(`v-specular`, `useSpringPress`, `useLiquidFlex`) — all shipped, all reused, zero new engine.

---

## §3 — Cross-engine (Chrome + Safari) + performance

- **Compositor-only throughout.** The glide is `inset`/`transform`, the morph is `scale`
  (two registered scalars `--tab-blob` × `--stretch` combined into one property), the lift is
  STATIC box-shadow, the recess is STATIC inset shadow. No layout animation
  (`proof:no-layout-animation` holds). `sizeStyle` from `useLiquidFlex` is NOT bound to the
  animated channel (the BB.W-MOTION-CANON P5 SIZESTYLE-LATENT rule — verified in the
  composable header); the footprint is reserved once, the visible motion is `transform`/`scale`.
- **NO `backdrop-filter: url()`.** The capsule + recess are plain blur + box-shadow + scale —
  the §L7 floor. The optional `:liquid` refraction edge stays a `@supports (backdrop-filter:
  url(#…))`-GATED Chromium-only enhancement with the plain-blur WebKit fallback (verified
  Button.vue `liquidDecoration` already does this) — never un-gated.
- **`@property --tab-blob` interpolation is Safari-26 Baseline;** on a gap engine the
  `initial-value: 1` is the safe rest (the indicator slides without the blob inflation — never
  broken). Enroll on the webkit Playwright project + a `safari-support-matrix` row.
- **sRGB / no naive ellipsoid:** there is no metaball goo HERE (the tab blob is a CSS `scale`
  on the indicator's own rounded box, the stadium `--radius-tab` corner — verified
  `border-radius: 10003px` resolves to a true stadium). The dock-fission goo (the actual
  metaball) is the disjoint `DockGooFilter` register; this wave does not touch it.
- **Offscreen-pause / cheap:** the morph fires only on selection (a discrete gesture), runs
  for one 0.4s clock, then idles. No rAF loop, no steady-state cost. The `v-specular` gleam is
  the only pointer-driven channel and it is the shipped directive (PRM-skips the write).

---

## §4 — A11y / PRM carve

- **PRM (`prefers-reduced-motion: reduce`):** the squish early-return (verified
  `useTabIndicator.ts:206`) already skips the stretch; the SAME branch gates the blob write so
  `--tab-blob` stays 1 (zero inflation, the indicator snaps to fit — vestibular-safe). The
  accent flood is PRM-static (a single frame, no pulse). The recess + lift are STATIC (a
  sunken well + a lifted accent need no motion — the legibility floor holds for everyone).
- **`prefers-reduced-transparency`:** the recess inset ink is opaque depth (survives as a
  legibility anchor); the capsule fill rides the `--glass-level:0` opaque-escape the seam
  already composes.
- **`prefers-contrast: more`:** the recess ink + the rim floor up (the inked edge is a
  legibility asset, the §Shadows carve).
- **Proportion (§L6):** the stadium `--radius-tab` + the concentric track radius
  (`--bouncy-slider-radius + --bouncy-track-trim`, verified) are geometry — no a11y bracket,
  they hold across all states. The capsule corner is concentric with the track (Apple's
  `.containerConcentric`).
- **Reduced-motion still FUNCTIONS:** selection works, the glide is instant, the gold-standard
  read (sunken well + lifted warm capsule) is fully present — only the blob/squish/flood are
  off.

---

## §5 — The reconcile + the fences (DEFT union, no re-fork)

- **`W-TAB-IOS-CAPSULE` (material) + `W-TABS-LIQUID` (motion) are ONE wave-amendment** sharing
  ONE clock + ONE position engine + ONE `useLiquidFlex` primitive (now its 5th consumer beside
  the squish, the metaball shader, the dock-fission recoil, the Button press — verified all
  exist). The capsule is the surface; the blob is the envelope on it.
- **No second spring, no second timer, no `@keyframes`** — the envelope rides the existing
  `clockMs`/`INDICATOR_RELEASE_AT_ARRIVAL` schedule; the spring shaping is the snappy CSS glide.
- **No new component, no `DockTabBar` SFC** — the dock-tab register is the existing
  `DockTabButton` re-pointing its selected arm onto `.glass-tab-capsule` (verified it already
  composes `v-specular` + `--dock-control-active-bg`).
- **The travel-squish channel is byte-fenced** — the blob is an ADDITIVE second channel; HEAD's
  `--stretch` `1 + frac·(cap−1)` linear write (cap 1.18, verified — note: the wave doc said
  1.15, the live cascade is **1.18**, so the gate must read the live token, not the doc number).
- **Presets-in-consumers:** the library owns the 5-beat envelope, the recess depth, the capsule
  lift, the `--tab-blob`/`--tab-track-recess-ink`/`--tab-indicator-blob-max` axes (the iOS
  identity). The consumer owns the accent-flood hue (`--glass-accent`) and any themed retint.
  ZERO-delta at rest / unset accent.
- **No `--motion-weight` / `--ease-cartoon-punch` cited as shipped levers** — these are
  design.md §L4/§L2 canon NOT yet minted in `src/styles` (verified absent). The morph honors
  the cartoon register's WEIGHT/exaggeration through the shipped `--spring-bouncy` (ζ 0.45,
  ~9% overshoot) for the blob settle if a louder arrival is wanted; any actual
  `--ease-cartoon-punch` use is a Band-0 mint dependency, named, never assumed.

---

## §6 — The gate (must reproduce the gesture + judge the painted gestalt)

The binding π reproduces the REAL tab-switch gesture (`select(toIdx)` on
`/navigation/tabs`, both modes + webkit, NEVER `reducedMotion`) and judges painted pixels —
no arithmetic, no stop-string, no seed-overfit, no computed-not-measured:
- **Grow+overshoot:** the indicator bounding-box AREA inflates PAST the destination tab
  footprint (peak ~1.08–1.12×) across early frames; a `--tab-blob: 1` control never exceeds.
- **Travel-swollen:** center-x traverses the gap while area stays >1.
- **Settle+shrink:** area de-inflates to the destination footprint with a ζ<1 micro
  overshoot-undershoot (legible across ≥2 frames, not a one-frame snap).
- **Sink+lift (the gold standard):** vertical luminance scan reads
  `capsule meanL > track meanL > track-recess-edge meanL` — the channel SINKS, the capsule
  LIFTS — AND the track `meanChroma >= 0.02` (warm, not gray) over the vibrant field, BOTH
  modes. This is the assertion that catches the painted-gray defect §0.3 found.
- **The fold:** the SegmentedTabs pill and the dock-tab selected accent resolve the SAME
  computed `background-color` (the shared capsule off the shared seam).
- **Center-pin:** the indicator stays pinned to the label center across the whole envelope.
- **Material fence:** `variant="underline"` reads a crisp SLIDE, zero area inflation.
- **PRM:** one static frame, `--tab-blob: 1`, sink+lift present.

---

## §7 — The single boldest move

**Stop treating "lift" and "sink" as two separate features and fix the gold-standard read by
their COMPOSITION: the active capsule only reads as the unmistakable iOS-27 gold standard when
the channel SINKS (a real per-mode inset recess) AT THE SAME TIME the capsule LIFTS into a
warm-cream well — and prove it in the PAINTED pixel with the `capsule meanL > track meanL >
track-recess-edge meanL` luminance-ladder gate, not a token-value check.** HEAD ships the lift
without the sink and the eye reads a faint rectangle on a gray bar (verified live, both modes);
the bold move is the luminance-ladder as the binding bar, which simultaneously forces the
no-gray warm-track fix AND the recess AND the strengthened lift to all land together — and
that exact three-layer warm-glass capsule recipe (`.glass-tab-capsule`) is what the default
Button and dock-buttons then adopt verbatim, so "make buttons glassy like the tabs" becomes a
ONE-recipe substitution, not a per-component reskin.
