# BB.W-GESTALT-GATE2 — DELTA: proof:ba-gestalt hardened (content+dimension+mobile+freshness)

**Wave:** W-GESTALT-GATE2 (Batch 1) · **Date:** 2026-06-16 · **Branch:** tranche/BB @ HEAD
**Kind:** GATE-HARDENING wave (zero paint — it hardens the gate that JUDGES paint). The
binding truth is `proof:ba-gestalt` exercising its new G1-G4 clauses + the born-RED→GREEN
logs + the self-test bite, NOT a gestalt verdict (this wave cannot flip a verdict — that is
W-REFLECT3's, Batch 7).

The desktop-PNG-existence rubber-stamp (`existsSync(abs) && statSync(abs).size > 0`) is
RETIRED. An operative `proof:ba-gestalt` PASS now demands, per surface, FOUR content-real
dimension-correct viewport-faithful captures (light+dark × desktop+mobile) over a FRESH
surface (the painting source byte-identical to capture).

## The single-source transposition (no second copy — G3's W-CANVAS-UNIFY clause)

The four pure verify mechanisms were minted ONCE in `proof-live-verified-ledger.mjs`
(AX.W62 → AY.W-LIVE1 → AZ.W-GATES D6): `isRealPng`, `pngDimensions`,
`viewportFidelityVerdict`, `surfaceHash`, `freshnessVerdict`. This wave SHARES them, never
re-implements:

- `scripts/reflect-capture-verify.mjs` (NEW) — the shared leaf. Re-exports the ledger's
  five pure fns + adds ONE gestalt-only helper `viewportFidelityVerdictBoth` (the ledger's
  `-mobile-`-only verdict INJECTED + the symmetric `-desktop-`-below-1280 arm G2 wants; the
  ledger never gained the desktop arm, so its own call sites stay behaviour-identical).
- `proof-live-verified-ledger.mjs` — the five pure fns gain `export` + the top-level run is
  guarded behind `import.meta.url === pathToFileURL(process.argv[1])` so importing them for
  `surfaceHash` NEVER runs the sibling gate (no console spam, no artifact write, no exit).
  The ledger's gate LOGIC is byte-untouched (verified: it runs identically as a script,
  exit 0, its 7-check self-test still bites).
- `proof-ba-gestalt.mjs` — imports from the leaf ONLY.

**No-second-copy witness:** the ONLY `createHash("sha256")` over surface paths in the tree
is the ledger's `surfaceHash` (`proof-live-verified-ledger.mjs:318`). `grep -c createHash`
in `proof-ba-gestalt.mjs` + `reflect-capture-verify.mjs` finds only COMMENT mentions, zero
calls.

## Roster-schema decision — DIRECTION 2b (the viewport-derivation; no schema migration)

The roster keeps its two DESKTOP capture columns UNCHANGED (`| surface | routes |
capture-light | capture-dark | verdict | ground-anchor |`). The gate DERIVES the mobile
twin per surface by re-pointing the declared basename's `-desktop-` token to `-mobile-`
(`<surface>-<mode>-mobile-full.png` beside the declared `-desktop-full.png`, the
`wf-ba-reflect.js` naming convention). Rationale: zero `parseRoster`/`COLUMNS` migration
(no half-registered six-column header to red the COLUMN-SCHEMA assert), and the 16 mobile
twins already sit on disk under exactly that convention (confirmed). The doc-block records
the convention so W-REFLECT3 drives it without a schema surprise.

## G1-G4 born-RED witnesses (the gate-correctness truth)

### G1 — content+dimension verification
The 1-byte decoy passes the OLD floor, reds the NEW:
```
G1 1-byte-decoy: OLD floor (existsSync+size>0) = true | NEW floor (isRealPng) = false => NEW reds: true
```
At HEAD the real captures are GREEN under G1 (all 32 desktop+mobile PNGs are real with sane
IHDR): `facts.brokenCaptures: []`, `facts.captureDimensions` records `2880×1800` desktop /
`780×1688` mobile per surface.

### G2 — the 16 mobile captures read + viewport-faithful
```
G2 fabricated-mobile (1280px IHDR on a -mobile- name): reds: true
G2 symmetric-desktop (400px IHDR on a -desktop- name): reds: true
```
At HEAD: `facts.mobileCapturesRead === 16` (8 surfaces × 2 modes), `facts.viewportFidelity`
all-pass (the BA captures are real 390@2× = 780px mobile / 2880px desktop).

### G3 — the freshness header is load-bearing (the BORN-RED clause)
The per-surface `surface-hash` headers (vacuous before — checked by zero gate) are now
recomputed via the SHARED `surfaceHash`. At HEAD, 3 surfaces are STALE (their painting
source drifted after the BA reflection):
```
dock           STALE  d3fd8f92aca6 → c3e2a04ea6e1  (SidebarDock/BottomDock/dock-nav/DockRail/rail-extend)
shell          STALE  499cfe909375 → 1c0bd3a55399  (AppShell.vue + forms/inputs.vue)
dark-register  STALE  c6778e6eb5c6 → bea2674a4232  (glass-material.vue + dark-arm.css)
```
- **Bare mid-tranche arm** (`node scripts/proof-ba-gestalt.mjs`): the 3 stale surfaces are
  non-fatal NOTEs (the backfill window) — status PASS (tags:["release"] does NOT block ci).
- **Close/release arm** (`--strict-freshness`): the 3 stale surfaces RED — status FAIL.
  **This is the BORN-RED clause.** W-REFLECT3 (Batch 7) re-captures the 3 surfaces + re-
  stamps each `<surface>.md` surface-hash → the gate flips GREEN under `--strict-freshness`.

### G4 — the self-test bite rides every run
```
self-test (bite proof): OK — 4 synthetic checks flagged (G1 dimension, G2 mobile + symmetric desktop fidelity, G3 freshness-stale)
```
A failure to flag any synthetic check exits the gate loudly (the RED-witness inverse,
mirroring `proof-live-verified-ledger.mjs`).

## GREEN-at-close (post-W-REFLECT3)

W-REFLECT3 re-captures + re-stamps the 3 stale surfaces; the gate then reads under
`--strict-freshness`: `brokenCaptures: []`, `mobileCapturesRead: 16`, every
`freshness: fresh`, `operativePass: true` (8/8 gestalt verdicts hold + content-verified
both-viewport fresh). That GREEN-at-close + the W-REFLECT3 fresh-capture log is the
companion this wave BOOKS to W-REFLECT3 (the close oracle is real before the reflection it
judges).

## Sibling-gate no-regression

- `proof:live-verified-ledger` GREEN across `--tranche=AX`/`--tranche=BB`/`--strict-freshness`
  (the export + guard preserved its behaviour; 7-check self-test still bites).
- `proof:gate-script-parity` GREEN (no new id, no manifest row — the SAME `proof:ba-gestalt`
  id/cmd/tags:["release"]/W-REFLECT2-promotion lineage preserved).
- `proof:gate-manifest-sound` FRESHNESS-HASH arm GREEN (`content-hash ✓`); its CLEAN-TREE /
  PROOF-ALL-RUNS reds are the mid-batch dirty-tree artifact (the orchestrator commits),
  not a gate-logic regression.
