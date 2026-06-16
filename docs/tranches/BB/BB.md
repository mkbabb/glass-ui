# Tranche BB — Integrity · Performance · Consolidation

**Seed**: the user's 32-agent deep audit of the BA tranche + all changes + the full prompt corpus + the chronic-deferral ledger (2026-06-16), the R8-form gesture that births the next tranche.
**Predecessor**: BA / 4.0.0 — PUBLISHED 2026-06-16 (`npm latest = 4.0.0`, gated `release.yml` provenance, d6 fork closed). See [[project_glassui_400_published]].
**Phase**: tranche development. NOT an implementation phase.
**Authoring inputs**: the 32-lane audit (`tasks/w575keaqd.output`, 43 high / 52 med / 60 low findings), the live publish experience (the release-gate + ci-gate hardening), and the disposition register + FINAL §6 harvest.

## The headline

**BB makes the close honest, owns the two axes the library has never owned (performance + cross-repo adopt), and drains the chronic backlog by DECIDING each item — build, retire, or meet — never re-booking it.**

The audit's central revelation, corroborated live during the 4.0.0 publish: **the BA "complete" close was over-claimed.** It declared `gates.mjs --run local` green and `proof:ba-final` GREEN, but:

- the **release** gate matrix was RED — the 4.0.0 publish needed **6 post-merge fix commits** (a build blocker: `@mkbabb/pencil-boil` an optional peer yet statically imported, masked by the sibling `node_modules`; a stale `3.9.0` lockfile; `proof:consumers:static`'s root-surface allowlist; and 5 release-only gates: `motion-demo`/`motion2`/`fail-explicit`/`no-retired-survivor`/`gen-ci-fresh`);
- **master CI is STILL RED** on real source/demo/doc-drift gates the `--run local` close never honestly ran (`no-god-module`'s ratchet drained to ∅ while 3 files exceed 500 lines; `shell-config`; `readme-meta-clean`; `storybook-complete`; and others — the precise siblings-absent list is BB Batch-0's input);
- the **cardinal-lesson ledger gate is a silent no-op** for all of BA (parses 0 wave rows, prints green);
- the **gestalt gate** (`proof:ba-gestalt`) — the binding close — checks only desktop PNGs by existence+nonzero-size: the 16 mobile captures are never read, freshness is checked by zero gate, the surface-hash headers are vacuous;
- **dead code shipped** that 4 docs claim was retired (the static `.scroll-fade-*` + `--mask-fade-width`).

So BB's spine is **INTEGRITY** — and on that honest floor it takes on the forward work the audit ranks highest: **PERFORMANCE** (the never-gated chronic axis — Lighthouse, CLS, critical-CSS), the **architectural transpositions** (carve the god-modules, unify the canvas leaves, the dark-ink relative-color recipe), and the **cross-repo ADOPT loop** (the live 4.0.0 hinge — value.js's excluded peer range, the slides adopt, the EasingPicker) that the library has never owned as a tranche concern.

## §0 — RE-GROUND (the publish-state reconcile)

4.0.0 is published and valid (the `release` 43-gate subset is genuinely green on the clean runner; the gestalt verdicts are 8/8). The audit straddled the publish — early lanes (L10/L16/L29) flagged the release gaps I then fixed; later lanes (L31) confirm "the 3 irreversible legs are ALREADY DONE; d6 fork-close COMPLETE." So the stale "HELD for greenlight" prose in `BA/FINAL.md:205` + `PROGRESS.md:362-363` is a doc-reconcile item (Batch-0), not open work.

```
node scripts/gates.mjs --run ci      # the master-CI-red set — Batch-0's input (siblings-absent)
node scripts/proof-no-god-module.mjs # RED: 3 files > 500, ratchet ∅ (the P-1 close-class lie)
git log master --oneline -7          # the publish line: merge + 6 hardening commits
cat /tmp/cisweep-result.txt          # the definitive siblings-absent ci-failure list
```

## §1 — The wave-set (8 batches + the cross-repo PRIMITIVES band — 44 waves total)

Each wave names its audit-lane source. `(C)` = a chronic deferral the user directed folded. Charges are one-line; the per-wave specs live in `waves/`. **The cross-repo SCOPE ADDITION (user-directed 2026-06-16) lives in `BB-AMENDMENT-crossrepo.md`** — the 10-wave PRIMITIVES band (the speedtest AW v2.1 living-chrome asks; `W-SCROLL-CARD` builds on `W-CARD-COMPOSITE`), `W-SLIDES-DRIVE` (drive slides Tranche N in totality; supersedes the coordination-only `W-SLIDES-HANDOFF` below), and `W-CROSSREPO-ASKS`. The sibling responses + the fold record are in `coordination/cross-repo-inbound.md`. `PROGRESS.md` is the complete wave index (the running total — 71 waves at HEAD after the atlas-expand band; this §1 header figure trails it). **The LIQUID-GLASS band** (`BB-AMENDMENT-liquid-glass.md`, 8 waves) + the **deep-SOTA layer** (`BB-AMENDMENT-deep-sota.md`, 5 waves — the Apple+awwwards live-audit harden/refine/prune) + the **coherence-harden fold** (`BB-AMENDMENT-coherence-harden.md`: the §1 cross-repo hardenings + W-DAG-RECONCILE §2 + the §3 WebGPU REVISIT) + the **constellation dependency-modernization band** (`BB-AMENDMENT-constellation-modernize.md` — the user-directed "every repo on latest, no legacy" mandate: a pre-Batch-0 foundation **Batch C** (W-SPINE-LATEST the keystone hub kf-union→^4 / value-cap→^0.13.0-IDENTITY edit + the T1 gate-collapse deletions, W-SPINE-CONSTELLATION the born-RED `proof:constellation-spine` 6-clause gate, W-SPINE-LEDGER the legacy-class ledger) + the GENERALIZED Batch 5 (W-LEAF-MODERNIZE + W-CONSUMER-MODERNIZE; W-PEER-SPINE FOLDED into W-SPINE-LATEST; the leaves→glass-ui→consumers dependency-order publish beats) + the **substrates / procedural-viz band** (`BB-AMENDMENT-viz.md` — the WebGPU-first procedural-animation suite: the umbrella **W-VIZ-SUITE** with its 5 serial sub-waves W-GPU-SUBSTRATE → W-AURORA-WGPU → W-GOOBLOB-WGPU → W-FLOWFIELD ≡ W-VIZ-DOTFIELD → W-CONCENTRIC ≡ W-VIZ-CONCENTRIC; the 2 new viz born against `audit/viz-ref/dot-flow-field-reference.jpg` + the aurora/goo-blob WGSL migrations + the suite family doc `PROCEDURAL-SUITE.md` covering all seven procedural members) + the **atlas-expand band** (`audit/atlas-expand/UNIFIED-BRIEF.md` — the expanded-constellation investigation fleet's three DECIDED decisions (colors RETIRE · value→1.0 DECIDED · vaul ABROGATION the @vueuse-10 dual KILLED) + the seven Atlas-needs placement map: **+3 net-new waves** — W-DRAWER-ABROGATE (Batch 4, the vaul de-fork; BB-2 direction-ladder folds in) + W-GLASS-ACCENT (Batch L, BB-3 the third glass axis) + W-METAL-SHIMMER (Batch L, BB-5 the bronze quad + parameterized shimmer); BB-1/BB-4 fold into W-DOCK-MORPH-FAMILY, the named-consumer roster grows (the Atlas + words/frontend + bbnf-lang/playground + bbnf-buddy + the 2 WASM leaves) — folds, NOT new rows) extend it; the live SOTA evidence is in `audit/sota-deep/` + `audit/awwwards/` + `audit/frontend-design-digest.md`.

### Batch 0 — INTEGRITY FLOOR (the close-honesty repair; unblocks the tranche)
- **W-CI-GREEN** — green master CI: fix every real `ci`-gate failure the `--run local` close never ran (the siblings-absent list). The literal close-integrity repair. (L10·L26·L29)
- **W-CLOSE-BATTERY** — mint the rule + a gate: a tranche close MUST run the FULL gate set (`local ∪ ci ∪ release`) in a siblings-absent clean checkout before the tag; extend `proof:gate-manifest-sound` / `proof:gate-script-parity` so a `--run local`-only close is structurally impossible. (L29·L16)
- **W-LEDGER-REPAIR** — fix the silent cardinal-lesson ledger gate (it parses 0 BA rows — positionally coupled to a PROGRESS column order BA changed). (L14)
- **W-DISPOSITION-RESTAMP** `(C)` — Batch-0 re-stamp the ~28 disposition-register books + reconcile the stale "HELD" prose against the DONE publish state. (L23·L24·L31)

### Batch 1 — GESTALT-BAR HARDENING (the binding close made real)
- **W-GESTALT-GATE2** — `proof:ba-gestalt`: add PNG dimension+content+freshness verification, READ the 16 mobile captures (not desktop-only), wire the surface-hash freshness header into the gate (currently vacuous). (L08·L11·L12)
- **W-VISUAL-RUNNER** — execute the ~93 `tests-visual/*.spec.ts` π specs in CI/close (today gates only `existsSync` them — the "BINDING painted truth" runs nowhere automated). (L11·L12)
- **W-CHIP-GRAZE** `(C)` — fix the `/forms/inputs` chip-graze: the W-SHELL-RAIL-RESEAT traded a title-collision for a form-FIELD collision and the verdict flipped PASS on the title-fix alone (the P-1 class recurring inside the wave meant to close it). (L08·L03·L17)

### Batch 2 — FINISH BA + RETIRE DEAD (no legacy code)
- **W-SCROLL-FADE-RETIRE** — retire the static `.scroll-fade-*` utilities + `--mask-fade-width` (dead code STILL shipping; 4 docs falsely claim the clean-break landed — the doc-vs-reality green-wash). (L05·L10·L15·L22)
- **W-SURFACE-AXIS-COMPLETE** — thread the `surface` axis onto **Toast** + **Button** (R8-12 named both verbatim; CLAUDE.md even documents a `Toast.surface` prop that does not exist). (L02·L17)
- **W-DEAD-SWEEP** — retire the ~32 dead CSS tokens (motion-badge family, timeline-segment-gradient, glass aliases, corner-k-soft/sharp), the 3 AW orphan gate scripts, the 24 registered-but-unmanifested gates. (L10·L28)
- **W-DOCK-RAIL-SEAT-FINAL** `(C)` — the CHRONIC dock-rail seat (5 attempts AZ→BA, never cleanly resolved): seat the facet carousel at the ℱ divider with ZERO content graze on every route (the verbatim R8-1, finally). (L03·L17)

### Batch 3 — PERFORMANCE (the never-gated chronic axis)
- **W-LIGHTHOUSE** `(C)` — mint `proof:lighthouse` score-floor (a 3-4 tranche chronic with zero gate); LCP/CLS/TBT budgets over the demo + a consumer harness. (L23·L32)
- **W-CSS-CRITICAL** `(C)` — the render-blocking critical/deferred `/styles` split (the `styles-critical-split` disposition book). (L32)
- **W-CARD-COMPOSITE** — A'-3: the CardHeader scroll-shrink keyframes animate LAYOUT properties (CLS 1.03, P0, shipped in 4.0.0) → compositor-safe rewrite (CLS ≤ 0.1). (L25)
- **W-PERF-PRODUCER** — the value.js A′ perf cluster: A′-1 zombie canvas, A′-4 dock-morph restyle perf, A′-5 aurora DPR cap, A′-6 dock-glyph density. (L20·L25)
- **W-PAYLOAD-DEFER** — lazy-split the WebGL chunks + value.js off the critical path; the aurora medium split; the build-dts time. (L27·L32)

### Batch 4 — ARCHITECTURE TRANSPOSITIONS (elegance · simplicity)
- **W-CARVE3** — carve the 3 god-modules (`offsets-sizing.css` 562, `utilities/base.css` 541, `FourierField.vue` 505) + extract the FourierField 475-line renderer to `composables/` (the colocation symmetry its aurora/goo-blob siblings already have). (L26)
- **W-CANVAS-UNIFY** — `useCanvas2D` ← `createCanvasLifecycle` (the AV.W1 two-copy class the carve was built to prevent, re-forked). (L26)
- **W-DARK-INK-WARM** `(C)` — re-express the dark `--surface-tint-*` arm (12 hardcoded `hsl(48 …)` literals, OKLab H95° — the exact yellow-green W-NO-GRAY condemned) as a `--foreground`-derived recipe + warm the dark `--foreground` onto the no-gray identity; closes the `css-relative-color` book; add the missing dark-ink warm-hue witness. (L01·L24)
- **W-INVALID-RING** `(C)` — the `aria-invalid` destructive ring is THREE divergent recipes for ONE register (chronic since AW.W26) → one token. (L28)
- **W-EYEBROW-UNION** — union the `section-label` / `text-mono-caption` / `glass-menu-section-label` eyebrow registers. (L28)

### Batch 5 — CROSS-REPO ADOPT (the live 4.0.0 hinge; never owned as a tranche)
- **W-PEER-SPINE** — F-2: shipped 4.0.0 ships `value.js: ^0.10.0 || ^0.11.0` — EXCLUDES 0.12.0 → live peer-warnings for every 0.12.x consumer. Widen the spine (+ assert the kf `^4` floor holds across bumps). A 4.0.1 candidate. (L25·L20)
- **W-ADOPT-RECONCILE** — own `consumer-staleness` + `phantom-classes` + `resolution` as ONE close-loop + the fourier full re-pin; absorbs the EXT-1/2/3/4 re-flags. (L32·L16)
- **W-SLIDES-HANDOFF** — coordinate the slides 4.0.0 adopt (slides still pins 3.13.0; the deck RE-FORKED the glass ladder past Tranche A onto a COOL `--glass-frost` register that collides with W-NO-GRAY's warm floor — BA 4.0.0 now SOLVES the exact problem). Coordination only — no slides edit. (L25·L30·L31)
- **W-EASING-PRIMITIVE** `(C)` — the BA-named successor: StepsEditor → a published `<EasingPicker>` (cross-repo, value.js's gradient pane = consumer #2; co-scheduled with the kf donor study). (L07·L20·L22)
- **W-LINEAGE-PROBE** — mechanize invariant 11's "registry-consumer probe before any prune" into a gate + add the Atlas + slides to the consumer constellation (the exact consumers the d6 lesson is about, currently EXCLUDED). (L13·L16)

### Batch 6 — CHRONIC RESIDUALS + DOC SYNC (decide, don't re-book)
- **W-NDA-DECIDE** `(C)` — the FOUNDING chronic `native-drawer-as-asChild` (5-tranche carry): DECIDE — build the polymorphic `as`/`asChild` host or RETIRE it. No re-book. (disposition register)
- **W-AUR-KUWAHARA** `(C)` — the 3-tranche anisotropic-Kuwahara painterly residual (oil/oil-pastel): build or retire. (L23)
- **W-PRECEPT-SYNC** — `design-idioms.md` (the BINDING idiom-home) is STALE: BA's new CSS idioms unhomed, deleted recipes still listed (the P-5 doc-drift class, here with no gate). Refresh + gate it. (L13)
- **W-DELTA-RESHOOT** `(C)` — the 5 AY DELTA stale-hash re-shoots + arm `--strict-freshness` at terminal close (authored, never armed). (L14·L22·L32)
- **W-DOC-FRESHEN** — the CLAUDE.md stale examples (the `--glass-blur-resting` anti-idiom) + the README gate tables. (L01·L10)

### Batch 7 — CLOSE
- **W-REFLECT3** — the fresh whole-page gestalt reflection under the HARDENED `proof:ba-gestalt` (both modes, mobile + desktop, content-verified captures) as the binding close.
- **W-CLOSE** — the cut. Version strategy below.

## §2 — The chronic-deferral fold (the user's explicit ask — every chronic item DECIDED)

The disposition register's own discipline is "don't fold — the ≥2-consumer bar (L inv-8)." BB reconciles that with the user's "fold the chronic deferrals" by **DECIDING each — build where a real consumer exists, RETIRE the substrate-less perpetual carries, MEET the platform-feature books where the SFC is touched** — never a silent re-book.

| chronic item | tranches carried | BB disposition | wave |
|---|---|---|---|
| `native-drawer-as-asChild` | AT→AY→AZ→BA (5) | **DECIDE** (build-or-retire) | W-NDA-DECIDE |
| W-LIGHTHOUSE / perf-budget gate | AX→AY→AZ→BA (4) | **BUILD** (mint the gate) | W-LIGHTHOUSE |
| the dock-rail seat | AZ→BA (5 attempts) | **BUILD** (seat at ℱ, zero graze) | W-DOCK-RAIL-SEAT-FINAL |
| `aria-invalid` ring divergence | AW.W26→ (chronic) | **MEET** (one register) | W-INVALID-RING |
| `css-relative-color` | AX→AZ→BA | **MEET** (via the dark-ink recipe) | W-DARK-INK-WARM |
| W-AUR-T5 Kuwahara painterly | AU→AV→ (3) | **DECIDE** (build-or-retire) | W-AUR-KUWAHARA |
| the AY DELTA stale-hash re-shoots + `--strict-freshness` | AY→AZ→BA | **MEET** (re-shoot + arm) | W-DELTA-RESHOOT |
| `styles-critical-split` | disposition book | **BUILD** | W-CSS-CRITICAL |
| the `.scroll-fade-*` retire | W-FADING-SCROLL scope 7 (never landed) | **RETIRE** | W-SCROLL-FADE-RETIRE |
| `useGlassBackdropLuminance` 2nd-consumer promotion | AZ→BA | **HOLD** (trigger genuinely unmet — recorded, not folded) | — |
| `:5175` live-gate residue + the gate-manifest regex blind spot | AY→AZ→BA | **RETIRE** | W-DEAD-SWEEP |
| the EasingPicker (C-3) | BA-named | **BUILD** (cross-repo) | W-EASING-PRIMITIVE |
| the goo `uSatColor` per-satellite color (C-1/BA-VJS-5) | BA-named (4.x) | **BUILD** (4.x, GL fence) | W-GOO-COLOR (4.x book) |
| the ~28 disposition books | standing | **RESTAMP** (re-evaluate each, fold the now-triggered) | W-DISPOSITION-RESTAMP |

`useGlassBackdropLuminance` is the ONE honest HOLD — its 2nd-binary-consumer trigger is genuinely unmet (the dock is still the only binary consumer); folding it would mint overfit substrate the user equally rejects. Recorded, not re-booked silently.

## §3 — Prompt recap (every ask, addressed-or-folded)

| ask | source | status at 4.0.0 | BB fold |
|---|---|---|---|
| R8 — 32-agent demo audit → gestalt path; phase fence; frontend-design audit | the BA seed | 19/19 clusters discharged; R8-1 (rail seat) + R8-12 (Toast/Button surface axis) PARTIAL | W-DOCK-RAIL-SEAT-FINAL · W-SURFACE-AXIS-COMPLETE |
| R9 — "why so gray" + deck folded | R9 | addressed (W-DARK-MATERIAL self-engage + the slides bank) | W-SLIDES-HANDOFF (the deck's re-fork) |
| R10 — tabs standardize / no-gray / spring smoothness / deck dots / carousel ring | R10 | addressed (W-TABS · W-PAGER · W-NO-GRAY · the spring clock) | — (verified CLEAN, L18) |
| atlas A/B/C/D — capabilities / d6-fold / highlighter+silver / semver | the atlas letter | A-list restored + folded; ONE divergent residual (ExpandableContainer always-teleport blank-canvas) flagged to DISPOSITION | BB-EXPANDABLE-CONTAINER-REDRESS (fold into W-DEAD-SWEEP) |
| value.js — emission / inv-N-7 mirror / C-1 4.x | the value.js letter | emission folded; C-1 booked 4.x; **A′ perf-cluster + Register F NEVER dispositioned (silent-drop)** | W-PERF-PRODUCER · W-PEER-SPINE · W-EASING-PRIMITIVE · W-GOO-COLOR |
| slides reports — gray / btn-audacious / phantom-/underline / FourierField hero hue / deploy-DOWN | the slides session | glass-ui-side all addressed (R5-11 warm-anchor landed); slides-side adopt pending | W-SLIDES-HANDOFF |
| **"full perfected CI"** | the standing directive | **NOT met — master CI red** | **W-CI-GREEN (Batch-0)** |
| "full slides.friday.institute deployment" | the standing directive | held (site down; adopt pending BA publish — now unblocked) | W-SLIDES-HANDOFF (coordination; the user owns the redeploy) |

The two silent-drops the audit caught — the value.js A′/F addendum (never dispositioned, violating the no-silent-drop law) and R8-1/R8-12 (named verbatim, left partial) — are folded BY NAME above, not re-buried.

## §4 — Version strategy (USER-DECIDED 2026-06-16: fold all → one 4.1.0)

BB rides on published 4.0.0. The user chose to **fold everything into BB and ship ONE 4.1.0 cut at the close** — NO interim 4.0.1. So `W-CI-GREEN` (the 18-gate master-CI repair), `W-PEER-SPINE` (F-2: the value.js peer range excludes 0.12.0), and `W-CARD-COMPOSITE` (A'-3 CardHeader CLS) all land INSIDE BB and ship at 4.1.0. **Master CI stays RED until the BB close** — an accepted interim (the user's call): the 4.0.0 PACKAGE is valid (the release 43-gate subset is genuinely green + provenance-published), and the value.js 0.12.x peer-warning + the CLS regression are tolerated for the BB window rather than spent on a patch publish. The cross-repo adopt (slides redeploy) rides the user's separate re-publication greenlight (the site is intentionally down — round-15 + the BA adopt go up together, never onto a live site). The 4.1.0 close runs the FULL release battery (W-CLOSE-BATTERY) — the `--run local`-only over-claim cannot recur.

## §5 — The binding close

Per BA's hardened bar (invariant 4), BB closes against the GESTALT — but the audit proved BA's gestalt gate was structurally weak (desktop-PNG-existence only). So **W-GESTALT-GATE2 hardens the gate FIRST** (Batch 1), and **W-REFLECT3 runs the fresh reflection under the hardened gate** as the close (Batch 7). The close is `complete` IFF: master CI green (the full set, siblings-absent), the hardened `proof:ba-gestalt` 8/8 on content-verified both-mode mobile+desktop captures, the visual-π runner green in CI, and ZERO chronic re-book (every §2 item built/retired/met/held-with-rationale). The close-class lie BA told — `--run local` green while release+ci were red — is made structurally impossible by W-CLOSE-BATTERY.

---

*This is the path-forward synthesis. The per-wave specs (`waves/`), the EXECUTION-DAG, and the PROGRESS skeleton follow. No implementation — tranche development only.*
