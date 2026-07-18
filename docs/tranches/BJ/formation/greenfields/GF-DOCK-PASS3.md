# GF-DOCK — greenfield design, PASS 3 (REFABLE union)

- verified-model: claude-fable-5—read verbatim from this seat's system context ("The exact model
  ID is claude-fable-5").
- union provenance: REFABLE RU-05, 2026-07-18. The prior PASS1/CRIT2/PASS3 trio was opus-begat
  (claude-opus-4-8 via the settings-level subagent override) under Fable declarations. This seat
  re-derived the dock design anew from the corrected canon (IOS27-CODEX laws 2/3/4/6/14-18, the
  RU-15 MARKS-A/B union, the measured timelines `sr-0620-1847`/`sr-0710-1626`/`sr-0620-1848`,
  SUFFUSION-MATRIX, SUPERFLUITY, FEEDBACK-LEDGER F47/F27/F06/F04, dock sources at HEAD) with the
  trio unread—the ANEW draft fixed at `scratchpad/ru05-anew-dock.md` before the boundary—then
  unioned. Fable design authoritative on conflict; opus decisions kept only where RATIFIED.
  Verdict ledger: `../refable/REFABLE-RU-05.md`.
- The section skeleton of the prior PASS3 is PRESERVED so the ASSEMBLY-CROSSWALK anchors
  (§4.1, §5, §6, §12, W1/W2/W3/W6) keep resolving. Contents are the union.
- TRANCHE-DEVELOPMENT: no source touched; no browser this seat—every π obligation is OWED, and
  LIVE-DEFER stands on every paint claim.

---

## 1. The record (supersedes the opus CRIT2-adjudication table)

The prior §1 adjudicated the opus CRIT2 charges; that record STANDS where RU-05 ratifies it
(keyboard decision C1, evidence corrections C5/C6/C7, single-model collapse C2/C3, fission
parking C12) and is SUPERSEDED where the corrected canon falsifies its substrate—chiefly: the
snap mechanism (CSS `scroll-snap` cannot express the measured physics, law 14), the fade-mask
occlusion grammar, the pill-as-terminal selection scoping (the lens is now law 16b/c with
measured constants), the stale law-5/law-6 citations, and the absence of the dock state-machine
choreography (law 16a) and continuity law (17). Per-decision verdicts: `REFABLE-RU-05.md`.

The one exhortation this design serves (F47): the scrolling dock must subtly display that more
options exist left/right; clicking an occluded or edge item auto-scrolls the dock; greenfield
again with better UX and affordances in mind.

---

## 2. The corrected model — ONE dock: a state machine of glass bodies over a detented strip, under a lens

The dock is three coupled layers, each law-grounded:

1. **The strip** — the item run under a windowing tray. When content exceeds the tray, the tray
   is a window over a DETENTED strip obeying the measured physics (laws 14/15). Never a free
   scroll port with a fade mask; never a cluster popover as default.
2. **The lens** — the selection object (law 16b/c). Tap: lens travel with transit tint-bleed
   under an instant content swap. Drag: the press-born lens with commit-on-release. The lens is
   the dock's engagement voice; the traveling-indicator reuse is its seed, not its ceiling.
3. **The posture machine** — collapsed ↔ hover ↔ pinned (the shipped FSM survives), with the
   collapse/re-expand MORPH now carrying law-16a choreography (three-body goo overlap,
   displacement-gated collapse, intent-gated re-expand, selection-change reset) and law-17
   continuity (item state never resets across geometry).

The opus round's single-model collapse (α/β/γ dissolved into one dock) is RATIFIED—the corrected
model keeps it. What changes is the substance of each layer: the detent CONTRACT survives but
its CSS-snap mechanism is struck (law 14: "CSS scroll-snap cannot express duration-stable
snapping. Web: JS spring integrators"); the fade mask is replaced by an evidence-preserving
occlusion stack; the flat pill is replaced by the lens register.

The reconciliation of "no interior scroll" (MARKS-B §6: "no interior scroll (F27)") with the
user's own "scrolling dock" words (F47): the ban is anchored to F27—the CROSS axis and the
feelable free-momentum rest-anywhere scroll. The layout axis travels—detented, physics-true,
with the world scrolling under a quasi-fixed lens (the Safari-adopted overflow model,
SUFFUSION-MATRIX §1.4-G). F47 is satisfied on the layout axis; F27 dies structurally on the
cross axis.

**Spine census (RATIFIED, CRIT2-verified on disk):** `useDockSpring` (the sole `SpringProgress`
site; velocity-continuous re-base) / `DockCrossfade` / `useSelectionIndicator` /
`useSelectionGroup` / `useDockOverflowFit` survive. `DOCK_SPRING = springPreset("dock")` =
0.30/ζ0.82 on disk (`springPresets.ts:95-97`)—the {0.68,0.64} memory figure is stale. The pixel
mask + block scroll + `.is-active` strip + chevron chrome are replaced. The one new primitive
stays `useDockItemCensus` (a `useDockOverflowFit`-shaped RO publishing cell rects—it feeds the
detent table and seat targets, no longer a fade mask). The 4-dead-knob cut and the Slider
dock-hold context move inherit per `BAND-REDUCTION.md`.

---

## 3. The decided keyboard model (ADJUDICATION-1 ruling 4 — RATIFIED, kept whole)

**DECISION, unchanged from the opus round and ratified by this union: the dock is a
`role="toolbar"` with roving tabindex; its items stay `RouterLink` route-links carrying
`aria-current="page"`, never `role="tab"`.**

- Container: `role="toolbar"`, `aria-orientation` per axis, `aria-label`. One new value
  `toolbar` in `useSelectionGroup`'s role menu; no tab/tabpanel semantics.
- Items: `RouterLink` + `aria-current="page"` for route docks; `<button>` +
  `aria-pressed`/`aria-current="true"` for in-dock panel switching. Native roles preserved; no
  `aria-selected`.
- Roving tabindex: exactly one tab stop; arrows move roving focus along the layout axis only;
  cross-axis arrows are no-ops (ties to G-NO-BLOCK-SCROLL); no wrap; Home/End hit the true
  extremes, landing detent-aligned.
- **Focus ⟂ occlusion:** a focused item is never left under the tray edge. `focusin` on an item
  the census reports occluded fires the seat glide (§4.2) before it reads as focused—the
  keyboard user can never focus an invisible item. Keyboard travel is deterministic preset
  motion with zero seeded velocity (the SUFFUSION keyboard law).
- **BJ-ASK truth-up (kept):** the decision ratifies nav-links → family J corrects the
  "SegmentedTabs wearing chrome" comment (`useSelectionIndicator.ts:16-24`). Comment truth-up
  only.

The seat GLIDE physics under this model change with §4 (duration-stable snap, not
`scrollIntoView` easing)—the a11y contract does not.

---

## 4. The strip — detents, physics, and the evidence stack (F27 vs F47, resolved)

### 4.1 Block axis — provably non-scrollable (F27) [RATIFIED, kept whole]

The horizontal dock port is a single flex line with a dead block axis (`overflow-y: clip`; the
run never has block overflow). The recenter call drops `block:'nearest'`
(`useSelectionGroup.ts:183-186`, a co-cause of F27) and uses inline-only programmatic travel.
Cross-axis arrows are no-ops. **RED today:** `useDockOverflowFit.ts:38-40` measures block
overflow; `feedback/F27-dock-vertical-scroll.png` shows the leak. Vertical docks get the same
contract rotated—only the layout axis ever travels.

### 4.2 Inline axis — the law-14/15 detent engine (the mechanism correction)

The opus round specified `scroll-snap-type: inline mandatory` + `scrollend`. STRUCK—law 14 rules
it directly: CSS scroll-snap cannot express duration-stable velocity-parameterized snapping, and
it can express none of: velocity-projected detent selection, per-detent damping, the asymmetric
rubber band. The detent CONTRACT survives (no rest state mid-cell without evidence; a detented
advance, not a feelable free scroll); the mechanism is the measured physics:

- **Programmatic seats** (tap-to-reach §4.4, keyboard, Home/End): duration-stable snap—the
  spring absorbs v0 as an initial condition; ζ≥1, τ≈130ms, settle 650-683ms at any entry
  velocity, the ~200ms sub-2px creep tail NOT clipped (law 14a). Single-channel flight: no
  scale, fade, blur, or parallax on the strip during travel.
- **Touch/trackpad flicks**: ballistic, inheriting release velocity; detent selection is
  VELOCITY-PROJECTED—target = detentNearest(x + v·τ), τ≈0.2s; flicks skip intermediate detents
  (law 14d/7c analog).
- **Tracked drags**: 1:1 finger-locked, never tweened (law 15). Overpull past the strip ends is
  position-mapped by the asymmetric rubber band: penetration gain ≈0.023px/(px/s), compression
  ~90ms, release ~380ms asymptotic, never crossing rest (law 14b).
- **Per-detent damping**: end detents land critically damped (no overshoot); interior detents
  may carry ~2%-of-travel underdamp ONLY when release velocity earns it (the earned-overshoot
  law; springs seeded v=0 land dead).
- **Regime split at the finger** (law 15): tracked leader / ballistic release / fire-and-forget
  programmatic close. Never tween a tracked drag; never reverse-scrub a close.

**Mechanism stance (honest split):** default is the HYBRID—the native scroll port survives as
the input and a11y substrate (wheel, touch pan, AT scroll semantics), with the detent engine
driving programmatic seats and post-gesture snap corrections through the dock spring writing
`scrollLeft`, and per-item occlusion effects riding scroll-driven animations. The full
driven-strip proxy (transform strip, all input synthesized) is adopted ONLY if the IOS27-MICRO
F2 NATIVE-SCROLL probe proves detent catches and held-pins inexpressible on Safari 2026 (§9).
The spec's contract (detents, constants, evidence stack, tap-to-reach) is mechanism-agnostic and
survives either answer.

### 4.3 The detent grammar + the evidence stack (replaces the census-anchored fade)

**Cut-band detents (the peek guarantee, by construction).** End detents are flush (nothing
hidden on that side → no affordance owed). Interior detents are bias-tuned so BOTH port edges
land a partial item in a 25-60% cut band—the partial item IS the structural evidence that more
exists. Edge-inset-symmetric grammar (the measured carousel: 21pt insets, `sr-0620-1848`). The
census (`useDockItemCensus`) publishes cell rects; the detent table derives from them (cells are
not equal width—detents are per-cell positions with the bias filter, not a pitch multiple).

**The evidence stack—three channels, one register each (the F47 cure):**

1. **Structural—the peek**: no rest position with hidden content shows a flush edge; the
   cut-band filter makes a sliver inevitable. (The opus geometry conceded "the trailing fraction
   is arbitrary but deliberately faded"—struck: arbitrary + faded can render evidence invisible.)
2. **Material—the lip shadow**: the tray edge over hidden content is an OVERHANG—a dark
   under-rim occlusion gradient a few px deep, with the rim caustic quieted over it—not a
   fade-to-transparent mask. The FadingScroll mask DESTROYS the evidence (the item vanishes);
   the lip preserves it (the item sinks under a rim). Painted only on sides with hidden content
   (the extant scroll-driven-opacity idiom keeps this honest: no cue when nothing is hidden).
3. **Kinetic—the velocity-keyed edge glint**: the receiving edge's caustic brightens with strip
   edge velocity and decays at rest (law 3's first-class velocity clause). Wired to the
   ENERGY-FIELD velocity scalar when F4 ships (§9); until then a dock-spring-local hook.

**Never mid-glyph (MARKS-B §6), resolved by condensation, not clipping:** the edge item under
the lip CONDENSES—scale ~0.6-0.7 anchored at the port edge, dimmed under the lip, glyph whole at
reduced size. Position-mapped via per-item `view(inline)` timelines (scrub-reversible by
construction, zero JS, the law-7d position-mapping analog). A whole small glyph under an
overhang beats a bisected glyph under a fade and beats an erased one. Declared BEST-iOS
divergence—iOS ships no overflowing dock; the nearest kin is the Safari world-scrolls-under-lens
model, adopted (SUFFUSION §1.4-G).

**PRM:** seats become instant jumps; the condensation/lip/peek stay (position-mapped legibility
cues, not motion); the glint stops animating. PRM removes physics, never information.

### 4.4 Tap-to-reach (F47b) — instant commit, concurrent seat

Activation of an item whose visible fraction < ~95%: **commit INSTANTLY** (law 16b—content swap
≤83ms, never sequenced after travel; the consumer's route/selection fires on the tap), and
CONCURRENTLY seat the item—a duration-stable snap to the nearest cut-band detent that fully
contains it plus its gutter. The travel is choreography over an already-committed state, never a
gate before it. Keyboard focus into a partial item always seats (§3). The lens travel (§7) runs
over the seat glide as an independent channel—detuned, not batched (law 5's channel discipline).

Overflow topology stays the strip; the "+N" cluster tray (canon-sanctioned: MARKS-B §6 "cluster
chips") remains OPTIONAL for the COLLAPSED posture only, an ASK (§12.3)—the peek+condensation
stack is the one expanded-state affordance, done fully (parsimony; a chip would duplicate the
sliver's message).

### 4.5 Seat glide vs the collapse FSM / touch gate / Slider hold [RATIFIED, kept]

The seat glide takes a `keepOpen()` reference on the `railHolds` count at glide start, released
at settle—composing with the Slider dock-hold context move (both are reference-counts on one
ledger). Paint-verification against `useDockClickIntegrity`/`useDockTouchGate` OWED (§10).

---

## 5. Shape / radius grammar [RATIFIED, re-anchored]

Kept whole from the opus round (its evidence corrections were sound):

- Delete the decorative per-item outline-ring circles (F04-direct: "this shape is to be
  abrogated" + KISS) and the chevron controls (F47-redundancy once tap-to-reach + the evidence
  stack + Home/End land)—NOT as a law-4 violation: a circle tap-target inside a pill is
  law-4-LEGAL (the ban is card-in-pill; the cure-list is F09/F12/F15/F17/F45/F48).
- Law 4 (re-anchored `IOS27-CODEX.md:14`) is the positive grammar the dock conforms to: tray =
  stadium pill (card when wrap/grid), items = circles/tabs, concentric nesting inner = outer −
  padding, shelf gaps ≈ the pill's own corner radius (the measured 17-20pt against ~22pt). The
  dock consumes `--radius-dock` and the material tokens; BAND-MATERIAL owns their values.
- The F05 split stands: the dock-shift half is G-NO-LAYOUT-SHIFT (§6); the aurora half is not
  this greenfield's.

**RED-at-HEAD:** `BottomDock.vue:161-252` chevron circles + the F04 rail rings.

---

## 6. Page transition (F06) + no-layout-shift (F05 dock half) [AMENDED — law 5 re-grounded]

- **F06 (G-PAGE-NOFLASH):** the crossfade opacity floor is RATIFIED as the invariant—the dock
  shell never unmounts; the incoming page paints under the outgoing; no blank frame
  (`DockCrossfade` floor). STRUCK: the opus "origin-anchored from the tapped cell's frame
  (codex law 5)" grammar—the corrected law 5 rules that in-app navigation is NOT a scaling card:
  push/pop is slide + ~1/3 parallax under a dim veil (~350ms) with secondary chrome staggered to
  after-settle (`sr-0620-1847 §4`). Dock-PAGE route transitions adopt that grammar over the
  crossfade floor. The scaling-card register belongs to app open/close zooms and to the
  dock-to-card growth—which is IOS27-MICRO's campaign, not this transition (§9).
- **F05 dock half (G-NO-LAYOUT-SHIFT):** kept—the dock is overlay chrome; collapse/expand and
  the seat glide reflow nothing (CLS = 0 for dock-own motion).

---

## 7. The lens + the posture choreography (laws 16/17 — the union's center)

### 7.1 The selection lens (law 16b/c — replaces "pill reuse as terminal")

The opus round scoped the selection surface as at-parity `--stretch` pill reuse and deferred the
"eyeglass lens" to an ASK framed against the Q051 `filter:url()` Safari risk. Under the
corrected canon that framing is dead: the lens is LAW (16b/c) with measured constants and a
web recipe that needs NO url-filter goo (`sr-0710-1626 P1` web recreation: duplicated row
scaled inside the lens; mask-edge distortion ≈ 2px backdrop blur + 1px inner-rim gradient;
backdrop-filter supplies tint sampling free). The union makes the lens the TERMINAL selection
layer; the `useSelectionIndicator` unification is its seed (one writer, rail ≡ strip, velocity-
continuous—RATIFIED as W4's first half).

**Tap lens (law 16b):** content swap ≤83ms—a hard cut under a fluid lens, never sequenced after
the morph. The lens travels one pitch in ~170ms as a stretched blob—transient scaleX bulge
~1.6-1.8x at peak, decaying over travel (never a width tween between endpoints)—tinting the
glyphs beneath it in transit; full settle ~250ms. Jumps ≥2 slots: the momentum tick
(SUFFUSION N3) is the candidate—its tick-vs-budget test is IOS27-MICRO's to run (§9).

**Drag lens (law 16c, all constants measured):** birth ≤83ms at the TOUCHED item, not the
selected one; one-highlight rule—the selection pill's identity transfers into the lens.
Brighter than the tray; **protrudes ~6-10px past the tray rim—LOAD-BEARING** (clipping the lens
to the bar kills the effect; the lens layer sits OUTSIDE the plate clip-path—an architectural
requirement on the dock's layer stack). Magnifies content ~1.06-1.12x; refracts at its rim;
samples the backdrop for tint—never painted a theme color. Velocity elongates it to ~1.9 slots—
width, not lag, is the velocity display (finger-locked, zero detectable lag). Endcap overpull
compresses it ~8-12% with content shifting inward against the drag (the bar stays rigid; the
lens is the soft body), relaxing on the first frame of reversal. **Selection COMMITS ON RELEASE
only**—the consumer's state never changes while the finger is down. Commit desync on release:
selection paint ≤85ms in place → secondary affordances ~200-250ms → any camera/heavy channel
conditional and last → data whenever-ready (law 16c commit order; never gate the swap on a
trailing channel).

**Lens-at-edge (declared divergence):** dragging the lens into the outer ~1-item zone advances
the strip beneath it at a penetration-keyed rate—the world scrolls under a quasi-fixed lens;
release commits, then seats per §4.4. No iOS evidence (no overflowing iOS dock); derived from
the adopted Safari model + drag-autoscroll idiom, taken deliberately.

**The two remaining matrix ladder rungs (SUFFUSION §1.1), disposed:**

- **Engage—the press-charge whole-bar wash: WITHHELD.** The matrix mandates "a glow wash crosses
  the whole bar before any travel" and attributes it to Find My as measured; the ratified
  timeline does not attest it—`sr-0710-1626 P1` records a single-frame (≤83ms) lens birth at
  the touched item, and the only bar-adjacent light is the lens's own glow bleeding past the
  rim (f12_078), no bar-crossing wash. The press acknowledgment this spec ships is the measured
  one: birth ≤83ms, brighter than the tray, one-highlight transfer. The wash-attribution check
  rides the R5 feed with the G-row correction (§9).
- **Idle—the ~8s specular sweep: ADOPTED.** The matrix's one licensed idle light (a slow
  specular sweep on a primary selection lens, at most one per view) lands on the dock lens at
  rest—W4 scope, PRM removes it, the velocity glint (§4.3) stays a separate channel.
  Safari-derived license taken deliberately, not an iOS copy claim (the 14.38.58 capsule shows
  no idle bloom—law 3's evidence stands).

### 7.2 The posture choreography (law 16a — FABLE-NEW; absent from the opus round)

The shipped collapsed/hover/pinned FSM survives; its MORPH gains the measured choreography:

- **Collapse** ~330ms with visible multi-body goo overlap—the collapsing bodies stay separate
  backdrop layers whose overlaps double-darken mid-morph (the attested mechanism is plain
  layered overlap, NOT `filter:url()` necking—the fission question does not gate this). Order:
  labels/inactive glyphs fade first ~80ms → bodies split/pour → widths collapse ~170ms → small
  overshoot on the compact body → settle.
- **Displacement-gated** when scroll-coupled: collapse fires on ~100-150px of scroll-down
  displacement, velocity-agnostic; the page header's own dissolve leads ~250ms BEFORE the
  collapse threshold (two thresholds, never one).
- **Intent-gated re-expand** ~250ms: only a sustained upward drag arriving at top re-expands;
  momentum rebound never does; any selection/tab change resets to full.
- **Law-17 continuity:** marquee offsets, badge counts, accent identity survive every posture
  morph; the collapsed summary keeps the active item's accent glyph (wayfinding survives the
  collapse); late data upgrades in place with no reflow; never gate the morph on data.
- Goo FENCE (law 6): within-body goo only—independent passing bodies (a dropdown crossing the
  dock) hard-overlap, no meniscus. Inter-body goo beyond that is the Q051-gated divergence.

---

## 8. Wave shape (updated; bbnf-lang tranche format; hard gates; FINAL.md)

W1/W2/W3/W6 keep their crosswalk-anchored meanings.

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 survives/replaces; born-RED gate scaffolds; inherit the 4-dead-knob cut | gate suite compiles + all RED | — |
| **W1** | CENSUS PRIMITIVE + EVIDENCE STACK | `useDockItemCensus` (cell rects → detent table) + cut-band detent grammar + peek + lip shadow + condensation (view-timelines); the pixel fade mask dies | G-EVIDENCE, G-MORE-SIGNAL | π-EVIDENCE |
| **W2** | DETENT ENGINE + NO-BLOCK-SCROLL | the law-14/15 strip physics (duration-stable seats, projected detents, asymmetric rubber band, per-detent damping) on the hybrid mechanism; dead block axis | G-DETENT-PHYSICS, G-NO-BLOCK-SCROLL | π-DETENT, π-NO-BLOCK |
| **W3** | TAP-TO-REACH + TOOLBAR KEYBOARD | instant-commit + concurrent seat; `role="toolbar"` + roving + `RouterLink`/`aria-current` + focus⟂occlusion; `toolbar` role-menu value | G-REACH, G-KEYBOARD-TOOLBAR, G-FOCUS-VISIBLE | π-REACH, π-KEYBOARD |
| **W4** | SELECTION LENS | seed: strip onto `useSelectionIndicator` (one writer, rail ≡ strip). Terminal: the law-16b/c lens—tap travel with bulge + transit tint; drag lens (birth/protrusion/magnification/elongation/endcap squash/commit-on-release); lens outside the plate clip | G-LENS-TAP, G-LENS-DRAG, G-SELECTION-ONE-WRITER | π-LENS |
| **W5** | SHAPE/RADIUS GRAMMAR | remove chevron chrome + decorative rings (§5); consume `--radius-dock`; BAND-MATERIAL owns values | G-RADIUS-GRAMMAR | π-SHAPE |
| **W6** | PAGE-TRANSITION + NO-SHIFT | dock-page route transition = slide + ~1/3 parallax + dim veil over the crossfade floor (corrected law 5); dock-motion CLS = 0 | G-PAGE-NOFLASH, G-NO-LAYOUT-SHIFT | π-PAGE, π-NO-SHIFT |
| **W7** | FISSION FORK (USER-GATED) | PARKED both ways per Q051 r1 (carried into BJ); honest-goo bounds if rebuilt; NOTE: §7.2's collapse goo is plain layered overlap and does NOT wait on this ruling | — (blocked on Q051-r1) | — |
| **W8** | POSTURE CHOREOGRAPHY + CONTINUITY | law-16a collapse/re-expand constants + gates; law-17 continuity asserts (marquee offset, accent glyph, badge survival) | G-POSTURE, G-CONTINUITY | π-POSTURE |
| **W9** | CONSUMER RE-POINT + FINAL | `BottomDock` adopts the strip+lens (drops chevrons); optional collapsed "+N" tray IF the ASK greenlights; overfitting audit; FINAL.md | G-CONSUMER, overfit-audit | π-BOTTOMDOCK |

---

## 9. The IOS27-MICRO live-sibling ledger (await, don't duplicate)

The liquid-dock micro-tranche runs the convergent loop against the same mechanisms. This design
names the hooks and DEFERS these decisions to its convergence—duplicating them here would fork
the canon:

| decision | owner | this spec's posture |
|---|---|---|
| native-scroll expressibility: detent catches / held-pins on Safari 2026, or the driven proxy | F2 NATIVE-SCROLL | §4.2's hybrid is the default; the proxy adopted only on F2's proof; the contract is mechanism-agnostic |
| the velocity/energy scalar roster (`--flex-vel`, `--overpull`, `--impulse`, `--engage-t`, `--scrub-t`) | F4 ENERGY-FIELD (+F1) | the edge glint, lens elongation input, and overpull read these when shipped; local dock-spring hooks until then |
| the lens body inside the compositor fence + the medium handshake | F5 OPTICAL-MEDIUM | §7.1's lens recipe stays clip-path/transform/backdrop-filter—no SVG filter on the hot path; F5 owns the general one-body law |
| dock-to-card growth mechanism (growth choreography vs FLIP re-home) | the §4 mechanism duel (SUFFUSION) | out of this spec entirely; the dock exposes its current-geometry anchor (law 5 origin rule) either way |
| the ~40px pre-commit taffy zone + asymmetric volume compression | the campaign's hallmark set | not specced here; the strip's rubber band (§4.2) is the only overpull this spec owns |
| momentum tick on ≥2-slot lens jumps | N3 tick-vs-budget test | candidate named in §7.1; adopted only if the test passes |
| choreography channel API (named channels, fixed lead order) | F3 CONDUCTOR | §4.4/§7 name their channels; the API home is F3's |
| law-14 physics presets vs `springPreset("dock")` reconciliation | F4/F1 + BAND registers | the constants are law regardless of preset naming; `DOCK_SPRING` 0.30/ζ0.82 stays the posture-morph clock; the strip's SNAP/RUBBER/RELEASE registers land with the facility |
| **the matrix G-row lens contract (travel/arrival)—RECONCILIATION, not a deferral** | SETTLED HERE—law 16b/c senior; correction routed out on R5 | the fork is named: SUFFUSION §1.4-G specs travel that "stretches to span source and target (~2.5 slots)" and an arrival that "lands oversized 110-120%, holds ~200ms"; the measured record is one-pitch travel ~170ms as a decaying ~1.6-1.8x bulge—never a width tween between endpoints—and a squash-settle ~150-250ms with no visible bounce (`sr-0710-1626:48`), full settle ~250ms (law 16b). The matrix row reads as the pre-RU-15 "sliding pill" model falsified at RU-15 W18; the law-16 constants are SENIOR, and the G-row travel/arrival correction routes to IOS27-MICRO via the R5 reciprocal feed (`REFABLE-RU-05.md` R5). The ladder's engage wash and idle sweep are disposed in §7.1—withheld and adopted respectively, one line each |

The last row is the inverse of a deferral: where the matrix itself forked from the measured
canon, this spec declares the law-16 constants senior and routes the correction out rather than
holding two live contracts for the campaign's headline object—the divergence is now named on
this end, and R5 names it on the other.

---

## 10. Born-RED gate sketches (each states its RED-at-HEAD condition)

- **G-NO-BLOCK-SCROLL** — horizontal dock: `scrollHeight === clientHeight` at every viewport;
  cross-axis arrows no-op. *RED:* `useDockOverflowFit.ts:38-40` + the F27 leak.
- **G-DETENT-PHYSICS** — after any inline settle the offset equals a detent from the census
  table; programmatic seats are duration-stable (settle time invariant across entry velocities,
  ±10%); flick landings match the velocity-projection rule; end overpull never crosses rest on
  release. *RED:* free `overflow-x:auto` rests anywhere; no detent table exists.
- **G-EVIDENCE** — at any rest offset with hidden content: a cut-band partial is visible on that
  edge, condensed (whole glyph, scaled), under a lip-shadow overhang; NO fade-to-transparent
  erasure; no cue on sides with nothing hidden. *RED:* the item-blind pixel mask
  (`overflow.css:91-105`) clips mid-word and erases the edge item (F47a).
- **G-MORE-SIGNAL** — overflow present ⇒ the lip + peek are honest and subtle; absent ⇒ nothing.
  *RED:* full-strength fixed fade.
- **G-REACH** — tap OR focus on a <95%-visible item: the consumer commit fires ≤1 frame from
  activation (never gated on travel) AND the item seats fully in port, detent-aligned. *RED:*
  `BottomDock` routes through `goTo()` with no recenter (F47b); recenter-on-select only exists
  in `useSelectionGroup` rails.
- **G-KEYBOARD-TOOLBAR** — toolbar role, one tab stop, roving arrows (no wrap), Home/End,
  `aria-current` not `aria-selected`. *RED:* strip = individually-tabbable RouterLinks; rail =
  tablist; two divergent models.
- **G-FOCUS-VISIBLE** — no focused item rests occluded; focusin-seat precedes focus paint. *RED:*
  no focus⟂occlusion coupling exists.
- **G-LENS-TAP** — on tab activation the content swap lands ≤83ms (one frame at 12fps
  granularity) BEFORE lens settle; the lens travel shows a decaying scaleX bulge, not a width
  tween; transit glyphs tint under it. *RED:* class-snap selection, no lens travel on the strip.
- **G-LENS-DRAG** — pointer-down births the lens at the touched item ≤100ms with the old
  highlight gone the same frame; the lens paints OUTSIDE the plate clip (protrusion measurable
  6-10px); width grows with drag velocity (clamped ~1.9 slots); endcap hold compresses ~8-12%
  with inward content shift; NO selection change before release; release commits ≤85ms. *RED:*
  no drag lens exists.
- **G-SELECTION-ONE-WRITER** — one `useSelectionIndicator` writer serves rail AND strip. *RED:*
  strip uses `.is-active`.
- **G-RADIUS-GRAMMAR** — no decorative ring circles, no chevron chrome; shell wears
  `--radius-dock`. *RED:* `BottomDock.vue:161-252` + F04 rings.
- **G-PAGE-NOFLASH** — no blank frame; crossfade floor ≥ ε; the route grammar is slide+parallax
  (incoming full-speed, outgoing ~1/3 under dim), secondary chrome after settle. *RED:* F06.
- **G-NO-LAYOUT-SHIFT** — dock-own motion CLS = 0. *RED:* F05 dock half.
- **G-POSTURE** — collapse ~330ms on ~100-150px displacement (velocity-agnostic); rebound never
  re-expands; selection change resets to full; bodies overlap as separate backdrop layers
  mid-morph (double-darkening observable). *RED:* the shipped morph has none of the gates.
- **G-CONTINUITY** — a marquee/badge/accent survives collapse↔expand with state intact; the
  collapsed summary carries the active accent glyph. *RED:* unasserted today.
- **G-CONSUMER** — every primitive ≥2 sites OR exported OR named private helper; consumer #1 =
  `BottomDock`.

---

## 11. π obligations (ALL OWED; live-π per band; LIVE-DEFER stands; paint-arm parses oklab)

- **π-EVIDENCE** — strip at start/mid/end detents: cut-band partial + condensation + lip on
  overflowing sides; nothing on flush sides. Baseline = the mid-word clip + erasing fade.
- **π-DETENT** — three flicks at different velocities: identical settle envelopes (duration-
  stable); a fast flick skipping detents; an end overpull compression/release asymmetry capture.
- **π-NO-BLOCK** — `scrollHeight===clientHeight` at 320px + desktop.
- **π-REACH** — tap and arrow onto a half-hidden item: commit timestamp ≤1 frame; seat lands
  detent-aligned. Baseline = stays occluded.
- **π-KEYBOARD** — single stop, roving, no-wrap, Home/End, no focused-occluded state.
- **π-LENS** — tap: swap-before-settle + bulge frames + transit tint. Drag: birth frame,
  protrusion measurement, velocity-width correlation, endcap squash, commit-on-release (sheet
  unchanged mid-scrub). Baseline = class snap.
- **π-PAGE / π-NO-SHIFT** — route transition slide+parallax, no blank frame; CLS = 0.
- **π-POSTURE** — collapse/re-expand captures: displacement gate, rebound immunity, reset,
  mid-morph double-darken overlap; marquee offset continuity across the morph.
- **π-SHAPE / π-BOTTOMDOCK** — re-pointed consumer, no chevrons/rings.

Browser-seat singleton: serialize the seat; static evidence only this seat.

---

## 12. Banked-route dispositions + convergence + ASKs

- **α (free scroll):** RETIRED as default; survives only as the PRM/unsupported-API degradation
  path, honestly non-canon.
- **β (liquid tray + occlusion):** ADOPTED as the affordance layer, with the fade mask replaced
  by the evidence stack (§4.3).
- **γ (cluster fold):** the "+N" tray stays OPTIONAL, collapsed-posture only (§12.3 ASK).
- **Fission fork:** USER-GATED (Q051 r1, carried into BJ). NOTE the narrowing (§7.2): the
  attested collapse goo is plain layered overlap—only beyond-iOS inter-body goo waits on the
  ruling.

**Convergence: 58%** (the opus round claimed 62%). The union pays the canon debt—the mechanism
is law-true (14/15), the selection layer is law-backed (16b/c) with an implementable no-url-
filter recipe, the posture machine and continuity laws are in the design, and the evidence
stack replaces the self-confessed "arbitrary but faded" geometry. It scores BELOW the opus
round's claim because that claim was inflated by a mechanism the canon falsifies: the
commitment surface here is larger (lens, posture choreography, physics engine), every π is
OWED, Safari paint is unverified, and eight named decisions deliberately AWAIT the IOS27-MICRO
convergence (§9)—an honest dependency, not a gap this spec may close alone.

**Open questions → BJ ASK:**
1. **Keyboard truth-up** (kept, fires on nav-links ratification): family J corrects the
   "SegmentedTabs wearing chrome" comment.
2. **The lens register scope** (RE-GROUNDED—no longer a filter:url() risk call): the law-16c
   drag lens is design-mandated here with measured constants; the ASK is narrowed to its
   ROLLOUT surface—strip-only first, or strip+rail in one wave—and whether the SVG-displacement
   "full refraction" variant (beyond the cheap mask-edge approximation) is wanted anywhere.
3. **Collapsed-state overflow affordance:** the optional "+N" detent tray vs expand-then-detent
   (canon sanctions cluster chips; parsimony holds it optional).
4. **Fission fork** (Q051 r1): ratify-or-rebuild reserved to the user; narrowed by §7.2's
   overlap finding.

Remaining OWED (non-ASK): all §11 π; the census double-observe cost (may fold into
`useDockOverflowFit`); PRM instant-seat paint; the `keepOpen()`-through-glide integrity detail;
the F2/F4/F5/N3 sibling convergence (§9).
