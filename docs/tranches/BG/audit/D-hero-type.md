# BG audit — `/compositions/hero` broken + display headers WAY too large

**Audit scope:** root-cause `/compositions/hero` ("totally broken, headers WAY too large") and
spec the gestalt repair of the √φ display-ladder activation discipline. All claims verified against
HEAD source + LIVE paint (dev server :5173, Playwright getComputedStyle/screenshot, 2026-06-25).

---

## FINDINGS (true at HEAD, with evidence)

### F1 — The hero `<h1>` is **244.8px**; its box is **1285px tall = 157% of the viewport** (1440×820)

`demo/stories/compositions/hero.vue:98`:
```html
<h1 class="text-display-hero mb-8 max-w-5xl text-foreground">
    Real scenes, assembled from the parts.
</h1>
```
LIVE measure (Playwright, 1440×820):
- `fontSize: 244.8px`, `lineHeight: 257px`, `letterSpacing: -3.67px`
- bounding box **1285px tall** → **157% of the 820px viewport**; the headline wraps to **5 lines**,
  of which only "Real" + "scenes," are above the fold. The entire bento grid is below the fold.
- `maxWidth: 1024px` (`max-w-5xl`) caps the WIDTH only — it forces the 5-line wrap, it does not
  touch the catastrophic font-size.

Screenshot (`bg-hero-1440.jpeg`): "Real" fills the top third, "scenes," fills the rest. The page is
unusable as a hero.

`text-display-hero` = `--type-display-hero` = `clamp(6.854rem, 4.5rem + 12vw, 17.942rem)`
(`src/styles/typography/scale.css:137-141`). At 1440px the preferred term `4.5rem + 12vw` =
72px + 172.8px = **244.8px** (rides between min 110px and max 287px).

### F2 — This is **SYSTEMIC**, not isolated. The front-door `/foundations/intro` is equally broken.

`demo/stories/foundations/intro.vue:72`:
```html
<h1 class="text-display-mega mb-8 max-w-5xl text-foreground">
    Glass, paper, and the golden ratio.
</h1>
```
LIVE measure (1440×820): `fontSize: 177.4px`, box **745px tall = 91% of viewport**. The literal
front door of the storybook is a single headline that all but fills the viewport.

`text-display-mega` = `clamp(5.382rem, 4rem + 9vw, 11.089rem)` (`scale.css:132-136`) → 177px peak.

### F3 — The bug is **rung selection by content, not the clamp values themselves**

Resolved px per viewport (computed from the clamp tokens — `scale.css:123-146`):

| rung | 375px | 768px | 1440px | 1920px | DESIGN.md intent (L648-654) |
|---|---|---|---|---|---|
| display-1 (φ²) | 26 | 31 | 42 | 42 | Display |
| display-2 | 33 | 41 | 53 | 53 | Large display |
| display-3 | 43 | 55 | 68 | 68 | XL display |
| display-4 | 55 | 71 | 86 | 86 | Splash |
| display-5 | 79 | 102 | 110 | 110 | Mega hero |
| **display-mega** | 98 | 133 | **177** | 177 | **Poster: section/pane title** |
| **display-hero** | 117 | 164 | **245** | 287 | **Poster: page hero / metric value** |
| display-audacious | 140 | 203 | 310 | 352 | Poster: fast.com peg |

The mega/hero/audacious clamps are **correct for a single short word or a NUMBER** — that is their
documented home (DESIGN.md L653-654: "metric value"; `data/metric-cell.vue:178`/`metric-stack.vue:72`
put `text-display-mega`/`-audacious` on a single live number — the *correct* usage). The defect is
applying a poster-peak rung to a **multi-word SENTENCE headline** with no viewport-height awareness.
For contrast, `compositions/auth-shell.vue:81` correctly puts its sentence headline on
`text-display` (display-1, ≤42px) inside a `max-w-md` panel — **not broken**.

So: the ladder is sound; the **activation discipline** (which rung lands on which content) is absent
for the hand-authored heroes.

### F4 — hero.vue (and intro.vue) **opt OUT of every chassis protection** via `:hero-title="false"`

The chassis HAS a complete fit-cap apparatus, and these pages bypass it.

- `StoryHero.vue:92` computes `heroClass = text-display-${heroScale}` and `StoryPage.vue:188` threads
  the manifest `heroScale`. The chassis `<h1>` carries `class="story-hero-title" data-hero-scale="…"`
  (`StoryHero.vue:358-369`).
- `story-hero.css:225-245` caps that chassis `<h1>`:
  ```css
  .story-hero-title[data-hero-scale] {
      font-size: min(
          var(--story-hero-title-rung, var(--type-display-4)),
          var(--story-hero-title-fit, calc((100vw - 2 * var(--story-hero-pad, 2rem)) / 7))
      );
  }
  ```
  A `min(rung, viewport-budget)` clamp + `overflow-wrap/hyphens` (`story-hero.css:213-216`) — the
  whole reason it exists is "the audacious title always FITS" (the comment at L196-212).
- **But hero.vue/intro.vue hand-author a bare `<h1 class="text-display-hero">`** with NONE of
  `story-hero-title` / `data-hero-scale`. So the raw `text-display-*` utility (specificity 0,1,0)
  is the only rule that applies — **the entire fit-cap is dead** on these pages. Confirmed live:
  `classList: ["text-display-hero","mb-8","max-w-5xl","text-foreground"]` — no chassis class.
- Worse, the manifest's `heroScale: "mega"` (`manifest.ts:1140`) for `compositions/hero` is now
  **dead config**: hero.vue's own `text-display-hero` (287px) paints, not mega (177px). The
  `:hero-title="false"` suppresses the chassis title entirely (`StoryHero.vue:98-100` `showHeroTitle`
  requires `props.heroTitle`), so the manifest rung is silently ignored.
- The `.story-hero-scroll-away` register (`story-hero.css:442-480` — the giant title scrolls UP and
  OFF so the field owns the viewport) is bound to the chassis CLUSTER (`StoryHero.vue:355`), which
  also requires `heroTitle` to render. So hero.vue's giant title doesn't even scroll away — it's a
  **static wall**.

### F5 — Even the *protected* fit-cap has **no viewport-HEIGHT term** — a structural gap

The budget is `(100vw − padding) / 7` (`story-hero.css:228`) — purely WIDTH. `grep` for `vh|dvh|svh`
in the title-sizing path returns nothing (`--story-hero-title-fit` is never set anywhere). So even a
chassis-protected hero only avoids horizontal clip; a 287px line "fits" the width budget while still
consuming the whole viewport vertically. A hero headline must be bounded by viewport HEIGHT (the
dominant constraint on a wide screen), not only width. The line-height multiplier compounds it:
`--type-leading-display: 1.05` (`scheme-motion.css:62`) × 245px = 257px **per line**, so even a
2-line sentence is ~514px.

### F6 — Mobile is no escape — 375px headline is **117px, box 737px = 100% of the 740px viewport**

LIVE measure (375×740, hero.vue): `fontSize: 117px`, box 737px tall, 6 lines. No horizontal overflow
(the `max-w` + wrap save the x-axis), but the headline alone IS the mobile viewport. The break is
universal across breakpoints, both modes (the size tokens are mode-agnostic).

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — No activation discipline: the rung is chosen by hand, decoupled from content + container

The √φ ladder is a *vocabulary of sizes*; nothing in the system binds "which rung" to "what the
content is and how much room it has." A page author writes `class="text-display-hero"` and gets 287px
regardless of whether the content is one word or a five-word sentence, and regardless of viewport
height. DESIGN.md L17 says proportion is a **bias, not a tyranny** — the ladder must be *bounded by
the container*, and the audacious rungs reserved for the single-token poster moment they were minted
for ("metric value", DESIGN.md L654).

### RC2 — Two parallel hero title paths; the protected one is bypassable by a one-prop opt-out

There are two ways a hero `<h1>` paints: (a) the chassis path (fit-capped, scroll-away,
data-hero-scale, manifest-driven) and (b) the hand-authored path (`:hero-title="false"` + a raw
`<h1 class="text-display-*">`, with ZERO protection). The "bespoke front-door owns its own title"
rationale (`StoryHero.vue:46-51`) created a second, unprotected lane — and every catastrophic page
(`hero`, `intro`) lives in it. This is a fork: the safety lives on path (a) only. **The fix is ONE
path** — the chassis owns hero-title rendering + bounding for every hero, and a page customizes
CONTENT (the words, an inline ornament) via slot, never by forking the `<h1>` and its sizing.

### RC3 — The fit-cap measures width, not the binding constraint (height) — a half-built guard

Even where the guard runs, it solves the wrong axis. A hero headline's binding constraint on a
laptop/desktop is viewport HEIGHT; the guard only checks width. So the guard is structurally
incapable of preventing the viewport-domination defect even on the pages it covers.

### RC4 — `max-w-5xl` is the wrong tool — it caps width and *forces* the multi-line blowout

`max-w-5xl` (1024px) on a 245px-font headline doesn't shrink the type; it pins the measure so a
5-word sentence wraps to 5 lines × 257px = the 1285px wall. The "constraint" actively manufactures
the defect.

---

## PROPOSED WAVES

### BG.W-HERO-FIT — bound the hero headline to its viewport; ONE chassis-owned title path

**Intent.** Repair `/compositions/hero` (and every hero page) so the audacious √φ headline is bounded
to the viewport — large and proportioned, never viewport-dominating. Kill the bypassable hand-authored
hero `<h1>` lane.

**Idiomatic gestalt approach (first-principles, no legacy):**
1. **One title path.** Retire `:hero-title="false"` and the hand-authored `<h1 class="text-display-*">`
   in `compositions/hero.vue`, `foundations/intro.vue`, `compositions/auth-shell.vue` (clean break,
   no alias). The chassis (`StoryHero` → `StoryHeader`) renders EVERY hero `<h1>` through the single
   `.story-hero-title[data-hero-scale]` path, so the fit-cap + scroll-away + manifest `heroScale`
   reach all of them. A page that wants an inline ornament (intro's wordmark, hero's ℱ) provides it
   via a `#title-ornament` slot on the chassis title, never by forking the `<h1>`.
2. **Make the fit-cap height-aware (the real fix).** Extend the cap in `story-hero.css:225-229` to a
   `min()` of THREE terms — the √φ rung, the width budget, AND a viewport-height budget:
   `min(<rung>, <width-budget>, calc((100svh − header-reserve) * <line-fraction> / <line-count-est>))`.
   The height budget caps a headline so its rendered block (font-size × leading × estimated lines)
   never exceeds a φ-derived fraction of `svh` (target ≈ 1/φ ≈ 0.62 of the hero band, leaving the
   eyebrow/blurb/CTA room). Use `svh` (small viewport height) so mobile browser-chrome doesn't push
   it over. This is the aristotelian bias bounded by the container — the DESIGN.md L17 principle made
   literal.
3. **Rung-by-content discipline (the activation rule).** Codify the activation rule the system lacks:
   the audacious/mega/hero rungs are for a **single short word/wordmark or a number** (the metric
   peg); a multi-word **sentence** headline floors at the lower display band (display-1..3). Reflect
   this in `assignDepths` (`manifest.ts:434-457`) and/or a chassis guard: a hero whose title is a
   sentence (whitespace/word-count heuristic, or an explicit `titleKind: "word" | "sentence"` manifest
   field) caps its effective rung. `compositions/hero` ("Real scenes, assembled from the parts.") is a
   sentence → resolve to ~display-2/3 (53-68px), not hero (287px).
4. **Drop `max-w-5xl` from hero `<h1>`s.** Replace with the chassis `max-inline-size: 18ch`
   (`story-hero.css:194`, already on `.story-hero-title`) — a measure that matches the type scale, not
   a fixed px width that manufactures wraps.
5. **Re-author `compositions/hero` content** to the fixed layout: chassis-rendered title (a tightened
   sentence or a short wordmark) + eyebrow + blurb in the StoryHeader cluster (so it scrolls away over
   the constellation), then the bento `SectionPreviewCard` grid visible in the first viewport.

**Files touched.** `demo/stories/StoryHero.vue` (one title path, ornament slot), `StoryHeader.vue`
(ornament slot host), `demo/stories/story-hero.css` (height-aware fit-cap), `demo/stories/manifest.ts`
(`assignDepths` activation rule + `compositions/hero`/`intro` rows), `demo/stories/compositions/hero.vue`,
`foundations/intro.vue`, `compositions/auth-shell.vue` (retire hand-authored `<h1>`s).
**No `src/styles/` token edit** — the clamp ladder is correct (DESIGN.md exemplar); the fix is the
demo-chassis activation + bounding. The `--type-display-*` tokens stay byte-untouched (the fence).

**Acceptance / π bar.**
- `/compositions/hero`, `/foundations/intro`, every `hero: true` page: the hero `<h1>` rendered block
  is **≤ ~0.62 × svh** at 375 / 768 / 1440 / 1920, both modes; the bento grid / first body section is
  visible in the first viewport (≥1 preview card above the fold at 1440×820).
- No hero `<h1>` carries a bare `text-display-*` utility without the chassis `.story-hero-title`
  path (grep gate: zero hand-authored hero `<h1 class="text-display">` in `demo/stories/**`).
- The fit-cap `min()` carries an `svh` term (source gate); the width-only budget is retired.
- Sentence-headline heroes resolve ≤ display-3; single-word/number poster moments keep mega/hero/
  audacious (the metric-cell/metric-stack/typography specimens UNCHANGED — they are the correct home).
- LIVE π capture (Playwright getComputedStyle + screenshot, both modes, mobile+desktop) at
  `docs/tranches/BG/audit/visual/W-HERO-FIT-DELTA.md`.

**Chronic/deferred folded.** Closes the recurring "audacious title blows out the viewport" class
(the BD.W-CUT HERO-OVERFLOW guard was width-only and bypassable — this completes it height-aware and
on a single path). Folds confirmed live defect #10. Reconciles with `StoryHero variant="hero"` (the
one path) + the D1 section-hero (SectionLanding heroes flow through the same chassis title, inheriting
the bound).
