# D3 · pass 2 · FLOOR: the one patch every pass-2 route applies

| field | value |
|---|---|
| seat | D3 pass 2, FLOOR-PATCH. Builds REGISTRY §3.2 (FL-1..FL-13) once on the real source, with §3.4's banked sub-choices and §5's pass-2 defaults |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree cut at `53591c0f` (checkout HEAD). `git diff --stat 020f6586 53591c0f -- src demo tests package.json` is empty, so the base is the tasked material |
| patch | `floor.patch` (this directory), `git diff HEAD` of the worktree: 70 files, +619 / −2016, 5 files deleted. `git apply --cached --check` is clean against a `020f6586` index and against `53591c0f` |
| engines | Chromium 149 and **Playwright WebKit 26.5** (headless, paint-only, `+shim` on dock rows). Playwright WebKit is not Safari. **Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 284-670 for the whole seat (other sessions). Every timing below carries its load |
| status | **Patch built, typechecked, unit-tested and library-built. The full H2 run on HEAD+floor did NOT complete inside this seat** (§4): after 4 h 19 min at load 366-670 it had captured 94 of 108 cells and the Chromium windows, with three cells timed out. What H2 read on HEAD+floor is a 24-cell smoke capture, reported as partial |

## 0 · In brief

- **The bound is now one computed number.** `--glass-bound` (`tokens/glass.css:248-292`) is solved in CSS from `--on-glass-muted-l`, `--card-l`, `--glass-ink-target` 4.8 and `--glass-bound-ground` (0 light, 1 dark). It computes **0.891 light, 0.873 dark**; W-A reads it on every plate and the thinnest painted rung sits on it: light α 0.890 (−0.001), dark 0.875 (+0.001), in both Chromium and Playwright WebKit (smoke). Every rung derives from it; no α literal survives (the unit row "MOVES with the ink" proves a muted-ink retune moves every rung).
- **Chrome holds 4.5 over black and white, both themes, both engines** (smoke W-A legs 2): worst Chromium light 4.83, dark 4.84; Playwright WebKit light 4.62, dark 4.84.
- **State fills read ink, the veil reads the scrim** (FL-6). Smoke M-9 over paper: active ΔE 0.078/0.096, hover 0.035/0.042, checked 0.488/0.335, selected 0.193/0.227 (light/dark, Chromium); the light focus veil dims ΔL −0.070. HEAD's dark dock fills read ΔE 0.004-0.005 (H2 §3.2).
- **Typecheck clean** (app and test projects). **Unit:** every failure is accounted for (§3). **Library build:** clean. **Package verifier:** `G-BUNDLE-RATCHET` shrink, owed a deliberate rebind at commit.
- **Not built here, by design:** FL-13's consumer addenda live in other repos (§1, FL-13 text is ready to paste). The dark `--ink-perimeter` arm is Q-6's and A′'s (§7.3 item 3), and `proportion-register.test.ts:173` forbids minting it unmeasured.

## 1 · The rows

Line numbers are in the patched worktree (`53591c0f` + `floor.patch`).

| row | what the patch does | where |
|---|---|---|
| **FL-1** sampler deleted | `useGlassBackdropLuminance.ts` (413), `backdropLuminanceSample.ts` (279), `backdropSampleMath.ts` (54), their test (109), `docs/consumer-evidence/use-glass-backdrop-luminance.md` deleted. `backgroundCanvas` prop, observer wiring and `useDockShellProps` arm gone (`GlassDock.vue`, `useDockShellProps.ts`); the clamp and knee (`veil.css`), `--glass-backdrop-luma` and its `@property` (`property-regs.css`), `--glass-backdrop` bucket and both `contrast-color()` glass inks (`ladder.css`, `glass-fx.css`, `dock/styles/shell.css`, `adaptive-legibility.css`). Demo: `DockStage` observer, `preserveDrawingBuffer`, `data-glass-field-canvas` (`DockStage.vue`, `AppShell.vue`), every `:background-canvas` (4 stories), `StoryHero`'s bucket write; the story's live-sample card replaced. `tests/setup.ts` drops the sampler's `elementsFromPoint` stub. No alias: the residue grep finds none of the names in `src`, `demo`, `tests` | as listed |
| **FL-2** `contain: paint` off the rungs | the clip register is deleted; `material.css:66-78` now names the rung's own `backdrop-filter` as the backdrop root. Stale prose corrected at `ladder.css:38`, `surfaces.css:35`, `grasp.css:30` | `glass/material.css` |
| **FL-3** the `--card` pole | `--card: oklch(var(--card-l) 0.011 63.36)` with `--card-l: 0.9799` (`color-radius.css:83-84`), byte-identical to `hsl(30 85% 97%)` `#fef7f1` (round-trip checked); dark `--card-l: 0.2949`, `#352a22` (`dark-arm.css:95-97`); `--card`/`--popover` leave the `light-dark()` fold (a number cannot ride it, `light-dark.css`). `accent-tone-solve.ts:29` `DEFAULT_SURFACE` is the same colour in oklch, and its test reads the token file with `--card-l` substituted. No `--glass-veil-pole` or `--glass-veil-ink` token (unit row "paints ONE pole") | tokens |
| **FL-4** unknown ground → the bound | every rung's thinnest α is `var(--glass-bound)`; no thinner arm ships. `@property --glass-veil-rung` initial is now 1 and `--glass-bound`'s is 1: an invalid solve paints an opaque plate, loud and legible (E-2) | `glass.css:248-292` |
| **FL-5** one source of record | B's encoded-tone solve, any-input pole (light ground 0, dark 1): `--glass-ink-y = L³`, `--glass-pole-y`, `--glass-need-y/e`, `--glass-pole-e`, `--glass-bound = clamp(0, (E(need) − g)/(E(pole) − g), 1)`, declared on `:root, .dark` so a dark island re-derives. Registered `<number>` (`glass.css:288`), so H-4's `--glass-bound` reads as a number on every plate. Target 4.8 = 4.5 + 0.3 raster margin (PF-15: WebKit loses 0.13-0.20). `--glass-veil-step = (1 − bound)/3`; wash, floating, chassis, dock, crown = bound; quiet, overlay, sheet = bound + 1 step; resting = bound + 2 steps; dialog 1. The dark arm declares only `--glass-bound-ground: 1` (`dark-arm.css:276`). A's three copied literals, its content band and its prose are gone; the unit test evaluates the token arithmetic and checks the composite clears the target (light and dark, ≤ target + 0.05) | `tokens/glass.css`, `glass-subtlety.test.ts` |
| **FL-6** no state fill reads a plate | to the one-ink fill register: menu row (`menu.css:10`, `--fill-hover`), capsule track (`glass-capsule.css:82`), segmented wake (`segmented.css:228`), configurator active chip (`configurator/styles.css:529`, `--fill-selected`), dock press (`sizing.css:259`), the dock hover/active/layer-switcher fills (`sizing.css:204-205`, from A), control hover (`glass.css:233`, rest plate + `--fill-hover`), checked control (`scale-paper.css:106`, `--primary` 88% over transparent). To the scrim ink: the focus-veil dim, one declaration for both modes (`glass.css:109`, `--overlay-scrim-ink` 10%; the dark arm deleted) and the sheet seam ramp (`sheet/styles.css:361-364`, `--overlay-scrim-subtle`). `--glass-plate-*` stays a paintable colour (value.js `PaneHeader.vue:101`, avatar, metric, ghost-slot, input-bar, feedback fallback still read it as a plate) | as listed |
| **FL-7** held never sheds below the bound | `@utility glass-plate` declares `--glass-veil-floor: var(--glass-bound)` (`veil.css:50`); the held rung is `max(calc(rest × 0.6), var(--glass-veil-floor, 0))` (`grasp.css:134`). `liquid-fill.css` (not a plate) has no floor and keeps its whole band. `--glass-saturate-grasp: calc(var(--glass-saturate) * 7 / 6)` (`glass.css:74`), the 1.75 derived | `glass/veil.css`, `glass/grasp.css` |
| **FL-8** the Dialog is a room | `--glass-veil-dialog: 1` in both themes (A had dark 0.94); the dialog rung paints α 1.000 (smoke W-A) | `glass.css:285` |
| **FL-9** one dock filter | the light `saturate(1.2)` and dark `saturate(1.3) brightness(1.14)` re-compositions deleted; the dock rides `--glass-blur-resting` (`shell.css:20`) | `dock/styles/shell.css` |
| **FL-10** indicators through the perimeter token | the Dialog Close ring (`dialog/styles.css:144, 243`) reads `--ink-perimeter` (0.52, `color-radius.css:147`). Q-6 default (a): one translucent rung, PROPORTION 1 : 2 : 6.5 re-pointed in `proportion-register.test.ts`. The dark arm (about 0.54) is not minted: unmeasured, and the test at `:173` forbids it | `dialog/styles.css` |
| **FL-11** the well is a rung | `--glass-well` = the pole toned 8% toward `--glass-well-toward` (fg light, page dark) at the bound (`glass.css:157`); `--input-on-glass` retired; the field control drops its own `backdrop-filter`, its transition leg and the hover blur (`control.css:97-100, 124-132, 196-206`), and `forms-seam.test.ts` now asserts no filter. PF-14: `--neutral-5` leaves the `light-dark()` fold, one declaration per mode (`color-radius.css:45`, `dark-arm.css:61`). The muted ink over glass carries L as its own token (`on-glass-fg.css:35-36`, `dark-arm.css:293-294`), bytes unchanged | tokens, `field/control.css` |
| **FL-12** prose | every touched file re-read: `veil.css`, `glass.css` §8 header, `grasp.css`, `material.css`, `ladder.css`, `rim.css`, `surfaces.css`, `surface-axis.css`, `control-surfaces.css`, `glass-fx.css:2`, `on-glass-fg.css`, `dark-arm.css`, `dock.css:14`, `menu.css`, `configurator`, `scale-paper.css`, `sizing.css`, the glass-material story. Three token-comment contrast claims moved by 0.01 with the card's last bit and are re-derived (§3). Residue not touched (not in touched files, and not FL-1 names): "observer" as an unrelated word across 20 files | as listed |
| **FL-13** consumer addenda | not in this patch (other repos, E-6). Ready text below | — |

**§3.4 and §5 choices taken.** Blur 6/10/12/16/16 (A's, Q-9 a, and O-87's "slightly less blur"; HEAD 10/14/16/20/22). Q-1 a: no light adjacency is engineered (M-6 light reds by construction). Q-3 a: all chrome at the bound. Q-4 a: dark plates lift toward the dark card (smoke dark ΔL +0.131…+0.137 over the page). Q-6 a, Q-7 a+b (an invalid solve paints α 1), Q-8: the floor has no adaptation motion. Not taken: `saturate(0.6)` and the icon dilation (thin-veil tools; no thin veil ships on the floor); the C solve, the publication primitive, the well shader and the D solver (route or bank items).

**FL-13 addenda, per consumer (X §3.2).**
- chicago: delete the dock floor 0.62 (`style.css:139-141`); the dock plate is at the bound in each theme against that theme's ink. Delete the count opacity (`style.css:102-105`) once M-4 reads green on HEAD+route.
- keyframes: delete `:background-canvas` (`ChromeDock.vue:370`, the prop no longer exists, so the binding is a type error at the next bump) and the dead tint-AA reclaim (`style.css:264-280`).
- fourier: retire `.glass-opaque` on the Configurator (`VisualizationView.vue:302`): floating now paints `#fef7f2`, ΔE 0.009 from the card (smoke M-1 row).
- value.js: X-W7L repins onto the floor. `--glass-plate-resting` survives as a paintable colour. THE STOP (S-24): the certified-ink model solves a `--card` pole at a rung α (SPECS:101), and every rung's α is now ≥ the computed bound, so it should clear; **unmeasured** here (sibling repo read-only).

## 2 · What each change costs, measured

| item | measure | source |
|---|---|---|
| T per rung, Chromium (light / dark) | wash 0.110 / 0.125 · quiet 0.075 / 0.086 · resting, card 0.035 / 0.043 · floating, dock, popover 0.110 / 0.125 · overlay 0.075 / 0.086 · dialog rung 0.000. Playwright WebKit identical to 0.001. HEAD wash 0.941 / 0.898 (H2 §3.3) | smoke `t-transmission.mjs` |
| painted α against `--glass-bound` | light chrome thinnest 0.890 vs 0.891; dark 0.875 vs 0.873; both engines | smoke W-A leg 4 |
| chrome over black/white | Cr light 4.83 (floating muted, black), 5.27 (white); dark 7.21, 4.84 · WK light 4.62, 5.03; dark 7.21, 4.84 | smoke W-A leg 2 |
| M-1 plates | opaque `#fef7f1` L 0.980 ΔE 0.010; dock, popover `#fef7f2` ΔE 0.009. 1 of 11 rows red in both engines (the row is in `baseline-smoke` mirror; the full-run row was not reached) | smoke |
| M-6 | light adjacent ΔE 0.001-0.004 (Q-1 a, structural); dark adjacent 0.004-0.011, from the page 0.132-0.139 with ΔL +0.131 or more (signed green) | smoke |
| M-9 | §0; 1 of 6 / 1 of 5 rows red (the aurora state cells were not in the smoke, which reads as missing) | smoke |

## 3 · Typecheck, units, build (worktree, cacheDir `.vite-floor` in the worktree)

| step | command | result | load |
|---|---|---|---|
| typecheck app | `vue-tsc --noEmit` | exit 0 (16 min) | 324-432 |
| typecheck tests | `vue-tsc --noEmit -p tsconfig.test.json` (after the build) | exit 0 (15 min) | 323-360 |
| library build | `vite build --config vite.floor.config.ts` | exit 0, twice (the second after the last source edit) | 360-446 |
| full units | `vitest run` (first source state) | **2253 passed**, 6 failed, 10 expected-fail, 4 skipped, 227 files. Failed: `boot-graph` ×3 (needs a root `dist-demo`, absent in any fresh worktree; same as A-proto), three token-comment claims (3.36 → 3.35, 4.62 → 4.61, 5.12 → 5.11: the card's last bit, `#fef7f2`→`#fef7f1`); file-level hook timeouts in `slider.size-tokens` and `GlassDock.stagger` and 11 "failed to start forks worker" — load | 323-377 |
| claims re-derived | the three comments and their `contrast-computed` entries rewritten to the computed figures | `color-radius.css:333, 387`, `light-dark.css:145` |
| rerun of every failing and worker-error file + `tests/styles` + `tests/composables/color` | `--testTimeout 240000` | **41 files, 523 passed, 5 expected-fail, 0 failed** | 341-353 |
| after the field-well edit | `tests/styles tests/components/field tests/gates/feedback-tint-seam` | 19 files, 257 passed, 0 failed; 11 worker-start errors (load 386-402). Their six target files rerun alone: **6 files, 164 passed** | 402, 535 |
| package verifier | `node scripts/verify-export-types.mjs` | **`G-BUNDLE-RATCHET` shrink 2,900,958 < 2,919,057** (−18,099 B, the sampler). Owed: a deliberate rebind from a committed-tree build at landing; not rebound here | 314-341 |

## 4 · H2 on HEAD+floor against the H2 baseline

**The full battery did not finish inside this seat.** `run.mjs <wt> --label floor --demo` started 19:54 at load 446; by 00:13 (load 366-670, peaking 670) it had captured 94 of 108 cells, the four Chromium live windows and the four Chromium motion windows. H2's HEAD run took 19 min 49 s at load 10-16. `cells.json` is written only at capture end, so no witness could read the full run. The run and its worktree were stopped when this seat returned. Under load, three cells timed out at `page.screenshot` (Chromium light aurora ladder, Chromium dark paper ladder, WebKit light black dialog) and two Chromium light motion windows got 11 and 6 step frames: all **NOT-REPRODUCED** (load), to be re-run.

What was read in the full run's log, Chromium: live windows light/dark × c1/c0.5 — **0 readbacks and no custom-property writes in 909-1028 frames** each (M-5 leg 1, W-A leg 1; HEAD 0 as well).

**The smoke capture** (`out/caps/smoke`, 24 cells: both engines × both themes × black, white, paper × ladder, held, state; captured 18:28-19:15 at load 324-377; built from the first source state, before the field-well filter removal and the three claim edits, which change no painted colour the smoke reads except the field wells' blur). `baseline.mjs` over it, gated per engine; a cell the witness needs but the smoke did not take counts as a FAIL row, so these are not comparable counts to H2 §3.1 and are the floor's partial reading only:

| witness | Cr light | Cr dark | WK light | WK dark | H2 HEAD baseline (Cr light / dark) |
|---|---|---|---|---|---|
| RAW | FAIL 2/22 (missing cells) | FAIL 2/22 | FAIL 2/22 | FAIL 2/22 | PASS 22 / 22 |
| M-1 | FAIL 1/11 | — | FAIL 1/11 | — | FAIL 11/11 |
| M-2 | FAIL 24/149 | FAIL 19/138 | FAIL 15/138 | FAIL 14/149 | FAIL 150/397, 127/397 |
| M-3 | FAIL 16/70 | FAIL 41/67 | FAIL 15/67 | FAIL 42/70 | FAIL 177/177, 144/177 |
| M-4 | FAIL 11/41 | FAIL 11/41 | FAIL 11/41 | FAIL 11/41 | FAIL 7/77, 7/77 |
| M-6 | FAIL 5/5 (light, Q-1 a) | FAIL 4/25 | FAIL 5/5 | FAIL 4/25 | PASS 4, FAIL 14/26 |
| M-7 | FAIL 1/1 (missing cell) | FAIL 1/1 | FAIL 1/1 | FAIL 1/1 | FAIL 4/4 |
| M-9 | FAIL 1/6 (aurora cell missing) | FAIL 1/5 | FAIL 1/6 | FAIL 1/5 | PASS 10, FAIL 2/8 |
| W-A | FAIL 8/60 | FAIL 8/60 | FAIL 8/60 | FAIL 8/60 | FAIL 31/96, 22/96 |
| T | reported | reported | reported | reported | reported |

M-2m, M-5, M-8, W-G and the owner glance were not read on HEAD+floor. M-4's 11 rows and M-3's dark rows need the full run's per-row logs before any reading: M-3 dark is the expected dark-perimeter gap (FL-10, about 0.54 unmeasured), and M-4 has not been separated into missing-cell rows and real ones.

## 5 · Reproduce, and what the next seat owes

```sh
git worktree add --detach <scratch>/wt 020f6586 && ln -s <checkout>/node_modules <scratch>/wt/node_modules
git -C <scratch>/wt apply docs/tranches/BL/design/material/pass-2/floor.patch
export D3_OUT=<scratch>/out; H=docs/tranches/BL/design/material/harness
node $H/run.mjs <scratch>/wt --label floor --demo     # at low load; re-run any timed-out cell
node $H/baseline.mjs $D3_OUT/caps/floor --out <f.json>
```

1. Run the full H2 battery on HEAD+floor at low load and append §4's full table here (this file is the floor's record).
2. Re-run any cell that times out twice before believing it.
3. At landing: rebind `G-BUNDLE-RATCHET` from a committed-tree build; land the FL-13 addenda in each consumer's tranche.
