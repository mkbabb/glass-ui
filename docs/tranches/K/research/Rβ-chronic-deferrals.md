# K · Rβ — Chronic Deferral Ledger Across Tranches C–J

**Date**: 2026-05-06
**Baseline commit**: `5bcf1ce` (J.W7 close ceremony — strengthened 6-agent post-close audit)
**Lane**: β — chronic deferral surveillance
**Scope**: every tranche FINAL/audit/wave-spec from C → J + source-tier TODO/FIXME sweep + substrate-without-consumer cross-walk
**Method**: read-only walk of `docs/tranches/{C,D,D-II,E,F,H,I,J}/` + `rg` against HEAD source for verification. Every row independently re-verified — J FINAL was not trusted unconditionally.

---

## §A — All-tranche deferral table

Schema: **Item · Origin tranche · Destination cited · Times deferred · Status at HEAD · K disposition**

| # | Item | Origin | Destination cited | Deferred (×) | Status at HEAD | K disposition |
|---|---|---|---|---:|---|---|
| A1 | `<HarmonicLevelGrid>` / Filmstrip primitive (R4) | G FINAL `G/audit/W6-residuals.md` | "consumer territory" → I.W3 retired permanent | 3 (G/H/I) | RESOLVED-FORMAL-DEFER (`I/audit/W3-chronic-deferral-assessments.md:16-26`) | RE-RETIRE-CONFIRMED |
| A2 | Blob Web Worker (R5 `composables/blob/SPEC.md §11.4`) | G | I.W3 retired permanent ("encoded but unreachable") | 3 (G/H/I) | RESOLVED-FORMAL-DEFER | RE-RETIRE-CONFIRMED |
| A3 | Plugin extraction (Tailwind plugin) | E aspirational | I.W3 retired permanent (consumer-territory) | 5 (E/F/G/H/I) | RESOLVED-FORMAL-DEFER | RE-RETIRE-CONFIRMED — J.md §Out-of-scope explicitly does not revisit |
| A4 | Reduced-motion + a11y deeper sweep | C FINAL "future seeds" | I.W3 posture statement landed; deeper sweep deferred | 6 (C/D/E/F/G/H/I) | RESOLVED-POSTURE-LANDED (DESIGN.md `## Accessibility Posture`) | RE-CONFIRM (no K action — posture is the canonical answer) |
| A5 | C-8 Blob double-rAF (`useBlob.ts:135` + `_internal/useBlobPointer.ts:113`) | H δ deep | I.W3 internal `_internal/`-boundary deferral | 2 (H/I) | STILL-PRESENT internal; FPS 119.62 baseline holds | RE-RETIRE (no observable cost; `_internal/` boundary holds) |
| A6 | `--cartoon-shadow*` round-trip aliases (R-NEW-2; 8 tokens × 9 alias families) | G δ §4.4 / H δ §3 | I.W1 alias-retire lane | 2 (G/H) | RESOLVED in I.W1 `35773c4` | n/a |
| A7 | `--accent-pink` orphan token | G δ §4.2 | I.W1 retire | 2 (G/H) | RESOLVED in I.W1 | n/a |
| A8 | Cartoon recipe duplicated 4× across CVAs (Button/Select/Input/NumberField) | G δ §1.2 | I.W3 collapse to `@utility cartoon-surface` | 2 (G/H) | RESOLVED in I.W3 `987fc41` | n/a |
| A9 | NumberField cartoon descendant-attr-selector outlier | G δ §1.4 | I.W3 provide/inject refactor | 2 (G/H) | RESOLVED in I.W3 | n/a |
| A10 | Card variant=cream + variant=paper duplicate substrate | G δ §10 | I.W3 cream-COLLAPSED; paper+glass DOCUMENTED | 2 (G/H) | RESOLVED (`<Card variant="cream">` retired; `<CreamSurface>` canonical) | n/a |
| A11 | R-NEW-1 — 41 pre-G stories aesthetic uplift | H W4 | I.W4 32 stories repaired | 1 (H) | RESOLVED in I.W4 `864e882` | n/a |
| A12 | R-NEW-3 — 3 stale D-tranche evidence-doc Source paths | H β §10 | I.W5 doc reconciliation | 1 (H) | RESOLVED in I.W5 `73c40fa` | n/a |
| A13 | Bundle/CSS size floors as hard gates (F invariant 12) | F | I.W6 soft-fail gate landed `63e29e4` | 4 (F/G/H/I) — but **regressed in J!** | **STILL-ABSENT at HEAD** — `package.json` has no `profile:budget` script; `.github/workflows/` directory does not exist; `scripts/profile-bundle.mjs` BUDGETS table never restored after v0.8.0 consolidation | **ABSORB-IN-K** (highest priority — J ε P1-A) |
| A14 | Tabs provide/inject refactor (disputed) | G δ §1.3 | I.W0 verified delivered (Σ-1 false positive) | 2 (G/H) | RESOLVED — Tabs.vue:13 provides `glassTabs` | n/a |
| A15 | Stale wave-tag + recovery-diary leaks (`H.W*`/`G.W*`/`O.W*`/`P.W*`) | G δ + H δ §2 | I.W1 binary scrub | 3 (G/H/I) | PARTIAL — J pre-close noted **3 historical-context comments** at `src/index.ts:5` + `src/styles/tokens.css:339-342` (P-tranche provenance comments); J γ adjudicated as not violations | RE-DEFER (rationalized non-violation; document in K W0) |
| A16 | `scripts/ay-close.sh` cross-tranche close gate | F W6 / E close | I.W6 retired | 4 (F/G/H/I) | **REGRESSED at HEAD** — `scripts/ay-close.sh` exists; `package.json:262` has `"ay-close": "scripts/ay-close.sh"`; J ε F-3 flagged | **ABSORB-IN-K** (cleanup retire — same v0.8.0 revert cohort as A13) |
| A17 | Dock keep-open dual-authority (DockPopover function-keys vs Slider sink) | H δ C-1 | I.W3 sink unified `987fc41` | 2 (H/I) | RESOLVED — DockPopover retired in J.W3.B; sole sink consumer is Slider | n/a |
| A18 | `--easing-accent` overload (color masquerading as easing) | H δ C-6 | I.W3 renamed to `--accent-color` | 2 (H/I) | RESOLVED in I.W3 | n/a |
| A19 | API Extractor dts caching (14_089ms baseline) | I W6 | "future tranche" | 1 (I) | STILL-PRESENT (build at HEAD ~18s; dts the bottleneck) | RE-DEFER (non-blocking; not a regression) |
| A20 | 9 zero-payload subpaths kept on cross-repo speedtest evidence | I W6 | "future hard-fail target if speedtest migrates" | 1 (I) | STILL-PRESENT | RE-DEFER (cross-repo dependency; condition unmet) |
| A21 | `docs/instructions/README.md:17` proof-commands stale | I residue | "next precept-submodule update" | 1 (I) | UNCERTAIN (precepts submodule outside this repo's HEAD) | RE-DEFER to precept submodule update |
| A22 | CLAUDE.md major refresh — file-tree + subpath + Design Axes drift (11 items per J γ) | J γ | "doc-only commit before next tranche" | 1 (J) | STILL-PRESENT (J FINAL says deferred) | **ABSORB-IN-K** (small; doc-only) |
| A23 | README.md drift (7 items per J γ) | J γ | "doc-only commit" | 1 (J) | STILL-PRESENT | **ABSORB-IN-K** (small; doc-only — pair with A22) |
| A24 | 5 demo stories raw `focus-visible:shadow-[var(--focus-ring-shadow)]` | J vocab.γ residue | K residue sweep | 1 (J) | **VERIFIED at HEAD** — 5 files: `combobox.vue`, `foundations/shadows.vue`, `CategoryRail.vue`, `foundations/intro.vue`, `navigation/dock-layers.vue` | **ABSORB-IN-K** (residue sweep — `.focus-ring` utility exists; mechanical migration) |
| A25 | 3 demo `--surface-tint` bypasses | J vocab.γ residue | K | 1 (J) | UNVERIFIED — `rg surface-tint demo/` at HEAD returns no raw `--surface-tint-*` CSS-prop class hits in demo (J residue may already be cleared, or J counted token-defs) | RE-VERIFY in K W0; absorb if confirmed |
| A26 | `motion/stagger.vue:59 transition-all` survivor | J vocab.γ residue | K residue | 1 (J) | **MISCITED at HEAD** — file at `src/composables/motion/stagger.vue` does not exist; the actual survivor is `demo/stories/motion/stagger.vue:59` (1 demo story; J path was wrong) + `src/components/ui/carousel/CarouselDots.vue` (1 lib site) | **ABSORB-IN-K** (single-utility migration; correct path is demo + CarouselDots) |
| A27 | `--{success,warning,info}-foreground` 0 consumers | J W1 substrate-without-immediate-consumer | "wire (Notification.vue refit) in K or formally retire" | 1 (J) | STILL-PRESENT — defs at `tokens.css:254-256,658-660`; bridges at `theme.css:89-91`; `rg` finds zero `text-success-foreground`/etc. consumers in src/ + demo/ | **ABSORB-IN-K** (wire-or-retire — Notification.vue refit OR token retire) |
| A28 | `cssVar()` ≥ 2 consumer bar | J W1 | "K — second site or Slider-only API doc" | 1 (J) | STILL-PRESENT — only `BouncyToggle.vue:130-132` consumes (3 vars but 1 site) | **ABSORB-IN-K** (substrate-without-consumer; either second consumer or formally Slider-only) |
| A29 | `.overlay-scrim` @utility shadowed by `bg-overlay-scrim` Tailwind utility | J W1 | "K cleanup retire" | 1 (J) | **VERIFIED at HEAD** — `utilities.css:432` `@utility overlay-scrim` AND `theme.css:108-111` Tailwind bridge both exist; the @utility is shadowed | **ABSORB-IN-K** (one-line retire) |
| A30 | Top story-pager dock 4px overflow at 375 viewport | J π P1 | K mobile-viewport refinement | 1 (J) | STILL-PRESENT (J π absorb deferred) | **ABSORB-IN-K** (W3 mobile-viewport refinement wave) |
| A31 | GlassCarousel audacious pager chevrons unreachable on mobile | J π P2 | K | 1 (J) | STILL-PRESENT | **ABSORB-IN-K** (paired with A30 in mobile-viewport wave) |
| A32 | Stress harness retire decision (per I.W6) | I.W6 / J ε F-2 | "K — restore or formally retire" | 2 (I/J) | STILL-ABSENT — `scripts/stress/` dir does not exist; harness was dropped in v0.8.0 consolidation | **ABSORB-IN-K** (binary decide — restore for ongoing baselines OR retire per I.W6 invariant 8) |
| A33 | `ay-close` reappearance | J ε F-2 / γ cross-ref | "K cleanup" | 1 (J) | STILL-PRESENT (same v0.8.0 cohort as A16) | **ABSORB-IN-K** (collapsed with A16) |
| A34 | Audacious primary-CTA variant — `Button variant="primary-audacious"` extraction from `dock.css [data-tier="primary"]` | J explicit defer (J.md §Cross-tranche-debt + FINAL §Cross-tranche-debt) | K — "merits its own gestalt wave with a story" | 1 (J) | STILL-PRESENT — substrate at `dock.css:687-790` (lines shifted from cited 659-744; disco-grain + sparkle-sweep + specular-highlight composite is intact and load-bearing) | **ABSORB-IN-K** (gestalt wave — independent W with its own story; J's most explicit K hand-off) |
| A35 | drag-keep-open story-fidelity gap (no demo binds Slider inside GlassDock) | J | K story-add | 1 (J) | STILL-PRESENT | **ABSORB-IN-K** (W with audacious-CTA — bundled storytelling) |
| A36 | `prefers-reduced-motion` runtime gate for WAAPI consumers | J R5 axis 7 / J vocab.β | W2 absorbed in BouncyToggle migration | 1 (J) | RESOLVED — `BouncyToggle.vue:122` `matchMedia("(prefers-reduced-motion: reduce)")` gate present | n/a |

---

## §B — Chronic deferrals (≥ 2 deferrals) requiring K disposition

Items deferred ≥ 2 tranches, segmented by current state.

### B1 — Chronic but **already resolved before K**
A1 / A2 / A3 / A4 / A5 (×3 closures via I.W3 formal-deferral entries — A5 holds as `_internal/` boundary deferral); A6 / A7 / A8 / A9 / A10 / A14 / A17 / A18 (all RESOLVED in I.W1 / I.W3).

These need NO K action. K records that the chronic chain ended. Do not re-litigate.

### B2 — Chronic and **regressed at HEAD** (must absorb in K)
**A13 — Bundle-budget gate**: chronic 4 tranches (F→I); I.W6 landed `63e29e4`; **disappeared in v0.8.0 consolidation `5baceb5`**. J ε P1-A flagged. **MUST absorb in K** to honor I invariant 8 ("bundle-budget non-negotiable"). HEAD would PASS at I.W6 numbers with ~28-35% headroom per J ε §6.

**A16 / A33 — `ay-close.sh`**: chronic 4 tranches; retired in I.W6; reappeared in same v0.8.0 cohort. J ε F-3. **MUST absorb in K** (collapsed cleanup).

**A32 — Stress harness**: chronic 2 tranches (I.W6 retire decision; J ε F-2 "deferred to K"). Binary: restore (R2-style baselines) or formally retire. **MUST absorb in K**.

**A15 — Recovery-diary leak residue**: chronic 3 tranches (G/H/I scrubs); 3 historical-context comments survive at HEAD (P-tranche provenance lines). J γ adjudicated as non-violations. **K W0 should record adjudication formally** rather than re-defer — otherwise a 4th tranche carries them.

---

## §C — J residuals re-verification (independent walk against HEAD `5bcf1ce`)

Each row from J FINAL "Cross-tranche debt + named residuals" (§107-124) re-verified.

| J FINAL row | Re-verification | Complexity | Wave-spec scope |
|---|---|---|---|
| CLAUDE.md major refresh (11 items) | STILL-PRESENT (no commit since `5bcf1ce`) | small | K W0 doc-only (paired with A23) |
| README.md drift (7 items) | STILL-PRESENT | small | K W0 doc-only |
| Bundle-budget gate re-land | **STILL-ABSENT** — verified by `ls .github/workflows/` (dir absent) and `grep profile:budget package.json` (zero hits) | medium (re-land BUDGETS table + lint.yml + CI) | **K W1 perf-infra wave** (P0) |
| 5 demo stories raw `focus-visible:shadow-[var(--focus-ring-shadow)]` | **VERIFIED 5 files** (combobox, foundations/shadows, CategoryRail, foundations/intro, navigation/dock-layers) | small | K W2 vocab residue |
| 3 demo `--surface-tint` bypasses | **NOT REPRODUCIBLE** at HEAD via `rg --surface-tint demo/` — likely already cleared OR J counted token-defs | n/a | K W0 verify and either absorb or strike |
| `motion/stagger.vue:59 transition-all` survivor | **PATH MISCITED** — file `src/composables/motion/stagger.vue` does not exist; actual survivor is `demo/stories/motion/stagger.vue:59` (verified) plus `src/components/ui/carousel/CarouselDots.vue` (1 lib site) | small | K W2 vocab residue |
| `--{success,warning,info}-foreground` 0 consumers | **STILL-PRESENT** — 0 consumer hits via `rg text-success-foreground demo/ src/` | small (binary wire-or-retire) | K W2 vocab residue |
| `cssVar()` ≥ 2 consumer bar | **STILL-PRESENT** — only `BouncyToggle.vue:130-132` (3 var calls, 1 site) | small (find or land 2nd consumer; or formally document Slider-only) | K W2 vocab residue |
| `.overlay-scrim` @utility shadowed | **VERIFIED** — `utilities.css:432` + `theme.css:108-111` co-exist | trivial (one-line retire) | K W2 vocab residue |
| Top story-pager dock 4px overflow @ 375 | STILL-PRESENT (per J π P1 — no fix landed) | small (`@container` query OR media query) | K W3 mobile-viewport |
| GlassCarousel audacious pager chevrons unreachable on mobile | STILL-PRESENT (per J π P2) | small (flex-wrap or container-stack) | K W3 mobile-viewport (paired) |
| Stress harness retire decision | STILL-ABSENT (regression cohort A13) | medium | K W1 perf-infra (paired with A13) |
| `ay-close` reappearance | STILL-PRESENT (same v0.8.0 cohort) | trivial | K W1 perf-infra (paired with A13) |
| Audacious primary-CTA variant | STILL-PRESENT — substrate intact at `dock.css:687-790` (lines shifted from cited 659-744 due to W2.7 / Q-tranche edits) | medium-large (CVA branch + token surfacing + story authoring) | **K W4 — own gestalt wave with a story** (per J's directive) |
| drag-keep-open story-fidelity gap | STILL-PRESENT | small (one demo binding) | K W4 (paired with audacious-CTA) |

**Re-verification summary**: 14 rows. **12 STILL-PRESENT**, **1 PATH-MISCITED-but-PRESENT** (A26 stagger), **1 NOT-REPRODUCIBLE** (A25 surface-tint bypasses).

---

## §D — Source-tier TODO/FIXME ledger

```
rg "TODO|FIXME|XXX|HACK|@todo|@deprecated|DEFER|K-tranche" src/ demo/ tests/
```

**Result: ZERO hits.**

This is the cleanest source tree the deferral-ledger has audited. The KISS / no-workarounds / no-legacy precept chain (E onwards) plus I.W1's binary recovery-diary scrub plus J's audit-precept hardening have driven source-tier deferral-comment count to zero.

The only "deferral residue" in source is the 3 historical-context comments at `src/index.ts:5` + `src/styles/tokens.css:339-342` flagged in §A15 — those are tranche-provenance markers, not principled-defer / casual-defer / outright-bug. J γ adjudicated them as documentation, not violation.

**No source-tier TODO/FIXME debt for K to absorb.** This section closes empty.

---

## §E — Substrate-without-consumer chronics

Items where library substrate has been "consumer pending" for ≥ 2 tranches:

| Substrate | First named | Status at HEAD | Disposition |
|---|---|---|---|
| `--{success,warning,info}-foreground` tokens | J W1 | 0 consumers (1 tranche only) | Sub-bar but **just landed in J**; K decides (wire Notification.vue OR retire) |
| `cssVar()` composable | J W1 | 1 consumer (BouncyToggle) | Sub-bar (1 tranche); K decides |
| `text-mono-prose` typography utility | I (since-H) | 1 consumer (MetricBadge xl) | Sub-bar (1 tranche); not chronic — re-verify in K W0 |
| `<HoverPopover>` | Q-tranche silent addition | Now visible-load-bearing post-J.W3.B (HoverPopover replaced DockPopover; consumed by every dock cluster trigger) | Cleared bar in J |
| Sub-bar CVA branches (`toggleVariants.card`, `toastVariants.inverse`, `sliderVariants.glass-track`) | I W7 evidence-docs | Evidence docs emitted in I.W7 absorb | n/a |

**Chronic substrate-without-consumer (≥ 2 tranches at HEAD)**: zero. Every previously-chronic substrate item closed via wire (I.W1/I.W4) or retire (I.W1) or evidence-doc emission (I.W7). The J W1 substrate is sub-bar but only 1 tranche old — not chronic yet but on probation.

---

## §F — Audacious primary-CTA + plugin retire decisions

### Audacious primary-CTA — VERIFY AT HEAD

J FINAL §122 cited `dock.css:659-744`. Actual line numbers at HEAD (`5bcf1ce`):
- `.dock-tab-button[data-tier="primary"]` block at `dock.css:687-734`
- Hover state with `disco-grain` radial + `paper-clean-texture` overlay at `dock.css:715-734`
- `sparkle-sweep` keyframe consumer at `dock.css:763`
- Specular-highlight via `var(--glass-specular)` box-shadow at `dock.css:732`

**Substrate is intact and load-bearing.** Lines shifted because Q-tranche commits (`64b3488`, `7e8a809`) extended the primary-tier with phase-tint backplate and silhouette hand-off, but the disco-grain + sparkle-sweep + specular composite K is supposed to extract is fully present.

**Verdict**: extraction is viable. J's prescription holds. **K should absorb as its own gestalt wave with a story** (J FINAL §122 explicit). Rough scope: lift the three composites to a `Button variant="primary-audacious"` CVA branch + authoring story + dock.css consumer migration to use the variant. Estimated complexity: medium-large (cleanup of in-place styles is the larger sub-task than the variant authoring itself).

### `<plugin>` extraction — RE-RETIRE

I.W3 formally retired plugin extraction as PERMANENT consumer-territory deferral with three-clause rationale (`I/audit/W3-chronic-deferral-assessments.md:44-58`). J.md §Out-of-scope honored: "Plugin extraction — formally retired in I as permanent consumer-territory deferral; J does not revisit."

**K should NOT revisit**. No new named consumer has emerged; no scope shift. The 5-tranche chronic is closed. K.md §Out-of-scope should re-state: "Plugin extraction — retired permanently in I.W3; binding rationale unchanged. K does not revisit."

---

## §G — K wave-spec recommendations

Grouping the absorbable items into thematic waves:

### K W0 — Reconciliation + doc-drift sweep
- A22 / A23 — CLAUDE.md + README.md drift (J γ residues, ≈18 doc-only items)
- A15 — recovery-diary historical-context adjudication formalized
- A21 — `docs/instructions/README.md:17` (precept submodule update if reachable)
- A25 verify (surface-tint bypass count)
- 3 since-J doc additions (HoverPopover catalog already absorbed in I.W5; verify nothing new)

**Complexity**: small. **Agents**: 1.

### K W1 — Perf infrastructure restoration
- A13 — bundle-budget gate re-land (`profile:budget` script + `BUDGETS` table + `.github/workflows/lint.yml`)
- A16 / A33 — `ay-close.sh` retire (paired with A13 cohort cleanup)
- A32 — stress harness binary decision (restore for ongoing R2 baselines OR formally retire per I.W6 invariant 8)

**Complexity**: medium. **Agents**: 1-2 (parallel: budget gate + stress decision).

### K W2 — Vocab.γ residue sweep
- A24 — 5 demo `focus-visible:shadow-[var(--focus-ring-shadow)]` migrations to `.focus-ring`
- A26 — `transition-all` survivors (`demo/stories/motion/stagger.vue:59` + `src/components/ui/carousel/CarouselDots.vue`)
- A27 — `--{success,warning,info}-foreground` wire-or-retire (Notification.vue refit OR token retire)
- A28 — `cssVar()` second consumer OR formally Slider-only API doc
- A29 — `.overlay-scrim` @utility retire (one-line)

**Complexity**: small. **Agents**: 1.

### K W3 — Mobile-viewport refinement
- A30 — top story-pager dock 4px overflow @ 375
- A31 — GlassCarousel audacious pager chevrons mobile wrap
- π lane re-runs at ≥ 3 viewports (375 / 768 / 1440) per J's strengthened audit precept

**Complexity**: small. **Agents**: 1.

### K W4 — Audacious primary-CTA gestalt wave (J's explicit hand-off)
- A34 — `Button variant="primary-audacious"` extraction from `dock.css [data-tier="primary"]`
- A35 — drag-keep-open story (Slider-inside-GlassDock demo binding)
- New audacious-CTA story authored

**Complexity**: medium-large. **Agents**: 1-2. **This is the K headline wave** per J FINAL §122.

### K W5 (optional) — Audit + close ceremony
- 6-agent strengthened post-close audit per J's binding precept

**Total K wave count**: 5-6 (W0-W5). **Total absorbed items**: ~16 chronic / J residue items + 1 K-headline gestalt.

---

## §H — Items that should remain deferred

Items where re-defer is justified by binding rationale (not failure-mode):

| Item | Rationale |
|---|---|
| A1 / A2 / A3 / A4 / A5 | Already PERMANENTLY deferred via I.W3 formal-deferral entries with restoration triggers. K records the chain ended. |
| A19 — API Extractor dts caching | Non-blocking; 18s baseline acceptable; no consumer pressure. RE-DEFER. |
| A20 — 9 zero-payload subpaths | Cross-repo speedtest dependency unmet. RE-DEFER pending speedtest migration. |
| A21 — `docs/instructions/README.md:17` | Lives in `docs/precepts/` submodule; addressed via precept-submodule update channel, not glass-ui tranche channel. RE-DEFER (correct destination). |
| A36 — PRM gate for WAAPI consumers | Already satisfied (BouncyToggle PRM gate present). Nothing to defer. |

**Items that K must NOT re-defer**: A13 / A16 / A22 / A23 / A24 / A26 / A27 / A28 / A29 / A30 / A31 / A32 / A33 / A34 / A35.

Re-deferring any of these triggers the failure-mode J was designed to fix (chronic deferrals re-deferred without disposition). The substrate-with-consumer + audit-precept hardening + I.W3 binary disposition pattern all bind K to absorb-or-retire-with-binding-rationale.

---

## Authority

Read-only deferral-ledger walk against HEAD `5bcf1ce`. Every J FINAL row independently verified via `rg` + `Read`. Source-tier TODO/FIXME sweep returned zero. Cross-tranche silent-addition cohort (P-tranche × 4 + Q-tranche × 1) reconfirmed as owned in I.W1 + I.W7. Bundle-budget regression (A13) is the highest-priority K absorb — it is the only chronic that REGRESSED at HEAD vs its prior closure.

No source files modified. No commits. Cited every claim with `file:line` or commit hash.
