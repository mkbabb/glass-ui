# BG.W-SECTION-TYPEWRITER-FADEUP — PAINT DELTA (non-authoring dual-engine judge)

**Verdict: PASS** — dual-engine (Chrome ANGLE-Metal, Apple M5 Max + Safari system-WebKit / Apple GPU), both modes.
Judged **2026-07-05** against the row-16.2 criteria (`proof:demo` T1–T4 · `getAnimations()`-per-node congruence π).
Non-authoring judge — did not build; verified the PAINTED + COMPUTED truth, not the builder's claim.

## What the wave ships (the mechanism under test)

The storybook section-entrance is TWO disjoint-but-congruent registers minted at the chassis
(`demo/stories/StorySection.vue`, `useSectionReveal.ts`, `story-hero.css`, `scheme-motion.css`,
`SplitChars.vue`):

- **Heading** — `<StorySection heading>` renders a semantic `<h2 class="story-section__heading">`
  wrapping `<SplitChars :stagger="false">` (T1: drops the mount-bound `.char-stagger` `fade-in`).
  An IO-gated JS reveal (`useSectionReveal`, provided ONCE per page, injected per section) arms the
  node `data-reveal-armed` synchronously pre-paint, flips `data-revealed` as it crosses into view,
  and the `.char` glyphs rise on `@keyframes gl-char-rise` staggered by `--char-stagger-step` (T2:
  DRY 30ms).
- **Body** — `.story-section__body.scroll-cascade` rides the native `view(block)` timeline
  (`@keyframes gl-cascade-build`) — each body child builds on its OWN entry, no JS, no setTimeout.

The two fire CONGRUENTLY as a section enters. The reveal is progressive enhancement (no provider /
no-JS / PRM → heading VISIBLE, body static — the FOUC-safe floor).

## Method (pipeline PROVEN — C18 dual-engine)

- `demo:dist:build` BUILT bytes served on `:5200` (`vite preview`); build fresh (dist-demo built
  04:16 after HEAD `a3a9b58b` 04:15; zero src/demo source edits since).
- **Chrome leg** — real Chrome 149.0.7827.201 + CDP `:9478` (in-repo profile, NOT /tmp), Playwright
  `connectOverCDP`, `?capture=<route>&mode=<m>`, poll `data-capture-ready`, `GL_RENDERER` recorded
  off a throwaway webgl2 ctx = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`, `page.screenshot`
  @1x 1440×900. **Live (non-capture) computed-DOM** probes for the animation MECHANISM (capture mode
  neutralizes CSS anim by design).
- **Safari leg** — off-screen WKWebView (`.wkshot-bin`, system `WebKit.framework` / Metal, no
  Screen-Recording TCC), `?capture=<route>&mode=<m>`, polls `data-capture-ready` @4500ms → 2880×1800
  retina PNG. **Live getAnimations()** cross-checked via Playwright-WebKit (`supportsView: true`).
- Engine badge decoded in-pixel for provenance on every capture (CHROME/ANGLE-Metal · WEBKIT/Apple-GPU).
- `verify-siblings-intact --quiet` exit 0 before AND after. Chrome I launched killed; `:5200` serve
  left as found (started by a sibling paint agent, not this judge).

## Captures on disk (all resolve; real dimensions, non-blank)

`docs/tranches/BG/audit/visual/BG.W-SECTION-TYPEWRITER-FADEUP-paint/`

| file | engine | route | mode | dim |
|---|---|---|---|---|
| `section-chrome-light-desktop-full.png`     | CHROME/ANGLE-Metal | /display/section    | light | 1440×900 |
| `section-chrome-dark-desktop-full.png`      | CHROME/ANGLE-Metal | /display/section    | dark  | 1440×900 |
| `section-safari-light-desktop-full.png`     | WEBKIT/Apple-GPU   | /display/section    | light | 2880×1800 |
| `section-safari-dark-desktop-full.png`      | WEBKIT/Apple-GPU   | /display/section    | dark  | 2880×1800 |
| `typewriter-chrome-light-desktop-full.png`  | CHROME/ANGLE-Metal | /motion/typewriter  | light | 1440×900 |
| `typewriter-chrome-dark-desktop-full.png`   | CHROME/ANGLE-Metal | /motion/typewriter  | dark  | 1440×900 |
| `typewriter-safari-light-desktop-full.png`  | WEBKIT/Apple-GPU   | /motion/typewriter  | light | 2880×1800 |
| `typewriter-safari-dark-desktop-full.png`   | WEBKIT/Apple-GPU   | /motion/typewriter  | dark  | 2880×1800 |
| `accordion-safari-light-desktop-full.png`   | WEBKIT/Apple-GPU   | /containers/accordion (heading-reveal evidence) | light | 2880×1800 |
| `accordion-safari-dark-desktop-full.png`    | WEBKIT/Apple-GPU   | /containers/accordion (heading-reveal evidence) | dark  | 2880×1800 |

Probe scripts (evidence, in the same dir): `live-firing.mjs`, `webkit-firing.mjs`,
`webkit-structural.mjs`, `live-congruence.mjs`, `fouc-check.mjs`, `chrome-capture.mjs`.

## Criteria verdict

### π — `getAnimations()`-per-node CONGRUENCE (heading per-glyph reveal × body view()-cascade), both engines both modes → **PASS**

Neither NAMED route carries a `<StorySection heading>` (both are label-only / raw-markup), so the
per-glyph heading register is exercised + measured on the real storybook consuming routes; the two
named routes verify the settled gestalt + the body-only register + the typewriter component.

Live `getAnimations()` sampling on fresh mount (non-capture):

| route / engine | mode | `gl-char-rise` running (heading) | `gl-cascade-build` on **ViewTimeline** (body) | congruent beats |
|---|---|---|---|---|
| /containers/accordion · **Chrome** ANGLE-Metal | light | 14 | 6 | 81 |
| /containers/accordion · **Chrome** ANGLE-Metal | dark  | 14 | 6 | 81 |
| /containers/dialog · **Chrome** ANGLE-Metal     | light | 27 | 4 | 102 |
| /containers/accordion · **WebKit** (Playwright) | —     | 14 | 6 | 37 |

Both registers fire at the SAME beat (`firstCongruent` t≈110ms), on both engines, both modes.

Structural computed-DOM (Chrome + WebKit, both modes, `/containers/accordion`):

- `headingCount 2 · armed 2 · revealed 2` — the page-singleton register (provided ONCE in
  `StoryPage.vue`, injected per section) arms every heading (T3 provide-key wired).
- `charAnimName "gl-char-rise" · charDisplay "inline-block"` — the `:stagger=false` glyph carries
  the IO-owned reveal, the inline-block restated for the transform (T1 stagger-drop; no double
  `.char-stagger` mount-fade).
- `--char-stagger-step "30ms" · charDelayIdx2 "0.06s"` (= 2×30ms) — the DRY single-source stagger
  (T2, off `* 30ms`).
- `bodyAnimName "gl-cascade-build" · bodyAnimTimeline "view()"` — the disjoint native body cascade
  (T4 two-register; single animation per node — no double-cascade).

### FOUC-clean → **PASS**

`/compositions/form-validation` at scrollTop 0: one below-fold heading is `armed && !revealed`; its
glyph resolves `opacity: 0` + `translateY(8.14px)` — the INVERTED pre-reveal floor (armed
synchronously pre-paint, hidden until the IO claims it → no visible-then-hidden flash). Above-fold
headings reveal on the mount re-sweep (hook iv) — `revealedAtTop 2/3`, `2/2`. The system-WebKit
`accordion` captures show "Single"/"Multiple" per-glyph headings FULLY VISIBLE (no stranded
opacity:0). The 4 sweep hooks (throttled `scroll` · raw `scrollend` · rAF route-settle · bounded
mount re-sweep) are source-present (`useSectionReveal.ts`); the F5 adverse-order strand-proof is
`proof:demo` T3's charge (gate-owned), the mount re-sweep reveal is confirmed here.

### Gestalt (both named routes, both engines, both modes) → **PASS**

- **/display/section** — the `Section` hero + eyebrow labels + Section tone matrix render CLEAN and
  fully legible; 5 `.story-section__body.scroll-cascade` bodies ride the `view()` cascade
  (`bodyAnimName gl-cascade-build`, `view()`); no headings armed (label-only StorySections — correct);
  FOUC-clean; `glContextCount 1` (recessive story-hero backdrop, one-GL-per-route).
- **/motion/typewriter** — the `--motion-accent` violet masthead + the `TypewriterText` typing
  per-glyph LIVE (Chrome "Built on wa\|" / WebKit "Built on warm c\|") + the CLI line; `glContextCount
  0` (recessive by construction); warm-cream light / warm-ember dark; hero fits envelope.
- Recessive backdrop — no conic / no oversaturation on either route (calm warm washes). Grain calm
  (typewriter hero `paper-grain-overlay`). Warm-cream identity (light) / warm-ember luminous-dark
  (dark) — not a dead charcoal void.

## Fences honoured

Operated ONLY under `/Users/mkbabb/Programming/glass-ui`; ZERO `/tmp` writes; ZERO sibling
(`~/Programming/*`) touch. Edited only this DELTA + the PNGs/probe scripts under
`…/BG.W-SECTION-TYPEWRITER-FADEUP-paint/` + the cursor row in `EXECUTION-PROGRESS.md`. No
src/demo/styles/scripts edited. `verify-siblings-intact --quiet` exit 0 before + after.
