# L.W5 Lane A — Doc cohort + K R3 + K R4 proof

**Wave**: L.W5 Lane A — doc cohort alignment with v1.0 HEAD; K residuals R3 (wave-spec status lines) + R4 (`--surface-tint` rung gaps) absorbed.
**Date**: 2026-05-11.
**Base ref**: post-L.W4 + L.W6 close (`fa6e6c7` + parallel-wave merges per L PROGRESS.md).
**Hard-gate target**: CLAUDE.md + README.md + DESIGN.md + CHANGELOG.md aligned with v1.0 HEAD; K R3 (12 wave-spec status lines) bumped; K R4 (4 P1 `--surface-tint` rung sites) Option A migrated.

---

## § CLAUDE.md — sections updated

Five sections rewritten or extended; cherry-picked changes preserve unaffected sections (Component architecture / Dock orientation / Slider keep-dock-open / Consumer wiring all untouched at HEAD).

| Section | Change |
|---|---|
| `## Build` | Added `npm run verify-export-types` line (L.W0 Lane III release-script clause). |
| `## Structure` — top-level `src/` tree (lines 16-22) | Added `src/api/`, `src/dark.ts`, `src/keyboard.ts`, `src/carousel.ts`, `src/forms.ts` as named entries; `src/index.ts` description bumped to "v1.0 curated public barrel (vueuse-free)". |
| `## Structure` — `composables/` tree (the formerly 23-composables-6-sub-tree block) | Rewritten to enumerate the 8 v1.0 sub-trees (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`) with member listings per sub-tree. Pre-L flat top-level files removed; barrel `index.ts` description bumped to internal-barrel-of-8-sub-trees. Retired references to `pagination/`, `virtual/`, `useStoryDemo.ts`. |
| `## Entry point` | Rewritten — v1.0 curated public barrel; vueuse-free SCC closure narrative; 7-package custom cherry-pick named; sidebar types hoist note retained. |
| `## Subpath surface` | Full rewrite — three-layer import-shape grammar (root barrel · 38 flat per-package subpaths · `/api` discovery layer); v1.0 vueuse-bearing flat subpaths (`/forms`, `/dark`, `/keyboard`, `/carousel`); v1.0 retirements (`/composables/dark`, `/composables/keyboard`, `/pagination`, `/virtual`); naming-pair disambiguation (`dock` vs `dock-group`; `glass-carousel` vs `carousel`). Cites `MIGRATION.md`. |
| `## Design Axes` | Bumped from "5 axes at K close" to "8 axes at v1.0 (L close)"; added axes 6 (vueuse-free root barrel; HEADLINE), 7 (subpath publication is binary; L.W0 Lane III), 8 (MIGRATION.md binding). |
| `## Demo storybook chassis (demo-private)` | `useStoryDemo` line updated to note L.W2 Lane A demotion to `demo/composables/useStoryDemo.ts`; `<DockShowcaseFrame>` retire note already present (no change needed). |

---

## § README.md — sections updated

| Section | Change |
|---|---|
| `## Features` — composables bullet | Rewritten to enumerate the 8 sub-trees; pre-L "23 public composables" headline retired. |
| `## Usage` — code block | Expanded to show v1.0 vueuse-bearing flat subpaths (`/dark`, `/keyboard`, `/carousel`, `/forms`) + the `/api` discovery layer import; root-barrel `useKeyboardShortcuts` reference retired. |
| `## Structure` — composables tree | Rewritten to mirror the CLAUDE.md 8-sub-tree shape; pre-L flat top-level files removed. |
| `## Subpath imports` | Full rewrite — 38 flat subpaths count corrected (from "29 active subpaths"); v1.0 vueuse-bearing flat subpaths section; `/api` discovery layer; explicit v1.0 retirement note (`/composables/{dark,keyboard}` + `/pagination` + `/virtual`); MIGRATION.md citation. |

---

## § DESIGN.md — sections updated

| Section | Change |
|---|---|
| `### Composables (src/composables/)` (lines 980-1009) | Full rewrite — pre-L "23 public composables across 6 sub-trees + 8 top-level files" replaced with "v1.0 restructures composables into eight coherent sub-trees per L.W2 Lane A". Sub-tree-by-sub-tree enumeration; `v1.0 retires` block (useOffsetPagination / useVirtualSection / useWindowedStore / virtualSectionLayout / useStoryDemo); cross-repo speedtest-WIRED rationale for the 3 motion composables. |
| `## Subpath surface` (lines 1057-1127) | Full rewrite — three-layer architecture (root barrel · flat subpaths · `/api`); v1.0 flat-subpath grammar; canonical-vueuse-bearing-subpaths table updated (4 surfaces); SCC closure mechanism + speedtest re-link evidence; naming-pair disambiguation; v1.0 subpath retirements; updated authoring rules (publication gate per L invariant 18); CSS cascade documentation pointer (L.W2 Lane B). |

---

## § CHANGELOG.md — v1.0 entry final shape

The v1.0.0 — unreleased stanza now contains, in order:

1. L.W1 HEADLINE intro (pre-existing).
2. `### BREAKING — Lane C (subpath flatten)` (pre-existing — Lane C wave commit).
3. `### ADDED — Lane C (carousel subpath)` (pre-existing).
4. `### BREAKING — W3 retirements (Lane A — composables)` (pre-existing — W3 close commit).
5. `### KEPT — W3 Lane A (cross-repo wired)` (pre-existing).
6. `### BREAKING — W3 retirements (Lane B — primitives)` (pre-existing).
7. `### ADDED — Lane B (primitive second-consumer wiring)` (pre-existing).
8. `### Production demo build — formal retire (L.W5 Lane B Option B)` (pre-existing — Lane B authored).
9. **NEW** `### L.W2 — Composables restructure (Lane A)` — Lane A appends here.
10. **NEW** `### L.W2 — Cohesion + import-shape annotations (Lane B)` — Lane A appends here.
11. **NEW** `### W4 — Mobile-viewport finishing` — Lane A appends here.
12. **NEW** `### W6 — Lighthouse cohort completion` — Lane A appends here.
13. **NEW** `### L.W5 — Doc cohort + K residual absorption (Lane A)` — Lane A appends here.

The five new Lane A sections sit after the Lane B production-demo-build entry (cooperative-append pattern). v0.9.4 stanza unchanged (sits below v1.0).

---

## § K R3 — wave-spec status lines bumped

**K wave files** (12 status lines bumped — full coverage of `docs/tranches/K/waves/W*.md`):

| File | Pre-L.W5 status | Post-L.W5 status |
|---|---|---|
| `K/waves/W0.md` | open | CLOSED `f5cdd53` (precept submodule advance) |
| `K/waves/W1.md` | pending W0 | CLOSED `563b200` (hoverOpenDelay rename) |
| `K/waves/W2.md` | pending W1 | RETIRED 2026-05-09 (V-tranche absorbed) |
| `K/waves/W3.md` | pending W1 | CLOSED — Lane A `76fff65` + Lane B `11a30d3` |
| `K/waves/W4.md` | pending W0 | CLOSED — Lane A `36305da` + Lane B `8a04a2b` |
| `K/waves/W5.md` | pending W1 | CLOSED `12abb09` |
| `K/waves/W6.md` | pending W0 | CLOSED `154d1d2` (K HEADLINE) |
| `K/waves/W7.md` | pending W1 | CLOSED `2197596` |
| `K/waves/W8.md` | pending W2 + W3 + W4 + W5 + W6 + W7 | CLOSED `35cae2c` |
| `K/waves/W-V.md` | pending W0 | CLOSED `14266b5` |
| `K/waves/W-P.md` | pending W1 | CLOSED `8ec320b` |
| `K/waves/W-S.md` | planned | CLOSED `a598b90` (Phase 1 only; Phase 2 at L.W1) |

**L wave files** (7 closed-wave status lines bumped; W5 marked IN FLIGHT; W7 + W8 left as pending):

| File | Pre-L.W5 status | Post-L.W5 status |
|---|---|---|
| `L/waves/W0.md` | open | CLOSED (TBD orchestrator commit) — Lane I + II + III + IV |
| `L/waves/W1.md` | pending W0 | CLOSED (TBD) — Lane A + B + C; v1.0 tag |
| `L/waves/W2.md` | pending W1 | CLOSED (TBD) — 8 sub-trees + cherry-pick rationale |
| `L/waves/W3.md` | pending W1 (parallel with W4) | CLOSED (TBD) — Lane A + B wire-or-retire |
| `L/waves/W4.md` | pending W1 (parallel with W3) | CLOSED (TBD) — dock-group audacious scroll |
| `L/waves/W5.md` | pending W2 + W3 | IN FLIGHT 2026-05-11 |
| `L/waves/W6.md` | pending W1 (parallel with W3 + W4) | CLOSED (TBD) — 4 K-absorbed Lighthouse cohort re-verified |

Total status lines bumped: **19** (12 K + 7 L).

---

## § K R4 — `--surface-tint` rung gap absorption

**Disposition**: Option A (default per W5 spec Step 6) — define new rungs in `src/styles/tokens.css` + Tailwind bridge in `src/styles/theme.css`; migrate the 4 sites to canonical token vocabulary.

**Rationale for Option A over Option B**: site count = 4 (≤ 6 threshold). Token-family cohesion outweighs the small token-set extension cost. Per L invariant 4 (no legacy aliases), the literal `color-mix(in srgb, var(--foreground) {35,40,70}%, transparent)` expressions retire from production code; canonical `var(--surface-tint-{35,40,70})` substitutes.

### Token additions

- `src/styles/tokens.css` — appended `--surface-tint-35` + `--surface-tint-40` + `--surface-tint-70` after `--surface-tint-25`. Comment block cites L.W5 + K R4 + `audit/W5-A-doc-cohort-proof.md`.
- `src/styles/theme.css` — appended `--color-surface-tint-35` + `--color-surface-tint-40` + `--color-surface-tint-70` to the Tailwind bridge alongside the existing rung family.

### Sites migrated (4)

| File | Line | Pre-L.W5 | Post-L.W5 |
|---|---|---|---|
| `src/components/ui/slider/Slider.vue` | 163 | `color-mix(in srgb, var(--foreground) 40%, transparent)` (slider thumb border default) | `var(--surface-tint-40)` |
| `src/components/custom/timeline/GlassTimeline.vue` | 172 | `color-mix(in srgb, var(--foreground) 40%, transparent)` (`.glass-track:hover .glass-thumb` background) | `var(--surface-tint-40)` |
| `src/components/custom/tabs/UnderlineTabs.vue` | 110 | `color-mix(in srgb, var(--foreground) 70%, transparent)` (`.underline-tab:hover` color) | `var(--surface-tint-70)` |
| `src/styles/glass.css` | 220 | `color-mix(in srgb, var(--foreground) 35%, transparent)` (`.input-pill::placeholder` color) | `var(--surface-tint-35)` |

### Verification

```
$ rg "color-mix\(in srgb, var\(--foreground\) (35|40|70)%" src/
(no matches)
```

Every literal {35,40,70}% expression migrated. Token-family cohesion: complete.

---

## § Verification status

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS (vue-tsc --noEmit; clean) |
| `npm test` | PASS — 330/330 tests across 27 files |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | PASS — `✓ built in 31.21s`; dts declaration files built in 30342ms |
| `npm run profile:budget` | PASS — `glass-ui.js` raw 123.75 kB / 190 kB (65.1%); gzip 22.16 kB / 33.7 kB (65.8%) · `glass-ui.css` raw 22.50 kB / 29 kB (77.6%); gzip 4.43 kB / 5.75 kB (77.0%) |

The K R4 surface-tint token migration introduced no bundle delta (CSS-only refactor; tokens already defined per same pattern).

---

## § Worktree diff at L.W5 Lane A close

```
$ git status --short
 M CHANGELOG.md
 M CLAUDE.md
 M DESIGN.md
 M README.md
 M docs/tranches/K/audit/W4-bundle-profile.json   # side-effect of profile:budget
 M docs/tranches/K/waves/W-P.md
 M docs/tranches/K/waves/W-S.md
 M docs/tranches/K/waves/W-V.md
 M docs/tranches/K/waves/W0.md
 M docs/tranches/K/waves/W1.md
 M docs/tranches/K/waves/W2.md
 M docs/tranches/K/waves/W3.md
 M docs/tranches/K/waves/W4.md
 M docs/tranches/K/waves/W5.md
 M docs/tranches/K/waves/W6.md
 M docs/tranches/K/waves/W7.md
 M docs/tranches/K/waves/W8.md
 M docs/tranches/L/waves/W0.md
 M docs/tranches/L/waves/W1.md
 M docs/tranches/L/waves/W2.md
 M docs/tranches/L/waves/W3.md
 M docs/tranches/L/waves/W4.md
 M docs/tranches/L/waves/W5.md
 M docs/tranches/L/waves/W6.md
 M src/components/custom/tabs/UnderlineTabs.vue
 M src/components/custom/timeline/GlassTimeline.vue
 M src/components/ui/slider/Slider.vue
 M src/styles/glass.css
 M src/styles/theme.css
 M src/styles/tokens.css
?? docs/tranches/L/audit/W5-A-doc-cohort-proof.md
```

29 files modified + 1 file created (this proof). The bundle-profile JSON delta is incidental (profile:budget rewrites it on every run; not a deliberate edit).

Lane A bounds compliance:
- TOUCHED: CLAUDE.md, README.md, DESIGN.md, CHANGELOG.md (doc cohort).
- TOUCHED: `docs/tranches/K/waves/W*.md` (12) + closed `docs/tranches/L/waves/W{0..4,6}.md` (6 + W5 self) (K R3 absorption).
- TOUCHED: `src/styles/{tokens,theme,glass}.css` + 3 component .vue files (K R4 Option A).
- NOT TOUCHED: `MIGRATION.md` (Lane B territory — confirmed not modified at HEAD; Lane B authored at W3 close per CHANGELOG references).
- NOT TOUCHED: `vite.demo.config.ts` (does not exist; Lane B chose Option B retire — no script).
- NOT TOUCHED: W6 territory (Lighthouse cohort done — `audit/W6-lighthouse-completion-proof.md` already at HEAD).
- NOT TOUCHED: W7 territory (Configurator cloneMode + aurora chrome unification + keyframes lift — pending W7 dispatch).

---

## § Open questions for orchestrator

1. **CHANGELOG.md ordering coordination** — Lane B already touched CHANGELOG.md (production-demo-build retire section, lines 117-133). Lane A appended its W2/W4/W6/W5 sections after Lane B's. If the orchestrator wants a strict commit-order or chronological order (W2 should precede W3 chronologically), the section order can be re-shuffled — the content is independent of position.

2. **L.W5 wave-status reflexive bump** — Lane A bumped its own wave's status line from "pending W2 + W3" to "IN FLIGHT 2026-05-11". The orchestrator's W5 close commit will further bump this to "CLOSED `<commit>`". Standard pattern.

3. **L wave close commits placeholder** — every L closed-wave status line carries "(TBD orchestrator commit)" because PROGRESS.md tracks commit hashes as TBD. The orchestrator's L W8 close ceremony (or per-wave commits if they land in sequence) should substitute the real commit hashes.

4. **MIGRATION.md citation in CHANGELOG** — Lane A's new sections cite MIGRATION.md as binding. Lane B authored MIGRATION.md at W3 close per the W3-A + W3-B proof docs. If Lane B's L.W5 phase appends additional sections (e.g. the surface-tint Option A migration note, the production-demo-build retire), MIGRATION.md gains those at Lane B's W5 commit. Lane A does not touch MIGRATION.md.

5. **K R4 negative-control** — `rg "color-mix\(in srgb, var\(--foreground\) (35\|40\|70)%" src/` returns zero matches post-migration. Demo + tests not swept (R4 was scoped to src/ per W5 spec); if demo/ stories carry the same literal expressions, they're either token-aware demo migrations (already on canonical vocab) or downstream W5 Lane A passes. The wave hard gate only names the 4 src/ sites.

6. **K WP / WV / WS naming in PROGRESS** — K PROGRESS.md uses `W-P`, `W-V`, `W-S` filenames but `WP`, `WV`, `WS` in the table headings. The bumped status lines use the heading naming (per L.W5 Step 5 of the task brief: "W-{V,P,S}.md if they exist"). Both forms now coexist in the docs; harmless.

---

## § Authority

Lane A operated under the hardened agent git clause — read-only git only (`git -C ... log --oneline --grep`, `git status --short` for self-check). No `git add` / `commit` / `stash` / `checkout` / `reset` / `restore` invoked. Orchestrator owns the index + the W5 close commit `docs(tranche-l/w5): v1.0 doc cohort + MIGRATION.md + production-demo-build decision`.

**Read sources**: `docs/tranches/L/L.md`, `docs/tranches/L/waves/W5.md`, `docs/tranches/L/audit/W{0..6}-*.md`, `docs/tranches/L/PROGRESS.md`, `docs/tranches/K/PROGRESS.md`, `docs/tranches/K/waves/W*.md`, current `CLAUDE.md` + `README.md` + `DESIGN.md` + `CHANGELOG.md`, `src/index.ts`, `src/composables/index.ts` + sub-tree barrels, `src/styles/{tokens,theme,glass}.css`, `src/components/{ui/slider,custom/timeline,custom/tabs}` source files.
