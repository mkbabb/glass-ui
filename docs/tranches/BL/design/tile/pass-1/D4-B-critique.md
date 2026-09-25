# D4 · pass 1 · D4-B · the choice card (critique)

| field | value |
|---|---|
| seat | D4 pass 1, adversarial critic for family D4-B. I did not author the family. This file replaces an earlier critic's file at this path (written 15:49, before the 18:14 limit; that seat never returned) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the checkout read `3563ca05`. `git diff --stat 99839631 HEAD -- src tests demo package.json vite.targets.ts scripts` is empty, so the prototype's base still holds. `D4-B-proto.patch` applied clean (`git apply --check`, then `git apply`) to a fresh detached worktree at `3563ca05` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright` 1.61.1, headless, through the harness's own `lib.mjs`. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 14.2 / 13.2 / 11.6 at the first build, 9.5 / 11.0 / 12.6 during captures. Every number is a settled static read, a real input event, or a per-frame computed-style sample |
| worktree | `…/scratchpad/D4/p1/D4-B-crit/wt` (`node_modules` and `tests-visual/node_modules` symlinked; harness builds write only under `…/D4-B-crit/o3/`). A stale worktree at the same path from an earlier attempt of this seat (at `145f199d`, no live process) was removed with `git worktree remove --force` before I re-added it. Removed again before return |
| fence note | My first `ln -s …/node_modules wt/node_modules` ran while that stale `wt/node_modules` link still existed, so `ln` wrote a self-link `glass-ui/node_modules/node_modules` into the checkout (gitignored; created 20:00:17). I deleted it at 20:00:26 and checked that it is gone. No other write touched the checkout except this file |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-crit/` (§8) |

## 0 · Verdict

**BANK, convergence 55 %.** The prototype is honest. I re-ran the battery and it reproduces cell for cell in both engines (T-1 4/7, T-2 12/12, T-3 15/15, T-4 16/20, T-5 37/38, T-6 24/24, T-7 8/12, T-8 16/16, W-B 13/13). Every witness it claims green goes RED on a violation I planted in B's own code (§2). The carrier is the best-measured one in the portfolio: a 2 px perimeter in a lightness-floored tone. It clears 3:1 in both engines on violet, yellow, red and pale sky tones (§3.2).

Three things keep it below ADVANCE:

1. **It answers D4's corner question only for sites that adopt it.** Nothing routes a multi-line one-of-N set to the card or refuses a multi-line ToggleGroupItem. With B's `src` and the unmigrated compositions, the preset still reads 30.79 px (÷h/2 1.00), the specimen 50.08 px, and W-B 2/13 (§3.1). W-B's 13/13 is measured on scenes the family rewrote.
2. **Two silent failures in the carrier and the ring.** A translucent or unresolvable `tone` erases the only carrier: band 0 px² against a 291 px² bar, in both engines, with no warning (§3.2). A consumer `p-0` on the group cuts the ring to 0 px on two sides (§2, P7). Both are prose rules in the spec, and nothing in the library enforces them.
3. **It is dominated on size by D4-D for the same battery outcome.** Its unique record is narrow: named anatomy with state-keyed meta ink, plus a chassis that avoids `.control-surface`. The chassis half rests on a Playwright WebKit hang in a token that SF-8 assigns to another owner. B adds a third one-of-N primitive and a third N-of-M path (§4, item 5).

**Re-trigger.** Re-open B as the lead if any of these holds:
- (a) pass 2 rules that the library must own title and meta ink on a selected tile, because consumer typography overrides state ink (PORTFOLIO §2.2, K1 `:86`);
- (b) the SF-8 token fix does not make ToggleGroupItem hover survive in Playwright WebKit, or real Safari reproduces the hang;
- (c) D's cell arm has to grow `#title` / `#meta` / `#mark`, at which point D becomes B under another name (D4-B §1 Q3).

**Portable either way:** the floored-tone perimeter, with an alpha clamp added (§3.2); the `grid` arrow model; the meta ink lift; and the bounce-shaped commit pop.

## 1 · Step 1: the failures I expected a tile design to hide (written before reading the spec)

From PORTFOLIO §0-2, §7 and HARNESS.md only:

| # | expected hiding place | why I expected it |
|---|---|---|
| X1 | the family re-authors the scenes, so the witnesses measure its own transcription and not the consumer | HARNESS §1.2 tells a family to stamp `data-item` in scene markup; W-B's claim is "every site composes the card" |
| X2 | the selected carrier is fit to the harness's tones and thresholds, and fails on other tones or on alpha | T-3 is a single numeric bar; consumers pass their own hues (K2 `--ball-tone`) |
| X3 | engagement is claimed at the iOS-27 bar while T-6 passes any colour transition | HARNESS §6 says so outright |
| X4 | ring clearance is padding that a consumer utility can override | the specimen cut at HEAD is a 2 px pad in a scroll port (SF-6); utilities outrank `@layer components` |
| X5 | the corner is right inside the new primitive while the old holders still turn into lozenges | T-1 `wrap` is not owned by any one family |
| X6 | retired API silently no-ops | E-11, SF-19 |
| X7 | the contrast, forced and PRT arms add a second carrier or shift layout | `accessibility.css` and the PRT plate (R3-02-08) |
| X8 | the WebKit story is carried by working around a bug and not fixing it | SF-8 |
| X9 | the grid-arrow engine change ships without a unit guard | the battery is a docs-tranche tool, not CI |
| X10 | glass-in-glass clutter and heavy light-mode edges | SF-25; the owner's words, "cluttered, not glass-idiomatic" |

Where each landed: X1, X2 (alpha, not hue), X3, X4, X5, X6 and X9 are confirmed below. X7 was already found by the prototype (§4 there). X8 is confirmed as a divergence-record weakness (§4, item 5). X10 is partly confirmed (§5).

## 2 · Re-run and planted violations (every witness the prototype claims green)

Baseline: `node harness/build.mjs wt --label b`, then `run.mjs --build o3/builds/b --webkit` (`o3/logs/run-b.log`). Every verdict line equals the prototype's §4 table. Planting used `plant3.sh`: it edits one thing, rebuilds, runs `--only` the named witnesses, and restores the files from `o3/bak/`. The restore was checked by `diff -q` after the last plant.

| plant | what I changed | witness | clean → planted (Chromium / Playwright WebKit) | caught? |
|---|---|---|---|---|
| P1 | `.choice-card::before{display:none}` (drop the perimeter) | T-3 | 15/15 → **0/15** / 15/15 → **0/15**. Preset band 1198.5 → 185.5 px² (the mark alone), specimen and strip 0; fill stays 1.18-1.55 | yes |
| P1 | same | W-B | 13/13 → **4/13** | yes |
| P1 | same | T-8 | 16/16 → **4/16** | yes |
| P2 | specimen `tone="var(--ball-tone-typo)"` (an undefined property) | T-3 | specimen light/dark/PRT: band **0**, fill **1.00** → 12/15 | yes, in the harness; see §3.2 |
| P2b | specimen `tone="rgb(120 80 200 / 0.35)"` | T-3 | specimen band **0 / 291** in all three modes, both engines → 12/15 / 12/15 | yes, in the harness; see §3.2 |
| P3a | every non-scale transition removed, flood transition and `choice-commit` off | T-6 | 24/24 → **20/24** / 24/24 → **20/24** (the four commit cells) | yes |
| P3b | commit reduced to one `--choice-fill 120ms linear`; edge snaps, no flood, no pop | T-6 | **24/24 / 24/24** (`running non-scale motions 1 [CSSTransition:--choice-fill 120ms]`) | **no**: the commit cell cannot tell a fade from the claimed commit |
| P4 | `@supports (-webkit-backdrop-filter: blur(1px)) { .choice-card{border-radius:9999px} .choice-card::before{display:none} }` (a WebKit-only rule; Chromium does not parse the prefix) | T-8 | 16/16 → **8/16** (the Playwright WebKit half) | yes |
| P5 | `.choice-card{border-radius:var(--radius-pill)}` | W-B / T-1 | 13/13 → **10/13**; T-1 4/7 → **0/7** | yes |
| P6 | `.toggle-group__item{border-radius:12px !important}` | T-2 | 12/12 → **4/12** | yes |
| P7 | the consumer adds `class="p-0"` to the specimen `<ChoiceGroup>` | T-4 | 16/20 → **8/20** / 16/20 → **8/20**; specimen ring coverage `top 0, left 0` (item 0), `top 0, right 0` (item 1) | yes, in the harness; the library allows it (§4, item 3) |
| P8 | `ChoiceGroup` `arrows: "axis"` | T-5 / W-B | 37/38 → **31/38**; W-B stays **13/13** | T-5 yes; W-B does not check arrows |

Unit suites in the worktree: `npx vitest run tests/components/choice tests/components/card tests/components/chip.contract.test.ts tests/components/ui/toggle-group tests/components/custom/tabs tests/styles/radius-role-canon.test.ts tests/gates/overfit-structure.test.ts` gave 7 files, 111 passed, 1 expected-fail.

## 3 · Findings the prototype did not report

### 3.1 W-B is circular, and the corner is right only inside the card

The patch edits `harness/scenes.mjs` itself (`git diff HEAD -- docs/tranches/BL/design/tile/harness/scenes.mjs`). The preset, specimen, strip, card and chipcell scenes are re-authored as `ChoiceGroup` / `ChoiceCard`. W-B then reads those scenes, so W-B's green is true by construction. The transcription also drops consumer content classes that the HEAD scenes carried:
- preset: `text-small text-foreground capitalize` on the name, and `text-mono-caption text-muted-foreground` on the readout;
- specimen: `tile-name text-mono-caption data-register="code"` and `data-surface="opaque"`.

This matters because PORTFOLIO §2.2 names exactly this: a consumer's own typography overriding state ink. B's meta-ink lift is demonstrated on a composition where the consumer has already deleted its pins. The migration table does list those deletions (SPECS B.2 K1 `:86`), so this is a stated precondition, not a hidden one, but no witness measures it. It also leaves `.specimen-tile.kf-verbatim[data-state="on"] .tile-name` (scenes.mjs:338) matching nothing, so the "verbatim" arm is not verbatim.

Measured, the checkout's unmodified HEAD `scenes.mjs` built against B's `src` (`o3/builds/b-unmigrated`, Chromium):
- **T-1 1/10.**
  - preset `toggle-group-item` 9999px: 30.79 → 40.88 → 50.96 px (÷h/2 1.00);
  - specimen 50.08 → 68.23;
  - chipcell (`<Chip shape="cell">`, now a deleted value) renders the stadium: 9999px → 24.23 px at 48.47 tall;
  - `wrap` unchanged.
- **T-5 19/38.** The unmigrated card board is a `listbox` of `generic` items with **0 tab stops**, because `<Card :selected>` now falls through as an attribute and does nothing.
- **T-3 2/15, W-B 2/13.**

So B answers the portfolio's question 2 ("so a holder is correct by construction rather than by a per-site class") only per adopting site. The per-site class becomes a per-site choice of component, and the ToggleGroupItem lozenge stays one `flex-col` away (T-1 `wrap`: 20.00 → 39.24 px). The spec's "ToggleGroup goes back to single-line pills" is a convention with no refusal behind it. Closing T-1 needs A1's rung-bound corner or an E-style refusal on top of B. The retired bindings measured here are E-11's silent class (SF-19), and no MIGRATION.md entry exists.

### 3.2 `tone` is the carrier's single point of silent failure

- **P2, an unresolvable tone.** `border: 2px solid var(--choice-edge)` is a shorthand. When `--choice-edge` is invalid at computed-value time, the longhands fall back to initial values, which makes `border-style` `none`. The perimeter vanishes, fill and flood go transparent, and the selected card reads 1.00:1 against its sibling. There is no console output in either the production or the DEV build; `ChoiceCard.vue` validates nothing.
- **P2b, a translucent tone.** `oklch(from var(--choice-tone) min(l, 0.42) c h)` keeps the origin's alpha, so a 0.35-alpha tone paints a 0.35-alpha edge. That gives band 0 in all six specimen cells across both engines.

The spec says "`tone` (a complete colour)"; a prop type of `string` does not hold that. This is an E-2 violation: the primary does not fail loud. The fix is small:
1. write `/ 1` into both floors, as `oklch(from … min(l, 0.42) c h / 1)` and the `max(l, 0.80)` twin;
2. in DEV, check the tone with `CSS.supports("color", tone)` and a computed read of `--choice-edge`.

**Hue generalises** (T-3, specimen, `tone-{yellow,sky,red}` builds, band against a 291 px² bar, light / dark / PRT):

| tone | Chromium | Playwright WebKit |
|---|---|---|
| yellow `oklch(0.92 0.17 100)` | 523.5 / 559 / 539 | 526 / 559 / 539 |
| pale sky `rgb(125 211 252)` | 524.25 / 557.75 / 539 | 526.75 / 555 / 539.75 |
| red `oklch(0.63 0.24 27)` | 537.5 / 548 / 547 | 538 / 542.5 / 546.5 |

All pass. The "pale-tone consumer against the L 0.42 floor" gap (SPECS B.5) is now measured: it separates. The price is counterexample 4: a pastel brand tone paints a dark edge in light.

### 3.3 T-6 cannot see the commit B claims

P3b shows T-6 passing a single 120 ms linear fill fade with no edge motion, no flood and no pop. B's iOS-27 commit is therefore witnessed by nothing gating. I measured it directly instead (`pop2.mjs`, a real ArrowDown, preset, per-frame computed style on the newly checked card).

| ms after key (Chromium) | scale | `--choice-edge-t` | flood opacity |
|---|---|---|---|
| 110 | 0.9991 | 0.03 | 0 |
| 142 | **1.0296** | 0.88 | 0 |
| 165 | 1.0251 | 1.00 | 0.03 |
| 205 | **0.9952** | 1.00 | 0.39 |
| 229 | 1.0000 | 1.00 | 0.53 |
| 438 | 1.0000 | 1.00 | 1.00 |

Playwright WebKit gives the same shape: a peak of 1.0277 at 143 ms, an undershoot to 0.9954 at 214 ms, settling by 234 ms, and the flood at 1.00 by 449 ms.

So the pop has weight and bounce, overshooting and then undershooting (D-1 holds in form). It is small (+3 % on a 204 px tile) and short (settled about 120 ms after it starts). The edge arrives in about 50 ms, and the flood follows over about 280 ms. There is **no glide**: the old card's edge releases at 180 ms and the new one's attacks at 60 ms, independently, so nothing travels between the two. Of the three elements PORTFOLIO §0 names for the iOS-27 commit (the flood, the scale pop, the glide), B has two.

### 3.4 The carrier and the grid walk have no CI guard

`tests/components/choice/Choice.test.ts` says so in its header ("the grid walk are browser measurements (the D4 tile battery, W-B and T-3)"). A grep of `tests/` finds no reference to `choice-card` styles, `RovingArrows`, `rowNeighbour` or an arrows `"grid"` path outside the new test and two unrelated table tests. The 56-line engine addition to `useTabRovingFocus.ts` runs only in the docs-tranche harness. D4-B §6 item 6 ("a future edit that drops the `::before` regresses the state silently") is confirmed: P1 is exactly that edit, and only the non-CI T-3 catches it.

### 3.5 An adjacent defect the battery cannot see (not B's)

In the specimen and strip scenes, the first Tab from the `before` sentinel lands on `DIV.fading-scroll` (`tabindex=0`), and the second lands on the choice card (`tabs.mjs`). So the K2 and V1 compositions have two tab stops. The scroller paints the UA-default square blue focus outline (visible around the whole drawer in `gest/specimen-dark-chromium-focus-hover.png`), not `.focus-ring`. T-5 counts only item stops, so it cannot see this. It belongs to FadingScroll, not to B; it is recorded here because B's migration puts every card set into that port.

## 4 · The checklist

| item | answer | evidence |
|---|---|---|
| 1. Vacuous convergence | **partly present.** "Every number equals the spec's `b4` table" is the research seat's code measured again through the research seat's scene file: a replication, not independent evidence. My re-run is a third replication on the same scene arm. The independent reads are §3.1 (HEAD scenes against B `src`), §3.2 (foreign tones) and §3.3 (commit timeline) | `o3/logs/run-b.log`, `run-b-unmigrated.log` |
| 2. Spec cites itself | **present for W-B.** The family's own scene edit satisfies W-B (§3.1). **Present in a milder form for T-3.** The floor L 0.42 was tuned until the violet specimen cleared T-3's bar (D4-B Q4: unfloored misses by 42 px²). It generalises across hue (§3.2), so this is calibration, not overfit, but alpha was never in the tuning set and fails | §2 P2b, §3.2 |
| 3. Gates that cannot fail | T-6's commit cell cannot fail on quality: P3b passes. The other claimed-green witnesses all fail on plants (P1, P4, P5, P6, P7, P8). W-B does not check arrows (P8 stays 13/13) | §2 |
| 4. The elegant-reduction trap | **present.** The load-bearing step "every multi-line one-of-N site composes the choice card" is the hard part, and it is handed to consumers. value.js is three majors behind (SF-22); K1 and K2 must delete per-site paint; nothing refuses the old composition (§3.1). "A consumer class may replace the layout but not the padding" is another reduction to prose (P7) | §3.1, P7 |
| 5. Legacy aliases, shims, dual paths | **No aliases or shims.** Card `selected` and Chip `shape="cell"` are clean deletions, and `vue-tsc` flags the typed Card site. **Dual paths are present:** one-of-N now has three primitives (ToggleGroup `single` radiogroup, ChoiceGroup `single`, SegmentedTabs `semantics="toggle"`, which is still `group` + `aria-pressed`, T-5 `tabs` RED). N-of-M has three (ToggleGroup `multiple`, ChoiceGroup `multiple`, Chip `mode="selectable"`, which keeps no consumer after V1 moves). Two item registries (`choice/context.ts` is a 26-line copy of `toggle-group/context.ts`'s pattern; P-3). The design-idioms §9 divergence record is anatomy plus chassis, and the chassis half is the SF-8 Playwright WebKit hang, which SF-8 assigns to the `--control-surface-bg-hover` token owner. Once that is fixed, the record is anatomy alone. Under `prefers-contrast: more` and forced colours, `accessibility.css` adds a second, layout-moving carrier (prototype §4) | patch file list; `ChoiceGroup.vue`; `context.ts`; SF-8 |
| 6. Masked fallbacks | **None masked; one silent.** No fallback paints over a dead primary. The dead `tone` does the opposite: it erases the primary with no signal (§3.2), and E-2 asks for loud failure. The interactive-descendant refusal is DEV-only, and in production an `<input>` inside a card loses ArrowRight to the group (prototype §4, matrix). That is unruled | §3.2 |
| 7. Unverified gestalt | Looked at myself, Chromium and Playwright WebKit, light and dark (`gest/`). See §5 | §5 |
| 8. Consumer-less substrate | `type="multiple"` has one candidate consumer (V2), behind three majors, and it is outside the battery (the `multi` scene is not in `SCENES`). `#mark` has none. `disabled` has none. `tone` has K2. `mode="selectable"` Chip keeps no consumer. E-7 is met through export, but P-1 asks why `multiple` ships before V2 can adopt | SPECS B.2; `scenes.mjs` |

## 5 · Gestalt (my captures, `gest/*.png`, 1000×900 at DSF 2)

- **Card-like option.** Yes. The preset tiles read as four cards with a name over a mono readout (`preset-light-chromium.png`). The plans read as cards (`card-light-chromium.png`). The specimen tiles read as specimen cards with the stage above the name. The stadium is gone everywhere B owns.
- **Selected unmistakable without colour alone.** Yes at `md`: a 2 px luminance edge (near-black in light, near-white in dark) plus the check disc. At `sm` (specimen, strip) there is no mark and the edge is the only shape cue. It still reads, because the floor makes it a luminance edge and not just a hue edge (P1 shows that removing it leaves the mark's 185.5 px² at `md` and nothing at `sm`).
- **Uncluttered and glass-idiomatic.** Partly.
  - In light, the selected edge is a hard near-black 2 px outline on a pale plate. With focus on it (`preset-light-*-focus-hover.png`), the ring's grey 2 px at a 2 px offset makes a double contour. That reads closer to an outlined Material card than to iOS glass, where selection is a tinted fill or glow plus a check.
  - Every tile is a blurred plate with a rim and a border inside a Card plate: glass in glass (SF-25). The eight-tile specimen drawer reads busy in light.
  - The dark arm is clean: the near-white edge on a dark plate, and the violet specimen wash reads well (`specimen-dark-chromium-focus-hover.png`).
  - On the 40 × 56 strip tiles, a 16 px corner is 0.8 of the half-width, so they read as rounded squircles, softer than the owner's "more card like". The widths are ragged: 40 and 51.2 px (counterexample 5).
- **iOS-27 grade.** Not yet. The hover lift (1.015 plus the floating cast) and the bounce pop are there. The glide is absent, the light-mode selection register is heavy, and nothing is novel past iOS 27 (D-3).
- **Engines.** Playwright WebKit captures match Chromium by eye (`preset-light-webkit-focus-hover.png`, `strip-dark-webkit.png`). Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 6 · Convergence and open gaps

**55 %.** The mechanism is sound and measured. The witnesses it claims are live, except T-6's commit quality. The gaps are real, but most are cheap (1-4) or are rulings (5-10).

Open gaps, exactly:
1. `tone` alpha is not clamped, and an unresolvable tone erases the carrier with no signal (§3.2). Fix: `/ 1` in both floors, plus a DEV tone check.
2. Ring clearance is prose. A consumer `p-0` gives T-4 8/20 in both engines (P7). The group must own its clearance in a way a utility cannot remove, for example an inner track element carrying the grid.
3. There is no CI guard for the carrier (a canon row: `.choice-card::before` present, 2 px, floored tone) or for the grid walk (a unit test with stubbed rects) (§3.4).
4. No rule routes multi-line one-of-N to the card. ToggleGroupItem still wraps into a lozenge (T-1 `wrap`), and unmigrated sites stay RED (§3.1). It needs A1 or an E-style refusal alongside, or a ruling that B does not own the corner question.
5. The commit has no glide, and no witness holds the commit bar (§3.3). The pop is +3 % over about 120 ms.
6. The light-mode selection register is heavy, and pastel tones are forced dark (counterexample 4, §5). A design ruling.
7. Twin-primitive divergence: three one-of-N and three N-of-M paths, and two registries (P-3). The chassis argument rests on SF-8 (§4, item 5).
8. `type="multiple"`, `#mark` and `disabled` ship without a consumer, and `multiple` is outside the battery (§4, item 8).
9. The DEV-only interactive-descendant refusal leaves a production keyboard fight (prototype §4). E-2 is unruled.
10. The `accessibility.css` 2 px `!important` border shifts layout by 1 px under contrast-more and forced colours (prototype §4). Its owner must rule.
11. Retired bindings silently no-op, and there is no MIGRATION.md entry. Measured: `<Chip shape="cell">` → 9999px stadium; `<Card :selected>` → 0 tab stops (§3.1).
12. The harness transcription drops consumer content classes, so the B scenes are not verbatim (§3.1).
13. Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
14. Carried from the spec, not re-measured here: the rendering cost of 28 blurred cards in a port; Chromium forced-colours ring coverage on the specimen at 1 px (reported only); the last-row and RTL arrow rulings.

**Counterexamples named** (concrete inputs → wrong output):
- `tone="rgb(120 80 200 / 0.35)"` → selected specimen band 0 / 291 px², both engines.
- `tone="var(--ball-tone-typo)"` → fill 1.00:1, band 0, no console output.
- `<ChoiceGroup class="p-0">` in FadingScroll → ring 0 px on two sides.
- `<ToggleGroupItem class="flex-col">` with two rows → 30.79 px lozenge under B.
- A `.choice-card::before` deletion → passes every CI test and fails only the docs battery.
- A 120 ms linear fill fade → T-6 24/24.

## 7 · Commands, as run

```sh
S=…/scratchpad/D4/p1/D4-B-crit; W=$S/wt; H=$W/docs/tranches/BL/design/tile/harness; O=$S/o3
git worktree remove --force $W; git worktree add --detach $W HEAD          # 3563ca05
ln -s …/glass-ui/node_modules $W/node_modules; ln -s …/glass-ui/tests-visual/node_modules $W/tests-visual/node_modules
(cd $W && git apply --check …/pass-1/D4-B-proto.patch && git apply …/pass-1/D4-B-proto.patch)
node $H/build.mjs $W --label b --out $O; node $H/build.mjs $W --label bdev --dev --out $O
node $H/run.mjs --build $O/builds/b --out $O --webkit                       # logs/run-b.log
$S/plant3.sh <label> <witnesses> <webkit>                                   # P1..P8, tone-{yellow,sky,red}
node …/glass-ui/docs/…/harness/build.mjs $W --label b-unmigrated --out $O   # HEAD scenes, B src
node …/glass-ui/docs/…/harness/run.mjs --build $O/builds/b-unmigrated --out $O --only T-1,T-3,T-5,W-B
node $S/gest.mjs $O/builds/b $S/gest chromium|webkit                        # gestalt
node $S/tabs.mjs $O/builds/b chromium                                       # tab sequence
node $S/pop2.mjs $O/builds/b chromium|webkit                                # commit timeline
(cd $W && npx vitest run tests/components/choice tests/components/card …)   # 7 files, 111 passed, 1 expected-fail
git worktree remove --force $W
```

## 8 · Artefacts

Under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-crit/`:
- `o3/logs/run-*.log` and `o3/runs/<label>/*.json`: every battery and plant run (`b`, `b-unmigrated`, `p1-noperim`, `p2-deadtone`, `p2b-alphatone`, `p3a-nocommit`, `p3b-fadeonly`, `p4-wkonly`, `p5-pill`, `p6-t2`, `p7-p0`, `p8-axis`, `tone-yellow`, `tone-sky`, `tone-red`).
- `o3/builds/`: the scene bundles.
- `o3/bak/`: the restore copies.
- `plant3.sh`, `gest.mjs`, `tabs.mjs`, `pop2.mjs`: the probes.
- `gest/*.png`: 40 captures (5 scenes × light/dark × rest and focus-plus-hover × Chromium and Playwright WebKit).
