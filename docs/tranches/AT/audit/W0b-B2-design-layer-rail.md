# AT.W0b — Lens B2 (frontend-design): the layer system + the rail system

A senior frontend/interaction-design pass over the `DockLayerGroup` / `DockLayer`
multi-pane container and its Figma-style switcher rail. The prior W0 six-lens audit
(L1–L6) and the W0b A1–A6 lenses are **blob-only** — they touch the dock exactly
twice in passing (A6:395 names a value.js `dock/Dock.vue` as a `WatercolorDot`
consumer context; L6:52 the same). **No prior AT lens looks at the layer/rail
system at all.** This lens is net-new surface for AT; it augments the plan by
proposing a *dock-design wave* the current AT.md does not carry (AT folds only a
GlassDock *overflow-model collapse* at W7 — a structural enum cleanup, not a
layer/rail interaction refinement).

Every claim is grounded in glass-ui `file:line` at HEAD (3.2.0). SOTA is web-cited
where it drove a proposal; knowledge-vs-web is flagged per finding.

---

## §0 — What the layer+rail system is, as built (HEAD read in full)

The multi-pane stack is four files plus one CSS block:

- `DockLayerGroup.vue` (130 LOC) — the container. Owns a `layers` registry, the
  `activeLayer` v-model, the rail `<nav>`, the `.dock-layer-stack` grid, the
  `useLayerTransition` wiring, and the View-Transitions `view-transition-name`
  bookkeeping (`:70-77`).
- `DockLayer.vue` (53 LOC) — one pane. Registers on mount, `:inert` when inactive
  (`:50`), toggles `.is-active`/`.is-leaving` (`:48`).
- `dockLayerContext.ts` — the typed-key DI (register/unregister + the two id refs).
- `useLayerTransition.ts` (202 LOC) — the swap engine. Forks once at construction
  on `startViewTransition` support (`:56`): native VT path (`:121-133`) OR the
  axis-aware FLIP fallback (`:135-186`).
- `dock.css` §"Layer crossfade + hit-test contract" (`:395-446`), the rail rules
  (`:611-662`), the stack + pane rules (`:664-707`).
- `view-transition.css:53-56` — the `gl-dock-layer` VT group recipe.

The rail (`DockLayerGroup.vue:96-120`): a `<nav>` of `<button class="dock-layer-tab">`,
one per registered layer, each carrying `:title`, `:aria-label`, **`:aria-pressed`**
(`:109`), and `@click`. Icon resolves component → string → first-char fallback
(`:112-118`). `showRail` defaults `true`, auto-hidden at ≤1 layer (`:97`).
`railPosition: "start" | "end"` flips the flex direction + the divider border side
(`dock.css:593-634`).

The active-pane treatment (`dock.css:420-446`): inactive panes get
`opacity:0 + visibility:hidden + pointer-events:none`; active gets
`opacity:1 + visibility:visible + pointer-events:auto`; leaving holds
`opacity:0 + visibility:visible + pointer-events:none` through the crossfade. The
rail's *own* active mark is a flat background+color swap (`dock.css:659-662`):
`background: color-mix(--primary 15%)` + `color: --primary`. **No sliding
indicator, no shared element, no motion on the rail itself.**

This is a competent, correct, token-first system. It is also, by 2026 Figma/Framer
standards, **a generation behind on the rail's affordance and a half-generation
behind on the transition *feel***. The findings below are ordered by design impact.

---

## §1 — HEADLINE: the rail has no shared moving indicator (it should)

### The weakness (file:line)

`dock.css:659-662` — the active rail tab is marked by a per-button paint:

```css
.dock-layer-rail .dock-layer-tab.is-active {
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    color: var(--primary);
}
```

When `activeLayer` flips A→B, button A's tinted background *disappears* and button
B's *appears* — two independent `transition: background var(--dock-motion-fast)`
fades (`dock.css:649-651`). There is **no continuity** between the old and new
mark. The eye loses the indicator and re-finds it; it does not *travel*.

This is the single most dated thing about the rail. Every 2025-era segmented
switcher — Figma's left-rail page/asset tabs, Framer's layers/assets/CMS rail,
iOS `UISegmentedControl`, Primer `SegmentedControl`, the Motion.dev "smooth tabs"
recipe — animates a **single shared highlight that slides from the old segment to
the new one** ([Motion — Layout Animation: React FLIP & Shared Element]; [Motion.dev
— Smooth Tabs tutorial]; [Eleken — Segmented Control UI]). The moving pill is the
signature affordance; its absence reads as "a row of independent toggle buttons,"
not "a segmented switcher."

### The SOTA technique, transposed to glass-ui's substrate

The web names two ways to build a moving highlight ([Motion — Layout Animations];
[patterns.dev — View Transitions]):

1. **Shared-element layout animation** (`layoutId` in Motion/Framer; FLIP in raw
   JS) — one indicator element re-parented under the active tab; the runtime FLIPs
   it from old box to new box. *Interruptible, transform-only, doesn't block
   pointer events* ([Motion — Layout Animations]).
2. **View Transitions** with a `view-transition-name` on the indicator — the
   browser captures old/new and morphs. *Cannot be interrupted, blocks interaction
   during the transition, less performant for many elements* ([Motion — Layout
   Animations] comparison; this exact tradeoff matters in §3).

glass-ui already ships the **better** substrate for this and isn't using it on the
rail: a single absolutely-positioned `.dock-layer-rail-indicator` whose
`transform`/inset is driven from the active tab's offset — a pure-CSS shared
indicator, no JS FLIP needed, because the rail is a known-geometry flex strip. The
indicator reads `--dock-motion-fast` (or a new `--dock-rail-indicator-motion`
spring) and slides on `translate`/`inset`, GPU-composited, interruptible by
definition (a fast A→C→B re-click just retargets the transform). This is *strictly*
the §1 SOTA pattern, expressed token-first per the house style — no Motion/Framer
runtime dependency, no `layoutId` machinery.

**Two viable implementations, both library-internal:**

- **(a) CSS-anchor indicator** (cleanest, knowledge: Baseline-Newly-Available 2024,
  Chrome 125+/Safari TP — verify support before binding): the indicator uses
  `position-anchor` bound to the active tab + `position-area`, and the cascade does
  the travel for free on active-tab change. Risk: Firefox still trails on anchor
  positioning (knowledge, Jan 2026) — gate behind `@supports (anchor-name: --x)`
  with the §1(b) fallback.
- **(b) measured-offset indicator** (universal): the group computes the active
  tab's offset (`offsetTop`/`offsetLeft` along the rail axis) into a
  `--dock-rail-indicator-pos` custom property on rail-axis change; the indicator
  `translate`s to it. One `ResizeObserver`-free read on click — cheaper than the
  layer FLIP already in `useLayerTransition`. This is the recommended default; (a)
  is the progressive enhancement.

**Axis-aware for free:** the rail is already axis-aware (`dock.css:620-624` flips
to `flex-direction: row` for vertical groups). The indicator travels along the
cross-flow axis the rail flows on — `translateY` for the default vertical rail,
`translateX` for a horizontal-group rail. Key the travel axis off the same
`dim`/`axis` computed `useLayerTransition` already exposes (`useLayerTransition.ts:59`).

### Design proposal D-RAIL-1 — the shared sliding indicator

A `.dock-layer-rail-indicator` element inside `.dock-layer-rail`, positioned by a
`--dock-rail-indicator-pos` (offset) + `--dock-rail-indicator-size` (the active
tab's cross-size, so the pill snugly frames the icon at any density), sliding on
`translate` with a dedicated `--dock-rail-indicator-motion` spring (defaults to
`--dock-motion-resize`, the same apple-spring the layer morph uses — visual
coherence between the indicator's travel and the panel's morph). The per-button
`.is-active` background rule (`dock.css:659-662`) is **retired** in the clean-break
sense (no legacy alias) — the indicator *is* the active mark now; the active tab
keeps only the `color: --primary` text/icon recolor for the WCAG non-color-only
requirement (§2). PRM: the indicator snaps (no travel) under
`prefers-reduced-motion` — the `dock.css:1-20` PRM block already zeroes
`.dock-layer-tab` transitions, so fold the indicator's `translate` transition into
that same guard.

---

## §2 — The rail's ARIA is the wrong vocabulary (segmented ≠ pressed)

### The weakness (file:line)

`DockLayerGroup.vue:96-110` — the rail is `<nav>` containing buttons with
`:aria-pressed` (`:109`).

Two distinct problems, both SOTA-confirmed:

**(i) `aria-pressed` is the toggle-button vocabulary, not the
single-select-switcher vocabulary.** Primer's `SegmentedControl` accessibility
spec is explicit: a segmented control is *"treated like a list where each list
item contains a button,"* it must **not** use `radiogroup`/`tablist`/`toolbar`, and
the selected segment *"conveys its state using `aria-current="true"`"* — **not**
`aria-pressed` ([Primer — SegmentedControl accessibility]). `aria-pressed`
describes an independent on/off toggle; the rail is a *mutually-exclusive*
single-select (exactly one layer active), which is the `aria-current` semantic.
Using `aria-pressed` tells a screen-reader user each tab is an independent toggle
they could press several of — false. This is the same Tabs-vs-ToggleGroup
distinction CLAUDE.md already canonizes (§"Tabs vs ToggleGroup"): the rail is
PANEL navigation (each tab reveals a distinct pane, exactly one active), so its
role vocabulary should be the *navigation/current* family, not the *toggle-group*
family.

**(ii) The `<nav>` wrapper is over-claimed.** `<nav>` is a document landmark for
*major* site/app navigation regions; a dock-local pane switcher is a *widget*, not
a page landmark, and minting a `<nav>` landmark per `DockLayerGroup` pollutes the
landmark map (a screen-reader's "navigate by landmark" list). Primer's "list of
buttons" model is the right altitude: a plain `<div role="list">`/`<ul>` (or no
role + buttons), not a landmark.

### Why NOT `role="tablist"`

Tempting, since DockLayer *is* panel navigation. But `tablist` brings the **arrow-key
roving-tabindex** contract (arrows move selection, Tab enters the panel), and
Primer's research is that segmented/switcher rails specifically should NOT do that:
*"Arrow keys don't change focus or selection, unlike in radio groups or toolbars"*
([Primer]). A compact icon rail where each click is a discrete jump reads better as
Tab-to-each-button + Enter/Space than as an arrow-roving tablist. Matching Primer's
list-of-buttons + `aria-current` keeps each tab independently Tab-reachable (the
current behavior) while fixing the *state* vocabulary. This is the lighter, more
correct change — and it's a clean break (no back-compat alias), per the precepts.

### Design proposal D-RAIL-2 — segmented ARIA correction

- Drop the `<nav>` → `<div class="dock-layer-rail" role="list">` (or `<ul>`/`<li>`);
  the rail loses its spurious landmark.
- `:aria-pressed="activeLayer === layer.id"` → `:aria-current="activeLayer === layer.id ? 'true' : undefined"`
  (`undefined`, not `false` — `aria-current` is presence-based; an explicit `false`
  on every inactive tab is noise). Clean break.
- Keep `:aria-label` + `:title` (the icon-only tab needs the name — correct today).
- Add a group `aria-label` on the rail (Primer: a segmented control needs an
  accessible group name via `aria-label`/`aria-labelledby`) — a new optional
  `railLabel?: string` prop, defaulting to `"Layers"` only when ≥2 layers render.
- **Gate:** a unit asserting the active rail tab carries `aria-current="true"` and
  inactive tabs carry none; the rail root is not `<nav>` and not `role="tablist"`.
  This is the **dock binding-verification guard AT.W6 already books** (AT.md:168,
  "the dock binding-verification guard — the W7-booked, never-built test") —
  D-RAIL-2's assertions are concrete content for that otherwise-abstract gate.

The 24×24 CSS-px target floor ([Eleken; Apple HIG via Mobbin]) is **already met**:
`--dock-layer-tab-size` defaults to `--dock-control-size` `1.75rem` = 28px
(`dock.css:640-641`), above the 24px floor at every density. No change; note it
in the gate so a future density retune can't silently drop below 24px.

---

## §3 — The native VT layer-swap morphs the box but NOT the panes (the crossfade is coarse)

### The weakness (file:line)

This is the subtlest and highest-value finding. On the **native View-Transitions
path** (`useLayerTransition.ts:121-133`), the swap is:

```js
const { finished } = startViewTransition(() => {
    leavingLayer.value = oldLayer;   // toggles .is-leaving / .is-active classes
    currentLayer.value = newLayer;
});
```

The container `.dock-layer-stack` carries a `view-transition-name` +
`view-transition-class: gl-dock-layer` (`DockLayerGroup.vue:70-77`), and
`view-transition.css:53-56` gives that group a duration/ease. So the browser
captures the **stack box** old→new and morphs its size (good — that replaces the
FLIP width/height animation). But the **individual panes** (`.dock-layer-item-host`)
carry **no `view-transition-name`**. They are NOT independently captured. Inside
the single stack snapshot, the old pane's pixels cross-fade to the new pane's
pixels as one flat image.

Two consequences:

1. **The pane content crossfade is a dumb image-blend, not a content transition.**
   There's no directional slide, no per-pane motion — the SOTA "directional content
   transitions" pattern (Framer/Motion's `AnimatePresence` + variants;
   patterns.dev's "directional slides encode navigation history, crossfades signal
   content changes within the same location" ([patterns.dev — View Transitions]))
   is unavailable because the panes aren't VT participants. The CSS `gl-dock-layer`
   group recipe (`view-transition.css:53-56`) only sets *duration/ease* — it has
   **no `::view-transition-old/new(.gl-dock-layer)` `animation-name`**, so the panes
   fall to the UA default cross-fade. (Contrast `gl-list-item` at `:44-45`, which
   DOES bind directional slide-in/out keyframes. The dock group is missing its
   equivalent.)

2. **A redundant double-crossfade on the native path.** The CSS contract at
   `dock.css:420-446` *also* drives `opacity`/`visibility` on `.is-active`/
   `.is-leaving`. Inside `startViewTransition`, the callback flips those classes —
   so the panes' own `opacity` transition fires *underneath* the VT snapshot's
   cross-fade. The element is fading in CSS while its snapshot is also fading. On
   most engines the snapshot wins (the live DOM is hidden during the VT), so it's
   mostly invisible, but it's a latent double-animation smell and a real one if a
   browser composites the live tree during capture. The FLIP fallback path needs
   the class crossfade; the native VT path does **not** (the browser owns the
   crossfade) — yet both run the same classes.

### Design proposal D-LAYER-1 — make the panes VT participants + bind directional keyframes

- **Tag the panes**, not just the stack: on the native path, the active + leaving
  `.dock-layer-item-host` each get a `view-transition-name` (page-unique, derived
  from the group's `vtId` + the layer `id`) + `view-transition-class: gl-dock-layer`.
  Now the browser captures each pane separately and can morph/slide them
  independently of the box.
- **Bind directional keyframes** to the dock group, mirroring `gl-list-item`:

  ```css
  ::view-transition-new(.gl-dock-layer):only-child { animation-name: gl-vt-slide-in; }
  ::view-transition-old(.gl-dock-layer):only-child { animation-name: gl-vt-slide-out; }
  ```

  reusing the existing `gl-vt-slide-in/out` keyframes (`view-transition.css:58-59`)
  — the rise distance reads `--vt-rise` (8px default), so a vertical dock could set
  `--vt-rise` to read the axis. The pane that exists in only one state slides; the
  box still morphs as the group. This is the patterns.dev "crossfade content within
  the same location" → upgraded to a subtle directional rise, the same recipe the
  list-reorder already ships.
- **Suppress the redundant CSS crossfade on the native path.** When
  `NATIVE_VT === true`, the panes should NOT also run their own `opacity`/
  `visibility` transition (the browser owns it). Cleanest clean-break: the group
  root gets a `data-vt-native` attribute when `NATIVE_VT`, and the
  `dock.css:413-446` crossfade transitions are scoped to `:not([data-vt-native])`.
  One DOM mutation, no per-swap branching, FLIP fallback unchanged.

### Design proposal D-LAYER-2 — reconsider the native-VT layer swap entirely (the interruption tradeoff)

The web is blunt about View Transitions' cost ([Motion — Layout Animations]
comparison): VT *"can't be interrupted, blocks interaction during the transition,
and is less performant when animating many elements,"* whereas transform-based
layout animation *"is interruptible, doesn't block pointer events, and handles
multiple simultaneous animations."* A dock layer rail is a **rapid-toggle**
surface — a user flicks Assets→Layers→Libraries in quick succession. Under the
native VT path, each swap blocks interaction for `--vt-duration` (`--duration-normal`,
knowledge: ~300ms) and a fast re-click is *queued behind* the running transition,
not retargeted. `::view-transition { pointer-events: none }` (`view-transition.css:62`)
explicitly dead-zones the UI during the morph. For a tool palette this is the wrong
tradeoff: rails want *interruptible* travel, exactly the §1 indicator's strength.

**The proposal is not "rip out the VT path"** — the box-size morph via VT is
genuinely nice and replaced a fiddly FLIP. It's: **measure the cost honestly and
gate it.** Options, in preference order:

1. **Keep VT for the box-size morph, but make the rail indicator (§1) ALWAYS the
   transform-based interruptible path** regardless of VT support. The indicator is
   what the eye tracks during a fast toggle; the box morph can lag/queue without
   harming perceived responsiveness because the indicator already told the user
   "you're on Layers now." This is the gestalt: *indicator = transform (instant,
   interruptible), box = VT-or-FLIP (the slower structural settle).* Decouples the
   two so the fast-path feel is never gated on VT.
2. If telemetry/feel says the queued VT swap is janky on rapid toggle, fork the
   pane swap to the transform path too and reserve VT for the *first* swap after
   idle — but that's a feel-tuning call for the impl wave, not a W0 mandate.

This finding *augments* AT's existing VT story (AQ.W6 §Design 7, the very design
note the current code cites) with the **interruption tradeoff the original VT
adoption didn't weigh** — it's a hardening of an AS-residual, not a refutation.

---

## §4 — Smaller layer/rail design weaknesses (file:line)

**§4.1 — The rail divider is a hard hairline, not a soft seam.** `dock.css:617`:
`border-right: 1px solid color-mix(--border 30%)`. A 1px solid line between rail and
stack is the *only* separation; at the glass tier the dock floats on, a hard line
reads as a seam, not a continuation. Figma/Framer rails use a *recessed channel* or
*no line at all* (the rail sits in a tinted gutter). **Proposal:** make the divider
a `--dock-rail-divider` token (default the current hairline for parity) and offer a
"gutter" treatment — a faint inset `box-shadow`/tint on the rail strip instead of a
border — as the house default if it tests better. Low-risk, token-first.

**§4.2 — Rail tab hover uses `--accent 40%`, active uses `--primary 15%` — two
different hues for two states of the same control.** `dock.css:654-662`. Hover is
`accent`-tinted, active is `primary`-tinted. That's defensible (hover ≠ active) but
the *opacities* (40% vs 15%) make hover read *stronger* than active, inverting the
visual weight (active should be the most prominent). Once §1's indicator lands,
active gains the pill so this self-resolves, but flag it: the hover tint should sit
*below* the active indicator in visual weight. **Proposal:** retune to a coherent
single-hue ramp (`--primary` at hover < active opacity) OR keep `accent` hover but
drop it below the indicator's salience. Folds into D-RAIL-1.

**§4.3 — The fallback-glyph (first-char) tab has no visual distinction from an
icon tab.** `DockLayerGroup.vue:118` renders `(label ?? id).charAt(0)` when there's
no icon. A single bare letter in a 28px square, same weight as a lucide icon, is a
weak affordance — it reads as "missing icon," not "intentional initial." **Proposal:**
when falling back to the initial, style it as a deliberate monogram
(`--dock-rail-monogram` — slightly heavier weight, the `font-mono` face, centered)
so a label-only rail looks designed, not broken. Minor; bundle into the wave.

**§4.4 — `railPosition` flips the divider side but the indicator/rail visual
language doesn't change for `end`.** `dock.css:626-634` correctly moves the border
to the left/top for `rail-end`. Once §1's indicator exists, confirm it mirrors for
`rail-end` (the active-pill's inner-edge alignment should face the stack). A test
line, not a redesign.

**§4.5 — No keyboard-visible focus treatment specific to the rail tab.** The rail
tabs inherit the global focus ring (not dock-local). Fine functionally, but a
compact icon rail benefits from a *tight* focus ring that hugs the 28px square
rather than the default offset ring (which can clip against the divider). **Proposal:**
a `--dock-rail-tab-focus` inset focus treatment. Minor; a11y-positive.

---

## §5 — One thing the system gets RIGHT (do not regress)

The **inert + pointer-events + visibility** triad on inactive panes is *correct and
SOTA*, and any refactor must preserve it:

- `DockLayer.vue:50` `:inert` removes the inactive pane from the tab order AND the
  accessibility tree ([web.dev — inert]; [html.spec — inert]). Correct.
- `dock.css:424` `pointer-events:none` + `:423` `visibility:hidden` belt-and-
  suspenders the hit-test removal. The `dock.css:405-412` comment block already
  documents *why* `visibility:hidden` over `opacity:0`-alone (an `opacity:0` box
  still answers `elementFromPoint`, intercepting clicks meant for the active layer)
  — this is a real bug they already fixed correctly.
- The `inert` + `pointer-events:none` is slightly redundant (inert *implies*
  non-interactive), but the redundancy is cheap insurance for engines where `inert`
  polyfills imperfectly — leave it. ([Rob Dodson — accessibility primitives] notes
  `pointer-events:none` alone leaves keyboard reachability, which is why `inert` is
  the primary and pointer-events the backstop. Correct layering.)

The §1/§2/§3 proposals must not touch this triad. Call it out in the wave gate as a
no-regression line.

---

## §6 — Bonus: the CLAUDE.md dock-group claim is stale (a hygiene catch)

CLAUDE.md (Structure §, and the §"Subpath naming pairs") references
`src/components/custom/dock-group/` (DockGroup chassis) and a `@mkbabb/glass-ui/dock-group`
subpath. **`src/components/custom/dock-group/` does not exist at HEAD** (`find`
returns nothing; only `dock/` exists). Either DockGroup was retired and CLAUDE.md
wasn't swept, or it lives elsewhere. This is exactly the ι-hygiene class AT.W7
already books (the doc-vs-reality drift sweep). **Folds into AT.W7's ι sweep** — add
a CLAUDE.md ↔ `src/` reconciliation line: every `src/components/custom/<dir>`
CLAUDE.md names must exist (a trivial `proof:`-able grep). Knowledge: this is a
genuine drift, verified by `find` returning empty.

---

## §7 — The AT dock-design wave (the fold)

AT.md carries **no** layer/rail interaction wave — only a GlassDock *overflow-model
collapse* at W7 (one enum, retire `wrap`; a structural cleanup). The findings above
are a coherent *interaction-design* slice that the overfitting bar clears decisively
(the dock is consumed by ≥2 distinct contexts: the glass-ui demo dock-with-slider
story + value.js's `dock/Dock.vue` + fourier/muster/speedtest docks named across the
ledger — far more than 2 distinct consumer contexts). I propose folding them as a
**design-slice inside AT.W7** (the existing dock-structural wave), NOT a new
numbered wave — W7 already touches the dock (overflow collapse) and the ι sweep
(§6's catch), so the dock-design slice is file-adjacent and ships under one wave's
blast radius. Keeps AT's 9-wave shape.

### W7 dock-design slice — deliverables + hard gates

| # | Proposal | Deliverable | Hard gate |
|---|---|---|---|
| **D-RAIL-1** | Shared sliding rail indicator (§1) | `.dock-layer-rail-indicator` el + `--dock-rail-indicator-{pos,size,motion}` tokens; retire the per-button `.is-active` background (`dock.css:659-662`), keep the `color` recolor | The active mark TRAVELS (one indicator, not two fades); axis-aware (vertical rail → Y travel, horizontal → X); PRM snaps; `@supports` gate if the anchor-positioning variant is used; off the FLIP/VT box path (always transform) |
| **D-RAIL-2** | Segmented ARIA correction (§2) | `<nav>`→`role="list"`; `aria-pressed`→`aria-current="true"`; optional `railLabel`; clean break | Unit (the AT.md:168 dock binding-guard): active tab `aria-current="true"`, inactive none; root not `<nav>`/`tablist`; 24px floor asserted; binding-verification sweep catches the `aria-pressed`→`aria-current` swap actually wired (the silent-no-op class from MEMORY `glass_ui_binding_verification`) |
| **D-LAYER-1** | Panes as VT participants + directional keyframes (§3) | `view-transition-name` on active+leaving `.dock-layer-item-host`; `::view-transition-{old,new}(.gl-dock-layer)` slide keyframes in `view-transition.css`; `data-vt-native` scopes the redundant CSS crossfade off the native path | Native path: panes captured individually (not just the box); no double-crossfade (CSS opacity suppressed under `[data-vt-native]`); FLIP fallback byte-identical; PRM no-motion |
| **D-LAYER-2** | Decouple indicator (transform) from box (VT/FLIP) (§3) | The rail indicator is ALWAYS the transform path; the box morph keeps VT-or-FLIP | Rapid A→B→A toggle: the indicator retargets (interruptible), never queues; manual feel-confirmation line (the P5/D1 visual-evidence precedent — feel can't be unit-tested) |
| **D-RAIL-3** | Divider/hover/monogram/focus polish (§4) | `--dock-rail-divider` token + gutter option; coherent hover<active ramp; monogram fallback style; tight rail focus ring | Token-first (consumers retune via `--dock-rail-*`); no hard hairline as the only seam; visual-confirmation line |
| **NO-REGRESS** | Preserve the inert/pointer/visibility triad (§5) | — | `DockLayer` inactive panes stay `:inert` + `pointer-events:none` + `visibility:hidden`; the `elementFromPoint` hit-test fix (`dock.css:405-412`) intact |
| **HYGIENE** | CLAUDE.md dock-group drift (§6) | folds into AT.W7 ι sweep | `proof:`-grep: every CLAUDE.md `custom/<dir>` exists in `src/` |

### Sequencing within W7

D-RAIL-2 (ARIA, pure correctness) + HYGIENE land first (lowest risk, the
binding-guard gate AT already wants). D-RAIL-1 (the headline indicator) next — it's
the visible win and it makes D-RAIL-3's hover/active-weight retune trivial.
D-LAYER-1 + D-LAYER-2 (the VT-path refinements) last, gated on the manual
visual-confirmation lines, since "does the pane slide feel right" is the
unit-untestable axis (the same P5/D1 precedent AT already invokes for the blob
shader). Every change is a **clean break** (retire the per-button active bg, swap
`aria-pressed`→`aria-current`) — no legacy aliases, per the precepts.

### Why W7 and not a new wave / not AT's successor

The dock-design slice is *file-disjoint from the blob headline* (W2–W5) and
*file-adjacent to W7's existing dock + ι work*. Opening a new numbered wave for it
inflates AT's shape without payoff; deferring it to an AT successor strands a
ready, ≥2-consumer, clean-break interaction win that rides the dock-structural wave
for free. It is *exactly* the kind of "architectural transposition for elegance"
the standing directive favors — the rail goes from "row of toggle buttons" to "a
real segmented switcher with a traveling indicator," and the layer swap goes from
"box morphs, panes blur-fade" to "box morphs, panes slide" — gestalt, not patch.

---

## §8 — SOTA sources

- [Primer — SegmentedControl accessibility](https://primer.style/product/components/segmented-control/accessibility/) — the rail is a list of buttons + `aria-current="true"`, NOT tablist/radiogroup/`aria-pressed`; arrow keys don't move selection; group needs `aria-label`. (drove §2/D-RAIL-2)
- [Motion — Layout Animation: React FLIP & Shared Element](https://motion.dev/docs/react-layout-animations) — shared moving highlight via `layoutId`/FLIP; and the VT-vs-transform tradeoff (VT can't interrupt, blocks pointer events, worse for many elements). (drove §1/§3/D-LAYER-2)
- [Motion.dev — Smooth Tabs tutorial](https://motion.dev/tutorials/react-smooth-tabs) — the sliding-pill segmented switcher + directional content variants. (drove §1)
- [patterns.dev — Animating View Transitions](https://www.patterns.dev/vanilla/view-transitions/) — directional slides encode navigation, crossfades signal same-location change; `view-transition-name` + containment for granular control. (drove §3/D-LAYER-1)
- [Eleken — Segmented Control UI: Best Practices](https://www.eleken.co/blog-posts/segmented-control-ui) + [Mobbin — Segmented Control glossary (Apple HIG)](https://mobbin.com/glossary/segmented-control) — 24×24 target floor, non-color-only selected state, clear single active. (drove §2 24px floor + §4.2)
- [web.dev — The inert attribute](https://web.dev/articles/inert) + [WHATWG HTML — inert](https://html.spec.whatwg.org/dev/interaction.html) + [Rob Dodson — accessibility primitives](https://robdodson.me/posts/building-better-accessibility-primitives/) — inert removes from tab order + a11y tree; pointer-events:none alone leaves keyboard reachability (why the triad layers). (drove §5 no-regress)
- [Pope Tech — accessible animation 2025](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) — PRM degrade for decorative slides/fades. (drove the PRM gate lines)

All `file:line` citations verified against glass-ui HEAD (3.2.0). Web findings are
cited inline; where a support claim (CSS anchor positioning Baseline, `--duration-normal`
≈300ms) rests on knowledge (cutoff Jan 2026) rather than a fetched source, it is
flagged "knowledge" at the point of use and the proposal gates it behind `@supports`.
