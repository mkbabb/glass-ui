# PI-BATTERY — δ · config · fourier · scroll · story

**28 cells · 91 banked artifacts · adjudicated post-mortem.**

**Seat model:** `claude-opus-5`, read from this seat's own subagent transcript
`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/agent-adb3c491b5d3f4673.jsonl`
(first user message = this adjudication order; `message.model` on the first assistant
record → `claude-opus-5`). The assertion `&&`-gated every command below. `CLAUDE_MODEL_ID`
is unset.

**Repo state:** HEAD `ebb58a0f`, `git status --porcelain` empty. This seat wrote exactly
one file: this one. No source byte, no capture, **no browser** — every verdict below is
derived from the dead capture seat's banked artifacts plus on-disk source corroboration.

**Orders of record**, re-read on disk before any artifact was opened:

| cells | order |
|---|---|
| δ-π-1…4 | `docs/tranches/BK/execution/2026-08-10-lanedelta-unit1/RECORD.md` §7 |
| δ2-π-1…8 | `docs/tranches/BK/execution/2026-08-10-lanedelta-unit2/RECORD.md` §7 |
| δ4-π-1…8 | `docs/tranches/BK/execution/2026-08-10-lanedelta-unit3/RECORD.md` §8 |
| δ3-π-1…8 | `docs/tranches/BK/execution/2026-08-10-lanedelta-unit4/RECORD.md` §8 |

(unit3 carries δ4 and unit4 carries δ3 — the numbering is not the unit numbering, and this
battery follows the records, not the arithmetic.)

---

## COVERAGE

```
16 CAPTURED-GREEN / 7 DEFECT-ROUTED / 4 INSUFFICIENT-EVIDENCE / 1 OWED-TO-BROWSER-SEAT
                                                                          = 28
```

---

## §1 · UNIT-1 CELLS — the configurator re-key and the full-span sections

### δ-π-1 · `/substrates/blob` @1440 — **CAPTURED-GREEN**

**Order:** *"`[data-slot=configurator]` `gridTemplateColumns` reports TWO tracks and the
shell's `clientWidth` ≥ 1024 — the re-key's whole point, measured on the box it now
measures"*

**Artifacts:** `pi-d1-CONFIG-tracks-1440-light.json` · `pi-d1-CONFIG-tracks-1440-light.png`

**Mapping.** The JSON reads `gridTemplateColumns: "830px 400px"`, `trackCount: 2`,
`shellClientWidth: 1230`, `shellContainerType: "inline-size"`. Two tracks ✓, 1230 ≥ 1024 ✓,
and `inline-size` is the container-vs-viewport half of the claim — the re-key measures the
shell, not the window. The PNG corroborates by eye: an 830px stage carrying the painted
blob beside a 400px `Interaction` aside. Nothing here rests on the filename.

*Caveat (see O1):* the frame is labelled `light` and renders dark. The detector is pure
geometry, so the verdict is unaffected.

### δ-π-2 · expand + WGPU paint — **CAPTURED-GREEN**

**Order:** *"expand trigger click → `.expandable-container[data-state=expanded]`;
`getComputedStyle(root).backdropFilter === "none"` and the WGPU stage still paints
(screenshot; **never** `getContext()` — the context-steal trap)"*

**Artifacts:** `pi-d2-EXPAND-wgpu-1440-light.json` ·
`pi-d2-EXPAND-wgpu-1440-light.pixels.json` · `pi-d2-EXPAND-wgpu-1440-light.png`

**Mapping.** `dataState: "expanded"` ✓. `rootBackdropFilter: "none"`, `rootFilter: "none"`,
`ancestorBackdropFilters: []` ✓ — nothing above it re-introduces a filter either. Paint: the
pixels file crops the `goo-blob-canvas` at its own rect `[136,104,768,768]` and reports
`uniqueColors: 5825`, `blackShare: 0.0`, `nearBlackShare: 0.0`, OKLab `Lmin 0.2225 /
Lmax 0.9445` — a live gradient body, not a dead buffer. The PNG shows the expanded overlay
with the blob rendered large and specular. `getContext()` was never called; the JSON says so
and the method holds.

### δ-π-3 · `/foundations/typography` @1440 — **CAPTURED-GREEN**

**Order:** *"the three `[data-span=full]` sections each report `gridColumn` spanning the
field; the audacious glyph's rendered width ≤ its section's `clientWidth`"*

**Artifacts:** `pi-d3-TYPO-fullspan-1440-light.json` · `pi-d3-TYPO-fullspan-1440-light.png`

**Mapping.** `count: 3` ✓. All three report `gridColumn: "1 / -1"` (`gridColumnStart "1"`,
`gridColumnEnd "-1"`) against a field of `418.664px 418.664px 418.664px`, and each measures
`clientWidth 1296 = scrollWidth 1296 = rectW 1296` — the span is real, not a class name. The
glyph arm: section 1's `widestDescendant` is the `text-display-audacious` DIV at `w: 1296`
against `clientW: 1296` → `≤` holds at equality; `overflows: false` on all three and
`scrollerHorizontalOverflow: false`. PNG shows the `Aa` specimen and the two story sections
running the full field.

*Caveat (O1):* labelled `light`, renders dark. Geometry detector; unaffected.

### δ-π-4 · `/substrates/blob` @390 — **CAPTURED-GREEN**

**Order:** *"container < 64rem ⇒ ONE track, aside `borderBlockStartWidth` non-zero and
`borderInlineStartWidth` 0 — the seam and the split agreeing at the stacked arm"*

**Artifacts:** `pi-d4-CONFIG-stacked-390-light.json` · `pi-d4-CONFIG-stacked-390-light.png`

**Mapping.** `shellClientWidth: 308` = `shellClientRem: 19.25` — comfortably under 64rem ✓.
`gridTemplateColumns: "308px"`, `trackCount: 1` ✓. The aside is found
(`configurator-aside flex min-h-0 min-w-0 flex-col border-t`) with
`borderBlockStartWidth: "1px"` / `borderInlineStartWidth: "0px"`, both `solid` — the seam
rotated with the split, which is the whole claim. PNG shows the stacked arm: presets ribbon,
then the stage with the blob painting.

---

## §2 · UNIT-2 CELLS — the Fourier field

**One root cause takes six of the eight.** Read it once here; each cell below cites it as
**D1**.

The stage never paints because the WGSL module fails validation:

```
WebGPU·[useWebGPUCanvas] pipeline failed validation (Error while parsing WGSL: :100:32
error: unresolved value 'PI'
  if (H < 0.0) { H = H + 2.0 * PI; }
                               ^^
 - While calling [Device].CreateShaderModule([ShaderModuleDescriptor ""[FourierField] render.wgsl""]).)
```

(verbatim from `pi-d2p1-FOURIER-boot-1440-light.json` and
`pi-d2p1-FOURIER-status-owner-chain.json`.)

**Corroborated in source at HEAD `ebb58a0f`, not inferred from the message:**

- `src/composables/glass/procedural/color.wgsl.ts:105` is the failing statement, verbatim:
  `  if (H < 0.0) { H = H + 2.0 * PI; }`
- the chunk states its own contract at `:52-53` — *"PI must be in scope (the consumer
  defines it first, as the GLSL chunk requires)"*
- `src/components/fourier-field/shaders/render.wgsl.ts:24-27` imports `OETF_WGSL` and
  `OKLCH_MATRICES_WGSL` from that chunk, and `grep -c "const PI" render.wgsl.ts` → **0**
- the two consumers that honour the contract:
  `src/components/aurora/constants/shaders/aurora.wgsl.ts:49` and
  `src/components/blob/shaders/metaball.wgsl.ts:53`, both
  `const PI: f32 = 3.141592653589793;`

FourierField splices the OKLCh matrices and never defines `PI`. `navigatorGpuPresent: true`,
`consoleErrors: 0` — the device is fine; the module is not.

### δ2-π-1 · boot + ℱ photometry, light AND dark — **DEFECT-ROUTED(D1)**

**Order:** *"mark:ink ∈ [1.5,3.0]:1 at the head · ink:ground ≤12:1 light, ≥1.5:1 dark ·
darkest marked pixel C ≥ 0.04 · neutral-dark share ≤5% · **no white specular cluster on the
head**"*

**Artifacts:** `pi-d2p1-FOURIER-boot-1440-light.json` ·
`pi-d2p1-FOURIER-boot-1440-light.png` · `pi-d2p1-FOURIER-shader-error-source.json` ·
`pi-d2p1-FOURIER-status-owner-chain.json`

**Mapping.** `rendererStatusState: "error"`, `rendererStatusRenderer: "webgpu"`. The PNG,
opened: the stage well is empty — no rings, no chain, no reconstruction, no head — with the
red status pill reading the validation error at top-left. Every one of the five ordered
detectors is a measurement **of a mark**, and there are no marks. The cell is not failed on
its photometry; it is unreachable, and reporting a photometric green here would be reporting
the aurora substrate showing through a transparent canvas.

The two chain files fence the finding: the status `OUTPUT` is a sibling of the canvas, not a
child (`canvasIsInsideRendererEl: false`, `statusInsideFourierField: false`,
`statusIsSiblingOfAurora: false`), so the status text is FourierField's own and not another
component's leaking in.

*Second reason this cell cannot be re-derived green from the banked set:* the light arm's
frame renders dark (O1), so even a cured shader would need a re-capture.

### δ2-π-2 · N ∈ {1, 8, 16, 61} — **DEFECT-ROUTED(D1 + rider D1b)**

**Order:** *"N=1 paints exactly one ring; marked share grows monotonically; **the figure does
not rescale between steps** (the fit-fixed-under-N claim)"*

**Artifacts:** `pi-d2p2-FOURIER-Nsweep-1440-dark.json`

**Mapping.** `rendererState: "error"` — all three detectors are paint detectors; all three
unreachable. The artifact also banks a finding that survives the cure: the term slider
reports `termMin "1"` / `termMax "15"` / `termNow "6"`, so on the default `elliptic` source
**N=16 and N=61 are out of range**. `orderedNSetIs_1_8_16_61: false`. The cell needs a source
carrying those N, or the order restated — routed as **D1b**.

### δ2-π-3 · dark ring law + hue fence — **DEFECT-ROUTED(D1)**

**Order:** *"ring:ground ≥3.0:1 · **zero pixels in OKLab hue 80–120°** (the chain sweep
cannot reach chartreuse)"*

**Artifacts:** `pi-d2p3-FOURIER-dark-1440-dark.png` ·
`pi-d2p3-FOURIER-dark-ringhue.pixels.json` · `pi-d2p3-FOURIER-ringlaw-hue-1440-dark.json`

**Mapping.** The pixels file measures the visible stage box `830×335` (278,050 px) and
returns `chartreuseHue80to120Pixels: 0`. **That zero is vacuous and must not be banked as a
green** — there is nothing painted to be chartreuse. The PNG confirms the empty well. The
`ring:ground` arm has no ring. The seat's own file says `SPLIT — chartreuse arm reads ZERO
but VACUOUSLY`; this battery adopts that reading and routes the cell.

*Do not mis-cite the neighbour:* `pi-d2-EXPAND-wgpu-1440-light.pixels.json` reports
`chartreuseHue80to120Share: 0.001316` / **776 px**. That is the **blob** crop under δ-π-2, a
different subject entirely, and it is not evidence for or against this cell.

### δ2-π-4 · interactive a11y + clock — **DEFECT-ROUTED(D1 + rider D1a)**

**Order:** *"role census; `aria-valuenow` before/after ArrowRight ×5 + Home; valuetext
contains the badge; t=0 vs t=3 s differ while playing, static when paused"*

**Artifacts:** `pi-d2p4-FOURIER-a11y-1440-dark.json` ·
`pi-d2p4-FOURIER-a11y-before-1440-dark.json` ·
`pi-d2p4-FOURIER-clock-untouched-1440-dark.json` ·
`pi-d2p4-FOURIER-transport-state-1440-dark.json`

**Mapping — three arms evidenced, one down, one unbanked.**

- *role census* — **evidenced**: `group 1 · slider 9 · combobox 3 · region 5 · switch 3 ·
  radiogroup 1 · radio 3`, independently reproduced in the `-before-` file.
- *keyboard walk* — **evidenced**: `before "0.001"` → ArrowRight×5 → `"0.079"` → Home → `"0"`;
  `monotonicIncrease: true`, `homeReturnsToMin: true`.
- *valuetext* — **evidenced**: `"N 6/15 · 0% through the period"`, `valuetextCarriesBadge:
  true`.
- *clock* — **DOWN**. `tZero.loop "0.00104375"` and `tThreeSeconds.loop "0.00104375"`,
  identical across 3s, while `Sweep the chain` is `checked: "true"` and
  `Pause background animation` is `pressed: "false"` — i.e. nominally playing and not
  advancing.
- *390×844 arm* — **NOT BANKED**. The order names `1440×900 + 390×844`; only 1440 was walked.

**Causation established on disk, not assumed:**
`src/components/fourier-field/renderer/wgpu.ts:72-73` — *"The per-frame hook — the clock
advances here, inside the substrate's own frame"* — and `:261` `onFrame?.(timeSec);`, with
`useFourierField.ts:106` defining `onFrame` and `:177` wiring it. A pipeline that fails
`CreateShaderModule` never reaches `:261`, so the clock cannot tick. The frozen clock is D1's
consequence, routed as **D1a**, not an independent clock defect.

### δ2-π-5 · flick sweep — **DEFECT-ROUTED(D1 + rider D1c)**

**Order:** *"per-frame `headT` trace at r0 ∈ {0.2…4.0}: **zero negative deltas**, ≤0.5 turns,
one impulse per gesture"*

**Artifacts:** `pi-d2p5-FOURIER-flick-1440-dark.json`

**Mapping.** `rendererState: "error"`, `clockAdvancesAtBoot: false` (cross-cited to the
δ2-π-4 clock file). No render loop ⇒ no per-frame trace to take. Routed to D1.

**Rider D1c, which outlives the cure:** `headTExposedToPage: false`. Even with a valid
pipeline this cell has no page-observable `headT`, so a browser seat cannot take the ordered
trace without a source-side instrumentation seam. Naming it here so the cure does not get
re-run and re-blocked.

### δ2-π-6 · ring law across 4 cells — **DEFECT-ROUTED(D1)**

**Order:** *"painted ring count vs `ringsAt` at the same stage — the CPU predicate and the
shader must agree"* across studio cap · 1440 · cel 21rem · 390.

**Artifacts:** `pi-d2p6-FOURIER-ringlaw-4cells-dark.json`

**Mapping.** `paintedRingCount: 0`, `rendererState: "error"`. The comparison has one side
only; a CPU predicate cannot be falsified against a shader that never compiled. Routed to D1.

*Rider:* even the geometry half is banked for **1 of the 4** ordered cells —
`stageBoxAt1440: [830, 499]` is present; studio-cap, cel-21rem and 390 stage boxes are not.

### δ2-π-7 · story mobile @390×844 — **INSUFFICIENT-EVIDENCE**

**Order:** *"no horizontal overflow; stage full-width; transport reachable; the source
picker's term counts legible"*

**Artifacts:** `pi-d2p7-FOURIER-mobile-390-dark.json` · `pi-d2p7-FOURIER-mobile-390-dark.png`

**Mapping — three of four arms evidenced, one unanswerable.**

- *no horizontal overflow* — **GREEN**: `scrollerScrollWidth 390 = scrollerClientWidth 390`,
  `docScrollWidth 390 = docClientWidth 390`, `scrollerOverflowX: "auto"` (so a bleed would
  have shown). PNG corroborates.
- *stage full-width* — **GREEN**: `stageWidth 308` = `shellClientWidth 308`,
  `stageFillsShell: true`, `canvasRect [41, 510, 308, 179]`.
- *term counts legible* — **GREEN on the DOM read**: the picker text is
  `"Elliptic — generated · 15 terms"` at `fs: "14px"`, untruncated. Noted honestly: the
  picker sits **below the fold** in the banked 390 frame, so this arm is a computed-style +
  text read, not a pixel read.
- *transport reachable* — **UNANSWERABLE from the banked set.** Of the 9 `[role=slider]`
  nodes, **8 measure `w: 0, h: 20`** — including the labelled `"Move through the loop"`. Only
  `"Fourier reconstruction parameter"` has a real box (`w 308, h 179`, the canvas-as-scrub).
  All 9 report `inViewportX: true`, which is why the capture seat's own verdict line reads
  `transportReachable: true` — but `inViewportX` on a zero-width box is not reachability. The
  banked set contains nothing that distinguishes *a collapsed accordion section* from *a
  starved control column* (cf. the census's R11 on the aurora studio), and this seat opens no
  browser.

**What's missing:** one measurement of the fourier configurator aside's box and its sections'
open/closed state at 390×844, plus a pointer-target rect for `"Move through the loop"`. Two
lines of a re-run closes it.

### δ2-π-8 · a no-WebGPU host — **CAPTURED-GREEN**

**Order:** *"`rendererStatus` reports the failure, **zero canvas pixels**, and no second
renderer stands up"*

**Artifacts:** `pi-d2p8-FOURIER-nowebgpu-1440-dark.json` ·
`pi-d2p8-FOURIER-nowebgpu-1440-dark.png`

**Mapping.** Method disclosed and sound: `navigate_page --initScript` defining
`navigator.gpu` as undefined, **no source byte touched**; `navigatorGpuPresent: false`
confirms it took.

- *reports the failure* ✓ — `rendererStatusPresent: true`, `rendererStatusState: "error"`,
  text verbatim: *"WebGL 2·[FourierField] WebGPU is required. This field paints the transform
  itself, so it ships one renderer and no lookalike — where WebGPU is absent it declares the
  failure and paints nothing."* This is a **different** message from D1's validation error,
  which is the proof the init script changed the path rather than re-hitting the same wall.
- *no second renderer* ✓ — `canvasCount: 2`: the shell's `aurora-canvas` (1440×900) and the
  `fourier-field-canvas` (1660×998). No third canvas, no lookalike.
- *zero canvas pixels* ✓ — judged by screenshot per the order's own method (`getContext()`
  forbidden). The PNG shows an empty stage well identical in character to D1's.

*Routed rider **D1d** (low severity), recorded beside the green rather than folded into it:*
the pill labels the renderer **"WebGL 2"** while declaring that no WebGL renderer stands up.
The label comes from the shared substrate tier model
(`src/composables/glass/webgpu/rendererStatus.ts:1` `RendererEngine`;
`src/composables/glass/webgpu/useGpuSubstrate.ts:108-109` — *"after `armAsync()` it reflects
the ACTUAL backend (it falls to `"webgl2"` …)"* — and `:153` `pendingRenderer("webgl2")`),
not from FourierField's refusal. A reader sees "WebGL 2" and infers a WebGL renderer is
running. The cell's three ordered detectors all pass; this is a UI-honesty snag for the
owner.

---

## §3 · UNIT-4 RECORD CELLS — δ3, the home and the landings

### δ3-π-1 · `/` mega title — **CAPTURED-GREEN**

**Order:** *"the `<h1>` computes `--story-hero-title-rung == var(--type-display-mega)`, its
rendered box does NOT exceed `.optical-bench`'s content box, and the fit-cap — not the rung —
is what bounds it at 390."*

**Artifacts:** `pi-d3p1-HOME-mega-1440-light.json` · `pi-d3p1-HOME-mega-1440-light.png` ·
`pi-d3p1-HOME-mega-390-light.json`

**Mapping.** `storyHeroTitleRung` and `typeDisplayMega` serialise to the *same* string —
`clamp(5.382rem, 4rem + 9vw, 11.089rem)` — `rungEqualsMega: true` ✓. Containment:
`h1Rect [137.8, 84, 1232, 184.8]` inside `benchRect [112, 32, 1296, 1484.9]`, with
`h1ScrollWidth 1232 = h1ClientWidth 1232` (no self-overflow) and `benchContentWidth 1296` ✓.
The 390 arm is the sharp one: `h1FontSizePx 40.8571` against `clampMinPx 86.11` — the
rendered size is **below the clamp's own minimum**, which can only be the fit-cap, not the
rung ✓. PNG shows `Glass UI` at 176px on cream with room either side.

*On the missing dark arm:* the order names light AND dark, and only light is banked. Verified
rather than waved through — `grep -rn "story-hero-title-rung\|type-display-mega" src/ demo/`
returns six definition sites (`demo/chassis/hero/story-hero.css:98,109,113,117,121,125`,
`src/styles/typography/scale.css:141`, `src/styles/typography/semantic.css:83`) and **zero**
under any `.dark` scope. The detector is theme-invariant by construction, so the light frames
answer it and the dark capture would be a duplicate.

### δ3-π-2 · `/` lead card span + `content-visibility` — **CAPTURED-GREEN**

**Order:** *"card 1 reports gridColumn spanning the field (`data-span=full`) and computed
`content-visibility` "visible"; cards 2..11 report "auto". Zero horizontal overflow on
`.demo-main-scroller` at both widths."*

**Artifacts:** `pi-d3p2-HOME-cards-1440-light.json` · `pi-d3p2-HOME-cards-390-light.json`

**Mapping.** Both widths: `cardCount: 11` ✓; card 1 (`/foundations`) `span: "full"`,
`gridColumn: "1 / -1"`, `contentVisibility: "visible"` ✓; cards 2–11 every one
`span: null, gridColumn: "auto", contentVisibility: "auto"` ✓ — the full eleven rows are
enumerated in each file, not summarised. Overflow: 1440 → `scrollerScrollWidth 1360 =
scrollerClientWidth 1360`, `doc 1440/1440`; 390 → `390/390` and `390/390` ✓. Field at 1440 is
`397.328px 397.336px 397.336px` and card 1 measures `w: 1232` — spanning all three tracks,
not merely labelled.

No PNG under this prefix, but `pi-d3p1-HOME-mega-1440-light.png` is the same
route/viewport/theme at the same minute and shows the full-span `Foundations` band above the
three-up row — visual corroboration by neighbour, and named as such.

### δ3-π-3 · `/` first paint — **CAPTURED-GREEN**

**Order:** *"no layout shift attributable to card 1 (the exemption's whole claim: an
above-fold card must not be skipped-then-corrected)."*

**Artifacts:** `pi-d3p3-HOME-firstpaint-cls-1440-light.json`

**Mapping.** Two independent instruments agree: `PerformanceObserver` `layout-shift`
`buffered: true` after a reload → `layoutShiftEntries: 0`, `cumulativeValue: 0`,
`shiftsAttributableToPreviewCards: 0`; and the CDP trace insight →
`{navigation: "NAVIGATION_0", LCP_ms: 380, CLS: 0}`. Card 1's state at the same read:
`contentVisibility: "visible"`, `span: "full"` — the exemption is in force and produced no
shift ✓.

### δ3-π-4 · three landings — **INSUFFICIENT-EVIDENCE**

**Order:** *"`/foundations/intro` + `/display` + `/substrates` @1440 · light AND dark — every
card resolves authored | still | none; NO card paints an empty well; NO card prints its title
twice. DELTA capture against a `git archive 8a96868d` tree — the 70-identity landing is the
before."*

**Artifacts (12):** `pi-d3p4-LANDING-display-1440-light.{json,png}` ·
`pi-d3p4-LANDING-display-1440-dark.{json,png}` ·
`pi-d3p4-LANDING-foundations-intro-1440-light.{json,png}` ·
`pi-d3p4-LANDING-foundations-intro-1440-dark.{json,png}` ·
`pi-d3p4-LANDING-substrates-1440-light.{json,png}` ·
`pi-d3p4-LANDING-substrates-1440-dark.{json,png}`

**Mapping — the three live arms are evidenced; the ordered DELTA is not banked.**

- *every card resolves* — **evidenced**. Per-card `kind` + `why`, enumerated:
  `/display` 6 cards `{authored 2, none 4}`; `/foundations/intro` 11 cards
  `{none 7, still 2, authored 2}`; `/substrates` 6 cards `{still 6}`. Identical tallies in
  both themes. Every row carries a reason (`"authored DOM tile: buttons-tile"`, `"img"`,
  `"svg"`, `"no media region mounted (a \`none\` card)"`) — no card falls through.
- *no empty well* — **evidenced**. `wellEmpty: false` on all 23 card-rows × 2 themes, and the
  PNGs show *why* the claim is true rather than vacuous: a `none` card mounts **no media
  region at all** (see `Surface`/`Badge` on `/display`, and the full-span `Foundations` band
  on `/foundations/intro`), which is the difference between "no well" and "empty well".
- *no doubled title* — **evidenced by the PNGs, not by the JSON.** The JSON field
  `titlePrintedTimes: 0` is computed against `title: ""` — an empty needle, so that field is
  vacuous and is not cited here. The six opened PNGs carry the real evidence: each card's
  title prints once beneath its media (`Buttons`, `Surface`, `Badge`, `Aurora`, `Foundations`).
- *the DELTA* — **NOT BANKED.** No `git archive 8a96868d` before-tree frames exist anywhere in
  this directory; the whole δ set is post-cut only. The order names the DELTA as an act, so the
  cell cannot close green on the live arms alone.

**What's missing:** six before-tree frames from a `git archive 8a96868d` checkout at the same
three routes × two themes @1440, paired against the six already banked.

*Carried for the browser seat:* these files are labelled `"cell": "delta3-pi-4 / delta3-pi-5"`
— see δ3-π-5 below.

### δ3-π-5 · `/display` + `/substrates` @1440 — **OWED-TO-BROWSER-SEAT**

**Order, quoted in full from `lanedelta-unit4/RECORD.md` §8:**

> ```
> δ3-π-5  /display + /substrates @1440
>         the four authored tiles and six stills paint; 0 GL contexts on any landing
>         (the ladder's construction claim, measured not asserted).
> ```

**Not this lane's cell.** δ3-π-5 belongs to the separate browser seat, and this seat opens no
browser. **OWED-TO-BROWSER-SEAT**, and the disposition below is deliberately not a verdict.

**State on disk, which moved during this adjudication — recorded so the record is not stale.**
At the census (and at this seat's open, 13:34) `ls pi-d3p5-*` → **0 files**: the one cell in
the band with neither artifact nor verdict. **The browser seat landed its capture at
13:42:17–13:44:26 while this battery was being written** — `ls pi-d3p5-*` now → **44 files**,
including `pi-d3p5-SUMMARY.json`, twelve `-LANDING-` route pairs across both themes,
`-TILEPAINT-` per-tile files, and the `-STILLS-scrolled-substrates-` pair. Captured against
`http://localhost:5401` (a second port — not this lane's 5400), `capturedAt
"2026-08-28T17:42:15.826Z"`.

**Those 44 files are the browser seat's to adjudicate, and this battery does not adjudicate
them.** They are named here only so a future reader is not misled by the census's `0`, and so
the two seats' artifact sets are not conflated: the 91 files this battery adjudicates carry
the `pi-d1/d2/d3/d4[p{n}]-` prefixes and stop at `pi-d3p8`; the `pi-d3p5-` set is disjoint
from them and post-dates them by an hour.

**Carried for that seat, expressly NOT a verdict.** The six δ3-π-4 files are labelled
`"cell": "delta3-pi-4 / delta3-pi-5"`, so a future seat will find them and should know what
they do and do not say:

- the `0 GL contexts` half has a partial reading — `canvasElementsOnPage: 1`,
  `auroraCanvases: 1`, `canvasesOutsideAurora: 0` on all three landings, both themes, judged
  by canvas **element** census + screenshot (`getContext()` never called);
- the `four authored tiles and six stills` half does **not** reconcile: `/display` tallies
  `{authored 2, none 4}` — two authored tiles, not four — and `/substrates` tallies
  `{still 6}`. Whether that is the ladder's claim being wrong, the order's count being
  wrong, or the two landings' authored tiles being counted across a different pair of routes
  is **the browser seat's to adjudicate**, on its own capture. It is recorded here so the
  figure is not lost, and it is not adjudicated here.

*Consistency check, offered and not adjudicated:* the browser seat's own
`pi-d3p5-SUMMARY.json` independently reports `/display · light` as
`{authored 2, none 4}` — the same tally this lane's δ3-π-4 files carry, from a different port
and an hour later. So the "four authored tiles" question is a question about the order or the
ladder, not about either capture being wrong. The GL half of its summary reads
`canvasCount 1 · ladderAttributedGl 0 · canvasesInLadder 0 · consoleErrors 0` on every route
listed, which is consistent with this lane's `canvasesOutsideAurora: 0`. Both readings belong
to the browser seat's battery.

### δ3-π-6 · `/navigation/toc-tracking` — **CAPTURED-GREEN**

**Order:** *"@1440 + 390 · light AND dark — both panes paint real glass (the `themed-card`
cure); the ToC track measures ≤ min(21rem, 30%); the stage is `--stage-block`; AA on the
tracked headings."*

**Artifacts (15):** `pi-d3p6-TOC-1440x900-{light,dark}.{json,png}` ·
`pi-d3p6-TOC-390x844-{light,dark}.{json,png}` · `pi-d3p6-TOC-AA-1440-{light,dark}.png` ·
`pi-d3p6-TOC-AA-VERDICT.json` · `pi-d3p6-TOC-AA-rects-1440-{light,dark}.json` ·
`pi-d3p6-TOC-headings-AA-{light,dark}.json`

**Mapping — all four arms evidenced across all four cells.**

- *both panes real glass* ✓ — at every one of the four cells, BOTH the ToC pane and the stage
  pane report `backdropFilter: "blur(16px) saturate(1.5)"` over a translucent ground
  (`color(srgb 0.20397 0.148263 0.0829736 / 0.14)` light, `color(srgb 0.0927547 0.0503523
  0.00879371 / 0.18)` dark) with `borderRadius: "12px"`. The PNGs show the aurora bleeding
  through both plates — a real backdrop, not a flat card.
- *track ≤ min(21rem, 30%)* ✓ — 1440: `containerClientWidth 1296`, cap =
  min(21rem = 336px, 30% = 388.8px) = **336**, `tocPane.width 336`, `trackCapPx 336` → holds
  at equality. 390: `containerClientWidth 350`, cap = min(336, 105) = **105**,
  `tocPane.width 105` → holds at equality. The cap changes hands between the two widths,
  which is the law actually biting.
- *stage is `--stage-block`* ✓ — `stageBlockToken: "min(62svh, 44rem)"` at all four cells;
  1440 `blockSize "558px"` = 62% of 900; 390 `blockSize "523.273px"` = 62% of 844;
  `maxBlockSize: "none"` (nothing else is capping it).
- *AA on the tracked headings* ✓ — the AA arm is a genuine pixel read, method disclosed: tight
  `Range` box per label (`-AA-rects-` files give the four boxes and their computed colours),
  ink = 2nd-percentile-luminance centroid, ground = modal plate colour, with the ink
  reproducing the computed colour exactly as the crop-landed check. **Tracked active
  `Section 1`: 8.87:1 light** (ink `[28,25,23]` / ground `[206,179,169]`, 1420 px) **and
  6.29:1 dark** (ink `[206,142,225]` / ground `[54,30,32]`); active `1.1 Subsection` 8.86
  light / 6.29 dark. All ≥ 4.5 ✓.

*Note:* the four `-TOC-{cell}.json` files carry `trackedHeadings: []` / `headingsCounted: 0` —
those files simply do not do the AA arm, and say so (`"AA on the tracked headings is measured
by the pixel arm on the paired screenshot"`). The `-AA-` files are where that arm lives. Do
not read the empty array as a zero result.

**Routed rider D3, beside the cell and not folded into it.** The **untracked** muted sibling
labels `1.2 Subsection` / `1.3 Subsection` measure **4.04:1 in LIGHT** at 14px — ink
`rgb(112, 89, 66)` on ground `[226,197,185]` / `[226,197,184]` — below the 4.5:1 AA floor for
normal text. Dark is clear at 9.34 / 9.28. The cell's own subject is *the tracked heading*,
which is green in both themes, so this is a finding beside the verdict. See §5 D3 for the
owner question.

### δ3-π-7 · one name in the a11y tree — **CAPTURED-GREEN**

**Order:** *"`/substrates/blob` + `/substrates/fourier-field` @1440 — the page's name appears
EXACTLY once in the rendered accessibility tree (the source-side G-ONE-NAME arm's runtime
twin)."*

**Artifacts:** `pi-d3p7-ONE-NAME-1440-light.json`

**Mapping, with the literal count printed so nobody has to trust a gloss.** Both routes
return `totalNodesCarryingTheName: 2`:

- `/substrates/blob` — `uid=13_21 heading "Blob" level="1"` and `uid=13_107 button "Blob"`
- `/substrates/fourier-field` — `uid=14_21 heading "Fourier Field" level="1"` and
  `uid=14_95 button "Fourier Field"`

and `headingOrLandmarkCarriers: 1` on both.

**The verdict rests on the order's own parenthesis**, which names this cell *the source-side
G-ONE-NAME arm's runtime twin* — G-ONE-NAME is #58's gate
(`docs/tranches/BK/EXECUTION-DAG-2026-08-03.md:69`: *"#58 | W-PREVIEW-CARD ·
W-STORY-TAXONOMY · W-STORY-PROPORTION | … | G-TILE-COVERAGE · G-ONE-NAME"*), i.e. a claim
about the page naming *itself* once, not about the string never occurring twice in a
document. The second carrier on each route is the **dock's navigation button** — visible in
`pi-d2p1-FOURIER-boot-1440-light.png` and `pi-d1-CONFIG-tracks-1440-light.png` as the rail
reading `Aurora · Blob · Constellation · Fourier Field · Glass Material · Glass Panel` — a
control naming its destination, which is what a nav button is for. One heading carrier per
page ✓.

*Recorded so the next seat can disagree with the reading rather than re-derive it:* if the
order is taken at its most literal ("exactly once, any node"), the banked figure is **2** and
the cell would be a finding against the dock's route buttons, not the page. This seat reads
the parenthesis as controlling.

*Theme/viewport:* light @1440 only; an a11y-tree census has no theme arm.

### δ3-π-8 · `/` @852×393 landscape — **CAPTURED-GREEN**

**Order:** *"the D0 mega title and the full-span lead card coexist without the hero eating the
fold — the cell #59's own §4 found by three pixels."*

**Artifacts:** `pi-d3p8-HOME-landscape-852x393-light.json` ·
`pi-d3p8-HOME-landscape-852x393-light.png`

**Mapping.** `h1FontSizePx 92` with `h1Rect [140.8, 84, 644, 96.6]` → `h1Bottom 180.6`.
`card1Span "full"`, `card1Rect [144, 241.5, 644, 105.4]` → `card1Top 241.5`,
`card1Bottom 346.9` against `foldPx 393`. The lead card starts above the fold **and finishes
above it** — `card1VisiblePxAboveFold: 105.4`, i.e. the whole card, with 46px to spare, not
the three-pixel squeak #59's §4 found. `scrollerScrollWidth 772 = scrollerClientWidth 772` →
no horizontal overflow ✓. The PNG shows title, full `Foundations` card, and the top edge of
the next row.

---

## §4 · UNIT-3 RECORD CELLS — δ4, the scroll chrome

### δ4-π-1 · rest no-op + collapse at 400 — **INSUFFICIENT-EVIDENCE**

**Order:** *"any ordinary story route · light AND dark · 1440×900 dpr1 + 390×844 —
`scrollTop 0` → computed `--chrome-collapse-t === 0`, and the header's rect is IDENTICAL to
the pre-cut baseline (the at-rest no-op claim); `scrollTop 400` → `--chrome-collapse-t === 1`
· the h1's rendered width has shrunk by the recipe's ruled depth · the plate is painted."*

**Artifacts:** `pi-d4p1-SCROLL-rest-1440-light.json` · `pi-d4p1-SCROLL-sweep-1440-light.json`
· `pi-d4p1-SCROLL-400-collapsed-1440-light.json` · `pi-d4p1-SCROLL-plate-probe-1440-light.json`

**Mapping — the collapse half is the strongest evidence in the whole band; the rest half is
missing its comparand.**

*Rest:* `scrollTop 0`, `chromeCollapseT: "0"`, `headerTransform:
"matrix(1, 0, 0, 1, 0, 0)"`, `headerOpacity "1"`, `headerPosition "sticky"`,
`headerRect [112, 32, 1296, 102.8515625]`, `headerClasses "story-page-chrome scroll-chrome"`.
The scalar arm is green. **The "IDENTICAL to the pre-cut baseline" arm has no comparand — no
pre-cut header rect is banked anywhere in this directory.** A rect cannot be compared to a
baseline that does not exist, and asserting the no-op from a single post-cut read would be
exactly the laundering this band forbids.

*Collapse at 400 (rAF-paced, 40 steps + settle):* `t: "1"`,
`headerRect [112, 26.720001220703125, 1140.48, 90.51]`, h1 `342.3515625` → `301.27`.

**The "recipe's ruled depth" re-derives exactly from source at HEAD `ebb58a0f` — five
independent figures, no rounding slack:**

`src/styles/scroll-chrome.css:46` `--chrome-shrink-depth: 0.12`; `:48` `--chrome-rise-px: 6px`;
`:68-69` `transform: scale(calc(1 - var(--chrome-collapse-t) * var(--chrome-shrink-depth)))
translateY(calc(var(--chrome-collapse-t) * var(--chrome-rise-px) * -1))`.

| figure | predicted | measured |
|---|---|---|
| scale at t=1 | 1 − 0.12 = **0.88** | `matrix(0.88, 0, 0, 0.88, 0, -5.28)` |
| translateY (scaled) | 6 × 0.88 = **−5.28** | `−5.28` |
| header width | 1296 × 0.88 = **1140.48** | `1140.48` |
| header height | 102.8515625 × 0.88 = **90.51** | `90.51` |
| h1 width | 342.3515625 × 0.88 = **301.27** | `301.27` |
| header y | 32 − 5.28 = **26.72** | `26.720001220703125` |

*The plate arm — `platePainted: false` is a FALSE NEGATIVE of the probe, not a defect.*
`pi-d4p1-SCROLL-plate-probe-1440-light.json` reads the **`background` shorthand** on
`.story-page-chrome::before` and gets `"rgba(0, 0, 0, 0)"`; the rule
(`demo/chassis/hero/story-hero.css:205-209`) authors **`background-image`** only. The same
pseudo, read as `backgroundImage` 65 seconds later in
`pi-d4p3-SCROLL-legibility-1440-light.json`, returns
`linear-gradient(color(srgb 0.994 0.96 0.926 / 0.7) 0px, color(srgb 0.994 0.96 0.926 / 0.7)
62%, rgba(0, 0, 0, 0))` at `opacity: "1"`, and
`pi-d4p3-SCROLL-collapsed-1440-light.png` shows the plate plainly. The probe's own fields
confirm it found the right element: `inset "0px -20px -20px"` = the authored
`inset-block: 0 calc(var(--sp-4) * -1)` / `inset-inline: calc(var(--sp-4) * -1)` at
`--sp-4 = 20px`; `opacity "1"` = the authored `opacity: var(--chrome-collapse-t)` at t=1;
`content: ""`, `position: absolute`, `display: block`.

*The sweep's `everLeftZero: false` is an instrumentation artefact, not a defect.*
`pi-d4p1-SCROLL-sweep-1440-light.json` walks `scrollTop` 0→3000 at 600ms/step and reads
`computedT "0"` at every stop. Grounds on disk:
`src/composables/motion/scroll/useScrollChrome.ts:14-18` — the machine *"reads the reader's
`direction`/`velocity`/`progress`/`recalculate` and ramps `collapseT` 0..1 on direction +
range"* — `:52` a **flip-delta debounce of 8px** before a direction commits, and `:196-200`
*"the direction-driven ramp … accumulates the scroll delta against `collapseRangePx`"*. An
instant `scrollTo` never commits a direction leg, so the ramp never engages. The capture
seat's own method note says the same thing, and the rAF-paced sibling artifact reaching
`t: "1"` is the control.

**What's missing:** a pre-cut baseline header rect to compare the at-rest read against. Also
unbanked under this prefix: the dark and 390 arms of the h1-shrink measurement — though the
*scalar* half of that matrix is covered elsewhere (`pi-d4p8-DELTA-capture.json` records
`collapseT` 0/1 across both themes × both viewports, and `pi-d4p5-SCROLL-overflow-390-dark.json`
reads `t: "1"` at 390 dark).

### δ4-π-2 · scroll-stop snap — **CAPTURED-GREEN**

**Order:** *"stop mid-range → the scalar settles to EXACTLY 0 or 1 within the dock settle,
never parked half-collapsed at rest."*

**Artifacts:** `pi-d4p2-SCROLL-snap-1440-light.json`

**Mapping.** Range and midpoint taken from source, not invented:
`collapseRangePxFromSource: 116`, `snapMidpointFromSource: 0.5`. Three trials, each stopped
genuinely mid-range and read after a 900ms settle:

| stop | t mid-gesture | t after settle |
|---|---|---|
| 30px | `0.0541122` | `"0"` |
| 58px | `0.223488` | `"0"` |
| 80px | `0.357874` | `"1"` |

`allSettledToEndpoint: true`, `neverParkedHalfCollapsed: true`. Every mid-gesture value is a
real interior fraction, so the trials were not trivially at an endpoint already ✓.

*Recorded, not a defect:* trial 3 settles to **1** from a mid-gesture `0.357874` that is below
`snapMidpoint 0.5`. The settle is therefore not a naive round-of-the-instantaneous-t, which is
consistent with the machine re-anchoring per direction leg
(`useScrollChrome.ts:176-177`: `const settled = collapseT.value >= snapMidpoint ? 1 : 0;
rampAnchorPos = null; // the next direction leg re-anchors`). The order asks only that it
settle to exactly 0 or 1 and never park half-collapsed. It does, 3/3.

### δ4-π-3 · legibility under the collapsed chrome — **DEFECT-ROUTED(D2)**

**Order:** *"light AND dark — h1 over the plate ≥ AA · the return-leg link ≥ AA · content
passing beneath reads as washed, never as occluded. (`--chrome-fade-depth` is 0, so the
chrome's own opacity must measure 1 at EVERY fraction.)"*

**Artifacts (8):** `pi-d4p3-SCROLL-collapsed-1440-light.png` ·
`pi-d4p3-SCROLL-collapsed-1440-dark.png` · `pi-d4p3-SCROLL-legibility-1440-light.json` ·
`pi-d4p3-SCROLL-legibility-1440-dark.json` · `pi-d4p3-SCROLL-legibility-1440-light.aa.json` ·
`pi-d4p3-SCROLL-legibility-1440-dark.aa.json` ·
`pi-d4p3-SCROLL-legibility-dark-token-corroboration.json` ·
`pi-d4p3-SCROLL-opacity-every-fraction-1440-light.json`

**Mapping — three arms green, the fourth fails in dark.**

*Opacity at every fraction* — **GREEN, and strongly.** `--chrome-fade-depth` computes `"0"`
(the demo override at `demo/chassis/hero/story-hero.css:184`, against the library default
`0.28` at `src/styles/scroll-chrome.css:52`). Measured: `framesSampled: 90`,
`intermediateFractionsSeen: 70`, `tRangeSeen: [0, 1]`, `distinctOpacities: ["1"]`. Seventy
genuine interior fractions and one distinct opacity ✓.

*h1 and return-leg AA, light* — **GREEN.** h1 `15.71:1` (ink `[28,25,23]` / ground
`[252,241,230]` over 11,778 px); return leg `← Foundations` `4.76:1` (ink `[126,104,82]` /
ground `[252,242,230]` over 2,142 px). Both ≥ 4.5 ✓. The ground reproduces the plate gradient
(`color(srgb 0.994 0.96 0.926 / 0.7)`) composited over paper, which is the check that the
crop landed on the plate.

*h1 and return-leg AA, dark* — **GREEN, but on a repaired instrument.** The decile arm in
`-1440-dark.aa.json` returns ink `[43,34,27]` / ground `[233,229,226]` for **both** the h1 and
the return leg — the same pair for two differently-coloured subjects (`h1Color
"rgb(233, 230, 226)"`, `linkColor "rgb(172, 160, 145)"`), so the arm did not land on the
chrome's ink at all. The seat's own
`pi-d4p3-SCROLL-legibility-dark-token-corroboration.json` concedes *"the decile arm picked a
brighter neighbour"* and re-derives against the **measured** dark ground `[43,34,27]`:
h1 `12.53:1`, link `6.08:1`. Both ≥ 4.5 ✓. Recorded honestly: the dark AA figures are
computed colour × measured ground, not a pure pixel decile.

*Content passing beneath reads as washed, never as occluded* — **FAILS IN DARK.**

Opened and compared, at the same route, same scroll depth, same collapse state:

- `pi-d4p3-SCROLL-collapsed-1440-light.png` — the plate is a clear warm band; the
  `text-display-audacious` **`Aa`** specimen passing beneath reads as a faint grey ghost;
  the h1 `Typography` reads clean. This is the ordered behaviour, exactly.
- `pi-d4p3-SCROLL-collapsed-1440-dark.png` — the plate is all but invisible and the **`Aa`**
  glyph's opaque strokes **cut straight through the h1**: the `T` is struck by the `A`'s
  diagonal and the `yp` by the `a`'s bowl. The title does not read as washed-over content; it
  reads as damaged.
- `pi-d4p8-DELTA-collapsed-390x844-dark.png` — the second and worse site: the heading
  `Audacious peaks` prints solid over the `← Foundations` return leg, which is nearly
  unreadable behind it.
- `pi-d4p8-DELTA-collapsed-390x844-light.png` — the same frame in light, with the same content
  at the same depth, washed to a ghost and the return leg clean. The light/dark pair at 390 is
  the cleanest single delta for this defect.

**Why the AA numbers did not catch it:** the contaminating glyph is what the dark decile arm
locked onto. The instrument's failure and the defect are the same phenomenon.

**Root cause on disk** — see §5 **D2**.

### δ4-π-4 · PRM reduce — **INSUFFICIENT-EVIDENCE**

**Order:** *"@1440×900 — zero interpolation frames · the scalar is only ever 0 or 1 · the
chrome is never observed half-collapsed."*

**Artifacts:** `pi-d4p4-SCROLL-prm-1440-dark.json` · `pi-d4p4-SCROLL-prm-legsplit-1440-dark.json`

**Mapping.** The first file looks like a flat failure —
`distinctScalars: [0, 0.0456, 0.1567, 0.2986, 0.4238, 0.5608, 0.6676, 0.7557, 0.8244, 0.8732,
0.9185, 0.946, 0.9674, 1]`, `interpolationFrames: 12`, all three verdict booleans `false`.
**It is not a failure; it is an un-emulated leg.** The second file splits it and is right to:

- *JS-writer leg* — **evidenced GREEN**: `matchMedia` stubbed at document-start so the JS sees
  PRM; the inline value takes `["0", "1"]` and nothing else over 90 frames,
  `onlyEndpoints: true`. The machine snaps.
- *CSS-transition leg* — **NOT EMULATED**: a JS `matchMedia` stub cannot reach a real
  `@media` query, and the chrome-devtools CLI exposes no reduced-motion emulation. So the 12
  interpolation frames are the **no-preference** transition running normally, which is what
  the engine was actually in.

**Gates verified on disk** rather than taken from the artifact:
`demo/chassis/hero/story-hero.css:226` `@media (prefers-reduced-motion: no-preference)`
wrapping `transition: --chrome-collapse-t var(--spring-dock-duration) var(--spring-dock)` —
exactly as the seat cited. `src/styles/scroll-chrome.css` — the seat cited **`:103`**; the
actual gates are at **`:63`** (the transform/opacity ramp) and **`:104`** (the native-ramp
keyframe block). Citation corrected, claim unchanged: both are
`@media (prefers-reduced-motion: no-preference)`, so under a real reduce the ramp does not
apply at all.

**What's missing:** a browser actually launched under reduced motion (an OS-level preference,
or `--force-prefers-reduced-motion`), so the CSS leg is exercised rather than stubbed around.
Everything else the cell needs is already banked.

### δ4-π-5 · G1 inline bleed — **CAPTURED-GREEN**

**Order:** *"390×844 + 852×393 landscape — the plate's one-rung inline bleed introduces NO
horizontal overflow on `.demo-main-scroller` (its `overflow-x` computes to auto, so a bleed
would scroll)."*

**Artifacts:** `pi-d4p5-SCROLL-overflow-390-dark.json` ·
`pi-d4p5-SCROLL-overflow-852x393-landscape-dark.json`

**Mapping.** The order's own precondition is checked first: `ox: "auto"` at both viewports, so
a bleed *would* have scrolled and the null result is meaningful rather than masked.

| | at rest | at full collapse (t=1) | plate inset |
|---|---|---|---|
| 390×844 | `sw 390 = cw 390`, doc `[390, 390]` | `sw 390 = cw 390`, doc `[390, 390]` | `"0px -12px -12px"` |
| 852×393 | `sw 772 = cw 772`, doc `[852, 852]` | `sw 772 = cw 772`, doc `[852, 852]` | `"0px -20px -20px"` |

The bleed is real and one rung at each width (12px at 390, 20px at 852 — the `--sp-4` ladder),
the header shrinks (`headerRect [20, 14.7, 308, 65.8]` and `[112, 26.7, 623, 78.2]`), and the
scroller does not move ✓. Dark only; the detector is scroll geometry, theme-invariant.

### δ4-π-6 · compositor-only — **CAPTURED-GREEN**

**Order:** *"CDP trace across a 600px scroll burst — the Layout track stays FLAT — the
sticky+scale chrome triggers no reflow per scroll frame (motion-canon P5 /
proof:no-layout-animation)."*

**Artifacts:** `pi-d4p6-SCROLL-layout-track.json`

**Mapping.** A real burst on a real trace: `"600px, rAF-paced, 60 steps"`,
`traceBytes: 28186540`. The ordered track:
**`Layout: {count: 0, totalUs: 0, maxUs: 0}`** ✓ — flat, not merely small. The neighbours are
recorded and are not the ordered subject: `UpdateLayoutTree` 23 / 5287µs (style recalc, which
a custom-property write legitimately causes), `Paint` 40 / 1096µs, `Commit` 1777 / 26710µs.
The top-event census is compositor traffic throughout (`UpdateLayer` 7116,
`PipelineReporter`/`BeginImplFrame…` 2376 each), which is the shape a compositor-only chrome
should produce.

### δ4-π-7 · hero routes — **CAPTURED-GREEN**

**Order:** *"hero routes · a category landing — no chrome mounts · `--chrome-collapse-t` rests
at its initial 0 · no plate paints."*

**Artifacts:** `pi-d4p7-SCROLL-hero-no-chrome-1440-dark.json`

**Mapping.** Route `/foundations`, `routeKind: "category landing (hero route)"` — the ordered
subject. `storyPageChromeMounted: false` ✓; `anyScrollChromeAtRest: false` **and**
`anyScrollChromeAfterScroll: false` after `scrolledTo: 341` — the negative is tested under
scroll, not only at rest, which is the only way it means anything ✓;
`rootCollapseTBefore "0"` / `rootCollapseTAfterScroll "0"` ✓; `platesPainting: 0` ✓.

*Scope noted:* one category landing probed, at 1440 dark. The order names the class; the
banked evidence is one member of it.

### δ4-π-8 · DELTA capture — **CAPTURED-GREEN** (capture as ordered; one prose line struck)

**Order:** *"DELTA capture · an ordinary story at rest and at full collapse · light + dark ·
1440×900 + 390×844."*

**Artifacts (9):** `pi-d4p8-DELTA-capture.json` ·
`pi-d4p8-DELTA-{rest,collapsed}-1440x900-{light,dark}.png` ·
`pi-d4p8-DELTA-{rest,collapsed}-390x844-{light,dark}.png`

**Mapping.** The ordered act is a capture, and it is complete: all **8** frames banked, the
full 2×2×2 matrix, each with its state recorded in the manifest — `collapseT "0"` on every
`rest` frame and `"1"` on every `collapsed` frame, method disclosed (rAF-paced 400px travel +
900ms settle). Opened here: `rest-1440x900-dark` (clean at-rest header, no plate, nothing
overlapping), `collapsed-390x844-dark` and `collapsed-390x844-light`. Frames verified distinct
from the δ4-π-3 pair by sha256 — separate captures of the same scene, not copies.

**One sentence of the manifest is STRUCK.** Its verdict line ends:

> *"Visual corroboration: the collapsed frame shows the shrunken header over the painted
> plate, with the audacious glyph passing beneath reading as washed rather than occluded."*

True of the light frames; **false of the dark frames**, as the frames themselves show. The
capture stands; that clause is re-pointed at **D2** and must not be carried forward as a
green.

---

## §5 · DEFECTS ROUTED

### D1 · FourierField's WGSL module fails validation — `unresolved value 'PI'`

**Owner: BK #53 GF-FOURIER.**

**Coordinates:**
- `src/components/fourier-field/shaders/render.wgsl.ts:24-27` — imports `OETF_WGSL` and
  `OKLCH_MATRICES_WGSL` from `../../../composables/glass/procedural/color.wgsl`, and defines
  `const PI` **zero** times in the module.
- `src/composables/glass/procedural/color.wgsl.ts:52-53` — the chunk's stated contract:
  *"PI must be in scope (the consumer defines it first, as the GLSL chunk requires)."*
- `src/composables/glass/procedural/color.wgsl.ts:105` — the failing statement.
- The two consumers that honour the contract, for the shape of the fix:
  `src/components/aurora/constants/shaders/aurora.wgsl.ts:49` and
  `src/components/blob/shaders/metaball.wgsl.ts:53`, both
  `const PI: f32 = 3.141592653589793;`.

**Cells it takes down:** δ2-π-1 · δ2-π-2 · δ2-π-3 · δ2-π-4 · δ2-π-5 · δ2-π-6.

**Evidence:** `pi-d2p1-FOURIER-boot-1440-light.json` (the verbatim validation error) ·
`pi-d2p1-FOURIER-status-owner-chain.json` (the status element is FourierField's own, not a
neighbour's) · `pi-d2p1-FOURIER-boot-1440-light.png` and `pi-d2p3-FOURIER-dark-1440-dark.png`
(empty stage, red pill, both themes).

**Riders:**

- **D1a — the clock is a consequence, not a second defect.**
  `src/components/fourier-field/renderer/wgpu.ts:72-73` (*"the clock advances here, inside the
  substrate's own frame"*) and `:261` `onFrame?.(timeSec);`, wired from
  `useFourierField.ts:106` / `:177`. Measured static across 3s in
  `pi-d2p4-FOURIER-clock-untouched-1440-dark.json` (`loop "0.00104375"` at both t=0 and t=3s).
- **D1b — the ordered N set is unreachable on the default source.**
  `pi-d2p2-FOURIER-Nsweep-1440-dark.json`: `termMin "1"`, `termMax "15"`. δ2-π-2 orders
  N ∈ {1, 8, 16, 61}. Needs a source carrying 16 and 61, or the order restated.
- **D1c — `headT` is not page-observable.** `headTExposedToPage: false`. δ2-π-5 stays
  unanswerable from a browser seat even after D1 is cured, absent an instrumentation seam.
- **D1d (low) — the no-WebGPU pill labels a renderer that did not stand up.** Under
  `navigator.gpu === undefined` the status reads **"WebGL 2"** while the text declares the
  refusal and no WebGL renderer exists. Label source:
  `src/composables/glass/webgpu/rendererStatus.ts:1` (`RendererEngine`),
  `src/composables/glass/webgpu/useGpuSubstrate.ts:108-109` and `:153`
  (`pendingRenderer("webgl2")`). Evidence: `pi-d2p8-FOURIER-nowebgpu-1440-dark.json`
  (`rendererStatusRenderer: "webgl2"`, `rendererStatusState: "error"`) and the PNG. Shared
  substrate, so the cure may not live wholly in #53.

### D2 · The collapsed page-chrome plate does not wash in DARK

**Owner: BK #73 W-SCROLL-SHRINK** (inside #58's chassis —
`docs/tranches/BK/EXECUTION-DAG-2026-08-03.md:84`: *"#73 | W-SCROLL-SHRINK | Φ5/6 | unstarted
| #59; inside #58's chassis | page-chrome shrink-on-scroll; born-RED 0 sites"*).

**Coordinates:**
- `demo/chassis/hero/story-hero.css:2` — light:
  `--story-paper-wash: color-mix(in srgb, var(--card) 70%, transparent);`
- `demo/chassis/hero/story-hero.css:15` — dark, inside `.dark`:
  `--story-paper-wash: color-mix(in srgb, var(--foreground) 7%, transparent);`
- consumed at `demo/chassis/hero/story-hero.css:194-211`, the gradient at `:205-209`:
  `background-image: linear-gradient(to bottom, var(--story-paper-wash) 0 62%, transparent);`
  with `opacity: var(--chrome-collapse-t);`
- the rule's own stated purpose, `:157-158`: *"a plate so the content passing underneath stays
  legible"*, and `:192-193`: *"The wash is the chassis's own `--story-paper-wash`, which
  already carries its dark recalibration."*

**The figure:** **70% opaque in light, 7% in dark** — a tenth of the wash. Computed values as
captured: light `color(srgb 0.994 0.96 0.926 / 0.7)`
(`pi-d4p3-SCROLL-legibility-1440-light.json`), dark
`color(srgb 0.914 0.9 0.886 / 0.07)` (`pi-d4p3-SCROLL-legibility-1440-dark.json`). At 7% the
plate cannot separate the chrome from the content passing under it, so the ordered "washed,
never occluded" behaviour holds in light and inverts in dark.

**Cells it takes down:** δ4-π-3 (the washed-not-occluded arm) · the washed-not-occluded clause
of δ4-π-8's manifest.

**Evidence, as a paired delta so it can be re-derived without a browser:**
`pi-d4p3-SCROLL-collapsed-1440-dark.png` vs `pi-d4p3-SCROLL-collapsed-1440-light.png` (the
`Aa` specimen through the h1) · `pi-d4p8-DELTA-collapsed-390x844-dark.png` vs
`pi-d4p8-DELTA-collapsed-390x844-light.png` (`Audacious peaks` over the return leg — the
clearest pair) · the contaminated dark decile in `pi-d4p3-SCROLL-legibility-1440-dark.aa.json`
(one ink/ground pair returned for two differently-coloured subjects), conceded in
`pi-d4p3-SCROLL-legibility-dark-token-corroboration.json`.

*Adjacency, not a merge:* the census §3 already carries a routed-not-claimed finding — *"the
sticky story header paints over the underline card's content at scrollTop 257 → δ
`demo/chassis`"*. Same chassis, same overlap family, plausibly the same cure. Named so the
owner meets both at once; not folded together here, since this seat did not capture that one.

### D3 · ToC untracked muted labels below AA in light — **owner unplaced**

**Coordinates / figure:** ink `rgb(112, 89, 66)` on ground `[226,197,185]` at 14px →
**4.04:1**, against the 4.5:1 AA floor for normal text. Dark is clear (9.34 / 9.28). Labels:
`1.2 Subsection`, `1.3 Subsection` on `/navigation/toc-tracking` @1440.

**Evidence:** `pi-d3p6-TOC-headings-AA-light.json` rows 3-4 (`AA_normalText_4_5: false`,
`AA_largeText_3_0: true`) · `pi-d3p6-TOC-headings-AA-dark.json` rows 3-4 (the dark control) ·
`pi-d3p6-TOC-AA-rects-1440-light.json` (the tight boxes and computed colours) ·
`pi-d3p6-TOC-AA-VERDICT.json` (method + the seat's own split reading).

**Owner: not resolvable at this seat.** The capture seat wrote *"the disposition (is the
untracked rung in AA scope?) belongs to #58's owner"*. On disk #58 is
`W-PREVIEW-CARD · W-STORY-TAXONOMY · W-STORY-PROPORTION` carrying `G-TILE-COVERAGE ·
G-ONE-NAME` (`EXECUTION-DAG-2026-08-03.md:69`), which does not obviously own a ToC label's
ink, and `grep -rn "toc\|ToC"` over the DAG returns no ToC-owning row. **Unverifiable here —
routed to the driver for placement**, with the figure and coordinates above so placement costs
nothing.

---

## §6 · OBSERVATIONS — instrument and provenance notes, not defects

Every one of these was found while adjudicating and would otherwise be re-discovered.

- **O1 · Five "light"-labelled frames render DARK.** The first five cells captured —
  `pi-d1-CONFIG-tracks-1440-light.png` (12:17), `pi-d2-EXPAND-wgpu-1440-light.png` (12:17),
  `pi-d3-TYPO-fullspan-1440-light.png` (12:18), `pi-d4-CONFIG-stacked-390-light.png` (12:19),
  `pi-d2p1-FOURIER-boot-1440-light.png` (12:20) — all carry `"theme": "light"` and all render
  dark. The proof it is the capture state and not the routes: `/foundations/typography`
  renders **dark** in `pi-d3-TYPO-fullspan-1440-light.png` (12:18:56) and **light** in
  `pi-d4p3-SCROLL-collapsed-1440-light.png` (12:28:41), same route, same session; and
  `pi-d3p1-HOME-mega-1440-light.png` (12:34) renders light. From 12:21:26 on, the labels hold.
  Verdicts unaffected — all five are geometry detectors — except that δ2-π-1's light
  photometric arm would need a re-capture even after D1.
- **O2 · `platePainted: false` (δ4-π-1) is a probe artefact** — the `background` shorthand read
  against a `background-image`-only rule. See δ4-π-1.
- **O3 · `everLeftZero: false` (δ4-π-1 sweep) is an instant-`scrollTo` artefact** — the
  direction-driven ramp never commits a leg. Source-grounded at
  `useScrollChrome.ts:14-18, :52, :196-200`.
- **O4 · `titlePrintedTimes: 0` in the six δ3-π-4 files is vacuous** — the needle is
  `title: ""`. That arm is answered by the PNGs.
- **O5 · `chartreuseHue80to120Pixels: 0` in δ2-π-3 is vacuous** — nothing is painted. And the
  non-zero `776 px` in `pi-d2-EXPAND-wgpu-1440-light.pixels.json` belongs to the **blob** crop
  under δ-π-2, a different subject; do not cross-cite it.
- **O6 · `pi-d4p8-DELTA-capture.json`'s washed-not-occluded sentence is struck** as to the dark
  frames. See δ4-π-8 and D2.
- **O7 · Citation correction.** `pi-d4p4-SCROLL-prm-legsplit-1440-dark.json` cites
  `src/styles/scroll-chrome.css:103` for the PRM gate; on disk the gates are at **`:63`** and
  **`:104`**. `demo/chassis/hero/story-hero.css:226` is cited exactly right. The claim is
  unchanged.

---

## §7 · PROVENANCE — why this battery was written post-mortem

**Written 2026-08-28 by a post-mortem adjudication seat, from the dead capture seat's banked
artifacts. No browser was opened; no artifact was re-captured; no artifact was modified.**

Grounds, cited from `../PI-CENSUS.md` §2.5 (committed, HEAD `ebb58a0f`) and not re-derived
here:

> The δ seat is `agent-ae40862efa6f03f16.jsonl` (411 lines, 1.5 MB). Its first user message
> carries this band's order verbatim … and its **terminal record** is
> `{"model":"<synthetic>", "content":[{"type":"text","text":"API Error: Connection closed
> mid-response. The response above may be incomplete."}]}` at `2026-08-28T17:02:08.495Z`. Last
> artifact mtime is **12:43** local. **The seat captured the band and died before writing a
> verdict.**

The census recorded all 28 δ cells **DROPPED** — 91 artifacts, 0 verdicts, no `PI-BATTERY` on
disk. This file discharges that drop. It is the battery the dead seat owed, and nothing more:
it adjudicates the banked set against the four unit records' π sections and refuses where the
banked set cannot answer.

*One figure reconciled, since this seat could check it:* the census's "last artifact mtime
**12:43**" is a rounding — the on-disk maximum is `pi-d3p8-HOME-landscape-852x393-light.{json,png}`
at **12:42:43**, and the earliest is `pi-d1-CONFIG-tracks-1440-light.json` at **12:17:01**. The
census figure is cited verbatim above; the on-disk reading is given here so the two do not look
like a discrepancy later.

**The tree moved under this seat, and none of it is this seat's.** Between 13:34 and 13:45
other lanes landed work on the shared tree: the browser seat's 44 `pi-d3p5-*` artifacts (see
δ3-π-5), `gamma-aurora-blob/pi-FIELD-*`, `lanealpha-unit8/`, `lanegamma-unit6/`, and
modifications to dock/handmark/search/overlay-plate sources. **None was written, staged or
touched by this seat.** All ten source files cited in this battery were re-checked against
`git status --porcelain` after the fact and are **unmodified** at HEAD `ebb58a0f`
— `src/styles/scroll-chrome.css`, `demo/chassis/hero/story-hero.css`,
`src/composables/glass/procedural/color.wgsl.ts`,
`src/components/fourier-field/shaders/render.wgsl.ts`,
`src/components/fourier-field/renderer/wgpu.ts`,
`src/composables/motion/scroll/useScrollChrome.ts`,
`src/composables/glass/webgpu/useGpuSubstrate.ts`,
`src/composables/glass/webgpu/rendererStatus.ts`,
`src/components/aurora/constants/shaders/aurora.wgsl.ts`,
`src/components/blob/shaders/metaball.wgsl.ts` — so every line number above still resolves.

**Not touched by this seat:** `PI-CENSUS.md`, every other band's directory and battery, and
every source file — the census's own §2.5 counts stand as written, and the driver reconciles
them against this battery.

**Verbatim discipline.** Every figure in this battery is transcribed from a banked artifact or
read from a source file at HEAD `ebb58a0f` with its line number given. Where a claim could not
be verified, it is named as unverifiable rather than softened: the δ3-π-4 DELTA comparand, the
δ4-π-1 pre-cut baseline, the δ4-π-4 CSS leg under real PRM, the δ2-π-7 transport-reachability
disambiguation, and **D3**'s owner row.

---

## §8 · δ3-π-5 — THE BROWSER SEAT'S VERDICT, 2026-08-28

**Appended by the singleton π browser seat**, the seat §3's `OWED-TO-BROWSER-SEAT`
disposition names. Nothing above this line was edited. `PI-CENSUS.md` untouched — the driver
reconciles.

**Seat model:** `claude-opus-5`, asserted from this seat's own subagent transcript
`…/subagents/agent-a0afb01ad5d994250.jsonl` (first user message = this seat's order;
`message.model` on every assistant record → `claude-opus-5`). The assertion `&&`-gated the run.

**Order, verbatim** (`lanedelta-unit4/RECORD.md:420-422`):

> ```
> δ3-π-5  /display + /substrates @1440
>         the four authored tiles and six stills paint; 0 GL contexts on any landing
>         (the ladder's construction claim, measured not asserted).
> ```

### VERDICT — **DEFECT-ROUTED**

The order has two halves and they do not land together.

| half | verdict |
|---|---|
| *the four authored tiles and six stills paint* | **GREEN** — all ten measured painting |
| *0 GL contexts on any landing* | **REFUTED AS WRITTEN** — 3 GL-family contexts on every one of 12 landings × 2 themes |
| *the ladder's construction claim* (`storyTile.ts:38-40`) | **GREEN** — the ladder attributes **0** |

### Instrument

Chromium `--headless=new` + `--use-gl=angle --use-angle=metal --enable-unsafe-webgpu
--ignore-gpu-blocklist` (the house `tests-visual/playwright.config.ts` darwin arm), viewport
1440×900, **dpr 1** (so screenshot px == CSS px; no crop rescale), light and dark by
`vueuse-color-scheme` seeded in an init script plus the matching `colorScheme` emulation.
Dev server `vite --host localhost --port 5401`, port-guarded (`HTTP 200`) before the first
capture and killed only by this seat. Twelve landings swept: `/` plus all eleven categories.

**The GL census never calls `getContext()`.** `HTMLCanvasElement.prototype.getContext` (and
`OffscreenCanvas`'s, and `transferControlToOffscreen`, and `navigator.gpu.requestAdapter`) is
**wrapped before any page script runs** and forwards the application's own call — the app
receives its own context, nothing is stolen, and the record carries the type, the returned
context class and a stack. Two independent detectors, never one number: the call recorder and
a DOM `<canvas>` element census with `getComputedStyle` on each. Pixels are read from
screenshots only, decomposed through the house `oklabFromRgb`
(`scripts/reflect-capture-verify.mjs:140`).

### Half A — the ladder paints

The four authored tiles are **not four on `/display`**; they are four in the tree, and the
manifest puts them on four different landings. `storyTile.ts:37` states the census this cell
is checking: *"11 categories · 80 manifest story rows · 4 `.tile.vue` · 6 `VIZ_PREVIEW_STILLS`
routes ⇒ 4 authored + 6 still + 70 none = 80."* So §3's open question — *"`/display` tallies
`{authored 2, none 4}` — two authored tiles, not four"* — resolves as **the order's count is
the tree's, not the route's**, and both captures were right. The four are
`/display/buttons`, `/display/card`, `/dock/overview`, `/forms/inputs`; this seat captured
`/dock` and `/forms` alongside the two ordered routes to close the arm.

Every tile resolves its declared rung, mounts **0 canvases**, and paints a non-degenerate
region (`uniqueRgb` 278–1451 over the preview box, L sd 0.019–0.138 — no flat well):

| tile | rung | light | dark |
|---|---|---|---|
| `/display/buttons` | authored | uniq 385 · L 0.926 · C max 0.046 | uniq 432 · L 0.305 · C max 0.039 |
| `/display/card` | authored | uniq 418 · L 0.883 | uniq 520 · L 0.311 |
| `/dock/overview` | authored | uniq 297 · L 0.928 | uniq 278 · L 0.271 |
| `/forms/inputs` | authored | uniq 290 · L 0.929 | uniq 286 · L 0.307 |
| `/substrates/aurora` | still | uniq 628 · C max 0.067 | uniq 628 |
| `/substrates/blob` | still | uniq 917 · C max 0.091 | uniq 924 |
| `/substrates/constellation` | still | uniq 1171 · C max 0.114 | uniq 903 |
| `/substrates/fourier-field` | still | uniq 477 · C max 0.101 | uniq 477 |
| `/substrates/glass-material` | still | uniq 843 (scrolled) | uniq 844 (scrolled) |
| `/substrates/glass-panel` | still | uniq 1451 (scrolled) | uniq 1452 (scrolled) |

All six stills report `complete: true`, `naturalWidth/Height 132×82`, a `data:image/` src.
**At 1440×900 two of the six sit below the fold at rest** (`glass-material`, `glass-panel`,
preview-box y ≈ 1214), so the at-rest capture cannot speak for them; the scrolled arm
(`scrollTop` 810 on `.demo-main-scroller`, ≥500 ms settle after the write) puts five of six on
screen and the union of the two arms measures all six. `ladderCanvases: 0` in both arms.

### Half B — the GL count, measured

Every landing, both themes, identical shape: **`webgl2` ×2, `webgpu` ×1, `requestAdapter` ×1**,
plus 3–9 `2d` calls (the frozen-still rasters and the preset thumbnails). Attribution from the
recorded stacks:

- **2 × `webgl2` → `WebGL2RenderingContext`** on a detached probe canvas —
  `probeWebGL2Renderer` (`src/composables/glass/webgl/useWebGLCanvas.ts:52`) via
  `isSoftwareWebGLRenderer` (`src/components/aurora/constants/renderMode.ts:32`), reached
  **twice**: once from `resolveRenderMode` and once from `createAurora`.
- **1 × `webgpu` → `GPUCanvasContext`** on `canvas.aurora-canvas`
  (`useWebGPUCanvas.ts:151` → `createCanvasLifecycle.ts:135`) — the shell field
  `AppShell.vue` mounts behind every non-focal route (`v-if="shellFieldActive"`).
- **0** attributable to `SectionPreviewCard` / `storyTile` / `vizPreviewStill` / any
  `.tile.vue`. `canvasesInLadder: 0` on all 24 route×theme runs.

So the landing carries three GL contexts and the ladder carries none. `canvasCount` is 1 on
every landing except `/motion`, which carries a second full-viewport `constellation-canvas`
that takes **no** GL context (it is inside the 2d tally). Zero console errors across the sweep.

### Defects routed

**D4 · `0 GL contexts on any landing` is false at HEAD, and the ladder is not why.**
The cell's own parenthetical names the claim it means to test — the ladder's — and that one is
green. As written the cell asserts a page-level property the app contradicts by design: every
non-focal route mounts one live `<Aurora>` (`demo/shell/AppShell.vue:227-234`), and the aurora
runtime takes two throwaway `webgl2` probe contexts before it. **Owner: the δ3 order's record
(#58) + the BK driver** — a claim correction, not a code fix. Coordinates:
`docs/tranches/BK/execution/2026-08-10-lanedelta-unit4/RECORD.md:421`,
`demo/chassis/landing/storyTile.ts:38-40`, `demo/shell/AppShell.vue:227`.

**D5 · The software-renderer probe runs twice per landing mount.**
`probeWebGL2Renderer` creates and discards a `WebGL2RenderingContext`, and the census records
two per page — `resolveRenderMode` and `createAurora` each ask independently. Two contexts
where one memoized answer would do, on every route in the app.
**Owner: the aurora runtime (#49).** Coordinates:
`src/composables/glass/webgl/useWebGLCanvas.ts:52`,
`src/components/aurora/constants/renderMode.ts:32`,
`src/components/aurora/composables/runtime.ts:308`.

**D6 · The frozen stills have no dark arm.**
`vizPreviewStill` renders a fixed warm `hsla` palette and memoizes per route
(`demo/chassis/landing/vizPreviewStill.ts:52-53, 255-278`) — no theme input anywhere in the
file. Measured: the six `/substrates` stills are byte-identical across themes (aurora still
`uniqueRgb 628` and `C max 0.06739` in both), so dark mode paints six L≈0.93 cream slabs over
a page ground this seat measured at L 0.34–0.57. The well beneath them *is* theme-aware
(`color-mix(in srgb, var(--card) 68%, transparent)`), and the image covers it.
**Owner: #58 `W-PREVIEW-CARD`.** Evidence: `pi-d3p5-LANDING-substrates-1440-dark.png`.

### Observations, not defects

- The below-fold pair is a viewport fact, not a ladder fact — `content-visibility: auto`
  is doing its job on cards 2..n and the lead card is exempt (`data-span="full"`,
  `contentVisibility: visible`), exactly as δ3-π-2 found.
- `htmlClass` reads `""` in light and `"dark"` in dark on every run; no arm was mis-themed.

### Artifacts — 44 files, `pi-d3p5-` prefix, this directory

`pi-d3p5-SUMMARY.json` · `pi-d3p5-LANDING-{catalog,foundations,substrates,forms,display,containers,navigation,dock,data,feedback,motion,compositions}-1440-{light,dark}.json` (24) ·
`pi-d3p5-LANDING-{substrates,forms,display,dock}-1440-{light,dark}.png` (8) ·
`pi-d3p5-TILEPAINT-{substrates,forms,display,dock}-1440-{light,dark}.json` (8) ·
`pi-d3p5-STILLS-scrolled-substrates-1440.json` + `-{light,dark}.png` (3).
