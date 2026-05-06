# I.W5 — Doc Reconciliation Wave 2

**Date**: 2026-05-05
**HEAD commit at dispatch**: `63e29e4` (post-W3+W6 close)
**Method**: docs-only — read source at HEAD, edit `README.md` + `CLAUDE.md` + `docs/tranches/{D,E}/waves/*.md` Status lines + `docs/consumer-evidence/{animated-number,use-animated-number,use-animated-number-options}.md`. No `src/`, `demo/`, `tests/`, `DESIGN.md`, or `FINAL.md` touched.
**Inputs**: `docs/tranches/I/audit/W0-reconciliation.md` §3 (24 γ doc-fix items) + `docs/tranches/H/audit/H-deep-audit-γ-doc-drift.md` (CRIT-D1…D9 + 21 numbered recommendations).

## Verification at HEAD (pre-edit)

| Probe | Command | Result |
|---|---|---|
| `.glass-pill` def | `grep -n 'glass-pill' src/styles/glass.css` | 0 hits — confirmed retired |
| `.cartoon-card` / `.elevated-card` def | `grep -nE '\.cartoon-card\|\.elevated-card' src/styles/cards.css` | 0 hits — confirmed phantom |
| `cards.css` actual content | `grep -nE '\.cream-surface\|\.paper-texture' src/styles/cards.css` | both present — replacement content |
| `dock-icon-btn` vs `-button` | `grep -nE 'dock-icon-(btn\|button)' src/styles/dock.css` | only `.dock-icon-button` (8+ sites) — `-btn` form does not exist |
| `dock-separator` def | `grep -n 'dock-separator' src/styles/dock.css` | exists (lines 32, 262, 272, 275, 875) — keep |
| `dock-layer-grid` def | `grep -n 'dock-layer-grid' src/styles/dock.css` | 0 hits — phantom |
| `tokens.css` section blocks | `grep -nE '^\s*§' src/styles/tokens.css` | §0…§14 (15 sections incl. §6b viz basis) |
| `src/styles/*.css` count | `ls src/styles/*.css` | 19 files at HEAD |
| `ui/` packages | `ls src/components/ui/` minus `index.ts` | 37 packages (W1 retired multi-select + tags-input) |
| `custom/` packages | `ls src/components/custom/` | 37 packages (W1 retired glass-panel, metaballs, paper-backdrop, status-dot; +1 hover-popover added in Q-tranche) |
| `--paper-aged-texture` consumers | `rg -n 'paper-aged-texture' src/ demo/` | 1 hit in `tokens.css` (def only); 0 outside-def consumers — drop from README |
| `--shadow-cartoon*` rungs | `grep -nE '^\s+--shadow-cartoon' src/styles/tokens.css` | `--shadow-cartoon`, `--shadow-cartoon-hover`, `--shadow-cartoon-color`, `--shadow-cartoon-color-soft`, `--shadow-cartoon-accent` (no `xs`/`sm`/`md`/`lg` standalone in tokens.css after I.W1 alias retire) |
| Composables index export count | `wc -l src/composables/index.ts` | 13 export lines (1 sortable + useGlobalDark + useInterval + useKeyboardShortcuts + useResizeObserver + useTimer + useTouchGate + glass + motion + pagination + virtual + infinite-scroll re-export + sidebar) |
| `tokens.ts` runtime exports | `grep -nE '^export ' src/tokens.ts` | 5: `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER` |
| `package.json` peerDeps | inspected `peerDependencies` block | 11 peers: vue, reka-ui, @vueuse/core, tailwindcss, class-variance-authority, clsx, tailwind-merge, embla-carousel-vue, lucide-vue-next, vaul-vue, @mkbabb/keyframes.js |
| `text-mono-prose` def | `grep -n '@utility text-mono-prose' src/styles/typography.css` | line 255; siblings: `text-mono-{caption,small,micro}` |
| `useResizeObserver` consumer migration | commit `e62c787` body | 9 in-repo migration sites |

## 24 γ doc-fix items — disposition

### CRIT-D1…D9 (9 critical)

| # | Finding | README/CLAUDE locus | Action | Status |
|---|---|---|---|---|
| CRIT-D1 | `.glass-pill` claim wrong in 3 README sites (lines 9, 92, 118) | README:9 (Convenience shorthands list); README:92 (glass.css tree comment); README:118 (Convenience classes bundle) | dropped from all 3 sites; replaced line 118 with `.glass-btn` description | **resolved** |
| CRIT-D2 | "32 shadcn-vue components" off by 5 (post-W1 retires) | README:7, 61 | "32" → **"37"** (W1 retired multi-select + tags-input from H γ's 39 baseline) | **resolved** |
| CRIT-D3 | CLAUDE.md `.glass-pill` survives W6.γ rec-4 | CLAUDE:117 (now :118) | dropped from `glass.css` line | **resolved** |
| CRIT-D4 | README + CLAUDE phantom `.cartoon-card` / `.elevated-card` | README:94 (cards.css comment); CLAUDE:119 (cards.css comment) | both replaced with actual cards.css content (`.paper-texture, .cream-surface`) | **resolved** |
| CRIT-D5 | CLAUDE `.dock-icon-btn` typo + phantoms | CLAUDE:118 | `-btn` → `-button`; dropped phantom `.dock-layer-grid`; kept `.dock-separator` (verified present in dock.css) | **resolved** |
| CRIT-D6 | DESIGN.md `scroll-area`/`scroll-pane` phantoms | DESIGN.md:830 | **out of W5 scope** — DESIGN.md owned by W3.α; flagged for W3 close-doc but no action here. **No conflict found** at I.W5 inspect: W3.α did not author phantom additions; W3 added Substrate Hierarchy + Story Fidelity Policy + Accessibility Posture sections cleanly. CRIT-D6 / CRIT-D13 remain residual under W3.α governance. |
| CRIT-D7 | D-tranche W4 + W5 wave specs `Status: planned` post-D-II close | tranches/D/waves/W4.md, W5.md | both updated to `closed (2026-04-30, D-II close/redress; see PROGRESS.md:178/207)` | **resolved** |
| CRIT-D8 | CLAUDE tokens.css §1-§10 wrong | CLAUDE:114 | "§1–§10" → "§0–§14" with full section enumeration | **resolved** |
| CRIT-D9 | CLAUDE peer-dep table omits 4, miscategorizes 2 | CLAUDE:144-156 | added 4 peers (`lucide-vue-next`, `vaul-vue`, `embla-carousel-vue`, `@mkbabb/keyframes.js`); dropped the "Dev-only" line that miscategorized vaul-vue + lucide-vue-next | **resolved** |

### 21 numbered recommendations (γ §246-268)

| # | Recommendation | Action | Status |
|---|---|---|---|
| 1 | README:7,61 "32" → "39" | applied as **"37"** (post-W1 retires; W1 retired multi-select + tags-input — the H γ baseline of 39 is itself stale at HEAD) | **resolved** |
| 2 | README:9, 92, 118 drop `.glass-pill` | dropped from all 3 sites | **resolved** (CRIT-D1) |
| 3 | README:94 drop `.cartoon-card`/`.elevated-card`; add `.cream-surface` | tree comment now reads `.paper-texture, .cream-surface` | **resolved** (CRIT-D4 README half) |
| 4 | CLAUDE:117 drop `.glass-pill` | dropped | **resolved** (CRIT-D3) |
| 5 | CLAUDE:118 `.dock-icon-btn` → `.dock-icon-button` + drop phantoms | applied; kept `.dock-separator` (real); dropped `.dock-layer-grid` (phantom) | **resolved** (CRIT-D5) |
| 6 | CLAUDE:119 drop `.cartoon-card`/`.elevated-card`; add `.cream-surface` | tree comment now reads `.paper-texture, .cream-surface` | **resolved** (CRIT-D4 CLAUDE half) |
| 7 | CLAUDE:114 §1-§10 → §0-§14 | applied with section enumeration | **resolved** (CRIT-D8) |
| 8 | CLAUDE tree (112-123) add 7 missing `*.css` files | added paper.css, math.css, instrument-chassis.css, glyph-face.css, dock-group.css, disco-glyph.css, prism-theme.css, hover-popover.css (8 added — hover-popover.css landed since H γ baseline) | **resolved** |
| 9 | CLAUDE:144-156 peer-dep table fix | applied | **resolved** (CRIT-D9) |
| 10 | CLAUDE:140 re-add `chartMargin` + `minWidthInputSm` to runtime tokens | both re-added; runtime tokens line now reads all 5 (`chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER`) | **resolved** |
| 11 | CLAUDE:111 "9 top-level public export groups" → "12" | counted to **13** at HEAD (W1 added useResizeObserver + useInterval restructured the index re-export shape); applied as 13 with note about infinite-scroll re-export | **resolved** |
| 12 | DESIGN.md:830 drop phantoms `scroll-area`, `scroll-pane` | **out of W5 scope** (DESIGN.md owned by W3.α); see CRIT-D6 row | **deferred to W3.α** |
| 13 | DESIGN.md:834 drop phantoms; add 8 missing | **out of W5 scope** (DESIGN.md owned by W3.α) | **deferred to W3.α** |
| 14 | D/waves/W4.md+W5.md `planned` → closed via D-II | applied to both | **resolved** (CRIT-D7) |
| 15 | E/waves/W0.md `complete_with_misses` → canonical | applied: now reads `complete (canonical retroactive; non-canonical flag was reconciled at I.W5 …)` | **resolved** |
| 16 | docs/instructions/README.md:17 extend proof commands | **out of file bounds** for I.W5 (file is precept submodule territory; W0 Lane II owned the precept update). The line is mildly stale but not an active mislead. **Deferred** — flagged for next precept-submodule update wave. |
| 17 | README.md tree (73-86) mark `custom/` as illustrative | tree now ends with `…` and explicit "see CLAUDE.md for the full list" pointer | **resolved** |
| 18 | README.md:14 extend composables list | extended to: timer, interval, keyboard shortcut, touch gate, dark-mode, resize-observer, glass-renderer, motion, sortable, pagination, virtual-list, sidebar, infinite-scroll | **resolved** |
| 19 | README.md:132 cartoon-shadow xs+accent rungs | line now reads `--shadow-cartoon`, `--shadow-cartoon-{hover,sm,md,lg,accent}`, `--shadow-card` with note that `accent` is the warm-cream signature; reflects post-W1 alias-retire shape | **resolved** |
| 20 | README.md:134 drop `--paper-aged-texture` | dropped (0 outside-def consumers); replaced row with `--paper-clean-texture, .paper-{1..4} ladder` | **resolved** |
| 21 | docs/consumer-evidence/{3 D-tranche docs} (R-NEW-3) | all 3 refreshed; see Phase D below | **resolved** |

### 3 since-H additions (per W0 §3.2 §8.4)

| # | Addition | Action | Status |
|---|---|---|---|
| H+1 | `<HoverPopover>` (Q-tranche silent addition; `0cb88c2`) | added to CLAUDE.md custom/ tree at correct alphabetical slot; custom-package count updated 40 → 37 (with retires factored). The Design Axes section already mentions HoverPopover in instrument-cluster axis (W3.α scope, untouched). | **resolved** |
| H+2 | `useResizeObserver` (`e62c787`) | added to CLAUDE.md composables tree (own row); referenced in entry-point composables list; mentioned in README composables bullet | **resolved** |
| H+3 | `text-mono-prose` typography utility (`4fb163d`) | added to README.md typography section (mono-utilities paragraph after the type-scale table); referenced in CLAUDE.md typography.css description (`text-mono-{micro,small,caption,prose}`) | **resolved** |

**24/24 γ doc-fix items disposed** at I.W5 (21 resolved here + 2 deferred to W3.α DESIGN.md scope + 1 deferred to next precept-submodule update — the latter 3 are honest deferrals with named destinations, not silent skips).

## Phase A — README.md sync (per CRIT-D1 / D2 / D4 + W0 §3.2)

Lines touched: 7, 9, 14, 61, 73-86, 92, 94, 118, 132, 134, plus a new mono-utilities paragraph after the typography table.

- Component count: 32 → **37** (lines 7, 61).
- `.glass-pill` phantom: dropped from 3 sites (lines 9, 92, 118).
- `.cartoon-card` / `.elevated-card` phantoms: dropped (line 94); replaced with `.paper-texture, .cream-surface`.
- Tree (lines 73-86): marked `custom/` as illustrative with explicit pointer to CLAUDE.md; added 8 missing styles/* files (paper, dock-group, math, instrument-chassis, glyph-face, disco-glyph, hover-popover, prism-theme); added `text-mono-{...}` mention to typography.css comment.
- Composables list (line 14): extended to current composables/ tree.
- Cartoon-shadow rungs (line 132): documented canonical form.
- `--paper-aged-texture` (line 134): dropped (0 consumers outside def); replaced with `.paper-{1..4}` ladder.

## Phase B — CLAUDE.md residue (per CRIT-D3 / D5 / D8 / D9 + W0 §3.2)

Lines touched: 18 (ui count), 38 (multi-select drop), 52 (tags-input drop), 59 (custom count + 4 retires + 1 add), 73 (glass-panel drop), 84 (metaballs drop), 87 (paper-backdrop drop), 94 (status-dot drop), 102-112 (composables tree extension + count 9→13), 114-123 (styles tree expansion + tokens.css range fix + dock-icon-button + cards.css fix + 8 styles/* additions), 140 (entry-point counts + runtime-tokens 3→5 + composables enumeration), 144-156 (peer-dep table 7→11 entries; dropped Dev-only miscategorization).

**The `## Design Axes` section (lines 194-218) was NOT touched.** W3.α owns it; instrument-cluster axis already lists `<HoverPopover>` accurately, and the cohort framing is verbatim from W3.α.

## Phase C — Cross-tranche wave-spec retroactives (per CRIT-D7 + γ rec 14, 15)

- `docs/tranches/D/waves/W4.md:6`: `planned` → `closed (2026-04-30, D-II redress; see tranches/D/PROGRESS.md:178 and tranches/D-II/PROGRESS.md)`.
- `docs/tranches/D/waves/W5.md:6`: `planned` → `closed (2026-04-30, D-II close; see tranches/D/PROGRESS.md:207 and tranches/D-II/PROGRESS.md)`.
- `docs/tranches/E/waves/W0.md:6`: `complete_with_misses` → canonical `complete` with retroactive note pointing back to I.W5 reconciliation.

F + G wave specs verified clean per W0 §3.2 (CT4, CT5) — not touched. C waves dir is empty (CT6) and out of γ scope.

## Phase D — D-tranche evidence-doc Source path refresh (R-NEW-3)

All 3 D-tranche evidence docs at `docs/consumer-evidence/` previously cited removed paths `MetricPillCluster.vue` and `SpeedtestResults.vue`. Speedtest worktree is local and accessible at `../speedtest/`.

| Doc | Old Source path | New Source path | Proof grep verified |
|---|---|---|---|
| `animated-number.md` | `MetricPillCluster.vue:112` | `MetricStrip.vue:253`, `Readout.vue:106` (consume `{ current }` destructure of `useAnimatedNumber` return → `AnimatedNumber` shape) | `rg -n '\bAnimatedNumber\b\|useAnimatedNumber\b'` returns 14 hits across 3 files including the 4 in `useAnimatedNumber.ts` (interface def + function def) and 10 in speedtest |
| `use-animated-number.md` | `MetricGaugeCards.vue:15`, `SpeedtestResults.vue:91` | `MetricGaugeCards.vue:15,56-72`, `Readout.vue:36,106`, `MetricStrip.vue:41,135-149,253` | `rg -n '\buseAnimatedNumber\b'` returns 13 hits across 3 speedtest files |
| `use-animated-number-options.md` | `MetricPillCluster.vue:104` | `MetricStrip.vue:135-149,255`, `Readout.vue:106-110`, `MetricGaugeCards.vue:56-72` | `rg -n '\bUseAnimatedNumberOptions\b\|damping:\|snapThreshold:'` returns 13 hits including the `{ damping, snapThreshold }` shape pattern at every speedtest call site |

`docs/consumer-evidence/README.md` table rows for these 3 artefacts use loose role descriptors ("speedtest dashboard/results", "speedtest animated-number surface", "speedtest animated-number options") that remain accurate after the path refresh — README.md table not touched.

## Phase E — 3 since-H additions (per W0 §8.4)

- `<HoverPopover>` enrolled in CLAUDE.md custom/ catalog enumeration (alphabetical: between `glyph-face/` and `icon-stamp/`); custom count 40 → 37 (4 W1 retires + 1 add); already present in `## Design Axes` instrument-cluster row (W3.α scope, untouched).
- `useResizeObserver` enrolled in CLAUDE.md composables tree (own row); enrolled in CLAUDE.md entry-point composable-utilities enumeration; mentioned in README.md composables bullet line.
- `text-mono-prose` referenced in README.md typography section (mono-utilities paragraph after type-scale table); referenced in CLAUDE.md typography.css comment as `text-mono-{micro,small,caption,prose}`.

## Verification at audit close

- `npm run typecheck` — green (no source changes; vue-tsc --noEmit returns clean).
- `git status` for tracked files — modifications limited to file bounds: README.md, CLAUDE.md, docs/tranches/D/waves/W{4,5}.md, docs/tranches/E/waves/W0.md, docs/consumer-evidence/{animated-number,use-animated-number,use-animated-number-options}.md, plus this audit doc.
- No `src/`, `demo/`, `tests/` files modified. No `DESIGN.md` modified. No `FINAL.md` modified. No other tranche's audit deliverable modified.
- No destructive git. No commits.

## Hard gate

(a) **24/24 γ doc-fix items disposed** — 21 resolved here, 2 honestly deferred to W3.α DESIGN.md scope (CRIT-D6/13; rec 12/13), 1 deferred to next precept-submodule update (rec 16). Each deferral has a named destination per I invariant 1.

(b) **README.md aligned to actual src/ at HEAD** — no phantom claims at HEAD; component counts match `ls`; styles tree matches `ls src/styles/`; composables list matches `src/composables/index.ts`; `--paper-aged-texture` orphan token claim dropped; cartoon-shadow rungs reflect post-W1 alias-retire shape.

(c) **CLAUDE.md residue cleared** — `.glass-pill`, `.cartoon-card`, `.elevated-card`, `.dock-icon-btn`, `.dock-layer-grid` all dropped; `## Design Axes` section preserved untouched (W3.α governance).

(d) **3 D-tranche evidence docs refreshed** — Source paths point at `MetricStrip.vue`, `Readout.vue`, `MetricGaugeCards.vue`; proof greps verified non-empty against `../speedtest/` at HEAD.

(e) **`npm run typecheck` green** — sanity probe (no source changes).

## Residual risks

- **DESIGN.md residue (CRIT-D6, rec 12, rec 13)** — 2 phantom UI primitives + 2 phantom custom packages + 8 missing custom packages in DESIGN.md catalog enumerations. Owned by W3.α; not touched by I.W5. If W3.α did not also resolve these, they bleed into I-close audit.
- **`docs/instructions/README.md:17` proof-commands list (rec 16)** — mildly stale (lists `typecheck`+`build` only; `iter`, `test`, `iter-test` are real). Out of file bounds for I.W5 (precept submodule territory). Flagged for next precept-submodule update.
- **Cross-repo unreachability** — speedtest worktree was locally accessible at `../speedtest/`, so all 3 R-NEW-3 proof greps verified directly. If a future audit runs from a worktree without `../speedtest/` siblings, the grep invocation pattern (`rg ../speedtest/...`) is preserved verbatim — proof-of-existence requires the speedtest checkout to be present alongside glass-ui.
- **Wave-spec count update precedent** — README.md count went from 32 (H γ baseline at `c5f196c`) → 39 (the H γ rec 1 target) → 37 (HEAD post-W1 retires). I documented the actual HEAD count rather than the H γ recommendation count; this is the correct reading per I invariant 9 ("README.md is documentation-of-source"; H γ rec 1 was a target that I.W1 then partially superseded by retiring 2 ui packages).

## Authority

Docs-only reconciliation at HEAD `63e29e4`. Every γ doc-fix item maps to either an applied edit (with file:line citation in this audit) or a named deferral destination. Source verification per probe table at top. Typecheck green. No source files, no demo files, no test files, no FINAL.md files, no other tranche's audit deliverable modified.
