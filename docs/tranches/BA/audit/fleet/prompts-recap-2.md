# BA fleet — LANE prompts-recap-2: the R6 · R7 · R5-SLIDES · R8 · standing-directives recapitulation

The recapitulation, part 2 (the sibling of `prompts-recap-1.md`, which covered R1–R5).
This lane verdicts: **R6** (the rail design redirect), **R7** (the curve gallery),
**R5-SLIDES** (the 10-entry consumer bank, including the unlanded R5-9/R5-10), **R8**
(the post-AZ-close audit — the BA seed itself), and the **standing directives** carried
across sessions (the full-suite /motion ask, the keyframes design-language port, the
liquid-glass facilities, the "all components glassy" canon, the demo-as-product bar).

Same row format + verdict legend as part 1. Sources read in full: `USER-AUDIT-2026-06-11-R6.md`,
`USER-AUDIT-2026-06-11-R7.md`, `USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md`,
`USER-AUDIT-2026-06-11-R8.md` (this tranche's seed), the AZ `FINAL.md` board, and the
sibling BA fleet reports (`dock-rail-seat.md`, `curve-picker-*`, `dark-register.md`,
`glass-variant-census.md`, `disco-hover.md`, `glass-blur-cal.md`, the part-1 recap).
Live-probed on :5199 (dark mode) at `/motion/curve-gallery` — strokes/families/picker
read directly (evidence `recap2-curve-gallery-dark.png` beside this report). The R6 rail
geometry I CITE from the `dock-rail-seat` lane's banked `getBoundingClientRect` measure
(no need to re-measure the same surface).

## Verdict legend (identical to part 1)

- **ADDRESSED** — discharged by a named wave AND the live surface (or the source) holds at HEAD.
- **PARTIAL** — discharged in part; a named follow-on or a residual gap remains live.
- **REGRESSED** — a wave marked it `live-verified`/`complete`, but the live surface at master
  HEAD (3.13.0) now shows the defect again. The breaking wave is named.
- **UNADDRESSED** — no wave owns it, or it is a named-successor deferral never executed.

---

## R6 — USER-AUDIT-2026-06-11-R6 (the rail design REDIRECT, the THIRD rail failure)

R6 was a single-defect BINDING redirect on the rail — explicitly escalated to the
TRIUMVIRATE (research → ad-hoc wave → redress) because it was the THIRD rail failure
(W-RAIL-EXTEND → R4-RAIL → R6). The discharging wave is **AZ.W-RAIL3** (marked
`live-verified` on the FINAL board: "the facets OUT of the dock onto the visible-hairline
chip carousel, box INVIOLATE — π deltaW=deltaH=0; `proof:rail3` R1–R6 + π 5/5; the
`entries` prop clean-broken onto `items`").

| R6 | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| R6-§1 | the dock box is INVIOLATE — nothing the rail adds may change dock w/h; the dock returns to its tight pill | AZ.W-RAIL3 | the box-inviolate HALF held: the `dock-rail-seat` lane measured `deltaW=deltaH=0` — the rail slot is `position:absolute` outside the morph aperture and adds zero size to the dock box | ADDRESSED (the box-size half ONLY) |
| R6-§2 | the contextual facets move ONTO the rail as a floating, carousel-like strip overflowing OUTSIDE the dock edge | AZ.W-RAIL3 | the facets DID move out of the dock onto a detached chip strip (`<DockRail>` `items`) — the carousel exists | ADDRESSED (the facets-out half) |
| R6-§3 | the hairline must be VISIBLE, reading as the connective axis between the dock edge and the floating strip + end-icon | AZ.W-RAIL3 | **REGRESSED at HEAD.** The shell strip floats in a separate gutter joined to the dock by a thin **40px connector** — NOT seated at the dock's own divider seam. On the sidebar the rail seats at the dock's vertical MIDLINE (y≈290–352), **272px below the ℱ separator** (y=78); zero relationship to either divider seam. R8-1 re-reads this exact defect ("totally mis-aligned — should be at the ℱ divider seam; should overrun BOTH sides"). | REGRESSED |
| R6-§4 | the clipped rotated label dies; the orphan indicator dies | AZ.W-RAIL3 | the R6-1/R6-2 rotated "Eng…" clipped label + the orphan mid-dock indicator are GONE at HEAD (the dock-rail-seat measure shows a clean 2-chip strip, no rotated text) | ADDRESSED |

**R6 net verdict: PARTIAL → trending REGRESSED.** The box-inviolate + facets-out +
dead-label halves landed; the load-bearing **seat geometry** (R6-§3 — anchor at the
divider seam, overrun BOTH sides, visible connective hairline) did NOT survive to the
shell. This is the same surface R8-1 re-opens, so the R6 redirect's CENTRAL ask is the
**FOURTH** rail failure (W-RAIL-EXTEND → R4-RAIL → W-RAIL3/R6 → R8-1). Evidence:
`dock-rail-seat.md` + `dock-rail-seat-live-dark-full.png`. (This maps to part-1's REG-2.)

---

## R7 — USER-AUDIT-2026-06-11-R7 (the curve gallery)

R7 was the curve-gallery redirect — also escalated to the TRIUMVIRATE (the motion surface
FAILs reflection by construction). The discharging wave is **AZ.W-MOTION2** (`live-verified`:
"3px non-scaling strokes, the dead-tint BUG killed, the underline picker, the 1:1 keyframes
canon — 12 families; `proof:motion2` 14/14 + π 11/11 + `proof:motion-demo` 17/17").
**Live-probed directly** this lane (`/motion/curve-gallery`, dark).

| R7 | ask (condensed) | discharging wave | LIVE state (probed) | verdict |
|---|---|---|---|---|
| R7-1 | THE REGISTER: grey-muted cards on a grey page; plots have no presence; the motion-purple accent barely registers | AZ.W-MOTION2 + W-SUFFUSE (`--motion-accent: --viz-legendre`) | the page is no longer flat grey-on-grey; the curve-canon explanatory header + glass cards read; the motion-purple accent is present on the plots. STILL dark-register-flat in absolute terms (couples to the cross-cutting dark weakness) but the "washed/no-presence" read is relieved | ADDRESSED |
| R7-2 | THE STROKE: ~1.5px hairlines; the curves ARE the content and must read THICK | AZ.W-MOTION2 | **probed: every plot path resolves `stroke-width: 2px`** (up from ~1.5px). The FINAL board claims "3px non-scaling"; the live resolved value is 2px CSS — thicker than the hairline, the user's "thick enough" bar substantially met (a 2px-vs-3px residual a follow-on could re-tune, not a defect) | ADDRESSED |
| R7-3 | THE PICKER: the 10-family selector is a cramped row of tiny chips — "awful"; needs the house register at scale | AZ.W-MOTION2 (the unified `<SegmentedTabs variant="underline">` picker) | **probed: the picker is now the underline-strip with 12 families** (Standard/Sine/Quad/Cubic/Expo/Circ/Back/Bounce/Steps/Linear()/Springs/Custom) + 4 group tabs (Engines/Text FX/Entrance/Custom) — at the house register, not tiny chips. BUT **R8-16 RE-READS this exact strip as "awful… a flat grey band on dark"** and wants it re-conceived as a richer scrolling control (a dock-like strip). The cramped-chips defect is fixed; the dark-register flatness of the strip is the new escalation | PARTIAL |
| R7-4 | THE ISOMORPHISM: not comprehensive/isomorphic to keyframes.js's easing inventory; carry it 1:1, grouped+plotted as keyframes presents them | AZ.W-MOTION2 + the R7-MOTION2-RESEARCH census | **verified against source:** the curve-gallery.vue header documents the canon as "1:1 with the keyframes easing inventory" and enumerates the exact families keyframes groups (the value.js analytic ease* families + Back/Bounce/Steps + CSS linear() + iOS spring presets), each plotted from its REAL JS twin. The 12-family enumeration matches the keyframes grouping | ADDRESSED |

**R7 net verdict: ADDRESSED (PARTIAL on the picker only).** All four literal R7 asks
landed — the stroke thickened, the dead-tint killed, the picker promoted to the house
register, the keyframes canon carried 1:1. The single residual is R8-16's NEW read of the
underline strip as dark-register-flat ("awful scrolling item") — an escalation/re-conceive,
not a regression of R7's own discharge. Evidence: `recap2-curve-gallery-dark.png` +
`curve-picker-dark-full.png`.

---

## R5-SLIDES — USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER (the 10-entry consumer bank)

The slides-consumer ROOT-fix bank (R5-1..R5-10). Part 1 already verdicted the seven core
rows in its R5 section; this lane RE-STATES them for completeness AND carries the binding
focus on **R5-9 + R5-10**, the two named-successor deferrals the lane brief flags as unlanded.
Each had a slides interim arm that retires on the 3.13.0 bump (tasks #161–163, all retired).

| R5 | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| R5-1 | `--dock-mobile-scale` DEAD (substitution-trap; re-confirmed in 3.11.2) | AZ.R5-TOKENS | `--dock-scale` re-declared INSIDE the coarse block; `proof:ui-scale` `dock-coarse-redeclares-scale` witness; slides arm retired (#161) | ADDRESSED |
| R5-2 | coarse dock default too BIG (~20–25% on mobile) | AZ.R5-TOKENS | `--dock-coarse-scale: 0.78` dense register; 44px floor held; slides arm retired (#161) | ADDRESSED |
| R5-3 | collapsed-tap pass-through + hover-expand MORPH-RACE (touch + fine-pointer) | AZ.R5-TAP (useDockClickIntegrity) | identity-scoped pass-through + morph-settle window; live replay clean; slides arm retired (#162) | ADDRESSED |
| R5-4 | popover/dropdown content padding too tight at root | AZ.R5-VEIL band / panel-padding rung | the roomier `--panel-padding` rung landed at root; folds A11 (slides) | ADDRESSED (was PARTIAL in part 1; the rung is at root) |
| R5-5 | Vue scoped `:global()` DROP trap (recurred 3×) | AZ precept + the memory note | codified in precepts (plain-ancestor idiom); demo/consumer sweep | ADDRESSED |
| R5-6 | constellation generalization (6-item list) | AZ.W-CON-GEN | 5/6 additive default-OFF; `proof:constellation-gen`; **G4 SPEC'D-NOT-BUILT (the 6th, honest book)** | PARTIAL |
| R5-7 | VEIL plate as a first-class Card variant | AZ.R5-VEIL | veil Card surface on the W55 tint axis; 3 slides sites = ≥2-consumer bar; couples to R8-12 census (the veil variant the census wants exists) | ADDRESSED |
| R5-8 | constellation mobile legibility (kVis floor) | AZ.R5-8 (two-axis SIZES/positions split) | `kVis = max(k, kFloor)`; byte-identical ≥922px; slides arm retired (#163) | ADDRESSED |
| R5-9 | the deck PAGE-TURN primitive lift WHOLESALE as a glass-ui primitive | named-successor (AZ FINAL §6) | **UNADDRESSED.** The `[data-state]{active|prev|next}` contract + the `--turn-*` token surface (travel/dur/fade/lift/perspective/dip-scale/gutter-hue/strength[-dk]/width/scrim) + the suppression contract were booked "lift WHOLESALE on wave cadence" — NOT built. The full spec rides slides `deck.css` + the M tranche W-R13 record; complementary to `useViewTransition` (the pure-CSS stacked-slide path captures can fully suppress). No `/deck` page-turn primitive at HEAD | UNADDRESSED |
| R5-10 | glass MENU-ROW + PANEL-SECTION recipes (3 sub-parts) | named-successor (AZ FINAL §6) | **UNADDRESSED.** None of the three landed: (1) a `.glass-menu-row` CVA `DropdownMenuItem`/`ContextMenuItem` can opt into (full-width `.glass-quiet` hover-lift plate, 44px floor, leading-glyph/label/trailing-glyph, translateY lift, data-highlighted parity, PRM-gated); (2) the `.glass-menu-section` recipe (mono caption + hairline + row group); (3) the roomier panel rung (= R5-4, which DID land, so part of R5-10 is covered by R5-4). Slides' `DeckSettings.vue` is the reference impl + first consumer. **This is the seed of R8-12's "all components glassy" census + R8's dropdown/popover glass-variant ask** | UNADDRESSED |

**R5-SLIDES net verdict:** 8/10 ADDRESSED (R5-4 promoted to ADDRESSED vs part-1's
PARTIAL — the rung is at root), R5-6 PARTIAL (the 6th item G4 spec'd-not-built), **R5-9 +
R5-10 UNADDRESSED** (the two named-successor deferrals — both are now BA seeds: R5-9 →
the deck-page-turn primitive, R5-10 → the glass-menu-row/section recipes which feed the
R8-12 all-components-glassy census directly).

---

## R8 — USER-AUDIT-2026-06-11-R8 (the BA seed itself)

R8 is the post-AZ-close audit (3.13.0) — the document THIS tranche is built from. By
construction it is the set of asks the BA tranche must DISCHARGE, so the recap entry is a
LINK + a roll-up of which R8 reads are NEW vs RE-READS of a prior round. The 19 grounded
clusters + 7 standing directives route to the 32-lane fleet; the synthesis forms the BA
wave specs. The full per-cluster live root-cause lives across the sibling fleet reports
(`dock-rail-seat`, `goo-studio`, `darkmode-toggle`, `configurator-occlusion`,
`progress-sectioned`, `toast-glass`, `glass-variant-census`, `fading-scroll`,
`page-backgrounds`, `dark-register`, `disco-hover`, `glass-blur-cal`, `fourier-demos`,
`padding-rhythm`, `preset-preview-dim`, `demo-affordances`). Verdict per R8 cluster
against its prior-round lineage:

| R8 | cluster | prior-round lineage | verdict (at HEAD, pre-BA) |
|---|---|---|---|
| R8-1 | dock rail mis-seated; anchor at divider seam; overrun BOTH sides | R6-§3 / R4-1 / B6 / B9 | **REGRESSED** (the 4th rail failure; part-1 REG-2) |
| R8-2 | demo V↔H morph + layering/contextual on the SHELL docks in-situ | R3-13 / R3-14 / B5 | **PARTIAL** (morph exists on the showcase story only; not in-situ on shell) |
| R8-3 | gear dark-mode toggle broken + wrong control (Switch, not DarkModeToggle) | R3-4 / R4-3 | **REGRESSED** (part-1 REG-3) |
| R8-4 | configurator occlusion + missing dividers (aurora/blob/all) | R3-8 / B21 | **PARTIAL/REGRESSED** (the chip-row clips + seed-slab + no dividers re-read) |
| R8-5 | aurora speedtest preset preview DIM | B19 (was black-bar; now DIM, a new read) | **PARTIAL** (new manifestation of the preview-pane defect) |
| R8-6 | dock round buttons clipped; rail fan-out flush contract | R6-§2 + a NEW `contain:paint` clip | **PARTIAL** (mechanical clip = `.glass-dock` `contain:paint`; the fan-out half couples to R8-1) |
| R8-7 | goo studio broken — labels-no-controls, detached satellite, jittery hover | R3-10 / B7 / B10 | **REGRESSED** (S1 — sliders width:0/opacity:0; part-1 REG-1) |
| R8-8 | preset strip → a library FADING-SCROLL component (h+v); edge-fade scroll-state-driven | NEW (idiom-abstraction ask) | **UNADDRESSED** (no fading-scroll primitive; current fade is rest-state-buggy) |
| R8-9 | docks COMPLETELY lack sections (rail core + sections + nav); reusable layer-menu abstraction | R3-5 / B1 / B5 | **REGRESSED/PARTIAL** (the section model gone again on the bottom dock) |
| R8-10 | bottom padding crowding + fourier field demos sparse vs reference | B12 / NEW padding ask | **PARTIAL** (padding crowding cross-cutting; fourier-field configurator/options gap) |
| R8-11 | glass-material near-black bg kills the read; card/variant/veil demos owe aurora stagings | B13 | **REGRESSED** (part-1 REG-4; the dark-register weakness) |
| R8-12 | toasts not glassy; BINDING census — every floating/feedback surface × {glass,veil,…} variant | B14 / R5-10 (menu recipes) | **PARTIAL** (the census is the open gap; veil exists, the per-component coverage does not) |
| R8-13 | flat demo affordances ("button so large and uninteresting"; "not glassy at all") | NEW | **UNADDRESSED** (demo-as-product affordance gap) |
| R8-14 | sectioned Progress broken — hard cells + dead notch; wants continuous blended gradient | NEW | **UNADDRESSED** (a fresh defect on the gradient-progress variant) |
| R8-15 | EVERY core page needs an interesting procedural background; no blank black/white | B22 (intro only) / NEW (all pages) | **UNADDRESSED** (the page-background ask generalizes beyond intro) |
| R8-16 | curve-gallery picker on dark "awful"; re-conceive as a richer scrolling control | R7-3 (escalation) | **PARTIAL** (the cramped-chips defect fixed by W-MOTION2; the dark-flat strip re-conceive is new) |
| R8-17 | the plot play button illegible — amorphous blob + clipped triangle + colliding text | NEW | **UNADDRESSED** (a fresh control-legibility defect) |
| R8-18 | remove the disco effect everywhere (`btn-audacious` family); smooth the hover | NEW (a REVERSAL of K W6's audacious register) | **UNADDRESSED** (the disco-grain/sparkle still ships; a global retire) |
| R8-19 | glass blur a hair too much everywhere — dial back, one knob-family edit | NEW | **UNADDRESSED** (a global `--glass-blur-*` calibration pass) |

**R8 net verdict: the BA SEED — by construction UNDISCHARGED (the tranche to come).**
The link is `USER-AUDIT-2026-06-11-R8.md`. Of the 19 clusters: **4 REGRESSED** (R8-1/3/7/11
= part-1's REG-1..REG-4), **7 PARTIAL** (R8-2/4/5/6/9/10/12/16 — the prior-round re-reads),
**8 NEW UNADDRESSED** (R8-8 fading-scroll, R8-13 flat-affordances, R8-14 progress-gradient,
R8-15 all-page-backgrounds, R8-17 play-button, R8-18 disco-retire, R8-19 blur-calibration —
plus R8-8's idiom-abstraction). NOTE the cross-cutting DARK-REGISTER cluster (R8-11/12/13/15/19)
the seed flags: the demo's dark register reads flat/near-black/glass-invisible relative to
light — a single design weakness behind five reads.

---

## The standing directives (verbatim-binding, carried across sessions)

The R8 seed names SEVEN standing directives (its §"The standing directives"). PLUS the lane
brief names FIVE cross-session standing asks ("the full-suite /motion ask, the keyframes
design-language port, the liquid-glass facilities, the all-components-glassy canon, the
demo-as-product bar"). Both sets verdicted.

### R8's seven process directives

| # | directive (verbatim-condensed) | LIVE state | verdict |
|---|---|---|---|
| SD-1 | the 32-agent deep audit ("DEEPLY audit with 32 agents our original plan + all changes") | the BA 32-lane fleet IS this audit (this lane is one of the 32); the AY/AZ rounds each ran the fanout | ADDRESSED (process — in flight as the BA fleet) |
| SD-2 | the path forward — NO quick solutions/workarounds/legacy; idiomatic gestalt; architectural transpositions | enforced by the tranche-discipline + the proof-gate battery; every BA finding states a gestalt remedy DIRECTION not a patch | ADDRESSED (process invariant) |
| SD-3 | delineate chronically-deferred items + fold into the new tranche | the part-1 UNADDRESSED roll-up (R5-9/R5-10, W-LIGHTHOUSE, W-AUR-T5, W-MOTION3, R5-6 G4, W-DELTA0) is the deferred census; THIS lane re-confirms R5-9/R5-10 unlanded | ADDRESSED (the census exists; BA folds them) |
| SD-4 | the prompts recap — recap ALL prompts/requests and ensure addressed | THIS lane + `prompts-recap-1` ARE the full recap (R1–R8 + R5-SLIDES + directives) | ADDRESSED (this deliverable) |
| SD-5 | the phase fence — NOT an implementation phase; tranche development only | the BA fleet is AUDIT-ONLY; no source edits; the synthesis forms wave specs | ADDRESSED (discipline) |
| SD-6 | the model discipline — core model for orchestration/design/synthesis; Opus/Sonnet for fanout | the fleet spawns opus subagents (this lane is opus); aligns with the memory `feedback_opus_for_subagents` note | ADDRESSED (process) |
| SD-7 | the frontend-design audit — structure/suffuse hierarchy; visual incongruences; glass/grid/math/audacious-type/color-pops; idiom smoothen/abstract; gaps | the FD pane sweeps + suffusion analyses are dedicated BA lanes; R8-4/9/10/13/16 are the grounded instances | ADDRESSED (process — the FD lanes carry it) |

### The five cross-session product standing asks (the lane-brief set)

| id | standing ask | discharging arc | LIVE state | verdict |
|---|---|---|---|---|
| ST-MOTION | the FULL-SUITE /motion ask — the complete keyframes motion taxonomy demoed | AZ.W-MOTION-SUITE + W-MOTION2 | the full curve canon + spring presets + scroll/VT demos landed; `proof:motion-demo` 17/17. RESIDUAL: R8-16 (picker on dark) + R8-17 (play button) + R5-9 (page-turn) are the open motion-surface refinements; W-MOTION3 (live steppedEase generator) named-successor unbuilt | PARTIAL |
| ST-KFPORT | the keyframes DESIGN-LANGUAGE port — carry keyframes.js's easing inventory + presentation idiom 1:1 into the glass idiom | AZ.W-MOTION2 (R7-4) | the 12-family canon is carried 1:1, each plotted from its REAL JS twin (verified against `~/Programming/keyframes.js/src/animation`); re-expressed tailwind-first. The INVENTORY port is done; the PRESENTATION idiom (the strip register on dark) is R8-16's residual | ADDRESSED (inventory) / PARTIAL (presentation) |
| ST-LIQUID | the liquid-glass FACILITIES — robust V↔H morph, metaball/goo, the squish/flex primitive | AY.W-LIQUID → AZ.W-MORPH-SHOWCASE (useLiquidFlex born, ≥2 consumers) + W-DOCK-FLICKER | the V↔H morph + `useLiquidFlex` + the SVG-goo bridge shipped on the showcase story. RESIDUAL: R8-2 wants the morph + layering ON THE SHELL docks in-situ (not just the story); the metaball-teardrop is a perf-gated preview (booked to a successor) | PARTIAL |
| ST-GLASSY | the "all components glassy" canon — every component glass-by-default + consistent {glass,veil,…} variants | AX.W54 (glass-first MAXIMAL default) + R5-7 (veil) | the glass-first ROOT default + `--glass-level` knob + the veil Card variant shipped; `proof:glass-cohesion` walks the inventory. RESIDUAL: **R8-12 is the BINDING census** (every floating/feedback surface × variant coverage) — toasts/notifications/some dropdowns still read opaque (R8-12/13); R5-10's glass-menu-row recipes unbuilt. The CANON is set; the per-component COVERAGE is the open gap | PARTIAL |
| ST-PRODUCT | the demo-as-product bar — the storybook is a PRODUCT, every surface honed | AY.W-CONVERGE + AZ.W-SUFFUSE + the StoryHero/StorySection chassis | the suffusion map + display heroes + hierarchy vocabulary landed (`proof:suffuse`, `proof:hierarchy`). RESIDUAL: R8-13 (flat affordances), R8-15 (blank page backgrounds), R8-11 (dark-register kills the glass read), R8-10 (padding crowding) — the dark register + the per-page polish are the open gaps to the product bar | PARTIAL |

**Standing-directives net verdict:** the SEVEN process directives (SD-1..SD-7) are
ADDRESSED as PROCESS (the BA fleet + the audit-only discipline + the deferred census + the
model fanout). The FIVE product standing asks are each **PARTIAL** — every one has a landed
CANON/INVENTORY arm and an open REFINEMENT/COVERAGE residual that R8 re-reads: the motion
suite (picker/play-button/page-turn), the keyframes port (presentation on dark), the liquid
facilities (in-situ on shell), the glassy canon (the per-component census), and the
demo-as-product bar (the dark register + per-page polish).

---

## The part-2 roll-up

### REGRESSED (R6/R8 — supplements part-1's REG-1..REG-4)

| id | item | breaking wave | severity | maps to |
|---|---|---|---|---|
| R6-§3 / R8-1 | shell rail not seated at divider seam; no visible connective hairline; no both-sides overrun | AZ.W-RAIL3 (the 4th rail failure) | S1 | part-1 REG-2 |
| R8-3 | gear dark-mode toggle broken + wrong control | AZ.W-SHELL-CONFIG / R4-SHELL | S2 | part-1 REG-3 |
| R8-7 | goo studio sliders width:0/opacity:0 | AZ.W-METRIC-UNIFY + W-BLOB-STUDIO | S1 | part-1 REG-1 |
| R8-11 | glass-material near-black plate kills the glass read | AY.W-SB-STAGE | S2 | part-1 REG-4 |

### UNADDRESSED (the part-2 additions to the deferred census)

| id | item | disposition |
|---|---|---|
| R5-9 | deck PAGE-TURN primitive lift (`[data-state]` + `--turn-*` tokens + suppression) | named-successor (AZ FINAL §6); UNADDRESSED — a BA seed |
| R5-10 | glass MENU-ROW (CVA) + MENU-SECTION recipes (2 of 3 parts; R5-4 covers part 3) | named-successor (AZ FINAL §6); UNADDRESSED — feeds R8-12 census |
| R5-6 G4 | the 6th constellation generalization item | SPEC'D-NOT-BUILT (honest book) |
| R8-8 | library FADING-SCROLL component (h+v, scroll-state-driven edge-fade) | NEW idiom-abstraction; UNADDRESSED |
| R8-13 | flat demo affordances (oversized flat pills, non-glassy notifications) | NEW; UNADDRESSED |
| R8-14 | sectioned Progress → continuous blended gradient with distinct segments | NEW defect; UNADDRESSED |
| R8-15 | EVERY core page needs a procedural background (fourier/aurora/constellation/grid) | NEW (generalizes B22); UNADDRESSED |
| R8-17 | the plot play button illegible — re-design as a proper control | NEW; UNADDRESSED |
| R8-18 | retire the disco effect (`btn-audacious` family) globally; smooth the hover | NEW (reverses K W6); UNADDRESSED |
| R8-19 | global `--glass-blur-*` calibration (a hair too much everywhere) | NEW; UNADDRESSED |

### Coverage note

Every R6/R7/R5-SLIDES/R8 ask + the twelve standing directives traces to a named wave (or
an explicit named-successor/NEW disposition) with a live verdict. R6 and R7 were both
TRIUMVIRATE escalations — R7 (W-MOTION2) landed cleanly (ADDRESSED, picker-residual to
R8-16); R6 (W-RAIL3) landed the box-inviolate + facets-out halves but the SEAT geometry
REGRESSED (the 4th rail failure, the binding R8-1/REG-2 seed). R5-9 + R5-10 are the two
unlanded named-successors the lane brief flags — both BA seeds. R8 is the seed document
itself: 4 regressions, 8 partials, 8 NEW unaddressed, with the cross-cutting dark-register
weakness (R8-11/12/13/15/19) as the single largest design gap behind five reads.
