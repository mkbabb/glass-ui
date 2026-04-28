# A.D.research.02 — Tranche C Deep Retrospective

## Commit-by-commit verification

All 22 C-tagged commits verified against current master. Every commit message matches its diff. No silent intermediate-state-broken windows.

| Sub-phase | Commit | Status |
|---|---|---|
| C.W1.A IconTooltip self-host | `fad99f1` | ✓ TooltipProvider wraps Tooltip body |
| C.W1.B StoryPage host | `05511d5` | ✓ TooltipProvider wraps article; bundles WIP kind-discriminator (disclosed) |
| C.W1.C utility migration | `4f33675` | ✓ 60 sites migrated; `rg 'font-mono-code'` returns 0 |
| C.W1.D theme.css radius | `f6bd90e` | ✓ 7 lines map to primitives, not self |
| C.W2.A DockTabButton | `12a558d` | ✓ scoped Vue component (not @utility) |
| C.W2.A StoryPager rewrite | `5372155` | ✓ GlassDock + DockTabButton + RouterLink |
| C.W2.B dashboard responsive | `6ef298f` | ✓ grid-cols-2 2xl:grid-cols-4 |
| C.W2.C Rail max-h | `b839543` | ✓ overflow-y-auto + scrollbar-hidden |
| C.W3.A math-paper glyph | `faddbed` | ✓ .fourier-f removed from inline prose |
| C.W3.B aurora preset mask | `9966c1d` | ✓ uses existing .scroll-fade-mask |
| C.W3.C Configurator binding | `dd8b73f` | ✓ v-model |
| C.W3.D favicon | `4dd0d28` | ✓ data-URL link |
| C.W3.D aurora flat-route | `69c1d1c` | ✓ FLAT_STORIES + kind-discriminator |
| C.W3.D aurora story refactor | `4f84e64` | ✓ user work |
| C.W3.D aurora library | `70dcfa5` | ✓ user work |
| C.W3.D ExpandableContainer | `f1d3815` | ✓ defineModel + registerShortcut |
| C.W5 cleanup sweep | `304ac78` | ✓ ScrollArea/ScrollPane + 3 CSS classes deleted |
| C.W5 close ceremony | `2b31920` | ✓ FINAL.md + retro + W4 evidence; tag c-close |

## Specific questions answered

### 1. §1 TooltipProvider — closed cleanly?
YES. IconTooltip self-hosts (line 2-9); StoryPage hosts (line 30-56). 14 LabeledField use sites all covered. No other `src/components/custom/` components wrap reka-ui Tooltip primitives without providers.

### 2. font-mono-code → fira-code migration — fully done?
YES. `rg 'font-mono-code' src/ demo/` returns zero. Commit `4f33675` migrated 60 sites across 25 files cleanly.

### 3. DockTabButton pivot — does the pattern compose?
YES. All four dock-surface button types (IconButton, TabButton, SelectTrigger, DropdownTrigger) use the same idiom: reka-ui Primitive/Trigger root + scoped four-state styles + no companion CSS classes. The original `@utility dock-tab-btn` plan would have re-introduced the very pattern dock.css explicitly retired. Pivot is architecturally sound.

### 4. Aurora WIP commits — independently cherry-pickable?
NO — but disclosed. `69c1d1c` (flat-route foundation) requires manifest+router+navigation shape that `4f84e64` (aurora content) consumes. They're sequenced bundling. Documented across three commits as "work-in-progress that fully resolves at C.W3.D." Acceptable under bbnf-lang's Absorb-mode pattern with explicit disclosure.

**Risk flagged for D**: kind-aware navigation pattern (discriminator + flat-route structure) is now baked into core. Touches 5 demo/ infrastructure files + manifest type. D must document the flat-route contract so future story categories don't accidentally break it.

### 5. W5 sweep — "4 verified deletes" claim held?
YES. Audit-claim hardening discipline caught 3 false positives (`.glass-btn`, `.btn-pill`, `.input-pill` all have real consumers). Final sweep landed only verified items: ScrollArea, ScrollPane, .cartoon-card, .elevated-card, .dock-play-btn.

### 6. Navigation reform bundled at C.W1.B — clean or premature?
Defensive scaffolding; not broken. C.W1.B's kind check (`if (loc.kind === "category")`) is safe when kind is undefined (returns single-segment eyebrow). C.W2.A's categoryLoc computed similarly safe. Full structure activates at C.W3.D's `69c1d1c` without intermediate-broken windows. Disclosed in PROGRESS.md.

### 7. What did C explicitly defer to D?
- 101 library-orphan candidates (38 custom/ + 63 composables — 63 is upper bound; cross-package imports inflate the count)
- D scope: triage → demo-wire / generalize / delete-with-`src/index.ts`-removal
- Chronic debt not explicitly listed: kind-aware navigation pattern (now structural; D should document)

`package.json` was NOT modified in C. Script at c-close is still `"typecheck": "vue-tsc --noEmit"`. The `bench` rename observed in working-tree drifted from outside C and was reverted before close.

## Bundled-work analysis

Three gestalt scope-reveals — all disclosed:

| Scope | Plan | Actual | Risk |
|---|---|---|---|
| C.W1.C | add 2 @utility blocks | migrate 60+1 sites to existing utilities | Low — net-positive deduplication |
| C.W2.A | add @utility dock-tab-btn | DockTabButton.vue Vue component | Low — matches dock.css's stated retirement |
| C.W3.B | inline mask-image | use existing .scroll-fade-mask | Low — zero new CSS |

Two cross-wave bundles:
- C.W1.B kind-discriminator → C.W2.A pager gating → C.W3.D full structure (sequenced; safely defensive at intermediate states)
- C.W3.D aurora WIP: 14 files + 2 untracked vs plan's "5"; user-work attribution in 4 logical commits

## Chronic debt past c-close

| Item | Severity | D Destination |
|---|---|---|
| 101 library-orphan candidates | High | D.W1 (wire) + D.W2 (delete) + D.W3 (forward-compat) |
| 63 composables audit upper-bound inflated | Medium | D re-audit with looser grep patterns |
| Kind-aware navigation pattern now core | Medium | D documentation phase |

## Anti-patterns to bind against (C-specific)

1. **Floor-check audit gates against verdict rules.** First three W0.A agents auto-kept 100% under the canned prompt. Gate ("≥ 5 actionable") was technically reachable only after `library-orphan` verdict added mid-W0. **D lesson**: simulate the audit under its actual rules before plan-time to ensure floor numbers are achievable.

2. **Search for existing utilities before adding new ones.** C ran into this three times. **D checklist item**: pre-wave grep — "is there already a class/utility for this?"

3. **`git diff --stat` over `git status -s` for WIP review.** Status shows what; stat shows magnitude. **D rule**: stat-based estimate for any pre-tranche WIP review.

4. **Library-orphan triage at every close.** Otherwise candidates accumulate. C.W5 ran the audit; verdicts produced; 101 orphans forwarded. **D bound by §Invariant 5**.

5. **Audit-claim hardening.** Agent claims aren't artefacts. Re-verify with grep before action. **D rule**: every audit-driven action re-checks the claimed evidence.

## Summary

C closed cleanly. 22 commits across W0–W5. All seven W4 hard gates green (TooltipProvider hosting, font migration, grid responsive, pager clamped, rail scrollable, zero console errors, consumer builds clean). Three gestalt pivots (font-mono-code, dock-tab-btn, scroll-fade-mask) all disclosed. Bundled work properly attributed. No silent deferrals. 101 orphans forwarded explicitly to D with the canned audit ready to re-run at D close.

**For D's planning**: 101-candidate triage is pre-staged. Navigation shape is canonical. No critical blockers. Ready for Wiring + Cleanup phase.
