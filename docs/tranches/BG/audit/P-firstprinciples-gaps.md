# P-firstprinciples-gaps — "what are we MISSING?" (the new-capability frontier)

**Audit lens.** Treat glass-ui as a SOTA iOS-27-grade liquid-glass design system and ask, from
scratch, what it LACKS or does poorly — not the 13 confirmed defects (those are the sibling D-*
audits' bulk; the defects are FIXES, this audit is genuinely-MISSING CAPABILITIES). The scope is
gestalt ADDITIONS: component-coverage vs a complete DS, motion completeness, glass material
fidelity against the iOS-26 Liquid-Glass vocabulary (lensing / specular / refraction /
adaptive-shadow / hue-bleeding transmission), dark↔light parity, a11y, perf, demo/doc quality,
theming/tokens, the Safari story, and the new-capability frontier (the Siri waveform + glass island
the user wants, integrated with the dock).

Verified against real HEAD source (`src/`, `DESIGN.md`, `src/api/index.ts`, the component
inventory, `IOS27-REFERENCE.md`). Default-broken skepticism: assume 4.2.0 is incomplete until the
source proves otherwise.

---

## THE HEADLINE FINDING (single highest-severity)

**The Siri glass-island + warm waveform — the user's explicit new-capability triumvirate — has ZERO
visual surface in `src/`. The MATH ships; the COMPONENTS do not.** `waveformValue` is re-exported
through `/motion` (`src/composables/motion/suite.ts:54` — a keyframes.js static primitive), so the
amplitude-envelope evaluator is in hand. But there is **no `<SiriWaveform>`, no `<GlassIsland>`, no
Dynamic-Island register, and no descend/morph-over-content seam** (grep `siri|waveform|island` in
`src/` returns ONLY `suite.ts:54` + a `dock/README.md` proof-gate mention of a demo "Dynamic Island
Call" that is a *fission demo*, not an island component). The user's reference is concrete (a
floating glass pill that descends over content, answers "2 plus 2 is 4." with a warm under-glow,
with the amber/orange/pink waveform pulsing under it; plus the home "Search or Ask" pill + the
Dynamic Island). The dock-hub greenfield (`docs/tranches/BD/greenfield/dock-hub/`) explored
"dynamic island" only as a *fission lens* — it never specced an island PRIMITIVE. This is the
single largest genuinely-missing capability, and the user named it explicitly as the BG headline
("the Siri references … the new-capability triumvirate"). Everything else in this audit is coverage
or fidelity polish; THIS is a first-class new surface family the library does not have.

---

## FINDINGS — what is actually missing at HEAD (file:line evidence)

### F1 — Siri island + waveform + dynamic-island: a whole capability family absent

- `src/composables/motion/suite.ts:54` re-exports keyframes.js `waveformValue` (the math). That is
  the ONLY trace. No SFC, no `/siri`, no `/island`, no `/waveform` subpath; nothing in
  `src/api/index.ts` (the discovery surface lists ~70 public symbols — none island/siri/waveform).
- `src/components/custom/dock/README.md:325` references a demo "Dynamic Island Call" that is an
  ACTUAL `useDockFission` (a metaball split), NOT a persistent island surface.
- The dock's whole vocabulary is NAV/MEDIA/morph (`GlassDock`, `useDockFission`,
  `useDockContextSilhouette`); there is no "an island descends from the top, hovers over content,
  hosts a transient query/answer, then retracts" register. The Siri island is a TOP-anchored,
  transient, content-overlapping, glow-bearing, waveform-hosting pill — orthogonal to the
  bottom/side persistent dock.
- The warm under-glow + waveform palette (amber/orange/pink) is a NEW chromatic register: the
  library's identity is warm-cream + the section-color ramp + the metal triad; there is no
  "luminous Siri-warm" gradient family.
- **Why it's missing, not deferred:** BD specced the dock-fission frontier (`IOS27-REFERENCE.md`
  T1–T17) but the Siri island is NOT in that reference set (those clips were Music/Control-Center/
  dotflow). The user introduced the Siri recordings as a SEPARATE BG ask. It was never planned.

### F2 — Component-family coverage gaps vs a "complete" design system

The library is component-RICH on glass/dock/viz/motion but has standard DS families absent. Checked
against `src/components/ui/` (43 dirs) + `src/components/custom/` (50 dirs):

| Missing family | Status | iOS-27 / DS relevance |
|---|---|---|
| **Calendar / DatePicker** | absent | A complete DS ships date selection; the dropdown/popover substrate exists, the calendar grid + roll-picker does not. iOS date wheels are a signature interaction. |
| **Breadcrumb** | absent | Standard nav primitive; `Separator` + `link` exist but no breadcrumb composition. |
| **Pagination** | RETIRED (`useOffsetPagination` removed L.W3, 0 consumers) | `PagerDots` covers dot-rail; numbered page nav is gone. Re-mint only if a consumer surfaces. |
| **Menubar** | absent | macOS-style top menubar; `DropdownMenu` substrate exists, the menubar composition does not. |
| **Resizable / split-pane** | absent | Panel-group drag-to-resize — a workspace-chrome staple. |
| **ScrollArea** (styled custom scrollbar) | absent | `FadingScroll` covers edge-fade; a styled-scrollbar overlay primitive is distinct. iOS uses overlay scrollbars. |
| **AspectRatio** | absent | Trivial but standard layout primitive (media embeds). |
| **Chart / data-viz** | absent (`grep echarts/recharts` → 0 in `src/components/`) | The viz suite is GENERATIVE (aurora/goo/dot-flow/fourier) — beautiful but DECORATIVE. There is NO data chart (line/bar/area/sparkline). A consumer plotting real data has nothing; `--chart-*` color tokens exist with no chart to consume them. This is the biggest *functional* coverage gap. |
| **Kbd** | absent | Keyboard-key glyph chip; `formatCombo` (keyboard composable) computes the string, no visual `<Kbd>`. |
| **Stepper / Steps** | absent | Multi-step flow indicator (distinct from `Timeline`/`Progress` — a discrete numbered wizard). |
| **Tree / TreeView** | absent | `useTreeIndex` (sidebar) builds a flat index; no interactive expand/collapse tree COMPONENT. |
| **FileUpload / Dropzone** | absent | Drag-drop file intake — a standard form surface. |
| **Rating** | absent | Star/segment rating input. |
| **Toggle-tip** | absent | Tap-to-reveal info (distinct from hover `Tooltip` — the a11y-correct mobile pattern). |

NOTE: not all of these earn a wave (the ≥2-consumer + no-contrivance bar binds). The HIGH-value
real gaps are **Calendar/DatePicker** (iOS-signature interaction + form completeness) and a
**data-Chart family** (the only thing a real data app cannot do at all). The rest are
catalogue-completeness candidates, mostly LOW.

### F3 — Glass material fidelity: the iOS-26 vocabulary is ~85% present, 3 terms genuinely absent

The six-layer composite (`DESIGN.md §L1`) ships: backdrop blur+saturate, surface tint, edge rim,
inner catch-light, drop shadow, grain. The refractive lens ships (`glass-refract.css` — the squircle
bevel-profile displacement map, Snell n₂=1.5). Specular tracking ships (`glass-specular-track.css`).
But three iOS-26 terms are MISSING or DEAD:

- **Adaptive / MOVING shadow is documented but NOT IMPLEMENTED.** `DESIGN.md §Shadows` promulgates
  "The cast is a MOVING cast … the cartoon-shadow offset slides opposite the motion … a `transform`
  on a `::after` shadow-caster layer." Grep for the mechanism (`adaptive.shadow`,
  `shadow.*track`, `drop-shadow.*pointer`) returns ZERO hits in `src/styles/`. The MOVING-shadow
  register is **prose only** — a documented capability with no source. iOS-26 glass casts a depth
  shadow that shifts with elevation + gesture; glass-ui has static `--glass-shadow-*` + a static
  `--shadow-cartoon-*`. The §L4 "cartoon cast travels with the gesture" is unbuilt.
- **The displacement `scale` is a BAKED LITERAL — the press lens-swell is DEAD.** `glass-refract.css`
  header (DDR-LENS-BAKE) admits the typed `--glass-refract` axis was reverted to `scale='28'`
  because a CSS `var()` cannot drive a data-URI `feDisplacementMap scale` (CSSWG #542). So the
  documented "glass DEFORMS under press" (the `:active` lens-swell coupling `--glass-btn-press-t`)
  does NOT animate the refraction — the lens is static-depth. The runtime-animatable refraction is a
  genuinely-open frontier (needs an in-document inline-SVG mount with a live `<animate>`/JS scale,
  the booked encoding-successor).
- **Chromatic aberration (RGB-split rim) is BOOKED, never built.** `glass-refract.css` notes "the
  chromatic-aberration RGB-split rim is a booked successor." Real glass disperses; the rim should
  split R/B at the edge. Absent.
- **Hue-BLEEDING transmission is absent (the T7 gap, IOS27-REFERENCE).** `useGlassBackdropLuminance`
  (`src/composables/glass/useGlassBackdropLuminance.ts`, 542 lines) samples LUMINANCE only — it
  writes `--glass-backdrop`/`-luma` but NO dominant-HUE term. So a dock over a purple card darkens
  but does not pick up the purple (the iOS "the glass bleeds the backdrop hue" signature, T7
  HEADLINE). The `--glass-accent` per-instance rim axis (BB.W-GLASS-ACCENT) exists to receive a hue;
  the SAMPLE that feeds it is missing. This is a real BUILD (a chroma term on the observer).

### F4 — Motion completeness: the grammar is rich but two registers are missing

The motion suite is deep (springs, `useLiquidFlex`, `useLiquidReveal`, `useDragMorph`,
`useDockFission`, `useScrollTrigger`, `useScrollChrome`, `usePointerVelocityField`, the cartoon
punch curve). Two genuine gaps:

- **Backdrop-blur ENGAGE transition is absent (T9).** No primitive ramps `backdrop-filter` blur
  0→deep as an overlay pulls over the live app. `.glass-deep`/`--glass-depth` lerps blur but only as
  a static-tier substitution, not a TRANSITION scalar coupled to a sheet translate. The Siri island
  DESCEND (the app reads through a deepening blur as the island pulls down) needs exactly this. The
  drawer detent-glass (T6) needs it too (`--glass-drawer-t → --glass-level` opacity coupling is
  absent; `shouldScaleBackground` is a documented DEAD knob).
- **A generalized liquid-ENTRANCE (T10) is not generalized.** `.glass-reveal` blooms only top-layer
  reka overlays; CARDS, controls, list-items, dock-modules do NOT get the control-center-grade
  squish-grow entrance. The default squish is subtle (~0.95); the reference squishes ~0.88
  (clear vol-preserving deformation). The user's literal "replicate generally, Safari-compatible"
  ask. (This is partly a defect/calibration item the D-* audits touch, but the GENERALIZATION — a
  `v-liquid-enter` every surface opts into — is a missing capability.)

### F5 — Demo / documentation quality: the storybook is the spec but reads as a museum, not a system

- **No live-data chart demo, no real-content category previews.** The category cards show
  icon+thumbnail (a sibling D-category-previews finding); the absence of a chart family means even a
  fixed demo cannot show data viz.
- **The dock-gallery is a museum of CLONED Apple apps** (dock-hub GOLDEN §3:
  `examples/{AppleMusic,AppSwitcher,Spotlight,VolumeHUD,…}` hardcoding "Costco Wholesale", a barber,
  `{ label: "Maps" }`). This is overfit demo content in the demo tree (not `src/`, but it's the
  documentation surface). The Siri island, properly built, would REPLACE the cloned "Dynamic Island
  Call" with a real library primitive demo.
- **No interactive token-playground for the NEW registers** (the configurator is broken per the
  confirmed defects; even fixed, it edits the legacy token set, not the glass-accent / deep-glass /
  island registers).

### F6 — Theming / tokens: warm-cream identity is strong; two register gaps

- **No "Siri-warm luminous" gradient family** (amber→orange→pink) — needed for the island under-glow
  + waveform. The gold triad + section ramp + rainbow exist but none is the soft luminous Siri amber.
- **No `--glass-shadow-tracked` / adaptive-shadow token** (the moving-cast §Shadows prose has no
  token home). A moving cast needs a `--shadow-cast-dx/dy` driver coupled to `--motion-weight`.
- The token architecture itself is sound (§Feature-token-home rule, the `--glass-*` ladder,
  `--glass-level`/`--glass-depth`/`--glass-accent` three-axis composition). The gaps are NEW
  registers, not a restructure.

### F7 — A11y + perf + Safari: solid floors, two frontier gaps

- A11y brackets ship (11 files carry `prefers-reduced-transparency`, 9 carry `prefers-contrast`;
  PRM is pervasive; WCAG-2.2.2 pause on viz). The floors are GOOD. The Siri island, when built, must
  inherit them (transient overlay → focus management, `aria-live` for the answer, PRM-calm waveform).
- **Safari metaball/lens parity is a STANDING risk, not a measured pass.** §L7 mandates a paired
  Chromium+WebKit π for every goo/lens precept; the actual verification cadence is uneven (the
  `proof:ba-gestalt` runs Chromium; WebKit is hand-asserted). The Siri waveform (canvas/SVG) +
  island (glass + glow + descend) is a NEW surface that must be Safari-verified at birth.
- Perf: the viz suite is offscreen-paused + PRM-frozen (good). A descending island over a live app +
  a 60fps waveform is a NEW perf surface (the waveform should be compositor/canvas, parked when the
  island retracts).

---

## ROOT CAUSES (gestalt, first-principles)

1. **The library grew along the DOCK/GLASS/VIZ/MOTION axes the BD references drove, and never along
   the "complete application design system" axis.** Every recent tranche (AX..BF) deepened liquid
   glass + the dock + the generative viz. Nobody asked "can a consumer build a real DATA app?" — so
   the chart family, the calendar, the tree never landed. The library is a *glass-material showcase*
   that is component-incomplete as a general DS.

2. **The Siri island is a NEW reference the planning never saw.** BD's reference set was four Music/
   Control-Center clips + dotflow. The Siri recordings arrived with BG. The `waveformValue` math
   shipped opportunistically (it rode the keyframes.js suite re-export), but no one connected it to a
   visual surface because no plan named one.

3. **iOS-26 glass fidelity was built as a STATIC material, and the DYNAMIC terms (moving shadow,
   animatable refraction, hue-bleed transmission, chromatic aberration) were each "documented +
   booked" rather than built** — they hit CSS limits (the `var()`-driven `feDisplacementMap scale`
   wall, CSSWG #542) and got prose'd instead of solved with an inline-SVG-mount transposition. The
   §Shadows "moving cast" and §L1 "glass DEFORMS under press" are the most-visible prose-vs-source
   gaps.

4. **The demo is a museum of clones, not a living system.** The dock-gallery cloned Apple apps to
   *prove* the engines, which is the right instinct for a fidelity bar but the wrong artifact for a
   design-system spec — it reads as "look, we copied iOS," not "here is the vocabulary, compose it."

---

## PROPOSED WAVES (prioritized — each a gestalt ADDITION, not a fix)

### BG.W-SIRI-ISLAND (HEADLINE — the new-capability triumvirate, the user's explicit ask)
- **Intent:** ship the Siri glass-island family as first-class library primitives, deftly integrated
  with the GlassDock system — a top-anchored transient glass pill that descends/morphs over content,
  hosts a query/answer with a warm under-glow + the luminous waveform, and retracts.
- **Approach (idiomatic, gestalt):** ONE new component family `/glass-island` (off the root barrel —
  the focal-opt-in posture, BorderProgress precedent): `<GlassIsland>` (the descend/morph/retract
  surface composing the SHIPPED `useLiquidReveal`/`useLiquidFlex` source-rect bloom + the
  `--glass-deep` tier + a NEW `--glass-blur-engage-t` backdrop-engage ramp so the app reads through a
  deepening blur as it pulls down) + `<SiriWaveform>` (a compositor/canvas waveform driven by the
  SHIPPED `waveformValue` evaluator — NO new math; the warm amber/orange/pink luminous gradient is a
  NEW `--siri-*` token family in `tokens.css`, presets-in-consumers for the consumer hue). The island
  REUSES the dock context (`useDockContext`) so it can morph FROM the dock (the Dynamic-Island
  bridge) — a SECOND register on the dock-hub spine, NOT a fork. Dynamic-Island = the island docked
  at the top; the descend is the same `useLiquidReveal` FLIP from the top-anchor rect.
- **Files:** new `src/components/custom/glass-island/` (component + `composables/useGlassIsland.ts` +
  `SiriWaveform.vue` + `useSiriWaveform.ts` + `constants.ts` + `README.md`),
  `src/styles/glass/island.css`, `src/styles/tokens.css §SIRI`, `src/api/index.ts` (publish),
  the `/glass-island` subpath, a demo replacing the cloned "Dynamic Island Call."
- **π / acceptance:** a frame-series — the island descends (source-rect FLIP from the top), the app
  reads through a deepening backdrop blur, the waveform pulses on the warm gradient driven by
  `waveformValue`, the answer is `aria-live`-announced, PRM → calm static waveform + instant
  descend, BOTH engines (Chromium + WebKit, the §L7 paired bar). Born-RED (no island exists).
- **Folds:** the T9 backdrop-blur-engage gap (the island's descend NEEDS it), the dock-hub
  "dynamic island" lens (built as a real primitive, not a fission demo).

### BG.W-GLASS-DYNAMICS (the iOS-26 DYNAMIC material terms — moving shadow + live refraction + hue-bleed)
- **Intent:** build the three documented-but-absent dynamic glass terms so the material is alive, not
  a static six-layer plate.
- **Approach:** (a) the MOVING cartoon/glass cast — a `::after` shadow-caster `transform` driven by a
  NEW `--shadow-cast-dx/dy` coupled to `--motion-weight` (the §Shadows prose made real, compositor-
  only, never an animated `box-shadow`); (b) the live-animatable refraction — transpose the baked
  `feDisplacementMap scale='28'` onto an in-document inline-SVG `<filter>` mount with a JS-driven
  `scale` (the booked encoding-successor) so the press lens-swell (`--glass-btn-press-t`) actually
  deforms the backdrop; (c) the chroma/hue-bleed observer term — extend `useGlassBackdropLuminance`
  to sample a dominant-HUE term feeding the bounded `--glass-accent`/`--glass-accent-strength` (the
  T7 chroma-sample, wire SAMPLED hue into the rim+core); (d) the chromatic-aberration RGB-split rim
  (booked successor, the dispersive edge).
- **Files:** `src/styles/glass/material.css` + a new `shadow-cast.css`,
  `src/composables/glass/useGlassBackdropLuminance.ts` (the chroma term),
  `src/components/custom/dock/GlassDock.vue` (opt the media-dock into `.glass-deep`), `DESIGN.md`
  (retire the prose-only claims onto live source).
- **π / acceptance:** the cast measurably travels opposite the gesture (born-RED on static); the
  press lens-swell shows a non-zero displacement-scale delta under `:active`; the dock over a purple
  card resolves a measurably purple-shifted rim/core hue and re-neutralizes (born-RED on the
  luminance-only observer); BOTH engines.
- **Folds:** IOS27-REFERENCE T6 (drawer detent-glass coupling) + T7 (hue-bleed) — the chroma term is
  shared; the drawer's `--glass-drawer-t → --glass-level` coupling rides the same dynamic-material
  build and retires the `shouldScaleBackground` dead-knob.

### BG.W-CHART-FAMILY (the only thing a real DATA app cannot do — the functional coverage headline)
- **Intent:** ship a first-class glass data-chart family (line / area / bar / sparkline) so the
  `--chart-*` tokens have a consumer and a real data app can plot.
- **Approach:** a thin SVG-path chart family (NO heavy charting dep — the native-first identity; the
  `useGpuSubstrate` is for generative viz, charts are SVG) composing the SHIPPED motion
  (`useAnimatedNumber` for value transitions, `useScrollTrigger` for reveal) over the glass tier; the
  axes/grid read the `--chart-*`/`--color-divider-*` tokens already in `DESIGN.md`. KISS: line/area/
  bar are ONE `<GlassChart :type>` axis; sparkline is a size variant. Charts get the four-state +
  a11y contract (focusable points, `aria` value readout).
- **Files:** new `src/components/custom/glass-chart/`, `src/api/index.ts`, the `/glass-chart`
  subpath, a `demo/stories/data/chart.vue`.
- **π / acceptance:** a chart renders real data over the glass tier, the value transition damps via
  `useAnimatedNumber`, points are keyboard-reachable + `aria`-labelled, BOTH modes. ≥2-consumer bar:
  the demo + the speedtest cross-repo consume (it plots throughput — the foreign-tree fence; its edit
  lands in its repo). If the ≥2 bar is genuinely unmet at HEAD, this DECIDES (build-with-booked-2nd)
  rather than rebook.

### BG.W-DATE-CALENDAR (form-completeness + the iOS date-wheel signature — MEDIUM)
- **Intent:** ship Calendar + DatePicker so the form family is complete and the iOS roll-picker
  interaction has a home.
- **Approach:** `<Calendar>` (the month grid over the popover/glass substrate) + `<DatePicker>`
  (trigger + calendar) + an iOS roll-wheel mode (the spring-snap detent, reusing `useDragMorph`'s
  fling-to-nearest). Composes the SHIPPED `Popover`/`Select` chrome + the spring register; no new
  engine. The four-state + a11y (grid `role`, arrow-key navigation) contract.
- **Files:** new `src/components/ui/calendar/` + `src/components/custom/date-picker/`,
  `src/api/index.ts`, subpaths, demo.
- **π / acceptance:** the calendar grid is keyboard-navigable (WAI-ARIA grid), the roll-wheel
  spring-snaps to a date, the surface is glass over a busy backdrop, BOTH modes.

### BG.W-DS-COMPLETE (catalogue completeness — the LOW-priority family fill, decide-don't-overfit)
- **Intent:** close the standard-DS family gaps that earn their keep (≥2 consumers / no contrivance):
  `<Kbd>` (the keyboard-key glyph, consuming `formatCombo`), `<Breadcrumb>` (nav composition),
  `<Stepper>` (the discrete wizard, distinct from Timeline), `<TreeView>` (interactive expand
  over `useTreeIndex`), `<AspectRatio>` (the trivial layout primitive). Each DECIDES build-or-retire
  against the ≥2-consumer bar — no speculative substrate (the J-inv-10 floor). Resizable / ScrollArea
  / FileUpload / Rating / Toggle-tip / Menubar / Pagination are CENSUSED with a build-or-defer verdict
  (most defer — no consumer at HEAD).
- **Files:** new dirs per built family, a `docs/tranches/BG/audit/DS-COMPLETENESS-census.md` roster.
- **π / acceptance:** each built family carries the four-state + a11y + glass-tier contract; each
  deferred family carries a recorded rationale (the no-silent-gap floor). LOW priority — this is the
  catalogue tail, sequenced after the headline capabilities.

### BG.W-LIQUID-ENTRANCE-GENERAL (the generalized entrance — the user's "replicate generally" ask)
- **Intent:** a `v-liquid-enter` directive + `.liquid-enter` recipe EVERY surface class opts into,
  with the calibrated graceful squish (~0.88 vol-preserving + snappy-bouncy overshoot, fade-coupled),
  PRM-carved, compositor-only, Safari-verified.
- **Approach:** AUGMENT `useLiquidReveal` (no re-fork) — compose `.glass-reveal` + `useLiquidFlex`
  squish into one opt-in directive that cards/controls/list-items/dock-modules wire. The grammar
  ships (IOS27-REFERENCE T10 ~65%); the GENERALIZATION + grace-calibration + Safari π is the gap.
- **Files:** `src/composables/motion/` (the directive), `src/styles/glass/liquid-enter.css`
  (already exists — extend it), the enrolled surface SFCs.
- **π / acceptance:** a frame-series — the entrance squishes (scale≠1 mid-flight + X·Y≈1) + fades +
  settles with overshoot on the enrolled surfaces, BOTH engines, born-RED on flat/instant; the
  dismiss is the squish+fade inverse with NO overshoot-past-gone.
- NOTE: this overlaps the D-* defect audits (the entrance is partly broken at HEAD); this audit owns
  the GENERALIZATION-as-capability framing — coordinate the wave-id with the sibling.

### BG.W-SAFARI-PARITY-GATE (the cross-engine floor made a real cadence — frontier hardening)
- **Intent:** make §L7's paired Chromium+WebKit π a STANDING gate, not a hand-assertion, so every
  new BG glass/goo/island/waveform surface is Safari-verified at birth.
- **Approach:** extend the `proof:ba-gestalt` / π-runner to run the WebKit project on the
  glass/goo/island roster (the metaball waist, the lens, the island descend, the waveform) and assert
  parity; the NEW BG surfaces (island, waveform, dynamic glass, chart) enroll at birth.
- **Files:** the π-runner manifest, the WebKit project config, the new surface specs.
- **π / acceptance:** the enrolled roster passes BOTH projects; a WebKit-only defect reds. This is the
  hardening floor under all the above (the Siri waveform + island + dynamic glass are the highest
  Safari risk).

---

## RETIRE / DECIDE (no silent gaps)

- **`useOffsetPagination` (pagination) stays RETIRED** unless a consumer surfaces — `PagerDots` covers
  the dot-rail; numbered pagination is a real-but-unconsumed gap (record, don't rebuild speculatively).
- **The cloned-Apple-app dock-gallery** is the demo overfit; BG.W-SIRI-ISLAND replaces the cloned
  "Dynamic Island Call" with a real primitive — the rest of the gallery is the sibling demo-arch
  audit's scope.
- **The chromatic-aberration RGB-split rim** is a real iOS-26 term; it rides BG.W-GLASS-DYNAMICS as a
  booked sub-arm (build-if-the-displacement-mount-lands, else recorded-deferred — never re-prose'd).

## Priority order

1. **BG.W-SIRI-ISLAND** — the user's explicit headline new capability.
2. **BG.W-GLASS-DYNAMICS** — the iOS-26 material is static; the dynamic terms are the fidelity
   frontier + folds T6/T7.
3. **BG.W-CHART-FAMILY** — the only thing a real data app cannot do.
4. **BG.W-LIQUID-ENTRANCE-GENERAL** — the user's "replicate generally, Safari-safe" ask.
5. **BG.W-DATE-CALENDAR** — form completeness + the iOS signature.
6. **BG.W-SAFARI-PARITY-GATE** — the hardening floor under all the new surfaces.
7. **BG.W-DS-COMPLETE** — the catalogue tail (LOW, decide-don't-overfit).
