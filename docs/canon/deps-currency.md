# Dependency currency + the shadcn-vue verdict (canon home)

The recorded verdict for two standing "are we current?" questions the repo keeps
re-asking: the peer-dependency currency and whether to re-run `shadcn-vue`. Authored
at BH.B5a-deps-currency. The peer-dep TABLE + the all-deps-are-peer rule live in
`dependencies.md` (B4b-content redistribute target); THIS file records the *currency
posture* + the shadcn decision, machine-locked by `proof:deps-currency`.

## Dependency currency — CURRENT (no straddle debt)

Every runtime dependency is a peer, pinned to a single-major floor with no legacy
`||` straddle. At the 5.0.0 cut the versions are current:

| `pkg` ^x | role | currency note |
|----------|------|---------------|
| `vue` ^3.5 | framework | current 3.x |
| `reka-ui` ^2.0 | headless primitives | current 2.x |
| `@vueuse/core` ^14.0 | dark/global-state/event helpers | current 14.x — the vaul-vue `^10` dual was KILLED at BB.W-DRAWER-ABROGATE, so the `^14` spine is single |
| `tailwindcss` ^4.0 | utility CSS | current v4 |
| `class-variance-authority` ^0.7 | CVA variants | current |
| `clsx` ^2.0 | class join (tailwind-merge retired v0.9.2) | current |
| `embla-carousel-vue` ^8.0 | carousel substrate | current 8.x |
| `@lucide/vue` ^1.16.0 | icon set (renamed v1 pkg) | current v1 — the `lucide-vue-next`/`vaul-vue` DEAD externals were dropped + `@lucide/vue` added to `libraryExternal` (the BH lucide payload fix) |
| `tw-animate-css` ^1.2.5 | animate-in/out utilities (optionalPeer) | current |
| `@mkbabb/keyframes.js` ^5.0.0 | spring/keyframe runtime | current 5.x — the `\|\|^4` straddle retired at the 5.x adopt |
| `@mkbabb/value.js` ^1.0.0 | color/value normalization | current 1.x — the `^0.13.0` leg retired, no legacy straddle |

The de-straddle discipline (no `||` majors, no legacy alias) is the standing rule; a
future dep bump lands as a clean floor move, never a straddle.

## shadcn-vue — KEEP components.json for `add`, do NOT run `shadcn-vue update`

`components.json` is the shadcn-vue config that seeds `npx shadcn-vue add <name>` (the
occasional new-primitive scaffold). It is KEPT for that entry point — but glass-ui is
a FORKED design system, not a shadcn-vue consumer tracking upstream:

- **Do NOT run `shadcn-vue update`.** Every base component has diverged end-to-end (the
  glass-first canon, the `--glass-*` ladder, the CVA variant register, the token-first
  focus-ring, the four-state contract). An `update` would flood a too-deep diff against
  every diverged surface with zero gain — the upstream shape is the SEED, not the
  live contract. `add` scaffolds a fresh primitive; the glass-ui shape is then authored
  ON it, never re-synced FROM upstream.
- **`baseColor` fixed `slate` → `stone`.** `slate` is a COOL-neutral base — the exact
  gray-blue the warm-cream identity (BA.W-NO-GRAY, the warm-chroma floor) rejects.
  `stone` is shadcn's warm-neutral base, so a scaffolded primitive lands nearer the
  warm identity before the token-first re-authoring. The `baseColor` only picks the
  `add`-time palette default; glass-ui overrides every color token anyway, so this is a
  scaffold-quality fix, not a runtime paint change (no `dist/` byte moves).

`shadcn-vue` is NOT a dependency (dep-absent + dev-absent) — only `components.json`
carries the config. There is no CLI to keep current; the verdict is the whole surface.

## Machine-lock

`proof:deps-currency` (`scripts/proof-deps-currency.mjs`) asserts:
- **D1** this file exists + records the currency posture + the shadcn verdict AS a
  markdown table (the `dependencies.md` table-form lesson — a prose-only verdict would
  green a presence-check while carrying no parseable dep list).
- **D2** `components.json` `baseColor` is NOT `slate` (the warm-base fix landed).
- **S1** `vite.style-assets.ts` is a thin orchestrator (≤ 200 lines), NOT the 566-line
  god-module.
- **S2/S3** the three carved sub-plugins exist + export their functions:
  `vite.style-fold.ts` (`copyStyleAssets`/`foldSfcBundle`/`inlineFonts`/`injectWebkitBackdrop`/`atSourceIndex`),
  `vite.utility-emit.ts` (`emitComponentUtilities`), `vite.critical-split.ts`
  (`emitCriticalDeferredSplit`) — each ≤ 500 lines.
- **S4** `publishStyleAssets` stays exported + both configs (`vite.config.ts`,
  `vite.iter.config.ts`) still import it — the public plugin surface is unchanged
  (byte-identical build).
- **S5** the orchestrator COMPOSES the three sub-plugins (imports them) + carries no
  inline god-module body (`emitComponentUtilities`/`emitCriticalDeferredSplit` are
  DEFINITION-ABSENT from `vite.style-assets.ts` — the carve is real, not a copy).

Born-RED on HEAD (566-line god-module + sub-plugins absent + `baseColor: slate`) →
GREEN on the split + the baseColor fix + this doc, with a per-clause self-test bite.
