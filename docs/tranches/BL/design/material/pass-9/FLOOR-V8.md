# D3 · pass 9 · FLOOR V8: floor v7 + R-20, measured under H9 and R-21

| field | value |
|---|---|
| seat | D3 pass 9, floor v8 (`REGISTRY.md` P8-6.2 steps 2 and 4). It builds R-20 on `pass-8/floor-v7.patch`, reads R-21's frozen list line by line, proves identity under R-22, runs the static checks and the toolchain, and reads P8-5's one informational WebKit cell. It scores the same 44 rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `03d93d55c` (H9's bank, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`FV8-records/check.log`), so every number below is the published 10.1.0 source plus the named patch |
| patch | **`floor-v8.patch`**: 88 files, +999/−2333, sha1 `0d104e63`. **`git apply --check` exits 0 at `03d93d55c`**, both in the worktree returned to HEAD and in the checkout (read only) (`check.log`). Composition, checked byte for byte: `floor-v7.patch` (sha1 `4a1e09c8`) + **`floor-v8-delta.diff`** (7 files, +25/−25) = `floor-v8.patch` (`cmp`, `patch.log`). The path list equals floor v7's (`diff` exit 0): every edited file was already touched |
| owner rulings | **None.** `audit/INBOUND.md` still ends at O-98. `FORMATION-PROGRESS.md`'s D3 lines after the pass-8 close are the pass-9 launch (line 500) and nothing more; line 501 is a D5 bank. No ruling on Q-1, Q-3, Q-11 (either clause), Q-12, Q-13 or Q-14. The P8-4 defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) for chrome with content REPORTED, Q-14 (a). Floor v7 already builds every default. **No variant is selected** (`pass-4/fv3/q1c.*` and `fv3/q11b.*` stay unapplied), nothing is built for an owner option, and R-2's deletion is not built, so row 12 is not re-read |
| engines | No battery: identity held raw (§4), so every floor v7 paint verdict carries (P8-2.2's thin-build rule). Chromium 149 gated and Playwright WebKit 26.5 paint-only, as read by FV6 §5, the pass-7 critic and WK. One informational **Playwright WebKit** cell (P8-5), §6. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV8-run.sh` (every command, by phase: `patch`, `check`, `declare`, `static`, `del-h9decl`, `sweep`, `same`, `bite`, `toolchain`, `wk-dlg`, `dlg-read`, `teardown`), `FV8-r20-edits.py` (the edits, each matched exactly once, line counts kept), `FV8-rulings.py` and `FV8-rulings.json` (R-21 (b)'s rulings), `FV8-records/` (`phases.log` carries each phase's time and load; `admissions.log` the WebKit queue), `floor-v8.patch`, `floor-v8-delta.diff` |
| fences | No tracked source edited in the checkout, and no git write in it beyond `git worktree add` / `remove` for `.claude/worktrees/bl/D3/p9/floor8/wt`. The edits and every patch swap happened in that worktree, each swap checked with `cmp` or a clean `git status`. Builds and caches lived in `$W/.d3out` and `$W/.cache-fv8`. The only writes in the checkout are under `docs/tranches/BL/design/material/pass-9/`. Nothing ran in a sibling repo. Teardown in §8 |
| machine law | Every phase ran through `~/.claude/guard/guarded` as the literal command word: the worktree add, `patch`, `check`, `declare`, `static`, `del-h9decl`, `sweep`, and `teardown` under `--light` (no browser, no build); `same` (`--timeout 60`), `bite` (`--timeout 30`) and `toolchain` (`--timeout 60`) as heavy runs, one at a time, no browser; the one WebKit capture under `--exclusive webkit --timeout 60`, its own admission, with its witnesses `--light` outside the lock. vitest ran with `--maxWorkers=2`. The kernel-zone refusal never fired. The 1-minute load ran 12.4-19.3 over the measuring phases (`phases.log`). No red cell exists to re-run |

Short citations: `Reg` (`REGISTRY.md`, the pass-8 part), `H9` (`pass-9/H9.md`), `FV7` (`pass-8/FLOOR-V7.md`), `Crit8` (`pass-8/D3-critique.md`), `WK` (`pass-8/WEBKIT-OWED.md`). `§n` after them is their section.

---

## 0 · In brief

- **Floor v8 = floor v7 + R-20's four sentences + three more comment rewrites that R-21's frozen list printed and this seat read false (a departure, §1.2).** Seven files, 25 lines for 25, CSS comments and one HTML template comment. No value, name, selector, markup or assertion moves.
- **Identity holds raw (R-22's first branch).** Floor v7 and floor v8, built under one label, are identical in both outputs by `diff -rq` and sha256 list: specimen CSS **391,121 B `347288745da7cf97`**, dist-demo 346 files. The normalised compare also reads 0 of 338. So no Chromium dock bite is owed, and every floor v7 paint verdict carries. `GlassDock.vue` has no `<style>` block, so the template-comment edit hashes no scoped id, and Vue strips the comment.
- **DEL under H8 and H9: floor v8 PASS 101** (the declaration built from `floor-v8.patch`, 73 names); **floor v7 under the same declaration and patch: FAIL 6 of 101**, at A-1's seven lines plus `feedback-tone.css:22`. Under H9's own declaration (built from `floor-v7.patch`, 72 names): floor v8 **PASS 100**, as H9 banked for its stand-in.
- **R-21's frozen list prints 214 lines in 54 files on floor v8. I read each one with its context and rule all 214 true** (`prose-sweep.mjs --rulings FV8-rulings.json`: **`PASS (214 lines, each ruled true)`**). Floor v7 under the same rulings: **`FAIL (13 unread, 3 stale of 224 lines)`**, and the 13 unread lines are exactly the delta's lines.
- **Static:** LAW PASS 72, census `stacked=0 halo=0 blur=0 open=0` (HEAD `2/2/5/9`, exit 1), HOV PASS 58, LIT the 19 inherited, ladder `diff` floor v7 to floor v8 empty (HEAD's 10/14/16/20/22 against 6/10/12/18/20 bites).
- **Toolchain:** `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, vitest **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v7: 2318).
- **Rows:** the seat scores **39/44**. Rows 20 and FL-12 close under R-21. Open: **3, 9, 23, N-1, N-2, all owner-only.** That is P8-6.4's owner-gated fixed point, if the critic confirms it.
- **The WebKit cell is owed again.** It queued in its own `--exclusive webkit` admission but was never admitted before this seat had to return (a 2 min 45 s wait, stopped before any browser launched; §6). It holds nothing.

---

## 1 · The hunks (`floor-v8-delta.diff`)

### 1.1 · R-20, as ruled (P8-2.2)

| R-20 | floor v8 line | was (floor v7) | now | why |
|---|---|---|---|---|
| (i) | `src/styles/glass/surfaces-pager.css:29-36` | "The element-level oklab TINT seam (NOT the raw … token …). At the `--glass-level: 0` default this is the no-op floor (`X, src 0%) ≡ X` … under `.dark` the tint arm LIFTS it toward luminous warm-dark, never a charcoal slab. `in oklab` is the glass-tint perceptual family (the in-srgb …" | "The pill applies `glass-plate` at the floating rung: one `--card` pole composed at the ELEMENT (NOT the raw pre-substituted `--glass-plate-floating` :root token — the gray-hole substitution-trap). The composition is the same in both themes, with no ink, clamp or oklab mix; only `--card` differs between them. `--glass-level` defaults to 1, so the pill paints the floating rung's chrome-bound veil (the in-srgb …" | R-20 (i)'s own terms. `glass-plate` is `color-mix(in srgb, var(--card) calc((1 − (1 − rung)·level)·100%), transparent)` (`veil.css:64-74`); `--glass-level` is registered with `initial-value: 1` (`property-regs.css:154-158`). The pill's `.dark` arm is its box-shadow only (`:54-59`), so the plate composition is the same in both themes. `--glass-plate-floating` is still a live token (`utilities/components.css:22`) |
| (ii) | `src/components/dock/GlassDock.vue:467-469` (HTML template comment) | "the `.dock-search-field` surface reads the tint seam (dock/search.css) so the active field reads ≥4.5:1 over the backdrop (the no-pale-fade legibility floor)." | "the `.dock-search-field` surface reads the bound dock/search.css composes at the element (≥4.5:1, the bound), so the active field holds the no-pale-fade legibility floor over the backdrop." | `dock/search.css:3-9` on floor v7: "(≥4.5:1, the bound) … composes its plate at the ELEMENT — `@apply glass-plate`". Quoted in that file's own words, as R-20 (ii) rules |
| (iii) | `src/components/dock/styles/index.css:79-83` | "(the active-field tint legibility seam + the `.glass-menu-row` result rows) … CONSUMES the tint seam + the menu-row recipe, re-authors neither." | "(the active field, which holds the bound, ≥4.5:1, + the `.glass-menu-row` result rows) … CONSUMES `glass-plate` + the menu-row recipe, re-authors neither." | the same bound, for the file that imports `search.css`. `search.css` applies `glass-plate` and consumes `.glass-menu-row`, so "consumes … re-authors neither" is now literally true of both |
| (iv) | `src/styles/tokens/glass-deep.css:12-14` | "the calm ladder then moved to 10/14/16/20/22px and the LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay paints 22" | "the calm ladder (the `--glass-blur-*-radius` rungs) then retuned and the LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay then painted 22" | the history stays in the past tense; the ladder is named by its tokens, not a tuple (P-3). The 20 → 16 LERP is the predecessor's history, and "then painted 22" dates the 22 |
| (iv) | `src/styles/tokens/glass-deep.css:54` | "the calm ladder has since moved to 10/14/16/20/22px, so the LERP ran" | "the calm ladder then retuned (the `--glass-blur-*-radius` rungs), so the LERP ran" | the line no longer says the ladder "has since moved to" HEAD's values. `:55` ("the plain overlay painted 22") is past tense and stays; the rung reading prints it for R-21 (b) and §3 rules it |

R-20 (iv) needs no site entry: neither rewrite keeps the old tuple, so the tuple arm reads 0 there (`del-H9-fv8.log`). Every edit keeps its comment's line count, so no line below an edit moves, and H9's line-keyed site entries (none of which is in these files) stay where they were.

### 1.2 · R-21 (b): three lines the frozen list printed, read false and rewritten (a departure, recorded for the critic)

R-21 (b) passes the rows when "every line (b) prints has been read and ruled true **or rewritten**", and H9 §6.1 hands the floor v8 seat that reading ("a line ruled false is rewritten and drops out of the list"). R-20's last sentence says "No other sentence is rewritten by the seat; a further find goes to the pass-9 critic under R-21." The two collide when the list prints a false line. I rewrote the three I read false, on FV7's precedent (FV7 §1.2 and §1.1's extra line, both upheld by Crit8 §2.3: the alternative leaves, or exempts, a false sentence, E-2). Each names the patch's deleted veil ink or clamp as live. All three are CSS comments in non-SFC files, so they cannot move a byte of either output (§4). **If the critic strikes them, floor v8 minus these three hunks is floor v7 + R-20 alone, and R-21 (b) then holds three false lines: rows 20 and FL-12 would stay open on them.**

| # | floor v8 line | was (floor v7, unchanged from HEAD) | now | why it was false on floor v7 |
|---|---|---|---|---|
| (v) | `src/components/_shared/feedback/feedback-tone.css:20-22` | "the SAME `color-mix(in oklab, <rung bg>, <tint> <strength>)` seam the `--glass-veil-*` legibility lift and the `--veil-bg` plate already run — ZERO new compositing path" | "`color-mix(in oklab, <rung bg>, <tint> <strength>)` over the rung's own published `--glass-veil` — one mix, ZERO new compositing path, no second plate" | No `--glass-veil-*` token runs an oklab mix toward a tint on floor v7: the plate is the srgb `--card` mix (`veil.css:64-74`, `tokens/glass.css:138-143`), and the "legibility lift" was the deleted veil ink and clamp. `--veil-bg` is declared nowhere in `src/`. What the rule does is `:80-84`, `color-mix(in oklab, var(--glass-veil, …), var(--tone) …)`. The patch edits `:38-40` of this header and left `:20-22`, A-1 #1's shape. Removing the line also makes `declare-removed.mjs` declare `--veil-bg` (absent from the tree), so DEL now reds floor v7 there (§2) |
| (vi) | `src/styles/glass/a11y-fallback.css:33-36` | "the firmer plate and the legibility lift are the same move, because the plate is ink over the card escape and the level IS the mix." | "the firmer plate is the whole move, because the plate is `--card` at α and the level IS that α." | Floor v7's plate has no ink: "paints ONE pole — the plate is `--card` at α, with no ink token and no luma term" (`glass-subtlety.test.ts:184`, which passes). "The separate tint-darken this bracket used to add" stays: it is history. The patch edits `:43` of this file |
| (vii) | `src/styles/tokens/glass-fx.css:1` | "grain/specular/edge-light, the tint source, the decorative …" | "grain/specular/edge-light, the capsule warm floor, the decorative …" | The patch cut HEAD's "the adaptive tint-source + backdrop-luma bucket" to "the tint source" and deleted what it named (`--glass-backdrop`, `--glass-backdrop-luma-knee`). The file declares no tint source on floor v7; the one chromatic source it holds is the capsule warm floor (`:106-114`, "an explicitly WARM oklch source") |

**Read and ruled true, not rewritten, though close:** `dock/styles/dock.css:15` ("The shell + adaptive-legibility partials re-point the inheriting `--dock-surface-blur`/`--glass-veil-*` tokens"). The re-point is live, by `shell.css:96-98`; the attribution to `adaptive-legibility.css` is wrong on HEAD and on floor v8 alike (neither version of that partial declares a `--glass-veil-*` token), so it names no mechanism the patch deleted. It goes to the landing's docs pass with Crit8's list, and R-20's "no other sentence" keeps it out of this build. `property-regs.css:123`'s "TINT (whole-plate legibility, the veil)" is Crit8 §5.2's ruled label, kept.

---

## 2 · The declaration, DEL under H8 and H9 (R-21 (a))

`declare-removed.mjs --patch floor-v8.patch --root <floor v8> --concepts harness/deletes-floor.json --exact pass-9/H9-exact-floor.json` (`declare-floor-v8.{json,log}`):

`DECLARE floor-v8.patch: 191 identifiers on removed lines · 63 absent from the patched tree (declared: token 10, …) · 12 concepts · 73 names, 5 exact only, 19 sites (9 homonym)`

It equals H9's declaration (72 names) plus one: `--veil-bg`, which floor v8's rewrite (v) removes from a removed line and the tree names nowhere (`declare-floor-v7-on-fv8.json` against `declare-floor-v8.json`: the one name). H9's exact list is used unchanged: its 19 sites each still exempt a hit on floor v8, so none is stale.

| check (`static.log`, `del-h9decl.log`; 18:06:58-18:09:05, load 17.9-18.3) | floor v8 (the fixture) | plant or bite |
|---|---|---|
| **DEL under H8-1, H8-2 and H9-1..H9-3**, floor v8's declaration, `--patch floor-v8.patch` | **PASS 101 gated rows**, 0 hits, 1,089 text files in scope. Every homonym and tuple site exempts a hit; REPORTED 23 (`del-H9-fv8.log`) | **floor v7 under the same declaration and patch: FAIL 6 of 101** (`del-H9-fv7-plant.log`): `tint seam` at `GlassDock.vue:467`, `dock/styles/index.css:83`, `surfaces-pager.css:29`; `tint arm` `:34`; `oklab tint` `:29`; `tint legibility seam` `index.css:80`; `--veil-bg` `feedback-tone.css:22`; the tuple at `glass-deep.css:12`, `:54`. A-1's seven lines are H9's plant one for one; the eighth line is rewrite (v) |
| DEL, **H9's own declaration** (built from `floor-v7.patch`, `H9-records/declare-floor-v7-on-fv8.json`), `--patch floor-v7.patch` | **PASS 100** (`del-H9decl-fv8.log`): the rows H9 banked on its stand-in (H9 §0), read on the real wording | floor v7 under it: FAIL 5 of 100 at A-1's seven lines (`H9-records/del-H9-fv7.log`) |
| the rung reading (printed, not gated, H9 §2.3) | 4 lines, all history: `deep.css:69` "(20px", `:71` "overlay's 22px", `glass-deep.css:55` "overlay painted 22", `Surface.test.ts:162` "(20px". Floor v7's `glass-deep.css:13` "overlay paints 22" no longer prints | — |
| **LAW** | **PASS 72 gated rows** (`law.log`; this seat's `FV8-run.sh` is read with the rest) | the self-test plants (H9 §7) |
| **census** | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 | **HEAD: `stacked=2 halo=2 blur=5 open=9`, exit 1** |
| **HOV** | **PASS 58 gated rows** | — |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited, none added | — |
| **ladder `diff`** | `diff radii-fv7 radii-fv8` prints nothing, exit 0 | `diff radii-head radii-fv8` exit 1: HEAD 10/14/16/20/22 against 6/10/12/18/20 |

---

## 3 · R-21 (b): the frozen list, read line by line

`prose-sweep.mjs --root <floor v8> --patch floor-v8.patch --declare declare-floor-v8.json` prints **214 lines in 54 files** (`sweep-fv8.log`, `LIST`), each with ±1 line of context: 82 touched files exist and are read; the list is `sweep-frozen.json`'s 9 words, the declaration's 73 names and the changed ladder. I read every line in its context against the floor v8 tree and wrote one ruling per line into `FV8-rulings.json` (`{ at, says, why }`, `says` = the line's own text, so a ruling goes stale the moment its line moves or changes). `FV8-rulings.py` is the reading, per file, with per-line overrides.

| run (`sweep.log`, 18:08:47-18:08:49, load 18.3) | result |
|---|---|
| floor v8, `--rulings FV8-rulings.json` | **`PASS (214 lines, each ruled true)`**, 0 unread, 0 stale |
| floor v7 under floor v8's patch, declaration and rulings (plant) | **`FAIL (13 unread, 3 stale of 224 lines)`**. The 13 unread are the delta's lines: `surfaces-pager.css:29, 34, 35`, `GlassDock.vue:467`, `index.css:80, 83`, `glass-deep.css:12, 13, 54`, `feedback-tone.css:21, 22`, `a11y-fallback.css:35`, `glass-fx.css:1`. The 3 stale are the rulings on rewritten lines (`feedback-tone.css:21`, `a11y-fallback.css:35`, `surfaces-pager.css:33`) |

### 3.1 · Each line's verdict

All 214 are **true** on floor v8. The ruling of record for each line is its `why` in `FV8-rulings.json`; the table groups them by file and names the reading that makes them true. Lines are floor v8's.

| file | lines | verdict and reading |
|---|---|---|
| `demo/stories/compositions/auth-shell.vue` | 223 | true: the story's muted ink, darkened over the aurora; a demo token, not the veil |
| `demo/stories/dock/_frame/DockStage.vue` | 65, 71, 106, 124 | true: the aurora backing store's viewport clamp and DPR clamp |
| `demo/stories/feedback/progress.vue` | 63 | true: the tinted eyebrow |
| `demo/stories/substrates/glass-material.vue` | 6, 99, 104, 185 | true: :6 the veil's one pole `--card` carries any tint (floor v8's plate); :99, :104 the live accent rim; :185 a measurement note true of any plate |
| `src/components/_shared/feedback/feedback-tone.css` | 4, 8, 20, 21, 25, 29, 34, 36, 38, 43, 56, 62, 64, 70, 108 | true: the live tone register, `.feedback-tone` mixing `--tone` over `--glass-veil` in oklab (:80-84); :20-21 as rewritten (v); :62 the live gate name (H9-1 site) |
| `src/components/_shared/field/control.css` | 109, 110, 111, 138 | true: the type rung's fluid clamp and the engine's radius clamp |
| `src/components/_shared/menu/menu.css` | 6, 10, 117 | true: the menu row's accent tint; :10 history ("the ink fill darkened the cream row", past tense); :117 the hairline ink re-tints through `--foreground` |
| `src/components/button/styles.css` | 60, 67, 72, 143 | true: the engine's stadium clamp; Button's tone tint (§5) |
| `src/components/card/styles.css` | 212 | true: the type clamp's floor |
| `src/components/configurator/styles.css` | 129, 149, 444, 462 | true: `--configurator-section-tint` (declared); the tile clamp |
| `src/components/dialog/styles.css` | 16, 19, 67 | true: gutter and type clamps |
| `src/components/dock/GlassDock.vue` | 36 | true: history, the overflow ResizeObserver named as deleted, not the luminance observer |
| `src/components/dock/styles/controls/icon-button.css` | 5, 16, 87, 95, 104, 118, 119, 120 | true: the press DARKEN leg (`filter: brightness()`, :92; `--dock-control-press-bg`, declared) and the card-tinted hover fill (:113) |
| `src/components/dock/styles/controls/touch-floor.css` | 7, 16, 18, 58 | true: the 44px `max()` clamp; the accent glyph tint |
| `src/components/dock/styles/dock.css` | 15, 105 | true: "one chromatic writer, no second tint layer" and "NO SEPARATE TINT VEIL" state floor v8's plate. :15's adaptive-legibility attribution is pre-existing at HEAD and not the patch's mechanism (§1.2): reported for the landing docs pass |
| `src/components/dock/styles/layer-group.css` | 160, 167, 242, 283 | true: the switcher's glass tints (declared) and glyph tint; :160 states the `--surface-tint-8` plate is gone |
| `src/components/dock/styles/shape.css` | 122 | true: the `--dock-size-scale` clamp floor |
| `src/components/dock/styles/shell.css` | 162, 292 | true: width cap and block-size clamp |
| `src/components/music-staff/styles.css` | 58, 372 | true: the folio biases the veil's one pole `--card` (one plate-tint writer); :372 keyframes sampled from the press register |
| `src/components/sheet/styles.css` | 320, 356, 496 | true: :320 history (past tense); :356 the sampler's z-order; :496 "a clamp is not a fit" |
| `src/components/tabs/styles/segmented.css` | 8, 11, 49, 88, 241, 242 | true: the indicator's clamp at the bar's edge, the engine's stadium clamp, the indicator's glass tint |
| `src/styles/glass.css` | 116, 118 | true: `--glass-fill-tinted` (declared, `tokens/glass.css:174-186`) |
| `src/styles/glass/a11y-fallback.css` | 35 | true as rewritten (vi): "the separate tint-darken this bracket used to add" is history |
| `src/styles/glass/control-bit.css` | 177, 180 | true: the recess darkens toward the black pole |
| `src/styles/glass/control-surfaces.css` | 17, 34, 108, 130, 142 | true: tone tints, `--surface-tint-15` (declared), the coarse clamp |
| `src/styles/glass/deep.css` | 18, 69, 71 | true: :18 the fill-tint axis (Crit8 §3); :69, :71 history (H8's upheld site and the rung reading) |
| `src/styles/glass/grasp.css` | 131 | true: the slider fill's tinted mix |
| `src/styles/glass/ladder.css` | 171, 174, 177, 189 | true: the on-glass muted lift for tone-tinted and chip plates (`--on-glass-muted-strong`, declared) |
| `src/styles/glass/liquid-fill.css` | 4, 17, 18, 22, 23, 47, 55, 61, 62, 63 | true: the `--liquid-fill-tint` knob and its mix |
| `src/styles/glass/material.css` | 95, 211 | true: the rim's accent tint; plus-lighter's HDR clamp |
| `src/styles/glass/overlay-plate.css` | 112, 271 | true: the placement clamp; "no second tint layer" (an absence) |
| `src/styles/glass/rim.css` | 16, 27 | true: the accent rim; the `--surface-tint-*` brand fence |
| `src/styles/glass/surface-axis.css` | 124 | true: the well's oklab tone-step (`--glass-well-pole`, `tokens/glass.css:161`) |
| `src/styles/glass/surfaces-pager.css` | 33, 36 | true as rewritten by R-20 (i): "no ink, clamp or oklab mix" (an absence); the brand fence |
| `src/styles/glass/veil.css` | 36, 40 | true: "No luma term and no clamp" (an absence); the tone-tinted feedback panel, a consumer of `--glass-veil` |
| `src/styles/tokens/color-radius.css` | 37, 77, 93, 162, 213, 231, 245, 265, 280, 304, 335 | true: live token prose (`--fill-selected`'s menu accent tint, the `--surface-tint-*` and muted-tinted rungs, the constellation accent and its no-slingshot clamp, the eyebrow rung, "never a tinted cast") |
| `src/styles/tokens/dark-arm.css` | 47, 82, 215, 216, 304, 328, 331, 334, 347, 348 | true: :47 a measured page/card luminance gap, not the luma term; :215-216 clamp() in the shadow pin; :304 the on-glass muted dark arm; the `--surface-tint-*` dark arm |
| `src/styles/tokens/glass-deep.css` | 55 | true: history in the past tense; R-20 (iv) rewrote :54 above it |
| `src/styles/tokens/glass-fx.css` | 120, 147, 185 | true: the recess ink, chart palette tinting, the scrim that must not re-tint |
| `src/styles/tokens/glass.css` | 133, 151, 164, 166, 174, 176, 195, 218, 219, 304 | true: the srgb-plate / oklab-tint fence, the well's tone-step, the fill-tint axis (`@property --glass-fill-tint`, :316), the border presence "not tinted", the typed clamp |
| `src/styles/tokens/light-dark.css` | 12 | true: the 44px control-floor clamp |
| `src/styles/tokens/property-regs.css` | 114, 115, 122, 123, 130, 151, 185, 197, 219 | true: the accent axis (:115 is H9-1's homonym site; :123's TINT label is Crit8 §5.2's ruling), @property's typed clamp, "nothing sampled" (an absence), the `--motion-weight` OBSERVER subtree |
| `src/styles/tokens/scale-paper.css` | 69, 70, 73, 82, 101, 137, 152, 158, 216, 248 | true: `--invalid-ring-tint` and `--control-checked-bg` (declared), inks that re-tint with `--foreground`, metal "not a tinted cast" |
| `src/styles/tokens/shadow.css` | 50, 51, 53, 54, 96, 103, 127, 143 | true: clamp() in the in-gamut shadow ink, the blob's tinted contact shade and contact-darkening |
| `src/styles/tokens/sizing.css` | 22, 32, 33, 40, 153, 212, 214, 218, 219, 233, 256, 257, 321 | true: control-floor and type clamps, the switcher's glass tint rungs, the hairline's `--surface-tint-*` rung, the press DARKEN |
| `src/styles/utilities/base.css` | 299 | true: the consumer's bg-tint under reduced motion |
| `tests/components/button/Button.test.ts` | 382 | true: Button §5's tone title |
| `tests/components/custom/dock/GlassDock.posture.test.ts` | 153 | true: asserts the deletion (H8's upheld site) |
| `tests/components/field/forms-seam.test.ts` | 159 | true: the type rung's bounded clamp |
| `tests/components/ui/surface/Surface.test.ts` | 162, 164 | true: history ("RED at the first cut's bytes"; H9 §2.4's site) |
| `tests/gates/feedback-tint-seam.test.ts` | 1, 7, 19, 21, 121 | true: the live gate and its rule (H9-1 sites at :1, :121) |
| `tests/styles/contrast-computed.test.ts` | 260, 414, 947, 984, 988 | true: premultiplied arithmetic, a register asserted deleted, "measured, not sampled", the tinted eyebrow |
| `tests/styles/glass-subtlety.test.ts` | 96, 184, 342 | true: clamp() evaluated in JS; :184 asserts one pole, no ink, no luma; the scrim's sampled pixels |
| `tests/styles/proportion-register.test.ts` | 149, 294, 295 | true: the fluid clamp; history and the assertion of no observer residue |

---

## 4 · Identity under R-22: raw, both outputs

Floor v8, floor v7 and floor v8 again were each built by `harness/build.mjs --demo` under one label (`same`) in the worktree, one after the other, each swap checked by `cmp`, each output moved aside before the next build (`same.log`, 18:10:33-18:10:44, load 12.4 → 13.1; `bite.log`, 18:11:36-18:11:40, load 16.8).

| output | floor v7 against floor v8 | floor v8 against floor v8, rebuilt | against pass 8's banked floor v7 (`pass-8/FV7-records/same-fv7-*.sha256`) |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0; sha256 lists identical.** CSS **391,121 B, sha256 `347288745da7cf97`** in both, FV7's figure | exit 0 | CSS identical. The JS and `index.html` differ only through the worktree path in the JS's `//#region` comments (`p8/floor7` then, `p9/floor8` now). **With the path rewritten to pass 8's, floor v8's specimen JS hashes `06edc55a…3ca37`, byte for byte the banked floor v7 `index-3lKSpDp8.js`** |
| **dist-demo** (346 files) | **`diff -rq` exit 0; sha256 lists identical** | exit 0 | **identical** (`diff` exit 0) |
| dist-demo, chunk hashes normalised; and scoped ids normalised too (FV6's normaliser) | **0 of 338 differ**, both ways | — | — |

**The bite:** HEAD built the same way under the same label differs from floor v8 in both outputs (`diff -rq` exit 1: dist 5 lines, demo 261 lines; HEAD's specimen CSS 394,891 B, `b09b9e73a61b75b1`).

**R-22's reading.** The outputs are raw-identical, so every verdict carries, and the normalised branch's one Chromium dock bite is not owed. The reason it held where FV6's SFC edits did not: `GlassDock.vue` has no `<style>` block (`grep '<style'` prints nothing), so no scoped id is hashed from its source, and Vue's production compile drops template comments. The six CSS comment edits are stripped by the minifier. **No battery ran, and no owner option was selected**, so none is owed (P8-6.2 step 2).

---

## 5 · Toolchain (`toolchain.log`, 18:11:52-18:13:44)

| step | result | when, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 18:12:02, 16.6 |
| `vite build` (library) | exit 0 | 18:12:11, 16.4 |
| `vue-tsc --noEmit -p tsconfig.test.json`, after the library build | exit 0 | 18:12:21, 15.6 |
| `vite build`, the dist-demo config (before the units: the boot-graph rows read it, P8-5) | exit 0 | 18:12:24, 15.6 |
| `vitest run --maxWorkers=2` | **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (floor v7: 2318) | 18:13:44, 14.0 |

---

## 6 · The informational WebKit cell (P8-5; P8-6.2 step 4)

**Owed again, not read. It holds nothing.** The cell (`FV8-run.sh wk-dlg`: floor v8's `same` specimen, dialog scene, both themes, Playwright WebKit, one browser for the run) queued as its own `guarded --exclusive webkit --timeout 60` admission at 18:13:57 (load 14.6). It never got the lock: `adm-wk-dlg.out` reads only "waiting for the 'webkit' lock". At 18:16:42 (load 29.5), after 2 min 45 s, the workflow made this seat return. I stopped the waiter before it was admitted, so no WebKit browser of mine launched (`admissions.log`). The wait never reached 90 minutes, so this is an early stop, not a 90-minute timeout. It is recorded as owed and holds nothing.

**What it would have read:** the floor v7 WebKit dialog Close ring on fresh pixels (WK: light 3.07 / dark 4.30, M-3 PASS 42). Floor v8's specimen is byte-identical to floor v7's (§4), so the next WebKit seat reads it with `FV8-run.sh wk-dlg` then `dlg-read`, against a floor v8 or floor v7 build. Both phases are in the script, and `dlg-read` diffs against `pass-8/WK-records`. No row depends on this cell: WebKit is informational for M-3, and row 6 is carried on Chromium (Crit8 §4). **Real Safari: UNMEASURED (owner's safaridriver checkbox).**

---

## 7 · The 44 rows (floor v8; defaults applied, no variant selected)

The source of record for each carried status is Crit8 §4 (Reg P8-1.1). Floor v8's specimen and dist-demo are floor v7's bytes (§4), so every paint row carries. The rows R-20 and R-21 move are read here.

| # | row | status | evidence or counterexample | closes on |
|---|---|---|---|---|
| 1, 2, 4, 5, 7, 8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS (19)** | carried from Crit8 §4 on byte-identical outputs (§4). Row 11 (release): this seat's toolchain (§5). Row 18: WK's dark drift window 43/43 twice. Row 19: DEL's plant reds floor v7 6/101 under H9 (§2), and the paint plants carry on byte-identical specimens. Row 22: census 0, its 10.1.0 bite exact, LIT the 19 inherited (§2) | — |
| 3 | M-1x | OPEN | REPORTED under (a): content grey off paper (over black `#e2dcd7`, L 0.898, C 0.0095). `var-q11b` 21/21 on record, both engines | **owner, Q-11 chrome clause** |
| 6 | M-3 | **PASS** | carried: H7-1, Chromium light Close ring 3.52 (Crit8 §4). §6 is informational | — |
| 9 | M-6 | OPEN | stepped 29/120; `--q1 a` PASS 88/88 in both engines | **owner, Q-1** |
| **20** | prose sweep of every touched file | **PASS** (closed this pass, the seat's score) | R-21 (a): DEL with H8 and H9 at 0 over every file in scope, **PASS 101** (and **PASS 100** under H9's own declaration); the predecessor reds, **floor v7 FAIL 6/101**. R-21 (b): the frozen list prints 214 lines, every one read and ruled true (**`PASS (214 lines, each ruled true)`**); floor v7 under the same rulings FAILs 13 unread, exactly the delta's lines (§3). Built: R-20's four sentences and three R-21 (b) rewrites (§1.2, a departure the critic rules) | route: **R-20** under **R-21**, built; the critic confirms |
| 23 | gestalt, O-62 frame | OPEN | unchanged: floor v8 moves no specimen pixel (§4) | **owner: Q-11 content clause, Q-3, Q-14**, with the frames (Reg P8-4) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | carried on byte-identical specimens; FL-15's `plant-darkperim` FAIL 47/87 in WebKit (WK §2) | — |
| **FL-12** | prose sweep of every touched file | **PASS** (closed this pass, the seat's score) | as row 20 | route: **R-20** under **R-21**, built |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) is `pass-4/fv3/q1c.*` (FAIL 2/96, both engines) | **owner, Q-1** |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) is `pass-4/fv3/q11b.*` | **owner, Q-11 chrome clause** |
| N-3 | the dock's held halo | **PASS (attributed), both themes** | carried: M-2h 2/68 | — |
| N-4 | the minor split's W-0.1 reading | **PASS** | carried (Reg P8-3). The minor v7 is step 3's | — |

**Count: 39 PASS, 5 OPEN = 0.886.** **Closed this pass: rows 20 and FL-12**, the seat's score, which the critic may overturn. **Opened: none.** **Route-owned open rows: 0.** **Waiting only on the owner: 5** (3, 9, 23, N-1, N-2).

### 7.1 · Which owner ruling closes each still-open row

| row | the ruling that closes it | how, on floor v8 |
|---|---|---|
| **3** M-1x | **Q-11, chrome clause** | (a) closes it by its text, with no build. (b) closes it by selecting `pass-4/fv3/q11b.*` (M-1x 21/21 on record); floor v8 is then no longer byte-identical and owes the full battery in both engines |
| **9** M-6 | **Q-1** | (a) closes it by selection: `--q1 a` reads PASS 88/88 in both engines on floor v7's bytes, which are floor v8's. (c) has no passing build (`--q1 c` FAIL 2/96, the `retune-bg` dark room) and needs a room-only reading and a room value |
| **23** gestalt, O-62 frame | **Q-11 content clause + Q-3 + Q-14**, with the frames | the owner's word over the frames in Reg P8-4. With "content grey accepted off paper", Q-3 (a) and Q-14 (a), it closes with no build. Q-11 content "not accepted" has no measured candidate and fires C″'s re-trigger (c). Q-14 (b) is built as R-2's deletion in the dark arm and re-reads row 12. Q-3 (c) re-reads every banked family's re-trigger |
| **N-1** Q-1's ruling built | **Q-1** | as row 9: (a) is built, so the ruling closes it |
| **N-2** Q-11's ruling built | **Q-11, chrome clause** | as row 3: (a) is built; (b) is the variant |

**The fixed point (Reg P8-6.4).** If the critic confirms rows 20 and FL-12 under R-21, floor v8 reads 39/44 with only owner rows open, and no route work can move them. The one-message sheet (Reg P8-4: Q-1, Q-3, Q-11 both clauses, Q-14) is what remains. Its shortest path, Q-1 (a), Q-3 (a), Q-11 (a) for chrome, grey content accepted off paper and Q-14 (a), closes all five with no build and no browser, because floor v8 already builds every default.

---

## 8 · Handed on, and teardown

| to | what |
|---|---|
| the critic (step 5) | (1) §1.2's departure: three R-21 (b) rewrites beyond R-20's four sentences (`feedback-tone.css:20-22`, `a11y-fallback.css:33-36`, `glass-fx.css:1`), with the reason each was false on floor v7, and what striking them costs. (2) R-21's list: 214 rulings in `FV8-rulings.json`, re-run with `prose-sweep.mjs --rulings` (`FV8-run.sh sweep`). (3) `dock.css:15`, ruled true as to the patch and reported (§1.2). (4) The declaration's 73rd name, `--veil-bg`, a consequence of rewrite (v). (5) The raw byte proof and the path-normalised tie to pass 8's banked JS (§4). (6) The 39/44 count |
| the minor v7 (step 3) | nothing from this seat. Rewrites (v)-(vii) touch three files the minor's patch may also touch: the minor keeps the clamp and ink, so its own R-21 reading of the same lines may differ, as Crit8 §5.2 found for "tint seam" |
| the landing's docs pass | `dock/styles/dock.css:15`'s adaptive-legibility attribution, with Crit8's list (`property-regs.css:162-165`, `DESIGN.md:516, :521`, `docs/canon/glass-system.md:50, 51, 60`, `music-staff/README.md:60`) |
| the owner | Reg P8-4's sheet, unchanged. No new frame is owed: floor v8 moves no pixel |

**Teardown** (`phases.log` 18:16:57, load 35.7): `git worktree remove --force` of `.claude/worktrees/bl/D3/p9/floor8/wt` and `git worktree prune`. `.claude/worktrees/bl/D3/p9/floor8/` is removed, and so is the empty `p9/`. `git worktree list` shows no `p9` entry, and `git status --porcelain -- src demo tests` prints nothing. No process of this seat is left running.
