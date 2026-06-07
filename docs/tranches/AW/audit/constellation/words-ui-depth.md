# words-ui-depth — words is a mature, deep glass-ui consumer whose UI subsystems mostly fit glass-ui ALREADY; the few honest gaps are a broken dark-mode FOUC chain and a stubbed Word-of-the-Day, NOT new AURORA/BLOB/ATOMS demand.

Lane scope: words/Floridify's dictionary UI *in depth* — search UX, definition rendering, etymology, saved lists, settings, dark-mode wiring — mapped against glass-ui fits honestly. Companion lanes `words-consumption.md` / `words-adoption-gap.md` / `words-tranche-idiom.md` own the breadth/wiring/idiom verdicts; this lane goes INTO the screens and reports what the others could not see from the import graph. All cites read at HEAD today (`words` @ master d11640d; installed glass-ui `3.0.0`).

## Findings

### 1. Dark-mode FOUC script reads a DEAD localStorage key — dark users flash light on every load
The index.html anti-FOUC script reads `localStorage['ui-state'].theme` and toggles `.dark` from it (`frontend/index.html:42-47`):
```js
var uiState = JSON.parse(localStorage.getItem('ui-state') || '{}');
var theme = uiState.theme || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');
```
But the `ui` Pinia store NO LONGER holds `theme` — `stores/ui/ui-state.ts:9` is `defineStore('ui', …)` with only `sidebarOpen`/`sidebarCollapsed` refs and an explicit comment "Theme / dark-mode is managed by glass-ui's useGlobalDark — see App.vue" (`ui-state.ts:5`). Meanwhile glass-ui's `useGlobalDark` (App.vue:29) is built on **vueuse `useDark({disableTransition:false})` with DEFAULT options** (verified in the installed chunk `node_modules/@mkbabb/glass-ui/dist/useGlobalDark-PMiP5Jku.js:4`), so the real persisted key is vueuse's default **`vueuse-color-scheme`** (values `dark`/`light`/`auto`) — NOT `ui-state.theme`. The FOUC script therefore always falls to `'light'`, so a dark-mode user sees a white flash before hydration on every cold load. This is a real, user-visible defect that the import-graph lanes could not detect.
**Fix is words-side and 3.3.0-independent** — point the inline script at `vueuse-color-scheme`, OR adopt glass-ui's own FOUC front door. At 3.0.0 the `/dark` subpath already exports `installDarkModeSync` (`dist/dark.d.ts:1`) but that is a post-mount RAF callback, not a pre-paint snippet; glass-ui's pre-paint `darkModeSyncScript()` string-emitter (the AU.W9 line in CLAUDE.md) is NOT in the installed 3.0.0 dist — it lands on a later cut. So the cheapest correct fix today is one-line: read `vueuse-color-scheme` (with the `JSON.parse`-or-bare fallback vueuse uses).

### 2. Search UX is a bespoke multi-mode shell — glass-ui `Command` is an HONEST NON-FIT
The lane brief floats `Command` (the cmdk palette) for "search-first UX." After reading the subsystem (40+ files under `components/custom/search/`), this is a deliberate non-fit:
- The input is an **auto-growing `<textarea role="searchbox">`** (`search/components/SearchInput.vue:2`, resize logic :80-105) that supports multi-line AI queries (`aiMode` doubles `maxHeight`, :93) — `Command`'s `CommandInput` is a single-line `<input>`.
- Autocomplete is **inline ghost-text** painted behind the input (`search/components/AutocompleteOverlay.vue:13-15` — an invisible `{{query}}` spacer + a truncated gray completion), a type-ahead idiom `Command`'s filtered listbox does not express.
- The shell carries mode-switching (lookup / wordlist / word-of-the-day), AI-query detection (`composables/useAIQueryDetection.ts`), semantic-status polling, focus management, and 18 dedicated composables. This is a richer paradigm than `Command` models.
glass-ui `Command` DOES ship in 3.0.0 (`dist/command.js` present) and words imports ZERO of it (`grep Command` in `search/` empty). **Verdict: leave it. Do not propose a Command migration.** The bespoke shell is the right design; forcing `Command` would be a regression.

### 3. Definition rendering already sits on glass-ui `Card` structure — W23/W24 fit is INNER, not the headline surface
The definition subsystem (70+ files under `components/custom/definition/`) imports glass-ui `/card` at 8 sites (`WordHeader`, `ThesaurusView`, `PhrasesSection`, `Etymology`, `DefinitionContentView`, `DefinitionContentRenderer`, `SynonymChooser`, `DefinitionSkeleton`) — using `CardContent`/`CardHeader` as structural pieces (`Etymology.vue:50` `import { CardContent }`). The OUTER headline surface is the consumer-owned **`ThemedCard`** (`DefinitionDisplay.vue:4,21,64`), a gold/silver/bronze mastery-variant card with sparkle + border-shimmer + paper texture (`card/ThemedCard.vue:1-112`). ThemedCard correctly composes glass-ui's `shadow-cartoon-lg` utility (`ThemedCard.vue:4`) and rides `var(--paper-*-texture)` tokens.
**W23/W24 (glass-card perfection) is relevant only at the INNER `CardContent`/`CardHeader` sites** — words benefits IFF those waves keep the `Card*` subcomponent class-names + the `--paper-*-texture` token names stable. ThemedCard itself is consumer identity (the "presets in consumers" precept) and is NOT a convergence candidate. Honest scope: W23/W24 must not rename `CardContent`/`CardHeader` or the paper tokens, or 8 definition sites + the app-shell backplate (`App.vue:94` reads `--paper-clean-texture`) break.

### 4. Etymology is FLAT PROSE, not a tree — the "etymology tree?" hypothesis is a NEGATIVE
`Etymology.vue` renders `etymology.text` (run through `parseContentBlocks` → `ContentBlockRenderer`) plus two flat fields `etymology.language` / `etymology.period` (`Etymology.vue:25-43`). There is no recursive/nested origin structure, no tree component, no `Tree`/recursion anywhere. So there is NO glass-ui tree-primitive fit here, and glass-ui ships no tree primitive anyway. Honest negative — do not invent an etymology-tree adoption.

### 5. Word-of-the-Day is a STUBBED mode — a genuine, small, already-in-hand glass-ui fit
Home.vue carries a `word-of-the-day` search mode whose body is literally `Word of the Day mode coming soon...` (`views/Home.vue:74-77`). When words builds it, the headline reveal fit is **`TypewriterText`** — which words ALREADY adopts for the animated word title (`definition/components/AnimatedTitle.vue:11,19` with a tuned ngram/error-rate/cursor config :21-34) — over an inner glass `Card`. This is the single concrete new-UI surface in words where a glass-ui primitive cleanly applies, and the primitive is already wired elsewhere so adoption cost is near-zero. Not an AW wave (it's a words-app feature), but worth noting as the one live "glass-ui fits a new screen" point.

### 6. The collapse-dock used in the definition theme toolbar IS on the 3.3.0-regressed path
`ThemeSelector.vue:6` mounts `<GlassDock ref="dockRef" manual :start-collapsed="!editModeEnabled">` with a `#collapsed` slot (`ThemeSelector.vue:8-19`), a default expanded slot (:22-85), and programmatic `dockRef.value?.expand()` (`ThemeSelector.vue:178`). This is EXACTLY the simple two-layer collapse path AW.W1 fixes — "the default + `#collapsed` slot path" whose width-morph froze in 3.3.0 (glass-ui `docs/tranches/AW/AW.md:72`). It is admin-gated (`v-if="isMounted && isAdmin"`, `ThemeSelector.vue:3`) so the blast radius is the admin definition-editing toolbar, but it IS a live regression-exposed mount in the definition UI specifically. The other two dock mounts (`WordListView.vue:22,109`) are `always-expanded` and immune. **Depth-lane confirmation of the consume-path verdict: words' definition UI itself depends on the AW.W1 fix → consume target 3.4.0, never ^3.3.0.** (The breadth lane flagged the mount; this lane confirms it sits in the definition-rendering screen, not a peripheral.)

### 7. Saved-lists (wordlist) UI is richly glass-wired; no gap
The wordlist subsystem (`components/custom/wordlist/`) consumes `/button`, `/dock` (always-expanded toolbars, `WordListView.vue:22,109`), `/confirm-dialog`, `/forms` (Input/Textarea in the create/edit/notes modals — `CreateWordListModal.vue:219`, `EditWordlistModal.vue:160`, `EditWordNotesModal.vue:47`), `ConfirmDialog` for deletes (`SidebarWordListItem.vue:113`), and `DropdownMenu` for per-item actions (`SidebarWordListItem.vue:112`). Mastery progress uses local gradient utilities (`index.css:195-207` `.mastery-bar-gold/silver/bronze`) — these are consumer identity, NOT a glass-ui `Progress` gap (the gradients are bespoke mastery semantics). Honest: no glass-ui gap in saved-lists; it is already saturated.

### 8. No dedicated settings view — preferences live in a Popover; correctly glass-wired
There is no `Settings.vue`; user prefs surface through a `Popover` in `SidebarHeader.vue` (`Popover`/`PopoverTrigger`/`PopoverContent` from `/popover`, :82) hosting the `DarkModeToggle` from `/controls` (`SidebarHeader.vue:80`). The dark-mode toggle CONTROL is fully adopted from glass-ui — only the FOUC pre-paint chain (Finding 1) is broken, not the in-app toggle. No settings-surface gap.

### 9. Package hygiene: two dead glass-ecosystem-adjacent deps
`vue-sonner`/`sonner` are declared deps (`package.json`) but UNUSED in src (`grep vue-sonner|from 'sonner'` empty) — glass-ui's `/toast` is the real toast path (`plugins/toast.ts:1`, App.vue:18 `Toaster`). `tailwind-merge` is also a dead dep (`grep tailwind-merge|twMerge` in src empty) — glass-ui ships `cn()` with its own deduplicator (consumed at `SidebarHeader.vue:78`). Both are removable; minor, words-side, publish-independent.

## Wave-forming input

These are inputs for the consumer-side fix list and for AW wave token-stability invariants — words mints NO new glass-ui wave from the depth read.

- **[words-side, 3.3.0-independent] Fix the dark-mode FOUC chain (Finding 1).** Scope: `frontend/index.html:42-47` — repoint the pre-paint snippet at vueuse's `vueuse-color-scheme` key (not the dead `ui-state.theme`). Gate sketch: a Playwright cold-load with `localStorage['vueuse-color-scheme']='dark'` asserts `<html class>` carries `dark` BEFORE first paint (no light→dark flip in the first frame). File bounds: index.html only. Sequencing: independent, can land today, no glass-ui publish dependency.
- **[AW.W23/W24 invariant] Keep `Card*` subcomponent class-names + `--paper-*-texture` token names stable (Finding 3).** The glass-card perfection band must not rename `CardContent`/`CardHeader` or the `--paper-{clean,aged}-texture` tokens — 8 definition sites + `App.vue:94` + `Card.vue:57` read them. Add to any W23/W24 spec as a fleet-stability note.
- **[AW.W30 invariant] Carousel API stability (Finding, ImageCarousel).** `definition/.../media/ImageCarousel.vue:89-90` imports `useCarousel`-family + `CarouselApi` type from `/carousel`. If W30 redesigns carousel, the `CarouselApi` type + the `/carousel` composable surface must remain — words' image carousel binds it directly.
- **[AW.W1 sequencing edge] words' definition theme-toolbar dock is regression-exposed (Finding 6).** Confirms words' consume target is 3.4.0 (post-AW.W1). No words change required at the mount (prop-stable); the dependency is purely on the fix shipping.
- **[words-side hygiene] Remove dead `vue-sonner`/`sonner`/`tailwind-merge` deps (Finding 9).** Trivial, publish-independent.

## Anti-findings (verified FINE / already done)

- **TypewriterText is already adopted** for the animated word title with a tuned config (`AnimatedTitle.vue:11-34`) — the word-of-the-day reveal primitive is in-hand; no adoption cost.
- **The search shell correctly does NOT use `Command`** (Finding 2) — bespoke multi-mode textarea + ghost-autocomplete is the right design; `Command` would regress it.
- **Definition card structure already rides glass `Card*`** (Finding 3) — inner structure is glass-ui; the outer ThemedCard is correct consumer identity (presets-in-consumers precept), composing `shadow-cartoon-lg` properly.
- **`DarkModeToggle` control fully adopted** (`SidebarHeader.vue:80`) — only the pre-paint FOUC snippet is broken, not the in-app toggle.
- **vueuse-bearing subpath discipline is clean in every UI subsystem read** — `/dark` (App.vue:20, useStateSync.ts:5), `/forms` (5 wordlist+search modal sites), `/carousel` (ImageCarousel.vue:89). No root-barrel leak of a vueuse-bearing symbol.
- **CSS wiring is correct in cascade order** — `@import 'tailwindcss'` → `tw-animate-css` → `@mkbabb/glass-ui/styles` → project extensions (`index.css:1-3,123-125`), `@variant dark` present (:6). (The `@source` content-scan absence is the breadth lane's finding; not re-litigated here.)
- **Etymology needs no tree primitive** (Finding 4) — flat prose by data shape.
- **Saved-lists + settings surfaces are saturated with glass-ui** (Findings 7-8) — no UI gap.

## Summary

words/Floridify's dictionary UI read IN DEPTH is a mature, well-fitted glass-ui consumer: the search shell, definition rendering, saved-lists, and settings surfaces are already correctly built on glass-ui primitives or on legitimate consumer-owned identity. The depth read surfaces THREE findings the import-graph lanes could not: (1) the index.html anti-FOUC script reads a DEAD `localStorage['ui-state'].theme` key — the `ui` store dropped `theme` and glass-ui's `useGlobalDark` persists to vueuse's `vueuse-color-scheme` instead — so dark-mode users flash light on every cold load (words-side fix, 3.3.0-independent); (2) the definition admin theme-toolbar mounts the exact `manual`+`#collapsed` GlassDock path the 3.3.0 regression freezes (`ThemeSelector.vue:6`), confirming the definition UI itself depends on AW.W1 → consume 3.4.0; (3) the `word-of-the-day` mode is a literal "coming soon" stub (`Home.vue:77`) whose reveal cleanly fits the already-adopted `TypewriterText`. Honest negatives: `Command` is the WRONG fit for the bespoke multi-mode textarea search (leave it); etymology is flat prose with no tree fit; no AURORA/BLOB/GLASS-ATOMS demand from any screen. AW asks reduce to token/class-NAME stability invariants on already-planned waves (W23/W24 `Card*`+paper tokens, W30 `CarouselApi`) plus two words-side hygiene fixes (the FOUC key, three dead deps).

Digest: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/words-ui-depth.md
