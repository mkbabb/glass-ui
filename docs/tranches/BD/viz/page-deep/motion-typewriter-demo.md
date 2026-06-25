# Pass-E META-STORYBOOK DEMO audit — motion/typewriter

- **Page:** `motion/typewriter` · import label `@mkbabb/glass-ui/typewriter`
- **SFC:** `demo/stories/motion/typewriter.vue`
- **Manifest:** `demo/stories/manifest.ts:317` (path-label) · `:1102` (row, no explicit bg → category default) · `:191` (`motion: "constellation"`)
- **Live:** http://localhost:5173/motion/typewriter (verified 2026-06-23)
- **Substrate (live, verified):** `canvasCount: 1` — the faint near-monochrome CONSTELLATION field. NOT aurora.

The demo is FUNCTIONALLY correct (the typewriter types, deletes, cycles, the cursor blinks, controls drive it live) but it FAILS the BD design north-star on FIVE of seven axes: glass suffusion (no live colorful field + the sub-cards aren't glass), structure (no per-subsection GLASS cards + a duplicated title), component-series composition (thin — no dock/tab/aurora/procedural), main-card sizing, and a real double-title BUG. Path-label is already standardized; language carries one tightening.

---

## (1) DEMO CONGRUENCE — partial, the full API is UNDER-exercised

The page shows TWO good register cases — the word-ROTATION mode (`:words` cycling 5 phrases, hero, `typewriter.vue:67-77`) and the SINGLE-TEXT mode (`text="npm install …"`, `:loop="false"`, CLI, `:97-106`). That correctly teaches the two driving shapes.

**GAPS — the component's rich API is mostly hidden:**
- `:interactive="false"` is hardcoded on BOTH instances (`:76`, `:105`). The component's marquee feature is **interactive backspace** — click a character mid-word and it backspaces to it (`TypewriterText.vue:165-175`, `handleCharClick` → `backspaceToPosition`). The demo never shows it. This is the single most distinctive affordance of the primitive and it is switched OFF.
- `errorRate` IS exposed as a slider (good — the human-typo engine is the component's signature) BUT the other rich knobs are invisible: `ngramSize`, `variance`, `continueAfterTypoProbability`, `sequentialTypoDecay`, `correctionSpeedMultiplier`, `firstAnimationSpeedFactor` (`TypewriterText.vue:47-58`). The typo MODEL (continue-after-typo, sequential decay, n-gram chunking) is the architectural depth of this component and none of it is demoed.
- The exposed imperative API (`startTyping`/`stopTyping`/`pause`/`resume`/`forceWord`/`setCharPosition`, `:201-213`) is never exercised — the "Restart" button is a crude `:key` REMOUNT (`remountKey`, `:35-37`) rather than calling the real `reset()`/`startTyping()` it `defineExpose`s. A demo of a control primitive should drive its OWN API, not nuke-and-remount.
- `wordComplete`/`complete`/`start` emits are unused — no live "current word index" / completion readout.
- **Contextual switching:** ZERO. No register/preset switcher. A typo-PERSONA picker ("careful · average · sloppy · code") mapping onto the typo-model knobs would be the natural contextual-switch demo and would exercise the dock APIs (see §2).

## (2) COMPONENT ABILITY — THIN

Live + source confirm the page composes: 2× `<TypewriterText>` (the subject), 2× `<Slider>`, 2× `<Switch>`, 1× `<Label>`×4, 1× `<Button variant="secondary">`. That is a controls strip, not "a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)."

- **ZERO docks composed by the page** (the 2 `.glass-dock` on screen are AppShell shell chrome). The BD ask "leverage the dock APIs (contextual switching/animating)" is unmet. A `<DockStack mode="facets">` / `<DockLayerGroup>` typo-persona switcher would showcase the contextual-switch + morph APIs AND re-seed the typewriter live.
- **ZERO `<SegmentedTabs>`** — a rotation-mode ⇄ CLI-mode ⇄ interactive-playground tab axis is the obvious switcher.
- **ZERO procedural-anim** composed by the page (the lone canvas is the BACKGROUND constellation).
- **ZERO real glass cards** (`<Card>` / `glass-floating`) — the sections are raw `bg-card`/transparent wrappers (see §4).
- The `<Button variant="secondary">` is the only library interactive atom, and it only triggers a remount.

## (3) GLASS SUFFUSION — WEAK / wrong substrate

- **background resolves to `constellation`** (`manifest.ts:191`, the motion category default; the row at `:1102` passes no explicit bg). North-star: "glass demos over COLORFUL aurora backgrounds." Constellation is a sparse near-monochrome dot field — live `_cap` shows it as faint grey specks. Even if the cards WERE glass, there is no chroma behind them to refract.
- **The sub-cards are NOT glass.** Live computed styles:
  - Hero section: `bg-card` = `rgb(251, 248, 244)` OPAQUE, `backdrop-filter: none`, `+ paper-grain-overlay` (`typewriter.vue:56-63`). So the hero is a PAPER register (opaque cream + grain) — fine in isolation, but it occludes the field; the six-layer glass composite is absent.
  - CLI section: `bg-background/50`, `backdrop-filter: none` (`:88-95`) — a translucent panel but NO blur, so not glass morphism.
  - Controls section: `bg-card/60`, `backdrop-filter: none` (`:111-117`) — same, translucent but un-blurred.
  - **No section anywhere reads `backdrop-filter: blur()`** — the glass tier ladder (`glass-floating`/`glass-card`) is never composed. The morphism the page is meant to suffuse is entirely absent.
- **PAPER morphism:** PRESENT and apt on the hero (`paper-grain-overlay` + `font-display`), but it is the ONLY register and it is opaque, so it cannot demonstrate the glass-over-field read the north-star wants. The page is currently a flat paper page, not a glass page.

## (4) STRUCTURE — FAILS the core mandate

- **Sub-sections are NOT each in their own GLASSY card.** Of the 4 top-level blocks: `<header>` (transparent), hero `<section>` (opaque paper card), CLI `<section>` (`flex flex-col gap-2` — **fully transparent**, NO card, `bg: rgba(0,0,0,0)` confirmed live — the label + a translucent inner panel float bare), controls `<section>` (translucent panel). The user's binding ask — "each sub-section in its OWN glassy card" — is unmet: the CLI block has no card at all, and none of the cards are glass.
- **Main card area too small.** Article width 1152px on a 1440px viewport (`--story-page-max-inline`) — generous side gutter. The hero stage is `min-h-48` (`:60`) — cramped for the flagship motion specimen, which should be the page's big focal canvas. The user asks "the main card area BIGGER (more screen space)."
- The page is a bare `<StorySection>`-less flat stack of hand-rolled `<section>` blocks delimited only by the chassis hairline rules — not the per-card structure the mandate wants.

## (5) PATH-LABEL — OK ✓

Chip resolves `@mkbabb/glass-ui/typewriter` (`manifest.ts:317`, live-confirmed in the chrome header chip). Standardized, matches the component subpath. No action.

## (6) LANGUAGE — minor tighten

- Header comments are light (`typewriter.vue:3` one-liner) — acceptable, not bloated like peers.
- The `BB.W-SUFFUSE3` inline wave-tag comment block (`:42-44`) is internal-tranche prose in a shipped demo SFC — strip it (the peer-page pattern).
- The section HTML comments ("Hero display: Plus Jakarta Sans display type…", "Secondary: single-line, monospace, for code-style typing.", `:55,:83`) are fine as authoring notes but the masthead/title duplication they describe is the actual bug (§7).
- No user-facing blurb bloat on THIS SFC (the dense blurb lives in the manifest row `:1102`, which is acceptable manifest copy).

## (7) BUGS

- **DOUBLE TITLE (real, live-confirmed).** The chrome `<h1>` "Typewriter" (StoryPage header, `variant="page"`, black, `_cap` top) PLUS the in-card masthead `<span class="text-display-3">Typewriter</span>` in violet (`typewriter.vue:45-53`) directly below it. Two "Typewriter" titles stacked. The hand-rolled in-card `<header>` masthead (`:45-53`) predates the StoryHeader chassis cluster and duplicates the page chrome `<h1>` — remove it (the same defect flagged on `motion/springs`).
- **Restart is a remount, not the API.** `restart()` bumps `remountKey` (`:35-37`) forcing Vue to destroy+recreate both `<TypewriterText>` — instead of calling the exposed `reset()`/`startTyping()`. Functionally works but is the wrong demo posture (it hides the imperative API and discards component state on every press).
- No dead demo / broken animation — the typewriter types, deletes, cycles, errors+corrects, and the cursor blinks correctly (live-verified: mid-flight `Built on wa|`).

## Recommended redesign (gestalt, not patch)

1. **Remove the duplicate in-card masthead `<header>`** (`:45-53`) — the chrome `<h1>` already titles the page.
2. **Wrap each sub-section in its OWN glass card** (`<Card>` / `glass-floating`), and compose the hero typewriter inside a LARGE focal glass plate.
3. **Switch the background to a contained colorful `aurora`** (or override `background: "aurora"` on the manifest row) so the glass reads over chroma — the north-star substrate. Keep the paper-grain register as a SECONDARY (e.g. the CLI card) for the GLASS+PAPER duality.
4. **Compose the dock APIs:** replace the bare controls strip with a `<DockStack mode="facets">` / `<DockLayerGroup>` typo-PERSONA switcher ("careful · average · sloppy · code") that re-seeds the typo-model knobs live — the contextual-switch + morph demo the BD ask names.
5. **Turn `:interactive` ON** in a dedicated "click-to-backspace" playground card — surface the component's signature affordance.
6. **Drive the real imperative API** (`reset()`/`startTyping()`/`pause()`/`forceWord()`) from `<Button>`s, and show the `wordComplete`/`currentWordIndex` readout — not a `:key` remount.
7. **Enlarge the hero stage** (`min-h-48` → taller focal canvas) + widen the main card.
8. Strip the `BB.W-SUFFUSE3` wave-tag comment (`:42-44`).
