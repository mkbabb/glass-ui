# glass-ui 11.0.0 — critique 2

A fresh adversarial pass over `release/11.0.0` at `3868d89b2`, run by claude-opus-5-5. It
read every record in this folder (`merge.md`, the three orchestrator notes, `critique-1.md`,
`fix-2.md`), the remerge diff of both merges (`2800d386b` is clean; `4af838a60` carries the
five conflicts) and every later commit through `3868d89b2`.

Every build, test and browser run went through `~/.claude/guard/guarded`, and every WebKit
run used `--exclusive webkit`. The guard refused nothing. Several runs queued for a browser
slot or for the WebKit lock, which other sessions held, and then ran. Logs, JSON reports,
the posture harness and its spec are in `critique-2/`.

## Verdict

**Two defects, both in text that consumers read; no behavioural defect.** Every 10.1.3
and 10.1.4 cure survives the merge, both textually and in both engines. Every U line
feature and every atlas need works from the packed tarball. The dock behaves in every
posture probed, at 390 and 1440, fine and coarse, in Chromium and WebKit.

## Defects

### D1 · The outward texts say `anchor` keeps its edge put, and it does not (moderate)

The CHANGELOG 11.0.0 "New" item says "`anchor="start"` or `anchor="end"` names the edge
that stays put while the dock opens and closes." MIGRATION's row says the same, and so do
the prop docstring (`useDockShellProps.ts:103`, "The edge that stays put while the dock
opens and closes") and the dock README (line 49). After fix 2 the prop does nothing but
write `data-anchor`, so the edge it names stays put only when the consumer's layout
already holds it there. Where the layout does not, the named edge moves exactly as a
`center` dock's does.

The probe is the `row` scene of `critique-2/posture.spec.ts`. It lays a press-only figure
dock straight in a flex row with free space, where the dock's own `margin: 0 auto` centres
it, sets `anchor`, presses the summary and traces the named edge every frame:

| engine · viewport | anchor | rest box | open box | named-edge drift |
| --- | --- | --- | --- | --- |
| Chromium · 1440 fine | end, start | 356..412 | 304..464 | 52 px |
| Chromium · 390 coarse | end, start | 141..201 | 85..257 | 56 px |
| WebKit 2287 · 1440 fine | end, start | 356..412 | 304..464 | 52 px |
| WebKit 2287 · 390 touch | end, start | 141..201 | 85..257 | 56 px |

`start` and `end` give identical geometry, half the growth on each side
(`posture-chromium.log`, `posture-webkit.log` and the JSON beside them). The second
sentence of each text ("It does not move the dock: the dock already grows from whichever
edge your layout places it at") is true, so together the two sentences contradict each
other, and a reader who sets `anchor="end"` on a centred dock gets a centred morph.

This contradicts no ruling. The orchestrator note keeps the prop and asks that its texts
say it changes nothing layout does not already determine. They do say that, but they lead
with a promise the prop does not keep. The fix is to lead with what the prop is, in all
four places. For example: "`anchor` records which edge your layout holds the dock at, and
writes it to the root as `data-anchor` for your own CSS. It does not move the dock or
change its morph, which always grows from the edge your layout places it at." The owner
may also weigh removing an inert prop, since KISS asks it, but atlas binds it, so that is a
breaking change for atlas and outside this pass.

### D2 · The shipped README still says the build emits `glass-ui.css` (minor)

`README.md:95` reads "`npm run build` # library → dist/glass-ui.js + glass-ui.css +
index.d.ts + per-subpath chunks". 11.0.0 removes `dist/glass-ui.css` (CHANGELOG, MIGRATION;
the file is absent from `dist/` after the build), and npm packs the README into every
install. The line came in with the U line (it reads the same at `373ed8aba`). The fix is to
drop `+ glass-ui.css` from that line.

Seen in passing, not a defect of this release: MIGRATION's preamble still says "(L
invariant 4)", an internal id, as it did at `v10.1.4`; and the storybook's Collapsible
story shows `dist/glass-ui.css · 38.9 kB` as sample file-list text.

## Both sides survived

### The 10.1.3 and 10.1.4 cures

- **Textually.** For every file `v10.1.2..v10.1.4` touches under `src`, `tests` and
  `tests-visual` (25 files), every added line is present in `HEAD`. In the other
  direction, every line the U line added is present, except the four `[data-anchor]`
  `transform-origin` rule groups the merge deleted (the ruled contradiction), the old
  regex unit arm fix 2 replaced, the docstring and README sentences the ruling rewrote,
  and two guard lines in `onFocusOut` folded into `stays`. `eyeglass.ts`, which the U line
  deleted, stays deleted.
- **`useDockState.ts`.** The merged `onFocusOut` is equivalent to both parents. `stays`
  is the U line's two guards in one expression, a leaving focus drops a focus-deferred
  expand (10.1.3), and the press-only branch still returns on `stays` or a null
  `relatedTarget` before it collapses.
- **In the engines** (committed tree, fresh dev server per run):

  | spec | engine | result | exit |
  | --- | --- | --- | --- |
  | `release-10-1-3` + `release-10-1-4` | Chromium (`chromium-headless-new`) | 83 passed | 0 |
  | `release-10-1-3` + `release-10-1-4` | WebKit 2287 | 73 passed, 10 skipped (`page.pdf` and CDP touch have no WebKit path) | 0 |

### The U line's own specs

| spec | engine | result | exit |
| --- | --- | --- | --- |
| `u-b7.spec.ts` (`chromium-desk`, `chromium-coarse`) | Chromium | 21 passed, 1 skipped (CDP touch, coarse only) | 0 |
| the B7 shape set (8 specs, `b7-shape.config.ts`) | Chromium | 56 passed | 0 |
| `u-b7.spec.ts` desk + phone and the B7 shape set (`u-line-webkit.config.ts`) | WebKit 2287 | 76 passed, 2 skipped (CDP touch, Chromium coarse only) | 0 |

### The dock in every posture

`critique-2/posture.spec.ts` drives the real components under the demo cascade at 1440
fine and 390 coarse (CDP touch in Chromium, `hasTouch` in WebKit). It checks on-screen
geometry, no horizontal page scroll, `elementFromPoint` on every seat and a real press
reaching a seat's handler. These cells pass in both engines (18 passed, 4 keyboard cells
skipped on touch, in each engine):

- a horizontal and a vertical page dock that collapse: rest, hover or tap expand, a seat
  press, leave (after the 3.6 s collapse delay) or a tap outside, and on fine pointers Tab
  to the summary then Enter;
- the same docks at `collapse="open"` and `collapse={false}`;
- atlas's figure lane: hover leaves it closed; a press opens it with the end edge within
  2 px on every frame; a seat press keeps it open; Escape, a press outside and (fine)
  focus leaving each close it; it returns to its rest box.

Two probe expectations of this pass were wrong and were corrected, not reported: the
first leave check waited 2.5 s against the 3.6 s collapse delay, and the first keyboard
check expected a focus on the summary to expand the dock. The summary is a disclosure
with `@focusin.stop` (since BK), so Enter opens it, by design.

### Atlas needs, from the packed tarball

`atlas-smoke/smoke.sh` re-run from a fresh build and pack: exit 0, "ATLAS SMOKE GREEN"
(`critique-2/atlas-smoke.log`). Every value atlas imports resolves at runtime, including
`DockTrigger` from `./dock-trigger` and `STILL_FIELD` from `./aurora`; the GlassDock props
`anchor`, `expandOn`, `collapsedLabel` and Card `backdropMode` type-check; and
`--radius-circle: 50%` and `--radius-bar: var(--radius-panel)` ship. This pass re-took
the census of atlas `1d933b8` (in `~/Programming/.u-build/atlas-rc`; the commit is not in
`~/Programming/sci-report`). The 28 specifiers in `imports.json` are every code import.
The others are `/styles` (CSS), `/badge` (only inside `vi.mock`), and `/drawer`,
`/completion-seal` and `/motion-core`, which appear only in atlas's MIGRATION and a
comment. Atlas's deep CSS paths (`dist/styles/theme/radius.css`, `dist/label.css`,
`dist/toggle-group.css`) are in `dist`.

### Stale references

- `--scale-hover-dock`: absent from `dist`. In `src`, `demo`, `tests` and `tests-visual`,
  every hit is a struck-history comment or an assertion that it is gone; critique 1's demo
  line is deleted.
- The old `DockTrigger` import: none in `src`, `demo`, `docs` (outside the archive and
  tranche records), `tests` or `tests-visual`. The only hit is the smoke's negative check
  in `atlas-smoke/types.ts`. `dist/dock.js` has no `DockTrigger`; `dist/dock-trigger.d.ts`
  re-exports it.
- The other removals the CHANGELOG lists (`DockBackdropMode`, the public `MenuTrigger`,
  the motion-core options and constants, `--tab-indicator-max-stretch`,
  `--eyeglass-span-max`, the eyeglass attributes) are absent from `dist`'s declarations
  and sheets, except as prose in one JSDoc. `MenuTrigger` survives only as an internal,
  unexported type in `menu/context.ts`.

### The CHANGELOG 11.0.0 entry

No internal ids, record paths or build vocabulary. A grep for `O-NNN`, `W-`, `U/`, `B7`,
`B8`, wave, tranche, seat, critic, record, witness, atlas, fourier, gregg and census finds
nothing, and MIGRATION's 11.0.0 section is equally clean. Spot-checked claims hold:
`aurora.js` is 27,088 B; `dist/glass-ui.css` is gone; no declaration imports a stylesheet;
`--radius-pill: 1rem` and `--hover-ink-mix: 45%` ship; `DockExpandOn` and `DockAnchor` are
exported from `./dock`, `BackdropMode` from `./axes` and `ContextMenu` from `./menu`;
`auroraGroundKey` is exported from `./aurora`. The one inaccurate sentence is D1. The
keyframes.js range stays `^6.0.0`, which `tests/public-surface.spec.ts:628` asserts and
which admits 6.3.0, the newest published 6.x.

### Gates re-run on the committed tree

| gate | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run verify:package` | CLEAN; keyframes.js 6.3.0 installed under `^6.0.0`; ratchet 2963387, `equal: true` | 0 |
| `vitest run --maxWorkers=2` | 269 files; 2503 passed, 10 expected fail, 1 skipped | 0 |

Not re-run by this pass, which rests on fix 2's record for it: `demo:dist:build` (the
boot-graph arm that reads `dist-demo` passed inside the vitest run above).

The posture logs hold the corrected probe's run. In `chain-webkit.log`, `posture-chromium
exit 1` is the first Chromium run, taken before the two probe corrections; this pass then
re-ran Chromium on its own. In both engines the only failing cells are D1's four `row`
cells, which is why each posture run exits 1.
