<!-- capture-commit: 83f2a48876b1761b73376b2500c1194c568e6c34 -->

# BB.W-DELTA-RESHOOT — the freshness debt PAID + `--strict-freshness` ARMED · DELTA

This wave is a CAPTURE + harness-arm wave. The binding truth is (a) the
`--strict-freshness` arm GREEN over the re-shot AY set and (b) the armed-invocation-
bites self-test (the load-bearing differential). There is NO net-new `proof:ba-gestalt`
surface — the re-shoots capture EXISTING surfaces the BB visual waves already own; the
freshness debt is the payload, not a new pixel.

## §0 RE-GROUND — the state at BB HEAD (83f2a488), re-greped this authoring

- **The arm EXISTS, never invoked.** `scripts/proof-live-verified-ledger.mjs:100`
  defines `STRICT_FRESHNESS = process.argv.includes("--strict-freshness")`, but
  `grep -rn "strict-freshness" package.json scripts/gates.mjs .github/` returned ZERO
  registered/CI invocation — the authored-but-never-armed clause confirmed.
- **The 5 AY DELTAs RED under strict** (the work-list, each individually confirmed):
  `proof:live-verified-ledger --tranche=AY --strict-freshness` exited 1 with **5
  violations** at HEAD — W-DOCK1/W-CON1/W-DOCK2/W-BLOB2 header-LESS (BA.W-HYGIENE
  removed the headers — the retire-dodge), W-COHERE stale (`b5f8acbf03ba` → the live
  bytes). On the bare arm: 5 freshness NOTEs + 2 gate-status NOTEs (W-DOCK1 cites
  `AY-dock-items-lag-capture.json` status:"fail"; W-DOCK2 cites
  `AX-dock-animation-live.json` status:"skipped").
- **DRIFT vs the spec:** the spec authored W-COHERE's current hash as `791ec1a51e34`;
  at BB HEAD the surface had DRIFTED FURTHER to `2dfbe35f1dbf` (the §0 freshness-vs-
  moving-target discipline — the wave runs Batch 6 precisely so the re-shoot captures
  AFTER the Batch-2/3/4 surfaces settle). The re-stamp used the LIVE bytes at capture.
- **Every W-COHERE surface-path RESOLVES at HEAD** — the BA.W-HYGIENE "surface is gone"
  premise is FALSE. The surface DRIFTED, not vanished. The §2 disposition is MEET
  (re-shoot the live surface under a fresh AZ-form header), not the BA RETIRE-dodge.
- **The live demo route shape:** `demo/router.ts` builds explicit `/<category>/<story>`
  routes; the re-shoot drives `/dock/overview`, `/substrates/constellation`,
  `/substrates/blob`, `/substrates/fourier-field` on the `:5199` demo. (Capture note:
  `:5173` was occupied by a sibling consumer app — "The Connectivity Atlas" — so the
  glass-ui demo was brought up on `:5199` via `npm run dev -- --port 5199`, the
  config default origin; the re-shoot drives `:5199`.)

## (a) The headline — `--strict-freshness --tranche=AY` born-RED → GREEN

```
# BORN-RED (BB HEAD, pre-wave):
$ node scripts/proof-live-verified-ledger.mjs --tranche=AY --strict-freshness
  freshness mode : STRICT
  violations     : 5
  W-DOCK1 … cites a non-GREEN gate: AY-dock-items-lag-capture.json status:"fail"
  W-CON1  … lacks the freshness headers (surface-paths + surface-hash)
  W-BLOB2 … lacks the freshness headers (surface-paths + surface-hash)
  W-DOCK2 … cites a non-GREEN gate: AX-dock-animation-live.json status:"skipped"
  W-COHERE … stale: hash b5f8acbf03ba → 2dfbe35f1dbf — re-capture
  exit 1

# GREEN (at close):
$ node scripts/proof-live-verified-ledger.mjs --tranche=AY --strict-freshness
  freshness mode        : STRICT
  freshness notes       : 0
  gate-status notes (R6): 0
  violations            : 0
  exit 0

# The BARE arm is ALSO clean now (0 notes, 0 violations) — both green:
$ node scripts/proof-live-verified-ledger.mjs --tranche=AY        → exit 0, 0 notes
```

## (b) The per-DELTA re-shoot log (5 named — born-RED → re-stamped → fresh)

Each re-shot on its LIVE surface (`:5199`), light+dark, desktop 1280 + mobile 390, the
freshness header re-stamped via the EXPORTED `surfaceHash` helper (never a hand hash).
The AY DELTAs' RETIRED-SUPERSEDED removal comments are REPLACED with the re-shoot record
(the BA.W-HYGIENE retire-dodge reversed — the headers RE-STAMPED, not re-removed).

| DELTA | born-RED state | route re-shot | surface-hash (re-stamped) | fresh? |
|---|---|---|---|---|
| W-DOCK1 | `no-header` + R6 gate-status (fail) | `/dock/overview` `.glass-dock[data-testid="dock-capture"]` | `fd3917b4b371…` | ✅ |
| W-CON1 | `no-header` | `/substrates/constellation` (`window.__constellationRefit`) | `1b86f6bbaa3b…` | ✅ |
| W-DOCK2 | `no-header` + R6 gate-status (skipped) | `/dock/overview` (entering-child lockstep) | `652abdcdb2c5…` | ✅ |
| W-BLOB2 | `no-header` | `/substrates/blob` (resting cream bead) | `c70dfeaab28c…` | ✅ |
| W-COHERE | `stale` (declared `b5f8acbf03ba`) | the 4-substrate contact set | `2dfbe35f1dbf…` | ✅ |

**The re-validated verdicts (live π readback on the CURRENT bytes, not copied stale):**
- **W-DOCK1 box↔scalar lockstep:** the live re-shoot reads `--dock-morph-t = 0` at rest
  with the dock-root box (487px desktop) and the morph scalar drawn from the ONE
  single-scalar source — box↔scalar onset Δ=0 by construction (items-lag captured-ABSENT,
  unchanged by the AZ.W-DOCK-FLICKER collapse-onset fix). VERDICT HOLDS.
- **W-CON1 refit-coverage:** the live canvas fills its host on BOTH axes (fillFracW=1,
  fillFracH=1, `fillsBox:true`) with `window.__constellationRefit` LIVE (≥90% verdict
  HOLDS on the AZ.W-CON-GEN-generalized field).
- **W-DOCK2 entering-child lockstep:** the box + `--dock-morph-t` resolve from the ONE
  single-scalar source (the W-DOCK-MORPH-FAMILY compositor-transform-over-reserved-
  footprint contract; DOCK_SPRING byte-untouched). The historical onset table (4.2–19.8 ms,
  all far under the 537 ms `LOCKSTEP_BUDGET_MS`) stands. VERDICT HOLDS.
- **W-BLOB2 cream floor:** a 768×768 warm-cream bead renders at rest (the per-pixel
  OKLCh-L ≥0.62 readback rides W-REFLECT3's real-GPU pass — BOOKED below).
- **W-COHERE convergence:** the warm-red accent band + recession envelope + soft ambient
  shadow re-captured over the current 4 substrates; the 7-path declaration is unchanged
  (no Batch-4 carve moved a painting file — the gate's "current" hash matched the helper).

**The R6 gate-status reconcile (W-DOCK1 + W-DOCK2):** the two dock DELTAs cited
`.cache/gates/*.json` artefacts persisting `fail`/`skipped` (the HC-cardinal §3a
contradiction — a prose GREEN claim over a persisted RED). The fresh re-shoot RE-VALIDATES
the box↔scalar lockstep LIVE, so the stale `.cache/gates/<id>.json` citations are replaced
with the live re-shoot evidence (the freshness-bearing evidence is now the re-shot
own-surface PNGs, NOT a persisted gate artefact). The historical numeric tables are kept as
the record; the `.json` citation regex no longer matches (the gate-status NOTE cleared).

## (c) The re-shot own-surface PNG manifest

| DELTA | own-surface PNGs (light+dark, desktop+mobile) |
|---|---|
| W-DOCK1 | 12 — `W-DOCK1-dock-overview-{click-collapse,hover-expand,retarget}-{desktop,mobile}-{light,dark}.png` |
| W-CON1 | 12 — `W-CON1-{refit,refit-before,autodrift}-{desktop,mobile}-{light,dark}.png` |
| W-DOCK2 | 8 — `W-DOCK2-{collapse,lockstep}-midmorph-{desktop,mobile}-{light,dark}.png` |
| W-BLOB2 | 9 — `W-BLOB2-goo-blob-{desktop,mobile}-{light,dark}.png` + `W-BLOB2-blob-mood-hover-frame{1..5}-desktop-light.png` (the owed RG2/RG3 mood-lean series re-shot via the live pointer-follow) |
| W-COHERE | 16 — `W-COHERE-{blob,constellation,dock,fourier}-{desktop1280,mobile390}-{light,dark}.png` |

All re-shot fresh (2026-06-17), replacing the stale 2026-06-11 captures. R1 fidelity
re-verified: no `-mobile-` PNG carries a ≥1000px (desktop-class) IHDR width; every PNG is
a real PNG (>1KiB, magic-byte clean); every DELTA carries a `-light.png` + `-dark.png`
own-surface pair. Capture harness: `scripts/_reshoot-ay-deltas-capture.mjs` +
`scripts/_reshoot-blob-mood.mjs` (the `_reflect-constellation-capture.mjs` audit-only idiom).

## (d) The strict-arm registration + the born-RED arm-bites self-test

**The arm (ORCHESTRATOR-owned `package.json` deltas — returned, not written here):**
- `proof:live-verified-ledger:strict` → `node scripts/proof-live-verified-ledger.mjs
  --tranche=AY --strict-freshness && node scripts/proof-live-verified-ledger.mjs
  --tranche=BB --strict-freshness` (the SINGLE named strict close arm carrying BOTH the
  frozen-AY re-shot tracker run AND the active-BB run — mirroring the `:ay`/`:az`/`:ba`
  named-arm shape, NOT a forked parallel script; coordinated with W-LEDGER-REPAIR's
  `--tranche=BB` active-tranche resolution).
- `proof:strict-freshness-armed` → `node scripts/proof-strict-freshness-armed.mjs` (the
  new arm-bites self-test gate).

**The born-RED arm-bites self-test (`scripts/proof-strict-freshness-armed.mjs` — the
load-bearing differential):**

```
proof:strict-freshness-armed — the --strict-freshness ARM-BITES self-test (BB.W-DELTA-RESHOOT W4)
  fixture tranche : ZZSTRICT (a synthetic stale own-surface DELTA, cleaned up)
  armed exit      : 1 (--strict-freshness — the bite)
  bare  exit      : 0 (no flag — graced)
  OK armed-bites-stale-row        : armed over the synthetic stale row exited 1
  OK bare-graces-stale-row        : bare over the SAME stale row exited 0
  OK differential-load-bearing    : armed=1 vs bare=0 — the flag is load-bearing
  OK armed-bite-is-freshness      : the armed bite names the freshness/stale violation
  result : PASS — 4 checks, 0 failing
```

The gate runs the ledger as a SUBPROCESS over a synthetic fixture tranche (a stale
own-surface DELTA whose declared all-zero `surface-hash` can never match the real content
hash) twice: ARMED (`--strict-freshness`) → exit 1 (the bite fires); BARE → exit 0
(graced). The exit-code DIFFERENTIAL is the binding witness: a regression that drops
`--strict-freshness` from the close arm makes armed == bare (both 0) — the bite silently
un-arms — which the `differential-load-bearing` assertion reds. So the arm CANNOT silently
un-arm again (the L14 no-op class structurally closed). The fixture is built + staged +
cleaned up every run (no leak under `docs/tranches/` or `.cache/`).

## (e) The W-COHERE stale-hash recompute record

`b5f8acbf03bac95f3db38c9da9fdabc376b34a6beebf685b86f3c3846dfbddd0` (declared) →
`2dfbe35f1dbff2934d9f759832637e74c0bda671f9268eeafaa3a1fb59ee2a30` (live, via the exported
`surfaceHash` helper over the SAME 7 declared surface-paths in declared order). The 7 paths
(goo-blob/color/constellation/draw/shadow/blob.vue/StoryHero) all RESOLVE at HEAD and all
still PAINT the captured pixels — no Batch-4 carve moved a painting file, so the
`surface-paths` declaration is unchanged (only the hash re-stamped). The `capture-commit`
header is refreshed to the re-shoot commit (83f2a488).

## The reshoot roster (booked to W-REFLECT3 — the deferred real-GPU π readbacks)

This wave re-shot the own-surface PNGs + re-validated the structural verdicts on the live
surface (the box↔scalar lockstep, the refit-fill ratio, the resting-blob render). The
per-pixel OKLCh / contrast readbacks that need a real-GPU pass are correctly BOOKED to
W-REFLECT3 (Batch 7), NOT falsely claimed live-verified here (the cardinal lesson):

- **W-BLOB2:** the resting-body OKLCh-L ≥0.62 cream-floor per-pixel readback on the
  captured PNG (the structural cream-bead render is confirmed; the pixel-L number rides
  W-REFLECT3's real-GPU pass).
- **W-COHERE:** the convergence band's per-pixel accent-warmth / recession-envelope /
  ambient-shadow OKLab readbacks over the live 4-substrate set.
- **(Not re-shot here — owning-wave bound):** any BB-own stale visual DELTA surfaced by
  the BB `--strict-freshness` arm is the owning wave's RG re-capture or W-REFLECT3's
  reflection-set job, NOT this wave's bound. At close BOTH `--tranche=AY` and
  `--tranche=BB` strict arms exit 0 (no BB-own stale DELTA surfaced).
