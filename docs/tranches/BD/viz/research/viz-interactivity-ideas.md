# Per-viz interactivity — the unified framework + per-viz killer interaction (BD viz-research)

**Lane** BD viz-research / interactivity · **Status** AUTHORED 2026-06-22 (re-run; prior was rate-limited) ·
**Branch** `prototype/liquid-dock` · **Scope** PLANNING/RESEARCH ONLY — zero `src/` edits ·
**Substrate-grounded** against `src/composables/motion/usePointerVelocityField.ts` (the shipped BB.B4 field) +
the per-viz interaction surfaces in `research/{aurora,blob,concentric-levelset,constellation,dotmatrix-image,fourier-field,papergrid-warp,watercolor-and-novel,dot-suite-reconcile}.md` +
`arch/shared-field-engine.md` (the four-chunk math engine) + `framework/birthdaycolor-interactivity.md` (the play distillation) +
`dock/interactivity-prove.md` (the dock interactivity matrix).

> The user mandate (binding, per-viz): *"each viz: a robust CONFIGURATOR + mouse/keyboard INTERACTIVITY + the
> birthdaycolor-like interactivity (though our extant aurora likely supersedes it)."* This doc proposes the ONE
> unified interactivity framework every viz composes (on `usePointerVelocityField` + a NEW `useVizKeyboard` seam),
> the SOTA interactive-generative-art pattern catalogue, and the per-viz KILLER interaction.

---

## 0. TL;DR

- **The pointer half already has a shared spine** — `usePointerVelocityField` (BB.B4): position → velocity →
  acceleration → flick-burst, fed `tick(delta)` from the renderer's ONE frame loop (no own rAF, PRM = `tick(0)`
  freeze, normalized-host units, frame-rate independent). Every viz that wants pointer dynamics reads it. The gap
  is that each viz hand-wires the *consumption* (what the field DOES) and there is **no shared keyboard seam at
  all** (every viz is keyboard-dead today — the cross-suite mandate gap).
- **The proposal is a 3-layer framework**: (L1) the SHARED INPUT spine = `usePointerVelocityField` (exists) +
  a NEW `useVizKeyboard` (the roving-arrow/step/cycle keymap, composing `/keyboard`) + a NEW `useVizInteraction`
  facade that bundles both behind ONE `(pointerHandlers, keyHandlers, a11y)` surface; (L2) the SHARED PATTERN
  vocabulary = 6 reusable interaction PRIMITIVES (attract/repel · velocity-stir · click-to-seed · draw-to-seed ·
  scroll-drive · pointer-as-light) every viz draws from; (L3) the per-viz KILLER interaction (the one signature
  gesture that IS that viz's reason to touch it).
- **birthdaycolor.com is superseded on the field but teaches the PLAY DISCIPLINE**: the interaction is calm,
  one-protagonist, paint-under-touch, instantly legible — NOT a busy toy. The framework's bar is "every viz
  paints under your touch, calmly, and degrades to a still legible field under PRM."
- **Safari-first by construction**: every pattern is pointer-events + the substrate's own frame loop + WGSL/WebGL2
  uniforms — zero `backdrop-filter: url()`, zero private rAF, zero Canvas2D. The keyboard rides DOM `keydown`. PRM
  keeps positional reads, drops momentum/bloom (`tick(0)`).

---

## 1. The HEAD shape — what's shared, what's forked, what's missing

| input axis | shared spine | per-viz consumption | keyboard |
|---|---|---|---|
| **pointer position** | ✓ `usePointerVelocityField.smoothedPosition` | each viz maps `pos → uFocal/uCursor/bulgeCenter` by hand | ✗ none |
| **pointer velocity** | ✓ `.velocity` / `.speed` (the B4 derived term) | stir/wake/lean reads, hand-wired per viz | ✗ none |
| **pointer acceleration** | ✓ `.acceleration` (the second-derivative push term) | mostly UNREAD (a latent term most viz ignore) | ✗ none |
| **flick burst** | ✓ `.burst` (decays ~1s) | fling-momentum reads (fourier scrub, aurora flow) | ✗ none |
| **click/tap** | ✗ per-viz `@click` | blob spawn, constellation add-node, aurora wake — each its own listener | ✗ none |
| **drag (capture)** | ⚠ `useDragMorph` (motion/, dock-shaped) | fourier draw, focal-dot drag — none wired in viz | ✗ none |
| **scroll** | ⚠ `useScrollProgress` / native `scroll()` | aurora parallax atom (declared, half-wired) | n/a |
| **keyboard** | ✗ **NOTHING** | **every viz is keyboard-dead** | ✗ **the mandate gap** |

**The two structural holes the framework closes:**
1. **There is no keyboard seam.** The aurora/dock keyboard precedent (roving-tabindex, axis-derived arrows via
   `useKeyboardShortcuts`) exists for CONTROLS but no viz has a keyboard interaction map. This is the single
   biggest cross-suite mandate miss — a fully-mouse-bound viz fails "mouse AND keyboard INTERACTIVITY."
2. **The pointer CONSUMPTION is re-derived per viz.** Each viz hand-maps `field.smoothedPosition → its own
   cursor-uv` and hand-wires its own `@click`/`@pointerdown`. The 6 interaction PRIMITIVES (§3) are the same
   handful of gestures re-spelled — they should be a shared vocabulary, not N copies.

---

## 2. The unified framework — the 3 layers

### L1 · the shared INPUT spine (`useVizInteraction` over the B4 field + a NEW `useVizKeyboard`)

ONE facade every viz composes, returning the bound handler set + the a11y attrs:

```ts
// composables/motion/useVizInteraction.ts  [NEW — the facade, no second engine]
const viz = useVizInteraction(hostRef, {
  pointer: { /* usePointerVelocityField options — the SHIPPED field, composed not re-forked */ },
  keys: {
    arrows:  "focal",          // arrows nudge the named focal/anchor (axis-derived: ←→ x, ↑↓ y)
    brackets: ["medium", -1, +1], // [ / ] step a named enum axis
    plusminus: ["intensity", 0.05], // + / − step a named scalar
    space:   "cycleMotion",    // space cycles the motion ceiling (still→breathing→drifting)
    "r":     "reseed",         // re-seed → the seed-morph crossfade
    digits:  "zoneCount",      // 1–9 jump a count axis
  },
  a11y: { role: "img", liveLabel: () => `aurora field: ${protagonistHueName.value}` },
})
// viz.pointerHandlers → v-on the host; viz.tick(delta) inside onFrame; viz.aria → v-bind
```

- **`usePointerVelocityField`** is COMPOSED (the shipped position→velocity→accel→burst field), not re-forked. The
  facade owns no rAF — it threads `tick(delta)` through to the field, the viz calls `viz.tick(delta)` from its
  ONE frame callback (the no-own-rAF / `proof:offscreen-pause` discipline preserved).
- **`useVizKeyboard`** [NEW] is the keymap: it composes `useKeyboardShortcuts` (`/keyboard`) — NO hand-rolled
  keydown — and resolves a declarative `keys` map to actions. Axis-derived arrows (the SegmentedTabs roving
  precedent: ←→ for the horizontal axis, ↑↓ for vertical). Every palette-changing key routes through the viz's
  crossfade (e.g. `useAuroraSeedMorph`) so keyboard reads as LIQUID, never a hard cut.
- **a11y floor (mandate-binding)**: `role="img"` + a `aria-live="polite"` label that updates on protagonist
  change; the interactive host is focusable (`tabindex="0"`); every pointer gesture has a keyboard equivalent.
- **PRM**: the field's `tick(0)` freeze (positional reads kept, momentum/bloom dropped) is inherited free; the
  keyboard stays fully live (a hue change is not motion — it seats instantly via the morph's PRM path).

### L2 · the shared PATTERN vocabulary (6 reusable interaction primitives)

The SOTA interactive-generative-art gestures, factored as a vocabulary every viz draws from (each is a tiny
shader-uniform + a field-read recipe, NOT a new engine):

| # | primitive | mechanism | SOTA anchor | viz that owns it as KILLER |
|---|---|---|---|---|
| **P1** | **attract / repel** (cursor bulge) | local Gaussian warp of the field `g` near `smoothedPosition` — push contours/dots/lines out (repel) or in (attract); `exp(−d²/2r²)` | paper-grid `cursorBulge`, mizu.fluid, generative-rubber-sheet | concentric, paper-grid |
| **P2** | **velocity-stir** (fluid wake) | inject momentum along the motion vector into the curl/flow field: `curlInject = velocity · exp(−d²/2r²)`, decays ~1s | birthdaycolor-grade "stir the liquid", curl-noise fluid | aurora, paper-grid, watercolor |
| **P3** | **click-to-seed** (spawn) | a tap injects a transient element at the point (a swell→fade blob, a node, a chemical drop) into a ring buffer | Codrops droplet-metaballs click-to-spawn | blob, constellation, watercolor |
| **P4** | **draw-to-seed** (stroke→target) | pointer-down captures a stroke → resample → feed the viz (DFT, an SDF target, an image) → the viz redraws YOUR input | 3Blue1Brown freehand Fourier | fourier-field |
| **P5** | **scroll-drive** (timeline) | scroll position drives a viz parameter (head_t, wash phase, layer parallax) via native `scroll()` / `useScrollProgress` | scrollytelling generative backgrounds | dot-matrix (image wash), fourier |
| **P6** | **pointer-as-light / protagonist** | the cursor is a moving LIGHT (sheen `uLightDir` follows it) OR a moving COLOR source (transient nucleus blooms the cursor-hue locally, then diffuses) | birthdaycolor headline-better, satin BRDF | aurora (color), dot-matrix (light) |

These six cover the entire mandate surface (attract/repel · velocity-field · draw-to-seed · scroll-drive are
named verbatim; click-to-seed + pointer-as-light complete it). Each viz picks 2-3 + designates ONE as its killer.

### L3 · the per-viz KILLER interaction (§4)

---

## 3. The SOTA interactive-generative-art patterns (the catalogue the vocabulary distills)

- **Pointer-velocity fields** (the shipped B4 spine) — position/velocity/accel/burst, the basis for P1/P2.
  The under-read term is **acceleration** (the second derivative): a pointer "push" (sharp accel) distinct from
  steady drag — a latent killer-axis (a shove ripples the field harder than a slow sweep).
- **Attract/repel rubber-sheet** (P1) — the field is a topography the cursor deforms; mizu/Three.js displacement.
- **Curl-noise fluid stir** (P2) — Bridson curl + velocity injection = the cursor leaves a swirling wake;
  divergence-free so it folds like real fluid (the `curlFBM` chunk the suite already shares).
- **Click-to-spawn lifecycle** (P3) — a ring buffer of swell→fade elements; GPU-cheap, organic-by-construction.
- **Draw-to-transform** (P4) — capture a stroke, transform it, watch the viz reconstruct it; the teaching/play
  killer (Fourier, signed-distance-from-stroke).
- **Scroll-as-time** (P5) — native scroll timelines drive the generative parameter; zero-JS on supporting engines.
- **Birthdaycolor "paint-under-touch"** (P6) — calm, one-protagonist, the cursor injects color/light; the field
  BLOOMS where you point then diffuses + fades. The discipline: serene, legible, never busy.

---

## 4. Per-viz KILLER interaction (the one signature gesture each)

| viz | KILLER interaction | primitives | keyboard mirror | Safari fence |
|---|---|---|---|---|
| **aurora** | **cursor-as-protagonist** (P6) — pointer is a moving color source; a transient nucleus follows it, blooms the cursor-hue locally, diffuses + fades. A captured drag leaves a fading color trail. (birthdaycolor headline-better) | P6+P2+P1 | arrows nudge focal · `r` re-seed→morph · `[ ]` step medium | smooth-core field, JS color math — the MOST Safari-safe surface |
| **blob** | **click-to-spawn lava-lamp** (P3) — tap spawns a satellite that swells into the core, orbits, merges, fades (ring buffer + smoothstep envelope); multiple blobs interact organically | P3+P1 | space cycles mood · `+/−` viscosity · digit = blob count | regular-filter goo + sRGB (the goo Safari fence) |
| **concentric** | **attract/repel topography** (P1) — push on the rings and the iso-contours bunch (repel) / spread (attract) like pressing a rubber level-set; velocity feeds the swell phase | P1+P2 | arrows move the bulge center · `+/−` ring count | fragment-only level-set, no displacement filter |
| **paper-grid** | **fluid stirring-rod** (P2) — drag the cursor and it injects curl momentum; the grid leaves a transient swirling wake decaying ~1s; auto-wash front on fling | P2+P1 | arrows tilt the wash direction · space fires a wash | curl chunk, fragment-only |
| **dot-matrix (image)** | **draw/scroll the target wash** (P5+P4) — scroll (or a key step) cross-fades the displayed target (blob→wave→cloud→image); cursor reveals/disturbs the dots (parallax + dimple); the aurora-flow drives the "washes over naturally" temporal fade | P5+P1+P6 | arrows step target · scroll = wash phase | instanced billboards, fwidth SDF |
| **fourier-field** | **draw-your-own-curve** (P4) — pointer-down captures a stroke → close + resample → `dftFromPoints` → swap the spectrum → epicycles redraw YOUR curve term-by-term (3B1B signature). Secondary: drag a phasor tip to re-aim a coefficient | P4+(scrub P5) | arrow scrub `head_t` · `N+/N−` harmonic count · space pause | pure pointer + CPU DFT, zero gap |
| **constellation** | **click-to-add-node + pointer-web** (P3) — tap drops a node into the lattice; the cursor is a virtual node the web tethers toward (lean + ripple); drag re-aims a node | P3+P1 | arrows move a focused node · `n` add · `del` remove | CPU edge scan + GPU draw |
| **watercolor / novel** | **paint-to-seed reaction-diffusion** (P3+P2) — the cursor INJECTS chemical (paint-to-seed); drag = stir the water (visible vorticity); the Gray-Scott field grows the spots you seed | P3+P2+P1 | arrows steer feed/kill bias · click = drop | GPU ping-pong, fragment-only |

**The cross-viz congruence** (the suite reads as ONE family): every viz composes `useVizInteraction`, every
killer is one of the 6 primitives, every keyboard map is the same axis-derived shape, every gesture has a
keyboard mirror + a `role="img"` live label, and every viz degrades to a still legible field under PRM.

---

## 5. The birthdaycolor-like play discipline (the PLAY bar, not the engine)

Aurora supersedes birthdaycolor's ENGINE (multi-nuclei fbm + OKLCh shorter-hue ⊃ its noise-blob + sRGB mix) AND
its INTERACTIVITY (it ships velocity-burst + cursor-as-light + nucleus CRUD; birthdaycolor's field is inert
post-select — `framework/birthdaycolor-interactivity.md §2`). What birthdaycolor TEACHES is the **play
discipline**, and it is the framework's quality bar:

1. **Paint under touch** — the field RESPONDS where you point (birthdaycolor's never does); but
2. **calm + one-protagonist** — the response is serene, not a busy toy (the `single-hue` ceiling, the
   `breathing` motion cap — never `drifting` for a protagonist surface);
3. **instantly legible** — a `role="img"` live label names what changed ("aurora field: violet"); and
4. **the ritual is the interaction** — the FORM (date→color, draw→curve, scroll→target) is the headline gesture,
   the field is the calm response to it.

The bar for every viz: *paints under your touch, calmly, names what it did, and is still a legible field with the
pointer gone or under PRM.*

---

## 6. The Safari-first fence (ABSOLUTE — restated for the interactivity surface)

| mechanism | Safari-safe path | NEVER |
|---|---|---|
| pointer dynamics | `usePointerVelocityField` (DOM `pointermove` + the substrate frame `tick`) — universal | a private rAF (breaks `proof:offscreen-pause`) |
| keyboard | `useKeyboardShortcuts` (`/keyboard`, DOM `keydown`) — universal | a hand-rolled keydown listener |
| drag capture | `setPointerCapture` + `useDragMorph` substrate — universal | — |
| scroll-drive | native `scroll()` timeline / `useScrollProgress` dual-path — universal | a JS momentum scroll lib (Lenis/GSAP — the no-lib fence) |
| field response | WGSL primary / WebGL2 fallback uniforms (the GPU-only dual-backend) — Safari needs the WebGL2 path | Canvas2D / software-raster / CSS fallback |
| color injection | value.js OKLCh + `oklch()`/`color-mix` — universal | sRGB channel-lerp (greys the midpoint, a `proof:seed-morph` RED) |
| PRM | the field `tick(0)` freeze (positions kept, dynamics off) — universal | scaling `uTime` to "slow" motion (the flow jumps) |

---

## 7. The waves this implies (named, for the EXECUTION-DAG)

- **`W-VIZ-INTERACTION-SPINE`** [NEW] — mint `useVizKeyboard` (the `/keyboard`-composing keymap) +
  `useVizInteraction` (the facade bundling it with the shipped `usePointerVelocityField` + the a11y attrs).
  The ≥2-consumer bar is met by construction (every viz composes it). Closes the cross-suite keyboard-dead gap.
- **Per-viz `W-<VIZ>-INTERACT`** waves — each viz wires its killer (§4) + its keyboard mirror, composing the
  spine. The killer is the paint-first π (a captured DELTA: the gesture spikes/reshapes the field, PRM stills it).
- The **acceleration term** (`.acceleration`, latent today) is the under-used axis — a `W-VIZ-PUSH` thread could
  wire "a sharp shove ripples harder than a slow sweep" across the stir/wake primitives (P2).

---

## Sources
- Shipped: `src/composables/motion/usePointerVelocityField.ts` (the B4 field — position/velocity/accel/burst).
- `docs/tranches/BD/viz/research/{aurora,blob,concentric-levelset,constellation,dotmatrix-image,fourier-field,papergrid-warp,watercolor-and-novel,dot-suite-reconcile}.md` (per-viz interaction surfaces).
- `docs/tranches/BD/viz/arch/shared-field-engine.md` (the four-chunk `noise·wave·flow·color` math engine).
- `docs/tranches/BD/viz/framework/birthdaycolor-interactivity.md` (the supersession proof + play distillation).
- `docs/tranches/BD/viz/dock/interactivity-prove.md` (the dock interactivity matrix — the drag/scroll/keyboard precedent).
- SOTA: 3B1B freehand Fourier (P4), Codrops droplet-metaballs (P3), Bridson curl-noise fluid (P2), birthdaycolor.com (P6), paper-grid `cursorBulge` (P1), mizu/generative-rubber-sheet (P1).
