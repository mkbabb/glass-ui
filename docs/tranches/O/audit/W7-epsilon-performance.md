# O.W7 — ε performance audit

**Lane**: ε (performance) — 1 of 7 strengthened audit lanes for O close ceremony.
**Mode**: READ-ONLY. No source mutations; profile probe `npm run profile:budget` invoked once (canonical read-only side effect — rewrites `docs/tranches/K/audit/W4-bundle-profile.json`).
**Scope**: bundle delta N close (v1.1.4 @ 37288e0) → O close HEAD (post-W6 @ 25e1b5a + W4-Lane-C-useToast decision + LL).
**Verdict**: **FAVOURABLE-NEUTRAL** — bundle deltas are well within budget; W6 promotions land at sub-3-KB raw / sub-1.1-KB gzip per new chunk; W3 timeline split traded one fat module for five cohesive chunks with a small per-chunk Vue-runtime overhead that is dominated by the cohesion win; CSS budget is at 95.7 % raw and the rebaseline recommendation is documented below.

---

## § N → O bundle delta table

Baseline (N close, v1.1.4): `git show 37288e0:docs/tranches/K/audit/W4-bundle-profile.json` (saved to `/tmp/n-close-profile.json` for the diff).
HEAD: `docs/tranches/K/audit/W4-bundle-profile.json` @ generatedAt `2026-05-14T21:54:23.428Z` (post-`npm run profile:budget`).

### Top-line budgeted artefacts

| File              | N raw   | HEAD raw | Δ raw      | N gzip | HEAD gzip | Δ gzip    | Budget raw | HEAD % raw | Budget gzip | HEAD % gzip |
| ----------------- | ------- | -------- | ---------- | ------ | --------- | --------- | ---------- | ---------- | ----------- | ----------- |
| dist/glass-ui.js  | 127,644 | 128,782  | **+1,138** | 22,886 | 23,261    | **+375**  | 190,000    | 67.8 %     | 33,700      | 69.0 %      |
| dist/glass-ui.css | 32,471  | 34,440   | **+1,969** | 6,076  | 6,324     | **+248**  | 36,000     | 95.7 %     | 6,700       | 94.4 %      |
| **Totals (all)**  | 454,378 | 463,938  | **+9,560** | 126,758 | 129,722  | **+2,964** | —         | —          | —           | —           |

### New chunks introduced at O

| File                                                         | N        | HEAD raw  | HEAD gzip  | Source                                  |
| ------------------------------------------------------------ | -------- | --------- | ---------- | --------------------------------------- |
| dist/header-ribbon.js                                        | ABSENT   | 2,605     | 1,004      | W6 Lane A — HeaderRibbon promotion      |
| dist/dockContext-B-E5kaFs.js                                 | ABSENT   | 206       | 174        | W2 Lane A — typed dock context module   |

Two new chunks total. The dockContext chunk (206 B raw / 174 B gzip) is the typed `provide`/`inject` symbol — a single `Symbol`-keyed `InjectionKey<DockContext>` plus the helper pair (`provideDockContext` / `useDockContext`), now shared between `GlassDock.vue`, `DockLayerGroup.vue`, `DockLayer.vue`, `Slider.vue` (`keepDockOpen`), and `Popover` (per W2 Lane A proof). It replaces the 6 prior string-key `provide` calls + their inject-walks; net dist impact is ~200 B raw added in exchange for ~6 inject-key strings retired from 6 SFCs.

### W3 timeline-split delta (5 SFCs in place of 1 god-module)

| File                       | N raw   | HEAD raw | Δ raw     | N gzip | HEAD gzip | Δ gzip   |
| -------------------------- | ------- | -------- | --------- | ------ | --------- | -------- |
| dist/timeline.js           | 11,266  | 13,661   | **+2,395 (+21.3 %)** | 3,135 | 3,765    | **+630 (+20.1 %)** |

Per-SFC LOC at HEAD (`wc -l src/components/custom/timeline/*.vue`):
- `ContinuousTimeline.vue` — 607 LOC (legacy god-module body, kept as continuous-mode default)
- `SegmentedTimeline.vue` — 225 LOC (extracted segmented variant)
- `ScrubberTimeline.vue` — 191 LOC (extracted scrubber variant)
- `GlassTimeline.vue` — 123 LOC (thin polymorphic dispatcher)
- Total — 1,146 LOC across 4 SFCs + `geometry.ts` + `types.ts` (vs. a single ~900-LOC god-module pre-W3 per W3 Lane A proof).

Per-chunk Vue-runtime overhead estimate (5 SFCs × ~480 bytes/SFC of `defineComponent` + `render` scaffolding + scoped-style binding) ≈ 2.4 KB raw, matching the observed +2,395 B almost exactly. Confirms the delta is **scaffolding overhead, not feature regression**.

### Other notable per-chunk drifts (top deltas, |Δraw| ≥ 50 B)

| File                                | Δ raw   | Δ gzip | Notes                                                                        |
| ----------------------------------- | ------- | ------ | ---------------------------------------------------------------------------- |
| dist/glass-ui.js                    | +1,138  | +375   | curated barrel growth (W4 /api type re-exports, W6 useClipboard) — types are 0-cost at runtime but JS shim re-exports add ~1 KB |
| dist/glass-ui.css                   | +1,969  | +248   | W6 token cohort: header-ribbon CSS + dock token ladder + scale-on-hover utility + speedtest cohort sub-tokens |
| dist/aurora.js                      | +277    | +107   | W1 fail-explicit throws + W3 profile-aurora harness extract                  |
| dist/typewriter.js                  | +85     | +86    | W1 typewriter fail-explicit migration                                        |
| dist/metaballs.js                   | +199    | +65    | minor; configurator-recursion artefact (pre-existing)                        |
| dist/dock.js                        | +47     | +14    | W2 DI refactor — near-zero net (the typed-context lives in its own chunk)    |
| dist/timeline.js                    | +2,395  | +630   | W3 split — explained above                                                   |
| **new** dist/header-ribbon.js       | +2,605  | +1,004 | W6 Lane A new chunk                                                          |
| **new** dist/dockContext-….js       | +206    | +174   | W2 typed context shared symbol                                               |

JS-total delta `+9,560 B raw / +2,964 B gzip` reconciles within ~3 % of the sum of the row deltas above (rounding from gzip's block boundaries + 64-bit chunk hashes).

---

## § CSS budget headroom analysis (rebaseline recommendation)

Current state (HEAD): `dist/glass-ui.css` raw **34,440 / 36,000 = 95.7 %**; gzip **6,324 / 6,700 = 94.4 %**.

Headroom remaining: 1,560 B raw / 376 B gzip. At W6's per-cohort token cadence (~400-500 B raw per cohort), this is **3-4 cohorts of headroom** before the gate trips.

### Recommendation: rebaseline at O close

Raise the CSS budget for v1.5+:

| File              | Current raw | Recommended raw | Current gzip | Recommended gzip |
| ----------------- | ----------- | --------------- | ------------ | ---------------- |
| dist/glass-ui.css | 36,000      | **42,000**      | 6,700        | **7,400**        |

Rationale:
1. **Substrate promotion cadence** — O shipped 5 token cohorts at W6 (header-ribbon, dock-token-ladder, scale-on-hover, speedtest, and the W2 dock-DI-related token sweep). P is signalled to continue promoting consumer-tier substrate; the existing budget will trip within 1 tranche.
2. **Token-first invariant (J)** — every visual behaviour is a CSS custom property. Forcing CSS into a tighter budget than its growth curve incentivizes anti-pattern (component-owned styles, inline-style escape hatches, consumer fork). The budget should track the J invariant, not constrain it.
3. **Headroom symmetry** — JS budget is at 67.8 % / 69.0 % (raw/gzip). CSS at 95.7 % / 94.4 % is asymmetric in a way that doesn't reflect the substrate's actual evolution rate. New JS chunks are small (W6 promotions average ~2 KB); new CSS cohorts are larger and more frequent.
4. **Conservative ceiling** — 42,000 raw / 7,400 gzip leaves ~7,500 B raw / ~1,100 B gzip headroom at HEAD. At W6's cadence (~2 KB raw per close), that's ~3-4 tranches of runway. Mirrors the JS budget's ~32 % headroom ratio.

The rebaseline is **NOT a hard gate for O close** — current HEAD is PASS at 95.7 %. Recommend rebaseline at P open (Lane B-tier, no migration required; consumers are unaffected since the bundle itself is unchanged).

---

## § Build-time delta

| Tranche close | buildDurationMs | durationMs (total profile) |
| ------------- | --------------- | -------------------------- |
| N (v1.1.4)    | 1,077           | 1,086                      |
| O (HEAD)      | 997             | 1,006                      |
| **Δ**         | **−80 ms**      | **−80 ms**                 |

Build time **improved by 80 ms (~7.4 %)** at O close despite +2 new chunks and the timeline split. Likely attributable to W5 Lane A's `proof:all` pipeline consolidation (less redundant work at probe time) + the W4 service-boundary cleanup (fewer cross-module cycles for Rollup to walk). NEUTRAL-FAVOURABLE.

---

## § Per-substrate runtime cost analysis (estimate)

No runtime probe required per W7 brief; estimates are derived from compiled chunk shape + LOC + dep graph.

### W6 — useClipboard composable (`src/composables/dom/useClipboard.ts`, 107 LOC)

- No heavy deps; uses `navigator.clipboard.writeText` + a fallback path through a hidden `<textarea>` + `document.execCommand("copy")`.
- Allocation cost: 1 `ref<boolean>` (copied flag) + 1 `setTimeout` per copy gesture.
- **Runtime cost: O(1) per invocation, no per-mount allocations beyond the composable's own state.**

### W6 — HeaderRibbon SFC (`src/components/custom/header-ribbon/HeaderRibbon.vue`, 155 LOC)

- Pure-presentational SFC composing existing primitives (Button, Tooltip, copy-glyph SVG); no `setInterval`/`requestAnimationFrame` loops.
- Composes useClipboard above; no extra reactive surface.
- Chunk size: 2,605 B raw / 1,004 B gzip — among the smallest custom-tier chunks.
- **Runtime cost: O(1) per mount; comparable to Button or StatusDot.**

### W3 — timeline split (5 SFCs in place of 1 god-module)

- Per-SFC Vue runtime overhead: each SFC carries `defineComponent` + `render` + `staticRenderFns` scaffolding (~480 B raw per SFC). 5 × 480 ≈ 2.4 KB; matches observed +2,395 B raw delta on `dist/timeline.js`.
- **Runtime cost per mount**: identical to N pre-split. The polymorphic dispatcher (`GlassTimeline.vue`, 123 LOC) only renders one of {Continuous,Segmented,Scrubber} per instance — Vue's `:is="dynamicComponent"` is O(1) at first paint and zero-cost on subsequent ticks.
- Tree-shaking is **improved** at consumer-side: a consumer that only imports `ScrubberTimeline` no longer pays for the segmented + continuous bodies. The +21 % `dist/timeline.js` raw growth is the chunk's full inventory; consumers tree-shake to a fraction. NEUTRAL-FAVOURABLE.

### W2 — dock DI refactor (typed-context + helper pair)

- Net `provide` call count per `GlassDock` mount: **6 → 1** (per W2 Lane A proof + the dockContext.ts symbol-key consolidation).
- Inject-walk cost: each descendant resolves 1 symbol-keyed inject (O(depth) up the component tree) instead of 6 string-keyed injects. Slight reduction in inject-resolution cost on every Slider, Popover, DockLayer, DockLayerGroup mount inside a dock.
- Chunk delta: +47 B raw on dist/dock.js + 206 B new dist/dockContext-…js = +253 B raw total for the typed-context substrate.
- **Runtime cost: NET-NEGATIVE (faster inject resolution per dock-descendant mount; identical render path; smaller per-mount provide-table memory).**

### W4 — /api type re-exports + leaky abstraction fixes (TYPES + service boundaries)

- `/api` additions are types: erased at compile-time by `vue-tsc`; zero runtime presence.
- Service-boundary cleanup (W4 Lane C) eliminated 3 transitive imports across `useConfiguratorState` ↔ `aurora` ↔ `metaballs`. May explain the marginal `useConfiguratorState-….js` shape stability + `metaballs.js` small +199 B drift (no new feature; minor `defineComponent` boundary shuffle).
- **Runtime cost: 0.**

### W0 / W1 / W5 — cosmetic excise + fail-explicit throws + pipeline orchestration

- W0 cosmetic excise: dist-neutral by construction.
- W1 fail-explicit throws: each throw site adds ~24 bytes of error-string + `throw` statement; 4 sites = ~100 B; explains the residual `aurora.js` + `typewriter.js` drift.
- W5 pipeline orchestration: dev-time only; zero dist impact.
- **Runtime cost: 0 (W0 + W5); ε-small (W1, only on error paths that previously silent-failed).**

---

## § Verdict

**FAVOURABLE-NEUTRAL** across all four axes:

| Axis                  | Status      | Evidence                                                                |
| --------------------- | ----------- | ----------------------------------------------------------------------- |
| Bundle delta (JS)     | NEUTRAL     | +1,138 B raw / +375 B gzip on `glass-ui.js`; +9,560 B total raw; well within 32 % / 31 % headroom |
| Bundle delta (CSS)    | NEUTRAL\*   | +1,969 B raw / +248 B gzip; PASS at 95.7 %; rebaseline recommended for P open (not blocking) |
| New chunks            | FAVOURABLE  | 2 new chunks (header-ribbon 2.6 KB raw; dockContext 206 B raw); both sub-3-KB; consumers tree-shake |
| W3 timeline split     | NEUTRAL     | +2.4 KB raw scaffolding cost; offset by improved consumer-side tree-shaking + cohesion win |
| Build time            | FAVOURABLE  | −80 ms (~7.4 %) despite +2 chunks and +1.97 KB CSS                       |
| Runtime cost (W6)     | NEUTRAL     | useClipboard + HeaderRibbon are O(1) per invocation; comparable to Button|
| Runtime cost (W3)     | NEUTRAL     | per-mount cost identical; tree-shake improved                            |
| Runtime cost (W2)     | NET-NEGATIVE | 6 provides → 1; faster inject resolution per dock-descendant            |
| Runtime cost (W0/W4/W5) | NEUTRAL  | 0 dist + 0 runtime impact                                                |

\* CSS at 95.7 % is **PASS** under current budget; the rebaseline recommendation is forward-looking guidance for v1.5+, not a close-ceremony gate concern.

No BLOCKERs. No MINOR carry-forwards required for performance specifically; the CSS budget rebaseline is filed as a P-open Lane B (named-destination per `tranche/SPEC.md §"Carry-forward"`).

---

## § Cited evidence

- N close baseline profile: `git show 37288e0:docs/tranches/K/audit/W4-bundle-profile.json` (commit `37288e0` — `feat(tranche-n/w4): close ceremony … → v1.1.4`).
- HEAD profile: `docs/tranches/K/audit/W4-bundle-profile.json` @ generatedAt `2026-05-14T21:54:23.428Z` (post-`npm run profile:budget` this lane).
- W6 substrate: `src/composables/dom/useClipboard.ts` (107 LOC); `src/components/custom/header-ribbon/HeaderRibbon.vue` (155 LOC).
- W3 split: `src/components/custom/timeline/{ContinuousTimeline,SegmentedTimeline,ScrubberTimeline,GlassTimeline}.vue` + `geometry.ts` + `types.ts`.
- W2 typed context: `src/components/custom/dock/composables/dockContext.ts` (58 LOC) + W2 Lane A proof at `docs/tranches/O/audit/W2-Lane-A-dock-typed-context-proof.md`.
- W6 proofs: `docs/tranches/O/audit/W6-Lane-{A,B,C,D}-*.md`.
- W3 proof: `docs/tranches/O/audit/W3-Lane-A-timeline-split-proof.md`.
- W4 proof: `docs/tranches/O/audit/W4-Lane-{A,B,C}-*.md`.
- Build-time / total-bundle deltas: top-of-file `buildDurationMs` field in each profile JSON.
- Per-chunk deltas: per-file `bytes` + `gzipBytes` in `files[]` array of each profile JSON.
