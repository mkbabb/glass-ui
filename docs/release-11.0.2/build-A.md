# 11.0.2 build seat A: O-223 with O-244, O-240, O-266

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`, cut
from master at 10671e3a4 (v11.0.1 merged; `src/` identical to the tag). No seat before this one
left records here.

## Setup

- Worktree created; `package.json` and the lockfile set to 11.0.2, a CHANGELOG 11.0.2 entry
  opened (fdd1ed3c7). `npm ci` under `guarded` (`logs/npm-ci.log`).
- RED trees: `git archive v11.0.1` and `git archive v11.0.0` into `.cache/red-v11.0.1/tree` and
  `.cache/red-v11.0.0/tree` (gitignored), `node_modules` a directory of per-entry symlinks into
  this worktree's (`@mkbabb/*` per entry, the tests-visual workspace link pointed at each tree's
  own), so each tree keeps its own vite cache. The 11.0.2 spec, harnesses and config are copied
  into each tree's `tests-visual/`.
- Servers, each `guarded --timeout 90`: 5341 the branch, 5342 the v11.0.1 tree, 5343 the v11.0.0
  tree. Every visual run sets `GLASS_UI_DEMO_PORT`/`GLASS_UI_DEMO_URL` to its tree's port.
  Chromium projects run through `tests-visual/playwright.config.ts`; WebKit 2287 through
  `tests-visual/release-11-0-2.config.ts`, each WebKit call `guarded --exclusive webkit`
  (`scripts/build-A-webkit-chain.sh`).

## Rows

| row | commit | disposition |
|---|---|---|
| O-223 with O-244 | 659fed3fa | landed, source and tests |
| O-240 | 38be21019 | landed as a witness; closed by 11.0.1's forward merge, no source change |
| O-266 | none | moved: the eight cells fail on a sampling step, not on a painted frame (below) |

### O-223 with O-244: `useGlobalDark({ storageKey })`, and a toggle stores the concrete mode

- **Root.** `useGlobalDark` built on vueuse `useDark`, which takes no key from us and whose
  setter stores `"auto"` whenever the new mode equals the system's
  (`node_modules/@vueuse/core/dist/index.js`, `useDark`'s `set`). The flag is now built on
  `useColorMode` with `useDark`'s own modes (`.dark` for dark, no class for light), the key
  threaded through, and a setter that stores `"dark"`/`"light"` when an `initialValue` was
  seeded. Without one the setter keeps `useDark`'s rule. `storageKey` is one-shot like
  `initialValue`: a conflicting later key throws, a matching one is a no-op. A stored
  `"auto"` still resolves to the system (`mode.state`).
- **Witness.** `tests/composables/dark/useGlobalDark.test.ts` (6 cases; 3 RED on v11.0.1's
  `src/composables/dark`, `logs/o223-unit-red-v11.0.1.log`; all GREEN, `logs/o223-unit-green.log`).
  `tests-visual/release-11-0-2.spec.ts` "dark ·" over `release-11-0-2/dark-harness`, which runs
  `darkModeSyncScript({ storageKey })` then `useGlobalDark({ storageKey, initialValue })`:
  - a fresh `site-theme` key opens dark on `initialValue: "dark"` while `vueuse-color-scheme`
    holds `auto` on a light system;
  - on a dark system, two toggles from dark store `dark`, and a reload on a light system opens
    dark (daraksha's `test.fixme` "night chosen twice on a dark system stays night").

  | tree | chromium-headless-new | coarse-touch | webkit 2287 |
  |---|---|---|---|
  | v11.0.1 | 2 RED | 2 RED | 2 RED |
  | branch | 2 GREEN | 2 GREEN | 2 GREEN |

  RED for the asserted reasons: `isDark` false, and the store `"auto"` where `"dark"` is
  expected. Logs `o223-{red-v11.0.1,green}-{chromium,webkit}.{log,json}`. The first Chromium
  green attempt lost one cell to vite's first dependency optimisation reloading the page
  (`dev-5341.log`, "optimized dependencies changed. reloading"); the rerun is the record.
- CHANGELOG: two clauses under 11.0.2.

### O-240: the quick press under Reduce Motion

- daraksha's repro is copied into `daraksha-repro/` (from branch `o1110-finish`, read-only) and
  ported onto `src/` as `tests-visual/release-11-0-2/press-harness` (same dock: #persistent and
  #persistent-end seats, a two-layer DockLayerGroup with the narrow "page" layer active).
- **Run on the tip first, as the scope orders.** On v11.0.1 the active layer fits
  (`scrollWidth` = `clientWidth`: 113/113 Chromium, 121/121 coarse) and the press lands. On
  v11.0.0 the same layer reads 287/105 (1440) and 273/105 (390), and the press drops:
  `pointerdown:Again`, then `pointerup` and `click` on `.dock-face-content` by mouse; by touch
  `pointerup:Again` and `click:dock-face-content`. So 11.0.1's forward merge of 10.1.5 (the
  hidden, wider layer no longer gives a fitting dock a scroll range) closed it; no source
  change, the repro kept as the witness, per the scope.
- **Witness.** "press ·" at 1440 and 390: the seat gets exactly `pointerdown`, `pointerup`,
  `click`, one press counted, the layer has no scroll range, rests at 0, and reads 0 at each of
  the three events (nothing writes scroll on `pointerdown`).

  | tree | chromium-headless-new | coarse-touch (tap) | webkit 2287 |
  |---|---|---|---|
  | v11.0.0 | 2 RED | 2 RED | 2 RED |
  | v11.0.1 | 2 GREEN | 2 GREEN | 2 GREEN |
  | branch | 2 GREEN | 2 GREEN | 2 GREEN |

  So this witness is RED on v11.0.0, not on v11.0.1: the row was closed before this branch.
  Logs `o240-*`.
- CHANGELOG: no clause; the user-visible change shipped in 11.0.1 ("A collapsed dock hides
  nothing").

### O-266: moved, with what was learned

The eight `O-101 · {horizontal,vertical} · {reversal,mid-expand}` cells of
`release-10-1-2.spec.ts` fail on the tip in Chromium and WebKit 2287 exactly as the baseline
says, but each fails on **one** sample (`Received: 1` in all 16, `logs/o266-tip-*.log`). The
message lists distinct values only, so "(390)" or "(160)" is that one frame, not a morph that
holds the old size until the settle.

- **Why one sample.** The witness samples `--dock-expanded-px` in a `requestAnimationFrame`
  callback. In the frame that carries the viewport change, the order is: the resize step
  (`capture` from the window `resize` listener, reading the pane before the breakpoint's
  re-render: 12 seats clamped to 390, or 3 seats at 160), then the media-query change, Vue's
  patch and the pane MutationObserver (which re-observes), then the rAF callbacks (the witness
  reads the resize step's value here), then layout and the ResizeObserver delivery, whose
  `capture` writes the new endpoint (160 or 592) before paint. 10.1.4 captured in the
  MutationObserver microtask, before rAF; 11.0.0's 84aca695b moved that capture to the
  observer's delivery (the /sci scroll forced-layout cure). Putting the microtask capture back
  turns all eight GREEN in Chromium (`logs/o266-probe1.log`), which confirms the lead, and is
  the perf regression 84aca695b removed.
- **What paints.** `o266/_o266-probe.spec.ts` samples each frame twice, in rAF and in a task
  posted from rAF (after that frame's paint). In both engines the painted state after the
  change already carries the settled endpoint: 390->1440 rAF 160, painted 592; 1440->390 rAF
  390, painted 160 (`logs/o266-probe3.log` Chromium, `logs/o266-probe-webkit.log`). No painted
  frame holds the old content's size, and nothing snaps at the settle. The one-frame jump in
  the visible box (109 to 362 px) is the morph retargeting to the new endpoint (10.1.4 not
  measured here).
- **So.** There is no source defect for 11.0.2 to cure here. Restoring the microtask capture
  would bring back a forced layout on every pane mutation to fix a sample nobody sees. The
  honest cure is to the witness: sample the frame that paints (a task posted from rAF, or a
  ResizeObserver registered after the dock's) instead of the rAF step. That would be GREEN on
  v11.0.0 and v11.0.1 as well, so it cannot be "RED on v11.0.1" and is not this seat's to land
  under the row's terms. It is the orchestrator's call: restate the eight cells (keep them RED
  on 10.1.1, their original bite), or keep them as known baseline titles.
- Nothing of O-266 is committed; `src/` is unchanged by it. The probe spec and config are kept
  in `o266/` for whoever restates the witness.

## Final gates

After the last row (38be21019), all under `guarded`:

- `npm run typecheck`: exit 0 (`logs/typecheck-final.log`).
- `npx vitest run --maxWorkers=2`: 271 files, 2514 passed, 10 expected fail, 1 skipped, and 3
  failed, all in `tests/gates/boot-graph.test.ts`'s build arm, which reads a freshly built
  `dist-demo/` that a fresh worktree does not have (`logs/vitest-final.log`). After
  `npm run demo:dist:build` (exit 0) that file passes 14 of 14 (`logs/vitest-boot-graph.log`).
  So the library suite is 2517 passing: 11.0.1's 2511 plus the six new `useGlobalDark` cases.
- Every server this seat started (5341, 5342, 5343) is stopped. No guarded run was refused.
