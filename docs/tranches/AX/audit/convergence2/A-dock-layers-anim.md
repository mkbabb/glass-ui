# A-dock-layers-anim — Dock LAYERS: switch lag (DK7) + first-class layer animation (DK6)

**Lane** AUDIT (source) · **Severity** blocker · **Verdict** augment-existing-wave
(DK7 layer-crossfade clock → **W01 re-open**, the SAME re-open A-dock-collapse-timing already
opens; DK6 first-class layer remit → **W18 + W06 demo augment**) · HEAD `5cf2980` (3.8.0+W52)

Source-audit of `DockLayerGroup`/`DockLayer` + `useLayerTransition`/`dockMorphContext` against
DK7 ("dock layers is not smoothly animated — far too laggy/delayed") and DK6 ("the collapse
animation for INTERNAL items needs refinement + prototyping; dock LAYERS + switching should be
animated + FIRST-CLASS"). Consumes the R-dock-layer-anim SOTA finding. Cross-ref W45/W05/W02/W01.

---

## The architecture (source-true)

A `<DockLayerGroup>` runs ONE of two morph drivers depending on nesting:

- **Nested in a `<GlassDock>`** → defers to the dock's `useDockMorphOrchestrator`
  (`dockMorphContext.ts`) via `registerGroup` — the pane stack is a second morph TARGET on the
  dock's ONE `SpringProgress`, sharing the `--dock-morph-t` root scalar (DockLayerGroup.vue:77-84).
- **Standalone** → mints its own `useLayerTransition` (DockLayerGroup.vue:85-103).

Both drivers are the SAME W01 single-scalar FLIP: capture `from`-size, swap the active/leaving
refs, pin at `from`, ONE rAF later measure the target pane's `max-content` `to`-size, arm a
`SpringProgress` 0→1 writing `--dock-morph-t`. The SIZE morph of the pane stack is genuinely SOTA
(one spring, FLIP, velocity-continuity on retarget — `dockMorphContext.ts:205-241` re-seats from
`spring.velocity`). **The size morph is NOT the DK7 lag.**

The pane CROSSFADE is split off the spring onto TWO fixed-duration CSS clocks — and THAT split is
the DK7 lag for layer switching.

---

## DK7 ROOT CAUSE — the leaving-pane opacity is a SECOND CLOCK (the headline)

### The mechanism (file:line)

`dock.css:805-810` — every `.dock-layer` AND `.dock-layer-item-host` (the inner DockLayer pane host)
carries a fixed-duration CSS transition:

```css
.dock-layer, .dock-layer-item-host {
    transition:
        opacity var(--dock-motion-resize),            /* = 0.3s × --spring-dock linear() */
        visibility 0s linear var(--duration-normal);  /* = held 0.3s */
}
```

`--dock-motion-resize` (`dock.css:49`) = `var(--duration-normal) var(--dock-resize-spring)`
= **`0.3s` × `--spring-snappy`** (`tokens.css:1456` → `--dock-resize-spring: var(--spring-dock)`;
note the comment at `:45` calls it snappy but it resolves to `--spring-dock`). This is a
FIXED-DURATION CSS `transition`. On a layer switch:

- The ENTERING pane (`.dock-layer-item-host.is-active`) is statically `opacity:1`, revealed by the
  box-clip aperture + the per-child stagger reading `--dock-expand-t = --dock-morph-t`
  (`dock.css:743`, `:908-925`). CORRECT — it rides the spring scalar.
- The LEAVING pane (`.dock-layer-item-host.is-leaving`, `dock.css:839-844`) fades `opacity:1→0`
  over the FIXED `0.3s × --spring-dock` CSS transition — a SECOND clock that does NOT track the
  live `SpringProgress` ODE the box rides.

### Why this lags (the two-clocks-drift pathology)

The live `SpringProgress` settle time is **velocity-dependent**: a fresh switch with the dock's
`(response 0.32, ζ 0.7)` spring settles its meaningful travel in ~0.18–0.25s; an interrupted /
mid-flight retarget (velocity-continuity) settles FASTER. But the leaving-pane opacity ALWAYS runs
the full 0.3s CSS clock on the `--spring-dock` linear() curve. So:

- **The crossfade LINGERS past the box morph.** The box settles (~0.2s), the leaving pane keeps
  painting at non-zero opacity until 0.3s — a ghost of the old pane sits over the settled new pane
  for ~0.1s. That residual ghost is exactly the "laggy/delayed" the user reads on a layer switch.
- **Worse on a re-toggle mid-flight.** The spring re-bases from current velocity and settles even
  faster, but the leaving pane's CSS transition does NOT inherit velocity — it restarts its 0.3s
  clock from the current opacity. The box snaps to the new pane while the OLD pane's ghost crossfades
  on an independent, slower clock = the visible "two layers smearing" lag DK7 names.
- **`visibility 0s linear var(--duration-normal)`** holds the leaving pane painted for a hardcoded
  0.3s regardless of when the spring settles (`dock.css:809`) — so even after opacity reaches 0 the
  pane occupies the paint tree to the full 0.3s, extending the ghost window.

This is the EXACT pathology W01/W02 excised for SIZE (the dual-driver race deleted at `dock.css:746-761`)
but left standing for OPACITY. The codebase even DOCUMENTS the split as intentional — `dock.css:789`
"size = the spring scalar, opacity = the CSS crossfade, visibility = the 3-state fork" — **but that
very split IS the DK7 bug**: three clocks for one gesture, two of them decoupled from the spring the
eye tracks.

### Live-confirmable RED witness

On the standalone `/navigation/dock-layers` demo (the DockLayerGroup consumer), a layer switch:
the `--dock-morph-t` scalar (box) settles velocity-dependently while the leaving pane's
`getComputedStyle().opacity` decays on the fixed 0.3s `--spring-dock` curve — the two are
NOT co-temporal on an interrupted switch. (Distinct from the DK1 summary-icon opacity ramp
A-dock-collapse-timing measured; that is the OUTER collapse pane, this is the INNER pane swap.)

---

## DK6 — "dock LAYERS + switching should be FIRST-CLASS + animated"

DK6 is a REMIT defect, not purely a bug: the user wants layer switching to be a SHOWCASED,
first-class animation idiom — not a quiet crossfade. Two source observations:

1. **The leaving-pane crossfade is the ONLY motion that distinguishes a layer swap from the
   collapse morph.** Once DK7's clock fix lands (crossfade on the scalar), the layer swap reads as
   one continuous spring — box + entering-pane stagger + leaving-pane fade all on `--dock-morph-t`.
   That IS the first-class idiom (the WWDC24 zoom shared-element model: every axis on ONE spring).
   No second mechanism is needed; the fix unifies the swap onto the spring the eye already tracks.

2. **There is NO demo that SHOWCASES layer switching as a first-class animation.** The
   `dock-layers.vue` story exists but the morph/layer-animation showcase is owned by W06 (the dock
   storybook honest-rail + animation showcase) + W18 (the storybook IA Dock first-class category).
   DK6's "should be animated FIRST-CLASS" demand is a DEMO/showcase gap once the clock fix lands —
   it belongs to W06's "author the morph/animation showcase section" remit (already in
   CONVERGENCE-PLAN's W06 augment row) + W18's first-class Dock category.

The `directionTypes` `layer-back`/`layer-forward` hint (DockLayerGroup.vue:94-98) is computed but,
per `useLayerTransition.ts:50-54`, **accepted and IGNORED** (the symmetric spring runs one curve
regardless of direction). That is fine for the SIZE morph but means a layer swap has no directional
character (no slide-from-left vs slide-from-right). If DK6 wants directional layer motion as a
first-class flourish, the dead `directionTypes` hint is the seam — but that is a W01/W02-driver
enhancement (re-activating the direction fork on the crossfade `translate`), NOT a W45/demo concern.
Record as a NOTE, not a blocker (the clock fix is the dominant DK7/DK6 remediation).

---

## The gestalt fix (consume R-dock-layer-anim §3.1)

Drive the leaving-pane opacity AND its paint-cutoff off the SAME `--dock-morph-t` scalar the box
rides — ONE clock, every axis — never a parallel fixed-duration CSS `transition`:

- **Leaving pane:** replace `transition: opacity var(--dock-motion-resize)` +
  `.is-leaving { opacity: 0 }` with a `calc()` read off the scalar:
  `opacity: calc(1 - var(--dock-morph-t))` gated on `[data-morphing]` (exactly how the box size
  and the entering-pane child stagger already work). The leaving pane fades WITH the box — an
  interrupted switch carries the fade because it is a pure function of the same `t`.
- **Entering pane:** unchanged — statically `opacity:1`, revealed by the clip aperture (the W2
  clip-reveal contract, KEEP).
- **Visibility / paint-cutoff:** flip `is-leaving` → hidden on the spring-SETTLE callback the driver
  already fires (`useLayerTransition.ts:166`/`dockMorphContext.ts:179-194` `settleTarget`), NOT on
  the hardcoded `visibility 0s linear var(--duration-normal)` 0.3s delay. The driver knows the exact
  settle moment; the CSS timer only approximates it. (The `:not(.is-active):not(.is-leaving)` inactive
  rule stays the a11y hit-test anchor — `visibility:hidden` removes it from the hit-test tree.)

This collapses the two opacity/visibility clocks onto the ONE spring. The ghost (linger past settle)
and any flash (finish before settle) both vanish — there is no second timer to drift. The size morph
is already SOTA; this EXTENDS the W01 "one clock" thesis from size to opacity, FINISHING it for the
inner pane swap exactly as A-dock-collapse-timing extends it for the outer summary-stagger direction.

---

## DEDUP — which wave owns each

| Defect | Owner | Why |
|---|---|---|
| **DK7** (leaving-pane opacity = 2nd clock, `dock.css:805-810` + `:839-844`) | **W01 re-open** (augment) | The `opacity var(--dock-motion-resize)` fixed-duration transition is the "root transitions → calc-off-scalar" surface W01 OWNS (W01 deleted the SIZE dual-driver but left the OPACITY one). W02's `dock.css` FileBounds is the "vocabulary/stagger seam ONLY" (W02:207) — vocabulary unification, NOT the crossfade clock. **W45 is OUT of bounds**: its FileBounds (W45:276) explicitly excludes "the `--dock-morph-t` spring DRIVER... + the dock.css morph transition" as W01's. So the R-dock-layer-anim "AUGMENT W45" routing is WRONG for the opacity-clock fix — W45 cannot touch the morph transition. The clock fix is **W01 territory** (the same `complete`→re-open A-dock-collapse-timing already opens for DK1). Fold the leaving-pane `opacity: calc(1 - --dock-morph-t)` + the driver-settle visibility flip into the W01 re-open as a SECOND arm alongside the summary-stagger-direction arm. |
| **DK6** (layers FIRST-CLASS + animated) | **W06 + W18 demo augment** (not a new wave) | Once DK7's clock fix lands, the layer swap IS first-class (one continuous spring). The "should be SHOWCASED" remit is the demo/showcase gap W06 (dock animation showcase section, already a CONVERGENCE-PLAN W06 augment) + W18 (Dock first-class category) own. No library mechanism is missing. |
| Directional layer motion (dead `directionTypes` hint) | **W01/W02 NOTE** (deferred, not net-new) | `directionTypes` is computed but ignored; re-activating it for a directional crossfade `translate` is a driver enhancement, NOT a W45/demo concern. Record as a deferred driver NOTE — secondary to the clock fix. |

### Why NOT net-new

No new wave. DK7 is a pure crossfade-CLOCK correction in W01's settled morph-transition territory
(the leaving-pane opacity is the one axis W01's "one clock" thesis left on a CSS timer). It is the
SAME `complete`→`live-pending` W01 re-open A-dock-collapse-timing already proposes for DK1 — add the
inner-pane crossfade-clock arm to that SAME re-open (two arms, one re-opened wave: outer-summary
stagger DIRECTION + inner-pane crossfade CLOCK). DK6 rides W06/W18 demo augments. The spring CURVES
need no change (W05 is SOTA-clean per R-dock-layer-anim §1.1 + §2).

### Cross-ref check (W45/W05/W02 per the lane brief)

- **W45** — owns the persistent-region/page-flow STRUCTURE; its FileBounds **EXCLUDE** the morph
  transition (`dock.css:805-810`). It CANNOT own the DK7 opacity-clock fix. The R-dock-layer-anim
  "AUGMENT W45 with opacity-on-scalar" routing must be CORRECTED → the clock fix is W01's (W45's own
  FileBounds reject it). W45 DOES structurally help DK1 (the `#persistent` region front-loads the
  summary glyph), but the inner-pane crossfade clock is W01.
- **W05** — owns the `--spring-*` vocabulary; the spring REGISTERS are already SOTA. NOT a DK7 owner
  (DK7 is a clock-COUPLING defect, not a register defect — R-dock-layer-anim §5 confirms W05 ≠ DK7).
- **W02** — owns the orchestrator DI + the vocabulary unification; `complete`. The vocabulary is
  unified correctly (`.is-active`/`.is-leaving`); the bug is the leaving-pane OPACITY clock, which is
  W01's morph-transition surface, not W02's vocabulary seam.
- **W01** — owns the single-scalar morph + the root transition→calc-off-scalar conversion;
  `complete`. The DK7 clock fix is the ONE axis (leaving-pane opacity) W01's conversion missed —
  the same cardinal-lesson `complete`-on-headless-green pattern as the W09/W05 re-opens.

---

## Evidence index (file:line)

- `src/styles/dock.css:805-810` — the fixed-duration `opacity var(--dock-motion-resize)` + `visibility 0s linear var(--duration-normal)` transition (the SECOND + THIRD clocks).
- `src/styles/dock.css:839-844` — `.dock-layer-item-host.is-leaving { opacity: 0; visibility: visible }` (the leaving pane faded on the CSS clock, not the scalar).
- `src/styles/dock.css:49` — `--dock-motion-resize: var(--duration-normal) var(--dock-resize-spring)` (= 0.3s × the spring linear()).
- `src/styles/tokens.css:1456` — `--dock-resize-spring: var(--spring-dock)` (the fixed CSS clock curve, decoupled from the live ODE).
- `src/styles/dock.css:743` — `.dock-layer-stack { --dock-expand-t: var(--dock-morph-t) }` (the entering pane's stagger correctly rides the scalar — the model to extend to opacity).
- `src/styles/dock.css:908-925` — the entering-pane child stagger on `--dock-expand-t` (the calc-off-scalar idiom DK7 must adopt for the leaving-pane opacity).
- `src/styles/dock.css:746-761` — the AV.W9.0 deletion of the SIZE dual-driver race (the precedent: opacity must follow size onto the single clock).
- `src/components/custom/dock/composables/useLayerTransition.ts:163-167` — `armSpring().play()` settle callback (the driver-settle seam the visibility flip should key off, not the CSS timer).
- `src/components/custom/dock/composables/useLayerTransition.ts:50-54` — `directionTypes` accepted and IGNORED (the dead directional hint).
- `src/components/custom/dock/composables/dockMorphContext.ts:179-194,221-234` — `settleTarget`/`maybeSettleRoot` (the per-target spring-settle the visibility flip should consume).
- `src/components/custom/dock/DockLayerGroup.vue:94-98` — `directionTypes` computed (layer-back/forward) — never consumed.
- `src/components/custom/dock/DockLayer.vue:74` — `:class="{ 'is-active': isActive, 'is-leaving': isLeaving }"` (the inner pane host driven by the orchestrator's currentLayer/leavingLayer).
- `docs/tranches/AX/waves/AX.W45-dock-region-model-mobile-scale.md:276` — W45 FileBounds OUT-of-bounds on the morph transition (the dedup correction: W45 cannot own the DK7 clock fix).
- `docs/tranches/AX/audit/convergence2/R-dock-layer-anim.md §3.1` — the consumed SOTA recipe (crossfade on the scalar, not a CSS clock).
- `docs/tranches/AX/audit/convergence2/A-dock-collapse-timing.md` — the SISTER finding (DK1 outer-summary stagger DIRECTION → the SAME W01 re-open; this finding adds the inner-pane crossfade CLOCK arm).
- Demo consumers: `demo/stories/navigation/dock-layers.vue` (standalone `useLayerTransition`), `demo/stories/aurora/AuroraConfigDock.vue` (nested orchestrator path).
