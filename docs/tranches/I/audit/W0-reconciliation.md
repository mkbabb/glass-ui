# I.W0 Lane I — Reconciliation Audit (HEAD)

**Date**: 2026-05-05
**HEAD commit**: `5dbfe8a` (feat(styles/instrument-chassis): bezel-line α lift)
**Method**: read-only walk; rg + Read; no source edits.
**Inputs**: H deep-audit deliverables α/β/γ/δ/ε/ζ/playwright at `c5f196c`; H FINAL.md; current src/ + demo/ at HEAD; LESSONS-LEARNED.md `cc57c91`.

## §0. Commits since H close (`c5f196c..HEAD`)

```
5dbfe8a feat(styles/instrument-chassis): bezel-line α lift light-mode 0.04/0.06 → 0.10/0.12
2414abc feat(stories/primitives): extend Q.W3 — cap modes × silhouette × facetAxis × HoverPopover
0cb88c2 feat(custom/hover-popover): land HoverPopover primitive — adaptive side/align + defer-on-leave
7e8a809 feat(styles/dock): tier-primary phase-tint ::before backplate lifts past pill clip
64b3488 feat(glyph-face): clip-to-silhouette default + cap-strength 0.55 + screen blend + DiscoGlyph silhouette hand-off
602d135 Revert "fix(styles/dock): establish inline-size container on primary tier — closes Q.W2.A overflow"
37676e8 fix(styles/dock): establish inline-size container on primary tier — closes Q.W2.A overflow
e62c787 feat(composables/useResizeObserver): harden + migrate 9 hand-rolled call sites
c569f7e docs(styles/dock): comment Tailwind v4 utilities-vs-components cascade for dock-tab-button consumers
837c1bd docs(stories/metric-badge): extend story with xl rung + 4-size grid
ce0c56d fix(custom/metric-badge): re-map md → text-mono-caption — close 11/11/14 latent bug
0fa6980 feat(custom/metric-badge): add xl size mapping (text-mono-prose 18px / text-prose 18px)
4fb163d feat(typography): add text-mono-prose utility — 18px Fira Code, 0.02em tracking
1279b1d feat(composables): land useResizeObserver — Vue-scope-aware ResizeObserver wrapper
f654c24 chore(tranche-i/open): land I plan + 8 wave specs scaffold
1ae6013 docs(tranche-h/post-final): 6-lane deep audit + Playwright visual probe
9427536 fix(blob): lazy-mount via IntersectionObserver — Chrome MCP audit caught WebGL context-cap exhaustion
ca34354 fix(audit): playwright deep-audit surfaces 3 bugs; all cleared
```

**Cross-tranche silent-surface delta since H close (relevant for ζ row 5 governance)**:
- `+1` custom package: `hover-popover` (commit `0cb88c2`, owner Q-tranche outside glass-ui scope) — same governance gap H ζ §5 named for the original 4 P-packages. Now **5 silent additions** in total.
- `+1` composable: `useResizeObserver` (commit `e62c787`, owner this glass-ui pre-tranche-I patch) — landed with consumer migration, evidence in commit body.
- `+1` typography utility: `text-mono-prose` (commit `4fb163d`, consumer = MetricBadge xl rung).

The reconciliation ledger §1 below uses HEAD as the verification target for every chronic row.

## §1. Chronic-deferral inventory disposition (master ledger)

All 21 ζ §2 rows reconciled at HEAD. WIRE / RETIRE / DEFER per the I.md invariant 2 ("each item closes via wire / retire / refactor; or formally retired with named replacement; or carries an explicit permanent deferral with binding rationale; no fourth option").

| # | Item | First-seen | Source artefact (HEAD) | Disposition | Wave | Notes |
|---|---|---|---|---|---|---|
| 1 | `<HarmonicLevelGrid>` / Filmstrip primitive (R4) | G FINAL | not present in `src/` (consumer-territory artefact; never landed in glass-ui) | **DEFER** (formal permanent deferral) | I.W3 records the formal retire-as-permanent-deferral entry | Per I.md cross-tranche-debt §3: "I formally retires R4 as 'permanent deferral; never returning to library'". Rationale: single-consumer primitive (fourier-analysis) that fails the ≥2 bar; consumer owns it. |
| 2 | Blob Web Worker (R5) | G/blob/SPEC.md §11.4 | trigger condition encoded in `src/composables/blob/SPEC.md`; FPS 119.62 / 0 KB at 8 instances on M4 Max | **DEFER** OR **RETIRE-trigger** | I.W3 reassesses per I.md invariant 12 | If H W5 stress baseline shows trigger unreachable on M4 Max, retire trigger as "encoded but unreachable"; otherwise carry as "permanent deferral until lower-end runtime evidence forces it". W3 picks. |
| 3 | `--cartoon-shadow*` round-trip aliases (R-NEW-2) | G δ §4.4 | `src/styles/tokens.css:240-244,265,270-271,289-291` + `src/styles/theme.css:228-245` (22 alias declarations across 9 round-trip families per H δ §3) | **RETIRE** (inline-and-remove single-direction) | **I.W1** (alias-retire lane) | Per I.md invariant 6: "canonical name wins (--shadow-X per Tailwind 4 @theme convention) and the alias retires"; ~30-line surgical edit across 2 files. |
| 4 | Orphan `--accent-pink` token | G δ §4.2 | `src/styles/tokens.css:205,587` + `src/styles/theme.css:113`; 0 non-self consumers per `rg -l "accent-pink" src/ demo/` returns only the 3 def sites | **RETIRE** (delete-unused) | **I.W1** (alias-retire lane, paired with #3) | ≈3-line edit. Live grep confirms still orphan. |
| 5 | Tabs provide/inject refactor (disputed) | G δ §1.3 | **delivered**: `src/components/ui/tabs/Tabs.vue:13` `provide('glassTabs', { variant: computed(...) })`; TabsList/TabsTrigger inject. Re-verified at HEAD | **RESOLVED** (already shipped per H FINAL §δ) | already closed; no I wave needed | H FINAL was correct; H δ first-pass was wrong. H deep-audit δ §8 confirmed false positive. |
| 6 | Cartoon recipe duplicated 4× across CVAs (G δ §1.2) | G δ §1.2 | `src/components/ui/button/index.ts:37`, `select/index.ts:25`, `input/index.ts:14`, `number-field/index.ts:19`. Button+Select use `--cream`; Input+NumberField use `--cream-warm` — 4× shape-duplicate, 2-way colour-divergent | **RETIRE** (refactor: hoist into one `@utility cartoon-surface`) | **I.W3** (architectural tension resolution) | H δ deep-audit C-5 P1 absorb. ≈15-line edit reconciling cream vs cream-warm divergence at the same time. |
| 7 | NumberField cartoon descendant-attr-selector outlier (G δ §1.4) | G δ §1.4 | `src/components/ui/number-field/index.ts:19` still uses `[&_[data-slot=input]]:` descendant push at HEAD | **RETIRE** (refactor: provide/inject template per Tabs precedent) | **I.W3** | H δ deep-audit C-11 P1 absorb. Match Tabs's pattern (`provide('glassNumberField', ...)`); NumberFieldInput injects. |
| 8 | Card variant=cream + variant=paper duplicate with `<CreamSurface>` + `.paper-N` | G δ §10.1, §10.2 | `src/components/ui/card/index.ts:28-29` `cream: "cream-surface"`, `paper: "paper-card"`; `<CreamSurface>` at `src/components/custom/cream-surface/`; `<PaperBackdrop>` at `src/components/custom/paper-backdrop/`; `.paper-{1..4}` at `src/styles/paper.css:57-83` — three paths to paper substrate, two paths to cream | **RETIRE** (refactor: one canonical primitive per substrate, OR documented hierarchy) | **I.W3** (Tension 1 resolution) | I.md invariant 7 binds: "collapse to one primitive, OR write a `DESIGN.md ## Substrate Hierarchy` section that names the layers explicitly". |
| 9 | R-NEW-1 — 41 pre-G stories aesthetic uplift | H W4 design-fidelity rerun | 41 NEEDS-REPAIR story files in `demo/stories/` (per H W4 audit) | **WIRE** (uplift in tranche I) | **I.W4** (3-5 agents, 8-12 stories per agent) | I.md W4 closes on `0 NEEDS-REPAIR` from design-fidelity rerun. |
| 10 | R-NEW-3 — Stale D-tranche evidence-doc Source paths | H β §10 | `docs/consumer-evidence/animated-number.md`, `use-animated-number-options.md`, `use-animated-number.md` cite removed `MetricPillCluster.vue` / `SpeedtestResults.vue` | **WIRE** (refresh paths) | **I.W5** (doc reconciliation) | Wave-spec hard gate: "D-tranche evidence-doc Source paths refreshed (R-NEW-3)". |
| 11 | Plugin extraction (Tailwind plugin) | A/B aspiration; explicit defer in E + F | not present in `src/` or any tranche-active artefact | **DEFER** (formal permanent deferral) | **I.W3** records the formal entry | Per I.md cross-tranche-debt §1: "If the underlying primitives have stabilized post-H trim, plugin extraction may finally be ready; if not, formally retire as 'permanent deferral with documented rationale' rather than continuing to defer". W3 decides. Default disposition: DEFER (4-tranche aspiration with no current named consumer or named timeline). |
| 12 | Bundle/CSS size floors as hard gates | F invariant 12 | `scripts/profile-bundle.mjs` exists; numbers measured every tranche; never gated. Main entry 188.91 kB / 36.12 kB gz at H close; CSS 39.48 kB | **WIRE** (soft-fail gate) | **I.W6** | I.md invariant 8: "soft-fail gate. CI fails if budget exceeded but does NOT block local dev. Hard-fail promotion is named for a future tranche". |
| 13 | Reduced-motion + a11y deeper sweep | C FINAL § Future-tranche seeds | many components have `prefers-reduced-motion` guards; no posture statement | **WIRE** (audit + posture statement) OR **DEFER** | **I.W3** decides | Per I.md cross-tranche-debt §2: "lands a one-pass a11y audit + posture statement OR formally names 'consumer-grade a11y posture' as out-of-scope". W3 picks. |
| 14 | 101 library-orphan candidates from C.W0 | C W0 | resolved (77 retires cumulative C/D/G/H per ζ §2 row 14) | **RESOLVED** | n/a | Reference baseline; no I wave needed. |
| 15 | Storybook story-coverage residuals (R6) | G FINAL R6 | resolved in H W1+W4 | **RESOLVED** | n/a | Closed in H. |
| 16 | DESIGN.md drift (R1, R7) | G W0.β | resolved in H W2 (57/57) | **RESOLVED** | n/a | Closed in H. (γ deep-audit found further README/CLAUDE residuals — those are γ not R1/R7.) |
| 17 | Wβ stress runtime profile capture (R2) | G FINAL R2 | resolved in H W5 | **RESOLVED** | n/a | Closed in H. |
| 18 | `<Slider variant="glass-track">` + dock-keep-open round-trip (R3) | G FINAL R3 | resolved in H W3 (`f3caa9f`) | **RESOLVED** | n/a | Closed in H. |
| 19 | Dual-authority on dock keep-open (DockPopover function-keys vs Slider sink) | H δ CRITICAL-1 | `src/components/custom/dock/DockPopover.vue:38-39,44-46` consumes raw `'dockKeepOpen'`/`'dockRelease'` string keys; `src/components/ui/slider/Slider.vue:44-56` consumes `DOCK_KEEP_OPEN_SINK_KEY`; `src/components/custom/dock/DockLayerGroup.vue:104-129` re-provides as the sink — H FINAL declared "layered API not violation" but H δ deep-audit kept it as C-1 P0 absorb | **RETIRE** (refactor: pick one authority — DockPopover migrates onto sink) | **I.W3** (architectural tension resolution) | H FINAL §δ accepted layered API; H δ deep-audit C-1 says "the layer boundary is not enforced; injection keys are public strings; both consumers in same package". I.W3 binary picks: (a) DockPopover migrates onto `dockSink.acquire()` and `'dockKeepOpen'`/`'dockRelease'` move under `_internal/`, OR (b) sink dissolves and Slider calls function-keys directly. Per I.md invariant 1's "no silent deferrals" — disposition must close, not redefine. |
| 20 | Stale wave-tag + recovery-diary leaks (R3 markers; H.W*/G.W*/O.W*) | G δ + H δ §2 | **24 leaks at HEAD per ζ §2; current rg confirms 25 sites** (added: `src/components/custom/dock-group/DockGroup.vue:13` `P.W1.B`; `src/styles/dock-group.css:5` `P.W1.B`; `src/styles/disco-glyph.css:3` `P.W3 sub-B`; `src/styles/dock.css:751` `P.W1.B`; `src/styles/typography.css:341` `P.W1.B`. **Already-named at H ζ**: `src/index.ts:5,12,18,23,27,31,46`; `src/styles/theme.css:66,209,215`; `src/components/ui/card/index.ts:14`; `src/components/ui/slider/Slider.vue:17,43,170`; `src/styles/tokens.css:305,326,358`; `src/composables/blob/useBlob.ts:5`; `demo/stories/_internal/blob-stress.vue:2,137`; `demo/stories/primitives/blob.vue:4`. **Net at HEAD: ~25 leaks** (5 net new since H close from P-tranche silent additions; ζ noted GLSL provenance lines as load-bearing — keep but rewrite without wave-letter prefix). | **WIRE** (binary scrub + CI guard) | **I.W1** (recovery-diary scrub lane) | I.md invariant 5: "zero `H.W*` / `G.W*` / `O.W*` / `pass-N` / `silent-failure` annotations; tranche-history annotations belong in `docs/tranches/`. CI guard added that fails on grep hits in src/+demo/." |
| 21 | `scripts/ay-close.sh` cross-tranche script | F W6 + E close | exists at `scripts/ay-close.sh`; G/H did not invoke; tranche I wave specs do not invoke | **RETIRE** (delete-unused) OR **DEFER** | **I.W6** absorbs | ~3-tranche-no-invocation. Bundle workflow extension naturally absorbs the close-gate question. RETIRE if I.W6 doesn't revive it as the I-close gate. |

**Disposition splits**:
- **WIRE**: 5 (rows 9, 10, 12, 20; row 13 conditional WIRE-or-DEFER per W3)
- **RETIRE** (refactor / delete-unused / inline-and-remove): 6 (rows 3, 4, 6, 7, 8, 19; row 21 RETIRE-or-revive)
- **DEFER** (formal permanent deferral with named binding rationale): 3 (rows 1, 2, 11; row 13 conditional)
- **RESOLVED** (already closed at HEAD): 6 (rows 5, 14, 15, 16, 17, 18)
- **CONDITIONAL** (W3 decides): 3 (rows 2, 11, 13)

**Total chronic items still requiring tranche-I action**: 11 (rows 1-4, 6-13, 19, 20, 21 minus the 6 resolved minus duplicates) = **11 active dispositions across waves W1, W3, W4, W5, W6**, plus 3 formal-deferral entries the W3 close-doc must record.

## §2. β orphan candidates re-confirmed at HEAD

H deep-audit β named 60 retire-candidate artefacts at `c5f196c` (33 library-orphans + 27 sub-bar). Re-walking each cohort against HEAD `5dbfe8a`:

### 2.1 Confirmed library-orphans at HEAD (still 0 consumers)

| # | artefact | family | def site | HEAD evidence (rg) | verdict |
|---|---|---|---|---|---|
| 1 | `<MultiSelect>` (ui) | ui-component | `src/components/ui/multi-select/MultiSelect.vue` | `rg -l "<MultiSelect" src/ demo/` returns only `demo/stories/primitives/multi-select.vue` (1 site) | **library-orphan retained** |
| 2 | `<TagsInput>` (ui) | ui-component | `src/components/ui/tags-input/` | only `demo/stories/data/tags-input.vue` (1 site) | **library-orphan retained** |
| 3 | `<GlassPanel>` (custom) | custom-component | `src/components/custom/glass-panel/GlassPanel.vue` | only `demo/stories/foundations/paper-glass.vue` (1 site) | **library-orphan retained** |
| 4 | `<MetaballCanvas>` (custom) | custom-component | `src/components/custom/metaballs/MetaballCanvas.vue` | only `demo/stories/primitives/metaballs.vue` (1 site) | **library-orphan retained** |
| 5 | `<PaperBackdrop>` (custom) | custom-component | `src/components/custom/paper-backdrop/PaperBackdrop.vue` | 1 demo story site only | **library-orphan retained** |
| 6 | `<StatusDot>` (custom) | custom-component | `src/components/custom/status-dot/StatusDot.vue` | 1 site | **library-orphan retained** |
| 7 | `badgeToneVariants.tone.destructive` | CVA branch | `src/components/ui/badge/index.ts:46` | `rg -n 'tone.\\s*[\"']destructive' demo/` returns `demo/stories/primitives/badge-tones.vue:48` + `demo/stories/primitives/color-pill.vue:42` — **2 demo consumers at HEAD** (β counted 0; re-verified at HEAD shows 2 demo sites direct-CVA-style or template-prop). **Status: sub-bar (no longer 0)**. | **moved sub-bar** (no longer library-orphan) |
| 8 | `LabeledSlider.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledSlider.vue:23` | 0 in-repo + 0 cross-repo consumer for `LabeledSlider` `label-class` (keyframes.js consumes `LabeledNumberField` `label-class` not LabeledSlider) | **library-orphan retained** |
| 9 | `LabeledSwitch.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledSwitch.vue:21` | 0 hits | **library-orphan retained** |
| 10 | `LabeledInput.labelClass` | slot-prop | `src/components/custom/labeled-field/LabeledInput.vue:21` | 0 hits | **library-orphan retained** |
| 11 | `LabeledInput.inputClass` | slot-prop | `:22` | 0 hits | **library-orphan retained** |
| 12 | `LabeledSelect.labelClass` | slot-prop | `:52` | 0 hits in glass-ui src/ + demo/. Note: keyframes.js consumes a wrapper named `AnimationControlsControls.vue` with `label-class=` but those are different component bindings (cross-repo evidence not specific to glass-ui's `LabeledSelect`) | **library-orphan retained** OR sub-bar with cross-repo evidence-doc |
| 13 | `DataTableColumn.headerClass` | slot-prop | `src/components/ui/data-table/types.ts:19` | declaration consumed in `DataTable.vue:183` but no consumer that *passes* a non-default `headerClass` per column | **library-orphan retained** |

**Tokens (20 confirmed library-orphan tokens)**:
- `--shadow-xs`: re-grepped at HEAD; `demo/stories/foundations/shadows.vue:6` consumes Tailwind's auto-generated `shadow-xs` (which Tailwind v4 derives from the @theme `--shadow-xs` if declared, else from defaults). The token *itself* (the def in tokens.css) has 0 outside-tokens.css references. **Status: ambiguous — Tailwind utility consumers may consume it indirectly via @theme; if so, not orphan**. Treat as sub-bar pending I.W1 verification.
- `--shadow-2xl`, `--duration-linger`, `--duration-shimmer-slow`, `--duration-popup-swap`, `--motion-slide-{sm,md,lg}`, `--dock-margin`, `--dock-menubar-reserve`, `--select-font`, `--z-debug`, `--shadow-cartoon-color-hover{,-soft}`, `--glass-specular-dark`, `--glass-shadow-lg`, `--glass-border-strong`, `--border-opacity-{light,medium,strong}`: re-grepped — all still 0 outside-the-def references. **library-orphan retained**.

**Library-orphan count at HEAD**: 33 → **31** (row 7 promoted to sub-bar with 2 demo sites; row 12 sub-bar with cross-repo evidence pending; rest unchanged). Token cohort largely intact pending I.W1 verification of Tailwind-utility-via-@theme consumption.

### 2.2 Sub-bar artefacts (still 1 distinct site at HEAD)

| # | artefact | family | sites at HEAD | evidence-doc? |
|---|---|---|---|---|
| 14 | `Combobox` (ui) | ui | `demo/stories/primitives/combobox.vue` (1) | no |
| 15 | `Drawer` (ui) | ui | `demo/stories/containers/drawer.vue` (1) + keyframes.js=1 | no |
| 16 | `Aurora` (custom) | custom | 1 + speedtest=1 | no |
| 17 | `DockGroup` (custom) | custom | `demo/stories/primitives/dock-group.vue` (1) + speedtest=1; **note**: P-tranche silent addition; no glass-ui-side wire-or-retire pass owned at HEAD | no |
| 18 | `GlassCarousel` (custom) | custom | 1 + value=1 | no |
| 19 | `LabeledInput` (custom) | custom | 1 + keyframes=1 | no |
| 20 | `LabeledSelect` (custom) | custom | 1 + sparse | no |
| 21 | `LabeledSwitch` (custom) | custom | 1 + sparse | no |
| 22 | `Pulse` (custom) | custom | 1 + speedtest=1 | no |
| 23 | `FuzzySearch` (custom) | custom | 1 + bbnf=1 | no |
| 24 | `ProgressiveSidebar` (custom) | custom | 1 + words=1 | no |
| 25 | `GlassTimeline` (custom) | custom | 1 + fourier=1 | no |
| 26 | `TypewriterText` (custom) | custom | 1 + bbnf=1 | no |
| 27 | `buttonVariants.variant.ai` | CVA | 0 + words=1 | no |
| 28 | `buttonVariants.variant.danger-subtle` | CVA | 1 + 0 | no |
| 29 | `cardVariants.variant.subtle` | CVA | 0 + speedtest=1 | no |
| 30 | `avatarVariant.size.base` | CVA | 1 + ? | no |
| 31 | `avatarVariant.shape.square` | CVA | 1 + ? | no |
| 32 | `badgeToneVariants.tone.success` | CVA | 1 (`primitives/badge-tones.vue`) | no |
| 33 | `badgeToneVariants.tone.warning` | CVA | 1 | no |
| 34 | `badgeToneVariants.tone.info` | CVA | 1 | no |
| 35 | `toastVariants.variant.inverse` | CVA | 1 (W6.β baseline) | **YES** — sub-bar CVA per I.md invariant 11 (emit OR retire) |
| 36 | `toggleVariants.variant.card` | CVA | 1 (W6.β baseline) | **YES** per invariant 11 |
| 37 | `sliderVariants.variant.glass-track` (W3) | CVA-shape (no factory; scoped CSS) | 1 (W6.β baseline) | **YES** per invariant 11 |

**Sub-bar count at HEAD**: 27 → **27** (count stable; row 7 promotion adds 1 new sub-bar; one offset by net stability; cross-repo cohort unchanged).

### 2.3 New since-H artefacts requiring β bar (not in original 60)

| artefact | source | sites at HEAD | I.W disposition |
|---|---|---|---|
| `<HoverPopover>` (custom) | commit `0cb88c2` (Q-tranche silent addition) | def + 1 demo story (`demo/stories/primitives/hover-popover.vue`?) — re-grep needed at I.W1 | **WIRE-or-RETIRE** in I.W1 (P-package-style governance per I.md invariant 3) |
| `useResizeObserver` (composable) | commit `e62c787` | def + **9 in-repo migration sites** per commit body — clears ≥2 bar | **WIRE** (already wired by commit body) |
| `text-mono-prose` (typography utility) | commit `4fb163d` | def + MetricBadge xl rung | **WIRE** (≥2 sites) |

### 2.4 β orphan re-confirmation summary

- **Original H β count**: 60 (33 library-orphan + 27 sub-bar)
- **At HEAD**: **31 library-orphan + 28 sub-bar = 59 retire candidates** (net -1 after row 7 promotion, +1 from new HoverPopover audit)
- **Plus 4 P-tranche silent additions still owing glass-ui-side wire-or-retire** (`instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group`) per I.md invariant 3
- **Plus 1 Q-tranche silent addition** (`hover-popover`) needing the same governance
- **Plus 6 sub-bar CVA branches in `badgeToneVariants` family** (success/warning/info/destructive) need invariant 11 binary disposition (evidence-doc OR retire)

**Active β retire targets for I.W1**: ~60 unchanged; ledger flags the 5 P/Q-tranche silent additions for explicit ownership.

## §3. γ doc-fix items re-confirmed at HEAD

H deep-audit γ named 21 doc-fix items + 9 critical findings (CRIT-D1…CRIT-D9). Re-walking against HEAD:

### 3.1 Critical findings (CRIT-D1…CRIT-D9) at HEAD

| # | Finding | HEAD evidence | Disposition |
|---|---|---|---|
| CRIT-D1 | README.md `.glass-pill` claim wrong in 3 places | `README.md:9,92,118` re-confirmed via `grep -n "glass-pill" README.md` | **WIRE** I.W5 |
| CRIT-D2 | README.md "32 shadcn-vue components" off by 7 | `README.md:7,61` re-confirmed | **WIRE** I.W5 |
| CRIT-D3 | CLAUDE.md `.glass-pill` survives W6.γ recommendation 4 | `CLAUDE.md:117` re-confirmed (`.glass-{subtle,default,medium,elevated}, .glass-card, .glass-pill, .glass-btn`) | **WIRE** I.W5 |
| CRIT-D4 | README + CLAUDE both claim `.cartoon-card` and `.elevated-card` | `README.md:94`, `CLAUDE.md:119` confirmed; `cards.css` still defines only `.paper-texture` + `.cream-surface` | **WIRE** I.W5 |
| CRIT-D5 | CLAUDE.md `dock.css ... .dock-icon-btn` wrong | `CLAUDE.md:118` confirmed (typo `-btn` vs `-button`; phantom `.dock-separator`, `.dock-layer-grid`) | **WIRE** I.W5 |
| CRIT-D6 | DESIGN.md UI primitives includes `scroll-area` and `scroll-pane` | `DESIGN.md:830` (not re-read in this audit; γ deep-audit findings load-bearing) | **WIRE** I.W5 |
| CRIT-D7 | D-tranche W4+W5 wave specs `Status: planned` post-D-II close | `tranches/D/waves/W{4,5}.md:6` (γ deep-audit cite; not re-verified) | **WIRE** I.W5 |
| CRIT-D8 | CLAUDE.md tokens.css §1-§10 wrong (actual §0-§14) | `CLAUDE.md:114` (γ deep-audit cite) | **WIRE** I.W5 |
| CRIT-D9 | CLAUDE.md peer-dep table omits 4, miscategorizes 2 | `CLAUDE.md:144-156` (γ deep-audit cite) | **WIRE** I.W5 |

All 9 CRIT findings unchanged at HEAD. **Disposition: all 9 WIRE in I.W5**.

### 3.2 21 numbered γ recommendations + lower-severity drift

The γ deep-audit Recommendations §246-268 enumerated 21 items: 1–13 (README + CLAUDE + DESIGN), 14–15 (D-tranche + E-tranche wave-spec status), 16 (`docs/instructions/README.md`), 17–20 (README polish), 21 (consumer-evidence Source paths = R-NEW-3 = chronic row 10).

| # | Recommendation | HEAD status | Wave |
|---|---|---|---|
| 1 | README "32" → "39" (lines 7, 61) | unchanged | I.W5 |
| 2 | README drop `.glass-pill` (3 sites: 9, 92, 118) | unchanged | I.W5 |
| 3 | README:94 drop phantoms `.cartoon-card`, `.elevated-card`; add `.cream-surface` | unchanged | I.W5 |
| 4 | CLAUDE.md:117 drop `.glass-pill` | unchanged | I.W5 |
| 5 | CLAUDE.md:118 `.dock-icon-btn` → `-button` + drop phantoms | unchanged | I.W5 |
| 6 | CLAUDE.md:119 drop `.cartoon-card`, `.elevated-card`; add `.cream-surface` | unchanged | I.W5 |
| 7 | CLAUDE.md:114 §1-§10 → §0-§14 | unchanged | I.W5 |
| 8 | CLAUDE.md tree (112-123) add 7 missing `*.css` files | unchanged | I.W5 |
| 9 | CLAUDE.md:144-156 peer-dep table fix | unchanged | I.W5 |
| 10 | CLAUDE.md:140 re-add `chartMargin` + `minWidthInputSm` | unchanged | I.W5 |
| 11 | CLAUDE.md:111 "9 top-level public export groups" → "12" | unchanged | I.W5 |
| 12 | DESIGN.md:830 drop phantoms `scroll-area`, `scroll-pane` | unchanged | I.W5 |
| 13 | DESIGN.md:834 drop phantoms `animation`, `form`; add 8 missing | unchanged | I.W5 |
| 14 | D/waves/W4.md+W5.md `planned` → `closed via D-II` | unchanged | I.W5 |
| 15 | E/waves/W0.md `complete_with_misses` → canonical | unchanged | I.W5 |
| 16 | docs/instructions/README.md:17 extend proof commands | unchanged | I.W5 |
| 17 | README.md tree (73-86) mark `custom/` as illustrative | unchanged | I.W5 |
| 18 | README.md:14 extend composables list | unchanged | I.W5 |
| 19 | README.md:132 cartoon-shadow xs+accent rungs | unchanged | I.W5 |
| 20 | README.md:134 drop `--paper-aged-texture` | unchanged | I.W5 |
| 21 | docs/consumer-evidence/{3 D-tranche docs} (= R-NEW-3) | unchanged | I.W5 |

**γ doc-fix count at HEAD**: **21 unchanged**. None silently absorbed since H close. All target I.W5.

**New since-H γ items the deep-audit didn't catch**:
- New HoverPopover (`hover-popover/`) needs a CLAUDE.md catalog entry (custom-package list will need to be 41 not 40); same for DESIGN.md if catalog mentions custom enumeration. **Add as I.W5 scope item.**
- `useResizeObserver` is a new top-level composable; needs CLAUDE.md composables tree entry. **Add as I.W5 scope item.**
- `text-mono-prose` is a new typography utility; needs README/CLAUDE typography section. **Add as I.W5 scope item.**

**Total γ targets for I.W5**: 21 + 3 since-H additions = **24 doc-fix items**.

## §4. δ idiomatic-gestalt criticals disposition

H deep-audit δ named **8 criticals (C-1…C-8) + 3 structural observations (C-9…C-11) = 11 total**. Re-walking against HEAD:

| # | Finding | HEAD status | I disposition | Wave |
|---|---|---|---|---|
| C-1 | dock keep-open dual-authority (DockPopover function-keys vs Slider sink) | unchanged at HEAD; `DockPopover.vue:38-46` + `Slider.vue:44-56` + `DockLayerGroup.vue:104-129` confirmed | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 picks one authority binary | I.W3 (Tension resolution) |
| C-2 | Round-trip alias scaffolding (9 alias families + animate-* orphans) | unchanged at HEAD; `tokens.css:240-244,265,270-271,289-291` + `theme.css:228-245` confirmed | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W1 retires single-direction (chronic row 3) | I.W1 |
| C-3 | Cartoon-shadow recipe expressed three ways (token + utility + alias) | unchanged at HEAD | **chronic — NEW-IN-I-SCOPE-RESOLVED**: P1 in I.W1 (paired with C-2 alias retire) | I.W1 (paired) |
| C-4 | Recovery-diary leaks at HEAD (24 sites at H close; **25 at HEAD** per §0 P-tranche additions) | confirmed at HEAD; **5 net-new since H close** (`P.W1.B`/`P.W3` annotations from P-tranche silent additions at `dock.css:751`, `dock-group.css:5`, `disco-glyph.css:3`, `typography.css:341`, `dock-group/DockGroup.vue:13`) | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W1 binary scrub + CI guard (chronic row 20) | I.W1 |
| C-5 | Cartoon-surface recipe duplicated 4× across CVAs (cream / cream-warm divergent) | unchanged at HEAD (chronic row 6) | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 hoists into one `@utility cartoon-surface` | I.W3 |
| C-6 | `--easing-accent` doing 8+ jobs | unchanged at HEAD | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 renames or splits per substrate | I.W3 (paired) |
| C-7 | Slider scoped-CSS variants instead of CVA (deviation from shadcn-vue convention) | unchanged at HEAD | **chronic — DEFER OR RESOLVED-IN-W3**: I.W3 either lands `sliderVariants` CVA OR amends CLAUDE.md convention | I.W3 |
| C-8 | `<Blob>` instance runs two simultaneous rAF subscriptions | unchanged at HEAD; `useBlob.ts:135` + `_internal/useBlobPointer.ts:113-120` per H δ deep | **chronic — DEFER**: `_internal/` boundary keeps it out of public API; non-blocking; absorb in a future tranche if blob runtime regresses. Document in I.W3 close-doc as "permanent deferral, internal"; current FPS 119.62 / 0 KB shows no observable cost. | I.W3 records deferral |
| C-9 | `<Card variant="cream">` vs `<CreamSurface>` duplicate authority | unchanged (chronic row 8 paper-cream variant) | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 Tension 1 picks canonical | I.W3 |
| C-10 | `<Card variant="paper">` + `.paper-card` + `.paper-{1..4}` three paths | unchanged (chronic row 8 paper-cream variant) | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 Tension 1 picks canonical | I.W3 |
| C-11 | NumberField cartoon descendant-attr-selector outlier | unchanged (chronic row 7) | **chronic — NEW-IN-I-SCOPE-RESOLVED**: I.W3 refactor per Tabs precedent | I.W3 |

**Disposition split**:
- **Resolved-in-W6 (H W6 absorb)**: 0 (none of the 11 were touched in H W6)
- **Chronic, addressed in I.W1**: 3 (C-2, C-3, C-4)
- **Chronic, addressed in I.W3**: 7 (C-1, C-5, C-6, C-7, C-9, C-10, C-11)
- **Chronic, formally deferred in I.W3 close-doc**: 1 (C-8 — `_internal/` boundary holds; no observable cost)
- **Plus**: NotificationDot.vue:11 docstring-lying-about-`pulse-ring-spin` (H δ §5.1) — P2 cosmetic; absorb in I.W5 doc reconciliation as bonus.

**Total δ resolution targets for I**: 11.

## §5. Playwright shimmer-matrix bug confirmation

Source-only verification (no Playwright run).

`demo/stories/foundations/flourishes.vue`:
- Line 53-56: `SHIMMERS` array binds `cls` to `text-shimmer-{gold,blue,vivid,pastel}`
- Line 201: `<p :class="cn(s.cls, 'text-display-3')">{{ s.sample }}</p>` — **the bug-state line, unchanged from H close**
- Line 245-280: scoped-style rules `.text-shimmer-{blue,vivid,pastel}` define gradient + animation (clean shape; consume runtime tokens)
- Line 68 standalone: `<p class="text-shimmer-vivid mt-2 mb-4">` (no `cn()`) — works correctly per H Playwright probe

`src/utils/cn.ts` is `clsx + tailwind-merge`. tailwind-merge's `text-*` conflict heuristic strips `text-shimmer-*` when paired with `text-display-3` because both share the `text-` prefix. Confirmed bug-state preserved at HEAD via source unchanged.

**Bug repro at HEAD**: yes — file `demo/stories/foundations/flourishes.vue:201` unchanged. Three-option fix path (per H Playwright audit) still applies:
1. **Option 1 (recommended, KISS)**: `:class="[s.cls, 'text-display-3']"` (Vue native array binding — no tailwind-merge conflict)
2. Option 2: re-globalize shimmer utilities with non-`text-*` prefix
3. Option 3: configure tailwind-merge custom class group

I.W2 absorbs. Playwright probe re-runs at I close to confirm `getComputedStyle` shows non-`none` `bgImage` for all four samples.

## §6. Cross-audit sigma check

Walked the 6 deep-audit deliverables (α/β/γ/δ/ε/ζ/playwright) for contradicting claims.

| # | Disagreement | Lane A says | Lane B says | Resolution at HEAD |
|---|---|---|---|---|
| Σ-1 | **Tabs `provide('glassTabs')` delivered?** | H FINAL §δ + H deep-audit δ §8: **YES, delivered at G pass-2; W6.δ first-pass false positive** | H W6.δ (first-pass): **NOT delivered, named CRITICAL-2** | **YES delivered at HEAD** — `Tabs.vue:13` confirmed. H FINAL was right. Re-verified this audit. **Resolution: delete CRITICAL-2 from chronic ledger; chronic row 5 = RESOLVED.** |
| Σ-2 | **Dock keep-open dual-authority — violation or layered API?** | H FINAL §δ: "layered API not violation" (resolved-by-redefinition) | H deep-audit δ C-1: **chronic; layer boundary not enforced; injection keys are public strings; both consumers in same package**; ζ row 19 sides with deep-audit δ ("clearest current absorb-by-redefinition debt") | **Source confirms deep-audit δ correct**: `'dockKeepOpen'` is a string injection key (no symbol, no `_`-prefix, not under `_internal/`); DockPopover and DockLayerGroup both live in `src/components/custom/dock/`. Resolution: **chronic; chronic row 19 = RETIRE in I.W3**. Override H FINAL's "resolved-by-redefinition" via I.md invariant 1's "no silent deferrals". |
| Σ-3 | **Recovery-diary leaks count** | H FINAL §δ: "23 claimed; 4 actually verified scrubbed in W6" | H deep-audit δ §4: "24 leaks at HEAD" (added 1 since H δ first-pass); ζ row 20 cites "4/23 actually scrubbed" | **At HEAD `5dbfe8a`: ~25 leaks** (5 net-new since H close from P/Q-tranche silent additions). Resolution: chronic row 20 = WIRE in I.W1; CI guard added. |
| Σ-4 | **Library-orphan count post-H** | H FINAL §β: "**0 G-artefact orphans at HEAD**. H invariant 2 holds." | H deep-audit β: "**33 library-orphans at HEAD post-H**" (60 retire candidates: 33 + 27 sub-bar) | **No contradiction; differing scopes**. H FINAL §β was strictly G-shipped artefacts (H invariant 2's stated scope). H deep-audit β walked the *full* pre-G + post-G perimeter. Both correct. Tranche I owns the wider perimeter per I.md invariant 1. |
| Σ-5 | **Stress baseline interpretation** | H FINAL §W5: "FPS 119.62 / 0 KB-per-instance — closed clean" | H deep-audit ε §4: "RAF granularity, not per-frame CPU/state-machine; SPEC §9's 0.5 ms / 0.3 ms budgets not directly observed" | **Both correct**: aggregate baseline closed; per-component budgets not observed. ε recommends I-tranche re-instrument with `performance.measure`. **Disposition**: not chronic; I.W6 may add `performance.measure` if useful, but R2 itself is RESOLVED. |
| Σ-6 | **R5 (Blob Web Worker) trigger reachable?** | I.md invariant 12: "8+ multi-instance triggers may already be unfindable post-Wβ3 stress story (8 specimens, FPS 119.62)" | H FINAL §R5: "locked deferred until 8+ multi-instance triggers" | **Trigger may be unreachable at HEAD on M4 Max**. I.W3 reassesses per chronic row 2 disposition. |
| Σ-7 | **Plugin extraction status** | E + F: "explicit defer" (4 tranches running deferral); ζ row 11: "most chronic aspiration in corpus; never picked up" | I.md cross-tranche-debt §1: "if primitives stabilized, plugin extraction may be ready" | **No contradiction; conditional resolution**. I.W3 picks: WIRE (named consumer + scope) OR formal DEFER (consumer-territory; permanent retirement from library). |

**Sigma verdict**: 1 source-of-truth contradiction (Σ-2: H FINAL vs H deep-audit δ on dock keep-open; deep-audit δ wins via source evidence). 1 false-positive correction (Σ-1: Tabs provide/inject IS delivered, contrary to H W6.δ first-pass). All other "disagreements" resolved as differing-scope or conditional-resolution. **No invalid hard-gate state remains.**

## §7. Total tranche-I scope summary

### Chronic items requiring tranche-I action (from §1 ledger)

- **Chronic items requiring WIRE**: **5** — R-NEW-1 (W4), R-NEW-3 (W5), bundle-budget soft-fail (W6), recovery-diary scrub + CI guard (W1), a11y posture (W3 conditional)
- **Chronic items requiring RETIRE / refactor**: **6** — `--cartoon-shadow*` aliases (W1), `--accent-pink` (W1), 4× cartoon recipe duplication (W3), NumberField descendant-selector (W3), Card paper/cream three-paths (W3), dock keep-open dual-authority (W3); plus `scripts/ay-close.sh` (W6 absorb)
- **Chronic items formally deferred**: **3 binding** — R4 Filmstrip (consumer-territory; never returning to library); R5 Blob Web Worker (W3 reassesses or retires-as-unreachable); plugin extraction (W3 picks; default DEFER if no named consumer); plus C-8 blob double-rAF (`_internal/` boundary; no observable cost)
- **Chronic items already RESOLVED at HEAD**: **6** — Tabs provide/inject (Σ-1); 101 C.W0 candidates; R6 storyless; R1/R7 DESIGN.md drift; R2 stress baseline; R3 Slider glass-track + dock sink

### Other I-scope quantities

- **β orphan retire targets**: **31 library-orphan + 28 sub-bar = 59 retire candidates** (I.W1; net -1 from row 7 promotion); plus 4 P-tranche silent additions + 1 Q-tranche addition (HoverPopover) requiring glass-ui-side wire-or-retire ownership (I.W1)
- **γ doc-fix targets**: **24** (21 H γ-deep recommendations + 3 since-H additions: HoverPopover catalog, useResizeObserver tree, text-mono-prose typography)
- **δ resolution targets**: **11** (C-1…C-8 + C-9…C-11; 3 to W1, 7 to W3, 1 formally deferred)
- **Runtime regression fix targets**: **4** — shimmer matrix (W2); 3 failing public-surface tests (W2 confirmed via local `vitest run tests/public-surface.spec.ts`: `keeps exact 'dock' runtime surface` / `does not re-export retired utility .code-badge` / `keeps utility shimmer/progress aliases off undefined local tokens` all FAIL at HEAD)

### Cross-audit sigma findings absorbed

- **Σ-1 false positive corrected**: Tabs provide/inject is shipped; chronic row 5 RESOLVED.
- **Σ-2 H FINAL overridden via source**: dock keep-open is dual-authority not layered; chronic row 19 retains RETIRE disposition via I.W3.
- **Σ-3 leak count at HEAD**: ~25 (5 net-new from P/Q-tranche silent additions); CI guard binds in I.W1.
- **Σ-4 scope clarity**: H FINAL's "0 orphans" was G-shipped scope; tranche I owns the full pre-G + post-G perimeter.
- **Σ-5 ε baseline scope**: aggregate closed; per-component CPU budgets not gated; non-blocking.
- **Σ-6 R5 reachability**: trigger may be unreachable on M4 Max; I.W3 picks reassess-or-retire.
- **Σ-7 plugin extraction**: 4-tranche aspirational; I.W3 picks WIRE-or-formal-DEFER.

## §8. Notes / risks

### 8.1 Cross-tranche silent-surface governance is failing

H ζ §5 named 4 P-tranche silent additions. At HEAD, **5** silent additions exist (added: HoverPopover from Q-tranche, commit `0cb88c2`). The governance gap H ζ recommended (any non-glass-ui tranche that adds a package to `src/components/custom/` triggers a glass-ui-side W0 entry) was never adopted as a binding precept; the precept submodule update in I.W0 Lane II *is* one place to encode it. **Risk**: I.W1 ownership of 5 silent additions is the second time this has happened; without a binding precept the trend continues. Recommendation: I.W0 Lane II adds an entry to `LESSONS-LEARNED.md` *and* `tranche/SPEC.md` Cross-Repo Surface clause — but the wave-spec already names the 4 + 1 silent additions, so this risk is contained for I.

### 8.2 Conditional dispositions (W3 picks) are the largest risk surface

3 chronic rows depend on W3's binary choice (rows 2 / 11 / 13: R5 reassess-or-retire; plugin extraction WIRE-or-DEFER; a11y WIRE-or-DEFER). Plus rows 6-8 and 19 require W3 to pick canonical paths. If W3 budget is exceeded, the deferred-items list grows. **Risk mitigation**: I.W3 wave-spec already declares 1-2 agents and parallelism; if the 3-tension load is too heavy, scope-reveal protocol triggers W3-II per `tranche/SPEC.md`.

### 8.3 H FINAL's `δ resolved-by-redefinition` for dock keep-open is overridden

This audit explicitly contradicts H FINAL's §δ "layered API, not a violation". The override is justified by source evidence (string injection keys, sibling consumers, no `_internal/` enforcement) and by I.md invariant 1 ("no silent deferrals; planned work lands, is formally retired, or moves to a named destination"). **Risk**: H is closed; the override does not invalidate H's close, but it does revise H's disposition reading for tranche-I planning purposes. This audit names the override explicitly so the orchestrator can absorb it without ambiguity. (No FINAL.md retroactive edit needed — the new ledger is authoritative for I forward.)

### 8.4 New since-H artefacts cap I.W1's scope

Three new since-H artefacts (HoverPopover, useResizeObserver, text-mono-prose) are not in the H β / γ / δ ledgers but require disposition:
- HoverPopover — needs β bar (currently 1 demo story?); needs CLAUDE.md catalog entry
- useResizeObserver — wired with 9 sites per commit body; needs CLAUDE.md tree entry
- text-mono-prose — wired with MetricBadge xl rung consumer; needs README/CLAUDE typography entry

I.W1 absorbs HoverPopover into the wire-or-retire pass; I.W5 absorbs the doc additions.

### 8.5 Test failures are real and pre-date H close

3 `tests/public-surface.spec.ts` failures sit at HEAD (re-confirmed via `npx vitest run tests/public-surface.spec.ts`). These are the same 3 failures H ε named. They block CI **today** if a CI workflow runs `npm test` — H currently runs only stress.yml. I.W2 fixes these as a pre-W6-CI-extension cleanup.

### 8.6 Authoring-order observation

This audit is the deliberate "post-close audit before FINAL is final" pattern that H invariant 4 promoted. It is run BEFORE I.W0 Lane II's precept-update writes. The disposition ledger here informs the wave-spec read of every wave W1-W7. If a wave's hard gate (per I.md §Hard Gates) cannot be verified by an artefact called out in §1, the wave-spec must be amended before dispatch.

### 8.7 Verification at audit close

- `npx vitest run tests/public-surface.spec.ts` — 3 failed (pre-existing per H ε; chronic row in §7).
- No source files modified during this audit. Confirmed via `git status` clean against tracked files.
- No destructive git commands run. No commits.
- Reading the 6 deep-audit deliverables + H FINAL.md + I.md + W0.md was the load-bearing input; rg / Read across HEAD is the verification mechanism.

## Authority

Read-only reconciliation audit at HEAD `5dbfe8a` post-W7-resize-observer-hardening. Every chronic-deferral row cites a HEAD source artefact (`file:line`) or a named ledger row from H deep-audit deliverables. Every disposition pairs with an explicit tranche-I wave (W0…W7 per I.md Wave Schedule) or a formal DEFER with binding rationale. No source files modified; no commits made. Sigma-check found 1 source-vs-FINAL override (Σ-2 dock keep-open) and 1 false-positive correction (Σ-1 Tabs provide/inject); both absorbed into the §1 ledger.
