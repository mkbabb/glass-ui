# BL — formation fix, seat 3

| field | value |
|---|---|
| seat | formation fix seat 3, before audit pass 3. Answers `formation-audit/pass-2.md` (FB-01 to FB-18, and FA-17 still open) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `be1969ea` for every probe (the pass-2 commit). A scratch worktree at `HEAD` (`scratchpad/formation/fix-3/wt`, `node_modules` and `tests-visual/node_modules` symlinked, `npm run build` exit 0), removed before return. `src` is the published 10.1.0 |
| engines | Chromium (Playwright's) and Playwright WebKit. Playwright WebKit is not Safari; every real-Safari cell is UNMEASURED (OW-3) |
| writes | `PLAN.md`, `waves/INDEX.md`, `LEDGER.md`, the wave specs named below, this file. Nothing under `design/`, no tracked source, no git write in the checkout |
| probes | fix-2's appendix P app, rebuilt against the worktree (K7-G13), and two fixture apps of this seat's own, printed in appendix Q (Q1 the micro rung and the strip's hit area, Q2 a toast over an open overlay). Both use fix-2's `build.mjs` unchanged |
| fence note | to revert a planted CSS edit inside the scratch worktree this seat once ran `git checkout -- src/components/dock` there. That is a git write the fence names; it touched only the scratch worktree, never the checkout. Every later plant was reverted by copying a saved file back |

## Result

17 of the 18 FB findings are cured in the plan folder and none is refuted. FA-17 stays open because its cure writes under `design/`, which this seat is fenced from. FB-18 is cured for #45, #78 and C-8. For #64b the cure is partial: its gate now goes green at its own wave's close, but the RETIRE has no tree act of its own (see FB-18).

How the cures are shaped:

- **Gates that read loop documents are struck** (B3-G4, B10-G1, B15-G1). Their hand-offs are carried by the receivers, with gates in the tree: W-I.1 G24 and G26, and W-I.6's hallmark-1 row.
- **Loop harnesses live at one path.** W-C.1 moves every BL loop harness, and the OWED-3 check, to `scripts/loops/<loop>/` whatever the loop's state. PLAN §5 orders W-H.1, W-H.2, W-H.5, W-I.1 and W-I.7 after W-C.1, and each spec names one `$H`. The vacuous C1-G7 becomes W-L.8's born-RED G-L8-14 (414 tracked loop scripts at HEAD).
- **Owner record.** O-84 and O-84a go back to D2 (W-I.1), as the owner's ratification at `FORMATION-PROGRESS.md:78` says. W-0.8 is O-83 alone.
- **OW-12 is retired.** CUR:80 names no token. The parenthetical `--type-title` collides with a published rung, so W-0.9 ships `--type-card-title` and nothing is renamed. That removes band 0's second external dependency and the unowned 11.0.0 rename.
- **Disease rows enact themselves.** W-B.9 builds the constellation's WebGPU port. W-B.11 deletes the salvaged emitter. W-I.7 lands before W-I.1. The shared-wave copies of their gates are struck, each citing its one source of record.

The DAG was re-walked after the edits: 99 waves, 0 cycles, 0 dangling ids, 0 edges into a later band. INDEX, PLAN §5 and the spec files name the same 99 waves. Band 0's only external dependency is the D3 gate. PLAN §3 and INDEX agree on every wave's family set (0 mismatches), and the 85 registry families are all placed. Every markdown table in the plan folder has a consistent column count (script, 0 mismatches after the fixes under FB-02).

## Findings

### FB-01 · F-54's hallmark split placed twice

**Cured.** `PLAN.md:197`: W-I.1's family cell no longer names "F-54 split (the dock hallmarks, #67)". W-I.6 is the one placement (`PLAN.md:199`). **Evidence:** a script diffed the family sets per wave, PLAN §3 against INDEX: 99 of 99 match. REGISTRY's 85 families are all placed, with none missing and none extra.

### FB-02 · C2-G5 green under the rendered form

**Cured.**
- **The gate.** `waves/W-C.2.md:66` is now `npm run build && ! grep -rq -e DISSOLVE_DIALECTS -e dissolveDialect src dist`. It uses two `-e` patterns and no alternation pipe, so the raw and rendered forms are one command. The build comes first because macOS grep exits 2 when `dist` is absent. The old form then read exit 0 through the `!`, which is a fail-open.
- **Readings.** In the worktree with `dist` built, the gate exits 1. Hits: `src/composables/motion/dissolve/dissolveGrammar.ts:52,96,97`; `dist/motion-core.js`; `dist/composables/motion/dissolve/dissolveGrammar.d.ts`. On a clean two-file fixture the grep half exits 0, and with one `DISSOLVE_DIALECTS` line planted it exits 1.
- **The same class.** A table-column script found five more gate cells with a raw `|` inside a code span, where the rendered table splits the cell:
  - `W-0.7.md:83` G2;
  - `W-L.1.md:192` G-L1-5;
  - `W-G.5.md:82`;
  - `W-F.1.md:116`;
  - `PLAN.md:95`.

  Each is now `\|`, the convention the other 60 gates follow. Two layout faults were fixed too: `W-J.1.md:23` was missing its source cell, and two tables in `W-H.4.md` sat next to each other with no blank line between them.

### FB-03 · I5-G1 measures the whole of `src`

**Cured.**
- **The gate.** `waves/W-I.5.md:42` is now scoped to the dock and its motion token: `! git grep -qniE 'fission\|siri([^a-z]\|$)' -- src/components/dock src/styles/tokens/scroll-tokens.css`.
- **HEAD reading.** Exit 1 with 16 lines: `GlassDock.vue` 3, `dock/composables/index.ts` 3, `dock/index.ts` 6, `dock/styles/index.css` 2, `shape.css` 1, `scroll-tokens.css` 1.
- **`siri\b` was also wrong.** This `git grep -E` does not honour `\b`: `git grep -niE 'siri\b' -- src | wc -l` gave 0, while `siri([^a-z]|$)` matches the 7 Siri lines.
- **What the wave leaves alone.** §2 now says the blob's 107 fission lines belong to W-G.5 and DotRing's 9 to W-B.8, and that this wave neither touches nor gates them. So the blob's published `fissioning?` is not removed.
- **MIGRATION.** §7 now reads no row under (a), since the dock's surfaces are already absent (`dock/index.ts:105-111`), and additions only under (b). This also removes FB-17's second clause.
- **Duplicate counts.** The copies in `W-I.1.md` (§2.1, and the §2.2 table row) are struck in favour of W-I.5 §2. PLAN §3's W-I.5 row (`PLAN.md:198`) states the 16 lines and names the other owners.

### FB-04 · Loop gates run executables W-C.1 deletes

**Cured.**
- **One path per harness.** `waves/W-C.1.md:43` (step 4) now moves every BL loop harness and replay kit to `scripts/loops/<loop>/`, whether the loop is open or converged. The rule "a converged loop's files go with step 3" is gone. The IOS27-MICRO spine-conductor check (`check.mjs`, `index.html`) moves to `scripts/loops/dock/owed-3/`, with its `springPresets.ts` import re-pointed. The last wave of each loop deletes that loop's dir.
- **Edges.** PLAN §5 gives W-H.1, W-H.2, W-H.5, W-I.1 and W-I.7 an edge on W-C.1, with the reason in the notes (`PLAN.md:377`). W-I.4 to W-I.6 and W-J.1 reach W-C.1 through W-I.1 and their own edges. W-0.1 and W-0.2 land before W-C.1 (through W-0.7 → W-A.1 → W-C.1) and keep the `docs/` path.
- **Specs.** Each spec now names one `$H` at `scripts/loops/<loop>/harness`, with no fallback path:
  - `W-H.1.md:13,137`;
  - `W-H.2.md:13`;
  - `W-I.1.md:13,194`;
  - `W-J.1.md:13,164`, whose "docs path until W-C.1" dual path is struck;
  - `W-J.2.md:13`.
- **I6-G3.** It runs `scripts/loops/dock/owed-3/check.mjs` (`W-I.6.md:47`).

### FB-05 · Gates that read loop documents

**Cured.** Each gate is struck with a note. The subject moves to its receiver, and nothing under `design/` is written by any wave.
- **B10-G1** (`W-B.10.md:36`). `useAnisotropicExtent` folds into W-I.6 as hallmark 1's candidate mechanism. `W-I.6.md:19` names the hand-off, and I6-G1 and I6-G2 measure the squish in paint.
- **B15-G1** (`W-B.15.md:40`). R56's gate is W-I.1 G26, D2's run-glide witness (`W-I.1.md:228`), which is RED by absence at HEAD.
- **W-I.1 G24** (`W-I.1.md:227`) now reads the tree: `grep -qE '^\s+priority\?:' src/components/dock/DockControl.vue`. It exits 1 at `be1969ea`: the declared props are `shape`, `compact`, `active`, `type`, `disabled`, `as`, `asChild` and `class`, with no `priority`. Under a RETIRE it is recorded "retired with D2's ruling" and the owner's words, the same form as I5-G2.
- **B3-G4** (`W-B.3.md:54`). The D-3 cite's one home is the seed (B3-G5). The loops read the seed, so four `PORTFOLIO.md` copies would be derived data (P-3). PLAN §3's W-B.3 row and W-B.3 §3 and §4 no longer edit `design/`.

### FB-06 · W-I.1 G17 fails open

**Cured.**
- **The gate** (`W-I.1.md:224`): `out=$(node scripts/probes/band-I/hover-census.mjs . --list 2>&1); printf '%s\n' "$out" | grep -q '^HOVER-CENSUS rules=' && ! printf '%s\n' "$out" | grep -q 'src/components/dock/'`. It fails closed: with no census line there is no pass.
- **Readings in the worktree.**
  - Script absent: exit 1.
  - W-I.3 appendix A placed at the path: exit 1, 6 dock rules, `HOVER-CENSUS rules=42 unguarded=26 unguarded-paint=24`.
  - The six dock `:hover` selectors swapped for `:focus-visible`: exit 0.
- **Ordering.** The census script now lands with W-I.1 (`W-I.1.md` §4), because W-I.3 depends on W-I.1. `W-I.3.md:70` says so and binds the script as the vitest invariant.

### FB-07 · W-0.2 G3 matches token fallbacks

**Cured.**
- **The gate** (`W-0.2.md:73`): `test -z "$(grep -oE 'var\(--toggle-tint,[^)]*' src/components/toggle-group/styles.css | grep -vE ', *(var\(--[a-z-]+|transparent)$')"`. A read may fall back to a token, or to `transparent` (the ring slot), and to nothing else.
- **Readings.**
  - HEAD: exit 0. It is a hold line, and G1 is the born-RED for absence.
  - §3's four template lines, spaced and unspaced: exit 0.
  - `var(--toggle-tint, #888)` appended: exit 1.
  - `var(--toggle-tint, oklch(0.5 0 0))` appended: exit 1.
  - The old grep on the same template: 3 lines matched.

### FB-08 · K7-G13's bite cannot redden the hold line

**Cured** (`W-K.7.md:76`). The criterion is `maxRunning <= 1`, and the row states that fix-2's `=== 1` (`fix-2.md:557`) yields to it. Readings from fix-2's probe rebuilt against the worktree, Chromium, scene `dtrig`, `reducedMotion: no-preference`:

| build | `maxRunning` | seen |
|---|---|---|
| HEAD | 0 | `[]` |
| one planted `opacity` keyframe on `.dock-trigger::before` | 1 | `["k7-plant-a:CSSAnimation"]` (passes ≤ 1, so the old bite did not bite) |
| two planted keyframes, `animation: k7-plant-a 1s linear infinite, k7-plant-b 1.3s linear infinite` | 2 | `["k7-plant-a:CSSAnimation","k7-plant-b:CSSAnimation"]` (red) |

The bite is now the two-owner plant.

### FB-09 · C1-G7 vacuous

**Cured.**
- **C1-G7 is struck** (`W-C.1.md:70`).
- **Replacement.** The close-time reading is W-L.8's G-L8-14 (`W-L.8.md:106`): `test "$(git ls-files docs/tranches/BL/design scripts/loops | grep -cE '\.(mjs|js|ts|cjs|sh|py)$')" -eq 0`.
- **HEAD reading.** Exit 1, 414: `design/structure` 329, `design/dock` 33, `design/tile` 29, `design/material` 23.
- **Why a move is not enough.** The gate reads both roots, so moving the scripts to `scripts/loops/` does not pass it.

### FB-10 · Band-E captures under the session scratchpad

**Cured.**
- **One root.** The four band probe libraries now take their evidence root from `WAVE=<wave id>` and throw without it: `export const CAP = \`.cache/evidence/${WAVE}\``. The libraries are `W-E.1.md:203`, `W-F.2.md:340`, `W-G.1.md:150` and `W-K.1.md:173`. Before, W-F.2 and W-G.1 fell back to `../cap`, and W-K.1 wrote every band-K wave under `W-K.1/`.
- **HEAD sets.** The HEAD-set cites in the scratchpad are replaced by before sets taken at each wave's base under `.cache/evidence/<wave>/`: `W-E.1.md:90`, `W-E.2.md:99`, `W-E.3.md:79`, `W-E.4.md:117`, `W-E.9.md:78`, `W-E.10.md:114` and `W-K.4.md:92`.
- **PLAN §1** (`PLAN.md:31`) states the rule.
- **Evidence.** `grep -rn "scratchpad/formation/band-[A-Z]/cap\|<scratchpad>" waves/` → 0.

### FB-11 · Rows pointing at a wave that hands the subject away

**Cured.** Each row now points at the receiver, and the receiver names it:

| row | now points at | where |
|---|---|---|
| #49c | W-E.14 | `LEDGER.md:120`; W-E.14 §8 names "R11 (ledger #49c)" |
| #82a | W-H.5 | `LEDGER.md:196`; W-H.5 §8 names it |
| UIA-V-234 | W-H.5 | `LEDGER.md:734` |
| UIA-V-431 | W-H.5 | `LEDGER.md:742` |

W-H.2's §1 inbound list no longer names UIA-V-234 or UIA-V-431, and W-H.5 §1 is their one owner.

### FB-12 · Hand-offs no receiver carries

**Cured.**
- **`useAnisotropicExtent`.** See FB-05. LEDGER #46b and #67c (`LEDGER.md:113,173`) now read FOLD → W-I.6. PLAN §4's D2 obligations name it.
- **O-76's fallback.** `W-H.1.md:28` adds a receiver row: if W-0.2 did not ride 10.2.0, it lands in 11.0.0 with W-H.1 under its own G1-G3. `W-0.2.md` §8 now names that receiver.

### FB-13 · W-E.7 `[G]` rows with no gate

**Cured**, along with the same class on W-E.4.

**W-E.7.** Two new gates, both run with appendix Q1 at `be1969ea`:
- **E7-G17, the micro floor** (A2-KE-L2-14, A2-FO-L2-18, O-74 E-5), `W-E.7.md:85`.
  - HEAD: a `.text-micro` span is 11 px at coarse 390 in both engines, which FAILs.
  - A planted `@media (pointer: coarse) { :root { --type-micro: 0.75rem } }` reads 12 at coarse 390 and 11 at fine 1440.
  - The cure clause in §3.5 is the ask's own: a 12 px floor under a coarse pointer (`valuejs-outbound-2026-09-24-audit-2.md:141-142`).
- **E7-G18, the strip's coarse hit** (A2-FO-L2-6), `W-E.7.md:86`.
  - HEAD: 2 of 4 hits at 21 px, box 65.5 × 26.3, both engines. FAIL.
  - A planted coarse `::after` of `max(100%, 2.75rem)` reads 4 of 4.
  - §3.6 extends the hit area to the strip's buttons.

**The other W-E.7 rows.**
- A2-FO-L2-14 goes to W-E.9's E9-G5 with UIA-F-41. `LEDGER.md:953` now points there, and `W-E.9.md` §1 names it.
- The other six `[G]` rows map to E7-G5 or E7-G6 in the mechanism table.
- UIA-KF-147's RETIRE now covers only its shortcut clause.

**The same class on W-E.4.** Its 8 `[G]` rows were read too:
- Seven map to E4-G7, E4-G8, E4-G10 and E4-G15.
- A2-KE-L1-27 (a press on the library's own toast dismisses an open overlay) is **RETIRE NOT-REPRODUCED**. Appendix Q2 put a toast with a `ToastAction` over an open Dialog, Popover and Dialog-rooted `SheetContent`, pressed by mouse and by touch, in Chromium and Playwright WebKit. In 12 of 12 cells the action fires once and the overlay stays open. The re-trigger is a reproduction without consumer code, and the consumers' guards retire in their W-L.7 packets (`W-E.4.md:112`, `LEDGER.md:934`).

**LEDGER.** 0 `[G]` rows remain. The coverage line reads `[N]` 375, `[R]` 67, `[G]` 0, `[M]` 0. §9 is recounted by script: 493 BUILD, 126 FOLD, 8 BANKED, 181 RETIRE, 808 rows.

### FB-14 · O-84 and O-84a pre-empt D2 against the owner

**Cured.** The owner's ratification (`FORMATION-PROGRESS.md:78`) folds O-84 and O-84a into D2 with O-65. O-84b at `:79` is value.js's re-ruling, not an owner word.

**W-0.8 is O-83 alone.**
- `W-0.8.md:9` (the exception field) records why.
- G2, G3, G5 and G6 are removed; G1 and G4 remain.
- PLAN §1's exception (`PLAN.md:37`) is O-83 only and cites `:78`. PLAN §1 item 1, the §2 band rows, the §3 W-0.8 and W-I.1 rows, the §4 D2 list, the §5 note and the §7 bands 0 and I rows follow.

**Moved to W-I.1.**
- The rows go to §1: O-84, O-84a, UIA-F-105 and UIA-KF-215.
- The readings go to §2.5 (`W-I.1.md:110`).
- §3.1 item 2 now has D2 rule Q-10 with O-84's ask, instead of re-ruling against a shipped 10.2.0 cure. The metric cure is §3.4 item 5.
- Four gates, G27 to G30 (`W-I.1.md:229-232`). G29 and G30 were re-run at `be1969ea`: G29's lock half exits 1 and its floor half exits 0; G30 exits 1.
- The π row and a MIGRATION row for `min-inline-size: 3ch` are added.

**Elsewhere.** W-0.7's CUR row, CHANGELOG bullet list, glance list and G5 no longer carry O-84 or O-84a. W-E.7's mechanism row now points at W-I.1. The LEDGER rows now point at W-I.1: O-84, O-84a, UIA-F-105, UIA-KF-215, U-1, DOCKET-Q-10, and CUR:79 (now FOLD).

### FB-15 · W-0.7 G5 pins a D3 mechanism

**Cured** (`W-0.7.md:86`). The `--glass-veil-ink: oklch(0.28 0.035 70)` = 0 clause is struck. The veil cure is read in paint: W-0.1's G1 (`m1-no-grey.mjs`, M-1) runs on a build of the unpacked 10.2.0 tarball and must exit 0, whichever mechanism D3 converged on. On 10.1.0 that reading is W-0.1's HEAD `FAIL (11 of 11 gated rows)`, so the clause is not vacuous. The `min-inline-size: ?3ch` clause is struck with FB-14.

### FB-16 · Band 0 waits on an owner answer scheduled inside its own cut

**Cured.**
- **OW-12 is retired** (`LEDGER.md:335`, "not owed", RETIRE).
- **Why it was never the owner's question.** CUR:80 rules the substance, a named token at the existing size, and names no token. The `--type-title` in IN:40's parenthetical is the published display rung. Taking it in a minor moves every reader from 32.928 to 23.669 px (W-0.9 §2), which the ruling rejects in its own words ("the size is unchanged").
- **The name.** W-0.9 ships `--type-card-title`, the consumer's own proposal (`valuejs-outbound-2026-09-25-card-title-rung.md:6`), at `W-0.9.md:18`.
- **The gate.** G4 is now the tree gate `grep -qE '^\s*--type-card-title:' src/styles/typography/scale.css`. It exits 1 at `be1969ea` (`W-0.9.md:51`).
- **The edge.** PLAN §5's W-0.9 row reads `—` (`PLAN.md:277`), and PLAN §6's OW-12 bullet is struck. W-0.7 no longer asks OW-12 at the confirmation. The owner sees the token in the CHANGELOG entry they confirm.
- **The docket.** 14 rows read `pending` (`grep -cE '^\| (OW|DOCKET)-[^|]*\|.*\| pending \|' LEDGER.md`).

### FB-17 · OW-12 option (b) is an unowned 11.0.0 break

**Cured by FB-16's cure.** No option renames `--type-title` or the card token, so there is no 11.0.0 break to own. `W-0.9.md` §7 reads "None: one token is added, and no published name is removed or renamed in either release." The finding's second clause, the blob's `fissioning?`, is cured under FB-03.

### FB-18 · Disease rows whose enacting gate belongs to a shared wave

**#45 (W-B.9): cured.**
- **The port is W-B.9's own act.** W-B.9 builds the constellation's WebGPU port on the shared device, on the fourier-field pattern (`W-B.9.md:26`). R2-06-10's constellation half moves here from W-G.1. PLAN §5 gives W-B.9 edges on W-A.3 and W-A.4, both from an earlier band.
- **Gates.** B9-G1 (`W-B.9.md:38`) exits 1 at `be1969ea` (3 code lines). The new B9-G2 is the route's context tally, and π-CONSTELLATION moves here.
- **The old B9-G2 was red by a wrong path.** It grepped `src/components/constellation/types.ts`, which does not exist (`ls` → no such file), so it could never go green.
- **Its subject is cured at HEAD.** `pinned`, `pinnedDrift` and `accentEdges` are declared (`Constellation.vue:51-53`; `README.md:149-151`). W-B.9 §3 item 2 records three of the slides items as CURED at HEAD and two as DECLINE.
- **W-G.1.** Its G1-G10 and its constellation item are struck. `LEDGER.md:111` (#45b) now points at W-B.9.

**#78 (W-B.11): cured.**
- **The enactment** is the wave's own `git rm` of the salvaged emitter. B11-G1 reads `! git ls-files --error-unmatch docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/regen-design-canon.mjs` (`W-B.11.md:38`).
- **Readings.** The gate exits 1 at `be1969ea`. On an untracked path it exits 0.
- **Duplicates struck.** B11-G2 duplicated C3-G2 and B11-G3 duplicated C1-G1. W-C.1 §1 and §8 now cite C1-G1 as the source.

**C-8 (W-I.7): cured.**
- **The order is flipped.** In PLAN §5, W-I.7 depends on the D2 gate, W-C.1 and W-E.2, and W-I.1 depends on W-I.7 (`PLAN.md:340,346`, note at `:376`).
- **I7-G4** (`W-I.7.md:45`) is run by W-I.7 on its own candidate.
- **W-I.1 G7** now holds the first and last seats' ring rows instead of building their cure. W-I.7 §3 item 3 already requires the converged carrier to keep I7-G1 to G3.

**#64b (W-B.12): partial.**
- **B12-G3 is struck.** C2-G7 is the one source for the 27 shadcn lines, and W-C.2 §1 now cites it.
- **B12-G2 now goes green at W-B.12's own close.** PLAN §5 orders W-B.12 after W-A.2 (`PLAN.md:296`).
- **What remains.** The column's RETIRE removes nothing from the tree, because the column was never drawn. So B12-G2 reads the ruling's ground, not an act of the wave. This seat found no tree act that would not invent scope. A pass-3 critic may hold that a RETIRE of a never-built column needs no enactment gate beyond its ground. It may instead ask for the ruling to be written where the holders enforce it: a field in `roster.json`, which W-A.2's schema does not have. This row is listed under Open.

### FA-17 · D5 has no portfolio

**Still open, owed outside this seat's fence.** Opening D5 writes `design/engagement/PORTFOLIO.md`, a round-0 portfolio, or records the owner's ruling that folds the rung into D4 or D2. The fence forbids writing `design/`. W-J.2's executable gates stand (G1-G3 born RED, G6 a hold line), and PLAN §6 still names the act as owed before W-J.2's turn.

## Open

- FA-17: D5's round-0 portfolio (a `design/` write; the design orchestration owns it).
- FB-18 #64b: whether a RETIRE of a never-drawn column needs a tree enactment beyond its ground-check gate.
- The pass-2 notes outside the checklist were not taken up, except the W-E.1 group tags, which the FB-13 retag did not touch: docket-gate strength, O-86 in PLAN §3, H5-G3's D3 outcome, band-0 ruling provenance, and P-1's gestalt sections.

## Appendix Q · this seat's fixture probes

Each app is built with fix-2's `build.mjs` (`formation-audit/fix-2.md` appendix P, unchanged) as `node build.mjs <worktree> <label>`, and run with `node measure.mjs <label>`.

### Q1 · the micro rung and the strip's coarse hit (E7-G17, E7-G18)

`App.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { SegmentedTabs } from "@glass/components/tabs";
const v = ref("a");
const opts = [{ label: "Alpha", value: "a" }, { label: "Beta", value: "b" }, { label: "Gamma", value: "c" }];
onMounted(async () => { await nextTick(); (window as any).__ready = true; });
</script>
<template>
  <main style="padding:24px">
    <SegmentedTabs v-model="v" :options="opts" aria-label="strip" data-probe="seg" />
    <p style="margin-top:24px"><span class="text-micro" data-probe="micro">Micro caption text</span></p>
  </main>
</template>
```

`measure.mjs`:

```js
import fs from "node:fs"; import path from "node:path"; import http from "node:http";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(HERE, "builds", process.argv[2] ?? "head", "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}/`;
for (const [eng, bt] of [["chromium", chromium], ["webkit", webkit]]) {
  for (const [cell, opts] of [["coarse390", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: bt === chromium }], ["fine1440", { viewport: { width: 1440, height: 900 } }]]) {
    const b = await bt.launch(); const ctx = await b.newContext({ deviceScaleFactor: 1, ...opts }); const page = await ctx.newPage();
    await page.goto(base); await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 }); await page.waitForTimeout(400);
    const m = await page.evaluate(() => {
      const micro = document.querySelector('[data-probe="micro"]'); const fs = parseFloat(getComputedStyle(micro).fontSize);
      const btns = [...document.querySelectorAll('[role="tab"], [role="radio"], .segmented-tab')].filter((e) => e.getBoundingClientRect().width > 0);
      const b = btns[1] ?? btns[0]; if (!b) return { microPx: fs, strip: "no button", mobile: !!document.querySelector('.segmented-tabs__mobile') };
      const r = b.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const hits = [[0, -21], [0, 21], [-21, 0], [21, 0]].map(([dx, dy]) => { const e = document.elementFromPoint(cx + dx, cy + dy); return !!e && (e === b || b.contains(e)); }).filter(Boolean).length;
      return { microPx: fs, box: [+r.width.toFixed(1), +r.height.toFixed(1)], hitsAt21: hits, cls: b.className.slice(0, 60) };
    });
    console.log(JSON.stringify({ eng, cell, ...m })); await b.close();
  }
}
srv.close();
```

Output at `be1969ea`:

```
{"eng":"chromium","cell":"coarse390","microPx":11,"box":[65.5,26.3],"hitsAt21":2,"cls":"segmented-tab glass-capsule-hover"}
{"eng":"chromium","cell":"fine1440","microPx":11,"box":[85.2,34.6],"hitsAt21":2,"cls":"segmented-tab glass-capsule-hover"}
{"eng":"webkit","cell":"coarse390","microPx":11,"box":[65.5,26.3],"hitsAt21":2,"cls":"segmented-tab glass-capsule-hover"}
{"eng":"webkit","cell":"fine1440","microPx":11,"box":[85.2,34.6],"hitsAt21":2,"cls":"segmented-tab glass-capsule-hover"}
```

With the plant `@media (pointer: coarse) { :root { --type-micro: 0.75rem; } .segmented-tab { position: relative; } .segmented-tab::after { content: ""; position: absolute; left: 50%; top: 50%; translate: -50% -50%; width: max(100%, 2.75rem); height: max(100%, 2.75rem); } }` appended to `typography/scale.css`, Chromium reads `coarse390` `microPx 12`, `hitsAt21 4`, and `fine1440` `microPx 11`, `hitsAt21 2`.

### Q2 · a toast over an open overlay (A2-KE-L1-27)

`App.vue`:

```vue
<script setup lang="ts">
import { ref, h, onMounted, nextTick } from "vue";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@glass/components/dialog";
import { Toaster, toast, ToastAction } from "@glass/components/toast";
import { Popover, PopoverTrigger, PopoverContent } from "@glass/components/popover";
import { SheetContent } from "@glass/components/sheet";
const sheetOpen = ref(true);
const kind = new URLSearchParams(location.search).get("k") ?? "dialog";
const popOpen = ref(true);
const open = ref(true);
(window as any).__clicks = 0;
onMounted(async () => { await nextTick();
  toast({ title: "Saved", duration: 600000, action: h(ToastAction, { altText: "Undo", "data-probe": "tact", onClick: () => { (window as any).__clicks++; } }, () => "Undo") } as any);
  setTimeout(() => ((window as any).__ready = true), 800); });
(window as any).__open = () => (kind === "pop" ? popOpen.value : kind === "sheet" ? sheetOpen.value : open.value);
</script>
<template>
  <Popover v-if="kind==='pop'" v-model:open="popOpen"><PopoverTrigger style="margin:40px">Open</PopoverTrigger><PopoverContent>Popover body</PopoverContent></Popover>
  <Dialog v-else-if="kind==='sheet'" v-model:open="sheetOpen"><SheetContent side="left"><DialogTitle>Sheet</DialogTitle><DialogDescription>Body</DialogDescription></SheetContent></Dialog>
  <Dialog v-else v-model:open="open"><DialogContent><DialogHeader><DialogTitle>Edit</DialogTitle><DialogDescription>A dialog under a toast.</DialogDescription></DialogHeader><p>Body</p></DialogContent></Dialog>
  <Toaster />
</template>
```

`measure.mjs`:

```js
import fs from "node:fs"; import path from "node:path"; import http from "node:http";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const { chromium, webkit } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(HERE, "builds", process.argv[2] ?? "head", "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}/`;
for (const [eng, bt] of [["chromium", chromium], ["webkit", webkit]]) for (const k of ["dialog", "pop", "sheet"]) for (const touch of [false, true]) {
  const b = await bt.launch(); const page = await (await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, hasTouch: touch })).newPage();
  await page.goto(base + "?k=" + k); await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 }); await page.waitForTimeout(300);
  const box = await page.locator('[data-probe="tact"]').boundingBox();
  const hit = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e ? (e.closest('[data-probe="tact"]') ? "action" : e.tagName + "." + String(e.className).slice(0, 40)) : null; }, [box.x + box.width / 2, box.y + box.height / 2]);
  if (touch) await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2); else await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(500);
  const st = await page.evaluate(() => ({ clicks: window.__clicks, dialogOpen: window.__open(), dlgInDom: !!document.querySelector('[role="dialog"]') }));
  console.log(JSON.stringify({ eng, k, touch, hit, ...st, pass: st.clicks === 1 && st.dialogOpen === true })); await b.close();
}
srv.close();
```

Output at `be1969ea`: 12 of 12 rows `"hit":"action","clicks":1,"dialogOpen":true,"pass":true` (Chromium and Playwright WebKit × `dialog`, `pop`, `sheet` × mouse, touch). In `pop` rows the `dialogOpen` field reads the Popover's open state.
