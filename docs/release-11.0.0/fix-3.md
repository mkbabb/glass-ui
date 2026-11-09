# glass-ui 11.0.0 — fix 3 (before critic 3)

The fix seat on `release/11.0.0`, run by claude-opus-5-5. It read every record in this
folder and cured the two critique-2 defects at their root. Every build, test and browser
run went through `~/.claude/guard/guarded`, and every WebKit run used `--exclusive webkit`.
The guard refused nothing. The WebKit run waited for the machine-wide lock, which other
sessions held, and then ran. The chain script, logs and JSON reports are in `fix-3/`.

## Commits

| commit | what |
| --- | --- |
| `8e09c6f3f` | D1 and D2: the four `anchor` texts and the README build line, with a witness for each |
| `15893160c` | `.bundle-ratchet` rebind 2963387 → 2963459 (+72 B), from the committed-tree build of `8e09c6f3f` |

## D1 · the `anchor` texts promised an edge the prop does not hold (moderate)

**The cause.** After fix 2 the prop only writes `data-anchor`. Each text still led with
"names the edge that stays put while the dock opens and closes", so a reader who set
`anchor="end"` on a dock its layout centres expected a held end edge and got a morph that
grows on both sides (critique 2's `row` cells, 52 px at 1440 and 56 px at 390, both
engines).

**The cure.** All four texts now lead with what the prop is: a `data-anchor` hook for
the consumer's own CSS that moves neither the dock nor its morph. Each then says why the
morph grows from the edge the layout places the dock at (the origin is measured when the
morph starts), that a dock the layout centres grows on both sides whatever `anchor` says,
and how to hold an edge (a wrapper sized to the dock's content). The four places:

- the `anchor` docstring (`src/components/dock/composables/useDockShellProps.ts`), which
  also ships in `dist/` declarations;
- the dock README (`src/components/dock/README.md`);
- the CHANGELOG 11.0.0 "New" item;
- the MIGRATION 11.0.0 row.

No behaviour changed, and no prop was removed: atlas binds `anchor`, so removing it is a
breaking change for atlas and outside this pass.

**The witness.** The `tests-visual/u-b7.spec.ts` free-space cell ("the prop moves neither
the dock nor its morph") replaces fix 2's rest-only cell. In a row with free space, where
the dock's own auto margins centre it, it lays out a `center`, a `start` and an `end`
dock, opens each with a press and closes it with a press outside. It asserts that:

- `center` writes no `data-anchor`, and `start` and `end` write their value;
- the `center` dock grows on both sides (its start edge moves out by more than 10 px, and
  so does its end edge);
- the rest box and the open box of `start` and of `end` each match `center`'s within
  0.5 px on both edges.

This is exactly what the four texts now claim, and it is the geometry critique 2
measured. The edge-hold cells (content-sized wrapper at the row's start or end, rtl, and
atlas's figure lane) are unchanged and stay green.

## D2 · the shipped README named the removed `glass-ui.css` (minor)

**The cure.** `README.md`'s build line now reads
`npm run build # library → dist/glass-ui.js + index.d.ts + per-subpath chunks`.

**The witness.** `tests/styles/sfc-sheets.test.ts` (build acceptance, reads `dist/`) gains
"has the shipped README name only files the build emits": every file the README's
`npm run build` line names must exist in `dist/`. It is red against the old line
(`expected [ 'glass-ui.css' ] to deeply equal []`, `fix-3/readme-red.log`) and green on
the cure (`fix-3/readme-green.log`).

## Gates (committed tree)

The chain (`fix-3/chain.sh`, log `fix-3/chain.log`) ran on the committed tree of
`8e09c6f3f`. Only `verify:package` was re-run after the rebind, since `15893160c` changes
`.bundle-ratchet` alone.

| gate | result | exit |
| --- | --- | --- |
| `npm run build` (at `8e09c6f3f`) | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (after the demo build) | 269 files; 2504 passed (one more: the README arm), 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` before the rebind | `G-BUNDLE-RATCHET` increase 2963459 > 2963387 (`verify-package.log`) | 1 |
| `npm run verify:package` at `15893160c` | CLEAN; ratchet 2963459, `equal: true`; roster 291/291; keyframes.js 6.3.0 under `^6.0.0` (`verify-package-2.log`) | 0 |
| atlas pack-and-import smoke (`atlas-smoke/smoke.sh`, fresh pack) | ATLAS SMOKE GREEN; `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)` | 0 |
| U line `u-b7.spec.ts`, Chromium (`chromium-desk`, `chromium-coarse`) | 21 passed, 1 skipped (CDP touch: coarse only, by design); the new free-space cell green in both projects | 0 |
| U line `u-b7.spec.ts`, WebKit 2287 (`webkit-desk`, `webkit-phone`, `u-line-webkit.config.ts`) | 20 passed, 2 skipped (CDP touch: Chromium coarse only); the new free-space cell green in both projects | 0 |

The ratchet moved up 72 B because the four `anchor` texts are a little longer and the
docstring ships in the declarations. The rebind is deliberate and measured from the
committed-tree build.

Not re-run, since no file they read changed (this pass touched prose, one docstring and
two test files): the 10.1.3 and 10.1.4 release specs and the B7 shape set. Critique 2's
runs of them at `3868d89b2` stand: 83 passed in Chromium; 73 passed and 10 skipped in
WebKit 2287; 56 passed in the shape set in Chromium; and 76 passed and 2 skipped for the
U line in WebKit.
