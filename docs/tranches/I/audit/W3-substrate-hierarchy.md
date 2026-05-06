# I.W3 Lane I — Substrate-tier Hierarchy Resolution

**Date**: 2026-05-05
**HEAD before W3.α**: `35773c4` (post-W1+W2 close)
**Author**: Lane α (substrate-tier hierarchy + story-fidelity policy + axis ownership + chronic-deferral assessments)
**Status**: closed.

## Purpose

Resolve the substrate-tier hierarchy violation flagged by:

- W0 reconciliation §1 row 8 — Card paper/cream three-paths chronic
- W1-F-flags C-9 — `<Card variant="cream">` vs `<CreamSurface>` duplicate authority
- W1-F-flags C-10 — `<Card variant="paper">` + `.paper-card` + `.paper-{1..4}` three paths
- I.md invariant 7 — "I W3 picks: collapse to one primitive, OR write a `DESIGN.md ## Substrate Hierarchy` section that names the layers explicitly"

## Disposition by tier

### Paper tier — DOCUMENT NAMED HIERARCHY (no source change in W3)

Two surviving paths, distinct roles. `<PaperBackdrop>` was already retired in I.W1 (single library-orphan consumer per W0 §2.1 row 5). The remaining two paths:

| Path | Role | Status |
|---|---|---|
| `<Card variant="paper">` | Chrome-aware paper card — card semantics + `.paper-card` recipe | retained |
| `.paper-{1..4}` utility ladder | Un-chromed lined-paper composition utility — four tier rungs for free-form composition areas | retained |

The two paths serve mechanically distinct purposes — Card is for card semantics (header / content / footer slots, chrome-aware variants); the `.paper-N` utility is a composition primitive for prose / math / specimen blocks where Card chrome would over-constrain. Codified in `DESIGN.md ## Substrate Hierarchy`.

**No source change** — both paths already exist and are honest. Documentation only.

### Cream tier — COLLAPSE-TO-CANONICAL (cream variant retired)

Two paths collapsed to one canonical primitive. The canonical primitive is `<CreamSurface>`; the underlying `.cream-surface` utility is the recipe component consumes. The third path (`<Card variant="cream">`) is retired.

| Path | Role | Status |
|---|---|---|
| `<CreamSurface tone="warm\|cool">` | **Canonical** — owns the recipe + `data-tone` branch | retained |
| `.cream-surface` utility | Underlying recipe; consumed by `<CreamSurface>` | retained (ad-hoc utility use permitted) |
| `<Card variant="cream">` | Card CVA branch — special-cased the cream substrate inside Card chrome | **RETIRED** in this wave |

**Source change**: `cream` variant removed from `cardVariants.variant` in `src/components/ui/card/index.ts`; consumers (`demo/stories/containers/cream-card.vue`, `demo/stories/compositions/dictionary-pronunciation.vue`) migrated to `<CreamSurface>` (standalone) or `<Card><CreamSurface>…</CreamSurface></Card>` (card semantics over cream substrate). Card.vue docstring updated; cards.css + tokens.css comments aligned.

Rationale for collapse over named-hierarchy: the cream tier's two-component model (`<CreamSurface>` plus `<Card variant="cream">` plus the utility) was the most acute three-paths offender on the substrate-hierarchy axis. Card's CVA carried no value-add beyond "wrap the cream-surface utility", whereas Card's `default`/`pane`/`subtle`/`cartoon` variants each bring distinct shadow + flush-prop contracts. The cream branch was special-cased; collapsing brings Card's CVA back to a coherent glass-tier-only set with the bezel `paper` exception that earns its place via the chrome-vs-utility split.

### Glass tier — DOCUMENT NAMED HIERARCHY (no source change in W3)

Single utility ladder (`.glass-{subtle,default,medium,elevated}`) anchored on Card defaults; `<GlassPanel>` was already retired in I.W1 (single library-orphan consumer per W0 §2.1 row 3). The named hierarchy:

| Path | Role | Status |
|---|---|---|
| `.glass-{subtle,default,medium,elevated}` utility ladder | **Canonical** four-tier opacity / blur / border / shadow ladder | retained |
| `<Card variant="default\|subtle\|cartoon\|pane">` | Card-semantic entry — applies the glass tier inside Card chrome | retained |

`<GlassPanel>` retired in W1 means there is no longer a standalone glass substrate component competing with the utility — the substrate-with-consumer precept holds. Codified in `DESIGN.md ## Substrate Hierarchy`.

## Source delta summary

| File | Change |
|---|---|
| `src/components/ui/card/index.ts` | Removed `cream` branch from `cardVariants.variant`; updated docstring naming `<CreamSurface>` as canonical |
| `src/components/ui/card/Card.vue` | Updated docstring — dropped cream variant, named the `<CreamSurface>` composition path |
| `src/styles/cards.css` | Comment naming `<CreamSurface>` as canonical primitive |
| `src/styles/tokens.css` | Cream namespace comment updated to name `<CreamSurface>` as canonical primitive |
| `demo/stories/containers/cream-card.vue` | First section migrated `<Card variant="cream">` → `<CreamSurface>`; multi-block content section migrated to `<Card><CreamSurface>…</CreamSurface></Card>` |
| `demo/stories/compositions/dictionary-pronunciation.vue` | Top-level `<Card variant="cream">` → `<Card><CreamSurface>…</CreamSurface></Card>` (card chrome over cream substrate) |
| `DESIGN.md` | New `## Substrate Hierarchy` section codifying paper / cream / glass tiers |

## Verification

```
$ rg -n 'variant="cream"' src/ demo/
(zero hits)

$ npm run typecheck
> vue-tsc --noEmit
(green)
```

## Authority

Substrate-tier hierarchy resolved per I.md invariant 7. One tier collapsed (cream — canonical primitive `<CreamSurface>`), two tiers documented as named hierarchies (paper and glass — both have a chrome-aware Card entry plus an un-chromed utility ladder). DESIGN.md `## Substrate Hierarchy` section is the canonical reference; future tranches consult it before adding new substrate paths.
