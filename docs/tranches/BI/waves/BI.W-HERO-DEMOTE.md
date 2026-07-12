# BI.W-HERO-DEMOTE — /compositions/hero is the section landing, not a standalone category item

Band B8 (prunes + consumer-truth). PRUNE / IA. Demo-only.

## §Mandate

Discharges:
- **UF-K2** — "What even is /compositions/hero — this likely needs to be removed or made not a full category
  item, a sub-page instead." (PRUNE).

## §Design

Decided (UF-K2, FAM-10 "hero re-authored as bento index already"). `compositions/hero` is registered as a
standalone story (`manifest.ts:1257-1272`, `heroScale:"mega"`, `displayTitle:"Real scenes"`) that duplicates
the compositions SECTION LANDING (the `/compositions` D1 bento hero the chassis renders per category). The user's
"not a full category item, a sub-page instead" resolves cleanly: the hero content IS the compositions section
landing (the bento index over the real scenes) — so the STANDALONE `compositions/hero` story item is removed and
its content folds into the section-landing descriptor (the `CATEGORY_HERO`/`sectionLanding` chassis already owns
the D1 bento). No standalone `/compositions/hero` route; `/compositions` renders the bento landing directly.

Clean break: the standalone story registration is deleted; the audacious-type showcase (the `mega` rung + the ℱ
ornament) rides the section-landing hero, not a peer story.

## §Work

- `demo/stories/manifest.ts:1257-1272` — remove the standalone `s("compositions", "hero", …)` story row; migrate
  its `displayTitle`/`heroScale:"mega"`/`#title-ornament` intent onto the `compositions` `sectionLanding`
  descriptor (the D1 bento the `/compositions` route resolves).
- `demo/stories/compositions/hero.vue` — re-home as the section-landing body (if the landing chassis renders the
  bento from data, delete the SFC; if it needs the bespoke bento SFC, re-point the landing to it). No
  `/compositions/hero` deep-link survives as a distinct route (W-FOLDED-REDIRECTS resolves any bookmark to
  `/compositions`).
- Coordinate the `FOLDED_STORY_IDS`/route (`manifest.ts:357`) with W-FOLDED-REDIRECTS.

## §Acceptance

Gate: **`proof:demo`** (the compositions-census / hierarchy arm).
- **BORN-RED at HEAD**: `compositions/hero` is a standalone story peer to the section landing (the
  standalone-hero-vs-landing clause reds).
- HD1 — no standalone `compositions/hero` story row; the compositions section landing carries the bento hero.
- HD2 — the `mega`-rung audacious-type showcase rides the section landing (the content is preserved, the
  duplicate route is gone).
- Self-test bite: a re-added standalone `compositions/hero` peer to the landing reds HD1.

## §π/DELTA

`tests-visual/*` (fold into the D-STORY landing π): `/compositions` renders the bento section landing (the
real scenes as tiles) with the audacious-type hero — no separate `/compositions/hero` page. Chromium, BOTH
modes. LOCAL, rides the D-STORY reflect wave (no NEW spec — this is an IA move the landing π covers).

## §Obligations

- No cross-repo ask (demo-only IA). Coordinates with **W-AFFORDANCE-REDESIGN** (B6, the landing tiles) +
  **W-FOLDED-REDIRECTS** (the deep-link resolution) + **W-STRUCTURE-RESEQUENCE** (STRUCT-12 pruned-demo census).

## §Dispositions

- Terminalizes **UF-K2**: DEMOTED (the standalone story folds into the section landing; not a full category
  item). Liveness probe: a re-added standalone `compositions/hero` story REDs.
