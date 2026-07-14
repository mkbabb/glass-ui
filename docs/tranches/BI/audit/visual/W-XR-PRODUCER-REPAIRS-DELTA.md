# W-XR-PRODUCER-REPAIRS — DELTA + π bookings

Band B8-PRUNES (repairs). The three cross-repo producer reds (PKT-1 · T-45 · P1-R3)
plus the X4–X8 dist/build-correctness family. This record captures what LANDED, the
T-45 architectural blocker, and the paint (#92) obligations booked.

## Landed (device-free, gated by `proof:xr-producer-repairs`)

| id | defect | fix | clause |
|----|--------|-----|--------|
| **X1 / PKT-1** | dist `components.css` re-declared a bare `:root{--default-transition-duration:150ms}` over a consumer `@theme` alias (the T-58 clock confound) | the R3 base block in `vite.utility-emit.ts` routes the default THROUGH the house token — `var(--duration-fast, 150ms)` | X1 (fresh dist) |
| **X3 / P1-R3** | the spectrum-thumb `:focus-visible` applied `--focus-ring-shadow` but never suppressed the UA outline — Chromium painted `outline: auto 1px` OVER the ring | `outline: none` paired WITH the ring in the SAME rule (`ui/slider/Slider.vue`) | X3 |
| **X4 / A6+L16** | risk: a vendor-prefix collapse dropping the unprefixed `backdrop-filter: none` reset | the ONE prefix policy recorded (`vite.style-fold.ts`): unpprefixed authored, `-webkit-` companion injected, the lexical minifier is prefix-blind → both forms ship | X4 (fresh dist) |
| **X6 / P5 rider** | the WatercolorDot ghost ring is a dashed border that degrades to 3–4 sparse ticks at swatch sizes | the ghost swatch is a `container-type: inline-size` container; `@container (max-width: 48px)` firms `.watercolor-ghost-stroke` to `border-style: solid` | X6 |
| **X7 / P10·T-40** | display/heading/title font-weights were hardcoded literals — no bold-letterform knob | tokenised: `--type-weight-display/-heading/-title` (`typography/scale.css`); `text-display*`/`text-heading`/`text-title` read them (`typography/semantic.css`) | X7 |

Each clause is born-RED at HEAD (X1/X3/X6/X7) or a policy-lock guard (X4), GREEN by the
work, with an in-gate self-test bite. `vue-tsc --noEmit` clean; slider + slider-detect
unit suites GREEN (10/10); `vite build` GREEN (the fresh dist X1/X4 read).

## X2 / T-45 — DEFERRED (architectural blocker, NOT faked green)

**Defect.** Every glass-ladder rung pairing a `backdrop-filter` blur with a radius clip
over a bright ground smears the field ≈ one blur radius inside the edge (Chromium's
backdrop sample edge-CLAMPS at the box; a clamped bright edge pulls light inward).

**Specced cure.** The oversampled-pseudo idiom AT THE LADDER: the blur-bearing pseudo
inset NEGATIVELY by `calc(-2 * <rung blur radius>)` under the host's radius clip, so the
sample reaches real field 2R past each visible edge, "zero visual delta at rest beyond
the bleed's removal."

**Why it is blocked at the rung (verified on-disk, read-only):**

1. **The pseudo budget is full.** `material.css` §449–458 documents it as a design law:
   every base rung ALREADY claims `::before` (the moving specular catch-light) AND
   `::after` (the grain overlay) — the repo's OWN `.glass-clear` scrim routes around
   this by using a second `background` LAYER, not a pseudo. An oversampled blur needs a
   THIRD independently-blended layer the rung (host + 2 pseudos) cannot hold; the three
   layers (blur normal-blend, specular `plus-lighter`, grain `overlay`) each require a
   distinct blend-with-backdrop, so none can fold onto another or onto the host.

2. **The host-blur contract is load-bearing.** `.btn-glass` (surfaces.css:276),
   `.glass-deep` (deep.css), and the dock re-declare `backdrop-filter` DIRECTLY ON THE
   HOST, assuming the rung's tint plate is also on the host. Moving blur+tint to a pseudo
   DOUBLE-blurs those consumers (host 8px + pseudo blur) and orphans the tint — a
   library-wide break on every host-blur re-pointing surface.

3. **The rim and the oversampled blur interfere at the edge.** Keeping `backdrop-filter`
   on the host is what keeps the rim (`--glass-material-rim`, the 0.75px edge catch-light)
   CRISP — the rim is host-painting IN FRONT of the host's own backdrop-filter. Any
   neg-z blur pseudo puts the rim BEHIND it, so the blur samples-and-smears the rim
   (rim blurring) OR the translucent tint reads over it (rim dimming). Either exceeds the
   ≤ 1/255 rim-delta oracle, so the specced "zero visual delta beyond the bleed" is
   UNREACHABLE by any in-rung pseudo — a wrapper element (which the rung utility cannot
   inject per-consumer, and which the spec forbids: "never per-consumer") is required.

An in-rung refactor was implemented and REVERTED once (2) was concretely confirmed via
`.btn-glass` — the reverts are clean (no diff on ladder/grain/a11y).

**Disposition.** Routed to a follow-up wave that must adopt a wrapper-element
architecture for the oversample (the only form that preserves the host-blur contract and
the rim), with in-paint verification. NOT greened by weakening `proof:xr-producer-repairs`.

## X5 / CC-1 — DEFERRED (live-paint engine bug)

The registered-`@property`-inside-`color-mix()` collapse on bare `.glass-wash`: the rung
`color-mix` percentage nests `--glass-level` (a registered `<number>` @property) inside a
`calc()`, the same class the repo already routes around for hsl-alpha (`material.css`).
The collapse is context-specific (the ladder ships and paints at `--glass-level: 1`),
so the "two bare sites" need live-paint reproduction to fix the recipe form without
regressing the whole opacity ladder. Booked to #92, not a source clause.

## π / DELTA obligations booked to the #92 paint batch

- **T-45 (X2)** — the bisection rim-delta probe per rung: rim delta ≤ 1/255 at dpr-2,
  both schemes, Chrome + Safari (the value.js oracle transposed) — the ADJUDICATION for
  any future wrapper-architecture cure; and the born-RED bleed census leg
  (value.js O-16-R1) + `picker.p1` probe flip on THEIR side reference this wave.
- **P1-R3 (X3)** — focus the spectrum thumb under keyboard: house ring present, NO UA
  auto outline (`getComputedStyle` readback), both engines. (Source-locked here; the
  live readback confirms the paint.)
- **X5 (CC-1)** — the bare `.glass-wash` paints its plate (not transparent) at the two
  sighted sites, both engines.

## X8 — registrar (orchestrator-owned)

The pencil-boil optionalPeer floor widen to `^0.8.1` (clean single range) is a
`package.json` change, filed as a registrar row in the wave report — NOT edited here.
