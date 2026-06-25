# BG audit — S: the iOS Siri reference frames (the new-capability triumvirate)

**Scope.** Exhaustive frame-by-frame read of the two iOS screen recordings
(`scratchpad/evidence/frames-2144/` f001–f036, the 22.8s "Siri over content" recording;
`scratchpad/evidence/frames-2207/` f001–f032, the 12.5s "home + Search-or-Ask pill" recording),
the design-language SYNTHESIS, and the HEAD-verified gap analysis that motivates
**BG.W-SIRI-ISLAND** + **BG.W-SIRI-WAVEFORM** (the Siri triumvirate's first two waves; the third —
the dock-integration seam — is named at the end). This is AUDIT + SPEC only; no `src/` behavior is
edited.

---

## FINDINGS — frame-by-frame log

### Recording 2144 — Siri invoked over content (YouTube), 22.8s, 36 frames

The phone is screen-recording a YouTube watch page (red recording-pill in the status bar / Dynamic
Island region throughout). Siri is invoked twice (a weather query, then "what is 2 plus 2"); the
island descends, morphs, answers, and dismisses.

| Frame | State | What is on screen |
|---|---|---|
| f001–f005 | **REST** | YouTube comments over a paused video. Dynamic Island = the recording stadium-pill at top. No Siri. Baseline for the dim/blur delta. |
| f006 | **INVOKE — DI bloom** | The Dynamic Island has bloomed into a small dark-glass ovoid; a bright **horizontal white lens-flare streak** ignites across its center (the waveform's first spark — a thin specular bar, not yet chromatic). The island is an obsidian droplet with a hot specular core. |
| f007–f008 | **Notification interleave** | A "Mike's Home / Garage Door just closed" banner descends FROM the island (the island is the notification SOURCE — DI↔banner is the same morphing surface); a small white **particle/sparkle cluster** (the Siri-thinking dots) sits in the island. |
| f009 | **listening** | DI compact; sparkle cluster persists. |
| f010–f012 | **RESPOND — results card** | A large rounded-rect **glass results panel** ("Here's what I found.") expands DOWN from the island over the (now dimmed) content. Corner radius ≈ 32–40px. Three nested result rows (each its own inner rounded-rect at a smaller radius ≈ 20px) + a "Search Google" capsule. A **warm RED/maroon under-glow bleeds from the LEFT edge** behind the panel. |
| f013–f014 | **banner over results** | "My Home / Garage Door was closed" banner slides over the results; the island stays a compact pill mid-panel. The results panel and the banner co-exist (z-stacked glass). |
| f015–f017 | **results hold** | The results panel holds, content dimmed behind it. |
| f018 | **results FULL-BLEED (hero)** | The results panel is now near-full-width. Geometry reads cleanly: large outer radius, dark-translucent glass (content visible-but-darkened behind), a **bright specular rim along the BOTTOM edge** — the "Search Google" button area carries a luminous horizontal **lens-flare light-bar** (warm white→amber). The panel sits OVER the content, NOT replacing it (true overlay glass). |
| f019 | **DISMISS — morph up** | The panel collapses UPWARD into a rounded-rect shrinking toward the island; content returns underneath. |
| f020–f026 | **REST** | Back to YouTube comments/replies. DI = recording pill. |
| f027–f029 | **LISTEN/PROCESS — the glass droplet** | The DI has expanded into a large **obsidian-black highly-reflective ovoid** (≈330×130px, corner radius ≈ 65px → near-stadium). Inside it: a brilliant **prismatic lens-flare bar** running horizontally — a chromatic spectrum **cyan→white→amber→orange→pink/magenta** reading as a thin luminous streak with soft bloom. This is the **Siri waveform in its purest reference form**: a warm-biased prismatic light-streak on black glass. |
| f030–f032 | **PENDING** | The island morphs back toward a stadium pill; a small **circular spinner of white dots** (thinking/loading) sits at the leading edge. A new Instagram banner interleaves (island = banner source again). |
| f033–f034 | **ANSWER (hero)** | **"2 plus 2 is 4."** in large white text inside a wide glass **stadium island** (corner radius ≈ half-height; fully-rounded ends) expanded down from the DI. Below the text: the **warm waveform glow** — a horizontal **amber/orange/pink luminous bar** blooming along the bottom inner rim, with strong specular catch-light on the top glass edge. A tiny Siri-swirl glyph sits bottom-right. f033 shows the bar at peak saturation (full cyan→amber→pink prism + bloom). |
| f035 | **DISMISS** | Island contracts back toward the DI. |
| f036 | **(Control Center)** | Recording ended; Control Center glass tiles — a useful **glass-material reference**: frosted rounded-rect tiles, heavy backdrop-blur, low-chroma tint, soft inner rim. |

### Recording 2207 — home screen + "Search or Ask" pill + Dynamic Island, 12.5s, 32 frames

| Frame | State | What is on screen |
|---|---|---|
| f001–f003, f005–f007 | **HOME REST** | Home screen over a green wallpaper. A **"Search" pill** sits centered above the dock — a frosted-glass capsule (magnifier glyph + "Search"), low-chroma translucent, soft rim, light backdrop-blur of the wallpaper behind it. DI = recording pill at top. |
| f002, f004 | **notification** | An Instagram banner descends from the DI; the island morphs to host it. |
| f008 | **INVOKE — DI blob** | The DI expands into a pure-black rounded **ovoid** (subtle specular), beginning the morph; the wallpaper starts to dim. |
| f009–f012 | **"Search or Ask" island (hero)** | The pill has expanded into a wide frosted-glass **stadium capsule** at the TOP reading "Search or Ask" + a microphone glyph at the right. The ENTIRE home screen **blurs heavily and dims** behind it (the island's backdrop-blur + a dark scrim reach the whole wallpaper — a global adaptive dim, not a local plate). Clear specular rim highlight on the capsule. |
| f013–f028 | **SEARCH active** | Keyboard up; the search field is at top, app/result rows below (Rain Rain, Siri, Home, Instagram…), the home content blurred behind. The field is a glass capsule with a caret + mic. |
| f029–f032 | **DISMISS** | Back to home rest; the "Search" pill restored above the dock. |

---

## SYNTHESIS — the design language (what the references actually encode)

**(a) The glass ISLAND geometry.** ONE morphing glass surface with FOUR seated forms on a single
continuous topology:
1. **Dynamic-Island pill** (rest) — a compact stadium, corner radius = half-height (a true capsule).
2. **Droplet/ovoid** (invoke/listen) — the pill swells into a fat reflective ovoid; radius grows but
   stays ≥ half the short axis (never a sharp-cornered rect).
3. **Stadium answer-island** (respond, short text) — a wide capsule with fully-rounded ends; the
   "2 plus 2 is 4." form.
4. **Rounded results-panel** (respond, rich content) — a large rounded-rect (radius ≈ 32–40px outer,
   ≈ 20px inner rows) when the answer is a list/card.

   The geometry NEVER snaps between forms — it MORPHS on one continuous radius+size scalar (the iOS
   "fluid morph": one surface, the corner-radius and the box both interpolate). The island is
   ALWAYS anchored to the DI origin (top-center, descending down). The relationship to the Dynamic
   Island is **identity** — the island IS the grown DI, the banner IS the grown DI, the answer IS
   the grown DI; there is ONE surface, not three components.

**The glass MATERIAL:**
- **Listen/process state = obsidian black glass** — a near-black highly-reflective ovoid (f027–f029)
  with a hard specular catch-light and the prismatic waveform as the only chroma.
- **Answer/results state = dark-translucent glass** — content is visible-but-darkened behind
  (f018); a heavy backdrop-blur + a warm-leaning scrim; a bright **specular RIM** (catch-light along
  one edge — bottom in f018/f034, top in f033). The rim is the silhouette device.
- **Adaptive shadow / under-glow** — a warm cast bleeds from one edge (the maroon/amber left-edge
  glow f010–f012, the amber bottom-rim bloom f033–f034). It is COLORED (warm), soft, and
  asymmetric — a lit shadow, not a neutral drop-shadow.
- **Global dim** (2207 f009–f012) — when the island is the focal surface, the WHOLE backdrop dims +
  blurs (an adaptive backdrop scrim that reaches past the island's own box). The 2144 results
  overlay is the LOCAL variant (content darkens only behind/around the panel).

**(b) The WAVEFORM (the warm luminous glow).** Not the classic Siri orb/blob — the iOS-27 reference
is a **horizontal prismatic lens-flare light-bar**:
- **Color ramp** — a spectrum that READS warm-biased: cyan/white at the hot core, fanning through
  **amber → orange → pink/magenta** toward the ends, with the warm half dominant (f027–f028, f033).
  The "warm luminous glow" = this amber/orange/pink-weighted prism.
- **Shape** — a thin horizontal streak with a hot specular core and a soft **bloom/blur** halo above
  and below; it reads as light bending THROUGH the glass (a caustic/lens-flare), not a discrete
  waveform of bars. In the rich-content state it degrades to a single warm light-bar along the panel
  rim (f018) — the same glow, calmer.
- **Position** — INSIDE the island, horizontally centered, low (under the text / along the bottom
  inner rim). It blooms outward into the warm under-glow/edge-cast.
- **Pulse/voice-response** — the bar BRIGHTENS + SATURATES on voice (f033 peak vs f034 calmer); the
  amplitude is voice-reactive (listening = active prism, idle = dim streak). Frame-to-frame the
  streak's intensity and chromatic spread modulate with the response.

**(c) The MOTION.**
- **Appear/descend** — the DI swells (droplet) then the island grows DOWN; a weighty spring with a
  small settle overshoot (the iOS interruptible morph). f006→f010 and f008→f009(2207).
- **Morph between forms** — pill↔droplet↔stadium↔panel on ONE continuous radius+size scalar
  (f027→f034). No snap.
- **Listening vs responding** — LISTEN = obsidian glass + active prismatic streak + sparkle/spinner
  dots; RESPOND = grow to the answer form, text reveals, the warm bloom settles.
- **Dismiss** — the island contracts UP into the DI (the inverse spring), content un-dims. f019,
  f035, f029(2207).

**(d) The home "Search or Ask" pill.** A frosted-glass capsule above the dock (rest: "Search" +
magnifier). On invoke it EXPANDS UP into the top island ("Search or Ask" + mic) while the whole home
screen dims + blurs. Same morph family as the Siri island — a pill that grows into a focal glass
surface over a globally-dimmed backdrop. The mic glyph is the affordance that the pill is also the
voice entry.

---

## ROOT CAUSES — the gap at HEAD (verified against real source)

There is **no Siri/island/waveform/search-island primitive at HEAD** (`grep -ril
"siri\|waveform\|search-or-ask\|island" src/` returns only the dock fission/morph files, which
reference "island" in their own DI-blob sense, plus `motion/suite.ts`). The references demand a NEW
capability — but every substrate the two waves need ALREADY EXISTS and must be COMPOSED, not forked
(KISS/DRY, the box-inviolate-beside-the-engine precedent):

1. **The morphing surface engine exists** — `src/components/custom/dock/composables/useDockFission.ts`
   (604L) is the one-`SpringProgress`/one-scalar/one-rAF morph loop (`--dock-split-t`), interruptible
   re-base, bidirectional, PRM-sync-seat, with a DATA signature descriptor (not three code paths) and
   the box-inviolate "consuming seam BESIDE the engine" discipline (it does NOT edit
   `dockMorphContext`/`DOCK_SPRING`). The Siri island's pill↔droplet↔stadium↔panel morph is the SAME
   shape — ONE scalar driving radius+size on the `--spring-dock`/`DOCK_SPRING` register, never a new
   spring family. `useDockOrientationMorph` is the companion V↔H precedent.
2. **The glass material exists** — `.glass-capsule` (`src/styles/glass/glass-capsule.css`) is the
   warm-transmissive lifted-lozenge pill (the EXACT "Search" pill register); `glass/material.css`,
   `glass/rim.css`, `glass/deep.css`, `glass/adaptive-legibility.css` carry the specular rim, the
   deep refractive tier, and the adaptive dim/scrim. The island composes these, never re-authors them.
3. **The viz substrate exists** — `src/composables/glass/webgpu/` (`useGpuSubstrate`,
   `useWebGPUCanvas`, the `createCanvasLifecycle` leaf) is the WebGPU-first / WebGL2-fallback substrate
   the whole procedural-viz suite rides (offscreen-pause, live-PRM one-static-frame, WCAG-2.2.2
   pause). The waveform is a NEW viz on this substrate.
4. **The color ramp exists** — `src/components/custom/border-progress/composables/spectrum-walk.ts` +
   `useBorderSpectrum.ts` already walk the brand ramp OKLCH/shorter-hue (the no-chroma-trough warm→cool
   arc). The amber→orange→pink waveform ramp reuses this exact leaf (ONE color source — value.js, the
   `proof:single-color-core` fence). The metal/gold catch-light (`utilities/metal.css`) is the warm
   specular companion.
5. **The amplitude-feed model exists** — `src/composables/motion/usePointerVelocityField.ts` is the
   push-API `tick(delta)` field FED from inside the renderer's frame loop (NO own rAF). The waveform's
   voice-amplitude feed is the SAME shape: a push-API the viz feeds per-frame; the SOURCE is a
   consumer-supplied normalized 0..1 level (presets-in-consumers — no library mic/audio dependency).
6. **The warm-glow surface exists** — the `goo-blob` WGSL metaball + the aurora field are the
   lit-glass bloom precedents the waveform's prismatic-bloom shader derives from (ONE
   `procedural-color.wgsl.ts` chunk).

The capability is genuinely new; the MECHANISM is entirely a COMPOSITION of shipped substrates. Any
wave that forks a second spring, a second canvas loop, a second color-math, or a second glass recipe
violates the cardinal laws.

---

## PROPOSED WAVES

### BG.W-SIRI-ISLAND

**Intent.** A new `<SiriIsland>` (subpath `/siri-island`, OFF the root barrel — the focal-overlay
posture) — the ONE morphing glass surface that descends/morphs/answers/dismisses over content,
anchored to the Dynamic-Island origin, with the four seated forms (pill → droplet → stadium → panel)
on a single continuous radius+size scalar. Deftly augments the GlassDock system (the island is the
voice/search entry the dock surfaces; it shares the dock's `--spring-dock` clock and `.glass-capsule`
material — it is a SIBLING surface beside the dock engine, box-inviolate).

**Approach (idiomatic, gestalt).**
- Compose `useDockFission`'s one-spring/one-scalar/one-rAF loop shape into a `useSiriIsland`
  composable (colocated under `siri-island/composables/`) writing ONE `--siri-island-t` scalar on the
  `DOCK_SPRING`/`--spring-dock` register — interruptible re-base, bidirectional (descend 0→1 / dismiss
  1→0), PRM-sync-seat. NO new spring family.
- The four forms are DATA (`SiriIslandForm` descriptors — `{ radiusFrac, w, h }` per state), not four
  code paths — the corner-radius + box interpolate off the ONE scalar (the
  `useDockFission` `DockSplitSignature` "signature is data" floor).
- The glass material COMPOSES `.glass-capsule` (the warm pill) for the listen/process droplet and the
  deep refractive tier (`glass/deep.css`) + `glass/rim.css` (the specular silhouette rim) + an adaptive
  warm edge-cast for the answer form. The global-dim variant reuses the existing modal-scrim seam
  (`dialog.glass-top-layer::backdrop` register) for the "Search or Ask" whole-backdrop dim; the local
  overlay variant darkens only behind/around the panel. Compositor-only + Safari-native (no SVG goo /
  no WebGL on the island itself — the §7 floor; the waveform viz is the GPU layer it HOSTS).
- States: `idle` (DI/pill rest) · `listening` (droplet + active waveform) · `responding` (grow to
  form, text reveals, warm bloom settles) · `dismissing` (contract up). `aria-live="polite"` on the
  answer; `role="status"`.
- The home **"Search or Ask" pill** is the island's REST form — a `<SiriIsland variant="pill">` (or a
  thin `<SearchAskPill>` that morphs into the island) composing `.glass-capsule` + the mic affordance.
  The dock-integration seam wires the dock's existing `useDockSearch` to the island (the search query
  surfaces in the panel form) — ONE search pipeline, not a second.

**Files touched.** NEW `src/components/custom/siri-island/{SiriIsland.vue,composables/useSiriIsland.ts,
constants.ts,index.ts,README.md}` + `src/styles/siri-island.css` (the form/dim recipe over the glass
ladder) + `src/subpaths/siri-island.ts` + `@mkbabb/glass-ui/api` type publication. CONSUMES (never
edits) `useDockFission`'s loop shape, `.glass-capsule`, `glass/{deep,rim,material,adaptive-legibility}.css`,
the modal-scrim backdrop seam, `useDockSearch`.

**Acceptance / π bar.** `proof:siri-island` (the morph rides ONE scalar on `--spring-dock` / no new
spring · the four forms are data not code paths · composes `.glass-capsule`+rim+deep, no re-author ·
PRM-sync-seat + compositor-only · the global-dim reuses the modal-scrim seam · the dock-search wire is
the ONE pipeline · a self-test bite per clause) + `tests-visual/siri-island.spec.ts` (the
descend/morph/answer/dismiss frame-series, the pill↔island morph, the backdrop dim, BOTH modes,
LOCAL — rides W-REFLECT) + the `proof:ba-gestalt` island verdict.

**Folds.** The CONTEXT brief's "deftly augment + integrate with the existing GlassDock system" Siri
directive; the home "Search or Ask" pill reference.

### BG.W-SIRI-WAVEFORM

**Intent.** A new `<SiriWaveform>` (subpath `/siri-waveform`, OFF the root barrel) — the warm
luminous prismatic lens-flare light-bar that pulses INSIDE the island when listening/responding: a
horizontal streak with a hot specular core fanning through amber→orange→pink, voice-amplitude-reactive,
blooming into the warm under-glow.

**Approach (idiomatic, gestalt).**
- A WebGPU-first viz on `useGpuSubstrate` (WebGL2 fallback), born on the shared lifecycle leaf — so it
  inherits offscreen-pause, live-PRM one-static-frame-then-park, consumer-owned DPR, and the
  WCAG-2.2.2 `v-model:paused` for free (the procedural-suite discipline). NO second canvas loop.
- The color ramp CONSUMES `spectrum-walk.ts` / `useBorderSpectrum` (the OKLCH/shorter-hue walk) over a
  warm-biased anchor set (amber → orange → pink) — ONE color source (value.js); the LIBRARY default is
  the warm-cream/brand-warm identity, a consumer's exact Siri-spectrum is a PRESET in the consumer. The
  shader is a single fullscreen pass: a horizontal Gaussian-cored light-bar + a chromatic spread along
  X + a vertical bloom (the lens-flare/caustic), splicing the shared `procedural-color.wgsl.ts` chunk.
- The amplitude feed is a push-API `level(0..1)` the host feeds per-frame (the
  `usePointerVelocityField` `tick(delta)`/push-API precedent) — NO library mic/`AudioContext`
  dependency (presets-in-consumers: the consumer wires its own audio level / a synthetic idle drift).
  Under PRM the streak FREEZES to one calm static frame (deterministic snap-to-rest).
- It is HOSTED inside the island (the island provides the rect + the listen/respond state; the waveform
  paints the glow) — the two waves compose: ISLAND = the glass surface + morph, WAVEFORM = the GPU glow
  it hosts. In the rich-content/results form the waveform degrades to the single warm rim light-bar
  (the same glow, calmer — a `mode="rim"` vs `mode="streak"` axis, ONE shader).

**Files touched.** NEW `src/components/custom/siri-waveform/{SiriWaveform.vue,composables/useSiriWaveform.ts,
shaders/siri-waveform.wgsl.ts,shaders/siri-waveform.glsl.ts,constants.ts,index.ts,README.md}` +
`src/subpaths/siri-waveform.ts` + api publication. CONSUMES `useGpuSubstrate`,
`spectrum-walk.ts`/`useBorderSpectrum`, `procedural-color.wgsl.ts`, the
`usePointerVelocityField` push-API model (the amplitude-feed shape).

**Acceptance / π bar.** `proof:siri-waveform` (the colocation + `useGpuSubstrate` compose · the
WGSL↔GLSL single-math round-trip · the spectrum-walk consume / no re-rolled color math · the
push-API level feed / no AudioContext dep · the warm-identity default + presets-in-consumers fence ·
PRM-freeze · the streak/rim mode axis is ONE shader · a self-test bite per clause) +
`proof:gpu-substrate-single` (the waveform row, OKLab ΔE within the calibrated bar) +
`tests-visual/siri-waveform.spec.ts` (the prismatic streak + warm bloom + the amplitude pulse + the
PRM-freeze + the rim-mode degrade, BOTH modes, LOCAL — rides W-REFLECT) + the `proof:ba-gestalt`
waveform verdict. The wave closes `complete_with_misses` if the waveform does not read as the
reference warm prismatic lens-flare (a gestalt judgement on a fresh capture).

**Folds.** The CONTEXT brief's Siri-waveform directive (the warm amber/orange/pink luminous glow); the
"warm/weighty/liquid" identity (the bloom carries weight + light).

### (Triumvirate third — named, deferred to its own wave)

**BG.W-SIRI-DOCK-INTEGRATION** — the seam that wires `<SiriIsland>` + `<SiriWaveform>` into the
GlassDock voice/search entry (the dock's `useDockSearch` surfaces in the island's panel form; the
"Search or Ask" pill is the dock's search affordance; the island shares the dock's `--spring-dock`
clock + `.glass-capsule` material, box-inviolate beside the dock engine). Separated so the two
capability waves land + paint-verify independently before the integration seam binds them to the dock.
This third wave is where the triumvirate's "deftly augment the existing GlassDock system" directive is
discharged end-to-end.

---

## VERIFICATION TRAIL (HEAD, 2026-06-25)

- `grep -ril "siri\|waveform\|search-or-ask\|island" src/` → only dock fission/morph files +
  `motion/suite.ts` (no Siri/island/waveform primitive exists — the capability is new).
- `src/components/custom/dock/composables/useDockFission.ts:1-40` → the one-spring/one-scalar/one-rAF
  morph loop, DATA-signature, box-inviolate-beside-the-engine (the island-morph precedent).
- `src/styles/glass/glass-capsule.css:1-60` → the warm-transmissive pill register (the "Search" pill
  material).
- `src/composables/glass/webgpu/{useGpuSubstrate.ts,useWebGPUCanvas.ts}` + `glassShader.wgsl` → the
  WebGPU-first substrate (the waveform's host).
- `src/components/custom/border-progress/composables/{spectrum-walk.ts,useBorderSpectrum.ts}` → the
  OKLCH/shorter-hue color ramp (the waveform's amber→pink walk, ONE color source).
- `src/composables/motion/usePointerVelocityField.ts` → the push-API `tick(delta)` feed model (the
  amplitude-feed shape — no own rAF, no AudioContext dep).
- `src/components/custom/goo-blob/shaders/` + the aurora field → the lit-glass bloom precedent.
