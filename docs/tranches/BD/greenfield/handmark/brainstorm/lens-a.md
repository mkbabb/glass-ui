# Greenfield — HANDMARK facility (lens-a · pure iOS-27 fidelity)

**Route judged live:** `/motion/handmark`, both modes, real Chrome (`:5173`), 2026-06-24.
**Verdict the live read produced:** the facility is REAL, KISS-sound, NOT over-built — KEEP the architecture. ONE register is BROKEN-on-the-merits (`boil`, the masthead voice — a shallow constant-width squiggle), ONE thing is starved (the demo + the paper-field it sits on), and ONE whole capability is design-orphaned (the ℱ-redraw + completion-seal cousins live OUTSIDE the family that should own them). This lens RE-INVENTS the `boil` register, REFINES the field it paints over, and UNIONS the three estranged ink events under one engine. **Survival of the fittest: the Brush continuum survives intact; the `boil` morphology does not.**

---

## 1. WHAT IT ACTUALLY IS (mapped from source, live-verified)

The handmark facility is a **generalized hand-mark renderer** — NOT a signature pad, NOT a freehand-capture surface. It lays a deterministic, seeded, aria-hidden SVG mark (`underline` · `strikethrough` · `highlight` · `box` · `bracket` · `circle` · arbitrary `path`) over/under/behind REAL selectable text, in any of seven mediums.

The architecture (verified, all symbols exist):

- **`brush.ts`** — a flat 12-scalar + 4-enum `Brush` DATA model + `lerpBrush` continuum + `resolveBrush`. `pen`·`boil`·`pencil`·`crayon`·`marker`·`ring`·`highlighter` are POINTS in one space, not classes. **This is excellent. KEEP byte-for-byte.**
- **`geometry.ts`** — `shapeGeom(shape, opts, box, baselineFrac, natural)` maps semantic shape → pencil-boil centerlines (`wobbleLinePoints`, `ellipsePoints`). `naturalUnderlinePoints` (`geometry.ts:68`) is the `boil` register — **this is the broken function.**
- **`ink.ts`** — `ink()` renders centerline + Brush → SVG fragment, gated by FIELDS (`ribbon:'stroke'|'hull'`), never instrument name. The `hull` arm ALREADY routes through the vendored perfect-freehand `getStroke` + a seeded `addPressure` swell (`ink.ts:47`) — **the variable-width pressure engine the `boil` fix needs already ships, consumed by the highlighter.**
- **`texture.ts`** — one static seeded `feTurbulence` grain filter; `grain<=0 && grainScale<=0 ⇒ '' ⇒ no filter` (pen-is-free). KEEP.
- **`freehand.ts`** — vendored perfect-freehand `getStroke`/`getStrokeOutlinePoints`/`getSvgPathFromStroke` (MIT, treeshaken unless `ribbon:'hull'`). The TRUE variable-width hull. KEEP.
- **`useHandMark.ts`** — headless reactive core; `useLineBoil` frame-cycle clock (lazy, PRM-early-returns, NOOP stub when not boiling). KEEP.
- **`HandMark.vue`** — measures the real text baseline (`Range` + `ResizeObserver` + `document.fonts.ready`), mounts the namespaced filter, draws-on (`stroke-dashoffset` clean | `clip-path` wipe grained). KEEP.

**The estranged cousins (live-verified, both real):**
- **`FRedrawOverlay.vue`** (`demo/eggs/`) — a full-screen Canvas2D egg that reconstructs the ℱ glyph as a Fourier epicycle chain via the SHIPPED `dftFromPoints` + `positionsAt` (fourier-field/math.ts), then fades. Fired by a long-press/dbl-click on the sidebar ℱ wordmark (`SidebarDock.vue` → `glass-ui-demo:f-redraw` → `AppShell.vue`).
- **`CompletionSeal.vue`** (`src/components/custom/completion-seal/`) — a gold `stroke-dashoffset` draw-on of a `check`/`ring`/`wordmark` glyph. **Self-described in its own constants as "distinct from the HandMark hand-voice family."** That self-imposed wall is the design defect this lens removes.

**Live measurements that ground the verdict** (boil mark "future", viewBox 0..100×0..40):
- bbox `h=2.2` units (5.4% of the 40-unit box) — **a near-flat line.**
- `stroke-width: 5px, fill: none` — **constant-width thin stroke, NO hull, NO pressure.**
- y-series over 120 samples: `spacingCV=0.327`, `amplitudeCV=0.762` (the jitter+harmonic sum DOES add some irregularity — the audit overstated "CV≈0") — BUT `yRange=2.16`, `meanAbsDispl=0.52` units. **The real defect is not spacing regularity; it is SHALLOW AMPLITUDE + ZERO WIDTH VARIATION.** It reads as a faint mechanical squiggle because there is almost nothing there. Dark mode: ink flips `currentColor` → warm cream `rgb(233,230,226)` (NOT gray — warm floor holds); highlighter holds gold `#ffd84a` + `multiply`. The cards are opaque `bg-card` — **the paper grain the page advertises is OCCLUDED; the marks float on a flat plate.**

---

## 2. THE LENS — "ink is a physical event, and the family owns every one of them"

The iOS-27 register is not skeuomorphic hand-drawing for its own sake — it is **liquid weight applied to ink**: an ink stroke has anticipation (the nib lands), follow-through (the run-out tail), pressure (thick-where-you-press), and it lays down over TIME with a real draw-on. The greenfield thesis: **the handmark family is the library's INK ENGINE, and three ink events — the hand mark, the gold completion seal, and the ℱ Fourier redraw — are ONE family with ONE draw-on clock, ONE seed leaf, ONE warm-ink palette, and ONE PRM carve.** Today they are three forks. The lens unifies them and fixes the one register that is genuinely a fake.

Five moves, ordered by load.

### Move 1 (THE FIX — re-invent `boil`): the WEIGHTED hand-ink line via the pf hull that already ships

`boil` is billed as the masthead voice and is the weakest mark. The cause is not the centerline math alone — it is that `boil` is `ribbon:'stroke'` (a constant 5px thin line) while every convincing mark (`highlighter` hull, `crayon`/`marker`/`pencil` grain) carries WIDTH or TEXTURE. Re-author `boil` as the family's flagship **weighted ink line**:

- **Flip `boil` to `ribbon:'hull'`** (one field in `brush.ts`). It now routes through the EXISTING `ink.ts` hull arm → `addPressure` → `getStroke` → a TRUE variable-width fill. The pf body already ships with the highlighter, so this drags ZERO new bytes. `thinning ≈ 0.55`, `weight ≈ 7`, a non-zero `taper` (`start:14, end:20, ease:'out-cubic'` — the lazy run-out tail). The line is now thick-and-thin, tapered, a real pen line — not a hairline.
- **Re-author `naturalUnderlinePoints` (`geometry.ts:68`) to a 1-D fractal value-noise displacement** with INCOMMENSURATE frequencies + per-octave seeded phase — the standard non-periodic "natural line" recipe — `Σ aᵢ·noise(t·fᵢ + φᵢ)`, `fᵢ ∈ {1.0, 1.7, 2.9}` (mutually irrational ratios so no period repeats), amplitudes decaying per octave, all off the HOUSE `mulberry32` (`utils/prng`). RAISE the amplitude (`NATURAL_AMP_FRAC ≈ 0.045`, ~2× — the line must be VISIBLE) and DROP the symmetric `sin(π·t)` envelope floor (replace with per-waypoint seeded amplitude + endpoint-anchor only, so the ends still taper to baseline and a draw-on does not pop). Result: irregular spacing AND irregular amplitude AND real width — three independent irregularities, the mechanical-squiggle gestalt gone.
- **Couple the pf pressure profile to the centerline curvature** (the physical truth: a hand presses HARDER on the straights, LIGHTER through a tight wobble). Feed `addPressure` a curvature-derived swell instead of the current pure `sin(π·t)` — high curvature → low pressure → thin; straight → high pressure → thick. This is the single move that turns "a wiggly line" into "a pen line", and it composes the pressure machinery that already exists.
- **Determinism + seed reconcile PRESERVED** (house `mulberry32`, two seeds distinct, one reproduces, ZERO pencil-boil `mulberry32` import). FILTER-FREE (wobble+pressure in control points + hull width, never a `feTurbulence`).
- **FENCE:** this touches ONLY `naturalUnderlinePoints`'s body + the `boil` brush row's `ribbon`/`taper`/`weight`/`thinning` fields. `brush.ts`'s OTHER six rows, `ink.ts`, `texture.ts`, `lerpBrush`, the highlighter's five deltas, the `natural=false` `wobbleLinePoints` default underline — byte-untouched. **This is a re-author, not a rebuild.** Reconciles with `BD.W-HANDMARK-AUDIT` §1/A1–A3 (which already specs the irregular-line + pressure target) — this lens SHARPENS its mechanism (the real fix is `ribbon:'hull'` + raised amplitude + curvature-coupled pressure, not just spacing-CV) and is its design twin, NOT a dup.

### Move 2 (THE WEIGHT — draw-on with anticipation + follow-through): the §L4 cartoon ink-lay

The draw-on today is a linear `cubic-bezier(.16,1,.3,1)` dashoffset sweep — clean but inert; it has no nib-land and no run-out. Elevate it to the §L4 Cartoon register the design.md edicts mandate (universal liquid weight):

- **Anticipation** — the nib "lands": a tiny ~60ms scale-down dip on the mark's start cap before the sweep (the `--ease-cartoon-punch` anticipation leg the design.md §Easing register names). NOTE: `--ease-cartoon-punch` and `--motion-weight` are design.md-SPECCED but NOT YET MINTED in `src/styles/` (verified — only `--spring-bouncy`/`--spring-snappy`/`--ease-standard` are minted). This lens COMPOSES them if present and DECLARES minting them a dependency edge (folds to the §L4 cartoon-register wave; the handmark does not mint a private clock).
- **Follow-through** — the run-out: the sweep DECELERATES into the last ~15% and the tail taper (Move 1's `taper.end`) means the ink physically thins as it stops — a real pen lift-off, not a hard end.
- **Velocity-coupled weight** — `--motion-weight` (design.md §L4, rest `1/φ≈0.62`) scales the anticipation depth + overshoot share so a fast replay morphs MORE (the "morph more on move" law). PRM → `--motion-weight:0` → instant static finished mark (the existing carve, unchanged).
- This is a DRIVER motion (the user's `play()` / appear caused it) → it earns the bounce. Mechanism: `transform`/`clip-path` only (compositor-safe), no animated `box-shadow`, no per-frame filter re-raster (the Δ4 gate held).

### Move 3 (THE FIELD — §3 colorful field behind glass): the paper morphism the marks deserve

The live read: opaque `bg-card` occludes the paper grain; the marks float on a flat plate. The iOS-27 edict is a COLORFUL FIELD behind glass + a defined edge + visible paper. Refine the DEMO surface (not the primitive):

- Replace the opaque `bg-card` plate with a **translucent glass card over a visible warm paper-grain field** (`paper-grain-overlay` at a PERCEPTIBLE opacity — bump `--paper-grain-opacity` locally above the sub-perceptual `0.025` floor the audit flagged), so the hand marks read as ink ON PAPER, both modes, never gray (the BA.W-NO-GRAY warm floor). The marks gain their hand character from the gritty field beneath them.
- A faint living warm tint behind the glass (compose the existing field, not a new engine) gives the §3 "colorful field behind glass" — the marks sit on a surface with life, not a dead rectangle.
- This is a DEMO-CHASSIS refinement (folds with `BD.W-HANDMARK-AUDIT` §4 + the W-PAPER-MORPHISM arm) — the PRIMITIVE is field-agnostic by design (it renders over whatever it is slotted into).

### Move 4 (THE BOLDEST MOVE — union the three ink events under one InkEvent engine)

**This is the single audacious move.** Today: `HandMark` (hand voice), `CompletionSeal` (gold draw-on — self-walled "distinct from the hand-voice family"), `FRedrawOverlay` (Fourier epicycle ink). Three forks, three draw-on clocks, three palettes. They are the SAME thing: **a stroke that inks itself onto the page over time.** Union them:

- **`CompletionSeal` becomes a HandMark `path` shape with `brush:'pen'` (or a `seal` gold preset row) + `animation:'draw-on'`.** Its `check`/`ring`/`wordmark` glyphs are already SVG `d`-strings / a circle — exactly the `path`/`circle` shapes HandMark already renders. The gold ink is `color="var(--seal-ink)"`. The `stroke-dashoffset` draw-on is LITERALLY HandMark's clean-ink draw-on. **CompletionSeal collapses from a parallel SFC + composable + constants into a thin `<HandMark>` preset wrapper** (keep the `role="status"`/`aria-live` announcement shell — that a11y semantic is the ONE thing the seal adds; the ink mechanism is HandMark's). No second draw-on clock, no second palette.
- **The ℱ-redraw becomes the family's `fourier` brush — a STAMP (`brush.ts` SPEC §5 escape hatch, which already exists as an optional `stamp?` field).** Instead of a Canvas2D egg outside the library, the Fourier epicycle reconstruction is a `StampFn` that takes the centerline (the ℱ outline points), runs `dftFromPoints` → `positionsAt`, and emits the epicycle-traced `d` over the draw-on clock. The ℱ-redraw becomes `<HandMark brush="fourier" :path="fGlyph" animation="draw-on">` — the SAME engine, the SAME warm ink, the SAME PRM carve. The egg's wiring (`SidebarDock` long-press → event → overlay) stays; the OVERLAY's hand-rolled Canvas2D draw loop is replaced by the family's stamp + draw-on. **The logo is named for the transform; now the INK ENGINE literally does it.**
- **One seed leaf, one warm-ink palette, one draw-on clock, one PRM carve across all three.** This is the union the BINDING LAW demands: a UNION, never a bolt-on. It DELETES two forks worth of draw-on/palette/clock duplication and makes the family coherent.
- **FENCE:** the `stamp` field + the `path`/`circle` shapes + the draw-on clock ALL already exist — this is composition, not new machinery. CompletionSeal's `role="status"` shell is preserved (the a11y contract is load-bearing). Reconciles with `BD.W-FOURIER-INTERACT` (the fourier-field interaction wave) — the ℱ-redraw-as-stamp is the handmark consumer of fourier-field's `dftFromPoints`/`positionsAt`, not a re-implementation.

### Move 5 (THE BREADTH — demo + π the family at full span)

Per `BD.W-HANDMARK-AUDIT` §2/A5–A6: demo all 7 shapes × 4 animations (the `boil`-continuous living-line clock + `draw-then-boil` are INVISIBLE today). ADD the three unioned ink events as a demonstrated trio (hand mark · gold seal · ℱ-redraw) so the "one ink engine" thesis is VISIBLE on the page. The π reads PAINTED PIXELS (the cardinal-lesson split): the boil mark's rendered hull width-profile + amplitude (not a stop-string), the living-line multi-frame morph, the seal+ℱ draw-on over time, both modes, over the now-visible paper field.

---

## 3. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **No `backdrop-filter:url()`, no per-frame filter re-raster.** The grain `feTurbulence` is STATIC + seeded (rasters once); the draw-on is `clip-path`/`dashoffset` (compositor). The pf hull is plain geometry (a filled `<path>`) — engine-identical. The Fourier stamp emits a static `d` per frame from `positionsAt` (pure math, no filter). **Safari-safe by construction** — the family already has zero backdrop-filter dependency.
- **sRGB color-interp** on the grain filter is already declared (`color-interpolation-filters="sRGB"`, texture.ts:46). KEEP.
- **PRM:** every draw-on collapses to the finished static mark (`@media (prefers-reduced-motion: reduce)` in HandMark.vue, unchanged); `useLineBoil.start()` early-returns; the Fourier stamp paints the COMPLETED ℱ once (the existing `FRedrawOverlay` reduce arm, inherited). `--motion-weight:0` zeroes the Move-2 anticipation/overshoot.
- **`prefers-reduced-transparency`** → the paper-field tint floors out, the warm ink stays opaque (it is a legibility asset, not a transmissive layer). **Warm floor / NO GRAY** verified live in both modes (`rgb(233,230,226)`, not `#888`).
- **The mark is aria-hidden; the word stays real selectable text.** The seal keeps its `role="status"`/`aria-live` announcement. a11y contract preserved.

## 4. PROPORTION (Aristotelian golden)

- `boil` `taper.end:taper.start ≈ 20:14 ≈ √φ` (the run-out is longer than the lead by the type-ladder ratio). `NATURAL_AMP_FRAC ≈ 0.045` derives from the φ family, not a round decimal. The draw-on `--motion-weight` rests at `1/φ≈0.62` (design.md §L4). The seal/ℱ glyph scale steps by √φ from the body underline.

## 5. WHAT SURVIVES, WHAT DIES (survival of the fittest)

| Verdict | Artefact |
|---|---|
| **KEEP byte-for-byte** | `brush.ts` continuum (minus the `boil` row's 4 fields), `lerpBrush`, `ink.ts`, `texture.ts`, `freehand.ts`, `useHandMark.ts`, `HandMark.vue`, the 6 non-boil brushes, the `natural=false` default underline, the seed reconcile, the highlighter 5 deltas |
| **RE-INVENT (broken)** | `naturalUnderlinePoints` body + the `boil` brush row → weighted irregular pf-hull ink line (Move 1) |
| **REFINE (weak)** | the draw-on → §L4 cartoon ink-lay (Move 2); the demo paper field → visible §3 colorful-field-behind-glass (Move 3); the demo breadth → 7×4 + the ink-trio (Move 5) |
| **UNION (forked)** | `CompletionSeal` → HandMark gold-`path` preset; `FRedrawOverlay` → HandMark `fourier` stamp (Move 4) |

**No legacy, no alias, no migration shim** — the `boil` re-tune is a clean break; the cousins fold into the family (their old SFCs are deleted, not deprecated).

---

## Reconciliation vs the 116 union waves (no dup)

- **`BD.W-HANDMARK-AUDIT`** — this lens is its DESIGN twin + a sharpened mechanism: the audit specs "irregular spacing + amplitude + pressure"; this lens proves (live) the load-bearing fix is `ribbon:'hull'` + RAISED amplitude + curvature-coupled pressure (not spacing-CV alone), adds the §L4 draw-on weight, the §3 paper field, and the Move-4 union. The audit's gate (`proof:handmark-audit` A1–A7) + π are ADOPTED; this lens supplies the mechanism + the union scope. NOT a dup — an amendment.
- **`BD.W-FOURIER-INTERACT`** — the ℱ-redraw-as-`fourier`-stamp is the handmark CONSUMER of that wave's `dftFromPoints`/`positionsAt`, not a re-fork. The union edge folds here.
- **The DELTA-ASSAY amendment:** ONE wave-amendment — `BD.W-HANDMARK-AUDIT` gains a §Move-4 INK-EVENT-UNION clause (CompletionSeal + ℱ-redraw fold under HandMark) + a §Move-1-mechanism sharpening (`ribbon:'hull'` + amplitude + curvature-pressure) + a §Move-2 §L4-draw-on clause. No new top-level wave; the union is absorbed into the existing audit wave's scope.
