# glass-ui 11.0.0 — critique 1

A fresh adversarial pass over `release/11.0.0` at `8a9898d1a`, run by claude-opus-5-5. It
read `merge.md`, the orchestrator note, both merge commits (`--remerge-diff` on `2800d386b`,
which is clean, and on `4af838a60`, which has five conflicts), and the later commits
`6fc179766`, `3b587a44f`, `a858969c8` and `8a9898d1a`.

Every run went through `~/.claude/guard/guarded`, and every WebKit run used
`--exclusive webkit`. The guard refused nothing: one run waited for the WebKit lock, then
ran. Artefacts are in `critique-1/`.

## Verdict

**Three defects, one of them a broken prop contract.** Neither affects atlas, and every
cure from 10.1.3 and 10.1.4 survives the merge.

## Defects

### D1 · `anchor="start"` and `anchor="end"` pin nothing, so the merge's contract is false (major)

The merge kept the 10.1.3 measured origin, which is right, and gave `anchor` a new job:
pin the dock to that edge of a flex or grid container with an auto margin. That job
does not happen. The base rule `.glass-dock { margin: 0 auto }`
(`src/components/dock/styles/shell.css:16`, `:130`) leaves the *opposite* margin auto.
`.glass-dock[data-anchor="end"]:not(.vertical) { margin-inline-start: auto }`
(`layers.css:114-116`) adds a second auto margin, so the dock stays centred.

The probe is `critique-1/probe.spec.ts`, scene `row`. It lays a figure dock (press-only,
`backdrop-mode="static"`) in a 720 px row with free space and measures the dock box
against the row:

| engine · viewport | box | anchor | dock in row 24..744 | computed margins (start / end) |
| --- | --- | --- | --- | --- |
| Chromium · 1440 fine | flex | end, start | 356..412 (centred) | 332 px / 332 px |
| Chromium · 1440 fine | grid | end, start | 356..412 (centred) | 0 / 0 |
| Chromium · 390 coarse | flex, grid | end, start | 354..414 (centred) | 330 / 330 or 0 / 0 |
| WebKit 2287 · 1440 fine | flex, grid | end, start | 356..412 (centred) | 332 / 332 |
| WebKit 2287 · 390 touch | flex, grid | end, start | 354..414 (centred) | 330 / 330 |

All 16 cells fail (`probe-chromium.log`, `probe-webkit.log`). The false claim is stated in
four places that ship or are read by consumers:

- the CHANGELOG 11.0.0 "New" item ("the dock pins itself to that edge of a flex or grid
  container and grows toward the other side");
- the `anchor` docstring in `useDockShellProps.ts:102-108`;
- the dock README;
- the MIGRATION row.

The unit arm `GlassDock.figure-props.test.ts` only regex-matches the stylesheet text. It
never lays the dock out, so it cannot see this.

Atlas is not affected. Its `PlateDock` sits in a content-sized `display: flex;
justify-content: flex-end` wrapper, so no free space reaches the auto margins. The
`atlas` scene reproduces that lane: the collapsed handle sits at the lane's end, and the
end edge drifts less than 2 px across the press expand in both engines at both widths.

The fix has two parts:

- Make each pin rule own both inline (or block) margins, for example
  `margin-inline: auto 0` for `end` and `margin-inline: 0 auto` for `start`, logical so
  RTL still mirrors. The block axis gets the same treatment on a vertical dock.
- Replace the regex arm with a geometry arm, for example this probe's `row` scene in a
  release spec.

The orchestrator note `3d67b4572` says the pin stays only if it is the one mechanism and
atlas renders the same with it. As shipped, the pin is inert, and atlas's lane holds its
end edge through the measured origin and atlas's own flex-end layout alone. The owner
therefore chooses between two cures, and either one must also fix all four texts above:

- Make the pin real, as described above.
- Delete the pin rules, and describe `anchor` as the attribute hook it then is (or
  remove the prop if nothing reads it).

### D2 · The demo still documents the deleted `--scale-hover-dock` token (minor)

`demo/stories/foundations/css-utilities.vue:93` tells readers: "Sibling token
`--scale-hover-dock` (default 1.1) lives in the dock geometry block". 11.0.0 deletes that
token (CHANGELOG, MIGRATION, `dock-hover-corner.test.ts:45`), so the storybook describes
a token that no longer exists. The line came in through the U line (it is present at
`373ed8aba`), and the merge did not sweep it.

The fix is to delete that `<li>`.

Every other hit for the deleted token or the old `DockTrigger` import in `src`, `demo`,
`docs` (outside the archive and tranche records) and `tests` is a struck-history comment
or an assertion that the token or import is gone. The demo imports `DockTrigger` from
`@glass/components/dock/trigger`, which is the new module.

### D3 · MIGRATION.md's 11.0.0 section still carries internal ids and record prose (moderate)

Orchestrator note `3d67b4572` rules MIGRATION.md consumer-facing under the same prose rule
as the CHANGELOG. Its `## 11.0.0` section (203 lines) still names internal branches, rows
and records. For example:

- headings `(`u/b8r-glass`, U/B8r I-2 and I-3)`, `(`u/b8-perf-glass`, U/B8 PF)`,
  `(`u/b7-glass`, U/B7c C3)`, `(`u/b7-glass-shape`)`, `(`u/b7-glass-perf`)` and
  `(`u/b7-glass`, U/B7b X3)`;
- row tags `(I-2)`, `(I-3)`, `(B7-G1)` to `(B7-G6)`, and "atlas register MO-09";
- line 77, "Proposed by the atlas formation on local branch `u/b7-glass-shape` off
  `release/10.1.1`; glass takes, re-authors or declines each row", with the tag hash
  `bbf176f02`;
- line 195, "the B7b census".

You can reproduce the list with
`awk '/^## 11.0.0/{p=1;next} /^## /{if(p)exit} p' MIGRATION.md | grep -nE "U/B|B7|O-[0-9]|u/b|MO-|I-[0-9]"`.

The fix is to rewrite the section in plain consumer sentences, keeping each migration
step.

## What held

These were re-run on the committed tree:

- **10.1.3 and 10.1.4 release specs, Chromium headless:** 83 of 83 passed, exit 0
  (`release-chromium.log`, `.json`).
- **10.1.3 and 10.1.4 release specs, Playwright WebKit 2287:** 73 passed and 10 skipped
  (`page.pdf` and CDP touch have no WebKit path), 0 failed, exit 0 (`release-webkit.log`,
  `.json`).
- **Atlas pack-and-import smoke:** green, exit 0 (`atlas-smoke.log`), from a fresh pack.
  - The tarball is 11.0.0, and keyframes.js 6.3.0 installs under `^6.0.0`.
  - All 28 value specifiers resolve at runtime, including `./dock-trigger`
    `DockTrigger` and `./aurora` `STILL_FIELD`. `DockTrigger` is gone from `./dock`.
  - GlassDock exposes `anchor`, `expandOn`, `collapsedLabel` and `backdropMode`, and Card
    exposes `backdropMode`. All of them type-check.
  - `--radius-circle: 50%` and `--radius-bar: var(--radius-panel)` (12 px) ship.
  - The smoke's import list matches a fresh census of atlas `1d933b8` in
    `~/Programming/.u-build/atlas-rc`. The only extra specifier there is
    `@mkbabb/glass-ui/badge`, which appears only inside `vi.mock`.
  - The deep CSS paths that atlas reads (`dist/styles/theme/radius.css`,
    `dist/label.css`, `dist/toggle-group.css`) are in the tarball.
- **Dock postures at 1440 fine and 390 coarse/touch, both engines:** the page dock
  (`scene=page`) stays inside the viewport with no horizontal page scroll when collapsed,
  expanded (hover, or tap on touch) and collapsed again. All five seats are hit-testable
  by `elementFromPoint` at their centres. The press-only figure dock opens and holds its
  end edge.
- **`useDockState.ts` resolution:** reads correct. `stays` is computed once, a focus
  exit drops the focus-deferred expand (10.1.3), and the press-only branch closes on a
  real exit with a `relatedTarget`. `onFocusIn` returns early for press-only, then the
  press hold applies.
- **`layers.css` resolution:** dropping the declared per-edge origins in favour of the
  measured `--dock-morph-origin` is correct, and the 10.1.3 edge-anchor witnesses stay
  green in both engines. D1 concerns only the pin that replaced them.
- **CHANGELOG:**
  - The 11.0.0 entry has no internal ids, record paths or build vocabulary, puts the
    breaking changes first and gives each one a migration step.
  - Spot-checked against `dist`: `BackdropMode` is in `./axes` and `DockBackdropMode` is
    gone; `ContextMenu` is exported from `./menu`; `dist/glass-ui.css` is gone;
    `aurora.js` is 27,088 B; the motion-core removals are absent from the declarations.
  - The 10.1.4 entry and everything below it are byte-identical to `v10.1.4`.
  - The one inaccurate sentence in the entry is the `anchor` claim (D1).

## Not re-run by this critic

These rest on the merge record, not on this pass: typecheck, build, the full vitest
suite, `verify:package`, `demo:dist:build`, the ratchet's `equal: true`, and the U line's
own Chromium and WebKit specs (`u-b7.spec.ts` and the B7 shape set).
