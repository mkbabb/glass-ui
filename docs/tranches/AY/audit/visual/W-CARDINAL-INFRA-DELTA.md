# AY.W-CARDINAL-INFRA — the cardinal-gate parameterize + slides-port · gate-output DELTA

This is a gate-INFRASTRUCTURE wave: the captured proof is the `proof:live-verified-ledger`
born-RED → engine-green gate-output (exit code + artefact JSON + the negative-probe
self-test), not a pixel screenshot. The wave makes the DELTA-capture edge that gates
~15 downstream visual closes (H-execution-dag §2 E3) MACHINE-enforceable across both
glass-ui tranches (AX close arm + AY waves) and the slides L tranche.

Captured 2026-06-09 against HEAD (`at-dock-convergence`).

## G1 — born-RED on the 6 AX visual `complete`-exempt rows (the binding proof)

`node scripts/proof-live-verified-ledger.mjs --tranche=AX` → **exit 1**, 6 violations,
EXACTLY the 6 suspect-completes (`audit/visual/VISUAL-ALLOWLIST.json` seeded
`["W05","W08","W15","W16","W17","W23"]`):

| Wave | Title | Status | violation |
|---|---|---|---|
| W05 | one iOS-spring vocabulary | `complete` | no `W05-DELTA.md` |
| W08 | blob core unblock — smin | `complete` | no `W08-DELTA.md` |
| W15 | blob lit warm-cream membrane | `complete` | no `W15-DELTA.md` |
| W16 | blob integration | `complete` | no `W16-DELTA.md` |
| W17 | constellation tokens + warp | `complete` | no `W17-DELTA.md` |
| W23 | carousel indicator reauthor | `complete` | no `W23-DELTA.md` |

The artefact `.cache/gates/AX-live-verified-ledger.json` carries `status:"fail"` +
`completeOnAllowlist:["W05","W08","W15","W16","W17","W23"]` + the 6 violation strings.
This is the binding proof the gate now SEES the inflation the `complete` token hid —
the cardinal lesson surviving at one remove (the inflation moved from the gate-rejected
`(DEVELOPED)` modifier to the gate-invisible plain `complete` token, now machine-visible).

**Born-RED is the CLOSE-state for this wave** (the 6 flipping green is AY.W-DELTA0's job,
the named successor). A green AX arm here would be the WRONG signal — it would mean the
gate still cannot see them.

## G2 — born-RED on the W52 cross-referenced-PNG case (the filename-match bite)

Probe: add `W52` to the AX allowlist and re-run. The gate REDS on W52 with reason
`W52-DELTA.md references real PNGs but none are this wave's own surface (^W52-) — it
points at a neighbour's pixels` — because `W52-DELTA.md` references only
`W45-dock-desktop-light.png`/`W54-buttons-desktop-light.png`/`W54-card-desktop-{light,dark}.png`
(a neighbour's pixels, no `W52-*.png` own-surface capture). Probe reverted; the committed
allowlist is the 6.

The own-surface bar is allowlist-driven (not token-driven), so the W52 probe bites
whether W52 is reached via `complete` OR its existing `live-verified` token — the
binding is "this wave changed pixels and owes an own-surface capture", curated in
`VISUAL-ALLOWLIST.json`.

## G3 — the gate reads BOTH tranche paths through ONE script

| arm | command | PROGRESS read | rows | result |
|---|---|---|---|---|
| AX close | `--tranche=AX` | `docs/tranches/AX/PROGRESS.md` | 67 | exit 1 (born-RED, the 6) |
| AY active | `--tranche=AY` | `docs/tranches/AY/PROGRESS.md` | 43 | exit 0 (clean empty home) |

Both runs echo their resolved `PROGRESS` + `visual dir` + `visual allowlist` paths in
stdout. The AY home exists on disk: `AY/PROGRESS.md`, `AY/audit/visual/CAPTURE-PROTOCOL.md`,
`AY/audit/visual/VISUAL-ALLOWLIST.json` (`[]`), and `AX/audit/visual/VISUAL-ALLOWLIST.json`
(seeded). The `gateArtifactPath` stamps `${TRANCHE}-live-verified-ledger` (no AX hardcode).

## G4 — extended self-test flags all three synthetic rows (the bite proof, every run)

The self-test evaluates (a) a `live-verified`-no-DELTA row, (b) a
`complete`-on-(synthetic)-allowlist-no-DELTA row, (c) a filename-mismatch row whose only
referenced PNG is a neighbour's (`W99-foo-*.png` for wave `W00SELFTEST`, exercised through
the pure `ownSurfaceVerdict`). All three MUST flag or the gate exits 1 with `SELF-TEST FAILED`.

**Negative-probe (the RED-witness inverse):** neutering the `complete`-coverage clause
(`if (allowlist.has(row.wave))` → `if (false && …)`) on the self-contained slides port
makes the self-test red loudly:
`SELF-TEST FAILED — synthetic check(s) NOT flagged: complete on the (synthetic) allowlist,
no DELTA. The gate is not load-bearing.` (exit 1). So the new coverage clause is proven
load-bearing on every invocation.

## G5 — slides port green on its L home

`cd slides && npm run proof:live-verified-ledger` (`--tranche=L`) → **exit 0**: 11 wave
rows parsed from the minted `slides/docs/tranches/L/PROGRESS.md`, empty allowlist, 0
violations, the 3-synthetic self-test passes. The artefact
`slides/.cache/gates/L-live-verified-ledger.json` carries `status:"pass"` (byte-stable,
`.cache/` gitignored). `slides/package.json` carries the `proof:live-verified-ledger`
script. `slides/docs/tranches/L/audit/visual/` exists (`CAPTURE-PROTOCOL.md` +
`VISUAL-ALLOWLIST.json` `[]`). The port self-resolves ROOT
(`fileURLToPath(new URL("../", import.meta.url))`) — no `constellation.mjs` — and inlines
the artefact write — no `gate-output.mjs`. The 4 clauses + the extended self-test are
identical to the glass-ui engine.

## G6 — engine-green after parameterize (no AX `live-verified` regression)

The AX violation list is EXACTLY the 6 `complete`-allowlist rows (+ probe W52). All 22
existing AX `live-verified` rows stay GREEN — including the shared-surface rows that
legitimately cite a sibling wave's captures (W06↔W61, W40↔W18, W45-TUNE↔W45, W47↔W38,
W50↔W51, W53↔W54, declared in their PROGRESS status cell). The own-surface filename-match
+ light/dark deepening rides the ALLOWLIST, not the `live-verified` token, so a
non-allowlisted `live-verified` row keeps the original referenced-real-PNG bar — the
list grows ONLY by the 6 + (probe) W52, never by a previously-green `live-verified` row.

## Verdict

**PASS (born-RED by design on the AX arm).** The cardinal-lesson gate is now the machine
floor under every AY + L visual close, not prose: tranche-parameterized (reads the active
tranche, no AX hardcode), `complete`-covered on the curated allowlist (no visual wave
hides behind `complete`), own-surface filename-matched (no neighbour-pixel satisfaction),
{light,dark}-depth-linted, self-proving (3 synthetic flags + the negative-probe), and
PORTED to slides (L.W4's consumer, L.W5's deploy DELTA machine-required). `vue-tsc
--noEmit` green. The 6 AX rows are RED on purpose — the proof the gate SEES them; the
backfill is AY.W-DELTA0.
