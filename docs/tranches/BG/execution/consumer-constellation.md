# Consumer constellation — the per-consumer 5.0.0 UPDATE plan

Read-only scout over `~/Programming` siblings (foreign-tree fence — zero writes/moves on any tree;
glass-ui authors the plan, the sibling owns its edit). Reconciles the BH B7 `/api`-fold roster
(`docs/tranches/BH/coordination/asks-and-consumes.md`), the GU-3 `--ring` re-point
(`docs/tranches/BG/coordination/GU-3-TRIAGE.md`), GU-1 (`GU-1-glass-key-fill.md`), and BG-WS5's
viz-demigrate against the live import census. Anchors HEAD-validated 2026-06-28, glass-ui on
`tranche/BG` (LOCKED, UN-BUILT — nothing published on the branch).

## Version-line context

| line | state | content |
|---|---|---|
| **4.2.0** | `tranche/BG` HEAD, uncut | the BG convergence |
| 4.3.0 | parked (`release/4.3.0`) | K-I-ROOT-AUTHOR Δ1-6 — publishes FIRST |
| 4.4.0 | queued | GU-1 (`glass-key-fill`) + GU-3 ASK-A (StatusDot custom forced-colors opt-in) |
| **5.0.0** | joint BG/BH major | drop `./api` (203-symbol re-home) **+** `--ring → --focus-ring-color` rename (no alias) **+** viz-demigrate (internal) |

The 5.0.0 cut is the sanctioned break point (no 4.x transition alias — the no-legacy-aliases identity).
Every consume **pins the exact 5.0.0 landing COMMIT at consume-time, not a version number** (BG-build-fenced).

## The 5.0.0 break surface, exactly — three vectors

1. **`./api` drop** (BH §7 / B2.2 `W-api-fold).** The SOLE dropped export key. Its 203 symbols re-home onto
   their owning subpaths (200 pure path-swaps; 3 orphans ADD an export — `Surface`→/card,
   `MenuItemVariants`→/command, `ControlSize`→/forms). Across the whole constellation **exactly 2 repos import
   `/api`** — muster + speedtest. Every other published key is preserved (regen reproduces 96/96; `./api` the
   only intentional drop).
2. **`--ring → --focus-ring-color` rename** (BG-WS10 `W-DESHADCN-TOKEN-REPLACE`; GU-3 ASK-B, no alias).** WS10's
   "EXACTLY ONE consumer" premise counts only glass-ui-internal readers. The real external break is **atlas's 12
   bare `var(--ring)` sites across 11 files** that resolve to nothing the instant the un-aliased rename lands.
   Self-immune / degrading consumers do not break (below).
3. **viz-demigrate** (BG-WS5 M4 `W-VIZ-DEMIGRATE`).** `/fourier-field` + `/constellation` re-author onto
   `useCanvas2D` (WGSL deleted, internal substrate change). **The subpath KEYS are PRESERVED** — no import break;
   the consumer owes only a viz visual re-baseline. The renamed internal subpaths `/canvas`, `/motion-curves`,
   `/fourier-math` have zero live consumers (key unchanged anyway).

**The fourth, latent vector — the pre-4.0.0 stale jump.** Four consumers floor below 4.0.0 (muster 3.1.0,
slides-K 3.2.0, bbnf-buddy 3.9.0, slides 3.13.0-exact). A bump to 5.0.0 crosses the **entire 4.x BA reshape**
FIRST — most cuttingly `BA.W-SURFACE-AXIS`'s Dialog `variant` → `surface` clean break (slides-K's
`DialogContent variant="opaque"` at `DeckGate.vue:41` silently no-ops post-4.0.0), the menu-glass register, the
no-gray ladder. Their 5.0.0 update is a **4.0.0 + 5.0.0 joint migration**, not an incremental bump.

## Consumer classification

**6 live source consumers** (real `@mkbabb/glass-ui/*` imports). **2 dev/peer non-consumers** owe no ask:
- **keyframes.js** — `optionalDependencies: "~4.0.0"`, **zero source imports** (the optional-peer back-edge for
  the circular peer-test; glass-ui depends on keyframes, not the reverse). No 5.0.0 ask.
- **value.js** — `"file:../glass-ui"` dev link, **zero source imports**. The EasingConfigurator `GradientPane`
  consume is a future by-name CONSUME contract, not a live import. No 5.0.0 ask.
- **words/frontend/glass-ui/** — a vendored d6 fork (`package.json name=@mkbabb/glass-ui`), NOT a registry
  consumer (inv-11 lineage). Disposition note, not a roster row.

---

## Per-consumer plans

### 1. muster — STALEST + `/api` break (double exposure)

| field | value |
|---|---|
| pinned / installed | `^3.1.0` floor → **3.1.0 installed** (lockfile pins the floor) |
| gap to 5.0.0 | **2 majors** (4.0.0 BA reshape, 5.0.0) — the widest declared gap in the constellation |
| subpaths (top) | `/button`×14, `/motion`×7, `/configurator`×7, `/status-dot`×6, `/instrument-chassis`×6, `/forms`×6, `/badge`×6, `/number-field`×5, `/progress`×4, `/aurora`×2 + ~20 more; **`/api`×1** |
| symbols (break) | `/api` → `DEFAULT_AURORA_CONFIG`, `AuroraConfig` (`frontend/src/composables/useAuroraConfig.ts:47`) |
| 5.0.0 break impact | **`/api` drop** — re-point to `/aurora` (both symbols re-export from `aurora/index.ts:21,29`). **`--ring` — DEGRADES only** (5 sites, all fallback-bearing: `var(--ring, currentColor)`×4, `var(--ring, var(--primary))`×1). **+ the 4.0.0 BA reshape** (3.1.0 floor): audit Dialog `variant`→`surface`, menu-glass, no-gray. |
| GU asks owed | none (GU-1/GU-3 are atlas's) |
| UPDATE plan | (a) fallback-first re-point `useAuroraConfig.ts:47` `@mkbabb/glass-ui/api` → `/aurora` (`import type` erases — preserves the type-only graph property); (b) `--ring` fallbacks already degrade-safe, optional re-point to `--focus-ring-color`; (c) **run the 4.0.0 MIGRATION.md sweep jointly with 5.0.0**; (d) pin the 5.0.0 landing commit. |
| by-name ask id | **`migrate-api-to-aurora`** (BH B7 row 1) |

### 2. speedtest — `/api` break, incremental

| field | value |
|---|---|
| pinned / installed | `^4.0.1` |
| gap to 5.0.0 | **1 major** (5.0.0) — incremental through 4.1/4.2; the closest-tracking active consumer (202 imports) |
| subpaths (top) | `/button`×17, `/card`×13, `/dom`×11, `/forms`×10, `/motion-core`×7, `/tabs`×6, `/motion`×5, `/aurora`×4, `/instrument-chassis`×4, `/timeline`×1 + ~30 more; **`/api`×1** |
| symbols (break) | `/api` → `TimelineSegment` (type, `src/features/speedtest/ui/PhaseTimeline.vue:52`) |
| 5.0.0 break impact | **`/api` drop** — re-point to `/timeline` (re-exports `timeline/index.ts:3`←`types.ts:26`); `import type` erases, type-only property preserved. **+ the dead build-config string** `vite.config.mjs:1033` `optimizeDeps.include: "@mkbabb/glass-ui/api"`. **`--ring` — DEGRADES only** (`SurveyStep.vue:177,180` use it as the inner fallback of `var(--phase-color, var(--ring))`; `tokens.css:821` is a comment). |
| GU asks owed | none directly; consumes the BB `--phase-complete-color`/`--chart-{phase}` + W-DESKTOP-RESERVE/W-AURORA-SWRASTER successors already named in CLAUDE.md (out of this roster's scope) |
| UPDATE plan | (a) re-point `PhaseTimeline.vue:52` `/api` → `/timeline`; (b) drop `vite.config.mjs:1033`, add `/timeline` to `optimizeDeps.include` (`/aurora` already present); (c) `--ring` fallback-chain is degrade-safe, optional re-point; (d) pin the 5.0.0 commit. |
| by-name ask id | **`migrate-api-to-timeline`** (BH B7 row 2, +the vite-config drop folded in) |

### 3. atlas (sci-report/atlas) — the `--ring` break owner + GU-1/GU-3 home

| field | value |
|---|---|
| pinned / installed | **`4.1.0`** (exact) |
| gap to 5.0.0 | **1 major** (5.0.0) — incremental through 4.2 |
| subpaths (top) | `/dock`×10, `/button`×9, `/toggle-group`×8, `/hover-popover`×5, `/handmark`×5, `/glass-panel`×5, `/status-dot`×4, `/drawer`×3, `/animated-digit`×3, `/constellation`×1, `/dot-flow-field`×1, `/virtual`×1, `/timeline`×1; **`/api`×0** |
| 5.0.0 break impact | **`--ring` rename — 12 BARE sites BREAK** (`GalleryView.vue:847`, `EcfFilter.vue:346`, `FilterDrawerFoot.vue:165,193`, `YearScrubber.vue:158`, `SelectionRegion.vue:156`, `EasterEgg.vue:156`, `GeoChoropleth.vue:468`, `GeoPointLayer.vue:596`, `ReadoutDrill.vue:164`, `VizOptions.vue:406`, `VizFilterDock.vue:409`) + **8 fallback sites DEGRADE** (Dock.vue:889/957/1017, ScrollTimeline:270, BrandMark:116, index.css:74/81, TaxonomyApparatus:447); the vft dashboard sets `--ring` locally — self-immune. **NO `/api` break** (zero `/api` imports). **viz-demigrate** — `/constellation`+`/dot-flow-field` re-render on Canvas2D (visual re-baseline, no import break). **+ the WS2 dock-decompose consume** (Q3/Q4). |
| GU asks owed | **GU-1** (`glass-key-fill`, under-shadow key-light lean) — 4.4.0-line, atlas consumes fallback-first off 4.1.0; **GU-3 ASK-A** (StatusDot custom forced-colors ON-signal opt-in) — 4.4.0-line behind GU-1, atlas retires its `Dock.vue:973-979` `:deep` override onto the prop; **GU-3 ASK-B** (the `--ring` migration row) — the break IS this consumer's; **GU-3 Q1-Q4** confirmed as BG build invariants protecting the atlas dock consume (`.dock-layer--full` class survival, `--dock-selected-accent`/`--dock-control-floor`/`--dock-touch-target` survival). |
| UPDATE plan | (a) **fallback-first** re-point all 12 bare sites `var(--ring)` → `var(--focus-ring-color, var(--ring))` so they resolve on BOTH pre- and post-rename dist, then drop the legacy leg once pinned to the 5.0.0 commit — lands ATOMIC with the cut off the **pinned MIGRATION row** (BH B7 third); (b) re-approve the `/constellation`+`/dot-flow-field` viz baselines post-demigrate; (c) on CAP-SCROLLS publish, **drop `overflow="scroll"`** (`Dock.vue:252`, WS2 retires the union member) — coupled consume, no engine ask; (d) consume GU-1/GU-3-ASK-A fallback-first on the 4.4.0 bump. |
| by-name ask id | **`migrate-ring-to-focus-ring-color`** (BH B7 row 3, the GU-3 ASK-B fold) + `glass-key-fill` (4.4.0) + `GU-DOCK-STATUSDOT-PROPS` (4.4.0) |

### 4. slides — viz re-baseline + the stale jump

| field | value |
|---|---|
| pinned / installed | **`3.13.0`** (exact, no caret — rigidly locked, will not auto-pick 4.x) |
| gap to 5.0.0 | **2 majors** (4.0.0 BA reshape, 5.0.0) |
| subpaths | `/fourier-field`×4, `/deck`×4, `/dock`×2, `/controls`×2, `/constellation`×2, `/color`×2, `/button`×2, `/toggle-group`, `/status-dot`, `/hover-card`, `/forms`, `/dropdown-menu`, `/dialog`; **`/api`×0** |
| 5.0.0 break impact | **viz-demigrate** — `/fourier-field`+`/constellation` keys PRESERVED, re-render on Canvas2D → **visual re-baseline only, no import re-point** (this is BG-WS5's "slides viz-subpath migration" — a visual delta, not a key drop). **No `/api`, no `--ring`** (0 sites). **+ the 4.0.0 BA reshape** (Dialog `variant`→`surface` — `/dialog` consumer; menu-glass; no-gray). |
| GU asks owed | none |
| UPDATE plan | (a) bump `3.13.0` → 5.0.0; (b) **run the 4.0.0 + 5.0.0 MIGRATION.md jointly** (audit `/dialog` variant usage, menu-glass, deck/dock visual deltas); (c) re-approve the fourier-field + constellation viz baselines (BG-WS5 owns the migration, slides re-baselines); (d) pin the 5.0.0 commit. |
| by-name ask id | none (key-preserving; the viz migration is BG-WS5's, slides re-baselines fallback-first) |

### 5. slides-K — STALE, confirmed Dialog-variant break

| field | value |
|---|---|
| pinned / installed | `^3.2.0` floor → **3.2.0 installed** |
| gap to 5.0.0 | **2 majors** (4.0.0 BA reshape, 5.0.0) — widest minor span behind muster |
| subpaths | `/deck`×4, `/dock`×2, `/controls`×2, `/button`×2, `/separator`, `/popover`, `/forms`, `/dialog`; **`/api`×0** |
| 5.0.0 break impact | **the 4.0.0 BA reshape (dominant)** — `DialogContent variant="opaque"` (`DeckGate.vue:41`) **silently no-ops** post-4.0.0 (`BA.W-SURFACE-AXIS` retired Dialog `variant`→`surface`, clean break). **No `/api`, no `--ring`** (0 sites). |
| GU asks owed | none |
| UPDATE plan | (a) bump `^3.2.0` → 5.0.0; (b) **the 4.0.0 sweep is the load-bearing edit** — re-point `DialogContent variant="opaque"` → `surface="opaque"` (+ audit `/button` glass variant, deck/dock visual deltas); (c) pin the 5.0.0 commit. |
| by-name ask id | none (key-preserving; the 4.0.0 Dialog re-point is the consumer's own migration) |

### 6. bbnf-buddy — STALE, but `--ring` self-immune

| field | value |
|---|---|
| pinned / installed | `^3.9.0` floor → **3.9.0 installed** |
| gap to 5.0.0 | **2 majors** (4.0.0 BA reshape, 5.0.0) |
| subpaths | `/dock`×12, `/sortable-list`×3, `/dark`×3, `/toggle-chip`×2, `/tabs`, `/controls`; **`/api`×0** |
| 5.0.0 break impact | **`--ring` — SELF-IMMUNE** (12 bare `var(--ring)` sites, but bbnf defines its OWN `--ring` in `src/styles/preset.css:39,62` light+dark — they resolve against its token, not glass-ui's). **No `/api`** (0 sites). **+ the 4.0.0 BA reshape** (audit `/dock`, `/tabs`, `/toggle-chip` visual + API deltas across the whole 4.x band). |
| GU asks owed | none |
| UPDATE plan | (a) bump `^3.9.0` → 5.0.0; (b) the `--ring` rename is a no-op (own token) — no edit owed; (c) **run the 4.0.0 + 5.0.0 sweep** (dock band saw the most churn 4.0→5.0 — re-baseline `/dock`×12 + `/tabs`); (d) pin the 5.0.0 commit. |
| by-name ask id | none (key-preserving, `--ring` self-immune) |

---

## By-name ask ledger (the relay)

| ask id | repo | line | disposition | lands |
|---|---|---|---|---|
| `migrate-api-to-aurora` | muster | `useAuroraConfig.ts:47` | re-point `/api`→`/aurora` | 5.0.0 (BH B7) |
| `migrate-api-to-timeline` | speedtest | `PhaseTimeline.vue:52` + `vite.config.mjs:1033` | re-point `/api`→`/timeline` + drop optimizer string | 5.0.0 (BH B7) |
| `migrate-ring-to-focus-ring-color` | atlas | 12 bare sites / 11 files | fallback-first re-point off the pinned MIGRATION row, NO alias | 5.0.0 (BH B7, GU-3 ASK-B) |
| `glass-key-fill` | atlas | under-shadow tiers consume | additive Δ-group, fallback-first off 4.1.0 | 4.4.0 (GU-1) |
| `GU-DOCK-STATUSDOT-PROPS` | atlas | retires `Dock.vue:973-979` `:deep` | StatusDot custom forced-colors opt-in | 4.4.0 (GU-3 ASK-A) |
| `drop-overflow-scroll` (consume) | atlas | `Dock.vue:252` | drop `overflow="scroll"` when CAP-SCROLLS publishes | 5.0.0 (WS2 consume, no engine ask) |

## Reconciliation

- **BH B7 roster** (muster→/aurora, speedtest→/timeline) — CONFIRMED live; the only 2 `/api` consumers in the
  constellation (atlas, slides, slides-K, bbnf-buddy all 0). The **third B7 row** (`--ring`, atlas) folds the
  GU-3 ASK-B per the TRIAGE disposition.
- **GU-3 atlas `--ring` re-point** — CONFIRMED: 12 bare + 8 fallback + 1 vft self-immune = 20 total, matching the
  GU-3 census exactly. The "3rd consumer migration" beside the two `/api` asks.
- **BG-WS5 slides viz-subpath migration** — RECONCILED: `/fourier-field`+`/constellation` keys PRESERVED
  (demigrate is internal substrate, not a key drop), so slides owes a **visual re-baseline, not an import
  re-point**. atlas (`/constellation`+`/dot-flow-field`) shares the re-baseline.
- **STALE flag** — muster (3.1.0), slides-K (3.2.0), bbnf-buddy (3.9.0) install BELOW their carets' top 3.x; slides
  is exact-pinned 3.13.0. All four floor pre-4.0.0 → a multi-major jump crossing the BA reshape (slides-K's
  Dialog-variant break is the live witness). speedtest (4.0.1) + atlas (4.1.0) are incremental.

---

**Summary.** 6 live source consumers (muster, speedtest, atlas, slides, slides-K, bbnf-buddy) + 2 dev/peer
non-consumers (keyframes.js, value.js — zero source imports, no ask). The 5.0.0 break surface is narrow: 2
`/api` import re-points (muster, speedtest) + atlas's 12 bare `--ring` sites (every other `--ring` consumer is
self-immune or degrades) + a key-preserving viz re-baseline (slides, atlas) — but 4 pre-4.0.0 consumers ride a
latent 2-major jump across the BA reshape on top. The stalest consumer is **muster at 3.1.0** — the widest gap
AND a `/api` break, the double-exposed update.
