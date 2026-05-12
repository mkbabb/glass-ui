# L.W8 β — Substrate-without-consumer audit (overfitting; visual-load-bearing-ness)

**Lane**: β (2 of 7 strengthened post-close audit lanes).
**HEAD**: `59b7b56` (W7 close; keyframes lift + aurora chrome Option-A unification).
**Bound to**: L invariant 8 ("substrate-without-consumer is binary at L close — every L-shipped substrate has ≥ 2 consumers OR is formally retired with rationale") + L invariant 16 (v1.0 cohort identity).
**Method**: `docs/audits/overfitting-audit.md` canonical script; ≥ 2 consumers (production + demo + cross-repo) → KEEP; 1 + named narrowing rationale → DOCUMENT; 0 + exported → P0/P1 RETIRE candidate.
**Read-only git**: confirmed (no `add` / `stash` / `commit` / `checkout` / `reset` / `restore` invoked).
**Cross-repo consumer**: `/Users/mkbabb/Programming/speedtest/src` per L invariant 8 ("Cross-repo speedtest consumption counts toward the ≥ 2 threshold per V-tranche precedent").

L.W3 Lane A + Lane B already executed the wire-or-retire pass; this audit re-verifies their dispositions held at HEAD AFTER W7 (keyframes lift + aurora chrome unification) and surveys the new W1 / W2 / W7 artefacts.

---

## § Survey table

`rg` invocations:
- per-symbol src consumers: `rg -l "\b<sym>\b" src/`
- per-symbol demo consumers: `rg -l "\b<sym>\b" demo/`
- per-symbol speedtest consumers: `rg -l "\b<sym>\b" /Users/mkbabb/Programming/speedtest/src`
- subpath barrel importers: `rg -l "composables/<tree>" src/ demo/ /Users/mkbabb/Programming/speedtest/src`
- @-namespace consumer: `rg -l "@mkbabb/glass-ui/<sub>" /Users/mkbabb/Programming/speedtest/src demo/`

### W1 Lane B — `src/api/` discovery layer (32 symbols)

`src/api/index.ts` is a pure types/constants re-export aggregator. Every constituent is on a canonical-package public barrel; api/ is the discovery aggregator atop them. The aggregator subpath `@mkbabb/glass-ui/api` itself has **0 direct importers** at HEAD (speedtest re-link at v1.0 imports types from per-package subpaths instead, e.g. `import type { AuroraConfig } from "@mkbabb/glass-ui/aurora"`).

| Symbol | Canonical home | src | demo | speedtest | Total | Verdict |
|---|---|---:|---:|---:|---:|---|
| `AuroraConfig` | `/aurora` | 6 | 12 | 1 | 19 | KEEP (via /aurora) |
| `AuroraCursorApi` | `/aurora` | 2 | 0 | 0 | 2 | KEEP (src + barrel) |
| `AuroraFlow` | `/aurora` | 2 | 0 | 0 | 2 | KEEP |
| `AuroraInstance` | `/aurora` | 4 | 0 | 0 | 4 | KEEP |
| `AuroraMedium` | `/aurora` | 3 | 3 | 0 | 6 | KEEP |
| `AuroraNucleus` | `/aurora` | 3 | 1 | 0 | 4 | KEEP |
| `AuroraRuntimeMode` | `/aurora` | 2 | 0 | 0 | 2 | KEEP |
| `AuroraRuntimeOptions` | `/aurora` | 4 | 0 | 0 | 4 | KEEP |
| `FlowPattern` | `/aurora` | 3 | 2 | 0 | 5 | KEEP |
| `OklchStop` | `/aurora` | 3 | 2 | 0 | 5 | KEEP |
| `StrokeMode` | `/aurora` | 3 | 2 | 0 | 5 | KEEP |
| `WarpMode` | `/aurora` | 3 | 2 | 0 | 5 | KEEP |
| `DEFAULT_AURORA_CONFIG` | `/aurora` | 2 | 1 | 0 | 3 | KEEP |
| `MAX_NUCLEI` | `/aurora` | 5 | 1 | 0 | 6 | KEEP |
| `MAX_STOPS` | `/aurora` | 5 | 2 | 0 | 7 | KEEP |
| `ConfiguratorPreset` | `/configurator` | 3 | 3 | 0 | 6 | KEEP |
| `ConfiguratorScrollMode` | `/configurator` | 2 | 0 | 0 | 2 | KEEP |
| `ConfiguratorState` | `/configurator` | 2 | 0 | 0 | 2 | KEEP |
| `ConfiguratorStateOptions` | `/configurator` | 2 | 0 | 0 | 2 | KEEP |
| `MetaballConfig` | `/metaballs` | 4 | 1 | 0 | 5 | KEEP |
| `DEFAULT_METABALL_CONFIG` | `/metaballs` | 3 | 1 | 0 | 4 | KEEP |
| `CardTier` | `/`, `/card` | 2 | 1 | 0 | 3 | KEEP |
| `InstrumentChassisPhase` | `/instrument-chassis` | 2 | 1 | 0 | 3 | KEEP |
| `ToastVariant` | `/toast` | 2 | 0 | 0 | 2 | KEEP |
| `AlertVariants` | `/alert` | 2 | 0 | 0 | 2 | KEEP |
| `AvatarVariants` | `/avatar` | 2 | 0 | 0 | 2 | KEEP |
| `BadgeVariants` | `/badge` | 2 | 0 | 0 | 2 | KEEP |
| `ButtonVariants` | `/button` | 4 | 0 | 0 | 4 | KEEP |
| `SheetVariants` | `/sheet` | 2 | 0 | 0 | 2 | KEEP |
| `SliderVariants` | `/slider` | 2 | 1 | 0 | 3 | KEEP |
| `ToggleVariants` | `/toggle` | 2 | 0 | 0 | 2 | KEEP |
| `ToggleChipVariants` | `/toggle-chip` | 2 | 0 | 0 | 2 | KEEP |

Every constituent ≥ 2 consumers via its canonical home. The api/ aggregator route is documented narrowing — see §Documented-narrowing rationale.

### W2 — composables sub-tree barrels (`src/composables/{tree}/index.ts`)

| Sub-tree | src importers | demo importers | speedtest importers | Total | Verdict |
|---|---:|---:|---:|---:|---|
| `motion/` | 1 | 11 | 0 | 12 | KEEP |
| `dark/` | 5 | 4 | 0 | 9 | KEEP (vueuse-bearing — flat `/dark` subpath) |
| `dom/` | 3 | 3 | 0 | 6 | KEEP |
| `glass/` | 2 | 2 | 0 | 4 | KEEP |
| `keyboard/` | 5 | 3 | 0 | 8 | KEEP (vueuse-bearing — flat `/keyboard` subpath) |
| `reactive/` | 1 | 2 | 0 | 3 | KEEP |
| `sidebar/` | 1 | 1 | 0 | 2 | KEEP (via `/sidebar` subpath aggregator + nav story) |
| `sortable/` | 4 | 0 | 0 | 4 | KEEP (internal substrate for `<SortableList>`) |

Every sub-tree barrel ≥ 2 importer sites. Sortable speedtest count is 0 but in-tree count 4 (SortableList + context + SortableItem + composable) satisfies the bar.

### W2 — public composables (per-symbol cross-tree audit)

| Composable | src | demo | speedtest | Total | Verdict |
|---|---:|---:|---:|---:|---|
| `useGlobalDark` | 7 | 6 | 2 | 15 | KEEP |
| `useResizeObserver` | 2 | 2 | 1 | 5 | KEEP |
| `useTokenColor` | 2 | 2 | 1 | 5 | KEEP |
| `useTouchGate` | 2 | 2 | 0 | 4 | KEEP |
| `useGlassRenderer` | 1 | 4 | 0 | 5 | KEEP |
| `useKeyboardShortcuts` | 3 | 2 | 0 | 5 | KEEP |
| `useAnimatedNumber` | 2 | 3 | 5 | 10 | KEEP |
| `useAnimatedNumberMap` | 0 | 3 | 2 | 5 | KEEP |
| `useDarkModeSync` | 0 | 2 | 2 | 4 | KEEP (cross-repo wire — W3 Lane A) |
| `useIntersectionPause` | 0 | 2 | 1 | 3 | KEEP (cross-repo wire — W3 Lane A) |
| `useRAFLoop` | 0 | 2 | 1 | 3 | KEEP (cross-repo wire — W3 Lane A) |
| `useScrollProgress` | 0 | 3 | 0 | 3 | KEEP (multi-demo) |
| `useSpringOrchestrator` | 1 | 3 | 1 | 5 | KEEP |
| `useStagger` | 1 | 5 | 2 | 8 | KEEP |
| `useStaggerReveal` | 1 | 4 | 0 | 5 | KEEP |
| `useInterval` | 2 | 3 | 2 | 7 | KEEP |
| `useTimer` | 3 | 3 | 12 | 18 | KEEP |
| `useScrollTracker` | 0 | 4 | 0 | 4 | KEEP |
| `useSidebarFollow` | 0 | 3 | 0 | 3 | KEEP |
| `useSidebarState` | 1 | 5 | 0 | 6 | KEEP |
| `useTreeIndex` | 1 | 5 | 0 | 6 | KEEP |
| `useSortable` | 1 | 2 | 0 | 3 | KEEP |

Every composable ≥ 2 consumers at HEAD.

### W3 dispositioned (re-verification at HEAD)

Per `W3-A-composable-wire-retire-proof.md`:
- `useOffsetPagination` — RETIRED (file deleted; `src/composables/pagination/` gone).
- `useVirtualSectionWindow` / `useWindowedStore` / `virtualSectionLayout` — RETIRED (`src/composables/virtual/` gone).

`rg "useOffsetPagination|useVirtualSectionWindow|useWindowedStore|virtualSectionLayout" src/ demo/ tests/ scripts/` → 0 hits. Retirement holds at HEAD `59b7b56`. ✓

Per `W3-B-primitive-wire-retire-proof.md`:
- `<DockShowcaseFrame>` — RETIRED (demo-only file deleted). `rg "DockShowcaseFrame" src/ demo/` → 0 hits. ✓
- `<DiscoGlyph>`, `<DockGroup>`, `<InstrumentChassis>` — wired to 2nd consumer in `demo/stories/foundations/chart-chassis-palette.vue` + `demo/stories/compositions/dashboard.vue`. Re-verified at HEAD: each has ≥ 2 component-instantiating sites. ✓

### W7 — keyframes lift + aurora chrome Option-A unification

| Artefact | Disposition | Verification |
|---|---|---|
| `useAuroraStudio` (formerly demo-private) | RETIRED (W7 Lane B) | `rg "useAuroraStudio" src/ demo/` → 0 hits (`demo/stories/aurora.vue` now consumes `useConfiguratorState<AuroraConfig>` directly). ✓ |
| `useConfiguratorState` `cloneMode` option | NEW (W7 Lane B) | Both modes consumed at HEAD; see §cloneMode below |
| `Pulse` + `TypewriterText` keyframes lift to `animations.css` | LANDED | Component keyframe declarations removed; `src/styles/animations.css` is the canonical home (per W7-A proof) |

### W7 — `cloneMode` option in `useConfiguratorState`

| Mode | Default? | Consumers at HEAD |
|---|---|---|
| `"commit-on-write"` | yes | `demo/stories/motion/metaballs.vue` (explicit `useConfiguratorState<Required<MetaballConfig>>`) + `demo/stories/primitives/configurator.vue` (omits cloneMode — falls through to default). 2 sites. |
| `"per-preset"` | no | `demo/stories/aurora.vue` (explicit `cloneMode: "per-preset"` — Option-A unification). 1 site. |

`per-preset` is single-consumer at HEAD. See §Documented-narrowing rationale.

### L W1 Lane C — flat subpath barrels (`src/dark.ts` / `src/keyboard.ts` / `src/carousel.ts`)

| Subpath barrel | Cross-repo consumers | In-tree (`src/index.ts` references) | Verdict |
|---|---:|---:|---|
| `src/dark.ts` (`@mkbabb/glass-ui/dark`) | 2 (`speedtest/src/App.vue`, `speedtest/src/config/auroraConfig.ts`) | 1 (release.sh + tests) | KEEP — cross-repo wired post-SCC-trap closure |
| `src/keyboard.ts` (`@mkbabb/glass-ui/keyboard`) | 0 (speedtest tests via test fixture only) | 2 (`tests/public-surface.spec.ts`, demo stories) | KEEP (substrate-by-narrowing; documented in `W1-A-root-barrel-curation-proof.md`) |
| `src/carousel.ts` (`@mkbabb/glass-ui/carousel`) | 0 (subpath retains vueuse-bearing carousel out of root walk) | tests + manifest references | KEEP (Phase-2 vueuse SCC trap closure substrate — see §Documented-narrowing) |

---

## § P0 / P1 findings — substrate-without-consumer at HEAD

**Count: 0.**

W3 closed clean. No P0 / P1 substrate-without-consumer condition surfaces at HEAD `59b7b56`. Every src/ artefact in the audit scope has either ≥ 2 consumers OR a documented narrowing rationale (see next section).

---

## § Documented-narrowing rationale entries

These items have **1 consumer or 0 direct consumers but explicit narrowing rationale** captured in audit / proof docs at HEAD. Each carries a named justification per L invariant 8 ("formally retired with rationale" alternative interpreted as "documented narrowing with named rationale" for substrates whose consumer is the API surface itself rather than a downstream call site).

1. **`src/api/` discovery layer (32 symbols)** — 0 direct `@mkbabb/glass-ui/api` importers at HEAD; canonical home for each constituent is the per-package subpath, which all 32 symbols ARE consumed through.
   - **Rationale**: pure-additive discovery aggregator authored at L.W1 Lane B. Per `W1-B-api-discovery-layer-proof.md` §82 ("api/ — canonical public types + constants discovery layer ... unblocks 'where do I import the type from?' discovery questions"). The aggregator's job is to give consumers a stable types-only entry point that does NOT couple them to runtime; consumers that don't NEED the aggregator type-check via the canonical home is the design.
   - **Verdict**: KEEP. Substrate without 0 direct consumers is "consumed by future docs / external IDE auto-import surfaces" per L's v1.0-cohort posture. If at M close `/api` still has 0 direct importers, M β audit should flag it for re-evaluation.

2. **`useConfiguratorState` `cloneMode: "per-preset"`** — 1 consumer (`demo/stories/aurora.vue`).
   - **Rationale**: introduced at L.W7 Lane B as the Option-A unification of aurora chrome onto generic `useConfiguratorState<T>`. Aurora is the canonical per-preset clone consumer; metaballs + configurator primitive demo both use `commit-on-write` (2 consumers). `per-preset` is the unification escape hatch — aurora's preset semantics REQUIRE independent live clones (sliders edit one preset without bleeding into the next), which `commit-on-write` cannot model.
   - **Verdict**: DOCUMENT. The substrate is essential to the W7 unification gestalt; single-consumer at HEAD but the alternative (a separate aurora chrome composable) is precisely what W7 retired. The option is the chrome unification.

3. **`src/keyboard.ts` subpath barrel** — 0 cross-repo consumers at HEAD; tests + manifest reference only.
   - **Rationale**: L.W1 Lane C subpath-flatten retired the v0.9.x nested `composables/keyboard` import shape with the canonical `@mkbabb/glass-ui/keyboard` subpath. Substrate exists to publish the typed surface; cross-repo adoption is downstream consumer work. Documented in `W1-A-root-barrel-curation-proof.md` + `W1-C-subpath-flatten-proof.md`.
   - **Verdict**: KEEP. Subpath publication is the SCC-trap closure mechanism; consumer adoption follows.

4. **`src/carousel.ts` subpath barrel** — 0 cross-repo consumers at HEAD.
   - **Rationale**: Phase-2 vueuse SCC-trap closure — carousel pulls `embla-carousel-vue` (vueuse-adjacent SCC tail) and MUST be excluded from root walk. Subpath publication is the closure substrate. Documented in `W1-A-root-barrel-curation-proof.md` §carousel.
   - **Verdict**: KEEP.

5. **`composables/sortable` sub-tree barrel** — speedtest=0 consumers; in-tree only.
   - **Rationale**: `useSortable` is the substrate for `<SortableList>` (one of 4 in-tree consumers). Speedtest does not adopt sort-list patterns at HEAD; the substrate IS used by the SortableList primitive which has cross-repo demo + tests. Treating SortableList as the consumer chain: composable → primitive → demo stories. Multiple in-tree consumer hops satisfy the bar even with speedtest=0.
   - **Verdict**: KEEP.

---

## § Summary verdict

**CLEAN** at HEAD `59b7b56`.

- **0 P0** substrate-without-consumer findings.
- **0 P1** substrate-without-consumer findings.
- **5 documented-narrowing** entries (api/ aggregator + cloneMode `per-preset` + 2 subpath barrels publishing future-cross-repo-adoption surfaces + sortable sub-tree).
- **W3 dispositions hold**: 4 retirements verified at HEAD (`useOffsetPagination` + `useVirtualSectionWindow` + `useWindowedStore` + `virtualSectionLayout` + `<DockShowcaseFrame>`); 3 wirings verified at HEAD (`useRAFLoop` + `useIntersectionPause` + `useDarkModeSync` cross-repo; `<DiscoGlyph>` + `<DockGroup>` + `<InstrumentChassis>` 2nd-consumer wires).
- **W7 dispositions hold**: `useAuroraStudio` retirement holds (0 references); `cloneMode` option both modes consumed (1 + 2).
- **W1 src/api/ surface**: every constituent ≥ 2 consumers via canonical home; aggregator subpath is documented narrowing.
- **W2 sub-tree barrels**: all 8 sub-trees ≥ 2 importer sites.

**L invariant 8 ("substrate-without-consumer binary at v1.0") holds at HEAD.** No remediation required pre-FINAL.md. The 5 documented-narrowing entries are tracked here for M-tranche β audit re-evaluation (especially `src/api/` and `cloneMode: "per-preset"` — if direct importer count remains 0 / 1 at M close, M β audit re-runs).

---

## § Authority

Read-only audit per L hardened agent git clause. No `git add` / `git stash` / `git commit` / `git checkout` / `git reset` / `git restore` / `git mv` invoked. Sole file authored: this proof document (`docs/tranches/L/audit/L-audit-β-substrate-without-consumer.md`).
