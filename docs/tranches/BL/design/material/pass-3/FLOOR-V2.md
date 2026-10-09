# D3 · pass 3 · FLOOR-V2: the null route, built once, and its H3 baseline

| field | value |
|---|---|
| seat | D3 pass 3, FLOOR-V2 (`REGISTRY.md` P2-6.2 step 2). Builds floor v2 once on the real source: `../pass-2/floor.patch` + A′ merged as FL-14..FL-16 (P2-3 X-1) + the two stale prose lines, under the P2-5 pass-3 defaults and O-87. Runs the full H3 battery on HEAD+floor v2 in both engines; that run is the new baseline |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree cut at `5631b287` (`.claude/worktrees/bl/D3/p3/floor2/wt`, removed at the end). The task named `8059b373`; `git diff --stat 8059b373 05e5e1fb -- src demo tests package.json scripts` is empty, so every number below is the 10.1.0 source plus this patch. The checkout moved to `809f1b7c`, then `05e5e1fb`, during the seat (docs only) |
| patch | `floor-v2.patch` (this folder), `git diff HEAD --binary` of the worktree: 81 files, +814 / −2195, 5 files deleted. `git apply --check` is clean on `05e5e1fb`, and the file is byte-identical to the measured tree's diff (`cmp`) |
| engines | Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, the gate) and **Playwright WebKit 26.5** (paint-only: no `backdrop-filter`; dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 27-78 for the whole seat (other seats: D2, D4, D5). The load is beside every run in §4 and §7. No cell timed out. The battery ran twice in full (§4.1); every verdict but STACK reproduced row for row, and STACK changed only because the source changed between the runs |
| fences | no git write and no tracked-source edit in the checkout. Writes in the checkout: this file, `floor-v2.patch`, `FV2-plants.mjs`, `FV2-halo-probe.mjs`, `FV2-records/`, `glance-fv2/`. Builds and captures lived under `.claude/worktrees/bl/D3/p3/floor2/` |
| records | this file is the source of record for floor v2 and for the HEAD+floor v2 baseline under H3. Raw: `FV2-records/` (both run logs, every witness log of both runs, the per-engine table `baseline-fv2.md`/`.json`, the plant logs and CSS, the halo probe, the escape probe, the toolchain logs, the lighting census) |

## 0 · In brief

- **Built and green on the toolchain.** `vue-tsc` exit 0 on both projects. Units: 237 files, **2318 passed**, 10 expected-fail, 1 skipped, 0 failed. Library build exit 0. Package verifier CLEAN on every leg but the owed ratchet rebind: **`G-BUNDLE-RATCHET` shrink 2,900,254 < 2,919,057** (−18,803 B).
- **The H3 battery on HEAD+floor v2, Chromium gate:** RAW, M-1, M-2 (938 rows), M-2m (430, the 100 s drift included), M-3 (354), M-5, M-7, M-8, STACK, W-A (216), W-S and T are PASS. Five are red:
  - M-2h 2/68: the halo leg, attributed (N-3, §3);
  - M-4 7/168: the dark capsule's `-strong` muted at +0.067, HEAD's own row;
  - M-6 7/30: adjacency, Q-1;
  - M-9 1/20: the dark focus veil over paper, ΔL +0.006;
  - O-66 5/5: W-0.1's G2 and G3.

  M-1x is REPORTED: 48 of 66 off-paper light composites read grey (Q-11).
- **This seat found and cured one defect of FL-14.** A held plate stands its own `backdrop-filter` down, and the stacking context goes with it. Its carriers at `z-index: −1` then escaped the host: STACK FAIL 12/24 on the first run, and wash-held fg **1.20** over an opaque ancestor. `@utility glass-plate` now declares `isolation: isolate`. That is a stacking context, not a backdrop root, so the carriers still sample the ground. Result: STACK PASS 24, 0 of 48 held rows under 4.5 over the opaque ancestor, and the removal plant reds both (§2, §5).
- **N-3, the dock's held halo: attributed, not a plate defect.** The Slider's press engages the focus veil (`glass/focus-veil.css`), a full-viewport `blur(16px)` masked to a window centred on the Slider (x ≈ 493). It frosts the black ground into the dock's right half. Hidden, the held dock reads flat α **0.894 / 0.878** per column, on the bound. This closes pass 2's "0.025 residual" as well. Ap-crit §3.1's attribution to the Slider's own halo is refuted by two plants (§3).
- **O-87.** The blur ladder is 6/10/12/16/**18**: every rung 4 px under 10.1.0 and strictly ascending, so the census reads `blur=0`. The floor's 16/16 tie broke W-0.11 G1's ascending law. No lighting layer, shadow or gleam is added. The census still reads the **inherited** `--shadow-modal` stack (2) and the dock glow halo (2). They are visible in the dark dock frame, untouched here and open (§6).

## 1 · The rows, file by file

Line numbers are in the patched tree (`05e5e1fb` + `floor-v2.patch`). FL-1..FL-13 are `../pass-2/FLOOR.md` §1 as built there; each line below re-locates them.

| row | what it is | where |
|---|---|---|
| **FL-1** sampler deleted | `useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts`, their test and `docs/consumer-evidence/use-glass-backdrop-luminance.md` deleted. Also gone: `backgroundCanvas`, the clamp and knee, `--glass-backdrop-luma` and its `@property`, the `--glass-backdrop` bucket, both `contrast-color()` inks, the demo observer, `preserveDrawingBuffer`, `data-glass-field-canvas` and every `:background-canvas`. This seat also struck the last four "earned-darken clamp" sentences, which describe the deleted clamp: `glass.css:47`, `feedback-tone.css:38`, `ladder-undershadow.css:15-18`, and two test comments. Residue grep over `src demo tests` for every FL-1 name: assertions of absence only | as listed |
| **FL-2** `contain: paint` off the rungs | the rung's own `backdrop-filter` is named as the backdrop root | `glass/material.css:71-73` |
| **FL-3** the `--card` pole | `--card-l: 0.9799`, `--card: oklch(var(--card-l) 0.011 63.36)`; dark `0.2949`; `DEFAULT_SURFACE` the same colour | `tokens/color-radius.css:83-84`, `tokens/dark-arm.css:95-96`, `accent-tone-solve.ts:29` |
| **FL-4** unknown ground → the bound | every rung's thinnest α is `var(--glass-bound)`; an invalid solve paints α 1 (`@property --glass-bound` initial 1) | `tokens/glass.css:276-292` |
| **FL-5** one source of record | the encoded-tone solve, any-input pole, target 4.8 | `tokens/glass.css:42-43, 250-268`; dark `--glass-bound-ground: 1` at `dark-arm.css:276` |
| **FL-6** no state fill reads a plate | menu row, capsule track, dock hover/active/press, configurator chip on the fill register; focus-veil dim and sheet seam on the scrim ink | `menu.css:10`, `glass-capsule.css:82`, `sizing.css:204-205, 259`, `configurator/styles.css:529`, `tokens/glass.css:110`, `sheet/styles.css:361-362` |
| **FL-7** held never sheds below the bound | `--glass-veil-floor: var(--glass-bound)`; held rung `max(0.6 × rest, floor)`; `--glass-saturate-grasp = saturate × 7/6` | `glass/veil.css:65`, `glass/grasp.css:135`, `tokens/glass.css:75` |
| **FL-8** the Dialog is a room | `--glass-veil-dialog: 1` | `tokens/glass.css:286` |
| **FL-9** one dock filter | the dock rides `--glass-blur-resting` | `dock/styles/shell.css:20` |
| **FL-10** indicators through the perimeter token | the Dialog Close ring reads `--ink-perimeter` | `dialog/styles.css:144, 243` |
| **FL-11** the well is a rung | `--glass-well` at the bound; `--input-on-glass` retired; no field `backdrop-filter`; `--neutral-5` declared once per mode | `tokens/glass.css:151-158`, `_shared/field/control.css:77, 97`, `color-radius.css:45` |
| **FL-12** prose | the floor's sweep (FLOOR §1), A′'s sweep (Ap-proto §1) and this seat's lines (below) | as listed |
| **FL-13** consumer addenda | text in §8; landing is each consumer's tranche (E-6) | — |
| **FL-14** the held veil on the carriers | `@utility glass-plate`: `&:has(> .glass-grasp-carrier[data-grasp="grasp"]) { background: none }` and `& > .glass-grasp-carrier { background: var(--glass-veil); z-index: -1 }`, scoped to plates. **Added here:** `isolation: isolate` on the plate (§2) | `glass/veil.css:64-83` (isolation `:74`, carrier rules `:76-82`, prose `:50-63`) |
| **FL-15** the dark perimeter arm | `.dark { --ink-seam: 0.0923; --ink-edge: 0.1846; --ink-perimeter: 0.60 }`, 1 : 2 : 6.5 as in light (0.08 / 0.16 / 0.52) | `tokens/dark-arm.css:288-290`; light `tokens/color-radius.css:149-151` |
| **FL-16** `backdropMode` deleted | the prop, its default, `data-backdrop-mode`, the `DockBackdropMode` type (from `./dock`), the opaque arm and the README row. Demo docks move to `class="glass-opaque"`, the one solid plate | `GlassDock.vue`, `useDockShellProps.ts`, `dock/index.ts`, `dock/styles/adaptive-legibility.css:7`, `dock/README.md:51`; the escape at `glass/ladder-undershadow.css:14` |
| **prose 1** | `control-bit.css:119`: "The perimeter rung is 0.48, the floor itself" becomes history ("then stood at 0.48"). The ten 0.48 figures are marked as computed then, and `:128-130` adds that the rung has since moved to 0.52 light / 0.60 dark, a stronger ink | `glass/control-bit.css:119-133` |
| **prose 2** | `ladder-undershadow.css:15-18`: "the earned-darken clamp rides the veil's alpha" struck (A′'s listed residue) | `glass/ladder-undershadow.css:16-18` |

**Also in the patch, found while building:**

| change | why | where |
|---|---|---|
| **H3-11 stacking unit arm** landed in place of A′'s, as H3 §6 wrote it. Extended: it also asserts that `@utility glass-plate` forms a stacking context, because every rung composes the plate and a consumer may mount carriers in any rung | the old arm passed any `z-index` digit; H3 §6 | `tests/styles/glass-subtlety.test.ts:1067-1105` |
| **blur ladder 6/10/12/16/18** (overlay 16 → 18), the band [6, 18] strictly ascending, each rung −4 px from 10.1.0 | O-87 "slightly less blur", and W-0.11 G1's ascending law, which the floor's 16/16 tie broke (census `BLUR … breaks the ascending ladder`) | `tokens/glass.css:45-66`; test `glass-subtlety.test.ts:221-243` |
| the deep tier's stated figures re-derived on the new ladder: 7.75 / 11.75 / 13.75 / 19.5 / 23 px (they still stated 10.1.0's 11.75 … 27); the ladder header's per-rung table states radius and α as bound + steps (it still read 10.1.0's inks .06-.26); `motion-registers.css`' "20px … 22px" names the rungs instead | FL-12 in files the floor's blur change made stale | `glass/deep.css:60, 76, 119-121, 127`; `tokens/glass-deep.css:17, 42, 60, 87, 104-105`; `glass/ladder.css:7-16`; `tokens/motion-registers.css:125-129`; `Surface.test.ts:208` |
| **"PAIRS the two axes" rewritten** to pair by rung name | it was vacuous under the floor: every rung's α is a `calc(var(--glass-bound) …)`, so `inkAlpha` read NaN for all five, the map held one key, and it passed only while floating and overlay shared 16 px. It now also fails if it reads no surface. Plant: `surfaces-pager.css`'s floating ink under the quiet kernel reds it ("floating ink under the quiet kernel (10px, pairs at 16px)") | `glass-subtlety.test.ts:291-335` |

**P2-5 defaults built:** Q-1 (a), with (c) reported beside it (M-6 in §4); Q-3 (a); Q-4 (a); Q-6 (a) with dark 0.60; Q-7 (a)+(b) (an invalid solve paints α 1); Q-8 has no adaptation motion on the floor; Q-9 (a) under O-87; Q-11 (a), with M-1x REPORTED; Q-12 (a), the static ink; Q-13 (a).

## 2 · The defect this seat found in FL-14, and its cure

**Measured (first full run, 18:31-19:11, load 27-78).** STACK reads `wash-held host .hx-plate.glass-wash: forms none (position absolute, z-index auto, parent block)` in every held cell, both engines: **FAIL 12 of 24**. Under H3-5, FL-14 makes every plate graspable, and grasp.css's law has a held host stand down its `backdrop-filter`. A resting rung is a stacking context because of that filter, so a held one is not, and its carriers' veil at `z-index: −1` drops to the nearest context behind it. Over an ink-coloured opaque ancestor (`plant-noisolation`), wash-held fg reads **1.20** light and **1.24** dark, in both engines.

**Cure.** `isolation: isolate` in `@utility glass-plate` (`glass/veil.css:74`). Isolation forms a stacking context and is not a backdrop-root trigger, so the carriers still sample the ground. The harness's former census (`capture.mjs:123-129`) also does not count it, so H3-5 still reads the host as graspable. At rest it changes nothing in paint: every resting rung was already a context by its filter.

**After (second full run).** STACK PASS 24. M-2 held unchanged (dock-held muted-tab 4.83 light black). Over the opaque ancestor (`risk-opaque-ancestor`), 0 of 48 held rows sit under 4.5 in either engine (wash-held muted 4.83 Chromium, 4.62 Playwright WebKit). Pass 2's stacking risk (Ap-proto §2 item 2: wash-held fg 1.20 over an opaque ancestor) is closed for every plate, not only `.dock-plate`.

## 3 · N-3: the dock's held halo, attributed

M-2h's halo leg is red in Chromium only: held dock α per column 0.815 (x 411) … 0.894 (x 278) light, floor 0.870; 0.802 … 0.878 dark, floor 0.855. Playwright WebKit is flat (0.890-0.898; it paints no `backdrop-filter`). The release legs are green in every cell (below).

| plant (`FV2-plants.mjs`, Chromium, held + ladder cells) | dock still held | halo leg (light / dark) |
|---|---|---|
| none (the run) | yes | 0.815 … 0.894 / 0.802 … 0.878 ✗ |
| `diag-held-nosliderblur`: the Slider's carriers without a filter | yes | 0.814 … 0.894 / 0.801 … 0.878 ✗ |
| `diag-held-sliderpaint`: every Slider paint transparent, still hit-testable | yes | 0.812 … 0.894 / 0.799 … 0.878 ✗ |
| **`diag-held-noveil`: `.glass-focus-veil { display: none }`** | yes | **0.894 … 0.894 / 0.878 … 0.878** (flat, ≥ floor) |

`FV2-halo-probe.mjs` (computed style only) lists every filtered element while held. One of them is `span.glass-focus-veil`, a full-viewport `blur(16px) saturate(1.5)` masked to `calc(38.5181% ± 60…172px)`, which centres it on the Slider (x ≈ 493). The capture shows it: a soft frost around the lifted Slider that pulls the black ground across the dock's right half and lightens the black around it.

**Attribution.** The halo is the focus-veil cohort, engaged by the Slider's press. It is not a held plate thinning. FL-7 and FL-14 hold in paint: with the veil gone, the held dock is the bound composite in every column. This also explains pass 2's 0.025 residual (Ap-proto §2 item 2, Ap-crit §3.1); the earlier diagnostics removed filters on `.hx-dockcell` only, and the veil is mounted outside it. Whether a focus veil should frost the chrome that hosts its own engaged control is the focus-veil register's question (D5), not the material's. Every ink on the held dock clears 4.5 under it (M-2 PASS).

## 4 · The H3 battery on HEAD+floor v2: the new baseline

### 4.1 · The runs

| run | command | time | load | result |
|---|---|---|---|---|
| 1 | `D3_OUT=…/floor2/out node harness/run.mjs <wt> --label fv2 --demo` (before §2's cure) | 18:31:18-19:11:04 | 27.3 → 32.9 (main capture: 140 cells, 8 live, 8 motion, 4 drift windows in 1839.8 s), 69.9-78 in the retune and `noclaim` captures | `FV2-records/run1.log`, `results-run1/`: the verdicts below, except STACK FAIL 12/24 |
| 2 | the same, on the final tree | 19:15-19:54:45 | 32.8 at start; main capture 1844.6 s (load 59.6 at its end); retunes 54.2-54.8 s (load 48-61); `noclaim` 167.3 s (load 60.2) | `FV2-records/run2.log`, `results/` |
| table | `harness/baseline.mjs <capdir> --out baseline-fv2.json` | 19:54:58-20:00:31 | 51.0 → 50.3 | `FV2-records/baseline-fv2.md` |

Unshimmed Playwright WebKit crashed on `GlassDock` (`page.goto: Page crashed`, light and dark), as H-14 records. That is a probe, not a gated cell.

### 4.2 · Per witness, engine and theme (run 2, `baseline.mjs`)

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark | HEAD under H3 (Cr light / dark; H3.md §3.2) |
|---|---|---|---|---|---|
| RAW | PASS 24 | PASS 24 | PASS 24 | PASS 24 | PASS 24 / 24 |
| M-1 | **PASS 11** | — | PASS 11 | — | FAIL 11/11 |
| M-1x | REPORTED | REPORTED | REPORTED | REPORTED | REPORTED |
| M-2 | **PASS 469** | **PASS 469** | PASS 469 | PASS 469 | FAIL 189/457, 159/457 |
| M-2m | **PASS 215** | **PASS 215** | PASS 215 | PASS 215 | FAIL 94/215, 98/215 |
| M-2h | FAIL 1/34 (halo, §3) | FAIL 1/34 (halo) | PASS 34 | PASS 34 | FAIL 10/22, 13/22 |
| M-3 | **PASS 177** | **PASS 177** | FAIL 2/177 | PASS 177 | FAIL 171/171, 139/171 |
| M-4 | PASS 84 | FAIL 7/84 | PASS 84 | FAIL 7/84 | FAIL 7/84, 14/84 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 | FAIL 1/10, 3/10 |
| M-6 | FAIL 4/4 | FAIL 3/26 | FAIL 4/4 | FAIL 3/26 | PASS 4, FAIL 14/26 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 | FAIL 4/4, 4/4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 | FAIL 4/4, 4/4 |
| M-9 | PASS 10 | FAIL 1/10 | PASS 10 | FAIL 1/10 | PASS 10, FAIL 3/10 |
| O-66 | FAIL 3/3 | FAIL 2/2 | FAIL 3/3 | FAIL 1/2 | FAIL 3/3, 2/2 |
| STACK | **PASS 12** | **PASS 12** | PASS 12 | PASS 12 | FAIL 3/12, 3/12 |
| W-A | **PASS 108** | **PASS 108** | PASS 108 | PASS 108 | FAIL 39/108, 26/108 |
| W-S | PASS 12 | PASS 12 | PASS 12 | PASS 12 | FAIL 4/12, 4/12 |
| T | reported | reported | reported | reported | reported |
| W-C (C″'s witness, read only) | FAIL 2/181 | FAIL 4/181 | FAIL 2/181 | FAIL 4/181 | FAIL 85/181, 68/181 |
| W-B, W-D, W-E, W-F, W-G (banked, retired, BLOCK) | FAIL 6/10, 5/9, 20/220, 21/44, 12/20 | FAIL 6/10, 5/9, 20/220, 17/44, 16/20 | FAIL 6/10, 5/9, 22/220, 21/44, 16/20 | FAIL 6/10, 5/9, 20/220, 17/44, 20/20 | — |

Whole-run Chromium verdicts (`run.mjs`): RAW PASS 48 · M-1 PASS 11 · M-1x REPORTED · M-2 PASS 938 · M-2m PASS 430 · M-2h FAIL 2/68 · M-3 PASS 354 · M-4 FAIL 7/168 · M-5 PASS 20 · M-6 FAIL 7/30 · M-7 PASS 8 · M-8 PASS 8 · M-9 FAIL 1/20 · O-66 FAIL 5/5 · STACK PASS 24 · W-A PASS 216 · W-S PASS 24 · T PASS.

### 4.3 · The readings beside the verdicts (Chromium unless labelled)

| witness | reading |
|---|---|
| W-A leg 4 / T | thinnest painted α on the computed bound: light 0.890 vs 0.891, dark 0.875 vs 0.873. Light rungs: wash, floating, dock, popover 0.890; quiet, overlay 0.925; resting, card 0.965; dialog 1.000. T light 0.110 / 0.075 / 0.035, dark 0.125 / 0.086 / 0.043; T_c1 up to 0.144. Playwright WebKit identical to 0.001. Unchanged from pass 2 (Ap-proto §2 item 1) |
| W-A legs 2-3 | chrome over black light: worst floating·muted **4.83**; over white 5.27; dark over black 7.21 |
| M-2 | light lowest: muted 4.83 (light black: wash; the dock muted-tab); light c1 wash·muted 5.39; dark lowest muted 4.84. Playwright WebKit lowest 4.57-4.62 (light checker and black, as pass 2) |
| M-2m | step windows 102-110 frames, every ink ≥ 4.5 (worst 5.16 light, 5.38-5.44 dark). **Drift 100 s**: 51 frames per window, 43/43 inks ≥ 4.5 in every frame. Chromium worst 5.16 light and 5.38 dark (load at end 69-73); Playwright WebKit 4.99 and 5.41. HEAD: 22 of 43 light |
| M-2h release | every held ink ≥ 4.5 in every frame, both engines. Chromium 23-64 frames per window over −468…+1408 ms; worst dock-held·muted-tab 4.79 (light black, −138 ms) and 4.76 (dark white, +198 ms). HEAD: 1.05 at +132 ms |
| M-3 | perimeter min light 3.09, dark **3.29** (FL-15); Playwright WebKit light 2/177 (checker ring, as pass 2) |
| M-4 | 7 red rows, each the **dark capsule**: fg `#e9e6e2`, muted `#d5d0c8` (its `-strong` register), signed +0.067 against 0.08, on every dark ground. HEAD reads the same +0.067 (H3.md §3.3 H3-3). The dark dock is cured: muted `#c3b9ac`, +0.136 (HEAD `#ffffff`, −0.074) |
| M-6 | light adjacency 0.001-0.004 (Q-1 a: struck); dark wash→quiet 0.007, quiet→resting 0.004, floating→overlay 0.007 (red), resting→floating 0.011; every dark plate above the page, ΔL +0.131 … (signed leg green). **Q-1 (c) reported beside it:** under three materials (content, chrome, room) the dark span bound → opaque is ΔE 0.132 → 0.150 off the page (Ap-crit §3.2); the floor paints content at bound…bound+2 steps, chrome at bound…bound+1, the room at 1 |
| M-9 | dark paper: active ΔE 0.096, hover 0.042, checked 0.335, selected 0.227; focus veil `#0b0a09` → `#0d0b09`, **ΔL +0.006** (does not dim; Playwright WebKit +0.009). HEAD +0.000. FL-6's one declaration (`--overlay-scrim-ink` 10%) dims light and not dark |
| O-66 G2 | light: trigger `#fff8f1` (the card pole) against Input `#ece5e0` (the well), **ΔE 0.057** on paper and in the pane (HEAD 0.028 paper, 0.192 pane). Dark 0.023 / 0.015 (HEAD 0.175 / 0.167). Playwright WebKit dark pane 0.009 |
| O-66 G3 | light row `#f3ece7`, C 0.0101, ΔL **−0.0330** against the plate `#fef7f2` (HEAD −0.0551): the fill register still darkens the plate, with no tint. Dark recorded: +0.039 |
| M-1x | REPORTED (Q-11 unruled): **48 of 66** off-paper light composites read grey. Over black, wash/floating/dock/popover `#e2dcd7` L 0.898 C 0.0095; over the deep canvas `#e3e3e3` C 0.0000; over the checker `#f0eae5`. The dialog rung and the escape `#fef7f1` pass |
| W-S | inert: the floor has no thinning arm (H3.md §5.2) |
| W-C | 6 red rows, all silent desyncs under a colour retune. `retune-fg` compresses fg : muted to +0.062 light and +0.070 dark on the content plates and the Dialog; `retune-bg` dark: the capsule at +0.067. Every run ≥ 4.5. W-C is C″'s witness (P2-6.3 row 17); floor v2's is W-A |

## 5 · Mechanism-removal plants (P2-6.3 row 19)

Over the run-2 build (`FV2-plants.mjs <dist> <wt>`, 20:01-20:25, load 25.7-58.6). Each plant is read on the cells it took (`--cells`).

| green | plant | red measured |
|---|---|---|
| M-2, W-A legs 2-3 (FL-4, FL-5) | `plant-bound` (`--glass-bound: 0.25`) | M-2 **184 of 564** ladder and dialog rows under 4.5 (black, white, c1), Chromium + Playwright WebKit |
| FL-7 (held floor) | `plant-heldfloor` | held M-2 40/144: wash-held muted **1.77** light black, fg 2.57 / muted 1.65 dark white, both engines |
| FL-14 (veil on the carriers) | `plant-carrierveil` (the floor's paint) | held M-2 50/144: Chromium floating-held fg **1.46-2.50**, muted 1.31-1.77 in every held cell. Playwright WebKit stays green (it paints no `backdrop-filter`), as pass 2 |
| FL-14's stacking precondition (§2) | `plant-noisolation` (isolation removed, opaque ancestor) | wash-held fg **1.20** light / **1.24** dark, both engines; STACK FAIL 8/12. Without the plant (`risk-opaque-ancestor`): 0 of 48 under 4.5 |
| FL-15 (M-3 dark) | `plant-darkperim` (the light scalars) | perimeter **2.78-2.88**; 8/16 ladder rows and 1/3 Dialog rows under 3.0 in every dark cell |
| FL-16 (the escape) | `D3-Ap-probe.mjs` `class-l1` (20:28, load 54) | `class` paints the escape `#fef7f1` / `#352a22` in every cell. `mode` (the dead attribute) paints the default exactly (ΔE 0.0000). `class-l1` paints the default plate, ΔE 0.0030-0.1025 from the escape |
| the H3-11 unit arm | `isolation` removed from `@utility glass-plate`; H3 §6's `z-index` on a static host | "forms no stacking context: a held rung's carriers escape it" (red); the template-host leg reds H3 §6's plant |
| "PAIRS the two axes" | a floating ink under the quiet kernel | red (§1) |
| M-1, M-9, M-6 signed | H3's plants | H3.md §2.1; floor v2 changes no witness |
| N-3 | `diag-held-noveil` | §3: attribution, not a plant |

## 6 · O-87, judged from the census and the frames

| item | reading |
|---|---|
| blur | 6 / 10 / 12 / 16 / 18 px, each 4 px under 10.1.0, strictly ascending; `lighting-census.mjs` (W-0.11 appendix A): `blur=0` |
| added lighting | none. Floor v2 removes the dock's private re-compositions (FL-9) and moves one veil below content (FL-14); it adds no layer, shadow, gleam or shimmer |
| **inherited, open** | `LIGHTING-CENSUS stacked=2 halo=2 blur=0 open=4`: `--shadow-modal` stacks the offset stamp and a soft cast (`shadow.css:17`, `dark-arm.css:233`); `--shadow-dock` / `-collapsed` are zero-offset glows (`shadow.css:34-35`). The dark dock frame (`glance-fv2/glance-chromium-dark-dock-base-vs-fv2.png`) shows the glow around the pill on HEAD and floor v2 alike. These are W-0.11's token rows, whose values D3's converged spec names; the floor does not touch them. Which layer `--shadow-modal` keeps is a design choice the next agglomeration owns: the dark soft cast is `--foreground` at 18%, a light cast in dark |
| frames | `glance-fv2/` (H-13; `glance.mjs --require-delta`, PASS 8/8 pairs in Chromium and in Playwright WebKit, 20:25-20:28, load 58.6). Light: cream cards on the aurora; wash, quiet and resting cannot be told apart; the story's deep-canvas section reads grey (Q-11). Dark: warm brown cards; dock `#2f261f`, muted `#c3b9ac` 7.66. Story deltas: Chromium dark 28.71%, Playwright WebKit dark 26.60% |

## 7 · Toolchain (worktree; cacheDir `.vite-fv2`, `.vite-fv2-demo`)

| step | command | result | load |
|---|---|---|---|
| typecheck app | `vue-tsc --noEmit` | exit 0 (both runs; second after the final source edit) | 40-46 |
| typecheck tests | `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 (both runs) | 40-46 |
| library build | `vite build --config vite.fv2.config.ts` (the repo config, `cacheDir: ".vite-fv2"`) | exit 0, 16.4 s | 35-37 |
| `dist-demo` | `vite build --config vite.fv2-demo.config.ts` (`demo/vite.demo-dist.config.ts`, own cacheDir) | exit 0 | 34 |
| full units, before `dist-demo` | `vitest run --testTimeout 240000` | 2313 passed, 5 failed: `boot-graph` ×3 (no `dist-demo`); the vacuous "PAIRS" arm (§1); `menu/contract` "restores focus on execute" (a 30 ms focus wait). The last re-ran alone twice, 12/12 both times: NOT-REPRODUCED (load 37-50) | 41-50 |
| full units, final tree | the same | **237 files, 2318 passed, 10 expected-fail, 1 skipped, 0 failed** (39 s) | 34-61 |
| package verifier | `node scripts/verify-export-types.mjs` | **`G-BUNDLE-RATCHET` shrink 2,900,254 < 2,919,057** (−18,803 B: the sampler, `backdropMode`) | 37 |
| verifier, every later leg | the same with `.bundle-ratchet` set to the candidate in the worktree only, then restored (not in the patch) | `terminal: CLEAN`; claims 193, declarations 454, css 124; roster PRESENT 289 = 289; install exit 0; type resolution exit 0 | 37 |

**The bundle datum.** Unpacked content 2,900,254 B on the final tree (A′'s was 2,900,235; this seat adds +19 B: one `isolation` declaration and the overlay radius). A deliberate rebind from a committed-tree build at landing is owed. The `.published-roster` diff is empty; `DockBackdropMode` leaves the `./dock` subpath's types only.

## 8 · MIGRATION rows (for the cut that lands floor v2)

Every row breaks against the published 10.1.0. These are the floor's and A′'s rows (Ap-spec §6), re-stated for floor v2, plus this seat's two. This file is their source of record until they are pasted into `MIGRATION.md` at the cut.

_`GlassDock`'s `backgroundCanvas` prop leaves (FL-1)_

The dock no longer samples its backdrop, so it needs no canvas. Delete the binding (`:background-canvas="…"`); it is now a type error. `--glass-backdrop-luma`, the `--glass-backdrop` bucket and `data-glass-field-canvas` leave with it, and a selector or read on any of them finds nothing.

_`GlassDock`'s `backdropMode` prop leaves (FL-16)_

`backdropMode`, the `DockBackdropMode` type (`@mkbabb/glass-ui/dock`) and the `data-backdrop-mode` attribute are removed. The dock paints the chrome bound, legible over any backdrop. `backdrop-mode="opaque"` → `class="glass-opaque"` (the level-0 escape, the same solid `--card` plate); `backdrop-mode="live"` → omit it. A selector on `[data-backdrop-mode]` matches nothing.

_The glass plate is `--card` at the computed bound (FL-3..FL-5, FL-8)_

`--glass-veil-*` rungs are `--glass-bound` plus whole steps of `(1 − bound)/3`, and the Dialog is α 1. `--glass-bound` is a registered `<number>` computed from `--on-glass-muted-l`, `--card-l` and `--glass-ink-target`. An override of a rung's α should retune the ink or the target instead; a literal α under the bound gives up the any-input legibility. The light `--card` is `#fef7f1` (`--card-l: 0.9799`), the dark `#352a22`. `--input-on-glass` leaves; the field well is `--glass-well`.

_State fills read the ink, not the plate (FL-6)_

Hover, active, selected, checked and menu-row fills read `--fill-hover` / `--fill-selected`, and the focus veil reads the scrim ink. A consumer that painted state from `--glass-plate-*` moves to the fill register. `--glass-plate-*` remains a paintable plate colour.

_The dark arm declares the stroke rungs (FL-15)_

`.dark` declares `--ink-perimeter: 0.60`, `--ink-edge: 0.1846`, `--ink-seam: 0.0923`. A dark focus ring or control edge reads about 3.3:1 against 2.8:1. A consumer that set `--ink-perimeter` on `:root` and relied on it reaching `.dark` re-declares it under `.dark`.

_A held plate keeps its veil on the grasp carriers, and every plate is a stacking context (FL-14)_

While `.glass-grasp-carrier[data-grasp="grasp"]` is mounted, the plate paints no background and the carriers paint its veil below its content. Every element that composes `@utility glass-plate` (every `.glass-*` rung) declares `isolation: isolate`. A child's `mix-blend-mode` no longer blends through a plate into what is behind it, and a descendant's negative `z-index` stays inside the plate. A host whose layout needs the carriers above its content is no longer supported.

_The blur ladder (value change, CHANGELOG)_

`--glass-blur-{wash,quiet,resting,floating,overlay}-radius`: 10/14/16/20/22 → 6/10/12/16/18 px. The deep tier follows: 7.75/11.75/13.75/19.5/23 px. No name changes.

**FL-13 consumer addenda** (E-6, each consumer's tranche; unchanged from FLOOR §1 and Ap-proto §2 item 7, re-checked against floor v2):
- chicago: delete `max(var(--glass-veil-dock), 0.62)` (`style.css:139-141`, a no-op at the bound) and the count's `opacity: 0.6` (`style.css:102-105`).
- keyframes: delete `:background-canvas` (`ChromeDock.vue:370`, a type error) and the dead tint-AA reclaim (`style.css:264-280`).
- fourier: retire `.glass-opaque` on the Configurator (`VisualizationView.vue:302`); floating now paints `#fef7f2`. fourier's `isolate` app root is unaffected: plates isolate themselves now.
- value.js: replace `PRODUCER_VEIL` with the card pole at the bound and repin `CARD_L`; it binds neither `backdropMode` nor `--ink-perimeter`. THE STOP is cleared on any material (`certify()` bisects). Unmeasured here: the sibling is read-only, with a live session.
- A consumer that bound `backdrop-mode` moves to `class="glass-opaque"`; the spec's census found none.

## 9 · What stays open after floor v2 (P2-6.3)

| row | reading | owner |
|---|---|---|
| core 9 · M-6 | dark adjacency 3/26 (0.004-0.007); light struck under Q-1 (a) | owner, Q-1; N-1 builds the ruling |
| core 3 · M-1x, core 23 · gestalt | 48/66 grey off paper; the deep canvas `#e3e3e3` C 0.000 | owner, Q-11 (and Q-3); N-2 |
| core 7 · M-4 signed | the dark capsule's `-strong` muted at +0.067. HEAD's row, untouched by any FL row. Its cure is a dark `--muted-foreground-strong` at ≥ 0.08 below fg, or the capsule re-pointed to the plain muted at the bound. Unbuilt here: a token value outside the floor's rows | next seat / agglomeration |
| core 12 · M-9 dark veil | +0.006 over paper; FL-6's one scrim declaration does not dim dark paper | next seat / agglomeration (D5 shares the veil) |
| core 15-16 · O-66 G2, G3 | G2 light worsens on paper (0.028 → 0.057; the pane improves 0.192 → 0.057): the trigger paints the card pole, the Input the well toned 8% toward fg. G3: the row darkens 0.033 with no tint. W-0.1 names both choices as the converged spec's | the minor split (P2-6.2 step 3) and the spec |
| core 22 · O-87 | the inherited modal stack and dock glow (§6) | W-0.11's token rows via D3's spec |
| N-3 | **attributed** to the focus veil (§3) | — (closed by attribution; the veil's frost over its own host's chrome is D5's) |
| N-4 | the minor-split build, unmeasured | P2-6.2 step 3 |
| Safari | every cell UNMEASURED (owner's safaridriver checkbox) | owner action |

## 10 · Reproduce

```sh
B=.claude/worktrees/bl/D3/p3/floor2; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-3
git worktree add --detach $B/wt HEAD && ln -s $PWD/node_modules $B/wt/node_modules
git -C $B/wt apply $PWD/$P/floor-v2.patch
export D3_OUT=$PWD/$B/out
node $H/run.mjs $B/wt --label fv2 --demo && node $H/baseline.mjs $D3_OUT/caps/fv2 --out $D3_OUT/baseline-fv2.json
node $P/FV2-plants.mjs $D3_OUT/builds/fv2/dist $B/wt --out $D3_OUT/plants      # then each witness with --cells on the plant's cells
node $P/FV2-halo-probe.mjs $D3_OUT/builds/fv2/dist
node docs/tranches/BL/design/material/pass-2/D3-Ap-probe.mjs $B/wt --out $D3_OUT/ap-probe
node $H/glance.mjs --base <head build>/dist --route $D3_OUT/builds/fv2/dist --story-base <head build>/demo \
  --story-route $D3_OUT/builds/fv2/demo --out $D3_OUT/glance --name fv2 --require-delta [--engine webkit]
git worktree remove --force $B/wt
```
