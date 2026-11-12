# 10.1.5 — critique, round 3 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `db117c331` (23 commits
over `v10.1.4`). I read every commit's subject and the full `src/` diff
(`git diff v10.1.4..release/10.1.5 -- src/`), plus `critique-2.md`, `implement.md`, both
inbound notes (`inbound-O-132.md` with its uncommitted OD-18 addendum, and the untracked
`inbound-O-133.md`), the fix-2 records and `scripts/witness-fix-2.sh`.

## Verdict: NOT RUN in any browser. guarded REFUSED.

The kernel zone count was at the guard's browser and heavy stop for this whole seat:

```
$ ~/.claude/guard/guarded --timeout 2 -- echo heavy-ok
[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.01M (panics near 20.8M; heavy and browser runs stop at 8M): reboot the Mac
$ ~/.claude/guard/guarded --timeout 2 --exclusive webkit -- echo webkit-ok
[guarded] REFUSED: kernel zone data.kalloc.1024 at 8.01M (...)
```

`~/.claude/guard/log/zone.log` read 7,977,028 at 12:00:58 and 8,013,894 at 12:05:08, with a
slope of about 150 to 170/s. Per the seat's orders, a refusal is the stop. No Chromium,
no WebKit, no build, no full vitest, no verify:package and no demo:dist:build ran in this
round. **I reproduced no defects, so this round reports none.** That is not a pass. Every
refutation attempt the brief lists is still owed:

- the dock cap in every posture, width, pointer and direction, including an overflowing run and RTL
- the ring with nothing clipped (OD-13)
- the Slider at every edge and rung
- the type floor across the recipe
- the menu gap
- g6 in both engines

The fix-2 records already carry the same refusal for WebKit (`fix-2/witness-webkit.guard.log`,
zone 8.00M). So **the critique-2 E1 to E3 cures (`3d811caba`) have never been witnessed in
WebKit**, and neither has the fix-2 g6 (`fix-2/` has Chromium logs only). The only WebKit
evidence on the branch predates `3d811caba`.

## What ran (all `guarded --light`, admitted)

| run | result | record |
|---|---|---|
| vitest, 4 files the patch touches: `tests/styles/typed-track-seam.test.ts`, `tests/components/custom/dock/g-dock-lattice.test.ts`, `tests/components/a11y/coarse-target.test.ts`, `tests/components/ui/slider/Slider.marks.test.ts` (`--maxWorkers=2`) | 4/4 files, 86 passed, 1 expected fail, exit 0 | `critic-3/vitest-files.log` |
| `npm run typecheck` | exit 0 | `critic-3/typecheck.log` |

E4 (from critique-2) holds statically. `dist/component-styles.css` (built at 11:55) imports
only `track-well.css`, `glass/value-marks.css`, `glass/track-flow.css` and
`glass-ui.css`. `src/components/slider/styles.css` names `.track-well` and
`.glass-value-marks` only inside comments (lines 121 and 159), which the generator does not
read. The marks' lane inset now arrives through the register's own `--value-mark-inset`.
Caveat: the last `src/` commit is stamped 11:59, after that dist, so the typed-track-seam
file may have checked the 11:55 manifest. A fresh `npm run build` before vitest is owed.

## Static review. Suspicions, NOT reproduced, so not defects

Each of these is derived from the CSS and TS arithmetic on the branch. None has been
measured in paint. The next critic seat with an admitted browser should run each one.

1. **The reserve counts seats that do not scale.** `observeSeats` (`dockMorphMeasure.ts`)
   publishes the largest `[data-glass-dock-seat]` box. `<DockTrigger>` carries that
   attribute, but its hover scale is off (`DockTrigger.vue:26`, `controls/triggers.css`).
   The open seat (`m·P − gap`) carries it too. So `--dock-run-reserve-inline =
   round(up, w·0.05 + 4.4px, 1px)` grows with a labelled trigger or an open seat that
   paints no hover overhang.
   - Expected effect with no persistent region: the layers take `max(0, reserve − 8px)`
     each side. Any seat of 73 px or wider widens the dock, by 4 px each side for a
     144 px open seat. It does so when the seat opens, so the run would slide on open and
     close.
   - With a `#persistent` region, the run's seats sit `gap + reserve` from it (13 px at
     the house geometry). At v10.1.4 that distance was the 6 px gap.

   The second effect is the E3 cure, applied deliberately. The first is not stated
   anywhere.
   - Witness: a dock whose only wide seat is a 150 px `<DockTrigger>`, and a seat
     opened to 3 pitches. Read `.glass-dock` width and the run seats' x before and after,
     against v10.1.4.
2. **The seat observer is rebuilt on every pane mutation.** The pane `MutationObserver`
   watches `subtree` and `characterData`, and on every record it calls `observeSeats()`,
   which disconnects the observer, clears the map and re-observes every seat. A dock
   with a live label (a counter or a clock) rebuilds the observer on each tick. The cost
   is a re-observe, plus a `setProperty` of the same value on the root. Whether that
   sets off the `ResizeObserver loop completed` warning (critique-2 Open) is unmeasured.
3. **There is no rest radius before the first observation.**
   - `--dock-cap-rest` is `calc(var(--dock-plate-cross-px) / 2)`. Until the plate's
     ResizeObserver delivers, the custom property is guaranteed-invalid, so
     `.shape-pill .dock-plate { border-radius }` computes `0`: a square plate. The run
     reserve's padding, which reads `--dock-seat-max-*-px`, computes `0` the same way.
   - In an SPA mount this lands before the first paint, so it is fail-loud rather than
     masked, as repo law wants.
   - A server-rendered dock, or a host where `ResizeObserver` is undefined, would paint
     square until hydration. I know of no consumer that ships SSR. Unmeasured.
4. **`<Input>` and `<Textarea>` sit outside the field floor.** `--field-text-floor` is
   read by `.input-pill` and `.input-bar-field` only. `.field-control`
   (`_shared/field/control.css:122`) reads `--type-small` and paints 14 px on coarse 390
   (critique-2 `fields-coarse.json`), under the iOS 16 px no-zoom line. The token's own
   docblock says the no-zoom law "binds FIELDS". r6 names only the `.input-bar`/select
   recipe, and `implement.md` records the gap, so this stays out of scope for 10.1.5. It
   is one law with two readers, though, and the PROPORTION wave should take it.

## Owed (re-run when guarded admits)

- WebKit 2287 (`guarded --exclusive webkit`):
  `zsh docs/release-10.1.5/scripts/witness-fix-2.sh webkit g6`, run from the worktree
  root. This is the first WebKit witness of `3d811caba`'s E1 to E3 cures, and of g6 on
  the branch tip.
- Chromium and WebKit: the critique-2 probe battery
  (`tests-visual/release-10-1-5-critic-2.spec.ts`, `release-10-1-5-critic-2.config.ts`)
  re-run on the tip, plus the two witnesses from suspicion 1.
- `npm run build`, then the full vitest (`--maxWorkers=2`), `verify:package` and
  `demo:dist:build` on the tip. `fix-2/gates.txt` records `verify-package exit=1` before
  the `391b595be` ratchet rebind. Its log, rewritten after the rebind, reads terminal
  CLEAN, so the CLEAN result is the record, but it was not re-run here.
- The zone count: the owner decides on the reboot (`~/.claude/guard/ZONE-ARMED`).
