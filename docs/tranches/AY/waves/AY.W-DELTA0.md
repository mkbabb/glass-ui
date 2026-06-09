# AY.W-DELTA0 — Owed-DELTA backfill sweep (the folded DRAFT-W0)

**Tranche** AY · **Band** AX-close · **Batch** 4 (post W-CARDINAL-INFRA; pre W-CLOSE1) ·
**Kind** gate (capture-only; zero `src/` edits) · **Repo** glass-ui

> The cardinal lesson at one further remove. AX.W62 minted `proof:live-verified-ledger`
> to make `live-verified` UN-MINTABLE from prose. AY.W-CARDINAL-INFRA extends it to SEE
> the `complete`-token hiding place (a curated visual allowlist) + match-filename PNGs,
> and seeds `docs/tranches/AX/audit/visual/VISUAL-ALLOWLIST.json` with the 6 suspect-completes
> **born-RED**. This wave is the OTHER half: it CAPTURES the owed pixels so that born-RED
> gate goes GREEN — not by relaxing the gate, by paying the debt the gate measures.

---

## Goal criterion

Every AX visual wave that the cardinal gate can SEE but that currently holds no
own-surface pixel is paid off with a fresh on-disk DELTA: the W56 squircle (the one
honest `dev-landed · live-pending (DELTA owed)` holdout the gate forced), the 6 visual
`complete`-exempt rows (W05/W08/W15/W16/W17/W23 — gate-invisible until W-CARDINAL-INFRA's
allowlist arm), the W52 liquid-glass material that "passed" the shallow gate by
pointing at W45/W54's neighbour pixels, AND the two remaining open `live-pending` rows
re-verified at HEAD — W19 (the primitive-prune retire-DELTA / deletion-proof) and W09
(absorbed into W52's capture). After this wave, NO AX PROGRESS row carries an open
`live-pending`/`(DELTA owed)` token (the set {W09, W19, W56} all flip `live-verified`), and
no AX visual row the cardinal gate sees lacks a captured DELTA OF ITS OWN SURFACE — so
W-CLOSE1's NO-OPEN-LIVE-PENDING clause (clause 4) greens on the terminal close.

## Completion criterion

The single binding condition (the hard gate, §HARD GATE below): the
W-CARDINAL-INFRA-extended `proof:live-verified-ledger:ax` (`--tranche=AX`) runs **GREEN** (exit 0,
`violations: 0`) over the seeded AX allowlist (the 6 `complete`-exempt rows + the filename-match
clause), AND the W56 row flips `dev-landed · live-pending (DELTA owed)` → `live-verified` THROUGH
the gate, AND the W52-DELTA references a W52-named own-surface PNG, AND the W19 + W09 rows flip
`live-verified` (W19 against its deletion-proof DELTA, W09 against W52's capture) so ZERO AX rows
carry an open `live-pending` token. Each owed VISUAL row carries a `W<NN>-DELTA.md` that references
≥1 real on-disk `W<NN>-*-(light|dark).png` at ≥2 viewports × {light,dark}; the W19 retire-DELTA
carries the deletion-proof artefact (build-diff + public-surface absence) in lieu of a
painting-surface PNG (the retire-DELTA exemption, recorded in its DELTA header).

**The `:ax` tracker is the discharge witness.** W-CARDINAL-INFRA's un-lockout (§4a) leaves the AX
arm born-RED in the dedicated `proof:live-verified-ledger:ax` script (NON-blocking — it gates no
commit, no CI). THIS wave drives THAT tracker green: `npm run proof:live-verified-ledger:ax`
exits 1 (6 violations) at this wave's open and exits 0 at its close — that born-RED→GREEN flip on
the named tracker is the cardinal artefact.

---

## §1 — the defect (source-grounded, file:line)

This wave is the discharge half of two H-cardinal findings. The defects are concrete
ledger + artefact states, not source bugs.

### D1 — W56 is the only honest `live-pending (DELTA owed)` holdout

`docs/tranches/AX/PROGRESS.md:103`:

```
| W56 | squircle design-language — corner-shape: superellipse() token axis (G3, foundational) | dev-landed · live-pending (DELTA owed) |
```

The squircle SHIPPED at source (`src/styles/theme.css:92-108` mints the `--corner-shape-*`
token axis; `src/styles/glass.css:865-870` + `src/styles/dock/shell.css:297-299` apply
`corner-shape: var(--corner-shape-{dialog,sheet,bigdock})` under `@supports (corner-shape:
superellipse(2))`) — but no pixel was ever captured. The gate (`proof-live-verified-ledger.mjs`)
correctly did NOT let it flip to `live-verified`: the status reads the honest
`dev-landed · live-pending (DELTA owed)`. This is the gate doing its job; the debt is the
capture.

### D2 — 6 AX visual `complete` rows hold NO DELTA (gate-invisible until W-CARDINAL-INFRA)

The PRE-W-CARDINAL-INFRA gate checked `statusToken(row.status) === "live-verified"` ONLY, while
`CAPTURE-PROTOCOL.md:19-21` promised `live-verified`/`complete`. The 6 visual suspect-completes
(`H-cardinal §2`, verified `for w in W05 W08 W15 W16 W17 W23; do test -f …/$w-DELTA.md; done` →
all NO DELTA) sailed through as plain `complete`. W-CARDINAL-INFRA's allowlist arm now SEES them
(`evaluateRow` `:188-220`, the `allowlist.has(row.wave)` branch) — so they are born-RED in the
`:ax` tracker until THIS wave pays them:

| Wave | `PROGRESS.md` line | Title | Status | DELTA? |
|---|---|---|---|---|
| W05 | `:49` | one iOS-spring vocabulary | `complete` | NONE |
| W08 | `:52` | blob core unblock — smin distance regime | `complete` | NONE |
| W15 | `:59` | blob contained droplet — lit warm-cream membrane | `complete` | NONE (own JSON: "Could NOT run a real browser") |
| W16 | `:60` | blob integration | `complete` | NONE |
| W17 | `:61` | constellation tokens + warp | `complete` | NONE |
| W23 | `:67` | carousel indicator reauthor | `complete` | NONE |

W-CARDINAL-INFRA seeds `docs/tranches/AX/audit/visual/VISUAL-ALLOWLIST.json` =
`["W05","W08","W15","W16","W17","W23"]` and extends `evaluateRow` (`:94`) so a `complete` row
ON the allowlist is held to the SAME `deltaSatisfied` bar — leaving these 6 **born-RED**. This
wave pays them.

### D3 — W52-DELTA references neighbour pixels, not a W52 surface

`docs/tranches/AX/audit/visual/W52-DELTA.md:13-15` references `W54-card-desktop-{light,dark}.png`,
`W54-buttons-desktop-light.png`, `W45-readback.json` + `W45-dock-desktop-light.png` —
**all other waves' captures; no `W52-*` named PNG.** W52 is `live-verified` (not `complete`) and
NOT on the AX allowlist, so at HEAD it keeps the SHALLOW bar (any real PNG — its W45/W54 neighbour
pixels pass; verified `npm run proof:live-verified-ledger:ax` does NOT flag W52). W-CARDINAL-INFRA's
LANDED own-surface filename-match clause (`ownSurfaceVerdict` `:132-148`, gated by `allowlist.has`
at `evaluateRow` `:203`) bites ONLY an allowlisted row — so this wave ARMS the bite by ADDING `W52`
to `VISUAL-ALLOWLIST.json` (§3), which holds the W52 row to the deepened own-surface bar and flips
it RED on its neighbour pixels. This wave then PAYS it: capture a real W52 liquid-glass surface (the
D19 overhaul: edge gleam default-off, no central bloom, calm `saturate`, glass button) so the
W52-DELTA references its OWN `^W52-` pixels and the now-allowlisted row greens.

### D4 — W19 + W09 are the OTHER open `live-pending (DELTA owed)` AX rows (re-verified at HEAD)

Re-measured at HEAD (`grep -nE '^\| W' docs/tranches/AX/PROGRESS.md | grep -iE 'live-pending|DELTA owed'`),
the AX rows STILL carrying an open `live-pending` token are exactly **three**: W56 (D1), plus:

- `docs/tranches/AX/PROGRESS.md:63` — `| W19 | primitive prune A — header-ribbon/glyph-face/disco-glyph | dev-landed · live-pending (DELTA owed) |`. A primitive-RETIRE wave: the owed artefact is a **deletion-proof DELTA** (the orphan primitives gone from the public surface + a build-diff showing the dist chunks no longer emit), not a painting-surface π — but it IS an open `live-pending` row that W-CLOSE1's NO-OPEN-LIVE-PENDING clause (clause 4) REDs on. This wave discharges it: capture the retire-DELTA (the `ls dist/` before/after deletion proof + the public-surface absence) OR, if the retirement's live truth is already W-SB1's scope, route it explicitly (W-SB1 owns header-ribbon/glass-panel retirement — see §5 named-successor) and flip the W19 row to `live-verified` against W-SB1's deletion-proof DELTA.
- `docs/tranches/AX/PROGRESS.md:53` — `| W09 | specular tune to subtle | live-pending — D11 radials absorbed by W52 (cardinal re-open) |`. W09's specular work was ABSORBED by the W52 D19 overhaul (the `live-pending` note says so). Its discharge rides W52's own-surface re-capture (D3 / AY.W-DELTA0.3): the W52 liquid-glass DELTA IS the proof the D11 radials are gone, so W09 flips to `live-verified — D11 absorbed by W52; see W52-DELTA` once .3 lands. This wave records the W09→W52 absorption mapping so clause 4 does not RED on a row whose surface is captured under a sibling wave-id.

**Why this matters (the W-CLOSE1 reconcile):** `AY.W-CLOSE1 §4 clause 4` (NO-OPEN-LIVE-PENDING)
REDs the terminal close on ANY open `live-pending`/`(DELTA owed)` row across the AX+AY PROGRESS. At
HEAD that set is {W09, W19, W56} — NOT the stale "7 carriers W19/W45/W52/W53/W56/W57/W59" the
original W-CLOSE1 prose named (W45/W52/W53/W57/W59 are ALREADY `live-verified` at HEAD). This wave
is the discharge half for all three open rows; W-CLOSE1's clause 4 is their terminal check.

### D5 — W01/W02 prose-DELTAs are in the wrong dir, 0 PNGs (boundary note, NOT in this wave's gate)

`H-cardinal §2` wrinkle: W01/W02 DELTAs live in `docs/tranches/AX/audit/` (not `audit/visual/`)
and reference 0 PNGs. They pass solely because W01/W02 are `complete` AND NOT on the visual
allowlist (the morph-orchestrator + single-scalar are structural, not pixel-surface waves).
**They stay off the allowlist by the "changed pixels" curation** — this wave does NOT add them;
recording the rationale here closes the loophole question. (The morph IS visual, but its live
proof is `proof:dock-animation-live`'s per-frame readback, captured under W45-DELTA's dock
sweep, not a W01/W02 own capture.)

---

## §2 — objective (the owed-DELTA backfill)

Capture the owed pixels and write the conformant DELTAs. Three sub-units, each closing on
its own captured artefact. NO `src/` edits — the surfaces SHIPPED; this is the live-truth
debt the cardinal lesson demands. The model is `W54-DELTA.md` (routes × viewports × schemes
table + paired-π `getComputedStyle` readback + visual verdict).

### AY.W-DELTA0.1 — the W56 squircle cornerShape readback

**Aim.** Capture the squircle on the surfaces where it READS (the W56 policy: cards/pills/panels
stay round; dialog/sheet/big-dock → superellipse) and prove `corner-shape` resolves to
`superellipse(2)` on a Chrome 147+ engine — the foundational G3 holdout.

**Capture targets** (the 3 squircle surfaces, `theme.css:92-108`):
- Dialog modal — route serving `<Dialog>` (`--corner-shape-dialog`, `glass.css:867`)
- Sheet side-drawer — route serving `<Sheet>` (`--corner-shape-sheet`, `glass.css:870`)
- Big-dock card shell — the dock showcase big-dock tier (`--corner-shape-bigdock`,
  `dock/shell.css:299`)

**The paired-π readback** (the load-bearing line — a squircle is imperceptible at small radius,
so the SCREENSHOT alone is insufficient; the resolved `corner-shape` is the binding truth):
- `getComputedStyle(el).cornerShape` → `superellipse(2)` (NOT `round`) on the Chrome 147+ capture
  engine, recorded to `W56-readback.json`.
- BEFORE (the round contract / a Safari-Firefox fallback engine): `cornerShape: round` (the
  cross-engine contract — the squircle is the better TIER, not a degraded fallback).
- Confirm leak-free: cards/pills/panels on the same page resolve `cornerShape: round`
  (`--corner-shape-card/pill/panel: round`, `theme.css:92-94`) — the policy's "stays round"
  half.

**Sub-gate.** `W56-DELTA.md` references ≥1 `W56-*-(light|dark).png` at ≥2 viewports × {light,dark}
+ a `W56-readback.json` with `cornerShape: "superellipse(2)"` on the dialog/sheet/bigdock and
`"round"` on the card/pill/panel control. PROGRESS row `:103` flips to `live-verified`.

### AY.W-DELTA0.2 — the 6 complete-exempt own-surface DELTAs

**Aim.** Pay each born-RED allowlist row with an own-surface capture. Where a row's surface was
superseded, the DELTA records the supersession AND still captures the live current surface
(the lesson: a supersession note is not a pixel).

| Sub-unit | Wave | Surface to capture | Note |
|---|---|---|---|
| .2a | W05 | the iOS-spring vocabulary — a `SegmentedTabs`/transition surface settling on `--spring-snappy` | superseded-by-W53; STILL capture the current spring settle (≥5 rAF frames — a motion wave) |
| .2b | W08 | `goo-blob` — the smin distance-regime metaball merge | blob; shares the W-BLOB2 capture scope if co-scheduled (see §named-successor) |
| .2c | W15 | `goo-blob` — the lit warm-cream contained droplet (specular + containment) | the SHARPEST: its own JSON said "Could NOT run a real browser"; this is the largest live-truth gap |
| .2d | W16 | `goo-blob` — integration (interaction + perf) | blob |
| .2e | W17 | the constellation field — tokens + warp-on-click | low risk; confirmatory |
| .2f | W23 | the carousel indicator — glass scrubber | confirm the reauthor renders |

Each captures ≥2 viewports × {light,dark}; motion surfaces (W05 spring, W17 warp, W08/W15/W16
blob hover-flick) add ≥5 rAF-sampled frames per CAPTURE-PROTOCOL.md:16.

**Coordination with W-BLOB2/3.** W08/W15/W16 (the blob trio) ARE the largest open live-truth
gap (`H-cardinal §6`). The AY.W-BLOB2 hard gate independently requires an own-surface blob DELTA
(`audit/visual/W-BLOB2-DELTA.md`, ≥2 viewports × {light,dark} + ≥5 hover frames). **The blob
captures are produced ONCE.** This wave's W08/W15/W16 own-surface DELTAs MAY be the SAME captures
W-BLOB2/3 produces, re-referenced under the AX wave-ids (`W08-DELTA.md` etc. reference the
W-BLOB2 PNGs — but those PNGs must satisfy the `^W08-`/`^W15-`/`^W16-` filename-match clause, so
they are copied/renamed to the AX wave-id prefix, OR captured fresh under the AX prefix). Do NOT
double-render. If W-BLOB2 lands first, this wave RE-HOMES its blob pixels under the AX prefixes;
if this wave lands first, W-BLOB2 references these.

**Sub-gate.** All 6 of `W05/W08/W15/W16/W17/W23-DELTA.md` exist, each referencing ≥1
filename-matched (`^W<NN>-`) real on-disk PNG at ≥2 viewports × {light,dark}. The
`VISUAL-ALLOWLIST.json` rows go born-RED → GREEN through the gate (no allowlist edit — the debt
is paid, the gate is not relaxed).

### AY.W-DELTA0.3 — the W52 own-surface liquid-glass re-capture

**Aim.** Capture a real W52 liquid-glass surface (the D19 overhaul) so the W52-DELTA references
W52-named pixels, not W45/W54's. The binding claim: "no central bloom; bounded edge gleam,
default-off at rest, wakes on hover; calm `saturate`; glass button real-blur."

**Capture target.** A glass-Card-over-aurora / speedtest-card composite OR the glass Button
family — a surface where the D19 material is the SUBJECT (not incidental to a card-tier sweep).

**The paired-π readback** (`W52-readback.json` — the bounded-gleam default-off discipline):
- rest: `::before` specular opacity `0` (NO resting bloom — the D19 default-off)
- hover: `::before` specular opacity ≈`0.1` (a whisper edge gleam, not a full-plate disc)
- `--glass-specular-size: 22%` (the bounded circle, not the unbounded plate) resolved on the
  captured element (source-locked by `proof:liquid-glass-material`, confirmed live here).

**Sub-gate.** `W52-DELTA.md` REWRITTEN to reference ≥1 `W52-*-(light|dark).png` own-surface
capture at ≥2 viewports × {light,dark} + a `W52-readback.json` rest/hover specular pair. The
existing neighbour-PNG references (`W54-card-*`, `W45-dock-*`) may stay as corroborating context
but a `^W52-` PNG MUST be the satisfying reference.

---

## §3 — edit-sites (exact)

NO `src/` edits (the surfaces SHIPPED; this is capture-only). All edits land in
`docs/tranches/AX/`.

| Path | Edit |
|---|---|
| `docs/tranches/AX/PROGRESS.md:103` | flip W56 `dev-landed · live-pending (DELTA owed)` → `live-verified — squircle corner-shape token axis (G3) live on dialog/sheet/big-dock; cornerShape readback superellipse(2); DELTA audit/visual/W56-DELTA.md` |
| `docs/tranches/AX/audit/visual/W56-DELTA.md` | NEW — the squircle DELTA (model: W54-DELTA) |
| `docs/tranches/AX/audit/visual/W56-readback.json` | NEW — `{cornerShape}` per surface (superellipse(2) on dialog/sheet/bigdock; round on card/pill/panel) |
| `docs/tranches/AX/audit/visual/W56-*-(light\|dark).png` | NEW captures (≥4: dialog+sheet+bigdock × light/dark, ≥2 viewports) |
| `docs/tranches/AX/audit/visual/W05-DELTA.md` + `W05-*-(light\|dark).png` | NEW — spring-vocabulary capture (superseded-by-W53 note + ≥5 spring frames) |
| `docs/tranches/AX/audit/visual/W08-DELTA.md` + `W08-*-(light\|dark).png` | NEW — blob smin (shares W-BLOB2 captures, re-homed under `^W08-`) |
| `docs/tranches/AX/audit/visual/W15-DELTA.md` + `W15-*-(light\|dark).png` | NEW — lit warm-cream droplet (the sharpest; ≥5 hover frames) |
| `docs/tranches/AX/audit/visual/W16-DELTA.md` + `W16-*-(light\|dark).png` | NEW — blob integration |
| `docs/tranches/AX/audit/visual/W17-DELTA.md` + `W17-*-(light\|dark).png` | NEW — constellation tokens + warp (≥5 warp frames) |
| `docs/tranches/AX/audit/visual/W23-DELTA.md` + `W23-*-(light\|dark).png` | NEW — carousel glass scrubber |
| `docs/tranches/AX/audit/visual/VISUAL-ALLOWLIST.json` | ADD `"W52"` to the array. **Load-bearing:** W52 is `live-verified` (not `complete`) and NOT on the allowlist, so it keeps the SHALLOW bar today (any real PNG — its W45/W54 neighbour pixels pass; verified `:ax` does NOT flag W52 at HEAD). The own-surface filename-match clause (`evaluateRow` `:203` `allowlist.has`) only bites an ALLOWLISTED row, so the W52 own-surface bite fires ONLY after W52 joins the allowlist. The allowlist edit is what arms the filename-match for W52; this wave then pays it with the `^W52-` capture below. |
| `docs/tranches/AX/audit/visual/W52-DELTA.md` | REWRITE — reference a `^W52-` own-surface PNG (keep neighbour PNGs as context only) |
| `docs/tranches/AX/audit/visual/W52-readback.json` | NEW — rest/hover specular pair + `--glass-specular-size: 22%` |
| `docs/tranches/AX/audit/visual/W52-*-(light\|dark).png` | NEW liquid-glass own-surface captures |
| `docs/tranches/AX/PROGRESS.md:63` | flip W19 `dev-landed · live-pending (DELTA owed)` → `live-verified` against the deletion-proof DELTA (own retire-DELTA OR W-SB1's, per §5) |
| `docs/tranches/AX/audit/visual/W19-DELTA.md` | NEW (if not W-SB1-routed) — the primitive-prune deletion-proof: `ls dist/` before/after + public-surface absence of header-ribbon/glyph-face/disco-glyph. A retire-DELTA's artefact is the deletion-proof, not a painting-surface PNG — recorded as the exemption in the DELTA header. |
| `docs/tranches/AX/PROGRESS.md:53` | flip W09 `live-pending — D11 radials absorbed by W52` → `live-verified — D11 absorbed by W52; see W52-DELTA` (W09's surface is captured under W52's own DELTA, .3) |

**Dependency.** This wave BLOCKS on W-CARDINAL-INFRA landing first (it owns the gate's
`complete`-allowlist + filename-match + tranche-param machinery and seeds the AX
`VISUAL-ALLOWLIST.json`). Without it, the `complete` rows are still gate-invisible and the W52
filename-match clause does not exist — the gate cannot WITNESS this wave's discharge. Per
`W-CARDINAL-INFRA §4`, the 6 rows are left RED there ON PURPOSE so THIS wave's bite is real.

---

## §4 — HARD GATE (evidence-backed)

The gate is the W-CARDINAL-INFRA-extended `proof:live-verified-ledger`, run over the AX tranche
with the seeded allowlist + filename-match clause. The artefact is the gate's exit code +
stdout + its written `.cache/gates/AX-live-verified-ledger.json`, plus the on-disk PNG/JSON
DELTAs. No grep-only; no "API exists"; the binding truth is the gate going born-RED → GREEN over
this wave's captures.

**G-DELTA0 (the single binding gate).** `npm run proof:live-verified-ledger:ax` (i.e.
`node scripts/proof-live-verified-ledger.mjs --tranche=AX`, the W-CARDINAL-INFRA §4a non-blocking
backlog tracker) exits **0** (GREEN) with `violations: 0`, where GREEN is reachable ONLY because:

1. **W56 flips through the gate.** PROGRESS `:103` reads `live-verified`; `deltaSatisfied("W56")`
   returns `ok:true` against a real on-disk `W56-*.png`; `W56-readback.json` records
   `cornerShape: "superellipse(2)"` on dialog/sheet/bigdock + `"round"` on card/pill/panel.
   *(Verification: the gate evaluates the now-`live-verified` W56 row and finds the DELTA; `jq`
   the readback for the two cornerShape values.)*

2. **The 6 `complete`-exempt rows are satisfied on the allowlist.** With
   `AX/audit/visual/VISUAL-ALLOWLIST.json` = `["W05","W08","W15","W16","W17","W23"]` (seeded RED
   by W-CARDINAL-INFRA), each of the 6 now passes `deltaSatisfied` against a filename-matched
   `^W<NN>-*.png`. *(Verification: BEFORE this wave the gate exits 1 listing 6 violations — the
   born-RED witness captured as the DELTA's "before"; AFTER, exits 0. The born-RED→green diff
   IS the artefact.)*

3. **W52 references its own surface.** The filename-match clause (W-CARDINAL-INFRA) requires the
   W52 row's satisfying PNG to match `^W52-`; the rewritten `W52-DELTA.md` references
   `W52-*.png`. *(Verification: the gate's `deltaSatisfied("W52")` returns the `^W52-` PNG, not a
   `W54-`/`W45-` neighbour; `W52-readback.json` shows rest=0 / hover≈0.1 specular.)*

4. **Depth floor met.** Every new/rewritten DELTA references ≥2 viewport captures × {light,dark}
   with own-surface `W<NN>-…-(light|dark).png` filenames; motion rows (W05/W08/W15/W16/W17) carry
   ≥5 rAF frame references. *(Verification: per-DELTA, the own-surface `-light.png`/`-dark.png`
   pair the engine's `ownSurfaceVerdict` (`proof-live-verified-ledger.mjs:132-148`) asserts; the
   light/dark depth-lint arm is LANDED in the engine, so the gate's own green IS the depth proof —
   not a manual grep.)*

5. **No open `live-pending` remains across AX.** `grep -nE '^\| W' docs/tranches/AX/PROGRESS.md |
   grep -ciE 'live-pending|DELTA owed'` returns **0** — the {W09, W19, W56} rows all flipped
   `live-verified` (W19 against its deletion-proof DELTA; W09 against W52's capture; W56 against
   its readback). *(Verification: the grep count, the terminal half of W-CLOSE1's NO-OPEN-LIVE-
   PENDING clause 4; this wave is the discharge, W-CLOSE1 is the check.)*

**The born-RED → GREEN delta is the cardinal artefact.** Capture the `:ax` tracker's failing
stdout (6 violations + the W52 filename-mismatch + the W56 live-pending) at the start of the wave
and its `violations: 0` stdout at close — that paired transcript is the deletion-proof-equivalent
for a capture wave. A close that shows only the green run without the born-RED witness is REJECTED
(re-mints the inflation the gate forbids).

**Self-test stays bound.** The gate's extended self-test (`:112`, W-CARDINAL-INFRA: synthetic
`live-verified`-no-DELTA + `complete`-on-allowlist-no-DELTA + filename-mismatch rows) MUST flag
on every run — the gate proves its own bite while this wave's real rows go green.

---

## §5 — what this wave is NOT (scope fence + named successors)

- **NOT a gate-engine change.** The `complete`-allowlist / filename-match / tranche-param / depth
  machinery is W-CARDINAL-INFRA's (`scripts/proof-live-verified-ledger.mjs:33-34,94-103,112-119`).
  This wave touches ZERO `scripts/`. If a capture reveals the gate cannot see a row it should, that
  is a W-CARDINAL-INFRA scope-reveal, not a W-DELTA0 patch.
- **NOT a re-design.** The squircle, blob, constellation, carousel, and W52 material all SHIPPED.
  If a capture reveals a BROKEN surface (e.g. W15 blob still skeuomorphic, the D4/D5/D7 defects),
  this wave records the defect in the DELTA's verdict as a tuned-magnitude correction and routes
  the FIX to its named successor — it does not silently pass a broken pixel.
- **Named successors:** the blob VISUAL fixes (if the W15/W08/W16 captures show broken
  hover/mood/skeuomorphism) → **AY.W-BLOB2 / AY.W-BLOB3** (those waves own the blob impl + their
  own DELTA; this wave's blob captures coordinate with theirs, captured ONCE). The W23 carousel
  P5 Apple-liquid bar (if un-reached) → a separate carousel wave (out of AY scope unless booked).
  The slides L-side capture discipline → **L.W4** (the ported gate) + **L.W5** (the deploy DELTA).
- **NOT W01/W02.** They stay OFF the visual allowlist (structural waves; their live proof is
  `proof:dock-animation-live` under W45-DELTA), recorded in §1 D4 to close the loophole.

---

## §6 — cross-references

- `H-cardinal §2` (the complete-exemption + the W56 holdout) + `§5` (the shallow W52 binding) +
  `§9 waveSpecInputs` (the concrete material) — the finding this wave discharges.
- `AY.W-CARDINAL-INFRA` `§3.5/§3.6` + `§4` — the gate machinery + the deliberately-left-RED 6
  rows this wave pays; `§NOT-in-scope` names AY.W-DELTA0 as the backfill owner.
- `docs/tranches/AX/audit/visual/CAPTURE-PROTOCOL.md` — the depth floor (≥2 viewport ×
  {light,dark}, own-surface `W<NN>-…` filenames, ≥5 motion frames, measured contrast).
- `docs/tranches/AX/audit/visual/W54-DELTA.md` — the exemplary own-surface DELTA model
  (routes × viewports × schemes + paired-π readback + verdict).
- `src/styles/theme.css:81-108` + `glass.css:865-870` + `dock/shell.css:297-299` — the W56
  squircle source the .1 readback proves live.
