# BI.W-SHADOW-GRAMMAR — the offset-stamp shadow requires a card silhouette (Law 4)

Band B1 (geometry grammar). Discharges Law 4 of `proof:geometry-grammar` — the last of the four laws; its
close flips the gate fully GREEN.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A8** — "Artifacts on the bottom left corners of these buttons?" (ss-08; a hard dark shadow slab peeks at
  the bottom-left corner of each pill).
- **UF-A9** — "There are artifacts in these button corners in many uis" (ss-26; the dark CRESCENT past a pill's
  left end-cap — the hard 0-blur offset stamp behind a CAPSULE). **Census owed:** every `--shadow-cartoon-*`/
  offset-stamp consumer × its border-radius class.
- **FAM-4** "Cartoon-cast rest stamp" · **GEO-7** (shadow-geometry; the 3-layer hard down-left stamp reads as a
  bottom-left slab on punch buttons / select / active tiles).

## §Design

Decided mechanism — D-GLASS PASS-1 §4 Law 4 (couples to Law 2). The offset-stamp is a SHADOW-GRAMMAR mismatch,
not a layer-radius one: the `.cartoon-cast` inert child carries the 3-plane hard 0-blur offset stamp with
`border-radius: inherit` = 9999px on pill CTAs — on a stadium the hard directional stamp pokes out only along
the bottom-left arc = the lopsided crescent.

- **LAW:** the offset-stamp family (`--shadow-cartoon-*`) requires a CARD silhouette. A CAPSULE/PILL takes a soft
  radius-following drop (`--shadow-md`/`-lg`) or its glass rim + under-shadow. Gate the cast mount on card-radius
  surfaces; re-point the pill-host cast to a soft directional drop.
- **The hero pill's "punch" re-lands** on press-squish + specular + a soft directional drop (PASS-1 Open Gap 8) —
  the `.btn-punch` register (`primary-audacious`/`gold-audacious`) keeps its weight WITHOUT the hard stamp
  crescent. The BD.W-CARTOON-PUNCH weight must SURVIVE (the user-A/B, §Obligations).
- **UF-A8 press-window-gating** everywhere the stamp legitimately reads on a card silhouette: a hard-offset stamp
  at REST is the artifact — the stamp engages only in the press window (the interactive-cast register), never a
  static rest slab on a loud CTA.
- **UF-A9 census:** every `--shadow-cartoon-*` consumer × its radius class is enrolled as a gate fact (the offset
  stamp is legal ONLY where the host is a card-radius surface); a stamp on a pill/capsule host REDs.

## §Work

- `src/components/ui/button/Button.vue:40-50,104-110` — the `.btn-punch` cast: the hard `--shadow-cartoon-*`
  stamp is gated OFF the pill silhouette (the punch re-lands on the soft radius-following drop + the press-squish
  + specular; the cast `.cartoon-cast` mount drops on `.btn-punch` pill hosts).
- `src/styles/cards.css:381-411` — the `.cartoon-cast` rule: add the pill/capsule guard (a soft
  `--shadow-md`/`-lg` radius-following drop under a pill host; the hard offset stamp only under a card-radius
  ancestor). The `--btn-punch .cartoon-cast` soft-drop re-point (the gate's Law-4 GREEN condition — a
  `box-shadow: var(--shadow-lg)` NOT `--shadow-cartoon` on the punch pill cast).
- `src/styles/select.css:134` + the configurator active tile — audit against the card-radius rule (these are
  card-radius surfaces → the stamp is legal; recorded on the census allowlist).
- `scripts/proof-geometry-grammar.mjs` (LANDED by W-RADIUS-GRAMMAR) — the Law-4 arm is already present
  (`btn-punch` mounts the cast + a soft-drop re-point must exist). EXTEND it with the **UF-A9 census** (every
  `--shadow-cartoon-*` consumer selector × its resolved radius class; a stamp on a stadium-token host REDs) +
  the enumerated allowlist (card-radius consumers) + a self-test bite (a planted hard stamp on a pill flags).
- `docs/tranches/BI/audit/W-SHADOW-GRAMMAR-census.md` — the UF-A9 census table (consumer × radius class × verdict).

## §Acceptance

Gate: **`proof:geometry-grammar`** Law-4 clause (its close flips the gate RED(1)→GREEN(0), fully operative).
Born-RED at HEAD: `.btn-punch` mounts `.cartoon-cast` with NO soft radius-following drop re-point → the hard
`--shadow-cartoon` offset stamp pokes off the stadium (the UF-A9 crescent).
- Law 4: the pill/punch host carries a soft-drop re-point (born-RED at HEAD; GREEN here).
- UF-A9 census: no `--shadow-cartoon-*` on a stadium-token host off the card-radius allowlist (born-RED: Button
  punch pill; GREEN here).
- Self-test: a planted hard stamp on a pill flags; a `.btn-punch .cartoon-cast { box-shadow: var(--shadow-lg) }`
  soft-drop passes; a card-radius consumer keeps the stamp (no false-red).

## §π/DELTA

`tests-visual/shadow-grammar.spec.ts` — the UF-A8/A9 readback:
- the `primary-audacious`/`gold-audacious` pill over a busy backdrop: NO dark crescent past the left end-cap at
  rest (pixel scan of the bottom-left arc — the artifact is ABSENT); the punch weight reads (the soft drop +
  press-squish A/B).
- a card-radius Card `surface="cartoon"`: the hard offset stamp tucks under the corner radius (unchanged — the
  stamp is legal there).
- Chromium + real WebKit, BOTH modes. LOCAL-only.

## §Obligations

- **USER JUDGMENT** (PASS-1 Open Gap 8): the hero-weight A/B — the pill CTA with the soft drop + squish +
  specular vs the current cartoon-cast. The punch MUST survive in both modes or Law 4 needs a pill-specific
  weight recipe. The paired capture goes to the user (it reverses a BD register).
- Device run: real-WebKit crescent-absence scan rides the band's whole-surface gestalt device run.

## §Dispositions

- **src:button-press-row** (CHRONIC §3, MET) — the `press` SPRING_PRESETS row ships; the stale BOOKED verb at
  `Button.vue:97` is struck as part of this wave's Button edit (comment-scrub rider). Terminal.
- Liveness probe: a `--shadow-cartoon-*` stamp on any stadium-token host off the census allowlist REDs.
