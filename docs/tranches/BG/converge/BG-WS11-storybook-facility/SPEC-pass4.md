# BG-WS11-storybook-facility — SPEC-pass4 (EXECUTION frontier)

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API family every page composes · consistent per-category suffusal. Both modes,
Chrome AND real Safari/WebKit 26, real-paint is the gate.

> **What pass-4 ADVANCES.** Pass-3 converged the DESIGN and folded its own five-arm
> critique. Pass-4 is the EXECUTION frontier — it does NOT re-design; it RESOLVES the
> seven NEW load-bearing findings the pass-4 research fleet surfaced and VERIFIED on
> real HEAD (`tranche/BG @e6682c7e`, 2026-06-28), each of which would have shipped a
> broken or self-contradicting tree. Pass-3 §§1-8 STAND except where a numbered item
> below supersedes them.
>
> 1. **R1 (HIGHEST — the cross-WS contradiction pass-3 is BLIND to). The timeline-source
>    REVERSAL-OF-THE-REVERSAL.** Pass-3 §0.6 hard-depends on the named `--demo-main-progress`
>    timeline surviving on `.demo-main-scroller`. But WS1's OWN `SPEC-pass4-converged.md`
>    (the §0.5-declared owner that lands FIRST) does the OPPOSITE — `:176/:183/:264`:
>    `.demo-scroll-progress { --scroll-progress-timeline: scroll(nearest block); }`, DROPS
>    `--scroll-progress-scroller`, and **"Reserve[s] named-timeline + `timeline-scope` for
>    `scroll-vt.vue`."** WS1 actively repurposes the timeline pass-3 leans on; the WS1
>    executor may delete the now-orphaned `scroll-timeline-name: --demo-main-progress`
>    (`dock-nav.css:201`) as dead code → pass-3's `animation-timeline: var(…, --demo-main-progress)`
>    resolves to nothing → DEAD bar. **RESOLUTION:** WS11 ALIGNS with WS1 — the demo bar
>    uses `scroll(nearest block)`, NOT the named timeline. Pass-3's "overflow:clip footgun"
>    premise was BACKWARDS: `overflow:clip` is exactly what PREVENTS the `scroll(nearest)`
>    hijack (only `overflow:hidden` creates a scroll container that hijacks the lookup —
>    Bram.us). The bar is a sticky child of `.demo-main-scroller` with no intervening scroll
>    container, so `scroll(nearest block)` resolves UP to that scroller. ONE resolution model
>    across both bars (DRY), zero dependency on a timeline WS1 is repurposing, and R7 (the
>    `var()`→named-timeline cross-engine compounding unknown) evaporates. §2A.
> 2. **R2 (HIGH — doubly load-bearing). The SectionLanding fold breaks WS1's field gate AND
>    WS11's own suffuse.** `SectionLanding.vue` is (a) one of WS1's exactly-TWO `warmFieldHue`
>    consumers (`:25/:48`; WS1's `proof:field-accent-reconcile` asserts the 2-consumer
>    presence) AND (b) the WRITE source of `--card-field-h` (`:113`) that `SectionPreviewCard.vue:175`
>    READS. Pass-3 folds/deletes SectionLanding into `CategoryPage` but NEVER re-homes the
>    `warmFieldHue → --card-field-h` write. Delete-without-rehome → WS1's gate drops to 1
>    consumer (reds) AND every preview card falls to default amber 62 (flat, un-suffused).
>    **RESOLUTION:** re-home the `warmFieldHue(categoryId) → --card-field-h` write into
>    `CategoryPage.vue` in the SAME commit as the delete; verify the per-category painted hue
>    VARIES on a real capture. §2C'(d) + §2D.
> 3. **R3 (the blast radius is 15 gates, not 14).** `proof-demo-radial-calm.mjs:225` carries a
>    LIVE regex `/<(Aurora|Constellation|FourierField|StoryHero|PaperBackdrop)\b/` (verified).
>    The `\b` means `StoryHero\b` will NOT match the carved `StoryHeroBackdrop` (next char "B"
>    is a word char), so a page rendering its wash via the carved component fails the gate.
>    **RESOLUTION:** add `StoryHeroBackdrop|StoryPage|CategoryPage` to that token set in the
>    SAME atomic commit. The matrix is 15 + the SectionLanding-fold reaches a SHARED lib. §2C'(e).
> 4. **R4 (the SectionLanding fold radius is ≥4 surfaces, not "the router importer").** Verified
>    beyond `router.ts:31`: `surface-closure.mjs:163` (`seeds.add("demo/stories/SectionLanding.vue")`
>    — a SHARED lib feeding the capstone), `proof-ba-gestalt.mjs:706` (P6(a) asserts the closure
>    literally `includes("demo/stories/SectionLanding.vue")`), and `manifest.ts` (`SectionLanding`
>    is ALSO a TYPE name + `sectionLanding()` factory — must NOT be conflated with the COMPONENT
>    delete). All re-pointed atomically. §2C'(e).
> 5. **R5 (the strand-proof over-engineers a zero-consumer directive into a contract rewrite).**
>    `vScrollRevealOnce` has ZERO binary consumers and is NOT barrel-exported (the risk fleet
>    grep — verify at execution). Pass-3's "mutates a SHIPPED public motion preset, MUST be
>    library-correct for ANY consumer" framing is moot, and the re-arch is a DIFFERENT contract
>    (shared-registry + container-rooted + passed-sweep), i.e. a rewrite not a mutation.
>    **RESOLUTION (KISS+colocate+no-contrivance):** the strand-proof reveal is a FRESH
>    DEMO-PRIVATE mechanism colocated with `StorySection` (`useSectionReveal`), NOT an overload
>    of the confused two-mode public-but-unused primitive. The now-confirmed-dead unexported
>    `vScrollRevealOnce` is retired as dead code (clean break) IFF the execution grep confirms
>    zero exports + zero consumers; else left untouched. Drops the `proof:motion-presets`
>    no-regression burden entirely. §2B'.3.
> 6. **R6 (the central headless-green/visually-broken trap — build=false). Safari VISUAL frost
>    is UNPROVEN.** P1 proved the DATA signal (`--scroll-fill` reflects in `getComputedStyle`).
>    It did NOT prove on the production shape: (a) `backdrop-filter:var(--glass-blur-quiet)`
>    actually FROSTING on a `position:sticky` + `overflow:clip` strip on real WebKit (WebKit
>    has a long sticky/clip backdrop-filter repaint-bug history, distinct from the url() bug);
>    (b) the `clip-path:inset()` caps undistorted 0→100%; (c) the ancestor→descendant
>    `@property`-inheritance hop under a scroll keyframe (P1 likely animated+read on ONE
>    element). **RESOLUTION:** PT-A is the binding visual prototype on real WebKit 26 BEFORE the
>    rail is trusted; railHealth GREEN is necessary-NOT-sufficient (§5).
> 7. **R8 (the strand sweep had no concrete trigger). The instant-jump restoration sets
>    `scrollTop` with NO scroll event.** The hand-rolled router exposes no scroll-complete
>    callback and `useScrollTo` exposes none. **RESOLUTION:** the sweep hooks the `scrollend`
>    event on the container (Baseline Chrome 114+ / Safari 18.2+ — fires after BOTH smooth AND
>    instant programmatic scrolls) with a single-rAF-after-route-settle fallback for engines
>    lacking it. Concrete hook, not a guessed frame count. §2B'.3.
>
> **Reference-grounded refinements (the user's iOS captures, `scratchpad/evidence/frames/`):**
> the rail FILL is MODE-AWARE (the CC slider fill is near-WHITE high-L — pass-3's flat
> `oklch(0.78 0.13 …)` reads too dark in dark mode; §2A.D1); the pill-cap question is ANSWERED
> (the CC fill leading edge is FLAT → `clip-path:inset()` is correct as-is, no rounded leading
> cap; §2A); the chrome-chroma lift is MODE-AWARE (dark-mode is the bigger gap — an L lift
> toward bright-tile-on-black, not chroma-only; §2D) and surfaces a warm-clamp-vs-rainbow FORK
> (§6 FLAG).
>
> **The DESIGN is converged; the WORKSTREAM gate — real-paint on the integrated tree, Chrome
> AND real Safari — is structurally UNMET** (the integration branch does not exist; zero
> captures have run; user confirmation owed). §8 is the cap.

---

## 0. SEQUENCING — WS11 ELEVATES, it does not re-fight (pass-3 §0 STANDS, two amendments)

Pass-3 §0 + §0.5 + §0.6 stand verbatim EXCEPT:

**§0.6 timeline-source — REVERSED to align with WS1 (R1).** The demo bar uses
`animation-timeline: scroll(nearest block)` (the WS1 resolution model), NOT the named
`--demo-main-progress` timeline. The §0 per-wave HEAD-check #3 is REWRITTEN:

> **HEAD-check #3 (rewritten).** The LIBRARY `.scroll-progress` recipe is WS1's
> `scroll(nearest block)` scaleX(0) floor (for `scroll-vt.vue` + external). The demo bar
> (`.demo-scroll-progress`) is WS11's LAST-writer self-contained recipe (§0.5) and ALSO uses
> `scroll(nearest block)` — so WS11 has NO dependency on WS1's named-timeline disposition.
> The OLD HEAD-check that `scroll-timeline-name: --demo-main-progress` survives is DELETED
> (no longer load-bearing). VERIFY ONLY that the bar is a sticky child of `.demo-main-scroller`
> with no intervening scroll container (so `scroll(nearest)` resolves to that scroller) — both
> WS1 and WS11 share this single fact.

**§0.5 ownership — UNCHANGED, the boundary reaffirmed.** WS1's M4 edits the LIBRARY
`.scroll-progress` recipe + hoists the UNCONDITIONAL `scaleX(0)` floor on the demo bar div as a
resting-invisible safety, then STOPS. WS11 (BG.W-SCROLL-PROGRESS-GLASSY) is the LAST writer on
`.demo-scroll-progress`: it strips the `.scroll-progress` class (clean break) and rebuilds the
TRACK + `__fill`. **The execution coordination note (G2):** WS1's M4 may set
`transform:scaleX(0)` on `.demo-scroll-progress` as a safety floor; WS11 REPLACES that div's
recipe wholesale, so WS11's rebuild is the final state — no churn collision (WS11 lands after
WS1 per the §0 intra-WS sequence). If both land in one integration branch, WS11's
`dock-nav.css` block is authored to be the complete final `.demo-scroll-progress` recipe.

---

## 1. GESTALT GOAL

Pass-3 §1 stands (the four-arm iOS-27 document system; the Control-Center recessed-channel
slider is the rail; the Apple Music page system is the depth ladder; the iOS calm
materialization wipe is the entrance). The reference fleet CONFIRMED both north-stars and
surfaced three mode-aware refinements folded into §2A / §2D and the §6 FLAG set.

---

## 2. MECHANISM (the pass-4 deltas; pass-3 §2 stands elsewhere)

### 2A. The thick glass progress rail (BG.W-SCROLL-PROGRESS-GLASSY)

Pass-3 §2A stands EXCEPT the timeline-source (R1) and the mode-aware fill (D1). The recipe:

```css
@property --scroll-fill { syntax: "<percentage>"; inherits: true; initial-value: 0%; }

.demo-scroll-progress {                       /* the TRACK — always visible, the ONE writer */
    position: sticky; inset-block-start: 0;
    z-index: var(--z-scroll-rail, 5);          /* above content, BELOW --z-dock:40 / --z-overlay:50 */
    pointer-events: none;
    block-size: var(--scroll-rail-thickness, 0.625rem);   /* √φ-proportioned, ~10px */
    border-radius: var(--radius-pill);
    overflow: clip;                            /* CAP-REVEAL — NEVER overflow:hidden (R1: clip AVOIDS the scroll(nearest) hijack) */
    background: var(--glass-bg-quiet);
    backdrop-filter: var(--glass-blur-quiet);  /* FIX#1: the WHOLE composite, never blur(var(composite)) */
    box-shadow:                                /* inner GROOVE + separation lift — depth w/o blur; PLAIN per-mode arms (no light-dark inset frag) */
        inset 0 1px 2px color-mix(in srgb, var(--foreground) 14%, transparent),
        0 1px 3px color-mix(in srgb, var(--shadow-color) 24%, transparent);
}
.demo-scroll-progress__fill {                  /* the FILL — clip-revealed, FLAT leading edge (reference-confirmed) */
    position: absolute; inset: 0;
    background: linear-gradient(90deg, var(--rail-fill-start) 0%, var(--rail-fill-end) 100%);
    clip-path: inset(0 calc(100% - var(--scroll-fill)) 0 0 round var(--radius-pill));  /* compositor-safe */
    border-block-start: 1px solid color-mix(in srgb, white 28%, transparent);  /* specular top edge */
}
@supports (animation-timeline: scroll()) {     /* FIX#4: @supports ONLY, NEVER a prefers-reduced-motion gate */
    @keyframes gl-scroll-fill { from { --scroll-fill: 0%; } to { --scroll-fill: 100%; } }
    .demo-scroll-progress {                    /* FIX#2: ONE animation on the TRACK; fill/glint inherit --scroll-fill */
        animation: gl-scroll-fill auto linear;
        animation-timeline: scroll(nearest block);  /* R1: WS1's model — overflow:clip prevents the hijack; sticky child resolves to .demo-main-scroller */
    }
}
@media (prefers-reduced-transparency: reduce) {  /* a SEPARATE axis from reduced-motion */
    .demo-scroll-progress { --glass-level: 0; backdrop-filter: none; background: var(--card); }
}
```

- **D1 — the FILL end is MODE-AWARE (reference, plain per-mode token pair — NEVER `light-dark()`,
  the inset-shadow trap).** The Control-Center reference fill is a near-WHITE high-L luminous
  solid (L≈0.88-0.95) against the dark frosted channel; pass-3's flat `oklch(0.78 0.13 field-h)`
  reads materially too DARK in dark mode. Express the endpoints as a per-mode pair declared the
  warm-cream way (light in the demo `:root`, dark in the `.dark` arm):
  - `--rail-fill-start`: `var(--card)` (warm-cream, both modes — FIX#3, NO `oklch(from …)`).
  - `--rail-fill-end`: LIGHT = `oklch(0.78 0.13 var(--field-h, 60))` (the route-hue saturated end,
    C 0.13 — needed for the ≥3:1-as-graphic silhouette against the light-quiet track); DARK
    (`.dark` arm) = `oklch(0.92 0.05 var(--field-h, 60))` (the CC-faithful bright high-L read,
    hue as a subtle tint against the dark channel). The fill-as-graphic clears ≥3:1 (WCAG 1.4.11)
    over the variable frosted backdrop in BOTH modes — verified on capture, not asserted.
- **The pill-cap question is ANSWERED (reference, §5 closed).** The CC reference fill has a FLAT
  horizontal leading edge (a clean cut), rounded TRAILING caps. `clip-path: inset(… round pill)`
  delivers exactly this — a FLAT fill leading edge inside the rounded track, the trailing cap
  rounded by the `round` term. NO rounded leading cap; the pass-3 open question is resolved — do
  NOT add a fill-local `border-radius`.
- **R1 — `scroll(nearest block)`, NOT the named timeline.** The TRACK is a sticky child of
  `.demo-main-scroller` (no intervening scroll container). `overflow:clip` on the TRACK is NOT a
  scroll container (clip ≠ scroll-container; only `overflow:hidden` would be), so it does not
  hijack `scroll(nearest)`; the lookup resolves UP to `.demo-main-scroller`. This is WS1's exact
  model — ONE resolution idiom, zero dependency on the named `--demo-main-progress` timeline WS1
  is repurposing for `scroll-vt.vue`. FIX#1/#2/#4 + the strip-reserve + the JS-fallback
  (`useScrollTrigger`, POSITIONAL, gated on `!supportsScrollTimeline()`) + the SpringProgress
  glint follower (`--glint-x`, PRM-dropped) all STAND from pass-3 §2A verbatim. The fallback
  scrolls `.demo-main-scroller` (the inner port), not `window`.

### 2B'. Section entrances — pass-3 §2B' STANDS (the decouple, the two in-fence src/ edits)

Pass-3 §2B' / §2B'.2 stand verbatim: the page-level `.story-sections` drops `.scroll-cascade`;
each `StorySection` composes two disjoint sibling registers (the heading
`class="text-subheading story-section__heading"` wrapping `<SplitChars :stagger=false>`; the
`.story-section__body` `flex flex-col gap-*` IS the reused `.scroll-cascade`); the `#heading` slot
is the no-typewriter escape; `SplitChars` gains `stagger?: boolean`; `--char-stagger-step` (30ms)
is the DRY single-source minted in `scheme-motion.css`. The `gl-char-rise` keyframe is net-new
and untested cross-engine in-combination → PT-D.

### 2B'.3. The strand-proof — RE-ARCHITECTED to a FRESH demo-private mechanism (R5 + R8)

Pass-3 §2B'.3 architecture (scroll-settle-reactive, ONE shared observer + the throttled
passed-sweep + the INVERTED CSS floor) STANDS — but it is NOT an overload of the public-but-unused
`vScrollRevealOnce`. **R5 RESOLUTION:** mint a FRESH demo-private mechanism colocated with
`StorySection`:

- **`useSectionReveal` (NEW, `demo/stories/useSectionReveal.ts`, colocated with `StorySection.vue`)**
  — the scroll-settle-reactive reveal: ONE shared page-level observer rooted on the bound scroll
  CONTAINER (the demo passes `.demo-main-scroller`), each registered section/heading observed
  once, revealed on crossing (IO `isIntersecting`) OR on the passed-sweep, then detached. It is
  DEMO-PRIVATE (off every barrel) — no `proof:motion-presets` no-regression burden, no
  "library-correct for any consumer" contract, KISS. The confused two-mode `vScrollRevealOnce`
  is NOT touched; IF the execution grep confirms it is unexported with zero binary consumers, it
  is retired as dead code (clean break, recorded) — otherwise left alone (out of WS11 scope).
- **R8 — the concrete sweep trigger (the instant-jump-no-scroll-event close).** The deep-link /
  back-nav restoration sets `scrollTop` with NO scroll event, so a scroll-listener alone misses
  it. The sweep fires on THREE hooks: (i) the throttled container `scroll` listener (native-smooth
  + user scroll); (ii) the container `scrollend` event (Baseline Chrome 114+ / Safari 18.2+ —
  fires after BOTH smooth AND instant programmatic `scrollTo`/`scrollTop` writes, the
  instant-jump close); (iii) a single-rAF-after-route-settle fallback for engines lacking
  `scrollend` (a `requestAnimationFrame` chained off the demo router's route-change watcher, run
  ONCE post-navigation — NOT a guessed mount-frame count). On each, reveal any pending child whose
  container-relative `bottom ≤ 0`; detach all listeners when `pending.size === 0`.

```ts
// demo/stories/useSectionReveal.ts — the demo-private scroll-settle-reactive reveal (sketch).
export function useSectionReveal(getRoot: () => HTMLElement | null) {
    const pending = new Set<HTMLElement>();
    const reveal = (c: HTMLElement) => { c.setAttribute("data-revealed", ""); io?.unobserve(c); pending.delete(c); };
    let io: IntersectionObserver | null = null, root: HTMLElement | null = null;
    const sweep = throttle(() => {
        if (!root) return;
        const top = root.getBoundingClientRect().top;
        for (const c of [...pending]) if (c.getBoundingClientRect().bottom <= top) reveal(c);
        if (!pending.size) detach();
    }, 100);
    const register = (el: HTMLElement) => { /* called by each StorySection on mount */
        root ??= getRoot();
        if (!("IntersectionObserver" in window) || !root) { el.setAttribute("data-revealed", ""); return; }
        el.setAttribute("data-reveal-armed", "");          // INVERTED floor: armed → hide-until-revealed
        io ??= new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && reveal(e.target as HTMLElement)), { root, threshold: 0.15 });
        pending.add(el); io.observe(el);
    };
    const onRouteSettle = () => requestAnimationFrame(() => sweep());   // hook (iii)
    onMounted(() => { root ??= getRoot(); root?.addEventListener("scroll", sweep, { passive: true }); root?.addEventListener("scrollend", sweep, { passive: true }); });   // hooks (i)+(ii)
    onScopeDispose(detach);
    return { register, onRouteSettle };
}
```

The INVERTED CSS floor (pass-3 §2B'.3) STANDS verbatim — `[data-reveal-armed]
.story-section__heading:not([data-revealed]) .char { opacity: 0; transform: translateY(0.4em) }`,
the `[data-revealed]` reveal on `--spring-smooth` + `--char-stagger-step`, the
`display:inline-block` restate, the PRM terminal-visible arm. No-JS / JS-fail / no
`data-reveal-armed` → heading VISIBLE (the no-preference floor holds). The honest guarantee: a
heading cannot strand POST-SCROLL-SETTLE (the three-hook sweep reacts to the real scroll; the
inverted floor covers no-JS).

### 2C'. Page-API — pass-3 §2C' STANDS, three pass-4 hardenings

Pass-3 §2C' (a)-(c) stand. Pass-4 hardens the carve shape and the blast radius:

**(a-KISS) The StoryHeroBackdrop carve WRAPS its 6-branch `kind` switch in a SINGLE root.**
The 6-branch `v-if`/`v-else-if` chain is a CHILD of the existing wrapper element, so the carve
AUTHOR chooses the root shape. Per KISS, `StoryHeroBackdrop.vue` wraps the chain in ONE root
element (`<div class="story-hero-bg" :class="bleedClass">` containing the `<template v-if>` chain)
→ trivially `els.length === 1`, single-root GREEN, no arbitrary-length-chain dependency for the
carved file itself.

**(a-defensive) The single-root oracle KEEPS the arbitrary-length conditional carve** — for the
OTHER real leaves in the full catalog (any leaf whose route root is a genuine `v-if`/`v-else`
chain). The pass-3 oracle (raw-parse, `els.length===1` GREEN, the `v-if`/`v-else-if`-chain
detection, the `v-for`-root RED guard, `v-show` non-false-GREEN) STANDS as the catalog-wide
robustness, even though the carved StoryHeroBackdrop trivially passes via the single wrapper.

**(b) The kind-switch mount + the bleed-modifier preservation** STANDS (BC.W-GRID-SIMPLE fence —
mount on the 6-branch `kind`, NOT `variant==='hero'`; `bgFullBleed = fullBleed || staticBackdrop`
keeps grid/paper content washes). Acceptance: a NON-hero forms/grid route renders its full-bleed
grid wash after the carve.

**(c) The descriptor is single-sourced from the shell** STANDS.

**(d) R2 — re-home the field-hue write into CategoryPage (doubly load-bearing).** `CategoryPage.vue`
(which absorbs `SectionLanding.vue`) carries `import { warmFieldHue } from "./warm-field"` +
`const cardFieldH = computed(() => warmFieldHue(category.value?.id ?? "foundations"))` +
`:style="{ '--card-field-h': cardFieldH }"` on the bento card host — in the SAME commit as the
SectionLanding delete. This keeps WS1's `proof:field-accent-reconcile` 2-consumer presence GREEN
AND keeps `SectionPreviewCard.vue:175`'s `--card-field-h` write live (the suffuse arm). The other
`warmFieldHue` consumer is WS1's shell field; CategoryPage is the second.

**(e) The blast-radius matrix — 15 gates + the SectionLanding-fold reaches a SHARED lib (R3+R4).**
Re-point/retire ATOMICALLY, in the SAME commit as the `StoryHero.vue` / `SectionLanding.vue`
deletes — a clean break that reds an unflagged gate is not a clean break:

  - **StoryHero readers (15, was 14):** `proof-page-hierarchy`, `proof-grid-simple`,
    `proof-hierarchy`, `proof-ba-animate`, `proof-viz-papergrid`, `proof-page-chassis`,
    `proof-suffuse`, `proof-suffuse2`, `proof-split-chars`, `proof-glass-material-unified`,
    `proof-substrate-staging`, `proof-hero-audacious`, `proof-page-redesign`,
    `proof-customizability-census`, **+ `proof-demo-radial-calm` (the 15th — `:225` regex
    `/<(…|StoryHero|…)\b/`; ADD `StoryHeroBackdrop|StoryPage|CategoryPage` to the token set or
    the `\b` rejects the carved name).**
  - **SectionLanding fold (≥4):** `router.ts:31` (the lazy import → `CategoryPage`);
    `surface-closure.mjs:163` (`seeds.add("demo/stories/SectionLanding.vue")` → `CategoryPage.vue`
    — a SHARED lib feeding `proof-ba-gestalt`); `proof-ba-gestalt.mjs:706` (the P6(a) closure
    assert string `includes("demo/stories/SectionLanding.vue")` → `CategoryPage.vue`); `manifest.ts`
    (the `SectionLanding` TYPE name + `sectionLanding()` factory are DATA, NOT the component — do
    NOT delete; disambiguate). `proof-storybook-meta.mjs` M9d + `proof-page-hierarchy.mjs:83`
    (the StorySectionHeader allowlist — re-pointed with the StorySectionHeader fold, §2B').

### 2D. Suffusal — pass-3 §2D STANDS + the mode-aware chrome lift (D2)

Pass-3 §2D stands (VERIFY the `SectionPreviewCard` painted hue FIRST; edit the WRITE source —
now `CategoryPage`'s `--card-field-h` write per R2 — only on a captured regression). **D2 — the
chrome-chroma lift is MODE-AWARE, not chroma-only (reference).** HEAD light bursts max C 0.085;
HEAD dark bursts the SAME low C at LOW L (0.30-0.46, a warm-ember floor) while the Apple reference
dark cards are BRIGHT tiles on black. So the dark-mode gap is the BIGGER one and is an L gap, not
just a chroma gap: lift the dark `SectionPreviewCard` toward a bright-tile read (L toward
0.55-0.65 AND C toward 0.13-0.15) while the light arm takes the C 0.10-0.13 band. CHROME only;
body ink untouched (`proof:suffuse` d1-d3); the warm-clamp `[25,95]` hue fence held UNLESS the
user picks the rainbow fork (§6). FLAG-FOR-USER.

---

## 3. FILES TOUCHED (pass-3 §3 delta)

Pass-3 §3 stands EXCEPT:

- **`demo/layout/dock-nav.css`** — the `.demo-scroll-progress` rebuild uses
  `animation-timeline: scroll(nearest block)` (R1, NOT the named timeline); the per-mode
  `--rail-fill-start`/`--rail-fill-end` pair (D1, the `.dark` arm bright high-L). The
  `scroll-timeline-name: --demo-main-progress` on `.demo-main-scroller` is NOT depended on (WS1
  owns its fate).
- **`demo/stories/useSectionReveal.ts` (NEW, colocated with StorySection)** — the demo-private
  scroll-settle-reactive reveal (R5); REPLACES the pass-3 `vScrollRevealOnce` mutation. The
  `scrollend` + route-settle-rAF sweep hooks (R8).
- **`src/composables/motion/useStaggerReveal.ts`** — UNCHANGED by WS11 (R5). IF the execution
  grep confirms `vScrollRevealOnce` is unexported + zero-consumer, a SEPARATE clean-break retire
  is recorded; not a WS11-blocking edit.
- **`demo/stories/CategoryPage.vue` (NEW)** — folds `SectionLanding.vue` AND carries the
  `warmFieldHue → --card-field-h` write (R2).
- **`scripts/proof-demo-radial-calm.mjs`** — ADD `StoryHeroBackdrop|StoryPage|CategoryPage` to
  the `:225` token set (R3), in the atomic StoryHero-delete commit.
- **`scripts/lib/surface-closure.mjs` + `scripts/proof-ba-gestalt.mjs`** — re-point the
  `SectionLanding.vue` seed/assert string to `CategoryPage.vue` (R4).
- **`docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (NEW — the dir is ABSENT at HEAD)** —
  ENROLL the four storybook surfaces (scroll-rail · section-entrance · page-API · suffuse) with
  their routes + the freshness anchor, BEFORE close. `proof:ba-gestalt` G6 reds a BG-touched
  surface the roster omits.
- **The demo CSS comes UNDER `proof:no-layout-animation` (the W11 demo-widening, gates.mjs:218
  G4).** The rail fill (`clip-path` — compositor-safe set), the section entrance
  (transform/opacity), the glint (transform) all clear it; the gate is widened to scan the demo
  surface as part of WS11.

---

## 4. WAVE BREAKDOWN (pass-3 §4 STANDS, the deltas folded)

1. **`BG.W-SCROLL-PROGRESS-GLASSY`** — pass-3 wave 1 + R1 (`scroll(nearest block)`) + D1
   (mode-aware fill) + the answered FLAT-leading-cap. railHealth committed + enrolled on both
   engines; PT-A is the binding visual prototype FIRST.
2. **`BG.W-SECTION-TYPEWRITER-FADEUP`** — pass-3 wave 2 + R5 (`useSectionReveal` demo-private,
   NOT a public-preset overload) + R8 (the `scrollend` + route-settle sweep hooks). The two
   in-fence src/ edits (the `stagger` prop + `--char-stagger-step`) STAND.
3. **`BG.W-STORY-PAGE-API`** — pass-3 wave 3 + the KISS single-root carve wrap + R2 (the
   field-hue re-home) + the 15-gate/SHARED-lib atomic blast-radius (R3/R4). The capstone.
4. **`BG.W-STORYBOOK-SUFFUSE`** — pass-3 wave 4 + D2 (the mode-aware chrome-chroma lift) + the
   bg-gestalt-roster creation.

**Intra-WS sequence (STANDS):** 1+2 parallel; 3 after 1+2; 4 last. All HARD-gate on WS1/WS4 (§0).

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR (pass-3 §5 STANDS, the pass-4 additions)

Pass-3 §5 stands (railHealth FIRST, the four-arm captures, the engine-agnostic `railHealth()`
with `grew` the killer tooth, the webkit testMatch enrollment). Pass-4 ADDS:

- **PT-A is binding BEFORE the rail ships (R6).** railHealth GREEN (the DATA tooth) is
  NECESSARY-NOT-SUFFICIENT. The VISUAL prototype on real WebKit 26 — frost VISUALLY diffuses
  content behind the sticky+clip strip, caps undistorted 0→100%, the descendant `clip-path`
  repaints each frame off the ancestor-inherited `@property --scroll-fill` — is the linchpin
  capture by a NON-authoring agent on a real GPU.
- **The rail fill MODE read (D1).** Dark-mode fill reads near-WHITE high-L (CC-faithful) against
  the dark frosted channel; light-mode fill reads the route-hue saturated end; both ≥3:1.
- **The strand-proof INSTANT-JUMP arm (R8).** The capture includes a hash deep-link AND a
  back-nav restoration that sets `scrollTop` with NO scroll event — every passed-section heading
  VISIBLE via the `scrollend`/route-settle sweep, not only the native-smooth path; chromium AND
  webkit, both modes.
- **The R2 suffuse arm.** The per-category painted preview-card hue VARIES (not a uniform amber
  62) after the SectionLanding fold — proving the `warmFieldHue → --card-field-h` re-home landed.
- **The 15-gate matrix GREEN.** `proof-demo-radial-calm` (the 15th) + the SectionLanding-fold
  re-points (`surface-closure` + `proof-ba-gestalt` P6(a)) all GREEN post-carve; ZERO unflagged
  red across the full `gates.mjs` battery on the integration branch BEFORE any delete is final.
- **The bg-gestalt-roster verdict (capstone).** The four surfaces ENROLLED in the (newly created)
  `bg-gestalt-roster.md`, re-earned on fresh non-authoring captures, Chrome AND real Safari/WebKit
  26, both modes.

---

## 6. FOLDED / DEFERRED + FLAG-FOR-USER (pass-3 §6 STANDS, the flag set EXPANDED)

Pass-3 §6 stands. The **FLAG-FOR-USER set is now FOUR** (each deviates from / extends the literal
ask — the cheapest things to get wrong at scale; obtain confirmation before locking):

1. **The 4-name → 2-component page-API collapse** (StoryPage + CategoryPage over one shell; the
   four names = the conceptual depth ladder; the zero-logic shell makes re-expansion mechanical).
2. **The chrome-chroma punch lift — now MODE-AWARE (D2).** Light: C 0.075 → 0.10-0.13. Dark: an L
   lift toward bright-tile-on-black (L 0.55-0.65) AND C 0.13-0.15 — the bigger gap. CHROME only.
3. **The warm-clamp vs RAINBOW fork (D3 — NEW).** glass-ui clamps the bento field-hue to WARM
   `[25,95]` (no teal/blue/purple — the brand `warmFieldHue` fence); the Apple reference is full
   RAINBOW (each tile its own hue). **Option A (brand-consistent):** MAX the warm-band chroma +
   L-contrast (amber/gold/terracotta punch within the fence). **Option B (literal Apple):** relax
   the clamp for CategoryPage bento cards to each link's `--section-color` hue (full rainbow) —
   breaks warm-no-teal. The §1 chrome lift is Option A by default; the fork is the user's.
4. **The `useTypewriter` → SplitChars-per-glyph reinterpretation for section headings (R9 — NEW
   flag).** The directive literally names `useTypewriter`; the spec REJECTS it on headings
   (mount-not-IO / per-char CLS / below-fold-invisible — reference-validated: a bouncy spell-out
   VIOLATES the iOS-27 calm-materialization read) and delivers SplitChars `:stagger=false` +
   IO-gated `gl-char-rise`. `useTypewriter` IS honored on the D0 front-door hero. 279 sections
   inherit the reinterpretation — confirm before building.

ADDED to deferred: **R1 timeline-source RESOLVED to `scroll(nearest block)`** (the named-timeline
reversal RETIRED — aligns with WS1, no dependency on a timeline WS1 repurposes). **R5 the
strand-proof is a fresh demo-private `useSectionReveal`** (the public-preset overload RETIRED).

---

## 7. OPEN RISKS (pass-3 §7 STANDS, re-scored + the pass-4 resolutions)

Pass-3 §7 risks 1-8 stand. Re-scored / resolved:

- **R1 (was a BLIND contradiction) → RESOLVED.** The demo bar uses `scroll(nearest block)`,
  aligning with WS1; no named-timeline dependency. **Falsifier:** `scroll(nearest)` resolving to
  the wrong scroller on the PRODUCTION nesting (PT-A — but the overflow:clip premise is verified
  sound; the risk is an unexpected intervening scroll container).
- **R6 (the central trap) → the binding PT-A.** **Falsifier:** the frost does not diffuse / the
  caps distort / the `@property`-inheritance hop does not repaint on real WebKit → the rail
  mechanism is wrong, fall back to a SVG-mask-free firm-tint bar.
- **R8 → RESOLVED via `scrollend` + route-settle-rAF.** **Falsifier:** an instant-jump heading
  still stranding after the sweep → revealHeading is unsafe default-on.
- **R2 → a HARD migration step.** **Falsifier:** a uniform-amber preview-card capture → the
  field-hue re-home did not land.
- **R3/R4 → the 15-gate/SHARED-lib atomic matrix.** **Falsifier:** any unflagged gate reds at the
  StoryHero/SectionLanding delete (the full battery on the integration branch catches it).
- **R5 → RESOLVED via the fresh demo-private mechanism.** No public-preset contract burden.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief — EXECUTION on a tree that does not exist)

Pass-3 §8 STANDS (the integration branch does not exist; `git diff master..HEAD -- src/ demo/`
EMPTY, verified 2026-06-28; WS1+WS4 must land code first; the §0 HEAD-checks must go GREEN). The
pass-4 additions to the execution sequence:

0. **(BLOCKER) Stand the integration branch (WS1+WS4 GREEN).** The pass-4 §0 HEAD-check #3 is
   REWRITTEN (no named-timeline-survival check; verify only the sticky-child-of-`.demo-main-scroller`
   fact). **Escalation note for the orchestrator:** WS1 and WS11 now BOTH resolve via
   `scroll(nearest block)` — the R1 contradiction is dissolved, but the orchestrator should
   confirm WS1's executor does not introduce an intervening scroll container between the bar and
   the scroller (the one shared fact both bars depend on).
1. **PT-A FIRST — the rail VISUAL prototype on real WebKit 26 AND Chromium** (R6, the linchpin)
   + the railHealth enrolled spec (the DATA tooth, `grew` load-bearing, forced JS fallback).
2. **The §2B' decouple captured** — the COMBINED heading per-glyph × body cel-cascade DISJOINT,
   `gl-char-rise` proven cross-engine in-combination on real WebKit 26 (PT-D).
3. **The strand-proof captured** — deep-link + INSTANT-JUMP restoration (no scroll event) +
   F5-mid-scroll on the REAL app scroll model, the `scrollend`/route-settle sweep, no opacity:0
   strand, Chrome AND Safari.
4. **The migration + the 15-gate/SHARED-lib atomic re-point** — single-element root over the FULL
   catalog (the oracle + the conditional carve + the wrapped StoryHeroBackdrop), the kind-switch
   carve surviving one-GL-per-route + the content-page grid-wash regression capture + R2 (the
   field-hue re-home) + R3/R4 (the gate re-points) all GREEN.
5. **Real Safari/WebKit execution** — the webkit testMatch enrollment RUN (entrance + rail +
   page-API specs on real WebKit 26).
6. **USER CONFIRMATION** — the FOUR flags (the 4→2 collapse · the mode-aware chrome lift · the
   warm-clamp-vs-rainbow fork · the useTypewriter→SplitChars reinterpretation).
7. **Create `bg-gestalt-roster.md`** (the dir is absent) enrolling the four surfaces before close.

Next pass: stand the branch, RUN PT-A on both engines FIRST, build the rail (`scroll(nearest
block)` + mode-aware fill) + the decouple + the demo-private `useSectionReveal` strand-proof +
the collapsed shell + the kind-switch carve, run the migration with the atomic 15-gate/SHARED-lib
re-point, then the four-arm acceptance on Chrome AND real Safari. Obtain user confirmation on the
four flags.
