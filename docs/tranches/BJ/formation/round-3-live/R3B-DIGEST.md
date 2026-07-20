# Round-3b — perf DEV-baselines + A01/A11 engagement audit (browser seat) — REFABLE union

**Verified model:** `claude-fable-5` (this union). The seat that authored this digest ran
`claude-opus-4-8` via the settings-level override while self-describing "fable browser seat" —
corrected here.
**Union provenance:** REFABLE RU-20, 2026-07-20 — perf + engagement re-run ANEW on the CURRENT
tree (this digest unread until after), then per-claim scrutiny on a second instrument. **Verdict:
all 11 findings RATIFIED, zero corrections** — many figures replicated byte-identically (28
progressbars, 2×4000ms indeterminate sweeps, hover scale 1.015, ~40k/~52k RunTasks, the exact
2-boot-long-task signature, blob ForcedReflow, the role=slider not-hittable trio). Second
instrument point (2026-07-20): LCP 417/426/542ms, boot long-tasks 219ms root / 310ms blob,
warm-route freeze 64ms — the DEV baseline is now bracketed by two runs. The transition-CLS 0.04
figure rests on this digest's own NO_NAVIGATION trace (unreplicated, unrefuted — PLAUSIBLE).
The slider fill's damped-spring `linear()` (overshoot 1.22) strengthens the interaction-engagement
register beyond what is recorded below; the atoms' REST inertness stands as written.
Sidecar: `../refable/REFABLE-RU-20.md`. Second-instrument captures: session scratchpad `ru20/`.

Lens: perf RED baselines (DEV-server) + A01/A11 breath-of-life engagement audit

## Summary

PART 1 (PERF, DEV-server unminified — all numbers labeled DEV-baseline, product gates must re-measure on a build): cold LCP is healthy across the board — root 391ms, /foundations 405ms, /substrates/blob 488ms, all CLS 0.00 at load. Boot is clean (zero console errors/warnings on every page sampled). The real perf signal is main-thread churn, not LCP: each cold load carries exactly 2 boot long-tasks (~208-210ms total blocking on light pages; 283ms on blob), and the live glass/WebGL fields run rAF continuously so total main-thread task time over a ~5.3s window is ~1.56s (root) / ~1.71s (foundations) and nearly DOUBLES to ~3.11s on blob (52k vs ~40k RunTasks). Blob cold also trips a ForcedReflow insight. The in-SPA route transition into blob (chunk warm) freezes ~119ms on a single 83ms long-task, then frames settle immediately (5-12ms gaps) — but the transition itself injects a CLS of 0.04. PART 2 (ENGAGEMENT): dock is strongly engaged (hover-to-expand morph verified live), progress has genuine always-on breath (indeterminate sweep + loop bars animate continuously), slider engages on interaction (focus ring + spring fill growth + live label). Buttons are the weak link: hover is a barely-visible 1.5% scale (1.0→1.015) + faint rim illumination, and — like the collapsed dock pill and the resting slider — the button has NO idle/always-on breath. Only looping-progress and the live substrate/section fields satisfy the "every component always displays engagement" edict; the atoms are inert until touched. This is the precise gap the ENGAGE-AFFORD registration wave must close.

## Findings

### perf-lcp-baseline — note

**Claim**: DEV-baseline cold LCP: root 391ms, /foundations 405ms, /substrates/blob 488ms; CLS 0.00 at load on all three; clean boot (no console errors/warnings).

**Evidence**: Observed via chrome-devtools performance_start_trace (reload+autoStop) hard-reload on each route. Root: LCP 391ms (TTFB 2ms / render-delay 389ms), CLS 0.00. Foundations: LCP 405ms (TTFB 4 / delay 401), CLS 0.00. Blob: LCP 488ms (TTFB 4 / delay 484), CLS 0.00. list_console_messages returned zero error/warn. Raw traces: /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/round-3-live/perf-trace-root.json, perf-trace-foundations.json, perf-trace-blob-cold.json; boot PNGs root-boot.png, foundations-boot.png. LABEL: DEV server (unminified) — product gate must re-measure on a build.

**Proposed disposition**: Seed BAND-PERF PENDING-R3 LCP gate with these as DEV RED baselines; set the actual pass threshold against a production build, not these dev numbers. LCP is render-delay-dominated (~99%), so the lever is boot JS, not network.

### perf-longtask-baseline — minor

**Claim**: Every cold load carries exactly 2 boot long-tasks (module-eval/hydration): root 127+81ms (208ms TBT), foundations 128+82ms (210ms), blob 157+126ms (283ms).

**Evidence**: Parsed RunTask events (>=50ms) from the saved traces with python. Root: 2 long tasks total 207.6ms. Foundations: 2 total 209.8ms. Blob: 2 total 282.9ms. Files: perf-trace-root.json / perf-trace-foundations.json / perf-trace-blob-cold.json in .../round-3-live/. DEV-baseline.

**Proposed disposition**: Baseline for a total-blocking-time gate. The two-task signature is stable across routes (boot compile + first hydration); blob adds ~75ms from its heavier component graph.

### perf-main-thread-churn — major

**Claim**: Live glass/WebGL fields run rAF continuously even at idle: ~40k RunTasks / ~1.6-1.7s total main-thread task time over a 5.3s window on light pages, nearly DOUBLING to ~52k tasks / ~3.11s on /substrates/blob; blob cold also trips a ForcedReflow insight.

**Evidence**: Trace parse: root 39,823 RunTasks / 1558ms total task time; foundations 39,938 / 1714ms; blob 52,225 / 3115ms. Blob trace summary surfaced a ForcedReflow insight (bounds ~142ms window) plus a CLSCulprits insight. This is standing CPU cost with no user interaction. Files: perf-trace-*.json in .../round-3-live/. DEV-baseline (though rAF churn is largely build-independent).

**Proposed disposition**: Flag as the dominant idle-CPU cost for BAND-PERF. The substrate field's per-frame work (and the forced reflow it induces on blob) is the real perf ceiling, not LCP. Candidate for a rAF-budget / idle-frame-cost gate and a forced-reflow fix on the blob mount path.

### perf-route-transition — minor

**Claim**: In-SPA route transition into the heavy blob page (chunk warm) freezes ~119ms on a single 83ms long-task, then frames settle immediately (5-12ms gaps) — but the transition injects a CLS of 0.04.

**Evidence**: Measured live via evaluate_script wrapping router.push('/substrates/blob') from /foundations with a longtask PerformanceObserver + rAF frame-gap sampler: pushToResolve 103ms, resolveToFirstFrame 16ms, total freeze 119ms, 1 long-task of 83ms, max post-transition frame gap 13ms, first-8 gaps [5,10,10,8,11,12,9,10]. The wrapping manual trace (perf-trace-blob-routetransition.json, NO_NAVIGATION) reported CLS 0.04 at the transition timestamp. Cold/uncached-chunk transition would be worse (adds chunk fetch+compile). File: .../round-3-live/perf-trace-blob-routetransition.json. DEV-baseline.

**Proposed disposition**: The 83ms freeze is acceptable-ish for a WebGL page mount, but the 0.04 CLS at route swap is a real layout-shift the transition should reserve space for. Seed a route-transition-freeze + transition-CLS baseline.

### engagement-dock — note

**Claim**: Dock (/dock/overview) is STRONGLY engaged: hover-to-expand morph verified live — the collapsed single-Home pill morphs into a full 4-control dock (Home/Search/Notifications/Settings) on one spring.

**Evidence**: Live hover on the 'STARTS COMPACT' dock via chrome-devtools hover. Before: dock-01-rest.png shows a single collapsed Home pill. During: dock-02-hover-expand.png shows the fully-expanded 4-control dock. The section also carries a live chromatic background field (orange glow shifts between the two frames). Files in .../round-3-live/.

**Proposed disposition**: Positive baseline — the dock is the engagement exemplar. Register as the reference bar the ENGAGE-AFFORD wave holds other components to.

### engagement-progress — note

**Claim**: Progress (/feedback/progress) has genuine ALWAYS-ON breath: indeterminate sweep (4000ms loop) and the animated-loop bar run continuously; determinate fills animate (300ms progress-value-fill) on change.

**Evidence**: Live document.getAnimations() returned 9 running animations incl. progress-value-fill (300ms), 2x progress-indeterminate-sweep-b1183593 (4000ms) on .progress-rail; 28 progressbars on page. Screenshot progress-01.png shows DETERMINATE / ANIMATED(LOOP) / INDETERMINATE rows. File: .../round-3-live/progress-01.png.

**Proposed disposition**: Positive baseline — progress (loop/indeterminate variants) is one of only two component families with true idle breath. Determinate-at-rest is static, which is correct semantics.

### engagement-slider — note

**Claim**: Slider (/forms/slider) engages on interaction: focus adds a full-width track ring (absent at rest); value change grows the continuous glass fill with a spring transition (transform 0.2s linear() easing) and live-updates the label (42%→100%). No idle breath; no visible thumb by design.

**Evidence**: Focused the thumb via evaluate then drove value with real CDP End keypress (42→100 confirmed via aria-valuenow). Before slider-01-rest.png (no ring), focus slider-02-focus.png (full-width track outline appears), moved slider-03-moved.png (fill spans full width, label 100%). Thumb computed transition = 'transform 0.2s linear(...)'. Files in .../round-3-live/.

**Proposed disposition**: Positive on interaction, but note the absence of any idle/rest breath — same gap as buttons. Register under ENGAGE-AFFORD for an at-rest affordance decision.

### engagement-button-breath-of-life — major

**Claim**: Buttons (/display/buttons) are the weak engagement link: hover is a barely-visible 1.5% scale (1.0→1.015) + faint rim illumination, and the button has NO idle/always-on breath (inert at rest). This violates the A01/A11 'every component always displays engagement' edict.

**Evidence**: Measured Primary-action computed styles live before/after CDP hover: rest scale '1' transform none; hover scale '1.015' (transform still none, no translate/filter/box-shadow delta). Visual before buttons-01-rest.png vs hover buttons-02-hover-primary.png — delta is subtle (slight grow + rim brighten). At rest the button runs zero animations. Files in .../round-3-live/.

**Proposed disposition**: Primary scope target for the ENGAGE-AFFORD registration wave: (a) add idle/always-on breath (shimmer/pulse/specular drift) to atoms, and (b) strengthen the hover/press affordance well beyond 1.5% scale so it reads as grow/glow/lift per the breath-of-life edict.

### engagement-idle-breath-scope — major

**Claim**: Across the sampled set, ONLY looping-progress and the live substrate/section background fields satisfy the always-on breath edict; the atoms (button at rest, collapsed dock pill, slider at rest) are inert until interacted with.

**Evidence**: Synthesized from the four live samples: getAnimations shows continuous loops only on progress + dock section field; slider/button/collapsed-dock have zero rest-state animations. Presence/absence table — Idle-breath: Progress=YES, Substrate/section field=YES, Slider=NO, Button=NO, Collapsed dock=NO. Interaction-engagement: Dock=strong(morph), Slider=strong(ring+spring fill), Progress=n/a, Button=weak(1.5% scale). Captures: progress-01.png, dock-01/02, slider-01/02/03, buttons-01/02 in .../round-3-live/.

**Proposed disposition**: This table IS the ENGAGE-AFFORD wave scope: register idle-breath for every atom, and rank buttons highest-priority (weakest current signal). Slider/dock/progress interaction-engagement can stand as reference exemplars.

### interaction-robustness — minor

**Claim**: The slider's a11y role=slider node is not the hittable pointer target: chrome-devtools hover/click on it timed out ('did not become interactive'), and synthetic PointerEvents on the track do not drive reka-ui (needs trusted input). The thumb is a zero-width span behind the track.

**Evidence**: hover(uid) and click(uid) on the Volume slider both failed with 'element did not become interactive'. DOM probe: thumb = span.slider-thumb, width 0; interactive track = span.glass-slider (x120 w1360). Synthetic pointerdown/move left aria-valuenow at 42 (no change); only CDP keyboard (End) moved it to 100. Observed on /forms/slider.

**Proposed disposition**: Relevant to the glass-ui binding-verification concern: pointer-based tooling/tests targeting role=slider will silently no-op. Worth a note that slider interaction tests must target the track element or use keyboard, not the role node.

### visual-landing — minor

**Claim**: Root landing bento section-preview cards render as empty dark panels (no preview thumbnail), and a stray yellow goo-blob specimen floats detached at the right of the hero.

**Evidence**: root-boot.png (and foundations-boot.png shows the same shell): the Foundations/Substrates/Display bento cards have blank dark preview areas above their titles; a rounded yellow blob sits mid-air right of the 'Glass UI' chromatic ellipse with no container. File: .../round-3-live/root-boot.png. Outside my primary perf/engagement lens but flagged for the visual audit.

**Proposed disposition**: Route to the visual-defect audit family: bento preview thumbnails appear unpopulated and the hero goo-blob placement reads as orphaned. Confirm intended vs regression.

