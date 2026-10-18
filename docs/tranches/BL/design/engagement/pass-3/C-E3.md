# D5 pass 3 · C-E3 · critique of route E (the engaged stage on F5′ + P-A3-light): INCOMPLETE

| field | value |
|---|---|
| seat | D5 pass 3, **C-E3**, fresh adversarial critic of route E. I authored no D5 pass-2 or pass-3 seat |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD `a11a6ed6a` + `pass-3/P-E3-veil.patch`. `git diff --stat 6fdcd6b28 HEAD -- src tests package.json demo vite.config.ts` is empty, so this is P-E3's source. Worktree `.claude/worktrees/bl/D5/p3/C-E3/wt`, created fresh, then removed with `git worktree remove --force`. The empty directory `…/C-E3/` remains because the permission system refused the `rmdir` |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). `../../../audit/INBOUND.md` (mtime 2026-10-16 06:40) holds no ruling on Q-1..Q-5 at this seat's start. O-87 binds |
| **state** | **INCOMPLETE.** The workflow made me return about 4 minutes after the batteries started. One battery cell group was read (E-3 veil, Chromium). The WebKit queue was still waiting on the `--exclusive webkit` lock (queued 22:08:14) and never ran. I stopped every run I had started and released the D5 harness lock. Nothing is left running |
| records | `C-E3/run-ce3.sh`, `C-E3/wk-ce3.sh`, `C-E3/chain-ce3.sh` (the queues, ready to re-run), `C-E3/probe/ce3-probe.mjs` (my adversarial cells, not yet run), `C-E3/ck22-greps.sh`, `C-E3/logs/` |
| prior instance | An earlier C-E3 instance (20:34-21:29) left partial logs and no report. I moved its files to `C-E3/prior-instance/` and cite **none** of its numbers: they come from commands I did not run |

## 0 · Score

**Rows closed by my own replay in both engines: 1 of 27 (CK-23).** Every other row is **OPEN**, either because I did not run its WebKit cells or because I ran no cell for it at all. A row never closes on Chromium alone. This score says the critique is unfinished. It is not a verdict that route E regressed: nothing I measured refutes the route's centre.

## 1 · What I measured (my commands, with load)

| item | reading | load (1/5/15) | record |
|---|---|---|---|
| builds | the harness app (`veil`, `noveil`), the probe app (`probe-veil`, `probe-noveil`), and the plants `p-anchor` (one shared anchor name), `p-char` (any printable key engages), `p-script` (script focus engages), `p-tabhand` (keyboard writes `data-held`), `probe-p-scrubveil` (scrub raises the veil) and `probe-p-vis` (the veil rests visible). Every build exits 0, and every plant is restored byte-identical. Harness app sha1 `3fb393c67b89`, the same as H3's | — | `logs/chain-builds.txt`, `logs/build-*.log` |
| E-3, veil, Chromium | **PASS 22/0** | 14.9/13.4/10.0 | `logs/veil-chromium-E-3.log` |
| CK-23 cost | composition vs HEAD: **175 files, +3599/−1458** (162 tracked, +1237/−1458, plus 13 new files, 2362 lines). Over P-A3-light, read from a short-lived second worktree that was then removed: **21 files, +1162/−283**. Fixed cost: `stage.ts` 316, `settle.ts` 60, `engage-stage.css` 74 lines. All of these match P-E3 §2 | — | commands in session; no file |
| CK-22 consumer greps | re-run at 22:08:35 over 9 siblings, read only (`logs/ck22-greps.txt`). No sibling names `--engage-footprint`, `--scrub-pitch`, `.glass-focus-veil` or `data-engaged`. No sibling has a global `[popover]`, `:popover-open` or `::backdrop` rule that could restyle a promoted control (keyframes.js's hits are its own `.menu:popover-open`, a scoped compiler test). `<NumberField>`: speedtest 6; keyframes.js, value.js and fourier-analysis 1 each | — | `logs/ck22-greps.txt` |

## 2 · Findings from source reads (static, not driven)

1. **P-E3.md's header swaps the patch hashes.** `shasum`: `P-E3-veil.patch` is `3d407e1c`, `P-E3-noveil.patch` is `f7f16a44`. The header gives the reverse. `diff` confirms the veil patch carries `KEYBOARD_VEIL = true`. This is a records defect (P-3).
2. **E-M1 understates the consumer-anchor path (CK-22, static).** `stage.ts` `promote` writes `position-anchor` on the host's inline style, and `hide` calls `removeProperty("position-anchor")`. A consumer's own inline `position-anchor` is therefore lost **after** release, not only "overwritten while it is engaged", as E-M1 says. My probe cell `consumer anchor restored` is built to drive this but has not run. Until it runs, this is a static reading.
3. **§P2-7 class 12 is still present.** `hold.ts` `onPress` acquires on any `pointerdown`, with no button filter. The scrub does filter: `p.button !== 0` returns. My probe's `right-button press` cell (REPORT) has not run.
4. **CK-12: my ruling on the pitch.** `--scrub-pitch: 1ch` is a unit that carries its own reason (one glyph cell of the value). It is not a magnitude tuned to a witness, so I rule it admissible. The split between `HOLD_SLOP_PX` and the pitch is real in source (`useEngage.ts` `Math.trunc(dx / pitch)`). At the harness's font the two figures differ by under 0.5 px, so only the unit plant tells them apart, and I did not run that plant. The other figures CK-12 names hold in source: the Switch thumb rides `--spring-dock` (`switch/styles.css:49`); `RELEASE_RULE.windowMs` is its own constant; `--scale-engage` is the ladder's engaged row (`tokens/scale-paper.css:33`). The row stays **OPEN** until the unit plant is read.
5. **CK-16 (unread by every seat) is now reachable.** `ce3-probe.mjs` isolates Skeleton (`skeleton-breathe`, opacity) and StatusDot (`feedback-mark-pulse`, scale and opacity on `::after`). It reads layouts/s through CDP in Chromium and whether either animation stops 3000 px off-screen. Neither component's source has an off-screen park (no IntersectionObserver and no `content-visibility` in `skeleton/` or `status-dot/`), so I expect the off-screen cell to FAIL. Not run.

## 3 · Per CK row

| row | status | why |
|---|---|---|
| CK-01, 02, 03, 05, 06, 08, 09, 10, 11, 13, 14, 15, 16, 18, 19, 20, 21, 24, 26, 27 | OPEN | no cell of mine was read in either engine |
| CK-04 | OPEN | Chromium veil E-3 22/0 (load 14.9). The noveil arm, the plants (`p-char`, `p-script`, `p-tabhand`) and every WebKit cell were not run |
| CK-07 | OPEN (owner, Q-2) | |
| CK-12 | OPEN | §2 item 4: admissible in source, unit plant not run |
| CK-17 | OPEN (owner's safaridriver checkbox) | every real-Safari cell UNMEASURED |
| CK-22 | OPEN | greps re-run (§1). E-M1 understates the release path (§2 item 2, static) |
| CK-23 | **CLOSED** | §1, matches P-E3 |
| CK-25 | OPEN | I captured no glance frames of my own (`cap-*` was queued, never run). I give no "iOS-27 grade or not" reading: I will not grade a gestalt from frames I did not take |

## 4 · Next-pass defect classes (no row added)

- The P-E3 records hash swap (§2 item 1).
- A critic seat whose WebKit queue cannot be admitted within the seat's life returns open. Twice now in D5 (C-CP in pass 2, and this seat), the critique outlived its slot. The next C-E3 should start the WebKit acquisition before anything else.

## 5 · To finish this critique (the next C-E3 seat)

1. Re-create the worktree (`git worktree add --detach …/C-E3/wt HEAD`, apply `P-E3-veil.patch`, symlink `node_modules`).
2. Run `zsh C-E3/run-ce3.sh builds`, then `zsh C-E3/chain-ce3.sh wk` and `zsh C-E3/chain-ce3.sh ch`.
3. Run `zsh C-E3/run-ce3.sh unit` after the batteries finish. It edits the worktree source, and E-7 reads that source.
4. Tabulate from `C-E3/json/` and `C-E3/logs/`, read the glance frames under `C-E3/glance/`, and complete §3.

## 6 · Fences kept

No tracked source changed in the checkout and no git write ran there. Writes in the checkout went only to `docs/tranches/BL/design/engagement/pass-3/C-E3*`. Sibling repos were read only (grep). Every build and browser run went through `guarded`, and WebKit was queued only through `--exclusive webkit`. One browser at a time under the D5 harness lock. No `~/.claude` read. Both worktrees I created are removed and nothing is left running.
