# Candidate-2 exemplar reconciliation — mechanism, accessibility, and performance critic

**Seat:** third independent Sol x-high critic.  
**Mode:** formation/audit only; no product source, tests, commits, or other tranche files changed.  
**Overall verdict:** **DEFECT — candidate-2 is not ready to freeze.** The owner routing is mostly
sound, but nine normative/prototype defects remain and three requested live claims are HOLD because
the browser surface was unavailable to this seat.

## 1. Pins and method

The exact bytes inspected were:

| input | SHA-256 / pin |
| --- | --- |
| repository | HEAD `2ad97ca1b0621882486cabe7363c6ba364b03aa0`; dirty user worktree, treated as immutable |
| `EXEMPLAR-RECONCILIATION.md` | `30a42431ef2e87a7ec146d497dd7233f2990b5821e3299a21ad8eae38313f753` |
| `VISUAL-HARDENING.md` | `73e2409eafe6d9899945e795b6d1cb5234c6c574cadd607f46ae538cd33d1f67` |
| `REGISTRY.md` | `95e685fcaf6e4dce6986d1aed6be9b4d10da913ed76bf9cf27bfcab69bed8080` |
| `GATES.md` | `c5c148e6705c12f779e4a0650a553104b595898241a2e805fc976b2873a09f2b` |
| `RESEARCH.md` | `ff5047fb5ab42d83f1a224eb218e09870cc7587b1fb66baa1cb4ccd76eb73641` |
| external lab | `glass-momentum-lab.html`, `614e4e3fc68c6682bd8039000c9348a9ac76ea0dfc0650d36cee1714ccb216b9`, 292 lines |
| final G6 receiver evidence present in the re-read registry/gates | `451f1f4566f5a310e74e9d71aabcee512a6155e06ef2aeb86567d9f84fef61aa` |

I read the five candidate files, the complete lab source, the prior
`IOS27-MICRO/analysis/NOVELTY-CRIT-MECH.md` and adjudicated `NOVELTY-ROSTER.md`, and the current route,
View Transition, scroll reader/pin, velocity, dock, CSS, and focused test sources. I also checked the
candidate research against the primary W3C and WebKit publications.

The in-app browser reported no available browser backend. Accordingly, I did **not** substitute an
unrelated Playwright/DOM harness and do not claim a live 320/736, keyboard, coarse-pointer, PRM,
Safari, or Chromium result. Static DOM/CSS/JS findings below are source proofs; live-only questions
remain HOLD. This limitation itself exposes an evidence problem: the candidate asserts zero root
overflow at 320 and 736 but cites no pinned measurement receipt independent of this seat.

## 2. Verdict ledger

| subject | verdict | evidence |
| --- | --- | --- |
| Lab byte/hash identity | **PASS** | Expected SHA reproduces exactly. |
| Lab reproducibility as a visual artifact | **DEFECT** | The fragment depends on ambient `.btn`, `.card`, `.form-*`, `.viz-*`, Lucide replacement, and many host CSS variables without pinning the host build/theme. |
| 320/736 root overflow and usable reach | **HOLD** | `VISUAL-HARDENING.md:186-194` asserts zero overflow but supplies no engine, host, rect table, screenshot, or scroll-size receipt; browser unavailable here. |
| Lab keyboard/AT interaction order | **DEFECT** | Hidden range and tabs remain sequentially focusable; several exposed buttons are inert. |
| Lab coarse target geometry | **HOLD** | Target size comes partly from unpinned host `.btn` CSS; no coarse media rule or hit/corner receipt exists. |
| Lab PRM interaction/settle | **HOLD** | Source zeros CSS transition duration, but autoplay still advances state/live text on two 850 ms timers; no live focus/announcement trace. |
| Fixed-blur discipline | **PASS** | Blur radii at lab lines 87, 123, 146, and 153 are fixed per arm; the transition list does not animate `filter`/`backdrop-filter`. |
| Lab source continuity and cancellation | **DEFECT** | Same node survives, but no source/destination pair, re-home, velocity handoff, or painted-state interruption is measured; internal identity button is inert. |
| Lab paint/layout mechanism | **DEFECT** | It animates `inset`, `min-block-size`, `min-inline-size`, and cover inline/block sizes and grows one backdrop-filter plate to almost the full field. |
| `R-AMBIENT-PAUSE` | **DEFECT** | “Finite or pause/stop” incorrectly permits a finite animation lasting more than five seconds without a pause/stop/hide mechanism. |
| `R-EXEMPLAR-MATERIAL` | **DEFECT** | The gate rejects opacity imitation in prose but has no transmission/attenuation measurement that an opaque mutation must fail. |
| `R-MOMENTUM-CONTINUITY` event clock/publication | **DEFECT** | Candidate-2 silently drops the prior sustained Hz-invariance and component-local scalar-publication cures. |
| View/route progressive fallback | **PASS** | Instant unsupported/PRM state and no JS animation fallback are the correct progressive truth. |
| Route cancellation, error, focus, and current Safari parity | **DEFECT** | The current helper exposes neither `updateCallbackDone` nor `skipTransition`; pending/focus generation semantics are unspecified; Safari-types comments are stale. |
| Scroll-timeline progressive truth | **PASS** | CSS timelines are a valid preferred arm; bounded JS remains admitted for the current pin reader. |
| Overlay AT/focus lifecycle | **DEFECT** | “AT/keyboard” does not define when content enters/leaves the accessibility tree, re-entrant close behavior, or source-focus restoration. |
| Listening relay current-state seed and park law | **PASS** | The current-state re-press seed, input park, and PRM state-without-travel requirements preserve the prior M8 cure. |
| Owner routing / no-new-wave reduction | **PASS** | STORY W7, REDUCTION W9, existing IOS/material/overlay owners, and GF consumers remain the smallest coherent homes. |

**Count: 6 PASS · 3 HOLD · 9 DEFECT · 0 N/A.**

## 3. Prioritized exact findings

### P0-1 — The pause rule has a real WCAG loophole

`VISUAL-HARDENING.md:116-123`, `REGISTRY.md:48,52`, and `GATES.md:21,25` allow motion beyond five
seconds when it is merely finite. That is not the rule. For nonessential moving/blinking/scrolling
information which starts automatically, lasts more than five seconds, and runs beside other content,
the user needs a mechanism to pause, stop, or hide it. Finishing at six or seven seconds does not earn
the five-second exception. The candidate also omits “hide” as an allowed control.

Primary authority: [WCAG 2.2 Understanding SC 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

**Smallest amendment:** keep `R-AMBIENT-PAUSE` in its current owners, but replace every “finite or
pause/stop” formulation with: automatic nonessential motion presented beside content either ends in
**five seconds or less**, or exposes a reachable pause/stop/hide control; auto-updating information
has no five-second exception. PRM remains a separate preference path, not that control.

### P0-2 — The lab has invisible keyboard stops and false interactive affordances

The defect is source-provable without a browser:

- `.gml-effort` is `opacity:0` outside expanded posture (`lab:111-117`) but its range remains enabled,
  visible to AT, and tabbable (`:30-34`).
- Condensed tabs are only `opacity:0; pointer-events:none; position:absolute` (`:203`); their three
  buttons remain tabbable (`:48-52`). `pointer-events:none` does not remove keyboard focus.
- Library, now-playing, Search, and all three music-section buttons (`:38-52`) have no listeners.
  They expose named button semantics while doing nothing.
- `.gml-tabs` and `.gml-dock` carry labels on generic `div`s without a grouping role (`:36,48`).

This falsifies H2's stable focus/semantics claim and the prototype's keyboard/input question.

**Smallest amendment:** external lab owner only. Either wire the controls to honest operations, or
render non-actions as noninteractive/hidden decoration. Hidden posture content must be `inert` and
removed from the accessibility tree, with deliberate focus routing before it becomes unavailable.
Make the dock/tabs named groups only if those groups are semantically interactive. Do not mint a
Glass component obligation from this prototype repair.

### P1-3 — The lab hash does not pin the rendered lab, and the 320/736 claim is unsupported

The file is an HTML fragment, not a self-contained page. Its material, spacing, target sizes, card,
controls, icons, and even valid color declarations depend on an unspecified visualization host. At
320 px the wing labels disappear (`lab:223-229`), leaving their visible icons dependent on ambient
Lucide processing. The same bytes can therefore paint and lay out differently under another host
theme/build while retaining the same SHA.

`VISUAL-HARDENING.md:192-193` states “zero root overflow at 320 and 736,” but no receipt pins the host,
engine/version, DPR/zoom, writing mode, scroll dimensions, clipping ancestors, or screenshots. Root
overflow would not prove keyboard reach in any case.

**Smallest amendment:** external lab owner. Pin a self-contained harness or the exact host CSS/theme
and icon runtime, then attach a small receipt for both widths: viewport/DPR, root and field
`clientWidth/scrollWidth`, every expected control rect, clipping ancestors, sequential-focus order,
and screenshots. Until then change the zero-overflow sentence to **OWED**.

### P1-4 — The prototype demonstrates layout/paint growth, not a production-safe momentum mechanism

The transition animates layout-affecting geometry:

- dock `inset` and `min-block-size` (`lab:126-137`);
- identity `min-inline-size` (`:161-175`);
- cover inline/block size (`:177-185`);
- expanded grid columns and several `display`, grid-area, and positioning changes snap discretely
  (`:196-222`).

At the same time `.gml-plate` applies `backdrop-filter: blur(1.2rem)` (`:138-147`) and expands with the
dock to `inset:6% 7% 7%; min-block-size:87%` (`:205-209`). Fixed radius is good, but the filtered pixel
area is not bounded. This violates the reconciliation's own rejection of unbounded backdrop area and
cannot establish a paint/layout budget.

**Smallest amendment:** keep the defect prototype-local. Use a fixed reserved destination, transform
or native shared-element geometry for the moving identity, keep discrete semantic changes outside
the interpolated path, and bound the filtered layer. Product gates, under the existing IOS W5 /
STORY W7 / GF-DOCK owners, must trace layout count, CLS, filter-layer area, long frames, and idle rAF;
the external lab cannot GREEN them.

### P1-5 — Candidate-2 drops the prior mechanism critic's event-clock and publication cures

The earlier mechanism critic proved that event-count timing and `dy*60` velocity are refresh-rate
dependent. The adjudicated roster retained wall-clocked holds, a windowed velocity estimate, unknown
velocity→0, and component-local per-frame scalar publication (`NOVELTY-ROSTER.md:45-48`). Candidate-2
requires bounded inherited velocity but does not state how samples are timed, how coalesced events are
handled, or where the scalar is published.

This is a silent regression because the candidate explicitly re-adjudicates the older roster rather
than incorporating its load-bearing mechanism laws. Current product precedent already exists:
`useDragVelocity.ts:100-181` uses elapsed frame time and publishes on the host, while the morph stack
uses the existing windowed `Draggable` path.

**Smallest amendment:** add a rider to `R-MOMENTUM-CONTINUITY` under IOS FINAL W5/X-CHOREO and its
existing GF consumers: one monotonic clock; wall-time holds; windowed/coalesced velocity; no
event-count or assumed-60-Hz term; unknown velocity seeds zero; per-frame registered scalars publish
on the smallest component root, never `:root`. Replay one physical gesture at 30/60/120/240-Hz event
cadences and require equivalent destination/velocity within a pinned tolerance.

### P1-6 — The route director has no cancellation/error/focus phase contract

Current source makes the gap concrete:

- `routeTransition.ts:5-12` returns only the transition's swallowed `finished` promise and callers
  discard it.
- `useViewTransition.ts:29-33,169-175` exposes only `ready?`/`finished`; no
  `updateCallbackDone`, `skipTransition`, active episode, or update error survives.
- `TransitionRouteLink.vue:25` fires and forgets.
- `view-transition.css:83` makes the snapshot layer pointer-transparent, so a second navigation can
  arrive during the first transition.

The View Transition API deliberately does not queue application DOM changes; `updateCallbackDone`
distinguishes committed DOM from animation completion and `skipTransition()` cancels only the visual
transition. See [CSS View Transitions Level 1](https://www.w3.org/TR/css-view-transitions-1/).

The candidate's latest-waiting UI also has no generation rule: an older route can clear a newer
route's busy/pending state or route focus after the user has already chosen again. “Interruption from
painted state” is therefore not enforceable for rapid navigation.

Current Safari parity is also understated. Product comments at `useViewTransition.ts:46-50` and
`view-transition.css:45-46` describe Safari as callback-only, but WebKit documents View Transition
Types and Classes since Safari 18.2: [WebKit Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/).

**Smallest amendment:** STORY W7 owns one navigation episode/generation contract: latest accepted
intent owns busy/pending/focus; old visual transitions are skipped; update errors remain observable;
only the current episode may clear state; focus moves once to the committed destination or remains on
the persistent initiator by declared route class; skip/unsupported/PRM take the same semantic path.
PERF W4 measures wait feel only, and GF-DOCK W6 keeps shell/no-blank/CLS only. Add current Safari and
Chromium typed-transition capture; do not add a JS animation fallback.

### P1-7 — Material “transmission” still has no mutation-proof measurement

`REGISTRY.md:49` and `GATES.md:22` correctly say that an opaque pale fill must fail and screenshots
alone cannot prove frost. They never define the observable that distinguishes transmission from
opacity. A reviewer can still subjectively approve a pale lozenge, so the named mutation has no
guaranteed bite.

The lab makes the problem visible: all three material arms change background opacity and blur, but it
does not measure retained low-frequency substrate identity, high-frequency attenuation, text
contrast, filter fallback, or filtered pixel area. It also has no runtime refraction latch.

**Smallest amendment:** keep IOS FINAL W3/W4/W5 and MATERIAL W1/W2/W7/W8 as owners. On one pinned
structured substrate, capture uncovered and covered probes. Derive and pin from F1 a band in which
low-frequency chroma/luminance differences remain distinguishable, high-frequency edge energy is
attenuated, text/value contrast remains at least the existing floor, and the failed-refraction arm
computes to honest blur. The opaque-fill mutation must collapse substrate differentiation and fail.
Keep blur radii fixed and animate only bounded layer opacity/transform.

### P1-8 — Overlay exhale can be visually right while AT and focus are wrong

`R-OVERLAY-EXHALE` asks for “AT/keyboard” but never orders accessible content against the visual
body/content/medium clocks. The positive contentless-medium beat makes this important: faded content
must not remain focusable during the held medium, and a closing animation must not delay focus return
or leave a modal subtree exposed to AT. Re-open or Escape during close needs one generation/cancel
rule just as the visual channels do.

**Smallest amendment:** the adopting Dialog/Popover/overlay owner keeps its existing focus contract.
At open commit, accessible state, names, modal/inert state, and focus are established exactly once; at
close commit, the disappearing subtree becomes inert/leaves the accessibility tree and focus returns
to the live source independently of the medium tail. Re-open/cancel invalidates older completion
callbacks. PRM uses the same semantic sequence without travel. The IOS W5 visual owner supplies only
the channel ordering.

### P2-9 — The lab does not actually exercise the attention lens or source action

The halo is simply hidden with the entire effort block until expanded, then remains at fixed opacity
`.55` (`lab:111-125,216-217`). It does not follow slider hover, focus, touch, drag, or disengagement as
H3 requires. The range changes only its text value (`:273-275`). Likewise, activating the
“Open now playing” identity does nothing; only the separate posture buttons and scripted timer mutate
posture. The lab therefore illustrates vocabulary but does not answer prototype questions 2–4.

**Smallest amendment:** external lab owner only. Bind the halo to actual focus/hover/press/drag state
with a parked rest, and let the identity action initiate expansion. Add a visible interrupt/reverse
probe seeded from current computed geometry. Do not route these omissions into a new Glass primitive.

## 4. Born-RED and mutation proofs required before refreeze

| contract | born-RED now | mutation that must fail | smallest GREEN proof |
| --- | --- | --- | --- |
| Ambient pause | Candidate permits a finite 6–7 s automatic loop without a control. | Set a representative automatic effect to 7 s one-shot and remove its control. | Gate rejects >5 s beside content unless reachable pause/stop/hide exists; PRM tested separately. |
| Lab focus order | Hidden range/tabs remain tabbable; named internal buttons are inert. | Restore `opacity:0`/`pointer-events:none` without `inert`, or expose a no-op button. | 320/736 sequential-focus trace includes only visible operable controls; focus is routed before posture removal. |
| Lab reproducibility | Ambient host CSS and icon runtime are unpinned. | Remove/change host `.btn` or token CSS while keeping lab hash fixed. | Self-contained or host-pinned harness produces the same rect/token/icon receipt. |
| Paint/layout budget | Lab animates layout dimensions and expands a full-panel backdrop filter. | Replace transform geometry with `inset`/size interpolation, or remove the filtered-area cap. | Engine traces show zero motion CLS, no per-frame layout on the production path, bounded filter pixels, no long-frame regression, zero idle rAF. |
| Event-clock invariance | `R-MOMENTUM` names velocity but no sampling law. | Restore event-count hold, `dy*60`, single-last-sample release, or root-scoped per-frame var. | Same physical gesture replayed at 30/60/120/240 event rates yields equivalent handoff; subtree invalidation remains component-local. |
| Route cancellation/focus | No episode token, skip handle, update phase, or error channel exists. | Remove generation guard; let stale route clear busy/focus; ignore rejected update. | Rapid A→B→C, re-press, unsupported, PRM, and error cases end at C with one focus placement, no stale clear, no unhandled rejection, no blank frame. |
| Material transmission | Opaque-pale rejection is subjective. | Replace frost with an opaque active slab of similar mean luminance. | Substrate differentiation/attenuation and contrast probes fail the opaque mutation in current Safari and Chromium; runtime fallback proves honest blur. |
| Overlay AT lifecycle | Visual channel order has no accessibility-tree order. | Keep faded content focusable during medium tail or let stale close return focus after reopen. | Accessibility snapshot + focus event log prove one open/close/cancel order in normal and PRM paths. |
| Safari/Chromium parity | No current lab capture exists; old prototype ledgers do not prove these bytes. | Switch an engine to a different aesthetic or generic-route type without recording the degrade. | Same script/substrate in current Safari and Chromium, with computed type/filter path and paint/geometry trace; differences are capability degradation only. |

## 5. Progressive-platform rulings

- **View Transitions — PASS in principle, HOLD in paint.** Treat animation as enhancement and keep
  unsupported/PRM state instant. Direct initial load/history may remain explicitly instant. Do not
  invent a JS animation fallback. Cancellation and focus/error phases still require P1-6.
- **Scroll-driven animations — PASS in principle, HOLD in route capture.** WebKit documents
  compositor-thread `scroll()`/`view()` timelines in Safari 26.4
  ([WebKit Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)) and pause,
  endpoint, and BFCache fixes in 26.5
  ([WebKit Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/)). That supports
  the candidate's CSS-preferred arm. It does not make layout/paint properties compositable, prove
  Chrome parity, or erase the measured budget for the current JS `--pin-t` reader.
- **Fixed blur — PASS.** Candidate law and lab declarations keep radii fixed. A fixed radius over an
  unbounded growing area is still a performance defect, so fixed blur is necessary but insufficient.

## 6. Explicit rejections

1. Reject the external lab as production evidence or a new public primitive.
2. Reject “finite” as a loophole for automatic motion lasting more than five seconds.
3. Reject opacity-zero/pointer-events-none as keyboard or AT hiding.
4. Reject autoplay as proof of user-driven interruption, velocity handoff, or focus continuity.
5. Reject an HTML hash without the ambient host as a visual/render pin.
6. Reject root-overflow measurements as reach, target-size, or clipping proof.
7. Reject layout-property animation and a full-field backdrop plate as a compositor-safe exemplar.
8. Reject screenshot-only frost judgments; opacity can imitate the mean color.
9. Reject event-count clocks, assumed 60 Hz, last-sample velocity, and per-frame `:root` scalar writes.
10. Reject swallowed navigation errors and “finished” as the only route lifecycle phase.
11. Reject the stale “callback-only Safari” assumption; test current typed transitions.
12. Reject PRM as a pause/stop/hide control and reject a JS motion fallback for VT or scroll timelines.

## 7. Prototype defects versus product obligations

| prototype-only defect | product obligation, routed to existing owner |
| --- | --- |
| Unpinned host CSS/icons; unsupported 320/736 receipt | Every visual owner supplies component + route evidence at its required widths; no new lab row. |
| Hidden focusable range/tabs and inert lab buttons | Real dock/overlay/slider owners prove operability, focus order, names/state, and coarse reach. |
| Layout-animated dock and expanding full-panel filter | IOS W5/STORY W7/GF-DOCK and material owners use production-safe geometry and measured paint/layout budgets. |
| Halo not connected to actual slider interaction | `V-ALENS`/Slider receiver proves hover/focus/coarse onset/drag/park on the real substrate. |
| No real source/destination or interrupt trace | `R-MOMENTUM` + STORY W7/GF consumers prove paired geometry, rate-invariant velocity, cancellation, focus, and PRM. |
| Scripted finite sequence only | `R-AMBIENT-PAUSE` applies the corrected ≤5 s-or-control rule to real consuming routes. |

No finding requires a new wave. The minimum candidate-2 change is to amend the named existing rows
and gates, mark the unreceipted lab claims OWED, and refreeze only after those normative bytes and
their evidence pointers stabilize.
