# A3 — fourier-analysis + value.js audit (constellation/next)

**Slice**: fourier-analysis (Vue SPA + Python/FastAPI backend, deploy `fourier.babb.dev`) + value.js
(the color/value engine + an `api/` palette-server at `api.color.babb.dev`, demo `color.babb.dev`).
**Lens**: the I-tranche as-built on both repos; the chronically-deferred ledger (VAL-1 OKLab aurora-LUT,
VAL-9 `springLinearStops→linear()`); the Chrome modern-web-guidance leverage corpus; and **the CRUD/REMIX
gap** (WAVE D seed) — a git-like diff/provenance model over the atomic items of a remixed artifact.
**Status**: AUDIT + SPECS (planning-only; read-only on every repo except this file).

---

## 1. The two I tranches, as-built

The two repos use the same tranche letter `I` for **completely different work** — a naming collision that
matters because it tells us where each repo is in its arc.

### 1.1 fourier-analysis I — the constellation-modernization tranche (CLOSED 2026-06-02)

fourier-I is the *modern-web* tranche — H made "green" mean green, I asked "is it modern?". Its
headline is **the de-dup**: ~65% of the original 9-wave plan (α/β/ζ/η — transform-identity, overlay
substrate, top-layer enter/exit, forms/select) **converged into glass-ui's AQ tranche** rather than
executing as fourier-local edits, exactly as the leverage principle predicts (a glass-ui adoption
propagates once). What stayed genuinely fourier-local (~35%):

- **P0 a11y** (`d4da274`): `FunctionInput.vue` orphaned `<label>`s `for`/`id`-associated + `aria-label`'d —
  the constellation's *only* true a11y P0. **DONE.**
- **γ content-visibility** (`d4da274` then `262c3d0`): the 97-page paper window + the off-screen epicycle
  rAF park (reference-counted IO in `BasisCanvas`); the I-local hand-roll was then *replaced* by
  glass-ui's canonical `.deferred-section` utility. **DONE (substrate-adopted).**
- **δ scroll-driven** (`262c3d0`): reading-progress bar on glass-ui native `.scroll-progress` (composited
  `scroll()` timeline; JS the sole feature-detected floor, PRM-bracketed). **DONE.**
- **ε View Transitions** (`262c3d0`): `/w/`↔`/v/` route-morph through `document.startViewTransition`
  (`.canvas-stage` geometry-morph; `@supports`/PRM gated). **DONE.**
- **θ image/asset/privacy** (`d4da274`): figures → `<picture>` AVIF→WebP→PNG + intrinsic dims + native
  lazy; maintainer avatar self-hosted; CSP `_headers` drops `avatars.githubusercontent.com`
  (zero-third-party-origins restored). **DONE.**
- **The keyframes-2.2.0 hard-fix** (`262c3d0`): `useFourierMorph` static `Animation` import broke at
  runtime under keyframes 2.2.0 → now resolves the value.js-bearing engine lazily through
  `loadAnimationEngine()`; build split confirms a dynamic `engine-*.js` + separate `vendor-keyframes`
  chunk, value.js absent from the eager `index`. **DONE — this is the boundary-keyframes axis.**
- **~40-site root-barrel → flat subpath sweep** (`262c3d0`). **DONE.**

CI posture: vue-tsc + build green (2.58s, glass-ui `^3.1.0` + keyframes `^2.2.0`); **e2e + axe honestly
deferred to CI** (need the Python backend, not runnable in-session — no green claim per inv-27). The
overfitting audit flagged exactly one over-export (`anyCanvasVisible` on the Pinia return, zero external
consumers — a one-line return-list trim, non-gating). New invariants: **inv-29 progressive-enhancement-floor**,
**inv-30 platform-over-library**.

### 1.2 value.js I — the CRUD-CONTRACT v2.0.0 conformance tranche (CLOSED 2026-05-28)

value.js-I is *not* modern-web and *not* library — it is the **api/ palette-server** closing the 53
DEFERRED-TO-VALUE.JS conformance cells from fourier-D.W5's CONFORMANCE-MATRIX, paired (Scenario A) with
fourier-E. Four waves, all GREEN: **W1** visibility split (`status` 4-state → `visibility` 3-state +
`tier` 3-state, 9-tuple guard, migration 10/10 on host); **W2** soft-delete + 30-day grace + restore +
cascade-with-grace + reaper cron + 410 Gone; **W3** admin idempotent `setFeatured` setter; **W4** SOTA
envelopes — problem+json (RFC 7807), ETag/If-Match (412/428), RateLimit-* headers. T7 cross-repo
conformance probe 12/12 PASS. **This is the substrate the CRUD/REMIX gap (WAVE D) builds directly on** —
value.js already ships fork + versions + provenance + revert; fourier does not.

Deferred at value.js-I close (now WAVE-D feedstock): Idempotency-Key API-side replay store (consumer
plumbing live; server store deferred); per-repo conformance suite at `api/test/conformance/`; the `id`
hard-removal; per-call-site `ifMatch`/`idempotencyKey` adoption.

---

## 2. The chronically-deferred ledger (VAL-1, VAL-9, and the constellation tail)

The VAL-1/VAL-9 labels live in glass-ui's `docs/constellation/MODERN-WEB-EXECUTION-PLAN.md §2/§3` as
*optional foundational sub-edges* of speedtest's AS-GU aurora/spring requests — "**not on the critical
path**". They have survived G→H→I unexecuted. Verified against value.js `src/`:

| Item | What it is | Current state in value.js src | Chronicity | Verdict |
|---|---|---|---|---|
| **VAL-9** `springLinearStops→linear()` | a spring **solver** that *emits* `LinearStop[]` (the stops glass-ui's `--spring-*` tokens + keyframes regenerate from) | `easing.ts` has `cssLinear(stops)` — the **consumer** of a `linear()` form (`LinearStop` interface + piecewise interpolator) — but **no `spring()` emitter**. Zero `spring`/`Spring` symbols in `easing.ts`. | deferred G→H→I (3 tranches) | **CHRONIC.** The half that exists is the easy half. The emitter (mass/stiffness/damping → sampled `LinearStop[]`) is the missing foundational edge keyframes already owns privately; lifting it to value.js de-dups keyframes ⇄ glass-ui. ≥2-consumer gated (keyframes spring-emission core + glass-ui `--spring-*`). |
| **VAL-1** OKLab aurora-LUT | an OKLab-interpolated lookup-table feeding glass-ui `deriveAurora()` aurora gradients | `conversions/oklab.ts` ships OKLab/OKLCH conversion; `models.ts` even persists `oklabColors: OklabTriple[]` per palette. But **no LUT primitive** (sampled gradient table). | deferred G→H→I | **CHRONIC but ≥2-consumer-gated.** The conversion math is done; the LUT is a thin sampling layer. Gated on glass-ui actually adopting `deriveAurora()` (speedtest AS-GU-1) + a 2nd consumer. Substrate-without-consumer is binary — do **not** ship the LUT until glass-ui's aurora consumes it. |

Other chronically-deferred carries surfaced: value.js-I's **Idempotency-Key API-side replay store** +
**per-repo conformance suite** (deferred to "I-tail or value.js-J"); fourier-I's **e2e/axe CI evidence**
(γ LCP/INP delta, δ scroll-anchor pass) booked-not-asserted; the **ι tail** (per-consumer CSP propagation,
`fetchLater()` analytics batching, glass-ui `scheduler.yield()` in `useRAFLoop`); **passkeys** (named
residual — no app owns a credential surface).

---

## 3. Modern-web leverage gaps (post-I, J-eligible)

fourier and value.js are both already-strong, heavily-audited surfaces. The I tranches closed the
high-ROI cross-repo themes (content-visibility, scroll-driven, View Transitions, the overlay/transform
substrate via glass-ui AQ). What remains, read through `/tmp/modern-web-guidance-src/guides`:

**G1 — `scheduler.yield()` / INP-under-load (performance/break-up-long-tasks, schedule-tasks-by-priority).**
Both apps run heavy main-thread work: fourier's epicycle solve + morph; value.js's quantize/cluster +
palette extraction. The guidance's `scheduler.yield()` lever is named in fourier-I's ι tail and value.js
never touched it. **Highest-ROI remaining perf lever for both.** Baseline: `scheduler.yield` is Newly →
feature-detected fallback ≤20 LOC (`scheduler.postTask` or `await new Promise(setTimeout)`).

**G2 — `fetchLater()` analytics + deferred background fetch (performance/batch-analytics-events,
deprioritize-background-fetches).** Neither app batches beacons. Low-effort leaf. Limited support →
progressive-only behind detection, current `navigator.sendBeacon` path default.

**G3 — content-visibility *application* gaps remain in value.js demo + fourier gallery.** glass-ui ships
`.deferred-section`; fourier *applied* it to the paper window; **value.js's `BrowsePane`/palette grid and
fourier's gallery grid did not adopt it** (fourier-I's plan noted "value.js-demo" as a hand-roller). One
utility, two unapplied consumers. Widely-Baseline.

**G4 — Built-in AI: Summarizer / Writer (built-in-ai/summarizer).** Both apps have a naming/description
surface: value.js has `proposed_names` (community palette naming) + the `slugWords` generator; fourier has
viz `title`/`description`. On-device `Summarizer`/`Writer` (Gemini Nano) could draft a viz description or a
palette blurb. **Limited → progressive-only behind `Summarizer.availability()` detection, manual entry the
default.** Overfitting risk: ship only if it lands a real consumer surface, not speculative substrate.

**G5 — WebMCP agentic tools (webmcp/webmcp, agentic-forms).** *The sleeper that intersects WAVE D.* Both
apps are CRUD-over-a-domain-object — exactly WebMCP's sweet spot (`create-palette`, `remix-visualization`,
`diff-palettes` as `navigator.modelContext.registerTool` tools, with `readOnlyHint` on the diff/provenance
reads). This is Early-Preview (Chromium 146 + flag) → **booked as a J-residual / WAVE-D adjacency, not a
wave** — but it is the *reason the REMIX API should be designed agent-legibly* (atomic, composable,
distinct tools; descriptive validation errors for retries; secure backend through the API layer). The
REMIX model below is the resource layer a future WebMCP tool surface would expose.

**G6 — `highlight-text-ranges` (css/highlight-text-ranges) for the diff render.** When WAVE D ships an
atom-diff, the *consumer* render of "these 2 colors changed, this 1 was added" wants CSS Custom Highlight
API ranges rather than wrapper spans. Widely-Baseline-adjacent; the natural diff-viewer primitive.

---

## 4. THE CRUD/REMIX GAP — the WAVE D seed (the NEED, not the full spec)

### 4.1 The asymmetry (verified file:line)

Both repos already carry CRUD-CONTRACT v2 (problem+json, ETag/If-Match, soft-delete, idempotency,
cursor pagination — fourier's `api/lib/crud/` mirrors value.js's `api/src/middleware/`). But the **remix
substrate is asymmetric**:

| Capability | value.js (palette-server) | fourier (viz-server) |
|---|---|---|
| Content-hash dedup | ✅ `Palette.currentHash`, `PaletteVersion._id = hash` | ✅ `Visualization.content_hash` |
| Version DAG (parent/root/depth) | ✅ `palette_versions` (`parentHash`, `forkedFromHash`, `rootHash`, `depth`) | ❌ **no version collection** |
| Fork endpoint | ✅ `POST /:slug/fork` (cross-collection: insert fork + version + bump parent fork-count) | ❌ **no fork endpoint** (has `fork_count` field + `most-forked` sort — the READ side, no write) |
| Provenance | ✅ `GET /:slug/provenance` (walks `forkOf` slug-chain, ≤50) | ⚠️ `MigratedFrom` marker only (recoverable-provenance for migrated rows) |
| Revert | ✅ `POST /:slug/revert` (to a prior version hash) | ❌ none |
| **Atom-level diff** | ❌ **none** — `/provenance` is a slug-chain, not a diff of changed colors | ❌ **none** |

So the gap is **two-sided**: (a) fourier needs the fork+version+provenance substrate value.js already
ships; (b) **neither has a git-like diff over the *atomic items*** of the artifact. value.js's
`/provenance` answers "who did this descend from"; it does not answer "*what changed* between this and its
parent".

### 4.2 The atoms (what gets diffed — this is the whole design)

- **value.js palette atoms** = `PaletteColor[]` (`{ css, name?, position }`). A remix changes/adds/removes
  colors. The diffable unit is the **color stop**, keyed by `position` (stable) or content (`css`).
- **fourier viz atoms** = the parameter set: `active_bases[]`, `n_harmonics`, `contour_settings`,
  `animation_settings`, `palette_slug` (+ the bound `contour_hash`/`image_slug`). A remix changes the
  basis set, harmonic count, or a settings sub-object. The diffable units are **named config atoms**.

Both are **small, flat, content-addressable bags of named items** — the KISS observation that makes a
git-like model tractable without inventing a Merkle tree. A "diff" is a set of per-atom ops
(`added`/`removed`/`modified` with before/after), computed by content-hashing each atom and set-differencing
the two bags. No three-way merge, no rebase — **remix is always parent→child, single-parent, linear
provenance**. That is the KISS line.

### 4.3 What a remix/diff/provenance model needs (the minimum)

The NEED, factored to the ≥2-consumer substrate both repos share (CRUD-CONTRACT v2 already proves this is
the right factoring — both have parallel `lib/crud`):

1. **A canonical atom-set hash.** Per-atom content hash + an order-independent set hash, so two palettes/
   vizzes with the same atoms (regardless of array order) dedup. value.js already content-hashes
   `(name, colors)`; this *narrows* to per-atom so a diff is cheap. fourier already content-hashes the
   payload; this decomposes it into atom hashes.
2. **A `remix` operation = fork + recorded atom-diff.** `POST /:slug/remix` with a body of changed atoms
   (or a full new atom-bag the server diffs against the source). It (a) creates the child (the existing
   fork machinery), (b) records the **atom-diff** (`{ op, atomKey, before?, after? }[]`) as the edge's
   provenance payload — *not just the slug edge*. value.js's `forkPalette` becomes `remixPalette` by
   attaching the diff; fourier gains the whole thing.
3. **A provenance edge that carries the diff.** Today value.js's provenance is a node-chain. WAVE D makes
   each edge carry **what changed**: `{ fromHash, toHash, atomDiff }`. The chain stays single-parent
   linear (KISS — no DAG merges). This is the one genuinely new persisted shape.
4. **A read-only `diff` endpoint.** `GET /:slug/diff?from={hash}` returns the atom-diff between any two
   versions/forks on the chain — the operation a diff-viewer (G6 highlight-ranges) and a WebMCP
   `readOnlyHint` tool (G5) both consume. Idempotent, ETag-able, cacheable.
5. **Shared substrate, two adoptions — NOT a shared package.** Per value.js inv-I-1 + the constellation's
   no-shared-codegen rule, this is a *pattern* (a `crud/remix` module in each `lib/crud`), authored once,
   adopted twice — exactly how CRUD-CONTRACT v2 already lives in both repos. The atom-set differs (colors
   vs config), so the diff is parameterized over "how to enumerate + key the atoms"; everything else
   (fork edge, diff persistence, the two endpoints) is identical.

### 4.4 KISS guardrails (what WAVE D must NOT become)

- **No three-way merge, no rebase, no DAG.** Single-parent linear provenance only. A remix descends from
  exactly one source-version.
- **No new storage engine.** The diff is a JSON payload on the fork/version edge; MongoDB documents, the
  existing repositories, the existing `withTransaction` cross-collection discipline.
- **No CRDT.** These are not collaboratively-edited; they are *forked-then-remixed* artifacts.
- **fourier inherits, value.js extends.** fourier gets the fork+version+provenance substrate it lacks
  (lifting value.js's proven shape); value.js gets the atom-diff layer added to its existing fork
  machinery. Symmetric close, asymmetric starting point.

---

## 5. SPECS — the n+1 tranche sketch

Two separate J tranches (the repos are independent and on different arcs), bound by the shared WAVE D
substrate. **fourier-J** and **value.js-J**.

### 5.1 fourier-analysis J — sketch

**Binding question:** *fourier-I closed the modern-web themes and adopted glass-ui AQ substrate. With the
platform modern, what is the highest-leverage remaining work — and does the viz-server earn the
fork/remix/provenance substrate value.js already ships?*

| Wave | Title | Closes on |
|---|---|---|
| J.W0 | Open + 6-agent audit + ledger intake (e2e/axe CI evidence from I; the ι tail) | A–I green re-confirmed; the I-deferred CI evidence (γ LCP/INP delta, δ scroll-anchor pass) executed against the Python backend in CI; ι CSP/`fetchLater` booked |
| J.W1 | **G1 — `scheduler.yield()` in the epicycle/morph hot path** (INP-under-load) | feature-detected (≤20 LOC floor); a measured INP delta on the heaviest interaction |
| J.W2 | **WAVE D — viz fork + version + provenance substrate** (lift value.js's proven shape) | `POST /:slug/remix`, `palette`-style version collection, `GET /:slug/provenance`, `GET /:slug/diff?from=`; atom = the viz config set; cross-repo source boundary held |
| J.W3 | The diff-viewer consumer (G6 highlight-ranges) + the gallery `most-forked` write-side wired | the gallery's existing `fork_count`/`most-forked` sort gains a real write path; diff render uses CSS Custom Highlight |
| J.W4 | ι tail leaf (CSP recipe is already fourier-SOURCED) + `fetchLater` analytics | per-consumer CSP confirmed; analytics batched behind detection |
| J.W5 | Close + WAVE-D cohort coordination with value.js-J | paired/named-successor; FINAL.md |

### 5.2 value.js J — sketch

**Binding question:** *value.js-I closed CRUD-CONTRACT v2 conformance. The deferred VAL-1/VAL-9
foundational edges have survived three tranches unexecuted, and the palette-server has fork+version+
provenance but no atom-diff. Which of these is ≥2-consumer-gated NOW, and which is still substrate-
without-a-consumer?*

| Wave | Title | Closes on |
|---|---|---|
| J.W0 | Open + 6-agent audit + the chronic-deferred ledger (VAL-1, VAL-9, I-tail) | re-check the VAL-1/VAL-9 ≥2-consumer triggers against glass-ui's AQ aurora/spring state; baseline captured |
| J.W1 | **VAL-9 `spring()→LinearStop[]` emitter** (the missing half of `cssLinear`) | gated on glass-ui `--spring-*` + keyframes spring-emission both consuming it; if not yet ≥2-consumer, **stays booked, not shipped** (substrate-without-consumer is binary) |
| J.W2 | **VAL-1 OKLab aurora-LUT** (thin sampling layer over existing `oklab.ts`) | gated on glass-ui `deriveAurora()` adoption (speedtest AS-GU-1) + a 2nd consumer; same binary gate |
| J.W3 | **WAVE D — palette atom-diff** (extend the existing fork machinery) | `forkPalette`→`remixPalette` records the `PaletteColor[]` atom-diff on the edge; `GET /:slug/diff?from=`; provenance edges carry what-changed |
| J.W4 | I-tail conformance close: Idempotency-Key API-side replay store + per-repo conformance suite | the two value.js-I deferrals land; `api/test/conformance/` green |
| J.W5 | Close + WAVE-D cohort coordination with fourier-J | paired/named-successor; FINAL.md; cross-repo `/diff` shape parity verified |

**WAVE D cross-cut (both tranches):** authored once as the `lib/crud/remix` *pattern* (atom-enumeration +
diff-persistence + the `remix`/`diff` endpoints), adopted twice (color atoms vs config atoms). No shared
package, no codegen (inv-I-1 / no-shared-codegen). The single new persisted shape is the **diff-bearing
provenance edge** (`{ fromHash, toHash, atomDiff }`). The G5 WebMCP angle is the design *constraint* (make
`remix`/`diff` agent-legible: atomic, composable, `readOnlyHint` on reads) — booked as a residual, not a
wave (Early-Preview).

**Overfitting discipline:** VAL-1 and VAL-9 ship **only** when their ≥2-consumer gate is actually met by
glass-ui's AQ aurora/spring state at J.W0 re-check — otherwise they stay chronically-booked (substrate-
without-consumer is binary). WAVE D is ≥2-consumer by construction (both repos). G4 Summarizer is
demo-or-drop. Every J artifact carries ≥2 consumers, a demo, or is not shipped.
