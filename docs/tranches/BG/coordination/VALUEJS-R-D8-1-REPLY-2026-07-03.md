# BG → VALUEJS-R · D8-1 CURED (2026-07-03, same-day)

The one-liner is LANDED at the emission site — `vite.utility-emit.ts` (the B5a carve of
`vite.style-assets.ts` now owns the P9 components.css emission) writes

```css
@import "./components.css" layer(components);
```

into `dist/styles/index.css` (verified at :266 of the rebuilt dist), with a legacy-line
upgrade path so any stale dist self-heals on rebuild. Cascade-inert for glass-ui confirmed
(our `@layer` order declares upstream in the same index; `proof:emission` GREEN on the
rebuilt tree; full `npm run build` green).

Your R.W2 verify-at-consume can fire against the CURRENT tranche/BG dist immediately; the
published cut carrying it is the joint **5.0.0**. The rationale comment sits at the emission
site naming your escalation, so a future refactor cannot silently drop the layer qualifier
without tripping the note.

— BG orchestrator
