# SEED — the deep glass/paper morphism apotheosis (BG WS8–WS11)

The user's second-wave directive (2026-06-26): a DEEPER glass + paper morphism interrogation via the
same 5-step convergence loop, expanding the BG tranche. Four new workstreams. This seed grounds their
research phase. **Constraints (ABSOLUTE):** NEVER move/place any package within `~/Programming`
(the catastrophic park-not-restored failure); NEVER place packages/items in volatile `/tmp/`. The
constellation packages are read **in place, read-only**. Prototype worktrees live in-repo at
`.claude/worktrees/` (the engine's `isolation:'worktree'`), never `/tmp`.

## Reference material (read in place from `/Users/mkbabb/Downloads/New Folder With Items 4/`)

- **`liquid-metal-background-textures-…jpg` ("METAL FLOW")** — flowing, refractive, light-bending
  liquid-metal sheen. The GLASS apotheosis target: real refraction/lensing/displacement, not a flat
  blur+tint. The aesthetic the WebGL2/WebGPU path must reach.
- **Screen recordings** (06-20 ×2, 06-21, 06-22 ×2 `.mov`/`.mp4`) — glass UI in motion (liquid/goo
  transitions, the morphism the CSS/SVG-filter path can't fully reach). The 06-24 pair are the Siri
  refs (WS6). The research fleet extracts frames (to the session scratchpad — disposable JPEGs, NOT
  packages) and reads them.
- **`Screenshot 2026-06-22 at 14.32.01.png`** (vintage French theatrical program) + the other
  screenshots — the PAPER apotheosis target: aged paper grain/grit, letterpress ink, the pencil/print
  texture. IMG_1874/1880(HEIC)/1881/1882, images-2.jpeg — additional refs.

## The constellation paper-morphism APIs (read-only, in place)

- **`@mkbabb/pencil-boil`** (`~/Programming/pencil-boil`) — hand-drawn SVG animation: `mulberry32`
  (PRNG), `wobbleLine`/`wobbleRect`/`wobbleLinePoints`/`perturbPoints`/`catmullRomToBezier`,
  `wobbleDiamond`/`wobbleStarPolygon`/`generateSunRays`, `useLineBoil` (reactive boil frame-loop).
  glass-ui already vendors it for HandMark. The boil/wobble engine for the pencil-like hand voice.
- **`@mkbabb/latex-paper`** (`~/Programming/latex-paper`) — LaTeX→paper data + a **`/theme` base
  paper styles** entry + **`/vue` render/windowing** composables. The paper-rendering substrate; its
  `/theme` is a direct paper-grain/material source to study.
- **`~/Programming/sci-report` tranches (J/K active)** — the handmark-perfection clues the user named.
  Read its active tranche docs for the handmark facility's intended apotheosis.
- Companions: `value.js` (OKLCh/color), `keyframes.js` (spring/keyframe runtime — the typewriter/
  fade-up animation engine for the storybook).

## WS8 — Glass-deep (the apotheosis; the headline, hardest)

The extant glass system (post-WS3) is `--glass-level`(opacity+blur) + `--glass-tint-*`(legibility) +
`--glass-accent`(rim) + the `.glass-lens` SVG `feDisplacementMap` refraction + the unified blur peer.
The GAP: liquid/goo + real refraction are blocked at the CSS/SVG-filter ceiling (no per-pixel
backdrop sampling, no fluid displacement, the Safari `backdrop-filter:url()` bug). The user: liquid/
goo "can be accomplished with WebGL2 or WebGPU — what's a reasonable compromise, leveraging the latest
SOTA supported in Safari, that reaches a lacuna and apotheosis of glass morphism." SCOPE: (a) census
the gaps vs the liquid-metal/recordings reference; (b) the Safari-SOTA tier ladder — what CSS/SVG
reaches, where WebGL2 (Safari 15+) is the floor, where WebGPU (Safari 26+) refines, the graceful
degrade; (c) a real-backdrop-sampling refraction/lensing path (a WebGL2 pass that samples the painted
backdrop behind a glass surface and displaces it — the thing `backdrop-filter` cannot); (d) consistent
component-wide suffusion — ONE glass register every component inherits (not per-surface bespoke).
CONVERGENCE BAR: a fresh capture reads as liquid refractive glass (light-bending, not flat blur) on
Chrome AND Safari, the degrade ladder is graceful, ONE suffused register, the one-GL-budget honored.

## WS9 — Paper-deep (handmark + grain/grit apotheosis)

The extant paper system: `.paper-field`/`.paper-grain-overlay`/`--paper-grain-tooth` (the WS1-retired
metallic field → grain-opt-in) + HandMark (the vendored pencil-boil hand voice). The GAP: the grain is
a static feTurbulence speckle (read metallic); the handmark is not yet perfected (sci-report J/K has
the clues); pencil-boil/latex-paper capabilities are under-leveraged. SCOPE: (a) perfect the HandMark
facility against the sci-report J/K intent; (b) a real paper grain/grit + pencil-like quality
(leverage pencil-boil's boil + latex-paper's `/theme` — study them in place; brainstorm how to improve
the constellation APIs via by-name cross-repo asks, NEVER moving them); (c) consistent paper suffusion
(a paper register every paper surface inherits). CONVERGENCE BAR: the handmark reads hand-drawn; the
grain reads as real paper tooth (not metallic speckle); the pencil qualities (boil, pressure, tooth)
land; suffused consistently; the cross-repo asks (to pencil-boil/latex-paper/sci-report) are formal
by-name contracts (foreign-tree fence — edit ONLY glass-ui).

## WS10 — De-shadcn / idiomatic Tailwind v4

The user: "COMPLETELY abrogate default shadcn or tailwind styles whilst still leveraging those
components (building off them, reka too), with full idiomatic Tailwind v4 usage." SCOPE: census every
shadcn/tailwind-default style still leaking through (the reka primitives' default classes, the shadcn
copy-paste variants, default ring/shadow/radius/color); replace with the glass-ui token-first
idiomatic Tailwind v4 register (`@theme`/`@utility`/`@variant`, the design-token cascade) while KEEPING
the reka/shadcn component SUBSTRATE (behavior/a11y). The deeper, dedicated form of WS4's
`BG.W-DESHADCN-SWEEP`. CONVERGENCE BAR: zero default shadcn/tailwind style survives on a glass-ui
component (gate-asserted); the components are fully glass-ui-identity; reka/shadcn behavior intact;
idiomatic Tailwind v4 throughout; a `proof:de-shadcn` gate locks it.

## WS11 — Storybook facility (scroll/page animation + standardized page API)

The user: better scroll + page animations; a FUNCTIONING progress bar at the top (thicker, glassy,
beautifully integrated — elevates WS1's `BG.W-SCROLL-PROGRESS-RAIL`); sections that typewriter + fade
up (leverage the animation facilities + keyframes.js); proper suffusal; and a STANDARDIZED facility +
component-set API for storybook pages / category pages / component pages / sub-pages. SCOPE: (a) the
glassy thick integrated scroll-progress bar (consuming WS8's glass + the fixed scroll-timeline); (b)
the typewriter + fade-up section-entrance register (compose the shipped `useTypewriter`/`SplitChars`/
`useCountup` + keyframes.js, the W-SCROLL-MOTION `.scroll-cascade` + the D14-fixed columns); (c) the
standardized page-API component set (one `<StoryPage>`/`<CategoryPage>`/`<ComponentPage>`/`<SubPage>`
chassis family with a consistent prop/slot API — supersedes the ad-hoc StoryHero/StorySection/etc.).
CONVERGENCE BAR: the progress bar reads thick+glassy+integrated and tracks scroll (D5 fixed + elevated);
sections typewriter/fade-up on scroll, liquid-weighted; ONE standardized page-API family every demo
page composes; suffused consistently; both modes; PRM-safe.

## Method (the user's 5-step loop, per workstream, to 100%)

research-8 (batches of 3) → synth (cogent spec) → prototype-fleet (greenfield + worktree test-impl,
in-repo `.claude/worktrees/`) → critique-fleet (convergence %) → re-synth → loop. Each workstream's
research reads: this seed, the reference material (frames to scratchpad), the constellation APIs
(in place, read-only), the existing WS3/WS4 converged specs, and the web SOTA (WebGL2/WebGPU glass,
iOS-26 liquid glass, Safari support). Tranche-DEV only — no src landing; the deliverable is the
converged wave spec.
