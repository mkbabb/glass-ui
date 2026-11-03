# 10.1.4 — fix 3 (round 3)

Fix seat: claude-opus-5-5. Branch `release/10.1.4` from 33edb4dcd. Defect: `critique-3.md`
F-4. Cure: `d2dfc85b0`. Witnesses: `6a41f6689`. Ratchet rebind: `136c0b0ec`. Logs: `.claude/worktrees/10.1.4-logs/f3-*` (outside the repo).

## F-4: a DataTable in a content-sized host alternated table and cards every frame

Root cause (the critic's): `DataTable` takes its projection from its own root's width.
In a content-sized host (an inline-block, a flex item, an `auto` grid track,
`fit-content`), that width is the width of the projection it renders. With a long body
label and long values the table is narrower than `cardBreakpoint` (label above value)
and the cards wider (label beside value). Each projection's width asks for the other.
At 10.1.3 the loop began at the first size change after mount. The 10.1.4 first-dispatch
cure began it at mount.

The cure is in `DataTable` (critique-3: the composable reports correctly), and it is
critique-3's option 2 with the state held by the component:

- `useDataTableResponsive` returns `cardAt(width)`, the one rule `isCard` reads.
- A post-flush watcher on `isCard` measures the root the new projection rendered (its
  content-box width: `clientWidth` less the inline padding, which is untransformed and
  excludes border and scrollbar, as the observer's `contentRect` does). If `cardAt` of
  that width would take the projection straight back, the width is held.
- The observer callback ignores a reading within 1 px of the held width (the change's
  own echo). Any other width clears the hold and decides again.

In a fixed-width host the root keeps its width across a projection change, so `cardAt`
agrees with the projection and nothing is held: the phone, 768, 1440 and hidden-then-shown
cells are unchanged. In a content-sized host each size change from outside swaps the
projection at most once and then holds. From mount it settles on cards (the table's own
width is under the breakpoint). A row arriving later can swap it once more.

Option 1 (`contain: inline-size` on the root) was not taken: in a content-sized host it
removes the root's intrinsic width, a layout change for those consumers in a patch.

## Witnesses

- Unit (`tests/components/ui/data-table/DataTable.test.ts`): a host that reports 412 px
  as a table and 763 px as cards. The first observation takes the cards, and four
  repeated 763 px echoes keep them. RED on 33edb4dcd's `DataTable.vue` and
  `useDataTableResponsive.ts` (`f3-unit-red.log`), GREEN on the cure.
- Engine (`tests-visual/release-10-1-4.spec.ts`, "critique-3 F-4", harness scene
  `table-osc`): label and value each 36 characters at a 1280 px viewport. Four hosts
  from mount must show at most 1 swap at 1 s and no change by 2 s. A flex host whose
  row arrives 300 ms after mount must show at most 2 swaps and then no change.

| cell | 33edb4dcd (pre-cure) | v10.1.3 sources | cure |
|---|---|---|---|
| Chromium, 4 hosts from mount | RED x4 (123 swaps at 1 s) | GREEN x4 (no first dispatch: a stable table) | GREEN x4 |
| Chromium, rows after mount | RED | RED (123 swaps) | GREEN |
| WebKit 2287, 4 hosts from mount | RED x4 (61-62 swaps at 1 s) | RED x4 (60-61 swaps) | GREEN x4 |
| WebKit 2287, rows after mount | RED (63 swaps) | RED (63 swaps) | GREEN |

The v10.1.3 arm swaps `useResizeObserver.ts` too. In Chromium its mount cells pass for the
10.1.3 reason: the first observation is dropped and the table stays. In WebKit 2287 they
fail at 10.1.3 too. In this harness the synchronous seed and the first observation differ
there, so that observation dispatches and starts the loop. critique-3's probe read a
stable table at 10.1.3 in WebKit, so the 10.1.3 mount trigger depends on the scene. The
rows cell is the latent loop critique-3 measured at 10.1.3, and it is RED in both
engines.

## Gates (the cured tree)

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 2395 passed, 2 failed, 10 expected fail, 1 skipped. Both failures pass on rerun (32/32): `boot-graph` because vitest ran before `demo:dist:build` (ordering), and `dockMorphMeasure` "a capture keeps the run's scroll position" (not reproduced) |
| `npm run build` (guarded) | exit 0 |
| `npm run demo:dist:build` (guarded) | exit 0 |
| `npm run verify:package` (guarded) | refused the growth (2940671 > 2940247, +424 B: the hold). Rebound on the committed tree (`136c0b0ec`), then terminal CLEAN |
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, Chromium | 83/83 GREEN (`f3-release-chromium.json`) |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 73 passed, 10 skipped (page.pdf, CDP swipe), 0 failed (`f3-release-webkit.json`) |
