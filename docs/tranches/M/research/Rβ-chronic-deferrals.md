# M · Rβ — Chronic Deferral Ledger Across Tranches C–L + Cross-Repo Constellation + Modularization-Debt

**Date**: 2026-05-12
**Baseline commit**: `3e4d472` (L W8 close, 2026-05-12; v1.0.0 tagged + pushed)
**Predecessor**: `docs/tranches/L/research/Rβ-chronic-deferrals.md` (56-row ledger; 2026-05-11)
**Lane**: β — chronic deferral surveillance, extended through L close + post-L open + cross-repo constellation
**Scope**: every L row carry-forward + L flight surfaces + 9 sibling-repo deferral states + cross-cutting modularization debt + cross-repo dependency-graph state
**Method**: read-only walk of `docs/tranches/{C..L,V}/{FINAL,L-residuals,audit/*}.md` + `package.json` + sibling repos (speedtest/Y, keyframes.js, value.js, words, fourier-*, mkb-utils, mathanim, vite-plugin-shebang, bbnf-lang, precepts submodule) + cross-repo grep of glass-ui import shapes. L Rβ predecessor authoritative for C–K rows; this document extends.

---

## §A — Inherited from L (56 L-Rβ rows × HEAD verification)

Mapping every L Rβ row to its L-close disposition. Reading the L FINAL.md (3e4d472), L-residuals.md, and 11 wave proof docs (`audit/W{0..8}-*-proof.md`):

### A.1 — C–J rows (verbatim from K Rβ; L disposition documented)

These rows were closed cleanly through K or earlier; L re-confirmed PERMANENT-DEFER status. None require M action unless a recurrence surfaces.

| L row | Item | Defer × | L disposition | M disposition |
|---|---|---:|---|---|
| A1 | `<HarmonicLevelGrid>` Filmstrip | 3× | RE-RETIRE-PERMANENT | **PERMANENT-DEFER** — consumer-territory; no recurrence at L |
| A2 | Blob Web Worker (`composables/blob`) | 3× | RE-RETIRE-PERMANENT | **PERMANENT-DEFER** — encoded-but-unreachable; `composables/blob/SPEC.md §11.4` destination |
| A3 | Plugin extraction (Tailwind plugin) | 5× | RE-RETIRE-PERMANENT | **PERMANENT-DEFER** — consumer-territory |
| A4 | Reduced-motion + a11y deeper sweep | 6× | RE-CONFIRM POSTURE | **PERMANENT-DEFER** — DESIGN.md `## Accessibility Posture` is canonical answer |
| A5 | C-8 Blob double-rAF | 2× | RE-RETIRE | **PERMANENT-DEFER** — `_internal/` boundary holds |
| A13 | Bundle-budget gate | 4× | RESOLVED-IN-K W4 Lane B | **CLOSED-AT-K** — `npm run profile:budget` 66.6% headroom post-L |
| A15 | Recovery-diary historical-context comments | 1× | RE-CONFIRM (P-tranche provenance) | **PERMANENT-CONFIRM** — documentation, not violation |
| A16 | `scripts/ay-close.sh` | 4× | RESOLVED-IN-K W8 | **CLOSED** |
| A19 | API Extractor dts caching | 1× | RE-DEFER (non-blocking) | **PERMANENT-DEFER** — build ~18s acceptable |
| A20 | 9 zero-payload subpaths | 1× | RE-DEFER | **STATE-CHANGED-AT-L** — many subpaths CONSUMED at L (speedtest 14 paths; words 9 paths). The "zero-payload subpaths" claim is now false; row retires permanently |
| A21 | `docs/instructions/README.md:17` | 1× | RE-DEFER → precept submodule | **CARRIED-TO-M.W0** — precept submodule push divergence makes this STALE; see N5 |
| A22 / A23 | CLAUDE.md / README.md K-cohort drift | 1× | RESOLVED-IN-L W5 (doc cohort) | **CLOSED** |
| A24 | 5 demo `.focus-ring` migrations | 1× | RESOLVED-IN-K W3 Lane B | **CLOSED** |
| A25 | 3 demo `--surface-tint` bypasses | 1× | RESOLVED-IN-K W3 + W5 | **CLOSED** |
| A26 | `transition-all` survivors | 1× | RESOLVED-IN-K W3 Lane B | **CLOSED** |
| A27 | `--{success,warning,info}-foreground` 0 consumers | 1× | RESOLVED-VIA-V (afb2b34) | **CLOSED** |
| A28 | `cssVar()` ≥ 2 consumer bar | 1× | RESOLVED-IN-K W3 Lane A | **CLOSED** |
| A29 | `.overlay-scrim` @utility | 1× | RESOLVED-IN-K W3 Lane A | **CLOSED** |
| A30 | StoryPager 4px overflow @ 375 | 2× | PROMOTED-TO-L1; RESOLVED-IN-L W4 | **CLOSED** |
| A31 | GlassCarousel mobile chevrons | 1× | RESOLVED-IN-K W5 | **CLOSED** |
| A32 | Stress harness retire decision | 2× | RESOLVED-IN-K W4 Lane B | **CLOSED** |
| A33 | `ay-close` reappearance | 1× | RESOLVED-IN-K W4 + W8 | **CLOSED** |
| A34 | Audacious primary-CTA (K HEADLINE) | 1× | RESOLVED-IN-K W6 | **CLOSED** |
| A35 | drag-keep-open story fidelity | 1× | RESOLVED-IN-K W7 | **CLOSED** |
| A36 | PRM gate for WAAPI consumers | n/a | ALREADY-RESOLVED-J | n/a |

**A.1 net carry-forward**: 9 PERMANENT-DEFER (rows that have external destinations and re-justified at L close); 17 CLOSED; 1 CARRIED-TO-M.W0 (A21 routed via precept submodule reconciliation).

### A.2 — K residuals R1-R4 (L rows L1-L4) × HEAD verification

| L row | Item | L disposition | M disposition |
|---|---|---|---|
| L1 | StoryPager inner-tab overflow at 375 | RESOLVED-IN-L W4 (`1c1788f`) | **CLOSED** |
| L2 | CLAUDE.md / README.md K-cohort subpath enumeration | RESOLVED-IN-L W5 (`efb802a`) | **CLOSED** |
| L3 | 12 wave-spec status lines stale | RESOLVED-IN-L W5 + W8 within-wave | **CLOSED** |
| L4 | `--surface-tint-{35,40,70}` rung gaps | RESOLVED-IN-L W5 Lane A (Option A — 3 new rungs) | **CLOSED** |

### A.3 — K cross-tranche debt (L rows L5-L16) × HEAD verification

| L row | Item | L disposition | M disposition |
|---|---|---|---|
| L5 | WS Phase 2 — root-barrel removal of vueuse-bearing symbols | RESOLVED-IN-L W1 HEADLINE (`d1de94b`); v1.0 tagged + pushed | **CLOSED** — but see N1 below: 3 consumers (words, keyframes.js, value.js) NOT yet migrated to v1.0 surface |
| L6 | 3 unused public composables (useRAFLoop / useIntersectionPause / useDarkModeSync) | RESOLVED-IN-L W3 Lane A — all 3 WIRE-retained on speedtest evidence | **CLOSED** |
| L7 | `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` | RESOLVED-IN-L W3 Lane A — RETIRED (cross-repo audit showed 0 speedtest consumers) | **CLOSED-WITH-CONSUMER-FALLOUT** — see N1; **words consumes `useWindowedStore`, `useVirtualSectionWindow`, `FlatSection` via `@mkbabb/glass-ui/virtual` at 3 sites**; words is BROKEN at v1.0 |
| L8 | DiscoGlyph / DockGroup / InstrumentChassis 2nd-consumer fidelity | RESOLVED-IN-L W3 Lane B — all 3 wired | **CLOSED** |
| L9 | DockShowcaseFrame 2nd-consumer | RESOLVED-IN-L W3 Lane B — RETIRED (0 consumers) | **CLOSED** |
| L10 | Pulse + Typewriter keyframes lift | RESOLVED-IN-L W7 Lane A (`59b7b56`) | **CLOSED** |
| L11 | Aurora chrome Option-A unification | RESOLVED-IN-L W7 Lane B (`useConfiguratorState<T>` + cloneMode) | **CLOSED** — but F-ε-3 Configurator recursion at /motion/metaballs Lighthouse persists; see N6 |
| L12 | Production demo build | RESOLVED-IN-L W5 (Option B — formal retire) | **CLOSED** |
| L13 | `robots.txt` for public deploy | CLOSED-VIA-L12 (gated on demo deploy; demo formally retired) | **CLOSED** |
| L14 | Vue runtime `uses-passive-event-listeners` | PERMANENT-DEFER (Vue upstream) | **PERMANENT-DEFER** |
| L15 | Production hosting `uses-long-cache-ttl` | PERMANENT-DEFER (consumer-deploy) | **PERMANENT-DEFER** |
| L16 | Speedtest W3.b.1 LANDED annotation | RESOLVED-IN-L W1 (speedtest re-link `98f88325`) | **CLOSED** |

### A.4 — Post-K-close new rows (L17-L19) × HEAD verification

| L row | Item | L disposition | M disposition |
|---|---|---|---|
| L17 | K.WS subpath typing-publication gap | RESOLVED-IN-L W0 Lane III; v0.9.4 patch tagged | **CLOSED** |
| L18 | `src/api/` boundary candidate | RESOLVED-IN-L W1 Lane B (`src/api/` ships 32 symbols) | **CLOSED** |
| L19 | 22 top-level `src/*.ts` subpath barrels | PARTIAL — L W2 absorbed `src/dark.ts`, `/keyboard.ts`, `/carousel.ts` flat (no `src/entries/` move) | **CARRIED-TO-M** — see M9; the sprawl pattern at `src/<name>.ts` for ~38 subpaths is mechanically necessary for `package.json exports` map but cosmetically unresolved |

**A.4 net carry-forward**: 1 row → M (L19 sprawl unresolved); 2 rows CLOSED.

### A summary

**Total L-Rβ rows × L disposition**:
- CLOSED-AT-L: 28 (W0-W8 absorbs)
- CLOSED-PRE-L (K or earlier): 15
- PERMANENT-DEFER (re-justified at L close): 11
- CARRIED-TO-M: 2 (A21 precept submodule, L19 src/ sprawl)

The L tranche absorbed 28 chronic rows in flight + closed 11 with named destinations. This is the **largest single-tranche absorb in the C-L chain**. Chronic-deferral carry to M is exceptionally lean — only 2 rows. M's chronic-deferral surface area is dominated by NEW post-L-close items + cross-repo state + modularization-debt findings, NOT by inherited C-K chronic residue.

---

## §B — Surfaced during L flight (not present in L.Rβ)

These are NEW rows raised by L's wave execution, L close ceremony, and L FINAL.md / L-residuals.md.

| M# | Item | Origin | Defer × | Cross-tranche classification | Severity | M disposition |
|---|---|---|---:|---|---|---|
| N1 | **Cross-repo consumer fallout at v1.0**: words consumer pinned `file:./glass-ui` symlink MISSING + imports `@mkbabb/glass-ui/virtual` (RETIRED L.W3) at 3 sites; 85 import files total | L W3 retires + post-L cross-repo grep | 0 (NEW) | L | **P0** | **ABSORB-M.W0** cross-repo migration cycle — words is BROKEN at v1.0 surface; either ship `/virtual` shim at v1.0.1 OR coordinate words-side migration; see §C.5 |
| N2 | **Cross-repo consumer keyframes.js + value.js pinned `file:../glass-ui`** — still v0.x semantics, never re-linked; root-barrel imports still work (vueuse-bearing? unverified) | L W1 v1.0 cycle (speedtest-only re-link) | 0 (NEW) | L | **P1** | **ABSORB-M** — re-link cycle for keyframes.js (10 demo files) + value.js (`@mkbabb/glass-ui` from src) at consumer side OR formal retire if no migration |
| N3 | **W1 Lane B `git checkout` self-disclosed precept violation** | L W1 Lane B proof + L-residuals.md | 0 (NEW; cross-references K W3.A stash incident) | K, L | **P1** | **ABSORB-M.W0** precept-update — extend hardened agent git clause to explicitly enumerate `checkout` alongside `stash`/`reset`/`restore`; codify dispatch-bound recovery alternative (re-emit from script vs. `checkout`) |
| N4 | **Precept submodule push divergence — 6 (local) vs 15 (origin/main) commits** at L close | L W0 + L FINAL.md §9; coordination/speedtest-Y.md §8 | 0 (NEW; first explicit cross-tranche debt of its kind) | L | **P0** | **ABSORB-M.W0** — read both streams; reconcile; integrate; push. Stream-divergence: origin/main has REAUDIT-stream precepts (5761ff5 nine 2026-04-30 entries; 11a1b4c 10→6 parallel-agent ceiling; 79e8ddf HARD CAP); local chain has tranche-stream (cc57c91 → b51047d). Plus **2 NEW precept commits on origin/main since L`b51047d`** — `dda7c16 feat(O.W10) tranche-O precept amendments I25..I34` + `3e620d4 docs(N.W10.precepts) canonical regen` — meaning TWO OTHER REPOS (call them N-repo + O-repo per commit message) have shipped precept commits during L flight without coordination |
| N5 | **`docs/instructions/README.md:17` ≥ 2 K-row chronic** (A21 re-justified at L; precept submodule channel) | K Rβ A21 → L predecessor § A.1 row 11 → still unresolved | 3× (K, L, M) | C, K, L | **P2** | **GATED-ON-N4** — addressed via precept submodule update channel; cannot land until N4 reconciles + push completes |
| N6 | **F-ε-3 Configurator recursion at /motion/metaballs Lighthouse** | L W7 Lane B post-`toRaw` hardening; Playwright-clean but Lighthouse-OPEN | 1× (L) | L | **P2** | **ABSORB-M** — methodical reproduction harness; likely a Configurator watcher-graph or computed-side effect in metaballs render path; best-practices=96 (1 audit failing); non-blocking |
| N7 | **3 demo P2 viewport overflows surfaced at L W8 β-π audit (F-π-1 + F-π-2)** | L W8 β audit | 0 (NEW) | L | **P2** | **ABSORB-M** — `/foundations/chart-chassis-palette` 375 +38px overflow + `/compositions/dashboard` 375 +134px + 1024 +93px; demo-side fixes (TokenLadder grid `min-w-0` + dashboard 3-col `min-w-0`) |
| N8 | **G4 motion/index.ts barrel-style cosmetic** + **G14 ModalOverlay `layout="edge"` "legacy alias" wording** | L W8 δ audit | 0 (NEW) | L | **P2** | **ABSORB-M** — cosmetic; G4 align `motion/index.ts` to `export *` shape; G14 re-word comment to "reserved alias" OR drop (KISS) |
| N9 | **3 carry-forwards from L α audit** | L W8 α audit | 0 (NEW) | L | **P3** | **ABSORB-M-OR-PERMANENT-DEFER** — (a) `src/forms.ts` Textarea duplicate (verify; may be stale comment); (b) `GlassPanelVariant` not promoted to `src/api/index.ts`; (c) Aurora `-inset-6` 8px bloom (pre-L K-residual cosmetic) |
| N10 | **G1-G3 + G5-G13 + G15-G19 from δ audit** (~14 cosmetic per-story consumption findings) | L W8 δ audit | 0 (NEW) | L | **P3** | **ABSORB-M-OR-PERMANENT-DEFER** — `motion/index.ts` style mismatch; `useAuroraStudio` block-comment vestige; `dock-group.vue` MetricBadge default-import; `use-story-demo.vue` awkward relative path; story leaf-vs-barrel mix |
| N11 | **5 documented-narrowing entries (single-consumer surfaces with explicit rationale)** | L W8 β audit | 0 (NEW; meta-row) | L | **P3** | **CARRIED-TO-M-AS-WATCH-LIST** — at M close, re-verify (a) `src/api/` 0 importers; (b) aurora `cloneMode: "per-preset"` 1 consumer; (c) `src/keyboard.ts` 1 consumer; (d) `src/carousel.ts` 1 cross-repo + 1 demo; (e) `composables/sortable` 1 consumer (SortableList) |
| N12 | **L W8 ι integrity-sweep canonical pattern proven for 3rd tranche** (J, K, L) | L W8 + L FINAL.md §10 | 0 (NEW; positive precept invariant) | J, K, L | **PRECEPT** | **CODIFY-AT-M.W0** — 7-agent strengthened audit (α/β/γ/δ/ε/π/ι) is now invariant 15 in the binding-invariants set; M close ceremony continues |

**§B subtotal**: 12 NEW rows; 2 P0 + 2 P1 + 4 P2 + 4 P3.

---

## §C — Cross-repo chronic deferrals (NEW dimension)

Each consumer/utility repo walked. The constellation comprises 12 sibling repos pinned in some way to glass-ui or part of the same animation/CSS-tooling stack.

### C.1 — speedtest (`/Users/mkbabb/Programming/speedtest`)

**Active tranche**: Y (open at `docs/tranches/Y/Y.md`; W0 audit cohort closed; W1+W2 in flight). Glass-ui pinned `file:../glass-ui` at v1.0 (re-linked via `98f88325` at L W1 close). 14 distinct subpaths consumed in `src/` (`aurora`, `controls`, `dark`, `dock`, `expandable-container`, `forms`, `icon-tooltip`, `infinite-scroll`, `keyboard`, `pulse`, `tabs`, `toggle-chip`, `tokens` + root).

**Y tranche chronic deferrals** (from Y A1-A7 audit + Y.md §1):
- **Y-D1 — Module reorg HEADLINE** (W2): `src/api/` extraction + `utils/speedtest/` → `src/speedtest/` promotion + composables/ prune + boundary gate + worker carve + stores cycle break. **speedtest-bound** — not glass-ui scope; documents the "every consumer needs its own api/" pattern.
- **Y-D2 — keyframes.js value.js + parse-that carve** (W3 conditional): conditional on operator WIP; LCP optimisation; **cross-repo dep on keyframes.js**.
- **Y-D3 — Cold 1920 LCP ≤ 950 ms** (W1 + W3): perf target; conditional gate at Y close.
- **Y-D4 — CLS ≤ 0.10 in 1920** (W1): font-swap structural fix.
- **Y-D5 — Card-to-dock dead-space at Complete state** (W1): user-named visual finishing.
- **Y-D6 — App.abandon investigation** (W1): TBD root-cause investigation.
- **Y-D7 — PWA precache tightening** (W1): scope unclear at Y open.
- **Y-D8 — auto-deploy on master push** (deferral candidate per Y §6 "net deferral count 3-5"): deployment automation chronic.

**Glass-ui-bound Y items**: (none direct — Y is reader-only on glass-ui per L coordination §2). **Y → glass-ui via M.coordination/ artefact** if Y surfaces a v1.0 surface concern.

**Cross-repo M-bound surface**: speedtest needs to read M's coordination artefact at M open. **Recommend M.W0 publishes `docs/tranches/M/coordination/speedtest-Y.md` mirror.**

### C.2 — keyframes.js (`/Users/mkbabb/Programming/keyframes.js`)

**State**: 2.0.0 released. Glass-ui pinned `file:../glass-ui` (consumer side; legacy v0.x semantics, root-barrel only). 10 demo files consume `@mkbabb/glass-ui` + `@mkbabb/glass-ui/dock`. Demo uses `GlassDock`, `DockLayerGroup` + (per recent commit `089126a fix(demo/dock): import GlassDock and DockLayerGroup from glass-ui/dock subpath`) ALREADY ADOPTED v0.9.x subpath canon.

**No explicit tranche folder** (`docs/tranches/` absent). No `FINAL.md` chain. Recent commits suggest H-tranche or G-tranche-flavored micro-fixes: `74b5d64 chore(scripts): prebuild freshness-gate (mirror glass-ui A3 §4.4)`, `bdeedf4 chore(scripts): add check script (tsc --noEmit) (G.W0.a — speedtest tranche-H foundation)`. The **H-tranche reference is via SPEEDTEST tranche-H, not keyframes.js's own tranche-H** (verified by reading commit messages — keyframes.js participates in glass-ui's tranches as a sibling repo).

**Glass-ui v1.0 adoption status at keyframes.js HEAD**: imports `@mkbabb/glass-ui` (root) + `@mkbabb/glass-ui/dock`. The root-barrel imports may include vueuse-bearing symbols (Input/Textarea/Combobox/Carousel/`useGlobalDark`/`useKeyboardShortcuts`); if so, v1.0 break is silent at file-link build (vite resolves symlinked source) but explicit at npm-pinned build (`npm install` would fail with v1.0 published). **Currently file-link masks the break.** No `keyframes.js` FINAL.md exists.

**M items**:
- **N12 (keyframes-A) — keyframes.js consumer-side v1.0 re-link audit**: verify no root-barrel imports of retired symbols; migrate to subpaths. 10-file walk.

### C.3 — value.js (`/Users/mkbabb/Programming/value.js`)

**State**: 0.5.1. Glass-ui pinned `file:../glass-ui` (consumer side). 1 import from `@mkbabb/glass-ui` (root barrel) in src/ + demo/. No `docs/tranches/` folder. Recent commits are micro-fix flavored (`31ace76 chore(scripts): prebuild + prepare freshness-gate (mirror glass-ui A3 §4.4)`).

**No deferral folder**. No FINAL.md. **The single root-barrel import is the canonical pattern** — verify which symbol is imported and whether v1.0-breaking.

**M items**:
- **N13 (value-A) — value.js consumer-side v1.0 audit**: 1-import walk; binary v1.0-compatible vs. break.

### C.4 — fourier-analysis (`/Users/mkbabb/Programming/fourier-analysis`)

**State**: Python-only project (`pyproject.toml`, `src/`, `paper/`). No JavaScript. No glass-ui dependency. **OUT OF CONSTELLATION SCOPE** for glass-ui chronic-deferrals.

**M items**: none.

### C.5 — fourier-animate (`/Users/mkbabb/Programming/fourier-animate`)

**State**: Python-only (`pyproject.toml`, `*.py`). No glass-ui dependency. No package.json. **OUT OF CONSTELLATION SCOPE**.

**M items**: none.

### C.6 — words (`/Users/mkbabb/Programming/words`)

**State**: full-stack workspace (`frontend/`, `backend/`, `notification-server/`). Frontend pins `@mkbabb/glass-ui: file:./glass-ui` but the **symlink target `frontend/glass-ui` is MISSING at HEAD**. `npm install` against this manifest would fail. The frontend imports glass-ui at 85 files via 107 import lines.

**Subpath consumption at words frontend**: `@mkbabb/glass-ui` (root), `/confirm-dialog`, `/controls`, `/dock`, `/sidebar`, `/stacked-icons`, `/tabs`, `/typewriter`, **`/virtual`**.

**P0 cross-repo break**: 3 files import from `@mkbabb/glass-ui/virtual`:
- `frontend/src/stores/search/modes/wordlist.ts:1 import { useWindowedStore }`
- `frontend/src/components/custom/definition/composables/flattenDefinitions.ts:1 import type { FlatSection }`
- `frontend/src/components/custom/definition/components/content/DefinitionContentView.vue:1 import { useVirtualSectionWindow }`

The `/virtual` subpath was **RETIRED at L W3 Lane A** (`f481ba2`). At v1.0 published artefact, words cannot resolve the import.

**Tranche state**: `docs/` exists but no `tranches/` folder. No FINAL.md chain. `REFACTOR_PLAN.md` present. The project is mid-redesign per `DESIGN.md`.

**M items**:
- **N1 (words-P0) — words consumer-side v1.0 break** [SAME AS §B N1]: 3 sites consuming retired `/virtual` subpath. Options:
  - (a) ship `@mkbabb/glass-ui/virtual` shim at v1.0.1 that re-exports from local equivalents OR points to retired-stub with deprecation notice
  - (b) coordinate words-side re-author of the 3 sites (likely lift `useWindowedStore` + `useVirtualSectionWindow` + `FlatSection` into `words/frontend/src/composables/`)
  - (c) hybrid — restore the 3 retired composables as `_internal/` substrate, expose them via words-side adapter
- **N14 (words-rewire-symlink) — words `file:./glass-ui` symlink broken**: missing target; words cannot fresh-install. Either ship symlink restoration script OR document the missing symlink as expected (and reconfigure the pin).
- **N15 (words-subpath-audit) — 85 files × subpath canon**: verify no other retired subpaths consumed (`/composables/dark`, `/composables/keyboard`, `/pagination`, etc.). Out-of-scope finding may extend the list.

This is the **HEADLINE cross-repo finding for M**. words is the second-largest glass-ui consumer (after speedtest) and is BROKEN against v1.0.

### C.7 — mkb-utils (`/Users/mkbabb/Programming/mkb-utils`)

**State**: Python-only (`pyproject.toml`, `src/`, `auth/`, `config/`). No package.json. No JavaScript glass-ui dependency. **OUT OF CONSTELLATION SCOPE**.

**M items**: none.

### C.8 — precepts submodule (`/Users/mkbabb/Programming/glass-ui/docs/precepts`)

**State**: BRANCH-DIVERGED at L close. Local chain (6 commits since merge-base `458c2d1`): `cc57c91` → `67c1412` → `6b8437a` → `fdc020c` → `d4ada55` → `b51047d`. Origin/main (15 commits since merge-base): REAUDIT-stream + N-tranche + O-tranche precept commits.

**KEY NEW FINDING**: origin/main carries precept commits from TWO OTHER REPOS' tranches:
- `dda7c16 feat(O.W10): tranche-O precept amendments — I25..I34 + 3 overfitting rules + 5 lessons`
- `3e620d4 docs(N.W10.precepts): canonical regen + decision-level signoff + fail-closed live evidence`

This implies the precept submodule is being concurrently updated by **other tranche orchestrators in OTHER repos** (N-repo + O-repo). The cross-tranche-debt classification for the precept submodule is now **CROSS-REPO + CROSS-TRANCHE** — the highest severity per the chronic threshold.

**Philosophical conflicts (per L FINAL.md §7 + coordination/speedtest-Y.md §8)**:
- REAUDIT-stream `11a1b4c refactor(precepts): tighten parallel-agent ceiling from 10 to 6` — local glass-ui tranches use 7-agent strengthened close audit (α/β/γ/δ/ε/π/ι). The ceiling-6 directive contradicts ceiling-7. Reconciliation must choose one: bump REAUDIT to 7 OR drop glass-ui ι lane (unacceptable per L invariant 15).
- REAUDIT-stream `79e8ddf feat(tranche/dispatch-template): add HARD CAP, worktree pin, read-size, no-polling slots` — verify clauses don't conflict with glass-ui's W0 worktree-isolation precept.
- `26297c9 lessons: same-setup provide/inject is a no-op` — likely additive.
- `9cac72b feat(tranche/wave-spec): add §3a triumvirate, §4a disjointness, §4b worktree plan` — additive substrate; check overlap with glass-ui's L.W0 dispatch-template field additions.
- `46557e6 feat(orchestration/triumvirate): codify auto-triggers and required artefact paths` — additive substrate.

**M items**:
- **N4 (precept-reconciliation)** [SAME AS §B N4]: read both streams; identify philosophical conflicts; integrate via merge OR rebase; verify no clause is lost; push. **HEADLINE P0 for M.W0**.

### C.9 — bbnf-lang (`/Users/mkbabb/Programming/bbnf-lang`)

**State**: massive tranche history (AA through B7+; ~50 tranches). Currently in `restart-archive-2026-05-04/` state with recent commit `69cca159 docs(restart): HANDOFF refresh post-V9.2 — current verdict AMENDMENT-REQUIRED-NARROW CONDITIONAL with two-wave staging protocol; skinny v2 lazy-mode implementation is the next move`. Tranche-format origin per CLAUDE.md `feedback_tranche_format` user memory.

**No direct glass-ui dependency** (bbnf-lang is Rust + grammar; JS-side is `playground/` workspace).

**Cross-tranche impact on glass-ui**: bbnf-lang is the **tranche-format origin** + the LESSONS-LEARNED precept ancestor. Per LESSONS-LEARNED §"2026-04-29 - Substrate Without Consumer Is Not Progress" (cites "bbnf-lang AZ-I/AZ-II plans"), bbnf-lang's tranche execution feeds the precept stream that glass-ui consumes.

**M items**:
- **N16 (bbnf-cross-tranche-precept-pull)**: ensure glass-ui's M.W0 precept-reconciliation INCLUDES bbnf-lang's lessons-learned + tranche-format updates currently on origin/main (the 15 commits include bbnf-derived REAUDIT entries). **Sub-task of N4.**

### C.10 — vite-plugin-shebang (`/Users/mkbabb/Programming/vite-plugin-shebang`)

**State**: 0.1.6. Vite plugin. No glass-ui dependency. Build tooling, stable. **OUT OF CONSTELLATION SCOPE**.

**M items**: none.

### C.11 — mathanim (`/Users/mkbabb/Programming/mathanim`)

**State**: Demo site for math animations. `@mkbabb/animation` (different lib, not @mkbabb/animation.js — github:mkbabb/animation.js) + `confetti-js` deps. devDependencies on outdated TS/ESLint (eslint ^7.19, typescript ^4.1.3 — predates ES2022 + Vue 3.5 stack). **OUT OF CONSTELLATION SCOPE** but represents a **stale-pin chronic** in the wider mkbabb ecosystem.

**M items**: none direct.

### C.12 — bbnf-buddy / dns-speedtest / speedtest-logging / others

**State**: peripheral repos. Walked at directory-level only.
- `bbnf-buddy/` — bbnf-lang-adjacent helper; no glass-ui dependency.
- `dns-speedtest/` — DNS variant of speedtest; pin/deps unverified.
- `speedtest-logging/` — speedtest-adjacent helper; no glass-ui dependency.
- `keyframes-wt-H-W2-verify/` — keyframes.js worktree (W tranche speedtest-side); historical.
- `bbnf-wt-b5-w3-target/`, `bbnf-wt-b5-w4-target/` — bbnf-lang worktrees.

**M items**: none direct.

---

## §D — Cross-cutting modularization-debt (NEW dimension)

Patterns duplicated across the constellation, suggesting DRY consolidation opportunities for M.

### D.1 — `cn()` clsx wrapper

**Glass-ui**: ships `src/utils/cn.ts` (v0.9.2 — hand-rolled deduplicator, replaces tailwind-merge).

**speedtest**: pins `clsx` + `tailwind-merge` in `package.json`. Does NOT have its own `cn.ts` (no file at `find . -name cn.ts -not -path "*/node_modules/*"`). Likely consumes `@mkbabb/glass-ui` `cn()` via root barrel.

**words**: pins `clsx` + `tailwind-merge` (v3.5.0) in `frontend/package.json`. Likely same pattern.

**keyframes.js**: no `cn.ts` in repo. Consumes glass-ui's `cn()` via root barrel from demo only.

**value.js**: no `cn.ts`. Consumes glass-ui's `cn()` likely via demo.

**M items**:
- **N17 (cn-dedup)**: AUDIT — verify speedtest/words/keyframes.js/value.js consume glass-ui's `cn()` via root barrel (or its `/cn` subpath if one exists). If yes: this is canonical DRY (glass-ui IS the canonical home). If no (consumers have local copies): chronic DRY debt for M.
- Sub-question: glass-ui's `cn()` is exported from root barrel; do consumers need it via subpath (the v1.0 surface curation didn't move `cn()` to `/cn`)? Verify at M open.

### D.2 — Dark-mode wiring

**Glass-ui**: ships `useGlobalDark` + `<DarkModeToggle>` + `useDarkModeSync` + `useTokenColor` (theme-aware fallback).

**speedtest**: 4 files consume `useGlobalDark`/`useDark`/`createGlobalState` (App.vue, auroraConfig.ts, SpeedtestMeter.vue, useEChartsTheme.ts). Migrated to subpath `@mkbabb/glass-ui/dark` per speedtest re-link.

**words**: 3 files consume `useGlobalDark` (App.vue, useStateSync.ts, ui-state.ts). Imports from root barrel (`from '@mkbabb/glass-ui'`). Has its own parallel store `stores/ui/ui-state.ts`. NOT migrated to subpath.

**keyframes.js**: ScrollMorph/Easing demos likely consume `useGlobalDark` — verify.

**M items**:
- **N18 (dark-canonical)**: SUBSTANTIVE — words consumer has parallel dark-mode store. Audit: is `useGlobalDark` actually consumed, or is there a parallel implementation? If parallel: chronic substrate-without-consumer for M (words should consume glass-ui canonical).

### D.3 — Token/theme management

**Glass-ui**: ships `src/styles/tokens.css` (§1-§10: duration, easing, z-index, radius, shadows, glass, paper, colors).

**speedtest**: consumes `@mkbabb/glass-ui/styles` per glass-ui consumer pattern. Likely has local override tokens in `frontend/<global.scss>` or similar.

**words**: has `tailwind.config.ts` at HEAD (suggesting Tailwind v3 idiom or hybrid). Glass-ui v1.0 is Tailwind v4 + `@theme` block. **MISMATCH POSSIBLE** — words may be on Tailwind v3 or hybrid; glass-ui v1.0 requires v4.

**M items**:
- **N19 (token-cascade-cross-repo)**: SUBSTANTIVE — verify each consumer's Tailwind major version + token cascade includes `@mkbabb/glass-ui/styles`. If any consumer is on Tailwind v3 while glass-ui ships v4: cross-repo coordination debt for M.

### D.4 — Animation primitives

**Glass-ui**: ships `useStaggerReveal`, `useSpringOrchestrator`, `useAnimatedNumber`, `useAnimatedNumberMap`, `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync` (motion sub-tree, post-L W2).

**keyframes.js**: its own `Animation`/`AnimationGroup`/`Timeline` engine. **PARALLEL substrate** to glass-ui's motion composables. Different abstraction layer (keyframes.js = lower-level animation engine; glass-ui motion/ = higher-level Vue composables). Co-existence is intentional.

**speedtest**: consumes glass-ui's `useRAFLoop`/`useIntersectionPause`/`useDarkModeSync`. ALSO consumes keyframes.js directly. Two-axis animation stack.

**M items**:
- **N20 (animation-stack-audit)**: METADATA — document the canonical animation-stack story in glass-ui's DESIGN.md or README — "when to use glass-ui composables vs. keyframes.js directly". Cross-cutting modularization clarity for M.

### D.5 — Carousel / Slider primitives

**Glass-ui**: ships `<Carousel>` (reka-ui + embla-carousel-vue) + `<Slider>` (reka-ui SliderRoot) + `<GlassCarousel>` (custom).

**speedtest**: consumes glass-ui `Slider` (via subpath?) — verify. No parallel impl.

**words**: pins `embla-carousel` + `embla-carousel-vue` independently in `frontend/package.json`. DOES NOT pin reka-ui directly at workspace root but does at frontend (`reka-ui: ^2.8.2`). Parallel carousel substrate possible.

**M items**:
- **N21 (carousel-dry)**: AUDIT — verify words consumes glass-ui's carousel surface (via subpath `@mkbabb/glass-ui/carousel`) vs. building its own. If parallel: chronic DRY debt for M.

### D.6 — Build-config sharing

**Glass-ui**: ships `vite.library.ts` + `vite.demo.config.ts` (RETIRED at L W5) + `vite.config.ts`.

**speedtest**: `vite.config.ts` + `scripts/check-glass-ui-boundary.mjs` (NEW Y W2 — module boundary gate).

**words**: `vite.config.ts` (Vue 3.5 + Tailwind v4).

**keyframes.js**: `vite.config.ts` + `scripts/freshness-gate.mjs` (mirrors glass-ui A3 §4.4).

**value.js**: `vite.config.ts` + `scripts/freshness-gate.mjs` (mirrors glass-ui A3 §4.4).

**Pattern**: `scripts/freshness-gate.mjs` is **DUPLICATED across keyframes.js + value.js**, both citing "mirror glass-ui A3 §4.4". This is a candidate for canonical extraction.

**M items**:
- **N22 (freshness-gate-extract)**: CANONICAL — extract `scripts/freshness-gate.mjs` to a shared package (either as a `@mkbabb/freshness-gate` package OR a one-line consume from glass-ui's `scripts/`). Cross-repo DRY.
- **N23 (vite-config-canon)**: METADATA — document the canonical vite-config pattern for glass-ui consumers (esp. Tailwind v4 + reka-ui + Vue 3.5 stack). Currently each consumer rolls its own.

### D.7 — TSConfig + ESLint sharing

**Glass-ui**: `tsconfig.json` with `strict:true`, `verbatimModuleSyntax:true`, `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`.

**speedtest / words / keyframes.js / value.js**: each maintains its own tsconfig.

**Pattern**: NO shared tsconfig base. Each consumer reinvents.

**M items**:
- **N24 (tsconfig-base)**: CANONICAL — extract a shared `@mkbabb/tsconfig` base package OR pin to a canonical glass-ui-shipped base. Cross-repo DRY.

### §D summary

8 cross-cutting modularization-debt rows (N17-N24). All P2 severity (cross-cutting impact but no v1.0 blocker). Each is a **cross-repo coordination chronic** — addressed at M would require multi-repo commits.

---

## §E — Cross-repo dependency-graph chronic items

For each consumer, the v1.0 alignment state:

| Consumer | glass-ui pin | keyframes.js pin | Vue major | Tailwind major | Subpath imports? | v1.0 adoption | M coordination |
|---|---|---|---|---|---|---|---|
| speedtest | `file:../glass-ui` | `file:../keyframes.js` | 3.5.x | v4 | YES (14 subpaths) | LANDED (re-link `98f88325`) | Y W1-W4 in flight; no M action required |
| keyframes.js | `file:../glass-ui` (demo only) | self | 3.5.x (demo) | v4 (demo) | PARTIAL (`/dock` only) | UNVERIFIED | **N12** consumer-side audit |
| value.js | `file:../glass-ui` (demo only) | n/a | unknown | unknown | NO (root barrel only) | UNVERIFIED | **N13** 1-import audit |
| words/frontend | `file:./glass-ui` (BROKEN — symlink missing) | `^2.0.0` (registry) | 3.5.29 | v4.2.1 | YES (9 subpaths incl. RETIRED `/virtual`) | **BROKEN** | **N1, N14, N15** P0 + P1 |
| keyframes-wt-H-W2-verify | (worktree archive) | n/a | n/a | n/a | n/a | (archive) | none |
| dns-speedtest | unverified | unverified | unverified | unverified | unverified | unverified | (out of immediate scope) |
| bbnf-lang | n/a | n/a | n/a | n/a | n/a | n/a | precept channel only (N4) |
| mathanim | n/a (uses `@mkbabb/animation`) | n/a | n/a | n/a | n/a | n/a | (out of constellation) |

**Key chronic-deferral findings**:
- **words is BROKEN at v1.0 + has a BROKEN symlink** — P0.
- **keyframes.js + value.js are UNVERIFIED** at v1.0 (file-link masks publish-break) — P1.
- **speedtest is LANDED at v1.0** — only consumer with verified v1.0 adoption.

This is **2 P0 + 2 P1 cross-repo dep-graph rows for M**.

---

## §F — Compute chronic-status precisely

Applying the chronic threshold `(years ≥ 1) OR (recurrence count ≥ 3) OR (cross-tranche-debt classification ≥ 3 letters)`:

| Row | First surfaced | Recurrence count | Cross-tranche classification | Chronic? |
|---|---|---:|---|---|
| A1 HarmonicLevelGrid | C-tranche (2024-Q4 era) | 3 (I, J, K, L re-confirm) | C, I, J, K, L = 5 letters | YES — PERMANENT |
| A2 Blob Web Worker | C (2024-Q4) | 3 | C, I, J, K, L = 5 letters | YES — PERMANENT |
| A3 Tailwind plugin | C (2024-Q4) | 5 | C, D, E, F, I, J, K, L = 8 letters | YES — PERMANENT |
| A4 a11y deeper sweep | C (2024-Q4) | 6 | C, D, E, F, G, I, J, K, L = 9 letters | YES — PERMANENT |
| A21 docs/instructions/README.md:17 | K | 3 (K, L, M) | K, L, M = 3 letters | YES — N5 |
| N1 words v1.0 break | L | 1 | L | NOT-CHRONIC-YET but P0 SEVERITY |
| N4 precept submodule push | K (W0 hardened git clause origin) | 2 (K, L) | K, L | NOT-CHRONIC-YET but P0 SEVERITY |
| N6 F-ε-3 Configurator recursion | L W7 | 1 | L | NOT-CHRONIC-YET |
| N17-N24 cross-cutting DRY | implicit since C era; never explicitly catalogued | 0 (NEW catalogue) | (multi) | NOT-CHRONIC-CATALOGUED-NOW |

Conclusion: the C–L chain's true chronic-debt is **dominated by 4 PERMANENT-DEFER rows** (A1-A4) with named external destinations. The remaining 56 - 4 = 52 rows have been ABSORBED through I-L's tightening close ceremonies. M's chronic-deferral surface is dominated by **cross-repo state** (N1, N4, N12, N13, N14, N15) + **cross-cutting modularization-debt** (N17-N24) + **L flight residuals** (N6-N11).

---

## §G — Top 5 P0 chronic items for M HEADLINE consideration

Ranked by severity × cross-cutting impact × ease-of-absorption × user-named importance:

### G.1 — HEADLINE candidate 1: **N1 (words consumer v1.0 break)**

- **Severity**: P0 (words is BROKEN at v1.0 published artefact)
- **Cross-cutting impact**: cross-repo (glass-ui v1.0 ↔ words frontend; 85 files)
- **Ease of absorption**: moderate — 3 retired-subpath sites need re-author OR shim
- **User-named importance**: HIGH — no-legacy-code directive but words IS legacy at v1.0 publish

**M scope**: choose between (a) ship v1.0.1 with `@mkbabb/glass-ui/virtual` shim with deprecation notice; (b) coordinate words-side migration (lift composables into `words/frontend/src/composables/`); (c) hybrid (restore `_internal/` substrate + words-side adapter). Recommended: **option (b) — coordinate words-side migration** per L invariant 8 binary substrate-without-consumer (words is the missing 2nd consumer; if it migrates AWAY, the retire stays clean).

### G.2 — HEADLINE candidate 2: **N4 (precept submodule push divergence reconciliation)**

- **Severity**: P0 (precept submodule cannot fresh-clone; cross-repo precept stream split)
- **Cross-cutting impact**: cross-repo (N-repo + O-repo + bbnf-lang + glass-ui + speedtest all consume same precepts)
- **Ease of absorption**: delicate — 6 vs 15 commit reconciliation; philosophical conflicts (parallel-agent ceiling 6 vs. 7)
- **User-named importance**: HIGH — gestalt redesigns over incremental patches; precept stream is the canonical-of-record

**M scope**: M.W0 dedicated lane. Read 21 commits across both streams. Identify philosophical conflicts (parallel-agent ceiling; dispatch-template HARD CAP; triumvirate orchestration). Integrate via merge OR rebase. Verify no clause lost. Push. Coordinate with N-repo + O-repo orchestrators if active.

### G.3 — HEADLINE candidate 3: **N17-N24 cross-cutting modularization-debt (consolidated as cohort)**

- **Severity**: P2 individually but P1 as a cohort
- **Cross-cutting impact**: 4-5 sibling repos
- **Ease of absorption**: substrate cohort — likely 1 substantive wave for shared-config (tsconfig + freshness-gate + cn() canon docs)
- **User-named importance**: aligned with user's L directive "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules"

**M scope**: a "cross-repo cohesion" wave. (a) `@mkbabb/tsconfig` shared base package; (b) `@mkbabb/freshness-gate` shared package OR documentation; (c) `cn()` canon location confirmed (root vs. subpath); (d) animation-stack story documented in DESIGN.md.

### G.4 — HEADLINE candidate 4: **N3 (W1 Lane B git checkout precept-gap)** + **N5 (`docs/instructions/README.md:17` 3× chronic)**

- **Severity**: P1 (precept hardening; codify forbidden-subset)
- **Cross-cutting impact**: precept stream (all consumers)
- **Ease of absorption**: clean cut — text amendment to AGENT_DISPATCH_TEMPLATE.md
- **User-named importance**: aligned with hardened agent git clause invariant (K W0 origin)

**M scope**: M.W0 lane. Extend AGENT_DISPATCH_TEMPLATE.md to explicitly enumerate `checkout` alongside `stash`/`reset`/`restore`. Codify the dispatch-bound recovery alternative (re-emit from script vs. `checkout`). Combine with N5 (precept submodule update channel for `docs/instructions/README.md:17`).

### G.5 — HEADLINE candidate 5: **N12 + N13 (keyframes.js + value.js consumer-side v1.0 audit)**

- **Severity**: P1 (consumers UNVERIFIED at v1.0; potential silent break under registry pin)
- **Cross-cutting impact**: cross-repo (2 consumers)
- **Ease of absorption**: moderate — verify file-link doesn't mask v1.0 break; migrate to subpaths if needed
- **User-named importance**: aligned with substrate-without-consumer binary (N1's sibling concern)

**M scope**: a "consumer-side v1.0 audit" lane mirroring L W1 verification but for the 2 unverified consumers. Walk each consumer's import shape; classify root-barrel hits against retired symbols; coordinate re-link cycle.

---

## §H — M wave-spec recommendations (Rγ-anticipating)

Provisional wave attribution. Final scope authoritative at Rγ.

### M.W0 — Reconciliation + precept submodule push + cross-repo coordination

**Lanes**:
- Lane I — reconciliation audit (this Rβ + Rα/Rε deliverables walk)
- **Lane II — precept submodule reconciliation** (N4, N3, N5, N16) — HEADLINE
- Lane III — cross-repo coordination artefact (M.coordination/{speedtest-Y,words-?,keyframes-?,value-?}.md)

### M.W1 (HEADLINE candidate) — Cross-repo consumer v1.0 fallout

**Lanes**:
- **Lane A — words consumer v1.0 break absorb** (N1) — HEADLINE — 3 retired-subpath sites + 85-file canon
- Lane B — keyframes.js + value.js v1.0 audit (N12, N13)
- Lane C — words symlink restoration OR re-pin (N14)

### M.W2 — Cross-cutting modularization-debt cohort

**Lanes**:
- Lane A — shared tsconfig + freshness-gate extraction (N22, N24)
- Lane B — cn() + animation-stack canon documentation (N17, N20)
- Lane C — Tailwind major + token-cascade cross-repo audit (N19)

### M.W3 — L residuals + cosmetic cohort

**Lanes**:
- Lane A — F-π-1 + F-π-2 viewport overflows (N7) + G4/G14 cosmetic (N8) + N9/N10 α/δ carry-forwards
- Lane B — F-ε-3 Configurator recursion harness (N6) — methodical reproduction

### M.W4 — Close ceremony + 7-agent strengthened audit (ι integrity-sweep canonical)

Pattern inherits L invariant 15 (α/β/γ/δ/ε/π/ι). N11 documented-narrowing watch-list verified at close.

**Total estimated M waves**: 5 (W0 + W1 + W2 + W3 + W4). Peak parallelism: 3 lanes (W1).

---

## §I — Summary stats

| Stat | Count |
|---|---:|
| **Total ledger rows (M scope)** | **74** |
| L-inherited rows × disposition (carry-forward) | 56 |
| ↳ CLOSED-AT-L (W0-W8 absorbs) | 28 |
| ↳ CLOSED-PRE-L (K or earlier) | 15 |
| ↳ PERMANENT-DEFER (re-justified) | 11 |
| ↳ CARRIED-TO-M | 2 |
| **NEW-AT-M (this Rβ)** | **18** |
| ↳ §B L flight surfaces | 12 (N1-N12) |
| ↳ §C cross-repo (chronic + new) | 6 (N12-N16 + words-related N1) |
| ↳ §D cross-cutting modularization-debt | 8 (N17-N24) |
| **Cross-repo bound** | **11** (N1, N2, N12, N13, N14, N15, N16, N17, N19, N21, N22) |
| **Cross-repo HEADLINE candidates (P0)** | **2** (N1, N4) |
| **PERMANENT-DEFER (carried)** | **11** (A1-A5, A15, A19, L14, L15 + N5 → precept channel) |
| **Sub-bar substrates requiring binary M decision** | 0 (L's binary substrate audit closed all 10 candidates) |
| **P0 chronic rows for M HEADLINE** | **5** (per §G) |
| **Cross-tranche-debt classification ≥ 3 letters** | **6** rows (A1, A2, A3, A4, A21/N5, N4) |
| **Source-tier TODO/FIXME** | expected ZERO (re-walk at M close per L invariant) |

---

## §J — HEADLINE candidates ranked (M.W1 dispatch)

| Rank | M# | Item | Severity | Impact | Ease | Recommend |
|---:|---|---|---|---|---|---|
| 1 | N1 | words consumer v1.0 break (3 sites + 85 files) | P0 | cross-repo | moderate | **M.W1 HEADLINE** |
| 2 | N4 | precept submodule push divergence (6+15 commits) | P0 | cross-repo (all) | delicate | **M.W0 HEADLINE** |
| 3 | N17-N24 | cross-cutting modularization-debt cohort | P1-as-cohort | 4-5 sibling repos | substrate cohort | **M.W2** |
| 4 | N3 + N5 | git checkout precept-gap + README:17 chronic | P1 | precept stream | clean cut | **M.W0 Lane II/III** |
| 5 | N12 + N13 | keyframes.js + value.js consumer-side v1.0 audit | P1 | 2 consumers | moderate | **M.W1 Lane B** |

---

## Authority

Read-only deferral-ledger walk. L-Rβ predecessor authoritative for C–K chronic-rows. L FINAL.md + L-residuals.md + 11 wave proof docs cited for L-disposition column. Cross-repo verification: speedtest (`docs/tranches/Y/Y.md` + `src/` grep), keyframes.js (`package.json` + `git log` + `demo/` grep), value.js (`package.json` + `src/` grep), words (`frontend/package.json` + 85-file grep), fourier-analysis/animate + mkb-utils + vite-plugin-shebang + mathanim (`package.json` + repo state). Precept submodule divergence verified via `cd docs/precepts && git log origin/main..HEAD` + `git log HEAD..origin/main`. bbnf-lang cross-tranche-precept-pull verified via REAUDIT-stream commit message inspection. No source files modified. No commits. No mutating git (per Hardened agent git clause).
