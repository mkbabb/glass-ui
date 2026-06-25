# BD viz — the VT1 framework band critique (interaction · configurator · emotion · keyboard)

**Lane** BD viz-critique · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Scope** PLANNING audit — zero `src/` edits · **Adversarial pass** on `W-VIZ-INTERACTION-SPINE` +
`W-VIZ-CONFIGURATOR` + `W-EMOTION-PRIMITIVE` + `W-VIZ-KEYBOARD` (the VT1 framework band the congruence
critique flagged ~40% over-reach). **Grounded against shipped code**, not against the plan's self-cites.
**Reads with** `critique/congruence.md INC-5/INC-6/§4` (which I extend + sharpen — I do NOT repeat its
findings; the new findings below are what congruence MISSED).

---

## 0. Verdict (read this first)

The VT1 band is **WORSE than congruence's ~40%** once you check the shipped tree, not the planning docs.
Three of the four waves are over-reach or vapor; only `W-VIZ-KEYBOARD` is unconditionally justified.

| wave | verdict | the load-bearing reason |
|---|---|---|
| `W-VIZ-INTERACTION-SPINE` (`useVizInteraction`) | **CUT the facade** | a re-fork-in-disguise; the facade earns nothing `usePointerVelocityField` + `useVizKeyboard` don't already give side-by-side |
| `W-VIZ-CONFIGURATOR` (`<VizStudio>`) | **the plan is OBSOLETE + a regression** | the shipped `VizStudio.vue` ALREADY composes `<Configurator>` correctly (162 LOC, thin); the BD proposal would BLOAT it into a schema+emotion+keyboard god-component the plan never even cites |
| `W-EMOTION-PRIMITIVE` (`useEmotionalState`) | **contrived 2nd consumer + the speed-dial is real** | aurora DELETED its mood door (AX.W10); the "blob+aurora" bar re-introduces a retired door, and `paramsFor` drives ALL motion off `arousal` alone (verified) |
| `W-VIZ-KEYBOARD` (`useVizKeyboard`) | **KEEP — the one genuine gap** | 0 viz keyboard handlers at HEAD (verified); composes `/keyboard`; but the "axis-derived map across 10 vizzes" is partly vapor (§5) |

---

## 1. `useVizInteraction` — a re-fork-in-disguise, CUT it (sharper than congruence INC-5)

Congruence said "scope it to compose, not subsume." That is too generous — it lets the facade survive.
The deeper read: **the facade has no body once you remove the two things it doesn't own.**

`useVizInteraction(hostRef, {pointer, keys, a11y})` is specced (`viz-interactivity-ideas.md §L1`) as bundling
THREE things: (1) `usePointerVelocityField` — SHIPPED, root-barrel-published, and consumed by **9 viz +
the dock** at HEAD (verified: aurora/blob/concentric/paper-grid/dot-matrix/dot-flow/fourier/constellation/
goo-dot + `useDockFission` — the congruence "6 viz" undercounts). (2) `useVizKeyboard` — its OWN wave.
(3) a 6-line a11y attr bag (`role="img"` + a `liveLabel` getter).

Strip (1) and (2) — both already standalone — and the facade is **a `role="img"` + a `v-bind` object**.
That is not a facade; it is a 3-line `<template>` snippet. The "bundle pointer + keyboard behind ONE
surface" framing is the KISS smell the congruence flagged, but the FIX is not "compose-not-subsume" — it is
**delete the wave**. Each viz already calls `usePointerVelocityField()` directly (9 live call-sites prove
the direct-compose ergonomics are fine); adding a wrapper that re-exposes `field.velocity` through
`viz.pointerHandlers` is a pure indirection tax — and a DANGEROUS one, because a facade that "bundles the
pointer field" is the exact seam where a future agent re-derives a `smoothedPosition` lerp inside the
wrapper (the `createSpecularWriter` single-source class). **The safest single-source posture is no wrapper
at all.** The a11y attrs (`role="img"` + live-label) are a 3-line per-viz template idiom, not a composable.

**FIX:** delete `W-VIZ-INTERACTION-SPINE`. Ship `W-VIZ-KEYBOARD` (`useVizKeyboard`) BESIDE the shipped
`usePointerVelocityField`; each viz composes the two directly (the 9 live pointer call-sites are the
proof the direct path is ergonomic). The a11y floor is a per-viz `role="img"` template + a `useId`-keyed
live region — a roster CHECK, not a composable.

## 2. `<VizStudio>` — the plan is OBSOLETE and a NET REGRESSION (congruence INC-5/§4 understated this)

**The decisive find the plan never acknowledges: `demo/stories/substrates/VizStudio.vue` ALREADY EXISTS**
(162 LOC, `BC.W-VIZ-CONFIGURATOR-SUITE`, on this branch). It is the CORRECT compose-not-subsume shape — a
THIN slot-passthrough over `<Configurator asideSide="right">` that adds ONLY the height-envelope + the
rounded-clip + the StoryPage hero wiring. It owns **no schema**, **no `useConfiguratorState` re-wiring**,
**no emotion/keyboard props** — exactly the minimal wrapper congruence demanded as the conditional PASS.

The BD research proposal (`viz-configurator-pattern.md §2`) re-mints a DIFFERENT `<VizStudio>`: schema-driven
(`schema: VizConfigSchema<T>`), it OWNS the `useConfiguratorState` instance, it fans `controlFor(f)` over a
field table, AND it bolts `emotion?: EmotionProfileTable<T>` + `keyboard?: boolean` props onto the chassis.
That is a god-component — it subsumes the state idiom, the control vocabulary, the emotion adapter, and the
keyboard seam into ONE prop surface. It is the OPPOSITE of the shipped thin wrapper, and the plan **does not
mention the existing file** — it proposes to "mint `<VizStudio>`" as if greenfield. Shipping it is a no-legacy
collision (two `VizStudio.vue` shapes) AND a regression (thin → god).

Worse, the schema fan-out is the weakest part. The robust five (aurora/blob/fourier) hand-author their
`<ConfiguratorRow>`s for a REASON — the control bindings are NOT uniform (aurora's `OklchStopRow ×4` + the
album-reactive toggle; blob's satellite/merge/cartoon-shadow cluster; the per-field `bind` escape hatch the
schema already concedes in `f.bind`). A `VizConfigSchema` that needs a per-field `bind: Record<string,unknown>`
escape hatch to express the real controls is a schema that has lost to the markup — you've moved the
hand-authoring from `<template>` into a typed-any constant. The "10 studios collapse to one line" headline is
false: each still carries a ~30-field schema constant + the emotion adapter table + the per-field binds.

**FIX:** the schema-driven `<VizStudio>` is OVER-ENGINEERING. KEEP the SHIPPED thin `VizStudio.vue`. The real
gap the audit names (3 thin / 2 none studios) is closed by **migrating the thin three + constellation onto the
EXISTING thin `VizStudio` + `useConfiguratorState`** (retiring their hand-rolled `reactive<Cfg>`+`Object.assign`
preset-swap — that convergence IS sound and IS real work). NO schema engine, NO emotion/keyboard props on the
chassis (the emotion atom is a `<ConfiguratorRow>` the viz passes through `#controls`, the keyboard is the
viz's own `useVizKeyboard` call — neither belongs on the studio chassis prop surface). `W-VIZ-CONFIGURATOR`
becomes "converge the 4 hand-rolled studios onto the shipped `<Configurator>`/`useConfiguratorState`," not
"mint a schema chassis."

## 3. `useEmotionalState` — the aurora consumer is CONTRIVED (re-introduces a DELETED door)

Congruence INC-6 found the speed-dial; it MISSED the bigger problem: **the named 2nd consumer doesn't just
"not exist yet" — it was deliberately DELETED.** Verified in `aurora/composables/color.ts:369` +
`DESIGN.md:156`: *"AX.W10 retired the parallel seed+mood door (its own mood union + recipe table)."* Aurora's
affect surface is NOT a `{valence, arousal}` circumplex — it is `colorEnergy` (ONE 0..1 knob that co-varies
saturation/valueVariance/breathDepth/temperature) + a `MOTION` enum (`still|breathing|drifting`). The suite
converged aurora to ONE door and gate-locked it (`proof:aurora-atoms-roundtrip` asserts *"the dead parallel
mood door is GONE, grep=0"*).

So `useEmotionalState`'s ≥2-consumer bar (`blob + aurora`) is met by **un-doing a closed convergence** — and
it would RED `proof:aurora-atoms-roundtrip` (a re-introduced mood door is exactly the bite that gate fires on).
The emotional-states doc (§6) asserts "blob + aurora are the two binary consumers" as if aurora is a clean
slot; it is a slot the suite spent a wave SEALING. That is the contrived-consumer anti-pattern in its worst
form: not aspirational, but actively-regressive.

The speed-dial finding is also verified concretely (the blob critique is right): `paramsFor` (`constants.ts:64`)
drives `orbitSpeedScale·wobbleScale·pulseFreq·pulseAmp·noiseAmp·smoothK·mergeRate·iridScale` off `arousal`
ALONE; `valence` touches only `hueRange`(partial)·`satShift`·`brightnessShift`·`pointerAttraction`. So
CALM(v+0.15,a0.20) and MELANCHOLY(v−0.55,a0.25) differ ONLY in color/attraction — same orbit, same wobble,
same merge, same buoyancy (there IS no buoyancy term). The proposed `EmotionalDrive` invents `buoyancy`+`sway`
(§2: *"NEW terms the blob's `paramsFor` does not have"*) — admitting the hoisted code cannot express two of the
four states' identities. You cannot HOIST a primitive that doesn't satisfy its own contract; the
valence→motion + buoyancy/sway wiring is NET-NEW work, mislabeled as a clean-break hoist.

**FIX:** (a) the real 2nd consumer is **goo-dot-matrix or dot-flow** (a viz with a genuine motion+spawn surface
and NO sealed door), NOT aurora — name it or the primitive stays blob-local (`W-BLOB-EMOTION`, the split the
blob critique already mandates). If aurora is wanted, it is a SEPARATE recorded precept-inversion that re-opens
`proof:aurora-atoms-roundtrip` (a real cost, not a free slot). (b) the hoist is GATED on the valence→motion +
buoyancy/sway re-author landing FIRST (the "4 creatures ≥3-axis" must be in the code before the suite reads it),
or `proof:emotional-state E1` (perceptually-distinct on ≥3 axes) is born-RED on the hoisted code and the wave
ships a lie.

## 4. The 4-state circumplex is a RE-LABELED speed-dial wired to ONE axis (the deeper sameness defect)

The configurator pattern (`§4`) sells the emotion group as "ONE pick re-tunes the whole config coherently —
the birthdaycolor-like play." But trace the wiring: the emotion adapter `EmotionProfileTable<T>` maps
`{valence, arousal}` onto Field/Color/Motion fields, and per `paramsFor` the ONLY axis with real motion fan-out
is `arousal`. So across the suite, "pick an emotion" = "set the arousal slider" + a color retint. The
per-viz adapter table (`emotional-states.md §2`) lists `viscosity·spawnTendency·buoyancy·sway` columns for
each viz, but the BLOB — the one shipped reference — wires NONE of buoyancy/sway and reads viscosity off
arousal too. The other four viz adapters (dot-matrix/concentric/paper-grid wash columns) are **100% paper** —
no shipped code, no proof those columns separate the four states on those surfaces. The "four creatures" claim
rests entirely on `buoyancy`+`sway` which exist in zero shipped renderer.

The JNB test the doc proposes (§1.3: "CALM↔MELANCHOLY differ on valence even at similar arousal") is the exact
test the shipped `paramsFor` FAILS — and the doc knows it (it has to invent buoyancy/sway to pass it). That is
a framework whose distinguishing axis is entirely TBD. **This is not "4 emotional states controlling distinct
facilities"; it is an arousal dial with a color tint and two aspirational axes.**

**FIX:** the circumplex is sound IFF the wave BUILDS the valence→motion separation (buoyancy/sway → real
Y-drift + lateral sway in ≥2 renderers) and the gate asserts the four anchors separate on ≥3 axes IN THE
COMPILED uniforms (a getComputedStyle/uniform-readback π, not a regex on the anchor table). Without that, fold
the four states to a blob-local register and drop the suite-wide framing.

## 5. `useVizKeyboard` — KEEP, but the "axis-derived map across 10 vizzes" is partly vapor

The keyboard gap is REAL (verified: 0 keyboard handlers across all 9 procedural viz at HEAD) and composing
`/keyboard` (`useKeyboardShortcuts`) is the correct no-fork path. This is the one unconditionally-justified
wave. BUT the spec over-claims uniformity.

The declarative map (`viz-interactivity-ideas.md §L1`) keys `arrows: "focal"` — "arrows nudge the named
focal/anchor." Verified: the focal axis is UNEVEN — concentric has **zero** focal-bearing files; paper-grid
has one; goo-blob two. A "←→ x, ↑↓ y nudges the focal" map presumes a focal anchor every viz exposes, and
half don't. The `space: "cycleMotion"` (still→breathing→drifting) is an AURORA enum — blob/fourier/constellation
have no such ceiling. The `r: "reseed"` + `digits: "zoneCount"` are aurora-shaped too. So the "SAME axis-derived
shape across the suite" is really an AURORA keymap projected onto 9 viz, ~half of which lack the axes it nudges.

**FIX:** `useVizKeyboard` ships as the SEAM (the `/keyboard`-composing keymap resolver + the roving/axis-derived
arrow handling — that part IS uniform), but the per-viz keymap is per-viz DATA (the viz declares which of its
own axes the arrows/brackets/digits drive), NOT a suite-wide constant. The gate asserts "every viz wires
`useVizKeyboard` with ≥1 keyboard equivalent per pointer gesture + a `role=img` live label," not "every viz has
a focal/medium/zone axis." Don't gate the suite on axes half of it lacks.

## 6. Two cross-cutting forks the plan hides

- **The "affect pad composes the EasingPicker draggable-handle chassis" (`emotional-states.md §5.2`) is a fork.**
  `EasingPicker` is a PUBLISHED SVG curve editor (`/easing`), not an extractable XY-pad primitive — there is
  no reusable draggable-handle chassis to compose; building a `{valence,arousal}` XY pad is net-new drag
  wiring (or a `useDragMorph` consume), NOT a "compose the shipped picker." Either name `useDragMorph` as the
  real substrate or admit the pad is new work.
- **`<VizStudio>`'s `:emotion`/`:keyboard` props couple three frameworks at the chassis.** Putting the emotion
  adapter table AND the keyboard toggle on the studio chassis prop surface means the demo-private chassis now
  depends on `useEmotionalState` + `useVizKeyboard` + `useConfiguratorState` — a three-framework knot in a
  surface that today depends on `<Configurator>` alone. That is the over-coupling the shipped thin VizStudio
  deliberately avoids.

---

## 7. Net (the band, re-scored)

congruence said ~40% over-reach; grounded against the tree it is **~55% over-reach**: `W-VIZ-INTERACTION-SPINE`
CUT (re-fork-in-disguise), `W-VIZ-CONFIGURATOR` OBSOLETE+regressive (a shipped thin VizStudio already exists;
the proposal bloats it), `W-EMOTION-PRIMITIVE` contrived-consumer + speed-dial (aurora door is SEALED, not
empty). `W-VIZ-KEYBOARD` is the one genuine, justified wave (with a per-viz-data scope, not a suite constant).
The real, sound work hiding under the framework froth is: (a) `useVizKeyboard` beside the shipped pointer field;
(b) converge the 4 hand-rolled studios onto the SHIPPED `<Configurator>`/`useConfiguratorState`/thin-VizStudio;
(c) the blob-local valence→motion re-author (`W-BLOB-EMOTION`). Everything else is wrapper tax.
