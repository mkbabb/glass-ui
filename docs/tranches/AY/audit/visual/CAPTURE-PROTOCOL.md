# AY live-verify CAPTURE protocol (the cardinal-lesson artefact discipline)

The #1 chronic miss carried forward: a wave shipped headless-green over a
live-broken surface and the PROGRESS ledger minted `live-verified`/`complete` from
a prose claim — no captured pixel. A commit message is not a captured live audit.
The cardinal lesson demands a BINDING, FALSIFIABLE live close, so every wave that
closes on a finished surface MUST leave a captured DELTA here, machine-enforced by
`proof:live-verified-ledger` (`--tranche=AY`).

## The artefact per closed visual wave

`docs/tranches/AY/audit/visual/W<NN>-DELTA.md` carrying:
- the route(s) audited + the viewports (≥2: a desktop ≥1280 and a mobile 375×667) × {light, dark}
- the BEFORE/AFTER paired-π getComputedStyle readbacks (the exact numbers the wave changed)
- ≥1 screenshot reference of the wave's OWN surface, saved beside it as
  `W<NN>-<route>-<viewport>-<scheme>.png` — both a `…-light.png` AND a `…-dark.png`
- for motion waves: ≥5 rAF-sampled timing frames (the live animation gate output)
- for contrast/legibility waves: the measured WCAG ratio
- **the FRESHNESS headers (AY.W-LIVE1) — REQUIRED going forward:**
  - `<!-- capture-commit: <SHA> -->` — the commit the capture was taken against (written at capture time).
  - `<!-- surface-paths: <glob,glob> -->` — the source files that PAINT the captured surface
    (e.g. `src/styles/dock, src/components/custom/dock`).
  These are a STRUCTURED, machine-read contract, not free prose. `proof:live-verified-ledger`'s freshness
  clause runs `git log -1 --format=%H -- <surface-paths>` and asserts the surface's last-touch commit is an
  ANCESTOR of the capture-commit (the surface did NOT change after the capture). Under `--strict-freshness`
  (the `:ax` backlog tracker + the close-verification arm) a DELTA missing these headers, or carrying a
  capture-commit that PRE-DATES a surface change, REDs (`DELTA stale: …` / `lacks the freshness headers`).
  A header-LESS own-surface DELTA is GRACED on the bare active arm during the backfill window (a non-fatal
  NOTE) so the active commit/CI gate is not a freshness lockout — the owed re-captures are the AY.W-DELTA0 /
  owed-DELTA sweep's job; but a DELTA that DECLARES headers is held to the ancestry check.
  - **The `superseded-by` grace (AY.W-LIVE1):** a capture that is genuinely STALE (its painting surface was
    re-rendered after the capture) but whose surface was RE-CAPTURED by a LATER own-surface live-verified
    wave declares `<!-- superseded-by: <wave> -->` — the FRESH evidence exists under the named successor
    wave-id. Such a row is graced on the bare arm (a NOTE recording the staleness + the superseding wave),
    RED under `--strict-freshness` (the close-verification arm sees every stale capture; the own-wave-id
    re-capture is AY.W-DELTA0's). A stale DELTA with NO `superseded-by` REDs on every arm.
- **the R1 IHDR fabricated-viewport assert (AY.W-LIVE1).** The gate reads each own-surface PNG's IHDR
  dimensions: a basename carrying the `-mobile-` viewport token must NOT have a desktop-class width
  (≥1000px) — a desktop screenshot RENAMED `-mobile-` (the HC-cardinal §1a fabrication class) REDs. The
  1000px bound sits above the largest real mobile capture (390×844@2× = 780) and below the desktop
  full-viewport floor (1280), so it false-flags neither.
- **the R6 GREEN-on-real-surface clause (AY.W-LIVE1).** A DELTA that CITES a gate artefact
  (`.cache/gates/<id>.json`) is asserting that gate passed on the real surface. The gate resolves each cited
  artefact and asserts `status === "pass"`; a cited artefact that persists `fail`/is absent contradicts the
  prose GREEN claim (the HC-cardinal §3a class). Graced on the bare arm (a NOTE — the green-on-real re-run is
  the wave's own RG job), RED under `--strict-freshness`.
- the verdict (PASS / a tuned-magnitude correction)

## What the gate enforces (`proof:live-verified-ledger --tranche=AY`)

A wave's PROGRESS status is `live-verified` ONLY when its `W<NN>-DELTA.md` exists.
The gate covers BOTH the `live-verified` token AND `complete` — but the `complete`
bar is curated: a `complete` wave is held to the own-surface DELTA bar ONLY when it
is on `VISUAL-ALLOWLIST.json` (the "this wave changed pixels and owes a capture"
curation). A doc/gate/non-visual `complete` wave is untouched. An allowlisted close
(live-verified OR complete) is held to the DEEPENED bar:
- the DELTA must reference ≥1 PNG of the wave's OWN surface (`^W<NN>-`) — it cannot
  satisfy the gate by pointing at a NEIGHBOUR's pixels (the W52 cross-reference miss);
- the own-surface PNGs must include a `-light.png` AND a `-dark.png` (the ≥2-viewport
  × {light,dark} floor above).

A `live-verified` row NOT on the allowlist keeps the shallow referenced-real-PNG bar
— the shared-surface rows that legitimately cite a sibling wave's captures (declared
in the status cell) stay green. A wave that changed pixels ADDS its wave-id to
`VISUAL-ALLOWLIST.json` when it closes (the curation is the contract).

The `(DEVELOPED)` modifier is RETIRED and gate-rejected in any status cell (the
linguistic vehicle of the original inflation). If a capture was unreachable the only
legal status is `live-pending` (DELTA owed) — never a `complete`/`live-verified` flip.

## The discipline going forward

Every develop→harvest cycle ends with the orchestrator running the
chrome-devtools-mcp (or playwright-mcp) live sweep AND writing the `W<NN>-DELTA.md` +
own-surface screenshots BEFORE flipping PROGRESS to `live-verified` (and adding the
wave to `VISUAL-ALLOWLIST.json` if it changed pixels and closes `complete`). No
exceptions — the capture IS the close criterion.
