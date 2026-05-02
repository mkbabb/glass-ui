# F Final

Generated: 2026-05-02
Status: complete

## Thesis Closed

F hardened interaction, style, and rendering contracts without adding compatibility shims or legacy codepaths. The package root is core-only, non-core surfaces use explicit subpaths, active consumers build, dock is a single owned component family, brittle component contracts are tested, Tailwind v4 theme wiring is compile-proved, and Aurora's live/capture/runtime shader behavior is measured.

## Landed Waves

| Wave | Result |
|---|---|
| W0 | Current-state ledgers and challenge closed. |
| W1 | Proof substrate and active consumer contract enforcement landed. |
| W2 | Dock, rail, layering, transition, portal, and navigation substrate hardened. |
| W3 | Component safety, stale state, identity, and lifecycle contracts repaired. |
| W4 | Tailwind theme namespaces, style authority, and brittle CSS cleanup proved. |
| W5 | Aurora runtime, shader, studio split, capture/live modes, and profiler landed. |
| W6 | Six-lane close audit resolved blockers, ran hard close, and recorded residuals. |

## Commits

- `ac8d9e2 docs(tranche-f): plan interaction style and rendering contract hardening`
- `c98dc4c docs(tranche-f/w0): close current-state ledger gate`
- `7dca483 feat(tranche-f/w1): add proof substrate and enforce active consumer imports`
- `09280c0 feat(tranche-f/w2): harden dock context portals and rail layer behavior`
- `f1cd338 fix(tranche-f/w3): harden component contracts and lifecycle cleanup`
- `5a8dd24 feat(tranche-f/w4): align Tailwind theme and style authority`
- `b523b20 feat(tranche-f/w5): harden Aurora runtime shader and profiling contracts`

W6 is the close commit after this file.

## Final Evidence

Hard close command: `scripts/ay-close.sh`

Result: pass.

Artifacts:

- `audit/W6-package-proof.json`: pass
- `audit/W6-consumers-static.json`: pass, four active consumers, no root-surface failures
- `audit/W6-consumers-build.json`: pass, four active consumers
- `audit/W6-tailwind-theme-proof.json`: pass
- `audit/W6-runtime-smoke.json`: pass, 71 routes, 0 failures
- `audit/W6-bundle-profile.json`: pass
- `audit/W6-aurora-profile.json`: pass, 16 live cases, 22 thumbnail cases, 0 failures

Full tests: `iter-test` passed, 18 files and 266 tests.

## Final Measurements

Bundle:

- total: 392754 bytes / 102358 gzip
- CSS: 26518 bytes / 4847 gzip
- JS: 366236 bytes / 97511 gzip

Compared with W1, F closes with CSS reduced from 44143 bytes / 7056 gzip to 26518 bytes / 4847 gzip while adding proof/profiling/runtime assertions.

Aurora:

- live smooth/pastel/watercolor DPR 2 P95 frame timing stays at or below 10.1 ms in the W6 profile;
- oil gestural DPR 2 remains the accepted heavy path at 25.2 ms median / 33.8 ms P95 with live preservation false;
- thumbnail capture remains shared-context, 11 cases per DPR, DPR 2 P95 capture 16.2 ms;
- `/aurora` runtime smoke proves nonblank pixels with live `preserveDrawingBuffer: false`.

## W6 Corrections

The final audit found and resolved several proof gaps before close:

- public root allowlist is no longer self-derived from `src/index.ts`;
- dock internals are no longer exported from the public dock subpath;
- exact dock runtime export tests were added;
- Aurora `strokeAmount` and dead `uRes` shader surface were fixed;
- `/aurora` route proof now reads sampled pixels;
- profiler cleanup now waits/retries instead of failing on a still-busy Chrome profile;
- dock deferred click-away listener installation is canceled on collapse/unmount;
- invalid Tailwind container theme entries, retired configurator font token, and an unused cartoon hover utility were removed;
- dock popover CSS length parsing now handles rem/em/vw/vh/CSS lengths.

## Residual Decision

F closes with five accepted P3 residuals in `audit/W6-residuals.md`:

1. carousel transition callback invalidation after nested `nextTick` / RAF;
2. intro/story source substrate wiring;
3. deeper runtime proof for active nav/shortcut/nearest-owner portal behavior;
4. Aurora oil DPR 2 heavy path and GPU timing calibration;
5. generated internal/test declarations under `dist/src`.

No named next tranche is opened because none of these blocks package correctness, active consumers, route smoke, style compile, or Aurora runtime correctness.
