# D3 · pass 2 · A′ prototype: the bound, nothing added

| field | value |
|---|---|
| seat | D3 pass 2, A′ prototype. Implements `D3-Ap-spec.md` on the real source on top of `floor.patch`, runs the whole H2 battery under the route, and answers REGISTRY §7.3 A′ items 1-7 and "Every route" |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree cut at `020f6586` (the tasked rev; `git diff --stat 020f6586 3ce80b06 -- src` is empty), `floor.patch` applied (70 files), the floor staged as the worktree's index, then the route edited on top |
| patch | `D3-Ap-proto.patch` (this directory): `git diff` against HEAD+floor, 22 files, +142 / −123, one file deleted. `git apply --cached --check` is clean against `020f6586`+floor and against `2794898e`+floor (the checkout's HEAD when checked) |
| engines | Chromium 149 (the gate) and **Playwright WebKit 26.5** (paint-only: no `backdrop-filter`, no `navigator.gpu`; dock rows `webkit+shim`, H-14). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | other sessions held the machine at 31-183 for the whole seat; each run's load is beside it (§7). No cell timed out, no motion window fell under its frame minimum, and no defect appeared that needed the twice-repeat rule |
| fences | no source edit and no git write in the checkout. Writes in the checkout: this file, `D3-Ap-proto.patch`, `glance-D3-Ap/` (18 files, 1.1 MB: crops as PNG, the story pairs as JPEG at 1600 px), and extensions to `D3-Ap-plants.mjs` and `D3-Ap-probe.mjs` (§3, §2 item 4). Builds, captures and both worktrees lived in scratch; both worktrees are removed |

## 0 · In brief

- **Under A′ the Chromium gate is green on every M witness but M-6**, in both themes: RAW, M-1, M-2 (794 rows), M-2m (296), M-3 (354), M-4, M-5, M-7, M-8, M-9 and W-A (192). M-6 is red by construction (Q-1, extended to dark; §4). Playwright WebKit agrees except two light checker ring rows (2.83) and one dark M-8 bleed (no blur), both informational.
- **What A′ adds to the floor**, on the real source:
  1. **a held plate paints its veil on its grasp carriers** (item 2). The cure is scoped to plates through `@utility glass-plate`, which the spec's form was not: a generic `:has(> carrier) { background: none }` would have stripped the slider's liquid fill (a non-plate carrier host) while held. Held dock muted tab: **4.46 → 4.83** (Chromium, light, black);
  2. **the dark stroke arm** `.dark { --ink-perimeter: 0.60; --ink-edge: 0.1846; --ink-seam: 0.0923 }` (item 3). Dark M-3 perimeter: **2.78-2.84 → 3.29-3.42** (Chromium);
  3. **`backdropMode` deleted** (item 4), with `class="glass-opaque"` as the one solid plate;
  4. the prose sweep the floor left, and two test arms (one new, one rewritten).
- **Every green A′ claims turns red on a plant that removes its mechanism**, measured on the A′ build (§3).
- **Transmission is the floor's and does not move** (H-12): light T 0.035-0.110, dark 0.043-0.125, T_c1 up to 0.144. The owner glance reads cream cards (light) and warm brown cards (dark), legible everywhere, with no field colour through the plates (§2 item 1).
- **Toolchain:** `vue-tsc` clean on both projects; full unit suite 2318 passed once `dist-demo` exists (§5); library build clean; bundle 2,900,235 B (floor 2,900,958; datum 2,919,057).

## 1 · The route, file by file

Line numbers are in the patched worktree (HEAD+floor+route).

| change | files | why |
|---|---|---|
| **Held veil on the carriers.** `@utility glass-plate` gains two nested rules: `&:has(> .glass-grasp-carrier[data-grasp="grasp"]) { background: none }` and `& > .glass-grasp-carrier { background: var(--glass-veil); z-index: -1 }`. The carriers inherit the host's own `--glass-veil` (unregistered, so its `var()`s resolve at the host), so the held α is still FL-7's rung | `styles/glass/veil.css` | item 2 |
| the veil's prose ("A HELD PLATE PAINTS ITS VEIL ON ITS CARRIERS") and the stacking precondition; `grasp.css`'s HOST paragraph (the "ONE always-opaque veil" sentence is no longer true), its carriers paragraph ("carrying NOTHING but a `backdrop-filter`") and its "would blur the card's own plate" clause rewritten | `styles/glass/veil.css`, `styles/glass/grasp.css` | FL-12 |
| **Dark stroke arm**: `--ink-seam: 0.0923; --ink-edge: 0.1846; --ink-perimeter: 0.60` in `.dark`, beside the veil's dark arm, with the measured reason | `styles/tokens/dark-arm.css:279-290` | item 3 |
| `color-radius.css`'s "DARK ARM OWED, NOT INVENTED" paragraph becomes "THE DARK ARM IS MEASURED, NOT INHERITED"; "always 0.52" becomes "always the perimeter rung" | `styles/tokens/color-radius.css` | FL-12 |
| **`backdropMode` deleted**: the prop and its default, `data-backdrop-mode`, the `DockBackdropMode` type and its export, the opaque arm and its header prose, the README row; the two demo docks and the dock overview story move to `class="glass-opaque"` | `GlassDock.vue`, `useDockShellProps.ts`, `dock/index.ts`, `adaptive-legibility.css`, `dock/README.md`, `demo/stories/feedback/progress.vue`, `demo/stories/dock/overview.vue` | item 4, E-1 |
| prose: the perimeter rung is named rather than restated as 0.48 where the sentence states the current value; history sentences keep their number marked as then-current | `_shared/field/control.css`, `utilities/base.css`, `tokens/scale-paper.css`, `card/styles.css`, `glass/overlay-plate.css`, `glass/control-bit.css`, `dialog/styles.css` | spec §7 risk 5 |
| tests: `GlassDock.backdrop-mode.test.ts` deleted; `GlassDock.posture.test.ts` reads a four-prop surface and asserts `data-backdrop-mode` is absent; `proportion-register.test.ts` runs the 1 : 2 : 6.5 ratio on both arms (to 1e-3, the dark arm is rounded to four places), dedupes the "no seventh token" family, and replaces "invents NO dark-arm α — OWED" with "the dark arm declares the three stroke rungs, and no fill rung"; `glass-subtlety.test.ts` gains "paints a HELD plate's veil on its carriers" and "seats every PLATE host as a stacking context" | `tests/…` | items 2-4 |

**Not in the patch.** `MIGRATION.md`: the three A′ rows are written in `D3-Ap-spec.md` §6 and land with the cut (one source of record). The `.glass-opaque` prose at `glass/ladder-undershadow.css:15-18` still mentions "the earned-darken clamp" FL-1 deleted; the file is not touched by the floor or this route, so it is listed as residue (§6).

## 2 · The seven items

### Item 1 · Content at the bound on every rung; T; glass and engagement

**Met by the floor; A′ adds nothing.** W-A PASS 96 per engine × theme. Leg 4, Chromium: light content and chrome thinnest painted α 0.890 against the computed `--glass-bound` 0.891 (−0.001); dark 0.875 against 0.873 (+0.001). Rungs light: wash 0.890, quiet 0.925, resting and card 0.965, floating, dock and popover 0.890, overlay 0.925, dialog rung and Dialog 1.000.

**T per rung** (`T.log`, the A′ run):

| rung | Cr light T / T_c1 | Cr dark T / T_c1 | WK light T | WK dark T |
|---|---|---|---|---|
| wash, floating | 0.110 / 0.121-0.122 | 0.125 / 0.142-0.144 | 0.110 | 0.125 |
| dock, popover | 0.110 / 0.131-0.139 | 0.125 / 0.126-0.130 | 0.110 | 0.125 |
| quiet, overlay | 0.075 / 0.082-0.087 | 0.086 / 0.091-0.097 | 0.075 | 0.086 |
| resting, card | 0.035 / 0.039-0.044 | 0.043 / 0.045-0.047 | 0.035 | 0.043 |
| dialog rung, real Dialog, opaque | 0.000 | 0.000 | 0.000 | 0.000 |

HEAD transmitted 0.78-0.94 (H2 §3.3). The rows equal the spec's HEAD+floor rows to the third place: A′'s three changes do not touch a resting plate's α.

**Owner glance (H-13)**: `glance.mjs --base head --route ap`, both engines, `--require-delta` **PASS 8/8 pairs in Chromium and 8/8 in Playwright WebKit**. Files: `glance-D3-Ap/`. Chromium over paper, dark:

| surface | HEAD | A′ |
|---|---|---|
| dock | `#0f0d0a` L 0.160, muted ink `#ffffff` 19.62 | `#30261f` L 0.278, muted `#c3b9ac` 7.66 |
| floating | `#0e0b06` L 0.151, muted 10.15 | `#2f261f` L 0.277, muted 7.66 |
| Dialog | `#151009` L 0.177, muted 9.78 | `#352a22` L 0.295, muted 7.21 |

Story deltas: Chromium 31.97% light, 31.92% dark; Playwright WebKit 26.60% both.

**The gestalt, read from the story pairs** (`glance-chromium-{light,dark}-story-base-vs-ap.jpg`). Light: the plates are cream cards on the aurora, O-62's grey is gone, the dock is a near-white pill, and wash, quiet and resting cannot be told apart. Dark: warm brown cards lifted off the page; the aurora shows around them, not through them. Legible everywhere, calm, and not glass. A′ cannot close this without leaving its centre (REGISTRY Q-3).

**What, besides paint, reads as glass and as engaged.** At T ≤ 0.125, almost nothing in the paint. What is left, all already in the library: the blur (Chromium T_c1 runs 0.01-0.03 above T, where saturate lifts the field at the plate), the single rim edge and the elevation shadow, and motion (the dock's spring morph, the grasp register's 1.625× dilation). O-87 forbids adding lighting, and A′ adds none.

**Engagement, M-9:** PASS in both engines and themes. Chromium over paper: active ΔE 0.078 light / 0.096 dark, hover 0.035 / 0.042, checked 0.488 / 0.335, selected 0.193 / 0.227; the light focus veil dims ΔL −0.070 (paper) and −0.029 (c1). The dark veil over paper reads ΔL +0.006 (information): it does not visibly dim there.

**Status: MET** (structural gestalt gap to the owner, §4).

### Item 2 · The held dock and every grasp host at or above the bound (FL-7, H-5)

**Implemented**, scoped to plates (§1). The spec's form, `:has(> .glass-grasp-carrier[data-grasp="grasp"]) { background: none }` in `grasp.css`, would also have reached `.slider-range`: a liquid fill, not a plate, whose background is its tint. Held, it would have lost the fill and its carriers would have painted whatever `--glass-veil` it inherited from an enclosing plate. In `@utility glass-plate` the rules reach only plates, and `& > .glass-grasp-carrier` reads the plate's own veil from its direct parent.

**H-5 rows under A′** (the full run; every one green):

| cell | Chromium worst | Playwright WebKit worst |
|---|---|---|
| light black held | dock-held muted-tab **4.83**, wash-held muted 4.83 | wash-held muted 4.62, dock-held muted 4.71 |
| light white held | 5.27 (well muted) | 5.11 |
| light c1 held | 5.19 (well muted) | 5.02 |
| dark white held | dock-held muted-tab **4.91**, fg 5.19 | dock-held muted-tab 4.84 |
| dark black / c1 held | 7.53 / 6.29 | 7.53 / 6.24 |
| M-3 held (perimeter) | light 3.08-3.10, dark 3.31-3.42 | in the M-3 PASS rows |

**Painted α while held** (`D3-Ap-plants.mjs --held`): the rung hosts paint the bound (Chromium light 0.894 against 0.891, dark 0.878 against 0.873; Playwright WebKit 0.890 / 0.875). The held dock sample reads **0.866 / 0.852 in Chromium** (bound 0.891 / 0.873) and 0.893 / 0.878 in Playwright WebKit. The 0.025 residual the spec left open:
- it is there on the floor too (`plant-carrierveil`, the floor's paint: 0.874 / 0.858), so the cure did not cause it;
- it is **not** a shadow or filter in the dock cell (`diag-held-noshadow` 0.865), not the slider's carriers (`diag-held-nosliderblur` 0.866), not the dock carriers' filter or its `brightness(0.96)` (`diag-held-nodockblur`, `diag-held-nobright`: 0.862), and not any `backdrop-filter` in the cell (`diag-held-noanyblur` 0.862);
- the same dock at rest in the escape probe paints `#e2dcd7` over black, the bound composite, so it is specific to the held scene in Chromium.

It stays **UNEXPLAINED**, and bounded: every ink on that dock clears 4.5 at R 1 and R 3 in both engines. The next suspect is geometry (the press moving the dock under a sample rect read before it), which a per-frame rect read would settle.

**The stacking precondition.** The carriers sit at `z-index: -1`, so a plate host must be a stacking context. Measured (`risk-opaque-ancestor`, an ink-coloured opaque `.hx-page` under the specimen rungs, which are not stacking contexts): wash-held fg **1.20** light and **1.24** dark, both engines. The held text sits on the ancestor with no veil. The same cell with the hosts at `z-index: 0` (`risk-opaque-ancestor-z0`) has 0 of 48 rows under 4.5. The library's one plate host, `.dock-plate`, is `z-index: -1` inside the dock's own stack (`shell.css:86`); in the same risk cell the held dock reads muted-tab 4.83 / 4.91 (Chromium). The new arm "seats every PLATE host as a stacking context" in `glass-subtlety.test.ts` reds a library plate host that mounts the carriers with no z-index, so the precondition is checked where hosts are discovered (from the templates). The specimen rungs are not library hosts: `grasp.css` already says a ladder rung is not graspable as it stands.

**Release.** While both carriers are visible mid-release, the two veils compose to 1 − (1 − α)(1 − α·o_grasp): thicker than α, never thinner. This is stated in `grasp.css` and **not measured** (H-5 reads the hold, not the release).

**Status: MET** on every H-5 cell; residual α and release unmeasured or unexplained as stated.

### Item 3 · The dark perimeter arm (Q-6 a)

**Implemented** at the spec's 0.60, PROPORTION 1 : 2 : 6.5 in both arms (the test asserts it on both files).

| | Chromium | Playwright WebKit |
|---|---|---|
| M-3 dark, A′ (177 rows) | **PASS 177**: perimeter min 3.29, ring min 3.57 | **PASS 177**: perimeter min 3.29, ring min 3.36 |
| M-3 light, A′ | PASS 177: perimeter min 3.08, ring 3.12 | FAIL 2/177: checker ring 2.83 (floating well), informational |
| plant `plant-darkperim` (light scalars inherited) | perimeter 2.78-2.84; 8/16 ladder rows and 1/3 Dialog rows under 3.0 in every dark cell | 2.81-2.87; the same counts |

The scaled seam and edge move every dark divider; no witness reads dividers (spec risk 3), so their paint change is visible only in the glance (dark crops, `glance-D3-Ap/`).

**Status: MET** in Chromium on every ground the band claims; the two light WebKit ring rows are the floor's, unchanged.

### Item 4 · `backdropMode` deleted

**Deleted (E-1)**, with no consumer: the spec's census found only a comment in keyframes. Residue grep over the worktree (outside `docs/`, `MIGRATION.md`, `CHANGELOG.md`): only the new test's assertion that the attribute is absent.

**Probe on the route tree** (`D3-Ap-probe.mjs <wt>`, extended with the plant; both engines, both themes, black, white, c1):
- `class` (`class="glass-opaque"`) paints the escape: light `#fef7f1` L 0.980, dark `#352a22` L 0.295, in all 12 cells per engine;
- `mode` (`backdrop-mode="opaque"`) now falls through as a dead attribute and paints the default dock exactly (ΔE 0.0000 against `default` over black and white; 0.0008-0.0027 over the moving c1);
- **plant `class-l1`** (the escape class with `--glass-level: 1`) paints the bound plate, not the escape: ΔE from `class` 0.0030 (light white) to 0.1025 (dark white), 0.0221-0.1025 across the dark cells. The escape's paint is the level-0 seam, and removing it reds the row.

**Status: MET.**

### Item 5 · Engine margin: Playwright WebKit ≥ 4.5 wherever Chromium claims green

M-2 Playwright WebKit **PASS 397/397 per theme**. Lowest: light wash muted 4.57 (c1 ladder), held wash muted 4.62, dock-held muted 4.71; dark 4.84. M-2m Playwright WebKit PASS 148 per theme. **Plant `plant-margin`** (target 4.5) on the A′ build: Playwright WebKit light black 5/37 rows under 4.5 (wash muted 4.33) while Chromium stays green. Real Safari's glyph gap: UNMEASURED (owner's safaridriver checkbox).

**Status: MET** in Playwright WebKit.

### Item 6 · Q-4's dark pole: UIA-V-198's red, M-6 signed

**Signed M-6 green**: every dark plate sits above the page, ΔL +0.131 to +0.149 (wash `#2f261f` +0.131 … Dialog `#352a22` +0.149), in both engines. M-6's dark red rows are adjacency only (§4).

**Over `#761617`** (W-G rows, Chromium, dark): wash `#422720` Δh 9.3°, C 0.043 / 0.106 (0.40 of gamut), muted 7.04; quiet `#3e2720` 11.7°, 0.38; resting and card `#3a2922` 17.5°, 0.32, muted 7.14. Legible with a wide margin; a dark brown-red card, hue within 10° only on the bound rungs, chroma at a third of the gamut. A′ makes no hue claim; W-G is G's witness (FAIL 12/20 light, 16/20 dark in Chromium) and is read here only as Q-4's reading.

**Status: MET** (the reading; the trade-off is the owner's under Q-4).

### Item 7 · value.js (THE STOP) and chicago

Unchanged from `D3-Ap-spec.md` §2 item 7 (read-only reads; nothing built or run in either repo by this seat). A′'s prototype changes nothing either consumer reads:
- value.js: THE STOP is cleared on any material (`certify()` bisects; `ink.ts:84-91`). Its addendum is to replace `PRODUCER_VEIL` with the card pole at the bound and repin `CARD_L`. Nothing in value.js binds `backdropMode` or `--ink-perimeter`.
- chicago: delete `max(var(--glass-veil-dock), 0.62)` (`style.css:139-141`, a no-op at the bound) and the count's `opacity: 0.6` (`style.css:102-105`; analytically light 4.12 over black, dark 3.84 over white).
- New with A′: a consumer that bound `backdrop-mode` moves to `class="glass-opaque"` (none found), and a consumer that set `--ink-perimeter` on `:root` and relied on it reaching `.dark` re-declares it under `.dark` (none found in the spec's census).

**Status: STATED.**

## 3 · Mechanism-removal plants (REGISTRY §7.5)

All injected over the A′ specimen build (`D3-Ap-plants.mjs <ap dist> <wt>`, load 41-93, 12:41-13:00).

| green A′ claims | plant | measured red |
|---|---|---|
| M-2 and W-A legs 2-3 (α at the bound) | `plant-bound` (`--glass-bound: 0.25`) | M-2 light black 23/37 (fg 1.64), dark white 25/37 (fg 1.31), light c1 11/37, dark c1 14/37; the same counts in Playwright WebKit |
| item 5 (raster margin) | `plant-margin` (target 4.5) | Playwright WebKit light black 5/37 (muted 4.33); Chromium green |
| H-5 rows (FL-7's floor) | `plant-heldfloor` (`--glass-veil-floor: 0`) | dock-held α 0.547 / 0.540; muted-tab 1.77 (light black) and 1.76 (dark white) Chromium, 1.77 / 1.65 Playwright WebKit; wash-held muted 1.77 |
| H-5 rows (item 2's cure) | `plant-carrierveil` (veil back on the host, carriers bare, z auto: the floor's paint) | Chromium dock-held muted-tab **4.46** (light black), fg 4.76 (dark white); wash-held fg 1.52-1.95, muted 1.22-1.42 in every held cell. Playwright WebKit dock rows stay at 4.71 / 4.84: it paints no `backdrop-filter`, so the cure's dock claim is Chromium's |
| M-3 dark (item 3) | `plant-darkperim` (light scalars inherited) | perimeter 2.78-2.84 Cr, 2.81-2.87 WK; 9 of 19 rows per dark cell under 3.0 |
| item 4 (the escape) | probe `class-l1` | the bound plate, ΔE 0.003-0.103 from the escape |
| M-1 (FL-3's pole) | H2's M-1 plant (`#d7d4ce`) | FAIL 1/11 both engines (H2 §2.1) |
| M-9 (FL-6) | H2's M-9 plants | FAIL 12/18 and 2/18 (H2 §2.1) |
| the carriers' stacking precondition | `risk-opaque-ancestor` (opaque ancestor, non-stacking hosts) | wash-held fg 1.20 light / 1.24 dark, both engines; cured by `z-index: 0` on the host (`-z0`, 0 of 48 under 4.5) |

Every green in §2 except M-1 and M-9 (whose plants are H2's and unchanged by A′) was turned red by a plant measured in this seat.

## 4 · The battery under A′, by engine and theme

`run.mjs <wt> --label ap --demo`: 108 cells, 8 live and 8 motion windows, 12:07:04-12:31:03 (load 114-183 at start, 69-77 at end); `baseline.mjs`, 12:31-12:41 (load 72-93).

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark | HEAD+floor, spec (Cr L / D) | H2 HEAD (Cr L / D) |
|---|---|---|---|---|---|---|
| RAW | PASS 22 | PASS 22 | PASS 22 | PASS 22 | PASS / PASS | PASS / PASS |
| M-1 | **PASS 11** | — | PASS 11 | — | PASS 11 / — | FAIL 11/11 |
| M-2 | **PASS 397** | **PASS 397** | PASS 397 | PASS 397 | FAIL 26/397, 24/397 | FAIL 150, 127 |
| M-2m | **PASS 148** | **PASS 148** | PASS 148 | PASS 148 | PASS / PASS | FAIL 53, 55 |
| M-3 | **PASS 177** | **PASS 177** | FAIL 2/177 | PASS 177 | FAIL 12, 91 | FAIL 177, 144 |
| M-4 | PASS 77 | PASS 77 | PASS 77 | PASS 77 | PASS / PASS | FAIL 7, 7 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 | PASS / PASS | FAIL 1, 3 |
| M-6 | FAIL 4/4 | FAIL 3/26 | FAIL 4/4 | FAIL 3/26 | FAIL 4/4, 3/26 | PASS 4, FAIL 14 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 | PASS / PASS | FAIL 4, 4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 | PASS / PASS | FAIL 4, 4 |
| M-9 | PASS 10 | PASS 8 | PASS 10 | PASS 8 | PASS / PASS | PASS 10, FAIL 2 |
| W-A | **PASS 96** | **PASS 96** | PASS 96 | PASS 96 | PASS / PASS | FAIL 31, 22 |
| W-G | FAIL 12/20 | FAIL 16/20 | FAIL 16/20 | FAIL 20/20 | FAIL 12, 16 | FAIL 20, 10 |
| T | reported | reported | reported | reported | | |

Whole-run Chromium verdicts (`run.mjs`): RAW PASS 44 · M-1 PASS 11 · M-2 PASS 794 · M-2m PASS 296 · M-3 PASS 354 · M-4 PASS 154 · M-5 PASS 20 · M-6 FAIL 7/30 · M-7 PASS 8 · M-8 PASS 8 · M-9 PASS 18 · W-A PASS 192 · W-G FAIL 28/40 · T reported. W-B, W-C, W-D, W-E and W-F belong to banked or retired families and read nothing A′ claims (W-B FAIL 12/16, W-C 235/320, W-D 4/9, W-E 20/370, W-F 70/160).

**The red rows, by cause.**
- **M-6 light 4/4** (adjacent ΔE 0.001-0.004) and **dark 3/26** (wash→quiet 0.007, quiet→resting 0.004, floating→overlay 0.007; resting→floating 0.011 passes). The bound leaves 0.11-0.13 of α for the steps, so one step moves a plate by under 0.01. To the owner: **Q-1, extended to dark**. Under A′ the ladder is one material at three nearly equal thicknesses; option (c), content, chrome and the room, is the honest reading. A′ builds on (a).
- **M-3 Playwright WebKit light 2/177**: checker ring 2.83 on the floating well; 0 Chromium rows. Informational.
- **M-8 Playwright WebKit dark 1/4**: floating bleed 1.26 over stripes (no blur painted). Informational.
- **W-G**: G's witness, read for item 6 only.

**Readings beside the verdicts.** M-2 worst: Chromium light 4.83 (dock muted-tab, ladder and held), dark 4.84 (dock muted-tab); Playwright WebKit light 4.57, dark 4.84. M-2m: 137-141 Chromium step frames per window; worst light 5.16 (wash well-muted), dark 5.38 (popover muted); the dock sample's L steps in one frame on the ceiling change (0.940 → 0.960 light, 0.342 → 0.312 dark), which is the field showing through T, and no ink dips. M-5: 0 readbacks and no custom-property writes in 1080-1081 Chromium frames per window, 882 in Playwright WebKit.

## 5 · Typecheck, units, build, bundle (worktree; cacheDir `.vite-ap`, `.vite-ap-demo`)

| step | command | result | load |
|---|---|---|---|
| typecheck app | `vue-tsc --noEmit` (nice 19) | exit 0 | 114 |
| typecheck tests | `vue-tsc --noEmit -p tsconfig.test.json` | first run (before the build) 2 errors, both `@mkbabb/glass-ui/fourier-math` unresolved without `dist/`; after the build **exit 0** | 110 → 75 |
| targeted units | `vitest run tests/styles tests/components/custom/dock tests/design tests/components/slider tests/public-surface.spec.ts` | 696 passed, 6 failed, all six needing `dist/`; rerun of the two files after the build: **100 passed** | 81 → 76 |
| library build | `vite build --config vite.ap.config.ts` (the repo config with `cacheDir: ".vite-ap"`) | exit 0 | 79 |
| full units | `vitest run --testTimeout 240000` | **2315 passed**, 10 expected-fail, 1 skipped, 3 failed: `boot-graph` ×3, which needs a root `dist-demo` (as for the floor and A-proto) | 73-93 |
| `dist-demo`, then `boot-graph` | `demo/vite.demo-dist.config.ts`, then `vitest run tests/gates/boot-graph.test.ts` | **14 passed** | 99-101 |
| package verifier | `node scripts/verify-export-types.mjs` | **`G-BUNDLE-RATCHET` shrink 2,900,235 < 2,919,057** (−18,822 B: the floor's −18,099 and A′'s −723). Owed: a deliberate rebind from a committed-tree build at landing | — |

## 6 · Obligations, with status

| obligation | status | evidence |
|---|---|---|
| A′ 1 · content at the bound, T, glance, glass and engagement | MET; gestalt to the owner | §2 item 1, §4 |
| A′ 2 · held hosts at or above the bound, H-5 green | MET in both engines; residual α unexplained; release unmeasured | §2 item 2 |
| A′ 3 · dark perimeter, M-3 dark green | MET (0.60) | §2 item 3 |
| A′ 4 · `backdropMode` deleted | MET | §2 item 4 |
| A′ 5 · WebKit ≥ 4.5 wherever Chromium is green | MET (Playwright WebKit) | §2 item 5 |
| A′ 6 · Q-4 red read, M-6 signed | MET (reading) | §2 item 6 |
| A′ 7 · value.js, chicago | STATED | §2 item 7 |
| Every route · floor rows built | the floor patch is the base; FL-13 lives in the consumers (FLOOR.md §1) | §0 |
| Every route · every cell in both engines under H2 | MET: 108 cells, both engines | §4 |
| Every route · WebKit dock rows `+shim` | MET; the unshimmed probe crashed in both themes (`page.goto: Page crashed`), as H-14 records | `run-ap` log |
| Every route · a mechanism-removal plant per green | MET | §3 |
| Every route · prose sweep of touched files | MET for every file this route touches; residue: `glass/ladder-undershadow.css:15-18` ("the earned-darken clamp rides the veil's alpha"), untouched by floor and route | §1 |
| Every route · real Safari | UNMEASURED (owner's safaridriver checkbox) | — |
| O-87 (no added lighting) | MET: A′ adds no layer, shadow or gleam; it moves one veil below content and thickens one ink rung | §1 |

**To the owner** (unchanged from the spec, now on the prototype's own run): Q-1 extended to dark (§4); Q-3 (a) as A′'s centre, every surface reads as a card (§2 item 1); Q-7: A′ has no thin arm to be dead or false, and an invalid solve paints α 1.

## 7 · Records

| run | command | load |
|---|---|---|
| full H2, A′ | `D3_OUT=<s>/out node harness/run.mjs <wt> --label ap --demo` (12:07-12:31) | 114-183 → 69-77 |
| per-engine table | `harness/baseline.mjs <s>/out/caps/ap` (12:31-12:41) | 72-93 |
| HEAD base for the glance | `harness/build.mjs <wt-head> --label head --demo` (a second worktree at `020f6586`, no patch) | 115 |
| plants and risk | `pass-2/D3-Ap-plants.mjs <ap dist> <wt> --only plant-bound,plant-margin,plant-heldfloor,plant-carrierveil,plant-darkperim,risk-opaque-ancestor,risk-opaque-ancestor-z0` (12:41-12:54) | 45-93 |
| held-α diagnostics | `--only diag-held-noshadow,diag-held-nosliderblur,diag-held-nodockblur,diag-held-nobright,diag-held-noanyblur`, then `--held <capdir>` | 41-47 |
| escape probe | `pass-2/D3-Ap-probe.mjs <wt>` (12:58) | 34-41 |
| owner glance | `harness/glance.mjs --base head/dist --route ap/dist --story-base head/demo --story-route ap/demo --require-delta [--engine webkit]` (12:58-13:01) | 32-56 |

The plant tool gained the route's own variants (`plant-carrierveil`, `plant-darkperim`, the two `risk-opaque-ancestor` variants, the five `diag-held-*` variants) and an optional per-variant `engines`; the probe gained the `class-l1` plant and a ΔE-from-`class` column. Both stay usable on HEAD+floor, where `mode` still paints the opaque arm.
