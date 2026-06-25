# JUDGE-1 — W-ANIM-IOS27-TUNE (iteration 1)

**Verdict: PASS (meetsBar = true)**
**Date:** 2026-06-23
**Judge posture:** default-to-FAIL, independently reproduced every motion surface via real gestures + live frame-series on http://localhost:5173, both modes, Safari-relevance checked. PASS earned by independent proof, not by trusting BUILD-REPORT-1.

---

## What I independently verified (live frame-series — the painted truth, not the report)

### 1. Spring tokens — live `getComputedStyle` on the running app
Every clock + overshoot matches the new pole, sampled directly:

| preset | live clock | live overshoot peak |
|---|---|---|
| smooth | 0.45s | 1.0151 (+1.5%) |
| snappy | 0.40s | 1.0315 (+3.2%) |
| bouncy | 0.62s | 1.0934 (+9.3%) |
| gentle | 0.51s | 1.0000 (0%) |
| dock | 0.66s | 1.0730 (+7.3%) |
| press | 0.16s | 1.0151 (+1.5%) |

Every overshoot ∈ [0%, 10%]; every non-gentle clock ≥ HEAD; gentle exactly 0%. `--tab-indicator-max-stretch` = 1.18, `--dock-morph-max-stretch` = 1.14 live. Source `springPresets.ts` matches the live tokens (no drift).

### 2. /motion/springs — real Play gesture, frame-series
Clicked Play, sampled the travelling-dot translateX across real RAF frames: travels 0 → **peak 365.3 at t≈240ms (+1.5% overshoot)** → smoothly settles back to 360 by ~457ms. A clear inertial overshoot-and-settle arc, weighty arrival (~190ms to first reach target). NOT a tight snap. Page prose now reads "weighty, a whisper of life". DECISIVELY gooier.

### 3. /display/buttons — press register, full hold→release arc
Press-and-hold on the glass `<Button>`, sampled `--glass-btn-press-t`: rises 0 → 0.785 → **1.015 peak at t≈156ms** → hold → release decays 1.009 → 0.708 → 0.292 → 0.078 → **-0.015 undershoot at t≈372ms** → settles to 0 by ~490ms. The weighty inertial press with a tiny alive rebound. (A genuine fast tap is sub-frame and shows no visible movement — expected, not a defect.)

### 4. /dock/morph-showcase — the V↔H morph (the "MORPH MORE on move" reference)
Enabled "Liquid teardrop", pressed "Morph to horizontal", sampled `--dock-morph-t` across real frames: ramps 0 → **1.069 (+6.9% overshoot, the dock register)** → settles, over ~400ms. Morph completed end-to-end: button flipped to "Morph to vertical", MODE = LIQUID, T = 1.000. The dock register drives the morph with the new weighty overshoot. No regression.

### 5. /navigation/tabs — real tab switch, indicator glide+squish
Clicked Grid → Timeline (farthest tab). Sampled the indicator `--stretch`: reached **peak 1.132** during the glide (squish deformed, capped under the 1.18 max — MORE squish on move), then released and landed. "selected: timeline" + the glass-floating plate landed correctly under Timeline. Gestalt clean: warm glass pill over the live field.

### 6. /motion/deck — goo-morph worm (the liquid-weight law)
Clicked "Go to slide 4". The pager worm produced **199 distinct transform frames** with volume-preserving squeeze-stretch: `matrix(1.0342,0,0,0.9833…)` → `matrix(1.068,0,0,0.9676…)` → `matrix(1.1018,0,0,0.9527…)` — scaleX swells to ~1.10 while scaleY compresses to ~0.95, the gooey Google-deck worm. `--pager-worm-flow` is its OWN `linear()` curve, INDEPENDENT of `--spring-*` (the spring re-tune does not regress it). Deck advanced correctly to "4 / 6 Digit jumps".

### 7. Modes + Safari
- **Dark:** `--spring-dock-duration` 0.66s, `--tab-indicator-max-stretch` 1.18, `--dock-morph-max-stretch` 1.14 identical under `.dark` — motion is mode-invariant, confirmed.
- **Safari/WebKit:** the curves are plain `linear()` (Baseline 17.2+), no `-webkit` prefix, no unsupported function. The morph/squish are compositor-only `transform`; the `.glass-reveal` blur-settle rides `filter` not per-frame `backdrop-filter` (WebKit-safe). No WebKit-fragile animation introduced.

### 8. Console
- No console **errors** on any target page.
- Two pre-existing **warnings** (NOT introduced by this wave, NOT errors): a Vue `<Transition>` non-element-root warn (TooltipProvider) and a `useAurora` deferred-init warn. Both predate the motion wave (zero layout/structural edit in the diff).

---

## Non-blocking observations (NOT motion-wave defects, NOT failing this verdict)

1. **/dock/morph-showcase — the "Liquid teardrop" switch is occluded by the fixed bottom-nav dock at the default viewport (806px tall).** The switch sits at y770–794; the `position:fixed` `.demo-bottom-dock` covers y735–794, so `elementFromPoint` at the switch center returns the bottom-nav's "Dock Gallery" tab — a click there NAVIGATES away instead of toggling. Scrolling the switch up clears it. This is a **pre-existing demo layout/z-overlap (chip-grazes-content class, W-CHIP-GRAZE territory)**, NOT a motion regression — the spring re-tune changed zero layout/z-index/position. Flagging for a layout wave, not blocking this motion judgment.
2. The collapsible /dock/overview dock did not auto-collapse under synthetic hover (no real OS pointer-leave from the headless tool), so I could not capture its hover-collapse-expand frame-series in-situ. The morph clock (0.66s, live `tdur` on the dock element) and the morph-t animation are both independently verified on the showcase, so the dock morph is confirmed un-regressed.

---

## Why this PASSES the user directive decisively

The directive: SMOOTH, CONTROLLED, INERTIA, AUDACIOUS; NO tight/springy; gooey, flowing; MORPH MORE on move; no regression.

- **Smoother/gooier across the board:** every register's settle lengthened, the overshoots are an un-pointed touch (≤10%, the old pointed bouncy 12.6%/dock 10.7% retired), and the frame-series read as overshoot-and-settle arcs (spring dot, press rebound) — not tight snaps.
- **More morph on move:** tab squish peak 1.132 (cap 1.18), dock morph-t overshoot +6.9%, the worm scaleX 1.10 — all live-captured deformation.
- **Still audacious, not sluggish:** press peak by 156ms, spring target by ~190ms — responsive arrival on the longer clocks.
- **No regression:** dock morph, tab indicator, goo-morph worm, press interruptibility all verified live and working; the worm is engine-independent of springs.
- **Safari-safe, mode-invariant, compositor-only.**

The ONE motion register is re-calibrated to the iOS-27 weighty-gooey-inertial pole through a single drift-proof table, and every named surface reads it correctly under real gestures.
