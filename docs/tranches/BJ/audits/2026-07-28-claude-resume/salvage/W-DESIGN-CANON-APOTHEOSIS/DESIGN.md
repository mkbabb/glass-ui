# THE GLASS-UI DESIGN CANON

This is the only place design law lives. Everything here is either a **LAW** — a sentence a gate can
check — or a **GENERATED BLOCK** whose values are emitted from the artefact that owns them.

**How to read it.** A law is normative and is written as a blockquote. Under each law sit its clauses,
each naming the seated gate that enforces it. A block between `<!-- CANON:BEGIN … -->` and
`<!-- CANON:END … -->` is machine-written by `scripts/regen-design-canon.mjs` from the source of
record named in the marker. **Hand-editing a generated block is a build failure, not a style
disagreement.**

**How to change a value.** Edit the source of record, run `node scripts/regen-design-canon.mjs`,
commit both. There is no second place to update. A value that is not yet on disk emits as an OWED row
naming the wave that owns it — the canon states the law before the library obeys it, and the born-RED
gates are the difference between the two.

**What this document is not.** It is not a component reference, not a changelog, not a record of what
we tried. Mechanism ledgers live at `docs/canon/**` and in colocated component READMEs; they cite this
document and never restate it. Measurement lives in the tranche corpus, which is evidence, not law.

---

# THE THREE LAWS

Everything below the three laws is a consequence of them. Where a later section appears to relax one,
the law wins and the section is a defect.

---

## LAW I — GOLDEN GLASS

> **Golden glass is what a bare component paints with no props.** It is **frost-led**: the material is
> carried by blur and by what the blur transmits, never by paint. Its veil is an **ink** — it *dims*,
> it never lifts. Its warmth arrives by **transmission** of the warm field through a strong saturate,
> never by a painted cream. Its boundary is asserted on exactly **two** channels, and the ink is the
> stronger. It is not grey, not metallic, not shiny, and it is never a slab.

**The negative space is part of the law**, because it is what the owner has said three times and what
the library keeps failing: glass that reads *"trite, shiny, and bright"* is not glass. A bright
specular rim plus a high saturate over warm cream reads as **plastic**. The exemplar's plates are
bright because iOS lives on saturated wallpaper; we live on paper.

**Lineage.** "Golden glass" is the library's own name for its default tier, used in specification long
before it was defined: the golden glass tier a census measures against
(`docs/tranches/BC/EXECUTION-DAG.md:78,345`), "the golden glass pill" (`BC.W-SEARCH-CUSTOM.md:90`),
"the golden glass-floating plate" (`BC.W-OVERLAY-UNIFORM.md:59`), and a live assertion
(`tests-visual/search-custom.spec.ts:5`). This section is that name, finally written down.

### I.1 — FROST OR NOTHING
A surface that declares a rung paints that rung's `backdrop-filter`, **computed, in the engine**. A
declared glass surface computing `backdrop-filter: none` is a lie about the library's identity, not a
degradation. There is no masking fallback: the primary works in paint or it fails loud.
→ **`G-GLASS-HAS-FROST`**

### I.2 — THE VEIL IS AN INK, AND THE SIGN IS FIXED
The residual veil derives from an **ink** and dims. A rung that raises mean L\* **fails**; a rung that
dims within its band passes. This is signed, not symmetric: an unsigned tolerance re-admits the defect
at reduced magnitude. The warm-cream read is the *result* — delivered by transmission of the warm
field plus saturate — never the painted recipe. A cream lift over a cream world grades a difference
that does not exist.
→ **`G-FROST-TRANSMISSION`** (luminance arm, signed)

### I.3 — TWO CHANNELS, AND THE INK IS THE STRONGER
A plate asserts its boundary on **ink** and on **one** white specular leg, and the ink outweighs the
white. Not four legs. Not a ring plus a rim plus a highlight plus a border. The dark arm is never
brighter than the light arm — a bright rim reads most as plastic in exactly the mode where it is
brightest.
→ **`G-RUNG-ONLY`** (+ the no-white-specular arm)

### I.4 — THE LADDER MUST ACTUALLY LADDER
Every rung differs from its neighbours **monotonically** in α, in blur radius, and in rim, and each
step exceeds the field's own noise floor. A rung pair that is byte-identical is one rung wearing two
names. A ladder grading a difference smaller than its background's gradient is grading nothing.
→ **`G-RUNG-ONLY`**

### I.5 — ONE LADDER; REGISTERS ARE NOT RUNGS
There is exactly **one** glass ladder, and it has the rungs the generated block names. Everything else
is one of three things, and each is named:

- a **scoped α register** (dock, dialog, sheet, chassis) — a substitution *on* a rung, never a new one;
- the **one continuum** (`--glass-depth` → deep) — opt-in, never a bare default, never a sixth rung;
- **no rung at all** — content, and the world.

**Content is never frosted.** A surface presenting the thing itself — a photo, artwork, a preview, a
transcript, a value readout — carries no `backdrop-filter`. Solidity signals *the thing itself*.
**Chrome is never solid.** A surface presenting affordances *over* content is always translucent and
frosted. **All frost is plate-local**; a full-viewport `backdrop-filter` is not a rung, with exactly
one carve — the focus veil of §6, which is masked, control-anchored, and mounted only while engaged.
→ **`G-RUNG-ONLY`** · **`G-SCRIM-NO-BLUR`**

### I.6 — THE HOUSING CARRIES THE MATERIAL; THE MOVER CARRIES NONE
Track, bar, well and shell take the bevel, the bloom and the gradient. The indicator, the thumb, the
fill and the worm are **pure signal** — no rim, no shadow, no halo, no blur of their own. Frost on the
moving part is frost on the wrong layer: an opaque fill transmits nothing while paying for a blur, and
the transparent trough beneath it paints no material at all.
→ **`G-RUNG-ONLY`**

### I.7 — GLASS IS MEAN-PRESERVING AND CONTRAST-COMPRESSING
The material's law is a **behaviour**, not a recipe: `L_out = floor + gain · L_in`, with the mean
preserved and the hue preserved. The **gain is the rung** — a calmer rung compresses less, a deeper
rung compresses more. This is stated as a behaviour deliberately: a behaviour can be measured on any
backdrop, and a recipe cannot. Refraction, where an engine offers it, is confined to the rim and is
never the material.
→ **`G-FROST-TRANSMISSION`** (the gate's subject is `(fixed point L*, gain g)` per rung)

### I.8 — THE STAGE IS PART OF THE MATERIAL
A blur of a flat field is a no-op, so **a material claim measured on a flat field is void**, not
passing. Every material measurement requires a structured substrate (the banked admissibility floor is
σ ≈ 50) and A/Bs *the same pixels* by toggling the surface — never an adjacency crop. A demo chassis
that mounts every specimen on an opaque plate turns the library's identity off around its own
evidence.
→ **`G-FROST-TRANSMISSION`** (admissibility precondition)

---

## LAW II — BREATH OF LIFE

> **Every interactive surface answers, always. Breath is a FLOOR, never a loop.** A control at rest
> displays engagement by a non-zero material response to the pointer field, by truthful in-place state
> reporting, and by a ≤1-frame answer to any state change. **A control never carries a decorative idle
> animation.** The one legal idle loop belongs to an *ambient* surface, at sub-interactive tempo, with
> a clamped non-zero amplitude floor.

The two halves of this are not in tension once the altitudes are named. "Every component always
displays engagement" is about the **ladder being real**. "No element idles with a looping animation" is
about **decoration**. A control that reports nothing is dead; a control that loops is noise.

### II.1 — THE LADDER, AND IT IS THE WHOLE LAW
Five rungs, and every interactive component implements all five or declares which it cannot and why:

| rung | what changes | who leads | budget |
|---|---|---|---|
| **rest** | light channel only, within the rest-floor amplitude. Nothing geometric. | — | one channel |
| **hover** | one ladder rung up, plus the hover scale rung. **Pointer-only.** | geometry | ≤2 channels, ≤1 luminance rung |
| **press** | the answer. Ends-in-place shrinks to the press rung; ends-in-expansion *swells* and its release velocity feeds what follows. | geometry | visible within the acknowledge window |
| **engaged** | the control is promoted out of its own footprint into a temporary overlay of itself; the origin stays visible beneath; the readout is a **shared element**, never duplicated. | geometry | **singleton** |
| **modal** | the plate is presented; the world takes the dim-only scrim. | geometry | content arrives crisp exactly at settle |

<!-- CANON:BEGIN engage-budgets · source of record: src/styles/tokens/scale-paper.css · src/composables/motion/engage/engageEnvelopes.ts · generated, do not hand-edit -->
| budget | token | value on disk |
|---|---|---|
| hover · atom | `--scale-hover` | 1.08 |
| hover · button | `--scale-hover-btn` | — *owed: W-ENGAGE-LADDER+AFFORD* |
| hover · dock member | `--scale-hover-dock` | 1.1 |
| press · canonical | `--scale-press` | 0.96 |
| press · button/slider | `--scale-press-sm` | 0.97 |
| press · dock | `--scale-press-dock` | var(--scale-press) |
| acknowledge window | `ACKNOWLEDGE_WINDOW_MS` | 150 ms |
| rest floor amplitude | `--engage-rest-floor` | — *owed: W-ENGAGE-LADDER+AFFORD* |
| ambient tempo floor | `--ambient-period-min` | — *owed: W-ENGAGE-LADDER+AFFORD* |
| ambient dwell | `--ambient-dwell` | — *owed: W-ENGAGE-LADDER+AFFORD* |
<!-- CANON:END engage-budgets -->

**The generator's first run found a phantom.** `--scale-hover-btn` is named in a shipped token comment
as a live value and **is defined nowhere on disk**. A hand-typed canon prints it as fact; an emitted one
prints it as OWED. That is the whole argument for §9 in one row.

→ **`G-ENGAGE-RUNG`**

### II.2 — ANSWER BEFORE YOU MOVE
Every engagement opens with a **non-translating** answer — a width, a scale, a chroma lift — before any
travel. The acknowledgement is not the journey. Both exemplar arms measure this independently, at two
scales: a whole bar lifting in chroma one frame before its indicator moves, and an icon inhaling in
place before anything else exists. The gate already demands that a rung's **leading channel** reach
near-completion inside the acknowledge window; this law says *which* channel, and that it must not be
the travel.
→ **`G-ENGAGE-RUNG`**

### II.3 — ENGAGED IS A SINGLETON
At most one control is engaged in the document at a time, like the top layer. An engagement ladder
with two simultaneous occupants is a focus bug wearing a material.
→ **`G-ENGAGE-RUNG`**

### II.4 — HOVER DOES NOT EXIST ON A COARSE POINTER
Every hover rung sits behind `@media (hover: hover)`. An unguarded hover on touch fires on tap and
**sticks**. Mobile is first-class, so this is a correctness rule, not a polish rule. Coarse pointers
also take the **WCAG 2.5.5 AAA target floor** — glyph unchanged, the hit box painted on an inset
pseudo-element, the idiom the dock already documents.
→ **`G-ENGAGE-RUNG`** (PRM/coarse arm) · **`G-COARSE-TARGET`**

### II.5 — THE CELEBRATION IS LIGHT, NEVER GEOMETRY
Liveliness is spent on the **light** channel — a sustained bloom, a rim flare, a drain on release —
never on a positional bounce. Bounce theatre is the motion twin of shiny glass. A press's aliveness
lives in its volume-preserving squish and in the drain, which is what makes an abandoned press read as
released rather than as never seen.
→ **`G-ENGAGE-RUNG`** · **`G-SPRING-HONEST`**

### II.6 — THE AMBIENT FLOOR IS SLOW, CLAMPED, AND STATEFUL
An ambient surface may carry one idle loop: **sub-interactive tempo** (period ≥ 1 s, ~10× slower than
any gesture beat), a **non-zero amplitude floor** so it never collapses to nothing, and — the measured
refinement both exemplar arms carry — an **attending** register only: a slow caustic on the order of
~0.45 Hz *(class D — the attending-caustic frequency, measured in both exemplar arms)*, entered after a
multi-second dwell, that reports state rather than decorating it. A substrate
is invisible until something passes.
→ **`G-QUIESCENT`** · **`G-ENGAGE-RUNG`**

---

## LAW III — MOVEMENT OF MOMENTUM

> **All motion carries weight. Nothing snaps.** The scope is **ALL MOTION** — driver and observer
> alike. Weight is carried by the spring's response and by **volume-preserving deform** — never by a
> bounce. Exactly **one** row in the spring table rebounds. Reduced-motion is the one exception, and it
> is a floor, not a fork.

**On the scope.** An earlier canon carved this to *driver* motion only — motion a finger or a route
change caused — leaving observer motion calm-overdamped. **That carve is struck** by owner ruling: the
liquid-weight edict is verbatim universal. Momentum applies to a list reordering under a scroll, a
carousel settling, a page receding, a value ticking. What differs between driver and observer is
*which vocabulary* (§III.6), never *whether there is weight*.

### III.1 — SPRING IFF SPATIAL
A channel that **moves or reshapes** — position, size, rotation, corner — rides a named spring from the
table. A channel that **re-tints** — colour, opacity, shadow — rides a bezier. A spring on an opacity
is a costume; a bezier on a translation is a snap.
→ **`G-SPRING-ONE-JOB`**

### III.2 — LAW 0, THE OVERSHOOT-VISIBILITY LAW
A row's rebound appears in its shipped curve **iff its emitted peak exceeds its settle band**. There is
no "tiny rebound" region: a spring either bounces visibly or lands dead, and between them lies a curve
whose peak arrives in the last tenth of its clock — a late tick, the worst read of the three.

> **A row's prose may claim a rebound iff the curve it emits has one.** When the two disagree, delete
> the claim, not the damping.

→ **`G-SPRING-HONEST`** — the instrument is the emitted curve's sampled peak, not the analytic ideal.

### III.3 — THE BAND IS A PROPERTY OF AMPLITUDE
A 2% settle band is calibrated for a press, where 2% of the travel is invisible. It is wrong for a
room-sized stroke, where 2% is plainly visible and the eye reads settle far later than the token says.
Small-amplitude rows generate over the tight band; large-amplitude rows over the loose one. The band is
a **declared field of the row**, fed to the curve and to the clock together, so curve/clock parity
survives.
→ **`G-SPRING-HONEST`**

### III.4 — ONE ROW REBOUNDS; EVERYTHING LARGER IS A DEFORM
Across every measured corpus the ceiling on **positional** overshoot is ~4.7% *(class D — MOTION-CANON
§1's banked Siri stroke, corroborated at five further amplitudes across both exemplar arms)*, and it
occurs on a clip
edge. Every larger number anywhere is a **shape** change — a width stretch, a squash-relax on landing,
a stretching tether. Therefore: exactly one rebounding row, at the measured ceiling, and all
playfulness expressed as volume-preserving deform. Squash-relax on landing is **universal**, not a
per-component flourish; it belongs to the motion layer as a shape term, not to a component as an
opt-in.
→ **`G-SPRING-ONE-JOB`** · **`G-SPRING-HONEST`**

### III.5 — NO TWO CHANNELS SHARE A CLOCK, AND RANK IS A PROPERTY OF ROLE
Every element in a compound transition declares a **rank**; its delay is `rank × --motion-beat`. Rank
is a property of **role**, never of DOM depth.

| rank | role | who |
|---|---|---|
| **−1** | ink-out | departing content. It leaves *before* any boundary moves. |
| **0** | the touched body | the pressed element, the shared element, the gesture's subject. The finger gets the first frame. |
| **+2** | the world | scrim onset, dim, recede — starts early on the world clock so it *finishes last*. |
| **+3** | the presented plate | popover, menu, sheet, dialog content, engaged capsule. |
| **+6** | annotation | labels, captions, icon-vs-label, chrome swaps, tint handoffs. |
| **+9…+21** | light | glow, rim flare, ignition — an envelope, not a delay. |

Three corollaries, each checkable:

- **Onset order is causal; settle order is legibility-ordered.** Finger → world → plate → labels →
  light on the way in; the plate lands crisp first and the world keeps drifting underneath it.
- **A container's own opacity resolves faster than its geometry** (the object is *real* while still in
  flight — the effervescent read), while its **contents are held** near zero and arrive late, resolving
  by **blur→sharp**, not by opacity. The two statements that look contradictory are about two layers.
  **Chrome arrives first and content catches up**, and the content's lag scales with the container's
  velocity — a damped coupling, not a parent transform.
- **No stagger inside a plate.** A plate arrives as one object or it reads as assembly. Per-row stagger
  is forbidden inside a reveal subtree.

→ **`G-NO-FLASH`** · **`G-SPRING-ONE-JOB`**

### III.6 — TWO SETTLE VOCABULARIES, NEVER MIXED
**Inertial paging** — a fling, a paged strip, a snap scroller — is a single exponential decay with
**zero overshoot** and a long asymptotic tail. **Fired deploys** — an appearance, an expansion, a
morph — are springs, with the one rebounding row. A paged strip that overshoots reads as a toy; an
expansion that lands dead reads as a tween. **The liquid weight of a fling lives in its tail**; cutting
the tail is what makes motion read cheap.
→ **`G-SPRING-ONE-JOB`**

### III.7 — DIRECTIONS ARE NOT REVERSES
Every transition has a **forward score and a separate backward score**. Entering, focus and opacity
complete before geometry. Exiting, geometry completes before opacity. A fission fades then moves; a
fusion moves then fades. An expansion is opaque; a collapse is translucent. **Playing a transition
backwards is not an exit** — it is the absence of one.
→ **`G-NO-FLASH`**

### III.8 — EXIT ASYMMETRY
`EXIT = 0.6 × ENTRY`, floored and ceilinged, with the corpus bracketing 0.4–0.8: an exit that must
travel home sits high, an exit that merely dies sits low. **Fade-led** — opacity reaches zero by 60% of
the exit clock while geometry runs the full clock. **Never a spring, never an overshoot** — an exit
must not overshoot past gone. **The onset ranks reverse**: periphery and annotation leave first, the
plate second, the touched body returns to its source rect third, the world recovers last. **Leave an
afterglow** — a residual highlight on the origin so the eye can find where the departed body went home.

The one exception, and it is not a loophole: **a gesture-released exit is not an exit.** It is a spring
inheriting the release velocity, and it may overshoot, because the user threw it. Interruption truth
outranks exit asymmetry. Springs belong to entrances, exits and releases — never between a finger and
the thing it is holding.
→ **`G-NO-FLASH`**

### III.9 — ONE OBJECT, ONE TIMELINE
A surface that grows out of another surface is **one object on one timeline**, never a crossfade
between two. The origin's material *is* the destination's material. Both text layouts may be drawn
simultaneously at two sizes for a beat, and **nothing ever squashes**. **Only the participating element
participates** — neighbours do not scatter, dim, or acknowledge. And a surface is **born from and dies
into one anchor**: the plate shrinks toward the edge it was born from, the lifted preview lands back
inside its source cell at cell bounds.
→ **`G-NO-FLASH`**

### III.10 — THE WORLD IS A SLOWER INSTRUMENT
Backdrop dim, recede and blur run materially slower than the foreground in both directions, and the
world **releases last**. The world gets exactly one of three treatments and never two:

- **MODAL SCRIM** — something is presented *over* the world and the world stays. **Dim only. Never
  blur.** Hue and chroma **survive**: dim ≠ desaturate. Text behind the scrim stays legible.
- **FOCUS VEIL** — a control is engaged *in place*. Graded blur, monotone falloff from the control's
  own rect, foreground crisp, far context crisp, mounted only while engaged.
- **RECEDE** — the world is being replaced or pushed. Translate **and** blur **and** dim, all three
  together. A blurred-but-stationary world is the one shape this law has no room for.

→ **`G-SCRIM-NO-BLUR`** · **`G-NO-FLASH`**

### III.11 — REDUCED MOTION IS A FLOOR
PRM zeroes the extra squash, overshoot, anticipation, arc and stagger in one assignment; springs
collapse to a calm decelerate; ambient surfaces park. It keeps the fade and drops the transform. It is
never a second design.
→ **`G-ENGAGE-RUNG`** (PRM arm)

---

# 1 · THE MATERIAL

## 1.1 The ladder

<!-- CANON:BEGIN glass-ladder · source of record: src/styles/tokens/glass.css · tokens/dark-arm.css · tokens/dark-arm-glass.css · generated, do not hand-edit -->
| rung | class | α light | α dark | blur radius | saturate light | saturate dark | brightness light | brightness dark |
|---|---|---|---|---|---|---|---|---|
| wash | `.glass-wash` | 0.30 | 0.38 | 1px | 1.4 | 1.35 | — | 1.18 |
| quiet | `.glass-quiet` | 0.50 | 0.58 | 7px | 1.4 | 1.35 | 1.02 | 1.16 |
| resting | `.glass-resting` | 0.65 | 0.72 | 7px | 1.4 | 1.30 | — | 1.14 |
| floating | `.glass-floating` | 0.80 | 0.88 | 11px | 1.6 | 1.28 | — | 1.10 |
| overlay | `.glass-overlay` | 0.95 | 0.96 | 11px | 1.6 | 1.22 | — | 1.06 |
<!-- CANON:END glass-ladder -->

**Read that table against Law I and the library is at fault in four places at once, by construction:**
two blur pairs are identical where the ladder must be monotone (I.4); every brightness arm *lifts*
where the veil must dim (I.2); the dark arm's lift is the largest in the mode where a bright surface
reads most as plastic (I.3); and the α ladder grades a plate colour that sits within the field's own
noise (I.2). **The table is emitted, so it cannot flatter the library.** These are the values
`W-FROST` is born-RED against, and this block will read differently the day it lands.

**Roles.** Content and content-bearing plates take the low rungs; quiet chrome in the content plane
takes `quiet`; presented chrome — popover, dropdown, menu plate, dock slab, composer, tooltip — takes
`floating`; modal-over-modal takes `overlay`. Content itself and the world scrim take **no rung**.

## 1.2 The registers that are not rungs

<!-- CANON:BEGIN glass-registers · source of record: src/styles/tokens/glass.css · tokens/dark-arm.css · tokens/glass-deep.css · generated, do not hand-edit -->
| register | token | α light | α dark | what it is |
|---|---|---|---|---|
| dock | `--glass-opacity-dock` | 0.50 | *(mode-invariant)* | a scoped α substitution on the resting material |
| dialog | `--glass-opacity-dialog` | 0.68 | 0.76 | a scoped α substitution on the overlay rung |
| sheet | `--glass-opacity-sheet` | 0.74 | *(mode-invariant)* | a scoped α substitution on the overlay rung |
| chassis | `--glass-opacity-chassis` | 0.28 | 0.36 | a scoped α substitution — component-owned |

**The one continuum, not a rung** — `--glass-depth` interpolates the calm floating floor (`--glass-blur-floating-radius` 11px / saturate 1.6) up to the deep endpoint (`--glass-blur-deep-radius` 16px / `--glass-saturate-deep` 1.8). Opt-in; never the bare default.
<!-- CANON:END glass-registers -->

## 1.3 The one knob

`--glass-level` is the single clarity scalar threaded through **both** ladders at their one site each —
the α recipe and the blur radius. `level = 1` is the ladder as emitted; `level = 0` is the **opaque
escape** through the same machinery, and it is how reduced-transparency and high-contrast are honoured.
There is no second opacity path and no per-component escape hatch. A consumer retunes any rung by
naming its token; a scope retunes a subtree by setting the level on an ancestor.

## 1.4 What the material may never do

- **No engine-conditional material.** No branch keyed on engine identity or capability may change what
  a glass surface paints — its filter, its veil, its rim, or its resolved rung. A branch is legal only
  if it **fails loud**, or forks a **non-material** channel (ink, motion presence, scrollbar, platform
  label, mode arm). The instrument is **computed material per engine**, never `@supports` text — the
  only form that catches a runtime latch or a build-stage prefix drop, neither of which appears in
  source. Legal forks are enumerated with grounds; an unregistered fork fails. → **`G-NO-ENGINE-BRANCH`**
- **No masking fallback.** A degraded arm that hides a dead primary is worse than the failure. Where a
  capability is genuinely absent the surface fails loud, or the design substitutes a *different*
  primary and says so.
- **No stacked filter over glass.** An ancestor `filter` creates an isolated buffer that kills
  `backdrop-filter` on every descendant. A filtered layer is a **sibling** of the glass, never its
  ancestor.
- **`filter: url()` is FORBIDDEN.** Everywhere, on every primitive, with no sanctioned exception. It is
  the prime engine-crash suspect, it forces the isolation above, and every effect that has reached for
  it — the goo merge, the worm neck, the metaball waist — is expressible on `translate` + `scale` +
  `clip-path` on a promoted layer. **The goo-morph edict survives intact without it: elongate → travel
  → reunite.** An earlier canon sanctioned a static inline-SVG goo filter over a frozen layer; that
  sanction is **struck**. → **`G-NO-ENGINE-BRANCH`** · **`G-NO-FLASH`**
- **No nested `color-mix()` endpoints.** A `color-mix()` whose own endpoints are `color-mix()`
  expressions has crashed a shipping renderer. One level, always.

---

# 2 · THE MOTION

## 2.1 The spring table

<!-- CANON:BEGIN spring-table · source of record: src/composables/motion/spring/springPresets.ts · generated, do not hand-edit -->
| row | response | ζ | band *(owed: W-SPRING-RETUNE §0b)* | settle | peak IN THE SHIPPED CURVE | rebound visible (Law 0) | the one job |
|---|---|---|---|---|---|---|---|
| `smooth` | 0.58 | 0.80 | 2.0% | 0.35s | 0.00% — lands dead | no | Patient entrances, fades, and scale-ins with a quiet sense of weight. |
| `snappy` | 0.48 | 0.74 | 2.0% | 0.44s | 3.15% | **yes** | Quick, weighty control movement for indicators, progress, and reveals. |
| `bouncy` | 0.60 | 0.60 | 2.0% | 0.57s | 9.47% | **yes** | Playful emphasis for dialogs, success moments, and the completion seal. |
| `gentle` | 0.82 | 1.00 | 2.0% | 0.76s | 0.00% — lands dead | no | A calm, patient arrival with no overshoot. |
| `dock` | 0.35 | 0.82 | 2.0% | 0.22s | 0.00% — lands dead | no | A brisk liquid morph for the dock and its coordinated contents. |
| `press` | 0.20 | 0.80 | 2.0% | 0.12s | 0.00% — lands dead | no | A responsive press with a subtle rebound and continuous interruption. |
| `panel` | 0.40 | 0.71 | 2.0% | 0.38s | 4.21% | **yes** | A fired presentation deploy — both axes one spring, intrinsic 4-5% overshoot, text born blurred condensing ~190ms, the rim flare celebrating the data (+0.5s/+0.85s). |
| `orb-drop` | 0.22 | 1.00 | 2.0% | 0.2s | 0.00% — lands dead | no | The invocation drop — a dead critically-damped landing; the energy is the light build. |
<!-- CANON:END spring-table -->

**Read that table against Law III and three rows are lying, by construction.** `press` promises "a
subtle rebound" and emits a curve whose peak is exactly zero (III.2 — delete the claim, not the
damping). `bouncy`'s peak is above the measured corpus ceiling for a *positional* overshoot, which is
not a tuning preference but a category error (III.4). Three rows rebound where the law permits one.
**The peak column is the emitted curve's sampled peak**, not the analytic ideal, because Law 0 is about
what paints.

Every value in that table is read through the same call `scripts/regen-spring-tokens.mjs` makes, so the
canon and the shipped `--spring-*-settle` token cannot disagree. **Do not re-derive a settle from a
closed form** — the closed form does not reproduce the shipped token, and a canon that re-derives
drifts from the generator that ships.

**The cure is `W-SPRING-RETUNE` (the ONE spring authority), and its vocabulary is ruled here:** six
rows, one job each — `press` · `present` · `dock` · `panel` · `bloom` · `world` — with `panel` the one
rebounding row (the fired deploy). **`present` is the ruled name for the anchored-materialization row**
(today's `orb-drop`): rank +3's own role word, zero disk collisions, and never previously retired —
the `transient` name is a name-grave, retired for cause and barred by standing fence. The pick is
owner-reversible in one word at the retune wave. When that wave lands, the generator re-emits this
table and every retired name above survives only in the appendix.

## 2.2 The clocks

- `--spring-<name>-settle` is the row's own settle, generated. `--spring-<name>-duration` is that
  settle times `--motion-tempo`. **Pairing a spring with a generic duration re-times it to the wrong
  wall clock** and front-loads the whole trajectory; the per-spring clock is mandatory.
- `--spring-<name>-exit-duration` is `0.6 ×` the settle, generated beside it — III.8 derived, never a
  hand-written literal.
- `--motion-tempo` scales every clock together. `--motion-beat` is the rank quantum of III.5.
- `--motion-weight` (0 → 1) names how much deform a surface carries and co-scales squash depth,
  overshoot share, anticipation and cast travel together, so they read as one proportioned deformation
  rather than four unrelated tics. Velocity folds into it live, so a surface deforms **more** the faster
  it moves. PRM sets it to 0.

## 2.3 The z stack

<!-- CANON:BEGIN z-stack · source of record: src/styles/tokens/scheme-motion.css · generated, do not hand-edit -->
| token | value |
|---|---|
| `--z-behind` | -10 |
| `--z-background` | 0 |
| `--z-content` | 10 |
| `--z-controls` | 20 |
| `--z-bar` | 30 |
| `--z-header` | 35 |
| `--z-dock` | 40 |
| `--z-panel` | 45 |
| `--z-overlay` | 50 |
| `--z-hovercard` | 120 |
| `--z-tooltip` | 120 |
| `--z-popover` | 130 |
| `--z-modal` | 140 |
| `--z-fullscreen` | 150 |
| `--z-toast` | 160 |
| `--z-toggle` | 999 |
| `--z-max` | 9999 |
<!-- CANON:END z-stack -->

The stack is monotone by composition: substrate → content → chrome → presented → modal. **Two
overlapping glass surfaces at the same tier are a defect** — each filter samples the other's output.
Overlapping glass shares one composition container.

---

# 3 · THE CHOREOGRAPHY — THE FOURTEEN LAWS OF THE EXEMPLARS CODEX

The adjudicated exemplar codex is the source of record for how compound motion is scored; its
fourteen laws land here as canon. Every law is proved by at least two independent measurement seats;
constants below are ratios, deltas, or class-D corpus ceilings with their banked citation — never
resolved values. iOS is the exemplar, never the target: what transfers is behavior, never a pixel of
palette.

1. **NO TWO CHANNELS SHARE A CLOCK, AND THE ORDER IS FIXED.** The rank ladder of §III.5 is this
   law's schedule. A container's own opacity finishes at ~60% of its geometry; its contents are held
   near zero and arrive late by blur; a departing payload leaves first. Three truths about three
   layers, never a contradiction.
2. **DIRECTIONS ARE NOT REVERSES, AND EXITS EVAPORATE.** Fission fades-then-moves; fusion
   moves-then-fades with a blur-resolve channel fission lacks. Entries: opacity/focus completes
   before geometry. Exits: geometry completes before opacity. `EXIT = 0.6 × ENTRY` (floor and
   ceiling are clock tokens); attention objects earn `4 : 1` entrance : exit; overshoot is reserved
   for arrivals and impacts, never dismissals. Every pair is two authored scores.
3. **CONTAINERS OUTRUN CONTENTS, AND CONTENT-LAG IS A SPRING.** The interior trails its shell in
   proportion to velocity and recovers after the shell stops — a damped coupling, never a parent
   transform. Chrome arrives first; content catches up.
4. **POSITIONAL OVERSHOOT CEILS AT THE MEASURED ~4.7%** *(class D — six independent measurements,
   nothing above it in 329 frames)*. Everything larger is a volume-preserving deform. Exactly one
   rebounding row; all playfulness in shape.
5. **ANSWER BEFORE YOU MOVE.** Every engagement opens with a non-translating answer; re-engage runs
   ~5× faster than cold engage — the material remembers. (§II.2 is this law's gate.)
6. **ANISOTROPY ENCODES INTENT; THE DISCLOSING AXIS IS THE SLOW ONE.** Nothing is a uniform scale.
   The axis that merely reaches its bounds runs fast; the axis that discloses content runs slow and
   carries the overshoot. Which axis opens first is the phenomenon's signature.
7. **RADIUS IS A ROLE, NEVER A PRODUCT OF SCALE; NESTING IS CONCENTRIC.** Near-invariant through
   6× growth; `r = h/2` derived at every instant where the shape is a capsule; carried as a ratio
   through identity morphs with a ~+15% mid-flight swell; `outer = inner + inset`; children ≈ 0.6×
   their parent's radius; exactly two shape families. An exception is a named role, never an
   accident.
8. **THE DOUBLE-DOCK COMPOSITION LAW.** A dock is a STACK of separate glass bodies with
   load-bearing air — the gap ≈ 0.25–0.33 of the adjacent slab *(class D — re-measured at the codex
   adjudication; the "≈ half" reading is rejected there)* — gated on legibility through it; each
   slab its own rim and cast, the upper's shadow falling on the lower; born by Y-division, killed by
   Y-merge, transformed by member-set diff. The collapsed form is a first-class composition, never a
   scaled clone.
9. **THE CONTINUOUS-TIMELINE EXPANSION LAW.** A surface grown out of another surface is one object
   on one timeline, never a crossfade of surfaces. The origin's glass IS the destination's glass,
   and it dilutes when grasped. Both text layouts draw simultaneously at two sizes and nothing ever
   squashes. Only the participating element participates. Corollary: **grow a body out of a fixed
   anchor hole, never scale a box.**
10. **GLASS IS A TONE COMPRESSOR; COLOUR IS POSITION.** `L_out = floor + gain · L_in`, hue
    preserved; the gain is the rung (§I.7). Tint is sampled instantly and locally — no easing curve
    on the tint channel, ever — recomputed during transform. Two glasses per screen: toward-content
    lightens, away darkens.
11. **TWO SETTLE VOCABULARIES, NEVER MIXED.** Inertial paging is a single exponential with zero
    overshoot — native scroll-snap gives it free in both engines. Fired deploys ride our springs, at
    most one visible rebound. A paged strip that bounces is a toy; an expansion that lands dead is a
    tween.
12. **IDLE IS NOT STILL, AND IDLE REPORTS STATE.** Attending surfaces carry the one-driver caustic
    of §II.6; ambient content churns; controls dwell before autonomous motion; substrates are
    invisible until something passes; no two points share a timeline.
13. **ANCHOR HONESTY.** Elements are born from and die into one anchor at ~10–13% terminal scale —
    the miniature is the whole composed self, not a generic pill. Blur couples to velocity in both
    directions; the interior layout never reflows while receding; the corner an affordance sits on
    is the vanishing point the element already uses. *(The anchor scale is a corner anchor, never a
    plate birth scale — the two are different constants with different owners.)*
14. **THE HOUSING CARRIES THE MATERIAL; THE MOVER CARRIES NONE** (§I.6). At rest a selection is a
    pressed well — darker; in motion, a dome — brighter. Bevel the worm as well as the track and you
    get mud.

Two codex cells stayed contested between its arms and are **capture rows, not law**: blur's role in
the corner-anchored miniaturize exit was RULED at the codex adjudication (fade-led, frozen-geometry,
terminal micro-blur only — **no capture owed**); the texture two-layer question (whether cream reads
plastic after the grain strike) settles at the frost wave's first paired capture — one capture, never
a re-guess.

---

# 4 · THE PROPORTION

Nothing dimensional is arbitrary. Every dimensional series has **one generator**, and a value off a
series is legal only if it is the arithmetic product of a **stated law**.

## 3.1 Space — one generator for padding and gap

One geometric series carries both padding and gap, so that "weight : gap" is statable once. Every rung
is at least 1.5× its neighbour, so no two are confusable at any size. Padding is assigned **by role** —
concentric residue, atom, control interior, the presented plate, the room plate, the page break — and
gap by **rank distance**: intra-atom, control, body, family, section, page.

**The pairing law: `pad(role) = r(role) − floor`.** Each radius role paired with the padding rung one
below it yields the floor rung as residue, exactly. That single identity is why the two series cannot
be tuned independently, and why `floor` is a named rung rather than a number.

**Mobile transposition is ONE law.** Every space rung steps down exactly one; the control scalar moves
the **control box only** — height, pad, glyph. **Type keeps its own clamp and never rides the control
scalar.** One transposition, not seven.

→ **the PROPORTION register** (the tranche-wide seated gate)

## 3.2 Radius by role

<!-- CANON:BEGIN radius-roles · source of record: src/styles/theme/radius.css · generated, do not hand-edit -->
| role | token | value on disk | law |
|---|---|---|---|
| **cell** | — | `0` | inherits the parent's clip — legal only where the element has no silhouette |
| **floor** | `--radius-xs` | `4px` | `max(4, r_ctx − inset)` — the relay's minimum |
| **tick** | `--radius-md` | `6px` | `0.30 × h` at h=18 — the many-of-N mark |
| **control** | `--radius` | `0.625rem` | `≈0.25 × h` at h=40 — a box you type in, press, or read |
| **card** | `--radius-2xl` | `1rem` | the presented plate — `r − pad = 4` exactly |
| **room** | `--radius-3xl` | `1.5rem` | `1.5 × card` — a box you enter |
| **pill** | `--radius-pill` | `9999px` | a stadium — ONE spelling, no `50%`, no sentinel arithmetic |
<!-- CANON:END radius-roles -->

**Two laws, and they do not overlap.**

- **LAW A — the concentric relay governs role-*less* nested surfaces.** Every padded surface publishes
  its resolved inline pad **unconditionally**; a child corner is `max(floor, ctx − inset)`. **The relay
  runs parent → child only** — a stadium child never drives its parent's radius. A relay whose root
  identity makes the calculation return the parent's own corner is a calculation that never reaches
  paint.
- **LAW B — role tokens govern anything with a role.** A field, button, chip or card inside a plate
  takes its role rung, never the relay.

**Three clauses the exemplar corpus adds, both arms concurring:**

- **Radius is invariant through scale.** A surface that grows 6× or 8× keeps its corner. A radius that
  scales with its box changes the shape's *category* mid-flight.
- **Where the shape is a capsule, radius is derived** (`r = h/2`) at every instant, not at the
  endpoints.
- **Through an identity morph radius is carried as a ratio**, with a small mid-flight swell that
  relaxes — the one place a radius may move, and it moves proportionally.

`--radius`'s current root value is an inherited literal from a foreign design system and is **not**
this library's identity; it is named here as the thing `W-RADIUS-ROLE` re-derives, not as a law.

→ **`G-RADIUS-ROLE`**

## 3.3 Ink — one ink, one weight, three alphas

Boundaries are drawn in **one** ink at **one** weight, at three alphas in the ratio **1 : 2 : 6**:

| rung | role |
|---|---|
| **seam** | in-content rule; group ↔ group; a **flush** plate's own edge |
| **edge** | a **floating** plate's boundary — where a shadow sits outside it |
| **perimeter** | a control's own edge · the focus ring · the selection indicator |
| *indicator* | the perimeter rung spread over twice the height — same ink mass, findable along a long run |

**The gap law — a boundary is drawn only where the gap cannot carry the rank.** At section distance, no
line is ever drawn. At family distance, a seam. At body distance, an edge. **A control's perimeter and
its focus ring are gap-independent** and always take the strong rung, because a contrast requirement
does not care what is beside it.

**A second boundary ink is a second colour system**, and a tan hairline that sits between two rungs
belongs to neither. One ink.

<!-- CANON:BEGIN ink-series · source of record: src/styles/tokens/ink.css · generated, do not hand-edit -->
| rung | token | α | mass |
|---|---|---|---|
| seam | `--ink-seam` | — *owed: W-TOKEN-CANON* | — |
| edge | `--ink-edge` | — *owed: W-TOKEN-CANON* | — |
| perimeter | `--ink-perimeter` | — *owed: W-TOKEN-CANON* | — |
| fill · hover | `--fill-hover` | — *owed: W-TOKEN-CANON* | — |
| fill · selected | `--fill-selected` | — *owed: W-TOKEN-CANON* | — |
<!-- CANON:END ink-series -->

## 3.4 Fill — the channel the stroke ladder does not cover

Where a glyph or a stroke **co-carries** a state, the fill rungs suffice: hover, selected, and both.
Where the fill is the **sole carrier** — a segmented indicator, an active dock member, a toggle
on-state — it must reach the full contrast bar against its own unselected sibling, **or it is a lie**.
A selected row that computes byte-identical to a hover row reports nothing.

## 3.5 Type — one ratio, one clamp

One ratio governs the whole ladder; **display roles take every second rung**; one root clamp carries
the viewport response and **type never rides the control scalar**. The control label to control value
relation is a fixed power of the ratio and is **invariant at every viewport** — a coarse pointer needs
the WCAG 2.5.5 AAA target floor of *box*, not a larger label.

**Leading is monotone non-increasing in size** — four bands with one carve for long-form prose. A
ladder whose smallest type has the tightest leading is inverted.

**Measure floors are real constraints, not preferences.** A heading in a column narrower than its
measure floor must step down a rung; a status pill never wraps.

---

# 5 · THE LIGHT AND THE INK

## 4.1 Specular
One white leg, and it is a hairline. The dark arm is never brighter than the light arm. A ring plus a
rim plus a highlight plus a border is four assertions of one boundary, and they overlap in paint — the
joint removal is smaller than the sum, which is the arithmetic proof that they are redundant.

## 4.2 The bevel
A boundary is a **paired** mark — a dark hairline and a bright specular, lit from above, with the
bright arm on the horizontal edges and the dark arm on the vertical ones, and a short inner falloff.
On a dark ground the outer cast becomes an **emitted bloom** rather than a shadow. A single flat arm
with no specular and no falloff is paper, not glass.

## 4.3 Shadow
Elevation earns the cast. A floating card's shadow does not belong on an inline control: a cast whose
blur is most of its own element's height is a floating-plate token worn by a widget. Shadows are
tokens; a component wave that retunes one is editing the material, and may not.

## 4.4 Tint is sampled, never eased
Every glass surface samples its ground **live, locally, and instantaneously**. A tint swap takes one
frame; **there is no easing curve on the tint channel, ever**; and sampling continues *during* a
transform. Colour does not animate — position does, and the colour follows because it is sampled.

---

# 6 · THE FOCUS VEIL

The one sanctioned full-viewport `backdrop-filter`, and it is not a scrim.

One plate, fixed and pointer-transparent, sitting between the world and the engaged control, carrying a
blur plus a centre-weighted dim, **masked** to hold full alpha out to a core radius from the engaged
element's rect centre and easing to transparent over a bloom distance. The engaged control sits
**above** it and stays perfectly crisp. Content directly behind the control is fully diffused; the
falloff restores legibility outward; beyond it nothing is touched.

- **Only opacity animates.** The blur radius field is static — an animated `backdrop-filter` radius is
  the most expensive thing this library can do.
- **In: lagging the geometry at annotation rank. Out: together with the geometry, no lag.**
- **Mounted only while engaged.** A resident full-viewport `backdrop-filter` is not acceptable at rest,
  on any engine.
- It needs **two consumers or it is not a primitive**; four are available — the engaged slider, the
  graded dialog backdrop re-roled from "backdrop variant", a select over dense content, and the dock's
  engaged control.

→ **`G-SCRIM-NO-BLUR`**

---

# 7 · THE CROSS-ENGINE FLOOR

**Safari the app is the common denominator.** The reference bar is iOS; a WebKit paint defect is a
failed surface. `webkit-engine` (the Playwright build) and `safari-app` (the shipping app) are
**separate evidence cells that never infer one another** — the two have returned opposite results on
this library's own glass. Every material and motion acceptance is a paired capture: Chromium AND
safari-app, both modes.

**NO CHROME-SPECIAL GLASS — the engine-branch law.** (a) No branch keyed on engine identity or
capability may change the **material** a glass surface paints — its `backdrop-filter`, veil, rim, or
resolved rung. (b) A branch is legal only if it **fails loud** (primary absent, never substituted) or
forks a **non-material** channel (ink, motion presence, scrollbar, platform label, mode arm). (c) The
instrument is **computed material per engine**, never `@supports` text — the only form that catches a
runtime latch or a build-stage prefix drop. (d) Legal-by-register forks are enumerated with grounds;
an unregistered fork fails.
→ **`G-NO-ENGINE-BRANCH`**

**No masking fallback.** The primary works in paint or it fails loud (§I.1). A fallback that hides a
dead primary is worse than the failure. A designed substitution is legal only when declared with its
reason on the branch; silent substitution never.

**Forbidden mechanisms, absolute:**

- **`filter: url()` on any new consumer.** The SVG-filter goo sanction of the former canon is
  **struck**. Metaball merges ride the ONE metaball operator on transform/opacity/clip geometry —
  real necks by geometry, never an SVG threshold filter.
- An **ancestor `filter` above any transmissive glass surface** — it creates an isolated buffer that
  kills `backdrop-filter` on every descendant, both engines. Effect layers ride as siblings.
- **Per-frame `backdrop-filter` re-blur** in a steady-state loop; an animated blur *radius* anywhere
  (the focus veil animates opacity only).
- **`width`/`height` animation as an extent channel** — `clip-path: inset()` on a promoted,
  destination-laid-out layer is the one legal extent morph; transform/opacity are the steady-state
  channels.
- **Nested `color-mix()` endpoints** — the measured WebKit renderer-crash class.
- **`light-dark()` wrapping an inset-shadow fragment** — it computes the whole box-shadow to none;
  plain per-mode arms only.
- **`:global()` compound selectors in Vue scoped styles** — silently dropped from the emitted CSS;
  plain-ancestor selectors only.

**The paint-cost fence.** Paint-bound effects gate to discrete flips or one-shot transitions. A
substrate owns its canvas, GPU-only, parked when hidden, PRM-frozen; demand gates are
amplitude-aware, never zero-aware. A sub-perceptual layer is deleted, not tuned — a layer earns its
cost with a measured visible delta.

---

# 8 · ACCESSIBILITY BRACKETS

Three brackets, all non-negotiable; tokens honor the media queries — consumers never roll their own
checks.

| preference | behavior |
|---|---|
| `prefers-reduced-transparency` | rungs → opaque tinted surface (full α, filter none); the boundary pair survives; **every companion layer retires with the blur** — no decorative residue on a solid plate |
| `prefers-reduced-motion` | §III.11's floor: springs → standard decelerate, loops → state flips, squish → opacity cue, substrates freeze, `--motion-weight` → 0 — **one assignment**, never a per-component sweep |
| `prefers-contrast: more` | rim to full α at double width; text to the strong floor; contrast holds against the **worst-case** backdrop pixel, never the midtone |

Coarse pointers take §II.4 whole: the WCAG 2.5.5 target floor with the glyph unchanged, and no hover
arm outside `@media (hover: hover)`. Proportion has no bracket — geometry holds identically across
every a11y state.

---

# 9 · THE SERIES ARE EMITTED

**Every constant in this document is generated.** `scripts/regen-design-canon.mjs` rewrites each
`CANON:BEGIN/END` block from the artefact named in its own marker. The script is idempotent, rewrites
in place, and **throws** when a named source is absent rather than printing a blank or a stale cell.

**The rule the generator exists to enforce: read the LAST artefact in the emission chain, never a
re-derivation.** A closed form that "should" reproduce a shipped token does not, and a canon that
re-derives drifts silently from the generator that ships. Where a value has an emitted home, the canon
reads that home. Where it has none, the canon reads the source and says so.

| block | source of record |
|---|---|
| `spring-table` | `springPresets.ts` **through** `springProjection.ts` — the identical call the token generator makes |
| `glass-ladder` | `tokens/glass.css` · `tokens/dark-arm.css` · `tokens/dark-arm-glass.css` |
| `glass-registers` | `tokens/glass.css` · `tokens/dark-arm.css` · `tokens/glass-deep.css` |
| `radius-roles` | `theme/radius.css` |
| `ink-series` | `tokens/ink.css` |
| `space-series` | the spacing token partial |
| `type-ladder` | `typography/scale.css` |
| `z-stack` | `tokens/scheme-motion.css` |
| `motion-registers` | `tokens/scheme-motion.css` · `motion-registers.css` |

**An OWED row is legal and visible.** A value that does not exist yet emits as `— *owed: <WAVE>*`, and
the generator **throws** if the named wave is not on the roster. The canon may state a law the library
does not yet obey; it may not state a value that nobody owns.

**Drift is a build failure.** `regen-design-canon.mjs --check` re-emits into memory and exits non-zero
on any difference. That is the instrument of `G-CANON-CONSTANT-BOUND`.

**Numerals outside a block.** A numeral may appear in prose only if it belongs to one of four declared
classes. Anything else emits.

| class | what | example |
|---|---|---|
| **A · structural** | section and law ordinals, table indices | `§3.2`, `LAW III` |
| **B · cited external standard** | a bar this library does not set, named with its standard | the WCAG 2.5.5 target floor, a contrast ratio, a frame budget |
| **C · a law written as a ratio** | a *relation*, never a resolved value | `EXIT = 0.6 × ENTRY`, `1 : 2 : 6`, `r = h/2`, `room = 1.5 × card` |
| **D · a measured corpus ceiling** | a bound quoted from a named banked measurement, with its citation | the ~4.7% positional-overshoot ceiling |

A resolved value in prose — a radius, an alpha, a radius in px, a duration in ms — is **never** class
A–D. It emits, or the sentence is rewritten to name the token instead of the number. This clause is
what makes the gate finite, and it is why §III.5's budgets read "the acknowledge window" rather than a
figure.

---

# 10 · WHAT WE DO NOT COPY

The reference is iOS, and the reference is wrong for us in ten specific places. Each is the exemplar's
correct choice for a saturated wallpaper, and each becomes a defect on warm cream paper.

| # | theirs | ours |
|---|---|---|
| 1 | a neutral black scrim | **the warm-ink scrim.** We take the grammar — dim only, chroma survives — and keep our own ink. This is where we are already ahead. |
| 2 | a very tight birth scale, correct on tight continuous corners | **the deft middle.** On our larger radii a very tight birth reads as cartoon squash and the corner visibly wobbles in flight. Composed with the volume-preserving squish, not instead of it. |
| 3 | an all-black command surface | **hierarchy by alpha, never by hue.** The opacity *grade* stays — input most opaque, results frosted, world dimmed — in our warm plate. |
| 4 | continuous-corner superellipse geometry | **deft rounding on plain corners, with radius *continuity* enforced** — source rect and expanded rect read the same role token. Continuity is the load-bearing half; the superellipse is the garnish, and we do not fake it. |
| 5 | full-bleed page replacement | **floating inset objects on paper.** Forward navigation is a zoom-window push that stops at the content column's gutter, never at the viewport edge. A full-bleed surface reads as a *place*; an inset one reads as an *object in the scene*. |
| 6 | a dark launch hold | **the destination is laid out complete and revealed by clip.** There is never a blank hold to decorate. |
| 7 | a halftone dot-matrix arrival | **our own painterly registers as the materialization texture** — a paint bloom, not a dot screen. Same law (energy arrives quantized, settles continuous; one scalar carries arrival → rest), our medium. Copying a signature reads as borrowed. |
| 8 | — *(this one is ours, not theirs)* | **a bounce above the measured ceiling.** We shipped one. Playfulness is **deform**, not overshoot. |
| 9 | per-row stagger in menus | **none.** The exemplar deliberately has none; we must not add it. |
| 10 | plates that are bright and shiny | **FROST FIRST.** Alpha and blur carry the material; the specular is a hairline and stays one. On warm cream a bright rim plus a high plate saturate reads as plastic. This is Law I, and it is the sentence the owner has had to say three times. |

---

# 11 · THE CONSUMPTION RULE

A primitive's spec is incomplete until it names, from this canon: its rung (§1.1) or non-rung role ·
its springs by row name and its rank choreography (§2, §III.5) · its engagement rungs and budgets
(§II.1) · its proportion rungs (§4) · its cross-engine arms (§7) · its a11y behavior (§8). A spec
that mints a constant this canon does not carry is authoring a defect; a spec that restates a
constant instead of citing it is authoring a second authority. Tokens define in the token layer;
recipes consume them at the feature owner; consumers override at `:root` — presets live in consumers,
and this library's own defaults evolve here.

---

# 12 · WHERE THE REST LIVES

These homes carry **mechanism**. They cite this document and never restate a constant from it; a
restated constant is a build failure under `G-ONE-DESIGN-DOC`.

| home | what it carries |
|---|---|
| `docs/canon/glass-system.md` | how the level scalar threads the ladders; the substitution-vs-redeclaration seam |
| `docs/canon/motion-system.md` | how the spring tokens are generated and consumed; the compositor-safe channel set |
| `docs/canon/design-axes.md` | library governance — token-first, earned surface, clean breaks. Not design law. |
| `docs/canon/*` | build, dependencies, exports, structure, conventions, consumer wiring |
| `src/components/*/README.md` | the component's own anatomy, props and a11y contract |
| `README.md` | install, usage, subpaths — and one line pointing here |
| the tranche corpus | **evidence, not law.** Read it for how a value was measured, never for what the value is. |

---

# APPENDIX A · RETIRED VOCABULARY — the clean break

The one span where retired names may appear. A retired name anywhere else in this document, outside a
generated block still emitting the pre-retune disk, is a self-consistency failure.

| retired | replaced by |
|---|---|
| the seven-tier ladder (`dock`, `chassis` as rungs) | five rungs + the named non-rung roles (§1) |
| the four-rung `subtle / default / medium / elevated` | the five-rung canon |
| `--spring-smooth` | `press` at the honest clock; entrances → `present`; scroll → `world` |
| `--spring-snappy` | travel/indicator → `dock`; entrances → `present` |
| `--spring-bouncy` | geometry → `panel` (the measured ceiling); ceremony → the light channel |
| `--spring-gentle` | `world` |
| `orb-drop` | `present` — renamed at the retune wave; same job, universal |
| the `transient` name | a name-grave, retired for cause; never returns |
| the grain overlay layer | struck at the measured zero; one texture capture row owed at the frost wave (§3) |
| `--glass-highlight`, the specular side leg, the `::before` ring | the two-channel boundary law (§I.3) |
| the goo `filter: url()` sanction | the metaball operator on geometry (§7) |
| the driver-only momentum carve | **ALL MOTION** (LAW III, ratified) |
| `--radius-input` and the many-name radius set | radius by role + the concentric relay (§4) |
| `--border` as divider ink | the three-alpha warm ink (§4) |
| the dock-blur "NO-OP by design" narrative | a defect class, never a design; the dock reads its rung through its seam |

# APPENDIX B · PROVENANCE — why the constants are emitted

Authored from the measured corpus of the BJ refinement (FROST-TABS-REAUDIT · MOTION-CANON ·
PROPORTION · GESTALT · IOS27-ARCHIVE · the EXEMPLARS-CODEX · LAYOUT), which remains on record as
**provenance, never authority**. The prior canon of this file was wrong on **13 of its 14** stated
material and motion constants — every damping ratio, most blur radii, every saturate factor — and the
re-author measured four more defects beside them: a settle formula that does not reproduce its own
shipped token, two contradictory alphas for one surface across two documents, and a token documented
as a live value that is defined nowhere on disk. That record is the whole argument: a hand-typed
constant is a future lie. One document; every constant emitted from the artefact that owns it; the
next fork is a defect named `G-ONE-DESIGN-DOC`.
