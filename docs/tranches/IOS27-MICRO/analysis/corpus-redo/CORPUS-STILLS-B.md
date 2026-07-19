# CORPUS-STILLS-B — the stills re-do, seat B (IOS27-MICRO corpus-redo)

Verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat: corpus:STILLS-B.
Corpus: 10 stills from `/Users/mkbabb/Downloads/New Folder With Items 4` — the June-21-late pair
(15.26.49/.54), the June-22 set (11.32.12/.18, 13.30.41, 13.58.05, 14.32.01), the June-23 combobox,
and the two texture references (images-2.jpeg, METAL FLOW). The seat charter says "12 items" but
enumerates 10 files; the folder holds nothing else matching the enumeration — 10 covered, the
count discrepancy recorded honestly. No video frames extracted (stills seat; the 15.26.x and USF
crops are desktop screenshots of video/app surfaces — no t0+fps contract applies). Measurement
scripts + provenance: scratchpad `corpus-redo/stills-b/` (measure1/2/3.py + README).

Method: PIL/numpy pixel probes — luminance-threshold run detection, radial profiles, circle fits on
corner traces, WCAG relative-luminance contrast, column-profile band detection for the ribbon find,
two-frequency texture statistics. All px are ORIGINAL image px; the 15.26.x crops carry an unknown
device scale, so RATIOS are preferred over absolute pt there. Marks: **MEASURED** (a number off
pixels), **BOUNDED** (a bracket the pixels support), **INCONCLUSIVE** (said so). Prior canon =
`refable-timelines/stills.md` + MARKS-A/B + IOS27-CODEX; fresh measurement wins every disagreement
and the correction is explicit; agreement is cited, not re-derived.

The two lenses per the user order: (1) THE BREATH OF LIFE — where engagement lives, which of the
six roster scalars the surface expresses (SUFFUSION §3.1: `--flex-vel`, `--motion-weight`,
`--engage-t`, `--overpull`, `--impulse`, `--scrub-t`), the momentum regime with codex laws cited by
number; (2) THE FULL COMPONENT SET — component, register taught, shipped state verified on disk
2026-07-19 (HAS/LACKS/CONTRADICTS, file:line pins). The on-disk scalar census is CORPUS-STILLS-A's
(same ground truth, cited not re-derived): `--motion-weight` 19 files, `--flex-vel` 5,
`--atom-drag-v` 3; the four new roster scalars in 0 — pass-2 work, as SUFFUSION §3.1-3 charters.

---

## Asset 1 — Screenshot 2026-06-21 at 15.26.49.png — the media pill (Live Activity, single lobe)

### Design register (crop 656×282; device scale unknown — ratios govern)

| property | fresh value | prior canon | verdict |
|---|---|---|---|
| pill | 460×128px, full stadium (mid-height edge reaches the bbox: r = h/2 = 64) | "~130px tall" | RATIFIED (MEASURED) |
| surface | (246,240,232) warm cream | cream | RATIFIED — the warm family again (STILLS-A Assets 9/12) |
| art block | 96×96px, inset 14px from the left cap, 16px vertical | art ~96px, "~24px radius" | geometry RATIFIED; radius CORRECTED below |
| art corner | circle-fit r≈15–16px ≈ **16% of side** (insets (0,13)→(4,5)→(8,2)→(13,0)) | "~24px radius (squircle-adjacent)" | **CORRECTED** — the fit reads the app-icon rounded-square class (codex law 4 "~22%"), smaller than prior est; continuous corners make the perceived radius read larger than the circle fit |
| action | a filled tone-on-tone DISC: d=72px = 0.56×pill-height, L 245.3 vs pill 240.8 (**+4.5L, ~2% lighter**), dark triangle glyph 24×26px, NO stroke — radial profile is flat 245.3 from r16–35 and steps smoothly to 240.8 at r36–37 with no dark dip | "outlined-circle play button… thin-ring action circle" | **CORRECTED** — no ring outline exists; the circle read comes from the disc's luminance step |
| inks | title (64,56,47) warm near-black; artist mid warm (~161,152,141 blended) | title dark, artist warm brown | RATIFIED |
| shadow | **MEASURED ZERO** — ΔL < 0.7 over 40px below the pill (217.5→218.1, the ambient gradient's own direction) | — | new; matches STILLS-A's 14.38.58 zero-shadow law |
| backdrop | peach gradient (223,181,158)→(231,215,194) — the pill floats unanchored | RATIFIED | |

### Lens 1 — breath of life

The idle rung of a LIVE surface: material only, zero shadow theater, warmth in the ink (SUFFUSION
§1.1 idle — no light events at rest). What is never static on the living original: the marquee
(state continuous through shape, law 17) and the artwork as identity thread (law 5 origin-anchored
growth to the expanded sheet pole — STILLS-A Asset 11 is this pill's other pole). Engagement lives
as potential: the play disc is a momentary control (A-row press-charge; `--engage-t` first awake),
the pill body is the collapsed pole of a two-pole morph (`--scrub-t` when the drag owns it, law 15
tracked regime; release = fired ~350ms morph). The action staying tone-on-tone (+4.5L, not a filled
accent) is the one-saturated-accent doctrine at its quietest — color identity lives in the art
block only (law 2 corollary).

### Lens 2 — components touched (pins verified on disk 2026-07-19)

- **toast** — the Live-Activity register's nearest roster kin. HAS the tracked swipe scrub:
  `src/components/toast/Toast.vue:103` (`data-[swipe=move]:translate-x-… data-[swipe=move]:transition-none`
  — 1:1 while the finger owns it, law 15) and per-position stacking anchors
  (`src/components/toast/Toaster.vue:48-51`). LACKS the persistent-live class: a toast that stays,
  self-updates in place (law 17 upgrade-in-place), and carries art/action anatomy — the media pill
  teaches a `live` register (persistent, weight-0 self-updates, art + two-line + tone-on-tone
  action) distinct from transient notice. BJ candidate, not new physics.
- **button** — the tone-on-tone disc action: our ghost/glass button rungs carry it
  (`src/styles/glass/glass-capsule.css:1-21` — the ONE shared capsule register: lifted lozenge,
  hover/press rungs). HAS. Register note: the exemplar's action chip is +2% L over its container —
  a whisper the two-tier split already licenses.
- **avatar/card art** — the 16%-radius rounded-square content block on a stadium: content-tier
  saturation on neutral glass, HAS by construction (the STILLS-A Asset 8 doctrine).
- **skeleton/marquee** — the marquee (overflow text keeps its offset through morphs) has no roster
  bearer; `typewriter` is cadence, not overflow scroll. LACKS (trace — only if a consumer asks;
  overfit fence).

---

## Asset 2 — Screenshot 2026-06-21 at 15.26.54.png — the goo capsule (Timer + music, the canonical law-6 reference)

### Design register (crop 658×262)

| property | fresh value | prior canon | verdict |
|---|---|---|---|
| body | 538×112px, two lobes + meniscus waist | — | MEASURED |
| lobes | left 234px, right 235px — **equal to 0.4%** | — | new — the lobes render mass-equal |
| waist | height 66px at x=332 → **0.59 of lobe height** (bracket 0.55–0.63 across threshold choice) | "waist ~45-50% of lobe height" | **CORRECTED — 59%**, the neck is fuller than canon; codex law 6's cited number needs the amendment |
| neck | span 69px wide (≈ 1.05× waist height), pinch depth ~23px top / ~22px bottom — **symmetric** | "concave neck curvature roughly mirrors the capsule radius" | BOUNDED — the traced arcs are consistent with r≈50–70px concave fits vs lobe radius 56; symmetry now measured |
| content vs waist | ink pixels inside the neck span: **0** | "content never crosses the waist" | **MEASURED — RATIFIED exactly** |
| timer ring | d≈71px (0.63 lobe height), maroon arc coverage **~63%** (mid-stroke 0.628; 0.54–0.69 across the 6–7px stroke; gap ~134°), grey track remainder, mono countdown centered | "ring progress ~85%" | **CORRECTED — 63%** |
| backdrop | deep peach (191,132,85)→(217,169,139) | RATIFIED | |

### Lens 1 — breath of life

The meniscus IS the state signal — waist depth relays merging vs splitting (law 6); the goo is
topology, not spring theater. Content never crossing the waist (now exact) is the law's other half:
lobes keep internal alignment, the join is glass-only. The living original breathes in exactly two
places: the countdown (value churn — `animated-digit`'s voice, weight-0: a self-updating surface
never springs, SUFFUSION J + N7) and the ring fill (honest progress, ζ≥1 — I-row law). The EQ bars
are the music lobe's engagement display. Scalars: none of the gesture scalars — Live Activities are
OBSERVER surfaces; their life is data relayed calmly. Momentum regime: lobes join/split as one
liquid body under fire-and-forget system events (law 15's close class), never scrubbed by the user.
iOS's fence (law 6): these are SIBLING activities of one body — inter-body goo past this is our
declared divergence.

### Lens 2 — components touched

- **pager-dots** — the meniscus grammar SHIPPED, at pager scale:
  `src/components/pager-dots/PagerDots.vue:25-38` ("indicator masses (bodyA + a welling concave
  neck + bodyB)…", the instance-scoped neck clip-path at `:108-114`) riding
  `usePagerWorm.ts:7` (the barbell projection) via `useLeadTrail` + `useLiquidFlex`. HAS — the
  law-6 vocabulary has a live DOM instance; cite it as the reference implementation for any future
  two-lobe join.
- **dock** — the fission facility (two-body split/join) exists demo-only:
  `src/components/dock/composables/index.ts:40-43` ("the fission facility (`useDockFission`)…
  demo-only"). HAS the mechanism, LACKS it as public API — correct per the consumer fence; the
  exemplar does not overturn that ruling.
- **toast** — LACKS the sibling-lobe join: adjacent persistent toasts render as separate panels
  (Toaster stack, pins at Asset 1); the exemplar teaches that two PERSISTENT status surfaces of one
  family may share a body. Charterable variant (goo-stack for the `live` register), decidedly not
  default — N9's peripheral-distraction test governs anything that moves in the corner of the eye.
- **progress** — the ring: `ProgressVariant = "default" | "gradient" | "liquid"`
  (`src/components/progress/types.ts:5`) — **LACKS a ring/radial register** entirely. The vehicle
  exists on disk (stroke-dasharray craft in `src/components/completion-seal/styles.css`,
  conic/dasharray in `scroll-progress-rim`, `timeline/ContinuousMarkers.vue`). The exemplar
  teaches: ring + centered mono countdown + track-in-grey, fill honest (ζ≥1). BJ candidate with ≥2
  consumers plausible (timer chip, upload ring).
- **animated-digit** — HAS the countdown voice (`src/components/animated-digit/AnimatedDigit.vue:22-50`,
  `--digit-count` publishing); weight-0 for self-updates per SUFFUSION J.
- **badge/status-dot** — the "Laundry · 8:24" caption + live dot idiom: `Badge.vue:30-34`
  variant/tone/size/surface axes HAS; nothing new owed.

---

## Asset 3 — Screenshot 2026-06-22 at 11.32.12.png — USF report, STATE cards (the gold-flood defect, quantified)

Consumer surface (sci-report; the editorial serif + mono voice). The library's stake is the J-row
restraint law and the negative exemplar.

| property | fresh value | prior | verdict |
|---|---|---|---|
| selected-card label contrast | fg (248,244,231) on gold (206,174,82) → **1.94:1**; second site ("Per capita") **1.72:1**; kicker "STATE" **1.42:1** | "est ~2.5:1" | **CORRECTED — worse than estimated (1.4–1.9:1 class)**; all under AA-large (3:1), far under AA (4.5:1) |
| resting-card label contrast | (224,223,223) on (58,50,44) → **9.38:1** | "the resting dark card reads better" | MEASURED — the flood costs a **4.8× contrast collapse** |
| flood anatomy | corner-to-corner gradient, TL (245,235,201) washed vs TR/BR (244,216,79); field std ~12–14/channel; no reserved text plate | RATIFIED | |
| missing values | label rows (Rank, Per capita) render with NO values and NO placeholder — blank field | "values washed out or absent" | RATIFIED — sharpened: absent without a skeleton |

**Lens 1.** The negative exemplar for engagement-as-flood: selection expressed as a full-field
paint DESTROYS the surface's legibility — engagement must move to edges and accents (rim light,
kicker tone, a tinted band), never behind unchanged text. SUFFUSION Q5's law (readable dynamic
transparency; text clamped to full contrast) is exactly what this violates. Second lesson: blank
values with no skeleton break law 17 (rows land skeleton-first, upgrade in place) — a surface that
shows a label with nothing under it relays nothing.

**Lens 2.**
- **card/surface** — our selection vocabulary is already edge-borne: accent stays rim/decoration-only
  (`src/styles/glass/rim.css:58-64` "never touches the plate BACKGROUND" — STILLS-A pin, re-opened
  fresh, line range corrected). HAS the fence that makes this defect impossible in-library.
- **metric** — HAS the skeleton-first cure: `src/components/metric/Metric.vue:10-33`
  (`loading`/`placeholder` coalesce, `data-loading`, `aria-busy`, value slot suppressed while
  loading). The consumer fix is adoption, not new API.
- **skeleton** — HAS (roster; the loading vocabulary — SUFFUSION §1.1).
- **tabs/toggle-group (selection register)** — the lens contract (G-row) relays selection by lens
  light + magnification, never field flood: `useSelectionIndicator` pins at STILLS-A Asset 1+2.
  HAS; cite as the positive counterpart.

---

## Asset 4 — Screenshot 2026-06-22 at 11.32.18.png — USF report, stacked detail panels

| property | fresh value | prior | verdict |
|---|---|---|---|
| panel field | (60,52,46) warm dark | — | MEASURED |
| panel radius | corner circle-fit r≈15–16px = **~8 CSS px** @2x (insets (0,12)→(4,5)→(8,2)→(26,0)) | "est ~12px CSS" | **CORRECTED — ~8 CSS px** |
| program bar track | rows 738–753 → **16px = 8 CSS px** tall; track (55,48,42) darker than panel by ~5L | "~8px tall, 10-12% white tracks" | height RATIFIED (MEASURED); track polarity CORRECTED — darker-than-panel, not a white track |
| value ink | (252,252,252) mono on (60,52,46) → ~15:1 | "contrast good" | MEASURED |
| fills | gold (224,186,119) et al. — saturated fills on the recessed track | RATIFIED | |
| defect | two modal detail panels stacked + a stray phone-shaped thumbnail artifact over live rows; FILTERS half-occluded | RATIFIED | consumer z-policy absent |

**Lens 1.** Honesty surfaces: mono numerals at 15:1, italic serif labels, saturated program fills
on recessed tracks — the J-row register done right, wrapped in a layering failure. The lesson is
exclusivity: detail panels need one-open-or-compare semantics; overlap without policy reads as
wreckage, not depth (F-row close order exists precisely so surfaces LEAVE before siblings arrive).

**Lens 2.**
- **dialog/drawer** — the library ships modal scrim + focus containment (STILLS-A pins:
  `ModalOverlay.vue:26-29,49,78`); a multi-dialog z-arbitration manager does NOT exist on disk
  (verified: no stack/singleton policy in `src/components/dialog/*`). Verdict: the defect is
  consumer-side; the library's part (modal exclusivity via scrim + trap) HAS; a layer-manager API
  stays unbuilt per the overfit fence — record, don't charter.
- **progress (determinate bars)** — the BY PROGRAM rows are label + track + fill + trailing mono
  value: `Progress.vue` liquid/default fills HAS (`src/components/slider/../liquid-fill.css:2`
  register shared); the recessed darker-than-panel track is our `.glass-capsule-track` channel
  (`glass-capsule.css:19-21`). HAS.
- **badge** — the "Esc" affordance chip: `CommandShortcut.vue` (kbd chip vocabulary) +
  `Badge.vue:30-34`. HAS.
- **table/data-table** — label/value row typography (mono right-aligned values, serif labels) is
  consumer vocabulary; J-row restraint law HAS (no engagement specular on data display).

---

## Asset 5 — Screenshot 2026-06-22 at 13.30.41.png — USF fund funnel (the invisible-ribbon defect, quantified)

| property | fresh value | prior | verdict |
|---|---|---|---|
| ground | L 39–40 warm near-black (46,39,32) | — | MEASURED |
| grid lines | 48px pitch, ΔL **+7.3** over ground | "grid at very low contrast" | MEASURED |
| ribbons (x=1300 column find) | two bands: 67px tall peak L 53.5 (**ΔL +14**), 50px tall peak 51.5 (**ΔL +12**) → effective opacity ≈ **5.5–6.5%** over the L39 ground | "fill opacity est 4-8%" | RATIFIED (MEASURED) — and sharpened: the ribbons sit at barely **2× the grid's own luminance lift**; the page's decoration outshouts its subject |
| funnel body | L 104.4 (ΔL +65 ≈ 30% equivalent) | "a solid light shape" | MEASURED — intake renders ~5× the outflow's strength, inverting the section's emphasis |
| stat row | in blue/out red carried dek→stats; boxed 0.96× RETENTION chip | RATIFIED | |

**Lens 1.** An honesty-of-emphasis lesson: the section's one relationship (where the money goes)
renders below its own gridwork. The prior cure stands ratified with numbers — ribbon floor 12–18%
fill plus per-program hue plus hover-to-solidify (engage-driven brightening is exactly Q3's
license: light at engagement, not idle).

**Lens 2.** Consumer dataviz (sci-report); library stakes: **metric** (stat row — HAS, pins Asset
3), **badge** (the boxed retention chip — HAS), J-row calm HAS. The hover-to-solidify
recommendation rides `--engage-t` when it ships (SUFFUSION §3.1-3; census: not yet on disk). Trace
mappings only — no pins claimed beyond the laws.

---

## Asset 6 — Screenshot 2026-06-22 at 13.58.05.png — USF capacity section (the editorial type ramp)

| property | fresh value | prior | verdict |
|---|---|---|---|
| display ink | (227,223,214) — warm cream, ~89% | "display at full white" class | MEASURED |
| dek ink | (155,150,140) | "~65% white" | RATIFIED |
| pull ink | (158,155,147) — **the same ink family as the dek** | "pull ~30px at ~85% white" | **CORRECTED — the ramp differentiates dek vs pull by SIZE (pull ≈ 1.6× dek), not by brightness**; only the display steps up in ink |
| ground | (34,36,29) | dark | RATIFIED |
| bands | display glyph band 116px; dek two-line band 67px; pull two-line band 114px | display ~64px, dek ~19, pull ~30 CSS | BOUNDED — glyph-band heights, not cap heights; the 2x ratios hold |

**Lens 1.** The editorial ramp is the report's voice — hierarchy carried by size and warmth before
any chart arrives. Restraint IS the engagement here (law 11's identity register: the serif-display
voice as our own lever beyond SF cloning). Nothing moves; nothing should.

**Lens 2.**
- **typography tokens** — the library deliberately ships ONE brand register:
  `src/styles/tokens/scheme-motion.css:40-52` ("Plus Jakarta Sans (text + display) + Fira Code
  (mono)… there is no separate display-serif voice"). The USF serif ramp is CONSUMER vocabulary
  (sci-report presets) per presets-in-consumers — HAS-by-fence, and the fence is correct; the mono
  numerals voice HAS (`--font-stack-mono`, :52).
- **separator/timeline** — the hairline-over-dark section rule idiom; HAS (material-only rows,
  H-row).

---

## Asset 7 — Screenshot 2026-06-22 at 14.32.01.png — the 1895 Monte Carlo playbill in a lightbox

Qualitative (photographic scan; no glass claims). The reference is twofold:

1. **The playbill's own language** — ~5 distinct type treatments in one column (ornamented display
   per act, small-caps section heads, DOTTED-LEADER cast lists pairing role↔performer, hairline
   rules with center fleurons, dense justified fine print). The leader-dot row (label … value) is
   the print ancestor of Asset 4's metric rows; the ornamented rule is the section separator with a
   voice.
2. **The viewer chrome** — dark chevron circles at the edges + a two-dot pager pill at bottom
   (active dot light, inactive dark): the plain dot-pager idiom the goo work replaces (prior canon,
   RATIFIED).

**Lens 1.** A rest-state gallery: engagement lives entirely in the chrome (page-turn arrows, the
pager). The pager dots are the state display; the exemplar's dots are inert — ours worm (the
travel-as-one-body law at pager scale). Regime: paging is a fire-and-forget flip; the worm's neck
wells during travel (`--flex-vel` smear when driven by swipe).

**Lens 2.**
- **carousel** — HAS chevron paging + counter: `src/components/carousel/CarouselPager.vue:1-50`
  (ChevronLeft/Right circles via `Button`, "X / N" counter). The lightbox's dots-in-pill register:
  both parts exist (`PagerDots` + `Carousel` are separate roster items, composed by consumers);
  CarouselPager itself ships a counter, not dots — HAS via composition, correctly unbundled.
- **pager-dots** — HAS, and betters the exemplar: the worm (pins at Asset 2). The teaching kept:
  at n=2 the exemplar's plain dots stay legible — the worm must never make dot COUNT ambiguous
  (PagerDots.vue:38 "a VISIBLE honest partial, NEVER the empty…" — the honesty note is already in
  the file).
- **separator** — ornament-and-rule language: consumer vocabulary; H-row material-only, HAS.
- **timeline/metric** — leader-dot label↔value rows as a consumer idiom over our mono voice; trace.

---

## Asset 8 — Screenshot 2026-06-23 at 12.36.16.png — the fourier multi-select combobox (the flat-opaque defect, now exact — and cured on disk)

| property | fresh value | prior | verdict |
|---|---|---|---|
| panel flatness | four probe zones straddling wildly different backdrop (cream field vs giant black display glyphs): ALL read (199,197,193), per-channel spread **0.00**, std 2.49 | "FLAT OPAQUE grey, no translucency, no tint pickup" | **MEASURED — law 10's re-materialization target now carries the number: zero backdrop transmission** |
| anatomy | outer white container (227,225,222) wrapping the grey list panel; search field with full-bleed dark underline (row y122, L≈25); check-only selection (2 of 6 rows); row pitch 88–98px, text band ~31px → pitch/cap ≈ 2.8 — calm, generous rows | "search on top, check rows, no per-row chrome" | RATIFIED (MEASURED) |

**Lens 1.** The defect is the MEDIUM: a popover that transmits nothing is dead glass — no ambient
tint, no depth, no life (law 2: frost samples hue and luminance from what's behind; law 1: blur
never without a luminance layer). The anatomy is the keeper — the calm register (E-row: fields are
held engagement). Engagement belongs at: open (anchored growth, rows on the depth ladder), the
highlight lens (glides, magnifies ~5%), check draw (handmark stroke, B-row).

**Lens 2.**
- **combobox** — **HAS the cure, shipped**: `src/components/combobox/ComboboxList.vue:46` — the
  panel is `glass-floating` + `rounded-panel` + `glass-reveal` + `glass-field-portal` (backdrop
  ladder glass, not paint). The capture predates the cure; record the defect as HISTORY, the
  shipped state as the answer. Anatomy: `ComboboxInput`/`ComboboxItemIndicator` carry
  search-on-top + check-only rows. HAS.
- **command** — same register: `src/components/command/Command.vue:31` (`command glass-floating`,
  surface default "glass" at `:12`); search-on-top anatomy `CommandInput.vue:24-32` (icon +
  input wrapper). HAS.
- **select/dropdown-menu** — the same E-row anchored-glass contract rides the shared portal
  classes; trace (pins above suffice).
- Repo-memory note kept: verify reka-ui bindings on version bumps — stale props no-op silently
  (the glass-ui binding-verification lesson; unchanged, cited not re-derived).

---

## Assets 9+10 — the MATERIAL-ASPIRATION pair (images-2.jpeg + METAL FLOW)

The two texture references carry the material-aspiration read: what register they teach our
glass/metal, mapped to our tokens. Both are ASPIRATION, not iOS: codex law 13 places them as
glass-ui's declared divergence for the blob material — a direction we choose deliberately, never a
copy claim (the shipped iOS orb is smoky refractive glass).

### images-2.jpeg — the micro-sparkle bronze (480×640 photo)

| property | fresh value | prior | verdict |
|---|---|---|---|
| two-frequency split | micro grain \|dL/dx\| = **5.8** per px; 64px macro field std **20.3**, range **68.8L**; nothing between | "micro sparkle + one broad gradient; no mid-frequency" | **RATIFIED-QUANTIFIED** — the register is exactly two bands |
| hue drift | TL (197,141,85) amber → BR (97,90,62) olive-bronze; warm ordering (R≥G≥B) at BOTH ends | "hue/luminance drift, warm amber → olive" | RATIFIED — hue stays one warm family; LUMINANCE halves |

### METAL FLOW — the anisotropic molten-gold cloth (2100×1400)

| property | fresh value | prior | verdict |
|---|---|---|---|
| luminance range | p1 = 39.9, p50 = 143.3, p99 = **255** — full black-to-white within the field | "value range near full within a single fold" | RATIFIED (MEASURED) |
| ridge width | bright-ridge runs median 31px = **1.48% of width** (n=24 on one scanline) | "~1-3% of image width" | RATIFIED (MEASURED) |
| hue family | R≥G≥B ordering on **98.4%** of pixels; saturation mean 0.487 | "hue stays one gold family; luminance, not hue, does the work" | **RATIFIED-QUANTIFIED** |

### The register they teach, mapped to our tokens (on-disk state 2026-07-19)

- **Two frequencies only.** Micro-sparkle over ONE broad gradient; mid-frequency noise reads as
  dirt. On disk: the blob's FBM membrane + OKLCh perturbation are exactly the two bands
  (`src/components/blob/shaders/metaball-noise.wgsl.ts`; `oklch-perturb.glsl.ts`;
  `metaball.frag.ts:462` "the FBM membrane" feeding specular AA). HAS the structure.
- **Luminance does the work, hue held.** The blob's palette is perceptually-uniform OKLCh over the
  warm-cream identity (`src/components/blob/README.md:1-9`); the specular glint is a near-white
  OKLCh TINT L~0.97 C~0.03 (`metaball.frag.ts:455-462`) with the Toksvig variance clamp
  (`metaball.wgsl.ts:371,481`). HAS the law (luminance-borne, single-hue).
- **Anisotropic, flow-aligned ridge specular** — the METAL FLOW signature (hard specular knee,
  ridges along the flow). On disk the blob's Blinn-Phong is ISOTROPIC (uSpecStrength/uSpecShininess,
  `metaball-uniforms.glsl.ts:70-71`, exponent 16–64 "tight glint"). **LACKS — and deliberately**:
  law 13 declares liquid-metal chrome the divergence direction, not the shipped default; the
  warm-cream lit-glass identity is the identity. Verdict in our language: if the metal register is
  ever wanted, it is a blob PRESET (flow-aligned anisotropy + the sharp knee + micro-sparkle
  band), never a repaint of the default — our glass stays our glass.
- **The velocity-keyed caustic kinship** (law 3): the exemplars' ridge-lights are static cloth;
  ours must move only with engagement — the no-idle-specular law stands over any metal preset.

---

## The components-touched index (the full roster pass)

Every roster component this corpus bears on; pins above, state verified on disk 2026-07-19.

| component | exemplar(s) | the register taught | shipped state |
|---|---|---|---|
| toast | 15.26.49/.54 | persistent `live` register: art + two-line + tone-on-tone action; upgrade-in-place; sibling-lobe goo stack | HAS swipe-scrub + stack anchors (Toast.vue:103; Toaster.vue:48-51); LACKS the live/persistent class + lobe join (charter candidates) |
| pager-dots | 15.26.54, 14.32.01 | the meniscus join; dot-pager the worm replaces; count honesty at low n | HAS — bodyA+neck+bodyB shipped (PagerDots.vue:25-38,108-114; usePagerWorm.ts:7) |
| dock | 15.26.54 | two-body fission/join as one liquid body | HAS mechanism demo-only (dock/composables/index.ts:40-43); public API correctly withheld |
| progress | 15.26.54 (ring), 11.32.18 (bars) | ring + centered countdown, ζ≥1 fill; recessed darker track | HAS linear fills (types.ts:5; glass-capsule track); **LACKS ring variant** — BJ candidate, vehicles exist (completion-seal/scroll-progress-rim dasharray) |
| animated-digit | 15.26.54 | countdown churn, weight-0 self-update | HAS (AnimatedDigit.vue:22-50) |
| badge / status-dot | 15.26.54, 11.32.18, 13.30.41 | caption+live-dot; boxed stat chip; Esc kbd chip | HAS (Badge.vue:30-34; CommandShortcut.vue) |
| button | 15.26.49 | tone-on-tone action disc (+2% L), no stroke | HAS via capsule rungs (glass-capsule.css:1-21) |
| card / surface | 11.32.12 | selection at edges/accents, never field flood; text contrast clamped | HAS the fence (rim.css:60-64 accent-rim-only) |
| metric | 11.32.12/.18, 13.30.41 | skeleton-first values; mono numerals at full contrast | HAS (Metric.vue:10-33 loading/placeholder/aria-busy) |
| skeleton | 11.32.12 | blank-with-label is a defect; loading is a state | HAS (roster; SUFFUSION loading vocabulary) |
| dialog / drawer | 11.32.18 | detail-panel exclusivity; z-policy | HAS modal scrim+trap; multi-dialog arbitration correctly unbuilt (consumer policy) |
| table / data-table | 11.32.18 | mono values right, serif labels, J-row calm | HAS the restraint law (trace) |
| carousel | 14.32.01 | chevron circles + pager; dots via composition | HAS (CarouselPager.vue:1-50); dots-in-pill = compose PagerDots |
| combobox / command / select | 12.36.16 | glass medium for popover panels; calm search-on-top anatomy | HAS — cure shipped (ComboboxList.vue:46; Command.vue:12,31; CommandInput.vue:24-32) |
| blob | images-2, METAL FLOW | two-frequency material; luminance-not-hue; anisotropic metal as PRESET-only divergence | HAS two-band structure + OKLCh glint (metaball.frag.ts:455-462); LACKS anisotropy (deliberate, law 13) |
| typography (label) | 13.58.05, 14.32.01 | serif ramp + leader dots = consumer voice; mono numerals = ours | HAS-by-fence (scheme-motion.css:40-52 one brand register) |
| separator | 14.32.01 | ornamented rule as section voice | HAS material-only base; ornament is consumer |
| tabs / toggle-group | 11.32.12 (counter-exemplar) | selection by lens, never flood | HAS (useSelectionIndicator — STILLS-A pins, cited) |

## The corrections ledger (fresh measurement vs prior canon)

1. **CORRECTED: the goo waist ratio** — canon "~45-50% of lobe height" → **59%** (66/112px,
   bracket 0.55–0.63). Codex law 6's cited figure amends; the meniscus is fuller than canon.
2. **MEASURED-RATIFIED: content never crosses the waist** — 0 ink pixels in the 69px neck span;
   the law's second clause is now exact.
3. **CORRECTED: the timer ring coverage** — "~85%" → **62.8%** maroon (134° gap), d≈71px, stroke
   6–7px.
4. **CORRECTED: the media-pill action anatomy** — "outlined-circle/thin-ring play button" → a
   filled tone-on-tone disc (d=72px, +4.5L over the pill, radial profile shows NO stroke); the
   ring read was the disc's own luminance step. "Action stays tone-on-tone" survives; mechanism
   corrected.
5. **CORRECTED: the art-block radius** — "~24px" → circle-fit r≈15–16px (~16% of the 96px side;
   the app-icon rounded-square class).
6. **RATIFIED (new site): zero-shadow floating pill** — ΔL<0.7 over 40px below; the corpus's
   second measured zero-shadow (with STILLS-A's 14.38.58).
7. **CORRECTED (worse): the gold-flood contrast** — est "~2.5:1" → **1.94:1** (kicker 1.42:1) vs
   the resting card's 9.38:1 — a 4.8× collapse, the defect's number.
8. **RATIFIED+sharpened: the ribbon opacity** — 4-8% est → ΔL +12–14 ≈ 6% measured, against grid
   lines at ΔL +7: the subject renders at ~2× the decoration. Funnel body +65 (~5× the ribbons).
9. **CORRECTED: 11.32.18 panel radius** — est ~12 CSS px → **~8 CSS px** (r≈15–16 orig); bar
   track 8 CSS px tall and DARKER than the panel (not a white track).
10. **CORRECTED: the 13.58.05 ink ramp** — dek and pull share one ink (~155 vs 158); the dek→pull
    step is SIZE (~1.6×), not brightness; only the display steps up in ink (227).
11. **MEASURED: the combobox flatness** — per-channel spread 0.00 across contrasting backdrop
    zones, RGB (199,197,193); law 10's "flat opaque grey" is now a number — and the shipped
    combobox is glass (`glass-floating`), the target already re-materialized.
12. **RATIFIED-QUANTIFIED: both textures** — METAL FLOW: full luminance range (p1 40 → p99 255),
    ridge 1.48% width, 98.4% single-hue ordering; images-2: two-band split (micro 5.8 vs macro
    std 20.3, range 69L).
13. **Doc-drift flag (on us, not the corpus):** `src/styles/tokens/scheme-spring.css:31` still
    carries the refuted "dock: (0.68s, ζ=0.64)" comment literal; the preset table on disk is
    `{response: 0.3, dampingFraction: 0.82}` (`springPresets.ts:95-99`, read fresh) — MARKS
    PASS-2 C2/X2 resolved the drift TOWARD the table; the comment should follow. Cure-class:
    one-line comment fix.

Design-language note governing every recommendation: the corpus's warm registers keep converging
on ours — the media pill's cream (246,240,232) sits beside our ecru (243,242,240; STILLS-A), the
USF report IS our consumer voice, and the metal textures map onto knobs the blob already owns. The
moves proposed are register completions (the live-toast class, the progress ring, the goo-stack
variant, a metal blob preset), never clones — our warm cream, our rounding, our glass hold.

## Verification (2026-07-19)

Verified-model: claude-fable-5. The load-bearing fresh numbers were re-derived with independent
probes in the same session (scratchpad `corpus-redo/stills-b/`, inline verify runs):

- The waist ratio re-measured at two mask thresholds (215/225): 0.579/0.589 — the 59% correction
  stands (the 235 arm exhausts its mask, as a threshold that high should).
- The ring coverage swept across the stroke (radii 31/32/33): 0.536/0.628/0.692 — the ~63%
  correction stands; "~85%" is unreachable at any stroke radius.
- The gold-flood contrast confirmed at a second label site ("Per capita"): 1.72:1 — the defect
  class is 1.4–1.9:1, not the estimated 2.5:1.
- The no-stroke disc proven per-pixel: the MINIMUM pixel on every annulus r=30–42 never drops
  below 241 (the pill's own surface) — no dark ring exists at any angle, not merely on average.
- The combobox flatness probe is exact by construction (identical (199,197,193) across four zones
  straddling contrasting backdrop; spread 0.00).
- All file:line pins opened fresh on disk this session, including `springPreset("dock")`
  {0.30, 0.82} (`springPresets.ts:95-99`) against the stale `scheme-spring.css:31` comment, the
  `glass-capsule.css:19-21` state table, and `rim.css:58-64` (range corrected from STILLS-A's
  citation).
