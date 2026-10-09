# D3 · pass 3 · MINOR-SPLIT: the 10.2.0 subset, built once and measured under H3

| field | value |
|---|---|
| seat | D3 pass 3, the minor-split build (`REGISTRY.md` P2-6.2 step 3; floor v2 route row N-4). A build, not a route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree `.claude/worktrees/bl/D3/p3/minor/wt` at `145138f2` (removed at the end). The task named `8059b373`; `git diff --stat 8059b373 145138f2 -- src demo tests package.json scripts` is empty, so the base is the published 10.1.0 source |
| patch | `minor-split.patch` (this folder), `git diff HEAD --binary` of the measured tree: 16 files, +222 / −128, no file added or deleted. `git apply --check` is clean on the checkout, and the file is byte-identical to the measured tree's diff (`cmp`) |
| engines | Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, the gate) and **Playwright WebKit 26.5** (paint-only: no `backdrop-filter`; dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 15.8-91 for every measured run (other seats shared the machine). It spiked to 524-570 at 21:56, after the last browser run, so nothing was measured under it. The load is beside every run in §3 |
| fences | no git write and no tracked-source edit in the checkout. Writes in the checkout: this file, `minor-split.patch`, `MS-probe.mjs`, `MS-clamp.mjs`, `MS-g7.mjs`, `MS-perim52.css`, `MS-records/`, `glance-minor/`. Builds and captures lived under `.claude/worktrees/bl/D3/p3/minor/` |
| records | this file is the source of record for the minor split. Raw: `MS-records/` (the run log, every witness log, the per-engine table `baseline-minor.json`, the HEAD and route `--verbose` outputs the G6/G7 comparisons read, the clamp probes, the toolchain logs) |

## 0 · In brief

- **What it is.** 10.1.0 with nothing removed (the sampler, `backgroundCanvas`, the clamp, the knee, `--glass-backdrop-luma` and its `@property`, the `--glass-backdrop` bucket, both `contrast-color()` inks, `backdropMode`, `--input-on-glass` all still ship), plus the light arm of floor v2 and nothing else:
  - the card pole lift to `#fef7f1`;
  - the light rungs at the computed bound (0.891, plus whole steps of `(1 − bound)/3`) and the light Dialog at α 1;
  - the light state fills on the ink register (FL-6, light only).
- **The dark arm is untouched in paint, measured row for row.** 914 of 914 dark M-2 rows read the same p05 and ink hex as HEAD; 26 of 26 dark M-6 composites read ΔE_OK 0.0000 from HEAD; every dark glance crop reads delta 0.00% (story 0.01-0.03%, the field's motion). So W-0.1 G6 passes.
- **W-0.1 gates, Chromium:** G1 **PASS** 11/11, G2 **FAIL** (light 0.037 on paper and in the pane), G3 **FAIL** (the light row darkens the plate by 0.033 with no tint), G4 **PASS** (W-A light 108/108), G5 **PASS** (roster PRESENT 289 = 289, no name leaves `src`; the bundle ratchet needs a +2,355 B rebind), G6 **PASS**, G7 **PASS** (0 of 1,122 HEAD-PASS M-2 rows and 0 of 72 HEAD-PASS M-3 rows regress).
- **M-2 light** is red only on the held cells and on two unread specimen runs (§2.2). **M-3 light** is red on every row: the well perimeter reads 2.79 under 10.1.0's stroke rung 0.48. At floor v2's 0.52 (a light-only variant, not in the patch) it reads 3.16, except the wash well over black (2.96) and the Dialog Close ring (2.90).
- **Q-11, off paper (H3-1):** REPORTED, 48 of 66 light composites grey, the same readings as floor v2 to the hex: over black `#e2dcd7` (L 0.898), over the story's deep canvas `#e3e3e3` (C 0.000). The minor split does not change O-62's off-paper reading.
- **The clamp does not move the light veil below the bound.** In every harness cell the sampler is unfed and the painted α sits on the bound (0.890 against 0.891). Where the demo feeds it, the clamp moves the veil **up**, from resting 0.9637 to 0.9715 at a sampled luma of 0.643. Its reach is two steps (+0.073), and α above 1 paints opaque in both engines (§4).

## 1 · The build

### 1.1 · How the light arm fits 10.1.0's recipe unchanged

10.1.0 paints every plate with one recipe (`glass/veil.css`): `color-mix(in srgb, oklch(from <ink> l c h / α) level·100%, var(--card))`, with α the clamped rung. Floor v2 rewrote that recipe as `--card` at `1 − (1 − α)·level`. With the ink set to the pole, the 10.1.0 recipe paints exactly that: at level 1 it is the pole at α, at level 0 solid `--card`, and at level 0.3 the premultiplied mix of (pole, α) 30% and (pole, 1) 70% has α `0.7 + 0.3α`, which is floor v2's `1 − 0.7(1 − α)`. So the minor needs no recipe change. The light arm is token values plus one rewritten law comment, the scope W-0.1 §3 admits:

| row | light value | where |
|---|---|---|
| pole | `--card-l: 0.9799`; `--card: oklch(var(--card-l) 0.011 63.36)` (#fef7f1). `--card`/`--popover` leave the `light-dark()` fold, which restated the light and dark values `color-radius.css` and `dark-arm.css` already declare. `DEFAULT_SURFACE` follows | `tokens/color-radius.css`, `tokens/light-dark.css`, `accent-tone-solve.ts` |
| ink | `--glass-veil-ink: var(--card)`: the light "ink" is the pole, read by name | `tokens/glass.css` |
| bound | `--glass-bound`, registered `<number>`, initial 1, computed from `--on-glass-muted-l` (0.4811, the existing `#705942` with L as its own token), `--card-l` and `--glass-ink-target` 4.8 over the black ground, FL-5's formula unchanged. It computes 0.890991 in both engines (`MS-probe.mjs`) | `tokens/glass.css`, `tokens/on-glass-fg.css` |
| rungs | `--glass-veil-base: var(--glass-bound)`, `--glass-veil-step: calc((1 − bound)/3)`; wash, floating, dock, chassis and crown at the bound; quiet, overlay and sheet +1 step; resting +2; dialog 1 | `tokens/glass.css` |
| state fills (FL-6) | menu row, capsule track, configurator chip, segmented wake, dock hover/active/press/switcher, control hover, checked disc, sheet seam and sheet edge: `light-dark(<floor v2's ink-register value>, <10.1.0's value>)`, the house's paired-colour idiom (§-1b). The focus-veil dim is the existing per-mode pair: light `--overlay-scrim-ink` 10%, dark unchanged in `dark-arm.css` | `menu.css`, `glass-capsule.css`, `configurator/styles.css`, `segmented.css`, `sizing.css`, `tokens/glass.css`, `scale-paper.css`, `sheet/styles.css` |
| manifest, test | `--glass-bound`, `--glass-ink-target` added to the material list (no name removed); `use-accent-tone.test.ts` reads `--card-l` where the pole carries it | `tokens/manifest.ts`, the test |

**The dark arm restates its ladder.** 10.1.0's rungs were declared once on `:root` as `base ± n·step`, and dark moved `base` alone. The light rungs are now bound arithmetic, so `dark-arm.css` declares `--glass-veil-step: 0.04` and the ten rungs in 10.1.0's own expressions beside its ink and base. The values are 10.1.0's, measured in paint (§0). Two side effects: a `.dark` island inside a light page now derives its rungs from the dark base (0.10 wash), where 10.1.0 inherited the light root's (0.06); the harness never mounts an island, so this is unmeasured. And `--card-l` is not declared in dark, so the dark scope reads the light pole's L; only the light bound reads it.

### 1.2 · Out by design

The dark arm (lift, perimeter 0.60), every removal (FL-1, FL-16, `--input-on-glass`), FL-2 (`contain: paint`), FL-7 (the held floor), FL-9 (the dock's private saturate), FL-10/FL-11, FL-14 (the held veil on the carriers), the O-87 blur ladder, and the light perimeter 0.52. Each costs the minor a measured row in §2.

## 2 · Measured under H3

### 2.1 · W-0.1 G1-G7

`node harness/run.mjs <wt> --label minor --demo` (§3), and HEAD re-captured in the same session for the paired rows. Chromium is the gate; Playwright WebKit is beside it.

| gate | Chromium | Playwright WebKit | HEAD under H3 (H3.md §3) |
|---|---|---|---|
| **G1** · M-1 no grey | **PASS 11/11**: every plate `#fef7f1`-`#fff8f1`, L 0.980-0.983, ΔE 0.009-0.010 from paper; the dock `#fdf7f2`; the real Dialog `#fef7f1` | PASS 11/11 | FAIL 11/11 |
| **G2** · O-66 field | **FAIL**: light trigger `#fff8f1` against Input `#f3ece2`, ΔE **0.037** on paper and in the pane; dark 0.175 / 0.167 (HEAD's own) | FAIL: 0.036 / 0.036, dark 0.177 / 0.172 | 0.028 / 0.192, dark 0.175 / 0.167 |
| **G3** · O-66 row, light | **FAIL**: row `#f3ece7` C 0.0101 against the plate `#fef7f2`, ΔL **−0.0330** (the fill register darkens; no tint). Dark recorded: ΔL +0.0010 (HEAD's) | FAIL: C 0.0093, ΔL −0.0338 | C 0.0094, ΔL −0.0551 |
| **G4** · W-A, light cells | **PASS 108/108**: thinnest painted α 0.890 against computed 0.891 in both bands; rungs 0.890 / 0.925 / 0.965, dock and popover 0.890, dialog 1.000 | PASS 108/108 (identical to 0.001) | FAIL 39/108 |
| **G5** · scope | **PASS**: no token name in a removed line is absent from `src`; verifier `terminal: CLEAN`, roster PRESENT 289 = 289, claims 193, declarations 454, css 124, install and type resolution exit 0, **with the bundle datum rebound in the worktree only**. Unrebound: `G-BUNDLE-RATCHET … 2921412 > 2919057` (+2,355 B, mostly the rewritten comments) | — | hold line |
| **G6** · dark untouched | **PASS**: 26/26 M-6 dark composites ΔE_OK 0.0000 from HEAD; 914/914 dark M-2 rows identical (p05 at R 1 and R 3, ink hex); dark glance crops 0.00% delta | the same rows, both engines | hold line |
| **G7** · no row regresses | **PASS**: M-2, 1,122 rows PASS at HEAD, 0 regress, 0 missing, 372 more pass; M-3, 72 PASS at HEAD, 0 regress (`MS-g7.mjs`, `MS-records/g7.txt`) | counted in the same rows | hold line |

G2 and G3 read H3-9's O-66 witness (W-0.1's own strips); W-0.3's `scripts/probes/band-0/measure.mjs` is not landed in the checkout, and H3.md §3.3 shows O-66 reproduces it to within 0.002.

### 2.2 · M-2, M-3 and H3-1

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| M-2 | FAIL 10/457 | FAIL 159/457 (HEAD's, row for row) | FAIL 6/457 | FAIL 159/457 |
| M-3 | FAIL 171/171 | FAIL 139/171 (HEAD's) | FAIL 171/171 | FAIL 133/171 |
| M-1x (H3-1) | REPORTED: 48/66 grey | — | REPORTED | — |

**M-2 light, the ten red rows.** Six are unread glyph runs that HEAD leaves unread too: `floating-held` fg and muted in the three held cells (the held floating specimen hides its text, H3.md §3.3) and `quiet-in-card` (three runs in the claim cell, laid out outside its opaque card's box in both builds). The other four are the held dock with 10.1.0's grasp register at 0.6 × the bound: `dock-held` fg **3.16** over black (Chromium). M-2h's halo leg reads the held dock at α 0.521-0.554 per column against a floor of 0.870. That is FL-7's row, not a halo. Every ladder, dialog, hostile and claim row over every ground passes: light muted lowest 6.19 on paper, the capsule's fg 15.73. M-2m light PASS 215/215, with the 100 s drift included.

**M-3 light.** Perimeter 2.79 on every ground (2.62 over black), ring 2.84-2.96. HEAD reads 2.21-2.79, so nothing regresses (G7), but nothing passes. `MS-perim52.css` (`:root:not(.dark) { --ink-perimeter: 0.52 }`, light ladder and dialog cells, 21:35-21:40, load 26.8 → 36.8) reads perimeter 3.16 Chromium and 3.18 Playwright WebKit. Two rows stay red: the wash well over black (2.96) and the Dialog Close ring (2.90, its 48% is a literal until FL-10 routes it through the token): `MS-records/verbose/m3-minor-perim52.txt`. Floor v2 reads 3.09-3.15 on its bound well (FL-11), which the minor does not carry.

**H3-1, off paper (Q-11 unruled, REPORTED).** Chromium and Playwright WebKit agree to 0.002:

| ground | wash · floating · dock · popover | quiet · overlay | resting · card | dialog, escape |
|---|---|---|---|---|
| black | `#e2dcd7` L 0.898 C 0.0095 | `#ece5df` L 0.926 | `#f5eee8` L 0.953 | `#fef7f1` (cream) |
| checker | `#f0eae5` L 0.940 | `#f6efe9` | `#faf3ed` | `#fef7f1` |
| deep `#193b59` | `#e3e3e3` L 0.916 **C 0.0000** | `#edeae7` | `#f5f0ec` | `#fef7f1` |

These are floor v2's readings (FLOOR-V2 §4.3), so 10.2.0 would ship the floor's light grey over dark grounds. G1 green therefore does not show what the owner sees off paper. Whether that is acceptable is Q-11.

### 2.3 · The rest of the battery, for the record

Light, Chromium: RAW PASS, M-2m PASS 215, M-5 PASS 10, M-8 PASS 4, M-9 PASS 10 (the focus veil dims, ΔL −0.070 on paper), W-S PASS 12, T reported (light T 0.110 / 0.075 / 0.035, T_c1 ≤ 0.122). Red: M-2h 8/22 (above), M-4 7/84 (the dock's muted ink is `#000000`, 10.1.0's `contrast-color()` pole, signed −0.230 inverted; its removal is W-H.1's), M-6 light adjacency 4/4 (Q-1), M-7 4/4 (`contain: paint`, W-E.2's), STACK 3/12 (HEAD's `glass-floating` host). Dark: every verdict equals HEAD's (`MS-records/baseline-minor.json` against `H3-records/baseline-head.json`).

## 3 · Runs and load

| run | time | load | result |
|---|---|---|---|
| `run.mjs <wt> --label minor --demo` | 20:41:58-21:19:57 | 28.9 at start; main capture 1811 s (140 cells, 8 live, 8 motion, 4 drift windows), 15.8 at its end; retunes 52.6-53.7 s (22-32); `noclaim` 162.9 s (18.6); 38.2 at end | `MS-records/run-minor.log`, `results/` |
| `baseline.mjs` | 21:20:24 | 36.4 | `baseline-minor.json` |
| HEAD cells (`capture.mjs`, ladder, dialog, held, hostile, claim, o66, halo, state; both engines and themes) | 21:20:22-21:35:04 | 35.9 → 27.1 | `cap-head.log`; the G6/G7 rows |
| perimeter 0.52 variant | 21:35:24-21:39:58 | 26.8 → 36.8 | §2.2 |
| `MS-clamp.mjs`, `MS-probe.mjs --clamp` | 21:40:25-21:42 | 30 → 53 | §4 |
| toolchain | 21:43-21:49 | 48-68 | §5 |
| glance (H-13), both engines | 21:53:04-21:56:46 | 91 at start | `glance-minor/` |

No cell timed out and none read janky, so none was re-run. One WebKit probe crashed on `GlassDock` before `MS-probe.mjs` carried D2's shim; with the shim it ran clean. That was the instrument, not the build.

## 4 · Does 10.1.0's clamp move the light veil off the bound?

**Below it, never. Above it, by up to two steps, only where the sampler is fed.**

- **The harness cells.** The specimen dock binds no canvas, and `--glass-backdrop-luma` reads 0 on every plate. Painted α equals the bound (W-A: 0.890 against 0.891, dock included), so the minor's H3 numbers are the clamp-free numbers.
- **The demo, fed** (`MS-clamp.mjs`, Chromium, motion on, 8-20 s, every 0.5-1 s; computed style only, no canvas context requested by the probe):
  - `/substrates/glass-material`, light: the live-canvas card's sampled luma reaches **0.643**, past the 0.6 knee. Its rung reads **0.9637-0.9715** against its resting 0.9637, at most +0.0078. Dark: 0.18-0.1886, as 10.1.0.
  - `/dock/overview` and `/dock/layers`, light, 20 s: luma stayed 0 on every dock plate. The shared stage observer wrote nothing the plates inherit in that window, so the dock rung held at 0.890991. Why it stays unfed is not established here.
- **Its reach** (`MS-probe.mjs --clamp`, luma written on every plate): at 0.6 nothing moves; at 0.8, +1 step; at 1, +2 steps. That gives wash 0.9637, resting 1.036, dialog 1.073. A rung above 1 paints the opaque pole in both engines: Chromium `color(srgb 0.996 0.969 0.945)` with no alpha, and Playwright WebKit the same. So the clamp only thickens the light veil toward the card. It cannot thin it, and it cannot make a plate invalid.
- **What it costs in meaning.** In light the "earned darken" now earns cream. The glass-material story's copy ("watch the plate darken as the painterly field brightens") and its live-canvas card are wrong for the light arm. In the glance pair the card reads `#0d3c66`-blue at HEAD and cream on the minor (`glance-minor/glance-chromium-light-story-base-vs-minor.jpg`). The demo copy is outside this patch; it is a prose row (FL-12) for whoever lands it.

## 5 · Toolchain (worktree; `vite.minor.config.ts` → `cacheDir: .vite-minor`, not in the patch)

| step | result | load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 48 |
| `vue-tsc -p tsconfig.test.json` | exit 2 before a library build (`@mkbabb/glass-ui/fourier-math` self-reference), **exit 0** after it | 60-65 |
| library build | exit 0 | 60 |
| `vitest run` | 239 files, **2279 passed, 40 failed**, 10 expected-fail, 1 skipped | 65 |
| verifier | §2.1 G5 | 65 |

The 40 failures:
- **3, `boot-graph`:** no `dist-demo`, as floor v2 recorded.
- **1, `menu/contract` "restores focus on execute":** a 30 ms focus wait. It re-ran alone twice, once red and once green, at load 67. It is load-sensitive, not a paint row, and FLOOR-V2 §7 saw it too.
- **36 test arms that pin 10.1.0's material law,** which the light arm changes by design. Floor v2's patch rewrote each of them:
  - `glass-subtlety` (6): "a STRICTLY increasing ink register in BOTH modes", "the content band under the 0.20 transmission ceiling", "DIMS in both modes", "every rung from the one base and one step", "the DARK arm by the base alone, one line" (the dark arm now declares its ten rungs), and the "PAIRS the two axes" arm that cannot parse a bound-derived α.
  - `contrast-computed` (29): its colour parser cannot read `oklch(var(--card-l) …)`, plus five stated figures over the old card (for example "over --card 3.30", "4.53 over `--card`", "1.87:1 on --card").
  - `focus-veil` (1): pins the old light dim declaration.

  A landing of this subset owes these arms' rewrite, as floor v2's patch shows them (`../pass-3/floor-v2.patch`, `tests/styles/*`), restricted to light.

## 6 · Glance (H-13), O-87 and the gestalt

`glance-minor/` (`glance.mjs --require-delta`, both engines). Light deltas: dock 42.3%, Dialog 69.6%, floating 55.2%, story 19.1% (Chromium) and 20.0% (Playwright WebKit). Dark: 0.00% on every crop, which the witness reports as "FAIL 4 of 8 pairs show no delta". That FAIL is G6 holding, not a capture defect. Light reads as on floor v2: cream cards over the aurora, wash, quiet and resting indistinguishable, the light dock a cream pill with its active tab still marked. The patch adds no lighting layer, shadow or gleam (O-87). The inherited modal stack and dock glow stay, as on floor v2. Blur is 10.1.0's 10/14/16/20/22, because O-87's "slightly less blur" is W-0.11's row, not this one.

## 7 · What this means for W-0.1

| item | reading | owner |
|---|---|---|
| G1, G4-G7 | green on the light arm alone; the dark arm byte-stable | — |
| G2 | red at 0.037: the trigger paints the card pole over the floor fill, the Input the opaque `--input-on-glass` `#f3ece2`. W-0.1 §3.2's "one field surface" is its own change. The minor carries no answer, and floor v2's well (FL-11) reads 0.057 | the converged spec's field row |
| G3 | red at ΔL −0.033: FL-6's ink fill darkens a cream row without a tint. W-0.1 §3.3 asks for an accent tint or accent ink. Floor v2's FL-6 does not meet G3 either (FLOOR-V2 §4.3: −0.0330) | the converged spec's menu row |
| M-3 light | 2.79 at the 0.48 stroke; 3.16 at 0.52, with the black-ground wash well (2.96) and the Close ring (2.90) still red | a light-only token value (0.52) plus FL-10, if the spec places them in 10.2.0 |
| held dock | 0.6 × bound = α 0.52-0.55; `dock-held` fg 3.16 over black. G7-neutral (HEAD fails the same rows) | FL-7 (a value change in `grasp.css`, minor-lawful) if the spec places it in 10.2.0 |
| Q-11 | 48/66 off-paper composites grey, identical to floor v2 | owner |
| the clamp | inert in the battery; thickens upward only where fed (+0.0078 measured, +0.073 reach) | — (removal is W-H.1's) |
| tests, ratchet, demo copy | 36 arms to rewrite to the light law; +2,355 B rebind; the glass-material story's "earned darken" copy | the landing wave |

The minor split exists and is measured: the light arm alone holds the dark arm and the published names, and fixes O-62 over paper. It does not close O-66 §1 (G2, G3), and it leaves the light veil grey off paper exactly as floor v2 does.

## 8 · Reproduce

```sh
B=.claude/worktrees/bl/D3/p3/minor; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-3
git worktree add --detach $B/wt HEAD && ln -s $PWD/node_modules $B/wt/node_modules && git -C $B/wt apply $PWD/$P/minor-split.patch
git worktree add --detach $B/head-wt HEAD && ln -s $PWD/node_modules $B/head-wt/node_modules
export D3_OUT=$PWD/$B/out
node $H/run.mjs $B/wt --label minor --demo && node $H/baseline.mjs $D3_OUT/caps/minor --out $B/baseline-minor.json
node $H/build.mjs $B/head-wt --label head --demo
node $H/capture.mjs $D3_OUT/builds/head/dist --out $D3_OUT/caps/head --engines chromium,webkit --themes light,dark \
  --scenes ladder,dialog,held,hostile,claim,o66field,o66menu,halo,state
for l in head minor; do node $H/m2-text-contrast.mjs $D3_OUT/caps/$l --gate chromium,webkit --verbose > m2-$l.txt
  node $H/m3-non-text.mjs $D3_OUT/caps/$l --gate chromium,webkit --verbose > m3-$l.txt
  node $H/m6-separable-ladder.mjs $D3_OUT/caps/$l --gate chromium,webkit --verbose > m6-$l.txt; done
node $P/MS-g7.mjs m2 m2-head.txt m2-minor.txt; node $P/MS-g7.mjs m3 m3-head.txt m3-minor.txt; node $P/MS-g7.mjs dark m6-head.txt m6-minor.txt
node $H/capture.mjs $D3_OUT/builds/minor/dist --out $D3_OUT/caps/minor-p52 --themes light --scenes ladder,dialog --inject $P/MS-perim52.css
node $P/MS-probe.mjs $D3_OUT/builds/minor/dist --clamp; node $P/MS-clamp.mjs $D3_OUT/builds/minor/demo
node $H/glance.mjs --base $D3_OUT/builds/head/dist --route $D3_OUT/builds/minor/dist --story-base $D3_OUT/builds/head/demo \
  --story-route $D3_OUT/builds/minor/demo --out $P/glance-minor --name minor --require-delta [--engine webkit]
git worktree remove --force $B/wt; git worktree remove --force $B/head-wt
```
