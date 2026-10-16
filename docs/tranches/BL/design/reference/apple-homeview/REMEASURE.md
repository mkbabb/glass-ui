# O-95 independent re-measure: apple.com/apple-homeview media dock

Seat: REF/remeasure, model claude-opus-5-5. Runs 2026-10-15 19:30–20:15 EDT, headless Chromium (Playwright, `chromium_headless_shell-1228`), one browser per run, runs strictly one at a time. The study's numbers were not read until every property below had been measured; before that only the P-01…P-37 names and the study's tool file names were read. No study tool was imported.

**Load.** 1-min load average 12.2–25.9 across my runs (stated per run in `remeasure/data/summary.json` → `load`, and in every raw file's `meta`). The study ran at 9.6–12.3. The rAF sampler held a median frame interval of 8.2–8.6 ms (120 Hz) in every run, p95 ≤ 10.7 ms, so the higher load did not cost frames.

**Guard mode.** Every browser run went through `~/.claude/guard/guarded --light --rss-gb 4 --timeout 3|4`. The first run was queued as a heavy run; the machine's three heavy slots were held by 20–45 min runs from other seats, and after 17 min in the queue I cancelled it and ran each probe (one headless browser, 10–40 s) in light mode, still contained and still serial.

## Instruments (all mine, under `remeasure/tools/`)

| Tool | What it does |
|---|---|
| `discover.mjs`, `anatomy.mjs`, `gallery-anatomy.mjs` | locate `#aap-highlights`, dump its subtree with computed styles (incl. `::before/::after`) before and after activation, find the gallery's scroll mechanism |
| `cssrules.mjs` | extract the authored rules and keyframes matching the dock (`data/aap-rules.txt`, `data/css-rules.txt`, with stylesheet URLs, byte counts, sha256) |
| `probe.mjs <scenario> <run> [W H]` | one browser; installs a per-rAF sampler (`getComputedStyle` + `getBoundingClientRect` of the AAP, blob, both bubbles and backgrounds, button, glyph, 7 dots incl. `::after` width, `--autoplay-progress`, `--progress-intro`, `scrollLeft`, 3 captions); 21 scenarios |
| `filmstrip.mjs` | stills under a slowed clock: page `performance.now`, rAF timestamps, `Date.now` and `setTimeout` at 1/20 speed, CSS animations at playback rate 1/20 via the CDP Animation domain; each still logs the page-time it shows |
| `intro_table.py`, `springfit.py`, `tweenfit.py`, `xsprings.py` | per-frame intro channels (CSV), blind damped-oscillator fits, cubic-bézier fits, bubble/dot x fits |
| `integrator_check.py` | re-simulates the study's stated springs (semi-implicit Euler, mass 1, dt 1/60 s, **no** render interpolation) against my curves, onset the only free parameter |
| `carousel.py`, `drag.py`, `states.py`, `variants.py`, `extras.py` | tweens, capsule law, fill rate, captions, latency; touch legs; hover/press/pause/idle; resize/reduced/dark; event times, hand-off continuity, slide flatness |
| `aggregate.py` | runs the analyses over every run → `data/summary.json` |
| `run-all.sh`, `run-extra.sh` | serial drivers |

Raw runs are `data/<scenario>-<run>-<width>.json.gz` (gzipped after analysis; `gunzip data/*.json.gz` before re-running the Python tools). Re-run: `sh tools/run-all.sh && sh tools/run-extra.sh`, then `python3 -I tools/aggregate.py`, `python3 -I tools/extras.py`, `python3 -I tools/xsprings.py`, `python3 -I tools/integrator_check.py`.

Stills: `frames/film-f1-1440.webp` (contact sheet, 24 tiles, 0–1800 ms page time, crop 460 × 288 at 2×; tiles in `frames/film-f1-1440/` with `log.json`). The slowed-clock stills agree with the real-time samples (e.g. rise −42.24 px at 380 ms on the film vs −41.87 at 352 and −43.15 at 377 ms live). Rest and state stills: `frames/<scenario>-<run>-*.png`. No Apple media stored.

Anchor: my intro times are ms from the first sampled frame carrying `.activated`. The study anchors to its enter event. The two can differ by about one frame.

## Tolerances

| Kind | Tolerance | Why |
|---|---|---|
| Geometry, colour | ±0.5 px; colour string equal, alpha ±0.005 | layout is integer or half-pixel at rest; colours are computed strings |
| Intro event onsets | ±20 ms | anchor difference (≤ 1 frame at 120 Hz) plus the page's 60 Hz spring step (16.7 ms) |
| Settle times | ±30 ms | threshold crossings on a slow tail sampled at 120 Hz over a 60 Hz integrator |
| Peaks / overshoot | ±0.5 px or ±1 percentage point | |
| Blind spring fits (ω₀, ζ) | ±5 % | fit sensitivity to the lag and the onset frame |
| Tween / transition durations | ±3 % (≈ 30 ms at 1 s), ±10 ms below 300 ms | threshold definitions differ |
| Rates | ±1 % | |
| Latencies | ±10 ms | |
| Opacity curves read at a given p | ±0.03 | steep slope against one-frame sampling |

## Property by property

| ID | Study | Re-measure (two or more runs) | Verdict |
|---|---|---|---|
| P-01 | pill 240×56, button 56×56, gap 16, radius 28, group 564–876, sticky bottom 32 | identical in 6 runs at 1440: pill 240×56, button 56×56, gap 16, group x 564 w 312, computed radius 28 px on both backgrounds; stuck rest top 812 at 900 px height → bottom 32 | AGREES |
| P-02 | 390: pill 216×56, button 56, gap 12, capsule 32 | 390 touch, 2 runs: pill 216×56, button 56×56, gap 12, capsule 32, group x 53 w 284, stuck rest top 768 at 844 → bottom 20 | AGREES |
| P-03 | blur 7 px, `rgba(232,232,237,0.72)`, no border/shadow | `blur(7px)`, `rgba(232, 232, 237, 0.72)`, `box-shadow` none, no border, every rest frame in every run | AGREES |
| P-04 | one-shot at `galleryTop − 100vh + 0.6·galleryH`; same timeline at any speed; no replay | 1 px walk: last inactive / first active sy 598 / 599 at 1440 (gallery visible 0.6000 → 0.6015), 350 / 351 at 390 touch (0.5982 → 0.6001); both runs identical. Jump (sy 1013) and 40 px wheel steps (sy 600) give the same springs (ω₀, ζ within 1 %). Out above, back in, out below, back in: class, transform and pill width never changed (`exit` r1, r2) | AGREES |
| P-05 | 180 → 0, ζ 0.414, ω₀ 10.37, peak −43.16 (24.0 %), settle 1439 ms | ζ 0.414–0.416, ω₀ 10.36–10.39, peak −43.15/−43.16 (24.0 %), settle to 0.5 px 1424–1438 ms at 1440 (1409/1419 at 390) | AGREES (390 settle 20–30 ms early, inside tolerance) |
| P-06 | first pixel 172.7 ms | slow wheel entry from above: 170.0 / 171.5 ms. Instant jump to sy 1013: 118.8 / 119.8 ms | AGREES for the like-for-like entry; the value depends on where the dock sits in flow at entry, which the study's single number does not say |
| P-07 | **single** opaque blob 30×80, peak w 62.2, min h 50.3, scale 1.3 → 0.81, hidden at 548 ms | blob 30×80, peak w 62.23, min h 50.24–50.25, last visible scale 0.807 — all agree. Hidden at 527–542 ms (6 runs; jump 542.0/536.1, wheel 530.7/527.6, touch 528.3/526.9). **The silhouette is not a single blob**: the pill background is opaque (`opacity: 1`, same `rgb(232,232,237)`) from the first activated frame at 40×36 × scale 1.3 = 52×46.8 px, centred on the blob and wider than it (blob 38.3 px wide at 0 ms). It rises with the dock. The two same-colour shapes overlap from 0 ms; the "mushroom" in tiles 160–260 ms of `frames/film-f1-1440.webp` is their union | DISAGREES on "single blob" (structure) and, marginally, on the hide time (−6 to −21 ms vs 548; agrees with the study's own §2.1 "0.52 s"). Likely cause for the shape: the study read the pill's start from its width spring, not from its opacity |
| P-08 | pill starts at 0.50 s at 40×36 × 1.3; width peak 269.2 (14.6 %), settle 1655 ms, ζ 0.524 | width spring onset 515–524 ms; peak 269.22 (14.6 %); settle to 0.5 px 1628–1633 ms; blind ζ 0.522–0.524, ω₀ 10.43–10.50. But the pill is visible from 0 ms (P-07), and its `--scale` 1.3 → 1 starts at 302–330 ms, critically damped, ending ~630 ms | Numbers AGREE; the "takes over at 0.50 s" reading DISAGREES (see P-07) |
| P-09 | from 0.54 s bg scale 0 → 1 (critical, 0.65 s); x −128 → 0 (k100 c20); bg width 80 → 52.5 → 56 | bg scale first > 0 at 549–560 ms, monotone, reaches 1 by ~1.19 s (2 %); button `translateX` −128 → 0 (−114 at 390), onset 543–560 ms, blind fit critical (ζ → 1), ω₀ 9.45–9.50; bg width 80 → 52.49 → 56 | AGREES (ω₀ 5–6 % under the source's 10, at the tolerance edge; a critically damped fit is insensitive to ω₀ near the end) |
| P-10 | no metaball filter; continuity from matched colour, size, centre | no `filter` on the blob or the backgrounds in any frame; 0 SVG `filter` elements on the page. At the hide frame the blob's visual box is 47.2–47.5 × 40.7–41.0 and the pill's 43.4–47.6 × 36.7–36.9, centres 0.5–1.2 px apart in x and 3.8–5.1 px in y | AGREES (no filter). The continuity is size-and-colour only: see R-02 for the velocity break |
| P-11 | dots x 36 → 0 (k200 c20, −0.73 px), opacity together at 756 ms | dot 0 offset inside the pill 36 → 0, onset 744–753 ms, overshoot −0.66/−0.67 px, blind ω₀ 14.4–15.2, ζ 0.79; opacity first > 0 at 738–753 ms (CSS `opacity 100ms ease-in 740ms`) | AGREES (overshoot within 0.1 px). The 20 ms per-dot stagger was not isolated: my dot 6 offset is confounded with the capsule opening |
| P-12 | `--progress-intro` 0 → 1 (k200 c20), capsule 8 → 48.75 peak (1.9 %) → 48 | capsule peak 48.81 (2.0 %), `--progress-intro` peak 1.021; with k200 c20 at dt 1/60 the residual is 0.001–0.002; capsule within 0.05 px of 48 by 1256–1261 ms, within 0.01 px by ≈1370 ms | AGREES (the study's "≈1400 ms" settle has no threshold; it matches ≈ 0.01 px) |
| P-13 | glyph opacity at 956 ms (100 ms), scale 0.5 → 1 by 1139 ms (200 ms ease-out) | opacity first > 0 at 938–953 ms, 10–90 % in 65–67 ms; scale reaches 1 at 1137–1149 ms, bézier fit (0, −0.08, 0.55, 1.05) over 212–219 ms | AGREES |
| P-14 | from 1.0 s, blur 14 → 7, alpha 1 → 0.72 (critical, k100 c20); 7.14 px at 1655 ms | blur and alpha leave their start at 1015–1030 ms; blur at 1655 ms = 7.120–7.125 px; monotone, no overshoot; critical fit ω₀ 10.5–10.7 | AGREES |
| P-15 | the stated springs re-simulated reproduce the page to ≤ 0.35 px RMS | my re-simulation of the stated k/c (no render interpolation, onset free) against my curves: dot-pill height 0.02–0.04 px, button width 0.03–0.04, `--progress-intro` 0.001–0.002, blob w/h 0.09–0.15, pill width 0.19–0.33, rise 0.33–0.52 px RMS | AGREES on the k/c values; my rise residual exceeds 0.35 px (to 0.52) because my integrator omits the page's render interpolation, which spreads a 60 Hz step across two 120 Hz frames (max error 2.7–5.5 px at the steepest frames) |
| P-16 | 48 vs 8 (1440), 32 vs 8 (390) | 48/8 at ≥ 735 px wide, 32/8 at ≤ 734 (resize ladder 1440/1068/834/734/390) | AGREES |
| P-17 | width = 8 + 40·max(0, 1 − abs(i − p)), p = scrollLeft / 1280; dot sum 96.00–96.01 | law error ≤ 0.005 px over every frame of autoplay, click and retarget runs; dot sum 96.00–96.01; p equals the previous frame's scrollLeft / 1280 exactly (same-frame error ≤ 0.023: a one-frame lag) | AGREES |
| P-18 | linear trade, ≤ 2 enlarged, no worm; jumps sweep intermediates | max 2 dots > 8 px in every frame; a 0 → 3 click passes through {0}, {0,1}, {1,2}, {2,3}, {3} | AGREES |
| P-19 | outgoing fill vanishes in one frame at `.current` change; incoming starts at once | the fill is `.current::after` only; at the switch frame the new current's fill is 1.2 px (its 15 % min-width) | AGREES (but see R-03: the full capsule waits ~0.5 s before that switch) |
| P-20 | 18.70 %/s of the link, 0 → 115 % in 6.150 s, visible from 0.80 s | 8.976/8.975 px/s on a 48 px link = 18.70 %/s, linear (max residual 0.009 px over 2.6 s); visible edge at 7.2 px → 0.80 s; `.ended` 6.16 s after play | AGREES |
| P-21 | 1 s easeInOutQuad, bézier ≈ (0.477, 0.054, 0.522, 0.948), RMS ≤ 0.0045, 0 overshoot | 12 programmatic moves (autoplay, click 0 → 3, retarget, retarget-late, retarget-after, replay 6 → 0): 975–997 ms by my 0.5 px thresholds, bézier (0.471–0.480, 0.036–0.068, 0.519–0.529, 0.936–0.965), RMS 0.0023–0.0028, overshoot 0 | AGREES |
| P-22 | click 50–55 ms; ArrowRight 29; replay 40; `.current` → motion 25 | `.current` → first moved frame 22.6–26.6 ms. Replay click → first moved frame 45–48 ms. Dot click → first moved frame **29.9 / 30.2 ms**, `.current` flip 15.2 / 18.4 ms. ArrowRight not re-measured | `.current` → motion and replay AGREE. Dot click DISAGREES (30 vs 50–55 ms). Likely cause: the anchor. My stamp is read in-page immediately before raw CDP mouse down/up on a pre-hovered dot; the study's click went through `page.click`, whose actionability and scroll-into-view sit inside its interval (its §2.4 note shows that path moving the page) |
| P-23 | a click during a move is dropped | second click at +250 ms and at +600 ms into a 0 → 2 move: dropped (both runs each). At +1300 ms, after the move ends, the same click moves 2 → 6 normally | AGREES |
| P-24 | one slide per 6.65 s; no wrap; `.ended` → replay 7680 → 0 in 1 s | 6668 / 6659 ms between `.current` switches; on the last slide `.ended` + replay glyph 6.16 s after play; replay 7680 → 0 in 995 / 997 ms | AGREES |
| P-25 | slides flat, pitch 1280 | over 957 / 979 frames through an advance: one style tuple for the first three slides (`transform` none, opacity 1, filter none, radius 0, clip none, z auto, 1260 × 612); slide x + scrollLeft constant to 0.00 px | AGREES |
| P-26 | captions 162 px per slide; out 0.51 at p 0.20, 0.10 at 0.53, 0.025 at 0.70; in 0.15 at 0.53, 0.51 at 0.80 | translateX slope −0.1266 px per scroll px (= 162/1280), range ±162; out 0.531/0.536, 0.113/0.115, 0.030/0.031; in 0.138/0.136, 0.491/0.496 | AGREES |
| P-27 | glass static in moves | one material state (blur, fill, size, transform) across every autoplay, click and retarget run | AGREES |
| P-28 | hover 92 ms to `rgba(223,223,227,.698)`; press 91 ms to `rgba(193,193,198,.655)`; no scale | hover 95.2/96.0 ms, press 89.6/90.2 ms, release 93.8/95.9 ms, same colours; one transform state throughout | AGREES |
| P-29 | glyph swaps by `display` in one frame | one glyph change, no intermediate frame, in pause, idle, click, ended runs | AGREES |
| P-30 | dot hover `.42` → `.54`, 241 ms linear | 240.3/242.8 ms in, 240.8/243.2 ms out | AGREES |
| P-31 | 1:1 after ~15 px slop; capsule scrubbed (dot sum held) | 117 px finger → 102 px scroll on slow drags (15 px slop), 234 → 218–233 px; `--autoplay-progress` vs scroll error 0.000 on drag legs | AGREES |
| P-32 | fling 1600 px/s → two slides, 683 px, 1.62 s; slow release snaps back in 185 ms | slow release at 30 % of the 342 px stride, zero release velocity: snaps back in 190.8–197.6 ms (4 legs). My fling (117 px in 90 ms, scroll velocity at release 825–1534 px/s) lands **one** slide in 572–574 ms (3 runs) | Snap-back AGREES. The fling DISAGREES in numbers because the gesture differs (my flick is shorter and slower); both are Chromium's native snap, so no page claim is contradicted |
| P-33 | no JS rubber-band | touch drag toward the start on slide 0: scrollLeft stayed 0.00 (2 runs) | AGREES |
| P-34 | only the fill moves at rest; paused dock static | paused: one dock state over 1.77 s and 5.75–5.77 s, `document.getAnimations()` running count 0 (4 runs); playing: only the `::after` width changes | AGREES |
| P-35 | resize: instant re-snap, no animation | on slide 2: scrollLeft 2560 → 1790 → 840 → 2560 in one frame at each resize (2 runs). The capsule does **not** follow at once (R-05) | AGREES on the re-snap |
| P-36 | reduced motion: static dock, instant slide change, integer capsule, no autoplay until pressed; fill 18.7 %/s | `.inactive` throughout, rest geometry at once, play glyph and paused fill for 7.5 s; after pressing play the fill runs at 18.70 %/s; a dot click moves 0 → 3840 in one frame; `--autoplay-progress` only ever 0 or 3 | AGREES |
| P-37 | 0 `prefers-color-scheme` rules; dark = light | 0 `@media (prefers-color-scheme)` rules across every same-origin stylesheet (2 runs); dark load: same material, dot colour, geometry, and intro | AGREES |

**Summary:** 33 AGREE outright; P-07, P-08 disagree on structure (the pill is visible under the blob from 0 ms); P-22 disagrees on the dot-click latency (anchor); P-32 differs on the fling only because the gesture differs.

## What the study missed (owner's words: goo, breath of life, momentum)

| ID | Property | Measured | Rests on |
|---|---|---|---|
| R-01 | **The goo is a union of two shapes from frame 0.** The blob (30×80 × 1.3) and the opaque pill background (40×36 × 1.3) overlap at one centre from the first activated frame, same colour, and rise together. Their union is the two-lobed silhouette of 120–300 ms. At ~300 ms they are nearly coincident (blob 49.9 × 55.0, pill 52 × 46.8); after that the blob shrinks inside the pill until it is hidden. | 6 intro runs | `data/summary.json`, `frames/film-f1-1440.webp` (tiles 120–500) |
| R-02 | **The hand-off carries size but not velocity.** Last blob frame: visual width 47.2–47.5 px, shrinking at 19–54 px/s. First pill-only frame: box width 43.4–47.6 px, growing at 240–830 px/s. Height steps 40.8 → 36.8 (−4 px), centre drops 3.8–5.1 px. The width velocity reverses sign at the swap: the "goo" is C0 (position and colour), not C1 (no momentum hand-off). | 6 intro runs | `data/extras.json` → `intro_x_and_swap.*.swap` |
| R-03 | **Full-capsule hold before each switch.** The fill reaches 115 % at 6.15 s and the full capsule sits static for 509.8 / 524.5 ms before `.current` moves (switch-to-switch 6659–6668 ms). This is dead time in the only motion the dock has at rest. | autoplay r1, r2 | `data/extras.json` → `autoplay_extra.*.holds` |
| R-04 | **One spring tempo, three dampings.** Blind fits put the rise, blob, pill size and button size on one natural frequency, ω₀ 10.3–10.5 rad/s, with ζ ≈ 0.41 (rise, blob), 0.52 (pill and button size) and ≈ 1 (bubble x slides, button scale, material, `--scale`). The capsule opening and dot slide run faster and stiffer: ω₀ 14.4–15.8, ζ 0.75–0.80. After the intro no motion overshoots. | 6 intro runs | `data/summary.json` → `spring`, `data/xsprings.json` |
| R-05 | **Capsule desync on resize.** After each resize the capsule shows the wrong length for 276–296 ms: 23.94 px (should be 48) after 1440 → 1000, 8 (should be 32) after → 600, 8 (should be 48) after → 1440. It then jumps to the right length in one frame. `--autoplay-progress` = scrollLeft / item offset uses the old offset until a deferred re-measure. | resize2 r1, r2 | `data/resize2-r*-1440.json.gz` |
| R-06 | **User motion pauses autoplay; snap-back does not.** A swipe that lands on the next slide turns the glyph to play and pauses the fill in the frame `.current` changes. A drag released short (snap-back) leaves autoplay running. `.current` flips mid-drag when the scroll crosses 50 % of the stride, before release (1222 / 1241 ms into a 1.5 s drag). A dot click pauses in 7–8 ms. | drag r2, r3; click r1, r2 | `data/drag-r*-analysis.json`, `data/summary.json` → `click` |
| R-07 | **No intro on a narrow non-touch window.** At 390 × 844 without touch the dock never activates: it stays `.inactive` yet fully drawn at rest (pill 216, capsule 32), autoplay running, over a 1 px walk from sy 349 to 988 (2 runs). With touch at 390 the intro plays (P-02, P-04). | intro-jump 390, trigger-fine 390 | `data/summary.json` → `intro-jump/*/390`, `trigger-fine/*/390` |
| R-08 | **No scroll coupling.** After the intro, page scrolling moves the stuck dock by nothing beyond the rise spring's tail: top 811.86–812.02 px across sy 800–840. There is no lag, inertia or squash from page scroll velocity. Weak evidence: 6 steps of 8 px per run. | trigger r1, r2 | `data/trigger-r*-1440.json.gz` |

Owner-edict reading (no verdicts, the facts that bear on them): goo is two overlapping same-colour shapes with a velocity break at the swap (R-01, R-02); breath at rest is one linear fill plus a 0.5 s dead hold, and nothing when paused (P-34, R-03); momentum lives in the entrance springs and in the native scroller, while every programmatic move is a fixed ~1 s ease regardless of distance (P-21, R-04), retarget is refused (P-23), and resize shows a stale capsule (R-05).

## Gaps

- Chromium headless only (machine law). Safari's scroll-snap, fling and overscroll are unmeasured, as in the study.
- ArrowRight / End / Home (P-22, study G-3), the product-viewer and paddlenav controls (study G-5) were not re-measured.
- The per-dot 20 ms entrance stagger (P-11) was not isolated; my dot-6 offset is confounded with the capsule opening.
- My fling gesture did not reproduce the study's 1600 px/s two-slide case (P-32); only a one-slide fling and snap-backs were measured.
- Dot press feedback (the `::before` has `transform`/`scale` transitions) was not exercised.
- The dot-click latency (P-22) depends on the click path; neither number is a user-perceived latency.
- R-08 rests on six scroll steps per run.
- Load was 12–26 against the study's 10–12; frame intervals did not degrade, but timing rows carry that caveat.
