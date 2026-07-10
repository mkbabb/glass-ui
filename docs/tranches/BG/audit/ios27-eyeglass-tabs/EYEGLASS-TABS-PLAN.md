# EYEGLASS-TABS — THE PLAN (the design synthesis)

> Folds `EYEGLASS-TABS-DIRECTIVE.md` (the constitution) + `RESEARCH-KINEMATICS.md` (Arm 1) +
> `RESEARCH-FEASIBILITY.md` (Arm 2) + `RESEARCH-CENSUS.md` (Arm 3) into ONE coherent spec for the
> **eyeglass register** on `SegmentedTabs`. Precedence when the arms disagree: **on-disk HEAD > Arm 3
> census > Arm 2 feasibility > Arm 1 kinematics** (Arm 1 measured a device recording; the house has since
> made its own calibrated iOS-27 decision — see §0). This is a PLAN/TRANCHE-WRITE. No `src/`/`demo/`/
> `scripts/`/`styles/` edit; the wave lands via the fold block (§8) the orchestrator folds into the cursor.

Wave id: **BG.W-EYEGLASS-TABS**. The register is an **additive mode on the ONE `SegmentedTabs` engine** — not
a new component, not a new engine, not a new spring. The genuinely-new delta is deliberately small (§6): an
`eyeglass` boolean axis, one geometry token (`--eyeglass-proud`), `.glass-lens` composed onto the pill, an
optional ambient-hue wire. Everything else is a token retune + a class compose against primitives already on
disk (Arm 3's ~90%-already-there verdict, confirmed).

---

## §0 — The synthesis verdict + the resolved spring discrepancy (read first)

**The one contradiction between the arms, resolved against the source of truth.** Arm 1 maps the measured
travel (`response ≈ 0.32–0.40s, ζ ≈ 0.65–0.85`) onto "`--spring-snappy` (response 0.35, ζ 0.65–0.7)". Arm 2
maps it onto "`snappy` (0.48s, ζ=0.74, ~+3.2%)". These name the SAME token with DIFFERENT numbers because
**Arm 1 cites the retired pre-BD snappy.** The current source of truth (`src/composables/motion/springPresets.ts`,
verified HEAD) is:

| preset | response | ζ | analytic overshoot | register |
|---|---|---|---|---|
| **snappy** | **0.48s** | **0.74** | **+3.2%** | CONTROL — the tab-indicator glide (current) |
| dock | 0.68s | 0.64 | +7.3% | the weighty V↔H morph |
| press | 0.20s | 0.80 | +1.5% | the interactive tap |
| bouncy | 0.60s | 0.60 | +9.5% | emphatic one-shots |

`--spring-snappy-duration = 0.4s` (generated `t_s = −ln(0.02)/(ζ·ωₙ)`, read-only). **Arm 2 is correct vs
HEAD; Arm 1's 0.35/0.65 is stale.** The BD tuning DELIBERATELY made snappy "quick-but-WEIGHTY" as the house
iOS-27 identity — the house has already decided the iOS-27 control register is the weighty snappy. **The
eyeglass register RATIFIES that decision** (see Ruling 1) rather than re-deriving a device-specific number.
The residual gap (the reference's raw response reads ~15–20% quicker; its 1-slot leftward leg overshoots more,
~8% vs snappy's 3.2%) is absorbed by the retunable SIZE channels + the convergence band — never a
positional-spring change.

**Verdict up front:** the eyeglass tabs are a proud liquid-glass loupe that COMPOSES `.glass-lens` (Chromium
refraction) + `.glass-capsule` (the honest cross-engine plate) + `--glass-accent`/`--glass-ambient-hue` (rim
hue-steal) + the shipped `useTabIndicator` kinematics, retuned against the `bar60/` reference ladder. The
whole win is composition + one static geometry token + a measurement loop.

---

## §1 — THE EYEGLASS REGISTER (the design, as ONE spec)

### 1.0 — Activation surface

An additive boolean axis **`eyeglass?: boolean`** on `SegmentedTabs` (default `false`), **`pill`-only** (the
`underline` material is a bare `.paper-ink-mark` hairline with no plate to loupe — eyeglass is ignored on it,
not an error). It is ORTHOGONAL to the `variant` (pill·underline) MATERIALS axis and to the `:draggable` /
`:responsive` axes — it stacks like they do. `eyeglass` flips a `data-eyeglass` attribute the CSS reads (the
`data-density`/`data-size` precedent) and opts the strip into: (a) `.glass-lens` on the indicator, (b) the
proud geometry, (c) the accent/ambient rim wire. Default `false` ⇒ byte-identical to the shipped
`.glass-capsule` pill (`proof:tabs-ios`/`proof:tabs-std` stay green by construction).

### 1.1 — GEOMETRY: the proud loupe (signature #2 — make-or-break)

**Measured (Arm 1 §2c, [H]):** pill/bar height ≈ **1.14×**; crown overflows **+14px above** the bar top, base
**+12px below** the bottom; rest width ≈ **1.08–1.10× the slot** (290–300px over a 271px slot). A loupe
RESTING ON the track, taller than its slot on both edges — not the current inset highlight.

**Mechanism — the literal inverse of today's inset (STATIC, compositor-safe).** Today
`.segmented-indicator` insets INTO the track: `inset-block: var(--bouncy-track-trim)` (0.1875rem / 0.25rem@640).
Under `data-eyeglass`, the block inset becomes a **negative static outset** —
`inset-block: calc(-1 * var(--eyeglass-proud))` — so the pill crown/base spill PAST the track. This is a
**static box reservation, never an animated dimension**, so it clears `proof:no-layout-animation` with no new
allowlist entry (the existing `size-morph-indicator-booked` entry at `segmented-tabs.css` L199 covers only the
travel writes; a static inset adds nothing animated). The block-axis outset does NOT touch the inline glide
math (center-anchored on the tab centers, unchanged) — the proud pill translates as one rigid loupe.

> **[CRITIQUE-FIX C3 — the proud must land on the ANCHOR path too, or Safari-26 gets NO loupe.]** The
> `inset-block:` shorthand above is ONLY the JS `@supports not (anchor)` fallback (`.segmented-indicator--js`,
> segmented-tabs.css L93). On the **anchor-primary path** (`.segmented-indicator--anchor`, the Safari-26 + Chrome
> path — verified L174-200) there is NO `inset-block` shorthand: the block edges are the FOUR longhands
> `inset-block-start: calc(anchor(top) + 0.1875rem)` / `inset-block-end: calc(anchor(bottom) + 0.1875rem)`. So the
> eyeglass proud MUST be expressed on the anchor longhands as
> `inset-block-start: calc(anchor(top) - var(--eyeglass-proud))` /
> `inset-block-end: calc(anchor(bottom) - var(--eyeglass-proud))` (subtract to spill proud, mirroring the JS
> negative outset). As written, Safari 26 — where refraction ALSO degrades away — would get NEITHER refraction
> NOR proudness = a flat non-proud capsule, falsifying §2's "still reads unmistakably as a proud liquid-glass
> loupe on both engines." The proud stays a CONSTANT addend to the already-booked animated `inset` (the
> `size-morph-indicator-booked` entry covers it on BOTH paths — no new allowlist row). E3 (§5) is amended to
> assert the proud on BOTH the JS `inset-block` AND the anchor `inset-*` longhands.

- Mint **`--eyeglass-proud`** as a **LENGTH** — a density-scaled `rem` sibling of `--bouncy-track-trim` (e.g.
  `0.13rem`→`0.18rem@640`, ≈ +14% of the track block extent so the loupe reads 1.14× at any density). **[CRITIQUE-FIX
  C10]** it must resolve to a length (it is subtracted from/added to an `anchor()` length), NOT a bare ratio; T1
  forbids a px **radius** literal (the radius stays `--radius-tab` stadium), NOT a proportional block-inset length,
  so a `rem` outset is T1-safe. Default targets the measured 1.14×; the loop retunes it within a bounded band.
- The inline proud is a SECOND, whisper knob **`--eyeglass-proud-inline`** (default ~1.04–1.06×, LOW cap so
  adjacent pills never collide). The BLOCK proud is the load-bearing signature; the inline proud is a
  refinement the loop may dial to zero if collisions appear.
- **The track must NOT clip the proud pill** (verified: `.segmented-tabs`/`.segmented-indicator` are OUT of
  `.glass-material`'s `contain: paint` list — Arm 2 S3). If the strip is ever nested in a chrome bar that
  clips, the escape is the `.glass-dock-frame[data-has-rail]` box-inviolate pattern (`deltaW=deltaH=0`) — but
  the default tabs route needs none.

**Rest vs flight:** the proud geometry is IDENTICAL at rest and in flight (static). Flight adds ONLY the
compositor translate (glide) + the `scale` squish/blob (§1.4). Nothing about the box height/inset animates.

### 1.2 — OPTICS: refraction (signature #1 — make-or-break)

**Measured (Arm 1 §2a, [L→M]):** edge-concentrated displacement, near-unity interior (~1.0–1.1×) — a
droplet/squircle profile, NOT a spherical magnifier. Backdrop text bends + compresses at the crown rim; the
interior renders backdrop content at ~unity. This is EXACTLY the house `#glass-refract` squircle-bevel
(`f(x)=⁴√(1−(1−x)⁴)`, Snell n≈1.5) — compose it, do not fork a radial magnifier.

**Mechanism — compose the shipped `.glass-lens` onto the indicator.** `src/styles/glass-refract.css` ships
`.glass-lens` as one self-contained data-URI (`scale='28'` baked, DDR-LENS-BAKE) inside
`@supports (backdrop-filter: url("#glass-refract"))`, painting `backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter)`.
The eyeglass indicator composes `.glass-lens` (the pill does not carry it today). Off the `@supports` engine
it paints the un-gated blur+tint base ALONE (the honest Safari/Firefox floor — §2). The optional per-tab
`--glass-refract-bevel` (14% default) tune is available.

> **[CRITIQUE-FIX C8 — the lens is anchor-safe by shipped precedent; the risk is `contain: layout`, not the
> filter.]** The pill ALREADY composes `.glass-capsule`, which ALREADY paints `backdrop-filter:
> var(--glass-blur-floating)` on the anchored `.segmented-indicator--anchor` element (glass-capsule.css L64) —
> and the anchor-glide ships GREEN. So extending that same `backdrop-filter` with `url(#glass-refract)` mints no
> NEW stacking context and does NOT newly sever `anchor()` (my initial fear, refuted by the shipped-and-working
> precedent). TWO real notes remain: (a) **`.glass-lens` and `.glass-capsule` both set `backdrop-filter`** — the
> later-source-order `.glass-lens` block wins on the `@supports` engine (its `--glass-blur-resting url(#…)`
> REPLACES the capsule's `--glass-blur-floating`); the wave must confirm the blur rung is intended (resting vs
> floating) so the lensed frost matches signature #7's stage. (b) the perf `contain` below is the ONLY net-new
> containment risk.

- **No revived lens-swell.** `scale` is a baked literal; there is no `var()`-in-`url()` path (`proof:lensing`
  L1/L4 red a revival). The `:active` press-swell is RETIRED — do NOT try to couple `--glass-refract` to a
  press drive. The `:active` deform, if wanted, is the compositor squish (§1.4), never a map re-bake.
- **Static optics during flight is FORCED, and it is the SOTA move** (Arm 2 S6, CSSWG #542): the displacement
  `scale` cannot be `var()`-driven, so the map is constant; the pill travels via compositor `translate` and
  the only per-frame cost is the backdrop re-sampling under the moving box. **[CRITIQUE-FIX C8]** BOUND that
  raster with `contain: paint` (a stacking context the anchored pill ALREADY has via its `backdrop-filter`) —
  **NEVER `contain: layout`**: `material.css` L79 explicitly keeps the glass `contain` register at `paint` NOT
  `layout` precisely because `layout` "would make the box a containing block," and segmented-tabs.css L254-257
  goes out of its way (`scale:1; translate:0` identity base) to keep containing-block/stacking-context churn OFF
  the anchored indicator so it never severs `anchor()`. So the perf `contain` is `paint`-only; if a stronger
  bound is ever needed, it lives on an INNER non-anchored optics child, never on the `--anchor` element. The
  loop (§4) must VERIFY on Chrome that the anchor-glide survives whatever `contain` lands (a regressed glide
  reds the π `motionVerdict`). Do NOT drop the filter during fast travel and restore at rest (a visible pop, and
  moot — the optics are baked). Full baked optics ride the whole travel.
- **GL-shader fence (`proof:lensing` L6):** zero `aurora.frag`/`metaball.frag`/`webgl` edit. The lens is the
  shipped SVG `backdrop-filter: url()` asset; the wave composes it, never re-authors the graph.

### 1.3 — OPTICS: rim + specular + accent (signatures #3, #4, #5, #8)

**Measured (Arm 1 §2b/2d/2e, [H]):** over BUSY backdrops a thick luminous cyan rim (+ RGB dispersion, +
hue-steal from backdrop+accent); over CALM backdrops a thin dark refractive outline + a bright specular
top-crown arc + a soft base shadow ("resting on the glass"). Same geometry, backdrop-driven intensity.

**Mechanism — the pill already composes `.glass-capsule`; the rim is mostly there.** Compose, per leg:

| leg | house primitive | site | new? |
|---|---|---|---|
| directional lit rim (light top-crown + soft base) | `--glass-rim-top`/`-bottom` + `--glass-shadow-floating` box-shadow stack | `glass/glass-capsule.css` (already composed by the pill) | no |
| angle-keyed conic edge-glint | `::before` conic `from var(--specular-angle)` masked to `--glass-edge-glint-band`, `plus-lighter` | `glass/material.css`; `useSpecularPointer` writes `--specular-angle` | no (wire the leaf) |
| accent hue-steal on rim/glint | `color-mix(in oklab, <rim ink>, var(--glass-accent) var(--glass-accent-strength))` into `--glass-specular-core` | `tokens/property-regs.css` @property + `material.css` | no (set per-instance) |
| backdrop-hue pickup (calm↔busy) | `--glass-ambient-hue`/`--glass-ambient-strength` (bounded ≤8%), written by `useGlassBackdropLuminance` | `tokens/glass.css §BE`; observer at `composables/glass/useGlassBackdropLuminance.ts` | **wire onto the strip** |

- **The dark refractive outline is a Chromium-lens artifact, NEVER a painted dark inset.** `proof:tabs-ios`
  T3 reds a dark top inset / a `--foreground`-at-dark-alpha catch-light (the top edge MUST be light). Reconcile:
  the reference's thin dark rim is REFRACTION (the displacement outline on the Chromium lens arm), not a
  box-shadow. On the honest Safari floor the rim is the LIGHT specular-top + soft base (glass-capsule's
  existing stack). So T3 holds on both engines — the dark rim only appears where refraction physically
  produces it.
- **Signature #5 (calm↔busy attenuation) — the STATIC bucket is the shipped floor; the LIVE observer is
  BOOKED with a hard on-disk prerequisite. [CRITIQUE-FIX C1 — the live animated-sample path is DEAD on disk.]**
  `useGlassBackdropLuminance` writes `--glass-ambient-hue`/`-strength`, BUT its `sampleAnimated` (live-canvas)
  path is documented DEAD at HEAD (useGlassBackdropLuminance.ts L268-290, BG.W-GLASS-SIGNAL-TRUTH ST3/ST5/M8):
  it fires ONLY when a **resolvable field canvas** is handed (`backgroundCanvas` getter / `data-glass-field-canvas`),
  and "**0 of 12 docks fired the writer-fired witness**" — the dock, the plan's cited consumer #1, is ITSELF
  currently dead on the animated path. So a bare observer wire onto the tab strip over the LIVE WebGL aurora
  would ALSO be dead. Honest posture (NF-compliant — do not claim a live dynamic effect that doesn't fire):
    - **SHIPPED floor:** the STATIC declarative `--glass-backdrop: light|dark` bucket (a per-route class the
      stage sets) drives the coarse calm-vs-busy rim strength cross-engine, no sampling. This is REAL and
      reproduces the coarse signature (busy route → bloom, calm route → recede).
    - **BOOKED refinement (the WITHIN-route dynamic tracking the reference shows as the avatar scrolls in):**
      the live observer, which requires the tab strip to hand the aurora `<canvas>` as `backgroundCanvas` (or tag
      it `data-glass-field-canvas`) so `sampleAnimated`'s `drawImage`+`getImageData` readback resolves — net-new
      wiring the wave scopes EXPLICITLY (and must prove the WebGL canvas is readback-able at all — a WebGL
      context needs same-frame `drawImage` or `preserveDrawingBuffer`). Until the writer-fired witness lands for
      the strip, §4.3's attenuation band is judged against the STATIC bucket, NOT "the observer produces it."
    - **≥2-consumer promotion caveat:** if the dock consumer is dead (0/12), the strip cannot be "consumer #2 of
      a working observer" — the promotion is contingent on FIRST making at least one consumer's animated path
      fire the witness; otherwise the observer's live path stays booked, not promoted. Record this honestly.
  All legs stay ≤4Hz throttled, IntersectionObserver-gated, PRM → single mount sample (§3).
- **Chromatic aberration at the rim (the reference's RGB fringe) is a BOOKED W-LENSING successor, not built**
  — the displacement map carries no color; a color-split rim is net-new SVG work. Record it as a named future
  signature; the wave ships the monochrome squircle refraction + the accent/ambient hue on the rim.

### 1.4 — KINEMATICS: glide + squish + blob (signature #3)

**Spring — RATIFY snappy, clock frozen (Ruling 1).** The glide rides `--spring-snappy` (0.48s, ζ=0.74, +3.2%)
on the frozen clock `--tab-indicator-duration = --spring-snappy-duration` (0.4s). NO new spring, NO snappy
PRESETS retune, NO hand `linear()` (W-GLASS-CAL fence; `proof:liquid-tab` LT3; `proof:tabs-ios` T4 freezes the
clock). Center-anchored (`useTabIndicator`); anchor-interpolated `inset` is the Safari-26 primary, the
JS-measured `transform`/`width` write the pre-18.2 floor (both shipped).

**The retunable SIZE channels (the loop's LEGAL knobs).** The positional spring is frozen, so the "reads
bouncier / wider mid-flight" delta is delivered by the SIZE-overshoot channels, which `proof:tabs-ios` T4
permits within `constant == token ∈ [1.0, 1.2]`:

| channel | token / constant (HEAD) | reference target | law |
|---|---|---|---|
| travel stretch (`--stretch`, reciprocal `scale: X, 1/X`) | `--tab-indicator-max-stretch` 1.11 / `DEFAULT_INDICATOR_MAX_STRETCH` 1.11 | mid-flight core-width peak **1.15–1.25×** (Arm 1 §1, motion-blur excluded) | volume-preserving, released at arrival |
| blob (uniform area inflation, `--ease-cartoon-punch`) | `--tab-indicator-blob-max` 1.045 / `DEFAULT_INDICATOR_BLOB_MAX` 1.045 | the "wider-than-rest capsule" mid-flight | anticipate→overshoot→settle |
| release-at-arrival | `INDICATOR_RELEASE_AT_ARRIVAL` 0.82 (byte-frozen by T4) | plate contracts to rest width at settle | keep frozen |

The reference kinematic table (Arm 1 §1 — T2/T3/T4 per-frame x/width) is the wave's BINDING criteria; the loop
(§4) retunes ONLY `--tab-indicator-max-stretch` / `--tab-indicator-blob-max` (cap-lockstep, constant==token) to
match it. **[CRITIQUE-FIX C5 — the TWO channels have DIFFERENT legal caps; do not conflate them at [1.0,1.2].]**
`proof:liquid-tab` LT2 (verified proof-liquid-tab.mjs L125-126) caps the **BLOB** channel by its **AREA ≤ 1.14**
(volume-preserving ⇒ per-axis `--tab-indicator-blob-max` ≤ √1.14 ≈ **1.068**, NOT 1.2); the **STRETCH** channel
(`--tab-indicator-max-stretch`) is the reciprocal squish capped ≤ **1.2** (taffy floor). Growing
`--tab-indicator-blob-max` toward 1.2 REDS LT2. The reference's 1.15–1.25× mid-flight core-width is reachable as
the PRODUCT (stretch ≤1.2 × blob ≤1.068 ≈ 1.28 ceiling) — the loop pushes stretch first, blob only within its
area cap. The positional overshoot itself stays snappy's ζ (the 8% T2 witness is a compressed-centroid reading on
the extreme-tab leftward leg; Arm 1's own caveat flags it under-read/over-read, and T4 gives ζ≈0.85 — snappy's
0.74 sits mid-band; §4.3's overshoot band accepts the rendered ~3% snappy overshoot, NOT the device's 8% — an
ACCEPTED house-identity divergence, C11).

**Travel choreography — what animates vs what engages at rest:**

- **In flight (animated):** position (compositor `translate` glide on `--spring-snappy`) + size (the
  `--stretch`/`--tab-blob` `scale` squish, release-at-arrival). Continuous slide through every intermediate x
  (Arm 1 §1: the lens transits the middle tab in T3 — no fade-out/fade-in). Duration weakly
  amplitude-dependent (2 slots ≈ 1 slot in settle — the spring signature).
- **At rest AND through flight (static):** the proud geometry (§1.1), the full baked lens/rim/specular optics
  (§1.2–1.3). The loupe is fully-formed the entire time; it slides, it does not assemble.
- **EFFECTS, trailing the glide:** the accent flood + selected-ink swap (§1.5) — the fast bezier
  (`--duration-fast`), keyed to the glide's SETTLE ("the swap reads as part of the lens arrival", seed obs 4).

### 1.5 — Selected INK / accent transfer (signature #6) — the AA fence

**Measured (Arm 1 §2d, [H]):** selected glyph `≈#54FBFE` saturated cyan, label cyan; unselected pure white;
a clean white→app-accent binary that arrives with the lens.

**Mechanism — the accent is FLOOD + RIM, NOT a library label re-point (Ruling 5).** `proof:tabs-ios` T5
requires the active label resolve `var(--foreground)` (AA over the pill); `proof:register-ios` clause e forbids
a saturated brand hue on an interactive selector. So:

- **The LIBRARY default selected label/glyph stays `--foreground`** (the warm-ink, AA-safe). The teal read is
  delivered by the `--tab-flood-t` accent-flood (the `.segmented-indicator::after` radial `plus-lighter` wash,
  default `transparent` no-op) + the `--glass-accent`/`--glass-ambient-hue` rim — timed to arrival (the flood
  0→1→0 trails the glide a beat then clears).
- **The app-accent hue is a CONSUMER PRESET** (presets-in-consumers): the consumer sets `--glass-accent: <hue>`
  on the strip. An opt-in glyph-accent seam **`--tab-selected-ink`** (defaulting `var(--foreground)`) lets a
  consumer tint the selected glyph to `var(--glass-accent)`.
- **[CRITIQUE-FIX C7 — split GLYPH (graphics, 3:1) from LABEL (text, 4.5:1) so the LIBRARY reproduces the cyan
  glyph honestly.]** As written the plan punts the ENTIRE accent to a consumer preset, so the default eyeglass
  tabs do NOT reproduce signature #6 at all (a warm-ink glyph + a teal wash ≠ the reference's saturated cyan
  glyph). But the fences distinguish TWO contrast targets: T5 / `proof:no-gray` bind the **label** (text) to the
  4.5:1 floor (⇒ label stays `--foreground`), while an icon/glyph is a **graphic** governed by the WCAG 1.4.11
  **3:1** non-text-contrast floor. The reference cyan `#54FBFE` over the teal pill interior (`[50,126,155]`)
  measures ≈3.4:1 — BELOW 4.5:1 (why the label must stay ink) but ABOVE 3:1 (so the GLYPH may tint). So the
  LIBRARY default MAY tint the selected **glyph** to `var(--glass-accent)` WHEN an accent is set (default no-op at
  `--glass-accent: transparent`) and clear the 3:1 graphics floor — reproducing signature #6's cyan icon
  faithfully and gate-green — while the **label** stays `--foreground`. `--tab-selected-ink` remains the glyph
  seam; the wave asserts (E5) the glyph clears 3:1 and the label clears 4.5:1 (NOT that both are `--foreground`).
  The reference's sub-AA saturated cyan LABEL is the one thing not reproduced (Apple is sub-WCAG there) — an
  ACCEPTED, bounded a11y divergence, stated loud.

### 1.6 — THE STAGE: the heavily-frosted tinted bar (signature #7 — [CRITIQUE-FIX C4, previously unaddressed])

**Measured (Arm 1 §2f/§3 #7, [H]):** the bar itself is a heavily-frosted tinted capsule — backdrop texture std
**59.1 → 3.3 through the bar (~94% contrast-kill)**, a teal→blue gradient, floating rounded capsule. "Get this
wrong and the lens has nothing legible to bend." The plan §1.1–§1.5 covered signatures #1–#6/#8 but **never
specified the track material** — a real gap: the shipped track ships `.glass-capsule-track` at
`backdrop-filter: var(--glass-blur-quiet)` (**8px calm register**, glass-capsule.css L85), far below the
reference's ~94% kill, so the eyeglass lens would bend a still-noisy near-sharp aurora (a worse read than the
reference's clean frosted field, AND the nested-backdrop-filter compose only reads right when the pill lenses an
ALREADY-frosted track output).

- **Mechanism:** the eyeglass mode re-points the TRACK to a STRONGER frost rung under `data-eyeglass` — a
  `--glass-blur-floating`/dedicated `--eyeglass-track-blur` (targeting the ~94% contrast-kill band) so the pill's
  `backdrop-filter` (which samples the backdrop BEHIND it = the frosted track output) lenses a legible smooth
  field. This is a token substitution on the track for the eyeglass mode ONLY (the default pill track is
  byte-unchanged), no new recipe. The teal→blue tint is a CONSUMER preset (the app theme; the library ships the
  warm-cream identity), never a library hue.
- **Fence:** this is the stage, not the loupe — it is NOT the deep-glass tier (`--glass-depth`), and it must stay
  within the budget (one strong-frost stage per route). The stronger blur is the STAGE the loupe bends, not more
  blur ON the loupe.
- **Convergence (§4.3):** add a track contrast-kill probe (the reference 94% figure) — the lens has a legible
  field to bend or the wave is not done.

---

## §2 — THE DUAL-ENGINE STORY (primary per engine + honest degrade)

`backdrop-filter: url(#…)` is Chromium/Edge ONLY (WebKit 245510 open, Firefox never). Every mechanism below is
real CSS on the stated engine and degrades to a **legitimately-lesser real surface**, never a fake of the
working primary (NO-MASKING-FALLBACK).

| signature | Chromium primary | Safari 26 / Firefox | honest degrade posture |
|---|---|---|---|
| **refraction** (§1.2) | `.glass-lens` `backdrop-filter: var(--glass-blur-resting) url(#glass-refract)` — bends the live aurora | the `@supports` gate fails → the un-gated blur+tint `.glass-capsule` base ALONE | frost+tint+light-rim+specular+lift — a real proud glass loupe that makes NO loupe claim (the reference itself uses this over calm backdrops, so the fallback IS a reference state). No broken `url()` ref, no pre-baked "magnified" image. |
| **proud geometry** (§1.1) | static `inset-block` outset (JS path) OR `calc(anchor(top/bottom) − var(--eyeglass-proud))` (anchor path) | identical — **IFF the anchor-longhand form ships (C3)**; the `inset-block` shorthand ALONE reaches only the JS path, leaving Safari-26 (anchor-primary) a flat non-proud capsule | pure layout — both engines, no risk, ONCE C3 lands |
| **rim / specular / edge-glint** (§1.3) | box-shadow rim + `::before` conic (`plus-lighter` 16.4+, `mask-image` 2023) | identical | full paint both engines; only the DARK refractive outline is Chromium-lens-only (a real artifact, not painted) |
| **accent / ambient hue** (§1.3/1.5) | `color-mix(in oklab)`, `@property`, observer | identical (all Safari 26) | 0%/transparent defaults = provable no-op |
| **kinematics** (§1.4) | compositor `translate`+`scale`; anchor-glide OR JS-measured | identical (anchor Baseline 2026; JS floor pre-18.2) | compositor-only, cheap both engines |

**The C18/π judge runs the refraction arm on Chromium and the honest-capsule arm on Safari** — two real target
states, both judged (§4). The one thing Safari 26 genuinely cannot do is refract the arbitrary LIVE aurora
canvas; over that backdrop its ceiling IS the honest capsule, and the wave states that loud.

**BOOKED, not built — the cross-engine T1 clone-loupe.** Arm 2 proposes a `scale()`-ed cloned-backdrop child
(regular `filter: url()`, Safari-OK) to give Safari a real loupe. It requires a CSS-DUPLICABLE backdrop; the
demo tabs route stages over a LIVE WebGL aurora (not duplicable), so T1 buys the actual route nothing and
building it now is substrate-without-consumer. Book `.glass-lens-loupe` as the cross-engine refinement for a
future CSS-gradient-staged surface. The wave ships T2 (Chromium) + T3 (honest floor); T1 is a named successor.

---

## §3 — PRM CARVE + a11y

**Roles/ARIA byte-untouched** (this is a CSS + compose wave): `aria-pressed` (pill `role="group"`),
`aria-selected` (underline `role="tablist"`), the roving-tabindex, `@keydown` arrow-nav — all preserved
(`proof:tabs-ios` T4; `proof:tabs-std`). The `:draggable` / `:responsive` a11y contracts are inherited
unchanged. Touch floor (`min-block-size: max(2rem, --control-floor)`) held.

**PRM = seat the MOTION, keep the OPTICS** (motion-canon P6 — fade-keeps/transform-drops, extended to the
static-optics register):

- **Dropped under `prefers-reduced-motion: reduce`:** the `--stretch` squish (stays 1, no deform), the
  `--tab-blob` overshoot (re-aliases to no-overshoot), the glide's positional overshoot (seats
  no-overshoot). The glide still COMMITS (the discrete selection happens); the ambient observer collapses to
  a single mount sample (the `useWebGLCanvas` substrate-PRM mirror).
- **KEPT under PRM:** the STATIC eyeglass optics — the proud geometry, the baked lens/rim/specular, the tint.
  A proud glass loupe at rest is legible MATERIAL, not vestibular motion; removing it would remove the
  affordance, not a hazard. The color swap + the discrete selection still commit.

**AA legibility:** the selected label resolves `--foreground` (T5), AA over the tinted pill; the on-glass
muted registers hold (`proof:no-gray` / `proof:menu-glass`). A consumer accent-ink preset (§1.5) owns its own
AA clearance.

---

## §4 — THE ITERATION LOOP (build → 60fps capture → automated compare → refine, to numeric convergence)

The user mandated a measured loop, not a vibes loop. This is the recreate-iterate harness, engine-compatible,
terminating on numeric bands.

### 4.1 — The reference ladder (the source of truth to converge ON)

- **Kinematics:** the Arm 1 §1 per-frame tables — T2 (Devices→People, 1 slot 258px left, the OVERSHOOT
  witness), T3 (People→Items, 2 slots 552px, the reference travel + the continuous-transit proof), T4
  (Items→Me, 1 slot 244px, near-critical). Reduced from `bar60/` (regenerate deterministically per the
  DIRECTIVE corpus commands; `ext/` strip at `t = 7.0 + N/60`).
- **Optics probes (settled frame):** proudness 1.14× (crown +14px / base +12px), rest width 1.08–1.10× slot,
  rim luminance profile (busy: L-dip to ~120 then B-channel 200–206 bright interior; calm: thin dark notch +
  light specular-top), selected glyph accent-vs-white, calm↔busy rim attenuation Δ.

### 4.2 — The capture instrument (a DRIVEN 60fps frame-series — never a settled still)

The IOS27-MOTION-TRUTH rule: the π is a live-gesture frame-series, never a settled capture. Two compatible
front-ends, ONE reducer:

- **Reducer (on disk):** `scripts/lib/gesture-frame-recorder.mjs` — `frameSchedule` (deterministic clock),
  `recordFrameSeries` (composes the ONE `reflect-capture-verify.pngRegionStats` decoder), `motionVerdict`
  (a dead-snap / settled-still-only series REDs), `settledVerdict` (tail rests at endpoint), `overshootVerdict`
  (the iOS bounce; monotone arrival does NOT false-fire), `gestureFrameVerdict` (composite `liquid`).
- **Capture front-end:** extend the C18 `?capture=<route>&mode=` seam (`demo/main.ts`) from a settled still to
  a DRIVEN series — pointer-inject the tab select, drive a `renderAt(frame)` protocol, crop the bar-band at the
  SAME geometry as `bar60/`. The CDP screencast harness (chrome-devtools-mcp) is the Chrome front-end.
  **[CRITIQUE-FIX C9 — name the WebKit capture path; chrome-devtools-mcp is Chrome-ONLY.]** The Safari arm of the
  π has NO named instrument as written. Use the tranche's EXISTING dual-engine harness (the repo already does
  "dual-engine PASS Chrome+Safari both modes" captures — the Playwright `webkit` project screencast is the
  cross-engine front-end feeding the SAME `gesture-frame-recorder.mjs` reducer). Run over the tabs route
  (`navigation/tabs`, staged over the live aurora — a real backdrop to bend), both engines (Chromium refraction +
  Safari capsule), both modes (light/dark).
- **Per-frame reduction:** extract `(center-x, plateW, plateH)` with the SAME `brightness×smoothness` FWHM the
  reference used (the pill lightens+blurs the backdrop → bright + low-texture); align by travel-normalized time
  against the reference table.

### 4.3 — Convergence criteria (numeric — the loop terminates on measurement)

Green requires ALL bands, across T2 + T3 + T4, on BOTH engines, BOTH modes:

| axis | band | rationale |
|---|---|---|
| position (center-x) | max per-frame `|Δx| ≤ 24px` mid-travel, `≤ 12px` at endpoints | Arm 1 caveat: ±20px mid, ±10px endpoint measurement floor + margin |
| settle | tail within `±4px` of true tab center for `≥5` trailing frames | `settledVerdict` |
| overshoot | `overshootVerdict` FIRES (monotone arrival REDs); peak positional overshoot `∈ [2%, 9%]` of travel, recovered `≤ 6` frames (~100ms) | brackets snappy ζ=0.74 (3.2%) + the T2 8% witness — a BAND, not a hard 8% match |
| width (squish) | mid-flight core-width peak `∈ [1.10×, 1.25×]` rest (motion-blur excluded), releasing to `±5%` of rest at settle | Arm 1 §1 honest geometric stretch + release-at-arrival |
| proud (STATIC reservation) | the RESTING static box reservation `= 1.14 ± 0.03 ×` track, and the reservation is CONSTANT (no animated `inset`/`height` — a NEW animated box dimension REDs `no-layout-animation`). Note the rendered block extent DOES vary in flight by the compositor blob `scale` (≤1.068/axis) — that is compositor-safe and expected; the "constant" band probes the STATIC reservation, not the rendered pixels | signature #2 [CRITIQUE-FIX: clarified static-reservation vs blob-scaled render] |
| timing | departure→2%-settle `∈ [200, 320]ms`; t90 (perceptual arrival) `∈ [110, 200]ms` | Arm 1 §1 derived kinematics |
| **perf (60fps mid-tier mobile) [CRITIQUE-FIX C2 — was ABSENT]** | on a throttled mobile profile (4×-CPU, the `proof:lighthouse` register), the driven T3 travel drops `≤ 1` frame over its ~19-frame (~317ms) span; no long-task > 50ms during travel; the Chromium `backdrop-filter: url()` refraction over the LIVE aurora is `contain: paint`-bounded. Judged on the Chromium refraction arm (the expensive path; iOS-Safari degrades to the cheap capsule) | the directive's explicit 60fps-mid-mobile ask; Arm 1's MEASURED travel is ~19 frames (NOT the seed's stale "≤4 frames"), so the refraction re-raster runs the whole span — a real cost with NO band as written |
| optics (settled — NUMERIC thresholds, [CRITIQUE-FIX C6 — Arm 1 supplies the numbers]) | proudness `1.14 ± 0.03×`; **busy-arm** rim: interior B-channel `≥ 190` with an L-dip to `≤ 130` at the outline (Arm 1 §2b busy B 200-206 / L~120); **calm-arm** rim: interior B `≈ 165 ± 15`, light specular-top present, no bloom; dark refractive outline present on the Chromium busy arm ONLY; accent: selected-GLYPH B-channel `≥ +60` over unselected white-glyph baseline WHEN a preset accent is set AND glyph clears 3:1 / label clears 4.5:1 (§1.5 C7); **calm↔busy Δ** judged against the STATIC `--glass-backdrop` bucket (the shipped floor — NOT "the observer produces it"; the live observer path is DEAD on disk, §1.3 C1 — a band gated on a dead mechanism never terminates) | Arm 1 §2b/2d/2f |

### 4.4 — The loop body (build → capture → reduce → compare → refine)

1. Build the register at the current token values.
2. Capture the driven 60fps series (§4.2), both engines, both modes, T2/T3/T4.
3. Reduce + compare vs §4.3; emit the FAIL set.
4. Refine — the FAIL→knob map (the ONLY legal knobs; the spring/clock are frozen):
   - width too small → grow `--tab-indicator-max-stretch` (≤1.2) FIRST; grow `--tab-indicator-blob-max` only
     within its LT2 AREA cap ≤1.14 (per-axis ≤~1.068 — **NOT** [1.0,1.2]; see C5) — cap-lockstep, constant==token.
   - proud off → retune `--eyeglass-proud` / `--eyeglass-proud-inline` (a LENGTH; applied on BOTH the JS
     `inset-block` AND the anchor `inset-*` longhands — C3/C10).
   - rim/attenuation off → tune `--glass-accent-strength` / the STATIC `--glass-backdrop` bucket strength (the
     shipped floor). The LIVE observer gain is a knob ONLY once its writer-fired witness lands for the strip
     (§1.3 C1 — until then the attenuation is judged against the static bucket, not the dead live path).
   - perf FAIL (dropped frames on the throttled mobile arm) → tighten the `contain: paint` bound / confirm the
     lens `@supports` gate is the only Chromium refraction path; do NOT drop-and-restore the filter mid-travel
     (§1.2). If the refraction genuinely cannot hold 60fps on the mid-tier profile, the honest fall is the T3
     capsule floor on that profile (recorded, not masked) — NOT a faked static-image loupe.
   - **timing off (too slow vs the reference's ~15–20% quicker raw response) → RECORD as a residual, do NOT
     retune** (the clock is frozen by T4; a snappy-family re-time is a cross-consumer change OUT OF SCOPE and
     BOOKED to a spring-register wave with its own sign-off). The house weighty-snappy is the ratified iOS-27
     identity (§0); the residual is measured and accepted, not smuggled.
5. Repeat until all bands green. **Terminate on measurement, not vibes.**

### 4.5 — The π = this series judged GREEN

Born-RED at HEAD (the pill carries no lens, no proud geometry — the series fails `motionVerdict`'s liquid
composite + the optics probes) → GREEN at convergence. The π is the driven frame-series through
`gesture-frame-recorder.mjs`, judged against `bar60/` on the Chromium-refraction arm + the Safari
honest-capsule arm, both modes. This is the binding painted truth; the device-free gate (§5) proves the
composition + the fences, the π proves the paint.

---

## §5 — THE GATE (`proof:eyeglass-tabs`) + the gates that stay green

**`proof:eyeglass-tabs`** (device-free, `["local","ci"]`) — the composition + fence gate, born-RED → GREEN:

- **E1** — the `eyeglass` axis exists ONCE on `SegmentedTabs` (a `data-eyeglass` attr, pill-only), additive
  default-off (default-off byte-identical to the shipped capsule pill).
- **E2** — the indicator COMPOSES `.glass-lens` (not a forked filter); the whole refraction rides INSIDE the
  `@supports (backdrop-filter: url("#glass-refract"))` gate (the honest degrade floor); no revived
  `var()`-spliced `scale` (DDR-LENS-BAKE) + a self-test bite.
- **E3** — the proud geometry is a STATIC outset off `--eyeglass-proud` (a **LENGTH**, no px radius literal),
  applied on **BOTH** the JS `inset-block` **AND** the anchor `inset-block-start/-end` longhands (C3 — else
  Safari-26 gets no proud); a NEW animated box dimension REDs (`no-layout-animation` cross-check) + a self-test
  bite (a proud present on ONLY one of the two position paths REDs).
- **E4** — the kinematics read the FROZEN clock (`--tab-indicator-duration = --spring-snappy-duration`); the
  STRETCH cap constant==token ≤ 1.2 AND the BLOB cap constant==token with AREA ≤ 1.14 (per-axis ≤~1.068 — C5,
  distinct caps, NOT a shared [1.0,1.2]); NO new spring/`linear()`/PRESETS re-time + a self-test bite (a planted
  hand-`linear()`, a clock-override, OR a blob-max pushed past its area cap REDs).
- **E5** — the accent is FLOOD+RIM + the CONTRAST-SPLIT ink: the selected **label** clears 4.5:1 (stays
  `--foreground`, no interactive brand-red re-point); the selected **glyph** may tint to `var(--glass-accent)`
  and clears the 3:1 graphics floor (C7 — reproduces the cyan icon honestly, gate-green); `--tab-selected-ink`
  is the glyph seam; the ambient/attenuation is the STATIC `--glass-backdrop` bucket floor (the live observer is
  BOOKED, its animated path DEAD on disk — C1, records the honest posture NOT a ≥2-consumer promotion of a dead
  path) + self-test bites (a saturated-hue LABEL default REDs; a glyph below 3:1 REDs).
- **E6** — the honest-degrade posture recorded (Safari = proud capsule + rim + accent, no faked bend); the T1
  clone-loupe, the chromatic-aberration rim, AND the live ambient-observer wire BOOKED with named successors.
- + a self-test suite proving each fence detector is not hollow.

**Gate-contradiction matrix — the eyeglass wave MUST keep these green (Arm 3):**

| gate | the lock respected |
|---|---|
| `proof:tabs-std` | ONE engine, two materials; glide on `--tab-indicator-duration`; volume-preserving `--stretch`; cap ≤1.2; center-anchored; underline paints NO plate |
| `proof:tabs-ios` | T1 stadium `--radius-tab` (no px radius); T3 no dark ring / dark top inset (the top edge LIGHT); T4 ARIA + engine byte-fence (cap lockstep [1,1.2], `RELEASE_AT_ARRIVAL=0.82`, clock=`--spring-snappy-duration`); T5 active label=`--foreground` |
| `proof:lensing` | L1/L4 no revived `var()`-scale / lens-swell; L3 refraction never outside the `@supports` gate; L6 GL-shader fence (zero `aurora.frag`/`metaball.frag`/`webgl` edit) |
| `proof:liquid-tab` | LT1 pull-is-default; LT2 blob-visible cap (composed area ≤~1.14); LT3 no second engine (the `snappy` row); LT5 drag ADDITIVE to a11y (WCAG 2.1.1) |
| `proof:no-layout-animation` | compositor-only; the `size-morph-indicator-booked` entry stays; the proud geometry is static-reserve/transform, no NEW animated box dimension |
| `proof:glass-accent` | rim/glint accent is the oklab per-instance axis; @property no-op floor at rest; ≥2 consumers; NEVER writes the `--glass-tint-*` plate cohort |
| `proof:register-ios` | clause e — NO `--viz-fourier`/brand-red on ANY interactive selector; the eyeglass accent is a consumer PRESET hue |
| `proof:glass-cal` | the per-spring `--spring-<name>-duration` clocks are generated, read-only — no new spring/clock |
| `proof:no-masking-fallback` | Safari lens degrade is HONEST (blur+tint+rim, no faked refraction); primary works in paint or fails loud |

---

## §6 — WHAT IS GENUINELY NEW (the whole delta — deliberately small)

1. The `eyeglass` boolean axis on `SegmentedTabs` (a `data-eyeglass` attr; pill-only, additive default-off).
2. `--eyeglass-proud` (+ the whisper `--eyeglass-proud-inline`) — the STATIC proud-outset geometry token (a
   LENGTH), applied on BOTH the JS `inset-block` AND the anchor `inset-*` longhands (C3).
3. `.glass-lens` composed onto `.segmented-indicator` (Chromium refraction; honest Safari **proud** capsule
   degrade — C3) + the stronger `--eyeglass-track-blur` STAGE frost (signature #7, C4).
4. The STATIC `--glass-backdrop` bucket for calm↔busy attenuation (the shipped floor); the LIVE
   `useGlassBackdropLuminance` wire is BOOKED (its animated path is DEAD on disk — C1, needs the field-canvas
   handle + a fired writer-witness before it counts as a consumer) + the opt-in `--tab-selected-ink` glyph-accent
   seam (glyph 3:1, label 4.5:1 — C7).
5. A recalibration of the SIZE-channel tokens (`--tab-indicator-max-stretch` ≤1.2 / `-blob-max` area ≤1.14) to
   the `bar60/` reference (NO new spring/clock), + the Arm 1 §1 kinematic table as binding criteria.
6. `proof:eyeglass-tabs` (device-free + self-test bites) + the π (the driven 60fps frame-series through
   `gesture-frame-recorder.mjs`, judged against `bar60/` on Chromium refraction + Safari honest-capsule, both
   modes) + the extended C18 driven-capture seam.

Everything else is a token retune + a class compose. Not a component, not an engine, not a spring.

---

## §7 — SCOPE FENCES (what this wave does NOT touch)

- **The tabs ENGINE ARIA** — `aria-pressed`/`aria-selected`/roving-tabindex/`@keydown` byte-untouched
  (`proof:tabs-ios` T4). This is a CSS + compose wave.
- **The underline material** — `.paper-ink-mark` / the ink hairline untouched; eyeglass is `pill`-only.
- **The dock morph** — `dockMorphContext`/`DOCK_SPRING`/`useLayerTransition` untouched.
- **The dock-tab kin — BOOKED, not built.** The directive names "dock-tab kin where the census says it
  generalizes." The census framed eyeglass as a `SegmentedTabs` mode; the dock rail indicator
  (`DockLayerGroup`) has its OWN `size-morph-indicator-booked` allowlist entry + the W-REGISTER-IOS
  selected-as-glass register, and the dock morph is a separate mechanism under the one-deep-refractive-register-
  per-route budget. This wave lands the register on `SegmentedTabs` ONLY; composing the eyeglass loupe onto the
  dock rail indicator is a named generalization successor (BG.W-EYEGLASS-DOCK-KIN), not this wave.
- **The spring family** — no new spring, no snappy PRESETS re-time, no hand `linear()`, no `--tab-indicator-
  duration` override (T4 freeze). A residual timing gap vs the reference is MEASURED + accepted (§4.4), booked.
- **The lens SVG graph / GL shaders** — the shipped `.glass-lens` data-URI + `#glass-refract` map composed
  verbatim; zero `aurora.frag`/`metaball.frag`/`webgl` edit (`proof:lensing` L6); no revived `var()`-scale.
- **The T1 clone-loupe + the chromatic-aberration rim** — booked cross-engine / color-split successors, not
  built (§2, §1.3).

---

## §8 — THE FOLD BLOCK (born-RED cursor row — the orchestrator folds it; DO NOT edit EXECUTION-PROGRESS.md here)

> Ready-to-lift row. The engine IMPLEMENTS the wave; the orchestrator OWNS the cursor edit. This block lives in
> this plan doc only — no execution-file write from this task.

```
| BG.W-EYEGLASS-TABS | RED | The iOS-27 eyeglass register on SegmentedTabs — an additive `eyeglass` mode
(pill-only, default-off) composing `.glass-lens` (Chromium refraction, honest PROUD `.glass-capsule` Safari
degrade) over a stronger-frosted STAGE track (`--eyeglass-track-blur`, signature #7), the STATIC proud loupe
(`--eyeglass-proud` LENGTH, 1.14× the track, on BOTH the JS `inset-block` AND the anchor `inset-*` longhands),
the ratified snappy glide (0.48s/ζ0.74, frozen clock) with the reference-retuned SIZE channels
(`--tab-indicator-max-stretch` ≤1.2 / `-blob-max` area ≤1.14 to the bar60/ ladder), the FLOOD+RIM accent (label
clears 4.5:1 at `--foreground`; the glyph clears 3:1 tinting to `--glass-accent`; calm↔busy via the STATIC
`--glass-backdrop` bucket — the LIVE observer wire is BOOKED, its animated path DEAD on disk), PRM =
seat-motion-keep-optics. Gate: proof:eyeglass-tabs (E1-E6 + self-test bites). π: the DRIVEN 60fps frame-series
(gesture-frame-recorder.mjs, Chrome CDP + Playwright-webkit front-ends) judged against bar60/ on
Chromium-refraction + Safari-honest-capsule, both modes, to the §4.3 numeric convergence bands INCLUDING the
mid-tier-mobile 60fps/frame-budget band (born-RED at HEAD → GREEN at convergence). Keeps green: tabs-std,
tabs-ios (T1/T3/T4/T5), lensing (L1/L3/L4/L6), liquid-tab (LT2 blob-area ≤1.14), no-layout-animation,
glass-accent, register-ios, glass-cal, no-masking-fallback. Booked successors: BG.W-EYEGLASS-DOCK-KIN (dock
rail), the T1 clone-loupe (cross-engine over a duplicable backdrop), the chromatic-aberration rim (W-LENSING
color-split), the LIVE ambient-observer wire (needs the field-canvas handle + a fired writer-witness). |
```
