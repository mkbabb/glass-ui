# LANE δ — UNIT 5 · π QUEUE · THREE RE-CAPTURE CELLS

**Enqueued, not discharged.** Every cure in this unit's `RECORD.md` changes paint; none has
been observed. Each cell is a **DELTA against pixels already banked** in
`docs/tranches/BK/execution/2026-08-25-pi-band/delta-config-fourier-scroll-story/`, so the
re-capture compares like with like rather than forming a fresh opinion. The adjudicated
predecessor verdicts are that directory's `PI-BATTERY-delta-config-fourier-scroll-story.md`.

**Standing law for every cell.** ENQUEUE to the singleton browser seat; no seat opens its
own browser. Screenshot + `getComputedStyle` only — **`getContext()` is never called on any
canvas** (the context-steal trap: it steals the live context and fakes the black fallback,
which is the exact failure mode D1 wore). Colour read from the captured PNG in Node
(`pngjs` + the one colour-math source `scripts/lib/paint-arm.mjs` re-exports); a token that
resolves to `oklab()` in `getComputedStyle` is parsed, never string-compared. Port and
build-freshness cited in the cell. **The predecessor artifact is the control; a cell that
cannot show its predecessor is not a delta.**

**One instrument warning, carried from the battery's O1.** Five of the predecessor frames
are labelled `light` and RENDER DARK (`pi-d1-…`, `pi-d2-…`, `pi-d3-…`, `pi-d4-…`,
`pi-d2p1-FOURIER-boot-1440-light.png`, all captured 12:17–12:20). Every re-capture below
that names a theme must **verify the theme in-page** (`documentElement.classList.contains
("dark")`) and bank the reading beside the frame. A photometric verdict off a mislabelled
frame is worse than no verdict.

---

## π-RERUN-D1 — the Fourier stage paints, and five dead cells come back to life

**Cure:** `src/components/fourier-field/shaders/render.wgsl.ts` declares
`const PI: f32 = 3.141592653589793;` — the splice contract `color.wgsl.ts:52-53` states and
`:105` spends. **Route:** `/substrates/fourier-field`.

**Predecessor verdict:** δ2-π-1 · δ2-π-2 · δ2-π-3 · δ2-π-4 · δ2-π-5 · δ2-π-6 all
DEFECT-ROUTED(D1) — six of eight cells, one root cause. `rendererStatusState: "error"`,
the stage well empty in both themes, the red pill carrying the validation text verbatim.

**THE GATE ARM, first and cheapest.** Before any photometry: the pill.

| arm | control (banked) | the cure's claim |
|---|---|---|
| `rendererStatus` state + engine at boot | `state "error"`, `renderer "webgpu"`, error text `Error while parsing WGSL: :100:32 error: unresolved value 'PI'` | `state "ready"`, `renderer "webgpu"`, **no `error` field** |
| `consoleErrors` over the first 3 s | `0` (the device was fine; the module was not) | still `0` |

**If that arm does not flip, nothing below is worth taking.** A second validation error of
a different class (a binding mismatch, a type error) is possible and is NOT covered by the
splice-contract arm, which resolves module-scope constants only — bank the new text
verbatim and re-route rather than re-running the photometry.

**Then, in the predecessor's own order:**

| cell | arm | control | claim |
|---|---|---|---|
| δ2-π-1 | mark:ink ∈ [1.5,3.0]:1 at the head · ink:ground ≤12:1 light, ≥1.5:1 dark · darkest marked pixel C ≥ 0.04 · neutral-dark share ≤5% · **no white specular cluster on the head** | unreachable — no marks | all five, light AND dark, **theme verified in-page** |
| δ2-π-3 | ring:ground ≥3.0:1 · **zero pixels in OKLab hue 80–120°** | `chartreuseHue80to120Pixels: 0` — **VACUOUS**, nothing painted | the same zero, now over a **painted** stage. The battery's O5 stands: do not cross-cite `pi-d2-EXPAND-…pixels.json`'s 776 px, which is the **blob** |
| δ2-π-4 | t=0 vs t=3 s differ while playing, static when paused (**rider D1a**) | `tZero.loop "0.00104375"` **=** `tThreeSeconds.loop "0.00104375"` across 3 s while nominally playing | the two differ. The clock advances at `wgpu.ts:261` `onFrame?.(timeSec)` inside the frame the pipeline gates, so this is D1's consequence un-freezing — **the one arm that proves the cure reached the loop and not merely the compiler** |
| δ2-π-4 | role census + `aria-valuenow` walk + valuetext badge | GREEN already (`slider 9`, `"0.001"`→ArrowRight×5→`"0.079"`→Home→`"0"`, `"N 6/15 · 0% through the period"`) | **unchanged** — re-read as the control that the cure disturbed nothing |
| δ2-π-4 | **the 390×844 arm, NOT BANKED** by the predecessor | absent | walk it |
| δ2-π-6 | painted ring count vs `ringsAt` at the same stage, across studio cap · 1440 · cel 21rem · 390 | `paintedRingCount: 0`; geometry banked for **1 of 4** cells | the two sides agree at all four; the three missing stage boxes banked |
| δ2-π-7 | **transport reachable** — the one arm the battery could not answer | 8 of 9 `[role=slider]` measure `w: 0, h: 20`, including `"Move through the loop"`; `inViewportX: true` on a zero-width box is not reachability | the configurator aside's box **and its sections' open/closed state** at 390×844, plus a **pointer-target rect** for `"Move through the loop"`. Two lines close the cell |
| δ2-π-8 | the no-WebGPU host (`--initScript` defining `navigator.gpu` undefined, **no source byte touched**) | three detectors GREEN; **rider D1d** open: the pill labelled **"WebGL 2"** while declaring no renderer stood up | **cured** — see below |

**Rider D1d, now a claim rather than a snag.** `useFourierField.ts` re-points any status
arriving under a non-`webgpu` engine at the one engine this field has.

| arm | control | claim |
|---|---|---|
| pill text under `navigator.gpu === undefined` | `WebGL 2·[FourierField] WebGPU is required. …` | `WebGPU·[FourierField] WebGPU is required. …` |
| `[data-renderer]` on the status `<output>` | `"webgl2"` | `"webgpu"` |
| `canvasCount` | `2` — the shell's `aurora-canvas` + `fourier-field-canvas`, no lookalike | **unchanged at 2** |
| zero canvas pixels, judged by screenshot | GREEN | **unchanged** |

**Artifacts to re-bank** (same names, `-cured` suffix): `pi-d2p1-FOURIER-boot-1440-{light,
dark}.{json,png}` · `pi-d2p1-FOURIER-shader-error-source.json` (expected EMPTY) ·
`pi-d2p2-FOURIER-Nsweep-1440-dark.json` · `pi-d2p3-FOURIER-dark-1440-dark.png` +
`pi-d2p3-FOURIER-dark-ringhue.pixels.json` · `pi-d2p4-FOURIER-{a11y,clock-untouched,
transport-state}-1440-dark.json` + the 390 twin · `pi-d2p5-FOURIER-flick-1440-dark.json` ·
`pi-d2p6-FOURIER-ringlaw-4cells-dark.json` · `pi-d2p7-FOURIER-mobile-390-dark.{json,png}` ·
`pi-d2p8-FOURIER-nowebgpu-1440-dark.{json,png}`.

**KILL:** if `rendererStatusState` is still `"error"` with an `unresolved value` of any
name, the splice-contract arm is not sufficient for this module and the class re-opens
against `tests/components/fourier-field/wgsl-splice-contract.test.ts`, not against the
shader.

### δ2-π-2 — RE-SCOPED, with the reason (rider D1b)

The predecessor order names **N ∈ {1, 8, 16, 61}**. The banked artifact reads
`termMin "1"` / `termMax "15"` and `orderedNSetIs_1_8_16_61: false`.

**The slider is not the defect.** `demo/stories/substrates/fourier-field.vue:424` binds
`:max="maxHarmonics"`; `:212` `maxHarmonics = minted.value.terms.length`;
`renderer/mint.ts:8-10` rules it — *"There is NO ceiling. `N` truncates a fixed,
amplitude-ordered, paint-floored array, so the slider's maximum IS `spectrum.length`"* — and
`:238-240` clamps `harmonics` down when a source swap shrinks the budget. The a11y domain
IS the real N domain, per source, and the picker prints each source's honest count
(`"Elliptic — generated · 15 terms"`). **The order was written without a source.**

**Re-scoped cell.** Walk N over the **active source's own domain**, and take the second leg
on a source that carries the higher counts:

| leg | source | N set |
|---|---|---|
| A | `elliptic` at the default `richness 0.5` — the 15-term budget the picker states | 1 · 8 · **15** (the maximum, replacing 16) |
| B | the source the picker's own label names with the largest count (`makeEllipticSpectrum` offers `2 + round(richness·22)` terms before the paint floor, so `richness 1` reaches ~26; the curated traces are DFTs of 160/256-point outlines) | 1 · 8 · 16 · **the picker's stated maximum**, transcribed from the label, never assumed |

Detectors unchanged: N=1 paints exactly one ring · marked share grows monotonically · **the
figure does not rescale between steps** (fit-fixed-under-N). Bank the picker's label
verbatim beside the N set so the domain and the walk are the same number.

### δ2-π-5 — REFUSED as ordered, RE-SCOPED, with grounds (rider D1c)

The order asks for a **per-frame `headT` trace**. `headTExposedToPage: false`, and this seat
declines to add the seam. Grounds, on disk:

1. `useFourierField.ts:93-96, :121-125` — `HEAD_PUBLISH_MS = 100`. `headTLive` is a
   **10 Hz sample** of the loop, by design: *"the same parameter as a REACTIVE read,
   refreshed off the one clock at a rate a reader (or a screen reader) can follow. It is a
   sample of the frame loop, never a second one"* (`:68-73`). A per-frame DOM channel would
   be a **second** surface for the one clock, in the module whose opening law is *"THE ONE
   CLOCK … no second rAF, no second scheduler, and no second place a frame can come from."*
2. It would put an attribute write on **every frame** of a substrate whose paint law is
   compositor-only — the same discipline δ4-π-6 measured flat (`Layout: {count: 0}`).
3. The number is **already published twice**: `aria-valuenow` at 3 dp (`FourierField.vue:173,
   :238`) and the studio readout at 2 dp (`fourier-field.vue:381`). A `data-` attribute is a
   third copy of one number, not a new fact — and all three are the same 10 Hz sample, so
   none of them can carry a per-frame delta.
4. **The three ordered detectors are already gated, deterministically, at full step
   resolution, without a browser** —
   `tests/components/fourier-field/FourierField.smoke.test.ts`:
   `:222` *"never runs the head backward, over an adversarial trace"* · `:248` *"holds one
   flick's total advance to half a figure"* · `:268` *"takes ONE impulse per gesture, not one
   per frame."* [2026-08-28 · driver C4: pre-image anchors; committed tree `:239`/`:265`/`:285`] A browser cell re-measuring them through a 100 ms sampler is a weaker copy of
   a gate that already exists.

**Re-scoped cell — what a browser CAN honestly answer, and only that:**

| arm | claim |
|---|---|
| the published sample across a flick at r0 ∈ {0.2 … 4.0}, read off `aria-valuenow` at 3 dp | **non-decreasing** across the gesture, modulo the single wrap at the period boundary (`1 ≡ 0`), which must be reported as a wrap and not smoothed away |
| total advance per gesture, endpoint minus start, wraps counted | **≤ 0.5 turns** (`FOURIER_FLICK_TURNS`) |
| the readout `t …` text during one gesture | **one** monotone ramp — no second acceleration inside a single gesture (the edge-latch, as an eye can see it) |

**The per-frame claim stays where it is provable**, in the clock's own arms, and is cited in
the record rather than re-taken here.

---

## π-RERUN-D2 — the collapsed chrome plate washes in DARK

**Cure:** `demo/chassis/hero/story-hero.css` — the plate takes its own
`--story-chrome-plate-wash`; the dark arm is `color-mix(in srgb, var(--card) 80%,
transparent)` in place of the paper field's `var(--foreground) 7%`.
**Route:** an ordinary story (`/foundations/typography` is the predecessor's).
**Predecessor verdict:** δ4-π-3 DEFECT-ROUTED(D2) on its fourth arm; the
washed-not-occluded clause of δ4-π-8's manifest STRUCK.

| arm | control (banked) | the cure's claim |
|---|---|---|
| computed `background-image` on `.story-page-chrome::before`, **dark** | `linear-gradient(color(srgb 0.914 0.9 0.886 / 0.07) 0px, … 62%, rgba(0,0,0,0))` — the near-white INK at 7% | a **`--card`-derived** colour at **alpha 0.8**: `color(srgb 0.2074 0.165 0.1326 / 0.8)` to within the engine's serialisation |
| the same, **light** | `color(srgb 0.994 0.96 0.926 / 0.7)` | **byte-identical** — the light arm is untouched and this is the control that says so |
| the `Aa` specimen passing beneath the h1, 1440 dark | opaque strokes **cut through** the h1: the `T` struck by the `A`'s diagonal, the `yp` by the `a`'s bowl | a ghost. Predicted **ghost:ground ≈ 1.88:1** against the light arm's measured **1.86:1** |
| `Audacious peaks` over the `← Foundations` return leg, 390×844 dark | prints **solid**; the leg is nearly unreadable | washed; the leg reads |
| h1 over the plate, dark | 12.53:1 (on a **repaired** instrument — see below) | **≥ 4.5:1**; predicted ≈ **11.9:1**, i.e. the plate darkens the ground slightly and the title still clears AA with an order of magnitude to spare |
| return leg over the plate, dark | 6.08:1 | ≥ 4.5:1 |
| `--chrome-fade-depth` and the opacity sweep | `"0"`, `framesSampled 90`, `intermediateFractionsSeen 70`, `distinctOpacities: ["1"]` | **unchanged** — the cure touches the wash, never the ramp |

**THE CONTAMINATED INSTRUMENT, re-run as part of this cell.** The dark AA decile in
`pi-d4p3-SCROLL-legibility-1440-dark.aa.json` returned **one** ink/ground pair —
`[43,34,27]` / `[233,229,226]` — for **two differently-coloured subjects** (`h1Color
"rgb(233,230,226)"`, `linkColor "rgb(172,160,145)"`), because *the arm locked onto the
contaminating glyph*. The instrument's failure and the defect are the same phenomenon. With
the plate occluding, **re-run the decile arm unrepaired** and state BOTH readings:

- if the decile now returns **two distinct** ink/ground pairs, the instrument is
  un-contaminated and the dark AA figures stop being computed-colour × measured-ground;
- if it still returns one pair, say so — the cure did not un-contaminate it and the
  token-corroboration file stays the load-bearing evidence.

**Artifacts to re-bank:** `pi-d4p3-SCROLL-collapsed-1440-{light,dark}.png` ·
`pi-d4p3-SCROLL-legibility-1440-{light,dark}.json` ·
`pi-d4p3-SCROLL-legibility-1440-dark.aa.json` ·
`pi-d4p8-DELTA-collapsed-390x844-{light,dark}.png` — **the 390 light/dark pair is the
cleanest single delta for this defect and is the frame the verdict should rest on.**

**KILL:** if the dark ghost still reads above the light arm's ratio, the alpha is not the
lever and the route re-opens against the plate's **compositing model** (a `background-color`
under the gradient, or the plate's z-order against the content) rather than against a
larger number.

---

## π-RERUN-D3 — the ToC's untracked labels clear AA in light

**Cure:** `demo/stories/navigation/toc-tracking.vue` — the untracked child rows take
`text-muted-foreground-strong`, which resolves through `glass/ladder.css:208` to
`--on-glass-muted-strong` on the `.glass-resting` pane.
**Route:** `/navigation/toc-tracking` @1440, light AND dark.
**Predecessor verdict:** δ3-π-6 CAPTURED-GREEN on its own subject (the **tracked** heading:
8.87 light / 6.29 dark); **rider D3** routed beside it.

| arm | control (banked) | claim |
|---|---|---|
| `1.2 Subsection` / `1.3 Subsection`, light, tight `Range` box, ink = 2nd-percentile-luminance centroid, ground = modal plate colour | ink `rgb(112, 89, 66)` on ground `[226,197,185]`/`[226,197,184]` → **4.04:1**, `AA_normalText_4_5: false` | **≥ 4.5:1**. The pure rung computes **5.45:1**; the 2nd-percentile instrument reads the ink darker, so 5.45 is the floor and not the estimate |
| the same, dark — **the control that must not regress** | 9.34 / 9.28 | **≥ 9.28**; the dark -strong rung (`hsl(36 13% 81%)`) is the BRIGHTER of the two, so this should rise |
| the **tracked** active rows `Section 1` / `1.1 Subsection` — the cell's own subject | 8.87 / 8.86 light, 6.29 / 6.29 dark | **unchanged** — they are `text-primary`, untouched by this cure |
| subordination, by eye on the paired PNG | the untracked rows read quieter than their `text-foreground` parents | **still quieter** — the rung is one step, not a promotion to full ink. A cure that makes the child rows read as loud as the parents has broken the instrument it was fixing |

**The identification, so the re-capture can falsify it rather than trust it.**
`--on-glass-muted` light is `hsl(30 26% 35%)` (`tokens/on-glass-fg.css:35`), which computes
to **rgb(112, 89, 66)** — *exactly* the ink the predecessor measured — and reads 4.04:1
against both banked grounds, *exactly* the predecessor's figure. The token's own comment
calibrates it at "5.76:1 vs plate" against a composited **cream** plate; this pane
composites over the **aurora**, which is darker, and the calibration does not survive the
move. If the re-capture's ink is not `rgb(91, 70, 51)` (`hsl(28 28% 28%)`), the class name
did not reach the element and the cure is not in force.

**Artifacts to re-bank:** `pi-d3p6-TOC-headings-AA-{light,dark}.json` ·
`pi-d3p6-TOC-AA-rects-1440-{light,dark}.json` · `pi-d3p6-TOC-AA-1440-{light,dark}.png` ·
`pi-d3p6-TOC-AA-VERDICT.json`.

---

## NOT ENQUEUED HERE, AND WHY

| cell | grounds |
|---|---|
| δ-π-1 · δ-π-2 · δ-π-3 · δ-π-4 (unit-1's configurator + full-span) | **CAPTURED-GREEN** on geometry detectors. O1's theme mislabel does not touch a geometry verdict; no cure in this unit reaches them |
| δ3-π-1 · δ3-π-2 · δ3-π-3 · δ3-π-7 · δ3-π-8 | CAPTURED-GREEN; untouched by D1–D3 |
| δ3-π-4's **DELTA** (six `git archive 8a96868d` before-tree frames) | owed, and **not this unit's cure**. It is an unbanked comparand for a landed wave, not a defect route; it stays on the driver's ledger |
| δ3-π-5 | **OWED-TO-BROWSER-SEAT**, and that seat landed 44 `pi-d3p5-*` artifacts at 13:42–13:44 on a second port. Its `{authored 2, none 4}` vs "four authored tiles" reconciliation is **its** adjudication, not this lane's |
| δ4-π-1's pre-cut baseline header rect | no comparand exists; a pre-cut tree would have to be checked out and captured. Owed, not cured here |
| δ4-π-4's **CSS leg under real PRM** | needs a browser launched under an OS-level reduce (or `--force-prefers-reduced-motion`); a `matchMedia` stub cannot reach an `@media` query. Owed, not cured here |
| the census's sticky-header-over-underline-card overlap at `scrollTop 257` | same chassis, same overlap family as D2 and **plausibly the same cure** — but this seat did not capture it and does not claim it. Named so the owner meets both at once |
