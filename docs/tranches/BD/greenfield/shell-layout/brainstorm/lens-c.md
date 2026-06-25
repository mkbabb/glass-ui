# shell-layout — GREENFIELD lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> The demo SHELL redesigned from first principles: AppShell composition · the nav
> docks' contextual switching · the storybook IA · the "Pick a story" reload FOUC ·
> the category-hero hue. Lens: maximum 1940s-technicolor FLOW & PUNCH — bold layered
> cartoon shadowing, exaggerated squash/stretch/morph, anticipation + follow-through +
> overlapping action + arcs, real weight & inertia. Still idiomatic + cross-engine.

---

## 0. SOURCE-VERIFIED status quo (painted-pixel + grep, both modes)

Live-inspected `:5173` (Chrome), screenshots + `getComputedStyle` + painted-paint reads:

**CONFIRM CLEAN (do not re-litigate — verified):**
- The **SidebarDock** (vertical) is a warm-cream pill rail; **BottomDock** (horizontal) is a
  one-row warm-cream plate with a `FadingScroll` tab strip (Buttons·Card·Badge·Separator·…)
  + the active "Buttons" lit-glass tab pill + the prev/next + `«»` category-jump + the `⇄`
  morph control. **0 broken-rail artefacts** (the `mode="facets"` carousel is removed per
  BD.W-DOCK-CORE A1; grep confirms the in-flow `<DockSection>` carries facets now). A1 RESOLVED.
- Dark-mode docks are **warm**, not gray: `--card = rgb(53,42,34)` (warm brown), sidebar dock
  bg `color(srgb 0.35 0.30 0.25 / 0.56)` (warm sepia). BA.W-NO-GRAY floor holds in the shell chrome.

**THE TEAL/NAVY FLAG — CONFIRMED RED, both modes (the headline shell defect):**
- `/substrates` section landing paints a **full sky-teal hero field**. The `aurora-placeholder`
  static fallback (painted under/before the GL canvas, the FCP surface) computes to
  `linear-gradient(135deg, rgb(122,203,231) 0%, rgb(169,216,251) 50%, …)` — pure **teal→cyan**.
  Source: `Aurora.vue:201` ← `composables/color.ts:94` ← `auroraFallbackGround.ts` (derived from
  the aurora preset palette; the substrates landing sets `bgKind:"aurora"`).
- `category-hero.ts` `sectionHue` registry mints COOL hues for 4 categories. Resolved painted:
  - substrates `sc3` = `oklch(0.542 0.089 222.8)` → **teal-cyan** (hue 222.8 ∈ [180,270], C 0.089 ≫ 0.02 floor)
  - navigation `sc11` = `oklch(0.601 0.092 208.0)` → **ocean**
  - forms `sc2` = `oklch(0.484 0.163 265.5)` → **indigo/navy**
  - motion `sc12` = `oklch(0.513 0.163 291.9)` → **periwinkle-violet** (borderline)
  These tint the IconChip backplate **+ eyebrow** on each section hero + every bento card chip —
  so the substrates/navigation heroes paint teal/ocean by construction. Dark arm keeps them cool
  (`sc3` 219.9, `sc11` 206.7) → **violation persists in BOTH modes.**
- The `proof:teal-navy-purge` T1 gate fences only **library viz-substrate constants**
  (`src/components/custom/{aurora,concentric,…}/constants.ts`). It does **NOT** cover
  `demo/stories/category-hero.ts` nor the aurora-fallback gradient — both are demo-side and
  **escaped the purge**. Additional stray teal site: `overlays-scrims.vue:114` hardcodes
  `linear-gradient(135deg, var(--section-color-3), …)`. **The brief's `warmFieldHue` clamp does
  NOT exist as a symbol** (grep: 0 hits in `src/` or `demo/`) — the field is unclamped here.

**FOUC — architecturally MITIGATED, contract is fragile:**
- Routes are lazy (`manifest.ts` `lazy(cat,id)` → `() => import()`). `router.ts:82` has a one-shot
  `beforeResolve` that eager-resolves the FIRST navigation's chunk before initial mount; AppShell
  `:289`/`:299` renders **nothing** during an async-pending matched route (the `<Transition>` shows
  the empty branch) and the "Pick a story" `<Card>` paints ONLY for `route.matched.length === 0`.
  FCP measured 304ms, `mainHasContent:true`, no Pick-a-story flash on the deep-route reload. So the
  reload FOUC the brief cites (`AppShell.vue ~:289`) is **already closed** — but by a **two-part
  coordinated guard** (router one-shot + shell matched-length branch) that is easy to regress and
  un-obvious. CONFIRM-not-re-fork; HARDEN with a gate, do not rebuild.

**IA — coherent but UNDER-ANIMATED (the lens gap):**
- The IA is genuinely **standardized**: ONE `CATEGORY_HERO` source → `SectionLanding` (D1 `StoryHero`
  + bento `SectionPreviewCard` grid) per `/category`; per-story routes; `useContextualDockLayers`
  (route→facet) is the general route-keyed seam. This is good architecture — KEEP it.
- BUT the presentation is **static**: bento cards are inert glyph-over-tint thumbs (`section-preview-thumb`),
  the section enter is a calm `fade-slide`, the dock facet switch is a v-model push with no motion
  signature. Per the lens + LIQUID-WEIGHT-UNIVERSAL mandate this is the weak surface: **no punch, no
  weight, no overlapping action** on the shell's two defining moments (category change · section entrance).

---

## 1. CORE IDEA — the shell as a CEL-ANIMATED STAGE: one `--shell-punch` register, three punch moments

Greenfield thesis: the demo shell is glass-ui's own **flagship cartoon stage**. Today it is a
correct-but-calm host. The lens redesign keeps every fit piece (the IA source, the clean docks, the
FOUC guards, the `useContextualDockLayers` seam) and elevates the shell's **three defining transitions**
into ONE coherent 1940s-technicolor register driven by a single scalar — never four unrelated tics:

1. **Category change** (sidebar dock click / `{` `}` / category-jump) — the active-category travels.
2. **Section/page entrance** (the `<RouterView>` `<Transition>`) — the page squish-grows in.
3. **Dock facet switch** (the contextual `useContextualDockLayers` set recomposing per route).

All three compose the **already-shipped Cartoon register** (`--ease-cartoon-punch`, `--motion-weight`,
`--shadow-cartoon-{sm,md,lg}`, the moving caster, `.cartoon-surface`, `--scale-press`) — design.md §L4
/ §Shadows / §Easing. NO new engine. The redesign is a **wiring + a hue-purge**, not a re-fork.

The unifier is one driver-scoped scalar, **`--shell-punch` (= `--motion-weight` at the shell scope,
rest `1/φ ≈ 0.62`)**, that co-scales squash depth + overshoot share + anticipation pull-back + cartoon-
shadow travel for whichever of the three moments is firing. PRM → `--shell-punch: 0` zeroes all four in
one assignment (the §L5 cascade). This is the §L4 "one scalar names how much cartoon" rule applied at
the shell altitude.

### THE SINGLE BOLDEST MOVE — the **liquid-glob category baton** (overlapping-action handoff)

When you change category in the SidebarDock, today the active `.is-active` ring just jumps to the new
icon. **Greenfield:** the active-category affordance is a **single liquid-glass "baton" blob** — a
detached metaball puck pinned behind the active dock icon — that **does not teleport**; on a category
change it **stretches off its current icon, necks into a goo bridge (the SHIPPED `DockGooFilter` static
SVG-goo, already mounted once at the shell root via `<DockGooFilter/>`, `AppShell.vue:257`), travels the
rail with real inertia + arc, overshoots ~22% past the target icon (`--ease-cartoon-punch`), squashes,
and settles** — a true metaball merge<->split, never a naive ellipsoid slide. THE SAME baton drives the
BottomDock active-tab pill (horizontal axis) so V and H share one motion identity. As the baton necks,
it casts the **moving cartoon shadow** opposite its travel (the cel light stays fixed) — the 2.5-D punch.
And it triggers **overlapping action**: the leaving page's `<Transition>` exit fires a beat BEFORE the
baton arrives, the new section hero squish-grows in a beat AFTER — anticipation → handoff → follow-through,
the cardinal cartoon principle, expressed as one choreographed `--shell-punch` envelope.

This is audacious (a goo baton flowing the rail, casting a moving shadow, with anticipation + overshoot +
follow-through) yet **100% composition** of shipped primitives: `DockGooFilter` (mounted), `useDockFission`/
metaball-neck CSS (shipped), `--ease-cartoon-punch` + `--shadow-cartoon` moving caster (shipped),
`useContextualDockLayers` (the route seam that fires it). No new shader, no new component, no parallel clock.

---

## 2. THE VISUAL / MOTION / INTERACTION SPEC

### 2.1 The category baton (the boldest move, detailed)

- **Render:** ONE `<div class="shell-baton">` per dock, a glass puck (`--dock-control-hover-bg` tier, the
  lit-glass active register) absolutely positioned behind the active `DockIconButton`, INSIDE a goo wrapper
  carrying `filter: var(--dock-fission-goo-filter)` (= `url(#dock-fission-goo)`, the shell-root `<DockGooFilter/>`).
- **Mechanism:** position is a CSS custom property `--baton-pos` (px along the rail main-axis) bound to the
  active category's measured icon offset. On a category change the prop transitions on `--ease-cartoon-punch`
  (anticipation dip below origin → 22% overshoot → settle), duration scaled by `--shell-punch`. A second,
  trailing pseudo-element (`::after`) lags ~40ms (the §L4 overlapping-action / drag), and the goo filter
  fuses the two into a stretching neck at the midpoint — the metaball waist that thins-then-snaps (never a
  fade-disconnect). The neck is gated to the occluded mid-window `t∈(0.18,0.82)` exactly like the existing
  `morphGooFilter` computed (`AppShell.vue:118`) — pure `f(progress)`, no wall-clock.
- **Squash & stretch:** during travel the baton scales `scaleX/scaleY` volume-preservingly toward the
  motion axis (~0.88 vol per the §T10 ios27 bar), recovering to 1 on settle — real weight, not a flat slide.
- **Moving cartoon shadow:** the baton's `::before` caster carries `--shadow-cartoon-md` and translates
  OPPOSITE the travel (scaled `--shell-punch`), deepening to `-lg` at peak velocity, snapping back on settle.
- **Cross-engine:** the goo is a **static SVG `filter` on the surface's own layer** (NOT `backdrop-filter:url()`
  — the §L7 WebKit trap; `DockGooFilter` is already the Safari-safe sRGB metaball mount). The travel + squash +
  shadow are **transform/opacity only** (compositor-cheap). Safari + Chrome identical.
- **PRM:** `--shell-punch: 0` → the baton **hard-cuts** to the new position (no neck frames, no squash, no
  shadow travel) — instant topology swap, the §L5 floor + the §T2-hardened "PRM → instant topology swap, zero
  neck frames" bar. A11y: the baton is `aria-hidden` decoration; the real affordance stays `aria-current="page"`
  on the `DockIconButton` (unchanged contract).

### 2.2 The section entrance (overlapping-action follow-through)

- Replace the calm `fade-slide` on the `<RouterView>` `<Transition>` (`AppShell.vue:285`) with a
  **`page-punch` recipe**: enter = squish-grow from ~0.94 vol + opacity, settling on `--ease-cartoon-punch`
  (a hair of overshoot — the §T10 squish-grow GRACE); exit = squish-shrink + fade on `--ease-in`, **no
  overshoot past gone** (§L4 follow-through, P2). The page-enter fires a beat AFTER the baton handoff so the
  three moments read as ONE choreography (anticipation in the dock → travel → page follows through).
- The hero title keeps its `story-hero-title--enter` (already present, verified in DOM) but its enter is
  re-timed off the same `--shell-punch` envelope so the title "lands" after the page settles (overlapping).
- **Driver-vs-observer carve (§L2):** ONLY the page-enter (a navigation DRIVER) carries the punch. The bento
  grid's per-card stagger and any content carousel stay **calm-overdamped** (an over-springy list reads cheap;
  iOS reserves bounce for open/morph). Liquid weight is universal on DRIVERS, not every pixel.

### 2.3 The dock facet switch (the contextual API, made to PUNCH)

- `useContextualDockLayers` already swaps the facet set per route — KEEP the seam. Today the swap is a silent
  v-model push. Greenfield: the facet chips **goo-cross-fade with squish** — the leaving chip set necks out via
  the SAME `DockGooFilter`, the arriving set squish-grows in on `--ease-cartoon-punch`, staggered ~30ms (the
  §L4 overlapping/secondary action). The active facet (the one containing the current story) gets a one-shot
  **accent-flood** (the §T4 ios27 tab-commit signature: the chip plate floods `--section-color-N` then clears) —
  EXCEPT the flood reads the **purged warm hue** (see §3), never teal.
- This makes the docks "properly leverage the new APIs for contextual SWITCHING + animating" (the user's exact
  ask) — the route→facet resolver is unchanged, only its RENDER gains the punch register.

### 2.4 The IA — standardized + cartoon-alive

- KEEP the standardized IA (ONE `CATEGORY_HERO` source → `SectionLanding` → bento grid). The redesign adds the
  **motion standardization**: every section landing's bento cards enter on the page-punch envelope (staggered,
  calm-observer), every card's IconChip gets the moving cartoon shadow on hover (`.cartoon-surface` opt-in),
  and the category baton's arrival "primes" the matching section hero's IconChip (a one-shot pop) so the
  dock→landing identity handoff is visually continuous (the icon you clicked "becomes" the hero icon).

---

## 3. THE HUE PURGE (the teal/navy fix — both modes)

The shell cannot be a warm-cream technicolor stage while four section heroes paint teal/ocean. Greenfield
purge (clean break, NO alias — no-backwards-compat):

1. **Re-mint the `category-hero.ts` `sectionHue` registry to the WARM half of the ramp.** The 11 categories
   must read DISTINCT-but-WARM identities. Remap substrates 3→ (a warm aqua-leaning-amber or the warm
   teal-substitute), navigation 11→warm, forms 2→warm, motion 12→warm-violet (keep violet, it's the system
   root family + within appeal). The ramp `--section-color-{5,6,7}` (amber 69.6, tomato 30.4, magenta-violet
   317.5) are already warm — the warm categories stay. The fence: every shipped `sectionHue` resolves to a
   hue OUTSIDE [180,270] above the 0.02 chroma floor (the proof:teal-navy-purge T1 predicate, extended to cover
   the demo registry).
2. **Re-point the substrates landing `bgKind` OFF the teal aurora fallback.** Either (a) swap to a warm aurora
   preset whose `auroraFallbackGround` gradient is warm-cream (the painted FCP surface must read warm, not
   `rgb(122,203,231)`), or (b) implement the brief's named-but-absent **`warmFieldHue` clamp** on the
   substrate fallback so the static placeholder gradient is hue-clamped to the warm band regardless of the
   live preset. The live GL canvas may run its true preset; the FALLBACK (the FCP paint) must be warm.
3. **Purge the stray demo teal sites:** `overlays-scrims.vue:114` (`--section-color-3` in a gradient) → warm.
4. **EXTEND `scripts/proof-teal-navy-purge.mjs` T1** to census `demo/stories/category-hero.ts` (every
   `sectionHue` resolves warm) + the aurora-fallback painted gradient, and add a **live-paint T5 arm** that
   samples the `/substrates` + `/navigation` section-hero FCP surface for a dominant warm hue (born-RED on the
   current teal, GREEN at warm). This closes the gap that let the demo-side teal escape the library-side purge.

This is the §3 "COLORFUL FIELD behind glass + a defined edge, NEVER gray" mandate satisfied the RIGHT way:
the field stays colorful + audacious, just **warm**, both modes.

---

## 4. THE FOUC — HARDEN, don't rebuild

The reload FOUC is already closed by the router one-shot + the shell matched-length guard (verified: FCP
304ms, no Pick-a-story flash). Greenfield action is to make the fragile two-part contract **robust + gated**:

- KEEP `router.ts:82` `beforeResolve` one-shot eager-resolve + the AppShell `matched.length===0` branch.
- ADD a **proof gate** (`proof:shell-fouc` or fold into the chassis gate): a real reload of a deep lazy route,
  asserting the first painted frame after `domContentLoaded` carries the section/page content (or a deliberate
  skeleton), NEVER the "Pick a story" card and NEVER an empty `<main>`. Born-RED if either guard is removed.
- OPTIONAL punch: the entering page on a COLD reload squish-grows on the page-punch envelope too (the §T10
  liquid entrance applied to the first paint), so even the reload reads as a deliberate cartoon entrance rather
  than a pop-in — but gated so it never delays FCP (transform/opacity post-paint, never a blocking animation).

---

## 5. DEFT INTEGRATION — the UNION (no re-fork, KISS, DRY)

| Greenfield piece | Composes (shipped, grep-verified) | New code |
|---|---|---|
| `--shell-punch` scalar | `--motion-weight` (§L4), `--ease-cartoon-punch` (§Easing, line 310) | one scoped custom-prop + PRM zero |
| category baton goo | `<DockGooFilter/>` (mounted `AppShell.vue:257`), `--dock-fission-goo-filter`, fission-bridge neck CSS | `.shell-baton` el + `--baton-pos` binding |
| moving cartoon shadow | `--shadow-cartoon-{md,lg}` + the moving caster (§Shadows, `cards.css`) | apply the existing utility |
| page-punch transition | the `<Transition>` slot (already there), `transitions.css` recipe pattern | `page-punch` recipe (replaces `fade-slide`) |
| facet switch punch | `useContextualDockLayers` (route seam, KEEP), DockGooFilter, `--ease-cartoon-punch` | render-only motion wiring |
| hue purge | `--section-color-N` ramp (warm half exists), `proof-teal-navy-purge.mjs` | re-mint registry + extend gate |
| FOUC harden | `router.ts:82` + AppShell guard (KEEP) | one proof gate |

NO new component, NO new shader, NO parallel morph engine, NO second clock. Every motion is `f(--shell-punch)`
or `f(progress)`, compositor-only. The IA source, the docks, the FOUC guards, the route→facet seam all SURVIVE
(survival of the fittest) — REFINED (motion + hue), nothing re-invented that wasn't broken (only the teal hue
+ the under-animated transitions are "broken"; the architecture is fit).

---

## 6. CROSS-ENGINE + A11y/PRM carve (one table)

- **Goo (baton + facet):** static SVG `filter:url()` on the surface's own layer (`DockGooFilter`, Safari-safe
  sRGB). NEVER `backdrop-filter:url()` (§L7 WebKit drop). `@supports` + plain-glass fallback if absent.
- **Travel / squash / shadow:** `transform`/`opacity` only (compositor). Identical Chrome + Safari.
- **PRM (`--shell-punch:0`):** baton hard-cuts, page hard-swaps, facets instant-swap, zero neck frames, no
  shadow travel — the §L5 floor + §T2 hardened bar. ONE assignment zeroes squash+overshoot+anticipation+arc+shadow.
- **`prefers-contrast:more`:** the cartoon-shadow cast opacity floors UP (legibility asset, §Shadows). `aria-current`
  stays the real affordance; the baton is `aria-hidden`. Reduced-transparency does NOT touch the inked cast.
- **Proportion (§L6):** the punch envelope timings + the baton overshoot (~22%) + the squish vol (~0.88≈1/√φ-ish)
  + the page-enter scale (~0.94) ride the φ family; the 1px hairline + hit targets stay literal.

---

## 7. THE DELTA-ASSAY (wave reconciliation vs the 116-wave set — no dup vs dock-core)

This lens produces **four** shell-layout wave candidates; reconcile against dock-core/dock-hub:

| Candidate wave | Scope | Dup risk | Verdict |
|---|---|---|---|
| **W-SHELL-PUNCH-REGISTER** | the `--shell-punch` scalar + page-punch transition + the three-moment choreography | none (dock-core owns the dock-internal morph engine; this is the SHELL-altitude wiring) | NEW, shell-layout owns |
| **W-SHELL-CATEGORY-BATON** | the liquid-glob baton across V+H docks (the boldest move) | partial overlap w/ dock-core `useDockFission` ENGINE → **COMPOSE it, don't re-fork**; this wave is the SHELL consumer | NEW (consumer wave), cross-point to dock-core fission engine |
| **W-HERO-WARM-PURGE** | re-mint `category-hero.ts` sectionHue warm + substrate fallback warm-clamp + extend proof:teal-navy-purge | none (BC.W-TEAL-NAVY-PURGE fenced library only; this extends to the DEMO registry) | NEW, the headline shell fix |
| **W-SHELL-FOUC-GATE** | harden the existing two-part FOUC guard with a proof gate (+ optional cold-reload punch) | none | NEW, small |

No dup with dock-core (which owns the dock-INTERNAL morph/fission/scroll engines). shell-layout owns the
SHELL-altitude composition: the baton is a CONSUMER of the fission engine, the punch register is the shell
scalar, the hue purge is demo-registry, the FOUC gate is shell-route. The WAVE-AMENDMENT should fold these
four in and cross-point W-SHELL-CATEGORY-BATON → the dock-core fission engine wave (compose, never duplicate).

---

## 8. BORN-RED honesty

- The teal/navy hero is **RED today** in BOTH modes (painted `rgb(122,203,231)` substrate field + 4 cool
  `sectionHue` tokens, light + dark) — this lens's headline fix is born-RED and provably so.
- The shell's three transitions are **calm today** (verified `fade-slide` enter, silent facet swap, jumping
  `.is-active` ring) — the punch register is born-RED against the lens bar (no anticipation, no overlapping
  action, no moving cartoon shadow, no goo baton).
- The FOUC is **GREEN today** but **UNGATED** (a regression would re-RED it silently) — born-RED on the
  missing gate, not on the behaviour.

The gestalt bar: a coherent standardized shell (KEEP) + clean warm docks (KEEP) + contextual switching that
PUNCHES (new wiring) + no reload FOUC (gated) + NO teal hero (purged), both modes — a warm-cream 1940s-
technicolor cartoon stage that is the library's own best demo of itself.
