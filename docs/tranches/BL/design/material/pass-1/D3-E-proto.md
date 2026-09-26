# D3 · pass 1 · D3-E prototype · the self-grounded ink

| field | value |
|---|---|
| seat | pass-1 PROTOTYPE seat for family D3-E (legibility at the glyph; the plate stays thin) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the checkout read `4af44b36`. `git diff --stat 9aa2b7f9 4af44b36 -- src demo` touches only `components/configurator/styles.css` and `src/index.ts` (none of the material) |
| status | **RUNS.** The patch applies to `4af44b36` (`git apply --check`), typechecks, passes the unit suite except 3 build-artefact cases that also fail at HEAD, builds the library, and ran the whole battery |
| engines | Chromium 149 and Playwright WebKit 26.5, headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 21-30 during the runs |
| patch | `pass-1/D3-E-proto.patch` (66 files, +306 −1885, plus the new `src/styles/glass/ink-ground.css`); apply with `git apply` on `4af44b36` |
| scratch | `P = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-E-proto/`. The worktrees `P/wt` (prototype) and `P/wt-head` (HEAD) are removed |
| inputs | `SPECS.md` (the D3-E spec and SHARED FACTS only), `D3-E.md`, `harness/HARNESS.md`, the research probe `…/D3-E-research/D3-E-probe.patch` (the starting point) |

## 0 · Verdict in one table (Chromium gate; Playwright WebKit informational)

| witness | HEAD (`HARNESS §3`) | D3-E prototype, Chromium | Playwright WebKit [info] | spec prediction (E.3) |
|---|---|---|---|---|
| M-1 no grey | FAIL 11/11 | **FAIL 2/11**: plates L 0.981-0.986, ΔE 0.002-0.005 (green); opaque escape `#fdf5ec` L 0.974 (S-6, 0.001 under the floor); real Dialog `#b3b0ad` L 0.758, ΔE 0.227 (S-8) | FAIL 2/10, the same two rows | GREEN on plates, RED on escape + Dialog: **confirmed** |
| M-2 text | FAIL 169/560 | **PASS 560/560**: fg 16.20 light / 11.17-class dark; muted 5.02 light, 5.44 dark on every plate and ground, Dialog included | PASS 532/532; min muted 4.88 light, 5.31 dark | GREEN: **confirmed**, at the page-muted ceiling (§3) |
| M-3 non-text | FAIL 237/266 | **PASS 266/266**: min perimeter 4.66 light, 3.69 dark (well edge); Dialog Close ring 4.66-5.10 light, 4.30-4.72 dark | PASS 266/266; min 4.30 light, 3.69 dark | GREEN: **confirmed**, Close included |
| M-4 dock register | FAIL 14/14 | **FAIL 14/14**: dock fg = muted `#7c6650` light, `#aca091` dark, ΔL_OK 0.000 | dock UNMEASURED (crash) | GREEN predicted, "may still read fg = muted" (S-9): **RED, by S-9** |
| M-5 live dock | FAIL 6/16 | **PASS 16/16**: getImageData 0, readPixels 0, every window | Chromium-only | GREEN: **confirmed** |
| M-6 separable ladder | FAIL 14/19 | **FAIL 16/19**: light adjacent ΔE 0.002-0.004; dark adjacent 0.005-0.014, page ΔE wash 0.015 … overlay 0.050 | FAIL, same pattern | RED both themes: **confirmed** |
| M-7 halos whole | FAIL 8/8 | **PASS 8/8**: every host reach = reference (18 px light, 17 px dark) | PASS (14 px) | GREEN: **confirmed** |
| M-8 chrome calm | FAIL 8/8 | **PASS 8/8**: stripes floating bleed 1.15 / C 0.0324, overlay 1.07 / 0.0302 (light); 1.19 / 0.0359, 1.09 / 0.0343 (dark); Dialog 1.04 / 0.0195. Dock (info row) RED: bleed 1.51-1.63, C 0.071-0.090 | FAIL 8/8 (no backdrop-filter headless: bleed 2.44-3.07) | GREEN: **confirmed** on the gated rows |
| **W-E ink ground** (this family's witness) | FAIL 229/360 | **FAIL 4/360**: every glyph-ring and indicator row GREEN. RED rows: overlay painted α 0.302 (> 0.30) in both themes, and the real Dialog α 0.682 light / 0.671 dark (scrim + plate) | FAIL 4/348, the same four | GREEN except the Dialog α leg: **confirmed, plus the overlay boundary** |
| W-C ink follows | FAIL 284/304 | PASS 304/304 (muted 5.02 light, 4.65 dark retune) | PASS | (another family's witness; reported) |
| W-A / W-B / W-D / W-F | FAIL | FAIL 20/197 · 16/24 · 5/9 · 66/152 | — | other families' witnesses; not this mechanism |

Logs: `P/out/caps/e-proto/results/<id>.log`; the run log is `P/battery.log`. The command was `D3_OUT=P/out node docs/tranches/BL/design/material/harness/run.mjs P/wt --label e-proto`.

## 1 · What the prototype implements

It starts from the research probe and completes it as a clean break (no aliases). Spec items are cited as `E.1` / `E.2`.

**Tokens (`tokens/glass.css`).**
- `--glass-veil-ink` is renamed to `--glass-veil-pole: var(--card)`, everywhere (src, tests, demo), with no alias.
- Base 0.20 and step 0.05. The dark base override and the dark pole are deleted (`dark-arm.css`).
- Blur 8/10/12/16/18 px. `--glass-saturate: 1.2`, plus the new `--glass-saturate-chrome: 0.6` on floating and overlay.
- New `--glass-ink-ground-width: 5px`.
- The well rung is the new `--glass-plate-well: color-mix(in srgb, var(--card) 30%, transparent)`, replacing `--input-on-glass`.
- The material-law header is rewritten, and the W-FROST "transmission through `saturate()`" clause is struck (E.1).

**The ink ground** is a new partial, `glass/ink-ground.css`, imported after the ladder:
- a `--card` `-webkit-text-stroke` with `paint-order: stroke fill` on the six rungs and `.glass-dock`;
- the icon ground (§2.1);
- a stroke reset on `background-clip: text` runs (`.gold-shimmer`, `.metal-*`) and on solid Badges;
- an icon reset on Badges and `.control-bit`;
- a forced-colours and print arm.

**Indicators.**
- `--ink-perimeter: 0.48` (an α) is replaced by `--perimeter-ink: color-mix(in oklab, var(--foreground) 60%, var(--card))`.
- It is threaded through the focus ring, the field edge, control-bit, glass-atom, overlay-plate, the card outline, sortable-list, Timeline and the destructive Button edge (the destructive edge uses the same 60/card mix at `--destructive`).
- Two-tone bands: the field control carries `inset 0 0 0 2px var(--card)` plus `0 0 0 2px var(--card)`. `.focus-ring` and the Dialog Close ring carry `box-shadow: 0 0 0 calc(var(--focus-ring-width) + 4px) var(--card)` under the outline. The Close ring was the S-12 hand literal, and it now reads the token.

**Deleted.**
- The sampler (`useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts`: 746 lines) and its unit test.
- `GlassDock`'s `backgroundCanvas` prop and the live observer. `backdropMode` stays (`live` = filtered, `static` = opaque).
- `--glass-backdrop-luma` (the `@property`), its knee, and the luma clamp in `@utility glass-plate`.
- The `--glass-backdrop` bucket (the token and every declaration: ladder, dock shell, StoryHero).
- Both `contrast-color()` blocks, and the dock's `--muted-foreground: var(--foreground)` self-engage.
- `contain: paint` on the content rungs.
- `tokens/on-glass-fg.css`: the whole on-glass table (`--on-glass-muted`, `--on-glass-muted-strong`, `--input-on-glass`, both arms) and the ladder's re-point blocks.
- The happy-dom `elementsFromPoint` stub in `tests/setup.ts`, which only the sampler needed.

**Demo.**
- `DockStage` loses its shared observer, `preserveDrawingBuffer` and the `backgroundCanvas` slot. Five dock stories drop `:background-canvas`.
- The glass-material story's "sampled observer" section becomes an ink-ground specimen over the same flipping dark/light canvas.
- The hljs comment crayon and the shadows stage repoint to page `-strong` inks.

**One component cure the spec did not name.** `SegmentedTabs`' inactive label is `muted + 12% capsule-warm`, and it computes **4.20:1** against the card in light (`tests/styles/contrast-computed.test.ts` A-1, measured before the cure). The retired on-glass `-strong` rung had been hiding this. The recipe now shifts `--muted-foreground-strong` instead, and A-1 passes.

**Tests rewritten to the new law** (the old assertions encoded the retired mechanism): `glass-subtlety` (ladder, radii, band saturates, pole, grasp rest), `proportion-register` (perimeter is an opaque ink), `token-hygiene`, `contrast-computed` (§3 control-bit, §8 A-1), `typed-track-seam`, `forms-seam`, `binary-triad`, `Button` (focus ring now writes a `box-shadow`; see break B-3), `dialog-room`, `Surface` (deep radii 9.75/11.75/13.75/19.5/23) and `GlassDock.backdrop-mode` (no sampler mock).

### 1.1 Build and test record

| step | command (in `P/wt`) | result |
|---|---|---|
| typecheck | `npm run typecheck` | exit 0 (`P/typecheck-final.log`). Before the library build it failed with two `TS2307 '@mkbabb/glass-ui/fourier-math'` errors, and HEAD fails identically without a `dist` (`P/typecheck-head.log`), so that is environmental |
| style + glass + dock + field unit set | `npx vitest run tests/styles tests/composables/glass tests/components/custom/dock tests/components/field tests/components/button tests/components/control-bit tests/gates` | 763 pass. The 4 failures also fail at HEAD (`boot-graph` ×3 needs `dist-demo`; `backdrop-prefix` needs `dist`, and it passes once the library is built) (`P/vitest-proto2.log`, `P/vitest-head.log`) |
| whole suite | `npx vitest run` | 2313 pass, 3 fail: the `boot-graph` build arm, environmental (`P/vitest-final.log`) |
| library build | `node P/build-lib.mjs P/wt P/libcache` | `glass-ui:ready`, 21.3 s (`P/lib-build.log`) |
| demo builds | `node P/build-demo.mjs <wt> <out>` | HEAD `P/demo-head/dist` (contains `--glass-backdrop-luma`); prototype `P/demo-proto/dist` (contains `--glass-ink-ground-width`, no luma) |

## 2 · New measurements this seat made

### 2.1 The icon ground without an SVG filter (a deviation from E.1, with the reason)

The spec ships `filter: url(#glass-ink-ground)` "once in the library's root". Two probes (`P/icon/`) rule that route out.

- **The filter must live in the document.** A data-URI filter reference works in Chromium but not in Playwright WebKit (0 card pixels against 144 for the in-document filter; `probe-filter.mjs`).
- **A missing filter degrades silently.** `filter: url(#nope)` renders the icon bare in both engines (60 of 60 icon pixels; `probe-missing.mjs`). The library has no root component to mount the filter, so a consumer that never mounted it would get bare icons with no signal. That is a masking fallback (E-2).

The prototype instead chains four zero-blur `drop-shadow()`s at ±2 px on each axis. Chained shadows compose a Minkowski sum, a 3×3 dilation of the icon's own alpha flooded with `--card`, resolved at the element with nothing mounted. Ring p05 on a lucide-shaped icon (a 1 px ring outside the stroke, `probe-icon.mjs`, `probe-icon4.mjs`):

| variant | Chromium light / dark | Playwright WebKit light / dark |
|---|---|---|
| bare | black 2.18, white 4.53, stripes 1.27 / black 6.67, white 1.63, stripes 1.17 | 2.01, 3.99, 1.22 / 5.69, 1.54, 1.17 |
| SVG `feMorphology` dilate 2.5 (in-document) | 4.27 on every ground / 4.37 | 3.76 / 3.73 |
| **4 × drop-shadow ±2 px** (shipped) | **4.27 / 4.37** | **3.81 / 3.74** |

The chain equals the SVG dilate to the hundredth in both engines. Both clear the non-text 3:1 floor everywhere. The ceiling is the stroke's antialiased core against the card, which is why it sits under text's 5.02. The harness carries no icons, so no witness reads this.

### 2.2 The `::selection` reset does not exist (a spec item that cannot be built)

`resets/probe-resets.mjs` and `probe-resets2.mjs` select a stroked run on a plate over black and count card-coloured pixels inside the selection box:

| rule under `::selection` | Chromium | Playwright WebKit |
|---|---|---|
| none | 7.5% | 30.4% |
| `-webkit-text-stroke-color: transparent` (E.1) | 7.5% | 30.4% |
| `-webkit-text-stroke: 0 transparent; -webkit-text-stroke-width: 0` | 7.5% | 30.4% |

Neither engine honours any text-stroke property inside `::selection`. The spec's reset would be a dead rule, so the prototype does not ship it, and the ink-ground header names selection as an open break (B-1). The forced-colours and print arm does take: the computed `-webkit-text-stroke-width` is `0px` under `emulateMedia({forcedColors:"active"})` and `{media:"print"}` in both engines.

### 2.3 Page muted clears the card without the on-glass table

Computed WCAG ratios against `--card`: muted 5.01 light and 5.43 dark; `-strong` 7.59 / 7.23; fg 16.19 / 11.17. The painted battery agrees: M-2 muted is 5.02 light and 5.44 dark in Chromium, flat across every ground. Spec E.1's "6.06 / 7.22" were the retired on-glass rung's ratios; with the table retired as E.1 also orders, the ceiling is 5.01 / 5.43. Playwright WebKit reads 4.88 light, so its glyph-raster margin (S-11) leaves 0.38 of headroom.

## 3 · Breaks, each recorded

| id | break | evidence | status |
|---|---|---|---|
| B-1 | **Selected text on glass is perforated by the ground**, in every consumer that styles `::selection` (value.js, fourier) and in the platform default | §2.2: no engine honours a stroke reset in `::selection` | open; no CSS cure exists |
| B-2 | **The sticker.** In light, every glyph on a plate over a saturated field reads as cream-outlined lettering. In dark, it reads as embossed brown-haloed type on the dock and the alert captions | `P/crops/material-light-aurora-dock.png`, `material-dark-aurora-dock.png`, `material-dark-aurora-specimens.png`; `P/pairs/pair-sidebar-430-light-aurora.png` | open; the family's central cost (D3-E §10 item 1) |
| B-3 | **Focus clobbers the capsule's material.** The two-tone ring's card band is a `box-shadow` on `.focus-ring:focus-visible`, which replaces a glass Button's rim and lift for as long as it holds focus. The prior law "focus mutates nothing" (`Button.test.ts` §5) is rewritten, not met | `src/styles/utilities/base.css` `.focus-ring:focus-visible` | open; CSS has one outline channel, so a card band can only ride `box-shadow` or a pseudo the capsule already spends |
| B-4 | **The dock loses its selection plate.** `--dock-control-active-bg` is `--glass-plate-floating` (a .25 card frost) on a .15 card-frost plate, so the active pill all but vanishes. Selection then reads only by ink (fg against muted) | `P/pairs/pair-dock-1440-light-aurora.png`, `P/crops/material-light-aurora-dock.png` | open; a D2 (selection register) matter |
| B-5 | **M-4 RED by S-9.** The specimen reads an inactive tab as "fg", and it paints page muted by design. fg = muted `#7c6650` / `#aca091` | `M-4.log` | open; the specimen or D2's register must move, not the material |
| B-6 | **W-E overlay α 0.302 > 0.30.** The spec's overlay = base + 2·step = 0.30 sits on W-E's cap, and paint rounds it 0.002 over | `W-E.log` "painted α" rows, both themes, both engines | open; either W-E's cap reads ≤ 0.30 + ε or the step shrinks |
| B-7 | **The real Dialog transmits its scrim.** Painted α 0.682 / 0.671 (W-E), composite `#b3b0ad` L 0.758 (M-1). Better than HEAD's `#746f66` L 0.544, still grey | `M-1.log`, `W-E.log`; `P/pairs/pair-dialog-1440-light-paper.png` | open (S-8); no plate edit reaches the scrim |
| B-8 | **M-6 RED by construction** (S-7 in light; dark page ΔE 0.015-0.050 against 0.05) | `M-6.log` | open; a battery conflict for the owner |
| B-9 | **Opaque escape 0.001 under M-1's floor** (S-6) | `M-1.log` | open; `--card` or the floor moves |
| B-10 | **Chrome greys over the field.** Floating at `saturate(0.6)` over the aurora reads beige beside the content rungs at 1.2, a visible material step between resting and floating | `P/pairs/pair-sidebar-430-light-aurora.png` (the `.glass-floating` row) | known price (D3-E §10 item 10) |
| B-11 | **The dock's own filters are unaddressed.** M-8 info rows put the dock at bleed 1.51-1.63 and C 0.071-0.090 | `M-8.log` | open, as the spec says ("not addressed by the research") |
| B-12 | **Surfaces outside the rung list carry no ground.** Standalone `.glass-capsule`, `.glass-chip`, `.feedback-tone` (Toast) and the `.glass-capsule-track` lose the on-glass `-strong` re-point and gain no stroke. SegmentedTabs was cured (§1); the others are unmeasured | `ink-ground.css` rung list | open; the list is the spec's |
| B-13 | **Emoji** are stroked in Chromium only; re-raster cost ×1.83 main-thread Paint and ×1.47 raster in Chromium (research numbers, `D3-E Q3`, `Q5`, not re-measured) | research | open |
| B-14 | **`music-staff` re-points `--glass-veil-pole` to a dark folio tone.** Its plate is no longer the colour of its ink ground, so the ground reads as a card-coloured halo there | `src/components/music-staff/styles.css:63` | unmeasured |

## 4 · Gestalt read (Chromium; 1440 and 430 wide, light and dark, over paper and the aurora)

Command: `node P/gestalt.mjs {head|proto} P/demo-{head|proto}/dist P/shots`, then `node P/pair.mjs` → `P/pairs/pair-<subject>-<width>-<theme>-<ground>.png` (40 pairs, HEAD left and prototype right), and 2× crops in `P/crops/`. Subjects: `/substrates/glass-material`, `/dock/overview`, a Dialog, a Popover, and the `/substrates/glass-panel` sidebar. 0 page errors in either build (`P/gestalt-{head,proto}.log`). Playwright WebKit gestalt is UNMEASURED, because every demo page mounts the shell dock, which crashes it. Real Safari is UNMEASURED (owner's safaridriver checkbox).

What the eye sees:
- **Plates over the aurora (light).** HEAD's plates darken and tint toward the field, and their muted captions sink into orange. The prototype's plates are a light cream frost that lets the field's hue through. Every glyph is legible, and every glyph wears a cream outline. At 14-16 px the outline reads as sticker lettering on saturated ground; on pale ground it is invisible (`pair-sidebar-430-light-aurora.png`).
- **Dark.** The ground is a dark-brown halo. It embosses the dock labels and the alert captions, legibly but heavily (`crops/material-dark-aurora-dock.png`, `…-specimens.png`). Over the near-black page it disappears (`pair-popover-430-dark-aurora.png` is near-identical to HEAD).
- **The dock.** Its plate reads as a cream stadium barely off paper, and the labels move from `contrast-color` black to page muted. The active pill is almost gone (B-4).
- **The Dialog over paper.** HEAD shows a smoke-brown slab. The prototype shows a pale grey-cream plate, with the scrim still greying it (B-7). The field well's two-tone edge reads as a double line: a light card band around a mid-brown ink.
- **The ink-ground specimen** (the new story section). The same card over a canvas flipping navy and amber keeps its muted caption readable in both states, with no sampler behind it.

## 5 · Engines

| fact | Chromium 149 | Playwright WebKit 26.5 | real Safari |
|---|---|---|---|
| M-2 muted min | 5.02 light / 5.44 dark | 4.88 / 5.31 | UNMEASURED (owner's safaridriver checkbox) |
| M-3 min | 4.66 / 3.69 | 4.30 / 3.69 | UNMEASURED |
| icon ground (drop-shadow chain) | 4.27 / 4.37 | 3.81 / 3.74 | UNMEASURED |
| `::selection` stroke reset | not honoured | not honoured | UNMEASURED |
| forced-colours / print reset | honoured (0px) | honoured (0px) | UNMEASURED |
| data-URI SVG filter | works | does not | UNMEASURED |
| chrome calm (M-8) | green | no backdrop-filter headless (bleed 2.44-3.07) | UNMEASURED |
| dock rows | measured | UNMEASURED (GlassDock crashes Playwright WebKit) | UNMEASURED |

## 6 · Open gaps

1. The sticker (B-2) remains the family's unresolved cost. Nothing in the patch changes it.
2. `::selection` perforation has no CSS cure in either engine (B-1).
3. B-3 (focus clobbers the capsule's material) and B-4 (the dock's active plate) are losses of engagement that D2 or a later pass must answer.
4. W-E's overlay boundary (B-6) and the Dialog scrim (B-7) keep this family's own witness RED on 4 rows.
5. M-4 needs the S-9 specimen question settled.
6. M-6 needs S-7 settled.
7. Consumer impact is carried from the spec, not re-measured. The value.js `.palettes-ramp-text` and `::selection`, and fourier's `::selection`, break. keyframes' `:background-canvas` binding becomes an inert fallthrough attribute.
8. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox), including hinting and GPU raster cost of the stroke.

## 7 · Commands and artefacts

`P = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-E-proto`

- Worktrees: `git worktree add --detach P/wt HEAD` and `P/wt-head HEAD`, with `node_modules` symlinked from the checkout; the research probe was applied, then completed. Both are removed at return.
- Battery: `D3_OUT=P/out node docs/tranches/BL/design/material/harness/run.mjs P/wt --label e-proto` → `P/battery.log`, `P/out/caps/e-proto/results/*.log`.
- Probes: `P/icon/probe-{filter,missing,icon,icon4}.mjs` (+ `.out`); `P/resets/probe-resets{,2}.mjs` (+ `.out`).
- Gestalt: `P/gestalt.mjs`, `P/pair.mjs`, `P/crop.mjs` → `P/shots/`, `P/pairs/`, `P/crops/`.
- Builds and tests: `P/build-lib.mjs`, `P/build-demo.mjs`, `P/spa.mjs` (tooling copied from D3-C's scratch); logs `P/{typecheck,typecheck-head,typecheck-final,vitest-proto,vitest-proto2,vitest-head,vitest-all,vitest-final,lib-build,demo-head,demo-proto}.log`.
- Patch: `git diff` in `P/wt`, plus `git diff --no-index /dev/null src/styles/glass/ink-ground.css` → `pass-1/D3-E-proto.patch` (applies to `4af44b36`, checked).
