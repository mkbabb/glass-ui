# CORPUS-VIDEOS-B — the seat redo (IOS27-MICRO corpus redo, 2026-07-19)

- verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat: corpus:VIDEOS-B.
- assets (3): `ScreenRecording_06-24-2026 21-44-31_1.MP4` (b1 = sr-0624-2144, Siri surfaces, 22.79s), `ScreenRecording_06-24-2026 22-07-29_1.MP4` (b2 = sr-0624-2207, Spotlight, 12.49s), `ScreenRecording_07-10-2026 16-26-07_1.MP4` (b3 = sr-0710-1626, Find My lens, 12.96s). Plus the chartered spot re-verify of one VIDEOS-A finding (§1.1).
- frames: `scratchpad/corpus-redo/VIDEOS-B/` — 8fps surveys (483w) + 60/24fps measurement bursts (603w = 0.5x native); every set's t0+fps contract in its `README.txt` (frame N sits at t0+(N−1)/fps). Provenance: the burst layer was extracted by an interrupted prior VIDEOS-B pass in this same scratchpad (its `extract.sh` documents every command); this seat VERIFIED the contract before use — a fresh single-frame re-extraction at fm-lensbirth t0 compares byte-identical (maxdiff 0). All measurements, trackers (`fb_fm*.py`, `fb_siri.py`, `fb_spot.py`, `fb_reverify.py`), and readings below are this seat's own.
- method: per-column/row luminance-excess trackers with rest-frame baselines; template-SSD position trackers with subpixel parabola refinement; RMS-to-endpoint crossfade traces; horizontal-gradient energy as the blur proxy; consecutive-frame max-diff duplicate detection (the VFR honesty channel — all three sources are VFR at ~52-59 avg fps, and ffmpeg fps=60 resampling duplicates dropped frames; every trace carries dup flags). Grades: MEASURED / BOUNDED / INCONCLUSIVE; the lens-blink and detent-arrest aliasing traps govern; nothing is calibrated on a frame not proven at rest.
- prior canon EXTENDED and CORRECTED: `refable-timelines/sr-0624-2144.md`, `sr-0624-2207.md`, `sr-0710-1626.md`, `MARKS-A.md`, `MARKS-B.md`, `IOS27-CODEX.md` (laws by number), `../MARKS.md` (07-17 corpus + PASS-2), `CORPUS-VIDEOS-A.md`. Fresh 60fps evidence wins conflicts; agreements are cited, not re-derived.

**The systematic bias this corpus must confess:** in THREE separate events (b3 lens birth, b3 home-zoom shrink, b1 orb formation) the recorder drops frames exactly at the compositor-heaviest instant — the moment under measurement. Same failure class as VIDEOS-A's a1 lens transit. Any "≤ one frame" claim from these recordings is a bound on the recording, not on iOS; pop-vs-growth questions stay INCONCLUSIVE unless a clean-cadence window catches them.

---

## 1. The fresh measurement layer

### 1.1 The spot re-verify: VIDEOS-A C-A2 — CONFIRMED

Independent re-derivation of the CC overpull-release register (a4 `rel60`, contract t0=4.55 fps=60 per the VIDEOS-A README): own tracker (template-SSD over the settled CC module block, subpixel), own damped-oscillator grid fit, no reuse of VIDEOS-A's series or numbers.

| quantity | VIDEOS-A claim | this seat | verdict |
|---|---|---|---|
| ζ (full free segment 4.717–5.183) | 0.71 | 0.72 (bracket 0.70–0.74) | CONFIRMED |
| f_d | 1.60Hz | 1.62Hz (bracket 1.54–1.70) | CONFIRMED |
| single overshoot | 18.9 native px | 18.3 native px at t=5.000, no second excursion | CONFIRMED |
| crossing velocity / k | ~670 px/s, k≈0.028s | ~605 px/s, k≈0.030s | CONFIRMED within noise |
| critical-damping alternative | 2.9x worse | 4.3x worse | CONFIRMED (rejected) |

Method note, honest: a tail-only window (from rest-crossing) is DEGENERATE here — one overshoot lobe plus creep lets (ζ, f_d) trade off (my tail fit wanders to 0.39/2.46Hz at 0.14px RMS). The full-segment fit is the authority for single-lobe events; VIDEOS-A's quoted window was the full segment, and it stands. The unified arrival register (ζ 0.71–0.82, f_d 1.6–2.1Hz, overshoot = k·v, k≈0.02s) survives an adversarial re-derivation.

### 1.2 The light-overshoot / position-dead law (NEW, cross-video)

Two independent CC opens measured at 60fps produce the same split-channel signature:

- **Position never overshoots.** b2 ccopen module-row settle: +35px (603) below final → 0 over ~180ms, per-frame decay ratio ~0.80 (τ≈75ms), dy never crosses negative. b2 release-pop keyboard: final 108px (603) of travel in ~85ms, monotone deceleration, never crosses. Both are the zero-crossing-velocity arrivals the k·v law predicts land dead.
- **Luminance DOES overshoot.** Both condensations show the mod→Z distance dipping (ghosts near final brightness) then HUMPING (b2: 49→84.7 at 11.65→11.78; b1: 75.9→81.6 at 22.22→22.33) before the monotone fall — the frosted ghosts bloom PAST final luminance and condense down. The "born brighter, condense to material" read (MARKS-B V3, law 8) is now a measured overshoot in the light channel.

**The law: overshoot lives in the LIGHT channel; geometry buys overshoot only with velocity.** This is the cleanest statement yet of why iOS entrances feel alive without feeling springy — and it is exactly SUFFUSION §1.1's release-vs-settle split (light cools last) measured in the wild.

### 1.3 The blur cliff, timed at 60fps (feeds N8)

- b1 CC flick: upper-band gradient energy 4.60→1.26 in ONE 16.7ms step (22.133→22.150), trough 0.98 at 22.167. Cliff ≤33ms.
- b2 CC flick: 3.23→1.54 in one step (11.567→11.583). Cliff ≤33ms.
- The dim (luminance ramp) is separate and slower both times (~100–150ms), and content/position settle runs to ~450–480ms total (b1 22.63; b2 12.03).

Prior "≤100ms" was cadence-limited; the medium onset is a true one-to-two-frame slam. N8's scrubbed-onset divergence now has its measured target: iOS pays a ≤33ms cliff; ours ramps over the first 1/φ of gesture travel and must never read slower for it.

### 1.4 The commit hard-cut (b3, feeds law 16c)

At 60fps the Find My commit #1 crossfade is not a crossfade: sheet RMS-to-start jumps 1.1→41.1 in ONE frame (8.033→8.050) AND the new Devices sheet is fully READABLE in that same frame — header, three rows, names, statuses (f-016 visual). Old-out ≤17ms, new-in ≤17ms. The ~150ms "crossfade" tail (sheet→Z 25.5→9.9 by 8.200) is light decay — bar wash dimming, lens glow, row thumbnails sharpening — not content fade. A discrete second step at 8.300 is row data popping in. The content was pre-staged during the 3.5s scrub; the swap itself is a hard cut under trailing light.

### 1.5 The whole-bar wash, quantified (b3, NEW to this asset's ledger)

Bar-region luminance (People zone, 200px from the touched tab): rest 119 → +15 the same frame the lens births (4.500) → peak +41 (~+35%) at ~4.65–4.68 (+160ms) → sustained +31–43 through the ENTIRE multi-second scrub (still +37 at 7.80) → decays to 0 over ~250ms after the commit lands (8.05→8.30). The Me pill's identity transfer reads simultaneously (+38 as the darker pill vanishes into the lens). The wash is scrub-STATE light, not an event flash: the component displays "I am held" for the hold's whole life and releases the light only after the commit. MARKS §3's press-charge wash generalizes: charge → sustain → release, one envelope (`--engage-t`'s full arc, measured).

---

## 2. Per-asset marked tables

Engagement scalars are SUFFUSION §3.1-3's six: `--flex-vel`, `--motion-weight`, `--engage-t`, `--overpull`, `--impulse`, `--scrub-t`. Momentum regimes cite IOS27-CODEX law numbers.

### b1 — sr-0624-2144 (Siri surfaces over YouTube, 22.79s) — timeline cited: `sr-0624-2144.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| orb formation, light leads shape | 2.80–3.13 | MEASURED — fresh 60fps | the island's LIGHT changes first — engagement announced before geometry (`--engage-t` leads) | fire-and-forget morph out of the island (laws 9, 18) | lead measured 50–90ms (lum onset 2.80–2.82, shape 2.85–2.90, one 33ms dup gap); bottom edge lands 3.10–3.13 (~280ms) — prior ~80ms lead + ~300-350ms total CONFIRMED |
| orb→pill staged-axis morph | 18.07–18.98 | MEASURED — fresh 60fps | the sparkle nucleus carries the energy across the transition (state continuity of the light channel, law 17); rim chroma dies at squash onset, aurora returns late | staged axes, one morph (law 9) | C-B6: the squash OVERSHOOTS final height (H 174→99→155 @603 — a trough ~3.7x deeper than the net change) and re-inflates during the widen; geometric widen begins DURING the squash (f-033 visual: ~1.5x rest width at the trough); the old "squash completes THEN widen" was the light channel's ordering. Bright-extent peaks 18.73 then retreats ~1.5-2% over ~200ms — "critically damped, no overshoot" is too strong; the retreat sits exactly in the k·v 1-2% band (geometry vs edge-light cool INCONCLUSIVE). Shape ≈660ms, text +220ms |
| results-panel desync (geometry→content→rim) | 4.90–6.00 | MEASURED (prior) | empty slab first; content fades in blurred; aurora rim trails ~0.5s then hue-cycles — idle light licensed on the LIVE surface only | detuned channels, fixed lead order (law 5) | agrees; cited |
| panel dismissal rim-crush + flare | 11.07–11.82 | MEASURED (prior) | the aurora flares to clip-max exactly while the edge moves — Q3 keyed to edge velocity (law 3) | two-phase fired close (law 15) | agrees; cited |
| banner seed-grow in / corner-tuck out | 4.25–6.0 et al. | MEASURED (prior) | passive frost: zero engagement scalars — the anti-exemplar that makes the Siri bodies read alive | grow-from-seed, no edge slides (law 18) | agrees; cited. Hard z-overlap over the orb remnant re-confirms law 6's inter-body fence |
| CC flick blur slam | 22.13–22.63 | MEASURED — fresh 60fps | medium change as the fastest channel in the system | fire-and-forget, ballistic completion (law 15) | C-B2: cliff ≤33ms (was "≤100ms"); dim ~100-150ms; content+settle ~480ms; the ghost-bloom luminance overshoot (§1.2) |
| non-modal float | ~10.4 | MEASURED (prior) | background stays LIVE under the panel — taps navigate beneath | — | agrees; cited |

### b2 — sr-0624-2207 (Home + Spotlight, 12.49s) — timeline cited: `sr-0624-2207.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| banner materialize / rest / evaporate | 0.59–2.05 | MEASURED — fresh 24fps | whole-banner scales as one unit; blur+opacity concurrent; no overshoot in any geometric channel | grow-from-seed in, slide-up + chip-ghost out (law 18) | C-B1: entry ≈550ms (onset 0.59, settled ~1.15; includes an ~80ms VFR stall) — the prior ~350ms was a 12fps threshold artifact; coheres with b1's ~550ms banners. Rest-to-exit ~370-400ms (timed self-collapse CONFIRMED). Exit two-phase confirmed: slide-up 1.55–1.63, chip fade to ~2.05 |
| Spotlight tracked pull | 2.55–3.65 | MEASURED (prior) | ONE progress scalar scrubs slab growth + dim + blur + push-down (`--scrub-t` master); rim brightest mid-pull (velocity-keyed, law 3) | tracked leader (law 15) | agrees; cited |
| release pop: caret→panel→keyboard | 3.70–4.05 | MEASURED — fresh 60fps | fixed-duration pop regardless of pull speed; the field says ready before the tools arrive | fixed ~200-250ms release pop (law 15) | panel fade 3.85→4.05 + tail to 4.20; keyboard's final 108px (603) in ~85ms, monotone deceleration, ZERO overshoot (§1.2); caret-leads-panel INCONCLUSIVE via my blueness proxy (a caret-glow bloom peaks at 4.017) — prior ~80ms lead stands unrefuted |
| dismissal fire-and-forget | 5.95–6.25, 9.87–10.15 | MEASURED (prior) | close is never the reverse scrub; keyboard strictly last-out | fire-and-forget close (law 15) | agrees; cited |
| CC condensation | 11.57–12.03 | MEASURED — fresh 60fps | tiles born as luminance-OVERSHOOTING ghosts (the mod→Z hump, §1.2); home stays visible beneath | flick → ballistic completion (law 15) | C-B2: blur cliff ≤33ms; position settle 35px/~180ms exponential, no overshoot; full settle ~450ms (prior "200-250ms" was the visual read at 12fps) |
| search pill ↔ page-dot morph; springboard touch-down scale | 0.45–2.2 | MEASURED (prior) | the WHOLE springboard scales ~2-3% on touch-down — engagement acknowledged by the page itself (`--engage-t` at surface scale); the pill swaps content in place | goo-morph candidate (law 12 sibling) | agrees; cited |
| island z-supremacy | throughout | MEASURED (prior) | the island's black stays topmost; banners slide UNDER | law 17 | agrees; cited |

### b3 — sr-0710-1626 (Find My tab lens, 12.96s) — timeline cited: `sr-0710-1626.md`

| mark | t (s) | grade | breath of life (scalars) | momentum regime (law) | fresh delta |
|---|---|---|---|---|---|
| lens birth at the touched tab | 4.43–4.50 | BOUNDED | one-highlight rule: the pill's identity transfers into the lens the same frame | press-born lens (law 16c) | C-B4: birth ≤67ms (last clean rest 4.433 → fully formed 4.500); the recorder drops the intermediate frames — pop-vs-growth INCONCLUSIVE in this asset (the corpus's third hitch-at-the-event) |
| the whole-bar wash | 4.50–8.30 | MEASURED — fresh 60fps | §1.5: +15 at birth → peak +41 (+35%) at +160ms → sustained for the hold's LIFE → released ~250ms after commit. The container displays the hold continuously | engage-state light, not event light (`--engage-t` full arc) | C-B5: NEW to this asset's ledger (prior timeline recorded only the local glow bleed); generalizes MARKS §3's press-charge wash into charge→sustain→release |
| velocity elongation + finger lock | 4.5–7.9 | MEASURED (prior) | width, not lag, is the velocity display (`--flex-vel`); zero detectable lag | tracked scrub (laws 15, 16c) | agrees; cited. Sibling labels stay legible under the scrub-wash (f-038 visual) — the scrub lens is dimmer than the 07-17 morph bloom; N3's gate binds the TRAVEL bloom, not the hold wash |
| endcap overpull hold | 6.25–6.67 | MEASURED (prior) + visual 60fps | lens compresses against the rigid bar end, content shifting inward; glow bleeds past the rim onto the sheet | position-locked overpull, no oscillation while held (laws 15, 16c) | f-038 confirms at 60fps: pinned, stable, label inward, glow pooling below-left; luminance rises steadily while pressing the far endcap (6.85→7.02, +65%) — the strain-light read (N4's kin), BOUNDED (tracker cannot fully separate lens from label region) |
| commit desync | 7.95–8.50 | MEASURED — fresh 60fps | sheet hard-cut ≤17ms; light decays ~250ms; annotations two-phase ~200ms; row data pops at +250ms | commit on release only; four channels, fixed lead order (law 16c) | C-B3: "crossfade ≤85ms" → hard cut ≤17ms BOTH directions with content pre-staged during the scrub; the measured tail is light, not content. Devices rows landed WITH data ≤100ms post-release here — skeleton-first is the fallback when prefetch missed, not the constant |
| home-gesture zoom + blur trail | 1.95–2.65 | MEASURED — fresh 60fps | the medium (home blur) resolves AFTER the body lands — gradE trough 2.25–2.28, de-blur ramp ~200ms ending ~2.47–2.50 | flick-consumed travel, fire-and-forget license (laws 5, 15) | blur-trails-close ~250ms CONFIRMED by gradient energy; the shrink's fastest span sits inside recorder-dropped frames — "95%→24% in one 83ms frame" stands as a bound, not a curve |
| adaptive tint + toggle aura | throughout | MEASURED (prior) | sheet = tint chameleon; the green toggle blooms OUTWARD into surrounding rows ("lit from within", law 2) | — | agrees; cited |

---

## 3. The breath-of-life index (lens 1 rollup)

| asset | never static | responds to touch | responds to scroll/position | responds to attention/intent | scalars expressed |
|---|---|---|---|---|---|
| b1 | aurora streak/rim hue-cycling on LIVE Siri bodies (the one idle-light license); sparkle nucleus surviving every surface transition | orb light-lead on invocation; rim flare keyed to edge velocity at dismissal | — | non-modal float: the app beneath stays live; status bar yields and returns at partial alpha | `--impulse` (flare), `--engage-t` (light-lead), `--motion-weight` (detuned channel lags) |
| b2 | nothing idles — the home breathes only under gesture | springboard scales 2-3% on TOUCH-DOWN (the page acknowledges); pill↔dots morph; tracked pull scrubs four channels on one scalar | `--scrub-t` master during the pull; rim brightness = f(pull velocity) | caret announces readiness before the tools arrive | `--scrub-t`, `--engage-t`, `--impulse` (pop), `--flex-vel` (rim-by-velocity) |
| b3 | the wash: the tab bar is lit for the entire hold — the richest sustained-engagement exemplar in the whole corpus | lens birth ≤67ms at the TOUCHED tab; wash charge→sustain→release; endcap strain light | lens width = f(finger velocity); compression = f(overpull depth) | commit releases everything at once: content hard-cut, light exhales over 250ms | `--engage-t` (full arc), `--flex-vel`, `--overpull`, `--impulse` (commit), `--scrub-t` |

Corpus-wide reading for SUFFUSION: these three assets add the STATE dimension to VIDEOS-A's event reading — engagement light is not only spent at displacement/motion, it is HELD for the lifetime of a hold (b3's wash) and OVERSHOOTS only in the light channel at entrances (§1.2). Geometry stays dead-landing unless velocity pays; light is where iOS spends its exuberance. The zeros stay load-bearing: banners and CC modules at rest express nothing.

---

## 4. The components-touched index (lens 2)

Shipped state verified on disk this session (paths under `src/`). HAS / LACKS / CONTRADICTS. Our design language governs every recommendation — warm cream, deft rounding, our palettes, our glass; the exemplars teach registers, never skins.

| component | exemplar | the register it teaches | shipped state + pins |
|---|---|---|---|
| **tabs** | b3 lens end-to-end | press-born lens at the TOUCHED item; whole-bar wash held for the hold's life; width=f(velocity); endcap compression; commit-on-release with hard-cut content + ~250ms light release | HAS commit-on-release (`components/tabs/composables/useTabDragMorph.ts:44,108` — fling-to-nearest commits the selection) with tanh stretch → `--flex-vel` → `--motion-weight` (`useTabDragMorph.ts:127-134`); HAS travel-squish with release-at-arrival (`composables/motion/morph/useSelectionIndicator.ts:76-77,170-183,273-278`); LACKS the whole-bar wash entirely (no engage-light channel in `components/tabs/styles/*` — C-B5 is the teach: charge→sustain→release on `--engage-t`, cheapest sustained-engagement win in the campaign); LACKS the commit light-release beat (selection lands with no ~250ms exhale) |
| **dock** | b3 (shares the lens contract), b2 island z-supremacy | same lens grammar at nav register; chrome that yields and returns at partial alpha | VIDEOS-A's pins stand (collapse machine, `useScrollChrome`, DOCK_SPRING corpus-true — re-verified this session at `composables/motion/spring/springPresets.ts:95-99` {0.30, 0.82}, inside the §1.1 register); the wash LACKS here identically |
| **blob** | b1 orb→pill morph + orb material | staged axes with a measured anticipation trough (squash past final height ~3.7x the net change, re-inflate during widen); sparkle nucleus as the persistent energy carrier; smoky refractive glass | HAS the anticipation vocabulary at trace dose (`components/blob/composables/easing.ts:39-48` — inward squash dips ~6% below the merged floor) and velocity squash-stretch (`components/blob/composables/uploadBlobUniforms.ts:156`); LACKS the macro orb↔pill pole morph with the deep trough (C-B6's measured anatomy — the iOS trough is ~43% of height, our dip is 6%; the BJ blob greenfield owns this) and the surviving-nucleus energy carrier |
| **aurora** | b1 aurora streak/rim: hue-cycles on live surfaces, flares with edge velocity | idle light licensed ONLY on live/primary surfaces; intensity keyed to edge velocity | HAS OKLCh hue-arc machinery (`components/aurora/constants/presets.ts:210-213` huePath); LACKS any velocity/edge-keyed caustic token — the only shipped moving specular is pointer-anchored (`styles/glass-specular-track.css:1-11`), never velocity-keyed (law 3's first-class clause; family-F work) |
| **command / search** | b2 Spotlight, the full grammar | ONE scalar scrubs slab+dim+blur+push (tracked); fixed ~200-250ms release pop with caret→panel→keyboard order; fire-and-forget close, keyboard last-out | LACKS the tracked/pop split — `components/command/CommandDialog.vue` has no scrub/track hooks (grep clean); opens on the standard dialog reveal. SUFFUSION D's search Q10 ◐ (mobile command-sheet growth) is exactly this grammar's landing |
| **dialog** | b1 results panel (geometry→content+200ms→rim+500ms); b1/b2 CC (medium ≤33ms cliff we soften via N8); non-modal float | empty-slab-then-content; detuned clocks; exits fade-led, never mirrors | HAS the graded box-following backdrop + interrupt-safe scrim-on-live-scalar (`components/dialog/DialogContent.vue:50-51,66,375-381`); CONTRADICTS the desync law at panel scale: `.glass-reveal` couples scale+opacity+blur on ONE clock and the exit is "the enter bloom REVERSED" by design (`styles/animations.css:146-157`) — the measured grammar wants content trailing geometry ~200ms and a non-mirrored, fade-led close (SUFFUSION F contract; F3 conductor demand) |
| **toast** | b1+b2 banners: seed-grow in (~550ms), timed rest, slide-up + corner-tuck-chip out | entrances grow from a seed (never edge slides); the exit files itself away — the lingering miniature is what makes it physical | HAS the seed-grown transient enter, explicitly not-a-slide (`components/toast/Toast.vue:91-98`); CONTRADICTS exit asymmetry (the mirrored `glass-reveal-out`, `styles/animations.css:146`); LACKS the corner-tuck exit register and swipe-release velocity inheritance (VIDEOS-A's pin stands) |
| **switch** | b3 Share-My-Location toggle: the green aura blooms OUTWARD into surrounding rows | saturated in-glass accents leak out — "lit from within" (law 2 companion clause) | LACKS — no bloom/aura/glow channel in `components/switch/Switch.vue` (grep clean); pairs with VIDEOS-A's displacement-light verdict as the switch's second cheap unshipped win |
| **pager-dots** | b2 search pill ↔ page-dot morph in place | one capsule swaps CONTENT in place between modes (pill↔dots) — law 12's fill-pill grammar | HAS the dot-to-dot goo worm (`components/pager-dots/composables/usePagerWorm.ts:1-16` — two-edge lead/trail, velocity carried, release-at-arrival emergent); LACKS the MODE morph (pill↔dots in one capsule) |
| **skeleton** | b3 commit: rows landed WITH data ≤100ms (pre-staged during the scrub); row-data pops discretely at +250ms when late | prefetch-during-gesture makes skeleton the FALLBACK; the surface never gates on data; late data upgrades in place | HAS the primitive; the scan-sweep vocabulary tension re-flagged (`components/skeleton/Skeleton.vue:54,59` skeleton-scan vs SUFFUSION §1.1's one drift vocabulary — adjudicate at the suffusion build) |
| **animated-digit / metric** | b3 "Directions"→"5 min" in-place chip upgrade | text affordances upgrade in place, no reflow (law 17) | HAS the numeric register (`components/animated-digit/AnimatedDigit.vue:8-11`); the TEXT-chip swap-in-place register (non-numeric) has no primitive — small, noted, not chartered here |
| **app-zoom class (useViewTransition)** | b3 zooms: live content frame one, blur trails close ~250ms, flick-consumed travel | the fire-and-forget license class | still ZERO consumers (`grep -rln useViewTransition` → index re-exports only); N11's theme flip remains the chartered landing; the ≤33ms medium cliff (§1.3) is the defect N8 softens |
| **dark-mode-toggle** | b1/b2 CC medium slam — the page-level medium change | N11: medium leads, content follows, nothing stretches | LACKS the medium choreography (no view-transition wiring in `components/dark-mode-toggle/`); N11 unshipped |
| **badge / status chrome** | b2 island z-supremacy | one element owns the top of the z-world; overlays pass beneath | LACKS as a documented covenant (no z-supremacy contract in overlay tokens); VIDEOS-A's migrate-don't-fade LACKS stands alongside |
| **header-ribbon** | b1 status bar yields to Siri surfaces, returns at partial alpha | chrome cedes to an owning surface, returns in two steps | LACKS — HeaderRibbon static (VIDEOS-A pin stands); the partial-alpha return is a new nuance for the same wiring |
| **popover / select / drawer / carousel / tooltip …** | — | — | no NEW teach from these three assets beyond VIDEOS-A's rows; not re-claimed |

---

## 5. Corrections ledger (this seat's deltas, consolidated)

1. **C-B1** — sr-0624-2207 P1: banner entry ~~"~350ms (0.70→1.08)"~~ → MEASURED ≈550ms (0.59→~1.15, incl. an ~80ms VFR stall); the 12fps read missed the early ghost and the edge completion. Law 18's 350–550ms band holds at its top. Rest-before-self-collapse ~370–400ms; timed self-collapse CONFIRMED.
2. **C-B2** — sr-0624-2144 P6 + sr-0624-2207 P4 + MARKS-B: the CC blur slam is ≤33ms (both videos, 60fps), not ~~"≤100ms"~~; dim ~100–150ms separately; full content+position settle ~450–480ms, not ~~"200-250ms first-paint-to-settled"~~. The ghost condensation carries a measured LUMINANCE overshoot (the mod→Z hump) while position approaches monotonically (§1.2).
3. **C-B3** — sr-0710-1626 P3 + law 16c: ~~"sheet crossfade ≤85ms"~~ → hard cut ≤17ms in BOTH directions, content pre-staged during the scrub; the 85–150ms tail is light decay, not content fade. Devices rows landed WITH data ≤100ms post-release — skeleton-first is a fallback, not the constant.
4. **C-B4** — sr-0710-1626 P1: lens birth ~~"≤83ms, single-frame"~~ → BOUNDED ≤67ms; the recorder drops frames exactly at the birth; pop-vs-growth INCONCLUSIVE in this asset. Third instance of the hitch-at-the-event bias — named in the header as a corpus-level confound.
5. **C-B5** — sr-0710-1626 P1 EXTEND: the whole-bar wash was missing from this asset's ledger; measured as charge (+15 instant) → peak (+41, +160ms) → sustain (the hold's life) → release (~250ms post-commit). MARKS §3's press-charge wash generalizes to a full hold envelope.
6. **C-B6** — sr-0624-2144 P5 + codex law 9: ~~"no width overshoot — critically damped"~~ amended — bright-extent retreats ~1.5–2% from peak over ~200ms (single excursion; geometry vs edge-light-cool INCONCLUSIVE; either way inside the k·v 1–2% band, no fence pressure). The staged-axis anatomy CORRECTED: the squash overshoots final height (174→99→155 @603, a trough ~3.7x the net change) and the geometric widen begins DURING the squash — "squash completes, then widen" was the light channel's ordering, not the geometry's. Shape ≈660ms (incl. the ~80ms sparkle-peak pause), text +220ms.
7. **C-B7** — sr-0624-2144 P1 sharpened: light-leads-shape lead = 50–90ms measured at 60fps (with one 33ms dup gap); formation-to-landing ~280ms. Prior claims CONFIRMED within bounds.
8. **Re-verify** — VIDEOS-A C-A2 CONFIRMED by independent tracker + fit (§1.1): ζ0.72/f_d1.62Hz/18.3px/crit×4.3 vs claimed 0.71/1.60/18.9/×2.9. Method caveat recorded: tail-only windows are degenerate on single-lobe events; full-segment fits are the authority.
9. **Confirmations banked** (cited, not re-derived): keyboard last-in with zero-overshoot deceleration; release-pop channel spans; banner exit two-phase; home-zoom blur-trails-landing ~200–320ms ramp; endcap hold stability + inward content shift; one-highlight rule at birth; hard z-overlap of independent bodies (law 6 fence); island z-supremacy; springboard touch-down scale; DOCK_SPRING on-disk {0.30, 0.82} corpus-true.
