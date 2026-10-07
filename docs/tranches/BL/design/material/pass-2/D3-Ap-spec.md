# D3 · pass 2 · A′ spec: the bound, nothing added

| field | value |
|---|---|
| seat | D3 pass 2, A′ research + spec. REGISTRY §7.3 A′ items 1-7 and "Every route", answered by probes on HEAD+floor |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree cut at the checkout's HEAD `eff2022e` (the task named `020f6586`; `git diff --stat 020f6586 HEAD -- src` is empty), `floor.patch` applied clean (70 files). The HEAD build for the owner glance is the same worktree with the patch reversed, then re-applied |
| engines | Chromium 149 (gate) and **Playwright WebKit 26.5** (paint-only, no `backdrop-filter`, dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | other sessions held the machine at 33-150 throughout (§5 lists each run's load). No cell timed out and no window fell under its frame minimum, so nothing here needed the twice-repeat rule |
| fences | no source edit, no git write in the checkout. Writes: this file, `D3-Ap-probe.mjs`, `D3-Ap-plants.mjs` (this directory). Captures stayed in scratch; the worktree is removed |
| not read | the other routes' pass-2 files (REGISTRY §7.4) |

## 0 · In brief

- **The floor is A′'s centre, and under H2 it is nearly green.** The first full H2 run on HEAD+floor (the run FLOOR.md §4 owed): RAW, M-1, M-2m, M-4, M-5, M-7, M-8, M-9, W-A and T pass in Chromium. Three witnesses stay red, each on one named cause (§1).
- **What A′ adds to the floor is three cures and one deletion, no new mechanism:**
  1. **the held veil rides the grasp carriers** (item 2). The carrier's `backdrop-filter` paints above the plate's own background, so the 26 px grasp blur smears the surrounding ground into the veil: the held dock's muted tab reads **4.46** over black in light, Chromium. Moving the veil onto the carriers under the host's content reads **4.83**, and every H-5 row passes in both engines;
  2. **the dark perimeter arm** (item 3): `.dark { --ink-perimeter: 0.60 }`, with seam and edge scaled to keep 1 : 2 : 6.5. Dark M-3 goes from 2.78-2.88 to **3.29-3.42** in Chromium (3.37-3.50 Playwright WebKit);
  3. **`backdropMode` is deleted** (item 4). `class="glass-opaque"` paints the same plate to ΔE 0.0000 in all 12 cells per engine, and the opaque arm's one non-paint act (`backdrop-filter: none`) is dead in Chromium anyway;
  4. the prose sweep the floor left (0.48 → 0.52 in five files).
- **Transmission is the cost, and it is the floor's** (H-12): light T 0.035-0.110, dark 0.043-0.125, T_c1 up to 0.144. Over the aurora the content rungs read as cream cards (light) and brown cards (dark). This is A′'s gestalt gap, structural to its centre (§2 item 1).
- **Every green A′ claims has a plant that turns it red**, measured (§3).

## 1 · HEAD+floor under H2: the full run

`node harness/run.mjs <wt> --label floor --demo`: 108 cells, 8 live and 8 motion windows, captured in 1089.9 s, load 41 at start and 63-104 at capture end; witnesses at load 81-107. `baseline.mjs` per engine and theme:

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark | H2 HEAD (Cr L / D) |
|---|---|---|---|---|---|
| RAW | PASS 22 | PASS 22 | PASS 22 | PASS 22 | PASS / PASS |
| M-1 | **PASS 11** | — | PASS 11 | — | FAIL 11/11 |
| M-2 | FAIL 26/397 | FAIL 24/397 | PASS 397 | PASS 397 | FAIL 150 / 127 |
| M-2m | **PASS 148** | **PASS 148** | PASS 148 | PASS 148 | FAIL 53 / 55 |
| M-3 | FAIL 12/177 | FAIL 91/177 | FAIL 2/177 | FAIL 86/177 | FAIL 177 / 144 |
| M-4 | PASS 77 | PASS 77 | PASS 77 | PASS 77 | FAIL 7 / 7 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 | FAIL 1 / 3 |
| M-6 | FAIL 4/4 (Q-1 a) | FAIL 3/26 | FAIL 4/4 | FAIL 3/26 | PASS 4 / FAIL 14 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 | FAIL 4 / 4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 | FAIL 4 / 4 |
| M-9 | PASS 10 | PASS 8 | PASS 10 | PASS 8 | PASS 10 / FAIL 2 |
| W-A | **PASS 96** | **PASS 96** | PASS 96 | PASS 96 | FAIL 31 / 22 |
| W-G | FAIL 12/20 | FAIL 16/20 | FAIL 16/20 | FAIL 20/20 | (G's witness; read for item 6 only) |
| T | reported | reported | reported | reported | |

The red cells, by cause:

| red | rows | cause | A′ answer |
|---|---|---|---|
| M-2 Chromium, 50 rows | all in the `held` scene: `wash-held` and `floating-held` fg 1.52-1.95, muted 1.22-1.42, in both themes over black, white and c1; `dock-held` muted-tab **4.46** (light, black) | the grasp carrier paints above the host (§2 item 2). On a text-bearing host it also blurs the host's in-flow text, which paints before positioned children | item 2's cure |
| M-3 dark, 91 Cr / 86 WK | the well perimeter, 2.78-2.88 Cr, 2.81-2.92 WK, on every ground; held wells 1.00 (the same carrier) | `--ink-perimeter` 0.52 has no dark arm | item 3 |
| M-3 light, 12 Cr | held wells only (1.00) | the carrier | item 2 |
| M-3 light, 2 WK | checker ring 2.83 (floating well) | Playwright WebKit only; 0 Chromium rows | informational; Safari UNMEASURED |
| M-6 light 4/4 | adjacent ΔE 0.001-0.004 | Q-1 (a), by construction | owner (§4) |
| M-6 dark 3/26 | adjacent ΔE wash→quiet 0.007, quiet→resting 0.004, floating→overlay 0.007 (resting→floating 0.011 passes). Signed: every dark plate ΔL +0.131 to +0.149 | the bound leaves 0.127 of α, so one step (0.042) moves a dark plate by under 0.01 over the page. The light reason (Q-1) holds in dark too under A′ | owner (§4) |
| M-8 WK dark 1/4 | floating bleed 1.26 | Playwright WebKit paints no blur | informational |

## 2 · The seven items

### Item 1 · Content at the bound on every rung; T; what makes it read as glass and engaged

**How it is met.** The floor already does it: `tokens/glass.css:251-286` sets every rung at `--glass-bound` plus whole steps, and W-A leg 4 reads the thinnest rung of each band on the computed bound (PASS 96 per engine × theme). A′ adds nothing here.

**T per rung** (H-12, `T.log`):

| rung | Cr light T / T_c1 | Cr dark T / T_c1 | WK light T | WK dark T |
|---|---|---|---|---|
| wash, floating, dock, popover | 0.110 / 0.121-0.139 | 0.125 / 0.126-0.144 | 0.110 | 0.125 |
| quiet, overlay | 0.075 / 0.082-0.087 | 0.086 / 0.091-0.097 | 0.075 | 0.086 |
| resting, card | 0.035 / 0.039-0.044 | 0.043 / 0.045-0.047 | 0.035 | 0.043 |
| dialog rung, real Dialog, opaque | 0.000 | 0.000 | 0.000 | 0.000 |

HEAD transmitted 0.78-0.94 (H2 §3.3).

**Owner glance (H-13)**, `glance.mjs` HEAD against HEAD+floor, both engines, `--require-delta` PASS 8/8 pairs. Chromium readings over paper:

| theme | surface | HEAD | A′ (floor) |
|---|---|---|---|
| light | floating | `#d7d4ce` L 0.871, muted 4.44 | `#fef7f2` L 0.980, ΔE paper 0.009, muted 6.19 |
| dark | dock | `#0f0d0a` L 0.160, muted ink `#ffffff` | `#30261f` L 0.278, muted `#c3b9ac` 7.66 |
| dark | floating | `#0e0b06` L 0.151 | `#2f261f` L 0.277 |
| dark | Dialog | `#151009` L 0.177 | `#352a22` L 0.295 |

Story deltas 31.97% (light) and 28.71% (dark) in Chromium, 26.60% in Playwright WebKit (above H2's 2.06% noise floor, since FL-1 deleted the live-sample card).

**The gestalt, read from the story pair.** Light: the plates are cream paper cards on the aurora; O-62's grey is gone (M-1 green), but wash, quiet and resting are indistinguishable and the field shows only as a faint warm tint at the plate. Dark: warm brown cards lifted off the page, legible everywhere, no field colour. It reads as a calm, well-made card system and not as glass. That is the gap REGISTRY A-crit §5 named, and A′ cannot close it without leaving its centre.

**What, besides paint, makes a bound-thick plate read as glass.** At T ≤ 0.125 paint carries almost none of it. What is left, all already in the library and none added (O-87 forbids added lighting):
- the blur, which turns the 11-14% the plate passes into a soft colour bleed at the plate (T_c1 runs 0.01-0.03 above T in Chromium, where saturate lifts the field);
- the single rim edge and the elevation shadow;
- motion: the dock's spring morph and the grasp register's 1.625× dilation (D-1).

**Engagement (M-9, D-2).** PASS in both themes and engines: active ΔE 0.051-0.096, hover 0.033-0.042, checked 0.319-0.488, selected 0.183-0.227; the light focus veil dims ΔL −0.070 (paper) and −0.029 (c1). The dark veil over paper reads ΔL +0.006 (information, not gated): it does not visibly dim there.

**Witness:** W-A leg 4, T, GLANCE, M-9.

### Item 2 · The held dock and every grasp host at or above the bound (FL-7, H-5)

**Finding.** FL-7 holds the α (`grasp.css:134`: the held rung computes to the bound on every bound rung, since 0.6 × 1 < 0.89), but the paint does not hold the ink. During a hold the host drops its own `backdrop-filter` (`grasp.css:110-112`) and the grasp carrier, an absolutely positioned child (`grasp.css:148-153`, `:168-175`), filters *above* the host's background. So the 26 px grasp blur mixes the ground around the plate into the veil:

| cell (Chromium) | painted α (bound) | worst dock ink |
|---|---|---|
| light black, dock-held | 0.874 (0.891) | muted-tab **4.46** |
| dark white, dock-held | 0.858 (0.873) | fg 4.76 at R 1, 4.69 at R 3 |
| Playwright WebKit (no blur) | 0.893 / 0.878 | all ≥ 4.71 |

On a text-bearing host (the H-5 rung specimens) the carrier also paints over the host's in-flow text: fg 1.52-1.95 and wells 1.00. The library's two shipped grasp hosts (`.dock-plate` and `.slider-range`) carry no text, and `grasp.css:27-35` already says a ladder rung is not graspable as it stands. So the rung rows are a contract gap rather than a shipped defect, but H-5 reads them and the cure covers them.

**Diagnosis, measured.** With the carrier's filter removed (`diag-noblur`), every H-5 M-2 row passes in both engines (dock-held muted-tab 4.83 light black Chromium).

**The cure (mechanism).** While the carriers are mounted, the veil rides the carriers beneath the host's content:
- `glass/grasp.css:110-112`, the existing `:has(> .glass-grasp-carrier[data-grasp="grasp"])` rule, also sets `background: none`;
- `glass/grasp.css:148-153`: `.glass-grasp-carrier` gains `background: var(--glass-veil); z-index: -1`. `--glass-veil` is the host's own computed plate (`veil.css:53-57`), inherited. So the held α stays the FL-7 rung, now composed over the filtered ground in the right order: filter, then veil, then content.

Measured as an injected probe (`cure-carrier-veil`) on HEAD+floor:
- **every H-5 M-2 row passes in both engines and both themes.** Worst: Chromium light black dock-held muted-tab 4.83; dark white muted 4.91; Playwright WebKit 4.71;
- H-5 M-3 light rows pass (3.08-3.15). The dark held rows fall only on the item 3 perimeter;
- the blur stays: the carrier still filters, so the register keeps its 1.625× optic (D-2).

The probe's painted-α reading on the dock sample is still 0.866 light / 0.852 dark (bound 0.891 / 0.873) while every ink passes. That residual 0.025 sits in the sample region beside the held Slider and is not explained here: the prototype must read it, or show it is the thumb's lift shadow.

**The prose this changes.** `grasp.css:1-35` ("a carrier mounted on a `.glass-card` today would blur the card's own plate") and `:137-147` ("carrying NOTHING but a `backdrop-filter`: no background") state the old contract. Both are rewritten, and the `glass-subtlety.test.ts` arm that scans carrier hosts (`grasp.css:35-40`) gains the veil-on-carrier assertion.

**Risk.** `z-index: -1` on a child of a host that is not a stacking context paints in the nearest stacking context's negative layer, below any opaque non-stacking ancestor's background. Over such an ancestor the carrier's blur would be hidden, and the held veil with it. The host's own background is gone while held, so its text would sit on that ancestor. That ancestor is opaque, so legibility holds, but the grasp optic is lost there. `.dock-plate` is itself a stacking context (`z-index: -1`), so the dock is unaffected. The prototype measures a held `.slider-range` inside an opaque card.

**Witness:** M-2 and M-3 on the H-5 cells. **Plant:** `plant-heldfloor` (`--glass-veil-floor: 0`) sheds the held dock to α 0.55 and muted-tab 1.64 (light black) and 1.77 (dark white) in Chromium, and 1.77/1.65 in Playwright WebKit. So FL-7 is load-bearing, and its witness turns red without it.

### Item 3 · The dark perimeter arm (Q-6 a)

**Measured sweep** (`perim-*`, dark, ladder and Dialog over black, white, stripes and c1, both engines). `.dark { --ink-perimeter: p; --ink-edge: p/3.25; --ink-seam: p/6.5 }`:

| dark p | Chromium perimeter (min) | Chromium ring | Playwright WebKit perimeter | verdict |
|---|---|---|---|---|
| 0.52 (inherited, floor) | 2.78-2.88 | 3.09-4.08 | 2.81-2.92 | red on every ground |
| 0.56 | 3.04-3.15 | 3.36-4.47 | 3.12-3.24 | green, margin 0.04 |
| **0.60** | **3.29-3.42** | 3.58-4.89 | 3.37-3.50 | green, margin 0.29 |
| 0.64 | 3.57-3.72 | 3.87-5.37 | 3.63-3.78 | green |

**The spec: p = 0.60.** The light arm's perimeter reads 3.08-3.15 (a 0.08 margin), and 0.56 would carry less margin than light. 0.60 is the smallest measured value that holds both engines with a margin no thinner than light's. The arm keeps PROPORTION 1 : 2 : 6.5 (seam 0.0923, edge 0.1846), so Q-6 (a) holds.

**Targets.**
- `tokens/dark-arm.css`, beside the veil's dark arm (`:270-277`): the three `--ink-*` declarations, each with its measured reason.
- `tests/styles/proportion-register.test.ts:173-182` ("invents NO dark-arm α — OWED"): the capture it waited for is this sweep. It becomes an assertion that the dark arm holds the same 1 : 2 : 6.5 ratio, and `:123-129` runs on both arms.
- `tokens/color-radius.css:145-152`'s "DARK ARM OWED" paragraph is rewritten.

**Witness:** M-3 dark. **Plant:** removing the dark arm (the floor as is) reds M-3 dark 91/177 Chromium.

### Item 4 · `backdropMode` deleted

**Finding** (`D3-Ap-probe.mjs`: three docks, default, `backdrop-mode="opaque"` and `class="glass-opaque"`, over black, white and c1, both themes, both engines):
- `glass-opaque` paints the **same plate** as the opaque mode: ΔE 0.0000 in all 12 cells per engine (light `#fef7f1`, dark `#352a22`);
- the arm's `backdrop-filter: none` (`adaptive-legibility.css:38-39`) **does not apply in Chromium** (computed `blur(12px) saturate(1.5)`); it applies only in Playwright WebKit (`none`). The one thing the mode did beyond paint is dead in the gate engine;
- the only paint difference is the expanded border, 5% ink under the mode against 8% under the class;
- `--dock-surface-blur` is root-baked (`shell.css:20`), so a per-instance `--glass-level: 0` does not reach the dock's blur (computed `blur(calc(12px * 1))` under the class). The blur sits under an α-1 plate and paints nothing, so A′ leaves it.

No consumer binds `backdropMode`: the only hit across the glass-ui consumers is a comment in keyframes (`ChromeDock.vue:204`). **Delete it (E-1).** Targets on HEAD+floor:
- `GlassDock.vue:75` (the default) and `:309` (`data-backdrop-mode`);
- `useDockShellProps.ts:27` (`DockBackdropMode`) and `:43-48` (the prop and its doc);
- `dock/index.ts:6` (the type export);
- `adaptive-legibility.css:21-40` (the opaque arm) and its header prose `:4-7`;
- `dock/README.md:42, 51`;
- tests: `GlassDock.backdrop-mode.test.ts` (delete), `GlassDock.posture.test.ts:167, 178` (drop the member);
- demo: `feedback/progress.vue:235, 253` and `dock/overview.vue:182-190` move to `class="glass-opaque"`.

**Witness:** M-1 and W-A on the escape row (`opaque`, PASS) cover the class. **Plant:** a dock carrying `glass-opaque` with `--glass-level` held at 1 paints the bound plate (the probe's `default` row, ΔE 0.050-0.103 from the escape). The prototype carries that row into the probe as its red leg.

### Item 5 · Engine margin: Playwright WebKit ≥ 4.5 wherever Chromium claims green

**Met by the floor's 4.8 target** (`glass.css:42`, 4.5 + 0.3). Every Playwright WebKit M-2 row passes (397/397 per theme). Lowest WebKit chrome readings: light dock muted 4.71 (held, cure), light ladder muted 4.62 (W-A leg 2, FLOOR §2).

**Plant:** `plant-margin` (`--glass-ink-target: 4.5`) reds Playwright WebKit light-black M-2 5/37 (muted 4.33, dock muted 4.45) while Chromium stays green (4.52). The margin is exactly what holds the engine gap (PF-15). Real Safari's glyph gap is UNMEASURED (owner's safaridriver checkbox).

### Item 6 · Q-4's dark pole: UIA-V-198's red, M-6 signed

**Signed M-6: green.** Every dark plate sits above the page: ΔL +0.131 to +0.149, ΔE 0.132-0.150, in both engines.

**Over `#761617`** (W-G rows, Chromium, dark):

| surface | composite | Δh from the red | C / gamut max | muted |
|---|---|---|---|---|
| dock, wash | `#422720` | 9.3-9.5° | 0.043 / 0.106 (0.40) | 7.04 |
| quiet | `#3e2720` | 11.7° | 0.037 (0.38) | 7.16 |
| resting, card | `#3a2922` | 17.5° | 0.028 (0.32) | 7.14 |

Legible with a wide margin, and it reads as a dark brown-red card: hue within 10° only on the bound rungs, chroma at a third of what the gamut allows. Q-4 (a) as the owner framed it (UIA-V-198, "brown over saturated red"). The light arm over the red: dock `#f3ddd8`, Δh 6.1°, C 0.025 (0.57 of gamut). A′ makes no hue claim. W-G is G's witness and is reported here only as Q-4's reading.

### Item 7 · value.js (THE STOP) and chicago

Read-only reads of both repos; nothing was built or run there.

**value.js** (pinned `@mkbabb/glass-ui` 10.1.0, `package.json:89`; HEAD `d68e28575`). The X.W7L.i change already landed in value.js:
- `certify()` now bisects to the best ratio in [4.5, 5.75) instead of throwing (`demo/color-session/ink.ts:95-140`);
- an opaque surface admits at least 4.58:1 against black or white at any Y (`ink.ts:84-91`), so a floor of 4.5 is reachable on every surface.

**THE STOP is cleared on any material, A′'s included.** What A′ changes is the model value.js keeps of the producer's plate:
- the live probe reads the painted `.dock-plate` and the tier tokens (`useContrastSafeColor.ts:148-222`). Under A′ it reads `--card` at the bound, which certifies easily (composite L 0.98 light, 0.27-0.40 dark);
- the static fallback `PRODUCER_VEIL` (`ink.ts:39-50`: ink `oklch(0.28 …)` at α 0.14 + k·0.04) describes 10.1.0's ink veil, which the floor retires;
- `CARD_L` uses `hsl(30 85% 96%)` (`ink.ts:30`); the floor lifts the card to 97%.

The addendum (E-6): replace `PRODUCER_VEIL` with the card pole at the bound (or delete the static model and require the live probe), and repin `PRODUCER_TINTS.card`. `PaneHeader.vue:101` and `picker/header.css:62` read `--glass-plate-resting`, which survives as a paintable colour. `ComponentSliders.vue:315` reads `--glass-veil-wash`, which survives. `foundation.css:836, 870` set `--glass-level` (0.1 and 0), which still means what it meant.

**chicago** (pinned 10.1.0):
- `src/style.css:139-141`, `max(var(--glass-veil-dock), 0.62)`, computes to the bound (0.89/0.87 > 0.62), a no-op. Delete it (E-1).
- `src/style.css:102-105`, `.dock-count { opacity: 0.6 }`. Analytically (`--foreground` at 0.6 over the bound composite): light over black 4.12, dark over white 3.84. Both are under 4.5, so delete the opacity and let the count take the muted register.
- The lens fix (`style.css:131-133`) and the run overflow (`:136-138`) are not the material's.

## 3 · Mechanism-removal plants (REGISTRY §7.5)

Each green A′ claims, the plant that removes its mechanism, and the red it measured. All are injected on the HEAD+floor build (`D3-Ap-plants.mjs`); the cure plant waits for the prototype.

| green | plant | measured red |
|---|---|---|
| M-2, W-A legs 2-3 (the α at the bound) | `plant-bound`: `:root, .dark { --glass-bound: 0.25 }` | M-2 light black 23/37 (dock fg 1.50), dark white 25/37 (dock fg 1.25), both engines. W-A leg 4 alone stays green (painted equals computed), which is why legs 2-3 carry the claim |
| M-2 Playwright WebKit (the raster margin) | `plant-margin`: target 4.5 | WebKit light black 5/37 (muted 4.33); Chromium green 4.52 |
| H-5 dock rows (FL-7) | `plant-heldfloor`: `--glass-veil-floor: 0` | held dock α 0.55; muted-tab 1.64 Cr / 1.77 WK (light black), 1.77 / 1.65 (dark white) |
| H-5 rows (item 2's cure) | the floor as is (cure absent) | Chromium M-2 50/794 (dock-held 4.46; rung hosts 1.22-1.95), M-3 held 1.00 |
| M-3 dark (item 3) | the floor as is (no dark arm) | 2.78-2.88 Cr, 91/177 |
| M-1 (FL-3's pole) | H2's M-1 plant (`#d7d4ce`), already in the self-test | FAIL 1/11 both engines (H2 §2.1) |
| M-9 (FL-6) | H2's M-9 plants | FAIL 12/18 and 2/18 (H2 §2.1) |
| item 4 | the escape class with level 1 | the `default` row: ΔE 0.050-0.103 from the escape |

## 4 · What goes to the owner

- **Q-1, extended to dark.** Under the bound, the dark ladder's adjacency is 0.004-0.011 (M-6 3/26 red), for the same reason as light: the steps live in the last 13% of α. Under A′ the rungs are a single material at three nearly equal thicknesses. Option (c), collapsing to content, chrome and the room, is the honest reading of what A′ paints, and it deletes the step arithmetic (`glass.css:273-285`). A′ builds on (a) until the owner rules.
- **Q-3 (a) as A′'s centre:** every chrome surface and every content rung reads as a card (§2 item 1). This is the measured cost, not a defect to cure inside A′.
- **Q-7:** A′ has no thin arm, so nothing can be dead or false. An invalid solve paints α 1 (`glass.css:288-292`).

## 5 · Records

| run | command | load | result |
|---|---|---|---|
| full H2, HEAD+floor | `harness/run.mjs <wt> --label floor --demo` | 41 → 63-104 (capture), 81-107 (witnesses) | §1 |
| per-engine table | `harness/baseline.mjs <caps>/floor` | 102 → 81 | §1 |
| held, diagnostic and cure | `D3-Ap-plants.mjs --only diag-noblur,cure-carrier-veil` | 81-86 | §2 item 2 |
| dark perimeter sweep | `--only perim-0.56,perim-0.60,perim-0.64` | 40-78 | §2 item 3 |
| plants | `--only plant-bound,plant-margin,plant-heldfloor` | 87-150 | §3 |
| escape probe | `D3-Ap-probe.mjs <wt>` | 117-83 | §2 item 4 |
| owner glance | `harness/glance.mjs --base head --route floor` (+ story), both engines | 71-68 | §2 item 1 |

The batch above ran as a shell loop with the same CSS that `D3-Ap-plants.mjs` now holds; the tool is that loop written down. `--held <capdir>` prints the held α table.

## 6 · MIGRATION.md rows

These ship in the cut that lands A′; the floor's rows are listed because A′ ships the floor. Every row breaks against the published 10.1.0.

_`GlassDock`'s `backdropMode` prop leaves_

`backdropMode`, the `DockBackdropMode` type and the `data-backdrop-mode` attribute are removed. The dock paints the chrome bound, legible over any backdrop, so it has no mode to choose. `backdrop-mode="static"` → `class="glass-opaque"` (the level-0 escape: the same solid `--card` plate, ΔE 0); `backdrop-mode="live"` → omit it. A selector on `[data-backdrop-mode]` matches nothing.

_`GlassDock`'s `backgroundCanvas` prop leaves (floor, FL-1)_

The dock no longer samples its backdrop, so it needs no canvas. Delete the binding (`:background-canvas="…"`); it is now a type error. `--glass-backdrop-luma`, the `--glass-backdrop` bucket and `data-glass-field-canvas` leave with it, and a selector or read on any of them finds nothing.

_The glass plate is `--card` at the computed bound (floor, FL-3..FL-5)_

`--glass-veil-*` rungs are now `--glass-bound` plus whole steps, with `--glass-bound` registered `<number>` and computed from `--on-glass-muted-l`, `--card-l` and `--glass-ink-target`. An override of a rung's α should retune the ink or the target instead. A literal α under the bound is the any-input legibility the library no longer promises. `--input-on-glass` leaves (the field well is `--glass-well`).

_State fills read the ink, not the plate (floor, FL-6)_

Hover, active, selected, checked and menu-row fills read `--fill-hover` / `--fill-selected`, and the focus veil reads the scrim ink. A consumer that painted state from `--glass-plate-*` moves to the fill register. `--glass-plate-*` remains a paintable plate colour.

_The dark arm declares the perimeter ink_

`.dark` declares `--ink-perimeter: 0.60` (with seam 0.0923 and edge 0.1846). A dark focus ring or control edge is more present (3.3:1 against 2.8:1). A consumer that set `--ink-perimeter` on `:root` and relied on it reaching `.dark` re-declares it under `.dark`.

_A held plate keeps its veil on the grasp carriers_

While `.glass-grasp-carrier[data-grasp="grasp"]` is mounted, the host paints no background, and the carriers paint the host's veil below its content. A consumer mounting carriers keeps the same markup. A host whose layout needs the carriers above its content is no longer supported.

## 7 · Risks

1. **Gestalt** (item 1): A′ is legible everywhere and reads as cards. If the owner rules Q-3 (b) or (c), A′ is dominated by any route that holds the battery thinner. It stays the null route.
2. **The carrier cure's stacking** (item 2) under an opaque non-stacking ancestor, unmeasured. There is also the unexplained 0.025 painted-α residual on the held-dock sample.
3. **The dark perimeter at 0.60** is measured on M-3 only. The prototype re-runs the whole battery, because the scaled seam and edge move every dark divider (no witness reads dividers today).
4. **Playwright WebKit is not Safari.** Every engine-margin claim stops at Playwright WebKit; real Safari is UNMEASURED (owner's safaridriver checkbox).
5. **Prose the floor left.** `--ink-perimeter` is 0.52, but five touched-or-reading files still say 0.48:
   - `_shared/field/control.css:48, 50`;
   - `utilities/base.css:137`;
   - `tokens/scale-paper.css:90`;
   - `card/styles.css:110`;
   - `glass/overlay-plate.css:173`.

   A′'s prose sweep corrects them. Also stale after A′: the story card "MOVING SPECULAR — hover any plate and the edge gleam follows" in `glass-material.vue`, which O-87's one-quiet-edge reading puts in question; that is the token wave's to rule.
6. **Load.** Every run here sat at load 33-150. No janky cell was seen, so nothing was flagged NOT-REPRODUCED. M-2m's Chromium step windows took 163-169 frames.
