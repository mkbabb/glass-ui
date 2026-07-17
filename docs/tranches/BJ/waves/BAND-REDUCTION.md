# BJ Band — REDUCTION (registry family C · the ruthless purge · F04/F18/F25/F26/F30/F32/F33/F42/F44/F45/A05/A14)

**Status:** DRAFT — for the Fable two-challenge pass. Every unsettled judgment is an
`OPEN:` marker below; resolve before execution.
**Mode:** TRANCHE-DEVELOPMENT. This band writes ONLY this doc plus the sibling
`../ASK-REDUCTION.md`; no source changes until execution.
**Family:** C — surface-reduction. Verdict (round-1): *73% of bespoke props (298/408) have ≤1
setter; 140 are never set anywhere; 20 components carry ≥6; the only "standing" overfit gate does
not run in the current tree.* The user's F04 order: "This shape is to be abrogated — simplify
components to better, more opinionated defaults; KISS. A grand audit of ALL components with
**questions in reduction relayed to the user**."
**Census truth sources:**
- `../formation/round-1/component-surface---overfit-census.md` (15 findings — the overfit table, every prop count)
- `../formation/round-1/consumer-truth---component-DAG.md` (the reduction inventory + the mis-provenanced deletes)
- `../formation/round-2/adversarial-verification-of-round-1-consumer-truth-component.md` (the CORRECTED per-repo break table — the Q060 roster truth)
- `../formation/round-1/dead-code-and-dual-paths.md` (fourier presets.ts, the dead barrels, useStagger)
- `../formation/round-2c/chronic-decided-draft.md` (the UF-K1 third-ask disease row + Q051 R12/R14/R16)
- `../FEEDBACK-LEDGER.md` rows F04/F16/F18/F25/F26/F30/F32/F33/F42/F44/F45, A05/A14

## Band framing — READ FIRST (honest gate posture)

Reduction splits cleanly into **three DELTA classes**, and the gate posture is honest to each —
do NOT dress one as another (this is the same discipline BAND-COLOCATION carries):

1. **Dead-config cuts are null-DELTA.** A prop with ZERO consumer setters, when removed, changes
   NOT ONE rendered pixel — the value was never set, so it always resolved to its default. The
   affirmative proof is a **paint null-DELTA** (a component's stories render byte-identically
   across the cut) plus a **public-surface diff** (the removed props/exports leave the type
   surface). The single born-RED differential for this class is a **static dead-config scan**
   (family A's proposed prop-granularity check): it reds on the enumerated 0-setter props at HEAD
   and greens when they are gone. That is a *surface-hygiene* RED→GREEN, not a visual-defect one —
   say so plainly.
2. **Card's default-neutralization is a REAL visual DELTA.** `Card` defaults to `metal: "gold"` +
   `grain: true` at HEAD (`Card.vue:38,33`); every one of the ~28 `<Card>` instances that relies
   on defaults renders gold-metal + grain TODAY. Neutralizing the default paints differently — a
   genuine π/DELTA is owed, and the born-RED gate is a real paint probe on the F04 shape. This is
   the ONE wave in the band that owes a before/after screenshot pair.
3. **Deletes/relocations are intentional-surface DELTA.** Dropping a public export or demoting a
   component to `demo/` is an *intended, ruling-gated* break, not a born-RED defect. The record is
   the `public-surface.spec.ts` diff. The ONE genuine born-RED inside this class is the *dead code*
   (`fourier-field/presets.ts`, 0 importers) — a reach probe reds on it TODAY.

**The consumer-truth discipline (the header-ribbon lesson).** In-repo probes are structurally
blind to undeclared sibling consumers. Round-1 called `header-ribbon` a "prime delete"; round-2
REFUTED it — keyframes.js `EditorShell.vue:116` imports it and `MIGRATION.md:115` marks it KEPT.
So **no deletion or prop-cut in this band executes until the family-B constellation sibling-import
census clears the subpath.** Every cross-repo obligation cited below is the round-2 corrected
truth, not round-1's.

## Scope of the band (in / out)

**In:** the dead-config prop cuts (Typewriter, GlassDock, Slider, Labeled\*, Progress,
AnimatedDigit, WatercolorDot); Card's axis-collapse + neutral defaults; the clean deletes
(`fourier-field/presets.ts`, `liquid-grid`, `Configurator`→demo, `easing`→demo, the `compositions`
demo section, `useStagger`); the cross-repo-gated removals (instrument-chassis, metric, completion-
seal — as ASK-gated relays, NOT blind deletes); and the F16 timeline ground-up stub.

**Out (cross-band — do NOT own here):**
- **The 5 dead aggregation barrels** (`composables/index.ts`, `glass/wave/index.ts`,
  `glass/webgpu/index.ts`, `sortable-list/composables/index.ts`, `typewriter/composables/index.ts`).
  `dead-code-and-dual-paths.md` lists them, but **BAND-COLOCATION Wave 1 (Purge D / G-BARREL-REACH)
  already owns them** as its one born-RED differential. `OPEN:` single-owner arbitration — the
  charter named "dead barrels" for this band, but COLOCATION drafted the gate first; recommend
  COLOCATION keeps them (the wave-move for `glass/wave/index.ts` and the barrel-delete are the same
  action there) and this band cites it. Do NOT double-delete.
- **The four family-G greenfields** — `HandMark` (F34-F40), `FourierField`/`Constellation` physics
  (A14 procedural umbrella), and `DialogContent`'s `stage` axis (coupled to the GRADED-BACKDROP
  adopt-or-retire freeze, family G/I). Reducing their props in isolation is wasted work the
  greenfield/freeze redoes. This band **defines the target surface** and hands DELIVERY to the
  owning band (§ Wave 1 handoffs); it does not cut them here.
- **The chip/glass-atom orphan** (`css-partial-orphaned-by-component-fold`) — a family-G born-RED
  fix wave, not a reduction. Out.
- **The 7 genuinely-ambiguous kill/keep/merge calls** — DataTable, FourierField-keep, Constellation-
  keep, deck-vs-carousel, confirm-dialog-vs-dialog, reveal/scroll/tempo, compositions-category.
  These go to **`../ASK-REDUCTION.md`** (the user-gated document), not a wave. The waves here
  execute only the DECIDED reductions; the ASK carries what the drafter cannot settle.

---

## Wave 1 — BJ.W-REDUCE-PROPDIET · the dead-config prop cut (null-DELTA)

**Status:** DRAFT
**Terminal owner:** glass-ui orchestrator
**Depends on:** the family-B sibling-import census clearing each affected component's props (a
prop is not a subpath, but a public-component prop removal IS a type-surface break on the bump).

### Mission

Delete the bespoke props that NO consumer sets — the pure F04 "shape to be abrogated" surface —
across the non-greenfielded public components, in one wave, changing ZERO rendered output. Fewest
lines, opinionated defaults, no aliases.

### Exact scope (each cut cites its census count + on-disk verification)

**Typewriter (`./typewriter`) — 20 → ~9.** `TypewriterText.vue:50-89` declares 20 props; 11 are
internal typing-simulation knobs with 0 consumer setters (verified: the only Typewriter consumer
is `demo/stories/motion/typewriter.vue`, and it sets none of them). **Retire:** `ngramSize`,
`variance`, `errorRate`, `firstAnimationSpeedFactor`, `maxCharsBeforeNotice`,
`continueAfterTypoProbability`, `sequentialTypoDecay`, `correctionSpeedMultiplier`, `deletingSpeed`,
`startDelay`, `cursorChar`, `respectReducedMotion` → bury the typo-model behind ONE opinionated
`humanize` default. **Keep:** `text, words, baseSpeed, loop, cursorVisible, cursorBlink,
pauseAfterType, pauseAfterDelete` (the exercised surface). (`OPEN:` `respectReducedMotion` — a11y
band may want it kept as a live escape; recommend keep-if-a11y-claims-it, else fold into the
always-on reduced-motion guard. Coordinate with BAND-A11Y.)

**GlassDock (`./dock`) — retire the dead `position` axis + 3 knobs.** `DockProps` at
`useDockShellProps.ts:9-11` declares `position?: "fixed" | "inline" | "sticky"` (verified line 11);
the census tag-scan over 40 dock instances shows `position`, `autoLuminance`, `containerName`,
`viewTransitionName` = 0 setters. **Retire** all four. The dock is ALSO a family-G greenfield (F47)
— `OPEN:` confirm the greenfield inherits this cut rather than re-deriving it; the 4 dead knobs
should die regardless of the greenfield's shape.

**Slider (`./slider`) — remove `keepDockOpen`.** `slider/types.ts:25` declares `keepDockOpen?:
boolean` (default `true`, `Slider.vue:27`), wired to `useDockHold` at `Slider.vue:97`. Verified:
ZERO `<Slider :keep-dock-open>` setters anywhere (the 20 `keepDockOpen` grep hits are Popover's
OWN live `keepDockOpen` prop + Slider-internal wiring + one contract test — NOT Slider setters).
The prop encodes dock knowledge in a form primitive (leaky-cross-component-coupling). **Retire the
prop**; the dock-hold-on-drag behavior is desirable and always-on, so move it into the dock
context/provide (a `<Slider>` inside a `<GlassDock>` holds via context, no prop). **Blast radius:**
`tests/components/ui/slider/dock-hold-contract.test.ts` asserts the `keepDockOpen` contract —
rewrite it to the context-driven form (the behavior survives, the prop does not).

**Labeled\* (`./labeled-field`) — thin the duplicated field surface.** `labeled-field/types.ts`
declares `requirement`, `layout`, `errorLive`, `invalid` (`:12-18`) that restate the wrapped
control's own axes; the census tag-scan over 14 `LabeledSelect` instances shows 7/12 dead
(`errorLive, invalid, layout, requirement, placeholder, required, disabled` = 0 setters).
**Retire** the duplicated validation/layout props from the wrappers; thin `Labeled*` to
slot-forwarding + label binding. (`OPEN:` `invalid`/`errorLive` may be a11y-load-bearing — the
LabeledField auto `for`/`id` a11y binding is a Q051/CHRONIC FOLD row; coordinate with BAND-A11Y
before cutting the validation surface. Recommend: cut `layout`+`requirement`+`placeholder` cleanly;
gate `invalid`/`errorLive` on the a11y ruling.)

**Progress (`./progress`) — drop the reka passthroughs.** `progress/types.ts` declares
`getValueLabel` + `getValueText` (`:12,:16`) — reka-ui passthroughs with 0 consumer setters.
**Retire both.** **CORRECTION to the census:** round-1 also named `as`/`asChild` as dead Progress
passthroughs — they are NOT present in `progress/types.ts` at HEAD (stale claim; do not chase
them). Only the two `getValue*` callbacks are the live dead surface. (Progress DRY-with-Slider is
F23, a family-F track-family dedup wave — out of scope here; this is only the passthrough cut.)

**AnimatedDigit (`./animated-digit`) — retire the dead physics knobs.** `AnimatedDigit.vue:50-54`
declares `digitCount`, `mode`, `damping` — 0 consumer setters (census). **Retire** to opinionated
defaults.

**WatercolorDot (`./watercolor-dot`) — collapse the variant if single-consumer.** `WatercolorDot.vue:36-40`
carries a `solid | ghost` variant + 5 further bespoke props, mostly single-consumer over 7
instances (census note). **Scope:** retire the dead knobs; keep `solid`/`ghost` ONLY if both are
demoed (verify at execution). `OPEN:` watercolor-dot is a single-EXTERNAL-repo component
(value.js only, round-2 affirmed) — its keep/relocate is an A05 question; if the ASK rules it
relocated, this cut is moot. Coordinate with `../ASK-REDUCTION.md` §B-adjacent.

### Greenfield target-surface handoffs (DEFINED here, DELIVERED by the owning band)

These are the charter-named cuts whose delivery belongs to a greenfield/freeze wave; this band
records the TARGET so the greenfield lands the reduction, not a fresh bloat:

- **HandMark (`./handmark`) — 19 → ~8.** `handmark/types.ts:35-89` declares 19 props (verified);
  the 11 geometry/boil knobs (`overrides, drawMs, drawDelayMs, boilFps, boilFrames, roughness,
  segments, jagged, amplitude, natural, path, points`) have 0 consumer setters. **Target surface:**
  `brush, shape, color, seed, animation, appear, box, drawMs` (≈8). **Delivery:** the family-G
  HandMark greenfield (F34-F40) rebuilds the internals wholesale — it MUST land at this surface.
  This band does not cut HandMark's props in isolation.
- **FourierField `./fourier-field` (5 dead: `color, colorResolver, freeze, intensity, seed`) +
  Constellation `./constellation` (3 dead: `freeze, parallax, speed`)** — the dead knobs retire to
  defaults, but the KEEP-or-CUT of each whole procedural component is an ASK (`../ASK-REDUCTION.md`
  §B). Delivery rides the A14 procedural-codification umbrella.
- **DialogContent `stage` axis (`none|dim|scale|immersive`, `DialogContent.vue:48`)** — collapse
  the visually-duplicative stages is coupled to the GRADED-BACKDROP `--glass-halo-*` freeze
  (family G/I: the experimental cohort landed pre-tag and its adopt/retire is unresolved). **Do not
  cut `stage` here** — it lands with the graded-backdrop adopt/decline ruling.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| **G-DEADPROP-SCAN** | **BORN RED** (surface-hygiene) | a static dead-config scan over the enumerated 0-setter props reds at HEAD (verified: Typewriter 11, GlassDock 4, Slider `keepDockOpen`, Labeled\* 7/12, Progress 2, AnimatedDigit 3, FourierField 5, Constellation 3 — all 0 consumer setters on disk); GREEN after the cut. The band's one lawful RED→GREEN for this class. `OPEN:` build as the family-A prop-granularity gate, or run as a one-time execution differential (gate-ruling substitute). |
| G-PAINT-NULL-DELTA | inert-cut proof | each affected component's story renders byte-identically (paired π) across the cut — the props were never set, so no pixel moves. |
| G-SURFACE-DELTA | intentional type-surface change | `public-surface.spec.ts` / `.test-d.ts` reflect the removed props; the diff IS the record (no alias, clean break). |
| G-TYPECHECK + G-VITEST | refactor-safety | typecheck + full suite green; the rewritten Slider dock-hold-contract test passes in its context-driven form. |
| G-SIBLING-CENSUS | precondition | the family-B census clears each cut component's props against every sibling repo before removal (the header-ribbon lesson). |

### π / DELTA obligation (INVERTED — null-DELTA)

No visual change is claimed. The affirmative proof is a paired-π **null-DELTA** on each affected
component's story (Chrome-current + Safari-current), equal within 0px = PASS. The ONLY component
that could shift is none — every removed prop is a confirmed 0-setter. If any story moves a pixel,
a setter was missed → STOP and re-census.

### KISS / parsimony notes

- Fewest lines: bury magic-number cohorts behind ONE opinionated default (`humanize`), do not
  re-expose them as a nested config object (that is the same surface with extra indirection).
- No aliases, no deprecation shims (no-backwards-compat). A removed prop is removed.
- Gestalt not patchwork: the whole dead-config class dies in ONE wave, not prop-by-prop across
  the tranche.

### Non-goals

- No Card work (Wave 2). No greenfield internals (family G). No `stage`-axis cut (graded-backdrop).
- No new "config object" successor for the buried knobs (that re-inflates the surface).
- No behavior change beyond relocating Slider's dock-hold to context (the hold is preserved).

---

## Wave 2 — BJ.W-REDUCE-CARD · Card axis-collapse + neutral defaults (the ONE real-DELTA)

**Status:** DRAFT
**Terminal owner:** glass-ui orchestrator
**Depends on:** Wave 1 (clean prop-surface) + the family-B census on `./card`.

### Mission

Collapse Card's four overlapping style axes to one and make its defaults NEUTRAL — the direct F04
target ("a general Card defaulting to gold metal + grain-on is the abrogation shape"). This is the
band's one wave that repaints real instances, so it owns a real π/DELTA.

### Exact scope

**The defaults (real DELTA).** `Card.vue:28-41` `withDefaults` ships `grain: true` (`:33`),
`metal: "gold"` (`:38`) — verified on disk. The census tag-scan over 28 `<Card>` instances shows
`metal, grain, grid, deep, specular, dataHueStrength` = 0 setters (DEAD); `variant, selected,
dataHue` set only by `demo/stories/.../card.vue`. **Neutralize:** `metal` default → `"none"` (or
drop the axis, see below); `grain` default → `false`. Every default-relying Card repaints from
gold-grain to neutral glass — the intended F04 correction.

**The axis collapse (null-DELTA where the axes were dead).** Card extends `SurfaceProps` and layers
`variant + material + surface + tier` plus decorative flags. **Collapse to one axis** and **retire**
the dead decorative flags `metal, grid, deep, specular, dataHueStrength` (0 setters → their removal
is null-DELTA; only the DEFAULT change repaints). `OPEN:` the one-axis shape — `variant` alone, or
`variant + surface`? Recommend a single `variant` role-axis (glass | solid | outline | …) resolved
from the census's actual demoed set; the Fable pass fixes the enum. Gate the decorative preset (if
any survives) behind ONE opt-in flag, never an on-by-default.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| **G-CARD-DEFAULT-PAINT** | **BORN RED** (visual) | a paint probe on a default `<Card>` at HEAD shows `metal:gold` + `grain:true` rendered (the F04 shape is LIVE today — verified: `Card.vue:33,38`); GREEN = the default renders neutral glass. This is the band's one real born-RED VISUAL differential. |
| G-AXIS-NULL-DELTA | inert-cut proof | removing the 5 dead decorative flags moves zero pixels (0 setters). |
| G-SURFACE-DELTA | intentional | `public-surface.spec.ts` reflects the collapsed axis + removed flags. |
| G-SIBLING-CENSUS | precondition | family-B census on `./card` — any sibling that sets `metal`/`grain`/the removed flags is relayed a migration ask before the cut. |

### π / DELTA obligation (REAL — owed)

A before/after screenshot pair on `/…/card` and on ≥2 in-the-wild default-Card sites (Chrome +
Safari current), showing the gold-grain→neutral repaint is the INTENDED F04 correction, plus a
paired-π on the still-configured `variant`/`selected` cards proving they are unaffected. This is the
one DELTA the band affirmatively owes.

### KISS / parsimony notes

Opinionated default = neutral, not decorative. The decorative register is opt-in, single-flag, or
gone. One axis, not four overlapping ones.

### Non-goals

- No radius/blur retune (family F owns Card rounding + the F48 blur ladder).
- No Card-vs-glass-panel merge (a separate structural call, not this axis collapse).

---

## Wave 3 — BJ.W-REDUCE-DELETE · the clean deletes + demo-privatizations

**Status:** DRAFT
**Terminal owner:** glass-ui orchestrator
**Depends on:** the family-B sibling-import census clearing each public subpath.

### Mission

Delete the dead code and drop the zero-external-consumer public surface, relocating the two
demo-devices to `demo/` — the reductions that carry no genuine ambiguity (the ambiguous ones are
`../ASK-REDUCTION.md`).

### Exact scope

**Delete `fourier-field/presets.ts` (dead code + presets-in-consumers violation).** Verified: the
file exists (`4548 B`) and has ZERO importers (`grep 'from "./presets"' = 0`; `git log -S` empty).
Its `PRESETS` shape diverges from the live `FourierFieldConfig`/`DEFAULT_FOURIER_CONFIG` in
`constants.ts`, and `demo/stories/substrates/fourier-field.vue` already owns the live variant
bundles (proper presets-in-consumers). **Delete outright** (no-legacy). Born-RED: a reach probe
reds on it at HEAD.

**Drop `./liquid-grid` + retire the component (zero external, zero library consumers).** Verified:
`grep = 0` across all sibling repos (round-2 affirmed) AND zero `src/` library importers.
**CORRECTION to round-1** (which said "only its own story"): `LiquidGrid` is ALSO consumed by the
DEMO chassis — `demo/chassis/hero/StoryHero.vue:6,131` renders it as a full-bleed **suffuse hero
background** (the `kind === 'liquid-grid'` register), with presets at `demo/chassis/hero/suffuse-
preset.ts` + `demo/stories/substrates/presets.ts`. So the delete is clean on the PUBLIC surface but
carries a **demo re-home obligation**: `StoryHero`'s suffuse register + `aurora-hero.ts`'s
`"liquid-grid"` register value must be re-homed onto aurora (which already offers a suffuse mode) or
dropped. **Scope:** drop the `./liquid-grid` export + delete `src/components/liquid-grid/` + **delete the
`demo/stories/substrates/liquid-grid.vue` story page** (it imports `LiquidGrid` at :18 and cannot
compile once the component is gone); re-home the StoryHero suffuse register. **RULED (adjudication
RULING 1):** DELETE wins over fold — this band owns the component + export + STORY-PAGE deletion, and
`BAND-STORY` W1 drops liquid-grid from its fold roster (no `studio`-variant normalize). The StoryHero
suffuse re-home lands HERE too (the delete must not orphan StoryHero); the story band is notified.
(`OPEN:` residual — whether the suffuse register re-homes onto aurora's suffuse mode or drops is a
§Work execution detail, not an ownership question.)

**Demo-privatize `Configurator` (`./configurator`, 382 LOC).** Verified: 382 lines; `activeLayer,
asideWidth, layers` = 0 setters; consumers are the demo shell only (`VizStudio.vue`,
`configurator.vue`). It is a demo-configuration DEVICE on the public surface. **Scope:** move under
`demo/` private helpers (mirroring `demo/composables/virtual/`); drop the `./configurator` export.
`OPEN:` sibling-census must clear `glass-ui/configurator` first (undeclared-consumer risk). If a
named external consumer surfaces, it becomes a family-B relay, not a demo-privatize.

**Demo-privatize `easing` (`./easing`: EasingPicker + EasingConfigurator).** Single-consumer demo
devices (`EasingPicker` `label/playback/readout` = 0 setters; `EasingConfigurator` `preset/steps/
term` = 0 setters). **Coupled to F31** ("properly modularize the easing-curve component") and to the
ASK ("does easing tooling belong on the public surface at all"). **Scope:** if the ASK rules
demo-only, move under `demo/`; drop `./easing`. `OPEN:` this is BOTH a reduction AND F31's
modularization — recommend the F31 curve-gallery redesign (family D/G) owns the component's SHAPE
and this wave owns only the public-surface DROP, gated on the ASK ruling.

**Delete the `compositions` demo section (F43/F44/F45).** The 6 pages
(`demo/stories/compositions/{auth-shell, chassis, empty-states, form-validation, gate-pattern,
settings}.vue`) are demo-only, no src/external consumer. User: "the entire compositions section is
likely to be pruned." **Blast radius (verified):** `tests/components/dialog.confirm-preset.test.ts`
imports `GatePatternStory` from `compositions/gate-pattern.vue` (`:7`) plus `ConfirmDialogStory` +
`DialogStory` — deleting the pages breaks this test. **Scope:** delete the 6 pages; **re-home** the
confirm-preset test fixtures onto a surviving dialog story (the test asserts dialog behavior, not
composition-page behavior — repoint it). `OPEN:` the auth-shell "why its own category" question
(F43) is a taxonomy call for `../ASK-REDUCTION.md` §D — confirm the WHOLE section prunes vs keeping
any page as a legit story type before deleting.

**Resolve `useStagger` (`./motion-core`, unbacked external-consumer claim).** `core/index.ts:16`
comments "has external consumers" with NO `docs/consumer-evidence/*stagger*` doc; in-repo usage is a
unit test only. **Scope:** either add `docs/consumer-evidence/useStagger.md` with a live sibling
grep (family-B census) OR retire the export (no certification on an unbacked comment). Recommend:
run the census; retire if the claim does not back.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| **G-PRESETS-DEAD-REACH** | **BORN RED** (dead code) | a reach probe reds on `fourier-field/presets.ts` (0 importers, verified) at HEAD; GREEN when deleted. |
| G-SURFACE-DELTA | intentional | `public-surface.spec.ts` reflects `./liquid-grid`, `./configurator`, `./easing` (if ruled) removed; the diff is the record. |
| G-STORYHERO-INTACT | re-home proof | `/…` story heros using the `liquid-grid` suffuse register render intact on the re-homed (aurora) register — paired-π, no orphaned `<LiquidGrid>`. |
| G-CONFIRM-TEST-REHOMED | regression | `dialog.confirm-preset.test.ts` passes against the surviving dialog story (fixtures repointed). |
| G-SIBLING-CENSUS | precondition | family-B clears `glass-ui/{liquid-grid, configurator, easing}` across all siblings (the header-ribbon lesson) before each drop. |

### π / DELTA obligation

Mostly null-DELTA (dead code + zero-consumer surface). The ONE paired-π owed: the StoryHero suffuse
re-home (`liquid-grid`→aurora register) renders equivalently — the hero background must not
regress. No DELTA for `presets.ts` / `configurator` / `easing` (headless / demo-only).

### KISS / parsimony notes

Delete, don't stub. Re-home StoryHero onto an EXISTING aurora suffuse register rather than minting a
new one. Move demo-devices to the demo tree that already has the pattern (`demo/composables/virtual/`).

### Non-goals

- No metric/instrument-chassis/completion-seal delete here (Wave 4 — ASK-gated).
- No barrel deletes (COLOCATION owns them).
- No easing-component redesign (F31, family D/G) — only the public-surface drop.

---

## Wave 4 — BJ.W-REDUCE-CROSSREPO-GATED · instrument-chassis + metric + completion-seal (ASK-gated relays)

**Status:** DRAFT — BLOCKED on `../ASK-REDUCTION.md` §A rulings + the family-B Q060 outbound.
**Terminal owner:** glass-ui orchestrator
**Depends on:** the user's ASK-REDUCTION §A answers; the family-B corrected consumer relay.

### Mission — the UF-K1 third-ask disease, handled as a decision, not a delete

The user has named metric-family + instrument-chassis + completion-seal as speedtest-overfit to
REMOVE **three times** (F18, Q051 R12/R14/R16, and now BJ F18/F26) — but every consumer census
rules them **SHARED library surface**. This is the `recap:recap-carry-unexecuted` DISEASE row
(REGISTRY family C: "deciding it is a wave of its own"). This wave does NOT blind-delete; it carries
the corrected cross-repo truth and executes ONLY the disposition the user rules in ASK-REDUCTION §A.

### The corrected consumer truth (round-2 adversarial, verified on disk)

- **instrument-chassis (`./instrument-chassis`, PRESENT — no break).** speedtest×4 (`App.vue:257`,
  `useRouteTransition.ts:34`, `ChartsView.vue:132`, `MapView.vue:53` + a test mock) + muster×5
  (`App.vue:31`, `InstrumentAside.vue:17`, `VerdictStage.vue:11`, `WinnerHero.vue:46-47`,
  `useMusterApp.ts:33`). Round-1 undercounted speedtest (×2→×4). **Census verdict: SHARED-KEEP**
  (STRUCTURE-ADDENDA §3 DP-A).
- **metric (`./metric` PRESENT; `./metric-badge`, `./metric-cell`, `./metric-stack` ABSENT — already
  removed at 490cc46e; MetricBadge symbol deleted, `grep MetricBadge src = 0`).** Consumers still on
  the REMOVED granular subpaths — a **prospective break on the bump**: `/metric-badge` → speedtest×2,
  muster×2, sci-report×2(+1 proto), **fourier-analysis×7** (the WHOLE repo — round-1 missed it);
  `/metric-cell` → speedtest×2(+1 test), muster×1; `/metric-stack` → speedtest×1, muster×2.
  **Census verdict: the fold LANDED; this is a family-B relay, not a delete** — file the
  re-point/recompose asks (row 10 activate). metric-badge is the MOST-shared component (Q051 R16
  inverts the user's own named example).
- **completion-seal (`./completion-seal`, PRESENT — no break).** F26 said "belongs only in
  speedtest" — but **speedtest imports it ZERO times** (wrong provenance). Real consumers:
  sci-report×2 (`CategoryHomeView.vue:4`, `GalleryView.vue:19`) + atlas×2 (`completion.ts:5`,
  `category.ts:2`). **Census verdict: 2 external repos — a borderline keep** (inline if it drops to
  ≤1). See ASK-REDUCTION §A.

### Exact scope (contingent on the ASK ruling)

- **If the user RATIFIES SHARED-KEEP (recommended):** NO deletion. This wave collapses to (a) the
  family-B metric-granular-subpath relay outbound (already-landed fold; file the re-point asks for
  speedtest/muster/sci-report/fourier-analysis) and (b) a `../ASK-REDUCTION.md` disposition record.
  The removal instinct is retired-with-rationale (the 3-repo census stands).
- **If the user OVERRULES DP-A** (accepts the costed break — speedtest becomes a UI lib, ~4 apps
  break): the deletes execute as a full family-B multi-repo migration relay, NOT a quiet prune. Each
  removed subpath files a by-name migration ask before the tag.
- **completion-seal:** keep-public (2 consumers) OR retire-with-relay to sci-report+atlas OR inline
  — per the ASK §A answer. Corrected provenance (NOT speedtest) rides the outbound regardless.

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| G-ASK-RESOLVED | precondition | `../ASK-REDUCTION.md` §A rows answered before any byte moves. This wave has NO born-RED — its disposition is a user call, not a defect. |
| G-RELAY-FILED | consumer-truth | the family-B Q060 outbound carries the CORRECTED per-repo break table (fourier×7 for metric-badge; sci-report+atlas for completion-seal; speedtest×4/muster×5 for chassis) — every consumer that breaks on the ruling gets a by-name ask. |
| G-SURFACE-CONSISTENCY | refactor-safety | if any delete executes, `subpath-policy.mjs`'s three derived views + `public-surface.spec.ts` agree post-cut; MIGRATION.md reconciled (row 15 "badge SHARED-KEEP" vs the MetricBadge deletion). |

### π / DELTA obligation

None (headless data-readout components; the disposition is structural). The obligation is
consumer-truth accuracy, not paint.

### KISS / parsimony notes

The disease is cured by a DECISION, not a re-book. Whatever the user rules, it is TERMINAL —
record the rationale so a fourth ask cannot re-open it.

### Non-goals

- No unilateral delete of a SHARED-KEEP surface (that is the disease, not the cure).
- No metric-family dir-merge (Q051 R12 four-dir→one is a separate consolidation).

---

## Wave 5 — BJ.W-REDUCE-TIMELINE · F16 timeline ground-up redesign (STUB → design-loop)

**Status:** DRAFT — STUB. Delivery runs the design-loop charter, not this band.
**Terminal owner:** the family-G / design-loop fleet
**Depends on:** the registry stabilizing (design-loop passes form after the registry is STABLE, per
REGISTRY round-3 plan).

### Mission

`/data/timeline` (F16) is "very poorly defined, buggy, likely many facilities overfit — redesign
from the ground up." Timeline (`./timeline`) is a single-EXTERNAL-repo component (speedtest only,
`PhaseTimeline.vue:49`, round-2 affirmed) — so it fails the ≥2-consumer bar AND is a named greenfield
target. This stub records the disposition so F16 does not silently drop; the actual redesign runs
the **design-loop** (`PROMPTS/design-loop-prompt.md`): brainstorm-3 → golden → challenge-3 → delta →
wave-amendment, with Fable portfolio/critique + DesignSync.

### What this stub fixes vs defers

- **Records the F16 disposition:** ground-up redesign, NOT a prop-diet (the overfit surface dies
  with the redesign). The born-RED lives at `/data/timeline` (the buggy/ill-defined defects are
  live TODAY) but is discharged by the design-loop's own captured baseline, not a gate here.
- **Records the consumer fact:** single-external (speedtest). `OPEN:` keep-and-redesign vs
  relocate-to-speedtest — a design-loop input; the redesign may prove a general timeline worth ≥2,
  or confirm it as a speedtest primitive. The loop decides on the golden/challenge evidence.
- **Defers the shape** to the design-loop (no prop enumeration here — the greenfield redraws it).

### Acceptance gates

| gate | posture | probe |
| --- | --- | --- |
| G-DESIGN-LOOP-CHARTERED | stub | the design-loop pass for timeline is registered with its captured RED baseline (the live F16 defects at `/data/timeline`). This band owns only the STUB + the consumer fact; the loop owns the redesign + its born-RED capture. |

### π / DELTA obligation

Deferred to the design-loop (which owns the before/after capture on the redesigned timeline).

### KISS / parsimony notes

A stub is not a redesign. This wave records the disposition and hands off; it does not pre-constrain
the golden the design-loop derives.

### Non-goals

- No incremental timeline patch (the user ordered ground-up).
- No prop enumeration (the greenfield redraws the surface).

---

## Band roll-up — born-RED ledger + open questions

**Born-RED gates (the lawful RED→GREEN differentials in this band):**
- **G-DEADPROP-SCAN** (Wave 1) — a static dead-config scan reds on the enumerated 0-setter props at
  HEAD (Typewriter 11, GlassDock 4, Slider `keepDockOpen`, Labeled\* 7/12, Progress 2, AnimatedDigit
  3, FourierField 5, Constellation 3 — all verified 0 setters on disk); GREEN after the cut. A
  *surface-hygiene* RED, not visual.
- **G-CARD-DEFAULT-PAINT** (Wave 2) — the ONLY real-VISUAL born-RED: a default `<Card>` renders
  `metal:gold` + `grain:true` at HEAD (`Card.vue:33,38`); GREEN = neutral glass. π/DELTA owed.
- **G-PRESETS-DEAD-REACH** (Wave 3) — a reach probe reds on `fourier-field/presets.ts` (0 importers,
  verified) at HEAD; GREEN when deleted.

**Everything else is intentional-surface DELTA or null-DELTA** (public-surface diffs, paint
null-DELTA proofs, the consumer-truth relay) — honest per the band framing; no intentional cut is
dressed as a born-RED defect. Wave 4 has NO born-RED (its disposition is a user ruling); Wave 5's
born-RED belongs to the design-loop.

**OPEN markers for the Fable two-challenge pass + the user (via ASK-REDUCTION):**
1. Dead-barrel ownership — COLOCATION Wave 1 already owns the 5 barrels (rec: keep it there; this
   band cites, does not double-delete).
2. HandMark / FourierField / Constellation / DialogContent-stage — target-surface DEFINED here,
   DELIVERED by the greenfield/freeze band (rec: hand off, do not cut in isolation).
3. Typewriter `respectReducedMotion` + Labeled\* `invalid`/`errorLive` — coordinate with BAND-A11Y
   before cutting (a11y may claim them).
4. GlassDock 4 dead knobs — confirm the family-G dock greenfield inherits the cut (rec: die regardless).
5. WatercolorDot — single-external (value.js); keep/relocate is an ASK §B question.
6. Card one-axis shape — `variant` alone vs `variant + surface` (rec: single `variant` role-axis).
7. liquid-grid — RULED (adjudication R1): DELETE wins; this band owns the component + export +
   STORY-PAGE (`demo/stories/substrates/liquid-grid.vue`) deletion + the StoryHero suffuse re-home;
   `BAND-STORY` W1 drops it from the fold roster (no studio-variant normalize).
8. easing public-surface drop — gated on ASK §B; F31 (family D/G) owns the component redesign.
9. compositions section — the whole-section prune vs keeping any page as a legit story type is an
   ASK §D taxonomy call; re-home the confirm-preset test fixtures on delete.
10. Wave 4 — the ENTIRE disposition (SHARED-KEEP vs overrule DP-A) is the user's ASK §A call; the
    drafter's recommendation is RATIFY SHARED-KEEP (the 3-repo census stands, the removal instinct
    is the UF-K1 disease).
11. useStagger — census-then-retire vs evidence-doc-and-keep (rec: retire if the census does not back
    the "external consumers" comment).
12. Every cut is gated on the family-B sibling-import census clearing the subpath/prop — the
    header-ribbon undeclared-consumer lesson is a HARD precondition, not a nicety.

**Lead adjudication (2026-07-17, perfection pass): the Fable DAG+reduction amendments A1-A8
(`../formation/perfection/FABLE-DAG-REDUCTION.md` §4) are ADOPTED-BINDING on this band.** In one
line each: A1 modularization boundary (primitive/selection stay at _shared root — leaf-path
fan-in truth); A2 W5 timeline scope = ALL FIVE variants named (~1500 LOC family); A3 W1 slider
keepDockOpen = adoption of the existing dockContext authority; A4 the dock⇄dropdown-menu 2-cycle
+ dockContext 4-family fan-in recorded as structural fact feeding GF-DOCK (the position-axis cut
owes a null-DELTA on the four consuming families); A5 Card axis OPEN resolved to the
variant+surface two-axis floor; A6 the orphan-partial fix wave covers BOTH glass-chip.css AND
glass-atom.css; A7 /metric census = the 4-symbol family incl. MetricRow; A8 Configurator +
DataTable demo-privatization must also delete the ROOT-barrel export lines (src/index.ts:141,:91).
The perfection doc's §5 findings are execution-time evidence for their waves.
