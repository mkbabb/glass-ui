# Tranche AT — PROGRESS

Execution log for tranche AT (the blob primitives + the WebGL/color transposition +
the dock perfection + the AS-residual fold). Updated at wave boundaries. Plan basis —
`docs/tranches/AT/AT.md`; the W0 deep audit at `audit/W0-L{1..6}`; the W0b augment+harden
round at `audit/W0b-{A1..A6,B1..B6,C1..C6}`; the W1 design slices in `design/`; the close
at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched)
/ TERMINAL-KILL / USER-DOMAIN (cross-repo; name-forward).

## Top-line status

**AT.W0 + AT.W0b (24-lens, two-round deep audit) DONE; AT is plan-first, awaiting impl
authorization.** W0 (6 lenses) authored the plan; W0b (18 lenses — blob/aurora SOTA,
dock perfection [3 frontend-design + 3 SOTA-research], hardening + the value.js color
question) augmented + hardened it and added the dock as a co-headline. The augmented
plan has three braided headlines: (1) the blob lift as a forcing function for the
WebGL-substrate + `/color`-leaf + OKLCh-shader transpositions — sharpened by the W0b
SOTA finding that W5 was under-scoped (the color-space correctness bug + `fwidth` AA +
quadratic `smin` + rotated FBM) and that the extraction is strictly ADDITIVE on
robustness (off-screen-pause + context-restore aurora inherits); (2) perfecting the dock
(functionally sound, but the verification fabric + a11y contract are thin and AQ.W6's
VT-fork left two quiet-wrong motion paths) — folded as file-disjoint W6/W7 slices; (3)
the color answer (runtime-JS already on value.js, CSS tokens stay native, the graph is a
proven DAG — inv-AT-color) + the AS-residual correctness fold. The "stand up a WebGL
harness" premise was REFUTED — `profile-aurora.mjs` already drives headless WebGL2 +
readPixels; AT promotes it to `proof:webgl-golden`. Ships **3.3.0**. 10 waves (W0, W0b,
W1-W8), DEV/IMPL boundary W1|W2.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AT.W0 | Deep 6-lens audit | DEV | **DONE** | `audit/W0-L{1..6}-*.md` |
| AT.W0b | 18-lens augment+harden (blob/aurora SOTA · dock [3 design + 3 research] · color/correctness) | DEV | **DONE** | `audit/W0b-{A1..A6,B1..B6,C1..C6}-*.md` |
| AT.W1 | Design slices — `design/AT.W1-blob-primitives.md` (+§9 shader-quality + DEC-AT-7 space-seam) · `design/AT.W1b-dock.md` · `design/AT.W1c-color-gates.md`. **END OF DEV BOUNDARY.** | DEV (boundary) | **DONE** (authored) |
| AT.W2 | `useWebGLCanvas` (additive off-screen-pause + context-restore) + aurora refactor + `frostShader` delete + `/color` leaf + aurora dither/LUT | IMPL | PLANNED | pixel+sched parity; `proof:webgl-golden`; consumer-#2 usability |
| AT.W3 | Lift watercolor-dot (CSS/SVG) + internalized filter + `prng` leaf | IMPL | PLANNED | `/watercolor-dot` ships; zero-wiring; `proof:blob-value-free` |
| AT.W4 | Lift goo-blob (GAMMA shader) onto W2 + `ColorResolver` seam + demo #2 | IMPL (headline) | PLANNED | inv-K-3 two-tier proof; no-resolver throws; ≥2 met |
| AT.W5 | The shader-quality wave (fwidth AA · quadratic smin · rotated FBM · OKLCh linear-flip + `linearToSrgb` · exact matrices · hue-preserving gamut) | IMPL | PLANNED | 8-assertion CPU-equivalence + `proof:webgl-golden` zero-perturb |
| AT.W6 | Correctness + dock-hardening (`proof:peer-optional`, `proof:vueuse-free-root`+DataTable, peer-matrix, `supportsPostTask` wire, R4/R6, color gates; `proof:strict-templates`, the dock a11y+state test, `proof:dock-motion-parity`) | IMPL | PLANNED | each gate fails-closed; DataTable swap precedes the vueuse gate |
| AT.W7 | Slipped ship + dock clean-break (Fraunces+`proof:font-axes`; overflow→one enum; dock press/hover/spring/rail-indicator + reka-ui Tabs rail; ι doc-rot+`proof:doc-consistency`) | IMPL | PLANNED | inert axes paint; `rg .dock-wrap = 0`; clean sweep |
| AT.W8 | Close — overfitting audit (PROPS tallied) + gates matrix + AT.FINAL (inv-AT-color + §token-tier guard) + 3.3.0 publish | IMPL (LAST) | PLANNED | matrix green; provenance publish |

## Architecture-transposition mapping

| Transposition | AT disposition |
|---|---|
| One `useWebGLCanvas` substrate (additive: off-screen-pause + context-restore) | REAL — W2 (aurora + goo-blob; `frostShader` deleted; pixel+sched parity) |
| `/color` leaf — the runtime-JS color consolidation home | REAL — W2 (`oklchToLinear` + `oklchToGammaRgb`, both value.js-backed) |
| `ColorResolver` first-class inject seam | REAL — W4 (required-inject; `defaultBlobColorResolver` opt-in) |
| The shader-quality wave (fwidth/smin/FBM/OKLCh-linear-OETF) | REAL — W5 (the color-space bug is the headline correctness) |
| aurora dither floor + OKLab palette LUT (the free ride) | REAL — W2b sub-slice |
| `proof:webgl-golden` — promote `profile-aurora.mjs` | REAL — W2/W5 (the harness already exists) |
| reka-ui Tabs for the dock rail | REAL — W6/W7 (APG-Tabs canon; no fourth boilerplate) |
| dock overflow 3-prop → one enum (clean break) | REAL — W7 (`wrap` deleted, 0 consumers) |
| folding aurora into a shared in-shader OKLab path | KILL — aurora bakes per-nucleus, blob per-pixel (the shared primitive is the GLSL fn pair, not the shader) |
| webgpu unification · OffscreenCanvas+Worker · WebGPU aurora | NAME-FORWARD / pre-refuted (SOTA-confirmed wrong for small bg canvases) |

## Cross-tranche posture

AT is glass-ui-internal. Cross-repo (value.js K.W2.5/K.W3 blob consumer rewrite +
`ColorResolver` supply; the π precept pin advance; fourier P5; M-spine) is NAME-FORWARD
under inv-16. The 3.3.0 publish is the constellation unlock (value.js K.W3 consumes the
published blob subpaths). NPM_TOKEN seeded; 3.3.0 rides the AS-repaired `release.yml`.

## Named-forward / watched / terminal

- **Drawer `:native` / `GlassNativeDrawer`** — STRONGEST BOOK (≥2 firm: muster+speedtest);
  the strongest successor seed; held out of AT for blast-radius coherence.
- **dock magnification** (`useDockMagnify` ready) — BOOK, 0 firm consumers.
- **`/deck`** (slides) · **`useGlobalDark({initialValue})`+FOUC** (≥2 speedtest+words) —
  BOOK / fold-if-dark-ergonomics-wave.
- **P5 inner-rounding** — TERMINAL-KILL (user-ruled outer-only).
- **`deriveAurora`/VAL-1** — exits the watch (SHIPPED at AS.W7).
- aurora hue-steering · analytic-noise · OffscreenCanvas+Worker · WebGPU aurora — BOOK /
  pre-refuted.

## Folded-ledger summary

Full disposition: `audit/W0-L4` (47 items) + `audit/W0b-C4/C5` (dock + SOTA). AT-WAVE:
the blob trio + the substrate/`/color`/ColorResolver transposition + the shader-quality
SOTA + the aurora free-ride + the dock hardening + the correctness fold + the color gates
+ Fraunces. KILL: P5, the 4 shipped-DDR rows, shadcn-parity, VAL-9, P7, the shared
in-shader OKLab path. BOOK: Drawer `:native`, dock magnification, `/deck`, dark-ergonomics,
the 1-consumer W-ASKS, the CSS levers, the pilots, the aurora art-direction items.
USER-DOMAIN: value.js K.W2.5/K.W3, the precepts pin, the M-spine.
