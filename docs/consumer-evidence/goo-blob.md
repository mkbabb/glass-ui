# GooBlob

## Artefact path

`src/components/custom/goo-blob/` (the published subpath `@mkbabb/glass-ui/goo-blob`).

## Verdict

`keep-current` — **booked DEMO-ONLY** (a showcase primitive retained with this rationale,
the overfitting-audit `keep-current` path), with a named ≥2-consumer trigger. The AX-named
consumer #2 (a value.js goo-blob repatriation) never landed; the speculative ColorResolver DI
ceremony built for it was STRIPPED at W-BLOB3.

## Consumer proof (re-runnable)

**External consumers — 0.** The AX blob synthesis recorded the binding close-criterion as
*"value.js DELETES its local goo-blob fork and consumes `@mkbabb/glass-ui/goo-blob`, injecting
its OWN color through the ColorResolver seam"* (`docs/tranches/AX/research/blob-synthesis.md`
item 8). That consumer never arrived. Verified at the W-BLOB3 execution HEAD (`tranche/AY`):

```bash
# value.js — no goo-blob fork to repatriate (src/ is a color/value/math lib):
grep -rln 'GooBlob|goo-blob|metaball' ~/Programming/value.js/src   # → NONE
# speedtest — its visual identity is the meter/aurora, no metaball:
grep -rln 'GooBlob|goo-blob|metaball' ~/Programming/speedtest/src  # → NONE
# slides — its visual identity is constellation/fourier-field/aurora, no metaball:
grep -rln 'GooBlob|goo-blob|metaball' ~/Programming/slides/src     # → NONE
```

**Internal consumers — 1 demo (the showcase story).** The ONLY `<GooBlob>` mount in the repo:

```bash
grep -rn '<GooBlob' demo/   # → demo/stories/substrates/blob.vue:144 (interaction hero)
#                                 demo/stories/substrates/blob.vue:210 (mood hero)
```

Both mounts paint the cream default; neither injected a custom color resolver — the demo always
passed the ONE `defaultBlobColorResolver`. The DI injection point was never used for injection.

## The W-BLOB3 disposition — BOOK demo-only + STRIP the DI (clean break, inv-4)

The seed offered two paths: BIND a real consumer #2 (value.js / speedtest / slides) OR book
demo-only + strip the DI. The decision is **BOOK + STRIP**, empirically, not preferentially:

1. **value.js (the AX-named repatriation) is dead** — no local fork to repatriate; forcing the
   bind would mean AUTHORING a value.js consumer purely to justify the seam (the overfitting tail
   wagging the dog).
2. **speedtest + slides do not want a metaball** — both have their own identities; a speculative
   "blob slide" would be a second manufactured consumer.
3. **The DI seam's only exercised path is the default** — collapse the unused indirection: the
   renderer now resolves its base color through the `/color` leaf directly (`cssToOklch →
   oklchToGammaRgb`, the EXACT body `defaultBlobColorResolver` always was), and the demo loses a
   prop it only ever passed the default to.

The strip removed the REQUIRED `colorResolver` prop, the loud throw, and the
`UseMetaballRendererOptions.colorResolver` option from `GooBlob.vue` +
`composables/useMetaballRenderer.ts` + both demo `blob.vue` mounts. The render is byte-identical
(`proof:blob-color-equivalence` ratifies the unchanged triple; `proof:blob-space-gamma` witnesses
the GAMMA exit). The `ColorResolver` type + `defaultBlobColorResolver` STAY on the `/color`
surface — they are NOT goo-blob-only: `<FourierField>` consumes the type as a REQUIRED prop
(`src/components/custom/fourier-field/index.ts:27`, `FourierField.vue:53`) and its demos pass the
default (`demo/stories/StoryHero.vue:128`, `demo/stories/substrates/fourier-field.vue`). The §0
re-grep found this real ≥2-consumer, so the spec's conditional RETIRE-clause did NOT fire — the
clean break is the goo-blob DI strip only, never a dead-export removal.

## The named ≥2-consumer TRIGGER (ship the seam when the second consumer arrives, not before)

If a FUTURE tranche lands a SECOND real consumer of the blob — a value.js repatriation that
actually ships, a speedtest hero, or a slides slide — the custom-resolver injection is the FIRST
thing it needs. Re-introduce the optional `colorResolver?` seam at THAT point (a one-line additive
optional prop + a `?? defaultResolveColor` internal fallback), NOT in anticipation. This is the
inverse of the speculative-DI overfit: ship the seam when the second consumer arrives.

## Re-audit proof

This document satisfies the overfitting-audit `keep-current` verdict for `GooBlob` only while the
external-consumer greps stay empty AND the demo mount stays present. The W-CLOSE1
`proof:overfitting-ay` orphan-scan (and the W-SB1 component-orphan check) accept GooBlob on THIS
evidence doc (a demo-only book with a named trigger), NOT a false `keep`. If a second real
consumer ships, update this doc + re-introduce the `colorResolver?` seam; if the demo mount is
removed with no external consumer, the verdict returns to `library-orphan` (formally retire the
subpath).

## Cross-references

- `docs/tranches/AY/waves/AY.W-BLOB3.md` (the strip + book wave).
- `src/components/custom/goo-blob/RESEARCH.md` OPEN-3 / F4 (the substrate-without-a-2nd-consumer finding).
- `docs/tranches/AY/audit/visual/W-BLOB3-DELTA.md` (the captured interaction DELTA).
- `scripts/proof-blob3-strip.mjs` (the deletion + re-point + surviving-consumer witness gate).
