# Suffusion draft — BY-NOVELTY lens (IOS27-MICRO)

Verified-model: claude-fable-5 (the system-context model ID, returned verbatim).
Lens: BY-NOVELTY — best iOS 27, do not copy it. Every proposal here is an affordance the
video does NOT show, derived from the library's own φ system rather than transcribed from
Cupertino. Charter clauses served: hallmarks 5–6 (CHARTER.md) — suffuse bounded magnetism,
weight, specular, true glass, readable transparency, choreographed multi-dimensional
animation across the DAG, with proper state relayed per variant; and the momentum/velocity/
acceleration facility for ALL components.

DesignSync reachability: the tool loads and answers — `list_projects` returns zero writable
design-system projects, so there is no remote project to route judgment through. Design
judgment here rests on the local derivation authority (below) + MARKS; the frontend-design
skill is the standing fallback for the prototype pass. Prior BI.W-ENGAGE-AFFORD /
breath-of-life claims are under REFABLE redo and are cited nowhere — every facility named
below was verified on disk this session.

## The derivation authority (found in src, not invented here)

The φ system is already the library's spine — the proposals below extend it, never fork it:

- `--motion-weight: 0.618` — rest deformation at 1/φ (tokens/scheme-motion.css §2.W).
- `writeVelocityWeight` — the velocity boost span is exactly 1/φ²:
  `weight = 0.618 + 0.382·flexVel` (composables/motion/core/writeVelocityWeight.ts).
- liquid-enter beat overlap — per-beat delay = spring settle × 1/φ (glass/liquid-enter.css).
- Type scale √φ = 1.272, φ = 1.618, φ² = 2.618 (typography/scale.css); spacing φ² and
  φ³ = 4.236 (`--space-phi-5/6`, tokens/sizing.css).
- The spring table — 7 presets, overshoot fenced to [0%, 10%], velocity-continuous re-seat
  via kf `SpringProgress` (motion/spring/springPresets.ts, useLiquidPress.ts).
- The third pole — `--ease-cartoon-punch`, the only curve that dips below origin
  (anticipation) before overshooting (scheme-motion.css §2.X).
- The derived pointer chain — position → velocity → acceleration + a decaying flick burst
  (motion/pointer/usePointerVelocityField.ts).
- The driver/observer carve — drivers may carry weight; observers pin `--motion-weight: 0`;
  PRM zeroes the goo globally (scheme-motion.css).

One measured bridge from MARKS worth naming: iOS's fade:stretch desync measures ~1:4.
φ³ ≈ 4.236. We do not copy the 1:4 — we DERIVE 1:φ³ and own it (P4).

## The universal facility first — the kinetic ledger

The exhortation's second clause ("MOMENTUM and VELOCITY and ACCELERATION tracking — ALL of
our components") is not a per-component feature; it is one seam. The pieces already exist
severally: `useLiquidFlex` computes the saturating velocity term, `writeVelocityWeight`
folds it into a transient weight, `usePointerVelocityField` derives acceleration + burst,
`SpringProgress` re-seats targets velocity-continuously.

Proposal: standardize the three channels every DRIVER surface publishes on itself —

- `--flex-vel` — the saturating velocity term (exists, registered non-inheriting).
- `--motion-weight` — the transient boost via the existing 0.618 + 0.382·v law (exists).
- `--impulse` — new, the acceleration/burst channel: the decaying flick impulse
  `usePointerVelocityField` already derives, written element-locally at gesture release.
  This is the ONE new channel; it is what P3, P6, and P9 read.

No per-component coefficient cohorts (the scheme-motion fence holds — zero new `--*-k`
families). A component "has the facility" when its driving composable calls the two
existing writers plus the impulse writer at release. Observers never publish — data-driven
motion stays weightless (see P11 for the one earned exception).

---

## P1 — the shell-pop slider (the named exemplar) — DEVELOP

Affordance. On engagement (pointerdown on the thumb, coarse pointers), the slider pops
slightly out of its shell — the control lifts off its recessed track well on an idiomatic
eased curve: scale to φ^¼ ≈ 1.128, shadow deepens one rung, rim brightens, the track's
tick marks materialize under it. The stacked modal variant: on mobile press-hold, the whole
control re-homes into an anchored popup at √φ ≈ 1.272 linear scale — the SAME element
morphing (FLIP via `useElementMorph`), the finger never detaching, the scrub never
interrupted.

State-relay. Precision gain. The pop says "you have acquired me"; the enlargement says "your
finger now commands finer increments" — and makes it true: the same value range mapped
across √φ more pixels is a real ×1.27 precision gain, and the materializing ticks + a
counting readout (`useAnimatedNumber`) make the gain legible, not just felt. iOS enlarges
nothing on slider engagement — this is ours.

Mechanism. `useLiquidPress` on the thumb (press preset, reciprocal squish + `--press-t`
specular leg); container scale on the dock spring; the modal variant is a popover-anchored
clone-free morph — one element, `position: fixed` re-home, FLIP transform, scrub state
carried through the morph (the MARKS everything-is-a-scrub law). Ticks and readout ride the
liquid-enter ladder keyed to the pop fraction, not to time.

Proportion bound. Pop ≤ φ^¼ — at √φ an inline control collides with its neighbors and the
"shell" fiction breaks. Modal variant only on coarse pointers AND only when the slider's
container grants headroom (a data-dense form row never spawns popups). One popped control
at a time — the lens is a singleton. Keyboard operation gets full function, zero pop. PRM:
the enlargement snaps, the ticks appear, the physics is off.

## P2 — charge glow under held pressure — DEVELOP

Affordance. A control with a hold semantic (destructive confirm, long-press menu, the
press-and-hold chip delete) accumulates a specular charge while held: the glow blooms
outward from the contact point along the spring's own settle curve — fast at first,
saturating as commit approaches. Release before threshold: the charge drains back on the
press clock. Threshold crossed: the action commits on `--ease-cartoon-punch` — the one
earned use of the loud register per surface.

State-relay. Progress toward a different action. iOS long-press is a silent timer with a
cliff at the end; ours is a continuous, honest meter — the saturating curve TELLS the user
"most of the distance is behind you" exactly when it is. Drain-on-release relays a clean
cancel; slide-off relays abort. The glow is the state machine made visible.

Mechanism. One `useSpring` (gentle preset — ζ=1, no overshoot on a meter) driving a
`--charge-t` custom property; the surface CSS maps it to bloom radius + rim luminance on
the specular layer (screen-blended, z-under text — defect (a) discipline, below). Commit
threshold = the spring's t90. The commit punch composes `--motion-weight: 1` per the loud
coupling rule.

Proportion bound. ONLY on controls whose hold means something — a plain button press stays
on the sub-200ms press preset with zero charge; charging a navigation button would teach
users to fear taps. Glow luminance capped below the text-contrast floor at all charge
levels. Never on hover — charge requires commitment (pointer down). PRM: charge becomes a
plain determinate ring, no bloom.

## P3 — velocity-inheriting unfurl (dropdowns and their kin) — DEVELOP

Affordance. A dropdown-menu/select/combobox/command panel's unfurl inherits the click's
energy. A sharp flick-tap unfurls briskly with the fenced overshoot; a slow deliberate
press unfurls dead calm. Items land on the depth-graded ladder — deeper rows travel
farther (grade span 1/φ² across the stack) and arrive later (liquid-enter's 1/φ overlap).

State-relay. "I heard HOW you asked, not just what you asked." This is MARKS §6's measured
law — overshoot only when arriving fast, dead landing when placed slow — promoted from
continuous gestures to discrete opens, which iOS does not do (its menus have one canned
open). Secondary relay: the depth grade makes list depth legible pre-scroll — a long menu
visibly uncoils, a three-item menu barely stirs.

Mechanism. The pointer chain's release velocity + burst seed the panel's `useSpringMount`
initial velocity (`SpringProgress` accepts a live (position, velocity) seat — verified in
useLiquidPress's interruption contract). Seed magnitude = k·tanh(|v|) so it saturates;
the overshoot stays inside the 10% fence because the seed is capped where the projection's
`peak` says the fence would break (springProjection.ts exposes exactly this number).

Proportion bound. Keyboard and programmatic opens get rest energy — 0.618 weight, no seed
(the driver/observer carve: the keyboard is a driver but publishes no velocity; rest is
correct, zero is not). The seed never extends settle time beyond the panel clock (0.55s).
Tooltips and popovers are EXCLUDED — a hover surface inheriting flick energy would jitter;
hover is not a gesture with momentum.

## P4 — per-content desync choreography for dialogs — DEVELOP

Affordance. The dialog family keeps the three-clock law (medium, fade, stretch — MARKS §5)
but the BEAT ORDER is keyed to content role, declared per slotted region. A destructive
dialog leads with the title and holds the action row back one full beat — the read-beat. A
form dialog leads with the field, and focus arrives WITH it. A media dialog leads with the
pane and lets chrome trail. Clock ratio derived, not copied: fade = stretch/φ³ (iOS
measures ~1:4; φ³ ≈ 4.236 is ours), beat overlap = settle × 1/φ (the liquid-enter law,
already shipped).

State-relay. The choreography announces the decision type before a word is read: "slow
down" (destructive), "type here" (form), "look" (media). iOS desyncs channels beautifully
but identically for every sheet — the desync carries no meaning. Ours carries the meaning.

Mechanism. liquid-enter already runs weight-scaled multi-channel beats; add a
`data-enter-role` attribute per slotted region that permutes beat ORDER only — same
curves, same clocks, one attribute. The scrim/medium leg uses the P-defect-(b) ramp below.

Proportion bound. Total entry stays inside `--duration-panel` (0.55s) regardless of
permutation — the read-beat is bought by starting the title EARLIER, never by ending
later. DOM focus order and aria-live timing never re-order with the visual beats (a11y
truth outranks choreography). Three named permutations only — a per-dialog free-form beat
API is an invitation to arrhythmia. PRM: fade-only, one clock.

## P5 — the continuous liquid lens for ANY segmented control — DEVELOP

Affordance. Tabs, toggle-group, radio-group, pager-dots, chips-as-filter: one lens body,
always. Press-charge at the source (P2's glow, brief), goo travel where light leads and
geometry follows, oversized arrival (scale +10%, the fence ceiling, held ~200ms), cool to
rest — the Find My anatomy. The two novelties iOS lacks: (1) sibling labels REMAIN LEGIBLE
under the traveling bloom (defect (a) beaten); (2) the momentum tick — a jump of ≥2 slots
catches each intermediate detent with a micro-catch (~170ms weak spring well crossed at
speed, MARKS §6.2), so the eye can COUNT the travel.

State-relay. Selection is a place the lens LIVES, not a style that teleports; the tick
relays travel distance — after a 4-slot jump the user knows it was 4 without reading.
Continuity itself is the relay: the lens never blinking means selection state was never
ambiguous, even mid-gesture.

Mechanism. `useSelectionIndicator` + `useLiquidFlex` already own the stretch-and-settle;
add the bridge phase (the indicator spans source→target during travel — one element,
scaleX driven) and the detent wells (per-slot weak targets the traveling spring crosses;
crossing fast = the catch, stopping = the seat). Bloom is a separate screen-blend layer
BELOW the label z-plane, luminance-capped — text stays full-opacity white per the MARKS
material rule.

Proportion bound. The luxury clock is not universal: Find My's 1.2–1.4s press-to-settle is
right for a 5-item root nav, wrong for a filter chip row — travel ≤ 500ms (snappy) for
control-register segments, the long register reserved for `nav`-role surfaces (the dock,
primary tabs). Keyboard arrows re-seat the lens instantly at rest weight — no goo on
keys. Ticks only when jump ≥ 2; a neighbor move is one motion, not a count.

## P6 — toast arrival with true weight and a caught landing — DEVELOP

Affordance. A toast ARRIVES — falls (top placement) or rises (bottom) with the transient
preset, and the landing is caught: a one-beat volume compression at contact (reciprocal
squish keyed to arrival velocity, `useLiquidFlex`), while the stack beneath absorbs the
impact — each older toast dips and rebounds with amplitude ×1/φⁿ at depth n, one beat
late per rung.

State-relay. Newness and order made physical. The catch says "this just landed, it has
weight, it is real"; the decaying stack ripple says "these are older, in this order" —
recency encoded as physics, glanceable from peripheral vision, which is where toasts live.
iOS notifications slide in flat; nothing in the video catches a landing.

Mechanism. `useSpringMount` (transient preset) for the drop; at first target-crossing,
write `--impulse` on the stack container; each toast reads it with a depth-indexed delay
(the liquid-enter stagger seam) and amplitude 1/φⁿ. Compositor-only — translate + scale,
never layout.

Proportion bound. Impact amplitude ≤ 4px at depth 0 — a toast is a courier, not a
wrecking ball. Ripple needs ≥1 toast beneath; a lone toast gets only its own catch. Under
toast-storm (a new arrival while the ripple lives), impulses do not stack — the newest
wins, the old ripple is released (no resonance). Under PRM the transient preset's
endpoint-snap governs: appear, no fall, no ripple.

## P7 — strain shimmer at the magnetic bound — DEVELOP (new, no iOS precedent)

Affordance. When a surface is held PAST a detent (the dock overpulled, a drawer
over-dragged, a card pinned at its ceiling), iOS relays strain through compression alone
and otherwise sits dead. Ours adds light: rim luminance rises with strain depth —
glass under load catches the light — plus a sub-1% breathing while pinned (the surface is
engaged, not frozen).

State-relay. "You are past the bound, this far, and I am still listening." Strain depth
becomes readable without motion; the breath distinguishes held-live from stuck. This is
the bounded-magnetism hallmark given a second, visual channel.

Mechanism. The overpull driver already computes displacement past the detent; map its
normalized strain to the existing rim/specular custom properties (the `--press-t` seam
generalized to `--strain-t`). Breath = a 2s scale oscillation at ±0.4%, gated by
pointer-down AND strain > 0.

Proportion bound. MARKS material rule 3 is the fence: no specular event on a static
surface — the shimmer exists ONLY while the finger holds the strain, and dies with
release (the springback carries no glow). Luminance delta under the text-contrast floor.
Breath amplitude sub-perceptual as motion, perceptible only as aliveness — if a user can
point at it, it is too big.

## P8 — the traveling focus lens — DEVELOP (new, no OS precedent)

Affordance. Within a bounded form/toolbar/dialog container, keyboard focus does not
teleport — the focus rim travels as a lens between controls, stretching along its travel
axis (liquid flex), and repeat-rate is its velocity: held Tab accelerates the lens, so the
acceleration channel finally serves the keyboard.

State-relay. Traversal direction, distance, and speed — the three things a teleporting
focus ring discards. A user tabbing through a long form SEES their momentum; a screen
watcher (pair programming, a demo) can follow focus with the eye instead of hunting for it.

Mechanism. DOM focus moves NATIVELY and instantly — the lens is a painted follower
(snappy preset, velocity-continuous re-seat on each focusin) that catches up ≤ 200ms. Tab
cadence feeds the impulse channel; the stretch is `useLiquidFlex` on the travel axis.

Proportion bound. The lens never delays or proxies real focus — a11y state is the native
ring's truth, the lens is paint (and `:focus-visible` still renders under forced-colors
where the lens does not exist). Bounded containers only — a lens streaking across a full
page reads as an intruder. PRM: the lens IS the a11y story here — it snaps, no travel.

## P9 — anticipation as forewarning — DEVELOP (new; iOS cannot do it)

Affordance. Before a spatially destructive commit — dialog dismissed by a destructive
confirm, dock collapsed by command, an item's delete — the surface dips −4% AGAINST its
travel direction (the cartoon-punch anticipation leg), then commits. The dip is ~80ms of
forewarning inside which pointer-cancel still aborts.

State-relay. "This is about to happen" — the wind-up telegraphs the consequence a beat
before it is irreversible. iOS's damped springs are monotone-from-one-side and physically
cannot dip below origin (scheme-motion §2.X documents this); the third pole is a curve
class iOS does not possess. Anticipation is our register alone.

Mechanism. `--ease-cartoon-punch` on the commit transform, composed with
`--motion-weight: 1` per the loud-coupling rule; the abort path re-seats the spring
velocity-continuously back to rest (no snap-back pop).

Proportion bound. Loud register budget: at most ONE anticipation per user decision — never
on hover, never on observers, never on repeated list operations (the third identical
wind-up is a nag). Only where the commit is user-confirmed AND consequential; a popover
close just closes. PRM: the punch re-aliases to standard ease (already shipped in the PRM
carve) — the dip vanishes, the function stays.

## P10 — boundary elasticity encoding data extent — DEVELOP NARROW, REJECT BROAD

Affordance (narrow). Scrollable CHROME — carousel, deck, the data-table's scroll shell,
fading-scroll — gets the dock's overpull law at its edges: overscroll compresses the
container volumetrically (edge-anchored, content deforming with the glass) instead of
translate-only rubber-banding. The novel twist: for infinite-scroll, end-elasticity
encodes extent — a heavy, stiff end (low compression per px) means more pages exist; a
light end (deep compression) means nearly done.

State-relay. "You are at the boundary, and the data has this much mass beyond it." Extent
becomes felt at the edge without a scrollbar glance.

Rejection (broad). Applying volume compression to raw TEXT content is rejected —
compressing a paragraph the user is reading trades legibility for physics, and the
material rule (text is never traded) outranks the motion rule. Prose surfaces keep native
overscroll.

Mechanism. Scroll-driven `scaleY` on the shell with edge transform-origin, strain from
overscroll delta; stiffness k = f(remaining pages) for the infinite case.

Proportion bound. Compression ≤ 1/φ⁴ ≈ 4.5% of the shell axis (iOS's dock tolerates −21%
height because it is opaque chrome; a content shell is not). Stiffness variation must stay
monotone and calm — the extent relay is a texture, not a gauge; if users try to MEASURE
pages by it, it has overreached.

## P11 — data inertia inherits the USER's energy only — RULED, mostly REJECT

The tempting version: metrics, animated digits, progress bars deform with change velocity —
big deltas arrive with overshoot, the digit column stretches. REJECTED for self-updating
surfaces: the driver/observer carve pins observers to weight 0, and it is right — data that
springs on its own reads cheap, and a dashboard of self-important numbers is noise.

The earned exception: when the USER drives the change — a slider scrub feeding a metric, a
scrubbed timeline feeding a readout — the linked display inherits the scrub's velocity
channel (the same `--flex-vel` the driver publishes, read by the readout's digit flex).
State-relay: cause and effect share one energy — the number moves because YOUR hand moved,
at your speed. Proportion bound: inheritance only along an explicit driver→display link
(one hop, declared); the display's amplitude ≤ the driver's; at rest it is indistinguishable
from a calm number.

---

## The four iOS defects, beaten by construction

- (a) Label unreadability under bloom (~300ms in Find My): bloom is a screen-blend layer
  BELOW the label z-plane, luminance-capped under the text-contrast floor; text stays
  full-opacity per the MARKS material rule. Carried by P2/P5/P7 mechanisms.
- (b) The ≤83ms blur cliff (Control Centre): the medium is scrubbed, not switched — a
  pre-blurred snapshot layer cross-fades on opacity (compositor-cheap, no live
  backdrop-filter animation) mapped to the FIRST 1/φ of gesture travel. The medium onset
  relays gesture progress and is reversible mid-flight; the empty-blur beat on close is
  kept deliberately (it is iOS's best moment — we keep it and make the onset worthy of it).
- (c) The Safari lens blink (handoff discontinuity): outlawed by P5's one-body law — the
  indicator element persists and stretches, never unmounts. Continuity is structural, not
  behavioral, so it cannot regress under load.
- (d) Late tiles popping dark: async content arrives through the same liquid-enter ladder
  as sync content, keyed to readiness — skeleton → materialize bloom, luminance ramped from
  the host card's own tint. Nothing pops; lateness changes WHEN, never HOW.

## DAG coverage (roles → affordances)

From the 354-node graph's role-tagged component layer (68 components):

- control (9: button, checkbox, chip, dark-mode-toggle, number-field, radio-group, slider,
  switch, toggle-group) — P1 (slider, number-field), P2 (hold-semantic variants), P5
  (toggle-group, radio-group, chip-filters), kinetic ledger on all.
- field (8: input, textarea, select, combobox, command, search, tags-input, labeled-field)
  — P3 (select/combobox/command panels), P8 within their form containers.
- overlay (5: dialog, drawer, popover, tooltip, dropdown-menu) — P4 (dialog/drawer), P3
  (dropdown-menu), P9 (destructive commits); tooltip explicitly excluded from P3.
- container (7: accordion, card, collapsible, expandable-container, separator, surface,
  tabs) — P5 (tabs), P7 (bounds), height-keyed reveal ladders (the MARKS §6.4 law) on all
  expandables.
- feedback (8: alert, badge, completion-seal, progress, pulse, skeleton, status-dot,
  toast) — P6 (toast), defect-(d) arrival for skeleton→content, P11's ruling for progress.
- chrome (5: carousel, deck, header-ribbon, pager-dots, scroll-progress-rim) — P5
  (pager-dots), P10 (carousel/deck edges).
- nav (1: dock) — the exemplar; P7 at its bounds; its findings feed GF-DOCK pass-4.
- data-display (9: metric family, table, data-table, timeline, avatar,
  instrument-chassis) — P11's narrow inheritance only; observers stay calm.
- substrate (8) + motion-primitive (7) — carriers and fields; observers pin weight 0;
  `usePointerVelocityField` is the acceleration authority.

## What convergence should test first

1. P1's modal morph continuity — the no-detach scrub across the FLIP re-home is the
   hardest Safari claim in this draft.
2. Defect (b)'s pre-blurred cross-fade — verify the snapshot layer reads as thickening,
   not as a double-exposure, over live map-like content.
3. P5's detent-tick clock — the 170ms catch must not make a 4-slot jump feel slower than
   its 500ms budget.
4. The 10% overshoot fence under P3's velocity seeding — springProjection's `peak` gives
   the cap analytically; confirm the cap in paint.
