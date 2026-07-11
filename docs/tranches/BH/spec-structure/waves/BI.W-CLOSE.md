# BI.W-CLOSE — the tranche close battery + the 5.1.0 cut

> **Wave id:** `BI.W-CLOSE` · **band:** S6 (CLOSE) · **class:** `H` (device-free) · **gate:** `proof:full`
> siblings-absent (the deduped `local ∪ ci ∪ release` union) + `proof:ba-gestalt` recorded backstop + the 5.1.0
> cut · **preconds:** BI.W-G8-PROMOTE (and, transitively, every BI wave). The absolute-last act.

## §0 — Verdict

The constellation structure standard is executed on glass-ui; the four siblings have their precise ASKs; the LAW
is promoted. This wave runs the FULL battery siblings-absent in a clean checkout BEFORE the irreversible tag, then
cuts 5.1.0 (a semver-MINOR: ZERO public-export churn — the subpath surface is untouched).

## §1 — The close battery (siblings-absent, the BB.W-CLOSE-BATTERY discipline)

- **`proof:full` — the deduped union of the `local`, `ci`, and `release` tag sets** — run in a FRESH throwaway
  glass-ui worktree in `/tmp` (`git worktree add /tmp/<verify-dir>`), siblings-absent by construction. NOT `--run
  local` or `--run release` alone (the close-class lie BB killed). `proof:close-battery-parity` locks the path.
- **`verify-siblings-intact.mjs`** runs BEFORE and AFTER — RED if any real repo sits in `/tmp/sibling-park`/
  `/tmp/sibling-stash` (the park-not-restored tripwire, inv-26). The siblings-absent emulation NEVER moves
  `~/Programming`.
- Every structural gate GREEN over the applied rewrite at the cut HEAD (the BI.W-DIFFERENTIAL-CLOSE differential
  re-confirmed in the clean checkout): `proof:colocation`, `proof:depth`, `proof:import-boundaries`, `proof:css-
  colocation`/`-golden`/`-ownership`, `proof:no-tier-literal`, `proof:barrel-pure`, `proof:no-glass-in-dist`,
  `proof:backend-structure` (GREEN on greenfield-rs/pulse; RED on the real siblings is THEIR close, not this one).
- **`proof:ba-gestalt` — the RECORDED backstop.** BI is paint-neutral by construction (the flatten changes ZERO
  paint; CSS colocation is byte-identical dist; PROMOTE/FOLD are location moves). `proof:ba-gestalt`'s verdict is
  the recorded backstop for the SINGLE paint-adjacent risk — the non-scoped-global-block reorder (resolved in
  BI.W-BLOCK-DISJOINT). No new π ladder is owed (no visual surface changed).

## §2 — The 5.1.0 cut

- Semver-MINOR (internal churn large, public-export churn ZERO — the subpath surface is untouched `src/*.ts` entry
  files; `package.json` `exports` BYTE-IDENTICAL through the flatten).
- `release.sh`/`release.yml` invoke `proof:full` directly (the CI-accurate siblings-absent battery); push the
  `v5.1.0` tag → release.yml does the gated provenance publish.
- **The dependency (carry e):** this wave — and the whole tranche — is gated on `published(5.0.0)` (the BG.W-CUT +
  BH.B0..B6 tag live on npm). BI is the clean post-5.0.0 minor; the spec's "joint 5.0.0 cut" framing is superseded
  (the named contested-matter, endorsed as strictly safer — the flat tree runs on a RATCHET-empty, 500-drained
  post-cut HEAD).

## §3 — Fences

- **SIBLING SAFETY (inv-26, ABSOLUTE).** The siblings-absent emulation uses a FRESH `/tmp` worktree — NEVER a
  read-park-restore of `~/Programming`. Zero moves of a sibling tree, ever.
- The sibling reshapes green in THEIR OWN repos on their `^5.1.0` consume (the by-name ASKs) — NOT in this close.
- No CLAUDE.md mint is owed from BI (BH.B4f already deleted CLAUDE.md; the LAW lives in precepts post-G8).

## §4 — Cross-refs

BB.W-CLOSE-BATTERY (`--run full` siblings-absent); BB.W-DELTA-RESHOOT (the strict-freshness close arm);
inv-26 (foreign-tree fence + park-not-restored tripwire); §7 (clean-break migration posture); carry (e) sequencing.
