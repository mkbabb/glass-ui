# H.W5 — Stress Runtime Baseline (R2)

Captured by `scripts/stress/blob-stress-capture.mjs` against the
`_internal/blob-stress` story under headless Chromium via Playwright.

- **Captured**: 2026-05-05T08:25:04.912Z
- **Chromium**: 147.0.7727.15
- **User agent**: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/147.0.7727.15 Safari/537.36`
- **Hardware**: darwin/arm64 · Apple M4 Max · 64.0 GB RAM
- **Story instances**: 8 (`SPECIMENS` length in `demo/stories/_internal/blob-stress.vue`)
- **CI relax factor**: 1× (set `STRESS_CI_RELAX=1` in CI to relax the verdict; absolute numbers are unchanged)


## Captured metrics

| Metric | Value |
|---|---|
| Frames | 599 |
| Elapsed | 5007.50 ms |
| FPS | 119.62 |
| Mean frame | 8.36 ms |
| Max frame | 25.10 ms |
| Heap before | 20.69 MB |
| Heap after | 20.69 MB |
| Heap delta | 0.0 KB |
| Memory / instance (heap delta ÷ 8) | 0.0 KB |

## Threshold check

| Metric | Measured | Reference budget | Effective budget (CI-adjusted) | Verdict |
|---|---|---|---|---|
| Mean RAF delta (per-frame, all 8 instances) | 8.36 ms | 0.50 ms | 0.50 ms | n/a |
| Max RAF delta (per-frame worst-case) | 25.10 ms | 33.30 ms | 33.30 ms | n/a |
| FPS baseline (8 instances ≥ 30 fps with gating) | 119.62 fps | 30.00 fps | 30.00 fps | PASS |
| Memory per instance (heap delta ÷ 8) | 0.00 KB | 256.00 KB | 256.00 KB | PASS |

## Reference table (SPEC.md §9)

| Metric | Reference Budget |
|---|---|
| Per-frame GPU time | ≤ 2 ms (M1 / iPhone 12 / Pixel 5) |
| Per-frame CPU (renderer) | ≤ 0.5 ms |
| Per-frame CPU (state machine) | ≤ 0.3 ms |
| Memory per instance | ≤ 256 KB |
| 4-instance baseline | 60 fps |

## Notes

- The story drives 8 simultaneous `<Blob>` instances through one shared
  `useRAFLoop` driver; mean/max RAF delta is the per-driver signal, not a
  per-instance CPU breakdown. Per-instance GPU/CPU split would require
  per-instance `performance.measure` calls.
- `performance.memory.usedJSHeapSize` is Chromium-only; in non-Chromium
  environments the heap-delta row reads `n/a` and the memory/instance
  verdict is suppressed.
- The 4-instance / 60 fps baseline in SPEC.md §9 is more permissive than the
  8-instance / 30 fps gating scenario the story exercises. The verdict above
  uses the 8-instance / 30 fps gate; SPEC.md's 4-instance row remains
  reachable by changing `SPECIMENS` in the story.
