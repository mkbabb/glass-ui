# AZ.W-REFLECT — the per-surface reflection audit: the tranche's completion bar

**Track:** Z (close-gating) · **Type:** reflection + redress loop · **Repo:** glass-ui (+ the shell/demo)
**Depends on:** every build batch (runs AFTER Batch 5, BEFORE W-CLOSE — the close cannot start until every surface holds a PASS reflection) · **USER EDICT (2026-06-11, verbatim):** "The tranche should only be marked complete when we have a full audit of each item in a reflection process, like our dock, blob, aurora, etc that proves this. Mid-tranche we should plan to deploy a triumvirate of research, plan, tranche write ad hoc, and redress until perfection."
**STATUS: SPEC**

## Goal criterion

Every named surface carries a REFLECTION RECORD at `docs/tranches/AZ/audit/reflect/<surface>.md`
with a PASS verdict — a live, evidence-backed proof (captures + π readbacks + the gate roster)
that the surface meets the user's standards IN TOTALITY: every R1–R5 audit item that touched it
closed, every original mandate honored, no regression against any prior decision. A surface that
fails reflection enters the TRIUMVIRATE REDRESS LOOP and re-reflects until it passes. The close
(W-CLOSE / `proof:az-final`) is GATED on the full PASS set.

## The surface roster (each gets its own reflection lane)

| surface | the reflection scope |
|---|---|
| dock | the taxonomy (one orientation axis), the rail (hairline in-dock + DockRail beyond), collapse/expand/morph on both orientations, the tap integrity (R5-3), the flicker kill, the contextual layers, the coarse register (R5-1/2), normalization, the iOS-glassy selected/hover/press register — live on the SHELL + the stories, both modes, fine + coarse pointer |
| blob | the page (watercolor fidelity, satellites metaballing), the studio (interaction, merge quality, satellite options, shadowing, configurator hierarchy), the uBackdrop conditional verdict (G-PERF/G-BROWSER), the cream-bead identity |
| aurora | the painterly bands (van-Gogh/oil/oil-pastel on the live GPU), the studio chrome on the library Configurator, the atoms door, the hero presets |
| constellation | warp/freeze/refit/drawOverlay, the slides consumer contract (the protected quintet), the W-CON-GEN generalization verdicts, the focal/recession registers |
| fourier-field | the comet register both modes, the intensity envelope, the demo staging |
| motion | the full curve canon (value.js + keyframes + steps), the spring playground on SPRING_PRESETS (no forks), the scroll/VT facilities, the ppmycota demo accent, the §6 easing doctrine cohesion across the demo |
| glass + registers | the glass-first default, the adaptive auto-darken (self-engage + observer) on ALL glass views, the veil surface, the de-red iOS register, the squircle family, legibility AA everywhere |
| shell + demo IA | the gear=PresetEditor flow, the ℱ identity, the contextual facets, the first-time-auditor noise bar (R4-2), the storybook hierarchy/suffusion (W-HIERARCHY/W-SUFFUSE outcomes) |
| cross-repo | the slides adopt+deploy state, the keyframes/fourier-analysis/bbnf consumer fixes, the protected contracts intact, the release coupling honored |

## The reflection protocol (per surface)

1. **RECAPITULATE** — every audit item (R1→R5) + every user decision + every wave that touched the
   surface, tabulated with its discharging evidence (the wave DELTA, the gate, the capture).
2. **RE-VERIFY LIVE** — walk the surface on :5199 (and the shell) with fresh eyes + fresh captures
   at ≥2 viewports × both modes; π readbacks where numeric (contrast, geometry, frame timing).
   A doc claim is never evidence — the capture is.
3. **THE PERFECTION QUESTION** — beyond item-closure: does the surface read as FINISHED to a
   first-time auditor (the R4-2 bar)? Name anything that would draw a "wtf" — that is a FAIL even
   if every ledger row is green.
4. **VERDICT** — PASS (the record + captures land, the row flips) or FAIL (the misses enumerated,
   severity-graded → the triumvirate).

## The TRIUMVIRATE REDRESS LOOP (mid-tranche, ad hoc, per the edict)

A FAIL deploys three roles in sequence, then redresses, then re-reflects — looping until PASS:

1. **RESEARCH** — an opus lane grounds the miss: root cause, prior art (the SOTA bar where
   aesthetic), the constraint map. No fixes.
2. **PLAN** — a wave spec authored AD HOC per TRANCHE-AND-WAVE-SPEC (§0 RE-GROUND, the defect
   table, the born-RED gate spec, the scope fence) — a real spec, not a patch note; it joins
   `waves/` + the PROGRESS board like any wave.
3. **REDRESS** — a build lane executes the ad-hoc spec under the full discipline (gates, captures,
   typecheck, the fleets).
4. **RE-REFLECT** — the surface's reflection re-runs from step 2 of the protocol. The loop has no
   iteration cap — "until perfection" is the bar; each pass records what changed.

## Completion criterion + the hard gate

All roster surfaces PASS; `proof:az-reflect` (new, release-tagged) asserts: a reflection record
exists per roster surface, each carries the verdict PASS, each cites ≥4 fresh captures (the
content-hash freshness model — captured AT the record's surface-hash), and zero FAIL records are
open. `proof:az-final` gains clause (10): `proof:az-reflect` GREEN. Born-RED: the gate REDs today
(zero records exist) and on any synthetic FAIL record.

## Scope fence

Reflection lanes are AUDIT lanes — read + capture + verdict only; ALL fixes route through the
triumvirate (research → plan → redress), never inline. The protected consumer contracts hold
through every redress.
