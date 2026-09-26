# D3 · pass 1 · D3-C · prototype (the cascade ink)

| field | value |
|---|---|
| seat | D3 pass 1, PROTOTYPE for family D3-C, test-implementing `SPECS.md` §D3-C on the real source |
| model | `claude-opus-5-5`, asserted from own system identity |
| status | **RUNS.** Typecheck green, library build green, specimen and demo builds green, the whole battery ran in both engines |
| HEAD | tasked at `9aa2b7f9`; the checkout and the worktree read `d4d0a042`. `git diff --stat 9aa2b7f9 d4d0a042 -- src` touches only `components/configurator/*` and `src/index.ts`, none of the material, so every reading measures the tasked material |
| base | the research seat's final probe diff (`…/D3-C-research/probes/c5.patch`) applied cleanly to `d4d0a042`, then completed and corrected here (§1) |
| patch | `pass-1/D3-C-proto.patch` = `git diff HEAD` in the worktree: 50 files, +341/−1624. `git apply --check` passes against a clean `git archive HEAD` tree. sha256 `f58587e0…2d3c4d` |
| instruments | Playwright from `glass-ui/node_modules/playwright`: headless Chromium 149 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5. The battery is `harness/run.mjs` with `D3_OUT` in this seat's scratch. **Playwright WebKit is not Safari**: every WebKit number is labelled so and is paint-only. Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | other seats shared the machine; load averages 48-60 throughout. The battery captured 68 cells and 8 live windows in 635.8 s |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-C-proto/` (below: `…/`) |

## 0 · Verdict

The prototype runs, and it reproduces the research probe's battery row for row on the completed source. Four M witnesses go green in Chromium (M-4, M-5, M-7, and M-2 on every library ground). The rest stay red for the reasons the spec already names: the undeclared consumer ground (M-2, M-3, M-8, W-C), the opaque escape at L 0.974 (M-1, S-6), light adjacency (M-6, S-7), and the dark Dialog well (M-3, S-2). With the consumer declarations the spec asks for, every measured M-2 row clears 4.5 and M-8 passes.

Completing the spec surfaced five breaks the probe did not have or did not see. Three are cured in the patch, two are recorded:

1. **A consumer cannot declare a ground on a descendant as the spec writes it** (cured). `--glass-ground` is a registered colour, picked at `:root` and inherited as a value, so a `--glass-ground-lo/-hi` declared on a scope below `:root` never reaches the solve. The probe's declared stands only worked because they declared on `html`. Cure: `@utility glass-ground`, the declaration seat that re-picks `--glass-ground` where the bounds are declared.
2. **The grasp register was dead on every plate** (cured). The probe dropped `--glass-veil-rest`, so `grasp.css`'s held rung `calc(var(--glass-veil-rest) * 0.6)` was invalid at computed time. And on the dock, the held rung is set on `.dock-plate`, while the probe computed the veil on `.glass-dock`, so the plate could not shed its veil even with the name restored. Cure: `glass-scope` declares `--glass-veil-rest`; `.dock-plate` re-derives its own veil layer from its own rung.
3. **The dock and sidebar lost their selected pill in light** (cured). `--dock-control-active-bg` and `-hover-bg` pointed at `--glass-plate-floating` / `-resting`. Those became `--card` frosts, which are invisible over a `--card`-frost plate (the token's own comment names this trap). Cure: the state veils are now `--foreground` at one and two ladder steps.
4. **Every other `--glass-plate-*` fill in the library is now a card frost** (recorded, not cured). There are 20 declarations in 16 files (`grep var(--glass-plate-…)` outside `tokens/glass.css`): menu rows, segmented track, capsule, layer switcher and layer group, control surfaces, the checked-control fill, the colour bridge, metric, avatar, the sheet shade, feedback tone, the configurator capsule, and two utilities. None of them solves a floor or an ink; each paints `--card` at a rung α. Wherever one of them was a darkening state over a plate, it is now a no-op of the same kind as break 3. The spec does not name these sites.
5. **The token-graph gate reads the ground hand-off as a cycle** (recorded). `--glass-composite → --glass-lift → --glass-sat → --glass-backdrop-in → --glass-ground → --glass-composite`. The gate is selector-blind. The hand-off declares `--glass-ground` on a scope's children, and it excludes scopes, so no single element carries both edges. Any inherited hand-off is cyclic by name, so the gate needs a ruling, not a rename.

## 1 · What the patch does beyond `c5.patch`

`c5.patch` (the research probe, 16 files) is the core: the scope chain, the solve, the floor, the ladder, the Aurora publication, the Dialog backdrop model, the field well as a rung, the one filter recipe, the retired `contrast-color()` blocks and bright bucket, floor row 1. On top of it:

| change | spec clause | file(s) |
|---|---|---|
| Deleted the sampler: `useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts` (746 lines) and their test (109 lines) | C.2 Removed (the probe gated it off with `if (false as boolean)`) | `src/composables/glass/*` |
| Deleted the `backgroundCanvas` prop. `backdropMode` stays (`live` / `static`); `live` now means "solved against the declared ground", `static` keeps its solid plate | C.2 Removed | `useDockShellProps.ts`, `GlassDock.vue`, `dock/README.md` |
| Deleted `--glass-backdrop`, `--glass-backdrop-luma` (with its `@property`), `--glass-backdrop-luma-knee`, the dock's `--glass-backdrop: light`, the static arm's `--glass-backdrop-luma: 0`, the happy-dom `elementsFromPoint` stub the sampler needed | C.2 Removed | `glass-fx.css`, `property-regs.css`, `shell.css`, `adaptive-legibility.css`, `tests/setup.ts` |
| `@utility glass-ground`: the consumer's declaration seat (break 1) | C.1 "a consumer declares its own pair on the scope that paints its background" | `glass/veil.css` |
| `--glass-veil-rest` restored in `glass-scope`; `.dock-plate` re-derives `--glass-a` / `--glass-veil` from its own rung (break 2) | common floor row 4 (the plate composes at the element) | `glass/veil.css`, `dock/styles/dock.css` |
| Dock state veils: `--foreground` at `step` and `2·step` (break 3) | D-2 (a selected state must separate) | `tokens/sizing.css` |
| `glass-plate` = `@apply glass-scope` + its paint, instead of a second copy of the scope body | P-3 | `glass/veil.css` |
| The `:root` perimeter rule and the ground hand-off moved into `@layer components` (the orphan-partial gate: every shipped top-level rule is layered). Nothing else declares those names, so paint is unchanged, and the re-captured cells read byte-identical ratios (§3) | — | `glass/veil.css` |
| The Dialog's backdrop model hoisted into `--glass-scrim-ground` → `--glass-scrim-sat` → `--glass-backdrop-in`, so no `color-mix()` sits literally nested inside an RCS origin (G-WK-COLORMIX-BUDGET) | C.1 `--glass-backdrop-in` | `dialog/styles.css` |
| Residual `--glass-veil-ink` writers re-pointed: the sheet seams become `--foreground` at `2·step`; the music-staff folio re-points the plate's `--card` (`color-mix(in oklab, folio 40%, var(--background))`) instead of the retired ink | C.2 Removed (`--glass-veil-ink`) | `sheet/styles.css`, `music-staff/styles.css` |
| `semanticTokens.material` lists the new public tokens and drops `--glass-veil-ink` | C.2 New | `tokens/manifest.ts` |
| The two new utilities are added to `.published-roster` and named in `DESIGN.md` (the build and `plate-register` gates) | — | `.published-roster`, `DESIGN.md` |
| Demo: `DockStage` loses its shared sampler, `preserveDrawingBuffer` and the canvas slot prop. Five dock stories drop `:background-canvas`. `AppShell` drops `data-glass-field-canvas`. `StoryHero` drops `--glass-backdrop: light`. The glass-material story's sampler section becomes a declared-ground specimen (a stand toggling two grounds every 1.4 s, `glass-ground` on the stand, the card's muted ink following). The tint section re-points `--card`. The code theme's comment ink reads `--muted-foreground-strong`, and the shadows stage sets its own caption ink | E-1 (the consumers update) | `demo/…` |
| Stale comments in the touched dock and veil files rewritten to the new mechanism | — | several |

**Tests updated to the new law** (each encoded the retired mechanism):
- `glass-subtlety`:
  - "content band ≤ 0.20 in both modes" → light only (dark needs α ≥ 0.32 for M-6, spec C.1);
  - "dark moves by the base alone" → the dark arm re-declares one base and one step, never a rung;
  - "DIMS in both modes, the ink never inverts" → "a `--card` pole in both modes, no veil ink";
  - the grasp assertions retargeted to `--glass-veil-rest: var(--glass-veil-tier, …)` and `--glass-a`.
- `focus-veil`: the dim is one expression over `--glass-focus-veil-dim-share`; dark moves only the share.
- `forms-seam` G-F2: the perimeter is `--glass-perimeter`; the fill is the well's own veil at `--glass-veil-well`.
- `contrast-computed` A-1 retired. It computed the on-glass muted rung by static token arithmetic. Inside glass the rung is now a CSS solve, which that calculator cannot evaluate, so M-2 reads it in paint.
- `Button`: the focus ring reads `--glass-perimeter`.
- `Aurora.opacity-ceiling`: its module mock now exports `sampleAuroraField`.
- `GlassDock.backdrop-mode`: the sampler mock is gone; the test witnesses the mode attribute.

**Law changes the patch makes, stated plainly for the owner.** The dark ladder is not thin (0.32-0.64, W-FROST's transmission law broken in dark, spec C.1). The dark veil lightens the page instead of dimming it (the retired "sign law"). A consumer `--muted-foreground` inside glass is overridden by the solve (spec C.2 behaviour change).

## 2 · Build and unit results (commands run here)

| step | command | result |
|---|---|---|
| typecheck | `npm run typecheck` (worktree) | exit 0 (`…/typecheck-final.log`). Before the library build existed, `FourierField.smoke.test.ts` failed to resolve `@mkbabb/glass-ui/fourier-math`, a self-import that needs `dist`; it is clean once `dist` exists |
| library build | `node …/build-lib.mjs wt …/cache-lib` (the repo `vite.config.ts`, cache in scratch) | exit 0, 35.1 s (`…/lib-final.log`) |
| style and glass units | `npx vitest run tests/styles tests/composables/glass tests/components/custom/dock tests/components/field` | after the updates: all pass except `token-graph` (break 5) |
| whole suite | `npx vitest run --testTimeout 60000` | 2309 passed, 5 failed, 10 expected-fail (`…/vitest-final.log`). The 5: `token-graph` (break 5); three `boot-graph` build-arm rows, which need a repo-root `dist-demo` (the demo was built into scratch, not into the worktree); one `menu/contract` row, which is a load flake (it passed in the first full run and passes 12/12 twice in isolation) |
| specimen build | `harness/build.mjs wt --label c-proto` | built @ `d4d0a042`, src dirty files 28 |
| demo builds | `…/build-demo.mjs headsrc demo-head`, `… wt demo-proto2` | both exit 0 |

**Emitted CSS** (compiled, where Tailwind inlines each `@apply glass-scope`):
- specimen app: HEAD 391,098 raw / 63,278 gzip; prototype 460,596 / 66,216 (+17.8% raw, +4.6% gzip);
- demo: 427,081 / 86,607 → 496,142 / 89,550 (+16.2%, +3.4%).

Making `glass-plate` apply `glass-scope` instead of copying it saved nothing in the compiled output (c5's specimen read 457,541 / 66,116), because Tailwind inlines either way. The published `dist` ships the source CSS: all `.css` under `dist` is 460,533 → 468,611 raw (+1.8%).

## 3 · The battery (Chromium gates; Playwright WebKit informational)

Commands:
- `D3_OUT=…/out node harness/run.mjs …/wt --label c-proto`: 68 cells, 8 live windows, the retune variant, then 14 witnesses. Logs: `…/out/caps/c-proto/results/*.log`.
- The declared variant: `harness/capture.mjs …/out/builds/c-proto/dist --out …/out/caps/c-proto-declared --engines chromium,webkit --grounds black,white,checker,stripes --scenes ladder,dialog --inject …/declared.css`, then M-2, M-3, M-8 and W-C on it. `declared.css` is the research seat's Q6 consumer declaration, copied into this seat's scratch. That variant counts its 12 uncaptured paper and field cells as MISSING rows, so only its measured rows are quoted.
- After the last source edits (state veils, layering), the specimen was rebuilt (`--label c-proto-final`). Chromium paper and aurora cells were re-captured, and M-1..M-4 re-read. Every quoted ratio and colour is identical.

| witness | HEAD (`HARNESS §3`) | prototype, library grounds + undeclared stands | prototype, stands declared | verdict |
|---|---|---|---|---|
| M-1 no grey | FAIL 11/11 | FAIL 1/11. Plates L 0.981-0.985, ΔE 0.002-0.007 (dock `#fbf9f4` L 0.981, the Dialog `#faf8f6` L 0.981). Only the opaque escape `#fdf5ec` L 0.974 misses (S-6) | n/a | GREEN but for the escape |
| M-2 text | FAIL 169/560 | FAIL 124/560, **all on the undeclared stands** (light black 26/36 under, checker 17/36, stripes 17/36; dark white 25/36, checker 17/36, stripes 19/36). Every paper and field cell clears in both themes: light paper fg 16.20-16.66, muted 4.97-5.04; light c1 fg 6.38-16.20, muted 5.00-5.37, dock 8.06 / 5.05; dark paper fg 11.21-14.63, muted 4.91-4.98; dark c1 fg 10.61-13.06, muted 4.97-6.62, dock 7.45 / 5.27; Dialog light 16.45-16.51 / 4.98-5.03, dark 12.42-12.92 / 4.92-5.05 | every measured Chromium row ≥ 4.5: muted 4.86-6.73, fg ≥ 7.11, dock muted 4.96-5.34 | GREEN where the ground is declared |
| M-3 non-text | FAIL 237/266 | FAIL 93/266. Paper and field cells ≥ 3.0 except the **dark-paper Dialog well**: perimeter 2.53, ring 2.83. Light paper perimeter 3.25-3.48, ring 3.19-3.23; the Dialog Close ring over light c1 3.37-12.53 | 2 rows under: dark-black Dialog well 2.41 / 2.71 | GREEN but for the dark Dialog well (S-2) |
| M-4 dock register | FAIL 14/14 | **PASS 14/14**: light tab `#5c493a` / label `#7c6858` ΔL_OK 0.111 (c1 0.109); dark `#afa08f` / `#948575` 0.088 (c1 0.091) | n/a | GREEN |
| M-5 live dock | FAIL 6/16 | **PASS 16/16**: 0 `getImageData`, 0 `readPixels` in all 8 live windows (fed and default); dock fg 7.41-8.06, muted 5.05-5.27 | n/a | GREEN |
| M-6 ladder | FAIL 14/19 | FAIL 4/19: light adjacency 0.002 on all four steps. Dark passes: adjacent 0.011-0.014; from the page wash 0.051, quiet 0.064, resting 0.075, floating 0.087, overlay 0.100, Dialog 0.116 | n/a | RED in light (S-7, structural) |
| M-7 halos | FAIL 8/8 | **PASS 8/8**: reach 18 px light, 17 px dark, every host equal to the reference | n/a | GREEN |
| M-8 chrome calm | FAIL 8/8 | FAIL 7/8 on the undeclared stripes: light C 0.0733-0.0787, dark 0.0525-0.0596, dark Dialog 0.0444; light Dialog passes (C 0.0053) | **PASS 8/8**: C 0.0122-0.0202, bleed 1.01-1.03 | GREEN where declared |
| **W-C ink follows** (own witness) | FAIL 284/304 | FAIL 122/304. Paper, both themes: 18/18 in [4.5, 5.5] (light 4.96-5.05, dark 4.71-4.99), and **after the consumer retune** 18/18 (light 4.95-5.13, dark 4.73-4.99). Out of band only above it: light c1 well placeholders 6.32-7.05; dark c1 content 6.03-6.62, wells to 6.74 | Chromium: dark black 18/18 and light white 18/18 in band. Out of band only above it: wells 5.58-7.27, light stripes content to 6.73 | **GREEN on its centre, RED on the band's upper edge** |

Out of family, Chromium:
- W-A FAIL 46/197;
- W-B FAIL 16/24 (nothing publishes `--glass-backdrop-luma`; C deletes it);
- W-D FAIL 6/9 (no solver file);
- W-E FAIL 138/360;
- W-F FAIL 66/152 (the field does not yield).

**Playwright WebKit (paint-only, informational):**
- Library grounds: M-2 all rows ≥ 4.5; muted 4.61-5.20 light (c1 wash reads 4.61, the missing saturate), 4.84-6.64 dark. W-C on paper 17/17 in band in both themes, and after the retune.
- M-1: 1/10 (the escape). M-6: light adjacency 0.001-0.003 FAIL, dark 0.011-0.014. M-7: reach 14 px = reference. M-3: dark-paper Dialog well 2.65 / 2.83.
- Declared stands: M-2 34/34 on black, white and stripes in both themes. The checker has 23/34 rows under (light) and 17/34 (dark), because with no blur the squares never average to the declared mean (the checker Dialog dark reads muted 3.51). M-8 bleed 1.07-1.13, C 0.0045-0.0178.
- Every dock row: UNMEASURED in Playwright WebKit (it crashes on any page that mounts GlassDock; re-observed here, since WebKit cells run `nodock=1`).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), for every row above, the Dialog's four-level RCS chain, and the recalc cost.

**Not re-measured here:** style-recalc cost (the spec's +10-17% Chromium, about 2.1× Playwright WebKit, `D3-C Q4`). The source adds a `@layer` move and one utility over c5, and neither is on the recalc path, so the research figure stands unverified on this exact tree.

## 4 · Gestalt read (Chromium, demo build, before and after)

`…/gestalt.mjs` captures 40 cells per build: glass-material story, dock overview, Dialog (the `free` trigger opened), Popover (the form pod opened) and the sidebar rail, at 1440 and 430 wide, light and dark, over the shell aurora and over paper.
- "Paper" hides the shell aurora and, in the prototype, pins `--glass-ground-lo/-hi` to `var(--background)` with `!important`, so the page is honestly a page with no substrate.
- Files: `…/shots/head-*.png`, `…/shots/proto-*.png` (before the state-veil cure) and `…/shots2/proto2-*.png` (final).
- Side-by-side pairs: `…/pairs/pair-*.png`. Triptychs (HEAD, c5 state veils, final): `…/pairs/triple-{dock-430-light-paper,sidebar-1440-light-paper,dock-1440-light-aurora}.png`.
- No page errors in any capture (`…/gestalt-*.log`).

| subject | HEAD | prototype | read |
|---|---|---|---|
| Dialog, light, aurora and paper | a smoke-brown slab on the scrim; the Cancel label near invisible | a warm cream card, near opaque (the room floor `--glass-floor-e: 0.98`); Cancel, caption, well edge and Close all legible | the S-8 cure works. The Dialog no longer reads as glass: the scrim-plus-room model makes it a card |
| Dialog, dark | a dark plate with light ink | nearly the same, with a warmer, slightly lighter plate | small change |
| Dock, light, aurora | tinted brown pills over the field | cream pills that barely transmit the field (the floor lifts them into the band; `D3-C §5` item 8) | legible, but the dock reads as a chip, not a lens |
| Dock, dark, aurora | glowing warm pills (`saturate(1.3) brightness(1.14)`) | flat dark-brown pills; the glow is gone with the one filter recipe | the dock loses its dark lustre (`D3-C §5` item 9) |
| Dock and sidebar, selected state, light | a grey pill marks the current route | c5: **no pill**, the selected item indistinguishable (break 3). Final: a warm grey pill returns (`triple-*`) | cured in the patch |
| Sidebar rail, light | black icons on a grey rail | a cream rail with brown icons (the solved `-strong` rung) | quieter, less contrast between icon and rail than HEAD's black |
| Popover, light | a grey-brown plate over the page | a cream plate; the fields and labels crisp | better |
| Popover and stage cards, dark | plates within 0.011 of the page | plates visibly lift off the page (M-6 dark green) | better |
| glass-material story | the sampler card reads `sampled · canvas · 0.643` | the declared-ground card: over the blue ground a light plate with dark ink in light, a dark plate with light ink in dark; the alert plates read solved muted ink | the new specimen shows the mechanism; the tint section now re-points `--card` |

Overall: C trades transparency for legibility. Over the aurora, the light chrome is nearly opaque cream, and the dark dock loses its glow. Over paper, the light ladder is flat: five rungs within ΔE 0.002 of each other (M-6 light, S-7). Nothing on the page reads as a lens in light except the content plates over the field.

## 5 · Every break, in one list

| # | break | status |
|---|---|---|
| 1 | Consumer ground declarations below `:root` never reached the solve | cured (`glass-ground` utility) |
| 2 | Grasp held-rung invalid (`--glass-veil-rest` dropped); dock plate could not shed its veil | cured |
| 3 | Selected and hover pills invisible on the light dock and sidebar | cured (foreground state veils) |
| 4 | 20 other `--glass-plate-*` declarations in 16 files (menu rows, segmented track, capsule, layer switcher, control surfaces, checked fill, metric, avatar, sheet shade, feedback tone, …) are now card frosts without floor or ink | **recorded**, not cured; each needs a state-veil or scope decision |
| 5 | `token-graph` alias-cycle gate reads the inherited hand-off as a cycle | **recorded**; needs an owner ruling on cross-element edges |
| 6 | The music-staff folio's "one chromatic writer" was the retired ink; now a `--card` re-point, a guessed value (`folio 40%` over `--background`), not measured | recorded (unmeasured) |
| 7 | `contrast-computed` A-1 can no longer compute the in-glass muted rung statically | test retired; M-2 is the witness |
| 8 | The dark Dialog well: perimeter 2.53, ring 2.83 (2.41 / 2.71 declared black) | recorded, as the spec states (S-2) |
| 9 | W-C's upper edge: wells to 7.27, dark field content to 6.62 | recorded, as the spec states |
| 10 | Two substrates, one pair: `DockStage` mounts a second `<Aurora>` over the shell's, and both write `--glass-ground-lo/-hi` on `document.documentElement`; the last watch to run wins | recorded (the spec's open gap, now observed on a real route) |
| 11 | `fed` dock in the harness still passes `background-canvas`, which falls through as an inert attribute | harmless; the harness is not this seat's to edit |

## 6 · Fences and deviations

- The only writes to the checkout are this file (Write tool) and `pass-1/D3-C-proto.patch`. The patch was placed with `cp` from scratch, not the Write tool, because a 167,840-byte patch re-typed by hand risks corruption. The sha256 of source and destination match.
- **One git write beyond worktree add/remove:** the sampler deletions used `git rm` in the worktree, which staged them in the worktree's index (`.git/worktrees/<name>/index`). The main checkout's index and HEAD are untouched. The patch is `git diff HEAD`, so it carries the deletions.
- Vite's config loader wrote its transient `vite.config.ts.timestamp-*.mjs` into `node_modules/.vite-temp/`. `node_modules` is the checkout's, symlinked, so this landed there, and vite removed the file itself (the directory is empty). Its `configLoader: "runner"` alternative fails on this config (`ERR_AMBIGUOUS_MODULE_SYNTAX`).
- HEAD's "before" demo was built from `git archive HEAD` into scratch. Every build output and vite cache sits under scratch. The worktree is removed with `git worktree remove --force` before returning.
- No browser MCP was used. value.js and every sibling repo were not touched.

## 7 · Open gaps

- **Real Safari:** UNMEASURED (owner's safaridriver checkbox) for the model, the solve, the Dialog's four-level chain (`D3-C Q5`), the recalc cost, and the whole battery.
- **The 20 other `--glass-plate-*` declarations** (break 4) need a census in paint: which were darkening states, and what each becomes.
- **The token-graph gate** (break 5) needs a ruling.
- **The spec's own open gaps stand:**
  - no publication outside `<Aurora>` (`useAurora` consumers);
  - the bound is the static field's (no live drift or breath);
  - two substrates share one pair (break 10);
  - no inertia (D-1) on a ground change. A registered-colour transition on `--glass-ground` was not probed.
- **The cure for the dark Dialog well** consistent with C (a well with no `backdrop-filter`) is not probed.
- **The light ladder's flatness (S-7)** is the battery conflict the owner must rule on.
- **Recalc cost** was not re-measured on this tree.
