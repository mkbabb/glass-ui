# K Post-Close Audit — ε lane (performance + dts emission + bundle-budget)

**Date**: 2026-05-09
**Scope**: K W8 ε lane — read-only audit + read-only measurement.
**Tree state at audit**: `master` clean; HEAD `c5f196c` (W6 close ceremony + post-close audit).
**Inputs**: K invariant 12 (bundle-budget gate), `K-pre-close.md`, `W4-bundle-profile.json`, `W-S-bundle-evidence.md`, `K-lighthouse-2026-05-08.md`.

## 1 — Bundle-budget gate

### 1.1 Local re-run (read-only against existing dist/)

```
$ GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget
> @mkbabb/glass-ui@0.9.3 profile:budget
> node scripts/profile-bundle.mjs --enforce

Bundle profile written: docs/tranches/K/audit/W4-bundle-profile.json

Bundle budget report:
  [PASS] dist/glass-ui.js  — raw 138454 / 190000 (72.9%); gzip 25399 / 33700 (75.4%)
  [PASS] dist/glass-ui.css — raw 22589 / 29000 (77.9%); gzip 4446 / 5750 (77.3%)
```

Exit 0. `--enforce` mode active. Re-run wrote artefact to `docs/tranches/K/audit/W4-bundle-profile.json` (same content as pre-close run).

### 1.2 Budget vs measurement table

| File | raw bytes | raw budget | raw use | raw headroom | gz bytes | gz budget | gz use | gz headroom |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `dist/glass-ui.js` | 138_454 | 190_000 | 72.9% | 51_546 (27.1%) | 25_399 | 33_700 | 75.4% | 8_301 (24.6%) |
| `dist/glass-ui.css` | 22_589 | 29_000 | 77.9% | 6_411 (22.1%) | 4_446 | 5_750 | 77.3% | 1_304 (22.7%) |

Both files PASS with the ~30% headroom envelope K invariant 12 (and Rβ A13 disposition) prescribes. Worst-case headroom is gz `glass-ui.css` at 22.7% remaining; raw `glass-ui.css` at 22.1%. Both rounds within striking distance of the 30% target — gate is binding (not slack).

### 1.3 BUDGETS table source — `scripts/profile-bundle.mjs:33-36`

```js
const BUDGETS = {
    "dist/glass-ui.js":  { raw: 190_000, gzip: 33_700 },
    "dist/glass-ui.css": { raw:  29_000, gzip:  5_750 },
};
```

Header comment cites K W4 baseline (`146_129 / 25_928` glass-ui.js raw/gz; `22_359 / 4_420` glass-ui.css raw/gz) and reserves the v0.9.2 cn-refactor re-baseline window for K W8. Speedtest's W3.perf.B.T5 cn() refactor never landed inbound — current dist still consumes `tailwind-merge` (the savings window is open but not exercised). Numbers chosen with ~30% headroom are correctly load-bearing against today's HEAD; no re-baselining required at K close because the 0.9.2 ship the comment anticipated did not happen during K's lifetime.

### 1.4 Workflow binding

`.github/workflows/lint.yml`:

```yaml
jobs:
    bundle-budget:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: 20
            - run: npm ci
            - run: NODE_OPTIONS=--max-old-space-size=8192 npm run build
            - run: GLASS_UI_BUDGET_SKIP_BUILD=1 npm run profile:budget
```

No `continue-on-error`; `npm run profile:budget` exits non-zero on FAIL (script line 166-170). Job is binding on PR + push to master.

## 2 — DTS emission

### 2.1 Top-level dts files

| File | Exists | Bytes | Notes |
|---|:-:|---:|---|
| `dist/index.d.ts` | yes | 229_863 | Root barrel types. |
| `dist/forms.d.ts` | yes | 11_702 | WS subpath. |
| `dist/composables/dark.d.ts` | yes | 50 | WS subpath (re-export only). |
| `dist/composables/keyboard.d.ts` | yes | 54 | WS subpath (re-export only). |
| `dist/dock.d.ts` | yes | 12_125 | |
| `dist/aurora.d.ts` | yes | 8_962 | |
| `dist/configurator.d.ts` | yes | 9_495 | |
| `dist/typewriter.d.ts` | yes | 11_949 | |
| `dist/glass-carousel.d.ts` | yes | 10_417 | |
| `dist/sidebar.d.ts` | yes | 6_104 | |
| `dist/search.d.ts` | yes | 5_363 | |
| `dist/sortable-list.d.ts` | yes | 6_828 | |
| `dist/virtual.d.ts` | yes | 7_052 | |
| `dist/labeled-field.d.ts` | yes | 4_308 | |
| `dist/hover-popover.d.ts` | yes | 4_265 | |
| `dist/tabs.d.ts` | yes | 3_991 | |
| `dist/glyph-face.d.ts` | yes | 3_852 | |
| `dist/instrument-chassis.d.ts` | yes | 3_432 | |
| `dist/disco-glyph.d.ts` | yes | 3_220 | |
| `dist/infinite-scroll.d.ts` | yes | 2_792 | |
| `dist/metaballs.d.ts` | yes | 2_620 | |
| `dist/metric-badge.d.ts` | yes | 2_219 | |
| `dist/glass-panel.d.ts` | yes | 2_057 | |
| `dist/toggle-chip.d.ts` | yes | 2_055 | |
| `dist/stacked-icons.d.ts` | yes | 1_794 | |
| `dist/dock-group.d.ts` | yes | 1_718 | |
| `dist/scrolling-text.d.ts` | yes | 1_321 | |
| `dist/keyboard.d.ts` | yes | 1_355 | top-level alias (non-export) |
| `dist/confirm-dialog.d.ts` | yes | 1_332 | |
| `dist/controls.d.ts` | yes | 1_107 | |
| `dist/icon-tooltip.d.ts` | yes | 940 | |
| `dist/pagination.d.ts` | yes | 953 | |
| `dist/expandable-container.d.ts` | yes | 957 | |
| `dist/tokens.d.ts` | yes | 879 | |
| `dist/paper-backdrop.d.ts` | yes | 850 | |
| `dist/status-dot.d.ts` | yes | 841 | |
| `dist/timeline.d.ts` | yes | 796 | |
| `dist/pulse.d.ts` | yes | 801 | |
| `dist/freshness.d.ts` | yes | 770 | |
| `dist/dark.d.ts` | yes | 400 | top-level alias (non-export) |

All package-level dts files are emitted and non-empty. `dist/keyboard.d.ts` and `dist/dark.d.ts` exist at the top level alongside `dist/composables/{keyboard,dark}.d.ts`; they are not in the `exports` map (only the `composables/*` paths are exported). Treated as emit-side residuals — harmless but unnecessary surface area; flag for L cleanup if a vite-plugin-dts knob can suppress them.

### 2.2 Per-export resolution sweep

A node-side resolution probe walked every entry in `package.json` `exports` and confirmed both `types` and `import` targets exist on disk. **76 targets verified, 0 missing.**

```
Verified 76 targets, 0 missing
```

(38 subpaths × {types, import} = 76; root `.` + 37 named subpaths.)

## 3 — Subpath cohort (WS)

### 3.1 K.W-S subpaths

| Export | Types target | Import target | dist/ resolution |
|---|---|---|---|
| `./forms` | `dist/forms.d.ts` (11_702 B) | `dist/forms.js` (629 B) | resolves |
| `./composables/dark` | `dist/composables/dark.d.ts` (50 B) | `dist/composables/dark.js` (88 B) | resolves |
| `./composables/keyboard` | `dist/composables/keyboard.d.ts` (54 B) | `dist/composables/keyboard.js` (220 B) | resolves |

Sibling-consumer perspective — node `require.resolve` against the package root would walk `package.json` `exports` first; the entries above resolve correctly under `import`/`types` conditions. No fallback to root-barrel needed.

### 3.2 Phase-1 honesty (CHANGELOG)

`CHANGELOG.md` v0.9.3 entry includes the explicit Phase-1 limitation:

> Phase 1 alone does NOT close the SCC trap. The K.W-S evidence transcript (`docs/tranches/K/audit/W-S-bundle-evidence.md`) confirms that with v0.9.3 linked in the speedtest consumer and a `"vueuse": ["@vueuse/core", "@vueuse/shared"]` manualChunk applied, the entry chunk drops 30.78 KB gz but a new 33.58 KB gz vueuse leaf appears with `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core` hoisted into it.

Phase 2 (root-barrel removal of vueuse-bearing symbols) deferred to L tranche / v1.0 with explicit major-version bump.

### 3.3 WS evidence verification

`docs/tranches/K/audit/W-S-bundle-evidence.md` correctly captures:

- pre-state entry chunk gz: **171_272 B**, 0 modulepreload directives.
- post-state entry chunk gz: **139_748 B**, 1 modulepreload directive (`vueuse-Cyv4riDB.js`).
- net effect: **+2_055 B regression** on the eager critical path + 1 extra HTTP request.
- mechanism: Rollup hoisted `@vue/{shared,reactivity,runtime-core,runtime-dom,compiler-dom}` into the vueuse leaf because the root barrel transitively pulls vueuse-bearing symbols (Input, Textarea, Combobox\*, useGlobalDark, useKeyboardShortcuts).
- visual-regression matrix not run (HALT before that step) — recorded.

Disposition is correct: HALT, recommend Phase-2 for L. The W3.b.1 disposition document (speedtest-side) annotation lands when v1.0 ships.

## 4 — Stress harness disposition

| Item | Status | Notes |
|---|---|---|
| `scripts/stress/` directory | absent | RETIRED per W4.B default; no `scripts/stress/` exists. |
| `stress` npm script | absent | grep over `package.json` "scripts" returns 0 hits. |

Verdict: stress harness retire is binary and complete.

## 5 — `ay-close` disposition

| Item | Status | Notes |
|---|---|---|
| `ay-close` npm script | absent | grep over `package.json` "scripts" returns 0 hits. |
| `scripts/ay-close.sh` file | **PRESENT** | 2_136 B; mode 755; mtime 2026-05-06. Pre-close audit (`K-pre-close.md` line 77) acknowledges this as residual flagged for K W8 cleanup. ε flags: still on disk at audit time. |

Finding **F-ε-1**: `scripts/ay-close.sh` remains on disk despite the npm-script entry being retired in W4 Lane B. Trivial cleanup; orchestrator action item for the W8 close ceremony commit.

## 6 — Lighthouse re-run

Lighthouse 12 was available (`npx --yes lighthouse@12`) and the dev server was up at `http://localhost:5173`. Three routes re-run with the same flags as the 2026-05-08 baseline (`--chrome-flags="--headless=new --no-sandbox --disable-gpu"`, `--max-wait-for-load=60000`).

### 6.1 Scores

| Route | Perf | A11y | BP | SEO | Δ-vs-baseline |
|---|---:|---:|---:|---:|---|
| `/motion/metaballs` | 54 | 100 | **96** | 91 | BP unchanged at 96 (errors-in-console still 0). SEO 82 → 91 (`meta-description` landed). |
| `/primitives/buttons` | 54 | **94** | 100 | 91 | A11y unchanged at 94 (color-contrast still failing — see F-ε-2). SEO 82 → 91. |
| `/aurora` | 55 | 100 | 100 | 91 | A11y 100 → 100 (P1-2 cleared). SEO 82 → 91. |
| `/navigation/dock` | 54 | 100 | 100 | 91 | A11y 100 → 100 (P1-3 cleared). SEO 82 → 91. |

(Baseline `K-lighthouse-2026-05-08.md` table — 6.1 above re-runs 4 of 6 routes against the routes WP touched.)

### 6.2 P0 / P1 status against `K-lighthouse-2026-05-08.md`

| Finding | Disposition | Verified |
|---|---|---|
| **P0-1** Configurator reactive recursion (`/motion/metaballs`) | W7 `2197596` claims fix landed at `useConfiguratorState.ts:85-119` (activeKey now reactive ref) + metaballs.vue dropped colorDraft. | **NOT CLEARED at runtime.** Lighthouse `errors-in-console` audit still scores 0 with `Maximum recursive updates exceeded in component <Configurator>` console.error fired during initial route load. **F-ε-3.** |
| **P1-1** Color-contrast (`/primitives/buttons` viz-basis) | WP `8ec320b` swapped `text-white` → `text-foreground` per the P1-1 "Preferred (KISS)" recommendation. | **NOT CLEARED in dark mode.** Headless-Chrome default `prefers-color-scheme: dark` resolves `--foreground` to `hsl(48 10% 90%)` ≈ `#e8e7e3` (light cream); ratios over `bg-viz-{fourier,chebyshev,legendre}` measured 2.36 / 2.04 / 1.97 — *worse* than the white-on-color baseline (2.92 / 2.53 / 2.44). The fix is correct in light mode but the demo runs dark by default under headless audit. **F-ε-2.** |
| **P1-2** Aurora preset chip label-content-name-mismatch | WP `8ec320b` dropped redundant `aria-label="Preset: ${label}"`. | CLEARED (a11y 100, label-content-name-mismatch=1). |
| **P1-3** Dock dropdown trigger label-content-name-mismatch | WP `8ec320b` dropped redundant `aria-label="Dock command"`. | CLEARED (a11y 100, label-content-name-mismatch=1). |
| **P1-4** Skeleton non-composited shimmer keyframe | WP `8ec320b` migrated to transform-only `::after` overlay. | CLEARED at source (`Skeleton.vue:39-65` confirms `transform: translateX` + `will-change: transform`). Runtime TBT delta on `/aurora` not isolated this run; defer measurement. |
| **P1-5** Render-blocking Google Fonts CSS | WP `8ec320b` async-loaded via `media="print" onload='this.media="all"'`. | CLEARED at source (`index.html:30-39` confirms pattern + `<noscript>` fallback). |
| **P1-6** Computer Modern `font-display: swap` | WP `8ec320b` inlined 4 `@font-face` blocks. | CLEARED at source (`demo/demo.css:17-53` confirms 4 blocks each with `font-display: swap`). |
| **P2-1** `meta-description` | W4 Lane B `8a04a2b` added meta tag to `index.html`. | CLEARED (SEO 82 → 91 across all 4 re-run routes). |

### 6.3 Findings detail

#### F-ε-3 — P0-1 Configurator recursion still firing on `/motion/metaballs`

**Severity**: P0 carry-forward.
**Symptom**: Lighthouse `errors-in-console` audit scores 0 with the same Vue runtime warning text as the 2026-05-08 baseline. Reproduced on two consecutive Lighthouse runs against `http://localhost:5173/motion/metaballs`.

```
console.error — Maximum recursive updates exceeded in component <Configurator>.
This means you have a reactive effect that is mutating its own dependencies and
thus recursively triggering itself.
```

**Diagnostic state**:

- `useConfiguratorState.ts:94` confirms `activeKey = ref<string | undefined>(initialKey)` (W7 fix landed at source).
- `Configurator.vue` template + script-setup show no obvious recursive watch.
- `demo/stories/motion/metaballs.vue` confirms `colorDraft` removed; `commitColor` writes `cfg.colors[index]` only.
- The recursion may originate elsewhere — candidates worth probing in W8 close ceremony:
    - `motionMode` computed reads `cfg.speed` + `cfg.orbitAmplitude`; `setMotionMode` writes both. If `<BouncyToggle>` emits an `update:model-value` on mount (initial sync to upstream computed) the round-trip can fire on every paint.
    - `MetaballCanvas` watcher on `canvasRef` re-initialises the canvas on mount; if init path indirectly mutates `cfg` (or a derived reactive) the configurator's `applyPreset`/`isDirty` chain can re-trigger.
    - `<Configurator>` `scrollMode="auto"` may interact with `<ConfiguratorRow>` mount sequencing.

**Recommendation**: orchestrator schedules a focused diagnostic pass in K W8 close ceremony (or files as L hand-off) with the actual recursion source isolated via Vue devtools / `console.trace` instrumentation. The W7 commit's claim of "0 errors / 0 warnings" via Playwright probe is at odds with the Lighthouse re-run; the discrepancy itself is load-bearing.

#### F-ε-2 — P1-1 Color-contrast regressed in dark mode

**Severity**: P1 carry-forward.
**Symptom**: 3 viz-basis buttons (Fourier / Chebyshev / Legendre) on `/primitives/buttons` measured at `#e8e7e3` foreground over `#eb7366` / `#88a1e7` / `#ce8ee1` backgrounds — contrast 2.36 / 2.04 / 1.97 (AA requires ≥ 4.5).

**Diagnostic state**:

- `--foreground` light = `hsl(24 10% 10%)` (`tokens.css:160`), dark = `hsl(48 10% 90%)` (`tokens.css:617`).
- `useGlobalDark` defaults via vueuse `useDark({ disableTransition: false })` which honors `prefers-color-scheme`. Headless Chrome under Lighthouse defaults dark in this environment → demo runs in dark mode → `text-foreground` resolves to light cream.
- Original P1-1 prescription explicitly said the fix is "demo-story-only", but did not anticipate the dark-mode foreground inversion.

**Recommendation**: this is a demo-side fix — viz-basis pill buttons need a hue-aware on-fill foreground (e.g. always-dark contrast color), not a token that flips with the theme. Two options:
    1. Use a fixed token like `text-cartoon-ink` or hard-code `text-slate-900`; the fill hues are designed for chart ribbons (light tints in both themes) so a dark foreground is the correct stable choice.
    2. Introduce a `--on-viz` token (or `text-on-viz` utility) that resolves to the dark rung in both modes.

Either way the fix is one line in `demo/stories/primitives/buttons.vue:118` and is W8-close-ceremony scope.

### 6.4 Lighthouse runs — artefact retention

Raw JSON reports written to `/tmp/k-w8-eps-lh/{metaballs,buttons,aurora,dock}.json` (not committed). The 2026-05-08 baseline at `docs/tranches/K/audit/lighthouse-2026-05-08/` retains the canonical pre-WP captures. K W8 close ceremony decision-point: re-run all 6 baseline routes + commit raw artefacts to `docs/tranches/K/audit/lighthouse-2026-05-09/`, OR cite this audit's narrative re-run as sufficient evidence and absorb F-ε-2 / F-ε-3 directly.

## 7 — Build / test sanity

| Gate | Result |
|---|---|
| `npm run typecheck` | green (vue-tsc --noEmit, exit 0) |
| `npm test` | green (27 files / 340 tests pass; 2.75s) |
| `npm run profile:budget` | PASS (skip-build mode against existing dist) |

## 8 — Verdict

**ε lane: 3 findings.**

| ID | Severity | Surface | Disposition |
|---|---|---|---|
| F-ε-1 | residual | `scripts/ay-close.sh` on disk | trivial — orchestrator deletes file in W8 close commit. |
| F-ε-2 | P1 carry-forward | viz-basis button contrast in dark mode (`demo/stories/primitives/buttons.vue:118`) | one-line demo-side fix; W8 close ceremony scope. |
| F-ε-3 | P0 carry-forward | `<Configurator>` recursion on `/motion/metaballs` (Lighthouse `errors-in-console` still firing) | diagnostic pass needed; the W7 fix at `useConfiguratorState.ts` is correct but not sufficient. Either land the residual fix in W8 close ceremony OR file as L hand-off with the discrepancy-vs-W7-claim called out in K FINAL.md. |

**Bundle-budget gate**: clean (PASS, both files under 30%-headroom envelope; CI workflow binding; BUDGETS table values reflect the K W4 baseline + ~30% headroom per K invariant 12).

**DTS emission**: clean (76/76 export targets resolve; all subpath dts present and non-empty).

**Subpath resolution** (K.W-S Phase 1): clean (`./forms`, `./composables/dark`, `./composables/keyboard` all resolve; CHANGELOG documents Phase-1 limitation honestly; W-S-bundle-evidence.md captures +2 KB regression + 1 modulepreload reappearance correctly).

**Stress harness retire**: clean (no script, no directory).

**`ay-close`**: script entry retired (clean); residual file on disk (F-ε-1).

**Lighthouse re-run**: 2 of 3 P1 audits cleared at runtime; P1-1 regressed in dark mode (F-ε-2); P0-1 fix landed at source but recursion still fires at runtime (F-ε-3). Source-level evidence for P1-4 / P1-5 / P1-6 / P2-1 confirmed clean.

The ε gate is **PASS-with-findings**: the binding bundle-budget invariant is satisfied; the dts + subpath cohorts are clean; the WS Phase-1 honesty is intact. F-ε-1 / F-ε-2 / F-ε-3 are absorption candidates for the W8 close ceremony commit before FINAL.md is final, per K hard gate item 10 ("7-agent post-close audit returns clean before FINAL").
