# Suffusion draft — BY-QUALITY lens (bottom-up from the physics)

Verified model: claude-fable-5 (Fable seat, IOS27-MICRO suffusal brainstorm).
Inputs: `analysis/MARKS.md` (the measured corpus), `../BJ/formation/component-graph/component-graph.json`
(354 nodes, 69 components across 11 roles), the on-disk motion vocabulary in `src/composables/motion/`
(read, not recalled — springPresets, useSpring/useSpringPress/useLiquidPress, useLiquidFlex,
writeVelocityWeight, useDragMorph, usePointerVelocityField, the specular track + property regs).
Prior engagement waves (BI.W-ENGAGE-AFFORD, breath-of-life) are under REFABLE redo — nothing here
assumes their claims; every cited mechanism was verified on disk this session.

Method: take each measured quality from MARKS in turn and derive four things — (a) which component
classes it generalizes to, by DAG role; (b) the web-idiomatic mechanism (CSS var contract, composable,
directive); (c) the cost envelope; (d) the anti-matrix — where it must NOT go, named per quality.
Bounds: Safari 2026, compositor-first, PRM-gated, aristotelian proportion.

## 0. The shared contract — the engagement vector

The ten qualities are not ten systems. Bottom-up, they reduce to a small set of scalars a component
publishes on its root, written by composables, read by CSS. This is "proper state relayed to the user,
for every variant" made mechanical: state → scalar → paint. Two of these already exist on disk.

| var | range | inherits | writer | read by |
|---|---|---|---|---|
| `--press-t` | 0..1 | no | useLiquidPress (exists) | scale leg + brightness/specular leg |
| `--flex-vel` | 0..1 | no (registered, property-regs §18) | writeVelocityWeight (exists) | squish caps, specular gain |
| `--motion-weight` | 0.618..1 | no | writeVelocityWeight (exists) | site-local effective caps |
| `--engage-t` | 0..1 | no | new: the smoothed engagement envelope (half-life ease of hover/focus/press union — the usePointerVelocityField `engagement` law, elementized) | grow-on-engage scale, specular gate, rim gain |
| `--overpull` | −1..1 | no | new: useOverpull | bound-anchored compression + translate |
| `--scrub-t` | 0..1 | YES — children read it | new: the scrub contract (§10) | the per-child reveal ladder |

Everything below is a projection of gesture kinematics onto these six scalars plus the seven named
springs (`smooth/snappy/bouncy/gentle/dock/press/transient` — the (response, ζ) table in
`springPresets.ts`). No quality mints a second engine, a second ω-formula, or a free-running clock.

Role vocabulary (deterministic, from the graph): control (9: button, checkbox, chip, dark-mode-toggle,
number-field, radio-group, slider, switch, toggle-group) · field (8: combobox, command, input,
labeled-field, search, select, tags-input, textarea) · container (7: accordion, card, collapsible,
expandable-container, separator, surface, tabs) · overlay (5: dialog, drawer, dropdown-menu, popover,
tooltip) · nav (dock) · chrome (5: carousel, deck, header-ribbon, pager-dots, scroll-progress-rim) ·
feedback (8: alert, badge, completion-seal, progress, pulse, skeleton, status-dot, toast) ·
data-display (9: avatar, data-table, instrument-chassis, metric×4, table, timeline) ·
motion-primitive (7) · substrate (8) · typography (label).

---

## 1. Bounded magnetic overpull

**Measured** (MARKS §2): overpull = translate + volume compression as ONE body — down-pull translates
~60–70px while compressing width −7.5% and height −21%, bottom-anchored, content deforming with the
container; the detent-side pin compresses barely (−1%); release springs back with one overshoot
(~30–50% of overpull) settling ≤250ms, ζ≈0.5–0.65 — kin to `bouncy` (0.6/0.6).

**Generalizes to** — anything with a bounded travel domain:
- control: slider (track ends), number-field (min/max under drag-scrub), toggle-group (drag past first/last item)
- overlay: drawer and mobile dialog-sheet (past top/bottom detents)
- nav: dock (the source behavior)
- chrome: carousel and deck (first/last page), pager-dots as the echo of the page's overpull
- container: expandable-container and accordion (past open/closed extremes), tabs (swipe past ends)
- motion-primitive: sortable-list (dragging past list ends), infinite-scroll (top reveal), fading-scroll edges

**Mechanism.** `useOverpull` — an element-less projection in the useLiquidFlex mold. Input: raw gesture
excess Δ past the bound. Output: resisted displacement `d = D·tanh(Δ/D)` (D = the overpull budget,
role-scaled), the signed `--overpull` scalar, and a drive into useLiquidFlex for the volume-preserving
compression on the overpull axis with `transform-origin` at the bound edge (bottom-anchored for a
bottom bound — the measured asymmetry). The compression applies at the container root so children
deform with it — one transform, no counter-scales; "content deforms with glass" costs nothing extra.
Asymmetric compression law: the forbidden-direction cap is deep (the −21% class, web-scaled to ~6–8%),
the detent-side cap stays ~1% — magnitude scales with how forbidden the region is, exactly the
measured feel. Release seeds `useSpring` at `bouncy` from the live (position, velocity); the overshoot
is the spring's, never authored.

**Cost.** Compositor-only (translate + scale). The tanh runs in the pointermove handler; zero idle
cost; the release spring is the existing engine and self-parks. PRM: no compression, no overshoot —
the bound becomes a hard stop with an instant settle (useSpring's PRM snap).

**Anti-matrix.**
- Never on discrete state controls with no travel domain: checkbox, switch container, dark-mode-toggle, radio-group. (The switch THUMB may carry a micro-overpull at its two ends — the one exception, ≤2px.)
- Never on text fields during selection drags (fights text selection) — input, textarea, tags-input.
- Never on natively scrolling readable surfaces — table, data-table, command list: double-fighting Safari's own rubber band produces compound bounce, the classic web-feel defect.
- Never on popover/tooltip/dropdown-menu — no gesture travel domain; an overlay that appears on click has nothing to overpull.
- Never on typography, feedback statics (badge, status-dot, skeleton), data-display, substrates.

## 2. Weight and inertia

**Measured** (MARKS §§1–2, 6): hard-arrest at the ceiling (1145→325 px/s in one frame), decelerating
tails everywhere, nothing linear, nothing instant except the medium cliff. The preset table already
sits deliberately at the weighty-inertial pole with the two fences (overshoot ∈ [0,10%], the inertia
floor).

**Generalizes to** — universal. This is the one quality with no role restriction: every transition in
the library rides a named spring token or a useSpring clock. Weight is carried, not added.

**Mechanism.** Already extant and load-bearing: the `--spring-*` linear() tokens generated from
`SPRING_PRESETS` + `--motion-weight`/`effectiveCap` for velocity-scaled deformation depth. The
suffusal work here is an AUDIT, not a build: sweep the 69 components for any transition on a raw
`cubic-bezier`/duration pair not derived from the table, and convert or justify. One genuine addition:
**depth-graded travel** — CC rows deeper in the stack travel ~20% farther (MARKS §5). Generalize as a
`--depth-i` integer on stacked children (dropdown-menu items, command rows, toast stacks, metric-stack,
timeline entries): entrance translate = `base · (1 + 0.2·i/n)`, same clock, one scalar. That is the
whole implementation.

**Cost.** Token consumption; zero runtime beyond what already runs.

**Anti-matrix.**
- Weight never delays the input answer below the press floor: press acknowledgment stays sub-200ms (`press` preset) regardless of how luxurious the settle is.
- No inertia on a11y-critical instants: focus rings, caret, text echo in input/textarea/number-field — these are exempt from all spring clocks, permanently.
- No inertia theater on skeleton/progress (honest duration beats weighted fakery).

## 3. Specular and light-at-engagement

**Measured** (MARKS §§3–4): press-charge brightens IN PLACE before any travel; the glow washes the
whole component body; light leads, geometry follows during the lens morph; arrival lands bright and
oversized then cools; a specular sweep on the idle Safari capsule; and the governing law — **no
specular event ever appears on a static card; light motion is reserved for engagement.**

**Generalizes to:**
- control: the full class — press-charge on button, chip, switch, checkbox, slider thumb, toggle-group items
- container: tabs — the lens family, with light-leads-geometry on indicator travel
- nav: dock (charge + landing glint)
- overlay: a single landing glint on dialog/drawer arrival (the `transient` clock), nothing sustained
- feedback: completion-seal and toast arrival — earned one-shot light
- chrome: scroll-progress-rim already IS a light channel; pager-dots active-dot glint on page commit

**Mechanism.** The existing specular track (`--specular-x/y/angle`, `glass-specular-track.css`,
`property-regs-specular.css`) plus two gates: specular-layer opacity = `f(--engage-t, --flex-vel)` —
zero at rest by construction, so the "never idle" law is structural, not disciplinary. Press-charge is
already half-built: useLiquidPress writes `--press-t` into a brightness/specular leg — the suffusal
extends the same scalar to a bloom radius that may exceed the control's bounds (overflow: visible
light layer, alpha-clamped). **Light-leads-geometry** for the lens/indicator family: the bloom layer
eases on a clock ~R/2 of the geometry spring (`snappy` geometry, `press`-class light) — two clocks,
one target, the useLeadTrail/useSelectionIndicator seam. Landing = oversized + hot, held ~200ms,
cooled on `smooth`.

**Cost.** Opacity + background-position of prepainted gradient layers — compositor. The pointer-driven
specular writer already exists; no new loop. PRM: charge state still appears (a static brightness
step — state must still be relayed), travel bloom and sweeps off.

**Anti-matrix.**
- Never idle on cards, surfaces, or any container at rest — the measured law, kept structural via the `--engage-t` gate. The one licensed idle light: a slow specular sweep on a PRIMARY affordance capsule (Safari's good idea), at most one per view.
- Bloom never renders neighbors unreadable — iOS's own defect (siblings illegible ~300ms under the lens). Ours clamps bloom alpha under sibling text; siblings stay ≥ AA throughout the morph. This is a gate, not a taste.
- No engagement specular on data-display, typography, skeleton, or substrates (substrates own their own light economy; a second light system on top reads as noise).
- No specular on alert — an alert's light budget is its semantic color.

## 4. Two-tier true glass

**Measured** (MARKS §4): container glass (heavy blur, strong tint) vs control glass riding it
(brighter, more opaque, own rim); controls never share the container's surface; the 1px top rim light;
the inner top glow when a card is raised; deformation moves both tiers as one body.

**Generalizes to** — a material rule, so it lands by role, statically: container/overlay/nav/chrome
are tier-1; control/field surfaces riding them are tier-2; badge/status-dot/chip as tier-2 riders.
The motion coupling is the interesting part: every Q1 compression and Q10 scrub transforms the tier-1
root so tier-2 riders deform with it for free.

**Mechanism.** Exists in `styles/glass/` (material-roles, control-surfaces, rim). The suffusal work:
(a) a DAG lint — walk composition edges, flag any control-role node whose surface class resolves to
its parent container's material (style_kinship edges make this mechanically checkable against the
graph); (b) the raised-state inner top glow keyed to `--scrub-t` (a card that is UP glows at its top
edge — f-0142's light band), one inset gradient whose opacity reads the scrub scalar.

**Cost.** Static CSS + one lint. The glow is an opacity ramp on an existing layer.

**Anti-matrix.**
- Never a third tier — the ladder is two rungs deep, full stop.
- Tier-1-on-tier-1 nesting capped at the CC depth (page → medium → tile): Safari's backdrop-filter stacking is the known cost cliff; a third nested blur is where frame budget dies.
- Table/data-table cell content never sits on its own glass — readability surfaces are paper, not glass.
- Typography never carries material.

## 5. Dynamic readable transparency

**Measured** (MARKS §4): surfaces tint from what is beneath (teal card over teal map); blur σ large
enough that the underneath reads as color masses, never detail; **text stays full-opacity white
regardless of tint — legibility is never traded**; the CC medium dims/blurs by state (−46% luminance,
−80% gradient energy).

**Generalizes to:** every translucent surface — overlays, card, dock, toast, tabs bar, header-ribbon.
The "dynamic" half is state-keyed: the scrim/medium responds to `--scrub-t` (a half-open drawer half-
dims the page); the card's tint may sample the page accent.

**Mechanism.** The on-glass foreground token family (`on-glass-fg.css`) is the clamp: foreground
tokens are never alpha-derived from the surface — tint dynamics ride `--glass-tint` and blur only.
Page-accent sampling lands as a consumer-set hue folded into the tint token (accent-tone.css seam),
never a live canvas readback. The medium law from Q6: scrim opacity + backdrop blur are functions of
the overlay's `--scrub-t`, so a scrubbed close relaxes the medium continuously.

**Cost.** Token-level; the scrub-keyed scrim is one opacity ramp.

**Anti-matrix.**
- Text opacity is not a design channel. Anywhere. The contrast floor is a π gate.
- No dynamic tint on data-display or table surfaces (data reads on stable ground).
- No transparency under focused text entry (input/textarea/command get an opacity floor when focused — a moving tinted background under a caret is hostile).
- Substrates are the thing seen THROUGH glass, never themselves glass.

## 6. Multi-clock choreography

**Measured** (MARKS §5): three channels, three clocks — medium (blur/dim) as a near-instant change
≤100ms; paint (fade/saturation) at ~R/4; geometry (stretch/travel) at R≈600ms decelerating; periphery
+100ms behind; the fade:stretch ratio ~1:4 confirmed; **close inverts the order** — content leaves
first, the medium relaxes after, with a 100–200ms contentless-blur beat; depth-graded travel ~20%.

**Generalizes to:** every open/close/expand/collapse — overlay (dialog, drawer, dropdown-menu,
popover), container (accordion, collapsible, expandable-container, tabs panel swap), nav (dock), field
(combobox/select/search popups, command palette), feedback (toast in/out), chrome (deck slide
transitions). Also the crossfade family: tab-triggered card swaps run outgoing-drop+fade and
incoming-rise+fade OVERLAPPED with the ground re-framing beneath — three concurrent channels, none
waiting (MARKS §6).

**Mechanism.** A channel contract, not a timeline library. Every morph decomposes into at most four
named channels with per-channel clocks:

| channel | clock | open | close |
|---|---|---|---|
| medium (scrim/blur/dim) | ≤100ms step-ease | leads | trails — relaxes AFTER content is gone |
| paint (opacity/saturation) | ~R/4 (`press`-class) | fast | leads the close |
| geometry (travel/stretch) | R (`dock`/`smooth`-class), decelerating | the long clock | fast on close |
| periphery (rails, secondary chrome) | paint clock, +~100ms delay | trails | first out |

In CSS this is one `data-state` flip driving per-channel `transition` specs on distinct `--spring-*`
tokens, with direction-dependent delays (the delay asymmetry IS the inversion — `[data-state=closed]`
gives the medium the delay, `[data-state=open]` gives it none). The contentless-medium beat falls out
of the close delays and must be kept — it is a signature moment, and it composes with Q10: an
interrupted close leaves the medium standing, ready to re-enter (the medium persists across cycles —
never reset it between interrupted gestures). Depth grading rides the Q2 `--depth-i` scalar.

**Cost.** Pure CSS clocks for uninterrupted runs; scrubbed variants inherit the Q10 mechanism. Zero JS
for the desync itself.

**Anti-matrix.**
- Tooltip stays ONE clock, sub-150ms — choreography below the perceptual floor is waste; a desynced tooltip is a slow tooltip.
- No desync inside micro-elements (<24px) — badge, status-dot, pager-dot state flips are single-clock.
- Never more than these four channels — a fifth clock is noise, not breath (the proportion bound).
- Skeleton/progress never choreograph — honest loading states don't perform.
- The periphery delay applies only when a periphery exists; don't invent rails to stagger.

## 7. Velocity, momentum, acceleration inheritance

**Measured** (MARKS §6): the curves are not canned — a flick arrives with momentum, overshoots into
the bound, pins; a slow place lands DEAD with zero overshoot; a fling covers 660px in 250ms; a
mid-flight catch re-seats seamlessly. The system integrates gesture velocity everywhere.

**Generalizes to** — the charter's "ALL components" clause, and it genuinely is class-wide, but
"such a facility" means the RELEASE seam, not a new per-component physics: every gesture-released
motion seeds its settle spring from the live (position, velocity). Concretely: slider thumb,
drawer/sheet, dock, carousel/deck swipes, sortable-list drops, toggle-group drag-across,
number-field scrub, tabs swipe, toast flick-dismiss, timeline/easing-picker scrub.

**Mechanism.** Three seams, all extant:
1. `useSpring` target re-seat is already velocity-continuous (C¹) — any interrupt carries momentum.
2. kf `Draggable` (wired by useDragMorph) owns the velocity-windowed release sampler + fling snap — the drag-released family composes it, never re-samples by hand.
3. `usePointerVelocityField` derives position→velocity→acceleration per tick for field-driven work — the ACCELERATION term generalizes as the impulse channel: a fast direction CHANGE (not mere speed) injects a burst — the lens's lead, the substrate's swirl. For non-field components acceleration is a seasoning, not a required channel.

The law that makes it aristotelian: **overshoot is earned**. A spring seeded with v=0 lands dead; the
same spring seeded with a fling overshoots. Never author bounce into an entrance whose gesture was
calm — the presets' [0,10%] overshoot fence stays, and the seeded velocity is what buys more.

**Cost.** Sampling rides existing pointer events; springs self-park; no new loops (the no-own-rAF
discipline from usePointerVelocityField is the template). PRM: springs snap; velocity is never read.

**Anti-matrix.**
- Keyboard/AT-triggered actions always run preset springs with zero seeded velocity — deterministic motion for non-pointer input, every time.
- A plain click (no travel) never inherits incidental pointer velocity — click ≠ fling.
- No momentum on focus traversal, form navigation, or validation feedback.
- Data-display and typography never integrate gesture velocity (their only motion is entrance, Q2's business).

## 8. The taffy pre-commit zone

**Measured** (MARKS §2, "Beyond"): ~40px of dock stretch before the expansion gesture commits — the
component acknowledges a forming gesture before the gesture means anything.

**Generalizes to** — threshold gestures, where a commit boundary exists:
- nav: dock (source)
- overlay: drawer edge-pull, sheet-dialog pull
- control: slider — the exemplar's grow-on-engage IS this quality fused with Q3 (below); chip's drag-to-delete
- motion-primitive: sortable-list pick-up (the pre-lift swell), infinite-scroll top reveal
- container: expandable-container/accordion pull-to-open

**Mechanism.** `usePreCommit` — a thin projection: raw gesture Δ below the commit threshold maps
through the SAME tanh resistance law (useLiquidFlex, cap ≤1.03) to a stretch toward the gesture, plus
`--precommit-t` ∈ 0..1 for a paint whisper (a slight brightening — the component is listening).
Crossing the threshold hands off velocity-continuously to the real morph (Q7 seam). Web-scale: the
zone is ~8–12px of gesture, not the video's 40 device px — enough to read, too little to fidget.
The CSS floor for no-JS contexts is the existing `.tap-squish` `:active` scale.

**Grow-on-engage, derived here:** the exemplar's "pops slightly out of its shell" is the pre-commit
zone's stationary twin — `--engage-t` (press/hover union, half-life smoothed) drives scale 1→~1.04 on
the `press` spring plus a rim/brightness lift (Q3's charge), springing back on release with the
preset's small rebound. One option, stackable on any control: it is Q8's resistance shape with zero
travel, Q3's light, Q2's clock.

**Cost.** Compositor scale; pointer-driven; zero idle. PRM: the pop becomes a border/brightness step
(state still relayed, physics off).

**Anti-matrix.**
- Never on plain buttons' activation path — a button answers NOW (`press` preset); taffy before commit delays the read. (Grow-on-engage on press is fine — it's feedback, not gating.)
- Never on scroll-owned surfaces where the zone would eat native scroll starts — table, data-table, command list.
- Never before destructive commits — a delete should not feel elastic and inviting.
- Zone depth never exceeds the sub-commitment band; a taffy zone you can SIT in is a broken detent.

## 9. Detent catches

**Measured** (MARKS §§1, 6): a third stop between rest and full engaged only transiently — fast
collapses CATCH ~170ms at the mid-detent then continue; slow motion is captured by it; detents are
magnetic in both directions; passing at speed reads as a weak spring well crossed, not a stop.

**Generalizes to:**
- overlay: drawer/sheet heights (peek/half/full — the canonical web use)
- nav: dock states (rest/mid/full — the source)
- control: slider value detents (ends, center, marked stops), number-field drag stops, toggle-group positions
- container: expandable-container heights, tabs swipe boundaries
- chrome: carousel/deck pages (snap = the strong-well limit case)
- motion-primitive: easing-picker/timeline scrub keypoints, sortable-list slot boundaries

**Mechanism.** Extend the snap-target vocabulary with well STRENGTH: `{position, strength}` per
detent. Release projection (kf Draggable's `decayRest` seam): if the projected rest lands beyond the
next well, PASS THROUGH it with a transient velocity multiplier <1 scaled by strength — the ~170ms
catch, read as a momentary thickening; if the projection lands short, the well captures and the spring
re-seats to it. Slow gestures capture; flicks catch-and-continue. This is one branch in the release
math, not a new integrator. CSS floor for scroll-driven kin: native `scroll-snap` (the strong-well
degenerate case).

**Cost.** Arithmetic at release + one transient multiplier inside the running spring — no extra
frames, no idle cost. PRM: detents become the only landing positions (direct snap, no catch theater).

**Anti-matrix.**
- No mid-range detents on precision-continuous sliders (volume-class): wells fight fine adjustment exactly where the user is being careful. Ends and center at most, or none.
- Discrete controls (toggle-group, radio) are pure capture — a catch-and-pass on a discrete control implies a state that doesn't exist.
- Never simulate detent haptics with visual jitter; the catch is a velocity event, not a shake.
- No detents on free-scroll reading surfaces (table, content scroll) — readers own their stopping points.

## 10. Everything is a scrub

**Measured** (MARKS §§5–6, "Beyond"): under the finger, position is the ONLY truth — the reveal state
is a pure function of height, not time (the Find My card jockeyed indefinitely, every intermediate
legal); the CC dismissal caught mid-flight and reversed; the medium persisted un-reset across the
interrupted cycle; NOTHING in 47s is fire-and-forget except the app zooms.

**Generalizes to:** every expand/collapse/dismiss that a gesture can own — overlay (drawer, sheet-
dialog, CC-class panels), container (accordion, collapsible, expandable-container via edge-drag), nav
(dock), chrome (carousel/deck — already scrubs), feedback (toast flick-dismiss), field popups on
mobile (combobox sheet). Fused with Q6, the scrub drives all four channels from one scalar; fused with
Q7, release hands (t, velocity) to the spring; a pointerdown mid-settle captures the live spring value
back into the scrub — reversible at any point, both directions C¹.

**Mechanism.** The scrub contract:
1. The composable owns `--scrub-t` (0..1) on the morph root — the ONE inheriting scalar (children must read it).
2. Children author their reveal ladder as PAUSED CSS animations sampled by negative delay: `animation: ladder 1s linear paused; animation-delay: calc(-1s * var(--scrub-t))` — the standard CSS scrub idiom, Safari-safe, whole ladder authored as keyframe offsets, zero per-child JS.
3. The ladder spec is height-keyed per element (MARKS §6 note 4): handle 0–5%, title ghost 10–30%, title solid 30–50%, row N at 40%+10%·N, headers before their rows; elements fade AND rise ~0.5–1em — nothing pops, and the card never reads as one prerendered bitmap.
4. Pinned chrome: the bar/dock/footer never travels with the scrub — content slides beneath it (a clip, not a transform, on the pinned element).
5. Where the driver is native scroll, the same ladder rides CSS scroll-timeline instead (`supportsCssTimeline` seam) — same keyframes, different clock.

**Cost.** The honest one: `--scrub-t` inherits, so the per-frame write invalidates the morph subtree —
paid ONLY during an active gesture (idle = zero writes), bounded by scoping the write to the morph
root, never body. This is the single non-`inherits:false` scalar in the contract and the price is the
feature. PRM: the scrub still TRACKS (position under finger is input, not decoration) but the ladder
collapses to two states at a threshold — intermediate reveal theater off, release settles instantly.

**Anti-matrix.**
- Earned one-shots never scrub: completion-seal, pulse — replaying a triumph by finger cheapens it.
- Tooltips, focus/validation feedback, text entry: never.
- The app-zoom class (route/page transitions) MAY stay fire-and-forget — the video's own exception; full route morphs also exceed the compositor budget when scrubbed against live pages.
- Don't scrub what native scroll already owns — the ladder rides the scroll-timeline there instead of a synthetic gesture layer.

---

## The exemplar, derived from the qualities

The charter's named exemplar assembles from the ten with nothing new:

**Slider, grow-on-engage option** = Q8's stationary twin: `--engage-t` → scale 1→1.04 on `press`,
Q3 charge on the thumb, springback with the preset's rebound. Stackable on any control-role node.

**Slider, modal variant (mobile engagement → enlarged popup)** = sustained engagement
(`--engage-t` held + a hold threshold, the useDockHold-class gate) commits a morph: the control's own
geometry FLIP-grows into a tier-2-on-tier-1 card (Q4), growth runs the Q6 channel contract (medium
dims at once, paint fast, geometry on `dock`), the reveal ladder keys to `--scrub-t` (Q10 — the
enlarged track, the value readout, the detent marks arrive on the ladder), the value readout stays
full-contrast (Q5), thumb drag carries Q7 velocity into Q9 detents, track ends carry Q1 overpull,
dismissal is a scrub with the inverted close and the contentless-medium beat (Q6/Q10).

The same assembly, re-proportioned per role, yields the kin: **button** (Q2+Q3+Q8-stationary only —
buttons never scrub), **dialog** (mobile sheet = Q10+Q9+Q1+Q6 full stack), **dropdown/select**
(Q6 channels + Q2 depth-graded items — no overpull, no detents), **tabs** (Q3 light-leads-geometry
lens + Q1 end-bounce on swipe + the sibling-legibility gate), **toast** (Q7 flick + Q10 scrub-dismiss
+ Q3 arrival glint).

## The proportion ledger (role × quality)

● suffuse · ◐ derive narrowly (named subset above) · — forbidden/absent by the anti-matrix.

| role | Q1 overpull | Q2 weight | Q3 light | Q4 two-tier | Q5 transparency | Q6 choreo | Q7 velocity | Q8 taffy | Q9 detents | Q10 scrub |
|---|---|---|---|---|---|---|---|---|---|---|
| control | ◐ | ● | ● | ● (rider) | ◐ | ◐ | ● | ◐ | ◐ | — |
| field | — | ● | ◐ (focus charge) | ● (rider) | ◐ (floor when focused) | ● (popups) | ◐ (popups) | — | — | ◐ (mobile sheets) |
| container | ◐ | ● | ◐ (tabs lens) | ● | ● | ● | ◐ | ◐ | ◐ | ● |
| overlay | ◐ (sheets) | ● | ◐ (landing) | ● | ● | ● | ● | ◐ (edge-pull) | ● (sheets) | ● |
| nav (dock) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| chrome | ◐ (ends) | ● | ◐ | ● | ● | ◐ | ● | — | ● (pages) | ● |
| feedback | — | ● | ◐ (earned one-shots) | ◐ (chips) | ◐ (toast) | ◐ (toast) | ◐ (toast flick) | — | — | ◐ (toast dismiss) |
| data-display | — | ● (entrance only) | — | — | — | ◐ (entrance stagger) | — | — | ◐ (timeline scrub) | — |
| motion-primitive | ◐ | ● | — | — | — | ◐ | ● | ◐ | ● | ● |
| substrate | — | ● (field physics) | — (own light) | — | — | — | ● (the accel channel) | — | — | — |
| typography | — | ◐ (entrance) | — | — | — | — | — | — | — | — |

The dock's full row is correct and unique — it is the reference body. Nothing else earns all ten;
data-display and typography earning almost nothing IS the proportion. The ledger is the anti-matrix
in aggregate: a wave that lights a — cell is over-suffusal by definition and needs a ruling, not a
commit.

## Cost envelope, aggregated

Three budgets, all bounded, matching the R3b idle-rAF discipline:
1. **Token-only** (Q2, Q4, Q5, Q6-uninterrupted): static CSS, zero runtime.
2. **Gesture-window** (Q1, Q8, Q10 writes; Q3 pointer specular): pointermove-driven var writes on one element (`inherits:false` everywhere except `--scrub-t`); zero cost at idle, by construction.
3. **Spring-window** (Q7, Q9, releases everywhere): the existing engine ticks while settling and self-parks; no quality forks a private rAF (the usePointerVelocityField push-API rule is the template — new projections are element-less pure functions fed by existing clocks).

PRM, per quality, in one line each: Q1 hard stop; Q2 exempt-instant list holds; Q3 static charge step,
no travel light; Q4/Q5 unaffected (material, not motion); Q6 single-step state flips; Q7 zero-velocity
snaps; Q8 brightness step; Q9 direct snap; Q10 tracks input, two-state ladder. State is always still
relayed — PRM removes physics, never information.

## Open questions for the next pass

1. Springback fidelity: is `bouncy` (0.6/0.6) right for Q1's release, or does the measured ζ≈0.5–0.65 / 2–2.5Hz want a dedicated `overpull` row? MARKS burst-item 1 (24fps refit) decides; adding a row is a token-table change and must clear the [0,10%] overshoot fence or get a chartered exemption.
2. `--scrub-t` subtree invalidation on wide morph roots (command palette, full-height drawers) needs a paint-profile in Safari before the contract is sworn — if the cost bites, the fallback is per-child `animation-range` on a view-timeline where available.
3. The hold-to-commit threshold for the slider modal variant (Q8→morph handoff) wants a measured dwell, not a guess — prototype-pass material.
4. Whether `--engage-t`'s hover arm exists at all on touch-primary surfaces, or engage = press∪focus there (two-arm envelope vs three) — affects every grow-on-engage consumer.
