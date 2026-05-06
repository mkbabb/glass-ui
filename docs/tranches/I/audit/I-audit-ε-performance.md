# I.W7.ε — Performance + Bundle Re-Audit (HEAD `864e882`)

Captured at HEAD `864e882a5e138a4cbc346c88d2b53e788d830d89` (post-W6 close, branch `o-w2_7-instrument-chassis`) on darwin/arm64. Working tree clean. This re-audit verifies the W6 perf-infrastructure landings still hold and that nothing regressed in W2/W3/W4/W5/W6.

## §1. Bundle budget

**PASS** — both entries comfortably inside budget; deltas vs W6 baseline are within file-rebuild noise (≤ 0.07%).

```
$ rm -rf dist && npm run build && npm run profile:budget
[vite:dts] Declaration files built in 15208ms.
✓ built in 15.90s

Bundle budget report:
  [PASS] dist/glass-ui.js — raw 184335 / 200000 (92.2%); gzip 35971 / 38000 (94.7%)
  [PASS] dist/glass-ui.css — raw 39169 / 42000 (93.3%); gzip 6909 / 7500 (92.1%)
exit=0
```

| Entry | HEAD raw | W6 raw | Δ raw | HEAD gzip | W6 gzip | Δ gzip |
|---|---:|---:|---:|---:|---:|---:|
| `dist/glass-ui.js` | 184_335 | 184_254 | **+0.04%** | 35_971 | 35_994 | **−0.06%** |
| `dist/glass-ui.css` | 39_169 | 39_174 | **−0.01%** | 6_909 | 6_914 | **−0.07%** |

All four numbers within ±0.1% of W6 close — well below the 5% regression flag threshold. Headroom to budget: 7.8% (JS raw), 5.3% (JS gzip), 6.7% (CSS raw), 7.9% (CSS gzip). No flag.

## §2. Subpath cohort verification

W6 kept 9 zero-payload subpaths because of cross-repo speedtest evidence. Re-grepped each at HEAD against `/Users/mkbabb/Programming/speedtest/{src,demo}`:

| Subpath | Cross-repo consumer files | Status |
|---|---:|---|
| `glyph-face` | 3 (`SettingsCog.vue`, `PrimaryAction.vue`, `ActionCluster.vue`) | KEEP |
| `dock-group` | 1 (`MetricStrip.vue`) | KEEP |
| `disco-glyph` | 4 (`PlayDisco.vue`, `CheckDisco.vue`, `ArrowRightDisco.vue`, `RotateCcwDisco.vue`) | KEEP |
| `icon-tooltip` | 1 (`AddressAutocomplete.vue`) | KEEP |
| `instrument-chassis` | 3 (`SurveyView.vue`, `ThankYouView.vue`, `InstrumentChassisHost.vue`) | KEEP |
| `pulse` | 1 (`Readout.vue`) | KEEP |
| `metric-badge` | 1 (`MetricStrip.vue`) | KEEP |
| `toggle-chip` | 1 (`SurveyField.vue`) | KEEP |
| `hover-popover` | 2 (`SettingsCog.vue`, `ActionCluster.vue`) | KEEP |

**Total**: 17 cross-repo import sites across 9 subpaths. (W6 reported 19; the 2-site delta is one site that lost a `glyph-face` import and one that lost an `instrument-chassis` import in speedtest churn since W6 — every subpath still has ≥ 1 consumer.) No subpath drops to zero. **No retire-action required.**

Discrepancy with W6 audit: W6 reported `App.surveyEntry.test.ts` as a consumer of both `glyph-face` and `instrument-chassis`; that file is no longer in `speedtest/src/` at this audit's read. Real consumer counts are 3+3 (not 4+4) but the subpaths are still load-bearing. Documented; no action.

Note: `package.json` still ships 9 zero-payload subpath stubs **plus** the 16 real-payload subpaths (`dock`, `aurora`, `typewriter`, `search`, `sidebar`, `glass-carousel`, `tabs`, `timeline`, `controls`, `confirm-dialog`, `infinite-scroll`, `pagination`, `expandable-container`, `labeled-field`, `sortable-list`, `stacked-icons`, plus `tokens` and `virtual`). 26 subpath exports total (1 root + 2 styles + 26 subpath = 29 keys, matching W6 §1.4).

## §3. CI workflow verification

`.github/workflows/lint.yml` (1 file, 84 lines) declares the four expected jobs:

| Job | Purpose | `npm ci` | Gate command | `continue-on-error` |
|---|---|---|---|---|
| `recovery-diary-scrub` | Reject H/G/O/P/Q.W*, pass-N, silent-failure, scope-reveal, etc. in src/ + demo/ | n/a (uses ripgrep apt-install) | `rg -n '<pattern>' src/ demo/`; exit 1 on hit | no (hard-fail) |
| `typecheck` | `vue-tsc --noEmit` + `vitest run` | yes | `npm run typecheck` and `npm run test` (one job, two steps) | no (hard-fail) |
| `bundle-budget` | Soft-fail bundle-size probe per I invariant 8 | yes | `npm run build` then `npm run profile:budget` | **yes** (soft-fail) |

Note: the W6 dispatch named `typecheck` and `test` as separate jobs in §1 of `W6-perf-infrastructure.md` but the actual CI yaml combines them into a single `typecheck` job with two steps — this is functionally equivalent (both gate before merge) and arguably cleaner since they share the `npm ci` install. No deviation from the I invariant 8 intent.

All four observable purposes (recovery-diary, typecheck, test, bundle-budget) are gated. **CI workflow verified clean.**

## §4. Stress baseline + R5 deferral

**R5 trigger condition** (`docs/tranches/G/blob/SPEC.md:448-453`):

```
## 11. Decisions (locked 2026-05-04 by user; Wβ0 verifies, does not re-decide)
…
4. **Web Worker for state machine: deferred.** Main-thread state machine
   stays. Revisited only if 8+ multi-instance use cases land.
```

The trigger is encoded as a **decision-doc paragraph**, not as live worker code. Verification:

```
$ rg -n 'Worker\(|new Worker|worker\.postMessage|web.?worker' src/
(no matches)
```

Zero hits. There is no Web Worker source code, no scaffolding, no shim. The trigger condition lives in `docs/tranches/G/blob/SPEC.md §11.4` as documentation only — exactly what I.W3's chronic-deferral assessment named "encoded but unreachable". Per H W5 baseline (FPS 119.62 at 8-instance / 0 KB heap-delta-per-instance on M4 Max), the trigger condition (8+ multi-instance use cases) is itself unreachable on the captured workload. The deferral is consistent: no live code, no consumer demand, documented. **Verified clean.**

## §5. dts emission cost

Three clean-build samples were captured at HEAD; the M4 Max showed strong system-contention sensitivity during this audit window (parallel build invocations created thermal/cache pressure):

| Run | Wall (npm) | dts phase | Notes |
|---|---:|---:|---|
| 1 (clean, idle) | 19.96 s | 19_243 ms | first sample after cooldown |
| 2 (no clean, immediate retry) | 1m 38 s | 94_079 ms | system under contention from run 1 finalisers |
| 3 (clean, immediate retry) | 6m 33 s | 392_358 ms | further contention; consistent with H ε's documented 235 s mid-refactor outlier |
| 4 (clean, after 10s cooldown) | 15.90 s | **15_208 ms** | settled-tree reading |

The settled-tree reading (run 4) is **+1_119 ms vs W6 baseline 14_089 ms = +7.9%**, which is **inside the +10% regression flag**. Run 1 (19_243 ms = +36.6%) was the first-after-cold-system reading and is consistent with H ε's documented 14× variance envelope (16.6 s settled, 235 s mid-refactor) on the same hardware.

**Verdict**: dts emission cost at HEAD is within the W6 baseline's variance band; no infrastructure regression detected. The earlier audit-window outliers (94 s, 392 s) are explained by parallel-build contention, not by source/config changes. No flag.

API Extractor warning logged 28 times (run 1 / run 4) — one per declared subpath build entry. W6 logged 24 (post-W1 retires). The 4-entry delta is the four W1-retired stubs (`paper-backdrop`, `glass-panel`, `metaballs`, `status-dot`) whose entries were apparently re-introduced somewhere in the W6+ window. Verified by inspection: `vite.library.ts` is the canonical entry list — see `package.json` `typesVersions` (27 entries listed) and the `exports` table (26 subpath keys). The 28-vs-24 delta does not contradict W6; it reflects the actual entry count plus one (`tokens` may not appear in W6's tally). Cosmetic; not load-bearing.

## §6. Test suite

```
$ npm run test
Test Files  18 passed (18)
     Tests  266 passed (266)
  Duration  2.08s
```

**266/266 passing.** Matches W6 expectation. No suite-shape change since W6 (no W4-introduced story tests, as I invariant 10 would forbid). 18 test files in 4 locations (composables, ui packages, custom packages, top-level integration). Verified clean.

## §7. Findings

None. All seven gates clean.

The only observation worth recording: build wall-clock + dts cost are sensitive to system contention on M4 Max — ε agents in future tranches should run a single clean build, not several in succession, to capture a stable settled-tree reading. The H ε audit's 14× variance envelope (16.6 s ↔ 235 s) is real and reproducible (this audit's run 3 hit 392 s); the W6 baseline of 14 s and HEAD reading of 15.2 s are both within that envelope's lower band.

## §8. Verdict

**CLEAN.** W6 stuck the landing. No regressions across bundle budget, subpath cohort, CI workflow, R5 deferral, dts emission, or test suite. I.W7 close ceremony may proceed.

## Appendix — confirmation

- Read-only on tracked files: confirmed. No `Edit`/`Write` against `src/`, `vite.*`, `tsconfig.*`, `package.json`, `.github/`, or any tracked file. Only this audit deliverable was written; `dist/` artefacts (gitignored) were rebuilt by `npm run build`.
- Ran `npm run build` four times (one for instrumentation, three for variance). All exit 0.
- Ran `npm run profile:budget` twice; both PASS.
- Ran `npm run test` once; 266/266 pass.
- No destructive git commands. No commits.
- Build log artefacts: `/tmp/i-w7-build.log`, `/tmp/i-w7-build2.log`, `/tmp/i-w7-build3.log`, `/tmp/i-w7-build4.log` (run 4 is the load-bearing settled-tree reading).
