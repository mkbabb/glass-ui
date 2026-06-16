# BB — the DEEP-SOTA amendment (Apple + awwwards live + the frontend-design wave → harden/refine/prune/retire)

**USER-DIRECTED 2026-06-16 (the deeper pass).** Folds two completed audits into BB: (1) the DEEP SOTA audit — Apple's own site (the canonical Liquid Glass) + 8 awwwards winners, live via chrome-devtools-mcp, June 2026 (`audit/sota-deep/findings.md`); (2) the full frontend-design plugin wave — the comprehensive pane-by-pane lens (`audit/frontend-design-digest.md`). The lens this round is HARDEN/REFINE + **PRUNE/RETIRE** (glass-ui's own library) and ADOPT/**DEPRECATE** (the SOTA patterns) — not merely additive. Per the user's sequencing, folded AFTER the frontend-design wave (`wl8qytqcv`) completed.

## §0 — The two findings, in one breath

- **The SOTA converges on what glass-ui already owns** (the spring-as-`linear()` + `--ease-expo-out`; the warm material; the audacious type). glass-ui is NOT behind on primitives — it's behind on (a) WIRING them into the liquid choreography (the liquid-glass band), (b) two material/type REFINEMENTS Apple makes that glass-ui dialed past, and (c) DESIGNING the demo presentation to its own standard (the chassis CAN hit SOTA — `foundations/intro` + `display/badge` prove it; the token tours don't).
- **The prune lens matters as much as the build lens:** the SOTA's lesson is FEWER, sharper primitives wired DEEP — so the liquid-glass band's new primitives must RETIRE the bespoke paths they supersede (no dual path), and the half-primitives/dead tokens get cut.

## §1 — HARDEN / REFINE (new waves + refinement-notes)

### New waves
- **W-DISPLAY-TRACKING** — the √φ audacious display ladder gains **proportional negative letter-spacing** (Apple measured: 34px→−0.374px, 80px→−1.2px ≈ **−1.5% of size**) + **tight display line-height** (~1.05, Apple's 84/80). A type-only token refinement on `typography.css` (the display rungs); body/caption untouched. The single highest-leverage type harden — it's why Apple's display reads "designed" and glass-ui's reads "big". Gate: `proof:display-tracking` (the display rungs carry the proportional negative tracking).
- **W-DEEP-GLASS** — the OPT-IN **increased-glassmorphism register** (the user's "iOS 27 increases glassmorphism" + Apple's live `saturate(1.8) blur(20px)` / 14–20px tiers, vs glass-ui's W-GLASS-CAL dial-back to 8–13px). The TENSION reconciled WITHOUT reverting the user's "a hair too much" calm default: a `--glass-depth` axis (a new opt-in tier ABOVE the calm default — `.glass-deep` / a CardTier rung) at the Apple range (deeper blur + lifted saturate + the W-LENSING refraction), for the surfaces that WANT the maximal iOS-27 register (the hero glass, the dock, the CTA), while the content default stays calm. Composes the existing `--glass-level` machinery (no parallel recipe). Gate: `proof:glass-depth`.

### Refinement-notes (fold into the extant band waves — no new wave)
- **W-MOTION-CANON** += `--ease-expo-out: cubic-bezier(.19,1,.22,1)` (the SOTA arrival ease) as the quick-fade-in companion to the spring; record the spring-as-`linear()` convergence (glass-ui's approach IS the SOTA).
- **W-LENSING** — Apple-validated (the refraction depth + the 14–20px material); consumes W-DEEP-GLASS's `--glass-depth` for the deeper register.
- **W-BUTTON-GLASS** += the **BG-2 staging fix** (stage the glass-button demo rows over a LIVE field — the frontend-design wave found buttons demo over a flat opaque plate so the lit-glass fix is invisible) + the W-DEEP-GLASS register on the CTA.
- **W-SUFFUSE3** += the **pop-ENTRANCE reaching the color/badge/icon tours** (the bloom-in on the spring clock — the frontend-design wave found the pops are static; `display/badge` is the model, the color/icon tours must come alive) + the `:saturated` axis.
- **W-HIERARCHY2** += the **buttons CTA-inversion** (the primary-audacious CTA must out-present `destructive` — the frontend-design wave's incongruence) + the per-pane hierarchy gaps.
- **W-SCROLL-MOTION** (authored) += **ADOPT the sticky-pin + IntersectionObserver choreography** (Apple's 19-sticky/54-IO product-reveal — a register beside the native `scroll()` timeline) + the smooth-scroll opt-in.

## §2 — PRUNE / RETIRE (the SOTA-informed cut — a new wave)

- **W-PRUNE-CONSOLIDATE** — the consolidation/retirement wave (the SOTA "fewer sharper primitives" lesson + the no-dual-path discipline):
  - **`popover-animate`** (the fixed-bezier zoom-95 @utility) RETIRES once W-LIQUID-REVEAL's liquid-enter is the top-layer default — no dual enter path (W-LIQUID-REVEAL scopes the re-point; this wave confirms the bespoke @utility is DELETED, not left dormant).
  - **The scattered per-surface CSS `--spring-smooth` press transitions** RETIRE once W-PRESS-UNIFY's `useSpringPress` lands — no dual press path.
  - **The static centered specular `::before` disc** RETIRES once W-LENSING's motion-reactive edge specular lands.
  - **The half-primitive census** (the SOTA's fewer-sharper lesson, cross-ref the overfit ledger + W-DEAD-SWEEP + W-NDA-DECIDE): each substrate-without-≥2-consumers leaf (useSpringPress until W-PRESS-UNIFY wires it; the booked observers) gets a DECIDE verdict (wire-to-≥2 or retire) — never shelf-ware. This wave is the prune-half companion to W-DEAD-SWEEP (dead tokens/gates) — it cuts the SUPERSEDED MECHANISMS the liquid-glass band replaces.
  - Gate: `proof:no-dual-path` (born-RED) — a superseded mechanism (popover-animate / the CSS press / the specular disc) must be ABSENT once its successor wave lands, with the self-test bite. The anti-evasion: a "retired" mechanism still referenced by a live consumer reds.

## §3 — The demo-design pass (the frontend-design wave's headline — a new wave)

- **W-DEMO-DESIGN** — design the demo PRESENTATION to glass-ui's own SOTA standard (the chassis proves it can — `foundations/intro`/`display/badge` are the reference; the token tours are flat spec-sheets):
  - The TYPE pane → a type SPECIMEN (one audacious display-audacious focal word + the graded ladder over a blueprint-grid/paper wash + the activated mega/hero/audacious tiers — the visual-load-bearing-by-activation rule).
  - The COLOR/ICON/radii/shadow/tint token tours → designed specimens (the rainbow ramp + the Pops row PROMOTED to the focal moment + the spring-clock pop-entrance + the calm grid/paper wash + glass-tier hover) — atmosphere without breaking the monochrome-where-correct proportion rule.
  - The INCONGRUENCES: the buttons BG-2 staging + CTA-inversion (→ W-BUTTON-GLASS/W-HIERARCHY2), accordion/collapsible, notification, fourier-studio, motion/reveal — each per the digest.
  - Apply the liquid-glass MOTION to the demo surfaces themselves (the wave found motion "absent" on the demo panes — the pop-entrance, the section-cascade, the press squish on the actual demo chrome).
  - Gate: `proof:demo-design` + the `proof:ba-gestalt` per-pane verdicts (the demo panes join the gestalt roster).

## §4 — ADOPT / DEPRECATE (the SOTA patterns)

**ADOPT** (folded above): the spring-as-`linear()`+expo-out easing · the scroll-choreography (sticky-pin+IO + native timeline + smooth-scroll) · microinteractions everywhere · the tighter display tracking + deeper opt-in glass · the colorful+bold-type pops within proportion.

**DEPRECATE** (the anti-SOTA glass-ui must NOT adopt — recorded as fences in W-MOTION-CANON's doctrine): **scroll-jacking** / hijacked native scroll (a11y/PRM hazard — glass-ui keeps native scroll + the `scroll()` timeline) · **custom-cursor hijacking** (a11y/touch hazard) · **heavy WebGL preloaders / loading curtains** (glass-ui's WebGL is ambient + offscreen-paused, never blocking) · **motion-everywhere jitter** (the proportion rule guards it — big motion for focal moments only).

## §5 — The new-wave set (4) + the fold

New waves authored from this amendment: **W-DISPLAY-TRACKING · W-DEEP-GLASS · W-PRUNE-CONSOLIDATE · W-DEMO-DESIGN** (+ W-SCROLL-MOTION already authored by the frontend-design wave). The refinement-notes (§1) fold into the extant band waves (W-MOTION-CANON/W-LENSING/W-BUTTON-GLASS/W-SUFFUSE3/W-HIERARCHY2/W-SCROLL-MOTION) at execution — recorded here, applied in-wave. These join the LIQUID-GLASS band (Batch L). All compositor-only, PRM-safe, on the per-spring clock, warm-cream identity held, presets-in-consumers, the DEPRECATE fences binding. The per-wave specs follow (the spec-authoring fleet).
