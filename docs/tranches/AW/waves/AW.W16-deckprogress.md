# AW.W16 - DeckProgress position rail (CSS recipe + thin :value wrapper)

## State

**Name**: W16 - DeckProgress position rail (CSS recipe + thin :value wrapper)
**Opens after**: AW tranche open (independent of the dock/aurora/blob arcs; the `Progress` family it composes shipped at AV.W13)
**Agents**: 2 parallel
**Hard gate**: `proof:deck-progress-rail` green — a `.glass-progress-rail` CSS recipe in `src/styles/glass.css` composes the shipped `<Progress variant="default">` fill (NO forked track), and a thin `DeckProgress.vue` `:value`-only wrapper renders `<Progress :model-value="value" class="glass-progress-rail">` carrying NO `position`/`z-index`/`env(safe-area)` (the viewport-pinned chrome is consumer-supplied).
**Status**: planned

## Goal criterion

This wave succeeds if, when work ends, glass-ui ships a position-progress *rail* — a `.glass-progress-rail` CSS recipe that restyles the shipped `<Progress>` for the thin bottom-of-deck rail look, plus a `DeckProgress.vue` thin wrapper that takes a single pre-computed `:value` (0..100) and renders `<Progress variant="default" :model-value="value" class="glass-progress-rail">` — and NOTHING ELSE. No second progress component that forks the fill, no `deckProgress(index, total)` math leaf, no `/deck` subpath: the position-to-percentage arithmetic stays in the consumer (it is a one-liner — `100·(k+1)/N`), the fill mechanic stays in `<Progress>`, and the viewport-pinned `position: fixed` chrome stays consumer-side. Two real consumers drive the rail recipe — a glass-ui demo Deck story and the slides de-docked bottom bar (H.W1).

The convergence digest is binding and explicit (Lane 4, Finding 3; avg-deep-audit §3; charter `:158`): "a `.glass-progress-rail` CSS recipe composing `<Progress>`, **NOT a second progress component** … defer the helper unless a 2nd consumer appears for the math itself." The math is NOT the library-worthy part — `100·(k+1)/N` is a one-liner every consumer already owns; duplicating it into a `deckProgress()` leaf creates a primitive whose only value-add over `<Progress>` is arithmetic the consumer keeps anyway. The library-worthy part is the **rail LOOK** (the thin track, the leading-edge glow, the dark-flip tint) — a CSS recipe, not a component fork. The `/deck` subpath name is **reserved** for the slides deck-engine lift (flagged across all three digests as the slides-local engine that stays slides-local); a position rail must not squat it.

## Scope

1. Add a `.glass-progress-rail` recipe to `src/styles/glass.css` — restyles the shipped `<Progress>` (the `[data-slot="progress"]` track + `[data-slot="progress-indicator"]` range, or the `.progress`/`.progress-range` class hooks the `Progress` family already emits) for the thin bottom-of-deck rail: a hairline track height (`--progress-rail-h`, default `3px`), a leading-edge glow on the fill's trailing edge, and palette read from `--progress-rail-fill` / `--progress-rail-track` with neutral fallbacks so a consumer/dark-flip re-tints. The recipe composes the EXISTING `<Progress>` fill — it restyles, it does NOT re-author a second track/range mechanic. Every visual axis is a `--progress-rail-*` custom property (token-first).
2. Create `src/components/custom/deck-progress/DeckProgress.vue` — a thin `:value`-only wrapper: props `{ value: number; class?: string }` (`value` is a pre-computed 0..100 position percentage the consumer supplies). Render `<Progress variant="default" :model-value="value" :class="cn('glass-progress-rail', props.class)" aria-label="Deck position" />`. NO `:index`/`:total` convenience path (the math stays consumer-side), NO `position`/`z-index`/`env(safe-area)` (a root comment names the contract: "the viewport-pinned chrome — `fixed`, `bottom: env(safe-area-inset-bottom)`, the z-index — is consumer-supplied; this wrapper owns the rail LOOK over a `:value`, nothing else").
3. Create `src/components/custom/deck-progress/index.ts` — the package barrel (`export { default as DeckProgress } from "./DeckProgress.vue"`, `export type { DeckProgressProps } from "./DeckProgress.vue"` — the `{ value, class? }` props type co-exported from the SFC's `defineProps` generic, NO separate math module).
4. Add `DeckProgress` to the root barrel `src/components/custom/index.ts` re-export (the wrapper is a one-prop styling composite with no vueuse dependency and no heavy isolated chunk — it ships on the root barrel like the other cherry-picked custom composites, NOT a dedicated subpath). Add `DeckProgressProps` to `src/api/index.ts` (the canonical public type surface).
5. Author `demo/stories/navigation/deck-progress.vue` (consumer #1) — a mini in-story deck (3-4 frames + prev/next) that computes `100·(currentIndex+1)/frames.length` IN THE STORY and feeds it to `<DeckProgress :value="pct" class="deck-progress-demo-bar" />`, with a scoped `.deck-progress-demo-bar` recipe pinning the rail to the story frame's bottom edge — the LITERAL demonstration that the position math AND the pinned chrome are both consumer-owned, and only the rail LOOK comes from the library.
6. Add the `proof:deck-progress-rail` gate, born RED on HEAD (no `.glass-progress-rail` recipe, no `DeckProgress`), green after the recipe + wrapper land.

## Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) if:

- the file bounds expand beyond `src/styles/glass.css`, `src/components/custom/deck-progress/*`, `src/components/custom/index.ts`, `src/api/index.ts`, `package.json`, the named demo story, and the gate script — e.g. the `.glass-progress-rail` recipe turns out to need a forked `ProgressDefault.vue` or a second range mechanic to achieve the leading-edge glow (a scope reveal that would CONTRADICT the digest's "compose `<Progress>`, do not fork" verdict — escalate, do not silently fork the fill);
- a SECOND consumer surfaces for the *position math itself* (not the rail look) — e.g. `CarouselPager.vue:80` (`selectedIndex + 1 / slideCount`) is to be folded onto a shared `deckProgress()` helper — which would re-justify a math leaf the digest currently defers; that is a charter-divergence escalation (re-baseline AW.md), NOT a solo scope expansion in this wave;
- the de-dock semantics force the library wrapper to carry `position: fixed`/safe-area chrome after all (the consumer-chrome/library-look split was assumed; a forced fixed-position dependency in the library is a scope reveal that invalidates the "look-only" thesis).

## File Bounds

| File | Access |
|---|---|
| `src/styles/glass.css` | modify-carve (add the `.glass-progress-rail` recipe block; do NOT touch the `.input-pill` invalid-ring rule — that is AW.W18) |
| `src/components/custom/deck-progress/DeckProgress.vue` | create |
| `src/components/custom/deck-progress/index.ts` | create |
| `src/components/custom/index.ts` | modify (add the deck-progress barrel re-export onto the root-barrel custom set) |
| `src/api/index.ts` | modify (add `DeckProgressProps` to the public type surface) |
| `package.json` | modify (register the `proof:deck-progress-rail` script — NO `./deck` export entry; the wrapper ships on the root barrel) |
| `demo/stories/navigation/deck-progress.vue` | create |
| `demo/stories/manifest.ts` | modify (register the deck-progress story route) |
| `scripts/proof-deck-progress-rail.mjs` | create |

Do NOT touch: `docs/precepts/`, `src/components/ui/progress/*` (the `<Progress>` family is consumed verbatim — NO fork of `ProgressDefault.vue`), `src/subpaths/*` (NO `/deck` subpath — the `/deck` name is RESERVED for the slides deck-engine lift, and a one-prop styling wrapper does not warrant subpath isolation), `~/Programming/slides/*` (the slides de-dock is H.W1's port; AW only ships the library surface), `src/components/custom/dock/*` (the de-dock is explicitly OFF the dock — DeckProgress carries no dock dependency).

### Disjointness

Two parallel units, disjoint write sets:

- **AW.W16.a** owns the library surface — the `.glass-progress-rail` recipe in `glass.css`, `deck-progress/*`, `custom/index.ts`, `api/index.ts`, `package.json` (the gate script entry only), the gate script.
- **AW.W16.b** owns the demo consumer — `demo/stories/navigation/deck-progress.vue`, `manifest.ts`.

No two units share a `modify` path. Unit b consumes the `DeckProgress` wrapper + the `.glass-progress-rail` recipe a produces (reads only). Sequence: a lands first (sub-wave 1), then b (sub-wave 2) — or commit a before parallelizing.

## Agent Units

### AW.W16.a The rail recipe + thin :value wrapper

- Goal: glass-ui ships a `.glass-progress-rail` CSS recipe restyling `<Progress>` + a `DeckProgress` `:value`-only wrapper on the root barrel, with the rail LOOK frozen by a gate and NO math leaf, NO subpath.
- Mechanism:
  - **The rail recipe.** In `src/styles/glass.css`, add a `.glass-progress-rail` block restyling the shipped `<Progress>` slots: the track hairline (`height: var(--progress-rail-h, 3px)`), the range fill (`background: var(--progress-rail-fill, var(--primary))`), a leading-edge glow on the fill's trailing edge (a `box-shadow`/gradient over `--progress-rail-fill`), and a neutral track (`background: var(--progress-rail-track, color-mix(in srgb, var(--foreground) 8%, transparent))`). The recipe restyles `<Progress>`'s emitted hooks; it does NOT re-declare a track element. Every axis is a `--progress-rail-*` token (token-first; a consumer overrides `:root { --progress-rail-fill: … }` to retint with zero library edit). Dark-flip rides the token re-resolution by construction.
  - **The wrapper.** `DeckProgress.vue` (`<script setup>`, named-export via the barrel): `defineProps<{ value: number; class?: string }>()`; render `<Progress variant="default" :model-value="value" :class="cn('glass-progress-rail', props.class)" aria-label="Deck position" />`. NO `:index`/`:total`, NO `deckProgress()` import, NO `position`/`z-index`/`env(safe-area)` declaration — a root comment names the consumer-chrome contract. Forward `class` so the consumer pins it. Co-export `DeckProgressProps` from the SFC.
  - **Barrel + root-barrel + api.** `deck-progress/index.ts` is the package barrel; `custom/index.ts` adds the `DeckProgress` re-export onto the root-barrel cherry-picked custom set (no subpath); `api/index.ts` adds `DeckProgressProps`.
  - **Gate.** `scripts/proof-deck-progress-rail.mjs`: (1) parse `src/styles/glass.css`, assert a `.glass-progress-rail` rule exists and reads `--progress-rail-*` tokens + composes the `<Progress>` hooks (no second `width`-animated track element re-authored); (2) parse `DeckProgress.vue`, assert it references `<Progress` (composes, not forks), declares no `position:`/`z-index:`/`env(safe-area`, and imports no `deckProgress`/math helper; (3) assert NO `src/subpaths/deck.ts` exists and `package.json` `exports` has no `./deck` entry (the reserved-namespace guard). JSON artifact, comment-stripped, default export. Register `"proof:deck-progress-rail"`.
- Files: `src/styles/glass.css`, `src/components/custom/deck-progress/{DeckProgress.vue,index.ts}`, `src/components/custom/index.ts`, `src/api/index.ts`, `package.json`, `scripts/proof-deck-progress-rail.mjs`.
- Sub-gate: `npm run proof:deck-progress-rail` green; `npm run typecheck` green; `npm run build` green (the `/styles` bundle re-emits with the rail recipe; `DeckProgress` ships on the root barrel chunk).

### AW.W16.b The demo deck-position consumer

- Goal: a demo story drives `DeckProgress` through a consumer-computed `:value` over a mini in-story deck, demonstrating that BOTH the position math AND the pinned chrome are consumer-owned and only the rail LOOK is the library's (consumer #1).
- Mechanism:
  - `demo/stories/navigation/deck-progress.vue` — a 3-4 frame mini deck inside a `<ShowcaseFrame>`: a `currentIndex` ref + prev/next `<Button>`s, a `pct = computed(() => 100 * (currentIndex.value + 1) / frames.length)` (the position math, IN THE STORY — proving it stays consumer-side), an `<DeckProgress :value="pct" class="deck-progress-demo-bar" />`, and a scoped `.deck-progress-demo-bar` recipe that pins the bar to the story frame's bottom edge (`position: absolute` within the relatively-positioned frame) — the LITERAL demonstration that the chrome is consumer-owned and the library wrapper carries only the `:value`-driven rail look.
  - `demo/stories/manifest.ts` — register the `navigation/deck-progress` route.
- Files: `demo/stories/navigation/deck-progress.vue`, `demo/stories/manifest.ts`.
- Sub-gate: the demo dev server renders the deck-progress route without console error; clicking next advances the rail from `~25%` → `100%` across 4 frames (the consumer-computed `:value` visibly tracks).

## Hard Gate

1. **`proof:deck-progress-rail` green.** `npm run proof:deck-progress-rail` exits 0: a `.glass-progress-rail` recipe exists in `glass.css` reading `--progress-rail-*` tokens and composing the shipped `<Progress>` hooks (no forked track); `DeckProgress.vue` references `<Progress`, declares no `position:`/`z-index:`/`env(safe-area`, and imports no math helper; NO `src/subpaths/deck.ts` and NO `./deck` `exports` entry. Born RED on HEAD (no recipe, no wrapper). JSON artifact emitted.
2. **Composes, does not fork.** `grep -n "ProgressDefault\|<Progress" src/components/custom/deck-progress/DeckProgress.vue` shows the wrapper renders the shipped `<Progress>`; `grep -c "deckProgress\|index.*total" src/components/custom/deck-progress/` is zero (no math leaf); the rail is a CSS recipe over the shipped fill, not a second mechanic.
3. **No `/deck` subpath squat.** `test ! -f src/subpaths/deck.ts` AND `grep -c '"./deck"' package.json` is zero — the reserved `/deck` deck-engine namespace is NOT consumed; `DeckProgress` ships on the root barrel (`grep DeckProgress src/components/custom/index.ts` resolves).
4. **Two-consumer justification recorded.** The wave file's §Two-consumer ledger names consumer #1 (the demo deck story, this wave) and consumer #2 (the slides de-docked bar, H.W1) — both consume the SAME `.glass-progress-rail` recipe + the SAME `<Progress>` fill; the latent 3rd (`CarouselPager.vue:80`) is named for justification but NOT ported (and its `X / N` counter is a future math fold, not this wave's reach).
5. **Typecheck + build.** `npm run typecheck` green; `npm run build` green (the `DeckProgressProps` type typechecks; the `/styles` bundle re-emits with the rail recipe; `DeckProgress` ships on the root barrel chunk — no new `./deck` chunk).

## Format And Lint Cadence

- After unit a lands: `npm run proof:deck-progress-rail` + `npm run typecheck` + `npm run build` (the `/styles` re-emit + the root-barrel chunk).
- After unit b lands: `npm run typecheck` + the demo dev-server smoke of the deck-progress route.
- Docs-only artifacts in this wave file: `git diff --check` for whitespace.
- No formatter skipped; the repo `proof:*` ESM gates are the generated-format check for the new `.mjs`.

## Verification Artefacts

- `scripts/proof-deck-progress-rail.mjs` JSON artifact (the `.glass-progress-rail` recipe-composes-`<Progress>` assertion + the wrapper chrome-absence + math-absence scan + the no-`/deck`-subpath guard) saved at wave close.
- A before/after screenshot of the demo deck-progress story showing the rail at frame 1 (`~25%`) and frame 4 (`100%`).
- The `git diff` of `glass.css` showing the new `.glass-progress-rail` recipe + `package.json` showing the gate script registration (and NO `./deck` export).
- Commit hashes for the two units.

## Commit Plan

- `feat(tranche-AW): W16 (rail) — .glass-progress-rail recipe + DeckProgress :value wrapper + proof:deck-progress-rail` (unit a; the CSS recipe over `<Progress>`, the thin `:value`-only wrapper, the root-barrel/api wiring, the born-RED-then-green gate; commit body required — names the rail-look/consumer-chrome split, the `<Progress>` composition, and the dropped math leaf + dropped `/deck` subpath).
- `feat(tranche-AW): W16 (demo) — deck-progress navigation story (consumer #1)` (unit b).
- `docs(tranche-AW): W16 close — deck-progress status + two-consumer ledger` (orchestrator close).

## Dependencies

- **Depends on**: the `Progress` family (`src/components/ui/progress/*`, shipped AV.W13) — the `.glass-progress-rail` recipe restyles `<Progress variant="default">` and `DeckProgress` renders it, so the variant dispatcher must be live (it is, at HEAD).
- **Blocks**: H.W1 (the slides de-docked bottom bar consumes `DeckProgress` + the `.glass-progress-rail` recipe — consumer #2; the de-dock keeps its own `100·k/N` math + its own `position: fixed` chrome, and adopts the library rail LOOK).

## Archaeology

The prior draft of this wave shipped a full `DeckProgress.vue` + a `deckProgress(index, total)` math leaf + a `src/subpaths/deck.ts` `/deck` subpath — a scope overreach the convergence digest's own cited authority (Lane 4 Finding 3; avg-deep-audit §3) had already vetoed ("a CSS recipe composing `<Progress>`, NOT a second progress component; defer the helper unless a 2nd consumer appears for the math"). Two defects in that draft: (1) the `deckProgress()` math leaf duplicated a one-liner (`100·(k+1)/N`) every consumer keeps anyway — no library-worthy value-add over `<Progress>`; (2) the `/deck` subpath SQUATTED the reserved deck-engine namespace (the slides-local engine-lift that all three digests flag as staying slides-local). The AW/H harden re-baseline (Cluster G) demotes the wave to the digest-mandated shape: a `.glass-progress-rail` CSS recipe + a `:value`-only wrapper on the root barrel — the LOOK is the library's, the math and the pinned chrome are the consumer's, and `/deck` stays reserved.

## Two-consumer ledger (canonical)

| Consumer | Surface consumed | Ships in | Disposition |
|---|---|---|---|
| Demo deck-progress story | `<DeckProgress :value>` + the `.glass-progress-rail` look + consumer-computed `100·(k+1)/N` + consumer-pinned chrome | AW.W16 (consumer #1) | **KEEP** — the canonical in-library demonstration of the look-only library surface (math + chrome both consumer-side) |
| Slides de-docked bottom bar | `DeckProgress` + the `.glass-progress-rail` recipe; keeps its own `100·k/N` math + its own `position: fixed` chrome | H.W1 (consumer #2) | **PORT** — adopts the library rail LOOK (deletes its hand-rolled rail CSS); keeps its position math + its pinned-chrome CSS |
| `CarouselPager` counter | the `X / N` position math (`CarouselPager.vue:80` already computes `selectedIndex + 1 / slideCount`) | latent (a future math fold) | **NAMED, not ported** — a math-leaf fold is DEFERRED per the digest (no math helper ships this wave); named only to mark where a future shared-math wave would land IF a 2nd math consumer materializes |

The ≥2-consumer rule clears on the **rail recipe** (the actual library surface): the demo story (consumer #1) + the slides bar (consumer #2) both consume the SAME `.glass-progress-rail` look + the SAME `<Progress>` fill. No duplication is created — the slides de-dock *adopts* the library rail look (deleting its hand-rolled rail CSS), and the new wrapper forks no track (it composes `<Progress>`) and ships no math leaf (the `100·(k+1)/N` arithmetic stays a consumer one-liner). The library owns the LOOK; the consumer owns the math and the chrome.
