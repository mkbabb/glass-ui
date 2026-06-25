# Pass-E COMPONENT deep audit — motion/deck (`@mkbabb/glass-ui/deck`)

**Page:** `demo/stories/motion/deck.vue` · **Lens:** component (animation · procedural-viz · perf · Safari · idiomatic/no-legacy · glass six-layer)
**Real src:** `src/components/custom/deck/` — `useDeck.ts` (headless state core, 70L), `useDeckKeyboard.ts` (focus-guarded keydown contract, ~110L), `useDeckSpring.ts` (lazy keyframes count-up easing + `DECK_SPRING`), `DeckPager.vue` (thin `<PagerDots>` wrapper), `constants.ts`, `index.ts`. Subpath barrel `src/deck.ts` → `export * from "../components/custom/deck"`.

The deck is a **HEADLESS PRESENTATION register**, not a painted component. There is NO procedural viz, NO WebGL/WebGPU, and the only DOM the library ships is `<DeckPager>` (which forwards 100% to `<PagerDots>`). This is BY DESIGN (README §"The lift boundary": the deck-APP glue — slide-toggling, scale, hash-sync, swipe, capture/print, the app shell — stays consumer-local; the library lifts only the headless core + the dot pager). So this audit's "component" surface is small and largely correct; the findings are about the SEAMS the headless core exposes to the painted layer and the ONE on-disk animation it controls (the `--spring-deck` slide transition + the lazy count-up easing).

---

## (1) ANIMATION affordance

**What the COMPONENT owns (the real animation surface):**

- **The slide transition is a TOKEN, not a JS write — correct + idiomatic.** `--spring-deck: var(--spring-smooth)` (`scheme-motion.css:274`) + `--ease-spring-deck` bridge (`bridges.css:351`). The slide rides `transform var(--spring-smooth-duration) var(--spring-deck)` + a coupled `opacity var(--duration-fast) var(--ease-out)` (demo `deck.vue` `<style scoped>`). This is exactly the motion-canon split (P1 spatial→spring / effects→bezier, P3 fade-coupled-to-transform, P4 per-spring duration clock, P5 compositor-only translate+opacity, P6 PRM keeps fade drops transform — the `@media (prefers-reduced-motion: reduce)` arm zeroes `transform`, keeps the opacity fade). **No dead/janky animation in the slide path.**
- **The count-up easing is dogfooded + lazy + degrade-safe.** `deckEase.fn` defaults to a monotone cubic-out (`1 - (1-t)³`), swapped in-place to keyframes.js `springTimingFunction(DECK_SPRING).fn` once the HEAVY engine resolves via the dynamic `import("@mkbabb/keyframes.js")` inside `installDeckSpring()`. Idempotent, SSR-safe (`typeof document === "undefined"` guard), and a failed chunk keeps the cubic fallback. This is the SCC-trap discipline done right (`/deck` is keyframes-FREE on the static graph). **No issue.**
- **The pager animation is delegated — `<DeckPager>` re-uses `<PagerDots>`'s `--spring-dock`-clocked active-dot elongation** (`PagerDots.vue:201-203`: `width/height var(--spring-dock-duration) var(--spring-dock)`). The active dot morphs into a pill on the governed spring clock; window-edge dots dim; focus survives a window recompute. This is the ONE pager oracle — no re-fork. **Correct.**

**FINDINGS — the animation GAPS (vs the iOS-27/PROTOTYPE-FIXES bar):**

- **F1 (AUGMENT) — the slide transition is a flat translateX-2rem cross-fade, NOT the iOS-27 liquid entrance.** The demo's slide enter is `translateX(2rem)→0` + opacity, on `--spring-smooth`. Per `W-LIQUID-ENTRANCE-GENERAL` (PASS-E §"3 refined directives"), an iOS-27 surface entrance is a **scale-from-squished + volume-preserving ≈0.88 squish + spring-overshoot + backdrop-engage** — not a near-flat slide. The deck slide is the canonical "whole-surface entrance" case the generalized liquid-entrance primitive should drive. The COMPONENT exposes no entrance seam for this — the demo hand-rolls the transition in scoped CSS. → **AUGMENT `W-LIQUID-ENTRANCE-GENERAL`**: cite deck-slide as a named consumer of the generalized squish/morph/fade entrance; the deck should expose a `data-state="active|inactive"` recipe class (`.glass-deck-slide`, library-owned) the demo composes, NOT a per-demo scoped-CSS transition.
- **F2 (MODIFY) — there is no directional/reverse-aware slide.** `go(i)` carries no direction; both prev and next slides enter from `translateX(2rem)` (the right). A presentation deck reads as one-directional film — prev should enter from the LEFT. The headless `onChange(to, from)` seam DOES carry `from`, so direction is derivable, but the demo discards it. → **MODIFY** the demo recipe to read `to - from` sign into a `--deck-dir` custom property; if a library slide recipe lands (F1), bake direction into it.
- **F3 (note) — count-up easing has ZERO consumers in the deck demo.** `installDeckSpring()` is called but no count-up runs on this page (the slide index is not animated as a number). The easing is for a consumer's "Slide N of M" count-up or a progress-bar fill. Not a defect (the library ships the seam; the demo simply does not exercise it) — but the demo under-demonstrates the component's own animation affordance. → folds into the demo-lens, noted here for completeness.

---

## (2) PROCEDURAL VIZ

**N/A — the deck has no procedural viz.** No aurora/blob/fourier/GPU substrate. The deck is a headless keyboard-paged register. The GPU-only/Safari bar and the PROCEDURAL-SUITE spec do not apply. (Correctly so — a presentation deck is content-paging, not a generative field.) **No finding.**

---

## (3) PERFORMANCE

- **Compositor-only: PASS.** The slide rides `transform`+`opacity` only (no layout property animated). `proof:no-layout-animation` holds. The pager elongation animates `width`/`height` — that IS a layout property, but it is the BB.W-MOTION-CANON **named-allowlist SIZE/MORPH-indicator** entry (pager-dots is explicitly recorded as an audited rationale-bearing allowlist member; a 24px dot's width morph is a one-shot user-driven reflow, not a per-scroll-frame storm). **Acceptable + already sanctioned.**
- **Offscreen-pause: N/A** — no rAF loop in the headless core (the count-up's rAF is the consumer's, not the library's). The deck owns no canvas-lifecycle. No park needed.
- **Layout-thrash: NONE in the core.** `useDeck` is pure reactive `ref`/`computed`. `useDeckKeyboard` is a single `keydown` listener with a `closest()` focus test (cheap, event-time only — no per-frame DOM read). `<DeckPager>` forwards to `<PagerDots>` whose windowing math is the pure `pagerWindow` oracle. **Clean.**
- **F4 (note) — the demo stage uses `position: absolute; inset: 0` stacked slides with `min-block-size: 14rem` + `overflow: clip`.** All 6 slides are mounted simultaneously (only `:inert` + `opacity:0` on inactive). For 6 slides this is fine; a real 50-slide deck mounting all panels is a memory/paint cost. The COMPONENT does not prescribe this — the demo does. A consumer with many slides should `v-if`/lazy-mount. → demo-lens note; the component is not at fault (the lift boundary correctly leaves slide-mounting to the consumer).

---

## (4) SAFARI compatibility

- **PASS.** No `backdrop-filter: url()` SVG lens, no WebGPU, no `@property` animation in the deck's own surface. `transform`/`opacity`/`width`/`height` transitions are universally supported. The lazy `import("@mkbabb/keyframes.js")` is a standard dynamic import (Safari ≥16.4). `:inert` is Safari ≥15.5 (graceful: an un-supporting engine just keeps inactive slides focusable — a minor a11y degrade, not a break). `springTimingFunction` emits a `linear()` timing-function CSS string — `linear()` is Safari ≥17.2; the demo uses the `--spring-deck` TOKEN (a precomputed `linear()` stop list) which is the same constraint, and the cubic-fallback `deckEase.fn` covers the JS path. **No Safari-specific defect.**

---

## (5) IDIOMATIC / NO-LEGACY

- **The headless-core lift is the model architecture — no legacy, no dual-path, no workaround.** ONE spring family (`DECK_SPRING` = SwiftUI `.smooth`, the same `(response, ζ)` row `--spring-smooth` derives from — no third easing vocabulary). ONE pager oracle (`pagerWindow`, sourced from `<PagerDots>`, ZERO re-implementation in `<DeckPager>`). ONE keyboard handler (`handleDeckKey`, pure + happy-dom-testable). The constants are colocated off the composables (`proof:colocation` clause b). The keyboard listener is a plain `keydown` (NOT the vueuse `/keyboard` registry) deliberately, to keep `/deck` vueuse-free. **All idiomatic.**
- **F5 (MODIFY — the path-label inconsistency the user named).** The DEMO imports the deck via a **deep relative path** `"../../../src/components/custom/deck"` (`deck.vue:19`) — NOT the public subpath label `@mkbabb/glass-ui/deck`. The README + index.ts both establish `@mkbabb/glass-ui/deck` as THE label. Per PASS-E cross-cutting ("28 pages use a local label, 90 use `@mkbabb/glass-ui/<subpath>`"), the deck is an EXPORTED component (subpath `/deck`), so it must carry the `@mkbabb/glass-ui/deck` convention, not the relative reach. → **MODIFY** (demo-lens, but flagged here as the component's published-surface label). Maps to **`BD.W-STORY-PAGE-STANDARD`** path standardization.
- **F6 (MODIFY — superfluous language to tighten).** The `constants.ts`/`useDeckSpring.ts`/README prose is dense-correct but the demo `<StorySection blurb>` re-states the entire anatomy ("useDeck owns the headless index + progress + the 'Slide N of M' announcer; useDeckKeyboard pages on Arrow/Space/digit…") — a wall of API recitation in a user-facing blurb. → **MODIFY** the demo blurb to one tight sentence (the component prose stays; the demo copy tightens). Maps to **`BD.W-PAGE-OFFTOKEN-SWEEP`** / the demo-copy tighten arm.
- **F7 (note — no four-state contract, correctly).** The headless core has no interactive painted element, so the four-state contract (rest/hover/active/disabled) does not bind on `useDeck`. It binds on the consumer's prev/next BUTTONS (which the demo gets from `<Button>` — already four-state-correct) and on the `<DeckPager>` dots (which inherit PagerDots' states). **No gap.**

---

## (6) The glass SIX-LAYER composite

**N/A at the component — PARTIALLY PRESENT at the demo, and that's the structural finding.** The deck core paints no glass. The DEMO stage wraps slides in `.glass-quiet rounded-card` (one glass tier). Per the user's binding ask ("each sub-section in its OWN glassy card; the main card BIGGER; glass demos over COLORFUL aurora backgrounds"):

- **F8 (AUGMENT — the deck demo has NO aurora background + a single flat glass-quiet stage.** The slides sit on `glass-quiet` over the default page — there is NO live colorful aurora field behind the glass, so the glass reads as a flat tinted panel, not iOS-27 liquid glass (the six-layer composite needs something behind it to refract). The user's directive is explicit: glass demos over colorful aurora. → **AUGMENT `BD.W-STORY-PAGE-STANDARD`** (the `<DemoStage>` sub-type: a live-field aurora behind the deck) AND the systemic `W-PAGE-BACKGROUND`. The deck stage should be a `<DemoStage>` with a colorful offscreen-paused `<Aurora>` behind it, and each conceptual sub-section (the stage · the pager+controls · the announcer) in its own glassy sub-card, the stage card BIGGER. This is a DEMO restructure (zero src paint) — the component is correct; the demo under-presents it.

---

## Tranche mapping (FOLD / MODIFY / AUGMENT / PRUNE)

| # | Finding | Action | Wave |
|---|---------|--------|------|
| F1 | Slide transition is flat translateX, not iOS-27 squish/morph entrance | **AUGMENT** | `BD.W-LIQUID-ENTRANCE-GENERAL` (cite deck-slide as named consumer; library-owned `.glass-deck-slide` recipe) |
| F2 | No direction-aware (prev-from-left) slide | **MODIFY** | `BD.W-LIQUID-ENTRANCE-GENERAL` (bake `--deck-dir` off `onChange(to,from)`) |
| F5 | Demo uses deep relative import, not `@mkbabb/glass-ui/deck` | **MODIFY** | `BD.W-STORY-PAGE-STANDARD` (path-label standardization) |
| F6 | Demo blurb recites the whole API | **MODIFY** | `BD.W-PAGE-OFFTOKEN-SWEEP` (demo-copy tighten) |
| F8 | No colorful aurora behind the glass stage; one flat card not per-section glassy cards; stage not bigger | **AUGMENT** | `BD.W-STORY-PAGE-STANDARD` (`<DemoStage>` + aurora field + per-section glassy sub-cards) + the systemic page-background |
| F3,F4,F7 | Count-up unexercised · all-slides-mounted · no four-state (correct-by-design) | **note** | demo-lens; no src defect |

**No PRUNE, no FOLD-NEW-COMPONENT.** The deck headless core is architecturally correct — every finding is either an AUGMENT onto an already-drafted Band-17 wave (`W-LIQUID-ENTRANCE-GENERAL` / `W-STORY-PAGE-STANDARD`) or a demo-side MODIFY. The component itself ships clean (one spring, one oracle, one handler, lazy-engine, PRM-correct, Safari-safe).

**Cross-check:** no existing BD wave touches `src/components/custom/deck/` — `grep` of `waves/*.md` for `deck` returns only `--spring-deck` token mentions (W-BC-COMPONENT-CANON / scheme-motion references), confirming the deck core is NOT scheduled for src paint in BD. The findings are entirely demo-modernization + the two new Band-17 waves; this is consistent with BD being the post-cut discharge tranche (no new component capability).

---

## 5-line verdict

1. **The deck is a correctly-architected HEADLESS register** — no procedural viz, no glass paint by design; one spring (`DECK_SPRING`=`.smooth`), one pager oracle (`pagerWindow` via `<DeckPager>`→`<PagerDots>`), one pure keyboard handler, lazy keyframes count-up, PRM-correct, Safari-safe, compositor-only. The COMPONENT ships clean — zero src defect, zero legacy, zero dual-path.
2. **ANIMATION gap is the iOS-27 ceiling, not a bug:** the slide enter is a flat `translateX-2rem` cross-fade, not the volume-preserving squish/morph/fade liquid entrance — and it discards the direction `onChange(to,from)` already carries.
3. **The DEMO under-presents the component:** deep relative import (not `@mkbabb/glass-ui/deck`), an API-reciting blurb, NO colorful aurora behind a single flat `glass-quiet` stage, no per-section glassy sub-cards, stage not bigger — all the user's named structural asks.
4. **Tranche actions:** AUGMENT `W-LIQUID-ENTRANCE-GENERAL` (deck-slide as named consumer + `--deck-dir` direction + a library `.glass-deck-slide` recipe) · AUGMENT `W-STORY-PAGE-STANDARD` (`<DemoStage>` + aurora field + per-section glassy cards + bigger stage + path-label) · MODIFY the demo blurb via `W-PAGE-OFFTOKEN-SWEEP`. No PRUNE, no new component.
5. **Convergence: HIGH** — the deck component needs NO src change in BD; the work is entirely demo-modernization onto two already-drafted Band-17 waves, fully consistent with the post-cut discharge thesis.
