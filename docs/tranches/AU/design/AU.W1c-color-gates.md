# AU.W1c design slice — the `/color` leaf, inv-AT-color, and the AU gate fleet registry

**Origin:** `docs/tranches/AT/design/AT.W1c-color-gates.md` (the AT.W1c color slice +
hardened gate set), synthesizing `W0b-C3` (color/circularity), `C1`/`C2` (blob/correctness
gates), `A5` (the seam). AU re-issues it as-authored and EXTENDS the gate enumeration to the
full AU fleet (the AT slice predated the dock-design split + the slides-P0 fold).

**HEAD delta @ `8e4cb9f`:** carried whole on the color tier — the `/color` leaf is ABSENT;
`oklchToLinear` exists value.js-backed at `aurora/composables/color.ts:33` (to HOIST);
`oklchToGammaRgb` does not exist (to AUTHOR). Circularity is REFUTED at HEAD (value.js's
published `src/` imports `@mkbabb/glass-ui` ZERO times) and must STAY refuted. The gate
fleet below is ABSENT save the two AT-landed dock/doc gates (`proof:dock-motion-parity`,
`proof:doc-consistency`) + the AU.W0 meta-gate (`proof:au-w0-reground`, landed).

---

## §1 — The three color tiers, three correct engines (inv-AT-color, SETTLED)

glass-ui's color surface is THREE tiers, each with a different correct engine. "Consolidate
all color onto value.js" is tier-scoped: YES for runtime JS, NO for CSS tokens.

| Tier | Where | Engine | AU action |
|---|---|---|---|
| **CSS tokens** | `tokens.css`/`theme.css` — `hsl()`/`oklch()`/`color-mix()`/`light-dark()` | CSS-native (browser-resolved) | **STAYS native** — GUARDED (the `proof:single-color-core` allowlist exempts the token files) |
| **Runtime JS** | aurora/blob/`deriveAurora` | value.js (inv-K-2) | finish — the `/color` leaf is the one home (AU.W5) |
| **GLSL** | aurora.frag / metaball.frag | mirrors value.js's Ottosson math on the GPU | the AU.W7 fn pair |

**Why the CSS tier stays native:** compiling tokens through value.js regresses `light-dark()`
runtime re-resolution, breaks the token-first consumer-override precept, and bloats payload.
`color-mix()` + `oklch()` ARE the 2026 SOTA token engine. inv-AT-color guards this so a
later audit does not "helpfully" move it into JS.

## §2 — The `/color` leaf (AU.W5; DEC-AT-7)

Hoist the value.js-backed core into one shared leaf `@mkbabb/glass-ui/color`
(`src/composables/color/`):

- `oklchToLinear` — HOIST (exists at `aurora/composables/color.ts:33`; relocate + re-point
  aurora's import — NO second impl, a duplicate trips `proof:single-color-core`).
- `oklchToGammaRgb` — AUTHOR new (the blob's gamma exit; does not exist at HEAD).
- `defaultBlobColorResolver` — `(css) => gamma [r,g,b]` via `cssToOklch`→`oklchToGammaRgb`.

"One core" binds the MATH SOURCE (value.js), NOT the return space — the leaf ships BOTH
return spaces; the consumer picks. The published graph is a DAG (value.js's published lib
never imports glass-ui).

## §3 — The AU gate fleet (the registry of record; inv-θ)

Two-tier idiom (P6): a SOURCE-graph gate (the comment-stripped transitive import walker)
BENEATH a DIST-floor gate (a built-artifact grep). Each gate lands its `gates.mjs` entry
GREEN at its greening wave (so CI stays green per wave — inv-27); this table is the
registry-of-record that prevents a gate greening by being absent. Born-state: **RED@HEAD**
(reddens on the unfixed state, greens after the born-green fix lands BEFORE the gate) ·
**born-green-before-gate** (the fix precedes the gate) · **DEV-meta** (a formalization gate).

| Gate | Wave | Tag | Born | Fail-closed spec + bite-check |
|---|---|---|---|---|
| `proof:au-w0-reground` | W0 | local,ci | DEV-meta | **LANDED.** AU.md+PROGRESS.md exist; 3 dock SHAs ancestor-reachable; zero bundle labels; collision re-lettered. Bite: un-tag a ledger row → red. |
| `proof:au-w1-design` | W1 | local,ci | DEV-meta | the 3 design slices exist; each cites AT.W1 origin + HEAD delta; this registry enumerates every fleet gate with a greening wave. Bite: drop a gate row → red. |
| `proof:dock-opacity-lockstep` | W2 | local,ci | born-green-before-gate | a playwright timing probe: `.dock-layer-item-host` opacity + container resize settle ≤1 frame (≤16.7ms). Bite: revert opacity to `--dock-motion-fast` → red (100ms split). |
| `proof:strict-templates` | W3 | local,ci | born-green-before-gate | `checkUnknownProps:true` in all 3 tsconfigs; `<GlassDock bogus-prop>` is a RED typecheck; the real build passes with zero new `@ts-expect-error`. Bite: remove the flag → the fixture greens → gate reddens. |
| `proof:peer-optional` | W3 | local,ci,release | RED@HEAD | a peer P is `peerDependenciesMeta[P].optional===true` IFF P's literal is ABSENT from `dist/glass-ui.js`. Bite: re-add a hard import of an optional peer → red. Greens after the field-shape fix + the dead-field deletion. |
| `proof:vueuse-free-root` | W3 | local,ci | RED@HEAD | two-tier: a SOURCE-graph walk from `src/index.ts` (scanning `.vue <script>`) BENEATH `grep "@vueuse/core" dist/glass-ui.js = 0`. Bite: re-import `useElementSize` into a root-reachable `.vue` → source-tier red. Ordering: the `useResizeObserver` swap precedes greening. |
| `proof:supportsPostTask-wired` | W3 | local,ci | RED@HEAD | the predicate has ≥1 real caller OR is deleted (WIRE-or-DROP — no exported orphan). Bite: an exported `supportsPostTask` with 0 callers → red. |
| `proof:font-axes` | W4 | local,ci | RED@HEAD | REFERENCED(`typography.css` axes) ⊆ DECLARED(`fonts.css` shipped-face axes, incl. the Fraunces face). Bite: reference a WONK axis with the Fraunces face removed → red (an inert axis is a FAILURE). |
| `proof:color-acyclic` | W5 | local,ci,release,sibling | born-green-before-gate | the `/color` leaf imports value.js; value.js's published lib never imports glass-ui; `/color` never back-imports a component. Bite: a glass-ui→value.js→glass-ui cycle → red. |
| `proof:single-color-core` | W5 | local,ci | born-green-before-gate | ONE runtime-JS color source (value.js via the leaf); no 2nd hand-rolled OKLCh/sRGB math in `src/`; the token files are EXEMPTED (allowlist). Bite: a 2nd math source OR a token file routed through value.js → red. |
| `proof:webgl-substrate-single` | W6 | local,ci | born-green-before-gate | pixel-parity AND scheduling-parity for aurora before/after the substrate swap; the consumer-#2 usability assert (a non-aurora quad/DPR mount renders). Bite: hardcode aurora's DPR into the substrate → consumer-#2 assert red. |
| `proof:frostShader-deleted` | W6 | local,ci | RED@HEAD | `test ! -f src/composables/glass/webgl/frostShader.ts` AND no module resolves `glass/webgl/frostShader` (import-graph, NOT a name-grep — `rg frostShader src/ = 0` is born-GREEN at HEAD, REJECTED). Bite: the orphan file survives → red. |
| `proof:webgl-golden` | W6,W7 | local,ci | born-green-before-gate | PROMOTE `profile-aurora.mjs`: a zero-perturb blob render is byte-identical to a checked-in golden (±1 LSB SwiftShader determinism). Bite: a 1-px shader regression → red. |
| `proof:blob-value-free` | W7 | local,ci | born-green-before-gate | two-tier: the source-graph walker over `/goo-blob`+`/watercolor-dot` BENEATH `grep "@mkbabb/value.js" dist/goo-blob.js = 0`. Bite: import value.js into the blob's built path → dist-tier red. |
| `proof:no-value-default` | W7 | local,ci | born-green-before-gate | a no-resolver mount THROWS naming `defaultBlobColorResolver` (NOT a silent gray default — the forbidden form). Bite: replace the throw with a gray return → red. |
| `proof:blob-color-equivalence` | W7 | local,ci | born-green-before-gate | the 8-assertion CPU-equivalence over a textually-parallel TS port (1e-6, asymmetric witness `#3a7bd5`): round-trip · exact-matrix · OETF agreement · full-chain space · out-of-gamut no-hue-drift · perceptual-uniformity witness · radians-unit · premultiply-ordering. Bite 1: the LYGIA convenience matrix → red (~1e-4). Bite 2: remove `linearToSrgb()` → red (too-dark). |
| `proof:blob-space-gamma` | W7 | local,ci | born-green-before-gate | the lift paints GAMMA (no premature linear flip); co-runs with the equivalence gate (the quality stage paints LINEAR + `linearToSrgb()`). The two prove the space is NAMED per stage. Bite: flip the lift to linear without the OETF → red. |
| `proof:dock-a11y-contract` | W8 | local,ci | born-green-before-gate | the behavioural mounted-dock test: `role="tablist"`/`role="tab"`+`aria-selected` (ABSENCE of `aria-pressed`), `aria-controls`→`role="tabpanel"`, roving tabindex (Arrow/Home/End), focus-visible, `keepOpen()/release()`. Bite: restore `aria-pressed` OR remove the roving handler → red. |
| `proof:dock-vocabulary` | W8 | local,ci | born-green-before-gate | three clauses: `useTouchGate`→`useDockTouchGate` (grep-for-absence over a name that EXISTS, not a phantom); `DockTabButton` retired (component+export+CSS-comment refs, live-code-scoped); the dock README exists + enumerates the 4 role names + `useDockTouchGate`. Bite: delete a role name from the README → red. |
| `proof:au-w9-consumers` | W9 | local,ci | born-green-before-gate | a machine-readable tally: each W9 item (prop/subpath/composable) ↦ ≥2 distinct consumer contexts OR a correctness/hygiene tag. Bite: a 1-consumer fold → red (the overfitting bar). |
| `proof:au-final` | W10 | release | DEV-meta | the full matrix green over a clean tree; the overfitting audit zero orphans; `gates:verify-ci` green; FINAL cites a green run id per wave; the 3.3.0 changeset staged + NOT auto-published. |

**Inherited (AT-landed, re-verified on AU's green CI at W10):** `proof:dock-motion-parity`
(`e906448`), `proof:doc-consistency` (`8e4cb9f`).

## §4 — The intra-wave ordering edges

- **W3:** `proof:strict-templates` lands FIRST so the peer-field reshape + the
  `useResizeObserver` swap + every later clean break fail-closed under it. The DataTable
  swap precedes `proof:vueuse-free-root` green (the ONE hard ordering edge); the peer-field
  reshape precedes `proof:peer-optional` green.
- **W5 → W6 → W7:** the `/color` leaf lands before the substrate (aurora's bake consumes the
  leaf) which lands before the blob (the substrate's 2nd consumer). The DEC-AT-7 seam runs
  WITHIN W7 (lift = GAMMA, shader-quality = LINEAR).
- **W8:** the reka-Tabs rail + a11y contract + travelling indicator are ONE atomic pass.

## §5 — inv-AT-color (carried, not re-litigated)

ONE runtime-JS color source (value.js via the `/color` leaf); the CSS token tier STAYS
native (guarded); the GLSL tier mirrors value.js on the GPU; the published graph is a DAG.
"One core" binds the MATH SOURCE, not the return space. AU EXECUTES the leaf; it does not
re-decide the answer.
