# AX.W02 — DELTA: one morph orchestrator per dock

The paired-π BEFORE/AFTER + DELTA compare for the dock orchestrator fold. The
**code-level** delta is captured here in full; the **live π-lane screenshots**
(BEFORE/AFTER named-region captures) are the orchestrator's to run on the real
device per the W00 muster protocol — this build agent cannot drive a real browser
(the W01 lesson). The exact recipe + numeric pass criterion is in §Live-verify.

## BEFORE (HEAD / base 27036cc) — two engines, two clocks

A collapsible `<GlassDock>` wrapping a `<DockLayerGroup>` ran **TWO**
`useLayerTransition` instances:

- the OUTER collapse↔expand pair on `.dock-layers` (`GlassDock.vue` —
  `useLayerTransition({ containerEl: layersEl, … })`),
- the INNER pane pair on `.dock-layer-stack` (`DockLayerGroup.vue` —
  `useLayerTransition({ containerEl, … })`, instantiated **unconditionally**).

Each owns its own `SpringProgress` closure (`useLayerTransition.ts:92`). A
**simultaneous collapse + pane-swap** fired in one tick had **two springs** writing
the shared `--dock-morph-t` on the `.glass-dock` root on **uncoordinated clocks** —
the same pixels double-animated. The state vocabulary was DOUBLED
(`.layer-active` outer / `.is-active`+`.is-leaving` inner), kept in sync by a
load-bearing greppable comment, with a hand-typed `0.08/0.16/0.24/0.32/0.4` onset
ladder duplicated across both vocabularies.

## AFTER (W02) — one engine, one clock, one vocabulary

The dock is ONE morph stack whose active "layer" is `(expandedState × activePane)`:

- `GlassDock` builds **exactly one** `useDockMorphOrchestrator` (one
  `SpringProgress`) and **provides** the `DockMorphContext` (the new
  `createOptionalContext` seam).
- A nested `<DockLayerGroup>` **injects** the optional context and **defers** —
  `registerGroup({ containerEl, activeLayer, axis })` registers its pane-stack as a
  **second morph target on the one spring**, minting **zero** engines of its own.
- A standalone `<DockLayerGroup>` (no `<GlassDock>` ancestor) reads `null` and
  **self-orchestrates** with its own `useLayerTransition` exactly as before
  (befitting-silent missing-provider).
- The outer/inner vocabulary collapses onto `.is-active`/`.is-leaving`; the
  greppable-sync comment is DELETED; the onset ladder is one `--dock-stagger-step`
  token × child index over the unified vocabulary.

## DELTA (the one-clock narrative)

| Axis | BEFORE | AFTER |
|---|---|---|
| morph engines / nested dock | **2** `SpringProgress` | **1** (the dock orchestrator's) |
| `--dock-morph-t` writers | 2 (outer + inner, uncoordinated) | 1 (the shared spring) |
| simultaneous collapse+swap | two clocks → double-animated pixels | one clock → box + stack + stagger ride one `t` |
| active-state vocabulary | `.layer-active` / `.is-active` / `.is-leaving` (triple) | `.is-active` / `.is-leaving` (pair) |
| greppable-sync comment | present (load-bearing) | **deleted** |
| stagger onset | 5 magic numbers × 2 vocabularies | `calc(var(--dock-stagger-step) * N)`, one rule |

## Runtime reasoning (the W01 lesson — reason about the FRAME, not the build)

The build/typecheck/structure-gate all pass, but those do not prove the *runtime*
morph is one clock. The frame-by-frame argument:

1. **The scalar is shared by construction.** `--dock-morph-t` is `@property …
   inherits:true` on the `.glass-dock` root. ONE spring writing it once per frame is
   inherited by BOTH `.dock-layers` and the nested `.dock-layer-stack`. Each
   container carries its OWN `--dock-morph-from`/`--dock-morph-to` px span and reads
   the SHARED scalar via the existing `calc(from + (to−from)·t)` — so two containers
   interpolate against ONE `t`. No CSS change to the morph mechanic was needed.

2. **Simultaneous collapse + pane-swap.** Both targets' `activeLayer` watchers fire
   in the same flush → two `onSwap` calls. Each pins its container at `from`
   (from=to=from, scalar 0, `data-morphing`) and bumps its OWN `txId`, then schedules
   a rAF. Because the ids are **per-target** (not a shared counter — the bug I
   caught and fixed), BOTH rAFs survive: each measures its target's `max-content`
   to-size and calls `armTarget`. The FIRST `armTarget` creates the one
   `SpringProgress` (via `ensureSpringRunning`); the SECOND finds it fresh and
   re-confirms `target=1`. ONE `play()` loop writes the scalar; both containers ramp
   together. The single clock is the spring's one trajectory.

3. **Interrupt mid-flight (retarget).** A swap on target B while target A is mid-morph
   re-bases every still-pinned sibling's `from` to its CURRENT painted px before
   resetting the scalar, and `ensureSpringRunning` re-seats the spring from its
   carried velocity (not from rest). So A stays visually continuous from where it is;
   inertia carries — the iOS interruptible-physics contract W01 established, now
   across multiple targets.

4. **Binding verification (the silently-dropped-inject class).** The runtime mount
   test PROVES the inject fires: a stub `DockMorphContext` provided over the real
   `DOCK_MORPH_KEY` records that the nested group calls `registerGroup` exactly once
   AND mints zero `SpringProgress` of its own. A dropped inject (reading `undefined`)
   would route to the standalone path → a second engine → the test reds. This is the
   class build/typecheck/structure-grep cannot catch.

## Live-verify (the orchestrator runs this — the build agent cannot)

**Route:** `/navigation/dock-layers` (the new bi-axial nested showcase — the
"Collapse-while-switching (one orchestrator)" section: a COLLAPSIBLE
`<GlassDock>` wrapping a `<DockLayerGroup>` with ≥2 panes + a switcher rail; plus
the "Vertical overflow (re-adoption proof)" section).

**Gesture:** a simultaneous collapse + pane-swap in one tick — `page.hover` the
collapsed dock to expand WHILE clicking a rail tab to swap panes.

**Probe (the π-lane `proof:dock-orchestrator-single` runtime arm):** remove
`document.startViewTransition` (force the spring arm), tag the held dock, then
rAF-sample on ONE timeline: the dock-root box `getBoundingClientRect().width`, the
nested `.dock-layer-stack` width, and `getComputedStyle(root).getPropertyValue(
'--dock-morph-t')`.

**Pass criterion (numeric):**
- `--dock-morph-t` ramps over **≥5 rising frames** (a spring, not a snap);
- the dock-root box onset and the `--dock-morph-t` onset are **≤1 frame (≈16.7ms)**
  apart;
- the nested `.dock-layer-stack` onset and the `--dock-morph-t` onset are **≤1 frame**
  apart (the headline — a second `.dock-layer-stack` spring on a separate clock
  shows as a stack onset >1 frame from the scalar);
- **exactly ONE** morph engine drives the box (engineCount == 1).

**Visual-truth (frontend-design audit):** the box + the pane crossfade + the
per-child stagger read as **one continuous iOS spring** — no box-leads-content lag,
no double-animated pane pixels, no stagger-onset stutter; the leaving pane fades
cleanly under the arriving one. The vertical-overflow case reflows without fighting
`max-height`. Capture BEFORE (base 27036cc, two clocks) / AFTER (W02, one clock) /
DELTA named-region screenshots.
