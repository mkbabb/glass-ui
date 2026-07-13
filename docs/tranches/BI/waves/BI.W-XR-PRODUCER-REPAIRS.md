# BI.W-XR-PRODUCER-REPAIRS — the three cross-repo producer reds (PKT-1 · T-45 · P1-R3)

Band B8-PRUNES (repairs). MINTED 2026-07-12 at the execution-time inbound-marking pass — three
value.js BLOCKING-a-red producer defects verified UNOWNED across the 91-wave corpus (grep-verified:
zero waves mention `--default-transition-duration`, the oversampled-pseudo idiom, or the slider
UA-outline pairing). Sources of record: `VALUEJS-T-COMMUNIQUE-2026-07-11.md` §1.2/§1.5/§1.8 +
`valuejs-inbox-2026-07-12-u-formation.md` §2b PKT-1/T-45/P1-R3.

## §Mandate

- **PKT-1 — the 150ms `--default-transition-duration` clobber** (value.js P2's P0; the T-58 KNOWN
  CONFOUND — "any felt-duration retune before PKT-1 lands tunes against a corrupted clock"): the
  emitted `dist/styles/components.css` re-declares `:root { --default-transition-duration: 150ms }`
  over a consumer's own `@theme` alias. NOTE the B7 coupling: TEMPO/REGISTER-TABLE retunes are
  clock-corrupted in consumers until this lands — sequence this wave's PKT-1 arm BEFORE or WITH B7's
  consumer-facing tempo work (B7's in-repo work is unaffected; the clobber is dist-emission-side).
- **T-45 — the glass-ladder backdrop-filter edge-sampling bleed** (population-wide; the owner keeps
  re-sighting the family): every rung pairing backdrop blur with a radius clip over a bright ground
  smears the field ≈ one blur radius inside the edge. The value.js demo interim covers ONE pane-card
  recipe; the LADDER cure is ours. (T-53 is a DISTINCT demo root, cured demo-side — do NOT
  double-count.)
- **P1-R3 — the spectrum-slider thumb UA-outline double-paint** (A-class, keyboard-visible):
  `ui/slider/Slider.vue` `[data-variant="spectrum"] .slider-thumb:focus-visible` applies the house
  ring but never suppresses the UA outline — Chromium paints `outline: rgb(0,95,204) auto 1px` OVER
  the accent-aware ring.

## §Design

- **PKT-1**: alias the Tailwind emission onto the house duration tokens at the emission root
  (`vite.style-assets.ts` P9 `emitComponentUtilities` — the emitted `:root` block must express
  `--default-transition-duration` THROUGH the house token (`var(--duration-fast, 150ms)`-shaped
  aliasing or omit the re-declare entirely so a consumer `@theme` alias wins). The dist NEVER
  re-declares the default over a consumer alias. Verify on a FRESH build (the G-CUR-1 discipline).
- **T-45**: the oversampled-pseudo idiom AT THE LADDER — the blur-bearing pseudo carries
  `inset: calc(-2 * <rung blur radius>)` under the host's radius clip so edge sampling reads real
  field, not the clamped edge. Applied at the ladder recipe root (ONE edit reaching every rung —
  the substitution-over-redeclaration discipline), never per-consumer. Zero visual delta at rest
  beyond the bleed's removal.
- **P1-R3**: pair `outline: none` (or `outline: transparent`) WITH the house ring at the SAME
  `:focus-visible` selector — the focus-ring discipline (`--focus-ring-shadow` stays the ONE ring;
  never a bare suppression without the ring).

## §Work

- `vite.style-assets.ts` (the P9 emission) — the PKT-1 alias/omit; rebuild + grep the fresh
  `dist/styles/components.css`.
- `src/styles/glass/material.css` / the ladder recipe root — the T-45 oversampled pseudo (respect
  the STYLE-REDRAIN partial layout: ladder.css + ladder-undershadow.css).
- `src/components/ui/slider/Slider.vue` — the P1-R3 pairing.

## §Acceptance

Gate: **`proof:xr-producer-repairs`** (NEW, `local`+`ci`, born-RED at HEAD): X1 the fresh-built
`dist/styles/components.css` carries NO bare `--default-transition-duration: 150ms` `:root`
re-declare (born-RED: it does at HEAD); X2 the ladder's blur-bearing pseudo carries the
`calc(-2 *` oversample inset (born-RED: absent); X3 the spectrum-thumb `:focus-visible` rule pairs
UA-outline suppression with `var(--focus-ring-shadow)` in the SAME rule (born-RED: unpaired);
+ a self-test bite per clause (a re-introduced bare re-declare / a removed inset / an unpaired
suppression each REDs).

## §π/DELTA

- T-45: the bisection probe class per rung — rim delta ≤ 1/255 at dpr-2, both schemes, Chrome +
  Safari (the value.js oracle transposed).
- P1-R3: focus the spectrum thumb under keyboard — house ring present, NO UA auto outline
  (getComputedStyle readback), both engines.
- DELTA: `docs/tranches/BI/audit/visual/W-XR-PRODUCER-REPAIRS-DELTA.md`.

## §Obligations

- The value.js O-16-R1 born-RED census leg + picker.p1 probe flip green on THEIR side at the cut —
  the roster rows reference this wave.
- A fresh `npm run build` before any dist claim (G-CUR-1).

## §Dispositions

- PKT-1: **BUILD** (emission fix). T-45: **BUILD** (ladder idiom). P1-R3: **BUILD** (one-rule fix).
- PKT-2 (the spring-clock hole: a ~0.3s-settle preset or bless snappy): **ROUTED to B7
  REGISTER-TABLE** as an acceptance input (the register table is exactly where the press↔snappy
  clock gap gets decided) — noted there by the marking pass, not re-booked here.
- PKT-3 (compositor collapse/expand recipe): **already-B7** (ENTER-EXIT-LANDING/ACCORDION-PRESS
  family); PKT-4/L9 (skeleton shimmer seams): **DECLINED-TERMINAL** — the shipped compositor-only
  shimmer stands; a re-open needs a new mechanism (recorded).
