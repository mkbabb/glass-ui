# AnimatedDigit

## Artefact path

`src/components/custom/animated-digit/` (the published subpath `@mkbabb/glass-ui/animated-digit`).

## Verdict

`keep-current` — **sole-but-real** (one real external production call-site + the showcase story).
`AnimatedDigit` is the single-glyph count-up reel (the AB+1 / AC.W6d ergonomics). The honest
component-orphan census (source files only, library publication machinery + demo own-story
excluded) measures it at exactly **1 real external call-site** — below the bare ≥2 bar, but a
genuine load-bearing production use, not an orphan. Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**External consumers — 1 (real, production).** fourier-analysis composes it in the coefficients
spectrum, the live count-up over the Fourier coefficient magnitudes:

```bash
grep -rln 'AnimatedDigit|animated-digit' ~/Programming/fourier-analysis/web/src
#   → ~/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue
```

**Internal consumers — 1 demo (the showcase story).**

```bash
grep -rn '<AnimatedDigit' demo/   # → demo/stories/motion/animated-digit.vue
```

## The named ≥2-consumer TRIGGER

A SECOND real consumer (a speedtest result-counter, a slides metric reel) clears the bar on its own
and retires this doc's load-bearing role. Until then this is the honest book: one real production
call-site, kept.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `animated-digit` while the
fourier call-site stays present. If fourier drops it AND no second consumer arrives, the verdict
returns to `library-orphan` (formally retire the subpath + export).

## Cross-references

- `~/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (the real consumer).
- `demo/stories/motion/animated-digit.vue` (the showcase story).
