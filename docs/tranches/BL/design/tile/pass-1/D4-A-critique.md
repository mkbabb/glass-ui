# D4 · pass 1 · D4-A · critique

| field | value |
|---|---|
| seat | D4 pass 1, adversarial critic for D4-A (the corner reads the box). I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | checkout `4a95b5b8`. `git diff --stat 99839631 HEAD -- src` is empty, so the patch's base still holds. `git apply --check` passes for the checked-in `D4-A-proto.patch`. It differs from the scratch `D4-A-proto.final.patch` only in its blank context lines (checked: `diff` with those lines normalised is empty). The prototype's §8 calls the two "identical", which is true only after that normalisation |
| read | PORTFOLIO §0-§2 and §7, `harness/HARNESS.md` (step 1, before the family). Then SPECS D4-A and SHARED FACTS, `D4-A.md`, `D4-A-proto.md` and `D4-A-proto.patch` |
| instruments | Worktree `…/scratchpad/D4/p1/D4-A-crit/wt` at `4a95b5b8` with the patch applied, `node_modules` symlinked; removed with `git worktree remove --force`. The banked harness was run unmodified from the checkout. A scratch copy `hw/` differs from it in two lines only: the SF-20 `@source "${wt}/src/components/**/*Variants.ts"` and an absolute `REPO`. Six planted-violation builds. One scratch probe, `crit.mjs`, imports the harness's `lib.mjs` and `measure.mjs` read-only |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| load | load average 42-57. Every number below is a settled static read or a real input event; none is a wall-clock timing |
| checkout writes | this file only. One disclosure: running vitest from the worktree, Vite's config loader wrote a temp config bundle into the symlinked `glass-ui/node_modules/.vite-temp/` and deleted it (the directory is empty afterwards, mtime 15:54). No other path in the checkout was touched, and I ran no further vitest |

Scratch root for every path below: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-A-crit/`.

## 0 · Verdict

**BANK, at 45 % convergence.**

A1 is a sound, small, pure-CSS rule for a *control that wraps*: Button, the pill Chip and the disclosure trigger. It also turns the `wrap` scene, T-1, T-2 and T-8 green in both engines, and I reproduced every one of those cells.

As the answer to O-58, a card-like selectable multi-line tile, it is dominated:

- On a coarse pointer it paints the owner's lozenge again: 30 px on the 61.58 px preset tile, 0.97 of h/2.
- It reaches its green T-1 by rewriting the canon row that PORTFOLIO §0 calls already ruled.
- The witness that should catch the first point cannot, because its naming half is tautological under A1 (§3.1).
- Its selected-state floor never reaches the owner's shipped scene. The consumer's own `border-color: transparent` erases it (§3.4).

Re-trigger: the owner amends `DESIGN.md:385-386` to accept rung/2, 30 px on coarse, for multi-line tiles. Otherwise, A1 comes back as the control-wrap law under whichever tile family wins, since it composes with D4-B and D4-D rather than competing with them.

## 1 · Step 1: failures I expected a tile design to hide (written before reading the family)

| # | expected hidden failure | outcome for D4-A |
|---|---|---|
| E1 | The corner rule passes at the one pointer class the battery runs (fine) and fails the owner's complaint on another (coarse, `--ui-scale`) | **Confirmed** (§3.2): coarse 30 px, ÷h/2 0.97 |
| E2 | "Equals a named role" is satisfiable by renaming the role, so the green comes from the canon edit, not the paint | **Confirmed** (§3.1): T-1 reads `--radius-control` through a probe child that inherits the rung, and passes a planted lozenge |
| E3 | The selected carrier passes T-3's 1 px band rule by a thin margin, and the shipped consumer composition erases it | **Confirmed** (§3.4): margin +20 % (322.5 against 269 px²), and preset-verbatim 0.00 px² |
| E4 | A token redefined as a formula inherits into descendants or kills a consumer's override | **Confirmed**: B-2 leak reproduced, plus a new silent-override counterexample (§3.3) |
| E5 | The fallback for a missing input paints the old defect silently (E-2) | **Confirmed** (§3.3): delete the universal rule and T-2 stays green while every holder paints the HEAD stadium |
| E6 | Engagement untouched: T-6 passes a colour fade as a "commit" | **Confirmed**: T-6 17/24 · 9/14, commit a 180 ms bezier colour fade |
| E7 | Witness coverage narrower than the claim ("every holder") | **Confirmed**: W-A runs 3 of the 5 composers. CollapsibleTrigger has no rung |
| E8 | Validity and selection collide on one channel | **Confirmed**: B-3 reproduced, 4/4 items `rgb(219, 36, 36)` |

## 2 · Re-run: the prototype's claims, cell for cell

`node harness/run.mjs --build out/builds/final --out out --webkit` from the checkout (`logs/battery-final.log`). Cells read Chromium · Playwright WebKit.

| witness | prototype claims | my run | agree |
|---|---|---|---|
| T-1 | 8/8 · 8/8 | PASS 8/8 · 8/8 | yes |
| T-2 | 12/12 · 12/12 | PASS 12/12 · 12/12 | yes |
| T-3 | 8/15 · 8/15 | FAIL 8/15 · 8/15. Preset light/dark/PRT: bands 322.5 / 338 / 322.5 px² against 269 (Playwright WebKit 413 / 426.5 / 411). Specimen: 389 / 406.75 / 389 against 250 (Playwright WebKit 426 / 441.5 / 427.5). Fill 1.21 / 1.22 / 1.00 | yes |
| T-4 | 8/20 · 8/20 | FAIL 8/20 · 8/20 | yes |
| T-5 | 19/38 | FAIL 19/38 | yes |
| T-6 | 17/24 · 9/14 | FAIL 17/24 · 9/14 | yes |
| T-7 | 4/12 | FAIL 4/12 | yes |
| T-8 | 16/16, Safari UNMEASURED | PASS 16/16, 1 unmeasured | yes |
| W-A | 2/3 · 2/3 banked; 3/3 · 3/3 widened | 2/3 · 2/3 banked; **3/3 · 3/3** on `hw/` (`logs/battery-finalw.log`; T-1 there is also 8/8 · 8/8) | yes |
| W-B · W-C · W-D · W-E | 7/13 · 0/7 · 0/4 · 0/6 | 7/13 · 0/7 · 0/4 · 0/6 | yes |

Units (`logs/vitest-affected.log`), with the same six paths as the prototype and the cache dir in the worktree: 30 files passed, 1 failed, 2 skipped; 518 passed, 5 expected-fail, 7 skipped, 1 failed. The failure is `backdrop-prefix-normalization.test.ts` "dist/ is absent — run `npm run build` first". That is build order, not the patch, and it matches the prototype's note. I did not re-run the full suite, typecheck or the library build.

## 3 · Plants and the checklist

### 3.1 Planted violations: does each witness the prototype claims green catch its violation?

Each plant is one edit to the patched worktree, rebuilt with the banked `build.mjs` (`logs/plants.log`, `out/runs/p-*/`). I checked each edit in the emitted CSS before running.

| plant | edit | T-1 | T-2 | T-3 | T-8 | W-A | caught? |
|---|---|---|---|---|---|---|---|
| `p-noedge` | delete the on-state `border-color: var(--foreground)` | | | FAIL 2/15 · 2/15 (every tile band 0.00 px²) | FAIL 4/16 | | yes |
| `p-edge48` | edge at `--ink-perimeter` 48 % | | | FAIL 4/15 · 4/15 (light and PRT 0.00 px²; dark 286.5 passes) | | | yes, and it reproduces SF-4 |
| `p-norung` | delete the item's `--control-rung` | FAIL 5/8 · 5/8 | | | | FAIL 1/3 · 1/3 | yes |
| `p-runghalf` | rung × 0.5 | | FAIL 4/12 · 4/12 | | | FAIL 1/3 · 1/3 | yes |
| `p-nouniv` | delete the `:where(*)` rule | FAIL 3/8 · 3/8 | **PASS 12/12 · 12/12** | | | FAIL 0/3 · 0/3 | yes, by T-1 and W-A only |
| `p-rung15` | rung × 1.5: the coarse lozenge at fine pointer | **FAIL 7/8 · 7/8, and the preset and specimen cells PASS** | PASS 12/12 · 12/12 | | | FAIL 1/3 · 1/3 | only through the `wrap` scene |

The `p-rung15` T-1 lines, verbatim (Chromium; Playwright WebKit the same):

```
PASS preset #0 toggle-group-item rung 40.0 · 208.00×61.58 30px→30.00 (÷h/2 0.97) | … 81.75 30px→30.00 | … 101.92 30px→30.00 · named --radius-control, flat true
PASS specimen #0 toggle-group-item rung 36.0 · 150.53×100.16 27px→27.00 (÷h/2 0.54) | … · named --radius-control, flat true
FAIL wrap #0 ToggleGroupItem … 110.00×47.89 30px→23.95 (÷h/2 1.00) | 110.00×78.48 30px→30.00 · named --radius-dock-card, flat false
```

On the tile scenes the planted lozenge passes T-1. It is caught only because the `wrap` scene's two-line ToggleGroupItem is shorter than 2 × 30 and so still tracks its content.

### 3.2 Gates that cannot fail

**T-1's naming half cannot fail under A1.** `lib.mjs:230-239` names a role by appending a probe child to the item and reading `var(--radius-control)` there. Under A1 that child re-declares `--radius-control: calc(var(--control-rung) / 2)` (`:where(*)`) and inherits the item's rung. So "equals a named role" holds for whatever rung a holder publishes. T-1 therefore reduces to "flat past the rung", and a flat 0.97 lozenge passes it (`p-rung15` above).

**No witness runs a coarse or `--ui-scale` corner.** My probe runs T-1's own `cornerStory` and `judgeT1` under `hasTouch` (`crit.mjs`, `logs/crit-final.log`, both engines identical):

| scene | fine | coarse (modeOk) |
|---|---|---|
| preset | rung 40 · 20 px at 61.58 (÷h/2 0.65), flat to 101.92 · T-1 judge PASS | **rung 60 · 30 px at 61.58 (÷h/2 0.97)**, flat · **T-1 judge PASS** |
| specimen | rung 36 · 18 px at 100.16 (0.36) · PASS | rung 54 · 27 px at 100.16 (0.54) · PASS |

The one cell that decides the family, the owner's preset tile on touch, is green by the witness and a lozenge by eye (§4).

**T-3's carrier bar is met with a +20 % margin** (322.5 against 269 px²). That margin is a 1 px border at DSF 2. The gate is honest (`p-noedge` and `p-edge48` fail it), but the band rule decides "separates" on 1 px of paint.

### 3.3 Masked fallbacks, aliases, shims and dual paths

- **Dead primary, stadium fallback (E-2).** `:root { --control-rung: calc(var(--radius-pill) * 2) }` is the "no rung" sentinel. If the per-element rule is absent (`p-nouniv`), every holder, Button included, silently paints the HEAD stadium. T-2 stays 12/12, and nothing logs. The same fallback covers a holder that forgets its rung: `p-norung` paints 30.79 → 50.96 on the preset, i.e. HEAD. At HEAD, Button's law (`calc(var(--button-size) / 2)`) had no such dependency. The patch moves Button onto the shared rule, so Button's wrap law now dies with the universal rule. D4-A's own C-1 says "the literal A1 paints squares … E-2's loud failure". With the root rung added, that loud failure is gone, and the failure is now the old defect, silently.
- **A live composer with no rung: CollapsibleTrigger.** `CollapsibleTrigger.vue:38` renders `.disclosure-trigger` only. `.disclosure-trigger { border-radius: var(--radius-control) }` (`disclosure.css:41`), and only `.disclosure-group-trigger` (Accordion) publishes a rung (`:62`). A wrapped CollapsibleTrigger, whose focus ring follows its corner, keeps tracking content. W-A's `wrap` scene has no disclosure trigger, so no witness sees it. C-3 names it; it is still open and unwitnessed.
- **A consumer's theme override is now a silent no-op** (new). A `:root { --radius-control: 12px }` rule reads `12px` on the root, `20px` on a ToggleGroupItem and `9999px` on a bare reader. The universal rule re-declares the role on every descendant, so the override reaches nothing below `:root`. Measured the same in both engines (`crit.json`, `rootOverride`). SPECS A.2 notes this in one clause ("overridden per element"). No consumer does it today, but it is the E-11 silent-binding class.
- **The rung inherits (B-2), reproduced.** An 80×60 `border-radius: var(--radius-control)` box reads `9999px` under `body` and `20px` inside a ToggleGroupItem, in both engines.
- **Validity and selection share the border (B-3), reproduced.** With `data-invalid` on the group, the four items read `rgb(219, 36, 36)` ×4 in both engines. The selected tile falls back to the 1.2:1 fill.
- **Duplicated formula.** `calc(var(--control-rung) / 2)` is written twice in `radius.css`: `@theme static`, to keep the `rounded-control` utility, and `:where(*)`. This is a P-3 smell, but it is load-bearing (SF-2), so I record it and don't count it as a gap.
- **Stale cite.** `utilities/components.css:17` still says `--radius-control` is "= --radius-pill, clamped to half-height". The patch does not touch it.
- **No legacy alias.** The patch deletes Button's old `calc(var(--button-size) / 2)` and its test pin outright. That is E-1 clean.

### 3.4 The elegant-reduction trap and spec-cites-itself circularity

- **"The corner reads the box" reduces the tile to its corner. The hard parts go to a floor that the family owns in the patch and disowns in the spec.** SPECS A.1: "A does not own state … A lands only if the floor lands with it". The patch then ships that floor. The floor is one declaration, and it leaves B-3 open, the consumer erasure (below) open, and T-4, T-5, T-6 and T-7 exactly as at HEAD. The tile's selected, focus, keyboard and engagement registers are "and then the hard part" for another seat.
- **The consumer erases the floor.** keyframes.js's on-state rule sets `border-color: transparent` (transcribed at `scenes.mjs:309`, from `SpringPhysicsFacet.vue:285-309`). In the shipped composition, preset-verbatim, T-3 reads 1.09 / 1.06 / 1.07 with 0.00 / 159 / 0.00 px² of band in Chromium, and 1.10 / 1.07 / 1.07 with 0.00 / 165.5 / 0.00 in Playwright WebKit. Under D4-A the owner's actual screen does not change until keyframes.js deletes its paint (E-6).
- **Deleting that paint is a regression on touch.** keyframes.js hand-sets 16 px today (SF-14). SPECS A.1 asks K1 to delete it (T-7), and A1 then paints 20 on fine and 30 on coarse. The consumer therefore has a measured reason to keep its rule, and T-7 is structurally stuck under A1 rather than pending.
- **Circularity.** PORTFOLIO §0: "The shape half is already ruled … `--radius-field`, the 16 px card rung, for multi-line holders". The patch rewrites `DESIGN.md:385-386`: the control row becomes rung/2 "one line or wrapped", and the field row narrows to text entry. Then T-1 passes because the corner "equals a named role", the role the patch has just redefined as that corner. The family's research seat reads the evidence the other way (`D4-A.md` §3.1: "A1 is the wrong rule for a holder that is multi-line by design … The measurements favour A2 for the number"). The prototype built A1 only. So the prototyped arm is the one its own research says gives the wrong tile number.

### 3.5 Consumer-less substrate

None. `--control-rung` has four publishers: Button, ToggleGroupItem, Chip and the Accordion trigger. `--chip-floor` has two readers, the box and the rung (B-1's fix, a clean P-3 move). `glass-chip--{xs..lg}` are emitted by `chipVariants.ts`, which always sets a size (`size ?? "md"`). A bare `.glass-chip` with no size class would compute an invalid rung and a 0 px corner, a loud failure. No consumer in keyframes.js, value.js, fourier-analysis or chicago composes `glass-chip` or `chipVariants` directly (grep).

## 4 · Gestalt (looked at, my captures)

`crit/final/*.png`, second item selected, pointer parked.

- **Fine pointer, light** (`preset-light-fine-chromium.png`, `specimen-light-fine-chromium.png`). The preset tiles read as a 2×2 set of grey rounded-rect cards, and the specimen tiles as soft squares with room for their plots. Better than HEAD's lozenges and ovals. The selected tile reads at a glance through its 1 px near-black edge plus a darker fill, and that difference is in luminance, not hue.
- **PRT** (`preset-prt-fine-chromium.png`). The fills are identical and the edge alone marks Snappy. It works, and it is the only carrier.
- **Dark** (`preset-dark-fine-*.png`). The white 1 px edge is crisp and a little loud against the 14 % siblings (SF-4's "heavy").
- **Coarse** (`preset-light-coarse-*.png`, both engines). The tiles are lozenges again. This is the owner's complaint re-drawn, and T-1 passes it.
- **Uncluttered, glass-idiomatic?** Partly. Each tile carries its own grey plate and rim inside a host plate. Tile corners of 20 px sit inside a host whose corner reads tighter, so the tiles read rounder than their container (C-10, seen). The selected register, a thin dark outline, reads like an outlined or focused form field rather than an iOS-27 selection, which is a tinted fill, a mark, or a glide. The commit is a 180 ms `--ease-standard` colour and border fade (`transitionProperty` includes `border-color`, 0.18 s; mid-fade read at two frames). There is no pop, no glide and no weight (D-1, D-2), and T-6's 0.00 % hover light channel (SF-9) is unchanged.
- **iOS-27 grade?** No. The corner at fine pointer is right; the rest of the tile is HEAD's.

## 5 · Named counterexamples

1. **CE-1 · the coarse lozenge passes the battery.** Preset, `hasTouch`: rung 60 → 30 px at 208×61.58, ÷h/2 0.97, `judgeT1` PASS, both engines.
2. **CE-2 · a planted lozenge passes T-1 on both tile scenes.** In `p-rung15`, preset 30 px (0.97) and specimen 27 px are "named --radius-control, flat true".
3. **CE-3 · a dead universal rule is silent.** `p-nouniv`: T-2 12/12, every holder back to `9999px`, Button included. The paint is HEAD's.
4. **CE-4 · the root override is dead.** `:root { --radius-control: 12px }` → item 20 px, bare reader 9999 px.
5. **CE-5 · the inner reader leaks.** 20 px inside a ToggleGroupItem, 9999 px outside (B-2).
6. **CE-6 · invalid erases selection.** Four red edges, and the selected one is distinguished only at 1.2:1 (B-3).
7. **CE-7 · the shipped K1 composition erases the floor.** preset-verbatim 0.00 px² in light, 1.09:1.
8. **CE-8 · a wrapped CollapsibleTrigger balloons, unwitnessed.** No rung; W-A does not include it (by code, not measured).
9. **CE-9 · K1's T-7 migration regresses on touch.** 16 → 30 px.

## 6 · Convergence and open gaps

**45 %.** Weights, stated so the number can be checked:

- The corner mechanism at fine pointer and the wrap law: closed.
- The selected floor in bare scenes: closed.
- Builds and units: closed.
- Everything below: open. Items 1-4 are the ones that decide the tile.

**Open gaps:**

1. The tile corner on the comfort axis: 30 px (0.97) on coarse and 25 px at `--ui-scale: 1.25`. O-58's "card like" is not met on touch.
2. The canon edit at `DESIGN.md:385-386` is what makes T-1 green, and it overturns a row PORTFOLIO §0 calls ruled. The owner's ruling is outstanding. The family's own research reads for A2's number, and A2 is unbuilt.
3. T-1's naming half is tautological under A1 (the probe child inherits the rung), and no coarse or `--ui-scale` T-1 cell exists. The witness needs a coarse cell and a "reads as a card" bound (for example ÷h/2 ≤ 0.6 past the rung, or equality with `--radius-field`).
4. The shipped K1 composition erases the floor edge (`border-color: transparent`), so the owner's scene is unchanged until K1 migrates. Migrating regresses the corner on touch.
5. B-2: the inheriting rung leaks into inner readers. The registered cure needs a harness ruling on "named in the item's context".
6. B-3: validity and selection share `border`. No precedence rule and no witness.
7. E-2: the root sentinel rung turns a dead universal rule or a forgotten rung into the silent HEAD stadium.
8. A consumer `:root { --radius-control }` override is silently dead.
9. CollapsibleTrigger has no rung (C-3), and W-A covers 3 of 5 composers.
10. Engagement: T-6 17/24 · 9/14. The commit is a bezier colour fade; there is no iOS-27 commit and no hover light channel (SF-9, SF-10).
11. T-4 (port cut, consumer outline), T-5 (dead cross axis, strip/card/chipcell ARIA) and T-7 are unchanged.
12. Nesting inversion: a 20 px tile in a tighter host (C-10).
13. Button's coarse rung/floor split (C-4).
14. The SF-20 harness `@source` line is still missing from the banked harness (W-A reads 2/3 there).
15. The stale cite at `utilities/components.css:17`.
16. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell. Playwright WebKit's ToggleGroupItem hover hang (SF-8) persists.

## 7 · Artefacts

Under the scratch root:
- `logs/battery-final.log`, `logs/battery-finalw.log`, `logs/plants.log`, `logs/crit-final.log`, `logs/vitest-affected.log`, `logs/build-*.log`
- `out/builds/{final,p-noedge,p-edge48,p-norung,p-rung15,p-runghalf,p-nouniv}/` and `out/runs/*/`: every witness's cells
- `outw/`: the widened-harness build and runs; `hw/`: the harness copy, two lines changed
- `crit.mjs`, `crit/final/`: captures and `crit.json`
- `pristine/`: the patched `toggle-group/styles.css` and `theme/radius.css` used to restore after each plant

The worktree was removed.
