# Tranche AT — PROGRESS

Execution log for tranche AT (the blob primitives + the WebGL/color transposition
+ the AS-residual fold). Updated at wave boundaries. Plan basis — `docs/tranches/
AT/AT.md`; the W0 deep audit at `audit/W0-L{1..6}-*.md`; the W1 design slices in
`design/`; the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD
(watched) / TERMINAL-KILL / USER-DOMAIN (cross-repo; name-forward).

## Top-line status

**AT.W0 (deep 6-lens audit) DONE; AT is plan-first, awaiting impl authorization.**
glass-ui shipped 3.2.0 (AS close) verified sound. The W0 audit (`audit/W0-L{1..6}`,
6 agents in parallel) confirms AS over-claimed nothing, the blob lift is forward
work AS correctly named-forward (not a slipped commitment), and surfaced the
gestalt shape: the lift DRIVES three architectural transpositions (one
`useWebGLCanvas` substrate aurora + goo-blob share with `frostShader.ts` deleted; a
first-class `ColorResolver` inject seam replacing the demo's 1×1-canvas hack + the
inv-K-3 value.js-coupling; the D1 HSV→OKLCh shader), is legal only with a glass-ui
demo story as the binding 2nd consumer (the `deriveAurora` precedent), and rides
alongside the AS-residual correctness fold (the non-standard
`optionalPeerDependencies`; the DataTable `@vueuse` root leak + the missing
`proof:vueuse-free-root` gate; the keyframes `||` peer tested in no context;
`supportsPostTask` 0-callers; the GlassDock 3-prop accretion; the booked dock
binding-guard) + the two slipped ships (Fraunces `@font-face`, the π precept). Ships
as **3.3.0** (additive subpaths → minor). 9 waves (W0-W8), DEV/IMPL boundary W1|W2.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AT.W0 | Deep 6-lens audit | DEV | **DONE** | `audit/W0-L1-changes-adversarial.md` · `W0-L2-plan-vs-reality.md` · `W0-L3-prompt-completeness.md` · `W0-L4-deferred-chronic-ledger.md` · `W0-L5-precepts-architecture.md` · `W0-L6-blob-primitives-design.md` |
| AT.W1 | Design slices — blob-primitives wave spec + the `useWebGLCanvas`/`ColorResolver` transposition + the gate-fleet extension + the GlassDock collapse + the π-precept/ι-sweep. **END OF DEV BOUNDARY.** | DEV (boundary) | **IN-PROGRESS** | `design/AT.W1-blob-primitives.md` (authored); remaining slices folded inline in AT.md §Wave sequence |
| AT.W2 | Substrate transposition — `useWebGLCanvas` + aurora refactor + delete `frostShader.ts` | IMPL | PLANNED | aurora frame-parity; one WebGL setup |
| AT.W3 | Lift watercolor-dot (CSS/SVG) + internalized SVG filter + `prng` leaf | IMPL | PLANNED | `/watercolor-dot` subpath; zero-wiring render |
| AT.W4 | Lift goo-blob (WebGL) onto W2 + `ColorResolver` seam + demo story (#2) | IMPL (headline) | PLANNED | inv-K-3 proof; ≥2 met; off root barrel |
| AT.W5 | D1 OKLCh shader — HSV→OKLCh perturbation + edge-glow retune | IMPL | PLANNED | vitest OKLCh-equivalence + manual visual line |
| AT.W6 | Correctness + gate-fleet fold (`proof:vueuse-free-root`, `proof:peer-optional`, peer-matrix axis, `supportsPostTask` wire, dock binding-guard, R4/R6 hardening) | IMPL | PLANNED | each gate fails-closed; no silent-no-op |
| AT.W7 | Slipped ships + contract (Fraunces `@font-face`+`proof:font-axes`, GlassDock overflow-collapse, control-size vocab, π-precept+ι-sweep) | IMPL | PLANNED | inert axes paint; one overflow enum; clean sweep |
| AT.W8 | Close — overfitting audit + gates matrix + AT.FINAL + 3.3.0 publish | IMPL (LAST) | PLANNED | matrix green; provenance publish |

## Architecture-transposition mapping

| Transposition | AT disposition |
|---|---|
| One `useWebGLCanvas` substrate (vs 3-going-on-4 parallel WebGL setups) | REAL — AT.W2 (aurora + goo-blob consume it; `frostShader.ts` deleted) |
| `ColorResolver` first-class inject seam (vs the seam re-invented 3× divergently) | REAL — AT.W2/W4 (required injected; `defaultBlobColorResolver` opt-in) |
| HSV → OKLCh blob shader (D1) | REAL — AT.W5 (OKLab-everywhere consistency) |
| Shader asset format (`.glsl?raw` vs `.ts` raw-string) | REAL-small — AT.W4 settles on the `.ts` form |
| `proof:vueuse-free-root` (the inv-θ next extension) | REAL — AT.W6 |
| webgpu path unification | NAME-FORWARD — stays separate from `useWebGLCanvas` |

## Cross-tranche posture

AT is glass-ui-internal. Cross-repo (value.js K.W2.5/K.W3 blob consumer rewrite +
`ColorResolver` supply; the π precept pin advance; fourier P5 misdiagnosis
correction; M-spine) are NAME-FORWARD under inv-16 — AT records, does not absorb.
The 3.3.0 publish is the constellation unlock (value.js K.W3 consumes the published
blob subpaths). NPM_TOKEN is seeded; the 3.3.0 tag rides the AS-repaired
`release.yml`.

## Named-forward / watched / terminal

- **Drawer `:native` / `GlassNativeDrawer`** — STRONGEST BOOK (≥2 firm: muster +
  speedtest); a late-AT or successor candidate; held out of the core sequence for
  blast-radius coherence.
- **`/deck` subpath** (slides) — separate future tranche by design.
- **`useGlobalDark({initialValue})` + FOUC primitive** — ≥2 (speedtest+words); fold
  if AT admits the dark-ergonomics wave, else BOOK.
- **P5 inner-rounding** — TERMINAL-KILL (user-ruled outer-only; fourier-side).
- **`deriveAurora`/VAL-1** — exits the watch (SHIPPED at AS.W7; kill did not fire).
- The 1-consumer W-ASKS, the CSS levers, the platform-gated pilots, the
  convergence-watches — BOOK, carried to their converging consumer.

## Folded-ledger summary

Full disposition (47 items, HEAD-verified): `audit/W0-L4-deferred-chronic-ledger.md`.
AT-WAVE: the blob trio + the substrate/ColorResolver transposition + the
vueuse-free-root/packaging/peer-matrix/supportsPostTask/dock-guard/R4-R6 correctness
fold + Fraunces + the overflow-collapse + the control-size vocab + the π/ι fold.
KILL: P5, the 4 shipped-DDR rows, shadcn-parity, VAL-9, P7. BOOK: Drawer `:native`,
`/deck`, dark-ergonomics, the 1-consumer W-ASKS, the CSS levers, the pilots, the
watches. USER-DOMAIN: value.js K.W2.5/K.W3, the precepts pin, the playground fossil,
the M-spine.
