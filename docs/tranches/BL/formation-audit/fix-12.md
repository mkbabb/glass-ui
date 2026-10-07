# BL — formation fix, seat 12

| field | value |
|---|---|
| seat | formation fix seat 12, before audit pass 12. Answers `formation-audit/pass-11.md` (FK-01 to FK-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `ebcc691e`. `git diff --stat b1d82396 ebcc691e -- docs/tranches/BL ':!docs/tranches/BL/design' src` touches `FORMATION-PROGRESS.md` and `pass-11.md` only, so the plan this seat started from is the one pass 11 read |
| where probes ran | a worktree at `ebcc691e` (`.claude/worktrees/bl/formation/fix-12/wt`, `node_modules` and `tests-visual/node_modules` symlinked). No build, no browser. Every plant there was undone byte for byte (the sweep restores what it planted; the hand plants were restored with `cp` from a saved copy or `git show HEAD:<file> >`); `git status --short` read 0 lines before `git worktree remove --force`, and `git worktree list \| grep -c fix-12` → 0. The before runs read the worktree's copy of the HEAD plan through `BL_ROOT` |
| machine | load average 46-140 at the start (`uptime`). No timing cell was read. The Playwright and chrome-devtools MCP servers failed to connect. Real Safari is UNMEASURED (OW-3) |
| writes | `LEDGER.md`; 31 files under `waves/` (listed per finding below); under `formation-audit/sweeps/`: `hold-line-claim.py` and `hold-line-claim.out` (new), `ledger-terminal.py` (arms COVER and LINECITE), `chronic-decided.py` (arm L04-ROW reads specs only), a `# ===== fix-12` section appended to every other `.out`; this file. The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written; no git write in the checkout; no sibling repo touched; every sweep ran with `PYTHONDONTWRITEBYTECODE=1` and `sweeps/` has no `__pycache__` |

## Result

Each finding is cured by class, and each class has a sweep that exits 1 on the HEAD plan and 0 on the plan as left.

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FK-01 | a static hold line whose pattern catches fewer spellings than the claim in its own pass cell | `hold-line-claim.py` (new) | **exit 1**, 7 hold lines, 38 plants, open 18 (NARROW in 7 gates) | **exit 0**, 6 hold lines, 36 plants, open 0 |
| FK-02 | a BUILD or FOLD ledger row that names a finding its wave's spec does not carry | `ledger-terminal.py`, new arm COVER | **exit 1**: COVER open 6 | **exit 0** |
| FK-02 (the cite the finding notes) | a plan file citing a LEDGER row by line number, which drifts with every inserted row | `ledger-terminal.py`, new arm LINECITE | LINECITE open 26 (32 open in all with COVER) | **exit 0**, ledger rows 825, open 0 |
| FK-03 | coverage read from the ledger row's own words | `chronic-decided.py`, arm L04-ROW reads wave specs only | **exit 1**, open 1 | **exit 0**, members 51, ledger rows 825, L04 master rows 45, open 0 |

The other sweeps, after: `reshape-order.py` exit 0 (rows 83, open 0); `borrowed-red.py` exit 0 (rows 1); `inbound-fold.py` exit 0 (ids 37); `release-gates.py` exit 0 (waves 101, band-0 loop gates {D2, D3}); `hold-line-scope.py` exit 0 (static hold lines with paths 2; it was 4, because W-0.10 G3, W-B.15 B15-G3 and W-G.2 G2-G4 now read all of `src`, and G-L1-5 is no longer a hold line); `fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` exit 0 (reads 27); `fail-open-gates.py <worktree>` exit 0 (gate rows 731, fail-open rows run 125, docket rows 20). A column count over every table in the 32 edited plan files finds 0 mismatches.

`reshape-order.py` exited 1 once mid-seat: W-G.2's new bite text named `webgl/visibility.ts`, a file W-G.1 moves. The gate reads `src`, so the path was only prose; the text now says "a `src` file outside `webgpu/`" (`waves/W-G.2.md:61`) and the sweep exits 0.

## FK-01 · H6-G3 passes a negative overshoot in any spelling but `-<n>px` first

**Class.** A static hold line passes at HEAD and earns its place by its bite. Fix-11 ruled the file axis (`hold-line-scope.py`). Nothing ruled the spelling axis: whether the pattern fails on each form of the regression its own pass cell names.

**Sweep.** `sweeps/hold-line-claim.py <root>`.
- It lists every unstruck, labelled hold line with a static span (`!`, `test`, `grep`, `git grep`, `rg`, `sed`, `awk`; no build, browser or placeholder).
- A hold line with no CLAIMS entry is OPEN UNREAD, so a new one cannot slip past.
- For each entry it appends each spelling to a tracked file, runs the gate under `bash -c` and restores the file. A claimed spelling that leaves the gate at exit 0 is NARROW. A form the cure writes that makes the gate fail is WIDE.
- A hold line that is not at exit 0 at HEAD is OPEN HEAD.
- The spellings are this seat's reading of each pass cell, recorded in the sweep with the reason for each.

**Before** (HEAD plan, `hold-line-claim.out`): 18 NARROW in 7 gates. FK-01's own instance is 6 of them; the other 12 are the same class at sites pass 11 did not name.

| gate | spellings that passed it | cure (file:line) |
|---|---|---|
| W-H.6 H6-G3 | `-2rem`, `inset:-2rem`, `0 -32px`, `calc(-1 * 32px)`, `calc(0px - 32px)`, `top: -10%` | `waves/W-H.6.md:66`. Two spans over the same six files: a negative literal length in any unit at any position (`:([^;]*[ (,])?-[0-9.]+[a-z%]`), and a `calc()` on those properties with no `var(`. The bite table names each spelling. The cure's form `calc(var(--radius-ctx) * -1)` and a custom property `--plant-inset: -4px` pass |
| W-0.10 G3 | `PopoverAnchor` re-exported from `src/index.ts`; `PopperAnchor as TooltipAnchor` from `tooltip/index.ts` | `waves/W-0.10.md:45`. The gate reads `! git grep -qE 'P(opover\|opper)Anchor' -- src`. HEAD has no such line |
| W-0.2 G3 | `var(--toggle-tint, color-mix(in oklab, var(--foreground) 40%, white))`: the old `-o` cut the fallback at its first `)` | `waves/W-0.2.md:73`. The fallback is cut at the first space or `)`, and the line passes only when it is exactly `var(--name)` or `transparent)`. §3's template reads pass. A fallback split over lines fails closed |
| W-B.15 B15-G3 | `addEventListener(` over several lines (the tree's own form, `useDockState.ts:394`), `useEventListener(window, "touchmove", …)`, a template `@wheel`, a render-function `onWheel` | `waves/W-B.15.md:42`. The gate is one multi-line `rg -U --pcre2` over `src`. It fails on each form unless the call carries `passive: true` or the handler is `.passive`. The passive multi-line form and `@wheel.passive` pass |
| W-G.2 G2-G4 | `device?.destroy()`, `gpuDevice.destroy()`, `sharedDevice.destroy()` outside `webgpu/` | `waves/W-G.2.md:61`. `([Dd]evice\|[Dd]ev\|shared\w*)\??\.destroy\(` over `src`, as W-G.2 §2's own reading already was. `texture.destroy()` passes |
| W-L.1 G-L1-5 | the glyph's `<svg>` re-drawn in `menu/DropdownMenuItem.vue`, outside the directory. The count form also passed at HEAD with the drawing in the toggle, where its pass cell says "only `DarkModeGlyph.vue` draws" | `waves/W-L.1.md:193`, now **born RED**. Two spans: the one file in the directory that draws is `DarkModeGlyph.vue`, and the one file in `src` that carries the glyph's `viewBox` (`472.39`) is `DarkModeGlyph.vue`. `:208` says so. Readings below |
| W-L.3 G-L3-9 | `@apply text-sm` in a stylesheet | `waves/W-L.3.md:89`. A second span reads `@apply` lines in `*.css`, and the first now globs `*.{vue,ts,tsx,js,mjs}`. `--control-text-sm` and a CSS comment pass. `:48` (§3 step 1) restated the pattern; it now cites G-L3-9 as the one statement |

**After:** exit 0, 6 hold lines, 36 plants. G-L1-5 prints as a NOTE: it is no longer a hold line.

**Each rewritten span, run at HEAD** in the worktree from the rendered plan text (`gates.py`):
- H6-G3: `[0, 0]`.
- W-0.10 G3, W-0.2 G3, B15-G3, G2-G4: `0` each.
- G-L3-9: `[0, 0]`.
- G-L1-5: `[1, 1]`.

**G-L1-5 with a cure planted.** The `<svg>` was moved into a new `DarkModeGlyph.vue` and the toggle rendered it: both spans exit 0. The glyph's `<svg>` was then appended to `menu/DropdownMenuItem.vue`: the second span exits 1 and the first exits 0. The second span is the one that reaches outside the directory. Both files were restored and the new file removed.

`fail-open-gates.py` runs G-L1-5 as a born-RED row and finds it RED.

## FK-02 · L04 master row 33 is folded into `#48`, whose wave does not touch it

**Cause.** The item (`layers.css:348-350` sizes `.dock-layer--full` at `width: 100%` while the dock morphs; its sibling `:344-346` is gated `:not([data-morphing])`) is a defect of the morph. #48's wave, W-I.5, strikes the words fission and Siri. W-0.8 is F-16's morph wave, and it already lists `layers.css` among its files (§4) and `L04-F27` among its F-16 members. Its §3.2 item 5 (the endpoint model: "nothing published while morphing") is this item's cure. So the item moves to W-0.8 as a row of its own. It is not described a second time in W-I.5.

**Ledger.**
- `LEDGER.md:423`: new row `L04-M33`, BUILD, W-0.8. It is a DISEASE row (2 closes, **D** in L04), decided in its family's morph wave. L04-M38's row (W-L.8, F-12's wave) is the precedent pass 11 accepted.
- `LEDGER.md:118`: `#48` no longer describes the item. It says the morph window "is `L04-M33`'s (W-0.8)".
- §9 recounted:
  - `:548`: §6 is BUILD 15, rows 63.
  - `:551`: total BUILD 500, rows 825.
  - `:553`: the recount note is updated, and the DISEASE row count is 47 (`grep`-style count of rows naming DISEASE: 46 at HEAD, 47 after).
  - `ledger-terminal.py` COUNT agrees.

**Wave W-0.8.**
- `:27`: §1 row for L04-F27 / `L04-M33`. It gives the site, BK's banked reading as L04 quotes it (56 → 0 → 157 across ≈558 ms, BK `EXECUTION-PROGRESS.md:6210-6219`), and why #48's wave was the wrong home.
- `:73`: §2 static reading.
- `:111`: §3. The item is §3.2 item 5's, and D2's converged carrier decides how the rule goes. The wave lands the ruling and builds nothing D2 has not converged on (checklist row 6).
- `:186`: G19, a new gate, **born RED**. An `awk` span over `src/components/dock/styles/*.css` fails on any rule whose subject is a dock layer, that sizes it from a dock state (a state class or `data-dock-state`), and that has no morph gate.
- `:198`: §6. The morph filmstrip's layer-swap strip records the full layer's inline size per frame: before, the dip to 0; after, no frame at 0. Real Safari stays UNMEASURED.
- `:225`: §8 closes `L04-M33`.

**G19 readings** in the worktree, all restored after:

| tree | exit |
|---|---|
| HEAD | **1** (`layers.css:349`) |
| the rule gated `:not([data-morphing])` | 0 |
| the rule struck | 0 |
| `.glass-dock.collapsed .dock-layer--summary { inline-size: 0 }` planted | 1 |
| a two-line selector list ending in `.dock-layer--full` planted | 1 |

A first draft of the span also matched `.dock-layer-group` rules and `.dock-layer--summary svg` (the subject is the svg, not the layer). The subject test was narrowed until HEAD read only `:349`.

**Wave W-I.5.**
- `:19`, the "zero-width morph window" §1 row: struck.
- `:10`: cites LEDGER `#48` and names `L04-M33` as the item's home.

**The rest of the class (COVER).** Every BUILD or FOLD ledger row whose cells name an audit or inbound id (`L..`, `R..-..-..`, `UIA-..`, `A2-..`, `KFA-..`) must have that id named in its wave's spec. A spec's abbreviated run ("UIA-V-200, -349, -367") counts as naming each id. Before: 6 open.

| ledger row | wave | id | cure |
|---|---|---|---|
| `#48` (`:118`) | W-I.5 | L04-F27 | the move above |
| `#86a` (`:207`) | W-E.2 | R2-06-15 | `waves/W-E.2.md:18`. The `contain: paint` row names R2-06-15 and its one extra case (a shadowed control seated in a card), which G4 already measures |
| `A2-FO-L2-2`, `A2-VA-L2-12`, `A2-KE-L2-15` (`:940-942`) | W-E.1 | each | `waves/W-E.1.md:20`. The F-85 row names the three ids and the steps that cover them (items 7 and 8). A2-FO-L2-2's "Configurator stage overlay slot" names no `src` surface: `git grep -n -i overlay -- src/components/configurator` hits one comment (`styles.css:297`), so that half is the consumer's |
| `A2-KE-L3-4` (`:979`) | W-0.1 | A2-KE-L3-4 | `waves/W-0.1.md:20`. The O-66a row names it and its two composites (`_shared/field/control.css:103`, `select/SelectTrigger.vue:52`, both read in the worktree). W-H.2 §1 already said it "closes with" O-66a |

The arm reads BUILD and FOLD rows only. A RETIRE row's terminal is the ledger's own decision (CURED, ANSWERED and so on), and W-B.2's reply packet states it by class.

**The line cite (LINECITE).** Pass 11 noted that W-I.5's `LEDGER:117` had become `#47b`. The sweep found 26 LEDGER line cites in the specs. 25 pointed at another row: most were one row off after earlier insertions, and W-I.1's two were 17 off (`LEDGER:577` read `UIA-KF-156`, not `UIA-KF-052`). Only W-H.5's `LEDGER:67` (`#25`) still held. A line number copies the row id and drifts, so each cite now names the row id or the section:
- `W-B.1:107`, `W-B.4:49`, `W-B.5:52`, `W-B.6:47,49`, `W-B.7:38`, `W-B.10:37`, `W-B.11:42`, `W-B.12:44`;
- `W-E.14:9`;
- `W-G.1:9`;
- `W-H.2:124`, `W-H.3:37`, `W-H.5:10,21`;
- `W-I.1:26,229`, `W-I.4:34`, `W-I.5:10,19`, `W-I.6:10,29,48`, `W-I.7:10`;
- `W-K.11:9`;
- `W-L.8:44`.

Cites into BK's own `o26-disposition/LEDGER.md` (`LEDGER.md:438`, `W-B.2.md:91`) are another file and are not read.

## FK-03 · the L04-ROW arm counts the LEDGER row's own words as coverage

**Cure.** `sweeps/chronic-decided.py`, arm L04-ROW.
- Each traced row's item must be named by the traced row's wave spec.
- The LEDGER row's text counts only for a RETIRE row with no wave, which the ledger itself decides.

**Patterns.** Rows 16, 34 and 45 needed patterns in their specs' words. Pass 11 found each covered:
- row 16: `#44 W-TAGS-FIELD`, `W-B.7.md:16`;
- row 34: `captureScreenshot`, `W-A.4.md:19`;
- row 45: `every carried row terminal`, `W-B.1.md:1`.

Row 33 is traced to `L04-M33` with `layers\.css:34[4-9]`.

**The MEMBER arm** still credits a member that a LEDGER row names. Its docstring now hands that case to COVER, which holds a member named in a BUILD or FOLD row to that row's wave spec.

**Readings.**
- The changed arm on the HEAD plan: exit 1, `L04-M33 is no LEDGER row with a terminal`.
- On the HEAD plan with fix-11's trace (`#48`) put back: exit 1, `no traced row's wave spec names the item`. That is FK-02 found by the sweep, which the old arm passed.
- After: exit 0.

## Open

1. **Real Safari is UNMEASURED** (OW-3) for every gate this seat touched.
2. **G19 is static.** The measured half of the morph window is the W-0.8 §6 filmstrip strip and the W3 morph witness. Its per-frame width reading is new with this seat and was not run: no browser. The harness under `design/` was not read (fence), so whether W3 already samples the full layer's width is unread.
3. **`hold-line-claim.py` reads static hold lines only.** Browser, harness and `$H` hold lines (for example W-0.3 G3, W-I.1 G10, W-K.7 K7-G13) are judged at their wave's base re-run, as fix-11 recorded for the run arm. Its spellings are a recorded reading of each claim: a critic can add a spelling to CLAIMS and the sweep will run it.
4. **Outside the checklist, not addressed.**
   - Pass 11's note on the 11 L04 **D** rows whose LEDGER rows carry no DISEASE word.
   - Pass 11's note on A2-G8's RED resting on its qualifier.
   - Neither was counted as a finding, and this seat added no scope for them.
5. **Earlier open items stand** as fix-11 listed them: the run arm's light-only scope, and fix-10's items 3 to 6.
