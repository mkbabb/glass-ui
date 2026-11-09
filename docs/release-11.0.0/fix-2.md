# glass-ui 11.0.0 — fix 2 (before critic 2)

The fix seat on `release/11.0.0`, run by claude-opus-5-5. It read `critique-1.md`,
`merge.md`, the orchestrator notes, and `orchestrator-note-anchor.md` (`da763150d`), which
landed while this seat was working. It cured the three critique-1 defects at their root.
Every build, test and browser run went through `~/.claude/guard/guarded`, and every WebKit
run used `--exclusive webkit`. The guard refused nothing; two WebKit runs waited for the
lock and then ran. Logs and JSON reports are in `fix-2/`.

## Commits

| commit | what |
| --- | --- |
| `a029b20ac` | D1 first cure (the pin made real: each rule owned both margins of its axis), D2, D3 |
| `b6c2870c0` | D1 per the orchestrator ruling: the pin removed, `anchor` names the morph edge only; the witness rewritten to the ruling |
| `7d4bf6096` | `.bundle-ratchet` rebind 2963866 → 2963387 (−479 B), from the committed-tree build of `b6c2870c0` |

`a029b20ac` stays in history. The ruling arrived as `da763150d` just before that commit,
and this seat read it only after committing. `b6c2870c0` supersedes its D1 part, and the
D2 and D3 parts stand.

## D1 · `anchor` pinned nothing (major)

**The cause.** The base `.glass-dock { margin: 0 auto }` keeps the opposite margin auto,
so the added `margin-inline-start: auto` left the dock centred.

**The ruling.** `orchestrator-note-anchor.md` says the dock must not move inside its
container, so the invented pin comes out rather than being made to work. `anchor` keeps
its U line meaning, the edge that stays put while the dock morphs.

**The cure (`b6c2870c0`).** The four `[data-anchor]` margin rules are deleted from
`layers.css`. Nothing else in `src` reads `data-anchor`. The ruling asks whether `anchor`
should feed the measured origin as a tie-breaker. It should not, since there is no tie to
break:

- `dockMorphMeasure.anchor()` derives the root's origin as the fixed point
  `(painted − laid) / (1 − s)`, so the edge a layout lays the dock at is the edge the
  scale holds.
- When `s` is 1, the scale is a no-op, so any origin is correct and the code takes the
  centre.

So `anchor` changes nothing that layout does not already determine. The root still
carries `data-anchor` as a hook for consumer CSS, and the four texts now say exactly
that:

- the `anchor` docstring (`useDockShellProps.ts`);
- the dock README;
- the CHANGELOG 11.0.0 "New" item;
- the MIGRATION row.

The texts also stop suggesting `justify-content` on the parent. The dock's own auto
inline margins centre it against `justify-content` (the witness showed it: a dock laid
straight in a `flex-end` row sat centred). A row therefore places the dock through a
content-sized wrapper, which is how atlas lays its PlateDock.

**Atlas.** Unaffected. Its PlateDock sits in a content-sized `flex-end` wrapper, the
pin never acted there (critique 1), and the atlas-lane cell below holds its end edge
through expand and collapse in both engines.

**The witness** is the `tests-visual/u-b7.spec.ts` "anchor" block, harness scenes
`figure-row` and `figure-atlas`. It has three kinds of cell:

- Each edge holds through expand and collapse. An `anchor="start"` dock and an
  `anchor="end"` dock (plus an rtl `end`) are laid at their row's edge by a
  content-sized wrapper. Each is opened by a press and closed by a press outside, with
  the anchored edge traced every frame. Drift is under 2 px, the dock expands by more
  than 40 px, and it collapses back to its rest width.
- Atlas's figure lane holds its end edge through expand and collapse, measured the same
  way.
- The prop never moves the dock: `start`, `end` and `center` lay out alike in a
  free-space row. This cell is red against the pin from `a029b20ac` (start 24, center
  356, end 688; `fix-2/anchor-red-chromium.log`).

The repaired-pin cells from `a029b20ac` were red against the merge's single-margin rules
(5/5 horizontal cells, Chromium desk) before the ruling replaced them. That log was
overwritten by the red check above.

The unit test that regex-matched the stylesheet (`GlassDock.figure-props.test.ts`) is
replaced by this engine witness. The unit file keeps the `data-anchor` attribute arm.

## D2 · the demo documented the deleted `--scale-hover-dock` (minor)

The `<li>` in `demo/stories/foundations/css-utilities.vue` is deleted (`a029b20ac`). The
remaining hits for the token in `src` are struck-history comments.

## D3 · MIGRATION.md 11.0.0 carried internal ids (moderate)

The `## 11.0.0` section is rewritten in plain consumer sentences (`a029b20ac`, with the
`anchor` row trued again in `b6c2870c0`). Every migration step is kept:

- old import → new import;
- deleted token or API → what to do;
- the `ContextMenu` diff;
- the modal, dropdown, radius and package-layout actions.

Gone are the branch names, row tags, register ids, record paths, witness paths, commit
hashes, census and "this branch" prose, and the named downstream call sites. The
critique's `awk … | grep -nE "U/B|B7|O-[0-9]|u/b|MO-|I-[0-9]"` finds nothing. A wider
sweep (`F-[0-9]|G-M|X3|F5|A7|census|wave|tranche|seat|critic|witness|branch|<hash>`) is
also empty.

Seen in passing, and outside this seat's defects: MIGRATION's preamble, above every
version section, still says "(L invariant 4)". Critic 2 may weigh it.

## Gates (committed tree)

| gate | result | exit |
| --- | --- | --- |
| `npm run build` (at `b6c2870c0`) | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (after the demo build) | 269 files; 2503 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` before the rebind | `G-BUNDLE-RATCHET` shrink 2963387 < 2963866 (`verify-package-1.log`) | 1 |
| `npm run verify:package` at `7d4bf6096` | CLEAN; ratchet 2963387 `equal: true`; roster 291/291 | 0 |
| U line `u-b7.spec.ts`, Chromium (`chromium-desk`, `chromium-coarse`) | 21 passed, 1 skipped (CDP touch: coarse only, by design) | 0 |
| U line `u-b7.spec.ts`, WebKit 2287 (`webkit-desk`, `webkit-phone`, `u-line-webkit.config.ts`) | 20 passed, 2 skipped (CDP touch: Chromium coarse only) | 0 |
| 10.1.3 + 10.1.4 release specs, Chromium headless (`chromium-headless-new`) | 83 passed | 0 |
| 10.1.3 + 10.1.4 release specs, WebKit 2287 (`webkit-2287.config.ts`) | 73 passed, 10 skipped (`page.pdf` and CDP touch, by design) | 0 |
| atlas pack-and-import smoke (`atlas-smoke/smoke.sh`, fresh pack) | RUNTIME GREEN, types green, `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)`; ATLAS SMOKE GREEN | 0 |

The engine runs above were taken on the working tree of `b6c2870c0` before it was
committed. The commit holds those same bytes. The B7 shape set was not re-run: no file
it reads changed (dock layers, the dock docs, MIGRATION, the demo story and the U line
spec only).
