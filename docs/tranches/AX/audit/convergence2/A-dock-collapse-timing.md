# A-dock-collapse-timing — Dock collapse: shrunken-icon fade-OUT delay (DK1) + in-flow page-flow + position semantics (DK3)

**Lane** AUDIT (source) · **Severity** major · **Verdict** augment-existing-wave (DK1 → **W01 re-open**;
DK3-pageflow → **W45 augment**) · HEAD `5cf2980` (3.8.0+W52)

Source-audit of the dock collapse morph against DK1 ("the shrunken/collapsed icon does not
appear for a while — tune so it appears with NO added delay") and DK3 ("collapsible dock should
NOT modify page flow; the icon is missing in the collapsed state"). Live-verified on the running
`/navigation/dock` demo (Playwright rAF probe + deterministic CSS-state injection).

---

## DK1 — the collapsed icon fades OUT during collapse, pops in only at settle (ROOT CAUSE)

### The mechanism (source-true)

The collapse morph drives ONE scalar `--dock-morph-t` (0→1) via the W02 `SpringProgress`
(response 0.32, ζ 0.7 — `dockMorphContext.ts:39`). The child stagger is a pure `calc` opacity
ramp keyed off the inheriting directional `--dock-expand-t`:

- `dock.css:406-408` — under collapse, `.glass-dock:not(.vertical).collapsed[data-morphing]` sets
  `--dock-expand-t: calc(1 - var(--dock-morph-t))`. So as the spring runs `--dock-morph-t` 0→1,
  `--dock-expand-t` runs **1→0**.
- `dock.css:908-925` — EVERY active pane's direct children (the outer `.dock-layer.is-active > *`
  AND the inner `.dock-layer-item-host.is-active > *`) get
  `opacity: clamp(0, (var(--dock-expand-t) − onset) / var(--dock-stagger-window, 0.55), 1)`.

On collapse, the **`--summary` pane becomes `.is-active`** (`GlassDock.vue:501` —
`{ 'is-active': !visualExpanded }`). The summary's single child (the collapsed Home glyph,
child-index 1, onset 0) therefore computes `opacity = clamp(0, --dock-expand-t / 0.55, 1)`. With
`--dock-expand-t` running 1→0, the icon's opacity runs **1.0 → 0.0** over the back half of the
morph, then SNAPS back to 1 only when `[data-morphing]` clears at spring settle (the
`:not([data-morphing])` rest state carries no stagger authority → default cascade → 1).

### Live confirmation (deterministic CSS-state injection on the running demo)

Driving the dock's exact collapse-morph CSS state (`.collapsed` + `data-morphing` + `--summary`
`.is-active`) and ramping `--dock-morph-t`, the measured collapsed-summary-icon opacity:

| `--dock-morph-t` | 0 | 0.25 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 |
|---|---|---|---|---|---|---|---|---|---|
| summary icon opacity | 1.0 | 1.0 | 1.0 | 0.91 | 0.73 | 0.55 | 0.36 | 0.18 | **0.0** |

The icon is FULLY TRANSPARENT (opacity 0) at the end of the collapse spring's primary travel,
then pops to 1 on `[data-morphing]` clear. With `--spring-dock` (0.32, 0.7, ~+4.6% overshoot)
the settle envelope is ~0.5–0.6s, so the user sees the collapsed pill arrive with a BLANK center
for roughly half a second, then the Home glyph appears abruptly. That IS DK1 — "the shrunken icon
does not appear for a while."

### Why this is wrong (the gestalt diagnosis)

The stagger ramp `(expand-t − onset)/window` is an **expand-direction REVEAL** — it was authored
(W01 §Scope.1 / AW.W3) to fade the FULL pane's controls IN as the box grows (outer→in), and OUT
as it collapses. That direction is CORRECT for the `--full` pane: full is the OUTGOING pane on
collapse, so fading its controls out is right. But the rule is applied SYMMETRICALLY to BOTH panes
via the unified `.is-active` vocabulary (`dock.css:908-909`), and the **`--summary` pane is the
INCOMING pane on collapse** — it should fade IN (track `1 − --dock-expand-t`, i.e. `--dock-morph-t`
directly), not OUT. The single `--dock-expand-t` scalar conflates "how expanded is the box" with
"how revealed is THIS pane's content," but those are OPPOSITE for the two panes during a collapse.

The W01 redress doc (`audit/W01-redress.md §4`, "Collapse" paragraph) traced the BOX morph
collapse correctly but never noticed the summary-child stagger runs inverted — its concern was the
box-vs-content single-clock co-temporality, not the per-pane reveal DIRECTION. The W01 gate
`proof:dock-animation-live` asserts box-chrome and child-onset are co-temporal (lead/lag ≤ 1 frame)
but does NOT assert the incoming pane's children fade IN — an inverted-but-co-temporal ramp passes
the gate. So DK1 shipped GREEN under W01's "complete."

### The fix direction (gestalt, no patch)

Key each pane's stagger ramp to ITS OWN incoming-ness, not the global `--dock-expand-t`:
- the morph-region's CURRENT-active pane should reveal as `t` advances regardless of collapse vs
  expand. The cleanest expression: the stagger reads a **per-pane reveal scalar** that is
  `--dock-morph-t` (0→1 incoming) for whichever pane is becoming active, decoupled from the
  box-directional `--dock-expand-t` (which stays the right driver for box chrome — bg/border/
  padding/radius interpolate between the collapsed and expanded ENDPOINTS, so those legitimately
  ride the directional scalar). Concretely: give the summary/incoming pane's children
  `--dock-stagger-reveal: var(--dock-morph-t)` and the full/expanded pane
  `--dock-stagger-reveal: var(--dock-expand-t)` — or, simpler, scope the stagger rule to read
  `--dock-morph-t` for the pane the swap is REVEALING (the orchestrator already knows
  `currentLayer` vs `leavingLayer`). Either way the incoming pane's icon ramps 0→1 as the box
  settles, appearing WITH the pill, no added delay. This is a ~4-line CSS authority correction in
  `dock.css` (the stagger block) — strictly W01's morph-stagger territory.

---

## DK3 — collapsible dock IS in document flow + the misnamed `position="inline"` default

### What "modifies page flow" means at source

The default `<GlassDock>` (`GlassDock.vue:140` — `position: "inline"`) renders
`.dock-inline { margin: 0 auto }` (`dock.css:672-674`) with `position: relative` — a **centered
in-flow block**. The collapse morph shrinks the box width 216px ↔ 55px (live-measured). Two
page-flow consequences:

1. **`margin: 0 auto` recomputes the auto side-margins every morph frame.** Live-measured the auto
   margins swing `0 515.5px` (expanded) ↔ `0 525.5px` (collapsed) as the box width morphs — a
   per-frame margin reflow on the layout (`getBoundingClientRect`-visible). In a flex
   `justify-center` card (the demo's wrapper, `dock.vue:83`) the parent box does not change size,
   so it READS fine there; but in a plain block-flow column the in-flow width-morph IS in the
   document layout and reflows surrounding content. The user's "should NOT modify page flow" is the
   iOS-dock expectation: a collapsible dock should FLOAT above content (overlay), not occupy a
   reflowing in-flow box.

2. **`position="inline"` is a misleading name.** It does NOT mean `display:inline` — it renders
   `position:relative` + `margin:0 auto` (a block in normal flow). A consumer reaching for the
   floating/overlay iOS dock idiom gets an in-flow block whose width-morph participates in flow.
   The only non-flow option today is `position="fixed"` (`GlassDock.vue:462` — `fixed bottom-…
   left-1/2 -translate-x-1/2`), which pins to the viewport. There is no "float in place / overlay
   without leaving a hole" mode.

### The fix direction

DK3-pageflow folds into **W45** (the dock region-model wave) NOT as a stagger fix but as the
in-flow/position-semantics question W45 already brushes (W45 makes the morph-region's aperture the
only animating box). The gestalt: the morph-region's width animation should not reflow the dock's
own outer box in normal flow — either (a) the dock reserves its EXPANDED width footprint and the
aperture animates INSIDE it (no outer reflow; the pill sits left-aligned within the reserved span),
or (b) a documented `position="floating"`/overlay mode where the dock is taken out of flow
(absolute/fixed to a containing anchor) so the morph never touches page flow. RATIFY (user/design
call): whether the collapsible dock's default should remain in-flow centered (status quo, demo-only
read) or pivot to a non-reflowing overlay default. This is a **needs-user-decision** sub-point
folded as a W45 open question — the persistent-region restructure (W45) is the natural home because
it already reauthors the dock's root layout (`[persistent][divider][morph-region]`).

### DK3 "the icon is missing in the collapsed state"

This is the SAME root cause as DK1 — the collapsed icon is not literally absent from the DOM (the
`#collapsed` slot renders the Home glyph), it is rendered at **opacity 0** for the duration of the
collapse morph by the inverted summary-stagger (the table above). The user reads "missing" because
the pill arrives blank. Fixing DK1 (the summary-pane reveal direction) resolves the "missing icon"
report. NOTE: if a consumer does not author a `#collapsed` slot, the summary pane is genuinely
empty — but the demo DOES provide it (`dock.vue:90-92`), so the live "missing" is the opacity bug,
not an absent slot.

---

## DEDUP — which wave owns each

| Defect | Owner | Why |
|---|---|---|
| **DK1** (summary fade-OUT) + DK3 "icon missing" | **W01 re-open** (augment) | The bug is in the morph-stagger CSS authority (`dock.css:908-925` + `:406-408`) + the `--dock-expand-t` direction — W01's exact territory (W01 §Scope.1 "the child stagger" + the morph driver). W05 is explicitly OUT of bounds on `dock.css`/`GlassDock.vue` (W05:309). W45's FileBounds explicitly EXCLUDE the morph-driver/stagger rows ("registers AROUND the settled spring, does NOT retune the morph curve"). W01 is marked `complete` but this is the SAME cardinal-lesson pattern as the W09/W05 re-opens already in CONVERGENCE-PLAN — de-mark W01 → live-pending, add the summary-stagger-direction arm + a gate clause asserting the INCOMING pane's children fade IN (not just co-temporal). |
| **DK3** (in-flow page-flow + position semantics) | **W45 augment** (+ needs-user-decision) | The page-flow / `position="inline"` semantics are a ROOT-LAYOUT question; W45 already reauthors the dock root layout (`[persistent][divider][morph-region]`). Add a fold: the morph must not reflow the dock's outer box in normal flow (reserve expanded footprint OR a non-reflowing overlay mode). The in-flow-vs-overlay default is a design call (RATIFY). NOT W01 (W01 is the morph CLOCK, not the layout footprint). |

### Why NOT net-new

No new wave is warranted. DK1 is a pure morph-stagger-direction correction in W01's settled stagger
block (the inverted summary reveal is a missed direction in the W01 redress, not a new capability).
DK3-pageflow rides W45's root-layout reauthor (the persistent-region wave already opens the dock
root layout). Both are augments of waves that already own the exact files.

### Cross-ref check (W45/W01/W05 per the lane brief)

- **W45** — owns the persistent-region/page-flow STRUCTURE (root layout reauthor) → DK3-pageflow
  augment. Does NOT own the summary-stagger timing (FileBounds exclude the morph-driver/stagger).
- **W01** — owns the single-scalar morph + child stagger → DK1 re-open. Marked complete; the
  redress missed the summary-pane reveal inversion.
- **W05** — owns the `--spring-*` vocabulary, OUT of bounds on `dock.css`/`GlassDock.vue`. NOT an
  owner of either DK1 or DK3. (W05's collapse work is the BouncyToggle press double-spring, a
  different surface.)

---

## Evidence index (file:line)

- `src/styles/dock.css:406-408` — `--dock-expand-t: calc(1 - --dock-morph-t)` on collapse (the 1→0 driver).
- `src/styles/dock.css:908-925` — the active-pane child stagger opacity ramp keyed off `--dock-expand-t`.
- `src/styles/dock.css:939-958` — the per-child onset ladder (`--dock-stagger-step`).
- `src/components/custom/dock/GlassDock.vue:500-506` — the `--summary` pane `.is-active` on `!visualExpanded` + the `#collapsed` slot.
- `src/components/custom/dock/GlassDock.vue:140,462,672-674` — `position:"inline"` default → `.dock-inline { margin:0 auto }` (the in-flow centered block).
- `src/components/custom/dock/composables/dockMorphContext.ts:39` — `DOCK_SPRING` response 0.32, ζ 0.7 (the settle envelope).
- `docs/tranches/AX/audit/W01-redress.md §4` — the W01 collapse trace that handled the BOX but missed the summary-stagger inversion.
- Live (Playwright, `/navigation/dock`, demo dock #1): collapsed-summary-icon opacity ramps 1.0→0.0 across `--dock-morph-t` 0→1; box morphs 216↔55; `margin: 0 auto` swings 515.5↔525.5px per morph.
