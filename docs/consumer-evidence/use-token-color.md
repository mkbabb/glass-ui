# useTokenColor

## Artefact path

`src/composables/dom/useTokenColor.ts` — on the root barrel via `composables/dom/index.ts`, and on the `@mkbabb/glass-ui/dom` subpath.

## Current consumer proof

**Project**: `speedtest` (external) + `glass-ui` demo
**Source path**: `../speedtest/src/components/speedtest/composables/meter/useMeterTokenColors.ts:19,36-37`; `demo/stories/substrates/constellation.vue:16,22,60`; `demo/stories/StoryHero.vue:21,74`; `demo/stories/composables/use-token-color.vue`
**Use case**: speedtest's `useMeterTokenColors` imports `useTokenColor` from `@mkbabb/glass-ui/dom` and reads `--meter-track-stroke` + `--meter-dial-color` to drive its gauge rendering — a genuine EXTERNAL binary consumer. The demo constellation page reads `--primary` + `--constellation-accent` for its focal-node overlay; StoryHero reads `--primary` for the focal colour; and the composables shelf documents the composable directly.
**Proof**: `rg -n '\buseTokenColor\b' ../speedtest/src; rg -n '\buseTokenColor\b' demo/stories/substrates/constellation.vue demo/stories/StoryHero.vue`

## Keep rationale

`useTokenColor` clears the ≥2-consumer bar with a real external consumer (speedtest's meter token colours) PLUS the demo constellation/hero overlays — it re-resolves a CSS custom property's painted value on dark-mode transitions so a canvas/WebGL consumer can track a token it cannot read through CSS alone. AX.W19 deliberately kept it as the constellation consumer; this doc books that keep so the audit does not re-flag it. (Note: it is DISTINCT from the sibling `useResolveTokenColor`, a DOM-free composable for a different purpose — the speedtest LOCAL wrapper name `useMeterTokenColors` composes glass-ui's `useTokenColor`, not `useResolveTokenColor`.)

## Re-audit proof

This document satisfies the no-silent-overfitting invariant for `useTokenColor` only while the proof command still finds a current consumer. If the grep fails (speedtest drops the import AND the demo consumers go), the verdict returns to `library-orphan`.
