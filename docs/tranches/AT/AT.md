# Tranche AT — the blob primitives + the WebGL/color transposition + the AS-residual fold

AT is glass-ui's post-AS tranche. AS closed the gate-integrity class (inv-θ), took
the modern-web leverage, and shipped 3.2.0 with provenance — verified sound by a
5-probe adversarial pass against the published tarball (`audit/W0-L2`, `AS/audit/
W6-postpublish-verify.md`). AS was clean; AT is **forward work AS correctly
named-forward**, not remediation — plus the handful of AS-residual correctness
debts the W0b/post-publish audits surfaced and the close left for "the next letter."

The headline is the blob-primitive lift the value.js-K cohort has owed a glass-ui
home since the A→F era: **goo-blob** (a WebGL2 metaball renderer) and
**watercolor-dot** (a CSS/SVG border-radius primitive), today living only in
value.js's `demo/@/components/custom/`. But a faithful lift is not a `cp -r`. The
six-lens W0 audit found it is a **gestalt reconciliation that DRIVES three
architectural transpositions** — and the user's standing directive is explicit
that "architectural transpositions in the sake of elegance, simplicity, and
performance above all are both necessary and desirable; NO legacy code":

1. **One WebGL substrate, not a fourth.** glass-ui already runs THREE divergent
   WebGL/shader setups (`aurora/composables/runtime.ts`, `composables/glass/webgl/
   frostShader.ts`, the webgpu path); the lifted `useMetaballRenderer` would be a
   fourth copy of the same compile→link→quad→uniforms→RAF-lifecycle boilerplate
   (`audit/W0-L5 §1`). AT extracts ONE `useWebGLCanvas` substrate that aurora AND
   goo-blob consume, and **deletes `frostShader.ts`** — a zero-consumer,
   non-barrel-exported orphan (`audit/W0-L5 §4.1`).
2. **The color-resolver seam as a first-class primitive (inv-K-3, gestalt).** The
   demo resolves a CSS color to `[0,1] RGB` through a **1×1-canvas `fillStyle`
   probe** (`useMetaballRenderer.ts:44-70`) — DOM-coupled, not SSR-safe, and the
   exact "value.js default" inv-K-3 forbids baking in. But glass-ui ALREADY owns a
   DOM-free value.js-backed resolver (`aurora/composables/color.ts` `cssToOklch`/
   `oklchToLinear`, shipped at AS via R1). AT makes the seam a required injected
   `ColorResolver` `(css) => [r,g,b]` (prop+inject), with glass-ui's
   `defaultBlobColorResolver` as an **opt-in** named export so value.js reach stays
   opt-in — replacing the canvas hack AND the inv-K-3 coupling in one move
   (`audit/W0-L5 §2`, `audit/W0-L6 §3`).
3. **HSV → OKLCh (D1).** The metaball fragment shader perturbs color in HSV
   (`metaball.frag.glsl:93-157` `rgb2hsv`/`hsv2rgb`); AT transposes it to an
   OKLab/OKLCh-L perturbation + edge-glow retune — perceptually uniform, consistent
   with glass-ui's OKLab-everywhere color story.

The lift is **legal only with a glass-ui demo story as the binding 2nd consumer**
— the exact move `deriveAurora` used at AS.W7. watercolor-dot meets the
≥2-distinct-consumer bar decisively (10+ value.js demo sites + the glass-ui story);
goo-blob is THIN (one real value.js consumer, `HeroBlob.vue`), so AT ships the
glass-ui demo and states the motive honestly: the value is the D1 shader + the
inv-K-3 seam + the substrate transposition, not consumer breadth (`audit/W0-L6`,
`audit/W0-L2 §3`).

Riding alongside the headline, AT folds the AS-residual correctness debts the
audit verified at HEAD — the gate-fleet's next inv-θ extension and a clutch of
quiet-wrong paths the W7/W2b changes left — plus the two slipped ships (Fraunces
`@font-face`, the π visual-evidence precept). It ships as a **3.3.0 minor** (the
blob subpaths are additive) through the AS-repaired `release.yml`.

## §The question

Can glass-ui lift goo-blob + watercolor-dot into proper per-subpath chunks
**driving** the three transpositions above (one `useWebGLCanvas` substrate aurora
+ goo-blob share with `frostShader` deleted; a first-class `ColorResolver` inject
seam replacing the demo canvas hack + the inv-K-3 coupling; the D1 OKLCh shader),
shipping the glass-ui demo story as the binding 2nd consumer — WHILE folding the
AS-residual correctness debts the W0 audit verified (the non-standard
`optionalPeerDependencies` that silently makes every peer required; the DataTable
`@vueuse` root-barrel leak + the missing `proof:vueuse-free-root` gate; the
keyframes `||` peer tested in no single context; `supportsPostTask` with zero
callers; the GlassDock `overflow`/`wrap`/`containerName` 3-prop accretion; the
booked-not-built dock binding-verification guard; the R4/R6 quiet-wrong paths) and
the two slipped ships (Fraunces `@font-face`, the π visual-evidence precept) — as a
**3.3.0 minor**, all gates green, no overfitting, no legacy, every cross-repo item
name-forward under inv-16?

## §Success criteria

AT succeeds when:

- **The substrate transposition lands (W2).** One `useWebGLCanvas` (compile→link→
  quad→uniforms + the RAF/visibility/context-loss/reduced-motion/ResizeObserver
  lifecycle harness) is consumed by aurora AND goo-blob; `frostShader.ts` is
  DELETED; aurora's paint is frame-parity-identical to 3.2.0 (the byte-parity gate
  de-risks the refactor).
- **watercolor-dot ships (W3).** `@mkbabb/glass-ui/watercolor-dot` — component +
  `useWatercolorBlob` + an internalized, namespaced, auto-mounted SVG filter (no
  hidden `<defs>` global) + a private `prng` leaf. Renders correctly with ZERO
  consumer wiring (no `tw-animate-css`/`@source`-class trap).
- **goo-blob ships on the seam (W4).** `@mkbabb/glass-ui/goo-blob` consumes the
  W2 substrate; the `ColorResolver` is REQUIRED-injected (no baked default; a
  no-resolver mount throws a dev error); `defaultBlobColorResolver` is an opt-in
  named export matching value.js linear-RGB; `dist/goo-blob.js`'s core path imports
  zero `@mkbabb/value.js`; the glass-ui demo story is consumer #2 (≥2 met); blobs
  are OFF the root barrel and OFF the value.js peer reach.
- **The D1 shader transposes (W5).** HSV→OKLCh perturbation + edge-glow retune,
  gated by a CPU-side vitest OKLCh-equivalence spec (round-trip identity,
  value.js-core match, zero-perturb no-op, in-gamut clamp) + a manual visual
  confirmation line-item (the P5-precedent for what code can't settle).
- **The correctness + gate-fleet fold (W6).** `proof:vueuse-free-root` (the
  inv-θ extension) fails closed on `@vueuse/core` reachable from `dist/glass-ui.js`
  + DataTable fixed; `optionalPeerDependencies`→`peerDependenciesMeta[x].optional`
  + `proof:peer-optional` + CLAUDE.md corrected; the keyframes `[2.2.0, 3.0.0]` CI
  peer-matrix axis; `supportsPostTask` wired into `usePrioritizedTask` (or dropped);
  the dock binding-verification guard built; the R4/R6 quiet paths hardened.
- **The slipped ships + contract (W7).** Fraunces `@font-face` + `proof:font-axes`
  (every axis `typography.css` references is carried by a shipped face); the
  GlassDock `overflow`-model collapse (one enum, `wrap` retired — clean break); the
  control-size vocabulary (Button `icon-sm` + Select `size` as ONE coherent vocab);
  the π visual-evidence precept adopted glass-ui-side (`baseline|close/` + `DELTA.md`)
  + the ι hygiene sweep (the loose captures archived).
- **Gates green + the fold (W8).** Overfitting audit clean; the `gates.mjs`-derived
  matrix green; AT.FINAL; the **3.3.0** minor published through the repaired
  `release.yml` — the constellation unlock (value.js K.W3 consumes the published
  blob subpaths).

## §DEC-AT — the decisions the audit settled

- **DEC-AT-1 — extract `useWebGLCanvas`; delete `frostShader.ts`.** The lift drives
  the substrate unification (aurora + goo-blob consume one harness). Done as its OWN
  wave (W2) ahead of the goo-blob lift, gated by aurora frame-parity — honoring the
  user's "transpositions desirable" while ring-fencing L6's blast-radius caution.
- **DEC-AT-2 — `ColorResolver` is a required injected seam, `defaultBlobColorResolver`
  is opt-in.** glass-ui does NOT bake the demo's canvas resolver; a no-resolver mount
  is a dev error. The default (value.js-backed, opt-in named export) keeps the
  value.js reach off the default graph. inv-K-3 is value.js-tranche-local; glass-ui
  honors the seam SHAPE because token-first + binary-substrate demand it.
- **DEC-AT-3 — watercolor-dot internalizes its SVG filter.** Auto-mounted, namespaced
  `glass-watercolor-filter` (Teleport), so a consumer needs zero `<defs>` wiring.
- **DEC-AT-4 — the D1 shader gates on vitest CPU-equivalence + a manual visual line.**
  glass-ui has no Playwright/WebGL harness (vitest + happy-dom only); the frame-hash
  golden is OPTIONAL stretch, the CPU OKLCh-equivalence (mirroring aurora's OKLab
  gate) is binding.
- **DEC-AT-5 — goo-blob's 2nd consumer is the glass-ui demo story.** Do NOT
  manufacture a speedtest/muster consumer (speedtest doesn't consume value.js;
  muster's blob interest is design-survey only). Motive stated honestly.
- **DEC-AT-6 — blobs OFF the root barrel + OFF the value.js peer.** Subpath-only,
  like `/aurora`; the root barrel stays vueuse-free AND value.js-free.

## §Wave sequence

DAG — W0 first (DONE); W1 (design) after W0; **the DEV/IMPL boundary is W1|W2.**
W2 (substrate) lands before W4 (goo-blob consumes it). W3 (watercolor, light) ∥
W2. W5 (D1 shader) after W4. W6 (correctness) ∥ the blob waves (file-disjoint). W7
after W6. W8 closes + publishes 3.3.0.

| Wave | Title | Phase | Hard gate |
|---|---|---|---|
| **AT.W0** | Deep 6-lens audit (changes-adversarial · plan-vs-reality · prompt-completeness · deferred/chronic ledger · precepts/architecture · blob design) | DEV | DONE — `audit/W0-L{1..6}-*.md` |
| **AT.W1** | Design slices — the blob-primitives wave spec (`design/AT.W1-blob-primitives.md`) · the `useWebGLCanvas`+`ColorResolver` transposition · the gate-fleet extension (`proof:vueuse-free-root`/`proof:peer-optional`/`proof:font-axes`) · the GlassDock overflow-collapse · the π-precept+ι-sweep. **END OF DEV.** | DEV (boundary) | every slice file:line-verified against HEAD |
| **AT.W2** | The substrate transposition — extract `useWebGLCanvas` (compile/link/quad/uniforms + the lifecycle harness); refactor aurora onto it; DELETE `frostShader.ts` | IMPL | aurora frame-parity vs 3.2.0; `frostShader` gone; one WebGL setup; build/tests green |
| **AT.W3** | Lift **watercolor-dot** (CSS/SVG, lightest) — component + `useWatercolorBlob` + internalized namespaced SVG filter + private `src/utils/prng.ts` | IMPL | `/watercolor-dot` subpath + dts; renders zero-wiring; seeded-shape spec; `verify-export-types`+`proof:resolution` |
| **AT.W4** | Lift **goo-blob** (WebGL) onto W2 + the `ColorResolver` seam + the glass-ui demo story (consumer #2) | IMPL (headline) | inv-K-3 proof (no-resolver throws; 0 `@mkbabb/value.js` in `dist/goo-blob.js` core; `defaultBlobColorResolver` matches value.js); ≥2 met; off root barrel |
| **AT.W5** | The **D1 OKLCh shader** — `metaball.frag` HSV→OKLCh perturbation + edge-glow retune | IMPL | vitest OKLCh-equivalence (round-trip · core-match · zero-perturb no-op · gamut clamp) + manual visual confirmation line |
| **AT.W6** | Correctness + gate-fleet fold — `proof:vueuse-free-root` + DataTable fix; `peerDependenciesMeta` + `proof:peer-optional` + CLAUDE.md; keyframes `[2.2.0,3.0.0]` CI axis; `supportsPostTask` wire; the dock binding-guard; R4/R6 hardening; `components.css` Tailwind-version stamp | IMPL | each gate fails-closed on its violation; no silent-no-op regression (the W7 lesson) |
| **AT.W7** | Slipped ships + contract — Fraunces `@font-face` + `proof:font-axes` (+`text-box-trim` companion); GlassDock overflow-collapse (retire `wrap`); control-size vocab (Button `icon-sm` + Select `size`); π-precept adoption + ι hygiene sweep | IMPL | inert axes now paint; one overflow enum; `git status` clean post-sweep |
| **AT.W8** | Close — overfitting audit + `gates.mjs` matrix + `AT.FINAL` + the **3.3.0** publish through `release.yml` | IMPL (LAST) | matrix green; provenance publish; the constellation unlock |

**Wave count: 9 (AT.W0-AT.W8)** — 2 DEVELOPMENT (W0 audit + W1 design) + 7 IMPLEMENTATION. Dev/impl boundary at W1|W2. The blob headline is W2-W5; the AS-residual fold is W6-W7; W8 closes + publishes.

## §Folded ledger — every deferred + chronic item dispositioned

The complete HEAD-verified disposition is `audit/W0-L4-deferred-chronic-ledger.md`
(47 items). Summary:

**AT-WAVE (folded + executed in AT):**
- goo-blob + watercolor-dot + the D1 OKLCh shader + the inv-K-3 seam (W2-W5) — the headline.
- The `useWebGLCanvas` substrate extraction + `frostShader.ts` deletion (W2) — the transposition.
- `proof:vueuse-free-root` gate + the DataTable `@vueuse` fix (W6) — the inv-θ extension.
- `optionalPeerDependencies`→`peerDependenciesMeta` + `proof:peer-optional` (W6) — the packaging-correctness defect.
- keyframes `[2.2.0,3.0.0]` CI peer-matrix axis (W6).
- `supportsPostTask` wire-or-drop (W6).
- The dock binding-verification guard — the W7-booked, never-built test (W6).
- R4 multiplex dev-warn + SSR scope; R6 `anySignal` listener-leak + the `@container` browser-matrix note; `components.css` Tailwind-version stamp (W6).
- Fraunces `@font-face` + `proof:font-axes` (W7) — ≥2 met (words + value.js); the inert WONK/SOFT axes (`typography.css:150`).
- GlassDock `overflow`/`wrap`/`containerName` collapse to one enum (W7) — clean break.
- The control-size vocabulary: Button `icon-sm` + Select `size` as ONE coherent vocab (W7) — they clear the bar TOGETHER, not as 4 isolated 1-consumer patches.
- The π visual-evidence precept adoption (glass-ui side) + the ι hygiene sweep (W7).

**BOOK (carried, ≥2-or-tranche-gated):**
- Drawer `:native` / `GlassNativeDrawer` / `/native-drawer` — the STRONGEST non-headline candidate: ≥2 FIRM (muster `MobileInstrumentSheet` + speedtest mobile sheet), retires the vaul-vue `activeSnapPoint` re-snap bug (AN.W3). Folded into the ledger; a candidate for a late AT wave OR AT's successor if AT admits a 2nd substrate wave — held out of the core sequence to keep AT's blast-radius coherent.
- `@mkbabb/glass-ui/deck` subpath + `--deck-pager-active` (slides) — slides-gated, separate future tranche by design.
- `useGlobalDark({ initialValue })` + the FOUC `darkModeSyncScript()` primitive — ≥2 (speedtest + words); additive; fold IF AT admits the dark-ergonomics wave, else BOOK.
- The 1-consumer W-ASKS (`DockSelectTrigger.clampLabel`, `TooltipContent variant="mono"`, MetricBadge icon) — BOOK until a 2nd site.
- The CSS levers (configurator machined-groove divider, typography-ladder labels) — paid-budget-diff-only; gated on an `index.css` budget rebase (~99.5%).
- The platform-gated pilots (`GlassDialogNative`, `HoverPopover :native`, `GlassNativeSelect`) — graduate at Baseline Widely.
- The convergence-watches (inline-edit, dock panel-host, LabeledSlider) — convergence-gated.
- The residual DDR-AS-RC-2 bundle members not already shipped (speedtest AU-W0-confirmed) — `--spring-crisp`, MetricBadge icon, CompletionSeal family, LabeledField for/id, the 3 a11y asks (decompose against speedtest's AU audit), `useRAFLoop` demandPark, `/styles` critical/deferred split.

**KILL (exit the ledger):**
- **P5 inner-rounding** — user-ruled OUTER-ONLY canonical; `ConfiguratorLayer.vue:98` self-documents it; fourier's inner-rounding ask is a misdiagnosis (`AS/FINAL.md:117`). Glass-ui owns nothing; fourier adjusts on its side (inv-16).
- The 4 already-SHIPPED DDR-AS-RC-2 rows — re-minting is the trap: the 44px coarse floor (`dock.css:1149`), the dock dark rung (`dock.css:673`), AnimatedDigit (public), the timeline marker opt-out (`GlassTimeline.vue:60`).
- shadcn-parity (0 consumers — REJECT); value.js VAL-9 (terminal, keyframes-owned); P7 Mascot.
- `deriveAurora`/VAL-1 — EXITS the watch: it SHIPPED at AS.W7 (`aurora/index.ts:28`); the VAL-1 kill did not fire.

## §Architecture transpositions (the L5 headline)

Full analysis in `audit/W0-L5-precepts-architecture.md`. The three transpositions
(`useWebGLCanvas`, the `ColorResolver` inject contract, `frostShader` deletion) are
the gestalt core of AT — the lift is the FORCING FUNCTION that pays down the
parallel-WebGL-substrate + scattered-color-resolver debt rather than adding to it.
A small companion consistency debt: glass-ui ships shaders as `.ts` raw strings
(`aurora/shaders/aurora.frag.ts`) while the lift source uses `.glsl?raw` — AT
settles on one format (the `.ts` raw-string form, no new Vite asset-type) as part
of W4.

## §Cross-repo perimeter (inv-16)

AT is glass-ui-internal. Every cross-repo item is NAME-FORWARD — AT records, does
not absorb (`audit/W0-L4 §USER-DOMAIN`):
- **value.js K.W3** — the cohort counterpart: delete the demo blob impls and import
  the published `@mkbabb/glass-ui/goo-blob` + `/watercolor-dot`; supply the
  `ColorResolver` (its own color core). BLOCKED until AT publishes the home. value.js
  K.W2.5 (its own `development`-key strip) is still pending.
- **The π visual-evidence precept** — value.js made it a binding close-gate
  (`K.W6-pi-visual-runtime.md`); the shared `docs/precepts` pin advance is USER-DOMAIN.
- **fourier P5** — outer-only ruled; fourier adjusts its ADOPTION-ASK on its side.
- **The 3.3.0 publish** is the single user-domain release leg AT owns; outward-facing → confirm-first.

## §Prompt recap

Every user prompt across the arc is recapitulated + status-verified in
`audit/W0-L3-prompt-completeness.md`. Headline: prompts (1)-(8) ADDRESSED (the
3.2.0 green provenance publish is the keystone proof); the OPEN/PARTIAL residuals
(the blob lift, the π precept, `supportsPostTask`, the DataTable leak, the ι sweep,
Fraunces) are all folded into AT above. The standing security/USER-DOMAIN
constraints (NPM_TOKEN secret-safe, no `--no-verify`, agents read-only on git,
`docs/precepts`+`presentation/` USER-DOMAIN, never delete user files) carry into AT
unchanged.

## §Named-forward / terminal

The BOOK set above carries to whichever wave/tranche sees its converging consumer.
G3 cross-doc-VT, G5/G6/G8, `text-box-trim` (the Fraunces companion in W7), the
platform-gated pilots graduate at Baseline-Widely or a 2nd consumer. The
`useWebGLCanvas` substrate, once extracted (W2), is the named-forward home for any
future WebGL primitive (the webgpu path stays separate). No AT successor is opened
here; Drawer `:native` is the strongest seed for one.

## §Format / process

bbnf tranche format — `docs/tranches/AT/` + hard gates + `FINAL.md`; AT is
plan-first. W0+W1 are DEVELOPMENT (the audit + the design slices; write NO src).
W2-W8 are IMPLEMENTATION — authored now as binding wave specs, they RUN only on
explicit user authorization. The overfitting audit runs at close
(`docs/audits/overfitting-audit.md`). The paired-π visual-evidence protocol applies
to the blob visual waves (W3/W4/W5) — `baseline|close/` + `DELTA.md`, the convention
W7 also adopts into the precepts on the glass-ui side.
