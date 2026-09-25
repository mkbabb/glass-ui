# D3 · pass 1 · D3-D · the calibrated ladder (research)

| field | value |
|---|---|
| seat | pass-1 RESEARCH seat for family D3-D, "the calibrated ladder" |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`. The checkout read `496ebc42` at start and `8141658d` when the worktree was cut. `git diff --stat 9aa2b7f9 HEAD -- src` shows 5 files, all in `components/configurator/` plus one `src/index.ts` export line (10.1.0, O-68/O-75). None is on the glass material path, so every number below measures the published material bytes |
| inputs | `PORTFOLIO.md` §0-§2, the D3-D section, §6 D3-D and §7 (the battery and the witness table). Background: `pass-1/W.md`, `pass-1/X.md`, `harness/HARNESS.md` and the harness scripts. No other family section was read |
| instruments | Playwright 1.61.1 from `glass-ui/node_modules`; headless Chromium 149.0.7827.55 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, and `--use-angle=swiftshader` for the cross-backend leg); Playwright WebKit 26.5. **Playwright WebKit is not Safari**: every WebKit number is labelled "Playwright WebKit"; every real-Safari cell is UNMEASURED (owner's safaridriver checkbox). `safaridriver` is present ("Included with Safari 26.4 (21624.1.16.11.4)") and was not enabled or run |
| worktree | `git worktree add --detach …/D3-D-research/wt HEAD` (`8141658d`), `node_modules` symlinked from the checkout, removed with `git worktree remove --force` before return. One fence slip to record: inside that worktree the three sampler files were deleted with `git rm`, which staged the deletion in the worktree's own index. It touched nothing in the checkout, and the index went with the worktree |
| scratch | `S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-D-research`. Everything cited below lives under `$S`: the frozen corpus `out/corpus/` (78 PNG, 71 MB), the filtered backdrops `out/bd/` (1408 Chromium Metal, 704 Chromium SwiftShader, 352 Playwright WebKit), the determinism frames `out/det/`, the probes `probe/`, this pass's logs `p3/`, the candidate `p3/candidate.diff` (499 lines) with a copy of the solver files and the emitted token file, and the battery captures `p3/out/caps/{cand,final,perim-*}` |
| provenance | Two earlier runs of this seat were cut by the weekly-limit outage and the 11:10 restart before either wrote this file. They left the corpus, the backdrops and the probe scripts in `$S/out` and `$S/probe`, and those are reused as instruments. Every number in this document comes from a command re-run in this session (logs under `$S/p3/`), except the determinism frames of `out/det/`: the diff over them was re-run here, but the frames themselves were captured by the earlier run |
| load | load averages 22-72 through the runs, one spike to 235 during the final W-D re-solve. Other seats shared the machine |

## 0 · Findings that change the family

1. **The solve is well-posed per rung, and bisection on α is sound, provably and by measurement.** The M-2 predicate is monotone in α once the pole sits on the far side of the ink from the ground: 766 of 784 α-sweeps are monotone, and all 18 exceptions are HEAD's own ink pole (a pole on the ink's side). The contrast *value* is not monotone (372 of 784); only the pass set is (§1.1).
2. **Under the battery as written, the transmission objective is degenerate.** M-2 must hold over black and white at every level, so every light rung needs α ≥ 0.60 of a white pole with the floor ink (0.84 with HEAD's ink), and every dark rung α ≥ 0.75 of a black pole. The solver maximises transmission and lands at T 0.06-0.40. That is a near-opaque frost, not glass (§1.1, §3).
3. **M-1 and M-6 cannot both hold in light, for any pole and any α.** Composites over paper lie on the segment from paper to the pole. M-1 caps that segment at ΔE 0.02, and M-2 forces α ≥ 0.60, so every rung sits within 0.4 × 0.02 = 0.008 of every other. That is less than M-6's 0.01. The solver reports it (INFEASIBLE in the emitted header), and the battery reads adjacent ΔE 0.000-0.001. It is a battery conflict for the owner to rule, not a solver defect (§1.1).
4. **The transmission-maximising dark pole is black, not a lifted card.** Searching the pole's lightness from 0.00 to 0.30 along the card hue, the dark optimum is `#000000`, with the ladder α 0.751/0.852/0.945/0.951/0.955. It clears M-6 in dark, where HEAD's ladder is one colour, but it paints dark plates *darker* than the page (L 0.00-0.09 against 0.146). The objective has no term that says a dark plate lifts (§3).
5. **Blur buys almost nothing on the aurora; it buys on high-frequency grounds.** Over every c1 preset, α* is flat in blur radius, within 0.01, for both inks (DEFAULT-c1 muted 0.76 at r 0…22). It falls only over the checker (0.87 → 0.73) and the stripes (0.80 → 0.72). Blur at r16 cuts L deviation under the plate by 8-30% (DEFAULT-c1 −13%). The portfolio's −43% does not reproduce on this corpus and metric (§1.1).
6. **F48's blur cap binds on chrome.** Under HEAD's radii (up to 22 px) the light chrome rungs solve at α 0.600. Under F48's cap (≤ 9 px) they solve at 0.678, because M-8's luminance bleed over the stripes binds. The cost is 0.078 α on floating, overlay and dialog (§1.1).
7. **The solver's backdrop stage is deterministic across GPU backends; the field render is not.** On the same frozen corpus PNGs, α* agrees between Metal and SwiftShader at p50 0, p95 0.003 and max 0.015 over 1408 cells, and full solves emit identical α to three decimals. The aurora *field* differs between backends by ΔE p50 0.011-0.124 and max 0.42. So the corpus must be frozen PNGs, never live renders (§1.2).
8. **The first probe turns six of eight battery rows green in Chromium, in both themes.** M-2, M-3, M-4, M-5, M-7 and M-8 pass. M-1 fails one row (the opaque escape is `--card`, L 0.974, 0.001 under the floor: common floor row 4, not the ladder) and M-6 fails the four light adjacency rows (finding 3). W-D's solver leg is byte-identical on re-solve; its battery leg is red, because W-D gates on Playwright WebKit, which paints no `backdrop-filter` (§2.3).

## 1 · The research questions

### 1.1 Q1 · Is the solve well-posed? Is the objective monotone in α and blur? Where do M-2 and M-8 conflict?

**Instrument.** `probe/backdrops.mjs` renders a 5 × 8 grid of empty plates carrying only `backdrop-filter: blur(r) saturate(s)` over each frozen corpus field, so the capture inside a plate is the engine's filtered backdrop B(r, s). A plate of pole P at α then composites affinely on encoded sRGB, C = α·P + (1 − α)·B (W.md T4 and HARNESS §2 establish the affine law). The glyph rings come from the same two-mask coverage method as the battery (`solve-lib.mjs`).

**Monotone in α** (`node probe/mono.mjs out/bd chromium-metal`, 68.7 s; `p3/q12.log`):

```
α-sweeps: 784; predicate p05≥4.5 monotone in α: 766/784; p05 VALUE monotone in α: 372/784
α*(r) non-increasing in r: 81/86
```

- The 18 non-monotone predicates are all the light **ink** pole (HEAD's veil) over white or stripes. p05 is 17.49 at α 0 and falls to 1.19 at α 1, so the pass set is [0, a] and not [a, 1].
- **The proof, for the record.** Per ring pixel, luminance Y is monotone in α, because each encoded channel is affine in α and the linearisation is monotone. Contrast against a fixed ink is V-shaped in Y. If the pole lies on the far side of the ink from a failing ground, that pixel's pass set is [a, 1]. If the ground already passes on the pole's side, every α passes. So the count of passing pixels is non-decreasing in α, and "p05 ≥ 4.5" is monotone. The solver enforces the precondition by rejecting any pole illegible under the ink at α = 1 (`solve.mjs`).

**Monotone in blur.** α*(r) is non-increasing in 81 of 86 sweeps. The 5 exceptions rise by ≤ 0.01, which is one bisection step (e.g. light card over the checker, fg: 0.02 at r12 → 0.03 at r16). So the solver takes a grid over r and s, not a bisection, with ties going to the larger radius. The per-field α* rows show where blur pays:

| field (light, `--card` pole, HEAD muted) | α* muted at r 0 / 6 / 16 / 22 |
|---|---|
| DEFAULT-c1 | 0.76 / 0.76 / 0.76 / 0.76 |
| VANGOGH-c1 | 0.82 / 0.82 / 0.82 / 0.82 |
| checker | 0.87 / 0.73 / 0.73 / 0.73 |
| stripes | 0.80 / 0.79 / 0.72 / 0.73 |

L deviation under the plates (`node probe/xback.mjs out/bd`, `p3/q12.log`), mean std of OKLab L per plate, r0 → r16: DEFAULT-c1 0.0115 → 0.0099 (−13%); range over the 19 c1 presets −8% (SPEEDTEST) to −30% (DELIBERATIVE). Blur narrows the variance a little, but p05 is set by the field's mean lightness under the text, which blur does not move.

**The solver** (`scripts/glass-solve/solve.mjs` in the worktree, copied to `$S/p3/solve.mjs`) has these variables per theme:
- the pole, searched along the card hue in OKLCh lightness (light C 0.006 h 75; dark C 0.02 h 60);
- the muted ink: the M-4 floor, fg lightness ± 0.10, or HEAD's ink;
- per level: α, r ≤ the level's cap, and s ∈ {1, 1.5}.

It solves the least α per level (M-2 on every corpus field in band, plus M-8 on chrome), then runs an ordered M-6 pass (a thicker rung never carries less veil, and sits 0.012 above the one below). In dark it raises every plate to page separation 0.052, then checks M-1 in light. It chooses the pole with the highest mean T among feasible ladders.

`node solve.mjs out/bd --band as-written --cap f48 --ink floor` (198 s; `p3/solves2.log`):

| light, pole L | α wash…overlay · dialog · dock | verdict |
|---|---|---|
| 0.975 `#f9f6f2` | .617 .617 .617 .684 .684 · .684 · .775 | M-6 infeasible ×4 |
| 0.992 `#fffcf8` | .604 .604 .604 .680 .680 · .680 · .770 | M-6 infeasible ×4 |
| 1.000 `#fffffb` (chosen, max T) | .600 .600 .600 .678 .678 · .678 · .768 | M-6 infeasible ×4 |

| dark, pole L | α wash…overlay · dialog · dock | verdict |
|---|---|---|
| 0.00 `#000000` (chosen) | .751 .852 .945 .951 .955 · .751 · .799 | FEASIBLE, mean T 0.142 |
| 0.02 | .750 .851 .945 .950 .975 · .750 · .799 | FEASIBLE, 0.140 |
| 0.06-0.30 | — | infeasible: M-6 adjacency or page separation |

**Binding constraints.** Light content rungs are bound by M-2 muted over black. Light chrome is bound by M-8 over the stripes. Dark rungs are bound by M-2 muted over white, then raised by M-6.

**The M-1 × M-6 conflict** (finding 3), stated exactly. For one pole P and paper p, composites are c(α) = p + α(P − p), so ΔE(c_i, c_j) ≈ |α_i − α_j| · ΔE(P, p). M-1 caps ΔE(c, p) ≤ 0.02 at every rung, and the topmost α is near 1, so ΔE(P, p) ≲ 0.02. M-2 forces α ≥ 0.60 on every rung (floor ink; 0.84 with HEAD's ink). So the whole ladder spans ≤ 0.40 × 0.02 = 0.008 (0.003 with HEAD's ink), against M-6's 0.01 per step, four steps. Per-level poles do not escape it: all rungs must sit in M-1's 0.02 ball above L_paper − 0.01, and five rungs 0.01 apart along any monotone path need the full 0.04 diameter with zero margin. Measured: the candidate's light adjacent ΔE is 0.000, 0.000, 0.001, 0.000 (`p3/out/caps/final/results/M-6.log`).

**Where M-2 and M-8 conflict** (`node p3/sat.mjs out/bd p3/solve-aw-f48-floor.json`, `p3/sat.log`):

| theme, r | M-2 α* s 1 / s 1.5 | M-8 α* s 1 / s 1.5 | bare stripes at α 0: bleed, C (s 1 / s 1.5) |
|---|---|---|---|
| light, 0 | 0.600 / 0.600 | 0.791 / 0.799 | 3.72, 0.072 / 3.52, 0.097 |
| light, 9 | 0.600 / 0.600 | 0.672 / 0.676 | 2.40, 0.070 / 2.27, 0.106 |
| dark, 0 | 0.678 / 0.678 | 0.813 / 0.814 | same field |
| dark, 9 | 0.678 / 0.678 | 0.748 / 0.752 | same field |

- **They do not conflict in α.** Both push α up, and on chrome M-8 is the binding one by 0.07-0.19.
- **They conflict in two other axes.**
  - *Saturate.* M-8's chroma half wants s = 1: saturate 1.5 raises the bare stripes' chroma from 0.070 to 0.106. M-2 is indifferent at the solved pole. So the solver emits s = 1 on every rung, and HEAD's `--glass-saturate: 1.5` has no support in the solve.
  - *Blur.* M-8's bleed half wants blur (bleed 3.72 → 2.40 from r 0 → 9), and F48 caps blur. With HEAD's caps, light chrome solves at α 0.600; with F48's, 0.678 (`solve … --cap head`, `p3/solves2.log`). This is risk 5 of the portfolio, measured: the solver wants more blur than F48 allows on every chrome rung.
- **Margin.** The solved light floating plate reads bleed 1.25 exactly (`final/results/M-8.log`). The solver solves to the bound, so the gate has no margin (§4, counterexample 4).

**The band ruling is worth more than every other lever.** `--band banded` holds content rungs only over paper, the c0.5 fields and the blob hero. Under it, light wash, quiet and resting solve at α 0.113 (T 0.887) instead of 0.600 (`p3/solves2.log`). Whether a content rung must hold over black and white is the owner's call. The battery as written says it must.

### 1.2 Q2 · How deterministic is headless GPU rendering? What tolerance does the gate need? Can the solver go red?

`node p2/det.mjs out/det` (re-run this session, `p3/q12.log`), frames of three presets at c1 and c0.5 in light, taken as consecutive captures (r0/r1/r2) per backend:

| comparison | DEFAULT-c1 | OIL_GESTURAL-c1 | OPENAI_MEADOW-c1 |
|---|---|---|---|
| Metal, capture 0 vs 1 vs 2 | 0 differing px | 0 | 0 |
| SwiftShader, 0 vs 1 | 0 | 0 | 0 |
| Playwright WebKit, 0 vs 1 | 0 | 0 | 0 |
| Metal vs SwiftShader, ΔE_OK p50 / p99 / max | 0.020 / 0.170 / 0.221 | 0.088 / 0.235 / 0.314 | 0.124 / 0.399 / 0.418 |
| Metal vs `--disable-gpu` | 0.022 / 0.164 / 0.219 | 0.090 / 0.237 / 0.312 | 0.124 / 0.399 / 0.418 |
| Metal vs Playwright WebKit | 0.002 / 0.007 / 0.011 | **0.301 / 0.347 / 0.360** | 0.003 / 0.008 / 0.014 |

- **Within one backend, rendering is bit-stable.**
- **Across backends, the aurora field is a different picture**, up to ΔE 0.42.
- **Playwright WebKit paints OIL_GESTURAL as a different field** (ΔE p50 0.30). Its aurora runs the GL arm, since Playwright WebKit exposes no `navigator.gpu` (PORTFOLIO §1.5).
- **Consequence:** the corpus is frozen PNG, captured once on the reference engine and committed with a digest (the emitted header carries it: `b8312697c243a289`). Nothing downstream re-renders a field.

**The filter stage over a frozen field.**
- `node probe/xback.mjs out/bd`: α* per cell, Metal vs SwiftShader backdrops of the same frozen PNGs, 1408 cells. |Δα*| p50 0.0000, p95 0.0029, max 0.0151; 1190 of 1408 identical.
- Full solves on each backend's backdrops (`solve.mjs --tag chromium-metal|chromium-swiftshader --radii 0,6,16`, `p3/xs.log`) emit identical α to three decimals in both themes (light .600/.600/.600/.768/.768 · .768 · .768; dark .751/.852/.945/.951/.955 · .799 · .799).

**Same machine, same engine, re-solve.** `emit.mjs` ran three times (282 s, 291 s, and once inside W-D under load up to 235). W-D's leg 1 read "byte-identical" both times it ran (`cand`, `final`).

**The tolerance the gate needs.**
- **Tokens.** Byte equality holds on one engine build and one backend. Across backends the α moved by up to 0.015 in single cells, though not in the emitted file here. So the committed file names its engine and backend, and CI re-solves on that pair. A tolerance compare (|Δα| ≤ 0.02) is the fallback if CI has only SwiftShader. Under P-3 that is a second rule about the same fact, so the pinned-engine re-solve is the one to keep.
- **The battery needs a margin the solver does not yet reserve.** The solved light wash reads muted 4.54 over black in Chromium, and the same cell reads 4.41 in Playwright WebKit (ink painted `#442f1a` against `#422d17`). The M-2 target should be solved at 4.5 + 0.15 so a second engine's rasterisation cannot flip the gate. The same applies to M-8 bleed (solved to 1.25 exactly).

**Can the solver go red (P-3)?** Yes, in three measured ways. The instrument that reads it is the battery, which renders the real library build (the `@glass` specimen app) and never reads the solver's model:
1. **Infeasibility is emitted, not hidden.** The generated header reads `light: INFEASIBLE: M-6 wash→quiet …`, and the battery reads M-6 FAIL 4/19. No masking fallback (E-2): the solver writes the best-T ladder and names the violated rows.
2. **Model error goes red in paint.**
   - *Stage 1 does not see the perimeter.* The first candidate carried the stage-2 perimeter rung calibrated for the previous ladder (0.60). The battery read M-3 FAIL 24/266 (wash well over black 1.79). A sweep then solved it: 0.66 → 17 fails, 0.74 → 15, 0.82 → 10, the last all in the Dialog Close ring (`p3/perim.log`).
   - *A literal outside the solver's reach.* The Close ring was the other model hole: a hand literal `color-mix(in oklab, var(--foreground) 48%, transparent)` in `dialog/styles.css:144,243`. Routed through `--ink-perimeter`, the ring reads 8.13-8.81.
3. **A hand edit goes red.** The harness selftest already plants one (HARNESS §4: floating 0.760 → 0.700 fails W-D leg 1, "differs from the committed file").

### 1.3 Q3 · Which corpus fields are licensed and representative?

| field set | count | licence | representative of | defect found |
|---|---|---|---|---|
| paper, both themes | 2 | the library's own tokens | every consumer | none |
| hostile grounds: black, white, 16 px checker, 24 px stripes | 4 per theme | synthetic | the M-battery's grounds | none |
| aurora: `DEFAULT_AURORA_CONFIG` plus the 18 demo presets (`demo/stories/substrates/aurora/presets.ts:685`) at ceilings 1 and 0.5 | 38 per theme | MIT, library-authored procedural configs (`LICENSE`: MIT, © 2026 Mike Babb). The names `OPENAI_*` ("GPT-4.5 feel", `presets.ts:44`) and `VANGOGH` name a look, not an asset | the library's own field | none; but see the note on ceilings below |
| blob hero, default and `--primary` | 2 per theme | MIT | the blob substrate | **the default-colour blob paints nothing**: `BLOB-c1` reads L01 = L50 = L99 = 0.985 (light) and 0.146 (dark), which is the page. It passed through the solve as a second paper. The corpus needs a liveness row: a field whose L spread is 0 is rejected |
| O-59 capture frames (`value.js/docs/tranches/X/audit/ui-evidence/`) | 2701 value · 2783 keyframes · 1658 fourier (3.6 GB) | MIT in all three repos | **not usable as backdrops**: each frame is a composed UI with glass 7.0.0/8.0.0 already painted over it, at 1440 × 900 or 390 × 844. A crop of a bare region (value.js's atmosphere, keyframes' graph paper) could serve, but the frame carries the veil it is meant to calibrate | — |
| consumer fields by addendum | — | value.js, keyframes.js and fourier are MIT (same owner). chicago's listing photos are scraped, licence unknown (X.md §3.3); they cannot enter a public corpus | value.js: the aurora across **seed space** (the hue is user-driven, X §3.4 #5); keyframes: the hero at ceiling **0.1** over graph paper; fourier: paper prose and its plot canvases (text-over-text, X §0.7); chicago: its `.ground` gradients, which are CSS and reproducible | — |

**Ceilings are sampled at 1 and 0.5 only.** keyframes ships 0.1. At the solved pole, α* is monotone in the ceiling for the same reason it is in α (the field lerps toward the page), so 0.1 lies inside the band. That is argued, not measured here.

**Size.** 78 PNG, 71 MB. Committed to the repo, this is the largest asset set the library would carry. It is a cost row, not a blocker.

### 1.4 Q4 · The WebKit plan

Measured this session:
- **Playwright WebKit paints no `backdrop-filter`** (PORTFOLIO §1.5, HARNESS §2). Solving on its backdrops is solving at r = 0. `solve.mjs --tag webkit-pw` (`p3/xs.log`) gives light chrome α 0.791 (vs 0.768 on Chromium at the same radii) and dark dialog and dock 0.813 (vs 0.799). Content rungs are unchanged: M-2 binds over black, and blur does not move it.
- **Playwright WebKit crashes on any page that mounts `GlassDock`** (re-confirmed by the harness: every WebKit dock row prints "UNMEASURED in Playwright WebKit"). The dock rung cannot be calibrated there at all.
- **W-D gates on Chromium plus Playwright WebKit** (`wd-solved-tokens.mjs`: `--gate chromium,webkit`). On the final candidate that gate reads:
  - M-8 FAIL, light floating and overlay bleed 1.43 without blur;
  - M-2 FAIL, 8 rows, muted 4.35-4.41 over black and checker, from ink rasterisation;
  - M-6 and M-1 FAIL, the Chromium reasons.

  So W-D cannot go green while a paint-only engine gates a blur-aware solve.

**The plan:**
1. The second gate engine is **real Safari through safaridriver**. It is W3C WebDriver over HTTP, so it can drive the same specimen app and take the same captures (screenshots only, no CDP). It stays UNMEASURED (owner's safaridriver checkbox) until the owner enables it.
2. Until then, Playwright WebKit stays an **informational paint-only leg**, as in every other witness. W-D's `--gate chromium,webkit` is amended to `--gate chromium` plus Safari-when-enabled. This is a harness amendment, not a family change, and P-3 holds: one instrument, one engine list.
3. The solver does **not** solve for r = 0 to satisfy Playwright WebKit. Doing so would spend 0.023 α on chrome to fit an engine no user runs.
4. When Safari is enabled, the corpus backdrops are rendered in Safari too, and the solve takes the max α over both engines per cell. Safari's `saturate()` bytes and backdrop-root rules are UNMEASURED (W.md §11).

### 1.5 Q5 · What CI cost is acceptable under E-8?

Measured wall times on this machine under load 22-72 (235 at one spike):

| stage | cost | source |
|---|---|---|
| render filtered backdrops, Chromium Metal, 880 shots (radii 0-9, s 1/1.5, 88 fields) | 138.7 s | `p3/emit1.log` |
| same, SwiftShader (the likely Linux CI backend), per shot | 1.02 s vs Metal's 0.13 s (704 shots in 716.6 s against 1408 in 182.2 s) | `out/bd/index-*.json` |
| solve, both themes, 8-pole dark search | 125-198 s | `p3/solves2.log` |
| `emit.mjs` end to end | 282 s, 291 s | `p3/emit1.log`, `p3/emit2.log` |
| battery capture, 68 cells + 8 live windows + the retune | 614-672 s | `p3/run-final.log` |
| all 14 witnesses, including W-D's re-solve | 1173.6 s total run | `p3/run-final.log` |

**Proposal.**
- **What counts against the gate budget.** The family adds one gate, W-D, to E-8's 40-60, and replaces nothing else (the M rows are the shared battery every family pays). Its CI cost is one re-solve, about 5 min on Metal and an estimated 20 min on SwiftShader at 8× per shot, plus the shared battery.
- **Keep it off the PR path.** Run it on a nightly or pre-release job, not per PR, triggered by changes to the corpus, the solver, `stages.json` or the specimen set. Per PR, a 1 s check compares the committed file's digest line with the corpus digest.
- **How it goes red.** A token edit by hand changes the file without changing the corpus digest, so the release gate re-solves and goes red there.

## 2 · The family, one step further

### 2.1 Its strongest form: what it must specify precisely

1. **The corpus is frozen data with a manifest.** PNG per theme, field and ceiling, a digest, a liveness check (L spread > 0, which the blank blob fails), a licence line per field, and the reference engine and backend it was captured on. Fields are never re-rendered at solve time (§1.2).
2. **The band table is part of the source of record.** For each level, the fields it must hold over. The as-written battery puts every level over every ground. That forces α ≥ 0.60 in light and ≥ 0.75 in dark. The family must state the band per level, and the owner must rule on it (§1.1: banded content is α 0.113, T 0.887).
3. **The variables.** Per theme: one pole (searched, not authored), the muted ink (the M-4 floor, a solved ΔL), and the perimeter rung (stage 2). Per level: α, r ≤ the F48 cap and s.
4. **The ordering.** A thicker rung carries at least the veil of the one below and sits ≥ 0.012 above it over paper. Without this rule the M-6 pass produced a zigzag ladder (resting lighter than quiet) that the witness would pass (`p3/solves.log`, first run).
5. **Two stages.** Stage 1 solves the plate over the corpus. Stage 2 renders the stage-1 build and solves the indicator rungs (`--ink-perimeter`) over its painted wells and rings. Every indicator colour must route through that rung, and no hand literal may escape it (the Dialog Close ring did).
6. **Margins.** Solve M-2 at 4.65 and M-8 bleed at 1.20, so a second engine cannot flip the gate.
7. **Infeasibility is output.** The header names every violated row; the battery stays red there. Nothing clamps quietly (E-2).
8. **One file, one writer.** `src/styles/tokens/glass.solved.css` carries `/* solver: node scripts/glass-solve/emit.mjs */` on line 1. It is `@import`-ed after the dark arm, so its `.dark` block is the one dark writer. Every number it holds is deleted from its hand-written home, with no alias.

### 2.2 The probe: what was changed in the worktree

The worktree diff: 17 tracked files changed, 31 insertions and 187 deletions, plus the untracked `scripts/glass-solve/` and the generated file (`$S/p3/candidate.diff`).

- **`tokens/glass.css`.**
  - *Removed:* `--glass-veil-ink`, `-base`, `-step`, the five derived rungs, the five blur radii, `--glass-saturate` and the five off-ladder offset formulas.
  - *Changed:* the `:root` plates and the five blur recipes now read `--glass-veil-pole` and `--glass-saturate-{level}`.
- **`tokens/dark-arm.css`.** Removed the dark ink/base pair and the dark `--on-glass-muted`.
- **Other token files.**
  - `tokens/on-glass-fg.css`: removed the light `--on-glass-muted`.
  - `tokens/color-radius.css`: removed `--ink-perimeter`.
  - `tokens/manifest.ts`: the material list swaps ink/base/step for pole.
  - `tokens.css`: `@import "./tokens/glass.solved.css"` after `dark-arm-glass.css`.
- **`glass/veil.css`.** The luma clamp is gone: `--glass-veil-rest: var(--glass-veil-tier, var(--glass-veil-resting))`. The plate composes from the pole.
- **`glass/ladder.css`.** The `@container style(--glass-backdrop: light)` bright bucket and the `contrast-color()` block are gone (common floor row 2).
- **`glass/material.css`.** `contain: paint` is gone from the four content rungs (common floor row 1, O-61).
- **The live sampler is deleted:**
  - `GlassDock.vue` no longer imports or calls `useGlassBackdropLuminance`;
  - `useDockShellProps.ts` loses `backgroundCanvas`;
  - `composables/glass/{useGlassBackdropLuminance,backdropLuminanceSample,backdropSampleMath}.ts` are deleted (746 lines).
- **Dock.**
  - `adaptive-legibility.css`: the dock's `--muted-foreground` is `--on-glass-muted` (was `--foreground`), and its `contrast-color()` block is gone.
  - `controls/tab-button.css:47`: an inactive tab reads `--dock-fg-on-aurora` (was `--muted-foreground`).
  - `shell.css`: both dock blur re-compositions read `--glass-saturate-dock`. The dark arm's `brightness(1.14)`, which the solve does not model, is dropped.
- **`dialog/styles.css:144,243`.** The Close ring's hand 48% becomes `calc(var(--ink-perimeter) * 100%)`.
- **Hairlines and one consumer site.** `sheet/styles.css` seams read `oklch(from var(--foreground) l c h / 0.08)`; `music-staff/styles.css` sets `--glass-veil-pole`.

The emitted `glass.solved.css`, from `node scripts/glass-solve/emit.mjs`:

| token | light (`:root`) | dark (`.dark`) |
|---|---|---|
| `--glass-veil-pole` | `rgb(255 255 251)` | `rgb(0 0 0)` |
| wash · quiet · resting | 0.600 · 0.600 · 0.600 | 0.751 · 0.852 · 0.945 |
| floating · overlay | 0.678 · 0.678 | 0.951 · 0.955 |
| dialog (scrim-aware) · dock | 0.937 · 0.768 | 0.853 · 0.799 |
| chassis · crown · sheet | 0.600 · 0.937 · 0.678 | 0.751 · 0.853 · 0.955 |
| blur radii wash · quiet · resting · floating · overlay | 0 · 6 · 6 · 9 · 9 px | same |
| saturate, every rung and the dock | 1 | 1 |
| `--on-glass-muted` | `rgb(66 45 23)` (fg L + 0.10) | `rgb(206 196 183)` (fg L − 0.10) |
| `--ink-perimeter` | 0.82 | 0.82 |

The header carries the corpus sha256 `b8312697c243a289`, the engine (Chromium 149.0.7827.55), the settings, and `light: INFEASIBLE: M-6 …; dark: feasible`.

**The dialog α.** The real Dialog transmits the modal scrim (HARNESS §3, new reading 1). `emit.mjs` therefore raises the dialog rung to the least α that holds M-1 over scrimmed paper in light (0.937) and page separation over the scrimmed page in dark (0.853).

### 2.3 The battery on the probe, both themes

`D3_OUT=$S/p3/out node docs/tranches/BL/design/material/harness/run.mjs <wt> --label final` (1173.6 s; results in `$S/p3/out/caps/final/results/`). The HEAD column is HARNESS §3.

| witness | HEAD | probe (Chromium gate) | what it reads now |
|---|---|---|---|
| M-1 no grey | FAIL 11/11 | **FAIL 1/11** | Every translucent light plate over paper paints `#fefcf8`-`#fffcf9` (L 0.991-0.993, ΔE 0.007-0.008). The real Dialog paints `#faf7f4` (L 0.978, ΔE 0.008). The one red row is `.glass-opaque` = `--card` `#fdf5ec` (L 0.974, floor 0.975): common floor row 4's `--card`, not a solved token |
| M-2 text | FAIL 169/560 | **PASS 560** | Light: muted 4.54 (wash over black, the binding cell) to 12.95; fg 6.13-17.47. Dark: muted 6.12-12.20; fg 8.47-16.88. Dock light over c1: fg 9.69, muted 9.82 |
| M-3 non-text | FAIL 237/266 | **PASS 266** | Well perimeter 4.69-8.18. Dialog Close ring 8.13-8.81 in light (was 1.80), 3.90-3.96 in dark |
| M-4 dock register | FAIL 14/14 | **PASS 14** | Dock fg `#1c1917`, muted `#422d17`, ΔL_OK 0.100 in light; neither is a pole |
| M-5 live dock | FAIL 6/16 | **PASS 16** | 0 getImageData and 0 readPixels in all 8 live windows, default and fed; the dock stamps no sample state; dock rings ≥ 9.69 over c1 |
| M-6 separable | FAIL 14/19 | **FAIL 4/19** | Dark green: adjacent 0.016 / 0.017 / 0.030 / 0.046; every plate 0.058-0.146 from the page. Light red: adjacent 0.000 / 0.000 / 0.001 / 0.000, the proven conflict (§1.1) |
| M-7 halos | FAIL 8/8 | **PASS 8** | reach 18 px light, 17 px dark, at every host (Playwright WebKit 14 px everywhere) |
| M-8 calm | FAIL 8/8 | **PASS 8** | Light floating/overlay bleed 1.25 (at the bound), C 0.0207. Dark 1.02, C 0.0058. Dialog 1.01 |
| **W-D (own witness)** | FAIL 9/9 | **FAIL 4/9** | Leg 1 **byte-identical** (a clean `emit.mjs` re-run reproduces the file). Leg 2 under `--gate chromium,webkit`: M-1 2/21, M-2 8/1092 (Playwright WebKit muted 4.35-4.41), M-6 8/37, M-8 2/16 (Playwright WebKit bleed 1.43); M-3, M-4, M-5 and M-7 pass |
| W-A · W-B · W-C · W-E · W-F | all FAIL | FAIL 20/197 · 16/24 · 299/304 · 20/360 · 66/152 | Other families' witnesses. Reported as the harness prints them; not read further here |

**The intermediate run** (`cand`, before the dock tab fix, the perimeter stage and the Close ring route): M-3 FAIL 24/266, M-4 FAIL 14/14 (the inactive tab read the muted ink, so fg = muted), everything else as above. The perimeter sweep and M-4 re-read are in `p3/perim.log`.

**Playwright WebKit (paint-only, informational).**
- M-2: 8 rows under 4.5, all light muted over black or checker (4.35-4.41).
- M-8: light floating and overlay bleed 1.43.
- M-7: 14 px at every host (whole).
- Every dock row: UNMEASURED in Playwright WebKit.
- Real Safari: UNMEASURED (owner's safaridriver checkbox) in every row.

### 2.4 Cost

- **Code.**
  - *Removed:* 187 lines of tracked source, plus the 746-line sampler.
  - *Added:* `scripts/glass-solve/` (4 scripts, ~330 lines) and the 70-line generated file.
  - *Corpus:* 71 MB of PNG.
- **Time.** Emit 282-291 s on Metal; the shared battery ~20 min (§1.5).
- **Transmission, the real price.**
  - *Light:* T 0.40 content, 0.32 chrome, 0.23 dock, 0.06 dialog.
  - *Dark:* T 0.25 wash, 0.15 quiet, 0.05-0.06 resting to overlay.
  - *For scale:* HEAD's T is 0.78-0.94 (α .06-.22), and 7.0.0's 0.05-0.70 (α .30-.95, PORTFOLIO §1.6).

  The calibrated ladder under the as-written battery is thicker than 7.0.0 at every content rung.

### 2.5 Public API and consumer impact

**The public token surface.**
- *Deleted:* `--glass-veil-ink`, `--glass-veil-base`, `--glass-veil-step`, `--glass-saturate` as a written token (it is now emitted), and `GlassDock`'s `backgroundCanvas` prop. `useGlassBackdropLuminance` was never on the barrel.
- *Added:* `--glass-veil-pole` and `--glass-saturate-{wash,quiet,resting,floating,overlay,dock}`.
- *Unchanged:* `--glass-veil-{rung}`, `--glass-plate-{rung}` (still paintable colours, per X §3.4 #2), `--on-glass-muted` and `--ink-perimeter`, which keep their names and change writer.
- *Orphaned:* `--glass-backdrop-luma` loses its only writer; its `@property` registration and the knee are left for the full wave.

**Consumers,** by E-6 addendum in each consumer's tranche:

| consumer | impact |
|---|---|
| value.js | Holds 7.0.0. Its certified-ink model hard-codes rung alphas (`ink.ts:24-37`), so any generated ladder breaks that model unless it reads the generated file. Its field is seeded by the user's colour, so the corpus must sweep seed space or value.js's panes are outside the guarantee. The `data-glass-field-canvas` stamp stays dead. The reduced-transparency `!important` block is untouched by this probe |
| keyframes.js | `:background-canvas` (`ChromeDock.vue:370`) binds a deleted prop, so the binding goes. The hero at ceiling 0.1 lies inside the sampled band by monotonicity (argued). The dead tint-AA override is unaffected |
| fourier-analysis | The Configurator's `.glass-opaque` escape is no longer needed for M-2, since floating now paints `#fefcf8` over paper at muted 12. The strong-muted hand picks are dominated by the new muted, which reads 12.0 on paper. Prose and plot canvases are not in the corpus |
| chicago | The 0.62 dock floor retires: the solved dock is 0.768 light and 0.799 dark, per theme as X §3.4 #1 requires. The count-by-opacity muted register retires, since M-4 is green. Its photos are outside the corpus and unlicensed for it |

### 2.6 Chrome and Playwright WebKit behaviour

- **Chromium 149.** Every row above.
- **Playwright WebKit 26.5, paint-only.**
  - The plate paint is identical to Chromium within 1/255 (M-1 rows match to the hex).
  - Without blur, light chrome reads bleed 1.43, and M-8 fails there.
  - Ink rasterises lighter (`#442f1a` for `#422d17`), costing 0.13 of contrast at the binding cell.
  - `GlassDock` still crashes the page.
- **Real Safari.** UNMEASURED (owner's safaridriver checkbox).

## 3 · Real weaknesses, as named counterexamples

1. **The glass disappears (degenerate objective).** Under M-2-everywhere, the most transparent ladder the battery admits is light α 0.60-0.94 and dark 0.75-0.955. Overlay in dark paints `#000000` over the page. The objective is honest, and what it returns is not glass. *Counterexample:* light resting over the c1 aurora composites to near-white at T 0.40; the field's colour is 60% gone.
2. **The dark theme becomes smoke.** The transmission optimum is a black pole, so dark plates sit *below* the page in lightness (L 0.042-0.088 against 0.146). HEAD's lifted-card identity (`#352a22`) and the "a rung lifts" reading have no term in the objective. *Counterexample:* dark wash over paper `#030202` against page `#0b0a09`: the card is darker than the table it sits on.
3. **Light M-6 is unsatisfiable (M-1 × M-6).** Proven in §1.1, measured 0.000-0.001. The light ladder is five names for one paint, and hierarchy must come from blur, rim and shadow, which M-6 does not read.
4. **Zero margins.** Solving to the bound leaves light wash muted at 4.54 (Chromium) and light floating bleed at 1.25. A different engine (Playwright WebKit 4.41, 1.43) or font hinting flips them. The margins in §2.1 are owed.
5. **The muted register nearly collapses.** The M-4 floor makes muted `#422d17` read 12.0 on paper against fg 16.2 (ΔL_OK 0.100). The solver buys transmission by making muted nearly fg. *Counterexample:* fourier's and value.js's captions lose their subordinate register.
6. **A blank field passed as data.** `BLOB-c1` rendered nothing and entered the solve as a second paper. Without a liveness check the corpus can silently shrink.
7. **The corpus is the whole guarantee.** chicago's photos, fourier's prose and canvases, value.js's seed space and live camera video (X §3.1) are outside it. Content outside the corpus has no bound. The ladder's hostile grounds (black, white) make it safe in practice at these α, but that safety comes from the near-opacity of counterexample 1, not from calibration.
8. **Hand literals escape the solver.** The Dialog Close ring's 48% literal was invisible to the solve until the battery read 2.92-2.96. Every indicator colour in `src` must route through a solved rung, and nothing enforces that today.
9. **The dock's blur is not its own.** The dock plate reads `--glass-blur-resting-radius` (the ruled exemption), so the solved dock r cannot differ from resting's. Here both came out 6 px.
10. **W-D cannot go green today.** Its battery leg gates on Playwright WebKit, which paints no blur and crashes on the dock. Real Safari is the owed engine (§1.4).

## 4 · Open gaps

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- The band ruling (content over black and white, or not): the family's largest lever (α 0.600 → 0.113 in light content), and the owner's.
- The M-1 × M-6 conflict in light: an owner ruling on either M-1's radius, M-6 over paper, or ladder separation by non-paint means.
- The solve margins (4.65, 1.20) are specified, not yet run.
- The field well stays the opaque `--input-on-glass` in this probe; common floor row 5 (the well as a rung) is not done.
- The `--glass-backdrop-luma` registration and knee, and the demo stories that bind `backgroundCanvas`, are left for the full wave.
- The consumer fields (value.js seed sweep, keyframes' 0.1 hero, fourier's prose) are not in the corpus; chicago's photos cannot enter it.
- Dock rung per-engine calibration: impossible in Playwright WebKit (crash).
- The portfolio's −43% blur claim does not reproduce (−8% to −30% here); the metric difference is unresolved.
