# D5 · pass 7 · C-A7: critic of the candidate (HEAD + P-E7.patch) — INCOMPLETE, NOT SCORED

| field | value |
|---|---|
| status | **INCOMPLETE.** The seat was told to return before its batteries ran. No browser cell was replayed except Chromium E-1. **No row is closed by this seat**; this is not a scoring of the candidate, and the agglomerate must not count it as one |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `71a668bbf` (docs-only since P-E7's seat base `2db234357`: `git diff --stat 2db234357 HEAD -- src tests` empty) |
| rulings | INBOUND mtime 2026-10-27 22:58, unchanged (last D5 row O-103d). FORMATION-PROGRESS read to "critic-4" 10.1.3 line; nothing newer binds D5 |
| records | `C-A7/` runners (`run.sh`, `stages.sh`, `chain-webkit.sh`, `builds.sh`, `plants.py`, `ck22-greps.sh`), the probe `C-A7/probe/c7-probe.mjs` (written, **never run**), `C-A7/logs/` |

## 1 · What ran

- **sha1s match**: `P-E7.patch` `a6c82db1…`, `P-A7.patch` `e6e42ba3…`, `F5ppp.patch` `24cec509…`, `P-A6.patch` `2464bf18…`, `P-E6-noveil-coarse.patch` `8f952538…`. The harness hash is `7bf3ce6f…` (H7's).
- **Applied** to a worktree at HEAD with `git apply --check` clean. **CK-23 reproduced to the line:** 198 files, +5180/−1598; src 153 files, +3243/−1318 (179 tracked + 19 new files).
- **Scene app built** (`logs/build-c7.log`, exit 0, 55 directories, scene app `9e68012e9522`, load 34.5).
- **Chromium E-1** (`logs/bat-chromium-E-1.log`): 93/1/2 at load 32-35. The fail is the `dock` latch 54/55 (D2's). The ambient is UNMEASURED (the engine limit).
- **Every plant anchor applies on the composed candidate.** These are P-A7's chipmute, prmY, crest, thumb and writer, and P-E7's clip6, loupe6 and fling6. Each was applied and reverted, and the tree hash read back `f4ac7add8398` both times. No plant was built.
- **The chain was stopped by hand**, inside E-7. E-2..E-6 had waited at the guard's load gate (load 36-41) or were killed mid-stage; their logs are partial and UNREAD. **The WebKit acquisition was never taken.**
- Worktree removed (`git worktree remove --force`), and `.claude/worktrees/bl/D5/p7/C-A7/` deleted. No C-A7 process is left running.

## 2 · Static findings (no browser; these stand as reads, not scores)

1. **CK-22: E's earlier MIGRATION rows describe retired bytes.** The rows are:
   - `pass-2/P-E2.md` §4 row 1, "it escapes ancestor clipping, stacking and `overflow`". This is now the opposite of M-24, which clips a promoted control to its place.
   - P-E2 row 2's veil arm, and row 4's "the stage's one veil (a `<body>` child popover)".
   - E-M8's `true` arm, and the `"every"` clauses of E-M1 and E-M7.

   P-E4 through P-E6 carried every one of these as "stand under the composition". P-E7 adds M-23..M-26 but retires none of them (its own gap 6). §P6-2 item 7 counted A's stale rows (P-A5 row 4, P-A4 M-9) as a CK-22 counterexample. By that precedent, this is one too. **CK-22 cannot close on the candidate as it stands.**
2. **M-20's consumer census targets the wrong population** (`logs/ck22-greps.txt`).
   - **What it lists:** the `setCursor` callers.
   - **value.js** (`useAtmosphere.ts:315`) calls `useAurora` directly, so it has no `<Aurora>` root leg at all. C-E6 §0.5's "two writers" did not apply to it.
   - **The `<Aurora>` mounts:** atlas `Atmosphere.vue:137`, speedtest `App.vue:48` and keyframes.js `HeroAurora.vue:25`. All three are `pointer-events: none`, so the root leg never fires in any consumer. (The sci-report hit, `DashboardView.vue:196`, is a comment.)
   - **Verdict:** the row's conclusion, "nothing changes for them", holds for a different reason than the one it gives. The handoff latch has no consumer that exercises it. This is a note, not a counterexample.
3. **The `.glass-card` and `.glass-specular-track` press move.** P-A7's M-1 grep left both classes out. Re-grepped: the one consumer site, speedtest `CompleteBadge.vue:16`, is `role="img"`, not pressable. No new site is owed.
4. **CK-12 is unscored.** The source gives a non-witness reason for both crests: the press mirrored is 1.04, and the engaged rung is 1.06 for a command and for the 20 px bit. The 0.8 px floor the bit clause leans on predates D5 (`control-bit.css:289-294`, HEAD).
5. **Unread hypotheses.** The probe was written to test these and was never run; they are not findings:
   - the H7 chip cell may pass a hover no eye sees (plant `chipfaint`, hover ink 0.001);
   - the clip under real wheel scrolling;
   - the loupe cut by the new clip when a slider sits at a card's top edge.

## 3 · Score

None. Every row stays OPEN for this seat, because no row has a replayed measurement in both engines. CK-01, CK-17 and CK-19 are held by D2 and D3 in any case. CK-22 has the counterexample in §2 item 1. A follow-on critic should run `C-A7/stages.sh` (Chromium), then `chain-webkit.sh` and `builds.sh` with the plants, then `probe/c7-probe.mjs`, on a fresh worktree.

Real Safari: UNMEASURED (owner's safaridriver checkbox).
