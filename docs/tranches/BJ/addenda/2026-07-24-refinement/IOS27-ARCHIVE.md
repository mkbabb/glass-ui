
# iOS 27 ARCHIVE — re-analysis for glass-ui

**modelId: `claude-opus-5[1m]`** (read verbatim from this seat's system context: "The exact model ID is claude-opus-5[1m]").

**Evidence base.** `/Users/mkbabb/Downloads/New Folder With Items 4` — 7 iOS `.MP4` screen recordings (the two `Screen Recording 2026-06-22 at 14.38.42*.mov` are a desktop capture, byte-duplicated, excluded from every iOS claim), 5 iOS stills (`IMG_1874`, `IMG_1881`, `IMG_1882`, `IMG_2287`, `IMG_2288`, `Screenshot 2026-06-20 at 18.52.29`), plus 9 stills that are **our own** artefacts (dock playground, sci-report, mini-player) and 2 texture references. Frames extracted to `…/scratchpad/frames/archive/` at 30fps (all recordings) and 60fps (`ScreenRecording_06-22-2026 23-59-33_1.MP4`).

**Units.** Every iOS capture is 1206×2622 device px = **402×874 pt @3x** (iPhone 16 Pro). 1 pt ≡ 1 CSS px. I report σ (Gaussian standard deviation) because it is the physically measurable quantity and because CSS `blur(R)` sets σ = R exactly. Divide device px by 3 for pt/CSS px.

**Method note I hold myself to.** The prior tranche's RECORDER-HITCH LAW is correct and I honour it: the 60fps CC luminance series shows a 1-frame 4-unit swing at idx 181/182 that is a capture artefact, not iOS. All my timings are taken from monotone multi-frame runs, never single-frame deltas.

---

## 1. Component-by-component map

| iOS 27 element (source) | glass-ui counterpart | Delta |
|---|---|---|
| Reasoning-effort segmented slider — solid white pill on a dark stadium track, unfilled stops as dots (`IMG_2287/2288`) | `src/components/slider/Slider.vue` + `src/styles/glass/liquid-fill.css` + `src/styles/glass/track-well.css` + `src/components/pager-dots/PagerDots.vue` | iOS unifies slider and pager: **selection = occupied length**, unfilled stops render as dots that the pill *absorbs*. We have two separate components and no absorb. Measured: track 349×72pt (capsule, r=36pt), pill 154→208pt tall 50pt, inset 10–11pt (inner r=25pt), dot Ø12pt, pitch 53.7pt. Growth is exactly one pitch. |
| Popup/HUD backplate (`IMG_2287/2288`) | `src/components/dialog/placement.css:155-196` (`glass-graded-halo`) | **Mechanism mismatch — see §2.** Ours is one uniform `blur(20px)` behind a gradient mask; iOS grades the radius. Also: ours is a *dim* plate; iOS's is a *luminous* band (L≈32/255 over black) with no hard edge, feathered ~35–45pt vertically and running full-bleed horizontally. |
| Maps detent sheet over live map (`Screenshot 2026-06-20 at 18.52.29`) | `src/components/drawer/styles.css`, `src/components/surface/Surface.vue`, `src/styles/glass/surfaces.css` | Measured transmission: mean L 114.3→111.6 (**−2%**), sd 55.6→44.4 (**80% kept**), mean \|dI/dx\| 9.87→1.01 (**10% kept**), saturation 0.127→0.206 (**+62%**). iOS glass is *near-zero veil + heavy blur + strong saturate*. Ours is `color-mix(--card, transparent)` at high opacity — a milky veil. **This is the whole of "trite, shiny, bright."** |
| Recessed search field inside the sheet (same still) | `src/components/search/`, `src/components/input/` | iOS renders the field *darker* than its host sheet (concave well), not lighter. Our control surfaces (`src/styles/glass/control-surfaces.css`) inherit `--glass-bg-quiet` and read raised. |
| Circular glass close button, backdrop refracting through (`IMG_1881`) | `src/components/button/`, `src/styles/glass/glass-atom.css` | iOS's disc shows the text behind it *doubled and bent at the rim*, with the light rim concentrated on the upper-left arc. We have `src/styles/glass-refract.css` but atoms don't engage it. |
| Home-screen icon badge, straddling the corner (`ScreenRecording_06-24-2026 22-07-29`) | `src/components/badge/Badge.vue`, `src/components/avatar/Avatar.vue`, `src/components/toast/ToastClose.vue` | **See §3.** Exact geometry measured; nothing in glass-ui places an affordance on a corner arc. |
| Notification banner arrive/rest/exit (`06-24 21-44`, `06-24 22-07`) | `src/components/toast/Toast.vue` + `Toaster.vue` | **See §4.** Ours has no corner-tuck and no channel desync. |
| Control Center open/close over a live app (`06-22 23-59`, `06-20 18-47` tail) | `src/components/dialog/`, `src/components/drawer/`, `src/components/dock/GlassDock.vue` | **See §4.** iOS's close releases saturation → dim → blur at 184/250/317ms. Ours releases everything on one transition. |
| Writing Tools light sheet with colour suffusion (`IMG_1874`) | `src/components/paper-backdrop/`, `src/styles/paper.css`, `src/components/aurora/Aurora.vue` | The purple bubbles behind bloom *into* the white sheet as soft blobs while the black body text stays razor sharp on top. This is a light-mode peer to our aurora; our paper backdrop does not sample what is behind it. |
| Split tab bar + detached accessory circle (Find My, `07-10 16-26`) | `src/components/tabs/SegmentedTabs.vue`, `src/components/dock/` | iOS separates the *bar* from a peer *circular* control at the same altitude. Our dock composes them into one body. |
| Spotlight "Search or Ask" capsule with a bright bottom caustic arc (`06-24 22-07`) | `src/components/command/Command.vue`, `src/styles/glass/rim.css` | The rim arc is brightest *mid-pull* and cools at rest; our rim is static. |
| Live Activity two-lobe goo with a meniscus waist (`06-24 21-44`, still `15.26.54`) | `src/components/blob/Blob.vue`, `src/components/dock/DockCrossfade.vue` | Retained from prior work; nothing new to correct. |
| Promo card with in-card dismiss × (Music, `06-20 18-47`) | `src/components/card/Card.vue`, `src/components/alert/` | iOS puts this × **inside**, top-right, plain — deliberately *not* the corner-straddling form. The two forms are distinct grammar (see §3). |

---

## 2. The gradient blur behind the element (F49/F50) — mechanism, settled

**Verdict: the blur RADIUS is graded with distance. It is not a uniform blur behind a gradient mask. I can prove this from the pixels, and the proof is not a judgement call.**

### The specimen

In `IMG_2287`/`IMG_2288` (byte-identical in this region; the pill state differs lower down) the vertical stack is:

| y (device px) | content | state |
|---|---|---|
| 350–988 | message text + reaction icons | **sharp** (\|dI/dx\|max 56–99) |
| 994–1102 | empty | luminance **exactly 0.00** |
| ~1160–1295 | a status chip (icon + 3 text groups) | **blurred**, no sharp residue anywhere |
| 1290–1660 | the HUD (label, track, pill) | sharp, sitting in a luminous band |

### The measurement

I fit σ from the second moment of |dI/dx| across the chip's left and right edges, row by row:

| y | σ left (dev px) | σ right (dev px) | edge step height |
|---|---|---|---|
| 1180 | 20.8 | 18.1 | 35 / 27 |
| 1190 | 22.0 | 17.8 | 41 / 31 |
| 1220 | 23.6 | 20.7 | 85 / 42 |
| 1245 | 25.4 | 21.9 | 61 / 34 |
| 1260 | 26.8 | 23.7 | 39 / 26 |

σ rises monotonically **downward, toward the HUD**, by ~33% over 70 device px (23pt), independently on two opposite edges. Slope dσ/dy ≈ **0.084 px/px** on both.

### Why this is not a masked uniform blur (the discriminator)

Under the cross-fade model `I = (1−α)·S + α·(S ⊛ G_σ0)`, two things must hold simultaneously:

1. A fraction (1−α) of the **sharp step survives as a 1–2px spike**. The chip's edge step is 85 luminance units at y=1220 and 41 at y=1190. Measured `max|dI/dx|` in those rows is **3** and **2**. So (1−α) ≤ 3/85 = 0.035 at y=1220 and ≤ 2/41 = 0.049 at y=1190 — i.e. **α ≥ 0.95 everywhere in the chip.**
2. The second-moment estimator returns σ_est = σ0·√α. With α ≥ 0.95 confined to [0.95, 1.0], σ_est can vary by at most **2.5%**.

Measured variation is **33%**. The two constraints are irreconcilable. The cross-fade model is refuted at roughly an order of magnitude. **The radius itself grades.**

(The honest caveat: the chip is a capsule, so a corner-curvature artefact inflates σ_est at both ends. That artefact is symmetric and would put the minimum at the chip's vertical centre, y≈1220. The observed minimum is at y≈1185–1195, *above* centre, with monotone rise all the way down. The trend survives the artefact. The cross-fade refutation above does not depend on the trend at all.)

### Where it is strongest, and how far it reaches

Linear extrapolation of σ(y) = 0.084·(y − y₀) from the two independent edge fits puts **σ = 0 at y ≈ 978–985 device px**. The last sharp content on screen ends at **y = 988**. Those were derived from completely different data and they agree to 10 device px (3pt). That is an independent corroboration that the ramp is linear and that it begins right where sharpness ends.

- Ramp start → element top edge (y=1425): **445 device px = 148pt**.
- σ at the chip (y=1220): **6.9pt**, i.e. CSS `blur(6.9px)`. Genuinely subtle — the owner's word is accurate.
- σ extrapolated at the element's own edge: **≈12.3pt**, CSS `blur(12px)`.

**Strongest immediately at the element; falls linearly to zero ~148pt away.**

### Does the dim co-grade?

**No — there is no dim at all, and no scrim.** At y = 994–1102, between the sharp content and the chip, luminance is **exactly 0.00** across the full width. An additive veil would lift it; a multiplicative dim on black is unobservable but would also have to darken the sharp text above, and that text sits at a clean 255. The sharp region is undimmed and the gap is unlifted.

What *does* co-vary is a separate, additive **luminous backplate**, and it is not the blur mask:

- plateau **L ≈ 32–33/255** (12.5% white), reached ~105 device px above the track and held
- feather **~105 device px (35pt) above**, **~135 device px (45pt) below**
- **full-bleed horizontally** — still L=13 at x=0 and x=1200; it is a band, never an ellipse
- a local lift to L≈42 above and left of the white pill: the pill's own bloom, not the plate

So F50 is **two independent fields**, and conflating them is the trap: a *linear σ ramp* keyed to distance from the element, plus a *soft additive light band* behind it. The blur has no luminance component; the band has no blur component.

### What this means for the code

`src/components/dialog/placement.css:161` currently does:

```css
backdrop-filter: blur(var(--glass-halo-blur)) saturate(var(--glass-saturate-overlay));
```

— one uniform 20px blur, masked by an intersect of two double-ramp linear gradients. That is precisely the mechanism the pixels refute. Implementable fix, in our idiom and with no fallback path: **N stacked full-bleed `backdrop-filter` layers**, each masked to its own band, radii in a geometric ladder so their *composition* approximates the linear σ ramp. Composing k blurs of σᵢ gives σ_total = √(Σσᵢ²), so a 4-band ladder of 3/5/8/12px composes to 3 / 5.8 / 9.9 / 15.6px across the bands — close enough to linear over 148pt that no edge is visible. Bands must overlap by at least one band-width or the seams read. `--glass-halo-blur`, `--glass-halo-core` and `--glass-halo-bloom` become `--glass-halo-reach` (148pt), `--glass-halo-sigma-max` (12px) and a band count; the old three retire outright.

---

## 3. The notification affordance on the corner

I searched every still and every extracted frame. **The corpus contains no notification card bearing an × at its top-left.** I will not invent one. What the corpus *does* contain is the exact affordance the owner is describing, in its canonical iOS form, and I measured it precisely.

### The specimen: the app-icon badge (`ScreenRecording_06-24-2026 22-07-29_1.MP4`, frame at t=0.2s)

Measured on the Phone icon, dark mode, over the wallpaper:

| quantity | device px | pt |
|---|---|---|
| icon box | x 121–301, y 2320–2500 | 60 × 60 |
| icon corner radius (superellipse) | ≈40 | ≈13.5 |
| badge disc bbox | x 258–335, y 2288–2363 | Ø **25.3** |
| badge centre | (296.5, 2325.5) | — |
| icon top-right corner point | (301, 2320) | — |
| **centre offset from the corner point** | (−4.5, +5.5) | **(−1.5, +1.8) inward** |
| overhang past the right edge | 34 | **11.3** = 45% of the disc |
| overhang above the top edge | 32 | **10.7** = 43% of the disc |

**The rule, size-independent:** the affordance's **diameter is 0.42 × the element's edge length** (25.3pt on a 60pt icon), and its **centre sits on the element's corner point**, nudged inward by ~6–7% of its own diameter. With the centre on the corner point, exactly ¾ of the disc's area lies outside the element's box; because the corner is rounded away beneath it, in practice **~70% of the affordance floats free and it visually rests on the corner arc**. That is the owner's "outside of the element partially, sitting on the corner border", stated exactly.

For a top-left ✕ the geometry mirrors in x. Expressed for CSS on an element of corner radius `r` and affordance diameter `d`:

```
top:  calc(-1 * (d/2) + 0.065 * d)
left: calc(-1 * (d/2) + 0.065 * d)
```

which for a 25pt ✕ is `top: -11pt; left: -11pt` — and the parent must not clip (`overflow: visible`).

### How it composites

Flat and hard. Sampling across the badge boundary over the wallpaper (L≈74) into the badge (L≈91): the transition is **74 → 91 in 4 device px**, which is antialiasing and nothing else.

- **No shadow** onto the element beneath it.
- **No stroke, no ring, no halo, no glass.** Fill is a flat opaque `rgb(254, 47, 51)`.
- Separation is achieved **entirely by value contrast** — badge L=91 against icon fill L=27 against wallpaper L=68–103.

This is deliberate and worth copying: the corner affordance is the one element in the whole iOS 27 language that is *not* glass. It reads as a physical tag stuck onto the surface. Making it glass would destroy it.

### The contrasting form, also in the corpus

The Music "Turn Ideas Into Playlists" promo card (`06-20 18-47`, t≈12s) carries a dismiss × that is **inside the card, top-right, plain grey, no disc**. iOS keeps two distinct grammars and never mixes them:

- **corner-straddling, opaque, high-chroma** = *system-owned status or destructive removal* (badge, jiggle-mode remove).
- **inset, low-contrast, chromeless** = *content-owned dismissal* (promo card).

Our `ToastClose` should take the first; our `Card`/`Alert` dismissal should take the second.

---

## 4. The vaporize/dissolve dismissal

There are **two distinct dismissals** in the archive and they are not the same effect. The prior tranche folded them together. Only the second is the vaporize.

### 4a. The banner corner-tuck — scale + fade, and it is NOT a vaporize

`ScreenRecording_06-24-2026 21-44-31_1.MP4`, banner "Mike's Home / Garage Door just closed", isolated by differencing against a banner-free reference frame. 30fps, 33.3ms/frame.

| phase | duration | geometry | peak alpha |
|---|---|---|---|
| **1. slide + clip** | ~200ms | banner translates up, clipped at the screen edge | full |
| **2. corner-tuck** | ~233ms | a *miniature of the full layout* scales 391 → 174 device px wide (130 → 58pt), pinned top-left | **constant at 229/255** |
| 3. hold | ~100ms | frozen | constant |
| **4. fade** | ~300ms | geometry **frozen** at 117 × 18 device px (39 × 6pt) | 126 → 96 → 71 → 54 → 40 → 31 → 25 → 19 → 17 → 0 |

Two hard findings the frames force:

1. **The shrink and the fade are sequential, not concurrent.** Peak alpha holds dead flat at 229 through the entire 233ms shrink, then drops with the geometry stationary. Any implementation that runs `scale` and `opacity` on one timeline is wrong.
2. **There is no blur.** Through the fade, `max|dI/dx|` inside the banner tracks peak alpha to within 1%: peak 126→dxmax 118, 96→91.7, 71→71, 54→54, 40→40. A blur destroys gradients faster than it destroys peaks; this does not. The residual is a hard-edged shape at low alpha. **Pure alpha fade.**

Total exit ≈ 833ms. Useful, but it is scale+fade — not what the owner is asking to redeploy.

### 4b. The Control Center dismissal — this is the vaporize

`ScreenRecording_06-22-2026 23-59-33_1.MP4` at **60fps**, measured on a **background-only strip (y 500–645) that the CC panel never occupies**, so the CC's own vanishing edges cannot contaminate the numbers. Close begins at t=2917ms.

| channel | metric | rest (open) | final (closed) | **95% time** |
|---|---|---|---|---|
| **saturation** | mean S | 0.3485 | 0.4503 | **184ms** |
| **dim** | mean L | 34.06 | 71.26 | **250ms** |
| **blur** | mean \|dI/dx\| | 0.318 | 3.672 | **317ms** |

All three are monotone, ease-out, **no overshoot on any channel** (saturation lands at 0.4503 against a pre-open rest of 0.4503 — dead on, not past). Converting the sharpness proxy to σ (σ ∝ 1/|dI/dx|) gives a clean exponential decay, fast early and slow late.

**The mechanism, stated exactly: the blur release trails the dim by ~67ms and trails the saturation restore by ~133ms.** For roughly 130ms in the middle of the dismissal, the backdrop is fully saturated *and still heavily blurred* — you see colour with no form. Saturated content behind the glass appears to bloom and smear outward as the glass thins. That is the "vaporize", and it is corroborated visually in `06-20 18-47` at frame 1105: the CC tiles are entirely gone while the album grid behind is still fully blurred, dimmed and desaturated.

So: **not mask erosion, not per-particle scatter, not displacement.** It is a **desynchronised three-channel release of the backdrop filter itself**, with the element's own ink dropped first. That is far cheaper than particles and it is the effect.

Implementable directly:

```css
/* the dismissing surface's own ink */
.vaporize > * { transition: opacity 120ms linear; opacity: 0; }

/* the backdrop plate — three channels, three clocks, one direction */
.vaporize {
  transition:
    --vap-saturate 184ms cubic-bezier(0.22, 1, 0.36, 1),
    --vap-dim      250ms cubic-bezier(0.22, 1, 0.36, 1),
    --vap-blur     317ms cubic-bezier(0.22, 1, 0.36, 1);
  backdrop-filter: blur(var(--vap-blur)) saturate(var(--vap-saturate));
  background: color-mix(in oklab, var(--glass-bg-overlay) var(--vap-dim), transparent);
}
```

`--vap-*` must be `@property`-registered (we already do this in `src/styles/tokens/property-regs.css`) or the interpolation will not run. Ratios to preserve, not the absolutes: **sat : dim : blur = 1 : 1.36 : 1.72**, saturation always first, blur always last.

**Entry is not the mirror.** On open, blur and dim lead hard: sharpness falls 57% of its swing in the first 33ms and 75% in 66ms. Entry blur is near-instant; exit blur is the slowest channel. Never run one reversible transition.

---

## 5. Where the prior tranche was wrong or thin

**(a) `docs/tranches/BJ/formation/ios27/IOS27-CODEX.md`, Law 1 — "A spatially graded blur inside one iOS surface is NOT attested … the `--glass-halo-*` in-surface gradient is a declared BEST-iOS divergence, never a copy claim."**
Wrong, and it matters most of anything here. A graded blur radius **is** attested, inside a single surface, in the very still the law cites. §2 above measures σ rising 17.8→23.7 device px across one 25pt-tall element and refutes the cross-fade alternative by an order of magnitude. The declaration of divergence should be withdrawn: we are not diverging, we were under-reading. The consequence is concrete — our shipped halo (`src/components/dialog/placement.css:161`) implements the refuted mechanism.

**(b) Same law, CORPUS-REDO amendment — "the ramp DISTANCE is ratified at 60–85pt".**
Short by roughly 2×. Two independent edge fits put σ=0 at y≈978–985 and the element's top edge at y=1425: **148pt**. The 60–85pt figure is the distance from *last sharp content* to *first fully-blurred content*, which is a lower bound set by where content happens to sit, not by the ramp.

**(c) Same law — "the '~20pt' radius ceiling is unprovable from the corpus (last measurable edge blur ≈9pt)".**
Half right. 9pt was the right order but the wrong reading. The measurable value at the chip is **6.9pt**; the ceiling is not unprovable because the ramp is linear and fits with a coincidence-level residual, giving **12.3pt at the element edge**. Both the original "~20pt" and the retraction to "unprovable" overshoot in opposite directions.

**(d) Same law — "blur+darken co-applied … blur never appears without a luminance layer."**
Not in this specimen. Between the sharp text and the chip, luminance is **exactly 0.00** across the full width — no scrim of any kind, while the blur is already fully engaged at the chip. The luminous band is a separate additive field with different extents (35pt feather up, 45pt down, full-bleed) than the blur ramp (148pt, one direction). They are two fields, not one co-applied pair.

**(e) Law 8 — "the blur release LAGS a beat while the saturated icons flare through the thinning glass (the icon-color bloom)."**
Right instinct, wrong mechanism, and "a beat" is not a number. There is **no saturation flare**: the approach is monotone to exactly the rest value, with zero overshoot (0.4503 → 0.4503). The apparent bloom is a *rate* effect — saturation is restored 1.72× faster than blur, so mid-dismissal you get full chroma at high blur. §4b gives the three numbers. An implementation that pulses saturation past baseline will look wrong.

**(f) Law 18 — banner "exit is a slide-up clipped at the screen edge THEN a corner-tuck … fading ~350ms."**
The 350ms fade is right (measured 300ms) but the composition is wrong: the tuck runs at **constant opacity** for 233ms *before* the fade begins, and the fade runs with the geometry **frozen**. The law reads as concurrent. Also unstated and load-bearing: **there is no blur in the exit** — proven by `max|dI/dx|` tracking peak alpha to within 1% through the whole fade.

**(g) Law 12 — the segmented control, "~153pt→~207pt".**
Ratified. Measured 154.3pt → 207.7pt, growth 53.3pt against a dot pitch of 53.7pt. Adding the numbers the law lacks: track 349 × 72pt (capsule r=36pt), pill height 50pt, inset 10–11pt, inner r=25pt, dot Ø12pt. The nesting satisfies the law-4 rule (inner = outer − padding) exactly, which is a nice independent confirmation of law 4.

**(h) Thin across the whole prior corpus: the corner-straddling affordance.**
No law covers it. It is a distinct, measurable, size-independent geometry (§3) and it is the one system element that is deliberately *not* glass. `MARKS-E-NOTIFICATION.md` treats notification anatomy but does not reach it.

**(i) Thin: glass transmission is never quantified.**
Law 2 describes tint sampling qualitatively across many surfaces but no document in `docs/tranches/IOS27-MICRO/` gives the transmission numbers. The Maps sheet gives them: **mean L −2%, sd 80% kept, high-frequency 10% kept, saturation +62%**. That quadruple is the operational definition of "blurred and frosted" versus "shiny and bright", and it is the number the owner's complaint needs. Notably it also shows the **blur radius is not our problem** — our `--glass-blur-quiet-radius: 7px` sits right in the measured iOS band. Our problem is the veil and the missing saturate.

---

## 6. Which components receive which effect

### F50 — graded-radius halo (§2)
- `src/components/dialog/placement.css` — replace the masked-uniform-blur halo at lines 155–196 with the stacked-band ladder. Retire `--glass-halo-blur` / `--glass-halo-core` / `--glass-halo-bloom` outright (no aliases).
- `src/styles/tokens/glass.css:237-239` — the token trio above becomes `--glass-halo-reach: 148pt`, `--glass-halo-sigma-max: 12px`, `--glass-halo-bands: 4`.
- `src/components/popover/Popover.vue`, `src/components/dropdown-menu/DropdownMenuContent.vue`, `src/components/select/Select.vue`, `src/components/command/Command.vue` — every fired overlay carries it, not just Dialog.
- `src/components/drawer/styles.css` — the sheet's top edge is the natural home for the one-directional ramp.
- `src/components/fading-scroll/FadingScroll.vue` — same primitive, applied to a scroll edge instead of a floated element. Currently masks opacity; should mask σ.
- `src/styles/scroll-chrome.css` — the "THE BLUR STAYS CRISP" fence at lines 22–26 is correct for the *chrome itself* and must survive; the ramp belongs to the backdrop behind it, not to the bar.

### The frost retune — veil down, saturate up (§1, §5i)
- `src/styles/tokens/glass.css:314-316` — `--glass-bg-quiet` / `--glass-bg-floating` opacities are the "trite, shiny, bright" root. Target: mean-luminance-preserving.
- `src/styles/glass/material.css`, `src/styles/glass/material-roles.css`, `src/styles/glass/surfaces.css` — the saturate arm needs to reach ~1.6 where it currently rides `--glass-saturate-*` defaults.
- `src/components/tabs/SegmentedTabs.vue` + `src/components/tabs/styles/segmented.css` — named by the owner. The pill track is the worst offender.
- `src/components/slider/Slider.vue` + `src/styles/glass/liquid-fill.css` + `src/styles/glass/track-well.css` — named by the owner.
- `src/styles/glass/control-surfaces.css` — the recessed-field correction (fields darker than their host, per the Maps still).

### The vaporize (§4b)
- `src/components/dialog/` overlay teardown, `src/components/drawer/styles.css`, `src/components/popover/Popover.vue`, `src/components/dropdown-menu/DropdownMenuContent.vue`, `src/components/command/Command.vue` — every dismissal of a backdrop-bearing surface.
- `src/styles/tokens/property-regs.css` — register `--vap-blur` / `--vap-dim` / `--vap-saturate` or nothing interpolates.
- `src/styles/transitions.css` — the sat:dim:blur = 1 : 1.36 : 1.72 lead order shipped as a named recipe, so it is not retyped per component.

### The corner-tuck exit (§4a)
- `src/components/toast/Toast.vue` + `src/components/toast/Toaster.vue` — the miniature-scale-then-fade, sequential, no blur. `Toaster.vue` owns the anchor corner.
- `src/components/alert/` — same grammar for dismissible alerts.

### The corner-straddling affordance (§3)
- `src/components/toast/ToastClose.vue` — top-left, Ø 0.42×, centre on the corner point, opaque, no glass, no shadow. Parent must go `overflow: visible`.
- `src/components/badge/Badge.vue` — mirrored to top-right; add the anchored-to-a-corner placement mode it currently lacks.
- `src/components/avatar/Avatar.vue` + `src/components/status-dot/` — the status dot is the same geometry at smaller scale.
- `src/components/card/Card.vue`, `src/components/chip/` — the *contrasting* inset form (grey, chromeless, inside, top-right). Do not give these the corner form.

### Segmented-as-liquid-volume (§1, law 12)
- `src/components/slider/Slider.vue` and `src/components/pager-dots/PagerDots.vue` should share one engine: the fill pill *absorbs* the next dot rather than a thumb translating past it. Spring the width, crossfade the dot. `src/components/progress/Progress.vue`, `src/components/toggle-group/ToggleGroup.vue` and `src/components/tabs/SegmentedTabs.vue` are the other consumers of that engine.
- Radius table from the measurement: track r = height/2, pill r = track r − inset, inset ≈ 0.14 × track height.

### Velocity-keyed rim (Spotlight capsule)
- `src/styles/glass/rim.css`, `src/components/command/Command.vue`, `src/composables/glass/useSpecularTracking.ts` — the caustic arc brightens with edge velocity and cools at rest; currently static.

**Working artefacts** (frames, contact sheets, measurement scripts `an1.py`/`an2.py`/`an3.py`/`sig.py`/`gap.py`/`vap2.py`/`ccscan.py`/`final.py`) are at `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/`. Nothing was written anywhere else.