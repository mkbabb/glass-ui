# F5 OPTICAL-MEDIUM — pass-1 research digest

verified-model: claude-fable-5 (system-context model ID, returned verbatim)
seat: F5 · date: 2026-07-17 · scope: family section + cross-family invariants only (early-round independence held)

---

## 1. The hard question, answered first: the decomposition is platform-forced, not taste

The family charter asks for a defense of medium/body/light as load-bearing architecture. The defense
is the CSS backdrop-root law itself. Per [filter-effects-2](https://drafts.csswg.org/filter-effects-2/)
and [MDN's backdrop-filter page](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
(plus the original [explainer](https://github.com/mfreed7/backdrop-filter-feature/blob/master/README.md)),
an element's `backdrop-filter` samples only up to the nearest ancestor that is a **backdrop root** — and
an ancestor becomes a backdrop root by carrying `filter`≠none, `opacity`<1, any mask/`clip-path`,
`mix-blend-mode`≠normal, or its own `backdrop-filter`.

Consequences, each one a hard structural constraint:

- A goo `filter: url(#…)` wrapper above a glass body severs the body's page sampling. The LIGHT layer
  (filtered) and the BODY layer (backdrop-sampling) cannot nest — they must be siblings under an
  effect-free ancestor. The shipped pager worm already discovered this the hard way: `PagerDots.vue`
  is a three-layer split (crisp bed / filtered worm layer with `contain: layout paint` +
  `isolation: isolate` / interaction layer) precisely because a whole-layer filter annihilated the
  paint (the σ8 defect named in its header).
- A wrapper opacity fade (a naive Vue `<Transition>` around a glass region) severs the region's
  backdrop sampling for the duration of the fade. Enter/exit choreography must animate the glass
  element's own opacity, never an ancestor's.
- A control-tier capsule with `backdrop-filter` inside a container-tier glass samples the container's
  backdrop-root image — which by spec starts at the container and includes its painted surface. The
  two-tier rule (control never shares the container's surface, MARKS §4) has direct spec support:
  frosted-on-frosted nesting is the defined behavior, not an accident.

The corpus evidence completes the proof: the CC interrupt (MARKS §5 — content flicked out and
re-caught while the blur medium never resolved between cycles) shows the medium has independent
lifetime; the platform law shows the layers have mutually destructive effects when nested. Independent
lifetime + forced sibling topology = the three-layer decomposition is the only shape that works.

## 2. Safari 2026 truth table (version-cited)

| fact | status | source |
|---|---|---|
| `backdrop-filter` unprefixed | Safari 18+; prefixed since Safari 9. Safari-2026 floor (26.x) is safely unprefixed | [caniuse](https://caniuse.com/css-backdrop-filter), [roboleary](https://www.roboleary.net/blog/unprefixing-backdrop-filter/) |
| `backdrop-filter: url(#svg)` | Chromium-only, non-spec; WebKit bug 245510 open; Firefox not shipping | [caniuse issue 7354](https://github.com/Fyrd/caniuse/issues/7354), [BCD issue 24110](https://github.com/mdn/browser-compat-data/issues/24110), [kube.io](https://kube.io/blog/liquid-glass-css-svg/) |
| `mix-blend-mode: plus-lighter` | Safari 9.1+, Chrome 100+, Firefox 99+ — universal at the floor | [caniuse BCD](https://caniuse.com/mdn-css_properties_mix-blend-mode_plus-lighter) |
| `filter: url(#in-document-svg)` on HTML | Safari yes, in-document refs only (no external/data-URL filter refs) | [caniuse svg-filters](https://caniuse.com/svg-filters), [caniuse issue 3803](https://github.com/Fyrd/caniuse/issues/3803); repo evidence: pager worm Arm A paints in Safari today |
| Scroll-driven animations | Safari 26.0 shipped; **Safari 26.4 runs them on the compositor thread** | [WebKit 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/), [WebKit 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/) |
| Anchor positioning | Safari 26.0 | [WebKit 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) |
| Native Liquid Glass material for web | `-apple-visual-effect: -apple-system-glass-material` exists in WebKit but is private (WKPreferences `useSystemAppearance`); never reaches the open web | [alastair.is](https://alastair.is/apple-has-a-private-css-property-to-add-liquid-glass-effects-to-web-content/) |
| Native progressive/gradient blur | none; `linear-blur()` is only a csswg proposal | [csswg-drafts #13285](https://github.com/w3c/csswg-drafts/issues/13285) |
| Interoperable backdrop refraction | none; svgwg issue open, unshipped | [svgwg #1142](https://github.com/w3c/svgwg/issues/1142) |

2026 SOTA survey, condensed:

- Liquid-glass web recreations (kube.io, ekino, LogRocket, nikdelvin — the canon the shipped
  `glass-refract.css` cites) all reach real refraction only via `backdrop-filter: url()` and are
  therefore Chromium-only; every one falls back to plain blur on Safari
  ([kube.io](https://kube.io/blog/liquid-glass-css-svg/), [webtricks](https://webtricks.dev/blog/liquid-glass-css)).
  Refraction is not available at the Safari-2026 floor, full stop.
- Progressive blur SOTA is stacked sibling `backdrop-filter` layers with gradient masks
  ([kennethnym](https://kennethnym.com/blog/progressive-blur-in-css/),
  [devslovecoffee](https://www.devslovecoffee.com/blog/making-apple-progressive-blur-on-web)); Chromium
  reportedly struggles with many stacked masked backdrop layers — the ladder must be bounded (3–4
  layers) and scoped to the medium tier.
- Blur-animation cost: animating a blur radius is paint-bound, never composited; Chrome's own guidance
  is to avoid it outright ([animated-blur](https://developer.chrome.com/blog/animated-blur)); Chromium
  has an open defect where backdrop blur breaks/flickers during transitions
  ([issue 40175472](https://issues.chromium.org/issues/40175472)); Safari animates filtered elements
  on the CPU without explicit layer promotion
  ([graffino TIL](https://graffino.com/til/how-to-fix-filter-blur-performance-issue-in-safari)); field
  guidance puts mobile at ~3–5 concurrent blur surfaces
  ([f22labs](https://www.f22labs.com/blogs/how-css-properties-affect-website-performance/)).

## 3. The mechanism the platform facts force

**The medium never animates its blur radius.** It is pre-mounted, radius-constant; the ≤100ms open
cliff and the ~400ms close relax (MARKS §5) are opacity moves on the constant-radius medium and its
dim leg — opacity composites, radius does not. The perceptual blur-decay of an opacity fade over a
sharp page is the honest primary; if pass-2 paint says it reads wrong, the upgrade is a two-layer
stepped crossfade, not an animated radius. Persistence across interrupts = the element never unmounts;
only its opacity scrubs. `ModalOverlay.vue`'s `fixed inset-0` wash is the shipped seed of this
per-region singleton.

**The light layer samples no backdrop.** Pure paint — gradients + `plus-lighter`/`screen` composites
(safe since Safari 9.1) — merged by an in-document SVG goo filter per the pager Arm A register
(`contain: layout paint` + `isolation: isolate`, `@supports not (filter: url(…))` clip-path degrade as
Arm B). Luminance-composited, exactly as the registry's risk note anticipated.

**The traveling lens carries no backdrop-filter while traveling.** This is the central claim, and the
corpus itself licenses it: MARKS §3 — light leads, geometry follows; the source tab de-materializes
under the blob and re-materializes behind it. At rest the lens is a control-tier glass capsule
(static backdrop sample, cheap). On travel: capsule de-materializes at the source, the light barbell
travels (two bodies + neck off `useLeadTrail`'s (lo, hi) edges — the pager worm at tab-bar scale),
the capsule re-forms oversized (~110–120%, held ~200ms) at the target, cools to rest. The expensive
moving backdrop re-sample never happens — resolved by architecture, and the architecture is what iOS
paints anyway.

**Lens magnification is a content transform, not refraction.** The ~5–8% magnification (MARKS, Beyond
the hallmarks) rides a `scale` on the real tab content under the lens — content rides the body's
transform tree, deforming with the container per the material law. Backdrop refraction stays what it
already is in the repo: the Chromium-only `.glass-lens` garnish, never the primary.

**Sibling legibility under the bloom (the best-iOS requirement):** the bloom is a light-layer paint
whose alpha is clamped under text runs — a `--lens-bloom-text-clamp` leg mixed into the bloom
gradient, plus the sibling labels living OUTSIDE the light layer (they are body content; the light
layer is aria-hidden and paints between body and content planes). iOS loses ~300ms of sibling
legibility because its bloom is opaque; ours is a bounded-alpha composite by construction.

## 4. Codebase kin — measured

- **68** component directories; **120** `backdrop-filter` declarations across **54** files; only **9**
  `-webkit-backdrop-filter` occurrences (the unprefixed posture is already the norm). The
  three-layer contract must consolidate sampling surfaces, not add them.
- `liquid-fill.css` — the compose-not-clone precedent: the register owns every glass mechanic, the
  consumer owns one tint knob. The F5 layer contract generalizes exactly this shape.
- `glass-capsule.css` + `tokens/glass.css` — the two-tier budget already has its rungs: the five-tier
  ladder (wash .30α/1px → quiet .50α/7px → resting .65α/7px → floating .80α/11px → overlay .95α/11px).
  Container = resting/floating; control = quiet + own rim + brighter fill. The `--glass-rim-top`/
  `--glass-rim-bottom`/`--glass-specular` (1.5px top line) tokens are the shipped 1px-rim-light legs.
- `material.css:66` — the cell-suppression seam: every tier host sets
  `--glass-cell-backdrop-filter: none` on its children. Nested glass already suppresses its own
  sampling; this is the existing instrument that bounds the concurrent-blur count.
- **Adaptive tint is partially shipped, contra the registry note.** `glass-fx.css` carries
  `--glass-tint-source`/`--glass-tint-strength` with a brightness-bucket lift, an AA-clamped strength
  floor (≤24%), and a live 4.5:1 readback (proof:adaptive-glass π arm). What remains unshipped is
  positional hue sampling (codex law 2's "blooms warm exactly under an orange avatar") — a narrower
  gap than "adaptive tint unshipped".
- `usePagerWorm.ts` + `PagerDots.vue` — the shipped three-layer + Arm A/B precedent, including the
  instance-scoped in-document filter, `contain`/`isolation` boxing, PRM filter-drop, and the
  `@supports not (filter: url(…))` floor.
- `useLeadTrail.ts` — the travel integrator the light blob rides: spring lead (local 0.68/ζ0.64,
  documented pager-owned, keyframes-free), exponential trail (τ≈270ms), parks when settled, PRM seats
  instantly. `useSelectionIndicator.ts` — the ONE traveling-indicator writer (RO + center-anchored
  transform, `--stretch` squish, caps 1.11/1.045) for the rest-capsule geometry.
- `springPresets.ts` — the single named-spring authority. **F5 supplies no clock.** Light travel
  consumes `useLeadTrail` as-is; the body layer consumes whichever physics family wins (its named
  presets via `springPreset("dock")` kin); the medium rides CSS duration tokens. The measured desync
  (medium ≤100ms; fade ≈ stretch/4; stretch ~600ms decelerating; close inverts; periphery lags
  ~100ms) is specified as token ratios over existing clocks — never a second authority.
- `supportsCssTimeline.ts` — the positive+negative probe harden; the template for the gate repair
  below.

**Defect found in kin (load-bearing):** `glass-refract.css` gates its Chromium-only refraction behind
`@supports (backdrop-filter: url(#…))` and asserts a non-supporting engine "never reaches this
block". Sources conflict on whether Safari REJECTS `url()` in `backdrop-filter` at parse time (honest
gate) or accepts-and-silently-drops it ([webtricks](https://webtricks.dev/blog/liquid-glass-css)
claims accept-and-drop). If Safari parses it, the gated block engages and Safari computes
`blur(…) url(data:…)` — and the outcome is either blur-only (benign) or a whole-value drop (the lens
loses ALL blur on Safari — a real paint defect in shipped CSS). This is the same lying-gate class as
the happy-dom `CSS.supports` trap. Pass-2 must paint-probe it on real Safari; if lying, the fix is a
paint-arm gate or a UA-scoped arm, per the `supportsCssTimeline` harden pattern.

## 5. Unknowns table

### Resolved this pass

| # | unknown (registry) | resolution | evidence |
|---|---|---|---|
| R1 | Traveling backdrop-filter capsule re-samples per frame — Safari cost | Resolved by architecture: the lens never travels while sampling. Rest capsule static; travel is light-only; capsule re-forms at target | MARKS §3 (light leads, geometry follows — iOS paints it this way); [animated-blur](https://developer.chrome.com/blog/animated-blur); [Chromium 40175472](https://issues.chromium.org/issues/40175472); [graffino](https://graffino.com/til/how-to-fix-filter-blur-performance-issue-in-safari) |
| R2 | Light layer luminance-composited vs blurred | Luminance-composited: `plus-lighter` safe since Safari 9.1; goo via in-document `filter: url()` (paints in Safari today — pager Arm A); `backdrop-filter: url()` Chromium-only | [caniuse plus-lighter](https://caniuse.com/mdn-css_properties_mix-blend-mode_plus-lighter); [BCD 24110](https://github.com/mdn/browser-compat-data/issues/24110); WebKit bug 245510 |
| R3 | Three layers × ~100 components multiplies DOM | Measured: 68 components, 120 backdrop-filter declarations. Contract adds zero per-component elements — body layers already exist; medium is a per-region singleton (~overlay family, ModalOverlay seed); light mounts per lens HOST (~4: tabs, dock, pager, segmented) | repo greps this pass; `material.css:66` cell-suppression seam |
| R4 | Defend the decomposition as architecture | Platform-forced: backdrop-root law makes nested layer effects mutually destructive; layers must be siblings; medium has independent lifetime (CC interrupt) | [filter-effects-2](https://drafts.csswg.org/filter-effects-2/); [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter); MARKS §5; PagerDots σ8 precedent |
| R5 | Which clock drives the body layer | F5 supplies none — consumption points only: light=useLeadTrail as-is, body=the physics family's springPresets rows, medium=CSS duration tokens; desync as token ratios | `springPresets.ts` no-second-authority header; `useLeadTrail.ts` local-pair documentation |
| R6 | Adaptive tint "unshipped dependency" | Narrowed: brightness-bucket adaptivity + AA clamp + live readback SHIPPED (`glass-fx.css`); only positional hue sampling remains | glass-fx.css §adaptive tint-source; proof:adaptive-glass π arm |

### Remaining (with owner)

| # | unknown | why it stays open | next move |
|---|---|---|---|
| U1 | Does Safari 26 accept `backdrop-filter: url()` in `@supports` (the lying gate on shipped `glass-refract.css`) — and does `blur() url()` paint blur-only or nothing? | Sources conflict on parse-vs-paint; not checkable without a browser | pass-2 paint probe on real Safari; repair per supportsCssTimeline harden if lying |
| U2 | Does an opacity fade on a constant-radius medium composite cleanly in Safari (no per-frame re-raster), and does the perceptual blur-decay pass the corpus read? | perf + perception claim — needs live-π paint pair | pass-2 device trace + screenshot pair |
| U3 | Nested control-on-container backdrop sampling in Safari paints per spec (container's backdrop-root image)? | spec is clear; WebKit nested-backdrop history is wobbly | pass-2 two-tier paint probe |
| U4 | Positional hue sampling (codex law 2 full form) | no web primitive exists (no `element()`, no interoperable backdrop displacement — [svgwg #1142](https://github.com/w3c/svgwg/issues/1142)) | pass-2 design: consumer hint token vs sampled-swatch approximation; scope explicitly |
| U5 | Concurrent-blur budget on a CC-like screen (medium + tiles + controls) vs the ~3–5 mobile guidance | device-dependent | pass-2 trace on the CC prototype |
| U6 | Stacked-mask progressive blur (codex law 1) inside budget when the medium also hosts choreography | Chromium stacking reports are anecdotal | bound at 3–4 layers, measure in pass 2 |

## 6. The exact spec shape for F5

The pass-2 spec should be one document with six normative sections:

1. **The layer contract.** Per liquid region: one effect-free positioning ancestor (no filter, no
   opacity<1, no mask/clip, no blend — enumerated, linted). MEDIUM: optional per-region singleton,
   constant radius, opacity-only animation, never unmounted; a three-state machine
   (engaged / held / relaxing) with scrub re-entry at any state — the CC empty-blur beat and the held
   featureless scrim are named states. BODY: the existing tier system; one transform tree; content
   inside the transform (overpull compression is one `scale` — content deforms for free); own-element
   opacity only. LIGHT: sibling above body, aria-hidden, pointer-events none,
   `contain: layout paint` + `isolation: isolate`, Arm A in-document goo filter / Arm B clip floor,
   luminance blends only, zero backdrop sampling. A z/DOM table against arbitrary consumer content.
2. **Token budgets.** The two-tier table mapped to the shipped five-rung ladder (container =
   resting/floating; control = quiet + own rim); the 1px top rim as a required leg
   (`--glass-specular`/`--glass-rim-top` reuse); light tokens (`--lens-charge`, `--lens-bloom`,
   `--lens-bloom-text-clamp`, `--specular-intensity` reuse); tint clamped off text (full-contrast ink
   invariant).
3. **The lens mechanism.** Rest capsule (control glass + content magnification via transform);
   press-charge (source bloom + whole-bar glow wash on pointerdown — engagement displayed before any
   travel); travel (capsule de-materializes, light barbell on `useLeadTrail`, sibling legibility
   floor); arrival (oversized 110–120% in scale AND light, ~200ms hold); cool-down (~1.2–1.4s
   press→settle total). Keep Safari's two good ideas: idle specular sweep (engagement-gated) and pill
   self-centering. PRM: seat instantly, charge survives as non-motion state.
4. **The medium state machine.** Pre-mounted; open cliff ≤100ms (opacity); close inverts — content
   leaves first, 100–200ms empty-medium beat, then the ~400ms relax; interrupt = scrub catch at any
   point, state carried; one writer per region.
5. **Probes and gates.** The U1 backdrop-url paint probe (and the glass-refract gate repair if
   lying); the U3 nested-sampling probe; the U5 budget trace; live-π paint pairs for every prototype
   claim; PRM and prefers-reduced-transparency arms named.
6. **Non-goals, stated loud.** No backdrop refraction at the floor (Chromium `.glass-lens` garnish
   only — the shipped posture); no animated blur radius anywhere; no new spring registers; no
   per-component medium elements.

## Sources

- https://caniuse.com/css-backdrop-filter · https://caniuse.com/svg-filters · https://caniuse.com/mdn-css_properties_mix-blend-mode_plus-lighter
- https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter · https://drafts.csswg.org/filter-effects-2/ · https://github.com/mfreed7/backdrop-filter-feature/blob/master/README.md
- https://github.com/Fyrd/caniuse/issues/7354 · https://github.com/mdn/browser-compat-data/issues/24110 · https://github.com/Fyrd/caniuse/issues/3803
- https://webkit.org/blog/17333/webkit-features-in-safari-26-0/ · https://webkit.org/blog/17862/webkit-features-for-safari-26-4/ · https://webkit.org/blog/17938/webkit-features-for-safari-26-5/
- https://kube.io/blog/liquid-glass-css-svg/ · https://webtricks.dev/blog/liquid-glass-css · https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/ · https://github.com/w3c/svgwg/issues/1142
- https://alastair.is/apple-has-a-private-css-property-to-add-liquid-glass-effects-to-web-content/
- https://kennethnym.com/blog/progressive-blur-in-css/ · https://www.devslovecoffee.com/blog/making-apple-progressive-blur-on-web · https://github.com/w3c/csswg-drafts/issues/13285
- https://developer.chrome.com/blog/animated-blur · https://issues.chromium.org/issues/40175472 · https://graffino.com/til/how-to-fix-filter-blur-performance-issue-in-safari · https://www.f22labs.com/blogs/how-css-properties-affect-website-performance/ · https://www.roboleary.net/blog/unprefixing-backdrop-filter/
