# D3 · pass 1 · D3-A · the ground pole (prototype)

| field | value |
|---|---|
| seat | D3 pass 1, PROTOTYPE for family D3-A |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`. The worktree was cut at `e5f787ab`; the HEAD comparison worktree at `80ebfd72`. `git diff --stat 9aa2b7f9 e5f787ab -- src` touches only `components/configurator/*` and `src/index.ts`, and `e5f787ab..80ebfd72` touches no `src`, so no material byte differs from the research's base |
| verdict | **RUNS.** The spec is implemented on the real source. Typecheck, unit tests, the library build and the package verifier all pass (two items need a rebind, below). The whole battery ran in Chromium and Playwright WebKit |
| patch | `pass-1/D3-A-proto.patch` (`git diff` in the worktree, 59 files, +401 / −1841, 5 files deleted). It applies cleanly (`git apply --check`) to the checkout at `8f4d2dbe` |
| instruments | the shared battery (`harness/run.mjs`, unmodified), with Chromium 149 and **Playwright WebKit 26.5, which is not Safari**. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**. The gestalt set is a demo-dist build of each worktree, captured by the scratch `gestalt.mjs` |
| load | load averages 41-225 during the runs (other seats) |
| scratch | `S = …/scratchpad/D3/p1/D3-A-proto/`. Battery: `S/out/caps/proto/results/*.log`; verbose M-2 in `S/m2-verbose.log`; gestalt PNGs in `S/gestalt/`. Both worktrees were removed |

## 0 · Findings

1. **The spec runs, and its chrome guarantee holds in paint in both engines.** Every chrome row (floating, overlay, the dialog rung, the real Dialog, popover and dock) clears 4.5:1 over all seven grounds in both themes.
   - The worst Chromium chrome rows are light floating muted 4.83 over black and dark floating muted 4.60 over white.
   - Playwright WebKit's worst are 4.56 (light, over the checker) and 4.60 (dark, over white).
   - The 0.02 engine margin in the light chrome α (0.89) works as designed. The research probe at 0.88 read 4.44 in Playwright WebKit; this prototype reads 4.61 over black.
2. **M-1 turns fully GREEN, the real Dialog included.** The light card lift and the light dialog at α 1 close the one row the research left red. The Dialog reads `#fef7f1`, L 0.980, ΔE 0.010, where the research probe read L 0.967.
3. **M-6 dark turns GREEN at step 0.08.** Adjacent rungs read 0.012 / 0.012 / 0.029 / 0.012. Light stays red by construction (S-7): adjacent 0.000-0.003.
4. **M-3 splits by theme. The synthesis's one perimeter rung is a light-only derivation.** At `--ink-perimeter` 0.52:
   - Light chrome reads 3.09-3.15 on paper, green.
   - Dark chrome reads **2.82-2.90 on every ground, paper included**, red. Dark needs its own rung, about 0.54 by linear interpolation of the research's 0.48 → 2.59 and 0.60 → 3.47. That value is unmeasured.
   - The Dialog Close ring, now routed through `--ink-perimeter`, reads 3.25-3.32 in light (green; HEAD read 1.80) and 3.75-3.94 in dark.
5. **The veil had readers the spec never names, and a `--card` pole breaks them.** At HEAD, every `--glass-plate-*` colour was an ink darken. About 18 sites used those colours as *state fills or dims*: dock hover/active, the layer-switcher indicator, the icon-button active capsule, the focus-veil dim, the sheet scrim gradient, menu rows, the capsule fill, and others.
   - Under D3-A each of those is `--card` at α, painted on a `--card` plate. A fill becomes a same-hue no-op, and a dim becomes a *lightening*.
   - The first gestalt capture showed it: the shell SidebarDock and BottomDock lost their active pill, and the Dialog's focus veil became a cream bloom (`S/gestalt/proto-chromium-light-1440-dialog.png`).
   - The prototype cures the dock's three fills by routing them through the one-ink fill register (`--fill-hover`, `--fill-selected`). This cure is **not in the spec**; it is marked below. The focus-veil dim, the sheet scrim and the other plate-as-fill sites are recorded, not cured.
6. **The gestalt: chrome reads as frosted cream card, not glass.**
   - Light: the plates read as cream frost that drops the field's hue. HEAD's plates carry the field's hue but read grey (`glass-material`, 1440).
   - Dark: the dock is a brown pill over the red aurora, where HEAD's glows with the field.
   - The Dialog goes from HEAD's smoke-brown slab to a legible warm card. That is the clearest single improvement.
7. **Every consumer-visible deletion is typechecked and tested.** `vue-tsc` passes on both projects, and the style, dock, field and composable suites pass: 878 tests, 6 expected-fail. The full suite has 2311 passing; the remaining reds are environment and load (§3).

## 1 · What the prototype changed

Listed by the spec's clauses (SPECS §A.1-§A.2). The authority for every item is the diff.

- **The veil** (`glass/veil.css`): `--card` at `1 − (1 − α)·level`, with no ink, no luma and no clamp. The file's prose was rewritten to the new law.
- **The ladder** (`tokens/glass.css`, `tokens/dark-arm.css`):
  - light: content 0.53, step 0.07, chrome **0.89**, dialog **1**;
  - dark: content 0.50, step **0.08**, chrome 0.86, dialog = chrome + step (0.94).
  - The rungs derive from `--glass-veil-content`, `--glass-veil-chrome` and `--glass-veil-step`. The dark arm re-declares only the three scalars and the dialog rung.
  - Painted α read by W-A, light: 0.529 / 0.600 / 0.671 / 0.890 / 0.961, dialog 1.000. Dark: 0.502 / 0.580 / 0.659 / 0.859 / 0.941, dialog 0.981 (stack with the scrim).
- **The card**: `hsl(30 85% 97%)` in `color-radius.css` and in both `light-dark.css` twins (`--card`, `--popover`), plus `accent-tone-solve.ts`'s `DEFAULT_SURFACE`.
- **The well**:
  - `--glass-well-pole` holds the oklab tone-step. `--glass-well` composes it at the chrome α.
  - The split is forced, because a nested literal `color-mix` fails `G-WK-COLORMIX-BUDGET` (`tests/styles/color-mix-endpoints.test.ts`). The spec's one-token well is not buildable as written.
  - `--glass-well-toward` is `--foreground` in light and `--background` in dark. `--input-on-glass` is deleted, and `field/control.css` reads `--glass-well`.
- **The ink**: static. The dock's `:where(.glass-dock)` sets `--dock-fg-on-aurora: var(--foreground)` and `--muted-foreground: var(--on-glass-muted)`. Every glass `contrast-color()`, the `--glass-backdrop` bucket and its declaration are deleted.
- **Indicators**: `--ink-perimeter` is 0.52, and the Dialog Close ring (`dialog/styles.css`, 2 sites) routes through it.
- **Blur and saturate**:
  - Blur is 6/10/12/16/16.
  - The dock drops both private re-compositions (light `saturate(1.2)`, dark `saturate(1.3) brightness(1.14)`) and rides `--glass-blur-resting`, so it has one saturate, 1.5.
- **The dock**:
  - Both morph endpoints are `--glass-veil-dock` (chrome).
  - `backdropMode` is `"glass" | "opaque"`, defaulting to `"glass"`, and `backgroundCanvas` is deleted.
  - The sampler wiring is gone.
- **Deleted**:
  - `composables/glass/{useGlassBackdropLuminance,backdropLuminanceSample,backdropSampleMath}.ts`;
  - `--glass-backdrop-luma` (with its `@property`), `--glass-backdrop-luma-knee`, `--glass-backdrop`, `--glass-veil-ink`, `--glass-veil-base`;
  - `contain: paint` (`material.css`);
  - `tests/composables/glass/backdropLuminanceSample.test.ts`, `docs/consumer-evidence/use-glass-backdrop-luminance.md`, and the happy-dom `elementsFromPoint` stub in `tests/setup.ts` (its only caller was the sampler).
- **Owed sites closed**:
  - `sheet/styles.css` seams read `--ink-seam` (the one-ink in-content rule; the α is still 0.08).
  - `music-staff` folio biases the pole: `--card: oklch(from folio 0.975 c h)`, plus a `.dark` arm at L 0.295.
    - **Synthesis choice.** `color-mix(var(--card), …)` is a cycle, and `token-graph.test.ts` caught it.
  - `tokens/manifest.ts` lists `--glass-veil-{content,chrome,step}` and `--glass-well`.
  - The stale prose in `ladder.css`, `deep.css`, `surfaces-pager.css`, `control-bit.css`, `rim.css`, `property-regs.css`, `search.css`, `dock.css`, `dock/styles/index.css` and `dock/README.md` is rewritten.
- **Prototype-added, NOT in the spec**: `--dock-control-hover-bg`, `--dock-control-active-bg` and `--dock-layer-switcher-active` now read `color-mix(in oklab, var(--foreground) calc(var(--fill-hover|--fill-selected) * 100%), transparent)`. The fallbacks in `layer-group.css` and `icon-button.css` re-point with them (finding 5).
- **Demo**:
  - `DockStage` loses its shared observer, `preserveDrawingBuffer` and the `backgroundCanvas` slot prop. Four dock stories lose `:background-canvas`.
  - `backdrop-mode="static"` becomes `"opaque"` in `overview` and `progress`.
  - The `glass-material` story replaces its "sampled observer" section with **"the bound — no signal, legible by construction"**: a chrome and a content plate over a canvas that flips between a dark and a light ground. Its tint specimen re-points `--card`.
  - `StoryHero` drops `--glass-backdrop`, and the neutral preset prose is updated.
- **Tests re-pointed** (records of the new law):
  - `glass-subtlety`'s veil-ladder block is rewritten: strictly increasing in both modes; each band's thinnest rung on its bound within +0.03; rungs derive from their band; the dark arm re-declares only scalars and the dialog; one pole, no luma term.
  - The blur block now expects 6/10/12/16/16 and "never thins" in place of "strictly climbs".
  - The dock `backdrop-mode`, `posture`, `motion-parity` and `touch-gate` tests are updated. `contrast-computed`'s quiet-track ground and five comment-claim figures are re-derived for the lifted card (3.36, 3.33, 4.62, 5.12, 1.90).
  - `forms-seam` expects `--glass-well`. `Surface.test` expects deep radii 7.75/11.75/13.75/19.5/21. `proportion-register` expects perimeter 0.52.

## 2 · Battery (Chromium gate; `S/out/caps/proto/results/`)

`D3_OUT=S/out node harness/run.mjs <wt> --label proto`: 68 cells plus 8 live windows. The battery build predates the dock-fill cure of finding 5, which touches no plate, ink or ring the battery reads.

| witness | HEAD (HARNESS §3) | research probe (D3-A §3) | **prototype** | reading |
|---|---|---|---|---|
| M-1 | FAIL 11/11 | FAIL 2/11 | **PASS 11** | plates L 0.979-0.984, ΔE 0.005-0.010; the real Dialog `#fef7f1` L 0.980. Playwright WebKit PASS 10 |
| M-2 | FAIL 169/560 | FAIL 35/560 | FAIL **34/560** | all 34 are content rungs over undeclared grounds: light c1 muted 3.38-4.14, black 1.75-2.69, checker 3.60-4.25, stripes 3.02-4.21; dark c1 3.72-4.43, white fg 2.41-3.75 and muted 1.55-2.41, checker 3.79-4.22, stripes 2.16-3.71 (and fg 3.36). **Chrome: 0 fails.** Paper and ceiling 0.5 are green in both themes (light c0.5 worst 4.61, dark 5.87). Playwright WebKit: 42/532 info, including light c0.5 wash muted **4.35** (the content bound has no engine margin) |
| M-3 | FAIL 237/266 | FAIL 213/266 | FAIL **111/266** | light chrome perimeter 3.09-3.15, rings 3.25-3.37 (green on paper, white and every Dialog cell); light content well edge over hostile grounds 1.17-2.98. **Dark: perimeter 2.82-2.90 on every ground** (red); rings 3.37-4.46 except content-band hostile grounds |
| M-4 | FAIL 14/14 | FAIL 14/14 (instrument) | FAIL 14/14 (instrument, S-9) | dock "fg" = muted = `#705942` / `#c3b9ac`: the specimen's fg run is an inactive tab. Neither ink is `#000` or `#fff` |
| M-5 | FAIL 6/16 | PASS 16 | **PASS 16** | 0 `getImageData`, 0 `readPixels` in all 8 windows, fed or not. Dock fg/muted 5.42/5.45 (light c1), 5.81 (light c0.5), 6.07/5.92 (dark c1), 6.83/6.77 (dark c0.5) |
| M-6 | FAIL 14/19 | FAIL 5/19 | FAIL **4/19** | **dark all green**: adjacent 0.012/0.012/0.029/0.012; page ΔE wash 0.078 … Dialog 0.146. Light adjacent 0.000-0.003 (S-7, structural) |
| M-7 | FAIL 8/8 | PASS 8 | **PASS 8** | reach 18 px (light), 17 px (dark) at every host; Playwright WebKit PASS 8 (14 px) |
| M-8 | FAIL 8/8 | PASS 8 | **PASS 8** | light C 0.011-0.019, bleed ≤ 1.01 (dock info 1.04); dark C 0.024-0.034, bleed ≤ 1.04 (dock info 1.10). Playwright WebKit dark floating bleed 1.29 ✗ (info; it paints no blur, so the number reads only the veil) |
| **W-A** | FAIL 68/197 | FAIL 20/197 | FAIL **19/197** | leg 1 GREEN (no luma writer in `src`). Leg 2 GREEN: chrome over black and white, both themes, both engines; worst 4.83 / 4.60 (Chromium), 4.61 / 4.60 (Playwright WebKit). Leg 3 GREEN on the declared grounds (paper, c0.5), red on c1 by declaration: light wash muted 3.38, dark 3.72. Leg 4 as written reds on every content rung (the witness solves over c1: light bound 0.740-0.750) and on every rung stepped above its band (overlay 0.961 vs 0.865; the Dialog 1.000). Its thinnest chrome rungs sit on the painted bound: light floating/dock/popover 0.890 vs 0.865, dark 0.859 vs 0.855 |
| W-B … W-F | FAIL | FAIL | FAIL 16/24, 223/304, 6/9, 119/360, 75/152 | other families' centres, recorded and not pursued. W-D's battery leg under `--gate chromium,webkit` reads M-1, M-5 and M-7 PASS |

**Family witness per engine.**
- **Chromium:** W-A legs 1-3 GREEN, leg 4 RED as written. The spec asks that leg 4 be restated as "α ≥ bound, thinnest rung = bound". Under that reading every band's thinnest rung passes except the content rungs, which the witness solves over ceiling 1 instead of the declared ceiling 0.5.
- **Playwright WebKit (info):** legs 2-3 GREEN on chrome. Content reds on c1, and also on light **c0.5 at 4.35**.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox).

## 3 · Build, types and tests (in the worktree)

| step | command | result |
|---|---|---|
| typecheck (app) | `npm run typecheck`, first leg | pass |
| typecheck (tests) | `vue-tsc --noEmit -p tsconfig.test.json` | 2 errors before the library build (`@mkbabb/glass-ui/fourier-math` self-reference needs `dist/`), **0 after** |
| style, dock, field, composable units | `vitest run tests/styles tests/components/custom/dock tests/components/field tests/composables --testTimeout 60000` | **88 files, 878 passed, 6 expected-fail** |
| full suite | `vitest run --testTimeout 60000` | 2311 passed. Reds: `boot-graph` ×3 (needs a root `dist-demo`, absent in any fresh worktree); `menu/contract` and the `slider.size-tokens`, `GlassDock.stagger` file-level hook timeouts pass in isolation (load flake); `Surface.test` deep radii (**fixed**, rerun 24/24) |
| library build | `vite build` (cacheDir in the worktree) | built; tuple `js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles` |
| package verifier | `node scripts/verify-export-types.mjs` | **`G-BUNDLE-RATCHET` shrink: 2,900,289 < 2,919,057** (the sampler's 18,768 bytes). With the datum rebound to 2900289 in the scratch worktree only (restored after), the terminal reads **CLEAN** (193 claims, 454 declarations, roster 289/289, install and types exit 0). The rebind is owed at commit, from a committed-tree build |

## 4 · Gestalt (Chromium 149; `S/gestalt/`)

Files are `{head2,proto2}-chromium-{light,dark}-{1440,430}-{glass-material,dock,dialog,popover,sidebar-aurora}.png`, 20 per build: the demo-dist of each worktree, `reducedMotion: reduce`.
- `proto-*` / `head-*` is the first pass, before the dock-fill cure.
- Grounds: `glass-material` is the aurora; `dock` is the grid page with the DockStage aurora (`opacityCeiling` 0.55); `dialog` and `popover` are the containers' grid (paper-like); the sidebar is read on `/navigation/tabs` over the aurora and on every other page.
- **Playwright WebKit:** every demo page crashes it (`page.waitForTimeout: Page crashed`, after 421 ms on the prototype and 282 ms on HEAD), because the shell mounts `GlassDock`. The whole demo gestalt is **UNMEASURED in Playwright WebKit**. Real Safari: UNMEASURED (owner's safaridriver checkbox).

What the eye sees, before → after:
- **Glass Material (light, 1440, aurora).**
  - HEAD's rung plates take the field's peach hue at a grey-brown L.
  - The prototype's are near-white cream cards, and the five rungs are near-indistinguishable in fill (S-7). Identity rests on rim and shadow.
  - The new "bound" specimen shows the chrome plate holding its caption while the wash plate's caption dips over the bright phase.
- **Dialog (light, 1440).**
  - HEAD: a smoke-brown slab; Cancel is near invisible, and the well is the only light surface.
  - Prototype: an opaque warm card; Cancel, the Close ring and the well edge all read. The well now sits a tone *darker* than the plate.
  - **Defect:** the focus-veil dim, which rides `--glass-plate-overlay`, now paints a cream bloom around the dialog instead of a dim (finding 5, uncured).
- **Popover (dark, 1440).** Warm dark card; the dark wells deepen toward the page. Legible.
- **Dock (1440 and 430, both themes).**
  - Light: HEAD's docks are tinted glass pills; the prototype's are cream card pills.
  - Dark: HEAD's docks glow with the field; the prototype's are brown pills over the red field (the D3-A §6 counterexample 4 brown, now seen on the dock).
  - All glyphs read. The 430 captures overlap the page header over the first section title in **both** builds, a layout matter outside D3.
- **Sidebar and bottom dock.**
  - First pass: the active item's pill **vanished** in both themes (`proto-chromium-light-1440-dialog.png`: no pill under "Dialog"; HEAD's is a darker pill).
  - After the fill cure (`proto2-*`), the active pill reads as a warm ink wash on the cream dock.
  - On `/navigation/tabs` the segmented-tabs track becomes a near-opaque cream plate with a lit capsule. It is more legible than HEAD's dusty brown track, and the grid backdrop no longer shows through.

## 5 · Every break

1. **Dark `--ink-perimeter`** reads 2.82-2.90 at 0.52 on every ground. The spec's single value is light-derived. A dark arm is owed, about 0.54 and unmeasured.
2. **Veil-as-fill readers** (about 18 `var(--glass-plate-*)` reads outside `tokens/glass.css`): state fills vanish and dims lighten.
   - Cured here, outside the spec: the three dock fills.
   - Uncured: `--glass-focus-veil-dim` (both arms), the sheet scrim gradient (`sheet/styles.css:361-364`), `components.css:22`, `--control-checked-bg`, menu rows, the capsule fill, `segmented.css:228`, `feedback-tone`, avatar and metric.
3. **The grasp register** sheds α to 0.6 × rest. A held dock plate therefore drops to α 0.534, well under the chrome bound, while held. It is unmeasured; the battery has no held cell.
4. **`--glass-well` needs two tokens** (`--glass-well-pole`, `--glass-well`) to pass the nested-`color-mix` gate.
5. **`--card` self-reference is a cycle.** A per-scope pole bias (`music-staff`, the demo tint) needs an explicit colour or another token. The demo uses `var(--popover)`, which `token-graph` would flag if it were in `src`.
6. **PROPORTION §6**: seam : edge : perimeter becomes 1 : 2 : 6.5, and the indicator derivation becomes 2 px @ 0.26. The register test and its prose were re-pointed.
7. **Blur ladder**: floating = overlay = 16 px, so the "strictly climbs" law is gone.
8. **`G-BUNDLE-RATCHET`** needs a deliberate rebind down (−18,768 B).
9. **Token-comment figures** re-derived for the card lift: five claims, in the source and in `contrast-computed`'s claim list.
10. **Playwright WebKit content margin**: light c0.5 wash muted 4.35 against Chromium's 4.61. The content bound carries no engine margin; the chrome bound does.
11. **M-4 is unreadable** until the specimen's fg run points at an active tab (S-9).
12. **W-A leg 4** reds as written (§2).
13. **The dark dock is brown over the red field** (gestalt), as D3-A §6 item 4 predicted for chrome over saturated red.
14. **Fence note.** The first `vitest` runs used the default cache and wrote `node_modules/.vite/vitest/<hash>/results.json` through the `node_modules` symlink, a gitignored cache file in the checkout's `node_modules`. Every later run used a cacheDir inside the worktree. The package verifier's temporary ratchet edit was made in the scratch worktree and restored; `git status` showed it clean before removal. This report and the patch are the only files written to the checkout; the patch was placed there with `cp` from scratch because of its size (206 KB).

## 6 · Open gaps

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- Demo gestalt in Playwright WebKit: UNMEASURED (the page crashes on `GlassDock`, prototype and HEAD alike).
- The dark `--ink-perimeter` arm (about 0.54) is unmeasured.
- The focus-veil dim, the sheet scrim and the other plate-as-fill readers need a ruling: route them to the ink fill register or the scrim. The spec names none of them.
- The held (grasp) dock under the chrome bound: no battery cell.
- The dock-fill cure (finding 5) was captured only in the gestalt, not in the battery build.
- M-4 needs its specimen re-pointed (S-9), and W-A leg 4 needs its restatement before either can read the design.
- The consumer addenda (chicago, keyframes, fourier, value.js) are untouched. Per SPECS §A.2, they land by E-6 addenda.
