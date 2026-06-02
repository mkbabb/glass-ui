# A4 — speedtest slice audit (constellation/next)

**Slice**: speedtest — Vue SPA + admin chrome + Cloudflare edge (`speedtest.friday.institute`, friday.institute engagement).
**Date**: 2026-06-02. **Posture**: TRANCHE-DEVELOPMENT / planning-only. Read-only on every repo; this is the one assigned write.
**Constellation @ audit**: speedtest master `ccebf677` (AS R-CONSUME CLOSED) · glass-ui **3.1.0** published+consumed · keyframes.js **2.2.0** consumed · value.js 0.10.0. The constellation modern-web arc closed (`glass-ui/docs/constellation/MODERN-WEB-CLOSE.md`): value.js→keyframes→glass-ui→consumers, three publish gates live.
**Sources read in full**: AS (`AS.md`, `R-CONSUME-CLOSE.md`, `STATUS.md`, `DESIGN-INTAKE.md`) · AR (`AR.md`, `STATUS.md`, `CONSTELLATION.md`, `R-CONSUME-READINESS.md`, `R0-DECISIONS.md`) · AQ FINAL · AR-SEED · MANDATES (SUM-1) · constellation MODERN-WEB-CLOSE · modern-web guides (faster-spa-view-transitions, dark-mode, defer-rendering-heavy-content + the perf/ux/forms index).

---

## §1 State of the slice — what is closed vs. what is open

AS is a **split tranche**: the **R-CONSUME strand CLOSED** (security/SEO/PWA edge-hardening + the AR R0G consume + AQ-substrate adoptions, landed against published glass-ui 3.1.0 / keyframes 2.2.0, `origin`-synced), but the **AS design wave (AS-1..17) remains at Gate-1 ratification** — no `as-close` tag, no `ar-close` tag. This is the defining fact for the next tranche: **speedtest carries a fully-ratified, fully-grounded, never-implemented design wave.** AS.md §§1–10 is one of the most thoroughly-hardened plans in the corpus (6-lane W0 + 6-lane W1 + 6-lane W-RATCHET + 6-lane W2 modern-web + 6-lane W3 libs; six candidate findings dissolved under grounding; ten DDR reversals/amendments stamped) — and none of it has touched `src/`.

**The R-CONSUME close was a net DELETION** of in-repo substrate (5 hand-rolled idle gates → `useIdleReady`; `.z-toast !important` → Toaster `position`; the `-webkit-text-security` Firefox-plaintext shim → real `<form>`/`type=password`; the value.js co-location workaround → keyframes' `loadAnimationEngine()` lazy boundary, eager keyframes **130KB→33KB**; the redundant coarse-floor one-liner → glass-ui `[data-size=icon]`). Overfitting audit CLEAN. This is exactly the constellation thesis: *consumers adopt rather than re-build.*

**The headline the slice is sitting on**: AS-MW-VT — re-found the whole completion + route choreography on `document.startViewTransition()`. The constellation already published the substrate (`useViewTransition`/`startViewTransition` in glass-ui 3.1.0, consumed by muster + fourier per MODERN-WEB-CLOSE §3). Speedtest grep confirms **zero** `startViewTransition`/`view-transition` adoption in `src/`. The raw browser-API route adoption can ship in the design wave *now* (it needs no further publish); only the `morphViewTransition`/`viewTransition` ergonomic helper is publish-gated on a future glass-ui design wave. This is the single largest piece of un-banked leverage in the slice.

---

## §2 HEADLINE FINDINGS

1. **AS design wave (AS-1..17) is the dominant open carry** — Gate-1-ratified, Gate-2-deferred (DDR-AS-RC-1). It is not a backlog of fix-ups; it is a complete two-gestalt-move plan (M1 completion choreography rework = net-negative LOC deleting a composable + ~90 lines eviction CSS; M2 aurora generalization at the glass-ui root). Re-validated by AS.md §8 W-RATCHET (H1–H10 corrections folded). **This is the whole reason a next tranche (AT) exists.**

2. **View-Transitions re-founding (AS-MW-VT) is partially-unblocked and un-banked.** Substrate published (glass-ui 3.1.0); muster/fourier consumed it; speedtest did not. The raw `startViewTransition` route adoption ships now; it *dissolves* AS §6 open-decision #1 (whole-dial-spin becomes a declarative `view-transition-name`), *retires* the §8-H7 CLS-spike risk (snapshots in the top layer cannot introduce CLS), and *closes* §8-H6b (the guidance mandates focus-routing on `transition.finished` = the aria-live result announcement). The CLS 0.33 is **0.317 on one node** (`main.instrument-dial`) — the exact element `mode="out-in"` unmounts. VT is the correct mechanism, not a Vue `<Transition>` (which still mounts/unmounts → still reflows).

3. **The AS-GU bundle is correctly NOT hand-rolled in speedtest** (DDR-AS-RC-2) — it is library-root work for a *future glass-ui design wave*: `deriveAurora(palette,intent)` + value.js OKLab-LUT bake (VAL-1/2), whisper-heading rung (X1), `--spring-crisp` ζ≈0.80 token (corrected from the dead-flat ζ=0.92), GlassDock dark `--glass-opacity-dock` rung, `AnimatedDigit` fade-up, `MetricBadge icon` prop, `<CompletionSeal>`/`<GoldHeadline>`/`<CheckDraw>`, the `morphViewTransition`/`viewTransition` helpers. Hand-rolling these is the precise anti-gestalt the constellation just spent five tranches deleting. **AT cannot fully land the design wave until that glass-ui wave exists** — but most of the *visible* user wins (the §2 in-repo fixes + the raw-VT adoption) ship against 3.1.0 today.

4. **`test:smoke:charts` is structurally green but operationally blocked** — the preview-smoke config pins `charts-smoke.spec.ts`, which exists at HEAD but is `D` (deleted) in the working tree by unrelated 163-entry churn the close was forbidden to touch. Verified structurally (spec intact in version control; chart-mount path unchanged). **Carry: the gate cannot actually run until the working-tree churn is resolved or the spec restored.** This is a real, standing edge-gate gap, not a one-off.

5. **Two modern-web keystones never landed and are not in the closed scope**: `color-scheme: light dark` root + meta (css-1 — the dark-FOUC keystone; grep confirms absent from `src/styles/` + `index.html`) and the View-Transitions adoption (above). Both are in AS.md §9 but were scope-cut from the R-CONSUME close (which took only sec/SEO/INP/a11y). Dark mode is the *reference modality* per the user — the FOUC keystone is high-leverage and cheap.

---

## §3 DEFERRED + CHRONICALLY-DEFERRED LEDGER (delineated in full)

### A — The AS design wave (Gate-1-ratified, Gate-2-deferred; DDR-AS-RC-1)
The 17 live-walk directives + W0/W1/W2 refinements, grouped as AS.md §2 plans (R0..R3):
- **AS-1** survey pill-cluster top-anchor · **AS-2/3** compact label-less pills (drop `label-position`, −18px/pill; icon-only = GU `MetricBadge icon`) · **AS-4** survey progress-bar clip (consumer `--radius-dock` stopgap; GU `always-expanded` overflow-scope root) · **AS-5** translucent dock glass (consumer chassis-surface stopgap; GU dark `--glass-opacity-dock ~0.50` rung).
- **AS-6** aurora pastel+whispy at the ROOT (REVERSAL AN-D10; consumer stopgap: pastel palette + cream apex + bias-compress + saturation 0.85→~0.62 + warp↑ + **softmaxBeta DOWN ~2.6–3.0**, NOT up — §8-H4; root = `deriveAurora` + OKLab LUT).
- **AS-7** survey/cross-flow transitions too springy/long → `--spring-crisp` ζ≈0.80 + 24px travel + 0° rotate (REVERSAL W12-ι in-journey only).
- **AS-8/10/16/X3** preflight engine phase + Start/Next `data-tier="primary"` (the startup-feedback gap; arm the dial during `createSession`).
- **AS-9** per-ring IN→OUT pulse at every phase boundary + idle-on-STOP `createRingPulse` envelope (3 triggers).
- **AS-11** number fade-up easing (REGRESSION; GU `AnimatedDigit`; amends DESIGN.md:15).
- **AS-12** complete-logo blur→gold shimmer (aura 0.85→~0.45 + `gold-shimmer-slide` one-shot; GU `<CompletionSeal>`).
- **AS-13** current-phase bar inset up ~6% (amends AN-D12).
- **AS-14** off-centre check glyph (moot via AS-15 marker-retire; else GU check-centring).
- **AS-15** overall bar → 1–2px hairline card-border + marker retire (REVERSAL AN-D2 overall-bar-only; §8-H8 RISK: NOT literal `border-bottom` — chassis owns two bottom strokes; dot-retire needs the GU marker-opt-out prop or an explicit precept-6 halt).
- **AS-17 — the headline** completion choreography: delete `ElementMorph` spine + ~90 lines eviction CSS; meter-spin → horizontal pane-slide; `playStartup()`; restart pane-slide-back + full reset (REVERSAL AN-D4 visual; **superseded mechanism by AS-MW-VT**). §8-H7: highest-risk lane — keep the out-of-flow pinning, extend CLS harness to the full idle→running→complete→retake cycle, rebuild the morph-coupled witness.
- **W0 carries**: X1 heading-weight (`font-medium` stopgap *verified to work* via Tailwind v4 utilities-layer ordering; GU whisper rung is the structural root) · X5 result-bridge `?? 0` → `—` null-honesty · X6 tapered divider · easter-eggs B0–B7 · AS-B1 mid-session DB-loss degrade-to-ephemeral robustness (env, not app bug).

### B — DDR ledger (DDR-AS-RC-1..5; routed to owners, not dropped)
- **DDR-AS-RC-1** — AS design wave (above) is Gate-2. RE-OPEN ON: the Gate-2 implementation-go.
- **DDR-AS-RC-2** — the **AS-GU glass-ui-request bundle** → a FUTURE glass-ui design wave (the §3 ranked bundle: deriveAurora/OKLab-LUT, whisper rung, `--spring-crisp`, GlassDock dark rung, AnimatedDigit, MetricBadge icon, CompletionSeal, VT route helpers). NOT hand-rolled. RE-OPEN ON: a glass-ui design tranche authoring §3; speedtest consumes via the R-CONSUME pattern.
- **DDR-AS-RC-3** — the **standalone Settings-gear `DockIconButton` coarse floor** (outside `.glass-dock`): glass-ui's floor is `[data-size=icon]`-scoped on `Button` + `.glass-dock`-scoped for dock controls; a free-standing `DockIconButton` falls between both. A real glass-ui gap, handed to glass-ui (NOT a speedtest one-liner). Echoed in MODERN-WEB-CLOSE §6. RE-OPEN ON: glass-ui authors the `DockIconButton`-primitive coarse floor.
- **DDR-AS-RC-4** — maplibre tile **`fetchpriority="low"` upstream-blocked** (maplibre-gl 5.24 exposes no fetch-priority option; the `preconnect`/`dns-prefetch` half landed). A request-interception monkeypatch is rejected per NO-workarounds. RE-OPEN ON: a maplibre-gl release exposing tile fetch-priority.
- **DDR-AS-RC-5** — **`_headers`/CSP re-measure on a header-emitting host** + the CSP `'unsafe-inline'` drop (report-only soak). Authored in `public/_headers` (HSTS/COOP/Permissions-Policy/X-Frame-Options) but unwitnessable under `vite preview` (strips Cloudflare `_headers`). The `__Host-` cookie (sec-6) is undone **by design** — the admin model is a `sessionStorage` bearer token over `Authorization`; no `Set-Cookie` site to harden. RE-OPEN ON: the next SUM-1 deploy GO.

### C — AR-close measured-AFTER carries (the witness debt)
These are the runtime re-measures that re-confirm the published-substrate wins; the *structural* relief landed (eager keyframes 130KB→33KB), the *throttled-edge numbers* are owed:
- **AR-W2 real-edge re-witness**: mobile CLS **< 0.05** (R0G-2 InstrumentChassis reserve, vs 0.3277/0.3768 before) · **idle-fps A/B** (R0G-1 aurora demand-park, reduced-motion-delta NOT Lighthouse-TBT) · **keyframes-out-of-entry sourcemap** verification.
- **AR-P3 admin-TBT AFTER** (authenticated harness; the 5.4s admin bootstrap, structurally relieved by keyframes-off-eager — AFTER number owed).
- These fold into the AS design-wave W-RATCHET (where the real dark edge is driven). **`ar-close` tag rides this re-witness.**

### D — Standing user gates (HELD with no recommendation — NOT chronics)
- **SUM-1 / G-AP-D-DEPLOY** — production deploy freeze (FROZEN since AB 2026-05-13 per MANDATES; re-affirmed AC→AS). Co-gates the constellation push (master far ahead of `origin`, ~550 commits). Surface as a first-class GO; orchestrator holds NO RECOMMENDATION. The header items (DDR-AS-RC-5) are authorable-now, effect-on-GO.
- **G-AP-D-CRED-CONSOLIDATE** — CHRONIC (AP→AQ→AR→AS, 4-tranche): three orphan cred-memory files (`api_tokens_reference.md`, `google_api_keys.md`, `project_timeline.md`). Terminal user yes/no (keep separate / consolidate / discard); touches credential refs → never moved unprompted.

### E — Process / hygiene carries
- **`test:smoke:charts` deleted-spec churn** (§2.4) — the build-only edge-gate cannot run until the working-tree churn resolves; restore-or-resolve carry.
- **D15 worktree prune** — ~39 locked `.claude/worktrees/agent-*` (salvage-gated `close-prune.sh`), deferred since AQ.
- **vitest load-flake** (CHRONIC 4-tranche: `upload.test.ts` / `App.surveyEntry` / `DashboardMap.keyboard` — pass isolated, intermittently fail under full-parallel; watch, not a defect).
- **Vue 3.5.x patch bump** (optional; 3.6 unreleased) · npm audit dev-only (accept, no `--force`).

---

## §4 MODERN-WEB LEVERAGE GAPS

Cross-referenced against `/tmp/modern-web-guidance-src/guides`. Baseline policy applied (Widely→native; Newly→feature-detected fallback ≤20 LOC; Limited→progressive behind detection). Authored in AS.md §9 but **scope-cut from the R-CONSUME close**; these are the genuine un-banked leverage for AT:

- **VT route + completion re-founding** (`faster-spa-view-transitions` + `same-document-transitions`; View Transitions Baseline Newly 2025-10-14, Chrome 111/FF 144/Safari 18) — **HIGHEST leverage, partially-unblocked.** Substrate published (glass-ui 3.1.0); speedtest unadopted. `startViewTransition` makes the leaving pane's reflow structurally impossible → kills the CLS-0.317-on-`main.instrument-dial`. Also relevant: the guide's `content-visibility: hidden` view-caching for the 3-pane meter↔complete↔survey set (small predictable view count — exactly the guide's "DO" case, no eviction strategy needed).
- **`color-scheme: light dark` + `<meta>`** (`dark-mode`; Baseline Widely) — **the dark-FOUC keystone, confirmed absent.** Dark is the reference modality. Themes native scrollbars/form controls/canvas background; the guide marks the meta MANDATORY for FOUC. Cheap (≤10 LOC). Pairs with `scrollbar-color`/`scrollbar-gutter:stable` (css-2), `accent-color` on Checkbox/Radio, and the inline-script `<meta>` toggle for pinned-scheme users.
- **INP never-parks fix** (`break-up-long-tasks`/`schedule-tasks-by-priority`/`efficient-background-processing`) — the meter rAF loop spins unconditionally at idle even under reduced-motion (the aurora already demand-parks via R0G-1). `content-visibility` gate + a `useRAFLoop` demand-park (KF-4) parks it off-screen. `useYieldToMain` already consumed for the maplibre hex→GeoJSON 167ms task; extend to ECharts/map boot + preflight. `web-vitals/attribution` RUM is the witness-enabler.
- **`defer-rendering-heavy-content`** (`content-visibility`; Baseline) — `.deferred-section` already consumed on the admin Recent-Tests table; extend to other below-fold admin/dashboard surfaces.
- **CSS legibility roots** (`improve-text-layout-and-legibility`, `prevent-text-wrapping`, `precise-text-alignment`) — `text-wrap:balance/pretty` (co-author with X1), `text-box` leading-trim (the *structural root* of why dense pills read off-center — augments AS-2/3/15), `field-sizing:content`, `subgrid` retiring the `&nbsp;` equal-height hack. These are mostly GU `typography.css` roots (publish-gated) but `text-wrap`/`color-scheme` are consumer-ownable now.
- **Forms/a11y roots** (`validate-input-after-interaction`, `required-field-feedback`, `accessible-error-announcement`) — `:user-invalid`/`aria-invalid` sync already consumed on the admin form (`useUserInvalidAria`); the survey fields still need `LabeledField` `for`/id (GU), `type`/`autocomplete`/`inputmode` (ST), and the two dashboard `button-name` fails (ResponsiveTabs aria-label + ExpandableContainer `title`≠name = the W0-X8 node, GU).
- **CSP `'unsafe-inline'` drop** (`security`) — report-only soak; deploy-gated (DDR-AS-RC-5).
- **Correctly DEFERRED / note-only (recorded so not re-proposed)**: Speculation Rules (guidance forbids on SPAs; the `import()`-on-intent warm IS the SPA-correct equivalent, already shipped) · COEP/cross-origin-isolation (breaks cross-origin map tiles; no SharedArrayBuffer) · Passkeys/WebAuthn (defer until admin becomes per-user — a shared bearer secret has nothing to bind) · WebMCP (Early-Preview; seed the declarative survey-as-tool only) · `light-dark()` full token migration (AS has a hardened `.dark` cascade; `color-scheme` is the cheap win, full `light-dark()` is a larger GU-token migration) · maplibre `fetchpriority` (upstream-blocked, DDR-AS-RC-4).
- **Rigor record (do NOT chase)**: the 98KB "unused-css" is the subset font payload off-critical-path (false positive); lab TBT is structurally blind (no WebGL2 in headless + cold load never runs a test) — every INP/perf witness must be a real-edge throttled capture; the `errors-in-console`/`bf-cache` failures are headless-WebGL artifacts; the 12MB `garbage` payloads ARE the test, not a load defect.

---

## §5 n+1 TRANCHE SKETCH — AT

**Binding question**: *Can the AS design wave land its user-visible wins against the published glass-ui 3.1.0 + raw View-Transitions browser API NOW — banking AS-1..17 + the dark-FOUC + VT keystones — while the deeper library-root items (the AS-GU bundle) remain correctly routed to a future glass-ui design wave, and the AR-W2/AR-P3 real-edge re-witness closes `ar-close` in the same arc?*

The thesis: **AS is a ratified plan that never ran.** AT is its implementation tranche — Gate-2 on the design wave (DDR-AS-RC-1 re-open) — NOT a fresh audit. It is bounded by two hard constraints: (1) the AS-GU library roots stay deferred (hand-rolling them is forbidden); (2) SUM-1 holds, so deploy/push are out of scope and the header items stay effect-on-GO.

**Wave outline** (mirrors AS.md §2's already-hardened, H2-disjointness-corrected lane cut):
- **AT-R0** — Gate-2 ratification + DDR re-stamp + worktree-base verification preamble. Stamp the AS-RC DDR ledger forward; confirm AS §6 open-decisions (now mostly dissolved by VT). Restore/resolve the `charts-smoke` deleted-spec so the edge-gate runs. *Decision: AS §6 #1 (whole-dial-spin) is dissolved by the VT `view-transition-name`; confirm #3 (AS-15 hairline) + #4 (AnimatedDigit, GU-gated).*
- **AT-R1** — confirmed in-repo fixes against 3.1.0 (H2-disjoint lanes): **α** preflight engine state + Start/Next primary tier (AS-8/10/16/X3) · **β** survey (AS-1/2/3/4/5 + App.vue wrapper + the X5/X6 fold) · **γ** meter bars (AS-13/15 + PhaseTimeline.vue — H3) · **ε** aurora consumer stopgap (AS-6 pastel, softmaxBeta DOWN — H4) · **ζ** motion (AS-7 `--spring-crisp` stopgap). Fold the dropped a11y/safety defects (survey field labels, completion `aria-live`).
- **AT-R2 — the headline, SERIAL + alone**: re-found the completion + route choreography on **`startViewTransition`** (the raw browser API, ships now) — supersedes the AS-17 morph-delete mechanism, retires §8-H7 CLS risk, bakes the focus-route announcement. Build the full idle→running→complete→retake CLS harness FIRST (it doubles as the witness). The `morphViewTransition`/`viewTransition` ergonomic helper is the later GU-gated refactor; the raw adoption is AT scope.
- **AT-R3** — dark-mode keystone (`color-scheme: light dark` + meta + scrollbar/accent), number-easing + easter-egg signature (AS-11 consumer stopgap + B0/B5), CSS legibility roots that are consumer-ownable (`text-wrap`, `text-box` where not GU-gated).
- **AT-W-RATCHET** — drive the REAL dark edge with persisted evidence: the AR-W2 re-witness (mobile CLS<0.05, idle-fps A/B, keyframes-out-of-entry) + AR-P3 admin-TBT AFTER + home CLS 0.33→~0 (VT) + the AS §8/§9 witness battery. **This closes both `ar-close` and `as-close`.**
- **AT-W-CLOSE** — FINAL + AU-SEED + the worktree prune (D15) + memory.

**Cross-repo coordination AT must carry forward (not inject)**: the **AS-GU bundle** (DDR-AS-RC-2) + the **standalone DockIconButton coarse floor** (DDR-AS-RC-3) are handed to a future glass-ui design wave; AT records them as the next R-CONSUME, does not hand-roll. The DEFER items (DDR-AS-RC-4/5) and the two standing user gates (SUM-1, cred-consolidate) carry verbatim. The `morphViewTransition` helper + the GU typography/aurora roots co-travel with that glass-ui wave; AT's raw-VT + consumer-stopgap layer is the part that ships against 3.1.0 today.

---
— A4 speedtest audit, constellation/next, 2026-06-02.
