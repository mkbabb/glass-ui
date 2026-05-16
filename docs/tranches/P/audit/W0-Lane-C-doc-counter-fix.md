# P.W0 Lane C — Doc-counter γ-fix + bundle-budget rebaseline (orchestrator-direct)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (per W0.md Lane C; doc-only edits + one runtime constant in `scripts/profile-bundle.mjs`).

## §1 — Scope

Per `docs/tranches/P/waves/W0.md` Lane C + Pα B1 + Pγ count miscount + Pε-5 + O.W7 γ-M5 carryover + P-2 inheritance ledger item (CSS budget rebaseline).

The AB+1 shadow-execution cohort (v1.5.0 → v1.7.0; 12 commits over `b8246e07` → `b201b03` + 2 post-P-open follow-ons) accumulated:

1. Doc-counter γ-drift in `CLAUDE.md` (`/api` surface count, custom-package count, subpath count, directory tree).
2. Doc-counter γ-drift in `src/index.ts` (package-count comment).
3. Stale running tally in `src/api/index.ts` preamble.
4. Historical CHANGELOG "8 constants" arithmetic typos at v1.0.0 + v1.0.5 + v1.3.0 (carryover from O.W7 γ-M5; the O.W7 fix updated `src/api/index.ts` but not the historical CHANGELOG entries).
5. CSS bundle-budget overage (38_006 raw / 7_096 gzip vs. N.W0 baseline 36_000 raw / 6_700 gzip).

Lane C closes all 5.

## §2 — Artefacts edited

### 2.1 `CLAUDE.md`

| Line region | Before | After |
|---|---|---|
| L20 | `# 53 canonical public symbols (49 types + 4 constants)` | `# 55 canonical public symbols (51 types + 4 constants) — M.W2 + O.W4 + O.W6 extensions; P.W0 resync` |
| L72 | `# 31 custom package dirs` | `# 35 custom package dirs` |
| L73-113 (tree) | 31 entries | 35 entries — added `animated-digit/`, `metric-cell/`, `metric-stack/`, `responsive-tabs/` |
| L195 | `38 flat per-package subpaths` | `42 flat per-package subpaths` |
| L243 | `v1.4.0 ships **38 flat JS subpaths** (33 component packages...) ... 39 entries total` | `v1.7.0 ships **42 flat JS subpaths** (37 component packages...) ... 43 entries total` |

### 2.2 `src/index.ts`

| Line region | Before | After |
|---|---|---|
| L52 | `Of the 30 packages in src/components/custom/` | `Of the 35 packages in src/components/custom/` |
| L54 | `The other 23 reach consumers ONLY via their dedicated subpath` | `The other 28 reach consumers ONLY via their dedicated subpath` |
| L70 (`vertical/themed substrate` enumeration) | `(metaballs, paper-backdrop, search)` | `(metaballs, paper-backdrop, search, animated-digit, metric-cell, metric-stack, responsive-tabs)` |

### 2.3 `src/api/index.ts`

Added P.W0 Lane C resync block to the preamble after the O.W6 entry. The block documents the canonical at-HEAD surface count (55 / 51 types + 4 constants) and the rationale for the 2-type drift between the O.W6 running tally (53) and the actual HEAD count.

### 2.4 `CHANGELOG.md` — FIX-WITH-NOTE (P invariant 28)

| Line | Before | After |
|---|---|---|
| L543 (v1.3.0) | `Surface count 37 → 49 (41 types + 8 constants):` | `Surface count 37 → 49 (41 types + 4 constants — historical arithmetic typo corrected at P.W0 Lane C; the constant count never changed from the 4 Aurora + Metaballs constants):` |
| L1503 (v1.0.5) | `Surface count: 32 → 37 (29 types + 8 constants).` | `Surface count: 32 → 37 (29 types + 4 constants — historical arithmetic typo corrected at P.W0 Lane C).` |
| L1884 (v1.0.0) | `re-exporting 32 canonical public symbols (24 types + 8 constants/runtime values)` | `re-exporting 32 canonical public symbols (24 types + 4 constants/runtime values; the original entry said 8 — corrected at P.W0 Lane C)` |

Per P invariant 28, FIX-WITH-NOTE preserves historical accuracy by leaving the editorial trace inline rather than silently rewriting frozen entries.

A new P.W0 Lane C sub-section was added to the existing `## 1.7.0` entry documenting the full doc-counter resync + bundle-budget rebaseline.

### 2.5 `scripts/profile-bundle.mjs` — CSS budget rebaseline

The CSS budget bumped from `36_000 raw / 6_700 gzip` to `42_000 raw / 7_400 gzip` (≈ 10 % headroom over the 38_006 / 7_096 current draw). Inline rationale block added documenting the AB+1 cohort additions that drove the bump — analog of the N.W0 rebaseline block against the AB tranche.

JS bundle (`dist/glass-ui.js`) is unchanged: 127_781 raw / 22_931 gzip = 67.3 % / 68.0 % of the 190_000 / 33_700 budget. No JS rebaseline needed.

## §3 — Verification

```
$ npm run typecheck                # PASS
$ npm run build                    # PASS (44.95 s; 44 dist entries)
$ npm run verify-export-types      # PASS (all targets + type resolutions valid)
$ npm run profile:budget           # PASS post-rebaseline:
                                   #   [PASS] dist/glass-ui.js  — raw 127781 / 190000 (67.3%); gzip 22931 / 33700 (68.0%)
                                   #   [PASS] dist/glass-ui.css — raw 38006 / 42000 (90.5%); gzip 7096 / 7400 (95.9%)
$ npm test                         # PASS (32 files / 361 tests)
```

No source-shape changes; doc edits only (plus the runtime constant in `scripts/profile-bundle.mjs`). Verifications run as a sanity check rather than for shape regression.

### Grep verification (zero stale counts)

```
$ grep -n -E '53 canonical|49 canonical|37 flat|38 flat|31 custom|30 packages' CLAUDE.md src/api/index.ts src/index.ts
```
returns zero matches at HEAD.

## §4 — Hard-gate compliance

W0.md Lane C hard gate:
- (a) ✅ `docs/tranches/AB+1/` authored (Lane A; not Lane C scope).
- (b) ✅ v1.7.0 git tag exists + canonical gate matrix output documented (Lane B).
- (c) ✅ Doc-counter drifts fixed; the grep above returns zero matches.
- (d) ✅ All 5 gates green at the W0 close measurement.
- (e) ✅ Lane C proof doc (this file) ships.

## §5 — P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: doc-counter resync is a freshness alignment, not a legacy artefact; no shim, alias, or back-compat preserved.
- **P invariant 28 (zero deferral)**: every P-2 inherited carry-forward absorbed at this wave; no items shifted to a successor wave.
- **P-7 carryover (O.W7 γ-M5 "8 constants" typo)**: closed by the FIX-WITH-NOTE pattern at the v1.0.0 + v1.0.5 + v1.3.0 historical CHANGELOG entries.

## §6 — Status: COMPLETED.
