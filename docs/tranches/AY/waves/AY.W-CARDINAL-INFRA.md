# AY.W-CARDINAL-INFRA — mint the AY cardinal home + tranche-parameterize + slides-port the live-verified-ledger gate

**Tranche** AY (glass-ui) + L (slides) · **Batch** 0 (RE-GROUND + DAG-AUTHOR + INFRASTRUCTURE;
blocks every downstream visual wave's CLOSE) · **State** NET-NEW · **Repos** glass-ui (primary),
slides (port) · **Type** documentation + gate-script (NO source risk)

This wave is the cardinal-lesson forcing function carried forward. AX.W62 minted
`proof:live-verified-ledger` to make `live-verified` UN-MINTABLE without an on-disk PNG DELTA —
but the gate is AX-hardcoded, `complete`-exempt, shallow-bound, and slides has NO capture gate at
all. So the DELTA-capture edge that should BLOCK ~15 downstream visual closes (E3 in
`audit/H-execution-dag.md §2`) is unenforced PROSE on every one of them. This is the EXACT
condition that birthed the #1 chronic (7 AX waves inflated `live-verified` with 0 PNG). This wave
closes the four structural holes `H-cardinal.md` found — AND un-does the **pre-commit lockout**
that seeding the AX `complete`-allowlist born-RED creates (§4a; the gate-locks-you-out
anti-pattern): the commit hook + CI gate must gate the ACTIVE tranche (AY, green), while the AX
6-row born-RED backlog rides as the W-DELTA0 tracker, never a commit-blocker.

> **LANDED-STATE NOTE (refined 2026-06-09).** The four-clause engine extension
> (tranche-parameterize · `complete`-allowlist · own-surface filename match · light/dark depth)
> and the 3-row self-test are **ALREADY LANDED** in `scripts/proof-live-verified-ledger.mjs` at
> HEAD (the §1 line table below is the LANDED map, not a todo). The AY home (`AY/PROGRESS.md` +
> `AY/audit/visual/` + both `VISUAL-ALLOWLIST.json` sidecars) exists. The slides port (item 7) +
> the un-lockout wiring (§4a) are the residual surface this refined spec carries. The hard gate
> (§4) is the captured born-RED→engine-green DELTA + the un-lockout proof.

---

## Goal criterion

The cardinal-lesson gate is the machine floor under EVERY AY + L visual wave's close, not prose:
`docs/tranches/AY/PROGRESS.md` + `AY/audit/visual/` exist as the AY cardinal home; the gate reads
the ACTIVE tranche (no AX hardcode); it evaluates `complete` rows on a curated visual allowlist
(so no visual wave hides behind `complete`); it matches the referenced PNG filename to the wave
(`^W<NN>-…`, so a wave cannot satisfy the gate by pointing at a neighbor's pixels); it lints the
protocol depth-header (≥2 viewport × {light,dark}); and the engine is PORTED to
`slides/scripts/` reading the L PROGRESS + a new slides `audit/visual/` dir so L.W5's deploy DELTA
becomes machine-required. AND the gate gates the ACTIVE tranche (AY, green) from the commit hook +
CI — NOT the born-RED AX backlog (the AX 6-row debt rides the W-DELTA0 tracker, never blocking a
commit). The two user-domain hinges (AY.W-PUB1, L.W5) remain the only manual edges — this wave
makes the close-edge BELOW them enforceable WITHOUT locking the developer out of the tree.

## Completion criterion

The hard-gate set (§4 + §4a below) verifies: the AY home dir + PROGRESS.md exist; the gate
runs born-RED against the 6 AX visual `complete`-exempt rows (W05/W08/W15/W16/W17/W23) AND the
W52 cross-referenced-PNG case; the gate reads BOTH tranche paths (AX + AY) via one
tranche-parameter; the extended self-test (a synthetic `complete`-visual-no-DELTA row + a
filename-mismatch row) flags loudly; the slides port is green on its L home; the
`evaluateRow`/`deltaSatisfied`/`ownSurfaceVerdict`/self-test edit-sites are landed at the named
HEAD lines (§1 LANDED map); AND the un-lockout holds — the commit hook + the CI gate exit 0 on the
active AY tranche while the AX 6-row backlog is RED only in the non-blocking `:ax` tracker
(§4a GL1-GL4), so the gate enforces the close-floor WITHOUT locking the developer out.

---

## §1 — The verified defect (the four holes — LANDED-state map, HEAD `at-dock-convergence`)

`H-cardinal.md` found four holes in the AX.W62 engine. All four are now CLOSED in
`scripts/proof-live-verified-ledger.mjs` (the original authoring cited the pre-fix AX-hardcoded
lines `:33-34`/`:74-91`/`:94-103`/`:112-119`/`:137`; those no longer exist — the engine was
extended). This table maps each hole to its LANDED implementation at the REAL HEAD lines so the
spec is re-verifiable against the live engine:

| hole (H-cardinal) | LANDED fix @ HEAD line | what closed it |
|---|---|---|
| **AX-hardcoded paths** | `:57-61` `const TRANCHE = process.argv.find(a => a.startsWith("--tranche="))?.split("=")[1] ?? "AX"`; `PROGRESS`/`VISUAL_DIR`/`ALLOWLIST_PATH` all read `docs/tranches/${TRANCHE}/…` | tranche-parameter; `--tranche=AY` reads the AY home. |
| **`complete` exempt** | `:188-220` `evaluateRow` — after the `live-verified`/`complete` token guard (`:194`), an allowlisted row (`:203` `allowlist.has(row.wave)`) is held to the deepened `deltaSatisfied(..., {ownSurface:true})` bar | the curated `VISUAL-ALLOWLIST.json` (`loadAllowlist` `:65-73`) covers `complete`. |
| **shallow binding** | `:132-148` `ownSurfaceVerdict` — own-surface `^${wave}-` filter + `-light.png`/`-dark.png` pair assert; `:160-181` `deltaSatisfied(wave, {ownSurface})` routes the allowlisted bar through it | filename-match + light/dark depth floor. |
| **self-test** | `:237-256` three synthetic rows (`live-verified`-no-DELTA, `complete`-on-allowlist-no-DELTA, filename-mismatch via `ownSurfaceVerdict`); `:257-266` exits 1 if any is unflagged | the bite proof, extended to all three new paths. |
| (artefact stamp) | `:292` `gateArtifactPath("GATE_LIVE_VERIFIED_LEDGER_OUT", \`${TRANCHE}-live-verified-ledger\`)` | tranche-stamped cache name. |

**The fifth hole this refined spec adds — the PRE-COMMIT LOCKOUT (§4a).** Seeding the AX
allowlist with the 6 born-RED rows made `node scripts/proof-live-verified-ledger.mjs` (the
DEFAULT, AX) exit 1. The `.githooks/commit-msg` hook and the `proof:live-verified-ledger` CI gate
BOTH ran that bare default — so EVERY commit (including AY's own work) and EVERY CI run was blocked
behind the AX owed-DELTA backlog. A gate that locks the developer out of the tree it gates is the
gate-locks-you-out anti-pattern; the un-lockout (§4a) re-points both to the ACTIVE tranche (AY).

The 6 AX visual suspect-completes that the engine NOW SEES (`H-cardinal §2`, verified
`for w in W05 W08 W15 W16 W17 W23; do test -f .../$w-DELTA.md; done → all NO DELTA`):

| Wave | Title | Status | DELTA? |
|---|---|---|---|
| W05 | one iOS-spring vocabulary | `complete` | NONE |
| W08 | blob core unblock — smin | `complete` | NONE |
| W15 | blob lit warm-cream membrane | `complete` | NONE (own JSON: "Could NOT run a real browser") |
| W16 | blob integration | `complete` | NONE |
| W17 | constellation tokens + warp | `complete` | NONE |
| W23 | carousel indicator reauthor | `complete` | NONE |

The slides side (`H-cardinal §4`): `slides/package.json` carries exactly one proof
(`proof:deck-copy-conformance`, copy not pixels); `slides/docs/tranches/L/audit/visual/` does not
exist; `find slides/docs/tranches -iname "*DELTA*" -o -iname "*.png"` → ZERO. The L waves say
"capture"/"captured DELTA" in 8 hard-gate cells, all prose. Note: slides scripts have NO
`constellation.mjs` (the `ROOT` helper) and NO `gate-output.mjs` — the port must self-contain its
ROOT resolution (the `fileURLToPath(new URL("../", import.meta.url))` idiom `proof-deck-copy-conformance.mjs:14` already uses) and inline a minimal artefact write (no `.cache/gates` infra in slides).

---

## §2 — Objective

ONE gestalt extension of the existing engine — NOT a parallel gate, NOT a rewrite. The gate stays
self-proving and stays runnable as the commit-msg hook. Four moves, all on
`scripts/proof-live-verified-ledger.mjs` (+ the slides twin + the two `package.json`s + the two
home dirs):

1. **Tranche-parameterize the paths** (LANDED @ `:57-61`, `:292`). The two AX-hardcoded consts are
   replaced by a single tranche parameter read from `--tranche=<X>` (default `AX`) so the gate reads
   `docs/tranches/<X>/PROGRESS.md` + `<X>/audit/visual/` and stamps the artefact
   `<X>-live-verified-ledger`. The bare `npm run proof:live-verified-ledger` runs the ACTIVE tranche
   (`--tranche=AY`, per §4a un-lockout); `proof:live-verified-ledger:ax` runs the AX close arm —
   BOTH tranche paths are reachable through the ONE script.

2. **Cover `complete` on a curated visual allowlist** (LANDED @ `evaluateRow` `:188-220`). A wave whose status
   token is `complete` AND whose wave-id is on the tranche's curated VISUAL-ALLOWLIST (the waves
   that changed pixels — sidecar `<X>/audit/visual/VISUAL-ALLOWLIST.json`, seeded for AX with the
   6 suspect-completes) is held to the SAME `deltaSatisfied` bar as `live-verified`. A `complete`
   row NOT on the allowlist (a doc/gate/non-visual wave) is unaffected — the allowlist is the
   "changed pixels" curation, so the gate never falsely reds a non-visual `complete`.

3. **Deepen the binding: match the PNG filename to the wave** (LANDED @ `ownSurfaceVerdict`
   `:132-148`, routed via `deltaSatisfied(..., {ownSurface})` `:160-181`). A referenced real PNG
   only counts when its basename matches `^<wave>-` (e.g. `W52-*.png` for W52) — so a wave cannot
   satisfy the gate by pointing at a neighbor's pixels (the W52 cross-reference case reds). The
   W45-style own-surface DELTAs (`W45-dock-desktop-light.png`, …) stay GREEN.

4. **Lint the protocol depth-header** (LANDED @ `ownSurfaceVerdict` `:140-146`). The DELTA must declare ≥2 viewport ×
   {light,dark} coverage: assert the doc references both a `light` and a `dark` own-surface PNG
   (`^<wave>-…-(light|dark)\.png`) — the floor `CAPTURE-PROTOCOL.md:13` mandates. This is a
   structured-presence lint (light+dark own-surface PNGs both present), not free-prose grep.

5. **Mint the AY home + the allowlist sidecar.** Create `docs/tranches/AY/PROGRESS.md` (the
   reconciled status-ledger seeded with the AX legend + an empty wave table the AY waves fill) +
   `docs/tranches/AY/audit/visual/` (with a copy of `CAPTURE-PROTOCOL.md`) + the two
   `VISUAL-ALLOWLIST.json` sidecars (AX seeded with the 6; AY empty).

6. **Extend the self-test** (LANDED @ `:237-266`). Two new synthetic rows beside the existing one: a
   `complete`-on-allowlist-no-DELTA row MUST flag; a `live-verified` row whose only PNG is a
   neighbor's filename (`W99-foo.png` for wave `W00SELFTEST`) MUST flag (via `ownSurfaceVerdict`).
   If any of the 3 is missed, the gate reds loudly (the RED-witness inverse).

7. **Port to slides** (`slides/scripts/proof-live-verified-ledger.mjs`). The same engine, ROOT
   self-resolved (no `constellation.mjs`/`gate-output.mjs` in slides — inline ROOT +
   artefact-write), reading `slides/docs/tranches/L/PROGRESS.md` (minted here, seeded) +
   `slides/docs/tranches/L/audit/visual/` (minted here). Wire `proof:live-verified-ledger` into
   `slides/package.json`. The L waves (L.W4 ports-via-this, L.W5 deploy-gated-on-this — already
   referenced at `slides/docs/tranches/L/L.md:65-67,80,84`) CONSUME it.

8. **UN-LOCKOUT: gate the ACTIVE tranche, not the born-RED backlog** (the gate-locks-you-out fix).
   The bare `proof:live-verified-ledger` script + the `.githooks/commit-msg` hook + the
   `gates.mjs` CI row each ran `node scripts/proof-live-verified-ledger.mjs` with NO `--tranche`,
   defaulting to AX. Once the AX allowlist seeds the 6 born-RED rows, that bare default exits 1 —
   so EVERY commit (including AY's own work) and EVERY CI run is blocked behind the owed-DELTA
   backlog. The fix re-points the active-tranche surface to AY (green) while the AX backlog stays
   a NAMED, NON-blocking tracker:
   - `package.json` `proof:live-verified-ledger` → `node scripts/proof-live-verified-ledger.mjs --tranche=AY`
     (the active tranche; this is what `gates.mjs:728` `cmd` + `ci.yml:223` `run` invoke, so the
     CI gate now gates AY-green, not AX-RED).
   - NEW `proof:live-verified-ledger:ax` → `… --tranche=AX` (the W-DELTA0 owed-DELTA TRACKER;
     born-RED-on-purpose, NON-blocking — run on demand to see the backlog state).
   - `.githooks/commit-msg` → `node scripts/proof-live-verified-ledger.mjs --tranche=AY` (the local
     bite gates the active tranche; the block message names the `:ax` tracker so the AX backlog is
     discoverable but never the thing blocking your commit).
   This is the gate doing its job (the AY ledger is the live close-floor) WITHOUT the lockout: the
   AX 6-row backlog is RED in its OWN tracker (where W-DELTA0 watches it), never in the commit
   path. When AY closes and a successor opens, the `--tranche=` arg in the two npm scripts + the
   hook bumps to the new active tranche (a one-line cutover, recorded in the hook comment).

This honors no-workaround (one engine, not a fork), root-not-consumer (the gate is the root floor;
consumers NAME it), and the ≥2-consumer bar (the engine now has two repos as consumers — the AX
close arm + the AY waves in glass-ui, and the L waves in slides).

---

## §3 — Files + exact edit-sites

### glass-ui — the engine (LANDED at HEAD; verify, do not re-author)

| file | edit | state |
|---|---|---|
| `scripts/proof-live-verified-ledger.mjs` `:57-61` | the `TRANCHE` parameter + `PROGRESS`/`VISUAL_DIR`/`ALLOWLIST_PATH` reading `docs/tranches/${TRANCHE}/…`. | **LANDED** |
| same `:132-148` (`ownSurfaceVerdict`) | own-surface `^${wave}-` filter + `-light.png`/`-dark.png` pair assert (distinct reasons). | **LANDED** |
| same `:160-181` (`deltaSatisfied`) | the `{ownSurface}` opt routes the allowlisted bar through `ownSurfaceVerdict`; the shallow bar stays for non-allowlisted `live-verified`. | **LANDED** |
| same `:188-220` (`evaluateRow`) | `(DEVELOPED)` reject + the `live-verified`/`complete` token guard + `allowlist.has(row.wave)` → the deepened own-surface bar. | **LANDED** |
| same `:237-266` (self-test) | the 3 synthetic rows + the exit-1-on-unflagged guard. | **LANDED** |
| same `:292` | `gateArtifactPath(…, \`${TRANCHE}-live-verified-ledger\`)`. | **LANDED** |
| `docs/tranches/AY/PROGRESS.md` | the AY status-ledger (legend + wave table). | **LANDED** (exists) |
| `docs/tranches/AY/audit/visual/CAPTURE-PROTOCOL.md` | the AY capture-discipline doc. | **LANDED** (exists) |
| `docs/tranches/AX/audit/visual/VISUAL-ALLOWLIST.json` | seeded `["W05","W08","W15","W16","W17","W23"]` (born-RED). | **LANDED** (exists) |
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` | the AY allowlist (`["W-DOCK1"]` at HEAD — the first AY visual wave). | **LANDED** (exists) |

### glass-ui — the UN-LOCKOUT (§4a; the residual surface this refined spec carries)

| file | edit |
|---|---|
| `package.json` `proof:live-verified-ledger` | retarget to `node scripts/proof-live-verified-ledger.mjs --tranche=AY` (the active tranche — this is the CI gate `cmd` + the `ci.yml:223` `run`). **LANDED.** |
| `package.json` (NEW) `proof:live-verified-ledger:ax` | `node scripts/proof-live-verified-ledger.mjs --tranche=AX` (the W-DELTA0 backlog tracker, born-RED, non-blocking). **LANDED.** |
| `package.json` `proof:live-verified-ledger:ay` | keep `… --tranche=AY` (the explicit AY arm `proof:ay-final` requires). **LANDED.** |
| `.githooks/commit-msg` | the hook runs `--tranche=AY` (gates the active tranche); the block message names the `:ax` tracker so the AX backlog is discoverable but never blocks a commit. **LANDED.** |
| `scripts/gates.mjs:728` (note) | re-worded: the gate gates the ACTIVE tranche (AY); the AX backlog is the W-DELTA0 tracker, NOT a commit/CI gate. The `cmd`/`tags` are unchanged (so `ci.yml` byte-match holds — `gates:verify-ci` green, no `gen-ci-fresh` regen). **LANDED.** |

### slides

| file | edit |
|---|---|
| NEW `slides/scripts/proof-live-verified-ledger.mjs` | the ported engine. ROOT via `fileURLToPath(new URL("../", import.meta.url))` (the `proof-deck-copy-conformance.mjs:14` idiom — slides has no `constellation.mjs`). `TRANCHE` defaults `L`. No `gate-output.mjs`: inline a minimal artefact write to `slides/.cache/gates/L-live-verified-ledger.json` (mkdir-p) OR write nothing and rely on exit code + stdout. The 4 clauses (parameterize / complete-allowlist / filename-match / light+dark) + the extended self-test are identical. |
| NEW `slides/docs/tranches/L/PROGRESS.md` | the L status-ledger (the L wave table; seeded with the legend). |
| NEW `slides/docs/tranches/L/audit/visual/` | the slides visual home (+ a `CAPTURE-PROTOCOL.md` copy + `VISUAL-ALLOWLIST.json` `[]`). |
| `slides/package.json:17` | ADD `"proof:live-verified-ledger": "node scripts/proof-live-verified-ledger.mjs --tranche=L"` beside `proof:deck-copy-conformance`. |

NOT in scope (named successors): the actual `complete`→DELTA backfill of the 6 AX rows
(→ **AY.W-DELTA0**, the owed-DELTA sweep, Batch 4); W52 re-capture of a real W52 surface
(→ AY.W-DELTA0); the blob backfill (→ **AY.W-BLOB2/3**); L.W4's conformance-gate re-arch + L.W5's
deploy DELTA (those waves NAME this gate — authored elsewhere). This wave mints + parameterizes +
ports the ENGINE only; it leaves the 6 rows RED (the proof the gate now SEES them).

---

## §4 — HARD GATE (evidence-backed)

The gate is `proof:live-verified-ledger` itself, exercised across both tranches + the slides port,
captured as a born-RED → engine-green DELTA. All clauses verify by RUNNING the script (exit code +
stdout), a diff, and a deletion/presence check — no grep-only, no "API exists".

**G1 — born-RED on the 6 AX visual complete-exempt rows.** With the AX allowlist seeded
(`["W05","W08","W15","W16","W17","W23"]`), `node scripts/proof-live-verified-ledger.mjs --tranche=AX`
exits **non-zero** and its stdout/artefact lists exactly those 6 rows as violations
(`complete` on the visual allowlist, no own-surface DELTA). Captured to
`docs/tranches/AY/audit/visual/W-CARDINAL-INFRA-DELTA.md` as the BEFORE arm (the gate-output JSON
showing `status:fail` + the 6 wave-ids). This is the binding proof the gate now SEES the
inflation the `complete` token hid.

**G2 — born-RED on the W52 cross-referenced-PNG case.** W52 is already `live-verified` but NOT on
the allowlist, so it keeps the shallow bar (its W45/W54 neighbour pixels pass). Temporarily ADD
`W52` to the AX `VISUAL-ALLOWLIST.json` and re-run `proof:live-verified-ledger:ax`: the gate REDS on
W52 with the `ownSurfaceVerdict` reason `W52-DELTA.md references real PNGs but none are this wave's
own surface (^W52-) — it points at a neighbour's pixels` (because `W52-DELTA.md` references only
`W45-*.png`/`W54-*.png`). Revert the probe. Captured in the DELTA as the filename-match bite proof.
The PERMANENT W52 allowlist-add + own-surface re-capture is AY.W-DELTA0's discharge (named successor).

**G3 — the gate reads BOTH tranche paths.** `node … --tranche=AX` reads
`docs/tranches/AX/PROGRESS.md` (67 rows parsed, the existing ledger); `node … --tranche=AY` reads
`docs/tranches/AY/PROGRESS.md` (the minted home; parses its rows, exits 0 on the empty/clean AY
table). Both runs print their resolved `PROGRESS` path in stdout (add a one-line echo). The
`AY/PROGRESS.md` + `AY/audit/visual/` + both `VISUAL-ALLOWLIST.json` files exist on disk (`ls`).

**G4 — extended self-test flags all three synthetic rows.** The script's self-test block evaluates
(a) `live-verified`-no-DELTA, (b) `complete`-on-synthetic-allowlist-no-DELTA, (c)
`live-verified` whose only referenced PNG is a non-matching filename. If ANY returns null
(unflagged), the gate exits 1 with `SELF-TEST FAILED`. Proven by running the script (the self-test
runs every invocation) AND by a negative-probe: comment out the `complete`-coverage clause →
the script's own self-test reds (the RED-witness inverse). Captured: the self-test stdout line
showing all 3 synthetic rows flagged.

**G5 — slides port green on its L home.** `cd slides && node scripts/proof-live-verified-ledger.mjs --tranche=L`
exits **0** (the minted `L/PROGRESS.md` is clean — no `live-verified`/allowlisted-`complete` row
owes a DELTA yet) AND its self-test passes (the same 3 synthetic flags). `slides/package.json`
carries the `proof:live-verified-ledger` script; `npm run proof:live-verified-ledger` in slides
runs it. `slides/docs/tranches/L/audit/visual/` exists. Captured: the slides stdout +
`L-live-verified-ledger` artefact `status:pass`.

**G6 — engine-green after the parameterize lands (no AX regression).** After the AX allowlist is
seeded but BEFORE the 6 backfills, the AX arm is RED (G1 — by design, the gate now sees them). The
gate's NON-allowlist behaviour is unchanged: the 22 existing AX `live-verified` rows that DO carry
own-surface DELTAs (W06/W18/W45/…) still pass their `deltaSatisfied` bar (the filename-match +
light/dark clauses do not red an own-surface multi-viewport DELTA like W45). Captured: a diff of
the AX violation list pre/post the new clauses — it grows ONLY by the 6 `complete` rows + (probe)
W52, never by a previously-green `live-verified` row.

**The single binding condition:** the gate, run `--tranche=AX`, is born-RED listing exactly the 6
visual `complete`-exempt rows (G1) + the W52 cross-ref probe (G2); run `--tranche=AY` and (slides)
`--tranche=L` it is green on the minted clean homes (G3, G5); the extended self-test flags all 3
synthetic rows (G4); and no previously-green AX `live-verified` row regresses (G6). The
`W-CARDINAL-INFRA-DELTA.md` carries the born-RED AX violation JSON + the green AY/L artefacts +
the negative-probe self-test proof.

**Born-RED is the close-state for THIS wave.** The wave closes when the gate SEES the 6 rows
(RED on AX is correct — the inflation is now machine-visible); the 6 rows flipping green is
**AY.W-DELTA0**'s job (the named successor). A green AX arm at this wave's close would be the
WRONG signal — it would mean the gate still cannot see them. The AX arm's RED lives in the
`:ax` TRACKER (§4a), not in the commit/CI path — born-RED there is the W-DELTA0 work signal,
not a lockout.

---

## §4a — HARD GATE: the un-lockout (the gate-locks-you-out fix)

The AX-default born-RED MUST NOT block commits or CI. Verified by RUNNING the four surfaces
(npm-mediated, the real CI/hook path) + a coherence check — exit codes are the artefact.

**GL1 — the commit hook is un-locked (the active-tranche arm is green).** `sh .githooks/commit-msg
/dev/null` exits **0** (the hook runs `--tranche=AY`; the AY ledger is clean). Captured: the hook
exit code + the resolved `tranche: AY` line in its stdout. BEFORE the fix the bare-default hook
exited 1 on the 6 AX rows (the lockout); AFTER, exit 0 — the un-lockout DELTA.

**GL2 — the CI gate is un-locked.** `npm run proof:live-verified-ledger` (the exact `gates.mjs:728`
`cmd` + `ci.yml:223` `run`) exits **0** (it now passes `--tranche=AY`). The AX backlog is NOT in
the CI close path.

**GL3 — the AX backlog is a NAMED, NON-blocking tracker.** `npm run proof:live-verified-ledger:ax`
exits **1**, listing exactly the 6 AX `complete`-allowlist rows (W05/W08/W15/W16/W17/W23) — the
born-RED-on-purpose W-DELTA0 tracker. This is the SAME bite as G1, now in its own runnable script
that gates NOTHING (not in `gates.mjs` `ci`/`release` tags; not in the hook). W-DELTA0 watches it.

**GL4 — CI coherence holds (no ci.yml regen).** Because only the npm-script TARGET changed
(`proof:live-verified-ledger` now passes `--tranche=AY`) and the `gates.mjs` `cmd`/`tags` strings
are UNCHANGED, the generated `ci.yml`'s `run: npm run proof:live-verified-ledger` line is
byte-identical. `node scripts/gates.mjs --verify-ci` exits **0** and `npm run proof:gen-ci-fresh`
stays green (no regeneration needed). Captured: the `--verify-ci` exit code.

**The single binding un-lockout condition:** the commit hook (GL1) + the CI gate (GL2) exit 0 on
the active AY tranche; the AX 6-row backlog is RED only in the dedicated `:ax` tracker (GL3) that
blocks nothing; and the ci.yml byte-match holds (GL4). The lockout is gone; the bite survives
(in `:ax` + the self-test); the developer can commit AY work and CI is green.

---

## §5 — Named successors / out-of-scope edges

- The 6 AX `complete` backfills + the W52 re-capture → **AY.W-DELTA0** (Batch 4, the owed-DELTA
  sweep; `H-cardinal §6`). This wave leaves them RED on purpose.
- The blob backfill (W08/W15/W16 own-surface DELTA) → **AY.W-BLOB2/W-BLOB3** (Batch 2).
- L.W4 NAMES this gate (the slides-port consumer); L.W5's deploy DELTA is machine-required THROUGH
  it (`slides/docs/tranches/L/L.md:80,84`).
- `proof:ay-final` (Batch 5, W-CLOSE1) requires `proof:live-verified-ledger:ay` GREEN against the
  AY paths as a close clause.
- The local-only live-gate CI decision (keep-local-hook+ledger vs a SwiftShader/Dawn lane) →
  **AY.W-LIVE1** (Batch 4); this wave keeps the gate runnable as the commit-msg hook + CI re-run
  (unchanged from AX.W62).

## §6 — Cross-references

- `docs/tranches/AY/audit/hardening/H-cardinal.md` (the four holes; §7 convergence criterion; §9
  waveSpecInputs).
- `docs/tranches/AY/audit/hardening/H-execution-dag.md §4 BATCH 0` (this wave's node) + `§2 E3`
  (the DELTA edge that gates ~15 closes).
- `docs/tranches/AY/audit/hardening/H-convergence.md §0 E3/§1 F2/F7` (the cardinal carry-debt; the
  dual-arm π obligation).
- `docs/tranches/AX/audit/visual/CAPTURE-PROTOCOL.md` (the depth floor the lint enforces).
- `scripts/proof-live-verified-ledger.mjs` (the engine extended).
- `slides/docs/tranches/L/L.md:65-67,80,84` (the L consumers of the port).
