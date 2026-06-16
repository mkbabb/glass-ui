# BB — the DEEP SOTA audit (Apple + awwwards, live, June 2026)

A second, more rigorous liquid-glass pass: **Apple's own site** (the canonical Liquid Glass reference) + a multi-page awwwards design-pattern analysis, driven live in chrome-devtools-mcp. The lens this round is HARDEN/REFINE + **PRUNE/RETIRE** (glass-ui's own library) and ADOPT/**DEPRECATE** (the awwwards patterns) — not merely additive. Captures: `00-apple-home.png`, `01-apple-macbook.png`. Pages live-analyzed: apple.com home + macbook-pro; awwwards winners pacome (deep external) + the-power-of-storytelling · fauna-robotics · sakazuki · serve-robotics · crav-burgers (tech/pattern reads).

## §1 — Apple (apple.com home + macbook-pro, live-inspected)

| signal | measured | the glass-ui read |
|---|---|---|
| glass nav material | `backdrop-filter: saturate(1.8) blur(20px)` (home); 14–20px tiers (product) | Apple **saturates HARDER** (1.8) + blurs **DEEPER** (14–20px) than glass-ui's W-GLASS-CAL dial-back (8–13px). The user's "increase glassmorphism" is SOTA-backed: glass-ui dialed TOO conservative vs Apple. |
| display type | 80px / 600 / **letter-spacing −1.2px** / line-height 84px (1.05); home 34px / −0.374px | tight NEGATIVE tracking ≈ **−1.5% of size** + tight ~1.05 line-height — the signature SOTA display refinement glass-ui's √φ ladder lacks. |
| scroll choreography | **19 `position:sticky`** sections + **54 IntersectionObserver reveals** | the SOTA product-reveal is sticky-PINNED + IO-driven (NOT the native `scroll()` timeline) — a register beyond glass-ui's `[data-scroll-reveal]`. |
| motion stack | NO GSAP/Lenis/Three — **custom**; `--media-gallery-slide-duration:800ms` | Apple rolls its own; the timing is custom-tuned. glass-ui's kf springs are the equivalent owned engine. |
| content visuals | **13 video + 108 `<picture>`, 0 canvas** | Apple uses VIDEO + responsive PICTURE for content, WebGL never — confirms glass-ui's WebGL-is-ambient-only stance. |

## §2 — awwwards SOTA pattern catalogue (8 winners, 3 registers)

- **WebGL-art register** (pacome · the-power-of-storytelling): GSAP + Three.js + Lenis + WebGL; scroll/transitions/3D/microinteractions. The live anchor (pacome): **Lenis smooth-scroll + `--ease-expo-out` cubic-bezier(.19,1,.22,1) + `--ease-spring: linear(…)` + compositor `will-change`**.
- **Modern-stack register** (serve-robotics React+Tailwind+Sanity · fauna Webflow · crav Next.js+GSAP+SVG): microinteractions / interaction-design / storytelling / **colorful / typography** — *no heavy WebGL*. The register most relevant to a Vue+Tailwind library.
- **Editorial register** (sakazuki Figma/Illustrator): graphic-design / photographic / experimental / animation — the audacious-type + negative-space + photographic restraint.
- **THE UNIVERSAL ELEMENTS (every register, every stack):** microinteractions · scroll-transitions/storytelling-choreography · colorful + bold typography · icons/illustration · the spring/expo-out easing. **WebGL/3D is register-specific, NOT universal** — the SOTA's portable core is motion + type + color, which glass-ui already owns the substrate for.

### ADOPT (the SOTA patterns glass-ui should take)
- The **spring-as-`linear()` + `--ease-expo-out` arrival ease** (the convergence — glass-ui owns the primitive; W-MOTION-CANON adds expo-out).
- The **scroll-choreography** (sticky-pin + IO reveals AND native `scroll()` — W-SCROLL-MOTION covers both).
- **Microinteractions everywhere** (the squishy/springy press/hover/drag — the liquid-glass band).
- **Tighter display tracking + deeper glass** (the Apple refinements — §3).
- **Colorful + bold-typography pops** within proportion (W-SUFFUSE3 — SOTA-validated).

### DEPRECATE (the patterns glass-ui should NOT adopt — the anti-SOTA / dated / AI-slop)
- **Scroll-jacking / hijacked native scroll** (Lenis can do it tastefully, but forced-scroll-takeover is dated + an a11y/PRM hazard — glass-ui keeps native scroll + the `scroll()` timeline, never hijacks).
- **Heavy WebGL preloaders + multi-second loading curtains** (the art-register tax — glass-ui's WebGL is ambient + offscreen-paused, never a blocking curtain).
- **Custom-cursor hijacking** (a dated awwwards trope — an a11y/touch hazard; glass-ui keeps the native cursor).
- **Motion-everywhere jitter** (the SOTA reserves big motion for focal moments — glass-ui's proportion rule already guards this; do NOT animate every element).

## §3 — HARDEN / REFINE (glass-ui's own items to strengthen — SOTA-informed)
1. **The glass material — un-dial the blur + lift the saturate** (Apple sat 1.8 / blur 14–20 vs glass-ui 8–13). The W-GLASS-CAL dial-back ("a hair too much") was a USER call — so this is a TENSION to surface, not a blind revert: propose an *opt-in* "deep glass" register (the iOS-27 increased-glassmorphism the user now asks for) at the Apple range, distinct from the calm default. Folds into W-BUTTON-GLASS + W-LENSING.
2. **The display type — proportional negative tracking + tight line-height** on the √φ audacious ladder (the Apple signature). A typography-hardening — a new wave candidate **W-DISPLAY-TRACKING**.
3. **W-LENSING — harden the refraction** (the audit already found the crude `glass-refract.css` — the squircle displacement + the edge-specular are the refinement; Apple validates the depth).
4. **The spring clock — add `--ease-expo-out`** as the arrival companion (W-MOTION-CANON).

## §4 — PRUNE / RETIRE (glass-ui's own items to remove — the SOTA proves them unneeded, OR the band's primitives supersede them)
*(Seed candidates — the synthesis fleet runs the rigorous census cross-referencing the overfit audit + the W-DEAD-SWEEP set.)*
- **`popover-animate` (the fixed-bezier zoom-95)** — SUPERSEDED by W-LIQUID-REVEAL's liquid-enter; retire the bespoke @utility once every overlay rides the reveal recipe (already in W-LIQUID-REVEAL's scope — confirm a clean retire, no dual path).
- **The per-surface CSS `--spring-smooth` press transitions** — SUPERSEDED by W-PRESS-UNIFY's `useSpringPress`; retire the scattered CSS press once the composable lands (no dual path).
- **The static centered specular `::before` disc** — SUPERSEDED by W-LENSING's motion-reactive edge specular; retire the disc.
- **The `.scroll-fade-*` static utilities + `--mask-fade-width`** — already W-DEAD-SWEEP/W-SCROLL-FADE-RETIRE (dead, the retire never landed).
- **The ~32 dead tokens + 3 orphan gate scripts + 24 unmanifested gates** — already W-DEAD-SWEEP.
- **CANDIDATE (fleet to confirm): the duplicate/half-primitives** the overfit audit flags (the substrate-without-≥2-consumers leaves) — the SOTA's lesson is FEWER, sharper primitives wired deep, not more shelf-ware. The synthesis fleet cross-references the overfit ledger + the W-NDA-DECIDE/useSpringPress half-primitive verdicts.

## §5 — The fold (into BB, after the frontend-design wave `wl8qytqcv` completes — the user's sequencing)
The harden/refine/prune/retire SYNTHESIS runs as an opus fleet once `wl8qytqcv` clears (no two opus fleets — the rate floor). It: (a) rigorously dispositions each §3 harden + §4 prune candidate against the overfit ledger + the SOTA; (b) extends the liquid-glass band waves (W-BUTTON-GLASS/W-LENSING/W-MOTION-CANON) with the Apple refinements; (c) mints **W-DISPLAY-TRACKING** + a consolidation/prune wave (the bespoke-path retirements); (d) folds the awwwards ADOPT/DEPRECATE into W-SCROLL-MOTION + W-MOTION-CANON. Then it folds into BB.md/PROGRESS.
