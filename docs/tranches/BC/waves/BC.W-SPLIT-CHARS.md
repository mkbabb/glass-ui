# BC.W-SPLIT-CHARS — the per-glyph split JS partner (`useCharStagger` + `<SplitChars>`) with the accessible full-text label

- **Band:** 7 (motion) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** beside `BC.W-MOTION-ONE-CLOCK` (the per-spring clock the split entrance rides) + `BC.W-MOTION-PRESETS` (the convergence-reveal preset a `<SplitChars>` can drive); after `BC.W-MOTION-ONE-CLOCK` pins the `--spring-<name>-duration` clock the `.char-stagger` CSS already reads. Independent of the Band-1 glass + Band-4 viz surfaces (a pure typographic motion leaf). Engine-free → `/motion-core` (the `vReveal`/`usePointerVelocityField` leaf set).
- **Owns / closes:**
  - `docs/tranches/BC/inbound/FOURIER-INBOUND.md` Tier-2 #6 — *"SplitChars / useCharStagger — per-glyph split with `--char-index` + an accessible full-text label (the JS partner to the shipped `.char-stagger` CSS). consumers: every hero hand-rolls it. BC disposition: BUILD (≥2 by construction — every hero)."*
  - The shipped `.char-stagger > .char { --char-index }` CSS recipe (`typography/utilities.css:155-159`) that has NO JS partner — every consumer hand-rolls the split (the N-pastes the partner collapses).

## Goal (the gestalt)
A consumer wraps a word in `<SplitChars text="Fourier" />` (or calls `useCharStagger(el)`) and the text splits into per-glyph spans, each carrying `--char-index` (and `--char-total`), so the shipped `.char-stagger` CSS staggers them into a kinetic entrance — and the WHOLE thing stays accessible: a screen reader hears "Fourier" as ONE word (an `aria-label` on the wrapper + `aria-hidden` on the per-glyph spans), never "F. o. u. r. i. e. r." spelled out. The split is the load-bearing JS half the shipped CSS recipe has been waiting for: glass-ui ships `.char-stagger > .char { animation-delay: calc(var(--char-index) * 30ms) }` but NO way to MINT the `.char` spans + their `--char-index` without every hero hand-rolling a `text.split('').map(...)`. This wave is the partner — split once, accessible by construction, on the per-spring clock.

## Starting state (MEASURED, file:line)
The CSS recipe ships; the JS partner does not — every consumer hand-rolls the split.

- **The CSS recipe is shipped + correct** (`src/styles/typography/utilities.css:155-159`): `.char-stagger > .char { display: inline-block; animation: fade-in var(--spring-smooth-duration) var(--spring-smooth, ease) backwards; animation-delay: calc(var(--char-index, 0) * 30ms); }`. It reads `--char-index` per glyph + rides `--spring-smooth-duration` (the per-spring clock — `BC.W-MOTION-ONE-CLOCK` P4-compliant) on `fade-in` `backwards` (the entrance plays from the pre-mount state). The recipe is RIGHT; it has no producer.
- **There is NO `<SplitChars>` / `useCharStagger`** (`grep -rln "SplitChars\|useCharStagger\|CharStagger" src/` → **exit 1 (empty)**). Nothing in the library mints the `.char` spans + the `--char-index`/`--char-total` customs. So a consumer that wants the kinetic entrance hand-rolls `text.split('').map((c,i) => h('span', { class:'char', style:{'--char-index':i} }, c))` — and routinely forgets the `aria-label`/`aria-hidden` (the per-glyph spans spell the word to AT).
- **The engine-free precedent is `/motion-core`** (`src/composables/motion/core/index.ts`): `vReveal` (the `[data-reveal]` ObjectDirective), `usePointerVelocityField`, `useStaggerReveal` — all vue-only leaves on `/motion-core` (+ root-barrel-eligible where heavy-peer-free). `useCharStagger`/`<SplitChars>` are the SAME shape: pure DOM split + custom-property write, `vue` only (no `@mkbabb/keyframes.js`, no `@vueuse/core`).
- **The a11y label is the load-bearing fact** (FOURIER-INBOUND #6, verbatim "+ an accessible full-text label"): a per-glyph split with no full-text label is an AT regression — the wrapper MUST carry the word as one accessible name. This is the half every hand-roll drops.
- **`--char-total` is the missing companion** (the CSS reads `--char-index` only at HEAD): a consumer that wants a reverse/center-out stagger, or a `calc()` proportional to length, needs `--char-total` (the glyph count) on the wrapper. The partner mints both.

## Target spec (grounded numbers/API)

### 1. `useCharStagger(target, opts)` — the split composable (on `/motion-core`, engine-free)
```ts
// @mkbabb/glass-ui/motion-core (vue-only — no @mkbabb/keyframes.js, no @vueuse/core;
// the vReveal/usePointerVelocityField engine-free leaf set)
export interface UseCharStaggerOptions {
  /** Split unit. "char" (default) | "word" (split on whitespace, keep the word
   *  as the .char unit) | "grapheme" (Intl.Segmenter — emoji/combining-mark safe). */
  by?: "char" | "word" | "grapheme";
  /** Preserve whitespace as non-animating spacer spans (default true — so the
   *  word spacing survives the inline-block split). */
  preserveWhitespace?: boolean;
  /** Write --char-total on the wrapper (for length-proportional / center-out
   *  stagger). Default true. */
  writeTotal?: boolean;
}
export interface UseCharStaggerReturn {
  /** Re-run the split (post-text-change). Idempotent — clears the prior spans. */
  split: () => void;
  /** The resolved glyph count. */ count: Ref<number>;
}
export function useCharStagger(
  target: MaybeRefOrGetter<HTMLElement | null>,
  opts?: UseCharStaggerOptions,
): UseCharStaggerReturn;
```
`useCharStagger` reads the target's `textContent`, splits it per `by`, and replaces the content with `<span class="char" style="--char-index:N" aria-hidden="true">glyph</span>` spans (+ whitespace spacers when `preserveWhitespace`), writes `--char-total` on the target, and **sets `aria-label` to the original full text + `role` left intact** (the AT hears the word once, the spans are `aria-hidden`). It MUTATES the DOM (the split is a one-time content rewrite, re-runnable via `split()` on a text change — the `useTextHighlight` DOM-aware precedent). Grapheme mode uses `Intl.Segmenter` (emoji/ZWJ-sequence safe — never splits a 👨‍👩‍👧 into 4 chars). NO animation engine: the composable mints the spans + customs; the `.char-stagger` CSS owns the motion (the shipped recipe).

### 2. `<SplitChars text :by? :as?>` — the component face
```ts
// @mkbabb/glass-ui/motion-core + the root barrel (engine-free; the vReveal precedent)
// <SplitChars text="Fourier" /> renders:
//   <span class="char-stagger" aria-label="Fourier">
//     <span class="char" style="--char-index:0" aria-hidden>F</span> … (--char-total:7)
//   </span>
```
Props: `text: string` (the word — REQUIRED, the accessible label source), `by?` (the split unit, default `"char"`), `as?: string | Component` (the wrapper tag, default `"span"`, reka-`Primitive` idiom so it renders as a heading/etc). The component composes `useCharStagger` on its own root + binds `.char-stagger` (so the shipped CSS staggers it) + sets `aria-label="{text}"`. A `#default` slot is NOT the path (the text is a PROP so the accessible label is unambiguous — a slot would split arbitrary markup); `text` is the single source for both the split AND the label. The component re-splits on `text` change (the watcher → `split()`).

### 3. The accessible label is BY CONSTRUCTION
The wrapper carries `aria-label={text}` (the full word), every `.char` span carries `aria-hidden="true"`. So AT reads the word once; the kinetic glyphs are invisible to AT. This is the load-bearing fact (FOURIER-INBOUND #6) — the partner makes it impossible to ship the split WITHOUT the label (the prop IS the label source). A consumer hand-roll could forget it; `<SplitChars>` cannot.

### 4. PRM — the entrance drops, the text stays
The `.char-stagger` CSS entrance is a `fade-in` animation; under `prefers-reduced-motion: reduce` the shipped PRM carve (the library-wide `a11y-overrides.css` animation snap) collapses it to the terminal (the glyphs paint in-place, no stagger) — the text is ALWAYS present (the split is structural, the animation is the flourish). `useCharStagger` does the split unconditionally (the spans + customs are structural); only the CSS animation is PRM-gated (the shipped recipe). The partner adds NO PRM logic — it inherits the recipe's.

### The numbers (the bake table)
| axis | TARGET | source |
|---|---|---|
| split unit | `char` (default) / `word` / `grapheme` (`Intl.Segmenter`) | FOURIER-INBOUND #6 |
| per-glyph custom | `--char-index` (0..n-1) on each `.char` | `typography/utilities.css:158` |
| wrapper custom | `--char-total` (the glyph count) | the missing companion |
| a11y | `aria-label={text}` on the wrapper + `aria-hidden` on every `.char` | FOURIER-INBOUND #6 (the load-bearing label) |
| motion | the shipped `.char-stagger` CSS (`--spring-smooth-duration`/`--spring-smooth`, P4) | `typography/utilities.css:155-159` |
| subpath | `/motion-core` (engine-free) + root barrel (the `vReveal` precedent) | `motion/core/index.ts:45` |
| PRM | the shipped recipe's carve (the split is structural, the animation drops) | `a11y-overrides.css` |

## Mechanism / files
- **NEW `src/composables/motion/useCharStagger.ts`** — the split composable (vue-only; reads `textContent`, mints `.char` spans + `--char-index`/`--char-total`, sets `aria-label`, `Intl.Segmenter` grapheme mode). Re-exported from `src/composables/motion/core/index.ts` (the `/motion-core` engine-free barrel, beside `vReveal`).
- **NEW `src/components/custom/split-chars/`** (the colocation dir — `SplitChars.vue` + `index.ts` + `README.md`) — the reka-`Primitive` face composing `useCharStagger` + `.char-stagger` + `aria-label`. Published on `/motion-core`'s component re-export OR a `/split-chars` subpath + the root barrel (engine-free → root-barrel-eligible; VERIFY the SCC walk shows no heavy-peer leak — `useCharStagger` is vue-only, so it is root-barrel-safe like `vReveal`).
- **Edit `src/api/index.ts`** — publish `UseCharStaggerOptions`/`UseCharStaggerReturn` on the `/api` discovery surface.
- **READ-ONLY (fenced):** the shipped `.char-stagger` CSS (`typography/utilities.css:155-159` — CONSUMED, the partner mints the spans the recipe styles; NOT re-authored); the `--spring-smooth-duration` clock (`BC.W-MOTION-ONE-CLOCK`'s — read, not retuned).
- **Edit `demo/stories/`** — a hero word + a multi-word headline exerciser (the `<SplitChars text="...">` kinetic entrance + the AT-label readback) — the demo binary consumer.
- **The ONE split:** `useCharStagger` is the single producer of `.char` spans + `--char-index`; `<SplitChars>` is the component face over it. No second split path.

## Acceptance (machine gate born-RED + behaviour-π + a11y)
1. **Machine gate `proof:split-chars`** (born-RED on HEAD → GREEN; device-free SOURCE arm `["local","ci"]`, `scripts/proof-split-chars.mjs`):
   - **SP1 — the partner exists ONCE on `/motion-core` + engine-free.** `useCharStagger` exported from `src/composables/motion/core/index.ts`; the file imports `vue` only (no `@mkbabb/keyframes.js`, no `@vueuse/core` — the `/motion-core` leaf bar). Born-RED (no such export at HEAD). Self-test bite: a planted heavy-peer import reds.
   - **SP2 — the accessible label is mandatory (the load-bearing a11y fact).** `useCharStagger` SETS `aria-label` to the full text AND sets `aria-hidden` on every `.char` span; `<SplitChars>` requires the `text` PROP (the label source). Born-RED (no partner). Self-test bite: a split path that omits the `aria-label`/`aria-hidden` reds; a `<SplitChars>` without a `text` prop reds.
   - **SP3 — the `--char-index`/`--char-total` customs are written.** Each `.char` span carries `--char-index`; the wrapper carries `--char-total`. The split mints the customs the shipped `.char-stagger` recipe reads. Born-RED (no producer). Self-test bite: a split missing `--char-index` reds.
   - **SP4 — no second split + the CSS recipe is consumed not re-authored.** The `.char-stagger` CSS (`typography/utilities.css:155-159`) is UNTOUCHED (the partner mints the spans it styles); no second per-glyph stagger recipe is minted. Born-RED if a parallel recipe lands. Self-test bite: a planted second `.char-stagger`-equivalent recipe reds.
   - **SP5 — ≥2-consumer record.** `docs/consumer-evidence/split-chars.md` names the binary consumers: the demo hero story + the per-tranche hero pages (`<StoryHeader>`/`<StoryHero>` display `<h1>` — every hero is a consumer by construction) + the cross-repo fourier consume. Born-RED (no evidence doc).
   - **+ a self-test bite per clause.**
2. **Behaviour-π / unit `tests/composables/motion/useCharStagger.test.ts`** (headless, device-free — the split is a pure DOM mutation, no GPU):
   - `useCharStagger(el)` on `"Fourier"` mints 7 `.char` spans, each with the right glyph + `--char-index` 0..6, the wrapper `--char-total:7`, the wrapper `aria-label="Fourier"`, every span `aria-hidden="true"`. A re-`split()` after a `textContent` change re-mints idempotently (no accreted spans).
   - `by:"grapheme"` on `"a👨‍👩‍👧b"` mints 3 units (the family emoji is ONE `.char`, not 4 — `Intl.Segmenter`), the AT label is the full string.
   - `by:"word"` on `"Hello World"` mints 2 word units + the whitespace spacer (when `preserveWhitespace`).
3. **a11y assertion (the AT-label, the load-bearing fact):** an axe/aria check on a `<SplitChars text="Fourier">` render asserts the accessible NAME is `"Fourier"` (one word) — NOT the per-glyph spell-out; the `.char` spans are `aria-hidden`. (The `a11y-debugging` skill pattern; born-FAIL on a label-less hand-roll.)
4. **CAPTURED-PAINT (rides the hero consumer):** the kinetic entrance is captured on the demo hero story (the `<SplitChars>` glyphs stagger in on the per-spring clock; under PRM they paint in-place) — the binding paint rides the hero's own capture (a pure motion leaf's gate is the unit + a11y; the paint is the consumer's, the `BC.W-GESTALT-FIRST` per-consumer-paint discipline). Annotated in `docs/tranches/BC/audit/visual/W-SPLIT-CHARS-DELTA.md` (the staggered entrance + the AT-label readback).

## Fences / invariants (must NOT regress)
- **The a11y label is BY CONSTRUCTION (binding).** The `text` prop IS the label source; the spans are `aria-hidden`. A split that spells the word to AT is the regression this wave exists to prevent — SP2 reds it. The partner makes the correct path the ONLY path.
- **Engine-free leaf** — `useCharStagger` imports `vue` only (SP1); it ships on `/motion-core` (+ root-barrel-eligible like `vReveal`), NEVER the keyframes-bearing `/motion` barrel.
- **The CSS recipe is CONSUMED, not re-authored** — the shipped `.char-stagger` (`typography/utilities.css`) owns the motion (the per-spring clock, the PRM carve); the partner only mints the spans + customs (SP4). No second stagger recipe; the partner adds no animation engine.
- **PRM is the recipe's** — the split is structural (always present); only the CSS `fade-in` animation is PRM-gated (the shipped `a11y-overrides.css` carve). The partner adds no PRM logic (it inherits the recipe's — the text never vanishes under reduce).
- **The split is idempotent** — `split()` clears the prior spans before re-minting (no accreted DOM on a text change; the `useTextHighlight` re-paint discipline).
- **`Intl.Segmenter` for graphemes** — the `by:"grapheme"` mode is emoji/combining-mark safe (never splits a ZWJ sequence). A naive `text.split('')` (the hand-roll) breaks emoji; the partner does not.
- **Clean break, no alias** (MEMORY): the partner is net-new (no existing JS to retire); the consumers' hand-rolled splits delete on adopt (their repos — the foreign-tree fence for fourier).

## Folds + the cross-repo consume-seam
- **FOURIER-INBOUND #6 (SplitChars / useCharStagger)** — **DECIDED — BUILD (≥2 by construction):** the `useCharStagger` split composable + `<SplitChars>` face + the mandatory accessible label. The ≥2-consumer bar is MET by construction (every hero is a consumer — the demo hero + the per-tranche `<StoryHeader>` display `<h1>` + the cross-repo fourier consume).
- **The cross-repo consume-seam (the green-handshake):** fourier consumes `<SplitChars>`/`useCharStagger` at the 4.1.0 cut — it deletes its hand-rolled per-glyph split (the `text.split('').map(...)` hero pattern) onto the partner (the accessible label arrives for free). The published-version is **4.1.0**; the consumer-delete-trigger is the `^4.1.0` bump (THEIR repo edit — the foreign-tree fence). No upstream ask owed (the split is pure DOM + `Intl.Segmenter`, no value.js/kf dependency). Recorded in `docs/tranches/BC/coordination/FOURIER-BC.md`.
