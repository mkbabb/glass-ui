# Breadth apotheosis adjudication — Tabs, Slider, Alert, and Card — C40

**Date:** 2026-07-22  
**Seat:** separate independent Sol x-high adjudicator  
**Phase:** formation only  
**Scope:** Tabs, Slider, Alert, Card, and only their necessary shared/public edges  
**Verdict:** **FORMATION CONVERGED / MECHANISM CONTRACTS ADJUDICATED /
EXISTING OWNERS SUFFICIENT / ZERO NEW ROWS / IMPLEMENTATION, PACKAGE,
BROWSER, AT, CONSUMER AND ACCEPTANCE RED**

No product, test, gate, generated output, package, lock, consumer, repin or
release byte is authorized or credited by this adjudication. This file selects
the smallest coherent target contracts and a dependency-ordered handoff. It
does not select implementation spellings.

## Frozen authority

This adjudication read the following inputs unchanged:

| Input | SHA-256 |
| --- | --- |
| `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md` | `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553` |
| `BREADTH-COHORT-TABS-SLIDER-ALERT-C35.md` | `1c9985788b2a79767db7ac491f191c4f794d58a8ca644c15e620869080b339b6` |
| `BREADTH-CRITIC-1-MOTION-C36.md` | `8d5695f1fdd7f4ffeaf27077b1e4958da47f6f858345154c2dfa605c06b8759c` |
| `BREADTH-CRITIC-2-SYSTEMS-C36.md` | `dc0bb31b508ecc823335e625dca71269b5836c24e44e0702b62dcb7706b1bf2e` |
| `BREADTH-CRITIC-3-A11Y-C36.md` | `d5caeff96ccd32e8c826455c739fac8d4a5793efa2105cd5e7580765180da0f1` |

The three critics independently bind the same committed source cursor:

- Glass HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`;
- tree `97b386172a899ef43b686ffbe43263395b3a7744`;
- inspected component sources clean relative to that cursor;
- a pre-existing dirty `tests/components/slider.contract.test.ts` at
  `a08fe7dbcde06b293a025379f536b1afc89ccf4549debfd5e9c880d5f54ad436`,
  which receives no frozen-candidate credit.

C35 is an independent Browser discovery packet, not a source-to-served or
installed-package proof. That boundary remains binding.

## Conflict reconciliation

### 1. Slider: ownership miss is proven; terminal pointer failure is not

The exact live facts are:

- the visible track is `358×20px` on the retained 390px cell;
- the named semantic thumb is `0×20px`;
- ArrowRight changes `aria-valuenow` from `42` to `43` after focus;
- the centre, four corners and four edge midpoints of the proposed `44×44px`
  floor do not resolve to the semantic-thumb lineage.

These facts prove that the current semantic thumb does not own the proposed
coarse floor and that the keyboard value mechanism is alive. They do **not**
prove that every one of those points is terminally incapable of changing the
Slider value: a track or explicit parent action owner could lawfully translate
the pointer action to the correct semantic value owner. C35 did not retain the
trusted event path and resulting value for all nine points.

The formation verdict is therefore **semantic/action ownership RED; terminal
pointer outcome UNPROVED**, not “all nine actions failed.” A computed pseudo
box, class name, `pointer-events:none` halo or `elementFromPoint` readback alone
cannot close the contract. The positive contract is trusted action ownership:
the whole non-overlapping floor for each value owner must operate the intended
thumb/value, expose a coherent composed path, isolate neighbours, and retain the
semantic thumb's keyboard/AT state. This intentionally does not freeze whether
the eventual owner is the thumb, a wrapper, the track, or another documented
composition.

### 2. Tabs glyph corruption is candidate-wide evidence, not a Tabs root cause

The `+80ms` desktop frame shows unrelated glyph loss/smear beyond the selected
indicator, while the `+400ms` frame is crisp. That is an honest raster RED for
the served candidate. It does not isolate SegmentedTabs from the surrounding
shell/Dock compositing. The Tabs motion gate must reject unrelated-pixel
movement, but no Tabs-only source blame follows until an isolated specimen and
same-byte mutation reproduce or remove it.

### 3. “One clock” is narrowed to one selection trajectory

Current selection uses a CSS geometry transition, a timeout-released
stretch/blob envelope, and a separate button WAAPI press. Those are not one
sampled momentum trajectory. The target is **one authority for selected
geometry and one coherent, interruptible selection trajectory**. A subordinate
local press response may remain distinct only if it never writes selected
geometry, does not move unrelated content, obeys the same motion policy, and
cannot outlive or contradict the selection generation. This preserves useful
micro-feedback without requiring every optical channel to share one literal
duration.

### 4. Pill and underline may differ in paint, not in selected truth

The current real pill element, anchor pseudo underline, static fallback, and
pill-only drag are not “one engine.” The adjudicated contract does not require
one DOM renderer. It requires one measured selected-geometry truth and equivalent
selection, interruption, resize, scroll, RTL, DPR, focus and PRM results for
every supported paint posture. A fallback that cannot satisfy those results is
an explicit reduced capability, not silently the same feature.

### 5. Mobile Tabs are observationally RED, but their exact floor is missing

C35 proves material miniaturisation and poor legibility at 390px. It does not
retain exact button rectangles or nine-point action results. The visual state is
RED; a numeric target-size failure remains unproved. “No document overflow,” a
blind `minmax(0,1fr)`, clipping, or indiscriminate shrinking cannot close the
width contract. The selected policy must keep labels, focus, selection and the
indicator reachable and congruent. The canonical responsive arm remains the
library Select; non-responsive strips still owe a lawful constrained-width
posture rather than relying on the existence of that branch.

### 6. Alert radius is exact; the larger material judgment is still required

The current `10px` Alert against the `16px` Card is live and source-true. Existing
`BJ.W-ALERT-IDIOM` already requires the semantic Card radius role and runs after
the radius/blur canons. The default target is therefore Card-role equivalence,
not a new Alert-local pixel or token. A slightly larger Alert may be considered
only if the role/proportion review proves a stable semantic reason across every
tone and density; it is not inferred from preference alone. Radius-only repair
would remain RED because the wrong blur rung, rim, tone ink and type hierarchy
are part of the same idiomatic Glass contract.

### 7. Slider frost and package-peer failures remain falsifiers, not conclusions

The Slider fill reads bright and opaque-looking on a nearly uniform substrate,
but the retained corpus cannot distinguish opaque paint from transmissive frost.
Meaningful underlay and blur-off/opaque mutations are required. Likewise, Tabs'
static reach into optional motion code is a package-policy risk; only positive
and negative installed fixtures can decide whether the peer declaration or the
dependency edge is wrong.

### 8. Static semantics do not prove AT delivery

Alert's silent-default and explicit polite/assertive attribute policy are GREEN
at source. Static story markup is not live-region delivery proof. Tabs' DOM
roving semantics are not panel speech or responsive focus proof. Slider's ARIA
attributes are not distinct multi-thumb naming or VoiceOver action proof. These
remain separate runtime/AT arms.

## Apotheosis contracts

### A. SegmentedTabs — `R-TABS`, IOS FINAL W5, G5 and A11Y W2-A

The component's job is to make selection feel like one lens moving with the
user's intent, never like a shiny plate teleporting between labels.

1. **One selected truth.** Model value, visible indicator, selected ARIA state,
   controlled panel and responsive renderer agree transactionally. A selected
   value absent from the current renderer cannot produce a silent visual/model
   split; the public policy either represents it or performs one explicit,
   observable reconciliation.
2. **One geometry authority.** Pill and underline consume equivalent measured
   target geometry. Different optical paints are allowed; divergent coordinate
   systems and static pseudo truth are not.
3. **Movement of Momentum.** Motion begins at the current lens/press geometry,
   follows one selection generation, carries position/velocity continuously
   through interruption and reversal, and settles sharply without target rebase,
   label smear or surrounding displacement. `motion="off"` is immediate and
   creates no component WAAPI; reduced/OS-PRM preserve function and the agreed
   calm terminal.
4. **Breath of Life with restraint.** The active lens may transmit underlay,
   tint and rim as one chroma event. It must read as blurred/frosted Glass rather
   than an opaque, tritely shiny capsule. Static labels remain sharp. No idle
   animation is required merely to satisfy an animation quota.
5. **Gesture capability is explicit and style-independent.** If drag is
   supported, pointer/touch uses local grab offset, primary identity, capture,
   enabled live targets, cancellation rollback, resize/RTL-safe geometry and C1
   release continuity. If unavailable, there are zero drag listeners. Disabled
   options are never snap targets. Click and keyboard remain first-class.
6. **One hit topology.** Toggle and tab semantics route a trusted first action
   through a coherent visual/semantic owner. `aria-pressed` versus
   `aria-selected` cannot silently change whether the indicator or button
   receives the gesture.
7. **Responsive continuity.** Strip↔Select replacement preserves or explicitly
   transfers logical focus, stable accessible name, value and panel identity.
   The Select remains the canonical library composition; no bespoke picker or
   consumer fixed-width shim is admitted.
8. **Available-width law.** Long labels, localization, 200% zoom, 390 coarse,
   vertical/RTL and active adornments remain reachable without miniaturisation,
   clipping, overlap or surrounding-layout drift. Focus and selected content
   reveal themselves. The existing stable inert adornment-cell ruling remains.
9. **Story is a receiver, not prose.** The canonical tab-semantic specimens
   dogfood reciprocal tab/panel IDREFs and actual panels. Tooltip/plain branches
   share one renderer and adornment cell. Component-side refraction auto-arm
   stays absent; the application root owns bootstrap.

No new Tabs component, selection engine, drag engine, width token or private
receiver shim is selected.

### B. Slider — A11Y W2-E/W2-F after MATERIAL W4

The component's job is direct, precise value manipulation through a recessed,
transmissive track while semantic value owners remain unambiguous.

1. **Real coarse action floor.** Each value owner has a non-overlapping
   `44×44px` minimum action region under true coarse input. Centre, four corners
   and four edge midpoints perform or begin the intended action through a
   documented owner/path; none hits a neighbour or page control. A pseudo size
   or root minimum without action is RED.
2. **First-action directness.** The first deliberate tap/drag from rest acts
   exactly once. Scroll-intent arbitration preserves vertical page scroll,
   cancellation and reentry release all gates/holds, and no warm-up touch is
   required.
3. **Semantic value owners.** Keyboard behavior, bounds, invalid/error linkage,
   orientation, direction and inversion remain GREEN. Multi-thumb controls
   expose a stable group concept plus distinct minimum/maximum owners; one label
   cannot be fanned out as indistinguishable sibling names.
4. **Focus modality.** Natural Tab/Shift-Tab creates the house-visible focus
   ribbon; pointer focus does not impersonate keyboard focus. Forced colors and
   invalid state remain visible. The standard and spectrum forms obey the same
   modality law.
5. **Movement of Momentum.** Direct manipulation originates at the engaged
   value position, follows the pointer without a swallowed onset, releases and
   reverses continuously, and leaves no velocity or listener state behind.
   Motion-off/OS-PRM have the adjudicated immediate/calm terminal; idle rAF is
   zero. Static Slider does not gain decorative perpetual motion by default.
6. **Goal of Glass.** Track and fill preserve one restrained chroma event,
   readable contrast and meaningful substrate transmission. Patterned calm and
   high-chroma underlays plus opaque/blur-off mutations must distinguish frost
   from a flat luminous bar. Paint stays clipped and sharp at native DPR.
7. **Public consumption only.** Shared track well, liquid fill and value marks
   remain the one producer vocabulary. The reference story and external
   consumers use documented props/tokens/compositions, not descendant selectors
   or copied classes. Both public style entries must contain the same declared
   defaults after the package transaction.

This contract does not freeze a visible thumb, pseudo halo, wrapper, event
forwarder, CSS property name, or material-strength value. It freezes observable
ownership and idiomatic public consumption.

### C. Alert — `BJ.W-ALERT-IDIOM`, W1/W2, A11Y W3/W4 and W-COLO-3

Alert is a calm, readable status surface, not a square utility box and not a
miniature Toast.

1. Default Alert consumes the semantic Card radius role; all tones preserve the
   relation. No raw component-local radius is added.
2. The role-appropriate blur rung, bright-top/quiet-side rim, tone wash/ink and
   title/body hierarchy form one idiomatic material. Busy-underlay, light/dark,
   reduced-transparency and forced-colors proofs judge the whole surface.
3. Persistent Alert remains motionless. Breath of Life is material presence,
   hierarchy and contextual entrance owned by a parent composition—not an idle
   Alert clock.
4. Silent-by-default and explicit polite/assertive policy remain. Dynamic
   insertion/update fixtures must prove timing, reading order, duplicate
   suppression and no fictitious initial emergency in Chromium accessibility
   trees and actual Safari/VoiceOver.
5. `alertVariants` remains public while its definition/import moves to a leaf;
   restoring `Alert.vue -> ./ -> Alert.vue` must recreate a value SCC and fail.

### D. Card — preserve the producer; repair/prove the named receiver

Card's `16px` semantic radius, static anatomy, delegated Surface material,
non-command boundary and transition-free PRM shrink terminal are GREEN. This
cohort does not authorize a Card producer redesign or idle animation.

The canonical scroll-owned Card specimen is RED as a receiver: when it itself
owns scrolling it needs a stable accessible name/title relation, visible
self-focus, keyboard reach, complete content reach, zoom/mobile geometry and AT
order. Those semantics are authored by that receiver, not inferred on every
static Card.

## Colocation and test-isomorphism law

Each implementation mechanism gets one nearest defining detector:

- Tabs selected geometry/gesture/lifecycle with Tabs and its shared helper;
- Slider action owner/focus/naming with Slider;
- Alert radius/material policy with its defining recipe leaf, and the value
  graph with the colocation gate;
- Card scroll semantics with the story/receiver that opts into scrolling.

Tests must mutate the mechanism they claim to guard. Source-class, mocked-rect,
computed-pseudo and tautological self-centre assertions cannot impersonate live
geometry/action. Browser, package and AT gates remain separate integration
layers rather than being folded into unit tests. Shared-helper changes re-prove
every actual consumer; no component-local fork is accepted merely to avoid that
responsibility.

## Preserved GREEN invariants

The later cuts must not trade away:

1. Tabs native buttons, one roving machine, automatic/manual activation,
   Home/End, disabled skip, orientation/RTL behavior and selection-following
   indicator semantics.
2. Tabs' library Select responsive composition, stable adornment-cell direction,
   and absence of component-side refraction bootstrap.
3. Slider mounted semantic thumbs, keyboard value mutation, range ordering,
   uncontrolled mode, vertical/disabled/error linkage, marks, shared value
   domain, logical origins and drag-scoped rAF.
4. Slider's shared track/fill/mark direction and the clean-break preference over
   copied receiver paint.
5. Alert's silent default, explicit announcement policy and readable tone
   hierarchy.
6. Card's static semantic boundary, semantic radius role, proportional anatomy,
   delegated material and PRM terminal.
7. No retry, synthetic forwarding, fixed delay, private selector, consumer size
   patch or second renderer/state machine as a cure.

## Agglomerated owner routing

| Mechanism | Existing owner | Adjudicated delta |
| --- | --- | --- |
| Tabs geometry, motion, drag, responsive continuity | `R-TABS` / IOS FINAL W5 / Glass UX L2 | One measured selected truth; coherent generation/reversal; style-independent capability; scoped lifetime; no model/ARIA/panel split. |
| Tabs adornment and width | `R-TABS-ADORN` / G5 | Shared renderer plus one stable inert cell; available-width policy proves reach rather than fixing whole-button width. |
| Tabs panel semantics | `BJ.W-A11Y-LINKAGE` W2-A / story fixture | Canonical receiver dogfoods reciprocal IDREFs and responsive focus/name continuity. |
| Tabs material/refraction | MATERIAL W2/W8 | Frosted lens over meaningful underlay; preserve root-owned installer and no component auto-arm. |
| Slider shared paint/public break | `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK` | Finish package/cascade truth first; remove private story reach only after the public seam is real. |
| Slider coarse/focus/name | `BJ.W-A11Y-LINKAGE` W2-E/W2-F | Replace class/pseudo-size closure with trusted action-path, focus-modality and distinct-value-owner proof. |
| Slider motion/material | iOS FINAL Slider owner / MATERIAL W2 | First-action direct manipulation and meaningful-underlay frost; no idle-animation presumption. |
| Alert material/radius/type | `BJ.W-ALERT-IDIOM` after MATERIAL W1/W2; A11Y W3/W4 | Card-role radius plus full role material and dynamic announcement proof. |
| Alert runtime SCC | `R-DAG-TRUEUP` / `BJ.W-COLO-3` | Leaf-defined recipe, unchanged public surface, mutation-restored SCC. |
| Card scroll specimen | STORY reach / A11Y name+focus | Receiver-authored named scroll region and self-focus; preserve static Card producer. |
| Public package closure | public-8 / `R-CSS-PUBLISHED-REACH` / MATERIAL W4/W8 | Exact root/subpath/type/style/peer fixtures on one immutable artifact. |

## Dependency-ordered execution handoff

This is ordering authority, not execution authorization.

1. **Freeze the candidate and public decisions.** Preserve all foreign dirty
   bytes; record exact source/test identities; settle the public peer and clean-
   break ledgers without alias proliferation.
2. **Land foundations and topology.** MATERIAL W1 radius roles and W2 blur/material
   roles first; independently remove the Alert self-barrel through W-COLO-3 while
   preserving its public recipe export.
3. **Finish the shared Slider paint transaction.** MATERIAL W4/
   `R-TRACK-PUBLIC-BREAK` completes the one track/mark vocabulary and both public
   CSS-entry closure. Its refactor-parity pixels remain separate from later
   visual tuning.
4. **Implement Slider linkage.** Only after step 3, deliver real coarse action
   ownership, first-touch arbitration, focus-visible modality, multi-thumb names,
   motion terminals and idiomatic story consumption. Then tune material against
   meaningful underlays without reopening the DRY vocabulary.
5. **Implement Tabs as one bounded coupled cut.** Reconcile selected geometry,
   gesture capability/lifetime, model/ARIA/panel identity, responsive focus/name,
   shared renderer/adornment, width reach and motion-policy isomorphism. Any
   shared `useDragMorph` edit re-proves its other consumers. Preserve root-owned
   refraction.
6. **Implement Alert idiom after W1/W2.** Radius, blur/rim/tone/type and contrast
   land coherently; dynamic announcement fixtures and the Card scroll-receiver
   fixture may proceed as disjoint A11Y/story cuts.
7. **Build one immutable Glass 8 candidate.** Prove source -> build -> pack ->
   install -> serve byte identity; exact root/subpath/type exports; `./styles`
   and `./styles.css`; positive/negative Tabs peer policy; no source substitution
   or mutable local `dist` credit.
8. **Exercise actual receivers.** First Glass stories, then authorized external
   Tabs/Slider receivers through exact locks. Consumers use public surfaces only;
   no repin precedes the producer/package gates.
9. **Run the terminal matrix.** Two independent Browser assays over desktop and
   true mobile; light/dark and meaningful underlays; coarse/fine; touch/pointer/
   keyboard; drag/cancel/reversal/resize/zoom/RTL/vertical/multi-thumb; OS PRM and
   motion props; forced colors/reduced transparency; DPR1/3; Chromium/Firefox and
   actual Safari/VoiceOver. Retain onset/mid/settle pixels, event paths, focus/
   accessibility snapshots and package identities.
10. **Obtain two unchanged-byte independent Sol criticisms and a separate final
    adjudication.** Only that chain may close implementation/package/browser/AT/
    consumer acceptance for this cohort.

## Born-RED closure set

The final implementation must make these restored mutations fail:

- Tabs: dual coordinate truth; disabled/stale snap target; impossible-mode
  listener; selection clock divergence; prop-off WAAPI; model/visual/panel split;
  focus-losing breakpoint; unstable accessible name; clipped/miniaturised label;
  duplicated renderer/adornment; component-side refract auto-arm.
- Slider: zero/actionless coarse owner despite a computed 44px box; wrong-value
  or neighbouring action; swallowed cold first action; pointer-painted keyboard
  ribbon; identical sibling thumb names; stranded velocity/listeners; private
  story selector; opaque/blurless material mutation.
- Alert: `10px`/raw-radius regression; wrong blur/rim/tone/type role; static-only
  announcement fixture; restored self-barrel SCC; missing paint from either
  public style entry.
- Card receiver: unnamed or invisibly focused scroll owner, unreachable content,
  or nonterminal PRM shrink.
- Package: missing export/declaration/style partial, false optional-peer state,
  source-linked serve substitution, or consumer-private reach.

## Terminal disposition

The Tabs/Slider/Alert/Card **formation cohort is converged**: all three independent
critics have been reconciled, contradictions are bounded, GREEN invariants are
preserved, every mechanism routes to an existing owner, and no API spelling or
new row is prematurely frozen.

The product cohort remains **RED**. C35 proves truthful discovery, not an
immutable package, trusted full-action matrix, material/raster acceptance or AT
delivery. The handoff above is restart-safe and parsimonious: repair shared
foundations once, then component behavior, then package, real receivers,
cross-browser/AT evidence, and only finally independent close.
