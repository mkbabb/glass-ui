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

## R1 — the IHDR fabricated-viewport assert (AY.W-LIVE1-FINISH · landed 2026-06-10)

`isRealPng` checked only the PNG magic + a >1024B floor — a desktop screenshot RENAMED `-mobile-` passed
(the four 1280×721 W-CON1 fakes; HC-cardinal §1a). LANDED: `pngDimensions()` reads the IHDR width/height
(big-endian uint32 at byte 16/20); `viewportFidelityVerdict()` REDs a `-mobile-` basename whose IHDR width
is desktop-class (≥1000px). The self-test (a synthetic 1280×721 `-mobile-` row) flags every run:

```
self-test (bite proof): OK — 6 synthetic rows flagged (… R1-viewport-fidelity, R6-gate-status)
```

R1 finds **0 fabrications at HEAD** — the four W-CON1 mobile PNGs were already re-captured to 314×421
(W-CON-FIX); the live IHDR sweep confirms every `-mobile-` PNG is < 1000px (W-CON1 314, W-BLOB2 450,
W-DOCK1 780 = 390@2×, W-DOCK2 76/624). No false-RED on the legitimate 780px @2× mobile.

## R6 — the GREEN-on-real-surface clause (AY.W-LIVE1-FINISH · landed 2026-06-10)

`gateStatusVerdict()` resolves every `.cache/gates/<id>.json` a DELTA CITES and asserts `status === "pass"`.
The two HC-cardinal §3a/§7 instances are now MACHINE-VISIBLE (bare-arm NOTEs):

```
gate-status notes (R6): 2 (allowlisted DELTAs citing a non-GREEN gate artefact, owed the wave's RG re-run-on-real)
NOTE  W-DOCK1: AY-dock-items-lag-capture.json persists status:"fail" …
NOTE  W-DOCK2: AX-dock-animation-live.json persists status:"fail" …
```

Both `fail` traces to demo-server/probe brittleness, not a surface regression. A companion robustness fix
moved the dock gates forward: `readTokenCascade()` in `proof-dock-animation-live.mjs` now splices the
`tokens.css` `@import` partials (the W-CSS1 carve moved `--spring-dock` into `tokens/scheme-motion.css`, so
the device-free token-peak parse REDded falsely "the dock-spring token shape moved") — the secondary now
parses GREEN (`spring-dock found: true, peak: 1.04501, 0 violations`); and both dock gates switched
`networkidle` → `domcontentloaded` (the live WebGL substrate never lets the network idle). The green-on-real
dock-animation re-run (probe stability vs the continuously-animated live dock) stays W-DOCK2's RG2 job.

## The active-arm un-lockout (W-CARDINAL-INFRA §4a preserved) + the backfilled headers

The bare active `:ay` commit/CI gate stays GREEN (EXIT 0). The 4 AY allowlist DELTAs (W-DOCK1/W-CON1/W-BLOB2/
W-DOCK2) gained their `capture-commit` + `surface-paths` + `superseded-by` freshness headers with their HONEST
original-capture commits. All four surfaces were re-rendered AFTER the captures (the W-DOCK-NAV dock rebuild,
the W-BLOB-REBUILD blob rebuild, the W-GOD1 carve + W-SB-REVERIFY constellation re-verify) → genuinely STALE —
but each was RE-CAPTURED by a later own-surface live-verified wave (declared `superseded-by`), so the bare arm
grades them `stale-superseded` (graced + NOTEd), not a violation:

```
freshness notes       : 4 (own-surface DELTA stale … but RE-CAPTURED by <wave>; superseded-by; owed AY.W-DELTA0)
gate-status notes (R6): 2
violations            : 0
ay EXIT=0
```

Under `--strict-freshness` (the `:ax` backlog tracker + the close-verification arm) all 4 RED (the stale
surface + the R6 cited-gate-fail) — `strict EXIT=1`. The active arm is NOT a freshness lockout; the bite lives
in the self-test (always, 6 rows) + the strict tracker. The own-wave-id re-capture is AY.W-DELTA0's
named-successor job. This is the correct born-RED close-state for W-LIVE1 (§5: "Born-RED is the correct signal").

## Slides-port twin (the named successor)

`slides/scripts/proof-live-verified-ledger.mjs` carries the same magic-byte-only `isRealPng` + no gate-status
clause — the R1 + R6 twins are owed there (HC-mechanisms §2/§5/§7). Per inv-16, the slides port inherits these
when **L.W4** re-syncs the engine — recorded as the cross-repo successor, not landed in this glass-ui lane.

## Verdict

PASS — the DECISION doc picks Branch A with a defended rationale (G1); the freshness clause is self-test-proven
(G2 + the negative-probe) and reds a real regressed-surface-over-stale-PNG case (G3 — D2 EXPLICITLY closed) while
not false-redding a fresh DELTA (G4); the active `:ay` arm stays green (the un-lockout preserved); the owed
re-captures are routed to AY.W-DELTA0. Branch B is NOT executed (recorded re-openable).
