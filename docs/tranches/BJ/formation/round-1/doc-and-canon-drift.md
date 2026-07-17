# Round 1 — doc-and-canon-drift (?)

## Summary

A real, richly-semantic radius + blur + √φ-type token system exists in src/styles/theme/radius.css, tokens/glass.css and typography/scale.css — but it is NOT enforceable: the gate battery was collapsed to vitest + Playwright, no static lint forbids raw border-radius/backdrop-filter/font-size, and raw off-ladder values (drawer blur(14px), SortableList 999px, segmented 5px/4px+13px) ship at HEAD, so exactly the class the user reports (F12/F15/F17 unrounded, F28/F48 inconsistent blur) has no gate to catch it. The binding "where does a style go?" authority — design-idioms.md §3 home-map + §7 central-partial rule — describes a DEAD file layout: 6 named src/styles/*.css files were colocated into component dirs (index.css's ledger was updated, the doc was not, and §7 now flatly contradicts reality). Several tokens/rationales are stale-over-dead (corner-k-soft/-sharp pinned by a gate that no longer exists; --radius-input misnamed; tunable-anim's 4px reveal-blur default gone).

## Findings (6)

### [major] unenforced-token-system

**Claim:** The radius/blur/type token systems exist but are NOT lintable — no static gate forbids raw border-radius/backdrop-filter/font-size, so the user's exact reported regression class (unrounded controls, inconsistent blur) ships unguarded.

**Evidence:** package.json `test = vitest run`; no proof-*.mjs in scripts/ at HEAD (only docs/tranches/BH/spec-structure/proto-gates/* and .claude/integrate-tmp/*, both non-live). The one live radius gate tests-visual/squircle-language.spec.ts only reads back computed cornerShape on .glass-dock/.glass-card (lines 38-96) — it asserts zero raw-value hygiene. Raw values shipping at HEAD: src/components/drawer/styles.css:379 `backdrop-filter: blur(14px)`; src/components/sortable-list/SortableList.vue:144 `border-radius: 999px`; src/components/tabs/styles/segmented.css:169 `0.3125rem`, :306 `0.25rem`. Nothing greps src/ for these.

**Proposed:** build — add a BJ wave for a static token-hygiene gate (grep src/ for raw border-radius/backdrop-filter/font-size literals outside theme/tokens files, allowlist true circles 50%/organic blobs) so the radius+blur+type ladders become enforceable; this is the answer to the lens' 'is it enforceable' question — currently NO.

### [major] canon-describes-dead-file-layout

**Claim:** design-idioms.md — the doc §1 declares BINDING for 'where does a new @utility/style go?' — §3 home-map and §7 central-partial rule point to 6 files that do not exist at their documented src/styles/ paths; the styles were colocated into component dirs and the doc was never updated.

**Evidence:** docs/precepts/design-idioms.md §3 table (lines 94-99) names src/styles/feedback-tone.css, src/styles/menu.css, src/styles/cards.css, src/styles/dock-controls.css, src/styles/instrument-chassis.css, src/styles/utilities/animate.css — all absent from src/styles/ (verified by ls + find; present only in .claude/worktrees/* and dist/). Actual homes: src/components/_shared/feedback-tone.css, src/components/_shared/menu.css, src/components/card/styles.css (cartoon-surface), src/components/dock/styles/controls.css, src/components/instrument-chassis/styles.css. index.css's cascade ledger WAS updated to these (index.css:186 imports ../components/_shared/feedback-tone.css, :203 menu.css, :206 instrument-chassis/styles.css). Worse, §7 (lines 226-231) still mandates 'A component's visual recipe lives in a CENTRAL partial (a src/styles/*.css file)... NOT in the component's feature-dir' — now false and self-contradicted by §3's own updated reality.

**Proposed:** build — rewrite design-idioms.md §3 home-map + §7 to the post-A07 colocation reality (per-component styles live in components/<dir>/styles.css + components/_shared/*.css, index.css imports them); reconcile §7's 'central partial only' rule which is now inverted.

### [minor] stale-gate-rationale-over-dead-token

**Claim:** radius.css keeps two dead tokens (--corner-k-soft/-sharp, zero var() consumers) alive on the rationale that they are 'pinned by proof:squircle-language (the TOKEN-AXIS-EXISTS clause)', but that source-arm gate no longer exists after the gate abrogation.

**Evidence:** src/styles/theme/radius.css:113-119 states the k-soft/k-sharp rungs 'have no runtime var() consumer but ARE pinned by proof:squircle-language...so KEPT, not swept; the clean-break delete is a coordination follow-up once the gate re-anchors.' grep confirms zero var(--corner-k-soft|--corner-k-sharp) consumers in src/. No proof-squircle-language.mjs exists anywhere live (find over repo minus node_modules/worktrees/dist = none). The only live squircle gate (tests-visual/squircle-language.spec.ts) checks cornerShape readback, not token-axis existence — so the tokens are unguarded dead code and the 'delete once the gate re-anchors' trigger can never fire.

**Proposed:** fold-into-BJ-radius-audit — either delete the two dead k-tokens (clean break, no consumers) or correct the radius.css rationale to stop citing a non-existent gate.

### [minor] semantic-alias-points-at-wrong-surface

**Claim:** --radius-input is a misnomer: it resolves to 10px and is consumed by Skeleton/Avatar/Command, NOT by the Input control, which uses --radius-pill — a consumer retuning --radius-input to fix input rounding would silently change skeletons/avatars instead.

**Evidence:** src/styles/theme/radius.css:35 `--radius-input: var(--radius)` (=0.625rem/10px), and its own prose (lines 37-46) says 'single-line controls (Input, SelectTrigger) keep the pill'. Actual Input radius: src/components/_shared/field-control.css:34 `.field-control[data-kind="input"]{border-radius: var(--radius-pill)}`. --radius-input's only consumers: src/components/skeleton/Skeleton.vue:35, src/components/avatar/styles.css:43, src/components/command/styles.css:41. The internal contradiction (a --radius-input token that inputs don't use) is itself a canon defect.

**Proposed:** fold-into-BJ-radius-audit — rename --radius-input to its true role (e.g. --radius-media/--radius-tile) or point Input at it; resolve the radius.css prose-vs-value contradiction.

### [note] stale-canon-default

**Claim:** tunable-anim.md documents --glass-reveal-blur default = 4px (range [0,8px]), but no 4px default exists in code — the reveal blur is bound per entry-register to 2px/6px/8px, so the canon's single-default description is stale.

**Evidence:** docs/precepts/tunable-anim.md:121 row `reveal blur | --glass-reveal-blur | 4px | [0,8px]`. Code: src/styles/glass/reveal.css binds --glass-reveal-blur to per-register vars (:62/:99 --enter-overlay-blur, :108 --enter-menu-blur, :117 --enter-tooltip-blur, :126 --enter-transient-blur), whose defaults are src/styles/tokens/motion-registers.css:57 overlay 6px, :64 menu 2px, :71 tooltip 0px, :80 transient 8px. No `--glass-reveal-blur: 4px` root default anywhere.

**Proposed:** fold-into-BJ-doc-truthup — update tunable-anim.md to the per-register blur model (0/2/6/8px), or drop the fictional 4px default.

### [note] blur-ladder-collision-and-mode-divergence

**Claim:** The --glass-blur-* ladder has value-collapsed rungs (quiet==resting==7px, floating==overlay==11px) and the overlay rung silently jumps 11px→17px on 2dppx+ displays — a plausible source of the F28/F48 'blurs are inconsistent' report that no canon doc reconciles.

**Evidence:** src/styles/tokens/glass.css:86-89,97 radii: wash 1px, quiet 7px, resting 7px, floating 11px, overlay 11px; deep is src/styles/tokens/glass-deep.css:56 16px. src/styles/tokens/light-dark.css:31-36 overrides --glass-blur-overlay-radius to 17px under @media (min-resolution: 2dppx) — a ~55% overlay-blur jump by device DPI. The overlap (quiet/resting, floating/overlay) means the named ladder has fewer distinct rungs than names, so 'named' blur choices don't visibly differ. No precept documents the blur ladder or the DPI divergence as intentional.

**Proposed:** fold-into-BJ-blur-audit — F48 already asks for an app-wide blur re-calibration ('slightly more subtle for ALL glass'); collapse the duplicate rungs or rename them, and document the ladder + DPI arm in a precept so it is auditable.

