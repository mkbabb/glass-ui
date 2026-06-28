# BG-WS11-storybook-facility — SPEC-pass4-CONVERGED (EXECUTION frontier, hardened)

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API family every page composes · consistent per-category suffusal. Both modes,
Chrome AND real Safari/WebKit 26, real-paint is THE gate.

> **STATUS — design-converged, execution-UNCONVERGED (the honest cap).** The DESIGN
> (mechanisms, carve shapes, blast-radius matrix, mode-aware refinements) is converged and
> every critique mustFix is folded below. The WORKSTREAM GATE — real-paint on the integrated
> tree, Chrome AND real Safari — is STRUCTURALLY UNMET: the WS1+WS4 integration branch does
> NOT exist (`git diff master..HEAD -- src/ demo/` is EMPTY, verified `tranche/BG @e6682c7e`,
> 2026-06-28), the §0 HEAD-checks are RED on real HEAD, ZERO captures have run on either
> engine, the four USER CONFIRMATIONS are unobtained, and the central R6 WebKit-frost mustFix
> is RESOLVE-not-punt (unresolved). Every pass-4 critique returned `refine`. This converged
> spec is the EXECUTION blueprint: run it, capture it, confirm it — §8 is the cap.

---

## 0. WHAT THIS CONVERGED SPEC FOLDS (the pass-4 critique mustFixes, grounded on real HEAD)

Every claim below was re-verified against `tranche/BG @e6682c7e` before folding:

| Folded mustFix | HEAD verification | Resolution |
|---|---|---|
| **F-BLOCKER** integration branch absent; §0 HEAD-checks RED | `git diff master..HEAD -- src/ demo/` EMPTY; `StoryPage.vue:72` still `class="scroll-build …"`; `:220` still `class="scroll-cascade story-sections …"`; `StorySection.vue` heading still a plain `<h2>` | NO WS11 wave opens until WS1+WS4 land code and the §0 HEAD-checks go GREEN on a REAL branch (§0, §8.0) |
| **F-R6** the central headless-green/visually-broken trap: WebKit VISUAL frost UNPROVEN; the weak-frost 3×-trap | `--glass-blur-quiet` IS a whole composite (blur+saturate+brightness, `glass.css` / `dark-arm.css`) so `backdrop-filter:var(--glass-blur-quiet)` is correct; the real `.demo-scroll-progress` IS a sticky child of the single `.demo-main-scroller` | **RESOLVE, do not punt:** mint a dedicated `--scroll-rail-blur` (a resting-radius bump over the 8px quiet) + a tint floor so the thick-glassy read survives WebKit's softer frost at a ~10px strip; PT-A is the binding VISUAL capture on real WebKit 26 over REAL page content, by a non-authoring agent, BEFORE the rail ships (§2A.D1, §5) |
| **F-R3** the regex `\b` rejects `StoryHeroBackdrop` | `proof-demo-radial-calm.mjs:225` = `/<(Aurora\|Constellation\|FourierField\|StoryHero\|PaperBackdrop)\b/` — VERIFIED the `\b` after `StoryHero` rejects the carved name | ADD `StoryHeroBackdrop\|StoryPage\|CategoryPage` to that token set in the atomic delete commit (§2C'(e)) |
| **F-R4** the SectionLanding fold reaches ≥4 surfaces incl. SHARED libs | `surface-closure.mjs:163` `seeds.add("demo/stories/SectionLanding.vue")`; `proof-ba-gestalt.mjs:706` asserts `c.includes("demo/stories/SectionLanding.vue")`; `router.ts:31` lazy-imports it | re-point all atomically; `manifest.ts` `SectionLanding` TYPE + `sectionLanding()` factory are DATA — disambiguate, do NOT delete (§2C'(e)) |
| **F-R2-CORRECTED** the phantom gate | `proof:field-accent-reconcile` **does NOT exist** in `scripts/`; `warmFieldHue` is IMPORTED by exactly TWO files: `AppShell.vue:39` + `SectionLanding.vue:25`; `SectionPreviewCard.vue:175` READS the `--card-field-h` token (clamp `25..95`), it does NOT import the fn; `PaperBackdrop.vue:33` only mentions it in a COMMENT | DROP the "keeps proof:field-accent-reconcile GREEN" claim. Gate the re-home on the VERIFIABLE FACT — `warmFieldHue` importers === 2 (AppShell + CategoryPage post-fold) — PLUS a captured per-category preview-card hue VARIANCE (§2C'(d), §2D, §5) |
| **F-R5-CORRECTED** the strand-proof over-engineers | `vScrollRevealOnce` IS module-exported (`useStaggerReveal.ts:123`) but NOT barrel-exported (zero hits in `index.ts`/`motion.ts`/`motion-core.ts`) and has ZERO live consumers | the spec's "zero exports" condition is LOOSE → do NOT fire a conditional clean-break retire on a partial grep. Mint a FRESH demo-private `useSectionReveal`; leave `vScrollRevealOnce` ALONE (§2B'.3) |
| **F-R8-RESCOPED** the threat model is mis-scoped | `router.ts:74` `scrollBehavior: () => ({ top: 0 })` DISCARDS savedPosition; `AppShell.vue:198` forces `scrollTo({ top: 0 })`; no hash/scrollRestoration in the demo. In-app nav is ALWAYS top:0 | The ONLY live strand case is **F5/reload browser-native restoration** of `<main>.scrollTop`. Drop the deep-link/back-nav framing; target F5 explicitly, model the ADVERSE ordering (restore AFTER mount-settle, on a true reload with no route-change event) (§2B'.3) |
| **F-charstagger-PATH** the in-fence src edit cites the wrong file | the `.char-stagger` CSS lives in `src/styles/typography/utilities.css` (NOT `src/styles/utilities.css`); the hardcoded stagger literal must be confirmed LIVE at execution (the `30ms`/`* var(--char-index)` line) | the `--char-stagger-step` mint + re-point targets `src/styles/typography/utilities.css`; verify the exact line+literal against live source before editing (§2B'.2) |
| **F-bleed-REGRESSION** the carve breaks a compound selector the oracle cannot see | `story-hero.css:132` `.constellation.story-hero-bg--bleed` + `:140` `.dark .constellation.story-hero-bg--bleed` — the B16 contrast lift in BOTH modes keys off the child carrying `story-hero-bg--bleed` | the StoryHeroBackdrop carve MUST keep a `story-hero-bg--bleed` marker reachable on the constellation child (or re-express the override to the new nesting) AND capture the constellation hero to prove the B16 lift survives both modes (§2C'(a), §5) |
| **F-PTD-RATIONALE** the `:stagger=false` gate asserts the wrong reason | verified: `[fade-in]` binds on MOUNT on a kept `.char-stagger`; the higher-specificity reveal rule REPLACES it (no double-bind) | the load-bearing reason is **"no mount-fire-before-reveal"**, NOT "no double-bind" (false). The gate asserts the right thing (§2B'.2) |
| **F-oracle-BUILD** the single-root oracle is un-built; classify the ROUTED family | `router.ts:31` routes `SectionLanding.vue → CategoryPage` directly | BUILD `scripts/proof-story-page-api.mjs`, register in `gates.mjs` `[local,ci,release]`, restore the self-test bite, classify the depth-1 routed family (StoryPage/CategoryPage/StoryHeroBackdrop each single-root), use the house `readdirSync` idiom not `globSync` (§2C'(a), §5) |
| **F-USER** four owed confirmations | — | the 4→2 page-API collapse · the mode-aware chrome-chroma lift · the warm-clamp-vs-rainbow CategoryPage fork · the `useTypewriter`→`SplitChars(:stagger=false)` reinterpretation (§6, §8.6) |

Pass-3 §§1-8 STAND except where a numbered item below supersedes them. The seven pass-4 R-findings
(R1 timeline-source reversal, R2 field-hue re-home, R3 15th gate, R4 ≥4-surface fold, R5 fresh
demo-private mechanism, R6 the WebKit linchpin, R8 the concrete sweep trigger) are folded with their
HEAD verifications above.

---

## 1. SEQUENCING — WS11 ELEVATES, it does not re-fight

Pass-3 §0 + §0.5 + §0.6 STAND verbatim EXCEPT the two amendments below. **No WS11 wave opens
until the WS1+WS4 integration branch exists and the §0 per-wave HEAD-checks pass on a REAL
branch** (the harness does NOT substitute — F-BLOCKER).

**§0.6 timeline-source — REVERSED to align with WS1 (R1).** The demo bar uses
`animation-timeline: scroll(nearest block)` (WS1's resolution model), NOT the named
`--demo-main-progress` timeline. The HEAD-check #3 is REWRITTEN:

> **HEAD-check #3 (rewritten).** The LIBRARY `.scroll-progress` recipe is WS1's
> `scroll(nearest block)` `scaleX(0)` floor (for `scroll-vt.vue` + external consumers). The demo
> bar (`.demo-scroll-progress`) is WS11's LAST-writer self-contained recipe and ALSO uses
> `scroll(nearest block)` — so WS11 has NO dependency on WS1's named-timeline disposition. The
> OLD check that `scroll-timeline-name: --demo-main-progress` survives is DELETED (no longer
> load-bearing). VERIFY ONLY that the bar is a sticky child of `.demo-main-scroller` with NO
> intervening scroll container (so `scroll(nearest)` resolves to that scroller). **Escalation:**
> the orchestrator confirms WS1's executor does not introduce an intervening scroll container
> between the bar and `.demo-main-scroller` — the one shared fact both bars depend on.

**§0.5 ownership — UNCHANGED.** WS1's M4 edits the LIBRARY `.scroll-progress` recipe + hoists an
UNCONDITIONAL `transform:scaleX(0)` safety floor on the demo bar div, then STOPS. WS11
(`BG.W-SCROLL-PROGRESS-GLASSY`) is the LAST writer on `.demo-scroll-progress`: it strips the
`.scroll-progress` class (clean break) and rebuilds the TRACK + `__fill`. WS11 lands AFTER WS1
per the intra-WS sequence; WS11's `dock-nav.css` block is authored as the complete final
`.demo-scroll-progress` recipe (no churn collision).

The §0 per-wave HEAD-checks (must be GREEN on the real branch before the matching wave opens):
1. `.scroll-build` RETIRED from `StoryPage.vue:72` (WS4 lands the assemble-on-mount → IO-cascade decouple).
2. D14 landed: `%-off---col` so `animation-range !== normal` (WS1).
3. LIBRARY `.scroll-progress` IS the `scroll(nearest block)` `scaleX(0)` floor (WS1 M4).
4. `_chassis/` deleted; `ShowcaseFrame`-is-cel (WS4).
5. `--glass-blur-quiet` is read as a WHOLE composite everywhere it's consumed (WS8/WS1).

---

## 2. MECHANISM (the converged pass-4 deltas; pass-3 §2 stands elsewhere)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

Pass-3 §2A STANDS EXCEPT the timeline-source (R1), the mode-aware fill (D1), and the **F-R6
WebKit-frost RESOLVE** (a dedicated thicker blur + tint floor). The converged recipe:

```css
@property --scroll-fill { syntax: "<percentage>"; inherits: true; initial-value: 0%; }

.demo-scroll-progress {                       /* the TRACK — always visible, the ONE writer */
    position: sticky; inset-block-start: 0;
    z-index: var(--z-scroll-rail, 5);          /* MINT --z-scroll-rail; confirm < --z-dock:40 / --z-overlay:50 */
    pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* MINT; √φ-proportioned, ~10px */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* CAP-REVEAL — NEVER overflow:hidden (R1: clip AVOIDS the scroll(nearest) hijack) */
    background: var(--glass-bg-quiet);
    backdrop-filter: var(--scroll-rail-blur, var(--glass-blur-quiet));  /* F-R6: dedicated thicker frost; falls back to the whole quiet composite, NEVER blur(var(composite)) */
    box-shadow:                                /* inner GROOVE + separation lift — depth w/o extra blur; PLAIN per-mode arms (no light-dark inset frag) */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, FLAT leading edge (reference-confirmed) */
    position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--rail-fill-start) 0%, var(--rail-fill-end) 100%);
    clip-path: inset(0 calc(100% - var(--scroll-fill)) 0 0 round var(--radius-pill));  /* compositor-safe */
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);  /* specular top edge */
}
@supports (animation-timeline: scroll()) {     /* @supports ONLY, NEVER a prefers-reduced-motion gate */
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress {                    /* ONE animation on the TRACK; fill/glint inherit --scroll-fill */
        animation: gl-scroll-fill auto linear;
        animation-timeline: scroll(nearest block);  /* R1: WS1's model — overflow:clip prevents the hijack; sticky child resolves to .demo-main-scroller */
    }
}
@media (prefers-reduced-transparency: reduce) {  /* a SEPARATE axis from reduced-motion */
    .demo-scroll-progress { --glass-level: 0; backdrop-filter: none; background: var(--card); }
}
```

- **F-R6 — RESOLVE the WebKit weak-frost (the 3×-trap), do NOT punt.** WebKit renders a softer
  frost than Chromium at a thin 10px strip; the `--glass-blur-quiet` 8px radius reads weak there.
  MINT a dedicated `--scroll-rail-blur` (a resting-radius bump — author at the floating/resting
  rung ~13px over the 8px quiet) AND/OR a tint floor (a `color-mix` toward `--card` on the track
  bg) so the "thick glassy" read survives WebKit's softer frost. The standalone synthetic-stripe
  proxy is NECESSARY-NOT-SUFFICIENT: RE-CAPTURE on real WebKit 26 over REAL page content (the
  dock z:40 stack reading through, both modes) by a NON-authoring agent on a real GPU. The
  convergence bar is glassy on Chrome AND Safari, not Chrome-only.
- **D1 — the FILL end is MODE-AWARE (reference, plain per-mode token pair — NEVER `light-dark()`,
  the inset-shadow trap).** The Control-Center reference fill is a near-WHITE high-L luminous
  solid against the dark frosted channel; pass-3's flat `oklch(0.78 0.13 …)` reads materially too
  DARK in dark mode. Per-mode pair, declared the warm-cream way (light in the demo `:root`, dark
  in the `.dark` arm):
  - `--rail-fill-start`: `var(--card)` (warm-cream, both modes — NO `oklch(from …)`).
  - `--rail-fill-end`: LIGHT = `oklch(0.78 0.13 var(--field-h, 60))` (route-hue saturated end,
    C 0.13 for the ≥3:1-as-graphic silhouette against the light-quiet track); DARK (`.dark` arm) =
    `oklch(0.92 0.05 var(--field-h, 60))` (the CC-faithful bright high-L read). The fill-as-graphic
    clears ≥3:1 (WCAG 1.4.11) over the variable frosted backdrop in BOTH modes — VERIFIED on
    capture, not asserted.
- **The pill-cap question is ANSWERED (reference, closed).** The CC reference fill has a FLAT
  horizontal leading edge, rounded TRAILING caps. `clip-path: inset(… round pill)` delivers exactly
  this. NO fill-local `border-radius`.
- **R1 — `scroll(nearest block)`, NOT the named timeline.** The TRACK is a sticky child of
  `.demo-main-scroller` (no intervening scroll container). `overflow:clip` is NOT a scroll container
  (only `overflow:hidden` would be), so it does not hijack `scroll(nearest)`; the lookup resolves UP
  to `.demo-main-scroller`. ONE resolution idiom across both bars, zero dependency on the named
  `--demo-main-progress` timeline WS1 repurposes for `scroll-vt.vue`. The R1 prose "hijack"
  correction flows into the gate: keep `overflow:clip` for the REAL reasons (no scroll container,
  cap-reveal clip, pill rounding), not an imprecise hijack-prevention premise.
- **The JS fallback.** `useScrollTrigger` (POSITIONAL `scrollTop/scrollHeight`, gated on
  `!supportsScrollTimeline()`), scrolling `.demo-main-scroller` (the inner port), NOT `window`. The
  SpringProgress glint follower (`--glint-x`, PRM-dropped) STANDS.
- **MINT the demo tokens the recipe leans on (do NOT rely on raw fallbacks):**
  `--scroll-rail-thickness` (0.625rem), `--z-scroll-rail` (5; confirm < `--z-dock:40`),
  `--scroll-rail-blur` (the F-R6 thicker frost), `--rail-fill-start`/`--rail-fill-end` (the per-mode
  pair, `.dark` bright high-L), and a `--field-h` default (60).

### 2B'. Section entrances — the decouple + the two in-fence src/ edits

Pass-3 §2B' / §2B'.2 STAND: the page-level `.story-sections` drops `.scroll-cascade`; each
`StorySection` composes two disjoint sibling registers — the heading
`class="text-subheading story-section__heading"` wrapping `<SplitChars :stagger=false>`; the
`.story-section__body` `flex flex-col gap-*` IS the reused `.scroll-cascade`; the `#heading` slot is
the no-typewriter escape.

**§2B'.2 — the two in-fence src/ edits (SKETCHES — apply for real, verify against live source):**

1. **`SplitChars.vue` gains `stagger?: boolean`** (default `true` → byte-identical; host drops the
   `.char-stagger` class when `false`). The load-bearing reason `:stagger=false` is needed is
   **"no mount-fire-before-reveal"** (F-PTD-RATIONALE: `[fade-in]` binds on MOUNT on a kept
   `.char-stagger`; the IO-gated reveal must own the entrance) — NOT "no double-bind" (verified
   FALSE: the higher-specificity reveal rule REPLACES the mount rule). The gate asserts the right
   reason. Re-verify PT-D against the LIVE `SplitChars(:stagger=false)` DOM output, not a replica.
2. **MINT `--char-stagger-step` (30ms) in `scheme-motion.css`**, re-point the hardcoded stagger
   literal in **`src/styles/typography/utilities.css`** (the verified home of `.char-stagger` — NOT
   `src/styles/utilities.css`) off the inline `* 30ms` form onto `var(--char-stagger-step)` (DRY
   single-source). Confirm the exact line + literal against live source before editing.

The `gl-char-rise` keyframe is net-new and untested cross-engine in-combination → PT-D is binding
(the COMBINED heading per-glyph × body cel-cascade DISJOINT, proven on real WebKit 26).

### 2B'.3. The strand-proof — a FRESH demo-private mechanism, RE-SCOPED to F5-reload (R5 + R8)

**R5 RESOLUTION (KISS + colocate + no-contrivance).** The strand-proof reveal is a FRESH
demo-private mechanism colocated with `StorySection` — `useSectionReveal`
(`demo/stories/useSectionReveal.ts`), NOT an overload of the confused two-mode public-but-unused
`vScrollRevealOnce`. Being demo-private (off every barrel) it carries no `proof:motion-presets`
no-regression burden and no "library-correct for any consumer" contract. **Leave
`vScrollRevealOnce` ALONE** — it IS module-exported (`useStaggerReveal.ts:123`) with zero barrel
export + zero consumers, so the spec's "zero exports" clean-break condition is LOOSE; do NOT fire a
conditional retire on a partial grep.

**F-R8 RE-SCOPED — the ONLY live strand is F5/reload restoration.** Verified: in-app nav is ALWAYS
`top:0` (`router.ts:74` discards savedPosition; `AppShell.vue:198` forces `scrollTo({top:0})`; no
hash/scrollRestoration in the demo). Drop the deep-link/back-nav framing. The single live threat is
the BROWSER-NATIVE F5/reload restoration of `<main>.scrollTop`, which sets `scrollTop` with NO
guaranteed scroll event and lands in an ADVERSE order (restoration can fire AFTER mount/route-settle,
on a true reload where NO route-change event fires → `onRouteSettle` never runs). The sweep must
cover that case, so it fires on FOUR hooks and the LAST two are load-bearing for F5:

- (i) the throttled container `scroll` listener (native-smooth + user scroll);
- (ii) the container `scrollend` event (Baseline Chrome 114+ / Safari 18.2+ — fires after BOTH
  smooth AND instant programmatic writes; RAW unthrottled, so a dropped trailing throttle edge
  cannot strand the final rest position);
- (iii) a single-rAF-after-route-settle fallback chained off the demo router's route-change watcher
  (in-app nav, run ONCE post-navigation);
- (iv) **(NEW, F5) a post-mount RE-SWEEP** — on `onMounted` + a few subsequent rAFs (a short
  bounded re-sweep, NOT a guessed single frame), so a restoration that lands AFTER the listeners
  attach but with no scroll/route event still reveals every passed section. The harness must RE-RUN
  with restoration applied AFTER the mount/settle trigger and on a true reload (no route-change), and
  PROVE no strand in that adverse order — the currently-unverified load-bearing arm.

**The ONE-shared-observer singleton wiring (design + prove).** ONE observer + ONE pair of
`.demo-main-scroller` listeners per page, NOT N. The PAGE (StoryPage / CategoryPage) calls
`useSectionReveal(() => mainScrollerEl)` ONCE, provides `register` + `onRouteSettle` via
`provide()`, and each `StorySection` `inject`s `register` and calls it on mount. Demonstrate (capture
or harness) that the per-call model does NOT produce N observers + N scroll listeners on
`.demo-main-scroller`.

**The throttle source.** No throttle util exists in `demo/` — SHIP one (a small colocated
`throttle` or reuse a house leaf) in the actual `useSectionReveal.ts` file. The wiring is
scrollend/route-settle/mount-resweep → RAW unthrottled sweep; `scroll` → throttled.

```ts
// demo/stories/useSectionReveal.ts — the demo-private scroll-settle-reactive reveal (sketch; SHIP it).
export function useSectionReveal(getRoot: () => HTMLElement | null) {
    const pending = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null, root: HTMLElement | null = null;
    const reveal = (c: HTMLElement) => { c.setAttribute("data-revealed", ""); io?.unobserve(c); pending.delete(c); if (!pending.size) detach(); };
    const sweepRaw = () => {                                   // unthrottled — scrollend / route-settle / mount-resweep
        if (!root) return;
        const top = root.getBoundingClientRect().top;
        for (const c of [...pending]) if (c.getBoundingClientRect().bottom <= top) reveal(c);
    };
    const sweep = throttle(sweepRaw, 100);                     // throttled — scroll
    function detach() { root?.removeEventListener("scroll", sweep); root?.removeEventListener("scrollend", sweepRaw); }
    const register = (el: HTMLElement) => {                    // injected + called by each StorySection on mount
        root ??= getRoot();
        if (!("IntersectionObserver" in window) || !root) { el.setAttribute("data-revealed", ""); return; }  // no-IO floor → VISIBLE
        el.setAttribute("data-reveal-armed", "");             // INVERTED floor: armed → hide-until-revealed (SYNCHRONOUS, pre-paint — FOUC-safe)
        io ??= new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && reveal(e.target as HTMLElement)), { root, threshold: 0.15 });
        pending.add(el); io.observe(el);
    };
    const onRouteSettle = () => requestAnimationFrame(sweepRaw);   // hook (iii)
    onMounted(() => {
        root ??= getRoot();
        root?.addEventListener("scroll", sweep, { passive: true });   // (i)
        root?.addEventListener("scrollend", sweepRaw, { passive: true }); // (ii)
        requestAnimationFrame(sweepRaw); requestAnimationFrame(() => requestAnimationFrame(sweepRaw)); // (iv) bounded mount re-sweep — F5 adverse-order close
    });
    onScopeDispose(detach);
    return { register, onRouteSettle };
}
```

**FOUC.** `register` sets `data-reveal-armed` SYNCHRONOUSLY in the section's `onMounted`
(pre-paint); capture must confirm NO visible-then-hidden char flash.

The INVERTED CSS floor (pass-3 §2B'.3) STANDS — `[data-reveal-armed]
.story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em) }`, the
`[data-revealed]` reveal on `--spring-smooth` + `--char-stagger-step`, the `display:inline-block`
restate, the PRM terminal-visible arm. No-JS / JS-fail / no `data-reveal-armed` → heading VISIBLE.

**Congruence note (flag for the wave).** The heading reveals via IO+JS (threshold 0.15) while the
body rides native `.scroll-cascade` `view()` timelines — CONFIRM on capture the two sibling
registers fire CONGRUENTLY (the liquid-weight bar), not at visibly different scroll points on the
same section.

**Ship + type-check for real.** `demo/stories/useSectionReveal.ts` must exist and type-check WITH
the throttle import in the actual tree (the "vue-tsc clean" pass is vacuous while the file is absent).

### 2C'. Page-API — pass-3 §2C' STANDS, the converged hardenings

**(a-KISS) The StoryHeroBackdrop carve WRAPS its 6-branch `kind` switch in a SINGLE root** — AND
preserves the bleed compound selector (F-bleed-REGRESSION). `StoryHeroBackdrop.vue` wraps the
6-branch `v-if`/`v-else-if` `kind` chain in ONE root → trivially `els.length === 1`, single-root
GREEN. **The carve MUST NOT break `.constellation.story-hero-bg--bleed`** (`story-hero.css:132` +
the `.dark` arm `:140` — the B16 contrast lift in BOTH modes). The constellation child must keep a
`story-hero-bg--bleed` marker reachable by that compound selector (or the override is re-expressed to
the new nesting, e.g. a descendant `.story-hero-bg--bleed .constellation`), and the constellation
hero is CAPTURED to prove the B16 lift survives both modes. **Decision (lower-risk):** the bare
6-branch chain already GREENs the oracle (`els=6, chain=true`) AND preserves HEAD's
renders-nothing-when-empty semantics AND keeps the per-child classes (no override break). The
wrapper is adopted ONLY if it does NOT cost the bleed selector; if the single wrapper would drop the
child marker, keep the bare chain + the per-child `story-hero-bg--bleed` and rely on the oracle's
arbitrary-length-chain detection. Pick the option that keeps the constellation override intact.

**(a-defensive) The single-root oracle KEEPS the arbitrary-length conditional carve** — for OTHER
real leaves whose route root is a genuine `v-if`/`v-else` chain. The oracle is BUILT for real
(F-oracle-BUILD): `scripts/proof-story-page-api.mjs`, `@vue/compiler-sfc` `parse(src).descriptor.template.ast`,
`els.length===1` GREEN, the `v-if`/`v-else-if`-chain `isSingleIfChain` reproduction of Vue's
Transition-root rule (`v-else` has `hasExp:false`), the `v-for`-root RED guard, the conservative
`<template>`-root blind-spot RED guard, `v-show` non-false GREEN. It classifies BOTH `./*/*.vue` AND
the ROUTED depth-1 family (mirror `router.ts`'s route set — it routes `SectionLanding.vue →
CategoryPage` at `:31`): assert StoryPage / CategoryPage / StoryHeroBackdrop are EACH single-root
(the full-catalog claim is transitive and otherwise unenforced for the family). Register in
`gates.mjs` `[local,ci,release]`; restore the self-test bite (synthetic fragment + v-for-root +
`<template>`-root must RED; `v-show` + `v-if`/`v-else` chain must GREEN). Use the house `readdirSync`
idiom (112 users), NOT `globSync` (0 house users) — DEFT/DRY. Run GREEN in the battery over the
MIGRATED tree (the carve performed, the real StoryHeroBackdrop/CategoryPage in the classified set),
not un-carved HEAD.

**(b) The kind-switch mount + the bleed-modifier preservation** STANDS (BC.W-GRID-SIMPLE fence —
mount on the 6-branch `kind`, NOT `variant==='hero'`; `bgFullBleed = fullBleed || staticBackdrop`
keeps grid/paper content washes). Acceptance: a NON-hero forms/grid route renders its full-bleed
grid wash after the carve (the content-page grid-wash regression capture).

**(c) The descriptor is single-sourced from the shell** STANDS.

**(d) R2 — re-home the field-hue write into CategoryPage (the CORRECTED gating).** `CategoryPage.vue`
(which absorbs `SectionLanding.vue`) carries, in the SAME commit as the SectionLanding delete:
`import { warmFieldHue } from "./warm-field"` + `const cardFieldH = computed(() =>
warmFieldHue(category.value?.id ?? "foundations"))` + `:style="{ '--card-field-h': cardFieldH }"` on
the bento card host. **The gate is NOT `proof:field-accent-reconcile` (it does NOT exist).** The
gating FACTS are: (1) `warmFieldHue` IMPORTERS === 2 (`AppShell.vue` + `CategoryPage.vue` post-fold —
the `SectionLanding.vue` importer is replaced, NOT dropped); (2) a CAPTURED per-category
preview-card hue VARIANCE (not a uniform amber 62) — proving `SectionPreviewCard.vue:175`'s
`--card-field-h` read stays live. Verify the SectionPreviewCard painted hue FIRST; edit only on a
captured regression.

**(e) The blast-radius matrix — 15 gates + the SectionLanding-fold reaches SHARED libs (R3+R4),
re-point/retire ATOMICALLY** in the SAME commit as the deletes. A clean break that reds an unflagged
gate is NOT a clean break. Author StoryPageShell / StoryHeroBackdrop / CategoryPage FIRST, THEN
byte-finalize each re-point against the real carved text — each swap is correct ONLY IF the named
fact lands in the named file AND the marker class/prop survives name-compatible. The matrix carries
≥4-5 hand-written LOGIC rewrites (NOT filename swaps):

  - **StoryHero readers — 15 (was 14):**
    `proof-page-hierarchy`, `proof-grid-simple`, `proof-hierarchy` (the `variant==='page'` → `kind`
    guard, `:262`), `proof-ba-animate` (StoryHero → StoryPageShell), `proof-viz-papergrid`
    (filename swap → StoryHeroBackdrop), `proof-page-chassis` (the `landingUsesHero` `:493` + the
    `:527` list — a LOGIC rewrite), `proof-suffuse`, `proof-suffuse2`, `proof-split-chars`,
    `proof-glass-material-unified`, `proof-substrate-staging` (**audit the split** — G-MAP `:182`
    requires a `liveBackdrop` computed AND a `cardTier` selecting a thinner rung; `cardTier` (card
    host) → StoryPageShell while `liveBackdrop` + the 6-branch kind switch → StoryHeroBackdrop, so
    G-MAP reads BOTH files; G-NO-BLOB-FIELD `:164` → whichever file owns the kind switch),
    `proof-hero-audacious` (the HA5 landing-fold — a LOGIC rewrite), `proof-page-redesign` (**a
    MULTI-FILE rewrite, NOT a filename swap** — re-point the "glass Card" assert `:90` to
    `StoryPageShell.vue`, the 5 substrate asserts `:95/:99/:103/:116/:121` to `StoryHeroBackdrop.vue`,
    and §4 "StoryPage imports/composes StoryHero" `:163/:169` to `StoryPageShell`; this whole
    23-occurrence split-spanning gate is the load-bearing rewrite, NOT "1 import clause"),
    `proof-customizability-census` (StoryHero → StoryPageShell), **+ `proof-demo-radial-calm` (the
    15th — `:225` regex; ADD `StoryHeroBackdrop|StoryPage|CategoryPage` to the token set or the `\b`
    rejects the carved name; VERIFIED the `\b` after `StoryHero` rejects `StoryHeroBackdrop`).**
  - **SectionLanding fold (≥4 surfaces incl. SHARED libs):** `router.ts:31` (lazy import →
    `CategoryPage`); `surface-closure.mjs:163` (`seeds.add("demo/stories/SectionLanding.vue")` →
    `CategoryPage.vue` — a SHARED lib feeding `proof-ba-gestalt`); `proof-ba-gestalt.mjs:706` (the
    P6(a) closure assert `c.includes("demo/stories/SectionLanding.vue")` → `CategoryPage.vue`);
    `manifest.ts` (the `SectionLanding` TYPE name + `sectionLanding()` factory are DATA — do NOT
    delete; disambiguate from the COMPONENT delete); `proof-storybook-meta.mjs` M9d +
    `proof-page-hierarchy.mjs:83` (the StorySectionHeader allowlist — re-pointed with the
    StorySectionHeader fold, §2B').

  **The matrix's own falsifier:** EXECUTE the atomic commit on the REAL integration branch (WS1+WS4
  §0 HEAD-checks GREEN first) and run the FULL `gates.mjs` battery with ZERO unflagged reds BEFORE
  the `StoryHero.vue` / `SectionLanding.vue` deletes are final. `buildPassed=false` + grep-only is
  NOT the execution-pass bar.

### 2D. Suffusal — pass-3 §2D STANDS + the mode-aware chrome lift (D2)

Pass-3 §2D STANDS (VERIFY the `SectionPreviewCard` painted hue FIRST; edit the WRITE source — now
`CategoryPage`'s `--card-field-h` write per R2 — only on a captured regression). **D2 — the
chrome-chroma lift is MODE-AWARE, not chroma-only.** HEAD light bursts max C 0.085; HEAD dark bursts
the SAME low C at LOW L (0.30-0.46, a warm-ember floor) while the Apple reference dark cards are
BRIGHT tiles on black. The dark-mode gap is the BIGGER one and is an L gap: lift the dark
`SectionPreviewCard` toward a bright-tile read (L toward 0.55-0.65 AND C toward 0.13-0.15) while the
light arm takes the C 0.10-0.13 band. CHROME ONLY; body ink untouched (`proof:suffuse` d1-d3); the
warm-clamp `[25,95]` hue fence held UNLESS the user picks the rainbow fork (§6). FLAG-FOR-USER.

---

## 3. FILES TOUCHED (pass-3 §3 delta, converged)

Pass-3 §3 STANDS EXCEPT:

- **`demo/layout/dock-nav.css`** — the `.demo-scroll-progress` rebuild: `animation-timeline:
  scroll(nearest block)` (R1); the per-mode `--rail-fill-start`/`--rail-fill-end` pair (D1, the
  `.dark` arm bright high-L); the F-R6 `--scroll-rail-blur` thicker frost + tint floor; the new
  tokens `--scroll-rail-thickness` / `--z-scroll-rail` / `--field-h` default. NOT depended on:
  `scroll-timeline-name: --demo-main-progress` (WS1 owns its fate).
- **`demo/stories/useSectionReveal.ts` (NEW, colocated with StorySection)** — the demo-private
  scroll-settle-reactive reveal (R5); the shared-observer singleton (provide/inject); the four sweep
  hooks incl. the F5 mount re-sweep (R8); a shipped `throttle`. REPLACES the pass-3 `vScrollRevealOnce`
  mutation.
- **`src/composables/motion/useStaggerReveal.ts`** — UNCHANGED by WS11 (R5). `vScrollRevealOnce`
  left alone (module-exported, zero-consumer; the conditional retire does NOT fire on a partial grep).
- **`src/components/custom/split-chars/SplitChars.vue`** — `stagger?: boolean` (default `true`,
  byte-identical; drops `.char-stagger` when false).
- **`src/styles/scheme-motion.css`** — MINT `--char-stagger-step` (30ms).
- **`src/styles/typography/utilities.css`** (the VERIFIED `.char-stagger` home) — re-point the
  hardcoded stagger literal off `* 30ms` onto `var(--char-stagger-step)`.
- **`demo/stories/CategoryPage.vue` (NEW)** — folds `SectionLanding.vue` AND carries the
  `warmFieldHue → --card-field-h` write (R2), in the SAME commit as the delete.
- **`demo/stories/StoryPageShell.vue` (NEW)** + **`demo/stories/StoryHeroBackdrop.vue` (NEW)** — the
  collapsed shell + the single-root kind-switch backdrop (bleed marker preserved).
- **`scripts/proof-story-page-api.mjs` (NEW)** — the single-root oracle (F-oracle-BUILD); registered
  in `gates.mjs` `[local,ci,release]`.
- **`scripts/proof-demo-radial-calm.mjs`** — ADD `StoryHeroBackdrop|StoryPage|CategoryPage` to the
  `:225` token set (R3), in the atomic StoryHero-delete commit.
- **`scripts/lib/surface-closure.mjs` + `scripts/proof-ba-gestalt.mjs`** — re-point the
  `SectionLanding.vue` seed/assert string to `CategoryPage.vue` (R4).
- **The 13 other StoryHero-reader gates** — re-pointed per the §2C'(e) matrix (multi-file rewrites
  for page-redesign / page-chassis / hero-audacious / substrate-staging / hierarchy).
- **`docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (NEW — the dir is ABSENT at HEAD)** —
  ENROLL the four storybook surfaces (scroll-rail · section-entrance · page-API · suffuse) with
  routes + the freshness anchor, BEFORE close. `proof:ba-gestalt` G6 reds a BG-touched surface the
  roster omits.
- **`proof:no-layout-animation` (gates.mjs G4)** — WIDENED to scan the demo surface as part of WS11
  (the rail `clip-path` set, the section entrance transform/opacity, the glint transform all clear it).

---

## 4. WAVE BREAKDOWN — each wave carries its validated mechanism + real-paint-π bar

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** — the `scroll(nearest block)` clip-revealed `@property
   --scroll-fill` rail + mode-aware fill (D1) + the F-R6 `--scroll-rail-blur` thicker frost + the FLAT
   leading cap + the SpringProgress glint + the positional JS fallback.
   - **Validated mechanism:** the ancestor→descendant `@property --scroll-fill` inheritance hop
     PAINTS on real WebKit 26 (the FILL clip-path repaints monotonic 0→100%, getComputedStyle
     confirms) — the R6 LINCHPIN MECHANISM works on both engines (prototype build).
   - **Real-paint-π bar:** PT-A FIRST (the binding VISUAL frost capture on real WebKit 26 over REAL
     content, non-authoring agent, real GPU, both modes — frost VISUALLY diffuses, caps undistorted
     0→100%, the WebKit weak-frost RESOLVED to a thick-glassy read); `scroll-rail.spec.ts` committed
     + ENROLLED in the webkit `testMatch` (a 1-line add to `tests-visual/playwright.config.ts:117`);
     `railHealth()` (engine-agnostic, `grew` the killer tooth) GREEN on chromium AND webkit on the
     PRODUCTION DOM shape, forced-JS-fallback arm. railHealth GREEN is NECESSARY-NOT-SUFFICIENT.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** — the §2B' decouple + the two in-fence src/ edits (the
   `stagger` prop + `--char-stagger-step` in `typography/utilities.css`) + the demo-private
   `useSectionReveal` (R5) + the four sweep hooks incl. the F5 mount re-sweep (R8).
   - **Validated mechanism:** the COMBINED disjoint entrance (gl-char-rise heading + body cel
     `view()`-cascade) reads cleanly via `getAnimations()`-per-node on Chromium 148 + WebKit 26.4,
     incl. the instant-jump (scrollTop-no-event) arm (prototype build); the raw probe proved
     `scrollTop=2000` fires BOTH `scroll` AND `scrollend` on both engines (the "no scroll event"
     premise was empirically false for the programmatic-scroll path — the F5-reload restoration order
     is the remaining unproven arm).
   - **Real-paint-π bar:** PT-D re-verified against the LIVE `SplitChars(:stagger=false)` mount; the
     strand-proof captured with the F5 ADVERSE-ORDER restoration (restore after mount-settle, true
     reload) + the heading×body CONGRUENCE; FOUC-clean (no visible-then-hidden char flash); chromium
     AND real WebKit 26, both modes.
3. **`BG.W-STORY-PAGE-API`** (the capstone) — the collapsed `StoryPageShell` +
   `StoryPage`(stack)/`CategoryPage`(bento) + the single-root `StoryHeroBackdrop` (kind-switch mount,
   bleed marker preserved) + R2 (the field-hue re-home) + the §2C'(e) 15-gate/SHARED-lib atomic
   blast-radius (R3/R4) + the built oracle (F-oracle-BUILD).
   - **Validated mechanism:** `@vue/compiler-sfc 3.5.34` `parse().descriptor.template.ast` classifies
     single-root cleanly (type-1/2/3 + type-7 directives, `isSingleIfChain`, v-for/`<template>`-root
     RED guards) — the AST-over-regex oracle is sound (prototype build); the 15-gate matrix is
     grep-validated on real HEAD (the `\b` regex rejection of `StoryHeroBackdrop` CONFIRMED).
   - **Real-paint-π bar:** the oracle BUILT + registered + GREEN over the MIGRATED tree (incl. the
     routed depth-1 family); the FULL `gates.mjs` battery ZERO unflagged red BEFORE the deletes are
     final; the content-page grid-wash regression capture (a non-hero forms/grid route renders its
     full-bleed wash); the constellation-hero B16 bleed-lift survives both modes.
4. **`BG.W-STORYBOOK-SUFFUSE`** — the mode-aware chrome-chroma lift (D2, CHROME only) + the
   `--field-h` thread + the bg-gestalt-roster creation.
   - **Real-paint-π bar:** the per-category preview-card hue VARIANCE captured (not uniform amber 62
     — the R2 re-home landed); the dark bright-tile lift (L 0.55-0.65 / C 0.13-0.15) + the light C
     0.10-0.13 band; `proof:suffuse` d1-d3 GREEN (body ink untouched); both modes.

**Intra-WS sequence:** 1+2 parallel; 3 after 1+2; 4 last. ALL HARD-gate on WS1/WS4 (§0/§1).

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR (the four-arm gate, non-authoring agent, real GPU, both engines)

Pass-3 §5 STANDS (railHealth FIRST, the four-arm captures, the engine-agnostic `railHealth()` with
`grew` the killer tooth, the webkit testMatch enrollment). The converged four-arm acceptance, all
captured by a NON-AUTHORING agent on a real GPU, Chrome AND real Safari/WebKit 26, both modes, on the
INTEGRATED production tree:

1. **Rail — railHealth + VISUAL frost (PT-A, the R6 linchpin).** railHealth GREEN (the DATA tooth)
   on chromium AND webkit on the production DOM shape, forced-JS-fallback; AND the VISUAL frost
   VISUALLY diffuses content behind the sticky+clip strip over REAL content (the F-R6 weak-frost
   RESOLVED — thick-glassy on Safari, not Chrome-only), caps undistorted 0→100%, the descendant
   `clip-path` repaints each frame off the ancestor-inherited `@property --scroll-fill`. Mode-aware
   fill: dark reads near-WHITE high-L (CC-faithful), light reads the route-hue saturated end, both
   ≥3:1.
2. **Entrance — COMBINED disjoint (heading per-glyph × body cel) + strand-proof.** `getAnimations()`
   reads the two sibling registers firing CONGRUENTLY; the strand-proof includes the F5 ADVERSE-ORDER
   restoration (restore AFTER mount-settle, true reload, no scroll event) — every passed-section
   heading VISIBLE via the `scrollend`/route-settle/mount-resweep sweep; FOUC-clean; both modes.
3. **Page-API — single-root over the FULL catalog + content-page grid-wash regression.** The built
   oracle GREEN over the migrated tree incl. the routed family; the full `gates.mjs` battery ZERO
   unflagged red BEFORE the deletes; a non-hero forms/grid route renders its full-bleed grid wash
   (the BC.W-GRID-SIMPLE fence holds); the constellation-hero B16 bleed-lift survives both modes.
4. **Suffuse — hue VARIANCE.** The per-category preview-card painted hue VARIES (the R2 field-hue
   re-home landed); the mode-aware chrome lift reads (dark bright-tile, light chroma band); body ink
   untouched.

Plus the **bg-gestalt-roster verdict (capstone):** the four surfaces ENROLLED in the newly created
`bg-gestalt-roster.md`, re-earned on fresh non-authoring captures, Chrome AND real Safari/WebKit 26,
both modes.

---

## 6. FLAG-FOR-USER (the four owed confirmations — obtain BEFORE locking)

1. **The 4-name → 2-component page-API collapse** (StoryPage + CategoryPage over one shell; the four
   names = the conceptual depth ladder; the zero-logic shell makes re-expansion mechanical).
2. **The chrome-chroma punch lift — MODE-AWARE (D2).** Light: C 0.075 → 0.10-0.13. Dark: an L lift
   toward bright-tile-on-black (L 0.55-0.65) AND C 0.13-0.15 — the bigger gap. CHROME only.
3. **The warm-clamp vs RAINBOW CategoryPage bento fork (D3).** glass-ui clamps the bento field-hue to
   WARM `[25,95]` (no teal/blue/purple — the brand `warmFieldHue` fence); the Apple reference is full
   RAINBOW. **Option A (brand-consistent, DEFAULT):** MAX the warm-band chroma + L-contrast within
   the fence. **Option B (literal Apple):** relax the clamp to each link's `--section-color` hue —
   breaks warm-no-teal. The fork is the user's.
4. **The `useTypewriter` → SplitChars(:stagger=false) reinterpretation for section headings (R9).**
   The directive literally names `useTypewriter`; the spec REJECTS it on headings (mount-not-IO /
   per-char CLS / below-fold-invisible / a bouncy spell-out VIOLATES the iOS-27 calm-materialization
   read) and delivers SplitChars `:stagger=false` + IO-gated `gl-char-rise`. `useTypewriter` IS
   honored on the D0 front-door hero. The 279 sections inherit the reinterpretation — confirm.

RESOLVED-and-deferred: R1 timeline-source → `scroll(nearest block)` (the named-timeline reversal
RETIRED, aligns with WS1); R5 strand-proof → fresh demo-private `useSectionReveal` (the public-preset
overload RETIRED); `vScrollRevealOnce` left ALONE (module-exported, zero-consumer; no conditional
retire on a partial grep).

---

## 7. OPEN RISKS (re-scored, converged)

- **R6 (the central trap) → the binding PT-A, RESOLVE-not-punt.** **Falsifier:** the frost does not
  VISUALLY diffuse on real WebKit at the ~10px strip even with `--scroll-rail-blur` / the tint floor →
  the rail mechanism is wrong; fall back to a firm-tint (non-frost) bar with the same fill graphic.
  The DATA hop is proven; the VISUAL read on Safari is the open arm.
- **R1 → RESOLVED.** **Falsifier:** `scroll(nearest)` resolving to the wrong scroller on the PRODUCTION
  nesting (an unexpected intervening scroll container WS1's executor introduces — the orchestrator
  escalation).
- **R8 → RE-SCOPED to F5-reload.** **Falsifier:** an F5-restored heading still strands AFTER the
  mount re-sweep in the adverse order → the bounded re-sweep frame count is insufficient; hook the
  actual restoration or extend the re-sweep window.
- **R2 → a HARD migration step, CORRECTED gating.** **Falsifier:** a uniform-amber preview-card
  capture → the field-hue re-home did not land. (NOT gated on a phantom `proof:field-accent-reconcile`.)
- **R3/R4 → the 15-gate/SHARED-lib atomic matrix, multi-file rewrites.** **Falsifier:** any unflagged
  gate reds at the StoryHero/SectionLanding delete (the full battery on the integration branch catches
  it). The page-redesign / page-chassis / hero-audacious / substrate-staging / hierarchy rewrites are
  HAND-WRITTEN, not filename swaps.
- **R5 → RESOLVED via the fresh demo-private mechanism.** No public-preset contract burden.
- **Bleed-regression (F-bleed) → the carve preserves `.constellation.story-hero-bg--bleed`.**
  **Falsifier:** the constellation-hero B16 lift drops in either mode after the carve.

---

## 8. UNCONVERGED FRONTIER — the EXECUTION sequence (the gate, structurally UNMET)

The DESIGN is converged; the WORKSTREAM gate — real-paint on the integrated tree, Chrome AND real
Safari — is STRUCTURALLY UNMET (the integration branch does NOT exist, verified 2026-06-28; zero
captures; four user confirmations owed; the R6 WebKit-frost VISUAL arm unresolved). The execution
sequence:

0. **(BLOCKER) Stand the WS1+WS4 integration branch.** `git diff master..HEAD -- src/ demo/` is
   EMPTY; the §0 HEAD-checks are RED (`StoryPage.vue:72` still `.scroll-build`; `:220` still
   `scroll-cascade story-sections`; `StorySection.vue` heading still a plain `<h2>`). NO WS11 wave
   opens until WS1+WS4 land code and these go GREEN. Confirm WS1's executor introduces NO intervening
   scroll container between the bar and `.demo-main-scroller`.
1. **PT-A FIRST — the rail VISUAL prototype on real WebKit 26 AND Chromium** (R6, the linchpin),
   with the `--scroll-rail-blur` / tint-floor RESOLVE, over REAL content; + the railHealth enrolled
   spec (the DATA tooth, `grew` load-bearing, forced JS fallback).
2. **The §2B' decouple captured** — the COMBINED heading per-glyph × body cel-cascade DISJOINT +
   CONGRUENT, `gl-char-rise` proven cross-engine in-combination (PT-D re-verified against the LIVE
   `SplitChars(:stagger=false)` mount). Apply the two in-fence src edits for real (the `stagger` prop;
   `--char-stagger-step` in `typography/utilities.css`).
3. **The strand-proof captured** — the F5 ADVERSE-ORDER restoration (no scroll event, post-mount,
   true reload) on the REAL app scroll model, the `scrollend`/route-settle/mount-resweep sweep, no
   opacity:0 strand, FOUC-clean, Chrome AND Safari. Ship + type-check `useSectionReveal.ts` with the
   throttle import; prove the shared-observer singleton (no N observers/listeners).
4. **The migration + the 15-gate/SHARED-lib atomic re-point** — author StoryPageShell /
   StoryHeroBackdrop / CategoryPage FIRST, build + register + GREEN the oracle over the MIGRATED tree,
   perform the carve (bleed marker preserved), R2 (the field-hue re-home, importers===2 + hue
   variance), R3/R4 + the multi-file gate rewrites, run the FULL `gates.mjs` battery ZERO unflagged red
   BEFORE the deletes are final; capture the content-page grid-wash + constellation-bleed regressions.
5. **Real Safari/WebKit execution** — the webkit testMatch enrollment RUN (entrance + rail + page-API
   + oracle specs on real WebKit 26).
6. **USER CONFIRMATION** — the FOUR flags (the 4→2 collapse · the mode-aware chrome lift · the
   warm-clamp-vs-rainbow fork · the `useTypewriter`→SplitChars reinterpretation).
7. **Create `bg-gestalt-roster.md`** (the dir is absent) enrolling the four surfaces before close.

**Next pass:** stand the branch (WS1+WS4 §0 GREEN), RUN PT-A on both engines FIRST with the
weak-frost RESOLVE, build the rail + the decouple + the demo-private `useSectionReveal` strand-proof +
the collapsed shell + the single-root kind-switch carve, build + register the oracle, run the
migration with the atomic 15-gate/SHARED-lib multi-file re-point, then the four-arm acceptance on
Chrome AND real Safari by a non-authoring agent, both modes. Obtain user confirmation on the four
flags. The gate is real-paint on the integrated tree, Chrome AND Safari — unmet until ALL of this runs
GREEN.
