# glass-ui 11.0.0 — the merge record

Branch `release/11.0.0`, from master `0d987344c`. Two `--no-ff` merges, history kept:

1. `2800d386b` — `u/b7-glass` at `373ed8aba` (the U glass line). Clean.
2. `4af838a60` — `release/10.1.4` (tag `v10.1.4`, carrying `v10.1.3` and `v10.1.2`). Five
   conflicts, resolved below; version, keyframes range and CHANGELOG in the same commit.
3. `6fc179766` — `.bundle-ratchet` rebound from the committed-tree build of `4af838a60`.

10.1.5 is not merged.

## Conflicts

| file | resolution |
| --- | --- |
| `src/components/dock/styles/layers.css` | **Contradiction; the 10.1.3 cure wins.** The U line's `anchor` prop declared `transform-origin` per edge on `[data-anchor]` (root, `.dock-persistent`, `.dock-layers`). 10.1.3 (O-110, witnessed in fourier) measures the morph's origin as the fixed point of the painted box and the reserved one and writes `--dock-morph-origin` on the root, each persistent region and the layers, plus `--dock-pane-shift` on the panes. The declared rules are more specific and would override the measured per-child origins (each child's origin is in its own box, not the root's edge), and a declared edge that disagrees with layout paints a first frame away from the collapsed box. The measured origin is later and consumer-witnessed, and for atlas's PlateDock (`.plate-dock { display: flex; justify-content: flex-end }`) it computes the same end edge. The declared origin rules are deleted. The `anchor` prop keeps its contract (the named edge stays fixed, the box grows toward the other) by pinning the dock to that edge of a flex or grid container with an auto margin (`margin-inline-start: auto` for `end`, logical, block axis on a vertical dock); the measured origin then holds that edge. |
| `src/components/dock/composables/useDockState.ts` | Both kept. `onFocusOut` computes `stays` (inside the dock or a teleported portal) once; a focus that leaves drops a focus-deferred expand (10.1.3 press hold); then the press-only branch (U line `expandOn="press"`) closes a press-opened dock on a real focus exit; the hover branch is unchanged. `onFocusIn` keeps both guards (`pressOnly()` returns first, then the press hold). |
| `tests/components/custom/dock/dockMorphMeasure.test.ts` | Union. The U line's rest-capture, vertical first-expand, attach-on-delivery and mutation-on-delivery arms and 10.1.3's origin and collapse arms all stand and pass. |
| `CHANGELOG.md` | One `## 11.0.0 — 2026-11-05` entry replaces the U line's "10.2.0 (proposed)" notes: breaking changes first with migration steps (old import to new import, deleted token to what to use), then New, Fixes, Lighter and faster. Outward prose, no internal ids or record paths. The 10.1.4 and 10.1.3 entries follow unchanged. |
| `.bundle-ratchet` | Provisional `2958685` (U line) in the merge; rebound to `2963866` (+5,181 B, the 10.1.3 and 10.1.4 cures) from the committed-tree build in `6fc179766`; `verify:package` then reports `equal: true`. |

Follow-on edits in the merge commit, so the tree states one contract: the figure-props
unit arm asserts the pin and the measured origin (and that no `[data-anchor]` rule sets
`transform-origin`); the dock README, the `anchor` docstring and the MIGRATION row say the
same. MIGRATION's "10.2.0 (proposed by atlas U/B7)" heading is now `## 11.0.0`.

## Version and keyframes.js

`package.json` and the lock root are `11.0.0`. The keyframes.js peer and dev range stay
`^6.0.0`: the line's own check, `tests/public-surface.spec.ts:628`, asserts that exact
range. It admits 6.3.0, the newest published 6.x, which `verify:package`'s install arm
installed and imported (`install.keyframes.version: "6.3.0"`).

## Gates

All runs through `~/.claude/guard/guarded`; WebKit under `--exclusive webkit`. Logs and
JSON reports in `logs/`. No run was refused.

| gate | result | exit |
| --- | --- | --- |
| `npm run typecheck` (after build; the self-referencing fourier-math test needs `dist/`) | clean | 0 |
| `npm run build` (committed tree) | built | 0 |
| `vitest run --maxWorkers=2` | 2500 passed, 10 expected fail, 1 skipped; 3 failed, all in `tests/gates/boot-graph.test.ts` build arm, for want of `dist-demo` (run before `demo:dist:build`) | 1 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run tests/gates/boot-graph.test.ts` after the demo build | 14 passed | 0 |
| `npm run verify:package` (committed tree, ratchet `2963866`, `equal: true`) | pack, closure, install arm green | 0 |
| atlas pack-and-import smoke (`atlas-smoke/smoke.sh`) | green: every value atlas `1d933b8` imports, 28 specifiers incl. `./dock-trigger` `DockTrigger` and `./aurora` `STILL_FIELD`, resolves at runtime from the packed tarball; `DockTrigger` absent from `./dock`; GlassDock props `anchor`, `expandOn`, `collapsedLabel`, `backdropMode` and Card `backdropMode` present and type-check; atlas's type imports type-check; `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)` ship in `dist/styles` | 0 |
| 10.1.3 + 10.1.4 release specs, Chromium headless (`tests-visual/playwright.config.ts`, `chromium-headless-new`) | 83 passed (the 10.1.4 record: 83/83) | 0 |
| U line, Chromium: `u-b7.spec.ts` (`chromium-desk`, `chromium-coarse`) | 11 passed, 1 skipped (CDP touch: coarse only, by design) | 0 |
| U line, Chromium: the B7 shape set (`b7-shape.config.ts`, 8 specs) | 56 passed | 0 |
| 10.1.3 + 10.1.4 release specs, Playwright WebKit 2287 (`webkit-2287.config.ts`, `--exclusive webkit`) | 73 passed, 10 skipped (`page.pdf` and CDP touch have no WebKit path, by design), 0 failed (the 10.1.4 record: 73 + 10) | 0 |
| U line, WebKit 2287 (`u-line-webkit.config.ts`): `u-b7.spec.ts` desk + phone and the B7 shape set | 66 passed, 2 skipped (CDP touch: Chromium coarse only), 0 failed. The line itself ran these in Chromium and Firefox only; this is their first WebKit run | 0 |

The vitest exit 1 is an ordering artefact, not a defect: the boot-graph build arm reads
`dist-demo`, which did not yet exist; the same file is 14/14 once the demo is built.
