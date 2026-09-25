# D3 · pass 1 · D3-B · the field signal (critique)

| field | value |
|---|---|
| seat | D3 pass 1, adversarial CRITIC for family D3-B. Did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree cut at `0d634325`; `D3-B-proto.patch` passes `git apply --check` and applies clean (38 files, +288 −1270, plus `src/composables/glass/field/`) |
| engines | Chromium (Playwright build, `--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, WebGPU adapter present) and Playwright WebKit, headless. **Playwright WebKit is not Safari**; every WebKit number below is labelled so and is paint-only. Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 31-52 during every run (other seats live) |
| scratch | `C = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-B-crit/`. A copy of the harness at `C/harness` (its `CHECKOUT` pinned to the real checkout, and `capture.mjs:44` cured of the S-10 raw leak by adding `[data-spec] *`). Captures under `C/out/caps/{proto,clean,p1,p2,undecl,held}`. Three worktrees (`C/wt` the prototype, `C/wtp` and `C/wtq` the planted variants) were built and then removed with `git worktree remove --force` |

## 1 · Before reading the family: what a material design would hide (STEP 1)

Written after reading `PORTFOLIO.md` §0-§2 and §7 and `harness/HARNESS.md`, and before `SPECS.md` §D3-B or either D3-B report.

1. **Opacity passed off as a cure.** Every problem is solved by a thick enough veil. Such a design turns glass into cards, so the question is how much transmission is left, and on which surfaces.
2. **A fallback that is the real design.** If the signal is absent on most engines, arms and pages, the fallback is what ships, and the signal is decoration.
3. **A signal that is true of the wrong thing.** A substrate publishes its own frame. The glass sits over whatever is composited between that frame and the glass. Anything in between is invisible to a GPU reduction.
4. **A witness aimed at a proxy.** W-B checks the published *mean*, but a legibility solve needs the *worst* pixel under the glyph. A gate on the mean can pass while the solve is fed wrong numbers.
5. **Frozen-field gates.** M-2 reads reduced-motion cells. Motion, latency, ceiling animation and the transitions between α states are invisible to them.
6. **State registers riding the ladder.** Hover, active, held and focus paint as differences between rungs or as multiples of the veil. A redesign that changes what a rung means changes every one of those silently.
7. **Theme folds and one source of record.** Deriving luminances from tokens tends to pull tokens out of `light-dark()` or leave literal twins behind.
8. **The dark ladder.** It separates from the page only if the veil is thick; a thin, adaptive veil re-collapses it.

## 2 · The re-run (the battery on the prototype)

`D3_OUT=C/out node C/harness/run.mjs C/wt --label proto`: 68 cells and 8 live windows in 627 s, plus the retune variant. This first capture ran before the raw cure took effect, so it carries the leak.

| witness | prototype's report | this re-run (Chromium gate) | Playwright WebKit (informational) |
|---|---|---|---|
| M-1 | FAIL 11/11 | FAIL 11/11: floating `#fdf5ed` L 0.974, dock `#fcf5ed` L 0.974, Dialog `#f7efe6` L 0.956 | FAIL 10/10; Dialog `#f6efe6` L 0.955 |
| M-2 | PASS 560/560 | **PASS 560/560.** Lowest: light popover muted 4.82 (c1), dark popover 4.61 (c1), dark dock over white 4.61 | PASS 532/532 |
| M-3 | FAIL 203/266 | FAIL 203/266 | — |
| M-4 | FAIL 14/14 | FAIL 14/14 | dock UNMEASURED in Playwright WebKit |
| M-5 | PASS 16/16 | **PASS 16/16**: 0 readbacks; dock fg/muted 4.70/4.73, 4.83/4.87, 5.18/4.95, 5.15/4.87 | UNMEASURED (no dock) |
| M-6 | FAIL 8/19 | FAIL 8/19: adjacent ΔE 0.000 in both themes; every dark plate `#2f251e`, 0.129 from the page | FAIL 8/18 |
| M-7 | PASS 8/8 | **PASS 8/8** (18 / 17 px in every host) | PASS 8/8 (14 px) |
| M-8 | PASS 8/8 | **PASS 8/8**: C 0.0200-0.0205 light, 0.0325-0.0331 dark, bleed 1.01-1.04 | FAIL 3/8: dark stripes bleed 1.29 |
| W-B | FAIL 10/24 as read, GREEN on a clean raw | FAIL 12/24 as read (leaky raw): light leg 1 painted 0.336 vs published 0.281; dark steps latency **4 and 5 frames** on 2 windows | 4 rows "no dock" |

**W-B on a clean raw**, re-captured with the cured `capture.mjs` (`C/out/caps/clean`): **PASS 20/20** Chromium rows. Leg 1 agrees to 0.001 in all four cells (0.280/0.281, 0.529/0.530, 0.280/0.281, 0.073/0.073), with 0 readbacks and step latency 2-3 frames. So the claim reproduces. But across my three live captures, 3 of 24 steps settled in 4-5 frames (proto run: dark default 5, dark fed 4; P1 run: light fed 5). The latency leg is load-sensitive at load 40-50, and the portfolio's "within 2 frames" is not held robustly.

## 3 · Planted violations: every green witness goes red, with one blind spot

Two planted builds (`C/wtp` → P1 and `C/wtq` → P2) are captured on Chromium, on the grounds each witness needs. The cells a plant run skipped print as MISSING and are excluded from the readings below; each reading is the planted row itself.

| witness (claimed green) | plant | result |
|---|---|---|
| M-2 | (a) the occluder breaker disabled: `OCCLUDERS = "[data-plant-never]"` | **caught**: light Dialog muted 4.08 (c1), 3.47 (c0.5) |
| M-2 | (d2) `-lo` +0.25 and `-hi` −0.25 on every write (the unsafe direction), mean untouched | **caught**: light dock fg 3.76 / muted 3.82 (c1); dark dock muted 3.48 (c1); popover muted 4.49 (light c1), 3.78 (dark c1) |
| M-5 | (c) one `getImageData` per bus frame | **caught**: FAIL 14/16, 1123-1187 getImageData per 9 s window |
| M-7 | (b) `contain: paint` restored on wash, quiet, resting, card | **caught**: FAIL 8/8, every host 2 px against 18 / 17 px |
| M-8 | (e) a forged publication on `.glass-overlay` (`-lo: 0.9; -hi: 0.1`) | **caught**: FAIL 2/8, overlay C 0.0612 (light), 0.0485 (dark) |
| W-B | (d1) published mean +0.05 | **caught**: FAIL 12/20, leg 1 off by 0.050-0.051, every step "never within ±0.02" |
| **W-B** | **(d2) as above: the solve's inputs biased, the mean honest** | **NOT caught.** All four leg-1 rows pass (0.280/0.281 … 0.073/0.073), and so does every step latency row (2-3 frames), except the one light-fed step that ran 5 frames. W-B's only failures in P1 are plant (c)'s readbacks. W-B verifies a quantity the solve never reads |

So W-B is not a gate that cannot fail, but it is **aimed at the wrong quantity**. `@utility glass-plate` reads `--glass-backdrop-luma-lo` and `-hi` (`glass/veil.css`); `--glass-backdrop-luma` (the mean) feeds nothing in paint. It needs a leg that compares the published lo/hi against the worst clean-raw pixel under the 3σ-padded rect.

## 4 · Counterexamples the battery does not contain

### 4.1 A false publication (E-2): undeclared content between the substrate and a registered surface

The bus treats a substrate as "a backdrop by construction" (`fieldBus.ts`, `FieldTiles.layer`). What sits between that frame and the surface is known only through a hand list of three selectors, `.bg-overlay-scrim, .glass-focus-veil, [data-glass-occluder]`. Only `ModalOverlay.vue:67` emits the first, and `bg-overlay-scrim-strong` / `-subtle` (`theme/bridges.css:183`) do not match it.

**Probe.** `C/undeclared.css` is injected into the unmodified prototype build. It adds a 40 px `#121212` band (light) or `#f4f4f4` band (dark) behind the dock, above the aurora: a stand-in for a hero photo, a dark section or a consumer card. It is captured on Chromium over aurora and aurora50 (`C/out/caps/undecl`), and M-2 reads the dock:

| cell | dock fg / muted, prototype | dock fg / muted, with the undeclared band |
|---|---|---|
| light c1 | 4.70 / 4.73 | **3.90 / 3.90** |
| light c0.5 | 4.83 / 4.87 | **2.70 / 2.70** |
| dark c1 | 5.18 / 4.95 | **3.56 / 3.52** |
| dark c0.5 | 5.15 / 4.87 | **1.46 / 1.44** |

Looking at `C/undecl-grid.png`, the light dock turns a muddy grey slab over the band, and the dark dock's "Lots" and "12 lots" nearly vanish. The dock stays `data-field="published"`, with nothing loud anywhere. This is the page-publication failure the research ruled out under E-2 (`D3-B.md` §0 finding 4), returned in a narrower form: the primary paints thin, and it paints wrong. The bound, D3-A's state, cannot fail this way. The popover band did not paint behind the popover in this probe, so only the dock row is evidence.

### 4.2 The grasp register now sheds legibility

`grasp.css:133` sets `--glass-veil-rung: calc(var(--glass-veil-rest) * 0.6)` on a held plate. The dock plate is a named consumer. At HEAD the rung is an ink α; under D3-B it is the pole α the solve just computed. Holding the dock therefore removes 40% of exactly the lift the ink needs.

**Probe.** `C/held.css` injects that declaration on `.dock-plate` (`C/out/caps/held`, paint-level; the grasp carriers' blur is not emulated). M-2 dock rows:

| cell | at rest | held |
|---|---|---|
| light c1 | 4.70 / 4.73 | **3.23 / 3.28** |
| light c0.5 | 4.83 / 4.87 | **4.20 / 4.26** |
| dark c1 | 5.18 / 4.95 | **3.17 / 2.92** |
| dark c0.5 | 5.15 / 4.87 | 4.51 / **4.28** |

No witness reads a held state. The prototype ships this unchanged.

### 4.3 The value-form plate collapse erases state affordances

Prototype §4 item 5 sets every `--glass-plate-{rung}` to the pole at `--glass-veil-bound`, so all rungs are one colour. The spec does not mention the change, and its consumers encode state as differences between rungs:
- `--dock-control-hover-bg: var(--glass-plate-resting)` and `--dock-control-active-bg: var(--glass-plate-floating)` (`tokens/sizing.css:206-207`), and `--dock-layer-switcher-active` (`:225`);
- `--control-surface-bg: var(--glass-plate-quiet)` against `--control-surface-bg-hover: color-mix(… quiet, … resting 35%)` (`tokens/glass.css:276-279`). These are now identical: the hover delta is zero;
- `--menu-row-bg`, and the segmented tabs (`segmented.css:228`).

**Measured.** Light paper ladder cell, `noink` capture: the active dock pill paints `rgb(252 245 237)` and `rgb(253 245 236)`, and the plate `rgb(253 245 237)`. So on an unpublished dock (paper, any non-substrate page, any engine without the WebGPU arm) the selected tab is identified by nothing (`C/pill-light-paper.png`). The prototype's own gestalt shows it: `pair-light-1440-dock.png` "Overview", `pair-light-1440-glass-material.png` "Glass Material" and `pair-light-1440-dialog.png` "Dialog" all lose their active pill, where HEAD drew one. In the published case the pill shows (the light aurora50 crop), so the dock's selected state depends on whether a GPU publication happened to land. That is a D-2 regression, and a WCAG 1.4.11 one for the selection indicator. No witness reads it.

### 4.4 Sign inversions the prototype named

The prototype names two, and I confirm both on its gestalt:
- **The focus veil turns into a bright frost bloom around the light Dialog** (`pair-light-1440-dialog.png`). `--glass-focus-veil-dim` (`tokens/glass.css:133`) mixes the overlay plate, which is now cream.
- **The sheet seam doubles.** It still reads the retired ink, `oklch(from var(--glass-veil-ink) … / calc(var(--glass-veil-step) * 2))` (`sheet/styles.css:216,226`), with the step 0.04 → 0.08.

Both are the same disease as 4.3: tokens whose meaning changed under their consumers.

### 4.5 The unpublished dip on a field change

In the leaky proto run, the dark fed step reads the published value 0.240 → **0.000 at frame 3** → 0.063 by frame 90, and the dark aurora50 default step shows the same dip. The P1 light fed step does too. During the ceiling change `valid()` is false (`reduceFrame.ts`, `Math.abs(o.root − reducedAt.ceil) < 0.002`), the bus clears the surface, and the plate snaps toward the bound before thinning again. So any continuously animated ceiling, such as a scroll-linked recessive field or a theme cross-fade, holds every registered surface unpublished for the whole motion. The step is dressed only by the rungs' press-spring colour transition (prototype §1). Its paint is uncaptured.

## 5 · The checklist

| item | answer | evidence |
|---|---|---|
| vacuous convergence | Not vacuous on the green witnesses: each fails on its plant (§3). **Partly vacuous in W-B**: its value legs pass with the solve's real inputs biased 0.25 the unsafe way (d2). M-5's and W-B's "fed" rows are duplicates, since the prototype deletes `backgroundCanvas`, so the "fed" dock is the default dock | §3; the P1 W-B rows |
| spec-cites-itself circularity | The 4.7 light target was set by this family's own probe to absorb its own chroma residual (`D3-B.md` §1.3). The dark popover over c1 clears by 0.11 (4.61), under the 0.15 engine margin S-11 names, so real Safari could land under 4.5. The circularity is mild, and its margin unproven | re-run M-2 minimums; S-11 |
| gates that cannot fail | None found that cannot fail. One gate (W-B leg 1/leg 3) fails on the wrong thing | §3 |
| elegant-reduction trap | **Yes, at the load-bearing step.** "The substrate publishes; the surface reads the tiles under it" assumes nothing between the two. Knowing what is composited under a surface is the problem itself (the portfolio's D3-X2 was not minted for lack of that primitive), and the prototype reduces it to a three-selector list. The measured cost is §4.1: dock muted 1.44 while published | §4.1; `fieldBus.ts` `OCCLUDERS` |
| legacy aliases, shims or dual paths | **Semantic re-use, which is worse than an alias.** `--glass-veil-tier` (floor of the pole, formerly ink α), `--glass-veil-rung` (the grasp channel, now inverted in effect) and every `--glass-plate-*` all keep their names and change meaning under unchanged consumers. `--glass-veil-ink` survives for one consumer (the sheet seam). `--glass-backdrop-luma` survives as a mean that nothing paints from. Stale prose in 10+ sites (prototype §6 item 13). The 746-line sampler deletion is clean | §4.2-4.4 |
| masked fallbacks | Legibility is not masked when nothing publishes, because the bound is honest in paint (M-2 green over black, white, checker and stripes; Playwright WebKit 532/532). But (1) **a dead primary is silent**: on the WebGL2 and "css" arms, on `useAurora`, blob and constellation, on Playwright WebKit, on SwiftShader, and wherever the reduction fails, the family *is* the bound, with only an absent `data-field` to say so; (2) **a false primary is worse than a dead one** (§4.1), and nothing detects it | §2; §4.1; `D3-B.md` §0 finding 7 |
| unverified gestalt | Looked at the six prototype pairs, plus my own crops. **Light frost, not grey:** yes on registered surfaces; the popover over the pale aurora reads as a cream frost with blurred text behind it (`pair-light-1440-popover.png`). **But** every unregistered plate is a flat, opaque cream card, including over the aurora (the wash/quiet plates, the five alerts, "Inspect Fourier profile"). That reads as paper cards, not glass. **Dark separates from the page:** yes, every dark plate `#2f251e` sits 0.129 from the page, but as one flat brown with adjacency 0.000. **Ink as material, not sticker:** ink is unchanged; the Dialog is a legible warm card (fixed from HEAD's smoke slab), wrapped in a bright frost halo (§4.4). **iOS-27 grade:** no. The lost active pill, the dead hover delta, the frost bloom and the one-colour ladder are regressions an owner will see before they read a number | §4.3, §4.4; pairs cited |
| consumer-less substrate | **`declareField`**: its only exercised consumer is the demo story, with `<canvas>` only; `<img>` and `<video>` are written but unexercised. chicago's photos are cross-origin and cannot publish; value.js's `useAurora` publishes nothing; fourier's plots are the one plausible site, unmeasured. **The bus's payoff reaches exactly four components** (`GlassDock` live, `PopoverContent`, `DialogContent`, a glass `Card`). The Dialog is unpublished whenever its scrim is up, which is always for a modal. So in practice the thin veil lands on the dock, popovers and cards, and only over the WebGPU aurora arm | prototype §0 items 2, 4; §2 of this document |

## 6 · What D3-B earns, stated plainly

- **The publication primitive is real and exact.** It agrees with clean paint to 0.001, costs 71-127 µs of GPU per frame (research), and makes 0 main-thread readbacks. It is the only family that retires the dead sampler (S-13) with a working live signal.
- **The chrome and hostile-ground guarantees hold wherever nothing publishes.** M-2 560/560, M-8 8/8, M-7 8/8.
- **Transmission above the bound, measured**, on the dark dock (α 0.44-0.60 floor band), on the light sidebar over the hero (0.463) and on the popover over the pale aurora (0.34 floor).
- **Against D3-A**, over the shipped c1 light field the solve needs α 0.43-0.87, p50 0.63 (`D3-B.md` §1.3), so it is never thin there. The unpublished bound is 0.894 against D3-A's any-input 0.871 (S-16). So on every unregistered surface, every non-WebGPU arm, every non-substrate page and the c1 light hero, D3-B paints what D3-A paints, plus one silent failure class D3-A does not have (§4.1).

## 7 · Convergence and verdict

**Convergence: 40%.** Problem 3 (the live dock without readback) is answered exactly in Chromium. Problems 1-2 are answered in paint by the bound, which is D3-A's answer. Problem 4 is answered by a floor table that collapses to one colour wherever nothing publishes. Open gaps:

1. **False publication over undeclared content** (§4.1: dock 1.44-3.90). There is no runtime detection and no witness. The rule for when a substrate may claim a surface is unspecified beyond three selectors.
2. **The grasp register inverted** (§4.2: held dock 2.92-3.28 at c1).
3. **State affordances erased** by the value-form collapse (§4.3): active pill within 1/255 of the plate over light paper, control hover delta 0, dock hover = active = plate.
4. **Sign-wrong focus veil and doubled sheet seam** (§4.4).
5. **W-B aims at the mean, not at the lo/hi the solve reads** (§3, d2 passes); a lo/hi leg against the clean-raw worst pixel under the padded rect is owed. The harness raw leak (S-10) must be cured in the shared harness, not only in this critic's copy.
6. **Latency not robust**: 3 of 24 steps at 4-5 frames under load. **The unpublished dip** on every ceiling change (§4.5), and the thick→thin step, have no paint capture (D-1).
7. **M-1** 0.001 under the floor (the `--card` pole, S-6), and **M-6** adjacency 0.000 in both themes (S-7 in light, plus one-colour collapse in dark). Owner decisions, but the dark collapse is this family's.
8. **M-3, M-4 RED** (static ink; S-9).
9. **One source of record costs**: `--card` / `--popover` leave the `light-dark()` fold (a color-scheme-only island no longer re-resolves); `useAccentTone`'s literal twin breaks (5 tests); the WGSL census misses `reduce.wgsl` (1 test).
10. **Coverage**: the WebGL2 and "css" arms, `useAurora` (value.js), blob and constellation publish nothing. `declareField` is exercised on `<canvas>` only, with no real consumer.
11. **Engines**: the dark popover's c1 margin of 0.11 is under the S-11 engine margin of 0.15. Real Safari (WebGPU, `mapAsync`, `TEXTURE_BINDING` alpha, `pow()` in `calc()`) is UNMEASURED (owner's safaridriver checkbox). Playwright WebKit cannot mount the dock. Integrated GPUs are unmeasured.

**Verdict: BANK.** The field signal is sound where it is honest: the reduction is exact, cheap and readback-free, and every witness it claims green is green and fails on its plant. But as a whole-material design it is dominated by D3-A. It paints D3-A's bound on nearly every surface and engine, and its one differentiator, a thinner veil on four registered components over one engine arm, brings a silent unsafe failure (§4.1) and inverts the grasp and state registers that ride the veil (§4.2-4.3).

**Salvage.** `reduceFrame.ts` and the bus stay useful as the publication primitive for another family: D3-F's yield uniforms, or a D3-A hybrid that thins only the live dock.

**Re-trigger.** Reopen D3-B when all of these hold:
- the owner asks for transmission above the bound on registered chrome;
- a claim rule exists that proves nothing paints between the substrate and the surface, for example the surface's backdrop chain holds only the substrate's layer. A selector list does not qualify;
- the grasp and state registers are re-derived against pole α;
- W-B gains its lo/hi leg;
- the WebGL2 arm or real Safari publishes.
