# BI.W-BORDER-PROGRESS-RETIRE — retire the /border-progress subpath (0 real consumers) + completion-seal watchlist

Band B8 (prunes + consumer-truth). Lands ON W-ORPHAN-BINARY-SPLIT (the demo-only category it applies).
Born-RED at HEAD.

## §Mandate

Discharges:
- **PLAN-FRAME ruling 4** — "border-progress: RETIRE the subpath until the speedtest adoption lands (the honest
  0-real-consumer state; the 'born ≥2' claim was false). Re-entry = the speedtest consume, already an ASK row.
  completion-seal: WATCHLIST with the demo-only status named in cut notes."
- **OFIT-2/3 / CHRONIC §6.4** — both ship as published subpaths with 0-1 real binary consumers; the CLAUDE.md
  "born ≥2 by construction" claims are FALSE at speedtest HEAD (border-progress hand-rolls its own bar;
  `docs/consumer-evidence/border-progress.md` is ABSENT).

## §Design

Decided (ruling 4, the mechanism-distinctness law, the W-ORPHAN-BINARY-SPLIT demo-only category). border-progress
has 0 binary consumers (speedtest hand-rolls its bar; its own demo is the sole render). Per ruling 4 the
`/border-progress` PUBLISHED subpath retires until a real binary consumer (the speedtest adopt ASK) lands; the
component is BANKED dormant (with the paint fix from W-BP-BOTTOM-LINEAR) so the speedtest consume can re-publish
it in the same cut — the "retire-until-adoption / banked-with-named-re-trigger" posture (NOT a full delete: the
re-entry is a consume of the EXISTING mechanism, not a re-mint). completion-seal is the milder case (1 honest
own-demo consumer, `consumer-evidence/completion-seal.md` PRESENT) → WATCHLIST, not retire.

- **border-progress:** un-publish the `/border-progress` subpath (package.json exports `:470-472` + typesVersions
  `:151-152` + the api/subpath mirror + the MIGRATION.md "born ≥2" row). The component
  (`src/components/custom/border-progress/`) + its demo STAY as a demo-only INTERNAL surface (the demo imports
  relatively / off the public subpath). The false "born ≥2 by construction" CLAUDE.md claim is STRUCK (the honest
  0-binary-consumer state stated); a truthful `consumer-evidence/border-progress.md` records the demo-only status
  + the named speedtest re-entry.
- **completion-seal:** KEEP published; the WATCHLIST is named in cut notes ("demo-only, 1 own-demo consumer,
  ≥2-binary unmet"); the honest evidence doc already exists.

Clean break: no alias, no "born ≥2" claim survives where the count is 0.

## §Work

- `package.json` — remove `./border-progress` (`:470-472`) + `border-progress` typesVersions (`:151-152`).
- `src/api/*` + `src/subpaths/border-progress.ts` (or entries mirror) — remove the border-progress publication.
- `MIGRATION.md` + CLAUDE.md — strike the border-progress "born ≥2 by construction" claim; state the honest
  0-binary-consumer / retire-until-speedtest-adopt status.
- `docs/consumer-evidence/border-progress.md` — CREATE (the honest demo-only + named re-entry doc).
- The component + demo (fixed by W-BP-BOTTOM-LINEAR) STAY (banked dormant, off the public subpath).
- `docs/consumer-evidence/completion-seal.md` — annotate the WATCHLIST status (demo-only, ≥2 unmet).

## §Acceptance

Gate: **`proof:consumer-truth`** (the border-progress arm — the inv-11 registry probe + the demo-only
disposition; the W-ORPHAN-BINARY-SPLIT split is the detector).
- **BORN-RED at HEAD**: `/border-progress` is a published subpath with 0 binary consumers + a false "born ≥2"
  claim + an ABSENT evidence doc (the retire clause reds).
- BP1 — `./border-progress` DEFINITION-ABSENT from package.json exports + typesVersions + api/subpath mirror;
  the component + demo remain (banked, demo-only).
- BP2 — no surviving "born ≥2 by construction" border-progress claim; `consumer-evidence/border-progress.md`
  states the honest demo-only status + the speedtest re-entry.
- BP3 — completion-seal stays published + carries the WATCHLIST annotation (demo-only, ≥2 unmet).
- Self-test bite: a re-published `/border-progress` with 0 binary consumers reds BP1; a re-added "born ≥2"
  claim reds BP2.

## §π/DELTA

No standalone π (un-publishing a subpath with a still-rendering demo changes zero user-visible pixels; the
BorderProgress demo paint is W-BP-BOTTOM-LINEAR's π). The inv-11 registry probe artefact + the gate RED→GREEN
differential are the evidence.

## §Obligations

- **inv-11 registry-consumer probe** before the un-publish (`npm view @mkbabb/glass-ui` + READ-ONLY sibling
  grep — confirm 0 binary consumers of `/border-progress` at execution; foreign-tree fence).
- **Cross-repo re-entry ASK (already rostered):** the speedtest AW.W7 `<BorderProgress>` adopt (delete its
  hand-rolled bar → import the mechanism) RE-PUBLISHES `/border-progress` in that cut — the named re-trigger.
  glass-ui edits ZERO sibling tree.

## §Dispositions

- Terminalizes **OFIT-2** (border-progress "born ≥2" lie) via ruling 4: `/border-progress` subpath RETIRED
  (banked dormant); re-entry = the speedtest adopt ASK. Liveness probe: a re-published `/border-progress` with
  0 binary consumers REDs.
- **OFIT-3 completion-seal:** WATCHLIST (KEEP published, demo-only status in cut notes) — not retired (1 honest
  consumer + present evidence doc).


## Round-10 gate designation (BI-R10-01)
The `proof:consumer-truth` named in §Acceptance is the border-progress 0-consumer + re-entry arm of **`proof:consumer-evidence-true`,
authored (NEW, born-RED) by BI.W-VIRTUAL-TRUTH** — this wave EXTENDS that gate with its arm; it
authors no second framework.
