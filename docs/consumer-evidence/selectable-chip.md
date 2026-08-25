# SelectableChip

> **[2026-08-25 · BK #76 α5 — CONSUMER-EVIDENCE TRUTH-UP. THIS ONE IS A FOLD, NOT
> A DELETE, AND THE DIFFERENCE MATTERS TO THE CONSUMER.]** TR#76's third named
> row, and the one that breaks the pattern — the other three name artefacts that
> are simply gone. **The mechanism here SURVIVES; only its face and its door
> changed.** Measured this seat:
>
> | claim below | on disk at HEAD |
> |---|---|
> | `src/components/custom/selectable-chip/` | **ABSENT** |
> | the published subpath `@mkbabb/glass-ui/selectable-chip` | **ABSENT** from `package.json.exports` |
> | verdict `keep-current` | superseded — **folded** |
>
> **`ToggleChip` + `SelectableChip` FOLDED onto the ONE `<Chip>`** (shape × tone;
> clean break, no alias) — `tests/public-surface.spec.ts:307-311`, which also
> records that `<Chip>` ships **subpath-only on `./chip`**, off the value.js-free
> root barrel. The selectable behaviour is a **discriminated `mode`**, live at
> `src/components/chip/types.ts:28` (`mode: "selectable"`, with `modelValue?:
> boolean | null`), sitting beside `mode: "static"` (`:18`) and `mode: "action"`
> (`:38`). `SelectableChipProps` is **still an exported interface** (`:27`, in the
> `:61` union) — so the type survives the component.
>
> **The migration, since this page is where a consumer would look for it:**
>
> ```
> - import { SelectableChip } from "@mkbabb/glass-ui/selectable-chip";
> + import { Chip } from "@mkbabb/glass-ui/chip";
> - <SelectableChip v-model="on" …/>
> + <Chip mode="selectable" v-model="on" …/>
> ```
>
> **The `.accent-tone` register and the WCAG contrast floor over the tinted plate
> — the substance the ≥2-bar argument below actually rests on — are unchanged by
> the fold.** The verdict text stands as the record of *why the primitive earned
> its keep*; it is only the artefact path, the subpath and the word
> `keep-current` that this bracket retires.

## Artefact path

`src/components/custom/selectable-chip/` (the published subpath
`@mkbabb/glass-ui/selectable-chip`, OFF the root barrel — value.js-bearing via
`useAccentTone`). The contrast-floored tonal-accent chip face: it reads the
`.accent-tone` register (BC.W-ACCENT-TONE) and presents the tonal-accent selection chip
with the WCAG contrast floor held over the tinted plate.

## Verdict

`keep-current` — **user-directed wave (BC.W-ACCENT-TONE), the FOURIER-BC cross-repo ask
#3 (`accent-tone / SelectableChip`, disposition BUILD), booked with named cross-repo
consumers.** `<SelectableChip>` is the component face of the `.accent-tone` tonal-accent
register — the convergence of the fourier `/diff` accent styling + value.js's palette
chips + speedtest's tone badges onto ONE library primitive (no per-repo fork). The honest
component-orphan census (source files only, the demo own-story + the publication
machinery excluded) measures it at exactly **1 real in-repo call-site** — below the bare
≥2 bar, but a load-bearing published primitive with NAMED, non-phantom cross-repo
consumes booked (`docs/tranches/BC/coordination/FOURIER-BC.md` ask #3, verdict MET).

## Consumer proof (re-runnable)

**Internal consumers — 1 (real).** The forms/selectable-chip story demonstrates the
tonal-accent register's component face bound to the `.accent-tone` source:

```bash
grep -rln 'components/custom/selectable-chip|@mkbabb/glass-ui/selectable-chip|SelectableChip' demo/ src/ \
  | grep -v '/components/custom/selectable-chip/' | grep -v 'src/subpaths/' | grep -v 'src/api/'
#   → demo/stories/forms/selectable-chip.vue
```

**External consumers — the booked cross-repo consumes (FOURIER-BC ask #3, MET).** The
fourier `/diff` surface (~57× tonal-accent sites), value.js's palette chips, and the
speedtest tone badges re-point onto the shared `.accent-tone` register / `<SelectableChip>`
on their `^4.x` `@mkbabb/glass-ui` bumps. The foreign-tree fence holds — this primitive
does NOT edit fourier / value.js / speedtest.

## The named ≥2-consumer TRIGGER

The binding close-criterion is the fourier `/diff` accent styling (and/or value.js
palette chips, speedtest tone badges) re-pointing onto `@mkbabb/glass-ui/selectable-chip`
/ the `.accent-tone` register on the `^4.x` bump (`docs/tranches/BC/coordination/FOURIER-BC.md`
ask #3). When a sibling call-site lands (a
`grep -rln 'glass-ui/selectable-chip|accent-tone' ~/Programming/{fourier,value.js,speedtest}/src`
hit), record it here; the component clears the ≥2-consumer bar on its own and this
evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `selectable-chip`
while the named second consumer is in flight. The binding source truth is
`proof:accent-tone` (the BC.W-ACCENT-TONE register + the `useAccentTone` consume) +
the `proof:ba-gestalt` accent verdict.
