# D3 · pass 1 · D3-E critique · the self-grounded ink

| field | value |
|---|---|
| seat | pass-1 adversarial CRITIC for family D3-E. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `e00fb901`. The prototype patch `pass-1/D3-E-proto.patch` applies cleanly (`git apply --check`) and lands 41 `src` files, +195 −1479 |
| engines | Chromium 149 and Playwright WebKit 26.5, headless, Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load averages 17-30 during the runs |
| scratch | `C = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-E-crit/`. Worktrees `C/wt` (the prototype), `C/wt-a`, `C/wt-b` (plants), `C/wt-c` (no plate), all removed at return. Battery outputs are in `C/out0`, `C/outa`, `C/outb`, `C/outb2`, `C/outc`, with run logs `C/run{0,a,b,b2,c}.log`. Probes are in `C/probe/` |
| verdict | **RETIRE** the glyph ground as the family's centre. Harvest four parts (§7). Convergence **40%** |

## 0 · Step 1: the failures I expected a material design to hide (written before reading the spec or prototype)

I read `PORTFOLIO.md` §0-§2 and §7 and `harness/HARNESS.md` first. From those alone, these are the failures I expected a legibility-at-the-glyph family to hide:

1. **The gate measures the ink against its own ground.** M-2 and W-E read a 1 px ring outside the glyph. A stroke wider than 2 px paints that ring. The gate then reads ink against stroke, a token pair, and says nothing about the plate or the scene.
2. **The plate becomes decorative.** If the glyph carries its own ground, no text witness depends on the veil. A dead or absent plate would pass M-2, M-1 (paper through nothing reads as paper) and W-E's α cap, which is a ceiling and not a floor.
3. **The sticker.** A ground wide enough to own the ring reads as outlined lettering over any contrasting field, and more so in dark over a bright field.
4. **`-webkit-text-stroke` is inherited.** Every descendant of a rung gets it: nested solid controls, consumer text, `background-clip: text`, inputs, emoji, `::selection`.
5. **Icons and non-text are outside text stroke.** SVG needs a second mechanism, and a filter referenced by id can fail silently.
6. **Dark separation is untouched.** A thin `--card` frost in dark sits near the page (M-6).
7. **Chrome calm has to come from somewhere.** A thin veil leaves M-8's chroma half to the filter.
8. **Two colours stand for one fact.** The glyph ground and the plate pole can drift apart when a component re-points one of them.

Every one of these was later observed (§2 to §5).

## 1 · Reproduction (my own run)

Command: `D3_OUT=C/out0 node docs/tranches/BL/design/material/harness/run.mjs C/wt --label e-crit`, both engines. Logs are at `C/out0/caps/e-crit/results/<id>.log`.

| witness | prototype claim | my run (Chromium gate) | Playwright WebKit [info] |
|---|---|---|---|
| M-1 | FAIL 2/11 | FAIL 2/11: opaque `#fdf5ec` L 0.974 (S-6); Dialog `#b3b0ad` L 0.758, ΔE 0.227 (S-8). Plates L 0.981, ΔE 0.005 | same two rows |
| M-2 | PASS 560 | PASS 560. **Muted reads 5.02 in light and 5.44 in dark on every plate, every ground and every level, flat to the hundredth.** fg reads 16.20 / 11.21. The dock's "fg" row reads 5.02 (it is muted) | PASS; muted 4.88-4.95 |
| M-3 | PASS 266 | PASS 266 | PASS; dark stripes perimeter 3.69 |
| M-4 | FAIL 14/14 | FAIL 14/14 | dock UNMEASURED (GlassDock crashes Playwright WebKit) |
| M-5 | PASS 16 | PASS 16 (0 readbacks) | Chromium-only |
| M-6 | FAIL 16/19 | FAIL 16/19 | — |
| M-7 | PASS 8 | PASS 8 | — |
| M-8 | PASS 8 | PASS 8: floating 1.15 / C 0.0324, overlay 1.07 / 0.0302 (light); 1.19 / 0.0359, 1.09 / 0.0343 (dark). The dock info row fails: 1.51 / 0.0708 in light, 1.63 / 0.0901 in dark | FAIL 8/8: paints no backdrop-filter, bleed 2.44-3.07 |
| W-C | PASS 304 | PASS 304 | — |
| W-E | FAIL 4/360 | FAIL 4/360: overlay painted α 0.302 in both themes; Dialog 0.682 / 0.671 | the same four rows |

The prototype's table reproduces exactly.

## 2 · Every claimed-green witness catches a planted violation

Each plant runs in its own worktree on top of the patch. Chromium was the gate (`--engines chromium`).

| plant | worktree edit | witness hit | measured |
|---|---|---|---|
| A1 | `--glass-ink-ground-width: 0px` | **M-2** FAIL 234/560; **W-E** FAIL 139/360; W-C FAIL 216/304 | light over black: fg 1.01, muted 1.63, dock fg 2.82. Dark over white: fg 1.03, muted 1.40. W-E light black muted 1.02-3.25 |
| A2 | `contain: paint` restored on wash/quiet/resting/card | **M-7** FAIL 8/8 | reference reach 18 px (light) / 17 px (dark); every host 2 px |
| A3 | a per-frame `getImageData` loop at module scope in `GlassDock.vue` | **M-5** FAIL 16/16 | getImageData 1073-1083 per 9 s window |
| B1 | `--perimeter-ink` foreground 60% → 30% | **M-3** FAIL 266/266; **W-E** FAIL 174/360 | light paper perimeter 2.08, Dialog Close ring 1.99 |
| B2 | `--glass-saturate-chrome: 1.5` | **M-8** FAIL 8/8 | light stripes floating C 0.0790, overlay 0.0728 |
| B3 | light `--neutral-5` → `hsl(30 22% 24%)` at `tokens/light-dark.css:98` | **W-C** FAIL 152/304 | light paper muted 9.68, 0/18 inside [4.5, 5.5] |

B3 first missed. I planted it at `tokens/color-radius.css:45` and M-2 still read 5.02 (`C/outb`). The muted ink is declared twice: `color-radius.css:45` and `light-dark.css:98` (`light-dark(hsl(30 22% 40%), …)`), and the second one wins. This predates D3-E and is present at HEAD. It is a P-3 defect, and the family leans on it because its whole contrast claim is "muted/card, fixed in tokens" (§5 G-10).

So no witness is dead code: each goes red on a planted violation of its own invariant. The problem is what the green readings mean, which the next section shows.

## 3 · The checklist

### 3.1 Vacuous convergence: CONFIRMED, the central finding

**Counterexample N (no plate).** `C/wt-c` sets `--glass-veil-base: 0; --glass-veil-step: 0`, which leaves no veil on any rung. Run with `D3_OUT=C/outc … --label noplate`:

| witness | no plate at all | prototype |
|---|---|---|
| M-2 | **PASS 560/560**; muted 5.02 / 5.44 over aurora, black and white | PASS 560 |
| M-3 | **PASS 266/266** | PASS |
| M-1 | every plate **PASS** (`#fbfaf8`, ΔE 0.000-0.001); fails only the escape and the Dialog | same two rows |
| W-E | **FAIL 2/360**, and only the Dialog α (0.502, which is the scrim alone) | FAIL 4/360 |
| M-8 | FAIL 6/8, at C **0.0412** against 0.04 | PASS |
| M-6 | FAIL 18/19 | FAIL 16/19 |

Remove the glass entirely and the family's own witness improves: 2 red rows against the prototype's 4. The text battery cannot tell the material from no material. The plate earns two things in this family:
- 0.0012 of chroma under M-8 (0.0412 → 0.0324); `saturate(0.6)` does the rest;
- a few hundredths of dark separation that still fails M-6.

**Why: the stroke width was sized to the instrument.** `D3-E.md` §0.1 says so: "the ring sits about 1.25-1.75 px outside the glyph outline … so a centred stroke needs 5 px". My sweep (`C/probe/ringR.mjs`) runs the harness's own `glyphRing` at Chebyshev radius R on the reproduction captures. Min p05 is shown as fg / muted:

| cell | R 1 (the gate) | R 2 | R 3 | R 5 |
|---|---|---|---|---|
| light aurora | 16.20 / 5.02 | 8.50 / **2.86** | 5.34 / **1.66** | 5.34 / 1.66 |
| light black | 16.20 / 5.02 | **4.17 / 1.92** | **1.01 / 1.24** | 1.01 / 1.38 |
| light checker | 16.20 / 5.02 | 9.04 / **3.03** | 5.13 / **1.61** | 5.13 / 1.59 |
| dark aurora | 11.21 / 5.44 | **3.05 / 1.66** | **2.19 / 1.06** | 2.19 / 1.06 |
| dark white | 11.21 / 5.44 | **1.56 / 1.25** | 1.03 / 1.04 | 1.03 / 1.04 |
| dark stripes | 11.21 / 5.44 | **3.31 / 2.29** | 1.93 / 1.15 | 1.74 / 1.06 |
| light / dark paper, light white, dark black | pass at every R | | | |

One pixel wider and M-2 goes red on every non-trivial ground. The portfolio's own baseline (§1, "3 px glyph ring") would have read this family RED. The gate measures `--muted-foreground` against `--card`, a token pair that `ink-ground.css`'s header already states (5.01 / 5.43). The prototype's "M-2 GREEN" is therefore the header comment rendered, not a legibility result.

Whether the word reads, meaning whether the sticker silhouette separates from the scene and whether 12 px glyph grounds fuse into lozenges (research §1), is measured by no witness.

### 3.2 Spec-cites-itself circularity: CONFIRMED

The chain runs like this:
1. W-E was written for this family (`PORTFOLIO` §7).
2. The research sized the stroke to W-E's ring (§0.1).
3. The spec adopts "5 px is the witness's number" (`SPECS` E.1).
4. The prototype reports W-E green on every glyph row.

The witness defines the design, and the design passes the witness. S-11's engine margin argument is the same circle: 4.88 in Playwright WebKit is the token pair raster-shifted, not a ground read. No external legibility reference (a reading-speed proxy, a word-silhouette metric, the owner's glance) enters the loop. The one external read, the owner's word "sticker" (`D3-E` §10.1), goes against the family.

### 3.3 Gates that cannot fail: PARTLY CONFIRMED

Every M witness does fail on a planted violation (§2), so none is dead. But for this family, in this form:
- M-2 and W-E leg 1 cannot fail on any change to the plate, the blur, the saturate or the ground. They fail only on the stroke width or the ink/card pair.
- M-1 cannot fail on a plate thinner than the prototype's, since "no plate" is its best score.
- W-E leg 2 (α ≤ 0.30) is a ceiling, and 0 passes it.

Together these make the battery unable to see the material in this family. The fix belongs to the battery, not the family (§6).

### 3.4 The elegant-reduction trap: CONFIRMED

The spec presents "one inherited declaration". The prototype needed these extra pieces, and each is a place where "and then the hard part" hides:
- a second mechanism for icons (the 4× `drop-shadow` chain);
- resets for clip-text (`.gold-shimmer`, `.metal-*`), Badges, `.control-bit` icons, forced colours and print;
- a component cure (SegmentedTabs) that the retired on-glass table had been masking;
- a `::selection` reset that **cannot be built**: neither engine honours stroke properties in `::selection` (proto §2.2);
- the spec-named resets for primary Button and the active tab, which are **not shipped**.

**Census counterexample.** `C/probe/census.mjs` reads the prototype's built demo (`D3-E-proto/demo-proto/dist`, Chromium, DPR 2, 16 routes, both themes). It finds text on opaque nested hosts that still carries the 5 px card stroke:
- `/display/buttons`: 3 per theme (glass-capsule Buttons, "Keyboard command", "Suppressed");
- `/feedback/toast`: 1;
- `/navigation/tabs`: 29 (the tab wells, `rgb(202,166,130)` in light, `rgb(91,71,59)` in dark);
- `/forms/inputs`: 29 inputs with typed text and placeholder stroked at 5 px (`C/probe/census/census.json`).

The stroke colour is the card, not the host's fill, so these read as a cream or brown outline on a tan or dark chip. Inheritance is the family's leverage and also its blast radius. Every consumer component that paints its own ground inside a plate needs a reset the library cannot enumerate, E.2 counts none of them, and X.md's "0 `text-shadow` collisions" census does not cover them.

### 3.5 Legacy aliases, shims or dual paths: MINOR, three found

1. **Two colours for one fact.** The plate reads `--glass-veil-pole` (`veil.css:51`, `sheet/styles.css:216,226`), while the glyph ground reads `--card` directly (`ink-ground.css:37`). The token comment claims "plate and glyph ground are one colour", but `music-staff/styles.css:63` re-points the pole to a dark folio tone, and there the two diverge (proto B-14). One source of record would have the ground read the pole, or delete the pole and read `--card`. As shipped, `--glass-veil-pole: var(--card)` is an alias in all but name.
2. **A name kept past its meaning.** `backdropMode: "live" | "static"` survives with "live" meaning "filtered". The live observer it named is deleted.
3. **A fallthrough attribute.** keyframes' `:background-canvas` binding (`ChromeDock.vue:370`) becomes an inert DOM attribute, a silent no-op until the E-6 addendum lands. The prototype names this (§6.7), and it is acceptable only because the addendum is owed.

The duplicate `--neutral-5` (§2 B3) is pre-existing, not introduced here.

### 3.6 Masked fallbacks: CONFIRMED in kind

The icon route is honest. The prototype rejected `filter: url(#…)` because a missing mount renders bare icons silently, and the drop-shadow chain resolves at the element.

The larger mask is structural. The ink ground keeps text green whether or not the plate paints. Headless Playwright WebKit paints no `backdrop-filter` at all, yet M-2 passes 532/532 there. Counterexample N shows the same with no veil. By E-2's shape, a primary (the frost) can be dead while the stroke paints a legible result, and the battery reports PASS. The family's answer, that the stroke *is* the primary, concedes that the glass carries no legibility role, which is §3.1 again.

### 3.7 Unverified gestalt: I looked, and it fails in dark and over fields

I read `D3-E-proto/pairs/pair-{material-1440-light-aurora, dialog-1440-light-paper, sidebar-430-dark-aurora, popover-1440-light-aurora, dock-1440-dark-aurora}.png` and `crops/material-{light-aurora-dock, dark-aurora-specimens}.png`. My own captures are `C/probe/census/{light,dark}_compositions_settings.png` and `light_display_buttons.png` at DPR 2.

- **Light glass over paper reads as a light frost, not grey: YES.** Settings, Buttons and Popover show cream plates barely off paper, and the stroke is invisible on pale ground. This is the family's real gain, and it comes from the `--card` pole, not from the ink ground. M-1 plates read ΔE 0.002-0.005.
- **Dark glass separates from the page: NO.** In `dark_compositions_settings.png` the Account and Appearance cards are near-invisible outlines on `#0b0a09`, and M-6 reads page ΔE 0.015-0.050.
- **The ink reads as material: NO.**
  - Dark over the aurora (`pair-sidebar-430-dark-aurora.png`), every caption is dark-brown-outlined meme type: "~0.50α — the calm body rung" reads as an embossed decal.
  - At DPR 2 on the near-black page (`dark_compositions_settings.png`), muted captions and dock labels carry a visible brown fringe where the ground contributes nothing to contrast.
  - Light over the aurora (`crops/material-light-aurora-dock.png`), dock labels are pale muted with cream outlines, weaker than HEAD's black.
- **The floating rung in dark is a beige slab.** Floating at `saturate(0.6)` over the aurora reads as a mud-grey plate beside the chromatic content rungs (`pair-sidebar-430-dark-aurora.png`). That is a visible material break at the chrome band (B-10).
- **Engagement is lost.**
  - The dock's active label in dark (`pair-dock-1440-dark-aurora.png`, "Overview") drops from white to embossed grey.
  - The active pill all but vanishes (B-4).
  - A focused glass Button loses its rim and lift (B-3).

  These are D-2 losses.
- **iOS-27 grade: NO.** Apple's vibrancy achieves legibility through the material (blur plus a luminosity or vibrancy blend) and never outlines glyphs. Stroked lettering is the register of video subtitles and meme captions.

Playwright WebKit gestalt is UNMEASURED because every demo page mounts GlassDock. Real Safari is UNMEASURED (owner's safaridriver checkbox).

### 3.8 Consumer-less substrate: NOT FOUND

Every added token has a reader:
- `--glass-ink-ground-width` is read by `ink-ground.css`;
- `--glass-saturate-chrome` by the floating and overlay blurs;
- `--perimeter-ink` by 10+ sites;
- `--glass-plate-well` by the field.

The deletions remove real dead weight: the 746-line sampler (S-13), the luma bucket and both `contrast-color()` blocks.

## 4 · Named counterexamples (summary)

| id | counterexample | evidence |
|---|---|---|
| N | no plate at all passes M-1 (plates), M-2, M-3, and W-E except the scrim | `C/outc/caps/noplate/results/*.log` |
| R2 | the prototype at ring R 2: muted 1.25-3.03 on aurora, black, checker, white (dark) and stripes | `C/probe/ringR.mjs` over `C/out0` |
| B3 | the muted ink has two declarations, and the tokens' "fixed contrast" rides the one at `light-dark.css:98` | `C/outb` versus `C/outb2` |
| K | 33 text runs per theme on opaque nested hosts carry the card stroke on 3 demo routes, plus 29 inputs | `C/probe/census/census.json` |
| S | `::selection` perforation has no CSS cure in either engine | proto §2.2 (not re-run) |
| M | `music-staff` re-points the pole and not the ground | `src/components/music-staff/styles.css:63` in the patched tree |
| G | dark over the field reads as meme lettering; dark plates do not separate | the PNGs cited in §3.7 |

## 5 · Open gaps (the exact list)

1. **G-1 · The sticker.** No width is both material and green (research §1). The owner-facing gestalt fails in dark and over fields. Unresolved by design.
2. **G-2 · Vacuity.** The text battery cannot see the material in this family (counterexample N, the R2 sweep). No witness reads word legibility beyond the stroke.
3. **G-3 · `::selection`** perforation has no cure (B-1).
4. **G-4 · Nested solid hosts** carry the card stroke. The spec-named primary Button and active-tab resets are not shipped (census K).
5. **G-5 · M-4** is RED (S-9), and the dock labels are demoted to muted.
6. **G-6 · M-6** is RED in both themes, and the dark ladder does not exist in paint (S-7).
7. **G-7 · W-E** is RED on 4 rows: overlay 0.302 against the 0.30 cap (B-6), and the Dialog scrim at 0.682 / 0.671 (S-8, B-7).
8. **G-8 · M-1 escape** misses by 0.001 (S-6).
9. **G-9 · Engagement losses:** focus clobbers the capsule (B-3) and the dock's active pill vanishes (B-4).
10. **G-10 · Two sources:** ground versus pole (M), and the duplicate `--neutral-5` declaration (B3).
11. **G-11 · The dock's own filters** are unaddressed (M-8 info: bleed 1.51-1.63, C 0.071-0.090).
12. **G-12 · Chrome greys** at `saturate(0.6)` over the field (B-10).
13. **G-13 · Engines:** emoji are stroked in Chromium only, and re-raster costs Paint ×1.83 (research, not re-run). Real Safari is UNMEASURED (owner's safaridriver checkbox) for every cell, including hinting and GPU raster.

**Convergence: 40%.** The deletions, the M-5/M-7/M-8/M-3 greens, the light frost and the icon route are real, but they are either the common floor or not specific to this family. The centre (G-1, G-2) is open with no route to closing it.

## 6 · Hardening the battery (for the owner, not this family)

- **Read M-2 at R 1 and R 3, and gate on both.** A ground that ends at the gate's radius then shows up.
- **Add a floor to W-E leg 2 and to M-1.** Otherwise "no material" is the best score.
- **Give the battery a gestalt witness,** or an owner-glance gate for decal grounds. The sticker is visible and unmeasured.
- **Strike the duplicate `--neutral-5`.** One declaration, per P-3.

## 7 · Verdict: RETIRE

The family's centre, legibility bought at the glyph, is refuted on three counts:
- **Its green is the instrument's geometry.** One pixel past the stroke the ring reads 1.04-3.03, and a plate-free build scores better on the family's own witness.
- **Its only green-passing width is the look the owner already rejected** ("sticker lettering"), confirmed here in dark over fields and on the dark page at DPR 2.
- **Its mechanism is an inherited paint with an open-ended reset list,** one entry of which (`::selection`) cannot exist.

This is not BLOCK, because no missing primitive would change the outcome. It is not BANK, because nothing would make the glyph stroke read as material. The research measured every width from 1 to 6 px and every halo stack.

**Harvest** (each already shared, or re-usable by another family):
1. the `--card` pole frost that cures light grey (M-1 plates ΔE 0.002-0.005), which is D3-A's ground;
2. `saturate(0.6)` at blur ≥ 16 px for M-8's chroma half (S-15);
3. the opaque `--perimeter-ink` and the card band on the Dialog Close (M-3 266/266, the S-12 literal retired);
4. the 4× `drop-shadow` icon dilation, which resolves at the element with nothing mounted (4.27 / 4.37 in Chromium, 3.81 / 3.74 in Playwright WebKit), if any family needs an icon ground.

The sampler deletion, the `contain: paint` removal and the `contrast-color()` removal are the common floor.

## 8 · Commands

- Worktrees: `git worktree add --detach C/wt{,-a,-b,-c} HEAD`, with `node_modules` symlinked, then `git apply pass-1/D3-E-proto.patch`. The plants are recorded in §2.
- Battery runs:
  - `D3_OUT=C/out0 node harness/run.mjs C/wt --label e-crit`
  - `D3_OUT=C/outa … C/wt-a --label plant-a --engines chromium`
  - `D3_OUT=C/outb … C/wt-b --label plant-b --engines chromium`
  - `D3_OUT=C/outb2 … C/wt-b --label plant-b2 --engines chromium`
  - `D3_OUT=C/outc … C/wt-c --label noplate --engines chromium`
- Probes:
  - `node C/probe/ringR.mjs <capdir>` (the ring-radius sweep);
  - `node C/probe/census.mjs D3-E-proto/demo-proto/dist C/probe/census` (stroked text on opaque nested hosts);
  - `node C/probe/ungrounded.mjs D3-E-proto/demo-proto/dist` (glass hosts without a ground: only opaque-filled capsule Buttons, so nothing is lost there).
