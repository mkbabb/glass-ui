# P.W?-round2 — P11/a words/frontend consumer audit (vs glass-ui v1.7.0)

**Date**: 2026-05-14
**Lane**: P11/a — round-2 consumer audit at P open.
**Scope**: READ-ONLY audit of `/Users/mkbabb/Programming/words/frontend` at HEAD against glass-ui HEAD `b201b03` (`package.json` v1.7.0; last git tag `v1.6.0` — v1.7.0 UNTAGGED).
**Baseline**: `docs/tranches/O/audit/W7-O11a-words-frontend-rerun.md` (O.W7 re-audit; CLEAN at v1.4.0).
**Consumer HEAD**: `0f16925` — UNCHANGED since M.W1 (matches O.W7 baseline; tree still quiescent).
**glass-ui pin**: `"@mkbabb/glass-ui": "file:../../glass-ui"` — workspace link → v1.7.0 HEAD.
**Bounds**: read-only; this doc is the only artefact. No git mutations.

---

## § 1 — Build verification at v1.7.0

```
$ cd /Users/mkbabb/Programming/words/frontend
$ npm run build
...
dist/assets/plus-jakarta-sans-latin-eXO_dkmS.woff2     ~18-22 kB
dist/assets/plus-jakarta-sans-latin-ext-DmpS2jIq.woff2 ~25-30 kB
dist/assets/fira-code-latin-CHoedHDv.woff2              36.28 kB
dist/assets/index-D2SQlF8L.css                         350.72 kB  (+3.89 kB vs O.W7 346.83 kB)
dist/assets/vendor-KWBX3X8a.js                         373.76 kB  (unchanged)
dist/assets/index-D54Q5Wg9.js                          453.20 kB  (unchanged)
dist/assets/dock-GLjtEmOT.js                             9.74 kB  (unchanged)
✓ built in 4.25s
```

**Build: GREEN.** All 12 glass-ui subpaths still resolve (root + `/dark`, `/forms`, `/controls`, `/dock`, `/sidebar`, `/confirm-dialog`, `/carousel`, `/stacked-icons`, `/tabs`, `/typewriter`, `/styles`). 114 import lines verified unchanged (`rg -n '@mkbabb/glass-ui' src | wc -l → 114`).

**v1.7.0 substrate non-regression: VERIFIED.** All 4 new subpaths (`/metric-stack`, `/animated-digit`, `/metric-cell`, `/responsive-tabs`) are present in the library `package.json` exports but ZERO consumed (expected — they are net-additive primitives; no breakage).

**CSS delta**: +3.89 kB (346.83 → 350.72 kB) tracks the AB+1 cohort additions (Fira Code + Plus Jakarta Sans `@font-face` declarations + `--phase-color-label` cascade + new primitive CSS) absorbed transparently through the `@mkbabb/glass-ui/styles` bundle.

---

## § 2 — AB+1 primitive adoption opportunities

The v1.6.0/v1.7.0 cohort shipped 5 new primitives: **MetricRow**, **MetricStack**, **AnimatedDigit**, **MetricCell**, **ResponsiveTabs**. Zero are currently consumed by words/frontend (`rg -n 'MetricRow|MetricStack|AnimatedDigit|MetricCell|ResponsiveTabs' src` → 0 matches).

### § 2.1 — MetricRow / MetricStack adoption (HIGH leverage)

words/frontend has multiple sites that hand-roll the "big number + small label" pattern:

| File | Lines | Pattern |
|---|---|---|
| `src/components/custom/wordlist/WordlistStatsBar.vue` | 1-47 (59 LOC total) | **4-cell row**: unique-words / mastered / due-for-review / streak. Each cell: `text-title font-bold tabular-nums` value + `text-xs uppercase tracking-widest` label. Optional Flame icon. |
| `src/components/custom/wordlist/views/WordlistDashboard.vue` | 22-43 | **3-cell row**: total-words / mastered / day-streak. Each cell: `font-serif text-4xl font-bold tabular-nums` value + `section-label` label. Optional Flame icon. |
| `src/components/custom/wordlist/views/WordListView.vue` | 50-67 | **inline metric strip** with 3 metrics: unique-words / mastery-gold / due-for-review — same `text-heading font-bold font-serif tabular-nums` pattern. |
| `src/components/custom/wordlist/modals/WordDetailModal.vue` | 70-90 | **stat list**: repetitions / ease-factor / interval / lapse-count — 4 `font-medium tabular-nums` metric rows. |

**Adoption opportunity**: 4 sites × ~3-4 cells per site = ~14 metric cells. Migration shape: replace the local `<div><p>{value}</p><p>{label}</p></div>` triple with `<MetricStack :value="..." :label="..." />` or wrap in `<MetricRow>` for horizontal layout.

**Caveat**: the consumer's styling diverges (different font ladders: `text-title` vs `text-4xl font-serif`; different label classes: `section-label` vs `text-xs uppercase tracking-widest`). MetricRow/MetricStack would need to surface enough custom-prop cascade (the AC.W6d pattern documented in `bb1f15b`) to absorb both. **Verify** the cascade vars expose font-size + label-color + label-tracking — if so, this is a clean win.

### § 2.2 — AnimatedDigit adoption

The metric cells above are static counts. `WordListView.vue:52-60` renders counts that update on filter changes — candidate for AnimatedDigit if consumer wants the rolling-digit affordance. Not currently animated; LOW priority (cosmetic).

### § 2.3 — ResponsiveTabs adoption

`src/components/custom/search/components/controls/SearchControls.vue:29-39` uses `<Tabs>/<TabsList variant="underline">/<TabsTrigger>` (the v1.0 root-barrel surface). ResponsiveTabs is a NEW v1.7.0 primitive that collapses tabs into a dropdown at narrow viewports. If words/frontend has mobile-bound layouts (it does — manifest.json + service-worker.js confirm PWA), this is a MEDIUM-leverage migration.

**Recommended path**: dispatch P-wave demo-coverage cohort (P-4 in inheritance ledger) to author a ResponsiveTabs migration story; then surface to consumer at P.W5 cross-repo wave as opt-in adoption.

### § 2.4 — MetricCell + ToggleGroupItem card variant

`SidebarCluster.vue:41` uses `:variant="cardVariant"` on a card-shaped toggle item. ToggleGroupItem now ships a "card" variant at v1.7.0 — verify consumer's local `cardVariant` helper still aligns OR migrate to the library variant.

`WordlistGrid.vue:6` uses `:variant="cardVariant(wl)"` — same pattern; likely a different local helper (per-wordlist tier classification). LOW priority unless consumer adopts.

---

## § 3 — O-residual carry adoption status

Walks the 5 O-W7 round-2 carry-forwards (§3 of baseline doc) + cross-checks at HEAD.

### § 3.1 — scale-on-hover utility (O.W6 Lane C carry; CR-3-adjacent)

**Substrate**: LANDED at v1.4.0 (O.W6 Lane C); ships through `@mkbabb/glass-ui/styles`.

**Consumer adoption at HEAD**: ZERO. `rg -n 'scale-on-hover' src` → 0 matches.

**Hover-axis literal count**: 27 lines (UNCHANGED since O.W7 baseline). Distribution:

| Pattern | Sites | Migration eligibility |
|---|---|---|
| `hover:scale-105` | 7 lines (HamburgerIcon ×2, FancyF, ProviderIcons ×4, SearchResultItem) | Candidate (`1.05` → `1.08`) |
| `hover:scale-110` | ~14 lines (PWAInstallPrompt, ImageCarousel ×2, CarouselSlide, SynonymListEditable ×2, ImageUploader, EditableField ×2, ActionButton, ModeToggle, WordLookupPopover ×3) | Candidate (`1.10` → `1.08`) |
| `hover:scale-125` | 3 lines (LoadingProgress ×2, YoshiAvatar) | NOT a clean migration (intentional dramatic shift) |
| `disabled:hover:scale-100` | 4 lines (CarouselSlide, RefreshButton, EditableField, SynonymListEditable) | Companion suppressor; stay literal |

**~21 of 27 sites** are clean candidates. **Adoption path concrete**: single-line mechanical rewrite per call-site (`class="hover:scale-110 transition-fast"` → `class="scale-on-hover"`). Cohort-able with keyframes.js (CR-3; per Pζ §2.2).

### § 3.2 — press-scale ladder (O-N-7 carry)

**Substrate**: NOT LANDED. The 4-rung `--scale-press-{xs,sm,md,lg}` ladder still requires ≥ 2 consumers to clear L invariant 8.

**Consumer literal count at HEAD**: 9 `active:scale-[X.XX]` sites across 8 files (UNCHANGED since O.W7):

| Value | Sites | Files |
|---|---|---|
| `0.95` | 2 | LookupControlsPanel.vue (×2) |
| `0.96` | 1 | ReviewQualityButtons.vue |
| `0.97` | 2 | SearchResults.vue, SearchResultItem.vue |
| `0.98` | 4 | WordlistDashboard.vue, RecentItem.vue, WordlistGrid.vue, (one more) |

**Decision shape** (Pζ §2.1 P-3 / Pδ): three values present (`0.95`, `0.96`, `0.97`, `0.98`) — a 4-rung ladder fits this distribution exactly. If a second consumer (likely speedtest or value.js per round-2 audit) surfaces multi-rung press-axis literals, the ladder LANDS. Otherwise, words/frontend collapses to `--scale-press-btn` project-wide (consumer-side decision).

**P-wave assignment**: P.W3 substrate-decision wave (per Pζ §2.5) — bundle with P-5 Slider variant decision; round-2 audit data feeds substrate-or-retire.

### § 3.3 — ProgressiveSidebar slotted-chassis (G2 carry; HIGH leverage)

**Substrate**: NOT LANDED at glass-ui v1.7.0. AB+1 cohort did NOT touch the sidebar substrate (`rg -n 'ProgressiveSidebar' src` against glass-ui v1.7.0 source confirms no split).

**Consumer state at HEAD**: UNCHANGED — both local components present:

```
$ wc -l src/components/custom/navigation/*.vue
     150 src/components/custom/navigation/ProgressiveSidebar.vue
     319 src/components/custom/navigation/WordlistProgressiveSidebar.vue
     469 total
```

469 LOC of parallel implementation persists. The glass-ui `ProgressiveSidebar` chunk (17.87 kB) ships alongside the consumer's local `ProgressiveSidebar-CPKT_xuK.js` (also 17.87 kB) + `WordlistProgressiveSidebar-BwWRUQci.js` (10.12 kB) — verified in build output above. The consumer pays for BOTH chunks; net waste.

**Adoption opportunity**: split `<ProgressiveSidebar>` → `<ProgressiveSidebarShell>` (slot-driven chassis: `#cluster-header` / `#cluster-item` / `#footer` slots) + `<ProgressiveSidebarDefault>` (current behaviour preserved). Consumer drops ~469 LOC + ~28 kB compiled.

**P-wave proposal**: glass-ui canonical substrate wave (NOT consumer-internal split — the leverage is too high for consumer-only). This is a P.W?-class HEADLINE candidate; per L invariant 8, the 2nd-consumer bar must clear (i.e., at least one other consumer's sidebar fits the chassis). Candidate 2nd-consumers from CONSTELLATION.md: bbnf-buddy (ToolsLayer.vue has navigation sidebar shape per O.W7 §3.5) — verify at P round-2 P11/c audit.

### § 3.4 — PaperBackdrop `/api` promotion + texture-system migration (G3 + I2)

**Substrate**: NOT LANDED at glass-ui v1.7.0. `/paper-backdrop` subpath ships (per package.json exports list above) but `/api` types for PaperBackdropProps + PaperVariant union are NOT promoted.

**Consumer state at HEAD**: parallel implementation persists at high LOC:

```
$ wc -l src/composables/useTextureSystem.ts                162
$ wc -l src/components/custom/texture/*.vue
  75  TextureBackground.vue
 149  TextureCard.vue
 117  TextureOverlay.vue
 341  total
```

`useTextureSystem` (162 LOC) + 3 texture components (341 LOC) + texture-paper-* utilities in `tailwind.config.ts` plugin block = ~500+ LOC duplicating glass-ui's `paper-backdrop` substrate + `/styles` texture-paper-* utilities.

**`paper-texture-*` utility usage**:
- `tailwind.config.ts` defines `.texture-paper-{clean,aged,handmade,kraft}` utilities locally (~10 LOC plugin block).
- 2 consumer sites use `texture-paper-clean` directly: PWAInstallPrompt.vue:10, PWANotificationPrompt.vue:10.
- ThemedCard.vue / TextureCard.vue / Card.vue all gate on `useTextureSystem({type, intensity})`.

**P-wave proposal**: glass-ui-side `/api` promotion + canonical paper-backdrop recipe documentation. Consumer-side cleanup wave deletes `useTextureSystem.ts` + 3 texture components + tailwind.config.ts plugin block. **HIGH leverage**: ~500 LOC absorbed; consumer's texture-paper-clean utility migrates to `@mkbabb/glass-ui/styles` pickup directly (already imported per `@import '@mkbabb/glass-ui/styles'`).

### § 3.5 — Local Card.vue duplication (I1 carry)

**Substrate state**: glass-ui ships `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `CardFooter` (per CLAUDE.md `src/components/ui/card/` package).

**Consumer state at HEAD**: 3-file local card directory persists (UNCHANGED since O.W7):

```
$ wc -l src/components/custom/card/*.vue
  71  Card.vue
  43  GradientBorder.vue
 112  ThemedCard.vue
 226  total
```

Card.vue (71 LOC) IS a near-duplicate of glass-ui Card with texture-system glue welded in (via `useTextureSystem`). It is consumed only via `ThemedCard.vue` indirection (per `rg -n 'from.*@/components/custom/card' src` → 6 sites all importing `ThemedCard`, NOT `Card`). The Card.vue file appears to be dead-code OR used internally by ThemedCard.

**Note**: `import.*Card.*@mkbabb/glass-ui` returns 1 site (`Etymology.vue:50` — `import { CardContent } from '@mkbabb/glass-ui'`). The cross-walk of which Card the consumer actually uses is murky.

**Disposition**: **CONSUMER-SIDE cleanup**; no glass-ui-side action. Consumer owns the migration decision. Bundle with §3.4 (PaperBackdrop adoption) since both depend on `useTextureSystem` retirement. P.W5 consumer-side cohort candidate.

---

## § 4 — Font subsystem audit (NEW post-O — AB+1 cohort)

**Critical finding**: words/frontend DOUBLE-LOADS Fira Code.

### § 4.1 — Substrate state at v1.5.0+

glass-ui v1.5.0 (commit `2474440`) self-hosts Fira Code + Plus Jakarta Sans OFL via `src/fonts/`. These ship through `@mkbabb/glass-ui/styles` as `@font-face` declarations (verified in `dist/assets/index-D2SQlF8L.css`).

The words/frontend build at HEAD already absorbs these — confirmed in `dist/assets/`:

```
dist/assets/fira-code-latin-CHoedHDv.woff2              36.28 kB
dist/assets/plus-jakarta-sans-latin-eXO_dkmS.woff2     ~18-22 kB
dist/assets/plus-jakarta-sans-latin-ext-DmpS2jIq.woff2 ~25-30 kB
```

`@font-face` rule for `Plus Jakarta Sans` is present in the bundled CSS (verified via `grep '@font-face' dist/assets/index-*.css`).

### § 4.2 — Consumer's duplicate font load (BLOCKER-ADJACENT)

`index.html:61-62`:

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Fira+Code:wght@300..700&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Fira+Code:wght@300..700&display=swap"></noscript>
```

The consumer's `index.html` still pulls Fira Code from Google Fonts CDN. With glass-ui v1.7.0, Fira Code is now self-hosted via `@import '@mkbabb/glass-ui/styles'`. The consumer pays the network cost TWICE:

1. CDN fetch from `fonts.googleapis.com` (Fira Code + Fraunces, ~300 KB combined uncached).
2. Self-hosted woff2 from `/assets/fira-code-latin-CHoedHDv.woff2` (36.28 kB; bundled into dist).

**Migration path**: rewrite `index.html` to drop `Fira+Code` from the Google Fonts query (KEEP `Fraunces` — that's project-local font, not provided by glass-ui). Single 2-line edit. The self-hosted version will paint reliably; the CDN version stops contending.

**Glass-ui-side**: no action needed; the substrate is correct. **Consumer-side**: P.W5 cross-repo write candidate (single file edit; mechanical).

### § 4.3 — `--font-mono` consumer-local override

`src/assets/theme.css:8` defines `--font-mono: "Fira Code", Consolas, monospace;` at consumer side. This works correctly whether Fira Code comes from CDN or self-host — the `font-family` string matches. No conflict after CDN dropped.

### § 4.4 — Plus Jakarta Sans usage

words/frontend does NOT use Plus Jakarta Sans (consumer overrides `--font-sans` to `Fraunces` at theme.css:6). The Plus Jakarta Sans woff2 files ship as transitive cost from `@mkbabb/glass-ui/styles` but never paint.

**Substrate question**: does `@mkbabb/glass-ui/styles` expose a font-only-omit variant (e.g., `@mkbabb/glass-ui/styles/no-fonts`)? If not, consumers like words/frontend who self-override `--font-sans` pay for the unused Plus Jakarta Sans woff2 bytes (~45 kB).

**Proposal**: glass-ui-side investigate splitting `@import 'fonts.css'` out of `index.css`, allowing consumers to opt-in. P-wave candidate (LOW priority — 45 kB is small but it IS dead-byte cost).

---

## § 5 — P-wave cross-repo write proposals

Per finding, with disposition (LANDED / SCHEDULED-for-P / RETIRE):

| Item | Source | Disposition | P-wave |
|---|---|---|---|
| Build green at v1.7.0 | §1 | **LANDED** (no action) | — |
| MetricRow/MetricStack adoption (4 sites; ~14 cells) | §2.1 | **SCHEDULED-for-P** | P.W5 cross-repo wave; cohort with the AB+1 primitives adoption batch. Requires verification that MetricRow custom-prop cascade absorbs the consumer's font-ladder + label-class divergence. |
| AnimatedDigit adoption (cosmetic) | §2.2 | **RETIRE** (low priority; cosmetic only) | — |
| ResponsiveTabs adoption (SearchControls.vue mobile) | §2.3 | **SCHEDULED-for-P** | P.W2 demo-coverage cohort surfaces canonical story; P.W5 consumer-side opt-in. |
| ToggleGroupItem "card" variant (SidebarCluster + WordlistGrid) | §2.4 | **SCHEDULED-for-P** (verify) | P.W5 — verify consumer's local `cardVariant` helper still aligns; opt-in migrate if so. |
| scale-on-hover utility (~21 of 27 hover-axis sites) | §3.1 | **SCHEDULED-for-P** | P.W5 cross-repo cohort with keyframes.js (CR-3); ~21 mechanical 1-line rewrites. |
| press-scale ladder (9 sites, 4 values) | §3.2 | **SCHEDULED-for-P** | P.W3 substrate-decision wave; if 2nd-consumer surfaces multi-rung, ladder LANDS at glass-ui + consumer migrates; otherwise consumer collapses to `--scale-press-btn` project-wide. |
| ProgressiveSidebar slotted-chassis (469 LOC) | §3.3 | **SCHEDULED-for-P** (HIGH leverage) | P.W?-class HEADLINE candidate; glass-ui-side substrate split + consumer wrapper rewrite. ~469 LOC + ~28 kB compiled absorbed. Requires bbnf-buddy or speedtest 2nd-consumer confirmation at P round-2. |
| PaperBackdrop `/api` promotion + texture-system migration (~500 LOC) | §3.4 | **SCHEDULED-for-P** (HIGH leverage) | P.W4-tier `/api` promotion (substrate-side) + P.W5 consumer-side cleanup wave. |
| Local Card duplication (Card.vue 71 LOC) | §3.5 | **CONSUMER-SIDE-only** | Bundle with §3.4 cleanup; consumer owns. No glass-ui-side action. |
| **Fira Code CDN drop in index.html** (single-line) | §4.2 | **SCHEDULED-for-P** (mechanical, high-confidence) | P.W5 cross-repo write — 2-line `index.html` edit; eliminates duplicate font network cost. |
| Plus Jakarta Sans dead-byte cost (~45 kB unused) | §4.4 | **SCHEDULED-for-P** (LOW priority) | P-wave substrate investigation; split `@import 'fonts.css'` for opt-in pickup. |
| Timeline a11y fix (`::before inset -15px`) | AB+1 cohort | **LANDED** (substrate transparent; words/frontend doesn't consume GlassTimeline — its `TimeMachineTimeline` is consumer-local) | — |
| `--phase-color-label` cascade | AB+1 cohort | **LANDED** (substrate transparent; consumer paints chassis labels via different cascade) | — |

**Cross-repo write count for words/frontend at P.W5**: 4 concrete writes (Fira Code CDN drop, scale-on-hover migration, MetricRow adoption, optional ResponsiveTabs). All mechanical; all single-file edits except scale-on-hover (~13 files but ~1 line per site).

**Glass-ui-side substrate work needed at P** (driven by this audit):
1. **PaperBackdrop /api types promotion** (low-friction; mechanical W4-tier).
2. **ProgressiveSidebar slotted-chassis split** (HEADLINE-class; HIGH leverage; requires 2nd-consumer verification).
3. **Fonts.css opt-out** (LOW priority; one substrate refactor).

---

## § 6 — Verdict

**MINOR.**

- **Build verification: GREEN.** Non-regression confirmed at v1.7.0 against the consumer's HEAD. All 12 currently-used subpaths resolve; +3.89 kB CSS delta tracks AB+1 cohort additions transparently.
- **AB+1 primitive adoption: ZERO at HEAD; ~14 metric-cell sites + ~4 ResponsiveTabs sites are clean migration candidates.** The 5 new primitives reach a real consumer surface here.
- **O-residual carry status: 5 of 5 carries persist UNCHANGED** since O.W7 baseline (tree quiescent). All have concrete P-wave assignment paths.
- **Font subsystem NEW DEBT: 1 mechanical fix** — `index.html:61` Google Fonts CDN double-loads Fira Code now that glass-ui v1.5.0+ self-hosts it. ~45 kB transitive Plus Jakarta Sans dead-byte cost is LOW priority but real.

**Reason for MINOR (not CLEAN)**: the Fira Code double-load is a duplicate network cost shipping at HEAD against v1.7.0. The substrate side is correct (glass-ui self-host works); the consumer side needs the 2-line edit. This is the only MINOR-tier item; everything else is SCHEDULED-for-P-as-additive-adoption.

**Reason for not BLOCKER**: nothing breaks. The dual font load is wasteful but not incorrect; both Fira Code variants paint identical glyphs.

---

## § 7 — Files referenced (absolute paths)

Consumer-side:
- `/Users/mkbabb/Programming/words/frontend/package.json` (dep pin)
- `/Users/mkbabb/Programming/words/frontend/index.html` (CDN font load; § 4.2 fix target)
- `/Users/mkbabb/Programming/words/frontend/src/assets/theme.css` (font-mono var; aligns with self-host)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/wordlist/WordlistStatsBar.vue` (MetricRow candidate)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/wordlist/views/WordlistDashboard.vue` (MetricRow candidate)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/wordlist/views/WordListView.vue` (MetricRow + cardVariant)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/wordlist/modals/WordDetailModal.vue` (MetricRow candidate)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/search/components/controls/SearchControls.vue` (ResponsiveTabs candidate)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue` (G2 chassis target; 150 LOC)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/navigation/WordlistProgressiveSidebar.vue` (G2 chassis target; 319 LOC)
- `/Users/mkbabb/Programming/words/frontend/src/composables/useTextureSystem.ts` (G3/I2 cleanup target; 162 LOC)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/texture/*.vue` (G3/I2 cleanup target; 341 LOC)
- `/Users/mkbabb/Programming/words/frontend/src/components/custom/card/Card.vue` (I1 cleanup target; 71 LOC)
- `/Users/mkbabb/Programming/words/frontend/tailwind.config.ts` (texture-paper-* plugin; G3 cleanup-adjacent)

Glass-ui substrate baselines:
- `/Users/mkbabb/Programming/glass-ui/package.json` (v1.7.0 exports surface; 38 subpaths)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/O/audit/W7-O11a-words-frontend-rerun.md` (O.W7 baseline)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/findings.md` (inheritance ledger)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/research/Pzeta-recap-chronic-defer-fold.md` (P-wave assignments)

---

**Report compiled**: 2026-05-14 | P11/a — round-2 consumer audit (words/frontend at glass-ui v1.7.0) | read-only.
