# N11 Lane a (N4 re-run) — words/frontend Post-N Consumer Re-Audit

## Preamble

- **Scope:** `/Users/mkbabb/Programming/words/frontend` (READ-ONLY cross-repo).
- **Consumer HEAD:** `0f16925 feat(frontend/glass-ui): migrate to v1.0 subpath surface + glass-subtle→glass-wash (constellation M.W0 Lane III + M.W1 Lane D)` — unchanged since M.W1 close.
- **glass-ui reference:** v1.1.3 (master, post-N tranche close: 5 strategic wires + Configurator density CVA + precept canonicalize).
- **Audit date:** 2026-05-14.
- **Baseline:** `docs/tranches/N/audit/N11-Lane-a-words-frontend.md` (KISS-revision audit, 2026-05-12). Earlier ledger surfaced 8 drift findings + 4 keyframe overfitting candidates + 1 major mastery-palette gap.
- **Mandate:** verify glass-ui v1.1.x consumption is clean; no migration work owed; surface any post-N drift (regressions OR new gap candidates).

---

## 1. Consumer state at N close

| Surface | State |
|--|--|
| glass-ui pin | `"@mkbabb/glass-ui": "file:../../glass-ui"` (workspace link; resolves to v1.1.3 HEAD). |
| Frontend in-flight commits since 2026-05-13 | **0.** Frontend tree is quiescent at `0f16925`. |
| Working-tree modifications under `words/frontend/` | **0.** All `git status` modifications scope to sibling `backend/` and repo root (`package-lock.json`, `docs/`, `docker-compose.yml`, `.gitmodules`, untracked `phonetic.py` + tests + `docs/instructions/` + `docs/precepts/`). The frontend slice is clean. |
| Consumer import sites for `@mkbabb/glass-ui*` | **114** across 60+ files. |
| Distinct subpaths consumed | 12 — root (`@mkbabb/glass-ui`), `/dark`, `/forms`, `/controls`, `/dock`, `/sidebar`, `/confirm-dialog`, `/carousel`, `/stacked-icons`, `/tabs`, `/typewriter`, `/styles`. All resolve against `package.json` exports at v1.1.3. |
| Retired-subpath leakage | **0.** No references to `composables/dark`, `composables/keyboard`, `/pagination`, or `/virtual` from the glass-ui namespace. (`@/composables/virtual` hits in 4 files are the consumer's OWN internal path — transposed copies of the v0.9.4 virtual primitives, header-commented as such.) |
| Glass-subtle → glass-wash rename | Already applied at M.W1 Lane D; no `glass-subtle` residue. |

**Subpath shape verdict:** v1.0+ canonical shape. No migration owed.

---

## 2. New drift since M.W1 / KISS-revision baseline (2026-05-12)

Baseline tallied **8 drift findings** across 7 audit axes. State at 2026-05-14:

| Baseline finding | Status at N close |
|--|--|
| YoshiAvatar rgba shimmer literals (Axis 1) | **Unchanged.** Still 2 instances at YoshiAvatar.vue:92–94. |
| WordListRow `bg-[var(--card-state-*)]/10` arbitrary opacity coupling (Axis 1) | **Unchanged.** ~20 instances. |
| BorderShimmer `cubic-bezier(0.55,0.12,0.18,1)` literal (Axis 1) | **Unchanged.** 1 instance. |
| SidebarContent manual liftdown + shadow instead of `.hover-lift-md` (Axis 2) | **Unchanged.** |
| SidebarContent buttons missing `active:scale-press-btn` (Axis 3) | **Unchanged.** |
| SidebarWordListItem `active:scale-[0.98]` arbitrary scale (Axis 3) | **Unchanged.** Note: 9 sites total now use `active:scale-[0.95–0.98]` arbitrary literals (RecentItem, WordlistGrid, ReviewQualityButtons, WordlistDashboard, LookupControlsPanel ×2, SearchResults, SearchResultItem). Pattern is consistent — consumer treats `active:scale-[Xxx]` as a project idiom rather than reaching for `--scale-press-btn`. |
| `@keyframes shimmer` collision with glass-ui canonical name (Axis 5) | **Unchanged.** `assets/index.css:21` still redefines `shimmer` as a 3s translateX slide; collides with glass-ui's `@theme inline --animate-shimmer` binding. |
| AnimatedText `text-7xl font-black` arbitrary scale (Axis 6) | **Unchanged.** Plus 1 NEW peripheral site: `views/NotFound.vue:3` uses `text-6xl font-bold` for a 404 glyph (similar drift class). |
| WordlistStatsBar manual caps + tracking instead of `.text-admin-label` (Axis 6) | **Unchanged.** |

**Net new drift since baseline:** **1 minor finding** — `NotFound.vue:3` uses `text-6xl font-bold` arbitrary Tailwind scale for the 404 glyph. Same Axis 6 class as the AnimatedText `text-7xl` flag. Low severity (route fallback, 1 visual surface).

**Drift literal counts (sanity sweep):**
- `color-mix(` raw uses: 31 (all consumer-side, intentional palette mixing per baseline assessment).
- `rgba(` literals: 26 (includes the flagged YoshiAvatar pair + texture overlays + paper-grain).
- `cubic-bezier(` literals: 12 (includes the flagged BorderShimmer; remainder are bounce/elastic spring curves intentional per `--animate-*` token bindings).

None of these counts moved materially since baseline.

---

## 3. N-wire-induced regressions

The N tranche shipped **5 strategic wires** + 1 CVA + 1 precept op. Re-checked each against consumer surface:

| N wire | Consumer surface touched? | Regression risk |
|--|--|--|
| **useTouchGate → Slider** | No. Consumer does not import `@mkbabb/glass-ui/slider` or `useTouchGate`. Slider keep-dock-open contract is dock-internal. | **None.** |
| **metaballs + typewriter → hero composition** | Partial. Consumer imports `TypewriterText` from `@mkbabb/glass-ui/typewriter` at `AnimatedTitle.vue:11`. The wire is additive (new hero recipe in glass-ui demo); the consumer's pre-existing `TypewriterText` import is unaffected — same export, same prop surface. | **None.** |
| **paper-backdrop → Section.backdrop** | No. Consumer does not import `Section` or `paper-backdrop`. Words ships its own ThemedCard/TextureCard family. | **None.** |
| **freshness → speedtest** | No. Cross-consumer to speedtest, not words. | **None.** |
| **Configurator density CVA (W2 Lane A)** | No. Consumer does not import `Configurator`/`ConfiguratorRow`. | **None.** |
| **Precept canonicalize (W0 Lane B)** | No (docs-only). | **None.** |

**Verdict:** All N wires are additive on subpaths the consumer either does not consume or consumes only at the import-name level (TypewriterText). Zero regressions in the consumer.

---

## 4. Findings

### F1 (new, minor): NotFound.vue 404 glyph uses `text-6xl font-bold` arbitrary scale
- **Site:** `/Users/mkbabb/Programming/words/frontend/src/views/NotFound.vue:3`
- **Axis:** 6 (Typographic & Structural Hierarchy)
- **Severity:** Low (single peripheral route, fallback view).
- **Replacement:** `.text-display-hero` or `.text-display-audacious` from glass-ui `typography.css` (matches AnimatedText baseline finding).
- **Rationale flag:** Same drift class as the M.W1 baseline `text-7xl` flag — consumer reaches for raw Tailwind scale on display surfaces where glass-ui ships a semantic scale.

### F2 (rolled up, unchanged): `active:scale-[X.XX]` arbitrary-scale idiom now seen at 9 sites
- **Sites:** RecentItem, WordlistGrid, ReviewQualityButtons, WordlistDashboard, LookupControlsPanel (×2), SearchResults, SearchResultItem, SidebarWordListItem.
- **Axis:** 3 (Interactive Consistency).
- **Severity:** Low-Medium (consistent project idiom; reads as deliberate fine-tuning of press feedback per affordance class).
- **Observation upgrade from baseline:** This is not 1 instance — it's a project-wide idiom across 9 components, using 4 distinct scale values (`0.95`, `0.96`, `0.97`, `0.98`). Either:
  - (a) Adopt `--scale-press-btn` (0.97) project-wide and collapse the 4 values; OR
  - (b) Acknowledge the consumer's micro-press grammar as deliberate (different visual masses → different press depths) and consider exposing `--scale-press-{xs,sm,md,lg}` as a glass-ui token ladder (gap candidate; would require ≥2 consumers — speak to the substrate-without-consumer-binary invariant per L invariant 8).
- **Status:** flag, not blocker.

### F3 (rolled up, unchanged): mastery / card-state / review palette still living in consumer
- Baseline § Glass-ui gaps §1 proposed a spaced-repetition palette gap. State unchanged at N close (palette still local to `theme.css:15–36`).
- **Status:** Gap candidate remains valid for R6+ vocabulary work; not blocker for N close.

---

## 5. Verdict

**MINOR.**

- Consumer is consuming glass-ui v1.1.x via the canonical v1.0+ flat-subpath surface (12 subpaths). All resolve. No migration owed.
- Working tree is quiescent at M.W1 Lane D close; no in-flight frontend work since 2026-05-13.
- N-shipped wires are purely additive on the consumer's import surface — zero regressions.
- 1 new minor drift finding (NotFound.vue display-scale literal) of the same class as a known baseline flag.
- 8 baseline drift findings unchanged. 1 baseline observation upgraded in scope (active:scale arbitrary literal idiom seen at 9 sites — flag for either project-wide collapse or glass-ui token-ladder expansion).
- 1 major gap candidate (mastery/card-state/review palette) remains live for future vocabulary work; not blocker.

No BLOCKER and no glass-ui-side action required at N close. Re-audit on next consumer commit or N+1 substrate change.

---

**Report compiled:** 2026-05-14 | N11 Lane a (N4 re-run) | post-N substrate verification.
