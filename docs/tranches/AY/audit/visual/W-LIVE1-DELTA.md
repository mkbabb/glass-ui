# AY.W-LIVE1 — live-gate CI decision + the freshness depth-header · DELTA

W-LIVE1 is a DECISION + gate-script wave (NO pixels — `dev-complete`, not a visual close). Its DELTA is the
born-RED → bite-proof transcript (the W-CARDINAL-INFRA-DELTA precedent), not a screenshot. The cardinal artefact
is the freshness clause's self-test bite + the real-regressed-surface flip-probe (G3) + the no-false-RED proof
(G4) + the negative-probe (the detector is load-bearing).

## G1 — the DECISION doc exists and picks a branch

`docs/tranches/AY/audit/W-LIVE1-decision.md` — picks **Branch A** (keep local-hook + static ledger, now
freshness-deepened; no headless-GPU CI lane at AY). The defended rationale: the freshness clause closes the D2
stale-DELTA residual on BOTH branches; a SwiftShader CI lane re-runs the SAME software-GL the dev box already
exercises (no fidelity gain) and can only re-run the 2 device-independent gates; the local-hook+ledger floor is
sufficient + battle-tested (the 3.9.0 publish shipped green with the live gates local-only). Branch B is recorded
RE-OPENABLE (the `gates-pi` job + `ci-pi` tag) if the real-GPU dev-box bottleneck recurs. The named successor for
the artistic bar is AY.W-AUR-PAINTERLY; the owed re-captures are AY.W-DELTA0.

## G2 — the freshness clause is born-RED against a synthetic stale DELTA (self-test)

The self-test gained a 4th synthetic row (a header-bearing stale DELTA via the deterministic root-commit /
`package.json` pair — the root commit is always an ancestor of every later `package.json` touch → stale). It
flags every run:

```
self-test (bite proof): OK — 4 synthetic rows flagged (live-verified-no-DELTA, complete-on-allowlist-no-DELTA, filename-mismatch, freshness-stale)
```

**Negative-probe (the RED-witness inverse — captured 2026-06-10):** breaking the detector (the `freshnessVerdict`
stale-branch forced to return `{state:"fresh"}`) reds the gate's OWN self-test:

```
[proof:live-verified-ledger] SELF-TEST FAILED — synthetic check(s) NOT flagged: freshness — DELTA headers declare a capture-commit (root) PRECEDING the surface last-touch (package.json) → stale. The gate is not load-bearing.
neg-probe EXIT=1
```

Reverted → the self-test passes again (EXIT 0). So the freshness clause is demonstrated load-bearing on every
invocation.

## G3 — the freshness clause reds a REAL regressed surface (the flip-probe — the binding bite)

Transient probe: wrote `<!-- capture-commit: 89f235ae (an OLD ancestor) --> <!-- surface-paths: src/styles/dock -->`
into `W45-DELTA.md` + temporarily added `W45` to the AX `VISUAL-ALLOWLIST.json` (W45 is `live-verified` over the
dock surface, which a LATER commit `0947c740` demonstrably touched). Ran
`node scripts/proof-live-verified-ledger.mjs --tranche=AX --strict-freshness`:

```
status: fail | strictFreshness: true
W45 (line 96): status `live-verified` AND on the visual allowlist (a pixel-changing wave) but
  W45-DELTA stale: surface src/styles/dock changed at 0947c740cdbc after the capture commit 89f235aec320 — re-capture.
```

This is the direct artefact that the D2 residual is CLOSED — a regressed surface over a present-but-stale PNG now
REDs where it shipped green before. The probe was REVERTED (W45-DELTA.md + the AX allowlist restored to the
original 6; `git status` clean).

## G4 — no false-RED on a FRESH own-surface DELTA (no regression)

A DELTA whose `capture-commit` is at-or-after the surface last-touch stays GREEN. Proven via the inverse of the
self-test (capture-commit = HEAD, surface-paths = `package.json` → the surface is an ancestor of HEAD → FRESH):

```
capture-commit=HEAD(dde248e7679c) surface=package.json last-touch=077fe58f9749
verdict: FRESH (no false-RED — surface is an ancestor of the capture commit)
```

The freshness clause discriminates correctly: stale → RED, fresh → GREEN, header-less → graced-on-bare-arm /
RED-under-`--strict-freshness`.

## The active-arm un-lockout (W-CARDINAL-INFRA §4a preserved)

The bare active `:ay` commit/CI gate stays GREEN (EXIT 0) — the 4 AY allowlist DELTAs (W-DOCK1/W-CON1/W-BLOB2/
W-DOCK2) lack the freshness headers (they predate the header mandate) and are GRACED on the bare arm with a NOTE,
not a violation:

```
freshness mode        : bare (header-less graced; staleness NOTEd — AY.W-LIVE1 backfill window)
freshness notes       : 4 (header-less own-surface DELTAs, owed AY.W-DELTA0 re-capture)
violations            : 0
ay EXIT=0
```

Under `--strict-freshness` (the `:ax` backlog tracker + the close-verification arm) those 4 RED — the born-RED
backfill set the AY.W-DELTA0 / owed-DELTA sweep re-captures with the freshness headers (the W-CARDINAL-INFRA 6-row
born-RED precedent). The active arm is NOT a freshness lockout; the bite lives in the self-test (always) + the
strict tracker.

## Backfill grace boundary (recorded — the AY.W-DELTA0 set)

Those 4 AY allowlist DELTAs are GENUINELY stale (their painting surfaces were re-touched by later impl commits
after the captures — `src/styles/dock` at `0947c740` post-dates W-DOCK1/W-DOCK2's captures; `goo-blob` at
`077fe58f` post-dates W-BLOB2's). The freshness clause makes that machine-visible; the re-capture (own-surface +
the freshness headers) is AY.W-DELTA0 / the owed-DELTA sweep's named-successor job. This is the correct born-RED
close-state for W-LIVE1 (W-LIVE1 §5: "Born-RED is the correct signal for the freshness clause at this wave's
close").

## Verdict

PASS — the DECISION doc picks Branch A with a defended rationale (G1); the freshness clause is self-test-proven
(G2 + the negative-probe) and reds a real regressed-surface-over-stale-PNG case (G3 — D2 EXPLICITLY closed) while
not false-redding a fresh DELTA (G4); the active `:ay` arm stays green (the un-lockout preserved); the owed
re-captures are routed to AY.W-DELTA0. Branch B is NOT executed (recorded re-openable).
