# M.W4 Lane γ — doc-drift audit

Read-only audit of every glass-ui doc surface against M HEAD `13e8d9e` (v1.0.5). Authored from the Lane γ Explore-agent return; agent was read-only, so the orchestrator persists the findings here.

## Methodology

Walked every doc surface listed in `docs/tranches/M/waves/W4.md` Lane γ scope and cross-referenced each against current source state via `rg` + `Read` + `package.json exports` enumeration. M HEAD reference: commit `13e8d9e` at v1.0.5 (after W2+W3 close).

## Findings summary

**Total**: 8 findings (5 P0 + 2 P1 + 1 P3). All doc-only; no source code drifts detected. All P0+P1 absorb cleanly in M.W4 — six targeted fixes.

## Critical drifts (P0)

1. **Wave-spec status out-of-sync** (W3 Lane B refresh missed W2/W3 close transition):
   - `docs/tranches/M/waves/W2.md` still shows "pending" — should be CLOSED `13e8d9e`.
   - `docs/tranches/M/waves/W3.md` still shows "IN-PROGRESS" — should be CLOSED `13e8d9e`.

2. **Missing close commit hashes**: W2.md + W3.md lack the `13e8d9e` close commit citation that W0.md + W1.md correctly cite.

3. **CLAUDE.md `ui/` directory count**: line 26 claims "44 shadcn-vue base component packages + _shared"; actual count is 45 (43 components + _shared + shared-tier). Off by 1.

4. **README.md component count inconsistent** with CLAUDE.md count (line 7).

5. **CLAUDE.md carousel subpath docs outdated**: line 251 does not reflect the v1.0.4 fix. v1.0.4 ships the full `Carousel*` component family on `/carousel`; CLAUDE.md still talks about the composable only.

## Semantic precision issues (P1)

6. **Subpath count phrasing**: CLAUDE.md:242 and README.md:159 both state 37 JS subpaths correctly, but the "38 entries total" exclusion logic is confusing. Suggest tightening to "37 flat subpaths + 1 `/styles` CSS bundle = 38 published exports".

7. Inherited count inconsistency between CLAUDE.md and README.md (related to #6).

## Other (P3)

8. Minor wording on `_shared` package — could be clearer about its role (chassis primitives vs general shared utilities). Cosmetic.

## Per-doc audit results

| Doc | Findings | Severity | Status |
|---|---|---|---|
| `CLAUDE.md` | 3 (lines 26 / 242 / 251) | 2× P0 + 1× P1 | absorb-in-W4 |
| `README.md` | 1 (line 7 / 159) | P0 + P1 | absorb-in-W4 |
| `DESIGN.md` | 0 | — | clean |
| `CHANGELOG.md` | 0 | — | clean (all v1.x.y tags verified; v1.0.0/v1.0.1/v1.0.2/v1.0.3/v1.0.4/v1.0.5 all exist) |
| `MIGRATION.md` | 0 | — | clean (all retired-symbol paths resolved + tested across constellation; carousel family verified on `/carousel` per v1.0.4) |
| `docs/tranches/M/M.md` | 0 | — | clean |
| `docs/tranches/M/waves/W0.md` | 0 | — | clean (close hash cited) |
| `docs/tranches/M/waves/W1.md` | 0 | — | clean (close hash cited) |
| `docs/tranches/M/waves/W2.md` | 1 status line | P0 | absorb-in-W4 |
| `docs/tranches/M/waves/W3.md` | 1 status line | P0 | absorb-in-W4 |
| `docs/tranches/M/waves/W4.md` | 0 | — | clean (in-progress; closes via this audit) |
| `docs/tranches/M/coordination/CONSTELLATION.md` | 0 | — | clean (§1 + §9 reflect close state across 14 surveyed repos) |
| `docs/tranches/M/PROGRESS.md` | 0 | — | clean (status table matches reality) |

## Disposition

All 7 P0+P1 findings absorb cleanly in M.W4 — six targeted fixes:
- CLAUDE.md (3 fixes: lines 26, 242, 251)
- README.md (1 fix)
- `docs/tranches/M/waves/W2.md` (1 status-line fix)
- `docs/tranches/M/waves/W3.md` (1 status-line fix)

No source changes needed. No gate risk for M.W4 close.

## Open questions

None blocking. The P3 finding (#8) is cosmetic and may stay deferred.

## Return

Status: NEEDS-ABSORB (6 in-W4 doc fixes). Orchestrator absorbs at M.W4 close.
