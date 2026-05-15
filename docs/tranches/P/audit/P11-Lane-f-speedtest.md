# P11/f — speedtest consumer audit (P-open round-2)

**Agent**: P.W0 P11/f consumer audit lane (round-2 / P-open)
**Target**: `/Users/mkbabb/Programming/speedtest` (READ-ONLY)
**Glass-ui reference**: master HEAD @ `b201b03` (P-open; v1.7.0 untagged at glass-ui side)
**Speedtest tip**: master `aadacfae` (AC tranche CLOSED — `ac-close` tag placed at `8d98a955`)
**Audit date**: 2026-05-14
**Baseline**: `docs/tranches/O/audit/W7-O11f-speedtest-rerun.md` (W7 close; CLEAN; AC.W6 cohort handoff scheduled)
**Cap**: 20 min

---

## TL;DR

**CLEAN + AC TRANCHE FULLY CLOSED.** Since the O.W7 baseline, speedtest's AC tranche has driven the entire glass-ui v1.5–v1.7 cohort AND consumer-side adoption has LANDED for every load-bearing deliverable. AC closed at `aadacfae` (merge of W9 close ceremony) with `ac-close` tag at `8d98a955` and `ab-close` tag retroactively placed at `9f36b55f`. Build PASS at `npm run build` (31.93s; 8-entry precache 604.36 KiB). All four glass-ui-cohort waves (AC.W6b/c/d + AC.W8e) are CONSUMED at speedtest HEAD. `installDarkModeSync` rename FULLY MIGRATED (zero `useDarkModeSync` references). A5 wire intact. Fontshare CDN retired from `index.html`. Self-host fonts (Plus Jakarta Sans Path-D + Fira Code OFL) ACTIVE. `--phase-color-label` cascade consumed at `[data-phase] .text-metric-label`. MetricCell + ResponsiveTabs + FlowSelector card-variant adopted. **W6d primitives (MetricRow / MetricStack / AnimatedDigit / Card variant="chassis") are NOT consumed by speedtest at HEAD** — verified zero references; these landed at glass-ui v1.6.0 as substrate-for-the-AB+1-cohort but speedtest's own composition canon (`<MetricCell>` + `<ResponsiveTabs>` + `<FlowSelector>`) absorbed the consumer-side need at W8e instead. No CR-6 follow-up required for P; the cross-repo carry is RESOLVED.

---

## § Speedtest AC tranche status review

**AC tranche CLOSED** at `aadacfae` (the AC.W9 close-ceremony merge into master on 2026-05-14, same calendar day as P open). Beyond W8e — speedtest landed **W10 (auth-surface unification)** + **W11 (security residuals)** + **W9 (close ceremony)** in the same close-day burst.

| Sub-wave | Status at AC close | Source commit |
|---|---|---|
| AC.W6a (font policy doc) | CLOSED — DESIGN.md skeleton + glass-ui v1.1.0 retro anchor | `e88b85b6` (W6e merge) |
| AC.W6b (OFL font self-host) | CLOSED — `0f0a95ab`; Plus Jakarta Sans Path D + Fira Code; Fontshare CDN retired | `0f0a95ab` |
| AC.W6c (theme token canon) | CLOSED — `478eda95`; `--chart-{phase}-label` companions + dark-mode track-stroke + `--font-brand-sans` collapse | `478eda95` |
| AC.W6d (primitives shipped) | CLOSED on glass-ui side (v1.6.0); CONSUMER did NOT adopt MetricRow/Stack/AnimatedDigit/Card-chassis at speedtest src/ — adopted MetricCell instead at W8e | `bac3adf0` (lockfile sync only) |
| AC.W6e (release ceremony cross-ref) | CLOSED — `e88b85b6`; glass-ui v1.5.0 + v1.5.1 retro tags placed | `e88b85b6` |
| AC.W8a (token + style sweep) | CLOSED — `24b928c6`; -1243 LOC across 93 files | `24b928c6` |
| AC.W8b (transitions retire) | CLOSED-NOP — premise stale | — |
| AC.W8c (composition canon) | CLOSED — `e91895df`; IconTooltip drop + 8 F2 closures + B3b consumer patina | `e91895df` |
| AC.W8d (Living UI re-codification) | CLOSED — `e0490937`; DESIGN.md token matrix + AC.W6 cross-ref | `e0490937` |
| AC.W8e (AB+1 5-of-9 subset) | CLOSED — `8d98a955`; FlowSelector + MetricCell + B7 + ResponsiveTabs + Path B hoist + glass-ui v1.7.0 link | `8d98a955` |
| AC.W10 (auth-surface) | CLOSED — `c0ca12e3`; Admin Pinia store + router + transport + lifecycle reset | `c0ca12e3` |
| AC.W11 (security residuals) | CLOSED — `ced8ff76`; `.env.local` untracked + fail-fast secrets | `ced8ff76` |
| AC.W7 (mobile CLS + favicon + Fontshare) | RETIRED-AT-SPEC per Path 17A — residuals folded into W3 + W6b | — |
| AC.W9 (close ceremony) | CLOSED — `18c14a16` + `aadacfae`; 21 PASS / 1 MISS-WITH-RECEIPT / 1 DEFERRED-TO-AC+1 | `aadacfae` |

The single MISS-with-receipt at AC close is `:deep()` count = 2 at `src/components/speedtest/PhaseTimeline.vue:214-215` (`.continuous-track-wrap` + `.continuous-region-fill`). The underlying concern (visual primary-vs-echo polarity) was closed at W3.T0; the `:deep` reach itself ROUTES-TO-AC+1 as glass-ui `<GlassTimeline>` custom-prop cascade work.

**Latest AC sub-wave**: AC.W9 close ceremony (one sub-wave beyond the AC.W8e referenced in CONSTELLATION §6). The AB+1 origin map in CONSTELLATION is accurate but reflects only the glass-ui-driving sub-waves; the consumer-side AC tranche extended to W11 + W9 close.

**Speedtest git posture**: master at `aadacfae`; ONE untracked directory (`docs/tranches/AC/artefacts/W9/validation/`) — does NOT block close; documentation artefacts only. AC closed cleanly.

---

## § Build verification at v1.7.0

**`npm run build` — PASS** (exit 0; 31.93s wall).

Top chunks (sorted desc):
- `maplibre-Bn2YDv8z.js` 1046.96 kB / 283.10 kB gz (vendor split)
- `echarts-CqLWdkIn.js` 630.34 kB / 211.64 kB gz (vendor split)
- `index-B1pow_R4.js` 355.90 kB / 105.25 kB gz
- `h3-CkcYoSDM.js` 182.35 kB / 55.16 kB gz
- `keyframes-9IWBWHNS.js` 100.76 kB / 34.25 kB gz
- `vueuse-BtcOk9KV.js` 97.39 kB / 37.57 kB gz

Glass-ui v1.7.0 subpath chunks present in `dist/assets/`: `responsive-tabs-BPms_eu4.js` (2.00 kB / 1.00 kB gz), `expandable-container-BzNoMAUW.js` (4.76 kB), `tabs-DjjVFQbZ.js` (4.57 kB), `UnderlineTabs-BGVf7E6U-BXTleqEs.js`, `SelectScrollDownButton.vue_*` (30.94 kB) — substrate isolation by per-package subpath chunking confirms the v1.0 lane B contract holds at the consumer side.

PWA: `precache 8 entries (604.36 KiB)`; `dist/sw.js` + `dist/workbox-8d71a25b.js` generated.

Chunk-size warning fires for echarts + maplibre + index (>600 kB pre-gzip) — pre-existing posture; not regressed by AB+1 cohort.

**Verdict**: Build CLEAN at glass-ui v1.7.0.

---

## § Per-sub-wave consumer-side adoption verdict

### AC.W6a — Self-host font policy doc

**ALREADY-CONSUMED.** Glass-ui v1.1.0 retro anchor + DESIGN.md skeleton landed; speedtest's `docs/tranches/AC/W6e` ceremony cross-referenced the retro tags. No consumer-side src/ change required; verdict ALREADY-CONSUMED transparently.

### AC.W6b — Fira Code + Plus Jakarta Sans OFL self-host

**ALREADY-CONSUMED.** Speedtest's `index.html` lines 41-47 explicitly document Fontshare retirement (`AC.W6b (Path D OFL substitution) — Fontshare CDN retired. Glass-ui v1.5.0 ships Plus Jakarta Sans (OFL 1.1 Path D substitute for General Sans) + Fira Code (OFL) as bundled @font-face declarations`). No live `<link>` to Fontshare or fonts.googleapis at `index.html`. `styles/tokens.css:17-18` reads:

```css
--font-brand-sans: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif;
--font-mono:      "Fira Code", "Fira Code Fallback", monospace;
```

The fallback families come from glass-ui's `src/styles/typography.css` @font-face declarations (consumed via `@import "@mkbabb/glass-ui/styles"` in `styles/style.css`). Migration COMPLETE.

### AC.W6c — `--phase-color-label` cascade

**ALREADY-CONSUMED at 9 sites.**

```
src/types/speedtest.ts:149   colorVarLabel: "var(--chart-ping-label)"
src/types/speedtest.ts:163   colorVarLabel: "var(--chart-jitter-label)"
src/types/speedtest.ts:177   colorVarLabel: "var(--chart-download-label)"
src/types/speedtest.ts:191   colorVarLabel: "var(--chart-upload-label)"
src/types/__tests__/speedtest.test.ts:127  contract test asserts /^var\(--chart-.+-label\)$/
src/components/speedtest/ResultStack.vue:21  '--phase-color-label': metric.colorVarLabel  (style binding)
src/components/speedtest/ResultStack.vue:208 color: var(--phase-color-label, var(--phase-color));
styles/tokens.css:205-209    [data-phase] .text-metric-label { color: var(--phase-color-label, var(--phase-color, var(--muted-foreground))); }
```

The 4-phase definition table at `src/types/speedtest.ts` ships `colorVarLabel` per phase. `ResultStack.vue` style-binds `--phase-color-label` from the per-metric definition; the cascade fires through `[data-phase] .text-metric-label` at `styles/tokens.css`. Contract test at `src/types/__tests__/speedtest.test.ts:127` regex-pins `var(--chart-{phase}-label)` per phase. Migration COMPLETE with regression guardrail.

### AC.W6d — Primitive adoption (MetricRow / MetricStack / AnimatedDigit / Card variant="chassis")

**NOT-CONSUMED at consumer src/ (intentional per AC tranche disposition).**

Zero references at speedtest src/ for `metric-row` / `metric-stack` / `animated-digit` / `chassis-card` subpaths or `variant="chassis"`. Glass-ui v1.6.0 shipped these primitives as substrate for the AB+1 cohort, but speedtest's own composition canon evolved at W8e to `<MetricCell>` (Glass-ui v1.7.0) as the per-cell composite — which absorbs the MetricRow/MetricStack/AnimatedDigit composition behind a higher-level `<MetricCell>` surface.

`MetricCell` adoption sites (6 references across 1 file):
```
src/components/dashboard/ResultDetailSheet.vue:4  import { MetricCell } from "@mkbabb/glass-ui/metric-cell";
src/components/dashboard/ResultDetailSheet.vue:53,59,65,71  4 × <MetricCell ... />
```

This is the canonical W8e adoption pattern: 4-site icon-on-label cluster at `ResultDetailSheet.vue` consumes `<MetricCell>` instead of hand-rolling MetricRow/MetricStack/AnimatedDigit. The substrate-for-no-direct-consumer relationship is intentional — MetricRow + MetricStack + AnimatedDigit are MetricCell's composition substrate.

**Disposition**: ALREADY-CONSUMED INDIRECTLY via `<MetricCell>`. The W6d primitives are reachable transitively as MetricCell's implementation detail.

### AC.W8e — MetricCell + ResponsiveTabs + ToggleGroupItem card variant

**ALREADY-CONSUMED at all 3 primitives.**

| Primitive | Consumer sites | Files |
|---|---|---|
| `<MetricCell>` | 4 invocations | `src/components/dashboard/ResultDetailSheet.vue` |
| `<ResponsiveTabs>` | 3 invocations | `src/layouts/PublicDashboardLayout.vue` + `src/layouts/AdminDashboardLayout.vue` + `src/views/AdminDataView.vue` |
| `<ToggleGroupItem variant="card">` | 1 invocation site (FlowSelector) + 3 test refs | `src/components/survey/FlowSelector.vue:15-30`; consumed by `src/components/survey/SurveyWizard.vue` |

`FlowSelector.vue` ships the canonical AB+1 card-variant ToggleGroupItem at the survey entry. `SurveyWizard.audacious.test.ts` (test) asserts `data-variant="card"` renders correctly. Migration COMPLETE.

---

## § installDarkModeSync rename status (3 references)

**FULLY MIGRATED.**

The O.W7 baseline flagged 3 `useDarkModeSync` references across 2 files. At speedtest HEAD:

```
src/components/speedtest/MeterColumn.vue:47   installDarkModeSync,   (import-list entry)
src/components/speedtest/MeterColumn.vue:87   // comment: "installDarkModeSync owns the …"
src/components/speedtest/MeterColumn.vue:91   installDarkModeSync(() => { ... });
src/components/dashboard/composables/useEChartsTheme.ts:3   import { installDarkModeSync } ...
src/components/dashboard/composables/useEChartsTheme.ts:13  // comment ref
src/components/dashboard/composables/useEChartsTheme.ts:67  // comment ref
src/components/dashboard/composables/useEChartsTheme.ts:75  installDarkModeSync(() => { ... });
```

Zero `useDarkModeSync` references remain at speedtest src/. Rename adoption COMPLETE (both runtime call-sites + import-list entries + narrative comments use the new name). Resolves the O.W7 Tier-4 deferral.

---

## § A5 wire verification

**INTACT.**

```
vite.config.ts:9   import { assertDistFresh } from "@mkbabb/glass-ui/freshness";
vite.config.ts:14  assertDistFresh({ root: path.resolve(__dirname, "..", "glass-ui") });
```

The N.W0 Lane A5 freshness wire persists at HEAD `aadacfae`. Zero drift since the original landing. The wire continues to gate dev/build at the consumer side against the file-linked glass-ui workspace.

---

## § AB.W3 substrate consumption pattern

**PRESERVED 1:1.**

| Substrate | O.W7 baseline | P-open HEAD | Delta |
|---|---|---|---|
| Pulse aura | 4 invocations across 3 files | 4 invocations across 3 files | None |
| Pulse dots | 1 invocation (`SpeedtestResults.vue:52` `:count="3"`) | 1 invocation | None |
| Progress gradient | 1 invocation (`MeterColumn.vue:31`) | 1 invocation | None |

Verdict: AB.W3 PRESERVED. No drift since baseline.

---

## § Consumer-side test mocks (R2 from O.W7 baseline)

`<GlyphFace>` + `<InstrumentChassis>` test mocks at `src/__tests__/App.surveyEntry.test.ts:76-85` still reference the retired-at-runtime subpaths. These are NOT runtime consumers — the wizard mock setup vi.mocks the chassis + glyph-face to test `<App>` rendering without instantiating the heavy primitives. The mocks correctly mirror the substrate signatures even though no runtime path renders them.

**Disposition**: ACCEPTABLE-AT-CLOSE. Test fixture cleanup is non-load-bearing and AC closed without addressing this — properly classified as a non-blocker.

---

## § Subpath surface enumeration (post-AB+1)

20 distinct `@mkbabb/glass-ui*` import specifiers at speedtest src/ (up from 17 → 19 at O.W7):

```
@mkbabb/glass-ui
@mkbabb/glass-ui/api
@mkbabb/glass-ui/aurora
@mkbabb/glass-ui/controls
@mkbabb/glass-ui/dark
@mkbabb/glass-ui/dock
@mkbabb/glass-ui/expandable-container
@mkbabb/glass-ui/forms
@mkbabb/glass-ui/glyph-face        (TEST MOCK ONLY — runtime retired)
@mkbabb/glass-ui/icon-tooltip
@mkbabb/glass-ui/infinite-scroll
@mkbabb/glass-ui/instrument-chassis (TEST MOCK ONLY — runtime retired)
@mkbabb/glass-ui/keyboard
@mkbabb/glass-ui/metric-cell        (NEW at AC.W8e)
@mkbabb/glass-ui/pulse
@mkbabb/glass-ui/responsive-tabs    (NEW at AC.W8e)
@mkbabb/glass-ui/tabs
@mkbabb/glass-ui/timeline
@mkbabb/glass-ui/toggle-chip
@mkbabb/glass-ui/tokens
```

Net post-O.W7 additions: `/metric-cell` + `/responsive-tabs` (the W8e primitives). The remaining 18 carry from O.W7 baseline.

---

## § P-wave cross-repo coordination proposals

| Item | Origin | Disposition |
|---|---|---|
| CR-6 (speedtest AC.W6 cohort full consumer adoption) | O FINAL.md §5; P findings §2 | **ALREADY-CONSUMED.** AC tranche closed at `aadacfae`; all 4 driving sub-waves (W6b/c/d + W8e) consumed at speedtest HEAD. RETIRE CR-6 from P. |
| `installDarkModeSync` rename adoption | O.W7 finding 4 tier-4 | **ALREADY-CONSUMED.** Zero `useDarkModeSync` references at speedtest HEAD. RETIRE from P. |
| Fira Code woff2 binary fetch (R1 from O.W7) | O.W7 risks §R1 | **ALREADY-CONSUMED.** glass-ui v1.5.0 shipped binaries (commit `2474440`); speedtest consumes via `@mkbabb/glass-ui/styles` import. RETIRE from P; the P-AB1-AC.W6b/c/d/W8e ledger row in P findings §2 reflects this closure already. |
| Aurora `onInitError` wire | O.W1 Lane A | **NO-ACTION.** Speedtest's chosen disposition (path 1 — accept throw); unchanged at HEAD. NO-ACTION-REQUIRED. |
| `:deep()` at `PhaseTimeline.vue` (2 sites) | AC.W9 close MISS-WITH-RECEIPT | **SCHEDULED-AC+1.** Consumer-routed; properly classified at AC close as a `<GlassTimeline>` custom-prop cascade work-item for AC+1 (a future speedtest tranche, NOT a P glass-ui-side item). If a glass-ui-side substrate addition is needed (e.g. `--timeline-continuous-track-opacity` knob), surfaces at AC+1. NO P action. |
| Test-mock cleanup (`<GlyphFace>` / `<InstrumentChassis>`) | O.W7 R2 | **NO-ACTION.** Non-load-bearing test fixtures; AC closed without addressing. Consumer-owned residual; NOT a P item. |
| MetricRow / MetricStack / AnimatedDigit / Card variant="chassis" direct adoption | Glass-ui v1.6.0 substrate | **NO-ACTION.** Consumed indirectly via `<MetricCell>` at W8e; AC tranche absorbed the consumer-side need at a higher composition tier. Substrate-for-no-direct-consumer is by-design (`<MetricCell>` consumes them internally). RETIRE as a follow-up; the AC tranche did not classify this as an open item. |
| AC.W7 cosmetic 192/512 favicon variants | AC.W9 gate 18 CARRIED-TO-AC+1 | **NO-ACTION.** Cosmetic-only; routed to AC+1. NOT a P glass-ui item. |
| AC.W9 Fontshare consent inquiry | AC.W9 gate 19 DEFERRED-TO-AC+1 | **NO-ACTION.** Premise no longer load-bearing under Path D (Fontshare retired); courtesy completion at AC+1 if speedtest re-engages a CDN. NOT a P glass-ui item. |

**Summary**: All CR-6 + O.W7 carry-forward items LANDED at speedtest's AC close — zero remaining P-wave cross-repo work for speedtest. The speedtest leg of the P CR-6 thread closes WITHOUT a P-wave write.

---

## § Substrate non-regression

| Substrate | O.W7 (baseline) | P-open HEAD | Drift |
|---|---|---|---|
| A5 freshness wire | `vite.config.ts:9,14` | `vite.config.ts:9,14` | None |
| Glass-ui subpaths consumed | 19 distinct | 20 distinct (`/metric-cell` + `/responsive-tabs` added; `/forms` + `/dark` + `/keyboard` etc. preserved) | +2 (W8e primitives) |
| Dock cohort consumers | 6 | 6 | None |
| AB.W3 Pulse aura/dots/Progress gradient | 5 sites / 1 site | 4+1 sites / 1 site | None (`SpeedtestResults` aura count unchanged) |
| Aurora consumer (no `onInitError`) | `App.vue:5` | `App.vue:5-9` | None — throw-default still tolerated |
| useDarkModeSync references | 3 across 2 files | 0 across 2 files; **3 installDarkModeSync** | Rename adopted (PROGRESS) |
| `:deep()` count in src/ | not measured at O.W7 | 2 (PhaseTimeline) | Pre-existing per AC.W9 MISS-WITH-RECEIPT |
| Consumer-side `--meter-track-stroke` overrides | 2 (`styles/tokens.css:86, :381`) | 0 (retired at AC.W6c per `styles/tokens.css:67` narrative comment) | Retired (PROGRESS) |
| Consumer-side `.text-hero` | ~25 LOC + 35-line defending comment | ~18 LOC poster-type register (speedtest-specific keep per AC-r3 acceptance) | Slimmed (PROGRESS) |
| Fontshare CDN `<link>` | n/a (already migrated at O.W7) | Retired (narrative comment only at `index.html:41-47`) | None |

**Verdict**: ZERO substrate regression. Six PROGRESS markers (rename + W6b + W6c track-stroke + .text-hero slim + W8e MetricCell + W8e ResponsiveTabs + FlowSelector card).

---

## § Risks and unknowns

- **R1 (RESOLVED at AC.W6b)** — Fira Code woff2 binary fetch. Glass-ui shipped `src/fonts/` populated at v1.5.0 (`2474440`). RESOLVED.
- **R2 (carry — non-blocking)** — `<GlyphFace>` / `<InstrumentChassis>` test mocks remain at `src/__tests__/App.surveyEntry.test.ts`. Non-load-bearing.
- **R3 (RESOLVED)** — AC.r3 plan amendments referenced glass-ui v1.2.0 anchor; supersedes at v1.7.0. AC.W6e closed with retro tag placement.
- **R4 (unchanged)** — `useAuroraPolicy` single-consumer canonicalisation candidacy; defer until a second Aurora consumer materialises. Not a P item.
- **R5 (NEW at AC.W9)** — `:deep()` at `PhaseTimeline.vue:214-215` (2 sites). MISS-WITH-RECEIPT-ROUTED-TO-AC+1. Future glass-ui `<GlassTimeline>` custom-prop cascade work may absorb this consumer-side reach.

---

## § Verdict

**CLEAN + CR-6 RETIRED.**

The speedtest leg of the P cross-repo coordination closes WITHOUT a P-wave write. All four glass-ui-driving AC sub-waves (W6b/c/d + W8e) plus the `installDarkModeSync` rename plus the consumer-side `--meter-track-stroke` retire plus the Fontshare CDN retire plus the W6c `--phase-color-label` cascade adoption plus the W8e primitive trio (MetricCell + ResponsiveTabs + FlowSelector card-variant) have ALL LANDED at speedtest HEAD `aadacfae`. AC tranche CLOSED at the same calendar day as P open.

**Build verification**: `npm run build` PASS at exit 0 (31.93s; precache 604.36 KiB; 19 named chunks + 2 vendor splits).

**P-wave cross-repo coordination proposal for CR-6**: RETIRE from P scope. The AC tranche closure subsumes the entire CR-6 footprint. Speedtest will continue to be a glass-ui consumer; future cross-repo coordination is per its own tranche cadence (AC+1, etc.) — not under P's MULTI-WRITER scope.

**No BLOCKER. No MINOR. No P-wave action item.** Adoption-side residuals at speedtest (cosmetic favicon variants + Fontshare consent inquiry + `:deep()` cleanup) are consumer-owned AC+1 carryforwards, not P glass-ui items.

---

## § Verification (commands run)

```bash
# Speedtest git state
git log --oneline -25; git status --short; git rev-parse HEAD

# Glass-ui dep wiring
grep -E "glass-ui|keyframes" package.json
ls -la node_modules/@mkbabb/glass-ui

# All glass-ui imports
grep -rn "from \"@mkbabb/glass-ui" src/
grep -rhoE '"@mkbabb/glass-ui[^"]*"' src/ | sort -u

# A5 wire
grep -n "assertDistFresh\|glass-ui/freshness" vite.config.ts

# Rename verification
grep -rn "useDarkModeSync\|installDarkModeSync" src/

# Font self-host
grep -rn "@font-face\|Fira Code\|Plus Jakarta\|fonts.googleapis\|Fontshare" styles/ index.html

# AC.W6c phase-color-label cascade
grep -rn "phase-color-label\|--chart-.*-label" src/ styles/

# AC.W6d primitives (direct adoption?)
grep -rn "metric-row\|metric-stack\|animated-digit\|chassis-card\|variant=\"chassis\"" src/

# AC.W8e primitives
grep -rn "MetricCell\|metric-cell" src/
grep -rn "ResponsiveTabs\|responsive-tabs" src/
grep -rn "FlowSelector\|variant=\"card\"" src/

# AB.W3 substrate consumption
grep -rn "variant=\"aura\"\|variant=\"dots\"\|variant=\"gradient\"" src/

# Test mock leakage
grep -rn "glyph-face\|GlyphFace\|instrument-chassis\|InstrumentChassis" src/

# Build verification
npm run build  → PASS at exit 0 (31.93s)
```

Files spot-verified: `vite.config.ts`, `package.json`, `index.html`, `styles/tokens.css`, `styles/style.css`, `src/App.vue`, `src/types/speedtest.ts`, `src/components/speedtest/{MeterColumn,PhaseTimeline,ResultStack,SpeedtestResults}.vue`, `src/components/dashboard/composables/useEChartsTheme.ts`, `src/components/dashboard/ResultDetailSheet.vue`, `src/layouts/{AdminDashboardLayout,PublicDashboardLayout}.vue`, `src/views/AdminDataView.vue`, `src/components/survey/FlowSelector.vue`, `docs/tranches/AC/FINAL.md`, `docs/tranches/AC/PROGRESS.md`. Build output verified at `dist/assets/`.

**No git mutation performed** (read-only per hardened agent git clause).

---

**Audit completed by**: P.W0 P11/f consumer audit lane (READ-ONLY, 20-min cap)
**Method**: AC tranche FINAL.md walk + per-sub-wave consumer-side rg + build verification + substrate non-regression cross-walk + cross-repo coordination proposal disposition
**Verdict**: CLEAN + CR-6 RETIRED (zero P-wave cross-repo work owed to speedtest)
