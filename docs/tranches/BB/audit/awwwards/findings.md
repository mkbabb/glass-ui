# BB — the LIVE awwwards.com SOTA audit (chrome-devtools-mcp, 2026-06-16)

Driven live in a chrome-devtools-mcp instance over `awwwards.com/websites/sites_of_the_day/` + four current Sites-of-the-Day winners (rate-conscious: a representative sample inspected live; the breadth + the frontend-design synthesis run as the fleet). Captures: `00-sotd-gallery.png` + `01-pacome-portfolio.png`. The deep live anchor is pacomepertant.com (network + `evaluate_script` on the live page).

## The current SOTD set (live, 2026-06-16)
`fauna-robotics · elva · sakazuki · crav-burgers · tresmares-capital · serve-robotics · hubtown · pacome-pertant-portfolio · the-power-of-storytelling · sohub · apechain · son-daven`

## The stack + technique distribution (4 winners inspected)
| winner | register | stack (awwwards Technologies) | techniques |
|---|---|---|---|
| pacome-pertant-portfolio | portfolio / motion | **Lenis** (live-confirmed) + GSAP + Three.js + Nuxt | Scrolling · Transitions · 3D · **Microinteractions** |
| the-power-of-storytelling | luxury / agency | **GSAP + Three.js + WebGL** | Animation · Scrolling · Transitions · Storytelling · 3D · UI design |
| fauna-robotics | product | Webflow | **Colorful · Icons · Illustration** · Gestures · Interaction Design |
| sakazuki | editorial / culture | Figma + Illustrator | Animation · **Graphic design** · Photographic · Experimental |

## The LIVE anchor (pacomepertant.com — `evaluate_script` on the running page)
- **Lenis smooth-scroll** active (the SOTA scroll substrate); 1 WebGL `<canvas>` accent; **19 `will-change`-promoted** elements (compositor discipline).
- The easing vocabulary (from `:root`): **`--ease-expo-out: cubic-bezier(.19,1,.22,1)`** (the snappy-arrival ease) + **`--ease-spring: linear(0,.0014,.0055 …,1.0144 53.43%,…)`** — a spring expressed as a `linear()` stops string.

## The findings (what the SOTA is actually doing)

1. **THE CONVERGENCE — the SOTA spring is a `linear()` stops string, which is EXACTLY glass-ui's `--spring-*` + kf `springTimingFunction({css})`.** The award-winner hand-rolls what glass-ui ships single-sourced (`regen-spring-tokens.mjs` ↔ kf `springLinearStops`). glass-ui is NOT behind on the easing PRIMITIVE — the gap is WIRING it into the liquid choreography (the BB liquid-glass band's exact thesis). `--ease-expo-out` (`cubic-bezier(.19,1,.22,1)`) is the SOTA "arrival" ease — glass-ui should add it as the snappy-fade-in companion to the spring (the open/reveal "quick" leg).
2. **Smooth-scroll + scroll-driven choreography is the SOTA backbone** (Lenis on the live anchor; "Scrolling/Transitions" on every motion winner). glass-ui has `scroll-driven.css` + `useScrollProgress` + the native `scroll()` timeline, but NOT the SOTA scroll-CHOREOGRAPHY (the page-load build → section-cascade → scroll-pinned reveals + the smooth-scroll register). A scroll-motion register is the one SOTA element the liquid-glass band under-covers (W-SUFFUSE3/W-ANIMATE touch it; the SOTA does more).
3. **WebGL/3D as an ACCENT, not the whole page** (1 canvas on the portfolio; Three.js on the motion winners). glass-ui already has the WebGL substrate (aurora/goo-blob) + the W-LENSING refraction direction — the SOTA validates the refraction/depth direction (real glass bends light) within a one-GL-per-route budget.
4. **Microinteractions are a named SOTA technique** (pacome) — the squishy/springy press + hover + magnetic micro-motions the band's W-PRESS-UNIFY + W-LIQUIDHOVER + W-BUTTON-GLASS target. Validated.
5. **Colorful + Icons + Illustration is a recurring SOTA design ELEMENT** (fauna: explicitly "Colorful/Icons/Illustration") — exactly the user's "colorful audacious pops, like in our icons." The band's W-SUFFUSE3 (the IconChip pop + the `:saturated` axis) is on-target; the SOTA says push it (within proportion — the editorial winners stay restrained).
6. **Audacious editorial typography + experimental layout** (sakazuki: Graphic design/Experimental; the luxury register) — validates glass-ui's √φ audacious ladder; the SOTA pairs it with generous negative space + a single bold focal type-event (the W-HIERARCHY2 reading-order + the display-register suffusion).

## The band refinements this LIVE audit drives (fold into the fleet synthesis)
- **W-MOTION-CANON** adds `--ease-expo-out` as the SOTA arrival-ease (the "quick fade-in" companion to the spring) + records the spring-as-`linear()` convergence (glass-ui's approach IS the SOTA — validated, not behind).
- **NEW candidate: W-SCROLL-MOTION** — the SOTA scroll-driven choreography register (the page-load build → section-cascade → scroll-pinned reveals on the native `scroll()`/`view()` timeline + the smooth-scroll register), beyond the current `[data-scroll-reveal]` stagger. The one genuinely-new SOTA element. (≥2 consumers: the demo story pages + a consumer hero.)
- **W-SUFFUSE3** reinforced: the colorful-pops + the audacious-display register are SOTA-validated; push within proportion.
- **W-LENSING + W-LIQUID-REVEAL + the microinteraction waves** are SOTA-validated as the right gaps.

The deep breadth (the remaining SOTD winners + the broader awwwards collections + the formal frontend-design plugin lens over every glass-ui pane) runs as the frontend-design/SOTA-synthesis fleet (after the liquid-glass spec workflow clears — no concurrent opus fleets, the rate floor).
