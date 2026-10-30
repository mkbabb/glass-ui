# D5 · pass 9 · C-E9: fresh adversarial critic (INCOMPLETE: stopped early, the battery was not run to its end)

| field | value |
|---|---|
| model | `claude-opus-5-5`, asserted from own system identity |
| status | **INCOMPLETE.** The harness required a structured return at 22:55 ET, before the battery finished. I stopped every stage I had started rather than leave runs behind (machine law). One Chromium stage finished. The WebKit acquisition was still queued and was never admitted. **No WebKit cell was measured.** |
| rulings read | INBOUND (mtime 21:07:37) ends at O-113. The rows that bind D5 are **O-103f**: Q-3′ = (i), in place under every modality, with the loupe alone promoted; F-5 = (a). So the candidate is the in-place construction, and (c) is the probe |
| HEAD | `186424059` at the seat's start, then `7f0bc572d`. Both moves were docs-only commits (`git diff --stat 186424059 HEAD -- src tests` is empty) |
| patch sha1s (`shasum`) | `P-E9.patch` `0cbe2b6d…` and `P-E9-probe.patch` `4c735aa7…`, as P-E9 recorded. `P-E8.patch` `5dc4d930…`, `P-E8-inplace-loupe.patch` `fdccd7f4…`, `probe-loop-variant.patch` `a6060049…` and `P-A7.patch` `e6e42ba3…`, as §P8-0 and P-E9 recorded. Harness hash `c2ce48c3…`, the same as H9's after. `App.vue` `9e34ffa5714e` |
| builds | `builds.sh` → `logs/builds.log`, all exit 0. The src tree hashes match P-E9's: cand9 `82c3f35a7110` and cand8 `92f38f424df2`. probe9 is `b04f59d8e344`. plant-noread, plant-nolens and plant-loop were also built. The tree returned to the candidate's hash afterwards |
| worktree | `.claude/worktrees/bl/D5/p9/C-E9/wt` was removed with `git worktree remove --force`, and its parent directory too |

## What I measured myself

| row | measurement | result |
|---|---|---|
| CK-20 (Chromium only) | E-10 on cand9, the harness's own app (`logs/cand9-E-10-chromium.log`), 22:38-22:43, load 10.2 → 12.5 | **72 pass, 0 fail, 0 unmeasured of 72 gating cells** (39 reported). It includes H9's anc, dlg, trail, glidescale and two-sided feather cells. The trail films read worst 0 px engaged and 0 px released, `promoted false`. This reproduces P-E9's Chromium 72/0 |
| CK-23 | `git apply --numstat` | the candidate is 198 files **+5072/−1648**, src 153 files **+3088/−1359**. The probe is src +3450/−1358. pass-8's P-E8 is src +3380/−1355. E's change over P-E8 sums to src **+225/−521** (`E9/numstat-E9-over-PE8.txt`). P-E9's figures reproduce to the line |
| P-1 | `grep -rn -e` in the candidate's src, tests excluded | `engage-footprint`, `writePaint`, `worldOf`, `held-scale`, `position-visibility` and `--veil-x` each count 0. `byTouch` survives only as hold.ts's internal flag (4 lines), as P-E9 §1.1 item 4 says. The two `anchor-name`/`position-anchor` hits are the loupe's own |
| CK-22 (part) | `bash ../E9/ck22-greps.sh` → `logs/ck22-greps.txt`, at glass-ui `7f0bc572d` | The self-check counts (`--veil-[xy]` 22 in src), so `grep -e` works. The `<Slider>` counts (atlas 2, bbnf-buddy 1, keyframes.js 4, speedtest 2, value.js 6, fourier-analysis 5, sci-report 5) and the `<NumberField>` counts (1/6/1/1) reproduce C-2's. The `tap-squish`/`interactive-item` counts (chicago 3, speedtest 5, keyframes.js 2, fourier-analysis 1) reproduce C-1's. Pass-1 coverage: §6.1/§6.2 name M-A1..M-A8, every P-B row that exists (P-B §7 has no M-B6), P-E rows 1-6 and F5's seven lines. I read nothing contradicting the table, but I did not read C-2 or C-9 against painted bytes in a browser |

## Not measured (each row stays as named)

- **Every WebKit cell.** The single `--exclusive webkit` acquisition was queued at 22:38:28 and never admitted before I stopped it at 22:55. Under the charter, every row I could close needs WebKit cells, so **every row is OPEN on this critique**.
- **Chromium stages stopped before they ran or finished:** cand8-E-10new and noread-E-10 (plants), E-13 with the nolens plant, tip, the idle cost (O-103f (1)'s non-builder re-measure: **still owed**), the loop and the loop plant (O-103f (3)), E-4 with velocity under load, the probe's E-10, E-13 and idle, E-1..E-12, CAP, and both glance sets. **No gestalt was read (CK-25)**: no frames were captured.
- **My own cells**, written and syntax-checked but never run: `probe/ce9-probe.mjs`. They cover the stacking frame (a later positioned sibling over an engaged control), the lens under `zoom: 0.8`, nested scale, `scale: 1.25`, rotation and scale at the viewport's top, the lens on a held wheel scroll, **the lens's side flip at the viewport's top during a hold**, the extra ancestor kinds (skew, mask-image, zoom, perspective, mix-blend-mode), the DOM's words against C-2 and C-9, the lens over the Dialog, and an engaged body that fills its scroller's width.

## Next-pass defect classes (reading of the bytes; unmeasured, no row added)

1. **The lens's painted scale ignores CSS `zoom`.** `stage.ts` `paintedScale` multiplies only `transform` and `scale` up the ancestors. If an ancestor has `zoom: 0.8`, the band is expected to read ×2.0 rather than ×1.6. That would make C-9's "at its scale" overclaim. Untested: `ce9-probe lens zoom`.
2. **The lens's side flip is one frame.** When the lens's top crosses the viewport's top during a hold, `placeLens` toggles `data-engage-lens-below` and zeroes its correction for that frame ("re-read next frame"). The lens jumps from above the track to below it in one frame, and under a scaled card the first frame after the flip is misplaced. That would be a CK-20 instance if measured. Untested: `ce9-probe lens flip`.
3. **The lens on a compositor scroll under a scaled card.** The anchor's scroll compensation is unscaled while the track paints at 0.8×. P-E9 §8 gap 2 says the same; no film reads it.
4. **The in-place grow takes its reach from the viewport, not from a clipping ancestor.** A slider as wide as its scroller's content box would have its grown ends cut by the scroller. This is consistent with the invariant, but it is a gestalt question. Untested: `ce9-probe narrow`.

## Records

`C-E9/`: `builds.sh`, `run-ce9.sh`, `chain.sh`, `wk-queue.sh`, `wk-w1.txt`, `probe/ce9-probe.mjs`, and `logs/` (`builds.log`, `build-*.log`, `cand9-E-10-chromium.log`, `chain-chromium-1.log`, `wk-queue.log`, `ck22-greps.txt`). Nothing of mine is left running. Nothing under `~/.claude` was read. I made no git write except `git worktree add` and `remove`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**.
