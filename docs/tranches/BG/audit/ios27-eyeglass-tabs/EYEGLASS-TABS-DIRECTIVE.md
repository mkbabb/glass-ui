# USER DIRECTIVE (2026-07-10) — the iOS-27 EYE-GLASS tabs toggle/select effect

> "We should serve to perfect, within the bounds of CSS and modern web design, the eye-glass ios27 tabs
> toggle select effect. Provide a frame by frame analysis and design and iteration loop to recreate:
> ~/Downloads/ScreenRecording_07-10-2026 16-26-07_1.MP4"
>
> AMENDMENT (mid-turn, same day): "that above implementation must be backed by a concrete research, plan,
> and tranche write phase. This is an amendment to our extant tranche spec. Not a frenetic and adhoc
> implementation hereof."

STATUS: directive MARKED. Execution path = research → plan → tranche-write (the amendment), authored by a
dedicated workflow; the implementation lands only as a properly specced wave folded into the cursor by the
orchestrator. NO ad-hoc implementation.

## Reference corpus (extracted, on disk)

- Source: `~/Downloads/ScreenRecording_07-10-2026 16-26-07_1.MP4` — 1206×2622 @ 60fps, 12.96s, Find My
  (iOS 26/27 liquid-glass tab bar: People · Devices · Items · Me).
- `frames/f-%03d.png` — 389 frames @ 30fps, 720w (whole screen; gesture bursts at f-063–077 app-switch,
  f-103–111 app-open, f-243+, f-285–297, f-325–333, f-355 = the tab-bar events).
- `bar60/t{1..4}-%02d.png` — 220 full-res 60fps crops of the tab-bar band (1206×260 @ y=2340), windows
  t1=7.8s t2=9.3s t3=10.6s t4=11.6s (+0.9s each).
- Motion index (RMSE diff scan): t2 spikes at 22/34; t3 sustained 12–27; t1/t4 milder.

## Orchestrator seed observations (Fable, from the money frames — to be completed by the research phase)

1. **The lens is real refraction, not a tinted plate** (t2-15, t3-11): backdrop content is MAGNIFIED through
   the pill; the avatar photo visibly bends around the pill's top rim; near-rim content displaces outward
   (droplet/loupe optics — edge-concentrated displacement, thin interior).
2. **The pill sits PROUD of the bar** (t3-15): crown overflows above the bar capsule edge and base below it —
   a loupe resting ON the track, not an inset highlight. Distinctly taller than its slot.
3. **Rim register** (t3-11): a thick luminous rim reading as refracted edge-light, hue-stealing from backdrop
   + accent (cyan over the teal Find My theme); over calm dark backdrops it recedes to a soft specular
   top-edge + shadow base (t3-15, t2-22).
4. **Selected ink**: glyph + label tint to the app accent (cyan/teal) while unselected stay white; the swap
   reads as part of the lens arrival.
5. **Kinematics (provisional)**: tap → travel+settle within ~150–250ms (t2 spike-pairs 22/34 suggest fast
   travel legs, ≤4 frames mid-flight); the heavy optics READ at rest; mid-flight the lens carries
   squish/stretch (t3-11 wider-than-rest capsule). EXACT per-frame x/width/height/overshoot table = research
   phase deliverable (the 60fps crops support it).

## House primitives the plan MUST compose (never fork)

`SegmentedTabs` pill indicator (`useTabIndicator`, center-anchored, `--spring-snappy` + `--tab-indicator-duration`,
`useLiquidFlex` reciprocal squish, `:draggable` via `useDragMorph`) · the `.glass-lens`/`#glass-refract`
squircle-bevel displacement lens (W-LENSING) + `--glass-refract` depth axis · `--glass-accent` rim axis
(W-GLASS-ACCENT) · the dock selected-as-glass register (W-REGISTER-IOS) · the per-spring settle clocks
(W-GLASS-CAL) · PRM carves per W-MOTION-CANON. Safari-July-2026 bound is binding (the lens must degrade
honestly off `backdrop-filter: url()` engines — NO masking fallback, per the NF edict).

## Amendment requirements (what the tranche-write must produce)

- A full wave spec (the eyeglass-tabs register) with: the frame-by-frame kinematic table as binding criteria,
  a `proof:*`-class device-free gate + self-test bites, and the π = a LIVE-GESTURE 60fps frame-series judged
  against THIS reference ladder (the IOS27-MOTION-TRUTH blind-spot rule: never a settled capture) on both
  engines, both modes.
- The iteration loop: build → capture frame-series → compare against `bar60/` reference kinematics + optics →
  refine, to convergence (the recreate-iterate harness definition, engine-compatible).
- The fold block: a born-RED cursor row ready for the orchestrator to fold (the engine implements it; the
  orchestrator owns the cursor edit).

## Corpus reproduction (frames/ + bar60/ are gitignored for weight — regenerate deterministically)

```sh
V='/Users/mkbabb/Downloads/ScreenRecording_07-10-2026 16-26-07_1.MP4'
ffmpeg -y -i "$V" -vf "fps=30,scale=720:-1" frames/f-%03d.png
ffmpeg -y -ss 7.8  -t 0.9 -i "$V" -vf "fps=60,crop=1206:260:0:2340" bar60/t1-%02d.png
ffmpeg -y -ss 9.3  -t 0.9 -i "$V" -vf "fps=60,crop=1206:260:0:2340" bar60/t2-%02d.png
ffmpeg -y -ss 10.6 -t 0.9 -i "$V" -vf "fps=60,crop=1206:260:0:2340" bar60/t3-%02d.png
ffmpeg -y -ss 11.6 -t 0.9 -i "$V" -vf "fps=60,crop=1206:260:0:2340" bar60/t4-%02d.png
```
`keyframes/` (committed) carries the money frames: t3-11 (lens mid-state, full optics), t2-15 (avatar refracting
through rim), t3-15 (pill proud of bar), t2-22 (calm-backdrop attenuation), f-115 (whole-screen context).
