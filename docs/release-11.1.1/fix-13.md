# 11.1.1 fix seat 13 (after the close)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`,
from `a5452a1a3` (the orchestrator's ruling after the close; master merged at `d464304d7`).
Every orchestrator note in this folder was read first (fifteen), with the close record
`close/close.md` and the scope file. The list is the note after the close, items (a) to (e), in
its order. No tag, no push, no publish.

**Measured.** Every build, test and browser run went through `~/.claude/guard/guarded`, WebKit
under `--exclusive webkit`. The guard refused nothing. Several runs waited in its heavy queue
(up to about 18 minutes), and one waited 35 minutes for the WebKit lock. The 1-minute load ran 10 to 60, from other sessions. Ports 5351 to
5356, each run on its own server. No server, browser or tree of this seat is left running.

## Commits

| item | commit | what |
|---|---|---|
| (a) the pixel floor | 2cce4d8a9 | the substrate stages write `rendererStatus` on the component's own element; the floor reads it there and walks the page's ten presets |
| (b) the palette cells | 80287b971 | `close/exits/commanddialog-restate.patch`, applied as written |
| (c) the pick | 4c30732a0 | `CommandInput` holds reka's query writes through the dialog's exit; the pick cell reads the plate's layout box and the next open; one CHANGELOG sentence |
| (d) release.sh | 9c85560b0 | `npm run demo:dist:build` before `npm run prepublishOnly` |
| (e) the WebKit title | 108fd6051 | the resolution and its runs: a load flake |
| the ratchet | 136ab6da8 | `.bundle-ratchet` 3055377 to 3055590 (+213 B), and the CHANGELOG's two size figures that moved |

## (a) The pixel floor reads the renderer from the page again

**Cause, as the close found it.** The floor waited on `output.renderer-status[data-renderer]`,
the studio frame's badge (`RendererStatus.vue`), which master's `e4361f2ee` deleted. Behind the
badge, two more pieces of the floor still described the old page:
- `sourcePresetKeys` parsed `export const PRESETS = { … }`, which the rebuilt
  `aurora/presets.ts` no longer has (it exports `AURORA_PRESETS`, an array of ten);
- the walk expected 17 presets.

So the floor needed all three restated to reach a pixel on the merged tree.

**Cure.**
- `demo/stories/substrates/aurora.stage.vue` and `blob.stage.vue` keep the last
  `rendererStatus` their component emits and bind it on the component as `data-renderer` (the
  engine) and `data-state` (the phase). Both fall through to the component's root element
  (`.aurora-root[data-aurora-substrate]`, `.goo-blob-wrapper`). No visible text; no library
  change.
- `substrate-paints-color.spec.ts` reads `[data-aurora-substrate][data-renderer]` and
  `.goo-blob-wrapper[data-renderer]`, expects ten presets, and its comments describe the page as
  it is now. The preset tiles are the Configurator's default gallery, which keeps
  `button[data-preset-tile]` and `aria-pressed`, so the walk's selector stands.
- `pi-manifest.ts`'s `sourcePresetKeys` parses the `key` of each `AURORA_PRESETS` entry.

**Witness**, `fix-13/floor.sh`, release.sh's three legs on the worktree
(`logs/a1-{green,planted,flood}.{log,json}`):

| leg | before (the close, `close/gates/pixel-floor*.log`) | after |
|---|---|---|
| `gate:pixel-floor` | RED: "the aurora renderer badge never reached data-state=ready", and the blob's | **GREEN**, 3 floors on the live path: aurora DEFAULT 238.8 and the ten presets 104.0 to 242.0 (floor 8); blob coverage 0.178 (floor 0.1, ceiling 0.7) |
| `gate:pixel-floor:planted` | "PLANTED DEFECT FAILED THE WRONG ASSERTION" | **GREEN as a self-test**: the aurora floor fails its plant (DEFAULT 0.0, every preset 2.0) and the blob floor fails its plant (coverage 0.000), each on its own assertion |
| `gate:pixel-floor:planted:flood` | the same | **GREEN as a self-test**: the blob ceiling fails its plant (coverage 1.000 over 0.7) |

- The runs read the content of 2cce4d8a9, except one comment: after the planted run, the
  floor's "sensitivity limit" comment was rewritten to the measured planted reads (every one of
  the eleven reads is bitten). That comment is the only difference.

## (b) The CommandDialog cells drive the rebuilt Command page

The patch applied cleanly as written. The red tree (`fix-13/tree.sh`, `.cache/fix13-red/tree`,
deleted after) is a `git archive` of master's tip `48bebb122`. That is 11.1.0's source, plus
the two unreachable-export changes, with the rebuilt demo and the worktree's 11.1.1 specs
copied in (hashes equal, `logs/tree.out`). Runs: `fix-13/b-chain.sh` → `logs/b-*`, six cells
per project (three routes and three standing).

| project | master's tip (11.1.0's source) | the branch |
|---|---|---|
| Chromium 390 | 6 failed | escape, outside GREEN (routes and standing); pick RED |
| Chromium 1440 | 6 failed | the same |
| WebKit 390 | 4 failed, 2 skipped (outside) | escape GREEN; pick RED; outside skipped |
| WebKit 1440 | 6 failed | escape, outside GREEN; pick RED |

On master's tip the routes cells fail on "the list is mounted while the plate is seen", and
the standing cells on "no frame carries more than a fifth". On the branch the pick fails on
"the plate keeps its height" and on the standing share (0.40 to 0.73), as the close read it.

## (c) A palette closed by a pick keeps its rows through its exit

**Cause.** In reka 2.10.1, on a pick, `ComboboxItem` closes the combobox and sets the root's
model. Two reka paths then write the query:
- `ComboboxInput` watches the root's model and, with `resetSearchTermOnSelect` (on by
  default), writes the picked value's text into the input's model;
- one millisecond after any close, `resetSearchTermOnBlur` (on by default) runs the same reset.

`CommandInput` forwarded each write to its `update:modelValue` at once. The demo's rows follow
that query, so in the first frame of the dialog's exit the list narrowed to the picked row and
the plate fell from 435 to 119 px while it faded.

**Cure, `src/components/command/CommandInput.vue`.**
- The input reads reka's dialog context as `CommandList` does. Once the dialog it sits in has
  closed, it does not forward reka's writes; it only notes that one came.
- When the exit has finished, the content unmounts and the input with it. If a write was held,
  the input then emits an empty query.
- A dialog reopened before then drops the held write and keeps the query it had.
- Outside a dialog, or with no write during the exit (a consumer who turned both resets off),
  nothing changes.
- No new prop, export or token.

On the pick, the dialog's `open` is already false by the time reka's write arrives, because the
host closes the dialog in the same tick and Vue renders the ancestors first. The four projects
read it so.

**Witness**, in the pick route cell (`release-11-1-1.spec.ts`).
- `film.ts` now records the surface's layout box (`offsetWidth`, `offsetHeight`) beside its
  painted box. The Dialog's own exit scales the painted box by about 5 % (435 to 414), and the
  layout box is what a refilter moves.
- New clause, read first: the plate's layout box is within 1 px of its rest on every mounted
  frame from the pick to the last one.
- New clause, read last: after the exit, the palette opens again with an empty query and as
  many rows as before the pick.
- Runs: `fix-13/c-chain.sh` → `logs/c-{pre,post}-*`, read by `fix-13/pick.py`.

| tree | Chromium 390 | Chromium 1440 | WebKit 390 | WebKit 1440 |
|---|---|---|---|---|
| master's tip, 11.1.0's source | RED: 350×435 to 350×51 | RED: 512×435 to 512×51 | RED: 350×435 to 350×51 | RED: 512×435 to 512×51 |
| the branch before the cure (80287b971) | RED: 350×435 to 350×119 at +53 ms | RED: 512×435 to 512×119 at +38 ms | RED: to 119 at +74 ms | RED: to 119 at +97 ms |
| the branch after the cure (the content of 4c30732a0) | **GREEN**, 6 of 6 | **GREEN**, 6 of 6 | **GREEN**, 4 of 4 (outside skipped) | **GREEN**, 6 of 6 |

- After the cure, every cell of the CommandDialog set passes: the pick, escape and outside routes
  and standing cells, with the next open empty and whole.
- The standing pick cell's worst frame share is 0.106 to 0.129. Before the cure it was 0.40 to
  0.73 on the branch and 0.22 to 0.88 on master's tip.
- (4c30732a0's message gives the routes cell's shares, 0.105 to 0.13, under the standing
  cell's name; these are the standing figures.)
- **The committed tree, repeated.** At 136ab6da8, the pick's route and standing cells ran
  `--repeat-each=3` in each project (`logs/r3-*`). All 24 passed, the next open empty and whole
  each time, with the standing cell's worst share 0.104 to 0.126 and the route cell's 0.106
  to 0.154. The WebKit 1440 run waited 35 minutes for the WebKit lock, behind another
  session's run.
- The CHANGELOG sentence, in the "A closing surface leaves the same way" paragraph: "A pick no
  longer rewrites its query as the dialog closes, so rows that follow the query stay as they
  were while the plate fades, and the query clears once the dialog is gone." No em dash.

## (d) release.sh builds the demo before npm test

`scripts/release.sh` runs `npm run demo:dist:build` just before `npm run prepublishOnly`, whose
`npm test` holds the boot-graph gate. release.yml builds the demo before its test step the same
way.

**Witness** (`fix-13/d.sh`, `logs/d.out`, `logs/d-{red,green}.log`). It ran on the worktree,
whose `dist-demo/index.html` (2026-11-22 15:13) was older than three edited sources. vitest was
held to two workers.
- **RED**, the line release.sh ran before (`npm run prepublishOnly`): exit 1. The freshness
  arm "the dist-demo it measures is NEWER than every source it is built from" is the only
  failure (2523 passed, 5 expected fail, 1 skipped).
- **GREEN**, the lines release.sh runs now, read from the script: exit 0. That covers typecheck,
  build, the demo build and vitest (282 files, 2524 passed, 5 expected fail, 1 skipped).
- `d.sh` itself exits 1 after the green leg. That is its last line's `grep` for a refusal
  finding none, not a failure.

## (e) The WebKit title the close left open: a load flake

`release-10-1-5` "fix 12, coarse phone › t1 O-201 vertical" failed once in the close's
seven-file WebKit run (`close/suite/wk-proj.log`). It failed at 23.9 s with "Execution context
was destroyed, most likely because of a navigation". That is the page leaving under the spec,
not an assertion.

`fix-13/e.sh` (`logs/e-*`) ran the title alone, `--repeat-each=3`, under
`--exclusive webkit` on Playwright WebKit 2287:
- on the branch: **3 passed** (47.5 s each);
- on master's tip: **3 passed**.

The spec, its harness and the configs are the same bytes on both trees. The guard log shows no
other glass-ui run beside the close's run. Neither a regression nor a stale witness, so nothing
is restated. The navigation's cause was not found: the close's log carries no server output.

## The ratchet and the sizes

- **Before the rebind.** `verify:package` on the committed source's build (`logs/verify-package.log`)
  failed with `G-BUNDLE-RATCHET … increase forbidden: 3055590 > 3055377`.
  - The build is d.sh's green leg, 11:15.
  - The last source commit is 4c30732a0, 10:56.
  - No tracked file differed from HEAD (`logs/sizes.out`).
- **The rebind.** `.bundle-ratchet` goes from 3055377 to 3055590 (+213 B), once, after the
  last source commit.
- **Sizes.** Every entry's gzipped import closure (critic 6's `sizes.py`, `fix-13/sizes.sh`,
  `logs/sizes.txt`) against the close's `gates-archive-final/sizes.txt`:
  - only two entries moved: the root entry 108,672 to 108,751 and `command` 18,898 to 18,978;
  - the CHANGELOG's size line now says 104,776 to 108,751 and 16,804 to 18,978;
  - **the dock entry is unchanged at 40,533** (38,673 in 11.0.2, 40,541 in 11.1.0), as the
    CHANGELOG says.
- **After the rebind.** `verify:package` (`logs/verify-package-rebound.log`): exit 0,
  `CLEAN`, 197 claims, roster 292 of 292, ratchet equal at 3055590.

## The tree

- `.cache/fix13-red` and `.cache/fix13-pub` were made here and deleted after their reads.
- The earlier seats' `.cache` trees are left as they were.
- The worktree's `dist/` and `dist-demo/` are the green leg's builds of the committed source.
- `test-results/` and `tests-visual/.cache/` hold run outputs, which are ignored.

## Open gaps

A. **A palette whose rows reka filters**, with an input that has no `v-model`, was not read.
   - In it, reka keeps the query internally: the field's text still turns to the picked value
     during the exit.
   - reka's own `filterSearch` resets to empty at every close (`ComboboxRoot.onOpenChange`), so
     rows that were narrowed by typing come back during the exit.
   - The cure here holds what a page's own query receives, as the note rules. Holding reka's
     internal filter would mean writing into reka's context. That is a ruling for the
     orchestrator, with a witness that types before the pick.

B. **The exits gate whole, the visual suite and the coarse-touch chunks ab to al** were not run
   here. The next close runs them, on a full git-archive tree as the note says.

C. **The navigation under (e)'s title in the close's long WebKit run** has no named cause.
   Alone and repeated it passes on both trees.
