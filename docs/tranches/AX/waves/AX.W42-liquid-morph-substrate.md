# AX.W42 — The unified liquid-morph substrate: `useLiquidMorph` / `--morph-t` as ONE idiom

**Band** A · DOCK / SUBSTRATE · **Severity** major · **dependsOn** AX.W00, AX.W01
· **Charter** AX.md REQUIREMENTS §18.1/§18.3 (the net-new unified MORPH substrate; the dock single-scalar
`--dock-morph-t` (W01) is its FIRST consumer) · **Research**
`docs/tranches/AX/research/liquidglass-synthesis.md` §1.4 + the 32-facet corpus facets 1/3/12/26/27/28/29/30
(`liquidglass-research-corpus.json`) · **Audit** the converge-synthesis verdict: net-new + wave-worthy but
~70% assembly, not greenfield.

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE Playwright + frontend-design audit. Per the hardened agent
> git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* A **morph** is an element's reshape between two states on one interruptible spring. The
> **single scalar** is the normalized `0→1` progress (`--morph-t`) one `SpringProgress` writes once per
> frame; every animated axis is a `calc()` read off it. A **MorphGroup** is the shared orchestrator (the
> web `GlassEffectContainer` / Motion `LayoutGroup`) nested elements inject so they share ONE clock. The
> **matched-geometry seam** is BIFURCATED: spring+FLIP for an element's OWN reshape; native View
> Transitions (`view-transition-name`) for a shared-element / route morph.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on three falsifiable witnesses that do NOT hold today:

- **RED witness 1 (no unified morph substrate exists — file-falsifiable).** REQUIREMENTS §18.3 mandates
  testing a net-new `useLiquidMorph` substrate; `find src/composables -name 'useLiquidMorph.ts' -o -name
  'useMorph*.ts'` returns NONE, and `grep -rn 'MorphGroup\|provideMorphGroup\|--morph-t\b' src/` returns
  ZERO. The morph idiom is per-component BESPOKE — `useLayerTransition.ts` is a 479-line dock-PRIVATE
  closure (the FLIP + velocity-continuity + will-change + clip-aperture lifecycle locked inside the dock
  dir), `value.js` re-derives its OWN box-leads-content FLIP-width fork because the barrel never re-exported
  the primitive (constellation slice 10 F0), and there is no shared `--morph-t` scalar any non-dock
  primitive can read. The falsifiable RED: *no `useLiquidMorph`/`MorphGroup`/`--morph-t` in the tree, ≥2
  independent FLIP re-derivations (`useLayerTransition` + the value.js fork) (RED). After: ONE substrate
  with ≥2 in-repo consumers, `useLayerTransition` a thin dock-flavored wrapper over it, `--morph-t` a
  `@property`-registered scalar (GREEN).*

- **RED witness 2 (the morph-state machine is a boolean, not a 3-state lifecycle — grep-falsifiable).**
  `useLayerTransition.ts` writes `data-morphing` as a boolean presence/absence on the `.glass-dock` root;
  the will-change promotion, the clip-reveal aperture, and the at-rest `overflow:visible` all key off
  `:not([data-morphing])` — ONE hook for three distinct lifecycle moments (arm-on-begin, hold-through-morph,
  clear-after-final-paint). The Radix/reka-ui canon (facet 28) is a 3-state `data-state` enum the
  arm/disarm seams key off independently. The falsifiable RED: *`grep -c 'data-morphing' src/` shows the
  boolean seam, NO `data-morph-state` enum (RED). After: the boolean promoted to
  `data-morph-state=idle|morphing|settled` so the three CSS hooks are distinct, with the
  `settled→idle` cleanup pulse firing the will-change/clip disarm (GREEN).*

- **RED witness 3 (no substrate-level perf/a11y invariant is shared — the morph discipline is
  re-hand-rolled per consumer).** The on-demand `will-change` lifecycle, the inheritance-bomb guard
  (`@property … inherits:false` + scalar-written-locally-not-`:root`), and the PRM fast-path
  (`respectReducedMotion` snap + the global transition-property strip) all live INSIDE `useLayerTransition`
  / `useSpring` as dock/spring-private discipline; a new morphing primitive (a card→detail, a tab
  indicator) must re-hand-roll all three or leak a compositor layer / re-arm the inheritance bomb. The
  falsifiable RED: *no shared substrate carries the four morph invariants — a naive consumer that writes
  `--morph-t` to `:root` or stands a permanent `will-change` has no guard to inherit (RED). After: the
  substrate owns will-change-lifecycle + inheritance-bomb-guard + PRM-fast-path + one-driver-per-axis as
  substrate-level invariants every consumer inherits (GREEN).*

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE writing the substrate, drive the live
dock morph (post-W01) in the π-lane and CONFIRM (a) the W01 single-scalar `--dock-morph-t` is the SOLE
driver of the dock box, (b) the velocity-continuity retarget fires on a mid-flight re-toggle, (c)
`value.js` STILL carries its FLIP-width fork at the measured pin. Record the confirmation in §Archaeology —
the substrate is the GENERALIZATION of the W01 model, so the W01 model must be live-true before W42 lifts
it.

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

`useLiquidMorph(elRef)` + `--morph-t` + `MorphGroup` ship as ONE reusable morph substrate — the web analog
of SwiftUI's `GlassEffectContainer` + `glassEffectID` and Motion's `LayoutGroup` + `layoutId` — so "every
element morphs/springs/flows" is ONE idiom, not per-component bespoke: the dock (W01's `--dock-morph-t`
becomes the FIRST consumer, `useLayerTransition` a thin wrapper), plus ≥1 glass primitive
(dialog/popover/card→detail/tab-indicator/segmented-toggle), compose the SAME spring + the SAME 3-state
lifecycle + the SAME four perf/a11y invariants, with the matched-geometry seam BIFURCATED (spring+FLIP for
self-reshape, native View Transitions for the route/shared-element morph) and the lensing-backdrop-filter
fold explicitly `@supports`-gated Chromium-only with a graceful fail to the flat-glass tier.

---

## Scope (the gestalt — no workaround, no per-component bespoke, no over-generalization)

The §18.3 substrate is ~70% ASSEMBLY of primitives already in the tree (the reuse ledger below); the
net-new is the unifying API surface + the `MorphGroup` orchestrator + the `axes`-declaration that lets CSS
`calc()` off one scalar + the 3-state lifecycle enum. The substrate ships ONLY with ≥2 real consumers at
landing (the dock + ≥1 glass primitive) — every API knob needs a named consumer or it is overfit substrate
(L invariant 8; the §0 no-overfitting bar). Six folds:

1. **The single-scalar morph kernel — `useLiquidMorph(elRef, options)`.** A per-element driver that owns
   ONE `SpringProgress` (the keyframes.js LIGHT-barrel core via the existing `useSpring`, NEVER value.js),
   writes a single normalized scalar to `--morph-t` on `elRef` once per frame, and exposes
   `{ progress, state, retarget(toState) }`. The `state` option is the discrete model state
   (`collapsed|expanded` × `activePane` for the dock; `closed|open` for a panel; `off|subtle|full` for
   glass specular). The `axes` option DECLARES which CSS axes interpolate — **JS owns ONLY the scalar plus
   the single SIZE axis it must FLIP-measure**; CSS does the `calc()` off `--morph-t` for everything else
   (radius/padding/scale/color-mix/child-stagger). A re-toggle calls `retarget()` which re-seats the live
   spring target from `(value, velocity)` — interruptibility for free (the AV.W9.2 velocity-continuity
   seam, promoted from dock-private to substrate). `--morph-t` is `@property`-registered
   `{ syntax:"<number>"; inherits:false; initial-value:0 }` — registered so it interpolates composited (an
   unregistered custom property animates DISCRETELY), `inherits:false` as the inheritance-bomb guard, and
   written LOCALLY on `elRef` (never `:root`).

2. **The `MorphGroup` orchestrator — `provideMorphGroup()` / inject pair (the `GlassEffectContainer` /
   `LayoutGroup` analog).** Nested morphable elements INJECT this shared orchestrator and DEFER to its ONE
   clock; they NEVER spin up their own engine (the W02 born-RED). Built on the existing
   `createOptionalContext` factory (`src/composables/context/`): a missing provider is a BEFITTING-silent
   standalone-render path (the element self-orchestrates), present is the deferral. This IS the
   generalization of W02's `dockMorphContext` — W02 establishes the dock-flavored first instance; W42 lifts
   it to the general `MorphGroup` the dock + a future fusing toolbar both inject. The `spacing` option is
   the gel-merge THRESHOLD (the Apple metaball-fuse distance) — but the gooey-merge RENDER is an
   `@supports`-gated Chromium-only garnish (see fold 5), never the structural silhouette.

3. **The 3-state morph lifecycle — promote `data-morphing` to `data-morph-state=idle|morphing|settled`.**
   The boolean becomes a Radix-style enum (facet 28; Apple's rest→flex/materialize→settled taxonomy) so the
   clip-reveal aperture, the will-change promotion, and the at-rest `overflow:visible` key off THREE
   distinct hooks instead of one presence/absence. The set/clear seam: `setMorphState(el,'morphing')` at
   gesture START (co-temporal with the first `--morph-t` write — same element, same frame-origin, or the
   box-leads-content desync returns), `setMorphState(el,'settled')` on `spring.settled`/`transitionend`
   AFTER the final paint, with a rAF-deferred return to `idle` so a `settled→idle` cleanup pulse fires
   (clear will-change, lift the clip). The settle is PROGRESS-KEYED (fires on `spring.settled`, not a
   timer; a fixed-ms `setTimeout` is the transitionId-guarded missed-settle safety only).

4. **The four perf/a11y invariants as SUBSTRATE-LEVEL guards (every consumer inherits them).** (a)
   **On-demand will-change** — promote `will-change:<dim>` ONLY for the morphing state, clear to `auto` on
   settle AFTER the final paint (clearing early flashes the last frame); never a standing hint. (b)
   **Inheritance-bomb guard** — `--morph-t` `@property inherits:false`, written local; per-frame color
   shifts route through a DISCRETE class/state swap, never a per-frame interpolation of an inherited var
   (`--phase-color`/`--shadow-color`). (c) **PRM fast-path** — `respectReducedMotion` snaps `idle→settled`
   in one tick (no spring, no stagger, no rAF); a CSS-only PRM reset CANNOT reach a JS-written custom
   property, so the JS gate is load-bearing; the stagger flushes synchronously under reduce. (d)
   **One-driver-per-axis** — the spring is the SOLE authority on the size axis; `interpolate-size`/`calc-size`
   NEVER co-drives it (the AV.W9.0 dock-freeze). These are not consumer discipline — they are substrate
   invariants, gated.

5. **The matched-geometry seam stays BIFURCATED + the lensing fold is `@supports`-gated Chromium-only.**
   `useLiquidMorph` drives self-reshape via spring+FLIP (NO View Transitions — VT crossfades rasterized
   snapshots, the wrong primitive for a same-element layout morph); it ALSO exposes an opt-in `morphId`
   that sets a `view-transition-name` for the shared-element/route case (preserving the fourier
   `glass-dock-${useId()}` route-morph seam). The substrate offers BOTH and documents which to reach for;
   conflating them is the AW regression. **The lensing-backdrop-filter is explicitly the flat-glass tier's
   `@supports`-gated Chromium-only enhancement** — `useLiquidMorph` may drive a registered
   `--glass-refract-scale` off `--morph-t` so the lens springs as the box flexes, but ONLY behind
   `@supports (backdrop-filter: url('#…'))` over the universal blur base (WebKit bug 245510 open, Firefox
   not shipping). **No-workaround posture: the substrate fails to the flat-glass tier EXPLICITLY** — on a
   non-Chromium engine the lens silently degrades to the blur fallback (a befitting browser-API
   degradation), NOT a broken `url()` ref, NOT a JS-stomped inline filter (the AX.W20-retired
   `createGlassFilter` anti-pattern). Only `scale` animates cheaply; a shape/size change forces a full
   displacement-map rebuild, so NEVER regenerate the map mid-morph.

6. **The three opt-in tiers (cheapest first) + the reuse ledger.** (a) **CSS-only** — an element joins a
   `.glass-material`/morph-aware class and reads `--morph-t` from an ancestor `MorphGroup`, zero JS (child
   stagger, color, radius). (b) **Composable** — `useLiquidMorph(elRef)` for an element owning its own
   reshape (dock root, panel); one call, the substrate owns spring + FLIP + will-change + PRM +
   clip-aperture lifecycle. (c) **Group** — wrap children in `MorphGroup` for coordinated/nested morphs
   (dock + DockLayerGroup; a toolbar of fusing controls). The substrate is ~70% built: REUSE
   `keyframes.js SpringProgress` (analytic ODE, retargetable, settle-aware) · `useSpring` (Vue wrapper) ·
   `useLayerTransition` (FLIP + velocity-continuity + will-change + clip-aperture lifecycle → **promote**
   from dock-private to substrate) · `createStrictContext`/`createOptionalContext` (typed DI) ·
   `useViewTransition` (route-morph seam) · `useSpecularTracking` (the W09 light seam). NET-NEW: the
   unifying API surface + the `MorphGroup` orchestrator + the `axes`-declaration + the 3-state lifecycle
   enum.

No workaround, no parallel morph path, no speculative options surface. The substrate is the
re-derivation that makes single-authorship STRUCTURAL, not a per-consumer discipline.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Access | Why |
|---|---|---|
| `src/composables/motion/useLiquidMorph.ts` | **create** | the per-element driver — owns the one `SpringProgress`, writes `--morph-t`, exposes `{progress, state, retarget}`, the `axes`-declaration, the optional `morphId` VT seam |
| `src/composables/motion/useMorphState.ts` | **create** | the 3-state lifecycle composable — `{ state, begin(), settle() }` owning the `data-morph-state` write + the will-change/clip/stagger arm-disarm lifecycle (the facet-28 extracted seam) |
| `src/composables/motion/morphGroupContext.ts` | **create** | the `createOptionalContext<MorphGroupContext>` orchestrator DI seam + `provideMorphGroup`/`useMorphGroup` helpers (the `GlassEffectContainer`/`LayoutGroup` analog) |
| `src/composables/motion/index.ts` | modify | barrel-export `useLiquidMorph` + `useMorphState` + the `MorphGroup` helpers/key/types |
| `src/composables/motion/useLayerTransition.ts` | modify | **RE-DERIVE as a thin dock-flavored wrapper over `useLiquidMorph`** (after W01 lands its single-scalar rewrite; W42 lifts the FLIP + velocity-continuity + clip-aperture lifecycle into the substrate, and `useLayerTransition` becomes the dock instance) — coordinated with W01 (see Disjointness) |
| `src/styles/tokens.css` | modify | register `@property --morph-t { syntax:"<number>"; inherits:false; initial-value:0 }` (+ the registered `--glass-refract-scale` if the lensing fold lands) near the existing `@property` cohort |
| `src/styles/glass.css` | modify | the `@supports (backdrop-filter: url('#…'))`-gated `--glass-refract-scale` read off `--morph-t` (the lensing-springs-as-box-flexes fold) — ADDITIVE over the blur base, never the substrate |
| `src/components/custom/dock/index.ts` | modify | the dock subpath barrel re-exports the rebuilt `useLayerTransition` (substrate-with-consumer — the value.js fork-deletion target; the adoption leg → W34) |
| `src/components/ui/<glass-primitive>/<Primitive>.vue` | modify | the SECOND consumer — ONE glass primitive (dialog/popover/card→detail/tab-indicator/segmented-toggle) composes `useLiquidMorph` so the substrate ships with ≥2 consumers at landing (RATIFY the primitive — see Open Questions) |
| `scripts/proof-morph-substrate-single.mjs` | **create** | the born-RED π-lane gate (the substrate is the sole morph engine across its consumers; one driver per axis; the 3-state lifecycle; the inheritance-bomb / will-change-lifecycle guards) |
| `package.json` | modify | register `proof:morph-substrate-single` + the W00 meta-gate parity match |
| `tests/composables/motion/liquid-morph.detect.test.ts` | **create** | pure-detector vitest — a synthetic two-driver / inherited-scalar / standing-will-change series flags a violation; a clean single-scalar series passes |
| `docs/tranches/AX/audit/W42-liquid-morph-substrate.json` | **create** | the born-RED→GREEN audit artefact |

**Do NOT touch:** the dock band's OWN files beyond the `useLayerTransition` re-derivation +
`dock/index.ts` barrel (W01 owns the dock.css morph rules + the `--dock-morph-t` write; W42 generalizes the
SCALAR mechanism, it does not re-author the dock's CSS); `useSpecularTracking.ts` (W09 owns it; W42 CONSUMES
it as the light seam); `tokens.css`/`theme.css` spring TOKENS (W05 governs the vocabulary; W42 consumes the
governed register); the value.js sibling source (the fork-deletion adoption is W34); any aurora/blob shader
(W07/W08); `useViewTransition.ts` (W42 CONSUMES it for the `morphId` route seam, does not re-author it).

---

## Disjointness (sibling waves it must NOT overlap)

W42 is the substrate-generalization of the dock band; it opens AFTER W01 lands the single-scalar dock
model it lifts. The shared surfaces + collision-avoidance:

- **vs AX.W01 (single-scalar dock morph) — HARD dependsOn, shared file `useLayerTransition.ts`.** W01 owns
  the 479→~130 single-scalar rewrite of `useLayerTransition` + the `--dock-morph-t` write + the VT-collapse
  retirement; W42 then RE-DERIVES that settled `useLayerTransition` as a thin wrapper over `useLiquidMorph`,
  lifting the FLIP + velocity-continuity + clip-aperture lifecycle into the substrate. **SEQUENCED, never
  concurrent:** W42 opens strictly after W01 closes so W01's rebuilt primitive is the fixed model W42
  generalizes — the `--dock-morph-t` scalar becomes the FIRST `--morph-t` instance. If the orchestrator
  prefers, W42 can be folded INTO W01 (the substrate authored as W01's `useLayerTransition` rewrite, with
  W42 as the generalization arm) — but the §18.3 net-new mandate + the ≥2-consumer bar argue for a distinct
  wave so the glass-primitive second consumer lands WITH the substrate (RATIFY — see Open Questions).
- **vs AX.W02 (one morph orchestrator per dock) — shared concept, disjoint file.** W02 authors
  `dockMorphContext.ts` (the dock-flavored `createOptionalContext` orchestrator); W42 authors the GENERAL
  `morphGroupContext.ts` (`MorphGroup`). W02's dock context becomes an INSTANCE of W42's `MorphGroup` (or
  W42's `MorphGroup` is what W02's `dockMorphContext` provides through) — coordinate so the dock orchestrator
  is the dock-flavored first consumer of the general facility, not a parallel second context. If W42 follows
  W02, W42 lifts `dockMorphContext` onto `MorphGroup`; if W42 precedes W02, W02 consumes `MorphGroup`
  directly. RATIFY the ordering at wave-open.
- **vs AX.W03 (keepDockOpen / held-as-morph-state).** W03 makes `held` a first-class morph-state INPUT to
  the dock state machine; W42 generalizes the morph-STATE-MACHINE (the `data-morph-state` enum). Disjoint
  file (W03: `useDockHold.ts`/`Slider.vue`; W42: `useMorphState.ts`). The `held`-as-morph-input is a W03
  contract on the dock instance; W42 carries the GENERAL `state` option the held edge feeds. Coordinate so
  the 3-state lifecycle W42 mints is the one W03's held edge drives (no parallel state machine).
- **vs AX.W05 (one iOS-spring vocabulary).** W05 governs the `--spring-*` register vocabulary; W42 CONSUMES
  the governed register (the substrate defaults to `--spring-dock`, opts into settle/control/playful). W42
  does NOT mint a new spring curve or hand-roll a `k` constant (the overfitting + drift hazards). Disjoint
  file; W42 depends on W05's settled vocabulary if it lands first, else consumes the published `(0.32,0.7)`.
- **vs AX.W09 (specular tune).** W09 mints `useSpecularTracking()` + the `--glass-specular-intensity-*`
  ladder; W42 CONSUMES them as the light seam (the specular rung is a morph-state-driven read off
  `--morph-t`). Disjoint file. W42's lensing fold (`--glass-refract-scale`) is the REFRACTION half, W09's
  is the SPECULAR half — the two material halves stay un-conflated (W09 §SOTA fold 6 flags this).
- **vs AX.W20 (primitive fix — the GlassPanel/createGlassFilter retire).** W20 RETIRES the imperative
  style-stomping JS filter; W42's lensing fold is the CSS-cascade-additive `@supports`-gated REPLACEMENT
  posture (never an inline-style write). Disjoint file (W20: `useGlassRenderer.ts`/`GlassPanel`; W42:
  `glass.css`/`tokens.css` the `--glass-refract-scale` read). W42 must NOT resurrect the imperative filter —
  the lensing fold is additive over `.glass-material`, exactly the path W20 ratifies.
- **vs AX.W34 (cross-repo consumer adoption).** W42 exposes the rebuilt `useLayerTransition` on the `/dock`
  barrel WITH the value.js fork-deletion as its named consumer; the value.js edit (delete the fork +
  re-point `ActionBarLayer.vue`) executes in W34. W42 writes NO sibling source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W42's actual split (count 3):

- **Implement (≤2 agents, serial).** Agent-A: the substrate core — `useLiquidMorph.ts` (the scalar driver +
  `axes`-declaration + `morphId` seam), `useMorphState.ts` (the 3-state lifecycle), `morphGroupContext.ts`
  (the `MorphGroup` DI), the motion barrel, the `@property --morph-t` registration. Agent-B (opens after A):
  the consumer wiring — re-derive `useLayerTransition` as the thin dock wrapper, compose `useLiquidMorph`
  into the ONE ratified glass primitive (the second consumer), the `/dock` barrel re-export, the
  `@supports`-gated `--glass-refract-scale` lensing fold. Serial because both touch the substrate API
  contract from two sides (the substrate shape ↔ the two consumers) and must agree on the `axes`-declaration
  + the `state` option shape.
- **Adversarially-verify (≤1 read-only lane).** The δ idiomatic-gestalt + π visual-runtime adversary.
  Confirms (a) `useLiquidMorph` is the SOLE morph engine across its two consumers (no second `SpringProgress`
  per consumer; greps for any residual per-component FLIP closure), (b) `--morph-t` is `@property
  inherits:false` written LOCAL not `:root` (the inheritance-bomb guard fires), (c) the will-change is
  on-demand (set on `morphing`, cleared on `settled` after the final paint — attempts a standing-hint leak
  and proves the substrate clears it), (d) the PRM fast-path snaps `idle→settled` with zero rAF / zero
  stagger, (e) the size axis has ONE driver (attempts an `interpolate-size` co-driver and proves the morph
  freezes / the gate REDs), (f) the `morphId` VT seam is OPT-IN and the self-reshape does NOT touch VT, (g)
  the lensing fold degrades to the flat blur tier on a non-Chromium engine with NO broken `url()` and NO
  inline-style stomp. RATIFIES the second-consumer choice + the W01-fold-vs-distinct-wave decision against
  the live re-diagnosis.
- **Gate-author (≤1 agent).** Authors `proof-morph-substrate-single.mjs` (π-lane, born-RED — the substrate
  is the sole engine, one driver per axis, the 3-state lifecycle, the four invariants) + the pure-detector
  vitest + the `package.json` entry + the W00 meta-gate parity. Gate-author is distinct from implementer
  (the gate must be able to FAIL the implementer's work — same-author gate is the AW false-GREEN class). The
  gate drives the morph DETERMINISTICALLY (the keyframes-device-proven un-measurability — the spring clock
  has no naive `getBoundingClientRect` handle; force the readable arm via test-flag/PRM, real `page.hover`,
  expose the spring as a test seam + parse the token peak — per the W00 design).

---

## HardGate (born-RED → GREEN + the MANDATORY VISUAL-TRUTH live audit)

Numbered, evidence-backed, born-RED → GREEN. Precept-valid artefact forms (runtime behavioral test + build
+ deletion proof — NOT grep-only for the runtime morph behavior, per SPEC.md §Hard Gates):

1. **`proof:morph-substrate-single` — fail-CLOSED, DEFAULT engine (π-lane).** Mount the dock + the second
   glass-primitive consumer; drive each morph deterministically; assert (a) exactly ONE `SpringProgress`
   morph engine per morphing element (count the live engines — no per-component second engine), (b) the
   size axis has ONE driver (no `interpolate-size`/`calc-size` co-drive on the spring's axis), (c) the
   `data-morph-state` resolves through `idle|morphing|settled` (the 3-state lifecycle, not the boolean), (d)
   the `--morph-t` write + the `data-morph-state` write are CO-TEMPORAL (same element, same frame-origin —
   no box-leads-content). **Born-RED at HEAD** (no substrate exists; `useLayerTransition` is the dock-private
   closure + value.js re-derives a second FLIP). GREEN after the substrate lands with both consumers on it.
2. **Inheritance-bomb + will-change-lifecycle guard (runtime/source-resolution).** Assert `--morph-t` is
   `@property`-registered `inherits:false` AND written on the morphing element (NOT `:root`); assert
   `will-change` is set only in the `morphing` state and cleared to `auto` in `settled` (a computed-style
   probe across the lifecycle). Born-RED if absent; GREEN after.
3. **PRM fast-path (runtime).** Under `prefers-reduced-motion: reduce` the morph snaps `idle→settled` in
   one tick — assert ZERO intermediate `--morph-t` frames and the stagger flushed synchronously. Born-RED
   (no substrate PRM path); GREEN after.
4. **Bifurcated-seam + lensing-degrade proof.** Assert the self-reshape drives spring+FLIP and does NOT set
   a `view-transition-name` (the `morphId` is OPT-IN); assert `proof:vt-names` route-morph seam intact (the
   per-instance `view-transition-name` survives); assert the `--glass-refract-scale` lensing read sits
   behind `@supports (backdrop-filter: url('#…'))` over a blur fallback (a source-form deletion-proof — no
   un-gated `url()` leak, no imperative inline-style filter). Born-RED/GREEN per the substrate.
5. **Barrel-reach + substrate-with-consumer proof.** A consumer-probe `import { useLiquidMorph } from
   "@mkbabb/glass-ui/motion"` resolves; `useLayerTransition` is a thin wrapper over it (line-count + diff
   proof); the `/dock` barrel re-exports the rebuilt `useLayerTransition` (the value.js fork-deletion target
   reachable). The substrate ships with ≥2 in-repo consumers (the dock + the ratified glass primitive) — a
   substrate-without-consumer count of <2 FAILS CLOSED.
6. **vitest `liquid-morph.detect.test.ts`** — the pure detector flags a synthetic two-driver /
   inherited-scalar / standing-will-change series as a violation and a clean single-scalar series as clean
   (so the gate's failure path is itself covered).
7. **`npm run typecheck` + `npm run build` clean; `proof:no-test-in-src` GREEN** (the new spec lives under
   `tests/`).

**MANDATORY VISUAL-TRUTH (non-negotiable per AX.W00; appearance/interaction axis, NOT a headless proof
alone).** The wave does NOT close on the numeric gates. Its close criterion is an EXECUTED live Playwright +
frontend-design audit on the real device:

- both consumers (the dock collapse↔expand AND the second glass-primitive morph — e.g. a card→detail
  expand or a tab-indicator glide) read as ONE continuous iOS spring on the DEFAULT engine — overshoot,
  settle, interruptible retarget — identical across both, captured as a paired-π BEFORE/AFTER + DELTA over
  ≥3 viewports in light AND dark;
- a mid-flight re-toggle on EACH consumer reverses smoothly (the velocity-continuity retarget reads as
  fluid, NOT a jump-cut) — the load-bearing iOS-feel proof the substrate generalizes;
- the lensing fold (if landed) reads as a lens springing open on the Chromium engine AND degrades cleanly
  to the flat blur tier on a non-Chromium engine (no broken `url()`, no blank first paint, no
  five-rungs-identical stomp);
- under `prefers-reduced-motion` BOTH consumers snap to the target state with zero motion frames and a
  correct layout outcome (the morph collapses, the state change still resolves).

**Visual-truth gate one-liner:** a live Playwright + frontend-design audit confirms the dock AND ≥1 glass
primitive morph as ONE continuous iOS spring on the DEFAULT engine off the SAME `useLiquidMorph`/`--morph-t`
substrate, the velocity-continuity retarget reverses a mid-flight re-toggle fluidly on each, the lensing
fold degrades cleanly to flat-glass on non-Chromium, and PRM snaps both to target — the numeric gate alone
does NOT close the wave.

---

## Cadence (sub-step order)

1. **Live re-diagnosis (W00 wave-open ritual).** Drive the post-W01 dock morph in the π-lane; confirm the
   single-scalar `--dock-morph-t` is the sole dock driver + the velocity-continuity retarget fires + value.js
   still carries its FLIP-width fork. Record the baseline in §Archaeology. RATIFY the second-consumer choice
   + the W01-fold-vs-distinct-wave + the W02-ordering decisions against the live model.
2. **Gate-author born-RED.** Author `proof:morph-substrate-single` (RED: no substrate; ≥2 FLIP
   re-derivations) + the pure-detector vitest; confirm RED at HEAD.
3. **Implement the substrate core (Agent-A).** `useLiquidMorph.ts` (the scalar driver + `axes` + `morphId`)
   → `useMorphState.ts` (the 3-state lifecycle) → `morphGroupContext.ts` (`MorphGroup`) → the motion barrel
   → the `@property --morph-t` registration. The four invariants (will-change-lifecycle, inheritance-bomb
   guard, PRM fast-path, one-driver-per-axis) as substrate-level guards.
4. **Wire the consumers (Agent-B, after A).** Re-derive `useLayerTransition` as the thin dock wrapper over
   `useLiquidMorph`; compose `useLiquidMorph` into the ONE ratified glass primitive (the second consumer);
   re-export `useLayerTransition` on the `/dock` barrel; land the `@supports`-gated `--glass-refract-scale`
   lensing fold (additive over the blur base).
5. **Flip the gates GREEN + adversarial verify.** `proof:morph-substrate-single` GREEN; the
   inheritance-bomb/will-change/PRM/bifurcated-seam proofs GREEN; the barrel-reach + ≥2-consumer proof GREEN;
   the vitest GREEN; typecheck + build clean. Adversary confirms the four invariants fire + the lensing
   degrades.
6. **VISUAL-TRUTH close.** Executed live audit + BEFORE/AFTER/DELTA.md capture (both consumers read as one
   iOS spring, the retarget reverses fluidly, the lensing degrades, PRM snaps) — the close criterion.
7. **Doc-update.** Flip the wave status + emit the audit json (DOC_UPDATE_WAVE protocol — docs update before
   the next wave opens); route the value.js fork-deletion adoption leg to W34.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (step 3,
step 4, step 5) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W42-liquid-morph-substrate.json` — the born-RED→GREEN ledger: the three RED
  witnesses (no substrate / boolean-not-enum lifecycle / no shared invariants), the reuse-ledger
  (~70%-assembly inventory), the net-new surface (the API + `MorphGroup` + `axes`-declaration + lifecycle
  enum), the second-consumer choice + rationale, the W01-fold-vs-distinct-wave + W02-ordering dispositions,
  and the post-wave GREEN measurements.
- `docs/tranches/AX/audit/W42-DELTA.md` — the paired-π BEFORE/AFTER + DELTA compare-at-close: both consumers
  on the substrate reading as one iOS spring, the retarget-reverses-fluidly capture, the lensing-degrades
  A/B (Chromium lens vs non-Chromium flat-glass), the PRM-snaps capture.
- The vitest run log for `liquid-morph.detect.test.ts`.
- The diff localizing `useLayerTransition` re-derived as a thin wrapper + the second-consumer
  `useLiquidMorph` composition + the `@property --morph-t` registration.
- A short cross-repo adoption-leg note appended to the W34 ledger (value.js deletes its FLIP-width fork +
  re-points `ActionBarLayer.vue` onto the re-exported `useLayerTransition`) — read-only routing, not an
  edit.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(motion): born-RED proof:morph-substrate-single — one morph engine + 3-state lifecycle + the four invariants (AX.W42)` — body: names the no-substrate / boolean-lifecycle / no-shared-invariant RED witnesses + the deterministic-drive design inherited from W00.
2. `feat(motion): useLiquidMorph + useMorphState + MorphGroup — the unified single-scalar morph substrate (AX.W42)` — body: the GlassEffectContainer/glassEffectID + LayoutGroup/layoutId web transposition; the @property --morph-t scalar + the four substrate invariants; the ~70%-assembly reuse ledger.
3. `refactor(dock): re-derive useLayerTransition as a thin wrapper over useLiquidMorph; expose on /dock (AX.W42)` — body: --dock-morph-t is the first --morph-t consumer; the value.js fork-deletion target (adoption → W34).
4. `feat(<primitive>): compose useLiquidMorph as the second substrate consumer (AX.W42)` — body: the ≥2-consumer-at-landing bar; the ratified glass primitive; the bifurcated self-reshape-vs-morphId seam.
5. `feat(glass): @supports-gated --glass-refract-scale lensing springs off --morph-t — degrade to flat-glass on non-Chromium (AX.W42)` — body: additive over .glass-material, never an imperative filter; the no-workaround explicit-degrade posture.
6. `docs(tranche-AX): W42 morph-substrate fold record + paired-π DELTA + PROGRESS (AX.W42)` — body: the visual-truth audit verdict + the artefact paths + the W34 adoption-leg route.

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **dependsOn AX.W00 (the π visual-runtime lane) — the close machinery.** The substrate cannot close its
  visual-truth gate without the W00 fail-CLOSED π workspace; the deterministic-drive design (the
  keyframes-device-proven un-measurability of a spring morph), the paired-π BEFORE/AFTER/DELTA protocol, and
  the live-re-diagnosis ritual are all W00 machinery W42 consumes. The substrate's gate IS the W00-designed
  deterministic-drive applied to ≥2 consumers.
- **dependsOn AX.W01 (single-scalar dock morph) — HARD.** W01 establishes the single-scalar one-clock dock
  model (`--dock-morph-t`, the VT-collapse retirement, `useLayerTransition` re-derived 479→~130) that W42
  GENERALIZES. The `--dock-morph-t` scalar is the FIRST `--morph-t` instance; `useLayerTransition` becomes
  the thin dock wrapper. There is no single-scalar model to lift until W01 builds it — running W42 before W01
  would generalize a dock morph W01 then rewrites. (The orchestrator MAY fold W42 into W01 as the
  generalization arm — RATIFY; the §18.3 net-new mandate + the ≥2-consumer bar argue for a distinct wave.)
- **Soft-coordinates with AX.W02 (the `MorphGroup` ↔ `dockMorphContext` ordering — see Disjointness),
  AX.W03 (the `data-morph-state` enum the held edge feeds), AX.W05 (the governed spring register the
  substrate consumes), AX.W09 (the `useSpecularTracking` light seam + the SPECULAR/REFRACTION half split),
  AX.W20 (the no-imperative-filter posture the lensing fold honors).** None is a HARD dependsOn (W42 consumes
  each settled surface if it lands first, else the published baseline) — declared so the orchestrator
  sequences the substrate after the dock band's morph model + spring vocabulary settle.
- **Feeds AX.W34** (read-only routing) — the value.js FLIP-width fork-deletion + the `ActionBarLayer.vue`
  re-point onto the re-exported `useLayerTransition` is the consumer-adoption leg; W42 records it, W34
  executes it.

---

## Archaeology (the git / prior-tranche lineage + the research mandate)

- **REQUIREMENTS §18.1/§18.3 (the binding mandate).** §18.3 explicitly names the net-new unified MORPH
  substrate (`useLiquidMorph` — no such file at HEAD), names the dock single-scalar `--dock-morph-t` (W01)
  as its FIRST consumer, and the §18.1 directive is "every element morphs as ONE idiom, not per-component
  bespoke." W42 IS the §18.3 wave.
- **`e8380d7` (the single-clock high-water).** `useLayerTransition.ts` was 135 lines — ONE element, one
  spring, one clock by construction (slice 0 / the W01 re-derive target). The substrate lifts THIS model,
  not the accreted 479-line regression.
- **The accretion chain AQ.W6 → AU.W8 → AV.W9 → AW.W2/W3** — each bolted a coordination layer onto the
  prior seam; the FLIP + velocity-continuity (AV.W9.2) + clip-reveal aperture (AW.W2) + spring-keyed stagger
  (AW.W3) are the genuinely-correct machinery the substrate PROMOTES from dock-private to shared.
- **The value.js FLIP-width fork (constellation slice 10 F0).** value.js re-derives the EXACT
  box-leads-content algorithm in its own `demo/@/components/custom/dock/composables/useLayerTransition.ts`
  ONLY because the barrel never re-exported the primitive — the substrate-with-consumer witness the `/dock`
  re-export closes (the adoption leg → W34).
- **The research corpus (facets 1/3/12/26/27/28/29/30).** `useLiquidMorph` is the direct web transposition
  of SwiftUI's `GlassEffectContainer` + `glassEffectID` + Motion's `LayoutGroup` + `layoutId` — a proven,
  named API shape, not speculative; the synthesis §1.4 verdict: net-new + wave-worthy, ~70% assembly. The
  three-tier opt-in, the bifurcated matched-geometry seam, the 3-state lifecycle, and the four invariants
  are all corpus-grounded.
- **AV.W9.0 (the dual-driver dock-freeze).** The `interpolate-size`/`calc-size` second-driver against the
  spring froze the dock (born-RED) — the cardinal one-driver-per-axis lesson the substrate makes a
  STRUCTURAL invariant, not a per-consumer discipline.
- **Live re-diagnosis BEFORE the fix (AX.W00 ritual; §4 note 11).** The substrate is the generalization of
  W01's model; W42's Cadence step 1 records a live re-diagnosis that the W01 single-scalar model is
  live-true before lifting it.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/` (pinned `63240e6`); the band-A binding precepts (AX.md §2b) this wave pursues
+ must not violate:

- **one-path / no-legacy-code** (README §Edicts "Two orthogonal codepaths for the same logic is a code
  smell"). The morph idiom is per-component bespoke at HEAD (a dock-private closure + a value.js
  re-derivation); W42 collapses it to ONE substrate every consumer composes. The 3-state lifecycle replaces
  the boolean's single hook; the bifurcated seam keeps spring+FLIP and VT SEPARATE (conflating them is the
  AW regression). MUST NOT ship a parallel morph path or a second `SpringProgress` per consumer.
- **substrate-with-consumer / wire-before-retire** (README "Substrate and consumer land together. A
  primitive that is not consumed is unfinished work"; L invariant 8). The substrate ships WITH ≥2 in-repo
  consumers AT LANDING (the dock + the ratified glass primitive) + the value.js fork-deletion as the
  cross-repo adoption (W34). The ≥2-consumer count is gated fail-closed (§HardGate.5). MUST NOT ship a
  speculative options surface — every API knob (`axes`, `state`, `spacing`, `morphId`) needs a named
  consumer or it is overfit.
- **no-overfitting** (README "A public surface, helper, token, or component branch needs a current consumer
  and evidence. Otherwise delete it"; the overfitting-audit precept). The synthesis's explicit guard: ship
  ONLY with ≥2 real consumers; do NOT over-generalize into dead substrate (facet 26/27 — "useLiquidMorph
  must ship with at least 2 real consumers AT LANDING, not a speculative options surface no one uses"). The
  lensing fold is opt-in + Chromium-gated, not a substrate-promoted always-on.
- **abrogate-before-patch** (README "ask 'can we delete?' before 'can we patch?'"). The substrate
  RE-DERIVES the dock-private machinery into a shared facility (the value.js fork DELETED, not bridged); it
  is not a coordination layer atop the existing closures. The four invariants are STRUCTURAL guards, not
  per-consumer discipline patches.
- **typed-key + paired DI** (README §Code Discipline; SPEC.md). `MorphGroup` is provided through the
  canonical `createOptionalContext<MorphGroupContext>` factory with paired `provideMorphGroup`/`useMorphGroup`
  helpers (a missing provider is a BEFITTING-silent standalone-render path — `createOptionalContext`, not
  strict). Never a raw string `provide`/`inject`.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation** (README
  §Edicts; SPEC.md §Hard Gates). The substrate throws on a library-internal contract violation (a missing
  measure target, a two-driver-on-one-axis); a genuine browser-API absence (no `backdrop-filter: url()` on
  non-Chromium, no `requestAnimationFrame`, reduced-motion) stays a BEFITTING-silent degradation — the
  lensing fold fails to the flat-glass tier EXPLICITLY (the no-workaround posture), never a broken `url()`
  ref or a JS-stomped inline filter. The two are never collapsed.
- **inheritance-bomb + will-change discipline as substrate invariants** (the AV.W7 F3/F5 conventions; facet
  26/27/30). `--morph-t` is `@property inherits:false` written local; will-change is gesture-scoped; per-frame
  color routes through a discrete class swap. The substrate OWNS these so every consumer inherits the perf
  discipline — never re-hand-rolled, never leaked.
- **π visual-runtime lane** (SPEC.md §π; AX.W00). The wave closes on an EXECUTED live Playwright +
  frontend-design audit (≥3 viewports, both consumers, the retarget-reverses + lensing-degrades + PRM-snaps
  reads), not a headless proof. MUST NOT close on the numeric gate alone (the cardinal AW failure this
  tranche corrects).
- **Goal + completion criterion paired** (README §Edicts; WAVE_SPEC §2a/§6). The §Goal (one substrate, ≥2
  consumers, bifurcated seam, gated lensing) and the §HardGate (born-RED→GREEN `proof:morph-substrate-single`
  + visual-truth) are paired; a gate-pass with a goal-miss (the substrate exists but a consumer re-rolls its
  own FLIP, or the lensing leaks un-gated) closes `complete_with_misses`, not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **W42 as a DISTINCT wave vs folded into W01 — RATIFY.** The §18.3 net-new mandate + the
   ≥2-consumer-at-landing bar argue for a distinct wave (the glass-primitive second consumer lands WITH the
   substrate, not after). The counter: W01 already re-derives `useLayerTransition`, so the substrate could be
   authored AS that rewrite with W42 the generalization arm. **Recommendation: distinct wave** — the second
   consumer + the `MorphGroup` orchestrator + the lifecycle enum exceed W01's dock-collapse scope, and a
   distinct wave keeps the substrate-with-≥2-consumers bar enforceable at one close. RATIFY at wave-open.
2. **The SECOND consumer — which glass primitive — RATIFY.** Candidates (each a real morph the corpus
   names): a card→detail expand (`<Card>` surface morph), a Dialog/Popover materialize (the `@starting-style`
   entry composed with the spring), a tab-indicator glide (`UnderlineTabs` inset morph), or a
   segmented-toggle thumb (`BouncyToggle`/`ToggleGroup`). **Recommendation: the tab-indicator glide OR the
   card→detail expand** — both are genuine self-reshapes a consumer reaches for, both exercise the `axes`
   declaration, and neither duplicates the dock. AVOID picking a primitive whose morph is already
   `@starting-style`-native (Dialog entry) — that would be a CSS-only-tier consumer, not a composable-tier
   one, weakening the substrate proof. RATIFY against the live audit (the consumer must read BETTER on the
   substrate, not just compile).
3. **The `MorphGroup` ↔ W02 `dockMorphContext` ordering — RATIFY.** If W42 follows W02, W42 lifts
   `dockMorphContext` onto the general `MorphGroup`; if W42 precedes W02, W02 consumes `MorphGroup` directly.
   **Recommendation: W42 follows W02** (W02 establishes the dock-flavored orchestrator first; W42 generalizes
   it) — so the dock orchestrator is the first `MorphGroup` consumer, not a parallel context. RATIFY the
   sequence so the two are never authored as competing DI seams.
4. **The lensing fold — IN-SCOPE vs flagged-door — RATIFY.** The `@supports`-gated `--glass-refract-scale`
   springs-off-`--morph-t` fold is the genuine material addition, but it touches `glass.css` (W09/W20's
   neighbourhood) and the displacement-map is resize-expensive. **Recommendation: land the
   `--glass-refract-scale` REGISTRATION + the `@supports`-gated read off `--morph-t` IN W42** (it is the
   substrate's material seam, additive over the blur base, fail-explicit-degrade), but DEFER any
   3-pass-chromatic-aberration / Snell-normal-map UPGRADE to a future refraction wave (those are
   filter-graph re-authors, not substrate work). RATIFY the in-scope boundary so the substrate ships the
   spring-the-lens seam without absorbing the filter-graph upgrade.
5. **The `axes`-declaration shape — RATIFY.** The `axes` option declares which CSS axes interpolate so CSS
   does the `calc()` off `--morph-t` while JS owns only the scalar + the one FLIP-measured size axis. RATIFY
   whether `axes` is a string-literal union (`'inlineSize'|'radius'|'specular'|…`) the substrate enumerates,
   or an open `string[]` the consumer's CSS keys off freely. **Recommendation: a typed union of the axes the
   ≥2 consumers ACTUALLY drive** (the no-overfitting bar — do not enumerate an axis no consumer uses);
   expand the union only when a consumer needs a new axis. RATIFY at the census.
