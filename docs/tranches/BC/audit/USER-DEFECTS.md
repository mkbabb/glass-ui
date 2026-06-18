# BC — the user's page-by-page defect + design-direction ledger (2026-06-18, verbatim)

The user walked the live demo (:5199) surface-by-surface. EVERY item below is a binding BC
acceptance criterion. Grouped by surface; the design directives (the iOS-27/SOTA targets) are
in §D.

## A — DOCK (animations broken, blurry, not liquid glass; the 178-commit chronic)
- `/dock/overview` is TOTALLY broken, blurry, a mess.
- ALL dock animations are broken + not smooth; they STUTTER. Must be **buttery smooth + liquid glass**.
- When the dock is SHRUNKEN it's a **blurry mess**.
- The liquid morph turns WHITE/invisible (carried from the prior message; the dock = absolute expressiveness).
- The ENTIRE vertical dock is broken + **NOT CLICKABLE**.
- The bottom dock should DISPLAY a few tab items + the core persistent controls. Both the vertical
  AND bottom dock need **collapsed states**.
- The rail = the macOS hover-expand stack (carried: extend-beyond, hover-expand, 3-configurable, scrollable, n-stack).
- A "black bar" anomaly recurs (the dark rim / card-top bar).

## B — TABS (/navigation/tabs — not to spec, not liquid glass)
- Not to spec; NOT liquid glass at all.
- No proper PILL variant — must be **PROPER SMALL PILLS, not squared** (like the current value.js demo).
- The tabs should ALL be **glassy**, and **NOT reka/shadcn-like**.
- THE LIQUID TAB: pull an active tab → it **morphs, squishes, to the current location** (the iOS-27 facility).

## C — CARDS · PADDING · PAGE STRUCTURE · HIERARCHY (every page)
- The "double card idiom with a grid background" is wrong → **ONE card with the aurora or a procedural animation**.
- **EVERY PAGE** must have an **audacious, LARGE, hero-like header that SHRINKS as you scroll**.
- ALL padding items wrong across pages (`/display/card` — **literally every card is wrong**; the dialog; many).
- Text not centered (a specimen page).
- Items not rounded (multiple: a separator-page element, the home screen, the aurora configurator).
- `/display/separator` is **TOTALLY broken**.
- Buttons don't work (a specimen page).
- Each section on a page must be **properly delimited with hr lines OR in different cards**. Suffuse
  design hierarchy on **EVERY PAGE — EVERY PAGE NEEDS TO BE STANDARDIZED**.
- Component names + technical values must be **proper CODE BLOCKS + Fira Code font**.
- Ghost items must have a **DASHED outline**.
- `/display/card` — every card's padding is wrong.
- The dialog padding is wrong; the glass dialog is **NOT glassy at all** (GLASS must be partially transparent).
- A clipped/odd element with a grid background ("WTF is this — and it's clipped?").
- A page is "totally illegible — most of it is superfluous and useless."
- "View source" BS must be REMOVED; platitudes / useless / out-of-date copy removed.
- Hero items that redirect (link cards) must have **icons + better design hierarchy**.

## D — GLASS (iOS-27 inspired; partial transparency; prune the duplicates)
- ALL glassy items must be **Apple iOS-27 inspired**.
- The glass dialog is **NO different + not glassy at all** — GLASS must be **partially transparent**.
- Increase **glass-morphism for buttons**.
- iOS-27 = increased glass-morphism WHILE increasing legibility — **suffuse** this throughout.
- `/substrates/glass-panel` vs a glass card — **why so many glass duplicates?** Properly **PRUNE + STANDARDIZE** → Glass **CARDS** + Glass **MATERIALS** (two registers, not many).

## E — SUBSTRATES · PROCEDURAL VIZ (WebGPU EVERYWHERE, no canvas, NO fallbacks — incl. Safari)
- **WebGPU is present EVERYWHERE (as long as it works on Safari) — ALL animations use it. NO FALLBACKS. EVER.** No canvas anywhere.
- `/substrates/aurora`: TOTALLY broken, renders SLOW. The configurator is **misplaced → must be on the RIGHT on desktop** (ALL configurators: controls on the RIGHT on desktop). The **previews NEVER render** (dark dead cards). The aurora configurator is **not rounded**. The aurora HEADER is good but should be **larger + shrink on scroll**; every page title standardized like this **with its subpath explicitly defined**.
- `/substrates/blob`: **TWO headers IN the card** → all headers ON TOP of the card. The blob is **TOTALLY broken — does not meatball, does not render at all**. A **dot-matrix goo-blob variant** is wanted.
- `/substrates/constellation`: broken; **not in a card** → every page reuses the giant-hero-text-shrinks-on-scroll + body-in-a-card idiom. The **circles are supremely LOW-RES**. Totally redesign to **WebGPU — NO canvas anywhere**.
- FOURIER: **totally duplicative — several fourier views → ONE view**.
- `/substrates/dot-flow-field`: **absolutely awful — does not form waves/shapes, a mess of NOISE**. Must be **SUBTLE, form LARGER + more SWEEPING waves** (ref: the Claude co-work dot-matrix spheres — subtle fine-dot spheres on dark; `Downloads/Screenshot 2026-06-17 at 14.45.16.png`). Large + sweeping, not chaotic.
- `/substrates/concentric`: awful → must display **concentric ELLIPSOID LINES that form distinct WAVES** (not noise).
- The PAPER GRID procedural: a mess → fix to be **evenly spaced + LARGER**; the grid LINES must **morph + wave in a liquid way**; suffuse it throughout the site as a **subtle background element**.
- The new grid background is a **blurry mess → TOTALLY ABROGATE it. It's a SIMPLE grid — like in keyframes.js.** The grid is oddly spaced → consistent + larger, and **NOT displayed in the card** on pages like this.
- **REMOVE the teal-on-navy reference entirely.**
- "WTF is this blue" (a stray blue artifact).

## F — CONTROLS (broken interactions)
- ALL **radio buttons don't work** + no proper toggle states.
- The DROPDOWN: clicking it **shifts the trigger left + right**; the dropdown is **not spaced/aligned**; the **dropdown dot is totally wrong + occluded**.
- Controls are **super laggy**; some have **SQUARE borders**.

## G — HOME · INTRO · COMPOSITIONS (duplication, three-hero, broken redirects)
- Home-screen elements not rounded (multiple).
- `/foundations/intro` has **THREE heros**.
- `/compositions/hero` has the **EXACT same content as the homepage** + the three bugged-out views.
- No padding (home / a redirect card).

## H — SAFARI (wholly broken)
- **NONE of this works on Safari.** None of the liquid morphing works on Safari at all — it **rapidly FLASHES the screen**.

## §D — DESIGN DIRECTION + the SOTA RESEARCH the user commissioned
- **iOS-27 liquid animation primitives**: liquid fade-in for opening apps / the control centre; the
  coupled fade in+out; the tab pull-morph-squish; **increased glass-morphism + increased legibility together**.
- **All animations liquid-glass**: squishy, springy, quick, **coupled fade in/out** — adhere to the
  **principles of web animation**. Leverage **keyframes.js + value.js** (our rich animation facilities).
- **Design-hierarchy suffusion**: glass · grid · math · LARGE audacious typography · **colorful audacious POPS** (like the icons — how to increase WITHIN proportion) · the animation targets. Fix obvious visual incongruences.
- **glass-ui idiom audit**: what to smoothen / refine / hone / abstract out (or fold into one extant
  component); find GAPS.
- **Run a frontend-design plugin audit** of ALL UI panes.
- **SOTA research set vs https://www.awwwards.com** (a fleet, frontend-design plugin).
- **Properly audit apple.com + iOS-27 primitives** — a SOTA research audit.
