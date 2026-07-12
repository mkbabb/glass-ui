# DESIGN PASS-4B AGGLOMERATION + THE FABLE RULINGS (orchestrator, 2026-07-12)

Convergence: **motion 91 · viz 90 · factor 88 · story 87 · dock 86 · glass 80 · pager 80** (raw:
`PASS-4B-RAW.md`). The residual open gaps are predominantly DESIGN DECISIONS the evidence now
supports; ruled here by the orchestrator (Fable) with rationale — the user may veto any at the
return. Two BUILD residuals go to pass-5.

## The rulings

1. **DOCK G4-COMPOSITION — fisheye and scroll are exclusive MODES, never composed.** Fisheye engages
   iff the row FITS (N ≤ fit); a scrollable row runs native scroll + FadingScroll + scrollIntoView
   with fisheye OFF. Rationale: the codebase's own documented cross-axis clip trap makes the
   composition structurally hostile; macOS magnifies because its dock never scrolls; KISS.
2. **DOCK ESCAPE-PLACEMENT — the JS one-shot ships as THE positioning path.** Single transform-safe
   mechanism, byte-identical on both engines. Native CSS anchor positioning is BANKED (re-trigger:
   WebKit resolves anchor() correctly through transformed chains). No dual path; the SAF-1 landmine
   (native anchor mis-resolution under ancestor transforms) is fenced by construction. The new spine
   constraint threads in: the dock centers transform-free (`inset-inline:0; margin-inline:auto;
   width:max-content`).
3. **DOCK G11 — factor as a thin `<DockCrossfade :active>` core; `useSelectionGroup` COMPOSES it
   where a rail exists.** The controlled-no-rail 5-pane case (speedtest) consumes DockCrossfade
   directly — a no-selection face-swap does not route through a selection engine. The proven 6/6
   mechanism carries over unchanged; only the factoring splits.
4. **railProjection RETIRES** (per the critic: an anchored flex strip needs no φ-tier ring math) —
   the pass-1 "compress→scroll yield" dissolves with it.
5. **FACTOR Button.destructive — destructive IS a tone.** It migrates to the tone axis
   (`tone="destructive"`); `variant` is reserved for STYLE members (solid/outline/ghost/glass/link).
   The variant-residual gate's own born-RED flag was correct; the Kronecker discipline applies to the
   library's oldest component too.
6. **FACTOR IconChip — the rename to IconPop is REJECTED.** IconChip (non-interactive color-event
   glyph plate) and Chip (interactive toggle) are already distinct names over distinct mechanisms;
   renaming churns consumers for zero mechanism gain. Recorded as resolved-by-distinctness.
7. **FACTOR role=card — `role="group"` BY DECISION** (+ aria-label passthrough): a hover-revealed,
   non-modal, never-focus-stealing supplementary surface is not a dialog; group is the honest
   semantic. The as-child override lands it; the rationale is now contract, not convenience.
8. **STORY StoryScope named-v-model — explicit manifest mapping** (`models: { searchTerm: 'query' }`);
   no convention magic. Counts toward the schema, not the escape hatch.
9. **STORY prefix field — survives iff the full-census finds a second consumer**; else it drops and
   badge uses the slot escape. The G1 bar binds as the ≥70% MEAN across the measured page set with
   no page below 60% (per-page minima on a 9-field schema over-fit the bar to one page's shape).
10. **GLASS Law-3 — the band-on-overlay form is MANDATORY** (the mask-composite ring lives on a
    dedicated overlay element/::before, never the host — the BorderProgress precedent and the gate's
    own clause). The pass-4b direct-host application is the regression the critic caught; pass-5
    re-forms and re-verifies the whole-surface gestalt with pixel sampling, not computed-style greps.
11. **GLASS Law-1 — the concentric relay WIRES to the three real nesting sites** (configurator
    sections, vertical tabs track, gear sheet) as wave landing obligations; the reader-required gate
    clause stands. Not demoted — UF-A1/A2 is an explicit user mandate.
12. **MOTION --stage-t — adopt the critic-corrected scoping** (the sheet-root-scoped write with the
    register reading locally; no documentElement writes). Pass-5 verifies alongside the glass re-form.
13. **PAGER — ONE arm ships at 13px; the composed moving capture DECIDES it on this recorded rule:**
    the goo-filter arm (worm-scoped σ≈4) is the default IFF the moving series reads liquid at 60fps
    within the G3 Safari raster budget; else the clip-throat arm ships and the edict is satisfied by
    the DYNAMIC two-edge stretch (in motion, elongate-travel-reform is the liquid read; the static
    waist proportion is secondary). No dual path at one scale either way; the losing arm is banked
    with the capture as its record.

## Pass-5 (the last build items; everything else → formation with wave obligations)

- **pager-capture**: the composed moving worm, BOTH arms, 1-hop + 4-hop + retarget, both engines —
  with a HARDENED output contract (evidence to disk, compact return; the schema cap killed two
  attempts on oversized returns). Decides ruling 13.
- **glass-law3-reform**: the band-on-overlay re-form + a pixel-sampled whole-surface gestalt
  readback (cards keep interiors; rims follow radii) + the Law-1 wiring sketch at the 3 sites.

## Standing for formation

Dock's critic pre-wrote the obligation ledger (visible-Safari device runs, M1 application map,
the ~10-site SpringProgress reconcile, the G8 retune with the user A/B, the compound-integration
build, the G10 fold coordination, the gate cull). Motion's G4 parity fix is LANDED-and-green in its
worktree (428.59ms → 0.36ms) with the surgical 2-file diff ready to be a wave's payload. All seven
problems are formation-ready pending pass-5's two items and the user-judgment batch.

---

## PASS-5 CLOSE (orchestrator, 2026-07-12)

Both build items CONVERGED (critics: pager 97, glass 95):

- **RULING 13 RESOLVED — the goo worm ships at 13px.** The composed moving capture inverted the
  pass-3 static read: goo = a fat fusing mercury pill (the Google-worm read, critic-confirmed from
  the montages); clip = a rigid barbell that turns BOWTIE at 4-hop. 67.2fps on genuine WebKit
  (0 drops), raster 0.375ms (~100× under the G3 budget, CHEAPER than clip). Clip banks as the
  `@supports`-not degrade floor — no dual path. Residuals: the user's reserved aesthetic veto
  (shallow-waist-is-the-worm) + the Metal device raster trace (wave obligations).
- **RULINGS 10–12 CLOSED.** Law-3: the mask-composite ring is a dedicated overlay child
  (`.metal-*-ring`) — the host carries no mask, so interior blanking is impossible by construction;
  interiors 4-5/5 legible across all four engine×mode cells; proof:geometry-grammar GREEN with the
  6/6 born-RED self-test. Law-1: the external-reader clause satisfied honestly (segmented-tabs.css
  reads the relay; the dead-relay bite REDs). --stage-t: sheet-root-scoped, zero documentElement
  writes, the drag paints, the recalc storm dead. Residuals → wave obligations (deep SFC relay
  composition, border→ring doc reconcile, visible-Safari re-shoot, scaffold quarantine).

## FINAL LOOP STATE (all seven problems formation-ready)

pager 97 · glass 95 · motion 91 · viz 90 · factor 88 · story 87 · dock 86 — every remaining open
item is either a RULED decision (rulings 1–13), a wave obligation (device runs, landings,
RED→GREEN differentials), or a user-judgment item (the capture batch). The formation audit
(round 4) adversarially verifies this classification over the drafted plan.
