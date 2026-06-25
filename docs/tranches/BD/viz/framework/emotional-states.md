# The FOUR emotional states — a suite-wide affect primitive (`useEmotionalState`)

**Lane** BD viz-framework · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits ·
**Grounded against** `src/components/custom/goo-blob/composables/useBlobMood.ts` + `constants.ts`
(`MOOD_AVA`/`paramsFor` — the SHIPPED circumplex) · `src/components/custom/aurora/composables/atoms.ts`
(`AuroraAtoms` MOTION/COLOR door) · `src/composables/motion/usePointerVelocityField.ts` (the shared
viz-pointer-physics field) · the procedural-suite doc + the BD union charter (`SEED.md` §12) ·
**Reads with** `framework/birthdaycolor-interactivity.md` (the interactivity distillation it shares an
arousal axis with).

> The user's edict (binding): *"FOUR 'emotional' states controlling blob facilities + movement
> tendencies"* — generalized by this doc into ONE reusable affect primitive every viz reads, so the
> blob, aurora, the dot-matrix, concentric, paper-grid all speak the SAME four-state vocabulary instead
> of N hand-tuned per-viz mood tables.

---

## 0. TL;DR

The blob ALREADY ships the right architecture in miniature: a 2-axis `{valence, arousal}` **circumplex**
(`MOOD_AVA`) whose named points DERIVE their per-frame params from ONE principled surface (`paramsFor`).
The BD mandate is to (1) **collapse the 5 ad-hoc blob moods to FOUR canonical emotional states**,
(2) **HOIST the circumplex out of `goo-blob/` into a suite-shared `useEmotionalState` primitive**, and
(3) **define a per-viz `EmotionalProfile` adapter** that maps the ONE `{valence, arousal}` point onto each
viz's own facilities (movement speed · viscosity/merge · satellite count · color temperature · perturbation
amplitude · the lava-lamp spawn tendency). No fifth rAF, no parallel state path — it is `useBlobMood`'s
manual/auto precedence + cross-fade engine, hoisted and generalized.

**The four states (researched, not ad-hoc):**

| state | valence | arousal | the feeling | the viz reads-as |
|---|---|---|---|---|
| **CALM** | +0.15 | 0.20 | serene, settled, breathing | slow drift, high viscosity, few satellites, cool-neutral, gentle perturbation |
| **JOYFUL** | +0.85 | 0.70 | bright, buoyant, playful | quick bouncy motion, gooey merges, many satellites spawning, warm-bright, lively perturbation |
| **MELANCHOLY** | −0.55 | 0.25 | wistful, heavy, slow-cool | very slow sinking drift, crisp/separated, few low satellites, cool-desaturated, long-wavelength sway |
| **ELECTRIC** | +0.55 | 1.00 | charged, alert, kinetic | fast jittery motion, taut merges, max satellites churning, hot-saturated, high-frequency perturbation |

These four are the **circumplex quadrant samples** the affect literature uses (Russell 1980): CALM = low-
arousal/slightly-positive, JOYFUL = high-arousal/high-positive, MELANCHOLY = low-arousal/negative,
ELECTRIC = high-arousal/neutral-positive. They span the affect plane (one per useful quadrant) so any
intermediate feeling is reachable by lerping the point — the named four are *anchors*, not an enum wall.

---

## 1. Why circumplex, why these four (the research)

### 1.1 The model — Russell's circumplex of affect

Russell (1980) showed human-named emotions don't cluster as discrete buckets; they lie on a continuous
2-axis plane: **valence** (pleasant ↔ unpleasant) × **arousal** (activated ↔ deactivated). Every named
emotion is a *point* (or small region) on that circle. This is exactly the model the shipped blob already
uses (`AffectPoint { valence, arousal }`), and it is the right one because:

- **It is continuous + total.** Any `(v, a)` produces a valid blend — no NaN, no out-of-enum gap (the
  `proof:aurora-atoms-roundtrip` TOTAL discipline, applied to affect). Transitions are a straight lerp of
  the point, so a state machine of named anchors gets smooth in-betweens for free.
- **One surface, many facilities.** A single `paramsFor(point)` derivation fans the 2 axes onto the
  entangled facility cluster — moving "arousal" co-varies orbit speed AND wobble AND pulse AND noise AND
  sheen together (moving one alone reads as a defect). This is the aurora COLOR-energy "one knob co-varies
  the entangled cluster" discipline, already proven.
- **It maps cleanly to BOTH axes the viz needs.** Arousal → MOTION energy (speed/frequency/turbulence/
  spawn-rate). Valence → COLOR temperature + warmth + buoyancy (rising vs sinking). The blob's `paramsFor`
  already splits exactly this way (arousal drives motion, valence drives palette + lean).

### 1.2 Why FOUR, and why these labels

The user said four. Four is the natural cardinality: **one anchor per useful circumplex quadrant**, leaving
the deactivated-unpleasant fifth ("sleepy/bored") OUT because a near-dead viz is not a register a design
system wants to ship as a *named* state (it is reachable as low-arousal drift, but not a hallmark).

We researched the label set against three constraints — (a) emotionally legible to a non-technical viewer,
(b) maps to a DISTINCT viz gestalt, (c) brand-congruent (warm-cream identity, no garish):

- **CALM** over "idle/serene/still" — the rest pose; the breathing default. (Maps the blob's `idle` +
  `sleepy`, the aurora `breathing` register.)
- **JOYFUL** over "happy/playful/excited" — buoyant + warm + gooey; the lava-lamp-most state. (Maps the
  blob's `happy`.)
- **MELANCHOLY** over "sad/wistful/somber" — the ONE negative-valence anchor; slow, cool, sinking, crisp.
  This is the state the shipped 5-mood blob LACKS (its `sleepy` is low-arousal-NEUTRAL, not negative) — the
  new register the redevelopment adds. It is *wistful*, not *depressing*: subtle, beautiful melancholy
  (the cool-blue long-sway), never a broken-looking dead field.
- **ELECTRIC** over "excited/charged/frenetic" — max arousal, neutral-warm valence; the kinetic show-off.
  (Maps the blob's `excited`/`curious`.)

The discarded fifth quadrant (low-arousal + low-valence, "lethargic") is recorded as DELIBERATELY-OUT, not
silently dropped — a future wave could mint it if a "screensaver doze" register is wanted, but it is not one
of the user's four.

### 1.3 The mapping must be PERCEPTUALLY-DISTINCT (the anti-sameness bar)

A naive `paramsFor` that only scales speed makes all four states read as "the same thing, faster/slower" —
the failure the redevelopment must beat. The four anchors deliberately separate on MULTIPLE axes at once so
each reads as a categorically different *creature*, not a speed dial:

- CALM ↔ ELECTRIC differ on arousal (slow↔fast) AND perturbation frequency (low↔high) AND satellite churn.
- CALM ↔ MELANCHOLY differ on valence (warm-rising↔cool-sinking) AND wavelength (medium↔long-sway) at
  SIMILAR arousal — proving the model separates on valence even when speed matches (the JNB test).
- JOYFUL ↔ ELECTRIC differ on viscosity (gooey-merge↔taut-separate) AND color (bright-warm↔hot-saturated)
  at SIMILAR arousal — the two high-energy states must not be twins.

---

## 2. The shared facility-axis vocabulary (what every viz exposes)

The hoisted primitive does NOT know about blobs. It produces a normalized **`EmotionalDrive`** — a small,
viz-AGNOSTIC bundle of 0..1 (or signed) scalars derived from `{valence, arousal}` — and each viz owns an
`EmotionalProfile` adapter that reads the drive and writes ITS uniforms. The drive is the lingua franca:

```ts
interface EmotionalDrive {
  valence: number;      // −1..+1   (pleasantness; signed)
  arousal: number;      //  0..1    (activation)
  // ── derived, entangled-cluster scalars (the facility lingua franca) ──
  motionEnergy: number;    // 0..1   speed/frequency of all movement       ← arousal
  viscosity: number;       // 0..1   1 = gooey-merge, 0 = crisp-separate    ← arousal (inverse) + valence
  spawnTendency: number;   // 0..1   the lava-lamp satellite spawn/churn rate ← arousal
  satelliteBias: number;   // 0..1   resting satellite COUNT fraction        ← arousal·valence
  warmth: number;          // −1..+1 color temperature, − cool .. + warm     ← valence
  saturation: number;      // 0..1   chroma energy                           ← arousal·|valence|
  brightness: number;      // −1..+1 value lift                              ← valence
  perturbAmp: number;      // 0..1   wave/noise perturbation amplitude       ← arousal
  perturbFreq: number;     // 0..1   perturbation spatial/temporal frequency ← arousal
  buoyancy: number;        // −1..+1 vertical drift bias, − sink .. + rise   ← valence
  sway: number;            // 0..1   long-wavelength lateral sway amount     ← (1−arousal)·(−valence)
}
```

`buoyancy` + `sway` are NEW terms the blob's `paramsFor` does not have — they are what give MELANCHOLY its
*sinking, cool, long-sway* identity (the blob today cannot sink). They are derived once in the shared
primitive and consumed by whichever viz can express them (the blob's satellite/core Y-drift, the aurora
nucleus drift, the dot-matrix wash direction).

### The per-viz adapter map (the binding facility table)

| drive scalar | aurora | blob | dot-matrix | concentric | paper-grid |
|---|---|---|---|---|---|
| `motionEnergy` | nuclei/palette/warp drift rate | orbit speed · wobble · pulse freq | wash advection speed · fade rate | ring flow speed | curl-warp flow speed |
| `viscosity` | (n/a — softness of fbm blend) | smin `smoothK` multiplier · mergeRate | dot clump cohesion | ring level-set cohesion | (n/a) |
| `spawnTendency` | nucleus birth/death churn | satellite emerge/absorb rate | image-target swap cadence | ring add/drop rate | (n/a) |
| `satelliteBias` | active nuclei count fraction | resting satellite count | dot density | ring count | (n/a) |
| `warmth` | palette temperature (warm-light/cool-shadow) | hue range + satShift | dot hue temperature | ring hue temperature | ink temperature |
| `saturation` | colorEnergy chroma | satShift | dot chroma | ring chroma | (subtle) |
| `brightness` | value lift | brightnessShift | dot opacity ceiling | ring brightness | ink opacity |
| `perturbAmp` | warpAmount | noiseAmp · wobbleScale | per-dot size jitter + wash amplitude | per-ring perturbation amplitude | grid warp depth |
| `perturbFreq` | warpScale | wobbleFreq | wash spatial frequency | ring perturbation frequency | grid warp frequency |
| `buoyancy` | nuclei vertical drift bias | core + satellite Y drift | wash vertical direction | ring vertical breathing | grid vertical bow |
| `sway` | slow lateral nuclei sway | core lateral sway | wash lateral sway | ring lateral sway | grid lateral sway |

The **SHARED wave-math** the user mandates across concentric + dot-matrix + paper-grid (the "same wave-based
math" edict) is precisely `perturbAmp`/`perturbFreq`/`sway`/`buoyancy` feeding the SAME
Gerstner/Tessendorf sum-of-sines + Bridson curl operator (`flow.glsl.ts`/`flow.wgsl.ts` `curlFBM`) — the
emotional drive is the AMPLITUDE/FREQUENCY input to that one shared field, so all three viz perturb in
emotional lockstep from ONE math source.

---

## 3. The four anchors, fully resolved

`EMOTION_AVA` (the suite-shared circumplex points — the hoisted `MOOD_AVA`):

```ts
const EMOTION_AVA = {
  calm:       { valence: +0.15, arousal: 0.20 },
  joyful:     { valence: +0.85, arousal: 0.70 },
  melancholy: { valence: -0.55, arousal: 0.25 },
  electric:   { valence: +0.55, arousal: 1.00 },
};
```

Resolved `EmotionalDrive` per anchor (illustrative — `deriveDrive(point)` is the single source; values
shown to prove perceptual separation, NOT to hand-tune):

| drive | CALM | JOYFUL | MELANCHOLY | ELECTRIC |
|---|---|---|---|---|
| motionEnergy | 0.18 | 0.68 | 0.22 | 1.00 |
| viscosity (gooey→) | 0.85 | 0.75 | 0.30 | 0.45 |
| spawnTendency | 0.15 | 0.70 | 0.18 | 0.95 |
| satelliteBias | 0.30 | 0.80 | 0.25 | 0.90 |
| warmth (cool−/warm+) | +0.10 | +0.85 | −0.65 | +0.55 |
| saturation | 0.30 | 0.80 | 0.35 | 0.95 |
| brightness | +0.05 | +0.40 | −0.30 | +0.30 |
| perturbAmp | 0.20 | 0.55 | 0.30 | 0.90 |
| perturbFreq | 0.15 | 0.50 | 0.12 | 0.95 |
| buoyancy (sink−/rise+) | +0.05 | +0.45 | −0.55 | +0.20 |
| sway | 0.25 | 0.15 | 0.80 | 0.10 |

Read the columns as gestalts: CALM is *slow, gooey, cool-neutral, gently breathing*. JOYFUL is *quick,
gooey, warm-bright, satellites bubbling up*. MELANCHOLY is *very slow, crisp-separated, cool-desaturated,
sinking with a long lateral sway*. ELECTRIC is *fast, taut, hot-saturated, max satellites churning, high-
frequency jitter*. The four read as four creatures.

`deriveDrive` is a small pure function (the hoisted generalization of `paramsFor`): each scalar is a lerp
or product of `valence`/`arousal` with the entanglements above. It is TOTAL (clamps every input, never
NaN) and `deriveDrive(EMOTION_AVA.calm)` is the rest pose by construction.

---

## 4. The state-machine architecture

### 4.1 The primitive — `useEmotionalState(opts?)`

The hoisted, generalized `useBlobMood`. It owns the named-point state, the cross-fade, and the manual/auto
precedence — NOTHING viz-specific:

```ts
function useEmotionalState(opts?: {
  initial?: EmotionName;          // default "calm"
  autonomic?: boolean;            // default true — the interaction-driven arc
  transitionMs?: Partial<Record<EmotionName, number>>;  // per-target cross-fade clock
}): {
  current: Readonly<Ref<EmotionName>>;
  drive:   Readonly<Ref<EmotionalDrive>>;   // the eased current drive the viz reads
  point:   Readonly<Ref<AffectPoint>>;      // the raw eased {v,a} (for a viz wanting the axes)
  setEmotion(name: EmotionName, o?: { source?: "auto" | "manual" }): void;
  setPoint(p: AffectPoint, o?: { source?: "auto" | "manual" }): void;  // arbitrary affect, not just anchors
  update(i: EmotionInteraction): void;      // the autonomic arc driver (per frame)
  tick(dt: number): void;                   // advance the cross-fade
  isSettled(): boolean;                     // quiescence predicate (offscreen-park gate)
  nextAutoMs(): number;                     // wake horizon
}
```

This is byte-for-byte the `useBlobMood` shape (`setMood`/`update`/`tick`/`isSettled`/`nextAutoMoodMs`),
renamed + made viz-agnostic, PLUS `setPoint` (arbitrary affect, for a configurator slider that wants the
continuous plane, not just the four pills). The blob's `MoodParams` derivation moves INTO the blob's
`EmotionalProfile` adapter (which reads `drive` and writes the blob uniforms) — the primitive stops at
`drive`.

### 4.2 Transitions — eased lerp of the POINT, then derive

The cross-fade interpolates the `{valence, arousal}` POINT (not the resolved params), then re-derives the
drive — so an in-flight transition passes through perceptually-valid intermediate affect (CALM→ELECTRIC
sweeps up the arousal axis through every real intermediate energy, never a param-soup interpolation that
could leave color and motion temporally desynced). `easeInOut` on a per-target `transitionMs` clock
(CALM-ward transitions slow/settling ~900ms, ELECTRIC-ward snappy ~350ms — calming down is gentle, charging
up is eager, the asymmetry the shipped `TRANSITION_MS[mood]` already encodes).

### 4.3 The autonomic arc (interaction → emotion)

The default `update(interaction)` arc — the generalized blob auto-arc, now suite-shared:

| signal | → emotion |
|---|---|
| fresh click / tap | ELECTRIC (one-shot hold ~900ms, then relax) |
| pointer over / approach + velocity | JOYFUL (rising-edge) |
| pointer dwelling slow / hover-still | CALM |
| long idle (> `IDLE_MS`) | MELANCHOLY (the wistful doze — the new low-valence rest, replacing the blob's neutral `sleepy`) |
| (no signal, fresh mount) | CALM (the default rest pose) |

Velocity/burst come from the SHARED `usePointerVelocityField` (the suite already ships it) — a fast flick
biases toward ELECTRIC via `field.burst`, a gentle approach toward JOYFUL via `field.velocity` magnitude,
so the autonomic arc reads the ONE pointer-physics field every viz already feeds, NOT a re-forked sampler.

**Manual/auto precedence (the shipped D7 latch, preserved):** `setEmotion(name, { source: "manual" })`
(the configurator pills / a consumer prop) arms a `manualOverride` latch ABOVE the auto-arc — `update`
early-returns while pinned, releases on a genuine FRESH interaction (fresh click or rising-edge pointer).
ONE precedence rule, no flag soup; it is the existing `useBlobMood` latch verbatim.

### 4.4 PRM + quiescence (inherited, not re-built)

`isSettled()`/`nextAutoMs()` gate the suite's `createCanvasLifecycle` demand loop exactly as `useBlobMood`
does today: a pending idle→MELANCHOLY arc keeps the loop alive / schedules a wake; a pinned non-CALM
emotion is not settled (its distinct animation must keep rendering); a pinned CALM IS settled (rest pose).
Under `prefers-reduced-motion: reduce` the drive snaps to its target with zero in-between transform frames
(the affect still *changes* — color/intensity flip — but the motion energy that the drive would animate is
frozen by the substrate's existing PRM one-static-frame-then-park; emotion is not motion-gated, but its
MOTION expression is). This re-uses the substrate's live-PRM monitor; nothing new.

---

## 5. The configurator surface (per the "robust configurator" mandate)

Each viz's `useConfiguratorState<Config>` studio gains an **EMOTION atom** beside its existing atoms
(aurora's COLOR/ZONES/NOISE/MEDIUM/MOTION, the blob's 8 atoms). Two rungs:

1. **The four pills** — `calm | joyful | melancholy | electric` (the named anchors, the common case;
   `setEmotion(…, { source: "manual" })`).
2. **The affect pad** (advanced) — a 2-axis `{valence, arousal}` XY pad (the circumplex made visible —
   drag a dot on the plane) writing `setPoint(p, { source: "manual" })`. This is the "robust configurator"
   depth: the four pills are samples; the pad is the continuous surface. It composes the shipped
   `EasingPicker`-style draggable-handle chassis (NO new drag engine — `useDragMorph`/pointer-capture).
3. **`autonomic` toggle** — let the viz drive its own emotion from interaction (default ON for a hero
   surface) or pin it (default for a static specimen).

The EMOTION atom is the SAME door every viz exposes → ONE configurator vocabulary across the suite (the
AZ.W-HIERARCHY configurator-hierarchy discipline: minted once, inherited).

---

## 6. The reusable-primitive decision (yes — hoist)

**Verdict: YES, hoist to a suite-shared primitive.** The circumplex + cross-fade + manual/auto latch +
quiescence is GENERIC affect machinery with ZERO blob-specific code; only the final `drive → uniforms`
adapter is per-viz. The hoist is the BD-charter §3 "compose the shipped spine, no re-fork" + §4 KISS/DRY
applied to affect: without it, each redeveloped viz would re-hand-tune its own mood table (the exact
sin `paramsFor` was written to avoid, multiplied by 5 viz).

**Home + shape (proposed):**
- `src/composables/motion/useEmotionalState.ts` — the primitive (vue-only, no keyframes/vueuse → root-
  barrel-eligible, the `useLiquidFlex`/`usePointerVelocityField` precedent; it owns no rAF — the viz feeds
  `tick(dt)` from its existing frame loop, the `usePointerVelocityField` push-API discipline).
- `src/composables/motion/emotional-states.ts` — `EMOTION_AVA` + `deriveDrive` + the `EmotionName`/
  `EmotionalDrive`/`AffectPoint` types (the constants leaf, the carve precedent).
- Each viz's `composables/<viz>EmotionalProfile.ts` — the per-viz `drive → uniforms` adapter (the blob's
  `paramsFor`/`lerpParams` re-homed here as `blobEmotionalProfile`).

**Migration (clean-break, no alias — the no-legacy law):** `useBlobMood`/`BlobMood`/`MOOD_AVA`/`paramsFor`
RETIRE onto `useEmotionalState` + `blobEmotionalProfile`; the 5 blob moods collapse to the 4 emotions
(`idle`+`sleepy` → `calm`/`melancholy`, `happy` → `joyful`, `excited`+`curious` → `electric`/`joyful`).
Every call site renames in ONE pass. The `proof:no-dual-path` discipline: the old mood path is ABSENT once
the emotion primitive lands.

**≥2-consumer bar (J inv-10) — met at birth:** blob (re-developed) + aurora (the EMOTION atom on its
MOTION door) are the two binary consumers; dot-matrix/concentric/paper-grid are the booked further
consumers (the early-publish path, recorded in a `consumer-evidence/use-emotional-state.md`). The
primitive ships only because ≥2 real viz read it — never a contrived demo.

---

## 7. The wave shape (a proposed BD addition — for the orchestrator)

This research implies ONE new framework wave + per-viz consume rows:

- **`BD.W-EMOTION-PRIMITIVE`** (Band 1 · CONSOLIDATE, beside W-FLIP-SPINE/W-HUE-HISTOGRAM-HOIST) — hoist
  `useEmotionalState` + `deriveDrive` + the four anchors; retire `useBlobMood` clean. Machine-locked by
  `proof:emotional-state` (E1 the 4 anchors span the quadrants + are perceptually-distinct on ≥3 axes ·
  E2 `deriveDrive` TOTAL + CALM-is-rest · E3 the manual/auto latch + quiescence preserved · E4 the
  cross-fade lerps the POINT not the params · E5 ≥2-consumer + no-blob-coupling + a self-test bite) + the
  per-viz π readback (each consuming viz visibly reads-as its emotion, both modes).
- The per-viz redevelopment waves (blob, dot-matrix, concentric, paper-grid) each carry an EMOTION-atom
  consume row + the four-state π — the emotion is part of "reads-as the reference" gestalt verdict.

This sequences FRONT of the per-viz redevelopments (they consume it), AFTER Band 0 truth gates.

---

## 8. Fences (the recorded keeps)

- **Emotion is affect, not animation.** The primitive produces a DRIVE; the viz produces the paint. PRM
  freezes the MOTION expression, not the emotion change (color/intensity still flip under reduce).
- **Warm-cream identity holds.** `warmth`/`saturation`/`brightness` are bounded so even ELECTRIC stays
  inside the brand ceiling (no neon); MELANCHOLY's cool is a desaturated cool-blue lean, never a garish
  blue. The library default emotion is CALM (the warm-cream rest); a consumer's themed palette is the
  preset, never a library token (presets-in-consumers).
- **One math source for perturbation.** `perturbAmp`/`perturbFreq`/`sway`/`buoyancy` feed the SHARED
  Gerstner/Bridson `curlFBM` field — the cross-viz "same wave-math" edict is satisfied through ONE chunk,
  not a per-viz noise re-roll.
- **No fifth rAF.** The primitive owns no loop; the viz `tick(dt)`s it from `createCanvasLifecycle`.
- **The discarded fifth quadrant** (low-arousal/low-valence "lethargic") is DELIBERATELY-OUT, recorded
  not silently dropped.
