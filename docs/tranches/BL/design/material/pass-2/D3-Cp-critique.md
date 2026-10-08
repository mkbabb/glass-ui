# D3 · pass 2 · D3-C′ · critique (the cascade ink, fail-safe)

| field | value |
|---|---|
| seat | D3 pass 2, adversarial CRITIC for route C′. I did not author the spec or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree cut at `1a791c10` (the checkout's HEAD). `floor.patch` then `D3-Cp-proto.patch` applied clean, 83 files changed. A second clean worktree at `1a791c10` built the HEAD base for the glance. Both worktrees are removed |
| engines | Chromium 149 (the gate) and **Playwright WebKit 26.5** (headless, paint-only, no `backdrop-filter`, every dock row `+shim`). **Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every cell of this file |
| load | 26-166 through the seat, from other sessions. The load is printed beside every run in §1. No cell timed out. One capture failed: the 90 s drift window ran out of node heap, which is an instrument limit, not paint. It was re-run at 60 s with a larger heap |
| judged against | REGISTRY §7.5 only: M-1..M-8 as revised by H-1..H-14, M-9, the route's own witness (W-C), FL-1..FL-13, C′ items 1-9, "Every route", and the owner-glance gestalt against D-1..D-3. I added no rows. New defect classes go to §6 |
| writes | this file; `D3-Cp-crit/` (my probe stylesheets, `silence.mjs`, `run.sh`, the two baseline tables as JSON, the glance readings as JSON). Bulky captures stayed in scratch |

## 0 · Verdict

**ADVANCE, convergence 26 / 35 = 0.74.**

- **The prototype reproduces to the row.** My claimed and unclaimed H2 runs give the prototype's whole-run verdicts for every M witness, W-A, W-C and W-G. All eight of its plants red exactly as reported.
- **The differentiator is real, so the downgrade trigger does not fire.** Claimed light wash over c1 reads T_c1 0.723, against 0.121 unclaimed (the floor).
- **Three of the open gaps are C′'s own, and none of them was visible to the prototype's battery.**
  1. **The claim's licence is solved for one ink, but the plate carries others (item 7).** The content α is solved for the *reach* ink: light L 0.306, darker than the static muted ink at 0.481. Only `--on-glass-muted` re-solves. The library's second on-glass register (`--muted-foreground-strong` → `--on-glass-muted-strong`, which every rung re-points, and which `.glass-capsule`, `.feedback-tone` and `.glass-capsule-track` use for their muted run) stays static. On a claimed light wash it reads **3.18 over black, 3.47 over stripes, 3.62 over c1 and 4.43 over c0.5**. Unclaimed, the same run reads ≥ 4.81 on every one of those grounds.
  2. **A claim that knows nothing still thins (FL-4).** A field claim with no publication in scope, or an honest claim of the any-input tones (lo 0 / hi 1), paints light wash α **0.624** against FL-5's bound **0.891**. That is the reach ink's any-input solve, not ground knowledge, and it is the arm in which the strong register reads 3.18.
  3. **The dead field arm is silent (item 3, Q-7 b).** With the publication out of scope there is no console message and no stamped state. The host still reads `data-glass-field="published"`.

It advances because none of the three is structural. Solving the claim at the lightest ink a plate ships, which in light is the strong register, keeps a large light gain: c1 wash α **0.599 (T 0.40)** against 0.891, computed with the route's own formula in §4.1. A stamped claim state closes the silence. The other open rows are the floor's, the instrument's or owner rulings (§3).

## 1 · What I ran

Every command ran in my worktree or against its build. Chromium is the gate.

| run | command (H = `harness/`, P = `pass-2/`) | wall time, load |
|---|---|---|
| typecheck | `vue-tsc --noEmit` | exit 0, 10 s, load 72 |
| targeted units | `vitest run` groundTone, glass-subtlety, token-graph, orphan-css-partial, forms-seam | **5 files, 60 passed**, load 74 |
| claimed battery | `node H/run.mjs <wt> --label cpc --demo --query claim=honest` | 12:48-13:09, load 53-88 |
| unclaimed battery | `node H/run.mjs <wt> --label cp0c --skip-build` (same dist) | 13:36-14:14, load 58-166 |
| per-engine tables | `node H/baseline.mjs` on both | `D3-Cp-crit/baseline-cpc.json`, `baseline-cp0c.json` |
| the route's plants | `sh P/D3-Cp-plants/run.sh <cpc dist>` | 13:11-13:21, load 26-45 |
| my probes | `sh P/D3-Cp-crit/run.sh …` (strongink, interposed, fgretune, silence, glance) | 13:21-13:36, load 33-166 |
| drift | `capture.mjs --motion --motion-ms 60000 --grounds aurora --query claim=honest` (heap 24 GB), then `m2-motion.mjs` | 14:15-14:18, load 55-67 |

## 2 · Reproduction

### 2.1 · The battery

The table gives the claimed run first, then the unclaimed one after "/". Chromium is gated, and Playwright WebKit is listed for information.

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| RAW | PASS 22 / PASS 22 | PASS 22 / PASS 22 | PASS 22 / PASS 22 | PASS 22 / PASS 22 |
| M-1 | PASS 11 / PASS 11 | — | PASS 11 / PASS 11 | — |
| M-2 | FAIL 26/397 / FAIL 26/397 | FAIL 24/397 / FAIL 24/397 | PASS 397 / PASS 397 | PASS 397 / PASS 397 |
| M-2m | PASS 148 / PASS 148 | PASS 148 / PASS 148 | PASS 148 / PASS 148 | PASS 148 / PASS 148 |
| M-3 | FAIL 34/177 / FAIL 12/177 | FAIL 93/177 / FAIL 91/177 | FAIL 33/177 / FAIL 2/177 | FAIL 91/177 / FAIL 86/177 |
| M-4 | PASS 77 / PASS 77 | PASS 77 / PASS 77 | PASS 77 / PASS 77 | PASS 77 / PASS 77 |
| M-5 | PASS 10 / PASS 10 | PASS 10 / PASS 10 | PASS 10 / PASS 10 | PASS 10 / PASS 10 |
| M-6 | FAIL 4/4 / FAIL 4/4 | FAIL 2/26 / FAIL 3/26 | FAIL 4/4 / FAIL 4/4 | FAIL 2/26 / FAIL 3/26 |
| M-7 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 |
| M-8 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | FAIL 1/4 / FAIL 1/4 |
| M-9 | PASS 10 / PASS 10 | PASS 8 / PASS 8 | PASS 10 / PASS 10 | PASS 8 / PASS 8 |
| W-A | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 |
| W-C | FAIL 24/160 | FAIL 48/160 | FAIL 15/160 | FAIL 38/160 |
| W-G | FAIL 4/20 | FAIL 8/20 | FAIL 10/20 | FAIL 14/20 |

- **Whole-run, claimed:** M-2 FAIL 50/794 · M-3 127/354 · M-6 6/30 · W-A 2/192 · W-C 72/320 · W-G 12/40. Everything else PASSes.
- **Whole-run, unclaimed:** M-3 103/354 · M-6 7/30 · W-A PASS 192 · W-C 92/320 · W-G 28/40.

The one difference from the prototype is Playwright WebKit W-G light: 10/20 here against its 12/20. That is information only.

### 2.2 · What the reds are, re-read from the logs

- **M-2, all 50 rows, Chromium only: the `held` scene.** Light wash-held reads fg 1.27-1.56 and muted 1.14-1.21; the light dock-held muted-tab reads 4.46 over black. Unclaimed gives the same rows, so the route is not the cause.
  - `glass/grasp.css`'s own header says the five ladder rungs "are NOT graspable as they stand … a carrier mounted on a `.glass-card` today would blur the card's own plate".
  - So H-5's `wash-held` and `floating-held` specimens mount carriers on a host the library declares unsupported, and their 1.1-1.6 is the carrier frosting the text above it. That is an instrument defect (§6).
  - The dock-held 4.46 is a real library cell, and it belongs to the floor (FL-7 territory: the held optic, at the any-input bound, under the static ink).
- **M-3 light, claimed only: the wells on thinned plates.** The wash well perimeter reads 1.85-3.14 over c1 and 2.45 in the hostile cell. Unclaimed, the light reds are the 12 held rows. This is C′'s, and it is Q-6's (§3).
- **M-3 dark:** the floor's dark perimeter gap, in both runs.
- **M-6:**
  - light adjacency 0.003-0.004 is Q-1 a, structural;
  - dark chrome adjacency 0.007-0.008 is the floor's;
  - the dark claimed wash sits ΔE 0.064 / ΔL +0.064 above the page, so the signed leg is green.
- **W-A, claimed only:** leg 4 reads the claimed content rung against A′'s any-input bound. It is A′'s witness of the mechanism doing its job, and it is not in C′'s checklist rows.

### 2.3 · The route's eight plants, re-run (Chromium, `--cells`, load 26-45)

| plant | witness | result | reproduces |
|---|---|---|---|
| deadsolve | M-4 (H-7) | FAIL 40/44 | yes |
| deadsolve | M-2 | PASS 164 (M-2 blind, as C-crit §3 found) | yes |
| inkstatic | M-2 | FAIL 7/222 | yes (the prototype reports the same plant) |
| nolift | M-6 | FAIL 3/26 | yes |
| lagonly | M-2m | FAIL 10/296; worsening step, light wash muted **2.93 at 35 ms**, dark **3.80 at 27 ms** | yes |
| noleaf | M-2 | FAIL 7/222 | yes |
| unpublished | T (report) | light wash T_c1 **0.723 → 0.438**, dark **0.379 → 0.319** | yes |
| fieldfalse | M-2 | FAIL 19/148 | yes |
| rootpage | M-2 | FAIL 86/444 | yes |

T (claimed, Chromium, `T.log`):
- **light:** wash T 0.395 / T_c1 0.723 · quiet 0.263 / 0.495 · resting 0.132 / 0.258 · floating 0.110 / 0.122;
- **dark:** wash 0.243 / 0.379 · quiet 0.159 / 0.255 · resting 0.082 / 0.122 · floating 0.125 / 0.142;
- **unclaimed:** equals the floor (FLOOR §2).

## 3 · The checklist (REGISTRY §7.5), row by row

A row passes only if it is green in Chromium in both themes and a plant reds it. The plant is the route's own, or the H2 self-test's for a floor mechanism (H2 §2.1).

### 3.1 · M battery and the route's witness (11 rows; 7 pass)

| row | status | evidence | plant that reds it |
|---|---|---|---|
| M-1 | **PASS** | 11/11, both runs, both engines | H2: grey floating, FAIL 1/11 |
| M-2 | **FAIL** | 26 + 24 held rows (§2.2): instrument plus the floor's dock-held 4.46. Every ladder, dialog and hostile row is green | inkstatic, noleaf, fieldfalse, rootpage all red it |
| M-2m | **PASS** | 296/296 claimed, both engines; my 60 s drift window: 37/37 inks in every frame, worst 4.78 light, 4.74 dark | lagonly, 10/296 |
| M-3 | **FAIL** | light wells 1.85 over a thinned wash (C′, Q-6); dark perimeter 2.79-2.92 (floor) | — |
| M-4 | **PASS** | 154/154 | deadsolve, 40/44 (but see §6: the witness is unsigned) |
| M-5 | **PASS** | 20/20, 0 readbacks, no custom-property writes | H2: renamed writer, FAIL 4/20 |
| M-6 | **FAIL** | light Q-1 a (structural); dark chrome adjacency 0.007-0.008 (floor). The dark signed leg is green | nolift reds the signed leg |
| M-7 | **PASS** | 8/8 | H2: `contain: paint`, 8/8 |
| M-8 | **PASS** (Chromium) | 8/8; Playwright WebKit dark stripes bleed 1.26, as the floor (no blur) | H2: thin white veil, 4/8 |
| M-9 | **PASS** | 18/18 claimed | H2: fills erased, 12/18 |
| W-C (own) | **FAIL** | 72/320. Above 5.5 by design on kinder pixels. **The retune leg is a real C′ defect:** claimed light paper wash muted 4.37, because `RETUNE_CSS` writes `--background` as a colour and `--glass-page-e` reads the stale `--background-l` | — |

### 3.2 · Floor rows (13; 10 pass)

- **FL-1..FL-3, FL-5..FL-11: PASS**, as built by `floor.patch`, which C′ keeps.
  - The evidence: M-1, M-5, M-7, M-9, W-A 192/192 unclaimed, and the units above.
  - FL-7 is built (the held rung `max(0.6 × rest, floor)`; C′ pins the dock's floor to `--glass-bound`). Its M-2 reading is masked by the instrument (§2.2).
- **FL-4: FAIL.**
  - The rule: "a surface that does not know its ground paints the any-input bound; a route may go thinner only where its own mechanism knows the ground."
  - Under C′, three arms paint light wash α **0.624** (`silence.mjs`: `--glass-content-bound` 0.624255 against `--glass-bound` 0.890991) with no ground knowledge:
    - a field claim with no publication in scope;
    - a stand claim of black;
    - the honest hostile claim (lo 0).
  - Their thinning comes from the reach ink, which only `--on-glass-muted` follows. Counterexample: §4.1, the strong register at 3.18 over black.
  - Dark: 0.827 against 0.873.
- **FL-12: FAIL.** The route edited `DESIGN.md`, so it is a touched file, but its tier table is stale. `DESIGN.md:517` reads `.glass-overlay` 95% / `blur(24px)`, against the floor's 16 px and computed α. The prototype names it and leaves it as residue.
- **FL-13: FAIL (UNMEASURED).** No consumer addendum is landed or measured; the siblings are read-only. This is true of every route in pass 2.

### 3.3 · C′ items (9; 7 pass)

| # | status | evidence |
|---|---|---|
| 1 fail-safe default, portal cell | **PASS** | the unclaimed run is the floor (W-A 192, T = the floor's); the hostile scene is green outside held; rootpage reds M-2 86/444 |
| 2 dead solve loud | **PASS** | H-7 green; deadsolve reds it 40/44 while M-2 stays green |
| 3 publication per scope, arms, the bound | **FAIL** | per-host `WeakMap`; the units cover two substrates and the unmount. **The `"css"` arm, measured** (`silence.mjs --software`: `data-aurora-substrate="css"`, published lo 0.4117, hi 0.7825, the same as WebGPU). **But Q-7 (b) fails:** with the publication out of scope (`nopub.css`), there are 0 console messages, no stamp, the host still says `published`, and the claim silently solves the any-input tones at the reach ink. There is no two-Aurora cell in paint |
| 4 T against A′ | **PASS** | T_c1 light wash 0.723 against 0.121; dark 0.379 against 0.144 (unclaimed). The plants `unpublished` (0.438) and the unclaimed run red it |
| 5 light chrome, dark wash margin | **PASS** | chrome T 0.110 / 0.125 under every claim; dark wash ΔE 0.064 (margin 0.014); nolift reds it |
| 6 Q-8 c | **PASS** | M-2m 296; lagonly 2.93 / 3.80; 60 s of the moving field green (worst 4.74) |
| 7 hand-off coverage | **FAIL** | the `.glass-capsule` / `.feedback-tone` / `-strong` register is unsolved. Light claimed wash: **3.18 black, 3.47 stripes, 3.62 c1, 4.43 c0.5** in Chromium (Playwright WebKit 34/398 red against 28/398 unclaimed, which are missing cells). Unclaimed, the same run reads 4.81-8.49. Dark is green (the strong ink L ≈ 0.85 sits above the reach of 0.835) |
| 8 hand-written; growth; recalc; Safari | **PASS** (Safari UNMEASURED) | the chain is hand-written; growth and recalc as the prototype measured (+4,266 B raw; ×2.0-2.5 claimed in Chromium). **I did not re-run recalc** |
| 9 `backdropMode`, token graph | **PASS** | `glass \| opaque`; `token-graph.test.ts` green |

### 3.4 · Every route (1 row; pass)

The floor is applied first. Both engines run under H2, with WebKit `+shim`. Every claimed green has a plant (§2.3). Safari is UNMEASURED. The prose half is counted once, at FL-12.

### 3.5 · Owner glance (1 row; pass)

`D3-Cp-crit/glance-chromium-cpc*.json`. H-13 as defined: GLANCE PASS, 8 pairs (story 28.7% light, 31.9% dark). The claimed c1 content: PASS, 6 pairs.

- **Light wash** (claimed `#ff8266`): reads as salmon glass carrying the field, muted 5.53, not grey. HEAD reads 1.74 on `#f3411a`. This is the O-62 answer, and it is the strongest picture any C route has made.
- **Dark wash** (`#653020`): a brown plate over a red field, Q-4 a's known cost.
- **D-1.** Thinning travels on the spring and a worsening ground thickens at once (lagonly proves the order matters).
- **D-2, D-3.** M-9 is green.
- **O-87.** C′ adds no lighting layer.

The story pair shows the floor's frosted look. The demo claims nothing, so **the owner cannot see C′'s differentiator anywhere in the demo**. That is the agglomeration's decision (§6).

### 3.6 · Tally

| block | rows | pass |
|---|---:|---:|
| M-1..M-9 + W-C | 11 | 7 |
| FL-1..FL-13 | 13 | 10 |
| C′ items 1-9 | 9 | 7 |
| Every route | 1 | 1 |
| Owner glance | 1 | 1 |
| **total** | **35** | **26 (0.74)** |

The open rows, by owner:
- **C′:** item 3, item 7, FL-4, FL-12, W-C retune, and M-3 light (with Q-6).
- **The floor or instrument:** M-2 held, M-6, M-3 dark, FL-13.

## 4 · The counterexamples, with the arithmetic

### 4.1 · One licence, several inks (item 7, FL-4)

The claim solves `--glass-content-bound` so that a plate composite gives the reach ink (light L 0.306) exactly 4.8. The FL-5 bound guaranteed 4.8 to any ink at or darker than L 0.481. Under a claim, every ink with L between 0.306 and 0.481 that is not `--on-glass-muted` loses that guarantee. The library's own `--on-glass-muted-strong`, `hsl(28 28% 28%)` with Y 0.069, is one of them.

- At the claimed band its ratio is (0.328 + 0.05) / (0.069 + 0.05) ≈ **3.2** analytically.
- Painted, it reads **3.18** (black), 3.47 (stripes) and 3.62 (c1).
- The probe is `D3-Cp-crit/strongink.css`. It repaints the content plates' muted run in `--muted-foreground-strong`, which every rung re-points (`ladder.css:161`) and which the capsule and feedback-tone scopes use for their muted run (`ladder.css:191-193`).

**Cure, in the route's own terms:** solve `--glass-content-bound` at the lightest ink a plate carries (in light, the strong register), or solve the strong register per plate as `glass-ink` does for muted. With the route's formula:

| solved at | light α over c1 (lo 0.4117) | light α over any input |
|---|---:|---:|
| reach (as built) | 0.349 | 0.624 |
| `--on-glass-muted-strong` | **0.599** | 0.769 |

The differentiator survives at about T 0.40 against the floor's 0.11.

### 4.2 · The silent dead arm (item 3, Q-7 b)

`nopub.css` resets `--glass-field-*` to their registered initials under `#app`, which is what a claim sees when the Aurora sits outside its ancestor chain.

`silence.mjs` in light and dark:
- 0 console messages;
- 0 stamped elements;
- the host's attribute still reads `published`;
- the main's tones fall to 0 / 1, and the wash solves to 0.624 light and 0.827 dark.

The thin arm is dead, paints thinner than the bound, and nothing says so. The REGISTRY's Q-7 default is (a) and (b) together, so this is a gap. A cheap cure is a stamped state, for example `data-glass-ground-state` written by the claim's consumer helper, or a CSS-visible flag.

### 4.3 · W-C's retune leg (a real defect the prototype named)

`--glass-page-e` reads `--background-l`. A colour write to `--background` (the harness `RETUNE_CSS`) leaves the number stale. Claimed light paper wash muted then reads 4.37. "Retune the number" is a MIGRATION row, not a mechanism. The same hazard runs through `--foreground`; see §6.3.

## 5 · What held under attack

- **Drift (PF-11).** A 60 s motion window over c1, claimed: 37/37 inks ≥ 4.5 in every frame, worst 4.78 light and 4.74 dark (well placeholders). The 100 s figure is not re-run: 90 s exhausted the node heap.
- **The `"css"` arm** publishes the same tones as WebGPU (§3.3 item 3). It paints the CPU mirror, so model and paint agree by construction.
- **Dark-model conservatism.** I checked the spec's concavity claim: h(y) = EOTF(aP + (1 − a)·OETF(y)) has h′ = k·(c/u + k)^(γ−1), which decreases in u, so h is concave and the dark model is an upper bound on Y. Light uses pre-saturate luma. On the stripes' violet, saturate's clip lowers luma from 0.333 to 0.316, but Jensen's slack (painted Y 0.150 against model 0.081) covers it. I found no colour that breaks it.

## 6 · Next pass (new defect classes; no rows added)

1. **The claim licenses the plate, not the inks on it.** Any fixed ink (the `-strong` register, tone and status inks, links) between the reach and the static muted L loses AA under a claim (§4.1). M-2 reads only `fg` and `muted` runs, so it cannot see this. Needed: a `-strong` run in the specimen ladder.
2. **M-4 is unsigned.** `fgretune.css` writes `--foreground` as a colour (L 0.42). The claimed light wash's solved muted then paints `#3f2a15`, darker than fg `#564a43` (an inverted hierarchy), and M-4 passes it at |ΔL| 0.114. The probe's other reds are the retune's own static-ink effect and not C′'s.
3. **Colour retunes desync numbers.** `--background` (§4.3) and `--foreground` (6.2) both do it, and `music-staff/styles.css:63,70` already writes `--card` as a colour beside `--card-l`. Only a relative-colour read (`oklch(from var(--x) l …)`) would make the solve follow a colour retune.
4. **Library paint inside a page claim.** `interposed.css` paints `--secondary` under a `"page"` claim. Light wash muted reads **4.18**: the false-claim class reached with the library's own tokens, which a consumer cannot be expected to enumerate.
5. **The instrument's held specimens.** H-5 mounts grasp carriers on `.glass-wash` and `.glass-floating`, which `grasp.css` declares not graspable. Every route's M-2 carries 50 rows of carrier-frosted text (1.1-1.6) that measure the specimen. The held cells should hold the dock and a slider only, or a rung that stands down its own filter.
6. **The demo claims nothing**, so the owner glance cannot show C′'s gain outside the specimen page (prototype §8 item 7).
7. **Real Safari: UNMEASURED (owner's safaridriver checkbox)**, including the `@property` lag transition and the per-plate chain.

## 7 · Reproduce

```sh
S=<scratch>; P=docs/tranches/BL/design/material/pass-2; H=docs/tranches/BL/design/material/harness
git worktree add --detach $S/wt HEAD && ln -s $PWD/node_modules $S/wt/node_modules
git -C $S/wt apply $P/floor.patch && git -C $S/wt apply $P/D3-Cp-proto.patch
git worktree add --detach $S/base HEAD && ln -s $PWD/node_modules $S/base/node_modules
export D3_OUT=$S/out
node $H/build.mjs $S/base --label head --demo
node $H/run.mjs $S/wt --label cpc --demo --query claim=honest && node $H/baseline.mjs $D3_OUT/caps/cpc
mkdir -p $D3_OUT/builds/cp0c && ln -s $D3_OUT/builds/cpc/dist $D3_OUT/builds/cp0c/dist
node $H/run.mjs $S/wt --label cp0c --skip-build && node $H/baseline.mjs $D3_OUT/caps/cp0c
sh $P/D3-Cp-plants/run.sh $D3_OUT/builds/cpc/dist
sh $P/D3-Cp-crit/run.sh $D3_OUT/builds/cpc/dist $D3_OUT/builds/head/dist $D3_OUT/builds/cpc/demo $D3_OUT/builds/head/demo
git worktree remove --force $S/wt; git worktree remove --force $S/base
```
