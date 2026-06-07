# Dock-perfection convergence plan (AW band A — W2 · W3 · W3b)

**Status**: CONVERGED — ready to implement.
**Supersedes**: the planned two-spring companion model in `waves/AW.W2-dock-motion-unify.md`
(now rewritten), and the focus-after-swap `W3c` and big-dock `W2b` proposals from the
synthesis input (both resolved below — focus is already shipped, big-dock is consumer-gated).

This document is the single gestalt for the dock-motion convergence. It resolves every item
in the critique's `mustFixBeforeImpl` + `unhandledCases`, names the chosen lockstep mechanism
with exact CSS + JS, the axis-parity rules, the (deferred) big-dock API + CSS, the GlassDock
API delta, and the wave breakdown. The wave specs (`AW.W2`, `AW.W3`, `AW.W3b`) fold this in.

---

## 0. Ground truth (verified against HEAD, 3.3.0)

Every decision below is grounded in source read at HEAD. The critique's claims were verified:

| Claim | Verified at | Verdict |
|---|---|---|
| Spring already retuned to 0.32/0.7 | `useLayerTransition.ts:19` (`{response:0.32, dampingFraction:0.7}`) + `regen-spring-tokens.mjs:56-60` (dock PRESETS row, "AW.W2 retune") + `tokens.css:163` (`--spring-dock` regenerated, peak ~1.045) | **TRUE — the retune is LANDED.** W2 must NOT re-tune. |
| Focus-after-swap already implemented | `DockLayer.vue:46-67` — identical `el.closest("[inert]")` orphan guard + `hostEl.value?.focus()` re-home + `tabindex="-1"` host (template :77) | **TRUE — focus is SHIPPED (AU.W8.4f).** No new component code. Gate extension only. |
| Active pane currently fades 0→1 | `dock.css:547-559` (`.dock-layer.layer-active`/`.is-active { opacity:1; transition: opacity var(--dock-motion-resize) }`) | **TRUE.** Clip-reveal needs `opacity:1` statically → the active-pane transition is DELETED. |
| Existing `proof:dock-animation-live` REQUIRES active opacity to rise ≥3 frames | `proof-dock-animation-live.mjs:331,341-345` (`oRise=risingFrames(flip.opacities,0.01)`; `oRise < 3 → RED`) samples `.dock-layer--full` | **TRUE — kept-gate conflict.** The opacity sampler is re-pointed at the LEAVING pane. |
| `.expanded { overflow:visible }` lifts the clip at morph START | `dock.css:603` + `GlassDock.vue:368` binds `expanded: visualExpanded` synchronously | **TRUE — load-bearing sequencing gap.** Clip-lift moves to a `data-morphing`-gated rule that lifts on settle. |
| `.glass-dock.vertical` transition includes BOTH height AND width | `dock.css:290-297` | **TRUE — latent dual-driver race.** Carve to non-morph props only. |
| `shape="rounded"` no-ops on a horizontal dock | `dock.css:306-312` (shape-* binds only under `.variant-rail`); horizontal root hardwired `border-radius: var(--radius-dock)` = `--radius-pill` (`dock.css:85`, `theme.css:48`) | **TRUE — documented-but-dead prop.** The big-dock work (W3b, deferred) closes it; until then `shape` on a horizontal dock is documented as rail-only. |
| Outer collapsed↔expanded pair is hardcoded horizontal | `GlassDock.vue:205` (`outerLayerAxis = "horizontal"`); vertical docks render a single slot (template :417-419) | **TRUE.** The vertical HEIGHT morph lives on (a) the `.glass-dock.vertical` root CSS transition and (b) the inner `.dock-layer-stack` / `DockLayerGroup` (axis=vertical) — NOT the outer spring. The bi-axial gate targets the INNER group. |
| Doc-drift sites | `useLayerTransition.ts:8`, `:305`; `tokens.css:149`, `:1290`, `:1297`, `:1299` — all say `(0.5, 0.5)` / `+18.5%` while the live curve is `(0.32, 0.7)` / `~+4.6%` | **TRUE, and WIDER than the critique caught (5 sites in 2 files, not 2 in 1).** All five are corrected; the comment-match assert scans all of them. |

---

## 1. The lockstep mechanism — clip-reveal morph on ONE spring clock

### 1.1 Decision

**CHOSEN: clip-reveal morph on one spring clock.** The box IS the reveal aperture. Content is
laid out ONCE at its natural expanded size behind the aperture and is uncovered as the box
grows. There is exactly ONE timeline (the size spring, or the native View-Transition) and ZERO
opacity writes on the active pane. Opacity is a thin polish on the LEAVING pane only.

**REJECTED: the planned two-spring companion model** (a critically-damped opacity spring slaved
to the size spring). It keeps TWO timelines and spends its budget tuning them into agreement.
The correct model has no second timeline to tune. A companion spring is a patch for a structure
that should not exist. (And the critique is right that the model also contradicts itself with
the "preserve the active-pane crossfade verbatim" clause — you cannot both keep the active
pane fading 0→1 AND assert it never fades.)

### 1.2 Why this also resolves the kept-gate conflict (critique mustFix #4) and the active-pane
contradiction (critique mustFix #3)

The clip-reveal model is the thing that FORCES the active-pane opacity rule to be deleted
(critique #3) and FORCES `proof:dock-animation-live`'s opacity sampler to be re-pointed at the
leaving pane (critique #4). These are not separate fixes layered on top — they are the direct,
inevitable consequence of one decision. Concretely:

- **Active pane**: `opacity:1` from frame 0, uncovered by the aperture. The current
  `.dock-layer.layer-active, .dock-layer-item-host.is-active` rule's `transition: opacity …`
  (dock.css:556-558) is DELETED; the static `opacity:1` (dock.css:548) is KEPT. The active pane
  never animates opacity again — the aperture reveals it.
- **Leaving pane**: keeps `opacity: 0` + the `opacity var(--dock-motion-resize)` transition
  (dock.css:535-536, 565-569) — it fades the outgoing summary out as the box reveals the real
  content underneath. This is a thin polish, NOT the reveal mechanism.
- **The gate**: `proof:dock-animation-live`'s `oRise = risingFrames(flip.opacities)` currently
  samples `.dock-layer--full` (the becoming-active pane). It is RE-POINTED to sample the
  LEAVING pane's opacity (`.dock-layer--summary` on an expand, `.dock-layer--full` on a
  collapse) — which DOES fall 0 over ≥3 frames. The active-pane assert becomes its inverse:
  the active pane's opacity is STATICALLY 1 across every sampled frame (a single
  `assert all(o === 1)`), and its content box is clipped by the shrinking/growing aperture.

### 1.3 CSS — the box is the clip aperture

**(a) Migrate the clip shell from `overflow: hidden` to single-axis `overflow: clip`, gated on
a `data-morphing` attribute so the clip PERSISTS through the morph and lifts only on settle.**

The current `dock.css:104-106`:

```css
.glass-dock { overflow: hidden; }
```

and `dock.css:603` (`.glass-dock.expanded { overflow: visible }`) lift the clip at morph START
(the class is bound synchronously to `visualExpanded` at `GlassDock.vue:368`). That is the
load-bearing sequencing gap the critique names (mustFix #5): on expand the clip is already
`visible` at frame 0, so there is no aperture to reveal through.

Converged replacement — the clip is keyed off `data-morphing` (set by the driver at gesture
START, cleared on settle), NOT off `.expanded`:

```css
/* Rest + settled state: the dock clips on its MORPH AXIS only (single-axis clip,
   cross-axis ALWAYS explicitly visible — the MDN single-axis-clip-degrades-to-hidden
   caveat). overflow:clip is paint-only (NOT a scroll container) so it drops the
   min-width:0 scroll-box dance for the non-scroll shell and cannot snag a
   scroll-driven-animation scroller lookup. */
.glass-dock:not(.vertical) { overflow-x: clip; overflow-y: visible; }
.glass-dock.vertical       { overflow-x: visible; overflow-y: clip; }

/* DURING a morph the clip is the aperture: the dock clips its growing/shrinking
   axis so content is revealed, never spilled. data-morphing is set by the driver
   at gesture start, cleared on settle (NOT bound to .expanded). */
.glass-dock[data-morphing]:not(.vertical) { overflow-x: clip; overflow-y: visible; }
.glass-dock[data-morphing].vertical       { overflow-x: visible; overflow-y: clip; }

/* AT REST EXPANDED — lift the morph-axis clip so grown content + the focus ring
   paint past the box. This now fires ONLY when NOT morphing (the [data-morphing]
   rule above wins during the gesture by being more specific + later). */
.glass-dock.expanded:not([data-morphing]),
.glass-dock.always-expanded:not([data-morphing]) { overflow: visible; }
```

The driver owns `data-morphing`: `el.setAttribute("data-morphing", "")` at gesture start
(alongside `setWillChange`), `el.removeAttribute("data-morphing")` on settle (alongside
`clearWillChange`, after the final paint). On the native VT path the browser owns the morph,
so VT sets `data-morphing` synchronously inside the `startViewTransition` callback and clears
it on `finished`. This is the same lifecycle as the existing `will-change` hint — one new
attribute riding the established set/clear seam (F3).

**Why `clip` not `hidden`**: `overflow: clip` is paint-only — it does NOT create a scroll
container, so it (i) never participates in `scrollIntoView`/scroll-anchoring, (ii) cannot be a
scroll-driven-animation `scroller`, and (iii) does not need the `min-width:0` scroll-box dance
on the non-scroll shell. The legitimate scroll ports (`.dock-scroll-x` / `.dock-scroll-y`,
`overflow: auto`, dock.css:642-672) STAY `auto` — they are NOT migrated. Only the default
non-scroll shell migrates.

**(b) Content laid out ONCE at natural size behind the aperture** (never reflows per frame).
The existing `.dock-layer{,--full} { white-space: nowrap }` (dock.css:585-592) already does this
for horizontal — the inline content is laid out at `width: max-content` and the width aperture
uncovers a static layout. The vertical group's active host already does the block-axis
equivalent (`dock.css:894-897`, `.dock-layer-group.vertical .dock-layer-item-host.is-active {
width:auto; height: max-content }`). The axis-parity carve (§2) makes this conditional per
orientation so nowrap is not forced onto a vertical rail.

**(c) Opacity is a thin polish on the LEAVING pane only.** The AU.W8b 3-state VISIBILITY fork
(dock.css:495-582, the a11y-006 anchor) is PRESERVED verbatim — it governs `visibility` +
`pointer-events`, NOT opacity, so deleting the active-pane opacity transition does not touch it.
The exact CSS delta:

```css
/* KEEP (dock.css:533-538) — the shared crossfade transition declaration. It now
   governs ONLY the leaving pane's fade-out (the active pane's :556-558 override
   that re-declared the opacity transition is DELETED below). */
.dock-layer,
.dock-layer-item-host {
    transition:
        opacity var(--dock-motion-resize),
        visibility 0s linear var(--duration-normal);
}

/* KEEP (dock.css:540-545) — inactive panes are opacity:0 + out of the hit-test tree. */
.dock-layer:not(.layer-active),
.dock-layer-item-host:not(.is-active):not(.is-leaving) {
    opacity: 0; visibility: hidden; pointer-events: none;
}

/* CHANGED (dock.css:547-559) — the active pane is STATICALLY opacity:1, revealed by
   the aperture. DELETE the `transition: opacity var(--dock-motion-resize)` override;
   KEEP `visibility 0s` (immediate paint, the AU.W2 rule). */
.dock-layer.layer-active,
.dock-layer-item-host.is-active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: visibility 0s;   /* was: opacity var(--dock-motion-resize), visibility 0s */
}

/* KEEP (dock.css:565-569) — the leaving pane fades out on the shared token. This is
   the ONLY opacity animation that survives, and it is the only one proof:dock-opacity-lockstep
   asserts names --dock-motion-resize. */
.dock-layer-item-host.is-leaving {
    opacity: 0; visibility: visible; pointer-events: none;
}
```

### 1.4 JS — ONE SpringProgress clock drives the aperture in pixel space

This is `useLayerTransition.ts` kept ALMOST intact. The size spring + the retarget + the
will-change lifecycle are all preserved. The deltas:

1. **DELETE the companion-opacity-spring plan entirely** — it was never built; W2 is rewritten
   around the clip-reveal model, not a second solver.
2. **The spring writes SIZE ONLY** in the `play()` callback — `setDim(el, "${w}px")`, no opacity
   write. (The current code already writes size only; the rewrite makes this the permanent
   contract, not an interim state.)
3. **Add `data-morphing` to the set/clear lifecycle** — set at gesture start (the same place
   `setWillChange` is called, `useLayerTransition.ts:295`), clear on settle (alongside
   `clearWillChange`, :329) and on the safety timeout (:341) and `onTransitionEnd` (:359). On
   the native VT path, set inside the `startViewTransition` callback (`:202-205`), clear on
   `finished.finally` (:206-209).
4. **Retarget, never restart** — the existing live-spring re-seat
   (`useLayerTransition.ts:242-243` live detection, :316-317 `activeSpring.target = toSize`) is
   PRESERVED. An interrupted swap re-seats the live solver's target from its current
   `(value, velocity)`. The clip-reveal model adds one wrinkle the critique flags (unhandledCase
   "Interrupt/retarget under clip-reveal" + "layer-identity-change-mid-flight"): on a retarget
   that changes the TARGET layer (A→B→C), the natural max-content size of C differs from B, so
   the `toSize` re-measure on each retarget (the existing `getSize` after the deferred class
   swap, :278) already re-reads the new natural size. The clip-reveal layout-behind assumption
   is satisfied because the content for the new active layer is laid out at its own max-content
   the moment its class is applied — the re-measure reads that. NO new code; the existing
   measure-after-swap path already handles it.
5. **Fix the doc-drift** — `useLayerTransition.ts:8-9` (`response 0.5, ζ 0.5, ~+18.5%`) and
   `:305` (`shared (0.5, 0.5) curve`) are corrected to `(0.32, 0.7), ~+4.6%`. Plus the THREE
   sibling sites in `tokens.css` (`:149`, `:1290`, `:1297`, `:1299`) — the comment-match assert
   scans all of them.

### 1.5 One owner per concern (the AV.W9.0/.1 invariant, now four-way clean)

| Concern | Owner |
|---|---|
| size | the SpringProgress (FLIP path) OR the View-Transition (native path) — never a CSS `transition` on the morph axis the spring writes (the `el` keeps `transition:none` during the gesture) |
| active-pane reveal | the clip aperture (no opacity, no second clock) |
| leaving-pane fade | the shared-token CSS opacity transition (`--dock-motion-resize`) |
| visibility / hit-test | the AU.W8b delayed-hold 3-state fork (the a11y-006 anchor, preserved verbatim) |
| popover/menu spill | the top-layer Teleport (`data-glass-dock-portal`), immune to clip + transform ancestors — NOT `overflow-clip-margin`, NOT lifting the clip |
| post-swap focus | the existing `watch(isActive)` orphan-guard re-home in `DockLayer.vue:46-67` (SHIPPED) |

---

## 2. Axis parity

A single computed `dim` selector is the sole axis switch in the driver (`useLayerTransition.ts:99`,
`dim = axis === "vertical" ? "height" : "width"`). Both engines (VT + FLIP) consume it; nothing
else in the driver is axis-aware. Axis parity is completed in CSS by deriving every axis-coupled
rule from `orientation`, never hardcoding a dimension:

1. **Clip axis follows the morph axis** (§1.3a): horizontal clips X / visible Y; vertical clips
   Y / visible X; both lift to `overflow:visible` at rest expanded when not morphing. The cross
   axis is ALWAYS explicitly `visible`.

2. **Content-intrinsic axis follows the morph axis.** The hardcoded `.dock-layer { white-space:
   nowrap; height: var(--dock-layer-height) }` (dock.css:585-592) is correct for horizontal but
   forces a one-line row on a vertical rail. Carve: scope `white-space: nowrap` + the fixed
   `height` to `:not(.vertical)` contexts; the vertical group's active host already block-sizes
   to `height: max-content` (dock.css:894-897, KEPT). For the inner stack the existing
   `.dock-layer-group.vertical .dock-layer-item-host { white-space: normal; flex-direction:
   column }` (dock.css:888-892) is the correct column treatment — KEPT.

3. **Layout direction follows orientation** (already correct): horizontal = flex-row
   (`dock.css`), vertical = flex-column (`dock.css:276-298`).

4. **NEVER animate the cross-axis dimension.** The spring writes only `dim`. The
   `.glass-dock:not(.vertical)` transition (dock.css:262-268) already excludes `width` — correct.
   But `.glass-dock.vertical` (dock.css:290-297) includes BOTH `height` AND `width` — a latent
   dual-driver race for the height-morphing rail (the inner stack's spring writes height, the
   root CSS transitions height too). **Carve `.glass-dock.vertical` to NON-morph properties
   only** (padding/shadow/transform/background/border) — matching how `:not(.vertical)` already
   excludes width. Same carve on `.dock-layer-stack` (dock.css:854-860): it transitions BOTH
   width AND height; for the morph axis the spring owns it, so the CSS transition must be carved
   to the cross axis only (or removed — the spring drives the morph axis, and the VT path owns
   both on the native engine).

5. **The (deferred) big-dock `card` shape + `grid` layout reuse the same `dim` + clip + spring
   with zero new axis code** — see §3.

### 2.1 The bi-axial gate target (critique mustFix #9)

The OUTER collapsed↔expanded pair is hardcoded horizontal (`GlassDock.vue:205`). Vertical docks
render a single slot (template :417-419) with NO outer layer pair. So the vertical HEIGHT morph
does NOT run through the outer `useLayerTransition` spring — it runs on:
- (a) the `.glass-dock.vertical` root CSS transition (dock.css:291, the dual-driver bug carved in
  §2.4), and
- (b) the inner `.dock-layer-stack` / `DockLayerGroup` with `axis=vertical` (the spring-driven
  height morph).

**The widened `proof:dock-animation-live` vertical timeline MUST target the INNER DockLayerGroup
height morph** (a `<DockLayerGroup orientation="vertical">` with ≥2 `<DockLayer>` children, e.g.
the `demo/stories/navigation/dock-layers.vue` vertical group), NOT the outer pair. The gate's
existing horizontal probe stays on the outer pair (the start-collapsed two-layer dock); the new
vertical probe drives an inner-group layer switch and rAF-samples the stack's `height` rising
over ≥3 frames. This is stated in the W2 wave bounds.

---

## 3. The big-dock variant — DEFERRED (consumer-gated)

### 3.1 Decision: documented + specced, NOT shipped in band A

Per glass-ui invariant 10 / L invariant 8 (visual-load-bearing-ness — substrate ships only with
≥2 consumers or formal retirement), the big-dock card+grid variant has **zero current consumer**
and its central feasibility (grid reflow-during-width-morph) was flagged TBD. It is therefore
**NOT implemented in the AW dock-motion band**. The motion rewrite (clip-reveal one-clock) is the
actual ask and stands alone.

`AW.W3b-dock-bigdock-variant.md` is written as a **CONSUMER-GATED** wave: it carries the full
design (API + CSS + tokens + gates) so the substrate is ready the instant a consumer materializes,
but its **State is `DEFERRED — opens on consumer #1`** and it does NOT run in band A. This satisfies
both the convergence task (the file exists with the complete gestalt) and invariant 10 (no
consumer-less substrate ships). When a real big-dock consumer lands (the slides constellation
panel is the candidate consumer #1; a second is required for the ≥2 floor), the wave opens.

### 3.2 The API (specced, gated)

Two orthogonal additive props on `GlassDock`, both clean extensions:

```ts
shape?: "pill" | "rounded" | "card"   // ADD "card" — the finite, concentric big-dock corner
layout?: "linear" | "grid"            // NEW prop, default "linear" — the IN-CAP arrangement
```

- `shape` already owns corner geometry; `card` is the least-surprise third value (a finite radius
  above 2xl, below pill — does NOT collapse to a stadium). The `card` work ALSO closes the
  `shape="rounded"`-no-op-on-horizontal gap (§3.4).
- `layout` is orthogonal to the existing `overflow` enum: `overflow` = the OVER-CAP strategy
  (grow/wrap/scroll); `layout` = the IN-CAP arrangement (linear row vs 2D grid). Do NOT fold grid
  into `overflow="wrap"` (wrap is content-order flex-wrap; grid is track symmetry — conflating
  them re-creates the AT.W7 "one knob touched overflow divergently" tangle).

Both are pure additions: `"pill"`/`"linear"` remain the defaults; no existing consumer sets the
new values; zero removed/renamed props.

### 3.3 The tokens + CSS (specced, gated)

```css
/* theme.css — a finite radius rung above 2xl, below pill */
--radius-3xl: 1.5rem;                /* 24px — the big-dock card shell */
--radius-dock-card: var(--radius-3xl);
```

```css
/* dock.css — NEW token, density-scaled (compact/comfortable/spacious/audacious each scale it,
   never a magic number) */
--dock-tile-min: 4.5rem;   /* the grid tile minimum, wired into the density cascade */
```

```css
/* finite, concentric card shell — overrides the hardwired pill on the HORIZONTAL root */
.glass-dock.shape-card {
    --dock-card-radius: var(--radius-dock-card);
    border-radius: var(--dock-card-radius);
}
/* pill<->card MORPH: collapsed returns to a pill, expanded is the card. border-radius
   animates on the SAME --dock-motion-resize spring the aperture rides — ONE free
   interpolation. REQUIRES adding `border-radius var(--dock-motion-resize)` to the
   .glass-dock:not(.vertical) transition list (ABSENT today, so without it the pill<->card
   snaps discretely). See §3.5 risk. */
.glass-dock.shape-card.collapsed { border-radius: var(--radius-pill); }
/* squircle reads markedly better at large radii — @supports-gated enhancement ONLY
   (Chrome 139+, no FF/Safari 2026). The border-radius card shell is the CONTRACT; the
   squircle is the better tier (the baseline arc must be the acceptable contract, not a
   degraded fallback). */
@supports (corner-shape: squircle) { .glass-dock.shape-card { corner-shape: squircle; } }

/* 2D growth: the active layer becomes a self-wrapping tile grid (Launchpad/Stage-Manager
   track symmetry, distinct from overflow=wrap's content-ordered flex-wrap) */
.glass-dock.layout-grid .dock-layer--full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--dock-tile-min, 4.5rem), 1fr));
    grid-auto-rows: var(--dock-tile-min, 4.5rem);   /* explicit row height or the concentric look breaks */
    gap: var(--dock-layer-gap);
    width: 100%; height: auto; white-space: normal;
}
/* CONCENTRIC inner tiles — inner radius = outer radius - padding (the universal
   macOS/visionOS/Raycast rule). NEVER nest two pills (stadium-in-stadium). */
.glass-dock.layout-grid.shape-card .dock-layer--full > * {
    border-radius: calc(var(--dock-card-radius) - var(--dock-padding-inline, 0.5rem));
}
```

### 3.4 The silent-no-op repair (rides the card work)

`shape="rounded"` currently does NOTHING on a horizontal dock (`shape-*` binds only under
`.variant-rail`, dock.css:306-312; the horizontal root is hardwired `--radius-dock` = `--radius-pill`
at dock.css:85). The card-shape work adds explicit horizontal-root shape rules, which ALSO makes
`shape="rounded"` paint on a horizontal dock — closing a documented-but-dead prop. Clean break:
no alias (the prop already exists; it gains an effect). **Because this fix ships with the deferred
W3b, the `shape` prop's JSDoc is updated in band A to state it is currently rail-only** so the
documentation does not promise a horizontal effect that lands only with W3b.

### 3.5 Big-dock open questions (resolved for the spec)

- **Grid reflow-during-width-morph** (the TBD feasibility): RESOLVED as a hard contract — a
  `layout="grid"` dock is `alwaysExpanded` by contract (a 2D panel does not read as a collapsible
  pill, and `alwaysExpanded` means no width morph, so no per-frame grid reflow). If it CAN
  collapse, the `#collapsed` summary slot renders a pill (the morph target) and the grid lays out
  once at the final width. The W3b gate empirically verifies (Playwright) that no grid-column
  reflow occurs during any morph.
- **`--radius-3xl` density-scaling**: RESOLVED — `--dock-card-radius` is the density-scaled token
  (compact tighter, spacious looser), `--radius-3xl` (24px) is its comfortable default. Consistent
  with the rest of the dock's density cascade.
- **`layout="grid"` auto-implying `shape="card"` + `alwaysExpanded`**: RESOLVED — keep them
  INDEPENDENT (the clean-break choice), document the canonical pairing
  (`shape="card" layout="grid" alwaysExpanded`). Auto-implication couples orthogonal props.

---

## 4. GlassDock API delta (band A vs deferred)

| Change | Band | Notes |
|---|---|---|
| `data-morphing` attribute on the root, driven by `useLayerTransition` | **W2 (band A)** | INTERNAL — not a prop. The clip-aperture lifecycle attribute. |
| `useLayerTransition.ts` writes size only; clip-reveal; doc-drift fix | **W2 (band A)** | Internal. |
| `proof:dock-animation-live` opacity sampler re-pointed to the leaving pane + vertical inner-group timeline | **W2 (band A)** | Gate. |
| `proof:spring-tokens-synced` band-assert + comment-match assert (net-new — the gate only does drift today) | **W2 (band A)** | Gate. |
| typed directional VT, spring-keyed stagger, hover-scale unify, slider keepDockOpen, PRM single-audit | **W3 (band A)** | Internal/CSS/token. |
| `proof:dock-a11y-contract` focus-orphan assert against the EXISTING `DockLayer.vue` code | **W3 (band A)** | Gate extension — NO new component code (focus is shipped). |
| `shape?: "card"` union member | **W3b (DEFERRED)** | Additive prop. |
| `layout?: "linear" \| "grid"` prop | **W3b (DEFERRED)** | Additive prop. |
| `--radius-3xl`, `--radius-dock-card`, `--dock-tile-min` tokens | **W3b (DEFERRED)** | Additive tokens. |
| graceful multi-row wrap morph | **W3b (DEFERRED)** | Moved from W3 — it is part of the card/grid radius-morph story. |

**No removed or renamed props.** Band A is ALL internal/CSS/token + two gate extensions — ZERO
public API surface delta. The two additive props + radius rung land only with the deferred W3b
when a consumer exists.

---

## 5. Wave breakdown

| Wave | State | Owns |
|---|---|---|
| **W1** | CLOSED (2026-06-07) | The `container-type` shrink-to-fit fix. UNCHANGED — the clip-reveal model builds on the now-shrink-to-fit dock W1 restored. Do not reopen. |
| **W2** | REWRITTEN (band A) | The clip-reveal one-clock model: `overflow:hidden`→single-axis `overflow:clip` gated on `data-morphing`; DELETE the active-pane opacity transition; the `.glass-dock.vertical` + `.dock-layer-stack` dual-driver carve; the content-intrinsic-axis carve; the 5-site doc-drift fix. NO spring retune (landed). NO companion spring. Gates: `proof:dock-clip-reveal` (NEW, born-RED), `proof:dock-animation-live` (widened — opacity sampler → leaving pane, + vertical inner-group timeline), `proof:spring-tokens-synced` (band + comment-match, net-new), `proof:dock-opacity-lockstep`, `proof:dock-motion-single-source`, typecheck+build. |
| **W3** | REWRITTEN (band A) | KEEP: typed directional VT, spring-keyed item stagger (keyed off the SINGLE size spring's progress — cleaner under one-clock), hover-scale unification, slider keepDockOpen fix, PRM single-audit. REMOVE: the wrap-morph (→ deferred W3b). ADD: the `proof:dock-a11y-contract` focus-orphan assert against the EXISTING `DockLayer.vue:46-67` (NO new component code — focus is shipped; W3c is dropped). Gates: `proof:dock-layering-polish`, `proof:dock-a11y-contract` (extended). |
| **W3b** | **DEFERRED — opens on consumer #1** | The big-dock card shape + grid layout + pill↔card radius morph + the graceful wrap-morph. Full design specced (API + CSS + tokens + gates) but NOT shipped in band A (zero consumer; invariant 10). Gates born-RED, ready: `proof:dock-big-dock`, `proof:dock-wrap-morph`. |
| ~~W3c~~ | DROPPED | Focus-after-swap is already shipped (`DockLayer.vue:46-67`, AU.W8.4f). Resolved as a `proof:dock-a11y-contract` extension folded into W3 — no new wave, no new component code. |
| ~~W2b~~ | RENAMED → W3b | The synthesis's `W2b` big-dock proposal is the deferred `W3b`. |

---

## 6. Gates (born-RED, Playwright-behavioral)

| Gate | Wave | Born-RED witness | GREEN assertion |
|---|---|---|---|
| `proof:dock-clip-reveal` | W2 | On the 3.3.0 `overflow:hidden`+active-opacity-fade model: the active pane's opacity < 1 on a frame while the box is still wide (the "content fades, not revealed" tell), OR content paints at full size past a half-collapsed box. | Across EVERY morph frame the active pane's opacity == 1 (revealed by the aperture, never faded) AND its content box is clipped by the aperture (rendered width tracks `min(natural, aperture)`). Both engines, both orientations. Harness-gated SKIP with born-RED artefact in the MCP env. |
| `proof:dock-animation-live` (widened) | W2 | Frozen-at-summary-floor (~19px) timeline (the W1 born-RED). | rAF-samples the OWN collapse↔expand morph over ≥3 rising frames, BOTH FLIP and VT, BOTH orientations (the vertical timeline targets the INNER DockLayerGroup height morph, §2.1). The OPACITY sampler is re-pointed to the LEAVING pane (which falls 0 over ≥3 frames); the active pane is asserted statically opacity==1. Asserts ONE driver per axis. |
| `proof:spring-tokens-synced` (extended) | W2 | The stale doc comments (`(0.5,0.5)/+18.5%` at 5 sites) while the const is `(0.32,0.7)` — a doc-as-code drift. | `DOCK_SPRING` and the `dock` PRESETS row carry the SAME `(response, ζ)`; `response∈[0.30,0.35]`, `ζ∈[0.70,0.80]`, derived overshoot `exp(-ζπ/√(1-ζ²))∈[0.05,0.10]`; AND every quoted comment number (all 5 sites) matches the const. NET-NEW asserts — the gate only does committed-vs-generated drift today. The 0.32/0.7 already passes the band (no retune); the comment-match is the bite. |
| `proof:dock-layering-polish` | W3 | symmetric VT curves, fixed-ms-cluster stagger, idle-collapse-under-drag. | distinct expand/collapse `::view-transition` type curves; the stagger is monotone in the SINGLE size spring's progress; the collapsed-hover scale rises ≥3 frames on the dock spring; an in-dock `<Slider>` drag holds the dock open; under PRM all collapse to instant while state toggles. |
| `proof:dock-a11y-contract` (extended) | W3 | After a layer swap, `document.activeElement` is orphaned inside the now-inert leaving pane. | Focus is re-homed to the revealed active host (`tabindex=-1`) when the prior owner is hidden — asserted against the EXISTING `DockLayer.vue:46-67`. PLUS the existing rail-role asserts stay green. |
| `proof:dock-big-dock` | W3b (deferred) | `shape="card"` snaps its radius discretely (border-radius absent from the transition list). | `shape="card"` expanded renders a finite `--radius-dock-card` (NOT 9999px) AND collapsed renders `--radius-pill`; the pill↔card radius rises monotonically ≥3 frames on `--dock-motion-resize`; `layout="grid"` with N>capacity tiles produces ≥2 grid rows; inner-tile radius == `calc(outer - padding)`; `corner-shape:squircle` present ONLY under `@supports`. No grid-column reflow during any morph (the alwaysExpanded contract). |
| `proof:dock-wrap-morph` | W3b (deferred) | the current `@media` flex-wrap jump-cut (≤1 frame) at the `--dock-overflow-bp` crossing. | the `overflow="wrap"` row-reflow `min-height` morphs ≥3 frames; under PRM the morph collapses to an instant snap (0 morph frames) while the reflow still completes. |
| `proof:dock-motion-single-source` + `proof:dock-opacity-lockstep` | W2/W3 (regression guards) | — | one rAF origin, one easing token; the LEAVING-pane fade still names `--dock-motion-resize`. These bite if a future edit reintroduces a second clock or a divergent opacity duration. |

---

## 7. Risks + mitigations (from the critique's mechanismRisks + risks)

| Risk | Mitigation |
|---|---|
| `overflow:hidden`→`overflow:clip` mis-scoping breaks the scroll ports | The `.dock-scroll-{x,y}` ports STAY `overflow:auto` — NOT migrated. Only the default non-scroll shell migrates. The migration is scoped to the `.glass-dock:not(.dock-scroll-*)` shell rule; the scroll-port rules (dock.css:642-672) are untouched. `min-width:0` on `.dock-layers` (dock.css:465) is the FLEX/GRID min-content floor release for the cap-clamp — KEPT (it is orthogonal to the scroll-box; the plan does NOT delete it). |
| `.expanded` clip-lift timing | RESOLVED in §1.3a — the clip is keyed off `data-morphing` (driver-owned, set at start, cleared on settle), NOT off `.expanded`. The at-rest `overflow:visible` fires only `:not([data-morphing])`. |
| active-pane opacity contradiction + kept-gate conflict | RESOLVED in §1.2/§1.3c — DELETE the active-pane opacity transition (exact CSS diff given); re-point the `proof:dock-animation-live` opacity sampler to the leaving pane. The AU.W8b visibility fork (governs visibility, not opacity) survives untouched. |
| vertical-rail height-morph has thin coverage; the carve may surface a pre-existing bug | The widened `proof:dock-animation-live` vertical inner-group timeline is the first behavioral bar on it. If it surfaces a pre-existing vertical-rail morph bug, W2 owns it (the carve is W2's). |
| content laid out once at max-content assumes stable natural size; a reactive-width child reflows under a static-layout assumption | EXISTING limitation, documented in the dock README (the close wave). The retarget contract handles a deliberate re-toggle; a content-driven size change is out of scope. The clip-reveal model makes it more visible but does not introduce it. Container-query-driven size changes mid-morph (the coarse-pointer touch floor / audacious label compression) are the dock-specific edge — documented; the gate samples a non-container-named dock. |
| `data-morphing` clip persists; verify the stacking-context guarantee survives single-axis clip | `overflow-x:clip / overflow-y:visible` establishes paint containment on the clip axis. The dock root's `scale:1` (dock.css:67) mints the stacking context for portaled popovers; the W2 gate (`proof:dock-clip-reveal`) includes a regression assert that a portaled popover stays above the dock during a collapsed:hover scale WITH the clip active. If single-axis clip alters paint order, escalate (Triumvirate re-plan). |
| big-dock pill↔card radius-morph adds `border-radius` to the SHARED `:not(.vertical)` transition list, affecting pill/rounded/instrument-strip variants | Big-dock is DEFERRED (W3b) — this risk does not land in band A. When W3b opens, its gate verifies no existing horizontal showcase (incl. the speedtest instrument-strip) looks wrong; the radius transition is likely desirable (it glides the existing wrap radius swap too) but is gated, not assumed. |

---

## 8. Open questions resolved (no remaining TBD in band A)

- W2-vs-rewrite orchestration: **REWRITE W2** (it is `planned`, not closed; no src landed beyond
  the already-shipped spring retune which W2 no longer touches). Confirmed.
- Wrap-morph location: **moved to the deferred W3b** (it is part of the card/grid radius story).
  W3 sheds the wrap recipe; W3.a/W3.b disjointness re-drawn (W3 is now a single surface — typed-VT
  + stagger + hover + slider + PRM — since the wrap carve left).
- `--radius-3xl` density-scaling: **`--dock-card-radius` is the density-scaled token**, `--radius-3xl`
  is its default. (Deferred with W3b.)
- `layout="grid"` auto-implication: **keep props independent**, document the canonical pairing.
  (Deferred with W3b.)
- grid reflow-during-morph: **`layout="grid"` is `alwaysExpanded` by contract** (no width morph,
  no per-frame reflow); W3b's gate empirically verifies it. (Deferred with W3b.)
- bi-axial parity gate: **the widened `proof:dock-animation-live` vertical timeline targets the
  INNER DockLayerGroup**, not the outer (hardcoded-horizontal) pair. Stated in W2 bounds.

**READY TO IMPLEMENT.**
