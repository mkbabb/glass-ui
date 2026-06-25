# Critique — W-BLOB-REDEVELOP (RUTHLESS / ADVERSARIAL)

Scope critiqued: `VIZ-BAND-PLAN.md` D3 (useEmotionalState · useLavaField) + the roster row
(VIZ-BAND-PLAN.md:40) + `VIZ-DAG.md` VT2 (line 26). Read against the live codebase:
`src/components/custom/goo-blob/` (shader, `useBlobMood`, `constants`), the gate cohort
(`proof:blob-page`/`blob-render`/`goo-redress`/`blob-smin-normalized`), the
`blob-render.spec.ts` numeric bounds, and the dock-fission mechanism.

VERDICT: the wave is **5 distinct over-reaches stacked into one row**, two of which
(LIFT-the-cage + N-core multi-blob) are on a collision course with the exact gates they
name re-baselining, one (4 emotional states) is **factually contradicted by the engine it
claims to hoist**, one (useLavaField ≥2-consumer) is **contrived**, and the rename is a
195-file blast radius that **collides with D4 (`goo-dot-matrix` unify)**. Split or it
sinks the close.

---

## 1. LIFTING the GOO-REDRESS cage — it RE-BREAKS proof:blob-render by construction

The plan's framing ("LIFT the GOO-REDRESS cage to restore the lava-lamp + re-baseline
proof:blob-page/render") treats the cage as a removable opt-in. It is not. Read what the
cage actually IS:

- **GOO-REDRESS (`proof:goo-redress` W1) does NOT contain the blob — it ties the smin band
  to the worst-case orbit so satellites stay BRIDGED.** Its whole purpose is the OPPOSITE
  of containment: it keeps the lava-lamp READING (no detach). Lifting it re-introduces the
  instantaneous-detached-disc the gate was born to kill. The plan has the cause/effect
  inverted — GOO-REDRESS is *pro*-lava-lamp; there is nothing to lift here, only a thing to
  not-break.

- **The REAL containment cage is `blob-render.spec.ts`**, and its numbers are HARD and
  multi-bite, not a single knob to re-baseline:
  - `COVERAGE_MAX = 0.55` (interior; a flood reads ≈0.74)
  - `SIDE_MARGIN_MAX_FRAC = 0.6` (worst-edge; the *bounded* satellite-overflow budget — the
    body must stay inside on all four sides)
  - `DOME_LUMA_STD` band (lit-dome floor AND calm-bead ceiling)
  - `SILHOUETTE_CV_MIN` (living membrane) + the NO-BLOWN-WHITE highlight bite.

  A "lava-lamp" — bigger excursions, satellites peeling further, more merged mass —
  drives coverage toward the 0.74 flood, drives the worst-edge fraction past 0.6, and
  drives the satellite past the four-side containment. **You cannot "re-baseline" these
  without deleting the FIELD-NOT-SLAB and FOUR-SIDE-CONTAINMENT assertions outright** — and
  those assertions ARE the blob's identity bar (a contained metaball field, not a
  canvas-filling slab). The plan says "re-baseline" as if it's a constant bump; it is a
  *semantic deletion* of the gate's protagonist bites. That is exactly the no-legacy/
  gestalt-bar precept turned against itself: you'd be greening a gate by removing its teeth.

- **proof:blob-smin-normalized's calm-lean ceiling COMPOSES with GOO-REDRESS** (the
  goo-redress comment is explicit: "the new band cannot green by over-inflating past the
  calm-lean ceiling the old gate bounds"). A lava-lamp re-tune that widens the band fights
  BOTH gates simultaneously. There is no free parameter window between "contained droplet"
  and "lava-lamp" that clears all of `{coverage 0.55, side 0.6, smin-normalized lean,
  dome-std ceiling}` — the plan never demonstrates one exists. **Show the parameter point
  or the wave is undeliverable.**

REQUIRED FIX: the wave must either (a) keep the cage and deliver the lava-lamp read via
*motion/topology over time* (orbit choreography within the existing footprint — merge/
split cadence, not bigger excursions), with the gates UNTOUCHED; or (b) declare a NEW
register (`mode="lava"`) with its OWN π spec and its OWN bounds, leaving the default
contained-bead gates byte-frozen (presets-in-consumers; the contained bead is the library
identity). The plan's "lift + re-baseline the shared default gate" is the forbidden third
path.

---

## 2. N-core multi-blob — the ~33-SDF-eval budget claim is OFF BY AN ORDER OF MAGNITUDE

D3 asserts "Multi-blob = MORE TERMS in the same smin loop (~33 SDF evals/frag at M≤6+K≤12
— no compute pass)." This is arithmetic done on the wrong line of the shader. The live
`metaball.frag.ts`:

- `sceneDistG` today = 1 body + `MAX_SATS=4` + `TRAIL_N=15` = **up to 20 SDF evals per
  call**, NOT the 33-budget's headroom.
- **`sceneDistG` is called inside the 24-step soft-shadow raymarch** (`softShadow2D`, gated
  `uShadow > 0.5`): `for (i<24) { sceneDistG(...) }`. So the per-fragment cost when the
  shadow is ON is `sceneDistG(main) + 24 × sceneDistG(shadow)` = **up to 25 × 20 ≈ 500 SDF
  evals/frag TODAY**, before any multi-blob generalization.
- N-core generalization replaces the single body term with M body terms. At M=6: each
  `sceneDistG` becomes `6 + 12 + 15 = 33` terms (THAT is where the plan's "33" comes from —
  it counted the terms in ONE sceneDistG call and forgot the 24× shadow multiplier). The
  real per-frag cost at M=6,K=12,shadow-on = `33 + 24×33 ≈ 825 SDF evals/frag`. Each SDF
  eval is an `sdgCircle` (analytic-gradient, ~10 ALU) plus a `sminG` (mix + exp/poly). On a
  mid-tier mobile GPU (A14/Adreno 6xx) at 1×DPR over a full hero canvas this is a **frame-
  budget cliff**, and the plan's own `W-VIZ-PERF-BUDGET` (VT0) has no recorded number that
  clears it.

This directly violates the binding **compositor-only / Safari-first / perf** bars. The
plan hand-waves "no compute pass" as if avoiding compute is the win — but a fragment field
at 825 evals/frag is WORSE than a compute pass that evaluates the field once per particle.
The "MLS-MPM sim BOOKED >50 balls" deferral is a red herring; the cliff arrives at M=6,
not 50.

REQUIRED FIX: `W-VIZ-PERF-BUDGET` must produce a REAL measured frame-time on a real
mobile GPU (or SwiftShader-throttle proxy) at the M/K cap WITH shadow ON, and the cap must
be set BY that number, not asserted as "~33." Almost certainly: shadow must be force-OFF
in multi-blob mode (the 24× multiplier is the actual budget killer), and M capped at ≤3,
not 6. Until that number exists, N-core multi-blob is unbudgeted speculation.

---

## 3. The 4 emotional states are a RE-LABELED SPEED-DIAL — the engine proves it

D3 claims `useEmotionalState`'s "4 anchors separate on ≥3 axes (four creatures, not one
speed dial)." The engine it hoists (`useBlobMood` + `paramsFor` in `constants.ts`)
**falsifies this directly**. Read `paramsFor({valence, arousal})`:

- MOTION/TOPOLOGY params — `orbitSpeedScale`, `wobbleScale`, `pulseFreq`, `pulseAmp`,
  `noiseAmp`, `smoothK`, `mergeRate`, `iridScale` — are **ALL `lerp(..., arousal)`**.
  Every one is a function of arousal ALONE.
- `valence` touches ONLY color/hue (`hueRange`, `satShift`, `brightnessShift`) + ONE
  pointer scalar (`pointerAttraction`).

So the shipped model is: **arousal = a single motion/viscosity speed-dial; valence = a
retint.** That is a 1.5-axis model wearing a 2-axis hat. The plan's four quadrants
(CALM/JOYFUL/MELANCHOLY/ELECTRIC) will read as: two of them (CALM, MELANCHOLY — both low
arousal) move IDENTICALLY and differ only in hue; the other two (JOYFUL, ELECTRIC — both
high arousal) likewise. **MELANCHOLY (−0.55 valence, 0.25 arousal) and CALM (+0.15
valence, 0.20 arousal) have near-identical arousal → near-identical motion → the ONLY
difference is warmth.** That is a re-labeled speed-dial with a palette swap, exactly the
thing the plan claims it isn't.

The `proof:emotional-state` "separate on ≥3 axes" assertion, if honestly written against
the hoisted `paramsFor`, **fails at HEAD and cannot pass without re-authoring `paramsFor`
to make viscosity/spawn/buoyancy genuinely valence-coupled** — which is real net-new
engine work the plan books as a mere "hoist (clean-break, no-legacy)." This is
under-scoped: it's a redesign of the affect→params surface, not a hoist.

REQUIRED FIX: either (a) honestly downgrade the claim to "2-axis circumplex, motion on
arousal + warmth on valence" and let the gate assert the HONEST separation (motion-distinct
across the arousal axis, warmth-distinct across valence), OR (b) scope the `paramsFor`
redesign as the wave's real work (cross-couple buoyancy/viscosity/spawn to valence) and
prove the ≥3-axis separation with a measured param-distance matrix in the gate. The plan
asserts (b)'s outcome while scoping (a)'s effort.

---

## 4. useLavaField ≥2-consumer is CONTRIVED — the dock "goo-split" is a CSS filter, not a smin field

D3: "useLavaField … ONE GPU smin-merged fragment field … ≥2 consumers: Blob + dock
goo-split." The second consumer does not exist in the form claimed:

- The dock fission/split mechanism is `DockGooFilter.vue` + `fission-bridge.css` +
  `useDockFission.ts` — a **CSS SVG `<filter>` (`feGaussianBlur` + `feColorMatrix`
  threshold)** mounted via `var(--dock-fission-goo-filter)`. It is the classic gooey-CSS
  trick, NOT a GPU fragment SDF field. The plan's OWN Safari note ("goo=regular-filter+
  sRGB") confirms the dock goo is a regular CSS filter.
- A "reusable CPU-side procedural lava field feeding ONE GPU smin-merged fragment field"
  shares ZERO mechanism with a `feGaussianBlur`/`feColorMatrix` SVG filter. They are
  different rendering pipelines. `useLavaField` cannot be "consumed" by the dock split
  without the dock split being rebuilt as a GPU SDF field — which is nowhere in scope and
  would itself break the Safari-first "goo=regular-filter" decision the plan made elsewhere.

So the ≥2-consumer bar is met on paper by naming an incompatible consumer. The HONEST
consumer count for a GPU smin lava field is **ONE (the blob)** → fails J-inv-10. This is
the contrived-substrate anti-pattern the overfitting-audit precept exists to catch.

REQUIRED FIX: either find a SECOND REAL GPU-smin consumer (the goo-dot-matrix hybrid
already splices `sceneDistG` — THAT is a real fragment-SDF consumer, name it instead of the
CSS dock filter), or do NOT abstract `useLavaField` as a shipped primitive — keep the lava
logic blob-LOCAL until a real second GPU consumer lands (the J-inv-10 "ship only at ≥2"
discipline). The dock-fission naming must be struck from the consumer list.

---

## 5. The rename goo-blob→blob is a 195-file blast radius that COLLIDES with D4

`grep` for `goo-blob|GooBlob|goo-dot-matrix` = **195 files** (src + demo + tests +
tests-visual + scripts + package.json). The rename touches: the dir, the `/goo-blob`
subpath export (package.json exports + typesVersions), every symbol (`GooBlob.vue`,
`useMetaballRenderer`, `BLOB_CONFIG_DEFAULTS`, the gate paths hardcoding
`src/components/custom/goo-blob/...` in `proof:goo-redress`/`blob-render`/`blob-page`), the
~6 `tests-visual/blob-*.spec.ts`, the gate artefact keys, and MIGRATION.md.

The DEEPER problem: **`goo-dot-matrix` (the hybrid) splices `goo-blob`'s `sceneDistG`
byte-untouched, and D4 (`W-DOT-UNIFY`) is ALSO renaming/folding `goo-dot-matrix` →
`/dot-matrix target="sdf"` in the SAME tranche.** BLOB-REDEVELOP renames the SOURCE of that
splice while D4 re-homes the CONSUMER. If sequenced wrong (and the DAG puts BLOB-REDEVELOP
and DOT-UNIFY both in VT2 with no edge between them), the splice reference breaks and
`proof:no-dual-path`/the hybrid's grep-locked body assertion reds. The two renames are
NOT independent and the DAG does not encode the dependency.

Additionally: the gate scripts (`proof:goo-redress` cliPaths `B = "goo-blob"`,
`proof:blob-render`/`blob-page` spec names) hardcode the old dir — the rename must move
gate source AND the spec filenames AND the artefact env keys
(`GLASS_UI_GOO_REDRESS_ARTIFACT`) in lockstep, or the live π arm silently SKIPs (workspace-
present probe fails on a renamed spec path) and the close greens vacuously.

REQUIRED FIX: split the rename into its OWN mechanical wave (`W-BLOB-RENAME`) sequenced
BEFORE both BLOB-REDEVELOP and DOT-UNIFY, with an explicit DAG edge, and a gate-path/
spec-name/artefact-key/subpath sweep in ONE atomic diff (the BB.W-CARVE byte-isomorphic
discipline). Do NOT bundle a 195-file rename into a redevelop wave that also touches the
shader, the gates, and the affect engine — that is a god-wave with no clean rollback.

---

## Cross-cutting: this is a GOD-WAVE (5 unrelated concerns in one row)

BLOB-REDEVELOP bundles: (1) a 195-file rename, (2) an N-core shader generalization, (3) an
affect-engine redesign, (4) a containment-gate re-baseline, (5) a `:liquid` Snell-over-
aurora option. These have DIFFERENT blast radii, DIFFERENT gates, and DIFFERENT rollback
stories. The paint-first/own-π precept means EACH needs its own fresh capture — but a
single wave can't isolate which of 5 changes regressed a gestalt verdict. KISS+feature-dir
encapsulation demand this be ≥4 waves: RENAME · MULTI-BLOB(+perf-budget) · EMOTION-REDESIGN
· LAVA-MODE(new register, frozen default gates). The `:liquid` Snell option is a W-LENSING
consumer, not a blob concern — move it.

═══════════════════════ 7-LINE VERDICT ═══════════════════════
W-BLOB-REDEVELOP is 5 over-reaches in one god-wave. (1) "Lift the cage": GOO-REDRESS is
PRO-lava-lamp (nothing to lift); the real cage is blob-render.spec's coverage≤0.55 /
side≤0.6 / four-side-containment — a lava-lamp can't clear them without DELETING the
field-not-slab bites (forbidden gate-defang). (2) N-core "~33 evals" ignores the 24× soft-
shadow raymarch multiplier → ~825 SDF evals/frag at M=6 — an unbudgeted mobile cliff. (3)
The 4 states are a re-labeled speed-dial: paramsFor() drives ALL motion off arousal alone,
valence only retints → CALM≈MELANCHOLY in motion; the ≥3-axis claim fails at HEAD. (4)
useLavaField's 2nd consumer (dock goo-split) is a CSS feGaussianBlur filter, not a GPU smin
field — contrived, real count=1, fails J-inv-10. (5) The rename is 195 files and collides
with D4's goo-dot-matrix fold — needs its own atomic pre-wave. SPLIT into RENAME · MULTI-
BLOB+BUDGET · EMOTION-REDESIGN · LAVA-MODE(frozen-default-gates); move :liquid to W-LENSING.
