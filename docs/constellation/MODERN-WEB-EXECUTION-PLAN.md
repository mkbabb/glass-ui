# Constellation modern-web execution plan — de-duped + dependency-ordered

The reconciliation of the `@mkbabb` constellation's modern-web work into ONE de-duplicated,
dependency-ordered execution schedule. Produced by a 6-agent cross-repo audit (value.js · keyframes.js
· glass-ui · fourier-analysis · speedtest · muster) against the existing tranche state + Google's
modern-web-guidance. The headline: the constellation was carrying the **same substrate work N times** —
this plan collapses it to **one upstream publish per item, N consumer adoptions**, and shows it can run
**fully parallel within three publish-gated layers**.

## 1. The dependency DAG

```
value.js  ──>  keyframes.js  ──>  glass-ui  ──>  { fourier-analysis · speedtest · muster · words · bbnf-lang }
(foundational)   (imports value)    (imports both)         (leaf consumers — PARALLEL among themselves)
```

Verified `@mkbabb` edges: keyframes.js imports value.js (static); glass-ui imports keyframes.js +
value.js; every consumer imports glass-ui (+ keyframes/value directly). No consumer depends on another
consumer → the consumer tier is mutually parallel once glass-ui publishes. value.js is the topological
root (no `@mkbabb` runtime dep).

## 2. The de-dup verdict (what collapses upward)

The single most important finding: **most of the consumers' "modern-web" tranches are glass-ui-substrate
work in disguise.** A platform primitive adopted once in glass-ui propagates to every consumer; authored
per-consumer it is N-fold duplication.

| Source | Was carrying | Collapses to |
|---|---|---|
| **fourier-analysis I** (the explicit "constellation-modernization, glass-ui-rooted" tranche) | 9 waves α–ι | **~65% IS glass-ui AQ** — α/β/δ/ε/ζ/η are AQ waves wearing a fourier label (the conformance audit's `lands-in=glass-ui` column proves it). Net fourier-local: **5 items**. |
| **speedtest AR/AS** | R0G-1..7 + AS-§3 GU-bundle + AS-MW-* | R0G-1..7 = adopt the staged glass-ui 3.0.0 (no new work); AS-§3 GU requests + AS-MW CSS/forms roots = **glass-ui AQ**; the View-Transitions/spring/demand-park library = **keyframes.js/value.js**. Net speedtest-local: **~6 clusters** (charts, security/SEO, map-load, PWA, the adoption layer, the pure-ST design fixes). |
| **muster J** | ~16 waves | 5 are substrate-adoptions (`useViewTransition`, `:user-invalid`/`useUserInvalidAria`, the 3.0.0 bump, value.js-laziness, the `color-mix` border-bug) that collapse into AQ/keyframes. Net muster-local: **~9 items**. |
| **words/frontend · bbnf-lang/playground** | (no modern-web tranche) | Pure R-CONSUME: the 3.0.0 bump + subpath-import discipline (words **82** root-barrel sites, bbnf **11**) + value.js-laziness. **Net-new adoption, no authored modern-web work.** |
| **value.js I** | api/ palette-server CRUD | **NOT modern-web, NOT library.** Contract-v2 done. Does NOT gate the arc. |
| **keyframes.js** | (changesets) | **B-1** — the single foundational gate (below). |

## 3. The de-duped item set, by tier

### Tier 0 — foundational packages (one publish, every downstream benefits)

- **KF-B1 · keyframes.js value.js static→dynamic re-export** — put the heavy `Animation`/`CSSKeyframes`
  value.js surface behind `await import()` so a `useSpring`-only consumer's static graph no longer
  reaches value.js (74 KB gz). Ships with B-2 (CHANGELOG reconcile — the v2.1.1 entry already *claims*
  this) + B-3 (`sideEffects:false`). Publish keyframes.js **@2.2.0**. **Executable NOW** (value.js@0.10.0
  already published; no further upstream). *Gates:* glass-ui AQ.W7-b, muster J.W4.4, + words/bbnf/speedtest
  (all statically pull value.js via keyframes.js).
- **value.js** — **no pending modern-web/library item.** (Optional, only if glass-ui adopts speedtest's
  AS-GU requests: VAL-1 OKLab aurora-LUT, VAL-9 `springLinearStops→linear()` — foundational sub-edges of
  AS-GU-1/AS-GU-3. Not on the critical path.)

### Tier 1 — glass-ui substrate (the canonical home; one adoption fans out)

- **The staged 3.0.0 publish** (AP-closed, UNPUBLISHED — registry serves 2.1.0): R0G-1..7 +
  `useSpringOrchestrator` alias removal + the AN axe redress. *Unblocks* speedtest R0G-1..7 + the
  AN-axe/color-mix bump for EVERY consumer. Gated only on the user-domain `npm publish` GO.
- **AQ.W2-W7** (the modern-web substrate — dev-phase W0/W1 committed): color/theming (incl. the
  `color-mix` fix for the live consumer `hsl(var(--border)/α)` bug), `:has()`/individual-transforms/
  text-wrap/scrollbars, the form vocabulary (`:user-invalid` + `useUserInvalidAria` + `field-sizing` +
  native `<select>` + `accent-color`), motion→platform (scroll-driven + `@starting-style` +
  `useViewTransition`), anchor/top-layer (anchor underline + native `<dialog>` + `interestfor` + dock VT),
  bundle (heavy-leaf carve + `/number-field` + `/switch` subpaths). Published as 3.x minors.
- **AQ ABSORBS 3 items the consumers were hand-rolling** (the audit's net-new substrate gaps):
  1. **`.deferred-section` content-visibility utility** — `content-visibility: auto`+`contain-intrinsic-size`
     + the `contentvisibilityautostatechange` canvas-pause + a `content-visibility: hidden` view-cache
     recipe. Hand-rolled in fourier (γ), muster (J.W4.2/W5.4), speedtest (AS-MW-INP), words, value.js-demo.
     **glass-ui ships the utility; each repo applies it locally.**
  2. **`yieldToMain()`/`scheduler.yield` in `useRAFLoop` (+ a motion-barrel `useYieldToMain` composable)**
     — the INP-under-load lever. Named by fourier (ι), muster (J.W5.1), speedtest (AS-MW-INP/KF-4).
  3. **Coarse-pointer 44px floor + aria-name amendment** — extend the `.glass-dock`-scoped R0G-6 floor to
     `Button size="icon"` + ExpandableContainer + ResponsiveTabs aria-labels. ONE amendment retires
     speedtest's 4 one-liners + the `button-name` Lighthouse fail + the fourier/muster coarse-target asks.
- **glass-ui consumer-request bundle (speedtest AS-§3)** — `deriveAurora()`+OKLab-LUT aurora,
  whisper-heading rung, `--spring-crisp`, GlassDock dark-rung + overflow scoping, AnimatedDigit/MetricBadge/
  ContinuousTimeline polish, `<CompletionSeal>`/celebration easing. These are glass-ui-substrate but
  design/feature requests (not strictly modern-web) — **evaluate for AQ inclusion vs a sibling glass-ui
  wave, ≥2-consumer gated.** (The aurora + spring ones carry the value.js VAL-1/VAL-9 + keyframes KF-3
  foundational sub-edges.)

### Tier 2 — consumer-specific (stays local; genuinely each repo's own surfaces)

- **muster J (~9):** the SSR-route harness re-point (W2), SSR-unify hero + critical-CSS (W3), the subpath
  *rewrite* (W4.1), `content-visibility` placement (W4.2/W5.4), Workbox SW (W4.3 — *words already has one*),
  yield/postTask re-rank (W5.1) + double-spring collapse (W5.2), form-wrap + attribute tokens (W6),
  **Hono security-headers + CSP + scoped CORS + Fetch-Metadata (W7-a)** — a shared *pattern* but NOT a
  shareable substrate (glass-ui is frontend-only; server stacks differ: Hono vs FastAPI), landmarks/title (W7-b).
- **fourier-I (5):** content-visibility *application* on the 97-page paper window + epicycle canvas rAF
  pause + RouterView caching (γ); the **P0 orphaned form labels** (`FunctionInput.vue:97,114` — the
  constellation's ONLY true a11y P0, lands FIRST); `<picture>` figures + GitHub-avatar self-host (θ); the
  floating-TOC scroll arm (δ, AQ-gated); the `/w/`↔`/v/` route-morph arm (ε, AQ-gated). fourier is also the
  **CSP `_headers` recipe SOURCE** the other SPAs copy.
- **speedtest (~6):** `test:smoke:charts` (echarts — no glass-ui chart family); robots/meta/charset +
  admin `type="password"`/`<form>`/`__Host-` cookie + `_headers` CSP/HSTS/COOP (its own SPA/admin/Cloudflare);
  maplibre/h3 `fetchpriority`+preconnect; PWA manifest; the ST consumer-adoption layer; the pure-ST AS
  design fixes + DDR ledger.
- **words / bbnf-lang:** no authored modern-web work — pure R-CONSUME (below).

## 4. The execution schedule — parallel within three serial gates

The user's question — "full parallel OR serial?" — resolves to: **fully parallel within each layer; only
three publish-gates force serialization.** The proposed serial order (glass-ui → fourier → speedtest →
muster) is refined to put the foundational packages first and the consumers in a parallel fan-out:

```
              ┌─────────────────────────── LAYER A (all parallel, NOW) ───────────────────────────┐
  value.js    keyframes.js KF-B1      glass-ui AQ.W2-W7 impl       muster J-LOCAL    fourier-LOCAL    speedtest-LOCAL
  (no work)   (the value.js boundary;  (the substrate; W7-b waits   (W2,W3,W4.1/2/3,  (γ,P0-FIRST,θ)   (AS-MW SEC/PWA/
              executable now → @2.2.0)  on KF-B1 — see GATE 0)       W5.1/2/4,W7-a/b)                   LOAD, CHARTS,
                                                                                                       stopgaps)
              └──────── GATE 0: publish keyframes.js@2.2.0 ────────┘                  ┌─ GATE 1 ─┐
                         (unblocks value.js-laziness:                                 publish glass-ui
                          AQ.W7-b, muster J.W4.4, words, bbnf)                        3.0.0 (the staged cut)
                                                                                      → speedtest R0G-1..7
                                                                                      → AN-axe + color-mix bump
                                                                                        for ALL consumers
              ┌──────────────────────── GATE 2: publish glass-ui AQ 3.x minors ───────────────────────┐
              (W2 color-mix/--border-soft · W4 :user-invalid/useUserInvalidAria · W5 useViewTransition ·
               W7-c /number-field + /switch subpaths)
              → unblocks the consumer ADOPTION waves, all PARALLEL:
                 muster J.W4.1-⟂ (subpaths) · J.W4.4 (value.js) · J.W5.3 (VT) · J.W6/W7-c (forms) · J.W7-d (bump)
                 fourier δ/ε arms · FullscreenViewer overlay swap
                 speedtest AS-GU adoptions · AS-MW-VT/forms/INP · R0G consume
                 words: 3.0.0 bump + 82-site subpath sweep + value.js-laziness
                 bbnf:  3.0.0 bump + 11-site subpath sweep + value.js-laziness
              └────────────────────────────────────────────────────────────────────────────────────┘
```

### The three serial gates (the only forced ordering)

- **GATE 0 — keyframes.js@2.2.0** (KF-B1). Executable immediately. Unblocks value.js-laziness everywhere.
- **GATE 1 — glass-ui 3.0.0 publish** (the AP-closed staged cut). User-domain `npm publish` GO. Unblocks
  speedtest R0G-1..7 + the AN-axe/`color-mix` correctness bump for *every* consumer on a pre-3.0.0 pin
  (muster `^2.1.0`, words/bbnf `^2.0.0`, fourier `^2.0.0`, speedtest `^2.1.0`).
- **GATE 2 — glass-ui AQ 3.x minors** (per AQ impl wave, additive + fallback-guarded). Unblocks the
  consumer platform-adoption waves. Each AQ wave is justified by ≥2 consumers adopting it (muster J is the
  first/primary proof; fourier/speedtest are the second).

### What runs FULLY PARALLEL right now (no gate)

Everything **local** — independent across all repos: keyframes.js KF-B1; glass-ui AQ impl (W2-W7, modulo
W7-b which waits on GATE 0); muster J-local (the SSR/critical-CSS/INP/security/landmarks cluster —
AQ-independent); fourier-local (γ-application, the P0 form-label rider FIRST, θ assets); speedtest-local
(AS-MW security/SEO/PWA/load, charts, the consumer stopgaps + browser-API View-Transitions adoption which
needs no library publish). **No consumer waits on another consumer.**

## 5. The two execution modes (answering the question directly)

- **FULL PARALLEL** — run every repo's local item set simultaneously now; defer only the three gated
  adoption sets. Maximum throughput; the gates land asynchronously and each consumer's R-CONSUME fires
  when its upstream publish arrives. Best if you want all repos moving at once.
- **SERIAL SPINE** — `value.js (done) → keyframes.js@2.2.0 → glass-ui 3.0.0 → glass-ui AQ minors →
  consumers`. One publish at a time, each consumer adopting on the clean upstream. Best if you want a
  single clean adoption wave per consumer with no stopgaps. The proposed `glass-ui → fourier → speedtest
  → muster` order is the *consumer* sub-order within the final layer — and since the consumers are
  mutually independent, that sub-order is free choice (or parallel).

## 6. Net per-repo item count after de-dup

| Repo | Was | After de-dup | Gated on |
|---|---|---|---|
| value.js | (api/ tranche) | **0 modern-web** | — |
| keyframes.js | — | **1** (KF-B1 + 2 hygiene riders) | nothing (now) |
| glass-ui | AQ 12 waves | **12 + 3 absorbed gaps + 1 amendment + the AS-§3 request bundle** (the canonical substrate) | GATE 0 for W7-b; user-auth for impl |
| fourier-analysis | I 9 waves | **5 local** (3 now, 2 AQ-gated) | GATE 2 for δ/ε |
| speedtest | AR/AS large | **~6 local clusters** | GATE 1 (R0G), GATE 2 (AS-GU/MW) |
| muster | J ~16 waves | **~9 local** (+5 adoptions, +2 deferred) | GATE 0 (W4.4), GATE 2 (W5.3/W6) |
| words/frontend | — | **R-CONSUME only** (bump + 82-site sweep + value.js-laziness) | GATE 1/GATE 0 |
| bbnf-lang/playground | — | **R-CONSUME only** (bump + 11-site sweep + value.js-laziness) | GATE 1/GATE 0 |

## 7. The critical path + the immediate next actions

The **shortest serial path** to every consumer R-CONSUMING is: **keyframes.js@2.2.0 (now) → glass-ui
3.0.0 publish (user GO) → glass-ui AQ W2/W4/W5/W7-c minors → consumers adopt (parallel).** Everything
else parallelizes off this spine.

Immediately actionable with **zero upstream gate** (in priority order):
1. **fourier P0 form-label fix** (`FunctionInput.vue:97,114`) — the only true a11y P0 in the constellation.
2. **keyframes.js KF-B1** — the value.js dynamic boundary (unblocks value.js-laziness for 4 consumers).
3. **glass-ui AQ impl** (W2 first — color/theming, incl. the `color-mix` consumer-bug fix) — the substrate
   the whole fan-out adopts. (Currently dev-phase; opens on user authorization.)
4. **muster J-local** (J.W2 harness → J.W3 SSR-hero) + **fourier-local γ/θ** + **speedtest-local AS-MW** —
   all parallel, no gate.

User-domain (held, confirm-first): the **glass-ui 3.0.0 `npm publish` GO** (GATE 1 — the single highest
unblock); the constellation push perimeter (muster has no remote; speedtest ~550 commits behind origin);
the precepts submodule. These are recorded, not executed.

---
*This plan supersedes the per-repo modern-web duplication: fourier-I's α/β/δ/ε/ζ/η, speedtest's AS-§3 GU
bundle + AS-MW CSS/forms roots, and muster J's 5 substrate-adoptions all converge into glass-ui AQ + the
keyframes.js KF-B1 publish. Each consumer's tranche reduces to its irreducible local surface + the
two-gate R-CONSUME on the upstream publishes.*
