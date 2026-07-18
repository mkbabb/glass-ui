# Suffusion critique — the proportion pass (IOS27-MICRO)

Verified-model: claude-fable-5 (the system-context model ID, returned verbatim).
Role: proportion critic. The drafts were assumed over-suffused; every quality had to convince me
it belongs on its component. Axes enforced: aristotelian proportion, the readable-transparency
law, the cost envelope (zero idle rAF, PRM seats every motion), consumer truth (no physics for
gestures no component has), and novelty honesty (rewording iOS is not a novel affordance).

Verified before ruling: the DAG (`../BJ/formation/component-graph/component-graph.json`) counts
69 component nodes — role counts match by-archetype exactly; by-novelty's "68 components" is
wrong (it dropped the unroled configurator). Every facility cited as shipped was found on disk:
`useLiquidPress`, `useLiquidFlex`, `writeVelocityWeight` (the 0.618+0.382·v law verbatim),
`useDragVelocity` (`--atom-drag-v`), `usePointerVelocityField`, `useSelectionIndicator`,
`useElementMorph`, `useDockHold`, `springPresets`/`springProjection`, `--ease-cartoon-punch` and
`--motion-weight: 0.618` in scheme-motion.css. No draft cites a phantom facility — good. One
facility exists that NO draft consumes: `useViewTransition` (motion/core) — see MISSING.

---

## Draft A — by-archetype

The strongest skeleton: the state ladder, the dose matrix with load-bearing zeros (tooltip,
static card, substrate), and the modal-derivation rule are keepable as-is. Its failure mode is
generosity at the edges — variants without consumers and a few internal contradictions.

### Cuts

1. **Keyboard-momentum highlight (archetype E) — CUT.** "Held arrow-down builds momentum,
   release coasts 1–2 rows and settles." A highlight that coasts past the row where the user
   stopped is a correctness hazard — Enter mid-settle commits a row the user did not choose.
   Draft B's own fence rules it: keyboard/AT input always gets deterministic preset motion, zero
   seeded velocity. The lens may travel FAST under key repeat; it must always land exactly on
   the focused row, never beyond it (draft C's P8 gets this right: native focus is truth, the
   lens is paint).
2. **Dark-mode-toggle press-velocity into the flip spring — CUT.** A click has no travel;
   its pointer velocity is sensor noise. B's anti-matrix ("click ≠ fling") wins. A is internally
   inconsistent here — its own switch section says "a tap is a slow place," seeded zero.
3. **Instrument-chassis velocity-linked bezel glint — CUT.** Light motion driven by data churn
   on a data-display container violates B's anti-matrix (no engagement specular on data-display)
   and C's P11 ruling (observers stay calm). A self-glinting dashboard bezel is exactly the
   "self-important numbers" noise P11 rejects.
4. **The breathing caret (archetype D) — CUT.** The native caret blink is already the life
   sign; a second idle motion inside the user's typing focus is idle animation with no relay
   value, in the one place calm matters most.
5. **The bespoke field loading rim-glint (archetype D) — CUT.** A's own §5 swears ONE uniform
   loading vocabulary (the slow luminance drift) "so loading is recognizable anywhere," then D
   mints a traveling rim glint. Internal contradiction; the §5 drift wins.
6. **avatar→person-card and metric→detail-chart modals — PARK.** The derivation rule requires
   "a natural detail form the small body visibly IS" — but no person-card and no chart component
   exist in the DAG. A variant that morphs into a component the library does not have is a
   consumer-less substrate. Park until the detail forms exist.
7. **Tabs press-and-hold magnified picker — PARK.** The library's tabs are content tabs, not a
   thumb-zone OS tab bar; press-and-hold collides with text selection and the context menu on
   desktop and has no mobile-nav consumer on disk. Revisit only if a bottom-nav tabs consumer
   materializes.
8. **Badge mass-proportional pulse — BOUND to a single uniform pulse.** At sub-24px the
   difference between a 1→2 pulse and a 99+ pulse is below the perceptual floor; dose below
   perception is pure cost. B's own micro-element rule (single-clock under 24px) applies.
9. **Progress value-spring overshoot — BOUND: ζ≥1 on progress, always.** A's "burst of updates
   reads as one accelerating run" is fine as smoothing, but any overshoot on a progress fill
   shows progress that has not happened — the relayed state lies. (The slider's fill-overshoots/
   value-clamps trick is fine on a control the user is driving; progress is an observer.)
10. **Number-field modal dial/strip — PARK.** The number-field has no drag-scrub gesture on
    disk; physics for a gesture no component has is consumer-less. Prove the slider modal first;
    the sibling derivation costs nothing to defer.
11. **Carousel item press-grow-then-navigate — BOUND.** "Navigating" to what? The carousel has
    no route semantics. Opt-in only, where a consumer wires a navigation handler; never default.
12. **Separator taffy stretch — BOUND** to the accordion section-handoff only, never standalone.
    An inert line has no independent life; during a user-driven morph it is transient and earns
    its trace dose.

### Keeps that earned their place

- **The state ladder (§1)** — the "button states at a more abstract level" answer. The
  disabled-as-dematerialization rail (physics refusing to answer as the relay) is the best
  single idea across all three drafts.
- **The dose matrix (§8) with its zeros** — tooltip's plainness, the static card's
  lightlessness, the substrate's non-affordance. This is the proportion made auditable.
- **The modal derivation rule (§6)** stated once — gesture-continuable OR natural-detail-form.
  The rule is right; only its application over-reached (cuts 6, 7, 10, 11).
- **Slider modal + grow-on-engage (archetype C)** — the exemplar, correctly maximal. "The
  maximum dose in the library IS the proportion speaking" is the right defense.
- **The gap ledger (§9)** ranked by archetypes-unblocked — the fraction-keyed reveal ladder and
  `useMagneticBound` at the top is the correct build order.
- **Tooltip zero-dose and search→command-sheet** — both exactly right; command already exists
  as the enlarged form, a real consumer.
- **The momentum contract (§7)** — "(value, velocity), never value alone" and acceleration read
  as weight-attack rather than a third var.

---

## Draft B — by-quality

The most disciplined draft — the per-quality anti-matrices are the critique pre-done, and most
of my rulings against A and C simply enforce B's own fences. Fewest cuts; one internal
contradiction.

### Cuts

1. **Ledger cell control×Q10 = "—" — AMEND to ◐ (modal variants only).** B's own exemplar
   section gives the slider modal the full Q10 scrub; the ledger forbids it. The ledger is
   sworn as "a wave that lights a — cell is over-suffusal by definition" — so the cell must be
   honest before it can be law.
2. **Q1 on tabs swipe-past-ends — PARK** behind a tabs swipe facility. Tabs have no swipe
   navigation on disk; same consumer-truth rule as A's number-field.
3. **Q8 on chip drag-to-delete — PARK.** No drag-to-delete gesture exists on chip. The taffy
   zone lands with the gesture, not before it.
4. **Q9 on number-field drag stops — PARK** (same as A cut 10 — the gesture does not exist).

### Keeps that earned their place

- **The six-scalar contract (§0)** — qualities as projections onto shared scalars, no second
  engine, no free-running clock. This should be the FINAL's spine.
- **Every anti-matrix** — especially: no overpull fighting native rubber-band on readable
  surfaces; keyboard gets deterministic motion; text opacity is not a design channel; earned
  one-shots never scrub; "never more than four channels — a fifth clock is noise."
- **Q10's honest cost admission** — `--scrub-t` as the ONE inheriting scalar, price named,
  Safari paint-profile gated before the contract is sworn (open question 2 stays open).
- **The PRM one-liners per quality** — "PRM removes physics, never information" is the
  cost-envelope law stated correctly, and B is the only draft that seats every quality.
- **Q2 as an audit, not a build** — the discipline of recognizing weight is already carried by
  the token table, plus depth-graded travel as literally one scalar.
- **The Q9 well-strength model** (capture vs catch-and-pass as one branch in release math) —
  the cheapest correct implementation of the MARKS mid-detent.

---

## Draft C — by-novelty

The right ambition and the two best genuinely-novel proposals (P8, P4) — but also the two
worst proportion violations, both from the same root: mistaking arbitrary variation for
expression.

### Cuts

1. **P3 velocity-inheriting unfurl — CUT.** The proposal's entire input is the pointer velocity
   of a CLICK — sensor noise, not intent. A user cannot deliberately modulate click-approach
   velocity, so identical intents produce different animations: arbitrariness wearing
   expressiveness's clothes. B's fence ("click ≠ fling") rules it out explicitly. The
   novelty-honesty test also fails in reverse — iOS doesn't do this because it is wrong, not
   because Cupertino lacked the idea. What survives of P3 is its second half — depth-graded
   item entrance — which is already Q2/A-E and needs no proposal. Where a REAL travel gesture
   opens a panel (drawer drag), velocity inheritance is plain Q7.
2. **P10's extent-encoding stiffness — CUT; keep only the narrow Q1 overscroll on
   gesture-owned chrome.** Three independent failures: (a) infinite-scroll's remaining extent
   is typically unknown — the relay has no signal to relay; (b) the draft's own bound admits
   users must NOT be able to read it precisely — a relay designed to be unreadable is not a
   relay; (c) stiffness varying with data means the same gesture feels different across
   sessions, which reads as inconsistency, not information.
3. **P10 on the data-table scroll shell — CUT.** Direct violation of B's Q1 anti-matrix: never
   double-fight Safari's native rubber-band on readable surfaces. Carousel/deck (gesture-owned,
   not native-scroll) keep it.
4. **"Dock collapsed by command" out of P9 — CUT from the list.** A routine collapse is not a
   consequential user-confirmed commit; P9's own bound says so. Anticipation is a destructive-
   register move — a wind-up on ordinary chrome motion is a nag by the third occurrence.
5. **P9 timing — BOUND: the dip never adds latency.** "Dips −4%, then commits" must not
   sequence an 80ms delay in front of every destructive action; the dip replaces the first
   ~80ms of the commit travel inside the existing duration budget, and the action dispatch is
   never gated on it.
6. **P2 charge glow — PARK until a real hold consumer ships.** Named consumers are "destructive
   confirm, long-press menu, chip delete" — none has a hold gesture on disk (the only shipped
   hold is the dock's). Land P2 together with a hold-to-confirm button variant, which is a real
   and worthy consumer; do not build the glow before the gesture.
7. **P1 inline pop — BOUND to ≤φ^¼ ≈ 1.128 on ALL pointers.** C's own reasoning ("at √φ an
   inline control collides with neighbors and the shell fiction breaks") beats A's 1.25 touch
   pop. The touch-precision problem is the modal variant's job — that is why it exists.
8. **P6 stack ripple — BOUND, and the toast-entrance conflict goes to prototype.** The catch on
   the arriving toast is honest weight; the ripple animates peripheral elements the user is not
   looking at, on every arrival — peripheral vision is motion-sensitive, so this risks being
   MORE distracting than A's calm `transient` bloom. Default remains A's bloom; C's caught
   landing is the challenger, decided by the peripheral-distraction test in the prototype pass.
   Ripple amplitude self-bounds past depth 2 (4px·φ⁻ⁿ < 1.5px) — cap it there explicitly.
9. **Defect-(b) mechanism honesty — RENAME.** "A pre-blurred snapshot layer" cannot be cheaply
   made from live DOM on the web. The real mechanism is an opacity-ramped backdrop-filter
   layer — name it as such, and profile whether Safari keeps paying for a backdrop-filter at
   opacity 0 (it may not skip it; that is the actual cost question).
10. **P5 novelty label — CORRECT THE CLAIM.** P5 is the Find My anatomy transcribed (MARKS §3)
    plus two real additions. The novel content is the sibling-legibility gate and the momentum
    tick — say so; the lens itself is adoption, not invention. (The tick stays gated on C's own
    convergence test 3 — a 4-slot jump must not feel slower than its 500ms budget.)
11. **"68 components" — CORRECT to 69.** The graph is deterministic truth; C dropped the
    unroled configurator from the count while the other drafts counted it and excluded it by
    ruling, which is the right way.

### Keeps that earned their place

- **P8, the traveling focus lens** — the best novel proposal in the campaign. Keyboard finally
  gets the acceleration channel; a11y truth outranks paint (native focus instant, lens is a
  follower); PRM story coherent. No OS does this.
- **P4, per-content desync** — the read-beat for destructive dialogs gives the choreography
  MEANING, which iOS's uniform desync lacks. The bound (three named permutations, total entry
  inside the panel clock, a11y timing never re-ordered) is exactly proportionate.
- **P11's ruling as written** — the mostly-reject with the one-hop driver→display inheritance
  is the most aristotelian paragraph in the three drafts. Adopt verbatim.
- **P7 strain shimmer** — light under load, gesture-scoped, dies with release, luminance under
  the text floor. Correctly threads the MARKS no-idle-specular law.
- **P9's core** (anticipation on destructive commits, bounded to once per decision) — the third
  pole is genuinely ours; scheme-motion documents why iOS's springs cannot dip below origin.
- **The 1:φ³ derivation move** — deriving the fade:stretch ratio from φ³ ≈ 4.236 rather than
  copying the measured ~1:4 is the right identity claim (see contradiction 12 — it must become
  the single authority).
- **The kinetic ledger's restraint** — one new channel (`--impulse`), zero new coefficient
  families.

---

## Contradictions between drafts — to resolve before PASS-1 spec

Ranked; each names the winner or the decider.

1. **Keyboard momentum.** A-E's coasting highlight vs B-Q7's zero-seed fence vs C-P8's
   paint-follower. RULING: B+C win. Keyboard motion is deterministic; lenses may trail, focus
   and highlight never coast past truth.
2. **Click velocity as input.** C-P3 (unfurl seeded by click energy) and A's dark-mode-toggle
   vs B's "click ≠ fling." RULING: B wins, both cut.
3. **Toast entrance.** A's `transient` center-seed bloom, exit-never-overshoots vs C-P6's
   fall + caught landing + ripple. DECIDER: prototype pass, peripheral-distraction test.
   One entrance ships as default; my default is A's bloom.
4. **Progress motion.** A-I's velocity glint + chained springs vs B's "progress never
   choreographs / no inertia theater." RULING: split — the fill-tip glint is allowed as an
   information channel (it relays the derivative, an honest answer to "is it stuck?"); any
   overshoot on the fill is banned (ζ≥1); no entrance choreography.
5. **Data-table overscroll.** C-P10 vs B-Q1 anti-matrix. RULING: B wins — native rubber-band
   owns readable surfaces.
6. **Slider inline pop scale.** A 1.12/1.25-touch vs C ≤1.128 hard cap. RULING: C wins; the
   modal is the touch answer.
7. **Slider modal mechanism.** A: dock-to-card growth choreography + fraction-keyed ladder.
   C: FLIP re-home of the same element via `useElementMorph`. These are different motions with
   the same name. DECIDER: prototype pass (C's own convergence item 1 — the no-detach scrub
   across a `position: fixed` re-home is the hardest Safari claim on the table). The winner
   must still satisfy A's choreography spec (anchored edge, sides breathe, ladder).
8. **B's ledger vs B's exemplar** (control×Q10). RULING: amend the cell to ◐ modal-only.
9. **Acceleration channel.** A-§7 "no consumer needs `--atom-drag-a`" vs C's `--impulse`.
   RULING: compatible if scoped in one voice — `--impulse` is a decaying RELEASE-burst event
   channel, not a continuous acceleration var; no continuous accel var exists. Both specs say
   exactly this or one of them is wrong.
10. **Loading vocabulary.** A-§5's uniform luminance drift vs A-D's traveling rim glint
    (internal to A). RULING: one vocabulary, the drift.
11. **Component count.** 69 (graph) — C corrects to 69.
12. **Fade:stretch authority.** B carries measured ~R/4; C derives R/φ³. RULING: adopt the φ³
    derivation as the stated law with the measurement cited as confirmation — one authority,
    the library's own.
13. **Three coverage matrices.** A's 12 archetypes × 7 qualities, B's 11 roles × 10 qualities,
    C's P-coverage by role. The FINAL needs ONE proportion ledger. RECOMMENDATION: B's roles ×
    B's ten qualities as rows/columns (roles are the graph's deterministic truth; A's archetype
    splits become row annotations where physics diverge within a role), with A's dose dots and
    B's anti-matrix dashes merged — a dash is law, a dot is dose.

---

## MISSING — the under-suffusal (the converse the user demanded)

1. **The theme/dark-mode flip as a medium change — the largest miss.** All three drafts treat
   the dark-mode-toggle as a control and none treats the FLIP as what it is: the page-level
   medium change, the exact Q6 medium channel at whole-world scale. `useViewTransition` sits on
   disk unconsumed by any draft. The flip deserves the three-clock treatment: medium leads
   (the world re-tints fast), content paint follows, nothing stretches. This is also the one
   choreography every consumer of the library triggers daily.
2. **Tabs-overflow self-centering — the second Safari good idea, unclaimed.** MARKS §3 note 4
   names two things Safari wins: the idle sweep (adopted by A and B) and the pill carousel —
   the world scrolls so the active item centers under a quasi-fixed lens. No draft specs
   overflow behavior for tabs/toggle-group; today an overflowing tab row presumably just
   scrolls. World-moves-lens-stays is measured, cheap, and missing.
3. **labeled-field's label float.** The one choreography moment a text field owns — the label
   rising from placeholder position to its perch on focus — is the D archetype's signature
   move and no draft specs it. It should ride the same two-clock law (label travel + rim
   brightening on separate clocks) at whisper amplitude.
4. **typewriter cadence physics (trace).** A lists it as vocabulary and moves on — but a
   typewriter whose cadence has no attack/decay is a metronome. Momentum applies to its clock:
   ease-in over the first characters, settle at the end, a carriage-beat at line wrap. Trace
   dose, but the converse mandate says name it.
5. **Validation SUCCESS choreography.** A specs invalid (shake + rim flood); success is only
   implied via FeedbackMark. The mark-draw (handmark stroke vocabulary) on a field turning
   valid is the positive half of the relay and costs nothing new — the checkbox already owns
   the vocabulary.
6. **header-ribbon's condensation ladder.** Named by A in one clause ("condenses through a
   height-mapped ladder, never a binary snap") with no ladder spec — which elements dematerialize
   at which scroll fractions. It is the scroll-driven twin of the drawer ladder and should be
   specced from the same fraction-keyed primitive.
7. **The `--medium-t` substrate handshake is single-sourced.** Only A's gap ledger names it;
   B's Q6 and C's defect-(b) both need it (an overlay's medium change should recruit the
   substrate). Co-own it in the FINAL or it will be built for one consumer and overfit.
8. **One PRM table.** B seats PRM per quality, A per archetype (partially), C per proposal.
   The FINAL needs the single table — every quality × PRM behavior — or PRM coverage will be
   asserted three ways and verified none.

---

## The dose verdict in one paragraph

The three drafts agree on far more than they contradict, and the agreement is largely CORRECT —
the slider-flagship, the dock's full row, the tooltip/static-card/substrate zeros, the
two-tier material law, and the release-seam momentum contract all survive scrutiny. The
over-suffusal concentrates in three places: variants without consumers (person-card, detail
chart, tab hold-picker, number-field dial, chip drag-delete, tabs swipe — all parked, none
cut forever), input dishonesty (click velocity and keyboard coast — cut permanently), and
observer self-importance (bezel glints, data-driven stiffness, progress overshoot — cut or
clamped). The under-suffusal is real but small: the theme flip is the one genuinely large
forgotten surface. Enforce B's anti-matrices as law, A's ladder and dose matrix as structure,
C's P8/P4/P11/P7 as the novelty spine — and the campaign's proportion holds.
