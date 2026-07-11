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

> **PRE-CANON:** an adversarial critique (verdict **SOUND-WITH-FIXES**, findings AC1–AC8, all fixes applied
> inline + verified against on-disk HEAD) is in the **CRITIQUE (adversarial, pre-canon)** section before §8.
> Read it before this becomes canon — two findings (AC1 Safari @supports truth, AC3 driven-capture determinism)
> are build-time VERIFICATION prerequisites, not source-only claims.

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
`--tab-indicator-blob-max` toward 1.2 REDS LT2. **[AC-FIX AC2 — C5's "1.28 ceiling" is WRONG; the house composed
anti-taffy INTENT is ≤1.14, BELOW the reference's 1.20×.]** The along-travel rendered width is the PRODUCT
`blob × stretch`, and `proof-liquid-tab.mjs` L129 records the house intent as **composed peak `blob × stretch` ≤
1.14** (the anti-taffy fence — the SAME quantity Arm 1 calls "core-width"). So C5's "1.28 ceiling" is not the
target and not the house intent: the eyeglass along-travel swell is capped at **≈1.14×** (e.g. blob 1.045 ×
stretch 1.090 ≈ 1.14). The reference's ~1.20× core-width (Arm 1 §1: rest 290 → peak 348) therefore is NOT fully
reproduced — the house anti-taffy fence deliberately swells tighter than iOS. This is an ACCEPTED bounded
house-identity divergence (mirroring the §0 timing residual), recorded loud, NOT smuggled. CAVEAT: the composed
cap's ENFORCER, `tests-visual/tab-ios-capsule.spec.ts`, is a **PHANTOM at HEAD** (does not exist — verified;
`tabs-std.spec.ts` is the only live tabs spec), so today only the per-channel device-free caps (blob ≤1.068,
stretch ≤1.2) actually block — meaning nothing currently reds a 1.20× swell. The eyeglass wave MUST either honor
the 1.14 composed intent (recommended) or, if it targets 1.20, correct the LT2 L129 comment's dead-spec citation
and note the intent is superseded (a future spec landing 1.14 would then red — so honoring 1.14 is the safe
default). The positional overshoot itself stays snappy's ζ (the 8% T2 witness is a compressed-centroid reading on
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
- **[AC-FIX AC5 — the nested backdrop-filter compose (strong-frost track + `url()` pill-lens) is a known-finicky
  rendering path; VERIFY it live, do not assert it.]** The pill (`.segmented-indicator`, `position:absolute`
  inside `.segmented-tabs`) is a DESCENDANT of the track, so a track `backdrop-filter` establishes a backdrop root
  and the pill's `backdrop-filter: url()` samples the track's FROSTED output — which is exactly the desired
  "lens an already-frosted field." BUT nested `backdrop-filter` × `contain: paint` × the anchored-indicator
  stacking-context (segmented-tabs.css L254-257 deliberately keeps stacking-context churn OFF the `--anchor`
  element to avoid severing `anchor()`) is precisely where Chromium regresses. The wave MUST LIVE-verify (Chrome)
  that the pill demonstrably lenses the FROSTED track output (not the raw aurora, and not a broken empty backdrop),
  AND that adding the track backdrop root does not sever the anchor glide (a regressed glide reds the π
  `motionVerdict`). This is a build-time verification step, not a source assertion.

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
- **[AC-FIX AC3 — the DRIVEN capture harness is NET-NEW infra, not a trivial `?capture=` extension; name the
  determinism mechanism or the numeric bands do not terminate.]** What is on disk is ONLY the REDUCER
  (`gesture-frame-recorder.mjs` — `recordFrameSeries` takes pre-captured PNG paths; `frameSchedule` is a schedule
  helper). The browser-DRIVING half is unbuilt: (a) pointer-inject the tab select; (b) **deterministically STEP
  the spring frame-by-frame** — a best-effort CDP/Playwright screencast jitters, and the §4.3 per-frame `|Δx|≤24px`
  bands CANNOT terminate against a jittering clock. The determinism mechanism is **WAAPI seek**: `getAnimations()`
  on the indicator → set `animation.currentTime = frameSchedule[i]` and capture (WebKit + Chromium both support
  seeking a running CSS `transition: inset`/WAAPI transform), forcing a repaint of the `backdrop-filter: url()`
  raster at each seeked frame. (c) **The OPTICS arm is judged at SETTLED over a KNOWN backdrop state** — the
  KINEMATICS arm tolerates a live backdrop via the backdrop-robust cyan-centroid (Arm 1's method), but the rim
  luminance probes need a fixed backdrop; you CANNOT freeze the aurora via PRM to fix it because PRM also kills the
  squish/overshoot you are measuring (§3), so the optics arm captures the settled pill over a pinned/seeded aurora
  frame while the kinematics arm runs the live gesture. Scope this driven-capture harness as genuinely-new work,
  not an `?capture=` one-liner.

### 4.3 — Convergence criteria (numeric — the loop terminates on measurement)

Green requires ALL bands, across T2 + T3 + T4, on BOTH engines, BOTH modes:

| axis | band | rationale |
|---|---|---|
| position (center-x) | max per-frame `|Δx| ≤ 24px` mid-travel, `≤ 12px` at endpoints | Arm 1 caveat: ±20px mid, ±10px endpoint measurement floor + margin |
| settle | tail within `±4px` of true tab center for `≥5` trailing frames | `settledVerdict` |
| overshoot | `overshootVerdict` FIRES (monotone arrival REDs); peak positional overshoot `∈ [2%, 9%]` of travel, recovered `≤ 6` frames (~100ms) | brackets snappy ζ=0.74 (3.2%) + the T2 8% witness — a BAND, not a hard 8% match |
| width (squish) | mid-flight core-width (= along-travel `blob × stretch`) peak `∈ [1.10×, 1.15×]` rest, releasing to `±5%` of rest at settle. **[AC-FIX AC2 — upper bound LOWERED 1.25→1.15 to honor the house composed anti-taffy intent ≤1.14 (proof-liquid-tab.mjs L129); the reference's 1.20× is an ACCEPTED bounded divergence, not the band]** | house anti-taffy fence (composed peak ≤1.14) + release-at-arrival; the reference 1.20× is recorded as divergence, not converged-on |
| proud (STATIC reservation) | the RESTING static box reservation `= 1.14 ± 0.03 ×` track, and the reservation is CONSTANT (no animated `inset`/`height` — a NEW animated box dimension REDs `no-layout-animation`). Note the rendered block extent DOES vary in flight by the compositor blob `scale` (≤1.068/axis) — that is compositor-safe and expected; the "constant" band probes the STATIC reservation, not the rendered pixels | signature #2 [CRITIQUE-FIX: clarified static-reservation vs blob-scaled render] |
| timing | departure→2%-settle `∈ [200, 320]ms`; t90 (perceptual arrival) `∈ [110, 200]ms` | Arm 1 §1 derived kinematics |
| **perf (60fps mid-tier mobile) [CRITIQUE-FIX C2 — was ABSENT]** | on a throttled mobile profile (4×-CPU, the `proof:lighthouse` register), the driven T3 travel drops `≤ 1` frame over its ~19-frame (~317ms) span; no long-task > 50ms during travel; the Chromium `backdrop-filter: url()` refraction over the LIVE aurora is `contain: paint`-bounded. Judged on the Chromium refraction arm (the expensive path; iOS-Safari degrades to the cheap capsule). **[AC-FIX AC6 — the failure mode is a DEGRADE DECISION, not iterate-to-green.]** The `backdrop-filter: url()` refraction re-rasterizes a LIVE WebGL aurora for the WHOLE ~19-frame span — the single most expensive thing in the wave; if it cannot hold 60fps on the mid-tier profile the loop does NOT spin, it TERMINATES by falling that profile to the S1-T3 capsule floor (recorded, NF-honest — §4.4), never a faked static loupe. Consider staging the eyeglass DEFAULT over a CSS-EXPRESSIBLE backdrop (which unlocks the cheaper cross-engine T1 clone-loupe) rather than the live aurora, which forces the expensive T2-only path on every consumer (§2 books T1 but §-census stages over the live aurora — a perf tension) | the directive's explicit 60fps-mid-mobile ask; Arm 1's MEASURED travel is ~19 frames (NOT the seed's stale "≤4 frames"), so the refraction re-raster runs the whole span — a real cost |
| **Safari honest-degrade (AC-FIX AC1 — the load-bearing UNVERIFIED assumption)** | on Safari 26 the pill MUST resolve the honest `.glass-capsule` floating-frost floor (blur + tint + LIGHT rim + specular + lift), NOT a half-applied lens. The whole degrade rests on `@supports (backdrop-filter: url("#glass-refract"))` returning **FALSE** on Safari 26 — but WebKit has historically returned TRUE for `CSS.supports('backdrop-filter','url(#x)')` (parses the syntax, does not render — bug 245510). If TRUE, Safari ENTERS the `.glass-lens` block, its `backdrop-filter: var(--glass-blur-resting) url(#…)` REPLACES the capsule's `--glass-blur-floating` (source-order win, verified), the `url()` leg no-ops → a DIFFERENT blur rung with NO refraction = a masking-adjacent "tried and painted nothing," NOT the promised clean capsule. **The π MUST empirically confirm the Safari arm paints the capsule floating-frost rung** (measure the resolved blur radius / composited frost), and E6 records the result. Belt-and-suspenders: if Safari passes the @supports, add a runtime `CSS.supports`-verified companion or re-point the eyeglass Safari path to explicitly re-assert `--glass-blur-floating` | this is the single runtime fact the entire dual-engine honest-degrade story depends on, and it is asserted (via `proof:lensing` L3, a SOURCE gate) but never verified on a Safari 26 runtime for the NEW tab consumer |
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
  bite (a proud present on ONLY one of the two position paths REDs). **[AC-FIX AC7 — the anchor path HARDCODES the
  trim literal at TWO breakpoints; the proud override must reach both.]** Verified: the shipped anchor longhands
  are `calc(anchor(top) + 0.1875rem)` at base (segmented-tabs.css L181-182) AND `calc(anchor(top) + 0.25rem)` at
  `@640` (L221-222) — a HARDCODED `rem` literal, NOT `var(--bouncy-track-trim)`. So the eyeglass proud must be
  restated on the anchor longhands at BOTH breakpoints (e.g. `calc(anchor(top) + 0.1875rem - var(--eyeglass-proud))`
  base and `+ 0.25rem - …` @640), or the wave first threads the trim token into the anchor calc so a single
  `- var(--eyeglass-proud, 0px)` addend suffices. E3's self-test asserts the proud resolves at the `@640`
  breakpoint too (a base-only proud that vanishes at ≥640px REDs — the silent-absent-at-desktop class).
- **E4** — the kinematics read the FROZEN clock (`--tab-indicator-duration = --spring-snappy-duration`); the
  STRETCH cap constant==token ≤ 1.2 AND the BLOB cap constant==token with AREA ≤ 1.14 (per-axis ≤~1.068 — C5,
  distinct caps, NOT a shared [1.0,1.2]); NO new spring/`linear()`/PRESETS re-time + a self-test bite (a planted
  hand-`linear()`, a clock-override, OR a blob-max pushed past its area cap REDs).
- **E5** — the accent is FLOOD+RIM + the CONTRAST-SPLIT ink: the selected **label** clears 4.5:1 (stays
  `--foreground`, no interactive brand-red re-point); the selected **glyph** may tint to `var(--glass-accent)`
  and clears the 3:1 graphics floor (C7 — reproduces the cyan icon honestly, gate-green); `--tab-selected-ink`
  is the glyph seam. **[AC-FIX AC4 — the glyph tint MUST live on a DESCENDANT svg/glyph selector, NEVER the tab's
  own `color`.]** `proof:tabs-ios` T5 scans `.segmented-tab[aria-pressed="true"] { color: … }` and pins it to
  `var(--foreground)`; the glyph (an inline SVG) typically inherits `currentColor` = the tab `color`. Tinting the
  glyph by writing the tab's `color` would (a) RED T5 and (b) drop the LABEL below AA in lockstep. So
  `--tab-selected-ink` must be applied on a descendant `.segmented-tab[aria-pressed="true"] svg` (or glyph-child)
  rule — `color`/`fill: var(--tab-selected-ink, var(--foreground))` — decoupled from the inherited label ink. E5's
  self-test bite asserts a glyph tint written on the TAB `color` (not a descendant) REDs (T5-respecting), beside
  the glyph-below-3:1 and saturated-LABEL-default bites. The ambient/attenuation is the STATIC `--glass-backdrop`
  bucket floor (the live observer is BOOKED, its animated path DEAD on disk — C1, records the honest posture NOT a
  ≥2-consumer promotion of a dead path).
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

## CRITIQUE (adversarial, pre-canon)

> A second, hostile pass against the plan + all three research arms + the directive, run against on-disk HEAD
> (every cited file/line/token/gate-clause verified). The plan already folds a strong self-critique (C1–C11,
> all confirmed real); this pass attacks what those missed or softened. Findings are `AC*`; each clear fix is
> applied inline at its site (tagged `[AC-FIX ACn]`) and summarized here. **Verdict: SOUND-WITH-FIXES.** The
> composition, the no-fork discipline, and the honest-degrade posture are correct and mostly gate-coherent; the
> defects are two make-or-break VERIFICATION gaps (Safari @supports truth, driven-capture determinism), one
> under-acknowledged FIDELITY cap (the swell), and four implementation/coherence nits. None is fatal; all have a
> clear correct answer, applied below.

### Verified-TRUE (the plan's load-bearing claims hold at HEAD)
- Spring table §0 (snappy 0.48/ζ0.74/+3.2%, dock 0.68/0.64, press 0.20/0.80, bouncy 0.60/0.60) — EXACT vs
  `springPresets.ts`. Arm 2 correct, Arm 1 stale — the plan resolved it right.
- The anchor-positioning path is REAL (`.segmented-indicator--anchor`, `inset-block-start: calc(anchor(top) +
  0.1875rem)`, L174-200) — C3's entire basis is valid; Safari-26 genuinely uses this path.
- `.glass-lens` (glass-refract.css L172, `@layer components`) is imported AFTER glass.css/`.glass-capsule`
  (L170, same layer) → source-order-wins the `backdrop-filter` conflict on the `@supports` engine. C8 correct.
- `.glass-capsule` = `backdrop-filter: var(--glass-blur-floating)` (L64); `.glass-capsule-track` = `--glass-blur-quiet`
  8px (L85) → C4's signature-#7 track-frost gap is REAL.
- `proof:tabs-ios` T3 (a dark top inset reading `--foreground` REDs — top edge MUST be light) and T5 (active
  label pinned `var(--foreground)`) are real and registered; the dead-rim reconcile (§1.3) is sound.
- `useGlassBackdropLuminance` animated path is GENUINELY DEAD (0/12 docks fired the witness) — C1 correct, the
  booked-not-claimed posture is the right NF call.
- The proud-inset is covered by the `size-morph-indicator-booked` allowlist (`props:["width","height","inset"]`,
  proof-no-layout-animation.mjs L199-203) — a CONSTANT proud addend adds no new animated dimension. Green holds.

### Findings (most-severe first)

**AC1 — Safari `@supports (backdrop-filter: url())` truth is the single UNVERIFIED runtime fact the whole
honest-degrade rests on. [HIGH]** WebKit has historically returned TRUE for `CSS.supports('backdrop-filter',
'url(#x)')` (parses syntax, renders nothing — bug 245510). If Safari 26 returns TRUE, the pill ENTERS the
`.glass-lens` block, its `backdrop-filter: var(--glass-blur-resting) url(#…)` REPLACES the capsule's floating
frost (source-order, verified), the `url()` no-ops → a wrong blur rung + NO refraction = a masking-adjacent
"tried, painted nothing," NOT the promised clean capsule. `proof:lensing` L3 asserts the gate in SOURCE, never on
a Safari runtime for the NEW tab consumer. FIX applied: §4.3 gains a Safari honest-degrade band (the π must
measure the resolved Safari frost rung); E6 records it; belt-and-suspenders re-assert `--glass-blur-floating` on
the eyeglass Safari path if the @supports leaks true.

**AC2 — the swell cap conflict: the house anti-taffy INTENT (composed `blob × stretch` ≤ 1.14) is BELOW the
reference's ~1.20× core-width; C5's "1.28 ceiling" is wrong and the §4.3 band's 1.25 upper bound exceeds the
house intent. [HIGH]** proof-liquid-tab.mjs L129 records the composed anti-taffy peak ≤ 1.14 (the SAME quantity
Arm 1 calls "core-width"; Arm 1 §1 measured 348/290 = 1.20 as the honest geometric figure). So a FAITHFUL swell
(1.20) exceeds the house fence, and C5's product-of-maxes (1.28) both overshoots the plan's own band AND the
house intent. Compounding: the enforcer `tab-ios-capsule.spec.ts` is a **PHANTOM at HEAD** (verified absent — the
LT2 L129 comment cites a dead spec), so today nothing reds a 1.20 swell, but the stated intent is 1.14 and a
future spec landing it would red. FIX applied: C5 corrected; §4.3 width upper bound lowered 1.25→1.15; the
reference 1.20× recorded as an ACCEPTED bounded divergence (the house swells tighter than iOS on purpose); the
phantom-spec citation flagged for authoring-or-correction.

**AC3 — the DRIVEN deterministic 60fps capture harness is net-new and under-scoped; the numeric bands do not
terminate without it. [MED-HIGH]** On disk is ONLY the reducer (`recordFrameSeries` consumes pre-captured PNGs)
+ a schedule helper. The browser-driving half (pointer-inject, deterministic per-frame spring STEP, dual-engine
screencast, forced `backdrop-filter` repaint per frame) is unbuilt; the plan frames it as an `?capture=`
extension. A best-effort screencast jitters → the `|Δx|≤24px` per-frame bands never cleanly terminate. FIX
applied: §4.2 names the determinism mechanism (WAAPI `getAnimations().currentTime` seek, cross-engine) + states
the optics arm is judged at SETTLED over a KNOWN backdrop (the kinematics arm tolerates a live backdrop via the
robust centroid; you cannot freeze the aurora via PRM without killing the motion you measure) + scopes it as
genuinely-new infra.

**AC4 — C7's selected-glyph tint must live on a DESCENDANT svg selector, never the tab's own `color` (T5 pins it).
[MEDIUM]** `proof:tabs-ios` T5 scans `.segmented-tab[aria-pressed="true"] { color }` = `--foreground`; the glyph
inherits `currentColor`. Tinting via the tab `color` REDs T5 AND drops the label AA. FIX applied: E5 requires
`--tab-selected-ink` on `.segmented-tab[aria-pressed="true"] svg` (decoupled from the label ink) + a self-test
bite that a tab-`color` glyph tint REDs.

**AC5 — the nested backdrop-filter compose (strong-frost track + `url()` pill-lens) is a known-finicky path,
asserted not verified. [MEDIUM]** Nested `backdrop-filter` × `contain: paint` × the anchored-indicator
stacking-context (the L254-257 anti-sever guard) is exactly where Chromium regresses. FIX applied: §1.6 adds a
build-time LIVE verification (the pill lenses the FROSTED track output; the added track backdrop root does not
sever the anchor glide).

**AC6 — the perf band's failure mode is a DEGRADE DECISION, not iterate-to-green; frame it so the loop
terminates. [MEDIUM]** `backdrop-filter: url()` re-rasterizing a LIVE WebGL aurora for the whole ~19-frame span on
a 4×-throttled mobile may be genuinely unachievable at 60fps; the honest outcome is falling that profile to the
capsule floor, not spinning. Also: staging the eyeglass DEFAULT over the live aurora GUARANTEES the expensive
T2-only path and forecloses the cheaper cross-engine T1 clone-loupe (which §2 books but the census stages away
from). FIX applied: §4.3 perf row + §4.4 state the degrade-decision termination + flag the live-aurora-vs-T1
staging tension.

**AC7 — the anchor proud override must reach BOTH breakpoints; the anchor inset hardcodes the trim literal.
[LOW-MED]** The shipped anchor longhands hardcode `+0.1875rem` (base) and `+0.25rem` (@640), NOT
`var(--bouncy-track-trim)`, so a base-only eyeglass override silently vanishes at ≥640px. FIX applied: E3 restates
the proud at both breakpoints (or threads the trim token first) + a self-test bite for the @640 case.

**AC8 — the RATIFIED weighty-snappy reads visibly SLOWER than THIS reference; state the perceptual consequence
loud, since the directive says "perfect the effect." [LOW]** §0 ratifies snappy (0.48s) over the reference's
measured ~0.32–0.40s (≈15–20% quicker) as the house iOS-27 identity. That is a defensible house choice, but it
means a reviewer comparing to the Find My video will see a deliberately heavier glide — not a bug, an identity
divergence. The precedence rule (on-disk HEAD > Arm 1) is what ranks the measured reference LAST on the two axes
where house-identity and fidelity conflict (spring timing AC8, swell cap AC2). Recorded as accepted; the §4.4
timing-residual clause already books it — this finding just asks the convergence timing-band rationale to name
the perceptual consequence so the divergence is not read as a miss.

### Cross-check on the 7 attack axes
1. **Fidelity:** honest — 5 of 8 signatures land faithfully; the swell (AC2), the sub-AA cyan LABEL (accepted
   divergence, §1.5), the LIVE calm↔busy dynamic (dead observer → static bucket, C1), and the chromatic-aberration
   rim (booked) are all acknowledged gaps. AC2 was the one under-acknowledged, now fixed.
2. **Safari-26 truth:** anchor / plus-lighter / mask-image / color-mix(oklab) / @property all real on 26; the ONE
   wishful assumption is the @supports-returns-false degrade (AC1), now flagged for empirical proof.
3. **No-fork:** clean — composition + a small genuinely-new delta; the `.glass-lens`/`.glass-capsule` co-compose
   is a cascade compose (verified source-order), not a fork.
4. **NO-MASKING-FALLBACK:** correct in intent; the ONE hole is AC1 (a leaked @supports would produce a
   masking-adjacent Safari paint) — closed by the added verification.
5. **Perf:** the real risk (refraction over live aurora, ~19 frames, mobile) is now a bounded degrade-decision
   (AC6), not an open-ended target.
6. **Iteration loop:** numeric + terminating ONCE the determinism mechanism (AC3) and the corrected swell band
   (AC2) land; without them the bands were unsatisfiable/jittering.
7. **Gate coherence:** tabs-std / tabs-ios (T3/T4/T5) / lensing (L1/L3/L4/L6) / liquid-tab (LT2) /
   no-layout-animation / glass-accent / register-ios / glass-cal / no-masking-fallback all stay green with the
   fixes — the only latent trap was AC4 (glyph vs T5), now closed.

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
(`--tab-indicator-max-stretch` ≤1.2 / `-blob-max` area ≤1.14; the COMPOSED along-travel swell honors the house
anti-taffy intent ≈1.14× — the reference's ~1.20× is an accepted bounded divergence, AC2), the FLOOD+RIM accent
(label clears 4.5:1 at `--foreground`; the glyph clears 3:1 tinting to `--glass-accent` on a DESCENDANT svg
selector, never the tab `color`, AC4; calm↔busy via the STATIC `--glass-backdrop` bucket — the LIVE observer wire
is BOOKED, its animated path DEAD on disk), PRM = seat-motion-keep-optics. Gate: proof:eyeglass-tabs (E1-E6 +
self-test bites). π: the DRIVEN 60fps frame-series (gesture-frame-recorder.mjs REDUCER + a NET-NEW WAAPI-seek
driving harness, AC3; Chrome CDP + Playwright-webkit front-ends) judged against bar60/ on Chromium-refraction +
Safari-honest-capsule, both modes, to the §4.3 numeric convergence bands INCLUDING (a) the mid-tier-mobile
60fps/frame-budget band whose FAILURE MODE is a degrade-to-capsule decision not iterate-to-green (AC6) and (b) the
Safari honest-degrade band that EMPIRICALLY confirms the @supports gate resolves the capsule frost, not a
half-applied lens (AC1). TWO build-time verification prerequisites (NOT source assertions): the Safari @supports
truth (AC1) + the nested track-frost×pill-lens compose + anchor-glide-survives-`contain` (AC5). Keeps green:
tabs-std, tabs-ios (T1/T3/T4/T5 — glyph tint on a descendant selector, AC4), lensing (L1/L3/L4/L6), liquid-tab
(LT2 blob-area ≤1.14), no-layout-animation, glass-accent, register-ios, glass-cal, no-masking-fallback. Booked
successors: BG.W-EYEGLASS-DOCK-KIN (dock rail), the T1 clone-loupe (cross-engine over a duplicable backdrop — and
the recommended DEFAULT stage if perf forces off the live-aurora T2 path, AC6), the chromatic-aberration rim
(W-LENSING color-split), the LIVE ambient-observer wire (needs the field-canvas handle + a fired writer-witness),
and authoring/correcting the phantom `tab-ios-capsule.spec.ts` composed-peak enforcer (AC2). |
```
