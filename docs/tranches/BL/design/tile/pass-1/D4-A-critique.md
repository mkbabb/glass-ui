# D4 · pass 1 · D4-A · critique

| field | value |
|---|---|
| seat | D4 pass 1, adversarial critic for D4-A (the corner reads the box). I did not author the family, its spec or its prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `145f199d`. `git diff --stat 99839631 HEAD -- src vite.targets.ts package.json DESIGN.md tests` is empty, so the prototype's base still holds. `D4-A-proto.patch` applies cleanly (`git apply --check`) and is byte-identical to the scratch `D4-A-proto.final.patch` modulo blank context lines |
| instruments | worktree `…/scratchpad/D4/p1/D4-A-crit/wt` (node_modules symlinked; removed with `git worktree remove --force` before return). The banked harness run unmodified from the checkout, plus a scratch copy `r2/hw/` with the SF-20 `@source "${wt}/src/components/**/*Variants.ts"` line and an absolute repo root. Three critic probes: `r2/probe.mjs` (coarse corners judged by T-1's own `judgeT1`, the rung leak, the invalid group, hover on the selected item, the nesting host), `r2/edge.mjs` (the computed selected edge), `r2/shots.mjs` (gestalt captures). Nine planted-violation builds |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright` 1.61.1. Playwright WebKit is not Safari. Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox) |
| load | 6-12 during the runs. Every number is a settled static read or a real input event |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-A-crit/r2/`: `logs/battery-proto.log`, `logs/plants.log`, `logs/probe-proto.log`, `out/runs/<label>/*.json`, `outw/runs/<label>/*.json`, `shots/sheet-{preset,specimen}.png` |

## 0 · Verdict in brief

**BANK, convergence 55 %.** A1 is a sound rule for a *control whose label wraps*: it generalises Button's law to ToggleGroupItem, the pill Chip and the disclosure trigger, it is pure CSS, and it reproduces in both engines. It does not answer D4's problem, which is a *multi-line option that should read as a card*.
- On a coarse pointer the keyframes.js preset tile paints 30 px on 61.58 px, 0.97 of h/2. That is the lozenge the owner rejected, and it passes every witness.
- The family's T-1 green is largely tautological. A1 redefines the role T-1 names as "whatever the corner is", so T-1 passes planted violations that only W-A catches, and W-A runs only on a fine pointer.
- Selection, focus, keys and engagement are borrowed or untouched.

Keep A1 as the wrapped-control rule under whichever tile family wins, with the re-trigger in §6.

## 1 · Step 1: the failures I expected a tile design to hide (written before reading the spec)

From PORTFOLIO §0-§2, §7 and HARNESS.md alone:

1. **Fine-pointer-only proof.** Every witness runs at 1000×900, fine pointer. The comfort axis (coarse rung 60, `--ui-scale`) can re-round a tile, and no gate would see it.
2. **A corner that is "named" by construction.** T-1 passes a flat corner that equals any `--radius-*` resolved in the item's context. A family that defines a role as the item's own corner passes T-1 whatever the number is. HARNESS §6 already hints at this ("the fixture names it `--radius-control`").
3. **The shape cured, the state not.** A corner fix leaves the 1.20:1 fill (SF-3), the consumer's outline spend (T-4), the dead cross axis (T-5) and the 0 % hover light channel (SF-9). The family then claims green on the one row it owns.
4. **The canon amended to fit the mechanism.** If the mechanism cannot give 16 px, amending the row that says 16 px turns a failure into compliance.
5. **A new shared channel colliding with an old user of it.** A selected carrier on `border` meets validity, forced colours and the consumer's own edge.
6. **Inheritance leaks.** A custom property meant as a per-holder input inherits into descendants.
7. **Tests that pin source text, not paint**, which pass on any spelling that matches.
8. **Silent fallback.** If the rule does not apply, the stadium comes back with no signal.

Items 1, 2, 3, 4, 5 and 6 turned out live; item 7 is live in the patch's new tests; item 8 is live but gated.

## 2 · Reproduction of the prototype's claims (my runs)

`node harness/run.mjs --build r2/out/builds/proto --out r2/out --webkit` (`logs/battery-proto.log`). Cells read Chromium · Playwright WebKit:

| witness | prototype claim | my run | agrees |
|---|---|---|---|
| T-1 | 8/8 · 8/8 | PASS 8/8 · 8/8 | yes |
| T-2 | 12/12 · 12/12 | PASS 12/12 · 12/12 | yes |
| T-3 | 8/15 · 8/15 | FAIL 8/15 · 8/15 | yes |
| T-4 | 8/20 · 8/20 | FAIL 8/20 · 8/20 | yes |
| T-5 | 19/38 | FAIL 19/38 | yes |
| T-6 | 17/24 · 9/14 | FAIL 17/24 · 9/14 | yes |
| T-7 | 4/12 | FAIL 4/12 | yes |
| T-8 | 16/16, Safari UNMEASURED | PASS 16/16, 1 unmeasured | yes |
| W-A banked | 2/3 · 2/3 | FAIL 2/3 · 2/3 | yes |
| W-A widened (SF-20) | 3/3 · 3/3 (HEAD 1/3) | PASS 3/3 · 3/3 on `protow`; `headw` FAIL 1/3 · 1/3 | yes |
| W-B · W-C · W-D · W-E | 7/13 · 0/7 · 0/4 · 0/6 | 7/13 · 0/7 · 0/4 · 0/6 | yes |

The breaks also reproduce (`logs/probe-proto.log`, both engines):
- **B-2 (the leak).** A 80×60 box reading `var(--radius-control)` paints `9999px` under `body` and `20px` inside a ToggleGroupItem.
- **B-3 (invalid).** With `data-invalid` on the preset group, all four items read `rgb(219, 36, 36)`, selected included.
- **Hover on the selected item (Chromium only; Playwright WebKit hover hangs, SF-8).** The edge holds at `rgb(28, 25, 23)` 1px.

The prototype's numbers are honest.

## 3 · Planted violations: does each green witness catch a fault?

Each plant is one edit to the patched `src`, built as its own bundle. For the W-A plants, the widened harness copy was used (`logs/plants.log`, `out/runs/<plant>/`, `outw/runs/<plant>/`).

| plant | the fault | witness that should catch it | result (Chromium · Playwright WebKit) | caught? |
|---|---|---|---|---|
| `p-rung06` | ToggleGroupItem rung `× 0.6`: a one-line item is no longer a stadium | T-2 | FAIL 4/12 · 4/12 | **yes** |
| `p-nouniv` | the `:where(*)` re-declaration deleted | T-1, W-A | T-1 FAIL 3/8 · 3/8; W-A FAIL 0/3 · 0/3 | **yes**. Preset reads `9999px→30.79` as at HEAD: the fault is a *silent* return to the stadium, not the loud squares of C-1 (the root rung is `2 × pill`) |
| `p-wkonly` | `@supports (font: -apple-system-body)` restores the stadium in WebKit only | T-8 | T-8 FAIL 14/16; T-1 PASS 8/8 · FAIL 5/8 | **yes** |
| `p-edge-ink2` | selected edge at `--ink-perimeter` (48 % ink) | T-3 | FAIL 4/15 · 4/15 (preset and specimen light and PRT at 0.00 px²; dark passes 286.5 / 363 px²) | **yes**, and SF-4 reproduces |
| `p-edge-all` | every item wears the full-ink edge (no separation) | T-3 | FAIL 2/15 | **yes** |
| `p-edge-ink` (first attempt) | `border-color: var(--ink-perimeter)` | T-3 | PASS 8/15 · 8/15, identical to 0.25 px² | **no, and the plant was invalid**: `--ink-perimeter` is a bare `0.48`. The declaration is invalid at computed-value time, so `border-color` falls to `currentcolor`, and the on-state's `color: var(--foreground)` paints full ink (`edge.mjs`: `rgb(28, 25, 23)`). See §4 item 6 |
| `p-rung15` | ToggleGroupItem rung `× 1.5`: the preset tile paints `30px` on 61.58 px, 0.97 of h/2, a lozenge | T-1, T-8, W-A | T-1 FAIL 7/8 · 7/8, **the preset cell PASSES** (`30px→30.00 (÷h/2 0.97) … named --radius-control, flat true`), only `wrap` fails; **T-8 PASS 16/16**; W-A FAIL 1/3 · 1/3 | **partly**: nothing that reads the owner's tile catches the lozenge |
| `p-chip2lh` | pill Chip rung `2lh + pad`: its corner grows 16.70 → 27.41 px as a line is added | T-1, W-A | **T-1 PASS 8/8 · 8/8** (`named --radius-control, flat true`); W-A FAIL 2/3 · 2/3 (Δ 10.70 px) | **only W-A** |

**The finding.** T-1's name clause resolves every `--radius-*` in the item's context (`lib.mjs:230-245`, `measure.mjs:27-41`). Under A1, `--radius-control` resolves to the item's own `rung / 2`, so any flat corner past the rung is "named" by construction. T-1 then reduces to "flat past the rung". It cannot fail a rung that is too large as long as the box is already past it, and T-8 inherits the same blind spot on preset and specimen. W-A is the real witness for A1, and it is fine-pointer only.

## 4 · The checklist

1. **Vacuous convergence.** Partly vacuous. T-1's 8/8 is two-thirds tautology (§3: `p-rung15` preset and `p-chip2lh` pass). T-8's 16/16 is T-1 plus a borrowed floor on two scenes, and it passes the 0.97 lozenge. The honest green is T-2, W-A (widened) and the T-3 preset/specimen cells.
2. **Spec-cites-itself circularity.** Present twice.
   - The patch amends `DESIGN.md:385-386` so that `--radius-control` is `rung/2` and `--radius-field` narrows to text entry. The canon row that said "a multi-line holder is 16 px" is rewritten to agree with a mechanism that cannot produce 16. The prototype flags this as the owner's ruling, correctly, but ships it in the patch.
   - The T-1 name clause is satisfied by the family's own redefinition of the role T-1 names (§3).
3. **Gates that cannot fail.**
   - T-1 on a flat rung/2 corner of any rung.
   - Every coarse cell. No witness opens a coarse page for T-1, W-A or T-8. My coarse read with T-1's own judge (`probe.mjs`) passes the coarse preset lozenge (`rung 60 · 208×61.58 30px→30.00 (÷h/2 0.97) … T1judge true`). It also passes Button (`110×44 30px→22.00 | 102.94 → 30.00 | 178.64 → 30.00 … T1judge true`), whose corner *grows* 22 → 30 with content, because T-1 takes the rung from `min-block-size` (44) and reads only heights past it.
   - A coarse W-A would read Button Δ 8 px, FAIL 2/3, in both engines. C-4 is therefore a live failure of the family's own witness on touch, not just an untidiness.
   - The patch's new canon tests ("each control holder publishes its rung…", "the control role is half the holder's own rung…") are source-text pins. They pass on any stylesheet that contains the strings and cannot see paint, contrary to the gates-abrogation mandate.
4. **The elegant-reduction trap.** Yes. "The corner reads the box" reduces the problem to a rung, and then the hard part (the tile reading as a card) is handed to the owner as "amend the canon or force A2". A2 is unprototyped: its synchronous-read failure is known (SF-15) and the harness has no framed read. The coarse result shows that A1 alone does not deliver "card like" on the device class where the corner is largest.
5. **Legacy aliases, shims or dual paths.**
   - No aliases.
   - One duplicated fact: `--radius-control: calc(var(--control-rung) / 2)` is declared in `@theme static` and again in `@layer base :where(*)`. The `:where(*)` copy also matches `:root`, so the `@theme` copy survives only to generate `rounded-control`. That is a P-3 duplicate, justified but not stated as such.
   - The chip's block pad moves from utilities to CSS (B-5 changes the icon chip's pad from 6 to 0 px with a 0 px paint diff). That is a clean break.
6. **Masked fallbacks.**
   - (a) If the universal rule is lost (a consumer that imports tokens without `@layer base`, or a build that drops it), every holder silently reverts to the HEAD stadium. The root rung `2 × pill` is the fallback that hides the dead primary. T-1 catches it (`p-nouniv`), so it is gated, but it is not loud in paint.
   - (b) The floor edge is robust *by accident*: an invalid token in `border-color` degrades to `currentcolor`, which the on-state sets to full ink.
   - (c) `var(--chip-floor, 0px)` and `var(--touch-target, 2.75rem)` are inline fallbacks on declared tokens, which is harmless.
   - None of these paints over a dead primary in a way the battery misses.
7. **Unverified gestalt.** My captures (`shots/sheet-preset.png`, `sheet-specimen.png`, Chromium, second item selected; HEAD above the patch in each pair) show the following.
   - **Fine pointer.** The preset and specimen tiles read as card-like options. The 20 px preset corner inside a 16 px host card reads rounder than its container (C-10, host `glass-quiet card … 16px` in `probe.mjs`). The specimen's 18 px is close to a card.
   - **Selected, without colour.** Yes, unmistakable. It is a 1 px luminance edge, near-black in light, near-white in dark, and the only carrier in PRT (the fills are identical, 1.00:1). But a 1 px full-ink hairline around a rounded rect reads as a web form's outline, not an iOS-27 selection (no tint, no mark, no weight on the consumer's own label). In dark the white hairline is bold beside 14 % siblings (SF-4's "heavy").
   - **Coarse.** The preset tile is the HEAD lozenge again (`proto-preset-light-coarse-chromium.png` against `head-…`).
   - **Clutter and engagement.** Unchanged. The hover light channel is 0.00 % and the commit is a colour change (SF-9, SF-10), so the tile is not iOS-27 grade.
8. **Consumer-less substrate.** Mostly consumed.
   - The four holders have live wrapping cases: the K1/K2 tiles, value.js UIA-V-180, F1 HarmonicLevelGrid, and UIA-F-100 for the disclosure trigger.
   - `.disclosure-group-trigger`'s rung has no measured wrapping instance in this pass.
   - The `--chip-floor` fact serves the interactive and removable chips, two sites.
   - Nothing here is substrate without a site.

## 5 · Concrete counterexamples (open)

- **CX-1 · the coarse lozenge.** keyframes.js preset tile, coarse, both engines: `208×61.58 30px→30.00 (÷h/2 0.97)`. It is the owner's rejected shape and passes every witness.
- **CX-2 · the tautological name.** `p-rung15` preset `30px (÷h/2 0.97) … named --radius-control, flat true` passes T-1's preset cell and T-8 16/16. `p-chip2lh` (16.70 → 27.41 px) passes T-1 8/8.
- **CX-3 · coarse Button tracks content.** `110×44 → 22` then `102.94 → 30`, both engines. A coarse W-A would FAIL. It is the same at HEAD, but A1 now claims Button under its rule.
- **CX-4 · the rung leak (B-2).** `rounded-control` inside any holder takes the holder's corner (20 px, not the stadium), both engines.
- **CX-5 · validity erases selection (B-3).** Four identical `rgb(219, 36, 36)` edges in an invalid group, both engines. No witness covers it.
- **CX-6 · the nesting inversion (C-10).** A 20 px tile (30 px coarse) inside a 16 px host card.
- **CX-7 · the consumer utility (C-7).** `rounded-pill` / `rounded-full` re-impose the stadium silently (research seat's measurement; not re-run here). No DEV guard was built.

## 6 · Convergence and verdict

**Convergence: 55 %.** The mechanism is proven for wrapped controls in both engines. The problem's centre (a card-like, state-legible, engaging multi-line option) is not.

**Open gaps, exactly:**
1. The owner's ruling on `DESIGN.md:385-386`. The patch carries the amendment, and it is circular until ruled (§4 item 2).
2. CX-1: A1 gives 30 px / 0.97 on the coarse preset tile. The fix is A2 (unprototyped; SF-15 synchronous read) or a different family.
3. T-1's name clause is tautological under A1 (CX-2). The harness needs either a ratio or "card-rung" bound for multi-line holders, or a rule that a role defined per element cannot name itself.
4. There are no coarse cells for T-1, W-A or T-8 (CX-1, CX-3).
5. CX-3: Button's coarse rung/floor split (C-4). The Chip's is closed by `--chip-floor`, and Button's is not.
6. B-2, the inheriting rung (CX-4). The registered non-inheriting cure needs the harness's probe-child naming re-ruled.
7. B-3, validity and selection on one border (CX-5).
8. The state registers are not the family's: T-3 strip, card and chipcell RED; T-4 8/20, T-5 19/38, T-6 17/24 · 9/14 (the WebKit hover hang, SF-8), T-7 4/12 all unchanged. The T-3 gain is the borrowed floor edge.
9. C-10 nesting inversion (CX-6).
10. C-7 consumer utility override unguarded; the DEV warning was not built.
11. The patch's new canon tests are source-text pins.
12. SF-20: the banked harness W-A reads 2/3 on this patch until the `@source` widening lands.
13. C-3: CollapsibleTrigger has no rung.
14. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.

**Verdict: BANK.** A1 is sound and not refuted: every claim reproduced, and W-A catches the plants T-1 misses. It is dominated as D4's answer by any family that owns the tile's shape *and* state, because it owns neither the card rung nor the selected, focus, key or engagement registers, and on touch it returns the lozenge.

Keep it as the wrapped-control rule (Button, pill Chip, disclosure trigger) that a winning tile family composes beside its own card rung.

**Re-trigger:** any one of the following.
- The owner rules the `DESIGN.md:385-386` amendment *and* accepts 30 px on the coarse tile.
- The winning family leaves multi-line options on a control holder (ToggleGroupItem or pill Chip) rather than a card-rung holder.
- A2 gets a framed-read battery and a prototype, with coarse cells.
