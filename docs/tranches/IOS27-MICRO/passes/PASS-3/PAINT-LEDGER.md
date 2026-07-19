# PASS-3 PAINT-LEDGER — the serialized browser arm (IOS27-MICRO)

verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat
p3:PAINT-ARM, 2026-07-19 — the ONLY browser-owning seat this pass (singleton honored; no
other seat drove a browser while this ledger ran).

Engines of record: repo-local Playwright 1.61.1 — WebKit build webkit-2311 (26.5, the pass-2
engine of record) + bundled Chromium; headed, macOS, DPR 1, viewport==video size (video px ==
CSS px). Display ~100Hz (frame p50 ≈ 10ms — long-frame thresholds stated per row). Every
WebKit MATERIAL verdict rides the VIDEO path (25fps VP8; Playwright-WebKit screenshots are
backdrop-filter-blind, `../PASS-2/safari-arm.md:22-31`); Chromium screenshots are lossless
and paint-honest there. Traces run with `?hud=0` where the page implements it (m2 switch);
frame-gap statistics only, never raw performance.now deltas (WebKit 1ms quantization). No
`@supports` gate was consulted anywhere — every verdict below is a runtime paint observation.

Captures live OUTSIDE the repo, under the scratchpad:
`/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/paint/captures/`
(cited below as `CAP/`). Per-page JSON logs (`log-*.json`) carry the raw sample series,
rects, and phase clocks for every number quoted.

Verdict vocabulary: **PASS** · **PASS-B** (passes with a stated bound/caveat) · **FAIL** ·
**DEFER** (not runnable now — named re-entry) · **BLOCKED** (a page defect prevents the row).
RERUN-OWED = valid now, re-judged after the pass-3 canon repaint lands on that page.

---

## Order 1 — proto-frosted-cure (the canon referent; judged FIRST)

Videos: `CAP/frosted-cure/page@ed0b6c618bb77fd45ef3458a8692fa02.webm` (both themes, idle +
gestures + pops, WebKit); Chromium lossless: `CAP/frosted-cure/chr-idle-clean-{dark,light}.png`,
`chromium-{dark,light}-idle.png`; frames at `CAP/frosted-cure/frames5/`; logs `log-{webkit,chromium}.json`.

| row | verdict | evidence |
|---|---|---|
| QP-1 frost read | **PASS-B** | The cure bars read smooth frost — stripe energy through the cure(22px) 0.03–0.13 vs naked scene 3.6–5.6 (both engines, both themes); the ferry reads as a soft color mass through the cure (video frames f-035/f-193; goo-soft edge vs the sharp orb in the naked gap). BOUND: the before-leg's "7px keeps stripes legible" tell is WEAK in the dark theme (before 0.10–0.17 vs cure 0.03–0.33 depending on strip; the stripes at this scene contrast are near-mushed at 7px too). The load-bearing half — cure mushes, frost reads — holds on both engines |
| QP-2 idle darkness | **PASS** (dark) / **PASS-B** (light) | Dark: cure capsule shows EXACTLY ONE sweep event in 9.5s (p95-lum bump rel frames 22-23 ≈ 8.4s period) vs the before's TWO at 5.6s cadence (frames 10-11/38-39); no other cured-surface light change; rAF **0 callbacks over 9.5s idle, both themes, both engines**. Light: the before's 5.6s sweep detected (2 events); the cure sweep is sub-threshold in 8-bit capture over the 0.92-lum cream capsule — BOUNDED, no unlicensed light detected either |
| QP-3 engagement light | **PASS** | Dark: wash rises dLum +0.026 with warmth d(R−B) +4.8 during the hold, decays to +0.0015 (≈0) ~1s after release — fires warm cream, dies at settle. Light: warmth-channel bump +1.2 with decay; settled == pre-press within 0.0005 lum (the idle-zero law holds); luminance bump sub-threshold over the bright bar (8-bit floor, noted) |
| QP-4 sibling legibility | **PASS** | Glyph-percentile contrast at bloom peak on the sibling "Me": dark 10.12:1 (analytic bracket 9.13), light 6.69:1 (bracket 12.08 — video glyph-antialiasing pulls the paint read down; still ≳AA×1.5). Before-column dark sibling 7.75:1. Frames f-107/f-264 |
| QP-5 effervescence | **PASS** | The page's own live gates, BOTH engines: overshoot 9.0–9.1% (band 6–12), flight 301–310ms (200–320), second excursion 0.1% (<1.5), fade/geometry 0.600 (≤0.618), rim beat 80ms rise/240ms cool (≤100); before column shows 20.5% + 4.2% visible return (the defect, for contrast) |
| QP-6 micro-demo referent | **DEFER** | The referent page is not on disk (no micro route in `demo/`); re-entry: the FINAL wave-set demo integration, or a user-provided referent capture beside `chr-idle-clean-dark.png` |
| QP-7 cost | **PASS** | Active pop window: 0 gaps >24ms on BOTH engines (n≈107, mean 10.2ms); rAF parked at idle (0 callbacks/9.5s ×2 themes ×2 engines); `#rafState` prints "rAF parked" at every settle |

**Body tally: 6 PASS (2 with bounds) · 1 DEFER.**

## Order 2 — v-alens (the luminance-locked attention lens)

Video: `CAP/v-alens/page@842abdf205efd3d0627fc8b638f9e1f6.webm`; frames `CAP/v-alens/frames5/`;
Chromium lossless `chr-{idle,peak,released}.png`; logs `log-*.json`.

| row | verdict | evidence |
|---|---|---|
| 1 blur-rides-opacity on the masked stack | **PASS** | WebKit video: three concurrent masked siblings ramp independently and smoothly — mid-band (~220px) edge energy 5.67→0.86 at peak (soften 0.85), far band (~385px) 9.56→9.09 (crisp); release dies reversibly (mid released 4.62 → toward idle 5.67; Chromium exact: 3.31→0.61→3.31). No banding pops between rings on the frames (f-018) |
| 2 Chromium parity, no clipping wrapper | **PASS** | Stack root computed `overflow: visible` (no Chromium stacked-mask wrapper); identical halo behavior lossless: mid soften 0.81, far 0.01, exact reversal on release |
| 3 mask re-seat repaint cost | **PASS** | Seat vars stamped ONCE per engagement (cx 233.0 for E1, 263.0 for E2 — one value per engagement, both engines); 0 gaps >24ms across the whole session (WK max 24.0, CHR max 20.5) |
| 4 live-π sibling contrast | **PASS** | Real pixels at peak accent: item-1 label 12.60:1 idle → 12.77:1 at peak (WebKit video frames) — the N3 floor holds in paint, unchanged under the lens (label at alpha 1.0). Computed label color returns plain `rgb(255,255,255)` — no oklab token on this page, the oklab parse arm idles (see cross-page (e)) |
| 5 rAF parks at settled hold | **PASS-B** | WebKit: rafD = 2 over a 2.1s held peak; HUD prints "engage-t 1.000 · seat 233,539 · rAF parked" on video (f-018). Chromium: convergence tail ~1–2s (rafD 18) then parked; ONE observed transient `--engage-t` sample of 1.0595 (>1) on a re-press — sub-frame, clamped by every calc() consumer, logged as an observation |
| (a) re-banded annulus video | **PASS-B** | Halo local, world crisp, no ring banding (visual, f-018 + band numbers above). BOUND: measured extinction sits between 240–385px — the strong-soften shoulder at ~220px reads a touch wider than the card's "zero by ~330px" figure; falloff order and luminance lock are correct |

Luminance lock (the roster's headline claim): world luminance under the halo idle→peak ratio
0.988–1.029 (WK), 0.984 (CHR) — **locked**; the 0.05-cap dim is a whisper in paint; the ±0.03
residue is the world's own drifting color masses.

**Body tally: 6 PASS (2 with bounds) · 0 FAIL.**

## Order 3 — v-perch (rows 1, 2, 3, 5 — row 4 transferred to PROTO-ASSEMBLY)

Video: `CAP/v-perch/page@4218bb54ddc26a2984794bcb89581c6a.webm`; frames `CAP/v-perch/frames10/`;
logs `log-*.json`.

| row | verdict | evidence |
|---|---|---|
| 1 protrusion reads | **PASS-B** | The dot visibly straddles the plate's corner arc — upper-left on world, lower-right on glass; plate clip untouched (perch is a `#surfaceRoot` sibling; the plate's own `overflow:hidden` never touches it). BOUND: the page is a dark-only build — the "both themes" half has no light arm to run (declared, not a defect) |
| 2 charge register | **PASS** | Attack t90 142ms (WK) / 101ms (CHR) — sub-200ms; dot luminance rises 0.033→0.053 under the finger (frames 23–31), drains visibly slower on cancel: t50 65–98ms, t10 258–272ms + a 4–5 frame visible tail (the felt-cancel class, ~2× slower than attack) |
| 3 squircle seat | **FAIL** | The dot center sits exactly ON the k=1 circular arc (d 27.99 vs R 28) ⇒ **55.8% of dot area outside the plate — OUTSIDE the R-9 band (62–69%, E-NOTIF S1-PERCH-SEAT)**. The build predates the R-9 upgrade (`v-perch/index.html:166-168` still ships `SQUIRCLE_K:1` + `seatOffset = k·r·(1−1/√2)`); the ordered cure is the apex formula `R·(1−2^(−1/n))` off the concentric relay. Route: ATTENTION-EXIT continuation |
| 5 backdrop-filter on a 30px dot | **PASS** | WebKit pays it: the plate's corner hairline rim passes behind the dot and is visibly diffused inside the disk while crisp outside it (frames10/f-010 vs f-027 crops); saturate(1.2)+blur(10px) computed and painted |

**Body tally: 3 PASS · 1 FAIL (the R-9 seat band).**

## Order 4 — v-vapor (rows 1–5; (c) deferred)

Videos: `CAP/v-vapor/page@ad11a9d3410930e9a7f77e57314f7b9e.webm` (slow scrub + commit + catch),
`page@ba1b772a40901f048ad06c5a7ef3840a.webm` (flick commit), `page@12c36120c7952da3fa1d3199cc51103a.webm`
(catch drive); beat frames `CAP/v-vapor/beat-{contentless,relaxed}.png`; logs `log-*.json`.

| row | verdict | evidence |
|---|---|---|
| 1 erosion read | **PASS-B** | Slow-scrub video: the body granulates through the fine grain while coarse cream flecks ride up through it — an EROSION with text remnants dissolving in place, not two ghosts crossfading (frames at 3.8/4.6s). BOUND: the 96px tile's periodicity is faintly visible under close inspection (the declared limit-1; cure dial = larger single tile) |
| 2 empty-medium beat | **PASS** | The authored 140ms beat lands in paint: relax-class → medium first painted fall = **144ms WK / 142ms CHR**; the contentless-blur frame captured (`beat-contentless.png`, world edge energy 2.64 vs 3.85 after relax — the world re-sharpens). NOTE for the fired re-band (H-1 row 3): the total contentless window in a flick-commit is ~660ms (content leaves at scrub 0.55 while the release snap still flies) — the m1 arbitration should anchor its band explicitly |
| 3 masked backdrop body under scrub | **PASS** | WebKit composites backdrop-filter under the 96px tiled alpha mask — the granulated body visibly frosts what remains behind it at every scrub depth (same video) |
| 4 compositor-only channels | **PASS** | Clean trace (hud=0, no sampler): full scrub+commit = LayoutΔ 2 (event-scoped rect reads), RecalcΔ 72 (the sanctioned var channel), 0 gaps >24ms both engines — no repaint storm from the static masks |
| 5 catch mid-snap | **PASS** | Pointer-down during a live release snap seizes the value with **zero jump**: max 8ms-sample st-step 0.0000 and body-y step 0.00px at the catch instant, both engines (caught at st 0.62 mid-flight, clean plateau) |
| (c) ghost-park cost delta | **DEFER** | Charter order: run AFTER the fired re-band lands on this page (not landed this session — polled). Re-entry: ATTENTION-EXIT continuation's re-band commit |

**NEW DEFECT (paint-arm find, filed): stale release velocity after a still hold.** The m6
boxcar prunes its ≤120ms window only inside `pointermove` (`v-vapor/index.html:373-380`);
a drag→hold-still(≥240ms)→release gesture reuses the LAST move's velocity and COMMITS from
d≈0.35 as if flicked (reproduced both engines: st glides 0.35→0.62→1.0 on release with the
pointer at rest). A still finger's velocity is zero; the estimator must age out by
wall-clock at release. Route: ATTENTION-EXIT continuation (the m6 cure, completed).

**Body tally: 5 PASS · 1 DEFER · 1 new defect filed.**

## Order 5 — v-dotrel (rows 1–5 + union check (b))

Video: `CAP/v-dotrel/page@0f22c566811ed5e558dde900a01bb80b.webm`; wave burst `CAP/v-dotrel/wave/`;
state shots `CAP/v-dotrel/{chromium,webkit}-state-*.png`; logs `log-*.json`, `log-prm-*.json`.

| row | verdict | evidence |
|---|---|---|
| 1 wave reads as a message | **PASS** | Video: a rose hue front visibly TRAVELS bottom→top from the pressed control through the lattice with a soft jittered edge (frames w-02/w-05/w-08: gold → front enters → front at ~40% height) — not a global crossfade; the luminance pulse rides the front |
| 2 zero idle rAF | **PASS-B** | Pre-relay idle: 0 rAF callbacks / 10.5s, both engines. Post-settle: 0/s from the settle onward. BOUND, declared: one relay's event window runs ~7.3s before parking (wave ~0.5s + jitter + per-dot pulse-decay tails; "finite, then zero" holds — the tail length is a design note, not a leak: measured park at sec 8, then 0 across 4+ s) |
| 3 event-window frame budget | **PASS** | During relays: 0 gaps >24ms on BOTH engines (WK max 22ms, CHR max 12.1ms; 323 arcs/frame held at ~100Hz) |
| 4 hsl() hue truth | **PASS** | Four states tellable on real canvas pixels, cross-engine consistent: calm warm-gold (hue ≈ 41–53°), listen cool cyan (−155°), focus violet-rose (−83 to −98°), cream = warm + distinctly brighter (separates by L, the grey-by-luminance lesson). Paired shots banked both engines |
| 5 PRM still-step | **PASS** | reducedMotion: press → canvas at its FINAL palette by +60ms and byte-identical at +1.26s; rAF delta 0 (a zero-rAF synchronous still-step), both engines |
| (b) breath-under-park | **PASS** | The CSS-only breath runs while rAF stays 0: panel luminance drifts 0.0083→0.0147→0.0079 (CHR lossless) / 0.0070→0.0140 (WK video) on a ~7s asymmetric cycle (fast rise, slow decay), range ≈0.007 lum — alive at the threshold of noticing, with the rAF counter at ZERO for the whole window |

**Body tally: 6 PASS.**

## Order 6 — v-wave (mechanism rows now; the organ re-skins to the sea)

The sea re-skin (H-1 row 1) has NOT landed on this page (polled this session — the bar rack
is still the organ). Per the sequencing law, organ/material reads would be spent evidence;
what runs now is what card 5 says TRANSFERS VERBATIM (FAC contract, park discipline, idle
breath, PRM organ). Log: `CAP/v-wave/log.json`; video (idle+churn) in `CAP/v-wave/`.

| row | verdict | evidence |
|---|---|---|
| 1 mic session end-to-end | **DEVICE-DEFER** | Fenced, never a gate; re-entry = the campaign device-lane decision (charter §O-4) |
| 2 transform-only trace | **PASS** | Churn session: 0 gaps >24ms (WK); Chromium LayoutΔ 2 / RecalcΔ 214 over 2.5s (the var channel only); the rAF DIES on the parked frame (0 callbacks in the first post-churn second) — transfers to the sea build |
| 3 law-13 register read | **DEFER** (re-skin) + finding | The organ read waits for the sea. Register facts banked now: the capsule fill is the judged warm charcoal `rgba(16,14,12,0.70)` (`v-wave/index.html:61-63`) — but see cross-page (d): over this page's cool-violet world the COMPOSITE paint reads cool (R−B ≈ −8) — a design note the sea re-skin must answer (ghost-through floor vs warm-read law) |
| 4 idle breath | **rAF half PASS · visible half FAIL** | rAF parked 0/10.2s while the breath animates (computed opacity cycles 0.0004→~0.15, 7s asymmetric ✓). BUT the painted organ is a 1px inset hairline at alpha 0.10 × that opacity — peak effective ≈0.015 alpha-white on one pixel row: measured range 0.00002 lum (CHR lossless, 9.9s) / 0.0003 (WK video) — **a still frame in paint, below any threshold of noticing** (the σ8 computed-alive/paint-dead class; token `breathPeak: 0.16` vs painted ≤~2% — the mirror and the paint disagree). Route: the sea re-skin's lull filament replaces this organ; carry the lesson — breath must be gated on PAINTED delta, not computed opacity |
| 5 PRM organ | **PASS** | reducedMotion: rack `display:none`, chip `block` stepping in quanta (widths 50%→0% observed — the 5-step quantizer), breath animation `none` |

**Body tally: 2 PASS · 1 split (PASS/FAIL) · 1 DEFER · 1 DEVICE-DEFER.**

## Order 7 — proto-constellation (QP-1..QP-10)

The pass-3 panel-arm + canon repaint have NOT landed (polled); register-sensitive rows carry
RERUN-OWED. Videos: `CAP/constellation/page@66f8f2ea…webm` (full suite, hud ON for cells),
`page@afe2605f…webm` (hud=0 trace arm), `page@e2fc3143…webm` (phone-B session); bursts
`CAP/constellation/{goo,ferry,bd,mom2}/`; logs `log-*.json`, `log-prm-*.json`.

| row | verdict | evidence |
|---|---|---|
| QP-1 frost register, both phones | **PASS** (RERUN-OWED post-repaint) | Phone A: warm cream wall, the mini pill and main dock read blurred-frosted with tiles ghosting through; the ferrying card frosts over Indigo/Ochre mid-flight; no gloss, no idle specular (idle + ferry frames). Phone B black register per QP-3. The CURRENT register already reads warm-cream-canon-adjacent |
| QP-2 goo double-darkening | **PASS** | STACKED→FUSED collapse: the dock-top strip dips 0.045 lum BELOW both endpoints during the overlap frames (0.467→0.422→0.69 settle) — two frost bodies visibly double-darken; the census 2→1 surface handoff lands as ONE monotone step, zero flicker frames (`goo/` burst) |
| QP-3 black-register ghosting | **PASS-B** | At rest the CREAM wall word is fully legible under the pill. At full growth the surface stays near-black-translucent — the word ghosts through the naked glass as blurred light masses with stroke hints (blur 10 smears 78px letterforms; through the result-row sub-panels it does not read). Never opaque ✓, floor honest ✓; strict letterform legibility at full growth is generous — judged BOUNDED (`/tmp` zoom crops banked in `bd/` burst) |
| QP-4 backdrop census per posture | **PASS** | Computed-census (visible painted backdrop-filter surfaces), IDENTICAL both engines: STACKED 2 (npBody+mainDock) · FUSED **exactly 1** (mainDock — the chip shares the surface at settle) · FISSION **exactly 3** (npBody+mainDock+searchGird) · mid-transition 1 (travels ≤3) · re-stacked 2; the page's own `aCenL` cell prints 3 [ok] |
| QP-5 ferry continuity | **PASS** | 25fps burst dock→card→page: ONE body, the art carried continuously inside it, marquee carried, frost live mid-flight; no seam, double image, or crossfade frame (`ferry/` burst); the caught-frame pairs with the computed channel — catch deltas 0.0e+0 · 0.0e+0 [ok] both engines |
| QP-6 re-home decider live | **FAIL** | The page's own gate: `aRehomeL` = **"1.00px [no]" on BOTH engines** (band ≤0.5px, the no-detach decider). The node FLIP math is exact; the LIVE re-parent lands 1.00px off. (At 1px the 25fps video cannot resolve the jump — the cell gate is the decider.) Route: constellation continuation (with the frozen-ferry arm it already owes) |
| QP-7 momentum legibility | **PASS-B** | The page's live cells: flick rows momentum amp 14.3px live (sim 24.6 at ref-velocity; different live release velocity), single overshoot 6.6% [ok], zero-seed 0.00–0.0% [ok] — flick and place are numerically distinct classes on both engines; growth edge crosses in 3–4 consecutive intermediate frames, no teleport frame. BOUND: at 25fps (150ms flight ≈ 4 frames) per-frame row-lag legibility is beyond the capture's resolution — the cells + no-teleport carry the row |
| QP-8 non-modal truth | **PASS** | `tap beneath (0)`→(1) while the black dock is OPEN, →(2) after; `bTapL` 2; no dead zone anywhere in the dim layer (both engines) |
| QP-9 frame-gap budget | **PASS (CHR) · PASS-B (WK)** | Full suite back-to-back: Chromium 0 gaps >24ms (n=1217). WebKit hud-off arm: 37 gaps in the 24–33ms class across ~35s of continuous drive (2–3 frame slips at posture starts), 0 >34ms; quiet-window rAF fully parked (0 callbacks/2.6s) on both engines. The 24–33ms band is engine-side posture-boundary cost, absent on Chromium — bounded, no long-frame class |
| QP-10 PRM sweep | **PASS** | All seven posture/ferry steps land as SINGLE-STEP (npBody geometry at +90ms == settled), marquee still, black dock seats growth 1.00 in one poll on BOTH open paths (place + flick; re-probed directly), both engines |

**Body tally: 9 PASS-class (3 bounded) · 1 FAIL (the re-home gate).**

## Order 8 — cross-page checks (d) (e) (f)

| check | verdict | evidence |
|---|---|---|
| (d) night-dock warm read, both engines | **PASS-B** | Real-pixel R−B on the black surfaces: v-dotrel panel +1.7 to +3.8 (both engines); constellation blackDock +10.8 (grown, WK video); assembly blackdock +11.0 WK / +9.2 CHR — warm charcoal, never blue-black ✓. **v-wave capsule reads COOL (−7.2 CHR / −8.4 WK)** — its FILL is the warm token (`v-wave/index.html:63`) but the deliberately-low 0.70 ghost-through floor lets the page's violet world dominate the composite. Finding for §3.5-C: the warm READ is not guaranteed over a cool world at the ghost-through floor — the sea re-skin should name which law wins in composite |
| (e) live-π per band, oklab parse | **DISCHARGED-N/A** | Per-band live-π ran at v-alens (near/mid/far band luminance + edge series, idle vs peak, both engines — order-2 table). The oklab parse arm was armed but idle: every computed color on the seven standalone prototypes returns `rgb()`/`hsl()` (no oklab tokens exist off-library); the arm re-enters with library-token pages |
| (f) N3 sibling contrast paired-π | **PASS** | Real pixels: v-alens sibling 12.60:1 idle → 12.77:1 peak; frosted-cure siblings 10.12:1 dark / 6.69:1 light at bloom peak; v-dotrel four-state distinctness (order-5 row 4). All ≥AA with margin on actual painted frames |

## Order 9a — SPINE-CONDUCTOR (PROBE-NOTES §5 rows 1–9)

Video: `CAP/spine-conductor/page@…webm` (battery attempt + subsat + light + maps); logs
`CAP/spine-conductor/log-webkit.json`, `r5-trace` kin in `CAP/f1/`. Node battery: 71/71 PASS.

**THE BLOCKING DEFECT (paint-arm find, filed):** the live battery CRASHES on first row write
in BOTH modes on BOTH engines — `setRow` calls `$(mid)`/`$(vid)` without the `#` prefix
(`spine-conductor/index.html:1190-1195`; first call site `:1402`; `$` is querySelector), so
`$("m-om")` is null and the battery promise dies: summary stuck at "Battery running…", three
unhandled rejections, held/dip interrupt cells never fill. One-character-class cure; until it
lands, rows 1–3 cannot bank.

| row | verdict | evidence |
|---|---|---|
| 1 full CC battery, internal | **BLOCKED** (defect above) | summary never resolves; 18 v-cells stay "·" |
| 2 paint-side sampling mode | **BLOCKED** (same defect) | checkbox arm runs into the same crash |
| 3 union interrupt arms | **BLOCKED** (cells) / video captured | the held/dip choreography ran on the WebKit video (visual half banked); `v-im/v-is/v-i2` never fill — the medium-min numbers wait on the fix |
| 4 sub-sat held scrub | **PASS** | Held near closed: WK t=0.0912 → scrim computed opacity **0.7598 = g/0.12 exactly** (0.0912/0.12 = 0.760); CHR 0.0882 → 0.7353 (= 0.735) — the veil visibly thins, paint pairs the law to three decimals |
| 5 light channel | **PASS-B** | Held scrub SUSTAINS `--sc-light` = 1 (law 20) at hold and +0.8s, both engines; zero idle light after park (series tail 0); cool-to-zero observed in the fired series. The lead/hold/cool CELL numbers (ll/lh/lc) are BLOCKED by the row-1 defect — the video + var series carry the row meanwhile |
| 6 Maps battery live | **PASS** | Clean runs, ALL cells [ok] BOTH engines: pin 85–86%/119–120ms; overpull zero-seed 0.6–0.8% (0.2–0.3px); overpull settle 188–191ms; flung 0.028–0.030s/173–175ms; catch dwell 171–180ms, landed 629/640ms (sim 628±40); breathe rect read 3.73% ∈ [3.4,4.1]; bottom edge immobile. (A single `mFlOvL 0.032 [no]` occurred only under video-recording contention — superseded by the clean runs, noted) |
| 7 PRM regression | **PASS** | `--sc-t` seats 0→1→1 / 1→0→0 in one poll (+120ms) on CC and Maps, both engines; rAF parked after (0 callbacks/1s) |
| 8 R1 + R2 | **PASS-B** | R1 natural: 180 frames · 40 consumers · write avg 0.017–0.022ms · **0 dropped >24ms on BOTH engines** (clean, no recording). R2 storm: GREEN both engines clean (WK max jump 0.200; CHR 0.183–0.198 ×3) — the CSS-follower precondition holds; RED readings (0.34–0.43) appear only under recording/first-run contention: the gate is contention-sensitive, which the CSS-arm entry ticket should note |
| 9 park honesty | **PASS-B** | rAF parked at every settle incl. the light tail (0 callbacks/2.5s), boot parked, badge "regime: parked"; "zero page errors" holds EXCEPT via the row-1 defect (any battery/interrupt press throws) — conditional on that cure |

**Body tally: 5 PASS-class · 3 BLOCKED on one pinned defect · 1 conditional.**

## Order 9b — PROTO-ASSEMBLY (the composed organs; QP rows 1–14)

Video: `CAP/proto-assembly/page@1e8b86aeb07fe4bace1dad9d2fbcaea8.webm` (rest → fired deploy →
session+sea → worldTap → commit → drawer → perch→vapor zero-seed → hot-seed); analysis frames
`CAP/proto-assembly/{an,sea,scan}/`; logs `log-{webkit,chromium}.json`, `log-prm-*.json`.

| row | verdict | evidence |
|---|---|---|
| 1 occlusion read | **FAIL** | World probes OUTSIDE the dock (left x432, right x755, y300–500): rest 0.0136/0.0402 → live **0.0118/0.0283 (−13% / −30% relative)** → post exactly 0.0136/0.0402. A session-keyed step-dim of the WORLD, stronger nearer the dock — the ±2% no-scrim law (MARKS-D mark 3) fails in paint on both probes, and the page's own "scrimless by construction / nothing here touches the world" comments (`proto-assembly/index.html:79,236-237,490`) are contradicted by the pixels (the σ8 class). The sea's sink under the dock's own dark mass is fine — the violation is OUTSIDE the body. Locate the painter (the `.darkmass` extent or a session-scoped filter) and bound it to the dock's own geometry |
| 2 non-modal truth | **PASS** | worldTap during the live session: counter 0→1 (and clicks kept landing post-commit), both engines |
| 3 meniscus autonomy | **PASS-B** | At rest: luminance in the pill's floor band cycles on a ~7s asymmetric envelope (fast rise, slow decay; period read from the 2fps series), uncorrelated with the parked level; PRM kills it (`@media` + PRM arm). BOUND: my 16px band dilutes the 2px filament — measured ±6% band-relative vs the authored ±18% element-relative (keyframes verified `index.html:257-263`) |
| 4 fired-deploy ladder | **PASS-B** | Panel-preset deploy on video; dock bottom-edge overshoot measured **2.63%** (8ms sampling) vs the intrinsic 4–5% class — under-lively, the panel-arm tuning should look at the mapping; text born BLURRED and condensing (edge energy 1.67→6.65→11.0 across ~80–120ms measured in 40ms quanta vs the ~190ms class — mechanism confirmed, faster than class); flare exercised (commit flare +32% lum with ~200ms pin) |
| 5 gesture arrival k·v | **DEFER** | Not driven this session (dock scrub-release velocity ladder); re-entry: the next paint window on this page, with the row-7 cure |
| 6 the standing sea | **PASS-B** (re-graded `[P3-AGG 2026-07-19, n5]`) | Corrected crest band (bottom 90px): col-amplitude oscillates 0.176→0.248 with the prosody — **the lull floor never reaches zero** (min 0.176); crest profile shift 0px per 5 frames (phase PINNED; one −8px outlier at a crest handover); Chromium lossless parity (amp 0.09–0.12, crests visibly warm gold/ember/plum aurora tokens). The hard cut: surface swap completes inside ONE 25fps frame (0.0209→0.0073) — a ≤40ms BOUND; the ≤2-frames-at-60fps (≤33ms) claim is beyond this capture's resolution (the row-10 honesty, applied here too) — the cut band re-verifies at a 60fps-class capture |
| 7 handoff beat BY SIGN | **sign PASS · band FAIL** | POSITIVE both seeds ✓ (the M2 sign cure holds in paint). Magnitude: body-out→medium-first-fall = **256ms WK / 285ms CHR at zero seed; 367/397ms at hot seed** — 1.8–2.8× the 80–140ms class AND not seed-invariant (the release-snap tail rides between body-out and the beat clock). The beat's own delay is honest (the vapor kin measured 142–144ms); the ANCHOR drifts. Cure direction: anchor the beat clock at commit/cut (or gate body-out to it), then re-run |
| 8 one-writer witness | **PASS** | `data-writer="asm-conductor"` constant across EVERY sample of every phase incl. both handoffs (8ms cadence + rAF cadence, both engines); no second claimant ever appeared |
| 9 drift direction | **PASS-B** | The chip vaporizes FIRST ✓ (gone while the body still granulates — vd-19.94 frame); the body erodes to the contentless medium (vd-20.02 = the empty-medium frame). BOUND: the ghosts' corner-ward drift direction is not resolvable at 25fps against the granular field — DEFER the direction sub-read to a 60fps-class capture |
| 10 condense bell | **PASS-B** | Cut→condense→grow: monotone, zero oscillation at arrival (25fps series 0.0073→0.0121→0.018, no wobble); the ~120ms bell interior is beyond 25fps resolution — bounded |
| 11 grow-with-content + hue conservation | **PASS-B / DEFER-part** | Height only grows; staggered island arrivals visible as ~80ms-class plateaus in the rise. The island-glow≡crest-hue paired-π comparison DEFERRED (needs a stable post-grow frame set + per-island rects) |
| 12 transferred v-perch row 4 | **RUN** | The composed organ ran end-to-end on the video path (perch charge → commit → 3-layer dissolve across `vapor-handoff` → beat → medium relax), both engines, with the one-writer witness green. **The m9 ban STAYS: rows 1 and 7 fail their bands — "proven together" is not yet earned; it lifts when the occlusion + beat-anchor cures land and re-run green** |
| 13 both engines | **PASS-B** (re-graded `[P3-AGG 2026-07-19, n5]` — the logged hitches earn the bound they'd earn anywhere else) | Full sequence driven on Chromium too (tap 1 · one writer · zero errors); gaps: WK 1×43ms across the whole session; CHR 4 >34ms incl. one 153ms hitch at reset (logged; reset-scoped, outside the organ windows) |
| 14 PRM sweep | **PASS** | Deploy steps to `session` posture at +120ms; sea `display:none` with the stepped chip; perch commit removes the card single-step; both engines |

**Body tally (recounted `[P3-AGG 2026-07-19, n1]`): 10 PASS-class (rows 2,3,4,6,8,9,10,11,13,14 — 6 bounded post-regrade) · 2 FAIL (row 1 occlusion, row 7 beat band; row 7's sign half passes) · 1 DEFER (row 5, +1 sub-read part on row 11) · 1 RUN-status (row 12 — a witness, not a verdict).**

## Order 10 — PASS-2 cure rows: F1 reverify §F1 rows 2/3/4/6 (G3/G7/G6/G4)

Page `prototypes/f1-scalar-spine/index.html` (predates the hud=0 switch — noted); logs
`CAP/f1/log-webkit.json`, traces `CAP/f1/r5-trace{,2}.json`. Note: `maps`/`cc` are IIFE-scoped
(the queue's "top-level bindings" claim is stale) — the badges (`t=…intent=…`) are the live
observables; the intent rows were sampled per-rAF off `#ccBadge`.

| row | verdict | evidence |
|---|---|---|
| 2 — Maps battery under the C2 register (G3), both engines | **PASS** | WK: pin 84%@83ms/settle 119ms · overpull zero-seed **1.2% (0.4px)** (the 32–33% class is dead) · overpull settle 187ms · flung 0.028s/143ms · catch dwell 170ms, near 0.009, **landed 579ms = 571±40 ✓** (the G3 landing gate, real and green). CHR: 85%/120ms · 1.2% · 189ms · 0.026s/144ms · catch landed 579ms. Every cell [ok]. CC battery beside it: medium 89–92ms, fade 201–203, stretch 589–591, ratio 1:2.9, beat 143–153, medium-gone 621–631 — the RE-FIT constants are live (a 112/686ms pass-1 reproduction would have failed the row; it did not appear) |
| 3 — PRM regression (G7), both engines | **PASS** | `--gl-t` computed: maps flick-open 0.0000→1.0000 at +120ms (one poll) → holds; flick-close 1→0; CC open/close identical; both engines. The pre-cure no-op (t stuck at 0 on flick-open from parked) does NOT reproduce |
| 4 — intent-law live rows (G6) | **PASS** | (a) ±13.6px@6Hz dither from the OPEN latch: 0 flips (124 rAF samples). (b) from the CLOSED latch at t=0.5 (spec-fidelity 6Hz waveform sampled ~62Hz): **0 flips on both engines**. (c) slow continue to 0.75: **exactly one flip, at value 0.588 on BOTH engines** (p = 0.588+0.15·v̄ crossing 0.60 — engine-portable to the thousandth). (d) fast flick from parked: first intent=1 frame at value 0.306 (WK) / 0.382 (CHR) < 0.5 (early commit ✓). Instrumentation note: a coarser 20Hz-sampled dither (13.6px teleport steps — harsher than the spec's waveform) produced 1 flip from the closed latch; the spec-fidelity drive holds 0 — the hysteresis is calibrated to the specified dither class, with that margin note |
| 6 — R5 clip-path residency, Chrome arm (G4) | **GREEN-B (no revert)** | 3 flick-open/close cycles, devtools.timeline, instrumentation sinks detached (badges/fps replaced with orphans — counts unchanged, so none of this is badge noise): per 520ms open window ≈ 102 Paint events, BUT attributed: `#document` 42 + `HTML` 41 (full-width doc-level pairs) + **`mapsSurface` 13 = 25% of growth frames — under the ≥50% revert trigger**; total paint time 12.8ms per window (~0.25ms/frame), layout 4.7ms, **0 tasks >24ms**. The clause's letter is GREEN (no per-frame card-body paint; no revert); the residual is a ~2/frame doc-level repaint pair costing ~0.25ms/frame — cheap, bounded, worth one line in the spec's residency note. WebKit half stays TOOL-DEFER (Web Inspector; the §O-4 campaign decision) |

**Body tally: 4 PASS/GREEN (1 bounded).**

---

## The defect register (paint-arm finds, this session)

| # | page:pin | defect | route |
|---|---|---|---|
| D1 | `v-perch/index.html:166-168` | seat = k=1 arc center — the WRONG GEOMETRY (circle-arc seat, not the apex relay). Cure re-issued per the A1 ruling `[P3-AGG 2026-07-19]`: apply the apex formula `R·(1−2^(−1/n))` with n from the AUTHORED corner shape; acceptance = seat point == apex (residual ≤0.5px) + fraction-outside telltale in **[0.55, 0.63]** — the old 62–69% band is DEMOTED (it embeds Apple's outward bias; an apex-exact cure would have failed it forever — the unfalsifiable-cure-loop trap, closed) | ATTENTION-EXIT continuation |
| D2 | `v-vapor/index.html:373-380` | stale release velocity after a still hold ⇒ false COMMIT from d≈0.35 (m6 window prunes only in pointermove) | ATTENTION-EXIT continuation |
| D3 | `v-wave/index.html:68-84` | idle breath computed-alive but paint-dead (1px rim, ≤~2% effective alpha; lossless range 0.00002 lum) — token 0.16 vs paint mismatch | the sea re-skin (lull filament); gate breaths on painted delta |
| D4 | proto-constellation live gate `aRehomeL` | re-home live delta 1.00px [no] vs ≤0.5px, both engines (node FLIP exact; live re-parent off) | constellation continuation |
| D5 | `spine-conductor/index.html:1190-1195` (+ `:1402`) | `setRow` missing `#` selector prefix ⇒ live battery + interrupt cells crash, both modes, both engines | SPINE-CONDUCTOR seat — blocks its QP rows 1–3 |
| D6 | proto-assembly beat anchor | handoff beat 256–397ms vs the 80–140ms class and not seed-invariant (snap tail rides inside the clock); sign itself is correctly positive. Cure sharpened `[P3-AGG 2026-07-19, A5+A7]`: (a) FIRST close the two-writer window — gen-guard `back`, cancel `vRaf` at the top of the handoff listener (the un-guarded return drain is the best available account of the stamp-impossible 367/397ms hot-seed reads); (b) stamp the medium delay from the CONTENT-OUT crossing, not the erosion clock's end (the ease-out tail spends its last ~27–46% traversing an already-empty body — analytic painted beat ≈190–270ms matches the measured 256/285); (c) replace the three tautology beat gates with gates on the derived PAINTED-beat quantity so they can fail; then re-run row 7 with instrumented anchors | PROTO-ASSEMBLY seat |
| D7 | `proto-assembly/index.html` (session dim observed; comments at :79,236-237,490) | world luminance −13%/−30% during a session vs the ±2% no-scrim law — the READING stands, the original diagnosis was UNSAFE `[P3-AGG 2026-07-19, A6 SUSTAINED]`: neither named painter can paint the world (`.darkmass` is clipped inside `.blackdock`'s `overflow:hidden`; no filter/scrim touches `.world`), and the 25fps VP8 path leaves adaptive-quantization dimming unexcluded. Cure re-issued: re-run the probes on Chromium LOSSLESS with rect arithmetic printed and probe regions strictly outside the CLAMPED (1.12×) dock extent; if the dim survives, hunt from the compositor — the "scrimless by construction" comments stay convicted until the lossless run clears them | PAINT-ARM re-run, then PROTO-ASSEMBLY if it survives |
| D8 | proto-assembly fired deploy (ledger row 4) | sim/paint overshoot disagreement ~40%: painted bottom-edge overshoot 2.63% vs the certified intrinsic 4.15% (the σ8 class — minted a defect number `[P3-AGG 2026-07-19, n6(i)]`). Hypothesis list: measurement base (274 vs 320px travel), integrator dt, 8ms sampling quantization, capture path; decide before any panel-arm re-tune | PROTO-ASSEMBLY seat + paint re-run |

Observations (not defects): SC R2 storm is contention-sensitive (GREEN clean, RED under
recording/first-run); v-alens Chromium `--engage-t` transient 1.0595 once; WebKit 24–33ms
posture-boundary gap class on the constellation (absent on Chromium); the vapor fired
contentless window ≈660ms end-to-end (input to the m1 re-band).

Dropped sub-claims re-entered `[P3-AGG 2026-07-19, n2]`: assembly QP-13's 48/64px mask
tiling read and QP-4's declared-filter repaint-cost note never got ledger cells — both
join the pass-4 paint queue; the tiling read matters (the decoded ghost-c 64px tile is
2-level alpha with ~2 features/tile, tiled ~6×3 across the card — exactly the repetition
MARKS-E §4.8 orders paint-judged).

## Drain state — RESTATED `[P3-AGG 2026-07-19, CRIT-ASSEMBLY A8 + n1 SUSTAINED]`

The original roll-up claimed "DRAINED per §O-3's definition" while silently rewriting that
definition's vocabulary (DEVICE/TOOL-DEFER became DEFER/BLOCKED) — the roll-up outran the
rows. Restated honestly, per class, 74 rows:

- **58 PASS-class** (17 carry stated bounds after the n5 re-grades) — of which the
  register-sensitive constellation/frosted rows are **RERUN-OWED** against the canon
  repaint and count as OPEN rows for every roll-up and cut condition (the chartered
  vocabulary, §O-3 as amended);
- **5 FAIL-class**: v-perch row 3 (D1) · constellation QP-6 re-home (D4) · assembly rows
  1 (D7) and 7-band (D6) · the v-wave breath visible-half (D3);
- **3 BLOCKED** (SC rows 1–3, D5): the D5 code cure LANDED at the agglomeration
  (`index.html` setRow prefix; node 71/71 re-verified) — the rows are now UNBLOCKED and
  their both-engine paint re-run is owed to the pass-4 window;
- **1 conditional** (SC row 9 — condition was the D5 cure; landed, live re-verify owed);
- **1 RUN-status** (assembly row 12 — the transferred organ ran; "proven together" stays
  banned until rows 1/7 cure and re-run green);
- **4 PAGE-DEFER** (frosted QP-6 referent; vapor (c) behind the fired re-band; v-wave
  organ read behind the sea re-skin; assembly row 5 k·v next window) — each with its named
  re-entry;
- **1 DEVICE-DEFER** (v-wave mic) · **1 DISCHARGED-N/A** (cross-page (e), oklab arm idle) ·
  the F1/SC WebKit residency halves stay TOOL-DEFER inside their rows.

**The ledger is NOT-DRAINED-with-named-remainder**: the remainder is exactly the 3
unblocked re-runs + 4 PAGE-DEFER + the RERUN-OWED register rows + the D6/D7/D8 re-runs.
Every remainder row has a named owner and re-entry; none is silent. The m9 "proven
together" ban REMAINS.
