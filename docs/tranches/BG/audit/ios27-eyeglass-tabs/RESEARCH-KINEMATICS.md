# RESEARCH ARM 1/3 — Frame-by-frame KINEMATICS + OPTICS of the iOS-27 eye-glass tabs

Reference: `~/Downloads/ScreenRecording_07-10-2026 16-26-07_1.MP4` (1206×2622 @ 60fps, 12.96s, Find My — People · Devices · Items · Me). This doc measures the tab-bar lens toggle/select effect frame-by-frame and decomposes its optics, as binding criteria for the eyeglass-tabs wave. RESEARCH ONLY — no `src/` touched.

## Confidence legend
- **[H] high** — direct pixel measurement, cross-checked visually (e.g. proudness, rim profile, accent tint, frosted-blur, bar geometry).
- **[M] moderate** — automated tracking with a stated bias + visual corroboration (center-x trajectory, spring fit, plate stretch).
- **[L] low / qualitative** — visually evident, hard to pin numerically (interior magnification factor).

---

## §0 — Extraction, coordinate system, and the tab-event timeline

**The 4 supplied `bar60/` windows (t1..t4) are RESTING-pill windows, not travels.** A selection tracker (cyan-excess sampled at the 4 fixed tab-glyph centers, per frame) proves each window holds one *different* settled tab while the backdrop transitions: **t1 = Devices, t2 = People, t3 = Items, t4 = Me** rest. The RMSE "motion spikes" the seed noted are the Find-My backdrop (avatar photo + "Andi Aguirre Salazar" text) scrolling in, not the pill. **The pill TRAVELS happen in the GAPS between windows.**

To capture the travels at 60fps full-res I extracted a contiguous bar-band strip from the source (permitted by the directive) into `ext/e-%04d.png` (336 frames, same crop as `bar60/`):
```
ffmpeg -ss 7.0 -i <src.MP4> -t 5.6 -vf "crop=1206:260:0:2340,fps=60" -start_number 0 ext/e-%04d.png
```
Crop verified byte-exact: `ext/e-0152` ≡ `bar60/t2-15.png` (0.00 diff). **Time map: `t = 7.0s + N/60`** (e-NNNN).

**Bar geometry [H]** (measured on calm rest frames): the bar capsule spans x≈**60..1146** (~1086px inner width) in the 1206px frame (~60px side margins); top edge y≈**40**, bottom edge y≈**227** → bar height ≈**187px**. Four equal slots ≈**271px** each; tab centers x≈**210 / 468 / 762 / 1006** (People/Devices/Items/Me). In full-screen coords the bar sits y≈2380..2567 of 2622 (a floating capsule ~55px off the bottom).

**The toggle timeline (selection-swap frames, [H] from the 4-tab tint tracker):**

| # | event | swap frame | t (s) | direction / distance |
|---|-------|-----------|-------|----------------------|
| T1 | →Devices (arrival tail; earlier legs confounded by app-open) | e-0042 | 7.700 | into Devices, small overshoot |
| T2 | Devices→People | e-0121 | 9.017 | ← 1 slot, 258px |
| T3 | People→Items | e-0198→e-0203 | 10.30→10.38 | → **2 slots, 552px** |
| T4 | Items→Me | e-0272 | 11.533 | → 1 slot, 244px |

During **T3 the tracker registers the tint crossing the intermediate Devices slot** (De reads selected e-0198..0202 before It takes over e-0203) — the lens physically transits the middle tab. **This is the single cleanest proof the lens SLIDES CONTINUOUSLY through intermediate positions; it does not fade-out-then-fade-in.**

---

## §1 — KINEMATIC TABLE (per 60fps frame)

**Measurement method.** Center-x is the **4-tab cyan-excess weighted centroid** (sample cyan-excess `(G+B)/2−R` in each of the 4 fixed glyph boxes; weight by excess-over-floor; centroid over the known tab x's). This is robust to the busy backdrop (it samples only at tab centers, not the noisy between-tab text) and exact-ish at endpoints, but is **compressed** (it cannot read past the outer tabs, so absolute overshoot at the extreme tabs is under-reported). Reported center-x is **linearly remapped so the measured rest endpoints land on the true tab centers** (remap factors stated per travel). Plate-width is a local `brightness×smoothness` FWHM search near the centroid (the pill lightens+blurs the backdrop → bright and low-texture, unlike the sharp backdrop text). Confidence **[M]**; center-x ±~20px mid-travel, ±10px at endpoints; width ±~40px (soft translucent edges + motion blur inflate it).

### T3 — People→Items (2 slots, 552px) — the reference travel
Remap: centroid rest 380→752 mapped to true 210→762. `t_rel` from e-0188.

| e- | t_rel (ms) | center-x | plateW | note |
|----|-----------|----------|--------|------|
| 0188 | 0 | 210 | ~290 | rest on People |
| 0196 | 133 | 228 | 285 | pre-move, plate begins to lean right |
| 0197 | 150 | 245 | 304 | **departs** |
| 0198 | 167 | 317 | 316 | over People→Devices, elongating |
| 0199 | 183 | 455 | 305 | fast leg (crossing Devices) |
| 0200 | 200 | 536 | 309 | |
| 0202 | 233 | 592 | 308 | past Devices center |
| 0205 | 283 | 650 | **348** | approaching Items, **width peak (arrival squish)** |
| 0208 | 333 | 692 | 320 | decelerating |
| 0211 | 383 | 735 | 312 | |
| 0212 | 400 | 758 | 309 | **arrived** |
| 0214 | 433 | 762 | 299 | settling |
| 0216 | 467 | 762 | 291 | **settled** (plate contracted to rest) |

Shape: near-still → steep rise 150–283ms → decelerating arrival 283–433ms. Monotonic (2-slot overshoot is hidden by the centroid saturating at Items).

### T2 — Devices→People (1 slot, 258px, leftward) — the OVERSHOOT witness
Remap: centroid rest 479→343 mapped to 468→210. `t_rel` from e-0110.

| e- | t_rel (ms) | center-x | plateW | note |
|----|-----------|----------|--------|------|
| 0112 | 33 | 453 | ~290 | **departs** |
| 0116 | 100 | 304 | **420** | fast leg (width inflated by motion-blur smear) |
| 0122 | 200 | 211 | 321 | reaches People target |
| **0125** | **250** | **190** | 291 | **OVERSHOOTS ~20px past 210** |
| 0128 | 300 | 207 | 272 | recovering |
| 0130 | 333 | 212 | 262 | **settled** (slight overshoot damped out) |

**Overshoot ≈ 20px = ~8% of the 258px travel, recovered over ~5 frames (~83ms).** Direct evidence ζ<1.

### T4 — Items→Me (1 slot, 244px, rightward)
Remap: centroid rest 674→865 mapped to 762→1006. `t_rel` from e-0262.

| e- | t_rel (ms) | center-x | plateW | note |
|----|-----------|----------|--------|------|
| 0266 | 67 | 789 | ~290 | **departs** |
| 0268 | 100 | 847 | 381 | fast leg (motion-blur smear) |
| 0272 | 167 | 960 | 292 | near target |
| **0277** | **250** | **1022** | 311 | tiny overshoot (~2–4px) |
| 0280 | 300 | 1020 | 308 | settled |

Near-critical here (overshoot ~1–2%). T1's arrival into Devices (e-0042→e-0052) likewise showed a small overshoot (center dipped ~13px below the Devices settle then recovered over ~2 frames).

### Derived kinematics
- **Travel duration (departure→settle):** 1-slot ≈ **200–300ms**; 2-slot ≈ **250–290ms**. Duration is only *weakly* amplitude-dependent (2 slots ≈ 1 slot in settle) — the signature of a **spring**, not a distance-proportional constant-velocity glide. Perceptual arrival (≥90% of travel) is faster: **~120–180ms**.
- **Easing = SPRING.** Damped-spring fit to the remapped T3 curve: **response ≈ 0.32s**, delay ~0 (the flat pre-move is just where the window starts), RMSE 21px. ζ from the fit pins ≈1.0 but that is a **saturation artifact** (the centroid can't overshoot the extreme tab); the direct overshoot witnesses give the real damping: **T2 ~8% overshoot → ζ≈0.63; T4 ~1–2% → ζ≈0.85; T1 mild.** Net: **response ≈ 0.32–0.40s, ζ ≈ 0.65–0.85** — squarely the house `--spring-snappy` (response 0.35, ζ 0.65–0.7) / `DOCK_SPRING` register. Not a fixed cubic-bezier (a bezier gives no overshoot and no amplitude-independent settle).
- **Continuous slide, not depart/arrive** [H]: the lens transits the intermediate Devices slot in T3 (tint + visible plate at every intermediate x); there is no fade of a source lens + grow of a destination lens.
- **Arrival squish present** [M]: the plate stretches along the travel axis mid-flight (measured core width grows ~1.1–1.25×, e.g. rest ~290 → peak ~348 near arrival in T3; the fast-leg readings 420/381 are core-width + ~37px of 60fps motion-blur smear at peak speed ~2.2px/ms) and **contracts back to rest width at settle** — the reciprocal-squish that *releases at arrival*. Real geometric stretch is modest (~1.15–1.25×); the eye reads it larger because motion blur + the soft translucent leading edge extend the smear.

---

## §2 — OPTICS DECOMPOSITION

Two registers, backdrop-dependent (this is the whole trick): over a **calm/dim** backdrop the lens is a soft specular-top + shadow-base capsule with a thin DARK refractive rim; over a **busy/bright** backdrop it blooms into a luminous chromatic-dispersing loupe that visibly bends the content. Same element, backdrop-driven intensity.

### 2a. Magnification / refraction [L→M]
- **Edge-concentrated displacement, thin interior** (droplet/loupe optics, NOT a spherical magnifier). In the busy money frame (e-0226 / t3-11) the backdrop "…Salazar" text and "Now" run **bend and displace around the pill's crown** and compress into the rim band, while the pill *interior* renders backdrop content at roughly unity scale (the Items glyph/label are normal-sized). Interior magnification is near-unity **~1.0–1.1×**; the optical work lives at the **rim**. This matches a squircle-bevel edge-displacement profile (W-LENSING's `f(x)=⁴√(1−(1−x)⁴)`, Snell n≈1.5) — a strong recommendation to reuse `.glass-lens`/`#glass-refract` rather than a radial magnifier.
- **Chromatic dispersion at the rim** [H, visual]: the top-left rim shows RGB fringing (a red/green/blue split) — glass-edge chromatic aberration. Currently a *booked* successor of W-LENSING (the displacement map carries no color); the reference makes it a real, visible signature.
- **The proud crown lenses SHARP content; the body lenses FROSTED content.** The pill's crown overflows *above* the bar (see 2c) into the region where the backdrop is un-frosted, so the crown bends crisp text; the pill body sits over the already-frosted bar, so it lenses a smooth field. This is why the dramatic bending reads at the top edge.

### 2b. Rim thickness + luminance profile [H]
Horizontal 1px-band scan across the Items pill LEFT rim (y≈150):
- **Busy backdrop (e-0226):** L dips to ~120 at x≈584–590 (the **dark refractive outline**, ~6–12px wide) then the interior plateaus bright (L~139, **B channel 200–206** = luminous cyan-blue glass). A thin bright cyan rim rides just inside the dark outline.
- **Calm backdrop (e-0230):** the rim is a thin dark notch (L~99 at x≈590) between the bar (L~126) and a quieter cyan-blue interior (L~108–112, B~165). No bloom.
- **Vertical rim structure:** bright **specular arc just inside the top crown** + a **soft darker base shadow** at the bottom — the calm register's "resting on the glass" read. Over busy backdrops the whole rim gains the luminous cyan bloom (hue-stealing backdrop + accent).

### 2c. Proud overflow (px + ratio) [H]
Measured with the bar top (y40) / bottom (y227) reference lines drawn on the frame (see `scratchpad/pillzoom-0230`):
- Pill crown ≈ **y26**, pill base ≈ **y238** → **pill height ≈ 213px**.
- Bar height ≈ **187px**. **Pill / bar height ≈ 1.14×.**
- **Overflow ≈ +14px above the bar top and +12px below the bar bottom.** The pill is a distinct loupe resting ON the track, taller than its slot on both edges — not an inset highlight. Rest pill width ≈ **290–300px** (~1.08–1.10 of the 271px slot).

### 2d. Accent tint of glyph + label [H]
Bright-pixel mean RGB on the settled Items frame:
- **Selected glyph `[84, 251, 254]`** (≈`#54FBFE`, saturated CYAN); **selected label `[93, 227, 250]`** (cyan).
- **Unselected glyph `[254,254,254]`** (pure white); unselected label `[186,209,226]` (near-white, faintly cool).
- The swap is a clean **white→app-accent-cyan** binary, and it **arrives with the lens** (the destination tint saturates as the plate settles, T3: Items tint full by e-0205≈arrival). This is the dock "selected-reads-as-glass + accent ink" register (W-REGISTER-IOS + `--glass-accent`).

### 2e. Calm vs busy attenuation [H]
The optics **track backdrop luminance/business dynamically**: identical geometry, but the rim goes from a barely-there dark hairline + soft specular (calm/dim) to a luminous cyan chromatic-dispersing bloom that bends content (busy/bright). This is exactly the `useGlassBackdropLuminance` + adaptive-tint story — the effect must *sample the live backdrop*, not paint a fixed rim.

### 2f. Bar capsule own material [H]
- **Frosted glass, strong blur:** backdrop texture std drops **59.1 (un-obscured) → 3.3 through the bar** (~94% contrast kill). The bar heavily frosts; the pill then LENSES that frosted field (refraction/magnification on top of blur, not more blur).
- **Teal→blue tinted gradient:** interior mean RGB `[50,126,155]` (left, greener teal) → `[89,132,181]` (right, bluer/lighter) — the app-themed translucent capsule + backdrop show-through.
- **Rounded-capsule ends** (x≈60 and x≈1146), thin bright top rim + soft base shadow, floating ~55px off the screen bottom.

---

## §3 — The 8 PERCEPTUAL SIGNATURES (ranked by visual load-bearing-ness)

An implementation must nail these in order; the top 3 make-or-break the "it's an eye-glass" read.

1. **Real edge-refraction, not a tinted plate.** The selected pill BENDS + displaces the backdrop at its rim (edge-concentrated, thin interior — droplet/squircle profile). Without this it's just a colored pill. → compose `.glass-lens`/`#glass-refract` + `--glass-refract` depth. [H]
2. **Proud loupe geometry.** The pill is ~1.14× the bar height and overflows ~13px above AND below the track — a lens resting ON the bar, not an inset fill. → the indicator must render taller than its slot with the bar clipping *disabled* over it. [H]
3. **Continuous liquid slide with a spring + arrival squish.** Center-x springs (response ~0.32–0.40s, ζ~0.65–0.85) through every intermediate position; the plate stretches ~1.15–1.25× along-axis mid-flight and releases at arrival. → `useTabIndicator` center-anchor + `useLiquidFlex` reciprocal squish on `--spring-snappy`, release-at-arrival. [M]
4. **Luminous chromatic rim that hue-steals from backdrop + accent.** A bright cyan rim (+ RGB dispersion) over busy backdrops; a thin dark refractive outline + soft specular-top/shadow-base over calm ones. → `--glass-accent` rim + the booked chromatic-aberration rim. [H]
5. **Backdrop-adaptive intensity (calm↔busy).** The rim/refraction attenuate to a whisper over dim/calm backdrops and bloom over bright/busy ones — same geometry, sampled optics. → `useGlassBackdropLuminance` driving rim/tint strength. [H]
6. **Accent-ink transfer that arrives with the lens.** Selected glyph+label swap white→saturated app-cyan `≈#54FBFE`, timed to the plate's arrival; unselected stay white. → selected-as-glass + `--glass-accent` ink, coupled to the settle. [H]
7. **The bar is a heavily-frosted tinted capsule (the stage).** ~94% backdrop-contrast kill, teal→blue gradient, floating rounded capsule — the calm frosted field the loupe lenses. Get this wrong and the lens has nothing legible to bend. [H]
8. **Soft specular-top + shadow-base at rest.** Even with no motion and a calm backdrop, the resting pill reads as glass via a bright inner top-crown specular and a soft base shadow. → the resting-state lighting, not only the motion. [H]

---

## §4 — Caveats / reproducibility
- The supplied `bar60/` windows do not contain the travels; the kinematics rest on the `ext/` strip I extracted (command in §0, byte-verified against `bar60`). All measurement scripts + annotated validation frames (`validate*.png`, `pillzoom-*.png`) are in the session scratchpad; the extracted strip is at `ext/`.
- Center-x is a compressed cyan-centroid remapped to true endpoints → travel *shape/timing* is solid [M], absolute mid-travel x is ±~20px, and overshoot at the extreme tabs is under-read (real ζ inferred from the interior 1-slot travels T2/T4).
- Plate-width is inflated by 60fps motion-blur on the fast legs (~37px at peak speed); reported stretch (~1.15–1.25×) is the settled-vs-mid *core* width, the honest geometric figure.
- Interior magnification factor is qualitative [L] — the reliable finding is that magnification is *edge-concentrated* (unity interior), which is the load-bearing fact for choosing an edge-lens primitive over a radial magnifier.
- Safari-July-2026 bound: the whole effect must degrade honestly off `backdrop-filter: url()` (the refraction lens) to the calm dark-rim + specular register — which the reference itself uses over calm backdrops, so the honest fallback IS a real reference state, not a fake.
