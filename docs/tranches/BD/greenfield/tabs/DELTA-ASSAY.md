# TABS — DELTA-ASSAY (golden-vs-current + the UNION path)

> The deft integration of `tabs/GOLDEN.md` (folding challenge §§1-3 hardenings) into the
> shipped SegmentedTabs engine. Survival of the fittest: KEEP what is fit, REFINE what is
> weak, RE-INVENT only what is broken. No legacy, no dual-path, no second engine.
>
> Triage verdict: **REFINE-dominant + one RE-INVENT (the warm-floor of the capsule fill)**.
> The architecture is FIT and deftly integrable — the engine, the adaptive seam, the ONE
> `useLiquidFlex` primitive, the warm track all survive. The gaps are a missing recess, a
> near-gray capsule (the load-bearing RE-INVENT), an absent glass-hover, the not-yet-built
> 5-beat area-blob, and a one-line accent-flood. Every lever below was source-verified +
> **live-measured** on `/navigation/tabs` (Chrome :5173) this pass.

---

## 0. LIVE-MEASURED status quo (the bar to BEAT — Chrome :5173, this session)

Driven a REAL `aria-pressed` flip inside ONE `.segmented-tabs--pill` group (not a global
`.click()` — the global click no-ops the indicator, exactly the challenge §8-step-1 trap).

| Probe | Live measurement | Reading |
|---|---|---|
| `--motion-weight` on `:root` | `(empty)` | phantom — born-RED holds |
| `--ease-cartoon-punch` on `:root` | `(empty)` | phantom — born-RED holds |
| `--tab-blob` on `:root` | `(empty)` | absent — born-RED holds |
| `--tab-track-recess-ink` on `:root` | `(empty)` | absent — born-RED holds |
| `--tab-indicator-max-stretch` | **`1.18`** | matches `constants.ts:18` (NOT the stale `1.08`/`1.15` comments — challenge §1-R4) |
| `--tab-indicator-duration` | `0.4s` | the calibrated snappy clock |
| Track `background` | `color(srgb 0.994 0.96 0.926 / 0.5)` | **WARM** (R>G>B), not gray — challenge §2 confirmed |
| Track `box-shadow` | `rgba(255,255,255,.3) 0 1px 0 inset, srgb(.11 .098 .09/.06) 0 -1px 0 inset` | **rim-only, NO recess groove** (the two insets ARE the rim, 1px) — born-RED holds |
| Indicator `background` | `oklab(0.793 0.00516 0.0117 / 0.84)` → **chroma ≈ 0.0128** | **< 0.02 → NEAR-GRAY** — the capsule is the gray, NOT the track (challenge §3-R2) |
| Indicator nested in track? | `isChildOfTrack: true`, both carry `backdrop-filter` | **NESTED glass-in-glass** — GOLDEN §6 "not nested" is FALSE (challenge §2-R0) |
| Tab hover | `transition: color 0.2s`, `scale: 1` | **color-only hover** — the user's "better hover" gap is real |
| `.glass-drag-lift` register | exists in `segmented-tabs.css:399` (`--glass-specular: 0.1` + `will-change`) | the specular-lift idiom **already ships** for drag (challenge §1-R3) |
| Real far-tab glide | `cxRange 236px`, `stretchMax 1.13`, `peakArea/targetArea 0.74` | glide REAL, squish REAL, **area never exceeds target** (no 5-beat over-inflation) |
| Frame density | **5 rAF samples over 700ms** | the sparse-sampler flake the challenges flagged (§2-R1/§3-R1) |

**Visual (delta-current-light.png):** over the pink/purple aurora, the selected pills
(`Timeline`/`Normal`) read as **flat beige-gray slabs barely separable from the track** —
no lift, no sunken channel. This IS the "not glassy" register the user wants buttons to
STOP emulating; the gold standard must FIX it first, then extract it.

**Net:** the FOUNDATION is FIT. Three structural gaps (recess, area-blob, glass-hover),
one load-bearing defect (the near-gray capsule fill), two phantoms (already booked
elsewhere — see §3). REFINE the track/lift/hover, RE-INVENT the capsule warm-floor,
ADD the area-blob + flood, EXTRACT the register. No re-fork.

---

## 1. The DELTA — KEEP / REFINE / RE-INVENT / ADD

### KEEP (fit — byte-untouched)
- **The position engine** — `useTabIndicator` anchor path (`inset` glide) + the JS-measured
  fallback path. Center-anchored (BA-VJS-3), axis-derived. Live cxRange 236px = the glide
  works. **No second slider engine, ever.**
- **The ONE squish primitive** — `useLiquidFlex` squish channel (`useTabIndicator.ts:172`,
  `"linear"` law, the `capForSquish` getter). Live stretchMax 1.13 = the travel-squish fires.
  Byte-fenced; the blob is an ADDITIVE second channel.
- **The warm track FILL** — `--glass-bg-quiet` (`segmented-tabs.css:60`) measures warm
  `srgb .994 .96 .926`. The challenges proved the track is NOT where the gray lives. KEEP.
- **The W55 adaptive seam** — `--glass-bg-floating-tinted` off `surfaces.css:282`
  `:where(.btn-glass, .segmented-indicator)`. The mechanism is right; only its *floor* is weak
  (see RE-INVENT). KEEP + widen the `:where()`.
- **The underline (paper) material** — `scale: var(--stretch) 1` (`:311`/`:324`), no plate,
  no blur. The blob NEVER touches it (the §8 material fence). KEEP byte-for-byte.
- **The ONE clock** — `clockMs` × `INDICATOR_RELEASE_AT_ARRIVAL` (`:249`). Both channels
  release in lockstep. KEEP — the blob rides THIS schedule (no second timer).
- **PRM carve** — the `:206` early-return skips squish; the same branch gates the blob.
- **Compositor-only / Safari floor** — `scale`/`inset`/static `box-shadow`. No
  `backdrop-filter:url`, no SVG goo, no WebGL. KEEP as the §L7 floor.

### REFINE (weak → evolve, same primitives)
- **The track SINKS** — add the iOS-27 recessed groove: `inset 0 1px 2px
  var(--tab-track-recess-ink)` as a THIRD box-shadow leg beside the two rim legs. A PLAIN
  per-mode pair (light `tokens/glass.css`, dark `tokens/dark-arm.css`), **NEVER a
  `light-dark()` fragment** (the inset-shadow trap — it computes the whole box-shadow to
  `none`). STATIC (never a `@keyframes` target). [W-TAB-IOS-CAPSULE C1, already specs this]
- **The glass HOVER** — the user's literal "better hover" ask. The non-selected pill lifts a
  hair of glass on hover. But DO NOT mint a NEW class: the `.glass-drag-lift` register
  (`:399`, `--glass-specular: 0.1` + `will-change`) ALREADY ships the two-channel idiom
  (challenge §1-R3). REFINE: factor the SHARED specular-lift primitive ONCE; the hover
  register and `.glass-drag-lift` both compose it at their own magnitude. The §0 census line
  "hover ABSENT" is corrected to "PARTIAL (exists for drag, not hover)".
- **Calibrate the cap** — bring `--tab-indicator-max-stretch` DOWN from the live **1.18**
  toward ~1.11 once the area-blob carries the "grow", AND fix the stale `1.08`/`1.15`
  comments (`useTabIndicator.ts:231`, `useDragMorph.ts`, `constants.ts`) that lie about the
  runtime value (no-legacy: a comment that lies IS cruft). The cap is a consumer/demo tunable.
- **The glyph scale-pop** — the landed label settles AFTER the capsule (overlapping action).
  A byte-safe value change on the existing `.segmented-tab { scale:1 }` identity base
  (`:234`), gated by `--motion-weight` (0 under PRM). Pure CSS, on the `aria-pressed` flip.

### RE-INVENT (broken → the load-bearing fix)
- **The capsule warm-floor** — THE single load-bearing defect. The selected indicator paints
  `oklab(0.793 0.005 0.012)` → **chroma 0.0128, near-gray** over the aurora. The W55 seam's
  *floor* desaturates: the lifted lozenge — the whole "glassy gold standard" — reads as a
  flat beige-gray slab. The GOLDEN's §2b "factored verbatim" extraction would PRESERVE the
  gray (extraction-of-a-gray-plate is still gray — challenge §3-R2). FIX: add the warm-admit
  floor (a small compose toward `--glass-tint-source`, which resolves warm both modes) to
  `.glass-capsule` ITSELF, not only the track, so the capsule meanChroma clears 0.02 over the
  field BOTH modes. This is the RE-INVENT — without it the extraction ships the gray.

### ADD (the genuinely-new behaviour — the 5-beat + the commit)
- **The area-blob** (`--tab-blob`) — a SECOND `useLiquidFlex` channel driven IMPERATIVELY
  (matching `--stretch` — NOT a CSS transition; see §2), composed into the ONE existing
  `scale` write as `scale: calc(--tab-blob × --stretch) calc(--tab-blob / --stretch)`. The
  5-beat: anticipation → grow+overshoot → travel swollen → settle → shrink-to-fit.
- **The commit accent-flood** (`--tab-flood-t`) — an opt-in one-shot `::after` wash of
  `--glass-accent` (`plus-lighter`), trailing the SPATIAL leg by a beat then clearing (T4
  EFFECTS-after-SPATIAL). Default `--glass-accent: transparent` → byte-identical at rest.

---

## 2. The UNION path — precise integration (KISS, DRY, no second engine)

### 2a. The extracted register — `.glass-capsule` (the spine, the buttons consume it)

`src/styles/glass/glass-capsule.css`, `@layer components`, `@import`-ed in `index.css`
AFTER the glass ladder, BEFORE the consuming tabs/dock/button recipes. THREE classes,
≥3 consumers (segmented-indicator, dock-tab selected, Button glass) — clears overfit by
construction. **NOTE the rename:** the W-TAB-IOS-CAPSULE wave names the class
`.glass-tab-capsule` (file `glass/tab-capsule.css`); the GOLDEN renames to `.glass-capsule`
(file `glass/glass-capsule.css`) to drop the "tab" noun so buttons own it without a tab in
the class name. **The amendment adopts `.glass-capsule`** — it is the more-fit name for a
≥3-consumer register the buttons greenfield substitutes wholesale. Clean break, no alias.

- `.glass-capsule` — the lifted lozenge: `--glass-bg-floating-tinted` fill + the warm-admit
  floor (the RE-INVENT) + `--glass-rim-top`/`-bottom`/`--glass-shadow-floating` +
  `--glass-blur-floating` on `--radius-pill`. `.segmented-indicator` COMPOSES it (drops its
  inline fill/rim/lift — clean break). Widen `glass/surfaces.css:282`
  `:where(.btn-glass, .segmented-indicator)` → `…, .glass-capsule)`.
- `.glass-capsule-track` — the recessed channel: `--glass-bg-quiet` + rim +
  `inset 0 1px 2px var(--tab-track-recess-ink)` (PLAIN per-mode pair). `.segmented-tabs`
  track composes it.
- `.glass-capsule-hover` — the hover/press register, composing the SHARED specular-lift
  primitive `.glass-drag-lift` already uses (NOT a fork): `--glass-specular` catch-light +
  `scale: 1.015` hover / `scale: 0.97` press on the fast bezier clock. The non-selected pill
  composes it.

> Once these exist the buttons greenfield is "compose `.glass-capsule` +
> `.glass-capsule-hover`, set `--glass-accent`, done." The buttons row (§6 ledger) is
> RESOLVED by THIS extraction — no parallel button-glass fork.

### 2b. The motion channel — IMPERATIVE drive, ONE authority (the R3/R5 fix)

The challenges (§2-R5, §3-R3) proved a real hazard: `useLiquidFlex` is a **pure projection**
— the live indicator drives `--stretch` IMPERATIVELY via `squishOnTravel` (verified: no CSS
interpolation of `--stretch`; the CSS transitions the composed `scale`). So `--tab-blob`
MUST follow the SAME imperative pattern, NOT a CSS transition. Running a JS release-timer AND
a CSS `scale` transition on the punch curve double-animates (the curve restarts from the
current composed value mid-flight) — that IS the spike's flake.

**Resolution (binds the union):**
- `--tab-blob` is `@property`-registered ONLY so the discrete release-frame write doesn't
  snap-flicker — NOT so a CSS `transition` animates it. The `@property`-registered precedent
  cited is `--glass-accent`/`--progress` (NOT `--stretch`, which is unregistered + imperative
  — challenge §3-R3 correction).
- The 2nd `useLiquidFlex` channel writes `--tab-blob` every frame in lockstep with the
  `--stretch` write, off the SAME `clockMs × INDICATOR_RELEASE_AT_ARRIVAL` schedule and the
  SAME single `releaseTimer` (flushed atomically on a new `select()` — the rapid-switch
  desync guard, challenge §3-R1c). ONE timer, both channels.
- The CSS reads `--tab-blob` into the ONE composed `scale` write; it does NOT add `--tab-blob`
  to a `transition` list. The visible motion is the existing `scale`-on-the-clock transition;
  the blob is the imperatively-written amplitude.

### 2c. The anti-taffy cap — fence the COMPOSED area, not the bare scalar (the R1/R2 fix)

The TOP challenge refutation (§1-R1, §2-R2, §3-R1 unanimous): the live composed peak is
**~1.21–1.24×** (blob ≈1.10 × stretch ≈1.12 on the long axis), which BREACHES the GOLDEN's
own "≤1.12 anti-taffy" fence. The fence is on the bare `--tab-blob` scalar; the gate must
measure the **composed visible bbox area** (`blob × stretch`). Resolution:
- Define the fence on the COMPOSED area, target ≤~1.14.
- Drive `--tab-blob` toward a LOWER target (~1.045) so the curve-amplified, stretch-composed
  peak lands ≤~1.14 — OR split the area leg onto a monotone ease (the punch overshoot belongs
  to the GLIDE leg, where it reads, not the AREA leg, where it taffies). The amendment picks
  the **lower-target** path (KISS: one scalar tune, no second ease) and the gate carries an
  explicit UPPER bound arm (`peakArea/targetArea ≤ 1.14 → else RED`) the GOLDEN omitted.
- Calibrate against a frame-DENSE π (≥30 frames or a fixed ~8ms cadence, N/N green over
  repeats — never 1 lucky frame; the §0 live run captured only 5 frames/700ms).

### 2d. The nested-glass parity — prove it, don't declare it (the R0 fix)

The capsule IS a DOM child of the track and BOTH carry `backdrop-filter` (live-confirmed
nested glass-in-glass). The GOLDEN §6 "not nested → parity by construction" is FALSE. The
amendment does NOT restructure the DOM (the `anchor()` + `inset`-glide assume the parentage).
Instead the π carries a paired-engine (chromium + webkit) arm that MEASURES the
capsule-over-track luminance/blur delta and asserts it within tolerance on BOTH engines —
parity is PROVEN, not asserted.

### 2e. The commit flood — isolate the blend, sRGB-additive (the R4 fix)

The `plus-lighter` `::after` flood needs `isolation: isolate` on the `.segmented-indicator`
host (else Blink/WebKit diverge with no group), an `@supports (mix-blend-mode: plus-lighter)`
floor with a plain-opacity fallback, and the flood gradient in `in srgb` (additive layer),
NOT `in oklab`. Opt-in (`:floodOnCommit`), default `--glass-accent: transparent` → no-op rest.

### The UNION ledger (every lever — reused vs new)

| Need | Reused primitive (live-verified) | New surface |
|---|---|---|
| Position glide | `useTabIndicator` anchor/JS path (untouched) | — |
| Travel squish | `useLiquidFlex` squish channel `:172` (byte-fenced) | — |
| Area envelope | 2nd `useLiquidFlex` (same primitive, `from:1`), IMPERATIVE drive | `--tab-blob` reg + driver |
| Registered scalar | `@property` precedent `--glass-accent`/`--progress` | `--tab-blob`, `--tab-flood-t` |
| Capsule material | inline composite `segmented-tabs.css:100-116` | factored `.glass-capsule` + **warm-floor** |
| Adaptive seam | `--glass-bg-floating-tinted` `glass/surfaces.css:282` | `:where()` widened to `.glass-capsule` |
| Recess | `--glass-rim-*` | `--tab-track-recess-ink` PLAIN per-mode pair |
| Hover/press | **`.glass-drag-lift` specular-lift `:399`** (compose, don't fork) | `.glass-capsule-hover` |
| Accent flood | `--glass-accent` (BB.W-GLASS-ACCENT) | `::after` flood + `isolation:isolate` |
| `--motion-weight` | **booked: `BD.W-MOTION-WEIGHT`** (DEPEND, don't mint) | — |
| `--ease-cartoon-punch` | **booked: `BD.W-CARTOON-PUNCH`** (DEPEND, don't mint) | — |

ONE position engine, ONE squish primitive (2 channels), ONE clock, ONE timer. No new
component, no second spring/rAF, no `DockTabBar` SFC. The two motion phantoms are NOT minted
here — they are already booked by the motion-spring-register sibling waves (the same
reconciliation dock-core/dock-fission/goo-morph/cartoon-shadow all made).

---

## 3. Cross-wave reconciliation (no duplicative work against the 116-set)

- **`--motion-weight` / `--ease-cartoon-punch`** — the GOLDEN §3a says "MINT them". They are
  ALREADY BOOKED: `BD.W-MOTION-WEIGHT` ships `--motion-weight`, `BD.W-CARTOON-PUNCH` ships
  `--ease-cartoon-punch` (motion-spring-register + cartoon-shadow deltas, §6 rows 152/155).
  The tabs amendment **DEPENDS** on them — minting verbatim would FORK (no-legacy). The
  GOLDEN's §3a mint instruction is REDUNDANT and DROPPED.
- **`BD.W-TAB-IOS-CAPSULE`** — already specs the recess (C1) + the shared capsule fold (C2) +
  the W55 seam (C3) + the dock-tab fold. AUGMENT it (rename `.glass-tab-capsule` →
  `.glass-capsule`; ADD the warm-floor RE-INVENT to the capsule fill itself; ADD the
  `.glass-capsule-hover` register composing `.glass-drag-lift`; ADD the capsule-chroma born-RED
  arm). Do NOT author a parallel capsule wave.
- **`BD.W-TABS-LIQUID`** — already specs the 5-beat blob (C1-C6) on the capsule material.
  AUGMENT it (imperative-drive fence; composed-area cap fence + UPPER bound gate arm;
  frame-dense N/N π; the flood + glyph-pop as named sub-channels; DEPEND the two motion
  tokens). Do NOT author a parallel motion wave.
- **`BD.W-DOCK-TAB-INDICATOR`** (IOS27-REFERENCE T4, ~60%, PROPOSED, not on disk) — the
  nav-dock tab port + per-glyph scale-pop + the dock accent-flood. The flood + scale-pop
  registers minted by the tabs amendment are the SHARED recipe the dock-tab consumes. CROSS-
  LINK (the dock-tab wave consumes the tabs flood/pop register; no re-mint).
- **`BD.W-GLASS-IOS27-CONTROLS`** — DISJOINT (destructive→colored-glass + control-tracks).
  Its `glass-control-track` is a switch/checkbox/radio register, NOT the `.glass-capsule`
  selected-pill register. No collision; no edit.
- **buttons row (§6 ledger)** — "glassy-like-tabs" is RESOLVED by the `.glass-capsule` +
  `.glass-capsule-hover` extraction (the buttons compose them + set `--glass-accent`). The
  buttons greenfield consumes; it does not re-fork. (over-colorful-field is already DONE.)

---

## 4. Convergence

**Item convergence: ~70%.** The engine, the squish primitive, the warm track, the adaptive
seam, the ONE clock, the PRM carve, the compositor floor all SHIP (REFINE-dominant). The two
motion tokens are booked (DEPEND). The genuine remaining work: the warm-floor RE-INVENT of the
capsule fill (the load-bearing fix — the spike must exercise the REAL `light-dark()`/
`color-mix(oklab)` seam over a live aurora, NOT hardcoded hsl), the imperative-drive area-blob
(born-RED, no `--tab-blob` on disk), the recess (born-RED, track rim-only), the
`.glass-capsule` extraction + the hover register (compose `.glass-drag-lift`), the composed-area
cap re-tune + the UPPER-bound gate arm, the frame-dense paired-engine π, the opt-in flood.

The spine is FIT and integrates deftly into the extant ecosystem — a UNION, not a bolt-on.
The single crack the build must close is the gray capsule (RE-INVENT) and the taffy peak
(the composed-area fence) — both named as born-RED gate arms below in WAVE-AMENDMENT.md.
