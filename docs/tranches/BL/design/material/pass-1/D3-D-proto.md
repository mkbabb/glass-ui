# D3 · pass 1 · D3-D · the calibrated ladder (prototype)

| field | value |
|---|---|
| seat | pass-1 PROTOTYPE seat for family D3-D, "the calibrated ladder" |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **RUNS.** The spec is implemented on the real source, builds, typechecks, passes the unit suite, and the battery runs on it in Chromium and Playwright WebKit, both themes |
| HEAD | tasked at `9aa2b7f9`; the worktree was cut at `76f4209a` (the checkout's HEAD). `git diff --stat 9aa2b7f9 76f4209a -- src` touches 5 files, only `components/configurator/*` and `src/index.ts`; none is on the glass material path |
| inputs | `SPECS.md` (the D3-D section and SHARED FACTS only), `pass-1/D3-D.md`, `harness/HARNESS.md`. No other family's spec, prototype or critique was read |
| worktree | `git worktree add --detach $S/wt HEAD`. `node_modules` first as one symlink, then (after vite's config loader wrote a transient file under the checkout's `node_modules/.vite-temp`, see break 16) as a real directory of per-entry symlinks into the checkout's `node_modules`. `tests-visual/node_modules` is absent in the checkout, so no link was made. All builds wrote under the worktree or `$S`. Removed with `git worktree remove --force` before return. No git write other than worktree add/remove; untracked files entered the patch through `git diff --no-index`, which touches no index |
| instruments | Playwright from `glass-ui/node_modules`; headless Chromium 149.0.7827.55 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5. **Playwright WebKit is not Safari.** Every WebKit number below is labelled "Playwright WebKit"; every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| scratch | `S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-D-proto`. Logs `$S/{emit1,typecheck,build,vitest-scope,vitest-full,run-proto,gestalt-chromium}.log`; battery `$S/out/caps/proto/results/*.log`; gestalt `$S/gestalt/` |
| load | load averages 21-36 through the runs; other seats shared the machine |

## 0 · What the prototype is

The research seat's candidate (`D3-D-research/p3/candidate.diff`, 17 files) was the starting point. It applied cleanly to `76f4209a`. This seat then finished the spec where the candidate stopped:

1. **Margins, run.** `solve.mjs` takes `--bleed`; `emit.mjs` solves M-2 at **4.65** and M-8 bleed at **1.20** (`SPECS D.1`, "specified and not yet run"). The header names both.
2. **Liveness, enforced.** `emit.mjs` refuses to run while any corpus field has OKLab L spread (p99 − p01) under 0.005. On the research corpus it refused, naming exactly the four default-blob frames (`$S/liveness.log`: `chromium-metal-{blob-,}{light,dark}-BLOB-c1.png`). They were removed; the corpus is 74 PNG, 71 MB.
3. **Corpus manifest.** `scripts/glass-solve/corpus/MANIFEST.json`: engine, backend, viewport, the liveness rule, and one row per field with its sha256 and licence line. `.gitignore` gains `!scripts/glass-solve/corpus/*.png` (the repo ignores `*.png`).
4. **The sampler, fully deleted** (the candidate removed the call site only): the three composables (746 lines), their unit test (109 lines), the `elementsFromPoint` test stub, and every demo binding: `DockStage.vue` (shared observer, `preserveDrawingBuffer`, the scoped `backgroundCanvas` slot prop), the `:background-canvas` bindings in `layers`, `sections`, `cta-receive`, `dock-search`, and the glass-material story's live-canvas section.
5. **The orphaned signal, deleted** (E-1; the spec left it "owed to the wave"): the `@property --glass-backdrop-luma` registration, `--glass-backdrop-luma-knee`, the `--glass-backdrop` bucket default and its three writers (`ladder.css` floating and overlay, `shell.css`). After the candidate removed every `@container style(--glass-backdrop …)` reader, no reader was left.
6. **The glass-material story** now demonstrates the pole: its tint row re-points `--glass-veil-pole` (was `--glass-veil-ink`), and its intro and alert copy no longer claim an observer-driven darken.
7. **Tests re-pointed at the one source of record.** Seven test files read the hand ladder (`base ± n·step`, `--glass-veil-ink`, radii 10-22, `--ink-perimeter` in `color-radius.css`). They now read `glass.solved.css`. `glass-subtlety.test.ts` asserts: line 1 names the solver; the header states the corpus digest and each theme's feasibility; every solved token sits in both theme blocks and in no hand-written token file; the ladder is ordered in both modes; `--glass-veil-{ink,base,step}` appear nowhere in `src`.

Everything else in the spec is the candidate as the research seat left it: the pole and per-level α, blur and saturate from the generated file, the dock's `--muted-foreground` to `--on-glass-muted`, the inactive tab to `--dock-fg-on-aurora`, the Close ring through `--ink-perimeter`, `contain: paint` off the content rungs, the bright bucket and `contrast-color()` gone.

Diff: 43 tracked files, +200 / −1596, plus 7 new files (4 solver scripts, `stages.json`, `MANIFEST.json`, the 59-line generated file; 406 lines together). The 71 MB corpus is not in the patch (binary). It is copied to `$S/corpus/` (74 PNG plus `MANIFEST.json`): the research seat's `D3-D-research/out/corpus/` minus the four dead frames. To re-run `emit.mjs` or W-D after applying the patch, copy it to `scripts/glass-solve/corpus/`. The after-demo build is kept at `$S/demo-after/`.

## 1 · Build and unit gates (commands run in the worktree)

| gate | result |
|---|---|
| `node scripts/glass-solve/emit.mjs` | wrote `glass.solved.css` in 4:46 wall (840 backdrops in 125.1 s, then the solve; `$S/emit1.log`) |
| `npm run typecheck` | **exit 0**. The first run failed only on `tests/components/fourier-field/FourierField.smoke.test.ts` resolving `@mkbabb/glass-ui/fourier-math` from `dist/`, which a fresh worktree does not have. After the library build it passes |
| library build (`vite build`, cacheDir in `$S`) | exit 0; `glass-ui:ready`, 63 public declaration entries |
| `npx vitest run tests/styles tests/components/custom/dock tests/composables` | **87 files, 868 passed**, 6 expected-fail |
| `npx vitest run` (whole suite) | **238 files, 2311 passed**, 10 expected-fail, 1 skipped, and 1 failure: `boot-graph` "dist-demo is NEWER than every source", because the demo was built before the last copy edit. Rebuilt, `boot-graph` passes 14/14. A `DropdownMenu contract` focus-restore case failed once under load and passed alone and in the next full run |

## 2 · The emitted file

`src/styles/tokens/glass.solved.css`, header: `Corpus sha256 fa0795d8e09f6280; engine Chromium 149.0.7827.55; band as-written; blur cap f48; ink floor (ΔL 0.1); M-6 sep 0.012; M-2 solved at 4.65; M-8 bleed solved at 1.2. light: INFEASIBLE: M-6 ×4. dark: feasible.` The digest differs from the research seat's `b8312697c243a289` because the dead frames left the corpus.

| token | light (margins) | light (research, no margin) | dark (margins) | dark (research) |
|---|---|---|---|---|
| pole | `rgb(255 255 251)` | same | `rgb(0 0 0)` | same |
| wash · quiet · resting | 0.607 · 0.607 · 0.607 | 0.600 ×3 | 0.751 · 0.852 · 0.945 | same |
| floating · overlay | **0.729** · 0.729 | 0.678 | 0.951 · 0.955 | same |
| dialog · dock | 0.937 · **0.805** | 0.937 · 0.768 | 0.853 · **0.824** | 0.853 · 0.799 |
| blur wash…overlay | 0 · 6 · 6 · 9 · 9 px | same | same | same |
| saturate | 1 everywhere | same | 1 | same |
| `--on-glass-muted` · `--ink-perimeter` | `rgb(66 45 23)` · 0.82 | same | `rgb(206 196 183)` · 0.82 | same |

**What the margins cost.** Light content +0.007 α (M-2 muted over black binds), light chrome +0.051 (M-8 over the stripes binds), light dock +0.037, dark dock +0.025. Dark content and chrome do not move: page separation (M-6) already held them above the margin. The dialog does not move in either theme: the scrim model in `emit.mjs` binds it. Transmission: light content T 0.393, chrome 0.271, dock 0.195, dialog 0.063; dark T 0.249 / 0.148 / 0.055 / 0.049 / 0.045, dock 0.176 (`$S/emit1.log`).

## 3 · The battery, both themes

`D3_OUT=$S/out node harness/run.mjs $S/wt --label proto`: 68 cells and 8 live windows in 612.7 s, the retune in 53.5 s, all 14 witnesses; 15:29 wall (`$S/run-proto.log`). Chromium is the gate engine.

| witness | Chromium (gate) | measured | Playwright WebKit (paint-only, informational) |
|---|---|---|---|
| M-1 no grey | **FAIL 1/11** | Light over paper: content `#fdfdf9` L 0.993 ΔE 0.008; floating, overlay, dock `#fefefa` L 0.996 ΔE 0.011; dialog rung `#fffffb` L 0.999 ΔE 0.014; **the real Dialog `#fafaf6` L 0.984 ΔE 0.003**. The red row is `.glass-opaque` = `--card` `#fdf5ec` L 0.974 (S-6), not a solved token | FAIL 1/10, the same row; plate hex identical |
| M-2 text | **PASS 560** | The binding cell is now light wash muted over black and over the checker: **4.65** (was 4.54). Light fg ≥ 6.28, muted 4.65-12.94; dark fg ≥ 8.47, muted ≥ 6.12; light c1 aurora muted 7.65-12.28; dialog muted 11.22-12.39; dock light c1 fg 13.69 / muted 10.22 | **FAIL 8/532**: light muted over black **4.48**, over the checker **4.45** (was 4.35-4.41). The 0.15 margin does not cover this engine's 0.17-0.20 glyph gap |
| M-3 non-text | **PASS 266** | Well perimeter 8.18 on paper, 3.74 minimum (light wash well over black); rings 8.76-9.17 on paper; Dialog Close 8.37-8.88 light | PASS 266 |
| M-4 dock register | **PASS 14** | fg `#1c1917`, muted `#422d17`, ΔL_OK 0.100 on all seven light grounds | dock UNMEASURED in Playwright WebKit (crash) |
| M-5 live dock | **PASS 16** | 0 getImageData, 0 readPixels in all 8 windows, default and fed | Chromium-only witness |
| M-6 separable | **FAIL 4/19** | Light adjacent 0.000 / 0.000 / 0.003 / 0.000: the proven M-1 × M-6 conflict (S-7). Dark adjacent 0.016 / 0.017 / 0.030 / 0.046; page ΔE 0.058-0.146; dock 0.061; the real Dialog 0.062 | FAIL 4/18, same rows |
| M-7 halos | **PASS 8** | reach 18 px light, 17 px dark, at every host | PASS, 14 px everywhere |
| M-8 calm | **PASS 8** | Light floating and overlay bleed **1.21**, C 0.0174 (target 1.20; was 1.25); dock 1.20; dialog 1.00-1.04. Dark 1.02-1.10 | FAIL 2/8: light floating and overlay bleed **1.34** (was 1.43); no `backdrop-filter` is painted |
| **W-D (own witness)** | **FAIL 4/9** | Leg 1 **byte-identical**: the witness ran `node scripts/glass-solve/emit.mjs` in the worktree and the output matched the committed file. Leg 2 under `--gate chromium,webkit`: M-1 2/21, M-2 8/1092, M-6 8/37, M-8 2/16 FAIL; M-3, M-4, M-5, M-7 pass | — |
| W-A · W-B · W-C · W-E · W-F | FAIL 20/197 · 16/24 · 299/304 · 20/360 · 66/152 | Other families' witnesses, as the harness prints them; identical counts to the research seat's run | — |
| real Safari | UNMEASURED (owner's safaridriver checkbox) in every row | | |

**Witness summary.** Chromium: M-2, M-3, M-4, M-5, M-7, M-8 GREEN; M-1 RED on the `--card` escape only; M-6 RED in light only (a battery conflict, not a ladder defect); W-D RED on leg 2 alone. Playwright WebKit: M-3, M-7 GREEN; M-2 RED (8 rows, glyph rasterisation), M-8 RED (2 rows, no blur), M-1 and M-6 RED for the Chromium reasons, dock rows UNMEASURED (crash).

## 4 · Gestalt read

`node $S/gestalt.mjs $S/demo-before $S/wt/dist-demo $S/gestalt`: the demo built from HEAD (before) and from the prototype (after), served as static builds through the demo's own `?capture=<route>&mode=` harness, Chromium, 1440 and 430 wide, light and dark. "Paper" hides the shell field. "Aurora" puts the frozen `DEFAULT_AURORA` c1 corpus frame under the page, the same pixels the solver calibrated against. Scenes: the glass-material story, the dock overview, the "free" Dialog opened, the "Dimensions" Popover opened; the sidebar rail is in every frame. 64 captures, 0 errors (`$S/gestalt/chromium-index.json`). Side-by-side pairs (left before, right after): `$S/gestalt/pairs/*.png`. The harness specimen pairs (HEAD capture on the left, prototype on the right, both engines): `$S/gestalt/specimen/*.png`. Playwright WebKit cannot capture the demo: the shell mounts a `GlassDock` and the page crashes before and after (`$S/gestalt-wk/webkit-index.json`).

- **Light over the aurora** (`pairs/material-1440-light-aurora.png`, `specimen/chromium-light-aurora-ladder.png`). Before, every plate is a translucent orange or amber pane of the field. After, every plate is the same pale peach frost. The wash, quiet, resting and card plates are one paint, and the field is 60% gone under them. The popover and dock read as cream cards. Text is crisp everywhere; the wells now sit darker than their plates.
- **Light over paper** (`pairs/dock-1440-light-paper.png`, `pairs/dialog-1440-light-paper.png`). The dock and the sidebar rail turn from grey stadiums into white capsules barely off the page. The Dialog is the largest win: HEAD's smoke-brown slab with a near-invisible caption becomes a white card with legible caption, well edge and Close ring.
- **Dark** (`pairs/material-430-dark-paper.png`, `specimen/chromium-dark-paper-ladder.png`, `pairs/dialog-1440-dark-aurora.png`). Every plate is a black slab darker than the page it sits on. The five rungs separate, but by getting blacker, so the ladder reads as depth into holes rather than lift. The dark dock and Dialog are black pills over a warm field.
- **At 430** (`pairs/popover-430-light-aurora.png`). The Popover and the bottom dock become cream cards over the field; the "Inspect Fourier profile" Surface loses its field colour.
- **A new artefact: the focus veil turns into a white fog** (`pairs/dialog-1440-light-{paper,aurora}.png`). A soft bright pool about 1.4× the Dialog's size shows around the light Dialog. It is `.glass-focus-veil`, whose dim is `color-mix(in oklab, var(--glass-plate-overlay) 50%, transparent)` (`tokens/glass.css:89`). With a white pole that "dim" lightens. Measured under the scrim with the Dialog hidden, at y 450: outside the veil `rgb(137 127 118)` in both builds; inside it `rgb(132 116 107)` at HEAD (it dims) and `rgb(180 174 169)` in the prototype (it brightens) (`$S/probe-bloom2.mjs`, `$S/bloom-{a,b}.png`).

## 5 · Breaks, recorded

1. **The PROPORTION register breaks.** `--ink-perimeter` 0.82 (stage 2) breaks PROPORTION §1.2's stroke ratio seam : edge : perimeter = 1 : 2 : 6 (0.82 = 10.25 × seam) and the indicator mass identity (2 px at 0.24 = 0.48). `tests/styles/proportion-register.test.ts` failed 5 cases; the prototype amends it to read the solved value as a floor (≥ 0.48, ≥ 6 × seam) and drops the identity. This is a ruling between D3-D and the PROPORTION register, not a test fix.
2. **The focus veil lightens** (§4). Every hand consumer of a `--glass-plate-*` colour that assumed an ink veil now paints toward white in light: the focus veil for certain. The others were not audited here: `--control-checked-bg`, `--dock-control-active-bg`, `--dock-layer-switcher-active` and `components.css:22` all read `--glass-plate-floating`.
3. **Dark plates sit below the page** (research counterexample 2, now in paint): wash `#030202`, overlay `#000000` against the page `#0b0a09`.
4. **Light glass disappears** (counterexample 1, now in paint): T 0.39 on content, 0.27 on chrome.
5. **The margin does not buy engine safety.** Playwright WebKit still reads M-2 at 4.45-4.48 (gap to Chromium 0.17-0.20 at the solved α), and M-8 at 1.34 with no blur. W-D leg 2 stays RED until the harness gates on `chromium` plus real Safari (the research seat's amendment, not made here; the harness is outside this seat's writes).
6. **Wash has no blur.** r 0 px is the solve's choice for wash in both themes; the plate is a flat tint, and `blur(calc(0px * level))` is emitted.
7. **The deep tier shrinks with the ladder.** Deep radii are now 1.75 / 7.75 / 7.75 / 12.5 / 14 px (were 11.75 / 15.75 / 17.75 / 23.5 / 27); `Surface.test.ts` literal amended. Quiet and resting deep are equal, because their plain radii are equal.
8. **`--glass-saturate` is still emitted** as one token beside the six per-rung ones, because `surface-axis.css`, `deep.css`, `focus-veil.css`, `dissolve.css` and `sheet/styles.css` read it. Two names for one fact (P-3); the spec's "deleted as a written token" holds only in the narrow sense.
9. **`emit.mjs` restates tokens.** Its scrim model hard-codes the page colours `#fbfaf8` / `#0b0a09` and `--overlay-scrim` as `hsl(24 10% 10%)` at 50%. These are copies of token values (P-3), and they set the dialog α (0.937 / 0.853).
10. **The solver depends on the design harness.** `solve-lib.mjs` and `backdrops.mjs` import `docs/tranches/BL/design/material/harness/lib.mjs`. A shipping script cannot depend on a tranche document; the maths and the static server must move under `scripts/`.
11. **The corpus is ignored by default.** `*.png` is gitignored; the prototype adds the exception. It is 71 MB of committed binary.
12. **The G2 "darken dynamically like iOS 27" edict is retired, not met.** With the sampler gone, the dock's plate is static chrome solved over the corpus. It is legible (M-4, M-5 green), but it no longer responds to what is behind it. Whether that satisfies D-2/D-3 (engagement) is an owner reading.
13. **Comment debt.** Eight source sites still narrate the removed clamp or observer: `glass/ladder-undershadow.css:17`, `glass/surface-axis.css:42`, `glass.css:47`, `glass/surfaces.css:58`, `button/styles.css:126`, `_shared/feedback/feedback-tone.css:38`, `dock/styles/shell.css:222`, `dock/styles/dock.css:15`. `GlassDock.motion-parity.test.ts` and `GlassDock.touch-gate.test.ts` still mount `backdropMode: "static"` to dodge a sampler that no longer exists.
14. **The dead default blob.** The liveness check refused four frames. The blob hero in the corpus is now only `BLOB_PRIMARY`; the default blob renders nothing on this engine and is outside the guarantee until it is re-captured.
15. **M-1 × M-6 in light** remains (S-7): the witness reads light adjacency 0.000-0.003.
16. **Fence note.** The first demo build ran vite's default config loader through the symlinked `node_modules`, which creates and removes a temp file under the checkout's `node_modules/.vite-temp`. The directory was left empty. After that the worktree used a real `node_modules` directory of per-entry symlinks, so later builds wrote their temp files there. No tracked file in the checkout was touched.

## 6 · Cost

- **Code:** −1596 / +200 tracked lines. Deleted: the 746-line sampler and its 109-line test. Added: 406 lines of solver, manifest and generated file.
- **Time:** emit 4:46 on Metal under load 21-27; battery 15:29 including W-D's re-solve.
- **Transmission:** §2. The calibrated ladder under the as-written battery is thicker than 7.0.0 at every content rung.

## 7 · Open gaps

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- The band ruling (content over black and white, or not) is still the family's largest lever and the owner's (research: α 0.600 → 0.113 in light content).
- M-1 × M-6 in light: an owner ruling on M-1's radius, on M-6 over paper, or on separating levels by non-paint means.
- The PROPORTION ratio law against the solved perimeter (break 1): an owner ruling.
- The plate-colour consumers that assumed an ink veil (break 2): audit, and a decision on what a "dim" is when the pole is white.
- Dark lift: the objective has no term that makes a dark plate lift off the page (break 3).
- Engine margin: 0.15 of ratio is short by 0.02-0.05 in Playwright WebKit; the real-Safari figure is unknown.
- W-D's harness amendment (`--gate chromium` plus Safari) is owed to the harness owner.
- Common floor row 5 (the well as a rung) is not done; the well is still the opaque `--input-on-glass`.
- Consumer fields (value.js seed space, keyframes' 0.1 hero, fourier's prose and canvases) are not in the corpus; chicago's photos cannot enter it. The default blob needs a re-capture.
- The dock rung cannot be calibrated in Playwright WebKit (crash), and the demo cannot be captured there at all.
