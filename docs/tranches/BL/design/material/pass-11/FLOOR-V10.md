# D3 · pass 11 · FLOOR V10: floor v9 + R-28, read under R-21 (b) (owner ruling, O-103), R-26, R-30 and H11

| field | value |
|---|---|
| seat | D3 pass 11, floor v10 (`REGISTRY.md` P10-6.3 step 2). It builds R-28 on `pass-10/floor-v9.patch` in R-28's words, proves raw identity to floor v9 in one session (R-22, R-27), runs the static checks (DEL under H8..H11; R-21's printed list under `pass-10/crit-fv10-rulings-proposed.json`, carried forward as `FV10-rulings.json`, every line re-read under R-26 and R-30 with H11-2's print; LAW, census, HOV, the ladder `diff`) and the toolchain (dist-demo before vitest), and scores the same 44 rows. No battery and no WebKit cell (R-31) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `04424ac60` (H11's bank, docs only) for the first half (12:46-13:18). The machine rebooted at 14:01 (FORMATION-PROGRESS) and the seat resumed at 14:04 with the checkout at **`0a3323db3`** (the O-103 bank); `04424ac60..0a3323db3` touches no source path, and `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing at either HEAD (`FV10-records/check.log`, `check-0a3323db3.log`), so every number below is the published 10.1.0 source plus the named patch |
| patch | **`floor-v10.patch`**: 88 files, +1004/−2338, sha1 `62f0e71f`. **`git apply --check` exits 0 at `04424ac60` and at `0a3323db3`**, in the worktree returned to HEAD and in the checkout (read only) (`check.log`, `check-0a3323db3.log`). Composition, checked byte for byte: `floor-v9.patch` (`697c5f78`) + **`floor-v10-delta.diff`** (3 files, +8/−8, sha1 `4c9f5876`) = `floor-v10.patch` (`cmp`, `patch.log`). Path list = floor v9's (`diff` exit 0). The delta equals R-28's `crit-fv10-proposed.diff` (`0976cf02`) per file, hunk ranges and every +/− line (`deltacmp.log`, exit 0 for all three files); only the file order and the header dates differ |
| owner rulings | **O-103, RULED.** When the seat began (12:46), `audit/INBOUND.md` ended at O-100 and no ruling had arrived, so the first half ran on the registry's recommended DEFAULTS, which the driver applied under the owner's 2026-10-19 order "re-deploy all workflows, no exceptions, no deferring". On resuming (14:04) the seat re-checked INBOUND and found **O-102b** (the glass owner, typed in session: value-js-01 is accepted as the owner's delegate, and its owner-answers letter rules R-21 among the rest) and **O-103** (`BK/coordination/valuejs-outbound-2026-10-19-owner-answers.md`, applied as rulings at `0a3323db3`; FORMATION-PROGRESS's 14:01 line). For D3 it rules: **R-21 (b) sealed; Q-1 (a); Q-3 (a); Q-11 (a) for chrome, with grey content accepted and reported off paper; Q-14 (a).** The letter calls Q-1, Q-3, Q-11 and Q-14 glass's design calls and objects to none of the defaults; O-103 applies them as rulings. **These rulings replace the defaults.** They match the defaults on every line but one: the default left Q-11's content clause REPORTED (unruled), and O-103 rules it **accepted**. No measurement below changes. Only the rows that close on the owner's word move (§7). **No owner variant is selected**, because every ruling is the (a) already built: `pass-4/fv3/q1c.*` and `fv3/q11b.*` stay unapplied, and R-2's deletion is not built (Q-14 (a)), so row 12 is not re-read and no browser runs |
| engines | No browser, no battery: identity held raw (§2) and no variant is selected. Every floor v9 paint verdict carries, and floor v9 carried floor v7's. R-31: the informational floor WebKit cell is retired until a specimen byte moves, so no `--exclusive webkit` admission was queued. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV10-run.sh` (every command, by phase: `setup`, `patch`, `deltacmp`, `check`, `declare`, `static`, `sweep`, `nbhd`, `seat`, `same`, `bite`, `toolchain`; after the reboot `recheck`, `seat-same`, `resume-same`, `reds`, `teardown`), `FV10-readsheet.py` (the reading sheet: every ruled line with its context, H11-2's reason and its `why`), `FV10-rulings.json` (carried), `FV10-rulings-seat.py` with `FV10-rulings-seat.json` and `FV10-rulings-seat-proposed.json` (§4.2), `FV10-seat-proposed.py` and `FV10-seat-proposed.diff` (§4.3, a proposal, not in the build), `FV10-records/` (`phases.log` carries each phase's time and load), `floor-v10.patch`, `floor-v10-delta.diff` |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p11/floor10/wt`. The edits and every patch swap happened in that worktree, each swap checked with `cmp` or a clean `git status`. Two plain reading copies (`fv10tree`, `fv10s`: `git archive HEAD` of the touched roots + the patch, applied with `GIT_DIR` pointed away) lived beside it under `floor10/`. Builds and caches lived in `$W/.d3out` and `$W/.cache-fv10`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-11/`. Nothing ran in a sibling repo. Teardown in §8 |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: `setup`, `patch`, `deltacmp`, `check`, `declare`, `static`, `sweep`, `nbhd`, `seat`, `recheck` and `teardown` under `--light` (no browser, no build); `same` and `toolchain` (`--timeout 60`), `bite`, `seat-same`, `resume-same` and `reds` (`--timeout 30`) as heavy runs, one at a time. `reds` launches the Chromium headless shell from inside `slider.size-tokens.test.ts` (its own `chromium.launch()` and `afterAll` close), so it ran as a heavy guarded run, never `--light`; nothing touched WebKit. vitest ran with `--maxWorkers=2`. No kernel-zone refusal fired. The 1-minute load ran 18.9 to 144.6 in the first half and 26.1 to 43.3 after the reboot (`phases.log`), from other sessions' work. The toolchain's vitest ran at 126-145, and its two red files were each re-run twice at about 34 (§5.1) |

Short citations: `Reg` (`REGISTRY.md`, the pass-10 part P10-0..P10-6), `H11` (`pass-11/H11.md`), `FV9` (`pass-10/FLOOR-V9.md`), `Crit` (`pass-10/D3-critique.md`). `§n` after them is their section.

---

## 0 · In brief

- **Floor v10 = floor v9 + R-28, in R-28's words and no others.** Three files (`icon-button.css`, `sizing.css`, `overlay-plate.css`), 8 lines for 8, CSS comments only, every file keeping its line count (237, 336, 431). `tab-button.css` and `triggers.css` are not in the patch (0 hunks each, `patch.log`). Nothing else was written.
- **Identity holds raw, in one session (R-22, R-27).** Floor v10, floor v9 and floor v10 again, built under one label, are identical in both outputs by `diff -rq` and sha256 list. The specimen CSS is **391,121 B, `347288745da7cf97`**, the hash pass 10 banked for floor v9; the dist-demo's 346-file sha256 list equals pass 10's banked floor v9 list (`diff` exit 0, 0 lines). HEAD built the same way differs (bite).
- **DEL under H8..H11: floor v10 PASS 101** (1,089 text files, 73 names, 0 hits); an absent root exits 2; H9's own declaration PASS 100; HEAD FAIL 89/101; floor v9 under floor v10's declaration also PASS 101 (R-28 removes no name).
- **R-21 (b): 207 lines in 54 files.** Under `FV10-rulings.json` (the critic's proposed rulings, carried byte for byte): **`PASS (207 lines: 200 ruled true, 7 reported)`**. Floor v9 under the same: **`FAIL (7 unread, 0 stale of 214 lines)`** at exactly R-28's seven lines. Floor v10 under `FV9-rulings.json`: `FAIL (0 unread, 4 stale of 207 lines)`, the four R-28 lines whose old words that file ruled.
- **The seat's R-26 / R-30 re-reading finds two more printed lines false, both written by the patch, both in R-30's ladder-relation class, both printed by H11-2:** `src/styles/tokens/property-regs.css:151` ("each rung's α, held at the bound (`--glass-bound`) … Level scales that α") and `src/components/_shared/feedback/feedback-tone.css:38` ("the rung's alpha at the bound"). Floor v10's own ladder puts quiet, overlay and sheet one step above the bound, resting two, the dialog at 1 (`tokens/glass.css:278-290`), and level scales 1 − α, not α (R-24 (ii)'s reading). Under the seat's reading the list reads **`FAIL (2 unread, 0 stale of 207 lines)`** (`sweep-fv10-seat.log`). They are not built here (R-28's words only); a measured comment delta for them is proposed (§4.3): raw-identical to floor v10, DEL PASS 101, the list `PASS (207 lines: 200 ruled true, 7 reported)` on its rulings.
- **Static:** LAW PASS 85, census `stacked=0 halo=0 blur=0 open=0` (HEAD `2/2/5/9`), HOV PASS 58, LIT the 19 inherited, ladder `diff` floor v9 to floor v10 empty.
- **Toolchain:** `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0. vitest at load 126-145: 237 files, **2317 passed, 1 failed** (`menu/contract.test.ts`, a focus-restore timing case) and one suite red on a 10 s `afterAll` hook timeout (`slider.size-tokens.test.ts`, its browser close). **Both files were re-run twice at load about 34, and both passed both times, 15/15**: the reds are **NOT-REPRODUCED**, seen only under load (§5.1).
- **The seat delta is raw-identical to floor v10** (`seat-same.log`), and floor v10 rebuilt after the reboot equals every earlier build (`resume-same.log`). All carry specimen CSS `347288745da7cf97` (§5.1).
- **Rows: 42/44 on the seat's reading** (37 in the first half, on the defaults). O-103 rules the P10-4 sheet (header), and every ruling is the (a) already built. **Rows 3, 9, N-1 and N-2 close by the ruling's text or by selection. Row 23 closes on the owner's word on Q-11's content clause, Q-3 and Q-14**, with the frames clause flagged for the critic (§7). Rows 20 and FL-12 stay **OPEN** on the route. Under R-21 (b), now the owner's ruling, they close on the list passing "under the seat's rulings as re-ruled by this pass's critic", and the seat's own rulings do not pass. If the critic rules the two lines true, floor v10 reads **44/44**. If it upholds them, floor v10 + `FV10-seat-proposed.diff` (measured: raw-identical, DEL PASS 101, the list PASS 207) is the next comment-only build, and the rows close on it.

---

## 1 · The hunks (`floor-v10-delta.diff` = R-28)

| R-28 | floor v10 line | was (floor v9) | now (R-28's words) | read true on floor v10 |
|---|---|---|---|---|
| (i) | `src/components/dock/styles/controls/icon-button.css:95` | "a translucent card-tinted fill is" | "a translucent one-ink fill is" | the hover reads `var(--dock-icon-hover-bg, var(--dock-control-hover-bg))` (`:113`); `--dock-control-hover-bg` is `color-mix(in oklab, var(--foreground) calc(var(--fill-hover) * 100%), transparent)` (`sizing.css:204`), one ink at 0.05 (`color-radius.css:160`) |
| (ii) | `:104` | "the card-tinted" | "the one-ink" | as (i) |
| (iii) | `:118-120` | "The iOS press DARKEN-plus-shrink. Press lands the / glass-darken (\`--dock-control-press-bg\`, a tier below resting) alongside / … "darken + shrink"" | "The iOS press FILL-plus-shrink. Press lands the / one-ink selected fill (\`--dock-control-press-bg\`) alongside / … "fill + shrink"" | `:122-123` paint `--dock-control-press-bg` on `:active`, which is `oklch(from var(--foreground) l c h / var(--fill-selected))` (`sizing.css:259`, 0.12 at `color-radius.css:161`); the scale-press is `:126` |
| (iv) | `src/styles/tokens/sizing.css:256-257` | "The press DARKEN, … a / brief darken rather than scaling alone." | "The press FILL, … a / brief fill rather than scaling alone." | the token is the one-ink selected rung (`:259`); "(tokens/color-radius.css §1.3)" names the FILL section (`color-radius.css:153`) |
| (v) | `src/styles/glass/overlay-plate.css:273` | "at the bound, and" | "a step above the bound, and" | the listbox takes `--glass-veil-tier: var(--glass-veil-overlay)` (`:278`), and `--glass-veil-overlay` is `calc(var(--glass-bound) + 1 * var(--glass-veil-step))` (`tokens/glass.css:282`) |

After R-28, `icon-button.css:95`, `:104`, `:118-120` and `sizing.css:256-257` carry no frozen word, so they leave the printed list (214 → 207). `overlay-plate.css:271` stays printed (word "tint") and reads true on its whole sentence `:270-274`.

**Declaration.** `declare-removed.mjs --patch floor-v10.patch` prints 73 names, 12 concepts, 5 exact only, 19 sites, as floor v9's. Against pass 10's banked `declare-floor-v9.json` only `patch` (the label) and `present` (the informational still-named list, 129 against 128) differ; `names`, `concepts`, `derived` and `exact` are identical (`declare-floor-v10.log`). The one more identifier on removed lines (192 against 191) comes from the five HEAD lines R-28 now removes; it is still named elsewhere, so it lands in `present`, which gates nothing.

---

## 2 · Identity under R-22 and R-27: raw, both outputs, one session

Floor v10, floor v9 and floor v10 again were built by `harness/build.mjs --demo` under one label (`same`) in the worktree, one after the other, each swap checked by `cmp` and each output moved aside (`same.log`, 12:57:45-12:57:54, load 18.9 → 20.8).

| output | floor v9 against floor v10 | floor v10 against floor v10, rebuilt | R-27's tie to pass 10's bank |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0; sha256 lists identical.** CSS `index-DyuSrJvX.css` **391,121 B, sha256 `347288745da7cf97`** in both | exit 0 | equals `pass-10/FV9-records/same-fv9-dist.sha256`'s CSS line (`347288745da7cf97d5dd3140ab02fc772145d45ff453594b130bdad1e3001d29`) |
| **dist-demo** (346 files) | **`diff -rq` exit 0; sha256 lists identical** | exit 0 | equals `pass-10/FV9-records/same-fv9-demo.sha256` (`diff` exit 0, 0 lines) |

The specimen JS is not cited (R-27). **The bite** (`bite.log`, 13:02:10-13:02:14, load 21.8 → 22.9): HEAD built the same way differs in both outputs (`diff -rq` exit 1: dist 5 lines, demo 261 lines); HEAD's specimen CSS is 394,891 B, `b09b9e73a61b75b1`, FV9 §2's figure. **The reading:** raw-identical outputs, so every floor v9 verdict carries; all five edits are CSS comments in non-SFC files. No battery is owed.

---

## 3 · DEL under H8..H11, and the static checks (R-21 (a))

| check (`static.log`, 12:48:13-12:48:30, load 41.5 → 44.2) | floor v10 | plant, bite or refusal |
|---|---|---|
| **DEL** (H8-1, H8-2, H9-1..H9-3, H10-1, H11-1's synchronous report), floor v10's declaration, `--patch floor-v10.patch` | **PASS 101 gated rows**, exit 0: 1,089 text files, `names=73 hits=0 sites=19 rung=4 reported=23` (`del-fv10.log`) | absent root **exit 2**, `FAIL (nothing read: the tree does not exist)` (`del-absent.log`); HEAD **FAIL 89 of 101** (`del-head.log`); floor v9 under the same PASS 101 (`del-fv9-under-fv10.log`) |
| DEL, H9's own declaration (`floor-v7.patch`, 72 names) | **PASS 100** (`del-H9decl-fv10.log`) | — |
| **LAW** | **PASS 85 gated rows** (`law.log`; FV9 read 77, H11 83: the scanned roots now hold pass-11's scripts) | the self-test plants (H11 §3) |
| **census** | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | **HEAD `stacked=2 halo=2 blur=5 open=9`, exit 1** |
| **HOV** | **PASS 58 gated rows** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited | — |
| **ladder `diff`** | `diff radii-fv9 radii-fv10` prints nothing, exit 0 | HEAD exit 1: 10/14/16/20/22 against 6/10/12/18/20 |

---

## 4 · R-21 (b): the frozen list, every line re-read under R-26 and R-30

### 4.1 · The runs (`sweep.log` 12:48:37-12:48:40, load 41.7; `seat.log` 12:55:20-12:55:27, load 29.1 → 27.9)

| run | result |
|---|---|
| floor v10, `LIST` | **207 lines in 54 files**, 82 touched files read (`sweep-fv10.log`) |
| **floor v10 under `FV10-rulings.json`** (= `pass-10/crit-fv10-rulings-proposed.json`, `cmp` equal: floor v10's bytes are the critic's cut, so no entry needed updating) | **`PASS (207 lines: 200 ruled true, 7 reported)`** (`sweep-fv10-ruled.log`; the copy tree reads the same, `sweep-fv10copy-carried.log`) |
| floor v9 under `FV10-rulings.json` (plant) | **`FAIL (7 unread, 0 stale of 214 lines)`** at `icon-button.css:95, :104, :118, :119, :120` and `sizing.css:256, :257` (`sweep-fv9-plant.log`) |
| floor v10 under `FV9-rulings.json` (H10-2's plant) | `FAIL (0 unread, 4 stale of 207 lines)`: `icon-button.css:95`, `:104`, `sizing.css:256`, `:257`, whose old words that file ruled (`sweep-fv10-under-fv9-rulings.log`) |
| **floor v10 under `FV10-rulings-seat.json`** (the seat's reading, §4.2) | **`FAIL (2 unread, 0 stale of 207 lines)`** at `feedback-tone.css:38` and `property-regs.css:151` (`sweep-fv10-seat.log`) |
| floor v10 + `FV10-seat-proposed.diff` under `FV10-rulings-seat-proposed.json` | **`PASS (207 lines: 200 ruled true, 7 reported)`** (`sweep-fv10s-seatp.log`); floor v10 under the same `FAIL (2 unread, 2 stale of 207 lines)` (plant, `sweep-fv10-under-seatp.log`) |

### 4.2 · Each line's verdict

I read every one of the 207 ruled lines with its context and its `why` (`FV10-readsheet.py`, 1,653 lines), and, for the 50 the neighbourhood print reaches (`printed-in-neighbourhood-fv10.txt`), H11-2's reason beside it (§6). The verdict of record for each line is its entry in `FV10-rulings.json`; the seat's reading differs on two lines, recorded in `FV10-rulings-seat.json`. Lines are floor v10's.

| file | lines | verdict (seat) |
|---|---|---|
| `demo/stories/compositions/auth-shell.vue` | 223 | **reported** |
| `demo/stories/dock/_frame/DockStage.vue` | 65, 71, 106, 124 | true |
| `demo/stories/feedback/progress.vue` | 63 | true |
| `demo/stories/substrates/glass-material.vue` | 6, 99, 104, 185 | true |
| `src/components/_shared/feedback/feedback-tone.css` | 4, 8, 20, 21, 25, 29, 34, 36, 38, 43, 56, 62, 64, 70, 108 | true, except **:36 reported** and **:38 FALSE, written by the patch** |
| `src/components/_shared/field/control.css` | 109, 110, 111, 138 | true |
| `src/components/_shared/menu/menu.css` | 6, 10, 117 | true |
| `src/components/button/styles.css` | 60, 67, 72, 143 | true |
| `src/components/card/styles.css` | 212 | true |
| `src/components/configurator/styles.css` | 129, 149, 444, 462 | true |
| `src/components/dialog/styles.css` | 16, 19, 67 | true |
| `src/components/dock/GlassDock.vue` | 36 | true |
| `src/components/dock/styles/controls/icon-button.css` | 5, 16, 87 | true (`:5`, §4.4) |
| `src/components/dock/styles/controls/touch-floor.css` | 7, 16, 18, 58 | true |
| `src/components/dock/styles/dock.css` | 15, 105 | true |
| `src/components/dock/styles/layer-group.css` | 160, 167, 242, 283 | true |
| `src/components/dock/styles/shape.css` | 122 | true |
| `src/components/dock/styles/shell.css` | 162, 292 | true |
| `src/components/music-staff/styles.css` | 58, 372 | true |
| `src/components/sheet/styles.css` | 320, 356, 496 | true |
| `src/components/tabs/styles/segmented.css` | 8, 11, 49, 88, 241, 242 | true |
| `src/styles/glass.css` | 116, 118 | true |
| `src/styles/glass/a11y-fallback.css` | 35 | true |
| `src/styles/glass/control-bit.css` | 177, 180 | true |
| `src/styles/glass/control-surfaces.css` | 17, 34, 108, 130, 142 | true |
| `src/styles/glass/deep.css` | 18, 69, 71 | true |
| `src/styles/glass/grasp.css` | 131 | true |
| `src/styles/glass/ladder.css` | 171, 174, 177, 189 | true |
| `src/styles/glass/liquid-fill.css` | 4, 17, 18, 22, 23, 47, 55, 61, 62, 63 | true |
| `src/styles/glass/material.css` | 95, 211 | true |
| `src/styles/glass/overlay-plate.css` | 112, 271 | true (`:271` on R-28 (v)) |
| `src/styles/glass/rim.css` | 16, 27 | true |
| `src/styles/glass/surface-axis.css` | 124 | true |
| `src/styles/glass/surfaces-pager.css` | 33, 36 | true |
| `src/styles/glass/veil.css` | 36, 40 | true |
| `src/styles/tokens/color-radius.css` | 37, 77, 93, 162, 213, 231, 245, 265, 280, 304, 335 | true |
| `src/styles/tokens/dark-arm.css` | 47, 82, 215, 216, 304, 328, 331, 334, 347, 348 | true, except **:215, :216, :331, :334, :347 reported** |
| `src/styles/tokens/glass-deep.css` | 55 | true |
| `src/styles/tokens/glass-fx.css` | 120, 147, 185 | true |
| `src/styles/tokens/glass.css` | 133, 151, 164, 166, 174, 176, 195, 218, 219, 304 | true |
| `src/styles/tokens/light-dark.css` | 12 | true |
| `src/styles/tokens/property-regs.css` | 114, 115, 122, 123, 130, 151, 185, 197, 219 | true, except **:151 FALSE, written by the patch** |
| `src/styles/tokens/scale-paper.css` | 69, 70, 73, 82, 101, 137, 152, 158, 216, 248 | true |
| `src/styles/tokens/shadow.css` | 50, 51, 53, 54, 96, 103, 127, 143 | true |
| `src/styles/tokens/sizing.css` | 22, 32, 33, 40, 153, 212, 214, 218, 219, 233, 321 | true |
| `src/styles/utilities/base.css` | 299 | true |
| `tests/components/button/Button.test.ts` | 382 | true |
| `tests/components/custom/dock/GlassDock.posture.test.ts` | 153 | true |
| `tests/components/field/forms-seam.test.ts` | 159 | true |
| `tests/components/ui/surface/Surface.test.ts` | 162, 164 | true |
| `tests/gates/feedback-tint-seam.test.ts` | 1, 7, 19, 21, 121 | true |
| `tests/styles/contrast-computed.test.ts` | 260, 414, 947, 984, 988 | true |
| `tests/styles/glass-subtlety.test.ts` | 96, 184, 342 | true |
| `tests/styles/proportion-register.test.ts` | 149, 294, 295 | true |

Tally on the seat's reading: **198 true, 7 reported, 2 false** (207). The 7 reported are the carried ones: `auth-shell.vue:223`, `feedback-tone.css:36`, `dark-arm.css:215, :216, :331, :334, :347`, each false at HEAD in a clause the patch did not write.

### 4.3 · False, and written by the patch: two ladder-relation lines (R-30)

Both lines print, both are `+` lines of the patch (HEAD said something else), and both state a relation to the bound that floor v10's own ladder contradicts. Floor v10's ladder (`tokens/glass.css:275-290`, and the floor's own `ladder.css:10-16` table, "α is `--glass-bound` plus whole steps of `(1 − bound) / 3`, so no rung sits under the bound"): wash, floating, chassis, dock and crown **at** the bound; quiet, overlay and sheet **one step above**; resting **two**; the dialog **1**. It is the class Crit A-3 found at `overlay-plate.css:271-273` and MS8 §4.3 at the minor's `ladder.css:297` ("at the bound" for a rung above it), which R-28 (v) and R-29 rewrite.

| line | the sentence | the false clause | floor v10 | HEAD |
|---|---|---|---|---|
| **`src/styles/tokens/property-regs.css:151`** (word "sampled"; H11-2: `carries "bound"`) | `:150-153` "Legibility rides the SEPARATE `--glass-veil-*` axis: each rung's α, held at the bound (`--glass-bound`), with nothing sampled from the backdrop. Level scales that α and the blur; …" | (1) "each rung's α, held at the bound": six of the eleven rungs sit above it. (2) "Level scales that α": the plate's α is `1 − (1 − rung)·level` (`glass/veil.css:64-72`), so level scales 1 − α, not α; R-24 (ii) rewrote `a11y-fallback.css:34-35` for the same reason ("the level IS that α" → "the level scales its transmission") | as left | HEAD: "Over-light legibility rides the SEPARATE `--glass-veil-*` axis: level = opacity+blur, tint = darken-over-light. …" The patch wrote `:150-151` |
| **`src/components/_shared/feedback/feedback-tone.css:38`** (word "tint"; H11-2: `sentence of :39`) | `:37-39` "A `.feedback-tone` surface that composes a rung therefore tints ITS OWN rung: the rung's alpha at the bound and `--glass-level` both survive INSIDE the mix …" | "the rung's alpha at the bound", said of any composed rung. It holds for the one shipped consumer, Toast, which composes `glass-floating` (at the bound; `toast/Toast.vue:23`), and not for a `.feedback-tone` on quiet, resting or overlay. Under R-26 the general clause decides | as left | HEAD: "the earned-darken clamp, the tier ink and `--glass-level` all survive INSIDE the mix". The patch wrote `:38-39` |

**Why every earlier reader passed them.** FV9 ruled them true in pass 10 (":151 each veil rung's α is held at the bound with nothing sampled"; ":38 … α and level surviving inside the mix"), and the pass-10 critic read the lines naming a re-valued token, the lines above its declarations and the dock-control families (Crit §3.2), not every "bound" sentence. Neither names a token whose value changed. H11-2 prints both (§6), which is what R-30 asks the reading to use.

**Not built here.** R-28 is the build, in its words only. **Proposed measured comment delta** (`FV10-seat-proposed.diff`, 2 files, +3/−3, sha1 `df5ce784`; `FV10-seat-proposed.py`, each edit matched once, line counts kept):

- `property-regs.css:150-151`: "each rung's α, held at the / bound (`--glass-bound`), with nothing sampled from the backdrop. Level scales that α" → "each rung's α, held at or / above the bound (`--glass-bound`), with nothing sampled. Level scales the rung's 1 − α" (the sentence continues "and the blur; …" unchanged).
- `feedback-tone.css:38`: "the rung's alpha at the" → "the rung's alpha at or above the".

Measured on floor v10 + the delta: the list **`PASS (207 lines: 200 ruled true, 7 reported)`** under `FV10-rulings-seat-proposed.json` (the two lines re-ruled `true` with a `why` per clause), floor v10 red under the same at the two lines; **DEL PASS 101** (`del-fv10s.log`); the neighbourhood print unchanged in size (1,593 lines); byte proof in `seat-same.log` (§2's same worktree and label): see §5.1. The words reuse R-29's "at or above the bound".

### 4.4 · Readings the critic should check (R-26: the instrument cannot)

- **`icon-button.css:5`**, "the iOS press DARKEN-plus-shrink" (HEAD text, byte-identical). I rule it true on the file's own split: the press has a DARKEN leg, the `filter: brightness(calc(1 − press_t · 0.04))` deepen (`:87-92`), which darkens in both themes, and the shrink (`:126`). R-28 renamed the `:active` fill section (`:118`) FILL-plus-shrink, so the header now names the other leg. If the critic reads `:5` as naming the press's net paint, its dark half is false (the fill lifts a dark ground, Crit A-2) and was false at HEAD too (HEAD's press bg stepped 7 % toward the cream dark ink), so it is `reported` at worst, not a gating line.
- **Stale clauses inside carried `why` texts** (not printed lines; no sweep reads a `why`). The shared `why` on `icon-button.css:5, :16, :87` still says ":95, :104 the hover fill is a translucent card-tinted fill", and the shared `why` on the `sizing.css` lines says ":256-257 the press darken …". Both describe lines that R-28 rewrote and that left the list; each is false of floor v10. The task carries the rulings byte for byte where the bytes did not change, so I left them; the next rulings file should drop those clauses.
- **`ladder.css:189`** ("the quiet content plate lands L≈0.28; a tone-tinted / selected chip plate lands L≈0.30-0.35", dark): HEAD text, a recorded measurement. Floor v10's dark quiet plate is `--card` (L 0.2949, `dark-arm.css:95`) at bound + 1 step over the dark page, which lands near 0.28 by arithmetic; I did not measure paint. True as recorded.
- **`property-regs.css:151` and `feedback-tone.css:38`** (§4.3): the critic may read "held at the bound" as "anchored on the bound" and Toast as the sentence's only referent. On R-26's every-clause reading, and on A-3's precedent, I read both false.

### 4.5 · A find outside both lists (R-21's carve-out)

`icon-button.css:94` and `:110` ("reads as a glass surface", "ONE glass-translucent hover fill") now describe a 5 % ink fill; they carry no frozen word and print in neither list. Read as adjectives they hold; recorded for the landing docs pass, not a row. `tab-button.css:75` and `triggers.css:85` stay as P10-5 placed them.

---

## 5 · Toolchain (`toolchain.log`, 13:05:35-13:18:40)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 13:05:46, 19.0 |
| `vite build` (library) | exit 0 | 13:05:55, 20.3 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 13:06:07, 20.6 |
| `vite build`, the dist-demo config (before the units) | exit 0 | 13:06:09, 20.6 |
| `vitest run --maxWorkers=2` | 237 files: **235 passed, 2 red**; tests **2317 passed, 1 failed**, 10 expected-fail, 1 skipped (2329). Red: `tests/components/menu/contract.test.ts` › "keeps the click branch to one portaled menu and restores focus on execute" (1,221 ms), and the `tests/components/slider.size-tokens.test.ts` suite on `afterAll` "Hook timed out in 10000ms" (`await browser?.close()`, its own headless browser) | 13:18:40, **144.6** (the 1-minute load climbed from 19.7 to 145 during the run, other sessions' work) |

Floor v10's specimen and dist-demo are floor v9's bytes, and floor v9 read 2318/0 on the same tests (FV9 §5). The source the units import differs from floor v9's by CSS comments only.

### 5.1 · Re-runs and the seat delta's byte proof (after the 14:01 reboot, same worktree)

| phase | command | result | when, load (1 min) |
|---|---|---|---|
| `recheck` | `git apply --check floor-v10.patch` at `0a3323db3` (checkout, read only) and in the worktree at HEAD; the non-docs diff `04424ac60..0a3323db3` | exit 0, exit 0; the diff prints nothing; the worktree is `floor-v10.patch` by `cmp` (`check-0a3323db3.log`) | 14:04:22, 43.3 |
| **`seat-same`** | floor v10 + `FV10-seat-proposed.diff`, built by `harness/build.mjs --demo` under the label `same` in the `same` phase's worktree, compared raw with that phase's floor v10 output | **dist `diff -rq` exit 0, demo `diff -rq` exit 0**; specimen CSS 391,121 B `347288745da7cf97` (`seat-same.log`). The delta was reversed after the build, and the worktree read `floor-v10.patch` by `cmp` | 14:07:57, 26.1 |
| **`resume-same`** | floor v10 rebuilt under the same label after the reboot (`fv10c`), compared raw with the pre-reboot `fv10`, `fv10b` and the seat delta's `fv10s` | **six `diff -rq`, all exit 0** (dist and demo, against each of the three); specimen CSS 391,121 B `347288745da7cf97` (`resume-same.log`). This gives the seat delta's proof a partner built in the same boot as well as in the same worktree | 14:10:05, 34.1 |
| **`reds`**, run 1 | `vitest run --maxWorkers=2 tests/components/menu/contract.test.ts tests/components/slider.size-tokens.test.ts` on floor v10 | exit 0, **Test Files 2 passed (2), Tests 15 passed (15)** (`reds-run1.log`) | 14:18:50, 33.6 |
| **`reds`**, run 2 | the same | exit 0, **Test Files 2 passed (2), Tests 15 passed (15)** (`reds-run2.log`) | 14:18:54, 34.9 |

**The reading.** Both red files pass on both re-runs at load about 34. They failed once, at load 126-145, on a 1,221 ms focus-restore case and a 10 s browser-close hook. They are **NOT-REPRODUCED**: seen only under load. With floor v9's 2318/0 on the same bytes, row 11 holds. The seat delta is raw-identical to floor v10, so as a comment-only build it carries every paint verdict too.

---

## 6 · H11-2's print (R-30's reading aid)

`neighbourhood.mjs --root <floor v10> --patch floor-v10.patch` (`neighbourhood-fv10.log`, `nbhd.log`): 82 touched files; **53 re-valued declarations of 48 tokens** (as floor v9: R-28 re-values nothing); 7 aliases; rung names `chassis, dialog, floating, overlay, quiet, resting, wash` and "bound"; **`PRINT (1593 lines in 73 files; not gated)`**, `declared=76 fallback=7 alias-prose=11 relation=405`. Floor v9 through the same printer: 1,597 lines, `relation=406`. The only line keys that differ are `icon-button.css:118-121` (`nbhd`'s diff: 4 lines gone), the sentence R-28 (iii) rewrote out of the "resting" rung name.

**P10-1.1's six lines on floor v10:** `icon-button.css:95`, `:104` still print, through (b) (the block above `var(--dock-icon-hover-bg, var(--dock-control-hover-bg))`, `:113`), and now read "one-ink", true; `:118-120` no longer print; `sizing.css:256-257` print through (a) (above the `--dock-control-press-bg` declaration, `:259`) and read "FILL … a brief fill", true; `overlay-plate.css:271-273` print through (c) and read "a step above the bound", true.

**The printed list against the print:** 50 of the 207 printed lines are in the print (`printed-in-neighbourhood-fv10.txt`). The seat read each with its reason; the two false lines of §4.3 are among them (`property-regs.css:151` `[carries "bound"]`, `feedback-tone.css:38` `[sentence of :39]`, `:39` `[carries "bound"]`). The other "bound" and rung sentences on the list read true against floor v10's ladder: `veil.css:36` ("no rung is thinner than the bound"), `surfaces-pager.css:33-36` (floating = the bound), `dock.css:14-15` (both dock endpoints = `--glass-veil-dock` = the bound), `GlassDock.posture.test.ts:153` (the chrome bound), `deep.css:71`, `glass-deep.css:55`, `Surface.test.ts:162-164` (history, past tense), `ladder.css:171-189` (§4.4), `feedback-tint-seam.test.ts:1` ("BOUND here", the gate's binding, another sense).

---

## 7 · The 44 rows (floor v10; under O-103's owner rulings, which replace the driver's defaults; no variant selected)

The source of record for each carried status is Crit §6, as Reg P10-1.1 adopted it. Floor v10's specimen and dist-demo are floor v9's bytes (§2, §5.1), so every paint row carries. The owner rows read against Reg P10-4's "answering it closes" column and P10-6.4. Each (a) that O-103 rules has been built since pass 4 or 7 and is floor v10's own bytes, so P2-6.3's "built to it" holds with no build.

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried on outputs raw-identical in one session (§2), re-read raw after the reboot (§5.1). Row 11 (release): §5 and §5.1, the reds NOT-REPRODUCED. Row 19: DEL HEAD 89/101, the absent root exits 2, H11's plants (H11 §3). Row 22: census 0, HEAD `2/2/5/9`, LIT the 19 inherited (§3) | — |
| **3** | M-1x | **PASS (closed by ruling)** | O-103: Q-11 (a) for chrome. (a) closes by its text (Reg P10-4); light chrome off paper reads grey, REPORTED and accepted | — (O-103, Q-11 chrome) |
| 6 | M-3 | **PASS** | carried: H7-1, Chromium light Close ring 3.52 | — |
| **9** | M-6 | **PASS (closed by ruling)** | O-103: Q-1 (a). (a) closes by selection with no build (Reg P10-4): `--q1 a` PASS 88/88 in both engines (Chromium and Playwright WebKit) on floor v7's bytes, which are floor v10's | — (O-103, Q-1) |
| **20** | prose sweep of every touched file | **OPEN** | R-21 (a)'s half holds: DEL at 0, PASS 101 (§3). Under R-21 (b), the owner's ruling, R-28 is built, its seven lines read true, and the carried rulings PASS 207. The seat's R-26 / R-30 reading finds `property-regs.css:151` and `feedback-tone.css:38` false, both written by the patch (§4.3), so the list under the seat's rulings reads `FAIL (2 unread, 0 stale of 207 lines)` | route, under R-21 (b): **this pass's critic re-rules the two lines.** If it rules them true, the rows close on floor v10. If it upholds them false, floor v10 + `FV10-seat-proposed.diff` is the next comment-only build, and the rows close on it. It is measured: raw-identical (§5.1), DEL PASS 101, the list PASS 207 |
| **23** | gestalt, O-62 frame | **PASS (closed by ruling; one clause flagged)** | O-103: Q-11's content clause, grey content **accepted**, reported off paper; Q-3 (a); Q-14 (a). These are the three answers Reg P10-4 names for row 23, and its shortest path closes row 23 "on the owner's word". **Flagged:** P10-6.4 adds "and accepts the frames", and neither O-103 nor the letter names the glance frames (Reg P10-4's list). This seat reads "grey content accepted" and Q-14 (a) as accepting exactly what those frames show: no specimen pixel has moved since pass 7, so the frames are floor v10's paint. If the critic or the agglomeration reads the frames clause as unmet, row 23 stays open on the owner's word over the frames, and the counts below drop by one | — (O-103: Q-11 content, Q-3, Q-14) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried on raw-identical specimens | — |
| **FL-12** | prose sweep of every touched file | **OPEN** | as row 20 | as row 20 |
| **N-1** | Q-1's ruling built | **PASS (closed by ruling)** | Q-1 (a) ruled, and (a) is built (floor v10's bytes) | — (O-103, Q-1) |
| **N-2** | Q-11's ruling built | **PASS (closed by ruling)** | Q-11 (a) for chrome ruled, and (a) is built; `pass-4/fv3/q11b.*` not selected | — (O-103, Q-11 chrome) |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | carried (Reg P10-3); the minor v9 is step 3's | — |

**Count on the seat's reading: 42 PASS, 2 OPEN = 0.955** (41/44 if row 23's frames clause is read unmet). In the first half of this seat, on the driver's defaults, it was 37/44, Reg P10-1.1's count. **Closed this pass by O-103's rulings: 3, 9, 23, N-1, N-2. Opened: none.** **Route-owned open rows: 2** (20, FL-12). **Waiting only on the owner: 0** (1, row 23, if its frames clause is read unmet).

**R-21 is now the owner's (b).** Rows 20 and FL-12 close on a comment-only build raw-identical to its predecessor, DEL at 0, and the list passing under the seat's rulings as re-ruled by this pass's critic. A false printed line found after that is fixed in the next comment-only build or the landing docs pass, and does not reopen the rows. The seat's two lines are found before the close, not after it, so the critic's re-ruling decides between floor v10 and floor v10 + the seat delta, and either way the rows close in this pass. For the record, the other answers the owner did not choose would read differently. Under (a), any later reader's false line would reopen the rows. Under (c), they would return to P7-6.3's open-ended reading.

### 7.1 · Which owner ruling closes each row that was owner-gated

| row | the ruling | how, on floor v10 |
|---|---|---|
| **3** M-1x | **Q-11, chrome clause: (a)** (O-103) | closed by its text; no build. (b) would have selected `pass-4/fv3/q11b.*` and returned R-31's WebKit cell and the full battery, which is not ruled |
| **9** M-6 | **Q-1: (a)** (O-103) | closed by selection: `--q1 a` PASS 88/88 in both engines on floor v10's bytes |
| **23** gestalt, O-62 frame | **Q-11 content clause: accepted; Q-3: (a); Q-14: (a)** (O-103) | closed on the owner's word with no build. Grey content accepted, so C″'s re-trigger (c) does not fire. Q-14 (a) leaves R-2's deletion unbuilt, so row 12 is not re-read. Q-3 (a) fires no banked family's re-trigger. One clause is flagged: "accepts the frames" (above) |
| **N-1** | **Q-1: (a)** | as row 9 |
| **N-2** | **Q-11, chrome clause: (a)** | as row 3 |
| **20**, **FL-12** | **R-21: (b)** (O-103) sets the reading. The close is the route's | this pass's critic re-rules §4.3's two lines (above) |

**Convergence (Reg P10-6.5).** O-103 settles R-21 and answers the whole sheet, so the owner-gated fixed point (39/44) is passed by: no row waits on the owner except row 23's frames clause, if the critic reads it unmet. Floor v10 reaches **44/44** when this pass's critic rules `property-regs.css:151` and `feedback-tone.css:38` true. If the critic upholds them, the next comment-only build (floor v10 + `FV10-seat-proposed.diff`) closes the rows under R-21 (b). A clean pass 11 at 44/44, followed by a clean pass 12, converges D3 (two consecutive clean passes).

---

## 8 · Handed on, and teardown

| to | what |
|---|---|
| **the critic** (P10-6.3 step 4) | (1) R-28 word for word (§1; `floor-v10-delta.diff` = `crit-fv10-proposed.diff` per file). (2) The raw byte proof and R-27's tie (§2), with the post-reboot rebuild (§5.1). (3) **`property-regs.css:151` and `feedback-tone.css:38`, read as false and written by the patch (§4.3). These are the lines that keep rows 20 and FL-12 open on the seat's reading**, with the measured delta (raw-identical, `seat-same.log`). (4) §4.4's readings: `icon-button.css:5`, the stale clauses in two carried `why` texts, `ladder.css:189`. (5) The vitest reds, NOT-REPRODUCED twice (§5.1). (6) **Row 23's frames clause** (§7). (7) The 42/44 count under O-103 |
| the minor v9 (step 3) | If the minor's patch writes the same sentences in its own `property-regs.css` and `feedback-tone.css` lines, they are the same class. I did not read the minor. Q-11's content clause is now ruled accepted, so W-0.1 G1's 48-of-66 off-paper grey reads as accepted, not REPORTED (Reg P10-3.3 item 2) |
| the landing docs pass | §4.5's find; the seven `reported` lines; P10-5's carve-out list, unchanged |
| the agglomeration | O-103's D3 answers, applied here as owner rulings that replace the defaults (header). In this seat's first half (12:46-13:18) the record carried them as the driver's defaults, and no measurement differs between the two readings |

**Teardown** (`teardown`, 14:19:31, load 40.8). `git worktree remove --force .claude/worktrees/bl/D3/p11/floor10/wt`, then `git worktree prune` and `rm -rf` of `.claude/worktrees/bl/D3/p11/floor10/`, with the reading copies `fv10tree`, `fv10s`, `r28` and the builds and caches under `wt/`. Afterwards `git worktree list` holds 0 `D3/p11/floor10` entries, and `.claude/worktrees/bl/D3/` holds `p3 p5 p6`, other seats' trees left untouched. `p11/` was removed once empty. No server, browser or background process was left running.
