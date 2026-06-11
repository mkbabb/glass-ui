# R7-MOTION2-RESEARCH — the curve gallery isomorphism dossier

> RESEARCH lane (audit-only). The binding source of truth for the AZ.W-MOTION2
> spec. Closes USER-AUDIT-2026-06-11-R7 (R7-1 register, R7-2 stroke, R7-3 picker,
> R7-4 isomorphism). NO source was edited; this dossier is the only artefact.
>
> Authorities (read-only, NEVER edited):
> - `~/Programming/keyframes.js/src/animation/utils.ts` (`getTimingFunction` resolver)
> - `~/Programming/keyframes.js/src/animation/easing.ts` (the light/heavy boundary shim)
> - `~/Programming/keyframes.js/src/animation/springTimingFunction.ts` (the spring surface)
> - `~/Programming/keyframes.js/node_modules/@mkbabb/value.js/dist/easing.d.ts` (THE registry — `timingFunctions`, `bezierPresets`)
> - `~/Programming/keyframes.js/demo/easing/*` + `demo/spring/*` (the presentation idiom)
> - `~/Programming/keyframes.js/demo/@/components/custom/animation-controls/animationDescriptions.ts` (names + bezier table + descriptions)
> Surface under redress: `glass-ui/demo/stories/motion/curve-gallery.vue` + `curve-families.ts` + `BezierEditor.vue`.

---

## §0 — The isomorphism authority chain (where the canon ACTUALLY lives)

The keyframes `easing.ts` named in the audit is a **resolver shim**, not the
registry: it normalizes a callable/typed `Easing`, computes a CSS twin string,
and `await`-resolves a string name through `import("./engine")`. The named-curve
catalogue itself lives one hop deeper:

```
easing.ts (resolveEasing) ──▶ engine.ts (re-exports getTimingFunction from utils.ts)
                                   │
utils.ts (getTimingFunction) ──▶ @mkbabb/value.js `timingFunctions` registry  ← THE CANON
                                   + `bezierPresets` (back curves, no analytic twin)
                                   + `steppedEase`/`stepStart`/`stepEnd` (step factories)
                                   + `cssLinear` (linear() multi-stop parser)
springTimingFunction.ts ───────▶ SpringProgress solver (sampled → Easing.fn + .css)
```

`getTimingFunction` (utils.ts:148) resolves, in order: a callable (returned
as-is) → a `cubic-bezier(...)` literal (→ `CSSCubicBezier`) → a `steps(n,term)`
literal + `step-start`/`step-end` (→ `steppedEase`) → a `linear(...)` multi-stop
literal (→ `cssLinear`) → a NAMED registry entry (`timingFunctions[name]`, the
last branch). **The named catalogue is `timingFunctions` in value.js's
`easing.d.ts` lines 105–161.** That table + `bezierPresets` (lines 73–97) + the
step factories + `springTimingFunction` IS the canon. The keyframes DEMO presents
exactly this set, grouped by `EASING_GROUPS` (demo/easing/easingGroups.ts:28).

**Dual-key note.** `timingFunctions` registers most analytic curves under BOTH a
camelCase key (`easeOutCubic`) and a hyphen key (`ease-out-cubic`) pointing at the
SAME fn — that is ONE curve, two aliases (not two canon items). The keyframes demo
keys its UI off the HYPHEN form (it re-hyphens everything via `camelCaseToHyphen`,
EasingTarget.vue:218–222). The canon-count below counts DISTINCT curves, with the
canonical display name in the keyframes-demo register.

---

## §1 — THE CANON INVENTORY (the isomorphism target — exhaustive)

The complete easing surface keyframes exposes, in the keyframes-demo register.
**Total distinct easing items = 42** (29 named/analytic+bezier from `timingFunctions`,
3 back-only-bezier from `bezierPresets`, 1 parametric `steps` generator + 2 step
keywords, 1 live custom `cubic-bezier`, 1 `linear()` multi-stop form, + 5 spring
presets from `SPRING_PRESETS` via `springTimingFunction`). Tabulated by family.

### 1A — Standard (5) — `timingFunctions` + `bezierPresets`
| display name | camel alias | kind | signature / source | description (keyframes copy) |
|---|---|---|---|---|
| `linear` | `linear` | analytic | `linear(t)` ∈ easing.d.ts:8 | constant velocity |
| `ease` | — | bezier | `bezierPresets.ease` = `[.25,.1,.25,1]` → CSSCubicBezier | gentle start & end |
| `ease-in` | — | bezier | `[.42,0,1,1]` | slow start, fast end |
| `ease-out` | — | bezier | `[0,0,.58,1]` | fast start, slow end |
| `ease-in-out` | — | bezier | `[.42,0,.58,1]` | slow start & end |

### 1B — Sine (3) — analytic, dual-keyed
| display | camel | kind | bezier twin (bezierPresets) | desc |
|---|---|---|---|---|
| `ease-in-sine` | `easeInSine` | analytic | `[.47,0,.745,.715]` | sinusoidal ramp up |
| `ease-out-sine` | `easeOutSine` | analytic | `[.39,.575,.565,1]` | sinusoidal ramp down |
| `ease-in-out-sine` | `easeInOutSine` | analytic | `[.445,.05,.55,.95]` | sinusoidal both |

### 1C — Quad (3) — analytic, dual-keyed
| display | camel | kind | bezier twin | desc |
|---|---|---|---|---|
| `ease-in-quad` | `easeInQuad` | analytic | `[.55,.085,.68,.53]` | quadratic acceleration |
| `ease-out-quad` | `easeOutQuad` | analytic | `[.25,.46,.45,.94]` | quadratic deceleration |
| `ease-in-out-quad` | `easeInOutQuad` | analytic | `[.455,.03,.515,.955]` | quadratic both |

### 1D — Cubic (4) — analytic + the Hermite smoothstep
| display | camel | kind | bezier twin | desc |
|---|---|---|---|---|
| `ease-in-cubic` | `easeInCubic` | analytic | `[.55,.055,.675,.19]` | cubic acceleration |
| `ease-out-cubic` | `easeOutCubic` | analytic | `[.215,.61,.355,1]` | cubic deceleration |
| `ease-in-out-cubic` | `easeInOutCubic` | analytic | `[.645,.045,.355,1]` | cubic both |
| `smooth-step-3` | `smoothStep3` | analytic | (no bezier; Hermite) | hermite interpolation |

### 1E — Expo (3) — analytic, dual-keyed
| display | camel | kind | bezier twin | desc |
|---|---|---|---|---|
| `ease-in-expo` | `easeInExpo` | analytic | `[.95,.05,.795,.035]` | exponential ramp |
| `ease-out-expo` | `easeOutExpo` | analytic | `[.19,1,.22,1]` | exponential decay |
| `ease-in-out-expo` | `easeInOutExpo` | analytic | `[1,0,0,1]` | exponential both |

### 1F — Circ (3) — analytic, dual-keyed
| display | camel | kind | bezier twin | desc |
|---|---|---|---|---|
| `ease-in-circ` | `easeInCirc` | analytic | `[.6,.04,.98,.335]` | circular ramp up |
| `ease-out-circ` | `easeOutCirc` | analytic | `[.075,.82,.165,1]` | circular ramp down |
| `ease-in-out-circ` | `easeInOutCirc` | analytic | `[.785,.135,.15,.86]` | circular both |

### 1G — Back (3) — **bezier-ONLY** (the trap: no analytic `ease*` twin)
`timingFunctions` registers `ease-in-back`/`ease-out-back`/`ease-in-out-back` as
**bezier closures over `bezierPresets`** (easing.d.ts:155–157 — `(x:number)=>number`,
NOT a named analytic fn). The anticipate/overshoot lives ONLY as control points.
| display | kind | bezier (bezierPresets) | desc |
|---|---|---|---|
| `ease-in-back` | bezier | `[.6,-.28,.735,.045]` (y1<0 → anticipate) | pulls back first |
| `ease-out-back` | bezier | `[.175,.885,.32,1.275]` (y2>1 → overshoot) | overshoots, settles |
| `ease-in-out-back` | bezier | `[.68,-.55,.265,1.55]` | pull back & overshoot |

### 1H — Bounce (6) — analytic generators (value.js bounce family)
The `easeInBounce` primitive + 5 `bounce*Ease` siblings. NO bezier twins (the
multi-segment bounce can't be a single cubic). All in `timingFunctions`, dual-keyed.
| display | camel | kind | source | desc |
|---|---|---|---|---|
| `ease-in-bounce` | `easeInBounce` | analytic | easing.d.ts:40 | bouncing ramp up |
| `bounce-in-ease` | `bounceInEase` | analytic | easing.d.ts:41 | bounce entrance |
| `bounce-in-ease-half` | `bounceInEaseHalf` | analytic | easing.d.ts:42 | half bounce in |
| `bounce-out-ease` | `bounceOutEase` | analytic | easing.d.ts:43 | bounce landing |
| `bounce-out-ease-half` | `bounceOutEaseHalf` | analytic | easing.d.ts:44 | half bounce out |
| `bounce-in-out-ease` | `bounceInOutEase` | analytic | easing.d.ts:45 | bounce both ends |

### 1I — Steps (3) — the parametric generator + 2 keywords
| display | kind | signature | desc |
|---|---|---|---|
| `steps(n, term)` | step | `steppedEase(steps:number, jumpTerm?)` — **PARAMETERIZED GENERATOR**. `jumpTerm ∈ {jump-start, jump-end, jump-none, jump-both, start, end, both}` (`jumpTerms`, easing.d.ts:55) | discrete jumps |
| `step-start` | step | `stepStart()` = `steppedEase(1,"jump-start")` | jump at start |
| `step-end` | step | `stepEnd()` = `steppedEase(1,"jump-end")` | jump at end |

### 1J — Custom (1) — the live editable bezier
| display | kind | signature | desc |
|---|---|---|---|
| `cubic-bezier(x1,y1,x2,y2)` | bezier | `CSSCubicBezier(x1,y1,x2,y2)` — Newton-Raphson `solveCubicBezierX` (easing.d.ts:38–39); any 4 control points the user drags | custom curve |

### 1K — `linear()` multi-stop (1) — CSS Easing L2 (the piecewise form)
| display | kind | signature | desc |
|---|---|---|---|
| `linear(0, .25 75%, 1)` | piecewise | `cssLinear(stops: LinearStop[])` (easing.d.ts:26). Each stop `{output, input?}`. This is the form `springLinearStops`/`springTimingFunction` EMIT and `getTimingFunction` re-parses (the round-trip). **Distinct from the `linear` keyword.** | piecewise-linear timing |

### 1L — Springs (5) — `SPRING_PRESETS` via `springTimingFunction`
The spring surface is a SEPARATE construction (`springTimingFunction(opts) → Easing`
with `.fn` callable + `.css` `linear()` twin; springTimingFunction.ts:65). The
canonical iOS preset names (keyframes demo/spring/springPresets.ts:17 — 4 presets;
glass-ui adds a 5th `--spring-dock`). Each is a `(response, dampingFraction)` pair;
ζ<1 overshoots (interior >1), the WHOLE POINT (springTimingFunction.ts:56–59).
| keyframes name | response | ζ (damping) | blurb (keyframes copy) | glass-ui token |
|---|---|---|---|---|
| `smooth` | 0.5 | 0.86 | iOS default — settles without ringing | `--spring-smooth` |
| `snappy` | 0.35 | 0.65 | quick with a touch of overshoot | `--spring-snappy` |
| `bouncy` | 0.5 | 0.45 | pronounced overshoot, playful ring (peaks ≈1.205) | `--spring-bouncy` |
| `gentle` | 0.7 | 1.0 | critically damped — slow, no overshoot | `--spring-gentle` |
| (glass-ui only) `dock` | 0.32 | 0.7 | the dock morph register | `--spring-dock` |

**CANON COUNT (the StructuredOutput `canonCount`): 42.**
Breakdown: Standard 5 + Sine 3 + Quad 3 + Cubic 4 + Expo 3 + Circ 3 + Back 3 +
Bounce 6 + Steps 3 + Custom 1 + linear() 1 + Springs 5 = **42**. (Counting DISTINCT
curves; the camel/hyphen dual keys are aliases of ONE curve. The 5th spring
`--spring-dock` is a glass-ui addition the gallery legitimately carries — it is in
the count because it is in the gallery's isomorphism target as the demo presents
its own springs. If the orchestrator wants the STRICT keyframes-only count, it is
41 — drop `--spring-dock`; if it wants the keyframes-4-springs count, 41; the
gallery target is 42 incl. the dock spring.)

---

## §2 — THE PRESENTATION IDIOM (how keyframes presents its curves)

Read from `demo/easing/EasingTarget.vue`, `EasingHeroStage.vue`, `EasingSidebar.vue`,
`demo/spring/SpringTarget.vue`, `SpringSidebar.vue`, `easingGroups.ts`, DESIGN.md.
The idiom RE-EXPRESSES in the glass idiom (tailwind-first) — these are the
transferable PRINCIPLES, not CSS to paste.

### IDIOM-1 — The curve IS the protagonist; everything else recedes.
The keyframes stage is a single large glass `<Card tier="resting" surface="glass">`
(EasingTarget.vue:14) with ONE big engine-driven ball + the projected ghost curve.
The CURVE and the MOTION are the content; chrome is minimal (EasingSidebar.vue
header comment: "the curve IS the subject", J5 "controls carry no big per-scene
title"). Implication for the gallery: the plot is not a thumbnail in a busy card —
it is the hero element of each cell, sized + weighted to read.

### IDIOM-2 — Stroke weight: BOLD, with presence (the R7-2 target).
- The projected stage curve: `stroke-width: 3px` + `vector-effect: non-scaling-stroke`
  + `stroke-linecap: round` (EasingHeroStage.vue:147–149). It runs at 8% opacity
  ONLY because it is a GHOST behind the live ball — the SHAPE is 3px.
- The editable canvas curve (the focal one): `stroke-width: 0.035` in a `0 0 1 1`
  unit viewBox = **3.5% of the canvas height** → on a ~300px canvas ≈ **10.5px**
  apparent stroke. That is the "bold stroke with presence" register.
- **Principle: the curve stroke is a CONFIDENT line (≥3px on a thumbnail plot,
  ~8–11px-apparent on a hero canvas), `non-scaling-stroke` so a unit-viewBox path
  keeps a fixed device stroke, `linecap:round`/`linejoin:round` for the smooth read.**
  The glass-ui BezierEditor ALREADY does this right (`stroke-width="0.035"` unit =
  ~10px apparent, BezierEditor.vue:187) — the GALLERY THUMBNAIL plots are the
  regression (1.75px in a 120×64 px viewBox).

### IDIOM-3 — Two altitudes: hero/protagonist vs. comparison-list.
The keyframes view-mode select (EasingTarget.vue:60–84) toggles `singular` (ONE
big hero ball + projected curve) vs. a `family` / `all` comparison list (many
`.track-row`s, each a labeled rail with a racing dot, EasingTarget.vue:104–135).
The comparison rows are a SCROLLABLE list at an optical max-measure (`max-w-3xl`),
NOT a grid of equal cards. The active curve's label + ball wear the scene accent;
the muted curves drop to 20% presence + no glow (EasingTarget.vue:404–428). The
hierarchy (active > muted) is LEGIBLE.

### IDIOM-4 — The live readout is a confident number, not a caption.
The eased `f(t)` value rides the published `AnimatedDigit` (damped tabular-nums) at
the mono-prose rung wearing the scene accent; the `f(t)=` label stays small + muted
(EasingTarget.vue:36–46). Spring promotes x/v to `MetricBadge size="xl"/"lg"`
wearing the tone (SpringTarget.vue:31–45). **The NUMBER wins; the label recedes.**

### IDIOM-5 — ONE scene color, declared as a token seam.
Each scene binds ONE `--ball-tone` (easing → `--rainbow-violet`, EasingTarget.vue:374;
spring → `--color-progress` green, SpringTarget.vue:185) and the rail/ball/readout/
active-label all read it. ONE color event per scene (the glass-ui one-color-event
rule's direct ancestor). The motion family's `--motion-accent` purple is the exact
glass-ui twin — thick strokes in it ARE the point (the audit's hard fence).

### IDIOM-6 — The picker is a SELECT or a real tab strip, sized as IA — never a chip row.
The keyframes view-mode picker is a real glass `<SelectTrigger size="sm">` dropdown
with `glass-wash` fill + `rounded-pill` + governed `text-dropdown` (14px) + animated
chevron (EasingTarget.vue:48–84). The header comment is explicit: a prior bare
dock-tier trigger "read as bare text" and was REPLACED by the idiomatic glass
select. The spring panel uses `<SegmentedTabs variant="segmented">` for the
view-fork + `variant="underline"` for the artifact sub-fork (SpringSidebar.vue:29,
110) — the segmented register for a primary switch, underline for a sub-section
fork. **Principle: the family selector is first-class IA chrome (a proper-scale
segmented/underline strip OR a select), the families ARE the navigation — not a
cramped afterthought row of tiny pills.**

### IDIOM-7 — The coordinate frame is part of the language.
Plots/rails carry a graph field: gridlines at 0.25/0.5/0.75 + a t-axis baseline in
the `--border` hairline treatment (`.stage-field-y`/`.stage-field-x`,
EasingHeroStage.vue:39, SpringTarget.vue:62). The projected curve reads against the
SAME graph language as the editor. A curve plotted without its 0/1 frame floats.

### IDIOM-8 — The dot is driven by the REAL twin, off the render graph.
Every dot is positioned by a DIRECT non-reactive `style.transform`/`style.left`
write inside the rAF loop (a registered painter), NOT a per-frame reactive `:style`
(EasingTarget.vue:299–308; the "243-node SVG re-render storm is gone"). The
gallery's `play()` already does this (curve-gallery.vue:64–80) — KEEP it.

### IDIOM-9 — Naming: the hyphenated registry key, as-cased, mono.
Labels are the registry name in mono caption, `text-transform: none` so
`easeInOutQuad`/`ease-out-back` read as-cased (EasingTarget.vue:416–422). The
family grouping IS `EASING_GROUPS` (Standard/Sine/Quad/Cubic/Expo/Circ/Back/
Bounce/Steps/Custom) — the same 10-family taxonomy the gallery already mirrors.

### IDIOM-10 — Interaction: scrub/drag/play; the curve responds live.
Spring rail is drag-to-reseat (`role="slider"` + keyboard, SpringTarget.vue:64–72);
the bezier canvas is drag-the-handles (EasingSidebar editor); a double-click runs a
self-playing "gallery tour" through expressive curves (useEasingGallery.ts). Play
fires the dot off the live twin. The interaction makes the curve's SHAPE felt.

---

## §3 — THE GALLERY CENSUS (current state, diffed against §1)

Current surface: `curve-gallery.vue` (the family-tab picker + the card grid + the
doctrine table) + `curve-families.ts` (the `CURVE_FAMILIES` data) + `BezierEditor.vue`
(the Custom family). Family-by-family GAP MATRIX against the §1 canon.

### What the gallery carries TODAY (curve-families.ts):
| family | rows present | stroke (curve-gallery.vue) |
|---|---|---|
| Standard | 9: `--spring-smooth/-snappy/-bouncy/-gentle/-dock` (springs) + `--motion-ease-standard/-out/-in` (bezier cores) + `linear` | `stroke-width="1.75"` :166 |
| Sine | 3: easeInSine/easeOutSine/easeInOutSine | 1.75 |
| Quad | 3: easeIn/Out/InOutQuad | 1.75 |
| Cubic | 3: easeIn/Out/InOutCubic | 1.75 |
| Expo | 3: easeIn/Out/InOutExpo | 1.75 |
| Circ | 3: easeIn/Out/InOutCirc | 1.75 |
| Back | 3: ease-in/out/in-out-back (via `CSSCubicBezier(...bezierPresets)`) | 1.75 |
| Bounce | 6: easeInBounce + 5 bounce*Ease siblings | 1.75 |
| Steps | 3: `steps(4,end)` + step-start + step-end | 1.75 |
| Custom | live BezierEditor (drag, dropdown seeds bezierPresets) | `0.035` unit :187 |

### GAP MATRIX (canon §1 → gallery):
| # | canon item | gallery status | gap class |
|---|---|---|---|
| G1 | `ease` / `ease-in` / `ease-out` / `ease-in-out` (the 4 STANDARD bezier keywords) | **MISSING** from Standard. Gallery's "Standard" carries the glass-ui `--motion-ease-*` tokens (Material `[.4,0,.2,1]` etc.) NOT the CSS `ease`/`ease-in`/`ease-out`/`ease-in-out` keywords (`[.25,.1,.25,1]`/`[.42,0,1,1]`/…). DIFFERENT curves. | **MISSING (4)** |
| G2 | `smooth-step-3` (Cubic family) | **MISSING.** keyframes groups `smooth-step-3` under Cubic (easingGroups.ts:61). Gallery Cubic has only the 3 easeInOut. | **MISSING (1)** |
| G3 | `linear()` multi-stop (CSS Easing L2 piecewise) | **MISSING.** The `cssLinear` form is the spring's emitted artifact + a first-class easing kind; no row demonstrates it. | **MISSING (1)** |
| G4 | Standard family naming | **MISGROUPED.** The 5 SPRING presets live under "Standard" (curve-families.ts:121–126). keyframes has NO springs in EASING_GROUPS — springs are a SEPARATE surface (demo/spring/*). Mixing iOS springs into "Standard" easing diverges from the canon IA (springs deserve their own family/section). | **MISGROUPED (5)** |
| G5 | Back items named `ease-in-back` etc. | PRESENT + correctly sourced (bezierPresets). **Naming OK.** No gap. | OK |
| G6 | Bounce `ease-in-bounce` | PRESENT as `easeInBounce` (camel). keyframes display name is hyphen `ease-in-bounce`. **MISNAMED** (camel vs canon-hyphen). Same curve, wrong register-name. | **MISNAMED (1)** |
| G7 | Steps `steps(n, term)` parameterization | PARTIAL. Gallery hard-codes `steps(4, end)` only (curve-families.ts:115). The canon `steps` is a GENERATOR over n + 7 jump-terms; no live n/term control (keyframes EasingSidebar exposes both, EasingSidebar.vue:54–73). | **PARTIAL (1)** |
| G8 | All analytic families named camelCase (`easeInSine`…) | **MISNAMED.** keyframes displays HYPHEN (`ease-in-sine`); the gallery uses camel `easeInSine` (curve-families.ts:137). Same curves, divergent display register from the canon. (Cosmetic but an isomorphism miss — the canon names are the hyphen keys.) | **MISNAMED (~24)** |
| G9 | Spring naming | Gallery names springs by glass-ui TOKEN (`--spring-smooth`). keyframes names by FEEL (`smooth`/`snappy`/`bouncy`/`gentle`). Both legitimate; note the divergence for the spec to reconcile (token-name vs feel-name). | NOTE |

**Present-and-correct:** the 15 analytic ease* (Sine/Quad/Cubic/Expo/Circ, minus
smoothStep3), the 3 Back, the 6 Bounce, the 3 Steps keywords, the live Custom
bezier, the 5 springs (curves present, family-placement aside), the bezier cores.
The TWIN SOURCING is correct + binding (curve-families.ts:1–55 documents it: springs
via `MOTION_CURVES`, analytic via `curves.ts` re-export, Back via `bezierPresets`,
Bounce/Steps direct from value.js — the REAL twins, no hand-rolled samplers). KEEP.

**GAP COUNT (the StructuredOutput `gapCount`): 8** — the distinct defect classes
G1–G8 (G9 is a reconcile-note, not a defect). By missing/misrepresented ITEMS:
4 (G1) + 1 (G2) + 1 (G3) MISSING = **6 missing items**; 5 (G4) misgrouped springs;
1 (G6) + ~24 (G8) misnamed; 1 (G7) partial. The headline `gapCount=8` is the
defect-class count the spec acts on; the item-level tallies are in the matrix.

---

## §4 — THE REGISTER DIAGNOSIS (file:line root causes for R7-1/-2/-3)

### R7-1 — THE REGISTER (grey-on-grey, dark/washed). ROOT CAUSES:

**RC-1a (the BUG — undefined token reads → transparent paint).** The gallery reads
`--surface-tint-1` and `--surface-tint-2`, but the token ladder **starts at
`--surface-tint-4`** (color-radius.css:112). `--surface-tint-1`/`-2` are **NOT
DEFINED anywhere** in `src/styles/`. Live probe (chrome-devtools, :5199):
`var(--surface-tint-1)` → `rgba(0,0,0,0)`, `var(--surface-tint-2)` → `rgba(0,0,0,0)`
(both FULLY TRANSPARENT). `var(--surface-tint-4)` → `color(srgb 0.11 0.098 0.09 / 0.04)`
(paints correctly). So EVERY backplate keyed off `-1`/`-2` paints NOTHING:
- the kind-pill tints — curve-gallery.vue:91–94 (`KIND_TINT`, all 4 read `-1`/`-2`);
- the dot-rail background — curve-gallery.vue:172 (`bg-[var(--surface-tint-1)]`);
- the doctrine table header — curve-gallery.vue:191 (`bg-[var(--surface-tint-1)]`).
The pills/rails/header have NO surface → text floats on the bare card → the
"washed" read. **FIX: re-point to defined rungs (`--surface-tint-6`/`-8`/`-10`/`-12`)
OR use the glass tier tokens; the `-1`/`-2` names are dead.**

**RC-1b (the page substrate is transparent + the card is a low-opacity grey
glass).** Live probe: `main`/page background = `rgba(0,0,0,0)` (transparent — no
page-level rich substrate); the curve card `.glass-card` bg = `oklab(0.729 … / 0.6)`
(a 60%-opacity warm-grey) over `blur(10px) saturate(1.05)`. With NOTHING rich
behind (the page bg is bare), the glass blur is imperceptible (CLAUDE.md glass-first
canon: "the blur is imperceptible over a flat substrate") and the card reads as a
flat 60% grey panel on a flat ground — **grey-on-grey by construction.** This is the
exact W54/W60 split: W54 lays the glass default, W60 consumes it with a rich
per-page background. The motion band has NO hero/page substrate, so the glass has
nothing to POP against. **FIX direction: give the page a calm rich substrate within
the W-SUFFUSE one-GL-budget fence (a blueprint-grid/paper-grain wash + the
`--motion-accent` accent — NOT another aurora/GL context), and/or lift the card
tier so it reads against the ground.**

**RC-1c (the muted body register — the R7-1 muted read).** Curve-card metadata is
`text-muted-foreground` (curve-gallery.vue:155–156, the `jsName` + `note`), the kind
pills for bezier/analytic are `text-muted-foreground` (curve-gallery.vue:92–93), the
family blurb is `text-muted-foreground` (curve-gallery.vue:122), the doctrine
easing-cells are `text-muted-foreground` (curve-gallery.vue:199). `--muted-foreground`
is L40 — low-contrast over a translucent grey plate (CLAUDE.md adaptive-glass:
"the muted body register CANNOT clear 4.5:1 on a translucent darkened plate"). The
whole pane reads muted because most ink IS muted. **FIX: lift the load-bearing copy
to `--foreground`; reserve muted for genuine captions; let the `--motion-accent` carry
the ONE color event with presence.**

### R7-2 — THE STROKE (~1.5px hairlines). ROOT CAUSE:
The thumbnail plot polyline is `stroke-width="1.75"` (curve-gallery.vue:166) in a
`0 0 120 64` px viewBox at `h-16 w-full` render → live probe confirms computed
`strokeWidth: 1.75px`. That is the ~1.5px hairline the audit names. Contrast: the
keyframes ghost curve is 3px non-scaling (EasingHeroStage.vue:147), the bezier
canvas is `0.035` unit ≈ 10px apparent (BezierEditor.vue:187). The gallery thumbnail
is **2× too thin**, and being in a PX viewBox it does NOT use `non-scaling-stroke`,
so it is not even pinned. **Secondary stroke issue — the plot is VERTICALLY FLAT:**
`plotPoints` (curve-gallery.vue:42–53) maps y over only `PLOT_H-20 = 44px` of a 64px
box, and the axis lines eat the top/bottom (`:166` at y=PLOT_H-8=56, `:161` at y=12),
so the curve's vertical excursion is cramped → the shape barely articulates even
before the thin stroke. **FIX: stroke-width ≥3 (or `vector-effect:non-scaling-stroke`
+ a thicker unit width), `linejoin/linecap: round`, a taller/cleaner plot box with
the curve using the full vertical range + a real 0/1 coordinate frame (IDIOM-7).**

### R7-3 — THE PICKER (cramped tiny-chip row, "awful"). ROOT CAUSE:
The family selector is `<SegmentedTabs variant="pill" :options="FAMILY_TABS">`
(curve-gallery.vue:114–119) — 11 options (10 families + Custom) crammed into ONE
`pill`-variant strip. Live probe: each tab is 14px font, `4px 12px` padding, **28px
tall** — a tight row of 11 small pills (visible in the before-capture as the cramped
"Standard Sine Quad Cubic Expo Circ Back Bounce Steps Custom" bar). The `pill`
variant is the wrong register for 11-way primary IA navigation (it is the
solid-foreground compact toggle register). **FIX (which house register SHOULD carry
it):**
- The families are the **primary IA** of the page (IDIOM-6). The canonical
  panel-nav register is `<SegmentedTabs variant="underline">` (CLAUDE.md: underline
  = `role="tablist"` panel-nav, the mutually-exclusive PANEL case — exactly this:
  picking a family swaps the visible curve set). The underline strip at a proper
  scale (the `text-subheading`/section rung, generous padding) reads as navigation,
  not a chip afterthought.
- OR, below a breakpoint, `<SegmentedTabs :responsive>` collapses the 11-way strip
  to a `<Select>` (CLAUDE.md SegmentedTabs `:responsive` — the keyframes idiom's
  glass `<SelectTrigger>` exactly, IDIOM-6). The keyframes view-mode picker IS a
  select; the responsive-collapse gives the same affordance on narrow widths.
- The picker should sit at the **hierarchy section rung** (CLAUDE.md W-HIERARCHY:
  `--configurator-section-size` = `--type-subheading` 20.4px/600; or the
  `<StorySection heading>` `text-subheading` rung), so the family IS a heading-scale
  control, with the active family's blurb at body rung beneath it — the families as
  IA, not an afterthought.

### Which house registers SHOULD carry the redress (synthesis for the spec):
1. **Picker → `<SegmentedTabs variant="underline">`** at the section-heading rung
   (panel-nav register; `:responsive`→`<Select>` on narrow), the families as primary IA.
2. **Hierarchy rungs (W-HIERARCHY)** → the family name/heading at `text-subheading`
   (20.4px/600 via `<StorySection heading>` or `--configurator-section-size`); the
   curve `name` at the row-label rung; the `jsName`/`note` at the mono caption rung —
   the THREE NAMED registers, not flat muted text.
2. **The one-color-event with `--motion-accent`** (W-SUFFUSE): the purple is the
   band's ONE event; the THICK stroke in it IS the point (the audit's fence). The
   plot stroke + driven dot + active-family accent all read `--motion-accent` at
   presence; the body ink stays `--foreground`/muted untinted (the one-color-event
   floor: body ink untinted, ≤1 tinted family per surface).
3. **The calm rich substrate (W-SUFFUSE calm idiom)** for the page register: a
   blueprint-grid/paper-grain wash + a `<StoryHero>` thin-tier card so the grid
   reads through (the `math-paper.vue` gold standard) — NOT another GL context (the
   one-GL-per-route fence). This is what gives the glass something to pop against and
   kills the grey-on-grey.
4. **The keyframes stroke idiom** for the plots: `non-scaling-stroke` + `linecap/join:
   round` + a confident ≥3px (thumbnail) / ~8–11px-apparent (any hero canvas) width;
   the BezierEditor already models it (KEEP its `0.035` unit register).

---

## §5 — Hard-fence compliance (binding constraints the spec MUST honor)
- `--motion-accent` (= `--viz-legendre` violet) stays **DEMO-LOCAL** (demo.css:101);
  NEVER a library token. The purple is the band's ONE event; thick strokes in it ARE
  the point. ✓ (already demo-local).
- One-color-event rule holds: body ink untinted, chip ≤ icon scale, ≤1 tinted family
  per surface. The redress lifts muted→foreground (presence) but adds NO second hue.
- Tailwind-first: any keyframes reference re-expresses via `@theme`/`@utility` +
  token custom-properties — never pasted raw (BezierEditor.vue is the model port).
- PRM-gate every animation (the `play`/`playAll` rAF + any squish). The demo's
  `@container style(--demo-reduce-motion)` bucket (demo.css) + system PRM govern.
- Port discipline: :5199 is the gate demo (UP, confirmed live). The user audits
  :5210 — leave it. NEVER :5173.
- The REAL-twin sourcing is binding + correct (curve-families.ts:1–55) — the redress
  is REGISTER/IA/STROKE/COMPLETENESS, NOT a twin re-source. KEEP the twin discipline.

---

## §6 — Live-capture evidence (grounding the diagnosis)
- Before-state: `docs/tranches/AZ/audit/ground/R7-curve-gallery-before.png` confirms
  every read — grey cards on a grey page, the picker a cramped 11-pill row, the
  curve strokes thin/barely-violet, the dot-rails invisible.
- Live probe (chrome-devtools, :5199/motion/curve-gallery):
  - `--surface-tint-1` → `rgba(0,0,0,0)`, `--surface-tint-2` → `rgba(0,0,0,0)` (UNDEFINED → transparent); `--surface-tint-4` → `srgb 0.11 0.098 0.09 / 0.04` (defined).
  - curve `polyline` computed `stroke-width: 1.75px`, `stroke: oklch(0.532 0.18 317.5)` (the violet).
  - `.glass-card` bg `oklab(0.729 … / 0.6)`, `backdrop-filter: blur(10px) saturate(1.05) brightness(1.02)`; page/`main` bg `rgba(0,0,0,0)` (no rich substrate).
  - family tab: `font-size 14px`, `padding 4px 12px`, height `28px` (cramped pill row).
  - `--motion-accent` resolves `light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1))` (the violet twin, demo-local). ✓
