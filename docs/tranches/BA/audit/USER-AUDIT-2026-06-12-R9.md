# USER-AUDIT 2026-06-12 — ROUND 9 (BINDING — the slides gray-glass read; amends the BA tranche pre-greenlight)

The user, reviewing the slides repo (which exact-pins glass-ui 3.13.0 since the M-close
adopt, commit a171266): **"Why are our glass items in the slides repo so gray?"** —
with a capture of the til-briefing presenter card rendering as a flat gray slab over
the cream constellation page (`ground/R9-01-slides-presenter-gray.png`). Plus the fold
question ("have our slides items — deck, etc — been folded into this tranche") and the
dev-server ask for a live audit pass.

## R9-1 — the gray glass (PROVEN live, the same session)

A three-lane verification workflow (live probe + BA coverage + slides-fold audit)
closed the read within the hour:

**Verdict: PROVEN — the gray is 100% glass-ui's AZ.W-ADAPTIVE-AUTO Arm-1 unconditional
self-engage; zero slides-local compounding.** The presenter card is `presenter
glass-resting`; the `:where(.glass-floating, .glass-overlay, .glass-card,
.glass-resting, .glass-quiet, .glass-wash)` block (`ladder.css:185-196`) re-points
`--glass-tint-source` → the dark warm-ink and `--glass-tint-strength` → the 20% AA
floor (`--glass-tint-strength-aa`, recalibrated 18→20% at AZ) on EVERY content tier,
mode- and backdrop-agnostically, and force-lifts `--muted-foreground` →
`--foreground`. Over the slides' calm cream page the 20% dark-ink oklab mix composites
the warm translucent card to `oklab(0.785 ≈0 ≈0 / 0.79)` — the flat desaturated gray
slab. The intervention probe is the binding proof:

| `--glass-tint-strength` | composited plate | read |
|---|---|---|
| 20% (the shipped default) | `oklab(0.785 / 0.792)` | the flat gray slab (`R9-slides-gray-before.png`) |
| 8% | `oklab(0.897 / 0.761)` | subtle warm cream, faint edge — viable middle (`R9-slides-gray-strength8.png`) |
| 0% | `oklab(0.977 / 0.74)` | the pre-3.13.0 warm translucent cream restored (`R9-slides-gray-strength0.png`) |

The `--muted-foreground` lift is also live on the card: the "Senior Director, TIL"
caption computes full ink (`rgb(0,0,0)` via the `contrast-color()` refinement /
`var(--foreground)` fallback), not the muted L40 register. The only slides-local
`.presenter` rule is the NCSU-red pseudo-element accent — it touches no plate paint.

**Why this was a blind spot:** the fleet's waves-vs-reality lane RATIFIED the light
self-engage as the design (WVR-7: "the light-backdrop self-engage IS the design; the
DARK register is the flat-read root") and dark-register DARK-3 scoped the self-engage
critique to its dark-inertness — so no BA wave owned the over-LIGHT gray-slab side
effect. The AZ recalibration optimized the silhouette-over-synthetic-white worst case
(ΔL ≈ 0.40) at the cost of the calm-light-page gestalt, and `proof:adaptive-glass` +
`proof:adaptive-glass-live` machine-lock the CURRENT shape — so the fix is a
gate-REBASELINE, not a quiet token edit.

**Routing: FOLDED into `BA.W-DARK-MATERIAL` as scope 7** (the same `ladder.css`
self-engage block + `glass.css` tint knob the wave already owns exclusively in
Batch 1 — before any downstream capture). The recommended direction: conditionalize
the FULL-strength darken on the declared/sampled bright signal with the unconditional
floor dropped to a sub-perceptual silhouette tint (~6–10%); fallbacks specced. The
calm-light-page π (a `.glass-card` over a plain light page reads as glass, not a flat
gray) joins the gate; the busy-bright AA π is re-ratified, not dropped.

## R9-2 — the slides-fold accounting (answered; one deliberate gap)

R5-10 (menu-row + menu-section) is FOLDED (`BA.W-MENU-GLASS`); R5-4 already landed at
AZ; R5-9 (page-turn) + the `/deck` subpath (useDeck/DeckPager) + the
directional-view-transition driver stay EXTERNAL-GATED on the un-MET ≥2-consumer
trigger, re-stamped at `BA.W-CLOSE`; the slides adopt/deploy is booked-and-handed-off;
the three M-close interim arms (dock-scale, kVis, click-integrity) verified RETIRED
with library root-fixes consumed — nothing re-opens. Two spec amendments from the
audit: the `deck-subpath` ↔ `directional-view-transition` BOOKs cross-linked as the
two halves of the same slides page-transition future, and the CONFIRMED slides break
pinned for the adopt book — slides `DeckGate.vue:70` binds
`variant="primary-audacious"`, which rides the `btn-audacious` recipe W-GLASS-CAL
retires (hinge H2).

## Dev servers (live for the user's audit)

glass-ui demo → `http://localhost:5210` · slides → `http://localhost:5273`.
