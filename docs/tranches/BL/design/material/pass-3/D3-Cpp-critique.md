# D3 · pass 3 · C″ · critique (adversarial, judged on the fixed P2-6.3 checklist)

| field | value |
|---|---|
| seat | D3 pass 3, CRITIC for route C″ (`REGISTRY.md` P2-6.2 step 4). Did not author the route. Re-runs the prototype's numbers on its own worktree, judges C″ on P2-6.3's 48 rows (24 core + FL-1..FL-16 + C-1..C-8) and floor v2 on its 44 (24 core + FL-1..FL-16 + N-1..N-4) from the same runs. Adds no row |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree `.claude/worktrees/bl/D3/p3/Cpp-crit/wt` cut at the checkout's HEAD `2016e5b9`; `floor-v2.patch` then `D3-Cpp-proto.patch` applied clean (89 files, +1146 / −2242); the route patch's sha256 `b8b632fb2510b838…` matches the prototype's record. Floor v2 alone: a copy of that tree with the route patch reversed by `patch -R -p1` (no `glass-content-bound` in its CSS; the route build has it). Worktree removed at the end |
| engines | Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, the gate) and **Playwright WebKit 26.5** (paint-only: no `backdrop-filter`; dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-min load 84-461 through the seat (other seats: D1, D2, D4, D5 harnesses). It sits beside every run below. No timed cell read differently from the prototype's except `lagonly` (§3), whose red reproduces at a different magnitude |
| fences | no tracked-source edit, no git write in the checkout; the checkout's `src` read clean (`git status --porcelain -- src demo tests DESIGN.md` empty) after a `git apply -R` run from inside `.claude/` resolved to the repo top and touched nothing. Writes in the checkout: this file, `D3-Cpp-crit-probe.mjs`, `Cpp-crit-records/`, `glance-Cpp-crit/` |
| owner rulings | none arrived. The P2-5 pass-3 defaults stand: Q-1 (a) with (c) reported, Q-3 (a), Q-6 (a), Q-7 (a)+(b), Q-8 (c), Q-11 (a), Q-12 (a), Q-13 (a). Rows waiting on Q-1, Q-11 or Safari are reported at the default, never passed by ruling |

Short citations: `spec` = `D3-Cpp-spec.md`, `proto` = `D3-Cpp-proto.md`, `FV2` = `FLOOR-V2.md`, `rec/` = `Cpp-crit-records/`.

---

## 0 · In brief

1. **Every number the prototype gated on reproduces** (§1). The claimed battery reads the prototype's verdicts row for row; the unclaimed battery reads FV2 §4.2's row for row; the computed licence agrees between engines on 60 of 60 cell pairs; every plant reds.
2. **C-7 FAILS, so C″ BANKs** by the row's own text: claimed light c1 wash T_c1 **0.121 → 0.211, ×1.74** Chromium (×1.76 Playwright WebKit; dark ×1.40). The ratio is P/(P − g) = 0.9736 / 0.5619 = 1.733 at the default field; no form that keeps C-2 reaches ×2.
3. **Three counterexamples the prototype scored as PASS** (§2):
   - **C-4.** A colour retune that reaches the claim through `<body>` (an inline custom property or a class toggle) is neither followed nor refused. Dark `--background` → the wash sits **ΔE 0.024, ΔL +0.022** from the retuned page, stamp `live`, 0 warnings: the prototype's own `stalepage` red, on the shipped route. A `--foreground` retune the same way compresses the hierarchy to +0.062 light with stamp `live` and 0 warnings. The resolver watches only `<html>` class/style and `<head>`.
   - **FL-7.** Under a claim, held chrome sheds below `--glass-bound`. The held dock paints α **0.5239** against the chrome bound 0.8731 (dark, black), composite at x 278 `#2e251e` → `#1c1612`, ΔE 0.067, both engines; light c1 0.8111 against 0.891, ΔE 0.037. Q-3 (a), the route's own spec (§1.1, §1.8) and FL-7's text keep chrome at the bound.
   - **Row 20 (prose).** Three touched files say chrome does not move (`glass.css:37-38`, `groundClaim.ts:5`, `DESIGN.md:522`); FL-7's counterexample contradicts each. FL-7 and row 20 share one cause and close with one decision.
4. **Count.** C″: **35 of 48** (0.73), against the prototype's 38. Floor v2: **34 of 44** (0.77). Neither converges: both carry the owner-gated rows (M-6 on Q-1, M-1x and the gestalt on Q-11) and floor v2's own reds (M-4 dark capsule, M-9 dark veil, O-66 G2/G3, the inherited O-87 census).

## 1 · What I re-ran, and whether it reproduced

| run | command (worktree `wt`, `D3_OUT=…/Cpp-crit/out`) | time | load (1-min) | result against the prototype |
|---|---|---|---|---|
| claimed battery | `run.mjs wt --label cpp --demo --query claim=honest` | 14:25:37-15:34:27 | 97 → 204 | identical verdicts: RAW 48, M-1 11, M-2 938, M-2m 430, M-3 354, M-5 20, M-7 8, M-8 8, STACK 24, W-S 24 PASS; M-2h 2/68, M-4 7/168, M-6 6/30, M-9 1/20, O-66 5/5, W-A 2/216, W-C 3/362 FAIL. M-1x REPORTED 48/66 grey (`rec/results-cpp/`, `rec/baseline-cpp.md`) |
| unclaimed battery | `run.mjs wt --label cpp0` | 15:34-16:32:44 | 204 → 443 → 125 | = FV2 §4.2: W-A 216, M-2 938, M-2m 430 (drift worst 5.16), M-2h 2/68, M-4 7, M-6 7/30, M-9 1, O-66 5/5, W-C 6 (`rec/results-cpp0/`) |
| C-7 | `D3-Cpp-tc1.mjs caps/cpp caps/cpp0` | 16:33 | 120 | wash ×1.74 / quiet ×1.71 / resting ×1.80 / card ×1.65 light; dark ×1.29-1.40; chrome ×1.00. Playwright WebKit light wash ×1.76 (`rec/tc1.log`) |
| computed licence | `D3-Cpp-proto-computed.mjs` | 17:08-17:12 | 325 → 230 | checker and hostile claims compute 0.891 / 0.8731 = `--glass-bound`; c1 0.8111 / 0.8277; fieldout `unpublished` + 1 warning; Chromium = Playwright WebKit on 60/60 pairs (`rec/computed.log`) |
| plants | `D3-Cpp-plants.mjs build wt` + `capture`, each witness | 16:33-17:07 | 114 → 345 → 326 | every red reproduces (§3) |
| demo claim | `D3-Cpp-demo-claim.mjs` | 14:58 | 127-149 | `published`, content 0.494346 light / 0.695443 dark, bound 0.890991 / 0.87311, 0 warnings, both engines; floor v2 demo: no claim (`rec/demo-claim.log`) |
| glance | `glance.mjs` floor v2 → C″, `--story-claim`, both engines; `--ground aurora --route-query claim=honest` | 17:12-17:19 | 230 → 442 | story-claim region found both engines; chrome crops 0.00% (C″ moves no chrome at rest); story 5.57% / 3.70% Cr (`rec/glance-*.log`, `glance-Cpp-crit/`) |
| unit arm under `liestamp` | `vitest run tests/composables/glass/groundClaim.test.ts` on a copied tree | 14:41 | 105 | planted: 1 failed, "expected 'published' to be 'unpublished'"; unplanted 7/7 (`rec/unit-liestamp.log`) |
| census | W-0.11 appendix A `lighting-census.mjs wt` | 14:4x | — | `stacked=2 halo=2 blur=0 open=4`, exit 1: floor v2's exactly (`rec/lighting-census.txt`) |
| N-3 | `FV2-plants.mjs <fv2 dist> --only diag-held-noveil` + `m2-held-window.mjs` | 17:19-17:21 | 459 → 264 | with the focus veil hidden, held dock flat 0.894 / 0.878 per column (`rec/n3-noveil.log`) |
| my probes | `D3-Cpp-crit-probe.mjs <cpp dist> held` / `retune` | 14:27-14:34 | 84-113 | §2 (`rec/held.log`, `rec/retune.log`) |

## 2 · Counterexamples

### 2.1 · C-4: a colour retune by a path the resolver does not observe is a silent desync

`groundClaim.ts` re-resolves on claim, on a `glass-field` event and on one `MutationObserver` of `<html>` class/style and `<head>` children. H3-8's retunes arrive as a `<head>` stylesheet, so the battery only ever exercises the observed path. P2-6.3 C-4 names the follow mechanism as "a relative-colour read", which follows any cascade change; C″ follows by a JS read on events instead.

Probe: the ladder over paper under a page claim; H3-8's own values applied after load four ways (`rec/retune.log`, Chromium, 14:32-14:34, load 85-113; text hidden by inline style so the resolver is not re-triggered by the instrument):

| retune | path | stamp | `--glass-page-hi` | warnings | paint |
|---|---|---|---|---|---|
| dark `--background` → `hsl(220 16% 13%)` | `<head>` (H3-8) | `live` | 0.0398 → **0.1218** | 0 | wash `#352a22` on page `#1c1f26`, ΔE 0.065: followed |
| same | `<body>` inline | `live` | **0.0398 (stale)** | 0 | wash `#262327` on `#1c1f26`, **ΔE 0.024, ΔL +0.022** |
| same | `<body>` class (rule in `<head>` before the claim) | `live` | **0.0398 (stale)** | 0 | **ΔE 0.024, ΔL +0.022** |
| light `--foreground` → `oklch(0.42 0.02 56)` | `<head>` | `desync` | → 1 (bound) | 1 | refused loud |
| same | `<body>` inline / class | **`live`** | 0.9807 | **0** | fg L 0.42 against muted 0.481: +0.062, no word |
| dark `--foreground` → `oklch(0.86 0.01 68)` | `<body>` inline / class | **`live`** | 0.0398 | **0** | fg 0.86 against muted 0.79: +0.070, no word |

The dark `--background` row is exactly the prototype's `stalepage` plant reading (proto §5: ΔE 0.024, which proto and spec both call red), now on the unplanted route. Playwright WebKit's computed tones before the frame are stale the same way; its painted frame caught up only because `page.screenshot` in Playwright WebKit adds to `<head>`, which the resolver observes (an instrument fact, §5).

### 2.2 · FL-7: held chrome sheds below `--glass-bound` under a claim

`veil.css:69` sets every plate's held floor to `--glass-content-bound`, chrome included, so a held chrome plate inside a claim sheds to `max(0.6 × rest, content bound)`. Probe: the held scene with its dock, pointer pressed and held on the dock's Slider as `capture.mjs` does, computed `--glass-veil-rung` and the dock's composite at x 278, left of the Slider and its focus veil (`rec/held.log`, 14:27-14:29, load 84-96):

| cell | held dock rung, claimed / unclaimed | floating-held | dock composite x 278, claimed / unclaimed | ΔE |
|---|---|---|---|---|
| dark black | **0.5239** / 0.8731 | 0.5239 / 0.8731 | `#1c1612` / `#2e251e` | **0.067** (both engines) |
| light c1 | **0.8111** / 0.891 | 0.8111 / 0.891 | `#fcd6c4` / `#fde4d8` | **0.037** Cr, 0.032 WK |
| dark c1 | 0.8277 / 0.8731 | 0.8277 / 0.8731 | `#56301d` / `#4d2e1f` | 0.020 |
| light white | 0.5346 / 0.891 | 0.5346 / 0.891 | `#faf6f3` / `#fdf7f2` | 0.005 |
| light black, dark white | the bound / the bound | — | identical | 0.000 |

The run's own M-2h halo leg sees it. Playwright WebKit dark reads the held dock flat at 0.816-0.831 against a resting 0.875 (it paints no focus veil frost, `rec/results-cpp/M-2h.log`), and Chromium dark at x 278 reads 0.820 against floor v2's 0.878 (`rec/results-cpp0/M-2h.log`). Proto §3 and §7 put that WebKit row down to the two-ground estimator. The estimator does mix two α, but the plate it reads really does thin: held over black it is 0.5239, in paint.

Every held ink stays ≥ 4.5 (M-2 938; release legs worst 4.70), so this is not a legibility defect. It breaks FL-7's text ("held never sheds below the bound"), the Q-3 (a) default the route says it builds, and the route's own invariant. The prototype found it (proto §8.1) and chose not to build the one declaration that cures it (a chrome floor at `--glass-bound`).

### 2.3 · Row 20: three touched files state the opposite of §2.2

- `src/styles/tokens/glass.css:37-38`: "Chrome, the dock and the dialog do not move."
- `src/composables/glass/groundClaim.ts:5`: "chrome does not move."
- `DESIGN.md:522`: "Chrome and the dialog never move."

All three are false while chrome is held under a claim (§2.2). Proto §11 corrected only the MIGRATION text. This closes with FL-7: either the chrome floor goes to `--glass-bound` (prose then true), or the three lines say "at rest".

## 3 · Plants re-run (Chromium; `rec/plants/`, 16:34-17:07, load 104-345)

| plant | witness | measured red | proto |
|---|---|---|---|
| `reach` | M-2 / M-3 | wash muted **2.69** c1, **2.36** black; perimeter rows 43 red | 2.69 / 2.36; 43 |
| `strong` | M-2 | static muted **3.56** black | 3.56 |
| `heldfloor` | M-2 | wash-held muted **1.77** light black; fg 2.57 / muted 1.65 dark white | same |
| `bound` | M-2 | floating fg **1.64**, capsule muted 1.21 light black | same |
| `rootinit` | M-2 | capsule fg **1.10**, 120 rows | same |
| `rootpage` (green control) | M-2 | 34 FAIL rows, every one MISSING; 0 measured under 4.5 | green |
| `lagonly` | M-2m | step light aurora50 wash·muted **4.19** at 85 ms | 3.74 at 27 ms (red reproduces, magnitude differs; load 300+) |
| `nolift` | M-6 | dark wash `#0b0a08` ΔE **0.002** from the page | 0.002 |
| `nostamp` | W-S | 8/24 (fieldtwo acts, no stamp) | 8/24 |
| `liestamp` | W-S / probe / unit | W-S 24 PASS (blind, as proto §7); probe reads `published` with live 0 on fieldout and fieldgone; **unit arm red** | — / probe; unit arm not run by proto |
| `lastwriter` | W-S, M-2 | wash `#ffbf9d` light / `#8f441d` dark, W-S 6/12 | same |
| `nocheck` | W-C | wash…card +0.062 light, 30 rows | same |
| `stalepage` | M-6 (variant view) | dark wash ΔE **0.024** from `#1c1f26` | 0.024 |
| `fieldfalse` (contract limit) | M-2 | 46/208 rows | — |

## 4 · The checklist (P2-6.3), both routes

A row passes only green in Chromium in both themes with a plant that reds it. Owner-gated rows stay open at their default.

### 4.1 · Core (24)

| # | row | C″ (claimed run) | floor v2 (unclaimed run) |
|---|---|---|---|
| 1 | RAW | PASS 48 | PASS 48 |
| 2 | M-1 | PASS 11 | PASS 11 |
| 3 | M-1x | **OPEN (Q-11)**: 48/66 grey | **OPEN (Q-11)**: 48/66 grey |
| 4 | M-2 (R1/R3, `-strong`, held, H-10, H3-6) | PASS 938; c1 wash muted 4.84, `-strong` 6.30; plants §3 | PASS 938; FV2 §5 plants (`bound`, `heldfloor` re-run on the same paint) |
| 5 | M-2m, 100 s drift | PASS 430; drift worst 4.81 at 18.0 s Cr (WK 4.59 at 22.0 s); `lagonly` red | PASS 430; drift worst 5.16 |
| 6 | M-3 | PASS 354; `reach` red | PASS 354 |
| 7 | M-4 signed | **FAIL** 7: dark capsule `#e9e6e2` / `#d5d0c8` +0.067 | **FAIL** 7, the same row |
| 8 | M-5 | PASS 20 | PASS 20 |
| 9 | M-6 | **OPEN (Q-1)**. Under (a): signed leg green (wash ΔE 0.064, ΔL +0.064; `nolift` red). Dark content adjacency 0.031 / 0.029; dark chrome 0.008 / 0.007 and light 0.003-0.004 red, as (c) would read | **OPEN (Q-1)**. Signed leg green; dark 0.007 / 0.004 / 0.007, light 0.001-0.004 |
| 10 | M-7 | PASS 8 | PASS 8 |
| 11 | M-8 | PASS 8 | PASS 8 |
| 12 | M-9 dark veil | **FAIL**: `#0b0a09` → `#0d0b09`, ΔL +0.006 | **FAIL**, the same |
| 13 | T | reported (§1) | reported: light 0.110 / 0.075 / 0.035, T_c1 ≤ 0.139 |
| 14 | held release window | PASS: worst dock-held·muted-tab 4.70 (light c1) | PASS |
| 15 | O-66 G2 | **FAIL** 0.057 light | **FAIL** |
| 16 | O-66 G3 | **FAIL** ΔL −0.0330 | **FAIL** |
| 17 | own witness | **FAIL**: W-C 3/362 (Dialog under `retune-fg` +0.062, capsule +0.067 under `retune-bg` dark) **and** §2.1 | PASS: W-A 216 |
| 18 | both engines under H3, `+shim` | PASS | PASS |
| 19 | a plant per green | PASS (§3; C-3's truth leg reds the unit arm) | PASS (FV2 §5; `diag-held-noveil` re-run for N-3) |
| 20 | prose sweep | **FAIL**: §2.3 | PASS (spot-check `control-bit.css:116-133` reads the history, 0.52 / 0.60) |
| 21 | FL-13 addenda | PASS (text) | PASS (text) |
| 22 | O-87 | **OPEN**: census `stacked=2 halo=2 blur=0 open=4`, inherited; C″ adds no layer (frames) | **OPEN**, the same census |
| 23 | gestalt, O-62 | **OPEN (Q-11)** (§6) | **OPEN (Q-11)** |
| 24 | STACK | PASS 24 | PASS 24 |

C″ core: 14 pass, 10 open. Floor v2 core: 16 pass, 8 open.

### 4.2 · Floor (16)

FL-1..FL-16 as built in `floor-v2.patch`, with FV2 §5's plants: **floor v2 16 / 16**. C″: **15 / 16**. **FL-7 fails** (§2.2): under a claim, a held chrome plate sheds to 0.5239 against `--glass-bound` 0.8731. C″'s other changes to the floor hold: FL-4 (`rootinit` red, `rootpage` green), FL-5 (`bound` red).

### 4.3 · C″ route rows (8)

| row | status | evidence |
|---|---|---|
| C-1 every ink solved, or the licence at the lightest | **PASS** | the licence is FL-5's own ink; M-2 938 claimed, `-strong` 6.30 (c1) / 6.32 (black), wells muted 5.12-5.27 (c1); `reach` and `strong` red |
| C-2 any-input tones paint `--glass-bound` | **PASS** | checker and hostile claims compute 0.891 / 0.8731 both engines; `rootinit` red |
| C-3 dead publication stamped, stamp true | **PASS** | fieldout and fieldgone: `unpublished` + 1 warning, ΔE 0.000; `nostamp` W-S 8/24; `liestamp` reds the unit arm |
| C-4 colour retunes followed or refused loud | **FAIL** | §2.1: dark wash ΔE 0.024 from the retuned page and a +0.062 hierarchy, stamp `live`, 0 warnings, via `<body>` |
| C-5 Q-6's ruling on thinned wells | **PASS** under (a) | light c1 perimeter all ≥ 3.0; `reach` reds 43 rows |
| C-6 two Auroras and an unmount | **PASS** | fieldtwo `published` with the worst of both; fieldgone back to the bound; `lastwriter` red |
| C-7 T_c1 ≥ 2 × floor v2 | **FAIL** | ×1.74 Cr, ×1.76 WK |
| C-8 the demo's claimed region | **PASS** | region found both engines, `published`, 0 warnings; floor v2 demo claims none. The crop delta (40.64% / 22.65% Cr) mostly measures two added caption lines that move the frame's plates about 70 px down, not paint (§5) |

### 4.4 · Floor v2 route rows (4)

| row | status | evidence |
|---|---|---|
| N-1 Q-1's ruling built | **OPEN (Q-1)** | default (a) built, (c) reported |
| N-2 Q-11's ruling built | **OPEN (Q-11)** | REPORTED 48/66 |
| N-3 the dock's held halo | **PASS (attributed)** | 0.815…0.894 / 0.802…0.878 with the veil; flat 0.894 / 0.878 with `.glass-focus-veil` hidden |
| N-4 the minor-split reading recorded | **PASS** | `MINOR-SPLIT.md` §0: G1, G4-G7 PASS, G2, G3 FAIL |

### 4.5 · Count

| route | core | floor | route | total | conv. |
|---|---|---|---|---|---|
| C″ | 14 / 24 | 15 / 16 | 6 / 8 | **35 / 48** | **0.73** |
| floor v2 | 16 / 24 | 16 / 16 | 2 / 4 | **34 / 44** | **0.77** |

The prototype counted C″ 38 / 48. The three rows that move are C-4, FL-7 and row 20; the last two share one cause.

## 5 · Pass 4 (new classes, not scored)

- **GLANCE crop deltas do not separate layout from paint.** The C-8 crop compares a fixed rect across two demos whose copy differs, so the claimed frame's 40.64% includes the plates moving. A route that edits story copy inflates its own delta.
- **Playwright WebKit's `page.screenshot` adds to `<head>`**, which the claim resolver observes. A WebKit capture can therefore show a claim caught up that the page itself left stale. Chromium (CDP capture) does not.
- **The claim's `--glass-ground-e` reads NaN by `getComputedStyle`** on `<main>` in both engines (an unregistered computed `calc` returns its text). Every probe reads `--glass-content-bound` instead; no row depends on it.

## 6 · The owner glance (`glance-Cpp-crit/`; base floor v2, route C″)

- Claimed light c1 wash `#fee3da` → `#fed5c8`, quiet `#ffebe1` → `#fee2d6`, muted 5.39 → 4.84 (`glance-Cpp-crit/glance-chromium-cpp-claimed-aurora.json`, `rec/results-cpp/M-2.log`): a little more salmon, still a card, not C′'s `#ff8266`. Dark wash `#4e2d21` → `#582f21`.
- The story: the claimed frame's plates read faintly peach over the ceiling-0.6 field; every other plate and all chrome at rest are unchanged (0.00%).
- O-87: no layer, shadow, gleam or blur added. The inherited modal stack and dock glow remain floor v2's.
- O-62: the light veil over black is still `#e2dcd7` (M-1x). C″ claims nothing over black in the demo. Under a claim, held chrome over black thins (§2.2), which changes what the owner sees while a control is held.

## 7 · Verdict

**C″: BANK, 0.73.** C-7 is structural (P/(P − g) at the default field), so the route banks by its own row; the claim, resolver and publication are a measured component. Before it is reused, the component owes C-4 (a follow mechanism that sees every cascade path: the relative-colour read P2-6.3 names, or a refusal on any change it cannot see) and the FL-7 / row 20 decision on held chrome.

**Floor v2: 0.77, not converged.** Its open rows are owner-gated (Q-1: M-6, N-1; Q-11: M-1x, gestalt, N-2) or its own: M-4 dark capsule +0.067, M-9 dark veil +0.006, O-66 G2/G3 and the inherited O-87 census.

## 8 · Reproduce

```sh
B=.claude/worktrees/bl/D3/p3/Cpp-crit; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-3
git worktree add --detach $B/wt HEAD && ln -s $PWD/node_modules $B/wt/node_modules
git -C $B/wt apply $PWD/$P/floor-v2.patch && git -C $B/wt apply $PWD/$P/D3-Cpp-proto.patch
export D3_OUT=$PWD/$B/out
node $H/run.mjs $B/wt --label cpp --demo --query claim=honest && node $H/run.mjs $B/wt --label cpp0
node $P/D3-Cpp-tc1.mjs $D3_OUT/caps/cpp $D3_OUT/caps/cpp0
node $P/D3-Cpp-crit-probe.mjs $D3_OUT/builds/cpp/dist held
node $P/D3-Cpp-crit-probe.mjs $D3_OUT/builds/cpp/dist retune
node $P/D3-Cpp-plants.mjs build $B/wt && node $P/D3-Cpp-plants.mjs capture $D3_OUT/builds/cpp/dist   # then each witness on caps/pl-<id>
# floor v2 alone: copy $B/wt without .git, `patch -p1 -R < $P/D3-Cpp-proto.patch` (not `git apply -R` from inside the repo), build.mjs --label fv2 --demo
git worktree remove --force $B/wt
```
