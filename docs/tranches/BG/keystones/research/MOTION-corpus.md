# MOTION-corpus — the disk-true motion state (KS-B research, LANE MOTION)

**Date:** 2026-07-01 · **HEAD:** `29f280c8` (tranche/BG) · **Lane waves:** F5.1 W-MOTION-SPINE ·
F5.2 W-LIQUID-WEIGHT-DEFAULT · F5.3 W-DISCLOSURE-ROTATE · W-SPRING-TIDY · 10.5 dead-cut (motion
side) · F8.6 W-ARISTOTELIAN-PROPORTION (acceptance language) · 17.4 W-ANIMATION-CONGRUENCE.

Purpose: the ground-truth motion state the KS-MOTION-DISNEY spec author builds on. Everything
below is grep-verified at HEAD, cited file:line. **The corpus docs are AHEAD-of and BEHIND-of
disk in different places — this report reconciles both.** Read this before the GOLDENs; the
GOLDENs are the design *rationale*, disk is the *reality*.

---

## 0 — THE HEADLINE: the spring register is disk-truth, the DOCS are stale (fence-tension for the orchestrator)

Two docs the SEED cites as authority carry PRE-`BD.W-ANIM-IOS27-TUNE` spring values. The
`BD.W-ANIM-IOS27-TUNE` global recalibration (`springPresets.ts:59-74`) re-tuned **all six** core
rows toward the "weighty-gooey-inertial iOS-27 pole" and disk is the single source. The
authorities are out of sync with themselves:

| register | `springPresets.ts` (DISK-TRUTH) | `motion-canon.md` P7 | `tunable-anim.md` §Kind-1 | SEED / plan §4 protected set |
|---|---|---|---|---|
| smooth | **0.58 / 0.80** (`:78`) | (not listed) | 0.5 / 0.86 | — |
| snappy | **0.48 / 0.74** (`:84`) | (not listed) | 0.42 / 0.78 | — |
| bouncy | **0.60 / 0.60** (`:90`) | (not listed) | 0.5 / 0.55 | — |
| gentle | **0.82 / 1.0** (`:96`) | (not listed) | 0.7 / 1.0 | — |
| **dock** | **0.68 / 0.64** (`:102`) | **0.32 / 0.7** (`:198`) | **0.32 / 0.7** | **"{0.32,0.7} byte-frozen (R6)"** |
| press | **0.20 / 0.80** (`:108`) | 0.25 / 0.7 (`:194`) | 0.15 / 0.86 | — |
| DRAWER_SNAP | **0.50 / 0.74** (`drawer/constants.ts:27`) | 0.4 / 0.82 (`:199`) | 0.4 / 0.82 | — |

**THE R6 DOCK_SPRING FENCE MUST BE RE-READ (critical — resolve before F5.1/4.1 build).**
`DOCK_SPRING` is no longer a literal — it **derives from the table**:
`dock/constants.ts:85-88` = `{ response: springPreset("dock").response, dampingFraction:
springPreset("dock").dampingFraction }` → disk resolves **`{0.68, 0.64}`**, NOT `{0.32, 0.7}`.
The SEED's "DOCK_SPRING {0.32, 0.7} byte-frozen — NO retune ever" is a **stale literal from
before BD.W-ANIM-IOS27-TUNE**. What R6 actually protects on disk is: (a) the DERIVATION
(`DOCK_SPRING = springPreset("dock")`, no local literal — `dock/constants.ts:81-88` is the
value.js-fenced single source `useDockOrientationMorph`/`dockMorphContext`/`useLayerTransition`
all read); (b) the CURRENT `{0.68, 0.64}` value. A keystone spec that "restores {0.32, 0.7}" would
be a **regression that reverts the shipped BD tune**. **Settled recommendation:** the KS-DOCK +
KS-MOTION specs cite DOCK_SPRING as `springPreset("dock")` = `{0.68, 0.64}` (BD-tuned), and R6 =
"the derivation + the current value are frozen; no re-tune without an explicit fence-lift." The
stale `{0.32,0.7}` in motion-canon P7 + tunable-anim + the SEED is a doc-drift the BH.B4c
precept-extract (or a keystone note) must reconcile — flag it, do not silently "fix" the table.

*(Same class: `useSpringPress.ts:18` COMMENT says "response 0.15 / ζ 0.86" but it reads
`springPreset("press")` = `{0.20, 0.80}` live at `:22,77-78` — mechanism correct, comment stale.
`DRAWER_SNAP` doc-comment at `drawer/constants.ts:25` correctly records the `{0.4,0.82}→{0.5,0.74}`
BD tune. The mechanism-is-truth pattern holds everywhere; only the frozen-literal citations drift.)*

---

## 1 — THE SPRING SPINE (the one source, disk-verified)

**`SPRING_PRESETS` is exemplary and INVIOLABLE** (`springPresets.ts:75-130`). ONE hand-authored
`(response, ζ)` table → both twins derive: the CSS `--spring-*` `linear()` via
`regen-spring-tokens.mjs` (`springLinearStops`, 48 samples, `:52-64`) AND the JS `MOTION_CURVES`
via `springTimingFunction` (`curves.ts:88`). Drift-proof by construction (D6 §"already GOOD";
motion-canon P7). **The count on disk is NINE rows, not six** — the six core registers +
**three `timeline-*` rows** (`timeline-head` 0.34/0.74, `timeline-fill` 0.46/0.82, `timeline-press`
0.22/0.70; `:112-129`) minted by `BD.W-TIMELINE-RAIL-UNIFY` for `ScrubberTimeline`. `SpringPresetName`
union (`:17-26`) carries all nine. The regen regex (`regen-spring-tokens.mjs:110-116`) + the sync
gate anchor on the nine-name alternation.

Per-spring clock (P4, `regen-spring-tokens.mjs:85-102`): `t_s = -ln(0.02)/(ζ·ωₙ)`,
`ωₙ = 2π/response`, rounded 10ms. Generated as a second contiguous block; the §6 register canon
(which spring fits which job) is untouched by the clock. `--tab-indicator-duration:
var(--spring-snappy-duration)` is the model (motion-canon P7).

**The four honest substrates** (D6 verdict — the minimal set everything else is a form of):
1. `SpringProgress` (via `useSpring`, `:177 LOC`) — the physics core.
2. kf `ElementMorph` + `springTimingFunction` — the FLIP-between-two-rects core.
3. `useLiquidFlex` (`:242 LOC`, pure caller-driven squish PROJECTION — no rAF/spring/element; writes `--stretch`) — the volume-preserving deform.
4. `createScrollReader` (the scroll cluster's one-reader/N-machine core — the CORRECT pattern the morph family should copy).

**The two SANCTIONED off-spine seams** (motion-canon P7 `:162-184`; do NOT collapse in F5.1):
`usePointerVelocityField` (kf-free critically-damped lerp, ships root-barrel + `/motion-core`;
owns no rAF, fed `tick(dt)`) and `useDragMorph` (wires published kf `Draggable`+`SpringProgress`+
`decayRest`; re-rolls the snap as the kf-snap-not-on-dist interim — **note BH.B2.4 landed native
`DragOptions.snap`, cursor 1.4, so the re-roll is EXCISED on disk already**).

---

## 2 — WHAT IS ALREADY BUILT (disk is AHEAD of the BD GOLDENs — ground on disk, not the specs)

The BD/BE/BF tranches BUILT most of what the entrance-reveal + design-language-edicts GOLDENs
spec as "ABSENT / depend-on". **The KS-MOTION spec must treat the GOLDENs as design rationale,
not owed deliverables** — re-specifying built work re-introduces it.

- **`--ease-cartoon-punch` — BUILT.** DECLARED as a real `linear()` with an anticipation
  pre-dip + >1.10 punch (`scheme-motion.css:196`), PRM arm → `--ease-standard` (`:361`). CONSUMED:
  the Select chevron (`SelectTrigger.vue:138`), `segmented-tabs.css:154`, `cards.css:311`, the
  `MOTION_CURVES` JS twin (`curves.ts:140`). NOT a `SPRING_PRESETS` row (the ≤10% overshoot fence
  held — it is a shaped keyframe, GOLDEN §1/§2c). **The GOLDEN's "depend-on Band-0" is satisfied.**
- **`--motion-weight` — BUILT** (rest `0.618 ≈ 1/φ`). DECLARED + read live by `useLiquidFlex`
  (`:115,126`), `useMorphField` (`:190,315-320`), `useLiquidPress` (`:86,165,197`); the loud
  register (`--motion-weight: 1`) on `cards.css:308` + `glass-atom.css:98`; PRM `0` carve
  (`cards.css:390`, `glass-atom.css:133`). **BUT** D6 F4 stands: it is a **per-site opt-in**
  (~26 read-sites), NOT the default — that inversion is exactly F5.2's job (§5 below).
- **The cartoon caster (`BD.W-CARTOON-CASTER`) — BUILT.** The moving cast as a child layer
  (`cards.css:302-311`, `glass-atom.css:65-98`), NOT `::after{box-shadow}` (the WebKit hole the
  GOLDEN §2c warns of). Static layered `--shadow-cartoon-md` stamp on a compositor `transform` clock.
- **`.liquid-enter` universal mount recipe — BUILT** (`glass/liquid-enter.css`), with `.is-cel` +
  `.cartoon-cast`. The entrance-reveal GOLDEN's headline MINT is on disk.
- **The 12-laws Universal/Scene-orchestrated tiering** (design-language-edicts GOLDEN §2e) is the
  DESIGN.md precept content — the *acceptance language* F8.6 enrolls, not a code deliverable.

---

## 3 — F5.1 W-MOTION-SPINE (the morph-family collapse — GENUINELY OWED)

The one real over-contrivance in the motion domain (D6 F1/F2, the flagship). **The collapse target
`useElementMorph` does NOT exist on disk** (`find src -name useElementMorph.*` → ∅). Three shipped
composables EACH `new ElementMorph()` + own hand-rolled rAF `step()` — the copy-paste D6 F1 documents
(even the `asElement` comment "kept byte-shape so the bloom family reads as ONE",
`useLiquidReveal.ts:72`, is an explicit admission):

| leaf | LOC | direction | endpoints | coupled channels | → wrapper |
|---|---|---|---|---|---|
| `useLiquidReveal` | 285 | in (1→0) | self-inset / trigger rect | opacity + blur | ≤20-line |
| `useDockCtaReceive` | 349 | out (0→1) | self → foreign dock control | opacity + blur + hand-off + `[data-cta-pending]` seat | ≤20-line |
| `useBloomUp` | 449 | in (from foreign source) | source → dest (≠) | opacity + blur + `--glass-ambient-hue` color | ≤20-line |

**The SPINE deliverable** (D6 FC1, plan F5.1 = build-map 10.6+10.7+10.9): mint ONE
`useElementMorph(surface, { from, to, direction, channels, preset, origin, respectReducedMotion })`
— ONE `step()` rAF, ONE `ElementMorph`, ONE PRM snap, ONE compositor-only invariant, sampled from
`SPRING_PRESETS`. The three become byte-identical-API wrappers (clean-break internals, no legacy
alias). `channels` = declarative `{ opacity?, blur?, color?, squish?, spawn? }` — `squish` couples
`useLiquidFlex` onto the FLIP (the GOLDEN §2a squish-add), `spawn` covers the celebration-petal case.

**The press-tower collapse** (D6 F5, plan F5.1): the 3-tier tower
`useSpring`→`useSpringPress`(106L)→`useLiquidPress`(222L) exposes TWO public press faces for one
behavior. Fold to `useLiquidPress` with a `squish:false` bare mode. **`useSpringPress`
DEFINITION-ABSENT.** PRESERVE (build-map 10.6 R16 WATCH-3): Button's `--glass-btn-press-t` drive +
the interruptible velocity-continuous re-seat (the iOS interruptible contract). Button re-points
`useSpringPress`→`useLiquidPress({squish:false, pressVar:'--glass-btn-press-t'})`; the
`proof:button-glass` B2 direct-composition assert re-points to the unified leaf.

**Also DEFINITION-ABSENT at F5.1:** `useScrollPin` (folded — §4) and `useGooMorph` (folded into
`useMorphField`, D6 FC6b). **WATCH — the pager/carousel WORM must survive the goo fold.** The worm
is VERIFIED-GOOD (B6 verdict): `usePagerWorm.ts` (`pager-dots/composables/`) + `useCarouselWorm.ts`
(`carousel/composables/`) drive the barbell-neck goo via `useMorphField`/`#pager-goo`
(`GooFilter.vue`). 10.5 GUTS `useMorphField`→`morphSignatures.ts`; F5.1 makes `useGooMorph`
DEFINITION-ABSENT. The worm's neck-signature math must land in `morphSignatures.ts` and the two worm
composables re-point onto it — a fold, never a worm regression. **Sequence F5.1 co-with 10.5**
(build-map: precond dead-cut) so the gut + the fold + the worm re-point are ONE atomic wave-pair.

**`asElement` hoist** (GOLDEN §2a, D6 FC1): still owed — the resolver is private in
`useDockCtaReceive.ts:170` (`find src -name asElement.ts` → ∅). Hoist to
`motion/asElement.ts`, all bloom leaves import it (the α binding-verification fix). This closes the
component-ref-crash class the entrance-reveal GOLDEN §2a documents.

**Gate collapse:** `proof:liquid-reveal`/`-bloom-up`/`-dockmorph-cta` → one `proof:element-morph`
clause on the family gate `proof:motion` (D6 F6; the F8.1 family-consolidation direction).

---

## 4 — 10.5 W-DEAD-COMPOSABLE-CUT (the motion-side dead-cut — disk-verified targets)

Owned ONCE (build-map R1; subsumes 12.1 SPIKE-DELETE + 12.2 JUBILANCE-DECIDE). Each a grep-gated
DELETE + a MIGRATION-per-symbol row. Disk state:

| symbol | disk location | consumers (grep) | disposition |
|---|---|---|---|
| `useHaptic` | `motion/core/useHaptic.ts` | `index.ts` + `api/index.ts` (PUBLIC surface) | DELETE + MIGRATION + un-export |
| `useCelebrationBurst` | `motion/useCelebrationBurst.ts` (261L) | `index.ts`, `jubilance.css`, `api/types-extra.ts` — **0 `.vue` consumer** | DELETE + `jubilance.css` (D6 F3 — corrects the false "2 consumers" 12.2 KEEP) |
| `useVizChoreography` | `glass/useVizChoreography.ts` | **∅** (grep empty) | DEFINITION-ABSENT (6.4 removes the last would-be reader) |
| `useLiquidMorph` | `motion/useLiquidMorph.ts` (462L) + `glass/liquid-morph.css` (850L) | NOT barrel-exported; only `manifest.ts` + 2 demo stories + `AppShell.vue` | DELETE clean (D6 F2 — the single largest LOC reclaim; re-point the demos onto `useElementMorph`) |
| `useDockContextSilhouette` | `dock/composables/useDockContextSilhouette.ts` | only `AppSwitcher.vue` (demo) | DELETE + retire `AppSwitcher.vue` (drains ratchet #8; **4.3 must NOT double-own** — R1) |
| `useScrollPin` + `useScrollScene` | `motion/{useScrollPin,useScrollScene}.ts` | scroll-choreography.css + demo | FOLD `useScrollPin`→a `mode:'pin'` on `useScrollScene` (D6 FC6a) |
| `useMorphField` | `motion/useMorphField.ts` (468L) | `useGooMorph` + worm | GUT → `morphSignatures.ts` (keep the pure neck-signature math the worm rides — §3 WATCH) |
| 3 lying evidence docs | `docs/consumer-evidence/{use-haptic,use-celebration-burst,use-viz-choreography}.md` | — | DELETE (BH.B4d already pruned FILES; these 3 are the LYING-claim docs 10.5 owns) |

---

## 5 — F5.2 W-LIQUID-WEIGHT-DEFAULT (the transition-register inversion — the real transposition)

The disease (D6 F4, B6 F3): `--motion-weight` is an **allowlist**, not architecture. The DEFAULT
interactive spatial transition register is `--ease-standard` (a plain bezier, `scheme-motion.css:91`,
no spring/weight/bounce); weight only reaches a surface whose recipe explicitly reads
`var(--motion-weight)`. "inertia/weight/bounce on ALL motion" (the binding user mandate, the
[[Liquid-weight universal]] memory) is architecturally UNMET — every new surface must remember to
join the ~26-site read-set.

**The inversion** (D6 FC4, GD-FOLD-4; absorbs 10.10 + 10.24): mint a default interactive-transition
register `--transition-liquid-spatial` = a spring-derived `linear()` on the per-spring clock
(GENERATED by `regen-spring-tokens.mjs` so it stays drift-proof), scoped to the SPATIAL property
group (`transform`/`scale`/`translate`/`rotate`). Apply it at the **base atom/utility layer**
(`utilities/base.css` / the interactive-atom `@utility`) so EVERY interactive surface inherits
weight on its spatial legs BY DEFAULT. The **spatial/effects split is preserved** (motion-canon P1):
EFFECTS legs (color/opacity/box-shadow) KEEP `--ease-standard` bezier. The calm opt-out is
`.motion-calm { --motion-weight: 0 }` (or re-point the spatial register to `--ease-standard`); the
`<Card>` calm register becomes an EXPLICIT opt-out, not the accidental default.

PRM + compositor-only fall out for free: the existing `--motion-weight: 0` PRM carve + the universal
`a11y-overrides.css` `transition-property` restriction + `proof:no-layout-animation` already cover
the whole spatial group (safe by construction). **The Fable storybook sweep verdict IS the gate**
(the plan is explicit — F5.2 gate column): a Fable instance sweeps the full storybook for surfaces
that (correctly) gain weight, flags any that should opt calm. Amend `proof:motion` /
`proof:no-layout-animation` to assert the default register is spring-derived (born-RED on the
`--ease-standard` default today).

---

## 6 — F5.3 W-DISCLOSURE-ROTATE (chevron register + the Tailwind-utility detector blind spot)

The gestalt-cohesion defect a designer sees instantly (B6 F1): the SAME disclosure-chevron gesture
paints THREE divergent registers, one FLAT:

- **Select** — `SelectTrigger.vue:138`: `[transition:rotate_var(--spring-snappy-duration)_var(--ease-cartoon-punch)]` → spring clock + cartoon-punch arrival.
- **Configurator** — `ConfiguratorLayer.vue:202`: `transition: transform var(--duration-fast) var(--spring-snappy)` → spring curve but WRONG clock (generic `--duration-fast`, not `--spring-snappy-duration`).
- **Accordion** — `AccordionTrigger.vue:35`: `transition-transform duration-200` → a FLAT bezier snap-rotate, **no spring, no weight** — the exact liquid-weight violation.

**The deliverable** (B6 FC1, plan F5.3 = build-map 10.26): mint ONE `@utility transition-disclosure`
(or a `--disclosure-rotate` clock/curve token pair) — the single canonical chevron gesture. All
three collapse onto it in one edit (substitution over re-declaration). Any DropdownMenu /
NumberField-stepper caret reads it too. ≥2-consumer bar met at birth (3). **Fable decides the ONE
arrival ease** — the cartoon-punch overshoot (Select) vs the calm snappy settle (Configurator) is a
gestalt call; route to a Fable arm + DesignSync the 3 disclosure surfaces as one card set. This
SUPERSEDES the WS10 per-SITE accordion fix (the register unify, not a patch).

**The enforcement half** (B6 F2, plan F5.3 "abrupt-spatial-tailwind"): `proof:spring-ease`'s
`detectAbruptSpatial` matches ONLY the CSS colon-declaration form (`proof-spring-ease.mjs:539`
`declRe = /(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi`) — so the Accordion's hyphenated
`transition-transform duration-200` Tailwind utility is **structurally invisible** to the one gate
authored to catch it (green-over-broken). Widen `detectAbruptSpatial` to ALSO scan `.vue` template
class attrs for the Tailwind spatial forms (`transition-transform`, `transition-[…transform…]`,
`[transition:(rotate|scale|translate|transform)…]`, `duration-N`/`ease-*` on a `data-state`/
`group-data-*` transform toggle). **A CASE ROW on the existing gate, NOT a forked gate** (extend the
`ABRUPT_SPATIAL_PENDING` bridge shape at `:387`). Born-RED (accordion is the first catch) → GREEN
when the register lands; bound the red-window (land the gate WITH/just-after F5.3, the WS7→WS12
precedent). Distinct axis from `proof:motion-one-clock` (which checks an already-sprung leg pairs
its clock; it has no arm for a spatial leg with NO spring — B6 F3).

**The missing-transition CENSUS** (B6 FC3, plan F5.3 "missing-transition CENSUS"): enumerate every
state change that paints with ZERO motion — `v-if`/`v-show` swaps, class toggles, `data-state` flips
without a transition/keyframe — across `src/components/**`, each routed to a register (spring-iff-
spatial / effects-bezier / explicit "instant by design" with rationale). Deliver as a census
markdown with per-row disposition (the NAV-vs-FEATURE dock-census pattern — a positive allowlist so
the set is closed). This is what makes "UNIVERSAL" decidable; pairs with the detector widen.

---

## 7 — W-SPRING-TIDY (table→6 — a REAL tension with the timeline rows, resolve before build)

Plan gate: "spring-tokens-synced (table→6, dead `--spring-timeline-*` twins; regen+re-snap)"
(build-map 10.8). **Disk contradicts "dead":** the 3 `timeline-*` rows are LIVE **JS** consumers —
`ScrubberTimeline.vue:14-16` calls `springPreset("timeline-head"|"timeline-fill"|"timeline-press")`
(the SpringProgress travel/fill/press engines, `BD.W-TIMELINE-RAIL-UNIFY`). The CSS
`--spring-timeline-*` GENERATED twins are dead (grep for CSS `var(--spring-timeline-*)` readers →
∅), but the JS presets are not.

`regen-spring-tokens.mjs` emits a CSS `--spring-<name>:` + `--spring-<name>-duration:` for EVERY
table row, so "table→6" removes the timeline rows from the table → **the JS `springPreset("timeline-*")`
throws + ScrubberTimeline breaks.** This is a genuine design decision, NOT a mechanical drop:

- **Option A (recommended):** keep the 3 rows in `SPRING_PRESETS` (they are LIVE JS single-source
  authorities the ScrubberTimeline reads); make `regen-spring-tokens.mjs` skip CSS emission for
  JS-only rows (a per-row `emitCss:false` flag), so the dead `--spring-timeline-*` CSS twins vanish
  while the JS presets survive. "table→6" becomes "CSS-emitted rows → 6."
- **Option B:** migrate ScrubberTimeline off the named presets onto inline `(response, ζ)` — but
  that violates the no-second-authority discipline (springPresets.ts is the single source) and the
  motion-canon P7 SPRING_DEFAULTS rule.

**Settled recommendation: Option A** — flag the "table→6" phrasing to the orchestrator as
"CSS-emitted → 6, JS table stays 9." The dead thing is the CSS twins, not the JS register.

---

## 8 — F8.6 W-ARISTOTELIAN-PROPORTION (the acceptance LANGUAGE — the 12 laws operationalized)

Plan (F8.6 gate): `proof:meta · edict-verdict-present` — every enrolled roster surface owes a
**3-axis verdict** (√φ-proportion · animation-laws · technicolor-cartoon-punch), NOT a
`proof:aristotelian` singleton. This is the Fable-judge acceptance LANGUAGE, not N gates
(GA-9+GA-5). The animation-laws axis is the design-language-edicts GOLDEN §2e content made a
verdict rubric:

**The 12 Disney laws → Universal / Scene-orchestrated tiers** (GOLDEN §2e, the "Liquid Weight is
Universal" law — every DRIVER motion carries weight/inertia/bounce/squish, anticipates,
overshoots, follows through, travels an arc, morphs MORE the faster it moves):

- **Universal tier** (every primitive shipping driver motion honors, each named to a LIVE
  substrate): 1 squash&stretch (`--scale-press`+`useLiquidFlex`) · 2 anticipation
  (`--ease-cartoon-punch` pre-dip + `--motion-weight`) · 5 follow-through/overlap (`useStagger`/
  `useStaggerReveal` + the 1/φ overlap) · 6 slow-in/slow-out (`--ease-standard`; springs intrinsic)
  · 7 arc (fission `--split-dx/dy` + `useElementMorph` FLIP — a real curve, not a lerp) · 9 timing
  (`--duration-*` + the per-spring clock) · 10 exaggeration (`--spring-bouncy` → the cartoon PUNCH
  ceiling) · 11 solid drawing (the glass tier ladder + the cartoon caster's 2.5-D pop) · 12 appeal
  (Aurora + meatball goo + the cartoon register).
- **Scene-orchestrated tier** (a composition orchestrates from the universal substrate): 3 staging
  (drawer `--glass-drawer-t → scrim/scale`) · 8 secondary-action (`useStagger` chains + the
  `--*-flood-t` accent-wash). Principle 4 (straight-ahead vs pose-to-pose) is the spring-vs-ease
  decision, not a tier.

The `--motion-weight` (0.62 ≈ 1/φ) scalar governs "how much cartoon" — DRIVER-scoped (the T13
observer-carousel carve survives; an over-springy content-snap reads cheap — the NN/g overuse fence,
motion-canon §"proportion fence"). **The acceptance verdict is a Fable judgement** (F8.3 arm), not a
`proof:*` numeric — that is the whole point of "acceptance LANGUAGE, not N gates."

---

## 9 — 17.4 W-ANIMATION-CONGRUENCE (the one-clock axis — distinct gate)

Plan: `proof:motion-one-clock` (A9 lock; distinct axis) + `getAnimations()-per-node` congruence.
This is the PROPERTY-SPINE sibling (motion-canon P7 `:213-220`): the WHICH-engine / WHICH-clock /
WHICH-exception gate, disjoint from `proof:animation-coherence` (register tier: which curve on which
leg) and `proof:no-layout-animation` (compositor tier). It reads its `OFF_SPINE_ALLOWLIST` +
`SPRING_DEFAULTS_ALLOWLIST` from motion-canon P7 (the SINGLE source, M5 cross-checks gate↔canon name
the same set). M2 reds a THIRD un-sanctioned off-spine spring/rAF; M4 records the viz-FEED inversion
(viz own a `createCanvasLifecycle` rAF and FEED kf `tick(dt)`, never `RAFPlayback.play/.loop/.drive`
— the one-loop / `proof:offscreen-pause` fence). The hand-curated clock-pair table
(`proof-motion-one-clock.mjs:174-228`) already books the Configurator-chevron + menu-row + dock-rail
CLOCK reconciles — **F5.3 SUPERSEDES the configurator-chevron booking** (one edit resolves the clock
AND the divergence by moving it onto the shared register, B6 cross-ref). Keep 17.4 the distinct
one-clock axis; do NOT fold it into the F5 family gate.

---

## 10 — PRECEPTS CONFORMANCE (the fences the KS-MOTION spec MUST honor)

- **motion-canon P1-P7** (`docs/precepts/motion-canon.md`): spring-iff-spatial/bezier-iff-effect;
  enter-bouncy/exit-no-overshoot; fade-coupled-to-transform; the per-spring clock MANDATORY;
  compositor-only; PRM-keeps-fade-drops-transform; ONE source + ONE clock + the 2 sanctioned
  off-spine seams. **The F5.2 inversion preserves P1** (spatial legs get the spring register;
  effects legs keep `--ease-standard`).
- **tunable-anim.md**: the 5 tunable kinds; a new animatable axis cannot ship un-indexed (T1); the
  CLOCK is DERIVED-not-tunable (T2, no "tune the clock" control); the boundary law (curve MATH =
  value.js · playback = keyframes.js · editor = glass-ui). **Any KS-MOTION spring value cited must
  be the DISK value (§0), not the stale table in this doc.**
- **The two off-spine seams are NOT collapsed** by F5.1 (`usePointerVelocityField`, `useDragMorph`
  — motion-canon P7 allowlist; M5 the single source).
- **Cross-engine floor (GOLDEN §L7 / design-language-edicts):** compositor channels only for
  steady-state; goo = static SVG `filter:url()` + sRGB, never `backdrop-filter:url()`; PRM → instant
  topology swap. Every visual motion wave closes on a PAIRED-engine π (Chromium + WebKit), never a
  single-engine green.
- **Clean breaks, ≥2-consumer, presets-in-consumers, compositor-only+PRM** — all F5 waves hold them
  (the wrappers are byte-identical-API clean-break internals; the dead-cut is ≥0-consumer removal;
  `--motion-weight` velocity/presets live in consumers).

---

## 11 — SETTLED DECISIONS (the spec author inherits these)

1. **Cite spring values from DISK** (`springPresets.ts`), never from motion-canon P7 / tunable-anim
   / the SEED — those are pre-BD-tune stale. DOCK_SPRING = `springPreset("dock")` = **{0.68, 0.64}**;
   R6 protects the DERIVATION + the current value, NOT a revert to {0.32, 0.7}. **Flag the doc-drift
   to the orchestrator** (a BH.B4c/keystone reconcile note) — do not silently rewrite the table.
2. **The Band-0 tokens are BUILT** (`--ease-cartoon-punch`, `--motion-weight`, cartoon caster,
   `.liquid-enter`) — the GOLDENs are rationale, not owed work. F5.1's genuine mint is
   `useElementMorph` + `asElement` hoist + the press-tower collapse; F5.2's is the DEFAULT-register
   inversion (weight is built as opt-in, F5.2 makes it the default).
3. **F5.1 co-sequences with 10.5** (build-map precond) so the `useMorphField` gut → `morphSignatures.ts`
   → worm re-point is atomic. **WATCH the pager/carousel worm** (VERIFIED-GOOD, do not regress).
4. **W-SPRING-TIDY = "CSS-emitted rows → 6", NOT "table → 6"** (Option A §7) — the 3 `timeline-*`
   JS presets are live ScrubberTimeline authorities; only the dead CSS twins go.
5. **F5.3 detector widen is a CASE ROW on `proof:spring-ease`**, not a forked gate; born-RED bounded
   to the register landing.
6. **F8.6 is acceptance LANGUAGE** (a Fable 3-axis verdict per roster surface), not a `proof:*`
   singleton; the 12-laws Universal/Scene tiering is the rubric.
7. **17.4 stays the distinct one-clock axis**; F5.3 supersedes its configurator-chevron booking.

## Corpus pointers (cite these, don't re-derive)
- Springs: `src/composables/motion/springPresets.ts` · `scripts/regen-spring-tokens.mjs` · `dock/constants.ts:81-88` · `drawer/constants.ts:15-27`
- Precepts: `docs/precepts/motion-canon.md` (P1-P7) · `docs/precepts/tunable-anim.md`
- GOLDENs (rationale): `docs/tranches/BD/greenfield/entrance-reveal/GOLDEN.md` · `.../design-language-edicts/GOLDEN.md`
- Lenses (evidence): `docs/tranches/BG/audit/RESPEC-GESTALT/pass-1/{B6-liquid-weight,D6-motion-transposition}.md`
- Plan: `EXECUTION-PROGRESS.md` §1 F5 rows + `bg-build-map.md:100-111`
- SOTA refs: Material 3 spatial/effects motion split (the P1 source) · Apple iOS-26/27 Liquid-Glass HIG (interactiveSpring, the `response`/ζ convention) · Disney's 12 principles (the F8.6 taxonomy) · NN/g liquid-glass overuse warning (the proportion fence) · WCAG 2.3.3 (the PRM vestibular carve, P6).
