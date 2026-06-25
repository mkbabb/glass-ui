# Pass-E COMPONENT DEEP AUDIT — foundations/overlays-scrims

**Page:** `/foundations/overlays-scrims` (`demo/stories/foundations/overlays-scrims.vue`)
**Real component(s) under audit (src, not demo):**
- `src/components/ui/_shared/ModalOverlay.vue` — the canonical scrim primitive (the page's protagonist)
- `src/styles/tokens/glass-fx.css §overlay-scrim` — the three scrim-weight tokens
- `src/styles/animations.css §scrim-breath / [data-scrim-animation]` — the opt-in scrim-breath cascade
- `src/styles/utilities/btn.css @utility sheet-animate` — the overlay's enter/exit grammar
- Consumers: `DialogContent.vue` · `DialogScrollContent.vue` · `SheetContent.vue`

No procedural viz backs this page (scrim/token tour). The page is a `<TokenLadder>` + 3 scrim swatches over a demo-local gradient stage.

---

## 1. ANIMATION — affordance, dead/janky/missing

**The headline finding (architectural desync).** `DialogContent.vue` was upgraded at BB.W-LIQUID-REVEAL to compose `.glass-reveal` (the spring-clocked, three-coupled-channel iOS-27 bloom: scale on `--spring-snappy` + its own settle clock, opacity on `--ease-out`, `filter` blur-settle on the spring clock, `transform-origin` at the popper edge). **But the `ModalOverlay` scrim it wraps still rides `@utility sheet-animate`** — a flat `tw-animate-css` `animate-in fade-in` / `animate-out fade-out` keyed only to `--duration-panel` / `--duration-fast` bezier durations. So at open the PANEL blooms liquid while its SCRIM does a plain bezier opacity fade on a different (un-sprung) clock. Two clocks, two grammars, one optical moment — the scrim does not share the surface's spring coalesce. This is the motion-canon P3 (fade-coupled-to-transform) / P4 (per-spring clock) split unmet for the overlay layer.

**`scrim-breath` is a real, well-built register** — PRM double-gated (cascade `animation:none` + keyframe-collapse), composable (consumer owns duration/easing in the shorthand), retunable (`--scrim-opacity-min/max`). Not dead. But it is OPT-IN and demonstrated NOWHERE on this page (or anywhere live except a CellularWarningDialog reference in a comment) — an undemonstrated facility.

**Four-state contract:** N/A in the literal sense — a scrim is non-interactive (no hover/active/focus). The relevant contract is enter/exit, and that is the desync above. The exit is correct in `.glass-reveal` (no-overshoot `--ease-out`, P2) but the scrim's exit is the separate `sheet-animate` `--duration-fast` fade — again a second clock.

## 2. PROCEDURAL VIZ
None. The page's "vivid stage" is a static demo-local triple `radial/linear-gradient` (`.scrim-stage`, `--section-color-*` references) — correctly demo-local (not a brand mint), correctly used to give the scrim something to dim. No PROCEDURAL-SUITE obligation here.

## 3. PERFORMANCE
- `.glass-reveal` is compositor-only (scale/translate/opacity/`filter`) — clean.
- `sheet-animate` fade is opacity-only — compositor-safe.
- The scrim's `[backdrop-filter:var(--glass-blur-wash)]` is `blur(1px)` (wash radius × `--glass-level`) — near-free, but see §6: a 1px blur on a full-viewport fixed scrim is essentially a no-op visually while still allocating a backdrop-filter layer. No layout thrash. No rAF, no offscreen-pause concern (no canvas).

## 4. SAFARI COMPATIBILITY
- `backdrop-filter` is written BARE (`[backdrop-filter:…]`) with NO `-webkit-backdrop-filter` companion. Safari ≤17 / older WebKit needs the prefix; on a bare property the scrim's blur silently drops on those engines. Modern Safari 18+ is fine, but the glass-first identity asks for the prefixed pair (the rest of the glass ladder should be checked for the same).
- `.glass-reveal` uses `transition-behavior: allow-discrete` + `overlay` + the `scale:`/`translate:` longhands — these are Newly-Available; Safari 18+ OK, but this is the reka data-state form (not native `@starting-style`), so it degrades to an instant state-swap on a gap engine rather than breaking. Acceptable.
- No other WebKit-hostile primitive.

## 5. IDIOMATIC / NO-LEGACY / dual-path
- **`animate: "scale" | "slide"` are DEAD enum arms** — `animateClass` maps `fade`, `scale`, AND `slide` ALL to the same `"sheet-animate"` string. Three named values, one behavior. A consumer passing `animate="scale"` gets a fade. This is a no-op API surface (legacy-shaped).
- **`layout: "edge"` is a self-declared forward-reservation no-op** (`layoutClass.edge = ""`, held "for future edge-pinned overlays per A5 §4.4"). A reserved-but-inert enum arm — substrate-without-consumer.
- **The `scrim` prop's value names diverge from the token names** — prop `glass`/`clear`/`dim` map to token `--overlay-scrim`/`-subtle`/`-strong`. Two vocabularies for one axis; the docstring has to translate. Mild non-idiom.
- **The `scrim/animate/layout` vocabulary predates the `surface="glass|veil|opaque"` shared axis (BA.W-SURFACE-AXIS)** — ModalOverlay is a scrim (a dim), genuinely distinct from a surface decoration, so this is NOT a fork to collapse onto surface-axis; but the dead `scale`/`slide`/`edge` arms are the legacy residue to prune.
- The `[backdrop-filter:…]` arbitrary utility is exactly the STRUCTURAL-arbitrary class BA.W-EMISSION warns may not reach a bare consumer's content-scan — `backdrop-filter` decoration degrades gracefully (left as-is per that wave), acceptable, but the missing `-webkit-` pair (§4) is the real gap.

## 6. THE GLASS SIX-LAYER COMPOSITE
A scrim is INTENTIONALLY not a full glass plate — it is the DIM layer the composite floats ABOVE (glass-cannot-sample-glass: the modal plate sits over the scrim, the scrim over the page). So 5 of 6 layers correctly absent. The ONE present optical layer is the `backdrop-filter` blur — and at `--glass-blur-wash` (1px) it is sub-perceptual. The DESIGN.md / iOS-27 modal scrim reads as a genuine frosted recede (a real backdrop blur behind the modal), not a 1px whisper. **The scrim under-delivers the optical recede** — a true modal moment wants a heavier (resting-tier-class) backdrop blur on the scrim so the page genuinely defocuses behind the surface, paired with the ink dim. This is a calibration miss, not a structural one.

---

## FINDINGS → BD WAVE MAP

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| 1 | Scrim rides `sheet-animate` bezier-fade while the panel blooms `.glass-reveal` spring — two clocks/grammars at one optical moment | **AUGMENT** — couple the scrim enter to the surface bloom: re-point ModalOverlay's enter off `sheet-animate` onto a `.glass-reveal`-clocked opacity (the scrim fades on the same `--spring-snappy-duration` the panel scale rides; exit stays no-overshoot `--ease-out`). Single-writer in `reveal.css`. | `BD.W-BC-COMPONENT-CANON` (the component-canon sweep) — add a scrim-couples-the-reveal-clock clause; fold the desync |
| 2 | Page demos a scrim/token tour over a demo-local gradient, NOT over a live aurora; sub-sections share one `StorySection` not per-section glass cards; main area small | **MODIFY** — stage the three scrim swatches over the shared live-field background; each sub-section its own glass card; enlarge the main area | `BD.W-PAGE-BACKGROUND` + `BD.W-PAGE-CHASSIS` (the systemic page-redesign; this page joins the fleet) |
| 3 | `animate="scale"`/`"slide"` are dead enum arms (all → `sheet-animate`); `layout="edge"` is a reserved no-op | **PRUNE** — collapse the dead `scale`/`slide` arms (clean break, no alias); delete the inert `edge` reservation (substrate-without-consumer) | `BD.W-BC-COMPONENT-CANON` / `BD.W-DESHADCN-CANON` (the no-legacy component sweep) |
| 4 | Bare `[backdrop-filter:…]` with no `-webkit-` pair — Safari ≤17 drops the scrim blur | **MODIFY** — add the `-webkit-backdrop-filter` companion (sweep the glass ladder for the same gap) | `BD.W-BC-COMPONENT-CANON` (Safari-bar clause) |
| 5 | Scrim backdrop-blur is `--glass-blur-wash` (1px) — sub-perceptual recede; the iOS-27 modal moment wants a real defocus behind the surface | **AUGMENT** — lift the modal scrim's backdrop blur to a perceptible recede tier (token-first; presets-in-consumers for heavier flows) | `BD.W-DEEP-GLASS-20PX` (the deep-glass calibration band) — add the modal-scrim recede |
| 6 | `scrim-breath` + the `scrim`-weight axis are undemonstrated live | **MODIFY** — surface scrim-breath + the three weights as a live demo on the redesigned page | `BD.W-PAGE-CHASSIS` (the page-audit fleet `label→heading` + affordance arm) |
| 7 | Import-path label not standardized; superfluous docstring prose (the 80-line ModalOverlay header) | **MODIFY** — standardize the import label (`@mkbabb/glass-ui` — `ModalOverlay` ships via the ui barrel / `_shared`); tighten the prose | `BD.W-PAGE-CHASSIS` / `BD.W-PRECEPTS-README-FRESHEN` |

No new wave needed — every finding folds onto an EXISTING BD wave. The headline (finding 1) is the genuinely-component fix (the scrim/reveal clock desync); 2/6/7 are the systemic page-chassis redesign; 3/4 are the no-legacy component sweep.
