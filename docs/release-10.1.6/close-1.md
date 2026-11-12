# 10.1.6 close, round 1: ready to tag

Seat: build-and-close, claude-opus-5-5, 2026-11-12, branch `release/10.1.6` from the v10.1.5 tag
commit `527989284`. Every build, test and browser run went through `guarded`, one at a time, and
every WebKit run went under `--exclusive webkit`. **None was refused.** Some arms waited a long
time (about 50 minutes for a heavy slot, about 80 for the WebKit lock, a few minutes for the zone
sampler). No tag, push or publish.

## The branch

| commit | what |
|---|---|
| `c496246f5` | the cure, cherry-picked from `3aa871c28` (release/11.0.2) without conflict: under `(forced-colors: active)` the focused track (valid and invalid arms) and the focused spectrum thumb take a `Highlight` outline 2px out; the witness spec `tests-visual/slider-forced-colors.spec.ts` and its harness |
| `857daba57` | `tests-visual/release-10-1-6.config.ts`: the WebKit 2287 config with the witness spec matched, so the witness runs in Playwright WebKit |
| `f065e9b24` | package.json and the lockfile at 10.1.6; the CHANGELOG 10.1.6 entry dated 2026-11-12 |
| `9f20e3b8c` | `.bundle-ratchet` 2955467 → 2955683, bound on the committed tree (below) |

The cherry-picked rule sits inside the stylesheet's existing `@media (forced-colors: active)` block
on 10.1.x, beside the forced-colours range fill. Nothing else in `src` changed.

## The outline audit (`git diff v10.1.4..v10.1.5 -- src`)

The diff adds **one** `outline: none`, and no `outline: 0`, `outline-style` or `outline-width`
suppression:

- `src/components/slider/styles.css`, `.glass-slider:not([data-variant="spectrum"]) .slider-thumb:focus-visible`.
  Its ring is the track's `box-shadow`, which forced colours drop, so a focused Slider showed
  nothing. This is the defect, and the cure covers it (the scrubber and invalid witness cells).

Other focus changes in that diff, where an indicator survives forced colours:

- `src/components/_shared/disclosure/disclosure.css`: the trigger *removed* its `outline: none`.
  Its ring moved from `box-shadow` onto `outline`, which forced colours keep, and its forced-colours
  arm now sets only `outline-color: Highlight`. A focused trigger draws a system-colour outline.
- `src/components/dock/styles/morph.css`: `.dock-layer--summary:focus-visible` gains an `outline`
  ring. Outlines survive forced colours.

One more suppression in the same stylesheet predates v10.1.4: the spectrum thumb's
`outline: none` beside a `box-shadow` ring. The cure covers it too (the spectrum witness cell,
RED on v10.1.5).

## Witness: the forced-colors cell

`tests-visual/slider-forced-colors.spec.ts`, three cells (scrubber, invalid, spectrum). Each cell
emulates `forcedColors: "active"`, focuses the thumb by keyboard, asserts `:focus-visible`, reads
the marked box's computed outline (solid, width ≥ 2, offset ≥ 1), and compares the pixels of a
band around the box with the unfocused frame.

| tree | chromium-headless-new | coarse-touch | webkit (2287) |
|---|---|---|---|
| `git archive v10.1.5` + the witness files | **3 failed** | **3 failed** | **3 failed** |
| branch | **3 passed** | **3 passed** | **3 passed** |

Every RED cell passes `forced` and `focusVisible`, then fails on `outlineStyle`: expected
`"solid"`, received `"none"`. It is the defect, not the harness. (The v10.1.5 archive's demo
server logs a skipped dependency pre-bundle. A v10.1.5 critic harness imports a tree that is not
tracked. The page loads and every cell reaches its assertions.)

## Battery on the committed tree (`git archive`, CI's fresh checkout)

The first pass ran on `f065e9b24`. Everything passed except `verify:package`:
`G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2955683 > 2955467`. The +216 B is exactly
the new rule in the built CSS (measured: the minified rule in `dist` is 216 characters). The
CHANGELOG is not packed. The datum was rebound in `9f20e3b8c`, the archive took the same file, and
the whole battery ran again:

| step | `f065e9b24` | `9f20e3b8c` |
|---|---|---|
| version = 10.1.6 | exit 0 | exit 0 |
| `prepare` (npm ci's build) | exit 0 | exit 0 |
| `npm run typecheck` | exit 0 | exit 0 |
| `npm run build` | exit 0 | exit 0 |
| `npm run verify:package` | exit 1 (ratchet +216) | exit 0, terminal CLEAN, ratchet PRESENT, datum 2955683 = unpacked 2955683 (equal) |
| `npm run demo:dist:build` | exit 0 | exit 0 |
| vitest `--maxWorkers=2` | exit 0, 247 files, 2397 passed, 10 expected fail, 1 skipped | the same |
| `gate:pixel-floor` (aurora, real GPU) | exit 0, GREEN, 3 floors | (source unchanged by the rebind) |
| `gate:pixel-floor:planted` | exit 0, GREEN self-test, 2 floors RED on the plant | |
| `gate:pixel-floor:planted:flood` | exit 0, GREEN self-test, blob ceiling RED on the plant | |

The archive tree (`.cache/r1016/tip`) was its own one-commit repo with the rev's file list
(38,954 of 38,955 paths, the one gap being the `docs/precepts` gitlink, as in CI's checkout
without submodules), with the install symlinked in for `npm ci`. Both archive trees are deleted.

## Release specs and slider specs on the branch, by title

Compared with the v10.1.5 close's title sets (`docs/release-10.1.5/close/reclose/*.json.gz`,
`suite/branch-*.json.gz`, `suite/branch-fails.tsv`) by `scripts/titles.py`:

| arm | project | result | fail now, passed on v10.1.5 |
|---|---|---|---|
| release-10-1-2, -3, -4 | chromium-headless-new | 135 passed | 0 |
| release-10-1-2, -3, -4 | coarse-touch | 133 passed, 2 failed (release-10-1-3 D-1 at 390, both fail on v10.1.5) | 0 |
| release-10-1-2, -3, -4 | webkit (2287) | 125 passed, 10 skipped (the specs' own) | 0 |
| release-10-1-5 | chromium-headless-new | 107 passed | 0 |
| release-10-1-5 | coarse-touch | 107 passed | 0 |
| release-10-1-5 | webkit (2287) | 107 passed | 0 |
| 4 slider specs | chromium-headless-new | 4 passed, 7 failed, all 7 fail on v10.1.5 | 0 |
| 4 slider specs | coarse-touch | 4 passed, 7 failed, all 7 fail on v10.1.5 | 0 |

The slider specs are every spec file in `tests-visual/` with "slider" in its name: `a11y-slider`,
`dock-with-slider-live`, `slider-forced-colors`, `slider-spectrum-fallback`. The 4 passes are the
3 forced-colors cells and one `a11y-slider` title. The webkit project's `testMatch` names only the
release specs, `safari-webgl` and `aurora-swraster`, so the slider specs have no WebKit cell beyond
the witness above.

Two arms needed a second run, neither on an assertion:

- release-10-1-2..4 WebKit, first try: ended with 143 (SIGTERM) at 13:41 while still waiting for
  the WebKit lock, before any test ran. The guard and reaper logs name no cause. Rerun: green.
- release-10-1-5 coarse, first try: hit the 75-minute guard timeout (exit 124) with the 1-minute
  load above 140 for much of it (156 measured at 15:17). Single tests took 14 to 16 minutes against a 60 s test timeout, and the run
  was killed before it printed failure detail. Rerun at load about 30: 107 passed in 13.0 minutes.

## Dist-tag

`npm view @mkbabb/glass-ui dist-tags`: `latest` 11.0.1, `release-10` 10.1.5.
`node scripts/dist-tag.mjs 10.1.6 11.0.1` prints `release-10`.

## Tree

Clean apart from this record before its commit: the slider and capture specs rewrote no tracked
file. No server is left on ports 5361 to 5364.

## How it ran

- Drivers in `scripts/`: `archive.sh` (the `git archive` trees, the witness overlay for v10.1.5),
  `queue.sh` (stages red, green, gates, floors, r24, r5, slider), `cell.sh` (one Playwright
  process), `gates.sh`, `floors.sh`, `rerun.sh` (the two second runs and the gates on the rebound
  tip), `titles.py` (the title comparison).
- Every arm is in `close-1/runs.txt`. Reports and logs are gzipped beside it.
- Ports: 5361 (v10.1.5 archive), 5362 (tip archive floors), 5363 (branch Chromium and coarse),
  5364 (WebKit).
- Not measured: real Safari, and a real Windows High Contrast session. Every forced-colours cell
  is Playwright's `forcedColors: "active"` emulation.
