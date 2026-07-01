# B6 — LIQUID-WEIGHT UNIVERSAL (lens report, RESPEC-GESTALT pass-1)

**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890` · **Lens:** B6 (the liquid-weight
mandate: "ALL motion/transitions/scrolling must carry inertia, weight, bounce, liquid-glass quality;
pager/deck dots goo-morph between states; remember this always").

## Verdict

The library's **flagship motion registers are genuinely well-built and liquid** — the reveal recipe
(`glass/reveal.css`) is spring-clocked on the per-spring settle clock with a coupled `filter` blur-settle;
the pager-dots goo-morph WORM ships as a real library primitive (`usePagerWorm` → `useGooMorph`, the
three-element barbell with a real concave-neck waist welded by `#pager-goo`); the deck DOTS inherit it
(DeckPager wraps PagerDots); the deck SLIDE-content goo-morphs as demo consumer #3; `SPRING_PRESETS` is one
source; `route-enter` springs on mount. The goo-morph "worm" the mandate names EXISTS and is shipped. The
top of the stack is not the problem.

The problem is at the **edges and the floor**, and it is exactly the mandate's three failure modes:
(1) **a gestalt-cohesion defect that a designer sees instantly** — the disclosure-chevron gesture paints
in THREE divergent motion registers across Accordion/Select/Configurator, one of them FLAT
(a plain `duration-200` bezier snap-rotate); (2) **the enforcement gate that should catch it is a paper
tiger over most of the surface** — `proof:spring-ease`'s abrupt-spatial detector matches only CSS
`transition:` colon-declarations, so every Tailwind-utility spatial transition in a `.vue` template
(`transition-transform duration-200`) is invisible to it; and (3) **"liquid-weight UNIVERSAL" has no
library-wide machine floor and no missing-transition census** — it is asserted in prose (W-12-LAWS-UNIVERSAL,
W-LIQUID-ENTRANCE-GENERAL) but enforced comprehensively nowhere. `proof:motion-one-clock` only checks whether
an already-sprung leg pairs the RIGHT clock; it never catches a spatial leg that has NO spring at all, nor a
state change with no transition. The mandate's "remember this always" is a prose promise, not a ratchet.

None of the deferred/pending motion waves (10.10, 10.24, 17.4) close the enforcement hole as written; the
accordion-chevron fix lives buried in the WS10 de-shadcn token-sweep as a per-SITE line, not a REGISTER-level
unify — the precise anti-pattern the mandate condemns.

---

## Findings (ranked by severity)

### F1 — MAJOR (gestalt cohesion): the disclosure-chevron gesture paints in three divergent registers, one FLAT

The same gesture — a disclosure chevron rotating 180° on open — is authored three ways:

- **Select** — `SelectTrigger.vue:138`:
  `[transition:rotate_var(--spring-snappy-duration)_var(--ease-cartoon-punch)] [&[data-state=open]]:rotate-180`
  → spring clock + the *cartoon-punch* arrival ease.
- **Configurator** — `ConfiguratorLayer.vue:202`:
  `transition: transform var(--duration-fast) var(--spring-snappy)` → spring curve but the WRONG clock
  (`--duration-fast`, a generic wall clock, not `--spring-snappy-duration`). Already booked as a clock
  reconcile in `proof:motion-one-clock` (scripts/proof-motion-one-clock.mjs:178) — but only the CLOCK, not
  the register divergence.
- **Accordion** — `AccordionTrigger.vue:35`:
  `class="h-4 w-4 shrink-0 transition-transform duration-200"` → a FLAT `duration-200` bezier snap-rotate.
  No spring, no weight, no bounce — the exact liquid-weight violation the mandate forbids.

A designer opening an Accordion beside a Select sees one chevron SNAP and the other SETTLE. There is no
shared `transition-disclosure` utility or `--disclosure-rotate` token pair; each site re-authors the gesture.
The scheme-motion comment (`scheme-motion.css:87`) says chevrons ride the 100-120ms quick-control register,
but that intent reaches zero of the three consistently. This is a locally-correct-vs-one-designed-product
defect — precisely axis #2 of the critique.

### F2 — MAJOR (enforcement hole): `proof:spring-ease` cannot see Tailwind-utility spatial transitions

`proof:spring-ease` carries an "abrupt-spatial" SHAPE arm (S6) intended to red a spatial leg
(transform/translate/scale/rotate) authored on a raw bezier/wall-clock instead of a `--spring-*` register
(scripts/proof-spring-ease.mjs:32-40, the S6 self-test bites at :699-723 have teeth). It DOES iterate `.vue`
files (`for (const path of [...css, ...vue])`, scripts/proof-spring-ease.mjs:583). **But** `detectAbruptSpatial`
matches only the CSS colon-declaration form:

```js
// scripts/proof-spring-ease.mjs:539
const declRe = /(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi;
```

The Accordion's `transition-transform duration-200` is a **hyphenated Tailwind utility with no colon** — the
regex never matches it. So the F1 flat-chevron defect is structurally invisible to the one gate authored to
catch it. (The Select `[transition:rotate_...]` arbitrary-property form WOULD match the colon-regex; the
plain-utility form is the blind spot.) The result: the gate is green while the flat spatial motion ships —
a "green-over-broken" close, the class the whole BG+BH audit series exists to kill.

Scope of the blind spot is the entire SFC-template Tailwind-utility motion surface: any
`transition-transform`, `transition-[transform,...]`, `duration-N` on a `data-state` transform, etc., across
`src/components/**/*.vue`. The gate's `ABRUPT_SPATIAL_PENDING` bridge list (scripts/proof-spring-ease.mjs:387)
is a hand-curated three-file allowlist — it presumes the surface is CSS-declared, which the de-shadcn era
(Tailwind-utility-first) has outgrown.

### F3 — MAJOR (missing floor): "liquid-weight UNIVERSAL" is prose, not a ratchet — no flat-vs-spring floor, no missing-transition census

Two waves nominally own the mandate, both `[P]` PENDING with thin gate descriptions:

- **10.24 BG.W-12-LAWS-UNIVERSAL** — gate column: "liquid-weight on all restored motion" (a description,
  not a named `proof:*`).
- **10.10 BG.W-LIQUID-ENTRANCE-GENERAL** — "liquid-enter wired onto mount surfaces."
- **17.4 BG.W-ANIMATION-CONGRUENCE** — `proof:motion-one-clock` (A9 lock).

`proof:motion-one-clock` only asserts an *already-sprung* leg pairs its matching `--spring-<name>-duration`
(the hand-curated pair table at scripts/proof-motion-one-clock.mjs:174-228). It has **no arm** for:
(a) a spatial leg with NO spring token at all (the F1 accordion case — there is nothing to pair a clock to);
(b) a **state change with no transition** — the missing-transition census the mandate implies. There is no
enumeration anywhere in the plan of `v-if` swaps, `v-show` toggles, or class-toggle state changes that paint
with zero motion. "ALL transitions carry weight" cannot be verified because the set of transitions that
SHOULD exist is never enumerated. The mandate's universality is unenforced by construction.

### F4 — MINOR (coverage, honest-defer): the deck SLIDE-content goo-morph is demo-only, not a `/deck` primitive

`demo/stories/motion/deck.vue:43-50` goo-morphs the outgoing→incoming slide CONTENT (the calmer
`--deck-goo-flow` register, `--goo-weight: 0.4`) as consumer #3 of `useGooMorph`, but the note there is
explicit: "The `useDeck` library surface is byte-untouched." So a `/deck` consumer gets a plain
`--spring-deck` (= `--spring-smooth`) content slide with no goo bridge; the barbell-neck worm is a demo
pattern, re-forked per consumer. The mandate's literal "pager/deck DOTS goo-morph" IS satisfied for the DOTS
(deck dots = PagerDots worm, shipped). The richer slide-content goo-morph is the un-shipped delta. This is a
coverage note, not a blocker — but it is the kind of "the demo is beautiful, the primitive is thin"
encapsulation gap the critique names (axis #4).

### NON-FINDING (recorded to avoid noise): `transition-colors` at 9 sites is CORRECT

The 9 `transition-colors` uses (Notification, ToastAction, TableRow, DataTable, MetricBadge,
ExpandableContainer, etc.) are surface COLOR channels — under motion-canon P1 (bezier-iff-effect) a color
cross-fade rides a bezier, NOT a spring (a color on a spring wobbles; `proof:spring-ease` S6 explicitly
exempts it, scripts/proof-spring-ease.mjs:709). Liquid-weight-universal governs SPATIAL motion; these are not
defects and MUST NOT be swept onto springs. Flagging them would be exactly the over-contrivance the critique
condemns from the other direction.

---

## Fold candidates (for the AMENDED-GESTALT-PLAN)

### FC-1 — NEW micro-wave · `BG.W-DISCLOSURE-ROTATE` (register-level chevron unify) — folds the WS10 accordion line

**Kind:** new-wave (or amend-wave onto WS10 15.3 BG.W-TAILWIND4-IDIOM).
**Gestalt approach (not a patch):** mint ONE disclosure-rotate REGISTER — a `@utility transition-disclosure`
(or a `--disclosure-rotate` clock/curve token pair) that encodes the single canonical chevron gesture: the
spring curve + its own settle clock + the arrival ease. EVERY disclosure chevron/caret/arrow reads it:
Accordion, Select, Configurator, and any DropdownMenu/NumberField-stepper caret. The three current
divergent authorings (SelectTrigger.vue:138 cartoon-punch, ConfiguratorLayer.vue:202 snappy/wrong-clock,
AccordionTrigger.vue:35 flat-200ms) collapse onto the one register in one edit — substitution over
re-declaration, the house discipline. This SUPERSEDES the WS10 SPEC-pass1-converged:166 line ("AccordionTrigger
chevron → a spring/transition-control") which fixes only the accordion SITE and leaves the divergence intact.
**Fable design arm:** decide the ONE arrival ease — Select currently uses `--ease-cartoon-punch`, Configurator
uses bare `--spring-snappy`; a chevron is a small quick control, so the cartoon-punch overshoot vs the calm
snappy settle is a gestalt call. Route to a Fable instance + DesignSync the Accordion/Select/Configurator
disclosure surfaces as one card set. **≥2-consumer bar:** met at birth (3 consumers).

### FC-2 — AMEND · `BG.W-12-LAWS-UNIVERSAL` (10.24) + `proof:spring-ease` — close the Tailwind-utility blind spot

**Kind:** amend-wave (gate widen).
**Gestalt approach:** widen `proof:spring-ease`'s abrupt-spatial detection from the CSS-colon-declaration
regex (scripts/proof-spring-ease.mjs:539) to ALSO scan `.vue` template class attributes for the Tailwind
spatial forms — `transition-transform`, `transition-[...transform...]`, `[transition:(rotate|scale|translate|
transform)...]`, and a `duration-N`/`ease-*` on a `data-state`/`group-data-*` transform toggle — flagging any
that resolve to a non-spring clock/curve with no `--spring-*` token in the leg. This makes liquid-weight-
UNIVERSAL an actual ratchet over the de-shadcn Tailwind-first surface, not a three-CSS-file allowlist. The
gate's `ABRUPT_SPATIAL_PENDING` bridge shape (scripts/proof-spring-ease.mjs:387) already exists for booking
in-flight sites; extend it, don't fork a second gate. Born-RED on the current tree (the accordion chevron is
the first real catch) → GREEN once FC-1 lands. This is the enforcement half of FC-1; sequence FC-2's gate to
land WITH or just after FC-1 so the red-window is bounded (the WS7→WS12 red-window precedent, cursor row 12.5).

### FC-3 — AMEND · `BG.W-12-LAWS-UNIVERSAL` (10.24) — add the missing-transition CENSUS

**Kind:** amend-wave (audit-census arm, not necessarily a hard gate).
**Gestalt approach:** enumerate every state change that paints with NO motion — `v-if`/`v-show` swaps,
class toggles, `data-state` flips without a transition/keyframe — across `src/components/**` and route each
to a register (spring-iff-spatial for the spatial ones, an effects bezier for pure color/opacity, or an
explicit "instantaneous by design" exemption with rationale). Deliver as a census markdown
(`docs/tranches/BG/audit/.../missing-transition-census.md`) with a per-row disposition, mirroring the
NAV-vs-FEATURE dock census pattern (a positive allowlist for the genuinely-instant cases so the set is
closed and a future silent no-motion swap is caught). Without this the word "UNIVERSAL" in the wave name is
unbacked — the census is what makes it decidable. Pairs with FC-2: the census finds the missing motions, the
gate widen prevents the flat ones.

### FC-4 — plan-doc-edit / defer-honest · deck SLIDE-content goo-morph as a `/deck` primitive

**Kind:** defer-honest (KEEP-BOOKED with an honest trigger).
**Gestalt approach:** the slide-content barbell-neck goo-morph (demo/stories/motion/deck.vue:43) is currently
a demo-local composition over `useGooMorph`. Promote it to a library `/deck` capability (a `useDeckGoo` or a
`goo` axis on `useDeckSpring`) IFF the ≥2-consumer bar clears — the demo + the slides-repo consume-back are
the two named binaries. Until slides actually consumes it, KEEP-BOOKED (do NOT speculatively ship a
single-demo-consumer primitive — that is the over-contrivance axis #3). Record the trigger in a
`docs/consumer-evidence/deck-goo.md` so the promotion is a decision, not a drift. The deck DOTS worm already
ships (PagerDots), so the mandate's literal dots-goo-morph is satisfied; this is the richer slide delta only.

---

## Cross-reference to the existing corpus

- `proof:motion-one-clock` (scripts/proof-motion-one-clock.mjs:174-228) already books the Configurator-chevron
  and menu-row and dock-rail CLOCK reconciles — FC-1 SUPERSEDES the configurator-chevron clock booking by
  moving it onto the shared register (one edit resolves the clock AND the divergence).
- WS10 (`docs/tranches/BG/converge/BG-WS10-deshadcn-tailwind4/SPEC-pass1-converged.md:166`) owns the
  accordion-chevron per-site fix; FC-1 folds that line into the register wave.
- The reveal/pager-worm/route-enter registers are VERIFIED liquid and need no change — do not re-open them.
