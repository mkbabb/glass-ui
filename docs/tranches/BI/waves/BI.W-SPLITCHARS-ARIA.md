# BI.W-SPLITCHARS-ARIA — SplitChars aria-label on a role-less span (ARIA-in-HTML)

Band B8 (prunes + consumer-truth / a11y). Born-RED at HEAD.

## §Mandate

Discharges:
- **A11Y-3** [P2] (FAM-15) — SplitChars mints an `aria-label` on a role-less generic element (ARIA-in-HTML
  violation): a bare `<span aria-label>` with no role is not a name-bearing element, so the label is
  invalid-per-spec and AT support is undefined.

## §Design

Decided mechanism (ROUND-1 FAM-15, source-verified — a decidable a11y fix, no design loop). `SplitChars.vue:118`
renders `<Primitive :as="props.as" :aria-label="props.text">` with `props.as` defaulting to a generic element,
and every glyph child is `aria-hidden` (the `:8` docstring names the intent: "AT hears 'Fourier'"). The intent
is correct; the WRAPPER just needs a role so the `aria-label` is spec-valid. The wrapper carries `role="img"`
(the accessible-name-bearing role for a graphic-of-text whose visual children are decorative) — the exact
StatusDot precedent (`role="img"` when an `aria-label` is bound; role-free when decorative). The label +
`aria-hidden` glyphs then compose ONE accessible name, spec-valid.

## §Work

- `src/components/custom/split-chars/SplitChars.vue:112-119` — the wrapper `<Primitive>` carries `role="img"`
  WHEN an accessible name is present (the `aria-label`/`props.text` case); when the consumer overrides `as` to a
  natively-labelable element the role is not force-added (the StatusDot conditional-role idiom); the
  `aria-hidden` glyph children are unchanged.

## §Acceptance

Gate: **`proof:a11y`** (the split-chars arm — device-free source arm + a live π axe assert).
- **BORN-RED at HEAD**: `SplitChars.vue` binds `aria-label` on a role-less generic element (the ARIA-in-HTML
  clause reds).
- SC1 — the SplitChars wrapper carries a name-bearing role (`role="img"`) whenever `aria-label` is present.
- SC2 (π) — axe `aria-prohibited-attr` / ARIA-in-HTML = 0 violations on a SplitChars-bearing route.
- Self-test bite: a role-less element with a bound `aria-label` reds SC1.

## §π/DELTA

`tests-visual/a11y-splitchars.spec.ts` (NEW, LOCAL-only, rides W-REFLECT):
- run axe on a SplitChars-bearing route: ZERO ARIA-in-HTML / `aria-prohibited-attr` violations; the accessible
  name resolves to the full text (`props.text`), the glyph children stay hidden. BOTH modes, Chromium + real
  WebKit.

## §Obligations

- No cross-repo ask (internal SFC repair; the `<SplitChars text>` prop surface is unchanged).

## §Dispositions

- Terminalizes **A11Y-3** (FAM-15): BUILT (`role="img"` on the labeled wrapper). Liveness probe: a role-less
  element carrying a bound `aria-label` REDs.
