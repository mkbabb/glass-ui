# GLASSUI-S-ASKS — ADDENDUM (2026-07-05)

**From**: value.js, tranche S (mid-round-2). **Companion to**: `VALUEJS-S-ASKS-2026-07-05.md`
(your `01c32375`, asks L1..L18) + the blob-genesis relay (your `3188171`).
**Producer HEAD at dispatch**: `a5844ea0` (tranche/BG).
**Contents**: two forensics findings (owner-reported visual defects, root-caused today —
full evidence in our `docs/tranches/S/audit/card-lighting-forensics-2026-07-05.md`), one
owner amplification of an existing ask, one net-new ask. One dispatch, four items.

---

## A1 — the card field-floor orphan fallback needs a dark arm (→ your F2.R1 row)

The BD.W-CARD-FIELD-FLOOR fallback (`src/styles/cards.css:96-115`) paints two amber radials
(`oklch(0.96 .04 78/.5)` + `oklch(0.9 .075 72/.5)`, keyed 80%/16% + 78%/22%) with
`background-blend-mode: screen` (`:59-60`) on EVERY glass card whenever no
`[data-paper-field]` ancestor exists — and it ships **no dark arm**, so under the dark scheme
the dark-arm `brightness(1.14/1.18)` (`tokens/dark-arm.css:295,297`) amplifies it into a hot
in-card light source. Our owner reported it verbatim ("some sort of light source within the
card?"). Measured consumer damage: hot-zone label contrast 2.61:1 (cures to 4.23:1 with the
layer off). We are mounting `data-paper-field` on our aurora plane (our W6-8 — the intended
integration), so this ask is defense-in-depth: **dark-arm or damp the orphan fallback** so a
consumer without a paper field never gets a screen-blended amber lamp in dark mode. Suggested
home: your PENDING `F2.R1 W-DARK-READABILITY-REPAIR`.

## A2 — the muted-ink alpha rung fails contrast both ways (→ F2.R1)

The alpha/muted label rung measures **1.42:1 / 1.50:1** (light/dark) over the glass plate —
fails in BOTH schemes independently of A1 (it fails even with the field-floor layer off).
Same F2.R1 home; the rung needs a floor, not a consumer override (we will not shim ink).

## A3 — L2 AMPLIFICATION (owner ruling, verbatim authority)

> "We want the aurora to be strong in effect, and have a greater variance in the derived C
> and H values (subtle, though, but with more noticeable)."

The L2 variance atoms (`hueSpread` / chroma-variance, plus the lightness-scheme door) now
carry an owner-amplified bar: the field must be able to read as STRONG presence with visibly
greater chroma + hue variance off the seed, while staying subtle in register. Whatever atom
shape you choose (L2's naming authority stays yours), please size the ranges for that bar —
the current derive ceilings can't express it.

## A4 — NEW ask **L19**: a pointer door on the aurora engine

> "And with better background interatcability via the mouse and so forth." (owner, verbatim)

We want the backdrop to respond to the pointer (parallax / attraction / local bloom — the
choreography is our design call, consumer-side). The engine today exposes no pointer input.
Ask: a pointer door on the aurora atoms — normalized pointer position (+ velocity if cheap)
as an input the field can weight, PRM-honest, zero cost when unset. One pointer grammar will
span backdrop + hero blob on our side, so shape-compatibility with the goo-blob pointer
input (the L5 co-rebuild) is worth a thought while both are open. Standing hedge applies:
an in-window miss is our producer-gap row, re-verified at the W8 adopt — we will not fork
the engine.

---

*Non-asks, recorded*: your liquid-weight/depth-tier/signal-truth commits of today and
`--glass-ambient-*` were investigated for the owner-reported artifacts and are **exonerated**
(our forensics doc, §Exonerations — the wash predates them, arriving with `cf149cff`). The
0-byte `dist/styles/utilities/animate.css` is also benign (comment-only source strips to 0).
