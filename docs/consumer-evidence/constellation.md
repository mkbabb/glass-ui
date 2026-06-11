# Constellation

## Artefact path

`src/components/custom/constellation/` (the published subpath `@mkbabb/glass-ui/constellation`).

## Verdict

`keep-current` — **booked with the W-ADOPT slides adoption as the in-flight ≥2-consumer trigger**
(AZ.W-PRUNE2 E4-9). `Constellation` is the per-instance declarative SFC over the `useCanvas2D`
lifecycle substrate: a node lattice with drift, click-warp, the deterministic `?freeze` capture
hook, and an injectable `drawOverlay` skin (the W-CON3 seam slides re-authors its anomaly/resolved
marks onto). It clears the census today on internal demo consumers; the real external binary
consumer lands when slides adopts.

## Consumer proof (re-runnable; re-grounded AZ.W-PRUNE2 2026-06-11)

**Internal consumers — 2 (non-story demo compositions, NOT its own `<constellation>.vue` route).**

```bash
grep -rln 'Constellation' demo/   # → demo/stories/StoryHero.vue (the full-bleed hero lattice),
#                                       demo/eggs/NotFound.vue (the 404 supernova-warp lattice)
```

`StoryHero.vue` mounts `<Constellation>` as the live HERO substrate; `NotFound.vue` reuses the
supernova warp for the 404 egg. Both are real compositions (not the showcase story), so the census
counts them — `proof:component-orphan` reports `constellation` at 3 consumers (these two + a string
hit on the slides bespoke `constellation.ts`), `ok: true`.

**External consumers — 0 at HEAD (the slides adoption is in-flight, NOT landed).** Slides STILL
ships its 547-line BESPOKE `src/decks/til-briefing/constellation.ts` imperative DOM-scan engine
(driven from `deck.ts`, two `data-constellation` markups in `SlideIntro.vue`/`SlideCloser.vue`); it
has NOT re-pointed onto `@mkbabb/glass-ui/constellation`:

```bash
grep -rln 'glass-ui/constellation' ~/Programming/slides/src   # → NONE yet (bespoke engine still live)
```

## The named ≥2-consumer TRIGGER (in-flight)

**AZ.W-ADOPT** is the slides constellation RE-ARCHITECTURE: it deletes the bespoke
`constellation.ts` god-module and re-points BOTH surviving deck canvases (the SlideIntro cover
anomaly + the SlideCloser resolved bookend) onto `@mkbabb/glass-ui/constellation`. When W-ADOPT
lands, slides becomes the binding external binary consumer (×2 markup sites) and `constellation`
clears the ≥2-binary bar on real external adoption — update this doc with the slides call-sites at
that cut. The lib `/constellation` seam (the `drawOverlay` hook, the `?freeze` capture) was built
for exactly this adoption.

## Re-audit proof

This document satisfies `proof:component-orphan` `keep-current` for `Constellation` while the
internal demo compositions stay AND the W-ADOPT trigger is open. Re-audit at the W-ADOPT cut: if
slides has adopted, record the external consumer (the escape is no longer load-bearing); if W-ADOPT
slipped, the internal-demo count still holds the census (the booking stands on the demo
compositions, with W-ADOPT as the path to a real external KEEP).

## Cross-references

- `docs/tranches/AZ/waves/AZ.W-ADOPT.md` (the slides constellation re-architecture — the trigger wave).
- `demo/stories/substrates/constellation.vue` (the showcase story — the own-route, NOT a counted consumer).
- `src/composables/glass/index.ts` (`useCanvas2D` — the lifecycle substrate Constellation composes).
