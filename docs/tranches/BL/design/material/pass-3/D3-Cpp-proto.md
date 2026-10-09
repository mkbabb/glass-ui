# D3 · pass 3 · C″ · prototype (floor v2 + a consumer claim + the claim's licence)

| field | value |
|---|---|
| seat | D3 pass 3, PROTOTYPE for route C″ (`REGISTRY.md` P2-6.1, P2-6.2 step 4). Builds `D3-Cpp-spec.md` on the real source over floor v2 and runs the full H3 battery claimed and unclaimed in both engines, with the spec's plants, the recalc probe and the owner glance |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree `.claude/worktrees/bl/D3/p3/Cpp-proto/wt` cut at the checkout's HEAD `00f191d8`, `floor-v2.patch` applied clean. The task named `8059b373`; `git diff --stat 8059b373 HEAD -- src demo tests DESIGN.md package.json scripts` is empty (also at `2527271b`, where the checkout stood when this file was written). A second worktree `…/fv2wt` (HEAD + floor v2 only) gave the floor's library build, the floor specimens for recalc and glance, and the `git apply --check`. Both were removed at the end |
| resumed | an earlier C″ prototype seat stopped mid-run (session limit) and left an unapplied route diff, `D3-Cpp-plants.mjs`, `D3-Cpp-proto-computed.mjs` and the specimen change in `../harness/`. This seat reviewed that diff against the spec line by line, applied it, struck two stale `DESIGN.md` passages (§1), and re-ran everything below from scratch. No number from the stopped seat is used |
| patch | `D3-Cpp-proto.patch` (this folder): `git diff HEAD --binary -- src demo tests DESIGN.md` of the worktree over HEAD + floor v2. 18 files, +883 / −72, 73,371 B, sha256 `b8b632fb2510b838…`. `git apply --check` clean on HEAD + `floor-v2.patch` |
| engines | Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, the gate) and **Playwright WebKit 26.5** (paint-only: no `backdrop-filter`; dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-min load 100-715 through the seat, from other seats (D1, D2, D4, fourier, value.js dev servers). It sits beside every run below. No timed cell went red, so nothing needed a load re-run. Two unit files timed out in a 10 s `afterAll` hook at load 707 and passed 12/12 on re-run (NOT-REPRODUCED) |
| fences | no tracked-source edit and no git write in the checkout. Writes in the checkout: this file, `D3-Cpp-proto.patch`, `D3-Cpp-tc1.mjs`, `D3-Cpp-variant-view.mjs`, `D3-Cpp-demo-claim.mjs`, `D3-Cpp-recalc.sh`, `Cpp-proto-records/`, `glance-Cpp/`, and in place in `../harness/`: `HARNESS.md` (three limits, §7) plus the stopped seat's `specimens.mjs` claim-through-the-resolver switch, which this seat kept. Builds and captures: `.claude/worktrees/bl/D3/p3/Cpp-proto/out2` |
| owner rulings | none have arrived. The P2-5 pass-3 defaults are built: Q-1 (a) with (c) reported, Q-3 (a), Q-4 (a), Q-6 (a), Q-7 (a)+(b), Q-8 (c), Q-9 (a), Q-11 (a), Q-12 (a), Q-13 (a) |

Short citations: `spec` is `D3-Cpp-spec.md`, `FV2` is `FLOOR-V2.md`, `H3` is `H3.md`, `rec/` is `Cpp-proto-records/`.

---

## 0 · In brief

1. **C-7 fails on the full battery, as the spec predicted, so C″ banks.** Claimed light wash over the c1 aurora paints T_c1 **0.211** against floor v2's **0.121**: **×1.74** in Chromium, ×1.76 in Playwright WebKit. Dark is ×1.40 (0.202 / 0.144). Quiet, resting and card read ×1.65-1.80. The row asks for ×2 (§4). By P2-6.3 row C-7, **C″ downgrades to BANK, and the claim, its resolver and the publication are banked as a component**, built and measured here.
2. **Everything else the route owns is green and planted.** C-1..C-6 and C-8 pass in Chromium in both themes, and each green turns red on a plant that removes its mechanism (§3, §5).
   - Claimed, the H3 battery reads RAW 48, M-1 11, M-2 938, M-2m 430 (the 100 s drift included), M-3 354, M-5 20, M-7 8, M-8 8, STACK 24 and W-S 24, all PASS.
   - The `-strong` run on the claimed light c1 wash reads 6.30, where C′ read 3.18. The claimed muted is 4.84, and the any-input claim computes `--glass-bound` exactly (0.8910 / 0.8731) in both engines.
3. **Unclaimed, the route is floor v2 row for row.** Every verdict matches FV2 §4.2, and W-A passes 216 (§2).
4. **The open rows are the floor's or the owner's, plus C-7.** Floor v2's own: M-4 (dark capsule +0.067), M-9 (dark veil +0.006), O-66 G2/G3, the O-87 inherited shadow stack, and three W-C rows outside any claim. The owner's: M-6 (Q-1), M-1x and the gestalt (Q-11). Every Safari cell is unmeasured.
5. **Three things the spec did not say, measured:**
   - Under a claim, a **held chrome plate sheds to the claimed licence** (spec §1.5 by design). Dark over black, `floating-held` computes α **0.524** against the chrome bound 0.873, and M-2 stays green. At rest, chrome never moves.
   - The **claimed recalc** costs ×1.06-1.56 in Chromium and ×1.18-1.39 in Playwright WebKit. The spec estimated ×1.0-1.25 (§6).
   - The battery's **two-ground α estimator** (W-A leg 4, T's pole, M-2h's halo leg) is not valid under per-stand claims. Its claimed reds there are instrument artefacts, cross-read from computed style (§3, §7).

## 1 · What is built (line numbers in HEAD + floor v2 + the patch)

| part | where | what it does |
|---|---|---|
| the licence | `src/styles/tokens/glass.css:290-382` | One layered rule on `:root, .dark, [data-glass-ground]` holds FL-5's formula with the ground as a parameter: `--glass-ground-e`, the derived dark lift (`--glass-veil-lift`, gap `--glass-lift-gap: 0.065` at `:48-50`), `--glass-content-bound`, and the content rungs wash/quiet/resting. `--glass-bound: var(--glass-content-bound)` at the root (`:271`). Chrome rungs keep `--glass-bound`. Every tone is registered, non-inheriting, initial at the any-input pole (`:395-412`), so a bare attribute, an out-of-scope publication and a refused claim all compute the bound |
| the claim | `[data-glass-ground]` and `[data-glass-ground="field"]` (`:357-381`) | page tones → ground tones; a field claim mixes the publication with the page at the field's ceiling. Q-8 (c): registered lag twins on the panel spring, and the solve reads the worse of a tone and its twin |
| the resolver | new `src/composables/glass/groundClaim.ts` | `claimGlassGround(el, "page" \| "field" \| colours)` and `useGlassGround`. Reads `--background` as a colour (C-4 followed), checks `--card` against `--card-l` and the signed fg/muted split (C-4 refused loud: `desync`, warn once, tones dropped to the bound), and stamps `data-glass-ground-state` (`live`, `published`, `unpublished`). It re-runs on the `glass-field` event and on one shared `MutationObserver` (`<html>` class/style, `<head>` children); never per frame. It refuses the root element |
| the publication | new `src/composables/glass/groundTone.ts`; `useAurora.ts` (`groundHost`, `groundCeiling`, published on mount before the `"css"` return, re-published with `flush: "sync"`, disposed on unmount); `Aurora.vue` (host = root's parent, ceiling 1 under reduced transparency); `auroraFallbackGround.ts` `auroraGroundTones` (16 × 16 lattice, `null` for an image source) | per host, worst of its substrates; `--glass-field-live: 1` replaces C′'s attribute (E-1); `glass-field` dispatched on every change |
| held floor | `glass/veil.css:69` | `--glass-veil-floor: var(--glass-content-bound)` |
| the clock | `glass/ladder.css` five rungs | `background-color` leaves the rung transitions; the shadow keeps its clock |
| demo claim (C-8) | `demo/stories/substrates/glass-material.vue` | the first `ShowcaseFrame` claims `"field"` through `useGlassGround` |
| exports | `src/composables/glass/index.ts`, `src/index.ts`, `aurora/index.ts`, `tests/public-surface.spec.ts` | spec §4's additive names |
| tests | new `tests/composables/glass/groundClaim.test.ts` (7), `groundTone.test.ts` (7); `glass-subtlety.test.ts` +1 arm (the claim solve, C-2 at both poles, no claim rule declares the bound or a chrome rung) and the veil-floor and rung-source arms re-pointed | — |
| prose (row 20) | `glass.css` §8 header and the root block, `veil.css` recipe and floor, `ladder.css` clock, `grasp.css:120-127`, `useAurora.ts`, `Aurora.vue`, `DESIGN.md` tier table and plate register | **added by this seat:** `DESIGN.md`'s "N7 dock-blur perceptual audit" (a dock at `0px` blur and `--glass-bg-dock` 32%, tier radii 1/3/12/16/24) is struck, and the `<Surface>` paragraph's "65% background opacity + 12 px backdrop-blur + 1.05 saturation" now names the rung (content bound + 2 steps, 12 px, `saturate(var(--glass-saturate))`). Both described a material that no longer exists |

Not in C″ (struck from C′, spec §0 item 2): no per-plate ink solve, no `@utility glass-ink`, no `--foreground-l` split, `--muted-foreground` untouched.

## 2 · Toolchain and the bundle datum (worktree; cacheDir `.vite-cpp`, `.vite-cpp-demo`; `rec/toolchain/`)

| step | result | time, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 11:21-11:23, 125-369 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 after the library build (before it: `@mkbabb/glass-ui/fourier-math` unresolved, which needs `dist`) | 11:25-11:26, 471-601 |
| library build | exit 0, 25 s | 11:25, 471 |
| `dist-demo` | exit 0 | 11:26, 634 |
| full units `vitest run --testTimeout 240000` | 239 files: **237 passed, 2333 tests passed, 10 expected-fail, 1 skipped**. 2 files failed in an `afterAll` hook (10 s `browser.close()`), `slider.size-tokens` and `GlassDock.stagger` | 11:26-11:27, 707 |
| the two files re-run (`--hookTimeout 240000`) | 12/12 passed: NOT-REPRODUCED | 11:27, 715 |
| the route's own files (`tests/composables/glass/`, `glass-subtlety`, `public-surface`) | 9 files, 183/183; the two new files 14/14 | 14:12, 156 |
| package verifier | **`G-BUNDLE-RATCHET` shrink 2,913,597 < 2,919,057** (the floor's owed rebind) | 11:27 |
| verifier, every later leg (`.bundle-ratchet` set to the candidate in the worktree, then restored; not in the patch) | `terminal: CLEAN`; claims 193; declarations 456 (floor 454); css 124; roster PRESENT 289 = 289; install exit 0; Bundler, Node16, NodeNext exit 0 (`rec/toolchain/verify-legs.json`) | 11:28 |

**The bundle datum.** Unpacked content is **2,913,597 B**, against floor v2's 2,900,254 (FV2 §7): **+13,343 B**. Against the floor's library build from `fv2wt`, all `dist` CSS concatenated is 461,931 B raw / 161,357 B gzip −9, against 459,740 / 160,876: **+2,191 B raw, +481 B gzip**. C′ added +4,266 / +1,036. JS is +7,177 B raw. A deliberate rebind from a committed-tree build is owed at landing, as for the floor.

## 3 · The H3 battery, claimed and unclaimed (Chromium gate; `rec/results-cpp/`, `rec/results-cpp0/`, `rec/baseline-cpp*.md`)

| run | command | time | load |
|---|---|---|---|
| claimed `cpp` | `run.mjs <wt> --label cpp --demo --query claim=honest` | 11:29:30-12:24:43 (main capture 1883 s; retunes 64 / 84 / 61 s; `noclaim` 199 s) | 565 at start, 440-614 throughout |
| unclaimed `cpp0` | `run.mjs <wt> --label cpp0` | 12:25:02-13:15:56 (main 1914 s; retunes 85-91 s; `noclaim` 200 s) | 592 → 274 |
| tables | `baseline.mjs` on each | 13:39-13:50 | 180-310 |

Under `claim=honest` every claimed `<main>` is claimed through the library's resolver (`../harness/specimens.mjs`): paper → `"page"`, the aurora → `"field"`, a stand → its colours, the hostile scene → its band. The page writes no tone itself.

| witness | claimed: Cr L / Cr D / WK L / WK D | unclaimed (= floor v2, FV2 §4.2) | reading |
|---|---|---|---|
| RAW | PASS 24 / 24 / 24 / 24 | PASS 48 | — |
| M-1 | PASS 11 / — / 11 / — | PASS 11 | a light page claim thins content to α 0, which paints paper |
| M-1x | REPORTED | REPORTED | 48 of 66 off-paper light composites grey in both runs (Q-11 unruled) |
| M-2 | PASS 469 / 469 / 469 / 469 | PASS 938 | light c1 wash muted **4.84**, `-strong` **6.30**, capsule muted 7.17. Light black wash muted 4.83, `-strong` 6.32. Claim scene (H3-6) min muted 5.33 light, 7.21 dark |
| M-2m | PASS 215 × 4 | PASS 430 | 100 s drift, 51 frames: claimed worst light wash·muted **4.81** at 18 s (Playwright WebKit 4.59 at 22 s); dark 5.38. Unclaimed 5.16 |
| M-2h | FAIL 1/34 / 1/34 / PASS / FAIL 1/34 | FAIL 2/68 (halo, FV2 §3) | Release legs green in every cell: worst dock-held·muted-tab 4.70 (light c1, −390 ms). Chromium's halo rows are the focus veil (FV2 §3, N-3). **Playwright WebKit dark (0.816-0.831) is the estimator artefact (§7)**: held over black claims α 0.524 and held over white 0.873 |
| M-3 | PASS 177 / 177 / FAIL 2 / PASS | PASS 354 | light c1 perimeter **3.08-3.14**, all 16 rows ≥ 3.0. WebKit light 2 rows on the checker ring, the floor's |
| M-4 | PASS / FAIL 7 / PASS / FAIL 7 | the same 7 | the dark capsule `#e9e6e2` / `#d5d0c8`, +0.067: floor v2's row |
| M-5 | PASS 10 × 4 | PASS 20 | 0 readbacks or per-frame writes in the live windows; the resolver runs on events only |
| M-6 | FAIL 4/4 / 2/26 / 4/4 / 2/26 | FAIL 7/30 | Light adjacency 0.003-0.004 (struck under Q-1 a). **Dark content adjacency cured by the lift** (wash→quiet 0.031, quiet→resting 0.029, against the floor's 0.007 / 0.004). Dark chrome adjacency 0.008 / 0.007 stays the floor's. Signed leg green: wash ΔE 0.064, ΔL +0.064 |
| M-7, M-8 | PASS (WK dark M-8 1/4, no blur) | PASS | inherited |
| M-9 | PASS / FAIL 1 / PASS / FAIL 1 | the same | dark focus veil over paper, the floor's +0.006 |
| O-66 | FAIL 3/3 / 2/2 / 3/3 / 1/2 | the same | G2 light ΔE 0.057, G3 ΔL −0.0330: the floor's |
| STACK | PASS 12 × 4 | PASS 24 | — |
| W-A | FAIL 1/108 × 4 | **PASS 216** | claimed leg 4 reads wash α 0.864 / 0.796 against the bound: the estimator artefact (§7). By computed style the any-input claims (checker, hostile) sit on the bound exactly |
| W-S | PASS 12 × 4 | PASS 24 | fieldout and fieldgone are inert (ΔE 0.000) and stamped `unpublished`; fieldtwo acts (ΔE 0.008-0.032) and is stamped `published`, with M-2 holding |
| W-C | FAIL 1/181 / 2/181 / 1 / 2 | FAIL 6/362 | the claimed three are all outside any claim (§3.1 C-4) |
| T | reported | reported | §4 |

### 3.1 · The computed licence (`D3-Cpp-proto-computed.mjs`, 13:40-13:44, load 160-250; `rec/computed.json`, `computed.log`)

Read on `<main>` in both engines, both themes, `claim=honest` and `claim=none`, over 15 scenes and grounds: 120 page loads. **Chromium and Playwright WebKit agree on all 60 cell pairs** (content bound, stamp, bound). Unclaimed, every cell computes 0.891 light / 0.8731 dark.

| claimed ground (light / dark) | stamp | `--glass-content-bound` light | dark |
|---|---|---|---|
| checker (black + white: the any-input claim) | `live` | **0.891** = bound | **0.8731** = bound |
| hostile (its band) | `live` | **0.891** | **0.8731** |
| black | `live` | 0.891 | 0.4136 (the lift) |
| white | `live` | 0 | 0.8731 |
| paper (page) | `live` | 0 | 0.4136 (the lift) |
| aurora c1 (field) | `published` | **0.8111** | **0.8277** |
| aurora c0.5 (field) | `published` | 0.6174 | 0.5577 |
| stripes / red / deep | `live` | 0.8343 / 0.8685 / 0.8607 | 0.8397 / 0.4136 / 0.4136 |
| fieldout, fieldgone (out of scope, unmounted) | `unpublished`, 1 warning each | 0.891 | 0.8731 |
| fieldtwo (two Auroras on one host) | `published` | 0.8111 | 0.8277 |
| held over black: wash-held, floating-held | `live` | 0.891, 0.891 | **0.4136, 0.5239** |

`--glass-bound` reads 0.891 / 0.8731 in every claimed cell, and chrome reads it unchanged at rest. The last row is finding 5.1 (§8).

## 4 · C-7: the T differentiator (`D3-Cpp-tc1.mjs`; `rec/tc1.log`; `rec/*/T.log`)

The run's own `t-transmission.mjs` reads claimed light wash T_c1 0.245. That reading takes the pole from the black and white stands, which under `claim=honest` carry two different claims (§7). The pole is the plate colour, which no claim moves. So `D3-Cpp-tc1.mjs` reads it from the unclaimed capture of the same build, with the same slope arithmetic:

| rung | Chromium light: unclaimed → claimed T_c1 | × | Chromium dark | × | Playwright WebKit light | × | Playwright WebKit dark | × |
|---|---|---|---|---|---|---|---|---|
| **wash** | 0.121 → **0.211** | **1.74** | 0.144 → 0.202 | 1.40 | 0.109 → 0.193 | **1.76** | 0.127 → 0.174 | 1.37 |
| quiet | 0.082 → 0.140 | 1.71 | 0.097 → 0.126 | 1.29 | 0.074 → 0.126 | 1.69 | 0.085 → 0.110 | 1.30 |
| resting | 0.039 → 0.071 | 1.80 | 0.047 → 0.064 | 1.36 | 0.035 → 0.061 | 1.76 | 0.043 → 0.060 | 1.38 |
| card | 0.044 → 0.072 | 1.65 | 0.045 → 0.062 | 1.38 | 0.035 → 0.060 | 1.71 | 0.042 → 0.060 | 1.40 |
| floating, overlay, dock, popover | unchanged | 1.00 | unchanged | 1.00 | unchanged | 1.00 | unchanged | 1.00 |

The computed α agrees: 1 − 0.8111 = 0.189 against 0.109 unclaimed (×1.73), which is spec §2.3's analytic P/(P − g) = 1.733. **C-7 FAIL, ×1.74 < ×2**, reproduced to the spec's value on the full battery. The route banks.

Where the field is kinder, the gain is real. The demo's story Aurora runs at ceiling 0.6, and its claimed frame computes content bound **0.494** light / **0.695** dark: T ≈ 0.51 against the floor's 0.11 (§5, C-8). That is spec risk 2's "kinder fields", not the default aurora that C-7 names.

## 5 · Every route row and the plants (Chromium; `D3-Cpp-plants.mjs` 13:16-13:39, load 160-320; `rec/plants/`)

Each CSS plant is injected over the route build. Each source plant is a copied `src` with one asserted replacement, built as its own specimen dist (`plants-build.log`, 11:29-11:30). A plant's capture holds only its own cells, so its witness counts the other cells as MISSING. The reds quoted are the measured rows only.

| row | status | green, with evidence | plant → red measured |
|---|---|---|---|
| **C-1** every ink solved, or the licence at the lightest | **PASS** | the licence at FL-5's own ink. M-2 938 claimed: `-strong` 6.30 (c1 wash) / 6.32 (black); capsule muted 7.17 / 6.45; wells 5.12-5.13 | `reach` (C′'s ink): wash muted **2.69** c1 / **2.36** black, M-2 44 rows red. `strong`: static muted **3.67** / **3.56**, 41 rows red |
| **C-2** any-input tones paint `--glass-bound` | **PASS** | checker and hostile claims compute 0.891 / 0.8731, both engines (§3.1). A hand-written `<html>` claim with no resolver (`rootpage`): M-2 green on every captured cell | `rootinit` (the tones' registered initials moved off the poles under that hand-written claim): fg **1.10** light black, muted 1.14; 120 rows red. The spec's `strong` licence computes 0.7686 ≠ 0.8910 (spec §2.1) |
| **C-3** dead or out-of-scope publication stamped, stamp true | **PASS** | fieldout and fieldgone: `unpublished` + one `console.warn` each, paint ΔE 0.000 from unclaimed, both engines, both themes | `nostamp`: W-S FAIL 8/24 (fieldtwo acts with no stamp). `liestamp` (`live = true`): the computed probe reads `published` with `--glass-field-live` 0 on fieldout and fieldgone (`rec/computed-liestamp.log`). **W-S stays green on it (24/24)**: the claim is inert, so the lie paints nothing. The truth leg's witness is the probe and the unit arm, not W-S (§7) |
| **C-4** colour retunes followed or refused loud | **PASS** inside every claim | `retune-bg`: followed. The resolver reads the page colour, and the dark lift re-solves against `#1c1f26` (content plates go opaque `#352a22`, signed ΔE 0.065 from the page). `retune-fg`: refused loud in both themes (`--foreground (L 0.420) sits within 0.08 of --on-glass-muted-l`). `retune-card` dark: refused loud (`--card paints L 0.337 but --card-l is 0.2949`). Light `retune-card` passes as followed. **W-C's three claimed reds are outside any claim**: the portalled Dialog under `retune-fg` (+0.062 / +0.070, the floor's static ink) and the dark capsule +0.067 (the floor's M-4 row) | `nocheck` (coherence check removed): W-C silent desync on wash/quiet/resting/card **+0.062** light, **+0.070** dark (30 rows red). `stalepage` (page tone held as paper's number): M-6 on the `retune-bg` cells reads dark wash **ΔE 0.024 ✗**, quiet 0.040 ✗ from the retuned page (`D3-Cpp-variant-view.mjs`; the route itself reads 0.065) |
| **C-5** Q-6's ruling on thinned wells | **PASS** under (a) | light claimed c1 perimeter 3.08-3.14, light black 3.10-3.11, all ≥ 3.0 | `reach`: perimeter **1.85** c1 / **1.62** black, M-3 43 rows red. Q-6 (b) was not built: under (a) M-3 is green on every claimed row, so (b) has nothing to cure (spec §1.6) and stays an analytic arm |
| **C-6** two Auroras and an unmount, in paint | **PASS** | fieldtwo: `published`, the host carries the worst of both, M-2 holds (W-S). fieldgone: re-stamped `unpublished` on dispose and paints the bound (ΔE 0.000) | `lastwriter` (the host keeps the last substrate): wash `#ffbf9d` light, `#8f441d` dark, "an ink under 4.5", W-S FAIL 6/12 |
| **C-7** T_c1 ≥ 2 × floor v2 | **FAIL** | ×1.74 Chromium, ×1.76 Playwright WebKit (§4) | — |
| **C-8** the demo's claimed region | **PASS** | GLANCE `--story-claim`: `<div data-glass-ground="field">` 144,552,344,348, crop delta **40.64%** light / **22.65%** dark Chromium, 20.08% dark Playwright WebKit. The claim reads `published`, content bound 0.494 / 0.695, both engines, 0 warnings (`D3-Cpp-demo-claim.mjs`, 14:06, load 214; `rec/demo-claim.log`) | floor v2's demo against itself: "the route's story claims no region ✗", FAIL 2 story pairs |
| Q-8 (c), core 5 | PASS | M-2m 430 claimed | `lagonly` (the solve reads the lag twins only): the 0.5 → 1 ceiling step reads wash·muted **3.74** at 27 ms light, **4.05** at 30 ms dark |
| the derived lift, core 9 signed leg | PASS | dark wash ΔL +0.064 over the claimed page | `nolift` (`--glass-lift-gap: 0`): wash `#0b0a08` ΔE **0.002**, ΔL −0.000 (below the page) ✗ |
| FL-7 under a claim | PASS | held rows green in M-2 (claimed) | `heldfloor`: wash-held muted **1.77** light black, fg 2.57 / muted 1.65 dark white, 54 rows red |
| FL-5 | PASS | — | `bound` (`--glass-content-bound: 0.25` at the root): floating fg **1.64**, capsule muted 1.21 light black; 77 rows red |
| the contract's limit (not a mechanism plant) | — | — | `fieldfalse` (the hostile band hidden under a field claim): wash muted **2.48** light c0.5, fg 3.03 dark c0.5. A false claim is the consumer's to answer for, as the contract says |

## 6 · Recalc (`D3-Cpp-recalc.sh` → `../pass-2/D3-Cp-recalc.mjs`, 300 forced recalcs per theme; 13:49-13:52, load 170-194; `rec/recalc.log`, `rec/recalc/`)

| build | Chromium ms per step (mean; CDP) light / dark | Playwright WebKit ms per step light / dark |
|---|---|---|
| floor v2, run 1 | 0.883 (0.876) / 0.808 (0.798) | 12.43 / 14.23 |
| floor v2, run 2 | 0.701 (0.698) / 0.858 (0.850) | 12.75 / 15.42 |
| route, claimed | **1.096 (1.084) / 0.914 (0.904)**: ×1.24-1.56 / ×1.06-1.13 | **17.20 / 18.14**: ×1.35-1.38 / ×1.18-1.28 |
| route, unclaimed | 0.009 / 0.010 | 0.10 / 0.11 |

The two floor runs differ by up to 26%, so the claimed ratio is about ×1.1-1.6, not sharper. That is under C′'s ×2.0-2.5 and above the spec's ×1.0-1.25 estimate. The unclaimed row does not measure equal work. The probe steps `--glass-ground-lo` on an unclaimed `<main>`, where the route registers it as non-inheriting with no reader, so nothing below recalcs. It shows that the driver is inert, not that the route is cheaper.

## 7 · Instrument findings (written into `../harness/HARNESS.md` §4)

1. **The two-ground α estimator is invalid under per-stand claims.** `paintedAlpha` assumes one α over the black and the white cell. Under `claim=honest` black keeps the bound and white thins to 0 (light), so the estimate is neither. This produces the claimed W-A leg 4 FAIL (0.864 / 0.796), the run's T_c1 0.245 and Playwright WebKit's dark M-2h halo row. The unclaimed run reads the floor exactly. Computed style (§3.1) and `D3-Cpp-tc1.mjs` read the truth.
2. **W-S cannot see a lying stamp on an inert claim** (`liestamp` 24/24). Under C″ a lie on an out-of-scope claim is harmless in paint, since the CSS identity paints the bound, but the stamp is still false. The computed probe reads it.
3. **M-6 reads the `base` variant only**, so a retune's effect on the dark lift needs `D3-Cpp-variant-view.mjs`.

## 8 · Route findings beyond the spec

1. **A held chrome plate sheds to the claimed licence.** Spec §1.5 sets the held floor to the content bound with "no chrome exception". So under a claim a held floating plate or dock sheds to `max(0.6 × rest, content bound)`: dark over black, `floating-held` α **0.5239** (computed) against the chrome bound 0.8731. Every held ink stays ≥ 4.5 (M-2, M-2h release legs), by the same identity that covers content. It conflicts with this seat's own prose "chrome does not move" only while held. Under Q-3 (a) the agglomeration may want the chrome floor at `--glass-bound` (one declaration on the chrome rungs). It is not built here, because the spec rules against it.
2. **A white stand under a light claim paints content at α 0.** The plate is then its edge, shadow and blur. M-2 is green (wash muted 6.57). Whether that reads as glass is the gestalt's (spec risk 5).
3. **The resolver's transition sits in `@layer base`.** A consumer `transition` on the claimed element (unlayered or `@layer utilities`) replaces the lag twins' transition. They then snap both ways: Q-8 (b), legible, but D-1 loses the thinning spring. No witness cell holds such a consumer.

## 9 · The fixed checklist (P2-6.3): 48 rows

A row passes only green in Chromium in both themes with a plant that reds it. "Floor" means floor v2's reading stands unchanged (FV2 §5 plants), because C″ changes nothing that row reads.

**Core (24).**

| # | row | status | evidence |
|---|---|---|---|
| 1 | RAW | PASS | 48 claimed and unclaimed; H3's plant |
| 2 | M-1 | PASS | 11; H3's grey plant |
| 3 | M-1x | **OPEN (owner, Q-11)** | REPORTED 48/66 grey, both runs |
| 4 | M-2 (R1/R3, `-strong`, held, H-10, H3-6) | PASS | 938; plants `reach`, `strong`, `heldfloor`, `bound`, `rootinit` |
| 5 | M-2m incl. 100 s drift | PASS | 430, worst 4.81; `lagonly` |
| 6 | M-3 | PASS | 354; `reach` |
| 7 | M-4 signed | **OPEN (floor)** | dark capsule +0.067, 7 rows, both runs |
| 8 | M-5 | PASS | 20; H3's plants |
| 9 | M-6 | **OPEN (owner, Q-1)** | light adjacency (struck under a) and dark chrome 0.008 / 0.007. The signed leg is green with `nolift` red. Dark content adjacency is cured (0.031 / 0.029). Q-1 (c) reported: content, chrome and room, as FV2 §4.3 |
| 10 | M-7 | PASS | floor |
| 11 | M-8 | PASS | floor |
| 12 | M-9 dark veil | **OPEN (floor)** | +0.006 |
| 13 | T | reported | §4 |
| 14 | held release window | PASS | every release ink ≥ 4.5 in every frame, both runs; H3's release plant |
| 15 | O-66 G2 | **OPEN (floor)** | ΔE 0.057 light |
| 16 | O-66 G3 | **OPEN (floor)** | ΔL −0.0330, C 0.0101 |
| 17 | W-C, band [4.5, ∞), retune leg | **OPEN (floor)** | every claimed run ≥ 4.5 and every claimed retune followed or refused loud. The 3 red rows sit outside any claim: the Dialog under `retune-fg` and the dark capsule. Plants `nocheck`, `stalepage` |
| 18 | both engines under H3, `+shim` | PASS | both runs, both engines, every cell; unshimmed WebKit crashed on `GlassDock` as H-14 records (a probe, not a gated cell) |
| 19 | a plant per green | PASS | §5. C-3's truth leg is read by the probe, not W-S (§7) |
| 20 | prose sweep | PASS | §1, including this seat's two `DESIGN.md` strikes |
| 21 | FL-13 | PASS (text) | spec §4 and FV2 §8 |
| 22 | O-87 | **OPEN (floor, inherited)** | C″ adds no layer, shadow, gleam or blur (frames in `glance-Cpp/`). The inherited `--shadow-modal` stack and dock glow are FV2 §6's, W-0.11's |
| 23 | gestalt | **OPEN (owner, Q-11)** | §10 |
| 24 | STACK | PASS | 24 |

**Floor (16).** FL-1..FL-16 as built in `floor-v2.patch` (FV2 §1, plants FV2 §5): **PASS**. C″ re-plants the three it changes: FL-4 (`rootinit` red, `rootpage` green), FL-5 (`bound`), FL-7 (`heldfloor`).

**Route (8).** C-1..C-6 and C-8 **PASS**. **C-7 FAIL** (§4, §5).

**Count.** 48 rows: 38 PASS, 10 open (9 core + C-7).
- Owner-gated: 3, 9, 23, and every Safari cell.
- Floor-owned: 7, 12, 15, 16, 17, 22.
- Route-owned: C-7. It is structural (spec §2.3: P/(P − g) at the default field's g), and **by the row's own text it banks the route**.

## 10 · The owner glance (`glance-Cpp/`; base = floor v2, route = C″; 13:52-14:01, load 160-187)

The base is floor v2, not HEAD, so the pair shows only what C″ adds. HEAD against floor v2 is `glance-fv2/`.

- **Chrome crops** (dock, Dialog, floating over paper): delta 0.00% in both engines and themes. C″ moves no chrome at rest. `--require-delta` reports these as "no delta", which is the correct reading here.
- **The story**: delta 5.57% light, 3.70% dark. **The claimed frame**: 40.64% / 22.65% (§5 C-8). The claimed plates read faintly peach over the story's ceiling-0.6 field, still cards.
- **Claimed content over c1** (`--ground aurora --route-query claim=honest`):
  - light wash `#fee3da` → `#fed5c8`, muted 5.39 → 4.84;
  - light quiet `#ffebe1` → `#fee2d6`;
  - dark wash `#4e2d21` → `#582f21`;
  - resting changes by under 1%.

  It reads a little more of the field than the floor, and far less than C′'s salmon `#ff8266`.
- **O-87:** no layer is added. The frames show the floor's single edge and shadow.
- **O-62:** the light veil over black is still the floor's `#e2dcd7` grey (M-1x). C″ claims nothing over black in the demo, and a black stand claim computes the bound by design.

## 11 · Consumer addenda (FL-13) and MIGRATION rows

Spec §4 stands as written, with one correction measured here: the held-plate row should read "_a held plate's floor is the claimed bound_, **chrome included** (§8.1)". The consumers (keyframes, value.js, fourier, chicago) are UNMEASURED: the siblings are read-only, and value.js has a live session.

## 12 · Reproduce

```sh
B=.claude/worktrees/bl/D3/p3/Cpp-proto; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-3
git worktree add --detach $B/wt HEAD && ln -s $PWD/node_modules $B/wt/node_modules
git -C $B/wt apply $PWD/$P/floor-v2.patch && git -C $B/wt apply $PWD/$P/D3-Cpp-proto.patch
export D3_OUT=$PWD/$B/out
node $H/run.mjs $B/wt --label cpp --demo --query claim=honest && node $H/run.mjs $B/wt --label cpp0
node $H/baseline.mjs $D3_OUT/caps/cpp --out $D3_OUT/baseline-cpp.json; node $H/baseline.mjs $D3_OUT/caps/cpp0 --out $D3_OUT/baseline-cpp0.json
node $P/D3-Cpp-tc1.mjs $D3_OUT/caps/cpp $D3_OUT/caps/cpp0                              # C-7
node $P/D3-Cpp-plants.mjs build $B/wt && node $P/D3-Cpp-plants.mjs capture $D3_OUT/builds/cpp/dist
node $P/D3-Cpp-variant-view.mjs $D3_OUT/caps/pl-stalepage retune-bg $D3_OUT/caps/view && node $H/m6-separable-ladder.mjs $D3_OUT/caps/view
node $P/D3-Cpp-proto-computed.mjs $D3_OUT/builds/cpp/dist --out computed.json
node $P/D3-Cpp-proto-computed.mjs $D3_OUT/builds/pl-liestamp/dist --engines chromium --cells 'honest (fieldout|fieldtwo|fieldgone)'
node $H/build.mjs <HEAD+floor v2 worktree> --label fv2 --demo && bash $P/D3-Cpp-recalc.sh
node $H/glance.mjs --base $D3_OUT/builds/fv2/dist --route $D3_OUT/builds/cpp/dist --story-base $D3_OUT/builds/fv2/demo \
  --story-route $D3_OUT/builds/cpp/demo --story-claim --out <dir> --name cpp --require-delta [--engine webkit]
node $P/D3-Cpp-demo-claim.mjs $D3_OUT/builds/cpp/demo
git worktree remove --force $B/wt
```
