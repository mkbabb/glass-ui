# 10.1.5 — fix round 8 (critique-8.md: N1 to N3), and O-182's record

Seat: claude-opus-5-5. Every browser run went through `guarded` (WebKit 2287 under
`--exclusive webkit`). Records `docs/release-10.1.5/fix-8/`; drivers
`scripts/witness-fix-8.sh` (the branch spec, g6, then the RED arm: the `src` files this
round changed, checked out from the round-8 tip `3592aeb0d` and restored after),
`scripts/gates-fix-8.sh` and `scripts/chain-fix-8.sh`.

## O-182, the dark halo: commit `9aaf0a79c`

The orchestrator's round-8 note asks that the O-182 commit be named here. It is
**`9aaf0a79c`** (`fix(tokens): 10.1.5 O-182`). `src/styles/tokens/dark-arm.css` sets the dark
arm's `--shadow-color` to `color-mix(in oklab, var(--neutral-0), black 50%)`, the page
ground deepened. Before that, the root's `--shadow-color: var(--foreground)` resolved under
`.dark` to the light ink, so every elevation shadow cast light on the night ground. **This
moves an existing token value** (the dark arm's `--shadow-color`). The cure is the token
itself, as the patch law allows. The light arm keeps the foreground. Its witness is `m5`:
the 24 px band around horizontal, vertical and collapsed docks at 390 and 1440, in dark on
a flat `--background` ground, has no pixel lighter than the ground. The bundle ratchet was
rebound for it in `d04dfd9a8` (+63 B).

## Cures

- **N1, a fitting vertical dock's seats step 6 px at the expand's settle.** The yield was
  gated `.vertical.expanded[data-run-fits]:not([data-morphing])`, so the run held its whole
  reserve through a morph and switched at its edge. That is a step at an expand's settle,
  and by the same gate one at a collapse's start. Now `data-run-fits` and
  `--dock-run-room-block` are the expanded run's reading at rest, held through every morph.
  `publishYield` (dockMorphMeasure.ts) reads only while the full pane is active and no
  morph holds the root: at an expand's arm (post-flush, before `[data-morphing]`, the root
  at its expanded rest), at rest, and once more at a settle (`release`). The rule is
  `.glass-dock.vertical[data-run-fits] .dock-run`. The yield the run rests in is the yield it
  morphs in, so no seat moves at either edge, and the panes never see the padding change
  under them.
  Fix 7's first form, ungated, failed the bottom-anchored D-1 reversal. In that form the
  reading still re-ran at a collapse's arm, where the full pane is out of flow and does not
  fit, so the padding flipped while the morph anchored its panes. That is the likely
  mechanism; I did not re-trace it. Holding the reading removes the flip, and D-1 holds
  (below).
- **N2, the m5 witness in WebKit.** The band now excludes the plate's antialiased edge by
  2 px from its box, not 1. The clip's origin is fractional (the plate sits at x 66.59 at
  390), and WebKit rounds it where Chromium does not, so the edge pixel lands 2 px out.
  The cure was never what failed: critique 8's c8a finds no lighter pixel 3 px or further
  out in any cell, in either engine. v10.1.4 lights 900 to 12,000 band pixels per cell, so
  m5 stays RED there.
  - The records are corrected. `implement.md`'s "Fix round 7" no longer lists O-182 as not
    cured, and its token line names the `--shadow-color` move.
  - Fix 7's committed `fix-7/gates.txt` showed `vitest exit=1` (the `dockMorphMeasure`
    scroll-capture flake, `fix-7/vitest-flake.log`) and `verify-package exit=1` (the ratchet
    before the `d04dfd9a8` rebind). Critique 8's g7 on that tip is GREEN. This round's
    gates are below.
  - Fix 7's WebKit branch run was 82/84 with the two m5 horizontal cells failing
    (`fix-7/witness-webkit.txt`). That is this witness defect.
  - The CHANGELOG's token sentence now names the three moved values: `--dock-cap-rest`,
    the coarse `--control-text` pair, and the dark `--shadow-color`. Its r2 bullet now
    gives the cure as built (the cap animations come off under `.collapsed`), and it gains
    an O-182 bullet. The close seat still owns the CHANGELOG rewrite.
- **N3, the end seat's ring at the fit edge: the bound is accepted and recorded, not cut.**
  This is a ruling question, and the two rulings meet at the fit edge.
  - Rounds 5 and 6 say the end seat's ring stays whole.
  - r1 and M2 (g1: `scrollWidth = clientWidth` on a run that hides nothing) say a run
    whose seats fit has nothing to scroll.
  - When the room the seats leave is under the ring's reach (4 px a side), both cannot
    hold. The only way to keep the ring would be a run that scrolls while every seat shows,
    which is the defect r1 and M2 cured.
  - The release's own gate is the patch law, so the bound holds. On a run whose seats fit
    with room `r` per side under the ring's reach `k`, a keyboard-focused end seat's ring
    is clipped by `k - r` at most, which is under 4 px. The band is the last `2k` px of
    cap before the seats stop fitting. Past it the run overflows, keeps its whole reserve,
    and the ring is whole at the scroll end.
  - Horizontal, this is better than v10.1.4, which cuts 4 px at every cap in that band.
    Vertical, v10.1.4 had no reserve at all.
  - If the owner rules the other way, the cure is one reading: `fits` becomes
    `span + 2k <= port`, and a run in that band scrolls with its cap cut.

## Witnesses

`release-10-1-5.spec.ts` `n1` (fine and coarse): a vertical dock of six icon seats,
`collapse="closed"`, at stages 316 to 348 in 8 px steps (the band where the reserve
yields, on both pointers). For each stage, the expand is traced to its settle and the
collapse from its first frame. S1's top and S6's bottom must step no more than 0.5 px
between the last morph frame and the first rest frame, and between the last rest frame
and the first collapse frame. The sweep must reach a dock whose reserve yields.

### Results

| run | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts`, the branch (`fix-8/branch-*.log`) | 86/86 | 86/86 (m5 horizontal now GREEN) |
| `n1` on the round-8 tip's `src` (`3592aeb0d`, RED arm) | 2/2 fail, both at the expand's settle and the collapse's start | 2/2 fail |
| g6 release-10-1-4 | 23/23 | 15 passed, 8 skipped (`page.pdf`) |
| g6 release-10-1-3 | 60/60 (D-1 31/31 among them) | 57 passed, 2 skipped (CDP swipe), 1 failed: the bottom-anchored ancestor-zoom D-1, leaving-summary frame step 2.03 px against a bound of 2 |

The 10.1.3 WebKit failure was there before this round. That cell is intermittent on the
round-8 tip too. Fix 7's WebKit g6 failed it at 2.64 px (`fix-7/g6-10-1-3-webkit.log`).
Fix 6 recorded it as a frame step under load, and critique 8 ran it GREEN. An A/B with the
cell repeated 4 times (`scripts/d1-ab-fix-8.sh`, `fix-8/d1-ab.txt`) failed 1 of 4 on the
branch (2.04 px) and 2 of 4 on the `3592aeb0d` src (3.40 and 2.20 px). The step is a frame
of the expand's leaving summary under WebKit's `zoom`, and the vertical yield is not in it.
I left it open and did not loosen the bound.

### Gates (g7, `fix-8/gates.txt`)

| gate | result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0, exit 0 |
| `npx vitest run --maxWorkers=2` | 247/247 files; 2397 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | the ratchet refused +84 B (2952772 > 2952688), the same on the committed tree (`fix-8/verify-package-2.log`); rebound 2952688 → 2952772, then terminal CLEAN at 10.1.5 (`fix-8/verify-package-3.log`) |

Tokens: no existing token value moves in this round. O-182's `--shadow-color` move is
`9aaf0a79c`'s, named above. Nothing new is public; no export is removed or renamed.
