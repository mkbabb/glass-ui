# J.W5.A — Slider CVA + size axis proof

## Summary

Slider rebuilt from a single-file in-template variant string + scoped-CSS branches into a CVA-driven primitive with a 5-variant × 3-size matrix. CVA injects size geometry via Tailwind arbitrary CSS-variable classes (`[--slider-track-height:…]`, `[--slider-thumb-size:…]`); variant substrate recipes key off `[data-variant]` in the SFC's scoped CSS. The bespoke `:focus-visible { outline: none }` strip retired — `.focus-ring` composes from the CVA base class and owns the canonical focus chrome.

## Files

| File | LOC delta | Note |
|---|---|---|
| `src/components/ui/slider/index.ts` | +49 | Re-exports `Slider` + new `sliderVariants` cva + `SliderVariants` type |
| `src/components/ui/slider/Slider.vue` | +96 / -34 | Consumes `cn(sliderVariants(...))`; emits `data-variant` + `data-size`; scoped CSS keys off `[data-variant]`; new variants `glass-pill` + `glass-cartoon`; `:focus-visible` strip retired (now via `.focus-ring`) |
| `demo/stories/primitives/slider.vue` | +75 / -10 | Adds 5×3 matrix grid; named-variant exemplar sections for `timeline`, `glass-pill`, `glass-cartoon` |

## CVA schema

```ts
sliderVariants = cva(
  'glass-slider focus-ring relative flex w-full touch-none select-none items-center transition-colors',
  {
    variants: {
      variant: {
        standard:      '',  // baseline — pill track, circular thumb
        spectrum:      '',  // tall muted track + thin bar thumb
        timeline:      '',  // glass-wash scrub track + disc thumb
        'glass-pill':  '',  // pill substrate + halo thumb (W5 new)
        'glass-cartoon':'', // 2px-bordered + cartoon-shadow thumb (W5 new)
      },
      size: {
        sm: '[--slider-track-height:0.25rem] [--slider-thumb-size:0.75rem]',  //  4px /  12px
        md: '[--slider-track-height:0.375rem] [--slider-thumb-size:1rem]',    //  6px /  16px
        lg: '[--slider-track-height:0.75rem] [--slider-thumb-size:1.5rem]',   // 12px /  24px
      },
    },
    defaultVariants: { variant: 'standard', size: 'md' },
  },
)
```

The variant axis values stay empty in the CVA output because the substrate recipes need cascaded selectors (`.glass-slider[data-variant="…"] .slider-track`, `.slider-thumb`, etc.) that Tailwind arbitrary classes can't express on the root alone. The SFC emits `data-variant` so the scoped CSS can paint each variant cleanly. This is the same pattern other CVA-bearing primitives use when the recipe needs to reach descendants (e.g., `.glass-dock` density classes route through the parent class).

## Glass-pill recipe (R3.C "weak diagnosis" follow-up)

| Concern | W5 response |
|---|---|
| Halo on hover | `0 0 0 6px var(--surface-tint-12)` shadow-aura on thumb at `:hover` / `:focus-visible` |
| Track gradient | Range fills with `linear-gradient(to right, var(--surface-tint-15), var(--surface-tint-25))` — denser stops than the prior single-tint |
| Active scale | Root `:active` flips thumb to `transform: scale(var(--scale-press-btn))` (0.97) |
| Held-state | When `data-held` lands (Lane C), halo intensifies to `0 0 0 10px var(--surface-tint-18)` |

## Hard-gate verification (Lane A subset)

- (a) `sliderVariants` CVA exported from `src/components/ui/slider/index.ts` — confirmed.
- (b) `Slider.vue` consumes `cn(sliderVariants({ variant: v, size: s }))` — confirmed; no in-template variant prop branching remains.
- (c) 5 variants supported: `standard`, `spectrum`, `timeline`, `glass-pill`, `glass-cartoon` — confirmed.
- (d) 3 sizes supported: `sm`, `md`, `lg` — confirmed.
- (e) `demo/stories/primitives/slider.vue` renders a 5×3 variant×size matrix grid — confirmed (15 cells, all bound to independent reactive values).
- (j) `npm run typecheck` green for slider scope — confirmed (only pre-existing W6 carousel errors remain, out-of-bounds).

## Scope reveals

- `--scale-press-btn` exists at `tokens.css:542` (= 0.97). Used as documented.
- No `cartoon-surface` utility class exists in `utilities.css`; the dispatch text proposed `cartoon-surface` for the `glass-cartoon` recipe. The actual approach uses `var(--shadow-cartoon-sm)` directly (the token `tokens.css:304-307`), composed with `2px solid var(--border)` — same visual model as `.shadow-cartoon-sm` utility (`utilities.css:361-368`) without a utility-class detour. No new tokens added.
- The story's prior `[&_[data-slot=range]]` selector (a typo — reka-ui exposes `data-orientation`, not `data-slot`) was migrated to the structural class hooks `[&_.slider-track]` / `[&_.slider-range]`.
