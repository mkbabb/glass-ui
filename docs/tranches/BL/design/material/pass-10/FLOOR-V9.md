# D3 · pass 10 · FLOOR V9: floor v8 + R-24, read under R-21, R-26 and H10

| field | value |
|---|---|
| seat | D3 pass 10, floor v9 (`REGISTRY.md` P9-6.2 step 2). It builds R-24 on `pass-9/floor-v8.patch` in R-24's words, proves raw identity to floor v8 in one session (R-22, R-27), runs the static checks (DEL under H8, H9 and H10; R-21's printed list, every line ruled under R-26 with H10-2's `verdict`; LAW, census, HOV, the ladder `diff`) and the toolchain, queues P9-5's one informational WebKit cell, and scores the same 44 rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `7020e2757` (H10's bank, docs only). The check phase's `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`FV9-records/check.log`), so every number below is the published 10.1.0 source plus the named patch |
| patch | **`floor-v9.patch`**: 88 files, +999/−2333, sha1 `697c5f78`. **`git apply --check` exits 0 at `7020e2757`**, in the worktree returned to HEAD and in the checkout (read only) (`check.log`). Composition, checked byte for byte: `floor-v8.patch` (sha1 `0d104e63`) + **`floor-v9-delta.diff`** (3 files, +6/−6, sha1 `1f9190a2`) = `floor-v9.patch` (`cmp`, `patch.log`). The path list equals floor v8's (`diff` exit 0) |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-9 registry (506) are the pass-10 launch (507) and nothing more. No ruling on Q-1, Q-3, Q-11 (either clause), Q-14, or R-21. The P9-4 defaults apply, and floor v8 already builds each one. **No variant is selected** (`pass-4/fv3/q1c.*` and `fv3/q11b.*` stay unapplied), nothing is built for an owner option, and R-2's deletion is not built, so row 12 is not re-read |
| engines | No battery: identity held raw (§2), and no owner option was selected (P9-6.2 step 2). Every floor v8 paint verdict carries, and floor v8 carried floor v7's. One informational **Playwright WebKit** cell (P9-5), §6. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV9-run.sh` (every command, by phase: `patch`, `check`, `declare`, `static`, `del-h9decl`, `sweep`, `same`, `bite`, `toolchain`, `wk-dlg`, `dlg-read`, `teardown`), `FV9-r24-edits.py` (the three edits, each matched exactly once, line counts kept), `FV9-rulings.py` and `FV9-rulings.json` (R-21 (b)'s rulings, every entry with `verdict`), `FV9-records/` (`phases.log` carries each phase's time and load, `admissions.log` the WebKit queue, `printed-lines-written-by-patch.txt` and `value-changes-vs-printed.txt` the two reads behind §4.2), `floor-v9.patch`, `floor-v9-delta.diff` |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p10/floor9/wt`. The edits and every patch swap happened in that worktree, each swap checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-fv9`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-10/`. Nothing ran in a sibling repo. Teardown in §8 |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: the worktree add, `patch`, `check`, `declare`, `static`, `del-h9decl`, `sweep` and the rulings generator under `--light` (no browser, no build); `same` (`--timeout 60`), `bite` (`--timeout 30`) and `toolchain` (`--timeout 60`) as heavy runs, one at a time, no browser; the WebKit capture under `--exclusive webkit --timeout 60`, its own admission, with its witnesses `--light` outside the lock. vitest ran with `--maxWorkers=2`. No kernel-zone refusal fired. The 1-minute load ran 24.3 to 70.3 over the phases (`phases.log`), from other sessions' work. No timing is read here, and no red paint cell exists to re-run |

Short citations: `Reg` (`REGISTRY.md`, the pass-9 part P9-0..P9-6), `H10` (`pass-10/H10.md`), `FV8` (`pass-9/FLOOR-V8.md`), `Crit` (`pass-9/D3-critique.md`), `WK` (`pass-8/WEBKIT-OWED.md`). `§n` after them is their section.

---

## 0 · In brief

- **Floor v9 = floor v8 + R-24's three comment rewrites, in R-24's words.** Three files, 6 lines for 6, CSS comments only. No value, name, selector, markup or assertion moves. Nothing else was written.
- **Identity holds raw, in one session (R-22, R-27).** Floor v9, floor v8 and floor v9 again, built under one label, are identical in both outputs by `diff -rq` and sha256 list. The specimen CSS is **391,121 B, `347288745da7cf97`** in both, which is the hash pass 9 banked for floor v8. The dist-demo has 346 files, and its sha256 list equals pass 9's banked floor v8 list (`diff` exit 0). Every floor v8 paint verdict carries, so no battery is owed.
- **DEL under H8, H9 and H10:** floor v9 **PASS 101** (1,089 text files, 73 names, 0 hits). An absent root **exits 2**, `FAIL (nothing read: the tree does not exist)` (H10-1). Under H9's own declaration: **PASS 100**. HEAD under floor v9's declaration and patch: **FAIL 89/101**. Floor v8 under the same also reads PASS 101: R-24 removes no name, so DEL cannot tell the two apart, and R-21 (b) is the instrument that moves.
- **R-21 (b) prints 214 lines in 54 files.** I read every one with the sentence it belongs to and checked each clause that names a mechanism, value, count or line against the floor v9 tree, and against HEAD where a clause was false. **205 true, 6 reported, 3 false**, so the ruled sweep reads **`FAIL (3 unread, 0 stale of 214 lines)`**. The three are `src/components/dock/styles/controls/icon-button.css:118-120`, one sentence, which calls `--dock-control-press-bg` "a tier below resting". The patch changed that token to the one-ink selected rung and left the sentence (§4.2). R-24's last sentence sends it to the critic, so it is not in this build.
- **R-24's own lines read true** (§1, §4.1). Floor v8 under floor v9's rulings: `FAIL (6 unread, 3 stale of 214 lines)`, which is R-24's plant red at its three lines plus the same three `icon-button.css` lines.
- **Static:** LAW PASS 77, census `stacked=0 halo=0 blur=0 open=0` (HEAD `2/2/5/9`), HOV PASS 58, LIT the 19 inherited, ladder `diff` floor v8 to floor v9 empty.
- **Toolchain:** `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, vitest **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v8: 2318).
- **Rows: 37/44**, unchanged from floor v8. Rows 20 and FL-12 stay **OPEN** under R-21 (b), now on `icon-button.css:119` and not on `surfaces-pager.css:33`. The five owner rows are unchanged. **The fixed point is not reached** (Reg P9-6.4's third case).
- **The WebKit cell is owed again.** It queued in its own `--exclusive webkit` admission and was not admitted before the seat had to return. The wait was 3 min 19 s, stopped before any browser launched (§6). It holds nothing.

---

## 1 · The hunks (`floor-v9-delta.diff`), and the declaration

| R-24 | floor v9 line | was (floor v8) | now (R-24's words) | what makes it true |
|---|---|---|---|---|
| (i) | `src/styles/glass/surfaces-pager.css:33-34` | "with no ink, clamp or oklab mix; only \`--card\` differs between / them. \`--glass-level\` defaults to 1, so the pill paints the" | "with no ink, clamp or oklab mix. / \`--glass-level\` defaults to 1, so the pill paints the" | The sentence now ends "…with no ink, clamp or oklab mix." `glass-plate` is `color-mix(in srgb, var(--card) calc((1 − (1 − rung)·level)·100%), transparent)` (`veil.css:64-72`), and the pill's `.dark` arm is its box-shadow only (`:59-63`). No clause replaces the struck one |
| (ii) | `src/styles/glass/a11y-fallback.css:34-36` | "…\`--card\` at α and the level IS that α. The / separate tint-darken this bracket used to add was a second writer pushing the / same plate the same direction. */" | "…\`--card\` at α and the level scales its / transmission: 1 − α = (1 − rung) · level. The separate tint-darken this bracket / used to add was a second writer pushing the same plate the same direction. */" | `glass-plate`'s α is 1 − (1 − rung)·level (`veil.css:64-72`), which rearranges to 1 − α = (1 − rung)·level. The following sentence is unchanged; three lines reflowed to three |
| (iii) | `src/components/dock/styles/dock.css:15` | "The shell + adaptive-legibility partials re-point" | "The shell partial re-points" | `shell.css:20` declares `--dock-surface-blur` on `.glass-dock`, and `:96`, `:98` point the plate's two tier endpoints at `--glass-veil-dock`. The adaptive-legibility partial declares neither (its header, `:4-7`) |

**Declaration.** This build writes R-24's three rewrites and nothing else. It reflows only `a11y-fallback.css:34-36` and `surfaces-pager.css:33-34`, keeping each comment's line count, so no line below an edit moves and no site entry moves. No owner option is selected, and no variant file is applied. The false sentence I found (§4.2) is not edited: R-24 says "any further printed line it reads false goes to the critic under R-26, not into the build".

**DEL's declaration** (`declare-floor-v9.{json,log}`): `declare-removed.mjs --patch floor-v9.patch` prints the same line as floor v8's (191 identifiers on removed lines, 63 absent, 12 concepts, **73 names**, 5 exact only, 19 sites, 9 of them homonym sites). Built from `floor-v8.patch` on the same tree, it is **IDENTICAL**. Against pass 9's banked `declare-floor-v8.json`, only `patch` (the label) and `present` (the informational still-named list, whose counts read the tree) differ. `concepts`, `derived`, `exact` and `names` are identical.

---

## 2 · Identity under R-22 and R-27: raw, both outputs, one session

Floor v9, floor v8 and floor v9 again were each built by `harness/build.mjs --demo` under one label (`same`) in the worktree, one after the other. Each swap was checked by `cmp`, and each output was moved aside before the next build (`same.log`, 19:27:19-19:27:31, load 24.4 → 24.3).

| output | floor v8 against floor v9 | floor v9 against floor v9, rebuilt | R-27's tie to pass 9's bank |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0; sha256 lists identical.** CSS `index-DyuSrJvX.css` **391,121 B, sha256 `347288745da7cf97`** in both | exit 0 | the specimen CSS hash equals `FV8-records/same-fv8-dist.sha256`'s (`347288745da7cf97d5dd3140ab02fc772145d45ff453594b130bdad1e3001d29`) |
| **dist-demo** (346 files) | **`diff -rq` exit 0; sha256 lists identical** | exit 0 | the sha256 list equals `FV8-records/same-fv8-demo.sha256` (`diff` exit 0, 0 lines) |

Under R-27 the specimen JS is not cited: it carries a path-dependent byte.

**The bite** (`bite.log`, 19:27:50-19:27:54, load 31.4 → 38.9): HEAD built the same way under the same label differs from floor v9 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 261 lines). HEAD's specimen CSS is 394,891 B, `b09b9e73a61b75b1`, the figure FV8 §4 printed.

**The reading.** The outputs are raw-identical, so every floor v8 verdict carries. All three edits are CSS comments in non-SFC files, which the minifier strips. No battery ran. None is owed: no owner option was selected, and identity held.

---

## 3 · DEL under H8, H9 and H10, and the static checks (R-21 (a))

| check (`static.log` 19:28:01-19:28:11, load 53.2 → 60.8; `del-h9decl.log` 19:28:18, load 70.3) | floor v9 (the fixture) | plant, bite or refusal |
|---|---|---|
| **DEL** (H8-1, H8-2, H9-1..H9-3, H10-1), floor v9's declaration, `--patch floor-v9.patch` | **PASS 101 gated rows**, exit 0: 1,089 text files in scope, `names=73 hits=0 sites=19 rung=4 reported=23` (`del-fv9.log`) | **H10-1:** the same call on an absent root **exits 2**, `FAIL (nothing read: the tree does not exist)` (`del-absent.log`). **Bite:** HEAD under the same declaration and patch, **FAIL 89 of 101** (`del-head.log`), FV8's HEAD figure. Floor v8 under the same: PASS 101 (`del-fv8-under-fv9.log`). R-24 removes no name, so DEL does not separate the two; R-21 (b) does (§4) |
| DEL, **H9's own declaration** (from `floor-v7.patch`, 72 names), `--patch floor-v7.patch` | **PASS 100** (`del-H9decl-fv9.log`), as floor v8 read | — |
| **LAW** | **PASS 77 gated rows** (`law.log`). It scans one more file than H10's run (76), because a file was added under the scanned roots since | the self-test plants (H10 §4) |
| **census** | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | **HEAD: `stacked=2 halo=2 blur=5 open=9`, exit 1** |
| **HOV** | **PASS 58 gated rows** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited, none added | — |
| **ladder `diff`** | `diff radii-fv8 radii-fv9` prints nothing, exit 0 | `diff radii-head radii-fv9` exit 1: HEAD 10/14/16/20/22 against 6/10/12/18/20 |

---

## 4 · R-21 (b): the frozen list, every line ruled under R-26

`prose-sweep.mjs --root <floor v9> --patch floor-v9.patch --declare declare-floor-v9.json` prints **214 lines in 54 files** (`sweep-fv9.log`, `LIST`), with 82 touched files read. The list comes from `sweep-frozen.json`'s 9 words, the declaration's 73 names and the changed ladder. I read each line with the whole sentence it belongs to. Where a clause names a mechanism, a value, a count or a line number, I checked it against the floor v9 tree. Where a clause was false, I also checked HEAD, to tell `reported` from false. Two reads guided where to look: the 20 printed lines the patch itself writes (`printed-lines-written-by-patch.txt`), and the 8 printed lines that name one of the 48 tokens whose declared value the patch changes (`value-changes-vs-printed.txt`). One ruling per line went into `FV9-rulings.json`. The `why` for each file names, line by line, what makes each clause true.

| run (`sweep.log`, 19:40:36-19:40:38, load 48.2) | result |
|---|---|
| floor v9 under pass 9's `FV8-rulings.json` (H10-2's real plant) | **`FAIL (3 unread, 3 stale of 214 lines)`**, exactly R-24's three lines: `dock.css:15` (stale `reported`), `a11y-fallback.css:35` and `surfaces-pager.css:33` (stale `true`), each also unread |
| **floor v9 under `FV9-rulings.json`** | **`FAIL (3 unread, 0 stale of 214 lines)`**: `true=205 reported=6 unread=3`. The three unread are `icon-button.css:118, :119, :120` (§4.2) |
| floor v8 under `FV9-rulings.json` (R-24's plant) | **`FAIL (6 unread, 3 stale of 214 lines)`**: R-24's three lines, plus the same three `icon-button.css` lines |

### 4.1 · Each line's verdict

Each line is **true** unless the last column names it. The ruling of record for each line is its `why` in `FV9-rulings.json`. Lines are floor v9's.

| file | lines | verdict |
|---|---|---|
| `demo/stories/compositions/auth-shell.vue` | 223 | **reported** (§4.3) |
| `demo/stories/dock/_frame/DockStage.vue` | 65, 71, 106, 124 | true |
| `demo/stories/feedback/progress.vue` | 63 | true |
| `demo/stories/substrates/glass-material.vue` | 6, 99, 104, 185 | true |
| `src/components/_shared/feedback/feedback-tone.css` | 4, 8, 20, 21, 25, 29, 34, 36, 38, 43, 56, 62, 64, 70, 108 | true, except **:36 reported** (§4.3) |
| `src/components/_shared/field/control.css` | 109, 110, 111, 138 | true |
| `src/components/_shared/menu/menu.css` | 6, 10, 117 | true |
| `src/components/button/styles.css` | 60, 67, 72, 143 | true |
| `src/components/card/styles.css` | 212 | true |
| `src/components/configurator/styles.css` | 129, 149, 444, 462 | true |
| `src/components/dialog/styles.css` | 16, 19, 67 | true |
| `src/components/dock/GlassDock.vue` | 36 | true |
| `src/components/dock/styles/controls/icon-button.css` | 5, 16, 87, 95, 104, 118, 119, 120 | true, except **:118, :119, :120 false, unruled** (§4.2) |
| `src/components/dock/styles/controls/touch-floor.css` | 7, 16, 18, 58 | true |
| `src/components/dock/styles/dock.css` | 15, 105 | true; **:15 is R-24 (iii)** (§1, §4.4) |
| `src/components/dock/styles/layer-group.css` | 160, 167, 242, 283 | true |
| `src/components/dock/styles/shape.css` | 122 | true |
| `src/components/dock/styles/shell.css` | 162, 292 | true |
| `src/components/music-staff/styles.css` | 58, 372 | true |
| `src/components/sheet/styles.css` | 320, 356, 496 | true |
| `src/components/tabs/styles/segmented.css` | 8, 11, 49, 88, 241, 242 | true |
| `src/styles/glass.css` | 116, 118 | true |
| `src/styles/glass/a11y-fallback.css` | 35 | true; **R-24 (ii)** |
| `src/styles/glass/control-bit.css` | 177, 180 | true |
| `src/styles/glass/control-surfaces.css` | 17, 34, 108, 130, 142 | true (:142, §4.4) |
| `src/styles/glass/deep.css` | 18, 69, 71 | true |
| `src/styles/glass/grasp.css` | 131 | true |
| `src/styles/glass/ladder.css` | 171, 174, 177, 189 | true |
| `src/styles/glass/liquid-fill.css` | 4, 17, 18, 22, 23, 47, 55, 61, 62, 63 | true |
| `src/styles/glass/material.css` | 95, 211 | true |
| `src/styles/glass/overlay-plate.css` | 112, 271 | true |
| `src/styles/glass/rim.css` | 16, 27 | true |
| `src/styles/glass/surface-axis.css` | 124 | true |
| `src/styles/glass/surfaces-pager.css` | 33, 36 | true; **:33 is R-24 (i)** |
| `src/styles/glass/veil.css` | 36, 40 | true |
| `src/styles/tokens/color-radius.css` | 37, 77, 93, 162, 213, 231, 245, 265, 280, 304, 335 | true (:213, :231, §4.4) |
| `src/styles/tokens/dark-arm.css` | 47, 82, 215, 216, 304, 328, 331, 334, 347, 348 | true, except **:215, :331, :334, :347 reported** (§4.3) |
| `src/styles/tokens/glass-deep.css` | 55 | true |
| `src/styles/tokens/glass-fx.css` | 120, 147, 185 | true |
| `src/styles/tokens/glass.css` | 133, 151, 164, 166, 174, 176, 195, 218, 219, 304 | true |
| `src/styles/tokens/light-dark.css` | 12 | true |
| `src/styles/tokens/property-regs.css` | 114, 115, 122, 123, 130, 151, 185, 197, 219 | true |
| `src/styles/tokens/scale-paper.css` | 69, 70, 73, 82, 101, 137, 152, 158, 216, 248 | true (:101, §4.4) |
| `src/styles/tokens/shadow.css` | 50, 51, 53, 54, 96, 103, 127, 143 | true |
| `src/styles/tokens/sizing.css` | 22, 32, 33, 40, 153, 212, 214, 218, 219, 233, 256, 257, 321 | true |
| `src/styles/utilities/base.css` | 299 | true |
| `tests/components/button/Button.test.ts` | 382 | true |
| `tests/components/custom/dock/GlassDock.posture.test.ts` | 153 | true |
| `tests/components/field/forms-seam.test.ts` | 159 | true |
| `tests/components/ui/surface/Surface.test.ts` | 162, 164 | true |
| `tests/gates/feedback-tint-seam.test.ts` | 1, 7, 19, 21, 121 | true |
| `tests/styles/contrast-computed.test.ts` | 260, 414, 947, 984, 988 | true |
| `tests/styles/glass-subtlety.test.ts` | 96, 184, 342 | true |
| `tests/styles/proportion-register.test.ts` | 149, 294, 295 | true |

### 4.2 · False, and made false by the patch: `icon-button.css:118-120`

The sentence (`:118-121`): "Press lands the glass-darken (`--dock-control-press-bg`, a tier below resting) alongside the existing scale-press, so a tap reads "darken + shrink" (C4-INV-4 was scale-only)."

- **The false clause is "`--dock-control-press-bg`, a tier below resting" (`:119`).** On floor v9 the token is `oklch(from var(--foreground) l c h / var(--fill-selected))` (`sizing.css:259`). The patch's own comment above it says "The one-ink SELECTED rung … ink over the control, never a plate colour" (`sizing.css:257-258`). A tier is a plate rung, so "a tier below resting" names a plate that the token no longer is.
- **It was true at HEAD.** HEAD declares the token as `color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%)`, the resting plate stepped toward ink. HEAD's comment calls it "a tier BELOW resting". The `icon-button.css` line is byte-identical at HEAD (`grep -F` count 1). So the patch changed the token and left the line. That is neither R-26's `reported` (which needs the clause false before the patch) nor true.
- **Why the rows stay open.** The line prints on "darken", inside R-21 (b). R-21 passes the rows only when every printed line is ruled true or reported, and its carve-out covers only finds outside both lists. `:118` and `:120` belong to the same sentence, so under R-26 their rulings read the same false clause. All three are left unruled, and the sweep prints them unread.
- **Not built here.** R-24: "Any further printed line it reads false goes to the critic under R-26, not into the build." The next build's words are the agglomeration's to fix (Reg P9-6.4's third case). One wording that would be true on floor v9: "(`--dock-control-press-bg`, the one-ink selected rung over the control)".
- **Why passes 8 and 9 missed it.** FV8's file reading for `icon-button.css` read the press leg as live, which it is. It did not read the parenthesis against the token's new value, and neither did the critic (Crit §3.3 lists the lines it read in context). The token is one of the 48 whose value the patch changes, and this is one of the 8 printed lines that name one of them (`value-changes-vs-printed.txt`).

### 4.3 · Reported: six lines false at HEAD that the patch did not write

Each line is byte-identical at HEAD (`grep -F` count 1 for each) and is not among the lines the patch writes. Each carries `verdict: "reported"` and gates nothing. They go to the landing docs pass with H10 §3.1's ten minor lines.

| line | the false clause | what the tree says |
|---|---|---|
| `demo/stories/compositions/auth-shell.vue:223` | "darkened from the light-mode \`38%\` lightness" | the light muted ink is `--neutral-5` = `hsl(30 22% 40%)` (`color-radius.css:45`, `:97`), 40 %, at HEAD and on floor v9 |
| `src/components/_shared/feedback/feedback-tone.css:36` | "glass/veil.css:35-37 names …" | the phrase is at `veil.css:40` on floor v9 and at `:46` at HEAD. Without the line numbers the claim is true |
| `src/styles/tokens/dark-arm.css:215` | "clamps L UP to its 0.34 ceiling" | dark `--foreground` is `hsl(30 14% 90%)` (`:86`), so `clamp(0.28, l, 0.34)` brings a high L down to 0.34 |
| `src/styles/tokens/dark-arm.css:331` | "the 9-rung chip/hairline/divider scale" | `--surface-tint-*` declares 11 rungs in both arms (4/6/8/10/12/15/18/22/25/40/70), 11 at HEAD |
| `src/styles/tokens/dark-arm.css:334` | "literal ×12" | as `:331` |
| `src/styles/tokens/dark-arm.css:347` | "the SAME 12-rung α ladder" (the sentence opens at `:346`) | as `:331` |

### 4.4 · Readings the critic should check (R-26: the instrument cannot)

- **`dock.css:15`, R-24 (iii).** I rule it true on R-24's cited reading. On `.glass-dock` the shell declares `--dock-surface-blur` (`shell.css:20`) and points both plate tiers at `--glass-veil-dock` (`:96`, `:98`). The plate inherits them (`dock.css:108-112`). The veil rungs are declared on `:root, .dark` (`tokens/glass.css:256-257`), so a dark scope reaches the plate with no dock re-author. The shell declares no `--glass-veil-*` name itself. "re-points the … `--glass-veil-*` tokens" is true when it means the tier tokens the shell points at a `--glass-veil-*` rung. If the critic reads it as "declares `--glass-veil-*` names", the line is false and the patch wrote it.
- **`scale-paper.css:101`**, "the SELECTED glass-tinted fill". The patch changed the recipe from 88 % `--primary` over `--glass-plate-floating` to 88 % over `transparent` (`:106`) and rewrote `:103-105` ("no plate colour is read"), where it also cut HEAD's "filled glass disc" to "filled disc". It left `:101`. I rule `:101` true: the fill transmits 12 %, which carries the glass it sits on. The patch's own cut of "glass" two lines below is the case for reading it false; if the critic does, the line is false and the patch made it so, as in §4.2.
- **`control-surfaces.css:142`**, "the same `--surface-tint-15` lift". The trigger takes `--surface-tint-15` (`:147`). The pill took the same lift and has since moved off it (`:34`, which says so). The sentence is true as history, and the line is byte-identical at HEAD.
- **`color-radius.css:213`, `:231`**, "the 36+ raw … sites", "the 9 raw … sites". These are the counts of sites the rungs were minted for, a provenance figure. The tree holds the rungs (`:217-229`, `:235-236`). Today 30 raw `var(--foreground) N%, transparent` mixes and 2 raw `var(--muted) N%, transparent` mixes remain in `src/`. The tree neither confirms nor contradicts the minting count.

### 4.5 · A find outside both lists (R-21's carve-out: reported, does not reopen the rows)

`src/styles/tokens/glass.css:149-150`: "the `--card` plate stepped a whisper DARKER toward the warm `--foreground` ink". On floor v9 the well pole steps toward `--glass-well-toward` (`:160-161`), which is `--foreground` in light and `--background` in the dark arm (`dark-arm.css:274`). So the clause holds for the light arm only, and the comment below it (`:156-158`) states both arms. The line carries no frozen word and no declared name, so it does not print.

---

## 5 · Toolchain (`toolchain.log`, 19:37:51-19:40:07)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 19:38:05, 37.3 |
| `vite build` (library) | exit 0 | 19:38:18, 38.4 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 19:38:33, 38.9 |
| `vite build`, the dist-demo config (before the units) | exit 0 | 19:38:36, 38.4 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v8: 2318) | 19:40:07, 28.1 |

---

## 6 · The informational WebKit cell (P9-5; P9-6.2 step 2)

**Owed again, not read. It holds nothing.** The cell (`FV9-run.sh wk-dlg`: floor v9's `same` specimen, dialog scene, both themes, Playwright WebKit, one browser for the run, then `dlg-read` `--light` outside the lock) was queued as its own `guarded --exclusive webkit --timeout 60` admission at 19:40:18 (load 29.8). It never got the lock: `adm-wk-dlg.out` reads only "[guarded] waiting for the 'webkit' lock". At 19:43:37 (load 32.0), after 3 min 19 s, the workflow required this seat to return. I stopped the waiter before it was admitted, so no WebKit browser of mine launched (`admissions.log`). The wait never reached 90 minutes, so this is an early stop and not a 90-minute timeout.

**What it would read:** the floor WebKit dialog Close ring on fresh pixels (WK: light 3.07 / dark 4.30, M-3 PASS 42, on floor v7). Floor v9's specimen is byte-identical to floor v8's and floor v7's (§2), so a later WebKit seat can run `FV9-run.sh same`, then `wk-dlg` and `dlg-read`, which diff against `pass-8/WK-records`. No row depends on this cell: WebKit is informational for M-3, and row 6 is carried on Chromium. **Real Safari: UNMEASURED (owner's safaridriver checkbox).**

---

## 7 · The 44 rows (floor v9; defaults applied, no variant selected)

The source of record for each carried status is Crit §4, as Reg P9-1.1 adopted it. Floor v9's specimen and dist-demo are floor v8's bytes (§2), so every paint row carries.

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried from Crit §4 on outputs raw-identical in one session (§2). Row 11 (release): this seat's toolchain (§5). Row 19: DEL's bite reds HEAD 89/101, the absent root exits 2 (H10-1), and the paint plants carry on byte-identical specimens. Row 22: census 0, HEAD `2/2/5/9`, LIT the 19 inherited (§3) | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper. `var-q11b` 21/21 on record, both engines | **owner, Q-11 chrome clause** |
| 6 | M-3 | **PASS** | carried: H7-1, Chromium light Close ring 3.52 (Crit §4). §6 is informational | — |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` PASS 88/88 in both engines | **owner, Q-1** |
| **20** | prose sweep of every touched file | **OPEN** | R-21 (a) holds: DEL with H8, H9 and H10 at 0, PASS 101 (§3). R-21 (b) does not: `icon-button.css:119` prints and is false, made false by the patch (§4.2), so the ruled sweep reads `FAIL (3 unread, 0 stale of 214 lines)`. R-24's three lines are true (§1, §4.1), and A-1 is closed | route: **the next comment-only build** (`icon-button.css:118-120`), under R-21 and R-26; the critic confirms |
| 23 | gestalt, O-62 frame | OPEN | unchanged: floor v9 moves no specimen pixel (§2) | **owner: Q-11 content clause, Q-3, Q-14**, with the frames (Reg P9-4) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried on raw-identical specimens; FL-15's `plant-darkperim` FAIL 47/87 in Playwright WebKit (WK §2) | — |
| **FL-12** | prose sweep of every touched file | **OPEN** | as row 20 | as row 20 |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` (FAIL 2/96, both engines) | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | carried (Reg P9-3). The minor v8 is step 3's | — |

**Count: 37 PASS, 7 OPEN = 0.841.** **Closed this pass: none. Opened: none.** **Route-owned open rows: 2** (20, FL-12). **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2). The counterexample moved from a line the build wrote (A-1, cured) to a line the build did not write but made false (§4.2).

### 7.1 · Which owner ruling closes each still-open row

| row | the ruling that closes it | how, on floor v9 |
|---|---|---|
| **3** M-1x | **Q-11, chrome clause** | (a) closes it by its text, with no build. (b) closes it by selecting `pass-4/fv3/q11b.*` (M-1x 21/21 on record). Floor v9 is then no longer byte-identical and owes the full battery in both engines |
| **9** M-6 | **Q-1** | (a) closes it by selection: `--q1 a` reads PASS 88/88 in both engines on floor v7's bytes, which are floor v9's. (c) has no passing build (`--q1 c` FAIL 2/96, the `retune-bg` dark room) and needs a room-only reading and a room value |
| **23** gestalt, O-62 frame | **Q-11 content clause + Q-3 + Q-14**, with the frames | the owner's word over the frames in Reg P9-4. With "content grey accepted off paper", Q-3 (a) and Q-14 (a), it closes with no build. Q-11 content "not accepted" has no measured candidate and fires C″'s re-trigger (c). Q-14 (b) is built as R-2's deletion in the dark arm and re-reads row 12. Q-3 (c) re-reads every banked family's re-trigger |
| **N-1** Q-1's ruling built | **Q-1** | as row 9: (a) is built, so the ruling closes it |
| **N-2** Q-11's ruling built | **Q-11, chrome clause** | as row 3: (a) is built; (b) is the variant |
| **20**, **FL-12** | **none: route-owned** | the next comment-only build rewrites `icon-button.css:119`'s parenthesis (§4.2). **R-21 beside the sheet** is the one owner word that bears on them: an override would return them to P7-6.3's open-ended reading |

**The fixed point (Reg P9-6.4).** It is not reached on this seat's reading: rows 20 and FL-12 are open on a printed line. This is P9-6.4's third case, and it says: "the next build is again comment only, in words the agglomeration fixes, and the R-21 line beside the sheet becomes the owner's to settle before any pass after it." If the critic rules `icon-button.css:119` true, floor v9 reads 39/44 with only the five owner rows open. That is the owner-gated fixed point.

---

## 8 · Handed on, and teardown

| to | what |
|---|---|
| **the critic** (step 4) | (1) R-24's three rewrites word for word (§1; `floor-v9-delta.diff`, 3 files, +6/−6). (2) The raw byte proof and R-27's tie (§2). (3) **`icon-button.css:118-120`, read false and made false by the patch (§4.2): the line that keeps rows 20 and FL-12 open.** (4) The six `reported` lines (§4.3), each false at HEAD in a clause the patch did not write. (5) §4.4's four readings, above all `dock.css:15`, which the patch wrote. (6) §4.5's find outside both lists. (7) H10-1's absent-root refusal on floor v9's declaration (§3). (8) The 37/44 count |
| the minor v8 (step 3) | `minor-split-v7.patch` also changes `--dock-control-press-bg` (to a `light-dark(…)` value) and does not touch `icon-button.css`, so the minor's sweep does not print `:119`. Whether the clause holds over the minor's value is a find outside its lists (R-21's carve-out). `dark-arm.css:215, 331, 334, 347` and `auth-shell.vue:223` are HEAD-stale, so any tree that prints them reads them `reported` |
| the landing docs pass | the six `reported` lines (§4.3), `glass.css:149-150` (§4.5), and H10 §3.1's ten minor lines. `dock.css:15` leaves the tally: R-24 (iii) is built |
| the owner | Reg P9-4's sheet, unchanged, with R-21 beside it. No new frame is owed: floor v9 moves no pixel |

**Teardown** (`phases.log`): `git worktree remove --force` of `.claude/worktrees/bl/D3/p10/floor9/wt` and `git worktree prune`. `.claude/worktrees/bl/D3/p10/floor9/` is removed, and so is the then-empty `p10/`. `git worktree list` shows no `D3/p10` entry, and `git status --porcelain -- src demo tests` prints nothing. The stopped WebKit waiter launched no browser, and no process of this seat is left running.
