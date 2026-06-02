# A5 — keyframes.js + words/floridify + bbnf-lang/playground (constellation n+1 audit)

Slice of the constellation "next" audit. Covers the foundational animation engine
(`@mkbabb/keyframes.js`) and two leaf SPA consumers (words/floridify, bbnf-lang
playground). The constellation modern-web arc closed 2026-06-02
(`MODERN-WEB-CLOSE.md`): keyframes@2.2.0 (KF-B1 dynamic boundary), glass-ui 3.0.0 +
3.1.0 (AP staged cut + AQ platform substrate), and the consumer R-CONSUMEs all
landed. This audit picks up the **n+1** state: what the close deferred, what the
KF-B1 boundary opened, and the structural gap that keyframes.js has never been
brought into the bbnf tranche format.

Read-only across all repos. Evidence: source reads, git ls-tree/submodule status,
the modern-web-guidance corpus at `/tmp/modern-web-guidance-src/guides`.

---

## 0. Verified state (the load-bearing facts)

### 0.1 The precepts submodule — three distinct conditions, one canonical commit

The constellation-canonical precepts content HEAD (from glass-ui, the canonical
publisher) is **`63240e6`** (`infra: promote tls/blob-backend-dr/deploy + new
domains precept (fourier D.W2)`). Per-repo state, by `git ls-tree HEAD docs/precepts`
(the *recorded* gitlink) vs the submodule's *checked-out* HEAD:

| Repo | Recorded gitlink (tree) | Checked-out HEAD | Condition |
|---|---|---|---|
| **glass-ui** (canonical) | `63240e6` | `63240e6` | clean — synced |
| **keyframes.js** | `63240e6` | `f27627e` | gitlink correct, **working tree drifted behind** — `git submodule update` fixes (no commit) |
| **bbnf-lang** | `63240e6` | `f27627e` | gitlink correct, working-tree drift only |
| **words** | *(absent — no tree entry)* | `f27627e` | `.gitmodules` declares it, `.git` gitlink file present, but the **submodule pointer is uncommitted into the parent tree** — `git ls-tree HEAD docs/` shows no `precepts` entry |

Two distinct actions, both orchestrator/user-domain (the agent git clause forbids
the agent staging/committing):

1. **keyframes.js + bbnf-lang** — pure `git submodule update --init docs/precepts`
   to advance the working tree from `f27627e` → the recorded `63240e6`. No commit;
   the recorded pointer is already canonical. This is hygiene, not a sync.
2. **words** — the submodule was `git submodule add`-ed but never committed. The
   parent tree carries no `160000 commit …` entry for `docs/precepts`. words needs
   the pointer **committed at `63240e6`** (advance the working tree first, then
   commit the gitlink). Until then words' precepts is effectively a vendored copy
   pinned at `f27627e`, divergent from the canon. This is the only true precepts
   *sync* debt in the slice.

The orchestrator brief framed this as "confirm/sync keyframes' precepts to the
constellation-canonical commit." Confirmed: keyframes' *recorded* gitlink is
already canonical (`63240e6`); only the checkout drifted. The real sync debt is
**words' uncommitted submodule pointer**, not keyframes'.

### 0.2 The CI breakage — corrected against source

The brief cites "#177 — tag-release CI fails on the symlinked-monorepo-vs-registry
divergence + node 20 vs >=22." Two corrections from source:

- **Issue #177 does not exist** in `mkbabb/keyframes.js` (`gh issue view 177` →
  "Could not resolve to an issue"; the open-issue list is empty). The CI breakage
  is **real but unfiled**. A tranche should file it as the first artefact, not
  reference a phantom number.
- **The node-version mismatch is glass-ui's, not keyframes'.** keyframes.js'
  `engines` is `>=22`; all three of its workflows (`ci.yml`, `release.yml`,
  `node.js.yml`) already pin **node 24** (setup-node@v4/v5). glass-ui's
  `ci.yml`/`release.yml` pin **node 20** against its own `engines: >=22` — that is
  the live node mismatch, and it is a glass-ui follow-up (the close note already
  books it). keyframes' node pin is clean.
- **The symlinked-monorepo-vs-registry divergence is the real keyframes CI break.**
  keyframes' `devDependencies` carries `"@mkbabb/glass-ui": "file:../glass-ui"` (a
  local file: seam for the demo). CI's registry-based `npm ci` cannot resolve a
  `file:../glass-ui` path on a clean runner — the demo build arm breaks. The
  release workflow runs `check → build → test`; the `build` arm
  (`vite build --mode production`) compiles the demo, which imports glass-ui via the
  file: seam. On the runner this either fails to resolve or pulls a stale registry
  glass-ui. This is the "all three publishes were done locally" admission in the
  close note made concrete for keyframes. The fix is architectural: the **library
  build (`src/animation` → `dist/`) must not depend on the demo**, so a CI
  `build:lib` arm can run with zero `@mkbabb/glass-ui` resolution. Today
  `npm run build` is `vite build --mode production` — one arm that bundles both the
  library dist and the gh-pages demo. Splitting the library-only build from the
  demo build (glass-ui already did this at its Q.W6 "split the gh-pages demo outDir
  from the library dist") is the keyframes A fix.

### 0.3 The KF-B1 dynamic boundary — landed, with two open ergonomic seams

`dist/` confirms the split: barrel `dist/keyframes.js` = 17.1 KB, dynamic
`engine-*.js` = 24.7 KB (the value.js-bearing chunk), `leaves-*.js` = 1.0 KB. The
light engines (`SpringProgress`/`SmoothProgress`/`NumericAnimation`/`ElementMorph`/
`Timeline`) read leaf math from `src/animation/internal/leaves.ts` (zero static
value.js edge); the heavy engine sits behind `loadAnimationEngine()` =
`import("./engine")`. `package.json` has `sideEffects:false`. The boundary is
sound. Two follow-on seams the boundary opened (the brief's ".ready() ergonomics +
lazy-easing"):

- **The string-easing silent-linear-fallback footgun.** `NumericAnimation` /
  `ElementMorph` / `Timeline` accept easing as a callable `TimingFunction` (static,
  value.js-free) OR a string *name* (`"easeOutCubic"`). A string name resolves
  **lazily** through the engine boundary — but until resolution lands, `.at(t)` /
  `tick()` interpolate with a **linear fallback** (`numeric.ts:112`,
  `this.timingFn = linear; this._pendingEasingName = easing;`). A stateless `.at()`
  consumer who passes `"easeOutCubic"` and never `await .ready()` gets *silently
  wrong* (linear) curves on the first frames. This is exactly the
  binding-verification class the constellation flagged for keyframes consumers
  (vue-tsc passes, runtime quietly differs). The boundary is correct; the
  *ergonomics* leak a wrong-until-ready window.
- **`.ready()` is per-engine, hand-threaded, and undiscoverable.** Each light engine
  re-implements a `_easingReady: Promise<void> | null` memoize + a `ready()` method
  (numeric.ts:170, morph.ts:94 delegating to `animation.ready()`, timeline.ts:91).
  Three near-identical implementations; no shared contract; nothing surfaces to a
  consumer that a `.ready()` exists or *needs* awaiting. A unifying
  `EasingResolvable` mixin/contract (one memoized resolver, one `.ready()`, one
  documented "callable = sync, name = await" rule) is the gestalt fix — and it
  retires the duplication (overfitting: the 3rd hand-rolled copy is the smell).

---

## 1. keyframes.js — the modern-web/perf surface (the engine itself)

keyframes.js has never had a modern-web pass *of its own*. The constellation's
modern-web work treated keyframes purely as the value.js boundary publisher (KF-B1).
The engine's own platform posture, scanned against the guidance corpus:

| Lever | State in keyframes | Gap |
|---|---|---|
| **`prefers-reduced-motion`** | partial — `smooth.ts`/`numeric.ts`/`spring.ts` honor it via `respectReducedMotion` opt-in (`matchMedia`, SSR-safe). | **Not in the heavy `Animation`/`CSSKeyframesAnimation` play path, nor `morph`/`timeline`.** A reduced-motion consumer of the CSS-keyframe engine has no opt-in. The flagship engine is the gap. |
| **`scheduler.yield()` / INP** | **absent** (`grep scheduler\|postTask\|yieldToMain\|isInputPending` → 0 hits). | The constellation absorbed `useYieldToMain` into **glass-ui** (AQ), but keyframes' own `AnimationGroup.tick()` rAF loop — which composites N children per frame — has no yield/long-task break. A large group is a main-thread long task. The INP lever belongs *here* for canvas/WebGL consumers (speedtest, fourier) that drive keyframes directly, not glass-ui. |
| **WAAPI delegation** | present (`waapi.ts` — compositor-thread `Element.animate()` when eligible: DOM targets, default renderer, uniform timing, no computed units, no color interp). | Eligibility is conservative-correct but **rAF-first**; the `linear()` easing primitive (`springLinearStops`/`springTimingFunction` already exist) could widen WAAPI eligibility to spring curves — a Baseline-Newly `linear()` lever the engine half-has. |
| **Tree-shaking proof** | `sideEffects:false` set; no *gate* proves the light bundle stays value.js-free. | KF-B1's headline claim ("a spring-only bundle contains no value.js code") is asserted in CHANGELOG, **not gated**. A `proof:boundary` (build a spring-only entry, assert 0 value.js bytes / 0 `engine-*` static edges) is the missing hard gate — the binding-verification discipline applied to the boundary itself. |
| **README modern-web posture** | none (`grep baseline\|reduced-motion\|scheduler\|tree-shak\|sideEffects` in README → 0). | No Baseline statement, no documented tree-shaking contract, no reduced-motion section. The library's own modern-web identity is undocumented. |
| **`Worker`/`OffscreenCanvas`/`Atomics`** | absent. | Not a gap to *close* (substrate-without-consumer) — note only. A worker-driven `NumericAnimation` would need ≥2 consumers to ship. |

### 1.1 CLAUDE.md staleness (hygiene)

`src/animation/CLAUDE.md` still documents `index.ts` as holding `Animation,
CSSKeyframesAnimation` and references `../parsing/`, `../units/`, `../easing`,
`../math` import paths — pre-KF-B1 / pre-value.js-extraction geography. The heavy
classes now live in `engine.ts`; leaf math is `internal/leaves.ts`. The doc must
re-sync to the boundary topology. Folds into the A tranche doc-update wave.

---

## 2. keyframes.js tranche A — the scaffold spec (REQUIRED)

keyframes.js runs on **changesets**, not tranches. Every other constellation repo
(glass-ui, bbnf-lang, fourier, speedtest, muster) uses the bbnf tranche format
(`docs/tranches/<LETTER>/`). keyframes is the lone hold-out. Its precepts submodule
already carries the full tranche spec (`docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md`,
`tranche/SPEC.md`, `tranche/WAVE_SPEC.md`) — it just never instantiated a tranche.
Tranche **A** is keyframes' first.

### 2.1 The changeset↔tranche reconciliation (the format question)

keyframes must not run *two* process units. The reconciliation: **the tranche owns
the binding question + waves + gates; the changeset stays the release mechanism.**
A tranche closes by cutting a changeset (the `Version Packages` PR → tag →
`release.yml`), so the changeset becomes the tranche's *publish artefact*, not a
parallel planning track. A wave's hard gate that ships a version writes its
changeset at close; `CHANGELOG.md` (already prose-rich, e.g. the v2.2.0 KF-B1 entry)
becomes the changeset-rendered close record. No `docs/tranches/A/FINAL.md`
duplicates the CHANGELOG — `FINAL.md` records the *tranche* close (gates met,
overfitting audit, deferrals); the CHANGELOG records the *release*. This is the
DOC_UPDATE reconciliation the A tranche must spell out as Wave 0.

### 2.2 Scaffold to create (PLANNING ONLY — not built here)

```
keyframes.js/docs/tranches/A/
├── A.md          # the plan: binding question + wave outline + hard gates
├── PROGRESS.md   # the execution log (per-wave entries + trigger firings)
├── FINAL.md      # the close report (gates met / retired / archived + overfitting audit)
└── waves/        # W<N>.md when a wave's scope warrants its own doc
```

Plus: file the CI-breakage issue (the unfiled "#177"), and run the
`git submodule update docs/precepts` checkout-advance as a pre-wave hygiene step.

### 2.3 Tranche A — binding question + wave outline

**Binding question:** *Can keyframes.js close the KF-B1 follow-on ergonomics, repair
its release CI, and earn its own modern-web/perf baseline — folding the
changeset-only history into the bbnf tranche format — without breaking the v2.2.0
light/heavy boundary or adding a single value.js static edge?*

| Wave | Name | Scope | Hard gate (evidence-bearing) |
|---|---|---|---|
| **A.W0** | Format reconciliation + hygiene | Stand up `docs/tranches/A/`; codify the changeset↔tranche contract (§2.1); `submodule update` checkout to `63240e6`; re-sync `src/animation/CLAUDE.md` to boundary topology; file the CI issue. | Scaffold exists + doc reconciliation reviewed; CLAUDE.md diff matches `engine.ts`/`leaves.ts` geography; submodule HEAD = `63240e6`. |
| **A.W1** | Release-CI repair | Split library-only build (`src/animation`→`dist/`) from the demo build so CI needs **zero** `@mkbabb/glass-ui` resolution; the `file:../glass-ui` seam is demo-dev-only. | A clean-runner `npm ci && npm run build:lib && npm test` is **green with no `file:` resolution** (reproduce CI env locally, not the symlinked dev env). The release dry-run reaches `npm publish --dry-run`. |
| **A.W2** | Boundary ergonomics | Unify `.ready()` into one `EasingResolvable` contract (retire the 3 hand-rolled copies); close the string-easing silent-linear footgun — either eager-resolve-on-construct-when-name (opt-out) or a dev-warning when `.at()` runs pre-`.ready()` with a pending name. | Focused test: `.at()` with a string name BEFORE `.ready()` is documented+detectable (warns or auto-resolves); the 3-copy duplication is gone; **still zero static value.js edge** in the light bundle. |
| **A.W3** | `proof:boundary` gate | Build a spring-only entry; assert 0 value.js bytes + 0 static `engine-*` edge in the resulting chunk. Wire into CI. | The gate runs in CI and **fails** when a value.js import is reintroduced into a light module (negative test proves it bites). |
| **A.W4** | Engine modern-web/perf pass | `prefers-reduced-motion` opt-in extended to the heavy `Animation` play path + `morph`/`timeline`; `scheduler.yield()` (Baseline-detected, ≤20 LOC `setTimeout` fallback) in `AnimationGroup.tick()` for ≥N-child groups; evaluate `linear()`-widened WAAPI eligibility for spring curves; README modern-web/Baseline/tree-shaking section. | Reduced-motion: focused test snaps to final frame under the media query on the heavy path. Yield: a long-task trace (Playwright bench, the `bench/playwright.bench.ts` harness already exists) shows the group loop breaking >50ms tasks. Overfitting audit: every new artefact has ≥2 consumers or a demo. |

A.W1 is the unblock (CI green → tag-release works → no more local-only publishes).
A.W2/A.W3 harden the boundary the v2.2.0 release shipped. A.W4 is the engine's own
modern-web identity — the pass the constellation never gave keyframes because it
only ever treated it as the value.js gate.

---

## 3. words/floridify — first tranche recommendation

words consumes glass-ui `^3.0.0` + keyframes `^2.2.0` + value.js `^0.10.0`; the
R-CONSUME landed (20 root-barrel sites at HEAD, matching the close note's "84→21";
value.js off the eager graph via the keyframes dynamic boundary). No `docs/tranches/`.
The stack: Vue 3.5 + vue-router 4 + Pinia + Clerk auth frontend; FastAPI + MongoDB
(beanie/motor) + AI-synthesis backend (`floridify`); a separate `notification-server`
for web-push.

### 3.1 Modern-web gaps (evidence-backed)

- **PWA is hand-rolled, not Workbox.** `frontend/public/service-worker.js` (248 LOC,
  `floridify-v3` cache) is a manual cache-first/network strategy with hard-coded
  `STATIC_ASSETS` (`/assets/index.css` etc. — **brittle**: vite emits hashed asset
  names, so the precache list rots every build and the listed paths likely 404
  post-build). `usePWA.ts` + `useIOSPWA.ts` hand-roll install-prompt + push-subscribe
  + update-flow. This is the muster J.W4.3 "Workbox SW" pattern that words pre-dated.
  A `vite-plugin-pwa`/Workbox migration gives content-hash-aware precache injection,
  a real offline route, and update-flow for free — retiring ~250 LOC of drift-prone
  hand-roll. (Baseline: SW is Widely; the migration is a build-time swap.)
- **No `content-visibility`.** words renders large lists via `@tanstack/vue-virtual`
  + custom `useVirtualGrid`/`useVirtualSectionWindow`/`useWindowedStore` — but no
  `content-visibility:auto` anywhere (`grep` → 0). The glass-ui AQ `.deferred-section`
  utility (the constellation's de-duped content-visibility home) is available via the
  3.x bump and unadopted. Off-screen definition cards + the admin tables are the
  application sites.
- **INP under the virtual-scroll + AI-synthesis render.** The big-render surfaces
  (word lookup → multi-definition synthesis, wordlist windowing) are classic INP
  long-task sites. glass-ui's `useYieldToMain` (AQ) is the adopt-not-build lever;
  words has not adopted it. The `break-up-long-tasks` guide's `scheduler.yield()`
  pattern applies to the client-side re-rank/filter paths.
- **FastAPI security baseline — the headers gap.** `api/main.py` has CORS (scoped
  origin allow-list, good), Clerk auth, rate-limiting, cache-headers, structured
  logging, exception handlers — a **solid** baseline. The gap: **no security-headers
  middleware** (`grep Strict-Transport\|Content-Security-Policy\|X-Content-Type\|Permissions-Policy\|Cross-Origin-Opener\|Sec-Fetch` across `src/floridify/` → 0). Per the
  security guide's companion-policies set: HSTS, `X-Content-Type-Options:nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, a report-only CSP (Phase 2 → enforce),
  COOP/CORP, and Fetch-Metadata resource-isolation (`Sec-Fetch-*` deny cross-site
  navigations to API routes). This is the words-local analogue of muster J.W7-a's
  "Hono security-headers" — **not** shareable substrate (FastAPI ≠ Hono; server
  stacks differ), genuinely words-local. The CORS `allow_credentials=True` with a
  fixed origin list is correct; the missing piece is the response-header policy
  layer + Fetch-Metadata.
- **The brittle SW precache + the dev-sw-cleanup.js** (`public/dev-sw-cleanup.js`
  exists to un-register stale dev SWs) signals the hand-rolled SW has caused real
  cache-staleness pain — corroborating the Workbox migration value.

### 3.2 Recommendation — words tranche A

Greenfield (no `docs/tranches/`); first letter **A**. Binding question:
*Can words earn its modern-web baseline — a content-hash-correct Workbox PWA, the
glass-ui content-visibility/INP levers adopted, and the FastAPI security-header +
Fetch-Metadata layer — on top of the landed 3.0.0 R-CONSUME, without regressing the
Clerk-auth or web-push flows?* Wave sketch: **W0** scaffold + precepts submodule
*commit* (§0.1 — the only true sync debt in the slice); **W1** Workbox/vite-plugin-pwa
migration (retire the 248-LOC hand-roll + the dev-sw-cleanup shim); **W2** adopt
glass-ui `.deferred-section` + `useYieldToMain` on the virtual-list/synthesis
surfaces; **W3** FastAPI security-headers middleware + report-only CSP + Fetch-Metadata
(words-local, mirrors muster's pattern, not shared substrate); **W4** INP/Lighthouse
measure (CI-gated, honest AFTER numbers).

---

## 4. bbnf-lang/playground — brief

The bbnf-lang *repo* has an extensive `docs/tranches/` (A–Z, B0–B7, BA–BD — it's a
mature Rust grammar engine). The **playground** is its Vue SPA consumer
(grammar.babb.dev), and it is the modern-web surface here. R-CONSUME landed: glass-ui
`^3.0.0` + keyframes `^2.2.0` + value.js `^0.10.0`; precepts gitlink canonical
(`63240e6`, checkout drift only). It is a static SPA (Monaco editor + WASM grammar
module), **vite 6** (the rest of the constellation is on vite 8), no PWA/SW.

- **Deploy:** `scripts/deploy.sh` — builds WASM (`wasm-pack build --target web`) →
  builds the playground (`npm run build`) → `rsync -avz --delete -e "ssh -p 1022"`
  to `mbabb@mbabb.fridayinstitute.net:/var/www/grammar`, served at grammar.babb.dev.
  Clean and idiomatic. No CI deploy (manual rsync); no `_headers`/nginx
  security-header layer at the deploy target visible in-repo.
- **Modern-web gaps:** (1) **vite 6 → 8 + Rolldown** lockstep with the constellation
  (keyframes/glass-ui are on vite 8); (2) **no CSP/security headers** — a static SPA
  rsync'd to nginx; the fourier `_headers`/nginx CSP recipe is the copy source (the
  execution plan named fourier "the CSP `_headers` recipe SOURCE the other SPAs
  copy"); (3) **Monaco is a heavy eager chunk** — the perf lever is route-level
  code-split + `content-visibility` on the docs route (the `DocsPage` chunk already
  splits; the editor does not); (4) **no PWA** — *optional*, a grammar playground is
  a weak PWA candidate (substrate-without-consumer — do **not** ship a SW without a
  real offline use case).
- **Recommendation:** bbnf-playground does **not** warrant its own tranche letter —
  its surface is 3 small local items (vite-8 lockstep, the nginx/CSP header recipe,
  the Monaco route-split). Fold them into the next **bbnf-lang repo** tranche (the
  repo's existing BD+1 letter) as a single "playground modern-web" wave, or run as a
  changeset-scale local sweep. The substrate-without-consumer bar refuses a standalone
  PWA tranche here.

---

## 5. Overfitting / substrate posture

- keyframes A.W2's `EasingResolvable` is **de-duplication** (retires 3 hand-rolled
  `.ready()` copies) — passes the ≥2-consumer bar trivially (the 3 light engines).
- keyframes A.W4's `scheduler.yield` in `AnimationGroup` and reduced-motion on the
  heavy path are engine-internal — gated by the existing consumer set (the demo +
  every keyframes consumer), no new public surface.
- words' Workbox migration is a **net deletion** (250 LOC hand-roll + the cleanup
  shim) — the muster-pattern adopt.
- bbnf-playground PWA is **refused** as substrate-without-consumer. Correct.
- The FastAPI security-header layer is words-local (not shared substrate — FastAPI ≠
  Hono ≠ nginx); each SPA's CSP `_headers` copies the fourier recipe. No cross-repo
  substrate is created.
