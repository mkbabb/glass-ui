# REFABLE RU-05—GF-DOCK union (the dock greenfield redo)

- **Unit**: RU-05 GF-DOCK—the dock greenfield (`greenfields/GF-DOCK-PASS3.md`) re-designed anew
  on the corrected canon and unioned in place.
- **Original edict (F47)**: the dock UX must increase dramatically—a scrolling dock must subtly
  display that more options exist left/right; clicking an occluded or edge item auto-scrolls the
  dock; greenfield again with better UX and affordances in mind.
- **modelId**: `claude-fable-5` (read verbatim from this seat's system context: "The exact model
  ID is claude-fable-5"). Prior trio (GF-DOCK-PASS1/CRIT2/PASS3 + round-3-harden/gf-dock.md +
  round-4-crit2/crit2-dock.md): `claude-opus-4-8` via the settings-level subagent override,
  under Fable declarations.
- **DesignSync**: REACHABLE this seat (schema loaded via ToolSearch); not exercised—the unit's
  deliverables are canon documents, no design-system push warranted. The frontend-design skill
  fallback was not needed.
- **Step-1 ANEW**: the dock design derived from the corrected canon alone—IOS27-CODEX (18 laws;
  14-18 the new physics/choreography layer), MARKS-A/B (RU-15 union), `sr-0620-1847` /
  `sr-0710-1626` / `sr-0620-1848`, SUFFUSION-MATRIX (G row, §3.3 ride map, §4 modal register),
  SUPERFLUITY, FEEDBACK-LEDGER F47/F27/F06/F04, REFABLE-RU-16 R7, and the dock sources at HEAD—
  fixed at `scratchpad/ru05-anew-dock.md` before any GF doc was opened.
- **Step-2 boundary moment**: the opus trio opened 2026-07-18, this session, only after the ANEW
  file was written; every design decision then adjudicated assume-wrong against the anew design.
- **Step-3 UNION**: `GF-DOCK-PASS3.md` rewritten IN PLACE. The section skeleton (§4.1/§5/§6/§12,
  waves W1/W2/W3/W6) is preserved so ASSEMBLY-CROSSWALK anchors keep resolving; contents are the
  union—Fable design authoritative on conflict, opus decisions kept only where RATIFIED.
- Files touched: `greenfields/GF-DOCK-PASS3.md` (rewritten) + this ledger. Nothing else.

## Per-decision verdict table

| # | Opus PASS3 decision | Verdict | Class | Detail |
|---|---|---|---|---|
| D1 | α/β/γ collapse into ONE dock model | RATIFIED | RATIFIED | the single-model structure survives; its layers re-grounded (union §2) |
| D2 | detent CONTRACT (no rest mid-cell without evidence; detented advance, not feelable free scroll) | RATIFIED | RATIFIED | contract kept, mechanism-agnostic; "no interior scroll (F27)" reconciled to the cross axis + rest-anywhere scroll—the user's own F47 words demand a scrolling layout axis |
| D3 | mechanism = CSS `scroll-snap-type: inline mandatory` + `scrollend` | **STRUCK** | OPUS-WRONG | law 14 rules it verbatim: CSS scroll-snap cannot express duration-stable snapping; nor velocity-projected detents (τ≈0.2s), per-detent damping, or the asymmetric rubber band. Replaced by the law-14/15 detent engine on a hybrid substrate (union §4.2); the driven-strip proxy only if the F2 NATIVE-SCROLL probe fails |
| D4 | occlusion = census-anchored FADE mask + `--dock-peek` sliver "entirely under the fade"; trailing fraction "arbitrary but deliberately faded" | **STRUCK** | OPUS-WRONG | fade-to-transparent destroys the evidence it claims to give (an erased item signals nothing); replaced by the evidence stack—cut-band peek detents + edge CONDENSATION (whole glyph, scaled, view-timeline position-mapped) + lip-shadow overhang + velocity-keyed edge glint (law 3). "Never mid-glyph" honored by condensation, not by hiding the clip under a fade (union §4.3) |
| D5 | `useDockItemCensus` primitive (cell-rect RO, zero scroll listener) | RATIFIED | RATIFIED | re-purposed: feeds the detent table + seat targets, no longer a fade mask |
| D6 | reveal-on-intent (tap/focus occluded → spring recenter; keepOpen through glide) | RATIFIED+AMEND | RATIFIED | amendment: commit is INSTANT (law 16b—swap ≤83ms, never gated on travel); the seat is concurrent choreography on the duration-stable snap; law-15 regime split governs (union §4.4) |
| D7 | keyboard model: `role="toolbar"` + roving + `RouterLink`/`aria-current`, focus⟂occlusion, no wrap, Home/End; BJ-ASK truth-up | RATIFIED | RATIFIED | the ADJUDICATION-1 ruling-4 charge, kept whole (union §3); seat physics under it updated per D3 |
| D8 | selection = `--stretch` pill reuse as terminal; "eyeglass lens" deferred to an ASK framed on the Q051 `filter:url()` Safari risk | **STRUCK** | OPUS-WRONG | the lens is now LAW (16b/c) with measured constants—birth ≤83ms at the touched item, protrusion 6-10px LOAD-BEARING (outside the plate clip), magnification 1.06-1.12x, velocity elongation ~1.9 slots, endcap squash 8-12% with inward parallax, commit-on-release—and the web recipe needs NO url-filter (duplicated-row scale + mask-edge distortion + backdrop-filter tint, `sr-0710-1626 P1`). Lens = terminal selection layer; indicator reuse = seed (union §7.1). Exactly RU-16 R7's ordered fix ("the ASK cites measured physics") |
| D9 | law-6 tie-in quoted as "sliding selection pill … metaball necks" (`IOS27-CODEX.md:37`) | **STRUCK** | OPUS-WRONG | stale codex: the Find My "sliding pill" read was falsified (RU-15 W18)—those frames were scrubs over an unchanged sheet; law 6 is now "continuous deformation" grounded on the tap-lens transit + the collapse three-body overlap; the drag lens is law 16c (union §7) |
| D10 | F06 cure = "origin-anchored from the tapped cell's frame (codex law 5)" | **STRUCK** | OPUS-WRONG | corrected law 5: in-app navigation is NOT a scaling card—push/pop is slide + ~1/3 parallax under a dim veil (~350ms), secondary chrome after settle (`sr-0620-1847 §4`). The crossfade no-blank-frame floor is RATIFIED as invariant; the scaling register belongs to app zooms / dock-to-card (IOS27-MICRO's) (union §6) |
| D11 | evidence corrections: F05 split (dock-shift half only), F04 confirmed first-hand, law-4 cure-list fix, chevron removal on F47-redundancy+KISS grounds | RATIFIED | RATIFIED | kept whole; law-4 citation re-anchored to `IOS27-CODEX.md:14` (union §5) |
| D12 | F27 block-axis kill (`overflow-y: clip`, drop `block:'nearest'`, cross-arrows no-op) | RATIFIED | RATIFIED | structural; matches the ANEW; vertical docks get the contract rotated (union §4.1) |
| D13 | "+N" cluster tray = OPTIONAL collapsed-posture affordance, ASK | RATIFIED | RATIFIED | canon sanctions cluster chips (MARKS-B §6); parsimony holds it optional—the peek+condensation stack is the one expanded affordance (union §4.4, §12.3) |
| D14 | fission fork parked both ways (Q051 r1) | RATIFIED+NARROWED | RATIFIED | kept parked (r1 carries into BJ). NARROWED: the attested collapse goo is plain layered overlap of separate backdrop bodies (`sr-0620-1847` f109)—no `filter:url()`—so the posture morph does NOT wait on the ruling; only beyond-iOS inter-body goo stays gated (union §7.2, §12) |
| D15 | (absent) posture-morph choreography | **ADDED** | FABLE-NEW | law 16a: collapse ~330ms with visible multi-body overlap double-darkening; displacement-gated (~100-150px, velocity-agnostic); intent-gated re-expand ~250ms (rebound-immune); selection-change reset; header dissolve leads ~250ms (union §7.2 + W8) |
| D16 | (absent) the physics constants + motion regimes | **ADDED** | FABLE-NEW | law 14 presets named in-spec: τ≈130ms duration-stable snap with creep tail; rubber gain ≈0.023, 90/380ms compression/release asymmetry, never crossing rest; release ζ≈0.75-0.85 single ≤9% overshoot; per-detent damping; velocity projection. Law 15: tracked/ballistic/fire-and-forget split at the finger; never tween a tracked drag (union §4.2) |
| D17 | (absent) cut-band detent grammar | **ADDED** | FABLE-NEW | end detents flush; interior detents bias-tuned so both edges land partials in a 25-60% cut band—the peek guaranteed by construction, replacing the "arbitrary but faded" concession (union §4.3) |
| D18 | (absent) lens-at-edge strip advance | **ADDED** | FABLE-NEW | dragging the lens into the outer ~1-item zone advances the strip beneath it (world-scrolls-under-a-quasi-fixed-lens, the Safari-adopted model, SUFFUSION §1.4-G); declared divergence—no overflowing iOS dock exists (union §7.1) |
| D19 | (absent) the IOS27-MICRO await ledger | **ADDED** | FABLE-NEW | eight named decisions explicitly deferred to the live sibling: F2 native-scroll expressibility (the mechanism decider), F4 scalar roster, F1 `--scrub-t` spine, F5 lens-body/medium, the dock-to-card mechanism duel, the taffy pre-commit zone, N3 momentum tick, the preset reconciliation vs `DOCK_SPRING` (union §9)—hooks named, nothing duplicated |
| D20 | stale line refs (`IOS27-CODEX.md:37/:34/:41/:22-28`) + spring register | MECHANICAL | — | re-anchored per RU-16's map (law 4→`:14`, 5→`:18`, 6→`:19`, 7→`:20`, 14-18→`:33-37`); `DOCK_SPRING` verified on disk 0.30/ζ0.82 (`springPresets.ts:95-97`)—the {0.68,0.64} auto-memory figure is STALE (truth-up proposed below) |

**Counts: OPUS-WRONG struck and replaced 5 (D3, D4, D8, D9, D10) · FABLE-NEW 5 (D15-D19) ·
RATIFIED 9 (D1, D2, D5, D6, D7, D11-D14, of which D6 amended and D14 narrowed) · mechanical 1
(D20).** Convergence restated 62% → 58% (the opus figure was inflated by a canon-falsified
mechanism; the union's surface is larger and honestly sibling-dependent).

## ROUTING (PROPOSE only—nothing outside the PASS3 + this ledger touched)

| # | Site | What changes |
|---|------|--------------|
| R1 | `BJ/PLAN.md:232-236` (the GF-DOCK roster line) | "the snap-detented filmstrip" → "the detented strip + lens + posture machine"; 9 waves → 10 (W0-W9: W1 EVIDENCE-STACK, W2 DETENT-ENGINE, W4 SELECTION-LENS, W6 slide+parallax grammar, W8 POSTURE-CHOREOGRAPHY new, W9 CONSUMER+FINAL); 62% → 58%; "Carries 4 ASK rows" stands (ASK 2 re-worded per R3) |
| R2 | `BJ/PLAN.md:211` (`BJ.W-A11Y-RULINGS`) | NO CHANGE—the toolbar/roving ruling is ratified verbatim; the family-J comment truth-up stands |
| R3 | `BJ/formation/ASSEMBLY-CROSSWALK.md:177` (GF-DOCK §12.2 ASK row) | the ASK is re-grounded: no longer "eyeglass pill vs `--stretch` reuse, intersects Q051 `filter:url()` risk"—the law-16c lens is design-mandated with measured physics and a no-url-filter recipe; the ASK narrows to rollout surface (strip-first vs strip+rail) + whether the full SVG-displacement refraction variant is wanted anywhere |
| R4 | `ASSEMBLY-CROSSWALK.md:178` (§12.3 row) + `:26-28/:49/:69` | line hygiene only—"the filmstrip" → "the strip"; all §/W anchors (§4.1, §5, §6, W1/W2/W3/W6) still resolve by construction; F47's landing row now reads W1 (evidence stack) + W3 (tap-to-reach) unchanged in slot |
| R5 | `IOS27-MICRO/CHARTER.md:67-68` (standing context) | "the BJ GF-DOCK-PASS3 design (the snap-detented filmstrip; this campaign's findings feed its pass-4)" → the union model name; the feed is now reciprocal and explicit—GF-DOCK §9 defers eight named decisions to this campaign's convergence (F2/F4/F5/F1, mechanism duel, taffy zone, N3, preset reconciliation) |
| R6 | `BJ/formation/round-3-harden/gf-dock.md` + `round-4-crit2/crit2-dock.md` | opus-begat digests carrying the superseded design (52%/42% rounds, the scroll-snap mechanism, the fade grammar, the pill scoping)—propose SUPERSEDED stamps pointing at the union PASS3 + this ledger (the RU-16 R15 pattern); any doc citing them re-cites the union |
| R7 | `GF-DOCK-PASS1.md` + `GF-DOCK-CRIT2.md` (historical record) | untouched by fence; RU-16 R7's stale-citation notes apply (law-6 "sliding pill" quotes, `IOS27-CODEX.md:37` anchors); readers route to the union PASS3. CRIT2's spring-register correction (0.30/ζ0.82) is CONFIRMED on disk this seat |
| R8 | `BJ/waves/BAND-STORY.md:570` (GF-DOCK-PASS3 C5 routing) | the C5 anchor survives in substance—the F05 split (dock-shift half → G-NO-LAYOUT-SHIFT §6; aurora half → story surface) is ratified; the citation should name union §5/§6 rather than the superseded §1 adjudication table |
| R9 | `BJ/waves/BAND-FEEDBACK-MOTION.md` + the spring-preset home (`springPresets.ts`) | when the F4/F1 facility lands, the law-14 SNAP/RUBBER/RELEASE registers join the preset table; `DOCK_SPRING` 0.30/ζ0.82 remains the posture-morph clock—two clocks, one owner, per union §9's reconciliation row |
| R10 | auto-memory (`MEMORY.md` BG line "DOCK_SPRING={0.68,0.64} via springPreset(\"dock\")") | truth-up proposed: on-disk preset is response 0.30 / ζ 0.82 (`springPresets.ts:95-97`), confirmed independently by the opus CRIT2 and by this seat |

## Files

- rewritten in place: `docs/tranches/BJ/formation/greenfields/GF-DOCK-PASS3.md`
- this ledger: `docs/tranches/BJ/formation/refable/REFABLE-RU-05.md`
- boundary artifact (scratchpad, session-local): `ru05-anew-dock.md`
