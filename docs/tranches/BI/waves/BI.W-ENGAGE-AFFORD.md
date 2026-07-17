# BI.W-ENGAGE-AFFORD — the sustained-engagement affordance facility (ENGAGE-EXPRESS) + slider exemplar

Band: **B8-PRUNES** (interaction-affordance repairs — the net-new opt-in affordance + the slider
consumer adoption is exactly B8's "interaction repairs · consumer truth" charter; B6
AFFORDANCE-REDESIGN is story/demo-scoped, wrong domain). Ordering: after B7 W-SPRING-PARITY (the
engage register composes on a SETTLED spring authority; B8 sits after B7 in the DAG, so this is
satisfied for free). Proposed PLAN.md **§12** mint, mirroring §10 (dock-axis → B3) / §11 (sheet-motion
→ B7); the §12 text is proposed in the return, PLAN.md is READ-not-written by this arm.
MINTED 2026-07-16 at the engagement-affordance triumvirate pass
(BI-addenda; RESEARCH → HARDEN → TRANCHE-WRITE → FORMATION-REPAIR r1, two-consecutive-clean + a
root-cause repair round). The five-primitive
affordance map governs the pointer's ARRIVAL/DEPARTURE (hover / gleam / press / drag / focus) but has
NO register for the SUSTAINED state a control holds WHILE it is manipulated — the state a fingertip
occludes on a 20px track. No owning wave across the corpus mints that register (grep-verified: zero
waves mint an engage token, `.engage-grow` utility, or a sustained-engagement composable). Sources of
record:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/engagement-affordance/research.md`
(RESEARCH arm, lineage) +
`…/reports/engagement-affordance/harden.md` (HARDEN arm, NORMATIVE — five defects struck, contract
re-derived against `f47e63e0`) +
`…/reports/engagement-affordance/formation-repair-r1.md` (FORMATION-REPAIR r1, this round — 3
MUST-FIX + 5 SHOULD-FIX root-caused against `ca23d54f`). Reference media (read both — the pill IS an
engaged slider enlarged
into a popup): `…/reports/glass-subtlety/refs/openai-popup-1.png` + `openai-popup-2.png`. The hardened
contract below is the terminal execution specification; RESEARCH is lineage, not a broader license.

**Citation currency.** The HARDEN arm verified every source line against `f47e63e0`; the tree has
since moved to `ca23d54f`. The TRANCHE-WRITE arm re-verified the load-bearing VALUES against
`ca23d54f` (shadow rungs, scale tokens, `.tap-squish` shape, snappy/dock spring, the slider dock-
context wiring — all confirmed below). FORMATION-REPAIR r1 re-verified the FOCUS-TARGET topology
against `ca23d54f`: reka's `SliderThumbImpl.vue:59-60` mounts `role="slider"`+`tabindex=0` on the
thumb child; the slider's keyboard read is `:focus-within` on `.slider-track` (Slider.vue:416); the
weight-train keys off `:active`/`[data-held]` (Slider.vue:431-463); the Switch root composes
`.tap-squish` (Switch.vue:38) → `scale: var(--scale-press)` 0.96 on `:active` (base.css:217-219); the
affordance-map documents the sixth reveal-surface register (affordance-map.md:58-64/96). Per the pin-drift lesson (PROCESS-CODEX §3), file+symbol
citations are durable; literal line numbers are RE-PINNED AT EXECUTION, never treated as durable.

## §Wave shape — ONE wave, argued

RESEARCH and HARDEN both drafted a two-row split (facility + slider exemplar). This wave CONSOLIDATES
to one, on merit:

- The facility's only new runtime surface, `useEngageModal()`, is an inert public no-op in a commit
  that ships it with zero call sites (P-24: inert public no-op = API defect; P-11: a substrate needs
  a real consumer). Folding the slider exemplar into the SAME unit makes "the facility proves itself"
  structural, not a sequencing promise. Splitting facility from exemplar into two REGISTER ROWS buys no
  independent value and adds ledger overhead.
- **One wave, one register row, but a SPLIT SEQ across two tiers (M1 reconciled).** The consolidation
  is about the register-row UNIT (facility ≠ a second booked row), NOT about landing everything on one
  tag. The wave carries two SEQ tiers: GROW rides the Glass 7 tag; MODAL is SEQ POST → 7.x, gated on
  Q023-static-green + Q003-native-green (§Tag-sequencing). Each tier keeps its OWN real consumer at its
  OWN landing (GROW: the slider grow; MODAL: `useEngageModal` + the slider modal, shipped together), so
  the inert-no-op argument holds at BOTH tiers — `useEngageModal` never ships ahead of its call site.
  The split is a sequencing note inside one row, not a second register row.
- KISS / the orchestrator's stated prior both point here.
- The "never a mega-wave rewriting every component" fence is honored where it actually bites — the
  FOLLOW-ON adoptions (spectrum-slider, scrubber, switch, select) stay named-not-booked opt-in rows
  (§Follow-on roster). This wave adopts exactly ONE component (the slider), as the exemplar.
- HARDEN's "the two-wave split is correct and stands" affirmed facility≠exemplar CONCEPTUALLY and
  guarded against collapsing the roster into the facility. It did not rule on the wave UNIT — the task
  hands that to this arm on merit. The wave is NAMED for the facility; the slider is the exemplar
  SECTION; follow-on rows adopt "the ENGAGE-AFFORD facility," never "the slider wave." Nothing is lost.

The prior `BI.W-SLIDER-ENGAGE.md` draft is FOLDED into this wave (redirect stub left at that path;
the orchestrator drops its register row — see the PROPOSAL note in the return).

## §Intent — the user directive, quoted

User directive (2026-07-16): "when an interactive element is engaged with, that element affords and
expresses that state in some meaningful and visually interesting way (**every component must be
audited for this** … at least optionally)." The slider is named as the exemplar with TWO stackable
options: it "grows a bit, pops slightly out of its shell on a graceful eased curve," and — engaged on
a coarse pointer — expands into a popup (the OpenAI Control-Center register in the reference frames).

Reference reading (HARDEN re-measured both frames): the pill is a slider enlarged into a top-layer
popup. Track ~79% of the 402px viewport, ~76-83px tall, `radius-pill`; an OPAQUE white fill (~48% in
frame 1, ~64% in frame 2) whose right edge IS the handle; unfilled tick DOTS sit in the unfilled
region (occluded as the fill passes them); a header shows a value-DERIVED tier label with a
disclosure chevron ("5.6 Sol High ›" → "5.6 Sol Extra High ›" — "5.6 Sol" is CONSTANT across frames,
only the tier word flips, so the header slot takes arbitrary formatted content, not a live numeric).
The chevron is a tap-to-expand disclosure idiom — load-bearing for the open-path ruling (§Design T2).

## §Design — the hardened contract (normative)

**ENGAGE-EXPRESS** bundles two DIFFERENT KINDS of thing under one prop — the S2 correction names them
apart (the prior "one register, but do not call it a sixth register" was self-contradictory: the map
ALREADY documents a sixth register, and MODAL literally IS it):

- **T1 GROW is the genuinely-NEW cue — a SUSTAINED-ENGAGE affordance.** The affordance-map's five
  primitives all govern the pointer's ARRIVAL/DEPARTURE (hover / gleam / press / drag / focus); NONE
  expresses the state a control HOLDS while it is being manipulated (the finger-occluded fine value).
  GROW is that missing sustained read. It is admitted because the map's own closed-vocabulary rule
  says a new sustained cue needs its own wave (affordance-map.md:8-9), and this IS that wave. It
  registers as a new **SUSTAINED-ENGAGE** row in the map BESIDE the five — NOT as a sixth
  arrival/departure primitive (the five stay closed).
- **T2 MODAL is NOT a new register — it is the map's ALREADY-DOCUMENTED sixth register applied.** The
  reveal-surface SURFACE-BLOOM (`.glass-reveal` + `useLiquidReveal`, affordance-map.md:58-64, the
  Tooltip/Popover/Dialog/Drawer row :96) is the documented sixth register. `useEngageModal` is a
  ≤20-line adapter over `useLiquidReveal` (§Design T2) — it IS that sixth register POINTED AT an
  enlarged control instead of a tooltip. It mints no new register; it consumes an existing one. So the
  wave adds exactly ONE genuinely-new register (GROW's sustained-engage) and one NEW application of an
  existing one (MODAL on a control), never "a sixth."
- **Press ⇄ engage reconciliation.** PRESS-SQUISH is `--scale-press` 0.96 — a MOMENTARY dip at the
  activation instant (`.tap-squish:active`, base.css:217-219). Engage GROW is `--scale-engage` 1.06 —
  a SUSTAINED enlargement held WHILE engaged. Opposite directions, disjoint semantics: press = the
  confirm-tick of a binary atom; grow = the held state of a fine-value control. The proportion fence
  keeps them disjoint in practice (only fine-value/sustained controls adopt grow — §Audit); where an
  adopter composes both classes, fence (b) makes them selector-exclusive with a documented winner (the
  sustained grow supersedes the momentary press-dip for a sustained-engage adopter).

A modest opt-in extension, NOT a new mandatory canon primitive: two tiers, one prop, maximal reuse,
default OFF. The affordance-map's five arrival/departure primitives stay CLOSED; GROW joins as the
sustained-engage row, MODAL rides the existing sixth.

### T1 · GROW (in-place, all pointers) — CSS utility `.engage-grow`

- **Trigger (rederived — MUST-FIX 1).** Full selector:
  `.engage-grow:not([data-engage-modal]):where(:active, :focus-visible, :has(:focus-visible), [data-engaged])`.
  Adopters split into two focus SHAPES, so the keyboard-engaged read needs two arms:
  - `:active` is the POINTER-drag arm — a pointer held on any descendant propagates `:active` up to
    the root, so `.glass-slider:active` fires during a drag. This is the slider's OWN weight-train
    trigger (`.glass-slider:active .slider-range`, Slider.vue:431/444-445, verified `ca23d54f`), so
    the pointer-drag headline reuses a proven read.
  - `:focus-visible` is the keyboard arm for **self-focus adopters** — a leaf control (button, toggle)
    that composes `.engage-grow` on the element that itself receives focus.
  - `:has(:focus-visible)` is the keyboard arm for **focus-DELEGATE adopters** — a composite whose
    focus lands on a DESCENDANT, not the root that composes `.engage-grow`. The slider is exactly
    this: reka mounts `role="slider"` + `tabindex=0` on the THUMB child
    (`SliderThumbImpl.vue:59-60`), so the `.glass-slider` root is NOT focusable and
    `.glass-slider:focus-visible` NEVER matches on keyboard focus — the thumb child is what is
    focused. The slider's OWN keyboard read proves it: it rings the track off `:focus-within` on
    `.slider-track` (Slider.vue:416), never root `:focus-visible`. `:has(:focus-visible)` matches the
    root when its thumb child is keyboard-focused — the correct delegate read, and the bounded fix
    that makes keyboard-engaged grow live on THE exemplar (without it, only pointer `:active` grow
    fires and the keyboard-engaged grow is DEAD).
  - NOT `:focus-within` for the delegate arm: `:focus-within` also matches POINTER focus, so a
    click-and-release that leaves the thumb focused would leave the root PERMANENTLY grown.
    `:has(:focus-visible)` preserves keyboard-only semantics (a pointer click leaves no lingering
    grow; keyboard focus grows). `:has()` is baseline on the target engines (Chrome 105+/Safari
    15.4+/Firefox 121+) — no fallback ladder (no-masking law).
  - `[data-engaged]` is the opt-in attribute arm for adopters whose engaged state is
    `data-state`-driven and not expressible as `:active`/focus (e.g. a select-trigger whose "engaged =
    menu open" is `data-state="open"`; the component sets `data-engaged` itself).
  - `:not([data-engage-modal])` is the modal-supersession guard (fence d, M2) — dead while no modal
    is up, kills grow the instant a modal promotion commits.
  ONE shared selector serves both focus shapes: on a self-focus leaf `:has(:focus-visible)` never
  matches (no keyboard-focused descendant), on a focus-delegate composite `:focus-visible` on the root
  never matches — each adopter lights exactly one keyboard arm.
  **Correction of record:** the RESEARCH/prior draft claimed the slider "ALREADY uses `:focus-visible`
  for its weight-train (… the keyboard-engaged read)" — FALSE on two counts verified at `ca23d54f`:
  (a) the weight-train keys off `:active`/`[data-held]` (Slider.vue:431-463), not `:focus-visible`;
  (b) the slider's keyboard read is `:focus-within` on `.slider-track` (Slider.vue:416), because the
  root is not the focus target. The `:active` pointer-drag arm is unaffected; the keyboard arm is the
  bounded correction.
- **NO rename of `data-held` / `data-touch-active`** (HARDEN Attack 8, the headline strike). `data-held`
  is a dock-subsystem-wide contract — set on the dock root, owned by `useDockHold`, consumed across
  ~8 dock files (shell.css, morph.css, scroll-tokens.css); on a STANDALONE slider `isHeld =
  dock?.held.value === true` is PERMANENTLY false (Slider.vue, verified `ca23d54f`), so keying grow
  off a renamed `data-held` would leave every non-docked slider inert. `data-touch-active` is bound
  but consumed by zero CSS — "retiring" it is a no-op dressed as simplification. Both attributes stay
  EXACTLY as they are. `data-engaged` is a clean NEW additive name, never a rename.
- **Effect:** `scale: var(--scale-engage)` + `box-shadow: var(--lift-engage)`, on `--spring-engage`
  with the `--spring-snappy-duration` clock. Arm AND release ride the SAME spring (symmetric), so the
  release settle carries the ~+3.2% overshoot the user named ("gracefully easing curved way") — a
  spring-return to rest, not an exit-overshoot-past-gone (the control settles, it does not exit).
- **Tokens (control-scale family, `scale-paper.css`, beside `--scale-press`; RE-PIN the section at
  execution):**
  - `--scale-engage: 1.06` — heuristic (press −4% inverse ×1.5), with a falsifier: judged at paint,
    retune if it reads as a second hover rather than a sustained grab.
  - `--lift-engage: var(--glass-under-shadow-default)` — the **default** rung (4px/16px blur/0.08),
    NOT `vivid` (HARDEN Attack 7). `vivid` is 8px/**32px** blur/0.12 (glass-fx.css:377-379, verified)
    and its shadow clips inside the dock `overflow: clip` aperture and the real demo containers
    (PresetEditor configurator, AuroraConfigDock) + atlas's filter drawer.
  - `--spring-engage: var(--spring-snappy)` — 0.48s response / ζ0.74, settle ~0.44s, ~+3.2% overshoot
    (springPresets.ts, verified). The SIZE/MORPH register; carries the inertia + bounce the LIQUID-
    WEIGHT UNIVERSAL demands, on the spring-token authority, NO hand literal. `press` (0.20s/ζ0.80)
    was rejected for engage as too momentary; snappy CONFIRMED.
  - Each token keeps a proportional derivation + a falsifier — none is a canon number.
- **Fences (load-bearing — a grow adopter that ignores these breaks):**
  - (a) **Engage scale ≥ the adopter's own hover scale.** `scale:` is single-valued; rules do NOT add.
    On any element that hover-scales (generic `--scale-hover` 1.08, `--scale-hover-dock` 1.1), a 1.06
    engage would make GRABBING the control SHRINK it below hover — engaging must read as MORE presence.
    An element whose hover scale exceeds `--scale-engage` may not adopt grow at 1.06 (raise its engage
    scale, or do not adopt). The slider exemplar is safe because its `:hover` touches only
    `.slider-range` (brightens the fill rim), no root transform (verified `ca23d54f`).
  - (b) **`.tap-squish` scale-property exclusion.** `.tap-squish` writes the modern `scale:` property
    (`:active` → `scale: var(--scale-press)` 0.96, base.css, with its OWN PRM arm resetting `scale:1`).
    An adopter composing both `.tap-squish` and `.engage-grow` has two rules writing the SAME property
    (press 0.96 on `:active` vs engage 1.06). They MUST be selector-exclusive with a documented winner.
    The slider root does not compose `.tap-squish` (its press rides the `.slider-range` child
    transform), so the exemplar is clean. The fence binds every `.tap-squish`-composing adopter: the
    **switch** ROOT (Switch.vue:38, `scale: var(--scale-press)` 0.96 on `:active`) and the
    **select-trigger** are both in scope — either raises its engage-scale above press and documents the
    winner, or does not adopt grow (both are DEMOTED here anyway, §Audit).
  - (c) **Dock-context defer.** A control inside a dock context does NOT self-grow — the dock owns the
    container-level engagement (the audit grants dock controls "adequate — the dock expand IS the
    engage register"), and the dock's `overflow: clip` aperture would clip the grown edges + lift.
    Reuse the EXISTING `useOptionalDockContext()` (already held by the slider): grow is applied only
    when the dock context is absent. Standalone control grows; docked control defers. Zero new wiring,
    no double-pump, no clip.
  - (d) **Grow ⊥ modal — mutual exclusion by construction, not by timing (the M2 mechanism).** Under
    `engage="grow modal"` the two tiers must NEVER co-apply. The naive read fails: a coarse
    `pointerdown` fires `:active` — and thus grow — BEFORE `useEngageModal` sets `data-engage-modal`,
    which would flash a frame of grow under the finger before the modal supersedes. So the exclusion
    is STRUCTURAL, two guards:
    - (i) **coarse-primary:** the adopter WITHHOLDS the `.engage-grow` class entirely when
      `engage~="modal"` AND the pointer is coarse — reusing the SAME reactive `isCoarsePointer()`
      signal the modal path already holds (zero new wiring; this mirrors fence c's dock-context
      withhold, the precedent). On a coarse-primary device the grow class is never mounted, so no
      `:active` arm exists — ZERO grow frames; the modal is the sole register.
    - (ii) **fine-primary hybrid** (the residual corner where `isCoarsePointer()` reports fine but a
      touch arrives): the shared selector's `:not([data-engage-modal])` kills the grow arm the instant
      `useEngageModal` commits. Vue flushes `data-engage-modal` on the microtask after the
      `pointerdown` handler — before the next paint — so in practice no grow frame paints; the bounded
      worst case is ≤1 composited frame, MASKED by the bloom-from-rect (the inline control is already
      behind the blooming surface). `:not([data-engage-modal])` is the SAME attribute that sets the
      inline control `inert`+`aria-hidden` while the modal is up — one flag, three coherent effects
      (inert, hidden, un-grown).
    A grow-only adopter never sets `data-engage-modal` and is never coarse-withheld, so its grow is
    unaffected. This retires the unbacked "NEVER both — coarse supersedes" assertion (it now has a
    mechanism).
- **PRM:** `.engage-grow` carries its OWN `@media (prefers-reduced-motion) { scale: 1 }` arm (HARDEN
  Attack 7 — there is NO universal a11y carve that strips an arbitrary `scale:` property; the
  `--transition-liquid-spatial` PRM re-alias only swaps the spring CURVE, the element would still
  animate TO 1.06). The arm mirrors `.tap-squish`'s own PRM reset. Under reduce: scale gone, the lift
  + rim remain — becalmed but expressed.

### T2 · MODAL (coarse / touch, single-thumb) — composable `useEngageModal()`

- **Gate:** `matchMedia('(pointer: coarse)')` for BUILD-eligibility (reuse the pattern at
  `useDockCtaReceive.ts:259` / the `useReducedMotion` matchMedia source — mint NOTHING new for the
  gate; a 3-line shared `isCoarsePointer()` helper at most), AND `pointerdown.pointerType === 'touch'`
  for the actual OPEN decision (honesty — a hybrid touch+trackpad device reads coarse and would else
  promote on a mouse click; the media query is the capability pre-check, the event's `pointerType` is
  the open trigger).
- **Open path — DISCRETE promotion (HARDEN Attack 4, the pointer-adoption strike):** a coarse/touch
  engage promotes discretely — open → the enlarged pill settles → THEN adjust on the enlarged track as
  a fresh drag; release commits or it persists. NO mid-drag pointer adoption (`setPointerCapture` with
  the in-flight `pointerId`) in v0. That hand-off (i) fights reka's `SliderRoot` internal capture (the
  stale-binding class — source looks fine, only a live drag reveals the dropped capture), (ii) computes
  a value against a track that is BLOOMING (a ~0.44s snappy FLIP), producing garbage mid-bloom, and
  (iii) contradicts the reference's own disclosure chevron (a tap-to-expand affordance, not a seamless
  hand-off). Discrete promotion also dissolves the value-sync race entirely (there is no in-flight
  transfer to desync). The seamless hand-off is an explicit out-of-v0 future enhancement.
- **Surface:** `useEngageModal` OWNS the top-layer mount + the bloom-from-rect lifecycle
  (`useLiquidReveal`, source=trigger rect, opacity+blur channels, PRM snap — an existing adapter over
  `useElementMorph`, verified path `src/composables/motion/reveal/useLiquidReveal.ts`, 84 lines) + focus move-in
  / return + the dismiss listener. It owns NO spring (reveal register), NO backdrop (§CROSS-DEP), NO
  second value model. The COMPONENT supplies only the enlarged CONTENT (the slider supplies an
  enlarged `<SliderRoot>` bound to the SAME `v-model`). One registry, two views, `valueCommit` once on
  dismiss.
- **a11y:** the enlarged thumb keeps `role="slider"`; focus moves IN on open and RETURNS to the inline
  control on dismiss; the inline element is `inert` **and** `aria-hidden` while `data-engage-modal`
  (inert so a stray tab/pointer cannot land on the hidden original behind the backdrop), value still
  mirrored.
- **Enlarged geometry tokens (proportion + falsifier each; RE-PIN at execution):**
  `--engage-modal-track-height: 4.5rem` (~3.6× the md track), `--engage-modal-fill-inset: 0.5rem`
  (the opaque fill inset that occludes passed marks — the reference "dots in the unfilled region" read
  for free), `--engage-modal-max-inline: 24rem`, `--engage-modal-margin: 1rem`,
  `--engage-modal-radius: var(--radius-2xl)`. Popup width `min(100vw − 2·--engage-modal-margin,
  --engage-modal-max-inline)`, lower-third reachable zone; an OPTIONAL header slot takes arbitrary
  formatted content (value + tier label + disclosure chevron).
- **Scope: SINGLE-THUMB only.** The one external consumer, atlas's `PercentileRangeSlider`, is a
  DUAL-thumb range; a single-value pill does not map onto it (which thumb promotes?). Dual-thumb range
  modal is DEFERRED, not designed here. GROW is thumb-count-agnostic (uniform root scale), so atlas
  could opt into grow later; it can NOT get the modal.
- **Dismissal:** drag-scoped default (pointerup on the enlarged track → commit + reverse-bloom onto
  the inline rect); persistent variant (outside-tap / Escape) is a follow-on if a consumer asks —
  `engage="modal-persist"` is OUT of v0.

### API + data contract

- `engage?: "grow" | "modal" | "grow modal" | false` — default **false** (opt-in). `grow modal` =
  both authored, the pointer ARBITRATES (fine → grow, coarse/touch → modal, NEVER both — coarse
  supersedes because a finger occludes the inline control). The "NEVER both" is ENFORCED by fence (d)
  — the coarse `.engage-grow` withhold + the `:not([data-engage-modal])` selector guard — not left to
  event timing. `modal-persist` OUT of v0.
- Data attributes (clean break, no legacy alias — MEMORY no-backwards-compat): `data-engaged` is the
  NEW additive opt-in flag for `data-state`-driven adopters ONLY; `data-engage-modal` on the inline
  element while its modal twin is up (→ `inert` + `aria-hidden` + quieted). `data-held` and
  `data-touch-active` are UNTOUCHED.

## §Audit — the sustained-engagement census (HARDEN-corrected, 10 components from source)

| component | current sustained-engagement register | ruling |
|---|---|---|
| **Slider standard** | weight-train on `.slider-range` CHILD (`:active`/`[data-held]` → squash + smear + release punch) under the DELIBERATE box-INVIOLATE law ("the track does NOT move", Slider.vue:424); root has NO transform, no modal | **RESTRAINED-BY-LAW, not absent (S1).** The fill is richly expressive; the gap is precisely the missing SHELL-POP: no ROOT-scope engaged read (the shell never grows). GROW is a DELIBERATE reversal of box-inviolate AT THE ROOT (the user's "pops out of its shell"), fill-fraction invariant. GROW + MODAL. |
| **Slider spectrum** | held thumb halo `0 0 0 6px`, hover ring 4px; finger-occluded colour track, no promotion | **WEAK** — strongest MODAL follow-on (iOS color-picker idiom). |
| **ScrubberTimeline** | head/fill/press JS springs, expressive while scrubbed | **ADEQUATE→WEAK** — modal speculative; defer to a real consumer. |
| Tabs pill | `useDragMorph` grab→follow→gel-squish→fling-snap | **EXEMPLARY** — do NOT adopt grow (the one-fill lens morph must never meet grow). |
| Dock controls | hover 1.1 + `:active` + gleam; the dock's own expand is the sustained register | **ADEQUATE — load-bearing**: docked controls DEFER to the dock (fence c). |
| Menu row | `--menu-row-lift` -1px + bg tint | ADEQUATE. |
| Button / Checkbox / Radio / Toggle | `.tap-squish` 0.96; binary, instant, no fine value | ADEQUATE (proportion fence). |
| **Switch** | thumb translate on `--spring-snappy` (switch/styles.css:86-87); root composes `.tap-squish` → `scale: var(--scale-press)` 0.96 on `:active` (Switch.vue:38 + base.css:217-219) — it DOES carry a root PRESS-scale, just no SUSTAINED/grow root scale; binary, no sustained value | **ADEQUATE-BORDERLINE** — a switch has no sustained value (same fence that grades checkbox/radio adequate). Grow is POLISH, not gap-closure. DEMOTED. A `.tap-squish`-composing adopter → subject to fence (b)'s shared-`scale:` exclusion. |
| **Select/Combobox trigger** | `tap-squish` + chevron rotate on `data-state=open` | **ADEQUATE-BORDERLINE** — the sustained "open" state is already expressed by the open menu's reveal-bloom (same logic as accordion's content-reveal). Grow is polish. DEMOTED. |

The tightened gap statement: the scope is exactly the FINGER-OCCLUDED FINE-VALUE controls (standard
slider, spectrum slider, scrubber). Everything else meets its mapped floor. Narrower than the RESEARCH
audit by design — it keeps the facility from becoming an everywhere-jitter licence.

## §Exemplar — the slider adoption (grow + modal, single-thumb)

The first and only opt-in adoption in this wave. Current geometry (Slider.vue, verified `ca23d54f`):
md track 1.25rem/20px, thumb 1rem/16px; lg 1.75rem/28px; `radius-pill`; marks 0.375rem dots; the
standard fill edge IS the handle; the root already holds `useOptionalDockContext()` and exposes
`data-held`/`data-touch-active` (both KEPT, unrenamed).

- **GROW (T1) — the box-inviolate REVERSAL, argued (S1).** The slider's weight-train deliberately
  holds the track box static ("the track does NOT move — box-INVIOLATE", Slider.vue:424) and deforms
  only the fill. GROW composes `.engage-grow` on the `.glass-slider` ROOT, which enlarges the whole
  track — a DELIBERATE reversal of box-inviolate AT THE ROOT SCOPE. This is not a violation of the law
  but its intended exception: the law keeps the FILL from jittering the box during a drag; GROW makes
  the SHELL itself pop on engage, which IS the user's "pops slightly out of its shell." The two are
  compatible because they act at different scopes (root vs fill) and the fill FRACTION (the value read)
  is INVARIANT under a uniform root scale — the shell grows, the proportion the fill occupies does not
  change. Wiring: under `engage~="grow"`, gated off `useOptionalDockContext()` being ABSENT (fence c —
  a docked slider defers) and coarse-withheld when `modal` is also authored (fence d). The keyboard arm
  is `:has(:focus-visible)` on the root, NOT `:focus-visible` (the root is not focusable; the thumb
  child holds focus — MUST-FIX 1); `:active` covers the pointer drag. The existing fill weight-train
  stays on `.slider-range`. Root grow (`scale:` on `.glass-slider`) ∘ fill squash (`transform:scale()`
  on `.slider-range`) are DIFFERENT elements and DIFFERENT properties — no clash. Net fill at grab
  ≈ 1.06×1.02 long, 1.06×0.94 cross — a squash within a grown, box-reversed track. Paint-verify the
  composed bbox and the release feel (§π/DELTA row 1 — the double-settle bite).
- **MODAL (T2):** under `engage~="modal"` on a coarse/touch pointer, DISCRETE promotion — the enlarged
  `<SliderRoot>` blooms from the inline rect via `useEngageModal`, bound to the SAME `v-model`, and is
  driven as a fresh drag (no pointer hand-off). SINGLE-THUMB only. The opaque fill inset occludes
  passed marks; the optional header slot renders the tier label + chevron.

Closes the audit's Slider-standard row (the missing SHELL-POP, box-inviolate reversed at the root —
S1) and seeds the spectrum-slider MODAL follow-on.

## §Follow-on roster — named, NOT booked (opt-in rows)

Where the "never a mega-wave" fence bites. Each is a separate future opt-in row that adopts THIS
facility; none is booked here.

1. **spectrum-slider MODAL** — STRONGEST (fine-value colour track, finger-occluded, iOS color-picker
   idiom).
2. **scrubber-timeline MODAL** — plausible; defer to a real consumer (modal is speculative).
3. **switch GROW / select-trigger GROW** — DEMOTED to optional polish (they meet the proportion
   fence; not gap-closure). Adopt only if a paint pass shows they want it.

## §Work — the manifest (exact files; RE-PIN line numbers at execution)

**Facility (the shared surface):**
- `src/styles/tokens/scale-paper.css` — the engage token cohort (`--scale-engage`, `--lift-engage`,
  `--spring-engage`, the four `--engage-modal-*` tokens) in the control-scale family beside
  `--scale-press`.
- `src/styles/utilities/base.css` (or a sibling utility home) — the `.engage-grow` rule keyed off
  `.engage-grow:not([data-engage-modal]):where(:active, :focus-visible, :has(:focus-visible), [data-engaged])`
  (the `:has(:focus-visible)` delegate arm for focus-on-child roots like the slider — MUST-FIX 1; the
  `:not([data-engage-modal])` modal-supersession guard — fence d/M2), mirroring `.tap-squish`'s shape
  onto the sustained trigger; its OWN `@media (prefers-reduced-motion){ scale:1 }` arm; the documented
  `.tap-squish`/`.engage-grow` selector-exclusion (fence b).
- `src/composables/motion/reveal/useEngageModal.ts` (NEW) — the Tier-2 composable: the coarse+touch
  gate (reusing the `useDockCtaReceive`/`useReducedMotion` matchMedia pattern, or a 3-line shared
  `isCoarsePointer()`), `useLiquidReveal` bloom-from-rect, focus move/return, the `inert`+`aria-hidden`
  inline lifecycle, discrete-promotion dismissal (drag-scoped default). Ships on `/motion`
  (keyframes-backed via `useLiquidReveal`).
- `src/composables/motion/reveal/index.ts` + the `/motion` subpath — export `useEngageModal` (the
  subpath-export policy rides the build, fail-closed).

**Exemplar (the slider adoption):**
- `src/components/slider/types.ts` + `Slider.vue` — add `engage?: "grow" | "modal" | "grow modal" |
  false` (default false); compose `.engage-grow` on the root under `engage~="grow"`, WITHHELD when
  `useOptionalDockContext()` is present (fence c) OR when `engage~="modal"` and `isCoarsePointer()`
  (fence d/M2) — one bound `:class`, reusing the modal's own coarse signal, no new wiring; the root's
  keyboard grow keys off `:has(:focus-visible)` (the reka thumb child holds focus — MUST-FIX 1). Wire
  `useEngageModal` under `engage~="modal"` (single-thumb) mounting the enlarged `<SliderRoot>` on the
  shared model. `data-held`/`data-touch-active` producers UNTOUCHED.

**Focused tests** (ordinary vitest; jsdom + fake timers; each asserts a STATE OUTCOME across a
simulated gesture, never "the guard returned early"):
- `tests/composables/motion/reveal/useEngageModal.test.ts` (NEW) — the coarse gate (fine pointer →
  no open; touch `pointerType` → open), focus move-in/return-on-dismiss, the inline `inert`+
  `aria-hidden` while modal-up, `valueCommit` once on dismiss. BORN-RED at HEAD (no composable).
- `tests/components/slider/Slider.engage.test.ts` (NEW or EXTEND) — `engage` prop plumbing;
  `.engage-grow` present standalone, ABSENT under a mock dock context (fence c), and ABSENT under
  `engage="grow modal"` + a mock coarse pointer (fence d/M2 — the class-withhold that makes "NEVER
  both" structural); the shared-model sync (inline and modal `v-model` identical); the
  grow-does-not-jump-the-fill-fraction assertion. (The `:has(:focus-visible)` keyboard-delegate arm is
  a CSS matcher — asserted at paint in §π row 1, not jsdom.) BORN-RED at HEAD.

**Demo knob:**
- The slider story (`demo/stories/…/slider*`) — one `engage="grow modal"` exemplar block: a standalone
  slider that grows on hold/focus, and (on a coarse-emulated pointer) promotes to the enlarged pill
  with the header slot + opaque fill + dots. One story block; no new route.

**MIGRATION.md rows** (`## 7.0.0 (unreleased)`, additive — no alias, no shim):
- New-public-surface additions: `| engage | prop | /slider |`; `| useEngageModal | composable |
  /motion |`; the `.engage-grow` utility + the engage token cohort.
- One prose line: the additive ENGAGE-EXPRESS register (`grow` = in-place scale+lift on
  `:active` / keyboard focus (`:focus-visible`, or `:has(:focus-visible)` for focus-delegate roots);
  `modal` = coarse/touch popup promotion; default off). Additive, not a
  break.

## §CROSS-DEPENDENCY — the graded-backdrop seam (sequencing stated)

The modal sits over a graded sheet-edge backdrop. HARDEN Attack 4 corrects the RESEARCH over-claim
("THIS modal re-opens the register Q023 declined"):

- Q023 (addenda/PLAN.md, "GRADED SHEET EDGE; BACKDROP ENGAGE DECLINED") **BUILDS** the progressive
  graded sheet-edge band (13-40px blur/tint ramp, Safari-safe, sheet/overlay-owned STATIC surface) and
  **DECLINES** only the ANIMATED asymmetric backdrop-blur ENGAGE ramp (50-100ms in / 250-300ms out) —
  "mint no engage token, parallel clock, or radius animation."
- `useEngageModal` **CONSUMES the STATIC graded sheet-edge surface** (available from Q023's own build,
  refined by the concurrent glass-subtlety wave). It designs NO blur ramp, tint, or engage clock, and
  it does NOT require re-opening the declined animated-engage register.
- **Sequencing:** land after Q023's static surface exists (coordinate the token NAME with the
  concurrent glass-subtlety wave before either lands), OR fall back to the plain `.glass-reveal` scrim.
  The ANIMATED blur-ramp-on-open is OPTIONAL and out of v0; IF a future version wants it, THAT is the
  second-consumer signal that re-opens Q023's declined register — coordinate then, do not assume now.
- **Fallback (no-masking law):** the plain existing `.glass-reveal` scrim only — never a faked graded
  surface. The modal must be legible over the plain scrim with no graded register present.

## §Acceptance

Gate ruling (user, 2026-07-16 — binding): NO minted proof/gate script, no census tool, no CI line.
Standing checks = the dev toolchain only (typecheck · library build · demo production build · the
focused unit set). A one-time RED→GREEN differential inside the wave commit replaces any permanent
gate; the differential is quoted in the commit, nothing standing is minted. Paint truth is the
PRE-TAG Fable lane (Q002) + the native paint batch (Q003), NEVER CI.

- **`vue-tsc`** — `engage?` typed on the slider props; `useEngageModal` typed and exported from
  `/motion`. Green.
- **Focused `vitest`** — the manifest's test files. BORN-RED at HEAD (no `engage` prop, no
  `useEngageModal`; the coarse-gate / focus-return / dock-defer assertions cannot pass), GREEN after
  the facility + exemplar land.
- **`npm run build`** — the subpath-export policy rides the build (fail-closed); `/motion` emits
  `useEngageModal` in its `.d.ts`, `/slider` emits the `engage` prop.
- Behavioral bites (mapped to user-observable defects):
  - A `.engage-grow` control scales to 1.06 + lifts and settles back on release under a POINTER drag
    (`:active`) AND under KEYBOARD focus — `:focus-visible` for a self-focus leaf, `:has(:focus-visible)`
    for a focus-delegate root (the slider: keyboard focus lands on the reka thumb child, so the root's
    grow must key off `:has(:focus-visible)`, MUST-FIX 1); under PRM the scale is gone, the lift + rim
    remain.
  - A grow control INSIDE a dock context does NOT self-grow (fence c). A `grow modal` control on a
    coarse pointer does NOT flash grow before the modal opens (fence d/M2: the `.engage-grow` class is
    coarse-withheld, and `:not([data-engage-modal])` guards the residual hybrid corner).
  - `useEngageModal` opens ONLY on a coarse/touch pointer; a fine pointer gets grow (or nothing);
    focus returns to the inline control on dismiss; inline and modal `v-model` stay identical.
  - With no graded backdrop register present, the modal is legible over the plain `.glass-reveal` scrim.

## §PRM contract

`.engage-grow` carries its own `@media (prefers-reduced-motion){ scale:1 }` arm (no universal
scale-strip exists); the lift + rim survive — becalmed but expressed. The modal STILL OPENS under
reduce (functional promotion is an a11y win), its bloom SNAPPED fade-only via `useLiquidReveal`'s
existing PRM path, the backdrop static. No motion is mandatory under reduce; every arm degrades to a
static-but-expressed state.

## §π / DELTA — native-verification debt (rides the visual-sweep phase; no browser this phase)

The engagement FEEL is judged at paint, not unit-provable. Recorded as debt on the visual-sweep
phase, NOT counted done. **The captures are tier-split (M1):** row 1 (GROW, standalone slider) and
row 3 (dock-defer) are SELF-CONTAINED — no Q023 surface, no aurora substrate — so they ride the
PRE-TAG Q002 Fable lane as tag-GATING captures that are NOT coupled to the red aurora blocker (they
are independent slider captures). Row 2 (MODAL) is Q023/Q003-coupled and DEFERRABLE — it rides Q003
AFTER V-A95 clears, with the modal TIER (§Tag-sequencing), and adds NO fresh native captures to the
already-red, consumer-blocking gate at the tag:
1. **Grow arm+release**, fine pointer, a standalone slider, 1440 CSS px, both schemes — the pop reads
   as a DISTINCT sustained state (not a second hover); the release settle carries the snappy ~+3.2%
   bounce; the fill VALUE fraction is visually unchanged across the transform. Chrome + Safari.
   - **Double-settle bite (S3).** On drag-RELEASE two overshoot curves fire at once on NESTED
     elements: the root un-grows on `--spring-engage` (snappy, +3.2% overshoot) while the child fill
     un-squashes on `--ease-cartoon-punch`/`--duration-normal` — different curves, different
     amplitudes, different durations. The composed release must read as ONE coherent settle, not a
     nested wobble (root bounce fighting fill bounce). Falsifier: if the two overshoots read dissonant
     at paint, the resolution is to subordinate the root grow's release onto the fill's curve family
     (align the settle), NOT to add a third timing. This is a NEW bite — the prior row checked only the
     fill fraction, never the composed release feel.
2. **Modal bloom→settle→drag→dismiss** on a 390 CSS px coarse-emulated viewport, both schemes,
   normal + reduced motion, against the OpenAI reference (track ~3.6× inline, opaque fill occluding
   the dots, header + chevron, graded backdrop). The reverse bloom lands on the inline rect; focus
   returns to the inline slider; under PRM the bloom snaps.
3. **Dock-defer**: a slider inside a `<GlassDock>` held → the dock expands, the slider does NOT
   self-grow, nothing clips at the `overflow: clip` aperture.
- DELTA: `docs/tranches/BI/audit/visual/W-ENGAGE-AFFORD-DELTA.md` (filed at the sweep).

## §Obligations

- Coordinate the graded-backdrop token NAME with the concurrent glass-subtlety wave before either
  lands (the seam is shared; §CROSS-DEPENDENCY).
- A fresh `npm run build` before any `/motion` or `/slider` `.d.ts` surface claim.
- `docs/design/affordance-map.md` records the two KINDS correctly (S2): GROW gains a NEW
  **SUSTAINED-ENGAGE** row beside the five arrival/departure primitives (the five stay closed); MODAL
  is recorded NOT as a new register but as the EXISTING sixth reveal-surface register
  (`.glass-reveal`+`useLiquidReveal`, map:58-64/96) APPLIED to a control promotion — a new row under
  the sixth-register family, never a new register. The map's stale press value truth-up (`0.15/ζ0.86`
  → live `0.20/ζ0.80`) is FLAGGED and owned by the doc wave, NOT this one (the RESEARCH-cited
  "useSpringPress 0.25/0.7" string is not in that file — dropped as unsupported).

## §Dispositions

- **ENGAGE-EXPRESS facility (tokens + `.engage-grow` + `useEngageModal`): BUILD** — one wave, one
  register row, default off, maximal reuse; split across two SEQ tiers (M1).
- **Tier-1 GROW (tokens + `.engage-grow` + slider grow): BUILD, rides the Glass 7 tag** — self-contained,
  after B7 SPRING-PARITY; the genuinely-new SUSTAINED-ENGAGE cue (S2).
- **Tier-2 MODAL (`useEngageModal` + `--engage-modal-*` + slider modal): BUILD, SEQ POST → 7.x** —
  the existing sixth reveal-surface register applied to a control (S2); gated on Q023-static-green +
  Q003-native-green (V-A95 cleared); ships WITH its call site (no inert no-op).
- **`data-held` / `data-touch-active` rename: STRUCK** — dock-wide contract, wrong for standalone, out
  of scope (Attack 8). Both KEPT byte-identical.
- **`--lift-engage` = `--glass-under-shadow-default`** — NOT `vivid` (dock/drawer clip, Attack 7).
- **Mid-drag pointer adoption: STRUCK from v0** — fights reka, animates value mid-bloom, contradicts
  the chevron idiom (Attack 4). Discrete promotion instead.
- **Dual-thumb range modal: DEFERRED** — atlas is dual-thumb; a single-value pill does not map. GROW
  is thumb-count-agnostic; atlas may opt into grow later, never the modal.
- **`engage="modal-persist"`: OUT of v0** — drag-scoped/discrete dismiss only; persist is a follow-on
  if a consumer asks.
- **Default: OFF (opt-in) — MANDATORY, not preference.** The one external consumer (atlas
  `PercentileRangeSlider`, a dual-thumb range in a filter drawer) must not change unbidden, must not
  get a clip inside its drawer, and cannot express a single-value modal. sci-report / slides: no
  slider consumer. `engage` defaults false; atlas is unaffected until it opts in.
- **Follow-on roster (spectrum modal / scrubber modal / switch grow / select grow): NOT BOOKED** —
  named opt-in rows; each adopts this facility if a paint pass warrants.

## §Tag-sequencing ruling — TWO TIERS, split SEQ (M1)

The prior ruling welded the self-contained GROW and the Q023/Q003-coupled MODAL onto ONE tag ("lands
before the Glass 7 tag"). M1 struck that: MODAL's paint-verify is transitively coupled to the RED
aurora blocker (Q023 is nonterminal-until-Q003-native, addenda/PLAN.md:198; Q003/V-A95 is ACTIVE RED,
:86/:119) and would add 3 fresh native captures to an already-red, consumer-blocking gate. The
inert-no-op argument (a facility needs a real consumer) does NOT force both tiers onto the same tag —
GROW alone is a real consumer of the tokens + the `.engage-grow` utility, and MODAL keeps its own real
consumer (the slider modal adoption) in its own tier. So:

- **Tier-1 GROW — rides the Glass 7 tag.** Ships: the engage GROW tokens (`--scale-engage`,
  `--lift-engage`, `--spring-engage`), the `.engage-grow` utility, the slider GROW adoption. SEQ:
  within B8-PRUNES, after B7 W-SPRING-PARITY. SELF-CONTAINED — no Q023 surface, no aurora substrate.
  Its paint (§π rows 1, 3) is TAG-GATING but rides the PRE-TAG Q002 Fable lane as an independent
  slider capture — it does NOT wait on and does NOT add red to the aurora blocker. Real consumer at
  the tag: the slider GROW. No inert no-op.
- **Tier-2 MODAL — SEQ POST → a 7.x minor (NOT the Glass 7 tag).** Ships: `useEngageModal`, the
  `--engage-modal-*` tokens, the slider MODAL adoption — TOGETHER (so `useEngageModal` never ships
  before its call site; no inert no-op at either tier). SEQ: gated on Q023's static graded sheet-edge
  surface GREEN **and** Q003 native GREEN (V-A95 cleared). Its 3 native captures (§π row 2) ride Q003
  AFTER the blocker clears — never adding red to the tag gate. RE-PIN file lists + line numbers at
  execution.

CROSS-DEP (Tier-2 only): Q023's static graded sheet-edge surface — coordinate the token name with the
concurrent glass-subtlety wave; the animated engage ramp stays declined. Both tiers additive (`engage`
default false) — not a break, no alias, no shim. **Whether engage's own π is tag-gating:** Tier-1's is
(GROW rides the tag, its π gates the tag via Q002); Tier-2's is DEFERRABLE (MODAL's π rides Q003
post-V-A95, off the tag). This keeps the atlas-blocking tag clean of MODAL's Q023/Q003 paint debt.

## §Implementation model note

Opus IMPLEMENTS the facility + exemplar from this spec; Fable JUDGES the engagement feel at the
pre-tag paint lane (Q002) + the native paint batch (Q003). The engagement register is a paint
property — the §π/DELTA rows are the judged artifacts (captured screenshot + paired motion trace),
never a commit-message claim (the paint-claim inflation class, PROCESS-CODEX §3).

## §Two-challenge gate note

Converged two-consecutive-clean under the triumvirate dispatch (PROCESS-CODEX §5): RESEARCH (unknown
grade → read-only audit of the affordance map, 10 components, the reference frames, the token/spring
homes) → HARDEN (suspicious grade → refute-default). HARDEN STRUCK five load-bearing defects (the
`data-held` rename as dock-scope creep and semantically wrong for a standalone slider; the `vivid`
under-shadow as clip-prone; mid-drag pointer adoption as reka-fighting + value-garbling +
chevron-contradicting; the "universal a11y scale-carve" as non-existent; the switch/select WEAK grades
as inflated past the proportion fence) and CONFIRMED the two-tier CSS/composable split, the snappy
spring, the default-off ruling, and the reference reading — each with source-line evidence against
`f47e63e0`. The TRANCHE-WRITE arm re-verified the load-bearing VALUES against `ca23d54f`, consolidated
the two proposed rows into one wave on merit (§Wave shape), and folded the hardened contract as the
normative spec above. A FORMATION-REPAIR round 1 (design seat, 2026-07-17) then root-caused 3 MUST-FIX
+ 5 SHOULD-FIX against HEAD `ca23d54f`: the T1 keyboard arm was INERT on the exemplar (reka mounts
`role="slider"`+`tabindex=0` on the thumb child, `SliderThumbImpl.vue:59-60`, so root `:focus-visible`
never matches → added the `:has(:focus-visible)` delegate arm + corrected two false §T1 claims); the
tag-sequencing welded the self-contained GROW to the Q023/Q003-coupled MODAL onto the RED-aurora tag
(split into two SEQ tiers — grow→tag, modal→7.x); the "NEVER both" stacking had no mechanism (added
fence d — the coarse withhold + the `:not([data-engage-modal])` guard); the Switch audit row was
imprecise (it DOES carry `.tap-squish` press-scale — fence b widened to include it); the Slider "WEAK"
mislabeled a design law (reframed as the box-inviolate REVERSAL — the shell-pop); the taxonomy bundled
two KINDS (GROW is the new sustained cue, MODAL is the existing sixth reveal-surface register applied);
the double-spring release added a paint bite; the band was named (B8-PRUNES, proposed §12). No third
challenge is owed — the repair root-caused, corrected, and confirmed; the contract is clean.
