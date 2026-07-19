# CORPUS-VIDEOS-A — the seat redo (IOS27-MICRO corpus redo, 2026-07-18)

- verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat: corpus:VIDEOS-A.
- assets (5): `ScreenRecording_06-20-2026 18-47-21_1.MP4` (a1), `ScreenRecording_06-20-2026 18-48-52_1.MP4` (a2), `ScreenRecording_06-21-2026 01-28-54_1.MP4` (a3), `ScreenRecording_06-22-2026 23-59-33_1.MP4` (a4), `Screen Recording 2026-06-22 at 14.38.42.mov` (a5).
- frames: `scratchpad/corpus-redo/VIDEOS-A/` — survey 8-12fps per asset + seven 60fps physics re-bursts; every set's t0+fps contract is in that folder's `README.md` (frame N sits at t0+(N-1)/fps; 603w = 0.5x native, 1 img px = 2 native px). Trackers: `measure.py` (profile-shift SSD with subpixel refinement; red-dominant-extent lens tracker). Damped-oscillator fits: grid over (ζ, f_d) with linear LSQ, critical-damping alternative tested per window.
- prior canon EXTENDED and CORRECTED: `refable-timelines/sr-0620-1847.md`, `sr-0620-1848.md`, `sr-0621-0128.md`, `sr-0622-2359.md`, `mov-0622-1438{,-copy}.md`, `MARKS-A.md`, `MARKS-B.md`, `IOS27-CODEX.md` (laws cited by number), `../MARKS.md` (the 07-17 corpus + PASS-2). Where fresh 60fps evidence disagrees, it wins and the correction is recorded; where it agrees, the prior ledger is cited, not re-derived. Grades: MEASURED / BOUNDED / INCONCLUSIVE — the lens-blink and detent-arrest aliasing traps govern throughout; nothing below is calibrated on a frame not proven at rest.

**The duplicate verdict (the one user-flagged check):** the two `.mov` files are NOT byte-identical — same size (8,400,186), first difference at byte 8,387,614, distinct md5 (`da48fdff…` vs `7c66bdea…`). The decoded video streams are MD5-identical (`236e8b23…` both). Container-metadata-only difference (a re-mux/duplicate with a touched tail atom). Content duplicate, confirmed; not re-analyzed. Neither prior timeline claimed byte identity, so no correction lands there.

---

## 1. The fresh measurement layer — the unified arrival register

The headline of this redo. Three independent 60fps fits from two videos, plus MARKS PASS-2 C2 from the 07-17 corpus, now bracket ONE spring register for every released arrival in the corpus:

| event | asset | window | ζ | f_d | overshoot | v at rest-crossing | k = overshoot/v | critical alt |
|---|---|---|---|---|---|---|---|---|
| CC overpull release | a4 | rel60, t=4.717-5.183 | 0.71 | 1.60Hz | 18.9 native px (5.0% of 379px travel) | ~670 native px/s | 0.028s | 2.9x worse |
| full→medium detent arrival | a3 | med60, t=8.75-9.27 | 0.80 | 1.75Hz | 14.8 native px (~1.1% of travel) | ~910 native px/s | 0.016s | 7.1x worse |
| collapsed→full ballistic arrival | a4 | exp60, t=9.75-10.08 | 0.72 | 2.10Hz | 30.2 native px (~1.7% of travel) | ~1,890 native px/s | 0.016s | 8.4x worse |
| flung Maps collapse (MARKS C2, cited) | 07-17 corpus | — | 0.79-0.82 | 1.62-1.86Hz | 11 px (1.2%) | 570 px/s | 0.019s | 4.1x worse |

**The register: ζ = 0.71-0.82, f_d = 1.6-2.1Hz, single overshoot, no second excursion, monotone return.** Fit RMS 0.05-0.23 img px — the linear second-order model holds to sub-pixel residual on all three fresh tails. And the law C2 stated now generalizes across surfaces and videos:

**Overshoot is velocity-bought at k ≈ 0.02 px per px/s of rest-crossing velocity (bracket 0.016-0.028s), everywhere.** Four events, three recordings, two apps, one constant. Zero-crossing-velocity arrivals land dead (a3's drop to collapsed, its decelerated flick to full, a2's carousel — all monotone); hot crossings buy exactly their k·v. All measured overshoots sit at 1-5% of travel — far inside the sworn [0,10%] preset fence (`springPresets.ts:57`), which stands with room to spare.

### Correction C-A1 — per-detent damping DISSOLVES (codex law 7b, MARKS-A V3 §1)

~~"Edge detents land critically damped, NO overshoot; the interior detent lands slightly underdamped"~~ and the recipe ~~"ζ≈1.0 at travel edges, ζ≈0.85-0.9 at interior detents"~~ are VOID as mechanism. a4's exp60 shows a travel-EDGE detent (full) overshooting 30 native px when crossed at ~1,890px/s — edges are not critically damped; they were simply always approached slow in sr-0621-0128 (both its edge arrivals decelerated to near-zero crossing velocity; k·v ≈ invisible). One register + velocity-bought overshoot explains every arrival in the corpus with no per-detent ζ table. The OBSERVATIONS in law 7(b) all stand; the causal story is replaced. (Velocity-projected detent SELECTION — law 7c — is untouched and re-confirmed: a3's 3.80s release skipped medium; a4's flicks skipped it in both directions.)

### Correction C-A2 — the "~9%" release overshoot was 12fps aliasing (codex law 14c, sr-0622-2359 §1)

~~"single ~36px overshoot above rest (~9% of the 390px travel)"~~ → MEASURED at 60fps: 18.9 native px = 5.0% of the 378.9px hold displacement (my hold measure +378.9 native confirms the prior +374). The 12fps w3b_07 frame read a mid-flight parallax layer. Law 14(c)'s "single ~9% overshoot, no second bounce (ζ≈0.75-0.85)" amends to: single ~5% overshoot, ζ 0.71 (bracket edge 0.71-0.82 unioned), f_d 1.6Hz, k≈0.02s. The "spring eats the overshoot when incoming velocity already points home" clause survives as the k·v law reading.

### The on-disk cross-check

`springPreset("dock")` ships {response 0.30, ζ 0.82} (`src/composables/motion/spring/springPresets.ts:94-100`) ⇒ f_d 1.91Hz, ζ 0.82 — INSIDE the unified bracket, at its brisk edge. The shipped table row remains corpus-true; MARKS PASS-2's X2 verdict re-confirmed from two new videos.

### The a1 lens-transit VFR verdict (the lens-blink trap, honored)

The a1 source itself drops frames exactly during the tab-switch lens transit: packets run 60fps to t=0.833, then ONE frame at 0.933, then 60fps from 1.017 — the recorder hitched under the morph (same failure class as a2's banner-dismiss VFR gap). Verdict: the lens geometry curve is **INCONCLUSIVE at any cadence in this asset** — no re-burst can recover dropped frames. What the single surviving transit frame (t=0.933) shows, MEASURED by red-dominant extent: the tint span stretches from x[150,231] (rest, width 82) to x[172,407] (width 236 = 2.9x, bridging BOTH tab stops) — consistent with one continuous body, inconsistent with an empty-gap blink. Travel time BOUNDED [84,183]ms (prior "≈170ms" sits inside the bound and keeps its standing via C4's Safari 60fps proof that the one-body morph is platform grammar). New MEASURED detail: the arrival tint lands ~15-20% wider than rest (width 74-78 at t=1.017-1.083) and cools to 64 by t≈1.30 — an arrival-bloom decay of ~250ms on the LIGHT channel, kin to the oversized-arrival law (MARKS §3, codex law 16b's settle).

---

## 2. Per-asset marked tables

Engagement scalars are SUFFUSION-MATRIX §3.1-3's six: `--flex-vel`, `--motion-weight`, `--engage-t`, `--overpull`, `--impulse`, `--scrub-t`. Momentum regimes cite IOS27-CODEX law numbers.

### a1 — sr-0620-1847 (Apple Music, 38.24s) — timeline cited: `sr-0620-1847.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| dock lens tab-switch | 0.83-1.30 | BOUNDED | lens travel = `--flex-vel` bulge + transit tint-bleed; arrival bloom cools ~250ms (`--engage-t` decay) | tracked tap → fired travel; content swap ≤83ms is a hard cut under the lens (law 16b) | §1 above: source drops frames mid-transit; travel BOUNDED [84,183]ms; arrival-width bloom 15-20% NEW |
| dock slab→trio collapse | 8.83-9.25 | MEASURED (prior) + visual 60fps | three glass bodies overlap mid-morph, double-stacked tint — the goo IS the engagement read | displacement-gated (~100-150px), velocity-agnostic; re-expand intent-gated; tab-switch resets (law 16a) | col60-14 confirms the triple overlap at 60fps (red Library glyph body + re-forming mini pill + separate search circle); prior ledger stands, cited |
| mini↔full player growth | 3.79-4.42, 21.25-21.92 | MEASURED (prior) | detuned channels: blur < geometry < artwork — the art LAG is the weight display (`--motion-weight`) | origin-anchored growth from CURRENT geometry; drag = tracked 1:1, flick = fired ~350ms (laws 5, 15) | agrees; cited, not re-derived |
| drag-dismiss vs flick-dismiss | 5.10-6.10 vs 22.0-22.35 | MEASURED (prior) | drag: `--scrub-t` owns position, art frozen; release: `--impulse` re-forms pill text row in ~80ms | the two-regime split at the finger (law 15) | agrees; cited |
| header blur-out leads collapse | 13.25-14.10 | MEASURED (prior) | attention chrome dissolves BEFORE the dock moves — a two-surface stagger | scroll-tracked leader (law 15) | agrees; cited |
| marquee continuity | throughout | MEASURED (prior) | never static; scroll offset survives every geometry morph — content state is continuous (law 17) | none — content life, zero gesture scalars | agrees; cited |
| CC open/dismiss + status migrate | 32.85-37.1 | MEASURED (prior) + visual | dismiss: global de-blur while status readouts MIGRATE into the status-bar corners | fire-and-forget close ~500ms (law 15); migrate-don't-fade (law 17) | s8-0294 catches the migration mid-flight — readouts large, traveling home, navbar materializing beneath; confirmed |
| press states | 0.9, 21.25, 31.0 | MEASURED (prior) | press DIMS glass (lens, mini pill); back-chevron blooms white — engagement acknowledged before travel (`--engage-t`) | law 8 entry vocab at micro scale | agrees; cited |

### a2 — sr-0620-1848 (Apple Music home, 11.97s) — timeline cited: `sr-0620-1848.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| carousel flick snap | 1.60-2.28 (+3 more) | MEASURED — fresh 60fps tail | flight is single-channel; ALL the life is the physics curve; `--impulse` absorbs v0 | velocity-parameterized duration-stable snap, τ≈130ms, ζ≥1, ~200ms sub-2px creep tail (law 14a) | sw60 tail confirms: monotone decay ratio ~0.85-0.88/frame (τ≈120-130ms), zero overshoot, still creeping +1.3 img px at t=2.27 — the creep tail is real, keep it |
| end-of-list rubber band | 8.28-8.88 | MEASURED — fresh 60fps | `--overpull` as displacement, one-sided release | asymmetric rubber band: compression ~90ms, release ~380ms asymptotic, NEVER crossing rest (law 14b) | rb60: max penetration −18.4 img px at t=8.483-8.50 (prior: 18 at same frames — exact agreement); release monotone, no crossing; CONFIRMED |
| banner dismiss desync | 0.375-0.475 | MEASURED (prior) | translate leads, fade trails ~40ms, the scrim clears LAST ~70ms — three clocks on an exit | thrown release after ~6pt drag take-up creep — a 60x velocity step (law 8 exit half) | agrees; cited. The real compositor hitch here is the same failure class as a1's lens-window drop |
| shelf glass, per-region tint | throughout | MEASURED (prior) | the glass itself is STATIC; its life is transmitted — per-region hue (red left/indigo right of one pill), cap refraction displacing the backdrop boundary ~22-33pt | zero idle light — law 3's velocity-keyed caustic reads zero at rest | agrees; cited |
| ambient card gradient life | throughout | MEASURED (prior) | every editorial card breathes: ~7.6pt/s drift + ±20% mass over 2-3s, hue held — the restraint floor (law 11) | none — the zero-scalar ambient register | agrees; cited |
| marquee ramp | 6.8→end | MEASURED (prior) | delayed start, ~1s ease-in to ~50pt/s, both lines one clock | none | agrees; cited |

### a3 — sr-0621-0128 (Apple Maps sheet, 9.74s) — timeline cited: `sr-0621-0128.md`

The asset where NOTHING self-animates — every joule of life is gesture-carried or position-mapped. The purest scrub exemplar in the corpus.

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| detent springs | 3.80-4.53, 6.98-7.70, 8.60-9.15 | MEASURED — fresh 60fps | release seeds the spring with live velocity (`--impulse`) | velocity-projected detent selection — releases and flicks skip medium (law 7c); regimes split at the finger (law 15) | med60 re-proves the interior arrival: +14.8 native px overshoot at ~910px/s crossing, ζ0.80/f_d1.75, recovered ~200ms — and §1's C-A1 dissolves the per-detent-ζ story |
| position-mapped material | throughout | MEASURED (prior) | scrim + sheet tint are pure functions of height, scrub-reversible; blur CONSTANT at every height | the medium as f(position), never f(time) (law 7d) | agrees; cited |
| rigid mask reveal | throughout | MEASURED (prior) | the deliberate ZERO: no per-element entrance inside the sheet; the slab's rigidity is the weight display | law 7e — the translate regime shows content pinned to the sheet top | agrees — and note the regime split against the 07-17 corpus: GROWTH surfaces (dock→card) run the fraction-keyed reveal ladder (MARKS §1/§6); TRANSLATED sheets run rigid mask. Two regimes, one component family — the drawer needs both |
| overlay dodge + predictive fades | 3.15-3.32, 3.80-3.95, 8.60-8.98 | MEASURED (prior) | companions ride the sheet, clamp at ceiling, fade IN PLACE; fade-IN keyed to gesture direction/PROJECTED target — the system answers intent before position | law 7f | agrees; cited — the predictive fade is anticipatory engagement, the cheapest "I am listening" in the corpus |
| grabber lifecycle | 0.42 | MEASURED (prior) + visual | attention affordance: absent cold (s12-0001 confirms — no grabber over the collapsed pill), born at first touch, persists | law 7a | agrees; cited |

### a4 — sr-0622-2359 (Control Center + Maps, 12.21s) — timeline cited: `sr-0622-2359.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| CC slow pull + overpull hold | 3.50-4.65 | MEASURED — fresh | 1:1 position-locked to +378.9 native (fresh; prior +374), zero drift for ~600ms; two-layer parallax (grid 1.04x) | tracked leader, arbitrary overpull position-locked, zero force decay (law 15) | hold displacement re-measured; agrees within 1.3% |
| the displacement rim-light event | 4.03-4.65 | MEASURED (prior) + visual | THE engagement-light exemplar: per-icon accent rims (Shazam blue, hearing green, flashlight red) + color bloom INSIDE the slider capsules + the Sleep pill aura — all present ONLY while displaced, decaying at rest. `--overpull` drives Q3 | law 3's velocity/displacement-keyed caustic | s12-0053 confirms in full color; the slider-capsule interior bloom and Sleep-pill aura are finer than the prior ledger recorded — engagement light floods CONTROLS riding the displaced sheet, not just toggle rims |
| CC release spring | 4.65-5.18 | MEASURED — fresh 60fps fit | `--impulse` fires; single overshoot; light decays after geometry | law 14c, AMENDED per §1 C-A2 | ζ0.71, f_d1.60Hz, overshoot 5.0% (not ~9%), k≈0.028s |
| open/dismiss asymmetry | 0.65-1.07 vs 2.87-3.25, 5.67-6.00 | MEASURED (prior) | open: blur leads 80% in 80ms, ghosts condense, saturation last; dismiss: text dies first, card fade ~230ms, blur lags a beat, saturated icons FLARE through thinning glass | entry/exit asymmetry — never mirror (law 8) | agrees; cited |
| Maps launch zoom + population | 6.42-8.00 | MEASURED (prior) + visual | population staggers chrome→body→data ~250ms steps; live chip swaps in place ("6.7 mi"→"14 min") | app-zoom class: fire-and-forget license, live content frame one (laws 5, 17) | s12-0088 (t=7.25): the sheet body is still COMPLETELY EMPTY — search row + avatar only. The empty-body beat runs longer than the prior "Places/Recents render dimmed at 7.25" (within cross-burst VFR tolerance ±150ms, but the beat itself is the point: the surface NEVER waits for data) |
| sheet ballistic expand | 9.40-10.08 | MEASURED — fresh 60fps fit | `--impulse` at ~14,800px/s peak | flick skips mid detent (law 7c); arrival per §1 | ζ0.72, f_d2.10Hz, overshoot 30.2 native px — the edge-detent overshoot that dissolves per-detent damping (C-A1) |
| app close zoom | 11.35-11.90 | MEASURED (prior) | chrome drops one frame BEFORE the canvas morph; landing icon 1.4x→1.0 | fire-and-forget close (laws 5, 15) | agrees; cited |

### a5 — Screen Recording 06-22 14.38.42.mov (+ "copy") — timelines cited: `mov-0622-1438{,-copy}.md`

NOT iOS (Anthropic Cowork desktop, static) — provenance flag maintained; feeds the breath-of-life bank only (law 11). Fresh stasis check: consecutive-frame max luminance diff 4-5/255 (codec noise + dot breathing), one 23/255 cursor event — the static verdict CONFIRMED. Duplicate verdict per the header: stream-identical, container-metadata-differing; not re-analyzed.

| mark | grade | breath of life | fresh delta |
|---|---|---|---|
| ambient dot-lattice luminance envelope | MEASURED (prior) | the restraint floor: lattice static, no dot travels; a cloud-shaped luminance envelope wanders ~10-20 CSS px/s, rise ~0.7s / decay ~3s, peak +16% — slowest visible change wins | agrees; cited. The asymmetric per-dot lifecycle (fast attack, 4x slower release) is the same attack/decay asymmetry as a2's rubber band — the house ambient register should keep that signature |

---

## 3. The breath-of-life index (lens 1 rollup)

What is NEVER static, per asset, and which of the six scalars the surface expresses:

| asset | never static | responds to touch | responds to scroll/position | responds to attention/intent | scalars expressed |
|---|---|---|---|---|---|
| a1 | marquee; transmitted backdrop through shelf glass; recording pill | press-dim, chevron bloom, tracked dismiss, lens travel | header dissolve → displacement-gated dock collapse | tab-switch resets collapse | `--scrub-t`, `--impulse`, `--engage-t`, `--flex-vel`, `--motion-weight` |
| a2 | EVERY editorial card's gradient field; marquee | flick→snap (v0 absorbed), banner throw | end-of-list `--overpull` | — | `--impulse`, `--overpull`, `--motion-weight` (the creep tail) |
| a3 | nothing — 100% gesture-carried | grabber born at first touch; 1:1 track; release springs | scrim/tint pure f(height), scrub-reversible | PREDICTIVE overlay fade-in keyed to projected target | `--scrub-t` (master), `--impulse`, `--engage-t` (grabber) |
| a4 | — (CC is static at rest; the wallpaper is the room) | tracked pull, position-locked overpull, release spring | displacement rim-light + in-control color bloom, decaying at rest | population never gates on data; live chips upgrade in place | `--overpull` (→Q3 light), `--scrub-t`, `--impulse` |
| a5 | the dot-field envelope | — (nothing interactive crossed) | — | — | none — the zero-scalar ambient floor |

The corpus-wide reading for SUFFUSION: iOS spends engagement light ONLY at displacement/motion (a4's rim event, a1's arrival bloom) and spends ambient life ONLY on content surfaces (a2's cards, a5's field) — chrome glass is dead still at rest and alive through transmission. The zeros are load-bearing, exactly as the matrix swears.

---

## 4. The components-touched index (lens 2)

Shipped state verified on disk this session (all paths under `src/`). HAS = the register exists; LACKS = absent; CONTRADICTS = ships the opposite. Our design language governs every recommendation — warm cream, deft rounding, our glass; the exemplars teach registers, never skins.

| component | exemplar | the register it teaches | shipped state + pins |
|---|---|---|---|
| **dock** | a1 §2 collapse machine; a4 (dock not exempt from the CC medium) | slab↔trio state machine; displacement-gated collapse, intent-gated re-expand, tab-switch reset; three-body goo overlap mid-morph; the collapse survivor keeps its accent glyph | HAS the spring register (`composables/motion/spring/springPresets.ts:94-100`, corpus-true per §1); HAS a collapse machine (`components/dock/README.md:44-45` startCollapsed/collapseDelay) and an opt-in scroll-collapse driver with the iOS-27 persistence lesson documented (`composables/motion/scroll/useScrollChrome.ts:1-28` — direction+range ramp, velocityGate, snap-at-rest); LACKS the three-body goo overlap (our collapse is one shell morph; iOS runs three overlapping backdrop bodies — laws 6, 16a); LACKS momentum-rebound immunity on re-expand (iOS re-expands only on sustained drag arriving at top) |
| **tabs** | a1 §1 lens tab-switch | content swaps ≤83ms — a hard cut UNDER the lens, never sequenced after; transit tint-bleed onto glyphs beneath; arrival ~15-20% oversized on the light channel, cooling ~250ms | HAS the single traveling-indicator writer with velocity-driven volume-preserving stretch + release-at-arrival (`composables/motion/morph/useSelectionIndicator.ts:18-33,74-77`); HAS drag-morph tanh stretch feeding `--flex-vel` (`components/tabs/composables/useTabDragMorph.ts:115-133`); HAS lens refraction opt-in (`styles/glass-refract.css:62-76`); LACKS transit tint-bleed (glyphs under the traveling indicator do not re-tint); LACKS the arrival light-bloom cool-down leg (geometry releases at arrival; light has no cool clock) |
| **slider** | a4 CC capsules (knob-less fill-pill; interior color bloom while the sheet is displaced) | fill as material lightness; engagement light INSIDE the control keyed to displacement, decaying at rest | HAS the full drag-physics train — tanh-clamped `--atom-drag-v`, volume-preserving smear, press-squash anticipation, `--motion-weight` coupling, PRM floor (`components/slider/Slider.vue:100-109,421-449`); LACKS end-overpull compression (no bound-press deform at min/max — SUFFUSION C row Q1); LACKS any displacement-keyed accent bloom (the a4 teach: the control answers the CONTAINER's displacement, not only its own drag) |
| **button** | a1 press states (press dims; chevron blooms white) | press acknowledged on the body before anything travels; engagement light at engage only | HAS the coupled press — velocity-continuous squish + `--press-t` brightness leg on one spring clock (`composables/motion/spring/useLiquidPress.ts:1-24`) |
| **switch / toggles** | a4 toggle circles: flat smoke at rest, accent-rim-lit under displacement | two material states keyed to motion/displacement; per-icon accent in the rim; decay at rest | LACKS entirely — ships `tap-squish` press only (`components/switch/Switch.vue:38-44`); no displacement/motion light channel. The cheapest unshipped engagement win this corpus names: rim accent driven by the six-scalar field (`--overpull`/`--flex-vel` → Q3), zero idle cost |
| **dialog** | a4 CC open/dismiss asymmetry (law 8) | open: medium leads (~80% in 80ms), ghosts condense, saturation last, position settles last; close: content first, medium relaxes after; NEVER mirror | HAS position-mapped scrim on the same live scalar — interrupt-safe (`components/dialog/DialogContent.vue:375-381`) and the graded box-following backdrop (`DialogContent.vue:50-51`); PARTIAL on the asymmetric close: the inverted order exists in the SUFFUSION F contract but the icon-flare-through-thinning-glass exit signature and the lagging blur-release beat are unbuilt |
| **drawer** | a3 + a4 sheets — the richest exemplar pair | velocity-projected detent selection (flicks SKIP detents); one arrival register (§1); position-mapped scrim/tint, blur constant; rigid-mask reveal in the TRANSLATE regime vs reveal-ladder in the GROW regime; companions ride + predictively fade; grabber born at first touch | HAS the detent ladder + velocity-decided snap + velocity-continuous re-seat (`components/drawer/composables/useDrawerSnap.ts:94,357-368`; `components/drawer/constants.ts:40` FLING=450) and the detent-graded scrim (`components/drawer/Drawer.vue:28`); CONTRADICTS law 7c on flings — ours advances exactly ONE detent in the drag direction (`useDrawerSnap.ts:361-365`) where iOS projects the target and skips intermediates (measured at 5,900-15,000px/s in a3/a4). Fix: `target = detentNearest(frac + v·τ)`, τ≈0.2s; LACKS companion-ride + predictive fade (no API for sheet-anchored satellites); LACKS the grabber lifecycle (first-touch materialize) |
| **popover / dropdown** | a1 CC module anatomy (anchored glass over medium) — thin exemplar here | anchored growth, no scrim | HAS the anchored menu register (`components/popover/PopoverContent.vue:64-119` glass-reveal, data-reveal="menu"); nothing further taught by these five assets |
| **toast** | a2 banner dismiss — the three-clock exit | exit desync: translate leads (~100ms ease-in after drag take-up creep), opacity trails ~40ms, scrim clears LAST ~70ms; entrance grows from a seed, never slides in from an edge (law 18) | HAS the seed-grown entrance — center-seed transient materialize, explicitly not-a-slide (`components/toast/Toast.vue:80,91-98`); CONTRADICTS law 8 on exit — `glass-reveal-out` is "the enter bloom REVERSED" by design (`styles/animations.css:146-157`): exits must never mirror entries; the corpus exit is fade-led with a trailing scrim beat; LACKS swipe-release velocity inheritance (reka swipe ends on a static translate; the a2 banner inherits a ~1,600pt/s throw) |
| **badge / status chrome** | a1 CC dismiss: status readouts MIGRATE into the status-bar corners while shrinking | migrate-don't-fade (law 17): state relocates as a body, never blinks out | LACKS as a register; the primitive exists — the library already flies elements into chrome (`composables/motion/morph/useDockCtaReceive.ts:1`, `useElementMorph`) but no status-migration consumer contract |
| **carousel** | a2 — the flagship physics exemplar | duration-stable velocity-parameterized snap (τ≈130ms, ζ≥1, v0 absorbed as initial condition, ~200ms sub-2px creep tail); single-channel flight; edge-inset-symmetric snap grammar; asymmetric end rubber band (gain ~0.023pt/(pt/s), compression 4-5x faster than release, never crossing rest) | HAS the calm-overdamped intent — "momentum yes, bounce no" via embla weighty duration (`components/carousel/useCarousel.ts:6-20` CAROUSEL_WEIGHTY_DURATION=30; `components/carousel/CarouselContent.vue:13-14`); BOUNDED: embla's snap is friction-model, duration-stability under varying fling velocity is UNVERIFIED against the τ≈130ms register — a paint-measured check is owed; LACKS the asymmetric rubber-band contract at list ends |
| **pager-dots** | (sibling-asset exemplar; cited for roster completeness) | the goo worm between states | HAS — two-edge lead/trail worm, velocity carried through interrupts (`components/pager-dots/composables/usePagerWorm.ts:4-13`); the liquid-weight edict satisfied here |
| **skeleton** | a4 population: rows land skeleton-first, upgrade in place, never reflow | loading is honest and unperformed; the surface never gates on data (law 17) | HAS the primitive (`components/skeleton/Skeleton.vue:20-27`); NOTE a vocabulary tension: it ships a translating scan-SWEEP (`Skeleton.vue:43-63` skeleton-scan) where SUFFUSION §1.1 swore ONE loading vocabulary — the slow luminance DRIFT; adjudicate at the suffusion build, not here |
| **header-ribbon** | a1 §6: large-title + toolbar blur out in place ~250ms BEFORE the dock collapse fires | header dissolve leads, chrome follows at threshold — two surfaces, staggered thresholds | LACKS — HeaderRibbon is a static toolbar (`components/header-ribbon/HeaderRibbon.vue:18-31`), no scroll coupling; the machine to wire it already exists (`useScrollChrome.ts:1-9` names "a dock, a header") |
| **expandable-container / card growth** | a1 §3 mini↔full player | origin-anchored growth from CURRENT geometry; detuned channels (blur < geometry < artwork ~450ms + soft-bitmap tail); pre-composed chrome revealed, not reflowed; drag/flick dismissal asymmetry | PARTIAL — the growth primitives exist (morph engine, springs) but the detuned three-channel choreography with the trailing-artwork weight signature is not a shipped register (the F3 conductor demand; laws 5, 15) |
| **animated-digit / metric** | a4 live chip swaps ("6.7 mi"→"14 min", no reflow) | late data upgrades IN PLACE; numeric churn damped | HAS (`components/animated-digit/AnimatedDigit.vue:7-11` damped toward target, tabular numerals) |
| **fading-scroll / infinite-scroll** | a2 flight + a1 scroll edges | velocity-linked edge behavior on native scroll shells | LACKS velocity linkage (no velocity reference in the fading-scroll path); SUFFUSION L row already demands it |
| **timeline, combobox, command, tooltip** | — | no exemplar in these five assets | not claimed; other seats own their exemplars |
| **substrates (watercolor-dot / paper-backdrop)** | a5 dot-lattice (provenance: NOT iOS — bank material only) | the restraint floor: static geometry, wandering luminance envelope, asymmetric attack/decay (~0.7s/~3s), +16% peak, slowest visible change wins | PARTIAL — WatercolorDot is static-texture turbulence (`components/watercolor-dot/WatercolorDot.vue:124-147`); no shipped luminance-envelope ambient mode; law 11's cheapest breath-of-life win remains unshipped |
| **app-zoom class (useViewTransition)** | a4 launch/close zooms | rect interpolation icon↔screen, artwork crossfaded at LARGE scale, 1.4x landing overshoot, chrome-drops-first close, live content frame one | HAS the substrate, unconsumed (`composables/motion/core/useViewTransition.ts:1-14`); the zoom grammar itself (law 5's app-zoom clause) has no consumer — N11's theme-flip license is the nearest chartered landing |
| **(unclaimed teach) marquee** | a1/a2 mini-player | dual-line single-clock scroll, ~1s ease-in ramp to ~50pt/s, asymmetric 5pt/10pt masks, offset SURVIVES every container morph (law 17) | LACKS — no marquee primitive exists anywhere in `src/components/`; the state-continuity-through-shape half is the valuable part, whatever the eventual home |

---

## 5. Corrections ledger (this seat's deltas, consolidated)

1. **C-A1** — codex law 7(b) per-detent damping + MARKS-A V3 §1's per-detent-ζ recipe: mechanism VOID; one register (ζ 0.71-0.82, f_d 1.6-2.1Hz) + velocity-bought overshoot (k≈0.02s) explains every arrival. Edge detents DO overshoot when crossed hot (a4 exp60, 30px).
2. **C-A2** — codex law 14(c) + sr-0622-2359 §1: the ~9%/36px CC release overshoot was 12fps aliasing; MEASURED 5.0%/18.9 native px, ζ0.71, f_d1.60Hz. The velocity-eats-overshoot clause becomes the k·v law.
3. **C-A3** — sr-0620-1847 §1: lens travel "≈170ms" downgraded to BOUNDED [84,183]ms; the source recorder drops frames exactly during the transit (one surviving mid-flight frame). One-body vs blink INCONCLUSIVE in this asset; C4's Safari 60fps proof carries the platform claim. NEW: arrival tint lands 15-20% wide and cools ~250ms.
4. **C-A4** — the `.mov` "copy": NOT byte-identical (distinct md5, tail-byte difference); decoded streams MD5-identical. Content duplicate; the campaign's "cmp to confirm" assumption corrected to stream-level identity.
5. **Minor** — a4 population: the sheet body is still empty at t=7.25 (s12-0088); the empty-body beat runs a beat longer than the prior ledger's phrasing (within declared VFR tolerance).
6. **Confirmations banked** (cited, not re-derived): a2 snap τ≈130ms/zero-overshoot/creep tail + rubber-band penetration to the exact frame; a3 medium-arrival overshoot; a4 hold displacement within 1.3%; the a1 three-body collapse overlap at 60fps; the CC displacement rim-light event (extended: in-control color bloom + Sleep-pill aura); status-readout migration mid-flight; a3 grabber absent cold; a5 fully static.
