# CHIP FAMILY — DELTA-ASSAY (golden vs the LIVE current, the UNION path)

> The honest golden-vs-current delta for **ToggleChip** (`chip`·`cell`) +
> **SelectableChip** (`sm`/`md`/`lg`) + **IconChip** (+ the toggle-group). Survival of
> the fittest: KEEP what is fit, REFINE what is weak, RE-INVENT what is broken — then
> the **deft UNION path** that evolves the current toward `GOLDEN.md` reusing extant
> primitives, KISS, no legacy, no dual-path. The three challenges
> (`challenge/1.md`·`2.md`·`3.md`) are FOLDED into the verdict here (they SURVIVE-the-
> golden-but-gut-its-evidence; the design is fit, its self-account was inflated). This
> assay corrects the inflation against the **real 116-wave union set** the GOLDEN never
> read.

---

## 0. TL;DR — the verdict

**REFINE-dominant, with ONE RE-INVENT (the geometry grab-bag → one stadium) and ONE
NET-NEW surface (the warm-glass chip lens + the punch-on-select).** The GOLDEN's *design*
is right (one rounded warm-glass pill that punches on pick) — but **three of its five
"consumed" registers are phantoms**, its centerpiece flood is **dead-on-arrival in its own
spike** (challenge #2 R1+R2), its punch is **sub-perceptual** (challenge #2 R5), and its
"≥4th consumer of `.glass-capsule`" union is **a dependency on vapor** (all three
challenges, unanimous TOP). The UNION path corrects all of this by re-aiming the chip at
**the registers the sibling amendments ACTUALLY ship** (`--glass-fill-tint` already at
HEAD; `.glass-capsule`+warm-floor produced by the tabs amendment; `--motion-weight`/
`--ease-cartoon-punch` produced by the booked motion waves) and by sequencing the chip
**downstream** of those, not pretending they exist.

**Convergence: ~78%** (design fit + born-RED honest + the real consumable axis exists at
HEAD; the remaining 22% is the cross-wave sequencing + the de-fraud of the flood/punch/
chroma + the build).

---

## 1. THE LIVE CURRENT — painted-honest (Chrome :5173, both routes, 2026-06-24)

Measured against the REAL `ToggleChip`/`SelectableChip` DOM (NOT the spike; the route
serves the Vue app). Artefacts: `delta-current-light.png`, `delta-current-selectable-light.png`.

### 1a. CONGRUENCE — the grab-bag, confirmed + SHARPENED

| variant (live) | radius | height | pad | backdrop | shadow |
|---|---|---|---|---|---|
| `ToggleChip.chip` ("contour") | **4px** (`rounded-sm`) | 25px | `2px 8px` | `none` | `none` |
| `ToggleChip.cell` ("Triangle") | **0px** | 58px | `10px 8px` | `none` | `none` |
| `SelectableChip.md` ("Vue") | **6px** (`rounded-md`) | 33px | — | `none` | `none` |
| `SelectableChip.lg` ("Popular") | **10px** (`rounded-lg`) | 38px | — | `none` | `none` |
| `IconChip` (source) | **9999px** (`--radius-pill`) | glyph-floored | `none` (0 `backdrop-filter`) | plate only |

**FOUR squared radii (0 / 4 / 6 / 10px) + the lone IconChip pill = the user's #1 complaint,
LIVE.** The cell's `rounded-[0.625rem]` resolves **`0px`** — DROPPED entirely (challenge #1
correction: WORSE than the GOLDEN §B1 "~10px"; the gate must born-RED against `0px`).
`backdrop-filter: none` + `box-shadow: none` on EVERY chip — "glassy" is structurally absent.

### 1b. GLASSY — the idle-gray is REAL + the active-default is ALSO gray (a NEW finding)

Painted chroma (the `bg` resolves to an `oklab()` token; C = √(a²+b²)):

| chip | state | tone | C (chroma) | L | H | read |
|---|---|---|---|---|---|---|
| ToggleChip "contour" | off | default primary | **0.0142** | 0.913 | 67° | **gray** (< 0.02 floor) |
| ToggleChip "bone" | **on** | default primary | **0.0133** | 0.837 | 67° | **gray** (active darker, NOT more chromatic) |
| SelChip "Vue" | off | default | **0.0138** | 0.940 | **97°** | **gray + off-hue** (greenish, not warm) |
| SelChip "React" | **on** | a vibrant `:tone` | **0.0305** | 0.894 | −20° | clears (a SET tone) |
| SelChip "Recent" | **on** | default primary | **0.0133** | 0.838 | 67° | **gray** |

**Two findings the GOLDEN under-stated:**
1. The **idle** off-chips composite **C 0.013–0.014 < 0.02** (GOLDEN-confirmed born-RED gray).
2. NEW: the **active band on the DEFAULT tone is ALSO gray** (C 0.013, L just drops). Active
   clears 0.02 ONLY when a consumer sets a *vibrant* `:tone` (React → 0.0305). The GOLDEN's
   "the ACTIVE band clears; the idle does NOT" (§B2) is **half-wrong** — over the default
   `--primary` BOTH states are near-gray; the active read is a *darken*, not a *chroma lift*.
   **The warm floor must lift BOTH the idle AND the default-tone band** — the cure is wider
   than the GOLDEN scoped.

### 1c. MOTION — the on↔off flip is a calm color-snap (FIT spine, no punch)

The `[transition:scale … --spring-smooth …]` §6 lift/settle ships TODAY on both CVAs
(`scale-100 hover:scale-(--scale-hover-btn) … data-[state=on]:scale-(--scale-press-btn)`).
That hover/press lift is FIT — KEEP. But the STATE FLIP itself is a flat
`background-color var(--duration-fast)` cross-fade — no anticipation, no overshoot, no flood.
Per design.md §L4 the select is a DRIVER motion (the finger) and must carry liquid weight; it
does not.

---

## 2. THE PHANTOM SPINE — the GOLDEN's union is on VAPOR (all 3 challenges, unanimous TOP)

Grep of `src/` (2026-06-24), the GOLDEN's "five extant registers it consumes":

| GOLDEN-claimed primitive | GOLDEN says | LIVE `src/` | verdict |
|---|---|---|---|
| `.glass-capsule` / `-hover` / `-track` | "tabs extract, the chip is the **≥4th consumer**, verified on disk" | **0 hits** — the material is INLINE in `.segmented-indicator` (`segmented-tabs.css:91`) | **PHANTOM** — produced ONLY by the tabs §6 AMENDMENT (which EXTRACTS it) |
| `--ease-cartoon-punch` / `--motion-weight` | "tabs §3a Band-0 mint, the chip CONSUMES" | **0 hits** | **PHANTOM** — booked by `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` (not yet authored as wave files; the §6 ledger books them) |
| `.paper-field` (`W-GLASS-FIELD`) | "the chip DEPENDS-ON it; chip routes mount it" | **0 hits** — `W-FIELD-ENGINE` is a GPU noise/flow chunk, NOT a `.paper-field` plenum | **PHANTOM + MIS-NAMED** |
| `--radius-control` (= `--radius-pill`) | "verified `radius.css:56`" | present (`radius.css:56`) | **REAL** ✓ |
| `.accent-tone` channels + `useAccentTone` | "verified" | present (`accent-tone.css`, `useAccentTone.ts`) | **REAL** ✓ |

**The GOLDEN's "≥4th consumer by construction / a UNION with the shipped ecosystem" is FALSE
today** — you cannot be the 4th consumer of a class with zero consumers. As written the chip
golden would have to INLINE the capsule (a fork) — exactly what its own spike does. **This is
the single load-bearing correction.**

**BUT — the GOLDEN aimed at the WRONG real primitive.** The union set ALREADY ships the
honest chip-glass axis the GOLDEN never read: **`--glass-fill-tint` / `--glass-fill-strength`
are MINTED at HEAD** (`tokens/glass.css:399`, BE WF-1, `@property` regs, `inherits:true`,
`initial-value:transparent`). `BD.W-TINTED-CHIP` wires the ladder CONSUME + mints
`<GlassChip :tone>`; `BD.W-ICONCHIP-GLASS` makes `<IconChip surface="glass">` the genuine 2nd
plate-fill consumer. **The colored-glass chip already has a home in the union — it is
`--glass-fill-tint`, not a phantom `.glass-capsule`.** The chip family's "glassy" cure is the
≥3rd consumer of `--glass-fill-tint` (the union the GOLDEN should have written), composed with
the tabs-amendment `.glass-capsule` lift for the lozenge rim/shadow.

---

## 3. THE BROKEN-IN-ITS-OWN-SPIKE MECHANISMS (challenge #2, FATAL, FOLDED)

The GOLDEN's centerpiece — "the chip that PUNCHES when you pick it" — is **dead-on-arrival
in `golden/spike.html`** by three compounding bugs, ALL of which the UNION path must avoid:

- **R1 (flood never fires).** `@property --chip-flood-t { inherits:false }` resolves to its
  `initial-value:0` on the `::after` pseudo (a separate box). `[data-state=on]{--chip-flood-t:1}`
  sets it on the ELEMENT; the `::after` reads `0` forever → `opacity:0` on the ON chip, Chrome
  AND Safari. **Fix: `inherits:true` OR drive `::after` opacity from `[data-state=on]::after`
  directly.** The §K gate must add a born-RED arm reading `::after` opacity > 0 on an ON chip.
- **R2 (flood occluded even when fixed).** The spike's `::after` is `z-index:-1` `plus-lighter`
  UNDER an OPAQUE `background-color` fill → `plus-lighter` is a no-op against the opaque layer
  in front. **Fix: the flood sits ABOVE the fill inside `isolation:isolate`; the fill is the
  translucent `--glass-bg-floating-tinted` (α<1) so the bloom reads** (the select-forms
  `inset:0` idiom the GOLDEN cites but contradicts).
- **R3 (the lens is opaque → backdrop is a visual no-op).** The spike body is opaque
  `background-color:var(--accent-fill)`, so `backdrop-filter` samples the field then paints the
  opaque fill ON TOP — the blur is invisible; nothing transmits. **Fix: the chip fill IS the
  `.glass-capsule` translucent `--glass-bg-floating-tinted` body, TINTED by `--glass-fill-tint`
  — not replaced by an opaque `color-mix`.** This is the SAME `--glass-fill-tint`-over-the-W55-
  composite seam `BD.W-TINTED-CHIP` ships — the chip is its consumer, the lens transmits.
- **R5 (the punch is sub-perceptual).** The spike's own `__runGate()` returns
  `minScale 0.9998 (preDip FALSE)`, `maxScale 1.0372 (overshoot FALSE, < 1.04)` — the `1+0.06·t·
  0.62` write is 3.7% travel; the −0.04/1.22 curve stops are PARSED, never RENDERED.
  **Fix (matching the tabs/select sibling amendments): raise the coefficient so the dip/overshoot
  clear the gate's OWN thresholds (≤0.996 dip / ≥1.04 overshoot at weight 1.0), AND move the
  primary punch READ to the COLOUR event (the fill flood + `::after` bloom), which is the
  perceptible leg — stop claiming a scale-overshoot the gate measures as absent.**

**The geometry chapter (§C) SURVIVES every challenge clean** — `--radius-control` is real, the
stadium clamp is correct, the born-RED grab-bag is honest. The MATERIAL + MOTION chapters were
re-grounded above.

---

## 4. THE SPIKE'S CHROMA FRAUD (challenges #1/#3, FOLDED)

§J/§D2 headline *"Spike-measured idle fill … C 0.050 ≥ 0.02 ✓"*. But (a) `spike.html`'s
`__runGate()` reads `getComputedStyle(el).backgroundColor` — the **TOKEN**, never composited
through `backdrop-filter` over a field — the EXACT parse-oklab-over-no-field move §K's own
fraud-fence forbids; and (b) the `oklab(0.902 …)` C=0.050 value is the **ACTIVE band**
(L=0.902), MISLABELED as idle; the true live idle is **C 0.034** (or, on the SHIPPED route over
the flat page with NO field, **C 0.014** — §1b). **STRIKE the `C 0.050 ✓`.** The warm-floor cure
is **gate-deferred to a REAL painted-pixel π over a REAL field**, both engines, both modes —
NEVER `getComputedStyle` over a hardcoded field (the recurring `feedback_live_pi_oklab_paint_arm`
fraud). The chip's glass-fill axis is `in oklab` (matching `--glass-fill-tint`'s seam) — the
hue must be floored too (H ∈ [45,85]) to catch the live greenish-cast (SelChip "Vue" H=97°).

---

## 5. SURVIVAL OF THE FITTEST — the triage

| element | verdict | why |
|---|---|---|
| `--radius-control` (= `--radius-pill` stadium) | **KEEP + ADOPT** | real `radius.css:56`; retires 4 ad-hoc radii in ONE rung |
| `.accent-tone` channels + strengths | **REFINE (idle+default-band floor only)** | real `accent-tone.css`; the tonal SPINE is fit; widen the floor (`max(strength, --chip-tint-floor)`) so idle AND default band clear 0.02 — channels otherwise byte-frozen |
| `useAccentTone` value.js safe-ink | **KEEP byte-untouched** | the contrast-safe ink is the fit a11y spine |
| reka `Toggle`/`ToggleGroup` semantics | **KEEP byte-untouched** | `aria-pressed`, roving tabindex, `data-state` — the contract |
| the §6 `--spring-smooth` hover/press lift | **KEEP** | ships TODAY on both CVAs; the fit lift register |
| `--glass-fill-tint` / `--glass-fill-strength` | **CONSUME (the REAL glass axis)** | minted at HEAD; the chip is the ≥3rd plate-fill consumer (after `<GlassChip>`, `<IconChip surface=glass>`) — the union the GOLDEN missed |
| `.glass-capsule` + `-hover` + `--glass-capsule-fill` | **DEPEND (tabs §6 amendment EXTRACTS it)** | the lozenge rim/shadow/lift; NOT shipped — produced by AUGMENTed `BD.W-TAB-IOS-CAPSULE` |
| `--ease-cartoon-punch` / `--motion-weight` | **DEPEND (booked motion waves)** | the punch curve + the PRM dial; NOT shipped — the same DEPEND tabs/buttons/select carry |
| the 0/4/6/10px geometry grab-bag | **RE-INVENT → ONE stadium** | the user's #1 complaint; collapse the 2 CVAs to ONE `chipVariants({size})` on `--radius-control` |
| the absent glass lens | **NET-NEW surface** (`.glass-chip` composing the above) | the user's "glassy" — but built ON the extant axes, zero fork |
| the calm color-snap flip | **NET-NEW motion** (the colour flood + bloom on the punch curve) | the user's "more rounded and glassy" implies the iOS selected-chip flood; built on the DEPENDed motion register |
| `.paper-field` dependency (§D3) | **EXCISE** | phantom + mis-named; the chip's "field behind" is the page-background wave's concern, a DEPEND on the chassis, NOT a chip primitive — the chip transmits whatever field the route mounts via its translucent lens |
| the `::after` `inherits:false` + `z-index:-1` + opaque fill | **RE-INVENT (de-fraud)** | dead-on-arrival; `inherits:true` + above-fill + translucent body |
| the §E4 opt-in `cartoon`-loud `::before` + §F2 group glide | **DEFER (follow-on)** | scope-creep on an unproven base (challenge #2 R7); the base ask is congruent+rounded+glassy+a WORKING flood; the glide is the tabs convergence, presets-in-consumers |
| forcing IconChip through `.accent-tone` `in oklab` | **RE-INVENT the GOLDEN's plan** | IconChip's plate is DELIBERATE `in srgb` (`icon-chip.css:72`, the brand-overlay fence AW.W26); routing it through `.accent-tone`'s oklab mix REGRESSES the recorded byte-target. IconChip adopts the `--glass-fill-tint` axis for its glass register (already its `BD.W-ICONCHIP-GLASS` plan) + the SHARED `--radius-control`/φ rungs — NOT the accent-tone fill |

---

## 6. THE UNION PATH — the deft integration (KISS, DRY, no legacy, no dual-path)

**ONE recipe (`.glass-chip`), ONE size axis (`chipVariants`), ONE motion register — built on
the REAL union axes, sequenced downstream of the amendments that ship them.**

### 6a. Geometry (RE-INVENT → one stadium) — `W-CHIP-CONGRUENT`
Collapse `selectableChipVariants` (`sm`/`md`/`lg`) + the `ToggleChip` `chip`/`cell` axis into
ONE `chipVariants({ size })`. Radius is **invariant** — every inline rung resolves
`--radius-control` (the stadium re-rounds at every height → true end-caps, retiring
`rounded-sm`/`-md`/`-lg`/`rounded-[0.625rem]→0px` in ONE rung). The **cell** is the ONE
documented exception → `--radius-card` (a 72px icon+label tile is a CARD, not a pill — a
DELIBERATE 2-silhouette family, named honestly per challenge #3 R5, NOT smuggled under "one
shape"). The padding/text vary on a √φ ladder (φ≈1.618); the three SFCs stay DISTINCT
(bool-toggle vs tonal-picker vs glyph-tile) but render the SAME register. Clean break, no alias.

### 6b. Material (NET-NEW `.glass-chip`, on the REAL axes) — `W-CHIP-GLASS-LENS`
`.glass-chip` ≙ `.glass-capsule` (DEPEND, the tabs-amendment lozenge: translucent
`--glass-bg-floating-tinted` body + rim + shadow + blur, warm-floored) × `.accent-tone`
(REFINE, the tonal channels) × `--glass-fill-tint` (CONSUME, the per-instance hue the
translucent body tints toward — the chip is the ≥3rd consumer of the HEAD axis). The fill is
the `.glass-capsule` **translucent** body (α<1, so `backdrop-filter` transmits — kills
challenge R3) tinted by `--glass-fill-tint`/`--accent-fill`; **never an opaque
`background-color`**. The idle warm-floor is a one-line `.accent-tone` widen
(`max(--accent-fill-strength, --chip-tint-floor)`) AND it must lift the default-tone BAND too
(§1b finding) — PLAIN per-mode `--chip-tint-floor` pair (12%/15%), NEVER `light-dark()`.

### 6c. Motion (NET-NEW flood, de-frauded) — `W-CHIP-FLOOD-PUNCH`
The state flip rides `--ease-cartoon-punch` × `--motion-weight` (DEPEND, the booked motion
register — the SAME the tabs/select/buttons amendments depend on; the chip never re-mints).
The ONE `scale` write folds hover/active/punch into a SINGLE source of truth (kills the
challenge #1.D scale-collision with the CVA's `hover:scale-*`). The `::after` colour bloom is
`@property --chip-flood-t { inherits:TRUE }` (kills R1) + sits ABOVE the translucent fill inside
`isolation:isolate` (kills R2) + the COLOUR event (fill `--accent-band` swap on plain
`data-state`, never tied to the scalar) is the perceptible primary read (kills R5; selection
survives a dead scalar on a pre-Baseline WebKit). PRM → `--motion-weight:0` zeroes the MOTION;
the colour cross-fade + static lift remain (challenge #3 R7: "zeroes the bloom's MOTION", not
the bloom).

### 6d. The toggle-group (DEFER the glide; KEEP congruence-by-inheritance) — folded into above
Every grouped chip IS a `.glass-chip` → congruent by inheritance, ZERO group-specific work for
the base. The `.glass-capsule-track` recessed well + `useTabIndicator` glide for `type=single`
is a follow-on (the tabs convergence) — NOT gated on the chip family ask.

**HELD/FROZEN (union law):** `.accent-tone` channels (refine the floor only); `useAccentTone`
ink; reka `Toggle`/`ToggleGroup`; `--radius-control`; `--glass-fill-tint` (consume, don't
re-mint); `.glass-capsule` (depend on tabs amendment); `--ease-cartoon-punch`/`--motion-weight`
(depend on motion waves). **No legacy, no alias, no fourth chip, no parallel glass fork, no
`.paper-field` re-mint.**

### 6e. The BUILD-ORDER PRECONDITION (the mandatory honesty, all 3 challenges)
The chip wave is **DOWNSTREAM-BLOCKED**: it CANNOT execute/GREEN until (1) `BD.W-TAB-IOS-CAPSULE`
(AUGMENTed) EXTRACTS `.glass-capsule`/`-hover` + the warm-floor + EXPOSES `--glass-capsule-fill`;
(2) `BD.W-TINTED-CHIP` wires the `--glass-fill-tint` ladder CONSUME; (3) the booked
`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` mint `--ease-cartoon-punch`/`--motion-weight`. Until
those land in `src/`, the chip gate's glass/punch arms ERROR (no-such-token), they do not
"fail" — so the born-RED SPLITS: RED-now on geometry/idle-gray (assertable against HEAD's real
grab-bag), DEFERRED on the capsule/flood arms (RED only once the upstreams land). A built-time
integration-fence asserts `glass-chip.css` references `.glass-capsule` + `--glass-fill-tint` and
declares ZERO of its own glass tokens (no inline `backdrop-filter`/fill/rim) — converting
"union not fork" from prose into a gate the build cannot fake.

---

## 7. THE GATE (born-RED — the painted-honest fraud fence, both engines, both modes)

`tests-visual/chip-family.spec.ts`, chromium + webkit, both modes, pinned to the REAL
`SelectableChip`/`ToggleChip`/`IconChip` DOM (a component-mount harness, NOT a route that can
Vite-fallback to a spike — challenge #3 R4).

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **C1 congruence** | every inline rung shares ONE computed `border-radius` (= `--radius-control`) + ONE pad ratio + ONE `.glass-capsule` fill token; cell = `--radius-card` | 0/4/6/10/9999 grab-bag (live) | one recipe |
| **C2 rounded** | every inline rung clamps to ≥ half-height (true end-cap); cell ≠ `0px` | the 4px chip + the 0px cell | `--radius-control` everywhere |
| **C3 GLASSY (painted)** | the chip lens SCREENSHOT-sampled over the REAL field reads OKLab **C ≥ 0.02 warm**, H ∈ [45,85], BOTH modes, BOTH idle AND default-tone active; a `.glass-chip` with NO field ancestor FAILS; `getComputedStyle`-over-hardcoded-field FAILS | idle C 0.014 + default band C 0.013 (live) | floor + lens transmit |
| **C3b backdrop** | computed `backdrop-filter` non-`none` AND composited body α<0.92 (transmits) | `none` everywhere (live) | translucent lens |
| **C3c no-fork fence** | `glass-chip.css` references `.glass-capsule` + `--glass-fill-tint`, declares ZERO own glass tokens (no inline `backdrop-filter`/`--glass-bg-*`/rim) | — | the union, not a fork |
| **C4 defined edge** | non-flat rim (`.glass-capsule` `--glass-rim-top` / ON `--accent-edge`) + non-`none` lift | flat rect (live) | the lens composites |
| **C5 weighty flip** | toggle-ON: a captured mid-transition frame shows ≥1.04× area overshoot + ≤0.996 pre-dip (the gate's OWN thresholds, which the spike FAILS today); a `--motion-weight:0` control shows zero | the color-snap | the punch coefficient is real |
| **C5b flood fires + trails** | the ON chip's `::after` opacity > 0 (kills challenge R1) AND peaks AFTER the spatial leg; a `z-index:-1`-under-opaque-fill flood FAILS (kills R2) | `::after` opacity 0 (the spike bug) | inherits:true + above-fill |
| **C6 idle/band floor** | the union idle AND default-band re-measure ≥3:1 over the lens | — | the floor holds, both states |
| **C7 PRM** | one static frame at rest, no overshoot/bloom MOTION, colour + lens-lift present | — | `--motion-weight:0` carves cleanly |

**Detector self-test bites (each MUST red):** a 0/4/6/10px radius surviving; the cell at `0px`;
`getComputedStyle`-over-hardcoded-field passing a gray chip; a chip with no field ancestor; a
`backdrop-filter:none`; an OPAQUE body (α≥0.92); a `glass-chip.css` declaring its own
`--glass-bg-*`/`backdrop-filter` (the fork); a `::after` reading `--chip-flood-t:0`
(inherits:false); a flood at `z-index:-1` under opaque fill; a `--motion-weight:0` killing
selection legibility; a default-tone band still gray; a `light-dark()` `--chip-tint-floor`; an
IconChip plate forced off its `in srgb` brand mix.

> **The born-RED truth, stated honestly:** TODAY the chips composite gray at idle (C 0.014)
> AND default-tone active (C 0.013), the geometry is a 0/4/6/10/pill grab-bag, `backdrop:none`
> everywhere. The gate is RED-now on C1/C2/C3/C3b/C4 (the real flat condition) and DEFERRED on
> C5/C5b/C3c until the upstream capsule + motion register land. It goes GREEN only when the
> stadium + the `--glass-fill-tint` lens + the warm-floor + the de-frauded punch land TOGETHER.
