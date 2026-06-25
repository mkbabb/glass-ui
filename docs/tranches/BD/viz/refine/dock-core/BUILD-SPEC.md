# BUILD-SPEC — dock-core liquid morph + generalize (BD.W-DOCK-CORE)

The synthesis of RESEARCH-1 (live root-cause), RESEARCH-2 (the SOTA target), RESEARCH-3
(the token map). The CORE liquid dock animation is FIXED + GENERALIZED to the iOS-27
Liquid Glass language. Eleven verbatim defects (A1–A13). Token-first, no-fork,
compositor-only, PRM-carved, Safari-tested. North star: design.md six-layer composite +
BA.W-NO-GRAY warm-chroma floor + [[feedback-liquid-weight-universal]].

The wave is ONE coherent build, not eleven patches — three structural moves carry it:
**(I)** the WEIGHTY center-out morph register (A3·A4·A5·A6·A2 + the spring re-tune),
**(II)** the wire of the SHIPPED fission engine into a first-class `<GlassDock split>`
facility (A13·A12·A10·A1), **(III)** the surface/trigger/recolor hygiene (A7·A8·A11 +
the warm-chromatic dock ink). Every motion engine already ships — the dock work is WIRE +
RE-TUNE + RE-ORIGIN, mint nothing (a duplicate spring reds `proof:animation-coherence`;
a second rail/fission SFC reds `proof:dock-rail-realize` R1 / `proof:no-dual-path`).

---

## MOVE I — the WEIGHTY center-out morph register

### I.1 — soften DOCK_SPRING toward gooey/inertial (the headline motion correction)

The dock runs `{response: 0.32, ζ: 0.7}` — a TIGHT near-critical snap (live `--dock-morph-t`
overshoots to ~1.046 then snaps). The mandate is the OPPOSITE: slow/gooey/inertial/audacious,
morph-MORE-on-move. Re-tune the dock's OWN register on the ONE governed table — NOT a new
spring (the regen machinery re-derives the CSS `linear()` + JS twin from the `(response, ζ)`
pair, drift-proof).

`src/composables/motion/springPresets.ts` — the `dock` row (the single source of truth):

| field | HEAD | NEW | rationale |
|---|---|---|---|
| `response` | `0.32` | `0.56` | the §L2 "sheet entrance / sidebar slide" WEIGHT band — mass, not dart |
| `dampingFraction` | `0.7` | `0.58` | between `--spring-bouncy` 0.55 and `--spring-snappy` 0.78 — a VISIBLE audacious overshoot (≈+10-13%), then settles |
| `comment` | (current) | "DOCK register — the iOS-27 WEIGHTY gooey morph (collapse/expand + V↔H + fission share it); slow inertial settle, audacious overshoot ~+11%, the liquid-weight law" |

Then run `npm run regen:spring-tokens` (or `node scripts/regen-spring-tokens.mjs`) — it
re-emits `--spring-dock` (the `linear()` curve) AND `--spring-dock-duration` (the analytic
2%-band settle `t_s = -ln(0.02)/(ζ·ωₙ)`, ωₙ = 2π/0.56) into `scheme-motion.css`. Expected
new `--spring-dock-duration` ≈ **0.78s** (up from 0.28s — the slower deliberate clock). The
`linear()` overshoot peak rises from ~1.045 to ~1.11–1.13. `DOCK_SPRING` in `constants.ts`
imports the row transitively (it's `{ response, dampingFraction }` — verify it reads from the
table; if it's a hardcoded literal at `constants.ts:84`, re-point it to `springPreset("dock")`
so there is ONE authority — RESEARCH names the literal, the no-second-authority fence requires
the re-point).

- **Binding clock fence (RESEARCH-2 §2.1, NON-NEGOTIABLE):** the `linear()` stays NORMALIZED
  0..1, the duration is the analytic settle — do NOT truncate the clock (re-introduces the
  W-GLASS-CAL tail-jank). The weight comes from response/ζ, never a clipped clock.
- **Lockstep:** fission (`useDockFission` reads `DOCK_SPRING`), V↔H (`useDockOrientationMorph`),
  the collapse/expand morph, the stagger — ALL share this ONE re-tuned register. ONE clock.
- **The `MORPH_SETTLE_MS` click-integrity floor (`constants.ts:121`, 320ms)** must rise in
  lockstep to **≥ 820ms** (the `--spring-dock-duration` envelope + a frame margin) so the
  slower morph's post-swap coordinate-shift window is fully covered (else a click mid-morph
  on the longer clock hits a stale coordinate). Set `MORPH_SETTLE_MS = 840`.

### I.2 — grow/shrink FROM THE CENTRE (A3)

`src/styles/dock/layers.css` — TWO origin pins are edge-anchored:

| # | line | HEAD | NEW |
|---|---|---|---|
| L1 | `88` | `transform-origin: left center;` | `transform-origin: center center;` |
| L2 | `137` | `transform-origin: center top;` (vertical inner) | `transform-origin: center center;` |
| L3 | `148` | `transform-origin: center top;` (nested vertical group) | `transform-origin: center center;` |

The inner `.dock-layers` `scaleX`/`scaleY` then pins the CENTROID — content grows
symmetrically center-out and shrinks to centroid.

**The ROOT box (the load-bearing half — A3 RESEARCH-1 leg 2).** The root grows via
flow-anchored `inline-size`/`block-size` (`layers.css:105–118`), so a left-anchored dock
(bottom shell, gallery tiles, any in-flow dock) keeps its start edge pinned → grows rightward.
Couple a compositor `translate` that re-centers the live box about its settled centroid:

`src/styles/dock/layers.css` — APPEND to the `.glass-dock[data-morphing]:not(.vertical)` rule
(after the `inline-size` calc) and the `.vertical` twin:

```css
/* BD.W-DOCK-CORE — center-out root growth (A3). The root box morphs its inline/block
   size flow-anchored (start edge pinned), so couple a compositor translate that shifts
   the box by HALF its live-vs-settled size delta toward center — the box grows/shrinks
   symmetrically about its own centroid regardless of the container's justify. The
   settled `to` is the reserved footprint; the live size is the calc above. translate is
   compositor-only (proof:no-layout-animation holds — it is NOT a layout property). */
.glass-dock[data-morphing]:not(.vertical) {
    --dock-root-live-size: calc(
        var(--dock-root-morph-from) +
        (var(--dock-root-morph-to) - var(--dock-root-morph-from)) * var(--dock-morph-t, 0)
    );
    translate: calc((var(--dock-root-morph-to) - var(--dock-root-live-size)) / 2) 0;
}
.glass-dock[data-morphing].vertical {
    --dock-root-live-size: calc(
        var(--dock-root-morph-from) +
        (var(--dock-root-morph-to) - var(--dock-root-morph-from)) * var(--dock-morph-t, 0)
    );
    translate: 0 calc((var(--dock-root-morph-to) - var(--dock-root-live-size)) / 2);
}
```

(Reuse the existing `inline-size`/`block-size` calc — factor the live-size into the named
`--dock-root-live-size` so the size rule and the translate read ONE expression. At settle
`[data-morphing]` clears → `translate` vanishes → no residual offset. The shape.css
`scale: var(--stretch) …` squish multiplies onto this translate on the compositor — they
do not fight, distinct transform components.)

- **Fence — the inner scale's origin (L1–L3) AND the root translate must agree on `center`**
  so the two transform layers (inner `scaleX` over reserved footprint + root size+translate)
  read as ONE center-symmetric grow. The empty-`#collapsed` B15 center-out morph
  (`morph.css:300-320`) is the precedent generalized — the centre is the pin, never an edge.

### I.3 — the blur dial-back (A4)

`src/styles/dock/morph.css` — the `[data-morphing]` self-blur (`:78-81`) peaks 3px and decays
over the full window (`1 - expand-t`), so the glyphs read soft for ~160ms and the filter root
stays armed to ~731ms. Dial the peak DOWN and FRONT-LOAD the decay so it clears by mid-morph:

| # | line | HEAD | NEW |
|---|---|---|---|
| B1 | `79` | `--dock-reveal-blur: 3px;` | `--dock-reveal-blur: 1.25px;` |
| B2 | `80` | `filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t, 1))));` | `filter: blur(calc(var(--dock-reveal-blur) * clamp(0, calc((0.5 - var(--dock-expand-t, 1)) / 0.5), 1)));` |

The `clamp(0, (0.5 - expand-t)/0.5, 1)` ramp drives the blur 1.25px → 0 as expand-t crosses
**0 → 0.5**, then HOLDS 0 for the back half — a brief decongest FLASH, crisp by the morph's
midpoint (the icons never blur during the slow grow). The resting `.glass-dock` self-blur stays
`0px` (`:76`, untouched — crisp at rest). The PRM carve (`:494-499`) is untouched.

- **The backdrop blur (`--glass-blur-dock` = `blur(9px)`, the material) stays** — it is the
  W-GLASS-CAL calm radius, acceptable at rest (RESEARCH-2 §2.3: the dock STRUCTURE reads
  through). The two-blur "extreme" read is the self-blur stacking on the backdrop; dialing the
  self-blur to 1.25px + front-loaded clears the user's complaint. Do NOT touch the 9px radius
  (reds `proof:glass-cal`).
- **Fence:** the self-blur is `filter` (own pixels), NOT `backdrop-filter` (which would clobber
  the resting plate blur). Cross-engine (Safari paints `filter: blur()`). PRM → 0.

### I.4 — synced center-out stagger + aligned shrunken icons (A5, A6)

**A6 — the desync.** `layers.css:356-375` keys the per-child onset to child INDEX 1→N
(leftmost reveals first) → left-to-right cascade fighting the center-out box. Re-key the onset
to be SYMMETRIC about the row center (center children reveal first, edges last — a center-out
wave tracking the box) AND drop the per-child rise to a center-coupled scale instead of an
independent translateY.

`src/styles/dock/layers.css` — REPLACE the five `nth-child` onset rules (`:356-375`) with a
symmetric ladder. The web platform has no `sibling-index()`/center-distance selector across
Safari yet, so express the symmetric onset with a small fixed nth-child set keyed off
DISTANCE-FROM-CENTER (the row is short — ≤8 controls is the dock norm):

```css
/* BD.W-DOCK-CORE (A6) — the SYMMETRIC center-out stagger. The onset ladders by
   DISTANCE FROM THE ROW CENTER (center pair = onset 0, then ±1, ±2 …) so the reveal
   radiates center-out in lockstep with the center-out box morph (I.2) — never the
   prior left-to-right index cascade that desynced from the centered grow. The token
   `--dock-stagger-step` is the per-ring beat. Cross-engine nth-child form (the cap at
   ring 3 finishes a long row inside the window). */
/* center pair: onset 0 (the default on the base .is-active > * rule, kept) */
/* ring ±1 — 2nd-from-center each side */
.glass-dock[data-morphing] .dock-layer.is-active > *:nth-child(2 of *),
.glass-dock[data-morphing] .dock-layer.is-active > *:nth-last-child(2 of *) {
    --dock-stagger-onset: calc(var(--dock-stagger-step) * 1);
}
.glass-dock[data-morphing] .dock-layer.is-active > *:nth-child(3 of *),
.glass-dock[data-morphing] .dock-layer.is-active > *:nth-last-child(3 of *) {
    --dock-stagger-onset: calc(var(--dock-stagger-step) * 2);
}
.glass-dock[data-morphing] .dock-layer.is-active > *:nth-child(n + 4):nth-child(-n + 5) {
    --dock-stagger-onset: calc(var(--dock-stagger-step) * 3);
}
/* (mirror the inner .dock-layer-item-host.is-active > * group identically) */
```

(Approximate symmetric — `nth-child` + `nth-last-child` reach both ends; the central rule
holds the deep-middle. If a precise center-distance proof is wanted, the `useTabIndicator`
center-anchor JS could write `--dock-child-ring` per child, but the CSS symmetric ladder is
the no-JS floor and clears the gestalt. The `of *` syntax is Safari 16.4+/Chrome 111+.)

**Re-key the rise to a center-coupled scale (A6 "inertia FROM THE CENTRE").** `layers.css:337-342`
rises each child by an independent `translate: 0 4px`. Replace the `translateY` rise with a
coupled `scale` that radiates from the row center — the children ride the SAME center-anchored
read as the box:

| # | line | HEAD | NEW |
|---|---|---|---|
| S1 | `337-341` | `translate: 0 calc((1 - reveal) * var(--dock-stagger-rise, 4px));` | `scale: calc(0.82 + 0.18 * var(--child-reveal)); transform-origin: center;` where `--child-reveal` is the existing clamp ramp factored to a named var |

The child scales `0.82 → 1` on its reveal ramp (a small inertial pop FROM center, coupled to
opacity per W-MOTION-CANON P3) instead of a vertical hop. Factor the `clamp(0, (expand-t -
onset)/window, 1)` into `--child-reveal` (declared once on the base rule) so opacity, scale,
and the onset all read ONE ramp. PRM strips `scale`/`translate` (the global gate) → snap.

**A5 — shrunken-icon alignment.** `morph.css:263-282` centers the summary box but the
EMPTY-summary case (`:314`) collapses to the `#persistent` glyph whose centering depends on the
persistent region. APPEND a both-axis center floor on the persistent-as-collapsed-pill path:

```css
/* BD.W-DOCK-CORE (A5) — the collapsed persistent pill centers its single glyph on BOTH
   axes (the empty-summary case where the #persistent control IS the collapsed circle).
   The safe-inset padding (background-clip: content-box) must not shift the glyph off the
   pill's geometric center — place-items: center belt-and-braces both axes. */
.glass-dock.collapsed:has(.dock-layer--summary:empty) .dock-persistent {
    display: grid;
    place-items: center;
}
.glass-dock.collapsed:has(.dock-layer--summary:empty) .dock-persistent > * {
    place-self: center;
}
```

Also floor the collapsed glyph at the 16px-min the rail glyph carries (RESEARCH-2 §2.4 — never
a 4px sliver inside an inline-flex column): verify `--dock-icon-glyph` resolves on the collapsed
persistent (it does via density.css re-resolve; if the persistent control is outside `[data-density]`
scope, the glyph reads the `:root` fallback — confirm live, add `min-width:1rem; min-height:1rem`
on the collapsed glyph svg if it slivers).

### I.5 — the shrunken state + longer hover window (A2)

`src/components/custom/dock/composables/useDockState.ts:78` — `collapseDelay = 2500` default.
Raise the patient-dwell default:

| # | file:line | HEAD | NEW |
|---|---|---|---|
| W1 | `useDockState.ts:78` | `collapseDelay = 2500` | `collapseDelay = 3600` |

(The `GlassDock.vue` prop default flows through — verify the prop's own default is unset so the
composable default governs, or bump the prop default to 3600 in lockstep.) The
AZ.W-DOCK-FLICKER hysteresis (`HOVER_INTENT_MS = 60` enter-dwell + the `EDGE_BAND_PX = 24`
moving-edge-sweep recheck on leave, `constants.ts:108-109`) is KEPT — the longer delay is a
more-forgiving dwell, the hysteresis prevents thrash at a moving edge. **A2's "shell docks gain
a proper shrunken state":** the shell docks are `always-expanded` (never collapse). To give them
a genuine shrunken state, flip `BottomDock.vue`/`SidebarDock.vue` off `always-expanded` to the
default collapsible mode with `:collapse-delay="3600"` + an authored `#collapsed` summary glyph
(so they collapse to a clean warm circle, not an empty sliver). This is a demo-shell edit
(MOVE II's A1 region) — the library mechanism is unchanged.

---

## MOVE II — wire the SHIPPED fission engine into a first-class `<GlassDock split>` (A13·A12·A10·A1)

The engine is 100% (RESEARCH-1/2 confirm): `useDockFission.ts` (n-ary detach on `DOCK_SPRING`,
per-context `DOCK_SPLIT_SIGNATURES`, `registerPiece`, `--dock-split-t`, `useLiquidFlex` recoil,
`usePointerVelocityField` seam-tension, PRM sync-seat), `DockGooFilter.vue` (Safari-correct
regular `filter:url()` + `sRGB` + non-zero host + `-50%/200%` region), `fission-bridge.css`
(the `--neck-t` filament + ripple + merge-splash). Assembly is 0% (demo-only). WIRE it.

### II.1 — `<DockGooFilter>` mounted ONCE at app/shell root

`demo/layout/AppShell.vue` (or the demo root) — mount `<DockGooFilter />` ONCE near the root
(it is a global `<defs>` referenced by id; mounting twice dups the id). The shell docks +
gallery then reference `var(--dock-fission-goo-filter)` (which resolves `url(#dock-fission-goo)`).
Confirm the token `--dock-fission-goo-filter` is declared (fission-bridge.css) pointing at the
filter id.

### II.2 — generalize `<GlassDock>` with a first-class `split` facility

`src/components/custom/dock/GlassDock.vue` + a thin new composable wiring (NO second engine):

- Add an OPT-IN prop surface (additive, default-off — the box-INVIOLATE fence; fission is a
  CONSUMING seam beside the morph engine, never editing `dockMorphContext`/`DOCK_SPRING`):
  - `splittable?: boolean` (default `false`) — arms the fission seam.
  - `splitContext?: DockSplitContext` (`"search" | "media" | "nav"`, default `"nav"`) — selects
    the `DOCK_SPLIT_SIGNATURES` row.
  - `splitPlacement?: "beside" | "above" | "below"` (default `"beside"`) — where the detached
    sibling dock lands (reads the split vector: radial → beside, V-axis → above/below).
- Inside, when `splittable`, call `useDockFission({ rootEl, signature })`, expose `split()` /
  `merge()` / `toggle()` via `defineExpose`, register each detachable control as a piece (the
  consumer marks `data-dock-splittable` on a control or passes a `pieces` descriptor; the
  GlassDock auto-`registerPiece`s the marked children with a vector derived from their
  FLIP-measured center relative to the dock center — radial bloom for `search`, lateral for
  `media`, inward for `nav`).
- Bind `@pointermove="fission.onPointerMove"` on the dock host (the seam-tension feed —
  morph-more-on-move). PRM-gated by the field.
- The detached piece renders as a real SECOND `<GlassDock>` positioned beside/above/below per
  `splitPlacement` (a Teleport-or-sibling that reads the split vector for placement). This is the
  "becomes its own dock" behavior (RESEARCH-2 §3.1). The split spring is the §I.1 re-tuned
  WEIGHTY register (shared, no second clock).
- **Merge** reverses on the SAME loop (`fission.merge()` runs 1→0); the merge-splash gold flash
  fires at convergence (`fission-bridge.css` `[data-merging]` gate — earned-gold, one-shot).

### II.3 — draggable dock items (A12) — the drag IS the split gesture

`src/components/custom/dock/DockIconButton.vue` (+ the `useDockFission` seam):

- Wire a pointer-capture grab on the dock control (compose the shipped `useDragMorph`
  precedent's follow + the fission seam-tension): grab → the goo neck stretches and RESISTS
  (the `usePointerVelocityField` seam-tension, capped LOW ≤0.12 — swells, never taffy-pulls);
  release flings velocity-continuously to the nearest slot, OR for a split-eligible control a
  pull PAST a threshold COMMITS the fission (`fission.split()`). Morph-more-on-move: a faster
  pull stretches the neck more (the seam-tension gain).
- Compositor-only follow (`transform: translate` — never `inline-size`/`left`). The
  roving-tabindex keyboard contract on the dock controls holds (a draggable strip that is
  keyboard-dead is the worse failure — keep the existing keyboard nav; if absent, add the
  roving-tabindex per the SegmentedTabs precedent).
- PRM: the gesture still FUNCTIONS (drag follows, snap commits) but the squish is OFF and the
  release is an instant nearest-snap (the `useLiquidFlex` PRM + `SpringProgress.respectReducedMotion`).

### II.4 — A1: remove the broken rail from the shell docks

`demo/layout/SidebarDock.vue` (`#rail` block ~`:415`) AND `demo/layout/BottomDock.vue` (`#rail`
block ~`:372`) — DELETE the `<DockStack mode="facets" :core="Boxes" …>` mount from BOTH `#rail`
slots (the broken half-rendered carousel that collides with the dock content — RESEARCH-1 A1).
The nav-facet context re-homes onto the in-dock tabs facility (the existing `<DockSection>` /
`<DockLayerGroup>` the shell already composes) OR the fission split (II.2) — there is no
orphaned carousel. (Keep the `<DockStack mode="stack">` macOS-fan in stories that genuinely
want the hover-expand stack — it is the `mode="facets"` carousel that is broken; the
clean-break removes it from the SHELL nav docks specifically.)

### II.5 — A10: the gallery TabBar is ONE GlassDock + tabs facility, no real names

`demo/stories/dock/examples/TabBar.vue` — REBUILD as ONE `<GlassDock>` whose content IS
`<SegmentedTabs>` (the library tabs facility, variant `pill`) + an in-dock "+" `<DockIconButton>`.
DELETE the hand-rolled `.tb-dock` + `.tb-sheet` two-plate facsimile (RESEARCH-1 A10: "two docks
in one"). The compose sheet is the dock MORPHING/SPLITTING (II.2 fission), not a second plate.
Replace ALL real names: `Home/Search/Explore/Profile` → `Tab 1/2/3/4`; `New Note/New List/New
Photo` → `Action A/B/C`; the fission demo's `Ray Zeisz` → a generic glyph. Every gallery dock
rides the §I re-tuned WEIGHTY register (center-out, dialed-back blur) — A10's "none smooth, no
inertia, no grow/shrink, docks do not split" is the §I + §II fix applied to the gallery surfaces.
ONE GL context per route (the dock-stage aurora budget). Gallery demonstrates a REAL split
(II.2) — a control detaches + goos, not a downward grow.

---

## MOVE III — surface / trigger / recolor hygiene (A7·A8·A11 + the warm-chromatic dock ink)

### III.1 — A7: a dropdown must NOT recolor the entire dock

`src/styles/dock/morph.css:390-398` — `.glass-dock:has([data-state="open"])` repaints the WHOLE
plate to the floating tier when ANY descendant overlay opens (live-confirmed: 44%α warm-cream →
80.8%α floating, RESEARCH-1 A7). DELETE this rule (the whole-plate recolor). A dropdown opening
must leave the dock plate INVARIANT; at most the TRIGGER lifts (the trigger's own
`:focus`/`[data-state=open]` recipe in `dock-controls.css`, already present). Keep the
`[data-held]` (slider-drag) lift (`:371-384`) — that is a legitimate held-cursor cue, not the
bug.

| # | file:line | HEAD | NEW |
|---|---|---|---|
| A7 | `morph.css:390-398` | `.glass-dock:has([data-state="open"]) { background: …floating…; border-color: …; }` | **DELETE the rule** (plate invariant to descendant overlay open-state) |

(Fence: if a future consumer wants an open-state lift, it is TRIGGER-scoped, never the dock root.)

### III.2 — A8: unify the dock overlay-trigger family

`src/components/custom/dock/` — three divergent trigger contracts: `DockDropdownTrigger`
(hover-scales), `DockSelectTrigger` (does NOT scale, "so content anchors smoothly"), and the
popover trigger (a raw `DockIconButton`, hover-scales) → the popover misaligns vs the dropdown
(RESEARCH-1 A8). UNIFY:

- Mint a NEW `src/components/custom/dock/DockPopoverTrigger.vue` mirroring `DockDropdownTrigger`
  (a `PopoverTrigger` reka primitive emitting the shared `.dock-trigger` class). Export it from
  the dock barrel + `/dock` subpath.
- Introduce ONE shared `.dock-trigger` recipe in `dock-controls.css` (consistent size/padding/
  anchor/chevron/hover register, **hover-scale OFF on all three** so portaled content anchors
  smoothly — the SelectTrigger's documented reason generalized to all). `DockDropdownTrigger` +
  `DockSelectTrigger` + `DockPopoverTrigger` all compose `.dock-trigger` (the dropdown-trigger
  drops its hover-scale onto the shared no-scale register — clean break, no alias).
- Result: a popover trigger inside a dock IS a dock trigger — byte-identical geometry + style +
  baseline alignment to the dropdown trigger.

### III.3 — A11: bigger pill padding + the vertical pill geometry

`src/styles/tokens/` (the `--dock-density-*-padding-*` base tokens read by density.css) — lift
the inline/block pad floor for a generous liquid pill (the vertical 59px-around-40px sliver →
a softer capsule). The comfortable rung (`:165-211` density.css reads
`--dock-density-comfortable-padding-inline: 0.5rem` / `-block: 0.375rem`):

| # | token (declare/raise in tokens) | HEAD | NEW | effect |
|---|---|---|---|---|
| P1 | `--dock-density-comfortable-padding-inline` | `0.5rem` | `0.75rem` | +8px total inline breath → generous pill |
| P2 | `--dock-density-comfortable-padding-block` | `0.375rem` | `0.5rem` | softer block breath |
| P3 | compact/spacious/audacious inline pads | (proportional) | scale ~+50% in lockstep | the whole family breathes |

(The `--dock-control-safe-inset` 10%/side painted-plate inset stays — A11 is the OUTER pill pad,
the inset is the inner plate clearance; both contribute the "generous warm-cream breath" read.)
The vertical pill radius stays `--radius-dock` (9999px clean capsule); the wider inline pad +
the I.1/I.2 center-out morph give it the soft-capsule read, not a sliver. Verify the
collapsed circle stays 1:1 (the `aspect-ratio:1` summary square + symmetric collapsed pad —
`morph.css:195-208` reads `--dock-pad-collapsed` off the raised block pad, so the circle
tracks the new pad automatically).

### III.4 — the warm-chromatic dock tint ink (the dock-specific gray, RESEARCH-3 keystone)

The dock self-engage (`morph.css:426-447`) mixes the thin 0.42-alpha plate toward near-black
`--foreground` → darkens L with chroma DEAD-FLAT (C ≈ 0.0075 at the 20% AA engage — the gray
dock). Mint a warm-CHROMATIC dock ink so the darken RAISES chroma (warm material, never gray):

| # | file:line | HEAD | NEW |
|---|---|---|---|
| D1 | `tokens/glass-fx.css` (`:root` light, beside `--glass-tint-ink:162`) | — (mint) | `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h);` |
| D2 | `dock/morph.css:427` | `--glass-tint-source: var(--glass-tint-ink);` | `--glass-tint-source: var(--glass-tint-ink-dock);` |
| D3 | `tokens/glass.css:175` | `--glass-opacity-dock: 0.42;` | `--glass-opacity-dock: 0.50;` |
| D4 | `tokens/dark-arm.css` (dark dock-tint scope, beside `--glass-tint-strength-aa:296`) | (dark reads `--glass-tint-ink` = light-cream) | `--glass-tint-ink-dock: oklch(from var(--foreground) 0.90 0.045 h);` |

- D1 keystone: `oklch(from var(--foreground) 0.42 0.05 h)` — extract the foreground hue/chroma,
  lift chroma to 0.05 (well above foreground's 0.0062), drop L to 0.42 (the darken anchor). At
  the 20% AA engage the plate yields **C 0.0161 (2.1× HEAD) at H 61.9°, L 0.869** — a WARM
  material darken, AA improves to 11.7:1. The `oklch(from …)` is the house warm-ink idiom
  (BB.W-DARK-INK-WARM dark surface-tint precedent — NOT a new mechanism). Outer mix stays
  `color-mix(in oklab)` (the glass-tint family); the `oklch(from)` is the INK SOURCE.
- D2: the `:where(.glass-dock)` self-engage reads the NEW dock ink, not the FROZEN global
  `--glass-tint-ink` (W-DARK-MATERIAL's whole-system register — re-pointing it globally would
  collide with the dark arm + every content tier). ONE dock tint source, ONE global ink,
  file-line-disjoint (no-dual-path).
- D3: lift the dock base alpha 0.42→0.50 (base composite C 0.0078→0.0088, closing the gap before
  any tint). Stays the lightest chrome tier (below resting 0.65). **Decide on the live capture:**
  if 0.50 reads too opaque, keep 0.42 and lean on D1 alone (the engaged dock — the user-visible
  state — clears the floor at C0.0095 at the 4% floor). D1 is load-bearing; D3 is margin-insurance.
- D4: dark §2c lockstep — the dark dock lifts toward warm-luminous cream (L 0.90, C 0.045), the
  mirror of the light darken. Dark `--glass-tint-strength-aa` stays 12% (FROZEN, W-DARK-MATERIAL).
- **FROZEN (do NOT touch):** the content/overlay global `--glass-tint-ink`, the strength
  floor/aa clamp geometry, the opacity/blur-radius ladder, `--glass-saturate-*`, the in-srgb
  `--surface-tint-*` family (AW.W26), `--glass-border-dock`, every spring/scale token NOT named above.

---

## ACCEPTANCE CRITERIA (the binding bar — fresh live capture, both modes, Chromium + Safari 26)

**Surface (S1–S5):** S1 dock plate getComputedStyle→OKLab resolves H ∈ [45,85]°, C ≥ 0.010
light / 0.008 dark, BOTH modes, NEVER gray (the warm-chromatic ink). S2 all six §L1 layers on
the body plate + a detached fission piece + the goo neck. S3 collapsed dock is a 1:1 circle
(both orientations), vertical pill a clean warm capsule. S4 generous warm-cream breath (the
A11 pad). S5 dynamic-darken engages over synthetic-white worst-case (darkens warm, AA clears).

**Motion (M1–M6):** M1 the spring reads WEIGHTY + OVERSHOOTING (response 0.56, ζ 0.58 — a
frame-series shows the box arrive PAST target then settle over the ~0.78s clock, NOT a snap).
M2 `transform-origin: center` both axes + the root re-center translate — the morph grows
SYMMETRICALLY center-out, shrinks to centroid (NO edge-anchored growth, verified on a
left-anchored dock). M3 the self-blur peaks ≤1.25px + clears by expand-t 0.5; at REST 0px;
backdrop structure reads through. M4 collapsed icons center-aligned; the entrance SYNCED to the
morph clock + radiates center-out (icon + dock arrive together, NO right-to-left desync). M5
collapse-delay 3600ms; hysteresis holds (no thrash at a moving edge). M6 all motion
compositor-only (`proof:no-layout-animation` GREEN) + PRM-carved.

**Fission (F1–F7):** F1 the SHIPPED engine WIRED (not re-minted) — `<DockGooFilter>` mounted
once, GlassDock calls `useDockFission` with registered pieces. F2 rest = ONE crisp pill goo
OFF; split CARVES it. F3 a control DETACHES along its vector, the neck STRETCHES/THINS/SNAPS,
lands as its OWN dock beside/above/below; arbitrary N in staggered sequence. F4 merge reverses
on the SAME loop + the gold merge-splash. F5 SAFARI — the goo neck PAINTS on Safari 26 (regular
filter + sRGB + non-zero host + generous region + plus-lighter degrade; the live Safari capture
is binding). F6 items DRAGGABLE — a pull stretches the neck (morph-more-on-move), resists,
flings/commits; keyboard roving-tabindex intact. F7 compositor-only + PRM sync-seat.

**Gallery (G1–G3):** G1 every gallery dock smooth + inertial + center-out, blur dialed back.
G2 a REAL split demonstrated (not a downward grow). G3 the tab-bar is ONE `<GlassDock>` + tabs
facility, generic labels, no real names.

**A1/A7/A8 (R1–R3):** R1 no broken rail in either shell dock. R2 a dropdown open does NOT
change the dock plate color (plate invariant to descendant overlay open-state). R3 popover +
dropdown triggers UNIFIED (identical geometry + style + alignment, one `.dock-trigger` register).

---

## GATE IMPACT

- **`proof:no-gray` — EXTENDED IN PLACE** (the dock-plate-with-tint hole; NO new gate, NO new
  KEY). Add the four W-DOCK witnesses (RESEARCH-3 §2, verbatim): `dock-plate-warm-at-aa-engage`
  (the self-engaged dock plate composites C ≥ 0.010 warm at H ∈ [45,85] — born-RED on HEAD's
  C0.0075 gray), `dock-tint-ink-is-warm-chromatic` (the dock ink C ≥ 0.030 — anti-regress, reds
  a revert of D2), `dock-self-engage-reads-dock-ink` (morph.css reads `--glass-tint-ink-dock`),
  `dock-tint-ink-dark-lockstep` (the dark §2c twin present). Born-RED on HEAD, GREEN after the fix.
- **`proof:no-layout-animation` — GREEN by construction.** The center-out translate (I.2), the
  child scale (I.4), the self-blur clamp (I.3), the fission necks, the drag follow are ALL
  compositor channels (transform/translate/scale/opacity/filter/`--*`). No layout property
  animates. (Verify the new `translate`/`scale` lines are in the compositor allowlist; they are
  by property name.)
- **`proof:animation-coherence` (EASING-TABLE-BOUND) — GREEN.** The `dock` row is RE-TUNED on
  the existing table (no new spring minted); the regen re-derives the `linear()` + duration.
- **`proof:spring-tokens-synced` — GREEN after regen** (the emitted `--spring-dock` +
  `--spring-dock-duration` re-derive from the table; run the regen + commit the emitted CSS).
- **`proof:dock-rail-realize` R1 / `proof:no-dual-path` — GREEN.** Removing the broken facets
  rail (II.4) deletes a mount, not a primitive; no second rail/fission SFC is minted (the
  shipped engine is WIRED). `DockPopoverTrigger` is a NEW trigger in the unified family, not a
  fork (it composes the shared `.dock-trigger`).
- **`proof:glass-cal` / `proof:glass-depth` / `proof:dark-material` / `proof:adaptive-glass` —
  UNTOUCHED.** The radius/level/strength-clamp/global-tint-ink axes are byte-frozen;
  `--glass-tint-ink-dock` is a NEW dock-scoped token.
- **`proof:dock-unify` / `proof:dock-sections` — verify GREEN.** The shell-dock rail removal +
  the trigger unify must not break the nav-pattern census; the FEATURE_EXEMPT/SHOWCASE/SHELL
  matrix may need the TabBar re-classification (it becomes a real `<GlassDock>` — re-census it).
- **The binding π — `tests-visual/dock-core.spec.ts`** (the wave's own, born-RED — see
  W-DOCK-CORE.md). Plus re-point the existing `nav-dock-fix.spec.ts` dock-plate OKLab readback
  to the SELF-ENGAGED state (sample over a bright backdrop / `--glass-backdrop-luma` high).

## A11y / PRM / Safari rules (binding)

- **PRM-carved everywhere.** The morph/stagger/fission/drag all snap to endpoint under
  `prefers-reduced-motion: reduce` — the gesture confirms, the physics off, the fade survives.
  The self-blur PRM carve (`morph.css:494-499`) is kept. The fission `seatSync()` + the
  `useLiquidFlex`/`SpringProgress.respectReducedMotion` carry it. The child scale + center
  translate are stripped by the global PRM gate (transform set).
- **Roving-tabindex + keyboard.** The draggable dock items keep the roving-tabindex (exactly one
  tabstop, arrow-keys move + activate, Home/End jump). The fission split is keyboard-reachable
  (a `split`/`merge` control or Enter/Space on a split-eligible item). `DockGooFilter` host is
  `aria-hidden` + `focusable=false`. The dock root stays presentational (no `aria-expanded` on
  the root — on the trigger child per the dock aria contract).
- **Safari.** The goo is the REGULAR `filter:url(#dock-fission-goo)` graph (feGaussianBlur +
  feColorMatrix sRGB threshold + feComposite — all WebKit-supported), NEVER `backdrop-filter:url()`
  (WebKit bug 245510). `color-interpolation-filters="sRGB"`, non-zero 1×1 host, `-50%/200%`
  region (all present in `DockGooFilter.vue` — verified). `plus-lighter` (Safari 16.4+) for
  ripple/splash, degrading to a plain warm overlay off-engine. The `oklch(from …)` dock ink +
  `color-mix(in oklab)` + `backdrop-filter` are all cross-engine. The `:has()` / `:nth-child(of)`
  selectors are Safari 16.4+. **ALL fission + morph motion verified painting on Safari 26 — the
  live Safari capture is the binding truth (RESEARCH-2 §3.3 / F5).**

## FENCES (binding)

NO re-fork / no-dual-path (re-point the dock tint onto a NEW token; WIRE the shipped fission/
drag/orientation engines — a 2nd rail SFC reds `proof:dock-rail-realize`, a duplicate spring
reds `proof:animation-coherence`). NO gray (the dock tint darkens toward a warm-CHROMATIC ink).
Token-first (every change is a token VALUE or a NEW token on an existing seam; the spring re-tune
is the one table row + regen). Compositor-only · PRM-carved · Safari-compatible. §2c per-mode
lockstep (light + dark dock inks move together; dark AA 12% FROZEN). presets-in-consumers (the
warm-cream dock identity evolves in `src/styles/`; rail/facet HUES are `--section-color-N`
identities READ by the demo). NO legacy (clean break, no alias — the broken rail, the whole-plate
recolor, the hand-rolled TabBar plates, the `translateY` rise, the index-cascade stagger are all
DELETED, not aliased). box-INVIOLATE (fission is a CONSUMING seam beside the morph engine,
never editing `dockMorphContext`/`dockMorphMeasure`/`DOCK_SPRING`).
