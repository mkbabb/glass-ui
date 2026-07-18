# REFABLE RU-13 — scrutiny sidecar for DOSSIER-F11-F20

verified-model: claude-fable-5 (the true run; the prior artifact ran on claude-opus-4-8 via config
override). Date: 2026-07-18. HEAD at scrutiny: v7.0.0-51-g4757315a.

Protocol followed: (1) ANEW from the original edict against primary sources only (ledger rows,
preserved PNGs, `src/` + `demo/` at HEAD, git history, bands + PLAN.md) with the opus artifact
unread; (2) SCRUTINY of the opus artifact claim-by-claim, guilty until re-proven; (3) UNION
rewritten in place at `../redress/DOSSIER-F11-F20.md`.

Boundary moment: ANEW closed after the ten-row source pass (F17's `searchVariants.ts` rounded-none
root cause, F16's dead-export census, F11's BI-B1 provenance, and F12's cut-level git proof all in
hand) — only then were DOSSIER-F11-F20.md, JUDGE.md, APPLYLOG.md, the CRIT files, and the crosswalk
opened.

## Per-row verdicts

| Row | verdict | basis |
|-----|---------|-------|
| F11 | **RATIFIED** (+enrichment) | correlation (AuroraConfigDock sub-labels verbatim), fault (`configurator/styles.css:25,:117`), owner (G-CFG-3), and the "deliberate idiom mismatch" post-mortem all re-proven; union adds the git fact that the card+gap treatment landed at BI B1 `ff69acd9` 2026-07-13 — the user rejected the SEEN design, four days after it shipped |
| F12 | **RATIFIED** (2 corrections) | guard posture re-proven; corrected: (a) `styles.css:61` is the delete button, not the chip (chip stadium comes from `Chip` via `TagsInputItem.vue:23`); (b) "PNG predates the repoint" tightened by `git show 490cc46e` — the radius was in the v7.0.0 cut itself, so only a stale-served demo or a paint-only defect explains the PNG. Paint: LIVE-DEFER |
| F13 | **RATIFIED, gap escalated** | anchors verified (`:69,:109,:76,:117,:143`); the opus Δ-F13-1 (drag-affordance residue) was CRIT-confirmed disk-true yet is ABSENT from JUDGE.md J1-J11 and APPLYLOG — unruled, unapplied, unowned at HEAD (see FLIPS) |
| F14 | **RATIFIED** | landing-grid anchors (`SectionLanding.vue:33`, `CatalogLanding.vue:32`), 100-route AMEND, G-RSP gates all verified; execution LIVE-DEFER by construction |
| F15 | **RATIFIED** (+enrichment) | `rounded-md` at `infinite-scroll.vue:74` verified RED at HEAD; raw-literal sites (`SortableList.vue:144` 999px, `segmented.css:169,:306`) verified; union adds: the element is a raw `<button>`, so the fix should dogfood `<Button>`, killing the F14-class defect with the radius defect |
| F16 | **owner RATIFIED; isolation + post-mortem CORRECTED** | opus "the demo renders three of them [variants]" is false — all three demo bodies import GlassTimeline only; `timeline/index.ts` exports ONLY GlassTimeline+types; Continuous/Rail/Markers/Scrubber/Segmented are unexported AND unconsumed (one test aside) = in-repo dead code; README claims they are exported (doc-truth violation, unnamed at HEAD); post-mortem corrects from "five variants grew to serve one external app" to "four of five serve nobody" |
| F17 | **OVERTURNED** | opus's mechanism ("no own border-radius, rides field-control pill"), disk-state ("role-correct on disk"), and screenshot read ("roughly-equal radius") are all false — see FLIPS F-1 |
| F18 | **RATIFIED** (precision note) | ASK §A1 + census verified verbatim; the "metric-pill deleted"/"metric-badge folded" wobble replaced with the verified facts (granular subpaths + MetricBadge symbol removed at 490cc46e; ./metric + ./instrument-chassis exports live) |
| F19 | **RATIFIED** (2 corrections) | all three complaint axes disk-true (`rounded-lg` + wash 1px + uniform border); corrected: rounded-lg resolves to 10px here (`--radius-lg: var(--radius)` = 0.625rem), not 8px; the W4 born-RED "alert is neither" should read "wrong rung", since a wash backdrop exists. Severity in paint: LIVE-DEFER |
| F20 | **RATIFIED, status advanced** | opus's analysis (toast already on glass-reveal transient; born-RED framing stale) re-proven at `Toast.vue:80` + `transitions.css:87-112` + BI B7 `ef3ea646`; its Δ-F20-1 has since been ADOPTED (J4) and APPLIED to BAND-FEEDBACK-MOTION W1 — coverage advances PARTIAL→EXACT; the transient-vs-overlay "exactly like dialog" judgment is LIVE-DEFER (OPEN-FM-1) |

Tally: 8 ratified (5 with corrections/enrichments), 1 materially corrected (F16), 1 overturned
(F17). Coverage retotal: EXACT 9 / PARTIAL 1 (F13) / MISSING 0.

## FLIPS — findings that contradict a JUDGE.md ruling or band premise (lead re-judges)

**FLIP F-1 — F17 vs RULING 8 (+ its derivatives).** RULING 8 (`ADJUDICATION-1.md` item 8), the
BAND-MATERIAL lead amendment (`BAND-MATERIAL.md:698-700` "disk shows both sites already
role-correct"), crosswalk reconciliation item 5 (`crosswalk:227-229`), `PLAN.md:187`
("F12/F17 convert to REGRESSION-GUARDS — already role-correct on disk"), and the W1 §D text
(`BAND-MATERIAL.md:117-119` "the search component has no own border-radius (rides field-control
pill)") all rest on a false disk claim for F17. Verified at HEAD:
- `SearchBar.vue:4` / `FuzzySearch.vue:126-127` ride `.input-bar`
  (`styles/utilities/components.css:12-16`, radius `--radius-2xl`) — NOT `field-control`.
- `searchVariants.ts:8-11`: `floating`/`bare` = `"border-none bg-transparent p-0 rounded-none"`;
  the demo (`search.vue:504`) uses `variant="floating"`; no `.fuzzy-search--floating` chrome rule
  exists anywhere in `src/`.
- `rounded-none` (@layer utilities) beats `.input-bar`'s radius (@layer components)
  unconditionally — the square second input is statically derivable from HEAD source; the PNG and
  `VISUAL-GESTALT.md:12` ("one sharp") agree.
Consequence: F17's posture reverts REGRESSION-GUARD → born-RED FIX (owner unchanged — W1's own
"if the live-π reproduces" conditional resolves TRUE; final paint confirmation LIVE-DEFER). J5 is
untouched for F45/F09/F12 but its "F09/F12/F17 conversion class" naming should drop F17. F12's
half of RULING 8 stands.

**FLIP F-2 — Δ-F13-1 absent from the judgment (JUDGE.md completeness).** JUDGE.md rules J1-J11 on
"every surviving delta" and closes "zero floating notes remain" — but the dossier proposed TWO
deltas and only Δ-F20-1 was ruled (J4). Δ-F13-1 (the sortable-list drag-affordance residue —
grab/lift/drop expressiveness under the breath-of-life edict), confirmed disk-true by CRIT1-A:130
and CRIT2-A:92, appears nowhere in J1-J11, APPLYLOG, or BAND-STORY. The residue is unowned at
HEAD; the ledger's silent-drop prohibition applies. Recommended homes for the ruling:
`BJ.W-IDLE-BREATH`'s interaction half (A01 engagement contract) or an explicit clause in
`BJ.W-RESPONSIVE-AUDIT`'s fix mandate.

No finding contradicts J1-J4, J6-J11, C-A..C-G, T1-T2, or any band charter premise beyond the two
above. The F11 tension is with BI B1's Law-2 card+gap treatment (pre-BJ), which the BJ formation
already overrules in the user's favor (G-CFG-3) — recorded as provenance, not a flip.

## Corrections applied in the union (non-flip class)

1. F12 — chip-radius line misattribution (`:61` is the delete button); cut-level provenance added.
2. F16 — isolation + post-mortem rewritten on the dead-export census; README doc-truth violation
   named (BAND-DOC-TRUTH interest).
3. F19 — `rounded-lg` = 10px (theme-resolved), not 8px; "neither" phrasing sharpened.
4. F20 — coverage advanced to EXACT (J4 applied); dossier text was stale against the amended band.
5. F15 — dogfood-`<Button>` sharpening added to the fix shape.
6. Header — stale `git describe` (v6.0.0-62) replaced with the union-time HEAD.

## LIVE-DEFER register (claims only live paint can settle — no browser owned by this seat)

- F12: whether `/data/tags-input` paints the 1rem container radius (OPEN-1a live-π).
- F17: final paint confirmation of the statically-derived square floating field.
- F19: how severe 10px radius + 1px wash blur read on the page.
- F20: whether the transient bloom satisfies "exactly like our refined dialog" (OPEN-FM-1).
- F16: the "buggy" interaction verdicts at `/data/timeline` (design-loop RED baseline).
- F14: the whole responsive-audit execution (Playwright, browser-seat serialized).
