# 10.1.5 re-close: ready to tag

Seat: re-close, claude-opus-5-5, 2026-11-12, branch `release/10.1.5`. Source under test:
`221490c63` (the CHANGELOG cut date 2026-11-12 over `7ffbb1337`; the cure `314ce60fc`, the D-1
witness `0867632a7` and the ratchet `5f9ef035c` are below it). Every build, test and browser run
went through `guarded`, one at a time, WebKit 2287 under `--exclusive webkit`. The first arm waited
about 10 minutes for a heavy slot and was admitted. **None was refused.** No tag, push or publish.

## Verdict

Every check `.github/workflows/release.yml` runs passes on the committed tree, and the pixel floors
are GREEN with both plants biting. On the branch, the four release specs and the 13 dock specs
fail no title that passes on v10.1.4. The two reds the close found are gone in every project
where they were red. Two WebKit titles failed once in the queue on a `page.goto` load timeout and
passed 6/6 each when run alone.

## Battery on the committed tree (`git archive 221490c63`)

| step | result |
|---|---|
| version = 10.1.5 | exit 0 |
| `prepare` (npm ci's build) | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0 |
| `npm run verify:package` | exit 0, terminal CLEAN, ratchet PRESENT, datum 2955467 = unpacked 2955467 (equal, no rebind) |
| `npm run demo:dist:build` | exit 0 |
| vitest `--maxWorkers=2` | exit 0, 247 files, 2397 passed, 10 expected fail, 1 skipped |
| `gate:pixel-floor` (aurora, real GPU) | exit 0, GREEN, 3 floors |
| `gate:pixel-floor:planted` | exit 0, GREEN self-test, 2 floors RED on the plant |
| `gate:pixel-floor:planted:flood` | exit 0, GREEN self-test, blob ceiling RED on the plant |

- The archive tree sat at `.cache/reclose/archive`. It got its own one-commit repo with the branch's
  file list (38,896 of the branch's 38,897 paths; 180 of them are tracked but ignored and were force-added). The one
  difference is the `docs/precepts` gitlink, which stays empty, as in CI's checkout without
  submodules. The install is symlinked in as the stand-in for `npm ci`. The tree is deleted.
- Logs: `logs/gates-reclose-archive/`, `reclose/floors/`.

## Visual arms on the branch

| arm | project | result |
|---|---|---|
| release-10-1-2, -3, -4 | chromium-headless-new | 135 passed |
| release-10-1-2, -3, -4 | coarse-touch | 133 passed, 2 failed (release-10-1-3 D-1 x2, both fail on v10.1.4) |
| release-10-1-2, -3, -4 | webkit (2287) | 124 passed, 10 skipped (the specs' own), 1 failed (`page.goto` timeout, below) |
| release-10-1-5 | chromium-headless-new | 107 passed |
| release-10-1-5 | coarse-touch | 107 passed |
| release-10-1-5 | webkit (2287) | 106 passed, 1 failed (`page.goto` timeout, below) |
| 13 dock specs | chromium-headless-new | 9 passed, 30 failed, all 30 fail on v10.1.4 |
| 13 dock specs | coarse-touch | 9 passed, 30 failed, all 30 fail on v10.1.4 |

The dock specs are every file in `tests-visual/` whose name contains "dock": `_dock-context-capture`,
`dock-animation-live`, `dock-cockpit`, `dock-items-lag-capture`, `dock-luma-share`,
`dock-morph-family`, `dock-morph-insitu`, `dock-plate-clearance`, `dock-rail-cohesion`,
`dock-sections`, `dock-with-slider-live`, `dockmorph-cta`, `nav-dock-fix`. The webkit project's
`testMatch` names only the release specs, `safari-webgl` and `aurora-swraster`, so it does not run
the dock specs.

### By title against the close's sets

Failing titles (project, file, title), from the JSON reports, compared with
`suite/v1014-fails.tsv` and `suite/branch-fails.tsv`:

| project | fail now | also fail on v10.1.4 | fail now, pass on v10.1.4 |
|---|---|---|---|
| chromium-headless-new | 30 | 30 | 0 |
| coarse-touch | 32 | 32 | 0 |
| webkit | 2 | 0 | 2, both GREEN alone (below) |

The two WebKit titles timed out in `page.goto` at "waiting until load", which is a navigation, not
an assertion:

- `release-10-1-3` "10.1.3 · 390 · bottom-anchored reversal > D-1 (critique-3) · a collapse()
  mid-expand keeps the summary glyph inside the plate": 1-minute load 28 at the time. Alone,
  6 repeats: **6/6 passed** (`reclose/alone-d1c3-wk`).
- `release-10-1-5` "q2 O-187 at 1440: a nested .dock-run group keeps each hovered control's whole
  ink": the same navigation hang `critique-close-2.md` records for q2. Alone, 6 repeats:
  **6/6 passed** (`reclose/alone-q2-wk`).

The 11 titles in these files that the close recorded as branch failures all pass now: the O-101a
reversal (Chromium, coarse, WebKit), the two O-101 horizontal reversals (coarse, WebKit), and D-1
at 1440 and 390, dark and light (coarse).

## Source and records

- `git diff -U0 v10.1.4..HEAD -- src` adds 0 comment lines that carry a row, round or seat id.
- The CHANGELOG cut date is 2026-11-12 (`221490c63`), the same byte length, so the ratchet is
  unchanged.
- The capture specs among the dock specs rewrote 19 tracked PNGs and wrote one untracked readback.
  All were restored or removed. The tree is clean apart from these records.

## How it ran

- Drivers: `scripts/reclose-archive.sh`, `reclose-queue.sh` over `close-gates.sh`,
  `reclose-floors.sh` and `reclose-cell.sh`; title sets with `close-summary.py`. Every arm is in
  `reclose/runs.txt`; reports and logs are gzipped beside it.
- Ports: 5371 (archive floors), 5372 (branch Chromium and coarse), 5374 (branch WebKit), clear of
  the 11.0.1 close's.
- Not measured: real Safari. Every WebKit cell is Playwright WebKit 2287.
