# KS-MOTION-DISNEY — motion that carries WEIGHT: the Disney precepts made structural

**Keystone spec (KS-B · motion + craft). Author: Fable. Date: 2026-07-01. HEAD `29f280c8` (tranche/BG).**
**Binding for the frozen plan waves:** F5.1 `W-MOTION-SPINE` · F5.2 `W-LIQUID-WEIGHT-DEFAULT` ·
F5.3 `W-DISCLOSURE-ROTATE` · `W-SPRING-TIDY` · 10.5 `W-DEAD-COMPOSABLE-CUT` (motion side) ·
F8.6 `W-ARISTOTELIAN-PROPORTION` (acceptance language) · 17.4 `W-ANIMATION-CONGRUENCE`
(`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:83-87,120,126`).
**Research inputs (read in full, cited throughout):** `research/MOTION-sota.md` + `research/MOTION-corpus.md`.
**This spec PERFECTS the folded rows' content. The wave SET is frozen; the protected set
(`SYNTHESIS-PASS1.md §4`) is inviolable — `SPRING_PRESETS` + regen + per-spring clocks byte-identical,
wave 4.10 `W-DOCK-INPLACE-MORPH` VERBATIM (this spec never touches its scope), zero re-tune anywhere.**

---

## §0 — Fence reconciles the spec author inherits (settled in `MOTION-corpus.md §0/§11`; flagged, not silently fixed)

1. **DOCK_SPRING is a DERIVATION, and the SEED's literal is stale.** On disk `DOCK_SPRING =
   springPreset("dock")` (`dock/constants.ts:81-88`) → **`{response: 0.68, ζ: 0.64}`**, the
   `BD.W-ANIM-IOS27-TUNE` value (`springPresets.ts:100-104`). The SEED/motion-canon `{0.32, 0.7}` is a
   pre-BD-tune literal. **This spec reads R6 as: the derivation + the CURRENT disk value are frozen;
   "restoring" {0.32, 0.7} would be a regression that reverts a shipped tune.** No wave here touches
   either. The doc-drift (motion-canon P7 `:194-199` + tunable-anim + the SEED) is FLAGGED to the
   orchestrator for the precepts-submodule reconcile — see §4.17.4 and open-question list.
2. **Every spring value cited below is the DISK value** (`springPresets.ts:75-130` — nine rows: six
   core + three `timeline-*` LIVE JS presets, `BD.W-TIMELINE-RAIL-UNIFY`). The GOLDENs are rationale,
   not numbers.
3. **The Band-0 governing layer is BUILT** — `--motion-weight` (rest `0.618 ≈ 1/φ`,
   `scheme-motion.css:172`, PRM-zeroed `:360`), `--ease-cartoon-punch` (`:196`, PRM re-alias `:361`),
   the `--flex-vel` velocity term (`useLiquidFlex.ts:113-126,215-223`), the cartoon caster, `.liquid-enter`.
   The BD motion-spring-register GOLDEN's mints are on disk. What is OWED is exactly this lane:
   the ONE engine (F5.1), the DEFAULT inversion (F5.2), the register unify (F5.3), the tidy, the cut,
   the acceptance language, the lock.

---

## §1 — The hallmark delineated: the 12 principles, each with ONE glass-ui home

> **glass-ui's motion is the Illusion of Life run on a physics spine.** Every driver gesture carries
> mass: it squashes as it travels, overshoots as it arrives, trails a settle, and can be grabbed
> mid-flight without ever hitting a wall — because ONE `(response, ζ)` table feeds ONE spring engine
> feeding ONE FLIP loop, and ONE inheriting scalar (`--motion-weight`, resting at 1/φ) proportions how
> much of that life any surface shows. Observers stay calm; the loud one-shot earns its punch. You
> recognize glass-ui because nothing snaps and nothing is busy: weight is the DEFAULT, stillness is
> the opt-out, and both are one token away.

**The Disney-precepts table — principle → register → wave → verdict language.** This table IS the
operationalization: F8.6's animation-laws axis is judged against it, per surface, both directions
(a dead surface fails the law; a busy surface fails restraint). Registers cite the ONE disk home.

| # | principle | the glass-ui register (ONE home) | wave | verdict language (the Fable judge reads THIS) |
|---|---|---|---|---|
| 1 | **Squash & stretch** | `useLiquidFlex` volume-preserving reciprocal `--stretch` (`1+tanh(\|ṫ\|·k)·(cap−1)`, caps ≤1.18); `--scale-press` | F5.1 (`squish` channel) · F5.2 (weight-coupled cap) | Deformation on travel/press is volume-true and velocity-coupled — never a taffy-pull, never rigid. A press that does not give FAILS. |
| 2 | **Anticipation** | `--ease-cartoon-punch` negative pre-dip (`scheme-motion.css:196`) — the LOUD register ONLY | F5.3 (candidate ease) · F8.6 | The loud one-shot pulls back before launch. A plain hover/press that anticipates FAILS restraint (exaggeration is earned, not ambient). |
| 3 | **Staging** | one-color-event + one-GL-per-route budgets; W-HIERARCHY2 reading-order build; drawer `--glass-drawer-t → scrim/scale` | F8.6 | ONE motion event owns the beat; everything else is quiet. ≥2 competing simultaneous motion events on a surface FAILS. |
| 4 | **Straight-ahead vs pose-to-pose** | kf `ElementMorph` FLIP — endpoints declared, engine tweens → `useElementMorph` | F5.1 | Every state transition is two declared poses spring-interpolated by the ONE engine — never hand-keyed mid-states, never a second loop. |
| 5 | **Follow-through & overlapping action** | the per-spring 2%-band settle tail (P4 clock); `.scroll-cascade` / StoryHeader ~60ms stagger (1/φ overlap) | F5.2 (default clock) · F8.6 | Arrival trails a settle; grouped elements overlap in time, never move as one rigid block. A truncated clock (tail-jank) FAILS. |
| 6 | **Slow-in / slow-out** | the P1 split — springs are intrinsically eased (SPATIAL); `--ease-standard` bezier (EFFECTS) | F5.2 (the default leg) · F5.3 (census) | ZERO un-eased spatial state changes: the missing-transition census is closed and every row routed. A linear/instant spatial arrival FAILS. |
| 7 | **Arc** | dock hover-magnify (the canonical latent arc); morph travel — LATENT, no dedicated register | fold-candidate (NOT a lane wave) | Where an element flies (cta-receive, bloom), the travel should read curved, not a straight lerp — judged where present; a travel-arc register is booked, not owed. |
| 8 | **Secondary action** | `CompletionSeal` gold-draw + phase-palette earned-gold; the chevron BESIDE the panel reveal | F5.3 · 10.5 (the confetti fork dies; the seal is the carrier) | The garnish follows the primary and never out-shouts it. The chevron must not compete with its own panel's entrance. |
| 9 | **Timing** | the analytic per-spring clock `t_s = −ln(0.02)/(ζ·ωₙ)` (`regen-spring-tokens.mjs:85-102`); P4 pairing mandatory | W-SPRING-TIDY · 17.4 | Every sprung leg rides its OWN named clock; duration ∝ meaning. A generic `--duration-*` on a spring channel FAILS (`proof:motion-one-clock`). |
| 10 | **Exaggeration** | `--ease-cartoon-punch` ~+22% peak past the ≤10% spring fence; amplitude ∝ `--motion-weight` | F5.3 (candidate) · F8.6 | The punch appears ONLY on the loud register and scales with local weight. A punchy observer (auto-carousel, progress fill) FAILS. |
| 11 | **Solid drawing** | volume-preserving squish + the cartoon caster's coherent keyed cast + the warm identity under motion | F5.1 (`squish`) · F8.6 | Distortion is justified and volume-true; rim + cast agree mid-motion; the surface never smears or hue-shifts while moving. |
| 12 | **Appeal** | the identity itself: weight-as-DEFAULT (1/φ rest), the interruptible velocity-continuous gesture, liquid-glass warmth | F5.2 (the inversion) · F8.6 | The motion reads as ONE personality — weighty, liquid, warm, interruptible. A dead surface FAILS the laws; a busy one FAILS restraint. Both directions judged. |

What the hallmark is NOT (equally binding): not bouncy-by-default (every core spring sits in the
[0%,10%] overshoot band — the "professional pole", `springPresets.ts:59-74`); not a JS animation
library (the CSS `linear()` spring is the zero-JS floor; kf enters only where interrupt matters);
not confetti (the un-disciplined secondary-action fork DELETES at 10.5 — the seal is the keeper);
not 29 hand-wired opt-ins (F5.2 kills the allowlist disease).

---

## §2 — SOTA grounding (adopted from `research/MOTION-sota.md`; full citations there)

1. **M3 Expressive (Google, 2025-05) formalized glass-ui's P1** — spring composite tokens split into
   *spatial* (overshoot allowed) vs *effect* (high damping, no bounce) families. External validation;
   zero re-tune. ([m3.material.io/blog/m3-expressive-motion-theming](https://m3.material.io/blog/m3-expressive-motion-theming))
2. **The iOS interruptible retarget IS the `SpringProgress` re-seat** — WWDC23 "Animate with springs" +
   Wave (jtrivedi): a retargeted spring inherits its live velocity toward the new destination. This is
   F5.1's binding acceptance contract for the collapsed press-tower. Apple's
   `spring(response:dampingFraction:)` is the exact `(response, ζ)` vocabulary `SPRING_PRESETS` speaks.
   ([WWDC23 10158](https://developer.apple.com/videos/play/wwdc2023/10158/) · [Wave](https://github.com/jtrivedi/Wave))
3. **CSS `linear()` springs cannot honor velocity on interrupt** (Josh Comeau, verified) — "the CSS
   version turns around instantly, as though it hit a wall." Hence the two-tier law this spec makes
   binding: CSS `linear()` = the everywhere zero-JS floor (F5.2's default leg, the disclosure rotate);
   JS `SpringProgress` = the interruptible refinement (press, drag, morph). A CSS leg is NEVER used
   where mid-flight interrupt matters; a JS spring is NEVER minted where a fixed one-shot suffices.
   ([joshwcomeau.com/animation/linear-timing-function](https://www.joshwcomeau.com/animation/linear-timing-function/))
4. **The 2026 restraint line is unanimous** — "restraint and polish beat pyrotechnics"; excessive
   animation reads as slowness. F8.6's verdicts judge BOTH directions (dead fails / busy fails); the
   NN/g liquid-glass overuse warning is the proportion fence already in motion-canon.
5. **ζ decides the character**: ζ<1 single-overshoot (glass-ui's driver pole, 0.60-0.80 on disk),
   ζ=1 critical (gentle — the convergence register), bounce-for-playful-only. The disk table already
   sits at the professional pole; F8.6 names it, F5.2 universalizes it.

**Net (research verdict, adopted):** the architecture is at-or-ahead of SOTA. This lane's value is
OPERATIONALIZATION (F8.6), UNIVERSALIZATION (F5.2), CONSOLIDATION (F5.1), and LOCKING (17.4).

---

## §3 — First-principles design (the greenfield loop on the four contested questions)

### §3.1 — F5.2: the liquid-weight-default inversion — which property group, what opt-out, how zero-wiring

**The disease** (`MOTION-corpus.md §5`): `--motion-weight` is an allowlist (~26 read-sites), and the
default interactive spatial transition is a plain bezier — "inertia/weight/bounce on ALL motion"
(the binding user mandate) is architecturally unmet; every new surface must remember to join.

**Directions (4):**
- **(a) Keep per-recipe opt-in, sweep the stragglers.** REJECTED — patches the symptom; surface #27
  ships flat again next tranche. The allowlist IS the disease.
- **(b) A universal `* { transition: transform … }`.** REJECTED — the shorthand resets all transition
  longhands everywhere (clobbers every EFFECTS leg — the exact `.tap-squish`-clobbers-`.btn-pill`
  cascade bug CLAUDE.md records), hits non-interactive content, and fights exits (P2).
- **(c) Regen emits a NEW dedicated `--motion-spatial` spring row.** REJECTED — a second spring family
  (the GOLDEN §10 fence: ZERO new spring family); the §6 table already names `--spring-smooth` as THE
  interactive transform register.
- **(d) A zero-specificity `:where()` base rule declaring spatial LONGHANDS ONLY, reading two
  inheriting input tokens that ALIAS the generated smooth register.** **GOLDEN.** Longhands compose
  under any recipe's own declarations; `:where()` (0,0,0) loses to every authored rule, so the register
  is a FLOOR, never a fight; the alias keeps regen the single generator (drift-proof transitively, the
  `--spring-deck = var(--spring-smooth)` precedent); the input-token grammar (states/scopes write
  INPUTS, never the rule — the KS-GLASS §3.1 grammar transposed to motion) makes `.motion-calm` a
  two-line re-point.

**The GOLDEN's precise form** (ONE new authoring site, `src/styles/utilities/liquid-weight.css`,
imported in the utilities order of `index.css`):

```css
/* the register's INPUT tokens — inheriting; scopes re-point these, never the rule */
:root {
    --motion-spatial-ease: var(--spring-smooth);            /* the §6 interactive register — an ALIAS, no new family */
    --motion-spatial-clock: var(--spring-smooth-duration);  /* P4 — the spring's OWN settle clock */
}
/* the FLOOR — zero specificity; any authored transition wins; spatial LONGHANDS only (P1 held:
   EFFECTS legs keep their own --ease-standard declarations untouched) */
:where(button, [role="button"], [role="tab"], [role="option"], [role="menuitem"],
       [role="switch"], [role="checkbox"], [role="radio"], [role="slider"],
       summary, a[href], input, select, textarea) {
    transition-property: transform, scale, translate, rotate;
    transition-timing-function: var(--motion-spatial-ease);
    transition-duration: var(--motion-spatial-clock);
}
/* the structural EXIT GUARD (P2 by construction, not by sweep) — a closed/hidden-direction spatial
   change re-points the INHERITING ease input to the no-overshoot exit register; reaches the subtree */
:where([data-state="closed"], [hidden]) {
    --motion-spatial-ease: var(--ease-out);
}
/* the explicit calm opt-out — a scope re-points the inputs AND zeroes the deformation scalar */
.motion-calm {
    --motion-spatial-ease: var(--ease-standard);
    --motion-spatial-clock: var(--duration-fast);
    --motion-weight: 0;
}
```

**The six sub-questions, decided:**
- **Which property group:** exactly `transform, scale, translate, rotate` — the compositor spatial
  longhand set. NEVER a layout property (`proof:no-layout-animation` untouched); NEVER `filter`/
  `opacity` (EFFECTS — P1). `--*` custom-property drives keep their own per-recipe pairing.
- **The JS-driver lock (the floor NEVER fights its own lane's engines — critique C1, BINDING):** the
  F5.1 press/drag/morph engines write `scale`/`translate`/`transform` INLINE per rAF frame
  (`useLiquidPress.ts:29` pressStyle, `Button.vue:114`, the `useDragMorph` consumers); an always-on
  floor transition on those channels stacks a ~360ms CSS lag on the live JS spring — the EXACT
  restart bug `useLiquidPress.ts:4-9` documents as the reason the JS path exists. Resolution (b) of
  the critique's three, adopted and NAMED as an F5.1 edit: while ENGAGED, every JS spatial driver
  sets inline `transition-property: none` on its target (inline style beats the 0,0,0 floor AND any
  Tailwind `transition*` utility) and restores it on settle — ONE shared helper
  `lockSpatialTransition(el): release`, exported from `useElementMorph.ts` (three consumers at
  birth: the engine's own step loop, `useLiquidPress`, `useDragMorph` — J-inv-10 met). The F5.2 gate
  asserts it: a cohort element under an engaged driver computes `transition-property: none`; a
  planted lock-less driver REDs (the self-test bite).
- **The `.motion-calm` shape:** an input RE-POINT plus `--motion-weight: 0` — both curve and
  deformation die together in one class, inheriting to the whole subtree (the driver-vs-observer rule
  as a scoped var, GOLDEN §2a). The `<Card>` calm register becomes this EXPLICIT class **on the
  non-`:pressable` default ONLY — a `<Card :pressable>` (W-PRESS-UNIFY) OMITS it (its `useLiquidPress`
  squish reads the rest weight; the calm class would collapse the shipped press cap — critique C3)**;
  the observer cohort (auto-carousel content, list-reorder-under-scroll, progress fill — GOLDEN §4
  table) carries it.
- **The exit guard is STRUCTURAL (P2), not a manual sweep-promise:** the floor's ease input re-points
  to `--ease-out` under `:where([data-state="closed"], [hidden])` (the inheriting input reaches the
  subtree), so a closed-direction transform lacking a wrapping `<Transition>` can never inherit the
  overshooting arrival by construction. The sweep's exit-arm is BINDING on the residue the attribute
  cannot see (`v-show` class toggles, bespoke `.is-closed` classes) — enumerated per surface in the
  sweep artifact, each routed authored-recipe or guard-attr (critique C5).
- **PRM interplay:** the register needs NO own PRM arm — the existing universal carve wins by
  `!important` (`a11y-overrides.css:7-14` duration snap on `*:not([data-allow-motion])`) and
  `--motion-weight: 0` under reduce (`scheme-motion.css:360`) zeroes every weight-coupled cap
  site-locally (the spike-corrected §2b mechanism: caps are `1 + k·var(--motion-weight)` derived AT
  the consuming element). Safe by construction; the gate asserts the carve reaches the new rule.
- **Zero-wiring inheritance (the reach claim, CORRECTED — critique C2):** a NEW surface built from
  any interactive element/role primitive is INSIDE the `:where()` cohort by construction — no import,
  no class, no recipe edit. BUT the floor is 0,0,0, and a Tailwind
  `transition`/`transition-transform`/`transition-all` UTILITY is a class (0,1,0) that sets
  property + ease + duration (150ms ease-in-out) and WINS over it — so the floor ALONE reaches only
  utility-free cohort elements. The honest inversion statement: **alive unless a `transition*`
  utility or `.motion-calm` opts out** — and deliverable 3's sweep re-authors EVERY `transition*`
  utility on a cohort element (not merely `transition:` colon-shorthands), so at close each residual
  opt-out is a deliberate calm verdict, never an accident. The Accordion chevron
  (`transition-transform duration-200`, `AccordionTrigger.vue:35`) is the named example the floor
  CANNOT reach — only the sweep/F5.3 rewrite fixes it.

**Self-challenge (rounds 1-3 as originally run; round 4 is the critic-forced pass — kept as the loop
record):** (1) Does the floor fight recipes that declare `transition:` SHORTHANDS (which reset the
spatial longhands)? Yes where they exist — the sweep hunts them. **Round 4 (C2): the LARGER clobber
is the Tailwind `transition*` UTILITY class**, not the colon-shorthand — it wins at 0,1,0 and is the
dominant transform-transition vector in a Tailwind-v4 codebase; the sweep's scope is therefore ANY
`transition*` utility on a cohort element (deliverable 3, widened), and the house longhand mandate
(the atlas-flip precedent) is restated: interactive recipes author transitions as LONGHANDS.
(2) Does a pointer-TRACKED transform (specular follow) get wrongly sprung? No — those write custom
properties, not `transform`. **Round 4 (C1): the question the first pass stopped short of — the
DIRECT JS `transform`/`scale` writers (press, drag, morph) sit IN the cohort and would get a CSS
transition stacked on every rAF write.** Resolved by the driver lock (the decided bullet above), not
by channel disjointness (the disjoint set is nearly empty — press writes `scale`, drag `translate`,
morph `transform`). (3) Exits (P2 no-overshoot)? **Round 4 (C5): structural, not manual** — the
closed-state guard re-points the ease input; authored `<Transition>` declarations override the floor;
the sweep's exit-arm binds only the enumerated residue. (4) Contrived? No — one file, two input
tokens, one floor, one exit guard, one opt-out, one driver lock: still the smallest rule-set that
makes the mandate structural.

### §3.2 — F5.1: the ONE `useElementMorph` API

**The disease** (`MOTION-corpus.md §3`, D6 F1/F2): three shipped composables — `useLiquidReveal`
(285L), `useDockCtaReceive` (349L), `useBloomUp` (449L) — EACH `new ElementMorph()` + a hand-rolled
rAF `step()`; the copy-paste is self-admitted (`useLiquidReveal.ts:72` "kept byte-shape so the bloom
family reads as ONE"). Plus a 3-tier press tower (`useSpring`→`useSpringPress` 106L→`useLiquidPress`
222L) exposing two public press faces.

**Directions (3):**
- **(a) Extract a shared `step()` helper, keep three engines.** REJECTED — three `ElementMorph`
  instances and three PRM paths survive; the drift vector is untouched.
- **(b) An imperative `MorphController` class.** REJECTED — off the composable idiom; every consumer
  is an SFC; lifecycle/scope-dispose comes free only in a composable.
- **(c) ONE composable, declarative channels, thin wrappers.** **GOLDEN** — the textbook one-engine/
  N-forms shape every SOTA engine (Wave, Framer Motion, Reanimated) converged on.

**The GOLDEN API** (`src/composables/motion/useElementMorph.ts`, `/motion` barrel — kf-bearing,
never root):

```ts
type MorphEndpoint = MaybeRef<HTMLElement | ComponentPublicInstance | null> | (() => DOMRect) | "self";
interface MorphChannels {
    opacity?: boolean | { from: number; to: number };   // coupled fade (P3)
    blur?: boolean | { px: number };                    // filter blur-settle — filter, never backdrop-filter
    color?: { var: string; from?: string; to?: string };// the bloom --glass-ambient-hue write
    squish?: boolean | { cap?: number };                // couples useLiquidFlex onto the FLIP travel
}
// NO spawn key (critique C4): its only consumer (the celebration petal) deletes at 10.5 — a reserved
// key with no consumer is J-inv-10 speculative substrate. BOOKED as a fold-candidate; re-enters only
// WITH a bound consumer, as an additive MorphChannels widen.
export function useElementMorph(
    surface: MorphEndpoint,
    options: {
        from?: MorphEndpoint;            // default "self" (reveal: FLIP-invert from settled)
        to?: MorphEndpoint;              // the foreign target (cta: fly onto a dock control)
        direction?: "in" | "out";        // in = 1→0 FLIP inversion (arrive); out = 0→1 (depart)
        channels?: MorphChannels;
        preset?: SpringPresetName;       // sampled via springPreset(name) — NEVER inline (response,ζ)
        origin?: "from" | "to" | "center" | string;  // transform-origin resolution
        respectReducedMotion?: boolean;  // default true — the ONE PRM snap (endpoint + fade survives)
        onSettled?(): void;
        onHandoff?(): void;              // the cta [data-cta-pending] seat hand-off seam
    }
): { play(): void; cancel(): void; playing: Readonly<Ref<boolean>>; progress: Readonly<Ref<number>> };
```

Internals: ONE `new ElementMorph`, ONE rAF `step()` driven by `SpringProgress` (velocity-continuous
re-seat preserved — a `play()` mid-flight retargets, never restarts: the WWDC23/Wave contract is the
acceptance bar), ONE compositor-only invariant (transform/opacity/filter/`--*`), ONE PRM snap. The
module ALSO exports **`lockSpatialTransition(el): release`** — the §3.1 driver-lock seam: an engaged
driver sets inline `transition-property: none` on its target (beating the F5.2 floor and any Tailwind
`transition*` utility) and releases on settle; the engine's own step loop holds it for every play.
`asElement` HOISTS to `src/composables/motion/asElement.ts` (today private at
`useDockCtaReceive.ts:170`) — every wrapper imports it; the component-ref crash class closes.

**The wrapper contracts (byte-identical PUBLIC APIs, clean-break internals, each ≤20 lines of config):**

| wrapper | becomes | channels |
|---|---|---|
| `useLiquidReveal(surface, {trigger, preset, blur})` | `useElementMorph(surface, {direction:"in", from: trigger ?? "self", channels:{opacity, blur}, origin:"from"})` | opacity + blur |
| `useDockCtaReceive(cta, {dockControl, …, onReceived})` | `useElementMorph(cta, {direction:"out", to: dockControl, channels:{opacity, blur}, onHandoff: onReceived})` + the `setPending`/`clearPending` seat writes (kept verbatim) | opacity + blur + seat |
| `useBloomUp(surface, {source, …})` | `useElementMorph(surface, {direction:"in", from: source, channels:{opacity, blur, color:{var:"--glass-ambient-hue"}}})` | + color |

**The press-tower collapse:** `useLiquidPress` gains `{ squish?: boolean (default true), pressVar?:
string }`; Button re-points `useSpringPress` → `useLiquidPress({ squish:false, pressVar:
"--glass-btn-press-t" })` — the drive name, the coupled-legs contract, and the interruptible re-seat
are BYTE-IDENTICAL (build-map R16 WATCH-3); `proof:button-glass` B2 re-points to the unified leaf.
`useSpringPress` goes DEFINITION-ABSENT (clean break, MIGRATION row).

**Self-challenge:** (1) Is `spawn` speculative? YES — the round-1 answer ("reserved-but-absent")
was itself the J-inv-10 violation (critique C4): a reserved optional key with no consumer and no
engine branch IS speculative substrate. `spawn` is DROPPED from the shipped interface entirely and
BOOKED as a fold-candidate note for the orchestrator — the clean-break discipline applied to the
spec's own API, same as everything else. (2) Does
the cta's foreign-target measure fit one loop? Yes — `to` as endpoint + `origin:"to"` reproduces the
FORWARD play; the seat writes stay wrapper-local (they are data-attr writes, not motion). (3) Does
collapsing kill the family gates? They fold into ONE `proof:motion` `element-morph-single` arm — the
F8.1 family-consolidation direction, not a loss of teeth.

### §3.3 — F5.3: the disclosure arrival-ease decision frame (Fable-at-build decides; here are the criteria)

**The disease** (`MOTION-corpus.md §6`, B6 F1): the SAME chevron gesture ships THREE registers —
Select `[transition:rotate_var(--spring-snappy-duration)_var(--ease-cartoon-punch)]`
(`SelectTrigger.vue:138`), Configurator `transform var(--duration-fast) var(--spring-snappy)` — the
WRONG clock (`ConfiguratorLayer.vue:203`), Accordion `transition-transform duration-200` — a FLAT
bezier, invisible to the gate (`AccordionTrigger.vue:35`).

**The register shape (decided, not contested):** ONE `@utility transition-disclosure` reading an
input pair `--disclosure-ease` / `--disclosure-clock` (the §3.1 input-token grammar; consumer retunes
once at `:root`). All three sites collapse in one edit; any future caret (DropdownMenu, NumberField
stepper) reads it. ≥2-consumer bar met at birth (3 sites).

**The contested half — WHICH arrival ease. Candidates (Fable judges on the DesignSync card set):**
- **(a) `--ease-cartoon-punch` @ `--spring-snappy-duration`** — the shipped Select form: anticipation
  dip + ~+22% punch on a 180° rotation.
- **(b) `--spring-snappy` @ `--spring-snappy-duration`** — the calm-weighty CONTROL register
  (0.48/0.74, +3.2% overshoot, arrives at half-clock).
- **(c) `--spring-bouncy`** — REJECTED pre-judgment: a disclosure is a high-frequency micro-gesture,
  not an emphatic one-shot (the bouncy register's own comment names dialog/success/seal).

**The decision criteria (binding on the Fable-at-build judgment):**
1. **Telos (law 8 — secondary action):** the chevron is the GARNISH beside the panel's own entrance
   (the panel reveal is the primary event). The chosen ease must not out-shout the panel — judge the
   pair TOGETHER on each card, not the chevron alone.
2. **Frequency (the restraint line):** a disclosure fires on every open/close. Anticipation+punch on
   a high-frequency gesture risks reading manic (law 10's verdict: exaggeration is earned). If (a)
   wins, it must survive ten consecutive open/close cycles without reading busy.
3. **Amplitude:** 180° is a LARGE spatial travel — overshoot is visible at the glyph tip. The +22%
   punch overshoots ~40° past vertical; the +3.2% snappy ~6°. Judge at real glyph size (16px), not
   zoomed.
4. **Weight coupling:** whichever wins, the amplitude reads through the local `--motion-weight`
   (a `.motion-calm` menu keeps a quieter chevron for free).
5. **One register, all three surfaces:** the SAME choice binds Accordion + Select + Configurator —
   a per-surface split is a FAIL of the wave's whole point.

DesignSync surface: the 3 disclosure surfaces × both candidates × both modes as ONE card set; the
non-authoring Fable instance files the verdict + the chosen pair lands as the `:root` defaults.

**Self-challenge:** does hard-coding either candidate now save a round-trip? No — the Select's shipped
cartoon-punch and the corpus's restraint line genuinely pull opposite; this is exactly the gestalt
call the Fable arm exists for (the plan row says so). The spec's job is the frame, not the pick.

### §3.4 — F8.6: how 12 laws become ACCEPTANCE LANGUAGE (not N gates)

**Directions (3):**
- **(a) Twelve mechanical `proof:*` clauses.** REJECTED — the plan forbids the `proof:aristotelian`
  singleton for cause: grep-able law PRESENCE ≠ felt weight; N gates invite N evasions and judge
  nothing (the P-1 close-class lesson — a per-mechanism π cannot verify a gestalt).
- **(b) One numeric composite "motion score".** REJECTED — a scalar hides WHICH law failed, invites
  metric-gaming, and cannot express the two-directional restraint judgment.
- **(c) A per-surface 3-axis VERDICT filed by a non-authoring Fable judge, with the §1 table as the
  animation-laws rubric; the ONLY machine arm is `edict-verdict-present` on `proof:meta`.** **GOLDEN.**

**The verdict template (one file per enrolled roster surface,
`docs/tranches/BG/audit/edict-verdicts/<surface>.md`):**

```md
# <surface> — 3-axis edict verdict (BG.W-ARISTOTELIAN-PROPORTION)
telos: <one line — what this surface's motion is FOR (its Aristotelian end)>
capture: <fresh capture path(s), both modes>
axis-1 √φ-proportion: PASS|FAIL — <the proportion evidence: ladder rungs, 1/φ rest weight, spacing>
axis-2 animation-laws: PASS|FAIL — exercised: [#s from the §1 table]; violated: [#s + why];
  restraint-check: <≤1 competing motion event — the busy-failure judged EXPLICITLY>
axis-3 technicolor-cartoon-punch: PASS|FAIL — <the loud register present where telos demands it,
  ABSENT where the telos is calm — both directions>
verdict: PASS | FAIL(<axis>) — <one surface-specific sentence; boilerplate is a filing failure>
```

The Aristotelian framing is the rubric's spine: each surface's motion is proportioned to its telos —
a press is small, a completion is loud, an observer is still. `--motion-weight`'s driver-vs-observer
centroid (GOLDEN §1/§4) IS that proportioning made mechanical, so axis-2 verdicts cite the local
weight scope as evidence. `proof:meta`'s `edict-verdict-present` clause asserts: every enrolled
roster surface has a verdict file · every file carries all 3 axes + a telos line + a restraint-check ·
no two verdict rationales are byte-identical (the anti-boilerplate floor). Nothing else is machine —
the judgment is Fable's, which is the point.

**Self-challenge:** is a text-file gate gameable? The anti-boilerplate floor + the
capture-path-resolves-on-disk floor (the ba-gestalt anti-evasion clause, verbatim) are the two
STRUCTURAL counters. The non-authoring-judge requirement is a PROCESS CONVENTION, not a structural
counter (critique C7): the machine arm carries no author≠judge check — deliberately, since the
spec's own thesis is that the judgment is Fable's, not machine's. Named as convention here so the
claim matches the mechanism.

---

## §4 — Wave binding (per-wave perfected specs, in DAG order)

**The lane DAG:** 10.5 dead-cut ⇄ F5.1 SPINE (co-sequenced — one atomic pair: the `useMorphField` gut
→ `morphSignatures.ts` → worm re-point) → W-SPRING-TIDY → F5.2 WEIGHT-DEFAULT → F5.3 DISCLOSURE →
17.4 CONGRUENCE (lock, anytime after) · F8.6 (after F8.2/F8.3, judges the built state).

### 10.5 · `W-DEAD-COMPOSABLE-CUT` (H — the motion-side dead-cut, owned ONCE)

**What the perfected spec ADDS:** the disk-verified disposition table + the ownership reconcile +
the worm WATCH as an explicit gate clause.

- **DELETE + MIGRATION-per-symbol** (each grep-gated to 0 residual refs, JS + CSS + api surface):
  `useHaptic` (`motion/core/useHaptic.ts`; un-export from `index.ts` + `api/index.ts`) ·
  `useCelebrationBurst` (261L) + `jubilance.css` (corrects the false "2 consumers" 12.2 KEEP — 0
  `.vue` consumers on disk) · `useVizChoreography` (grep ∅ already; 6.4 verifies DEFINITION-ABSENT) ·
  `useLiquidMorph` (462L) + `glass/liquid-morph.css` — **WATCH: `liquid-morph.css:34-35,64-69` carries
  the LIVE `--glass-ambient-*` reads (KS-GLASS critique C1)** — the ambient tint-input reads RE-HOME
  to a surviving glass partial before the file deletes; the delete must not sever the live axis ·
  the 3 lying consumer-evidence docs (`use-haptic`/`use-celebration-burst`/`use-viz-choreography.md`).
- **FOLD:** `useScrollPin` → a `mode:"pin"` on `useScrollScene` (D6 FC6a; `useScrollPin`
  DEFINITION-ABSENT). **GUT:** `useMorphField` (468L) → `src/composables/motion/morphSignatures.ts` —
  ONLY the pure neck-signature math survives; `usePagerWorm` + `useCarouselWorm` re-point onto it.
  **The pager/carousel WORM is VERIFIED-GOOD (B6) — its gate clause:** the worm's barbell-neck
  silhouette π is byte-identical before/after the gut (a worm regression REDs the cut).
- **OWNERSHIP RECONCILE (flagged):** plan rows 4.3 and 10.5 BOTH claim `useDockContextSilhouette` —
  4.3 says "SOLE owner — 10.5 must NOT double-own"; 10.5's list includes it. **This spec assigns the
  DELETE to 4.3** (per its explicit sole-owner clause + its "AFTER Siri 8.x" sequencing); 10.5 carries
  it as a VERIFY-ABSENT row only (the 6.4 pattern). `AppSwitcher.vue` retires WITH the 4.3 delete.
  Flagged to the orchestrator (open question) — the two rows cannot both own it.
- **Gate (`proof:motion` `dead-cut` arm):** per-symbol DEFINITION-ABSENT grep · MIGRATION row present
  per public symbol · the worm-π byte-parity clause · the ambient-read re-home assert (the
  `--glass-ambient-*` reads survive somewhere in `src/styles/`). **No Fable/DesignSync** (structural;
  the worm π is the paint backstop). **Paint close:** the worm frame-series byte-parity capture.

### F5.1 · `W-MOTION-SPINE` (P — one engine, N thin forms; co-sequenced with 10.5)

**Deliverables (per §3.2):**
1. **NEW `src/composables/motion/useElementMorph.ts`** — the ONE FLIP engine (API §3.2): one
   `ElementMorph`, one rAF `step()`, one PRM snap, `springPreset(name)`-sampled, compositor-only;
   exports `lockSpatialTransition(el)` — the F5.2 driver-lock seam (§3.1 C1), held by the engine's
   own step loop for every play.
2. **NEW `src/composables/motion/asElement.ts`** — hoisted resolver; all wrappers import it.
3. **The three wrappers re-authored** as ≤20-line configs (byte-identical public APIs — the table in
   §3.2); zero `new ElementMorph`/rAF outside the engine.
4. **Press-tower collapse:** `useLiquidPress` gains `squish:false` + `pressVar`; Button re-points;
   `useSpringPress` DEFINITION-ABSENT + MIGRATION row; `proof:button-glass` B2 re-pointed.
   `useLiquidPress` acquires `lockSpatialTransition` while pressed (inline
   `transition-property: none` — no CSS transition ever stacks on the live JS `scale`, §3.1 C1).
5. **DEFINITION-ABSENT with 10.5:** `useScrollPin`, `useGooMorph` (its neck math lands in
   `morphSignatures.ts`; the goo-filter id reads move with it).
6. **Gate collapse:** `proof:liquid-reveal`/`-bloom-up`/`-dockmorph-cta`/`-press-unify` retire into
   `proof:motion` arms: `element-morph-single` (exactly ONE `new ElementMorph(` + ONE step loop under
   `src/composables/motion/` — born-RED at 3 today; wrappers carry no loop) · `press-reseat` (a unit
   test retargets mid-flight and asserts velocity continuity — the WWDC23 contract, §2.2) ·
   `wrapper-parity` (each wrapper's public option surface unchanged — a type-level assert) · + a
   self-test bite per arm.
7. **Fable arm / DesignSync:** the reveal/cta/bloom frame-series as ONE motion card set (both modes);
   Fable confirms the collapsed engine's arrivals are byte-equivalent in feel — any drift is a finding.
   **Paint close:** the frame-series π (reveal bloom · cta fly-on + seat · bloom-up color ramp),
   byte-parity at defaults vs the pre-wave captures.

### W-SPRING-TIDY · `BG.W-SPRING-REGISTER-TIDY` (H — hygiene; the "table→6" phrasing RECONCILED)

**The frozen row says "table→6"; disk contradicts "dead"** (`MOTION-corpus.md §7`): the 3 `timeline-*`
rows are LIVE JS authorities (`ScrubberTimeline.vue` calls `springPreset("timeline-*")`); only their
GENERATED CSS twins (`--spring-timeline-*`) have zero readers. **Adopted resolution (Option A,
flagged to the orchestrator):** the JS table stays NINE; `regen-spring-tokens.mjs` gains a per-row
`emitCss: false` flag; the three timeline rows set it → the dead CSS twins vanish, "table→6" becomes
"CSS-EMITTED rows → 6". Option B (migrating ScrubberTimeline to inline `(response,ζ)`) is REJECTED —
it mints a second authority against motion-canon P7's SPRING_DEFAULTS rule.
**Protected-set SCOPE (stated precisely — critique C6):** this spec reads SYNTHESIS §4 as freezing
the `(response, ζ)` VALUE table (all nine rows), the six core rows' EMITTED CSS OUTPUT (the
`--spring-<name>`/`-duration` pairs byte-identical), and the analytic clock derivation — NOT the
script's literal text. The `emitCss` flag is nonetheless a script MECHANISM edit, so the wave HOLDS
on an explicit orchestrator fence-lift ACK (the §0.1 flag made binding, not implicit). If the
orchestrator instead reads the fence as script-bytes-frozen, the named fallback is a post-generation
strip step OUTSIDE regen (the generated file filtered before write-through; the script untouched) —
same six-pair output, zero mechanism edit.
**Deliverables:** the `emitCss` flag + regen run + `--spring-timeline-*` CSS ABSENT from
`scheme-motion.css` + the sync-gate re-snap. **Gate:** `proof:motion` `spring-tokens-synced` arm —
6 CSS-emitted pairs (`--spring-<name>` + `-duration`), 9 JS rows, zero `--spring-timeline-*` in CSS,
the regen round-trip byte-stable. **No Fable/DesignSync** (zero paint). **Clean break:** the twins
delete with no alias.

### F5.2 · `W-LIQUID-WEIGHT-DEFAULT` (P — the inversion; the lane's highest-leverage wave)

**Deliverables (per §3.1):**
1. **NEW `src/styles/utilities/liquid-weight.css`** — the input pair `--motion-spatial-ease`/
   `--motion-spatial-clock` (aliases onto the GENERATED `--spring-smooth`/`-duration` — regen stays
   the single generator, no new family) + the `:where()` interactive-cohort floor (spatial LONGHANDS
   only) + the structural EXIT GUARD (`:where([data-state="closed"], [hidden])` re-points
   `--motion-spatial-ease: var(--ease-out)` — P2 by construction, §3.1) + `.motion-calm` (the input
   re-point + `--motion-weight: 0`).
2. **The observer cohort classed:** auto-carousel content · list-reorder-under-scroll · progress
   fill · `<Card>` (the calm content plate — bound on the NON-`:pressable` default ONLY; a
   `<Card :pressable>` omits the class so its W-PRESS-UNIFY squish keeps the rest weight, §3.1 C3)
   gain `.motion-calm` explicitly — the GOLDEN §4 table made markup-visible (absorbs 10.10 + 10.24
   per the row).
3. **The clobber sweep — shorthands AND Tailwind `transition*` utilities (C2, widened):** interactive
   recipes carrying `transition:` shorthands OR the `transition`/`transition-transform`/
   `transition-all` utility classes re-author as longhands on the register OR record a calm verdict.
   The utility class is the DOMINANT clobber vector (0,1,0 beats the 0,0,0 floor); the Fable
   storybook sweep enumerates every cohort surface carrying either form.
4. **The driver-lock wiring completes (C1):** `useDragMorph` acquires `lockSpatialTransition` while
   dragging (the F5.1-minted seam; `useElementMorph` + `useLiquidPress` already hold it) — the floor
   lands only WITH all three drivers locked.
5. **Gate (`proof:motion` `liquid-weight-default` arm, born-RED today):** the register file exists
   with the floor rule spatial-longhands-only · the ease input resolves a `linear(` spring at
   computed-style on a bare `<button>` · `.motion-calm` present + re-points both inputs · the exit
   guard present + a cohort element under `[data-state="closed"]` resolves the no-overshoot exit
   ease · an ENGAGED JS driver's target computes `transition-property: none` (the lock clause — a
   planted lock-less driver REDs, the self-test bite) · the PRM carve reaches the floor (the
   `!important` duration snap wins) · a planted `transition: all` on an interactive recipe REDs
   (the un-scopable-all bite, shared with `proof:no-layout-animation`).
6. **THE BINDING VERDICT IS THE FABLE STOREBOOK SWEEP (the row is explicit):** a non-authoring Fable
   instance sweeps the FULL storybook before/after — files, per surface: gains-weight-correctly ·
   should-opt-calm (a finding → `.motion-calm` lands) · clobbered (shorthand OR `transition*`
   utility — a finding → longhand re-author) · exit-at-risk (the guard-residue arm, BINDING: every
   `v-show`/bespoke-class exit surface enumerated + routed). The sweep artifact commits beside the
   wave; DesignSync surface: the before/after weight sweep across the storybook, both modes.
   **Paint close:** the sweep's paired captures + the press/hover frame-series on 3 representative
   atoms (button, chip, menu-row) showing the sprung spatial leg AND the un-lagged JS press (the
   lock holding); observers byte-still.

### F5.3 · `W-DISCLOSURE-ROTATE` (P — chevron register + detector widen + census)

**Deliverables (per §3.3):**
1. **NEW `@utility transition-disclosure`** (home: `src/styles/utilities/liquid-weight.css`, beside
   the register it refines) reading `--disclosure-ease`/`--disclosure-clock` (`:root` defaults = the
   Fable-decided §3.3 pair; PRM inherits the universal carve).
2. **The three sites collapse in one edit:** `AccordionTrigger.vue:35` (the flat `duration-200` dies) ·
   `SelectTrigger.vue:138` (the bracket-arbitrary form dies) · `ConfiguratorLayer.vue:203` (the wrong
   `--duration-fast` clock dies — this SUPERSEDES 17.4's configurator-chevron clock booking, one edit
   resolves both). Any DropdownMenu/NumberField caret joins.
3. **`detectAbruptSpatial` WIDEN — a CASE ROW on `proof:spring-ease`, never a forked gate:** the
   current `declRe` (`proof-spring-ease.mjs:539`) sees only CSS colon-declarations; add the `.vue`
   template-class scan (`transition-transform` · `transition-[…transform…]` ·
   `[transition:(rotate|scale|translate|transform)…]` · `duration-N`/`ease-*` on a
   `data-state`/`group-data-*` transform toggle), extending the `ABRUPT_SPATIAL_PENDING` bridge shape
   (`:387`). Born-RED (the Accordion is the first catch) → GREEN at the register landing — the
   red-window bounded by landing gate+register in the same wave (the WS7→WS12 precedent).
4. **The missing-transition CENSUS:** `docs/tranches/BG/audit/W-DISCLOSURE-ROTATE-census.md` —
   every `src/components/**` state change that paints with ZERO motion (`v-if`/`v-show` swaps, class
   toggles, `data-state` flips), each row routed: spring-iff-spatial · effects-bezier · "instant by
   design" with rationale (the NAV-vs-FEATURE positive-allowlist pattern; the closed set makes
   law 6's "UNIVERSAL" decidable and F8.6's axis-2 auditable).
5. **Gate (`proof:motion` `disclosure-single-register` arm):** the utility exists ONCE · all three
   sites compose it · zero divergent chevron transitions (a planted 4th register REDs) · the census
   file present with every row dispositioned. **Fable arm / DesignSync:** the §3.3 candidate card set
   (3 surfaces × 2 candidates × both modes) — Fable decides the arrival ease and files the verdict.
   **Paint close:** the chevron frame-series on all three surfaces resolving the SAME computed
   ease+clock; the panel+chevron pair judged together (law 8).

### 17.4 · `W-ANIMATION-CONGRUENCE` (P — the one-clock LOCK; distinct axis, not folded)

**Deliverables:** `proof:motion-one-clock` A9-locked as the WHICH-engine/WHICH-clock/WHICH-exception
axis (disjoint from `proof:animation-coherence` register tier + `proof:no-layout-animation`
compositor tier): M1 no second hand-authored `(response,ζ)` TABLE · M2 no un-sanctioned off-spine
spring/rAF (the two sanctioned seams: `usePointerVelocityField`, `useDragMorph` — motion-canon P7
`:162-184`) · M4 the viz FEED-don't-OWN inversion · M5 the gate and P7 name the SAME allowlist ·
`getAnimations()`-per-node congruence (a node's running animations agree on clock family). Plus the
post-F5.1 reconcile: the clock-pair table (`proof-motion-one-clock.mjs:174-228`) DROPS the
configurator-chevron booking (F5.3 superseded it) and the SPRING_DEFAULTS allowlist DROPS
`useSpringPress` (DEFINITION-ABSENT at F5.1).
**THE SEQUENCING FLAG (binding):** `docs/precepts/` is a READ-ONLY submodule — P7's stale rows
(`useSpringPress (0.25,0.7)` default · `DOCK_SPRING (0.32,0.7)` literal · the `useDragMorph`
snap-re-roll text, already excised on disk by BH.B2.4's native `DragOptions.snap`) CANNOT be edited
from this repo. M5 cross-checks gate↔canon name the same set, so 17.4 must either (a) land AFTER the
precepts-side reconcile ships (the BH.B4c-class wave — flagged), or (b) carry a dated
`CANON_PENDING_RECONCILE` bridge entry naming the three stale rows (the ABRUPT_SPATIAL_PENDING
shape), removed when the submodule bumps. **(b) is adopted** so the lock is not hostage to a foreign
repo's cadence. **No Fable/DesignSync** (a lock, zero paint). **Paint close:** none owed — the π is
the congruence probe itself.

### F8.6 · `W-ARISTOTELIAN-PROPORTION` (P — the acceptance LANGUAGE; after F8.2/F8.3)

**Deliverables (per §3.4):** the verdict template + the enrolled-roster verdict files at
`docs/tranches/BG/audit/edict-verdicts/` · the §1 twelve-law table is the axis-2 rubric (this spec is
its home; the verdicts cite it by row #) · `proof:meta` `edict-verdict-present` clause (all-3-axes +
telos + restraint-check + anti-boilerplate + capture-resolves-on-disk) with a self-test bite (a
planted 2-axis verdict REDs; a byte-duplicated rationale REDs). **Fable arm:** a NON-AUTHORING Fable
judge files every verdict against FRESH captures (the author of a motion wave never judges it).
**DesignSync surface:** the full enrolled roster, both modes. **Paint close:** the verdicts ARE the
close — each PASS anchored to a resolving capture; any FAIL routes a finding to its owning family.

---

## §5 — Precepts conformance (explicit checks)

- **The protected set (SYNTHESIS §4):** `SPRING_PRESETS` (all nine disk rows) + per-spring clocks
  BYTE-IDENTICAL; the scope this spec reads (stated at §4 W-SPRING-TIDY, C6): VALUES + the six core
  rows' EMITTED OUTPUT + the clock derivation are the frozen things — the `emitCss` script edit
  re-tunes ZERO values and HOLDS on an explicit orchestrator fence-lift ack (fallback: the
  post-generation strip, script untouched); DOCK_SPRING untouched as `springPreset("dock")` =
  {0.68, 0.64} (§0 — the derivation IS the frozen thing); wave 4.10 W-DOCK-INPLACE-MORPH is never
  named by any deliverable here (VERBATIM held). ✔
- **motion-canon P1:** F5.2's floor declares SPATIAL longhands only; EFFECTS legs keep their bezier
  declarations untouched — the split is preserved BY the rule shape, not by discipline. ✔
- **P2 (exit no-overshoot):** STRUCTURAL — the closed-state guard re-points the floor's ease input
  to `--ease-out` under `:where([data-state="closed"], [hidden])`; authored `<Transition>` recipes
  override the floor; the F5.2 sweep's exit-arm is BINDING over the enumerated residue
  (`v-show`/bespoke-class exits). ✔
- **P3 (fade-coupled):** `useElementMorph` couples opacity/blur channels on the ONE spring drive. ✔
- **P4 (per-spring clock):** `--motion-spatial-clock` = `var(--spring-smooth-duration)`;
  `--disclosure-clock` pairs its ease's own clock; the Configurator's `--duration-fast` mismatch dies
  at F5.3. ✔
- **P5 compositor-only + P6 PRM:** every mechanism is transform/scale/translate/rotate/opacity/
  filter/`--*`; `proof:no-layout-animation` untouched; PRM = the existing `!important` carve + the
  one-line `--motion-weight: 0` zeroing all deformation site-locally (the spike-corrected §2b cap
  law); `useElementMorph` owns the ONE PRM snap; fades survive. ✔
- **P7 (one source, one clock):** F5.1 REDUCES the engine count (3 loops → 1); the two sanctioned
  off-spine seams are NOT collapsed; 17.4 locks the axis with the CANON_PENDING_RECONCILE bridge for
  the read-only-submodule drift (§4.17.4). ✔
- **tunable-anim:** no new tunable-clock control (T2 — clocks stay derived); the boundary law holds
  (curve MATH = value.js · playback = kf · component = glass-ui); `--motion-spatial-*` and
  `--disclosure-*` are indexed input tokens (T1). ✔
- **Clean breaks:** `useSpringPress`/`useScrollPin`/`useGooMorph`/`useHaptic`/`useCelebrationBurst`/
  `useLiquidMorph`/`useVizChoreography` DEFINITION-ABSENT with MIGRATION rows; the `--spring-timeline-*`
  CSS twins delete no-alias; wrapper PUBLIC APIs byte-identical (a rename-free collapse). ✔
- **≥2-consumer (J-inv-10):** `useElementMorph` = 3 wrappers + Button's press path · the F5.2 floor =
  the whole interactive cohort · `transition-disclosure` = 3 sites at birth · `morphSignatures.ts` =
  2 worm composables · `lockSpatialTransition` = 3 drivers at birth (engine + press + drag) · `spawn`
  DROPPED from the shipped interface and BOOKED (C4 — no reserved key ships; re-enters only WITH a
  bound consumer). ✔
- **Presets-in-consumers / warm identity / no-gray:** no consumer hue enters any token here; motion
  never shifts hue (law 11's verdict); the loud register's amplitude is weight-scaled, never
  color-forked. ✔
- **Liquid-weight UNIVERSAL (the binding user mandate):** F5.2 is its structural fulfillment — weight
  is the default; the explicit opt-outs are `.motion-calm` OR a swept, deliberate `transition*`
  utility (C2 — the sweep converts every accidental utility clobber into a longhand re-author or a
  recorded calm verdict); new utility-free surfaces inherit with zero wiring. ✔
- **Overhead floor / gates-as-family-arms:** every clause lands INSIDE `proof:motion` /
  `proof:spring-ease` (case row) / `proof:motion-one-clock` / `proof:meta` — zero singleton gates;
  four existing gates RETIRE into arms (F5.1). ✔
- **Fable arm + DesignSync per visual wave:** F5.1 (motion card set) · F5.2 (the storybook sweep IS
  the gate) · F5.3 (the candidate card set + the decision) · F8.6 (the verdict filing) — each
  non-authoring. 10.5 / W-SPRING-TIDY / 17.4 are structural (worm-π / regen-snap / congruence-probe
  backstops). ✔
- **Foreign-tree fence:** the precepts submodule is read-only — 17.4's bridge entry (§4.17.4) is the
  in-repo answer; sibling knowledge flows through MIGRATION rows only. ✔

---

## §6 — The gestalt bar (the paint verdict for this hallmark)

On FRESH captures — the storybook interactive band (buttons, chips, menu rows, tabs, accordion,
select, configurator, drawer, dock at rest), BOTH modes, frame-series where motion is the subject:

1. **Everything a finger drives carries WEIGHT** — press gives, travel squashes (volume-true),
   arrival overshoots within the [0,10%] professional band and trails a settle. A tight mechanical
   snap ANYWHERE on a driver surface is a FAIL (the liquid-weight-universal mandate, judged live).
   Reached by the floor PLUS the utility re-author sweep — a `transition*`-clobbered driver surface
   at close is a sweep failure, never an accepted state.
2. **Nothing an observer watches bounces** — auto-carousels, progress fills, reorders are calm
   bezier; a punchy observer FAILS restraint (law 10's verdict).
3. **One gesture, one register** — every disclosure chevron in the library rotates on the SAME
   arrival ease and clock; every reveal/cta/bloom arrives off the SAME engine; a divergent sibling is
   a FAIL.
4. **The gesture is interruptible** — a mid-flight re-press/re-target redirects with preserved
   velocity, never a wall-hit restart (the WWDC23 contract, frame-series-verified). The driver lock
   holds live: no CSS transition ever stacks on a JS-sprung channel (a mushy, lagged press is a FAIL).
5. **The loud register is EARNED** — anticipation + punch appear on completion/celebration/CTA
   moments only, amplitude proportioned by the local weight; ten rapid open/close cycles never read
   manic.
6. **Staging holds** — ONE motion event owns each beat; the chevron never out-shouts its panel; ≥2
   competing simultaneous events on a surface is a FAIL.
7. **PRM is absolute** — under reduce, every deformation is zero (one scalar), every arrival is an
   endpoint snap, every fade survives; a single moving transform frame under reduce is a FAIL.
8. **The 12-law verdicts are on disk** — every enrolled roster surface carries its 3-axis verdict
   with a telos line and an explicit restraint-check, anchored to a resolving capture, filed by a
   non-authoring judge.
9. **Byte-parity where owed** — the F5.1 collapse and the 10.5 gut shift ZERO pixels at defaults
   (the worm silhouette, the reveal/cta/bloom arrivals); any drift is a finding, not a shrug.
10. **Both engines** — Chromium + WebKit read the same weight (the `linear()` floor is
    Baseline-safe; the paired-engine π discipline holds).

**The quotable close:** *glass-ui's motion is unmistakable because weight is not a feature — it is
the default physics of the room. One table, one engine, one scalar; twelve laws you can feel and one
verdict language that names them. Alive unless opted out, calm where it watches, loud only where it
has earned it.*

---

**REVISION (2026-07-01 — `critique/MOTION-crit.md` applied in full; greenfield-loop records preserved,
the corrections marked as the critic-forced 4th round):**
- **C1 (critical, resolved):** the F5.2 floor's collision with F5.1's own JS press/drag/morph engines
  is closed via the critique's option (b) — `lockSpatialTransition(el)` (inline
  `transition-property: none` while engaged, released on settle), minted at F5.1 (engine + press),
  wired complete at F5.2 (drag), gate-asserted with a planted lock-less-driver bite (§3.1, §3.2, §4).
- **C2 (major, resolved):** the Tailwind `transition*` UTILITY clobber named as the dominant vector;
  deliverable 3's sweep widened from colon-shorthands to every `transition*` utility on a cohort
  element; the inversion reach claim corrected to "alive unless a `transition*` utility or
  `.motion-calm` opts out" (§3.1, §4 F5.2, §5, §6 bar 1).
- **C3 (major, resolved):** `<Card :pressable>` carved OUT of the `.motion-calm` default — the calm
  class binds on the non-pressable plate only (§3.1, §4 F5.2).
- **C4 (minor, resolved):** `spawn`/`SpawnConfig` DROPPED from the shipped `MorphChannels`; booked as
  a fold-candidate, re-enters only with a bound consumer (§3.2, §5).
- **C5 (minor, resolved):** the P2 exit guard made STRUCTURAL — the closed-state
  `:where([data-state="closed"], [hidden])` ease re-point in the floor file; the sweep's exit-arm
  bound over the enumerated residue (§3.1, §4 F5.2, §5).
- **C6 (minor, resolved):** the protected-set scope stated precisely — values + six-core-row emitted
  output + clock derivation frozen, NOT the script text; the `emitCss` edit HOLDS on an explicit
  orchestrator fence-lift ack, with the post-generation-strip fallback named (§4 W-SPRING-TIDY, §5).
- **C7 (minor, resolved):** the non-authoring judge downgraded from structural counter to process
  convention (§3.4).

---

> **ORCHESTRATOR RULING (R1, 2026-07-01, post-critique):** this spec's silhouette-owner assignment (4.3 owns the DELETE) is OVERRULED — **10.5 owns the `useDockContextSilhouette` DELETE + `AppSwitcher.vue` retire + the baseline-#8 drain; 4.3 is a DEFINITION-ABSENT verify with precond 10.5** (RULINGS-PASS2.md §CORRECTIONS). The cursor is corrected accordingly; build agents follow the cursor.
