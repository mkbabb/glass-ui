# CORPUS-STILLS-A — the stills re-do (IOS27-MICRO corpus-redo)

Verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat: corpus:STILLS-A.
Corpus: 12 stills from `/Users/mkbabb/Downloads/New Folder With Items 4` — the IMG_* set + the
June-20/21 screenshots. No video frames extracted (stills seat; the two video-frame crops are
treated as stills; no t0+fps contract applies). Measurement scripts + provenance:
scratchpad `corpus-redo/stills-a/` (measure.py / measure2.py / measure3.py + README).

Method: PIL/numpy pixel probes — run-detection on luminance thresholds, least-squares circle fits
on corner traces, 10–90% edge-transition widths as the blur ladder, per-channel alpha inversion for
diffuser opacity. All px are ORIGINAL image px; iPhone captures 1206x2622 @3x → pt = px/3. Marks:
**MEASURED** (a number off pixels), **BOUNDED** (a bracket the pixels support), **INCONCLUSIVE**
(the probe could not decide — said so). Prior canon = `refable-timelines/stills.md` + MARKS-A/B +
IOS27-CODEX; where fresh measurement disagrees the correction is explicit; where it agrees, cited.

The two lenses per the user order: (1) THE BREATH OF LIFE — where engagement lives, which of the
six engagement scalars the surface expresses (SUFFUSION-MATRIX §3.1: `--flex-vel`,
`--motion-weight`, `--engage-t`, `--overpull`, `--impulse`, `--scrub-t`), the momentum regime
(codex laws cited by number); (2) THE FULL COMPONENT SET — every mapping names the component, the
register taught, and the shipped state verified on disk (HAS/LACKS/CONTRADICTS, file:line pins).

On-disk scalar census (the breath lens's ground truth, 2026-07-18): `--motion-weight` in 19 files,
`--flex-vel` in 5, `--atom-drag-v` in 3; `--engage-t`/`--overpull`/`--impulse`/`--scrub-t` in 0 —
the four new roster scalars remain pass-2 work, exactly as SUFFUSION §3.1-3 charters.

---

## Asset 1+2 — IMG_2287.PNG / IMG_2288.PNG — the ChatGPT reasoning-effort popup (two slider states)

The corpus's richest still pair: an inline ordinal control engaged as its enlarged popup variant,
captured at two adjacent values ("High" → "Extra High"). The F49/F50 model; codex law 12's anchor.

### Design register (MEASURED)

| property | fresh value | prior canon | verdict |
|---|---|---|---|
| track | x 93..1113, y 1423..1637 → 1020×214px = **340×71pt**, full stadium r=107px=36pt | ~341×68pt | RATIFIED (height refined 68→71pt) |
| thumb (2287) | 466×144px = **155×48pt**, r=72px=24pt, inset 36px=**12pt** | 153×48pt, inset ~10pt | RATIFIED (inset refined to 12pt) |
| thumb (2288) | 626×144px = **209pt** | ~207pt | RATIFIED |
| growth | **+160px** | ~54pt | RATIFIED — |
| dots | d=36px=**12pt**; centers x 683/844/1005 → pitch **161px=53.7pt** | ~12pt dots | RATIFIED; pitch now measured |
| growth = pitch | 160px growth vs 161px pitch — **0.6% agreement** | "grows one dot pitch" | the law-12 claim is now MEASURED exact |
| track grey | RGB (56,56,56) on true-black ground | — | new |
| blur ladder | chat text y694: transition 1px (sharp); icon row y966: 3px (near-sharp); context chip y1216: **37px → σ≈14px ≈ blur(~9pt)**; popup-layer label y1330: 3px (sharp — it rides the popup, not the backdrop) | ramp "0→~20pt over ~70pt" | CORRECTED to a bound — see below |
| backplate | full-width BAND: L≈31–37 flat across x 60..1160 at y1383; vertical feather ~150px above the track, ~50px below; **zero** glow below y≈1650 and above y≈1250 | "soft elliptical luminance lift, ~40-60pt feather" | **CORRECTED — a band, not an ellipse** |

**The blur correction.** The ramp DISTANCE is ratified: sharp at y966, heavily blurred by y1216 —
onset over ≤250px ≈ 83pt of travel (prior "~70pt" holds as the bracket 60–85pt). The ramp CEILING
is not measurable: the deepest surviving edge (the chip) reads σ≈14px ≈ CSS blur(~9pt); everything
deeper is crushed to black by the dim, so prior "~20pt radius" is BOUNDED-below at blur(9pt),
plausible above, unprovable here. Our shipped `--glass-halo-blur: 20px` (see pins) sits above the
measured floor (~12 CSS px @1x) — the register is right.

**The backplate correction.** The luminance lift behind the control is a full-width horizontal
band peaking at the control row with asymmetric vertical feather (long above, short below) — the
popup's glass slab reads as a BAND the control floats in, not a local ellipse. Prior stills.md
"soft elliptical luminance lift" is void as geometry; the feather scale (~50pt above) survives.

### Lens 1 — breath of life

The pair is two adjacent instants of a **tracked** drag (law 15: while tracked, leader channels
scrub 1:1). Selection is occupied LENGTH, not position — liquid volume as the state signal (law
12); the remaining dots are futures, the pill is the present. The medium engages WITH the control:
the world recedes through the gradient ramp + dim band the moment the popup exists (law 1a — the
directional ramp is this asset's own attestation). Where engagement lives when this surface is
alive: the thumb's width (the only animated geometry), the dot crossfade under absorption, the
medium's onset/release. Scalars expressed: `--scrub-t` (position under finger), `--engage-t` (the
popup existence = the engage envelope), `--overpull` at the ends (law 16c endcap analog: compress,
never translate past); velocity feeds width smear, not lag (law 16c: width is the velocity
display). Regime: tracked while down; release = ballistic seed into the well (law 14a
velocity-parameterized snap); the popup's own dismissal is fire-and-forget (law 15).

### Lens 2 — components touched (pins verified on disk 2026-07-18)

- **slider** — the primary bearer.
  - HAS the occupied-length fill: one continuous glass cylinder, thumb seated INSIDE the fill —
    `src/components/slider/Slider.vue:225` (`.slider-range glass-liquid-fill`) + the register at
    `src/styles/glass/liquid-fill.css:2`; the anatomy comment at `Slider.vue:296-340`.
  - HAS drag physics in the exemplar's grammar: press-squash `scale(1.02, 0.94)`
    (`Slider.vue:428-436`), saturating velocity smear via `--atom-drag-v` × `--motion-weight`
    (`Slider.vue:438-452`), cartoon-punch follow-through on release (`Slider.vue:455-460`).
  - HAS marks-as-dots (`Slider.vue:216-223`; dot paint `Slider.vue:317-330`, 0.375rem).
  - LACKS the dot ABSORPTION: the exemplar drops 3→2 dots as the pill grows; our marks persist
    under the translucent fill (paint order covers them, `Slider.vue:216` before `:225`, but no
    crossfade/count change). The register taught: a mark inside the fill dematerializes —
    "spring the width, crossfade the dots" (law 12) is half-shipped.
  - LACKS the modal/enlarged variant (N1): no modal in `src/components/slider/`; the halo token
    comment names "the ENGAGE-AFFORD slider modal" as a consumer aspirationally
    (`src/styles/tokens/glass.css:162-163`) — the mechanism duel is still SUFFUSION §4's open item.
- **toggle-group / tabs (segmented)** — the popup is anatomically a 4-position ordinal selector.
  - HAS the one-lens selection body: `useSelectionIndicator`
    (`src/components/tabs/SegmentedTabs.vue:17-20,206`; `src/components/dock/DockLayerGroup.vue:38`).
  - LACKS the grow-to-absorb register: our lens translates and squishes on travel; it never grows
    by a pitch to swallow the next position. For ORDINAL scales (effort, size, tiers) the exemplar
    teaches absorption over travel — a variant worth chartering, distinct from nominal tabs.
- **dialog (graded backdrop)** — the medium.
  - HAS the shipped mechanism for exactly this still: `data-backdrop="graded"` box-following
    masked halo (`src/components/dialog/ModalOverlay.vue:26-29,49,78`), the
    `--glass-halo-blur/core/bloom` cohort (`src/styles/tokens/glass.css:158-173`). Codex law 1's
    declared divergence, judged against this pair — the judge material is now measured (floor
    blur(~9pt), band-not-ellipse backplate, ramp 60–85pt).
- **pager-dots** — adjacent idiom, correctly SEPARATE: the worm (position among peers,
  `src/components/pager-dots/PagerDots.vue:6-33`,
  `src/components/pager-dots/composables/usePagerWorm.ts:19` via `useLeadTrail`) vs
  the absorb-pill (cumulative magnitude — slider's). The library keeps the two idioms apart; keep
  it that way. HAS.
- **scroll-progress-rim** — law 12 names the fill-pill+dots as its replacement model; on disk it
  is still a rim-gradient register (`src/components/scroll-progress-rim/ScrollProgressRim.vue:16-27`).
  LACKS (the ruling postdates the component; carry as a BJ candidate, not a defect).
- **progress** — the honesty split holds (fill ζ≥1); LACKS the licensed fill-tip velocity glint
  (SUFFUSION I row) — no glint/velocity term in `src/components/progress/Progress.vue` (298 lines).

---

## Asset 3 — IMG_1874.PNG — Apple Writing Tools "Proofread" sheet over a purple chat

### Design register

| property | fresh value | prior | verdict |
|---|---|---|---|
| diffuser alpha | per-channel α = (0.68, 0.56, 0.67) vs raw bubble (95,44,92) — G dips | "white layer ~65-75%" | **CORRECTED to ~56–68%**; the G-channel dip IS the saturation boost (hue survives BY alpha asymmetry) |
| sheet-over-purple | RGB (203,163,202) — broad lilac wash, geometry gone | RATIFIED | |
| confirm circle | d=130px=**43pt**, solid blue, the single saturated accent | ~42pt | RATIFIED (MEASURED) |
| capsule row | y 1520..1696 → h=176px=**59pt** | ~57pt | RATIFIED (MEASURED) |
| sheet top radius | INCONCLUSIVE by tracer — the corner arc sits against the white chat margin (zero contrast); the traced "edge" was the bubble's own bottom | ~28pt | prior DOWNGRADED to visual estimate, not measured |

### Lens 1 — breath of life

A field-register surface: restraint IS the proportion (SUFFUSION row D — calm, legible, never
bouncy). Engagement lives in the medium change (the sheet's arrival recedes the chat — law 1
blur+luminance co-applied; law 8 entry) and in exactly ONE hot point: the saturated confirm
circle. The diff spans relay state by tint, not motion. Scalars: `--engage-t` (focus/arrival
envelope), `--motion-weight` at whisper amplitude; drag/velocity scalars rightly absent. Regime:
sheet arrival is a fired morph (law 15 release-pop class); dismissal scrubbed as any sheet (law 7).

### Lens 2 — components touched

- **drawer** — the sheet body. HAS the ladder + scrub machinery: `snapPoints`
  (`src/components/drawer/Drawer.vue:49-51`), scrim modes dim/scale/immersive
  (`Drawer.vue:28-31`), the position-mapped scrub scalar written atomically
  (`--stage-t` + `--glass-drawer-t`, `src/components/drawer/composables/useDrawerSnap.ts:154-172`)
  — law 7d position-mapped material HAS.
- **button** — the capsule action row, one step lighter than the field (measured (198,169,197) on
  the sheet's lilac): the two-tier control-on-container contract our ladder carries
  (`src/styles/glass/ladder.css` rungs; rim at `src/styles/glass/rim.css:66-80`). HAS. The
  one-saturated-accent doctrine (reserve full saturation for the single primary action) is
  consumer-side; the library's part — neutral glass never carrying brand color — HAS via the
  accent axis staying rim/decoration-only (`rim.css:60-64` "never touches the plate BACKGROUND").
- **dialog/card tint** — tint-from-beneath with text clamped: HAS the manual seam
  (`--glass-tint-source` oklab mix into every bg token, `src/styles/tokens/glass.css:253-267`);
  LACKS true backdrop SAMPLING (law 2) — platform-bounded, ours is declared tint; honest
  divergence, keep declaring it.
- **FeedbackMark / valid-state draw** — the proofread diff spans as state-by-tint map to the D-row
  valid mark-draw vocabulary (`src/components/_shared/FeedbackMark.vue` exists). HAS the vehicle.

---

## Asset 4 — IMG_1880.HEIC — the axis-capsule sketch (x → x+y → x+y+z)

Schematic; no measurements. The user's own notation for axis-parametrized morphing — a capsule
crossed by an orthogonal element, the intersection gaining ordered zones. Now live-backed by the
Siri orb→pill staged-axis morph (codex law 9: squash completes, THEN widen, then content — axes as
ordered tracks of one morph, never uniform scale).

Lens 1: the sketch IS momentum vocabulary — it declares that growth engages one axis at a time;
the breath comes from the ORDER, not the speed. Lens 2: **dock** HAS the one-scalar
origin-anchored morph (`src/components/dock/composables/useDockMorph.ts:8,29` — "project the
current outer face… the sole dock spring"); **motion primitives** HAS `useMotionAxis`
(`src/components/_shared/useMotionAxis.ts`) and `useElementMorph`
(`src/composables/motion/morph/useElementMorph.ts`) as the axis/identity carriers. The named x/y/z
morph scalars as public API (law 9's arrow) remain the dock-greenfield's to ship — LACKS as a
first-class authoring surface.

---

## Asset 5 — IMG_1881.PNG — r/iOSBeta beta-to-beta glass comparison

Qualitative (community text + embedded crops; the crops are too small for rim photometry — no
fresh numbers claimed). The spec verbatim, RATIFIED as prior canon: lighter drop-shadows inside
glass buttons; flatter tops/sides (less squircle); much brighter upper AND lower edges in light
mode; left/right edges less dark grey; "edges are still too dark to trick my brain" — the edge is
what observers track (codex law 3).

Lens 1: the rim is the engagement organ — light concentrates at edges, and observers audit it.
Velocity-keyed caustic (law 3's first-class clause) is where the breath belongs; idle surfaces
stay quiet (SUFFUSION idle rung: no light motion on a static surface).

Lens 2 — **button/chip/card, the material itself**:
- HAS the anisotropic rim: bright top catch-light 0.30 light / 0.40 dark with a DIMMER side stop
  0.18/0.24 (`src/styles/tokens/glass-fx.css:143-148`; dark arm `src/styles/tokens/dark-arm.css:356-360`;
  applied across the material group `src/styles/glass/rim.css:66-80`). Quiet sides: HAS. Light
  inner shadows: HAS (under-shadow at 6%/4%).
- CONTRADICTS (partial) on the LOWER edge: the exemplar wants a brighter lower edge in light mode;
  ours grounds the bottom with a dark warm under-shadow (`--glass-rim-bottom`,
  `glass-fx.css:146-148`). Recommendation in our language: keep the idle bottom grounded (our
  warm-cream identity reads better seated), and give the lower rim its brightness as the
  VELOCITY-KEYED caustic at engagement (law 3: lower-rim + corner concentration, intensity keyed
  to edge velocity) — the no-idle-specular law stays intact, the observer's "shine" arrives
  exactly when the surface moves.
- The light-dark() inset trap note stands (repo memory): both rim arms live as plain per-mode
  declarations — verified, `glass-fx.css:141-142` says so explicitly and dark-arm.css re-declares.

---

## Asset 6 — IMG_1882.PNG — Visual Capitalist median-income ranked bars

Reference ramp only (no glass claims). Palette MEASURED: West blue (21,87,176), Midwest green
(57,169,115), South gold (222,183,106), Northeast red (229,89,37) on cream (242,237,231); dashed
average rule with boxed label; inline labels at bar start, values at bar end, no y-axis; palette
doubles as the map legend.

Lens 1: n/a (print idiom) — the lesson is hierarchy, not motion.
Lens 2: **metric / table / data-table / timeline** — the ranked-bar idiom (inline labels beat
axes at density; ONE reference line; palette-as-legend) is consumer/report vocabulary; the
library's part is the J-row restraint already sworn (SUFFUSION J: observers stay calm, no
engagement specular on data display). Trace mapping; no pins claimed beyond the row's law.

---

## Asset 7 — Screenshot 2026-06-20 at 01.41.17.png — the collapsed radio strip (defect capture)

MEASURED: the capture IS the whole surface — 96×266px, warm-dark ground (51,44,38); one unfilled
radio; the state label rendered vertically because the container lost its width. RATIFIED as the
defect read (prior stills.md).

Lens 1: the negative exemplar — a collapsed control cannot breathe. Layout floors are a
PRECONDITION of engagement; no scalar can express on a 96px strip. The breath-of-life edict's
quiet corollary: engagement budgets assume the surface has its proportions.

Lens 2: **configurator / radio-group** — HAS the cure at the right layer: the demo stage carries a
definite min floor (`--configurator-stage-min, 18rem` —
`src/components/configurator/Configurator.vue:190`, plus the min-w-0 discipline through the grid,
`Configurator.vue:315-342`). `radio-group` itself correctly carries no min-width (a control must
not fight its layout); the floor belongs to the panel, and does.

---

## Asset 8 — Screenshot 2026-06-20 at 18.52.29.png — Apple Maps iOS-27 home (satellite + sheet)

### Design register

| property | fresh value | prior | verdict |
|---|---|---|---|
| sheet top edge | y=1465 (vert-grad spike 57.5) | — | MEASURED |
| sheet corner radius | tracer defeated by satellite texture at the corners | ~24pt | **INCONCLUSIVE** — visual bracket 20–27pt; prior stands as estimate only |
| search capsule | y 1512..1648 → h≈132–136px = **44–45pt**, r=66–68px=22pt | ~40pt | CORRECTED (44pt) |
| law-4 proportion | top gap 51px=17pt, side gap 47px=16pt vs capsule r 22pt → gap ≈ 0.75r | "17-20pt against ~22pt" | RATIFIED (MEASURED) |
| place circles | Home d=223px=**74pt** | "~60pt-class" | **CORRECTED — 74pt** |
| floating circles | 3D d=142px=**47pt** | 44-48pt | RATIFIED (MEASURED) |
| right capsule stack | 144px=48pt wide, 2-icon merged capsule | — | MEASURED (grouped actions merge; singles stay circles — RATIFIED) |
| sheet material | sheet (83,86,77)–(97,100,93) grey-green vs raw map above (176,182,175): the sheet COMPRESSES the satellite's range toward a grey-green mid — dim over bright zones, lift over dark | "blurred bleed, luminance lift" | **CORRECTED — range compression, not a lift**; neutral-glass-tinted-from-beneath RATIFIED |

Identity color lives only in content circles + avatar; the glass never carries it — RATIFIED
(codex law 2 corollary).

### Lens 1 — breath of life

A detent sheet at rest with companions: engagement lives in (a) the sheet's scrub body — position
under finger, material position-mapped (law 7d), detents velocity-projected on release (law 7c);
(b) the companions (3D/binoc circles, capsule stack) RIDING the sheet with ceiling clamps and
predictive fades (law 7f); (c) the search capsule as the dock-seed (this sheet is the Maps
expansion corpus's rest state — MARKS §1). Scalars: `--scrub-t` (the sheet fraction),
`--overpull` at ladder ends, `--motion-weight` on the settle; regimes: tracked while down,
ballistic on flick (law 15), detents per law 7b (edges critically damped, interior slightly under).

### Lens 2 — components touched

- **drawer** — HAS the whole grammar this still rests on: detent ladder + scrub scalar + scrim
  modes (pins at Asset 3). The companion-ride/ceiling-clamp/predictive-fade choreography (law 7f)
  — LACKS as a shipped affordance (no companion-anchor API in `src/components/drawer/`); it is
  consumer-buildable off `--stage-t` but unnamed. Candidate: a documented companion recipe, not
  new API, per the overfit fence.
- **search** — the capsule anatomy (44pt capsule, icon+field+mic+avatar). HAS the three-axis
  register (`src/components/search/SearchBar.vue:44-56`) and pill radius
  (`src/components/_shared/field-control.css:34`). Register note: the Maps capsule is one tone
  LIGHTER than its sheet — the two-tier control-on-container split, which our field surfaces
  carry via the surface axis. HAS.
- **avatar** — saturated content circle (the carrot) on neutral glass: doctrine trace; our avatar
  is content-tier, correct by construction.
- **dock** — this sheet is the dock-to-card corpus's rest geometry (MARKS §1); the proportion law
  (gap ≈ 0.75 × pill radius) now measured here feeds the dock/card padding table (codex law 4).
  HAS the law's vehicle in the role-keyed radius tokens (`--radius-pill`/`--radius-field`,
  `field-control.css:34,47`); the gap≈radius LINT (law 4's arrow) remains unshipped — LACKS
  (BJ gate candidate).

---

## Asset 9+10 — Screenshots 2026-06-21 at 04.08.42 / 04.08.48 — glass-ui liquid-playground crops

The in-repo anchor stills (our own storybook): kicker "DOCK · LIQUID MORPH", route chip
`/dock/liquid-playground`, doctrine card "one engine — useLiquidMorph — one dock-spring scalar
written onto the dock element; EXPAND grows the pill". MEASURED: ecru ground (243,242,240) both
crops (2x desktop retina). RATIFIED as the doctrine citation (prior stills.md).

Lens 1: these stills date the doctrine the corpus keeps proving: ONE scalar, the dock as the
controlled object. The breath rides the scalar, never a second clock.

Lens 2 — **dock**:
- HAS, verbatim on disk today: the sole-spring morph (`useDockMorph.ts:29` "Drive the outer
  collapsed/expanded pair from the sole dock spring"), origin-anchored projection
  (`useDockMorph.ts:8` "project the current outer face" — codex law 5's current-frame anchor).
- The register: `springPreset("dock")` on disk = `{response: 0.3, dampingFraction: 0.82}`
  (`src/composables/motion/spring/springPresets.ts:95-97`) — read fresh per the never-trust-a-
  remembered-literal rule; sits INSIDE MARKS PASS-2 C2's fitted bracket (ζ 0.77–0.88, f_d
  1.4–2.0Hz → this preset ⇒ f_d 1.91Hz, ζ 0.82). The shipped table row remains corpus-true.
- The warm identity note: the exemplar corpus's own capsule (Asset 12) measures (248,243,236) —
  the same warm family as this ecru (243,242,240). The corpus and our identity CONVERGE; no
  register move needed on ground tones.

---

## Asset 11 — Screenshot 2026-06-21 at 14.38.54.png — capsule-to-sheet morph, expanded pole

### Design register (crop 894×296, video frame; device scale ~1.75px/pt inferred from sheet width)

| property | fresh value | prior | verdict |
|---|---|---|---|
| sheet corner | circle-fit r=**55px** in-crop; sheet width 704px (x 99..~803) → r/w = 0.078 → ≈31pt on a 402pt device | "~36-44px CSS" | **CORRECTED — prior scale-confused** (assumed 2x retina; the crop is ~1.75px/pt). State the ratio: r ≈ 0.078 × sheet width |
| grabber | 72×10px = 41×5.7pt, w/h 7.2; RGB (178,148,142) warm grey | ~56×8px | CORRECTED (smaller, warmer); anatomy = the iOS 36×5pt class |
| lateral tint grade | y=200: (224,183,175) warm pink left → (236,214,204) cream right | RATIFIED | the sheet inherits ambient warmth, graded ACROSS its width |
| identity thread | inner card gradient (143,61,127)→(113,92,117) = the collapsed pill's art gradient | RATIFIED | the art carries across morph poles |

### Lens 1 — breath of life

The expanded pole of a two-pole morph: engagement lives in the IDENTITY THREAD — one element (the
art gradient) persists across states so the morph reads as the same body (codex law 17, state
continuous through shape). The ambient tint grading across the sheet keeps the surface breathing
with the room even at rest (law 2 + law 11's restraint floor). Scalars: `--scrub-t` (the morph
fraction), `--motion-weight`; the grabber is the standing invitation to scrub.

### Lens 2 — components touched

- **expandable-container / drawer** — the pole pair. HAS the morph vehicle (`useElementMorph`,
  `src/composables/motion/morph/useElementMorph.ts`; the drawer's `--glass-drawer-t` scalar). The
  identity-thread pattern (carry ONE element's paint across poles) is consumer choreography; the
  library's carrier exists. HAS.
- **drawer handle** — our tokens: 36×5px, opacity 0.45 resting → 0.85 active
  (`src/components/drawer/styles.css:86-90`). Geometry RATIFIED against this exemplar.
  CONTRADICTS (soft) codex law 7a — iOS's grabber is ABSENT at cold idle, born at first touch;
  ours is always faintly present. On the web, discoverability defends the 0.45 floor; if the law
  is adopted, do it as proximity-born (fade in on pointer-near), never a hard removal. Named
  divergence, deliberate either way.
- **card** — the inner art card: content-tier saturation on a neutral ambient sheet — the same
  glass-never-carries-color doctrine (Asset 8). HAS by construction.

---

## Asset 12 — Screenshot 2026-06-21 at 14.38.58.png — the "Search places" capsule

### Design register (crop 574×234)

| property | fresh value | prior | verdict |
|---|---|---|---|
| capsule | 464×126px, r=63px=h/2 full stadium | ~130px tall | RATIFIED |
| surface | (248,243,236) warm near-opaque white | RATIFIED | the warm-cream register — OUR family (see Asset 9 note) |
| ink | darkest strokes (33,31,29) warm-neutral (the icons); placeholder visually warm brown | "warm brown ink" | REFINED — brown holds for the text; icons run darker |
| border | none | RATIFIED | |
| shadow | **MEASURED ZERO** — ΔL < 0.5 over 40px below the capsule (219.7→219.8); left-flank ΔL top-vs-bottom ~14 is the ambient gradient, not a cast | "negligible shadow" | RATIFIED, now quantified |
| ground | above (227,190,168) → below (233,218,198): the capsule floats on an ambient gradient, unanchored | — | new |

### Lens 1 — breath of life

The idle rung made exemplary: material only, zero shadow theater, warmth in the ink and not just
the surface (SUFFUSION §1.1 idle: no specular motion, no light events at rest). Its engagement is
all POTENTIAL: focus blooms from the caret entry (D-row), the field brightens one step. Scalars at
rest: none expressed — that is the point; `--engage-t` is the first to wake.

### Lens 2 — components touched

- **search / input** — HAS the axes to reach this register (size/surface/variant,
  `SearchBar.vue:44-56`; `variant: bare|floating` chromeless rungs, `searchVariants.ts`).
  CONTRADICTS at the DEFAULT register: our field default carries a 1.5px border + directional rim
  shadows (`src/components/_shared/field-control.css:12-15`) where the exemplar is borderless,
  shadowless, near-opaque. Verdict in our language: keep the default (glass-ui fields are glass —
  the rim IS our identity), but the exemplar's warm-opaque-floating register should be reachable
  as `surface="opaque" variant="floating"` with WARM INK — and the ink-warmth token is the gap:
  our muted-foreground is not warmed per-surface. Small token move, named: warm the capsule
  field's placeholder/icon ink toward the surface's own hue family (the "warmth in the ink, not
  just the surface" lesson), consumer-overridable per presets-in-consumers.

---

## The components-touched index (the full roster pass)

Every roster component this corpus bears on; state verified on disk with pins above.

| component | exemplar(s) | the register taught | shipped state |
|---|---|---|---|
| slider | 2287/2288 | occupied-length fill; growth=one-pitch exact; dots absorbed under fill; ends compress | HAS fill+physics (Slider.vue:225,428-460); LACKS dot absorption + modal variant (N1 open) |
| toggle-group / tabs | 2287/2288 | ordinal selection = grow-to-absorb, distinct from nominal lens-travel | HAS lens (SegmentedTabs.vue:206); LACKS absorb variant |
| pager-dots | 2287 (contrast) | worm = position idiom; absorb-pill = magnitude idiom; never merge them | HAS worm (PagerDots.vue:6-33) — correctly separate |
| scroll-progress-rim | 2287 (law 12 arrow) | fill-pill + dots as the replacement model | LACKS (still rim-gradient; ScrollProgressRim.vue:16-27) — BJ candidate |
| progress | 2287 family | fill-tip velocity glint (licensed); fill stays ζ≥1 | LACKS glint (Progress.vue, none) |
| dialog | 2287 medium; 1874 | graded directional-ramp medium; band backplate; one saturated accent | HAS graded halo (ModalOverlay.vue:26-29,49,78; tokens glass.css:158-173) — judge material now measured |
| drawer | 1874, Maps, 14.38.54 | detents, position-mapped material, companions ride+clamp+predictive-fade, grabber-at-first-touch | HAS ladder+scrub (Drawer.vue:49-51; useDrawerSnap.ts:154-172); LACKS companion recipe (doc, not API); CONTRADICTS law 7a grabber (deliberate, named) |
| search / input | 14.38.58, Maps | warm near-opaque capsule, zero shadow, warm INK; capsule 44pt class | HAS axes (SearchBar.vue:44-56); CONTRADICTS at default (border+rim, field-control.css:12-15 — our identity, kept); GAP: warm-ink token |
| button / chip | 1874 row, 1881 | two-tier capsule row; anisotropic rim, quiet sides, light insets; lower-edge shine | HAS rim model (glass-fx.css:143-148, rim.css:66-80); CONTRADICTS lower-bright-edge — resolve as velocity-keyed caustic at engagement, not idle |
| card / surface | 1874, Maps, 14.38.54 | tint-from-beneath, text clamped; glass never carries brand color | HAS tint seam (tokens glass.css:253-267) + accent-rim-only fence (rim.css:60-64); LACKS true backdrop sampling (platform; declared divergence) |
| dock | 04.08.x, Maps rest, 1880 | one scalar, origin-anchored, EXPAND grows the pill; gap≈0.75r proportion | HAS (useDockMorph.ts:8,29; springPresets.ts:95-97 = {0.30, 0.82}, inside the C2 bracket); LACKS the radius/gap lint (law 4 arrow) |
| configurator / radio-group | 01.41.17 | layout floors precede engagement | HAS stage floor (Configurator.vue:190) |
| expandable-container | 14.38.54, 1880 | identity thread across poles; ordered-axis growth | HAS carriers (useElementMorph.ts, useMotionAxis.ts); LACKS public x/y/z axis API (law 9 arrow — dock greenfield's) |
| avatar | Maps | saturated content circle on neutral glass | HAS by construction (trace) |
| metric / table / timeline | 1882 | ranked-bar idiom; J-row calm | HAS the restraint law; idiom is consumer vocabulary (trace) |
| FeedbackMark (checkbox/field valid) | 1874 spans | state relayed by tint/mark, not motion | HAS vehicle (_shared/FeedbackMark.vue) |

## The corrections ledger (fresh measurement vs prior canon)

1. **VOID (geometry): the 2287 backplate "soft elliptical luminance lift"** → a full-width band,
   flat horizontally, feathered vertically ~150px above / ~50px below the track, zero beyond.
2. **BOUNDED (was overstated): the 2287 blur ramp ceiling "~20pt"** → last measurable edge reads
   blur(~9pt); ceiling unprovable (dim crushes deeper content). Ramp distance 60–85pt RATIFIED.
3. **CORRECTED: Maps place circles "~60pt-class"** → Home d=74pt measured.
4. **CORRECTED: Maps search capsule "~40pt tall"** → 44–45pt measured; law-4 gap proportion
   measured at gap ≈ 0.75 × capsule radius (16–17pt vs 22pt).
5. **CORRECTED: IMG_1874 diffuser "~65-75%"** → per-channel α (0.68, 0.56, 0.67); the G-dip is the
   saturation mechanism.
6. **CORRECTED (scale): 14.38.54 sheet radius "~36-44 CSS px"** → r=55px at ~1.75px/pt ≈ 31pt;
   prior assumed the wrong device scale. Grabber 72×10px (not 56×8).
7. **DOWNGRADED to visual: IMG_1874 sheet radius ~28pt and Maps sheet radius ~24pt** — both
   tracers defeated (white-on-white margin; satellite texture). INCONCLUSIVE as measurements;
   the estimates stand only as estimates.
8. **RATIFIED-and-sharpened: law 12's growth** — thumb growth (+160px) equals the dot pitch
   (161px) to 0.6%: "grows one dot pitch" is now an exact, measured law. Track 340×71pt; thumb
   155→209pt; dots 12pt; inset 12pt.
9. **RATIFIED: 14.38.58 zero shadow** (ΔL<0.5 over 40px) + the warm-family convergence between
   the exemplar capsule (248,243,236) and our ecru ground (243,242,240).
10. **RATIFIED on disk: springPreset("dock") = {0.30, 0.82}** — read fresh from
    springPresets.ts:95-97, inside MARKS PASS-2 C2's fitted bracket; the drifted {0.68, 0.64}
    header-comment literal stays refuted.

Design-language note governing every recommendation above: the corpus's warm registers converge on
ours (Assets 9, 12) — the moves proposed are register completions (warm ink, absorption variant,
engagement-keyed lower caustic), never clones; our glass, our palettes, our rounding hold.

## Verification (2026-07-19)

Verified-model: claude-fable-5. An independent re-derivation pass (scratchpad
`corpus-redo/stills-a/verify.py`/`verify2.py`/`verify3.py`) re-measured the load-bearing claims
from the raw stills without reusing the measure-pass outputs:

- 2287/2288 thumbs 466px/626px (growth +160), dot centers 683/844/1005 (pitch 161px), the 3→2
  dot absorption visible in 2288 — the law-12 growth=pitch exactness stands.
- 14.38.58 capsule bbox 464×126px, surface (248,244,237), luminance FLAT (Δ<0.1) at 5/20/40px
  below the capsule — the zero-shadow claim stands.
- 04.08.42 ecru (243,242,240) exact; Maps sheet top edge y=1465 exact (max vertical-gradient row);
  IMG_1874 confirm circle re-found as a 129×129px connected component (claimed d=130px) and the
  raw-bubble reference (95,44,92) reproduced at (900,600).
- All file:line pins re-opened on disk and confirmed, including `springPreset("dock")`
  {0.30, 0.82} read fresh. One pin corrected: the pager-worm composable lives at
  `src/components/pager-dots/composables/usePagerWorm.ts`, not at the package root.
