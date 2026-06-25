# BG audit — Design-principle adherence (the demanding frontend-design critic lens)

**Auditor scope.** Assess the LIVE/shipped 4.2.0 reality against the stated design
principles — `DESIGN.md` (the seven §L precepts, the iOS-27 canon, the Cartoon register,
the √φ aristotelian ladder), `docs/precepts/motion-canon.md` (the 12 laws + P1–P7),
`docs/precepts/design-idioms.md` (the localization + twin-divergence discipline). Where has
the implementation DEVIATED from its own canon? The bar is the visual GESTALT, not the
per-mechanism π. Verified against HEAD source.

> Note on the brief: `docs/precepts/design.md` named in the prompt does NOT exist; the
> design-principle corpus is `DESIGN.md` (root, 1998 lines) + `design-idioms.md` +
> `motion-canon.md`. All three were read in full / by section. Findings cite real symbols.

---

## The thesis (one sentence)

The 4.2.0 redesign authored a **beautiful set of principles and a beautiful set of tokens**,
but the gestalt deviates because **three identity tokens are mis-tuned past their own stated
ceilings** (the cartoon-ink chroma floor, the field-vs-aurora substrate, the display-hero vw
coefficient), **one motion law is self-violated** (the page-build `animation` on a
`<Transition>`-child root freezes routing — §L4 weight applied to the wrong layer kills §L2
spring choreography), and **two user-intent reversals shipped as "correct" design**
(frozen-still category previews vs the live-component directive; the modal V↔H demo vs the
in-dock morph directive). Every one is a token/seam edit on the EXISTING vocabulary — none
needs a new primitive. The principles are ~90% right; the implementation drifted off them.

---

## FINDINGS (what is actually true at HEAD)

### F1 — The red/maroon cast is the cartoon-ink chroma FLOOR over-firing (DESIGN.md §Shadows; the no-gray discipline mis-applied)

`src/styles/tokens/shadow.css:107`:
```css
--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h);
```
`--foreground` (light) = `hsl(24 10% 10%)` (`tokens/color-radius.css:58`) — a near-neutral
warm ink at OKLCh chroma ≈ **0.02**. The cast extracts its warm hue but **FLOORS chroma to
`max(c, 0.11)`** (a 5.5× lift) at **L 0.14–0.18**. A warm hue at C 0.11 / L 0.16 is a
**saturated dark red/maroon-brown**, not a near-black cel ink. Stamped at the lead-plane 32%
opacity (`--cartoon-ink-lead`, `shadow.css:108`) over the warm `.paper-field`, it reads as
exactly the user's "red/maroon shadow-cast aliasing bleeding around docks" (CONTEXT defect 3).

The dock carries it on `.glass-dock > .cartoon-cast` (`dock/shape.css:224`, `box-shadow:
var(--shadow-cartoon-md)`) which is three down-LEFT planes (`-3/-5/-7px`, `shadow.css:124`).
That is the "red halo on the left/bottom of docks" — the geometry (down-left) + the chroma
floor (red) compose the exact defect. The dark arm is worse: `dark-arm.css:177` lifts to
`max(c, 0.11)` at L 0.20–0.30 with 46/38/26% opacity rungs — a bright warm-red glow on the
near-black plate.

The DESIGN.md §Shadows spec says the cartoon cast "rides `--shadow-color` (which resolves to
`var(--foreground)`)… a **near-black ink stamp** in light, near-white in dark" (DESIGN.md:398).
The LIVE token does NOT do that — it decoupled onto `--cartoon-ink` and floored chroma to
0.11. **The shipped ink contradicts the doc's own description.** DESIGN.md:412 even defers a
"warm-tinted cartoon cast" to a future greenfield as "not asserted here" — yet HEAD ships a
chroma-floored warm-red cast as the default. The implementation jumped ahead of its own spec.

**Corner-clip / aliasing companion (CONTEXT defect 3b).** The cast child is `position:
absolute; inset: 0; border-radius: inherit; z-index: -1` (`cards.css:359`, `dock/shape.css`).
A `z-index: -1` child with `border-radius: inherit` paints a hard offset rectangle BEHIND the
glass plate; if the plate's own corner radius and the cast's `inherit` desync (the cast
inherits the host radius but the offset planes extend past the host box on the down-left),
the offset planes' top-right corners are **un-radiused rectangles** poking out — the
"card corners do not clip / rectangular aliasing at top corners" + "strange aliasing in the
bottom-left corner of docks." The offset-stamp geometry is inherently rectangular; over a
busy field its hard edges alias.

### F2 — The substrate is a CSS field, not an aurora — the user wants `<Aurora>` everywhere (DESIGN.md §L1 "colorful field behind glass"; CONTEXT defect 2)

`src/styles/paper.css:129–218`: `.paper-field` is a **6-layer CSS gradient cel** (conic
over-glaze + wide base wash + 3 warm radials + `--neutral-0` floor), warm-bound by
`--field-h: clamp(25, …, 95)` (`paper.css:130`) so teal/navy CANNOT paint. The CONTEXT-cited
"iridescent purple/blue sweep" has been HARDENED OUT in source already — the field is now warm
oklch. **So the "metallic/disgusting" iridescence is partly fixed.** BUT the residual deviation
is the user's actual directive: *"every page should have an AURORA, not the paper wash."*

The category landing deliberately ships a **frozen aurora STILL** instead of live GL
(`SectionLanding.vue:53–73`, `auroraFallbackGround(config)` → `data:` URI → CSS
`background-image`), and `.paper-field` is a CSS gradient — neither is the real `<Aurora>`
WebGL surface. The grain layer (`paper.css:44`, `--paper-grain-tooth` feTurbulence @ light
0.22 / dark 0.16 opacity, `paper.css:31`) rides ON TOP at `multiply`/`screen` — a coarse 140px
tooth at 0.22 multiply over a warm gradient is what reads as a "brown woven metallic wash"
(the tooth is anisotropic `baseFrequency='0.04 0.09'`, a directional weave). The principle
(DESIGN.md §L1: "a colorful field behind glass… visible paper grain") is RIGHT; the
implementation chose a CSS-gradient + a heavy directional grain over the real aurora the user
now demands. The one-GL-per-route budget (DESIGN.md §L7 paint fence) is the genuine tension —
it must be reconciled (ONE shared offscreen-paused `<Aurora>` per route, not N).

### F3 — The display clamp over-scales: §L6 aristotelian proportion violated by rung-selection + vw coefficient (CONTEXT defects 10)

The ladder math is sound — `typography/scale.css:123–146` is a clean φ-indexed √φ ladder
(`display-1` = φ², `display-hero` = φ⁵, `display-audacious` = φ^(11/2)). **The clamp is not
broken; the rung selection is.** `compositions/hero.vue:98` renders the composition-card H1 at
`text-display-hero` = `clamp(6.854rem, 4.5rem + 12vw, 17.942rem)` — at 1920px viewport the
preferred term `4.5rem + 12vw` = 72 + 230 = **302px → clamps 287px**; at a 1440px laptop it is
**245px**. A composition card title at 245–287px is "headers WAY too large" (defect 10). §L6
says "hero stages target φ² of the body rung" — φ² ≈ 42px, i.e. `display-1`, maybe `display-3`
(67px) for a true page hero — NOT `display-hero` (the metric-value/fast.com peg rung). The
12vw coefficient makes the preferred term dominate the entire laptop+ range before the max
clamps, so even the "intended" rung over-scales. **Two deviations compound: a poster rung used
for a card title, AND a vw coefficient that lets the preferred term run away.** §L6's own
selection rule ("reach for the nearest φ-ladder token") was not honored at the hero call site.

### F4 — The routing freeze is §L4 (liquid weight) applied to the wrong LAYER, killing §L2/§P2 (CONTEXT defect 1 — the linchpin)

`StoryPage.vue:72` and `SectionLanding.vue:85` put `class="scroll-build"` on the **page ROOT**
— the exact element rendered inside `AppShell.vue:405` `<Transition name="fade-slide">` via
`<component :is="Component" :key="route.fullPath">`. `.scroll-build` is a mount `animation`
(`scroll-choreography.css:106–126`, `@keyframes` + `animation-delay` stagger). Vue's
`<Transition>` auto-detects whether to wait on `transitionend` or `animationend` by reading
the root's computed style; a root that carries BOTH the transition (`fade-slide`) AND a mount
`animation` (`scroll-build`) **mis-fires the type detection** → the leave hook never resolves →
the leaving page never unmounts (CONTEXT-confirmed: `<main>` childCount 2→3, old+new coexist,
URL changes but page stays stale until hard reload). This is the §L4 "liquid weight is
universal" law applied to the page-build entrance, BUT mounted on the layer §L2/§P2 owns (the
route enter/exit spring), so the two motion systems collide and the route transition — the
single most load-bearing motion in the app — is dead.

Compounded contrivance (all on the same over-engineered route layer):
- `AppShell.vue:104–135` — a `startViewTransition` watcher for the dock V↔H morph (a no-op
  for routing; see F8).
- `AppShell.vue:203–228` — a SECOND `startViewTransition` watcher keyed on `categoryId`
  ("Chrome crossfades the before/after"). Two VT watchers + a `<Transition>` + the bloom hack
  = four motion systems fighting over one route swap.
- `AppShell.vue:251–267` — `useBloomUp` driving a "find first non-skeleton child" bloom from a
  skeleton placeholder into resolved content. A 507-line composable (`useBloomUp.ts`) for a
  void-fill follow-through that the broken transition makes unreachable anyway.
- `AppShell.vue:404–476` — ONE `<Transition>` wrapping a 3-way `v-if/v-else-if` (component /
  matched-but-pending skeleton / no-match Card) in DEFAULT mode (no `out-in`), keyed on
  `route.fullPath`. A 3-branch default-mode transition is itself fragile (Vue expects ≤2
  branches reliably; default mode overlaps enter+leave).

This is the §P5/§P6 "single-source motion" discipline INVERTED — instead of ONE coherent route
transition, the shell stacks four overlapping mechanisms, and the §L4 page-build animation on
the transitioned root is the keystone that jams them all.

### F5 — Scroll-shrink is plumbed but the title-shrink register reads dead (CONTEXT defect 4)

`ScrollCard.vue` is correctly structured (the `.card-scroll-host` scroll-port + the
`--card-scroll` named timeline, `ScrollCard.vue:84–95`) and `ScrollCardHeader` slots
`CardTitle`/`CardDescription` into the `card-*-shrink` lanes. The mechanism EXISTS. But the
user reports "titles no longer scroll-and-shrink" — two gestalt causes: (a) the scroll-shrink
card is a SPECIFIC component a story must reach for, and the broken routing (F4) + the
frozen-still landings (F2) mean most pages never mount a live `<ScrollCard>`; (b) the
`--card-scroll` timeline needs a bounded-height scroll port WITH overflow, and the page-build
`.scroll-build` mount + the route freeze interfere with the scroll-driven timeline ever
arming. The principle (DESIGN.md §L6 + the scroll-choreography register) is present; the
register is dead at the gestalt level because the surfaces that should host it don't, and the
one motion layer (F4) is jammed. **The scroll-shrink is not the per-mechanism bug the user
thinks — it is a downstream casualty of F4 + F2.** (Worth a live π to confirm the timeline
arms once F4 is fixed.)

### F6 — The "aberrative top bar" — un-root-caused; candidate seams (CONTEXT defect 5)

The orchestrator named a "stray gradient/metallic bar at the top of every page." `AppShell.vue:838`
is a morph-stage pane bg (not the top bar). The likely seams: (a) the `.scroll-build` first
beat (`chrome`, `--i: 0`) rising into place + the route freeze leaving a half-painted chrome
band; (b) a `.demo-scroll-progress scroll-progress` bar pinned to the top of the content
column (`AppShell.vue:393`) whose `--scroll-progress` fill paints a gradient hairline; (c) the
`.paper-field` conic over-glaze (`paper.css:151`, `from -45deg at 78% 22%`) whose top edge can
read as a band. **This one needs a live capture to root-cause** — it is the only CONTEXT defect
I could not pin to a single source line. Flagged for the fix wave, not closed here.

### F7 — The ℱ persistent brand section is wired as the home anchor — the user says REMOVE (CONTEXT defect 8)

`SidebarDock.vue:253–268` + `BottomDock.vue:205–248` mount the ℱ wordmark in the `#persistent`
slot as the "home-left anchor" (`SidebarDock.vue:77`: "the ℱ wordmark home control… RouterLink
to='/'"), with a long-press Fourier-epicycle redraw easter-egg (`SidebarDock.vue:173–180`).
The CONTEXT directive is unambiguous: "**The persistent ℱ brand section atop BOTH docks is
useless → REMOVE.**" This is a clean deletion (the `#persistent` slot + the redraw composable
`useLongPress` wiring + the `<DockSeparator>` after it), per the no-legacy law. The
nav-pattern contract (CLAUDE.md "home-left `#persistent`") must be RELAXED for these shell
docks — the home affordance moves to the category rail itself.

### F8 — The V↔H morph is a MODAL demo, not an in-dock morph — user-intent reversal (CONTEXT defect 13)

`SidebarDock.vue:210–216` / the BottomDock control dispatch `glass-ui-demo:toggle-dock-morph`,
which `AppShell.vue` catches to open a **focused modal morph STAGE** (`AppShell.vue:497`
`<Transition name="morph-stage-fade">` … `:720`, an overlay over the live shell with a
crossfade default + a liquid-teardrop toggle). The CONTEXT directive: "remove the
crossfade/View-Transition variant (only the liquid teardrop works); make the morph **a BUTTON
IN THE DOCK** that morphs the vertical dock into the horizontal (and back) **IN PLACE** — not a
demo, not a modal." The shipped design is the AZ.W-DOCK-MORPH-INSITU "two-synthetic-dock
modal" pattern; the user wants the REAL shell dock to morph orientation in place. The
`useDockOrientationMorph` driver + the `--dock-morph-t` scalar ALREADY exist and are
orientation-aware (CLAUDE.md dock-morph-family) — the deviation is that they drive a synthetic
modal stage instead of the live dock. Plus: the crossfade/VT variant (`AppShell.vue:573` "the
§7-shipped View-Transitions crossfade") must be DELETED (no-legacy) leaving only the teardrop.

### F9 — Frozen-still category previews vs the live-component directive (CONTEXT defect 11)

`SectionLanding.vue:53–73` ships category cards as a **frozen aurora still** (`auroraFallbackGround`
→ CSS `background-image`) + a `<IconChip :icon="sectionIcon">` (`SectionLanding.vue:110`) +
`SectionPreviewCard` bento cells. The user directive: "Category cards waste enormous space — a
tiny icon + a huge empty thumbnail. **live previews of REAL components, not icons.**" The
shipped design EXPLICITLY chose stills-not-live (the `P10c W-CUT GL-BUDGET` comment,
`SectionLanding.vue:52`) to honor the one-GL budget — but that budget decision sacrificed the
user's stated intent. This is the §3 "visual-load-bearing" tension: the previews must show real
shipped primitives (a real `<Button>`, a real `<Slider>`, a real glass Card), not a frozen
aurora glyph. The reconciliation is mounting CHEAP live primitives (DOM components, not GL
canvases) as the preview — a button/slider/menu costs nothing on the GL budget.

### F10 — Glass-material coherence: the dock reads heavier/darker than cards (DESIGN.md §L1 "ONE coherent glass material")

The blur ladder is internally consistent and on-spec (`tokens/glass.css:75–92`: wash 1, quiet
8, resting 10, floating 13, overlay 13, dock 9 — all in the DESIGN.md 8–15px band). **The blur
is NOT the inconsistency.** The dock reads heavier because of TWO compounding tints the cards
don't all carry: (a) the dynamic adaptive self-darken (`dock/adaptive-legibility.css:40–68`)
lerps the dock plate from the warm-cream floor toward the ≤24% AA ink ceiling as the field
luma rises past the 0.6 knee — over the bright warm `.paper-field` the dock sits near the AA
ceiling, reading dark; (b) the red cartoon-cast (F1) haloing it. The PRINCIPLE (one dynamic
legibility axis, DESIGN.md §L5 worst-case-contrast) is correct and elegant — but its OUTCOME
over the new bright field is a dock that reads "over-blurred/dark" relative to a calm content
Card (which only self-engages the sub-perceptual 4% floor per the adaptive content-tier rule).
The user perceives "inconsistent glass" because the dock's legitimate AA-darken + the red cast
make it a different material than the calm cards. This is a CALIBRATION deviation (the AA knee
+ ceiling are tuned for a worst-case white plate, not the warm field), not a structural one.

### F11 — Motion canon adherence is otherwise STRONG (the principles that DID hold)

To be fair to the redesign: the spring register (`--spring-{smooth,snappy,bouncy,gentle}` +
the per-spring `-duration` clock, DESIGN.md §Easing) is intact and on-spec; the
`--ease-cartoon-punch` shaped-linear anticipation curve is correctly NOT a spring row (§L2);
the §P5 compositor-only discipline holds in the cast (translate/scale only, `cards.css:380`
`will-change: translate, scale`); the §P6 PRM carve zeroes `--motion-weight` in one assignment
(`cards.css:387`). The motion VOCABULARY is right. The failures are LAYER-PLACEMENT (F4) and
TOKEN-CALIBRATION (F1, F10), not vocabulary.

---

## ROOT CAUSES (gestalt, first-principles)

1. **Identity tokens were tuned past their own stated ceilings.** The no-gray "technicolor"
   discipline (BA.W-NO-GRAY: chroma floor so neutrals read warm) was over-applied to the
   cartoon INK (`max(c, 0.11)` is a 5.5× lift on a near-neutral foreground) → red. The
   field-vs-aurora and the display-hero-vs-display-3 are the same class: a correct token used
   at the wrong magnitude / wrong call site. **The fix is re-calibration on the EXISTING token,
   never a new one.**

2. **The §L4 "liquid weight is universal" law was applied to the route-transition LAYER, which
   §L2/§P2 owns.** A mount `animation` on a `<Transition>`-child root is the single
   architectural mistake that froze routing. The motion laws are correct individually but were
   not composed with the §P5/§P7 "ONE source, ONE clock, single-writer" discipline at the route
   seam — so four motion systems (Transition + 2 VT watchers + bloom) overlap on one swap.

3. **Budget decisions silently reversed user intent.** The one-GL-per-route fence (real, §L7)
   was honored by shipping frozen stills + CSS fields — but the user's directives (aurora
   everywhere, live-component previews) were the ACCEPTANCE bar, and the budget-preserving
   choice failed it. The reconciliation is architectural (ONE shared offscreen-paused aurora;
   cheap DOM-component previews), not a budget-vs-intent standoff.

4. **The in-situ-morph + persistent-brand were over-built demos, not shell features.** The
   AZ-era "synthetic modal morph stage" + the ℱ easter-egg are contrivances the user reads as
   noise. The driver (`useDockOrientationMorph`) is right; it must drive the REAL dock.

---

## PROPOSED WAVES

### BG.W-CARTOON-INK-DECHROMA — kill the red cast; restore the near-neutral cel ink
- **Intent.** The cartoon cast reads as a near-black (light) / near-white (dark) cel ink per
  DESIGN.md §Shadows, NOT a chroma-floored warm-red.
- **Approach.** Re-tune `--cartoon-ink` (`tokens/shadow.css:107` + `dark-arm.css:177`): drop the
  `max(c, 0.11)` floor to a whisper (`max(c, 0.03)` or simply inherit `--foreground`'s own
  chroma — the foreground is ALREADY warm at C≈0.02, so a near-neutral ink IS warm). Keep the
  L-deepen and the down-left geometry. Re-derive the three opacity rungs. The cast becomes a
  warm-DARK near-neutral cel ink (the doc's own description), not a red halo. Update DESIGN.md
  §Shadows to match (or re-affirm the doc and fix the token to it).
- **Files.** `tokens/shadow.css`, `tokens/dark-arm.css`, `DESIGN.md §Shadows`.
- **π bar.** The composited cast color over the warm field + over white resolves OKLCh C ≤ ~0.05
  (not 0.11) at the lead plane; no red halo around docks/cards, both modes. Corner-clip clean
  (see W-CAST-CLIP). Folds CONTEXT defect 3.

### BG.W-CAST-CLIP — the offset cel-cast clips to the host silhouette
- **Intent.** No rectangular aliasing at card top-corners or dock bottom-left.
- **Approach.** The `.cartoon-cast` child's offset planes must not poke un-radiused rectangles
  past the host box. Either clip the cast to the host radius (a `clip-path`/`mask` following the
  silhouette) or inset the cast so the offset stays within a radiused envelope; verify the
  `border-radius: inherit` actually matches the host on all corners. For the dock, confirm the
  `.glass-dock-frame` non-clipping escape isn't leaking the cast's hard corner.
- **Files.** `cards.css` (`.cartoon-cast`), `dock/shape.css` (`.glass-dock > .cartoon-cast`).
- **π bar.** Card + dock corners read radiused over a busy field, both modes; no rectangular
  offset-plane corner visible. Folds CONTEXT defect 3b.

### BG.W-AURORA-EVERYWHERE — the real aurora is the per-route field (reconcile the GL budget)
- **Intent.** Every page has a real `<Aurora>` behind the glass (the user directive), NOT the
  CSS `.paper-field` gradient + heavy grain.
- **Approach.** ONE shared, offscreen-paused `<Aurora>` mounted at the AppShell route-scroller
  level (the §L7 one-GL-per-route fence honored by SHARING one context across the route, not N
  per card), warm-bound by the per-category hue. Retire `.paper-field` as the default backdrop
  (keep the device-free `auroraFallbackGround` ONLY as the SSR/no-GL/PRT degraded arm). Dial the
  paper-grain tooth DOWN (the 0.22 multiply directional weave is the "metallic" read) or move it
  off the warm field so it doesn't crush the pigment. Reconcile with the DockStage shared-aurora
  pattern (one aurora per dock route already exists — generalize it to all routes).
- **Files.** `demo/layout/AppShell.vue`, `src/styles/paper.css` (`.paper-field` → degraded arm),
  `PaperBackdrop.vue`, `warm-field.ts`, the per-page background map (`manifest.ts`).
- **π bar.** Every route paints a real warm aurora behind the glass (transmissive, defined edge,
  NEVER gray); ≤1 live GL context per route (budget held); the grain reads as paper not metal;
  PRT/SSR degrades to the still. Folds CONTEXT defect 2.

### BG.W-ROUTE-TRANSITION-RETHINK — ONE coherent, idiomatic route transition (the linchpin)
- **Intent.** Clicking a nav link unmounts the old page and mounts the new — ONE spring-clocked
  route transition, no freeze, no four-system overlap.
- **Approach.** Remove `.scroll-build` from the page ROOT (it is the §L4-on-wrong-layer keystone)
  — the page-build entrance becomes either (a) a `<Transition>`-mode `out-in` enter on the
  shell's own transition (so the route enter IS the page-build, ONE system), or (b) applied to a
  child wrapper INSIDE the routed component, never the transitioned root. Delete the two no-op
  `startViewTransition` watchers (`AppShell.vue:104–135`, `:203–228`) and the `useBloomUp`
  find-first-child hack (`:251–267`) — replace the skeleton-bloom with the route transition's own
  enter. Reduce the 3-branch default-mode `<Transition>` to a clean ≤2-branch `out-in` (the
  matched-but-pending skeleton becomes a Suspense fallback or a simpler branch). ONE source, ONE
  clock (§P7).
- **Files.** `demo/layout/AppShell.vue`, `StoryPage.vue`, `SectionLanding.vue`,
  `scroll-choreography.css` (`.scroll-build` re-targeting), `useBloomUp.ts` (likely retired).
- **π bar.** Nav click → old page unmounts (`<main>` childCount stable at 1), new page mounts
  with ONE spring-clocked enter, no stale page, no double-mount; PRM keeps the fade drops the
  transform. Folds CONTEXT defects 1, 9, and unblocks 4 (scroll-shrink) + 5 (top bar).

### BG.W-DISPLAY-PROPORTION — the hero rung + vw coefficient honor §L6
- **Intent.** Composition/page headers read proportioned, not 245–287px monsters.
- **Approach.** Two edits: (a) the hero call sites pick the CORRECT φ rung — a composition card
  H1 is `display-1`/`display-3` (φ²/φ³), NOT `display-hero` (the metric-value/fast.com peg). Audit
  every `text-display-hero`/`-mega`/`-audacious` consumer and re-point off-purpose ones. (b) The
  poster rungs' vw coefficients (`display-hero` 12vw, `display-audacious` 16vw) let the preferred
  term dominate the whole laptop+ range — re-tune the vw coefficient down so the clamp's MAX
  governs sooner (a poster rung should hit its max by ~1280px, not run to 1920px). The √φ ladder
  values STAY; only the vw slope + the rung selection change.
- **Files.** `typography/scale.css` (vw coefficients), `compositions/hero.vue` + every poster-rung
  consumer (`StoryHero.vue`, metric surfaces).
- **π bar.** `/compositions/hero` H1 reads ≤ ~70px (display-3 ceiling); metric values keep their
  audacious peg; the φ-ladder spacing is unbroken. Folds CONTEXT defect 10.

### BG.W-DOCK-MORPH-IN-PLACE — the V↔H morph is a dock button, in place, no modal
- **Intent.** A button in the dock morphs the live vertical dock ↔ horizontal IN PLACE; the
  crossfade/VT variant is deleted; esc is moot (no modal).
- **Approach.** Delete the AppShell modal morph stage (`AppShell.vue:497–720`) + the crossfade/VT
  default (`:573`). Wire the dock's morph button to drive `useDockOrientationMorph` on the REAL
  shell dock (`--dock-morph-t` already orientation-aware, CLAUDE.md dock-morph-family) so the
  live SidebarDock↔BottomDock orientation flips in place via the liquid-teardrop goo bridge ONLY.
  The shell's fixed two-dock topology is the constraint — resolve it by morphing ONE dock's
  orientation in place (the shell re-flows around it), not the synthetic two-dock modal.
- **Files.** `demo/layout/AppShell.vue` (delete the stage), `SidebarDock.vue`, `BottomDock.vue`,
  `useDockOrientationMorph` wiring.
- **π bar.** The dock morph button flips the live dock V↔H in place via the teardrop bridge, no
  modal, no crossfade variant, no esc needed; bidirectional + interruptible. Folds CONTEXT
  defect 13.

### BG.W-DOCK-DE-BRAND — remove the persistent ℱ section; relax the nav-pattern home contract
- **Intent.** The useless ℱ persistent brand section is gone from both docks.
- **Approach.** Delete the `#persistent` ℱ wordmark + the `useLongPress` Fourier-redraw
  easter-egg + the trailing `<DockSeparator>` from `SidebarDock.vue:253–268` and
  `BottomDock.vue:205–248`. Relax the nav-pattern "home-left `#persistent`" contract for shell
  docks (CLAUDE.md dock nav-pattern) — the home affordance is the category rail itself or a single
  compact control, not a brand block.
- **Files.** `SidebarDock.vue`, `BottomDock.vue`, the dock nav-pattern doc/gate.
- **π bar.** Neither dock shows the ℱ brand section; the nav rail still reaches home; no
  orphaned separator. Folds CONTEXT defect 8.

### BG.W-LIVE-PREVIEWS — category cards show real components, not icons (cheap DOM, GL-budget-safe)
- **Intent.** Category cards present LIVE real shipped primitives (a real Button/Slider/menu/glass
  Card), not a tiny icon + a frozen aurora thumbnail.
- **Approach.** Replace the `auroraFallbackGround` frozen still + `<IconChip>` glyph
  (`SectionLanding.vue:53–110`) with a per-category live mini-composition of CHEAP DOM primitives
  (no GL canvas — a button/slider/toggle/menu costs nothing on the §L7 GL budget). The card body
  IS the preview; the icon shrinks to a corner label. Re-tighten the bento spans so the card
  doesn't waste space around a huge empty thumbnail.
- **Files.** `SectionLanding.vue`, `SectionPreviewCard.vue`, the per-category preview spec.
- **π bar.** Each category card shows a live, interactive-looking real component; no huge empty
  thumbnail; the icon is subordinate; GL-budget unchanged. Folds CONTEXT defect 11.

### BG.W-DOCK-LEGIBILITY-RECAL — re-tune the adaptive AA knee for the warm field (one coherent glass)
- **Intent.** The dock reads as the SAME glass material as the cards over the warm field — not a
  dark over-darkened plate.
- **Approach.** The adaptive self-darken (`dock/adaptive-legibility.css:40–68`) lerps toward the
  ≤24% AA ceiling past a 0.6 luma knee tuned for a worst-case WHITE plate. Over the warm field
  (luma mid-high but warm, not white), re-tune the knee/ceiling so the dock darkens only when
  legibility genuinely requires it — the warm field admits more translucency at AA than a flat
  white. Pairs with W-CARTOON-INK-DECHROMA (the red cast was half the "heavy" read). Keep the
  ONE-axis/ONE-driver discipline (DESIGN.md §L5) — only re-calibrate the knee.
- **Files.** `dock/adaptive-legibility.css`, `glass-fx.css` (the knee/ceiling tokens).
- **π bar.** Dock + content Card read as ONE glass material over the warm field (matched
  translucency where AA permits); dock holds 4.5:1 worst-case; both modes. Folds CONTEXT defect
  3-adjacent + the "inconsistent blur" perception.

### BG.W-TOP-BAR-DIAGNOSE — root-cause + remove the aberrative top bar (live capture required)
- **Intent.** No stray gradient/metallic bar at the top of any page.
- **Approach.** Live π capture to pin the seam (candidates: the `.scroll-build` chrome beat
  mid-freeze, the `.demo-scroll-progress` fill, the `.paper-field` conic top edge — F6). Then
  delete/re-tune the offending rule. Likely resolves as a free rider of W-ROUTE-TRANSITION-RETHINK
  (the freeze leaves a half-painted chrome band).
- **Files.** TBD by capture (`AppShell.vue`, `scroll-choreography.css`, or `paper.css`).
- **π bar.** No top-edge bar on any route, both modes. Folds CONTEXT defect 5.

---

## DESIGN.md / canon AMENDMENTS (are the principles right? what's missing?)

The principles are **~90% right** — the seven §L precepts, the 12-laws motion taxonomy, the √φ
aristotelian ladder, and the iOS-27 reference bar are a genuinely SOTA, internally-coherent
canon. Three amendments:

1. **§Shadows — the cartoon cast must NOT chroma-floor the ink.** DESIGN.md:398 says "near-black
   ink stamp"; the live token floors chroma to 0.11 producing red. Either the doc is right (fix
   the token, W-CARTOON-INK-DECHROMA) or add an explicit ceiling: the cast's chroma floor is
   capped so a warm-but-near-neutral foreground never produces a saturated cast. Add a one-line
   fence: *"the cartoon ink inherits `--foreground`'s warmth but NEVER lifts chroma past ~0.05 —
   a cel ink is dark, not colored; the no-gray floor is for SURFACES, not the ink stamp."*

2. **§L1 / §L7 — the field-vs-aurora budget reconciliation must be NAMED.** The canon says "a
   colorful field behind glass" (§L1) and "one GL context per route" (§L7) but does not resolve
   how to give EVERY route a real aurora under that budget. Amend §L7's paint fence with the
   resolution: *"the route's field is ONE shared offscreen-paused `<Aurora>` at the route
   scroller, not N per-card canvases; the device-free `auroraFallbackGround` still is the
   SSR/no-GL/PRT degraded arm ONLY, never the default."* This closes the F2/F9 intent reversal at
   the canon level.

3. **§L2 / §L4 — add the LAYER-PLACEMENT law (the missing rule that froze routing).** The motion
   canon (§P5/§P7) governs WHICH channel and WHICH clock, but not WHICH ELEMENT a mount animation
   binds to relative to a `<Transition>`. Add: *"A `<Transition>`-child ROOT carries the route
   enter/exit (§L2/§P2) ALONE — no mount `animation` (§L4 page-build) on the transitioned root,
   which mis-fires Vue's transition-type detection and jams the leave hook. The page-build
   entrance binds a child wrapper INSIDE the routed component, or IS the route transition's own
   enter — never both on one element."* This is the single missing law that, stated, prevents the
   linchpin defect class.

The √φ type ladder and the spring register need NO amendment — they are correct; only the hero
call site (rung selection) and the poster vw coefficients deviated from them (W-DISPLAY-PROPORTION
fixes the consumers, not the canon).
