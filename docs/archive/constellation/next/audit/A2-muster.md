# A2 — muster slice (next-constellation audit)

muster is the Vue 3.5 SSR group-decision optimizer, glass-ui's heaviest consumer. This slice audits
where muster sits AFTER tranche J (the modern-web close), reconciles its deferred + chronically-deferred
ledger against the constellation modern-web plan, runs the named modern-web gaps through muster's actual
architecture (the headline: muster is a single-route SSR SPA — Speculation Rules and cross-document VT
are architecturally inapplicable, not deferred), and sketches tranche K.

Read for this slice: muster J `{J.md, FINAL.md, PROGRESS.md}`, the three J.W1 design slices, the J.W0
baseline + W1-close audits, the `W2-lighthouse-baseline.json`, the I/H FINALs for the chronic ledger,
the glass-ui constellation `MODERN-WEB-{CLOSE,EXECUTION-PLAN}.md`, and the Chrome modern-web-guidance
corpus (`improve-next-page-load-performance`, `navigation-drawer`, `cross-document-transitions`,
`consistent-cross-document-transitions`, `identify-inp-causes`).

---

## 1. Where J left muster (the as-built, verified)

J closed `complete`. The structural wins are real and independently witnessed; the one residual is
Lighthouse performance TIMING, machine-noise-dominated.

| Axis | J close state | Witness |
|---|---|---|
| SSR-unify | the real WinnerHero/RankedVerdict SFCs compile into the SSR bundle; LCP class in raw HTML | `W2…json` `witness.present: true`; render-blocking = 0 |
| Eager-JS | **200.1 → 155.0 KB gz** (−45 KB / 22.5%); 49.8 KB headroom under the 204800-byte gate | `eagerJsGzKb: 155.01` |
| INP / motion | re-rank yields (`useYieldToMain`); double spring → one; verdict reveal = `startViewTransition` | `WinnerHero.spring.spec.ts` + `rerank.spec.ts` |
| Forms | real `<form>` + Enter-submit; `autocomplete`/`inputmode`/`enterkeyhint`; `useUserInvalidAria` bridge | `SettingsDialog.vue` + `main.ts` |
| Security | `security-headers.ts` + nonce'd report-only CSP + scoped CORS + Fetch-Metadata | server vitest 97/1-skip |
| a11y | `<main>`/`<header>`/`<footer>` + skip-link survives hydration + `useTitle`; **axe 24/0** | `accessibility: 1.0` |
| best-practices | **0.96** ≥ 0.95 | `W2…json` |
| color-mix live bug | the 64-site `hsl(var(--border)/α)` double-wrap fixed (hairlines now paint) | AQ 3.1.0 adoption |
| remote | `git@github.com:mkbabb/muster.git` created + pushed (the chronic I/H "no remote" leg, EXECUTED) | FINAL §perimeter |

**The load-bearing residual (verified from the baseline JSON):** `performance: 0.58`, `fcpMs 6455`,
`lcpMs 8859`, `cls 0.0729`. Two of these are honest concerns, not just noise:
- FCP/LCP timing is noise-dominated (local dev Node process under ambient `build:watch` load) — a
  clean-machine re-measure problem, NOT a product miss. The STRUCTURAL fixes that drive timing are all
  landed (render-blocking 0, LCP in raw HTML, TBT 61 ms).
- **CLS 0.0729 EXCEEDS the 0.05 budget the J.W1.1 design itself set** (`W2…json` `budgets.metric.cls:
  0.05`). This is a quiet inconsistency: J.FINAL cites "CLS 0.072" as a structural win, but the design's
  own enforce-ceiling was 0.05. The `ClientOnly` fence's aside-mount reflow (J.W1.1 risk 2) is the
  prime suspect — the fence placeholder reserving the Configurator aside grid track is the named
  mitigation, and the 0.0729 figure suggests it under-reserved. **This is a real, in-budget-terms
  open item, surfaced honestly (the noise framing covers FCP/LCP, NOT CLS).**

---

## 2. Deferred + chronically-deferred ledger

### 2a. J's own named deferrals (CI-gated confirmations, NOT successor waves)

| Item | Status | Disposition for K |
|---|---|---|
| Full 107-spec Playwright run on a clean machine | local run carries 2 known-independent fails (oracle CSV `oracle.spec.ts`; voter-roster delete `voter-roster.spec.ts`) | **CONFIRM** — these pre-date J, cross no J wave's assertion path; K verifies they are the only two |
| Clean-machine Lighthouse re-measure | the noise-dominated 0.58 / 6455 / 8859 in `W2…json` | **the K binding question's spine** (see §4) |
| CLS 0.0729 vs the 0.05 design ceiling | over budget; the noise framing does NOT cover it | **K must close** — fence aside-reservation tune |

### 2b. Chronic deferrals — RESOLVED at J (recorded so K does not re-open them)

- **The git remote** (chronic across H→I, "highest-priority user-domain action") — **EXECUTED at J.**
  Remote created + pushed. Closed.
- **The SSR-unify backstop** (named + deferred at I.W1.3 §3.3) — **EXECUTED at J.W3.** Closed.
- **The eager-JS 200.07 asterisk** (chronic I→J, the 76-byte overage) — **RETIRED at J.W4** (→ 155.0).
  Closed.
- **The 5 NumberField/Switch AQ-publish-gated sweep sites** (J.W1.2 ⟂ rows) — **LANDED in the J.W4
  sweep** once AQ published `/number-field` + `/switch`. Closed (not a chronic carry).

### 2c. Named-forward contingencies (carried, NOT chronic — each gated on a product-shape change)

| Contingency | Gate | Verdict |
|---|---|---|
| **Passkeys** | a named-account model (muster is anonymous slug+UUID) | **DO NOT FORCE.** Adopting WebAuthn inverts the anonymity model = overfit substrate. Stays a documented non-recommendation. Re-confirmed below. |
| **Native mobile drawer** | design-gated; vaul-vue `activeSnapPoint` re-snap bug (AN.W3) | candidate for K (see §3 — this is the ONE named-forward with a real modern-web lever) |
| **Speculation Rules** | muster gaining MPA navigations | **ARCHITECTURALLY INAPPLICABLE** (see §3) |

---

## 3. Modern-web leverage gaps — run through muster's ACTUAL architecture

The task names six gaps to assess. The dominant finding: **muster is a single-route SSR SPA** (one
Hono `GET /` SSR route; zero vue-router, zero `RouterView`, zero MPA navigations — verified by grep).
This refutes two of the six gaps outright and reshapes the rest.

### 3a. Speculation Rules — INAPPLICABLE (refuted, not deferred)

The `improve-next-page-load-performance` guide is unambiguous: **"DO NOT use speculation rules on Single
Page Applications (SPAs). … In SPAs, the browser does not navigate to a new document on each navigation,
so speculation rules will not work as expected."** muster has exactly one navigable document. There is
no second URL to prefetch/prerender. Speculation Rules has **zero surface** here. **Verdict: refute and
close the named-forward — it is not "IF muster gains MPA navigations," it is "muster's product shape is
single-document by design."** Recording it as a deferral would be a false-witness substrate entry.

### 3b. Cross-document View Transitions — INAPPLICABLE (refuted)

Same root cause. `cross-document-transitions` requires a same-origin DOCUMENT navigation (`@view-transition
{ navigation: auto }` opts BOTH pages in). muster has one page. The `consistent-cross-document-transitions`
levers (`blocking="render"`, `<link rel="expect">`) are also MPA-coupled. **muster already has the RIGHT
VT primitive for its shape: the SAME-document `startViewTransition` morph (J.W5, AQ.W5 `useViewTransition`)
for the verdict reveal/re-rank.** That is the correct VT for a single-document app. **Verdict: refute the
cross-document gap; the same-document VT is the landed, correct adoption.** One micro-note: `<link
rel="expect" href="#muster-stage" blocking="render">` is *technically* usable same-document as an FCP
stabilizer (block paint until the LCP hero is parsed) — but muster's SSR-unify already ships the hero in
raw HTML, so the FCP win is already captured at the cause; `rel=expect` would be redundant substrate.
**Do not adopt.**

### 3c. Native mobile drawer — DESIGN-GATED, the one LIVE modern-web lever

`MobileInstrumentSheet.vue` uses vaul-vue, whose `activeSnapPoint` controllable shadows external prop
writes once the gesture machinery runs (AN.W3 — re-snapping an OPEN sheet is a vaul-vue upstream bug).
The `navigation-drawer` guide ships a **JS-pointer-free** native drawer: `popover="manual"` (top layer)
+ CSS `scroll-snap-type: x mandatory` (the swipe) + a scroll-driven `@property --drawer-backdrop`
animation + `IntersectionObserver` for state/focus/`inert`. This sidesteps vaul-vue's re-snap bug
entirely (the browser owns the gesture). **But** all swipe/backdrop mechanics are CSS/platform —
the right home is a glass-ui substrate primitive, NOT a muster hand-roll (the constellation de-dup
lesson: a platform primitive adopted once in glass-ui fans out; hand-rolled per-consumer it is N-fold
duplication). **Verdict: a real lever, but glass-ui-substrate-shaped.** muster K should ASK glass-ui for
a native-drawer `Drawer :native` opt-in (or a new `GlassNativeDrawer`), ≥2-consumer-gated (speedtest's
mobile sheet is the natural second consumer). If glass-ui declines the wave, muster keeps vaul-vue (the
re-snap bug is a known upstream limitation, not a muster defect). **This couples to a glass-ui design
wave — flag it forward, do not hand-roll.**

### 3d. 103 Early Hints / priority hints depth — PARTIAL, deploy-gated

The corpus has **no 103 Early Hints guide** (the closest, `improve-next-page-load-performance`, is the
Speculation-Rules MPA guide). 103 Early Hints is a SERVER/CDN-edge capability (the origin flushes a
`103` interim response with `Link: rel=preload` before the full SSR render completes). muster has **no
deploy target** (no Dockerfile/fly/wrangler/nginx — verified; the server is `tsx src/main.ts` on a dev
Node process). **103 Early Hints requires an edge/proxy that supports interim responses; a bare Node
process cannot meaningfully emit them to a real client path.** Priority hints DEPTH: J.W3 landed
`fetchpriority="high"` on the entry + font preload + preconnect (D5) — the high-leverage set is done.
The remaining depth (`fetchpriority` on the LCP-relevant image) is **N/A — muster's LCP is a text `<h2>`,
not an image** (verified: no LCP image story). **Verdict: 103 Early Hints is deploy-gated and
substrate-without-a-deploy-target; priority hints are substantively complete. Neither is a K wave; both
are named-forward to a real deploy.**

### 3e. SSR streaming — DEFERRED, low-leverage for a single-hero document

`renderToString` (the current J.W3 path) buffers the whole SSR shell before flushing. Streaming
(`renderToWebStream`/`pipeToNodeWritable`) flushes the `<head>` + above-fold shell first, then the rest
as it renders — TTFB/FCP win for LARGE documents. muster's SSR shell is **deliberately scoped to the
above-fold verdict column** (J.W1.1 §D3.b — the aside/dock/palette are behind a `ClientOnly` fence and
do NOT server-render). So the SSR document is already MINIMAL; there is little tail to stream. The
critical CSS is already inlined in `<head>` (J.W3 D4). **Streaming's win is proportional to the
server-rendered tail size; muster's tail is near-zero by the J design.** **Verdict: low-leverage; the
SSR-unify scope already captured the FCP win at the cause. Defer unless a clean-machine re-measure shows
TTFB (not paint) is the residual bottleneck — which the noise-dominated numbers cannot currently
distinguish.** This is downstream of the K binding question (§4): you cannot justify streaming until you
can MEASURE that buffering is the cost.

### 3f. INP field data — LANDED structurally, sink-gated for real data

J.W2 wired `web-vitals/attribution` (`onINP`/`onLCP`/`onCLS`) lazily, beaconing the
`longestScript.sourceURL` + INP subparts to `POST /api/rum` → SQLite `002-rum.sql` (verified:
`server/src/routes/rum.ts` + `frontend/src/rum/vitals.ts` exist). The `identify-inp-causes` guide's
prescription (the `web-vitals` attribution build, LoAF slowest-script field, subpart split) is fully
adopted. **What's missing is not instrumentation — it is FIELD TRAFFIC.** The sink is a local SQLite
ring; with no deployed origin and no real users, there is no field INP distribution to read. The beacon
fires on synthetic Playwright drags (the J.W2 gate), proving the pipe, but the DATA is empty. **Verdict:
the instrumentation is complete and correct; real INP field data is deploy-gated (same root as 3d/3e —
no production origin). Named-forward to a deploy, not a K wave.**

### 3g. The pattern across 3a-3f

**Four of the six named gaps reduce to one of two muster facts:** (i) muster is a single-document SPA
(refutes Speculation Rules + cross-document VT outright), and (ii) muster has no production deploy target
(gates 103 Early Hints + real INP field data + meaningfully blocks streaming justification). The two that
remain — the native drawer (3c) and CLS (§1) — are the real movable surface, and the drawer is
glass-ui-substrate-shaped. **This is the honest finding: muster's modern-web frontier is now bounded by
its product shape and its lack of a deploy, not by un-adopted browser platform primitives.**

---

## 4. Tranche K sketch — binding question + wave outline

The de-dup lesson and §3 converge on a single insight: **muster's remaining modern-web frontier is no
longer "adopt more platform primitives" (J exhausted the in-shape ones) — it is "make the measurement
honest enough to know what's left, and close the two real residuals (CLS, the drawer)."** The chronic
risk muster has carried since the I tranche is a measurement that cannot see the truth (I measured the
wrong harness target; J fixed the target but the numbers are noise-dominated by the lack of a clean
host). **K is the deploy-and-measure tranche.**

### Binding question (K)

> Can muster retire the J-residual Lighthouse-timing named-verdict by standing up a real (or
> clean-CI) measurement host — so `performance ≥ 0.90` is witnessed against a representative
> environment, not a dev-machine-noise floor — AND close the two genuine residuals the noise framing
> does NOT cover (CLS 0.0729 → ≤ 0.05 at the `ClientOnly` aside-fence; the full 107-spec Playwright run
> confirming the 2 known-independent fails are the only two) — while REFUTING the inapplicable
> modern-web gaps in the record (Speculation Rules, cross-document VT — both single-document-SPA-N/A)
> and routing the one live lever (the native mobile drawer) to a glass-ui substrate request rather than
> a muster hand-roll, with the 107-spec suite + axe 24/0 + best-practices ≥ 0.95 held throughout?

### Goal criterion

K succeeds when:
- **The measurement is honest.** A clean measurement environment (a CI runner profile, OR a real
  deploy) replaces the dev-machine-noise floor; `performance ≥ 0.90` is witnessed against it, retiring
  the J named-verdict (or the noise is PROVEN structural and the budget re-baselined with evidence).
- **CLS closes.** The `ClientOnly` aside-fence reserves its grid track correctly; CLS ≤ 0.05 (the
  design's own ceiling), re-measured.
- **The suite is confirmed.** The full 107-spec Playwright run is green except the 2 documented
  independent fails, and those 2 are fixed OR formally booked as non-J, non-K independent.
- **The record is honest.** Speculation Rules + cross-document VT are REFUTED in the tranche record
  (single-document SPA; not deferred-with-a-gate but inapplicable-by-shape). The native drawer is filed
  as a glass-ui substrate ASK (≥2-consumer-gated: muster + speedtest). 103 Early Hints + INP field data
  + SSR streaming are named-forward to a deploy with the gate stated.
- **No new substrate without a consumer.** K hand-rolls nothing glass-ui-shaped (the drawer).

### Wave outline

| Wave | Disposition | Contents |
|---|---|---|
| **W0** | DEV | Re-audit: confirm the 6-gap dispositions of §3 against HEAD; the clean-host measurement-design decision (CI-runner profile vs a real deploy — pick the lowest-cost honest host); the CLS root-cause trace (fence aside-reservation) |
| **W1** | DEV | Design slices: (1) the measurement-host + harness re-point to it; (2) the CLS fence-reservation fix; (3) the glass-ui native-drawer substrate ASK (the consumer contract muster would adopt). Dev/impl boundary here. |
| **W2** | IMPL | **Measurement host** — stand up the clean environment; re-run the J.W2 harness against it; persist the representative `performance`/FCP/LCP; either clear ≥ 0.90 or re-baseline with evidence. The gate the rest read. |
| **W3** | IMPL | **CLS close** — the `ClientOnly` aside-fence reserves the Configurator grid track (`minmax(280px,360px)`); re-measure CLS ≤ 0.05; the suite green. |
| **W4** | IMPL | **Suite confirmation** — the full 107-spec run on the clean host; fix or formally book the oracle-CSV + voter-roster-delete fails; axe 24/0 + best-practices ≥ 0.95 re-held. |
| **W5** | IMPL/ASK | **Native drawer** — IF a glass-ui design wave ships the native-drawer substrate (`Drawer :native` / `GlassNativeDrawer`), adopt it in `MobileInstrumentSheet.vue` (retires the vaul-vue re-snap workaround); ELSE record the ASK + keep vaul-vue (gated on the glass-ui wave, like J's AQ couplings). |
| **W6** | IMPL | Close ceremony — refute-record (Speculation Rules / cross-doc VT inapplicable; 103/streaming/INP-field deploy-gated); π/axe/overfitting; FINAL + stack close. |

### Ordering rationale

**W2 first** — the same honest-gate discipline I→J: you cannot retire a timing named-verdict you cannot
measure, and the current harness measures a noise floor. W3 (CLS) is independently gateable on the W2
host. W4 confirms the regression bar. W5 couples to a glass-ui publish (parallel to J's AQ-gated waves);
it is the only outward-coupled wave and may land async or defer cleanly. The refute-record (W6) costs
nothing structural but keeps the modern-web ledger honest — the substrate-without-consumer invariant
applied to NON-recommendations.

### The honest pre-emption

K is a SMALL tranche by design. J exhausted muster's in-shape platform adoptions; the constellation
plan already collapsed muster's substrate work upward into glass-ui AQ. What remains is genuinely
muster-local and genuinely bounded: measure honestly, close CLS, confirm the suite, refute the
inapplicable, route the one live lever upstream. **If the user judges the J named-verdict acceptable
as-is (noise is a known, documented residual) and CLS-at-0.073 tolerable, K may not warrant opening at
all** — the modern-web arc is closed; K is its measurement-honesty coda, not a new frontier. That
judgment is the user's; this audit's recommendation is that K is worth opening ONLY for the CLS close +
the clean-host measurement (the two items the noise framing does not legitimately cover), with
everything else a refute-or-name-forward record.
