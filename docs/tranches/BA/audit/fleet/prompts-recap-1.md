# BA fleet — LANE prompts-recap-1: the R1–R5 recapitulation

The recapitulation, part 1 (rounds R1–R5). Every user ask × the discharging wave × the
current LIVE state (contested ones spot-probed on :5199, both modes) × verdict
{ADDRESSED · PARTIAL · REGRESSED · UNADDRESSED}. Sources read in full: the AY
`PROMPT-CORPUS.md`, `USER-DECISIONS-2026-06-09.md`, `USER-AUDIT-2026-06-10.md`
(the first dated live audit — items A/B/C); the AZ `USER-AUDIT-2026-06-10-R3.md`,
`USER-AUDIT-2026-06-11-R4.md`, `USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md`; the
AY + AZ `FINAL.md`, `PROGRESS.md` boards, and the AZ `R3-CLOSURE-MATRIX.md`.

## Round-numbering reconciliation (the binding read)

There is NO doc literally labelled "R1" or "R2". The campaign's round numbering jumps to
R3 because the user numbered the rounds from the AZ session onward. I map the lane's "R1–R5"
to the actual artefacts as follows (this is the only honest mapping):

- **R1 = the foundational prompts + the first dated live audit.** Two artefacts together
  constitute "the original prompts" the user asks to recap (R8 standing directive 4): the
  `PROMPT-CORPUS.md` standing-request set (A governing precepts; B glass-ui §1–14; C slides;
  D feedback-coder; E process; F source brief) + `USER-DECISIONS-2026-06-09.md` (the 3
  hinges + the slider clarification) + `USER-AUDIT-2026-06-10.md` (the first live audit,
  items A1–A12 / B1–B22 / C1–C4).
- **R2 = ABSENT** (no banked doc; the numbering is the user's, not a missing artefact).
- **R3 = `USER-AUDIT-2026-06-10-R3.md`** (R3-1..R3-15).
- **R4 = `USER-AUDIT-2026-06-11-R4.md`** (R4-1..R4-4).
- **R5 = `USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md`** (R5-1..R5-10, slides-consumer).

This lane covers the GLASS-UI asks (the slides-only A1–A12 / C-slides / D rows are named with
their disposition for completeness but are not glass-ui-root and route to the slides session;
the binding glass-ui recap is the B-rows, the C cross-cutting, R3, R4, and the R5 root-fix
column).

## Verdict legend

- **ADDRESSED** — discharged by a named wave AND the live surface (or the source) holds at HEAD.
- **PARTIAL** — discharged in part; a named follow-on or a residual gap remains live.
- **REGRESSED** — a wave marked it `live-verified`/`complete`, but the live surface at master
  HEAD (3.13.0) now shows the defect again. The breaking wave is named.
- **UNADDRESSED** — no wave owns it, or it is a named-successor deferral never executed.

---

## R1 — the foundational prompts (PROMPT-CORPUS + USER-DECISIONS + the 2026-06-10 live audit)

### R1.A — governing precepts (PROMPT-CORPUS §A)

| ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|
| NO quick solutions/workarounds/legacy/fallbacks; idiomatic gestalt; architectural transpositions | the tranche-discipline (every AY/AZ wave) | enforced by the proof-gate battery + tranche format | ADDRESSED (process invariant) |
| NO god modules (>500); colocate components+composables+constants | AY.W-GOD1 + W-COLOCATE + AZ.W-CARVE | `proof:no-god-module` green; feature-dir colocation enforced (`proof:colocation`) | ADDRESSED |
| Idiomatic Tailwind (@apply/@utility/@theme); no monolithic stylesheets | AY.W-CSS1 (26-partial carve) + AZ.W-CARVE | dock.css is an @import root over cohesive partials; tokens token-first | ADDRESSED |
| Triumvirate per feature (research→plan→harden→synthesize), looped | the tranche workflow (AY/AZ fanout) | the R6/R7 triumvirate loops are the codified instance | ADDRESSED (process) |
| Writing-style discipline (no AI-tells, unspaced em dashes, levity) | the precepts + `proof:no-legacy-commentary`/`proof:story-language` | machine-locked | ADDRESSED |

### R1.B — glass-ui root asks (PROMPT-CORPUS §B 1–14)

| # | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| B§1 | Constellation → first-class glass-ui; slides consumes; DELETE slides copy | AY.W-CON1/2/3 + AZ.W-CON-GEN + W-ADOPT | constellation subpath ships; slides adopts; W-ADOPT deletes the bespoke copy post-3.13.0 cut | ADDRESSED |
| B§2 | Constellation click = WARP anomaly to nearest cursor point + easter eggs | AY.W-CON2 (re-verified AX.W17 warp) | `warpTo`/`warpStep` compose; click-warp live-gated | ADDRESSED |
| B§3 | Constellation more translucent both modes | AX.W17 + AY.W-CON tokens | tokenable; the slides R5-6 generalization booked the alpha axes | ADDRESSED |
| B§4 | Touch-target + font-size increase mobile AND desktop (not just dock coarse) | AY.W-SCALE1 + W-SCALE2 (`--ui-scale`/`--ui-coarse-scale`) | `proof:ui-scale` green; desktop-fluid + coarse register | ADDRESSED |
| B§5 | Dock: iOS springy anims; items fade/morph IN LOCKSTEP with shell; layering+rail; dock-with-slider | AY.W-DOCK1/2/3 + AZ dock band (RAIL/FLICKER/TAXONOMY/MORPH) | dock rebuilt; **shell-rail still floats disconnected (see R8-1/R6 below) — the lockstep + slider hold landed, but the SHELL rail register regressed** | PARTIAL |
| B§6 | Aurora SOTA (32 agents): OKLAB, derive-color, van-Gogh strokes, configurator simplify | AY.W-AUR-PAINTERLY/STUDIO/VANGOGH-REBUILD/CONFIG | aurora studio rebuilt on lib Configurator; 19/19 aurora gates; van-Gogh anisotropy lift live-π'd | ADDRESSED |
| B§7 | Blob SOTA (32 agents): visual/anim/interaction; glass integration; perf-first | AY.W-BLOB2/3/REBUILD/CONFIG + AZ.W-BLOB-PAGE/STUDIO | blob page rebuilt; **studio configurator sliders now INVISIBLE at HEAD (R8-7, REGRESSED — see below)** | REGRESSED |
| B§8 | Fourier-field: fold AX.W43 research; perfected abstracted glass element | AY.W-FF2/FF3 + AZ.W-MOTION2 (curve canon) | fourier-field rebuilt to the fourier-analysis reference; **R8-10 says the FIELD demos remain sparse vs the reference (configurator/options gap)** | PARTIAL |
| B§9 | Sliders: two forms — continuous rounded cylinder + spectrum; migrate consumers | AY.W-SLD1 (cylinder correction) + W-SLD1-R3 | `proof:slider-two-only` clause 3 locks the conjunction; **B3 (thumb-INVISIBLE / pull-the-track) was the third restatement — verify the inscribed-cylinder still reads as the user's bar** | PARTIAL |
| B§10 | Slider keep-dock-open / dock-with-slider broken | AY dock band + the keepDockOpen contract | the bidirectional pointer-anchored contract shipped (`dock-with-slider` story) | ADDRESSED |
| B§11 | Storybook prune+restructure (the "wtf is X" list); speedtest primitives audit | AY.W-SB1 + W-PRUNE + AZ.W-PRUNE2 + W-SHELL-CONFIG | header-ribbon/glass-panel retired then RESTORED (keyframes consumer-truth); use-token-color demo-wired; **R8 still reads multiple IA defects (R8-11/12/13/16)** | PARTIAL |
| B§12 | Instrument-chassis scope (slides vs glass-ui retention) | AY.W-IC1 (scope decision) | `proof:instrument-*` green; component retained, slides-side removal scoped | ADDRESSED |
| B§13 | Encapsulation/DI/boundaries; break god-modules; no legacy | AY.W-GOD1 + W-COLOCATE + the context DI factory | `createStrictContext`/`createOptionalContext` canonical pair; god-modules carved | ADDRESSED |
| B§14 | Storybook demo perfected + EVERY component; research-backed READMEs | AY.W-CONVERGE + the per-component READMEs | READMEs landed for dock/constellation/aurora/blob; **R8-12 BINDING census (every component × glass/veil variants) is the open gap** | PARTIAL |

### R1.C — the first live audit (USER-AUDIT-2026-06-10, items A/B/C)

**A1–A12 (slides-only):** route to the slides session (L tranche W-POSTER-R2 / W-GLASS-SUFFUSE
/ W-CHR-R2 / W-XRAY-LABEL). NOT glass-ui-root. Recorded as discharged by L per AY FINAL §7;
A11's popover-padding half folds to R5-4 (glass-ui root) below.

| # | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| B1 | ALL docks need persistent controls + nav | AY.W-DOCK-NAV + AZ.W-DOCK-NORMALIZE | nav-pattern (home-left + separators) on showcase + shell docks; **R8-9 re-reads the bottom dock as section-less — see REGRESSED below** | PARTIAL |
| B2 | Dock SELECTED state (underline+darkness) awful | AZ.W-REGISTER-IOS | de-red iOS luminance-lift register; `proof:register-ios` 12/12; glass-first active tier | ADDRESSED |
| B3 | Slider STILL not right: thumb INVISIBLE, pull-the-track | AY.W-SLD1-R3 | the inscribed-cylinder shipped; **the user's "no distinct thumb paint" bar needs a live re-read — flagged for BA re-verify** | PARTIAL |
| B4 | Dock collapsed = CIRCLE not oval | AY.W-DOCK-NAV (collapsed-floor tokens, aspect-ratio:1) | the perfect-circle floor tokens shipped; live overview collapses to a circle | ADDRESSED |
| B5 | Dock items broken — hierarchy, dividers, icons | AY.W-DOCK-NAV + AZ.W-DOCK-RAIL | DockSeparator + icon affordances + tier ladder; **R8-9 says the section model is gone again** | PARTIAL |
| B6 | /dock/layers TOTALLY broken — laggy, no rail line | AZ.W-DOCK-RAIL + W-DOCK-FLICKER | hairline switcher-rail register restored (`proof:dock-rail-hairline`); in-pane rail reads OK live; **shell rail disconnected (R8-1)** | PARTIAL |
| B7 | Vertical overflow totally broken | AZ.W-DOCK-TAXONOMY (collapse on both orientations) | vertical-collapse frame-series captured; overflow story present | ADDRESSED |
| B8 | Two variants indistinguishable; selected bar misaligned | AX.W53 SegmentedTabs unify + AZ.W-DOCK-TAXONOMY | variant discriminant removed; one elastic indicator | ADDRESSED |
| B9 | Persistent controls: divider before right item; greyed forward arrow when nothing more | AY.W-DOCK-NAV | nav-pattern + adaptive arrows; **R8-1 reads the rail nav arrows still mis-seated** | PARTIAL |
| B10 | /substrates/blob LARGELY BROKEN — pixelated, no goo/satellites; showcase doesn't render | AY.W-BLOB-REBUILD + AZ.W-BLOB-PAGE | page rebuilt (device-px-crisp swatches + orbiting satellites); **the studio SHOWCASE configurator is broken again (R8-7) — see REGRESSED** | REGRESSED |
| B11 | Text on ALL demo pages WAY too large; awful hierarchy | AZ.W-HIERARCHY + W-SUFFUSE + AY.W-SB-TYPE | canonical 20.4px section rung; the StoryHero/StorySection chassis; `proof:hierarchy` | ADDRESSED |
| B12 | /substrates/fourier-field too faint; match fourier-analysis | AY.W-FF3 + AZ.W-MOTION2 | render register rebuilt; 3px non-scaling strokes; **R8-10 wants a richer FIELD demo+configurator (still a gap)** | PARTIAL |
| B13 | /substrates/glass-material pointless on black bg | AY.W-SB-STAGE | live-backdrop seam (liveBackdrop → quiet bucket); **R8-11 RE-READS the near-black plate killing the glass read — REGRESSED/incomplete** | REGRESSED |
| B14 | Spectrum slider thumb thinner like value.js | AY.W-SLD1-R3 (spectrum arm) | spectrum containment law held | ADDRESSED |
| B15 | /dock/overview first section broken; morph from CENTER not right | AY.W-DOCK-NAV (center-out) + AZ.W-DOCK-FLICKER | symmetric center-out morph; collapse-onset pop killed (`proof:dock-no-scale-pop`) | ADDRESSED |
| B16 | /compositions/hero constellation INVISIBLE | AY.W-SB-REVERIFY (b8c6b34 zero-paint fix) | root-caused + fixed; DELTA present | ADDRESSED |
| B17 | /compositions/dashboard sucks; question the components | AY.W-PRUNE | dashboard filler story RETIRED; primitives keep own stories | ADDRESSED |
| B18 | /compositions/empty-states blob not integrated; redesign + goo/satellites | AY.W-BLOB-REBUILD + W-EGG (mascot) | mascot scales from rebuilt hero; **the goo/satellite quality couples to the R8-7 studio regression** | PARTIAL |
| B19 | Aurora preview panes black bar on top | AY.W-AUR-CONFIG | preview-pane crop root-caused; **R8-5 re-reads the speedtest preview as DIM (not black-bar, a new read)** | PARTIAL |
| B20 | van-Gogh aurora AWFUL — laggy, not van-Gogh | AY.W-AUR-VANGOGH-REBUILD | marble root-caused (shared oil cascade); live GPU π readback | ADDRESSED |
| B21 | Configurator god-awful — rebuild from first principles; keep preset tunings | AY.W-AUR-CONFIG + AZ.W-HIERARCHY | studio rebuilt on lib Configurator; hierarchy vocabulary; **R8-4 RE-READS occlusion + missing dividers — PARTIAL/regressed on the chip-row + seed-slab** | PARTIAL |
| B22 | /foundations/intro aurora must be ENTIRE page bg | AY.W-SB-STAGE | full-bleed hero class | ADDRESSED |

### R1.C cross-cutting (C1–C4)

| # | ask | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| C1 | Fresh frontend-design plugin audit of ALL UI panes | the FD-R2 fleet (AY) + the AZ FLEET-DIGEST | fleet ran; **R8 directive 7 re-commissions it for BA — ongoing** | PARTIAL |
| C2 | Suffuse design language (glass/grid/math/audacious type/color pops) | AZ.W-SUFFUSE | one-color-event map; display heroes; `proof:suffuse` | ADDRESSED |
| C3 | glass-ui idiom adoption/refinement/abstraction gaps | AZ.W-METRIC-UNIFY + W-RAIL-EXTEND + useLiquidFlex | metric core unified; hairline abstracted; squish abstracted | ADDRESSED |
| C4 | RUTHLESS superfluity pruning across the constellation | AY.W-PRUNE + AZ.W-PRUNE2 | PRUNE-LEDGER ruthless census; 5 retires + keep-evidenced | ADDRESSED |

---

## R3 — USER-AUDIT-2026-06-10-R3 (R3-1..R3-15)

The R3-CLOSURE-MATRIX is the binding artefact: 15/15 each name a discharging wave + a binding
π-gate. The matrix marks every item closed at AZ. R8 re-reads several in person.

| R3 | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| R3-1 | dock layers broken — want a hairline rail | AZ.W-DOCK-RAIL | `proof:dock-rail-hairline` + π; in-pane switcher rail reads OK live (probe-dock-layers) | ADDRESSED |
| R3-2 | remove the facility; H+V dock disambiguated + beyond-dock hairline-rail | AZ.W-DOCK-TAXONOMY + W-RAIL-EXTEND | variant discriminant removed; DockRail facility born; **the beyond-dock rail still floats disconnected on the shell (R8-1) — see REGRESSED** | PARTIAL |
| R3-3 | dock-morph hover flashing/flickering — resolved totally | AZ.W-DOCK-FLICKER | `proof:dock-no-scale-pop` W1-W4 incl. live edge-trace | ADDRESSED |
| R3-4 | gear → demo CONFIGURATOR; remove composables/floating-config; fold dark-toggle | AZ.W-SHELL-CONFIG | FAB removed; composables category gone; **R8-3 RE-READS the gear's dark-mode SWITCH not flipping + wrong control — REGRESSED** | REGRESSED |
| R3-5 | ALL docks persistent nav/home — normalize | AZ.W-DOCK-NORMALIZE | re-census found 0 divergent nav docks; `proof:dock-unify` F4+W5; **R8-9 re-reads the bottom dock as section-less — PARTIAL** | PARTIAL |
| R3-6 | dislike red hover/click; iOS-glassy at ROOT | AZ.W-REGISTER-IOS | de-red root register; `proof:register-ios` 12/12; 0 interactive-red | ADDRESSED |
| R3-7 | dock on light bgs need iOS-27 dynamic darkening; audit ALL glass views | AZ.W-ADAPTIVE-AUTO | self-engage floor + luminance observer; `proof:adaptive-glass-live` 36/0 in-situ | ADDRESSED |
| R3-8 | configurator better but needs refinement everywhere | AZ.W-HIERARCHY (vocabulary) | section/label/rhythm tokens; `proof:hierarchy` + π; **R8-4 RE-READS occlusion+dividers gap (studio configurators) — PARTIAL** | PARTIAL |
| R3-9 | /substrates/blob awful — pixelated, no satellites | AZ.W-BLOB-PAGE | device-px-crisp swatches + orbiting satellites; `proof:blob-page` frames-measured | ADDRESSED (page) / see R3-10 |
| R3-10 | blob studio refinement — interaction, metaball, satellites, shadow, configurator hierarchy | AZ.W-BLOB-STUDIO | **REGRESSED — the studio configurator sliders render width:0/opacity:0 at HEAD (R8-7); root-caused below** | REGRESSED |
| R3-11 | /motion full keyframes suite; ppmycota purple | AZ.W-MOTION-SUITE | full curve canon; spring fork killed; `--motion-accent: --viz-legendre`; `proof:motion-demo` 17/17 | ADDRESSED |
| R3-12 | ℱ logo IS the Foundations entry, demarcated, slightly larger | AZ.W-SHELL-IDENTITY | ℱ alone as Foundations + separator + measured nudge; `proof:shell-identity`; live ℱ present at sidebar top | ADDRESSED |
| R3-13 | button → vertical→horizontal liquid-glass metaball morph, bidirectional, deterministic | AZ.W-MORPH-SHOWCASE | `/dock/morph-showcase` live: "Morph to horizontal" btn + SVG-goo bridge on ONE scalar; **R8-2 wants it on the SHELL docks too (in-situ) — PARTIAL** | PARTIAL |
| R3-14 | dock shows different layers per PAGE context; redesign | AZ.W-DOCK-CONTEXT | route→layer manifest (11 contexts / 26 facets); shell docks wired; **R6 redirect moved facets ONTO the rail (W-RAIL3); R8-2 wants robust in-situ demo** | PARTIAL |
| R3-15 | fourier ℱ not centered in hover/shadow; wants a rail | AZ.W-SHELL-IDENTITY | measured optical-center nudge (|dx|,|dy| ≤0.5px); glass hover pill | ADDRESSED |

---

## R4 — USER-AUDIT-2026-06-11-R4 (R4-1..R4-4)

| R4 | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| R4-1 | DockRail totally broken — extend OUTSIDE the dock; janky anims | AZ R4-RAIL corrective → W-RAIL3 | the R6 triumvirate redress (W-RAIL3) followed; **the shell rail STILL floats disconnected at HEAD (R8-1) — REGRESSED** | REGRESSED |
| R4-2 | demo options IA confusing ("wtf are these options") | AZ R4-RAIL (demo-IA arm) | the dock demo IA re-walked; **R8 re-reads multiple IA defects (R8-9/16) — PARTIAL** | PARTIAL |
| R4-3 | gear = the Preset Editor, dark-toggle at TOP | AZ R4-SHELL corrective | PresetEditor as gear content, dark-at-top; **R8-3 RE-READS the dark toggle not flipping + wrong control — REGRESSED** | REGRESSED |
| R4-4 | Preset Editor controls must be house registers (SegmentedTabs/glass Select/switches) | AZ R4-SHELL | option rows re-skinned to house registers; **couples to R8-3 gear regression** | PARTIAL |

---

## R5 — USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER (R5-1..R5-10, the ROOT-fix column)

These are consumer-verified root fixes; each had a slides interim arm that RETIRES on the
3.13.0 bump (the slides session retired R5-1/2/3/8 per tasks #161-163).

| R5 | ask (condensed) | discharging wave | LIVE state | verdict |
|---|---|---|---|---|
| R5-1 | `--dock-mobile-scale` DEAD (substitution trap) | AZ.R5-TOKENS | `--dock-scale` re-declared inside the coarse block; `proof:ui-scale` `dock-coarse-redeclares-scale` witness | ADDRESSED |
| R5-2 | coarse dock default too BIG | AZ.R5-TOKENS | `--dock-coarse-scale: 0.78` dense register; 44px floor held | ADDRESSED |
| R5-3 | collapsed-tap pass-through + hover-expand MORPH-RACE | AZ.R5-TAP (useDockClickIntegrity) | identity-scoped pass-through + morph-settle window; live replay clean | ADDRESSED |
| R5-4 | popover/dropdown content padding too tight | AZ.R5-VEIL band / panel padding rung (+ R5-10) | the roomier panel rung; **also folds A11 (slides) — verify the rung landed at root** | PARTIAL |
| R5-5 | Vue scoped `:global()` DROP trap (recurred 3×) | AZ (precept) + the memory note | codified in precepts (plain-ancestor idiom); demo/consumer sweep | ADDRESSED |
| R5-6 | constellation generalization (6-item list) | AZ.W-CON-GEN | 5/6 additive default-OFF; `proof:constellation-gen`; G4 SPEC'D-NOT-BUILT (honest book) | PARTIAL |
| R5-7 | VEIL plate as a first-class Card variant | AZ.R5-VEIL | veil Card surface on the W55 tint axis; 3 slides sites = ≥2-consumer bar | ADDRESSED |
| R5-8 | constellation mobile legibility (kVis floor) | AZ.R5-8 (two-axis SIZES/positions split) | kVis = max(k, kFloor); byte-identical ≥922px; slides arm retired (task #163) | ADDRESSED |
| R5-9 | deck PAGE-TURN primitive lift | named-successor (AZ FINAL §6) | **UNADDRESSED — booked "lift WHOLESALE on wave cadence"; not built** | UNADDRESSED |
| R5-10 | glass MENU-ROW + PANEL-SECTION recipes | named-successor (AZ FINAL §6) | **UNADDRESSED — `.glass-menu-row` CVA + `.glass-menu-section` + panel rung not built** | UNADDRESSED |

---

## The REGRESSED roll-up (every regression × the breaking wave × live evidence)

These are the rows where a wave declared `live-verified`/`complete` but the master-HEAD
(3.13.0) surface shows the defect again. The R8 reads are correct in person.

### REG-1 — Blob STUDIO configurator sliders INVISIBLE (R8-7 / R3-10 / B7 / B10 / B18)

**The most severe verified regression.** The `/substrates/blob` studio renders every control
LABEL ("Attraction", "Click impulse", "Responsiveness", "Satellites", "Orbit radius", …) but
the sliders beneath them paint at **width:0 and opacity:0** — invisible. Confirmed live: 8
`[role="slider"]` elements present, every one `width: 0`.

- **Root cause (mechanical, file:line):** `src/components/custom/configurator/ConfiguratorRow.vue:120`
  wraps the slotted control in `<div class="flex items-center">`. The slotted control on a
  slider row is a `LabeledField` whose root `<div class="labeled-field">` (a plain block,
  `src/components/custom/labeled-field/LabeledField.vue:2`) gets NO `flex:1`/`min-width:0` in
  the flex parent, so it collapses to `width:0`. The inner `.glass-slider w-full` track then
  inherits 0 width and the thumb opacity-fades to 0 (an empty track). The ancestry chain is
  exact: `.flex items-center` (w=335) → `.labeled-field` (**w=0**) → `.glass-slider w-full`
  (w=0) → `.slider-thumb` (w=0, opacity=0).
- **The breaking wave:** AZ.W-METRIC-UNIFY explicitly recorded "the ConfiguratorRow-vs-LabeledField
  chassis reconcile" (ConfiguratorRow.vue:34 divergence note) — the reconcile left LabeledField
  collapsing inside the `flex items-center` row. AZ.W-BLOB-STUDIO was marked `live-verified`
  ("live knobs") but the studio configurator now ships dead controls; the gate `proof:blob-studio`
  passed a structural/frame readback that did not catch the slotted-row width collapse.
- **Evidence:** `docs/tranches/BA/audit/fleet/probe-blob-dark.png` (labels present, no sliders).

### REG-2 — Shell DockRail floats DISCONNECTED, no visible hairline (R8-1 / R8-6 / R4-1 / R6-2)

The SHELL docks' rail (the "Shell / Panes" facet chips) float to the right of the SidebarDock
and below/beside the BottomDock with NO visible hairline connecting them to the dock's divider
seam — exactly the R8-1 read ("totally mis-aligned; should be at the ℱ divider seam; should
overrun BOTH sides"). The in-pane switcher rail (R3-1, W-DOCK-RAIL) reads OK in the
`/dock/layers` story demos, but the SHELL rail register (W-RAIL3's "floating carousel with a
VISIBLE hairline") is broken at HEAD.

- **The breaking wave:** AZ.W-RAIL3 (the R6 triumvirate redress) was marked `live-verified`
  with "π deltaW=deltaH=0" (box inviolate) and "the facets OUT of the dock onto the
  visible-hairline chip carousel." The box-inviolate half held, but the **visible-hairline +
  midline-seat half did not survive to the shell** — the chips read as detached pills with no
  connective line. This is the THIRD+ rail failure (W-RAIL-EXTEND → R4-RAIL → W-RAIL3 → R8-1).
- **Evidence:** `docs/tranches/BA/audit/fleet/probe-dock-layers-dark.png` (Shell/Panes chips
  float beside the sidebar, no hairline) + the banked `ground/R8-01-*.png`.

### REG-3 — Gear dark-mode toggle broken + wrong control (R8-3 / R3-4 / R4-3)

R8-3 reads the gear Configurator's APPEARANCE → Dark mode row as a plain `<Switch>` that does
NOT flip the mode, and "not even the proper darkmode toggle button/icon" (the animated
`DarkModeToggle` sun/moon). R3-4 + R4-3 discharged "fold the dark-mode toggle into the gear,
dark-at-TOP" (AZ.W-SHELL-CONFIG + R4-SHELL, both `live-verified`). The control is present but
its binding/identity regressed.

- **The breaking wave:** AZ.W-SHELL-CONFIG (gate `proof:shell-config` AXES-PRESENT) +
  AZ.R4-SHELL. The gate verified the dark-Switch is present and writes, but R8-3 reads it as
  non-functional on the live shell + the wrong control (a bare Switch, not the DarkModeToggle).
  Likely a stale binding (the `:pressed`/`v-model` no-op class the memory note flags) — needs
  the BA dock/shell lane to root-cause the binding at the gear's APPEARANCE row.
- **Evidence:** banked `ground/R8-03-darkmode-toggle-broken.png`.

### REG-4 — glass-material near-black plate kills the glass read (R8-11 / B13)

B13 ("/substrates/glass-material pointless on black bg") was discharged by AY.W-SB-STAGE
(`live-verified`, "the live-backdrop seam lands ONCE"). R8-11 re-reads the same defect: the
ladder rungs sit on a near-black plate that kills the read; card/variant/veil demos owe
aurora-backed stagings. The live-backdrop seam either did not reach this route or the dark
register flattens it.

- **The breaking wave:** AY.W-SB-STAGE (the stale-gate `proof:substrate-staging` was flagged
  in AY FINAL §3 as "did not land as specced; owned by W-SB-STAGE"). The dark register is the
  cross-cutting R8 weakness (R8-11/12/13/15/19) — this row couples to the BA dark-register lane.
- **Evidence:** banked `ground/R8-11-black-bg-hides-glass.png`.

### Regression summary

| reg | item | breaking wave | severity |
|---|---|---|---|
| REG-1 | blob studio sliders width:0/opacity:0 | AZ.W-METRIC-UNIFY (LabeledField/ConfiguratorRow reconcile) + W-BLOB-STUDIO | S1 — the studio is non-functional |
| REG-2 | shell DockRail floats disconnected, no hairline | AZ.W-RAIL3 (the 3rd+ rail failure) | S1 — the headline R8-1/R6 ask, unresolved |
| REG-3 | gear dark-mode toggle broken + wrong control | AZ.W-SHELL-CONFIG + R4-SHELL | S2 |
| REG-4 | glass-material near-black plate | AY.W-SB-STAGE | S2 |

---

## The UNADDRESSED roll-up (named-successor deferrals never executed)

| id | item | disposition |
|---|---|---|
| R5-9 | deck PAGE-TURN primitive lift | named-successor (AZ FINAL §6); UNADDRESSED |
| R5-10 | glass MENU-ROW + PANEL-SECTION recipes | named-successor (AZ FINAL §6); UNADDRESSED |
| AY W-LIGHTHOUSE | Lighthouse perf-budget audit | planned (spec authored), named-successor deferred |
| AY W-LIQUID | liquid-glass specular fold | folded into AZ.W-MORPH-SHOWCASE (useLiquidFlex born) — RESOLVED |
| AY W-AUR-T5 | anisotropic Kuwahara | named-successor (W-AUR-STUDIO §6 re-eval); UNADDRESSED |
| AZ W-MOTION3 | live-parameterized steppedEase generator | named-successor (MOTION2 G7 defer); UNADDRESSED |
| AZ R5-6 G4 | the 6th constellation generalization item | SPEC'D-NOT-BUILT (honest book) |
| AZ W-DELTA0 re-captures | 5 AY DELTAs drifted hash-stale | named-successor (next Batch-0 owes the re-capture) |

---

## Coverage note

Every R1.B/C, C, R3, R4, R5 glass-ui ask traces to a named wave with a live verdict. The
slides-only A1–A12 / C-slides / D rows are recorded as L-tranche discharged (AY FINAL §7) and
route to the slides session, not glass-ui-root. The four verified REGRESSIONS (REG-1..REG-4)
and the UNADDRESSED named-successors are the binding seeds for the BA tranche; REG-1 (blob
studio) and REG-2 (shell rail) are S1 — the studio is non-functional and the rail is the
fourth+ failure of the same ask.
