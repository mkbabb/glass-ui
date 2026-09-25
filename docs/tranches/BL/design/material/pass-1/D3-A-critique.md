# D3 · pass 1 · D3-A · the ground pole (critique)

| field | value |
|---|---|
| seat | D3 pass 1, adversarial CRITIC for family D3-A. This seat did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree cut at `81f83f89`; `D3-A-proto.patch` applied cleanly (59 files). The worktree was removed with `git worktree remove --force` before this report was written |
| instruments | the shared battery (`harness/run.mjs`, unmodified), Chromium 149 (gate) and **Playwright WebKit 26.5, which is not Safari** (paint-only, informational). Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**. Plants re-capture only their own cells into a copy of the base capture (`capture.mjs --inject`), so every witness reads a complete capture |
| scratch | `C = …/scratchpad/D3/p1/D3-A-crit/`. Base battery `C/out/caps/crit/results/*.log` (68 cells + 8 live windows, 623 s at load 31-57). Plants `C/plants/*.css`, captures `C/out/caps/{p1..p8,held,m5}`, the M-5 plant build `C/out/builds/m5plant` |
| fence note | one `vitest run` (the `glass-subtlety` file) rewrote the gitignored cache `node_modules/.vite/vitest/da39…/results.json` through the `node_modules` symlink. The prototype seat reports writing the same path. No tracked file was touched, and no other vitest run followed |

## 1 · Before reading the spec: the failures a material design would hide

Written from PORTFOLIO §0-§2, §7 and HARNESS.md only.

1. **Legibility bought by removing the glass.** Any bound that holds over black and white forces α near 0.87 on a `--card` pole (§2.1). A design can turn M-2 green by painting an opaque card and calling it glass.
2. **A declared band that is drawn around the passing grounds.** If a family declares its own content field, it can draw the field where it passes. The library's own default field may sit outside it.
3. **The pole on the M-1 floor's edge.** `--card` sits 0.001 L under the floor (HARNESS new reading 2). The cure could move the floor or the card and call that a design.
4. **One perimeter rung for two themes.** An indicator rung derived in one theme and shipped in both.
5. **Readers of the old veil that the spec never lists.** `--glass-plate-*` was an ink darken. Anything that used it as a state fill or dim flips under a light pole.
6. **States that change α after the bound is set.** Press, grasp and hover registers that shed or add veil break a guarantee stated at rest.
7. **A bound stated as a number with no live source.** If the solver lives in scratch, the tokens, the tests and the prose all cite a copied literal. The ink can move and the gate stays green.
8. **Witness legs that read a name, not a behaviour.** "No writer of `--glass-backdrop-luma`" can be satisfied by renaming the signal.
9. **Engine margin carried by one band only.** Playwright WebKit rasterises glyphs differently (S-11), so a bound solved in Chromium with no margin reds there.
10. **The light ladder collapsing to one colour** (M-1 against M-6, S-7), with the identity of the levels left to rim and shadow and never witnessed.
11. **Dark glass that separates from the page only by turning into a brown card**, losing the field.

Each of these is tested below.

## 2 · The re-run (Chromium gate)

`D3_OUT=C/out node harness/run.mjs <wt> --label crit`. The verdicts reproduce the prototype's report exactly, except W-F, which is not D3-A's witness.

| witness | prototype (D3-A-proto §2) | **this re-run** | agrees |
|---|---|---|---|
| M-1 | PASS 11 | **PASS 11**. Plates L 0.979-0.984, ΔE 0.005-0.010; the real Dialog `#fef7f1` L 0.980 | yes |
| M-2 | FAIL 34/560 | **FAIL 34/560** (every fail is a content rung over an undeclared ground) | yes |
| M-3 | FAIL 111/266 | **FAIL 111/266**. Dark perimeter 2.82-2.90 on paper, black, c0.5 and every Dialog cell (`M-3.log`: "dark paper: perimeter 2.83–2.90 … 8/16 under 3.0") | yes |
| M-4 | FAIL 14/14 (instrument) | FAIL 14/14 | yes |
| M-5 | PASS 16 | **PASS 16**: 0 `getImageData`, 0 `readPixels` in all 8 windows; dock fg/muted 5.42/5.45 light c1, 5.81 c0.5, 6.07/5.92 dark c1, 6.83/6.77 c0.5 | yes |
| M-6 | FAIL 4/19 | FAIL 4/19 (light only, S-7) | yes |
| M-7 | PASS 8 | **PASS 8** | yes |
| M-8 | PASS 8 | **PASS 8** | yes |
| W-A | FAIL 19/197 | FAIL 19/197 | yes |
| W-B … W-F | 16/24, 223/304, 6/9, 119/360, 75/152 | 16/24, 223/304, 6/9, 119/360, **66/152** | W-F differs (another family's witness; not pursued) |

The M-5 "fed" window is now the same as the default window, because `backgroundCanvas` no longer exists. The live dock's legibility is still read in the frozen reduced-motion cell (HARNESS §6), not on the moving field.

## 3 · Plants: every claimed-green witness goes RED on a planted violation

Each plant is a CSS injection on the prototype's own build, except M-5 (a source plant on its own build) and W-A leg 1 (source files, read without a rebuild).

| witness claimed green | plant | result (command output) |
|---|---|---|
| M-1 | `p1`: light `.glass-floating` back on HEAD's ink veil (`oklch(0.28 0.035 70)` at 18%) | **FAIL 3/11**: `floating #d7d4ce L 0.871 C 0.0088 ΔE 0.115 ✗` |
| M-2 · W-A leg 2 | `p2`: light `--glass-veil-chrome: 0.78` (0.09 under the bound) | M-2 FAIL; W-A **FAIL 26/197**: `chrome chromium light black: 11/16 · worst floating·muted 3.68 ✗`. Playwright WebKit (info) 3.56 |
| W-A leg 3 | `p3`: light `--glass-veil-content: 0.36` | W-A **FAIL 21/197**: `content chromium light aurora50: 14/16 · worst wash·muted 4.13 ✗`. Paper stays green (16/16) |
| M-3 (light chrome) | `p4`: light `--ink-perimeter: 0.44` | **FAIL 127/266**: `light paper: perimeter 2.46–2.51 · ring 2.60–2.65 · 16/16 under 3.0` |
| M-5 | `m5plant`: an rAF `getImageData` loop in `GlassDock.vue` (confirmed in the bundle, then reverted) | **FAIL 2/16**: `getImageData 1082 … slowest 1.2 ms ✗` in both light-aurora windows |
| M-6 (dark) | `p7`: dark `--glass-veil-step: 0.02` | **FAIL 7/19**: adjacent ΔE 0.004 / 0.004 / 0.044 / 0.003 |
| M-7 | `p5`: `contain: paint` back on the content rungs | **FAIL 8/8**: reference 18 / 17 px, every host 2 px |
| M-8 | `p6`: `.glass-floating { --glass-veil-tier: 0.30 }` | **FAIL 4/8**: light floating C 0.0730, dark 0.0810 |
| W-A leg 1 | (A) `el.style.setProperty("--glass-backdrop-luma", …)` in `src/__plantA.ts` | **caught**: `writers of --glass-backdrop-luma: src/__plantA.ts:1 ✗` (FAIL 20/197) |
| W-A leg 1 | (B) the same writer with the name built at runtime (`"--glass-backdrop-" + "luma"`); (C) a renamed signal `--glass-field-luma` | **missed in both**: `no writer of --glass-backdrop-luma in src` (19/197, identical to base) |

**Reading.** M-1, M-2, M-3, M-5, M-6, M-7, M-8 and W-A legs 2-3 can fail, and they fail on the violation they name. W-A leg 1 reads a name, not a behaviour. With the token deleted, nothing reads a luma, so a renamed or indirected signal satisfies it (counterexamples B and C). Leg 1 cannot fail on the thing it claims to witness, "no signal".

## 4 · Probes beyond the battery

### 4.1 The held dock sheds under the chrome bound (measured)

`grasp.css:133` sets `--glass-veil-rung: calc(var(--glass-veil-rest) * 0.6)` on a held host, and the dock plate is a grasp host (`dock.css:117-121`, `data-held` from `useDockState.graspHeld`). Held, the dock paints α 0.534 in light and 0.516 in dark. Probe `held` injects exactly that rung onto `.dock-plate`:

| cell | dock fg | dock muted | at rest (base) |
|---|---|---|---|
| light black | **1.77** | **1.77** | ≥ 4.65 |
| light aurora c1 | **3.49** | **3.56** | 5.42 / 5.45 |
| dark white | **1.61** | **1.61** | ≥ 4.60 |
| dark aurora c1 | **3.67** | **3.46** | 6.07 / 5.92 |

The probe paints the held α with the rest filter. The real grasp also swaps the plate's filter for carriers, which does not change the veil paint. The spec's "the dock is chrome and needs no signal" holds only at rest. The spec and the prototype both name this state (§5 item 3) and leave it unmeasured. It is now measured, and it is red.

### 4.2 The bound has no live source of record (a gate that cannot fail on its own invariant)

The bound (0.516 / 0.496 content, 0.871 / 0.854 chrome) is written in three places: the `tokens/glass.css` header, the `glass-subtlety.test.ts:119-122` literals, and SPECS §A.1. It is solved by `bound.mjs`, which lives only in `…/D3-A-research/` scratch. The round-0 probes were lost to exactly this kind of scratch wipe (HARNESS provenance note). The bound is a function of the inks, and nothing recomputes it.

- Plant `p8` lightens the light muted ink to `hsl(30 22% 44%)` and leaves every α alone. The battery goes **FAIL 105/560** on M-2 and **FAIL 56/197** on W-A: chrome floating muted **3.41** over black, 3.72 over white, content muted 3.26 at c0.5, and the dock 3.41.
- The unit test that "seats each band's thinnest rung ON its solved bound" passes on the prototype (`vitest run tests/styles/glass-subtlety.test.ts`: 36/36). It reads only the token α against its own copied literals, so it stays green under p8.

The unit gate restates the spec's own numbers (spec-cites-itself). It is also a token-arithmetic gate, which common floor row 3 and P-3 rule out. The painted witnesses catch the drift, so the defect is in the source-of-record chain, not the battery.

### 4.3 The content declaration excludes the library's own default field

`Aurora.vue:93` defaults `opacityCeiling: 1`, and `Constellation.vue:50` does too. The declaration covers "library fields at ceiling ≤ 0.5". So `<Aurora/>` with its default props, plus a `<Card>` (resting, a content rung), is outside the guarantee: light wash muted 3.38 and dark 3.72 over c1 in this re-run (`M-2.log`, `W-A.log`). The demo shell passes only because it sets 0.5 itself.

Blob, constellation and the fourier field were never measured at c ≤ 0.5. Only the aurora's default preset was. Nothing enforces the declaration: no prop, no warning, no witness row. This is the elegant-reduction trap. The load-bearing step, "the consumer picks a chrome rung over any other ground", is the unsolved problem handed to consumers as prose.

### 4.4 The state fills that read the plate

Read-only grep of the patched tree finds 18 `var(--glass-plate-*)` reads outside `tokens/glass.css`. The prototype cured three (the dock fills) outside the spec. Among the uncured ones, each now a `--card` fill on a `--card` plate:
- the menu row hover (`menu.css:10`);
- the capsule track's "recessed well" (`glass-capsule.css:80`);
- the focus-veil dim (`glass.css`, `dark-arm.css:286`), which is a cream bloom in `proto2-chromium-light-1440-dialog.png`;
- the sheet scrim ramp (`sheet/styles.css:361-364`);
- the checked-control ground (`scale-paper.css:106`);
- the configurator capsule fill, avatar, metric, feedback tone and `segmented.css:228`.

Over a chrome plate, a quiet-rung fill moves the composite by about 0.6 × 0.11 × ΔE(card, ground). That is under 0.002 ΔE over white, which is analytic and unmeasured, and invisible. Hover and selection lose their register, which is D-2 (breath of life) regressing, not a paint nit. The Dialog's "Save" pill reads cream on cream in the same capture.

### 4.5 A consumer-less dual path

`backdropMode: "glass" | "opaque"` keeps a second route to the opaque card (`adaptive-legibility.css:24,33`) beside the level-0 escape (`--glass-level: 0`, common floor row 4).
- At chrome α 0.89 the two arms differ by 0.11 α and a blur.
- No consumer sets the prop (read-only grep of value.js, keyframes, fourier and chicago: only a comment at `ChromeDock.vue:204`).
- The only users are two demo stories.

That is E-1's dual path on a consumer-less substrate.

### 4.6 Stale prose that names deleted mechanisms

`grasp.css:120-127` still explains the 0.6 factor through "the host's CLAMPED rest ink … the clamp has already earned ink", and cites a clamp in `veil.css` that is gone. `surface-axis.css:42`, `surfaces.css:58` and `glass-fx.css:2` still describe the earned darken and the luma bucket. Readers are told a mechanism exists that does not.

## 5 · The gestalt (Chromium; the prototype's captures read here, plus the numbers above)

I read `proto2-*` against `head2-*` in `…/D3-A-proto/gestalt/`: glass-material light and dark, the dock page light and dark, and the Dialog light.

- **Does light glass read as a light frost and not grey? Yes.** The plates are cream (M-1 L 0.979-0.984) and the Dialog is a legible warm card. This is the O-62 ask met, and the clearest improvement over HEAD's smoke-brown slab.
- **But it reads as paper, not glass.**
  - Chrome transmits 4-11%, the rungs are one colour (S-7), and the field's hue is gone under every plate.
  - The light dock is a cream card pill.
  - The "bound" demo card shows the wash caption dipping on purpose.
  - It is legible because it stopped being glass (expected failure 1).
- **Does dark glass separate from the page? Yes, as a brown card.** Dark plates sit 0.078-0.146 from the page (M-6 green). But the dark docks over the red field are opaque brown pills, where HEAD's carried the field's glow (`head2-chromium-dark-1440-dock.png` against `proto2-…`). That is expected failure 11, as D3-A §6 item 4 predicted.
- **Does the ink read as material rather than a sticker?** Static `--foreground` and `--on-glass-muted` on a near-opaque card read as ink on paper. They are not stickers, but they are not ink in glass either.
- **iOS-27 grade? No.** Nothing in the material responds to the field, to engagement, or to state. The state fills of §4.4 are flat or gone, and the held dock of §4.1 is illegible. D-2 and D-3 are unmet. What the family does deliver is 7.0.0's register, the "calm room" the consumers asked for (UIA-KF-252, UIA-F-122), at a ratified bound.

## 6 · Checklist

| item | finding | evidence |
|---|---|---|
| vacuous convergence | Not vacuous on the battery: the re-run reproduces 34 / 111 / 4 / 19 exactly, and every green witness goes red on its plant (§3). Vacuous in one place: M-5's "fed" leg, because the feed prop is deleted | §2, §3 |
| spec cites itself | **Yes.** The bound lives as a copied literal in the tokens, the unit test and SPECS, and its solver is in scratch. An ink retune turns 105 M-2 rows red while the unit gate stays green | §4.2 |
| gates that cannot fail | **W-A leg 1** (a name regex; plants B and C evade it). **Restated W-A leg 4**, "α ≥ bound", is implied by legs 2-3, so only "the thinnest rung = bound" is new information. The `glass-subtlety` bound test cannot fail on an ink change | §3, §4.2 |
| elegant-reduction trap | **Yes, twice.** (1) The content band: "the consumer takes a chrome rung" is the hard problem handed off as prose, and the library's default `<Aurora>` violates it (§4.3). (2) Chrome legibility comes from making chrome a card | §4.3, §5 |
| legacy aliases, shims, dual paths | No alias on the deleted tokens (grep clean). One dual path: `backdropMode: "opaque"` beside the level-0 escape, with no consumer | §4.5 |
| masked fallbacks | None in paint: nothing samples, so nothing can fail to arrive (M-5 green, and the plant catches a readback). Stale prose describes a clamp fallback that no longer exists | §4.6 |
| unverified gestalt | The prototype's gestalt is honest and matches what I see: frost yes, glass no; dark brown. Playwright WebKit gestalt: UNMEASURED (it crashes on `GlassDock`). Real Safari: UNMEASURED (owner's safaridriver checkbox) | §5 |
| consumer-less substrate | `backdropMode` "opaque"; the content declaration has no consumer that satisfies it except the demo shell (value.js panes must move to chrome by addendum) | §4.3, §4.5 |

## 7 · Counterexamples (concrete)

1. `<Aurora />` (default `opacityCeiling: 1`) under `<Card>`: light wash muted **3.38**, dark **3.72**. The library's own defaults break the content guarantee.
2. Grasp the dock over a black region: dock ink **1.77** (light). In dark over white: **1.61**.
3. Dark theme, any ground: field-well perimeter **2.82-2.90** at the shipped `--ink-perimeter` 0.52.
4. Lighten `--on-glass-muted` to `hsl(30 22% 44%)`: chrome muted **3.41** over black, while every unit gate stays green.
5. A luma writer whose name is built at runtime, or renamed: W-A leg 1 stays green.
6. A menu row hover or a capsule track on any chrome plate: the fill is `--card` on `--card`, analytic ΔE under 0.002, so no hover register.
7. Playwright WebKit, light c0.5 wash muted: **4.35**. The content band carries no engine margin (the prototype's M-2 verbose; not re-measured here beyond the base run's info rows).

## 8 · Convergence and verdict

**Convergence: 60%.** Problems 1-3 are answered in paint in Chromium, with a signal-free chrome guarantee that holds at rest in both engines and a witness set that demonstrably fails. What is open:

1. The dark `--ink-perimeter` arm (about 0.54, unmeasured); M-3 is red in dark on every ground.
2. The held dock under the grasp register: 1.77 / 1.61 / 3.49. The spec needs "a chrome host never sheds under the chrome bound" (for example, `max(rung, chrome)` on chrome hosts), measured.
3. The plate-as-fill readers (15 uncured): they need a ruling in the spec (route them to the one-ink fill register or to the scrim), and the dock-fill cure must be written into the spec.
4. The bound's source of record: commit the solver, or derive α from the ink in CSS (S-4's exact WCAG solve), and replace the literal-copy unit gate.
5. The content declaration against the library's defaults (`Aurora` and `Constellation` default to ceiling 1), plus the unmeasured blob, constellation and fourier-field grounds at c ≤ 0.5. Either change what the declaration covers or make it enforceable.
6. W-A leg 1: restate it as a behavioural probe (no main-thread readback and no per-frame custom-property write from any source), not a name regex. W-A leg 4: restate it, and drop the "α ≥ bound" half as redundant.
7. Engine margin on the content band (Playwright WebKit 4.35).
8. M-4 specimen re-point (S-9), owed by the harness.
9. M-6 light (S-7): an owner ruling.
10. `backdropMode` "opaque": delete it (the level-0 escape covers it) or name a consumer.
11. Stale prose (`grasp.css:120-127`, `surface-axis.css:42`, `surfaces.css:58`, `glass-fx.css:2`).
12. The gestalt: chrome reads as paper and dark docks as brown pills, with no engagement register. This is structural to the family's center (α ≥ 0.87 over any input), so D3-A alone cannot close it.
13. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox). Playwright WebKit demo gestalt UNMEASURED (it crashes on `GlassDock`).
14. Owed at commit: the `G-BUNDLE-RATCHET` rebind (−18,768 B); the consumer E-6 addenda.

Closed by this pass (measured): the synthesis choices dark step 0.08 (M-6 dark green, and the plant proves the witness), light dialog α 1 (M-1 green on the real Dialog), and the dock filter unification (M-8 green; dock bleed info 1.04 / 1.10).

**Verdict: ADVANCE**, as the floor family and not yet as the winner.
- **For:** it is the one family whose chrome guarantee holds in paint with no signal, in both engines. It deletes 746 lines of dead sampler. It cures O-62, O-61 and S-8 in paint. And every one of its greens survives a planted violation.
- **Not BLOCK:** gaps 1-11 are closable inside the family.
- **Not RETIRE:** nothing is refuted.
- **Not BANK:** no other family has yet shown chrome AA at a thinner α in paint, so dominance is unproven.
- **What pass 2 must show before D3-A can win:** gaps 1-5 closed in paint, and an answer to gap 12, either an owner ruling that chrome is a card or a pairing with a family that returns transmission to chrome.
