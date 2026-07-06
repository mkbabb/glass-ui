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

## A5 — NEW ask **L20**: a `/goo-blob/config` subpath (the JS eager-budget blocker)

(Appended at the S.W3 close, same day.) Our §6.2 JS eager gate (≤280 KiB gzip) is
unreachable in-bounds: importing the blob's config atoms (`BLOB_CONFIG_KEY` / defaults) pulls
the whole WebGL engine into the eager graph via the `goo-blob` barrel — 66 KiB over, with the
engine itself execution-deferred behind idle but not BYTE-deferred. Ask: a config-only
subpath (`@mkbabb/goo-blob/config` or equivalent) exporting the atoms/keys/defaults with zero
engine imports, so consumers can wire config eagerly and load the engine lazily. Our census +
re-baseline record: value.js `docs/tranches/S/audit/w3-chunk-census.md` §5/§9/§10. Standing
hedge: recorded producer-gap row, re-verified at the W8 adopt.

## A6 — dist minification drops the unprefixed `backdrop-filter: none` (Chromium-visible)

(Appended with the alpha-checker ruling, same day.) Your `Slider.vue` source declares BOTH
legs of the spectrum-range override (`backdrop-filter: none` + `-webkit-backdrop-filter:
none`); the dist keeps ONLY the `-webkit-` leg — and Chromium does not implement that alias
(computed reads empty). Result: the `.glass-liquid-fill` register's `blur(8px) saturate(1.4)`
backdrop blur stays LIVE over every spectrum track in Chrome, silently liquefying consumer
ramps (found while landing an owner-ruled alpha transparency checker in value.js). We carry a
marker-commented byte-level restatement of your own source rule (exact selector
`.glass-slider[data-variant="spectrum"] .slider-range`) that retires the day the dist keeps
the unprefixed leg — likely a cssnano/lightningcss vendor-prefix-collapse setting in the dist
pipeline. Companion ask for the same surface: a `--slider-track-checker` seam under
`--slider-track-bg` (the transparency ground's proper long-term home). Also for the record:
`dist/styles/utilities/animate.css` was STILL 0 bytes at your 21:08 rebuild and raced a
consumer vite dev server into 500s mid-rebuild — benign content-wise (comment-only source)
but the empty emit + mid-write window is worth a look.
the unprefixed leg — likely a cssnano/lightningcss vendor-prefix-collapse setting in the
dist pipeline. Companion ask for the same surface: a `--slider-track-checker` seam under
`--slider-track-bg` (the transparency ground's proper long-term home — the L6/W8 `/slider`
consume letter carries both).

## A7 — the aurora arm-gap replay defect (every consumer cold load renders a stale config)

(Appended 2026-07-06.) `useAurora.ts:262` — `createAurora(canvas, getCfg(), …)` snapshots the
config at MOUNT; the config deep-watch (`:228`) wires only inside `armRuntime()` (post
idle-arm) with **no immediate replay**. Any config hydration landing in the construction→arm
gap is silently dropped — and URL/seed hydration ALWAYS lands there, so every cold load
renders the consumer's pre-hydration DEFAULT config until the first in-session change (on
value.js: the default hot-pink ramp for ANY URL seed — user-visible on color.babb.dev; our
owner caught it as "a flat pink field for a green seed"). The css-substrate arm is unaffected
(it consumes the live palette); only the armed-GPU arm has the gap. Demo-side retrigger =
synthetic atoms mutation = contrivance, rejected — the fix is one honest replay:
`inst.update(getCfg())` after `inst.arm()`, or `immediate: true` on the post-arm watch. Our
record: value.js `docs/tranches/S/audit/w6-producer-gap-rows.md §GAP-ARM` + the full
forensics in `audit/OWNER-RULING-2026-07-05-variance-webbing.md §2.1` (evidence: `--saved-bg`
settles the derived seed while the armed canvas samples flat `rgb(240,150,160)` across
reloads; an in-session change flips it instantly — the post-arm watch is healthy). Standing
hedge: re-verified at the S.W8 adopt.
