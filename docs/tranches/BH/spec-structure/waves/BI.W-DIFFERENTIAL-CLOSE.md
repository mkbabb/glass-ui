# BI.W-DIFFERENTIAL-CLOSE — the born-RED differential re-run over the ACTUAL cut HEAD (R6-FOLD directive #4)

> **Wave id:** `BI.W-DIFFERENTIAL-CLOSE` · **band:** S4 (RESIDUE VERIFICATION) · **class:** `H` (device-free) ·
> **gate:** the born-RED DIFFERENTIAL (every structural gate born-RED→GREEN over the mechanically-applied rewrite)
> + the resolves-on-disk floor + the basename-keyed / `@source` / test-typecheck / README-scope confirms ·
> **preconds:** BI.W-CSS-COLOCATE-B2, BI.W-FOLD-CENSUS, BI.W-README-REMEDIATE, BI.W-GUTS-RESIDUAL,
> BI.W-BLOCK-DISJOINT. The terminal glass-ui verification. Runs SOLO (batch B9).

## §0 — Verdict

The residue's binding directive: re-run the ENTIRE born-RED→GREEN differential over the ACTUAL cut HEAD (never a
verification HEAD). Every count was a snapshot; the cut moved under the live engine; this wave proves the whole
reshape lands GREEN over the mechanically-applied rewrite AT the cut, and closes the last completeness confirms
the path-literal census cannot see.

## §1 — The differential + the confirms

1. **The born-RED differential.** Every structural gate (G1 `proof:colocation`, G3 `proof:depth`, G4
   `proof:import-boundaries`, G6 `proof:css-colocation`/`-golden`/`-ownership`, G7 `proof:no-tier-literal`, G10
   `proof:no-glass-in-dist`, `proof:barrel-pure`) born-RED on the pre-move cut HEAD → GREEN over the applied
   rewrite. The differential is the witness the reshape LANDED, not merely that the gates exist.
2. **The differential resolves-on-disk floor made ABSOLUTE.** `{post-flatten danglers} \ {pre-flatten danglers}
   == ∅` (flatten-induced = 0). The 46 pre-existing stale-ref danglers PRUNE here (the `scripts/` god-dir
   disposition, no-legacy edict) — making the floor ABSOLUTE-clean rather than differential (the frozen-allowlist
   differential is the fallback if the prune is deferred).
3. **The basename-keyed parse confirm** (blocker-fold #7 close) — CONFIRM `proof:css-critical`'s `index.css`
   completeness parse extracts partial identity by BARE BASENAME, not by full `@import` specifier (a specifier-
   keyed parse false-REDs the instant B1 rewrites the `@import`). One-line cut-time confirmation.
4. **The `@source` resolves-on-disk assertion** — every `@source` in demo/scripts CSS points at an existing
   dir/glob (catches the `demo.css:96-97` silent scan-glob break).
5. **The test typecheck** — `vue-tsc -p tsconfig.test` GREEN (the SOLE gate catching the tests-recompute-vs-drop
   mislabel).
6. **The README-scope reconfirm** (R6-FOLD directive #5) — does G1 scan graduated product-app feature
   `ui/<Name>/` folders? no ceremony-README storm one level down? Confirm the machinery-gated trigger's SCOPE at
   feature-interior scale.

## §2 — Binding criteria

- Every gate GREEN over the applied rewrite at the cut HEAD.
- The resolves-on-disk floor is ABSOLUTE-clean (the 46 danglers pruned) OR the frozen-allowlist differential holds
  (fallback).
- All four confirms (basename-keyed, `@source`, test-typecheck, README-scope) PASS.
- `proof:full` (the deduped `local ∪ ci ∪ release` union) runs siblings-absent in a fresh `/tmp` throwaway
  worktree (NEVER moving the user's real repos) — the CI-accurate battery.

## §3 — Fences

- This closes GLASS-UI's own tree; the sibling censuses close in their own ASK waves (S5).
- The `/tmp` worktree is a FRESH `git worktree add` — the siblings-absent emulation NEVER moves `~/Programming`
  (inv-26; `scripts/verify-siblings-intact.mjs` runs before AND after).
- ZERO paint change (the differential is device-free).

## §4 — Cross-refs

R6-FOLD directives #4 + #5; blocker-fold #7 (basename-keyed); §6 G7-companion (the close battery); §9.11 (the 46
danglers prune); BB.W-CLOSE-BATTERY (the `--run full` siblings-absent discipline).
