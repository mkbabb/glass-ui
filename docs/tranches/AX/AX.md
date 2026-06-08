# Tranche AX — the dock first-principles rebuild + the aurora/blob graphics unblock + the perfection-and-prune convergence

AX is glass-ui's post-AW tranche. AW shipped 3.4.0→3.6.0 + the batch-1 merges (aurora
W4/6/7/8, blob W9-11, glass-atoms W25-26, band-G W28/W31) onto `at-dock-convergence @ eaba94f`
**WITHOUT a formal close** — the close wave (renumbered W18→W21→W27→W33) never reached, the
gate-fleet is partially hand-registered, and the cardinal failure surfaced: a fleet of green
HEADLESS gates shipped over a **visually-broken live product**. The AX deep audit (32 agents,
read-only, device-instrumented Playwright) confirmed it pixel-level: the live **aurora canvas
renders black**, the live **blob floods its box**, the **dock box shrinks before its items**,
and the **moving specular blows out white** — all under green gates. AX is the corrective
successor: it rebuilds the dock from first principles, unblocks the two graphics surfaces at
their device-proven root, perfects aurora/blob/constellation against LIVE pixels, prunes the
audited orphans, and closes the headless-green/visually-broken gap with a fail-CLOSED visual
lane. **NOTHING is "done" until audited GREEN against the live product** — the cardinal lesson
of AW, the governing precept of AX.

**Plan basis** — `REQUIREMENTS.md` (the §0-§17 master directive ledger), `audit/deep-audit-corpus.json`
(the 32-slice deep audit: per-finding requirement / currentState / rootCause / gestaltFix / severity /
evidence / routesToWave), `audit/W01-aurora-webgpu-blackcanvas.md` (the preserved pixel-level aurora
root-cause), and `audit/converge-digest.md` (the CONVERGE pass: the §16 cross-constellation analysis +
adversarial-hardening over the 10-repo constellation — cross-repo debt, consumer idiom-maximization,
constellation-leverage, the AW-nothing-dropped recap, the precept-alignment slice, and the four
adversarial band-critiques). Every wave below cites the audit slices it folds AND the digest findings it
routes. glass-ui HEAD is `eaba94f` (batch-1 integrated, UNPUBLISHED — audit, do not trust the green
claims), branch `at-dock-convergence`. The published registry line is 3.6.0 — and the constellation
consumers all MEASURED that stale 3.6.0 build (the specular pointer-wiring + VT `.ready`-swallow +
`useGlobalDark({initialValue})` + `deriveAurora` are at HEAD but NOT in what a consumer resolves), so a
real class of "still broken" findings is in fact a PUBLISH-CURRENCY gap, not a code gap — see §4 note 12.

**Format** — mirrors AW/AV (`AX.md` charter + `PROGRESS.md` + per-wave specs under `waves/` +
`FINAL.md`). This file is the CHARTER only — DEV (it writes no `src`). AX is **tranche-development
ONLY**: plan / research / harden / synthesize / write. No merges, no publish, no `src` edits.

**Status — CONVERGED + HARDENED + SOTA-DEEPENED (this pass).** This is the post-CONVERGE charter: the
34-slice deep audit + the 32-agent §16 cross-constellation analysis + the four adversarial band-critiques
are FOLDED, the D5 hardening corrections APPLIED (POS_SCALE §4 note 13, WEBGPU_PARITY §4 note 14,
§15-warp-is-net-new §4 note 15, the W24/W32 double-assignment §4 note 18, the W25/W27 splits + tag-model §4
notes 19-21, the W33 enumerated-dependsOn, the W06 dock.css-split re-ordering, the W28 clean-sibling
gate-0), the published-vs-HEAD corrections applied (§4 note 12 — OKLCh + Card-specular-wiring + VT-swallow +
deriveAurora are LANDED at HEAD; the gap is publish-currency), the per-band precept→wave map authored (§2b),
and the §4 reconciliation appendix completed to 27 notes. **NEW this pass:** the unified liquid-morph
substrate **AX.W42** is added (§1 row + §3 block + §2b map + §5 gating); every SOTA-deepened wave references
its per-wave `waves/AX.Wnn-*.md` §SOTA-deepening (liquid-glass W01-W06/W09/W20/W42, aurora W07/W10-W14, blob
W08/W15-W16); the §20 cross-session hand-offs (USF + keyframes.js) are routed (W09/W06/W21/W33); and the new
**§5 Prototype-and-harden gating** section references `PROTOTYPE-HARDEN.md` + `DOCK-FACILITIES.md` as the
drive-readiness gate. The wave-spec bodies for W00-W43 are authored here AND each carries a full
`waves/AX.Wnn-*.md` doc (FileBounds/Disjointness/Triumvirate/HardGate/Cadence/CommitPlan + §SOTA-deepening);
the per-wave-spec authorship is the NEXT-session driving deliverable. **W43 (the first-class fourier-field
perfection — the §26 / slides-J.W1+J.W9 fold) is the final-consolidation addition: the fourth signature
graphics primitive, its SOTA research DEFERRED-to-mid-tranche so it lands on the W07/W14-settled GPU substrate
(see §7 — the Slides Tranche J coordination).**

---

## §0 — Mandate (governs every wave; verbatim-faithful to REQUIREMENTS §0 + §21)

- **Phase-gated mandate (the §21 transition).** The CONVERGE + HARDEN spec-formation phase — plan /
  research / write, NO merges, NO publish — is the phase this charter was AUTHORED under, and it is now
  COMPLETE. Per REQUIREMENTS §21 (the governing directive), AX now OPENS its autonomous EXECUTION phase:
  end-to-end, one-shot, full-deploy. The two are SEQUENTIAL, not contradictory. The §0b EXECUTION
  MANDATE block below governs the execution phase; every dispatched agent inherits it.
- **30+ waves.** Convergent-loop method per feature: research → plan → harden → synthesize → tranche
  writing, LOOPED until a convergent optimum, prototyping as needed.
- **NO quick solutions, NO workarounds, NO legacy code, NO fallbacks, NO special cases, no effusive
  dynamism, NO nested imports, NO test files in src.** Architectural transpositions for elegance,
  simplicity, and performance are necessary and desirable. This is a development product.
- **Excise or fail explicitly** — every legacy/deprecated/temporary/fallback/fall-through path is
  either deleted or made to fail loudly. No silent/graceful handling unless befitting.
- **DRY. KISS.** No god modules (>500 lines split into cohesive sub-modules). Better encapsulation,
  service boundaries, DI, pipeline orchestration. Colocate components+composables; sub-component dirs
  where befitting. Logical grouping, no contrivance.
- **Idiomatic Tailwind** — localized design-idiom layer that still colocates; no non-idiomatic utility
  soup, no monolithic global stylesheets that should be scoped, no archaic CSS, no fragile
  magic-number/calc/min-max/viewport/z-index chains. Style changes isomorphic unless highly befitting.
- **Lint + typecheck at every interval.** Collaborate with the keyframes.js agent workflow.
- **VISUAL TRUTH — the cardinal gate (the AW lesson).** A wave is **NOT** closed on a green headless
  gate; it closes on a **live Playwright + frontend-design audit** (affordance, hierarchy, spacing,
  padding, NO visual occlusion). Every visual wave's close criterion is an executed live audit, never a
  headless proof alone. AX.W00 stands up the fail-CLOSED visual-runtime (π) lane that makes this
  structural. The π lane is CONSTELLATION-WIDE: keyframes.js's H audit, speedtest's AT real-edge
  validation, and slides' H non-execution each independently re-discovered the SAME headless-green/
  visually-broken gap — it is a constellation failure class, not a glass-ui accident. W00 adopts
  keyframes' named precept verbatim: **"Runtime Truth Beats Source Claims"** (2026-04-29), and its
  corroborators "Read-Only Audits Miss Runtime" / "Visual-Runtime Probe Coverage Stop-Rule" / "Visual
  Load-Bearing-ness Bar" (digest hist:keyframes.js).

**Agent-ceiling.** The REQUIREMENTS literals ("32 research agents", "128 agents", "8+6+6") are
aspirational-throughput phrasing, NOT dispatch counts. The binding dual ceiling holds: **≤6 implementation
agents per wave, ≤7 read-only-audit lanes** (ORCHESTRATION.md §Wave Model). Every per-wave spec under
`waves/` declares its actual ≤6 (or ≤7 read-only) count in §2 State + §4b Worktree Plan, NOT the
REQUIREMENTS literal. The "32-agent" deep audit + converge passes already ran read-only; their output is
this charter.

**Precept-alignment.** Per §17.2, EVERY wave is pursuant + aligned to `docs/precepts/` (submodule pinned
`63240e6`). §2 carries the per-band precept→wave map; each per-wave spec's §Scope/§Archaeology cites the
specific precept it pursues, and each §Hard Gate uses a precept-valid artefact form (build/test/runtime/
diff/deletion — NOT grep-only for runtime behaviour, per SPEC.md §Hard Gates). The named binding precepts:
**no-silent-deferrals**, **substrate-with-consumer / wire-before-retire**, **no-overfitting**,
**one-path / no-legacy-code**, **abrogate-before-patch**, **fail-explicit on library-internal violations**
(browser-API degradation stays befitting-silent — the two are never collapsed), **typed-key + paired DI**,
**no-god-modules**, **test-files-outside-src**, **goal+completion criterion paired at every unit**, **π
visual-runtime lane**, **ι integrity-sweep**, **P-inv-28 zero-deferral close**, **cross-repo coordination
doc when a race surface exists**, and the **canonical-readme-shape** for the research-backed READMEs.

**Cross-repo coordination doc — REQUIRED.** AX has all three triggers for a `coordination/CONSTELLATION.md`
artefact (SPEC.md §Document Set): it authors handoff annexes (W28 speedtest+muster), it tracks a separate
repo (L band slides), and it carries deferred cross-repo handoffs (W35 keyframes.js prune-migration, W34
consumer adoptions). The coordination doc declares each consumer's HEAD + branch + `git status --porcelain`
tree-cleanliness at coordination time, the shared write surfaces, the writer-vs-reader boundaries, and the
conflict-resolution protocol. Adopt bbnf-lang's **sibling-baseline-capture ritual** (snapshot each
sibling's HEAD+status BEFORE any cross-repo edit; reconcile at close) so the chronic dirty-tree wall is a
recorded delta, not a silent stall.

---

## §0b — EXECUTION MANDATE (governs the DRIVE session; REQUIREMENTS §21 verbatim-faithful)

AX is executed END-TO-END, IN ONE SHOT, over a long-horizon multi-compact autonomous session (12+hr
unattended). The user steps away and returns to a COMPLETED session; every agent inherits this frame (§22.6).

**End state (the only acceptable done — three legs, sequential DAG):** (1) glass-ui PUBLISHED to npm at its
most-modern version (the AX cut = **3.8.0**), ALL AX features visually-true (rides W33 + the release.yml
provenance path); (2) slides.friday.institute DEPLOYED to Cloudflare Pages, live-validated (rides W30-W32 +
the merge-to-main → deploy-pages.yml); (3) every ancillary constellation consumer ADOPTED, born-RED consumer
gates GREEN (rides W34/W35, greening only on the published bump). The deploy DAG is sequential: glass-ui
publish → consumer bumps → slides deploy → prod validation. FINAL.md (W33) closes `complete_with_misses`,
NOT `complete`, if any leg is unmet.

**Full authorization (durable, this tranche):** CI, npm publish (release.yml OIDC provenance on tag push),
CF-Pages/deploy, AWS CLI — NOTHING user-gated within AX, no per-action confirmation.

**Operating rules under autonomy** (the autonomous-resilience axis — composes WITH each wave's in-spec
triumvirate trigger; per-wave governs scope, these govern session-level adversity): rate-limit/session-cap →
ScheduleWakeup + resume, never abort; roadblock → tangent gestalt fix (precept-clean, no workaround/legacy),
resume; cross-session clobber → DETECT (fetch origin + compare baseline SHA; check `.git/index.lock` on main
+ each sibling; re-capture each sibling HEAD+branch+porcelain) → orchestrator-owned rebase (agents stay
read-only) → sequence → sleep, never corrupt a sibling (inv-16'); work through compaction.

**Held invariants (remain under full authorization — the Class-4 user-gate set):** NEVER touch
`docs/precepts/` (verify `precepts staged: 0` every commit); NEVER source-embed `wolfpack-ledger-2026`
(gitignored `.env` + GH secret + CF env only); agents NEVER stage/commit/stash/checkout/reset the main index
(orchestrator owns it); inv-16' clean-sibling-only; the hard-prohibited action classes cannot be
agent-performed — if the deploy chain genuinely needs one, surface as a NOW user-gate, never silently.

**Operational readiness — ZERO HARD USER-GATES (probed live 2026-06-08, user-present):** gh authed (mkbabb);
glass-ui release.yml OIDC provenance GREEN (3.6.0/3.7.0 proof) + npm locally authed; git push OK; slides
CF-Pages deploy-pages.yml + all 3 secrets set (CLOUDFLARE_API_TOKEN/CLOUDFLARE_ACCOUNT_ID/VITE_TIL_ACCESS_KEY);
AWS CLI authed (acct 376462297027); keyframes.js 4.1.0 published. No hard user-gate stands between the drive
and the §21 end-state.

See §6 (autonomous-resilience governance) for the per-wave clause + the halt-vs-work-around decision tree +
the cross-session clobber ritual, and the HARDENING.md §F deploy DAG for the end-state acceptance gate.

---

## §1 — SUMMARY (wave → band → severity → one-line)

| Wave | Band | Severity | One-line |
|------|------|----------|----------|
| **AX.W00** | π · gate-philosophy | blocker | Stand up the fail-CLOSED visual-runtime (π) lane — the device render-and-readback workspace every visual wave closes on |
| **AX.W01** | A · DOCK | blocker | Dock single-scalar morph — one analytic spring → `--dock-morph-t` → every axis (box+chrome+children) on ONE clock; retire the VT fork *(SOTA-deepened: `@property`-registered scalar + velocity-continuity retarget — see waves/AX.W01 §SOTA deepening)* |
| **AX.W02** | A · DOCK | blocker | One morph orchestrator per dock — fold the inner DockLayerGroup pair onto the outer collapse driver via DI; clip-reveal aperture everywhere *(SOTA-deepened: the web `GlassEffectContainer`/`provideMorphGroup` one-batched-pass model — see waves/AX.W02 §SOTA deepening)* |
| **AX.W03** | A · DOCK | blocker | keepDockOpen rebuild — `useDockHold(rootRef)` native host listeners (the reka forwarding-drop fix); held as a first-class morph-state input *(SOTA-deepened: `held` as a synchronous morph-state INPUT, not a token race — see waves/AX.W03 §SOTA deepening)* |
| **AX.W04** | A · DOCK | major | Dock overflow/wrap — content-driven intrinsic flex-wrap (kill the magic-640 viewport chain) + card-tier shadow + tokenized radius *(SOTA-deepened: concentric corners + "material thickens when it flexes larger" off `--dock-morph-t` — see waves/AX.W04 §SOTA deepening)* |
| **AX.W05** | A · DOCK | major | One iOS-spring vocabulary — excise the legacy apple-spring bezier; re-point its 5 consumers; spring-pipeline gate truth-up *(SOTA-deepened: adopt the iOS-17+ `(perceptualDuration, bounce)` authoring surface + settle-threshold gate — see waves/AX.W05 §SOTA deepening)* |
| **AX.W06** | A · DOCK | major | Dock storybook consolidation — single `dock` home; DELETE dock-active-tokens (token-ladder); honest rail variant + hoisted polish; dock.css split *(SOTA-deepened: the rail tap-squish IS `.glassEffect(.interactive())` gel-squish; folds the §20 USF-2 DarkModeToggle optical-size sub-finding — see waves/AX.W06 §SOTA deepening + §Consumer hand-off)* |
| **AX.W07** | B · GRAPHICS | blocker | Aurora core unblock — WGSL int-in-float + var<uniform> dynamic-index → f32-cast + storage-buffer; WebGL2-default-until-parity *(SOTA-deepened: the `var<uniform>`→`var<storage,read>` flip is the named canonical dynamic-index fix — see waves/AX.W07 §SOTA deepening)* |
| **AX.W08** | B · GRAPHICS | blocker | Blob core unblock — re-derive uSmoothK as ONE coherent distance regime (un-flood the SDF); restore POS_SCALE on the merge band *(SOTA-deepened: IQ-2024 normalizes smin so `k` IS the max merge-inflation — composed-k flood is the DEFINITIVE root cause, a measurable re-solve not a magic number — see waves/AX.W08 §SOTA deepening)* |
| **AX.W09** | B · GRAPHICS | major | Specular tune-to-subtle — warm-cream low-alpha core + tokenized intensity ladder; retire the dock double-specular; `useSpecularTracking` *(SOTA-deepened: warm-cream low-alpha NEVER pure-white + rim/normal catch-light; folds the §20 USF-1/kf-G-1/kf-G-2 two-consumer specular confirm + wire-or-omit + off-vs-subtle ratify — see waves/AX.W09 §SOTA deepening + §Consumer hand-off)* |
| **AX.W10** | C · AURORA | major | Aurora options converge — ONE atoms door (zones/noise/color control-elements), wire it into the live config UI; delete dead deriveScene *(SOTA-deepened: zones/noise/color → ≤7 atoms is the corpus's exact atom decomposition — see waves/AX.W10 §SOTA deepening)* |
| **AX.W11** | C · AURORA | major | Aurora color seams — OKLCh-derive the catch-light; hoist the palette-ramp twin to the shared chunk; close the wgsl samplePalette gate hole *(SOTA-deepened: the OKLCh core is CONFIRMED-CORRECT — W11 stays SEAM-LEVEL, NOT a redo — see waves/AX.W11 §SOTA deepening + §4 note 7)* |
| **AX.W12** | C · AURORA | major | Mediums substrate — StrokeProfile + paintStrokeLayers extraction + the high-quality painterly noise basis (precondition for the medium waves) *(SOTA-deepened: `StrokeProfile` IS the SBR "stroke = parameter vector" canon + integer-PCG GLSL hash — see waves/AX.W12 §SOTA deepening)* |
| **AX.W13** | C · AURORA | major | First-class van-Gogh + oil-pastel mediums — atomic comma-stroke grammar; split oil-pastel from crayon; OKLab/Kubelka-Munk stroke compositing *(SOTA-deepened: multi-scale coarse-to-fine van-Gogh SBR cascade + named pigment-compositing math — see waves/AX.W13 §SOTA deepening)* |
| **AX.W14** | C · AURORA | major | WebGPU painterly parity — wire the authored Kuwahara/LIC/tensor multi-pass + stable-fluids wake (or excise); device-loss fallback *(SOTA-deepened: anisotropic Kuwahara recipe + the pre-2010 hard-sector pinwheel warning — see waves/AX.W14 §SOTA deepening)* |
| **AX.W15** | D · BLOB | blocker | Blob contained-droplet geometry — solve body/orbit/satellite/smin against the footprint; lit warm-cream default; living membrane edge *(SOTA-deepened: the footprint budget COUNTS the smin band as ONE atomic sum + analytic-gradient smin — see waves/AX.W15 §SOTA deepening)* |
| **AX.W16** | D · BLOB | major | Blob integration + interaction + perf — restore pause/resume seam; demand-gate quiescence; shared-context multi-instance; one var()-unwrap leaf; README *(SOTA-deepened: event-scheduled quiescence with a REAL at-rest predicate is the biggest onscreen lever — see waves/AX.W16 §SOTA deepening)* |
| **AX.W17** | E · CONSTELLATION | major | Constellation port — ship `--constellation-*` light/dark tokens + `drawOverlay` seam; slides adopts; research-backed README |
| **AX.W18** | F · STORYBOOK IA | major | Storybook IA ground-up reinvention — author the new category tree, dock home, dissolve debris bins; re-baseline the three IA gates |
| **AX.W19** | G · PRIMITIVES | major | Primitive prune A — excise header-ribbon + glyph-face + disco-glyph (+ sever the silhouette DI coupling); confirm token-ladder removed |
| **AX.W20** | G · PRIMITIVES | blocker | Primitive fix — native-top-layer hsl-nest fix-or-fold; card toggles meaningful; GlassPanel retire onto `.glass-material` (kill the JS renderer) *(SOTA-deepened: the nested-`hsl()` trap + the no-style-stomping-imperative-filter retire are corpus-ratified; `.glass-material` is the canonical refraction substrate — see waves/AX.W20 §SOTA deepening)* |
| **AX.W21** | G · PRIMITIVES | minor | Primitive recategorize-ledger + barrel coherence — configurator root-barrel reconcile; drawer live-behind disambiguate; use-token-color justify; metric-pill subpath *(folds the §20 hand-offs: kf-G-3 `LabeledField orientation="horizontal"` + label-action slot, kf-G-5 `<DrawerContent spring>`, kf-G-6 cartoon-quiet preset — route to W21)* |
| **AX.W22** | G · PRIMITIVES | major | Font register reconciliation — one brand register (Plus Jakarta + Fira Code), default == rendered, excise dead Fraunces; live-cascade font gate |
| **AX.W23** | H · SLIDERS | blocker | Carousel indicator re-author — dark/light-safe position-dot rail (fix invisible dots + dead scale class); fold AW.W30 carousel restyle; glass-scrubber rename decision |
| **AX.W24** | I · DECK | major | Deck-progress LIBRARY-side — export `/deck-progress` subpath; fix cascade-layer + glow + var-in-arbitrary; register the gate (the slides-side port moves to W32) |
| **AX.W25a** | J · ENCAPSULATION | major | CSS god-module gate-extension — extend `proof:no-god-module` to .css + re-tag CI; lands BORN-RED (tokens/dock/utilities/glass flagged); fix the dist `@source` content-scan deadlink |
| **AX.W25b** | J · ENCAPSULATION | major | CSS monolith carves — tokens.css §-seam partials; utilities.css RELOCATE component-coupled recipes (after the §7/§8 metric-ownership decision); floating-panel dead-chain excise; glass-specular-track rename. glass.css NOT carved for length (single cohesion axis) |
| **AX.W26** | J · ENCAPSULATION | major | TS god-module + state encapsulation — split useMetaballRenderer; dock derived-state → computed; sidebar onto motion/dom primitives; GlassRenderer split; keyboard-registry reactive collection |
| **AX.W27a** | J · ENCAPSULATION | major | Legacy gate-hardening — scrub the 3 barrel refs; promote fail-explicit + no-legacy-commentary to ci+release-parity (the 2 mis-tagged legacy gates ONLY); tag-parity meta-assert at-least-ci; var-in-arbitrary non-emit guard gate |
| **AX.W27b** | J · ENCAPSULATION | major | Legacy commentary full-tree sweep — generalize the gate to src/+scripts/; one-time 878-ref scrub (delete landed-at-X notes; rewrite design-WHY tranche-letter-free); Card stale-prop finalize; scripts/ test boundary |
| **AX.W28** | K · SPEEDTEST | blocker | Speedtest native-first receive — speedtest + muster land native metric-cell/stack + instrument-chassis; born-RED repatriate-local gate |
| **AX.W29** | K · SPEEDTEST | major | glass-ui repatriation-prune — strike the 3 repatriated families + instrument-rail + metric-pill orphans + twin-line-divider; reconcile MIGRATION.md + gates |
| **AX.W30** | L · SLIDES | blocker | Slides baseline — land the H working-tree on a clean branch; fix the constellation light-dark()-into-Canvas2D leak; execute the authored e2e specs |
| **AX.W31** | L · SLIDES | major | Slides content reframe — Slide04 hypothetical/what-if anomaly + $5M figure-clip; lock-affordance; access-modal glass restyle; mobile reflow guards |
| **AX.W32** | L · SLIDES | minor | Slides motion + form adoption — delete local reveal.ts/useCountup.ts → glass-ui vReveal/useCountup; LabeledField error pattern; deploy verification |
| **AX.W33** | M · CLOSE | major | AX close — gate-fleet registration + `proof:ax-final` + README live-currency (π-lane captures) + overfitting audit + inheritance-ledger cross-walk + carry-closure gate + FINAL (LAST, HARD-gated terminal, dependsOn ENUMERATED) *(folds the §20 kf-G-4 verify-landed: `startViewTransition({types})` IS at HEAD — confirm the directional `::view-transition-*` CSS companion ships, then publish-currency)* |
| **AX.W34** | N · CROSS-REPO | major | Cross-constellation analysis + idiom-maximization + consumer-adoption ledger (§16 receiver) — author `coordination/CONSTELLATION.md`; per-consumer idiom census (words/bbnf-buddy/bbnf-playground/value.js/fourier/muster); route each adoption + each newly-surfaced glass-ui debt to its wave |
| **AX.W35** | N · CROSS-REPO | blocker | Primitive-prune consumer-migration DAG — keyframes.js EditorShell off HeaderRibbon + EasingCurveCanvas off GlassPanel; value.js dock/blob/watercolor forks; native-first / migrate-before-prune, born-RED cross-repo gates; sequenced BEFORE W19/W20 publish |
| **AX.W36** | G · PRIMITIVES | major | Forced-colors / Windows-High-Contrast glass-language skin — `@media (forced-colors:active)` so structure survives when the glass evaporates (tier panes → CanvasText, hue dots → bordered glyphs, focus → Highlight); forcedColors π-lane gate |
| **AX.W37** | G · PRIMITIVES | major | Canvas2D lifecycle substrate + text-highlight — `useCanvas2D`/`useCanvasLifecycle` (2D twin of createCanvasLifecycle) + `resolveCanvasColor`; `useTextHighlight` on /motion-core, retire FuzzySearch hand-rolled `<mark>` split |
| **AX.W38** | C · AURORA | major | Aurora-Configurator glass-atoms RESTYLE (dropped AW.W29) — preset-chip glass-tier active state, tap-squish press-spring, transition-control, data-slot sweep; `proof:configurator-glass-atoms`; distinct from W10's functional atoms-wiring |
| **AX.W39** | M · CLOSE | major | Lighthouse perf/a11y audit (demo + slides matrix; dropped AW.W32) — `scripts/lighthouse-demo.mjs` + substrate-aware budget + `proof:lighthouse-demo` ci-gated; remediate the floors over the new IA route matrix |
| **AX.W40** | F · STORYBOOK IA | major | Demo-shell dock-nav + cross-surface coherence re-audit (merged-but-untrusted AW.W28/W31) — rebuild demo nav on GlassDock (sidebar + bottom dock); re-run animation-coherence/DESIGN.md-currency/naming-consistency over the AX-rebuilt surfaces |
| **AX.W41** | N · CROSS-REPO | major | Publisher-side cross-repo build + supplier-edge hardening — the `build:watch` dts-emit arm (the cross-repo dts-freshness keystone, value.js C-DTS root cause); devDep↔peer range-parity gate (keyframes/value); the orphan AW.W27 supplier-edge (keyframes-4 `file:`-link republish handoff + E2 value-0.11 cap); keyframes peer-range-bump export-surface-stability check (the bbnf-buddy `getTimingFunction`-removal cascade) |
| **AX.W42** | A · DOCK / SUBSTRATE | major | The unified liquid-morph substrate — `useLiquidMorph` / `--morph-t` / `MorphGroup` as ONE idiom (the web `GlassEffectContainer`+`glassEffectID` / Motion `LayoutGroup`+`layoutId` transposition); W01's `--dock-morph-t` is the FIRST consumer; ≥2-consumer-at-landing (dock + ≥1 glass primitive); bifurcated self-reshape-vs-route seam; `@supports`-gated lensing fold *(net-new §18.3 substrate, ~70% assembly — see waves/AX.W42 + §5)* |
| **AX.W43** | B/E · GRAPHICS-SUBSTRATES | major | Fourier-field first-class — the J.W1 per-variant intensity BUNDLE (`peakAlpha`/head-glow/`trailFadeExp`) + `intensity` prop (the Aurora `opacityCeiling` seam, DELETE `OUTLINE_PEAK_ALPHA` no-alias; hero≈0.55/final≈0.45 §7.1 targets; age^1.4 trail; zero-alloc loop) + full citizenship (README/api-seat/story/smoke/subpath) + the MID-TRANCHE SOTA research HOOK (orchestrator-driven, DEFERRED to the drive window after the W07/W14 GPU band settles) *(absorbs slides J.W1 + the J.W9 glass-ui-half citizenship — see waves/AX.W43 + §7)* |

**46 waves** (AX.W00…AX.W43, with W25/W27 each split into a/b → W25a·W25b·W27a·W27b; numbering runs
W00…W33 then W34…W43, 44 numbered slots, 46 dispatchable waves counting the two splits). W43 is the
first-class fourier-field perfection added this pass — the §26 / J.W1+J.W9 fold (the fourth signature graphics
primitive joins the first-class set aurora/blob/constellation; its SOTA research is DEFERRED-to-mid-tranche so
it lands on the W07/W14-settled GPU substrate, see §7). W42 is the
unified-morph substrate added this pass — the §18.3 net-new facility the dock single-scalar `--dock-morph-t`
(W01) is the FIRST consumer of. Dependency-ordered, dock-first. The two graphics blockers (aurora-black W07, blob-flood W08) and the dock-desync
(W01) are co-headline; the visual-truth π lane (W00) is the structural precondition every visual wave's
close depends on. W35 (consumer-migration DAG) is a hard predecessor of the W19/W20 prune PUBLISH; W34
(the §16 receiver) is the zero-loss forcing-function that may SPAWN further consumer-adoption sub-waves —
held read-only, tranche-development-only. W41 (publisher-side build + supplier-edge) is the glass-ui-OWNED
cross-repo obligation cohort the consumer-side W34/W35 legs depend on — the dts-watch keystone + the
peer-range coordination every consumer dev-resolves through. W42 (the unified liquid-morph substrate) opens
AFTER W01 lands its single-scalar dock model — W42 GENERALIZES that model into the shared `useLiquidMorph` /
`--morph-t` / `MorphGroup` facility (§18.3 net-new), of which W01's `--dock-morph-t` is the FIRST consumer;
it ships with ≥2 in-repo consumers at landing. **NEW at CONVERGE** vs the prior 42: W41 is the only
genuinely-new wave the *digest* surfaced that no existing wave covered (the `build:watch` dts gap + the
orphan AW.W27 supplier-edge had no home); every other digest NEW-WAVE candidate DEDUP'd onto an existing
wave (see §4 note 22 for the dedup ledger). **NEW this pass** (the §18 liquid-glass directive): W42 is the
net-new unified-morph substrate, added per REQUIREMENTS §18.3 — it is a distinct wave (not a digest
candidate) so the glass-primitive second consumer lands WITH the substrate at one close (the distinct-wave
vs fold-into-W01 ratify is in waves/AX.W42 §Open-Questions + §5).

---

## §2 — The bands

- **π (W00)** — the gate-philosophy foundation. The fail-CLOSED visual-runtime lane that converts every
  downstream "green" into "the real device paints the right image." OPENS FIRST.
- **A · DOCK (W01-W06) + the morph SUBSTRATE (W42)** — the headline. The dock from first principles:
  one-scalar one-clock morph, slider-hold, overflow/wrap, one spring vocabulary, rail/consolidation. Top of
  the tranche per §1. **W42** generalizes the W01 single-scalar dock model into the shared liquid-morph
  substrate (`useLiquidMorph`/`--morph-t`/`MorphGroup`) — the §18.3 net-new facility every UI element morphs
  off; W01's `--dock-morph-t` is its FIRST consumer (opens after the dock band's morph model + spring
  vocabulary settle).
- **B · GRAPHICS BLOCKERS (W07-W09)** — the co-headline. The two device-proven black/flood renders +
  the specular blowout. These unblock everything downstream in C/D.
- **C · AURORA (W10-W14)** — perfection: options converge, color seams, mediums substrate, first-class
  van-Gogh/oil-pastel, WebGPU painterly parity.
- **D · BLOB (W15-W16)** — perfection: contained lit droplet, interaction legibility, integration/perf, README.
- **E · CONSTELLATION (W17)** — abstraction completeness + visibility tokens + README.
- **B/E · FOURIER-FIELD (W43)** — the fourth signature graphics-substrates primitive joins the first-class set
  (aurora W07/W10-W14, blob W08/W15-W16, constellation W17, **fourier-field W43**). The J.W1 per-variant
  intensity model (the Aurora `opacityCeiling` seam) + full citizenship + the MID-TRANCHE SOTA research
  (orchestrator-driven, DEFERRED to the drive window so it lands on the W07/W14-settled GPU substrate, not a
  guess). Absorbs the slides Tranche-J glass-ui arms (§7). Opens after W07/W14 (GPU substrate) + W18 (IA seat).
- **F · STORYBOOK IA (W18, W40)** — ground-up IA reinvention + aurora/blob/dock placement; demo-shell
  dock-nav rebuild + cross-surface animation-coherence/DESIGN.md/naming re-audit (the merged-but-untrusted
  AW.W28/W31 residue).
- **G · PRIMITIVES (W19-W22, W36, W37)** — prune / recategorize / fix / fonts + the forced-colors a11y
  skin + the Canvas2D-lifecycle/text-highlight net-new substrates.
- **H · SLIDERS (W23)** — the carousel-indicator blocker + glass-scrubber decision.
- **I · DECK (W24)** — the deck-progress LIBRARY surface (the slides-side port rides L/W32).
- **C · AURORA (also W38)** — the Aurora-Configurator glass-atoms restyle joins the aurora band.
- **J · ENCAPSULATION (W25a-W27b)** — gate-extension (born-RED) → CSS carves → TS splits → legacy
  gate-hardening → legacy full-tree sweep. The gate-tag MODEL decision precedes W25a + W27a.
- **K · SPEEDTEST (W28-W29)** — repatriation native-first receive + glass-ui prune (the chronic
  muster-block; both speedtest + muster are second walls).
- **L · SLIDES (W30-W32)** — separate repo, coordinated/tracked. Baseline → content → adoption.
- **M · CLOSE (W33, W39)** — gate-fleet, READMEs, overfitting audit, inheritance-ledger cross-walk, carry-
  closure gate, FINAL; + the demo Lighthouse perf/a11y audit.
- **N · CROSS-REPO (W34, W35, W41)** — the §16 cross-constellation analysis + idiom-maximization receiver
  (W34) + the primitive-prune consumer-migration DAG (W35) + the publisher-side build + supplier-edge
  hardening (W41 — glass-ui-OWNED, in-repo: the dts-watch keystone, devDep↔peer parity, the keyframes-4
  republish handoff, the peer-range export-stability check). W34/W35 are separate-repo / coordinated /
  tracked (glass-ui writes no sibling source — it authors annexes; sibling sessions execute); W41 is
  glass-ui's OWN cross-repo obligation cohort the consumer legs resolve through (a real src/package.json
  edit, not an annex).

---

## §2b — Precept → band alignment map

Per §17.2 every band is pursuant to `docs/precepts/` (pinned `63240e6`). The binding precept each band
cites and MUST NOT violate (per-wave specs cite the specific clause + use a precept-valid artefact gate):

| Band | Binding precepts (cite + do-not-violate) |
|------|------------------------------------------|
| **π (W00)** | π visual-runtime lane (SPEC.md §π); fail-explicit on library-internal violations vs befitting-silent browser-API degradation; Gates close on evidence (no grep-only runtime gate); cross-repo π is binding on slides too |
| **A · DOCK (W01-W06, W42)** | one-path / no-legacy-code (collapse the VT-vs-FLIP fork; W42 collapses the per-component-bespoke morph idiom onto ONE substrate); abrogate-before-patch (retire VT fork, re-derive from first principles; W42 re-derives the dock-private FLIP into a shared facility, deletes the value.js fork rather than bridging); typed-key + paired DI (the dock provide/inject collapses onto `createStrictContext`; W42's `MorphGroup` rides `createOptionalContext`); no-god-modules (dock.css split, last in band); substrate-with-consumer (expose `useLayerTransition` on the `/dock` barrel so the value.js fork retires; **W42 ships ONLY with ≥2 in-repo consumers — the dock + ≥1 glass primitive — at landing, gated fail-closed; no-overfitting bars a speculative options surface**); fail-explicit vs befitting-silent (W42's lensing fold fails to the flat-glass tier EXPLICITLY on non-Chromium, never a broken `url()`); π visual-runtime close (the morph reads as one continuous iOS spring on the live device) |
| **B · GRAPHICS (W07-W09)** | one-path (one coherent distance regime; one specular source); fail-explicit (shader-pipeline throws; device-loss is a befitting-silent browser-API fallback); no-overfitting (delete dead deriveScene); π visual-truth close |
| **C · AURORA (W10-W14, W38)** | substrate-with-consumer (the atoms door consumed by the live UI + speedtest E2 as consumer #2); no-overfitting (excise dead deriveScene/painterly-wgsl-or-wire); one-path (single-source shader twins); canonical-readme-shape |
| **D · BLOB (W15-W16)** | one-path (one POS_SCALE regime — see §4 note 13); substrate-with-consumer (restore the pause/resume seam; value.js fork retires onto /goo-blob); fail-explicit vs befitting-silent (PRM freeze stays silent); canonical-readme-shape |
| **E · CONSTELLATION (W17)** | substrate-with-consumer (focal-node + warpTo land WITH slides as consumer #2); no-overfitting (decorative proximity-graph, NOT a data-graph — documented non-goal); one-path (Canvas2D-safe plain-hsl tokens, never light-dark() into canvas); canonical-readme-shape |
| **B/E · FOURIER-FIELD (W43)** | one-path / no-legacy-code (DELETE `OUTLINE_PEAK_ALPHA` — the per-variant intensity bundle + prop, NO compat alias, NO magic-number bump); DRY/KISS (the variant IS the bundle — per-variant peak/head-glow/trail in the preset, not scattered constants); substrate-with-consumer / wire-before-retire (the `intensity` seam lands WITH the slides consume sequenced — J.W2, gated on the AX publish; fourier-analysis = the candidate ≥2nd-external consumer); no-overfitting (the `/prng` subpath stays keep-book until ≥2 EXTERNAL consumers — J.W8; fourier-field imports the single-source, not a fork); canonical-readme-shape (the research-backed README — first-class-citizen parity); no-silent-deferrals (the mid-tranche SOTA research is an ORCHESTRATOR-DRIVEN sequenced drive-window workflow, NOT a punt; the consume/IA-seat/currency each route to a named successor — W32/W18/W33); presets-in-consumers (the hero/final intensity family is library identity; `color`+`intensity` are the consumer's per-deck overrides); π visual-runtime close (the Fourier trace READS as a signature mark on cream + ink) |
| **F · STORYBOOK IA (W18, W40)** | no-overfitting (dissolve debris bins); substrate-with-consumer (dock-nav dogfoods the AX-rebuilt dock); documentation-is-part-of-the-change (re-baseline fixtures LAST) |
| **G · PRIMITIVES (W19-W22, W36, W37)** | wire-before-retire (prune ledger rationale per excision); no-overfitting; one-path / no-legacy-code (Fraunces adjudication; native-top-layer fix-or-fold); substrate-with-consumer (forced-colors ≥2 consumers; useCanvas2D/useTextHighlight ≥2 named consumers); no-silent-deferrals (Fraunces cross-consumer reconcile) |
| **H · SLIDERS (W23)** | one-path (carousel re-author, no dead var-in-arbitrary class); substrate-with-consumer; documentation-is-part-of-the-change |
| **I · DECK (W24)** | substrate-with-consumer (the binary invariant stays UNcleared until W32 lands the slides consumer); one-path (cascade-layer correctness) |
| **J · ENCAPSULATION (W25a-W27b)** | no-god-modules + splits-use-directory-modules; no-legacy-code; gates-close-on-evidence (gate-tag parity); abrogate-before-patch; documentation-is-part-of-the-change |
| **K · SPEEDTEST (W28-W29)** | substrate-with-consumer / wire-before-retire (native-first BEFORE prune; inv-16'); cross-repo coordination doc + sibling-baseline-capture; no-silent-deferrals; binding-doc honesty (MIGRATION.md no-retired-survivor) |
| **L · SLIDES (W30-W32)** | π visual-runtime binding on the consumer repo; cross-repo coordination + clean-branch landing; one-path (Canvas2D plain-hsl); substrate-with-consumer (DeckProgress consumer #2) |
| **M · CLOSE (W33, W39)** | P-inv-28 zero-deferral close (inheritance-ledger cross-walk: ADDRESSED / RETIRES / ARCHIVES — never "deferred to next tranche"); carry-closure gate (bbnf BD-G7 form); ι integrity-sweep + stash-list; π README live-currency; overfitting-audit; canonical-readme-shape |
| **N · CROSS-REPO (W34, W35, W41)** | cross-repo coordination doc + sibling-baseline-capture; substrate-with-consumer / wire-before-retire; no-silent-deferrals (§16.4 zero-loss); chronic-closure meta-invariant (system-gate OR born-RED paired handoff gate — no bare-tag terminal); the keyframes.js-collaboration clause; **cross-repo-dev-resolution contract-v2** (W41: every consumer dev-resolves the built `dist/`, so `build:watch` MUST keep `dist/` fresh INCLUDING dts — the `cross-repo-dev-resolution.md` invariant-30/contract-v2 the dts-watch gap violates); fail-explicit vs befitting-silent (a stale-dist silent-failure class is a library defect, not a befitting degradation) |

---

## §3 — The waves

Each wave: `id` · `title` · `band` · `severity` · `scope` · `foldsFindings` (root-cause + gestalt-fix,
cited by slice) · `dependsOn` · `gate` (proof + the explicit VISUAL-TRUTH live-audit requirement).

---

### AX.W00 — Visual-runtime (π) lane: the fail-CLOSED gate-philosophy foundation
**Band** π · gate-philosophy · **Severity** blocker · **dependsOn** — (FIRST wave)

**Scope.** Stand up a SEPARATE visual-test workspace (a dedicated package/workspace with Playwright +
a headless WebGPU/WebGL device, kept entirely off the zero-dep library publish surface) that runs a
fail-CLOSED π visual-runtime lane. The lane is the close-criterion machinery for every downstream
visual wave: it renders the real component on a real device, reads back pixels, and asserts on the
painted image — converting "the TS port matches the oracle" into "the real device paints the right
picture." This is the structural antidote to the cardinal AW failure (a fleet of green CPU/structure
gates over a black live canvas).

**foldsFindings.** Slice 31 F7 (root: glass-ui carries ZERO browser dep by design, so every gate is a
CPU oracle / static bake / fail-open Playwright SKIP — none catches a dead live render; fix: a separate
fail-CLOSED π workspace). Slice 0 F3, 1 F8, 5 F2 (the dock gates force the FLIP path / sample only the
inner pair / grep one rule — invisible to the default-engine desync). Slice 6 F2, 10 F1, 11 F1, 12 F4
(no substrate renders a real frame). Slice 2 F1, 31 F3 (the only slider-hold guard SKIPs fail-open with
EXIT=0). Slice 31 F2 (the AW.W1 plan misdiagnosed the dock root-cause from a hypothesis, not a live
re-diagnosis — make "live re-diagnosis BEFORE the fix" a wave-open ritual).

**CONVERGE folds (digest).** (a) Cross-constellation corroboration: keyframes.js H gate-blindspot
ROOT-A/ROOT-B (35 green gates over a broken demo; ZERO pixel-diff infra) + speedtest's AT real-edge
Playwright validation (refuted two source-audit findings, surfaced FOUR live latent bugs) + slides' H
"e2e specs authored but NOT executed" — three independent re-discoveries of the cardinal lesson. Adopt
keyframes' named precepts verbatim and reuse its I-1/I-2 instrument design (re-source the SCENES manifest
from source-of-truth; named-region pixel baseline with 3-run anti-flake tolerance) as the π-lane template.
(b) **Gate-feasibility PRE-SOLVE (load-bearing):** keyframes device-proved the dock morph is NOT reliably
live-measurable — 181 rAF `getBoundingClientRect` samples over 1.5s captured NO morph (VT runs on
invisible `::view-transition-*` snapshots; the FLIP SpringProgress clock is internal with no public
handle; the state machine ignores synthetic pointer events + gates collapse behind 2.5s). So
`proof:dock-animation-live` MUST NOT rely on live getBoundingClientRect alone: drive the morph
deterministically (force the readable FLIP arm via a test-flag/PRM; lower collapse-delay; real `page.hover`
not synthetic dispatch) AND/OR expose the SpringProgress clock as a test seam, with a token-peak parse
(`--spring-dock` linear() ramp peak ≤ the published +4.6% (0.32,0.7) baseline) as the trivially-falsifiable
secondary. W00 PRE-SOLVES this, it does not discover it at impl. (c) CLS-witness discipline (speedtest
W-RATCHET): a CLS witness is the Lighthouse-JSON settled-trace OR multi-trial median + a dial-height trace,
NEVER a single buffered-observer shot. (d) The **paired-π BEFORE/AFTER + DELTA.md compare-at-close**
protocol (muster ask) — the π lane captures both states and a delta, not only a single fail-closed
readback. (e) The "live re-diagnosis BEFORE the fix" ritual is recorded in every wave's §Archaeology (the
analogue of AW's dock-misdiagnosis + speedtest's refuted "VT kills the dial CLS").

**gate.** `proof:substrate-paints-color` (readPixels aurora + blob, assert maxChannel>0 over the
interior); `proof:dock-animation-live` promoted from fail-open SKIP to fail-CLOSED in the π workspace (per
the deterministic-drive + token-peak design above); a meta-gate that every `scripts/proof-*.mjs` has a
matching `proof:*` package.json entry. The π lane explicitly ENUMERATES the seven AW PENDING browserVerify
items (aurora W4/W6/W7/W8, blob W9/W10/W11) as named re-probe obligations so none is silently assumed-done.
VISUAL-TRUTH: this wave IS the visual-truth machinery — its acceptance is that a deliberately-broken render
makes the lane go RED.

---

### AX.W01 — Dock single-scalar morph: one spring, one clock, the whole box
**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W00

**Scope.** Collapse the dock morph onto ONE driver that owns the ENTIRE box on ONE clock. Drive the
morph from a single normalized analytic-spring scalar (0→1) written once per frame to a CSS custom
property on the `.glass-dock` root (`--dock-morph-t`); express EVERY animated axis — width/inline-size,
padding, border-radius, scale, background/border color, AND the child stagger — as pure
`calc()`/interpolation off that one scalar. No CSS `transition` on the root; no separate inner-vs-root
clocks; no per-engine personality fork. **RETIRE the View-Transitions fork for the dock entirely** (VT
crossfades rasterized pixels — the wrong primitive for a layout morph, and the source of the
uncaptured-animating-ancestor desync). Keep the clip-reveal aperture (content laid out once at natural
size, the box uncovers it). Re-derive `useLayerTransition` from first principles (479 → ~130 lines).

**foldsFindings.** Slice 0 F0/F1/F2 (root: NO single authority for the outer box — root padding/radius
on synchronous CSS-class-flip transitions vs inner width on a JS spring deferred a full frame behind via
nextTick→rAF→reflow → box leads content by ~16ms; fix: one spring → `--dock-morph-t` → every axis in the
same paint). Slice 1 F0/F1/F5 (root: THREE+ overlapping morph authorities; the in-step
`--dock-morph-progress` stagger + clip aperture run ONLY on the FLIP fallback nobody hits; fix: delete
the VT fork, one live SpringProgress on every engine). Slice 5 F0/F1 (root: only `.dock-layers` is
VT-named so the root chrome morphs on a separate clock, AND the child stagger never arms on VT, AND the
collapse curve forks to `--spring-snappy@0.2s`; fix: one authored motion, identical on every engine).
Slice 1 F3 + 5 F0 (root: the live ODE + velocity-continuity interrupt live only on the FLIP path; fix:
the live spring runs universally — iOS interruptible physics for free). Historical anchor: git `e8380d7`
had a correct 135-line single-clock impl; the regression is pure accretion (AQ.W6→AU.W8→AV.W9→AW.W2/W3).

**CONVERGE folds (digest).** (a) **CROSS-REPO CONTRACT — blocker (fourier).** "RETIRE the VT fork for the
dock entirely" must NOT remove the per-instance `view-transition-name` (`glass-dock-${useId()}`) seam +
the `proof:vt-names` gate that fourier's J+K critical path route-morphs through. Fourier names the dock for
the PAGE/route transition (viz↔workspace geometry-morph), NOT for the dock's own collapse — these are
SEPARABLE concerns the charter conflated. Per the W00 wave-open ritual, LIVE re-diagnose whether the
dock-COLLAPSE VT and the consumer ROUTE-MORPH VT are the same machinery. W01 retires the COLLAPSE VT fork
(the wrong primitive for a layout morph) while PRESERVING the named-element route-morph seam; if the name
truly must die, an inv-16'-style cross-repo annex coordinates fourier's K.W1 + e2e onto the replacement
with a born-RED fourier-side gate. The fourier two-co-mounted-docks VT-name collision
(CanvasControlsDock + EditorControlsDock both mint `glass-dock-1` → duplicate name DROPS the morph
snapshot + reds ~13 e2e) is the concrete corroborating witness that VT is the wrong primitive for the
layout morph — add it to the W00 π-lane / W01 live-audit regression fixtures. (b) Add a Dependencies/
Disjointness clause naming fourier as a downstream consumer of the dock view-transition-name. (c) Expose
the rebuilt single-scalar `useLayerTransition` primitive on the `/dock` subpath barrel (`export {
useLayerTransition } from "./composables"`) so value.js DELETES its local FLIP-width fork (the exact
box-leads-content algorithm) — the fork exists only because the barrel never re-exported the primitive
(substrate-with-consumer). (d) The single-scalar morph must COMPOSE with the published (0.32,0.7)
`--spring-dock` (no re-bounce); cite keyframes' a-historical-dock git archaeology (single-clock high-water
`e82633e`/`e8380d7` + the AQ.W6→AW accretion). (e) Note the keyframes.js LIGHT-barrel `flip()` trigger for
the rebuilt `useLayerTransition` (avoid a third hand-roll).

**gate.** π-lane `proof:dock-animation-live` (fail-CLOSED, DEFAULT engine, per the W00 deterministic-drive
design): sample the dock-root box geometry (padding-inline + border-radius + bounding width) AND a
representative child's opacity/transform on the SAME rAF timeline; assert morph onsets in the SAME frame
(lead/lag ≤ 1 frame); token-peak parse of `--spring-dock` as the flake-free secondary. A `proof:vt-names`
preservation assertion (the route-morph named-element seam survives the collapse-fork retirement).
VISUAL-TRUTH: a frontend-design screenshot-diff across the morph + a live audit that it "reads as one
continuous iOS spring" + the fourier two-dock co-mount renders both route-morphs — the wave does NOT close
on the numeric gate alone.

---

### AX.W02 — One morph orchestrator per dock: fold the inner layer-group onto the outer driver
**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W01

**Scope.** Model the dock as a single stack whose active "layer" is (expandedState × activePane). The
outer collapsed↔expanded swap is just another layer transition in the SAME group as the inner pane
swaps — ONE spring, one scalar, measured once. The nested `DockLayerGroup` must NOT instantiate its own
morph engine when nested in a collapsible dock — it defers to the dock's orchestrator via provide/inject
(the same DI pattern `dockContext` already uses). Unify the two state vocabularies (`.dock-layer` outer
/ `.dock-layer-item-host` inner) onto ONE (`.is-active`/`.is-leaving`) so the crossfade + stagger
contract is written ONCE; express the stagger onset as a single `--dock-stagger-step` token × child
index (retire the hand-typed 0.08/0.16/… ladder).

**foldsFindings.** Slice 1 F2 (root: two `useLayerTransition` instances per dock — outer on `.dock-layers`,
inner on `.dock-layer-stack` — each independently forks VT vs FLIP; a simultaneous collapse+layer-swap
double-animates the same pixels with no coordination; fix: one morph orchestrator per dock instance, not
per layer-pair). Slice 1 F7 (root: the doubled state vocabulary kept in sync by a greppable comment + the
magic nth-child onset fractions; fix: one vocabulary, one stagger-step token).

**CONVERGE folds (digest).** Demand-side proof — bbnf-buddy ABANDONED `DockLayerGroup` entirely for both
editor docks (BottomDock raw `<Transition mode="out-in">`; LeftToolsDock plain `v-if`), citing "its inner
grid chain was the source of the vertical overflow fight" and "DockLayerGroup buys nothing". This is the
live consumer diagnosis the wave needs. Make "a vertical-overflow consumer can use DockLayerGroup without
abandoning it" a W02 close criterion; after the single-clock orchestrator + inert/FLIP `DockLayerGroup`
land, bbnf-buddy re-adopts it and deletes its `.dock-layer-*` keyframes + `v-if`/`<Transition>` swaps (the
adoption leg routes to W34).

**gate.** π-lane assertion that a simultaneous collapse+pane-swap settles on ONE timeline (no
double-animation); a regression fixture mounting a vertical DockLayerGroup with overflowing content that
does NOT fight max-height. VISUAL-TRUTH: live audit of the nested-layer-group dock through a
collapse-while-switching gesture.

---

### AX.W03 — keepDockOpen rebuild: the host-native hold, held as first-class morph state
**Band** A · DOCK · **Severity** blocker · **dependsOn** AX.W01

**Scope.** Fix the dock-with-slider hold from its device-proven root: the `@pointerdown`/`@touchstart`
listeners sit on reka-ui's `<SliderRoot>` forwarding component and are DROPPED across the Slot/forwardRef
boundary (the binding-verification class — vue-tsc + units pass, only e2e catches). Stop fighting the
forwarding boundary: a tiny `useDockHold(rootRef)` composable (colocated under `dock/composables/`)
attaches native `addEventListener('pointerdown'|'touchstart')` on the slider's resolved host element
(proven to fire), keeps the window-scoped pointerup/pointercancel release, and owns acquire/release +
touch wiring once. Make `held` a FIRST-CLASS input to the single morph state machine (not a side-channel
token race against the morph's `data-held` writes) — subscribe to the dock state, so there is no
orphan-able async listener and no attribute write-race.

**foldsFindings.** Slice 2 F0 (root, LIVE-PROVEN: the listener-on-a-forwarding-component drop — the
contract has NEVER worked through a real reka drag; the dock CSS `.glass-dock[data-held]` is already
correct, only the token is never acquired; fix: native host listeners via `useDockHold`). Slice 2 F2
(touch parity broken by the same drop + a redundant parallel touchGate watch; fix: fold into `useDockHold`).
Slice 1 F4 (root: keepDockOpen is a ref-counted token across an orphan-able async window listener that
races the morph driver; fix: held as a synchronous reactive edge into the one morph state). CAVEAT: this
must re-seat onto the W01/W02 collapse-machinery rebuild — coordinate so the hold is not re-broken.

**gate.** A headless @vue/test-utils + jsdom MOUNT test that bites in CI: mount
`<GlassDock><Slider/></GlassDock>`, dispatch a real pointerdown on the slider host, assert the dock
context's `keepOpen()` fired / the root carries `data-held` (FAILS today, passes after the fix). VISUAL-TRUTH:
π-lane Playwright confirms the halo + substrate tier-shade paint through a real drag past the collapse delay.

---

### AX.W04 — Dock overflow/wrap: content-driven reflow, card-tier shadow, tokenized radius
**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01

**Scope.** Re-express `overflow="wrap"` as an intrinsic content-driven reflow, not a viewport toggle.
Make `flex-wrap: wrap` ALWAYS-ON and cap the dock inline-size at `min(max-content, --dock-max-inline-size
or the viewport gutter)` so flex wraps to N rows exactly when the row exceeds the cap — at ANY width.
DELETE the `@media (min-width: 640px)` snap-back block and the `--dock-overflow-bp` token. Lift the
wrapped (and big-dock `shape=card`) silhouette to the card/floating shadow tier (a `--shadow-dock-wrap`
token on the cascade, transitioning on the same `--dock-motion-resize` spring the radius glides on).
Unify the multi-row radius onto `--dock-card-radius` (kill the 16px-vs-24px `--radius-2xl` divergence).
Restrict wrap to horizontal docks + fail loud on vertical (strike the false vertical-wrap claim), and
either implement vertical wrap or correct the docs. Add a **vertical-dock max-height/overflow contract** —
vertical `GlassDock` is `height:auto` with NO max-height contract today, forcing consumers (bbnf-buddy
ToolsLayer) to hand-anchor max-height to the viewport; ship the contract so they don't. Author a real
`overflow="wrap"` demo section.

**CORRECTION — "ZERO consumer at HEAD" is FALSE (digest hist:bbnf-lang).** bbnf-playground
(`ControlsBar.vue:33`) is a LIVE consumer: `<GlassDock :collapse-delay=2000 :start-collapsed=true
:fit-content=true :wrap=true>`. The `:wrap` boolean is the PRE-RENAME API the AT.W7 clean break renamed to
`overflow="wrap"`. So the wrap surface HAS a consumer, and the rename is a binding-verification-class break
(stale prop silently no-ops; vue-tsc+units miss it). bbnf-buddy BottomDock additionally works around the
broken wrap with hand-rolled horizontal-scroll + a `mask-image` edge-fade (rationale: wrapping "pushed the
dock tall enough to cover a large chunk of the canvas") and overrides the corner with a bare `--radius-2xl`
— direct field confirmation of the F0/F4 root causes. Fold: a prop-migration note (re-point
bbnf-playground `:wrap`→`overflow="wrap"`; verify `:fit-content`/`:start-collapsed`/`:collapse-delay`
survive the W01-W06 rebuild) routed through the W03/W00 binding-verification e2e sweep; the bbnf-buddy
scroll/mask + `--radius-2xl` workaround deletions route to W34.

**foldsFindings.** Slice 3 F0 (root, LIVE: wrap is a viewport `@media` toggle not a content strategy — a
40-btn dock @800px = 1861px wide single nowrap row; inherited mobile-responsive debt the AT.W7 "clean
break" renamed but preserved; fix: content-driven intrinsic flex-wrap, delete the magic-640 chain). Slice
3 F1 (root: the flat thin-pill `--shadow-dock` glow on a tall multi-row card; fix: route the
finite-silhouette through the floating-tier stack). Slice 3 F4 (root: bare `--radius-2xl` hardcode
divergent from `--dock-card-radius`; fix: one finite-radius token). Slice 3 F5 (root: silent no-op on
vertical rails despite a docs claim; fix: horizontal-only + fail loud or implement). Slice 3 F2/F3 +
4 F4 (root: ZERO story + a false `proof:dock-layering-polish` wrap-reflow claim the gate never asserts;
fix: real demo + strike-or-prove the claim).

**gate.** A wrap-reflow detector that samples min-height over ≥3 spring frames (or, once content-driven,
strike the false claim). VISUAL-TRUTH: a live frontend-design pass on the wrap section (row spacing, card
grounding, corner masking) at multiple widths — the wave's close criterion.

---

### AX.W05 — One iOS-spring vocabulary: excise the legacy apple-spring bezier
**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01

**Scope.** Excise the predecessor cubic-bezier `--ease-apple-spring`/`--motion-ease-apple-spring`
(~+27.5% overshoot) entirely per the no-legacy mandate and re-point its 5 consumers (Slider, BouncyToggle,
UnderlineTabs, ContinuousMarkers, ProgressSectioned) onto the appropriate `--spring-*` linear() register.
Establish a SMALL governed iOS-spring vocabulary from the regen pipeline (settle / control / playful) and
document which surface-class uses which — the dock and everything inside it (its keepDockOpen Slider
thumb) share the dock register (currently the slider springs on `--spring-snappy`, a different curve than
the dock it lives in). Truth-up the spring pipeline: widen the comment-sync gate to every file quoting a
dock-spring number (the parity gate carries stale `(0.5,0.5)/+18.5%` prose); add a consumer-coverage
assertion so the generator cannot mint a dead `--spring-*` preset (overfitting census on all five).

**foldsFindings.** Slice 5 F4 (root: two parallel spring vocabularies — the regen `--spring-*` cohort +
the legacy apple-spring bezier the allow-list tolerates; no single iOS-spring source; the dock-and-slider
running different curves is the concrete symptom; fix: excise the bezier, govern one register). Slice 5
F3 (root: the comment-sync gate's file set is too narrow + the build-time linear() vs runtime integrator
"bit-identical" claim is asserted only at the input-param level; fix: import the constant, render the
overshoot at runtime — no hand-typed number to rot). Slice 5 F5 (root: the generator mints tokens with no
consumer-coverage gate; fix: overfitting census + fail-closed on zero consumers).

**CONVERGE folds (digest).** **EXTERNAL consumer enumeration (speedtest).** The excision currently names
only 5 INTERNAL glass-ui consumers; speedtest inherits `--ease-apple-spring` from glass-ui's tokens.css at
4 EXTERNAL sites (MeterColumn.vue:291-292 transform/width, SpeedtestResults.vue:842). Deleting the token
leaves `var(--ease-apple-spring)` resolving empty → the dial-out/complete-morph transitions degrade to
instant/linear with NO error (silent clean-break breakage). Either re-point speedtest's 4 sites onto the
governed `--spring-*` register as part of the clean break (the MeterColumn comment already documents
apple-spring as the intended "departure" curve → map to the settle/control register), routed through W34;
OR gate the excision behind the speedtest consumer-adoption PR. Add a no-`--ease-apple-spring`-in-consumers
sweep to the W05 gate. Pin the governed "dock register" to the published ~+4.6% (0.32,0.7) `--spring-dock`
curve keyframes live-measures as the system-dock baseline.

**gate.** `proof:spring-tokens-synced` widened; a consumer-coverage assertion on `--spring-*`; a
no-bezier-spring sweep; a no-`--ease-apple-spring`-survivor sweep (library + a constellation-consumer
census). VISUAL-TRUTH: live audit that the slider-in-dock and dock breathe on the same spring.

---

### AX.W06 — Dock storybook consolidation + honest rail + dock.css split
**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01, AX.W04

**Scope.** Establish `navigation/dock` (or a first-class `dock` category) as the SINGLE dock home: fold
the keepDockOpen proof in as a "Slider in dock" section (retire `compositions/dock-with-slider`), add the
`overflow="wrap"` section (W04), and **DELETE `demo/stories/foundations/dock-active-tokens.vue`** — the
byte-for-byte token-ladder the AV restructure RENAMED (not removed) from `/dock/icon-button-token-ladder`.
Make the rail variant honest: type-narrow away the inapplicable collapse/startCollapsed/#collapsed
surface under `variant="rail"`, and HOIST the polished active-item/tap-squish/tooltip treatment already
proven in demo `SidebarDock.vue` into the variant's CSS so consumers get the refined rail (not just the
demo re-deriving a worse one). Disambiguate "Dock Rail" vs "Instrument Rail" (the latter dissolves if W28/W29
retire instrument-chassis). Split `dock.css` (1227 lines) into `src/styles/dock/` cohesive partials
(shell / layers / layer-group / overflow), deleting every retired-arm tombstone comment — **AS the churn
settles, LAST in the dock band** (after the W01 morph rewrite + W04 wrap rewrite land, so the partials
carve the FINAL model not mid-churn debris). The prior "BEFORE the churn settles" wording was BACKWARDS
(corrected per digest harden:dock-graphics + slice 1 F6 / 25 F2 — a pre-churn split guarantees three-way
merge conflicts across the whole dock band). W06's dependsOn is therefore AX.W01 + AX.W04 (the dock.css
writers it must follow).

**foldsFindings.** Slice 4 F0 (root: the token-ladder was RENAMED with `| 0` content delta, still
shipping; fix: DELETE outright). Slice 4 F1 (root: dock-PRIMARY content scattered into foundations/ +
compositions/; the six incidental-host stories are correct-as-is; fix: one dock home, do not touch the
incidental hosts). Slice 4 F2 (root: the rail is a half-inapplicable variant flag, not a designed
surface; the demo re-derives a worse rail than the chrome dogfoods; fix: scope the surface honest + hoist
the chrome polish). Slice 4 F3 (root: two unrelated "Rail" surfaces; fix: disambiguate or dissolve via
W28/W29). Slice 15 F1, 16 F2 (the dock-home grouping + token-ladder confirm). Slice 25 F2 / 27 F0 (the
dock.css split, sequenced before/with the §1 rewrite).

**CONVERGE folds (digest).** (a) Document the dock-as-portal-host consumer contract in the dock-home
consolidation (the keyframes `data-glass-dock-portal` teleport + the @mbabb D9 mis-wire is the canonical
break). (b) Note the standalone-`DockIconButton` coarse-pointer 44px hit-target floor gap (DDR-AS-RC-3 —
a real primitive gap a speedtest consumer measured at 40×40 regardless of `.glass-dock` ancestry) in the
dock-controls.css carve. (c) The refined rail + dock-control polish W06 hoists is exactly what bbnf-buddy
ToolsLayer re-derives by hand — note it as a re-adoption target (routes to W34).

**§20 CROSS-SESSION HAND-OFF fold (USF-2 — the dock-control optical-size contract; NEW, see waves/AX.W06
§Consumer hand-off).** USF reports `DarkModeToggle`-in-dock renders ~2.5× the nav icons in `variant="rail"`.
Root cause (glyph-sizing asymmetry): (1) DockIconButton glyphs are consumer slots (`h-4 w-4` ≈ 40% of the
2.5rem box); (2) DarkModeToggle renders its OWN internal SVG `h-full w-full`
(`custom/dark/DarkModeToggle.vue`) — bypassing the slot convention; (3) in-dock, dock-controls.css:194-201
sets `--dark-mode-toggle-padding: var(--dock-icon-padding, 0)` but `--dock-icon-padding` is NEVER DEFINED →
zero padding → the SVG fills the box (standalone `md` correctly gets 0.375rem — dock-specific). First-principles
fix: the two icon-button families share ONE optical-size contract WHEN DOCKED — route the toggle's internal
glyph through a `--dock-control-glyph-size` token (default `--icon-md`), scoped to the in-dock path only
(`h-full w-full` stays correct for standalone). One token the whole dock-control family reads; no
per-component magic padding. W06 owns dock-controls.css + lands LAST in the dock band, so the contract carves
the FINAL model. Cross-repo consume gate: USF's dock-control optical-parity visual gate (routes through
W34/W35).

**gate.** `proof:storybook-ia` re-baselined for the dock home; `proof:no-orphan-demo-route`;
`proof:no-god-module` (.css-aware, W25a) over the dock partials. VISUAL-TRUTH: live audit of the
consolidated dock story + the refined rail.

---

### AX.W07 — Aurora core unblock: the WGSL black-canvas + WebGL2-default-until-parity
**Band** B · GRAPHICS · **Severity** blocker (co-headline) · **dependsOn** AX.W00

**Scope.** Eliminate the live aurora black render at its device-proven root. TWO compounding WGSL
defects, ONE wave: (1) the **int-in-float type mismatch** — `packGPUUniforms` writes the five `i32`
struct fields (stopCount/nucleiCount/warpMode/noiseOctaves/medium) into a `Float32Array`, so the shader
reads the IEEE-754 bit-pattern of `3.0` (=1077936128) not the int `3`, overflowing `samplePalette` out of
bounds → black; fix: declare the five count/enum fields as `f32` in the WGSL struct and cast in-shader
(`let n = i32(U.stopCount)`) — the canonical all-f32-uniform pattern that removes the trap permanently.
(2) the **`var<uniform>` dynamic-index miscompile** — the dynamically-indexed `palette`/`nucleiPos`/`nucleiMod`
arrays live in the uniform struct, which returns `[0,0,0,0]` for runtime indices on Apple/Metal; fix:
move them into a single `var<storage, read>` Field buffer (the intent the WGSL header already claims),
lifting the MAX_STOPS/MAX_NUCLEI caps for free. **DEFAULT the live `<Aurora>` to the WebGL2 path** (the
tested, correct, universal single-pass renderer per DESIGN invariant 8) until the WGSL twin reaches medium
parity — gate WebGPU behind the new render gate. Thread the masterTempo seam into the WebGPU frame
(currently dropped).

**foldsFindings.** Slice 6 F0 (root, DEVICE-PROVEN: the std140 int-in-float mismatch; the thumbnails bake
because they are WebGL2-only `mode:'capture'`; fix: f32-cast). Slice 10 F0 + `W01-aurora-webgpu-blackcanvas.md`
(root, DEVICE-PROVEN: the var<uniform> dynamic-index Metal miscompile; fix: storage-buffer transposition).
[These two device-instrumented slices converge on the same black-canvas symptom; both fixes land
together — the f32-cast + the storage transposition jointly produce a non-black render.] Slice 10 F3 + 6
F2 (root: the WGSL twin is REDUCED-PARITY — isotropic-only, fbm-only, no mediums, straight OKLab-lerp
palette; fix: WebGL2-default-until-parity, no silent downgrade on capable machines). Slice 6 F1, 10 F0
(the masterTempo/cursor seam drift). Slice 10 F4 (root: no device-loss handling — a silent-failure trap;
fix routes to W14).

**CONVERGE folds (digest harden:aurora-blob).** (a) **The gating seam is NOT a flip of an existing option.**
The public `AuroraRenderMode` union is `'webgl' | 'css' | 'auto'` — there is NO `'webgpu'` value; WebGPU is
selected by an internal async probe (`resolveRenderModeAsync → 'webgpu'`) the consumer cannot opt out of
except by forcing `renderMode='webgl'` (which also kills the WebGL2-vs-CSS tiering). So "default to WebGL2
until parity" requires a NEW internal lever: add a `WEBGPU_PARITY` const (or build flag) gating the
`'webgpu'` branch in `resolveRenderModeAsync` so it returns `'webgl'` until parity — NOT a consumer prop
(consumers should not know about the twin). NAME this const so W07 (sets it false) and W14 (flips it true)
share ONE switch. (b) **The W07↔W14 re-enable criterion must be HONEST** (see §4 note 14): "until the WGSL
twin reaches medium parity" is currently UNMEETABLE by the wave chain — W13 ships the GLSL/WebGL2 mediums
only, W14's Kuwahara multi-pass is a separate painterly finish, and the WGSL single-pass twin never gains a
medium dispatch. Resolve in §4: keep WebGPU as an OPT-IN enhancement over a parity-floor field and DELETE
the "re-enable the auto-default" framing (the likely answer, matching the single-source-shader charter),
OR W14 ports the six mediums into WGSL so parity is real. (c) speedtest's `deriveAurora` sharpening (5
perceptual axes incl boldness/oiliness, 6 registers incl OIL uSheen + BOLD, derived-from-#CC2233, 4 SOTA
shader levers) is rich consumer-grounded INPUT for the atoms/medium design (W10/W11/W13).

**gate.** `proof:aurora-webgpu-render` (π-lane): instantiate `createGPUCanvas` on a real device, draw
DEFAULT + each preset at t=1, read back the centre pixel, assert (a) non-black luma floor, (b) per-i32-field
parity, (c) WebGL2-vs-WebGPU delta below a perceptual threshold; assert the `WEBGPU_PARITY` lever resolves
`'webgl'` while false. VISUAL-TRUTH: live frontend-design audit of the aurora canvas painting on a
WebGPU-capable machine — the only assertion that catches this class.

---

### AX.W08 — Blob core unblock: re-derive the smin distance regime, un-flood the SDF
**Band** B · GRAPHICS · **Severity** blocker (co-headline) · **dependsOn** AX.W00

**Scope.** Reconcile the `uSmoothK` pipeline as ONE coherent distance regime. The W9.a smin-normalization
added `k *= 4.0` and deleted the `/0.22` magic normalizer AND the `POS_SCALE` multiply on the upload, but
the three coupled inputs were never re-tuned: live composed `uSmoothK ≈ 0.21` → in-shader effective
`k ≈ 0.84` in a 1.0-wide UV (≈6× the working band), flooding the SDF field negative across the whole
canvas → a clipped color slab. Fix gestalt (a re-derivation, not a magic-number patch): (a) re-derive the
config default + mood lerp range against the post-normalization k so the COMPOSED `uSmoothK` lands a tight
wet meniscus (~0.03-0.08 effective seam-pull); (b) re-apply `POS_SCALE` to the `uSmoothK` upload — the
smin band is a length and must ride the same compression as every other length-like uniform (its W9.a
deletion was the error); (c) store mood smoothK as a 1.0-centred MULTIPLIER not an absolute distance; (d)
drop the dead `from`/`to` keys on the blob spring opts. Sync the README's dead 0.22/0.28 regime.

**foldsFindings.** Slice 11 F0 (root, EMPIRICALLY-PROVEN: the W9.a normalization changed the k semantic
regime but the coupled config default 0.22→0.12, the mood lerp left at 0.16-0.32, and the missing POS_SCALE
were never reconciled; the lit rim + iridescence sheen RENDER CORRECTLY on the visible edge — the fix is a
SCALE re-derivation, not a shader rewrite; fix: one coherent distance regime + restore POS_SCALE). Slice
12 F0 (root, LIVE: 84.1% canvas coverage, ~1.34× the footprint; fix: re-derive geometry as ONE budget
against the footprint). Slice 11 F3 (the benign `from`/`to` spring-opts wart). Slice 11 F2 (README
documents the dead regime).

**POS_SCALE DISPOSITION (decided once — §4 note 13).** W08 takes the **MINIMAL un-flood** to clear the
blocker fast: restore `POS_SCALE` on the `uSmoothK` upload (it IS a length and must ride the same
compression as every other length-like uniform; verified live — uSmoothK uploads WITHOUT `*POS_SCALE` while
uBodyRadius/satRadius/uPointer/noiseAmp all carry it) + re-tune the COMPOSED band to ~0.03-0.08 effective.
W08 does NOT excise POS_SCALE. The full "express every length in raw wrapper-normalized units / bake the
0.625 compression into the constants" gestalt (slice-12) is the SURVIVING regime but is W15's job, and W15
re-derives the ENTIRE length cohort (body/sat/orbit/smin/noise) ATOMICALLY in that wave with
`proof:blob-render` as the regression-lock — never a partial migration that re-floods. The two waves carry
an explicit "POS_SCALE disposition" line so W15 inherits, not contradicts, W08.

**gate.** `proof:blob-render` (π-lane): mount GooBlob with defaults, drive N frames, read back, assert (1)
opaque-fraction in a contained band (e.g. 0.25-0.6), (2) bounded away from all four edges (transparent
margin exists), (3) a center-vs-corner alpha gradient (a field, not a slab) — superseding the isolated-math
gates as the close criterion. VISUAL-TRUTH: live frontend-design audit of the contained droplet.

---

### AX.W09 — Specular tune-to-subtle: warm-cream low-alpha + one token ladder + retire the double-light
**Band** B · GRAPHICS · **Severity** major · **dependsOn** AX.W00

**Scope.** A single gestalt retune at the ONE unified source (`glass.css .glass-material::before`): (a)
drop the inner gradient stop from pure-white-0.55α to a genuinely warm-cream low-alpha core (the "warm-cream
tint" the comment claims but the code violates — `hsl(40 30% 100%)` resolves to pure white); (b) halve the
intensity ladder to a SUBTLE rung set (rest ~0/0.08, hover ~0.22, active ~0.32); (c) tokenize the three
rungs as `--glass-specular-intensity-{rest,hover,active}` (+ dark arm) so the magnitude is a single
overridable cohort, not three buried literals across two files; (d) drop the rest floor to ~0 so static,
unwired surfaces are clean. Retire the dock control's SECOND specular (the `--glass-highlight` hover
box-shadow that stacks on the moving `::before` — the worst-offending blowout, on the most-hovered surface).
Lift the duplicated `trackSpecular` pointer-write (verbatim in Card.vue + DockIconButton.vue) into a
`useSpecularTracking()` composable. CRITICAL COUPLING: co-update `proof-glass-material-unified.mjs:167,170`
which HARDCODES `0.6`/`0.85` — else the tune lands RED.

**foldsFindings.** Slice 14 F0 (root: TWO compounding causes — the pure-white-screen MAGNITUDE + the
AW.W22 BLAST RADIUS promotion onto every band surface; NOT W23/W24 as the requirement guessed; fix: one
4-line retune at the unified source + tokenize). Slice 14 F1 (the dock double-specular). Slice 14 F2 +
27 F4 (the duplicated pointer seam → `useSpecularTracking`). Slice 14 F3 (the non-zero rest floor defeating
the @property initial-value 0). Slice 27 F3 (mint the intensity tokens; token-first). Slice 14 F4 / 27 F5
(the substrate-hygiene seams — the -1000 resume time-warp + the stale `.glass-specular-track` filename —
ride this or the §J encapsulation band, not a blocker).

**CONVERGE folds (digest).** (a) **Card `specular?: 'off' | 'subtle' | 'full'` opt-in prop** (the
keyframes.js live-consumer ask, default `subtle` or `off`) so a resting glass panel is CLEAN by default —
this is the consumer-requested opt-in COMPLEMENTING the token ladder this wave mints. (b) **Published-vs-HEAD
reconcile (load-bearing — §4 note 12):** the AW.W24 pointer-wiring IS at HEAD (the Card specular tracks the
pointer); the consumers MEASURED the published 3.4.0 which pins `--specular-x` at 50% mid-hover → a
dead-centered white bloom at opacity 0.35-rest/0.6-hover. So W09 is TUNE + opt-in + tokenize, NOT
"wire the pointer" (already done). The published-3.4.0 magnitude (white radial, 0.35 rest) is the
consumer-visible blowout the tune must beat. Cite keyframes a-glass-ui-consumption D14 as the consumer-side
surface the retune must satisfy live (the kf demo gets the fix free via the softened default after a pin
bump — confirm no kf-side override remains). (c) The forced-colors:active glass-language skin arm is its
OWN wave (W36), NOT folded here — flagged so the specular tune does not absorb the broader a11y obligation.

**§20 CROSS-SESSION HAND-OFF folds (USF-1 + kf-G-1 + kf-G-2 — see waves/AX.W09 §Consumer hand-off).** TWO
consumers (USF + keyframes.js) independently confirm the resting-specular blowout — the two-consumer confirm
makes the root cause definitive: (1) inner stop `hsl(40 30% 100% / 0.55)` resolves to PURE white (L=100%
washes the 30% sat), (2) `mix-blend-mode: screen` of white over the dark canvas, (3) the non-zero rest floor
`opacity: var(--specular-intensity, 0.35)` paints it at rest, defeating the `@property` `initial-value:0`.
**The rest-floor→0 is the single highest-value fix for a flat consumer.** W09 gains a SECOND leg — the
**wire-or-omit** contract (kf-G-1): a glass surface either WRITES `--specular-x/y` from the pointer itself
(as `dock.js` does) OR does NOT emit `.glass-specular-track` until a consumer opts in — a mouse-tracked
radial with NO mouse writer must never be the default; the calmer default is rest ≤ 0.25 / radius ≤ 40%
(kf-G-2 confirms the dock-icon track IS already pointer-wired → a TUNE, not a wire-up). RATIFY the specular
default — `subtle` (rest≈0) vs `off` — flat-data consumers want `off` trivially declarable (the Card
`specular="off|subtle|full"` prop W09 already specs). Cross-repo consume gate: kf `proof:specular-handoff` +
USF's specular visual gate, born-RED, greening ONLY on the published bump (routes through W34/W35).

**gate.** `proof:glass-material-unified` re-pointed to assert the tokens exist (not literal values) +
co-update `proof-glass-material-unified.mjs:167,170` hardcoded `0.6`/`0.85`; assert the Card `specular`
prop produces three distinct computed-style intensities. VISUAL-TRUTH: live frontend-design audit — the
press-light reads as a whisper, the dock no longer the hottest surface, static plates clean, `specular="off"`
genuinely clean.

---

### AX.W10 — Aurora options converge: ONE atoms door wired into the live config UI
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07

**Scope.** Collapse to ONE consumer-facing control model and make the live demo config UI consume it.
RETIRE the dead `deriveScene` + its `AuroraMood` union + the duplicated `thirdsNuclei` (zero consumers,
on `/api` as dead substrate). Make `resolveAtoms` the single front door, re-derived from the user's
CONTROL-ELEMENT decomposition — COLOR (seed + harmony + a saturation knob), ZONES (count + an arrangement
character, not a bare integer), NOISE (one organic-boundary knob fanning to warpAmount/warpScale/warpMode
— the named "noise" element currently buried in mood), plus MEDIUM + texture + MOTION (≤7 atoms). Rebuild
`AuroraConfigDock` to drive the atoms (an "atoms" tab as default; the raw layers become the genuine
Advanced disclosure), route the panel into the manifest. Make inapplicable knobs structurally absent
(textureAmount on smooth), and fully wire OR excise the dead flow/wake interactivity axes per "excise or
fail." Fold the temperature-pole model fix (real interpolation toward named warm/cool anchors, not a blind
±22° nudge).

**foldsFindings.** Slice 9 F0 (root: AW shipped TWO parallel option models — resolveAtoms W6 + deriveScene
W5 — ON TOP of the unchanged 28-field config and the unchanged full-schema demo dock, neither wired into
the live UI; substrate-without-consumer; fix: convergence to ONE door consumed by the live UI). Slice 9
F1 (root: the atom set was author-energy-framed not user-control-element-framed; noise has no door; fix:
re-derive from zones/noise/color). Slice 9 F2 (root: thirdsZones ≡ thirdsNuclei + two mood vocabularies;
fix: one prior, one table). Slice 9 F4 (silent-inert texture/interactivity arms; fix: structurally absent
or wired). Slice 7 F2 (the two derive doors; deriveScene is dead /api substrate). Slice 7 F4 (the
temperature-pole magic-number model). Slice 9 F3 (the green roundtrip gate guards a dead door).

**CONVERGE folds (digest).** (a) **Named consumer #2 — speedtest E2 aurora-derive.** Once the atoms door
lands, speedtest replaces its 232-line hand-tuned `auroraConfig.ts` (39 knobs, self-documented as
superseded by `deriveAurora` + the OKLab LUT at the next consume) with a `resolveAtoms({…})` call (≤7
atoms) + excises the dead `--aurora-1..6`/`--aurora-gradient` tokens — this validates the W10 door against
a real consumer AND discharges the §13 chronically-deferred "speedtest E2" item (the adoption leg routes to
W34). Without a named consumer #2 the door risks the same substrate-without-consumer trap W24/DeckProgress
fell into. (b) **The §2.3 "derive-color variant" = the AS-P2 `deriveAuroraFromColor` PUBLIC door** carried
as the highest-stakes kill-gated chronic (value.js VAL-1, carried 3+ tranches): decide here — ship the
public derive-color surface gated on value.js K.W4 landing the 2nd live consumer, OR ratify the VAL-1 KILL
if K.W4 closes without it. Carry the "designed != adopted; speedtest hand-rolls the equivalent but is not
the published 2nd consumer" caveat so AX does not silently ship substrate-without-consumer. (c) **The
AuroraConfigDock glass-atoms RESTYLE (AW.W29) is W38, NOT W10** — W10 is the FUNCTIONAL atoms-door wiring;
the visual iOS-26 glass-atoms restyle of the configurator chrome is its own wave (sequence W38 after W10 so
the two configurator edits don't collide).

**gate.** `proof:aurora-atoms-roundtrip` kept (totality/default-preservation) PLUS a π-lane assertion that
selecting each atom visibly changes the live canvas AND the atoms story is routed in the manifest.
VISUAL-TRUTH: live audit that the simplified door is reachable AND renders.

---

### AX.W11 — Aurora color seams: OKLCh catch-light + the shared palette-ramp twin
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07

**Scope.** Close the two OKLCh seam leaks the W5 migration missed. (1) Derive aurora's default warm-white
catch-light from an OKLCh anchor (a shared `warmCatchLight(L,C,h)` CPU helper in the `/color` leaf,
consumed by BOTH the blob's `warmCream` and aurora's `lightColor` default — deleting the eyeballed
`[1.0,0.95,0.88]` sRGB literal and making the catch-light token-authorable). (2) Hoist the palette-ramp
interpolation (the smoothstep t-ease + the OKLab-rectangular-vs-OKLCh-hue-arc dispatch on huePath) into the
shared `procedural-color` chunk as GLSL+WGSL twins so the ramp can never drift between backends; carry the
huePath/stopCount uniform into WGSL. Sweep `aurora/README.md` + `DESIGN.md` + blob README from "planned"
to "landed" keyed off the registered proof gates (12 of ~14 `(planned — AW.*)` tags are stale; re-point
the stale source line refs).

**foldsFindings.** Slice 7 F1 (root: `uLightColor` predates the W5 OKLCh migration and was never folded —
an undisciplined sRGB-ish triple where "OKLCh everywhere" is violated; the blob lights in OKLCh, aurora
does not; fix: a shared OKLCh catch-light helper). Slice 7 F3 (root: the WGSL `samplePalette` is an
INCOMPLETE color twin — no smoothstep ease, no huePath branch — a visible divergence the wgsl-equivalence
gate doesn't cover; fix: hoist the ramp to the shared chunk + extend the gate). Slice 7 F0 (root: the
README describes the DONE migration as "planned" — a shipped doc-lie; the migration is genuinely landed +
gated; fix: the planned→landed sweep).

**CONVERGE folds (digest).** **OKLCh migration is GENUINELY LANDED — this is SEAM-level, not a redo (§4
note 7).** The /color leaf + both GLSL shaders + the blob are value.js-Ottosson single-sourced; zero live
HSL/YIQ/sRGB-luma paths. The four §2.3 findings are seam-level (the doc-lie planned→landed sweep, the one
sRGB-literal catch-light, the dead deriveScene door W10 handles, the WGSL palette-ramp gate hole). Do NOT
re-litigate the migration. speedtest names the OKLab-LUT muddy-middle fix as a CPU-side LUT re-spacing
(keep the shader linear mix) — input for the catch-light/ramp seam work. The 12-of-~14 stale
`(planned — AW.*)` README tags are the doc-lie; re-point the stale source line refs in the same sweep.

**gate.** `proof:aurora-wgsl-equivalence` extended to cover `samplePalette` (1e-6 over a witness stop pair +
huePath). VISUAL-TRUTH: π-lane WebGL2-vs-WebGPU palette-ramp parity on a huePath:increasing config.

---

### AX.W12 — Mediums substrate: StrokeProfile extraction + the high-quality painterly noise basis
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07

**Scope.** Build the substrate the medium waves ride. Extract a `StrokeProfile` struct (shapeType,
bristleAmp, streakFreq/Amp, impastoAmp, hardness, tooth*, density*, len/widMul) + a `profileFor(medium, mode)`
selector + a single parameterized `paintStrokeLayers(profile)` the oil/van-Gogh/oil-pastel bodies call with
their own profile — turning new-medium work into authoring a profile, not forking the 117-line `mediumOil`
monolith. Upgrade the painterly-medium noise basis: replace the `sin()`-based `hash22` (periodicity/banding
at high frequency) and the blocky value-noise `vnoise` lattice with an integer-PCG hash + a gradient-noise
(simplex/Perlin) variant for the tooth/granulation fields — the silent fidelity ceiling every medium rides.
Keep the smooth/atmospheric pole on the cheap fBm.

**foldsFindings.** Slice 8 F6 (root: `mediumOil` accreted four stroke modes + four layers in one function;
the mode-parameter selection is logic-as-data as imperative branches; fix: StrokeProfile + paintStrokeLayers
— DRY at the substrate, differentiated at the medium). Slice 8 F4 (root: the noise basis was inherited from
the smooth aurora and never upgraded for the painterly mediums that magnify high-frequency detail; fix:
higher-quality hash + gradient-noise variant).

**CORRECTION — the integer-PCG hash is NET-NEW, not "reuse the one in the tree" (digest harden:aurora-blob).**
There is NO integer-PCG GLSL hash anywhere in src/. The only shared PRNG leaf (`utils/prng.ts`) is CPU-side
mulberry32 + djb2 — not a GLSL hash, not PCG, and unrelated (no DRY overlap with the GPU hash). The aurora
shaders use sin-based `hash21`/`hash22`. So W12 AUTHORS a new GLSL integer-bit hash leaf (PCG2D/Sugar — e.g.
Jarzynski PCG3D or `floatConstruct(hash(floatBitsToUint(p)))`) in the shared `procedural-color` chunk,
splices it into BOTH `aurora.frag.ts` and `aurora.wgsl.ts` matching the existing OETF/FBM_ROT single-source
discipline, and gates it with a GLSL↔WGSL twin-equivalence proof. Do NOT cite a non-existent in-tree hash.

**gate.** `proof:no-god-module` over `mediums.glsl.ts`; a GLSL↔WGSL hash twin-equivalence proof. VISUAL-TRUTH:
π-lane confirms the substrate change is visually neutral on the existing oil medium (no regression).

---

### AX.W13 — First-class van-Gogh + oil-pastel mediums + pigment-true stroke compositing
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W12

**Scope.** Author a FIRST-CLASS `mediumVangogh` body (currently `return mediumOil(...)` — a one-line
passthrough): a comma/crescent stroke profile (bending spine + asymmetric taper), explicit ATOMIC dab
placement (sparse, high-contrast, visible inter-stroke canvas gaps), rhythmic row-clustering along the ETF
tangent into Starry-Night swirl rows, and per-stroke impasto ridge crowns at full height. Split
`mediumOilPastel` (smeared directional strokes via the brush engine, creamy hardness, heavy burnish,
pigment build-up) from the dry `mediumCrayon` (the existing tooth-multiply, no sheen) — sharing the
SUBSTRATE not the dispatch body. Move stroke OVER-compositing (`paintOver`'s `mix`) into OKLab (or the
deferred Kubelka-Munk `pigmentMix` on the painterly mediums only) so overlapping complementaries transition
through a chromatic path, not grey. Move the within-stroke streak modulation into OKLCh (hue+chroma along
the stroke) so a single stroke carries broken color at the ATOM level.

**foldsFindings.** Slice 8 F0 (root: the W4 DRY precept collapsed van-Gogh onto a `uMedium==5` energy-grade
switch on the oil engine; real atomicity is separable directional dabs with their own shape/spacing/impasto;
fix: a first-class stroke grammar). Slice 8 F1 (root: oil-pastel and crayon share one dispatch body — a
per-pixel tooth-multiply, never a stroke; materially different media; fix: split, stroke-deposition
oil-pastel). Slice 8 F2 (root: stroke OVER-compositing stayed linear-RGB so overlap muds to grey — the
exact defect W5's OKLCh move killed at the palette layer, re-entering at the compositing layer; the
Kubelka-Munk fold's trigger condition is now met; fix: OKLab/KM stroke composite). Slice 8 F5 (per-cell not
within-stroke broken color → flat stamped swatches; fix: OKLCh within-stroke modulation). Slice 26 F5 (the
crayon strokeMode legacy special-case — promote or remove here).

**gate.** Per-medium texture-snapshot gates. VISUAL-TRUTH: a LIVE bake of the vangogh + oil-pastel presets
against actual Van Gogh / oil-pastel reference works (frontend-design audit) — the close criterion; do NOT
trust a green snapshot gate (a passthrough + a shared body both PASS the current text gates).

---

### AX.W14 — WebGPU painterly parity: wire the multi-pass Kuwahara/LIC + wake, or excise
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07, AX.W13

**Scope.** Resolve the dead WebGPU painterly scaffold one way, not half-built. Build the real multi-pass
painterly compositor in a cohesive `gpuPasses.ts` seam — a ping-pong render-target ladder (base field →
structure-tensor RGBA16F → separable smooth H/V → anisotropic 8-sector Kuwahara → swapchain), each pass a
render pipeline over the full-screen triangle, wiring the authored `painterly.wgsl.ts`/`wake.wgsl.ts`
operators (1e-6 color-verified — only the FBO ping-pong plumbing is missing), all gated by the shared park
machinery — making WebGPU genuinely "better than WebGL2" and delivering the §2.4 SOTA technique. OR excise
`painterly.wgsl.ts` + `wake.wgsl.ts` entirely (dead scaffold is forbidden) and re-scope WebGPU to a pure
single-pass parity backend. Subscribe to `device.lost` (a silent-failure trap at HEAD): on a non-destroy
loss, tear down the GPU handle and fall back to the WebGL2 path. This wave is what re-enables the WebGPU
default (W07 gated it off until parity).

**foldsFindings.** Slice 8 F3 + 10 F2 (root: the Kuwahara/LIC/tensor passes are authored, exported,
documented as "the WebGPU full-quality half" — but DEAD EXPORTS; `gpuRuntime` draws single-pass; the W7c
FBO seam is a no-op; the biggest non-uniformity lever, strings already exist; fix: wire the multi-pass
compositor OR excise). Slice 10 F4 (root: no `device.lost` handling — swap-once-forward leaves a lost GPU
frozen-black; fix: subscribe + fall back to WebGL2).

**CONVERGE folds (digest).** (a) **The "re-enable the WebGPU default" framing is the likely DELETE (§4 note
14).** W13 ships GLSL/WebGL2 mediums only; the WGSL single-pass twin gains no medium dispatch, so "medium
parity" is never met by W13+W14 — the W14 Kuwahara multi-pass is a separate painterly finish, not the six
per-fragment mediums. Pick in §4: either W14 ports the six mediums into WGSL (real parity → re-enable) OR
(the de-facto answer, matching the W14 "OR excise" branch + the single-source-shader charter) keep WebGPU
as an OPT-IN enhancement over a parity-floor field and NEVER auto-default — deleting the re-enable framing
and flipping `WEBGPU_PARITY` only for the opt-in path. (b) `device.lost` is a **befitting-silent browser-API
degradation** (NOT a fail-explicit library-internal throw — the two are never collapsed per the precept):
on a non-destroy loss, tear down the GPU handle + fall back to WebGL2 silently with rationale.

**gate.** `proof:aurora-webgpu-render` extended to assert the multi-pass output (or that the scaffold is
gone). VISUAL-TRUTH: live audit that WebGPU paints the Kuwahara oil finish at parity-or-better, and that a
forced device-loss degrades to WebGL2 visibly.

---

### AX.W15 — Blob contained-droplet: geometry + lit warm-cream default + living membrane
**Band** D · BLOB · **Severity** blocker · **dependsOn** AX.W08

**Scope.** Make the blob read as a CONTAINED, organic, lit droplet (W08 un-floods it; this perfects the
look). Solve `bodyRadius + orbitRadius + satelliteRadius + smin band` so the WHOLE merged field fits inside
~70-80% of the wrapper with intentional overflow margin only for the orbit excursion; express every length
in wrapper-normalized units. Make the lit warm-glass droplet the DEFAULT identity (turn on a tasteful lit +
low iridescence + low SSS in `BLOB_CONFIG_DEFAULTS`; delete the "zero regression" flag-gating as legacy per
§0) and re-anchor the normal/thickness on the contained body so the Fresnel rim lives on a curved rim
INSIDE the footprint. Derive the default palette from glass-ui warm tokens (the un-themed blob belongs to
the cream-glass system; keep cold/neon as explicit opt-in). Raise the edge displacement to a
perceptible-but-calm band so the warped-FBM membrane reads as living, not a geometric box. Re-balance the
interaction magnitudes (pointer lean / pseudopod / squash) against the new smaller body so the EXISTING
wired interaction becomes legible.

**foldsFindings.** Slice 12 F0/F1/F2/F3 (root, LIVE: the oversize geometry destroys every downstream read —
the lit surface is swamped because thickness saturates flat and the rim renders outside the clip; the
fully-wired interaction is invisible because there is no contained silhouette to deform; the sub-pixel
membrane is clipped; fix: contained geometry is the keystone — it resurfaces the W9/W10/W11 work that
already ships but paints nothing). Slice 13 F3 (root: the shipped DEFAULT is the pre-W9 flat sticker because
every SOTA feature defaults OFF for "zero regression" — a legacy instinct forbidden in a greenfield product;
the first `var(--primary)` blob washes out in dark mode; fix: ship the wet droplet as the default + a
min-contrast rim). Slice 13 F6 (the warm-cream identity is gated behind the off-by-default lit path; fix:
token-derived warm default).

**POS_SCALE DISPOSITION (inherits W08 — §4 note 13).** W15 is the wave that, IF it re-expresses lengths in
raw wrapper-normalized units, re-derives the ENTIRE length cohort (body/sat/orbit/smin/noise) ATOMICALLY
with `proof:blob-render` as the regression-lock — it does NOT delete POS_SCALE while leaving the smin band
W08 just compressed. The "eliminate the hidden fudge" language is scoped to a SINGLE atomic re-derivation,
never a partial migration that re-floods. Either: KEEP W08's POS_SCALE regime (drop the slice-12 excision
language as scope-creep → §J) OR bake the 0.625 compression into ALL constants in one wave. The decision is
recorded in §4 note 13; W15's spec carries the explicit disposition line.

**CONVERGE fold.** Add a consumer-coverage census of PRM-freeze adoption across blob consumers (bbnf-buddy
ships the SAME WCAG 2.2.2 gap on 4 perpetual mascot rAF loops — zero PRM); the routed fix is a consumer
adoption (W34), and the census confirms the substrate freeze is reachable.

**gate.** `proof:blob-render` (π-lane) extended: assert luminance VARIANCE across the body (flat fill fails,
lit dome passes), a pointer-driven centroid shift under a synthetic gesture, a non-zero silhouette deviation
from a circle, EVERY grid blob paints visibly against light/dark. VISUAL-TRUTH: live frontend-design audit
of the lit contained creature, side-by-side light/dark — closing the "PENDING" W9 browserVerify.

---

### AX.W16 — Blob integration + interaction + performance + README
**Band** D · BLOB · **Severity** major · **dependsOn** AX.W08, AX.W15

**Scope.** Restore the WCAG-2.2.2 pause/resume seam — `GooBlob.vue` discards the renderer handle so
`blob.value.pause()` is `undefined` at every call site (the documented DockBackgroundToggle integration is a
runtime no-op); capture `const { pause, resume } = useMetaballRenderer(...)` and re-expose, OR collapse to a
declarative `v-model:paused` prop the component owns. Give the blob a genuine quiescence signal feeding
`shouldContinue` (mood settled + pointer at rest + trail collapsed + no satellite mid-merge → park, wake
from the satellite scheduler) — the onscreen-idle hot path burns full fps forever today; wire the
never-shipped `quality:'full'|'half'` axis. Solve the multi-instance WebGL-context-cap (route static/ambient
instances to WatercolorDot or a single shared scissored context; reserve GooBlob for the interactive hero).
Hoist ONE `resolveTokenColor(css,el)` leaf so the renderer stays DOM-free (the var()-unwrap is duplicated in
GooBlob.vue + the renderer). Fold the oversize-canvas perf trim (pre-FBM bounding discard, gate the 4-tap
surfaceNormal behind the lit path). Run the README planned→landed sweep + fix the defineExpose table.

**foldsFindings.** Slice 13 F0 (root, blocker: the pause/resume seam is a runtime no-op — typecheck passes
because the methods exist on a discarded return type; fix: capture + re-expose or `v-model:paused`). Slice
13 F1 (root: `shouldContinue(){return !paused}` defeats the demand gate; idle ambient blob burns full fps;
fix: a quiescence signal + the quality axis). Slice 13 F2 (root: one WebGL context per instance, prior
context-cap incident; fix: shared context / WatercolorDot routing). Slice 13 F4 (the duplicated var()-unwrap
DRY+leak; fix: one `resolveTokenColor` leaf). Slice 12 F5 (the oversize fragment-cost trim). Slice 13 F5 +
11 F2 (README drift both directions). Slice 13 F6 (the well-architected substrate park/PRM — PRESERVE; one
two-writer-per-reason tightening). Slice 25 F4 (the useMetaballRenderer god-module split — coordinate with
§J W26).

**CONVERGE folds (digest).** (a) **value.js consumer-fork repatriation (named blob-band close-criterion).**
value.js carries a divergent LOCAL goo-blob fork (GooBlob.vue + 4 composables incl. a 343-line
useMetaballRenderer) in 3 mounts, self-flagged as debt awaiting the glass-ui ship, PLUS a local WatercolorDot
coupled to a global `<SvgFilters>` singleton (the exact fragile plumbing the /watercolor-dot lift killed).
Once W08/W15/W16 land the contained lit droplet, value.js DELETES its goo-blob fork → `@mkbabb/glass-ui/
goo-blob` (wiring value.js color through the injected ColorResolver seam — value.js IS the color source, a
clean seam) AND its WatercolorDot + `<SvgFilters>` mount → `@mkbabb/glass-ui/watercolor-dot`. Routed to W34;
the close-criterion makes the fork not linger as permanent debt. (b) the value.js BlobDot/Metaballs family
home-coordination + post-v1.0.0 public-surface gate + the consumer-injected ColorResolver contract (AS-P3)
fold into the blob rebuild's surface decisions. (c) fold KF-4 (the useRAFLoop demandPark / PRM honor) which
speedtest measured the meter rAF loop violating (ran HIGHEST under PRM) — same demand-gate class as the blob
quiescence seam.

**gate.** A π-lane gate that wires DockBackgroundToggle to a mounted GooBlob and asserts the rAF parks on
pause; a multi-instance context-count bound; a README-vs-code defineExpose consistency check. VISUAL-TRUTH:
live audit that the pause control stops the surface + the idle blob throttles.

---

### AX.W17 — Constellation: ship light/dark tokens + the drawOverlay seam; slides adopts; README
**Band** E · CONSTELLATION · **Severity** major · **dependsOn** AX.W00

**Scope.** Complete the abstraction the AW.W17 fresh-build left half-done. Ship a `--constellation-*` token
block in glass-ui `tokens.css` with a light arm and a `.dark` arm carrying the H.W4-derived legibility
values (node lifted off the dark ground, the `--constellation-alpha` field-yields-to-type knob, the
`--constellation-edge-alpha`/`-edge-anomaly-alpha` multipliers) — visibility is a library concern, not a
per-consumer re-tune. Add a `drawOverlay` pass seam so slides builds its NCSU-red anomaly skin (pulse ring +
core + resolved-check + dashed callout, reading `--constellation-accent`) as a thin wrapper, then DELETES
its local `constellation.ts`. Wire `constellationField.ts`'s `readPalette` to the full token set.

**§15 CLICK-TO-WARP — NET-NEW design+build, the headline W17 addition (§4 note 15).** §15's "first shipped
in the slides constellation, GENERALIZE it" framing is a FACTUAL ERROR — grep proves warpTo/nearest/focal
exists in NEITHER repo; slides has only an auto anomaly-DRIFT (`drift()` re-targets node[0] on a jittered
easeInOutQuad). So W17 AUTHORS the click-to-warp interaction; slides `drift()` is the architectural ANALOG
(same node-position-mutation class) it shares an escape with, NOT a source to port. Promote the FOCAL NODE
to a FIRST-CLASS library concept (resolving the split-brain: the consumer's `drawOverlay` owns WHICH node is
focal + its SKIN; the library owns its POSITION + spring):

1. **Focal-node model in `ConstellationField`** — an optional `focalIndex` + a per-axis warp spring the
   engine steps. `drawOverlay` PAINTS the focal node at its engine-owned position
   (`field.nodes[field.focalIndex]`). This same seam carries the drift escape — warp + drift are the SAME
   class (node-position mutation `drawOverlay` structurally cannot express), resolved by ONE seam, not two.
2. **`nearestNode(field, px, py, excludeIdx)`** — a linear O(count) min-d² scan over `field.nodes` (count
   64 default, negligible — no spatial index). "Lattice point" = the nearest drifting NODE (the constellation
   has NO fixed lattice; every node drifts) — state this explicitly to kill the §15 wording ambiguity.
   Exclude the focal node from its own candidate set; degenerate (cursor on focal) no-ops.
3. **LIVE-TARGET tracking** — store the target node INDEX (not a click-time position snapshot); each frame
   the warp spring re-reads `field.nodes[targetIdx].{x,y}` as its live target, so it CHASES the drifting
   target and arrives ON it (a frozen snapshot lands the mark next-to the moved node — visually wrong). On
   settle, decide+state: pin the focal onto the target (merge) or keep an independent settled mark.
4. **Spring math — a dt-stepped 2nd-order critically-damped integrator advanced INSIDE `stepField` (a new
   `warpStep(field, dt)`), NOT `useSpring`.** `useSpring` wraps `SpringProgress.play()` which spawns its OWN
   rAF bound to a reactive ref — a SECOND rAF outside the parked-substrate contract would defeat the
   offscreen/tab-hidden/PRM freeze the whole substrate exists to provide. Reuse the keyframes.js (response,
   dampingFraction) param model but NOT its rAF ownership; `now`-delta gives dt (clamp ~50ms for tab-throttle
   resilience); per-axis (x,y) springs; PRM-guarded motion axis. **Explicitly FORBID `useSpring` here.**
5. **API seam** — `warpTo(point)` imperative method via `defineExpose` (the canonical low-level seam,
   matching the existing `defineExpose({field})`) + a `warpOnClick?: boolean` prop as the sugar (wires the
   host pointerdown already added for ripples). Document both.

**Token VOCABULARY reconcile (not just "ship a block").** Adopt slides' RICHER set as canonical with
light+`.dark` PLAIN-hsl arms: `--constellation-node`/`-node-dim`, `--constellation-edge` (resolve the
edge-vs-line naming — slides uses edge-* for the multipliers), `--constellation-edge-alpha`,
`--constellation-edge-anomaly-alpha`, `--constellation-alpha` (the field-yields-to-type knob),
`--constellation-accent` (anomaly tint). Make the component READ them — the hardcoded `0.17` edge alpha +
`0.24` pointer-web alpha (the magic numbers slides promoted because 0.17 was below the cream perceptual
floor) become token reads. **PLAIN-hsl, NEVER `light-dark()`** — Canvas2D SILENTLY REJECTS light-dark()
into strokeStyle/fillStyle (falls back to black/transparent — the W30 cardinal defect at the library layer);
add a no-`light-dark(`-in-constellation-token static gate. `--constellation-line`/`-edge` must be a plain-hsl
token, NEVER `--foreground` (the W30 leak). Research-backed README per canonical-readme-shape.

**Non-goal (no-overfitting, §4 note 16).** The constellation is a DECORATIVE random-seeded proximity-graph,
NOT a DATA-graph renderer — it will NOT absorb semantic fixed-topology graphs (value.js conversion graph,
slides node-flow charts). A data-graph primitive, if ever wanted, is a SEPARATE component, not constellation
prop-bloat. The drawOverlay seam should ride the W37 Canvas2D-lifecycle substrate.

**Consumer-2 sequencing.** slides is the named consumer #2 (W30/W31 adopt — deletes its 510-line local
`constellation.ts` down to a thin `<Constellation :draw-overlay>` wrapper) — but the deletion is CONTINGENT
on the focal/warp seam landing here (drift+warp cannot move through a read-only overlay). Other consumers:
fourier (cream+ink, the SECOND token-driven ground — add to the visual-truth matrix; gated on its pin bump),
words (backdrop/atmosphere once it executes).

**§7 J-coordination — J.W9 IS the second-consumer swap + the §23.3 per-mode translucency consumer.** The 3.7.0
`./constellation` publish flipped the ≥2-consumer gate; J is the consumer (til-briefing Slide01/SlideXray runs
deck-local `constellation.ts`). **AX.W17's "slides adopts" leg IS J.W9's constellation swap** (J decides
execute-or-formally-close; the I-session ALREADY shipped the slides-side light-mode leak fix — a satisfied
witness W30 treats as ADDRESSED-out-of-band, do NOT re-fix). W17 ships the `--constellation-alpha` per-mode
translucency token (the §23.3 "more translucent on BOTH light + dark, legible-but-recessive" knob, calibrated
to the recessive midpoint below the slides 0.92/1.0 max-legibility reference); slides adopts it down to the
recessive default. See §7.2 + the waves/AX.W17 §7 live-feedback fold.

**foldsFindings.** Slice 24 F0 (root: the AW.W17 extraction was a greenfield component modeled on slides,
NOT a port of slides onto it — the two were never reconciled; fix: the drawOverlay skin + delete slides
constellation.ts). Slice 24 F1 (root: the extraction lifted the MECHANICS but not the PALETTE INTELLIGENCE
— treated dark-lift/field-yields-to-type as "consumer skin" when they are universal legibility, not
deck-identity; fix: ship the `--constellation-*` token block with a `.dark` arm). [The slides-side Canvas2D
light-dark() leak is the separate slice-30 F0 defect, routed to AX.W30.]

**gate.** A token-presence + readPalette-full-set gate; a no-`light-dark(`-in-constellation-token static
assertion; a focal-warp gate asserting the focal node moves toward a clicked point over ≥N frames (and
chases a live drifting target). VISUAL-TRUTH: live audit of the neutral lattice on cream AND ink AND the
fourier grounds with ONE red anomaly visible (the §4.2 ask) + the click-to-warp interaction (§4.3
fully-dynamic-interactive) reading as a spring-eased path to the nearest node, never a snap.

---

### AX.W18 — Storybook IA ground-up reinvention + gate re-baseline
**Band** F · STORYBOOK IA · **Severity** major · **dependsOn** AX.W06, AX.W19, AX.W20, AX.W22, AX.W23

**Scope.** Author a NEW category tree from the ground up (a coherent grouping: Foundations · Substrates/
Backgrounds · Primitives split into Forms+Display+atoms · Containers/Overlays · Navigation · **Dock** · Data
· Feedback · Motion · Compositions · Composables-reference), dissolving the single-story `tools` debris bin
and the 24-story `primitives` overload. Treat the three IA gates as the THING BEING REINVENTED, not a
constraint: author the new tree first, validate live, THEN re-baseline `EXPECTED_TREE` in
`proof-storybook-ia.mjs` as the FINAL step (the fixture is currently a verbatim copy of the current tree — a
regression-lock AGAINST reinvention). Confirm aurora + the blob trio stay in Substrates (correctly placed —
the §6.2 "misfiled?" suspicion is stale); split `glass-panel` out (a glass-tier cascade, not a mountable
background — and W20 retires it anyway). Delete the manifest rows for the W19/W20-removed primitives + the
W28/W29-removed instrument families. REGISTER `proof:storybook-complete` in `gates.mjs` (the totality gate
that exists but was never wired). **SEAT `fourier-field` in the Substrates band** — a story SIBLING to
aurora/goo-blob/constellation/glass-material (§7 / REQUIREMENTS §26.4: the fourth signature graphics-substrates
primitive belongs in the SAME Substrates home, NOT a deck-local afterthought; W43 ships the story + its
manifest row, W18 authors the tree + re-baselines `EXPECTED_TREE` LAST including the fourier-field row). The
surviving-set the IA seats = aurora + the blob trio + constellation + glass-material + **fourier-field**.

**foldsFindings.** Slice 15 F2/F6 (root: AV.W10's one-pass collapse was frozen by a fixture the instant it
landed — a regression-lock that PREVENTS the ground-up reinvention §6.1 demands; fix: author the tree first,
re-baseline the fixture last). Slice 15 F0 (aurora/blob correctly in Substrates; reframe the category). Slice
15 F1 (the dock category — coordinate with W06). Slice 15 F4 (the §7 items mix removals/recats/component-decisions;
the IA owns the manifest-row deletions + gate re-baseline, sequenced after the component slices rule). Slice
15 F5 (register the unwired totality gate). Slice 15 F3 (the token-ladder prune is already done — verify, don't
re-open; the W06 dock-active-tokens deletion is the real residual).

**CONVERGE folds (digest).** The merged-but-untrusted AW.W28 demo dock-nav SHELL (SidebarDock + BottomDock,
`demo/layout/dock-nav.css`) + the AW.W31 coherence audit are NOT silently trusted — the dock-nav SHELL
rebuild on the AX-rebuilt dock + the cross-surface re-audit move to a sibling wave (W40, F band) so W18
authors the IA CATEGORY TREE and W40 rebuilds the nav shell ON it (W40 dependsOn W18 + the dock band). W18
adds W40 to its Blocks list. Use the muster WC design slices as the concrete catalogue of under-adopted
glass-ui idioms (ToggleChip, vertical DockLayerGroup, the editorial type pairing, the 5-rung glass ladder,
useStaggerReveal/scroll-driven.css) when authoring the §16.3 idiom census (W34).

**gate.** `proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:storybook-complete` re-baselined to
the reinvented tree and run as a coherent triad. VISUAL-TRUTH: live navigation audit of every section.

---

### AX.W19 — Primitive prune A: header-ribbon + glyph-face + disco-glyph excision
**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00

**Scope.** Excise cleanly, no legacy alias. DELETE `header-ribbon` (a single-feature widget shipped on the
strength of ZERO binary consumers — the O-tranche promotion bar was satisfied by "has a demo story"). DELETE
`glyph-face` AND sever its `GLYPH_FACE_SILHOUETTE_KEY` provide/inject coupling (a speedtest primitive
repatriated with zero post-repatriation consumers, artificially co-dependent with disco-glyph). DELETE
`disco-glyph` (its only "second consumer" — chart-chassis-palette — is a demo manufactured at L.W3 Lane B
specifically to clear the ≥2-consumer bar; circular justification; its sole compositional purpose dies with
glyph-face). Each excision spans the dir + subpath + root barrel + `api/index.ts` + package.json exports +
typesVersions + CSS + `@import` + demo story + manifest row + any gate fixtures. Confirm the
icon-button-token-ladder is VERIFIED-REMOVED (excised at 0b27f01 — a confirm-and-close, no edit). Order:
glyph-face → disco-glyph (the coupling).

**foldsFindings.** Slice 16 F0/F1/F3 (root: substrate-without-consumer — header-ribbon/glyph-face/disco-glyph
all fail the ≥2-binary-consumer bar; the silhouette DI seam manufactures an intra-library coupling; fix:
excise fully + sever the coupling, glyph-face before disco-glyph). Slice 16 F2 (token-ladder VERIFIED-REMOVED;
do NOT touch the live TokenLadder.vue/ToneSwatch.vue chassis primitives).

**CORRECTION — "ZERO binary consumers" is FALSIFIED cross-repo (digest leverage/idiom:keyframes.js).** The
census was glass-ui-INTERNAL only. keyframes.js's `EditorShell.vue:99` is a LIVE consumer of HeaderRibbon
(top chrome bar hosting share/shortcuts/dark-mode + an #anchor slot). So the W19/W20 excisions BREAK the
keyframes.js demo build at the next bump. Per the cross-repo-DAG class (the W28→W29 native-first pattern),
the consumer migration is a HARD PREDECESSOR sequenced in **W35** (keyframes.js EditorShell → a local chrome
bar / surviving header idiom), with a born-RED cross-repo gate, landing WITH the glass-ui prune so HEAD
never breaks the optional consumer. W19's premise line is corrected to "one cross-repo consumer
(keyframes.js EditorShell), migrated in W35 before this prune publishes."

**gate.** `proof:storybook-complete` allowlist + `proof:no-orphan-demo-route` after the manifest rows drop;
the dependent gate fixtures retired; a born-RED W35 cross-repo assertion (keyframes.js off HeaderRibbon)
greens before this publishes. VISUAL-TRUTH: live confirm the storybook has no dangling routes.

---

### AX.W20 — Primitive fix: native-top-layer + card toggles + GlassPanel retire
**Band** G · PRIMITIVES · **Severity** blocker · **dependsOn** AX.W07, AX.W09

**Scope.** Fix-or-fold the broken native `<dialog>` top-layer: the backdrop uses `hsl(var(--background) / α)`
— a nested-hsl() the parser drops (the exact CLAUDE.md anti-pattern, the only 3 occurrences in the corpus).
FOLD the native-`<dialog>` capability into reka-ui `<Dialog>` as a `:native` opt-in (the manifest's stated
fix-route), OR if kept, fix the backdrop to `color-mix(in srgb, var(--background) calc(…), transparent)`.
Make the Card story toggles MEANINGFUL: the `shadow` toggle only removes a near-invisible 8%-α extra layer
on top of the tier's baked-in shadow (drop the redundant additive `shadow-card` so off = genuinely flat, or
remove the non-feature); the `grain` toggle is a 2.5% delta (raise to perceptible or cut); decouple the
card story from the broken Aurora backdrop (stage over a static working backdrop). RETIRE GlassPanel + the
JS `createGlassFilter`/`useGlassRenderer` SVG-displacement path entirely (it hard-overwrites inline styles
with hardcoded non-dark-adaptive white, stomping the per-rung CSS so all five rungs collapse to one look) —
the glass substrate IS the CSS-native `.glass-material` grammar; point any surviving story at `<Card>` / a
`.glass-material` div.

**foldsFindings.** Slice 18 F0 (root: invalid nested-hsl() backdrop; fix: fold into Dialog `:native` or
color-mix). Slice 18 F1 (root: double-shadow + sub-threshold opacity + the Aurora-dependent staging — NOT a
reka v-model binding bug; fix: make the toggles meaningful + decouple from Aurora). Slice 18 F2 (root:
GlassPanel is built on a broken + obsolete JS glass renderer that stomps the CSS; fix: retire it onto
`.glass-material`). Slice 28 F1 (the GlassRenderer detector-vs-imperative-filter split — coordinate with
§J W26). Slice 18 NOTES (the card/glass-panel demos stage over the broken Aurora — decouple so they're
independently verifiable; visual closure may gate behind W07).

**CONVERGE folds (digest).** (a) **GlassPanel cross-repo consumer migration (W35).** keyframes.js's
`EasingCurveCanvas.vue` mounts `<GlassPanel variant="wash">` as the curve-editor surface — the GlassPanel
retire BREAKS it. W35 migrates EasingCurveCanvas → `<Card surface="glass">` / a `.glass-material` div
(W20's own retire-target), born-RED gated, BEFORE the retire publishes. (b) **Native-drawer substrate ASK
(muster+speedtest, ≥2-consumer-gated)** — evaluate as an explicit scope arm whether the muster+speedtest
ask (a `popover="manual"` + scroll-snap-detents + scroll-driven `@property` backdrop GlassNativeDrawer / a
`Drawer :native` opt-in) fits W20's dialog-native fix-or-fold, sidestepping the vaul-vue activeSnapPoint
re-snap bug (AN.W3); if it exceeds W20's scope, route to a named destination (do NOT drop it — it is real
cross-repo debt with two named consumers and no current home). (c) Note: fourier hand-rolls "cartoon cards"
at 14 files via a resurrected dead `.cartoon-card` class shimmed onto `cartoon-surface` — confirm
`<Card surface="cartoon">` is the documented migration target (the adoption leg routes to W34).

**gate.** A no-nested-hsl() sweep; a card-toggle perceptibility assertion; a born-RED W35 cross-repo
assertion (keyframes.js off GlassPanel) greens before this publishes. VISUAL-TRUTH: live audit that each
toggle produces a visible change over a working backdrop.

---

### AX.W21 — Primitive recategorize-ledger + barrel coherence + metric-pill reconcile
**Band** G · PRIMITIVES · **Severity** minor · **dependsOn** AX.W18

**Scope.** Close the recategorization ledger (most items were ALREADY resolved by AV.W10 — the §7 directive
is a verbatim pre-AV.W10 recapitulation): mark hover-popover + configurator-story-placement satisfied-by-AV.W10,
verify-only. Fix the REAL configurator defect — it is exported from BOTH the root barrel AND `/configurator`,
yet the root-barrel cherry-pick rationale EXPLICITLY lists it among the EXCLUDED packages (a live
contradiction): either demote it to subpath-only (the idiomatic choice matching dock/aurora — a 956-line
family) or excise the false exclusion line. Disambiguate the drawer live-behind story (retitle / fold into
the single Drawer home; STOP exposing the half-working Peek/Half/Full open-detent buttons that hit the
vaul-vue upstream re-snap limitation). Justify use-token-color (well-formed, load-bearing — annotate the
reference-shelf blurb with the vueuse-free/SCC-trap-aware rationale; do NOT restructure). Give metric-pill a
`/metric-pill` subpath (surface asymmetry — metric-badge has one, pill doesn't) OR fold it into the W29 prune.

**foldsFindings.** Slice 17 F0/F1 (root: stale pre-AV.W10 directives; hover-popover + configurator already
moved; fix: ledger-close + the configurator root-barrel/rationale contradiction). Slice 17 F2 (drawer
live-behind: a discoverability/naming problem + misleading open-detent buttons; fix: disambiguate + excise
the half-working buttons). Slice 17 F3 (use-token-color: justify-and-annotate, not restructure). Slice 17
F4 (the metric-pill subpath asymmetry — reconcile here or via the W29 prune; MIGRATION.md honesty).

**CONVERGE folds (digest).** (a) **Configurator A-1/A-2 (fourier-booked to glass-ui's own AT/3.3.0
successor, then dropped — dropped constellation debt).** A-1: a token-first machined-groove inter-row
divider-rule opt-in on ConfiguratorLayer/ConfiguratorRow (a panel data-attr porting the `.instrument-rail`
twin-line groove via `--surface-tint-*`). A-2: label/sub class-swap to the typography-ladder rungs
(replacing the magic `text-sm font-semibold`/`text-micro font-mono` literals — restyles EVERY configurator
label across consumers, so it needs π-lane visual verification). Witnesses: fourier J.W5/K (consumer #1) +
a glass-ui demo story (#2). **A-1's source (the `.instrument-rail` twin-line groove recipe) is EXCISED by
the W29 twin-line-divider @utility removal** — A-1 must CAPTURE the recipe BEFORE W29 prunes it (sequence
A-1 with/after W25b's utilities carve but before W29). (b) **Drawer `spring`/`transition` prop** (the
keyframes consumer ask, genuinely open at HEAD; SpringProgress already ships) — fold into the drawer-touching
scope here. (c) **MIGRATION.md honesty repair MOVED OUT of the W28/W29 chain into W21** (digest
harden:storybook-primitives): the metric-cell/stack "RETIRED (AV.W10)" entry is a BINDING-DOC lie (L
invariant 16) that must NOT ride the entire tranche to W29 — fix it NOW (rewrite the §RETIRED entry to tell
the truth: un-retired, speedtest-consumed) + add a `proof:no-retired-survivor` gate (every MIGRATION.md
"RETIRED" claim resolves to zero surviving dir/subpath/export/token; gate registration → W33). (d) Note the
Configurator `asideSide`/`asideWidth`/`--configurator-aside-min` CLS-fence surface is already shipped (AS)
— the muster ASK is satisfied, adoption-gated on a pin bump (W34). (e) **LabeledField feature-gap (fourier
under-featuring + the W32/muster DeckGate error-pattern ask).** fourier's audit surfaced `LabeledSlider`
under-featured: ship an optional (non-required) tooltip, an inline numeric input, and a value-color hook so
consumers stop hand-wiring the label+control around it. Co-decide the glass-ui **Input invalid-state
contract** here (the W32 DeckGate + muster SettingsDialog/ConstraintsLayer "adopt the LabeledField error
pattern" asks need the contract, not adoption-only — verify the `useUserInvalidAria` bridge composes with
LabeledField's error slot). This is a feature-gap fold (NOT a new wave) since W21 already touches the
labeled-field/drawer surface.

**§20 CROSS-SESSION HAND-OFF folds (kf-G-3 + kf-G-5 + kf-G-6 — the keyframes.js + USF API asks routed to
W21).** (a) **kf-G-3 (HIGH, NEW) — `LabeledField orientation="horizontal"`** (label-LEFT / value-RIGHT, the
macOS/iOS settings-row idiom, distinct from the labels-above data-entry-FORM idiom). Add an
`orientation`/`inline` prop laying the row `grid-template-columns: auto 1fr; align-items:center` with
`.error { grid-column: 1 / -1 }` — every `Labeled*` consumer inherits the compact settings-row by ONE prop
instead of re-authoring a `grid-cols-[auto_1fr]` wrapper (`.labeled-field` is block-flow today,
utilities.css:62). Sub-ask: a **label-row ACTION slot** (`<LabeledField>` exposes only `default`+`error`
today — a label-row action slot lets an "edit pencil" sit in the label row idiomatically). This is the
DURABLE home for kf's controls-row layout; it composes with the (e) LabeledField feature-gap above. Gate: kf
`proof:single-column-pack` label-left clause. (b) **kf-G-5 — `<DrawerContent spring>` prop** (confirms the
(b) Drawer-spring fold above): vaul `DrawerContent` uses 500ms `cubic-bezier(.32,.72,0,1)` (drawer.css:30); a
`spring` prop (SpringProgress curve ~240-300ms) lets consumers opt into the springy register. LOW/BOOK. (c)
**kf-G-6 (LOW/OPTIONAL) — a named `surface="cartoon" tier="quiet"` preset/alias** (kf sets the pair on ~14
panel Cards; born-GREEN today via the explicit pair) — expose a named register ONLY if wanted. Gate: kf
`proof:glass-and-cartoon`. All three carry born-RED cross-repo consume gates routed through W34/W35.

**gate.** `proof:storybook-ia` for the placements; a root-barrel-vs-rationale consistency check;
`proof:no-retired-survivor` authored (registered in W33); a `proof:configurator-divider-rule` /
typography-ladder computed-style probe for A-1/A-2. VISUAL-TRUTH: live audit that the four recategorized
stories read coherently + the configurator divider-rule + ladder-bound labels render.

---

### AX.W22 — Font register reconciliation: one brand register, default == rendered
**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00

**Scope.** Pick ONE coherent register model and make the library DEFAULT be the register the consumers
render — no preset opt-out, no inert face. The evidence says the brand register is **Plus Jakarta Sans**
(text/display) + **Fira Code** (mono) — what speedtest + demo actually render, carrying a Capsize-calibrated
fallback proving it was meant to be the default. Repoint the library tokens so Plus Jakarta is the default
body/display family; the body should default to the sans stack (a display serif is wrong for body copy —
the visual root of "fonts none are correct"). EXCISE Fraunces entirely (the dir, the @font-face, the
WONK/SOFT variation machinery, the fourier-f utility, `proof:font-axes` — it shipped to satisfy a self-imposed
dangling token, doubling the critical font payload by ~40KB). Collapse the brand-uniform-sans escape-hatch
preset + its three sub-overrides (indirection that exists only to undo a wrong default). Consolidate all
font tokens to ONE source. Rewrite the typography.css header + fonts README to the actual register.

**foldsFindings.** Slice 20 F0 (root: three incompatible design intents stacked over the AC→AU arc, never
reconciled — Plus Jakarta as the brand register, then AU.W4 shipped Fraunces and repointed display/serif at
it to make a self-imposed token non-inert; fix: one register, default == rendered). Slice 20 F1 (root:
Fraunces is substrate-without-consumer institutionalized by `proof:font-axes`; fix: excise, drop ~40KB).
Slice 20 F3 (root: each layer patched the prior's wrongness — the preset undoes the wrong default; fix: the
indirection collapses once the default is correct). Slice 20 F2 / 27 F6 (the font-token ownership across
3 files; the body-defaults-to-Fraunces root).

**HARD PRECONDITION — adjudicate the Fraunces cross-constellation contradiction BEFORE any excision (§4
note 17; digest hist:muster + hist:words).** W22 excises Fraunces (dir + @font-face + WONK/SOFT machinery +
`proof:font-axes`); but the glass-ui AS deferred ledger carries P5 "self-hosted full-axes Fraunces @font-face"
as a FOLD with ≥2 named consumers (value.js + words + slides clear the ≥2-consumer gate), AND muster K +
words A.W5 design slices both WANT the WONK/SOFT axes. The library SPECIFIES the WONK/SOFT axes
(typography.css:98) that NO shipped face carries — silently inert. AS-P5 (ship the face that makes the axes
load-bearing) and W22 (excise it) CANNOT both be true. Adjudicate in the W22 spec §Archaeology with the
value.js+words+muster+slides consumer roster as evidence, ONE of two paths: **(a)** the brand register is
Plus-Jakarta+Fira and Fraunces is genuinely dead → KILL AS-P5 (do NOT ship), re-ground words A.W5 +
value.js + slides onto Plus Jakarta (document the repoint per the clean-break precept); OR **(b)** Fraunces
is the intended display face → W22's premise is wrong; SHIP the full-axes self-hosted @font-face (making the
axes load-bearing), keep display=Fraunces / body=sans, re-scope W22 to "fix the wrong BODY default, NOT
excise the face." Unadjudicated, W22 strands ≥3 downstream consumers. The fix to "body defaults to a display
serif" (the visual root of "fonts none are correct") holds under EITHER path.

**CONVERGE folds (digest).** External font-preset consumers: speedtest sets
`data-typography-preset="brand-uniform-sans"` + a `@theme` re-alias + a `--font-serif` body override; words
maps all three font roles to Fraunces + bodies on `var(--font-serif)`. Both must repoint when the default
changes (adoption legs route to W34); run the W22 π-lane font gate against the speedtest + words LIVE
surfaces, not just the demo.

**gate.** `proof:font-canon` (cheap static) PLUS a π-lane visual-truth font gate: load the live demo,
`document.fonts.ready`, `getComputedStyle` on body + each `.text-display-*` / `.fira-code`, assert the
resolved first-loaded face matches the intended register (canvas width-fingerprint to distinguish the real
face from a metric-matched fallback) — fail RED if body renders Georgia/system-serif. VISUAL-TRUTH: the live
cascade-paint assertion replaces the static-only font gates.

---

### AX.W23 — Carousel indicator re-author + glass-scrubber decision
**Band** H · SLIDERS · **Severity** blocker · **dependsOn** AX.W00, AX.W09

**Scope.** The slider half of §9 is DONE (AV.W11 — two-only collapse + the fully-rounded 50% knob, both
visually-true); the carousel half is the genuine BLOCKER. Re-author `CarouselDots` from first principles as
a token-adaptive, dark/light-safe position-dot rail: (a) inactive dots paint a surface-tint rung with
contrast on a translucent surface in BOTH schemes (not `bg-muted-medium`, invisible dark-on-dark); (b)
excise the dead `scale-[var(--scale-hover)]` arbitrary class that emits NO CSS (the Tailwind-v4
var-in-arbitrary content-scan non-emit, same family as the W24 card-lift snag) — drive active emphasis
through the width morph + a real emitted utility. Fold the deferred AW.W30 carousel-restyle scope (shell
`.glass-material`, item four-state, data-slot coverage, unified spring vocabulary) into the SAME wave (it
shares the write surface). Adjudicate the §9.1 glass-scrubber naming: either ACCEPT the AV.W11 reading
(`standard` stays the CVA key, glass-scrubber the prose name — zero call-site churn) OR rename
standard→glass-scrubber across the CVA keyset + every consumer call-site (clean break, no alias) —
USER-ADJUDICATED, not a runtime defect.

**foldsFindings.** Slice 21 F4 (root, blocker: THREE compounding causes in CarouselDots — `bg-muted-medium`
invisible on the translucent dark card, the dead `scale-[var(--scale-hover)]` non-emit, the position
relying on `w-6` alone; fix: re-author as a token-adaptive dark/light-safe rail). Slice 21 F5 (fold the
AW.W30 carousel restyle — same write set). Slice 21 F0/F1/F2/F3 (the slider half is done; the glass-scrubber
rename is a user-adjudicated naming decision, not a defect). Slice 31 F6 (the glass-scrubber rename fell
between "done" items — schedule it explicitly).

**CONVERGE folds (digest).** (a) The slides `DeckPager` φ²-pill dot-rail (DeckPager.vue:115-137 + deck.css
§8) is a WORKING reference oracle for the CarouselDots re-author (token-adaptive, dark/light-safe,
target-size — solves exactly the Slice 21 F4 defects); cite it as the oracle. (b) The dead
`scale-[var(--scale-hover)]` non-emit is ONE instance of the var-in-arbitrary content-scan CLASS the user
wants ROOT-CAUSED — the tree-wide sweep + guard gate is W27a (this wave excises the carousel instance; W20
the card instance). (c) **muster slider consumer port** — muster's SignalsLayer + CommandPalette drive
`<Slider variant="glass-pill">`, a variant the §9 consolidation RETIRES; the §9.3 "ALL consumers port to
this" enumerates muster's two call sites → the surviving standard/glass-scrubber key (adoption leg routes to
W34). (d) Note the keyframes.js LIGHT-barrel `flip()` trigger so the rebuilt carousel can later adopt the
shared primitive.

**gate.** `proof:slider-two-only` re-registered; `proof:carousel-glass-atoms` with an explicit dot-contrast
assertion (inactive dots resolve a measurable contrast against a translucent dark surface) + a no-dead-class
assertion. VISUAL-TRUTH: live audit of the carousel indicator on a dark page.

---

### AX.W24 — Deck-progress LIBRARY-side: export the subpath + fix the rail recipe
**Band** I · DECK · **Severity** major · **dependsOn** AX.W00

**Scope — LIBRARY-SIDE ONLY (the slides-side port moves to W32; §4 note 18).** The §10 "slides primitive /
deck" requirement is NARROWER than its phrasing — there is no `/deck` family to build (the slides deck
engine is correctly slides-local single-consumer logic; lifting it would manufacture
substrate-without-consumer). The ONLY library surface in scope is the bottom-bar rail LOOK. Add the
`/deck-progress` flat subpath (a trivial `src/subpaths/deck-progress.ts` mirror + the export entry — the
batch glob handles the chunk) so slides CAN import `DeckProgress` on the minimal-payload path. Fix the
recipe's cascade-layer inversion (`.glass-progress-rail` in `@layer components` cannot beat a `bg-primary`
utility — author it in `@layer utilities` or read fill/track from `--progress-fill`/`--progress-track`
tokens) and the leading-edge glow clip mismatch (render the glow as the indicator's trailing inset edge
inside the clip), and the var-in-arbitrary non-emit class if any rail class uses it. Register the missing
`proof:deck-progress-rail` package.json scripts entry, upgraded from a string-scan to a render assertion.

**CORRECTION — the slides `.deck-progress` → `<DeckProgress>` replacement is W32, NOT here (digest
harden:storybook-primitives).** W24 was double-assigning the cross-repo slides edit (also claimed by W32),
and W24 dependsOn only W00 — but the slides edit requires the H working-tree landed on a clean branch first
(W30) and lives in the separate slides repo. So: W24 is library-side; the slides-side replacement +
overriding the `--progress-rail-*` tokens + the consumer-#2 clearance ALL happen in W32 (which dependsOn
W24 + W31, in the slides band). The binary invariant stays UNcleared until W32 lands — W24 does NOT claim
"making slides consumer #2." The PAGE-BOTTOM-not-dock placement (§10) is the slides-side concern (W32).

**foldsFindings.** Slice 22 F0 + 24 F2 (root: the ≥2-consumer rule that justifies DeckProgress is UNSATISFIED
— AW.W16 shipped on a promise that never ran; no `/deck-progress` subpath so slides literally cannot import
it on the minimal path; fix: export the subpath + port slides, one direction, no parallel rails). Slice 22
F1 (root: the cascade-layer inversion — a component-layer rule cannot beat a utility; fix: author in
@layer utilities or token-read). Slice 22 F2 (root: the glow clip mismatch; fix: trailing inset edge inside
the clip). Slice 22 F3 (root: the `proof:deck-progress-rail` scripts entry was never registered; fix:
register + a meta-gate). Slice 22 F4 / 24 F4 (root: the /deck engine stays slides-local — ratify, stop
carrying lift-pending debt; do NOT lift useDeck/useDeckNav/DeckPager).

**gate.** `proof:deck-progress-rail` registered + upgraded from a string-scan to a render assertion.
VISUAL-TRUTH: live audit that the rail paints the look (thin track, token fill, leading-edge glow) and the
slides bar sits at page-bottom.

---

### AX.W25a — CSS god-module gate-extension: born-RED, .css-aware, ci-tagged
**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W27a *(gate-tag MODEL precedes)*

**Scope (SPLIT from the old W25 — lands FIRST, born-RED; §4 note 19).** Extend `proof:no-god-module`'s
collector to scan `.css` (it only accepts `.ts`/`.vue` — the four CSS god-modules were structurally
invisible; AV.W13's "largest now 475" was true only for TS/Vue) AND re-tag it `['local','ci']` so it bites
in CI (RED at HEAD on useMetaballRenderer 569 but tagged local-only). This step lands BORN-RED-CORRECT: the
instant the collector accepts `.css` it reports 4 new violations (tokens/dock/utilities/glass), cleared by
W25b (+ W06 for dock). The gate-extension is its own step so there is a green intermediate — a single
combined wave could never pass its own gate until every carve is done. Also fix the DIST `@source`
content-scan deadlink — published `dist/styles/index.css` carries `@source "../components"` resolving to a
`dist/components/` dir that DOES NOT EXIST (the dist is a flat `dist/*.js` chunk set), so the library's own
component-template content-scan scans nothing in a consumer's production build (value.js gh-pages confirmed);
re-point it to the real dist chunk location so the library is self-sufficient.

**foldsFindings.** Slice 25 F0 (gate collector .css-blind + local-only — the headless-green pattern on a
structural gate). Digest idiom:value.js (the dist `@source` deadlink — jointly a glass-ui packaging defect
+ a consumer `@source`-directive gap routed to W34). The audit's gm0 staging (born-RED-first) preserved.

**gate.** `proof:no-god-module` (.css-aware, ci-tagged) reports the 4 expected born-RED violations; a dist
`@source`-resolves probe (the directive points at an existing dir). NO visual surface — structural.

---

### AX.W25b — CSS monolith carves: tokens §-seams, utilities relocation, dead-chain excise
**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W25a, AX.W06, AX.W09, AX.W22, AX.W29 *(utilities portion only — the metric-ownership decision)*

**Scope (SPLIT from the old W25 — clears the W25a born-RED).** Carve the CSS monoliths using the proven
dock-controls.css carve pattern (sibling `.css` in the same `@layer`, @imported in cascade order):
`tokens.css` (1728) → `src/styles/tokens/` partials along its §-numbered seams (structural / color / glass /
paper); `utilities.css` (1119) → RELOCATE component-coupled recipes to their owning component's CSS (the
metric-badge ~190-line block, labeled-field error contract, section-description) + carve shared atoms.
Excise the dead floating-panel chain (CSS + keyframe + theme alias — its consumer was retired). Rename
`glass-specular-track.css` → `glass-material.css` and fix the stale cross-file doc pointers. (dock.css is
split in W06.)

**CORRECTIONS (digest harden:encapsulation-close).** (a) **glass.css (691) is NOT carved for length** — the
audit is emphatic it has a SINGLE cohesion axis; a forced split is contrivance (violating §0 no-contrivance).
The CSS-aware gate's ceiling rationale is cohesion-not-length for single-axis files; keep a minimal
`glass/material.css` (~175 lines) split ONLY if the gate forces it, documented as the sole acceptable glass
split. (b) **The utilities.css carve SEQUENCES AFTER the §7/§8 metric-ownership decision** (W28/W29) so the
~190-line metric-badge recipe relocates to the RIGHT repo — hence the W29 dependsOn on the utilities portion
(sub-wave the tokens carve, which is unblocked, from the utilities carve, which is gated). (c) **A-1's
`.instrument-rail` twin-line groove source may MOVE in this carve** — sequence the W21 A-1 capture before
W29 prunes the twin-line @utility.

**foldsFindings.** Slice 25 F1/F3 (organic accretion; utilities is the junk-drawer; §-seam partials for
tokens, RELOCATION for utilities). Slice 27 F0/F1/F2/F5 (the tokens/utilities carve + floating-panel
dead-chain excise + glass-specular-track rename). Slice 27 F7/F8 (fragile-chain + archaic-CSS clean — no
action). The harden glass.css-overreach + utilities-sequencing + gm0-staging corrections above.

**gate.** `proof:no-god-module` (.css-aware, ci-tagged) GREEN on the splits. VISUAL-TRUTH: the splits are
isomorphic (same @layer, same cascade) — a regression screenshot-diff confirms zero visual delta.

---

### AX.W26 — TS god-module + state encapsulation
**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W08, AX.W16, AX.W20

**Scope.** Split `useMetaballRenderer.ts` (569, RED at HEAD) into two cohesive colocated modules:
`metaball-program.ts` (the pure program-build leaf) + `uploadMetaballUniforms.ts` (the pure per-frame
upload). Encapsulate the dock state machine: delete `syncDerived()` + the two imperatively-mirrored writable
refs — `expanded`/`isPinned` become pure `computed()` derivations (impossible to desync); stop exporting the
speculative `useOptionalDockLayerGroupContext` (substrate-without-consumer); harden the strict-context guard
to `=== undefined` (not `!ctx`, which mis-fires on falsy contexts). Re-base the sidebar composables onto the
library's motion/dom primitives (replace the hand-rolled damped-rAF in `useSidebarFollow` with `useSpring`;
factor the repeated addEventListener set). Split `useGlassRenderer` into the pure reactive detector vs the
imperative filter (coordinate with W20's GlassPanel retire — the filter dies with it). Replace the keyboard
registry `Set` + manual version counter with a tracked reactive collection. The composables/state layer is
otherwise EXEMPLARY (the AV.W14 DI factory + WebGL substrate + useSortable orchestrator) — do NOT re-litigate.

**foldsFindings.** Slice 25 F4 (the useMetaballRenderer split). Slice 28 F0 (the dock derived-state →
computed). Slice 28 F3/F4 (the speculative optional-context excision + the strict-guard `=== undefined`
fix). Slice 28 F2 (the sidebar re-base onto motion/dom primitives). Slice 28 F1 (the GlassRenderer
detector/filter split — coordinate with W20). Slice 28 F5 (the keyboard-registry reactive-collection
cleanup). Slice 25 F5 (the warn-band files split AS PART OF the §1/§2/§6 rewrites, not in isolation). Slice
28 NOTES (the layer is in good shape — surgical, not a rebuild).

**gate.** `proof:no-god-module` (TS) green on the splits. VISUAL-TRUTH: the dock/sidebar/blob behave
identically post-split (live regression audit).

---

### AX.W27a — Legacy gate-hardening: barrel scrub + tag-parity + var-in-arbitrary guard
**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W00 *(the gate-tag MODEL decision is W27a's first act, shared with W25a)*

**Scope (SPLIT from the old W27 — small, mechanical, unblocks CI-RED; §4 note 20).** Scrub the 3 barrel
tranche-letter refs. Promote `proof:fail-explicit` + `proof:no-legacy-commentary` to release-parity — but
**ONLY these 2 mis-tagged legacy gates** (the audit justified promoting exactly these; it did NOT mandate
release on all 71 static gates). The tag-parity meta-assertion is the **at-LEAST-ci** form (the manifest's
real parity claim is local==ci; release is a deliberate subset), with the 2 legacy gates tagged
`['local','ci','release']` as the named exception. This RESOLVES the W25/W27 internal contradiction (the old
W27 "ci+release on every static gate" would have flagged W25's own `['local','ci']` choice + redded 50
unnamed gates — see §4 note 21). **Author the var-in-arbitrary content-scan-non-emit ROOT-CAUSE sweep + a
guard gate** (the card-lift snag CLASS, §13 "root-cause not inline"): a gate that fails on a dead arbitrary
class like `scale-[var(--scale-hover)]` emitting no CSS — the carousel (W23) + card (W20) instances are
symptoms of this class.

**foldsFindings.** Slice 26 F0/F4 (legacy string-gates mis-tagged local-only — gate-WIRING not gate-LOGIC).
Digest aw-delivery (var-in-arbitrary root-cause class, §13 root-cause-not-inline). The harden W25/W27
tag-model + gate-tag-MODEL-precedes-both reconciliation.

**gate.** `proof:tag-parity` (at-least-ci form, 2 legacy gates promoted as the named exception);
`proof:no-dead-arbitrary` (fails on a var-in-arbitrary class emitting no CSS). No visual surface — structural.

---

### AX.W27b — Legacy commentary full-tree sweep + Card stale-prop finalize + scripts test-boundary
**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W27a

**Scope (SPLIT from the old W27 — the LARGE mechanical sweep, sized as its own wave).** Generalize
`proof:no-legacy-commentary` from the 2-file barrel allowlist to a full src/ + scripts/ walk (the
"greenfield no meta" mandate is about ALL artifacts) reporting tranche-letter refs `\b[A-Z]{1,2}\.W\d`, bare
`tranche`, and `vN.N.N` literals — paired with a one-time scrub of the **878 refs across the tree at HEAD**
(the audit measured 516/181 files; the tree grew to 878 — this is a large mechanical sweep, NOT a 3-ref
barrel fix, which is why it is its own wave per digest harden:encapsulation). The scrub DISTINGUISHES "delete
pure landed-at-X.Wn notes" from "rewrite design-WHY as tranche-letter-free decision-rationale prose" (the WHY
survives, the tranche letter dies). Finalize the Card stale-prop migration shim (the W6 typed-reject endgame,
or excise — consumers all migrated at Q.W2-W4, so it watches for prop names no live consumer passes). Extend
the test/source boundary to scripts/ (relocate the 3 gate self-tests to tests/scripts/ or encode the
exemption).

**foldsFindings.** Slice 26 F1 (the 2-barrel scope accreted tranche-letter archaeology tree-wide; full-tree
walk + scrub — sized as its own wave). Slice 26 F2 (the stalled Card stale-prop ratchet). Slice 26 F3 (the
scripts/ test-boundary asymmetry). Slice 26 F5 (the crayon strokeMode legacy special-case — disposition is
W13, not the legacy lane). Digest devDep-vs-peer range parity (keyframes.js + value.js) folds here.

**gate.** `proof:no-legacy-commentary` (full-tree src/+scripts/, ci+release via the W27a model). No visual
surface — structural wave.

---

### AX.W28 — Speedtest native-first receive (cross-repo)
**Band** K · SPEEDTEST · **Severity** blocker · **dependsOn** AX.W00

**Scope.** Drive the 3-stage repatriation DAG (inv-16' native-first / prune-after) — the chronic
muster-block. glass-ui writes NO sibling source; it authors the handoff annexes, the sibling sessions
execute. speedtest + muster each land NATIVE copies of metric-cell (near ResultDetailSheet), metric-stack
(near ResultStack — MetricStack + MetricRow), and instrument-chassis (near App/MapView/ChartsView — both
the glass dial AND the spine register) + rewire every import site to local + de-glass-ui those imports.
Author the speedtest-side born-RED `proof:repatriate-local` gate: assert the 3 families exist under
speedtest src/components/, assert ZERO `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}`
import survives, assert SUBPATH_OWNED no longer needs them. Reconcile the stale metaball→goo-blob
SUBPATH_OWNED entries in the boundary check. This wave BLOCKS the glass-ui prune (W29).

**foldsFindings.** Slice 23 F0 (root: an architectural sequencing wall — the R0 native-first half NEVER ran
in either consumer, so the glass-ui prune is gated behind it; fix: drive the DAG to completion as ordered
native-first waves). Slice 23 F4 (the boundary-check SUBPATH_OWNED drift + the repatriate-local gate). Slice
19 F1 (the twin-line-divider @utility loses both consumers atomically — the native copies inline their own).
Slice 31 F5 (the user's §7 REMOVE directive is blocked by the ≥2-consumer invariant — repatriation FIRST
drops the count to 0 and unblocks the prune).

**CONVERGE folds (digest).** (a) **muster is the SECOND blocking consumer — make its exact surface explicit
in the annex.** muster's entire app shell is `<InstrumentChassis variant="spine">` wrapping `<Configurator>`;
it consumes all three families — instrument-chassis (BOTH `variant=spine` for App.vue AND `variant=glass`
for WinnerHero, + ChassisDivider for InstrumentAside, + the InstrumentChassisPhase type in
App/VerdictStage/WinnerHero/useMusterApp), metric-cell (TravelMatrix), metric-stack (MetricStack+MetricRow
near RankedVerdict/WhyThisWonSheet). muster lands native copies under frontend/src/components/, rewires +
de-glass-ui's all import sites, born-RED `proof:repatriate-local`. (b) speedtest native landing: metric-cell
near ResultDetailSheet, instrument-chassis near App.vue/useRouteTransition; the native metric-stack copy
ships a `--metric-stack-row-gap` token (discharges the ResultStack doubled-specificity override);
instrument-rail correctly has ZERO live consumers (orphan-prune, NO native receive). (c) **Clean-sibling
precondition — a born-RED gate-0 in the DAG** (digest harden:encapsulation): the receive ASKS cannot
dispatch until speedtest + muster each present a CLEAN working tree on a known branch (orchestrator-verified
— speedtest carries a stale stash + 23-ahead reconcile debt; this is the exact dirty-tree wall that
muster-blocked the prune across AV/AW). Encode `R-clean → R0-receive → W-prune → R1-bump` with the
sibling-baseline-capture ritual. (d) **Expand band K beyond pure repatriation:** the speedtest R-CONSUME
tail (the now-consumable VT re-founding + the H10 stopgap-revert checklist + the dark-default pin against the
AX-published glass-ui) is the speedtest LEAD the moment AX cuts a release — the metric native-first receive
is only one strand (routes through W34's cross-repo ledger + W41 publish hinge). All cross-repo state
declared in `coordination/CONSTELLATION.md`.

**gate.** A born-RED gate-0 (`R-clean`: both siblings clean on a known branch); born-RED `proof:repatriate-local`
(speedtest-side + muster-side) flips GREEN. VISUAL-TRUTH: the speedtest + muster surfaces render unchanged on
their native copies (cross-repo live audit).

---

### AX.W29 — glass-ui repatriation-prune + orphan-prune
**Band** K · SPEEDTEST · **Severity** major · **dependsOn** AX.W28

**Scope.** With both consumers on native copies, glass-ui strikes with zero residue. REPATRIATE-PRUNE
metric-cell + metric-stack + instrument-chassis (dir + subpath + root barrel + api/index.ts + tokens.css §17
+ package.json export + typesVersions + demo stories + manifest). ORPHAN-PRUNE (no native landing — nothing
receives them) instrument-rail (zero consumers since speedtest retired the cockpit posture at AN-D6/D7/D11)
and metric-pill (zero consumers; speedtest routes through MetricBadge directly — a stale "speedtest
stacked-pill default" credit). Excise the `twin-line-divider` @utility + its tokens (loses both consumers
atomically) and the dead GlassDock `variant="instrument-strip"` (rail is the surviving vertical register).
Update the chassis-hardcoding gates (twin-line DRY clause, static-consumer census, IA registry, the
container-context entry). KEEP the generic atoms (metric-badge, scrolling-text, pulse, status-dot,
animated-digit) — generic-atom-vs-domain-composition, not raw consumer count — and encode the false-coupling
guard (metric-cell/stack import only vue+cn, no MetricBadge). Reconcile MIGRATION.md honesty. CORRECT the
AW.W19 plan's stale "subpath only" surface claim — the root barrel IS in scope (a surviving dangling
`export *` = build break).

**foldsFindings.** Slice 19 F0/F1/F2/F3/F4/F5/F6 (the chassis/rail/strip excision + the twin-line-divider +
the gate updates + the AW.W19 stale-surface correction). Slice 23 F1/F2 (metric-pill + instrument-rail plain
prune — parallel, no native-first gate). Slice 23 F3 (the keep-set + false-coupling guard). Slice 17 F4
(the metric family §8 ownership transposition + MIGRATION.md). Slice 31 F5 (the §7 prune unblocked
post-repatriation). Slice 23 F4 (CLAUDE.md ChassisDivider sweep).

**gate.** `proof:storybook-complete` + `proof:no-orphan-demo-route` + the updated chassis gates; a
no-dangling-export sweep. VISUAL-TRUTH: live confirm the demo + the published surface have no broken
references post-prune.

---

### AX.W30 — Slides baseline: land the H working-tree + fix the constellation Canvas2D leak
**Band** L · SLIDES · **Severity** blocker · **dependsOn** AX.W17 · *(separate repo, tracked)*

**Scope.** Before any AX slides content wave: land the H-tranche til-briefing working-tree (DEV-COMPLETE but
stranded as uncommitted state on the `deck/feedback-coder` branch) on a clean `tranche/AX-slides` branch
(orchestrator owns the index — agents stay read-only) so the dev work is recoverable + reviewable. Fix the
CARDINAL constellation defect: `constellation.ts:107` reads the neutral edge color from `--foreground` (a
`light-dark()` value Canvas2D REJECTS — leaving `strokeStyle` stuck on the previously-set red accent → 86.3%
red splatter, NOT a neutral lattice). Promote a `--constellation-edge` plain-hsl token (light + dark arms,
as H.W4 did for the node tokens) and read it. Execute the authored-but-unrun e2e specs across the render
matrix (390×844 / 768×1024 / 1280×720 / export frame) — converting every H "done" claim from green-but-unrun
to live-verified. Tighten the constellation pixel guard to alpha-weighted opaque pixels + include `--foreground`
in the no-light-dark-in-canvas assertion.

**foldsFindings.** Slice 29 F6 (root: the H tranche was dev-only on a moving branch without per-tranche commit
discipline, then stranded; fix: land on a clean branch + execute the e2e specs). Slice 30 F0 (root,
LIVE-BLOCKER: the `--foreground` light-dark()-into-Canvas2D leak; fix: a `--constellation-edge` plain-hsl
token). Slice 30 F1 (root: the entire H W2-W10 authored guards without executing them; fix: every slides-visual
wave closes on an EXECUTED Playwright + frontend-design audit). [This is the slides-side complement to the
library-side constellation tokens of AX.W17.]

**CONVERGE folds (digest hist:slides + idiom:slides).** (a) **The H working-tree is NOT clean uncommitted
state on branch HEAD** — it is uncommitted changes buried UNDER 6 intervening commits (edc23e7 feedback-coder
+ 5 fourier commits) on `deck/feedback-coder`. W30 must (i) capture/stash H's W2-W10 working-tree FIRST
(orchestrator owns index), (ii) decide the feedback-coder/fourier deck disposition relative to it, then
(iii) land H on a clean `tranche/AX-slides` branch. The til-briefing slide files carry BOTH H's uncommitted
edits AND the committed feedback-coder history. (b) **A second, net-new `feedback-coder` Fourier-themed deck
exists** (5 commits today, FourierField.vue + its DESIGN/AUDIT corpus) ENTIRELY ABSENT from the charter —
enumerate BOTH decks in the L band; record its disposition (deploys? user-WIP-read-only? live second deck?).
(c) **ADOPT FourierField's probe-span `getComputedStyle()` resolution as the shared
`resolveCanvasColor(cssVar, el)` pattern** — FourierField ALREADY solves the exact Canvas2D light-dark()
defect the constellation hits (resolves the token via a hidden probe-span → a canvas-valid `rgb()`). It
generalizes to ANY light-dark() token in canvas and is a candidate for the W37 `useCanvas2D` substrate. The
leak has TWO instances (constellation.ts:107 AND FourierField.vue:231-250 probe), not one — ship plain-hsl
`--viz-fourier`/`--viz-chebyshev` tokens OR the shared `resolveCanvasColor` helper alongside the
`--constellation-edge` fix so FourierField can drop its bespoke probe. (d) **Execute ALL 7 H e2e specs**
(deck-progress, mobile-reflow, constellation-visibility, complex-graphs, dedup-pulse, xray-portal, rebuilt
deck.spec) across the render matrix — not just constellation — the π-lane visual-truth discipline is binding
on the slides repo. Adopt the bbnf sibling-baseline-capture + clean-branch landing. All declared in
`coordination/CONSTELLATION.md`.

**gate.** The executed e2e specs (all 7) + the tightened constellation guard (alpha-weighted opaque pixels +
`--foreground` in the no-light-dark assertion) in the `npm run audit` set. VISUAL-TRUTH: live render-matrix
audit confirming the neutral lattice with ONE red anomaly on cream + ink (preserving BOTH decks).

---

### AX.W31 — Slides content reframe + visual defects
**Band** L · SLIDES · **Severity** major · **dependsOn** AX.W30 · *(separate repo, tracked)*

**Scope.** The genuinely-unaddressed content gap: re-author Slide04 (PROBLEM #2) to the hypothetical/what-if
register the user supplied — lead with the general anomaly thesis ("agencies are billed for trivially small
amounts, or outrageously large ones"), present the ~$5M and $3.50 as ILLUSTRATIVE both-ends examples, excise
the named DIT/DPI/Pitt-County callouts (the G.W4/H.W9 passes did a single word-swap, not the framing
transposition the directive asks). Fix the $5M figure-clip (drop the `overflow:hidden` that exists only to
clip the ::before glow so the figure can never crop). Restore the homepage locked-deck at-rest affordance
(a standing glass lock-disc badge + a resting `filter: blur(~1px)` on the card body, text sharp). Glass-style
the access-key modal (fix the portal-scheme-inheritance gap — pin color-scheme on the teleported DialogContent
so light-dark() tokens resolve to the deck's pinned scheme). Add the mobile-reflow regression guards (the
unreset `calc(N*var(--cqx))` lint; the graph/chart min-height starvation guard). Excise dead SlideNutrition.vue;
redact the access key from committed docs.

**foldsFindings.** Slice 29 F0/F1/F5 (the Slide04 hypothetical reframe + the $5M figure-clip + the "few
dollars" de-shoehorn fold). Slice 30 F2 (the homepage lock affordance — lift the cue out of the opacity:0
hover scrim). Slice 30 F3 (the access-key modal glass restyle + the portal color-scheme fix). Slice 30 F4
(the mobile-reflow guards). Slice 30 F8 (the SlideNutrition excision + key redaction). Slice 29 F2/F3/F4
(most §12 items are RESOLVED at the code level by G/H — verify-only on a live audit, not a code wave).

**CONVERGE folds (digest aw-delivery).** (a) **RECONCILE the lock contradiction** — ADDENDUM-2 retired the
lock vs W31 restores it; strike-or-re-justify the lock-affordance + access-modal-restyle scope explicitly
(do not carry both directives unresolved). (b) Add the xray-slide negative-space/density pass + the explicit
"Open AI XRAY" button removal (the portal opens it). (c) `SlideNutrition.vue` is confirmed orphaned (deck.ts
retired it, zero non-self refs) — confirm-and-delete; preserve the cartoon-shadow deck-private namespace;
the mulberry32 PRNG dup dies with the /constellation adoption. (d) The §12 pptx-download popover is SATISFIED
(DeckSettings already ships it) — the icons + light/dark download UI beyond a deploy-200 check is a W32 note;
mark DONE in the §4 ledger.

**gate.** The mobile-reflow + chart-min-height regression guards. VISUAL-TRUTH: live render-matrix audit of
Slide04, the lock affordance, the access modal, the mobile squish — the close criterion.

---

### AX.W32 — Slides motion + form adoption + deploy verification
**Band** L · SLIDES · **Severity** minor · **dependsOn** AX.W24, AX.W31 · *(separate repo, tracked)*

**Scope.** The consumer-adoption half that never ran for any of the landed library abstractions. slides
deletes `src/deck/reveal.ts` + `src/deck/useCountup.ts` and imports glass-ui's `vReveal` (from `/motion-core`,
registered globally) + `useCountup` (from `/motion`, threading `deckEase.fn` as the injected easing) — the
`[data-reveal]`/`[data-countup]` grammar already matches (it was lifted from slides). slides ports its
bottom bar onto `<DeckProgress>` + `/deck-progress` (W24). Adopt the LabeledField error pattern for DeckGate
(or formally retire the stale "Input has no invalid state" BOOK note). Verify the xray full-height + graph
aspect-ratio commits (correct + live-verified — route the COMMIT + a live-audit gate). Add a deploy-time
assertion that `/exports/til-briefing.pptx` + `-dark.pptx` resolve 200 (deploy-pipeline dependency, not a
code wave).

**foldsFindings.** Slice 24 F3 (the abstraction shipped in glass-ui but the adoption half — slides deletes
local copies — never ran; fix: slides adopts vReveal + useCountup). Slice 24 F5 (the DeckGate LabeledField
adoption or BOOK-note retirement). Slice 30 F5/F6 (the xray + graph commits — correct, route the commit +
live audit). Slice 30 F7 (the pptx deploy verification — a live-deploy item, not a code wave). Slice 24 F4
(ratify /deck stays slides-local — stop carrying lift-pending debt).

**CONVERGE folds (digest idiom:slides).** (a) **Explicit ordered version-pin precondition:** slides bumps
its `@mkbabb/glass-ui` pin to the AX release FIRST. `vReveal` IS adoptable against the existing `^3.4.0`
(reveal.ts is a byte-equivalent fork — delete it + `directive('reveal', vReveal)` in main.ts NOW, zero
grammar change); `useCountup` + `DeckProgress` REQUIRE the AX bump. So the adoption surface is split — name
the bump as the ordered step. (b) **The slides `.deck-progress` → `<DeckProgress>` port lands HERE** (moved
from W24 per §4 note 18): replace the div + `::after` CSS with `<DeckProgress :value class="<viewport-pin>"/>`
overriding `--progress-rail-*`, making slides consumer #2 and CLEARING the binary invariant W24 left
UNcleared; the bar sits at PAGE-BOTTOM (§10). (c) **A binding-verification sweep across the major bump** (the
glass-ui-binding-verification memory — reka prop/emit drift risk on Dialog/Input/DropdownMenu/GlassDock;
this is the same sweep W03/W00 stand up). (d) DeckGate's "adopt the LabeledField error pattern" needs a
glass-ui Input invalid-state contract (not adoption-only) — fold the contract decision; verify the
`useUserInvalidAria` bridge composes with LabeledField's error slot.

**gate.** A no-local-reveal/countup assertion (slides imports glass-ui's); a no-parallel-rail assertion (the
`.deck-progress` div is gone). VISUAL-TRUTH: live audit that the reveal/countup grammar + the page-bottom
DeckProgress bar render identically post-adoption.

---

### AX.W34 — Cross-constellation analysis + idiom-maximization + consumer-adoption ledger (§16 receiver)
**Band** N · CROSS-REPO · **Severity** major · **dependsOn** AX.W00 · *(separate-repo / tracked; tranche-development-only — glass-ui writes NO sibling source)*

**Scope (the §16 zero-loss forcing-function — the single largest recap-to-charter gap the prior charter left
unrouted).** OWN REQUIREMENTS §16 in full: author `coordination/CONSTELLATION.md` (the required cross-repo
artefact per SPEC.md §Document Set — AX has all three triggers) declaring each consumer's HEAD + branch +
`git status --porcelain` tree-cleanliness at coordination time, the shared write surfaces, the
writer-vs-reader boundaries, and the conflict-resolution protocol, captured via bbnf-lang's
**sibling-baseline-capture ritual** (BC.W0c/W5d — snapshot each sibling's HEAD+status BEFORE any cross-repo
edit; reconcile at close). Then drive the three §16 sub-directives: **(§16.1)** the last-10-tranches-per-repo
deferred/dropped harvest across the 10 named repos (glass-ui, keyframes.js, value.js, fourier-analysis,
slides, speedtest, muster, words, bbnf-buddy, bbnf-lang) — already RUN read-only as the converge-digest
(`audit/converge-digest.md`); W34 is the RECEIVER that routes each harvested finding to its wave + records
the residue. **(§16.2)** the constellation-leverage survey — where the abstracted `/constellation` (+ the
W17 warpTo) serves a real surface across value.js/keyframes.js/fourier/slides/words (with the W17 non-goal
boundary: decorative proximity-graph, NOT a data-graph — the value.js conversion graph + slides node-flow
charts are explicitly OUT). **(§16.3)** the per-consumer idiom census — enumerate, per consumer, where
glass-ui is hand-rolled / under-adopted / non-idiomatic, and route each adoption to its consumer-adoption
sub-wave. The census is grounded by the digest's idiom slices; use the muster WC design slices (ToggleChip,
vertical DockLayerGroup, editorial type pairing, 5-rung glass ladder, useStaggerReveal/scroll-driven.css) +
the words under-adoption corpus (GlassTimeline/MetricBadge/Section/useViewTransition/.text-display-*/
--section-color-*/.deferred-section/useYieldToMain — 142 import sites, NONE of the new idioms adopted) as
the concrete catalogues.

**Per-consumer adoption ledger (the §16.3 receiver — each routes a consumer-side PR, gated on a glass-ui
pin bump; glass-ui writes NO sibling source).** This wave is the HUB that records each leg; the legs
DISPATCH from their sibling sessions:
- **value.js** — delete the local `useLayerTransition` FLIP-width fork → the W01/W02 `/dock`-barrel
  re-export; delete the local goo-blob fork → `/goo-blob` (W08/W15/W16, ColorResolver seam); delete the
  local WatercolorDot + `<SvgFilters>` global-singleton mount → `/watercolor-dot`; add the binding `@source`
  directive; the demo `cssToRgb` DOM-probe → value.js's own `parseCSSColor`. Pin bump past the AX cut.
- **speedtest** — the font-preset removal (delete `data-typography-preset` + the `@theme` re-alias + the
  `--font-serif` body override — W22); the 4 `--ease-apple-spring` sites → the governed `--spring-*` register
  (W05); the 232-line `auroraConfig.ts` → `resolveAtoms({…})` + excise the dead `--aurora-1..6` tokens (W10,
  the named consumer #2); the R-CONSUME tail (VT re-founding + the H10 stopgap-revert checklist + dark-default
  pin) against the AX-published glass-ui; the X5 null-honesty in-repo defect (`?? 0` at the bridge — recorded,
  speedtest-internal, post-AX). The AT/AU body (the unbanked design+VT+perf tranche) recorded as tracked
  successor debt (NOT an AX glass-ui wave).
- **muster** — the `glass-pill` slider sites (SignalsLayer:113 + CommandPalette:485) → the surviving
  standard/glass-scrubber key (W23/§9.3); the `--signal-*`/`--origin-hue-*` channel-triple anti-pattern
  (`hsl(var(--token))` family — 5 files) → complete-hsl() tokens + color-mix; the LabeledField under-adoption
  (SettingsDialog ×2, ConstraintsLayer ×3) → LabeledInput/LabeledSwitch. The muster native-receive is W28.
- **fourier** — the `^3.1.0 → AX` pin bump (holds 4 already-shipped fixes hostage: the dock-VT-name useId
  fix, the ConfiguratorLayer `inert` a11y fix, `asideSide`, `useTextHighlight`); the 14 `.cartoon-card`
  dead-class divs → `<Card surface="cartoon">`; the LabeledSlider under-featuring (route the feature-gap to
  W21's LabeledField scope — optional non-required tooltip + inline numeric input + value-color). fourier is
  the prime downstream-validation target for the dock W01-W06 + graphics W07-W08 ships (heavy dock +
  Configurator + Slider consumer).
- **words** — the `^3.0.0 → AX` pin bump (running the BROKEN pre-3.4.0 dock — `container-type:inline-size`);
  delete the precomputed `--color-card-*` color-mix + `.dock-fade` dock workarounds; repoint
  body/sans/display off Fraunces (W22 adjudication); the 5 `hsl(var(--token))` never-paint sites → direct
  `var()`; the missing `@source` directive; the broad idiom adoption corpus (the §16.3 primary evidence site).
- **bbnf-buddy** — the un-run W13-ζ band wholesale (the complete file:line grand-audit disposition ledger);
  the M0 PRM gap on the 4 mascot rAF loops (route the consumer-coverage census to W15/W16); the DockLayerGroup
  re-adoption after W02 (delete the `.dock-layer-*` keyframes + `v-if`/`<Transition>` swaps); the
  BottomDock wrap scroll/mask + `--radius-2xl` workaround deletions after W04; the warm-cream `:root` palette
  + `.dark` mirror dup → glass-ui native light-dark() tokens; the ToggleChip active-label token-cohort gap
  (ship `--toggle-chip-active-{color,label-weight}` — route the glass-ui-owned arm to W21).
- **bbnf-playground** — ADD to the ledger (the prior charter dropped it): the dock prop-migration
  (`:wrap`→`overflow="wrap"` per W04; verify `:fit-content`/`:start-collapsed`/`:collapse-delay` survive the
  W01-W06 rebuild via the W03/W00 binding-verification e2e sweep); the `^3.0.0/^2.0.0` pin bump (10 subpath
  consumer — a dock+slider+dialog+tooltip dogfood target for the visual-truth audit).

**CONVERGE folds (digest).** (a) The 32-agent §16.1 harvest already RAN read-only (the digest) — W34 is the
forcing-function RECEIVER, NOT a re-run; it may SPAWN further consumer-adoption sub-waves (held read-only,
tranche-development-only — the legs are sibling-session PRs gated on the AX publish). (b) Each consumer
leg's glass-ui-OWNED debt (the dist `@source` deadlink, the barrel re-exports, the missing tokens) is ALREADY
routed to its glass-ui wave (W25a, W01/W02, W21) — W34 records the consumer leg, NOT the library edit. (c)
The §16.4 zero-loss mandate binds: every harvested item is closed in a wave OR carries an explicit
{receiver, close-gate} (the W33 carry-closure gate asserts zero un-receivered carries). (d) The pane-slide
directional-Transition vocabulary (speedtest hand-rolls it) is a candidate glass-ui-owned promotion to
`transitions.css` — record as a ≥2-consumer-gated WATCH (1 named consumer at HEAD; promote only on a 2nd).

**gate.** `coordination/CONSTELLATION.md` exists with the per-consumer HEAD/branch/tree-cleanliness column +
the commit-vs-handoff-patch disposition (per the 2026-05-18 Q dirty-tree lesson); the §16.3 idiom census is
authored with every consumer leg routed to a {receiver-wave, close-gate}; a meta-assertion that zero §16
harvested item is unrouted. NO glass-ui src change — this is a coordination/analysis wave (tranche-development
only). VISUAL-TRUTH: not applicable (no library surface); the consumer-side adoptions live-audit in their
own sibling sessions post-publish.

---

### AX.W35 — Primitive-prune consumer-migration DAG (keyframes.js HeaderRibbon + GlassPanel + dock-spring)
**Band** N · CROSS-REPO · **Severity** blocker · **dependsOn** AX.W00, AX.W19, AX.W20 · *(separate-repo / tracked; native-first / migrate-before-prune)*

**Scope.** Drive the cross-repo migration DAG that makes the W19/W20 prune publish-safe — the SAME
native-first / migrate-before-prune class as W28→W29 (speedtest), applied to keyframes.js. keyframes.js is a
LIVE, load-bearing consumer of TWO primitives AX excises — the W19/W20 "ZERO binary consumers" premise was
glass-ui-INTERNAL only and is FALSIFIED cross-repo:
1. **HeaderRibbon** (W19 excises) — `EditorShell.vue:99` mounts it as the top chrome bar (share/shortcuts/
   dark-mode + an `#anchor` slot). Migrate → a local chrome bar (or a surviving glass-ui header idiom).
2. **GlassPanel** (W20 retires onto `.glass-material`) — `EasingCurveCanvas.vue` mounts
   `<GlassPanel variant="wash">` as the curve-editor surface. Migrate → `<Card surface="glass">` /
   a `.glass-material` div (W20's own retire-target).
Sequence the keyframes legs to land WITH the glass-ui prune so HEAD never breaks the optional consumer; pin
keyframes.js to the pre-excision glass-ui until the migration lands. Each excision carries a born-RED
cross-repo gate (mirror the W28 `proof:repatriate-local` pattern): the keyframes-side assertion (off
HeaderRibbon / off GlassPanel) greens BEFORE the glass-ui prune publishes — W19/W20 explicitly dependsOn this.

**Dock-spring consume-leg (NOT a re-fix — see §4 note 23).** After the dock band lands and glass-ui
publishes, keyframes.js bumps its `^3.4.0` pin (which ships the pre-AW.W2 bouncy `(0.5,0.5)` register, sampled
ramp peak +16.3%) to the AX release and re-verifies both live docks (ChromeDock, AnimationMenuBar) +
EditorShell's `data-glass-dock-portal` teleport contract. Pair with keyframes' existing
`proof:dock-morph-settled` token-peak gate (born-RED at +16.3%, greens on the bump). The keyframes.js
**single-clock dock high-water** (`e82633e`/`e8380d7`) + the published `(0.32,0.7)` `--spring-dock` curve are
the SHIPPED-CORRECT baseline the W01 single-scalar morph COMPOSES with — keyframes' dock is the ORACLE, not
a defect (§4 note 23). The keyframes.js LIGHT-barrel `flip()` trigger is the proven host-hold shape;
`useDockHold` (W03) preserves the provide/inject keepOpen DI + the portal teleport contract.

**CONVERGE folds (digest).** (a) The cross-repo-DAG sequencing class is the SAME as W28→W29 (§4 note 8) —
apply it here so a falsified "zero consumers" premise never silently breaks an optional consumer at the
prune publish. (b) The W19 premise line is corrected to "one cross-repo consumer (keyframes.js EditorShell),
migrated in W35 before this prune publishes"; W20's GlassPanel premise gains the EasingCurveCanvas consumer.
(c) The H.W2/H.W4 keyframes consumption fixes (every Card defaults `surface="glass"` → the harsh radial
specular) are SATISFIED-FOR-FREE by the W09 softened default after the pin bump — confirm no kf-side override
remains (the consumer leg routes through W34's ledger).

**gate.** Born-RED keyframes-side `proof:off-headerribbon` + `proof:off-glasspanel` cross-repo assertions
green BEFORE W19/W20 publish; the `proof:dock-morph-settled` token-peak gate greens on the AX pin bump.
VISUAL-TRUTH: keyframes.js EditorShell + EasingCurveCanvas render on their migrated surfaces (cross-repo live
audit, sibling session); both keyframes docks read as one continuous iOS spring on the AX dock.

---

### AX.W36 — Forced-colors / Windows-High-Contrast glass-language skin
**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00, AX.W09

**Scope.** Ship a library-level `@media (forced-colors: active)` skin for the ENTIRE glass language so
structure survives when the glass evaporates — a universal a11y obligation (NOT presets-in-consumer; ≥2
consumers obviously — muster + every glass surface). Under Windows-High-Contrast the whole glass language
collapses: `backdrop-filter` dropped, `--glass-*` inset shadows dropped, Aurora `aria-hidden`+gone,
meaning-bearing chroma (status dots / hue identity) flattens to one system color. The skin degrades to
legible structure: glass-material tier panes → `1px solid CanvasText`; StatusDot / hue identity → a bordered
glyph (the `role="img"` is already present); focus rings → `Highlight`; the existing 6-line focus-ring
forced-colors block in `utilities.css` (AS-era) GENERALIZES to the broader tier-pane/hue-dot
structure-survival skin rather than staying focus-only. Co-locate the skin with the glass-material grammar
(rides the W25b `glass-material.css` rename, not a monolith addition).

**foldsFindings.** Digest hist:muster (the K atmosphere-a11y design slice — ZERO forced-colors:active for
the GLASS LANGUAGE in shipped `dist/glass-ui.css` as of 3.1.0; the only block is the focus-ring fallback;
a library-level a11y hole, not muster-local). The pre-CONVERGE charter had ZERO forced-colors coverage
(only an unrelated van-Gogh "high-contrast" stroke reference) — this wave is the receiver.

**gate.** `proof:forced-colors-skin` — a Playwright `forcedColors: 'active'` π-lane visual-truth pass: tier
panes resolve a `CanvasText` border, StatusDot resolves a bordered glyph, focus resolves `Highlight`, and no
meaning-bearing surface vanishes. VISUAL-TRUTH: live forced-colors render of the glass surfaces (the close
criterion — a headless CSS-presence grep does NOT catch a collapsed render).

---

### AX.W37 — Canvas2D lifecycle substrate + text-highlight (two net-new ≥2-consumer substrates)
**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00

**Scope.** Ship the two net-new substrates the consumer census proves are hand-rolled across ≥2 named
consumers each:
1. **`useCanvas2D` / `useCanvasLifecycle`** (the Canvas2D twin of the EXEMPLARY `createCanvasLifecycle` —
   §4 note 10 says do NOT re-litigate the WebGL substrate, but it is WebGL-ONLY; a 2D consumer cannot reach
   the same machinery). Extract the Canvas2D-agnostic half — the three-reason park (content-hidden +
   `useIntersectionPause` + `document.hidden`), the PRM live-monitor + static-frame callback, the
   ResizeObserver DPR-fit — on a `/canvas` subpath. Plus **`resolveCanvasColor(cssVar, el)`** — the
   probe-span `getComputedStyle()` resolution that forces a `light-dark()` token to a canvas-valid `rgb()`
   (the FourierField pattern, which ALREADY solves the exact Canvas2D `light-dark()` reject the constellation
   hits). Named consumers (≥2 thrice over): FourierField (622 lines, re-derives the ENTIRE substrate +
   the probe), the W17 constellation `drawOverlay` seam (rides this), GooBlob/Aurora-adjacent 2D needs.
   **§7 — fourier-field (W43) + constellation (W17) ARE the ≥2 consumers that justify certifying useCanvas2D
   as a first-class glass composable** (REQUIREMENTS §26.5: W37 CERTIFIES the substrate the I-session shipped,
   the way useWebGLCanvas serves aurora/blob — verify-not-rebuild; W43 composes it + notes the fourier-field
   inline color-read pre-resolve as the pattern `resolveCanvasColor` generalizes).
2. **`useTextHighlight`** on `/motion-core` — a CSS Custom Highlight composable (`CSS.highlights` + `Highlight`
   ranges + `::highlight()` styling, feature-detected with the current render as the ≤20-LOC fallback),
   zero-DOM-mutation match marks. RETIRE glass-ui's own FuzzySearch hand-rolled `<mark>`-splitting onto it.
   Named consumers (≥2 thrice over): fourier (equation vars), words (search marks), glass-ui FuzzySearch.

**foldsFindings.** Digest idiom:slides (FourierField re-derives the whole canvas lifecycle — the single
largest under-adoption in slides; the substrate is WebGL-only, a genuine glass-ui GAP). Digest hist:words
ASK-2 + idiom:fourier (useTextHighlight, 3 named consumers, clears the binary-substrate bar 3×, lets glass-ui
retire its own DOM-mutating split). The W30 constellation Canvas2D `light-dark()` fix + the FourierField probe
generalize onto `resolveCanvasColor` here.

**gate.** `proof:canvas2d-substrate` (a mounted 2D consumer parks its rAF on offscreen + tab-hidden + PRM —
the same three-reason assertion as the WebGL substrate); `proof:resolve-canvas-color` (a `light-dark()` token
resolves to a canvas-valid `rgb()`, not black/transparent); `proof:text-highlight` (FuzzySearch renders marks
via `CSS.highlights`, zero `<mark>` DOM mutation, with the feature-detect fallback). VISUAL-TRUTH: live audit
that a 2D surface on `useCanvas2D` parks offscreen + the highlight marks paint.

---

### AX.W38 — Aurora-Configurator glass-atoms RESTYLE (the dropped AW.W29)
**Band** C · AURORA · **Severity** major · **dependsOn** AX.W09, AX.W10

**Scope.** Port the AW.W29 scope verbatim (chronically-deferred — deferred in AW, then DROPPED AGAIN in the
AX renumber when slice-31's `routesToWave='AX.W26'` was renumbered to "TS god-module"): restyle the shipped
Configurator chrome (`Configurator.vue` / `ConfiguratorLayer.vue` / `ConfiguratorRow.vue`) onto the iOS-26
glass-atoms material/press/radius spine — preset-chip glass-tier active state, layer-trigger glass-button +
focus-ring + press-spring, control-row `.glass-material` + transition-control, reset glass-pill, a full
data-slot sweep. This is the VISUAL restyle of the configurator chrome — **DISTINCT from W10's FUNCTIONAL
atoms-door wiring** (W10 collapses the option model + wires the live config UI; W38 restyles the chrome onto
the glass-atoms spine). Sequence AFTER W09 (the glass-atoms/specular spine it rides) + W10 (the config-dock
rework, so the two configurator edits don't collide).

**foldsFindings.** Digest chronic-deferrals + edict-recap (AW.W29 never ran; the gestaltFix "the Configurator
restyle becomes a real component wave on the band-F glass-atoms spine" lost its home in the AX renumber).
Digest aw-delivery (AW.W29 zero git commits — full spec, no delivery).

**gate.** Born-RED `proof:configurator-glass-atoms` — a computed-style probe over the live aurora story
(preset-chip resolves a glass-tier active state, control-rows resolve `.glass-material`, the press-spring
resolves the tap-squish, every interactive node carries its data-slot). VISUAL-TRUTH: live frontend-design
audit of the restyled configurator chrome on the live aurora story (NOT a headless data-slot grep).

---

### AX.W39 — Lighthouse perf/a11y audit (demo + slides route matrix; the dropped AW.W32)
**Band** M · CLOSE · **Severity** major · **dependsOn** AX.W18, AX.W22, AX.W38, AX.W40

**Scope.** Author the perf/a11y budget the AX π-lane visual-truth philosophy is missing (W00 stands up a
visual-render lane but there is NO perf/a11y budget gate over the demo route matrix; AW.W32 never ran on the
glass-ui side, H.W11 never ran on the slides side → the entire constellation has ZERO executed Lighthouse
pass at any layer). Build `scripts/lighthouse-demo.mjs` + `scripts/lighthouse-demo.budget.json` (a
substrate-aware two-tier budget — the WebGL/aurora pages carry a different floor than the static primitive
pages) + the `proof:lighthouse-demo` gate (ci-tagged), walking the manifest-derived route matrix; close on
the measured baseline + a remediation list, fixing the a11y/perf floors over the NEW IA route matrix. The
slides arm (the deployed til-briefing + feedback-coder routes) folds in as a named close gate per the
digest. Sequence AFTER W18 (IA) + W22 (fonts) + the glass-atoms waves (W38) + W40 (demo-dock-nav shell) so
it measures the FINAL surface (mirroring AW's W32-after-W28 dependency).

**foldsFindings.** Digest chronic-deferrals + aw-delivery + hist:glass-ui + hist:slides (AW.W32 + H.W11 both
never ran; the demo Lighthouse arm is distinct from the slides arm; both unrouted in the pre-CONVERGE
charter — the AX.W32-slot was a number-collision, "Slides motion", not the Lighthouse work).

**gate.** `proof:lighthouse-demo` (ci-tagged) over the route matrix with the substrate-aware budget GREEN
after remediation; the slides-route Lighthouse pass recorded in `coordination/CONSTELLATION.md`. NO new
visual surface — the gate IS the perf/a11y measurement; the remediations live-audit through W18/W40.

---

### AX.W40 — Demo-shell dock-nav rebuild + cross-surface coherence re-audit (merged-but-untrusted AW.W28/W31)
**Band** F · STORYBOOK IA · **Severity** major · **dependsOn** AX.W06, AX.W18

**Scope.** Two merged-but-untrusted AW residues, re-built + re-audited on the AX-rebuilt surfaces:
1. **Demo-shell dock-nav rebuild** (AW.W28 — merged batch-1 as `demo/layout/dock-nav.css` + SidebarDock +
   BottomDock, headless-green-only, audit-do-not-trust). Rebuild the storybook demo NAVIGATION on the
   AX-rebuilt GlassDock (a sidebar dock + a bottom-bar dock for core page nav) — the dock's OWN dogfood
   surface + a live-audit anchor for the W01 morph fix. The IA CATEGORY TREE is W18's; W40 rebuilds the nav
   SHELL on it (hence dependsOn W18 + the dock band) — the prior charter conflated these, leaving the
   dock-nav shell neither re-built nor reconciled against the ground-up IA reinvention.
2. **Cross-surface coherence re-audit** (AW.W31 — `proof:animation-coherence`/`design-md-current`/
   `naming-consistency` merged batch-1, headless-green-only). Re-RUN all three against the AX-REBUILT motion
   surfaces — the dock W01-W06 + the aurora/blob rebuilds CHANGE what W31 audited, so the gates must re-run
   post-rebuild (one spring/motion vocabulary across dock+aurora+blob+primitives, building on W05; a DESIGN.md
   currency+completeness audit, not just the W11/W33 prose sweep; naming/verbiage consistency across
   components/stories/tokens — the direct ADDENDUM-3 user ask, entirely absent from the prior recap).

**foldsFindings.** Digest hist:glass-ui (AW.W28 demo-dock-nav + AW.W31 three-pass coherence audit — both
merged batch-1, both headless-green-only, neither re-audited for visual truth; all three were explicit user
ADDENDUM-3 asks that vanished from the AX recap). Digest precept-alignment + chronic-deferrals (W28/W31 merged
but untrusted — the "do not trust the green claims" §14 class).

**gate.** `proof:demo-dock-nav` (re-baselined for the AX dock + the W18 IA tree) + the re-run
`proof:animation-coherence`/`design-md-current`/`naming-consistency` GREEN over the rebuilt surfaces.
VISUAL-TRUTH: live navigation audit of the dock-driven sidebar + bottom nav on the AX-rebuilt dock, and a
cross-surface animation-coherence live pass (the dock + aurora + blob breathe on ONE spring vocabulary).

---

### AX.W41 — Publisher-side cross-repo build + supplier-edge hardening
**Band** N · CROSS-REPO · **Severity** major · **dependsOn** AX.W00 · *(glass-ui-OWNED, in-repo — a real src/package.json edit, NOT a sibling annex)*

**Scope (NEW at CONVERGE — the only genuinely-new wave; no prior wave owned these publisher-side
obligations; §4 note 22).** Gather the glass-ui-OWNED cross-repo obligations the consumer cohort is OWED but
that no other AX wave carries:
1. **The `build:watch` dts-emit arm** — `build:watch` is JS-only (`vite build --watch`) and does NOT emit
   `.d.ts`, so the cross-repo dts-freshness keystone is UNMET (flagged unmet at 3.2.0/3.1.1, STILL unmet at
   3.6.0 HEAD). It is the ROOT CAUSE of value.js's stale-dist-typecheck class (the 75 TS7016 errors K.W2
   fought) and affects EVERY consumer that dev-resolves the built `dist/` under contract-v2
   (`cross-repo-dev-resolution.md` invariant-30: every `@mkbabb/*` publisher runs `build:watch` to keep
   `dist/` fresh while a consumer's dev server is up — a JS-only watch leaves the dts STALE, a silent-failure
   class). Add an `emit-types --watch` arm so `build:watch` keeps `dist/*.d.ts` fresh alongside the JS. This
   is a LIBRARY-INTERNAL contract violation (fail-explicit class), NOT a befitting-silent browser degradation.
2. **devDep↔peer range-parity gate** — the `devDependencies` pin (`keyframes.js ^2.2.0`, `value.js ^0.10.0`)
   lags the `peerDependencies` range (`keyframes.js ^2.2.0 || ^3.0.0 || ^4.0.0`, `value.js ^0.10.0 ||
   ^0.11.0`), so the library builds/tests against a NARROWER set than it claims to support. Ship a
   `proof:peer-devdep-parity` gate (the devDep floor sits within the peer range; flag a drift) + bump the
   devDeps to a representative point in the peer range.
3. **The orphan AW.W27 supplier-edge reconcile** — AW.W27-peer-conformance is a CLOSED, gated
   (`proof:peer-conformance`) wave with NO row in the AW charter §2 table (an orphan/hidden wave) carrying
   live cross-repo debt absent from the prior AX charter: (a) the keyframes-4 published tarball ships a stray
   `@mkbabb/glass-ui: file:../glass-ui` dep that breaks `npm ci` — a coordination handoff (keyframes must cut
   4.0.1 stripping the `file:` dep); (b) the E2 knot — when AW.W5 aurora forces value 0.11 (interpolateHue),
   a consumer wanting W5 + keyframes-4 hits keyframes-4's value<0.11 hard-cap, requiring a keyframes-side
   value-dep widen. Record `proof:peer-conformance` for ci/release tagging (W27a's tag model); author the
   keyframes-4 republish + the E2 value-cap as named cross-repo handoffs in `coordination/CONSTELLATION.md`.
4. **The keyframes peer-range-bump export-surface-stability check** — a glass-ui peer-range bump CASCADES
   keyframes.js export-surface removals onto consumers (3.6.0's keyframes 2.2.0 dropped `getTimingFunction`
   from its public export → bbnf-buddy had to reimplement the resolver locally). Add an export-surface-stability
   check that flags when a glass-ui keyframes-peer-range bump drops a downstream-relied API — the constellation
   export-stability gate the digest's keyframes-collaboration clause (REQUIREMENTS §0) asks for.

**foldsFindings.** Digest hist:value.js (the `build:watch` dts gap — the cross-repo dts-freshness keystone,
unmet 3.2.0→3.6.0; value.js C-DTS / E4 / K.W2.5 root cause). Digest aw-delivery (the orphan AW.W27
peer-conformance wave + the keyframes-4 `file:`-link publish bug + the E2 value-0.11 cap — a cross-repo
supplier-edge item with no AX home). Digest hist:bbnf-buddy + harden (the `getTimingFunction` export-removal
cascade + the devDep↔peer range parity gate). Cross-ref MEMORY `project_glassui_340_published`
("keyframes-4 publish bug") + `project_publish_ci_broken`.

**gate.** `proof:build-watch-dts` (a `build:watch` run leaves `dist/*.d.ts` fresh — a stale-dts assertion);
`proof:peer-devdep-parity`; `proof:peer-conformance` registered with ci/release tags; the export-stability
check authored. The keyframes-4 republish + E2 value-cap declared as named handoffs in
`coordination/CONSTELLATION.md` (born-RED until keyframes cuts 4.0.1). NO visual surface — structural /
packaging wave. (The keyframes-side cuts are sibling-session work; glass-ui authors the handoff + the gates.)

---

### AX.W42 — The unified liquid-morph substrate: `useLiquidMorph` / `--morph-t` / `MorphGroup` as ONE idiom
**Band** A · DOCK / SUBSTRATE · **Severity** major · **dependsOn** AX.W00, AX.W01

**Scope (a CONCISE pointer to the full spec — `waves/AX.W42-liquid-morph-substrate.md`; do NOT duplicate it
here).** Ship `useLiquidMorph(elRef)` + `--morph-t` + `MorphGroup` as ONE reusable morph substrate — the web
transposition of SwiftUI's `GlassEffectContainer` + `glassEffectID` and Motion's `LayoutGroup` + `layoutId`
— so "every element morphs/springs/flows" is ONE idiom, not per-component bespoke (REQUIREMENTS §18.1/§18.3).
The substrate is ~70% ASSEMBLY of primitives already in the tree; the net-new is the unifying API surface +
the `MorphGroup` orchestrator + the `axes`-declaration that lets CSS `calc()` off one scalar + the 3-state
`data-morph-state=idle|morphing|settled` lifecycle enum + the four perf/a11y SUBSTRATE invariants
(on-demand will-change · `@property inherits:false` inheritance-bomb guard · PRM fast-path · one-driver-per-axis).
The matched-geometry seam stays BIFURCATED (spring+FLIP for self-reshape, native View Transitions via an
opt-in `morphId` for the route/shared-element morph); the lensing-`backdrop-filter` fold is explicitly
`@supports`-gated Chromium-only over the flat-glass blur base (fail-explicit-degrade, never a broken `url()`).
The full six folds + FileBounds + Triumvirate + HardGate + Cadence live in the per-wave spec.

**RECONCILIATION — W01's `--dock-morph-t` is the FIRST consumer of this GENERAL facility (the load-bearing
relationship).** W01 (single-scalar dock morph) builds the dock-flavored single-scalar one-clock model
(`--dock-morph-t`, the VT-collapse retirement, `useLayerTransition` re-derived 479→~130); W42 then
GENERALIZES that settled model — `--dock-morph-t` becomes the FIRST `--morph-t` instance, `useLayerTransition`
becomes a thin dock-flavored WRAPPER over `useLiquidMorph`, and W02's `dockMorphContext` becomes the first
`MorphGroup` consumer. This is why W42 dependsOn W01 (HARD) and SEQUENCES strictly after it — there is no
single-scalar model to lift until W01 builds it. The substrate ships with ≥2 in-repo consumers at landing
(the dock + ONE ratified glass primitive — tab-indicator glide or card→detail expand, RATIFY against the
live audit) + the value.js FLIP-width fork-deletion as the cross-repo adoption (W34). W42 may be FOLDED into
W01 as the generalization arm, but the §18.3 net-new mandate + the ≥2-consumer-at-landing bar argue for a
distinct wave (RATIFY at wave-open — see §5 + waves/AX.W42 §Open-Questions).

**Soft-coordinates** with W02 (the `MorphGroup` ↔ `dockMorphContext` ordering), W03 (the `data-morph-state`
enum the held edge feeds), W05 (the governed `--spring-*` register the substrate consumes — no new curve,
no hand-rolled `k`), W09 (the `useSpecularTracking` light seam + the SPECULAR/REFRACTION half split), W20
(the no-imperative-filter posture the lensing fold honors). None is a HARD dependsOn (W42 consumes each
settled surface if it lands first, else the published baseline).

**foldsFindings.** REQUIREMENTS §18.3 (the net-new unified MORPH substrate mandate). Constellation slice 10
F0 (the value.js box-leads-content FLIP-width fork re-derived ONLY because the `/dock` barrel never
re-exported the primitive — substrate-with-consumer; the fork-deletion is W42's named cross-repo adoption).
The liquid-glass research corpus facets 1/3/12/26/27/28/29/30 (`liquidglass-research-corpus.json` + synthesis
§1.4: net-new + wave-worthy, ~70% assembly — the proven `GlassEffectContainer`/`LayoutGroup` API shape, the
3-state lifecycle, the bifurcated seam, the four invariants are all corpus-grounded, NOT speculative).
AV.W9.0 (the `interpolate-size`/`calc-size` dual-driver dock-freeze — the one-driver-per-axis lesson the
substrate makes a STRUCTURAL invariant).

**gate.** `proof:morph-substrate-single` (π-lane, born-RED — the substrate is the SOLE morph engine across
its ≥2 consumers; one driver per axis; the 3-state lifecycle; the inheritance-bomb / will-change-lifecycle /
PRM-fast-path / bifurcated-seam guards; the ≥2-consumer count fails CLOSED below 2) + a pure-detector vitest
(`liquid-morph.detect.test.ts`) + the W00 meta-gate parity. VISUAL-TRUTH: a live Playwright +
frontend-design audit confirms the dock AND ≥1 glass primitive morph as ONE continuous iOS spring on the
DEFAULT engine off the SAME `useLiquidMorph`/`--morph-t` substrate, the velocity-continuity retarget reverses
a mid-flight re-toggle fluidly on each, the lensing fold degrades cleanly to flat-glass on non-Chromium, and
PRM snaps both to target — the numeric gate alone does NOT close the wave (a paired-π BEFORE/AFTER + DELTA
over ≥3 viewports in light AND dark). The high-risk PoC (the second-consumer + the single-scalar substrate)
spikes GO in the §5 prototype pass before this wave drives.

---

### AX.W43 — Fourier-field first-class: the per-variant intensity model + full citizenship + the mid-tranche SOTA research
**Band** B/E · GRAPHICS-SUBSTRATES · **Severity** major · **dependsOn** AX.W00, AX.W07, AX.W14, AX.W18

**Scope (a CONCISE pointer to the full spec — `waves/AX.W43-fourier-field-first-class.md`; do NOT duplicate it
here).** Raise the I-session-lifted `fourier-field` primitive (`src/components/custom/fourier-field/`, on the
useCanvas2D substrate — REQUIREMENTS §24) from a near-invisible whisper to a SIGNATURE BRAND MARK and a FULL
first-class glass-ui citizen, the §26 / slides-J.W1+J.W9 fold. The CORE (J.W1): replace the single
`OUTLINE_PEAK_ALPHA = 0.24` (`FourierField.vue:103`, ceilings every layer) with a per-variant intensity BUNDLE
in `VariantPreset` (`peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`) +
an `intensity` prop scaling the resolved peak (the Aurora `opacityCeiling` seam, `Aurora.vue:83-104` — threaded
to a token, NOT a magic-number bump); DELETE `OUTLINE_PEAK_ALPHA` with NO compat alias; soften the quadratic
`age*age` trail to ≈`age^1.4` + a per-variant floor so the comet body survives, the head glow the STRONGEST
layer; hoist the per-frame color/hue resolution onto the existing `useGlobalDark`/`colorResolver` watch
(zero-allocation render loop). The user-ratified §7.1 targets: hero head-glow peak ≈0.55 / trail head ≈0.35
(warm, bright); final ≈0.45 (cool, denser-but-quieter); hero + final visibly distinct family members. Full
CITIZENSHIP (J.W9 glass-ui half): the research-backed README, the `api/index.ts` public-surface seat, the
Substrates demo story + mount-smoke, the `/fourier-field` subpath (ALREADY landed — verify, do not re-author).

**The MID-TRANCHE SOTA RESEARCH HOOK — orchestrator-driven, DEFERRED to W43's drive window (REQUIREMENTS §26.2).**
The fourier-field 32-facet research is NOT a now/pre-drive task (unlike liquid-glass/aurora/blob which ran during
spec formation) — it is DEFERRED to run MID-TRANCHE, an ORCHESTRATOR-DRIVEN workflow launched during W43's drive
window (a Cadence step) whose findings the orchestrator FOLDS into W43 + the README, the same research→fold
pattern time-shifted. RATIONALE: the GPU-primitive substrate the research depends on (the WebGPU
`createGPUCanvas` + the optimized GPU primitives) is itself being built/perfected by the aurora band (W07/W14)
EARLIER in the tranche — so the research lands on a KNOWN, SETTLED GPU substrate, not a guess (hence dependsOn
W07 + W14). The mandatory axes: (a) epicycle/DFT/Fourier-series viz SOTA; (b) WebGPU compute/render path; (c)
our optimized GPU primitives (`createGPUCanvas`/`useWebGLCanvas`/`useCanvas2D`/the shared OKLCh core); (d) the
`/Users/mkbabb/Programming/fourier-analysis` visualization suite (the candidate ≥2nd-external consumer). A
WebGPU compute path, if recommended, is an ADDITIVE enhancement behind the parity-floor Canvas2D render the
§24-shipped substrate already provides — NEVER a regression. The full scope + FileBounds + Triumvirate +
HardGate + Cadence live in the per-wave spec.

**RECONCILIATION — W43 absorbs the slides Tranche-J glass-ui arms (§7).** J.W1 (the fourier-field intensity
model) + the J.W9 glass-ui-half (the citizenship: README/smoke/story/public-surface) are AX W43 work; the
SLIDES-side consume (the deck-theme intensity token + the J.W2 floor gate + the bookend re-bless) rides AX.W32
/ the J slides-leg, gated on the AX cut PUBLISHING (slides pins a `main`-sourced publish per J §7.8). W18 SEATS
fourier-field in the Substrates IA band; W37 certifies the useCanvas2D substrate (fourier-field + constellation
= the ≥2 consumers) + ships `resolveCanvasColor` (W43 composes + notes the consumer); W33 sweeps the README to
currency. The `/prng` first-class subpath stays keep-book (J.W8) until fourier-field makes it a ≥2-EXTERNAL
consumer need — fourier-field imports the single-source `src/utils/prng.ts`, not a fork.

**foldsFindings.** REQUIREMENTS §26 (fourier-field FIRST-CLASS, research-DEFERRED-to-mid-tranche) + §25.1 (J.W1
intensity + J.W9 citizenship + the J.W8 prng decision) + §24 (the I-session lift). slides `docs/tranches/J/J.md
§2` (the J.W1 intensity spec) + §7.1 (the user-ratified targets) + `J/audit/DEEP-AUDIT-DIGEST.md` (the
176-finding J audit — the per-wave detail).

**gate.** `proof:fourier-field-intensity` (born-RED — `OUTLINE_PEAK_ALPHA` DELETED no-alias; the intensity
bundle + `intensity` prop present; the README/api-seat/story/smoke citizenship present; the render loop
allocates no color per frame) + `proof:fourier-field-visibility-live` (π-lane render observation — hero/final
clear the visibility floor + are measurably distinct + the `intensity` prop scales the measured peak).
VISUAL-TRUTH: a live Playwright + frontend-design audit confirms the Fourier trace READS as a signature mark
(head glow strongest, comet body survives, epicycles distinct-hue-but-visible), hero + final read as distinct
family members, and the `intensity` prop tunes the loudness LIVE — on cream + ink at ≥3 viewports (a paired-π
BEFORE/AFTER + DELTA); the numeric gate alone does NOT close the wave. The mid-tranche SOTA research is folded
during the drive window after the W07/W14 GPU band settles — it deepens, it does not gate the born-RED close.

---

### AX.W33 — AX close: gate-fleet + READMEs + overfitting audit + inheritance cross-walk + FINAL
**Band** M · CLOSE · **Severity** major · **dependsOn** AX.W00…AX.W32 + AX.W34…AX.W42 (ENUMERATED — every prior wave INCLUDING the W42 morph substrate; LAST, HARD-gated terminal)

**Scope.** Bake the close as a concrete HARD-gated terminal wave (the AW close W33 never ran — the gate-fleet
is partially hand-registered, the overfitting audit + π lane + FINAL all unrun). Register every new AX gate
in `scripts/gates.mjs` with correct local/ci/release tags + run a tag-parity probe + a meta-gate that every
`proof-*.mjs` has a package.json entry. Register `proof:no-retired-survivor` (authored W21). Author
`proof:ax-final` (the release gate). Sweep all four research-backed READMEs (dock, aurora, blob,
constellation) from "planned" to "landed" AND re-audit each against the LIVE π-lane surface — a README claim
about a visual behaviour cites a live π-lane capture, not a spec sentence (the READMEs were written from the
static-bake thumbnails + wave specs, decoupled from the dead live substrate; they exist on disk at
`src/components/custom/{aurora,constellation,dock,goo-blob}/README.md` per canonical-readme-shape). Run the
overfitting audit (every src/ artefact has ≥2 sites or is exported or is a private demo helper) with the
audit-verdict spot-verification gate. Write FINAL.md. A tranche cannot "ship" without this wave green.

**CORRECTION + CONVERGE folds (digest harden + precept-alignment).** (a) **dependsOn is ENUMERATED, not
"ALL"** — a literal "ALL" is not machine-checkable and is the loose binding that let AW.W33 renumber-drift
(W18→W21→W27→W33, never reached). Add a gate-fleet meta-assertion that programmatically verifies every prior
wave's gate is registered + green; `proof:ax-final` meta-asserts the prior close gate existed. (b)
**Inheritance-ledger cross-walk (P-inv-28 zero-deferral close):** enumerate EVERY REQUIREMENTS §13 + §14
item and assign each ADDRESSED-at-Wnn / RETIRES-with-rationale / ARCHIVES (with a
`docs/tranches/AX/archive/<item>.md`) — "deferred to next tranche" is NOT an acceptable close-state; confirm
at open whether AX is user-bound zero-deferral. (c) **Carry-closure gate (bbnf BD-G7 form):** every AX
deferred item is closed in a wave OR carries an explicit {receiver, close-gate}; FINAL asserts zero
un-receivered carries. (d) **Chronic-closure meta-invariant:** every wave marked "done" carries a
SYSTEM-property gate OR (for cross-repo handoffs) a born-RED PAIRED gate — a bare "handed off" tag is NOT a
terminal; name the phantom-owner re-defer anti-pattern in FINAL so the aurora/blob/dock READMEs cannot
re-defer the AW way. (e) **inv-26 ADOPTION-ASKS hub reconcile** (AU-W0 never authored it): reconcile the
speedtest DDR-AS-RC-2/3 ask bundle (DockIconButton coarse floor, MetricBadge icon, CompletionSeal/
GoldHeadline/CheckDraw, ContinuousTimeline check-centring + marker-opt-out, LabeledField for/id) landed-or-
still-open. (f) **AW.W31 re-audit:** `proof:animation-coherence`/`design-md-current`/`naming-consistency`
re-run against the AX-REBUILT motion surfaces (the dock W01-W06 + aurora/blob rebuilds CHANGE what W31
audited — the cross-surface coherence work lands in W40, the re-audit confirms here). (g) ι integrity-sweep
+ `scripts/audit-stash-list.mjs` + the `git log --since docs/precepts/` walk; bump the precepts submodule
pin past `63240e6` to the "Before/after + compare-at-close" commit if owed. (h) **§20 kf-G-4 VERIFY-LANDED:**
the directional View-Transition helper `startViewTransition({types})` IS already landed at HEAD (unpublished)
— so kf-G-4 is largely DONE; W33 CONFIRMS the directional `::view-transition-*` CSS companion ships, then it
is publish-currency (the kf `useSceneTransition.ts` consumer greens on the AX bump via a kf demo-smoke
VT-types assertion). (i) **§20 kf-G-0 DO-NOT-REOPEN:** the dock-spring retune (ramp peak +16.3% → the
published `(0.32,0.7)` ~+4.6% at 53c1b07) is ALREADY published (3.5.0/3.5.1/3.6.0) and the keyframes
a-historical-dock oracle confirms it as the SHIPPED-CORRECT baseline — AX must NOT re-open it (the W01
single-scalar morph COMPOSES with the published curve; W05 pins the governed dock register to it; see §4
note 23). Record both as closed-at-HEAD / publish-currency in the inheritance-ledger cross-walk. (j) **§7
J-CLOSE — W33 discharges J.W9's 3.7.0→main reconciliation FOR J:** the AX publish (3.8.0) lands the AX line on
`main` via PR + a provenance-clean tag (the §24 3.7.0-source-delta verify-present rides this), so J.W2 + every
slides consume pins a `main`-sourced artifact (J's STANDING RULE — slides only pins a `main`-sourced publish).
A SHARED close obligation; the W43 fourier-field README + the W17 constellation README ride the
README-currency sweep. **The FEEDBACK-CODER DEPLOY HINGE is a named §6.2 Class-4 user-gate:** unlike
til-briefing (CI-deployed via the slides repo→CF Pages), the feedback-coder deck's repo has ZERO git remotes —
its deploy/tag-push is a credentialed USER action. W33's FINAL surfaces it as the ONE named J user-hinge
(resolve at drive-open per §7.4), NEVER silently closes it `complete`.

**foldsFindings.** Slice 31 F4 (the renumbered-thrice never-reached close — AX absorbs it as HARD-gated
terminal). Slice 31 F8 + 7 F0 + 11 F2 + 13 F5 (README planned→landed against the LIVE surface). Slice 22 F3
(the proof-*.mjs↔package.json meta-gate). Slice 25 F0 / 26 F4 / 27 (gate-tag-parity close). The harden
dependsOn-enumerated + P-inv-28 cross-walk + carry-closure + chronic-closure folds above. All slices'
README/gate-currency tails.

**gate.** `proof:ax-final` (the aggregate); gate-fleet registration complete + meta-asserted; the
overfitting audit clean (spot-verified); the inheritance-ledger cross-walk shows zero residuals-or-archives;
the carry-closure gate returns zero un-receivered carries; ι returns zero unauthorized git mutations + zero
unexpected precept changes. VISUAL-TRUTH: every README figure is a live π-lane capture; FINAL.md cites the
live-audited state of every wave + reconciles the goal criterion (closes `complete_with_misses` if any goal
is unmet, not `complete`).

---

## §4 — Out-of-scope / contradictions / reconciliations (for orchestrator review)

The following were judged out-of-scope, already-resolved, or reconciled across conflicting slices. Flagged
so the orchestrator can ratify each disposition.

1. **The two aurora-black root-causes are the SAME defect, jointly fixed (reconciled into AX.W07).** Slice 6
   device-bisected it to a std140 **int-in-float** mismatch in `packGPUUniforms` (the `i32` struct fields fed
   float bit-patterns); slice 10 + the preserved `W01-aurora-webgpu-blackcanvas.md` device-proved a
   **`var<uniform>` dynamic-index** Metal miscompile (dynamically-indexed arrays in the uniform address space
   return zero). Both are real, both produce the same black-canvas symptom, both fixes (f32-cast the int
   fields + move the arrays to a storage buffer) land together in W07 to yield a non-black render. Not a
   contradiction — two distinct WGSL defects on one surface.

2. **Slice 31's "shared substrate lifecycle root" for BOTH aurora and blob is SUPERSEDED by the more precise
   per-surface diagnoses.** Slice 31 F0/F1 hypothesized that the AW.W7 lifecycle carve regressed the shared
   `useWebGLCanvas` demand-gate, blanking both surfaces at the root. But the device-instrumented slices prove
   otherwise: aurora-black is WebGPU-only (the WGSL bug — WebGL2 thumbnails bake correctly), and blob-flood is
   a WebGL2 smin-over-merge with the loop running at 120fps (slice 11/12). The shared substrate is in fact
   well-architected (slice 13 F6, 14 F4). Slice 31's load-bearing contribution survives as the **gate-philosophy
   π lane (AX.W00)** — its real value was naming the headless-green/visually-broken gap, not the substrate
   hypothesis. The substrate-hygiene cosmetics (the -1000 resume time-warp) ride AX.W09/§J, not a blocker.

3. **The icon-button-token-ladder (§1.7/§7) is ALREADY REMOVED at the original route — but RENAMED, not cut.**
   `/dock/icon-button-token-ladder` was RENAMED to `foundations/dock-active-tokens.vue` with ZERO content
   delta (git `| 0`). The §7 "remove the story" is VERIFIED-DONE; the residual debris is the renamed file,
   DELETED in AX.W06. Anyone trusting "the AV restructure handled it" ships the debris.

4. **Many §7 recategorizations were ALREADY DONE by AV.W10 (stale directives).** hover-popover + configurator
   already left Primitives; the metric-badge/pill keep-both verdict is correct (a composition, not a collapse).
   The REQUIREMENTS ledger is a verbatim pre-AV.W10 recapitulation never reconciled against HEAD. AX.W21
   ledger-closes these; the only live defects are the configurator root-barrel/rationale contradiction + the
   metric-pill subpath asymmetry. **Lesson for every wave: re-verify each §7 item against HEAD before acting.**

5. **The slider half of §9 is DONE + visually-true (AV.W11).** Two-only collapse + the fully-rounded 50% knob
   both landed and verified. The only open slider item is the §9.1 literal glass-scrubber RENAME — a
   USER-ADJUDICATED naming decision (AV.W11 deliberately kept the CVA key `standard`), not a runtime defect,
   folded into AX.W23. The carousel half (§9.4) is the genuine blocker.

6. **There is NO `/deck` family to build (§10 is narrower than its phrasing).** The slides deck engine
   (useDeck/useDeckNav/DeckPager/deckSpring) is correctly slides-local single-consumer logic — lifting it
   would manufacture substrate-without-consumer. The ONLY library surface in scope is the bottom-bar rail LOOK
   (AX.W24). The `/deck` name stays reserved/unused.

7. **The OKLCh migration (§2.3) is GENUINELY LANDED + machine-locked — NOT broken.** The §2.3 headline is
   substantively DONE in code (the /color leaf, both GLSL shaders, the blob are all value.js-Ottosson
   single-sourced; zero live HSL/YIQ/sRGB-luma paths). The four §2.3 findings are SEAM-level (a doc-lie, one
   sRGB-literal catch-light, the dead deriveScene door, the WGSL palette-ramp gate hole), folded into AX.W10/W11
   — not a migration redo. The prompt's hypothesis that the W4/W5/W8 merges "regressed the live palette/color"
   is FALSE; the regression is the W7b WebGPU swap (the WGSL twin).

8. **Speedtest repatriation is a CROSS-REPO DAG with a real native-first sequencing wall (the muster-block).**
   The prune CANNOT run until both speedtest + muster receive native copies (inv-16'). glass-ui writes no
   sibling source — it authors the handoff annexes (AX.W28); the sibling sessions execute; then glass-ui prunes
   (AX.W29). The §7 "REMOVE ALL" directive for instrument-chassis is blocked by the ≥2-consumer invariant until
   the repatriation drops the count to 0. Both consumers are on live pins (speedtest ^3.6.0, muster ^3.1.0).

9. **The slides band (L · W30-W32) is a SEPARATE REPO, folded here for tracking only.** Most §12 items are
   RESOLVED at the code level by tranches G + H but were NEVER browser-verified, and the H work is stranded as
   uncommitted state. AX.W30 lands + executes; the genuinely-unaddressed content gap is the §12.2 Slide04
   hypothetical/what-if reframe. The cross-repo consumer-adoption half (vReveal/useCountup/DeckProgress) never
   ran — AX.W32.

10. **The composables/state + WebGL substrate layers are EXEMPLARY — do NOT re-litigate.** The AV.W14 DI
    factory pair, the `useWebGLCanvas`/`createCanvasLifecycle` three-reason park, the `useSortable` 5-service
    orchestrator, the ColorResolver DI — all textbook. AX.W26 is surgical (computed-derivation cleanup +
    speculative-context excision + sidebar re-base), not a rebuild. The §11 god-module + encapsulation work is
    bounded; do not over-read it into the healthy substrate.

11. **The original AW plan misdiagnosed the dock simple-collapse regression (§14 finding).** The AW.W1 spec
    blamed `useLayerTransition` measurement and forbade touching dock.css; the live HEAD re-diagnosis falsified
    that (the real cause was `container-type: inline-size`, since fixed in 3.4.0 — confirmed live). The dock
    simple-collapse WORKS at HEAD; the §1.1 "box shrinks first" defect is a DIFFERENT, still-open defect (the
    box-vs-content desync, AX.W01). AX makes "live re-diagnosis BEFORE the fix" a wave-open ritual (folded into
    AX.W00's gate-philosophy).

12. **PUBLISH-CURRENCY, not code, is the real gap for a CLASS of "still broken" findings.** glass-ui HEAD is
    `eaba94f` (batch-1 integrated, UNPUBLISHED); the published registry line is 3.6.0 (the consumers pin
    3.4.0–3.6.0). Four fixes are AT HEAD but NOT in what a consumer dev-resolves: the **Card specular pointer-
    wiring** (AW.W24 — at HEAD the Card tracks the pointer; the consumers MEASURED published 3.4.0 which pins
    `--specular-x` at 50% mid-hover → a dead-centered white bloom), the **VT `.ready`-swallow** (`vt.ready?.catch`
    at HEAD), **`useGlobalDark({initialValue})`**, and **`deriveAurora`/`resolveAtoms`**. So: W09 is TUNE +
    opt-in + tokenize (NOT "wire the pointer" — already done); speedtest's R-CONSUME tail is now UNBLOCKED
    against an AX publish (the gate is OPEN, the consume never triggered); the consumers' "still broken"
    specular/VT findings are a publish-currency gap, not a code gap. The corrective is the W41 dts-watch +
    the W33/W34/W35 pin-bump + republish hinge — every consumer leg is gated on the AX cut PUBLISHING. Do NOT
    re-fix what is already at HEAD; verify against HEAD, then publish.

13. **POS_SCALE disposition — decided ONCE, W08 owns it, W15 inherits (the harden:dock-graphics +
    harden:aurora-blob blocker contradiction).** W08 (slice-11) and W15 (slice-12) inherited mutually-exclusive
    source directives: W08 "re-apply POS_SCALE to the uSmoothK upload (its W9.a deletion was the error)"; W15
    "drop POS_SCALE as a hidden fudge, express every length in wrapper-normalized units." Verified live:
    `useMetaballRenderer.ts:438-439` uploads `uSmoothK` WITHOUT `*POS_SCALE` while every other length
    (uBodyRadius:404, satRadius:495, uPointer:363, noiseAmp:423) carries it — the asymmetry is real.
    **DECISION:** W08 takes the MINIMAL un-flood (restore `POS_SCALE` on `uSmoothK` + re-tune the composed band
    to ~0.03-0.08 effective) to clear the blocker fast; W08 does NOT excise POS_SCALE. W15 then either KEEPS
    W08's POS_SCALE regime (drop slice-12's "eliminate the fudge" language as scope-creep → §J) OR, IF it
    re-expresses all lengths in wrapper-normalized units, re-derives the ENTIRE length cohort
    (body/sat/orbit/smin/noise) ATOMICALLY in that wave with `proof:blob-render` as the regression-lock — NEVER
    a partial migration that re-floods. Both wave specs carry the explicit "POS_SCALE disposition" line so W15
    inherits, not contradicts, W08. The no-workaround / one-coherent-regime precept is satisfied because the
    fudge is removed (if at all) in ONE atomic re-derivation, never across a wave boundary.

14. **WEBGPU_PARITY — the W07↔W14 re-enable criterion is the DELETE branch (the harden:aurora-blob unmeetable
    gate).** "Default to WebGL2 until the WGSL twin reaches medium parity" is NOT a flip of an existing option:
    the public `AuroraRenderMode` union is `'webgl' | 'css' | 'auto'` — there is NO `'webgpu'` value; WebGPU is
    selected by an internal `resolveRenderModeAsync` probe. So W07 adds a NEW internal `WEBGPU_PARITY` const (or
    build flag) gating the `'webgpu'` branch so it returns `'webgl'` until parity — NOT a consumer prop (W07
    sets it false; W14 owns the flip). The criterion is currently UNMEETABLE by the wave chain: W13 ships the
    GLSL/WebGL2 mediums ONLY; the WGSL single-pass twin gains no medium dispatch; W14's Kuwahara multi-pass is a
    separate painterly finish, not the six per-fragment mediums. **DECISION (the likely DELETE, matching the
    single-source-shader charter + the W14 "OR excise" branch):** keep WebGPU as an OPT-IN enhancement (the
    Kuwahara finish) over a parity-floor field, NEVER auto-default — DELETE the "re-enable the auto-default"
    framing; W14 flips `WEBGPU_PARITY` only for the opt-in path. The alternative (W14 ports the six mediums into
    WGSL so parity is REAL) is the only path that re-enables an auto-default, and it is NOT the de-facto plan.
    `device.lost` is a BEFITTING-SILENT browser-API degradation (tear down + fall back to WebGL2 with rationale),
    NOT a fail-explicit library-internal throw — the two are never collapsed.

15. **§15 click-to-warp is NET-NEW DESIGN, not a port (the constellation-warp-design + every leverage slice).**
    §15's "first shipped in the slides constellation, GENERALIZE it" framing is a FACTUAL ERROR — `grep` proves
    warpTo/nearest/focal exists in NEITHER repo; slides has only an auto anomaly-DRIFT (`drift()` re-targets
    node[0] on a jittered easeInOutQuad). W17 AUTHORS the click-to-warp; slides `drift()` is the architectural
    ANALOG (same node-position-mutation class) it shares an escape with, NOT a source to port. The implementer
    must NOT hunt for a non-existent slides source. The load-bearing build constraints (all in W17 scope): the
    focal node is promoted to a FIRST-CLASS library concept (the consumer owns WHICH node is focal + its SKIN
    via drawOverlay; the library owns its POSITION + spring); `nearestNode` is a linear O(count) scan ("lattice
    point" = nearest drifting node — there is NO fixed lattice); LIVE-TARGET tracking stores the target node
    INDEX (chases the drifting target); the spring is a dt-stepped 2nd-order critically-damped integrator
    advanced INSIDE `stepField` (a `warpStep(field, dt)`) — `useSpring` is EXPLICITLY FORBIDDEN (it spawns a
    SECOND rAF outside the parked-substrate contract, defeating the offscreen/tab-hidden/PRM freeze).

16. **The constellation is a DECORATIVE proximity-graph, NOT a DATA-graph renderer (no-overfitting; the
    leverage:value.js slice).** W17 carries an explicit ABSTRACTION-GAP non-goal: the constellation will NOT
    absorb semantic fixed-topology graphs (value.js conversion graph, slides node-flow charts). Routing a
    semantic graph through `drawOverlay` would FAIL (drawOverlay paints OVER a random field it cannot pin to
    fixed nodes). A data-graph primitive, if ever wanted, is a SEPARATE component, not constellation prop-bloat.
    The W30 cardinal defect (light-dark() into Canvas2D) generalizes: `--constellation-*` tokens ship PLAIN-hsl
    light + `.dark` arms (NEVER `light-dark()` at the declaration — Canvas2D silently rejects it).

17. **The Fraunces cross-constellation contradiction is a HARD PRECONDITION of W22 (hist:muster + hist:words +
    idiom:speedtest).** W22 excises Fraunces; the AS-P5 deferred-ledger item ships the full-axes self-hosted
    Fraunces @font-face with ≥2 named consumers (value.js + words + slides clear the ≥2-consumer gate), AND
    muster K + words A.W5 design slices WANT the WONK/SOFT axes. AS-P5 (ship) and W22 (excise) CANNOT both be
    true. W22's §Archaeology adjudicates with the value.js+words+muster+slides roster as evidence: EITHER (a)
    the brand register is Plus-Jakarta+Fira and Fraunces is genuinely dead → KILL AS-P5, re-ground words A.W5 +
    value.js + slides onto Plus Jakarta (document the repoint per the clean-break precept); OR (b) Fraunces is
    the intended display face → W22's excision premise is WRONG; SHIP the full-axes @font-face (making the
    inert WONK/SOFT axes load-bearing), keep display=Fraunces/body=sans, re-scope W22 to "fix the wrong BODY
    default, NOT excise the face." The fix to "body defaults to a display serif" (the visual root of "fonts none
    are correct") holds under EITHER path. Unadjudicated, W22 strands ≥3 downstream consumers — the speedtest +
    words external font-preset consumers repoint either way (adoption legs route to W34).

18. **The slides `.deck-progress` → `<DeckProgress>` replacement is W32, NOT W24 (harden:storybook-primitives).**
    The prior charter double-assigned the cross-repo slides edit (W24 + W32) and gave W24 a dependsOn of only
    W00 — but the slides edit requires the H working-tree landed on a clean branch first (W30) and lives in the
    separate slides repo. W24 is LIBRARY-SIDE ONLY (the `/deck-progress` subpath + the rail-recipe fixes); the
    slides-side replacement + the `--progress-rail-*` token override + the consumer-#2 clearance + the
    PAGE-BOTTOM-not-dock placement ALL happen in W32 (which dependsOn W24 + W31). The binary invariant stays
    UNcleared until W32 lands — W24 does NOT claim "making slides consumer #2."

19. **The CSS god-module gate-extension lands FIRST, born-RED, as its own step (harden:encapsulation; the
    audit's gm0 staging).** Extending `proof:no-god-module` to scan `.css` must land BEFORE the carves: the
    instant the collector accepts `.css` it reports 4 born-RED-CORRECT violations (tokens/dock/utilities/glass),
    cleared by W25b (+ W06 for dock). A single combined wave could never pass its own gate until every carve is
    done (no green intermediate; a partial ships RED). Hence W25a (gate-extension + re-tag + the dist `@source`
    deadlink fix) is split from W25b (the carves). The utilities.css carve SEQUENCES AFTER the §7/§8
    metric-ownership decision (W28/W29) so the ~190-line metric-badge recipe relocates to the RIGHT repo —
    hence W25b's utilities-portion dependsOn on W29 (the tokens carve is unblocked). **glass.css (691) is NOT
    carved for length** — it has a SINGLE cohesion axis; a forced split is contrivance (§0). The CSS-aware
    gate's ceiling rationale is cohesion-not-length for single-axis files; a minimal `glass/material.css` split
    lands ONLY if the gate forces it, documented as the sole acceptable glass split.

20. **The legacy-gate-hardening (W27a) is split from the 878-ref full-tree commentary sweep (W27b)
    (harden:encapsulation).** The audit deliberately split the 3-ref barrel fix from the large mechanical scrub;
    the prior charter re-merged them. W27a is small/mechanical (the 3 barrel refs + promoting fail-explicit +
    no-legacy-commentary to release-parity for the 2 mis-tagged legacy gates ONLY + the at-LEAST-ci tag-parity
    meta-assert + the var-in-arbitrary guard gate); W27b is the large sweep (the gate generalized to
    src/+scripts/, the one-time 878-ref scrub distinguishing "delete landed-at-X notes" from "rewrite design-WHY
    tranche-letter-free", the Card stale-prop finalize, the scripts/ test-boundary). The gate-tag MODEL decision
    PRECEDES both W25a and W27a — it is W27a's first act, shared with W25a.

21. **The W25/W27 internal contradiction is resolved by the at-LEAST-ci tag model (harden:encapsulation).** The
    prior "ci+release on every static gate" (W27) would have flagged W25a's own `['local','ci']` choice AND
    redded 50 unnamed gates (only 21 carry release; the audit justified promoting exactly the 2 legacy-lane
    gates). W27a's meta-assertion is the at-LEAST-ci form (the manifest's real parity claim is local==ci; release
    is a deliberate subset), with the 2 legacy gates tagged `['local','ci','release']` as the named exception.
    W25a's no-god-module tag matches this model.

22. **DEDUP LEDGER — W41 is the only genuinely-new wave the DIGEST surfaced (W42 is the separate §18-directive
    net-new substrate, not a digest candidate); every other digest NEW-WAVE candidate DEDUP'd onto an existing
    wave (the CONVERGE dedup-hard mandate, 32 candidates overlap heavily).** The digest emitted ~30
    `NEW-WAVE?` candidates; all but ONE route onto an existing wave: Card-specular/Drawer-spring → W09/W21;
    forced-colors skin → **W36**; useTextHighlight + Canvas2D-lifecycle → **W37**; aurora-configurator restyle →
    **W38**; Lighthouse (demo + slides) → **W39**; demo-dock-nav + coherence re-audit → **W40**; §16 receiver +
    per-consumer idiom census (value.js/words/muster/keyframes/bbnf-buddy/bbnf-playground) → **W34**;
    primitive-prune consumer-migration DAG (keyframes HeaderRibbon/GlassPanel) → **W35**; speedtest AT/AU intake
    + R-CONSUME tail → W28 (expanded) + W34; configurator A-1/A-2 → W21; fourier LabeledSlider feature-gap → W21
    (folded, NOT a wave); pane-slide Transition-grammar promotion → a W34 ≥2-consumer WATCH (folded). The ONE
    candidate with NO existing home is the **publisher-side build + supplier-edge cohort** (the `build:watch`
    dts gap + the orphan AW.W27 keyframes-4 `file:`-link republish + the E2 value-0.11 cap + the devDep↔peer
    parity gate + the keyframes export-stability check) → **W41 (NEW)**. The dedup is HARD: a candidate spawns a
    new wave only when no existing wave's scope can absorb it without scope-creep. **W42 (the unified
    liquid-morph substrate) is a SEPARATE net-new wave on a different basis** — it is not a digest dedup
    candidate but the REQUIREMENTS §18.3 net-new substrate mandate (the dock single-scalar `--dock-morph-t` of
    W01 is its FIRST consumer); it is a DISTINCT wave (not folded into W01) so the glass-primitive second
    consumer lands WITH the substrate at one ≥2-consumer close (RATIFY — §5.3, waves/AX.W42 §Open-Questions).

23. **The keyframes.js dock-spring is the SHIPPED-CORRECT baseline ORACLE, NOT a defect to re-fix (idiom:keyframes
    + hist:keyframes + harden:dock-graphics).** keyframes.js's FIRST dock implementation (the single-clock
    high-water `e82633e`/`e8380d7`) and the published `(0.32,0.7)` `--spring-dock` curve (sampled ramp peak
    ~+4.6%, the system-dock baseline) are the CORRECT references the §1.2 directive names. The W01 single-scalar
    morph COMPOSES with the published `(0.32,0.7)` curve (no re-bounce); W05 pins the governed "dock register"
    to it. keyframes.js's `^3.4.0` pin ships the pre-AW.W2 bouncy `(0.5,0.5)` register (peak +16.3%) — that is
    the STALE-PIN symptom the AX bump fixes (W35 consume-leg), NOT a glass-ui-HEAD defect. The keyframes dock is
    the ORACLE the dock band measures against; the fourier two-co-mounted-docks VT-name collision
    (`glass-dock-1` duplicate → dropped morph snapshot + ~13 red e2e) is the corroborating WITNESS that VT is
    the wrong primitive for the layout morph (a W00 π-lane / W01 regression fixture). W01 RETIRES the dock-COLLAPSE
    VT fork while PRESERVING the per-instance `view-transition-name` route-morph seam + `proof:vt-names` that
    fourier's K+ critical path route-morphs through (separable concerns the prior charter conflated; live
    re-diagnose per the W00 wave-open ritual; if the name truly must die, an inv-16'-style annex coordinates
    fourier's K.W1 + e2e with a born-RED fourier-side gate).

24. **The cross-repo consume-gate discipline binds every §20 hand-off (the §20 cross-session forcing
    function).** Two consumer sessions (USF tranche B + keyframes.js tranche H) audited glass-ui-owned items
    IN the consumer and NEVER patched them there (per inv-16 — kf/USF consume the PUBLISHED glass-ui; these
    are HAND-OFFs). Each hand-off pairs a born-RED CONSUMER gate (the consume-signal: kf
    `proof:specular-handoff` / `proof:single-column-pack` / `proof:glass-and-cartoon` / the VT-types
    demo-smoke / `proof:dock-morph-settled`; USF's specular + dock-control optical-parity visual gates) that
    greens ONLY when glass-ui SHIPS the fix AND the consumer bumps — the chronic-closure forcing function (no
    silent forever-punt). These belong in W34 (the cross-constellation consumer-adoption ledger) + W35 (the
    consumer-migration DAG) tracking; the discipline itself reinforces the W00 visual-truth /
    no-silent-deferral philosophy. The publish hinge is W33/W34: USF + kf bump 3.x → the AX publish, full
    live re-audit after (the batch-1 reconciliation rides along). Sources:
    `usf/docs/tranches/B/GLASS-UI-AX-HANDOFF.md`, kf `docs/tranches/H/valuejs-parsethat-glassui-handoff.md`.

25. **OKLCh-core is CONFIRMED-CORRECT at SOTA — W11 is seam-level, NOT a redo (extends note 7; the aurora
    research §SOTA fold).** The 32-facet aurora corpus is emphatic: the OKLCh color core is already at SOTA —
    EIGHT things the engine does are confirmed-correct by the literature (linear-light compositing + a single
    sRGB OETF close, the Ottosson matrices, the cusp-aware gamut mapping, etc. — see waves/AX.W11 §SOTA
    deepening). So W11 stays SEAM-LEVEL (the catch-light OKLCh-derive + the palette-ramp twin hoist + the
    planned→landed doc sweep + the WGSL `samplePalette` gate-hole close), NOT a color-core redo. Do NOT
    re-litigate the migration (note 7 already established it is genuinely landed + machine-locked). The
    cusp-aware gamut mapping is the named upgrade the catch-light/ramp seam work composes with.

26. **The W08 composed-k flood is the DEFINITIVE root cause — a measurable re-solve, NOT a magic number
    (extends note 13; the blob research §SOTA fold makes it definitive).** The 32-facet blob corpus makes the
    W08 diagnosis DEFINITIVE: IQ-2024 NORMALIZES smin so `k` IS the max merge-inflation (the quadratic
    `k*=4.0` pre-scale, `g(0)=1/4`) — the composed live `uSmoothK ≈ 0.21` → in-shader effective `k ≈ 0.84` in
    a 1.0-wide UV is ≈6× the working band, flooding the SDF; the fix is a coupled re-derivation of the config
    default + mood lerp + the restored POS_SCALE, NOT a magic-number patch (see waves/AX.W08 §SOTA deepening).
    The analytic-gradient smin (facet [2]) is the named upgrade W15 inherits. POS_SCALE disposition
    (re-affirmed, note 13): W08 takes the MINIMAL un-flood (restore `POS_SCALE` on the `uSmoothK` upload — it
    IS a length and must ride the same compression as every other length-like uniform — + re-tune the composed
    band to ~0.03-0.08 effective; W08 does NOT excise POS_SCALE); W15 KEEPS that regime OR, IF it re-expresses
    all lengths in wrapper-normalized units, re-derives the ENTIRE length cohort (body/sat/orbit/smin/noise)
    ATOMICALLY in that wave with `proof:blob-render` as the regression-lock — never a partial migration that
    re-floods.

27. **The prototype-gating truths (the PROTOTYPE-HARDEN drive-readiness gate; see §5).** The prototype/harden
    pass surfaced four load-bearing truths the charter records so no wave drives on a false assumption: (a)
    **W01's `--dock-morph-t` is NET-NEW architecture, not a tune** — HEAD does pixel-space FLIP with NO
    `--dock-morph-t` scalar in the tree, so W01 builds the single-scalar one-clock model from scratch (it must
    spike GO before driving). (b) **The `@property`-perf claim is HALF-TRUE** — a registered `<number>`
    scalar interpolates composited, but the `calc()` axes it drives (`inline-size`, `padding`, `border-radius`,
    `background`) are D/C-tier and reflow/repaint per frame; the morph is acceptable ONLY because the
    clip-reveal aperture makes it paint-bounded (content laid out once, box-as-window), NOT because
    `@property` makes it free — audit which axes can move to S-tier `transform`/`clip-path` and keep the
    morphing subtree small (waves/AX.W01 §SOTA.4). (c) **Velocity-continuity is the HIGHEST-regression-risk
    piece** — the mid-flight-retarget re-seat from `(value, velocity)` is the one load-bearing iOS-feel item
    VT/`linear()` fundamentally CANNOT do; the 479→~130 rewrite MUST preserve the AV.W9.2 retarget, and the
    PoC must prove a mid-flight re-toggle reverses fluidly on a REAL browser (happy-dom cannot reproduce it).
    (d) **W42's reuse-ledger conflates `useSpring` vs `SpringProgress` FLIP** — the ~70%-assembly inventory
    must be RATIFIED against the live model: `useSpring` wraps `SpringProgress.play()` which spawns its OWN
    rAF bound to a reactive ref (correct for an element's own reshape, but FORBIDDEN where a SECOND rAF would
    defeat the parked-substrate contract — the W17 warp integrator is the cautionary instance). The W42
    second-consumer + the single-scalar substrate are P1 highest-architecture-risk PoCs that spike GO in the
    §5 pass before W42 drives.

28. **§6.6 "perfect EVERY component" routes DIFFUSELY — it is a union, not a wave (HARDENING §A.1).** §6.6 is
    the union of each component-perfection wave (dock W01-W06, aurora W10-W14, blob W15-W16, sliders W23,
    primitives W19-W22/W36, **fourier-field W43**) + the W40 coherence TRIAD (animation + design + naming) +
    W18's reads-coherently close — NOT a single "perfect every component" wave (which would be unfalsifiable
    overfit). The INTERACTION-cohesion axis is W40's THIRD leg (alongside animation-coherence + naming). The
    §2.3 derive-color PUBLIC door is VAL-1 kill-gated (the seam satisfies); the §2.9/§3.5/§4.4 research READMEs
    carry the full research shape already in-tree (W11/W16/W17/W43 sweep, NOT re-author). §2.4 WebGPU painterly
    is DISCHARGED-AS-EXCISE (W14 Branch B — deferred-with-rationale, substrate-without-consumer; the multi-pass
    Kuwahara is the opt-in enhancement over a parity-floor field, never the auto-default — §4 note 14). A reader
    scanning §6.6/§2.4 against the cut sees the routing recorded here, not a gap.

29. **§11.4/§11.5 route to W26 + W25b + W34/§16.3 — the W33 cross-walk extends to §11 + §13 + §14 (HARDENING
    §A.2 + #11).** §11.4 (brittle-selector/reactivity audit) routes to W26 (the computed-derivation cleanup) +
    W25b (the non-idiomatic-Tailwind carve); §11.5 (library-optimum / gaps-glass-ui-vs-slides) routes to
    W34/§16.3 (the per-consumer idiom census) — but the W33 inheritance-ledger cross-walk previously enumerated
    only §13 + §14. **The W33 cross-walk EXTENDS to `§11 + §13 + §14`** so §11 is no longer implicit-only at
    close (every §11 sub-item gets an ADDRESSED-at-Wnn / RETIRES / ARCHIVES disposition, never "deferred").

30. **The verified shared-file WRITER MATRIX governs the lock manager — keyed on filename/selector, NEVER on
    `:NNN` line anchors (HARDENING §C.2 + #10).** The §22-collision census (REQUIREMENTS §22.4) under-counts
    every shared file; the lock manager keys off this verified writer matrix (every `:NNN` anchor drifts the
    instant a co-writer in its chain lands first):
    - `dock.css` — W01 (morph drivers) → W04 (wrap recipe) → W06 (carve into `src/styles/dock/`, LAST). W25b
      does NOT touch dock.css.
    - `glass.css` — W09 (`.glass-material::before` specular) · W24 (`.glass-progress-rail`) · W42 (appended
      `@supports`) — line-region-disjoint; W20 + W25b do NOT carve it. Orchestrator serializes the three.
    - `tokens.css` — W05 (del) → W09 (add) → W17 (add `--constellation-*`) → W20 (comment) → W22 → W25b (§-seam
      carve, LAST, EXHAUSTIVE — absorbs ALL cohorts incl. W09 specular + W17 constellation).
    - `utilities.css` — W21/W22/W28/W29/W36/W37/W38 (additive appends) → W25b (RELOCATE, LAST).
    - `index.css` @import cascade — W06 (add dock/*) + W19 (del) + W29 (del) + W22 → W25b (re-point WHOLE
      cascade, LAST; W25b dependsOn must add W19).
    - `demo/stories/manifest.ts` — W06/W10/W19/W20/W21/W29 (each drops/edits its OWN rows WITH the src change) +
      **W43 (ADDS its OWN fourier-field Substrates row)** → W18 (authors the NEW tree + re-baselines
      `EXPECTED_TREE`, LAST, NEVER deletes a prune/add wave's row) → W40 (nav SHELL, zero manifest) → W39
      (READ-only).
    - `dock/composables/index.ts` — W01 (add `useLayerTransition`) + W02 + W03 (`useDockHold`) → W26 (DROP the
      `useOptionalDockLayerGroupContext` re-export, AFTER the dock band).
    - `api/index.ts` — W20 (the MetricCell comment rewrite) + W17 (a constellation type) + **W43 (ADDS a
      self-contained fourier-field block)** — disjoint by BLOCK, append-only, three-way-merge-safe.
    - `AX.md` / `PROGRESS.md` — NOT collisions (orchestrator-owned, agent-read-only).

31. **STANDING line-number note — every spec's `:NNN` anchors are `eaba94f`-relative; HEAD is `cdcf331`
    (HARDENING §G #29).** The per-wave specs were anchored to `eaba94f` (the audit baseline); HEAD is
    `cdcf331` (the src baseline is UNCHANGED for the audited waves — the intervening commits are AX-docs +
    the I-session fourier-field lift — so `eaba94f` remains the correct audit baseline, only line offsets
    drift). EVERY agent RE-LOCATES a cited symbol BY NAME at impl time, NEVER by raw line; the Cadence
    step-1 live-re-diagnosis ritual re-proves each anchor against HEAD. The W19/W20 package.json blocks
    drifted ~7 lines; the metric-pill barrel ref drifted `:101`→`:95` (W21); the GlassPanelVariant comment
    is at `:217` (W20); vReveal is on root barrel + `/motion-core` not `/motion` (W32, the
    deploy-path-build-break correction). Convert package.json/charter citations to content/grep anchors at
    impl. This note governs ALL specs — it is recorded once here rather than stamped on each.

---

## §5 — Prototype-and-harden gating (the drive-readiness gate)

NOTHING drives on an unproven assumption. Two backlogs are the drive-readiness gate for the whole tranche;
this section REFERENCES them (the full PoC/edge-case enumeration lives in the backlog docs, NOT duplicated
here):

- **`docs/tranches/AX/PROTOTYPE-HARDEN.md`** — the prototype-and-harden backlog (17 prioritized PoCs + the
  hardening backlog 2A-2G + the grouping + the drive-readiness verdict). The load-bearing sequencing law:
  **W00 first** (the π lane, proven on REAL devices — a software-fallback WebGPU false-GREENs the aurora-black
  gate) → **the two ratification hinges** (W42 distinct-vs-fold, W22 Fraunces) → **the device PoCs** → **the
  visual bands against a working π-lane**; cross-repo + slides waves are publish-currency-gated carries.
- **`docs/tranches/AX/DOCK-FACILITIES.md`** — the §19 dock prototype+harden matrix (all 12 dock facilities,
  each a prototype-effort + GO/NO-GO hinge + visual-truth gate; the four cross-cutting morph-substrate
  invariants promoted to W42; the convergent single-spike showcase plan).

### §5.1 — The high-risk PoCs that MUST spike GO before their wave drives

Each is a minimal throwaway spike that retires a named architecture/visual risk; a NO-GO re-scopes its wave
(it does not silently proceed):

- **Lensing-backdrop-filter (W42 / W20 neighbourhood)** — the `@supports`-gated `--glass-refract-scale`
  springs-off-`--morph-t` fold; the authored map disagrees with its own comment (a crude `radialGradient`
  fisheye vs the documented Snell squircle, never device-judged). Spike the LOOK + the mechanism + the
  non-Chromium flat-glass degrade on a real device before W42 lands the fold.
- **Dock single-scalar morph (W01) + the morph substrate (W42)** — `--dock-morph-t` is NET-NEW (HEAD does
  pixel-space FLIP); the interruptible single-scalar one-clock model + the velocity-continuity retarget
  (highest-regression-risk, §4 note 27c) spike on a REAL browser (happy-dom cannot reproduce the
  iOS-feel retarget). The W42 second-consumer choice (tab-indicator glide vs card→detail expand) RATIFIES
  against the live audit — the consumer must read BETTER on the substrate, not just compile.
- **Aurora WebGPU storage-buffer (W07)** — the `var<uniform>`→`var<storage,read>` dynamic-index flip + the
  f32-cast on a real Metal device (a software fallback false-GREENs the black-canvas gate — the sharpest
  hidden risk, runnable now).
- **Blob smin (W08/W15)** — the composed-k un-flood + the analytic-gradient smin + the lit warm-cream
  contained droplet against the footprint budget.
- **Van-Gogh fidelity (W13)** — a LIVE bake against actual Van Gogh / oil-pastel reference works is the
  oracle (a passthrough + a shared body both PASS the current text gates — a green snapshot is NOT proof).

**Fourier-field SOTA research (W43) — the ONE DEFERRED-by-design exception to the pre-drive spike rule.** Unlike
the PoCs above (each spikes GO BEFORE its wave drives), the fourier-field 32-facet SOTA research is NOT a
pre-drive spike — it is an ORCHESTRATOR-DRIVEN workflow DEFERRED to run MID-TRANCHE, during W43's drive window,
AFTER the aurora GPU band (W07/W14) settles (REQUIREMENTS §26.2; §7). RATIONALE: the GPU-primitive substrate the
research depends on (the WebGPU `createGPUCanvas` + the optimized GPU primitives) is built/perfected by W07/W14
EARLIER in the tranche — so the research lands on a KNOWN, SETTLED GPU substrate rather than guessing at it. The
research→fold pattern is identical to liquid-glass/aurora/blob, just TIME-SHIFTED into execution; the
orchestrator folds the findings into W43 + the README at that point. W43's born-RED close (the J.W1 intensity
model + the J.W9 citizenship) does NOT gate on the research — the research deepens, it does not block.

### §5.2 — The dock-facility showcase as the convergent visual-truth proof

`DOCK-FACILITIES.md` §5 recommends ONE throwaway `dock-facility-showcase.vue` route co-mounting all 12 §19
facilities across six dock instances on the post-W01 single-scalar driver, with one instrumentation harness
(the W00 π-lane test-seam, one rAF timeline, the interruption matrix, the composition assertions, the PRM
pass), closing on a paired-π BEFORE/AFTER/DELTA at 3 viewports × light/dark on the DEFAULT engine. This is
the convergent visual-truth proof that the 12 facilities are ONE morph model — the single guard against the
AW headless-green/visually-broken gap recurring across the whole dock surface. Two structural flags the
matrix surfaced: §19.6 carousel-dock is OWNERLESS (recommend minting a dedicated composition wave), and
§19.8's "useIdle composable" is a charter fiction (it is inline `scheduleCollapse` machinery in
`useDockState.ts` with a 2000/2500ms delay divergence — name it, do not invent a composable that does not
exist).

### §5.3 — The ratify-before-drive decisions (forcing functions)

These un-ratified decisions gate their wave from driving until adjudicated (the recommended ratify order is
in `PROTOTYPE-HARDEN.md` Part 2A):

- **Font register (W22)** — the Fraunces cross-constellation contradiction (KILL AS-P5 + re-ground onto
  Plus-Jakarta, OR SHIP the full-axes face + re-scope W22 to the body-default fix). §4 note 17; HARD
  precondition of any excision.
- **WebGPU-parity-default (W07↔W14)** — the `WEBGPU_PARITY` lever: keep WebGPU as an OPT-IN enhancement over
  a parity-floor field (the de-facto DELETE branch) vs W14 ports the six mediums into WGSL. §4 note 14.
- **Glass-scrubber rename (W23)** — accept `standard` as the CVA key (prose-name only, zero churn) vs rename
  standard→glass-scrubber across the keyset + every call-site. USER-ADJUDICATED, not a runtime defect.
- **POS_SCALE (W08/W15)** — the minimal un-flood regime W08 owns + W15 inherits (KEEP) vs the full
  wrapper-normalized re-derivation (atomic, W15 only). §4 notes 13 + 26.
- **W42 second-consumer (W42)** — which glass primitive (tab-indicator glide vs card→detail expand) AND the
  distinct-wave-vs-fold-into-W01 decision — RATIFY against the live re-diagnosis at wave-open (§4 note 27d;
  waves/AX.W42 §Open-Questions).
- **Specular off-vs-subtle (W09)** — the Card `specular` default: `subtle` (rest≈0) vs `off` — flat-data
  consumers want `off` trivially declarable (§20 USF-1/kf-G-1 hand-off; §4 note 24).

---

## §6 — Autonomous-resilience governance (REQUIREMENTS §22.4b — mandatory under the §0b execution mandate)

The canonical clause below lives ONCE here and is instantiated at the tail of every wave's `## Triumvirate`
section (directly above `## HardGate`). It authorizes the implementing agent to work AROUND a roadblock with
an idiomatic gestalt fix rather than stall — the single highest-value provision for the unattended run.

### §6.1 — The canonical clause (master template)

> **Autonomous-resilience clause (REQUIREMENTS §22.4b — mandatory; governs every wave under the §0b
> autonomous mandate).** A roadblock is a path-forward, not a stop. The implementing agent is AUTHORIZED,
> without waiting for a user prompt, to:
> 1. **Devise an idiomatic GESTALT fix** when the spec-prescribed approach hits a technical roadblock or
>    proves wrong. If the better idiomatic fix stays WITHIN this wave's FileBounds and violates no precept,
>    apply it directly — re-derive from first principles, no workaround/legacy/special-case (§0). Record the
>    divergence + rationale in the wave's audit JSON.
> 2. **Spawn a tangent triumvirate to work AROUND an error**, never stall. If the fix would expand
>    FileBounds, cross a sibling-wave boundary, re-open a §5.3 ratify, or a hard gate fails non-locally / a
>    diagnostic loop hits its third iteration, HALT the failing unit and dispatch the standard triumvirate
>    (research → plan-augment carrying the mandatory `## Exact Wave-Amendment Text` → redress; HARD CAPs
>    20/15/30 min; artefacts `audit/{COHORT}-research|plan|redress.md`). Work the tangent to resolution,
>    resume the main line. Do NOT redispatch the failing unit alone; do NOT hand-roll a bespoke recovery; do
>    NOT absorb a scope reveal silently.
> 3. **Escalate to the orchestrator ONLY when genuinely user-gated** — which is ONLY when it (i) requires a
>    §21 hard-prohibited action class (financial credentials, account creation, access-control/sharing
>    changes, permanent data deletion, financial trades, security-setting changes, CAPTCHA), (ii) would
>    violate a §21 held invariant (touch `docs/precepts/`; source-embed `wolfpack-ledger-2026`; an agent
>    staging/committing the main index; inv-16' writing a dirty sibling), or (iii) is a §5.3 ratify the
>    charter marks USER-ADJUDICATED (W22 Fraunces, W23 glass-scrubber rename, W42 second-consumer).
>    EVERYTHING ELSE — an ambiguous root cause, a wrong-approach roadblock, a non-local gate failure — is
>    resolved autonomously per (1)/(2). On a server throttle/session cap → ScheduleWakeup + resume, never
>    abort. On cross-session clobber → coordinate (read the sibling branch/locks), sequence, sleep; never
>    corrupt a sibling tree.

### §6.2 — The halt-vs-work-around decision tree (4 classes — the closed, decidable boundary)

| Class | Trigger | Action |
|---|---|---|
| **1 · WORK-AROUND** (most cases) | A blocking obstacle that is locally fixable, in-FileBounds, precept-clean | Devise an idiomatic gestalt fix in-line. Resume. No stall, no user-gate. |
| **2 · TRIUMVIRATE** | Scope-reveal (out-of-FileBounds / sibling boundary / §5.3 re-open) · non-local hard-gate failure · 3rd diagnostic-loop iteration | Dispatch research→plan-augment(Exact-Wave-Amendment-Text)→redress (caps 20/15/30). Work AROUND via the amended spec. Scope-reveal is NEVER absorbed in-line. Still no user-gate. |
| **3 · HALT-AND-RATIFY** | A §5.3 ratify-before-drive reached un-ratified, OR any precept the agent would have to VIOLATE to proceed | Stop. Surface to the orchestrator. Never self-ratify. Orchestrator takes the recorded default or escalates. |
| **4 · HALT-AND-USER-GATE** | A §21 held-invariant breach the work genuinely needs, OR a missing deploy credential | Stop. Surface as a user-gate NOW. NEVER perform silently, NEVER silently skip. |

**Vocabulary disambiguation (load-bearing):** §0's banned "workaround" = a shortcut that leaves a
legacy/fallback/special-case in the SHIPPED code. §22.4b's sanctioned "work AROUND a roadblock" = an
idiomatic gestalt fix that itself satisfies §0. A Class-1/2 fix is sanctioned ONLY when precept-clean. The
per-wave "halt" means "halt THIS edit-line and spawn a tangent triumvirate that proceeds AUTONOMOUSLY" —
NEVER "stop and await a human" during the unattended window.

### §6.3 — Cross-session clobber ritual (orchestrator-owned; agents stay read-only)

Run before each integration commit and at each wakeup: (1) `git fetch origin` + compare
`origin/at-dock-convergence` vs the recorded baseline — on a delta, another session pushed: pause, inspect
read-only, orchestrator rebases the AX line, re-run gates, resume. (2) Check `.git/index.lock` on main + each
sibling — a live lock = a concurrent writer → ScheduleWakeup, retry. (3) Re-capture each sibling
HEAD+branch+`git status --porcelain` into `coordination/CONSTELLATION.md`; a dirty/unexpected-branch sibling
is NOT a halt — record it, dispatch its leg as a born-RED handoff gate. **Satisfied-witness branch:** if the
W00 live re-diagnosis finds a RED witness ALREADY GREEN (upstream landed out-of-band — the slides tranche-I
land, the 3.7.0 publish), do NOT execute that witness's fix; record it ADDRESSED-out-of-band with the landing
commit, COLLAPSE the wave scope to the surviving RED witnesses, verify green holds. A satisfied witness is a
scope-collapse, never a re-do.

---

## §7 — Slides Tranche J coordination (REQUIREMENTS §25; AX drives J to completion)

slides Tranche J ("legibility-and-flow" on the feedback-coder deck — `slides/docs/tranches/J/J.md`, 11 waves
J.W0-W10, the §7 decisions USER-RATIFIED 2026-06-08) is in ACTIVE development. AX drives J to completion: its
glass-ui-session waves become AX work; its slides waves ride the AX slides leg. The one complaint J reduces to:
the feedback-coder deck's two signature surfaces — the Fourier hero trace + the Slide-2 coded-turn bank — both
render to near-nothing a stakeholder can see; J makes both legible by construction behind measured floors. The
feedback-coder deck is NO LONGER "never touch" — J is the tranche that develops it (the I-session shipped it to
prod; J refines it). Plan basis: `slides/docs/tranches/J/J.md` + `audit/DEEP-AUDIT-DIGEST.md` (the 32-finder +
4-synthesis, 176 findings — J's equivalent of AX's deep-audit-corpus; read it for the per-wave detail).

**The J §7 decisions are USER-RATIFIED (no AX gate).** keyboard = reka-roving Option A; a11y =
`playwright-lighthouse` (a11y ≥ 90 floor); square-wave = RETRACT-the-claim default; gloss = beneath the
CodeTree; intensity targets = hero≈0.55 / final≈0.45. AX drives J on the ratified defaults — none is a
user-gate.

### §7.1 — J's GLASS-UI arms ARE AX waves

- **J.W1 (fourier-field per-variant intensity model) → AX.W43 CORE.** The per-variant intensity BUNDLE +
  `intensity` prop (the Aurora `opacityCeiling` seam) replacing the single `OUTLINE_PEAK_ALPHA = 0.24`; the
  age^1.4 trail + head-glow-strongest; the zero-allocation render loop; NO compat alias. The §7.1 targets
  (hero≈0.55/final≈0.45) are W43's ratified defaults. See waves/AX.W43 §Scope-1-4.
- **J.W9 (glass-ui half — fourier-field CITIZENSHIP) → AX.W43 + AX.W18 + AX.W33.** The research-backed README +
  mount-smoke + demo story + the `api/index.ts` public-surface seat + the `/fourier-field` subpath (sibling
  parity with aurora/blob/constellation) land in W43; W18 SEATS fourier-field in the Substrates IA band; W33
  sweeps the README to currency. (REQUIREMENTS §26 RAISES this from "citizenship chore" to first-class
  perfection + the mid-tranche SOTA research — W43.)
- **J.W8 (glass-ui half — the `/prng` first-class subpath) → keep-book (J.W8 / AX.W29/W37).** Gated on a
  ≥2-EXTERNAL-consumer need outside watercolor-dot/fourier-field (currently a keep-book hard-boundary). AX
  single-sources prng at `src/utils/prng.ts` (watercolor-dot + goo-blob import it); fourier-field imports the
  single-source too, NOT a fork. If fourier-field makes it ≥2 EXTERNAL consumers (the fourier-analysis adoption,
  W43 axis d), the `/prng` subpath is justified — else keep-book; J stands up the slides-side single-source
  regardless.

### §7.2 — J's RECONCILIATION arms AX already owns

- **J.W9 (the 3.7.0→main reconciliation) == AX.W33's close (already wired).** 3.7.0 was published from
  `at-dock-convergence` (a branch tip), NOT glass-ui `main`; J.W9 requires landing the AX line onto `main` via
  PR + re-cutting a provenance-clean tag, and establishes the STANDING RULE "slides only pins a `main`-sourced
  glass-ui publish." **AX W33's close + the §0b deploy DAG discharge this for J:** the AX publish (3.8.0) lands
  the AX line on `main` via PR + a provenance-clean tag, so J.W2 (and every slides consume) pins a
  `main`-sourced artifact. A SHARED close obligation — W33 discharges it (§24 + the §0b deploy DAG). The §24
  3.7.0-source-delta verify-present (fourier-field/useCanvas2D/constellation-fix, VERIFIED at AX HEAD) rides W33.
- **J.W9 FLIPS the AW.W17 Constellation swap == AX.W17's second consumer (already wired §4 note 12 + the W17
  spec).** 3.7.0 ships `./constellation`, flipping the ≥2-consumer gate; J is the consumer (til-briefing
  Slide01/SlideXray runs deck-local `constellation.ts`). **AX.W17 + J.W9 co-decide:** W17 ships the
  `/constellation` light/dark tokens + the §15 click-warp + the §23.3 per-mode translucency; J.W9 swaps the
  deck-local constellation onto the published component (or formally closes with a recorded reason). **AX.W17's
  "slides adopts" leg IS J.W9's constellation swap** (the W17 spec routes the adoption to AX.W30/W31, gated on
  the AX publish; the I-session already shipped the slides-side light-mode leak fix — a satisfied witness W30
  treats as ADDRESSED-out-of-band).

### §7.3 — J's SLIDES arms ride the AX slides leg (a feedback-coder sub-arm parallel to W30-W32)

J.W0-W10's slides-`src/` work on the feedback-coder deck (the bank glass-container, the in-flow gloss, the
scoped keyboard contract, the mobile no-occlusion gate, the deck atmosphere, the dead-code purge + a11y floor,
the close + re-deploy) rides the AX slides leg as a **feedback-coder sub-arm PARALLEL to the til-briefing
W30-W32 arm**. RECONCILE: AX slides waves W30-W32 target the TIL-BRIEFING deck; J targets the FEEDBACK-CODER
deck — a DIFFERENT deck, the same slides repo. Both decks deploy from `main`. **AX coordinates BOTH onto `main`
→ ONE deploy** (`deploy-pages.yml`, head_branch==main). The til-briefing arm cuts `tranche/AX-slides` forward
from `deck/feedback-coder` (W30 protocol); the J feedback-coder sub-arm is the J-authored deck work on the same
forward branch (FileBounds-disjoint by deck dir — til-briefing `src/decks/til-briefing/**` for W30-W32, the
feedback-coder deck dir for the J sub-arm). The fourier-field `intensity` consume (J.W2) + the constellation
swap (J.W9) are the cross-deck shared-library reads, gated on the AX publish.

### §7.4 — J HARD BOUNDARIES (Class-4 user-hinges — named, NOT agent-executable)

Per the §6.2 Class-4 rule, AX surfaces each as a named late user-gate, never silently skips: the DOI/FAIR
Zenodo deposit (account+token); `CLOUDFLARE_API_TOKEN` (CI secret — the deploy is CI output, no agent handles
it); verbatim real NCSU/Green exemplars (IRB-bound — the synthetic bank ships). **The named Class-4 user-hinge
distinct to J: the feedback-coder-no-remote.** Unlike til-briefing (CI-deployed to slides.friday.institute), the
feedback-coder deck's repo has ZERO git remotes — its deploy/tag-push is a credentialed USER action, distinct
from the CI-deployed til-briefing. AX drives J's CODE to completion + gates green; the feedback-coder
push/deploy is the ONE named user-hinge (resolve at drive-open: is feedback-coder deployed via the same slides
repo→CF Pages, or a separate credentialed push?).

### §7.5 — Coordination protocol

AX drives J's glass-ui arms (the fourier-field intensity W43 + the J.W9 citizenship + the prng-subpath decision
+ the 3.7.0→main reconciliation at W33 + the W17 constellation co-decision) AS AX WAVES, and J's slides arms as
the AX slides leg's feedback-coder sub-arm (parallel to the til-briefing W30-W32 arm, both → main → one deploy).
J.W0's "3.7.0 export-shape reconciliation" (confirm no constellation/useCanvas2D surface fires the AX.W17 swap
prematurely) is a READ the AX.W17 spec must not break. The fold into this charter (the new W43 + the
W17/W18/W33/W37 + the slides-leg extensions) is THIS pass; the J slides-side execution rides the drive.
