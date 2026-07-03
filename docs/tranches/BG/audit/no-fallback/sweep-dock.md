# NO-FALLBACK sweep — DOCK + DRAWER facilities (tranche/BG, read-only)

Scope: `src/styles/dock/*.css` + `dock.css` + `dock-controls/`, `src/components/custom/dock/**`
(GlassDock, DockLayerGroup, DockStack, control families, useDockState, useDockSpring,
dockMorphContext, useLayerTransition, useDockOrientationMorph, useDockFission, morph window),
`src/components/ui/drawer/**` + `useDrawerSnap` + `drawer.css`.
Rubric: MASKING / LEGACY-LADDER / CROSS-ENGINE-GAP-TODAY / REAL-DUAL-MECHANISM.
Targets: current Chrome (~147+) + Safari/WebKit 26+.

---

## A. DRAWER — the MASKING referent, confirmed live at HEAD

### A1. `@property --glass-drawer-t { initial-value: 1 }` — drawer.css:23-27 — **MASKING**
The registered rest is FULLY OPEN (1), not closed (0). The sole writer is
`useDrawerSnap.writeScalar` (useDrawerSnap.ts:97-101), which fires off a
`queueMicrotask` open-seat (useDrawerSnap.ts:287-292) against a `contentEl` that is
populated by a `$el`-unwrap ref callback (DrawerContent.vue:79-86). If the writer never
fires (unwrap yields a non-HTMLElement, the microtask races the mount, the spring never
plays), the sheet reads 1 and seats FULL-VIEWPORT open — "open at half" paints full, a
drag that fails to land its write moves nothing, zero errors. The comment even names the
mask's cover story: "the default (1 = fully open) keeps a no-snap content-sized sheet
seated open" — but the no-snap case is ALSO engine-driven (writeScalar(0) → settle 1),
so the default's only live function is hiding a dead writer.
Contrast the honest siblings: `--stage-t` initial 0 (drawer.css:48-52) and
`--siri-island-t` initial 0 (dock/siri.css:27-31, "the safe dormant rest") — a dead
writer there paints NOTHING (fail loud). The two drawer scalars' initial values DISAGREE
(1 vs 0), so a dead writer produces a split-brain scene: sheet fully open, scrim stuck at
its 0.28 base dim — the desync the "single writer" fold exists to prevent.
EXCISE: rest = 0 (closed/offscreen); the writer must seat the open fraction or the sheet
visibly never appears; gate the seat (the π must see the seated fraction ≠ initial).

### A2. `var(--glass-drawer-t, 1)` inline transform fallback — DrawerContent.vue:111-116 — **MASKING**
The second belt of the same mask: even where the `@property` registration is absent
(styles not loaded — which is itself a broken install that should fail loud), the
`var(…, 1)` literal seats the sheet fully open. On a loaded cascade the fallback is DEAD
(a registered property is never guaranteed-invalid — the morph.css:26-29 doctrine), so
the literal is unreachable-or-masking, never load-bearing. EXCISE with A1 (fallback 0 or
bare `var()`).

### A3. `writeScalar`'s silent sheet-leg skip — useDrawerSnap.ts:97-101 — **MASKING**
`if (el) el.style.setProperty("--glass-drawer-t", …)` + an UNCONDITIONAL
`--stage-t` `:root` write. When `contentEl` is null (the `setContentEl` `$el` unwrap
returning null, DrawerContent.vue:79-86), every frame writes the SCENE scalar and drops
the SHEET scalar — scrim deepens, page recedes, sheet frozen at `initial-value: 1`.
Compounding: `dragSpan()` returns 1 (px!) on null el (useDrawerSnap.ts:184), and
`readScalar()` NaN-falls-back to the MODEL fraction (useDrawerSnap.ts:247-253), so the
release "snap decision" runs on the model even when zero paint moved — the gesture
completes logically with no paint truth. EXCISE: a null contentEl during an active
snap/drag is a broken binding — fail loud (dev assert / gate), never a silent skip.

### A4. `var(--glass-blur-overlay-radius, 20px)` — drawer.css:227-233 — **MASKING**
Diverging fallback literal. The token's base value is **13px** (tokens/glass.css:97);
20px is only the `@media (min-resolution: 2dppx)` restore arm (tokens/light-dark.css:34-38).
A broken token cascade silently paints the heavier 20px blur on standard density — the
stale-fallback-literal drift class (see B9 for the proven recurrence of this class).
EXCISE the literal (bare `var()` — the token is minted in the same shipped cascade).

### A5. `var(--spring-snappy-duration, 0.4s) var(--spring-snappy, ease)` — drawer.css:66 — **MASKING** (drift-hedge)
The snappy settle clock is generated at 0.34s; the 0.4s/`ease` literals are duplicate
values that mask a missing generated token with a WRONG clock + a non-spring curve.
Same class as A4. (Also stack-rail.css:211-216 `var(--spring-dock-duration,
var(--duration-normal))` / `var(--spring-dock, var(--ease-out))` — the dock-spring fan
would silently run 0.3s ease-out if the generated tokens vanished.)

Raw notes (not findings):
- useDrawerSnap.ts:103-114 `disposeSpring` comment references "the CSS
  `:root:not(:has(…open…))` reset (drawer.css)" — NO such rule exists at HEAD; the real
  reset is `removeProperty` → `initial-value: 0`. Stale doc.
- useDrawerSnap.ts:138 `ladder[ladder.length-1] ?? 1` — unreachable (effectiveLadder
  never returns empty). Dead fallback.
- drawer.css:394-398 PRM grip-transition suppression — sanctioned a11y carve, not a
  fallback.

---

## B. DOCK — morph / crossfade / squish masks + vestigial ladders

### B1. `--dock-expand-t` static class endpoints + `[data-morphing]`-gated live read — dock/morph.css:47-63 — **MASKING** (gate-covered locally, CI-blind)
The chrome's resting value is stated STATICALLY per `.expanded`/`.collapsed` class and
tracks the live spring scalar ONLY under `[data-morphing]`. Deliberate (a registered
`--dock-morph-t` can never be guaranteed-invalid, so `var(t, 1)` cannot express the
rest) — but the consequence is that a dead writer/armer (useLayerTransition /
dockMorphContext never arming `data-morphing`, never writing `--dock-morph-t`) degrades
EVERY collapse/expand to a discrete class snap that looks "settled-correct" and errors
nowhere — the IOS27-MOTION-TRUTH dead-paint-binding class, structurally. The covering
proof is `tests-visual/dock-morph-family.spec.ts` (frame-series π) — LOCAL-only; no
CI-tag gate proves the writer fired. Verdict per rubric: MASKING until the
writer-fired gate reds; action = keep the rest-state design, bind the in-flight paint
with a REDing (non-local) witness or accept + record.

### B2. Layer-crossfade base `.is-leaving { opacity: 0 }` + scalar fade only under `[data-morphing]` — dock/layers.css:187-231 — **MASKING** (same class as B1)
At rest the leaving pane is opacity 0 by class; the 1→0 scalar fade
(`calc(1 - var(--dock-morph-t))`, layers.css:228-231) exists only while
`[data-morphing]` is armed. A dead orchestrator ⇒ instant discrete pane swap, silently
"working". This is the prompt's named layer-crossfade referent. Same disposition as B1.
Also: the visibility hold reads `var(--duration-normal)` (layers.css:189), not the
morph's own `--spring-dock-duration` — a stale second clock under the hold (0.3s vs
0.28s), the W-GLASS-CAL per-spring-clock doctrine missed here.

### B3. Null-el / null-root silent discrete swap — useLayerTransition.ts:280-285, dockMorphContext.ts:214-217 — **MASKING**
Both engines, on a null container/root ref, swap `currentLayer`/`leavingLayer` and
RETURN — no morph, no error. A broken template-ref binding (the reka-rename silent-no-op
class MEMORY warns about) turns every layer transition into a permanent discrete snap
that no gate reds. EXCISE: fail loud (dev warn/assert) on a null ref at swap time on a
mounted component.

### B4. The `var(--dock-expand-t, 1)` fallback fleet — morph.css:90,127,137,164,174,219,248; shape.css:72; shell.css:440; layers.css:102 — **MASKING** (low)
`--dock-expand-t` is UNREGISTERED and set per state class; the pervasive `, 1` fallback
means a `.glass-dock` missing its state class silently paints the EXPANDED look. The
class binding is the primary; the fallback hides its absence. Low severity (GlassDock
always binds a class) but it is the `?? default` shape on a state channel; a bare var()
would fail visible (guaranteed-invalid → unset chrome) on a broken binding.

### B5. `--dock-expand-t: var(--dock-morph-t, 1)` dead+contradictory fallback — dock/layers.css:133-135 — **LEGACY-LADDER** (dead arm)
`--dock-morph-t` is registered (initial 0, dock.css:106-110), so the `, 1` arm is
unreachable BY DESIGN (morph.css:26-29 documents "the fallback is DEAD") — and the dead
literal contradicts the registered initial (1 vs 0), a trap for the next reader.
Collapse to bare `var(--dock-morph-t)`.

### B6. The morph-window timer vs the vestigial transitionend resolver — useDockMorphWindow.ts:31-51,97-113 + constants.ts:95 + GlassDock.vue:372-373 — **LEGACY-LADDER**
The morph is spring-driven; the dock root carries NO width/height/padding transition, so
the `RESIZE_MORPH_PROPS` `transitionend` "primary" essentially never fires and the
"fallback" settle timer (`max(2×--duration-normal||0.3s, 600ms)+50`) is the de-facto
SOLE resolver of `isTransitioning` — the CSS-transition-era ladder carried past the
AX.W01 spring migration, inverted (dead primary, load-bearing fallback). Worse, the
vertical dock DOES transition `transform var(--dock-motion-resize)` as decorative polish
(shell.css:352-355) and `transform` ∈ RESIZE_MORPH_PROPS — a decorative transform ending
mid-morph can clear `isTransitioning` EARLY (un-suppressing click-away mid-morph). The
window heuristic also reads `--duration-normal`, not the real `--spring-dock-duration`
clock. COLLAPSE: resolve `isTransitioning` from the spring's own `onSettle` (the honest
single clock); delete the timer heuristic + the transitionend arm.

### B7. The self-described vestigial defensive settles — dockMorphContext.ts:269-286 (`onOuterTransitionEnd`, "the vestigial defensive settle"), useLayerTransition.ts:366-377 ("kept for call-site parity"), DockLayerGroup.vue:234-235 ("defensive no-op … binding parity") — **LEGACY-LADDER**
Three `@transitionend` arms kept after the CSS-transition morph was deleted, each
self-annotated as vestigial/parity. Clean break: delete the bindings + handlers.

### B8. Endpoint fallbacks + the surviving 0.06 scale floor — dock/layers.css:95-111 — **MASKING**
`--dock-live` reads `var(--dock-expanded-px, 0px)`/`var(--dock-collapsed-px, …)` and
`--dock-size-scale` clamps at a **0.06 floor**. If the `useDockExpandedSize` writer is
dead (both endpoints unset), a morphing dock resolves scale 0.06 — a bounded-but-wrong
sliver instead of a REDing failure; and the block's own comment claims "no floor guard
(the two endpoints ARE the floors)" while the 0.06 floor demonstrably survives at
layers.css:104-108 — the deleted magic floor's cousin, plus a doc/code contradiction.
EXCISE the contradiction; make an unwritten endpoint pair loud.

### B9. JS fallback literal 1.14 duplicating `--dock-morph-max-stretch` — useDockOrientationMorph.ts:113-134 (vs density.css:69) — **MASKING** (proven-recurrence drift class)
`maxStretchOf` returns 1.14 when the root is null or the token unreadable. The comment
RECORDS the recurrence: "the prior 1.08 fallback was stale — BD.W-MOTION-WEIGHT C1·R3
drift fix" — the fallback literal has already drifted from the token once and was
re-pinned by hand. Same class: `collapsedFloorPx` FALLBACK 44 duplicating
`--dock-morph-min: max(2.75rem, …)` (dockMorphMeasure.ts:77-83 vs density.css:81), and
the CSS-side knee duplicate `var(--glass-backdrop-luma-knee, 0.6)` vs glass-fx.css:249.
EXCISE the duplicates (fail loud on an unreadable token) or single-source the literal.

### B10. `var(--dock-bridge-opacity, 1)` default-VISIBLE bridge — dock/morph-bridge.css:41 — **MASKING** (design decision owed)
One var, two contracts: the AZ showcase relies on the default 1 (bridge always-on,
plates self-fade), while the BG in-place mode depends on the JS `bridgeStyle` writer
gating it 0-at-endpoints (useDockOrientationMorph.ts:311-346). An unbound/dead in-place
writer leaves the teardrop at full opacity over the resting dock. The dormant-rest
precedent (`--siri-island-t: 0`, fission scalars all initial 0) says default 0 + the
showcase arms it explicitly. Flag for the owning wave (the in-place morph family).

### B11. The `var(--stretch, 1)` identity fleet — dock/shape.css:154-168, morph-bridge.css:130,161, dock-controls/*.css (icon-button 56-59), fission pieces — **MASKING** (gate-covered locally)
`--stretch` (the liquid-weight squish) is written ONLY by JS
(useDockOrientationMorph.writeScalar:204-206, fission wiring, useLiquidFlex). The `, 1`
identity rest is correct at rest AND indistinguishable from a dead squish writer — the
exact "liquid weight silently absent" defect class (feedback: liquid-weight-universal).
Covering witness: the local π reads `--stretch` as "the weight signature"
(useDockOrientationMorph.ts:154-162 comment); CI-blind. Same disposition as B1.

### B12. `var(--glass-backdrop-luma, 0)` — dock/adaptive-legibility.css:56-64 — **MASKING**
A dead `useGlassBackdropLuminance` observer is INDISTINGUISHABLE from a calm/dark
backdrop: luma reads 0 → tint holds the sub-perceptual floor — the G2
unreadable-dock-over-light defect silently returns, which is the precise failure this
clamp exists to kill. Covering witness: `proof:adaptive-glass-live` π (local). Needs a
wired-but-silent-observer RED (the observer proves its write) or an explicit recorded
acceptance that the floor is the no-JS design.

### B13. Dual morph engines (orchestrator + standalone) — dockMorphContext.ts:1-299 vs useLayerTransition.ts:37-49 — **REAL-DUAL-MECHANISM** (fold booked)
Both are live load-bearing paths: the in-dock single orchestrator vs the standalone
`<DockLayerGroup>`-outside-a-dock engine (+ the public `/dock` re-export). Justified in
one line: a standalone group has no dock root to defer to; byte-drift is gate-guarded
(`proof:dock-orchestrator-single` FLIP drift-guard) and the fold is BOOKED (AY.W-GOD1).
KEEP until the booked fold lands.

---

## C. Engine ladders / gaps (dock CSS)

### C1. `@supports (animation-timeline: scroll())` scroll-fade gates — dock/shell.css:273-291, dock/overflow.css:84-101 — **LEGACY-LADDER** (verify-then-collapse)
Chrome has shipped scroll-driven animations since 115; Safari 26 ships them — on the
declared dual-engine target set the gap arm (no mask, plain scroll) serves pre-target
engines only. The co-gating of mask+driver is the correct fail-safe SHAPE (never a
permanently-opaque mask), but on the target floor the gate is a legacy hedge. Collapse
once the Safari-26 scroll()-support floor is ratified by the owning wave; if a real 26.x
gap is found instead, re-verdict CROSS-ENGINE-GAP-TODAY with the plain-scroll base as
the recorded design (which it already is).

### C2. `@supports (corner-shape: superellipse(2))` — dock/shell.css:444-459 — **CROSS-ENGINE-GAP-TODAY**
Chrome 139+ only; the file's own comment records "no FF/Safari 2026". The
`border-radius` arc is the recorded cross-engine CONTRACT and the squircle the better
tier (AX.W56) — the gap is already an explicit, recorded design decision. KEEP; owner:
the standing W42/W56 corner-vocabulary canon.

### C3. `@supports (color: contrast-color(white))` ink refinement — dock/adaptive-legibility.css:82-104 — **REAL-DUAL-MECHANISM**
Not a ladder: the declarative darken is the AA floor mechanism (it darkens the PLATE)
on every engine; `contrast-color()` refines the INK where supported (Chrome 147+/Safari
26+). Complementary layers, both load-bearing, canon-recorded (AX.W55: "progressive
enhancement, NEVER the load-bearing floor"). KEEP.

---

## D. Positive controls (the honest patterns, for contrast)
- `--siri-island-t` initial 0 (siri.css:27-31) — dormant rest; dead writer ⇒ Siri never
  appears (fail loud). The model A1 should follow.
- Fission scalars `--dock-split-t`/`--seam-tension`/`--neck-t` initial 0 + PRM
  bridge-removal + sync-seat (fission-bridge.css:46-97, 425-455) — dormant rests + the
  gesture still CONFIRMS under PRM.
- `--dock-punch-stretch` initial 1 (shape.css:41-45) — a no-op IDENTITY rest for a
  CSS-only one-shot (zero JS owners) — the identity is the design, nothing to mask.
- `--dock-morph-t`/`--dock-local-scale`/`--dock-scale` registrations (dock.css:106-142)
  — initial values are the true rests (0 = collapsed-progress floor, 1 = identity).
- The `var(--knob, default)` consumer-retune seams (cta-seat `--cta-seat-*`,
  layer-group `--dock-layer-*`, stack-rail `--dock-stack-*`) — the documented
  presets-in-consumers token idiom, NOT fallback masks.
- PRM carves throughout (morph-bridge:199, cta-seat:81, stack-rail:341, shape:225,
  adaptive-legibility:114, drawer:394) — sanctioned a11y absolutes, out of the
  no-fallback law's blast radius.

## E. Misc raw notes
- dock/layers.css:189 visibility hold on `--duration-normal` vs the spring's 0.28s
  settle — stale clock coupling (folded into B2).
- dockMorphContext.ts `onSwap` root-null path (B3) also skips arming `data-punching` —
  consistent with the silent-degrade class.
- useDockShellProps.ts `??` prop defaults (collapseDelay 3600, shape "pill", …) —
  ordinary prop defaults, not masks.
- useDockFission/useDockItemDrag/useLayerTransition/useDockOrientationMorph matchMedia
  PRM probes — sanctioned (the AV.W7 cached-matchMedia pattern).
