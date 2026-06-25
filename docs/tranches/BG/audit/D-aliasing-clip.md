# BG audit — D: the red-cast halo + corner-clip aliasing (the cartoon-ink / paint-box discipline)

Audit of three rendering defects shipped in 4.2.0: (1) the RED/maroon shadow-cast
halo bleeding around docks, (2) un-clipping card corners (rectangular aliasing at the
top), (3) the strange aliasing in the dock's bottom-left corner. All three are
ROOT-CAUSED to TWO mechanisms — a mis-gamut'd cartoon-ink token, and the absence of a
single paint-box clip discipline on the rounded glass surfaces. Verified live against
HEAD on `localhost:5173` (Chromium, both modes) plus the source.

---

## FINDINGS (true at HEAD, file:line evidence)

### F1 — `--cartoon-ink` resolves to a SATURATED RED/MAROON in BOTH modes (the halo source)

`src/styles/tokens/shadow.css:107`:
```css
--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h);
```
`--foreground` is `hsl(24 10% 10%)` light / `hsl(30 14% 90%)` dark
(`tokens/color-radius.css:58`, `tokens/dark-arm.css:70`). Live-resolved via a paint
probe (`getComputedStyle(probe).color`):

| mode  | `--foreground` oklch | `--cartoon-ink` oklch (after clamp+floor) | sRGB it clips to |
|-------|----------------------|-------------------------------------------|------------------|
| light | L0.216 **C0.0062** H56° | `oklch(0.18 0.11 56°)` | **`rgb(49, 0, 0)`** — deep red |
| dark  | L0.925 **C0.0062** H67.7° | `oklch(0.20 0.11 67°)` | dark red-brown / maroon |

The disease is `max(c, 0.11)`: `--foreground` carries a near-neutral warm chroma
**0.0062**, and the floor amplifies it **~18×** to 0.11. At the deep lightness
`clamp(0.14, l, 0.18)`, the warm hue (oklch 56°/67°) **cannot carry C0.11 inside the
sRGB gamut** — the engine gamut-clips G and B to 0, leaving a pure dark RED. The intent
("TECHNICOLOR, not merely-non-gray", `shadow.css:99`) over-shot a calm cartoon stamp
into a saturated maroon cel-ink. The `prefers-contrast`/`prefers-reduced-transparency`
arms (`shadow.css:213-225`) push it *even further* (lead 32%→42%). The
`@supports not (oklch from …)` fallback `#4a3320` (`shadow.css:113`) is a tasteful warm
brown — i.e. the *fallback* is correct and the *primary* path is the bug.

This ink feeds EVERY cartoon stamp: `--shadow-cartoon-{sm,md,lg}`
(`shadow.css:120-131`), `--shadow-cartoon`/`-hover` (`:14-15`), `--shadow-modal`
(`:18-20`). Blast radius (every consumer paints the red): the dock cast
(`dock/shape.css:224,239`), the Card cartoon surface (`cards.css:296,328,365`), the
configurator capsule (`configurator.css:252`), the Select capsule (`select.css:134`).

### F2 — the dock mounts an INERT red-cast child that bleeds past the rounded corner

`GlassDock.vue:606` always renders `<span class="cartoon-cast" aria-hidden="true">`
inside `.glass-dock`. `dock/shape.css:217-235` styles it `inset:0`,
`border-radius: inherit`, `z-index:-1`, `box-shadow: var(--shadow-cartoon-md)` (the
red ink, offset DOWN-LEFT `-3/-5/-7px`). Live readback of both demo docks:

```
.demo-sidebar-dock  : contain=content  overflow=visible/visible  radius=9999px  cast.boxShadow=oklab(0.18 .06 .09 /.32) -3px 3px …  (RED)
.demo-bottom-dock   : contain=content  overflow=visible/visible  radius=9999px  cast=same RED
```

The corner-aliasing mechanism (defect #3): the dock root has `contain: layout style
paint` (`dock/shell.css:113`, resolving to `contain: content`), which clips painting
to the **rectangular border-box** — but the dock radius is a **9999px pill**. The
red cast paints up to the rectangle; between the pill curve and the rectangle corner
the red fills the gap → a **hard pinkish-red wedge in the bottom-left** (and a faint
halo all round). Captured: `bottomdock-corner.png` shows the pink-red bleed strongest
bottom-left, with a visible hard corner edge. `dock-sidebar-bg.png` shows the entire
sidebar dock interior washed pink-red.

The cast is also a CONTRADICTION-in-place: `contain: paint` clips it to the box, so the
"bold offset stamp the plate floats above" (`shape.css:223`) can only ever paint
*inside* the dock, never as an external sticker shadow — its whole design premise is
defeated by the containment it lives inside, leaving only the corner-gap red wedge as
the visible artifact. (The light-DOM-child-not-pseudo gymnastics in `shape.css:208-216`
exist solely because the dock's `::before`/`::after` are occupied — a contrivance for a
cast that cannot escape its own clip box.)

### F3 — the Card glass surfaces carry NO clip discipline (the un-clipping corners)

Live readback of `[data-slot="card"]` (all rungs) on `/display/card`:
```
overflow=visible/visible   clip-path=none   isolation=auto   contain=none
border-radius=16px   backdrop-filter=blur(1–20px) saturate(…)
```
The Card composes `glass-${tier}` (`Card.vue:356` → `glass-wash`…`glass-overlay`), and
those five LADDER rungs (`glass/ladder.css:41`, `surfaces.css`) declare a `background`,
a `backdrop-filter`, a `box-shadow` rim, and the `::before`/`::after` pseudos — **but no
`overflow`, no `isolation`, no `contain`**. The architectural inconsistency: the
dedicated `.glass-card` atom (`glass/surfaces.css:34`) AND `.glass-btn`
(`surfaces.css:79`) DO carry `contain: paint` — but the actual `<Card>` never composes
`.glass-card`; it composes the ladder rungs, which lack it. So the very surface the
user sees most has the clip discipline that buttons get, *missing*.

Consequence: `backdrop-filter` rasterizes the blurred backdrop to the **border-box
rectangle**, while the visual boundary is a 16px radius. With nothing clipping the
filtered region (or any full-bleed child / the grain `::after` raster) to the rounded
boundary, the top corners alias as rectangular fringes. The card's own `background`/
`box-shadow`/pseudos happen to be radius-clipped *individually* (each carries
`border-radius`), which is why it's subtle — but the moment a child paints to a corner
(a scroll-shrink header backplate, a full-bleed image, a nested glass surface) the
square edge shows. The fix the rest of the system already uses (paint containment +
a clip) is simply absent here.

### F4 — the existing contract gates do NOT catch any of this

`proof:shadow-contract` (`scripts/proof-shadow-contract.mjs`) asserts the
cartoon-shadow CHAIN-INTACT / OVERRIDE-RESOLVES / DARK-ARM-ALLOWED — it verifies the
token *plumbs*, never that the resolved ink is **in-gamut / not-red**. `proof:dock-clip-reveal`
+ `proof:glass-cohesion` assert the morph aperture + the glass-vs-opaque cohesion —
neither asserts a rounded glass surface clips its paint box to its radius. The defects
shipped green because no gate reads the COMPOSITED color or the corner geometry.

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — a chroma FLOOR on a near-neutral warm hue at deep L is a gamut bomb
`max(c, 0.11)` treats chroma as freely dial-able, but oklch chroma is **gamut-bound by
L and H**. At L≈0.18, the warm hue (56°) tops out far below C0.11 in sRGB, so the floor
guarantees an out-of-gamut point that clips to saturated red. A cartoon CEL-INK should
be a deep warm BROWN (the `#4a3320` fallback IS the target), not a technicolor red.
The "no-gray" lesson was mis-applied: the cure for gray is a *modest* warm chroma the
gamut can hold (≈0.02–0.04 at that L), not a 0.11 floor.

### RC2 — a `box-shadow` cast inside a `contain: paint` rounded box is self-defeating
An offset cartoon shadow's entire purpose is to paint OUTSIDE the element. Putting it on
an `inset:0` child of a paint-contained, pill-radius box means it can only ever fill the
rectangle-minus-radius corner gap — producing aliasing, never a sticker shadow. The
mechanism is structurally wrong, not mis-tuned. A dock's elevation is already carried by
`--shadow-dock` (`shadow.css:71`, an omni glow that paints from the dock's OWN box, not a
child) — the cartoon cast is redundant chrome that only adds the artifact.

### RC3 — the glass system has TWO clip dialects, applied inconsistently
`.glass-card`/`.glass-btn`/`.glass-dock` carry `contain: paint`; the five ladder rungs
(`.glass-wash`…`.glass-overlay`) the real `<Card>` composes carry nothing. A glass
surface is DEFINED by `backdrop-filter` + `border-radius`; that pairing ALWAYS needs the
filtered region and descendants clipped to the radius. The discipline must live ONCE,
on the material, not be sprinkled on three of the consumers and forgotten on the rung
ladder everyone actually uses.

---

## PROPOSED WAVES

### BG.W-CARTOON-INK-GAMUT — re-tune the cel-ink to an in-gamut warm brown
- **Intent:** the cartoon stamp reads as a tasteful deep warm-brown offset shadow in
  both modes, never a red/maroon halo.
- **Approach (idiomatic, token-first):** Replace the gamut-bomb floor with a
  gamut-SAFE warm-brown derivation. Keep `oklch(from var(--foreground) …)` (the
  re-point-once symmetry) but floor chroma to a value the L/H can hold —
  `clamp(0.018, c, 0.045)` rather than `max(c, 0.11)` — and let `--foreground`'s warm
  hue carry it. Equivalently/more robustly: mix `--foreground` toward the existing
  `#4a3320` warm-brown anchor at a fixed strength so the ink is the brown the
  `@supports` fallback already targets (collapse the primary and fallback onto ONE warm
  brown). Verify the resolved sRGB is brown (R>G>B, not R≫G≈B≈0) — i.e. a `getComputedStyle`
  paint-probe asserts the ink is NOT gamut-clipped to red. The `prefers-contrast` /
  `prefers-reduced-transparency` arms deepen the SAME brown (lift alpha, not chroma).
- **Files:** `src/styles/tokens/shadow.css` (the `--cartoon-ink` recipe + the three
  α-rungs + the a11y arms); `tokens/dark-arm.css` (the dark `--shadow-cartoon*` arm if
  it re-derives). No consumer edits — every `--shadow-cartoon-*` reader re-resolves.
- **π / acceptance:** a live `getComputedStyle` paint-probe resolves `--cartoon-ink` to
  a brown (channel order R>G>B, B>0, ΔE from `#4a3320` small) in BOTH modes; the Card
  cartoon surface + Select/Configurator capsules read warm-brown stamps, no red, both
  modes. Extend `proof:shadow-contract` with an IN-GAMUT-WARM-BROWN arm (parse the
  resolved ink, assert not-red, not-gray) — the gate that would have caught it.
- **Folds:** the chronic "no-gray over-correction → technicolor" class (the cure must
  respect gamut bounds, recorded for future ink derivations).

### BG.W-DOCK-CAST-RETIRE — delete the dock cartoon cast (clean break)
- **Intent:** remove the self-defeating red-cast child + its corner-gap aliasing; the
  dock's elevation reads from its own `--shadow-dock` glow.
- **Approach (KISS, no-legacy):** DELETE the `<span class="cartoon-cast">`
  (`GlassDock.vue:606`) and its CSS block (`dock/shape.css:208-249`). The dock keeps its
  `--shadow-dock`/`--shadow-dock-collapsed`/`--shadow-dock-wrap` elevation (omni glow
  from the dock's own box, `shell.css:155` / `morph.css:262,386`) — which paints
  correctly past the radius because it is on the dock box itself, not a contained child.
  No alias, no migration. This also removes the contrivance of a "child-not-pseudo
  because the pseudos are occupied" cast that could never escape its clip box.
- **Files:** `src/components/custom/dock/GlassDock.vue`, `src/styles/dock/shape.css`
  (the cast block + the `[data-punching] > .cartoon-cast` deepen + the PRM arm).
- **π / acceptance:** the bottom-left dock corner shows NO red wedge and NO hard
  rectangular fringe (a corner-region pixel sample matches the surrounding backdrop, not
  a saturated hue), both docks, both modes; the dock still reads as a lifted plate
  (the `--shadow-dock` glow). `proof:dock-clip-reveal` stays green (morph unaffected).
- **Folds:** removes one of the 33-file dock dir's incidental complexity nodes (the
  cast-channel coupling in `shape.css` punch logic).

### BG.W-GLASS-CLIP-DISCIPLINE — ONE paint-box clip on the glass material
- **Intent:** every rounded `backdrop-filter` glass surface clips its filtered region +
  descendants to its own radius — card corners (and every glass rung) stop aliasing.
- **Approach (gestalt, DRY — the discipline lives ONCE on the material):** Add
  `overflow: clip` (paint-only, never a scroll box; the cross-axis caveat is moot since
  both axes clip) + `isolation: isolate` to the five ladder rungs at their single source
  (`glass/ladder.css` `.glass-wash`…`.glass-overlay`) — OR, cleaner, fold the clip into
  the shared `.glass-material` selector group (`glass/material.css:36`) so it reaches the
  rungs + `.glass-card` + the dock controls in ONE place. `isolation: isolate` mints the
  stacking context the specular/grain pseudos already assume and confines the
  `plus-lighter`/`multiply`/`screen` blends to the surface (no page-backdrop leak).
  Reconcile with the existing `contain: paint` on `.glass-card`/`.glass-btn`/`.glass-dock`
  — collapse those onto the ONE material clip so the system has ONE clip dialect, not
  two. EXEMPT the surfaces that legitimately overflow (the dock morph aperture already
  manages its own `overflow: clip`/`visible` on the morph axis — `shell.css:179-208`;
  the glass-capsule / liquid-morph host that needs an un-filtered layer —
  `liquid-morph.css:585`) via the existing named-exemption pattern.
- **Files:** `src/styles/glass/material.css` (the material group — the single home) or
  `glass/ladder.css` (the five rungs); reconcile `glass/surfaces.css:34,79`
  (`.glass-card`/`.glass-btn` already-clipped) + `dock/shell.css:113` onto it. Card.vue
  needs no edit (the clip is on the composed rung).
- **π / acceptance:** every `[data-slot="card"]` resolves `overflow: clip` +
  `isolation: isolate`; a top-corner pixel sample of a glass card over a busy backdrop
  shows a clean rounded edge (no rectangular fringe), both modes; a full-bleed child of a
  card is clipped to the radius (a synthetic over-corner child does not paint past the
  16px arc). New gate `proof:glass-clip` (or extend `proof:glass-cohesion`): the ladder
  rungs carry the clip + isolation; the named exemptions are enumerated with rationale.
- **Folds:** unifies the two clip dialects (RC3) into ONE material discipline — the
  KISS/DRY mandate; closes the "glass surface that defines itself by backdrop-filter +
  radius but never clips them" class for every future rung/consumer.

---

## Cross-references for the orchestrator
- The metallic-brown wash visible *behind* the docks/cards in every capture is
  `paper.css` `.paper-field` — out of scope here (CONTEXT defect #2 / the warm-field
  audit), but it COMPOUNDS the perceived red (the pink-red cast composites over a brown
  metallic sheen). The clip+ink fixes here make the cast read clean; the field is a
  separate wave.
- `--glass-key` (the upper-right cel key, `glass-fx.css:110-113`) is the correct,
  in-gamut directional rim/under-shadow system — the cartoon cast was a redundant SECOND
  shadow language layered on top. Keeping `--glass-key` (rim+under-shadow on the box) and
  retiring the cartoon cast leaves ONE coherent lighting model on the dock.
