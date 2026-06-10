# USER-AUDIT 2026-06-10 — ROUND 3 (15:27–15:38, BINDING)

The user's third live audit of the day, delivered mid-W-PUB1 (the 3.10.1 cut). Every item
is BINDING and grounds the AZ tranche. Screenshots: `15.27.47` read (the dock-layers blob
rail — banked below); `15.30.45`/`15.31.47`/`15.32.50`/`15.33.34`/`15.37.33`/`15.38.36`
TCC-blocked (temp-dir/EPERM) — the prose descriptions are the record.

Companion directive (verbatim themes): 32-agent deep audit of the original plan + waves +
all changes; recapitulate ALL prompts/plans/precepts hitherto and verify addressed; fold
chronic-deferred + deferred items into this tranche; NO quick solutions, NO workarounds —
idiomatic gestalt approaches; architectural transpositions for elegance, simplicity,
performance; NO legacy code; **tranche development ONLY (no implementation this phase)**;
fable orchestrates/designs/synthesizes, opus/sonnet carry the fanout. Then: a
frontend-design plugin audit of `ui/`; design-hierarchy structuring; design-language
suffusion (glass, grid, math, large audacious typography, colorful audacious pops per the
icons, animation targets); glass-ui idioms to adopt/refine/abstract; gaps; prune set.

## R3 defect ledger

| id | surface | the user's words (condensed) | banked evidence |
|---|---|---|---|
| R3-1 | dock layers | "Dock layers is still broken — we should have a hairline rail therein." The switcher rail paints as a heavy dark blob column, icons illegible (screenshot 15.27.47: three faint glyphs stacked in a dark rounded rect fused to the pill's left edge). | screenshot read + banked |
| R3-2 | dock taxonomy | "Likely should just remove this facility and properly have a dock that's horizontal and vertical and disambiguate the names." The model: a VERTICAL dock + a HORIZONTAL dock, BOTH with a robust layering system (contextual item switching), PLUS a hairline-RAIL facility — an extended dividing line that goes BEYOND the dock, with a left/right-most icon controlling the dock's context. Both dock styles properly morph, shrink, animate. | prose (redesign mandate) |
| R3-3 | dock morph | "Edge case bug with dock morphing on hover that causes flashing and flickering when at the edge — resolved totally." | prose |
| R3-4 | demo shell gear | Gear icon → display the glass-ui demo CONFIGURATOR; REMOVE the composables view; REMOVE the floating-configurator option; FOLD the dark-mode toggle into the configurator/options view. (15.30.45) | prose |
| R3-5 | dock normalization | "ALL docks should have persistent controls for nav, home, etc — this needs to be normalized." (15.31.47) | prose |
| R3-6 | hover/click register | "I don't quite like this hovered/click state. I don't like the red. Tune this to be more iOS inspired and glassy — at the root, within our icons and buttons." (The warm-red selected/hover register on dock controls → an iOS-glassy register; a ROOT token change, not per-site.) | prose |
| R3-7 | adaptive legibility | "Dock items on light backgrounds need a dynamic facility like on iOS 27 to darken dynamically so we can actually see these elements — audit ALL glass views for readability." (15.32.50 — the W55 `--glass-backdrop` bucket exists but is not WIRED/automatic on the dock-over-light case.) | prose |
| R3-8 | configurator | "Configurator here is better, but needs refinement everywhere." (15.33.34) | prose |
| R3-9 | /substrates/blob | "Still quite awful: the main blobs at the top are pixelated and low res with no satellite blobs morphing/metaballing in and out." | prose |
| R3-10 | blob studio | "Good, but needs refinement: better interaction, better metaballing, better satellite options, better shadowing; configurator needs refinement and design-hierarchy structuring." | prose |
| R3-11 | /motion | "Should have the FULL keyframes.js suite: easing functions, spring timing, scroll facilities — take the keyframes design language, configurator and animation demo, and port over items to match our glass items. A robust motion demo. The curve-set area expanded to ALL of our curves plus all keyframes.js timing curves, leveraging the keyframes.js ppmycota purple." | prose |
| R3-12 | foundations logo | The key "f" logo should be the FOUNDATIONS entry (not a duplicated compass), with a dividing line to demarcate it, slightly larger. (15.37.33) | prose |
| R3-13 | the morph showcase | A button demonstrating a beautiful complex morph: the VERTICAL dock transitions/morphs — with the liquid-glass primitives, totally smooth, keyframes-driven, amorphous metaball-teardrop-like — to a HORIZONTAL dock; fully bidirectional, deterministic. | prose |
| R3-14 | contextual layers | The dock displays the layering system with different layers shown based on the PAGE's context; re-design the dock systems from first principles for how they're displayed, to showcase the facilities — augment/refine/hone any facility that's lacking. | prose |
| R3-15 | fourier-F | A rail for the fourier F; the fourier F is NOT centered in its hover/shadow area. (15.38.36) | prose |

## Constraints carried into AZ

- The slides repo `docs/tranches/M/M.md` is mid-edit by another session — AZ touches NO slides M docs.
- The L tranche's W-ADOPT (exact-pin → **3.10.1**, the true close cut; the registry 3.10.0 is
  deprecated-stale) + W-DEPLOY remain owed and FOLD into the AZ execution plan as the cross-repo arm.
- The AY booked items fold in: W-LIQUID (the Siri liquid-glass facility — now the R3-13 morph's
  substrate), W-BLOB-GLASS (conditional uBackdrop refraction, G-PERF/G-BROWSER gates), W-AUR-T5
  (anisotropic Kuwahara), the central-CSS carve (dock-controls.css ratchet row), the 2 pre-existing
  dock infra live-gate stale routes (dock-orchestrator-single `/navigation/dock-layers` →
  `/dock/layers`; blob-tempo-suppression/blob-interaction-prm shader-split re-points), the live-gate
  `:5173` default → `:5199` convention sweep, and the W-DELTA0 own-wave-id re-captures
  (W-DOCK1/W-CON1/W-DOCK2 freshness NOTEs).

## Post-banking census facts (orchestrator, for the named waves)

- **status-dot dropped to 1 non-self consumer** (slides `SlideXray.vue` + its own demo story; the
  prior second consumer left a sibling tree) — `proof:component-orphan` flags it locally. The
  keep-evidenced/retire verdict belongs to AZ.W-PRUNE2.
- `proof:component-orphan` gained the sibling-absence skip-by-policy (a clean CI runner has no
  constellation; the census binds locally only) — the recurring monorepo-layout class.
