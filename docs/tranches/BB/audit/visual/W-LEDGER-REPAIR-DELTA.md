# BB.W-LEDGER-REPAIR — DELTA (the cardinal-lesson ledger gate, de-coupled from PROGRESS column order)

**Wave**: BB.W-LEDGER-REPAIR — `proof:live-verified-ledger` reads the wave/status
columns BY HEADER NAME (not position), so the BA/BB silent no-op is closed.
**Branch**: tranche/BB (Batch 0)
**Status**: live-verified-equivalent (this is a GATE-INFRASTRUCTURE wave — it paints
ZERO pixels; the engine-green-on-the-fixed-parser logs ARE the binding truth, BA inv-4
binds VISUAL waves only, so there is NO `proof:ba-gestalt` requirement here).
**Gate**: `proof:live-verified-ledger` — the gate REPAIRS ITSELF (born-RED on the NEW
column-order self-test, GREEN at close).

## The root cause (re-grounded at HEAD, confirmed)

The gate's `waveRows` parser was POSITIONALLY coupled to the AX `| Wave | Title |
Status |` 3-column layout — `wave = body[0]`, `status = body[body.length - 1]`. It
worked for AX/AY (born-against), survived AZ BY LUCK (5 columns but wave-first +
status-last), and went SILENTLY INERT the moment BA re-ordered to `| batch | wave |
status | notes |` (`body[0]` = the batch DIGIT → fails the `/^W…/` regex → 0 rows) and
BB to `| wave | status | gate | note |` (`body[last]` = the NOTE prose → 0
live-verified). The cardinal-lesson class — a green claim over an un-evaluated reality
— recurred INSIDE the gate built to catch it.

## Born-RED logs

### Pre-fix BA (the silent no-op — HEAD's positional parser)

```
$ node scripts/proof-live-verified-ledger.mjs --tranche=BA
  wave rows parsed      : 0
  live-verified rows    : 0
  violations            : 0          ← exit 0, GREEN (the integrity hole)
```

### Mid-fix BA (the column-by-header parser BEFORE the reconcile — the 7 violations surfaced)

```
  wave rows parsed      : 32
  live-verified rows    : 23
  violations            : 7
    W-GOO-REDRESS    : DELTA references no .png (brace-shorthand `{bridge,hover}-{light,dark}`)
    W-DOCK-GEOMETRY  : 2 .png refs, none resolve (repo-rooted/`fleet/` paths off VISUAL_DIR)
    W-FEEDBACK-TONE  : 3 .png refs, none resolve (repo-rooted feedback-tone path off VISUAL_DIR)
    W-TABS           : DELTA references no .png (brace-shorthand `std-{mobile,desktop}-{light,dark}`)
    W-FOURIER-STUDIO : DELTA references no .png (brace-shorthand `{desktop,mobile}-{light,dark}`)
    W-SUFFUSE2       : DELTA references no .png (brace-shorthand per-section)
    W-ANIMATE        : no DELTA doc at all (the captures landed, the doc was never written)
```

### The column-order self-test born-RED witness

The OLD positional parser, run on the synthetic `batch`-first / `status`-mid fixture
(`| batch | wave | status | notes |` … `| 0 | W-TEST | **live-verified** | x |`),
reads `body[0]` = `0` (the batch digit) → fails `/^W…/` → **0 rows parsed**, so the
self-test's expected single `W-TEST` live-verified row is ABSENT → the flag goes falsy
→ the gate reds loudly (the RED-witness inverse). The repaired header-named parser
returns exactly 2 rows with `W-TEST` the single live-verified — the bite passes.

## GREEN at close

```
$ node scripts/proof-live-verified-ledger.mjs --tranche=BA      → exit 0
  wave rows parsed      : 32
  live-verified rows    : 23
  self-test (bite proof): OK — 7 synthetic rows flagged (… , column-order)
  violations            : 0
$ node scripts/proof-live-verified-ledger.mjs --tranche=BB      → exit 0  (68 rows, 0 false-live-verified)
$ node scripts/proof-live-verified-ledger.mjs --tranche=AY      → exit 0  (71 rows / 31 lv — UNCHANGED)
$ node scripts/proof-live-verified-ledger.mjs --tranche=AZ      → exit 0  (29 rows / 20 lv — UNCHANGED, W-METRIC-UNIFY restored)
$ node scripts/proof-live-verified-ledger.mjs --tranche=AX      → exit 0  (67 rows / 25 lv — the born-against shape)
```

## The escaped-pipe sub-fix (the no-regression keystone)

The first column-by-header cut regressed AZ to 19 live-verified (dropping
`W-METRIC-UNIFY`). Root cause: AZ's W-METRIC-UNIFY grounding cell carries an ESCAPED
pipe — `` the `amount \|\| placeholder` zero-value bug `` — and the naive
`ln.split("|")` broke on it, shifting the column indices so `cells[statusIdx]` read a
grounding-cell fragment instead of the status. The positional parser survived because
`body[last]` always landed on the (correctly-last) status regardless of mid-row splits.
The gestalt fix: `rowCells` now splits on UN-escaped pipes only (`/(?<!\\)\|/`) and
unescapes `\|` → `|` per cell — the proper markdown-table parse, which restores AZ to
20 (a TRUE superset of the positional parser, zero regression).

## The 7-row BA reconcile table (each row → its disposition)

EVERY violation was case (a) — the own-surface captures GENUINELY EXIST on disk; only
the DELTA references were unparseable (brace-shorthand the gate regex can't expand, or
paths resolving off `VISUAL_DIR`). NO row was re-statused to `live-pending` and NO
re-shoot is owed — the captures are real, the references are now machine-readable. NO
row was left a false `live-verified`.

| # | wave | disposition | the fix |
|---|---|---|---|
| 1 | W-GOO-REDRESS | (a) reference typo | added a resolved-frames line for the 4 real `W-GOO-REDRESS-{bridge,hover}-{light,dark}.png` |
| 2 | W-DOCK-GEOMETRY | (a) reference typo | resolved the `dock-plate-clearance/{sidebar-vertical,bottom-horizontal}-{light,dark}.png` brace-shorthand + re-rooted the `fleet/` baselines `../fleet/…` relative to `visual/` |
| 3 | W-FEEDBACK-TONE | (a) reference typo | resolved the `feedback-tone/{alert,toast,notification}-{light,dark}.png` (6 real PNGs) relative to `visual/` |
| 4 | W-TABS | (a) reference typo | resolved the 4 real `W-TABS-std-{desktop,mobile}-{light,dark}.png` |
| 5 | W-FOURIER-STUDIO | (a) reference typo | resolved the 4 real `W-FOURIER-STUDIO-{desktop,mobile}-{light,dark}.png` |
| 6 | W-SUFFUSE2 | (a) reference typo | resolved the 6 real `W-SUFFUSE2-{forms,containers,data}-{light,dark}.png` |
| 7 | W-ANIMATE | (a) missing DELTA doc, captures exist | created `W-ANIMATE-DELTA.md` referencing the 4 real `W-ANIMATE-{hero-enter,metric-countup}-{light,dark}.png` the π `tests-visual/ba-animate.spec.ts` writes |

No row hit the Triumvirate Dispatch hard-gate register (no surfaced violation needed a
re-shoot the Batch-0 environment could not reach). W-DELTA-RESHOOT (Batch 6) inherits
NOTHING from this wave's BA reconcile — every BA `live-verified` row is backed by a
real on-disk PNG it genuinely captured.

## The active-arm + commit-msg re-points

- `scripts/proof-live-verified-ledger.mjs` — `waveRows` is column-by-header; the
  fail-loud fallback (named diagnostic + exit 1 on a headerless table); the
  `**bold**` strip in `statusToken`; the escaped-pipe `rowCells`; the column-order
  self-test (the 7th synthetic bite); the header-comment canon re-written off the
  positional ordinal.
- `.githooks/commit-msg` — re-pointed AY→BB (the active-tranche commit-time bite).
- `package.json` (orchestrator-applied via sharedFileRequest) — the bare
  `proof:live-verified-ledger` runs `--tranche=BB`; a new `proof:live-verified-ledger:bb`
  mirrors `:ay`/`:az`/`:ba`.
- `scripts/gates.mjs` (orchestrator-applied via sharedFileRequest) — the registry NOTE
  updated to "GATES THE ACTIVE TRANCHE (BB)" + the column-by-header parser fix.
- `CLAUDE.md` (orchestrator-applied via sharedFileRequest) — the canon records that
  PROGRESS column order is now FREE (the parser reads the header).

## The slides coordination book (W-SLIDES-HANDOFF, Batch 5)

`slides/scripts/proof-live-verified-ledger.mjs` is the ported engine carrying the SAME
latent positional fragility. It is a FOREIGN tree (the cross-repo fence) — the column-
by-header parser fix is recorded as a by-name coordination book for the slides repo's
own adopt; no edit to the slides tree here.
