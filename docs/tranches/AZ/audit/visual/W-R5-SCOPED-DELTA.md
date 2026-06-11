# AZ.R5-5 — the scoped `:global()` DROP trap, swept + locked · DELTA

<!-- surface-paths: demo/stories/compositions/configurator.vue, scripts/proof-no-scoped-global.mjs, docs/precepts/design-idioms.md -->
<!-- surface-hash: 1f055347253d3d69a4d79cd0c0941a380c6e22699180688fd04cf32acddbe459 -->

The R5-5 trap (THIRD production recurrence, consumer-verified on slides): a
`:global(.dark) .x` selector inside a Vue `<style scoped>` block is MIS-COMPILED.
ONE survivor at HEAD — `demo/stories/compositions/configurator.vue:260`
(`:global(.dark) .configurator-specimen`, the dark-mode full-chroma bloom +
deep-ink base arm) — fixed onto the plain-ancestor idiom `.dark
.configurator-specimen`.

## The CSSOM evidence (the binding truth)

`@vue/compiler-sfc` `compileStyle({ scoped:true, id:"data-v-XYZ" })`:

```css
/* SOURCE (the footgun, the HEAD survivor): */
:global(.dark) .configurator-specimen { --bloom-blue: var(--rainbow-blue); … }

/* EMITTED — the LOCAL leg `.configurator-specimen` is DROPPED, the scope id
   GONE; the override lands on the bare `.dark` ROOT and leaks the deep-ink
   `background-color` to the WHOLE document, while the specimen never receives
   its dark bloom: */
.dark { --bloom-blue: var(--rainbow-blue); … background-color: color-mix(…); }
```

```css
/* SOURCE (the fix, the plain-ancestor idiom): */
.dark .configurator-specimen { --bloom-blue: var(--rainbow-blue); … }

/* EMITTED — correctly scoped, the scope id reattaches to the local leg: */
.dark .configurator-specimen[data-v-XYZ] { --bloom-blue: var(--rainbow-blue); … }
```

## The live π readback (the demo SHELL, :5199, real dims)

Computed-style readback of the `.configurator-specimen` under `.dark` on the
live demo shell, viewport 1280×900 @2× (effective 2560×1800; capture crop
1260×1118px):

| signal | BEFORE (trap) | AFTER (fix) |
|---|---|---|
| `--bloom-blue` | `oklch(0.783 0.056 264.2)` (pastel, chroma 0.056 — desaturated mud) | `oklch(0.633 0.162 252.1)` (full-chroma, chroma 0.162 — **2.9× chroma**) |
| specimen `background-color` | `rgba(0,0,0,0)` (transparent — deep-ink base never reached the specimen) | `oklab(0.190 0.0025 0.0037)` (the deep ink base, painted) |

The BEFORE frame shows the FD-R2 #3 dark defect verbatim — washed-out pale
nuclei barely separable over near-black, no ink field. The AFTER frame shows the
vivid blue/violet/magenta bloom the dark arm was written to deliver.

## The captured frames (literal filenames, audit/visual/)

- `W-R5-SCOPED-configurator-dark-before.png` (the DROP-trap failure — desaturated mud)
- `W-R5-SCOPED-configurator-dark-after.png` (the fix — full-chroma bloom + ink base)

## The lock

- `proof:no-scoped-global` — static sweep, zero `:global(` inside any `<style
  scoped>` block across `src/` + `demo/` (allowlist EMPTY at birth). GREEN
  post-fix; the synthetic born-RED `--fixture` arm proves teeth (the gate would
  have been born-RED at the HEAD survivor — confirmed by a pre-fix simulation).
- `docs/precepts/design-idioms.md §8` — the plain-ancestor dark-arm idiom
  codified (the trap, the CSSOM evidence, the working form).

## Consumer sweep (read-only — siblings fix their own)

- `../slides/src/views/HomeView.vue:133-134` — only a COMMENT documenting the
  trap; the live code already uses the plain-ancestor form. No live survivor.
- `../speedtest/src` — zero hits, clean.
- `../words/frontend/src/components/custom/wordlist/modals/WordDetailModal.vue:264,268`
  — TWO LIVE survivors (`:global(.dark) .status-badge-hot`,
  `:global(.dark) .status-badge-cold`) inside a `<style scoped>` block. Their
  fix is theirs (no sibling edit); flagged for the words frontend bump.
