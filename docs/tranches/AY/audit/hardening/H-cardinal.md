# H-cardinal — adversarial hardening: cardinal-lesson misses + DELTA backfill

**Lane** H-cardinal · **Mode** RED-TEAM (read-only; findings + wave-spec inputs) · **HEAD** `at-dock-convergence`
**Captured** 2026-06-09 · **Verdict** GAPS-FOUND

> The #1 chronic miss: a wave marked "complete" when it was only headless-green over a
> live-broken surface, the PROGRESS ledger minting `live-verified` from a prose claim.
> AX.W62 minted `proof:live-verified-ledger` to make this UN-MINTABLE. This lane RED-TEAMS
> whether the gate is sufficient, whether the AX backfill is done, and whether AY/L carry
> the discipline forward. **Material progress since S-cardinal (2026-06-08): 22 DELTAs +
> 65 real screenshots now exist; the gate passes green; W45/W52/W53/W57/W59 backfilled.**
> **But four structural holes remain, and AY/L are entirely unguarded.**

---

## TL;DR

The cardinal-lesson gate `proof:live-verified-ledger` (AX.W62) is REAL, SELF-PROVING, and
currently GREEN (22 live-verified rows, 0 violations). The S-cardinal inventory was captured
the day BEFORE the backfill landed — its round-2 list (W45/W52/W53/W57/W59 "no DELTA") is now
STALE; those DELTAs exist. **W56 is the only honest holdout** (`dev-landed · live-pending
(DELTA owed)` — the gate correctly forced that honesty).

The gate is sound for what it measures. The holes are in WHAT IT DOESN'T:

1. **The gate ignores `complete` rows** — but its own protocol doc claims it covers them. 19
   PROGRESS rows are `complete`, including 6 visual suspect-completes (W05/W08/W15/W16/W17/W23)
   with NO DELTA. The gate's spec (CAPTURE-PROTOCOL.md:19) and its implementation
   (proof-live-verified-ledger.mjs:97) DISAGREE.
2. **The gate is hardcoded to AX paths** — `docs/tranches/AX/PROGRESS.md` +
   `docs/tranches/AX/audit/visual/`. AY has no PROGRESS.md and no audit/visual/ dir. Every AY
   "captured DELTA" hard-gate is PROSE, unenforced by any machine gate.
3. **Slides has ZERO capture-discipline gate.** L's only gate is `proof:deck-copy-conformance`
   (copy, not pixels). No visual dir, no PROGRESS-ledger, no DELTA artefact in the entire K
   tranche tree. The slides side is the un-guarded recurrence of the exact same chronic miss.
4. **The gate's binding is SHALLOW** — it asserts only that ≥1 real PNG is *referenced*, not
   that the PNG is a capture OF THAT WAVE, nor that the protocol's depth (≥2 viewports ×
   {light,dark}, ≥5 timing frames, measured contrast) is met. W52-DELTA.md "passes" by
   referencing W45/W54 screenshots (its own surface uncaptured).

---

## 1. What the gate ACTUALLY enforces (source-grounded)

`scripts/proof-live-verified-ledger.mjs`:
- `:33` `PROGRESS = docs/tranches/AX/PROGRESS.md` (hardcoded)
- `:34` `VISUAL_DIR = docs/tranches/AX/audit/visual` (hardcoded)
- `:97` `if (statusToken(row.status) === "live-verified")` — **ONLY live-verified rows are
  checked.** A `complete` row is never evaluated for a DELTA.
- `:74-91` `deltaSatisfied(wave)` — requires `W<NN>-DELTA.md` to exist AND reference ≥1 `.png`
  that is a real on-disk PNG (magic-byte + >1024 bytes, `:62-71`). **Nothing more.** No
  check that the PNG depicts the wave's surface; no viewport-count, frame-count, or contrast
  check (`grep -ic "viewport|375|1280|frame|contrast|getComputedStyle" → 0`).
- `:95-96` rejects the retired `(DEVELOPED)` modifier — GOOD, this kills the S1 linguistic vehicle.
- `:112-119` SELF-PROVING — a synthetic `live-verified`-no-DELTA row is evaluated every run;
  if the detector misses it the gate reds. **This is excellent and should be the pattern AY/L copy.**

**Run result (HEAD):** `wave rows parsed: 67 · live-verified: 22 · violations: 0` — GREEN.

---

## 2. Hole #1 — the spec/implementation divergence on `complete` (the load-bearing finding)

`CAPTURE-PROTOCOL.md:19-21`:
> "A wave's PROGRESS status is `live-verified` ONLY when its DELTA.md exists. The
> `proof:live-verified-ledger` close gate (W33) asserts: **every `live-verified`/`complete`
> row** in PROGRESS has a DELTA.md here."

The implementation (`:97`) checks `live-verified` ONLY. The `/complete` clause was never built.
This matters because the AX visual suspect-completes are marked `complete`, not `live-verified`,
so they sail through:

| Wave | Title | Status (PROGRESS) | DELTA? | S-cardinal flag |
|---|---|---|---|---|
| W05 | one iOS-spring vocabulary | `complete` | NONE | D3 BouncyTabs jarring (resolved by W53, but W05's own row never DELTA'd) |
| W08 | blob core unblock — smin | `complete` | NONE | blob suspect-complete |
| W15 | blob lit warm-cream membrane | `complete` | NONE | **D4/D5/D7 — "Could NOT run a real browser"; reasoned not pixel** |
| W16 | blob integration | `complete` | NONE | blob suspect-complete |
| W17 | constellation tokens + warp | `complete` | NONE | constellation suspect (low-risk but uncaptured) |
| W23 | carousel indicator reauthor | `complete` | NONE | P5 Apple-glass NOT reached |

`for w in W05 W08 W15 W16 W17 W23; do test -f .../$w-DELTA.md; done → all *** NO DELTA ***`.

**W15 is the sharpest:** its own JSON recorded "Could NOT run a real browser" (S-cardinal §3a)
and it ships `complete` with zero pixel. The gate cannot see it because `complete` is exempt.
This is the cardinal lesson surviving at one further remove: the inflation moved from the
`(DEVELOPED)` modifier (now gate-rejected) to the plain `complete` token (gate-exempt).

**Additional wrinkle:** W01/W02 DELTAs exist but in `docs/tranches/AX/audit/` (NOT
`audit/visual/`) AND reference **0 PNGs** each (prose-only). `deltaSatisfied()` looks only in
`VISUAL_DIR` and requires a PNG — so W01/W02 would FAIL the gate if their rows were
`live-verified`. They pass solely because they are `complete` (exempt). The two "oldest good"
DELTAs are not actually gate-conformant.

---

## 3. Hole #2 — the gate is AX-hardcoded; AY is unguarded

`:33-34` hardcode the AX PROGRESS + visual paths. Verified: `docs/tranches/AY/PROGRESS.md` does
NOT exist; `docs/tranches/AY/audit/visual/` does NOT exist. When AY waves close, the gate keeps
reading AX. **Every AY "captured DELTA" hard-gate cell (AY.md:52,53,56,57,58,60,61,65,66,72) is
PROSE** — "screenshot before/after", "live capture", "π readback", "capture mobile+desktop" —
with no machine gate behind it. AY.md:43 says "live-verification waves capture a DELTA artefact
(the cardinal lesson)" but no AY wave names `proof:live-verified-ledger` and no AY wave mints
the AY-pathed analog. **This is the precise condition that birthed the chronic miss: a written
capture protocol that is never machine-enforced.**

---

## 4. Hole #3 — slides L has NO capture gate at all

`slides/package.json` has exactly one proof: `proof:deck-copy-conformance` (copy linting). No
`proof:live-verified-ledger` analog. `find slides/docs/tranches -iname "*DELTA*" -o -iname
"*.png"` → **ZERO** in K and L. No `audit/visual/` dir anywhere in the slides repo. The L waves
say "capture"/"captured DELTA" in 8 hard-gate cells (L.md:50,51,52,54,55,57,62) — all prose.
L.W5 (deploy) gate "live HTTP 200 + captured DELTA" is the most load-bearing and the most
unenforced. The slides side is the un-instrumented twin of the glass-ui chronic miss; the
cardinal lesson was never carried across the repo boundary.

---

## 5. Hole #4 — shallow binding (game-able)

The gate's DELTA check (`:78-90`) accepts ANY referenced real PNG. It does not assert the PNG
is a capture of the wave's own surface, nor the protocol depth. Evidence:
`W52-DELTA.md` (the D19 liquid-glass overhaul that absorbed the D11 specular defect) references
`W45-dock-desktop-light.png`, `W54-buttons-desktop-light.png`, `W54-card-desktop-{light,dark}.png`
— **all other waves' screenshots; no W52-named capture.** The PNGs are genuine (~57KB real
screenshots, not stubs), so the discipline materially improved — but a wave can satisfy the
cardinal gate by pointing at a neighbor's pixels. CAPTURE-PROTOCOL.md:13-16 mandates ≥2
viewports × {light,dark}, ≥5 timing frames for motion, measured WCAG ratio for legibility — the
gate enforces NONE of these. It is a presence-of-PNG gate, not a captured-the-right-thing gate.

---

## 6. The backfill list (what S-cardinal owed × current truth)

| Wave | S-cardinal said | Current truth (2026-06-09) | Owed |
|---|---|---|---|
| W45 | no DELTA | DELTA present (PNGs exist) | confirm W45 PNGs are dock-hover/rail, not generic |
| W52 | no DELTA | DELTA present but references W45/W54 PNGs (no W52 capture) | **re-capture a W52 liquid-glass surface** (speedtest-card / glass-Card-over-aurora, light+dark; confirm central bloom gone) |
| W53 | no DELTA | DELTA present | confirm SegmentedTabs squish-not-jarring frames |
| W56 | no DELTA | `dev-landed · live-pending (DELTA owed)` — HONEST | **capture squircle cornerShape readback** (the only honest holdout; gate forced it) |
| W57 | no DELTA | DELTA present | — |
| W59 | no DELTA | DELTA present | — |
| W05 | `complete`, no DELTA | STILL `complete`, no DELTA | spring-vocabulary capture OR accept superseded-by-W53 note in row |
| W08/W15/W16 | blob `complete`, reasoned-not-pixel | STILL `complete`, no DELTA | **blob is the largest open gap — W-BLOB2/3 must DELTA goo-blob + blob-mood light/dark** |
| W17 | constellation `complete` | STILL `complete`, no DELTA | confirmatory constellation capture (low risk) |
| W23 | carousel `complete` | STILL `complete`, no DELTA | P5 Apple-liquid still un-reached (separate wave) |
| W01/W02 | DELTA exists | DELTA in `audit/` (wrong dir), 0 PNGs | re-home to `audit/visual/` + add ≥1 PNG, or accept prose-DELTA exemption explicitly |

---

## 7. The convergence criterion (what "cardinal-lesson PERFECTED" means)

The cardinal lesson is GREEN library-wide when:
1. `proof:live-verified-ledger` evaluates BOTH `live-verified` AND `complete` rows (the
   protocol's own spec, `:19`), so no visual wave hides behind `complete`.
2. The gate is AY-pathed (reads `docs/tranches/AY/PROGRESS.md` + `AY/audit/visual/`) — or
   tranche-parameterized — and runs born-RED against the first AY visual wave.
3. Every AY visual wave's hard-gate cell NAMES `proof:live-verified-ledger` (not prose
   "capture") and the wave's DELTA references ≥1 PNG OF ITS OWN SURFACE at ≥2 viewports ×
   {light,dark}.
4. A slides-side analog (`proof:live-verified-ledger` ported to `slides/scripts/`, reading the
   L PROGRESS + an L `audit/visual/` dir) is green; L.W5's deploy DELTA is machine-enforced.
5. The gate's binding is deepened: the DELTA must reference a PNG whose filename matches the
   wave (`W<NN>-*.png`), and motion/legibility waves carry the frame-count/contrast lines the
   protocol mandates (a structured-header lint, not free prose).
6. W15/W16/W08 (blob) carry a real captured DELTA — the single largest open live-truth gap.

---

## 8. Fold routing

- Holes #1 (complete-exemption) + #4 (shallow binding) + #5 (depth) → **AY.W-LIVE1** (the
  live-gate-CI decision wave) — extend `proof:live-verified-ledger` to cover `complete` rows,
  match-filename PNGs, and lint the protocol depth-header. Born-RED against the 6 visual
  suspect-completes.
- Hole #2 (AX-hardcoded) → **AY.W-LIVE1** + **AY.W-CLOSE1** — tranche-parameterize the gate
  path; mint `AY/PROGRESS.md` + `AY/audit/visual/`; `proof:ay-final` requires the AY gate green.
- Hole #3 (slides no gate) → **L.W4** (the gate-architecture wave) — port the gate to
  `slides/scripts/proof-live-verified-ledger.mjs`; add it to slides `package.json`; L.W5
  deploy gated on it.
- The blob backfill (W08/W15/W16) → **AY.W-BLOB2/W-BLOB3** hard gates must DELTA the surface.
- W56 squircle DELTA → carry into the AX close sweep (W-CLOSE1) as an owed capture.

---

## 9. waveSpecInputs (concrete material for the authored wave specs)

**For AY.W-LIVE1 (extend the cardinal gate):**
- **Defect:** `scripts/proof-live-verified-ledger.mjs:97` checks `live-verified` only;
  `CAPTURE-PROTOCOL.md:19` promises `live-verified`/`complete`. 6 visual `complete` rows
  (W05/W08/W15/W16/W17/W23) hold no DELTA and are gate-invisible.
- **Objective:** the gate evaluates `complete` rows on a curated VISUAL allowlist (the waves
  that changed pixels), match the referenced PNG filename to the wave (`^W<NN>-`), and lint
  the protocol depth-header (≥2 viewport lines, light+dark; motion → ≥5 frame lines; contrast
  → a measured ratio).
- **Edit sites:** `scripts/proof-live-verified-ledger.mjs` (`evaluateRow` :94, `deltaSatisfied`
  :74); the path consts `:33-34` → tranche-parameterized; `package.json:679`.
- **HARD GATE:** `proof:live-verified-ledger` born-RED against the 6 complete-exempt visual
  rows + the W52 cross-referenced-PNG case; GREEN only when each carries an own-surface DELTA.
  The self-test (`:112`) extended with a synthetic `complete`-visual-no-DELTA row.

**For the AY pathing (W-CLOSE1):**
- **Defect:** AY has no PROGRESS.md, no audit/visual/; gate reads AX paths.
- **Objective:** mint `docs/tranches/AY/PROGRESS.md` (the 67-row-style status ledger) +
  `docs/tranches/AY/audit/visual/`; gate reads the active tranche.
- **HARD GATE:** `proof:ay-final` requires `proof:live-verified-ledger` GREEN against AY paths.

**For L.W4 (slides gate port):**
- **Defect:** `slides/package.json` has no capture gate; K/L trees have 0 DELTA + 0 PNG; 8 L
  hard-gates say "capture" in prose.
- **Objective:** port `proof-live-verified-ledger.mjs` to `slides/scripts/`, reading the L
  PROGRESS + a new `slides/docs/tranches/L/audit/visual/` dir; add `proof:live-verified-ledger`
  to slides `package.json`; L.W5 deploy gated on it.
- **HARD GATE:** slides `proof:live-verified-ledger` green; L.W5 deploy DELTA (live 200
  screenshot light+dark, ≥2 viewport) is machine-required, not prose.

**For AY.W-BLOB2/3 (the blob backfill):**
- **Defect:** W08/W15/W16 marked `complete` with reasoned-not-pixel verification ("Could NOT
  run a real browser", S-cardinal §3a); D4/D5/D7 (skeuomorphic/hover-broken/mood-broken) stand.
- **Objective:** the blob impl waves close on a captured paired-π DELTA over `/substrates/goo-blob`
  + `/substrates/blob-mood`, light+dark, hover-flick centroid, dome-luma BAND not floor.
- **HARD GATE:** `proof:blob-*` green AND `audit/visual/W-BLOB2-DELTA.md` references own-surface
  PNGs at ≥2 viewports × {light,dark} + ≥5 hover frames.
