# W-EASING-PRIMITIVE — DELTA (the published `<EasingPicker>`/`<EasingConfigurator>` on `/easing`)

## Freshness header (AZ-form)

| field | value |
|---|---|
| capture date | 2026-06-17 |
| HEAD sha (pre-wave) | `6840a643` (tranche/BB) |
| route | `/motion/curve-gallery` (consumer #1) |
| modes | light + dark |
| viewports | desktop 1280×900 + coarse-touch (the π runner's two projects) |
| binding π | `tests-visual/easing-primitive.spec.ts` (P1–P4) — the whole-fleet live capture rides W-REFLECT3 |
| gate | `proof:easing-primitive` (born-RED → GREEN; W1–W5 device-free; W6 π; W7 ba-gestalt motion-band) |

## The fold (the C-3 fold LANDED — BUILT, not re-booked)

The motion family shipped TWO live curve editors, each a DEMO-ONLY interim that named
this wave as its successor verbatim (`StepsEditor.vue:9-18`, `BezierEditor.vue:1-11`).
They were the two halves of ONE missing primitive. This wave mints the ONE published
`<EasingPicker>` (the bezier + steps modes unified on one engine) + the chassis-seated
`<EasingConfigurator>` register, publishes them on `/easing`, and RE-HOMES the two demo
editors onto it (the two demo SFCs DELETED — clean break, no alias). The kf donor
(`EasingEditor`/`EasingCurveCanvas`) stays in the kf demo (the cross-repo fence); its
factored props-in/events-out, state-shape-agnostic shape is the design reference.

## The boundary law (the recorded fence — kf-AFFIRMED at `KF-TO-GLASSUI-BB-ASKS.md:48`)

curve **MATH = value.js** · playback/spring = keyframes.js · the editor
**COMPONENT = glass-ui**. `<EasingPicker>` OWNS only the chassis; it COMPOSES its math:

| curve | value.js callable (composed, never re-implemented) |
|---|---|
| bezier | `CSSCubicBezier(x1, y1, x2, y2)` |
| staircase | `steppedEase(n, term)` |
| bezier catalogue | `bezierPresets` |
| jump-term family | `jumpTerms` |

The anti-fork bite (`proof:easing-primitive` W2): zero hand-rolled staircase evaluator
(`Math.floor/ceil(t * steps)`) and zero hand-rolled cubic-bezier Newton-solver
(`solveCubicBezier*`/`newtonRaphson`/`cubicBezier`) inline in `custom/easing/`. The
optional spring-driven dot reads the library's `MOTION_CURVES` table (which composes
keyframes.js `springTimingFunction` + value.js callables) — never a hand-rolled spring.

## The single color event (ppmycota fence held)

The curve strokes `--motion-accent` (the motion family's single color event). The
published-primitive default resolves the library's OWN `--viz-legendre` violet twin
(`var(--motion-accent, var(--viz-legendre))`) when no consumer declares
`--motion-accent` — so the primitive is self-sufficient standalone AND a demo hue
NEVER enters a library token. The π P3 readback asserts the resolved stroke hue lands
in the violet band (oklch 290-350°, the `--viz-legendre` family), both modes, NOT the
warm-red `--viz-fourier` (~30°).

## The π readback (the binding visual truth)

| witness | assertion | result |
|---|---|---|
| P1 | bezier mode plots the REAL `CSSCubicBezier` twin — the plotted path control points == the readout literal's (with the SVG-Y flip), a drag re-samples the live twin | PASS (path `M 0 1 C c1 c2 1 0` matches `cubic-bezier(x1,y1,x2,y2)`) |
| P2 | steps mode plots the REAL `steppedEase(n, term)` staircase — the riser/tread reads at the value.js jump positions, the staircase tops out at t=1 | PASS (sampled staircase reaches SVG-y≈0 at t=1) |
| P3 | the curve strokes `--motion-accent` / `--viz-legendre` (violet 290-350°), both modes | PASS (light + dark) |
| P4 | the readout is the re-parseable literal (`cubic-bezier(…)` / `steps(n, term)`) | PASS (both modes) |

The whole-page motion-band gestalt verdict (W7, `proof:ba-gestalt`) rides W-REFLECT3's
fresh capture — the curve-gallery reads as ONE coherent published-primitive surface
(the picker, the family rack, the static rows speaking one motion-accent language).

## The consumer-#2 contract (the ≥2-consumer bar — recorded by name, NOT silently assumed)

- **Consumer #1 (in-repo, wired at HEAD):** the curve-gallery (`demo/stories/motion/curve-gallery.vue`)
  binds `<EasingPicker mode="bezier">` (the Custom family) AND `<EasingPicker mode="steps">`
  (the Steps family) — TWO live in-repo bindings, so the ≥2-consumer bar does not hang on
  the cross-repo consumer alone (the mode-level bar is met in-repo).
- **Consumer #2 (cross-repo, by-name CONSUME contract — the foreign-tree fence HOLDS):**
  value.js's `GradientPane` (`value.js/demo/@/components/custom/panes/GradientPane.vue`,
  confirmed at value.js HEAD `0.13.0`). It delegates to `GradientVisualizer` which authors
  "gradients with per-interval easing and CSS output" — the ease-along-the-ramp axis that
  wants `<EasingPicker>`. value.js consumes the published picker on its next pin bump (the
  `W-CROSSREPO-ASKS` content-only relay). **This wave does NOT edit value.js** (the
  bidirectional foreign-tree fence, `EXECUTION-DAG.md §7-fences`).

## The kf `Oscillator` co-schedule (named-successor consume, NOT a blocking dep)

keyframes.js books a LIGHT `Oscillator`/phase-clock primitive (`KF-TO-GLASSUI-BB-ASKS.md:47`)
that slots into the picker's `loop` playback seam (the `playTravel`/`progress` rAF) when it
ships — the idle-breath periodic phase the travelling-dot loop drives off. The picker's
DEFAULT playback is the existing one-shot `rAF` travel (shipped at 4.1.0); the loop is the
kf-consume successor. NOT a blocking dependency for the cut.

## §0 RE-GROUND drift (recorded)

- `CLAUDE.md`'s `src/` structure references a `custom/index.ts` aggregate barrel
  (File-Bounds row "modify `src/components/custom/index.ts`"), but at HEAD there is NO
  `src/components/custom/index.ts` — the custom dirs reach consumers ONLY via their per-
  family subpath barrels (`src/subpaths/*.ts`) + cherry-picks on the root barrel. The
  publication mechanism for `/easing` is therefore the subpath barrel (`src/subpaths/easing.ts`)
  + the `package.json` `./easing` export + the `api/index.ts` type publication — exactly the
  `/color-swatch` / `/motion-curves` precedent. The non-existent `custom/index.ts` edit is a
  recorded no-op (the value.js-BEARING `/easing` leaf is correctly OFF the root barrel — the
  SCC-trap discipline; only the subpath carries it).
- `value.js/src/easing.ts` HEAD confirms `CSSCubicBezier` (`:164`), `jumpTerms` (`:266`),
  `steppedEase` (`:293`), `stepStart`/`stepEnd` (`:312`/`:316`), `bezierPresets` (`:334`) —
  all SHIPPED at `0.13.0`. `steppedEase` returns `((t)=>number) | undefined` (the switch has
  no default); the composable carries a total `?? ((t)=>t)` fallback (never reached — the
  dropdown is closed over `jumpTerms`).
- `BezierEditor.vue` imported `CSSCubicBezier` from `src/composables/motion/curves` (the
  re-export), `StepsEditor.vue` imported `steppedEase`/`jumpTerms` directly from
  `@mkbabb/value.js`. The published composable imports the FOUR callables directly from
  `@mkbabb/value.js` (one source).

## Born-RED → GREEN log (`proof:easing-primitive`)

| witness | born-RED (HEAD pre-wave) | GREEN (at close) |
|---|---|---|
| W1 primitive exists ONCE on /easing | RED — `src/components/custom/easing/` absent, no `./easing` export, no subpath | GREEN — dir + composable + constants + README + subpath barrel + `./easing` export + typesVersions row (the export/typesVersions delta returned to the orchestrator; `package.json` is the sequenced shared file) |
| W2 boundary law (math COMPOSED) | (vacuous — no primitive) | GREEN — `useEasingPicker` composes the 4 value.js callables; zero inline staircase/bezier-solver fork |
| W3 no fourth fork (demos re-homed) | RED — both demo SFCs exist, curve-gallery imports them | GREEN — both demo SFCs DELETED, curve-gallery imports `<EasingPicker>` from `src/components/custom/easing`, zero `*Editor.vue` under the curve-gallery dir |
| W4 ≥2-consumer bar recorded | RED — no primitive | GREEN — curve-gallery binds bezier + steps; PROGRESS + this DELTA record the value.js `GradientPane` consumer-#2 |
| W5 canon + boundary law recorded | RED — no section/idiom/api line | GREEN — CLAUDE.md `<EasingPicker>` motion-canon section + boundary law; design-idioms §11 editor-on-Configurator; api/index.ts publishes the types |
