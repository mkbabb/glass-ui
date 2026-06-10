# RA-anim-suite — the animation suite, judged live (RealityB)

**Question.** Does the motion suite speak ONE language live—enters lively, exits clean,
surfaces on bezier—per the §6 doctrine (tokens.css §2), or do components speak
different dialects? Driven on the live demo at `localhost:5199`, headless Chromium
(ANGLE/metal for aurora-bearing routes, per the tests-visual π config). Every claim
below is grounded in a rAF/4ms-interval numeric sample or a CDP-screencast film strip
captured in this directory.

**Verdict: MIXED.** The spring vocabulary, press cohort, exits, idle discipline, and
the reveal/skeleton/orchestrator surfaces are genuinely good—several excellent. But
the flagship overlay family (Dialog/Popover/Dropdown/Toast) does NOT speak the §6
spring-enter register (it speaks tw-animate's generic `ease`), and two surfaces are
functionally BROKEN live: the Drawer story trigger silently no-ops, and a fired Toast
can never be dismissed (no auto-dismiss, dead close X, dead swipe). Gate-green,
live-broken—the AX cardinal lesson, again, on the reka-binding seam the project
memory already names.

---

## 1. Dialog — enter/exit (containers/dialog)

- **Measured (default `<DialogContent>`):** `animation: enter 0.3s ease` on open;
  fade 0→1 + zoom 0.967→1 (sampled width 495→512px), monotone, ~300 ms. Exit:
  fade 1→0 + shrink →0.95, monotone, gone ~350 ms after Escape. NO overshoot either
  direction. Strips: `RA-anim-suite-dialog-enter-strip.png`,
  `RA-anim-suite-dialog-exit-strip.png`.
- **Judged:** clean, competent, generic. The §6 table says *enter → spring-bouncy /
  spring-snappy*; the shipped default enters on tw-animate's `ease` with zero spring
  character. The W13 spring entrance exists (`spring` prop → useSpringMount) but **no
  demo story mounts it**—the doctrine's lively-enter register is opt-in machinery
  nobody opted into. The `dialog-scale` Vue-transition class set (bouncy enter) ships
  in transitions.css but the Dialog component doesn't ride it.
- The exit is doctrine-CLEAN (no overshoot)—that half of the doctrine holds
  everywhere I measured.

## 2. Popover + DropdownMenu (containers/popover, containers/dropdown-menu)

- **Measured:** both `animation: enter 0.15s ease`—fade + zoom-95 + 2-unit slide,
  settled ~150-170 ms. Exits monotone fade, gone ≤300 ms. Strip:
  `RA-anim-suite-dropdown-enter-strip.png`.
- **Judged:** quick and unobtrusive; reads fine. Same dialect gap as Dialog: the
  `.dropdown-*` Vue classes in transitions.css carry `--spring-snappy` on transform,
  but the actual reka surfaces use `popover-animate` (tw-animate `ease`). The
  `proof:animation-coherence` REGISTER-ASSIGNMENT arm only parses `transition:`
  declarations and explicitly waves `animation:` shorthands through as
  "enter→spring is correct"—so the gate cannot see that these enters are NOT springs.

## 3. Sheet (containers/sheet)

- **Measured:** enter `0.55s cubic-bezier(0.4,0,0.2,1)` (= `--ease-standard`)
  slide-in from edge (tx 383→0) + fade; exit ~200-350 ms monotone. Strip:
  `RA-anim-suite-sheet-enter-strip.png`.
- **Judged:** calm, deliberate, no overshoot; the `--duration-panel` open /
  `--duration-fast` close asymmetry reads well. At least this one rides a house
  bezier token—but again a bezier ENTER, not the doctrine's spring.

## 4. Drawer (containers/drawer + compositions/drawer-live-behind)

- **BROKEN: the basic Drawer story is dead.** Clicking "Open drawer" / "Open fixed
  drawer" produces ZERO DOM mutations, zero console errors, and the trigger's
  `aria-expanded`/`data-state` never flip (`false`/`closed` before AND after click,
  attribute-level capture). Capture: `RA-anim-suite-drawer-story-dead-trigger.png`
  (page after click—nothing). The silent reka/vaul binding no-op class the project
  memory flags ("only e2e catches").
- **The live-behind composition works—but only because it bypasses the trigger:**
  its Peek/Half/Full buttons write `liveOpen = true` directly (`v-model:open`).
  Through that path vaul motion is real: `transition: transform 0.5s
  cubic-bezier(0.32,0.72,0,1)` (vaul's own dialect, documented as vaul-owned),
  handle-drag re-snap is smooth and flingable (peek→full on one drag). Strip:
  `RA-anim-suite-drawer-drag-snap-strip.png`.
- The documented upstream limitation reproduces exactly: clicking "Half" while open
  does not re-snap (top 792→790.4 px—unmoved). The doc told the truth.

## 5. SegmentedTabs elastic indicator (navigation/tabs)

- **Measured (anchor path, the shipped path on Chromium):** far jump (Grid→Timeline,
  237 px on a 324 px track): `--stretch` peaks 1.059; RENDERED `scale` peaks
  **1.0624 at 88 ms**, releases through a −0.4% undershoot at ~145 ms, settled by
  ~200 ms. Width flexes 79→84→79 px; height compresses ~2 px. Rapid adjacent
  clicking: rendered peak ~1.5-2%—sub-perceptual. Strip:
  `RA-anim-suite-tabs-glide-strip.png`.
- **The glide does NOT bounce.** The indicator transitions `inset 0.3s
  var(--spring-snappy)` (computed confirms the linear() stops), but the rendered
  position is a fast ~100 ms settle with **0.1 px max positional overshoot**—the
  declared +6.8% snappy overshoot (~16 px here) never paints on the anchor-inset
  path. Whatever Chromium does interpolating `anchor()` insets, the live read is a
  quick precise slide, not the iOS spring register the W53 story claims.
- **Does the squish read?** On a far jump—barely: a ~6% width-breathe over ~100 ms,
  and the indicator is low-contrast (glass-quiet pill on a wash track), which mutes
  it further. On adjacent hops—no. Honest summary: polished micro-detail,
  mathematically present, perceptually marginal; the "Material elastic / grow-then-
  shrink register" is oversold relative to what renders.

## 6. Toast (feedback/toast, feedback/toaster) — BROKEN dismissal + a systemic glass trap

- **Enter:** 150 ms `ease` slide-in from edge (ty 90→0), clean. ✓
- **BROKEN: a fired toast can never leave.** Live measurements on BOTH the story
  page and the library `<Toaster>` story: no auto-dismiss after 16 s (documented
  contract says ~5000 ms dwell); clicking the close X—`data-state` still `open`
  1.7 s later; swipe-right—still open. The documented exit choreography
  (fade + slide-out-right) is UNREACHABLE live. Toasts accumulate forever
  (TOAST_LIMIT 5). Capture: `RA-anim-suite-toast-pileup-4-open-2-visible.png`.
- **Root cause (read-only diagnosis):** `use-toast.ts` hands each toast an
  `onOpenChange` callback and the Toaster/story spread it via `v-bind`—the React
  shadcn prop name. reka-ui's `ToastRoot` emits `update:open`; the Vue listener key
  would be `onUpdate:open`. So the close request (timer, X, swipe) never reaches the
  store while the spread `open: true` keeps the root controlled-open. One renamed
  key, whole surface dead—the exact stale-binding failure class in project memory.
- **Systemic finding (glass-first × position:fixed):** on the toast story the
  4 fired toasts paint TOP-right glued to the story card, not bottom-right—because
  the glass Card's `backdrop-filter` makes it the CONTAINING BLOCK for fixed
  descendants, so the `fixed` ToastViewport anchors to the card box (computed
  `bottom: 0` resolves against the card). With W54 making backdrop-filter ubiquitous,
  ANY fixed-position overlay mounted inside a glass surface silently re-anchors.
  That interaction deserves its own precept line; it will bite again.

## 7. Reveals / staggers / idle discipline

- **v-reveal (motion/reveal):** replay produces a clean rise+fade cascade,
  ~120 ms step between items, each settling softly. Strip:
  `RA-anim-suite-reveal-stagger-strip.png`. Good.
- **Idle-quiet: PASS, and genuinely impressive.** `document.getAnimations()` after
  settle: `/display/buttons` 0, `/containers/dialog` 0, `/foundations/typography` 0,
  `/navigation/tabs` 0, `/forms/inputs` 0. Only `/feedback/progress` runs animations
  at idle (indeterminate sweep + pulse—legitimately load-indicating). Nothing fires
  on mount that should be idle-quiet.
- **Skeleton shimmer (feedback/skeleton):** 1.5 s linear translate-only sweep
  (compositor-friendly as claimed), band visibly traverses; pulse and breath
  variants coexist. Strip: `RA-anim-suite-skeleton-shimmer-strip.png`. The band
  reads slightly heavy (more wipe than sheen) but coherent.

## 8. Route transitions

- **There are none—by construction and confirmed live.** AppShell renders
  `<component :is>` with no `<Transition>`; instrumented click on a BottomDock story
  tab swaps `<main>` content in ONE frame (mutation at 16 ms, no entering-content
  animation beyond one ~470 ms transient). The page swap is an instant cut while
  every overlay around it animates—a missing beat in "the suite as one language."
  Defensible (docs-style tools often cut), but it is a dialect boundary the doctrine
  doesn't acknowledge.
- Method note: with default headless GL, client-side navigation INTO the aurora-
  bearing Card story hard-wedged the renderer; with the π workspace's
  `--use-angle=metal` flags it is fine. Consistent with the tests-visual config
  comment ("software GL crashes the aurora WebGL2 shaders")—a harness footgun, not a
  demo defect, but worth knowing for anyone else driving this demo headless.

## 9. The spring vocabulary itself

- **Real and demonstrable.** foundations/motion renders all 9 curves with live
  500 px dot races; the Spring Orchestrator story animates translate+rotate+hue
  through named snapshots and reads beautifully. Strip:
  `RA-anim-suite-spring-orchestrator-strip.png`.
- **Buttons:** surface legs (bg/border/shadow/color/opacity) transition 0.2 s on
  `--ease-standard` ✓; `scale` leg carries the linear() spring ✓; press squish to
  0.97 universal ✓. Hover LIFT (scale 1.05) exists only on the audacious/gold CTA
  recipes—the standard/glass variants hover-tint without lifting (`--scale-hover-btn`
  token present, unconsumed there). Pair: `RA-anim-suite-gold-cta-hover-pair.png`
  (the gold sweep + lift is a genuinely nice hover).
- **Dark-mode flip:** effectively an instant theme cut (~one frame), small
  crossfades after. Strip: `RA-anim-suite-darkmode-flip-strip.png`.

---

## The suite as one language — the honest roll-up

| Surface | Dialect spoken live | §6-conformant? |
|---|---|---|
| Dialog enter | tw-animate `enter` 300 ms `ease` | enter=spring? NO (clean though) |
| Popover/Dropdown enter | tw-animate `enter` 150 ms `ease` | NO (same dialect) |
| Sheet enter | 550 ms `--ease-standard` slide | bezier enter—half-conformant |
| Toast enter | 150 ms `ease` slide (documented exemption) | exempted—but exit unreachable |
| Drawer | vaul cubic-bezier(.32,.72,0,1) (documented) | exempted; trigger DEAD |
| Tabs indicator | spring-snappy declared; renders as fast no-bounce slide + 6% breathe | partially |
| Button press/hover | spring-smooth scale leg + ease-standard surfaces | YES |
| Exits (all measured) | monotone bezier/ease, zero overshoot | YES—uniformly clean |
| Reveal/stagger/skeleton | ease-out rise / linear sweep | YES |
| Route swap | none (instant cut) | unaddressed beat |

Three dialects ship on flagship surfaces (house springs, tw-animate `ease`, vaul
bezier), and the house spring-enter register—the doctrine's headline—is live only on
opt-in props no story uses, the dock, and the tab indicator (where its bounce doesn't
render). What IS uniformly excellent: exits never overshoot, surfaces never wobble,
idle is silent. The suite is half a language: the *restraint* half is real and
consistent; the *liveliness* half is mostly written down, not shipped.

**Defects to route (in severity order):**
1. Toast dismissal dead (onOpenChange vs onUpdate:open + controlled `open: true`)—
   library-level, both stories.
2. DrawerTrigger silent no-op—basic Drawer story dead.
3. ToastViewport `fixed` captured by glass-card `backdrop-filter` containing block—
   systemic glass-first × fixed-overlay trap.
4. Tabs anchor-path glide does not render its declared spring (no positional
   overshoot)—doctrine-vs-render gap; squish imperceptible on adjacent hops.
5. Dialog/Popover/Dropdown enters ride tw-animate `ease`, not the §6 spring register;
   the spring entrance prop is undemonstrated; proof:animation-coherence cannot see
   this (it exempts `animation:` shorthands).

**Captures:** RA-anim-suite-{dialog-enter,dialog-exit,dropdown-enter,sheet-enter,
tabs-glide,reveal-stagger,skeleton-shimmer,spring-orchestrator,drawer-drag-snap,
darkmode-flip}-strip.png, RA-anim-suite-gold-cta-hover-pair.png,
RA-anim-suite-toast-pileup-4-open-2-visible.png,
RA-anim-suite-drawer-story-dead-trigger.png.
