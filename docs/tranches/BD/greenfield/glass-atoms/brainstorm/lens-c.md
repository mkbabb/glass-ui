# GLASS ATOMS — lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Greenfield brainstorm for the small glass atoms — **Badge** (+ metric-badge),
> **Slider**, **IconChip**, **StackedIconGroup** — interrogated LIVE (chrome-devtools,
> both modes, painted-pixel). Lens: 1940s-technicolor FLOW & PUNCH — bold layered-offset
> cel shadows, exaggerated squash/stretch, anticipation + follow-through + overlapping
> action + arcs, real weight & inertia; the boldest variant that is still idiomatic +
> cross-engine. The atoms share ONE warm-glass register and ONE cartoon-cast register —
> they batch DRY. This is a brainstorm; the WAVE-AMENDMENT reconciles it vs the 116-wave set.

---

## 0. THE LIVE READ — what the painted pixels say (chrome-devtools, 2026-06-24, both modes)

The honest born-RED condition, read off the REAL pages — NOT getComputedStyle over a
hardcoded field (the recurring fraud). Each is a captured computed-style + screenshot read
over the live demo route on `http://localhost:5173`.

| atom | route | painted read (light) | verdict |
|---|---|---|---|
| **Badge** (loud) | `/display/badge` | `bg oklch(0.552 0.192 359.8)` solid, `box-shadow:none`, `border rgba(0,0,0,0)`, `radius 9999px` | loud pill OK; **flat, no cast, no glass** — it is a sticker with no cel line |
| **metric-badge** | `/display/metric-badge` | `bg color(srgb 0.994 0.96 0.926 / 0.5)` (warm-cream, faint chroma), `backdrop blur(8px) saturate(1.4)`, `border 4%-α ink`, hover `--shadow-cartoon-sm` | warm glass register PRESENT but reads **grayish** over the flat field; **4%-α edge melts into host** |
| **Slider** track | `/forms/slider` | track `bg srgb 0.963 0.953 0.937 / 0.5` (near-achromatic), range `oklab(0.216 0.0035 0.0052 / 0.88)` (near-black, ~0 chroma), press = `--spring-smooth` `scale(0.97)` left-origin | track **gray-not-warm**; press is a **uniform shrink, NOT a squash**; drag carries **no weight/inertia squish** |
| **IconChip** | `/display/stacked-icons` | `radius 9999px`, `in srgb` brand-plate (`icon-chip.css:72`), glyph reveal `scale(0.85→1)` | plate OK; **no glass-fill, no congruent cartoon cast** |
| **StackedIconGroup** | `/display/stacked-icons` | solid color dots (red/blue/green/yellow), `border-2 border-background`, `.shadow-cartoon-sm`, hover `--shadow-cartoon-md` | **flat solid dots, not glass, not congruent** with the chip family; +N pill is cream-on-cream |

**The §3 gray — BOTH root causes confirmed live (the brief's exact thesis):**

1. **#1 flat-field (the field is not transmitted).** Every atom's warm-glass body
   (metric-badge `α0.5`, slider track `α0.5`) composites over a **flat near-neutral page**
   — `getComputedStyle(documentElement)` of the demo shell paints no warm chroma plenum
   behind the glass, so the `blur(8px)` has nothing warm to pull and the plate reads gray.
   `--glass-fill-tint: rgba(0,0,0,0)` / `--glass-fill-strength: 0%` LIVE — the per-instance
   warm lens is **dormant**. The warm read is **field-dependent**: born-RED over the flat
   condition is CORRECT, not a bug to paper over inside the atom.
2. **#2 dormant-tint (no warm-floor decl).** Even the atom's own body fill is achromatic:
   slider track `srgb 0.963 0.953 0.937` (chroma ≈ 0.003), the loud badge has no warm-glass
   register at all. There is no warm-floor token lifting the idle/quiet body off neutral.

**The cartoon K5 defect confirmed live (dark mode).** `--shadow-cartoon-sm` resolves its ink
via `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` → in `.dark` the cast ink is
**`hsl(30 14% 90%)` = near-WHITE `--foreground`** (`--shadow-cartoon-color: rgb(255 255 255 / 0.07)`,
`--foreground: hsl(30 14% 90%)`). So the stacked-icons +N overflow and the metric-badge hover
cast a **white sticker-GLOW** in dark mode instead of a dark cel shadow — the cartoon-shadow K5
figure-ground flip. This is the cartoon-shadow sibling's headline; the atoms are its consumers.

**The build-DAG truth (grep-verified — these are SPECS, not extant):**

| cited register | grep over `src/` | disposition |
|---|---|---|
| `.glass-capsule` / `--glass-capsule-fill` | **0 files** | DAG dep — `BD.W-TAB-IOS-CAPSULE` extract |
| `--motion-weight` | **0 files** (only `scale-paper.css` token name collision) | DAG dep — `BD.W-MOTION-WEIGHT` |
| `--ease-cartoon-punch` | **0 files** | DAG dep — `BD.W-CARTOON-PUNCH` |
| `--cartoon-ink` (warm 0-blur cel ink, K5-fixed) | **0 files** | DAG dep — `BD.W-CARTOON-CEL-INK` |
| `paper-field` (warm plenum behind glass) | **0 files** (the `closest()` trap: a fixed sibling, not an ancestor) | DAG dep — `BD.W-GLASS-FIELD` + chassis mount |
| `--glass-fill-tint` / `--glass-fill-strength` | **declared** (`glass.css:399/408`), **0 component consumers** | EXTANT axis, UN-wired |
| `--radius-control` = `--radius-pill` | **`radius.css:56`** | EXTANT — CONSUME |
| `accent-tone.css` / `--accent-fill-strength` | **`src/styles/glass/accent-tone.css`** | EXTANT — REFINE idle floor only |

So this brainstorm **DEPENDS-ON** the primitive waves and NEVER claims them extant. The atoms
are the **first/Nth CONSUMER** of the shared register — they wire it, they do not mint it.

---

## 1. THE CORE IDEA — ONE warm-glass cel-puck, four atoms wear it

The four atoms are the SAME object at four sizes: a **warm transmissive glass puck with a
single cel keystone** (one hard down-left cartoon cast + one keyed catch-edge), that **squashes
with real weight** on press/drag and **casts a follow-through** as it moves. There is no
per-atom material fork — there is ONE recipe, `.cel-puck`, and each atom is a geometry +
content variant of it.

```
.cel-puck  (the shared glass-atom register — NET-NEW, composes ONLY extant/DAG seams)
  body     = .glass-capsule lozenge (DAG: tabs extract)   ← the α<1 transmissive lens
           + --glass-fill-tint warm tint (EXTANT axis, consume)   ← the WARM read (#2 cure)
           + warm-floor via accent-tone widen (EXTANT, refine)    ← idle never gray
  edge     = --glass-key keyed two-stop rim (DAG: glass-material KEY-EDGE)  ← defined edge
  cast     = .shadow-cartoon-* warm 0-blur cel cast (DAG: CEL-INK, K5-fixed) ← the PUNCH
  motion   = --ease-cartoon-punch × --motion-weight  (DAG: motion-spring-register)
           + non-uniform squash (scale 1.04 0.94)  ← squash & stretch, NOT a shrink
           + a follow-through cast-lag child         ← overlapping action
  field    = transmits the chassis-mounted warm plenum (DAG: GLASS-FIELD)  ← #1 cure
```

The atoms differ only in: **diameter** (badge sm → metric-badge md → IconChip md → slider
thumb), **content** (label / value+unit / glyph / drag-handle), and **which motion beat fires**
(badge: hover lift; slider: drag squish; chip: activation pop; stack: hover fan-out arc).

### The four atoms as cel-puck variants

- **Badge** — the SMALLEST cel-puck. The loud (`default`/`destructive`/section-tone) variant
  is a SATURATED-fill puck (opaque plate, the loud register stays); the `secondary`/`outline`
  variant is the TRANSMISSIVE warm-glass puck. BOTH get the **one cel cast** + the keyed edge
  + a `--motion-weight`-scaled hover lift-and-cast. The badge is currently `box-shadow:none`
  with a transparent border — it is the flattest atom and gains the most from the cel line.
- **metric-badge** — the MID cel-puck, already transmissive (`α0.5` + `blur(8px)`). It gets the
  warm-floor (#2) so it stops reading gray, the keyed edge (its 4%-α border → ≥8% warm-ink so
  it stops melting), and the **K5-fixed** cast on hover (today its hover `--shadow-cartoon-sm`
  white-glows in dark). The value-lift hover (`-2px` + `scale 1.04`) becomes a non-uniform
  squash-and-settle on `--ease-cartoon-punch`.
- **IconChip** — the MID cel-puck with a glyph. Its `surface="glass"` arm wires the
  `--glass-fill-tint` warm lens (the `BD.W-ICONCHIP-GLASS` register) over the cel-puck body;
  its **`in srgb` brand plate is KEPT** as its own register (the AW.W26 fence — NOT forced
  through `accent-tone`'s `in oklab`). Geometry converges to `--radius-control` + the √φ glyph
  ladder. The cluster (StackedIconGroup) inherits the puck.
- **StackedIconGroup** — N overlapping cel-pucks. Today they are flat solid dots; greenfield
  they become **warm glass cel-pucks** (each the IconChip body), the +N overflow a cel-puck
  too. The overlap + hover fan-out is where the cartoon **arc + overlapping action** lives:
  the stack fans on an ARC (not a flat translate) with a per-puck stagger so the back pucks
  follow the front (overlapping action), each casting its own cel shadow as it separates.

---

## 2. THE SINGLE BOLDEST MOVE — the **liquid weight-train drag** on the slider

> A drag is not a value-set; it is a heavy object pulled through honey. The fill is a
> weighted train; the leading edge is the locomotive and the cel cast is its cast shadow
> dragging behind — anticipation when you grab, overlapping-action smear while you pull,
> follow-through overshoot-and-settle when you release.

The slider is the one atom with a sustained gesture, so it carries the loudest motion register.
Today the press is a dead `scale(0.97)` uniform shrink on `--spring-smooth` (a flat, weightless
nudge). Greenfield, the drag becomes a **weight-train**:

1. **ANTICIPATION (grab).** On `pointerdown`, before the value moves, the leading fill edge
   **dips back** ~2px against the pull direction (the wind-up) and the puck **compresses Y**
   (`scale 1 0.92`) — the object loads. This is `--ease-cartoon-punch`'s anticipation dip,
   already in the curve.
2. **OVERLAPPING-ACTION SMEAR (pull).** While dragging, the leading edge **leads** and the cel
   cast **lags** behind it by `--motion-weight × velocity` (a `useDragMorph`/`useLiquidFlex`
   X-squish + a cast `translate` lag, both compositor-only). The fill stretches in the drag
   axis (vol-preserving X·Y≈1) — a moving object smears toward its destination. The faster the
   drag, the longer the smear (`usePointerVelocityField`, the SURPASS lever the iOS reference
   cannot do). The track itself does NOT move — only the fill + cast deform (the box-INVIOLATE
   discipline; the track is the rail).
3. **FOLLOW-THROUGH (release).** On `pointerup` the fill **overshoots** the final value by the
   punch curve's ~22% then settles; the cel cast recoils LATE (the 1.15× follow-through lag) and
   re-seats. A monotonic settle is a FAIL — the object must overshoot and recover (real inertia).
4. **The keep-dock-open contract is PRESERVED** — `useDockHold` still acquires on the native
   `pointerdown` (the AX.W03 resolved-host listener), and the `data-held` halo now ALSO reads
   the velocity (a held + fast drag intensifies the cel cast). The Band-0 motion law (weight on
   ALL motion) lands here as the loudest, most legible instance in the whole atom set.

**Why this is the boldest:** it converts the most-used, most-boring atom (a value bar) into the
clearest demonstration of the FULL 1940s animation principle stack — anticipation, squash &
stretch, overlapping action, follow-through, arcs, weight & inertia — all on ONE gesture, all
compositor-only, both engines. It is the atom-scale proof of the "liquid-weight universal" law.
And it composes ONLY extant engines (`useDragMorph`, `useLiquidFlex`, `usePointerVelocityField`,
`useDockHold`, `--ease-cartoon-punch`, `--motion-weight`) — zero new composable in the core.

---

## 3. THE MECHANISM — tokens / recipes / composables (deft, DRY, no fork)

### 3.1 The `.cel-puck` recipe (NET-NEW class, ZERO own glass/motion tokens)

`src/styles/glass/cel-puck.css` (`@layer components`). It is a thin COMPOSITION — it declares
no `backdrop-filter`, no `--glass-bg-*`, no rim of its own (the no-fork fence). It composes:

```css
.cel-puck {
  /* body — the transmissive lozenge + warm tint (EXTANT axis) */
  /* composes .glass-capsule (DAG) ; tints via the consumed --glass-fill-tint */
  border-radius: var(--radius-control);                 /* EXTANT — = --radius-pill */
  /* edge — the keyed two-stop rim + ≥8% warm-ink border (DAG: KEY-EDGE) */
  /* cast — the K5-fixed warm 0-blur cel cast (DAG: CEL-INK) */
  box-shadow: var(--shadow-cartoon-sm);                  /* set per state-flip, NEVER animated */
  /* warm-floor — idle never gray; a one-line accent-tone widen (EXTANT, refine) */
  --accent-fill-strength: max(var(--accent-fill-strength), var(--cel-puck-tint-floor));
  /* motion — weight + punch (DAG) */
  transition:
    background var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard),
    scale var(--motion-weight-dur, var(--spring-smooth-duration)) var(--ease-cartoon-punch),
    translate var(--motion-weight-dur, var(--spring-smooth-duration)) var(--ease-cartoon-punch);
}
/* the PUNCH — non-uniform squash, NOT a shrink */
.cel-puck:active:not(:disabled) { scale: 1.04 0.94; }   /* widen X, compress Y */
/* PLAIN per-mode warm-floor pair — NEVER light-dark() (the recorded inset-shadow trap) */
.cel-puck { --cel-puck-tint-floor: 12%; }
.dark .cel-puck { --cel-puck-tint-floor: 15%; }
```

**The inert cel-cast child** (the cartoon-shadow H2 lesson — `::before`/`::after` are OCCUPIED
by the glass catch-light + grain on the real carriers). The follow-through lag rides an
`aria-hidden` `.cartoon-cast` span (the SAME inert child the cartoon-shadow caster ships), not a
pseudo. The atoms emit it when they opt into the loud register; the calm register skips it.

### 3.2 Per-atom wiring (geometry + content + which beat)

| atom | geometry | body | the motion beat | new composable? |
|---|---|---|---|---|
| Badge | `--radius-control`, sm rung √φ | loud = opaque plate (kept) ; quiet = `.cel-puck` glass | hover: lift `-2px` + cast on punch | none |
| metric-badge | md rung, existing `.metric-badge` | `.cel-puck` (warm-floor + keyed edge + K5 cast) | hover: squash-and-settle (replaces the `scale 1.04` nudge) | none |
| IconChip | `--radius-control`, √φ glyph | `surface=glass` → `--glass-fill-tint` over `.cel-puck` ; `in srgb` plate KEPT | activation: glyph scale-pop `0.85→1.15→1` (extend the existing reveal) | none |
| StackedIconGroup | per-puck = IconChip body | each item a `.cel-puck` ; +N a `.cel-puck` | hover: **fan-out on an ARC** + per-puck stagger (overlapping action) + per-puck cast | none (the arc is a `translate` + `rotate` on `--ease-cartoon-punch`) |
| **Slider** | track = rail (box-INVIOLATE) ; fill = `.cel-puck` cylinder | range tints via `--slider-range-bg` over warm track | **the weight-train** (§2): anticipation dip + drag smear + follow-through | none — composes `useDragMorph` + `useLiquidFlex` + `usePointerVelocityField` (all EXTANT) |

**The StackedIconGroup arc** is the second-boldest beat: today the fan-out is a flat
`translate-x-1.5 scale-105` (a stiff slide). Greenfield it is an **arc** — each puck's
`translate` + a hair of `rotate` traces a shallow curve, and a per-index `transition-delay`
stagger makes the back pucks FOLLOW the front (overlapping action), each puck casting its own
cel shadow as it lifts off the stack. The cluster breathes apart like a dealt hand of cards.

### 3.3 The §3-gray cure is TWO-legged, neither leg inside the atom

- **#1 flat-field** → the **chassis** mounts `<PaperBackdrop field>` (the `BD.W-GLASS-FIELD`
  demo-chassis contract — a warm radial plenum behind the glass). The atom's `.glass-capsule`
  body finally has something warm to transmit. The atom code is UNCHANGED for this leg — it is
  a chassis/preset concern (presets-in-consumers). An honest born-RED over the un-mounted page
  is correct; the gate samples the PAINTED field (canvas `getImageData`), never a hardcoded
  triple, never `getComputedStyle().backgroundColor` (the recurring fraud).
- **#2 dormant-tint** → the **warm-floor** (`--cel-puck-tint-floor`, the one-line `accent-tone`
  widen) lifts the idle/quiet body off neutral so even a single atom on a flat page reads warm.
  This is the atom's own leg. The two together cure the gray; either alone is born-RED.

---

## 4. CROSS-ENGINE (Chrome + Safari) + a11y/PRM carve

- **No `backdrop-filter:url()`, no SVG goo** in any atom (the atoms are glass + cel, not
  metaball). The fan-out arc is plain `translate`+`rotate`; the cast is plain `box-shadow`; the
  rim is the shipped two-stop box-shadow stops. The cel cast is **0-blur** (the CEL-INK H4 hard
  edge) — no per-frame re-blur, so Safari pays no blur cost on the cast.
- **The `box-shadow` cast is set per STATE-FLIP, NEVER animated per-frame** (the §L7 paint
  fence) — the FOLLOW-THROUGH rides the inert child's `translate`/`scale` (compositor-only),
  the box-shadow value is constant within a state. A per-frame box-shadow delta = paint-bound =
  FAIL.
- **The warm-floor is PLAIN per-mode** (`.cel-puck` + `.dark .cel-puck`), NEVER `light-dark()`
  inside a shadow fragment (the light-dark inset-shadow trap — it computes the whole box-shadow
  to none). The cartoon ink's dark arm is the `oklch(from --foreground …)` figure-ground form
  (CEL-INK H3), not the white `--foreground` flip — that is the K5 fix, inherited from the DAG.
- **`@supports (corner-shape: superellipse(2))`** REFINES the puck curve on Chrome 139+; the
  `--radius-control` round is the honest cross-engine base (the slider spectrum thumb precedent).
- **PRM:** `prefers-reduced-motion: reduce` → `--motion-weight: 0` (zeroes the squash, the drag
  smear, the fan-out arc, the follow-through lag in ONE assignment) + `transition: none` on the
  cast. The static bold cel STAMP persists (legibility) — the cartoon register is a STILL frame
  under PRM, never a frozen mid-animation. The slider value still tracks (a11y), it just doesn't
  smear.
- **`prefers-reduced-transparency: reduce`** → the warm-floor stays (warm is identity, not
  decoration) but the body goes opaque (`--glass-level: 0` flattens the blur); the cast goes UP
  in strength (it is the only edge cue without the glass).
- **`prefers-contrast: more`** → the keyed edge border floors UP to clear WCAG 1.4.11 (≥3:1
  non-text) — the cel line must DEFINE an edge for low-vision, not whisper.
- **The slider keep-dock-open contract** (`useDockHold` native resolved-host listener, AX.W03)
  is PRESERVED byte-for-byte; the weight-train rides ON TOP, never replaces the hold.
- **Touch:** the `useTouchGate` scroll-vs-drag arbitration (N.W0) is untouched; the weight-train
  smear only fires once the gate commits to a drag (no smear on a scroll).

---

## 5. THE DELTA-ASSAY → ONE wave-amendment covering all four atoms

Per the brief: the DELTA-ASSAY produces ONE wave-amendment for all atoms (no per-atom fork, no
dup vs the 116-wave set, cite the build-DAG deps). The shape:

**NEW — `BD.W-GLASS-ATOM-CEL-PUCK`** (Band 7, cards/controls/glass-for-every-element):
- **DEPENDS (HARD, RED-until-merged):** `BD.W-TAB-IOS-CAPSULE` (the `.glass-capsule`/`-fill`
  extract) · `BD.W-CARTOON-CEL-INK` (the K5-fixed warm 0-blur cast) · `BD.W-MOTION-WEIGHT` ·
  `BD.W-CARTOON-PUNCH` · `BD.W-GLASS-KEY-EDGE` (the keyed rim) · `BD.W-GLASS-FIELD` (the chassis
  field, the #1 cure).
- **CROSS-LINK:** `BD.W-ICONCHIP-GLASS` (IconChip's glass register — the cel-puck is the radius/φ
  congruence DELTA, not a re-mint) ; `BD.W-CHIP-CONGRUENT-GLASS` (the chip family shares the
  warm-floor pattern — the atoms are the ≥Nth consumer, recorded, not re-authored).
- **CONSUME (no edit):** `--glass-fill-tint`/`--glass-fill-strength` (EXTANT, glass.css:399) ·
  `--radius-control` (radius.css:56) · `accent-tone.css` (refine idle floor only).
- **Scope:** (1) the `.cel-puck` recipe (composition only, ZERO own glass/motion tokens) ;
  (2) Badge quiet-arm + cel cast + keyed edge ; (3) metric-badge warm-floor + keyed edge +
  K5-fixed cast + squash-hover ; (4) IconChip geometry/√φ congruence + glass-fill wire (plate
  KEPT) ; (5) StackedIconGroup → cel-pucks + the ARC fan-out + overlapping-action stagger ;
  (6) Slider the weight-train (anticipation/smear/follow-through, keep-dock-open preserved).
- **GATE — `proof:glass-atom-cel-puck` + `tests-visual/glass-atom.spec.ts` (born-RED, SPLIT,
  Chromium + WebKit, both modes):**
  - **A1 warm-body** — each atom's PAINTED body (canvas `getImageData` over the REAL field,
    NOT `getComputedStyle`) reads C ≥ FLOOR warm, H ∈ [45,85]. Born-RED on the flat-field page
    (slider track C 0.003 live). Self-test: must FAIL on a flat-base field, PASS on the warm one.
  - **A2 defined-edge** — keyed rim non-flat + cast non-`none` + border α ≥ 8% warm-ink + rim
    lit-edge ΔL ≥ 3:1 (WCAG 1.4.11). Born-RED on metric-badge's 4%-α border + badge's
    `box-shadow:none`.
  - **A3 K5-dark** — the dark-mode cast ink |L − L_card| ≥ 0.12 AND chroma ≥ 0.09 (figure-ground,
    NOT the white-`--foreground` flip). Born-RED: dark cast ink resolves `hsl(30 14% 90%)` ≈ white
    (verified live).
  - **A4 squash-not-shrink** — mid-press scaleX ≠ scaleY (a uniform scale = a shrink = FAIL).
    Born-RED on slider `scale(0.97)` uniform.
  - **A5 weight-train (slider)** — drag releases with an OVERSHOOT-PAST-target then settle
    (sampled across rAF, driven by the REAL pointer ramp, NOT a discrete-class spike); a
    monotonic settle = FAIL. The cast lags the leading edge mid-drag.
  - **A6 arc (stack)** — hover fan-out traces a non-zero `rotate` + a per-index `transition-delay`
    stagger (overlapping action); a flat translate = FAIL.
  - **A7 paint-fence** — NO box-shadow value changes per-frame during any beat (compositor-only).
  - **A8 PRM** — `--motion-weight:0` zeroes every beat; the static cel stamp persists; the slider
    value still tracks.
  - **A9 keep-dock-open** — `useDockHold` still acquires on slider `pointerdown` (the contract
    is byte-preserved); the weight-train does not break the hold.
- **PRUNE/EXCISE:** none. The loud-badge opaque plate, the IconChip `in srgb` plate, the slider
  `useDockHold`/`useTouchGate`, the stacked-icons size axis all KEEP their carriers. EXCISE from
  this brainstorm's core: a `::before`/`::after` cast (occupied — use the inert child) and a new
  drag composable (the weight-train composes EXTANT `useDragMorph`/`useLiquidFlex`/
  `usePointerVelocityField` — the velocity-to-cast DOM bridge is the ONE honestly-named small
  composable if the existing renderer-field can't drive a CSS var directly; default to the extant
  field, label any bridge honestly).

---

## 6. THE GESTALT BAR — does each atom read warm glass + congruent + liquid, both modes?

- **warm glass** — the cel-puck body transmits the chassis field (#1) + the warm-floor lifts the
  idle (#2); every atom reads warm-cream-through-glass, not gray, both modes (gated A1).
- **congruent** — ONE `.cel-puck`, ONE `--radius-control`, ONE √φ ladder, ONE cel keystone; the
  badge, the metric-badge, the IconChip, the stack puck, the slider fill are visibly the SAME
  object at four sizes (no per-atom material fork — gated A2 no-fork fence).
- **liquid** — every atom squashes with weight (A4), the slider runs the full anticipation →
  smear → follow-through (A5), the stack fans on an arc with overlapping action (A6); morph MORE
  on move, never tight/springy. The 1940s technicolor FLOW & PUNCH is universal across the atoms,
  PRM-carved (A8), Safari-clean (0-blur cast, no `filter:url`).

The atoms stop being trivial; they become the smallest, most-repeated proof of the whole liquid-
glass + cartoon-cel language — and they cost ZERO new material and ZERO new motion register,
because they are the deft Nth consumer of the shared register the union already ships or has
booked.
