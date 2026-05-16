# O11 Lane a—words/frontend Consumer Deep Audit (round 2)

## Preamble

- **Scope:** `/Users/mkbabb/Programming/words/frontend` (READ-ONLY cross-repo).
- **Consumer HEAD:** `0f16925`—unchanged since M.W1; tree quiescent.
- **glass-ui reference:** v1.1.4 (N close, `37288e0`).
- **Baseline:** N11/a re-run (2026-05-14)—MINOR verdict, 8 drift findings unchanged + 1 new (NotFound.vue 404 glyph).
- **This pass:** Round-2 (post O round-1 backend audit). Angle = idiomatic-use opportunities, gap candidates, round-1 cross-walk, drift delta.

---

## 1. Consumer state at O entry

| Surface | State |
|---|---|
| glass-ui pin | `"@mkbabb/glass-ui": "file:../../glass-ui"` (workspace link → v1.1.4 HEAD) |
| Frontend in-flight commits since 2026-05-13 | **0** (`git log --since=2026-05-12 --oneline` returns single line—the M.W1 migration commit only) |
| `@mkbabb/glass-ui` import LINES | **114** |
| Files importing glass-ui | **87** (sites previously approximated as "60+" in N11/a; spot-verified count = 87) |
| Distinct subpaths consumed | **12**—root, `/dark`, `/forms`, `/controls`, `/dock`, `/sidebar`, `/confirm-dialog`, `/carousel`, `/stacked-icons`, `/tabs`, `/typewriter`, `/styles` |
| Retired-subpath leakage | **0** |
| `useGlobalDark` adoption | YES (App.vue + useStateSync.ts) |
| `useToast` / `toast` | YES (8 import sites) |
| `cn()` | YES (10 import sites) |
| Sidebar composables (`useScrollTracker`, `useSidebarFollow`, `useTreeIndex`, type `TreeNode`) | YES (ProgressiveSidebar.vue + useSidebarState.ts) |
| Subpath shape verdict | v1.0+ canonical; zero migration owed |

**No change vs N11/a baseline at the consumption-shape level.**

---

## 2. Idiomatic-use findings (top 5)

### I1—Local `Card.vue` duplicates glass-ui `Card` primitive

- **Site:** `/Users/mkbabb/Programming/words/frontend/src/components/custom/card/Card.vue` (71 LOC).
- **Evidence:** Line 4—`'card flex flex-col gap-6 rounded-2xl border bg-card py-4 sm:py-6 text-card-foreground relative'`. Identical class shape to glass-ui `Card` (`src/components/ui/card/Card.vue`). Consumer's `Card.vue` adds only an inline texture-system overlay (lines 41-63) which is itself a candidate for migration (see I2).
- **Counter-evidence:** the consumer DOES import glass-ui's `Card` directly in 4 sites (`DefinitionSkeleton.vue:67`, `ThesaurusView.vue:188`, others). So both forms coexist.
- **Recommendation:** Migrate local `Card` consumers (mostly via `ThemedCard.vue` → `Card.vue` chain) to glass-ui `Card`; lift texture layer (I2) into a wrapper or token preset. Eliminates 71 LOC + the entire `useTextureSystem` indirection on the cartoon-card chassis.
- **Severity:** Medium. Aesthetic equivalence is already there; this is a duplication-removal idiom.

### I2—`useTextureSystem` composable parallels glass-ui paper-grain CSS without consuming it

- **Site:** `/Users/mkbabb/Programming/words/frontend/src/composables/useTextureSystem.ts` (149 LOC; 4 consumers in `texture/` + `card/Card.vue`).
- **Evidence:** `rg -n 'paper-grain|paper-underpaint|paper-backdrop' words/frontend/src` returns 0 hits against the glass-ui surface. The local system implements its own `--paper-{aged,clean,...}-texture` CSS-var convention, `backgroundBlendMode: 'multiply'`, etc.—duplicates the substrate that glass-ui already ships at `src/components/custom/paper-backdrop/` + `src/styles/paper.css` (`.paper-underpaint` + `.paper-grain-overlay` utilities).
- **Cross-walk to glass-ui:** glass-ui's paper-backdrop subpath (`@mkbabb/glass-ui/paper-backdrop`) + `paper.css` utilities provide the canonical recipe. Consumer's `useTextureSystem` could collapse into a `<PaperBackdrop variant="aged">` slot wrap.
- **Recommendation:** Migrate `TextureCard`, `TextureBackground`, `TextureOverlay` (341 LOC together) to consume `@mkbabb/glass-ui/paper-backdrop` + `.paper-grain-overlay` utility. The local `--card-texture-*` CSS-vars become preset overrides (per user MEMORY "Presets in consumers").
- **Severity:** High-value cleanup. ~341 LOC + 1 composable retire on the consumer side.

### I3—Local `ProgressiveSidebar.vue` + `WordlistProgressiveSidebar.vue` reimplement glass-ui's `<ProgressiveSidebar>`

- **Sites:** `components/custom/navigation/ProgressiveSidebar.vue` (150 LOC) + `WordlistProgressiveSidebar.vue` (319 LOC).
- **Evidence:** glass-ui ships `ProgressiveSidebar` at `src/components/custom/sidebar/ProgressiveSidebar.vue` (re-exported through `@mkbabb/glass-ui/sidebar`). Consumer files declare **identically named components** but bypass the published one. Consumer DOES import the underlying composables (`useScrollTracker`, `useSidebarFollow`, `useTreeIndex`, `TreeNode`) from `@mkbabb/glass-ui/sidebar`—so the composable layer is already idiomatic.
- **Hypothesis:** The shell components were custom-shaped for words' lookup-vs-wordlist dual modes BEFORE glass-ui's ProgressiveSidebar landed (or because words needs ≥ 1 extension point the published one lacks).
- **Recommendation:** Audit whether words' local `<ProgressiveSidebar>` can subclass the glass-ui one via slots, or whether glass-ui needs a `<ProgressiveSidebarShell>` substrate that exposes more extension points. **This is BOTH an idiomatic-use finding AND a gap candidate (G2 below).**
- **Severity:** High. 469 LOC of consumer code parallels a published primitive.

### I4—Arbitrary `active:scale-[0.95..0.98]` literal idiom (9 sites; 4 distinct values)

- **Sites (rg-verified, 8 in this scan + SidebarWordListItem from baseline):**
  - `WordlistDashboard.vue:112`—`active:scale-[0.98]`
  - `WordlistGrid.vue:10`—`active:scale-[0.98]`
  - `RecentItem.vue:68`—`active:scale-[0.98]`
  - `ReviewQualityButtons.vue:10`—`active:scale-[0.96]`
  - `SearchResults.vue:60`—`active:scale-[0.97]`
  - `SearchResultItem.vue:6`—`active:scale-[0.97]`
  - `LookupControlsPanel.vue:15` + `:48`—`active:scale-[0.95]` (×2)
  - `SidebarWordListItem.vue`—`active:scale-[0.98]` (baseline)
- **Existing glass-ui surface:** `--scale-press-btn` (`0.97`) ships from `tokens.css`. Consumer reaches past it.
- **Cross-walk to backend findings:** This is **O-N-7** (folded from N FINAL.md §5 per O findings.md)—"token-tier proposal: extend the press-scale rung set." Round-1 Rα does NOT touch this; it's a glass-ui substrate proposal that the round-2 consumer audit validates with concrete sites.
- **Recommendation:** Two reads—(a) consumer collapses to `--scale-press-btn` project-wide; (b) glass-ui ships `--scale-press-{xs,sm,md,lg}` ladder. Picking (a) is one-line per site (9 changes); picking (b) requires ≥ 2 consumers to clear L invariant 8 substrate-without-consumer-binary.
- **Severity:** Low-Medium. Project-wide micro-press grammar is intentional; the consumer reads as deliberate fine-tuning.

### I5—`tailwind-merge ^3.5.0` is a stale dep (zero import sites in `src/`)

- **Site:** `package.json:36`—`"tailwind-merge": "^3.5.0"`.
- **Evidence:** `rg -n 'twMerge|tw-merge|from .tailwind-merge.' words/frontend/src` returns **0 hits**. glass-ui v0.9.2 dropped tailwind-merge in favour of `cn()` shipping its own dedup. Consumer migrated to `cn` from glass-ui (10 sites) but never removed the package from deps.
- **Recommendation:** Drop `tailwind-merge` from `dependencies` (consumer-side only—no glass-ui action). Pure cleanup.
- **Severity:** Trivial. Mentioned because the audit MEMORY rule "every artefact has a consumer or is retired" applies to dependency manifests too.

---

## 3. Gap candidates (top 4)

### G1—`BorderShimmer` primitive is reinvented locally (148 LOC SVG perimeter sweep)

- **Site:** `src/components/custom/animation/BorderShimmer.vue` (148 LOC).
- **Evidence:** Local SVG-based perimeter-sweep with `feGaussianBlur` glow, `ResizeObserver`-driven viewBox normalization, `@keyframes border-sweep` with hardcoded `cubic-bezier(0.55,0.12,0.18,1)`. Consumed by `ThemedCard.vue` (line 21). 1 instance of `cubic-bezier(0.55,0.12,0.18,1)` literal cited in N11/a Axis 1 baseline drift.
- **glass-ui parallel:** No equivalent primitive. Closest substrates: `disco-glyph` (3-layer SVG); `animations.css` (`shimmer`, `sparkle-sweep` @keyframes).
- **Gap proposal:** A `<BorderShimmer>` (or `<RingShimmer>`) primitive in glass-ui's animation surface—themed-card decoration is the canonical use-case. Would need ≥ 2 consumers to clear L invariant 8 (currently 1: words). Defer until second consumer surfaces.
- **Severity:** Medium. Single-consumer gap; defer pending second-consumer signal.

### G2—`<ProgressiveSidebar>` substrate needs more extension points

- **Site:** glass-ui `src/components/custom/sidebar/ProgressiveSidebar.vue` vs consumer `WordlistProgressiveSidebar.vue` (319 LOC).
- **Evidence:** Consumer wraps `useTreeIndex` + `useSidebarFollow` from glass-ui (the composables are idiomatic), but the shell component is reinvented. Likely reasons: glass-ui's `ProgressiveSidebar` ships a single shape; consumer needs dual mode (lookup / wordlist) with different section-cluster strategies.
- **Gap proposal:** Audit glass-ui's `ProgressiveSidebar` API surface—does it expose enough slots (`#cluster-header`, `#cluster-item`, `#footer`) to support the consumer's variants? If not, this is **the highest-impact substrate proposal in this audit**—refactor `ProgressiveSidebar` to a slotted shell, OR split it into `<ProgressiveSidebarChassis>` (slot-driven shell) + `<ProgressiveSidebarDefault>` (current behaviour preserved).
- **Cross-walk to round-1 Rγ:** Rγ A1 flagged sidebar domain types absent from `/api` (`SidebarState`, `SidebarSection`, `TreeNode`, `ScrollTrackerOptions`, `TreeIndexEntry`). Consumer DOES `import type { TreeNode } from '@mkbabb/glass-ui/sidebar'` at `useSidebarState.ts:8`—proving the need. Rγ A1 promotion is validated by this audit.
- **Severity:** High. 469 LOC consumer code shadows a published primitive due to insufficient extension surface.

### G3—`useTextureSystem` consumer composable → glass-ui paper-backdrop type/preset surface gap

- **Site:** consumer-side composable `useTextureSystem.ts` + 4 components in `components/custom/texture/`.
- **Evidence:** No `PaperBackdropConfig` type on `/api`. Consumer ships its own `TextureConfig`, `TextureType ('aged'|'clean'|...)`, `TextureIntensity ('subtle'|'medium'|...)` types. The taxonomy is unique to words.
- **Cross-walk to round-1 Rγ:** Rγ §2.3 catalogues the `/api` surface; paper-backdrop has zero `/api` re-exports. If `@mkbabb/glass-ui/paper-backdrop` is to become the canonical home for consumer texture work (per I2), then `PaperBackdropProps` + a `PaperVariant` union belongs on `/api`.
- **Gap proposal:** Promote `PaperBackdropProps` + `PaperVariant` to `/api`. Document the canonical `PaperBackdrop` recipe in CLAUDE.md or MIGRATION.md so future consumers don't re-invent `useTextureSystem`.
- **Severity:** Medium.

### G4—`useToast` is a module-level singleton with no DI surface (Rγ B2 + Rδ §2.4 cite)

- **Site:** glass-ui `src/components/ui/toast/use-toast.ts:44`—module-level `ref<ToasterToast[]>` ; consumer imports `useToast` from `@mkbabb/glass-ui` at 8 sites.
- **Evidence:** Single-app consumer; no multi-Vue-instance issue. The shadcn-vue inherited shape is fine for words today. **HOWEVER**, the consumer has `plugins/toast.ts` (`import { toast } from '@mkbabb/glass-ui'`) AND uses `useToast()` from 8 component sites. Two surfaces for the same registry; mild duplication. Pure observation; no consumer-side problem.
- **Gap proposal (defer):** None for words; Rγ B2 calls this out from the library side. If a second consumer needs multi-app toast, revisit.
- **Severity:** None at words; documentation-only at glass-ui.

---

## 4. Round-1 cross-walk (per-finding impact on words/frontend)

Round-1 returned 6 deliverables. Cross-walked each against the consumer:

| Round-1 finding | Source | Consumer impact |
|---|---|---|
| **F1—Aurora init-error throw** | Rα §3 F1 | **ZERO impact.** `rg -ln 'Aurora\|aurora' words/frontend/src` returns 1 hit—`TimeMachineOverlay.vue` references "TimeMachine" in a doc comment, NOT Aurora. Consumer does NOT import `@mkbabb/glass-ui/aurora` anywhere. The Aurora throw is consumer-invisible. |
| **F2/F3—Shader compile/link throw** | Rα §3 F2-F3 | **ZERO impact.** Consumer doesn't import metaballs OR `@mkbabb/glass-ui/glass` (frost-shader). |
| **F4—Configurator clone fall-through** | Rα §3 F4 | **ZERO impact.** Consumer does NOT consume `Configurator` / `ConfiguratorRow` / `useConfiguratorState`. `rg -ln 'useConfiguratorState\|Configurator'` returns 0 hits across `words/frontend/src`. |
| **F5—Typewriter unreachable bail** | Rα §3 F5 | **ZERO impact.** Consumer imports `TypewriterText` (`AnimatedTitle.vue:11`); the unreachable bail is in `typewriter/utils/keyboard.ts:210`—internal to TypewriterText's pool selection. Throwing instead of silent-bail won't surface in consumer use, but COULD throw at runtime if the bug it conceals exists. Recommendation: glass-ui implements F5 with an associated test fixture. |
| **GlassScrubber / Timeline union** | O-N-5 (folded into O); Rα §K9 | **ZERO impact.** `rg -ln 'GlassScrubber\|GlassTimeline\|fourier\|scrubber'` returns 0 hits. Consumer has no fourier / timeline surface. |
| **K9 `.section-label` retire-or-keep** | Rα §K9 | **CRITICAL—KEEP forced.** `rg -n '\.section-label\|section-label' words/frontend/src` returns **10 active consumer sites** (WordlistDashboard ×4, WordlistProgressiveSidebar ×2, WordPreviewList ×1, WordlistStatsBar ×1, WordDetailModal ×1, SearchResults ×1). Spot-verified. The retire-vs-keep coin flip is resolved: KEEP. Document the consumer count in Rα §K9 disposition; do NOT excise. |
| **Rγ B3—`avatarVariant` singular rename** | Rγ §3.2 B3 | **ZERO impact.** Consumer imports `Avatar` + `AvatarImage` (SidebarHeader.vue:81) but never reaches into `avatarVariant` CVA directly. Renaming is safe for this consumer. |
| **Rγ A1—sidebar types to `/api`** | Rγ §3.3 A1 | **POSITIVE impact.** Consumer ALREADY `import type { TreeNode } from '@mkbabb/glass-ui/sidebar'` at `useSidebarState.ts:8`. Promoting `TreeNode` / `SidebarState` to `/api` simplifies the discovery story; one-line consumer-side import refactor. |
| **Rγ A2—search domain types to `/api`** | Rγ §3.3 A2 | **ZERO impact.** Consumer has its own `SearchResult` API types (from backend OpenAPI codegen at `types/api/responses.ts:90`); does NOT consume glass-ui's `useFuzzySearch`. The glass-ui search types are a different domain (fuzzy-search-over-static-list, not server search). |
| **Rδ dock DI canonicalization** | Rδ §3.1 | **ZERO impact.** Consumer imports `GlassDock` + `DockIconButton` (`WordListView.vue:234`, `ThemeSelector.vue:144`) but does NOT reach into provide/inject keys (`dockKeepOpen`, `dockRelease`, `dockHeld`, `glassDockContext`). `rg -ln 'dockKeepOpen\|dockRelease\|dockHeld\|glassDockContext\|useDockContext'` returns 0 hits. The DI canonicalization is purely library-internal for this consumer. |
| **Rδ §3.6 DockLayerGroupContext duplication** | Rδ §3.6 | **ZERO impact.** Consumer doesn't use `DockLayerGroup` / `DockLayer`. |
| **Rα E1-E4 / W1 (doc-only excisions)** | Rα §3 | **ZERO impact.** Comment-level renames in glass-ui internals. |

**Round-1 cross-walk verdict:** **CLEAN.** No round-1 finding produces a consumer-breaking change. The most consumer-positive findings are (a) K9 spot-verification (10 sites—forces KEEP); (b) Rγ A1 sidebar types to `/api` (consumer already cherry-picks via subpath). The single semi-risk is F5 typewriter throw—if the unreachable-bail conceals a real bug, throwing might surface it at consumer runtime.

---

## 5. Drift findings (round-2 delta vs N11/a baseline)

| Baseline finding | Status at O entry (2026-05-14) |
|---|---|
| YoshiAvatar rgba shimmer literals (Axis 1) | **Unchanged.** |
| WordListRow `bg-[var(--card-state-*)]/10` arbitrary opacity (Axis 1) | **Unchanged.** |
| BorderShimmer cubic-bezier literal (Axis 1) | **Unchanged.** Now ALSO a gap candidate (G1). |
| SidebarContent manual liftdown vs `.hover-lift-md` (Axis 2) | **Unchanged.** |
| SidebarContent buttons missing `active:scale-press-btn` (Axis 3) | **Unchanged.** Folds into I4. |
| `active:scale-[X.XX]` 9-site idiom (Axis 3) | **Unchanged.** Promoted to I4 + O-N-7 cross-reference. |
| `@keyframes shimmer` collision with glass-ui (Axis 5) | **Unchanged.** Still at `assets/index.css:21`. |
| AnimatedText `text-7xl font-black` (Axis 6) | **Unchanged.** |
| WordlistStatsBar `.text-admin-label` drift (Axis 6) | **Unchanged.** |
| NotFound.vue `text-6xl font-bold` (N11/a new) | **Unchanged.** |

**Net new drift in round-2:** **0.** Tree is quiescent at `0f16925`. Round-2 reveals NEW dimensions (idiomatic-use I1-I5; gap candidates G1-G4) but no new drift.

**Net new dep drift:** `tailwind-merge` package present without import sites—flagged as I5.

---

## 6. Verdict

**MINOR-with-affordance** (refined from N11/a's "MINOR").

- **Consumer state at O entry: CLEAN.** v1.0+ subpath shape; 87 files / 114 imports / 12 subpaths; zero migration owed; tree quiescent.
- **Round-1 cross-walk: CLEAN.** Zero round-1 finding produces a breaking change for words/frontend. Aurora-throw, GlassScrubber, dock DI cleanup, Configurator clone—none apply.
- **K9 spot-verification: KEEP.** `.section-label` has 10 active consumer sites; glass-ui MUST preserve. Document in Rα §K9 disposition.
- **Idiomatic-use opportunities: 5 found**—local Card (I1), useTextureSystem vs paper-backdrop (I2), local ProgressiveSidebar shells (I3), arbitrary press-scale idiom (I4), stale tailwind-merge dep (I5). I2 + I3 are high-value (~810 LOC of consumer code parallels glass-ui substrate).
- **Gap candidates: 4 found**—BorderShimmer (single-consumer; defer), ProgressiveSidebar extension points (high-impact; library-side action), PaperBackdrop `/api` promotion (medium), useToast DI documentation (low).
- **Wave assignment recommendation:** I3 + G2 is the most consequential glass-ui-side action—refactor `ProgressiveSidebar` to a slotted shell (or split chassis/default) so words can drop 469 LOC. I4 + O-N-7 are token-tier additions. I1/I2 are consumer-side cleanups (words owns these).

**No BLOCKER and no glass-ui-side blocker action required at O entry.** Three substrate proposals (G2 ProgressiveSidebar chassis, Rγ A1 sidebar types to `/api`, O-N-7 press-scale ladder) cleanly fold into the O wave plan.

---

**Report compiled:** 2026-05-14 | O11 Lane a | round-2 consumer audit.
