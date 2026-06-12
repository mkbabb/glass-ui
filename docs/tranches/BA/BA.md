# BA — the dark register rebuilt, the glass grammar unified, the dock re-conceived, and the demo staged to demonstrate

**Repo** glass-ui (+ a slides adopt/deploy book at close) · **Base** master @ v3.13.0 (the AZ close cut, published with provenance) · **Status** AUTHORED — awaiting user greenlight; NO implementation has begun (R8 directive 5: "This is NOT an implementation phase. Tranche development only.").

BA is grounded in the user's round-8 post-close audit (`audit/USER-AUDIT-2026-06-11-R8.md`,
19 grounded reads + 7 standing directives) and the 32-lane deep audit
(`audit/fleet/*.md`, every lane harvested + committed: the 19 R8 clusters root-caused
live, the prompts/plans/precepts recapitulation, the deferred census, four
frontend-design pane sweeps, and the hierarchy/suffusion/pops/idiom-gap/animation
analyses). Every wave below carries its grounding finding ids; every defect is
file:line- or capture-anchored — no wave is authored on prose alone.

## The shape of the problem

AZ closed `complete` with a 9-surface reflection matrix all operative-PASS — and the user
re-opened the same surfaces within the hour. The fleet's verdict is precise about why
(precepts-conformance P-1): **the close verified MECHANISMS, not the GESTALT.** Each
per-mechanism π readback was honestly green (the hairline paints, the indicator reads the
token, the morph holds one scalar) while the page as a whole — both modes, on a real
device — did not look right. Four AZ waves marked live-verified are BROKEN at HEAD
(waves-vs-reality WVR-1..3 + recap REG-1..4), and one cross-cutting register failure
underlies more than a third of all findings:

- **The dark register is structurally flat** (DARK-1, HS-1, FD-1, WVR-7). The dark page
  floor is `hsl(24 8% 6%)` and the card `hsl(24 8% 10%)` — a 4-L-point gap — so the
  entire five-rung glass ladder composites into a ~7-code-value near-black band
  (adjacent-tier ΔL ≈ 0.001). Dark glass is occlusive, not transmissive; every filled
  control reads as an achromatic cream slab (`--primary: hsl(48 10% 90%)`); the
  `--surface-tint-*` ramp has no dark arm; and the W55 adaptive `contrast-color()`
  refinement INVERTS selection hierarchy inside glass cards (the lifted muted register
  computes pure white while the un-lifted active `--foreground` stays L90 — live-traced
  on the curve picker, flagged systemic). R8-11/12/13/15/16/19 are all downstream of
  this one register.
- **Four S1 regressions on live-verified waves.** (1) Every Configurator slider paints
  at 0px width — `ConfiguratorRow.vue:120`'s control slot has no width contract, so the
  blob studio's 32 sliders render labels-with-no-controls (WVR-2, the R8-7 "almost
  entirely broken"). (2) The gear's Dark-mode row is a desynced no-op `<Switch>` bound
  to a parallel config-store `dark` field, not the live mode (WVR-3, R8-3). (3) The
  DockRail hairline seats at the dock's midline/edge — a recorded W-RAIL3 workaround —
  not at the dock's own divider seam, overrunning one side only (RECAP2-R6, R8-1; the
  THIRD rail failure, now owed a re-conception, not a fourth patch). (4) The
  glass-material story stages its rungs on an opaque `bg-card` ShowcaseFrame plate that
  blocks the page aurora — the "pointless black background" (FD-FS-2, R8-11).
- **The demo cannot even hold a page**: the shell docks' `railContext`
  writable-computed normalizes on mount and pushes a route, auto-navigating away from
  any landed story within ~1s (FD-FS-4) — an S1 that silently corrupts every live
  verification pass.
- **The glass grammar is incomplete where it shows most.** Toast/Notification tone
  variants paint opaque saturated slabs OVER their glass base (GVC-1/2); `veil` exists
  in exactly one component; there is no shared {glass·veil·opaque} surface axis
  (IG-B1); the sectioned Progress is N hard-capped color cells with a screen-blend seam
  band (R8-14); and the disco-grain/sparkle CTA family survives against the user's
  explicit "remove the disco effect everywhere" (R8-18).
- **The demo under-sells the library**: ~80% of routes have no background (BG-1), the
  fourier field has no studio/configurator/partial-sum demonstration (BA-FOUR-1/2), the
  shipped animation facilities have zero real-surface consumers (ANIM-2), and the
  shell docks lost their section model when W-RAIL3 deleted the in-dock
  `DockLayerGroup` to fix box-inflation (WVR-1, R8-9).

The binding question: **make the library's own demo the proof that the system is
beautiful — dark mode first, gestalt-verified, with the glass grammar spoken by every
component.**

## Invariants (inherited + new)

1. All AZ/AY/AX invariants hold: token-first, component-over-class, the ≥2-consumer
   bar (L inv-8), no shadow execution, agents never git, presets-in-consumers
   (ppmycota purple never enters library tokens), the cardinal lesson (live-verified =
   captured own-surface DELTA + π readback, content-hash freshness).
2. **NO implementation before the user's greenlight** — this document and its wave
   specs are the authoring-phase deliverable.
3. **Re-opened ≠ rebuilt-blind** — every wave's §0 RE-GROUND cites the fleet mechanism
   finding; a lane re-greps anchors at HEAD but never re-diagnoses from scratch.
4. **THE GESTALT BAR (the P-1 close-class fix).** Per-mechanism π greens do NOT close a
   visual wave. Every visual wave's completion criterion includes a HOLISTIC verdict:
   the owning surface captured whole-page, BOTH modes, over its real backdrop, judged
   as a gestalt ("does this look right as a page?") — minted as `proof:ba-gestalt`
   (W-GESTALT-GATE) and binding at W-REFLECT2. AZ's close-class failure (mechanisms
   green, page wrong) may not recur by construction.
5. **The dark register is a PREREQUISITE** (BG-6 sequencing): no demo-staging or
   census-capture wave lands before W-DARK-MATERIAL holds its live verdict — staging
   over a broken dark register is wasted capture work.
6. **The 4th-rail-attempt discipline**: W-DOCK-SECTIONS is a re-conception whose
   anchor topology (the divider-seam seat, the both-side overrun, the fan-out/retract
   contract) is decided IN THE SPEC before any CSS lands; a lane may not land a third
   midline-class workaround.
7. **NO legacy code, no aliases** — the disco retirement, the tone-on-glass recompose,
   and the static scroll-fade retirement are clean breaks; MIGRATION.md carries every
   row; consumers re-pin.
8. Model discipline: fable orchestrates/designs/synthesizes; opus/sonnet carry
   workflow fanout.
9. One-GL-context-per-route holds for the background map (W-STAGE); the GL renderer
   fence (blob/aurora shader internals) is untouched except where a wave names it.
10. The slides repo `docs/tranches/M/` is foreign; externally-owned deferrals
    (DC-EXT-1/2/3 — fourier-analysis tabs/phantom-classes, value.js self-alias) are
    re-stamped, never folded (inv-16).

## USER HINGES — decisions that gate batches

| id | decision | options (recommendation first) | gates |
|---|---|---|---|
| **H1** | The dark-material direction (DARK-1/2/3, FD-1/2, HS-1) | (a) **The luminous-dark transmissive material**: drop the page floor AND lift the plate into a real dark elevation ladder (ΔL ≈ 6–10 per rung, the iOS/Material dark step); give dark glass a luminosity LIFT (saturate/brightness companions so the backdrop glows through); mint the dark arm of the `--glass-tint-*` seam (the mirror of the over-light darken); re-anchor dark `--primary` onto a real chroma. (b) Minimal token-gap widening only (page/card ΔL), no material-register change. | Batch 1 (W-DARK-MATERIAL) |
| **H2** | The gold CTA's post-disco form (R8-18, BA-disco-01) | (a) **Gold survives CALM**: the translucent gold wash + the `--glass-specular` edge catch-light stay as a STATIC register; the sparkle-sweep glyph, disco-grain overlay, and bg-sweep shimmer keyframes retire; hover smooths onto the §6 doctrine. (b) Full retirement of the gold/audacious CTA family onto the plain glass button. | Batch 4 (W-GLASS-CAL) |
| **H3** | The dock section model's rail disposition (R8-1/6/9; BA-DSM-2 "if a hairline rail survives the redesign at all") | (a) **The rail PERSISTS, re-seated**: the hairline anchors AT the dock's own divider seam (the ℱ separator on the sidebar; the sidebar-toggle separator on the bottom dock), overruns BOTH dock edges, and carries the fan-out/retract chip contract — the user's own R8-1/R8-6 words. (b) The section model ABSORBS the rail (chips become a dock section; the beyond-edge hairline retires). | Batch 3 (W-DOCK-SECTIONS) |
| **H4** | The BA cut's version (the disco retirement + tone recompose + scroll-fade retirement are breaking for btn-audacious/gold consumers — speedtest + slides) | (a) **4.0.0** — the honest major for a multi-surface clean break. (b) 3.14.0 minor with MIGRATION rows (the house's prior clean-break-on-minor practice). | Batch 7 (W-CLOSE) |
| **H5** | Publish + deploy creds at close (npm provenance via the v* tag; slides CF deploy) | provide at the close hinge | Batch 7 |

Decided by the user's own words (no hinge): the curve picker re-conceives as the
dock-like glass chip rack ("perhaps another dock" — R8-16; curve-picker lane
recommendation (a)); the disco retires everywhere (R8-18 verbatim); the blur ladder
dials back globally ~15–20% as ONE knob-family edit (R8-19).

## The wave roster — 24 waves over 8 batches

Full per-wave specs live at `waves/BA.W-*.md`; the EXECUTION-DAG carries the dependency
rationale. Grounding ids cite `audit/fleet/<lane>.md`.

### Batch 0 — the floor (4 waves, parallel, disjoint)

| wave | what + why | grounding |
|---|---|---|
| **W-GESTALT-GATE** | Mint `proof:ba-gestalt` — the holistic per-surface acceptance gate ABOVE per-mechanism π: a roster of named surfaces, each owed a whole-page capture in BOTH modes over its real backdrop + an explicit gestalt verdict recorded with the capture; born-RED against the R8 state. Plus live-gate hygiene: re-point the 3 `:5175` gate defaults + profile-aurora's `:5173` to `:5199`; widen `proof:gate-manifest-sound`'s NO-5173 clause to forbid every legacy port. | precepts P-1; deferred DC-CHR-1 |
| **W-SHELL-HOLD** | The demo shell holds its page: guard the shell docks' `railContext` writable-computed so the set fires ONLY on a genuine user chip activation, never on mount/normalization — kills the ~1s auto-navigation that corrupts every live pass. Smallest possible diff; lands first because every later wave's live verification depends on it. | fd-foundations FD-FS-4 |
| **W-HYGIENE** | The mechanical close-debt sweep: MIGRATION.md re-anchored to the published 3.13.0 (drop "(staged)"); CLAUDE.md §Structure custom/ enumeration re-synced to disk + a sync gate; `proof:colocation` TARGET_DIRS derived (every custom/ dir with composables/ or shaders/) instead of the frozen hand-list; the docs/precepts submodule committed + pointer advanced + a close-lane clean assertion; the orphan AX evidence pngs committed-if-cited / deleted-if-scratch; the 5 stale AY DELTAs RETIRED-with-rationale (the captured surfaces no longer exist in AZ-rebuilt form); the AX W25/26/27/W33 pending rows retired as absorbed (Tasks #139/#140 superseded). | deferred DC-REC-3/9, DC-CHR-2; precepts P-3/4/5/6 |
| **W-CARVE2** | The god-module verdicts: typography.css @530 → cohesive `typography/{scale,semantic,utilities}.css` thin-@import partials (the W-CARVE pattern); constellationField.ts @586 + Constellation.vue @577 → carve or a justified §5 keep recorded in the ratchet. Dist byte-isomorphic where carved. | deferred DC-REC-1/2; precepts P-2 |

### Batch 1 — the dark material (1 wave, the prerequisite)

| wave | what + why | grounding |
|---|---|---|
| **W-DARK-MATERIAL** | THE headline. (1) The dark elevation ladder: page floor + `--card` re-tuned to a real ΔL step so the five glass rungs separate perceptibly (the 4-point gap is the mechanical root of "glass invisible in dark"). (2) Transmissive dark glass: the dark rung α/blur recipe gains a luminosity lift (saturate/brightness companions) so a backdrop GLOWS through the plate instead of dying behind it. (3) The dark arm of the adaptive `--glass-tint-*` seam — over a dark page the plate lifts toward luminous translucent dark, the mirror of the over-light darken; reconciled into the SAME seam, no third fork. (4) Dark `--primary` re-anchored off achromatic cream onto a real chroma so filled/active controls carry identity. (5) The `--surface-tint-*` dark arm so hairlines/chips read on the deep floor. (6) THE SYSTEMIC contrast-color() inversion fix: the `@supports` refinement lifts `--muted-foreground` to white inside glass cards while active `--foreground` stays L90 — the active register must lift in LOCKSTEP (or the refinement scope narrows) so selected > unselected everywhere. (7) **The R9 over-LIGHT self-engage recalibration**: the unconditional 20% content-tier darken grays every consumer glass card over a calm light page (LIVE-PROVEN on the slides presenter card — 20% → `oklab(0.785)` gray, 0% → warm cream restored); the full AA darken conditionalizes on the declared/sampled bright signal with a sub-perceptual unconditional floor, the `--muted-foreground` lift conditionalizes in lockstep, and the `proof:adaptive-glass`/`adaptive-glass-live` gates REBASELINE (not revert) — both π arms bind (busy-bright AA survives + calm-light reads as glass, NO GRAY). Gated by a π ladder-ΔL readback + tier-visible-over-aurora + a selected>unselected luminance assert + the double-ended W7, and the W-REFLECT2 gestalt verdict. | dark-register DARK-1..5; hierarchy HS-1; fd-forms FD-1/2/5; waves-vs-reality WVR-7; page-backgrounds BG-2/3/4/6; curve-picker Defect A; **R9-1 (`USER-AUDIT-2026-06-12-R9.md` — the slides gray, PROVEN live)** |

### Batch 2 — the S1 redress band (4 waves, parallel, disjoint)

| wave | what + why | grounding |
|---|---|---|
| **W-CONFIG-CHASSIS** | The configurator chassis made whole. (1) THE WIDTH CONTRACT (S1): ConfiguratorRow's control slot establishes a definite-width block context + the LabeledField family roots full-width, so ANY slotted control claims the row's free inline space — the 0px-slider class dies at the chassis, not per-consumer. (2) The in-row option-group overflow contract: a chip group exceeding the aside wraps or routes to the fading-scroll seam (the DERIVE-FROM-COLOR clip). (3) A first-class color-swatch/seed row register replacing the raw full-width `<input type=color>` slab. (4) The divider tokens: section + inter-row dividers promoted onto `--configurator-divider-*` with a dark-lifting arm (the "sections run together" read). (5) The gear PresetEditor recomposed ON the Configurator chassis (sections on the 20.4px rung; PresetEditorField retires onto ConfiguratorRow — clean break). (6) The dark-mode row: the parallel config-store `dark` field dies; the row composes the canonical animated `DarkModeToggle` bound to the live `useGlobalDark` source. (7) The Speedtest preset preview alpha clamped to 1 at the bake seam (the swatch shows COLOR, not runtime translucency). | configurator-occlusion CFG-1..5; goo BA-goo-1; darkmode BA-DARK-F1/F2; preset-preview PPD-1; waves-vs-reality WVR-2/3 |
| **W-GOO-REDRESS** | The goo studio's renderer half: (1) satellites keep the metaball bridge as the DEFAULT visible state — the full orbit envelope (nominal × random × ecc × wobble) stays inside reliable smin reach (or the orbiting phase widens) so the merge never instantaneously detaches; (2) pointer activity wires into the existing wake seam (`watch(pointer.active) → renderer.wake`) so first hover repaints same-frame with no accumulated-delta lurch. Coordinates with W-GLASS-CAL's chip-easing fix so R8-7's "jittery" is addressed once across both halves. | goo-studio BA-goo-2/3; disco BA-disco-04 |
| **W-DOCK-GEOMETRY** | The clipping cluster killed at the geometry root: (1) decouple the control plate diameter from the track cell height (`--dock-control-safe-inset` floors the block padding) so the 1.1× hover/active circle stays INSIDE the paint box; (2) the scroll-port + cross-axis clip companions engage ONLY on real over-cap content (both shell docks pass `overflow="scroll"` on fit-content shells today, force-clipping every control on every route); (3) the `contain: paint` escape audited for the hover plate's grow axis. | dock-clipping DC-1/2; rail-seat BA-RAILSEAT-3; waves-vs-reality WVR-6 |
| **W-FADING-SCROLL** | The library `<FadingScroll>` primitive (src/components/custom/fading-scroll/, subpath /fading-scroll): scroll-state-driven edge fades — the start edge feathers only past scroll>0, the end edge only while trailing overflow remains; `axis: 'x'\|'y'`; native scroll-driven primary (`scroll(self)` timeline) with the `useFadingScroll` JS fallback; the PresetPickerRow bespoke prototype promotes INTO it. The static scroll-state-blind `.scroll-fade-*` utilities RETIRE (clean break) once consumers migrate: preset strips + SegmentedTabs `overflow="scroll"` mask in this wave; configurator columns via W-CONFIG-CHASSIS (coordination note — configurator files belong to that wave); the rail chips + the booked embla-on-overflow momentum fold via W-DOCK-SECTIONS. Born with ≥2 consumers by construction. | fading-scroll FS-1/2/3; deferred DC-REC-7; R8-8 |

### Batch 3 — the dock re-conceived (2 waves, sequenced)

| wave | what + why | grounding |
|---|---|---|
| **W-DOCK-SECTIONS** | The 4th rail attempt as a RE-CONCEPTION (inv-6). (1) The tripartite nav-dock silhouette restored: rail-core (home/brand + primary affordance) · named SECTIONS · nav arrows — IN the dock, without the box-inflation that motivated W-RAIL3's deletion. (2) The declarative section-descriptor contract on DockLayerGroup (or a sibling `DockSection`): a consumer declares `[{kind:'rail-core'\|'section'\|'nav', …}]` and the chassis renders the dividers/grouping — the user's "abstract this into a re-usable component for layering" (route-binding stays demo-private). (3) The rail re-seat (hinge H3): the hairline anchors AT the dock's own divider seam, overruns BOTH edges, chips fan out FLUSH against the line, collapse=retract INTO the rail leaving a slight protrusion (the macOS-like fan-out, not curved). (4) SHELL-IA-N1 resolves naturally: the redesign decides whether one or two facet carousels survive. Rail chips consume `<FadingScroll>` + the embla-on-overflow momentum fold. | dock-sections BA-DSM-1/2; rail-seat BA-RAILSEAT-1/2; waves-vs-reality WVR-1/5; recap REG-2, RECAP2-R6; idiom IG-A3; deferred DC-REC-7/8 |
| **W-DOCK-MORPH-INSITU** | The dock's liquid-glass facilities demonstrated IN the shell (R8-2): a control that morphs the SidebarDock⟷BottomDock orientation live on the ONE `--dock-morph-t` scalar (the V↔H crossfade the showcase already proves), + the layering/contextual-switching system exercised in-situ on the shell docks. The teardrop fidelity advance is attempted under the SAME §7 mechanical-fall discipline as AZ (the 16.7ms budget decides; the crossfade remains the shipped floor). | dock-sections BA-DSM-3/4; waves-vs-reality WVR-9; deferred DC-REC-4 |

### Batch 4 — the glass grammar (5 waves, parallel, disjoint)

| wave | what + why | grounding |
|---|---|---|
| **W-SURFACE-AXIS** | ONE shared `surface` decoration axis (glass default · veil · opaque) factored the way `--glass-level` was — a shared prop/mixin on the same machinery — adopted uniformly: Card + GlassPanel (reconciled axes), Dialog, Sheet, Drawer, Popover, Command (veil option), ExpandableContainer (the fullscreen `bg-background` wall un-walls onto the overlay tier). Veil stops being a one-component novelty. Skeleton gains the over-glass register (translucent shimmer that lets the plate read through). | glass-variant-census GVC-3/5; fd-forms FD-4/6; idiom-gaps IG-B1/B3/B4/B5, IG-C2/C4/C5 |
| **W-FEEDBACK-TONE** | Tone rides ON glass, never as a solid fill: ONE shared tinted-glass tone recipe (`color-mix(in oklab, <glass rung bg>, var(--tone) N%)` over the floating rung + toned border/glyph) minted once and consumed by Toast AND Notification AND Alert — the three independent tone maps collapse. The demo's off-model raw-Tailwind tone swatches re-point to house tokens. The census gate gains teeth: `proof:glass-cohesion` extends to CVA variant arms/state-class maps + a render-side π assert that every tone variant composites translucent over a busy backdrop. | toast-glass F1..F4; glass-variant-census GVC-1/2/4; fd-feedback FD-FEEDBACK-TONE, FD-NOTIF-OFFMODEL |
| **W-MENU-GLASS** | The R5-10 fold (now ≥2 consumers: the library menu defaults + slides DeckSettings): the `.glass-menu-row` register minted ON the existing shared `menuItemVariants` CVA (glass-quiet hover-lift plate, 44px touch floor) + the `.glass-menu-section` mono-caption/hairline recipe — DropdownMenu/ContextMenu items become glass-by-default. | idiom-gaps IG-A2; recap RECAP2-R5-10; deferred DC-EXT-5 |
| **W-GLASS-CAL** | The two global calibrations. (1) BLUR: the six `--glass-blur-*-radius` primitives pull ~15–20% uniformly (quiet 10→8, resting 12→10, floating 16→13, overlay 15→13 + @2dppx 24→~20, dock 11→9; wash stays 1) — ONE knob-family edit, zero per-site change (token-first holds: no consumer hardcodes a radius). (2) DISCO RETIREMENT (hinge H2): btn-audacious/btn-audacious-gold recipes + sparkle-sweep/btn-gold-bg-sweep keyframes + the disco-grain knobs retire (clean break); the dock-tab PRIMARY tier's local grain re-implementation collapses onto the plain de-red'd glass hover register; toggle-chip re-points onto the §6 easing doctrine (the hardcoded duration-150 flat-snap dies). FENCED OUT (the good pops stay): `.gold-shimmer` static text gradient, the specular registers, the dock specular. | glass-blur-cal BA-BLUR-1/2; disco BA-disco-01/02/03/05; R8-18/19 |
| **W-PROGRESS-GRADIENT** | The sectioned Progress rebuilt on a single-fill paint model: ONE element spanning the cumulative filled extent drawn as ONE linear-gradient whose stops are the segment colors (hard stop-pairs hold a segment crisp; soft pairs blend the boundary) — the per-cell pill-capped fills, the 24px screen-blend seam band, and the dead notch all die. Pending phases keep their real hue at low alpha (a phase-tinted ghost, not a grey slab). The glass meter register lands: the track routes through `--glass-bg-quiet` + hairline boundaries (the IG-C1 gap). Geometry/measurement layer + prop boundary preserved. | progress-sectioned R8-14-1..4; idiom-gaps IG-C1 |

### Batch 5 — promotions (1 wave)

| wave | what + why | grounding |
|---|---|---|
| **W-ICON-CHIP** | The pop register abstracted: a library `<IconChip :icon :section/:tone>` primitive owning the color-mix backplate recipe + the chip≤glyph ratio + opt-in duotone (low-alpha section-color fill under the full-chroma stroke) / hover-bloom / entrance-reveal axes. The three copy-pasted demo recipes (icons.vue, empty-states.vue, settings.vue) collapse onto it; MetricCell's iconColor consumes. Born ≥2 consumers. | icon-pops POP-1/2/3 |

### Batch 6 — the demo staged to demonstrate (5 waves, parallel; depends Batch 1)

| wave | what + why | grounding |
|---|---|---|
| **W-STAGE** | The demo's backdrop system. (1) The per-category background map: every route declares (or inherits a category default) one of aurora/constellation/fourier/grid/paper — each with a REAL dark arm — within one-GL-per-route (the 80%-blank-void kill). (2) Glassiness demos float DIRECTLY over the live substrate: ShowcaseFrame gains a transparent/field-backed mode (owned HERE, including the caption band — see W-DEMO-AFFORDANCES coordination) so glass-material/card/veil stage over aurora with NO opaque bg-card between. (3) The token tours gain a contrast chassis: translucency swatches over a checkerboard/vivid reference field; the dense-grid layout kills the swatch→label dead-space. (4) The dock band gets a dock-stage chassis (one offscreen-paused procedural backdrop behind every dock demo). (5) The dark static washes recalibrate so grid/paper survive the card occlusion in dark. | page-backgrounds BG-1..6; fd-foundations FD-FS-1/2/3/5/6; fd-nav FD-DOCK-1; fdx FDX-1; dark-register DARK-4; hierarchy HS-3; R8-11/15 |
| **W-DEMO-AFFORDANCES** | The demo's controls made worthy. (1) ONE play-control register: a real glassy Button/DockIconButton with the Lucide Play glyph — the `.btn-pill`+`.glass-btn` mutually-exclusive-size-register stack dies (+ a negative-predicate proof against re-stacking). (2) ONE demo-trigger convention: a lone trigger sits content-width, never full-parent-width in column flex. (3) The demo container vocabulary collapses onto the glass-routed chassis (the hand-rolled bg-card/60 plates retire). (4) THE CURVE PICKER re-conceived as the dock-like glass chip rack (decided): each family a glass chip, selected = the `--glass-bg-floating` plate lift (immune to the contrast-color luminance race), `<FadingScroll>` as the overflow arm, the dead backdrop-filter on the transparent strip killed; all 12 families preserved as the IA. (5) The bottom-padding rhythm: ShowcaseFrame's captioned-frame affordance (the chassis footer band owns canvas→caption→edge rhythm off one token; coordination: ShowcaseFrame edits land in W-STAGE's file bound — this wave consumes). | demo-affordances BA-DEMO-AFF-1/2; waves-vs-reality WVR-4; curve-picker lane (all); fd-curve FD-CURVE-PICKER; fdx FDX-2/3; padding PAD-1/2; idiom IG-A4; R8-13/16/17 |
| **W-FOURIER-STUDIO** | The fourier band split into two registers (the aurora-studio idiom): the ambient background showcase stays; a FOREGROUND interactive studio lands with (1) the N-harmonics partial-sum axis (a 1..K slider truncating the spectrum + a visibly-assembling summed curve — the fourier-analysis web reference's signature); (2) epicycle-visibility and harmonic-sum as ORTHOGONAL axes (the fused hero/final enum stays for the ambient bundle); (3) the forward-DFT trace-a-shape demo (dftFromPoints fed a curated path library — the ℱ wordmark/heart/star) giving the exported-but-consumerless API its face; (4) a controllable clock (play/pause/scrub/speed on the house dock transport — consuming W-DEMO-AFFORDANCES's play register); (5) the W-MOTION3 live-steps generator fold (the steps sub-editor in the gallery rebuild). | fourier-demos BA-FOUR-1..6; deferred DC-REC-6; R8-10 |
| **W-SUFFUSE2** | The color identity spread within proportion: each category gets its ONE section-color identity (eyebrow + section-accent rail + one focal pop, the math-paper gold standard) off the page-by-page pop map; the content-page chrome `<h1>` lifts one rung above the section register (the display ladder grades instead of cliffing); the motion band reads ONE coherent generous violet event per page (within the one-color-event budget). `<IconChip>` (Batch 5) is the pop vehicle. | hierarchy HS-2/4; icon-pops POP-1; fd-motion FD-MOTION-VIOLET; fdx FD-COMP-STANDARD (the bar) |
| **W-ANIMATE** | The shipped facilities wired onto real surfaces (every animation is currently a demo-of-itself): page-enter orchestration minted ONCE in the story chassis (fade-rise body + [data-scroll-reveal] section stagger); a `.scroll-progress` bar on the shell scroller (native scroll() timeline); metric count-up on the audacious display numbers (useCountup gated by intersection, SETTLE register); ONE deliberate hero entrance (the display `<h1>` arrives with gravity, not bounce). All PRM-gated by construction. | animation-targets ANIM-1..5 |

### Batch 7 — close (2 waves, sequenced)

| wave | what + why | grounding |
|---|---|---|
| **W-REFLECT2** | The gestalt reflection: every named surface (dock, configurators+goo, aurora, glass+feedback, shell, motion+fourier, dark-register-as-a-surface, cross-repo) re-walked live on a real device, BOTH modes, whole-page captures + the explicit gestalt verdict per `proof:ba-gestalt`; any FAIL deploys the research→wave-spec→redress triumvirate and loops until the operative verdict is PASS. The completion bar AZ proved, now with the gestalt bar (inv-4) instead of the per-mechanism matrix. | precepts P-1; the AZ W-REFLECT precedent |
| **W-CLOSE** | The close battery + the cut: full gate battery on a clean runner; MIGRATION.md carries every clean break (disco retirement, tone recompose, scroll-fade retirement, PresetEditorField, surface-axis adoptions); version per hinge H4; npm publish with provenance via the v* tag; the DISPOSITION-REGISTER ~28 BOOK rows re-stamped via proof:disposition-live (NOT folded — L inv-8); the externally-owned rows (fourier-analysis tabs + phantom-classes, value.js self-alias) re-flagged; R5-9 (page-turn) trigger re-evaluated at close (stays external-gated per DC-EXT-5 unless a 2nd consumer materialized); FINAL.md; the slides adopt/deploy book (exact-pin the BA cut + retire any interim arms) hands to the slides session. | deferred DC-CHR-3, DC-EXT-1/2/3/5; the az-final precedent |

## Scope fences

- The GL shader internals (aurora.frag, metaball.frag) are fence-locked except W-GOO-REDRESS's
  named smin/orbit envelope seam.
- ppmycota purple never enters library tokens (the W-SUFFUSE2 motion violet stays demo-local).
- The slides M docs are foreign; the adopt/deploy book at W-CLOSE hands off, never edits.
- R5-9 (deck page-turn) stays external-gated on its 2nd-consumer trigger (DC-EXT-5's verdict
  over the recap lanes' lift-now reads — the deepest analysis wins); re-evaluated at W-CLOSE.
- The ~28 DISPOSITION-REGISTER BOOKs are re-stamped, not folded (folding violates L inv-8);
  opportunistic folds only where a BA wave independently touches the surface.
- `:5210` is the user's audit instance; gates default `:5199`.

## Goal criterion (the tranche)

The demo IS the proof: every named surface reads as a designed whole in BOTH modes on a
real device — dark glass transmits, tones ride on glass, the dock's sections/rail/morph
demonstrate the library's own facilities, the configurators are usable instruments, the
disco is gone, and the gestalt bar (not a mechanism matrix) says so.

## Completion criterion (the tranche)

`proof:ba-gestalt` operative-PASS for every roster surface (whole-page, both modes, real
backdrop, fresh content-hash captures); the four S1 regressions hold their redress
verdicts; the full battery green on a clean runner; the BA cut published with provenance;
MIGRATION.md reconciled; FINAL.md authored with zero unnamed deferrals.
