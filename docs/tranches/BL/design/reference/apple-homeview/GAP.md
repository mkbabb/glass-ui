# O-95 gap: glass-ui against the apple-homeview media dock

Seat: REF/gap, model `claude-opus-5-5` (asserted from own system identity). Runs 2026-10-15 20:55–21:15 EDT. Built and served from my own worktree at HEAD `9219651ed` (`src/` and `demo/` as on master), demo built with `vite build --config demo/vite.demo-dist.config.ts` and served by an in-process static server inside each probe. Headless Chromium 149.0.7827.55 (Playwright), one browser per run, runs strictly one at a time.

**Load.** 1-min load average 7.3–16.8 across every run (per run in `gap/data/summary.json` → `load`, start and end). The rAF sampler held a median frame interval of 7.7–8.7 ms (120 Hz) in every run; p95 ≤ 10.6 ms except the deck runs (p95 23 ms, a few dropped frames during the 3-D turn).

**Guard.** The demo build first queued as a heavy run and sat 32 min unadmitted at load 13 (the three heavy slots held by other repos' 20–90 min runs). I cancelled it and ran the build (1 s) and every probe (one browser, 10–25 s) with `guarded --light --rss-gb 4|6 --timeout 4|15`, the re-measure seat's precedent. Still contained, still serial.

**Reference values** are the AGREED rows of `REMEASURE.md`. Where it disagrees with `STUDY.md` I use the re-measured value and say so: P-07/P-08 (the pill is visible under the blob from 0 ms), P-22 (dot click 29.9–30.2 ms re-measured against the study's 50–55), P-32 (the fling differs only by gesture).

## 0 · Instruments, and what changed between passes

| Tool (`gap/tools/`) | What it does |
|---|---|
| `probe.mjs <scenario> <run> [W H]` | one headless Chromium over the built demo; a per-rAF sampler records `getComputedStyle`/`getBoundingClientRect` of the strip (`scrollLeft`), every member (`data-state`, `scale`, `opacity`, content `translate`), the pager worm (both bodies, the neck, `--stretch`, `aria-current`), every bed pip's `::before` (scale, colour), the ring, the visible `.glass-dock`, `<main>`'s `scrollTop`, and the running-animation count. 17 scenarios |
| `analyze.py` | motion segments (latency, duration, settle to 0.5 px, overshoot), cubic-bézier fits (normalised RMS), worm shape, drag legs, resize, deck turns → `data/summary.json` |
| `contact.py` | the worm contact sheet |
| `run-all.sh`, `run-2.sh`, `run-3.sh` | the three serial passes |

Re-run: `sh tools/run-all.sh && sh tools/run-2.sh && sh tools/run-3.sh`, then `python3 -I tools/analyze.py` (set `GAP_DIST` to a built `dist-demo`).

Pass 1 found two instrument faults, both fixed before the numbers below were taken:
- The demo hero's strip never moved on a dot click or an autoplay tick. That is a glass-ui defect (CR-01), not an instrument fault, so pass 2 drove the library's working programmatic path instead: `CarouselPager` Next → `deck.next()` → `useDeckSnap.scrollTo(…, "smooth")`, and a direct `scrollTo({behavior:"smooth"})` on the hero strip (the same call `useDeckSnap.ts:149-153` makes).
- On a touch release the demo's frame gets `pointerleave`, which restarts its 4200 ms autoplay (`demo/stories/navigation/carousel.vue:92-95`). Its ticks landed inside the drag legs. Pass 3 blocks that one demo timer in the drag scenarios (an init script; no library code touched). Every drag number below is from pass 3.
- The first pass also read a hidden sidebar dock and `window.scrollY`; the demo scrolls `<main>`. Pass 2 reads the largest visible `.glass-dock` and `<main>.scrollTop`.

Two runs per scenario (r1, r2) unless stated. Every raw run is `gap/data/<scenario>-<run>-<width>.json.gz`.

Stills (lean, 1.2 MB for the whole `gap/` tree):
- `gap/frames/click-dot4-r1-1440.png`: dot 5 active while slide 1 is on screen (CR-01)
- `gap/frames/worm-hop-1to5-sheet.webp`: the worm 13–95 ms into a 1 → 5 hop, the neck wider than the ring (P-18)
- `gap/frames/rest-r1-1440.png`, `rest-r1-390.png`, `dark-r1-1440.png`: the pager at rest

## 1 · The two surfaces side by side

| | apple-homeview `#aap-highlights` | glass-ui |
|---|---|---|
| What it is | a sticky media dock: a frosted pill of 7 timed dots (the active one a 48 px capsule with a progress fill) beside a 56 px play/pause disc, entering on a one-shot spring choreography | `PagerDots` (an inline 152 × 32 ring of 12 px pips with a three-mass worm) composed under a `Carousel` by the consumer; `CarouselPager` (chevrons + counter); no transport, no timed state, no entrance; the shell's `GlassDock` is a navigation dock (D2's) |
| Strip motion | programmatic: 1 s easeInOutQuad tween of `scrollLeft`; touch: native snap | programmatic and touch: native snap, `scroll-snap-stop: always`, smooth `scrollTo` |
| Indicator coupling | the capsule is a pure function of `scrollLeft` | the worm is a spring driven by the committed index |

## 2 · Property by property

Witness engines: every witness names its Chromium expectation and its WebKit expectation. Native scroll curves (snap, fling, smooth `scrollTo`) are engine-specific; their WebKit cells are stated as "measured separately, not inherited" (Playwright WebKit ≠ Safari, and real Safari is UNMEASURED until the owner's safaridriver checkbox).

### 2.1 Geometry and material (P-01 … P-03, P-37)

| ID | Reference | glass-ui (measured) | Verdict | Cause at source · witness |
|---|---|---|---|---|
| P-01 | pill 240 × 56, button 56 × 56, gap 16, radius 28, group 312 centred, sticky `bottom: 32` | PagerDots ring 152 × 32, radius pill, pip 12, hit cell 24, pitch 28, `position: relative` in flow under the strip (rest r1, r2). No transport disc. The shell `GlassDock` (834 × 900) is 676.8 × 56 at bottom 12, fixed in the shell (`dock-scroll` r1, r2) | ABSENT (a media dock) | No component composes the dots with a transport: `carousel/index.ts:1-4` exports Carousel, Content, Item, Pager only. → **CR-02**. Witness: a carousel media dock renders a dots pill and a transport disc as one sticky group; at 1440 the group stays at its sticky inset while `<main>` scrolls 0 → 700 px (Δy ≤ 0.5 px), Chromium and WebKit alike |
| P-02 | 390: pill 216 × 56, gap 12, capsule 32 | ring 144 × 32, pip 8 (`--space-body` = .5rem below 768 px) | ABSENT | as P-01 |
| P-03 | `blur(7px)`, `rgba(232,232,237,0.72)`, no border, no shadow | ring: `blur(20px) saturate(1.5)`, fill `srgb(0.204 0.148 0.083 / 0.18)`, **four** shadow layers (three 1 px inset rims + `0 2px 6px -2px` at 0.22). Shell dock: plate `blur(16px) saturate(1.2)`, fill `/0.10`, 1 px border at 0.08; root three inset rims + a `0 0 20px` halo at 0.14 | SHORT | O-87 rules here (flatter, slightly less blur, no stacked shadows or glow halos), and Apple's flat 7 px material points the same way. Cause: `styles/glass/surfaces-pager.css:42-43` (`@apply glass-plate` on the floating veil) and its box-shadow; the shell dock's halo is D3's census item. → **D3** (W-0.11 lighting tokens; floor v3 R-5 already reads the dock census stacked = 0, halo = 0). Witness: the ring and the dock root carry ≤ 1 shadow layer and no `0 0 Npx` halo; backdrop blur at or below the W-0.11 rung; computed-style read in both engines. The fill alpha (0.18 vs 0.72) is D3's translucency register, not an O-95 ruling |
| P-37 | no dark scheme | a dark arm: ring fill `/0.22`, rim at 0.08, drop shadow at 0.30 (`dark` r1, r2) | EXCEED | a dark arm exists; its four-layer shadow is P-03's SHORT |

### 2.2 The init animation (P-04 … P-15, R-01, R-02, R-07)

Measured (`enter`, 4 runs at 1440 and 834): the hero scrolled into view from above at 300 px/s (`<main>` 0 → 324 / 400 px). The ring's size took **one** value over 487–493 frames. The running-animation count stayed at 7–9, all of them scroll-timeline animations already running at rest (the dock caps `dock/styles/run.css:516-523` and FadingScroll's fades). The worm moved only when the demo autoplay ticked (`aria-current` 0 → 1). Nothing enters.

| ID | Reference | glass-ui | Verdict | Cause · witness |
|---|---|---|---|---|
| P-04 | one-shot at `galleryTop − 100vh + 0.6·galleryH`; same timeline at any speed; no replay | no entrance on the pager, ring or dock. The library's only scroll-entry register is `.scroll-cascade` (`styles/scroll-choreography.css:80-…`), a `view()` timeline scrubbed 1:1 with scroll (not fired, not sprung) and not applied to the pager | ABSENT | → **CR-03** (the dock's entrance). Witness: crossing a threshold fires one timeline; the ring's width, the rise and the material change over ≥ 1.0 s after the threshold frame, and the timeline is identical at 300 and 6000 px/s (curves within 0.5 px); scrolling out and back replays nothing. Same expectation in WebKit (a JS-sprung or WAAPI timeline is wall-clocked) |
| P-05 | rise 180 → 0, ζ 0.41, ω₀ 10.4, peak −43.2 px (24 %), settle 1.42–1.44 s | none | ABSENT | CR-03. **Edict conflict**, see §4 |
| P-06 | first pixel 170–172 ms (slow entry) | none | ABSENT | CR-03 |
| P-07 / R-01 | blob 30 × 80 × 1.3 and the opaque pill bg (40 × 36 × 1.3) overlap from frame 0 (re-measure; the study's "single blob" disagrees); union is the two-lobed goo of 120–300 ms; blob hidden 527–548 ms | none | ABSENT | CR-03 |
| P-08 | pill width spring onset 515–524 ms, peak 269.2 (14.6 %), settle 1.63 s | none | ABSENT | CR-03 |
| P-09 | button buds: bg scale 0 → 1 (critical) while sliding −128 → 0 | none (no button) | ABSENT | CR-02, CR-03 |
| P-10 | no metaball filter; continuity by colour, size, centre | the worm is filterless too: a {circle, rect, circle} union (`PagerDots.vue:12-20`, `:550-556`); 0 `filter` on the ring and masses | MATCH | — |
| P-11 | dots slide 36 → 0 (k200 c20, −0.7 px), stagger 20 ms, fade 100 ms | no dot entrance. The bed has a stagger, but only for a window slide (`PagerDots.vue:163-191`, `--pager-flip-stagger`) | ABSENT | CR-03 |
| P-12 | capsule opens 8 → 48.8 → 48 (k200 c20) | no capsule (P-16) | ABSENT | CR-03, CR-04 |
| P-13 | glyph fades at 938–956 ms, scale 0.5 → 1 by 1.14 s | no glyph | ABSENT | CR-02 |
| P-14 | material frosts in: blur 14 → 7, fill α 1 → 0.72 (critical) | material is constant from first paint | ABSENT | CR-03; the frosting is a material channel, so D3 rules its token (no new lighting layer) |
| P-15 | the stated springs re-simulated reproduce the page to ≤ 0.35–0.52 px | not applicable (a method row). glass-ui's worm integrates the governed `dock` row (`response 0.3, ζ 0.88`, `springPresets.ts:84-90`) by semi-implicit Euler, 8 substeps (`useLeadTrail.ts:205-216`) | N/A | — |
| R-02 | the blob → pill hand-off carries size, not velocity (width velocity reverses at the swap) | the worm's elongation is its velocity by construction (`useLeadTrail.ts:19-26`): the trail edge is `lead − clamp(v·τ, ±ceil)`, zero gap the frame the lead lands. But on a retarget the elongation band is recomputed from the new span, and the bodies' midpoint steps back: −724 / −862 px/s for one frame (≈ −6 px) at the retarget, then +350 … +850 px/s (`retarget` r1, r2) | EXCEED (C1 by law), with a one-frame step at retarget | the step: `worm.ts:170-173` and `:236-240` (span re-read on drive). → **W-F.3** (offsets bounded by position; it already carries the worm's trail law, R3-01-03). Witness: across a retarget the bodies' midpoint velocity keeps its sign for ≥ 3 frames when the new target is further in the same direction; both engines (rAF-driven, engine-independent) |
| R-07 | no intro on a narrow non-touch window | — | N/A | — |

### 2.3 The active indicator (P-16 … P-20, R-03, R-05)

| ID | Reference | glass-ui | Verdict | Cause · witness |
|---|---|---|---|---|
| P-16 | capsule 48 vs dot 8 (6×) at ≥ 735 px; 32 vs 8 at ≤ 734 | active indicator at rest **12 × 12 vs pip 12** (1×) at 1440; 8 vs 8 at 390. Active and inactive differ by colour only (opaque vs 52 %) | SHORT | `worm.ts:226-234` seats both bodies on one centre; the neck is `opacity: 0` at rest (`PagerDots.vue:553-556`). No resting length exists. The owner's frame shows the capsule. → **CR-04**, riding **W-E.12** (it already re-reads the worm's dot as a measured length). Witness: at rest the active indicator is ≥ 3× the pip's width at 1440 and 390 (the reference is 6× / 4×); the sum of painted widths across the rail is constant (± 0.5 px) through a hop; computed in both engines |
| P-17 | width = 8 + 40·max(0, 1 − abs(i − p)), p = scrollLeft / pitch, one-frame lag; dot sum constant | the worm follows the committed index (`worm.ts:243-245`, `watch(active)`). `useDeckSnap.ts:103-112` publishes a continuous `deck.position`, and `PagerDots` never reads it. Measured: **0 frames** of worm motion during every drag (12 legs); the worm starts 38–98 ms after release and runs its own 260–271 ms clock (`drag-*` pass 3) | SHORT | → **CR-05**, riding **W-F.3** ("an offset bounded by position"). Witness: under a 1.5 s drag the worm's centre tracks `position` (error ≤ 0.05 pitch per frame; the reference error is ≤ 0.005 px of law); release-to-rest the worm and the strip land within one frame of each other. Chromium and WebKit (WebKit's touch scroll is N/A in Playwright: a pointer-scrub cell instead) |
| P-18 | linear width trade, ≤ 2 enlarged, no worm; jumps sweep intermediates | a real worm: two bodies and a neck, elongation ∝ velocity, `--stretch` peak 1.158 (1 hop) / 1.198–1.200 (3–4 hops), height squash to 1/stretch, 0 px overshoot, 254–280 ms per hop whatever its length (`click` r1, r2; `worm-hero` r1, r2). **But the neck paints 300.3–300.6 px (1 hop), 739.2 (3), 985.6 (4) wide on a 152 px ring** (`gap/frames/worm-hop-1to5-sheet.webp`: a black bar wider than the ring for the hop's first 95 ms) | EXCEED in design, SHORT in paint | The neck's span is `gap / D` with `D = parseFloat("0.75rem") = 0.75` (`worm.ts:134-135`, `:213-215`). Already owned: **W-E.12** (F-36, G-33); its own reading (300.6 px) reproduces here. Witness (W-E.12's G-33): neck width ≤ hop + 2·pip (76 px for one hop at 1440); both engines |
| P-19 | outgoing fill vanishes at `.current` change | no fill | ABSENT | CR-06 |
| P-20 | fill 18.70 %/s of the link, linear, 0 → 115 % in 6.15 s | no timed state anywhere in carousel, pager-dots or deck. The demo's autoplay is a local `setInterval(4200)` (`carousel.vue:56-76`) | ABSENT | → **CR-06**. Witness: a playing carousel's active indicator carries a progress fill whose painted width rises linearly (residual ≤ 0.1 px over 2 s) at dwell⁻¹ of the link; paused, it is frozen to the frame; both engines |
| R-03 | the full capsule holds static 510–525 ms before each switch (dead time) | — (no fill) | N/A | CR-06's witness adds: the hold between fill end and the advance ≤ 1 frame |
| R-05 | after a resize the capsule shows the wrong length for 276–296 ms | the strip re-snaps and the worm re-seats **in the same frame**, 5–9 ms after each resize (1440 → 1000 → 600 → 1440; `aria-current` 2 throughout; `resize` r1, r2) | EXCEED | — |

### 2.4 How the carousel moves (P-21 … P-27, P-31 … P-36, R-06, R-08)

| ID | Reference | glass-ui | Verdict | Cause · witness |
|---|---|---|---|---|
| P-21 | every programmatic move: 1 s easeInOutQuad, bézier ≈ (0.477, 0.054, 0.522, 0.948), 0 overshoot | Chromium's smooth `scrollTo`, distance-scaled: hero 405 px in 304–312 ms, bézier (0.38–0.42, 0.00–0.04, 0.01–0.02, 0.95), peak 5000–5114 px/s; two members back in 448–459 ms; peek 145 px in 179–191 ms (`smooth`, `pager-next` r1, r2). 0 px overshoot everywhere | MATCH (a tween, no overshoot; 3× faster for one member) | The curve is the engine's: WebKit's smooth scroll is measured separately, not inherited |
| P-21a | (no reference counterpart: a multi-member jump lands on its target) | `scroll-snap-stop: always` truncates programmatic smooth jumps: `scrollTo(4·pitch)` from member 1 landed on member 2 (804 of 1620 px, 4 cases); the peek strip's `scrollTo(580)` landed 435 (2 runs) | SHORT (defect) | `carousel/styles.css:41` against `useDeckSnap.ts:143-153`. Latent today only because nothing issues a multi-member `deck.go` on a Carousel (CR-01). → **CR-01**. Witness: `deck.go(4)` from 0 lands at 4·pitch ± 1 px and `aria-current` = 4, in Chromium and WebKit |
| P-22 | `.current` → motion 22–27 ms; dot click → motion 30 ms (re-measured; study 50–55) | dot click → worm first motion 8–26 ms, `aria-current` 6–14 ms (`click`, `worm-hero`); Pager Next → strip first motion 34–46 ms (`pager-next`, `reduced`) | EXCEED (worm) / MATCH (strip) | — |
| P-23 | a click during a move is dropped | accepted. Worm: click 2 then click 4 at +250 ms lands on 4 with the live velocity carried. Strip: Next ×3 at 120 ms lands three members on (580 px); the velocity dips to 337–417 px/s between presses and re-accelerates, never to 0 (`retarget`, `pager-next`). **Deck turn**: ArrowLeft at +250 ms into a turn reverses the slide in one frame, −2516 → +1917 px/s (r1); the CSS transition restarts from the current value with zero carried velocity | EXCEED (worm, strip) / SHORT (deck: momentum break) | deck: `deck/styles/turn.css:97-100` (transform transition on `--spring-world`). Apple drops the input, so this is short only against the liquid-weight edict. → **W-F.2** (W-INTERRUPT; it already carries the disclosure's restart-from-`from` class, R4-01-02). Witness: on a reversal the slide's velocity changes by ≤ 1.5× its pre-reversal magnitude across the reversal frame (no sign flip in one frame); both engines (CSS-transition engines differ: measured separately) |
| P-24 | one slide / 6.65 s; no wrap; replay rewinds | no library autoplay; the demo's ticks every 4200 ms and wraps (`% swatches.length`), and **moves only the dots** (CR-01). No wrap in the library (`useCarousel.ts:12-13`) | ABSENT (autoplay) / MATCH (no wrap) | CR-06 |
| P-25 | slides flat: translate only | hero `projection="travel"`: member scale 0.965–1.000 (`MEMBER_SCALE_DROP` 0.035), neighbours at opacity 0.7 on `[data-state]` | EXCEED (a projection exists; Apple's is flat) | — |
| P-26 | caption parallax 162 px per slide, cross-fade | the interior content lag (LAW 3): `translate` up to the 8 % ceiling (≈ 31 px on a 389 px member) in flight. **At rest the lag holds**: residues 0.09–2.73 % (≈ 0.4–10.6 px) stay on the members after every move (`smooth`, `drag-fling` r1, r2) | EXCEED in kind, SHORT at rest | `useDeckSnap.ts:103-112` feeds velocity on `scroll` only; nothing feeds 0 at `scrollend`. Already owned: **W-F.3** (R3-01-02). Witness (W-F.3's): content `translate` reads 0 within one frame of `scrollend`; both engines |
| P-27 | dock glass static during moves | ring size and material constant through every move (one value in every run) | MATCH | — |
| P-31 | 1:1 after ~15 px slop; capsule scrubbed | 117 px finger → 103–107 px scroll (10–14 px slop) (`drag-fling` pass 3). Worm not scrubbed (P-17) | MATCH (strip) / SHORT (indicator) | CR-05 |
| P-32 | release velocity sets the landing (native): the study's 1600 px/s fling → two slides; slow release snaps back in 185–198 ms | every fling lands **one** member (12 legs, release velocity 405–1140 px/s, settle 230–367 ms, 0 overshoot); a slow 30 % release snaps back in 181–193 ms (bézier (0.41–0.44, −0.01–0.09, 0.56–0.60, 0.87–0.96)); a 62 % release advances in 211–233 ms | MATCH (snap-back) / SHORT (landing velocity) | `carousel/styles.css:41` `scroll-snap-stop: always`, chosen on purpose (`CarouselContent.vue:12-13`). The study's two-slide landing is impossible by construction. My flicks were 193–231 ms long, not the study's 100 ms. This is an owner call (§4), **CR-07**. Witness (if ruled for velocity): a 1600 px/s fling lands ≥ 2 members at 390 in Chromium; WebKit measured separately |
| P-33 | no JS rubber-band | none either: a 200 px overpull at member 0 left `scrollLeft` 0 and the member at x 32 (`overscroll` r1, r2) | MATCH | rubber-band is the platform's on iOS Safari (UNMEASURED) |
| P-34 | at rest only the fill moves; paused, still | at rest nothing in the carousel changes over 4 s (`scrollLeft`, worm, stretch: one value each); 8 running animations, all scroll-timeline (not time-driven) | MATCH (paused) / ABSENT (no state-bearing rest motion) | CR-06 |
| P-35 | resize: instant re-snap | re-snap in one frame (796 / 872 / 799 px) | MATCH | — |
| P-36 | reduced motion: no intro, instant slide change, integer capsule, no autoplay until pressed | the worm seats in one frame (7–14 ms, stretch 1.000, 0 neck frames): MATCH. **The strip still smooth-scrolls**: Pager Next 179–180 ms, `scrollTo` 288–301 ms (`reduced` r1, r2). The demo's autoplay does stop under reduce | SHORT (strip) | `useDeckSnap.ts:143` defaults `behavior = "smooth"` and `:169` passes nothing; an explicit `behavior` overrides `carousel/styles.css:71-73` (`scroll-behavior: auto` under reduce). → **CR-08**, riding **W-F.5** (it already rewrites `useDeckSnap`'s offset reads). Witness: under `prefers-reduced-motion: reduce` a Next press moves `scrollLeft` to its target in one frame; both engines |
| R-06 | user motion pauses autoplay; `.current` flips mid-drag at the 50 % crossing | the commit waits for release: a slow drag crossed the half-stride 346–365 ms before release and `aria-current` flipped 29–36 ms **after** release; flings commit 38–98 ms after release (`scrollsnapchange`). The demo's autoplay restarts on the `pointerleave` a touch release fires | SHORT | `useDeckSnap.ts:114-121` (commit on `scrollsnapchange` only). → CR-05 (an indicator on `position` makes the commit's timing invisible); the demo's pause rule rides CR-06. Witness: under a held drag past 50 % the indicator has moved ≥ 0.5 pitch before release; both engines |
| R-08 | no scroll coupling on the stuck dock | the shell dock's rect is constant (676.8 × 56 at y 832) while `<main>` scrolls 0 → 738 px at peaks of 11 940–14 035 px/s (`dock-scroll` r1, r2) | MATCH | O-88's scroll compact is D2's (the shell dock runs `collapse=false`) |

### 2.5 Engagement on the controls (P-28 … P-30)

| ID | Reference | glass-ui | Verdict | Cause · witness |
|---|---|---|---|---|
| P-28 | button hover 92–96 ms bg fade, press 90 ms, no scale | no transport button | ABSENT | CR-02 (its press and hover belong on D5's ladder: the `pressed` class) |
| P-29 | glyph swap by `display`, one frame | no glyph | ABSENT | CR-02. A morphing play ↔ pause glyph would EXCEED; that is a D5 `pressed`/`chosen` rung |
| P-30 | dot hover `.42 → .54` alpha, 241 ms linear, no scale | pip hover: alpha 0.52 → 0.72 **and** scale 1 → 1.14 in 188–192 ms; press 0.97 squish; release back to 1.14 in 115–121 ms (`hover` r1, r2) | EXCEED | The press attribute is written outside the engagement register (`PagerDots.vue:361`, `data-press`): **D5** CK-08 already lists it |

## 3 · The owner's three words, on glass-ui as a whole

**Goo.** The worm is the only goo glass-ui shows, and it is a better design than the reference. Apple's hand-off is a linear width trade between two dots with no shape between them (P-18). Its entrance goo is two same-colour shapes overlapping, with a velocity break at the swap (R-01, R-02). glass-ui's worm elongates with its own velocity (`--stretch` 1.158 on one hop, 1.200 on three or four), squashes its height to 1/stretch, and closes to zero gap the frame it lands, with 0 px overshoot. Two things undo it in paint:
- **The neck.** It is 300 / 739 / 986 px wide on a 152 px ring (W-E.12), so for the first ~95 ms of every hop the owner sees a black bar across the whole rail, not a worm (`worm-hop-1to5-sheet.webp`).
- **No resting capsule.** At rest the active dot is the same 12 px circle as the rest. The owner's frame shows a 48 px capsule (P-16).

The shell dock's stretch between states is D2's morph, not measured here. Verdict: the worm design EXCEEDS; the shipped paint is SHORT until W-E.12 lands and CR-04 gives it a resting length.

**Breath of life.** Idle, glass-ui's carousel and pager are still: 0 changed values over 4 s. That matches Apple's paused dock and honours O-87's ban on stateless shimmer. Engaged, glass-ui is livelier than the reference: pip hover with growth (×1.14 in 190 ms against Apple's colour-only 241 ms), a press squish (0.97), member scale and opacity projection, an interior content lag. Apple's one living motion at rest is state-bearing: the linear progress fill (18.70 %/s) of a playing slide. glass-ui has no timed state at all (CR-06), so a glass-ui carousel never shows "playing". The entrance (P-04 … P-14) is the reference's largest piece of life, and glass-ui has none (CR-03). Verdict: engaged EXCEED, idle MATCH, state-bearing rest motion and entrance ABSENT.

**Movement of momentum.**
- **Release.** Release velocity is the platform's, as in the reference: the strip tracks the finger after 10–14 px of slop. `scroll-snap-stop: always` caps every fling at one member, against Apple's two (P-32, an owner call). Slow releases snap back in 181–193 ms (Apple 185–198).
- **Rubber-band.** None in Chromium either way (P-33).
- **Retarget.** glass-ui accepts every retarget and carries velocity, on the worm (spring state carried) and on the strip (velocity dips to ~340 px/s, never 0). Apple drops the input (P-23).
- **Breaks.** Three remain. The deck turn reverses in one frame (−2516 → +1917 px/s, W-F.2). The worm's midpoint steps ~6 px at a retarget (R-02, W-F.3). The content lag never returns to 0 at rest (P-26, W-F.3).
- **The indicator.** It carries no momentum from the hand: it ignores the drag and moves only after the commit, on its own clock (P-17, R-06).
- **Bounce.** No glass-ui path overshoots: every fit reads 0.00 px. Apple's entrance bounces 24 % (rise) and 14.6 % (pill).

Verdict: release MATCH, retarget EXCEED, indicator coupling SHORT, bounce SHORT against the edict (see §4).

**The defect under all three.** In the demo the dots and the slides disagree. `v-model:active` written by the pager or by autoplay never reaches the strip (CR-01), so the hero shows "Warm Cream" under dot 5 (`click-dot4-r1-1440.png`).

## 4 · Where a reference property meets a ruled edict

| Property | Edict | Which rules, and why |
|---|---|---|
| P-03 material: blur 7 px, no shadow, fill 0.72 | O-87: iOS-27 material, flatter, slightly less blur, no stacked shadows or glow halos | They agree on lighting: Apple's flat, unshadowed 7 px material is O-87's direction, so the SHORT is real and D3 cures it. Apple's near-opaque fill (0.72) is not O-87's: O-87 keeps the iOS-27 material, and the fill alpha stays D3's translucency register. O-87 rules on fill |
| P-05 / P-08 / R-04: entrance overshoot 24 % and 14.6 % (ζ 0.41–0.52) | liquid weight (inertia, weight, **bounce**) vs the spring table's own law: "exactly one row rebounds … liveliness belongs to the LIGHT channel, never to a geometry bounce" (`springPresets.ts:55-57`; `panel`, ζ 0.71, ≈ 4.2 % overshoot) | The owner's edict outranks a library comment, but the spring table is W-F.1's sealed register. Ruling needed (**Q-CR-1**): (a) the entrance rides `panel` (≈ 4 %, inside the table); (b) a new fired `entrance` row near ζ 0.45 admitted to the table by W-F.1. This seat recommends (b) for the entrance only: it is a one-shot fired event, and the edict names bounce. Travel stays dead-landing |
| P-14 / P-34: the frosting-in and the fill at rest | O-87 bans "idle shimmer that carries no state"; breath of life wants engagement at rest | Both reference motions carry state (entering; time left on the slide), so neither is O-87's shimmer. They are admissible. D5's E-6 (S6 RETIRE) stays the owner's on stateless breathing |
| P-32: one member per fling (`scroll-snap-stop: always`) vs Apple's velocity-chosen two | liquid weight: momentum carried to the landing | Unruled. glass-ui chose one member per flick on purpose (`CarouselContent.vue:12-13`), and iOS Photos pages one at a time. **Q-CR-2**: keep `always` for single-card heroes, or drop it so release velocity picks the landing. Either way P-21a (programmatic jumps truncated by `always`) must be cured |
| P-23: retarget refused | liquid weight: interruption hands its velocity on | The edict rules: glass-ui's acceptance EXCEEDS the reference, and the deck's one-frame reversal is SHORT against the edict, not against Apple |
| P-16 capsule | the pager's sole-carrier contrast law (opaque worm, 3:1; `PagerDots.vue:26-30`) | No conflict. A length cue adds a second carrier; the opaque ink stays |

## 5 · Routing

Loop-owned rows (each loop already has the mechanism; this report adds the reference reading):

| Row | Loop / wave | Reading added here |
|---|---|---|
| P-03 (ring and shell-dock lighting) | **D3**, W-0.11 | ring: 4 shadow layers, blur 20 px; shell dock root halo `0 0 20px` at 0.14, plate blur 16 px |
| P-18 neck width | **W-E.12** (F-36, G-33; no loop) | 300.3–300.6 / 739.2 / 985.6 px on 1 / 3 / 4-pitch hops, 2 runs; the stills |
| P-26 lag at rest, R-02 midpoint step | **W-F.3** (R3-01-02, R3-01-03) | residues 0.09–2.73 %; −724 / −862 px/s one-frame step |
| P-23 deck reversal | **W-F.2** | −2516 → +1917 px/s across one frame |
| P-30 `data-press` second writer, P-28 transport press | **D5** (CK-08; a `pressed` member when CR-02 lands) | — |
| R-08 scroll compact | **D2** (O-88) | the shell dock is static under 14 000 px/s scroll |

Proposed carousel rows. No loop owns them; each names the wave it would ride:

| Row | What | Rides | Witness (summary; full in §2) |
|---|---|---|---|
| **CR-01** | `Carousel`'s `v-model:active` written from outside (pager, autoplay, consumer) never reaches the strip: `Carousel.vue:24-26` and `useCarousel.ts:35-47` hold no `active → deck.go` path. And `scroll-snap-stop: always` truncates programmatic multi-member `scrollTo` (P-21a) | no wave carries it; nearest **W-F.3** (it already edits `useDeckSnap`/`CarouselContent`). A defect, so it could also ride band 0 as a disease row (owner placement) | a dot click on the hero moves `scrollLeft` to index·pitch ± 1 px within 1 s and the slide under the active dot is the dot's slide; `deck.go(4)` from 0 lands on 4; both engines |
| **CR-02** | a carousel media dock: the dots pill plus a transport disc as one sticky glass group | none; a new composition over PagerDots + Button. Owner placement (a band-E row beside W-E.12) | P-01's witness |
| **CR-03** | the dock's one-shot entrance (rise, the pill from a blob, the button budding, the dots and capsule, the material settling) on governed springs | **W-F.1** for the spring row (Q-CR-1), **W-E.12** for the pager's part; the dock's part is D2's material if the owner places the media dock under D2 | P-04's witness |
| **CR-04** | a resting capsule: the active indicator has a length | **W-E.12** | P-16's witness |
| **CR-05** | the indicator reads the strip's continuous `position` when composed in a carousel (scrubbed under the finger, landing with the strip) | **W-F.3** | P-17's and R-06's witnesses |
| **CR-06** | timed state: autoplay with a progress fill, paused on any user motion (touch release included), no dead hold | none; owner placement (an autoplay preset in consumers vs a library register is the "presets in consumers" question) | P-20's and R-03's witnesses |
| **CR-07** | velocity-chosen landing (Q-CR-2) | **W-B.15** (decide scroll glide) | P-32's witness |
| **CR-08** | the strip's programmatic scroll honours reduced motion | **W-F.5** | P-36's witness |

## 6 · Gaps

- Chromium headless only (machine law). Every WebKit and Safari cell above is an expectation, not a measurement. Native scroll curves (P-21, P-32, P-33) will differ in WebKit.
- The study's 1600 px/s, 100 ms fling was not reproduced: my CDP touch legs ran 193–231 ms. Release velocities were 405–1140 px/s.
- The library has no programmatic multi-member carousel path (CR-01), so P-21's long jumps were measured with a direct `scrollTo` on the strip, not through `deck.go`.
- The shell `GlassDock`'s morph, collapse and press were not measured: D2's harness owns them. Only its rest material and its response to page scroll were read.
- `CarouselPager`'s chevron buttons and the deck's own pager were not measured for hover or press.
- The worm stills are wall-clock screenshots (each labelled with the page time at its request); the numbers come from the rAF samples.
- Load was 7.3–16.8 (1-min) against the study's 9.6–12.3 and the re-measure's 12.2–25.9. Frame intervals held at 120 Hz.
