# BA fleet — lane: dock-rail-seat

R8-1 + R8-6 (rail half): the rail seat + fan-out contract. AUDIT-ONLY; live-probed on
:5199 (dark mode) at `/substrates/aurora` (a multi-facet section so both shell docks
render a live `<DockRail>` strip). Evidence pngs banked beside this report.

## TL;DR

The current rail is **NOT a rail seated at a divider seam** — it is a *floating
detached carousel* (the AZ.W-RAIL3 "third-rail redirect") anchored to the dock's
LEADING/CENTER edge, hanging the facet chips in a separate strip joined to the dock by
a thin 40px connector line. The user mandate (R8-1) is a fundamentally different
geometry: the rail must **anchor AT the dock's own divider seam** (the ℱ
`<DockSeparator>` on the sidebar; the sidebar-toggle/nav `<DockSeparator>` on the bottom
dock) and **overrun BOTH sides** of the dock as a continuous line, with the chips
**flush up-against** that line (macOS-fan-out, NOT curved), retracting INTO the rail on
collapse leaving a SLIGHT protrusion. This is a re-seat + re-conceive, not a tweak — the
midline seat in `src/styles/dock/rail-extend.css` was itself a workaround (commit
83ea0ef9) for an h1-overlap that the new contract makes moot.

R8-6's "round buttons partially cut off" is a SEPARATE mechanical defect on the same
band: the dock control's hover/press round plate is paint-clipped by `.glass-dock`'s
`contain: paint`.

---

## 1. Current live geometry (MEASURED, dark mode, /substrates/aurora)

Both shell docks render a 2-chip strip (Fields / Creatures). Raw
`getBoundingClientRect` (CSS px), banked in `dock-rail-seat-live-dark-full.png`:

### SIDEBAR (vertical) dock
```
dock box           x:12  y:16   w:59  h:609   (right edge x=71, midline y≈320)
ℱ-home separator   x:28  y:78   w:28  h:1     ← the TOP divider seam (the F)
gear separator     x:28  y:563  w:28  h:1     ← the BOTTOM divider seam
railSlot           x:71  y:290  w:145 h:62    ← anchored at dock RIGHT edge (inset-inline-start:100%),
                                                 VERTICAL-CENTER (translate -50% about y≈320)
strip              x:115 y:290  w:101 h:62    ← chips start 44px right of dock edge (40px connector + margin)
chips              2 × ~26px tall, stacked in a COLUMN
```
The rail seats at the dock's **vertical midline (y≈290–352)** — **272px below the ℱ
separator at y=78**. There is zero relationship between the rail seat and either
divider seam. The chips float in the trailing gutter joined by a 40px horizontal
connector.

### BOTTOM (horizontal) dock
```
dock box           x:603 y:833 w:235 h:55    (top edge y=833, leading edge x=603)
nav separator #1   x:664 y:847 w:1  h:28     ← divider seam (after prev arrow)
nav separator #2   x:729 y:847 w:1  h:28     ← divider seam (before category arrows)
railSlot           x:603 y:759 w:183 h:74    ← anchored at dock LEADING edge (inset-inline-start:0),
                                                 ABOVE the dock (inset-block-end:100% → bottom=833=dock top)
strip              x:603 y:759 w:183 h:30    ← chips float ABOVE the dock
chips              2 × ~26px tall, in a ROW
connector ::before block-size:40px vertical line dropping from strip down to dock top
```
The rail anchors at **x=603 (the dock's leading edge)** — NOT at either divider seam
(x=664, x=729). The chips float ABOVE the dock joined by a single vertical connector
line dropping to the dock's leading-control center.

`--dock-rail-extend-length` resolves to `calc(2.5rem * 1)` = 40px (the connector
length, both orientations).

### What the user sees (ground captures corroborate the measurement)
- `ground/R8-01-dock-rail-misaligned-a.png` (sidebar): Modals/Floating/Disclosure
  chips float in a column DISCONNECTED beside the dock, joined by a thin line.
- `ground/R8-01-dock-rail-misaligned-b.png` (bottom): the chips float ABOVE the dock,
  with a thin vertical line dropping from "Modals" to the dock's leading edge — the
  line does NOT align with any dock divider, and overruns only ONE side (above).
- `ground/R8-09-docks-lack-sections.png`: Fields/Creatures float above-left,
  disconnected; the bottom dock body is one undifferentiated run.

---

## 2. Root cause (file:line)

The whole geometry lives in **`src/styles/dock/rail-extend.css`** + the
**`#rail` slot in `GlassDock.vue`** (renders the slot as a `.glass-dock-frame` sibling,
abs-positioned, OUTSIDE the dock's `contain: paint`).

| seat axis | file:line | current rule | why it's the defect |
|---|---|---|---|
| vertical anchor edge | `rail-extend.css:85–98` | `.vertical .dock-hairline-slot { inset-inline-start:100%; inset-block-start:50%; translate:0 -50% }` | seats at the dock's trailing edge + **vertical CENTER** — not at the ℱ separator. The `inset-block-start:50%` is an EXPLICIT workaround (the inline comment: "A top-anchored seat collides with the page H1/breadcrumb band") for the AZ.W-RAIL3 h1-overlap, re-seated at commit 83ea0ef9. |
| horizontal anchor edge | `rail-extend.css:99–106` | `:not(.vertical) .dock-hairline-slot { inset-block-end:100%; inset-inline-start:0 }` | seats at the dock's TOP edge + **leading (x=0)** — not at a nav `<DockSeparator>`. |
| the "connector" geometry | `rail-extend.css:139–162` | `.dock-hairline-extend::before` paints a 40px connector line + the strip floats away from it | the connector is a *tether to a detached carousel*, not a *seam line the chips sit against*. The whole detached-carousel paradigm is the AZ.W-RAIL3 "third-rail redirect" (the chips ARE the facets, floating outside the dock — `DockRail.vue:9–46` doc comment). |
| the chip layout | `rail-extend.css:178–207` | `.dock-hairline-strip` is an overflow-`auto` scroll carousel offset from the line | the chips are a separate scroll strip, not flush-against-the-line fan-out tiles. |

**The mechanical R8-6 sub-defect** (the round-button half-circle cutoff): the dock
control's hover/press round plate is clipped by **`.glass-dock { contain: paint }`**
(`src/styles/dock/shell.css:83`). On the bottom dock, `--dock-padding-block` = 6px
(`shell.css:103`) so a control sits ~6px from the dock's top/bottom edge; the hover
`scale: var(--scale-hover-dock)` lift (`dock-controls/icon-button.css:76`) + the
`:active` darkened fill (`icon-button.css:84`) paint a full circle that overruns the
55px-tall dock box and gets paint-clipped at the edge → the dark half-circle in
`ground/R8-06-dock-buttons-cutoff-rail-fanout.png`. Same containment class as the
original R4-1 black-blob, now biting the dock's OWN controls, not the rail.

---

## 3. The mandate — target geometry (ASCII)

The user's words: *"placed where the dividing line for the ℱ is, or in the dividing
line for the sidebar in the bottom dock. The rail should extend partially outside of
the other side of the docks, too."* + R8-6: *"the RAIL items should be alongside, up
against, the rail when they fan out — otherwise they all collapse and the rail shrinks,
but still SLIGHTLY protrudes — SOMEWHAT akin to the macOS dock fan out, though not
curved."*

### SIDEBAR (vertical) dock — EXPANDED
The rail is a HORIZONTAL line anchored AT the ℱ separator's Y, overrunning BOTH the
left AND right edges of the dock; the chips sit flush ALONGSIDE the line in the
trailing gutter.
```
            ┌─────┐
   ┄┄┄┄┄┄┄┄┄┤  ℱ  ├┄┄┄┄┄┄┄┄┄┄  ← rail line AT the ℱ-separator Y (y=78),
   (overrun)└──┬──┘  (overrun)     overruns BOTH sides of the dock
            ┌──┴──┐  ┌──────────┐
            │ ico │  │ ▢ Fields │  ← chips FLUSH alongside the rail line,
            ├─────┤  ├──────────┤     up-against it (fan-out), not 44px adrift
            │ ico │  │ ✦ Creatu │
            ├─────┤  └──────────┘
            │ ⚙   │
            └─────┘
```

### SIDEBAR — COLLAPSED (chips retract INTO the rail, slight protrusion)
```
            ┌─────┐
   ┄┄┄┄┄┄┄┄┄┤  ℱ  ├┄┄▸          ← rail shrinks; chips retracted INTO it,
            └──┬──┘                a SLIGHT protrusion remains (the ▸ stub)
            ┌──┴──┐
            │ ico │
            └─────┘
```

### BOTTOM (horizontal) dock — EXPANDED
The rail is a VERTICAL line anchored AT a nav `<DockSeparator>` X, overrunning BOTH the
top AND bottom edges of the dock; the chips fan out flush above (or below) the line.
```
                   ┆ ▢ Fields  ✦ Creatures   ← chips fan out flush against the line
                   ┆                            (up-against it, macOS-fan-out, not curved)
        (overrun)  ┆  (overrun)
   ┌────────┬──────┼──────┬──────────┐
   │ ☰  ‹ › │      ┆      │  «   »    │  ← rail line AT a divider seam (x=664 or 729),
   └────────┴──────┴──────┴──────────┘     overruns BOTH top AND bottom edges of the dock
                   ↑ rail anchored to the seam, NOT the leading edge
```

### BOTTOM — COLLAPSED
```
   ┌────────┬─────────────┬──────────┐
   │ ☰  ‹ › │      ┆▴     │  «   »    │  ← chips retract INTO the rail; the line keeps a
   └────────┴──────┴──────┴──────────┘     SLIGHT protrusion (the ▴ stub) past the edge
```

**Three load-bearing geometry changes vs today:**
1. **Anchor = the divider SEAM, not the edge.** The rail line co-locates with an
   existing `<DockSeparator>` (the ℱ-home separator on the sidebar at the top; a nav
   separator on the bottom dock). The rail and the divider are ONE line (or the rail
   IS the divider, extended past the box).
2. **Overrun BOTH sides.** Today the connector overruns ONE side (the trailing
   gutter / above). The mandate is a line that crosses through the dock and protrudes
   past BOTH the leading AND trailing (or top AND bottom) edges — the divider seam
   continued outward in both directions.
3. **Chips FLUSH against the line (fan-out), not a detached carousel.** The chips sit
   up-against the rail line — a fan of tiles butted to the seam — not a separate
   scroll strip 40px adrift. The collapse is a retraction INTO the rail (chips fold
   back behind a slight protruding stub), the macOS-dock fan-out idiom (rectilinear,
   not curved).

---

## 4. Survives vs re-seat (W-RAIL3 / W-RAIL-EXTEND piece map)

| piece | file | verdict | rationale |
|---|---|---|---|
| **R4 escape architecture** (`.glass-dock-frame` sibling + abs `.dock-hairline-slot` outside `contain: paint`) | `GlassDock.vue:303–416`, `rail-extend.css:44–73` | **SURVIVES** | The rail must paint OUTSIDE the dock's `contain: paint`/`backdrop-filter`/`overflow` clip to overrun BOTH edges. This is exactly the escape needed; the new contract leans on it harder (overrun both sides, not just one). KEEP. |
| **R1 hairline token** (`box-shadow: var(--border-hairline)`, no hard rule) | `rail-extend.css:139–144` | **SURVIVES (re-purposed)** | The rail line stays a `--border-hairline` whisper. It re-purposes from a *tether connector* to the *seam line that crosses the dock + overruns both sides*. The token stays; the geometry (length, dual-side overrun, seam co-location) re-specs. |
| **R2 one-registry binding** (`v-model:context`, no internal shadow; `useContextualDockLayers` resolver) | `DockRail.vue:80–110`, both shell docks | **SURVIVES** | The state seam (consumer-owned `v-model:context` writing the SAME router nav) is correct and must NOT be re-forked. Re-seat is pure geometry; the registry contract is untouched. KEEP. |
| **R3 `--dock-rail-extend-length` extent knob** | `rail-extend.css:30–36, 147–162` | **SURVIVES (re-semantic)** | The knob stays as the beyond-edge overrun length. NEW semantic: it now applies to BOTH sides (the line crosses the dock + protrudes by this length each side), not a one-way connector. The `extent: "beyond"\|"inset"` prop stays. |
| **R5/R6 ≥2-consumer census + shell witness** (`proof:rail-extend`) | `proof-rail-extend.mjs:236–269` | **SURVIVES** | Both shell docks remain consumers. The gate's structural arms (R1/R2/R3/R4) hold post-re-seat; ADD a seam-co-location witness (the rail anchors at a `<DockSeparator>` position, not the edge) + a both-sides-overrun assert. |
| **the midline seat** (`inset-block-start:50%; translate -50%` vertical; `inset-block-end:100%; inset-inline-start:0` horizontal) | `rail-extend.css:85–106` | **RE-SEAT (delete)** | The core defect. Replace the edge/center anchor with a divider-SEAM anchor. The `inset-block-start:50%` workaround (the h1-overlap dodge from 83ea0ef9) is moot under the new contract: a seam-anchored line at the ℱ (y=78) sits ABOVE the page title band, so the original occlusion that forced the midline seat does not recur. |
| **the detached-carousel chip strip** (`.dock-hairline-strip` overflow-auto scroll, offset from the line) | `rail-extend.css:174–207` | **RE-CONCEIVE** | The chips move from a *detached scroll carousel 40px adrift* to a *fan-out of tiles flush against the seam line*, with a collapse=retract-into-rail mechanic + slight protrusion. The scroll-overflow stays as the >budget fallback, but the rest state is flush fan-out, not a strip. |
| **the connector `::before` tether** (`rail-extend.css:139–162` length/margin) | `rail-extend.css` | **RE-PURPOSE** | The `::before` line stops being a *tether from edge to carousel* and becomes the *seam line crossing the dock + protruding both sides*. Same element, inverted role (the dock now sits ON the line, not below a connector dangling from it). |
| **DockRail.vue chip render** (the `<DockIconButton>` chip-strip template) | `DockRail.vue:113–144` | **SURVIVES (mostly)** | The chip descriptors (`items`, `is-active`, ARIA tablist) are correct; the WRAPPER layout (flush fan-out vs offset strip) + the collapse-retract behavior re-spec. The component contract (props/model/emit) is stable. |

**Net:** the architecture (R4 escape, R1 token, R2 registry, R3 knob, the component
contract) all SURVIVES; only the SEAT geometry (anchor edge → divider seam, one-side →
both-side overrun) and the CHIP layout (detached carousel → flush fan-out + collapse
retraction) re-spec. The re-seat is a `rail-extend.css` geometry rewrite + a `GlassDock`
seam-locator + a small `DockRail` layout change — no state/registry churn.

**A coupling note for the wave spec:** anchoring the rail AT a `<DockSeparator>` means
the rail-locator needs the seam's POSITION. Two clean directions (design, not impl):
(a) the rail is rendered ADJACENT to the chosen `<DockSeparator>` and reads its offset;
or (b) a `<DockSeparator>` GAINS an `extend`/rail affordance so the separator IS the
rail's anchor (the divider and the rail unify into one primitive — the more idiomatic
gestalt: a divider that extends past the dock and carries the fan-out, since the user
literally says "where the dividing line is"). Direction (b) folds R8-9's "docks lack
sections" (the section-divider model) and R8-1's "anchor at the divider" into ONE
section-divider-with-rail primitive — worth weighing in synthesis.

---

## 5. R8-6 round-button clip (the mechanical sub-defect on this band)

Distinct from the seat, but lands in this lane per the prompt's "rail half".
**Root cause:** `.glass-dock { contain: paint }` (`shell.css:83`) clips the dock
control's hover/press round plate where it overruns the tight dock box (control sits
~6px from the edge under `--dock-padding-block:6px`, the hover `scale` +`:active` fill
paint a circle past the 55px-tall box). **Remedy direction:** the dock control's
hover/active plate must not exceed the dock's inner safe area — either lift the
clip on the morph-settled axis for the control-plate band (the dock already lifts the
clip at rest expanded, `shell.css:169–174`, but the block axis stays clipped for the
horizontal dock), or floor the dock's block padding so a hover-scaled circle fits
inside the box. Token-first: a `--dock-control-safe-inset` that guarantees the
hover/active circle clears the containment edge.

---

## Evidence

- `dock-rail-seat-live-dark-full.png` — full viewport, dark mode, /substrates/aurora:
  both shell docks with the detached-carousel rail (the measured geometry).
- `dock-rail-seat-sidebar-dark.png` — sidebar dock-frame box crop.
- `ground/R8-01-dock-rail-misaligned-{a,b}.png` — the user's banked captures (sidebar +
  bottom).
- `ground/R8-06-dock-buttons-cutoff-rail-fanout.png` — the round-button half-circle
  clip + the fan-out mandate.
- `ground/R8-09-docks-lack-sections.png` — the disconnected chips + section-loss.
