# BG-WS11-storybook-facility — SPEC-pass3

Storybook facility: a FUNCTIONING thick glassy scroll-progress rail · section
typewriter + fade-up entrances on liquid-weight spring clocks · ONE standardized
page-API family every page composes · consistent per-category suffusal. Both
modes, Chrome AND real Safari, real-paint is the gate.

> **What pass-3 ADVANCES over pass-2 (it does not restart).** Pass-2 converged the
> DESIGN (P1-P5) and is the binding base for §0/§1/§2A/§2C/§2D/§3/§4/§5/§6 — read it
> for those. Pass-3 folds the THREE things the pass-3 research/risk fleet changed by
> EXECUTING on real engines, not estimating:
>
> 1. **P1 + the `view()` body-cascade + the single-root oracle are now EXECUTED-PROVEN
>    on real WebKit 26.4 + `@vue/compiler-sfc`** (were `build=false` estimates). The
>    Safari capability is no longer the load-bearing open risk — it is closed. §0.7bis
>    re-grades the ledger.
> 2. **The §2B heading-entrance architecture is RE-CUT** (§2B' below). Pass-2's
>    "EXCLUDE the heading from `.scroll-cascade > *`" criterion is **vacuous** — on a
>    HERO page the StorySection ROOT is itself a `.scroll-cascade > *` child
>    (`StoryPage.vue:220`, verified), so the whole section BLOCK translate+fades WHILE
>    its heading glyphs also rise → a compounded double-motion the exclude-criterion
>    passes through. Pass-3 resolves it ARCHITECTURALLY (the decouple), not by gate
>    wording.
> 3. **The deep-link strand is a CONFIRMED default-on bug** (`grep -c
>    getBoundingClientRect useStaggerReveal.ts == 0`, verified). Pass-2 named the
>    mitigation; pass-3 makes it a BINDING src/ edit with an EXHAUSTIVE no-strand
>    guarantee + a CSS terminal-visible floor (§2B'.3).
>
> Everything else in pass-2 stands. The DESIGN is converged; the EXECUTION frontier
> (§8 — integration branch + the migration + Chrome AND Safari real-paint) is the cap.

---

## 0.7bis. PROTOTYPE LEDGER — RE-GRADED (the pass-3 fleet EXECUTED the build=false items)

The pass-3 risk arm ran the three load-bearing pass-2 estimates on the project's
bundled Playwright engines (chromium + `webkit Version/26.4 Safari/605.1.15` = the
real Safari 26 target) and on `@vue/compiler-sfc`. The verdicts:

| # | Pass-2 grade | Pass-3 EXECUTED verdict |
|---|---|---|
| **P1** | build=false / 90% | **EXECUTED-PROVEN on real WebKit 26.4.** A registered `@property --scroll-fill {syntax:"<percentage>";inherits:true}` animated on `scroll(nearest block)` is reflected LIVE: `getComputedStyle(fill).--scroll-fill` → `0%` at top → `88.856%` at 0.8 → **no drift after 400ms**; `animationTimeline:"scroll()"`; `getAnimations()[0].currentTime` non-null (a `%`-STRING on WebKit, a number on Chromium — the `currentTime != null` tooth survives both). **The gate is the SIMPLE `!supportsScrollTimeline()`. The single biggest open risk is CLOSED.** |
| **view()** | (implied) | **EXECUTED-PROVEN on WebKit 26.4.** `opacity 0→1` on `view()` with `animation-range: entry entry 45%` scrubs live; `animationTimeline:"view()"`. The §2B' body-cascade BASE arm works cross-engine TODAY (it does NOT depend on the WS4 D14 fix — only the OPT-IN `--columns` flourish does). |
| **P5 oracle** | build=false / 79% | **EXECUTED-PROVEN.** `@vue/compiler-sfc` parse: single-root (comment+element) → top-level element-count 1; fragment → 2. **NEW CAVEAT (pass-3 falsifier):** a naive count===1 FALSE-REDs a legit `v-if`/`v-else` root (2 element children, 1 renders). The oracle MUST carry the else-directive carve (§2C'.oracle) or it red-flags real leaves. |

P2 (bar coexistence), P3 (reveal-on-crossing, Chromium), P4 (ship-2) stand as
pass-2 graded. The remaining genuinely-un-run items (the cap): the integration
branch, the railHealth fixture on the integrated tree, the §2B' decouple captured,
the 279-section sweep + deep-link strand-proof, the 2-component shell rendered +
the migration, and Chrome-AND-Safari real-paint.

---

## 1. GESTALT GOAL

Unchanged from pass-2 §1 (the four-arm iOS-27 document system: glass rail · section
typewriter+fade-up · ONE page-API family · per-category suffusal). The reference
north-star is the user's dark-mode iOS captures (`scratchpad/evidence/frames/`):
the **Control-Center recessed-channel slider** is the literal rail gestalt (empty
frosted channel always visible, luminous clip-revealed fill with UNDISTORTED pill
caps, groove inset + specular edge → floating chrome glass, NOT a 2px hairline); the
**Apple Music page system** is the depth ladder (D1 bento ≡ the technicolor
card grids; D2/D3 ≡ the bold-subheading section stacks). The entrance is the iOS
**calm materialization wipe** (opacity + small translateY on a smooth spring), never
a bouncy spell-out.

**Reference-grounded enhancement (pass-3, low-risk, flag-for-user with the 4→2
collapse): the cartoon-technicolor punch is UNDER-met on chrome surfaces.** The
Apple-Music bento cards are pure-saturated (C≈0.2); the storybook SectionPreviewCard
is warm-cream low-chroma (C 0.075). The rail fill already reaches C 0.13. Because the
rail AND the bento card are CHROME (exempt from the one-color-event body-ink count),
lifting the D1 SectionPreviewCard chroma toward the rail-fill's already-shipped
C 0.10-0.13 band lands the punch WITHOUT breaking body-ink-untinted proportion or the
no-gray warm identity. This is the single highest-leverage reference enhancement —
chrome only; the low-chroma WARM read on CONTENT surfaces is untouched. (Pass-3 names
it; it rides BG.W-STORYBOOK-SUFFUSE as a chrome-chroma lift, not a content change.)

---

## 2. MECHANISM — the pass-3 advances

§2A (the thick glass rail) and §2C (the page-API family) stand as pass-2 wrote them
(read pass-2 §2A/§2C). The rail recipe — TRACK + clip-revealed FILL on inherited
`@property --scroll-fill`, `backdrop-filter: var(--glass-blur-quiet)` (the WHOLE
composite, FIX#1), drive under `@supports` ONLY (FIX#4), `scroll(nearest block)`,
gate `!supportsScrollTimeline()`, JS `SpringProgress` glint follower for the
liquid-weight — is unchanged and P1-confirmed cross-engine.

### 2B'. Section entrances — THE DECOUPLE (re-cut; resolves the double-bind)

**The hole pass-2 missed.** Pass-2 put `.scroll-cascade` on the page-level
`.story-sections` wrapper (`StoryPage.vue:220`, verified) AND per-glyph reveal on
each section's heading. On a HERO page that makes each `<StorySection>` a
`.scroll-cascade > *` child → the whole section BLOCK lifts+fades on a `view()`
timeline WHILE the heading glyphs rise per-glyph on the IO gate. Same visual block,
two entrance registers, two triggers (scrubbed `view()` vs discrete IO-crossing) →
desynced muddiness. Pass-2's "exclude the heading from `.scroll-cascade > *`" is
VACUOUS: the heading is a grand-child, already not a `>*` child, so the criterion
passes while the block-carries-the-heading-passively compounding persists.

**The resolution — gestalt-not-patch: retire the page-level block cascade; each
StorySection composes its entrance INTERNALLY as two disjoint sibling registers.**

- **The page-level `.story-sections` wrapper DROPS `.scroll-cascade`** (clean break —
  the section block no longer translates as a unit). `StoryPageShell` owns this
  wrapper; the drop is in-fence (demo-side).
- **`StorySection` owns its entrance composition internally**, two SIBLING registers
  that never superimpose on one visual block:
  1. **The heading register** — `.story-section__heading` (the `<h2 text-subheading>`,
     a DIRECT child of the section root) wraps its text in `<SplitChars :stagger=false>`
     and the section root binds `vScrollRevealOnce` → `data-revealed` lands ON the
     heading → `.story-section__heading[data-revealed] .char` rises per-glyph (the
     P3-corrected selector). ONE motion, on the heading's `.char` descendants only.
  2. **The body register** — a `.story-section__body` wrapper (the default `<slot/>`
     content) IS the `.scroll-cascade`; its DIRECT children (the ShowcaseFrame cels)
     fade-up on their own per-child `view()` timeline. ONE motion, on the body cels
     only.
  The heading and the body are SIBLINGS. No node is both a `.scroll-cascade`
  descendant-block AND a per-glyph-reveal host — **disjoint by construction**, not by
  gate wording. The section "builds" because its parts build (the heading typewriters,
  the cels fade-up) — MORE refined than a whole-block translate, and KISS.

**Why this is also DRY + correct cross-engine.** The body register REUSES the shipped
`.scroll-cascade` VERBATIM (no re-declaration of `gl-cascade-build` / `.scroll-cascade
> *` — the same-name-strips-`--ease-scroll-spring` trap pass-2 guards). The BASE
`.scroll-cascade` is EXECUTED-PROVEN on WebKit 26.4 (§0.7bis), so the body fade-up
works cross-engine TODAY — it does NOT block on the WS4 D14 fix (only the opt-in
`.scroll-cascade--columns` flourish, e.g. `foundations/colors.vue`, consumes D14).

**The gate clause that now has TEETH** (`proof:section-entrance`, the §2B arm):
(a) `.story-sections` does NOT carry `.scroll-cascade` (the page-level block cascade
is retired); (b) the per-glyph-reveal host (`.story-section__heading`) is NEVER a
`.scroll-cascade` descendant; (c) the `.story-section__body` IS the cascade and its
children are NOT per-glyph hosts; (d) a self-test bite: a synthetic StorySection that
puts `.scroll-cascade` on the section root (re-introducing the double-bind) REDs.

### 2B'.2. The two in-fence src/ edits (unchanged from pass-2 §2B, restated for completeness)

- **`SplitChars.vue` — add `stagger?: boolean` (default `true`).** Line 90 is
  `cn("char-stagger", props.class)` UNCONDITIONAL (verified). `:stagger="false"` omits
  the `.char-stagger` host → BARE `.char` spans + `--char-index`/`--char-total`;
  `aria-label`(full text) + per-glyph `aria-hidden` PRESERVED; engine-FREE (composes
  `useCharStagger` only → root-barrel-safe). Additive, no fork.
- **Mint `--char-stagger-step` (default `30ms`) in `scheme-motion.css`** (NOT
  scroll-tokens.css — a reveal cadence is not scroll-driven) and re-point BOTH
  `typography/utilities.css:158` (the hardcoded `30ms` `.char-stagger` recipe) AND the
  new `section-entrance.css` reveal onto the ONE token (kills the 24-vs-30ms drift).

`section-entrance.css` (NEW, colocated) is MINIMAL — ONE
`.story-section__heading[data-revealed] .char` reveal rule + the load-bearing
`.story-section__heading .char { display: inline-block }` (translateY no-ops on inline)
+ the `gl-char-rise` keyframe (opacity 0→1, translateY(0.4em)→0, on `--spring-smooth` +
`--spring-smooth-duration`) + the PRM terminal-visible arm. It re-declares NEITHER
`gl-cascade-build` NOR `.scroll-cascade > *`.

### 2B'.3. The strand-proof — BINDING, exhaustive (resolves the confirmed default-on bug)

`vScrollRevealOnce` (`useStaggerReveal.ts:123`) reveals only on `isIntersecting` and
carries NO `getBoundingClientRect` check (`grep -c == 0`, verified). A section ALREADY
ABOVE the viewport on first observe (hash deep-link, F5 mid-scroll, back-nav
scroll-restoration) gets a non-intersecting first callback → skipped → never intersects
again on downward scroll → its heading STRANDS at opacity:0 forever. With default-on
`revealHeading` across **279 `<StorySection>` occurrences (97 files)**, ANY deep-linked
route strands headings — the exact headless-green/visually-broken trap.

**The binding edit + the no-strand GUARANTEE (the four exhaustive states — a heading
CANNOT strand):**

```ts
// useStaggerReveal.ts vScrollRevealOnce.mounted — ADDITIVE to the shipped fallback.
const reveal = (child: Element) => { child.setAttribute("data-revealed", ""); io?.unobserve(child); };
for (const child of Array.from(scroller.children)) {
    // STATE 1 — no IntersectionObserver env: reveal ALL (the SHIPPED fallback, kept).
    if (!("IntersectionObserver" in window)) { reveal(child); continue; }
    // STATE 2 — already scrolled PAST (deep-link / restoration): bottom<0 → reveal now.
    if (child.getBoundingClientRect().bottom < 0) { reveal(child); continue; }
    // STATE 3 (in-view at mount) + STATE 4 (below fold) — the IO owns them:
    io.observe(child);   // intersecting-at-mount → revealed on first callback; below-fold → on cross.
}
```

The four states are EXHAUSTIVE — no-IO (1), passed (2), in-view (3, IO first
callback `isIntersecting:true`), below-fold (4, IO on cross). There is no fifth
state; a heading cannot strand. **The CSS terminal-visible FLOOR is the
belt-and-suspenders:** the PRM arm (`.story-section__heading .char { opacity:1;
transform:none }`) already guarantees reduce users never see opacity:0, and the
`:not([data-revealed])` opacity:0 rule is scoped UNDER `@media (prefers-reduced-motion:
no-preference)` so a no-JS / JS-failed env (where `data-revealed` never lands) shows
the heading. The acceptance set (§5) enrolls a hash-deep-link + a scroll-restoration +
an F5-mid-scroll capture proving NO strand.

### 2C'. Page-API — the oracle's v-if/else carve (the pass-3 falsifier fix)

§2C stands (the collapse-to-2: `StoryPage` D0/D2/D3 section-stack + `CategoryPage` D1
bento over ONE `StoryPageShell`; the four user names survive as the conceptual depth
ladder; FLAG-FOR-USER). Pass-3 hardens the single-root oracle against the executed
falsifier:

**The oracle (`proof:story-page-api`, the single-root arm) MUST carry the
else-directive carve** — a naive top-level-element-count===1 FALSE-REDs a legit
`v-if`/`v-else` root (2 element nodes, 1 renders). Concrete:

```js
// over the FULL catalog (121 StoryPage leaves + every routed member), @vue/compiler-sfc:
const tpl = parse(src).descriptor.template;          // raw-parse, NOT the optimized AST
const els = tpl.ast.children.filter((n) => n.type === 1);   // type 1 === element
if (els.length === 1) return GREEN;                  // single element root
// the v-if/v-else carve: 2+ elements is single-root IFF it is ONE conditional chain —
const isCond = (n, name) => n.props?.some((p) => p.type === 7 && p.name === name);
const chain = isCond(els[0], "if") && els.slice(1).every((n) => isCond(n, "else") || isCond(n, "else-if"));
return chain ? GREEN : RED;                           // genuine fragment (no chain) → RED
```

A unit fixture proves all three: a synthetic fragment REDs, a synthetic `v-if`/`v-else`
root GREENs, every real migrated leaf GREENs (no false-RED). The
`@vue/compiler-sfc` raw-parse runs over the FULL catalog, not a stub set.

### 2D. Suffusal — unchanged + the chrome-chroma lift

§2D stands (thread ONE warm `--field-h` route hue through every member; VERIFY the
SectionPreviewCard painted hue on a fresh capture FIRST — the warm-clamp seam is
closed at HEAD `:175`, edit the WRITE source only on a captured regression; the
bar-as-chrome one-color-event exemption RECORDED in `proof:suffuse`, not assumed). The
ONE pass-3 addition is the §1 chrome-chroma lift (the D1 bento card chroma → the
rail-fill's C 0.10-0.13 chrome band; CHROME only, content untouched), flagged for user
alongside the 4→2 collapse.

---

## 3. FILES TOUCHED (deltas from pass-2 §3)

Pass-2 §3 is the binding file list. Pass-3 ADDS/SHARPENS:

- **`demo/stories/StorySection.vue`** — beyond the pass-2 edits (the `<SplitChars
  :stagger=false>` heading + `vScrollRevealOnce`): introduce the `.story-section__body`
  wrapper that carries `.scroll-cascade` (the §2B' decouple). The heading is a direct
  child of the section root; the body wrapper is its sibling. The section root carries
  NO `.scroll-cascade`.
- **`demo/stories/StoryPageShell.vue`** (NEW, pass-2) — the `.story-sections` wrapper
  it renders DROPS `.scroll-cascade` (the §2B' page-level-cascade retirement). The page
  builds because each section builds internally.
- **`src/composables/motion/useStaggerReveal.ts`** — the EXHAUSTIVE four-state
  strand-proof (§2B'.3): the `bottom<0` first-observe reveal + the no-IO fallback kept;
  the guarantee that every bound child is revealed in exactly one of the four states.
- **`scripts/proof-section-entrance.mjs`** (or the §2B arm of the page-API gate) — the
  teeth that have teeth (§2B' (a)-(d)): `.story-sections` not-cascade, the heading not a
  cascade-descendant, the body-is-cascade, the double-bind self-test bite.
- **`scripts/proof-story-page-api.mjs`** (NEW, pass-2) — the single-root oracle carries
  the v-if/else carve (§2C') + the unit fixture (fragment REDs, conditional-root GREENs,
  real leaves GREEN).
- **`demo/stories/section-entrance.css`** (NEW) — re-declares NEITHER `gl-cascade-build`
  NOR `.scroll-cascade > *`; the `:not([data-revealed])` hide rule is scoped under
  `@media (prefers-reduced-motion: no-preference)` (the no-JS terminal-visible floor).

All other pass-2 §3 files stand (the rail rebuild, the AppShell glint + fallback, the
`--char-stagger-step` mint, the StorySectionHeader atomic fold, the 121-file migration,
the StoryHero/StoryHeroBackdrop carve + the story-hero.css <500L split, the webkit
testMatch enrollment).

---

## 4. WAVE BREAKDOWN

Unchanged from pass-2 §4 (the four waves: `BG.W-SCROLL-PROGRESS-GLASSY` ·
`BG.W-SECTION-TYPEWRITER-FADEUP` · `BG.W-STORY-PAGE-API` · `BG.W-STORYBOOK-SUFFUSE`;
1+2 parallel, 3 after 1+2, 4 last; all HARD-gate on WS1/WS4 §0). The pass-3 deltas land
WITHIN the existing waves: the §2B' decouple + the strand-proof + the teeth-gate ride
`BG.W-SECTION-TYPEWRITER-FADEUP`; the oracle carve rides `BG.W-STORY-PAGE-API`; the
chrome-chroma lift rides `BG.W-STORYBOOK-SUFFUSE`.

**Per-wave precondition HEAD-check (FIRST acceptance step, RED at HEAD — all verified
2026-06-28):** `.scroll-build` GONE (still in 6 files); D14 `%`-off-`--col` (still
`* 0` + `calc(% + ms)`); demo bar no longer carries `.scroll-progress` (still does,
`AppShell.vue:393`); `_chassis/` deleted; `--glass-blur-quiet` whole-composite (GREEN).
A wave opening against an un-landed precondition STOPS (foreign-wave fence).

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

Pass-2 §5 is binding (PAINT IS THE GATE; a NON-authoring agent; real GPU; Chrome AND
real Safari/WebKit via the webkit testMatch enrollment; both modes; the `railHealth()`
fixture FIRST). Pass-3 SHARPENS the entrance + oracle arms:

- **The §2B' decouple capture (NEW, load-bearing).** On a HERO page (StorySection in a
  page-level context), capture the heading per-glyph rise AND the body cel fade-up and
  prove they are DISJOINT — no compounded section-block-translate × char-rise
  muddiness, no node double-binds two `animation`s (read `getAnimations()` per node).
  The falsifier: a real-paint of the heading entrance reading muddy → the arm needs
  re-architecture. This REPLACES the pass-2 vacuous "exclude from >*" check.
- **The strand-proof capture (NEW, binding).** A hash deep-link + an F5-mid-scroll + a
  back-nav scroll-restoration: every passed-section heading is VISIBLE (no opacity:0
  strand), on chromium AND webkit, both modes. The per-category sweep (~105 default-on
  headings, long/special-char/nested-in-card) is the floor.
- **The oracle carve unit-proof.** The v-if/else fixture (fragment REDs, conditional
  root GREENs, real leaves GREEN) runs in CI; the full-catalog single-root + the
  5-route bare-swap burst (`main.children.length===2`, `h1===last-dest`) runs on the
  migrated tree.
- **The railHealth fixture (FIRST).** Stand it on chromium AND webkit; force the JS
  fallback (stub the probe → false) so the JS `--scroll-fill` writer is the SOLE live
  writer; the at-80%-then-400ms no-drift CONTROL is the killer discriminator (the
  D5/D14 silent-no-op class reads stuck-at-100%).

All other §5 bars (the bar visual/AA/glass-on-glass, the page-API single-member/
manifest-bound-depth/√φ ladder, the suffuse per-category gestalt, the `proof:ba-gestalt`
BG roster verdict for the 4 storybook surfaces) stand.

---

## 6. FOLDED / DEFERRED

Pass-2 §6 stands. Pass-3 confirms:
- **Member count — ship-2 DECIDED, FLAG-FOR-USER** (the 4 names = the D0-D3 conceptual
  ladder; the zero-logic shell makes re-expansion mechanical/reversible).
- **The chrome-chroma punch lift** (D1 bento card C 0.075 → C 0.10-0.13 chrome band) —
  flagged for user alongside the collapse; chrome only, content untouched.
- **Dynamic OKLCH spectrum fill** for the rail — DEFERRED (static CSS gradient, demo
  chrome, KISS).
- **`CodeBlock.vue` → `Code.vue` retire** — RE-EVALUATED as a CONTRIVANCE per the
  KISS arm: `Code` is the INLINE chip, `CodeBlock` the BLOCK plate (distinct rungs of
  BC.W-CODE-BLOCKS, both legitimately used by `display/card.vue`); `CodeBlock` is
  demo-private → ≥2-consumer-EXEMPT. **DROP the CodeBlock retire from WS11 scope**; keep
  the inline/block pair; the `#source` slot composes `CodeBlock`.
- **`useTypewriter` on headings** — REJECTED (mount-not-IO / per-char CLS /
  below-fold-invisible); reserved for the D0 front-door hero. `animation-trigger`
  (Chrome 145/146) is the recorded successor; the IO directive is the cross-engine floor.

---

## 7. OPEN RISKS (pass-3, the falsifier each kills)

1. **(CLOSED) Safari custom-property-via-scroll** — EXECUTED-PROVEN on WebKit 26.4
   (§0.7bis). The gate is `!supportsScrollTimeline()`. RESIDUAL: the railHealth fixture
   on the integrated tree (build=false, owed).
2. **(NEW — HIGH, pass-3's headline) The heading×block double-motion.** The §2B'
   decouple resolves it architecturally; until a real-paint of a HERO-page StorySection
   confirms NO compounded muddiness, the entrance arm is not converged. **Falsifier:** a
   muddy heading capture on the integrated tree → re-architect.
3. **(NEW — HIGH) The deep-link strand.** CONFIRMED default-on bug. The exhaustive
   four-state edit + the CSS floor resolve it; **falsifier:** a deep-linked/passed
   heading stranding at opacity:0 even after the `bottom<0` reveal → default-on
   revealHeading is unsafe (needs opt-in or a stronger floor).
4. **(NEW) The oracle v-if/else blind spot.** The else-directive carve + the unit
   fixture resolve it; **falsifier:** the carve red-flags a real conditional-root leaf
   over the full catalog.
5. **The 121-file migration churn + the StoryHero 6-way backdrop carve** (5 GL paths +
   per-page opacity ceilings + dark-register lift + one-GL-per-route, all surviving the
   StoryHeroBackdrop carve). **Falsifier:** a fragment route root re-appears (the
   raw-parse oracle) or a half-migration leaves StoryHero alongside (a 4th dead chassis).
6. **Sequencing fragility** — WS11 HARD-depends on WS1+WS4; the integration branch does
   NOT exist; D14 is STILL broken. Each wave opens with the §0 HEAD-check; WS11 never
   re-fixes a foreign wave.
7. **Stale-edit waste** — the SectionPreviewCard gray seam is closed at HEAD; VERIFY the
   painted hue first, edit the WRITE source only on a captured regression.

---

## 8. UNCONVERGED FRONTIER (the next-pass brief)

The DESIGN is converged (P1-P5 + the §2B' decouple + the strand-proof + the oracle
carve). The WORKSTREAM gate is unmet because these are spec-stated but un-EXECUTED:

0. **(THE BLOCKER) The integration branch does not exist** — `git diff master..HEAD --
   src/ demo/` EMPTY (verified 2026-06-28). WS1 (route-enter, `.scroll-build` retire,
   LIBRARY `.scroll-progress` fix, field) + WS4 (D14 `%`-off-`--col`, `_chassis/`
   delete, ShowcaseFrame-is-cel) must LAND CODE first.
1. **The railHealth fixture stand-up** on chromium AND webkit (the teeth distinguish
   live-from-dead; the forced JS fallback).
2. **The §2B' decouple captured** — the heading per-glyph × body cel-cascade DISJOINT,
   no muddiness, on the integrated HERO-page tree.
3. **The strand-proof captured** — deep-link + restoration + the 279-section sweep, no
   opacity:0 strand, Chrome AND Safari.
4. **The 121-file migration exercise** — the collapsed StoryPage/CategoryPage shell
   rendered, the migration run, single-element root over the FULL catalog (the oracle +
   the carve fixture), the StoryHero 6-way carve surviving one-GL-per-route.
5. **Real Safari/WebKit execution** — the webkit testMatch enrollment RUN (the entrance
   spec on real WebKit is the P3 mustFix).
6. **USER CONFIRMATION** — the 4-name → 2-component collapse + the chrome-chroma punch
   lift (both deviate from / extend the literal ask; the cheapest things to get wrong at
   scale).

Next pass: stand the integration branch (WS1+WS4 green), RUN railHealth on both engines
FIRST, build the §2B' decouple + the strand-proof + the collapsed shell, run the
migration, then the four-arm acceptance on Chrome AND real Safari. Obtain user
confirmation on ship-2 + the chrome punch.
