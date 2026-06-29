# A6 — cross-cutting constellation synthesis (tranche-DEVELOPMENT audit)

The constellation-level synthesis for the next execution round. This is the cross-cutting slice: it
recaps the multi-session prompt arc, aggregates the single cross-repo deferred ledger, defines the
canonical 6-wave modern-web spine the next-tranche set maps onto, and frames the GOAL. PLANNING ONLY —
no src/ code, no commits, no publishes. Read-only on every repo except this file.

Repos in scope (verified on disk under `/Users/mkbabb/Programming/`): `value.js`, `keyframes.js`,
`glass-ui`, `fourier-analysis`, `speedtest`, `muster`, `words`, `bbnf-lang`.

---

## 1. The prompt arc — recap + close-verification

The multi-session effort ran a five-prompt arc. Each is verified addressed against the on-disk record;
open threads flagged.

| # | Prompt | Evidence it was addressed | Open thread |
|---|---|---|---|
| 1 | Triage + fix the AP/I adversarial-verification findings + re-verify | AP tranche CLOSED (`git log`: `21547de docs(tranche-AP): W5 close — π/ι/overfitting clean, full gate matrix green, FINAL + 3.0.0 fold`); the false-witness coda (`bb4e79b`) re-verified the consumer scan 212→0 | **Closed.** AP folded into 3.0.0. |
| 2 | 6-agent modern-web analysis (Chrome guidance + a real Lighthouse run) → expand the tranche set → glass-ui AQ + muster J | `AQ/audit/W0-modern-web-baseline.md` (49 findings, the 6-agent workflow, real Lighthouse on muster); muster `J/audit/W0-modern-web-baseline.md` | **Closed.** AQ + J authored, executed, closed. |
| 3 | De-dup speedtest+fourier tranches + reconcile parallel/serial ordering → the constellation MODERN-WEB-EXECUTION-PLAN | `docs/constellation/MODERN-WEB-EXECUTION-PLAN.md` — the de-dup verdict (fourier I ~65% IS AQ; speedtest AS-§3 GU = AQ; muster 5 substrate-adoptions collapse), the DAG, the 3-gate schedule | **Closed.** |
| 4 | Execute ALL repos' tranches incl. npm publishes + git pushes → keyframes 2.2.0 + glass-ui 3.0.0/3.1.0, consumers adopted+pushed, muster remote created, MODERN-WEB-CLOSE | `MODERN-WEB-CLOSE.md` — 3 gates live on npm; `package.json` confirms glass-ui@3.1.0, keyframes@2.2.0; muster remote `github.com/mkbabb/muster` created+pushed; every repo pushed | **Mostly closed — caveats below.** The publishes were done LOCALLY (CI release path broken). Measured AFTER numbers (muster 107-spec Playwright, clean-machine Lighthouse, fourier e2e/axe) booked honestly as CI-gated, NOT claimed green. |
| 5 | [current] tranche-DEVELOPMENT directive | This audit + the sibling A-slices under `next/audit/` | In progress. |

**Open threads carried out of the arc (the substance of §2):**
- The publishes shipped but the **release CI is broken** — so the npm path is human-driven, not
  reproducible. This is the #1 chronic item.
- The **measured AFTER confirmations** for muster + fourier are deferred to a clean-machine CI run that
  has not happened (structural wins witnessed; timing numbers honestly unbooked).
- The **speedtest AS design wave (AS-1..17)** + the **AS-GU glass-ui-request bundle** are explicitly
  Gate-2 / future-design-wave, NOT executed.
- The **standalone-`DockIconButton` coarse floor** glass-ui gap was flagged-not-fixed in AQ.W8.
- The constellation has **no unified deploy story** — several babb.dev surfaces are manual or held.

---

## 2. THE CROSS-REPO DEFERRED + CHRONICALLY-DEFERRED LEDGER (single source of truth)

Aggregated from `MODERN-WEB-CLOSE.md §6`, `AQ/FINAL.md §open-gap`, `AQ/PROGRESS.md §named-forward`,
speedtest `AS/STATUS.md §HELD` + `R-CONSUME-CLOSE.md §5 (DDR-AS-RC-1..5)`, muster `J/FINAL.md
§remaining-CI-gated`, and the CI/deploy workflow inspection below. Tagged by class and owner.

### 2.A — CI / publish breakage (BLOCKS deploys; the #1 chronic item, "the #177 class")

| ID | Item | Root cause (verified on disk) | Owner |
|---|---|---|---|
| **L-CI-1** | glass-ui `release.yml` cannot publish on a tag | `release.yml:26` pins `node-version: 20`; `package.json:531` declares `engines: node >=22`. The release gate aborts on the engines mismatch. (keyframes `release.yml:23` already uses node 24 — glass-ui lags.) | glass-ui |
| **L-CI-2** | glass-ui `ci.yml` runs on node 20 too | `ci.yml:30` `node-version: 20` vs `engines >=22` — the PR gate matrix runs on an unsupported node; a node-22-only API would pass CI yet fail at publish/consume | glass-ui |
| **L-CI-3** | `npm ci` registry-install cannot replicate the symlinked `@mkbabb` monorepo dev setup | The local dev env symlinks `@mkbabb/keyframes.js` + `@mkbabb/value.js`; CI's `npm ci` resolves them from the registry. When an upstream minor is unpublished-but-needed, CI's registry view diverges from local → tag-release red even when local is green. This is why all 3 gate publishes (kf 2.2.0, gu 3.0.0/3.1.0) were done **locally** (`MODERN-WEB-CLOSE.md §1 publish-path note`) | glass-ui + keyframes (shared pattern) |
| **L-CI-4** | The same node-pin + symlink divergence affects keyframes/value release paths | keyframes `node.js.yml` + `release.yml`; value.js `node.js.yml` + `ci.yml` — the monorepo-symlink-vs-registry split is constellation-wide for every `@mkbabb` publisher | keyframes, value.js |

**Synthesis:** "#177 (npm-publish CI breakage, blocks deploys too)" decomposes to L-CI-1..4. The fix is not
a one-liner node bump — it is an **architectural reconciliation of the dev-symlink ↔ CI-registry split**.
The contract-v2 precept (`docs/precepts/cross-repo-dev-resolution.md`) already mandates every consumer
resolves the built `dist/` in dev and prod; CI must mirror that. Candidate: a release path that
`npm pack`s the upstream `@mkbabb` siblings into the runner (or uses a workspace-aware lockfile), so the
runner's view IS the local view. This belongs in a **keyframes/value/glass-ui shared `M-CI` wave**.

### 2.B — DEPLOY gaps (the babb.dev constellation is not uniformly shipped)

| ID | Surface | State (verified) | Gap |
|---|---|---|---|
| **D-1** | `fourier.babb.dev` SPA | `deploy-pages.yml` is well-built — `workflow_run`-gated on a GREEN same-SHA CI run (inv-28), Cloudflare Pages, secret-disciplined. **But** the CI it gates on includes a Dockerized e2e that `MODERN-WEB-CLOSE.md §6` calls "Docker-flaky" → a flaky CI red blocks the deploy | CI e2e flakiness, not deploy wiring |
| **D-2** | fourier API | auto-deploy via `deploy.babb.dev/hooks/fourier-analysis` → `scripts/deploy-hook.sh` (separate from the SPA) | works; coupled to the hook host |
| **D-3** | keyframes.js / value.js gh-pages demos | CI-gated; same node-pin + symlink CI fragility as 2.A blocks the demo deploy | inherits L-CI-3/4 |
| **D-4** | `grammar.babb.dev` (bbnf-lang) | SSH-rsync MANUAL — no automated deploy-of-record | no CI deploy path |
| **D-5** | speedtest / words on `friday.institute` | HELD behind the user gate `G-AP-D-DEPLOY` (SUM-1 production freeze); speedtest master is ~550 commits ahead of the deployed `origin` | user-domain freeze |
| **D-6** | `muster` | remote created + pushed, but **no deploy target** — muster has no babb.dev host assigned | no deploy story |

**Synthesis:** the constellation has FOUR different deploy mechanisms (Cloudflare-Pages-via-workflow_run,
deploy-hook host, gh-pages, manual SSH-rsync) and one frozen target. There is no single
deploy-of-record precept that all surfaces satisfy. fourier's `deploy-pages.yml` (green-CI-gated,
inv-28) is the **reference pattern** the others should converge to. grammar.babb.dev (D-4) is the
clearest gap — manual rsync with no green-gate.

### 2.C — Library / substrate deferred (glass-ui + keyframes/value)

| ID | Item | Source | Gate |
|---|---|---|---|
| **S-1** | glass-ui dock `view-transition-name` bug | flagged in the prompt as "the glass-ui dock view-transition-name bug". On disk: `GlassDock.vue:183`, `DockLayerGroup.vue:73`, `useLayerTransition.ts` assign per-instance VT names sanitized via `.replace(/[^a-zA-Z0-9_-]/g,"-")`. The risk class: **two dock instances on one page can collide** if `dockId`/`vtId` are not page-unique, OR a name that starts with a digit/leading-hyphen after sanitization is an invalid `view-transition-name` ident → the VT silently no-ops (the binding-verification class: vue-tsc + units pass, runtime VT breaks). Needs a real two-dock + numeric-id e2e to confirm + a uniqueness/ident-validity guarantee | glass-ui follow-up |
| **S-2** | Standalone-`DockIconButton` coarse 44px floor | `AQ/FINAL.md §open-gap`; speedtest `DDR-AS-RC-3`. The W3 `(pointer: coarse)` floor is scoped to `.glass-dock[data-density]` (`dock.css:1079`); a free-standing `DockIconButton` (speedtest Settings-gear) falls between scopes. ≥2-consumer-gated | glass-ui follow-up |
| **S-3** | The AS-GU glass-ui-request bundle | speedtest `DDR-AS-RC-2`: `deriveAurora()`/OKLab-LUT aurora, whisper-heading rung, `--spring-crisp`, GlassDock dark-rung + overflow scoping, AnimatedDigit/MetricBadge/ContinuousTimeline polish, `<CompletionSeal>`/celebration easing, the View-Transitions route re-founding. A FUTURE glass-ui **design** wave (correctly NOT hand-rolled in speedtest). Carries the value.js VAL-1 (OKLab aurora-LUT) + VAL-9 (`springLinearStops→linear()`) + keyframes KF-3 foundational sub-edges | glass-ui design wave (≥2-consumer) |
| **S-4** | Baseline-Limited pilots stay demo-gated | `AQ/FINAL.md §successor`: `GlassDialogNative`, `HoverPopover :native` `interestfor` opt-in, `GlassNativeSelect` (not built). Graduate to default when Baseline Widely Available | watched condition |

### 2.D — Consumer-side deferred (speedtest + muster + fourier)

| ID | Item | Source |
|---|---|---|
| **C-1** | speedtest AS design wave (AS-1..17) | `DDR-AS-RC-1` — Gate-2, needs a separate implementation-go. Consume-complete, design-wave open; no `as-close` tag |
| **C-2** | speedtest `_headers`/CSP re-measure + `'unsafe-inline'` drop | `DDR-AS-RC-5` — gated on a header-emitting host deploy (couples to D-5) |
| **C-3** | speedtest maplibre tile `fetchpriority` | `DDR-AS-RC-4` — upstream-blocked (maplibre-gl 5.24); carry |
| **C-4** | muster 107-spec Playwright + clean-machine Lighthouse | `J/FINAL.md` — CI-gated confirmations, not a successor wave (couples to L-CI + D) |
| **C-5** | fourier e2e/axe AFTER + the δ/ε route-morph + floating-TOC arms | `MODERN-WEB-CLOSE.md §2` (δ/ε were AQ-gated, now unblocked); e2e needs the Python backend |
| **C-6** | speedtest origin sync (~550 commits) | `AS/STATUS.md §standing user gates` — co-gated with D-5 |

### 2.E — Standing user-domain / chronic (recorded, not agent-actionable)

| ID | Item | Source |
|---|---|---|
| **U-1** | `precepts` submodule | the single held item across BOTH `MODERN-WEB-CLOSE.md` + the EXECUTION-PLAN |
| **U-2** | `G-AP-D-DEPLOY` SUM-1 production freeze | speedtest standing user gate (couples D-5/C-6) |
| **U-3** | `G-AP-D-CRED-CONSOLIDATE` orphan cred-memory files | speedtest CHRONIC; user yes/no |
| **U-4** | muster passkeys | `J/FINAL.md` — explicitly deferred (no account model; adopting WebAuthn would invert the anonymous slug-session model = overfit substrate). Documented contingency, not dropped |

---

## 3. THE CANONICAL 6-WAVE MODERN-WEB SPINE (the shared backbone)

The guidance corpus (`/tmp/modern-web-guidance-src/guides`) has 7 macro-skill categories — `performance`,
`css`, `forms`, `accessibility`, `security`, `user-experience` — plus three *frontier* categories the
constellation has NOT yet touched: `built-in-ai`, `passkeys`, `webmcp`. The AQ/J pass already implicitly
ran a 6-wave shape; this section **canonicalizes** it so every repo's n+1 tranche maps its work onto the
SAME spine. Each wave below cites the grounding guide(s) and the canonical leverage.

| Wave | Theme | Canonical levers (grounded in the corpus) | Owner tier |
|---|---|---|---|
| **W1 — Perf / INP / scheduler** | main-thread responsiveness | `scheduler.yield()` + `setTimeout` fallback (break-up-long-tasks); `scheduler.postTask` priority (schedule-tasks-by-priority); debounce/throttle scroll/resize/input; separate UI updates from heavy compute; no layout thrashing (interleaved read/write) | substrate (`useYieldToMain` shipped in AQ.W3) + every consumer applies |
| **W2 — CWV / LCP / content-visibility** | load + render perf | LCP element in raw HTML (not JS-mounted) + `fetchpriority="high"`; inline critical CSS; `async`/`defer` non-critical JS; `content-visibility: auto` + `contain-intrinsic-size` off-screen; `<picture>` AVIF/WebP + width/height + `loading="lazy"` below-fold; `srcset`/`sizes` | substrate (`.deferred-section` shipped in AQ.W3) + consumer SSR/critical-CSS |
| **W3 — Forms / a11y** | input + accessibility vocabulary | `:user-invalid`/`:user-valid` + `aria-invalid` bridge (validate-input-after-interaction); `field-sizing: content`; `autocomplete`/`inputmode`/`enterkeyhint`; `accent-color`; required-field-feedback; accessible-error-announcement; touch-target 44px floor | substrate (`useUserInvalidAria`, `field-sizing`, coarse-floor shipped in AQ.W4/W3) + consumer forms |
| **W4 — CSS platform** | platform-native CSS | `color-scheme` + `light-dark()` + `color-mix()`; `:has()` parent-state; individual-transform longhands + identity base; `text-wrap: balance/pretty`; tokenized scrollbars; **container queries** (`@container size()` + `cqi`) + **container STYLE queries** (`@container style()`); **anchor positioning** | substrate (most shipped in AQ.W2/W3; container-query density is AQ.W7's **progressive-only** rung, room to extend) |
| **W5 — Motion / View-Transitions / Speculation-Rules** | navigation + motion | scroll-driven CSS (`animation-timeline: scroll()/view()`); `@starting-style` + `transition-behavior: allow-discrete` + `overlay` top-layer; `useViewTransition`/`startViewTransition` (same-doc + cross-doc); **Speculation Rules** (prefetch/prerender, `eagerness`) — UNTOUCHED across the constellation | substrate (scroll-driven, `@starting-style`, `useViewTransition` shipped in AQ.W5/W6) + **Speculation Rules is a net-new consumer lever** for any MPA surface |
| **W6 — Security / PWA / offline** | hardening + resilience | CSP (report-only → enforce) + Trusted Types; COOP/CORP/cross-origin-isolation; Fetch-Metadata; HSTS/X-Content-Type-Options/Referrer-Policy/Permissions-Policy; secure cookies (`__Host-`); Service Worker (CacheFirst static / NetworkFirst HTML) + PWA manifest | consumer-local (server stacks differ — Hono vs FastAPI vs Cloudflare; NOT a glass-ui substrate) |

**How the spine maps the deferred ledger:** L-CI/D items are infrastructure that sits UNDER the spine
(they gate W6's deploy + every measured-AFTER). S-1 (dock VT) is W5. S-2 (coarse floor) is W3. S-3
(AS-GU) is a glass-ui DESIGN wave orthogonal to the spine but carrying W5 (View-Transitions re-founding)
+ W4 (aurora/color) sub-edges. C-1 (AS design) is design. C-2 (CSP) is W6. The **untouched frontier**:
W5 Speculation-Rules (no consumer adopted it), W6 PWA (only speedtest has a manifest; words has a SW;
no constellation-wide story), and the entire `built-in-ai` / `passkeys` / `webmcp` corpus (deliberately
not on the spine yet — overfit-without-consumer until a real use case surfaces; muster passkeys is the
named contingency U-4).

---

## 4. THE GOAL FRAMING — what the next execution round must achieve

Three pillars, in dependency order. The round is NOT "more modern-web features" — the substrate is
already platform-native (AQ closed that). The round is **make the constellation reproducible,
deployed, and measured.**

1. **Fully working CI** (unblocks everything else). Resolve L-CI-1..4: bump every `@mkbabb` publisher's
   CI + release node to satisfy `engines >=22`; reconcile the dev-symlink ↔ CI-registry split so a tag
   release is reproducible on a clean runner (the `npm pack`-the-siblings or workspace-lockfile
   approach). Success = a pushed tag publishes green, no local-only publish. This is a **shared
   `M-CI` wave across keyframes/value/glass-ui**.

2. **Fully deployed babb.dev constellation** (depends on 1). Converge all surfaces to ONE
   green-CI-gated deploy-of-record precept (fourier's `deploy-pages.yml` inv-28 pattern is the
   reference): D-4 grammar.babb.dev gets an automated path (retire the manual SSH-rsync); D-6 muster
   gets a deploy target; D-1 fourier's Docker-flaky e2e is stabilized so the gate stops false-blocking;
   D-3 keyframes/value demos ship once L-CI clears; D-5/C-6 speedtest+words to friday.institute on the
   user's `G-AP-D-DEPLOY` GO. Success = every public surface has an automated, green-gated, secret-safe
   deploy-of-record.

3. **Perfected libraries** (parallel to 1+2). Close the flagged substrate gaps with ≥2-consumer
   discipline: S-1 dock VT-name uniqueness/ident-validity (with the two-dock e2e — a
   binding-verification-class fix); S-2 standalone-`DockIconButton` coarse floor (now ≥2 sites? confirm);
   S-3 the AS-GU design wave (a glass-ui design tranche, value.js VAL-1/9 + keyframes KF-3 sub-edges);
   plus the measured-AFTER confirmations C-4/C-5 that turn the structural wins into booked numbers.

**The critical path:** `M-CI (CI repair) → deploy-of-record convergence → measured-AFTER confirmations`.
The libraries pillar (S-1..S-3) parallelizes off it. Everything the previous round shipped is
structurally landed; this round makes it **provable and live**.

---

## 5. n+1 TRANCHE SKETCH (binding question + wave outline)

**Tranche-letter note:** glass-ui's next free letter after AQ is **AR** (AR exists in speedtest, not
glass-ui; glass-ui's last is AQ). The cross-repo CI/deploy work is constellation-scoped, not a single
repo's tranche — it wants a **constellation muster `M-CI`/`M-DEPLOY` pair** plus per-repo riders. This
audit sketches the glass-ui-rooted slice + the constellation spine; sibling A-slices cover the
per-repo detail.

### § Binding question (the constellation n+1)

*Can the `@mkbabb` constellation become reproducibly-published, uniformly-deployed, and measurably-green
— resolving the dev-symlink↔CI-registry release split so every tag publishes on a clean runner (no
local-only publish), converging every babb.dev surface to ONE green-CI-gated deploy-of-record (retiring
the manual grammar.babb.dev rsync + assigning muster a target), and turning the AQ/J structural wins
into booked measured-AFTER numbers — while closing the three flagged glass-ui substrate gaps (dock
VT-name validity S-1, standalone coarse-floor S-2, the AS-GU design wave S-3) under the ≥2-consumer bar,
all without legacy code, all token-first, every Newly/Limited feature feature-detected?*

### § Wave outline (constellation spine + glass-ui riders)

| Wave | Theme | Contents | Gate |
|---|---|---|---|
| **W0** | DEV — this audit set | the A-slice audits under `next/audit/`; the deferred ledger (§2); the canonical 6-wave spine (§3) | audits cohere; ledger is the single source of truth |
| **W1 (M-CI)** | Reproducible publish | node-pin bump (20→22+) in every `@mkbabb` CI + release workflow; reconcile the symlink↔registry split (pack-the-siblings or workspace lockfile); a tag-release dry-run that publishes green on a clean runner | a pushed tag publishes with NO local-only step; `release.yml` engines-consistent |
| **W2 (M-DEPLOY)** | Uniform deploy-of-record | converge to fourier's inv-28 green-CI-gated pattern: automate grammar.babb.dev (retire SSH-rsync); assign muster a target; stabilize fourier's Docker-flaky e2e; ship kf/value demos post-W1 | every surface has an automated green-gated secret-safe deploy; 0 manual rsync paths |
| **W3 (measure)** | Booked AFTER | clean-machine Lighthouse (muster + fourier); muster 107-spec Playwright; fourier e2e/axe; speedtest `_headers`/CSP re-measure (post-deploy) | the structural wins (eager-JS −45KB, LCP-in-raw-HTML, axe 24/0) carry booked numbers, not "CI-gated" placeholders |
| **W4 (glass-ui S-1)** | Dock VT-name correctness | guarantee `view-transition-name` page-uniqueness + ident-validity (no digit/leading-hyphen-start no-op); the two-dock + numeric-id e2e (binding-verification class) | two docks on one page transition independently; numeric `dockId` does not silently no-op the VT |
| **W5 (glass-ui S-2)** | Standalone coarse floor | the `(pointer: coarse)` 44px floor on a free-standing `DockIconButton` / `Button size=icon` independent of dock context — IF ≥2 consumer sites confirm (speedtest + one more); else stays flagged | ≥2 sites OR remains demo-gated; axe touch-target |
| **W6 (glass-ui S-3)** | AS-GU design wave | `deriveAurora`/OKLab-LUT (value.js VAL-1), `--spring-crisp` + `linear()` easing (value.js VAL-9 + keyframes KF-3), whisper-heading rung, GlassDock dark-rung, `<CompletionSeal>`, the View-Transitions route re-founding — ≥2-consumer-gated each | overfitting audit clean; speedtest + ≥1 adopt; foundational value.js/keyframes sub-edges published first |
| **W7** | Frontier-scan (watched) | Speculation-Rules (any MPA consumer?); PWA/offline constellation story (words SW + speedtest manifest → a shared pattern?); built-in-ai/passkeys/webmcp stay UNbuilt (no consumer = overfit) | named-forward only; nothing ships without ≥2 consumers |
| **W8** | Close | overfitting audit; full gate matrix green ON CI (the W1 repair makes this meaningful); FINAL + version folds | every gate green on a clean runner; FINAL authored |

**Ordering rationale:** W1 (CI) is the foundation — until a tag publishes green, every downstream
"green" is local-only and unprovable. W2 (deploy) depends on W1 (the demos + SPA gate on a green CI
publish). W3 (measure) depends on W2 (you measure the deployed surface). W4-W6 (glass-ui substrate)
parallelize off the spine — each is ≥2-consumer-gated, each keeps the current path as the
feature-detected fallback (S-1/S-3 carry View-Transitions, a Newly/Limited reach). W7 is a watched scan,
NOT authored work — the frontier categories stay unbuilt until a real consumer surfaces (the
substrate-without-consumer binary).

---

*The previous round made the constellation platform-native and shipped it locally. This round makes it
reproducible (CI), live (deploy), and proven (measured) — then closes the three flagged glass-ui
substrate gaps under the ≥2-consumer bar. The deferred ledger (§2) is the single source of truth; the
6-wave spine (§3) is the shared backbone every repo's n+1 tranche maps onto.*
