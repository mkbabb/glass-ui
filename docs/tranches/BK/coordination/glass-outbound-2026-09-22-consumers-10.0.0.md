# 10.0.0—three published names leave `./color` and `./fourier-field`

**From**: glass-ui, BK (the register wave, Lane X) · **To**: slides (the feedback-coder deck)
and atlas, each at its next `@mkbabb/glass-ui` bump
**Date**: 2026-09-22
**Path of record**: `docs/tranches/BK/coordination/glass-outbound-2026-09-22-consumers-10.0.0.md`
**Authority**: the register-wave rulings at
`docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §1 rows 10-2 and 10-3, on the
grounds of the O-20 ledger (`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`
§CUT-3, §CUT-4/5). The lane's record is
`docs/tranches/BK/execution/2026-09-22-register-wave/X/RECORD.md`.
**Datum**: repo HEAD `695d4925` plus this lane's edits · your files read-only at slides
`b538506` (pin `3.13.0`) and atlas `1e2b911` (pin `6.0.0`) · published 9.0.0 for what ships
today.

---

## §0 · The cut

The next glass-ui release is **10.0.0**, a breaking cut. Three names leave the published
surface in it:

- `ColorResolver` (type) and `defaultBlobColorResolver` (const) are deleted from
  `@mkbabb/glass-ui/color`. The type existed only to annotate the const; the const was
  `oklchToGammaRgb(cssToOklch(css))`, both of which stay on `./color`.
- `ringsAt` leaves the `@mkbabb/glass-ui/fourier-field` barrel. It stays inside the package
  as an internal helper; no entry point reaches it.

Nothing breaks at your current pin. The names disappear only when you move to 10.0.0.
`MIGRATION.md §10.0.0` carries the three rows.

Census across the four siblings (`grep -rln 'ringsAt\|ColorResolver\|defaultBlobColorResolver'`
over `slides/src`, `atlas/src`, `value.js/src`, `sci-report/dashboards`, `node_modules` excluded—sci-report has no
`src/`): seven files. Two are real imports (slides). The other five are same-substring hits on
atlas's own `MarkColorResolver`: atlas `ColorScale.ts` and four sci-report dashboards files that
import `publishMarkColorResolver` from `@mkbabb/atlas/charts`. `ringsAt`: zero readers anywhere.

## §1 · Per consumer, per import

### slides—`src/decks/feedback-coder/slides/Slide01.vue`

- `:11` `import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color";`—**dies at
  10.0.0** (the module has no such export).
- `:32-38` `<FourierField variant="hero" color="var(--viz-fourier)"
  :color-resolver="defaultBlobColorResolver" seed="hero" :freeze="capture" />`. The
  `colorResolver` prop is already gone: it was removed at `4a86570b` (2026-08-12), first
  shipped in 9.0.0. At 10.0.0 the value bound to it is gone too.

**Recipe.** Delete the `:11` import and the `:color-resolver` binding. Keep
`color="var(--viz-fourier)"`: `color` is FourierField's ambient color input (a token or a
literal, turned into a two-stop ramp) and replaces what the resolver used to do. `variant` is
also not a FourierField prop at 9.0.0 or HEAD (the props are `config`, `spectrum`,
`getPalette`, `color`, `seed`, `freeze`, `interactive`), so drop `variant="hero"` in the same
edit. The O-20 slides adopt row asks for the same edit in the same file.

```vue
<FourierField color="var(--viz-fourier)" seed="hero" :freeze="capture" />
```

### slides—`src/decks/feedback-coder/slides/Slide05.vue`

- `:24` `import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color";`—**dies at
  10.0.0**.
- `:43` `<FourierField variant="final" color="var(--viz-chebyshev)"
  :color-resolver="defaultBlobColorResolver" seed="final" :freeze="capture" />`.

**Recipe.** Same three deletions (the `:24` import, `:color-resolver`, `variant="final"`); keep
`color="var(--viz-chebyshev)"`.

```vue
<FourierField color="var(--viz-chebyshev)" seed="final" :freeze="capture" />
```

If a deck ever needs the old gamma triple directly (neither of these files does), the
replacement is `oklchToGammaRgb(cssToOklch(css))`, with both imported from
`@mkbabb/glass-ui/color`. `cssToOklch` throws on `var(--x)` or a non-opaque color, so
resolve the token to a concrete color before calling it.

### atlas—`src/charts/scale/ColorScale.ts`

**Nothing to change.** The grep hit is `MarkColorResolver` (`:407`, with
`activeMarkColorResolver` `:411` and `publishMarkColorResolver` `:420`), atlas's own
mark-color resolver type. The file imports nothing from `@mkbabb/glass-ui` (its imports at
`:24-52` are `./oklab`, `./colorKind`, `./colorRamp`, `../contract/selection-contract` and
`../lib/format`). No other atlas file names the three. The cut does not reach atlas.

### value.js, sci-report

value.js: zero hits. sci-report (`dashboards/package.json` pins `7.0.0`, HEAD `735ce1c8`): four
atlas-name hits (`usf/features/retention/NetRetentionMap.vue:34`,
`speedtest/features/hex-map/useHexMapOption.ts:37`,
`ecf/features/districts/DistrictChoropleth.vue:64`, `bead/features/map/BeadAwardMap.vue:33`,
all `publishMarkColorResolver` from `@mkbabb/atlas/charts`); no file under `dashboards/` imports
`@mkbabb/glass-ui/color` or `/fourier-field`. Nothing to change in either.

## §2 · The ask

slides: when you next bump `@mkbabb/glass-ui`, apply §1's two recipes through a marked
addendum in your own tranche. Nothing at `3.13.0` breaks in the meantime, and nothing was
written into your tree. atlas: nothing to do.

—glass-ui, BK register wave, Lane X. One letter for both consumers. Replies go to
`docs/tranches/BK/coordination/` here, in your usual `GLASS-INBOUND-*` format on your side.
