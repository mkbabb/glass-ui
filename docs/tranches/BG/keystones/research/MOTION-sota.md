# MOTION — SOTA research (KS-B, lane MOTION)

Grounding for **KS-MOTION-DISNEY** (waves F5.1 W-MOTION-SPINE · F5.2 W-LIQUID-WEIGHT-DEFAULT ·
F5.3 W-DISCLOSURE-ROTATE · W-SPRING-TIDY · 10.5 dead-cut motion-side · F8.6 W-ARISTOTELIAN-PROPORTION
acceptance-language · 17.4 W-ANIMATION-CONGRUENCE). Build-on target: `docs/precepts/motion-canon.md`
(P1–P7), `docs/tranches/BD/greenfield/motion-spring-register/GOLDEN.md`. FENCE: `SPRING_PRESETS` + regen
+ per-spring clocks + SPATIAL/EFFECTS split + `DOCK_SPRING {0.32,0.7}` are byte-frozen (SYNTHESIS-PASS1 §4).
This report grounds; it re-tunes nothing.

The headline: **glass-ui's motion architecture is already at or ahead of the 2026 SOTA.** M3 Expressive
(May 2025) formalized the SAME spatial/effect split glass-ui shipped as P1; iOS/Wave's interruptible
retarget is the SAME velocity-continuous re-seat the `SpringProgress` spine runs; the CSS `linear()`
spring is the SAME everywhere-floor. The lane's job is not to invent — it is to **operationalize the 12
Disney laws as an acceptance vocabulary (F8.6), collapse the N motion forms onto the ONE engine (F5.1),
make weight the DEFAULT not the exception (F5.2), and gate congruence (17.4).** Research confirms each.

---

## 1. The 12 Disney laws → the UI moments (F8.6 acceptance vocabulary + F5.x mechanism)

The 12 principles are the 1981 Thomas/Johnston canon (*The Illusion of Life*); the 2025-26 UI-design
literature has a settled operationalization. Per-principle UI mapping (IxDF, Marvel, Dribbble):

| Disney law | UI moment | glass-ui carrier (corpus) | verdict |
|---|---|---|---|
| **Squash & stretch** | press/tap; morph travel | `useLiquidFlex` vol-preserving reciprocal `--stretch`; `useSpringPress` | ADOPT — already the spine |
| **Anticipation** | hover-prep (100–200ms lead); loud-one-shot pull-back | `--ease-cartoon-punch` negative anticipation dip (GOLDEN §3, born-RED) | ADOPT for the LOUD register only; NOT default hover (restraint, §4) |
| **Follow-through / overlapping** | list/card stagger 50–100ms; settle-tail | per-spring 2%-band clock tail; `.scroll-cascade`/StoryHeader gravity stagger | ADOPT — the spring settle-tail IS follow-through |
| **Staging** | choreograph focus, quiet the rest | one-color-event / one-GL-per-route budget; W-HIERARCHY2 reading-order build | ADOPT — restraint as staging |
| **Straight-ahead vs pose-to-pose** | interpolated state transitions | `ElementMorph` FLIP (pose-to-pose, engine tweens) | ADOPT — F5.1 makes ONE FLIP loop |
| **Slow-in/slow-out** | eased transitions 300–500ms | `--ease-standard`/`--ease-out` bezier (EFFECTS); spring ease-in-out (SPATIAL) | ADOPT — P1 split |
| **Arc** | element travel on curved paths | dock hover-magnify is the CANONICAL cited arc; morph travel | NOTE — arcs are latent; a travel arc is a fold-candidate, not a lane wave |
| **Secondary action** | completion garnish after primary | CompletionSeal gold-draw; phase-palette earned-gold (post-primary) | ADOPT — seal is the model |
| **Timing** | duration ∝ meaning (file-size→load) | per-spring analytic clock; progress phase-bus | ADOPT — the clock IS timing |
| **Exaggeration** | past-the-fence punch for emphasis | `--ease-cartoon-punch` ~+22% peak (past spring overshoot ceiling) | ADOPT opt-in; `--motion-weight` proportions it |
| **Solid drawing** | consistent perspective/shadow; justified distortion | vol-preserving squish (never taffy); warm-cream identity | ADOPT — "distortion must be justified" = the proportion fence |
| **Appeal** | product personality via motion | liquid-glass iOS-27 identity; handmark hand-voice | ADOPT — the identity IS appeal |

**F8.6 verdict:** the 3-axis acceptance language (√φ-proportion · animation-laws · technicolor-cartoon-punch)
is well-founded — the "animation-laws" axis is exactly this 12-law table applied per roster surface. Do
NOT mint a `proof:aristotelian` singleton; the plan is correct that this is a per-surface VERDICT
(`edict-verdict-present`), not a gate. The Aristotelian framing (each surface's motion is proportioned to
its telos — a press is small, a completion is loud) maps 1:1 onto `--motion-weight`'s driver-vs-observer
centroid (GOLDEN §1).

**The restraint line (F8.6's hardest axis).** The 2026 award literature is unanimous: *"restraint and
polish beat pyrotechnics"*; *"excessive animation creates cognitive overload and slows perceived
performance."* This is the motion-canon's proportion fence (`motion-canon.md` "Ratify-no-re-tune" §2, the
NN/g liquid-glass overuse warning) already stated. The acceptance verdict must judge BOTH directions:
a dead surface FAILS animation-laws; a busy surface FAILS restraint. F8.6's verdict language should name
the busy-failure explicitly (a surface with ≥2 competing motion events, or a hover that squishes, fails).

---

## 2. The spring spine — iOS interruptible + M3 Expressive (F5.1 · 17.4 · W-SPRING-TIDY)

**M3 Expressive (Google, May 13 2025) formalized glass-ui's P1 split.** Its motion-physics system
*"replaces the previous easing+duration system"* with **spring composite tokens** carrying two sub-tokens
(damping + stiffness), split into exactly two families:
- **Spatial springs** — position/size/orientation/shape; *"configured to allow overshoot and bounce."*
- **Effect springs** — color/opacity; *"high damping to resolve quickly without bouncing."*

Each family ships three speeds (fast/default/slow). **This IS motion-canon P1** (spring-iff-spatial /
bezier-iff-effect) — glass-ui shipped it first as the §6 SPATIAL/EFFECTS table. **ADOPT as external
validation**; the lane cites M3 as the industry convergence, re-tunes nothing (P1 frozen). The only
framing to lift: M3's THREE-SPEED axis (fast/default/slow per spring) is a cleaner vocabulary than
glass-ui's per-name clocks — but glass-ui's is finer (per-preset analytic settle). Keep glass-ui's;
note M3 as the coarser peer.

**iOS interruptible retarget = the `SpringProgress` re-seat (F5.1's protected mechanism).** WWDC23
"Animate with springs" + Wave (jtrivedi): *"all animations are re-targetable — change the destination
in-flight and it gracefully redirects, preserving velocity."* SwiftUI: *"a retargeted spring uses the
velocity it had when retargeted as the initial velocity toward the new destination."* This is exactly
the F5.1 row's protected clause — *"interruptible velocity-continuous re-seat preserved"* on
`useSpringPress`/Button. **ADOPT as the canonical reference for the F5.1 spec's re-seat requirement**;
the spec must state the WWDC23/Wave retarget contract as the acceptance bar for the collapsed press-tower.
The `response`/`dampingFraction` vocabulary (Apple's `spring(response:dampingFraction:)`) is the SAME
`(response, ζ)` the `SPRING_PRESETS` table uses — cite Apple as the vocabulary source.

**F5.1 W-MOTION-SPINE — the ONE-engine collapse.** SOTA principle (Wave, Framer Motion, RN Reanimated
all converged here): ONE physics core, N thin declarative wrappers. F5.1 collapses
`useLiquidReveal`/`-cta`/`-bloom`/`-dockmorph` onto ONE `ElementMorph` FLIP rAF loop with ≤20-line
wrappers, and `useSpringPress`/`useScrollPin`/`useGooMorph` go DEFINITION-ABSENT. **ADOPT** — this is the
textbook "one engine, many forms" the SOTA engines model. The spec should frame each wrapper as a
declarative CONFIG over the one FLIP core (source-rect, direction, blur channel), never a re-implemented loop.

**17.4 W-ANIMATION-CONGRUENCE / `proof:motion-one-clock`.** motion-canon P7 already codifies the
ONE-source/ONE-clock law + the sanctioned off-spine SET (`usePointerVelocityField`, `useDragMorph`) +
the four per-primitive `(response,ζ)` defaults. **ADOPT — no new research needed; 17.4 is a lock, not a
build.** The SOTA confirms the architecture (a single physics brain is the modern standard); the gate's
job is to keep it single. The spec need only re-cite P7 as the binding source the gate reads its
allowlist against (M5).

**W-SPRING-TIDY.** Housekeeping (table→6, dead `--spring-timeline-*` twins, regen+re-snap). No SOTA
dimension — purely `spring-tokens-synced` hygiene. The spec states: the table is the SINGLE hand-authored
register; every other read derives via `springPreset(name)`; dead twins are a clean-break delete (no alias).

---

## 3. Liquid weight — how weight is FELT (F5.2 W-LIQUID-WEIGHT-DEFAULT)

**The core SOTA finding: weight is a proportion of overshoot + squish, not a single dial.** Motion-design
literature (Mt. Mograph, VDODNA "overshoot — the missing principle", WWDC23) distinguishes:
- **Overshoot** — pass the target and return once (the "flick to rest"). iOS uses NON-bouncy spring
  (overshoot ≤ ~1 return) for app-launch — *"feels right in professional settings."*
- **Bounce** — multiple decaying rebounds. Reserved for playful moments; overuse reads cheap.
- **Damping ratio ζ** governs which: ζ>1 overdamped (calm, no overshoot), ζ=1 critical (fastest no-bounce),
  ζ<1 underdamped (overshoot). glass-ui's presets sit ζ 0.5–0.86 (physical, single-overshoot) — the
  correct "professional" pole, NOT bouncy-by-default.

**F5.2's mechanism is the GOLDEN's `--motion-weight` centroid (BD greenfield, born-RED).** The
transition-register INVERSION: today the base interactive spatial leg is a bezier; F5.2 makes it a
spring-derived `linear()` (generated by `regen-spring-tokens.mjs`) so **weight is the DEFAULT and
`.motion-calm` is the explicit opt-out.** This is the single highest-leverage move in the lane — it flips
the whole storybook from "flat unless authored" to "alive unless opted-out." The GOLDEN already de-risked
the governing scalar (`--motion-weight` typed `@property`, rest 1/φ≈0.618, site-local cap derivation —
the spike-corrected mechanism §2b, live-verified). **ADOPT the GOLDEN's mechanism wholesale**; F5.2's
spec should:
1. Cite the site-local cap correction (§2b) as the LOAD-BEARING integration fact — a `calc(var(--motion-weight))`
   cap token declared at `:root` freezes the text and never re-evaluates under a scoped override; the cap
   MUST be `1 + k·var(--motion-weight)` derived at the consuming element.
2. Bind the driver-vs-observer rule (GOLDEN §4 table) as the acceptance shape: DRIVER → spring + weight;
   OBSERVER (auto-carousel, list-reorder-under-scroll, progress fill) → bezier + weight 0.
3. Keep the Fable storybook sweep as the GATE (the row already says so) — before/after weight sweep is
   the binding verdict, not a source-grep.

**"Morph more the faster you move"** (GOLDEN §2c, the boldest move, spike-confirmed: fast jump→weight 0.96,
settled→exactly 0.618) is the felt-weight signature the award sites chase — inertia that self-extinguishes.
**ADOPT**; it is compositor-only (one computed `--motion-weight` write off the already-computed `tanh(|ṫ|·k)`
velocity term) and PRM-zeroed by one line. This is the "weight felt not seen" the mandate names.

**Gel-squish / goo-morph** (the pager-dot worm, dock fission): these are the semi-observer register on their
OWN `--{prefix}-flow` linear(), independent of `--motion-weight` (GOLDEN §4, JUDGE-1 protected). F5.2 must
NOT sweep them — they are the topology-flip register, not the interactive-leg register. Note the fence.

---

## 4. CSS frontier — the everywhere-floor vs the JS spine (F5.2 · F5.3 mechanism)

The load-bearing 2026 fact (Josh Comeau, MDN, verified): **CSS `linear()` springs cannot account for
velocity on interrupt** — *"the CSS version turns around instantly, as though it hit a wall,"* while a JS
spring *"takes the element's current inertia into account."* This is the exact seam glass-ui already draws
and MUST keep drawing:
- **CSS `linear()` spring** (sampled 50+ stops from `(response,ζ)`, `@supports`-gated with bezier
  fallback, ~88% support, all-major-browsers since Dec 2023) = the **everywhere zero-JS FLOOR** for scoped
  and observer motion (F5.2's base leg, disclosure rotate, the `.glass-reveal` recipe).
- **JS `SpringProgress`** (velocity-continuous re-seat) = the **interruptible refinement** for gesture and
  press (F5.1's press-tower, `useDragMorph`, `useSpringPress`).

This is precisely motion-canon P7 + the F5.2 mechanism (spring-derived `linear()` for the default leg,
kf for the interruptible ones). **ADOPT — the research validates the two-tier split.** The spec must state
that a CSS `linear()` leg is NEVER used where a mid-flight interrupt matters (press, drag) and a JS spring
is NEVER minted where a fixed one-shot suffices (the SCC/root-barrel discipline). Note: Safari has shipped
a native `spring()` since 2017 and there's an open CSS `spring()` proposal — a FUTURE fold-candidate, not
a lane wave; `linear()` sampling is the correct baseline today.

**Scroll-driven timelines (`scroll()`/`view()`)** and **View Transitions** and **`@starting-style`** are
mature-enough baseline (MDN, 2026): glass-ui's `scroll-choreography.css` + `useViewTransition` +
`.glass-top-layer` already ride them, native-first, no Lenis/GSAP. Not this lane's build (that's the
scroll/entrance families) — noted here only to confirm the native substrate is the SOTA-correct choice
(the award sites hand-roll on 20–40KB JS libs; glass-ui's native register is ahead of that curve).

**F5.3 W-DISCLOSURE-ROTATE.** The chevron/disclosure rotate is a SPATIAL leg (rotation) that today is
often a bare Tailwind `transition-transform` bezier — abrupt, off-spine. SOTA: a disclosure indicator
rotates on the ONE arrival ease (spring-derived, weight-coupled), same register across Accordion / Select /
Configurator. **ADOPT** — one disclosure register, and the `detectAbruptSpatial` gate WIDENS to scan `.vue`
template class attrs (a case row, not a forked gate) so a `rotate-180 transition-transform` in a template
is caught. This is the "abrupt-spatial-tailwind" clause; the missing-transition CENSUS is the positive arm
(a disclosure with NO transition also fails). Frame it as: disclosure rotation is spatial → spring-derived
`linear()` + weight, never a raw bezier utility.

---

## 5. The dead-cut, motion side (10.5)

Not a SOTA question — a hygiene DELETE owned ONCE. `useHaptic`, `useCelebrationBurst` (+`jubilance.css`),
`useVizChoreography`, `useLiquidMorph`, `useDockContextSilhouette` (+ retire `AppSwitcher.vue`) DELETE with
MIGRATION-per-symbol; FOLD `useScrollPin`+`useScrollScene`; gut `useMorphField`→`morphSignatures.ts`; DELETE
3 lying consumer-evidence docs. The one SOTA-adjacent note: `useCelebrationBurst`/jubilance is the confetti
"secondary action" (Disney law 8) — its DELETE is correct because the SHIPPED secondary-action carrier is
CompletionSeal (gold-draw) + phase-palette earned-gold, which are the disciplined, PRM-safe, compositor-only
version. Confetti-burst is the un-disciplined fork; the seal is the keeper. The 12-law "secondary action"
survives — on the right carrier. Sequence: after 6.4 (last `useVizChoreography` reader) and 4.3 (dock
clearance), per the plan.

---

## 6. Precepts conformance + acceptance bar

- **Compositor-only + PRM** (P5/P6): every lane mechanism is transform/opacity/filter/`--*` only;
  `--motion-weight: 0` under PRM zeroes ALL deformation in one line (GOLDEN §2d). Verified in research —
  scale/translate/spin are the vestibular triggers (WCAG 2.3.3), fades are not; PRM keeps fade drops
  transform. Binding.
- **spring-iff-spatial / bezier-iff-effect** (P1): M3 Expressive is the external proof. Frozen.
- **ONE source, ONE clock** (P7): iOS/Wave/M3 all confirm a single physics brain is SOTA. 17.4 locks it.
- **Clean breaks / ≥2-consumer / presets-in-consumers / warm-no-gray / token-first**: F5.2's
  `--motion-weight` is the token-first governor; the cartoon-punch amplitude is weight-scaled (proportion
  fence); no consumer hue enters a library token. Held.
- **Gestalt bar (F8.6):** each roster surface owes a 3-axis verdict — √φ-proportion · animation-laws
  (the §1 12-law table) · technicolor-cartoon-punch — AND passes the restraint line (no busy-failure).
  Liquid-weight-UNIVERSAL is the felt bar: inertia/bounce/weight on ALL driver motion, calm on observers.

**Net verdict:** glass-ui's motion is architecturally ahead of the 2026 SOTA — the lane's value is
OPERATIONALIZATION (12 laws → per-surface verdict, F8.6), UNIVERSALIZATION (weight as default, F5.2),
CONSOLIDATION (one engine N forms, F5.1), and LOCKING (congruence, 17.4). Zero re-tune; the protected
spine holds.

---

## Sources

- IxDF — [Disney's 12 principles applied to UI](https://ixdf.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design)
- Marvel — [Disney's motion principles in interface animations](https://marvelapp.com/blog/disneys-motion-principles-in-designing-interface-animations/)
- Dribbble — [Applying Disney's principles to UI interactions](https://dribbble.com/stories/2020/07/27/disney-principles-of-animation-ui-interactions)
- Material Design 3 — [Motion overview/specs](https://m3.material.io/styles/motion/overview/specs) · [M3 Expressive new motion system](https://m3.material.io/blog/m3-expressive-motion-theming) · [Easing & duration tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
- Apple — [WWDC23 "Animate with springs"](https://developer.apple.com/videos/play/wwdc2023/10158/) · [spring(response:dampingFraction:)](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:))
- Wave (jtrivedi) — [interruptible/retargetable spring engine](https://github.com/jtrivedi/Wave) · [reference](https://jtrivedi.github.io/Wave/)
- Josh Comeau — [Springs and Bounces in Native CSS (linear())](https://www.joshwcomeau.com/animation/linear-timing-function/) · [Scroll-driven animations](https://www.joshwcomeau.com/animation/scroll-driven-animations/)
- MDN — [linear() easing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/linear) · [Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)
- Chrome for Developers — [Complex curves with linear()](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)
- VDODNA — [Overshoot: the missing animation principle](https://www.vdodna.com/blog/overshoot-the-missing-animation-principle/) · Mt. Mograph — [bounce & overshoot](https://mtmograph.com/blogs/tools/the-bounce-and-overshoot-animation-trick-every-motion-designer-should-know)
- 2026 trend/restraint — [School of Motion — great animation 2026](https://www.schoolofmotion.com/blog/10-websites-with-great-animation-in-2026) · [Envato — 11 motion trends 2026](https://elements.envato.com/learn/motion-design-trends) · [Awwwards Storytelling collection](https://www.awwwards.com/awwwards/collections/storytelling/)

**Corpus cross-refs:** `docs/precepts/motion-canon.md` P1–P7 · `docs/tranches/BD/greenfield/motion-spring-register/GOLDEN.md`
(§1 triangle/centroid, §2 `--motion-weight`, §2b site-local cap correction, §3 `--ease-cartoon-punch`, §4
selection table, §7 spike) · `docs/tranches/BG/audit/RESPEC-GESTALT/SYNTHESIS-PASS1.md` §4 (protected) ·
`docs/tranches/BG/execution/EXECUTION-PROGRESS.md` (rows F5.1/F5.2/F5.3/W-SPRING-TIDY/10.5/F8.6/17.4).
