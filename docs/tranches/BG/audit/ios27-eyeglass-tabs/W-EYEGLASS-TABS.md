# BG.W-EYEGLASS-TABS — the wave spec (the iOS-27 eye-glass tabs register)

> The binding wave spec for the eyeglass register on `SegmentedTabs`. Authored per the USER 07-10 directive +
> the mid-turn AMENDMENT ("backed by a concrete research, plan, and tranche write phase … not a frenetic and
> adhoc implementation"). This spec FOLDS `EYEGLASS-TABS-DIRECTIVE.md` (the constitution) + `RESEARCH-KINEMATICS.md`
> (Arm 1) + `RESEARCH-FEASIBILITY.md` (Arm 2) + `RESEARCH-CENSUS.md` (Arm 3) + `EYEGLASS-TABS-PLAN.md` (the
> critiqued synthesis, verdict SOUND-WITH-FIXES, AC1–AC8 applied) into the wave the orchestrator folds via
> `FOLD-BLOCK.md`. The engine IMPLEMENTS the wave; the orchestrator OWNS the cursor. This doc writes ZERO
> `src/`/`demo/`/`scripts/`/`styles/`.
>
> **Wave id:** `BG.W-EYEGLASS-TABS` · **family:** F2 (Glass — the make-or-break signatures are all glass optics;
> sibling of F2.5 W-GLASS-DEPTH-TIER, an opt-in glass-tier register) · **class:** `[P]` paint-gated · **gate:**
> `proof:eyeglass-tabs` (device-free, `["local","ci"]`) + the binding π (a DRIVEN 60fps frame-series).
>
> **Precedence when the arms disagree:** on-disk HEAD > Arm 3 census > Arm 2 feasibility > Arm 1 kinematics
> (Arm 1 measured a device recording; the house has since made its own calibrated iOS-27 decision — §0).

---

## §0 — Verdict + the resolved spring discrepancy (read first)

**The eyeglass tabs are a proud liquid-glass loupe that COMPOSES house primitives — not a new component, not a
new engine, not a new spring.** The register is an ADDITIVE boolean mode on the ONE `SegmentedTabs` engine:
`.glass-lens` (Chromium refraction) + `.glass-capsule` (the honest cross-engine plate) + `--glass-accent` /
`--glass-ambient-hue` (rim hue-steal) + the shipped `useTabIndicator` kinematics, retuned against the `bar60/`
reference ladder. The whole genuinely-new delta is deliberately small (§10): one boolean axis, one geometry
token, one stage-frost token, a class compose, an opt-in glyph-ink seam, plus a token recalibration. Arm 3's
"~90% already on disk" verdict is confirmed against HEAD.

**The one contradiction between the arms, resolved against the source of truth.** Arm 1 maps the measured travel
onto "`--spring-snappy` (response 0.35, ζ 0.65–0.7)"; Arm 2 maps it onto "`snappy` (0.48s, ζ=0.74, ~+3.2%)".
Same token, different numbers, because **Arm 1 cites the retired pre-BD snappy.** The current source of truth
(`src/composables/motion/springPresets.ts`, verified HEAD) is:

| preset | response | ζ | analytic overshoot | register |
|---|---|---|---|---|
| **snappy** | **0.48s** | **0.74** | **+3.2%** | CONTROL — the tab-indicator glide (current) |
| dock | 0.68s | 0.64 | +7.3% | the weighty V↔H morph |
| press | 0.20s | 0.80 | +1.5% | the interactive tap |
| bouncy | 0.60s | 0.60 | +9.5% | emphatic one-shots |

`--spring-snappy-duration = 0.4s` (generated `t_s = −ln(0.02)/(ζ·ωₙ)`, read-only). **Arm 2 is correct vs HEAD;
Arm 1's 0.35/0.65 is stale.** The BD tuning DELIBERATELY made snappy "quick-but-WEIGHTY" as the house iOS-27
identity. **This wave RATIFIES that decision** (Ruling 1) rather than re-deriving a device-specific number.
The residual gap — the reference reads ~15–20% quicker, its 1-slot leftward leg overshoots ~8% vs snappy's
3.2% — is absorbed by the retunable SIZE channels + the convergence band, NEVER a positional-spring change
(§4.4 books a snappy-family re-time to a spring-register wave with its own sign-off; §0 records the perceptual
consequence loud per AC8 — a reviewer comparing to the Find My video will see a deliberately heavier glide,
an identity divergence, not a bug).

---

## §1 — THE EYEGLASS REGISTER (the design)

### 1.0 — Activation surface

An additive boolean axis **`eyeglass?: boolean`** on `SegmentedTabs` (default `false`), **`pill`-only** (the
`underline` material is a bare `.paper-ink-mark` hairline with no plate to loupe — eyeglass is ignored on it,
not an error). ORTHOGONAL to the `variant` (pill·underline) MATERIALS axis and to the `:draggable` / `:responsive`
axes — it stacks like they do. `eyeglass` flips a `data-eyeglass` attribute the CSS reads (the `data-density` /
`data-size` precedent) and opts the strip into: (a) `.glass-lens` on the indicator, (b) the proud geometry,
(c) the stronger stage frost, (d) the accent/ambient rim wire. Default `false` ⇒ byte-identical to the shipped
`.glass-capsule` pill (`proof:tabs-ios` / `proof:tabs-std` stay green by construction).

### 1.1 — GEOMETRY: the proud loupe (signature #2 — make-or-break)

**Measured (Arm 1 §2c, [H]):** pill/bar height ≈ **1.14×**; crown overflows **+14px above** the bar top, base
**+12px below**; rest width ≈ **1.08–1.10× the slot** (290–300px over a 271px slot). A loupe RESTING ON the
track, taller than its slot on both edges — not the current inset highlight.

**Mechanism — the literal inverse of today's inset (STATIC, compositor-safe).** Today `.segmented-indicator`
insets INTO the track (`inset-block: var(--bouncy-track-trim)`, 0.1875rem→0.25rem@640). Under `data-eyeglass`
the block inset becomes a **negative static outset** so the crown/base spill PAST the track. This is a **static
box reservation, never an animated dimension**, so it clears `proof:no-layout-animation` with no new allowlist
entry (the existing `size-morph-indicator-booked` entry, `props:["width","height","inset"]`, covers a CONSTANT
proud addend to the already-booked animated `inset` — verified proof-no-layout-animation.mjs L199-203). The
block-axis outset does NOT touch the inline glide math (center-anchored, unchanged) — the proud pill translates
as one rigid loupe.

- **[C3 — the proud MUST land on the ANCHOR path too, or Safari-26 gets NO loupe.]** The `inset-block:` shorthand
  reaches ONLY the JS `@supports not (anchor)` fallback (`.segmented-indicator--js`, segmented-tabs.css L93). On
  the anchor-primary path (`.segmented-indicator--anchor`, the Safari-26 + Chrome path, verified L174-200) the
  block edges are FOUR longhands `inset-block-start: calc(anchor(top) + 0.1875rem)` etc. So the proud MUST be
  restated on the anchor longhands as `calc(anchor(top) − var(--eyeglass-proud))` / `calc(anchor(bottom) −
  var(--eyeglass-proud))` (subtract to spill proud). **[AC7 — at BOTH breakpoints.]** The shipped anchor longhands
  HARDCODE the trim literal — `+0.1875rem` at base (L181-182) AND `+0.25rem` at `@640` (L221-222), NOT
  `var(--bouncy-track-trim)`. So the eyeglass proud is restated at BOTH breakpoints (or the wave first threads
  the trim token into the anchor calc so a single `− var(--eyeglass-proud, 0px)` addend suffices). Without C3,
  Safari-26 — where refraction ALSO degrades away — gets NEITHER refraction NOR proudness = a flat non-proud
  capsule, falsifying §2's cross-engine promise.
- Mint **`--eyeglass-proud`** as a **LENGTH** — a density-scaled `rem` sibling of `--bouncy-track-trim`
  (e.g. `0.13rem`→`0.18rem@640`, ≈ +14% of the track block extent so the loupe reads 1.14× at any density).
  **[C10]** it resolves to a length (subtracted from/added to an `anchor()` length), NOT a bare ratio; T1 forbids
  a px RADIUS literal (the radius stays `--radius-tab` stadium), NOT a proportional block-inset length, so a `rem`
  outset is T1-safe.
- The inline proud is a SECOND, whisper knob **`--eyeglass-proud-inline`** (default ~1.04–1.06×, LOW cap so
  adjacent pills never collide). The BLOCK proud is the load-bearing signature; the inline proud is a refinement
  the loop may dial to zero on collision.
- **The track must NOT clip the proud pill** (verified: `.segmented-tabs` / `.segmented-indicator` are OUT of
  `.glass-material`'s `contain: paint` list — Arm 2 S3). The default tabs route needs no escape; if ever nested
  in a clipping chrome bar, the escape is the `.glass-dock-frame[data-has-rail]` box-inviolate pattern
  (`deltaW=deltaH=0`).

**Rest vs flight:** the proud geometry is IDENTICAL at rest and in flight (static). Flight adds ONLY the
compositor translate (glide) + the `scale` squish/blob (§1.4). Nothing about the box height/inset animates.

### 1.2 — OPTICS: refraction (signature #1 — make-or-break)

**Measured (Arm 1 §2a, [L→M]):** edge-concentrated displacement, near-unity interior (~1.0–1.1×) — a droplet /
squircle profile, NOT a spherical magnifier. Backdrop text bends + compresses at the crown rim; the interior
renders at ~unity. This is EXACTLY the house `#glass-refract` squircle-bevel (`f(x)=⁴√(1−(1−x)⁴)`, Snell n≈1.5)
— compose it, do not fork a radial magnifier.

**Mechanism — compose the shipped `.glass-lens` onto the indicator.** `src/styles/glass-refract.css` ships
`.glass-lens` as one self-contained data-URI (`scale='28'` baked, DDR-LENS-BAKE) inside
`@supports (backdrop-filter: url("#glass-refract"))`, painting `backdrop-filter: var(--glass-blur-resting)
var(--glass-refract-filter)`. The eyeglass indicator composes `.glass-lens` (the pill does not carry it today).
Off the `@supports` engine it paints the un-gated blur+tint `.glass-capsule` base ALONE (the honest Safari /
Firefox floor — §2). Optional per-tab `--glass-refract-bevel` (14% default) tune available.

- **[C8 — the lens is anchor-safe by shipped precedent; the risk is `contain`, not the filter.]** The pill
  ALREADY composes `.glass-capsule`, which ALREADY paints `backdrop-filter: var(--glass-blur-floating)` on the
  anchored `.segmented-indicator--anchor` element (glass-capsule.css L64) — and the anchor-glide ships GREEN.
  So extending that same `backdrop-filter` with `url(#glass-refract)` mints no NEW stacking context and does NOT
  newly sever `anchor()`. `.glass-lens` is `@import`-ed AFTER glass.css / `.glass-capsule` in the SAME
  `@layer components` (verified glass-refract.css L172 vs glass.css L170) → source-order-wins the
  `backdrop-filter` conflict on the `@supports` engine (its `--glass-blur-resting url(#…)` REPLACES the capsule's
  `--glass-blur-floating`). The wave MUST confirm the intended blur rung (resting vs floating) so the lensed
  frost matches signature #7's stage.
- **No revived lens-swell.** `scale` is a baked literal; there is no `var()`-in-`url()` path (`proof:lensing`
  L1/L4 red a revival). The `:active` press-swell is RETIRED — do NOT couple `--glass-refract` to a press drive.
  The `:active` deform, if wanted, is the compositor squish (§1.4), never a map re-bake.
- **Static optics during flight is FORCED, and it is the SOTA move** (Arm 2 S6, CSSWG #542): the displacement
  `scale` cannot be `var()`-driven, so the map is constant; the pill travels via compositor `translate` and the
  only per-frame cost is the backdrop re-sampling under the moving box. **[C8]** BOUND that raster with
  `contain: paint` (a stacking context the anchored pill ALREADY has via its `backdrop-filter`) — **NEVER
  `contain: layout`** (material.css L79 keeps the glass `contain` at `paint` NOT `layout` precisely because
  `layout` "would make the box a containing block," and segmented-tabs.css L254-257 keeps containing-block /
  stacking-context churn OFF the anchored indicator so it never severs `anchor()`). If a stronger bound is ever
  needed it lives on an INNER non-anchored optics child, never on the `--anchor` element. The loop (§6) MUST
  VERIFY on Chrome that the anchor-glide survives whatever `contain` lands (a regressed glide reds the π
  `motionVerdict`). Do NOT drop the filter during fast travel and restore at rest (a visible pop, and moot —
  the optics are baked). Full baked optics ride the whole travel.
- **GL-shader fence (`proof:lensing` L6):** zero `aurora.frag` / `metaball.frag` / `webgl` edit. The lens is the
  shipped SVG `backdrop-filter: url()` asset; the wave composes it, never re-authors the graph.

### 1.3 — OPTICS: rim + specular + accent (signatures #3, #4, #5, #8)

**Measured (Arm 1 §2b/2d/2e, [H]):** over BUSY backdrops a thick luminous cyan rim (+ RGB dispersion, + hue-steal
from backdrop+accent); over CALM backdrops a thin dark refractive outline + a bright specular top-crown arc +
a soft base shadow ("resting on the glass"). Same geometry, backdrop-driven intensity.

**Mechanism — the pill already composes `.glass-capsule`; the rim is mostly there.** Compose, per leg:

| leg | house primitive | site | new? |
|---|---|---|---|
| directional lit rim (light top-crown + soft base) | `--glass-rim-top`/`-bottom` + `--glass-shadow-floating` box-shadow stack | `glass/glass-capsule.css` (already composed by the pill) | no |
| angle-keyed conic edge-glint | `::before` conic `from var(--specular-angle)` masked to `--glass-edge-glint-band`, `plus-lighter` | `glass/material.css`; `useSpecularPointer` writes `--specular-angle` | no (wire the leaf) |
| accent hue-steal on rim/glint | `color-mix(in oklab, <rim ink>, var(--glass-accent) var(--glass-accent-strength))` into `--glass-specular-core` | `tokens/property-regs.css` @property + `material.css` | no (set per-instance) |
| backdrop-hue pickup (calm↔busy) | `--glass-ambient-hue`/`--glass-ambient-strength` (bounded ≤8%), written by `useGlassBackdropLuminance` | `tokens/glass.css §BE`; observer at `composables/glass/useGlassBackdropLuminance.ts` | **BOOKED (see below)** |

- **The dark refractive outline is a Chromium-lens artifact, NEVER a painted dark inset.** `proof:tabs-ios` T3
  reds a dark top inset / a `--foreground`-at-dark-alpha catch-light (the top edge MUST be light). Reconcile:
  the reference's thin dark rim is REFRACTION (the displacement outline on the Chromium lens arm), not a
  box-shadow. On the honest Safari floor the rim is the LIGHT specular-top + soft base (glass-capsule's existing
  stack). So T3 holds on both engines — the dark rim only appears where refraction physically produces it.
- **Signature #5 (calm↔busy attenuation) — the STATIC bucket is the shipped floor; the LIVE observer is BOOKED
  with a hard on-disk prerequisite. [C1 — the live animated-sample path is DEAD on disk.]**
  `useGlassBackdropLuminance` writes `--glass-ambient-hue`/`-strength`, BUT its `sampleAnimated` (live-canvas)
  path is documented DEAD at HEAD (useGlassBackdropLuminance.ts L268-290, BG.W-GLASS-SIGNAL-TRUTH ST3/ST5/M8):
  it fires ONLY when a resolvable field canvas is handed (`backgroundCanvas` getter / `data-glass-field-canvas`),
  and "0 of 12 docks fired the writer-fired witness" — the dock, the plan's cited consumer #1, is itself dead on
  the animated path. So a bare observer wire onto the tab strip over the live aurora would ALSO be dead. Honest
  posture (NF-compliant):
  - **SHIPPED floor:** the STATIC declarative `--glass-backdrop: light|dark` bucket (a per-route class the stage
    sets) drives the coarse calm-vs-busy rim strength cross-engine, no sampling. This is REAL and reproduces the
    coarse signature (busy route → bloom, calm route → recede).
  - **BOOKED refinement (the WITHIN-route dynamic tracking the reference shows as the avatar scrolls in):** the
    live observer, which requires the tab strip to hand the aurora `<canvas>` as `backgroundCanvas` (or tag it
    `data-glass-field-canvas`) so `sampleAnimated`'s `drawImage`+`getImageData` readback resolves — net-new
    wiring the wave scopes EXPLICITLY (and must prove the WebGL canvas is readback-able at all — a WebGL context
    needs same-frame `drawImage` or `preserveDrawingBuffer`). Until the writer-fired witness lands for the strip,
    §5's attenuation band is judged against the STATIC bucket, NOT "the observer produces it."
  - **≥2-consumer promotion caveat:** if the dock consumer is dead (0/12), the strip cannot be "consumer #2 of a
    working observer" — the promotion is contingent on FIRST making at least one consumer's animated path fire
    the witness; otherwise the observer's live path stays booked, not promoted. Recorded honestly.
  All legs stay ≤4Hz throttled, IntersectionObserver-gated, PRM → single mount sample (§3).
- **Chromatic aberration at the rim (the reference's RGB fringe) is a BOOKED W-LENSING successor, not built** —
  the displacement map carries no color; a color-split rim is net-new SVG work. The wave ships the monochrome
  squircle refraction + the accent/ambient hue on the rim; the color-split rim is a named future signature.

### 1.4 — KINEMATICS: glide + squish + blob (signature #3)

**Spring — RATIFY snappy, clock frozen (Ruling 1).** The glide rides `--spring-snappy` (0.48s, ζ=0.74, +3.2%)
on the frozen clock `--tab-indicator-duration = --spring-snappy-duration` (0.4s). NO new spring, NO snappy PRESETS
retune, NO hand `linear()` (W-GLASS-CAL fence; `proof:liquid-tab` LT3; `proof:tabs-ios` T4 freezes the clock).
Center-anchored (`useTabIndicator`); the anchor-interpolated `inset` is the Safari-26 primary, the JS-measured
`transform`/`width` write the pre-18.2 floor (both shipped).

**The retunable SIZE channels (the loop's LEGAL knobs).** The positional spring is frozen, so the "reads
bouncier / wider mid-flight" delta is delivered by the SIZE-overshoot channels, which `proof:tabs-ios` T4 permits
within `constant == token`:

| channel | token / constant (HEAD) | reference target | law |
|---|---|---|---|
| travel stretch (`--stretch`, reciprocal `scale: X, 1/X`) | `--tab-indicator-max-stretch` 1.11 / `DEFAULT_INDICATOR_MAX_STRETCH` 1.11 | mid-flight core-width peak (Arm 1 §1, motion-blur excluded) | volume-preserving, released at arrival |
| blob (uniform area inflation, `--ease-cartoon-punch`) | `--tab-indicator-blob-max` 1.045 / `DEFAULT_INDICATOR_BLOB_MAX` 1.045 | the "wider-than-rest capsule" mid-flight | anticipate→overshoot→settle |
| release-at-arrival | `INDICATOR_RELEASE_AT_ARRIVAL` 0.82 (byte-frozen by T4) | plate contracts to rest width at settle | keep frozen |

**[C5/AC2 — the TWO channels have DIFFERENT legal caps; do not conflate them.]** `proof:liquid-tab` LT2 (verified
proof-liquid-tab.mjs L125-129) caps the **BLOB** channel by its **AREA ≤ 1.14** (volume-preserving ⇒ per-axis
`--tab-indicator-blob-max` ≤ √1.14 ≈ **1.068**, NOT 1.2); the **STRETCH** channel (`--tab-indicator-max-stretch`)
is the reciprocal squish capped ≤ **1.2** (taffy floor). The along-travel rendered width is the PRODUCT `blob ×
stretch`, and proof-liquid-tab.mjs L129 records the house intent as **composed peak `blob × stretch` ≤ 1.14**
(the anti-taffy fence — the SAME quantity Arm 1 calls "core-width"). Arm 1 §1 measured the reference core-width
at **1.20×** (rest 290 → peak 348). So the eyeglass along-travel swell is capped at **≈1.14×** (e.g. blob 1.045
× stretch 1.090 ≈ 1.14) — the reference's ~1.20× is **NOT fully reproduced**: the house anti-taffy fence
deliberately swells tighter than iOS. **ACCEPTED bounded house-identity divergence, recorded loud** (mirroring
the §0 timing residual), not smuggled. CAVEAT: the composed-cap ENFORCER `tests-visual/tab-ios-capsule.spec.ts`
is a **PHANTOM at HEAD** (does not exist — verified; `tabs-std.spec.ts` is the only live tabs spec), so today
only the per-channel device-free caps (blob ≤1.068, stretch ≤1.2) actually block. The eyeglass wave honors the
1.14 composed intent (recommended) OR, if it ever targets 1.20, corrects the LT2 L129 dead-spec citation and
notes the intent superseded — honoring 1.14 is the safe default. The positional overshoot stays snappy's ζ
(the T2 8% witness is a compressed-centroid reading on the extreme-tab leftward leg; T4 gives ζ≈0.85, snappy's
0.74 sits mid-band; §5's overshoot band accepts the rendered ~3% snappy overshoot, an ACCEPTED house divergence
from the device's 8%).

**Travel choreography — what animates vs what engages at rest:**

- **In flight (animated):** position (compositor `translate` glide on `--spring-snappy`) + size (the `--stretch`
  / `--tab-blob` `scale` squish, release-at-arrival). Continuous slide through every intermediate x (Arm 1 §1:
  the lens transits the middle tab in T3 — no fade-out/fade-in). Duration weakly amplitude-dependent (2 slots ≈
  1 slot in settle — the spring signature).
- **At rest AND through flight (static):** the proud geometry (§1.1), the full baked lens/rim/specular optics
  (§1.2–1.3). The loupe is fully-formed the entire time; it slides, it does not assemble.
- **EFFECTS, trailing the glide:** the accent flood + selected-ink swap (§1.5) — the fast bezier
  (`--duration-fast`), keyed to the glide's SETTLE ("the swap reads as part of the lens arrival", seed obs 4).

### 1.5 — Selected INK / accent transfer (signature #6) — the AA fence

**Measured (Arm 1 §2d, [H]):** selected glyph `≈#54FBFE` saturated cyan, label cyan; unselected pure white;
a clean white→app-accent binary that arrives with the lens.

**Mechanism — the accent is FLOOD + RIM + a CONTRAST-SPLIT ink, NOT a wholesale label re-point (Ruling 5).**
`proof:tabs-ios` T5 requires the active label resolve `var(--foreground)` (AA over the pill); `proof:register-ios`
clause e forbids a saturated brand hue on an interactive selector. So:

- **The LIBRARY default selected LABEL (text) stays `--foreground`** (the warm-ink, AA-safe over the tinted pill).
- **[C7 — split GLYPH (graphic, 3:1) from LABEL (text, 4.5:1) so the library reproduces the cyan glyph honestly.]**
  T5 / `proof:no-gray` bind the LABEL to the WCAG 4.5:1 text floor; an icon/glyph is a GRAPHIC governed by the
  WCAG 1.4.11 **3:1** non-text floor. The reference cyan `#54FBFE` over the teal pill interior (`[50,126,155]`)
  measures ≈3.4:1 — below 4.5:1 (why the label stays ink) but above 3:1 (so the GLYPH may tint). So the library
  default MAY tint the selected **glyph** to `var(--glass-accent)` WHEN an accent is set (default no-op at
  `--glass-accent: transparent`) and clear the 3:1 graphics floor — reproducing signature #6's cyan icon
  faithfully and gate-green — while the label stays `--foreground`. The reference's sub-AA saturated cyan LABEL
  is the one thing not reproduced (Apple is sub-WCAG there) — an ACCEPTED, bounded a11y divergence, stated loud.
- **[AC4 — the glyph tint MUST live on a DESCENDANT svg selector, NEVER the tab's own `color`.]** T5 scans
  `.segmented-tab[aria-pressed="true"] { color }` and pins it to `var(--foreground)`; the glyph (an inline SVG)
  inherits `currentColor` = the tab `color`. Tinting via the tab `color` would RED T5 AND drop the LABEL below AA
  in lockstep. So `--tab-selected-ink` is applied on a descendant `.segmented-tab[aria-pressed="true"] svg`
  (or glyph-child) rule — `color`/`fill: var(--tab-selected-ink, var(--foreground))` — decoupled from the
  inherited label ink.
- **The app-accent hue is a CONSUMER PRESET** (presets-in-consumers): the consumer sets `--glass-accent: <hue>`
  on the strip; the teal read comes from the FLOOD (`--tab-flood-t`, the `.segmented-indicator::after` radial
  `plus-lighter` wash, default `transparent` no-op) + the `--glass-accent` rim, timed to arrival (the flood
  0→1→0 trails the glide a beat then clears). `--tab-selected-ink` is the opt-in glyph seam.

### 1.6 — THE STAGE: the heavily-frosted tinted bar (signature #7) — [C4]

**Measured (Arm 1 §2f/§3 #7, [H]):** the bar itself is a heavily-frosted tinted capsule — backdrop texture std
**59.1 → 3.3 through the bar (~94% contrast-kill)**, a teal→blue gradient, floating rounded capsule. "Get this
wrong and the lens has nothing legible to bend." The shipped track ships `.glass-capsule-track` at
`backdrop-filter: var(--glass-blur-quiet)` (8px calm register, glass-capsule.css L85), far below the reference's
~94% kill, so the eyeglass lens would bend a still-noisy near-sharp aurora (a worse read than the reference's
clean frosted field, AND the nested-backdrop-filter compose only reads right when the pill lenses an ALREADY-
frosted track output).

- **Mechanism:** the eyeglass mode re-points the TRACK to a STRONGER frost rung under `data-eyeglass` — a
  `--glass-blur-floating` / dedicated `--eyeglass-track-blur` (targeting the ~94% contrast-kill band) so the
  pill's `backdrop-filter` (which samples the backdrop BEHIND it = the frosted track output) lenses a legible
  smooth field. A token substitution on the track for the eyeglass mode ONLY (the default pill track byte-
  unchanged), no new recipe. The teal→blue tint is a CONSUMER preset (the app theme; the library ships the
  warm-cream identity), never a library hue.
- **Fence:** this is the stage, not the loupe — NOT the deep-glass tier (`--glass-depth`), and it stays within
  the budget (one strong-frost stage per route). The stronger blur is the STAGE the loupe bends, not more blur
  ON the loupe.
- **[AC5 — the nested backdrop-filter compose is a known-finicky path; VERIFY it live, do not assert it.]** The
  pill (`.segmented-indicator`, `position:absolute` inside `.segmented-tabs`) is a DESCENDANT of the track, so a
  track `backdrop-filter` establishes a backdrop root and the pill's `backdrop-filter: url()` samples the track's
  FROSTED output — exactly "lens an already-frosted field." BUT nested `backdrop-filter` × `contain: paint` ×
  the anchored-indicator stacking-context (segmented-tabs.css L254-257 anti-sever guard) is precisely where
  Chromium regresses. The wave MUST LIVE-verify (Chrome) that the pill demonstrably lenses the FROSTED track
  output (not the raw aurora, not a broken empty backdrop), AND that adding the track backdrop root does not
  sever the anchor glide (a regressed glide reds the π `motionVerdict`). This is a build-time verification step,
  not a source assertion.

---

## §2 — THE DUAL-ENGINE STORY (primary per engine + honest degrade)

`backdrop-filter: url(#…)` is Chromium/Edge ONLY (WebKit 245510 open, Firefox never). Every mechanism is real CSS
on the stated engine and degrades to a **legitimately-lesser real surface**, never a fake of the working primary
(NO-MASKING-FALLBACK).

| signature | Chromium primary | Safari 26 / Firefox | honest degrade posture |
|---|---|---|---|
| **refraction** (§1.2) | `.glass-lens` `backdrop-filter: var(--glass-blur-resting) url(#glass-refract)` — bends the live aurora | the `@supports` gate fails → the un-gated blur+tint `.glass-capsule` base ALONE | frost+tint+light-rim+specular+lift — a real proud glass loupe that makes NO loupe claim (the reference itself uses this over calm backdrops, so the fallback IS a reference state). No broken `url()` ref, no pre-baked "magnified" image. |
| **proud geometry** (§1.1) | static `inset-block` outset (JS path) OR `calc(anchor(top/bottom) − var(--eyeglass-proud))` (anchor path) | identical — IFF the anchor-longhand form ships (C3); the `inset-block` shorthand ALONE reaches only the JS path, leaving Safari-26 (anchor-primary) a flat non-proud capsule | pure layout — both engines, no risk, ONCE C3 lands |
| **rim / specular / edge-glint** (§1.3) | box-shadow rim + `::before` conic (`plus-lighter` 16.4+, `mask-image` 2023) | identical | full paint both engines; only the DARK refractive outline is Chromium-lens-only (a real artifact, not painted) |
| **accent / ambient hue** (§1.3/1.5) | `color-mix(in oklab)`, `@property`, observer | identical (all Safari 26) | 0%/transparent defaults = provable no-op |
| **kinematics** (§1.4) | compositor `translate`+`scale`; anchor-glide OR JS-measured | identical (anchor Baseline 2026; JS floor pre-18.2) | compositor-only, cheap both engines |

**The π judge runs the refraction arm on Chromium and the honest-capsule arm on Safari** — two real target
states, both judged (§5). The one thing Safari 26 genuinely cannot do is refract the arbitrary LIVE aurora
canvas; over that backdrop its ceiling IS the honest capsule, and the wave states that loud.

**BOOKED, not built — the cross-engine T1 clone-loupe.** Arm 2 proposes a `scale()`-ed cloned-backdrop child
(regular `filter: url()`, Safari-OK) to give Safari a real loupe. It requires a CSS-DUPLICABLE backdrop; the demo
tabs route stages over a LIVE WebGL aurora (not duplicable), so T1 buys the actual route nothing and building it
now is substrate-without-consumer. Book `.glass-lens-loupe` as the cross-engine refinement for a future
CSS-gradient-staged surface (and the recommended DEFAULT stage if perf forces off the live-aurora T2 path — AC6,
§5 perf row). The wave ships T2 (Chromium) + T3 (honest floor); T1 is a named successor.

---

## §3 — PRM CARVE + a11y

**Roles/ARIA byte-untouched** (this is a CSS + compose wave): `aria-pressed` (pill `role="group"`),
`aria-selected` (underline `role="tablist"`), the roving-tabindex, `@keydown` arrow-nav — all preserved
(`proof:tabs-ios` T4; `proof:tabs-std`). The `:draggable` / `:responsive` a11y contracts inherited unchanged.
Touch floor (`min-block-size: max(2rem, --control-floor)`) held.

**PRM = seat the MOTION, keep the OPTICS** (motion-canon P6 — fade-keeps/transform-drops, extended to the
static-optics register):

- **Dropped under `prefers-reduced-motion: reduce`:** the `--stretch` squish (stays 1, no deform), the
  `--tab-blob` overshoot (re-aliases to no-overshoot), the glide's positional overshoot (seats no-overshoot).
  The glide still COMMITS (the discrete selection happens); the ambient observer collapses to a single mount
  sample (the `useWebGLCanvas` substrate-PRM mirror).
- **KEPT under PRM:** the STATIC eyeglass optics — the proud geometry, the baked lens/rim/specular, the tint.
  A proud glass loupe at rest is legible MATERIAL, not vestibular motion; removing it would remove the affordance,
  not a hazard. The color swap + the discrete selection still commit.

**AA legibility:** the selected label resolves `--foreground` (T5), AA over the tinted pill; the on-glass muted
registers hold (`proof:no-gray` / `proof:menu-glass`); the glyph clears the 3:1 graphics floor (§1.5 C7). A
consumer accent-ink preset owns its own AA clearance.

---

## §4 — THE GATE: `proof:eyeglass-tabs` + the gates that stay green

**`proof:eyeglass-tabs`** (device-free, `["local","ci"]`) — the composition + fence gate, born-RED → GREEN. It
EXTENDS the tabs gate family WITHOUT contradicting it (every clause below is a superset assertion; the tabs-std /
tabs-ios / lensing / liquid-tab / no-layout-animation / glass-accent / register-ios locks stay green by
construction — see the matrix). Each clause carries a self-test bite proving the detector is not hollow.

- **E1 — the axis exists ONCE.** The `eyeglass` axis exists ONCE on `SegmentedTabs` (a `data-eyeglass` attr,
  pill-only), additive default-off (default-off byte-identical to the shipped `.glass-capsule` pill).
  *Self-test:* a second forked eyeglass mode / a `data-eyeglass` on the underline arm REDs.
- **E2 — the lens is COMPOSED, `@supports`-gated, baked.** The indicator COMPOSES `.glass-lens` (not a forked
  filter); the whole refraction rides INSIDE the `@supports (backdrop-filter: url("#glass-refract"))` gate (the
  honest degrade floor); no revived `var()`-spliced `scale` (DDR-LENS-BAKE). *Self-test:* a refraction decl
  OUTSIDE the `@supports` gate REDs (L3 mirror); a `var()`-in-`url()` scale-splice REDs (L1/L4 mirror).
- **E3 — the proud geometry is a STATIC LENGTH outset on BOTH position paths.** `--eyeglass-proud` is a LENGTH
  (no px RADIUS literal — T1-safe), applied on BOTH the JS `inset-block` AND the anchor `inset-block-start`/`-end`
  longhands (C3), at BOTH breakpoints (AC7 — base + `@640`, which HARDCODE the trim literal). A NEW animated box
  dimension REDs (`no-layout-animation` cross-check — the CONSTANT proud addend to the booked animated `inset`
  adds no new animated dimension). *Self-test:* a proud present on ONLY one of the two position paths REDs; a
  base-only proud that vanishes at `@640` REDs (the silent-absent-at-desktop class); a px-radius proud REDs.
- **E4 — the kinematics read the FROZEN clock, distinct caps.** The glide clock is `--tab-indicator-duration =
  --spring-snappy-duration` (frozen); the STRETCH cap constant==token ≤ 1.2 AND the BLOB cap constant==token
  with AREA ≤ 1.14 (per-axis ≤~1.068 — C5, distinct caps, NOT a shared [1.0,1.2]); NO new spring / `linear()` /
  PRESETS re-time. *Self-test:* a planted hand-`linear()`, a clock-override, OR a blob-max pushed past its area
  cap REDs.
- **E5 — the accent is FLOOD+RIM + the CONTRAST-SPLIT ink.** The selected LABEL clears 4.5:1 (stays
  `--foreground`, no interactive brand-red re-point); the selected GLYPH may tint to `var(--glass-accent)` on a
  DESCENDANT `svg` selector (AC4 — never the tab's own `color`) and clears the 3:1 graphics floor (C7);
  `--tab-selected-ink` is the glyph seam; the ambient/attenuation is the STATIC `--glass-backdrop` bucket floor
  (the live observer BOOKED, its animated path DEAD on disk — C1, no ≥2-consumer promotion of a dead path).
  *Self-test:* a glyph tint written on the TAB `color` (not a descendant) REDs (T5-respecting); a glyph below
  3:1 REDs; a saturated-LABEL default REDs.
- **E6 — the honest-degrade posture recorded.** Safari = proud capsule + rim + accent, no faked bend; the T1
  clone-loupe, the chromatic-aberration rim, AND the live ambient-observer wire BOOKED with named successors.
  *Self-test:* a Safari path that paints a pre-baked "magnified" image / a broken `url()` masking-fake REDs.
- **+ a self-test suite proving each fence detector is not hollow** (the born-RED→GREEN witness — the gate reds
  the pre-fix tree and greens at close).

**Gate-contradiction matrix — the eyeglass wave MUST keep these green:**

| gate | the lock respected |
|---|---|
| `proof:tabs-std` | ONE engine, two materials; glide on `--tab-indicator-duration`; volume-preserving `--stretch`; cap ≤1.2; center-anchored; underline paints NO plate |
| `proof:tabs-ios` | T1 stadium `--radius-tab` (no px radius); T2 pill = tinted-floating via `.glass-capsule`; T3 no dark ring / dark top inset (the top edge LIGHT); T4 ARIA + engine byte-fence (cap lockstep, `RELEASE_AT_ARRIVAL=0.82`, clock=`--spring-snappy-duration`); T5 active LABEL=`--foreground` (the glyph tint on the DESCENDANT svg, AC4) |
| `proof:lensing` | L1/L4 no revived `var()`-scale / lens-swell; L3 refraction never outside the `@supports` gate; L6 GL-shader fence (zero `aurora.frag`/`metaball.frag`/`webgl` edit) |
| `proof:liquid-tab` | LT1 pull-is-default; LT2 blob AREA ≤1.14 (per-axis ≤~1.068) / composed peak ≤1.14; LT3 no second engine (the `snappy` row); LT5 drag ADDITIVE to a11y (WCAG 2.1.1) |
| `proof:no-layout-animation` | compositor-only; the `size-morph-indicator-booked` entry stays; the proud geometry is static-reserve/transform, no NEW animated box dimension |
| `proof:glass-accent` | rim/glint accent is the oklab per-instance axis; @property no-op floor at rest; ≥2 consumers; NEVER writes the `--glass-tint-*` plate cohort |
| `proof:register-ios` | clause e — NO `--viz-fourier`/brand-red on ANY interactive selector; the eyeglass accent is a consumer PRESET hue |
| `proof:glass-cal` | the per-spring `--spring-<name>-duration` clocks are generated, read-only — no new spring/clock |
| `proof:no-masking-fallback` | Safari lens degrade is HONEST (blur+tint+rim, no faked refraction); primary works in paint or fails loud |
| `proof:no-gray` / `proof:menu-glass` | warm-chroma floor; AA legibility over the tinted pill |

---

## §5 — THE BINDING π (a DRIVEN 60fps frame-series — never a settled capture)

The IOS27-MOTION-TRUTH rule (the tranche's binding blind-spot fence): the π is a LIVE-GESTURE frame-series judged
against THIS reference ladder, never a settled still. The C18 `?capture=` settled snap is BLIND to a gesture
that MOVES → may OVERSHOOT → SETTLES. This π is a driven frame-series reduced by `gesture-frame-recorder.mjs`
(17.7, DONE) and judged against `bar60/` on the Chromium-refraction arm + the Safari honest-capsule arm, both
modes.

### 5.1 — The reference ladder (the source of truth to converge ON)

- **Kinematics:** the Arm 1 §1 per-frame tables — T2 (Devices→People, 1 slot 258px left, the OVERSHOOT witness),
  T3 (People→Items, 2 slots 552px, the reference travel + the continuous-transit proof), T4 (Items→Me, 1 slot
  244px, near-critical). Regenerate `bar60/` + the `ext/` strip deterministically per the DIRECTIVE corpus
  commands (`t = 7.0 + N/60`).
- **Optics probes:** proudness 1.14× (crown +14px / base +12px), rest width 1.08–1.10× slot, rim luminance
  profile (busy: interior B-channel 200–206 bright, L-dip to ~120 at the outline; calm: thin dark notch + light
  specular-top), selected glyph accent-vs-white, calm↔busy rim attenuation Δ.

### 5.2 — The capture instrument (the DRIVEN harness — net-new, deterministic)

Two compatible front-ends, ONE reducer:

- **Reducer (on disk, DONE at 17.7):** `scripts/lib/gesture-frame-recorder.mjs` — `frameSchedule` (deterministic
  clock), `recordFrameSeries` (composes the ONE `reflect-capture-verify.pngRegionStats` decoder — the single-
  decoder discipline), `motionVerdict` (a dead-snap / settled-still-only series REDs — the blind spot),
  `settledVerdict` (tail rests at endpoint), `overshootVerdict` (the iOS bounce; monotone arrival does NOT
  false-fire), `gestureFrameVerdict` (composite `liquid`). `recordFrameSeries` consumes pre-captured PNG paths.
- **[AC3 — the DRIVING half is NET-NEW infra, not an `?capture=` one-liner; name the determinism mechanism or the
  bands do not terminate.]** On disk is ONLY the reducer. The browser-driving half is unbuilt: (a) pointer-inject
  the tab select; (b) **deterministically STEP the spring frame-by-frame via WAAPI seek** —
  `getAnimations()` on the indicator → set `animation.currentTime = frameSchedule[i]` and capture (WebKit +
  Chromium both support seeking a running CSS `transition: inset` / WAAPI transform), FORCING a repaint of the
  `backdrop-filter: url()` raster at each seeked frame (a best-effort screencast jitters, and the §5.3
  per-frame `|Δx| ≤ 24px` bands CANNOT terminate against a jittering clock); (c) crop the bar-band at the SAME
  geometry as `bar60/`. Scope this as genuinely-new work.
- **[C9 — name the WebKit capture path; chrome-devtools-mcp is Chrome-ONLY.]** The Chrome front-end is the CDP
  screencast harness (chrome-devtools-mcp). The Safari arm uses the tranche's EXISTING dual-engine harness — the
  Playwright `webkit` project screencast (the repo already runs "dual-engine PASS Chrome+Safari both modes"
  captures) feeding the SAME reducer. Run over the tabs route (`navigation/tabs`, staged over the live aurora —
  a real backdrop to bend), both engines, both modes.
- **Per-frame reduction:** extract `(center-x, plateW, plateH)` with the SAME `brightness×smoothness` FWHM the
  reference used (the pill lightens+blurs the backdrop → bright + low-texture); align by travel-normalized time
  against the reference table. **The KINEMATICS arm tolerates a live backdrop** via the backdrop-robust
  cyan-centroid (Arm 1's method); **the OPTICS arm is judged at SETTLED over a KNOWN backdrop state** (a
  pinned/seeded aurora frame) — you CANNOT freeze the aurora via PRM to fix the optics, because PRM also kills
  the squish/overshoot the kinematics arm measures (§3).

### 5.3 — Convergence criteria (numeric — the loop terminates on measurement)

Green requires ALL bands, across T2 + T3 + T4, on BOTH engines, BOTH modes:

| axis | band | rationale |
|---|---|---|
| position (center-x) | max per-frame `|Δx| ≤ 24px` mid-travel, `≤ 12px` at endpoints | Arm 1 caveat: ±20px mid, ±10px endpoint measurement floor + margin |
| settle | tail within `±4px` of true tab center for `≥5` trailing frames | `settledVerdict` |
| overshoot | `overshootVerdict` FIRES (monotone arrival REDs); peak positional overshoot `∈ [2%, 9%]` of travel, recovered `≤ 6` frames (~100ms) | brackets snappy ζ=0.74 (3.2%) + the T2 8% witness — a BAND, not a hard 8% match |
| width (squish) | mid-flight core-width (= along-travel `blob × stretch`) peak `∈ [1.10×, 1.15×]` rest, releasing to `±5%` of rest at settle. Upper bound honors the house composed anti-taffy intent ≤1.14 (proof-liquid-tab.mjs L129); the reference's 1.20× is an ACCEPTED bounded divergence (AC2), NOT the band | house anti-taffy fence + release-at-arrival |
| proud (STATIC reservation) | the RESTING static box reservation `= 1.14 ± 0.03 ×` track, and the reservation is CONSTANT (no animated `inset`/`height` — a NEW animated box dimension REDs `no-layout-animation`). The rendered block extent DOES vary in flight by the compositor blob `scale` (≤1.068/axis) — compositor-safe + expected; the "constant" band probes the STATIC reservation, not the rendered pixels | signature #2 |
| timing | departure→2%-settle `∈ [200, 320]ms`; t90 (perceptual arrival) `∈ [110, 200]ms` | Arm 1 §1 derived kinematics; the ~15–20%-quicker device response is a RECORDED residual (§0/§6), not converged-on |
| perf (60fps mid-tier mobile) | on a throttled mobile profile (4×-CPU, the `proof:lighthouse` register), the driven T3 travel drops `≤ 1` frame over its ~19-frame (~317ms) span; no long-task > 50ms during travel; the Chromium `backdrop-filter: url()` refraction over the LIVE aurora is `contain: paint`-bounded. **[AC6 — the failure mode is a DEGRADE DECISION, not iterate-to-green.]** The refraction re-rasterizes a LIVE WebGL aurora for the WHOLE ~19-frame span (the single most expensive thing in the wave); if it cannot hold 60fps on the mid-tier profile the loop TERMINATES by falling that profile to the S1-T3 capsule floor (recorded, NF-honest — §6), never a faked static loupe. Consider staging the eyeglass DEFAULT over a CSS-EXPRESSIBLE backdrop (which unlocks the cheaper cross-engine T1 clone-loupe) rather than the live aurora (a perf tension the census staged away from) | the directive's explicit 60fps-mid-mobile ask; Arm 1's MEASURED travel is ~19 frames (NOT the seed's stale "≤4"), so the re-raster runs the whole span |
| Safari honest-degrade | on Safari 26 the pill MUST resolve the honest `.glass-capsule` floating-frost floor (blur + tint + LIGHT rim + specular + lift), NOT a half-applied lens. **[AC1 — the load-bearing UNVERIFIED assumption.]** The whole degrade rests on `@supports (backdrop-filter: url("#glass-refract"))` returning FALSE on Safari 26 — but WebKit has historically returned TRUE for `CSS.supports('backdrop-filter','url(#x)')` (parses syntax, renders nothing — bug 245510). If TRUE, Safari ENTERS the `.glass-lens` block, its `backdrop-filter: var(--glass-blur-resting) url(#…)` REPLACES the capsule's `--glass-blur-floating` (source-order win, verified), the `url()` no-ops → a DIFFERENT blur rung with NO refraction = a masking-adjacent "tried and painted nothing." The π MUST empirically confirm the Safari arm paints the capsule floating-frost rung (measure the resolved blur radius / composited frost); belt-and-suspenders: if Safari passes the @supports, re-assert `--glass-blur-floating` on the eyeglass Safari path | the single runtime fact the entire dual-engine honest-degrade story depends on — asserted (via `proof:lensing` L3, a SOURCE gate) but never verified on a Safari-26 runtime for the NEW tab consumer |
| optics (settled — NUMERIC) | proudness `1.14 ± 0.03×`; busy-arm rim: interior B-channel `≥ 190` with an L-dip to `≤ 130` at the outline; calm-arm rim: interior B `≈ 165 ± 15`, light specular-top present, no bloom; dark refractive outline present on the Chromium busy arm ONLY; accent: selected-GLYPH B-channel `≥ +60` over the unselected white-glyph baseline WHEN a preset accent is set AND glyph clears 3:1 / label clears 4.5:1 (§1.5); calm↔busy Δ judged against the STATIC `--glass-backdrop` bucket (the shipped floor — NOT "the observer produces it"; the live path is DEAD on disk, §1.3 C1 — a band gated on a dead mechanism never terminates) | Arm 1 §2b/2d/2f |

### 5.4 — The π = this series judged GREEN

Born-RED at HEAD (the pill carries no lens, no proud geometry, no stronger stage frost — the series fails
`motionVerdict`'s liquid composite + every optics probe) → GREEN at convergence. The π is the driven frame-series
through `gesture-frame-recorder.mjs`, judged against `bar60/` on the Chromium-refraction arm + the Safari
honest-capsule arm, both modes, by a NON-AUTHORING Fable instance (F8.3 — the DesignSync/Fable arm; the verdict
is recorded against the committed dual-engine captures until DesignSync is provisioned). This is the binding
painted truth; the device-free gate (§4) proves the composition + the fences, the π proves the paint. Per the
tranche's abolished-reflect-funnel discipline, the π closes at THIS wave's OWN non-authoring dual-engine paint
close (`proof:ba-gestalt` G8 reds a deferred verdict), NOT a terminal reflect band. The DELTA artifact lands at
`docs/tranches/BG/audit/visual/BG.W-EYEGLASS-TABS-DELTA.md` + the `BG.W-EYEGLASS-TABS-paint/` captures dir.

---

## §6 — THE ITERATION LOOP (build → capture → reduce → compare → refine, to numeric convergence)

The user mandated a measured loop, not a vibes loop. The recreate-iterate harness, engine-compatible, terminating
on numeric bands:

1. Build the register at the current token values.
2. Capture the driven 60fps series (§5.2), both engines, both modes, T2/T3/T4.
3. Reduce + compare vs §5.3; emit the FAIL set.
4. Refine — the FAIL→knob map (the ONLY legal knobs; the spring/clock are frozen):
   - width too small → grow `--tab-indicator-max-stretch` (≤1.2) FIRST; grow `--tab-indicator-blob-max` only
     within its LT2 AREA cap ≤1.14 (per-axis ≤~1.068 — NOT [1.0,1.2]) — cap-lockstep, constant==token.
   - proud off → retune `--eyeglass-proud` / `--eyeglass-proud-inline` (a LENGTH; applied on BOTH the JS
     `inset-block` AND the anchor `inset-*` longhands at BOTH breakpoints — C3/C10/AC7).
   - rim/attenuation off → tune `--glass-accent-strength` / the STATIC `--glass-backdrop` bucket strength (the
     shipped floor). The LIVE observer gain is a knob ONLY once its writer-fired witness lands for the strip
     (§1.3 C1 — until then judged against the static bucket).
   - perf FAIL (dropped frames on the throttled mobile arm) → tighten the `contain: paint` bound / confirm the
     lens `@supports` gate is the only Chromium refraction path; do NOT drop-and-restore the filter mid-travel
     (§1.2). If the refraction genuinely cannot hold 60fps on the mid-tier profile, the honest fall is the T3
     capsule floor on that profile (recorded, not masked — AC6) — NOT a faked static-image loupe.
   - timing off (too slow vs the reference's ~15–20% quicker raw response) → RECORD as a residual, do NOT retune
     (the clock is frozen by T4; a snappy-family re-time is a cross-consumer change OUT OF SCOPE and BOOKED to a
     spring-register wave with its own sign-off — §0/AC8). The house weighty-snappy is the ratified iOS-27
     identity; the residual is measured and accepted, not smuggled.
5. Repeat until all bands green. **Terminate on measurement, not vibes.**

---

## §7 — PRECONDS

- **17.7 W-GESTURE-FRAME-RECORDER — the paint INSTRUMENT (DONE, confirmed on disk).** The census confirmed it
  (`RESEARCH-CENSUS.md §"THE π INSTRUMENT … already built, 17.7"`); verified DONE in the cursor
  (`scripts/lib/gesture-frame-recorder.mjs`, `proof:meta` clause `gesture-frame-recorder` GREEN — the pure
  device-free analysis+recording core: `frameSchedule` / `frameDeltas` / `travelSpan` / `motionVerdict` /
  `settledVerdict` / `overshootVerdict` / `gestureFrameVerdict` / `recordFrameSeries` composing the ONE
  `reflect-capture-verify.pngRegionStats` decoder). This is the REDUCER precond; the DRIVING half is net-new
  wave work (AC3).
- **The NET-NEW WAAPI-seek driving harness (AC3, this wave builds it).** Pointer-inject + `getAnimations()`
  `currentTime` seek + forced `backdrop-filter` repaint per seeked frame + the SAME-geometry bar-band crop;
  Chrome CDP + Playwright-webkit front-ends feeding the 17.7 reducer.
- **The LANDED tabs primitives (BA.W-TABS etc., on disk — composed, not built).** `useTabIndicator`
  (center-anchored glide + `squishOnTravel`), `.glass-capsule`/`-track`/`-hover`, `.glass-lens`/`#glass-refract`
  (glass-refract.css), `--glass-accent`/`--glass-accent-strength` (property-regs.css), `--tab-flood-t`, the
  anchor + JS glide paths, `useSpecularPointer`, `useGlassBackdropLuminance` (STATIC bucket live, animated path
  DEAD — C1).
- **TWO build-time VERIFICATION prerequisites (NOT source assertions — they gate the paint close):**
  (1) the Safari `@supports (backdrop-filter: url())` truth (AC1 — the honest-degrade linchpin);
  (2) the nested track-frost × pill-lens compose + anchor-glide-survives-`contain` (AC5).

---

## §8 — SCOPE FENCES (what this wave does NOT touch)

- **The tabs ENGINE ARIA** — `aria-pressed`/`aria-selected`/roving-tabindex/`@keydown` byte-untouched
  (`proof:tabs-ios` T4). This is a CSS + compose wave.
- **The underline material** — `.paper-ink-mark` / the ink hairline untouched; eyeglass is `pill`-only.
- **The dock morph** — `dockMorphContext`/`DOCK_SPRING`/`useLayerTransition` untouched.
- **The dock-tab kin — BOOKED, not built.** The directive names "dock-tab kin where the census says it
  generalizes." The census framed eyeglass as a `SegmentedTabs` mode; the dock rail indicator (`DockLayerGroup`)
  has its OWN `size-morph-indicator-booked` allowlist entry + the W-REGISTER-IOS selected-as-glass register, and
  the dock morph is a separate mechanism under the one-deep-refractive-register-per-route budget. This wave lands
  the register on `SegmentedTabs` ONLY; the dock-rail eyeglass loupe is the named generalization successor
  **BG.W-EYEGLASS-DOCK-KIN**, not this wave.
- **The spring family** — no new spring, no snappy PRESETS re-time, no hand `linear()`, no `--tab-indicator-
  duration` override (T4 freeze). A residual timing gap vs the reference is MEASURED + accepted (§6), booked.
- **The lens SVG graph / GL shaders** — the shipped `.glass-lens` data-URI + `#glass-refract` map composed
  verbatim; zero `aurora.frag`/`metaball.frag`/`webgl` edit (`proof:lensing` L6); no revived `var()`-scale.
- **The T1 clone-loupe + the chromatic-aberration rim + the live ambient-observer wire** — booked cross-engine /
  color-split / dynamic-sample successors, not built (§2, §1.3).

---

## §9 — HONEST-DEGRADE CRITERIA (NO-MASKING-FALLBACK)

The Safari-July-2026 bound is BINDING: every mechanism is real CSS on the stated engine and degrades to a
legitimately-lesser real surface, never a fake of the working primary.

- **PASS (honest):** off `backdrop-filter: url()` engines the `@supports` gate fails → the un-gated blur+tint
  `.glass-capsule` proud floor (blur + tint + LIGHT rim + specular + lift) paints — a real proud glass loupe that
  makes NO loupe claim (the reference itself uses this state over calm backdrops). The proud geometry, rim,
  specular, accent, and kinematics are cross-engine identical (C3 lands the proud on the anchor path so Safari-26
  is NOT a flat capsule). A live-canvas backdrop that can't be duplicated degrades the loupe to ABSENT + the
  surface to the S1-T3 capsule — the constraint RECORDED, not masked.
- **FAIL (masking — a born-RED the gate/π must catch):** a broken `url()` ref; a pre-baked "magnified" image
  faking refraction; a Safari path that ENTERS the `.glass-lens` block on a leaked `@supports` TRUE and paints a
  wrong blur rung with no refraction ("tried and painted nothing" — AC1, the π empirically catches it); a
  drop-and-restore filter pop mid-travel.
- **The perf degrade is a DECISION, not a mask (AC6):** if the Chromium refraction cannot hold 60fps on the
  mid-tier mobile profile, the honest fall is the T3 capsule floor on that profile (recorded in the DELTA), never
  a faked static-image loupe.

---

## §10 — WHAT IS GENUINELY NEW (the whole delta — deliberately small)

1. The `eyeglass` boolean axis on `SegmentedTabs` (a `data-eyeglass` attr; pill-only, additive default-off).
2. `--eyeglass-proud` (+ the whisper `--eyeglass-proud-inline`) — the STATIC proud-outset geometry token (a
   LENGTH), applied on BOTH the JS `inset-block` AND the anchor `inset-*` longhands at BOTH breakpoints (C3/AC7).
3. `.glass-lens` composed onto `.segmented-indicator` (Chromium refraction; honest Safari PROUD capsule degrade —
   C3) + the stronger `--eyeglass-track-blur` STAGE frost (signature #7, C4).
4. The STATIC `--glass-backdrop` bucket for calm↔busy attenuation (the shipped floor); the LIVE
   `useGlassBackdropLuminance` wire BOOKED (its animated path DEAD on disk — C1) + the opt-in `--tab-selected-ink`
   glyph-accent seam (glyph 3:1, label 4.5:1 — C7).
5. A recalibration of the SIZE-channel tokens (`--tab-indicator-max-stretch` ≤1.2 / `-blob-max` area ≤1.14) to
   the `bar60/` reference (NO new spring/clock) + the Arm 1 §1 kinematic table as binding criteria.
6. `proof:eyeglass-tabs` (E1-E6 + self-test bites) + the π (the driven 60fps frame-series through
   `gesture-frame-recorder.mjs`, judged against `bar60/` on Chromium refraction + Safari honest-capsule, both
   modes) + the net-new WAAPI-seek driven-capture harness.

Everything else is a token retune + a class compose. Not a component, not an engine, not a spring.

---

## §11 — THE FOLD

The born-RED cursor row + the CLAUDE.md canon judgment live in `FOLD-BLOCK.md` (this directory). The orchestrator
folds the row into `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`; this wave-write touches ZERO execution
file. Booked successors: `BG.W-EYEGLASS-DOCK-KIN` (dock rail), the T1 clone-loupe (cross-engine over a duplicable
backdrop, and the recommended DEFAULT stage if perf forces off the live-aurora T2 path — AC6), the
chromatic-aberration rim (W-LENSING color-split), the LIVE ambient-observer wire (needs the field-canvas handle +
a fired writer-witness), and authoring/correcting the phantom `tab-ios-capsule.spec.ts` composed-peak enforcer
(AC2).
