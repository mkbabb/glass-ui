# D3 · pass 1 · D3-D · critique (the calibrated ladder)

| field | value |
|---|---|
| seat | D3 pass 1, adversarial CRITIC for family D3-D. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the worktree was cut at `dabfc26f`. `git diff --stat 76f4209a HEAD -- src` is empty, so this measures the prototype's own base |
| patch | `pass-1/D3-D-proto.patch`, sha256 `b28ee5e5…6d0594d65`. `git apply --check` and `git apply` were clean. The 74-PNG corpus was copied from the prototype's scratch (`D3-D-proto/corpus/`) into `scripts/glass-solve/corpus/` |
| instruments | The shared battery (`harness/run.mjs`, `capture.mjs --inject`, each witness script). Headless Chromium 149.0.7827.55 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5, with Playwright imported from `glass-ui/node_modules/playwright`. No browser MCP. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox). Gestalt: the prototype's 64 before/after demo captures, which I read myself, plus my own crops and pixel reads of them (PIL) |
| load | load averages 13-20. The battery captured 68 cells and 8 live windows in 601.1 s. The one full `emit.mjs` I ran rendered 840 backdrops in 118.0 s |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-D-crit/` (written `…/` below). Base capture: `…/out/caps/crit` (logs in `results/`). Each plant: `…/out/caps/p-<name>`, a copy of the base capture with only the planted cells re-captured through `--inject …/plants/<name>.css`. Witness outputs: `…/plants/<name>.out`. Crops: `…/gestalt/rimtiles-{light,dark}.png` |
| fences | Source was built only in my worktree. `node_modules` was a real directory of per-entry symlinks, so vite's temp files stayed in the worktree. vitest and typecheck were **not** re-run, so the unit figures are cited from `D3-D-proto.md` §1 and are unverified here. The worktree was removed with `git worktree remove --force`, and `git worktree list` shows no entry. The only write to the checkout is this file |

## 1 · Before reading the family: what a material design will try to hide

Written from `PORTFOLIO.md` §0-2 and §7 and `HARNESS.md` alone, before opening SPECS D3-D, `D3-D.md` or the prototype.

1. **Legibility bought with alpha, then relabelled.** §2.1 fixes the composite band: L ≥ 0.876 under light muted ink, and L ≤ 0.41-0.52 under dark ink. A design that clears it over the ceiling-1 field, black and white has made the plate near-opaque. It will call the layer "solved", "calibrated" or "a frost", and M-1 stays green because M-1 reads only over paper.
2. **Teaching to the test.** A design fitted to the battery's thresholds turns every blind spot of the battery into a property of the design. The battery reads ΔE with no direction (M-6), reads only the rest state, and reads only the specimen set.
3. **States the battery never renders.** Held and grasp states, a collapsed dock, hover, sheet detents, and any consumer paint layered on a rung. Each ships a veil the battery never sees.
4. **Dark asymmetry.** HEAD's dark ladder is one colour (§1.2). The cheapest way to separate it is to push plates away from the page in whichever direction is cheapest. Downward reads as holes, not lift.
5. **A gate that grades its own author.** A "the tokens are the output" witness is only as strong as what binds the tokens to the output. Expect the binding to be something the artefact asserts about itself.
6. **The load-bearing step deferred.** Expect the hard parts to be named and not run: the band table, a second engine, and states outside the corpus.
7. **S-7.** Light M-1 × M-6 will be cited as a battery conflict, and the flat light ladder left unexamined as a design fact.
8. **Consumer paints tuned to the old ink veil.** A white pole inverts every `color-mix` "dim" that assumed a dark veil.

All eight appeared (§3-§5).

## 2 · The battery, re-run independently

`D3_OUT=…/out node harness/run.mjs …/wt --label crit` (Chromium gate). Logs are in `…/out/caps/crit/results/`.

| witness | prototype claim (`D3-D-proto.md` §3) | my run | agreement |
|---|---|---|---|
| M-1 | FAIL 1/11 (the `--card` escape) | FAIL 1/11. Solved plates `#fdfdf9`-`#fffffb` (L 0.993-0.999, C 0.0053). The real Dialog `#fafaf6` (ΔE 0.003). Opaque `#fdf5ec` L 0.974 ✗ | exact |
| M-2 | PASS 560; binding 4.65 | PASS 560. Binding cell: light wash muted 4.65 over black and over the checker. Dark wash muted 6.12 over white | exact |
| M-3 | PASS 266 | PASS 266 | exact |
| M-4 | PASS 14; ΔL_OK 0.100 | PASS 14. Light fg `#1c1917`, muted `#422d17`, ΔL_OK 0.100. Dark 0.101 | exact |
| M-5 | PASS 16 | PASS 16 | exact |
| M-6 | FAIL 4/19 (light) | FAIL 4/19. Light adjacency 0.000 / 0.000 / 0.003 / 0.000. Dark adjacency 0.016 / 0.017 / 0.030 / 0.046; page ΔE 0.058+ | exact |
| M-7 | PASS 8 (18/17 px) | PASS 8 | exact |
| M-8 | PASS 8; bleed 1.21 | PASS 8. Light floating and overlay bleed 1.21, C 0.0174; dock 1.20 | exact |
| W-D | FAIL 4/9; leg 1 byte-identical | FAIL 4/9; leg 1 `node scripts/glass-solve/emit.mjs`: byte-identical | exact |
| W-A · W-B · W-C · W-E · W-F | 20 / 16 / 299 / 20 / 66 | 20 / 16 / 299 / 20 / 66 | exact |

**Playwright WebKit** (paint-only, informational):
- M-2 FAIL 8/532: light wash muted 4.48 over black and 4.45 over the checker.
- M-8 FAIL 2/8: floating and overlay bleed 1.34.
- M-1 and M-6 FAIL for the Chromium reasons.
- M-3 and M-7 PASS.
- Every dock row is UNMEASURED (Playwright WebKit crashes on `GlassDock`).
- Real Safari: UNMEASURED (owner's safaridriver checkbox).

**Painted α equals the token** (W-A and W-E read it from paint):
- light 0.608 ×4, 0.729 ×2, dialog rung 0.937, dock 0.804;
- dark 0.753 / 0.851 / 0.945 / 0.953 / 0.957, dock 0.824.

So the solved paint path is live, not a dead primary behind a fallback. W-A's own per-band bound for light content reads 0.190-0.245, against the painted 0.608 (`W-A.log`).

## 3 · Plants: every witness the prototype claims green, made to fail

| plant (`…/plants/`) | witness | verdict | failing row it prints |
|---|---|---|---|
| `m1-grey.css`: light `--glass-veil-pole: rgb(215 212 206)` | M-1 | FAIL 11/11 | `wash #e5e3de L 0.916 C 0.0071 ΔE 0.069 ✗`; `floating #e1dfd9 L 0.903 … ΔE 0.082 ✗` |
| `held.css`: every rung at `--glass-veil-rung: calc(var(--glass-veil-rest) * 0.6)`, **the rule `glass/grasp.css:133` ships for a held plate** | M-2 | FAIL 35/560 | light black: wash fg **2.65**, muted **1.97** (15/36 under 4.5); dark white: wash fg **2.70**, muted **1.95** (16/36) |
| `m3-perim.css`: `--ink-perimeter: 0.48` (HEAD's value) | M-3 | FAIL 56/266 | light paper perimeter 2.79, ring 2.92; light black perimeter 1.28; dark perimeter 2.35 |
| `m4.css`: the dock's muted register pinned to fg | M-4 | FAIL 2/14 (paper cells re-captured) | `dock fg #1c1917 muted #1c1917 ΔL_OK 0.000 ✗` |
| `m5.css`: dock and collapsed tiers back to HEAD's (0.10/0.06 light, 0.14/0.10 dark) | M-5 | FAIL 3/16 | light c1 dock muted 4.11; dark c1 dock fg 3.84, muted 2.49 |
| `m7.css`: `contain: paint` on the content rungs | M-7 | FAIL 8/8 | reference 18 px, every host 2 px |
| `m8.css`: floating and overlay blur 0 px | M-8 | FAIL 2/8 | floating and overlay bleed 1.34 ✗ (Chromium now reads what Playwright WebKit paints) |
| **W-D leg 1, plant A:** a fake worktree whose `glass.solved.css` carries a hand-set floating α of **0.300**, with line 1 `/* solver: cp src/styles/tokens/glass.solved.css "$D3_SOLVE_OUT" */` | W-D leg 1 | **PASSES**: `solver \`cp …\`: byte-identical` | — (`…/out/caps/p-wd/results/W-D.json`) |
| **W-D leg 1, plant B:** `stages.json` `ink-perimeter` 0.82 → 0.48, and the committed file edited to match | W-D leg 1 | **PASSES**: a full `emit.mjs` re-run under the legitimate solver line wrote a file that `cmp` finds byte-identical to the hand-edited one | — (`…/emit-048.log`, `…/solved-0.48.css`) |

Seven of the eight M witnesses the prototype claims green catch their plant. **W-D leg 1 catches neither of its two plants.** The harness selftest's hand edit (HARNESS §4) was caught only because it left the solver line pointing at a real solver. W-D reads the command to run from the file under test, and `emit.mjs` reads its one indicator rung from a hand-written JSON file. Leg 2 (`wd-solved-tokens.mjs`) then grades whatever capture it is handed, never a build of the file leg 1 compared. The two legs never bind the same bytes.

## 4 · The checklist

| item | answer | evidence |
|---|---|---|
| **Vacuous convergence** | **Yes, in its central claim.** The solver's constraints are the battery's thresholds restated, each plus a margin. The M rows go green because the solver was written to invert them; that verifies the solver's model, not the design. Every design property the battery does not read is where the ladder fails: the direction of the dark lift, transmission, held and collapsed states, consumer paint on rungs, the focus veil (§5) | M-2 at 4.65 = `--target 4.65`. M-8 at 1.21 against `--bleed 1.20`. M-4 ΔL_OK 0.100 = `--dl 0.10` on the gate's 0.08. Dark page ΔE 0.058 = `0.05 + SEP − 0.01` (`solve.mjs`) |
| **Spec-cites-itself circularity** | **Yes, in W-D.** The artefact names its own check (line 1), and stage 2 is a number the artefact's generator reads from a hand file. The SPECS D.3 evidence is the research seat's run; I reproduced it exactly (§2), so the circularity is in the gate, not in the numbers | §3, W-D plants A and B |
| **Gates that cannot fail** | **W-D leg 1** cannot fail against a hand edit that is carried consistently (§3). **M-5's readback half** is structurally 0 once the sampler is deleted: a regression guard, not evidence of design. **W-D leg 2** cannot *pass* while it gates on an engine that paints no blur and crashes on the dock | §3; `W-D.log` |
| **Elegant-reduction trap** | **Four load-bearing steps read "and then the hard part".** (1) "Stage 2 renders the stage-1 build and solves `--ink-perimeter`": `emit.mjs` copies `STAGES["ink-perimeter"]` (0.82) from `stages.json`, whose provenance is a hand sweep "0.66/0.74/0.82 (p3/perim.log)". Nothing renders or solves at emit time. (2) The dialog α is not rendered: `dialogAlpha()` is flat-page arithmetic on hand-copied page and scrim colours. (3) The band table, "the family's largest lever", is deferred to the owner, and the as-written band yields near-opaque light glass. (4) The second gate engine is real Safari, UNMEASURED. `backdrops.mjs:4` also cites a `closure.mjs` that "re-checks against the real rung classes"; no such file exists in the patch | `emit.mjs` (`STAGES`, `dialogAlpha`); `stages.json`; `ls scripts/glass-solve/` |
| **Legacy aliases, shims or dual paths** | **Four residues.** `--glass-saturate: 1` is emitted beside six per-rung `--glass-saturate-*`, all `1` (P-3). `chassis`, `crown` and `sheet` are emitted as copies of wash, dialog and overlay (P-3). The dock's solved blur r is discarded, and the dock reads `--glass-blur-resting-radius`: the two agree (6 = 6) by coincidence of caps. `GlassDock`'s `backdropMode` keeps the value `"live"` (`GlassDock.vue:75`, README) for a sampler that no longer exists. Stale comment sites: the prototype names 8, and I found a 9th, `tokens/scale-paper.css:90` ("`--ink-perimeter` (0.48)") | `glass.solved.css`; `emit.mjs` `block()`; grep over the patched tree |
| **Masked fallbacks** | **One silent clamp.** `al = (id) => id === "dialog" ? dlg ?? 1 : …`: if no α satisfies the dialog model, the emitter writes 1 and the header does not say so. That contradicts "infeasibility is output; nothing clamps quietly". The veil primary itself is live in paint (§2), and the liveness check fails loud (it named the 4 blank blob frames) | `emit.mjs` `block()` |
| **Unverified gestalt** | **Read, and split by theme.** *Light:* the plates read as a light frost, not grey. The composite is L 0.993-0.999, but at C 0.0053 it is neutral white, not the cream of 7.0.0. Over the c1 aurora the field survives as a pale tint (T 0.39 content, 0.27 chrome). The light Dialog is a legible white card, the largest single win. It sits in a bright fog: the focus veil now brightens (confirmed in `pairs/dialog-1440-light-paper.png`). *Dark:* **fails.** Every rung is a black slab under the page (`#030202`-`#000000` against `#0b0a09`), the dock is a black pill, and only the opaque `--card` reads as lifted (`specimen/chromium-dark-paper-ladder.png`). iOS dark materials lift above their base; this ladder sinks. *Ink:* at 0.82 the perimeter draws near-black outlines around every light well, which reads as a sticker edge rather than material. The muted register sits on the M-4 floor (12.0:1 on paper against fg 16.2). *iOS-27 grade:* no. Transmission is lower than 7.0.0's at every content rung, which runs opposite to a clear, lensing glass | prototype's `gestalt/pairs/*`, `gestalt/specimen/*`; my crops |
| **Consumer-less substrate** | The solver and its 71 MB corpus have one consumer, the generated file, and that is appropriate. But **seven emitted saturate tokens encode one constant (1)**, and in light **11 veil tokens hold 4 distinct values** (wash = quiet = resting = chassis 0.607; floating = overlay = sheet 0.729). Light quiet and resting are byte-identical materials (α 0.607, r 6, s 1), so two public rungs have no distinguishing consumer-visible property | `glass.solved.css` |

## 5 · Named counterexamples

1. **The held plate ships under the solve.** `glass/grasp.css:133` paints `[data-held]` hosts at `0.6 × --glass-veil-rest`. Measured with that exact rule applied: light wash fg 2.65 and muted 1.97 over black; dark wash fg 2.70 and muted 1.95 over white; 35 of 560 rows fail (`…/plants/held.out`). The held state also runs `--glass-saturate-grasp: 1.75`, a hand token beside a solve that emits s = 1 to hold M-8's chroma. The solve covers the rest state only.
2. **A consumer `bg-*` utility replaces the solved veil, and nothing fails loud.** The library's own glass-material story paints its rim tiles as `glass-resting … bg-foreground/[0.18]` (`demo/stories/substrates/glass-material.vue:176`). The utility overrides the plate's `background`, so dark "resting" (solved at 0.945 α of black) paints `rgb(181 152 97)` under white ink: **2.21:1**, over the exact c1 aurora frame the solver calibrated against. In light the same tile is `rgb(204 175 120)`, a dim ochre (my pixel read of `chromium-after-material-1440-{dark,light}-aurora.png`).
3. **Dark plates sit below the page.** Wash `#030202`, quiet `#020101`, resting `#010100`, overlay `#000000`, against page `#0b0a09` (`M-6.log`). M-6 passes because it reads ΔE without a sign.
4. **The focus veil inverts.** `--glass-focus-veil-dim` is `color-mix(… var(--glass-plate-overlay) 50%, transparent)`. With a white pole it brightens under the scrim: rgb 180,174,169 inside against 137,127,118 outside (prototype probe; the bloom is visible in the pair I read). Consumers of `--glass-plate-floating` (`--control-checked-bg`, `--dock-control-active-bg`, `--dock-layer-switcher-active`, `components.css:22`) are unaudited.
5. **The collapsed dock is chrome painted at a content α.** `shell.css` lerps the plate from `--dock-plate-collapsed-tier: var(--glass-veil-wash)` (0.607, no M-8 term) to the dock tier (0.805). The battery mounts only `:collapse="false"` (`specimens.mjs:89`), so the default posture of every collapsible dock is unmeasured.
6. **Wash's "no blur" is a grid artefact, not a solve result.** Wash's F48 cap is 1 px, and `emit.mjs` passes `--radii 0,2,4,6,9`, so r 0 is the only admissible radius. The prototype reports it as "the solve's choice" (`D3-D-proto.md` §5 item 6).
7. **The margin does not buy the second engine.** In Playwright WebKit, M-2 reads 4.45-4.48 at the binding cells. Real Safari is UNMEASURED (owner's safaridriver checkbox).
8. **The light ladder is two paints and a dock.** The distinct light α are 0.607, 0.729, 0.805 and 0.937. Adjacency over paper is 0.000-0.003. S-7 proves no single-pole ladder does better, but the family's objective has no non-paint separation term (blur, rim, shadow), so hierarchy in light is left to hand-written layers the solve does not read.

## 6 · Verdict

**Convergence: 45%.** The machinery converged. The solve is deterministic (a second `emit.mjs` re-solved byte-identical on the unchanged inputs), the battery reproduces to the row, the sampler's 746 lines are gone, and M-2, M-3, M-4, M-5, M-7 and M-8 are green and each catches its plant. The design did not converge: its objective is the battery inverted, and it fails exactly where the battery is silent.

**Open gaps (exact list):**
1. Dark lift. The objective has no term that makes a dark plate lift off the page, and the plates paint below it (§5.3). The gestalt fails.
2. The band ruling is unmade. Under the as-written band, light content transmits 0.39 and chrome 0.27. W-A's per-band bound for light content is 0.190-0.245, and the research seat's banded solve is 0.113. D-3 (best iOS 27) is not met.
3. Unsolved states. The held plate fails 35 M-2 rows (§5.1), `--glass-saturate-grasp` 1.75 is hand-set, and the collapsed dock is unmeasured (§5.5).
4. Consumer and hand paints on rungs escape the solve: the rim tile at 2.21 (§5.2), the focus veil (§5.4), and the four unaudited `--glass-plate-floating` consumers.
5. W-D leg 1 passes hand edits (§3, plants A and B), and leg 2 is not bound to the file leg 1 compares.
6. Stage 2 is a hand constant (`stages.json` 0.82), and it breaks PROPORTION's 1:2:6 register (an owner ruling).
7. The dialog α is analytic, with hand-copied page and scrim colours and a silent `?? 1` clamp.
8. Engine margin: Playwright WebKit reads 4.45-4.48. Real Safari is UNMEASURED (owner's safaridriver checkbox).
9. M-1 × M-6 in light (S-7): an owner ruling, with no non-paint separation term in the objective.
10. The solver imports `docs/tranches/…/harness/lib.mjs`. `closure.mjs` is cited and absent. The corpus is 71 MB of committed PNG.
11. P-3 duplicates: `--glass-saturate` beside six per-rung tokens that all hold 1; chassis, crown and sheet as copies; the dock's blur r discarded.
12. The muted register sits on the gate floor (ΔL_OK 0.100 against 0.08), so captions lose their subordinate register.
13. Common floor row 5 (the well as a rung) is not done.
14. The G2 dynamic-darken edict is retired, not met: the dock is static chrome (D-2).
15. Wash's r 0 is misreported as a solve choice (§5.6).
16. Residue: `backdropMode: "live"`, and 9 stale comment sites.

**Verdict: BANK.** The solver, the frozen corpus with its liveness check, and the painted-pixel loop are the strongest instrument any family has for setting the ladder's numbers. That instrument is sound and reproducible, and it should outlive this family. As a design it is dominated: its outputs under the as-written battery are a near-opaque neutral frost in light and black holes in dark. And the gate that is meant to certify "the tokens are the solver's output" does not bind the two.

**Re-trigger, all three required:**
- the owner's band ruling;
- an objective that states what the battery omits: a signed dark lift (plate L ≥ page L), a transmission floor, and the held and collapsed states;
- W-D rebuilt so its leg 1 runs a fixed command (not the file's own line), stage 2 actually renders, and leg 2 builds and captures the same tree leg 1 compared.

With those in place, D3-D becomes the calibration layer under whichever family wins.
