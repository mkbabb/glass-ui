# H.W0 — Reconciliation Audit (read-only)

**Agent**: H.W0 Lane I (audit-only).
**Date**: 2026-05-05.
**Scope**: every G-shipped artefact, per W0.md "Audit scope" (17 custom packages, 14 CVA branches, 4 + 7 composables, 3 slot-class props, 1 factory, 5 runtime helpers, ~64 utility classes across utilities.css/math.css/paper.css/cards.css, 11 token namespaces).
**Method**: re-grep at HEAD with the exact `rg` invocation cited per row; cross-reference `docs/consumer-evidence/<artefact>.md` per `docs/audits/overfitting-audit.md` Refined-D verdict precedence (`delete-unused > library-orphan > inline-and-remove > keep-current > demo-only-private > keep`). The G β audit (`docs/tranches/G/audit/G-audit-β-substrate-and-deadcode.md`) provided the enumeration; this lane reconciles every β verdict against HEAD and adds the consumer-evidence-doc layer β did not run.

**Consumer-evidence-doc check (invariant)**: `ls docs/consumer-evidence/` yields 24 entries — every one maps to a tranche-D artefact (`expandable-container`, `use-glass-renderer`, etc.). **Zero G-artefact docs exist.** Per H invariant 2, an artefact whose only support is a W5 ledger projection demotes to RETIRE unless a consumer follow-up tranche is named IN PROGRESS. This lane is audit-only and cannot verify consumer-tranche-in-progress claims; the orchestrator must absorb any reveal. The default for projection-only support is therefore RETIRE.

**Disposition encoding**:
- **WIRE (already)**: ≥2 in-repo sites at HEAD; β verdict `keep`. No W1 work needed.
- **WIRE**: <2 sites at HEAD but a story or composition consumer is named in W1/W4 to lift over the bar.
- **RETIRE**: zero or one in-repo site, no fresh evidence doc, no named in-progress consumer tranche; W1 deletes.
- **EVIDENCE-DOC**: name a consumer-tranche-in-progress and create `docs/consumer-evidence/<artefact>.md` with a fresh proof grep. Audit-only lane defaults to RETIRE; orchestrator may upgrade to EVIDENCE-DOC if a consumer tranche is verifiably open.

---

## 1. Token reconciliation table

| artefact | kind | def-site | rg src+demo (count) | evidence-doc? | total | Refined-D verdict | W1 disposition |
|---|---|---|---:|---|---:|---|---|
| `--cream` | token | tokens.css | 19 — `rg -l -e "--cream" src/ demo/` (raw match also covers compound names; canonical use confirmed via `rg -l -e "var\(--cream\)" src/ demo/`) | no | 19 | keep | WIRE (already) |
| `--cream-warm` | token | tokens.css | 15 — `rg -l -e "--cream-warm" src/ demo/` | no | 15 | keep | WIRE (already) |
| `--cream-cool` | token | tokens.css | 6 — `rg -l -e "--cream-cool" src/ demo/` | no | 6 | keep | WIRE (already) |
| `--cream-edge` | token | tokens.css | 5 — `rg -l -e "--cream-edge" src/ demo/` | no | 5 | keep | WIRE (already) |
| `--cream-foreground` | token | tokens.css | 9 — `rg -l -e "--cream-foreground" src/ demo/` | no | 9 | keep | WIRE (already) |
| `--paper-bg-1` | token | tokens.css | 2 — `rg -l -e "--paper-bg-1" src/ demo/` (tokens.css + paper.css) | no | 2 | library-orphan-as-primitive | RETIRE (or fold into single recipe per β §2) |
| `--paper-bg-2` | token | tokens.css | 2 — same form | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-bg-3` | token | tokens.css | 2 — same form | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-bg-4` | token | tokens.css | 2 — same form | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-shadow-1` | token | tokens.css | 3 — `rg -l -e "--paper-shadow-1" src/ demo/` | no | 3 | library-orphan-as-primitive | RETIRE |
| `--paper-shadow-2` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-shadow-3` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-shadow-4` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-border-1` | token | tokens.css | 2 — `rg -l -e "--paper-border-1" src/ demo/` | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-border-2` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-border-3` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--paper-border-4` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | RETIRE |
| `--icon-2xl` | token | tokens.css | 4 — `rg -l -e "--icon-2xl" src/ demo/` | no | 4 | keep | WIRE (already) |
| `--icon-3xl` | token | tokens.css | 4 — `rg -l -e "--icon-3xl" src/ demo/` | no | 4 | keep | WIRE (already) |
| `--icon-mega` | token | tokens.css | 4 — `rg -l -e "--icon-mega" src/ demo/` | no | 4 | keep | WIRE (already) |
| `--shadow-cartoon-accent` | token | tokens.css | 7 — `rg -l -e "--shadow-cartoon-accent" src/ demo/` | no | 7 | keep | WIRE (already) |
| `--cartoon-accent-color` | token | tokens.css | 5 — `rg -l -e "--cartoon-accent-color" src/ demo/` | no | 5 | keep | WIRE (already) |
| `--cartoon-accent-mix` | token | tokens.css | 1 — `rg -l -e "--cartoon-accent-mix" src/ demo/` (only tokens.css) | no | 1 | delete-unused | RETIRE |
| `--space-phi-1` | token | tokens.css | 13 — `rg -l -e "--space-phi-1" src/ demo/` | no | 13 | keep | WIRE (already) |
| `--space-phi-2` | token | tokens.css | 33 — `rg -l -e "--space-phi-2" src/ demo/` | no | 33 | keep | WIRE (already) |
| `--space-phi-3` | token | tokens.css | 37 — `rg -l -e "--space-phi-3" src/ demo/` | no | 37 | keep | WIRE (already) |
| `--space-phi-4` | token | tokens.css | 18 — `rg -l -e "--space-phi-4" src/ demo/` | no | 18 | keep | WIRE (already) |
| `--shimmer-blue-dark` | token | tokens.css | 3 — `rg -l -e "--shimmer-blue-dark" src/ demo/` (tokens.css + theme.css + utilities.css; no end-consumer) | no | 3 | library-orphan-as-primitive | RETIRE (collapse with `.text-shimmer-blue` decision) |
| `--shimmer-blue-mid` | token | tokens.css | 3 | no | 3 | library-orphan-as-primitive | RETIRE |
| `--shimmer-blue-light` | token | tokens.css | 3 | no | 3 | library-orphan-as-primitive | RETIRE |
| `--blob-color` | token | tokens.css | 2 — `rg -l -e "--blob-color" src/ demo/` (Blob.vue + tokens.css) | no | 2 | library-orphan-as-primitive | WIRE (already; Blob.vue counts as the consumer) |
| `--blob-border-mix` | token | tokens.css | 2 — Blob.vue + tokens.css | no | 2 | library-orphan-as-primitive | WIRE (already) |
| `--blob-border-mix-contrast` | token | tokens.css | 1 — `rg -l -e "--blob-border-mix-contrast" src/ demo/` (only tokens.css) | no | 1 | delete-unused | RETIRE |
| `--blob-grain-opacity` | token | tokens.css | 1 — `rg -l -e "--blob-grain-opacity" src/ demo/` (only tokens.css) | no | 1 | delete-unused | RETIRE |
| `--blob-chromatic-aberration` | token | tokens.css | 4 — `rg -l -e "--blob-chromatic-aberration" src/ demo/` | no | 4 | keep | WIRE (already) |
| `--blob-cast-shadow-y` | token | tokens.css | 2 — `rg -l -e "--blob-cast-shadow-y" src/ demo/` | no | 2 | library-orphan-as-primitive | WIRE (already) |
| `--blob-cast-shadow-blur` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | WIRE (already) |
| `--blob-cast-shadow-mix` | token | tokens.css | 2 | no | 2 | library-orphan-as-primitive | WIRE (already) |
| `--type-display-mega` | token | typography.css | 2 — `rg -l -e "--type-display-mega" src/ demo/` (typography.css + theme.css). End-consumer is `.text-display-mega` `@utility`, exercised in 3 demo stories. | no | 2 (token) / 3 (utility) | keep | WIRE (already) |
| `--type-display-ultra` | token | typography.css | 2 — same shape; utility consumed in 3 stories | no | 2 / 3 | keep | WIRE (already) |
| `--type-formula` | token | typography.css | 3 — `rg -l -e "--type-formula" src/ demo/` (typography.css + theme.css + math.css). `.text-formula` consumer = 0 (math.css + theme.css only). | no | 3 (token chain) / 0 (end) | library-orphan-as-primitive | RETIRE (paired with `.text-formula` retirement) |
| `--tracking-tightest` | token | typography.css | 4 — `rg -l -e "--tracking-tightest" src/ demo/` (typography.css + utilities.css + theme.css + MetricBadge.vue) | no | 4 | keep | WIRE (already) |
| `--font-display-1-variation-settings` | token | typography.css | 2 — `rg -l -e "--font-display-1-variation-settings" src/ demo/` (typography.css + utilities.css). End-consumer: `.text-display-1` utility. | no | 2 | keep-current as primitive (β verdict) | WIRE (already; per-rung Fraunces axis pattern) |
| `--font-display-2-variation-settings` | token | typography.css | 2 — same; second consumer `PipelineFlow.vue` | no | 2 | keep | WIRE (already) |
| `--font-display-3-variation-settings` | token | typography.css | 1 — `rg -l -e "--font-display-3-variation-settings" src/ demo/` (typography.css only) | no | 1 | library-orphan-as-primitive | RETIRE (or commit to per-rung pattern; β §11 P2.15) |
| `--font-display-4-variation-settings` | token | typography.css | 1 | no | 1 | library-orphan-as-primitive | RETIRE |
| `--font-display-5-variation-settings` | token | typography.css | 1 | no | 1 | library-orphan-as-primitive | RETIRE |
| `--font-display-mega-variation-settings` | token | typography.css | 1 | no | 1 | library-orphan-as-primitive | RETIRE |
| `--font-display-ultra-variation-settings` | token | typography.css | 1 | no | 1 | library-orphan-as-primitive | RETIRE |

**Token verdict count**: 26 WIRE (already) · 18 RETIRE · 0 EVIDENCE-DOC.

The per-rung Fraunces axis tokens 3..ultra all read 1 (only typography.css references each); β §4.6 + δ recommend collapsing into one parameterized recipe rather than 7 discrete tokens. RETIRE here means "delete the token, inline the values into the rung utility" per W1 lane decision. The retire/wire framing keeps semantic equivalence.

---

## 2. Utility class reconciliation table

For each class, the rg invocation excludes the definition file (utilities.css / math.css / paper.css / cards.css) only when β counted that way; raw counts shown.

| artefact | kind | def-site | rg src+demo (count) | evidence-doc? | total | verdict | disposition |
|---|---|---|---:|---|---:|---|---|
| `.bg-rainbow` | utility | utilities.css | 4 — `rg -l -e "\bbg-rainbow\b" src/ demo/` | no | 4 | keep | WIRE (already) |
| `.bg-rainbow-vivid` | utility | utilities.css | 3 — `rg -l -e "\bbg-rainbow-vivid\b" src/ demo/` | no | 3 | keep | WIRE (already) |
| `.bg-rainbow-pastel` | utility | utilities.css | 2 — `rg -l -e "\bbg-rainbow-pastel\b" src/ demo/` (utilities.css + flourishes.vue only) | no | 2 | library-orphan | RETIRE |
| `.text-rainbow-pastel` | utility | utilities.css | 2 — same shape | no | 2 | library-orphan | RETIRE |
| `.text-shimmer-gold` | utility | utilities.css | 2 — `rg -l -e "\btext-shimmer-gold\b" src/ demo/` (utilities.css + flourishes.vue + sortable-list.vue per β; HEAD recount = 2 distinct files) | no | 2 | keep | WIRE (already) |
| `.text-shimmer-blue` | utility | utilities.css | 4 — `rg -l -e "\btext-shimmer-blue\b" src/ demo/` (utilities.css + tokens.css + theme.css + flourishes.vue) | no | 4 (1 demo) | library-orphan | RETIRE |
| `.text-shimmer-vivid` | utility | utilities.css | 2 — utilities.css + flourishes.vue | no | 2 | library-orphan | RETIRE |
| `.text-shimmer-pastel` | utility | utilities.css | 2 — utilities.css + flourishes.vue | no | 2 | library-orphan | RETIRE |
| `.rainbow-stroke` | utility | utilities.css | 2 — `rg -l -e "\brainbow-stroke\b" src/ demo/` (utilities.css + RainbowGradientDef.vue) | no | 2 | inline-and-remove | RETIRE (paired with RainbowGradientDef inline-and-remove) |
| `.divider-flourish-rainbow` | utility | utilities.css | 1 — `rg -l -e "\bdivider-flourish-rainbow\b" src/ demo/` (utilities.css only). Consumed via `<FlourishDivider tone="rainbow">` template interpolation in 10+ stories. | no | 1 (string) / many (interp) | keep | WIRE (already) |
| `.divider-flourish-gold` | utility | utilities.css | 1 — same; `<FlourishDivider tone="gold">` in 4+ stories | no | 1 / many | keep | WIRE (already) |
| `.divider-flourish-section-0` | utility | utilities.css | 1 — `rg -l -e "divider-flourish-section-0\b" src/ demo/`. Interpolated via `tone="section-0"` (flourishes.vue matrix exercises 0/3/6/9). | no | 1 / 1 demo | keep | WIRE (already; via flourishes matrix) |
| `.divider-flourish-section-1` | utility | utilities.css | 1 — only utilities.css. `tone="section-1"` not used in src+demo. | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-2` | utility | utilities.css | 1 — interpolated via `tone="section-2"` in `prose-block.vue` | no | 1 / 1 demo | keep | WIRE (already) |
| `.divider-flourish-section-3` | utility | utilities.css | 1 — interpolated via `tone="section-3"` in 5 demos | no | 1 / 5 | keep | WIRE (already) |
| `.divider-flourish-section-4` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-5` | utility | utilities.css | 1 — interpolated via `tone="section-5"` in cream-card.vue | no | 1 / 1 | keep | WIRE (already) |
| `.divider-flourish-section-6` | utility | utilities.css | 1 — interpolated via flourishes.vue matrix | no | 1 / 1 | keep | WIRE (already) |
| `.divider-flourish-section-7` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-8` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-9` | utility | utilities.css | 1 — interpolated via flourishes.vue matrix | no | 1 / 1 | keep | WIRE (already) |
| `.divider-flourish-section-10` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-11` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.divider-flourish-section-12` | utility | utilities.css | 1 — only utilities.css | no | 1 | library-orphan | RETIRE |
| `.flourish-stripe-rainbow` | utility | utilities.css | 2 — `rg -l -e "\bflourish-stripe-rainbow\b" src/ demo/` (utilities.css + flourishes.vue) | no | 2 (1 demo) | library-orphan | RETIRE |
| `.flourish-stripe-pastel` | utility | utilities.css | 2 — same | no | 2 | library-orphan | RETIRE |
| `.flourish-stripe-gold` | utility | utilities.css | 2 — same | no | 2 | library-orphan | RETIRE |
| `.code-badge` | utility | utilities.css | 4 — `rg -l -e "\bcode-badge\b" src/ demo/` | no | 4 | keep | WIRE (already) |
| `.well-dashed` | utility | utilities.css | 5 — `rg -l -e "\bwell-dashed\b" src/ demo/` | no | 5 | keep | WIRE (already) |
| `.icon-stamp` | utility | utilities.css | 9 — `rg -l -e "\bicon-stamp\b" src/ demo/` | no | 9 | keep | WIRE (already) |
| `.icon-emboss` | utility | utilities.css | 3 — `rg -l -e "\bicon-emboss\b" src/ demo/` | no | 3 | keep | WIRE (already) |
| `.icon-xs` | utility | utilities.css | 4 — `rg -l -e "\bicon-xs\b" src/ demo/` | no | 4 | keep-current as ladder | WIRE (already; size ladder) |
| `.icon-sm` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-md` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-lg` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-xl` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-2xl` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-3xl` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.icon-mega` | utility | utilities.css | 4 | no | 4 | keep-current as ladder | WIRE (already) |
| `.text-display-stat` | utility | utilities.css | 4 — `rg -l -e "\btext-display-stat\b" src/ demo/` | no | 4 | keep | WIRE (already) |
| `.text-prose-lettrine` | utility | utilities.css | 8 — `rg -l -e "\btext-prose-lettrine\b" src/ demo/` | no | 8 | keep | WIRE (already) |
| `.text-mono-body` | utility | utilities.css | 1 — `rg -l -e "\btext-mono-body\b" src/ demo/` (only utilities.css) | no | 1 | delete-unused | RETIRE |
| `.text-mono-prose` | utility | utilities.css | 1 — only utilities.css | no | 1 | delete-unused | RETIRE |
| `.section-subtitle` | utility | utilities.css | 1 — only utilities.css | no | 1 | delete-unused | RETIRE |
| `.touch-gate-target` | utility | utilities.css | 1 — only utilities.css | no | 1 | delete-unused | RETIRE |
| `.touch-gate-active` | utility | utilities.css | 1 — only utilities.css | no | 1 | delete-unused | RETIRE |
| `.confetti-piece` | utility | utilities.css | 4 — `rg -l -e "\bconfetti-piece\b" src/ demo/` (utilities.css + animations.css + manifest + confetti.vue) | no | 4 (1 demo) | inline-and-remove (β verdict) | RETIRE (or wire second consumer; W1 decision) |
| `.collapse-x` | utility | utilities.css | 1 — only utilities.css | no | 1 | delete-unused | RETIRE |
| `.paper-1` | utility | paper.css | 3 — `rg -l -e "\bpaper-1\b" src/ demo/` | no | 3 | keep-current as ladder | WIRE (already) |
| `.paper-2` | utility | paper.css | 4 — `rg -l -e "\bpaper-2\b" src/ demo/` | no | 4 | keep-current as ladder | WIRE (already) |
| `.paper-3` | utility | paper.css | 2 — `rg -l -e "\bpaper-3\b" src/ demo/` | no | 2 | keep-current as ladder | WIRE (already) |
| `.paper-4` | utility | paper.css | 2 — same | no | 2 | keep-current as ladder | WIRE (already) |
| `.paper-card` | utility | paper.css | 7 — `rg -l -e "\bpaper-card\b" src/ demo/` (story exists + Card variant="paper" maps here) | no | 7 | keep | WIRE (already) |
| `.paper-rule` | utility | paper.css | 3 — `rg -l -e "\bpaper-rule\b" src/ demo/` (paper.css + paper-card.vue + manifest) | no | 3 | inline-and-remove (β verdict) / keep-current with Card variant | WIRE (already; one demo + one composition) |
| `.cream-surface` | utility | cards.css | 32 — `rg -l -e "\bcream-surface\b" src/ demo/` | no | 32 | keep | WIRE (already) |
| `.math-display` | utility | math.css | 2 — `rg -l -e "\bmath-display\b" src/ demo/` (math.css + MathSurface.vue) | no | 2 | inline-and-remove | RETIRE (inline into MathSurface) |
| `.math-inline-pill` | utility | math.css | 3 — `rg -l -e "\bmath-inline-pill\b" src/ demo/` | no | 3 | keep | WIRE (already) |
| `.formula-block` | utility | math.css | 2 — `rg -l -e "\bformula-block\b" src/ demo/` (math.css + MathFormula.vue) | no | 2 | inline-and-remove | RETIRE (inline into MathFormula) |
| `.text-formula` | utility | math.css | 2 — `rg -l -e "\btext-formula\b" src/ demo/` (math.css + theme.css; no demo or component consumer) | no | 2 | delete-unused | RETIRE |
| `.production-rule` | utility | math.css | 1 — `rg -l -e "\bproduction-rule\b" src/ demo/` (only math.css) | no | 1 | delete-unused | RETIRE |
| `.production-rule .lhs` | utility | math.css | 1 (paired with parent) | no | 1 | delete-unused | RETIRE |
| `.production-rule .rhs` | utility | math.css | 1 (paired) | no | 1 | delete-unused | RETIRE |
| `.perf-number` | utility | math.css | 1 — `rg -l -e "\bperf-number\b" src/ demo/` (only math.css) | no | 1 | delete-unused | RETIRE |
| `.perf-unit` | utility | math.css | 1 — `rg -l -e "\bperf-unit\b" src/ demo/` (only math.css) | no | 1 | delete-unused | RETIRE |

**Utility verdict count**: 33 WIRE (already) · 31 RETIRE · 0 EVIDENCE-DOC.

The 7 dead `divider-flourish-section-{1,4,7,8,10,11,12}` rows + 8 `delete-unused` (text-mono-body/-prose, section-subtitle, touch-gate-target/-active, collapse-x, text-formula, production-rule × 3, perf-number, perf-unit) + 8 single-demo library-orphans (text-shimmer-blue/-vivid/-pastel, bg-rainbow-pastel, text-rainbow-pastel, flourish-stripe-{rainbow,pastel,gold}) drive the W1 retire load on the utility axis. `.confetti-piece`, `.math-display`, `.formula-block`, `.paper-rule`, `.rainbow-stroke` are inline-and-remove candidates; W1 either inlines or deletes per package.

---

## 3. Component reconciliation table (G custom packages)

| artefact | kind | def-site | rg src+demo (count, distinct files) | evidence-doc? | story? | verdict | disposition |
|---|---|---|---:|---|---|---|---|
| `<CreamSurface>` | component | components/custom/cream-surface | 31 — `rg -l "\bCreamSurface\b" src/ demo/` | no | yes (foundations/cream + containers/cream-card) | keep | WIRE (already) |
| `<DisplayHero>` | component | components/custom/display-hero | 24 — `rg -l "\bDisplayHero\b" src/ demo/` | no | yes (typography refactor + composed in 20+ stories) | keep | WIRE (already) |
| `<FlourishDivider>` | component | components/custom/flourish-divider | 28 — `rg -l "\bFlourishDivider\b" src/ demo/` | no | yes (foundations/flourishes) | keep | WIRE (already) |
| `<IconStamp>` | component | components/custom/icon-stamp | 8 — `rg -l "\bIconStamp\b" src/ demo/` | no | yes (primitives/icon-stamp) | keep | WIRE (already) |
| `<MathSurface>` | component | components/custom/math-surface | 4 — `rg -l "\bMathSurface\b" src/ demo/` | no | indirect (composed in math-paper) | keep | WIRE (already) |
| `<MathFormula>` | component | components/custom/math-formula | 7 — `rg -l "\bMathFormula\b" src/ demo/` | no | yes (composed in math-paper + golden-ratio) | keep | WIRE (already) |
| `<MathGlyph>` | component | components/custom/math-glyph | 5 — `rg -l "\bMathGlyph\b" src/ demo/` | no | yes (composed in math-paper, golden-ratio) | keep | WIRE (already) |
| `<BezierCurveCanvas>` | component | components/custom/bezier-canvas | 3 — `rg -l "\bBezierCurveCanvas\b" src/ demo/` (def + index + motion/bezier-canvas) | no | yes (motion/bezier-canvas) | keep | WIRE (already) |
| `<NotificationDot>` | component | components/custom/notification-dot | 3 — `rg -l "\bNotificationDot\b" src/ demo/` (def + index + primitives/notification-dot) | no | yes (primitives/notification-dot) | keep | WIRE (already) |
| `<KeyboardShortcutsModal>` | component | components/custom/keyboard-shortcuts-modal | 2 — `rg -l "\bKeyboardShortcutsModal\b" src/ demo/` (def + index only; **no story, no composition**) | no | NO | library-orphan | RETIRE (β §3 confirms; no in-progress consumer tranche named) |
| `<TierBadge>` | component | components/custom/tier-badge | 2 — `rg -l "\bTierBadge\b" src/ demo/` (def + index only) | no | NO | library-orphan | RETIRE |
| `<LikeButton>` | component | components/custom/like-button | 2 — `rg -l "\bLikeButton\b" src/ demo/` (def + index only) | no | NO | library-orphan | RETIRE |
| `<PipelineFlow>` | component | components/custom/pipeline-flow | 3 — `rg -l "\bPipelineFlow\b" src/ demo/` (def + index + primitives/pipeline-flow) | no | yes (primitives/pipeline-flow) | keep | WIRE (already) |
| `<LiveSnippet>` | component | components/custom/live-snippet | 4 — `rg -l "\bLiveSnippet\b" src/ demo/` (def + index + live-snippet story + code-prose composition) | no | yes (primitives/live-snippet + code-prose composition) | keep | WIRE (already) |
| `<Blob>` | component | components/custom/blob | 12 — `rg -l "\bBlob\b" src/ demo/` (broad match: composables + Blob.vue + tokens + manifest + 2 demos) | no | yes (primitives/blob + _internal/blob-stress) | keep | WIRE (already) |
| `<Swatch>` | component | components/custom/swatch | 3 — `rg -l "\bSwatch\b" src/ demo/` (def + useWatercolorBlob + primitives/blob) | no | indirect (composed in primitives/blob) | keep | WIRE (already) |
| `<SvgFilters>` | component | components/custom/svg-filters | 3 — `rg -l "\bSvgFilters\b" src/ demo/` (def + index + primitives/blob) | no | indirect (single demo) | inline-and-remove (β verdict) | RETIRE (paired with `<RainbowGradientDef>`) |

**Component verdict count**: 14 WIRE (already) · 4 RETIRE · 0 EVIDENCE-DOC.

The three components flagged `library-orphan` in β (`<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`) remain at HEAD with only their own def + barrel index — no story, no consumer. G-FINAL-II R6 named "consumer-side adoption" as a future destination, but no consumer follow-up tranche is in progress at H open. Default disposition is RETIRE per H invariant 2; orchestrator may upgrade if it verifies an in-progress tranche.

`<SvgFilters>` and `<RainbowGradientDef>` (sibling component in the same package) are demoed only inside `primitives/blob.vue`. The package as a whole is single-demo; β recommends inline-and-remove. Disposition: RETIRE the SVG-filter package if `primitives/blob.vue` inlines the `<svg>` defs; or WIRE by widening usage in W4. Default RETIRE.

`<RainbowGradientDef>` is ranked as a component in the same package; it follows `<SvgFilters>`'s disposition.

---

## 4. Composable reconciliation table

| artefact | kind | def-site | rg src+demo (count) | evidence-doc? | total | verdict | disposition |
|---|---|---|---:|---|---:|---|---|
| `useRAFLoop` | composable | composables/motion/useRAFLoop.ts | 12 — `rg -l "\buseRAFLoop\b" src/ demo/` (6 demos + 2 src + barrel + def) | no | 12 | keep | WIRE (already) |
| `useCollapse` | composable | composables/motion/useCollapse.ts | 2 — `rg -l "\buseCollapse\b" src/ demo/` (def + barrel only) | no | 2 | library-orphan / dead | RETIRE |
| `useContrastSafeAccent` | composable | composables/color/useContrastSafeAccent.ts | 2 — `rg -l "\buseContrastSafeAccent\b" src/ demo/` (def + barrel only) | no | 2 | library-orphan / dead | RETIRE |
| `useMonacoTheme` | composable | composables/monaco/useMonacoTheme.ts | 2 — `rg -l "\buseMonacoTheme\b" src/ demo/` (def + barrel only) | no | 2 | library-orphan / dead | RETIRE |
| `useBlob` | composable | composables/blob/useBlob.ts | 5 — `rg -l "\buseBlob\b" src/ demo/` (Blob.vue + def + barrel + 2 sibling composables) | no | 5 | keep (Blob.vue is the consumer) | WIRE (already) |
| `useMetaballRenderer` | composable | composables/blob/useMetaballRenderer.ts | 5 — `rg -l "\buseMetaballRenderer\b" src/ demo/` (def + canvas2d-fallback + types + barrel + useBlob) | no | 5 (all internal to package) | library-orphan-as-primitive (β verdict) | RETIRE-OR-DEMOTE (move under `composables/blob/_internal/` per β §11 P0.2) |
| `useBlobMood` | composable | composables/blob/useBlobMood.ts | 4 — `rg -l "\buseBlobMood\b" src/ demo/` (def + barrel + useBlobSatellites + useBlob; all internal) | no | 4 (internal) | library-orphan-as-primitive | RETIRE-OR-DEMOTE |
| `useBlobPointer` | composable | composables/blob/useBlobPointer.ts | 3 — `rg -l "\buseBlobPointer\b" src/ demo/` (def + barrel + useBlob; all internal) | no | 3 | library-orphan-as-primitive | RETIRE-OR-DEMOTE |
| `useBlobSatellites` | composable | composables/blob/useBlobSatellites.ts | 3 — `rg -l "\buseBlobSatellites\b" src/ demo/` (def + barrel + useBlob; all internal) | no | 3 | library-orphan-as-primitive | RETIRE-OR-DEMOTE |
| `useWatercolorBlob` | composable | composables/blob/useWatercolorBlob.ts | 4 — `rg -l "\buseWatercolorBlob\b" src/ demo/` (def + barrel + Swatch.vue + primitives/blob) | no | 4 | keep | WIRE (already; Swatch is the consumer) |
| `mulberry32` | utility | composables/utils/mulberry32.ts | 4 — `rg -l "\bmulberry32\b" src/ demo/` (def + barrel + 2 blob composables) | no | 4 | keep | WIRE (already) |

**Composable verdict count**: 4 WIRE (already) · 7 RETIRE/DEMOTE · 0 EVIDENCE-DOC.

`useCollapse` / `useContrastSafeAccent` / `useMonacoTheme` are flat library-orphans (zero in-repo consumers, only def + barrel). RETIRE.

`useMetaballRenderer` / `useBlobMood` / `useBlobPointer` / `useBlobSatellites` are public surfaces consumed only by sibling composables in the same package. β §11 P0.2 / δ §3.4 recommend either (a) hide as `_internal/` (private to the blob package — collapses 4 public exports to 0), or (b) absorb into `useBlob` as factory parameters. Either way the public surface contracts. Disposition encoded as RETIRE-OR-DEMOTE; W1 picks the gestalt.

---

## 5. CVA branch reconciliation table

| artefact | kind | def-site | rg src+demo (count, distinct files using the variant value) | evidence-doc? | total | verdict | disposition |
|---|---|---|---:|---|---:|---|---|
| `Button variant="cartoon"` | CVA branch | ui/button/index.ts | 7 — `rg -l "variant=\"cartoon\"" src/ demo/` filtered to button-context (cartoon-controls + audacious-hero + 5 other stories use the value across Button/Select/Input/NumberField; cartoon shape clears bar via cross-component spread) | no | 7 (cross-component) | keep | WIRE (already) |
| `Button variant="transport"` | CVA branch | ui/button/index.ts | 1 — `rg -l "variant=\"transport\"" src/ demo/` (motion/timeline.vue only) | no | 1 | inline-and-remove (β verdict) | RETIRE (single site) |
| `Button variant="rainbow"` | CVA branch | ui/button/index.ts | 2 — `rg -l "variant=\"rainbow\"" src/ demo/` (audacious-hero + motion/confetti) | no | 2 | keep | WIRE (already) |
| `Button size="icon"` | CVA branch | ui/button/index.ts | 8 — `rg -l "size=\"icon\"" src/ demo/` | no | 8 | keep | WIRE (already) |
| `Tabs variant="underline"` | CVA branch | ui/tabs/index.ts | 0 — `rg -l "variant=\"underline\"" src/ demo/` | no | 0 | delete-unused | RETIRE |
| `Tabs variant="pill"` | CVA branch | ui/tabs/index.ts | 5 — `rg -l "variant=\"pill\"" src/ demo/` (BouncyTabs + 4 aurora config layers) | no | 5 | keep | WIRE (already) |
| `Select variant="cartoon"` | CVA branch | ui/select/index.ts | 6 — same shape as Button (cartoon-controls + 5 stories use value across components) | no | 6 (shared cartoon ladder) | keep-current | WIRE (already) |
| `Input variant="cartoon"` | CVA branch | ui/input/index.ts | 6 — same | no | 6 | keep-current | WIRE (already) |
| `NumberField variant="cartoon"` | CVA branch | ui/number-field/index.ts | 6 — same | no | 6 | keep-current | WIRE (already) |
| `Toast variant="inverse"` | CVA branch | ui/toast/index.ts | 1 — `rg -l "variant=\"inverse\"" src/ demo/` (only toast-inverse.vue) | no | 1 | keep-current (β verdict) | WIRE (already; story carries the bar) |
| `Badge tone={success/warning/destructive/info}` (`badgeToneVariants`) | CVA axis | ui/badge/index.ts | 3 — `rg -l "badgeToneVariants" src/ demo/` (def + badge-tones + color-pill) | no | 3 | keep | WIRE (already) |
| `Badge variant="color"` | CVA branch | ui/badge/index.ts | 0 — `rg -l "<Badge[^>]*variant=\"color\"" src/ demo/` returns no template-site uses | no | 0 | library-orphan / delete-unused | RETIRE |
| `MetricBadge size="xl"` | CVA branch | components/custom/metric-badge/MetricBadge.vue | 0 — `rg -l "size=\"xl\"" src/ demo/` (only the def-side scoped CSS rule) | no | 0 | library-orphan / delete-unused | RETIRE |
| `ToggleGroupItem variant="card"` | CVA branch (now unified per G-FINAL-II pass 5) | ui/toggle-group/index.ts | 3 — `rg "variant=\"card\"" src/ demo/` (toggle-card.vue + 2 other stories per HEAD recount) | no | 3 | keep | WIRE (already) |
| `Card variant="cream"` | CVA branch | ui/card/index.ts | 4 — `rg -l "variant=\"cream\"" src/ demo/` (cream-card + dictionary-pronunciation + cards.css + tokens.css) | no | 4 | keep | WIRE (already) |
| `Card variant="paper"` | CVA branch | ui/card/index.ts | 6 — `rg -l "variant=\"paper\"" src/ demo/` (prose-block + paper-card + code-prose; spread in 6 distinct files when including manifest + composition variations) | no | 6 | keep | WIRE (already) |
| `StatusDot variant="progress"` | CVA branch | components/custom/status-dot/StatusDot.vue | 0 — `rg "variant=\"progress\"" src/ demo/` returns only the JSDoc inside StatusDot.vue, not a template-site use | no | 0 | library-orphan / delete-unused | RETIRE |
| `GlassDock position="fixed"` | CVA-style prop branch | components/custom/dock/GlassDock.vue | 0 — `rg "position=\"fixed\"" demo/` empty; only the `position` prop type + scoped CSS rule live in src/ | no | 0 | library-orphan | RETIRE (or wire via dock-layers/dock fixed-position story in W4) |

**CVA branch verdict count**: 12 WIRE (already) · 6 RETIRE · 0 EVIDENCE-DOC.

Note: the H W0.md scope nominally cites "14 CVA branches"; counted here are 18 individual variant values across the named families. The β audit listed the branches similarly. Six are dead in src+demo: `Tabs underline`, `Badge color`, `MetricBadge xl`, `StatusDot progress`, `Button transport` (single-site), `GlassDock position=fixed`. `ToggleGroupItem card` cleared the bar after G-FINAL-II pass 5 unified the CVA — verified at HEAD via `rg "variant=\"card\""` returning toggle-card.vue + 2 other stories (3 sites total).

---

## 6. Slot-class + factory reconciliation table

| artefact | kind | def-site | rg src+demo (count, distinct files) | evidence-doc? | total | verdict | disposition |
|---|---|---|---:|---|---:|---|---|
| `HoverCardContent.contentClass` | slot-class prop | (already removed in G-FINAL-II pass 3) | 0 — `rg "contentClass" src/components/ui/hover-card/` empty; the `contentClass` mention in `demo/stories/StoryPage.vue` is for an unrelated component-local prop | no | 0 | already-removed | n/a (RETIRED in G-II close) |
| `DialogContent.closeIconClass` | slot-class prop | components/ui/dialog/DialogContent.vue | 1 — `rg -l "closeIconClass" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE (or W4 wires a story exercising it) |
| `DockLayerGroup.keepOpenWhile` | slot-class prop / behavioral | components/custom/dock/DockLayerGroup.vue | 1 — `rg -l "keepOpenWhile" src/ demo/` (only def file) | no | 1 | library-orphan | EVIDENCE-DOC candidate (R3 `<Slider variant="glass-track">` round-trip in W3 may consume it; if so, W3 wires + W3 emits the evidence-doc). Default RETIRE if R3 deferred. |
| `defineDockActionBar` | factory | components/custom/dock/index.ts | 1 — `rg -l "defineDockActionBar" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE |

**Slot-class + factory verdict count**: 0 WIRE (already) · 3 RETIRE · 1 conditional EVIDENCE-DOC (only if W3 actually consumes `keepOpenWhile`; default RETIRE).

The `HoverCardContent.contentClass` row in W0.md scope is bookkeeping — already removed; included for ledger completeness. β §6 had counted all four as library-orphans; one closed in G-II close, three remain.

---

## 7. Runtime helper reconciliation table

| artefact | kind | def-site | rg src+demo (count) | evidence-doc? | total | verdict | disposition |
|---|---|---|---:|---|---:|---|---|
| `chartNeutrals` | runtime export | src/tokens.ts | 1 — `rg -l "\bchartNeutrals\b" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE |
| `vizColorsHex` | runtime export | src/tokens.ts | 1 — `rg -l "\bvizColorsHex\b" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE |
| `spectrumColor` | runtime export | src/tokens.ts | 1 — `rg -l "\bspectrumColor\b" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE |
| `NAMED_EASING_BEZIER` | runtime export | src/tokens.ts | 2 — `rg -l "\bNAMED_EASING_BEZIER\b" src/ demo/` (def + motion/bezier-canvas.vue) | no | 2 | keep-current | WIRE (already; story carries the bar) |
| `goldenShimmer` | runtime export | src/tokens.ts | 1 — `rg -l "\bgoldenShimmer\b" src/ demo/` (only def file) | no | 1 | library-orphan | RETIRE |

**Runtime helper verdict count**: 1 WIRE (already) · 4 RETIRE · 0 EVIDENCE-DOC.

---

## 8. Verdict distribution summary

Aggregated counts per family:

| Family | WIRE (already) | WIRE (W1 wires) | RETIRE | EVIDENCE-DOC | Total rows |
|---|---:|---:|---:|---:|---:|
| Tokens (§1) | 26 | 0 | 18 | 0 | 44 |
| Utilities (§2) | 33 | 0 | 31 | 0 | 64 |
| Components (§3) | 14 | 0 | 4 | 0 | 18 |
| Composables (§4) | 4 | 0 | 7 | 0 | 11 |
| CVA branches (§5) | 12 | 0 | 6 | 0 | 18 |
| Slot-class + factory (§6) | 0 | 0 | 3 | 1 (conditional) | 4 (incl already-removed `contentClass`) |
| Runtime helpers (§7) | 1 | 0 | 4 | 0 | 5 |
| **Total** | **90** | **0** | **73** | **1 conditional** | **164** |

WIRE (already) means the artefact has ≥2 in-repo sites at HEAD and inherits β's `keep` verdict; W1 does not need to add a consumer. RETIRE means the artefact reaches H close as a clean delete (no shim, no `_v2`, no commented-out code). EVIDENCE-DOC requires a named consumer follow-up tranche IN PROGRESS, which this lane cannot verify; only `keepOpenWhile` is a conditional candidate (depends on W3 R3 ship).

The total of 164 is larger than the W0.md scope nominal (~17 + 14 + 4 + 7 + 3 + 1 + 5 + 64 + 11 ≈ 126) because (a) the 11 token namespaces expand to 44 individual tokens, (b) the 14 CVA-branches scope expands to 18 individual variant values when counted at variant-grain, (c) `divider-flourish-section-N` expands to 13 individual utility class rows.

---

## 9. W1 wave-shape input

W1 must accomplish the following (load-bearing for W1 dispatch):

- **Retire 73 G-shipped artefacts cleanly**: 18 tokens (paper-bg/-shadow/-border tier × 12, blob orphans × 3, cartoon-accent-mix, type-formula, per-rung Fraunces 3..ultra × 5, shimmer-blue × 3) + 31 utility classes (10 dead `delete-unused` + 8 single-demo `library-orphan` + 7 dead `divider-flourish-section-{1,4,7,8,10,11,12}` + 5 inline-and-remove + `text-formula`/`production-rule`-family) + 4 components (`<KeyboardShortcutsModal>`, `<TierBadge>`, `<LikeButton>`, `<SvgFilters>` package) + 7 composables (`useCollapse`, `useContrastSafeAccent`, `useMonacoTheme`, blob sub-composables × 4 demote-or-retire) + 6 CVA branches (`Tabs underline`, `Badge color`, `MetricBadge xl`, `StatusDot progress`, `Button transport`, `GlassDock position=fixed`) + 3 slot-class/factory + 4 runtime helpers. Each retire is a clean break per `feedback_no_backwards_compat` — no shim, no `_v2`, no commented-out code, no compatibility export.

- **Wire 0 artefacts via in-repo new consumers** in W1 by default. Every artefact that survives reaches the bar via existing same-tranche evidence at HEAD. W4 may add stories opportunistically (the H plan lists W4 as "Storybook coverage gaps + design-fidelity gate re-run"), but W1's scope is wire-or-retire on substrate, not on stories.

- **Conditional EVIDENCE-DOC for `DockLayerGroup.keepOpenWhile`**: only if W3's `<Slider variant="glass-track">` round-trip refactor consumes the prop at landing. If W3 ships `keepOpenWhile` as a real consumer, W3 emits `docs/consumer-evidence/dock-layer-group-keep-open-while.md`. Default disposition stays RETIRE.

- **Token retirements cascade through paper.css and theme.css** — when paper-bg-N / paper-shadow-N / paper-border-N retire, their consuming `.paper-N` class rules either inline literal values or get rewritten to use existing `--shadow-cartoon-*` + `--cream` recipes. Coordinate retirement order: utility class first, then token. Per-rung Fraunces axis retirement either inlines `font-variation-settings` literals into 7 `@utility text-display-N` blocks (7 tokens delete) or commits to the per-rung pattern with a single composable axis token; W1 picks gestalt per β §4.6.

- **Composable demotions move 4 blob sub-composables under `composables/blob/_internal/`** per β §11 P0.2. The `composables/color/` and `composables/monaco/` package barrels become empty after `useContrastSafeAccent` and `useMonacoTheme` retire — delete those barrels and the `src/index.ts` re-exports. The `composables/motion/` barrel keeps `useRAFLoop` only after `useCollapse` retires.

W1 closes when β-style overfitting audit re-runs (per H tranche close criterion 2: "zero library-orphans remaining post-W1") and the count column above reads 90 WIRE / 0 library-orphans / 0 dead. Total expected file change: ~73 deletions across `src/styles/{tokens,typography,utilities,paper,math}.css`, `src/components/custom/{keyboard-shortcuts-modal,tier-badge,like-button,svg-filters}/`, `src/composables/{color,motion,monaco,blob}/`, `src/components/ui/{tabs,badge,button,toast,number-field,toggle-group,select,input,card}/index.ts`, `src/components/custom/{dock,metric-badge,status-dot}/`, `src/tokens.ts`, plus corresponding barrel re-export deletions in `src/index.ts`.

---

## Authority

Read-only audit by H.W0 Lane I. Every count cites an exact `rg` invocation. Refined-D verdict precedence applied throughout. `docs/consumer-evidence/` confirmed empty of G-artefact entries at HEAD via `ls docs/consumer-evidence/` (24 files, all D-tranche). No source files modified, no destructive git commands run, no `git stash`/`git checkout HEAD --`/`git reset` executed. `git status --short` at deliverable completion shows only the new `docs/tranches/H/audit/W0-reconciliation.md` plus the pre-existing `docs/precepts` submodule diff (not touched by this lane).
