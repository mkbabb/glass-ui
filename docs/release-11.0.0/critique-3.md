# glass-ui 11.0.0 — critique 3

A fresh adversarial pass over `release/11.0.0` at `b7b27fce6` (the code tree of fix 3,
`684436960`, plus the round-3 orchestrator note), run by claude-opus-5-5. It read every
record in this folder (`merge.md`, the four orchestrator notes, critiques 1 and 2, fixes 2
and 3), the remerge diff of both merges (`2800d386b` is clean; `4af838a60` carries the five
conflicts) and every later commit.

Every build, test and browser run went through `~/.claude/guard/guarded`, and every WebKit
run used `--exclusive webkit`. The guard refused nothing; browser runs queued for a slot
and the WebKit lock, which other sessions held, and then ran. The chain script, logs, JSON
reports and the extra evidence files are in `critique-3/`.

## Verdict

**Two defects, both in text; no behavioural defect.** Every 10.1.3 and 10.1.4 cure, every
U line feature and every atlas need survives, in both engines and from the packed tarball.
This pass adds two checks earlier passes did not make: a declared-export diff of every
subpath against the published 10.1.4 tarball, and atlas's own `vue-tsc` against the
11.0.0 tarball.

## Defects

### D1 · Internal ids ship in MIGRATION.md and README.md (moderate)

The round-3 orchestrator note (`b7b27fce6`) rules that MIGRATION.md, the CHANGELOG 11.0.0
entry and README.md carry no internal id, and that a critic reports each one. Both files
are in the tarball (`files: ["dist", "MIGRATION.md"]`; npm packs README.md), and the
packed copies hold the ids below.

- **README.md:171**, inside the token paragraph:
  `[2026-09-22 · O-23/O-32 B-1 — this sentence said any re-declaration in your own CSS wins; a layered `:root` does not.]`
  It is the only internal id in the README. The fix keeps the corrected sentence and
  drops the bracket.
- **MIGRATION.md:5**, the preamble: "no back-compat shims (L invariant 4)". "L invariant
  4" appears five times in the file.
- **MIGRATION.md outside 11.0.0.** 260 lines match an internal-id pattern (O-NNN, W-…,
  U/B…, B7, B8, BK, BL, BJ, BI, BH, BG, AI.W, "L invariant", "cure wave", tranche, G-GATE
  names, Φn, RIDER, KS-n, `docs/tranches` paths), and 105 lines carry a dated record
  bracket `[2026-… · …]`. By section: preamble 1, 10.1.2 1 (line 223, "O-101: a morph
  reserves the size it settles at"), 10.0.0 4, 9.0.0 13, 8.1.0 2, 8.0.0 28, 7.0.0 4,
  6.0.0 3, 5.0.0 100, 4.1.0 14, 4.0.0 13, 3.13.0 3, 3.10.0 4, the 2.x/1.x and appendix
  sections the rest. Several headings carry them too (`## 2.0.0 (AI.W1 R3)`,
  `## 10.0.0 — ~~UNRELEASED~~ [2026-09-22 · LIVE: … run 35804200390 …]`). Every line is
  in `critique-3/migration-internal-ids.txt`.

The 11.0.0 section of MIGRATION.md and the CHANGELOG 11.0.0 entry are clean: a grep for
the same pattern plus wave, seat, critic, census, atlas, fourier and gregg finds nothing
in either.

Most of the 260 lines are older sections that shipped with their releases. The note's
words are "anywhere in MIGRATION.md", so they are in scope; whether the fix rewrites the
older sections or the owner narrows the rule to the preamble and the 11.0.0 section is the
orchestrator's call. The preamble and README.md:171 are in scope on any reading.

### D2 · Live docs and one spec still describe deleted tokens as current (minor)

11.0.0 deletes `--tab-indicator-max-stretch` and `--scale-hover-dock` and the squish on
travel. These texts outside the archives and records still state them as live:

- `docs/design/tunable-anim.md:122`, in the tunable table: "tab squish cap |
  `--tab-indicator-max-stretch` | 1.08 | ≤1.20 … | override". The U line edited this file
  (`16aba2113`) and left the row.
- `docs/design/affordance-map.md:48`: DRAG-MORPH "`useLiquidFlex` capped ≤
  `--tab-indicator-max-stretch`", and line 83: the SegmentedTabs pill row lists
  "squish-on-travel `--stretch`", which 11.0.0 removes.
- `tests-visual/shell-identity.spec.ts:119-121`, a comment: "The hover register scales
  the control 1.1× (--scale-hover-dock) from its center". No dock control scales on hover
  now, and the token is gone. The assertion beside it measures rest geometry and is
  unaffected; only the stated reason is stale.

Critique 2 checked `src`, `demo`, `tests` and `tests-visual` for `--scale-hover-dock` and
counted every hit as struck history or an absence assertion; the shell-identity comment
is neither. It did not check `docs/design`. Every other hit in those trees for the deleted
tokens, the old `DockTrigger` import, `DockBackdropMode`, `MenuTrigger`, the motion-core
removals and `trigger="context"` is struck history, an absence assertion, the new
internal `@glass/components/dock/trigger` path, or `ContextMenu.vue`'s own
`data-menu-trigger="context"` attribute.

## Both sides survived

### The merge resolutions

- `useDockState.ts` `onFocusOut` (remerge diff): `stays` is the U line's two guards
  (inside the root, or a teleported portal) in one expression; the 10.1.3 drop of a
  focus-deferred expand runs first; the press-only branch still returns on
  `!expanded || keepOpenCount > 0`, then on `stays || !relatedTarget`, before it
  collapses. Equivalent to both parents.
- `layers.css`: the U line's declared `[data-anchor]` `transform-origin` rules are gone,
  as is the auto-margin pin fix 2 removed; the 10.1.3 measured `--dock-morph-origin` rules
  stand. `anchor` now only writes `data-anchor` (`GlassDock.vue:385`), and its four texts
  say so.
- No 10.1.3 or 10.1.4 line uses an API the U line removed: the added lines of
  `git diff v10.1.2 v10.1.4 -- src tests tests-visual demo` contain none of
  `--scale-hover-dock`, `DockTrigger`, `trigger="context"`, `body.style.overflow`,
  `--scrollbar-width`, `squishOnTravel`, `deform`, `DockBackdropMode`, eyeglass,
  `glass-ui.css`, `MenuTrigger` or `INDICATOR_`.
- The 10.1.4 `@page deck` cure ships intact in the tarball
  (`dist/components/deck/styles/capture.css`, reached through the deck chunk's
  `import "./components/deck/styles/index.css"`), so after the style split it now loads
  only with the deck, which is stricter than 10.1.4 and not weaker.
- The CHANGELOG below the 11.0.0 entry is byte-identical to `v10.1.4`'s from
  `## 10.1.4` down, and the U line's own 10.1.2-and-below tail matched it too.

### The public surface against published 10.1.4

`critique-3/exports.cjs` lists, through the TypeScript checker, every name each `exports`
subpath declares, for `npm pack @mkbabb/glass-ui@10.1.4` and for the 11.0.0 tarball
(`exports-10.1.4.json`, `exports-11.0.0.json`). No subpath is removed; `./dock-trigger`
is added. The removed names are exactly the ones the CHANGELOG lists: `MenuTrigger` (root
and `./menu`), `DockBackdropMode` and `DockTrigger` (`./dock`), and
`DEFAULT_INDICATOR_MAX_STRETCH`, `INDICATOR_RELEASE_AT_ARRIVAL`, `SelectionDeform`
(`./motion-core`). The added names: `ContextMenu`, `ContextMenuProps`,
`ContextMenuEmits` (root and `./menu`), `BackdropMode` and `BACKDROP_MODES` (`./axes`),
`DockTrigger` (`./dock-trigger`), `STILL_FIELD` and `auroraGroundKey` (`./aurora`),
`DockAnchor` and `DockExpandOn` (`./dock`). `BACKDROP_MODES` is the one addition the
CHANGELOG does not name; that is not a defect. `aurora.js` is 203,503 B at 10.1.4 and
27,088 B now, as the CHANGELOG says.

### Atlas against the tarball

- `atlas-smoke/smoke.sh` on a fresh pack: ATLAS SMOKE GREEN (`critique-3/atlas-smoke.log`).
- Atlas's own typecheck. Atlas `1d933b8` (`~/Programming/.u-build/atlas-rc`, read only)
  was copied to a scratch overlay whose `node_modules/@mkbabb/glass-ui` is the packed
  11.0.0 tarball, the other dependencies linked to atlas's own install. `vue-tsc --noEmit`
  exits 0 with no error. A negative control (one file importing `DockTrigger` from
  `@mkbabb/glass-ui/dock`) exits 2 with TS2305, so the check reads the tarball
  (`critique-3/atlas-vue-tsc.log`).
- My census of atlas's `@mkbabb/glass-ui` specifiers matches `imports.json`; the
  `dist/...css` paths atlas names are file reads in two of its specs, not package imports,
  and the files exist. Atlas's shape-token spec reads `--radius-circle` and `--radius-bar`
  from `dist/styles/theme/radius.css`, and both are there.

### Gates on the committed tree

| gate | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (after the demo build) | 269 files; 2504 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | CLEAN; ratchet 2963459, `equal: true`; roster 291/291; keyframes.js 6.3.0 under `^6.0.0` | 0 |
| atlas pack-and-import smoke (fresh pack) | ATLAS SMOKE GREEN; `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)` | 0 |
| `release-10-1-3` + `release-10-1-4`, Chromium (`chromium-headless-new`) | 83 passed | 0 |
| `u-b7.spec.ts`, Chromium (`chromium-desk`, `chromium-coarse`) | 21 passed, 1 skipped (CDP touch, coarse only) | 0 |
| the B7 shape set (8 specs), Chromium | 56 passed | 0 |
| `release-10-1-3` + `release-10-1-4`, WebKit 2287 | 73 passed, 10 skipped (`page.pdf` and CDP touch have no WebKit path) | 0 |
| `u-b7.spec.ts` desk + phone and the B7 shape set, WebKit 2287 (`u-line-webkit.config.ts`) | 76 passed, 2 skipped (CDP touch, Chromium coarse only) | 0 |
| posture probe (`critique-2/posture.spec.ts`), Chromium 1440 fine + 390 coarse | 18 passed, 4 skipped (keyboard cells on touch), 4 failed (the `row` cells, below) | 1 |
| posture probe, WebKit 2287 1440 fine + 390 touch | 18 passed, 4 skipped, 4 failed (the `row` cells, below) | 1 |

The chain is `critique-3/chain.sh`; each step's log and JSON report sit beside it.

### The dock in every posture

Critique 2's probe, re-run unchanged on this tree in both engines at 1440 fine and 390
coarse, passes every cell for the horizontal and vertical page docks (rest, hover or tap
expand, a seat press, leave or tap outside, Tab then Enter on fine pointers), the same
docks at `collapse="open"` and `collapse={false}`, and atlas's figure lane (hover leaves it
closed, a press opens it with its end edge within 2 px on every frame, a seat press keeps
it open, Escape, a press outside and focus leaving each close it, and it returns to its
rest box).

The four failing cells are the `row` scene, which asserts critique 2's reading of the old
texts: a named edge held on a dock its layout centres. They fail with the same numbers as
in critique 2 (52 px at 1440, 56 px at 390, both engines, `start` and `end` alike), which
is now the documented contract: fix 3's texts say a centred dock grows on both sides
whatever `anchor` says, and `u-b7.spec.ts`'s free-space cell asserts exactly that and
passes in both engines. These failures are the probe's stale expectation, not a defect.

### The CHANGELOG 11.0.0 entry

No internal ids, record paths or build vocabulary (D1's grep). The breaking changes come
first, each with what to do; the diffs for `DockTrigger`, `ContextMenu` and
`BackdropMode` are exact against the tarball. The keyframes.js range stays `^6.0.0`, which
`tests/public-surface.spec.ts` asserts and which admits 6.3.0, the newest published 6.x
(`npm view`), installed by `verify:package`.

Seen in passing, not a defect of this release: the 10.1.4 entry, kept as written, ends
"The arm is not in this patch; it is W-E.13 (11.0.0)." The 11.0.0 entry does not mention
that print arm, so a consumer reading 10.1.4 may expect it here.
