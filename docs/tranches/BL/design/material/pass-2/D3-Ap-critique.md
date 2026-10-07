# D3 · pass 2 · A′ critique: the bound, nothing added

| field | value |
|---|---|
| seat | D3 pass 2, adversarial critic of route A′ (the null route). Did not author it. Judges against REGISTRY §7.5 only |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree cut at the checkout's HEAD `790ffd1e` (`git diff --stat 020f6586 790ffd1e -- src demo tests package.json` is empty), `floor.patch` applied clean, then `D3-Ap-proto.patch` applied clean (74 paths changed). The worktree is removed |
| engines | Chromium 149 (the gate) and **Playwright WebKit 26.5** (paint-only, no `backdrop-filter`; dock rows `webkit+shim`, H-14). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 21-139 for the whole seat (other sessions). Load is beside every run in §6. No cell timed out, no motion window fell under its frame minimum, and no janky cell appeared, so nothing needed the twice-repeat rule |
| fences | no source edit, no git write in the checkout. Writes: this file and `D3-Ap-crit-probe.mjs` (the critic's probes). Builds, captures and the worktree lived in scratch |

## 0 · Verdict

**ADVANCE**, as the null route. **Convergence 35 / 38 = 0.92** (§2).

Every number the prototype reports that a checklist row rests on reproduced on my own build, to the row: the whole-run Chromium verdicts, the per-engine table, the T table, the M-9 fills, the escape probe and every plant (§1). Three rows do not pass:

1. **M-6 dark adjacency, 3/26 red**, and it is structural. Q-1's pass-2 default (a) strikes only the *light* adjacency. I halved the step count (`--glass-veil-step: (1 − bound)/2`, resting goes opaque) and quiet→resting still reads ΔE 0.008 against the 0.01 gate. Under the bound, the whole dark span from wash to opaque is ΔE 0.132 → 0.150 off the page, which is too little room for three levels 0.01 apart. A′ cannot close it inside its centre, so it goes to the owner as Q-1 (c) extended to dark. That is the prototype's own reading, now proved.
2. **The owner-glance gestalt fails O-62 off paper.** The light plate at the bound reads grey wherever the ground is dark. Over black it is `#e2dcd7` (L 0.898, C 0.009), ΔE **0.027 from HEAD's rejected grey `#d7d4ce`** and 0.088 from paper. In the glass-material story's "the bound" section, over the deep canvas (`#193b59`), both plates read **`#e3e3e3`, C 0.000**: a neutral grey, on the story that demonstrates the bound. M-1 reads paper only, so it stays green. The rest of the gestalt (cards, not glass) is the prototype's own Q-3 statement and is not counted twice.
3. **FL-12: one stale present-tense claim in a file the route touched.** `glass/control-bit.css:119` still says "The perimeter rung is 0.48, the floor itself". Ten composite figures follow that were computed at 0.48. The route edited the first line of this comment block (`:110-111`) but not this sentence, and the rung is now 0.52 in light and 0.60 in dark.

Why not BANK or BLOCK: the battery is green bar M-6, and every green turns red on its plant. Both structural gaps are owner rulings the registry already names (Q-1, Q-3), and A′ is the null route by charter: it ships if nothing better converges. The prose gap is one sentence. Convergence is not contemplated before pass 3 (§7.5).

**The prototype's one open question is closed here** (§3.1). The held dock's 0.025 painted-α residual is geometry. The plate itself paints exactly the bound composite: `#e2dcd7` / `#fdf7f2` at x 150, the same composite as `wash-held`, α 0.894. The witness's sample rect (x 278-412) runs into the halo of the held Slider's lifted range, which smears the ground into the dock's right half. FL-7 holds in paint.

## 1 · Re-run: every number that matters

### 1.1 · The full H2 battery on HEAD+floor+A′

`run.mjs <wt> --label apc --demo`, 13:05:45-13:26:58, load 46 → 22-64. Whole-run Chromium verdicts, printed by `run.mjs`:

RAW PASS 44 · M-1 PASS 11 · M-2 PASS 794 · M-2m PASS 296 · M-3 PASS 354 · M-4 PASS 154 · M-5 PASS 20 · **M-6 FAIL 7/30** · M-7 PASS 8 · M-8 PASS 8 · M-9 PASS 18 · W-A PASS 192 · W-G FAIL 28/40 · T reported. W-B 12/16, W-C 235/320, W-D 4/9, W-E 20/370 and W-F 70/160 belong to banked or retired families. These are identical to D3-Ap-proto §4.

`baseline.mjs` (13:27-13:31, load 59-64):

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| RAW | PASS 22 | PASS 22 | PASS 22 | PASS 22 |
| M-1 | PASS 11 | — | PASS 11 | — |
| M-2 | PASS 397 | PASS 397 | PASS 397 | PASS 397 |
| M-2m | PASS 148 | PASS 148 | PASS 148 | PASS 148 |
| M-3 | PASS 177 | PASS 177 | FAIL 2/177 | PASS 177 |
| M-4 | PASS 77 | PASS 77 | PASS 77 | PASS 77 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 |
| M-6 | FAIL 4/4 | FAIL 3/26 | FAIL 4/4 | FAIL 3/26 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 |
| M-9 | PASS 10 | PASS 8 | PASS 10 | PASS 8 |
| W-A | PASS 96 | PASS 96 | PASS 96 | PASS 96 |
| W-G | FAIL 12/20 | FAIL 16/20 | FAIL 16/20 | FAIL 20/20 |
| T | reported | reported | reported | reported |

Readings beside the verdicts, all from this run:
- **M-2 lowest.** Chromium 4.83 (light dock muted and muted-tab over black, and the hostile popover muted). Playwright WebKit 4.57 (light checker: floating, popover and wash muted), then 4.62 (light black floating and the held wash and floating).
- **M-6 dark over paper.** Adjacent ΔE: wash→quiet 0.007, quiet→resting 0.004, resting→floating 0.011, floating→overlay 0.007. Every dark plate sits ΔL +0.131 to +0.149 above the page, so H-9's sign is green.
- **M-9 dark over paper**, Chromium. Active ΔE 0.096, hover 0.042, checked 0.335, selected 0.227. The focus veil reads ΔL **+0.006**: information only, but it does not dim (§4).
- **T** (Chromium, light / dark). Wash, floating, dock and popover: 0.110 / 0.125. Quiet and overlay: 0.075 / 0.086. Resting and card: 0.035 / 0.043. The dialog rung, the real Dialog and the escape: 0. T_c1 reaches 0.139 in light and 0.144 in dark.

### 1.2 · The plants, re-captured over my A′ build

`D3-Ap-plants.mjs <apc dist> <wt>`, 13:32-13:45, load 55 → 139 → 88. M-2 and M-3 are read with `--gate chromium,webkit`. The MISSING rows a plant does not capture are ignored.

| green | plant | red I measured | reproduces the prototype |
|---|---|---|---|
| M-2, W-A legs 2-3 | `plant-bound` (`--glass-bound: 0.25`) | light black 23/37, light c1 11/37, dark white 25/37, dark c1 14/37 in Chromium; Playwright WebKit the same except light c1 13/37 | yes |
| item 5 | `plant-margin` (target 4.5) | Playwright WebKit light black 5/37; every Chromium cell green | yes |
| H-5, FL-7 | `plant-heldfloor` | light black 5/12, light c1 4/12, dark white 7/12, dark c1 4/12, in both engines | yes |
| H-5, item 2's cure | `plant-carrierveil` | Chromium 8-10/12 in every held cell; dock-held muted-tab **4.46** (light black). Playwright WebKit 0/12 in every cell: it paints no `backdrop-filter`, so the cure's claim is Chromium's | yes |
| M-3 dark, item 3 | `plant-darkperim` | 8/16 ladder rows and 1/3 Dialog rows under 3.0 in every dark cell; perimeter 2.78-2.88 Chromium, 2.81-2.92 Playwright WebKit | yes |
| stacking precondition | `risk-opaque-ancestor` | light 6/12, dark 4/12, both engines | yes |
| item 4 | `D3-Ap-probe.mjs` `class-l1` (13:49, load 48-71) | the escape class at level 1 paints the bound plate, ΔE 0.0030-0.1025 from `class`; `mode` paints `default` exactly (0.0000) | yes |
| M-1, M-9 | H2's plants | not re-run; H2 §2.1 is their record, and A′ does not touch them | — |

**Every green A′ claims turns red when its mechanism is removed.**

## 2 · The §7.5 checklist

Chromium gated, WebKit informational. Real Safari is UNMEASURED in every row (owner's safaridriver checkbox) and is not counted. 38 rows; 35 pass.

| # | row | status | evidence |
|---|---|---|---|
| 1 | M-1 (H-1 RAW clean) | PASS | 11/11 both engines; plant H2 §2.1 |
| 2 | M-2 (H-5 held, H-8 R 3, H-10 hostile) | PASS | 794 Cr; WK 794; `plant-bound`, `plant-heldfloor`, `plant-carrierveil` red |
| 3 | M-2m (H-11) | PASS | 296 Cr, 296 WK |
| 4 | M-3 | PASS (Cr) | 354; WK light 2/177 checker ring 2.83, informational; `plant-darkperim` red |
| 5 | M-4 (H-2, H-7) | PASS | 154 |
| 6 | M-5 (H-3) | PASS | 20 |
| 7 | **M-6 (H-9)** | **FAIL** | dark adjacency 3/26 (0.004-0.007); structural (§3.2). Light 4/4 struck by Q-1 (a) |
| 8 | M-7 | PASS | 8 |
| 9 | M-8 | PASS (Cr) | 8; WK dark floating bleed 1.26, informational |
| 10 | M-9 (H-6) | PASS | 18 |
| 11 | T (H-12), reported | PASS | §1.1 |
| 12 | W-A, the route's witness (H-4) | PASS | 192; `plant-bound` reds legs 2-3 |
| 13-24 | FL-1..FL-11, FL-13 (12 rows) | PASS | FL-1 residue grep clean in `src`, `demo`, `tests` (the hits are `aurora/runtime.ts`'s own WebGL option, unrelated `contrast-color()` uses, and assertions of absence). FL-7 in paint: §3.1. FL-13 text stated, landing is the consumers' |
| 25 | **FL-12** | **FAIL** | `glass/control-bit.css:119`, stale present tense in a touched file |
| 26-32 | A′ items 1-7 | PASS | 1: T, the glance and the glass-and-engagement statement are given. 2: H-5 green, plants red, residual explained (§3.1). 3: M-3 dark 177/177 at 0.60. 4: deleted, probe re-run. 5: WK M-2 ≥ 4.57. 6: signed M-6 green; W-G red rows read as Q-4. 7: stated |
| 33-37 | every route: floor built; both engines under H2; WK dock `+shim`; a plant per green; prose sweep (counted in FL-12) | PASS | §1 |
| 38 | **owner-glance gestalt vs D-1..D-3, with the O-62 frame** | **FAIL** | §3.3 |

## 3 · Findings

### 3.1 · The held dock's residual α is geometry, not a thin plate (closes D3-Ap-proto §2 item 2's open question)

`D3-Ap-crit-probe.mjs held <capdir>` reproduces the residual: Chromium dock-held α 0.866 light and 0.852 dark, against bounds 0.891 / 0.873, while `wash-held` and `floating-held` read 0.894 / 0.878.

The pixels of the held cell's `noink` capture, at y 330 (Chromium):

| cell | x 150 | x 345 | x 410 | x 560 |
|---|---|---|---|---|
| light black | `(226,220,215)` = `#e2dcd7` | 218,211,206 | 196,187,180 | 141,136,131 |
| light white | `(253,247,242)` = `#fdf7f2` | 248,242,237 | 235,226,219 | 229,222,219 |

At x 150 the dock paints exactly the bound composite: the same colours as `wash-held`, α 0.894. From x ≈ 340 the halo of the held Slider (its range lifts above the dock) smears the ground into the dock's right half. The witness's sample rect `[278, 311, 134, 34]` runs into that halo.

The same halo is on the floor (`plant-carrierveil`: 130,122,115 at x 560, light black) and under `plant-heldfloor`, so it predates A′.

A further plant, `crit-held-nofill` (the fill-register tokens zeroed in the dock cell), left the reading unchanged (0.866 / 0.852), which rules out a state fill. **FL-7 holds in paint.** The halo is a defect class for the next pass (§4).

### 3.2 · M-6 dark cannot pass under the bound (the gap is structural)

`crit-step-half` (`:root, .dark { --glass-veil-step: calc((1 − var(--glass-bound)) / 2) }`, Chromium, paper, 13:47, load 48-75), dark adjacency:
- wash→quiet 0.011;
- quiet→resting **0.008 ✗**;
- resting→floating 0.019;
- floating→overlay 0.011.

This is still 5/30 red overall (the light rows are struck). Resting is now opaque, so no thicker step exists. Measured off the page, the plates span only ΔE 0.132 (the bound) to 0.150 (opaque), and three levels need at least 0.02 of span. **To the owner as Q-1 (c) extended to dark:** content, chrome and the room. A′ cannot close it, and no critic plant can be written for a row that cannot go green.

### 3.3 · The light veil reads grey off paper (O-62), and M-1 is blind to it

Composites at the bound, light theme (`D3-Ap-crit-probe.mjs grounds` over my run):

| ground | wash, floating, dock, popover | L | C | ΔE to HEAD grey `#d7d4ce` | ΔE to paper |
|---|---|---:|---:|---:|---:|
| paper | `#fef7f2` | 0.980 | 0.010 | 0.109 | 0.010 |
| black | `#e2dcd7` | 0.898 | 0.009 | **0.027** | 0.088 |
| checker | `#f0eae5` | 0.940 | 0.009 | 0.070 | 0.045 |
| story deep canvas `#193b59` | `#e3e3e3` | 0.916 | **0.000** | 0.046 | 0.070 |

Both engines agree to the third place. The story numbers come from `D3-Ap-crit-probe.mjs story`, Chromium, 13:31, load 56: 4 frames per theme, two of them over the deep phase. The computed background is `color(srgb 0.996 0.969 0.945 / 0.891)`, the bound exactly, so the paint is correct to spec.

The grey is what the bound composes to over a dark ground. Blue cancels the pole's warmth, and the 0.11 that transmits pulls L down to 0.90-0.92.

The owner frame for this pass is "the light veil must not read grey". Over a black or deep ground, the A′ plate sits closer to the grey the owner rejected than to paper, and on the library's own story it is a chroma-0 grey. M-1 gates paper only, so this is a gestalt failure today and a battery gap for the next pass (§4).

The rest of the gestalt, read from `glance-D3-Ap/` (`glance.mjs` was not re-run, since the T and composite numbers above re-measure what it reads):
- **Light:** cream cards on the aurora. Wash, quiet and resting cannot be told apart, and the dock is a near-white pill with a grey active pill.
- **Dark:** warm brown cards lifted off the page. The aurora shows around them, not through them.
- **Engagement:** D-1 holds in motion (M-2m 296/296; the dock's spring morph and the grasp dilation are intact), and D-2 holds in M-9's fills. The one engagement miss is the dark focus veil over paper, ΔL +0.006 (§4).

A′ adds no lighting, so O-87 is met.

### 3.4 · What A′ claims, checked rather than taken

- **The cure's scope.** The `@utility glass-plate` nesting, not a global `:has()`, is right: `.slider-range` is a carrier host but not a plate (`Slider.vue:345-351`), and the global form would strip its fill.
- **Release order.** The rest carrier steps to opacity 1 on the release frame, and only then does the grasp carrier fade (`grasp.css:194-205`). So while both carriers carry the veil, the composite is thicker than α, never thinner, as the prototype says. H-5 does not measure it (§4).
- **The stacking arm** in `glass-subtlety.test.ts:1100-1113` accepts any `z-index` digit on a plate host. A `z-index` on a non-positioned, non-flex-item host forms no stacking context, so the arm can pass a host that still drops its held veil behind an opaque ancestor. `.dock-plate` is absolute, so no shipped host is affected (§4).

## 4 · Next pass (new defect classes; no checklist rows added)

1. **M-1 is paper-only.** The light veil's grey over black or deep grounds (`#e2dcd7`, `#e3e3e3` C 0.000) has no witness. A no-grey reading over dark grounds belongs in pass 3's checklist.
2. **The held Slider's halo inside the dock.** The lifted range smears the ground across the dock's right half while held (light over black: down to 141,136,131 at x 560). No witness reads a held host's non-glyph paint, and W-A's held sample overlaps it. This predates A′.
3. **The release window** (both carriers veiled, then the unmount) is unmeasured: H-5 reads the hold only.
4. **The stacking-context unit arm** accepts `z-index` on a host that forms no stacking context.
5. **The dark focus veil over paper does not dim** (ΔL +0.006 Chromium, +0.009 Playwright WebKit). M-9 gates the veil in light only.

## 5 · What would change the verdict

- The owner rules Q-1 (c) for both themes, or strikes dark adjacency. Row 7 then reads against three materials, and A′ is ready to build it (delete the step arithmetic, `glass.css:273-285`).
- The owner rules on Q-3 and O-62 off paper. If grey over dark grounds is acceptable for chrome at the bound, row 38 passes on D-1..D-3 as measured. If not, A′ is dominated by any route that holds the battery and does not grey there (G's luminosity pole is the named candidate).
- One sentence fixed at `control-bit.css:119` closes row 25.

## 6 · Records

| run | command | time | load |
|---|---|---|---|
| full H2 battery, A′ | `D3_OUT=<s>/out node harness/run.mjs <wt> --label apc --demo` | 13:05:45-13:26:58 | 46 → 22-64 |
| per-engine table | `harness/baseline.mjs <s>/out/caps/apc` | 13:27-13:31 | 59-64 |
| story bound plates | `pass-2/D3-Ap-crit-probe.mjs story <apc demo> --frames 4` | 13:31 | 56 |
| ground composites | `pass-2/D3-Ap-crit-probe.mjs grounds <s>/out/caps/apc` | 13:31 | 56 (no browser) |
| plants | `pass-2/D3-Ap-plants.mjs <apc dist> <wt> --only plant-bound,plant-margin,plant-heldfloor,plant-carrierveil,plant-darkperim,risk-opaque-ancestor` | 13:32-13:45 | 55 → 139 → 88 |
| held fill check | `pass-2/D3-Ap-crit-probe.mjs variant … held-nofill`, then `held` | 13:46 | 73-84 |
| half-step M-6 | `pass-2/D3-Ap-crit-probe.mjs variant … step-half`, then `harness/m6-separable-ladder.mjs` | 13:47 | 48-75 |
| escape probe | `pass-2/D3-Ap-probe.mjs <wt>` | 13:49 | 48-71 |
| held geometry | `noink` pixels of the held cells, apc, `plant-carrierveil`, `plant-heldfloor` | 13:48 | — |

The worktree at `<scratch>/D3/p2/D3-Ap-crit/wt` was removed with `git worktree remove --force`. Captures stay in scratch.
