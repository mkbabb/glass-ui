# glass-ui 11.0.0 — critique 4

A fresh adversarial pass over `release/11.0.0`, run by claude-opus-5-5. It read every
record in this folder (`merge.md`, the orchestrator notes through round 4, critiques 1
to 3, fixes 2 to 4), the two merges (`2800d386b` is clean; `4af838a60` carries the five
conflicts) and every later commit. It measured the tree at `957643773`.

Every build, test and browser run went through `~/.claude/guard/guarded`, and every
WebKit run used `--exclusive webkit`. The guard refused nothing. Browser runs queued for
a slot (one Chromium run waited about 55 minutes) and the WebKit runs for the lock (the
glide re-run waited about two hours), and then ran. The chain script, logs and JSON reports are in `critique-4/`.

## Verdict

**No defect.** Every 10.1.3 and 10.1.4 cure, every U line feature and every atlas need
survives, in both engines and from the packed tarball. The one WebKit failure, a tabs
drag outside the merged code, passed 5 of 5 on its own re-run (below). The round-4 ruling is carried out
on the tree.

## The round-4 ruling: the shell-identity spec

The note `05f6918ba` rules that `tests-visual/shell-identity.spec.ts` is deleted, and
asks this pass to confirm the deletion and that nothing else references the file. At
`05f6918ba` the file was still on the tree, and one live file did reference it: fix 4's
witness `tests/docs/consumer-prose.test.ts` listed it among the three files it reads
("the live design docs describe 11.0.0's tunables"). Deleting the spec alone would have
turned that unit red with ENOENT.

This pass made the ruled deletion in `957643773`: the spec is removed and the witness's
file list drops it in the same commit. Nothing is re-homed, because each claim in the
spec (the home control's ink centring, its separator and its glass hover pill) is about
a control the demo no longer renders. After the commit:

- `git grep shell-identity` over `src`, `demo`, `tests`, `tests-visual`, `scripts`,
  `package.json` and every Playwright config finds nothing.
- The remaining mentions are records: `docs/tranches/AZ/**` (the wave that made the
  spec) and `docs/release-11.0.0/fix-4/shell-identity-webkit.config.ts` (fix 4's
  unrun WebKit config, kept as its record). No gate or script reads either.
- `vitest run tests/docs/consumer-prose.test.ts`: 6 passed; the full vitest run below is
  green.

## Both sides survived

### The 10.1.3 and 10.1.4 cures, file by file

Of the 13 `src` files that v10.1.2..v10.1.4 changed, nine are byte-identical at HEAD to
`v10.1.4`: `DataTable.vue`, `useDataTableResponsive.ts`, `deck/styles/capture.css`,
`useDockMorph.ts`, `dock/styles/dock.css`, `index.css`, `layers.css`, `shape.css` and
`useResizeObserver.ts`. So the `useResizeObserver` NaN seed, the DataTable projection
hold, `@page deck` and the measured `--dock-morph-origin` rules ship exactly as 10.1.4
shipped them. The U line's only `layers.css` change was the declared `[data-anchor]`
`transform-origin` block, which the merge removed per the anchor ruling.

The other four differ from `v10.1.4` only by the U line's additions:

- `GlassDock.vue`: the `expandOn`, `anchor` and `collapsedLabel` defaults, `expandOn`
  passed to `useDockState`, `data-anchor` on the root, the U line's pointer enter and
  leave handlers, and the summary's `aria-label` from `collapsedLabel`.
- `useDockState.ts`: `pressOnly()` added to the hover, leave and focus-in early returns,
  and the press-only branch of `onFocusOut`, which runs after the 10.1.3 line that drops
  a focus-deferred expand. Every 10.1.3 press-hold line stands.
- `dockMorphMeasure.ts`: the U line's rest capture and delivery arms beside 10.1.3's
  origin measure (the unit file unions both and passes).
- `shell.css`: one comment line about the deleted token.

### Release specs in both engines

| set | Chromium | WebKit 2287 |
| --- | --- | --- |
| `release-10-1-3` + `release-10-1-4` | 83 passed | 73 passed, 10 skipped (the `page.pdf` cells, Chromium only) |
| U line `u-b7.spec.ts` (Chromium desk + coarse; WebKit desk + phone) and the B7 shape set (8 specs) | 21 passed, 1 skipped (CDP touch, coarse only); 56 passed | 75 passed, 2 skipped, 1 failed (`SegmentedTabs.glide.spec.ts:179`, see below) |

### The one WebKit failure: the SegmentedTabs drag, a flake

In the U line's WebKit set, `SegmentedTabs.glide.spec.ts:179` ("the indicator can be
dragged to the next tab, and stays under the label it commits") failed once: 700 ms
after the release the indicator sat 2.76 px from the active tab, against a 1 px bound
(`critique-4/u-line-webkit.log`). The machine's load was about 30 at the time. Two
things say this is timing and not the merge:

- No merged code reaches the tabs. `git diff 373ed8aba HEAD -- src` touches only the
  data table, the deck capture sheet, the dock and `useResizeObserver.ts`, and
  `SegmentedTabs` does not use `useResizeObserver`.
- Run on its own in WebKit 2287 with `--repeat-each=5`, the spec file passes 40 of 40,
  and the drag test passes all five times (`critique-4/glide-webkit-rerun.log`). Critique
  3 also saw this set pass in WebKit.

The bound leaves no room for a slow settle under load. That is the spec's tolerance,
not a defect of this release.

### The dock in every posture

Critique 2's posture probe, unchanged, at 1440 fine and 390 coarse:

- Chromium: 18 passed, 4 skipped (keyboard cells on touch), 4 failed.
- WebKit 2287: the same, 18 passed, 4 skipped, 4 failed, and the four are the same cells.

Every cell passes for the horizontal and vertical page docks (rest, hover or tap expand,
a seat press, leave or tap outside, Tab then Enter on fine pointers), the same docks at
`collapse="open"` and `collapse={false}`, and atlas's figure lane (`expandOn="press"`:
hover leaves it closed, a press opens it with its end edge held, a seat press keeps it
open, Escape, a press outside and focus leaving each close it). The four failing cells
are the `row` scene's `anchor=start` and `anchor=end` at both widths, with the same
52 px drift (1440) that critique 3 recorded. They assert critique 2's old reading, a
named edge held on a dock the layout centres. Fix 3's texts and the CHANGELOG now say a
centred dock grows on both sides whatever `anchor` says, and `u-b7.spec.ts`'s free-space
cell asserts exactly that and passes. The failures are the probe's stale expectation,
not a defect.

### Atlas against the tarball

- `atlas-smoke/smoke.sh` on a fresh pack of `957643773`: RUNTIME GREEN, the type arm
  green, `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)`, ATLAS SMOKE GREEN.
  That covers `./dock-trigger` exporting `DockTrigger` (and its absence from `./dock`),
  `STILL_FIELD` from `./aurora`, `GlassDock`'s `anchor`, `expandOn` and
  `collapsedLabel`, and `Card`'s `backdropMode`.
- Atlas's own typecheck (`critique-4/atlas-vue-tsc.sh`). Atlas `1d933b8`
  (`~/Programming/.u-build/atlas-rc`, read only) is copied to a scratch overlay, every
  top-level entry but `node_modules` and `dist`; its dependencies link to atlas's own
  install except `@mkbabb/glass-ui`, which is the extracted 11.0.0 tarball.
  `vue-tsc --noEmit -p tsconfig.json` exits 0. The negative control (one file importing
  `DockTrigger` from `@mkbabb/glass-ui/dock`) exits 2 with TS2305, so the check reads the
  tarball. (A first attempt copied only `src` and a few configs and reported missing
  `tests/browser` helpers; that was the overlay, not glass, and the full copy is green.)

### Package surface

- `package.json` is `11.0.0`; the keyframes.js peer and dev range is `^6.0.0`, which the
  line's own check (`tests/public-surface.spec.ts`) asserts. It admits 6.3.0, the newest
  published 6.x (`npm view`), which `verify:package` installed.
- `dist/glass-ui.css` does not exist; `./styles.css` is `dist/component-styles.css` and
  imports only the three shared track registers; `dist/components/_shared/field/` holds
  no `control.css`. Each matches the CHANGELOG.
- `./dock-trigger` maps to `dist/dock-trigger.{js,d.ts}`.

### No stale reference

Across `src`, `demo`, `tests`, `tests-visual`, `scripts`, `docs` (outside the tranche,
release and audit records) and README.md, every hit for `--scale-hover-dock`,
`--tab-indicator-max-stretch`, `--eyeglass-span-max`, `data-eyeglass-*`,
`DockBackdropMode`, `MenuTrigger`, `squishOnTravel`, `SelectionDeform`, the two
indicator constants, `--scrollbar-width` and `trigger="context"` is struck history, a
comment saying the thing is gone, an absence assertion, or `ContextMenu.vue`'s own
`data-menu-trigger="context"` attribute. No file imports `DockTrigger` from
`@mkbabb/glass-ui/dock`; the demo imports it from `@glass/components/dock/trigger`, and
the only old import in prose is the CHANGELOG's own migration diff.

Seen in passing, not defects of this release (no consumer reads them, and none names a
deleted token or the old import): the demo collapsible story's sample text
"dist/glass-ui.css · 38.9 kB" (`demo/stories/containers/collapsible.vue:89`), and the
older comments in `src/styles/typography.css:35`, `scripts/profile-bundle.mjs` and the
`css-critical` and `sheet-inset` visual specs that describe the removed bundle.

### The CHANGELOG 11.0.0 entry

A grep for change and work-item ids, line codes, record paths and record vocabulary
(wave, tranche, seat, critic, build, gate, witness, spec, ratchet, atlas, fourier,
gregg, sci-report) finds one hit, a false one: the utility name `shadow-cartoon`, whose
"w-c" matched the case-blind `W-` pattern. Its claims check against
source and the built package: `--hover-ink-mix: 45%`, `[data-aurora-ground-active]`,
the optional `prepare(backend)` on the GPU substrate, `SelectContent`'s `sideOffset: 4`
and `data-form="sheet"`, the removed `activeValues` option on `useSelectionIndicator`
(the group's `activeValues` return stays, which the entry does not claim otherwise),
and the style split. The breaking changes come first, each with what to do.

## Gates on the committed tree (`957643773`)

| gate | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` | 270 files; 2510 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | CLEAN; ratchet 2897947, `equal: true`; roster 291/291; keyframes.js 6.3.0 under `^6.0.0` | 0 |
| atlas pack-and-import smoke (fresh pack) | ATLAS SMOKE GREEN | 0 |
| atlas `vue-tsc` against the tarball | 0 errors; negative control TS2305 | 0 / 2 |
| `release-10-1-3` + `release-10-1-4`, Chromium | 83 passed | 0 |
| `u-b7.spec.ts`, Chromium desk + coarse | 21 passed, 1 skipped | 0 |
| B7 shape set, Chromium | 56 passed | 0 |
| posture probe, Chromium 1440 fine + 390 coarse | 18 passed, 4 skipped, 4 failed (the `row` cells above) | 1 |
| `release-10-1-3` + `release-10-1-4`, WebKit 2287 | 73 passed, 10 skipped | 0 |
| U line set, WebKit 2287 | 75 passed, 2 skipped, 1 failed (the glide drag) | 1 |
| posture probe, WebKit 2287 1440 fine + 390 touch | 18 passed, 4 skipped, 4 failed (the same `row` cells) | 1 |
| `SegmentedTabs.glide.spec.ts` alone, WebKit 2287, `--repeat-each=5` | 40 passed (8 tests x 5), the drag test 5 of 5 | 0 |

The vitest count is one lower than fix 4's 2511 because the witness now reads two
files, not three. The ratchet is unchanged because the deleted spec is not packed.
