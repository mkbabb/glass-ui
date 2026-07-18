# Suffusion draft — BY-ARCHETYPE (top-down from the DAG)

Verified model: claude-fable-5. Lens: by-archetype. Date: 2026-07-17.
Sources: `CHARTER.md` hallmarks 5–6, `analysis/MARKS.md` (the measured vocabulary),
`docs/tranches/BJ/formation/component-graph/component-graph.json` (354 nodes — 69 component,
188 SFC, 38 composable, 59 style), `src/components/` + `src/composables/` on disk.
Prior engagement work (BI.W-ENGAGE-AFFORD, breath-of-life waves) is under REFABLE redo — nothing
below cites it as done; where a shipped facility is named it was verified on disk today.

Bounds honored throughout: Safari 2026 floor, compositor-first (transform/scale/translate/opacity
+ registered custom props only), PRM-gated (meaning and final state survive; travel drops),
the R3b idle-rAF budget (every physics loop is event-scoped — zero rAF at rest), and aristotelian
proportion — the dose matrix in §8 IS the design, not a compromise of it.

---

## 1. The abstract state ladder

The exhortation asks for "button states, but at a more abstract level." That abstraction is one
ladder every interactive archetype climbs, with archetype-specific rungs skipped, never reordered:

```
idle → hover → engage → active → drag/scrub → release → settle → idle'
                 │
                 ├─ disabled   (a parallel rail, enterable from any rung)
                 └─ loading    (a parallel rail, enterable from active)
```

- **idle** — at rest. No specular motion, no rAF, no glow (MARKS §4: "no specular event ever
  appears on a static card"). Idle expressiveness is *material* only: the two-tier glass, the 1px
  top rim light, dynamic transparency. The one sanctioned idle exception: the slow specular sweep
  on a *current-selection lens* (Safari's pill — MARKS §3 note 4), because a lens is state, not rest.
- **hover** — intent, not commitment. Pointer-tracked catch-light (`useSpecularPointer` —
  `--mouse-x/y` + `--specular-angle`), sub-perceptual lift. Touch has no hover; on touch this rung
  merges into engage.
- **engage** — pointerdown, the press-charge. The component acknowledges touch *as a body* before
  anything travels (MARKS: the Find My bar's whole-component glow wash at fmtab-005). This is the
  single most under-suffused rung in the library today.
- **active** — the committed state (pressed, checked, selected, open). Held states read through
  light + magnification (the eyeglass lens: ~5–8% content magnification), not through color alone.
- **drag/scrub** — position under gesture. The finger owns position; physics owns *deformation*.
  Everything height/progress-mapped, nothing time-mapped (MARKS §6: the Find My card's reveal state
  is a pure function of height). Velocity feeds the smear (`--atom-drag-v`) and the transient
  weight boost (`--motion-weight` via `writeVelocityWeight`).
- **release** — the handoff from finger to spring. The spring MUST seed with release velocity
  (the kf `SpringProgress` re-seat is velocity-continuous; `useLiquidPress` already proves the
  pattern). Fast release → overshoot-and-settle; slow place → dead landing; never synthetic bounce
  (MARKS §6 note 3).
- **settle** — the decelerating tail + cool-down. Oversized arrivals cool over ~200ms (the lens
  lands at 110–120% and shrinks); light cools after geometry stops.
- **disabled** — matter with the life withdrawn: transparency drops toward flat, the rim light
  extinguishes, NO deformation on press (the body does not answer). Not merely 50% opacity — the
  glass literally de-materializes a tier.
- **loading** — the body breathes: a slow internal luminance drift (the skeleton/pulse vocabulary)
  on the component's own surface. Never a spinner bolted on top of live glass.

Every transition between rungs is **scrub-interruptible with state carried over** (MARKS §5 note 4:
the CC dismissal caught mid-flight; the blur medium persists across cycles). Fire-and-forget
animation is reserved for one family: enter/exit of overlays under keyboard (non-gesture) triggers.

---

## 2. The suffusal quality vocabulary

Seven qualities from the exhortation, each pinned to a measured mark and a shipped or missing facility:

| # | quality | the measured mark | shipped facility | gap |
|---|---|---|---|---|
| Q1 | bounded magnetism | overpull: translate + volume compression, bottom-anchored, one overshoot, ζ≈0.5–0.65 (MARKS §2); detents as weak spring wells crossed at speed (§6 note 2) | `springPreset("dock")` {0.68,0.64}; `useDockHold` | a generic `useMagneticBound` (rubber-band + compression + snapback) usable off-dock |
| Q2 | weight | `--motion-weight` rest 0.618, velocity-boosted toward 1; content deforms WITH the container (§2 note 1) | `writeVelocityWeight`, `useLiquidFlex` | weight is wired at few write-sites; most archetypes never touch it |
| Q3 | specular highlighting | engagement-reserved light: press-charge bloom, travel glow, landing heat, idle sweep on lenses only (§3, §4 note 3) | `useSpecularPointer`, `vSpecular`, material.css conic rim | a press-charge/bloom channel distinct from the hover catch-light |
| Q4 | true glass | two tiers — container glass vs control glass, distinct blur/opacity budgets; controls sit ON surfaces, never share them (§4 note 1) | glass-material recipes, backdrop luminance sampling | tier discipline is not yet an enforced per-archetype contract |
| Q5 | readable dynamic transparency | tint from beneath, text clamped to full contrast (§4 note 2); blur as a persistent medium (§5 note 2) | `useGlassBackdropLuminance`, `ambientHueHistogram` | per-state transparency ladder (engage brightens, disabled flattens) |
| Q6 | choreographed multi-dimensional animation | three channels, three clocks — blur ≤100ms cliff-softened, fade ~4× faster than stretch, stretch ~600ms decelerating; depth-graded travel (+20%/row); periphery +100ms (§5) | `useStaggerReveal`, `useLeadTrail`, `useBloomUp`, `useLiquidReveal` | a reveal-LADDER primitive keyed to expansion fraction, not time (§6 note 4) |
| Q7 | momentum/velocity/acceleration tracking | velocity inheritance: flick pins, slow place lands dead, free-fall catches at detents ~170ms (§6) | `useDragVelocity` (`--atom-drag-v`, drag-window-gated), `useSpring` velocity-continuous re-seat, `usePointerVelocityField` (renderer-side) | the universal contract of §7 below — most components cannot yet receive a velocity |

---

## 3. The archetype taxonomy, derived from the graph

The DAG's deterministic roles (69 component nodes): control 9, field 8, overlay 5, container 7,
chrome 5, nav 1, feedback 8, data-display 9, substrate 8, motion-primitive 7, typography 1,
unroled 1 (configurator — demo chassis, out of scope). Roles are the truth; archetypes split one
role where the *gesture physics* differ (control splits three ways) and merge across roles where
the physics agree (tabs `role=container` + dock `role=nav` + pager-dots `role=chrome` are one
navigational-lens archetype).

| archetype | graph members | physics signature |
|---|---|---|
| A. momentary controls | button, chip (action), dark-mode-toggle | press → release, no held position |
| B. bistable controls | switch, checkbox, radio-group, toggle-group, chip (filter) | press → state flip, two/N wells |
| C. continuous controls | slider, number-field | drag/scrub along a domain, detents |
| D. text fields | input, textarea, tags-input, search, labeled-field | focus-held engagement, typing cadence |
| E. list-selection fields | select, combobox, command | field + overlay + selection travel |
| F. overlays | dialog, drawer, popover, dropdown-menu, tooltip | enter/exit through a medium; drawer alone is scrubbed |
| G. navigational lenses | tabs, dock, pager-dots, carousel, deck, header-ribbon, scroll-progress-rim | ONE lens/indicator traveling a track; dock adds the grow-to-card |
| H. disclosure containers | accordion, collapsible, expandable-container, card, surface, separator | height-mapped reveal ladders |
| I. feedback | progress, skeleton, alert, badge, toast, pulse, status-dot, completion-seal | state relayed TO the user, no gesture |
| J. data display | table, data-table, metric×4, timeline, avatar, instrument-chassis | mostly-idle bodies with engageable cells |
| K. procedural substrates | blob, aurora, handmark, constellation, fourier-field, liquid-grid, paper-backdrop, watercolor-dot | own frame loop; ambience, not affordance |
| L. motion primitives | animated-digit, typewriter, sortable-list, infinite-scroll, fading-scroll, easing-picker/configurator | they ARE vocabulary; sortable-list is the one gesture-holder |
| — | label (typography) | rides its field's states; no independent life |

---

## 4. Per-archetype suffusion

Format per archetype: dose (which of Q1–Q7 and how hard) → the state-relay script (what the user
SEES at each rung) → modal/enlarge verdict (§6) → build-from (shipped facilities) → gaps.

### A. Momentary controls — button, chip(action), dark-mode-toggle

**Dose:** Q2 heavy, Q3 medium, Q7 medium, Q1 none (no bounds to pull), Q6 light.
The button is the reference implementation of the press archetype — it must be perfect and small.

**State relay:**
- idle→hover: catch-light slides in under the pointer (`--mouse-x/y`); rim glint angle tracks
  (`--specular-angle`). Lift ≤1px-equivalent scale. Nothing on touch.
- hover→engage: the press-charge — reciprocal squish via `useLiquidPress` (scale X up, Y down,
  volume-preserving) + `--press-t` brightness leg on the SAME spring clock. The surface visibly
  *takes* the finger: brightens toward control-tier white, specular blooms slightly past bounds.
- engage→release: spring-back on `springPreset("press")` with the live velocity carried — a rapid
  double-tap compounds momentum (the interruptible re-seat), it never restarts.
- release→settle: light cools ~80ms AFTER scale settles — the two-clock rule at button scale.
- disabled: no squish on press (the body does not answer), glass flattens one tier.
- loading: label dims, the button's own surface carries a slow luminance drift; width morph to
  spinner is banned (layout).

**Modal/enlarge:** no. A button that grows a popup is a different component. Grow-on-engage is
already its squish.

**Build-from:** `useLiquidPress` end-to-end; this archetype needs almost no new machinery — it
needs the press-charge *light* leg tuned (bloom past bounds ~2–4px, engagement-only).

**Gap:** chip(action) and dark-mode-toggle do not yet ride `useLiquidPress`; the dark-mode-toggle
flip should inherit press velocity into its rotation spring.

### B. Bistable controls — switch, checkbox, radio-group, toggle-group, chip(filter)

**Dose:** Q1 heavy (the two wells ARE magnetic bounds), Q2 medium, Q3 medium, Q7 heavy for switch
(draggable), light for checkbox/radio (tap-only).

**State relay:**
- The switch thumb is a control-tier glass body in a container-tier trough (Q4 — the CC pattern:
  near-opaque control on translucent tile). Dragging it: the thumb *stretches along the travel
  axis* proportional to `--atom-drag-v` (taffy), the trough tint crossfades under the thumb
  position — state is readable mid-gesture, not only at the end.
- Overpull past a well: the thumb compresses against the end (Q1 — width compression like the
  dock's −7.5%, scaled down), NEVER translates past it. Release: one overshoot into the well,
  ζ≈0.6.
- Tap (no drag): press-charge on the thumb, then the flip runs on `springPreset("bouncy")` —
  the sanctioned emphatic one-shot — seeded with zero velocity (a tap is a slow place).
- checkbox/radio: the mark DRAWS (handmark vocabulary — stroke reveal, ~150ms), it never fades in.
  The box squishes on engage; the mark's draw velocity inherits the press's spring velocity.
- toggle-group/chip(filter): selection moves as ONE body between chips (§G's lens vocabulary at
  micro scale via `useSelectionIndicator`) — the indicator stretches toward the target, the source
  de-materializes under it.
- disabled: the thumb fuses visually into the trough (one tier — the two-tier split collapsing IS
  the disabled read).

**Modal/enlarge:** no for checkbox/radio (the gesture is a tap; enlargement adds nothing). Switch:
grow-on-engage yes (thumb +8% under the finger — the fingertip-occlusion answer), modal no.

**Build-from:** `useSelectionIndicator`, `useDragVelocity`, `useLiquidFlex`, handmark stroke vocab.

**Gap:** the switch has no drag physics today; the well-overpull compression needs the generic
`useMagneticBound` (Q1 gap).

### C. Continuous controls — slider, number-field

The named exemplar lives here. The slider is the archetype's flagship; current variants on disk:
`standard | spectrum`, sizes sm/md/lg, decorative marks.

**Dose:** everything — Q1 heavy (domain ends + marks as detents), Q2 heavy, Q3 medium, Q5 medium,
Q6 medium, Q7 the flagship. This archetype gets the maximum dose in the library; that is the
proportion speaking, not an exception to it.

**State relay:**
- idle: thumb is control-tier glass on a container-tier track; fill carries the value tint.
- engage (grab): press-charge on the thumb + **grow-on-engage** — the thumb pops slightly out of
  its shell on `springPreset("press")` (the exemplar's stacked option): scale ~1.12, a shadow-tier
  drop that says "lifted", the track's fill brightens. On touch, grow harder (~1.25) — the thumb
  must escape the fingertip.
- drag: the fill SMEARS behind the thumb (`--atom-drag-v` saturating tanh, clamp ~0.7 — mass wins
  past a threshold); the thumb stretches along the travel axis; value readout (if present) counts
  through intermediate values (`animated-digit` — never jumps).
- crossing a mark: a ~170ms magnetic catch (the mid-detent, §6 note 2) — felt as a brief thickening,
  seen as the mark's dot swelling as the thumb passes. Marks stay decorative (never snap) — the
  catch is haptic-visual, not positional.
- overpull past min/max: thumb + fill compress against the end (Q1) — the finger travels farther
  than the thumb, resistively damped; release springs back with one overshoot.
- release: spring seeded with drag velocity — a flung thumb overshoots its landing value visually
  (the FILL overshoots, the VALUE clamps — honesty rule: the relayed state never lies).
- settle: smear relaxes to 0, weight decays to 0.618, light cools last.
- disabled: fill desaturates, thumb fuses into track tier.

**Modal/enlarge verdict: YES — the exemplar itself.** The `modal` variant: on mobile engage,
the slider enlarges into a popup — the track grows to a card-scale scrub surface (dock-to-card
vocabulary: top edge travels, bottom pinned, sides breathe +4–5%, reveal ladder brings in the
domain labels then the fine ticks), the finger continues the SAME gesture uninterrupted (the
grab that opened it is the drag that scrubs it). Release closes it through the collapse
choreography with a mid-detent catch. This is hallmark 1 applied to a form atom.
Number-field inherits a sibling: engage on the stepper opens a modal dial/strip scrub.

**Build-from:** `useDragVelocity` (built FOR this), `useLiquidFlex`, `writeVelocityWeight`,
`springPresets`, dock grow choreography as the modal's motion spec.

**Gap:** the modal variant is wholly new; the mark-catch needs the weak-spring-well primitive.

### D. Text fields — input, textarea, tags-input, search, labeled-field

**Dose:** Q4 heavy, Q5 heavy, Q3 light, Q2 light, Q7 none. Fields are held engagement — calm,
legible, never bouncy. The proportion here is restraint.

**State relay:**
- idle→hover: rim glint only, no lift (fields are sockets, not bodies).
- hover→focus (engage): the focus ring BLOOMS from the caret entry point outward (not a uniform
  pop) — ~200ms, the one choreographed moment; the surface brightens one transparency step (Q5:
  engaged glass is more transparent-but-brighter, disabled glass is flatter).
- typing: the caret is alive (breath at idle-in-focus); tags-input materializes each committed tag
  through the toast bloom vocabulary (`transient` preset — scale-from with near-critical settle).
- invalid: the field does one mass-proportional lateral shake (weight-scaled, ≤2 cycles) + the
  feedback tone floods the rim — never color alone (a11y).
- disabled: socket flattens to one tier, label de-lifts.
- loading (async validate/search): the rim carries a slow traveling glint — the field's own body
  reports, no external spinner.

**Modal/enlarge:** search only — on mobile engage, search grows to a command-sheet (this is
archetype E's overlay merged in; Safari's URL-bar-to-keyboard growth is the iOS kin). input and
textarea: never — enlarging a text surface mid-focus would tear the keyboard interaction.

**Build-from:** `useBloomUp` (focus bloom), field-surfaces.css tiers, `FeedbackMark`.

**Gap:** caret-anchored focus bloom; the per-state transparency ladder (Q5) as tokens.

### E. List-selection fields — select, combobox, command

**Dose:** Q6 heavy (they compose field + overlay + selection), Q3 medium, Q7 medium (wheel/flick
momentum in long lists), Q1 light (list ends rubber-band).

**State relay:**
- trigger engage: press-charge on the trigger (archetype A's script).
- open: the panel materializes from the trigger — anchored growth (top-anchored dock-to-card
  mirror), reveal ladder brings rows in by index (depth-graded: deeper rows travel ~20% farther,
  §5 note 3). The trigger's chevron rotation and the panel growth share one spring — one body.
- highlight travel: the highlight is a LENS (§G vocabulary) — it glides between rows on
  `snappy`, magnifying the highlighted row's leading icon ~5%; keyboard repeat accelerates it
  (velocity-tracked: held arrow-down builds momentum, release coasts 1–2 rows and settles —
  Q7 in the keyboard dimension, a genuinely novel affordance).
- selection: the chosen row's label FLIES to the trigger (`useElementMorph` — one continuous body,
  never blink-out/blink-in), the panel collapses behind it through the close choreography
  (content leaves first, medium relaxes after — §5 note 2).
- list ends: flick-scroll rubber-bands with compression (Q1).

**Modal/enlarge: YES on mobile** — select/combobox open as a bottom drawer (the dock-to-card
growth), with the drawer's scrub physics (archetype F). Command is already the enlarged form.

**Build-from:** `useElementMorph`, `useStaggerReveal`, `useSelectionGroup`, floating.ts.

**Gap:** keyboard-momentum highlight; the label-flight morph on selection.

### F. Overlays — dialog, drawer, popover, dropdown-menu, tooltip

**Dose:** Q6 the flagship (the CC choreography IS this archetype's spec), Q5 heavy, Q1 heavy for
drawer only, Q7 heavy for drawer, Q3 light, tooltip near-zero (the proportion floor).

**State relay:**
- open (dialog): three channels, three clocks — scrim blur+dim leads as a fast-but-softened medium
  change (~120ms; iOS's ≤83ms cliff is a defect we best, §Beyond), content fades in ~4× faster
  than it travels, travel ~500–600ms decelerating from a compressed-toward-origin start; the
  periphery (close button, footer actions) staggers +100ms. Never batched.
- close: INVERTED order — content leaves first (~170ms fade+slide), the blur medium relaxes after
  (~400ms tail). The empty-blur beat (~100–150ms of contentless scrim) is kept deliberately.
- drawer: everything is a scrub — position under finger is height-mapped (the reveal ladder as a
  function of expansion fraction: handle 0–5%, title ghost 10–30%, title solid 30–50%, row N at
  40%+10%·N, §6 note 4); release seeds the spring with gesture velocity; detents are magnetic in
  both directions with the ~170ms catch when crossed fast; overpull past the top detent pins with
  ~1% width compression, past the bottom compresses hard (the asymmetric-bound law, §2 note 3);
  a dismissal can be caught mid-flight and reversed — the scrim never resolves between cycles.
- popover/dropdown-menu: anchored growth from the trigger (archetype E's open), row reveal ladder;
  dismiss = the close order at half scale, no scrim.
- tooltip: fade + 4px rise on `smooth`, delay-gated; NO glass bloom, NO spring theatrics — the
  tooltip's entire virtue is not being noticed arriving. This is the proportion's zero-dose proof.

**Modal/enlarge:** they ARE the modal family — the receiving end of every §6 derivation. Drawer
gains the formal `expand` ladder (peek → half → full detents) as API.

**Build-from:** `useDockHold` generalized, `useStagger`, `useScrollChrome`, overlay transition
register; the drawer is the direct heir of the dock's gesture engine.

**Gap:** the height-mapped reveal-ladder primitive (a fraction-keyed stagger — nothing on disk is
fraction-keyed today); scrim-as-persistent-medium across interrupted cycles.

### G. Navigational lenses — tabs, dock, pager-dots, carousel, deck, header-ribbon, scroll-progress-rim

**Dose:** Q3 the flagship (the lens IS specular state), Q1 heavy, Q7 heavy, Q6 heavy for dock.
The Find My eyeglass-tab is this archetype's north star; the dock already carries the campaign.

**State relay (the lens contract — one law for tabs, toggle-group, pager-dots, dock indicator):**
- idle: the active item sits under a lens — brighter capsule, content magnified ~5–8% (literal
  eyeglass), an idle specular sweep ~8s period (the ONE sanctioned idle light motion, Safari's
  good idea).
- engage (press a target): press-charge — the lens brightens in place, a glow wash crosses the
  whole bar (the component acknowledges as a body) BEFORE any travel.
- travel: the lens is ONE continuous body — it stretches to span source and target (~2.5 slots at
  full stretch), light leads geometry, the source de-materializes under it and re-materializes
  behind; sibling labels stay legible beneath the traveling bloom (besting iOS's ~300ms
  unreadability, §3 note 5).
- arrival: lands oversized (110–120%), holds ~200ms, cools to rest — overshoot in scale AND light.
- pager-dots: the same at micro scale — the goo-worm morph between dots (the standing liquid-weight
  edict), velocity-stretched when pages are flung.
- carousel/deck: item travel inherits swipe velocity (Q7); ends rubber-band with compression (Q1);
  the current-item indicator follows the lens contract. Deck page-turns catch at the page detent.
- dock: the full hallmark set (grow-to-card, overpull, pre-commit taffy zone ~40px) — specced by
  the sibling by-hallmark drafts; this draft only pins that dock physics must be *derivations of
  the same primitives* (magnetic bound, reveal ladder, velocity seed), not private code.
- scroll-progress-rim/header-ribbon: scroll-driven (Q7 from the scroll axis) — the rim's head
  carries a subtle glint that intensifies with scroll velocity and cools at rest; header-ribbon
  condenses through a height-mapped ladder, never a binary snap.

**Modal/enlarge: YES for tabs on mobile** — press-and-hold on the tab bar raises a magnified
picker (the lens grows to show all destinations enlarged; release over one commits — one
continuous gesture). Carousel: item press-grows toward card scale before navigating (the app-zoom
kin). Dock-to-card is already the archetype's own modal form.

**Build-from:** `useSelectionIndicator` (extend to goo anatomy), `useLeadTrail` (light leads
geometry), `useSpecularPointer`, `useDragMorph`, dock composables.

**Gap:** the goo-lens body (stretch-bridge-land as one element — likely a scaled clip-path/
transform pair, not SVG filter, for the Safari-2026 compositor fence); the whole-bar glow wash.

### H. Disclosure containers — accordion, collapsible, expandable-container, card, surface, separator

**Dose:** Q6 heavy, Q5 medium, Q2 medium, Q7 medium, Q1 light, Q3 near-zero (static cards never
carry light motion — §4 note 3).

**State relay:**
- expand: height travel + the reveal ladder — children fade+rise ~30–60px each as the container
  passes their threshold (fraction-keyed, so a scrubbed/interrupted expand is coherent at every
  intermediate height). The container never presents as one prerendered bitmap sliding (§1 note 1).
- expanding accordions: the opening section's growth and the closing section's collapse OVERLAP
  (three concurrent channels, §6 — none waits), the separator between them stretches taffy-like
  during the handoff.
- header engage: press-charge on the header row; the chevron's rotation spring inherits press
  velocity.
- card: idle = pure material (two-tier, tinted from beneath, top rim light, inner top glow when
  raised — §4). Interactive cards get archetype A's press script at reduced amplitude (~40% dose:
  a card is heavier than a button and moves less — weight readable through restraint).
- surface/separator: material only. The separator's one liveliness: the taffy stretch during
  adjacent-section morphs.

**Modal/enlarge: YES for card** — press-and-hold lifts the card toward a dialog (the app-zoom
morph family; the card's own body grows, content re-choreographs by the ladder — never a
crossfade into a different element). Accordion/collapsible: no — their expansion is already
their body.

**Build-from:** `useLiquidReveal`, `useStaggerReveal`, `disclosure-context`, `useElementMorph`
for card→dialog.

**Gap:** the fraction-keyed ladder (shared with F); card→dialog continuity morph.

### I. Feedback — progress, skeleton, alert, badge, toast, pulse, status-dot, completion-seal

**Dose:** Q6 medium, Q7 medium (value momentum), Q3 selective, Q1/Q2 near-zero (no gesture — no
weight to relay). Feedback components relay state the user did not cause; their expressiveness is
honesty made visible.

**State relay:**
- progress: the fill tip carries a live glint whose intensity tracks fill VELOCITY (Q7 — fast
  progress visibly rushes, stalled progress's glint cools; the user reads the derivative, which is
  the honest answer to "is it stuck?"). Value changes animate through intermediates on `snappy`,
  seeded with the previous change's velocity — a burst of updates reads as one accelerating run,
  not steps.
- skeleton: the shimmer is the loading-rail vocabulary for every archetype (one shared luminance
  drift, direction-consistent with reading order).
- toast: materializes via `transient` (center-seed bloom); exit never overshoots; stacked toasts
  re-choreograph with depth-graded travel (deeper cards move ~20% farther).
- alert: enters with the tone flooding the rim before the body fades in (light leads, ~80ms).
- badge/status-dot: count changes pulse once, mass-proportional (a 99+ badge moves less than a
  1→2 badge — weight as information); status transitions crossfade THROUGH the pulse vocabulary.
- completion-seal: the one theatrical license — handmark draw + a single specular sweep at
  completion; earned by rarity.
- pulse: is itself the breath primitive — the idle-engagement floor other components borrow at
  loading.

**Modal/enlarge:** no. Feedback grows attention, not size. (Toast press-to-expand into its full
alert is a plausible later derivation — parked, not specced.)

**Build-from:** `animated-digit`, `useBloomUp`, `FeedbackMark`, feedback-tone.css, pulse.

**Gap:** fill-tip velocity glint; value-spring velocity chaining on progress/metric.

### J. Data display — table, data-table, metric family, timeline, avatar, instrument-chassis

**Dose:** Q5 medium, Q7 medium (value churn), Q3 low, Q2 low. Mostly-idle bodies; suffusion
concentrates at the points the data MOVES or the user reaches in.

**State relay:**
- metric/animated values: every numeric change runs `animated-digit` with velocity chaining (as
  progress §I) — live-updating metrics read as instruments, not tickers.
- data-table sort: rows re-order through a real FLIP travel with depth-graded stagger; the sorted
  column's header carries a brief lens-landing (§G arrival at low amplitude).
- row hover/engage: container-tier row brightens one step; row press-charge only where rows act.
- timeline: entries reveal by the scroll-mapped ladder (`vReveal`/`useScrollTrigger`) — scrubbed
  by scroll position, coherent at every offset, never time-fired.
- avatar: presence transitions through status-dot vocabulary; press-grow on engage where the
  avatar is a control.
- instrument-chassis: the container for §K substrates — carries the two-tier contract and the
  loading breath; its bezel takes a velocity-linked glint when its instrument's value moves fast.

**Modal/enlarge: YES for metric and avatar** — metric press-grows into its detail card (the
sparkline enlarges into the full chart — dock-to-card at data scale); avatar press-grows into the
person card. Table cells: no (edit-in-place belongs to fields).

**Build-from:** `animated-digit`, `useScrollTrigger`, FLIP via `useElementMorph`.

**Gap:** FLIP-with-stagger for table reorder; the metric→detail morph.

### K. Procedural substrates — blob, aurora, handmark, constellation, fourier-field, liquid-grid, paper-backdrop, watercolor-dot

**Dose:** Q7 native (they own frame loops and can consume `usePointerVelocityField` directly),
Q3/Q5 native. Q1/Q2 as *response*, never as affordance — a substrate is ambience; it must never
read as clickable.

**State relay:** substrates relay the PAGE's state, not their own: pointer velocity perturbs the
field (blob deforms toward a fast pointer, constellation lines tauten); a foreground overlay
opening recruits the substrate into the medium change (the scrim's blur+dim extends into the
substrate's own parameters — one world, §5's persistent medium); PRM/battery drops them to still
frames with composition preserved. Handmark is dual-listed: as a substrate it is texture; as a
stroke vocabulary it serves B's checkmarks and I's seal.

**Modal/enlarge:** no. Substrates are the room, not the furniture.

**Build-from:** `usePointerVelocityField` (built for exactly this), `useIntersectionPause`,
`useIdleReady`.

**Gap:** the overlay→substrate medium handshake (a `--medium-t` the scrim writes and substrates read).

### L. Motion primitives — animated-digit, typewriter, sortable-list, infinite-scroll, fading-scroll, easing tools

These are vocabulary, not consumers — except sortable-list, which is a full gesture-holder:
lift-on-grab (grow-on-engage: the row pops out of its shell, casts control-tier shadow), siblings
part with depth-graded travel as the row passes (magnetic displacement), drop seeds the landing
spring with drag velocity, overshoot proportional. It is archetype C's physics on a vertical
domain and should share every primitive (Q1 wells at slot boundaries, Q2 weight, Q7 seeding).
Infinite-scroll/fading-scroll: rubber-band ends (Q1) + velocity-linked edge fades (fast scroll
deepens the fade — Q7). The easing tools are the authoring bench for all of the above.

---

## 5. The two rails, uniformly

- **disabled** = de-materialization: one glass tier down, rim light off, zero deformation response,
  specular dead. The interaction *physics* refusing to answer is the relay — stronger than opacity.
- **loading** = the breath: one shared slow luminance drift (skeleton/pulse vocabulary) carried on
  the component's OWN surface. Uniform across archetypes so loading is recognizable anywhere.

---

## 6. The modal/enlarge variant family — the exemplar generalized

The derivation rule, stated once: **a component earns a modal/enlarge variant iff (a) its gesture
is continuable into the enlarged form without re-grabbing — one finger, one gesture, two scales —
or (b) its content has a natural detail form the small body visibly IS (sparkline→chart,
avatar→person card).** Growth always runs the dock-to-card choreography: anchored edge pinned,
far edge travels, sides breathe +4–5%, reveal ladder fraction-keyed, collapse passes the
mid-detent, release velocity seeds every spring.

| component | variant | trigger | verdict |
|---|---|---|---|
| slider | modal scrub surface | mobile engage on thumb | YES — the exemplar |
| slider | grow-on-engage thumb | any engage | YES — stacked option |
| number-field | modal dial/strip | engage on stepper | YES |
| select/combobox | bottom-drawer picker | mobile trigger | YES |
| search | command sheet | mobile focus | YES |
| tabs | magnified hold-picker | press-and-hold | YES |
| card | grow-to-dialog | press-and-hold | YES |
| metric | grow-to-detail | press | YES |
| avatar | grow-to-person-card | press | YES |
| carousel item | press-grow-then-navigate | press | YES (app-zoom kin) |
| dock | dock-to-card | drag up | YES — already the campaign |
| drawer | peek/half/full ladder | drag | YES (formalized detents) |
| button, checkbox, radio | — | — | NO — tap gestures; growth adds nothing |
| switch | grow-on-engage only | — | thumb +8%; modal NO |
| input/textarea | — | — | NO — would tear keyboard focus |
| tooltip, badge, feedback | — | — | NO — attention, not size |
| substrates | — | — | NO — ambience |

---

## 7. The momentum facility — the universal contract (hallmark 6's "ALL of our components")

Every archetype that moves — by gesture, by value change, or by scroll — carries one canonical
motion channel. Not 29 bespoke velocity systems; the pieces exist, the contract does not:

1. **The state pair.** Any animated quantity is `(value, velocity)`, never value alone. The kf
   `SpringProgress` re-seat already makes springs velocity-continuous; the contract makes it
   mandatory at every handoff: gesture→spring (release), spring→spring (interrupt), value→value
   (chained data updates).
2. **The live channel.** During motion, the owning element carries `--atom-drag-v` (saturated
   tanh, 0..1, clamped ~0.7 — mass wins) and the transient `--motion-weight` boost
   (0.618 + 0.382·v, self-extinguishing) via the existing `useDragVelocity` +
   `writeVelocityWeight`. CSS recipes read these for smear, stretch, cast-lag, glint intensity —
   per-archetype k and caps set the dose (§8).
3. **The three sources, one shape.** Pointer gestures (`useDragVelocity`), scroll
   (`scrollReader` velocity — to be surfaced as the same var), and value churn (spring velocity
   from `useSpring` — to be surfaced likewise). A consumer never knows which source is driving.
4. **The gates.** Event-scoped rAF only (zero at rest — the A10 contract already in
   `useDragVelocity`); PRM sets the channel to 0 permanently (state still arrives, nothing
   smears); `inherits: false` registration so per-frame writes invalidate one element.
5. **Acceleration.** Not a third var — acceleration is *read* as the weight boost's attack rate
   (a fast-rising v IS high acceleration) and *expressed* through the catch/arrest vocabulary
   (hard deceleration into a bound = the 2-frame arrest, §1). No consumer needs `--atom-drag-a`.

---

## 8. The proportion matrix (the dose at a glance)

●●● flagship — ●● present — ● trace — · none. The zeros are load-bearing: tooltip's plainness,
the static card's lightlessness, and the substrate's non-affordance are what make the doses
elsewhere legible.

| archetype | Q1 magnetism | Q2 weight | Q3 specular | Q4 glass tiers | Q5 transparency | Q6 choreography | Q7 momentum |
|---|---|---|---|---|---|---|---|
| A momentary | · | ●●● | ●● | ●● | ● | ● | ●● |
| B bistable | ●●● | ●● | ●● | ●● | ● | ● | ●● |
| C continuous | ●●● | ●●● | ●● | ●● | ●● | ●● | ●●● |
| D text fields | · | ● | ● | ●●● | ●●● | ● | · |
| E list-selection | ● | ● | ●● | ●● | ●● | ●●● | ●● |
| F overlays | ●● (drawer ●●●) | ● | ● | ●●● | ●●● | ●●● | ●● (drawer ●●●) |
| G nav lenses | ●● | ●● | ●●● | ●● | ●● | ●● | ●●● |
| H disclosure | ● | ●● | · | ●●● | ●● | ●●● | ●● |
| I feedback | · | ● | ● | ●● | ●● | ●● | ●● |
| J data display | · | ● | ● | ●● | ●● | ● | ●● |
| K substrates | · | · | ●● | ● | ●● | ● | ●●● |
| L motion prims | ●● | ●● | ● | ● | ● | ●● | ●●● |

---

## 9. The gap ledger (what the wave set must mint)

Ranked by how many archetypes each unblocks:

1. **The fraction-keyed reveal ladder** — a stagger primitive keyed to expansion fraction, not
   time; scrub-coherent at every intermediate. Unblocks F, H, C-modal, E, G-dock. Nothing on disk
   is fraction-keyed today.
2. **`useMagneticBound`** — the generic rubber-band: resistive displacement + volume compression
   (asymmetric by forbiddenness) + velocity-seeded snapback with one overshoot. Unblocks B, C, F,
   G, L. Currently dock-private in spirit.
3. **The press-charge light leg** — engagement bloom distinct from the hover catch-light; the
   whole-body glow wash for composite bars. Unblocks A, B, C, G.
4. **The goo-lens body** — one continuous stretch-bridge-land element for selection travel,
   siblings legible beneath. Unblocks G, B(toggle-group), E(highlight).
5. **The universal motion channel (§7)** — surfacing scroll + value-spring velocity as the same
   var shape `useDragVelocity` already emits. Unblocks I, J, G-chrome, L.
6. **The modal-growth variant engine** — the dock-to-card choreography as a reusable
   grow-from-anchor with gesture continuity. Unblocks the entire §6 table.
7. **The per-state transparency ladder (Q5)** — engage brightens, disabled flattens, as tokens.
   Unblocks D + the disabled rail everywhere.
8. **The overlay→substrate medium handshake** — `--medium-t` written by scrims, read by K.

Every item is compositor-expressible on Safari 2026 (transform/scale/translate/opacity +
registered non-inheriting custom props; no SVG-filter goo, no layout reads in loops), PRM-gated at
the source, and zero-rAF at rest.
